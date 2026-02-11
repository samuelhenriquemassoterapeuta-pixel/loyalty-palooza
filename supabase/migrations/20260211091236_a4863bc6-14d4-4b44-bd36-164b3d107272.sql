
-- Ficha nutricional / anamnese alimentar do usuário
CREATE TABLE public.ficha_nutricional (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  peso NUMERIC,
  altura NUMERIC,
  idade INTEGER,
  sexo TEXT,
  objetivo TEXT,
  doencas TEXT[] DEFAULT '{}',
  alergias_alimentares TEXT[] DEFAULT '{}',
  alimentos_restritos TEXT[] DEFAULT '{}',
  medicamentos TEXT,
  fumante BOOLEAN DEFAULT false,
  consumo_alcool TEXT DEFAULT 'nenhum',
  nivel_atividade TEXT DEFAULT 'sedentario',
  historico_cirurgias TEXT,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.ficha_nutricional ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Usuários veem própria ficha nutricional"
  ON public.ficha_nutricional FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários criam própria ficha nutricional"
  ON public.ficha_nutricional FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários atualizam própria ficha nutricional"
  ON public.ficha_nutricional FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários deletam própria ficha nutricional"
  ON public.ficha_nutricional FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger updated_at
CREATE TRIGGER update_ficha_nutricional_updated_at
  BEFORE UPDATE ON public.ficha_nutricional
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Unique constraint: one profile per user
CREATE UNIQUE INDEX idx_ficha_nutricional_user ON public.ficha_nutricional(user_id);
