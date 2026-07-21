
-- Allow anon/authenticated to INSERT files into either bucket (application submissions)
CREATE POLICY "Anyone can upload tutor photos" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'tutor-photos');

CREATE POLICY "Anyone can upload tutor cvs" ON storage.objects
  FOR INSERT TO anon, authenticated
  WITH CHECK (bucket_id = 'tutor-cvs');

-- Admins can view all
CREATE POLICY "Admins can view tutor photos" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'tutor-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can view tutor cvs" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'tutor-cvs' AND public.has_role(auth.uid(), 'admin'));

-- Admins can delete/update
CREATE POLICY "Admins can manage tutor photos" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'tutor-photos' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'tutor-photos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage tutor cvs" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'tutor-cvs' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'tutor-cvs' AND public.has_role(auth.uid(), 'admin'));
