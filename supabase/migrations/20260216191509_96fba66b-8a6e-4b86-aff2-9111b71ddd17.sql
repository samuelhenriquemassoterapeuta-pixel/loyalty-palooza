
-- Tabela de conversas/leads capturados via WhatsApp
CREATE TABLE public.whatsapp_conversas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  telefone TEXT NOT NULL,
  nome TEXT,
  email TEXT,
  necessidade TEXT,
  status TEXT NOT NULL DEFAULT 'ativo',
  mensagens JSONB NOT NULL DEFAULT '[]'::jsonb,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT unique_telefone_ativo UNIQUE (telefone)
);

-- Enable RLS
ALTER TABLE public.whatsapp_conversas ENABLE ROW LEVEL SECURITY;

-- Only service role (edge functions) can access this table
-- No direct client access needed
CREATE POLICY "Service role full access on whatsapp_conversas"
ON public.whatsapp_conversas
FOR ALL
TO service_role
USING (true)
WITH CHECK (true);

-- Admins can view conversations
CREATE POLICY "Admins can view whatsapp_conversas"
ON public.whatsapp_conversas
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'));

-- Block anon access
CREATE POLICY "Block anon access on whatsapp_conversas"
ON public.whatsapp_conversas
AS RESTRICTIVE
FOR ALL
TO anon
USING (false)
WITH CHECK (false);

-- Trigger for updated_at
CREATE TRIGGER update_whatsapp_conversas_updated_at
BEFORE UPDATE ON public.whatsapp_conversas
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
