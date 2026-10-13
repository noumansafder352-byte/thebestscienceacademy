// Admin API — replaces the ADMIN-ONLY server functions in
// frontend/src/lib/tutor-api.functions.ts. Same inputs, same response shapes.
// Every route here requires a signed-in admin (see requireAdmin below).
import { randomUUID } from "node:crypto";
import { Router } from "express";
import multer from "multer";
import { z } from "zod";
import { db } from "../config/db.js";
import { HttpError, parseInput } from "../lib/http.js";
import { toDbValue, withParsedJson } from "../lib/rows.js";
import { requireAdmin } from "../middleware/auth.js";
import {
  checkUpload,
  deleteFile,
  MAX_UPLOAD_BYTES,
  sanitizeName,
  saveFile,
  signedFileUrl,
} from "../services/files.js";
import { sendApprovalEmail, sendRejectionEmail } from "../services/email.js";

export const adminRouter = Router();
adminRouter.use(requireAdmin);

const ADMIN_FILE_TTL = 60 * 60; // admin file links last 1h, as before

const idParam = z.object({ id: z.string().uuid() });

async function findOne<T = any>(sql: string, params: unknown[]): Promise<T | null> {
  const [rows] = (await db.query(sql, params)) as any;
  return (rows[0] as T) ?? null;
}

/* ================================================================
 *  APPLICATIONS
 * ================================================================ */

/** adminListApplications — GET /api/admin/applications */
adminRouter.get("/applications", async (_req, res) => {
  const [rows] = (await db.query("SELECT * FROM tutor_applications ORDER BY created_at DESC")) as any;
  res.json(rows.map(withParsedJson));
});

/** adminGetApplication — GET /api/admin/applications/:id  (null when not found) */
adminRouter.get("/applications/:id", async (req, res) => {
  const { id } = parseInput(idParam, req.params);
  const app = await findOne("SELECT * FROM tutor_applications WHERE id = ?", [id]);
  if (!app) {
    res.json(null);
    return;
  }
  res.json({
    ...withParsedJson(app),
    cv_url: signedFileUrl(req, "tutor-cvs", app.cv_path, ADMIN_FILE_TTL),
    photo_url: signedFileUrl(req, "tutor-photos", app.photo_path, ADMIN_FILE_TTL),
    cnic_front_url: signedFileUrl(req, "tutor-cvs", app.cnic_front_path, ADMIN_FILE_TTL),
    cnic_back_url: signedFileUrl(req, "tutor-cvs", app.cnic_back_path, ADMIN_FILE_TTL),
  });
});

/** adminUpdateApplicationNotes — PATCH /api/admin/applications/:id/notes  { admin_notes } */
adminRouter.patch("/applications/:id/notes", async (req, res) => {
  const { id } = parseInput(idParam, req.params);
  const { admin_notes } = parseInput(z.object({ admin_notes: z.string().max(4000) }), req.body);
  await db.query("UPDATE tutor_applications SET admin_notes = ? WHERE id = ?", [admin_notes, id]);
  res.json({ ok: true });
});

/** adminRejectApplication — POST /api/admin/applications/:id/reject  { reason, comments? } */
adminRouter.post("/applications/:id/reject", async (req, res) => {
  const { id } = parseInput(idParam, req.params);
  const body = parseInput(
    z.object({ reason: z.string().min(2).max(200), comments: z.string().max(2000).optional().nullable() }),
    req.body,
  );
  const app = await findOne<{ full_name: string; email: string }>(
    "SELECT full_name, email FROM tutor_applications WHERE id = ?",
    [id],
  );
  if (!app) throw new HttpError(404, "Application not found");

  const result = await sendRejectionEmail({
    to: app.email,
    applicantName: app.full_name,
    reason: body.reason,
    comments: body.comments ?? null,
  });

  const adminId = req.user!.id;
  await db.query(
    `UPDATE tutor_applications
        SET status = 'rejected', reviewed_by = ?, reviewed_at = UTC_TIMESTAMP(6),
            rejected_by = ?, rejected_at = UTC_TIMESTAMP(6),
            rejection_reason = ?, rejection_comments = ?,
            rejection_email_status = ?, rejection_email_error = ?, rejection_email_attempted_at = UTC_TIMESTAMP(6)
      WHERE id = ?`,
    [adminId, adminId, body.reason, body.comments ?? null, result.status, result.error ?? null, id],
  );
  res.json({ ok: true, emailStatus: result.status, emailError: result.error });
});

