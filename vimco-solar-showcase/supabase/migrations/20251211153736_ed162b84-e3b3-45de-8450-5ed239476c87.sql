-- Drop existing open storage policies
DROP POLICY IF EXISTS "Anyone can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Anyone can delete project images" ON storage.objects;

-- Create admin-only write policies for storage
CREATE POLICY "Admins can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (
  bucket_id = 'project-images' AND
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can update images"
ON storage.objects FOR UPDATE
TO authenticated
USING (
  bucket_id = 'project-images' AND
  public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Admins can delete images"
ON storage.objects FOR DELETE
TO authenticated
USING (
  bucket_id = 'project-images' AND
  public.has_role(auth.uid(), 'admin')
);