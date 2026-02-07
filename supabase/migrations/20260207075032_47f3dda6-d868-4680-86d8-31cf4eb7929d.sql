
-- Add contact fields to terapeutas
ALTER TABLE public.terapeutas 
ADD COLUMN IF NOT EXISTS email text,
ADD COLUMN IF NOT EXISTS telefone text;

-- Create table to track sent reports
CREATE TABLE public.relatorios_enviados (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  protocolo_usuario_id uuid NOT NULL REFERENCES public.usuario_protocolos(id) ON DELETE CASCADE,
  terapeuta_id uuid NOT NULL REFERENCES public.terapeutas(id) ON DELETE CASCADE,
  metodo text NOT NULL DEFAULT 'whatsapp',
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.relatorios_enviados ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem próprios relatórios enviados"
ON public.relatorios_enviados FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuários criam próprios relatórios enviados"
ON public.relatorios_enviados FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins veem todos os relatórios"
ON public.relatorios_enviados FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));