/** adminResendRejectionEmail — POST /api/admin/applications/:id/resend-rejection */
adminRouter.post("/applications/:id/resend-rejection", async (req, res) => {
  const { id } = parseInput(idParam, req.params);
  const app = await findOne<{
    full_name: string;
    email: string;
    rejection_reason: string | null;
    rejection_comments: string | null;
    status: string;
  }>("SELECT full_name, email, rejection_reason, rejection_comments, status FROM tutor_applications WHERE id = ?", [id]);
  if (!app) throw new HttpError(404, "Application not found");
  if (app.status !== "rejected") throw new HttpError(400, "Application is not in a rejected state");
  if (!app.rejection_reason) throw new HttpError(400, "No rejection reason on file");

  const result = await sendRejectionEmail({
    to: app.email,
    applicantName: app.full_name,
    reason: app.rejection_reason,
    comments: app.rejection_comments,
  });
  await db.query(
    `UPDATE tutor_applications
        SET rejection_email_status = ?, rejection_email_error = ?, rejection_email_attempted_at = UTC_TIMESTAMP(6)
      WHERE id = ?`,
    [result.status, result.error ?? null, id],
  );
  res.json({ ok: true, emailStatus: result.status, emailError: result.error });
});

/** adminReopenApplication — POST /api/admin/applications/:id/reopen */
adminRouter.post("/applications/:id/reopen", async (req, res) => {
  const { id } = parseInput(idParam, req.params);
  await db.query(
    "UPDATE tutor_applications SET status = 'pending', reviewed_by = NULL, reviewed_at = NULL WHERE id = ?",
    [id],
  );
  res.json({ ok: true });
});

/** adminDeleteApplication — DELETE /api/admin/applications/:id */
adminRouter.delete("/applications/:id", async (req, res) => {
  const { id } = parseInput(idParam, req.params);
  await db.query("DELETE FROM tutor_applications WHERE id = ?", [id]);
  res.json({ ok: true });
});

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

/**
 * adminApproveApplication — POST /api/admin/applications/:id/approve
 * Replaces the approve_tutor_application() Postgres function: creates the
 * public tutor profile and marks the application approved, in one transaction.
 */
adminRouter.post("/applications/:id/approve", async (req, res) => {
  const { id } = parseInput(idParam, req.params);
  const conn = await db.getConnection();
  let result: { tutorId: string; slug: string; email: string; fullName: string };
  try {
    await conn.beginTransaction();
    const [apps] = (await conn.query("SELECT * FROM tutor_applications WHERE id = ? FOR UPDATE", [id])) as any;
    if (!apps[0]) throw new HttpError(404, "Application not found");
    const app = withParsedJson(apps[0]);
    const json = (col: string) => toDbValue(col, app[col]);

    // Guard against creating a second public profile for the same application.
    const [existing] = (await conn.query("SELECT slug FROM tutors WHERE application_id = ? LIMIT 1", [id])) as any;
    if (existing[0]) throw new HttpError(409, `This application already has a tutor profile (/tutors/${existing[0].slug})`);

    const base = slugify(app.full_name) || "tutor";
    let slug = base;
    for (let suffix = 2; ; suffix++) {
      const [taken] = (await conn.query("SELECT 1 FROM tutors WHERE slug = ? LIMIT 1", [slug])) as any;
      if (!taken[0]) break;
      slug = `${base}-${suffix}`;
    }

    const tutorId = randomUUID();
    await conn.query(
      `INSERT INTO tutors
        (id, application_id, slug, name, title, photo_url, qualification, experience,
         subjects, curriculums, grade_levels, languages, bio, gender, nationality,
         country, city, timezone, availability, methodology, education, schedule, is_active)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 1)`,
      [
        tutorId, app.id, slug, app.full_name, app.professional_title, app.photo_path ?? "",
        app.qualification, app.experience_years,
        json("subjects"), json("curriculums"), json("grade_levels"), json("languages"),
        app.bio, app.gender, app.nationality, app.country, app.city, app.timezone,
        app.availability ?? "Available", app.methodology, json("education"), json("schedule"),
      ],
    );
    await conn.query(
      "UPDATE tutor_applications SET status = 'approved', reviewed_by = ?, reviewed_at = UTC_TIMESTAMP(6) WHERE id = ?",
      [req.user!.id, id],
    );
    await conn.commit();
    result = { tutorId, slug, email: app.email, fullName: app.full_name };
  } catch (err) {
    await conn.rollback();
    throw err;
  } finally {
    conn.release();
  }

  // Best-effort welcome email — never fail the approval if email is down.
  try {
    await sendApprovalEmail({ to: result.email, applicantName: result.fullName });
  } catch (e) {
    console.error("[approve-email]", e);
  }
  res.json({ tutorId: result.tutorId, slug: result.slug });
});

