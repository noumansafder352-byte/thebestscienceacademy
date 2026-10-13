## Goal
Convert the finalized static site into a dynamic app backed by Lovable Cloud (already enabled), without changing the UI. Wire forms → database, add admin auth + dashboard actions, and drive Find Tutors / Tutor Profile from the database.

## 1. Database schema (single migration)

Tables in `public`, all with GRANTs + RLS:

- `profiles` — `id (uuid, FK auth.users)`, `full_name`, `created_at`. Auto-created via `handle_new_user()` trigger.
- `user_roles` — `user_id`, `role app_role` enum (`admin`, `moderator`, `user`). Separate table + `has_role(uuid, app_role)` security-definer function (per user-roles rules).
- `tutor_applications` — full application snapshot: personal, contact (email, phone, whatsapp, preferred method), professional, education (jsonb), subjects/curriculums/grades (text[]), languages, availability, methodology, photo_path, cv_path, admin_notes, `status` enum (`pending`, `approved`, `rejected`), `slug` (nullable, set on approval), created/updated timestamps.
- `tutors` (public profile) — populated on approval. Columns mirror only **public** fields: `slug` (unique), `application_id` (FK), `name`, `title`, `photo_url`, `qualification`, `experience`, `subjects[]`, `curriculums[]`, `grade_levels[]`, `languages[]`, `bio`, `gender`, `nationality`, `country`, `city`, `availability`, `timezone`, `methodology`, `education jsonb`, `rating`, `reviews`, `is_active`.
- `trial_bookings` — student name, parent name, email, phone, country, curriculum, subject, grade, preferred_time, notes, tutor_slug (nullable), created_at, status.
- `contact_messages` — name, email, phone, subject, message, created_at, read/handled flag.

### RLS summary

- `tutors`: `SELECT` public (`TO anon, authenticated USING (is_active)`). Admin all.
- `tutor_applications`: no anon; admin full; anon `INSERT` allowed (public application form). No SELECT for non-admin.
- `trial_bookings` / `contact_messages`: anon `INSERT` only. Admin `SELECT/UPDATE/DELETE`.
- `profiles`: user reads own; admin reads all.
- `user_roles`: `SELECT` for authenticated (used by `has_role`); no client writes.

### Storage buckets

- `tutor-photos` — **public** (profile photos rendered on public pages).
- `tutor-cvs` — **private** (admin-only via signed URL). RLS on `storage.objects`: anon can `INSERT` into `tutor-cvs` (application uploads); only admin can `SELECT`.

## 2. Auth

- Email/password admin login at `/admin/login`.
- No public sign-up UI. First admin bootstrapped by inserting a row in `user_roles` via SQL after the user signs up once (documented in-app).
- Managed `_authenticated/route.tsx` gate is already generated. Wrap `/admin/*` under it: move admin routes to `src/routes/_authenticated/admin.*.tsx` and add a child `beforeLoad` that checks `has_role('admin')` via a server fn — non-admins redirect to `/`.

## 3. Server functions (`src/lib/*.functions.ts`)

- `submitTutorApplication` — public, validates with zod, uploads photo + CV to storage (client-side upload with anon key using RLS insert policy, paths passed to fn), inserts application row.
- `submitTrialBooking`, `submitContactMessage` — public inserts.
- `listApplications`, `getApplication`, `approveApplication`, `rejectApplication`, `updateApplicationNotes` — admin-only, `requireSupabaseAuth` + `has_role('admin')` check. `approveApplication` copies public fields into `tutors`, generates slug, sets active.
- `listAdminStats`, `listMessages`, `listBookings`, `updateBookingStatus`.
- `listPublicTutors`, `getPublicTutorBySlug` — server publishable client (anon RLS), used by public route loaders.

## 4. Frontend wiring (no UI redesign)

- `src/routes/tutors.index.tsx` — replace `allTutors` import with `useSuspenseQuery` on `listPublicTutors`. Keep all filter UI intact; move filtering client-side over fetched data.
- `src/routes/tutors.$slug.tsx` — loader → `getPublicTutorBySlug`. Public fields only (no contact/CV).
- `src/routes/become-a-tutor.tsx` — on submit, upload files then call `submitTutorApplication`. Preserve existing validation UI.
- `src/routes/contact.tsx` and any "Book Free Trial" form/dialog — call the corresponding server fn; show toast.
- Admin dashboard routes (`admin.index`, `admin.applications`, `admin.tutors`, `admin.students`, `admin.messages`) — swap mock arrays for live queries; add Approve/Reject buttons on applications with dialog for admin notes; add "View full application" drawer showing private fields (email, phone, whatsapp, CV signed-URL download).

## 5. Architecture

- `src/lib/` holds `*.functions.ts` (server fns) and `*.server.ts` (admin-only helpers loaded inside handlers).
- `src/hooks/useAuth.ts` + `useIsAdmin.ts` for later student/tutor auth expansion — role-based, so adding `student` / `tutor` roles later is a schema-only change.
- `site-data.ts` retains curriculums/subjects/copy constants; tutor arrays removed.

## Out of scope (per instructions)
No UI redesign. Student/tutor login not implemented now but schema (`user_roles` enum, `profiles`) leaves room to add without refactoring.

## Deliverable order
1. Migration + storage buckets.
2. Server functions + auth gate.
3. Admin login + role check.
4. Rewire admin dashboard.
5. Rewire public pages (Find Tutors, Profile, Become a Tutor, Contact, Trial).
6. Smoke-test end-to-end: submit application → approve in admin → appears on Find Tutors → profile loads by slug.

Approve to proceed and I'll execute in this order.