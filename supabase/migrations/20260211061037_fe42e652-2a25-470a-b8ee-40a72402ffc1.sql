-- Create storage bucket for exercise videos
INSERT INTO storage.buckets (id, name, public)
VALUES ('exercise-videos', 'exercise-videos', true)
ON CONFLICT (id) DO NOTHING;

-- Allow public access to view videos
CREATE POLICY "Exercise videos are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'exercise-videos');

-- Allow admins to upload videos
CREATE POLICY "Admins can upload exercise videos"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'exercise-videos' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to update exercise videos
CREATE POLICY "Admins can update exercise videos"
ON storage.objects FOR UPDATE
USING (bucket_id = 'exercise-videos' AND public.has_role(auth.uid(), 'admin'));

-- Allow admins to delete exercise videos
CREATE POLICY "Admins can delete exercise videos"
ON storage.objects FOR DELETE
USING (bucket_id = 'exercise-videos' AND public.has_role(auth.uid(), 'admin'));