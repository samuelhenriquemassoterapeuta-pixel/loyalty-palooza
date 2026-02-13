
-- ============================================
-- 1. CLUBE VIP - Planos de Assinatura
-- ============================================
CREATE TABLE public.assinaturas_planos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  preco_mensal NUMERIC NOT NULL,
  beneficios JSONB NOT NULL DEFAULT '[]'::jsonb,
  cashback_bonus_percentual NUMERIC NOT NULL DEFAULT 0,
  desconto_servicos_percentual NUMERIC NOT NULL DEFAULT 0,
  prioridade_agendamento BOOLEAN NOT NULL DEFAULT false,
  disponivel BOOLEAN NOT NULL DEFAULT true,
  cor TEXT NOT NULL DEFAULT 'primary',
  icone TEXT NOT NULL DEFAULT 'crown',
  ordem INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.assinaturas_planos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Planos de assinatura visíveis para todos"
  ON public.assinaturas_planos FOR SELECT
  USING (true);

CREATE POLICY "Admins gerenciam planos de assinatura"
  ON public.assinaturas_planos FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- ============================================
-- 2. CLUBE VIP - Assinaturas dos Usuários
-- ============================================
CREATE TABLE public.assinaturas_usuario (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  plano_id UUID NOT NULL REFERENCES public.assinaturas_planos(id),
  status TEXT NOT NULL DEFAULT 'ativo',
  data_inicio TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  data_fim TIMESTAMP WITH TIME ZONE,
  renovacao_automatica BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.assinaturas_usuario ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem próprias assinaturas"
  ON public.assinaturas_usuario FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários criam próprias assinaturas"
  ON public.assinaturas_usuario FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários atualizam próprias assinaturas"
  ON public.assinaturas_usuario FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins gerenciam assinaturas"
  ON public.assinaturas_usuario FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TRIGGER update_assinaturas_usuario_updated_at
  BEFORE UPDATE ON public.assinaturas_usuario
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- 3. RECOMENDAÇÕES IA - Histórico
-- ============================================
CREATE TABLE public.recomendacoes_ia (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  tipo TEXT NOT NULL DEFAULT 'tratamento',
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  confianca NUMERIC NOT NULL DEFAULT 0.8,
  dados_base JSONB NOT NULL DEFAULT '{}'::jsonb,
  aceita BOOLEAN,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.recomendacoes_ia ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem próprias recomendações"
  ON public.recomendacoes_ia FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Sistema cria recomendações"
  ON public.recomendacoes_ia FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários atualizam próprias recomendações"
  ON public.recomendacoes_ia FOR UPDATE
  USING (auth.uid() = user_id);

-- ============================================
-- 4. DASHBOARD RH - Empresas Corporativas
-- ============================================
CREATE TABLE public.empresas_corporativas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  cnpj TEXT,
  contato_nome TEXT,
  contato_email TEXT,
  contato_telefone TEXT,
  plano_qvt TEXT NOT NULL DEFAULT 'basico',
  valor_mensal NUMERIC NOT NULL DEFAULT 0,
  max_colaboradores INTEGER NOT NULL DEFAULT 50,
  ativa BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.empresas_corporativas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins gerenciam empresas"
  ON public.empresas_corporativas FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TABLE public.colaboradores_empresa (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  empresa_id UUID NOT NULL REFERENCES public.empresas_corporativas(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  cargo TEXT,
  departamento TEXT,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.colaboradores_empresa ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins gerenciam colaboradores"
  ON public.colaboradores_empresa FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Colaboradores veem próprio vínculo"
  ON public.colaboradores_empresa FOR SELECT
  USING (auth.uid() = user_id);

-- Function to get empresa stats for HR dashboard
CREATE OR REPLACE FUNCTION public.get_empresa_stats(p_empresa_id UUID)
RETURNS JSONB
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_result JSONB;
  v_total_colaboradores INTEGER;
  v_colaboradores_ativos INTEGER;
  v_total_sessoes INTEGER;
  v_total_gasto NUMERIC;
  v_media_sessoes NUMERIC;
BEGIN
  -- Total de colaboradores
  SELECT COUNT(*), COUNT(*) FILTER (WHERE ativo = true)
  INTO v_total_colaboradores, v_colaboradores_ativos
  FROM public.colaboradores_empresa
  WHERE empresa_id = p_empresa_id;

  -- Sessões dos colaboradores
  SELECT COALESCE(COUNT(*), 0), COALESCE(SUM(s.preco), 0)
  INTO v_total_sessoes, v_total_gasto
  FROM public.agendamentos a
  JOIN public.colaboradores_empresa c ON c.user_id = a.user_id
  JOIN public.servicos s ON s.nome = a.servico
  WHERE c.empresa_id = p_empresa_id
    AND a.status IN ('concluido', 'realizado');

  v_media_sessoes := CASE WHEN v_colaboradores_ativos > 0
    THEN ROUND(v_total_sessoes::NUMERIC / v_colaboradores_ativos, 1)
    ELSE 0
  END;

  v_result := jsonb_build_object(
    'total_colaboradores', v_total_colaboradores,
    'colaboradores_ativos', v_colaboradores_ativos,
    'total_sessoes', v_total_sessoes,
    'total_gasto', v_total_gasto,
    'media_sessoes_por_colaborador', v_media_sessoes
  );

  RETURN v_result;
END;
$$;

-- Insert sample VIP plans
INSERT INTO public.assinaturas_planos (nome, descricao, preco_mensal, beneficios, cashback_bonus_percentual, desconto_servicos_percentual, prioridade_agendamento, cor, icone, ordem) VALUES
('Essencial', 'Benefícios básicos para quem quer começar a economizar', 49.90, '["5% cashback extra em todos os serviços", "Acesso a conteúdos exclusivos", "Suporte prioritário via chat"]'::jsonb, 5, 5, false, 'emerald', 'leaf', 1),
('Premium', 'O plano mais popular com benefícios completos', 89.90, '["10% cashback extra em todos os serviços", "15% desconto em produtos da loja", "Agendamento prioritário", "Protocolo personalizado incluso", "Acesso antecipado a novos serviços"]'::jsonb, 10, 15, true, 'amber', 'crown', 2),
('Diamond', 'Experiência completa e exclusiva para quem merece o melhor', 149.90, '["20% cashback extra em todos os serviços", "25% desconto em produtos da loja", "Agendamento VIP prioritário", "1 sessão cortesia por mês", "Protocolo premium personalizado", "Consultoria nutricional mensal"]'::jsonb, 20, 25, true, 'violet', 'gem', 3);
