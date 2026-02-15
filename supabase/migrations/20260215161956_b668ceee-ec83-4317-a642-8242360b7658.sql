-- Create landing-media storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('landing-media', 'landing-media', true)
ON CONFLICT (id) DO NOTHING;

-- Public read access
CREATE POLICY "Landing media are publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'landing-media');

-- Admin upload
CREATE POLICY "Admins can upload landing media"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'landing-media' AND public.has_role(auth.uid(), 'admin'));

-- Admin delete
CREATE POLICY "Admins can delete landing media"
ON storage.objects FOR DELETE
USING (bucket_id = 'landing-media' AND public.has_role(auth.uid(), 'admin'));

-- Insert servicos and pacotes sections into landing_config if not present
INSERT INTO public.landing_config (secao, conteudo)
VALUES 
  ('servicos', '{}'),
  ('pacotes', '{}')
ON CONFLICT DO NOTHING;
