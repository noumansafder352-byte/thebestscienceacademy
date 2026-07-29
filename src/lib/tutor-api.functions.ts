import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/* ================================================================
 *  PUBLIC READS  (use service-role admin client server-side to fetch
 *  only whitelisted public columns and generate signed URLs for the
 *  private tutor-photos bucket)
 * ================================================================ */

const PUBLIC_TUTOR_COLUMNS =
  "id, slug, name, title, photo_url, qualification, experience, subjects, curriculums, grade_levels, languages, bio, gender, nationality, country, city, timezone, availability, methodology, education, schedule, rating, reviews";

async function signPhoto(admin: any, path: string | null): Promise<string | null> {
  if (!path) return null;
  if (path.startsWith("http")) return path;
  const { data } = await admin.storage.from("tutor-photos").createSignedUrl(path, 60 * 60 * 24);
  return data?.signedUrl ?? null;
}

export const listPublicTutors = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("tutors")
    .select(PUBLIC_TUTOR_COLUMNS + ", is_featured")
    .eq("is_active", true)
    .is("deleted_at", null)
    .order("is_featured", { ascending: false })
    .order("rating", { ascending: false });
  if (error) throw error;
  const tutors = await Promise.all(
    (data ?? []).map(async (t: any) => ({ ...t, photo_url: await signPhoto(supabaseAdmin, t.photo_url) })),
  );
  return tutors;
});

export const getPublicTutorBySlug = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: z.string().min(1) }).parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: tutor, error } = await supabaseAdmin
      .from("tutors")
      .select(PUBLIC_TUTOR_COLUMNS + ", is_featured")
      .eq("slug", data.slug)
      .eq("is_active", true)
      .is("deleted_at", null)
      .maybeSingle();
    if (error) throw error;
    if (!tutor) return null;
    return { ...(tutor as any), photo_url: await signPhoto(supabaseAdmin, (tutor as any).photo_url) };
  });

/* ================================================================
 *  PUBLIC WRITES  (submit forms — anon-safe via RLS INSERT policies)
 * ================================================================ */

const educationItemSchema = z.object({
  qualification: z.string(),
  degree: z.string(),
  institution: z.string(),
  year: z.string(),
});

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
  subjects: z.array(z.string()).min(1).max(40),
  curriculums: z.array(z.string()).min(1).max(40),
  grade_levels: z.array(z.string()).min(1).max(20),
  languages: z.array(z.string()).min(1).max(20),
  education: z.array(educationItemSchema).max(10),
  schedule: z
    .array(z.object({ day: z.string(), slots: z.array(z.string()) }))
    .max(10)
    .optional()
    .default([]),
  photo_path: z.string().min(1),
  cv_path: z.string().min(1),
  cnic_front_path: z.string().optional().default(""),
  cnic_back_path: z.string().optional().default(""),
});

export const submitTutorApplication = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => applicationSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: row, error } = await supabaseAdmin
      .from("tutor_applications")
      .insert({ ...data, status: "pending" })
      .select("id")
      .single();
    if (error) throw error;

    // Best-effort notifications — never fail the submission if email is down.
    try {
      const { sendNewApplicationNotification, sendApplicantConfirmation } = await import("./email.server");
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
    } catch (e) {
      console.error("[submit-email]", e);
    }

    return { id: row.id };
  });

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

export const submitTrialBooking = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => bookingSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("trial_bookings").insert(data);
    if (error) throw error;
    return { ok: true };
  });

const contactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email().max(160),
  phone: z.string().max(40).optional().nullable(),
  subject: z.string().max(200).optional().nullable(),
  message: z.string().min(2).max(4000),
});

export const submitContactMessage = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contactSchema.parse(input))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("contact_messages").insert(data);
    if (error) throw error;
    return { ok: true };
  });

/* ================================================================
 *  ADMIN-ONLY
 * ================================================================ */

async function assertAdmin(ctx: { supabase: any; userId: string }) {
  const { data, error } = await ctx.supabase.rpc("has_role", {
    _user_id: ctx.userId,
    _role: "admin",
  });
  if (error) throw error;
  if (!data) throw new Error("Forbidden: admin role required");
}

export const getIsAdmin = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (error) throw error;
    return { isAdmin: !!data, userId: context.userId };
  });

export const adminListApplications = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data, error } = await context.supabase
      .from("tutor_applications")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  });

