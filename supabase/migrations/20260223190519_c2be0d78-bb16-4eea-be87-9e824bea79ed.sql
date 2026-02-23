
-- Contas bancárias
CREATE TABLE public.contas_bancarias (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  banco TEXT,
  agencia TEXT,
  conta TEXT,
  tipo TEXT DEFAULT 'corrente' CHECK (tipo IN ('corrente','poupanca','pagamento')),
  saldo_atual NUMERIC DEFAULT 0,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.contas_bancarias ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin gerencia contas bancarias" ON public.contas_bancarias FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Extrato bancário importado
CREATE TABLE public.extrato_bancario (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conta_bancaria_id UUID NOT NULL REFERENCES public.contas_bancarias(id) ON DELETE CASCADE,
  data_transacao DATE NOT NULL,
  descricao TEXT NOT NULL,
  valor NUMERIC NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('credito','debito')),
  saldo_parcial NUMERIC,
  referencia_externa TEXT,
  conciliado BOOLEAN DEFAULT false,
  conciliacao_id UUID,
  importado_em TIMESTAMPTZ DEFAULT now(),
  importado_por UUID DEFAULT auth.uid()
);

ALTER TABLE public.extrato_bancario ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin gerencia extrato" ON public.extrato_bancario FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Registro de conciliações
CREATE TABLE public.conciliacoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  extrato_id UUID NOT NULL REFERENCES public.extrato_bancario(id) ON DELETE CASCADE,
  tipo_lancamento TEXT NOT NULL CHECK (tipo_lancamento IN ('conta_pagar','conta_receber','repasse','outro')),
  lancamento_id UUID NOT NULL,
  valor_extrato NUMERIC NOT NULL,
  valor_lancamento NUMERIC NOT NULL,
  diferenca NUMERIC GENERATED ALWAYS AS (valor_extrato - valor_lancamento) STORED,
  status TEXT DEFAULT 'conciliado' CHECK (status IN ('conciliado','divergente','manual')),
  observacoes TEXT,
  conciliado_por UUID DEFAULT auth.uid(),
  conciliado_em TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.conciliacoes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admin gerencia conciliacoes" ON public.conciliacoes FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- FK back-reference
ALTER TABLE public.extrato_bancario
  ADD CONSTRAINT fk_extrato_conciliacao FOREIGN KEY (conciliacao_id) REFERENCES public.conciliacoes(id) ON DELETE SET NULL;

-- RPC: sugerir matches automáticos
CREATE OR REPLACE FUNCTION public.sugerir_conciliacoes(p_conta_bancaria_id UUID)
RETURNS JSONB
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE
  v_item RECORD;
  v_sugestoes JSONB := '[]'::JSONB;
  v_match RECORD;
BEGIN
  FOR v_item IN
    SELECT * FROM public.extrato_bancario
    WHERE conta_bancaria_id = p_conta_bancaria_id AND conciliado = false
    ORDER BY data_transacao
  LOOP
    IF v_item.tipo = 'debito' THEN
      SELECT id, descricao, valor, 'conta_pagar' AS tipo_lanc INTO v_match
      FROM public.contas_pagar
      WHERE status = 'pago'
        AND ABS(valor_pago - ABS(v_item.valor)) < 0.02
        AND data_pagamento BETWEEN v_item.data_transacao - 3 AND v_item.data_transacao + 3
        AND id NOT IN (SELECT lancamento_id FROM public.conciliacoes WHERE tipo_lancamento = 'conta_pagar')
      LIMIT 1;

      IF v_match IS NOT NULL THEN
        v_sugestoes := v_sugestoes || jsonb_build_object(
          'extrato_id', v_item.id, 'extrato_descricao', v_item.descricao,
          'extrato_valor', v_item.valor, 'extrato_data', v_item.data_transacao,
          'lancamento_id', v_match.id, 'lancamento_descricao', v_match.descricao,
          'lancamento_valor', v_match.valor, 'tipo_lancamento', v_match.tipo_lanc,
          'diferenca', ABS(v_item.valor) - v_match.valor
        );
        CONTINUE;
      END IF;

      SELECT id, 'Repasse terapeuta' AS descricao, valor_liquido AS valor, 'repasse' AS tipo_lanc INTO v_match
      FROM public.repasses
      WHERE status = 'pago'
        AND ABS(valor_liquido - ABS(v_item.valor)) < 0.02
        AND data_pagamento BETWEEN v_item.data_transacao - 3 AND v_item.data_transacao + 3
        AND id NOT IN (SELECT lancamento_id FROM public.conciliacoes WHERE tipo_lancamento = 'repasse')
      LIMIT 1;

      IF v_match IS NOT NULL THEN
        v_sugestoes := v_sugestoes || jsonb_build_object(
          'extrato_id', v_item.id, 'extrato_descricao', v_item.descricao,
          'extrato_valor', v_item.valor, 'extrato_data', v_item.data_transacao,
          'lancamento_id', v_match.id, 'lancamento_descricao', v_match.descricao,
          'lancamento_valor', v_match.valor, 'tipo_lancamento', v_match.tipo_lanc,
          'diferenca', ABS(v_item.valor) - v_match.valor
        );
      END IF;
    END IF;

    IF v_item.tipo = 'credito' THEN
      SELECT id, descricao, COALESCE(valor_recebido, valor) AS valor, 'conta_receber' AS tipo_lanc INTO v_match
      FROM public.contas_receber
      WHERE status = 'recebido'
        AND ABS(COALESCE(valor_recebido, valor) - v_item.valor) < 0.02
        AND data_recebimento BETWEEN v_item.data_transacao - 3 AND v_item.data_transacao + 3
        AND id NOT IN (SELECT lancamento_id FROM public.conciliacoes WHERE tipo_lancamento = 'conta_receber')
      LIMIT 1;

      IF v_match IS NOT NULL THEN
        v_sugestoes := v_sugestoes || jsonb_build_object(
          'extrato_id', v_item.id, 'extrato_descricao', v_item.descricao,
          'extrato_valor', v_item.valor, 'extrato_data', v_item.data_transacao,
          'lancamento_id', v_match.id, 'lancamento_descricao', v_match.descricao,
          'lancamento_valor', v_match.valor, 'tipo_lancamento', v_match.tipo_lanc,
          'diferenca', v_item.valor - v_match.valor
        );
      END IF;
    END IF;
  END LOOP;

  RETURN v_sugestoes;
END;
$$;

-- Indexes
CREATE INDEX idx_extrato_conta ON public.extrato_bancario(conta_bancaria_id);
CREATE INDEX idx_extrato_conciliado ON public.extrato_bancario(conciliado);
CREATE INDEX idx_conciliacoes_extrato ON public.conciliacoes(extrato_id);

-- Updated_at trigger
CREATE TRIGGER trg_contas_bancarias_updated
  BEFORE UPDATE ON public.contas_bancarias
  FOR EACH ROW EXECUTE FUNCTION public.update_receitas_favoritas_updated_at();
