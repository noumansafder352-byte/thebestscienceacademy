
-- Add featured flag and soft-delete to tutors
ALTER TABLE public.tutors
  ADD COLUMN IF NOT EXISTS is_featured boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS deleted_at timestamptz;

CREATE INDEX IF NOT EXISTS tutors_deleted_at_idx ON public.tutors (deleted_at);
