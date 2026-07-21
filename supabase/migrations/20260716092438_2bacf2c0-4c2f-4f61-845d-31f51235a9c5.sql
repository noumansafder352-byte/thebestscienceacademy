ALTER TABLE public.tutor_applications
  ADD COLUMN IF NOT EXISTS cnic_front_path text,
  ADD COLUMN IF NOT EXISTS cnic_back_path text;