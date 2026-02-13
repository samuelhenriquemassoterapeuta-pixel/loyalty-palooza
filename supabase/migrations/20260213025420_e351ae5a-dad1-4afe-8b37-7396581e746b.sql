
-- Create storage bucket for social post screenshots
INSERT INTO storage.buckets (id, name, public)
VALUES ('social-posts', 'social-posts', false)
ON CONFLICT (id) DO NOTHING;

-- Users can upload their own screenshots
CREATE POLICY "Users can upload social post screenshots"
ON storage.objects FOR INSERT
WITH CHECK (
  bucket_id = 'social-posts'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Users can view their own screenshots
CREATE POLICY "Users can view own social post screenshots"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'social-posts'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Admins can view all social post screenshots
CREATE POLICY "Admins can view all social post screenshots"
ON storage.objects FOR SELECT
USING (
  bucket_id = 'social-posts'
  AND public.has_role(auth.uid(), 'admin')
);
