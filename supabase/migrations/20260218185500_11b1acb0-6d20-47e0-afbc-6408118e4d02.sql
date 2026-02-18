
-- Custom habits table for user-defined daily habits
CREATE TABLE public.wellness_habitos_personalizados (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  emoji TEXT NOT NULL DEFAULT '✨',
  label TEXT NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT true,
  ordem INT NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.wellness_habitos_personalizados ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users manage own custom habits"
  ON public.wellness_habitos_personalizados
  FOR ALL USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
