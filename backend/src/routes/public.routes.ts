// Public API — replaces the PUBLIC READS / PUBLIC WRITES server functions in
// frontend/src/lib/tutor-api.functions.ts. Same inputs, same response shapes.
import { randomUUID } from "node:crypto";
import { Router } from "express";
import rateLimit from "express-rate-limit";
import multer from "multer";
import { z } from "zod";
import { db } from "../config/db.js";
import { HttpError, parseInput } from "../lib/http.js";
import { withParsedJson } from "../lib/rows.js";
import {
  checkUpload,
  deleteFile,
  MAX_UPLOAD_BYTES,
  sanitizeName,
  saveFile,
  signedFileUrl,
  uniqueTag,
  type Bucket,
} from "../services/files.js";
import {
  sendApplicantConfirmation,
  sendContactNotification,
  sendNewApplicationNotification,
} from "../services/email.js";

export const publicRouter = Router();

const PHOTO_URL_TTL = 60 * 60 * 24; // public tutor photo links last 24h, as before

// Only these columns are ever exposed publicly (no application_id, timestamps, etc.).
const PUBLIC_TUTOR_COLUMNS =
  "id, slug, name, title, photo_url, qualification, experience, subjects, curriculums, grade_levels, languages, bio, gender, nationality, country, city, timezone, availability, methodology, education, schedule, rating, reviews, is_featured";

// Spam protection for the public forms: 10 submissions per IP per 15 minutes,
// counted separately for each form.
const formLimiter = () =>
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 10,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    message: { error: "Too many submissions. Please try again in a few minutes." },
  });

/* ================================================================
 *  PUBLIC READS
 * ================================================================ */

/** listPublicTutors — GET /api/tutors */
publicRouter.get("/tutors", async (req, res) => {
  const [rows] = (await db.query(
    `SELECT ${PUBLIC_TUTOR_COLUMNS} FROM tutors
      WHERE is_active = 1 AND deleted_at IS NULL
      ORDER BY is_featured DESC, rating DESC`,
  )) as any;
  res.json(
    rows.map((t: any) => ({
      ...withParsedJson(t),
      photo_url: signedFileUrl(req, "tutor-photos", t.photo_url, PHOTO_URL_TTL),
    })),
  );
});

/** Slugs for sitemap.xml — GET /api/tutors/slugs */
publicRouter.get("/tutors/slugs", async (_req, res) => {
  const [rows] = (await db.query(
    "SELECT slug FROM tutors WHERE is_active = 1 AND deleted_at IS NULL ORDER BY slug",
  )) as any;
  res.json(rows);
});

/** getPublicTutorBySlug — GET /api/tutors/:slug  (returns null when not found) */
publicRouter.get("/tutors/:slug", async (req, res) => {
  const { slug } = parseInput(z.object({ slug: z.string().min(1).max(255) }), req.params);
  const [rows] = (await db.query(
    `SELECT ${PUBLIC_TUTOR_COLUMNS} FROM tutors
      WHERE slug = ? AND is_active = 1 AND deleted_at IS NULL LIMIT 1`,
    [slug],
  )) as any;
  const tutor = rows[0];
  if (!tutor) {
    res.json(null);
    return;
  }
  res.json({ ...withParsedJson(tutor), photo_url: signedFileUrl(req, "tutor-photos", tutor.photo_url, PHOTO_URL_TTL) });
});

/* ================================================================
 *  PUBLIC WRITES
 * ================================================================ */

const educationItemSchema = z.object({
  qualification: z.string(),
  degree: z.string(),
  institution: z.string(),
  year: z.string(),
});

// Same as the old applicationSchema, minus the file paths — the files now
// arrive in the same request and the server decides where to store them.
const applicationSchema = z.object({
  full_name: z.string().min(2).max(120),
  gender: z.string().max(20),
  nationality: z.string().max(60),
  country: z.string().max(60),
  city: z.string().max(60),
  timezone: z.string().max(40).optional().default(""),
  email: z.string().email().max(160),
  phone: z.string().max(40),
  whatsapp: z.string().max(40),
  preferred_contact: z.enum(["Email", "WhatsApp", "Phone"]),
  professional_title: z.string().min(2).max(160),
  qualification: z.string().max(200),
  experience_years: z.string().max(40),
  bio: z.string().max(4000),
  methodology: z.string().max(4000),
  subjects: z.array(z.string().max(200)).min(1).max(40),
  curriculums: z.array(z.string().max(200)).min(1).max(40),
  grade_levels: z.array(z.string().max(200)).min(1).max(20),
  languages: z.array(z.string().max(100)).min(1).max(20),
  education: z.array(educationItemSchema).max(10),
  schedule: z
    .array(z.object({ day: z.string(), slots: z.array(z.string()) }))
    .max(10)
    .optional()
    .default([]),
});

const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: MAX_UPLOAD_BYTES, files: 4, fields: 5, fieldSize: 100 * 1024 },
});

/**
 * submitTutorApplication — POST /api/applications
 * multipart/form-data:
 *   data        JSON string with the application fields
 *   photo       profile photo (JPG/PNG/WebP, required)
 *   cv          CV (PDF/DOC/DOCX, required)
 *   cnic_front  national ID front (JPG/PNG/WebP, optional)
 *   cnic_back   national ID back  (JPG/PNG/WebP, optional)
 */
