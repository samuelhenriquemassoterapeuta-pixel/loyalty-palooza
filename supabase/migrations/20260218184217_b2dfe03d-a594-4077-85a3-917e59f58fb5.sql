
-- Daily habits tracking for wellness
CREATE TABLE public.wellness_habitos_diarios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  habitos_completos TEXT[] NOT NULL DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, data)
);

ALTER TABLE public.wellness_habitos_diarios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own habits" ON public.wellness_habitos_diarios
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own habits" ON public.wellness_habitos_diarios
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own habits" ON public.wellness_habitos_diarios
  FOR UPDATE USING (auth.uid() = user_id);
