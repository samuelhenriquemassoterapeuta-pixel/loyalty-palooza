
-- Add rich content columns to servicos
ALTER TABLE public.servicos
  ADD COLUMN IF NOT EXISTS descricao_detalhada text,
  ADD COLUMN IF NOT EXISTS beneficios text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS imagens text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS video_url text,
  ADD COLUMN IF NOT EXISTS imagem_capa text;

-- Create storage bucket for service images
INSERT INTO storage.buckets (id, name, public) VALUES ('servico-imagens', 'servico-imagens', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies for service images
CREATE POLICY "Admins upload service images"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'servico-imagens' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins update service images"
ON storage.objects FOR UPDATE
USING (bucket_id = 'servico-imagens' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete service images"
ON storage.objects FOR DELETE
USING (bucket_id = 'servico-imagens' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Service images publicly accessible"
ON storage.objects FOR SELECT
USING (bucket_id = 'servico-imagens');