export const adminGetApplication = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: app, error } = await context.supabase
      .from("tutor_applications")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw error;
    if (!app) return null;
    let cvUrl: string | null = null;
    let photoUrl: string | null = null;
    let cnicFrontUrl: string | null = null;
    let cnicBackUrl: string | null = null;
    if (app.cv_path) {
      const res = await supabaseAdmin.storage.from("tutor-cvs").createSignedUrl(app.cv_path, 60 * 60);
      cvUrl = res.data?.signedUrl ?? null;
    }
    if (app.photo_path) {
      const res = await supabaseAdmin.storage.from("tutor-photos").createSignedUrl(app.photo_path, 60 * 60);
      photoUrl = res.data?.signedUrl ?? null;
    }
    if (app.cnic_front_path) {
      const res = await supabaseAdmin.storage.from("tutor-cvs").createSignedUrl(app.cnic_front_path, 60 * 60);
      cnicFrontUrl = res.data?.signedUrl ?? null;
    }
    if (app.cnic_back_path) {
      const res = await supabaseAdmin.storage.from("tutor-cvs").createSignedUrl(app.cnic_back_path, 60 * 60);
      cnicBackUrl = res.data?.signedUrl ?? null;
    }
    return { ...app, cv_url: cvUrl, photo_url: photoUrl, cnic_front_url: cnicFrontUrl, cnic_back_url: cnicBackUrl };
  });

export const adminUpdateApplicationNotes = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) =>
    z.object({ id: z.string().uuid(), admin_notes: z.string().max(4000) }).parse(i),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("tutor_applications")
      .update({ admin_notes: data.admin_notes })
      .eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

const REJECTION_REASONS = [
  "Insufficient teaching experience",
  "Qualifications do not meet requirements",
  "Incomplete application / documents",
  "Subject specialisation not currently needed",
  "Unable to verify credentials",
  "Other",
] as const;

export const adminRejectApplication = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) =>
    z
      .object({
        id: z.string().uuid(),
        reason: z.string().min(2).max(200),
        comments: z.string().max(2000).optional().nullable(),
      })
      .parse(i),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const now = new Date().toISOString();
    const { data: app, error: fetchErr } = await context.supabase
      .from("tutor_applications")
      .select("id, full_name, email")
      .eq("id", data.id)
      .single();
    if (fetchErr) throw fetchErr;

    const { sendRejectionEmail } = await import("./email.server");
    const result = await sendRejectionEmail({
      to: app.email,
      applicantName: app.full_name,
      reason: data.reason,
      comments: data.comments ?? null,
    });

    const { error } = await context.supabase
      .from("tutor_applications")
      .update({
        status: "rejected",
        reviewed_by: context.userId,
        reviewed_at: now,
        rejected_by: context.userId,
        rejected_at: now,
        rejection_reason: data.reason,
        rejection_comments: data.comments ?? null,
        rejection_email_status: result.status,
        rejection_email_error: result.error ?? null,
        rejection_email_attempted_at: now,
      })
      .eq("id", data.id);
    if (error) throw error;
    return { ok: true, emailStatus: result.status, emailError: result.error };
  });

export const adminResendRejectionEmail = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { data: app, error: fetchErr } = await context.supabase
      .from("tutor_applications")
      .select("id, full_name, email, rejection_reason, rejection_comments, status")
      .eq("id", data.id)
      .single();
    if (fetchErr) throw fetchErr;
    if (app.status !== "rejected") throw new Error("Application is not in a rejected state");
    if (!app.rejection_reason) throw new Error("No rejection reason on file");

    const { sendRejectionEmail } = await import("./email.server");
    const result = await sendRejectionEmail({
      to: app.email,
      applicantName: app.full_name,
      reason: app.rejection_reason,
      comments: app.rejection_comments,
    });

    const { error } = await context.supabase
      .from("tutor_applications")
      .update({
        rejection_email_status: result.status,
        rejection_email_error: result.error ?? null,
        rejection_email_attempted_at: new Date().toISOString(),
      })
      .eq("id", data.id);
    if (error) throw error;
    return { ok: true, emailStatus: result.status, emailError: result.error };
  });

export const REJECTION_REASON_OPTIONS = REJECTION_REASONS;

export const adminReopenApplication = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("tutor_applications")
      .update({ status: "pending", reviewed_by: null, reviewed_at: null })
      .eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

export const adminDeleteApplication = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("tutor_applications").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 80);
}

export const adminApproveApplication = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { data: app, error: appErr } = await context.supabase
      .from("tutor_applications")
      .select("id, full_name, photo_path, email")
      .eq("id", data.id)
      .single();
    if (appErr) throw appErr;

    // Generate unique slug
    const base = slugify(app.full_name);
    let slug = base;
    let suffix = 1;
    // Loop until unique
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { data: existing } = await context.supabase
        .from("tutors")
        .select("id")
        .eq("slug", slug)
        .maybeSingle();
      if (!existing) break;
      suffix += 1;
      slug = `${base}-${suffix}`;
    }

    const { data: tutorId, error: rpcErr } = await context.supabase.rpc("approve_tutor_application", {
      _application_id: data.id,
      _slug: slug,
      _photo_url: (app.photo_path ?? "") as string,
    });
    if (rpcErr) throw rpcErr;

    // Best-effort welcome email — never fail the approval if email is down.
    try {
      const { sendApprovalEmail } = await import("./email.server");
      await sendApprovalEmail({ to: (app as any).email, applicantName: app.full_name });
    } catch (e) {
      console.error("[approve-email]", e);
    }

    return { tutorId, slug };
  });

export const adminListBookings = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data, error } = await context.supabase
      .from("trial_bookings")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  });

