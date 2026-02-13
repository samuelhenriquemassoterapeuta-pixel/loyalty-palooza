
-- Tabela para registrar histórico de envios WhatsApp
CREATE TABLE public.whatsapp_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id),
  telefone TEXT NOT NULL,
  tipo TEXT NOT NULL DEFAULT 'lembrete',
  mensagem TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente',
  referencia_id UUID,
  referencia_tipo TEXT,
  erro TEXT,
  enviado_em TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Índices para consultas frequentes
CREATE INDEX idx_whatsapp_logs_user_id ON public.whatsapp_logs(user_id);
CREATE INDEX idx_whatsapp_logs_status ON public.whatsapp_logs(status);
CREATE INDEX idx_whatsapp_logs_tipo ON public.whatsapp_logs(tipo);
CREATE INDEX idx_whatsapp_logs_created_at ON public.whatsapp_logs(created_at DESC);

-- Enable RLS
ALTER TABLE public.whatsapp_logs ENABLE ROW LEVEL SECURITY;

-- Admins podem ver todos os logs
CREATE POLICY "Admins podem ver todos os logs WhatsApp"
  ON public.whatsapp_logs FOR SELECT
  USING (public.has_role(auth.uid(), 'admin'));

-- Usuários podem ver seus próprios logs
CREATE POLICY "Usuários podem ver seus próprios logs WhatsApp"
  ON public.whatsapp_logs FOR SELECT
  USING (auth.uid() = user_id);

-- Apenas service_role (edge functions) pode inserir
CREATE POLICY "Service role pode inserir logs WhatsApp"
  ON public.whatsapp_logs FOR INSERT
  WITH CHECK (auth.uid() IS NULL);

-- Adicionar coluna telefone ao profiles se não existir
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS telefone TEXT;
