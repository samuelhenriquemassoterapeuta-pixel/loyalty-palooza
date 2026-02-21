
-- =============================================
-- MULTI-TENANCY: empresa_id em agendamentos e transacoes
-- =============================================

ALTER TABLE public.agendamentos ADD COLUMN IF NOT EXISTS empresa_id UUID REFERENCES empresas_corporativas(id);
ALTER TABLE public.transacoes ADD COLUMN IF NOT EXISTS empresa_id UUID REFERENCES empresas_corporativas(id);

CREATE INDEX IF NOT EXISTS idx_agendamentos_empresa ON public.agendamentos(empresa_id);
CREATE INDEX IF NOT EXISTS idx_transacoes_empresa ON public.transacoes(empresa_id);
CREATE INDEX IF NOT EXISTS idx_colaboradores_empresa_empresa ON public.colaboradores_empresa(empresa_id);

-- =============================================
-- Colunas extras na empresas_corporativas para billing
-- =============================================

ALTER TABLE public.empresas_corporativas ADD COLUMN IF NOT EXISTS razao_social TEXT;
ALTER TABLE public.empresas_corporativas ADD COLUMN IF NOT EXISTS email_financeiro TEXT;
ALTER TABLE public.empresas_corporativas ADD COLUMN IF NOT EXISTS asaas_customer_id TEXT;

-- =============================================
-- FUNÇÃO: get_user_empresa_id
-- =============================================

CREATE OR REPLACE FUNCTION public.get_user_empresa_id(p_user_id UUID)
RETURNS UUID
LANGUAGE sql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
  SELECT empresa_id FROM public.colaboradores_empresa
  WHERE user_id = p_user_id AND ativo = true
  LIMIT 1;
$$;

-- =============================================
-- TABELA: Contratos Corporativos
-- =============================================

