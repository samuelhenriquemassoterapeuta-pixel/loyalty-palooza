-- Create a general admin uploads bucket for images used across the platform
INSERT INTO storage.buckets (id, name, public) VALUES ('admin-uploads', 'admin-uploads', true)
ON CONFLICT (id) DO NOTHING;

-- Allow authenticated users to upload
CREATE POLICY "Authenticated users can upload admin assets"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'admin-uploads');

-- Public read access
CREATE POLICY "Public read access for admin uploads"
ON storage.objects FOR SELECT
USING (bucket_id = 'admin-uploads');

-- Admin can delete
CREATE POLICY "Authenticated users can delete admin uploads"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'admin-uploads');