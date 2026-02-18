
-- Create wellness daily check-in table
CREATE TABLE public.wellness_checkins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  humor INTEGER NOT NULL CHECK (humor BETWEEN 1 AND 5),
  energia INTEGER NOT NULL CHECK (energia BETWEEN 1 AND 5),
  sono_horas NUMERIC(3,1),
  sono_qualidade INTEGER CHECK (sono_qualidade BETWEEN 1 AND 5),
  dor INTEGER DEFAULT 0 CHECK (dor BETWEEN 0 AND 10),
  dor_local TEXT,
  estresse INTEGER CHECK (estresse BETWEEN 1 AND 5),
  agua_litros NUMERIC(3,1),
  exercicio_min INTEGER DEFAULT 0,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, data)
);

-- Enable RLS
ALTER TABLE public.wellness_checkins ENABLE ROW LEVEL SECURITY;

-- RLS Policies
CREATE POLICY "Users can view own wellness checkins"
  ON public.wellness_checkins FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wellness checkins"
  ON public.wellness_checkins FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own wellness checkins"
  ON public.wellness_checkins FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete own wellness checkins"
  ON public.wellness_checkins FOR DELETE
  USING (auth.uid() = user_id);
