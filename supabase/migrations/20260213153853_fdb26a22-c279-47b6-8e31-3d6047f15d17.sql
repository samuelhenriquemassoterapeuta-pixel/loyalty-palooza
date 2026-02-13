
-- Create table for corporate page sections content
CREATE TABLE public.corporativo_secoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  subtitulo TEXT,
  descricao TEXT,
  conteudo_detalhado TEXT,
  icone TEXT DEFAULT 'Building2',
  cor TEXT DEFAULT '#3E4331',
  imagem_url TEXT,
  video_url TEXT,
  galeria_urls TEXT[] DEFAULT '{}',
  ordem INTEGER DEFAULT 0,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.corporativo_secoes ENABLE ROW LEVEL SECURITY;

-- Public read access (corporate page is public-facing)
CREATE POLICY "Anyone can view active corporate sections"
ON public.corporativo_secoes FOR SELECT
USING (ativo = true);

-- Admin full access
CREATE POLICY "Admins can manage corporate sections"
ON public.corporativo_secoes FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for corporate media
INSERT INTO storage.buckets (id, name, public) VALUES ('corporativo-media', 'corporativo-media', true);

CREATE POLICY "Anyone can view corporate media"
ON storage.objects FOR SELECT
USING (bucket_id = 'corporativo-media');

CREATE POLICY "Admins can upload corporate media"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'corporativo-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update corporate media"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'corporativo-media' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete corporate media"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'corporativo-media' AND public.has_role(auth.uid(), 'admin'));

-- Trigger for updated_at
CREATE TRIGGER update_corporativo_secoes_updated_at
BEFORE UPDATE ON public.corporativo_secoes
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
