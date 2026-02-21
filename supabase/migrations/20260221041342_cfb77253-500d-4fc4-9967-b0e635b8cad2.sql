
-- =============================================
-- SISTEMA DE REVIEW DE CONTEÚDO DE CURSOS
-- =============================================

-- Adicionar campos de review nas aulas existentes
ALTER TABLE public.curso_aulas ADD COLUMN IF NOT EXISTS review_status TEXT DEFAULT 'pendente';
ALTER TABLE public.curso_aulas ADD COLUMN IF NOT EXISTS reviewed_by UUID;
ALTER TABLE public.curso_aulas ADD COLUMN IF NOT EXISTS reviewed_at TIMESTAMPTZ;
ALTER TABLE public.curso_aulas ADD COLUMN IF NOT EXISTS review_notes TEXT;
ALTER TABLE public.curso_aulas ADD COLUMN IF NOT EXISTS content_source TEXT DEFAULT 'manual';
ALTER TABLE public.curso_aulas ADD COLUMN IF NOT EXISTS published BOOLEAN DEFAULT false;
ALTER TABLE public.curso_aulas ADD COLUMN IF NOT EXISTS disclaimer_required BOOLEAN DEFAULT false;
ALTER TABLE public.curso_aulas ADD COLUMN IF NOT EXISTS curso_id TEXT;

CREATE INDEX IF NOT EXISTS idx_aulas_review_status ON public.curso_aulas(review_status);
CREATE INDEX IF NOT EXISTS idx_aulas_published ON public.curso_aulas(published);

-- =============================================
-- TABELA: Log de Revisões
-- =============================================

CREATE TABLE IF NOT EXISTS public.curso_review_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  aula_id UUID NOT NULL REFERENCES public.curso_aulas(id) ON DELETE CASCADE,
  curso_id TEXT NOT NULL,
  reviewer_id UUID NOT NULL,
  reviewer_name TEXT,
  action TEXT NOT NULL,
  notes TEXT,
  previous_status TEXT,
  new_status TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_review_log_aula ON public.curso_review_log(aula_id);

ALTER TABLE public.curso_review_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage reviews" ON public.curso_review_log
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- TABELA: Disclaimers por Categoria de Curso
-- =============================================

CREATE TABLE IF NOT EXISTS public.curso_disclaimers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  categoria TEXT UNIQUE NOT NULL,
  texto_disclaimer TEXT NOT NULL,
  obrigatorio BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.curso_disclaimers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone reads disclaimers" ON public.curso_disclaimers
  FOR SELECT USING (true);

CREATE POLICY "Admins manage disclaimers" ON public.curso_disclaimers
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

INSERT INTO public.curso_disclaimers (categoria, texto_disclaimer, obrigatorio) VALUES
  ('saude', 'Este conteúdo é informativo e educacional. Não substitui orientação, diagnóstico ou tratamento profissional de saúde. Consulte sempre um profissional qualificado.', true),
  ('nutricao', 'As informações nutricionais são de caráter educativo. Consulte um nutricionista para orientação personalizada. Resultados podem variar de pessoa para pessoa.', true),
  ('terapias', 'Este conteúdo apresenta técnicas terapêuticas complementares. Não substitui tratamento médico convencional. Procure orientação profissional antes de aplicar qualquer técnica.', true),
  ('estetica', 'Os procedimentos apresentados são de caráter educativo. A aplicação deve ser feita por profissionais habilitados. Resultados podem variar.', true),
  ('bem_estar', 'As práticas de bem-estar apresentadas são sugestões gerais. Adapte conforme sua condição física e consulte um profissional em caso de dúvida.', false),
  ('negocios', 'Este conteúdo reflete experiências e estratégias do mercado. Resultados não são garantidos e podem variar conforme contexto e execução.', false)
ON CONFLICT (categoria) DO NOTHING;

-- =============================================
-- TABELA: Playlist Faixas (sistema robusto)
-- =============================================

