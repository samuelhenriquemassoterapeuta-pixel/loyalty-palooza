
-- =============================================
-- Repasses a Profissionais (Therapist Payouts)
-- =============================================

-- Configuração de comissão por terapeuta
CREATE TABLE public.comissoes_terapeutas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  terapeuta_id UUID NOT NULL REFERENCES public.terapeutas(id) ON DELETE CASCADE,
  percentual_comissao NUMERIC NOT NULL DEFAULT 40 CHECK (percentual_comissao >= 0 AND percentual_comissao <= 100),
  valor_fixo_sessao NUMERIC DEFAULT 0,
  tipo_calculo TEXT NOT NULL DEFAULT 'percentual' CHECK (tipo_calculo IN ('percentual','valor_fixo','misto')),
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(terapeuta_id)
);

ALTER TABLE public.comissoes_terapeutas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin pode gerenciar comissoes" ON public.comissoes_terapeutas FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Terapeuta ve propria comissao" ON public.comissoes_terapeutas FOR SELECT USING (
  terapeuta_id IN (SELECT id FROM public.terapeutas WHERE user_id = auth.uid())
);

-- Tabela de repasses
CREATE TABLE public.repasses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  terapeuta_id UUID NOT NULL REFERENCES public.terapeutas(id),
  periodo_inicio DATE NOT NULL,
  periodo_fim DATE NOT NULL,
  total_sessoes INT NOT NULL DEFAULT 0,
  valor_bruto NUMERIC NOT NULL DEFAULT 0,
  percentual_comissao NUMERIC NOT NULL,
  valor_comissao NUMERIC NOT NULL DEFAULT 0,
  valor_descontos NUMERIC DEFAULT 0,
  valor_liquido NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente','aprovado','pago','cancelado')),
  data_pagamento DATE,
  forma_pagamento TEXT,
  comprovante_url TEXT,
  observacoes TEXT,
  aprovado_por UUID,
  criado_por UUID DEFAULT auth.uid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.repasses ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin pode gerenciar repasses" ON public.repasses FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Terapeuta ve proprios repasses" ON public.repasses FOR SELECT USING (
  terapeuta_id IN (SELECT id FROM public.terapeutas WHERE user_id = auth.uid())
);

-- Itens detalhados do repasse (cada sessão)
CREATE TABLE public.repasse_itens (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  repasse_id UUID NOT NULL REFERENCES public.repasses(id) ON DELETE CASCADE,
  agendamento_id UUID REFERENCES public.agendamentos(id),
  servico_nome TEXT NOT NULL,
  data_sessao TIMESTAMPTZ NOT NULL,
  valor_servico NUMERIC NOT NULL,
  percentual_comissao NUMERIC NOT NULL,
  valor_comissao NUMERIC NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.repasse_itens ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin pode ver itens repasse" ON public.repasse_itens FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Terapeuta ve proprios itens" ON public.repasse_itens FOR SELECT USING (
  repasse_id IN (SELECT id FROM public.repasses WHERE terapeuta_id IN (SELECT id FROM public.terapeutas WHERE user_id = auth.uid()))
);

-- RPC para calcular repasse de um terapeuta num período
CREATE OR REPLACE FUNCTION public.calcular_repasse(
  p_terapeuta_id UUID,
  p_periodo_inicio DATE,
  p_periodo_fim DATE
)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE
  v_config RECORD;
  v_sessao RECORD;
  v_total_sessoes INT := 0;
  v_valor_bruto NUMERIC := 0;
  v_valor_comissao NUMERIC := 0;
  v_itens JSONB := '[]'::JSONB;
  v_perc NUMERIC;
  v_comissao_item NUMERIC;
BEGIN
  -- Buscar config de comissão
  SELECT * INTO v_config FROM public.comissoes_terapeutas
  WHERE terapeuta_id = p_terapeuta_id AND ativo = true;

  v_perc := COALESCE(v_config.percentual_comissao, 40);

  FOR v_sessao IN
    SELECT a.id, a.servico, a.data_hora, s.preco
    FROM public.agendamentos a
    JOIN public.servicos s ON s.nome = a.servico
    WHERE a.terapeuta_id = p_terapeuta_id
      AND a.status IN ('concluido', 'realizado')
      AND a.data_hora::date BETWEEN p_periodo_inicio AND p_periodo_fim
    ORDER BY a.data_hora
  LOOP
    v_total_sessoes := v_total_sessoes + 1;
    v_valor_bruto := v_valor_bruto + v_sessao.preco;

    IF v_config IS NOT NULL AND v_config.tipo_calculo = 'valor_fixo' THEN
      v_comissao_item := v_config.valor_fixo_sessao;
    ELSIF v_config IS NOT NULL AND v_config.tipo_calculo = 'misto' THEN
      v_comissao_item := GREATEST(v_config.valor_fixo_sessao, ROUND(v_sessao.preco * v_perc / 100, 2));
    ELSE
      v_comissao_item := ROUND(v_sessao.preco * v_perc / 100, 2);
    END IF;

    v_valor_comissao := v_valor_comissao + v_comissao_item;

    v_itens := v_itens || jsonb_build_object(
      'agendamento_id', v_sessao.id,
      'servico_nome', v_sessao.servico,
      'data_sessao', v_sessao.data_hora,
      'valor_servico', v_sessao.preco,
      'percentual_comissao', v_perc,
      'valor_comissao', v_comissao_item
    );
  END LOOP;

  RETURN jsonb_build_object(
    'terapeuta_id', p_terapeuta_id,
    'periodo_inicio', p_periodo_inicio,
    'periodo_fim', p_periodo_fim,
    'total_sessoes', v_total_sessoes,
    'valor_bruto', v_valor_bruto,
    'percentual_comissao', v_perc,
    'valor_comissao', v_valor_comissao,
    'itens', v_itens
  );
END;
$$;

-- Audit trigger
CREATE TRIGGER trg_repasses_updated_at
  BEFORE UPDATE ON public.repasses
  FOR EACH ROW EXECUTE FUNCTION public.update_receitas_favoritas_updated_at();

CREATE TRIGGER trg_comissoes_updated_at
  BEFORE UPDATE ON public.comissoes_terapeutas
  FOR EACH ROW EXECUTE FUNCTION public.update_receitas_favoritas_updated_at();

-- Indexes
CREATE INDEX idx_repasses_terapeuta ON public.repasses(terapeuta_id);
CREATE INDEX idx_repasses_status ON public.repasses(status);
CREATE INDEX idx_repasse_itens_repasse ON public.repasse_itens(repasse_id);
