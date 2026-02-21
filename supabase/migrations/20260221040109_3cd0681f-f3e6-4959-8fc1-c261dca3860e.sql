
-- =============================================
-- TABELA: Progresso por Curso (agregado per-curso)
-- =============================================
CREATE TABLE IF NOT EXISTS public.curso_progresso_geral (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  curso_id TEXT NOT NULL,
  modulo_atual TEXT,
  aula_atual TEXT,
  percentual_completo NUMERIC(5,2) DEFAULT 0,
  aulas_completas TEXT[] DEFAULT '{}',
  modulos_completos TEXT[] DEFAULT '{}',
  quizzes_completos JSONB DEFAULT '[]',
  checklists_completos JSONB DEFAULT '[]',
  tempo_total_minutos INTEGER DEFAULT 0,
  ultimo_acesso TIMESTAMPTZ DEFAULT now(),
  iniciado_em TIMESTAMPTZ DEFAULT now(),
  concluido_em TIMESTAMPTZ,
  certificado_gerado BOOLEAN DEFAULT false,
  certificado_url TEXT,
  migrated_from_local BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, curso_id)
);

CREATE INDEX IF NOT EXISTS idx_curso_progresso_geral_user ON public.curso_progresso_geral(user_id);
CREATE INDEX IF NOT EXISTS idx_curso_progresso_geral_curso ON public.curso_progresso_geral(curso_id);
CREATE INDEX IF NOT EXISTS idx_curso_progresso_geral_user_curso ON public.curso_progresso_geral(user_id, curso_id);

-- Trigger updated_at
CREATE TRIGGER set_curso_progresso_geral_updated_at
  BEFORE UPDATE ON public.curso_progresso_geral
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- TABELA: Registro de cada aula assistida (histórico detalhado)
-- =============================================
CREATE TABLE IF NOT EXISTS public.curso_aula_historico (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  curso_id TEXT NOT NULL,
  modulo_id TEXT NOT NULL,
  aula_id TEXT NOT NULL,
  tempo_gasto_segundos INTEGER DEFAULT 0,
  completou BOOLEAN DEFAULT false,
  nota_quiz NUMERIC(5,2),
  assistido_em TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, curso_id, aula_id)
);

CREATE INDEX IF NOT EXISTS idx_aula_historico_user ON public.curso_aula_historico(user_id);
CREATE INDEX IF NOT EXISTS idx_aula_historico_curso ON public.curso_aula_historico(user_id, curso_id);

-- =============================================
-- TABELA: Certificados emitidos
-- =============================================
CREATE TABLE IF NOT EXISTS public.curso_certificados (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  curso_id TEXT NOT NULL,
  curso_nome TEXT NOT NULL,
  usuario_nome TEXT NOT NULL,
  codigo_verificacao TEXT UNIQUE NOT NULL DEFAULT encode(gen_random_bytes(16), 'hex'),
  percentual_final NUMERIC(5,2) NOT NULL,
  nota_media NUMERIC(5,2),
  horas_totais NUMERIC(6,2),
  emitido_em TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, curso_id)
);

CREATE INDEX IF NOT EXISTS idx_certificados_codigo ON public.curso_certificados(codigo_verificacao);