CREATE TABLE IF NOT EXISTS public.corporativo_contratos (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  empresa_id UUID NOT NULL REFERENCES empresas_corporativas(id) ON DELETE CASCADE,
  tipo_plano TEXT NOT NULL,
  valor_mensal NUMERIC(10,2) NOT NULL,
  max_colaboradores INTEGER NOT NULL DEFAULT 50,
  data_inicio DATE NOT NULL,
  data_fim DATE,
  renovacao_automatica BOOLEAN DEFAULT true,
  status TEXT DEFAULT 'ativo',
  asaas_subscription_id TEXT,
  termos_aceitos BOOLEAN DEFAULT false,
  termos_aceitos_em TIMESTAMPTZ,
  termos_aceitos_por UUID,
  observacoes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contratos_empresa ON public.corporativo_contratos(empresa_id);
CREATE INDEX IF NOT EXISTS idx_contratos_status ON public.corporativo_contratos(status);

-- =============================================
-- TABELA: Log de Aceite de Termos
-- =============================================

CREATE TABLE IF NOT EXISTS public.corporativo_termos_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  empresa_id UUID NOT NULL REFERENCES empresas_corporativas(id),
  user_id UUID NOT NULL,
  versao_termos TEXT NOT NULL DEFAULT '1.0',
  ip_address TEXT,
  user_agent TEXT,
  aceito_em TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- RLS para novas tabelas
-- =============================================

ALTER TABLE public.corporativo_contratos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.corporativo_termos_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage contratos"
  ON public.corporativo_contratos FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Empresa admin sees own contrato"
  ON public.corporativo_contratos FOR SELECT
  USING (empresa_id = public.get_user_empresa_id(auth.uid()));

CREATE POLICY "Admins manage termos log"
  ON public.corporativo_termos_log FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "User can insert own termos log"
  ON public.corporativo_termos_log FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- =============================================
-- FUNÇÃO: Relatório de Utilização por Empresa
-- =============================================

CREATE OR REPLACE FUNCTION public.get_relatorio_empresa(
  p_empresa_id UUID,
  p_data_inicio DATE DEFAULT (now() - interval '30 days')::date,
  p_data_fim DATE DEFAULT now()::date
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
DECLARE
  v_result JSONB;
  v_total_colaboradores INTEGER;
  v_colaboradores_ativos INTEGER;
  v_total_agendamentos INTEGER;
  v_agendamentos_realizados INTEGER;
  v_taxa_adesao NUMERIC;
  v_servicos_populares JSONB;
BEGIN
  SELECT COUNT(*) INTO v_total_colaboradores
  FROM public.colaboradores_empresa
  WHERE empresa_id = p_empresa_id AND ativo = true;

  SELECT COUNT(DISTINCT a.user_id) INTO v_colaboradores_ativos
  FROM public.agendamentos a
  INNER JOIN public.colaboradores_empresa ce ON a.user_id = ce.user_id
  WHERE ce.empresa_id = p_empresa_id
    AND a.created_at::date BETWEEN p_data_inicio AND p_data_fim;

  SELECT COUNT(*) INTO v_total_agendamentos
  FROM public.agendamentos a
  INNER JOIN public.colaboradores_empresa ce ON a.user_id = ce.user_id
  WHERE ce.empresa_id = p_empresa_id
    AND a.created_at::date BETWEEN p_data_inicio AND p_data_fim;

  SELECT COUNT(*) INTO v_agendamentos_realizados
  FROM public.agendamentos a
  INNER JOIN public.colaboradores_empresa ce ON a.user_id = ce.user_id
  WHERE ce.empresa_id = p_empresa_id
    AND a.created_at::date BETWEEN p_data_inicio AND p_data_fim
    AND a.status NOT IN ('cancelado', 'no_show');

  v_taxa_adesao := CASE
    WHEN v_total_colaboradores > 0
    THEN ROUND((v_colaboradores_ativos::NUMERIC / v_total_colaboradores) * 100, 1)
    ELSE 0
  END;

  SELECT COALESCE(jsonb_agg(jsonb_build_object(
    'servico', sub.servico,
    'agendamentos', sub.cnt
  )), '[]'::jsonb) INTO v_servicos_populares
  FROM (
    SELECT a.servico, COUNT(*) as cnt
    FROM public.agendamentos a
    INNER JOIN public.colaboradores_empresa ce ON a.user_id = ce.user_id
    WHERE ce.empresa_id = p_empresa_id
      AND a.created_at::date BETWEEN p_data_inicio AND p_data_fim
    GROUP BY a.servico
    ORDER BY cnt DESC
    LIMIT 5
  ) sub;

  v_result := jsonb_build_object(
    'periodo', jsonb_build_object('inicio', p_data_inicio, 'fim', p_data_fim),
    'colaboradores', jsonb_build_object(
      'total', v_total_colaboradores,
      'ativos_no_periodo', v_colaboradores_ativos,
      'taxa_adesao', v_taxa_adesao
    ),
    'agendamentos', jsonb_build_object(
      'total', v_total_agendamentos,
      'realizados', v_agendamentos_realizados,
      'cancelados', v_total_agendamentos - v_agendamentos_realizados
    ),
    'servicos_populares', v_servicos_populares,
    'gerado_em', now()
  );

  RETURN v_result;
END;
$$;

-- =============================================
-- FUNÇÃO: Exportar colaboradores como CSV
-- =============================================

CREATE OR REPLACE FUNCTION public.export_colaboradores_csv(p_empresa_id UUID)
RETURNS TABLE(
  nome TEXT,
  email TEXT,
  departamento TEXT,
  data_entrada DATE,
  total_agendamentos BIGINT,
  ultimo_agendamento TIMESTAMPTZ,
  status TEXT
)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    p.nome,
    p.email,
    ce.departamento,
    ce.created_at::DATE as data_entrada,
    COUNT(a.id) as total_agendamentos,
    MAX(a.created_at) as ultimo_agendamento,
    CASE WHEN ce.ativo THEN 'Ativo' ELSE 'Inativo' END as status
  FROM public.colaboradores_empresa ce
  INNER JOIN public.profiles p ON p.id = ce.user_id
  LEFT JOIN public.agendamentos a ON a.user_id = ce.user_id
  WHERE ce.empresa_id = p_empresa_id
  GROUP BY p.nome, p.email, ce.departamento, ce.created_at, ce.ativo
  ORDER BY p.nome;
END;
$$;

-- Trigger updated_at para contratos
CREATE OR REPLACE TRIGGER update_corporativo_contratos_updated_at
  BEFORE UPDATE ON public.corporativo_contratos
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
