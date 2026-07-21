
ALTER TABLE public.tutor_applications
  ADD COLUMN IF NOT EXISTS rejection_reason text,
  ADD COLUMN IF NOT EXISTS rejection_comments text,
  ADD COLUMN IF NOT EXISTS rejected_by uuid,
  ADD COLUMN IF NOT EXISTS rejected_at timestamptz,
  ADD COLUMN IF NOT EXISTS rejection_email_status text,
  ADD COLUMN IF NOT EXISTS rejection_email_error text,
  ADD COLUMN IF NOT EXISTS rejection_email_attempted_at timestamptz;
