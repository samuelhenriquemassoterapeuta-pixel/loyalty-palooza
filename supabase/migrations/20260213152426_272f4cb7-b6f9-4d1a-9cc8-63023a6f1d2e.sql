
-- Tabela para rastrear pagamentos via Asaas
CREATE TABLE public.pagamentos_asaas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  asaas_payment_id TEXT NOT NULL,
  asaas_customer_id TEXT,
  tipo_referencia TEXT NOT NULL, -- 'pedido', 'assinatura', 'pacote', 'vale_presente'
  referencia_id UUID NOT NULL,
  valor NUMERIC NOT NULL,
  billing_type TEXT NOT NULL, -- 'PIX', 'CREDIT_CARD', 'BOLETO'
  status TEXT NOT NULL DEFAULT 'PENDING',
  invoice_url TEXT,
  bank_slip_url TEXT,
  pix_qr_code TEXT,
  pix_copia_cola TEXT,
  pix_expiration TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Índices
CREATE INDEX idx_pagamentos_asaas_user ON public.pagamentos_asaas(user_id);
CREATE INDEX idx_pagamentos_asaas_payment_id ON public.pagamentos_asaas(asaas_payment_id);
CREATE INDEX idx_pagamentos_asaas_referencia ON public.pagamentos_asaas(tipo_referencia, referencia_id);

-- RLS
ALTER TABLE public.pagamentos_asaas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem próprios pagamentos"
  ON public.pagamentos_asaas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Sistema cria pagamentos"
  ON public.pagamentos_asaas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins gerenciam pagamentos"
  ON public.pagamentos_asaas FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Coluna asaas_customer_id no profiles para cache do ID do cliente
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS asaas_customer_id TEXT;

-- Trigger updated_at
CREATE TRIGGER update_pagamentos_asaas_updated_at
  BEFORE UPDATE ON public.pagamentos_asaas
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
