
-- Configuration table for postural pause reminders
CREATE TABLE public.pausas_posturais_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  ativo BOOLEAN NOT NULL DEFAULT true,
  intervalo_minutos INTEGER NOT NULL DEFAULT 60,
  horario_inicio TIME NOT NULL DEFAULT '08:00:00',
  horario_fim TIME NOT NULL DEFAULT '18:00:00',
  dias_semana INTEGER[] NOT NULL DEFAULT '{1,2,3,4,5}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  CONSTRAINT intervalo_valido CHECK (intervalo_minutos IN (30, 45, 60, 90, 120))
);

-- Tracking table for completed pauses
CREATE TABLE public.pausas_posturais_registro (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  exercicio_id TEXT NOT NULL,
  duracao_segundos INTEGER NOT NULL DEFAULT 0,
  completado BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Index for efficient daily queries
CREATE INDEX idx_pausas_registro_user_data ON public.pausas_posturais_registro (user_id, data);
CREATE INDEX idx_pausas_config_user ON public.pausas_posturais_config (user_id);

-- Unique constraint: one config per user
CREATE UNIQUE INDEX idx_pausas_config_unique_user ON public.pausas_posturais_config (user_id);

-- Enable RLS
ALTER TABLE public.pausas_posturais_config ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pausas_posturais_registro ENABLE ROW LEVEL SECURITY;

-- RLS for config
CREATE POLICY "Usuários veem própria config de pausas"
  ON public.pausas_posturais_config FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários criam própria config de pausas"
  ON public.pausas_posturais_config FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários atualizam própria config de pausas"
  ON public.pausas_posturais_config FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários deletam própria config de pausas"
  ON public.pausas_posturais_config FOR DELETE
  USING (auth.uid() = user_id);

-- RLS for tracking
CREATE POLICY "Usuários veem próprios registros de pausas"
  ON public.pausas_posturais_registro FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários criam próprios registros de pausas"
  ON public.pausas_posturais_registro FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários deletam próprios registros de pausas"
  ON public.pausas_posturais_registro FOR DELETE
  USING (auth.uid() = user_id);

-- Trigger for updated_at on config
CREATE TRIGGER update_pausas_config_updated_at
  BEFORE UPDATE ON public.pausas_posturais_config
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
