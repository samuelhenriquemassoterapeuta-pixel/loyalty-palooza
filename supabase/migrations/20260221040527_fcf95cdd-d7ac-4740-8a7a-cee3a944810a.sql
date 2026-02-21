
-- =============================================
-- FEATURE FLAGS — Tabela Principal
-- =============================================
CREATE TABLE IF NOT EXISTS public.feature_flags (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  key TEXT UNIQUE NOT NULL,
  enabled BOOLEAN DEFAULT false,
  description TEXT,
  allowed_roles TEXT[] DEFAULT '{}',
  allowed_user_ids UUID[] DEFAULT '{}',
  allowed_empresa_ids UUID[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_feature_flags_key ON public.feature_flags(key);
CREATE INDEX IF NOT EXISTS idx_feature_flags_enabled ON public.feature_flags(enabled);

CREATE TRIGGER set_feature_flags_updated_at
  BEFORE UPDATE ON public.feature_flags
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- =============================================
-- FUNÇÃO: Verificar se feature está habilitada
-- =============================================
CREATE OR REPLACE FUNCTION public.is_feature_enabled(
  p_key TEXT,
  p_user_id UUID DEFAULT NULL
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path TO 'public'
AS $$
DECLARE
  v_flag RECORD;
  v_user_role TEXT;
BEGIN
  SELECT * INTO v_flag
  FROM public.feature_flags
  WHERE key = p_key;

  IF NOT FOUND THEN
    RETURN false;
  END IF;

  IF v_flag.enabled = true THEN
    RETURN true;
  END IF;

  IF p_user_id IS NULL THEN
    RETURN false;
  END IF;

  IF p_user_id = ANY(v_flag.allowed_user_ids) THEN
    RETURN true;
  END IF;

  SELECT role INTO v_user_role
  FROM public.user_roles
  WHERE user_id = p_user_id
  LIMIT 1;

  IF v_user_role IS NOT NULL AND v_user_role = ANY(v_flag.allowed_roles) THEN
    RETURN true;
  END IF;

  IF EXISTS (
    SELECT 1 FROM public.colaboradores_empresa ce
    WHERE ce.user_id = p_user_id
    AND ce.empresa_id = ANY(v_flag.allowed_empresa_ids)
  ) THEN
    RETURN true;
  END IF;

  RETURN false;
END;
$$;

-- =============================================
-- FUNÇÃO: Listar todas as features do usuário
-- =============================================
CREATE OR REPLACE FUNCTION public.get_user_features(p_user_id UUID)
RETURNS TABLE(
  feature_key TEXT,
  is_enabled BOOLEAN,
  description TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT
    ff.key,
    public.is_feature_enabled(ff.key, p_user_id),
    ff.description
  FROM public.feature_flags ff
  ORDER BY ff.key;
END;
$$;

-- =============================================
-- FUNÇÃO: Listar features para admin
-- =============================================
CREATE OR REPLACE FUNCTION public.get_all_feature_flags()
RETURNS TABLE(
  id UUID,
  key TEXT,
  enabled BOOLEAN,
  description TEXT,
  allowed_roles TEXT[],
  allowed_user_ids UUID[],
  allowed_empresa_ids UUID[],
  metadata JSONB,
  created_at TIMESTAMPTZ,
  updated_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT ff.id, ff.key, ff.enabled, ff.description, ff.allowed_roles, ff.allowed_user_ids, ff.allowed_empresa_ids, ff.metadata, ff.created_at, ff.updated_at
  FROM public.feature_flags ff ORDER BY ff.key;
END;
$$;

-- =============================================
-- RLS Policies
-- =============================================
ALTER TABLE public.feature_flags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read feature flags"
  ON public.feature_flags FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins can manage feature flags"
  ON public.feature_flags FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- SEED: Features Iniciais por Tier
-- =============================================
INSERT INTO public.feature_flags (key, enabled, description, metadata) VALUES
  -- TIER 1 — Core (sempre ativo)
  ('agendamentos', true, 'Sistema de agendamentos e sessões', '{"tier": 1}'),
  ('pagamento', true, 'Integração de pagamentos Asaas', '{"tier": 1}'),
  ('cashback', true, 'Wallet digital e programa de fidelidade', '{"tier": 1}'),
  ('profile', true, 'Perfil do usuário e configurações', '{"tier": 1}'),
  ('terapeuta', true, 'Dashboard e ferramentas do terapeuta', '{"tier": 1}'),
  ('cursos', true, 'Plataforma de cursos e certificação', '{"tier": 1}'),
  -- TIER 2 — Diferencial (ativo)
  ('protocolos', true, 'Protocolos terapêuticos', '{"tier": 2}'),
  ('anamnese', true, 'Fichas de anamnese dinâmicas', '{"tier": 2}'),
  ('avaliacao_postural', true, 'Avaliação postural com fotos', '{"tier": 2}'),
  ('resinkra_ai', true, 'IA para criação de conteúdo', '{"tier": 2}'),
  ('bem_estar', true, 'Diário e tracking de bem-estar', '{"tier": 2}'),
  ('conquistas', true, 'Gamificação, XP, badges', '{"tier": 2}'),
  -- TIER 3 — Congelado (desativado)
  ('corporativo', false, 'Portal B2B para empresas', '{"tier": 3}'),
  ('marketplace', false, 'Marketplace de terapeutas', '{"tier": 3}'),
  ('liga', false, 'Liga de bem-estar com competições', '{"tier": 3}'),
  ('cromos', false, 'Cromos colecionáveis', '{"tier": 3}'),
  ('social', false, 'Resinkra Moments — rede social', '{"tier": 3}'),
  ('dietas', false, 'Planos nutricionais e diário alimentar', '{"tier": 3}'),
  ('materiais', false, 'Materiais gráficos para download', '{"tier": 3}'),
  ('playlist', false, 'Playlist musical terapêutica', '{"tier": 3}'),
  ('loja', false, 'E-commerce interno', '{"tier": 3}'),
  ('vale_presente', false, 'Vales digitais com QR', '{"tier": 3}'),
  ('guia_clinico', false, 'Guia clínico interativo', '{"tier": 3}'),
  ('alongamento', false, 'Exercícios e pausas posturais', '{"tier": 3}'),
  ('cupom', false, 'Editor de cupons de desconto', '{"tier": 3}')
ON CONFLICT (key) DO NOTHING;
