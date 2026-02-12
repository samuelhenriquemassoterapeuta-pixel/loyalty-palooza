
-- Create gift cards table
CREATE TABLE public.vale_presentes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  comprador_id UUID NOT NULL,
  destinatario_nome TEXT NOT NULL,
  destinatario_email TEXT,
  valor NUMERIC NOT NULL CHECK (valor > 0),
  codigo TEXT NOT NULL UNIQUE DEFAULT UPPER(SUBSTRING(MD5(gen_random_uuid()::text || now()::text) FROM 1 FOR 10)),
  mensagem TEXT,
  tema TEXT NOT NULL DEFAULT 'classico',
  status TEXT NOT NULL DEFAULT 'ativo',
  validade DATE NOT NULL DEFAULT (CURRENT_DATE + INTERVAL '365 days'),
  usado_em TIMESTAMP WITH TIME ZONE,
  usado_por UUID,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vale_presentes ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Usuários podem criar vales presente"
ON public.vale_presentes FOR INSERT
WITH CHECK (auth.uid() = comprador_id);

CREATE POLICY "Usuários podem ver próprios vales comprados"
ON public.vale_presentes FOR SELECT
USING (auth.uid() = comprador_id OR auth.uid() = usado_por);

CREATE POLICY "Qualquer autenticado pode resgatar vale"
ON public.vale_presentes FOR UPDATE
USING (auth.uid() IS NOT NULL AND status = 'ativo')
WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins podem ver todos os vales"
ON public.vale_presentes FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins gerenciam vales"
ON public.vale_presentes FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));
