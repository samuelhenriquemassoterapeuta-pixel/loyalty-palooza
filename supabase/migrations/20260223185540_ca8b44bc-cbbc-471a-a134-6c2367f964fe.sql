
-- =============================================
-- Contas a Receber (Accounts Receivable)
-- =============================================

CREATE TABLE public.contas_receber (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  descricao TEXT NOT NULL,
  valor NUMERIC NOT NULL CHECK (valor > 0),
  valor_recebido NUMERIC DEFAULT 0,
  data_emissao DATE NOT NULL DEFAULT CURRENT_DATE,
  data_vencimento DATE NOT NULL,
  data_recebimento DATE,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente','vencido','recebido','cancelado','parcial')),
  categoria_id UUID REFERENCES public.categorias_financeiras(id),
  cliente_id UUID, -- user_id do cliente (profiles)
  cliente_nome TEXT,
  referencia_tipo TEXT, -- 'pedido', 'agendamento', 'contrato', 'avulso'
  referencia_id UUID,
  forma_recebimento TEXT, -- 'pix', 'boleto', 'cartao', 'dinheiro', 'transferencia'
  numero_documento TEXT,
  parcela_atual INT,
  total_parcelas INT,
  observacoes TEXT,
  tags TEXT[],
  criado_por UUID DEFAULT auth.uid(),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.contas_receber ENABLE ROW LEVEL SECURITY;

-- Admin-only policies
CREATE POLICY "Admin pode ver contas a receber"
  ON public.contas_receber FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin pode inserir contas a receber"
  ON public.contas_receber FOR INSERT
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin pode editar contas a receber"
  ON public.contas_receber FOR UPDATE
  USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admin pode deletar contas a receber"
  ON public.contas_receber FOR DELETE
  USING (public.has_role(auth.uid(), 'admin'));

-- Auto-update vencidos trigger
CREATE OR REPLACE FUNCTION public.update_contas_receber_vencidas()
  RETURNS trigger
  LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.status = 'pendente' AND NEW.data_vencimento < CURRENT_DATE THEN
    NEW.status := 'vencido';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_contas_receber_vencidas
  BEFORE INSERT OR UPDATE ON public.contas_receber
  FOR EACH ROW EXECUTE FUNCTION public.update_contas_receber_vencidas();

-- Audit trigger for payments
CREATE OR REPLACE FUNCTION public.audit_conta_recebimento()
  RETURNS trigger
  LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
BEGIN
  IF OLD.status != 'recebido' AND NEW.status = 'recebido' THEN
    INSERT INTO public.financeiro_audit_log (tabela, registro_id, acao, dados_anteriores, dados_novos, user_id)
    VALUES (
      'contas_receber', NEW.id, 'recebeu',
      jsonb_build_object('status', OLD.status, 'valor_recebido', OLD.valor_recebido),
      jsonb_build_object('status', NEW.status, 'valor_recebido', NEW.valor_recebido, 'data_recebimento', NEW.data_recebimento, 'forma_recebimento', NEW.forma_recebimento),
      COALESCE(auth.uid(), NULL)
    );
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_audit_conta_recebimento
  AFTER UPDATE ON public.contas_receber
  FOR EACH ROW EXECUTE FUNCTION public.audit_conta_recebimento();

-- Updated_at trigger
CREATE TRIGGER trg_contas_receber_updated_at
  BEFORE UPDATE ON public.contas_receber
  FOR EACH ROW
  EXECUTE FUNCTION public.update_receitas_favoritas_updated_at();

-- Index for performance
CREATE INDEX idx_contas_receber_status ON public.contas_receber(status);
CREATE INDEX idx_contas_receber_vencimento ON public.contas_receber(data_vencimento);
