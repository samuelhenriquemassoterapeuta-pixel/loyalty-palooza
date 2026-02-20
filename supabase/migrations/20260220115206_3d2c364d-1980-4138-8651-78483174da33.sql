
-- ============================================================
-- 1. RECEITAS FAVORITAS (Calculadora de Diluição)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.receitas_favoritas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nome VARCHAR(255) NOT NULL,
  uso VARCHAR(50) NOT NULL,
  vegetal VARCHAR(100) NOT NULL,
  volume_ml NUMERIC NOT NULL,
  concentracao NUMERIC NOT NULL,
  blend JSONB NOT NULL,
  total_gotas INTEGER NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.receitas_favoritas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários podem ver suas receitas"
  ON public.receitas_favoritas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem inserir suas receitas"
  ON public.receitas_favoritas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar suas receitas"
  ON public.receitas_favoritas FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem deletar suas receitas"
  ON public.receitas_favoritas FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger updated_at
CREATE OR REPLACE FUNCTION public.update_receitas_favoritas_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_receitas_favoritas_updated_at
  BEFORE UPDATE ON public.receitas_favoritas
  FOR EACH ROW EXECUTE FUNCTION public.update_receitas_favoritas_updated_at();

-- ============================================================
-- 2. MATERIAIS (Hub de Downloads)
-- ============================================================
CREATE TABLE IF NOT EXISTS public.materiais (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descricao TEXT,
  categoria VARCHAR(100),
  arquivo_url TEXT NOT NULL,
  tipo_arquivo VARCHAR(50),
  tamanho_bytes BIGINT,
  downloads_count INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.materiais ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Materiais públicos para leitura"
  ON public.materiais FOR SELECT
  USING (true);

CREATE POLICY "Admin pode inserir materiais"
  ON public.materiais FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin pode atualizar materiais"
  ON public.materiais FOR UPDATE
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin pode deletar materiais"
  ON public.materiais FOR DELETE
  USING (has_role(auth.uid(), 'admin'));

-- ============================================================
-- 3. MATERIAL DOWNLOADS
-- ============================================================
CREATE TABLE IF NOT EXISTS public.material_downloads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  material_id UUID REFERENCES public.materiais(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  downloaded_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.material_downloads ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem seus downloads"
  ON public.material_downloads FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários registram seus downloads"
  ON public.material_downloads FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NOT NULL);

CREATE POLICY "Admin vê todos os downloads"
  ON public.material_downloads FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

-- ============================================================
-- 4. RPC: increment_material_downloads
-- ============================================================
CREATE OR REPLACE FUNCTION public.increment_material_downloads(material_id UUID)
RETURNS void
LANGUAGE sql
SECURITY DEFINER
SET search_path = public
AS $$
  UPDATE public.materiais
  SET downloads_count = downloads_count + 1
  WHERE id = material_id;
$$;

-- ============================================================
-- 5. COLUNAS NOVAS EM curso_progresso (Quiz + Checklist)
-- ============================================================
ALTER TABLE public.curso_progresso
  ADD COLUMN IF NOT EXISTS quiz_respostas JSONB,
  ADD COLUMN IF NOT EXISTS quiz_score INTEGER,
  ADD COLUMN IF NOT EXISTS checklist_itens JSONB;

-- ============================================================
-- 6. COLUNAS NOVAS EM avaliacoes_posturais (IA)
-- ============================================================
ALTER TABLE public.avaliacoes_posturais
  ADD COLUMN IF NOT EXISTS relatorio TEXT,
  ADD COLUMN IF NOT EXISTS angulos JSONB;
