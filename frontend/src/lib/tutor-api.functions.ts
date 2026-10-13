// Data functions used by the pages. They used to be TanStack server functions
// talking to Supabase; they now call the Express backend (backend/src/routes).
// Names, arguments ({ data: ... }) and return shapes are unchanged, so pages
// keep calling them exactly as before (directly or via useServerFn).
import { api, ApiError } from "./api";
import type { Tables } from "./database.types";

type Tutor = Tables<"tutors">;
type TutorApplication = Tables<"tutor_applications">;
type TrialBooking = Tables<"trial_bookings">;
type ContactMessage = Tables<"contact_messages">;

/** Public tutor profile: whitelisted columns, photo_url is a ready-to-use (signed) link. */
export type PublicTutor = Pick<
  Tutor,
  | "id"
  | "slug"
  | "name"
  | "title"
  | "photo_url"
  | "qualification"
  | "experience"
  | "subjects"
  | "curriculums"
  | "grade_levels"
  | "languages"
  | "bio"
  | "gender"
  | "nationality"
  | "country"
  | "city"
  | "timezone"
  | "availability"
  | "methodology"
  | "education"
  | "schedule"
  | "rating"
  | "reviews"
  | "is_featured"
>;

const enc = encodeURIComponent;

/* ================================================================
 *  PUBLIC READS
 * ================================================================ */

export const listPublicTutors = () => api<PublicTutor[]>("/api/tutors");

export const getPublicTutorBySlug = ({ data }: { data: { slug: string } }) =>
  api<PublicTutor | null>(`/api/tutors/${enc(data.slug)}`);

/** Active tutor slugs, for sitemap.xml. */
export const listTutorSlugs = () => api<{ slug: string }[]>("/api/tutors/slugs");

/* ================================================================
 *  PUBLIC WRITES
 * ================================================================ */

export type TutorApplicationInput = {
  full_name: string;
  gender: string;
  nationality: string;
  country: string;
  city: string;
  timezone?: string;
  email: string;
  phone: string;
  whatsapp: string;
  preferred_contact: "Email" | "WhatsApp" | "Phone";
  professional_title: string;
  qualification: string;
  experience_years: string;
  bio: string;
  methodology: string;
  subjects: string[];
  curriculums: string[];
  grade_levels: string[];
  languages: string[];
  education: { qualification: string; degree: string; institution: string; year: string }[];
  schedule?: { day: string; slots: string[] }[];
};

/**
 * Submits the application and its files in one request. The server checks the
 * files and stores them (replaces the old direct uploads to Supabase Storage).
 */
export const submitTutorApplication = ({
  data,
  files,
}: {
  data: TutorApplicationInput;
  files: { photo: File; cv: File; cnic_front?: File | null; cnic_back?: File | null };
}) => {
  const form = new FormData();
  form.append("data", JSON.stringify(data));
  form.append("photo", files.photo);
  form.append("cv", files.cv);
  if (files.cnic_front) form.append("cnic_front", files.cnic_front);
  if (files.cnic_back) form.append("cnic_back", files.cnic_back);
  return api<{ id: string }>("/api/applications", { method: "POST", form });
};

export type TrialBookingInput = {
  tutor_slug?: string | null;
  student_name: string;
  parent_name?: string | null;
  email: string;
  phone?: string | null;
  whatsapp?: string | null;
  country?: string | null;
  curriculum?: string | null;
  subject?: string | null;
  grade_level?: string | null;
  preferred_time?: string | null;
  notes?: string | null;
};

export const submitTrialBooking = ({ data }: { data: TrialBookingInput }) =>
  api<{ ok: true }>("/api/bookings", { method: "POST", body: data });

export type ContactMessageInput = {
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  message: string;
};

export const submitContactMessage = ({ data }: { data: ContactMessageInput }) =>
  api<{ ok: true }>("/api/contact", { method: "POST", body: data });

/* ================================================================
 *  AUTH
 * ================================================================ */

export type AuthMe = {
  user: { id: string; email: string; full_name: string | null };
  isAdmin: boolean;
  userId: string;
};

export const login = ({ data }: { data: { email: string; password: string } }) =>
  api<AuthMe>("/api/auth/login", { method: "POST", body: data });

export const logout = () => api<{ ok: true }>("/api/auth/logout", { method: "POST" });

/** The signed-in user, or null when not signed in. */
export async function getCurrentUser(): Promise<AuthMe | null> {
  try {
    return await api<AuthMe>("/api/auth/me");
  } catch (err) {
    if (err instanceof ApiError && err.status === 401) return null;
    throw err;
  }
}

/* ================================================================
 *  ADMIN-ONLY
 * ================================================================ */

export const getIsAdmin = async () => {
  const me = await api<AuthMe>("/api/auth/me");
  return { isAdmin: me.isAdmin, userId: me.userId };
};

export const adminListApplications = () => api<TutorApplication[]>("/api/admin/applications");

