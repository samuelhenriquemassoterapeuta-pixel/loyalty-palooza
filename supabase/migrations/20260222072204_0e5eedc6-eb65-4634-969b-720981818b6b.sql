
-- Tabela para histórico de versões da documentação
CREATE TABLE public.documentation_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  version TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES public.profiles(id),
  changes_summary TEXT,
  is_current BOOLEAN DEFAULT false
);

-- Índices
CREATE INDEX idx_doc_versions_date ON public.documentation_versions(created_at DESC);
CREATE INDEX idx_doc_versions_current ON public.documentation_versions(is_current) WHERE is_current = true;

-- Trigger para manter apenas uma versão atual
CREATE OR REPLACE FUNCTION public.set_current_documentation()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.is_current THEN
    UPDATE public.documentation_versions 
    SET is_current = false 
    WHERE id != NEW.id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER trg_set_current_documentation
  BEFORE INSERT OR UPDATE OF is_current
  ON public.documentation_versions
  FOR EACH ROW
  EXECUTE FUNCTION public.set_current_documentation();

-- RLS
ALTER TABLE public.documentation_versions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage documentation"
  ON public.documentation_versions
  FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Anyone can read current documentation"
  ON public.documentation_versions
  FOR SELECT
  TO authenticated
  USING (is_current = true);
