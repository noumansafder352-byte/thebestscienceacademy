
-- ============ Enums ============
CREATE TYPE public.app_role AS ENUM ('admin', 'moderator', 'user');
CREATE TYPE public.application_status AS ENUM ('pending', 'interview', 'approved', 'rejected');
CREATE TYPE public.booking_status AS ENUM ('new', 'contacted', 'scheduled', 'completed', 'cancelled');
CREATE TYPE public.message_status AS ENUM ('unread', 'read', 'archived');
CREATE TYPE public.tutor_availability AS ENUM ('Available', 'Limited Availability', 'Fully Booked');
CREATE TYPE public.preferred_contact AS ENUM ('Email', 'WhatsApp', 'Phone');

-- ============ updated_at helper ============
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

-- ============ Profiles ============
CREATE TABLE public.profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name text,
  email text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.profiles TO authenticated;
GRANT ALL ON public.profiles TO service_role;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile" ON public.profiles
  FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles
  FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

CREATE TRIGGER profiles_updated_at BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email)
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ User roles ============
CREATE TABLE public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
GRANT SELECT ON public.user_roles TO authenticated;
GRANT ALL ON public.user_roles TO service_role;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.has_role(_user_id uuid, _role public.app_role)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role
  );
$$;

CREATE POLICY "Admins can view all roles" ON public.user_roles
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- ============ Tutor applications (private) ============
CREATE TABLE public.tutor_applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  status public.application_status NOT NULL DEFAULT 'pending',

  -- Personal
  full_name text NOT NULL,
  gender text,
  nationality text,
  country text,
  city text,
  timezone text,

  -- Private contact
  email text NOT NULL,
  phone text,
  whatsapp text,
  preferred_contact public.preferred_contact,

  -- Professional
  professional_title text NOT NULL,
  qualification text,
  experience_years text,
  bio text,
  methodology text,

  -- Arrays
  subjects text[] NOT NULL DEFAULT '{}',
  curriculums text[] NOT NULL DEFAULT '{}',
  grade_levels text[] NOT NULL DEFAULT '{}',
  languages text[] NOT NULL DEFAULT '{}',

  -- Structured
  education jsonb NOT NULL DEFAULT '[]'::jsonb,
  schedule jsonb NOT NULL DEFAULT '[]'::jsonb,
  availability public.tutor_availability DEFAULT 'Available',

  -- Files (storage paths)
  photo_path text,
  cv_path text,

  -- Admin
  admin_notes text,
  reviewed_by uuid REFERENCES auth.users(id),
  reviewed_at timestamptz,

  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.tutor_applications TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.tutor_applications TO authenticated;
GRANT ALL ON public.tutor_applications TO service_role;
ALTER TABLE public.tutor_applications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit an application" ON public.tutor_applications
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view applications" ON public.tutor_applications
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update applications" ON public.tutor_applications
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete applications" ON public.tutor_applications
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER tutor_applications_updated_at BEFORE UPDATE ON public.tutor_applications
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ Public tutors ============
CREATE TABLE public.tutors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  application_id uuid REFERENCES public.tutor_applications(id) ON DELETE SET NULL,
  slug text NOT NULL UNIQUE,
  name text NOT NULL,
  title text NOT NULL,
  photo_url text,
  qualification text,
  experience text,
  subjects text[] NOT NULL DEFAULT '{}',
  curriculums text[] NOT NULL DEFAULT '{}',
  grade_levels text[] NOT NULL DEFAULT '{}',
  languages text[] NOT NULL DEFAULT '{}',
  bio text,
  gender text,
  nationality text,
  country text,
  city text,
  timezone text,
  availability public.tutor_availability NOT NULL DEFAULT 'Available',
  methodology text,
  education jsonb NOT NULL DEFAULT '[]'::jsonb,
  schedule jsonb NOT NULL DEFAULT '[]'::jsonb,
  rating numeric(3,2) NOT NULL DEFAULT 5.0,
  reviews integer NOT NULL DEFAULT 0,
  is_active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.tutors TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.tutors TO authenticated;
GRANT ALL ON public.tutors TO service_role;
ALTER TABLE public.tutors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active tutors" ON public.tutors
  FOR SELECT TO anon, authenticated USING (is_active);
CREATE POLICY "Admins can view all tutors" ON public.tutors
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can insert tutors" ON public.tutors
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update tutors" ON public.tutors
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete tutors" ON public.tutors
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER tutors_updated_at BEFORE UPDATE ON public.tutors
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ Trial bookings ============
CREATE TABLE public.trial_bookings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  tutor_slug text,
  student_name text NOT NULL,
  parent_name text,
  email text NOT NULL,
  phone text,
  whatsapp text,
  country text,
  curriculum text,
  subject text,
  grade_level text,
  preferred_time text,
  notes text,
  status public.booking_status NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.trial_bookings TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.trial_bookings TO authenticated;
GRANT ALL ON public.trial_bookings TO service_role;
ALTER TABLE public.trial_bookings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can create a booking" ON public.trial_bookings
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view bookings" ON public.trial_bookings
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update bookings" ON public.trial_bookings
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete bookings" ON public.trial_bookings
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER trial_bookings_updated_at BEFORE UPDATE ON public.trial_bookings
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ Contact messages ============
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  subject text,
  message text NOT NULL,
  status public.message_status NOT NULL DEFAULT 'unread',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.contact_messages TO anon, authenticated;
GRANT SELECT, UPDATE, DELETE ON public.contact_messages TO authenticated;
GRANT ALL ON public.contact_messages TO service_role;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can send a message" ON public.contact_messages
  FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Admins can view messages" ON public.contact_messages
  FOR SELECT TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can update messages" ON public.contact_messages
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins can delete messages" ON public.contact_messages
  FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TRIGGER contact_messages_updated_at BEFORE UPDATE ON public.contact_messages
  FOR EACH ROW EXECUTE FUNCTION public.set_updated_at();

-- ============ Approve application → create tutor ============
CREATE OR REPLACE FUNCTION public.approve_tutor_application(
  _application_id uuid,
  _slug text,
  _photo_url text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _app public.tutor_applications;
  _tutor_id uuid;
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin') THEN
    RAISE EXCEPTION 'Only admins can approve applications';
  END IF;

  SELECT * INTO _app FROM public.tutor_applications WHERE id = _application_id;
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Application not found';
  END IF;

  INSERT INTO public.tutors (
    application_id, slug, name, title, photo_url, qualification, experience,
    subjects, curriculums, grade_levels, languages, bio, gender, nationality,
    country, city, timezone, availability, methodology, education, schedule, is_active
  ) VALUES (
    _app.id, _slug, _app.full_name, _app.professional_title, _photo_url,
    _app.qualification, _app.experience_years,
    _app.subjects, _app.curriculums, _app.grade_levels, _app.languages,
    _app.bio, _app.gender, _app.nationality,
    _app.country, _app.city, _app.timezone,
    COALESCE(_app.availability, 'Available'), _app.methodology,
    _app.education, _app.schedule, true
  )
  RETURNING id INTO _tutor_id;

  UPDATE public.tutor_applications
  SET status = 'approved', reviewed_by = auth.uid(), reviewed_at = now()
  WHERE id = _application_id;

  RETURN _tutor_id;
END;
$$;
