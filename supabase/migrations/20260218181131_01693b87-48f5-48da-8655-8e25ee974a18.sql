
-- Table for wellness achievement definitions
CREATE TABLE public.wellness_conquistas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL UNIQUE,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  icone TEXT NOT NULL DEFAULT '🏆',
  categoria TEXT NOT NULL DEFAULT 'geral',
  condicao_tipo TEXT NOT NULL, -- 'streak', 'checkins_total', 'meta_cumprida_dias', 'sono_media', 'agua_media'
  condicao_valor NUMERIC NOT NULL DEFAULT 1,
  ordem INT NOT NULL DEFAULT 0,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Table for user unlocked achievements
CREATE TABLE public.wellness_conquistas_usuario (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  conquista_id UUID NOT NULL REFERENCES public.wellness_conquistas(id) ON DELETE CASCADE,
  desbloqueada_em TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, conquista_id)
);

-- Enable RLS
ALTER TABLE public.wellness_conquistas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wellness_conquistas_usuario ENABLE ROW LEVEL SECURITY;

-- Conquistas are readable by everyone (definitions)
CREATE POLICY "Anyone can read wellness achievements"
  ON public.wellness_conquistas FOR SELECT USING (true);

-- Users can read their own unlocked achievements
CREATE POLICY "Users can read own unlocked achievements"
  ON public.wellness_conquistas_usuario FOR SELECT
  USING (auth.uid() = user_id);

-- System inserts via trigger (service role), but allow user context inserts too
CREATE POLICY "Users can insert own achievements"
  ON public.wellness_conquistas_usuario FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Seed wellness achievements
INSERT INTO public.wellness_conquistas (codigo, titulo, descricao, icone, categoria, condicao_tipo, condicao_valor, ordem) VALUES
  ('primeiro_checkin', 'Primeiro Passo', 'Faça seu primeiro check-in de bem-estar', '🌱', 'inicio', 'checkins_total', 1, 1),
  ('checkins_7', 'Uma Semana Consciente', 'Complete 7 check-ins de bem-estar', '📅', 'consistencia', 'checkins_total', 7, 2),
  ('checkins_30', 'Mês de Autocuidado', 'Complete 30 check-ins de bem-estar', '🗓️', 'consistencia', 'checkins_total', 30, 3),
  ('checkins_100', 'Centenário do Bem-Estar', 'Complete 100 check-ins', '💯', 'consistencia', 'checkins_total', 100, 4),
  ('streak_3', 'Trio Consistente', 'Alcance 3 dias de streak', '🔥', 'streak', 'streak', 3, 5),
  ('streak_7', 'Semana Perfeita', 'Alcance 7 dias de streak', '⚡', 'streak', 'streak', 7, 6),
  ('streak_14', 'Quinzena de Ouro', 'Alcance 14 dias de streak', '✨', 'streak', 'streak', 14, 7),
  ('streak_30', 'Mestre da Consistência', 'Alcance 30 dias de streak', '👑', 'streak', 'streak', 30, 8),
  ('agua_meta_7', 'Hidratação Constante', 'Cumpra sua meta de água por 7 dias', '💧', 'metas', 'meta_agua_dias', 7, 9),
  ('sono_meta_7', 'Sono Reparador', 'Cumpra sua meta de sono por 7 dias', '🌙', 'metas', 'meta_sono_dias', 7, 10),
  ('energia_alta_5', 'Energia Radiante', 'Registre energia 4+ por 5 dias seguidos', '⚡', 'performance', 'energia_alta_dias', 5, 11),
  ('humor_alto_7', 'Positividade Plena', 'Registre humor 4+ por 7 dias', '😄', 'performance', 'humor_alto_dias', 7, 12);

-- Function to check and unlock achievements after checkin
CREATE OR REPLACE FUNCTION public.check_wellness_achievements()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_user_id UUID;
  v_total_checkins INTEGER;
  v_streak INTEGER;
  v_conquista RECORD;
  v_already BOOLEAN;
BEGIN
  v_user_id := NEW.user_id;

  -- Get total checkins
  SELECT COUNT(*) INTO v_total_checkins
  FROM wellness_checkins WHERE user_id = v_user_id;

  -- Get current streak
  SELECT COALESCE(streak_atual, 0) INTO v_streak
  FROM wellness_streaks WHERE user_id = v_user_id;

  -- Check each active achievement
  FOR v_conquista IN
    SELECT * FROM wellness_conquistas WHERE ativo = true
  LOOP
    -- Skip if already unlocked
    SELECT EXISTS(
      SELECT 1 FROM wellness_conquistas_usuario
      WHERE user_id = v_user_id AND conquista_id = v_conquista.id
    ) INTO v_already;

    IF v_already THEN CONTINUE; END IF;

    -- Check condition
    IF v_conquista.condicao_tipo = 'checkins_total' AND v_total_checkins >= v_conquista.condicao_valor THEN
      INSERT INTO wellness_conquistas_usuario (user_id, conquista_id)
      VALUES (v_user_id, v_conquista.id) ON CONFLICT DO NOTHING;

    ELSIF v_conquista.condicao_tipo = 'streak' AND v_streak >= v_conquista.condicao_valor THEN
      INSERT INTO wellness_conquistas_usuario (user_id, conquista_id)
      VALUES (v_user_id, v_conquista.id) ON CONFLICT DO NOTHING;
    END IF;
  END LOOP;

  RETURN NEW;
END;
$$;

-- Trigger after insert/update on wellness_checkins
CREATE TRIGGER trg_check_wellness_achievements
AFTER INSERT OR UPDATE ON public.wellness_checkins
FOR EACH ROW
EXECUTE FUNCTION public.check_wellness_achievements();