/* ================================================================
 *  BOOKINGS & MESSAGES
 * ================================================================ */

/** adminListBookings — GET /api/admin/bookings */
adminRouter.get("/bookings", async (_req, res) => {
  const [rows] = (await db.query("SELECT * FROM trial_bookings ORDER BY created_at DESC")) as any;
  res.json(rows);
});

/** adminListMessages — GET /api/admin/messages */
adminRouter.get("/messages", async (_req, res) => {
  const [rows] = (await db.query("SELECT * FROM contact_messages ORDER BY created_at DESC")) as any;
  res.json(rows);
});

/** adminGetMessage — GET /api/admin/messages/:id  (null when not found) */
adminRouter.get("/messages/:id", async (req, res) => {
  const { id } = parseInput(idParam, req.params);
  res.json(await findOne("SELECT * FROM contact_messages WHERE id = ?", [id]));
});

/** adminMarkMessageRead — PATCH /api/admin/messages/:id/read  { status?: "read" | "unread" } */
adminRouter.patch("/messages/:id/read", async (req, res) => {
  const { id } = parseInput(idParam, req.params);
  const { status } = parseInput(z.object({ status: z.enum(["read", "unread"]).optional() }), req.body ?? {});
  await db.query("UPDATE contact_messages SET status = ? WHERE id = ?", [status ?? "read", id]);
  res.json({ ok: true });
});

/** adminDeleteMessage — DELETE /api/admin/messages/:id */
adminRouter.delete("/messages/:id", async (req, res) => {
  const { id } = parseInput(idParam, req.params);
  await db.query("DELETE FROM contact_messages WHERE id = ?", [id]);
  res.json({ ok: true });
});

/* ================================================================
 *  TUTORS
 * ================================================================ */

/** adminListTutors — GET /api/admin/tutors */
adminRouter.get("/tutors", async (_req, res) => {
  const [rows] = (await db.query("SELECT * FROM tutors ORDER BY created_at DESC")) as any;
  res.json(rows.map(withParsedJson));
});

/** adminGetTutor — GET /api/admin/tutors/:id  (null when not found) */
adminRouter.get("/tutors/:id", async (req, res) => {
  const { id } = parseInput(idParam, req.params);
  const tutor = await findOne("SELECT * FROM tutors WHERE id = ?", [id]);
  if (!tutor) {
    res.json(null);
    return;
  }
  res.json({
    ...withParsedJson(tutor),
    photo_url_signed: signedFileUrl(req, "tutor-photos", tutor.photo_url, ADMIN_FILE_TTL),
  });
});

/** adminSetTutorActive — PATCH /api/admin/tutors/:id/active  { is_active } */
adminRouter.patch("/tutors/:id/active", async (req, res) => {
  const { id } = parseInput(idParam, req.params);
  const { is_active } = parseInput(z.object({ is_active: z.boolean() }), req.body);
  await db.query("UPDATE tutors SET is_active = ? WHERE id = ?", [is_active ? 1 : 0, id]);
  res.json({ ok: true });
});

const tutorPatchSchema = z
  .object({
    name: z.string().min(2).max(120),
    title: z.string().max(200),
    qualification: z.string().max(200),
    experience: z.string().max(60),
    bio: z.string().max(4000),
    methodology: z.string().max(4000),
    gender: z.string().max(20),
    nationality: z.string().max(60),
    country: z.string().max(60),
    city: z.string().max(60),
    timezone: z.string().max(40),
    availability: z.enum(["Available", "Fully Booked", "Limited Availability"]),
    subjects: z.array(z.string()),
    curriculums: z.array(z.string()),
    grade_levels: z.array(z.string()),
    languages: z.array(z.string()),
    education: z.array(z.any()),
    schedule: z.array(z.any()),
    photo_url: z.string().max(500).nullable(),
    is_active: z.boolean(),
    rating: z.number().min(0).max(5),
    reviews: z.number().int().min(0).max(100000),
    is_featured: z.boolean(),
  })
  .partial();

