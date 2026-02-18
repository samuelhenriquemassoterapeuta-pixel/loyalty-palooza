
-- Table for personal wellness goals/targets
CREATE TABLE public.wellness_metas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  meta_agua_litros NUMERIC DEFAULT 2.0,
  meta_sono_horas NUMERIC DEFAULT 7.5,
  meta_energia_min INTEGER DEFAULT 3,
  meta_estresse_max INTEGER DEFAULT 3,
  meta_humor_min INTEGER DEFAULT 3,
  meta_passos INTEGER DEFAULT 8000,
  lembrete_checkin BOOLEAN DEFAULT true,
  horario_lembrete TIME DEFAULT '09:00',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable RLS
ALTER TABLE public.wellness_metas ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view own wellness goals"
  ON public.wellness_metas FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wellness goals"
  ON public.wellness_metas FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own wellness goals"
  ON public.wellness_metas FOR UPDATE
  USING (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_wellness_metas_updated_at
  BEFORE UPDATE ON public.wellness_metas
  FOR EACH ROW
  EXECUTE FUNCTION public.update_horarios_updated_at();