publicRouter.post(
  "/applications",
  formLimiter(),
  upload.fields([
    { name: "photo", maxCount: 1 },
    { name: "cv", maxCount: 1 },
    { name: "cnic_front", maxCount: 1 },
    { name: "cnic_back", maxCount: 1 },
  ]),
  async (req, res) => {
    let raw: unknown;
    try {
      raw = JSON.parse(req.body?.data ?? "");
    } catch {
      throw new HttpError(400, "Invalid input — form data is missing or malformed");
    }
    const data = parseInput(applicationSchema, raw);

    const files = (req.files ?? {}) as Record<string, Express.Multer.File[]>;
    const photo = checkUpload(files.photo?.[0], "image", "Profile photo");
    const cv = checkUpload(files.cv?.[0], "document", "CV / resume");
    const cnicFront = files.cnic_front?.[0] ? checkUpload(files.cnic_front[0], "image", "National ID (front)") : null;
    const cnicBack = files.cnic_back?.[0] ? checkUpload(files.cnic_back[0], "image", "National ID (back)") : null;

    // Same path pattern as the old Supabase uploads, plus a random tag.
    const stamp = `${Date.now()}-${uniqueTag()}`;
    const paths = {
      photo_path: `applications/${stamp}-${sanitizeName(photo.originalname)}`,
      cv_path: `applications/${stamp}-${sanitizeName(cv.originalname)}`,
      cnic_front_path: cnicFront ? `applications/cnic/${stamp}-front-${sanitizeName(cnicFront.originalname)}` : "",
      cnic_back_path: cnicBack ? `applications/cnic/${stamp}-back-${sanitizeName(cnicBack.originalname)}` : "",
    };

    const toSave: [Bucket, string, Buffer][] = [
      ["tutor-photos", paths.photo_path, photo.buffer],
      ["tutor-cvs", paths.cv_path, cv.buffer],
    ];
    if (cnicFront) toSave.push(["tutor-cvs", paths.cnic_front_path, cnicFront.buffer]);
    if (cnicBack) toSave.push(["tutor-cvs", paths.cnic_back_path, cnicBack.buffer]);

    const id = randomUUID();
    const saved: [Bucket, string][] = [];
    try {
      for (const [bucket, filePath, buffer] of toSave) {
        await saveFile(bucket, filePath, buffer);
        saved.push([bucket, filePath]);
      }
      await db.query(
        `INSERT INTO tutor_applications
          (id, status, full_name, gender, nationality, country, city, timezone, email, phone, whatsapp,
           preferred_contact, professional_title, qualification, experience_years, bio, methodology,
           subjects, curriculums, grade_levels, languages, education, schedule,
           photo_path, cv_path, cnic_front_path, cnic_back_path)
         VALUES (?, 'pending', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id, data.full_name, data.gender, data.nationality, data.country, data.city, data.timezone,
          data.email, data.phone, data.whatsapp, data.preferred_contact, data.professional_title,
          data.qualification, data.experience_years, data.bio, data.methodology,
          JSON.stringify(data.subjects), JSON.stringify(data.curriculums), JSON.stringify(data.grade_levels),
          JSON.stringify(data.languages), JSON.stringify(data.education), JSON.stringify(data.schedule),
          paths.photo_path, paths.cv_path, paths.cnic_front_path, paths.cnic_back_path,
        ],
      );
    } catch (err) {
      // Don't leave orphaned files behind if anything failed.
      await Promise.all(saved.map(([bucket, filePath]) => deleteFile(bucket, filePath)));
      throw err;
    }

    // Best-effort notifications — never fail the submission if email is down.
    await Promise.allSettled([
      sendNewApplicationNotification({
        full_name: data.full_name,
        email: data.email,
        phone: data.phone,
        professional_title: data.professional_title,
        subjects: data.subjects,
        country: data.country,
        city: data.city,
      }),
      sendApplicantConfirmation({ to: data.email, applicantName: data.full_name }),
    ]);

    res.json({ id });
  },
);

const bookingSchema = z.object({
  tutor_slug: z.string().max(200).optional().nullable(),
  student_name: z.string().min(2).max(120),
  parent_name: z.string().max(120).optional().nullable(),
  email: z.string().email().max(160),
  phone: z.string().max(40).optional().nullable(),
  whatsapp: z.string().max(40).optional().nullable(),
  country: z.string().max(60).optional().nullable(),
  curriculum: z.string().max(60).optional().nullable(),
  subject: z.string().max(120).optional().nullable(),
  grade_level: z.string().max(60).optional().nullable(),
  preferred_time: z.string().max(120).optional().nullable(),
  notes: z.string().max(2000).optional().nullable(),
});

/** submitTrialBooking — POST /api/bookings */
publicRouter.post("/bookings", formLimiter(), async (req, res) => {
  const d = parseInput(bookingSchema, req.body);
  await db.query(
    `INSERT INTO trial_bookings
      (id, tutor_slug, student_name, parent_name, email, phone, whatsapp, country, curriculum, subject, grade_level, preferred_time, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      randomUUID(), d.tutor_slug ?? null, d.student_name, d.parent_name ?? null, d.email, d.phone ?? null,
      d.whatsapp ?? null, d.country ?? null, d.curriculum ?? null, d.subject ?? null, d.grade_level ?? null,
      d.preferred_time ?? null, d.notes ?? null,
    ],
  );
  res.json({ ok: true });
});

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().max(40).optional().nullable(),
  subject: z.string().max(200).optional().nullable(),
  message: z.string().min(2).max(4000),
});

/** submitContactMessage — POST /api/contact */
publicRouter.post("/contact", formLimiter(), async (req, res) => {
  const d = parseInput(contactSchema, req.body);
  await db.query("INSERT INTO contact_messages (id, name, email, phone, subject, message) VALUES (?, ?, ?, ?, ?, ?)", [
    randomUUID(), d.name, d.email, d.phone ?? null, d.subject ?? null, d.message,
  ]);

  // Best-effort notification to the team — never fail the submission on email.
  try {
    await sendContactNotification(d);
  } catch (e) {
    console.error("[contact-email]", e);
  }
  res.json({ ok: true });
});