-- =============================================
-- FUNÇÃO: Atualizar progresso de uma aula
-- =============================================
CREATE OR REPLACE FUNCTION public.update_curso_progresso_geral(
  p_user_id UUID,
  p_curso_id TEXT,
  p_modulo_id TEXT,
  p_aula_id TEXT,
  p_tempo_segundos INTEGER DEFAULT 0,
  p_completou BOOLEAN DEFAULT false,
  p_nota_quiz NUMERIC DEFAULT NULL,
  p_total_aulas INTEGER DEFAULT 1
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_progresso RECORD;
  v_percentual NUMERIC;
  v_resultado JSONB;
BEGIN
  -- Registrar histórico da aula
  INSERT INTO public.curso_aula_historico
    (user_id, curso_id, modulo_id, aula_id, tempo_gasto_segundos, completou, nota_quiz)
  VALUES
    (p_user_id, p_curso_id, p_modulo_id, p_aula_id, p_tempo_segundos, p_completou, p_nota_quiz)
  ON CONFLICT (user_id, curso_id, aula_id)
  DO UPDATE SET
    tempo_gasto_segundos = curso_aula_historico.tempo_gasto_segundos + EXCLUDED.tempo_gasto_segundos,
    completou = EXCLUDED.completou OR curso_aula_historico.completou,
    nota_quiz = COALESCE(EXCLUDED.nota_quiz, curso_aula_historico.nota_quiz),
    assistido_em = now();

  -- Buscar ou criar progresso do curso
  INSERT INTO public.curso_progresso_geral (user_id, curso_id)
  VALUES (p_user_id, p_curso_id)
  ON CONFLICT (user_id, curso_id) DO NOTHING;

  -- Atualizar aulas completas
  IF p_completou THEN
    UPDATE public.curso_progresso_geral
    SET
      aulas_completas = array_append(
        array_remove(aulas_completas, p_aula_id),
        p_aula_id
      ),
      modulo_atual = p_modulo_id,
      aula_atual = p_aula_id,
      tempo_total_minutos = tempo_total_minutos + (p_tempo_segundos / 60),
      ultimo_acesso = now()
    WHERE user_id = p_user_id AND curso_id = p_curso_id;
  ELSE
    UPDATE public.curso_progresso_geral
    SET
      modulo_atual = p_modulo_id,
      aula_atual = p_aula_id,
      tempo_total_minutos = tempo_total_minutos + (p_tempo_segundos / 60),
      ultimo_acesso = now()
    WHERE user_id = p_user_id AND curso_id = p_curso_id;
  END IF;

  -- Recalcular percentual
  SELECT * INTO v_progresso
  FROM public.curso_progresso_geral
  WHERE user_id = p_user_id AND curso_id = p_curso_id;

  v_percentual := LEAST(
    (array_length(v_progresso.aulas_completas, 1)::NUMERIC / NULLIF(p_total_aulas, 0)) * 100,
    100
  );

  UPDATE public.curso_progresso_geral
  SET
    percentual_completo = COALESCE(v_percentual, 0),
    concluido_em = CASE
      WHEN v_percentual >= 100 AND concluido_em IS NULL THEN now()
      ELSE concluido_em
    END
  WHERE user_id = p_user_id AND curso_id = p_curso_id;

  -- Retornar estado atualizado
  SELECT jsonb_build_object(
    'curso_id', cp.curso_id,
    'percentual', cp.percentual_completo,
    'aulas_completas', cp.aulas_completas,
    'concluido', cp.concluido_em IS NOT NULL,
    'ultimo_acesso', cp.ultimo_acesso
  ) INTO v_resultado
  FROM public.curso_progresso_geral cp
  WHERE cp.user_id = p_user_id AND cp.curso_id = p_curso_id;

  RETURN v_resultado;
END;
$$;

-- =============================================
-- FUNÇÃO: Buscar "Continuar Assistindo"
-- =============================================
CREATE OR REPLACE FUNCTION public.get_cursos_em_andamento(p_user_id UUID)
RETURNS TABLE(
  curso_id TEXT,
  modulo_atual TEXT,
  aula_atual TEXT,
  percentual_completo NUMERIC,
  ultimo_acesso TIMESTAMPTZ,
  tempo_total_minutos INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT
    cp.curso_id,
    cp.modulo_atual,
    cp.aula_atual,
    cp.percentual_completo,
    cp.ultimo_acesso,
    cp.tempo_total_minutos
  FROM public.curso_progresso_geral cp
  WHERE cp.user_id = p_user_id
    AND cp.percentual_completo > 0
    AND cp.percentual_completo < 100
  ORDER BY cp.ultimo_acesso DESC
  LIMIT 10;
END;
$$;

-- =============================================
-- FUNÇÃO: Emitir certificado
-- =============================================
CREATE OR REPLACE FUNCTION public.emitir_certificado(
  p_user_id UUID,
  p_curso_id TEXT,
  p_curso_nome TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_progresso RECORD;
  v_usuario RECORD;
  v_nota_media NUMERIC;
  v_certificado RECORD;
BEGIN
  SELECT * INTO v_progresso
  FROM public.curso_progresso_geral
  WHERE user_id = p_user_id AND curso_id = p_curso_id;

  IF NOT FOUND OR v_progresso.percentual_completo < 100 THEN
    RETURN jsonb_build_object('error', 'Curso não concluído', 'percentual', COALESCE(v_progresso.percentual_completo, 0));
  END IF;

  SELECT nome INTO v_usuario
  FROM public.profiles
  WHERE id = p_user_id;

  SELECT AVG(nota_quiz) INTO v_nota_media
  FROM public.curso_aula_historico
  WHERE user_id = p_user_id AND curso_id = p_curso_id AND nota_quiz IS NOT NULL;

  INSERT INTO public.curso_certificados
    (user_id, curso_id, curso_nome, usuario_nome, percentual_final, nota_media, horas_totais)
  VALUES
    (p_user_id, p_curso_id, p_curso_nome, COALESCE(v_usuario.nome, 'Aluno'),
     v_progresso.percentual_completo, v_nota_media,
     ROUND(v_progresso.tempo_total_minutos / 60.0, 1))
  ON CONFLICT (user_id, curso_id) DO UPDATE SET
    nota_media = EXCLUDED.nota_media,
    horas_totais = EXCLUDED.horas_totais
  RETURNING * INTO v_certificado;

  UPDATE public.curso_progresso_geral
  SET certificado_gerado = true
  WHERE user_id = p_user_id AND curso_id = p_curso_id;

  RETURN jsonb_build_object(
    'success', true,
    'certificado_id', v_certificado.id,
    'codigo_verificacao', v_certificado.codigo_verificacao,
    'emitido_em', v_certificado.emitido_em
  );
END;
$$;

-- =============================================
-- RLS Policies
-- =============================================
ALTER TABLE public.curso_progresso_geral ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curso_aula_historico ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curso_certificados ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users see own curso_progresso_geral"
  ON public.curso_progresso_geral FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own curso_progresso_geral"
  ON public.curso_progresso_geral FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users update own curso_progresso_geral"
  ON public.curso_progresso_geral FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Users see own aula_historico"
  ON public.curso_aula_historico FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users insert own aula_historico"
  ON public.curso_aula_historico FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users see own certificados"
  ON public.curso_certificados FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Anyone can verify certificados by code"
  ON public.curso_certificados FOR SELECT USING (true);

CREATE POLICY "Admins manage all curso_progresso_geral"
  ON public.curso_progresso_geral FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage all aula_historico"
  ON public.curso_aula_historico FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage all certificados"
  ON public.curso_certificados FOR ALL USING (public.has_role(auth.uid(), 'admin'));
