
-- Create table for HeadSpa real images
CREATE TABLE public.headspa_imagens (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  etapa_key text NOT NULL UNIQUE,
  imagem_url text NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.headspa_imagens ENABLE ROW LEVEL SECURITY;

-- Public read
CREATE POLICY "HeadSpa imagens visíveis para todos"
ON public.headspa_imagens FOR SELECT
USING (true);

-- Admin write
CREATE POLICY "Admins gerenciam headspa imagens"
ON public.headspa_imagens FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Storage bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('headspa-imagens', 'headspa-imagens', true);

-- Storage policies
CREATE POLICY "HeadSpa imagens públicas"
ON storage.objects FOR SELECT
USING (bucket_id = 'headspa-imagens');

CREATE POLICY "Admins upload headspa imagens"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = 'headspa-imagens' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins update headspa imagens"
ON storage.objects FOR UPDATE
USING (bucket_id = 'headspa-imagens' AND has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins delete headspa imagens"
ON storage.objects FOR DELETE
USING (bucket_id = 'headspa-imagens' AND has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_headspa_imagens_updated_at
BEFORE UPDATE ON public.headspa_imagens
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
