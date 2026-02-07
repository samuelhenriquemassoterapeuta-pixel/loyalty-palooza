
-- Tabela para preferências de lembretes de alongamento
CREATE TABLE public.lembretes_alongamento (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT true,
  horario TIME NOT NULL DEFAULT '08:00:00',
  dias_semana INTEGER[] NOT NULL DEFAULT '{1,2,3,4,5}', -- 0=domingo, 1=segunda...6=sábado
  mensagem_personalizada TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT lembretes_alongamento_user_unique UNIQUE (user_id)
);

-- Enable RLS
ALTER TABLE public.lembretes_alongamento ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Usuários veem próprios lembretes"
  ON public.lembretes_alongamento FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários criam próprios lembretes"
  ON public.lembretes_alongamento FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários atualizam próprios lembretes"
  ON public.lembretes_alongamento FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários deletam próprios lembretes"
  ON public.lembretes_alongamento FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger para updated_at
CREATE TRIGGER update_lembretes_alongamento_updated_at
  BEFORE UPDATE ON public.lembretes_alongamento
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