export const adminListMessages = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data, error } = await context.supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  });

export const adminMarkMessageRead = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) =>
    z.object({ id: z.string().uuid(), status: z.enum(["read", "unread"]).optional() }).parse(i),
  )
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("contact_messages")
      .update({ status: data.status ?? "read" })
      .eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

export const adminGetMessage = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { data: msg, error } = await context.supabase
      .from("contact_messages")
      .select("*")
      .eq("id", data.id)
      .maybeSingle();
    if (error) throw error;
    return msg;
  });

export const adminDeleteMessage = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { error } = await context.supabase.from("contact_messages").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

export const adminListTutors = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const { data, error } = await context.supabase
      .from("tutors")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) throw error;
    return data ?? [];
  });

export const adminSetTutorActive = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => z.object({ id: z.string().uuid(), is_active: z.boolean() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { error } = await context.supabase
      .from("tutors")
      .update({ is_active: data.is_active })
      .eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

export const adminGetTutor = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: tutor, error } = await context.supabase.from("tutors").select("*").eq("id", data.id).maybeSingle();
    if (error) throw error;
    if (!tutor) return null;
    let photoUrl: string | null = null;
    if (tutor.photo_url) {
      if (tutor.photo_url.startsWith("http")) photoUrl = tutor.photo_url;
      else {
        const res = await supabaseAdmin.storage.from("tutor-photos").createSignedUrl(tutor.photo_url, 60 * 60);
        photoUrl = res.data?.signedUrl ?? null;
      }
    }
    return { ...tutor, photo_url_signed: photoUrl };
  });

const tutorUpdateSchema = z.object({
  id: z.string().uuid(),
  patch: z.object({
    name: z.string().min(2).max(120).optional(),
    title: z.string().max(200).optional(),
    qualification: z.string().max(200).optional(),
    experience: z.string().max(60).optional(),
    bio: z.string().max(4000).optional(),
    methodology: z.string().max(4000).optional(),
    gender: z.string().max(20).optional(),
    nationality: z.string().max(60).optional(),
    country: z.string().max(60).optional(),
    city: z.string().max(60).optional(),
    timezone: z.string().max(40).optional(),
    availability: z.enum(["Available", "Fully Booked", "Limited Availability"]).optional(),
    subjects: z.array(z.string()).optional(),
    curriculums: z.array(z.string()).optional(),
    grade_levels: z.array(z.string()).optional(),
    languages: z.array(z.string()).optional(),
    education: z.array(z.any()).optional(),
    schedule: z.array(z.any()).optional(),
    photo_url: z.string().nullable().optional(),
    is_active: z.boolean().optional(),
    rating: z.number().min(0).max(5).optional(),
    reviews: z.number().int().min(0).max(100000).optional(),
    is_featured: z.boolean().optional(),
  }),
});

export const adminUpdateTutor = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => tutorUpdateSchema.parse(i))
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("tutors").update(data.patch).eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });

export const adminDeleteTutor = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((i: unknown) => z.object({ id: z.string().uuid() }).parse(i))
  .handler(async ({ context, data }) => {
    await assertAdmin(context);
    // Hard delete — permanently remove from tutors table so the tutor
    // no longer appears anywhere on the public website or admin list.
    // The related tutor_application row is preserved (with its status)
    // so admins retain a full application history.
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { data: existing } = await supabaseAdmin
      .from("tutors")
      .select("photo_url, application_id")
      .eq("id", data.id)
      .maybeSingle();
    const { error } = await context.supabase.from("tutors").delete().eq("id", data.id);
    if (error) throw error;
    const photo = (existing as any)?.photo_url as string | null;
    const applicationId = (existing as any)?.application_id as string | null;
    if (applicationId) {
      // Mark the linked application as "removed" so admins retain full history.
      await supabaseAdmin
        .from("tutor_applications")
        .update({ status: "removed" as any })
        .eq("id", applicationId);
    }
    if (photo && !photo.startsWith("http")) {
      await supabaseAdmin.storage.from("tutor-photos").remove([photo]).catch(() => {});
    }
    return { ok: true };
  });

export const adminStatsSummary = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await assertAdmin(context);
    const [apps, tutors, bookings, messages] = await Promise.all([
      context.supabase.from("tutor_applications").select("status"),
      context.supabase
        .from("tutors")
        .select("id", { count: "exact", head: true })
        .is("deleted_at", null),
      context.supabase.from("trial_bookings").select("id", { count: "exact", head: true }),
      context.supabase.from("contact_messages").select("id", { count: "exact", head: true }),
    ]);
    const appRows = (apps.data ?? []) as { status: string }[];
    return {
      applications: {
        total: appRows.length,
        pending: appRows.filter((a) => a.status === "pending").length,
        approved: appRows.filter((a) => a.status === "approved").length,
        rejected: appRows.filter((a) => a.status === "rejected").length,
      },
      tutors: tutors.count ?? 0,
      bookings: bookings.count ?? 0,
      messages: messages.count ?? 0,
    };
  });