/** adminUpdateTutor — PUT /api/admin/tutors/:id  { patch } (same body shape as before, minus id) */
adminRouter.put("/tutors/:id", async (req, res) => {
  const { id } = parseInput(idParam, req.params);
  const { patch } = parseInput(z.object({ patch: tutorPatchSchema }), req.body);
  const entries = Object.entries(patch).filter(([, v]) => v !== undefined);
  if (entries.length > 0) {
    // Column names come from the schema's fixed keys, never from user input.
    const setSql = entries.map(([k]) => `\`${k}\` = ?`).join(", ");
    await db.query(`UPDATE tutors SET ${setSql} WHERE id = ?`, [...entries.map(([k, v]) => toDbValue(k, v)), id]);
  }
  res.json({ ok: true });
});

const photoUpload = multer({ storage: multer.memoryStorage(), limits: { fileSize: MAX_UPLOAD_BYTES, files: 1 } });

/**
 * Upload a new tutor photo — POST /api/admin/tutors/:id/photo  (multipart, field "photo")
 * Replaces the browser's direct Supabase upload on the edit-tutor page.
 * Returns { path }; save it with PUT /api/admin/tutors/:id { patch: { photo_url: path } }.
 */
adminRouter.post("/tutors/:id/photo", photoUpload.single("photo"), async (req, res) => {
  const { id } = parseInput(idParam, req.params);
  const photo = checkUpload(req.file, "image", "Photo");
  const filePath = `tutors/${id}-${Date.now()}-${sanitizeName(photo.originalname)}`;
  await saveFile("tutor-photos", filePath, photo.buffer);
  res.json({ path: filePath, url: signedFileUrl(req, "tutor-photos", filePath, ADMIN_FILE_TTL) });
});

/**
 * adminDeleteTutor — DELETE /api/admin/tutors/:id
 * Permanently removes the tutor; the linked application is kept and marked "removed".
 */
adminRouter.delete("/tutors/:id", async (req, res) => {
  const { id } = parseInput(idParam, req.params);
  const existing = await findOne<{ photo_url: string | null; application_id: string | null }>(
    "SELECT photo_url, application_id FROM tutors WHERE id = ?",
    [id],
  );
  await db.query("DELETE FROM tutors WHERE id = ?", [id]);
  if (existing?.application_id) {
    await db.query("UPDATE tutor_applications SET status = 'removed' WHERE id = ?", [existing.application_id]);
  }
  // Remove the photo file — unless an application (or another tutor) still uses it.
  // Approved tutors share their photo with their application, so it's usually kept.
  const photo = existing?.photo_url;
  if (photo && !/^https?:\/\//.test(photo)) {
    const stillUsed = await findOne(
      "SELECT 1 FROM tutor_applications WHERE photo_path = ? UNION ALL SELECT 1 FROM tutors WHERE photo_url = ? LIMIT 1",
      [photo, photo],
    );
    if (!stillUsed) await deleteFile("tutor-photos", photo);
  }
  res.json({ ok: true });
});

/* ================================================================
 *  DASHBOARD
 * ================================================================ */

/** adminStatsSummary — GET /api/admin/stats */
adminRouter.get("/stats", async (_req, res) => {
  const [[apps], [tutors], [bookings], [messages]] = (await Promise.all([
    db.query(
      `SELECT COUNT(*) AS total,
              COALESCE(SUM(status = 'pending'), 0)  AS pending,
              COALESCE(SUM(status = 'approved'), 0) AS approved,
              COALESCE(SUM(status = 'rejected'), 0) AS rejected
         FROM tutor_applications`,
    ),
    db.query("SELECT COUNT(*) AS n FROM tutors WHERE deleted_at IS NULL"),
    db.query("SELECT COUNT(*) AS n FROM trial_bookings"),
    db.query("SELECT COUNT(*) AS n FROM contact_messages"),
  ])) as any;
  res.json({
    applications: {
      total: Number(apps[0].total),
      pending: Number(apps[0].pending),
      approved: Number(apps[0].approved),
      rejected: Number(apps[0].rejected),
    },
    tutors: Number(tutors[0].n),
    bookings: Number(bookings[0].n),
    messages: Number(messages[0].n),
  });
});