CREATE TABLE IF NOT EXISTS public.playlist_faixas (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  categoria TEXT NOT NULL,
  titulo TEXT NOT NULL,
  artista TEXT,
  duracao_segundos INTEGER,
  audio_url TEXT,
  spotify_embed_url TEXT,
  youtube_id TEXT,
  thumbnail_url TEXT,
  descricao TEXT,
  tags TEXT[] DEFAULT '{}',
  frequencia_hz INTEGER,
  ordem INTEGER DEFAULT 0,
  ativo BOOLEAN DEFAULT true,
  last_health_check TIMESTAMPTZ,
  health_status TEXT DEFAULT 'unknown',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_playlist_categoria ON public.playlist_faixas(categoria);
CREATE INDEX IF NOT EXISTS idx_playlist_ativo ON public.playlist_faixas(ativo);
CREATE INDEX IF NOT EXISTS idx_playlist_health ON public.playlist_faixas(health_status);

ALTER TABLE public.playlist_faixas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone reads playlists" ON public.playlist_faixas
  FOR SELECT USING (true);

CREATE POLICY "Admins manage playlists" ON public.playlist_faixas
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Seed de exemplo
INSERT INTO public.playlist_faixas (categoria, titulo, frequencia_hz, spotify_embed_url, ordem) VALUES
  ('frequencias_hz', 'Frequência 432Hz — Relaxamento Profundo', 432, 'https://open.spotify.com/embed/track/EXEMPLO_ID', 1),
  ('frequencias_hz', 'Frequência 528Hz — Cura e Transformação', 528, 'https://open.spotify.com/embed/track/EXEMPLO_ID', 2),
  ('relaxante', 'Chuva Suave para Dormir', NULL, 'https://open.spotify.com/embed/track/EXEMPLO_ID', 1),
  ('spa', 'Ambiente SPA — Água e Natureza', NULL, 'https://open.spotify.com/embed/track/EXEMPLO_ID', 1)
ON CONFLICT DO NOTHING;

-- =============================================
-- FUNÇÕES RPC
-- =============================================

CREATE OR REPLACE FUNCTION public.get_review_dashboard()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path TO 'public'
AS $$
DECLARE
  v_result JSONB;
BEGIN
  SELECT jsonb_build_object(
    'total_aulas', (SELECT COUNT(*) FROM curso_aulas),
    'pendentes', (SELECT COUNT(*) FROM curso_aulas WHERE review_status = 'pendente'),
    'em_revisao', (SELECT COUNT(*) FROM curso_aulas WHERE review_status = 'em_revisao'),
    'aprovadas', (SELECT COUNT(*) FROM curso_aulas WHERE review_status = 'aprovado'),
    'rejeitadas', (SELECT COUNT(*) FROM curso_aulas WHERE review_status = 'rejeitado'),
    'publicadas', (SELECT COUNT(*) FROM curso_aulas WHERE published = true),
    'ai_generated', (SELECT COUNT(*) FROM curso_aulas WHERE content_source = 'ai_generated'),
    'ai_sem_revisao', (SELECT COUNT(*) FROM curso_aulas WHERE content_source = 'ai_generated' AND review_status = 'pendente'),
    'por_curso', (
      SELECT COALESCE(jsonb_agg(jsonb_build_object(
        'curso_id', sub.curso_id,
        'total', sub.total,
        'aprovadas', sub.aprovadas,
        'pendentes', sub.pendentes,
        'percentual_aprovado', ROUND(sub.aprovadas::NUMERIC / NULLIF(sub.total, 0) * 100, 1)
      )), '[]'::jsonb)
      FROM (
        SELECT
          curso_id,
          COUNT(*) as total,
          COUNT(*) FILTER (WHERE review_status = 'aprovado') as aprovadas,
          COUNT(*) FILTER (WHERE review_status = 'pendente') as pendentes
        FROM curso_aulas
        GROUP BY curso_id
        ORDER BY pendentes DESC
      ) sub
    )
  ) INTO v_result;

  RETURN v_result;
END;
$$;

CREATE OR REPLACE FUNCTION public.review_aula(
  p_aula_id UUID,
  p_reviewer_id UUID,
  p_action TEXT,
  p_notes TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_aula RECORD;
  v_reviewer RECORD;
BEGIN
  SELECT * INTO v_aula FROM curso_aulas WHERE id = p_aula_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'Aula não encontrada');
  END IF;

  SELECT nome INTO v_reviewer FROM profiles WHERE id = p_reviewer_id;

  INSERT INTO curso_review_log (aula_id, curso_id, reviewer_id, reviewer_name, action, notes, previous_status, new_status)
  VALUES (p_aula_id, COALESCE(v_aula.curso_id, ''), p_reviewer_id, v_reviewer.nome, p_action, p_notes, v_aula.review_status, p_action);

  UPDATE curso_aulas
  SET
    review_status = p_action,
    reviewed_by = p_reviewer_id,
    reviewed_at = now(),
    review_notes = COALESCE(p_notes, review_notes),
    published = CASE WHEN p_action = 'aprovado' THEN true ELSE false END
  WHERE id = p_aula_id;

  RETURN jsonb_build_object(
    'success', true,
    'aula_id', p_aula_id,
    'new_status', p_action
  );
END;
$$;

CREATE OR REPLACE FUNCTION public.get_broken_playlists()
RETURNS TABLE(
  id UUID,
  categoria TEXT,
  titulo TEXT,
  youtube_id TEXT,
  spotify_embed_url TEXT,
  audio_url TEXT,
  health_status TEXT,
  last_health_check TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT
    pf.id, pf.categoria, pf.titulo, pf.youtube_id,
    pf.spotify_embed_url, pf.audio_url, pf.health_status,
    pf.last_health_check
  FROM public.playlist_faixas pf
  WHERE pf.health_status = 'broken'
    OR pf.last_health_check IS NULL
    OR pf.last_health_check < now() - interval '7 days'
  ORDER BY pf.health_status, pf.last_health_check NULLS FIRST;
END;
$$;
