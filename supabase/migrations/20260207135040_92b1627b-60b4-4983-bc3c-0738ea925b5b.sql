
-- Create surgical history table
CREATE TABLE public.historico_cirurgico (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  tipo_cirurgia TEXT NOT NULL,
  data_cirurgia DATE NOT NULL,
  medico_responsavel TEXT,
  hospital_clinica TEXT,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.historico_cirurgico ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Usuários veem próprio histórico cirúrgico"
  ON public.historico_cirurgico FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários criam próprio histórico cirúrgico"
  ON public.historico_cirurgico FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários atualizam próprio histórico cirúrgico"
  ON public.historico_cirurgico FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários deletam próprio histórico cirúrgico"
  ON public.historico_cirurgico FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_historico_cirurgico_updated_at
  BEFORE UPDATE ON public.historico_cirurgico
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