export const adminGetApplication = ({ data }: { data: { id: string } }) =>
  api<
    | (TutorApplication & {
        cv_url: string | null;
        photo_url: string | null;
        cnic_front_url: string | null;
        cnic_back_url: string | null;
      })
    | null
  >(`/api/admin/applications/${enc(data.id)}`);

export const adminUpdateApplicationNotes = ({
  data,
}: {
  data: { id: string; admin_notes: string };
}) =>
  api<{ ok: true }>(`/api/admin/applications/${enc(data.id)}/notes`, {
    method: "PATCH",
    body: { admin_notes: data.admin_notes },
  });

export const REJECTION_REASON_OPTIONS = [
  "Insufficient teaching experience",
  "Qualifications do not meet requirements",
  "Incomplete application / documents",
  "Subject specialisation not currently needed",
  "Unable to verify credentials",
  "Other",
] as const;

type EmailResult = { ok: true; emailStatus: "sent" | "skipped" | "failed"; emailError?: string };

export const adminRejectApplication = ({
  data,
}: {
  data: { id: string; reason: string; comments?: string | null };
}) =>
  api<EmailResult>(`/api/admin/applications/${enc(data.id)}/reject`, {
    method: "POST",
    body: { reason: data.reason, comments: data.comments ?? null },
  });

export const adminResendRejectionEmail = ({ data }: { data: { id: string } }) =>
  api<EmailResult>(`/api/admin/applications/${enc(data.id)}/resend-rejection`, { method: "POST" });

export const adminReopenApplication = ({ data }: { data: { id: string } }) =>
  api<{ ok: true }>(`/api/admin/applications/${enc(data.id)}/reopen`, { method: "POST" });

export const adminDeleteApplication = ({ data }: { data: { id: string } }) =>
  api<{ ok: true }>(`/api/admin/applications/${enc(data.id)}`, { method: "DELETE" });

export const adminApproveApplication = ({ data }: { data: { id: string } }) =>
  api<{ tutorId: string; slug: string }>(`/api/admin/applications/${enc(data.id)}/approve`, {
    method: "POST",
  });

export const adminListBookings = () => api<TrialBooking[]>("/api/admin/bookings");

export const adminListMessages = () => api<ContactMessage[]>("/api/admin/messages");

export const adminMarkMessageRead = ({
  data,
}: {
  data: { id: string; status?: "read" | "unread" };
}) =>
  api<{ ok: true }>(`/api/admin/messages/${enc(data.id)}/read`, {
    method: "PATCH",
    body: { status: data.status },
  });

export const adminGetMessage = ({ data }: { data: { id: string } }) =>
  api<ContactMessage | null>(`/api/admin/messages/${enc(data.id)}`);

export const adminDeleteMessage = ({ data }: { data: { id: string } }) =>
  api<{ ok: true }>(`/api/admin/messages/${enc(data.id)}`, { method: "DELETE" });

export const adminListTutors = () => api<Tutor[]>("/api/admin/tutors");

export const adminSetTutorActive = ({ data }: { data: { id: string; is_active: boolean } }) =>
  api<{ ok: true }>(`/api/admin/tutors/${enc(data.id)}/active`, {
    method: "PATCH",
    body: { is_active: data.is_active },
  });

export const adminGetTutor = ({ data }: { data: { id: string } }) =>
  api<(Tutor & { photo_url_signed: string | null }) | null>(`/api/admin/tutors/${enc(data.id)}`);

export type TutorPatch = Partial<
  Pick<
    Tutor,
    | "name"
    | "title"
    | "qualification"
    | "experience"
    | "bio"
    | "methodology"
    | "gender"
    | "nationality"
    | "country"
    | "city"
    | "timezone"
    | "availability"
    | "subjects"
    | "curriculums"
    | "grade_levels"
    | "languages"
    | "education"
    | "schedule"
    | "photo_url"
    | "is_active"
    | "rating"
    | "reviews"
    | "is_featured"
  >
>;

export const adminUpdateTutor = ({ data }: { data: { id: string; patch: TutorPatch } }) =>
  api<{ ok: true }>(`/api/admin/tutors/${enc(data.id)}`, {
    method: "PUT",
    body: { patch: data.patch },
  });

/** Uploads a new tutor photo; returns the stored path to save as photo_url. */
export const adminUploadTutorPhoto = ({ data }: { data: { id: string; file: File } }) => {
  const form = new FormData();
  form.append("photo", data.file);
  return api<{ path: string; url: string }>(`/api/admin/tutors/${enc(data.id)}/photo`, {
    method: "POST",
    form,
  });
};

export const adminDeleteTutor = ({ data }: { data: { id: string } }) =>
  api<{ ok: true }>(`/api/admin/tutors/${enc(data.id)}`, { method: "DELETE" });

export const adminStatsSummary = () =>
  api<{
    applications: { total: number; pending: number; approved: number; rejected: number };
    tutors: number;
    bookings: number;
    messages: number;
  }>("/api/admin/stats");
