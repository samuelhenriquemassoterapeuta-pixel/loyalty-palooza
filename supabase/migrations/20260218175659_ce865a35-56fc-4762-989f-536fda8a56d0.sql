
-- Wellness streak tracking table
CREATE TABLE public.wellness_streaks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  streak_atual INTEGER NOT NULL DEFAULT 0,
  melhor_streak INTEGER NOT NULL DEFAULT 0,
  ultimo_checkin DATE,
  total_checkins INTEGER NOT NULL DEFAULT 0,
  bonus_total_creditado NUMERIC NOT NULL DEFAULT 0,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id)
);

ALTER TABLE public.wellness_streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own wellness streak"
  ON public.wellness_streaks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own wellness streak"
  ON public.wellness_streaks FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own wellness streak"
  ON public.wellness_streaks FOR UPDATE
  USING (auth.uid() = user_id);

-- Function: update wellness streak on check-in
CREATE OR REPLACE FUNCTION public.update_wellness_streak()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_streak RECORD;
  v_today DATE;
  v_bonus NUMERIC;
  v_cromos INTEGER;
BEGIN
  v_today := NEW.data::DATE;

  SELECT * INTO v_streak FROM public.wellness_streaks WHERE user_id = NEW.user_id;

  IF v_streak IS NULL THEN
    INSERT INTO public.wellness_streaks (user_id, streak_atual, melhor_streak, ultimo_checkin, total_checkins)
    VALUES (NEW.user_id, 1, 1, v_today, 1);
  ELSIF v_streak.ultimo_checkin = v_today THEN
    -- Same day, just update total
    UPDATE public.wellness_streaks SET total_checkins = v_streak.total_checkins + 1, updated_at = now()
    WHERE user_id = NEW.user_id;
  ELSIF v_streak.ultimo_checkin = v_today - 1 THEN
    -- Consecutive day! Increment streak
    UPDATE public.wellness_streaks SET
      streak_atual = v_streak.streak_atual + 1,
      melhor_streak = GREATEST(v_streak.melhor_streak, v_streak.streak_atual + 1),
      ultimo_checkin = v_today,
      total_checkins = v_streak.total_checkins + 1,
      updated_at = now()
    WHERE user_id = NEW.user_id;

    -- Milestone rewards at 7, 14, 21, 30 days
    IF (v_streak.streak_atual + 1) IN (7, 14, 21, 30) THEN
      v_bonus := (v_streak.streak_atual + 1) * 0.5; -- 3.5, 7, 10.5, 15 Resinks
      v_cromos := CASE
        WHEN (v_streak.streak_atual + 1) = 7 THEN 2
        WHEN (v_streak.streak_atual + 1) = 14 THEN 4
        WHEN (v_streak.streak_atual + 1) = 21 THEN 6
        WHEN (v_streak.streak_atual + 1) = 30 THEN 10
        ELSE 1
      END;

      -- Credit cashback
      INSERT INTO public.transacoes (user_id, tipo, valor, descricao, expira_em)
      VALUES (
        NEW.user_id, 'cashback', v_bonus,
        'Streak Wellness! 🔥 ' || (v_streak.streak_atual + 1) || ' dias consecutivos!',
        now() + INTERVAL '90 days'
      );

      -- Credit éther cromos
      INSERT INTO public.cromos_usuarios (user_id, elemento, quantidade)
      VALUES (NEW.user_id, 'eter', v_cromos)
      ON CONFLICT (user_id, elemento)
      DO UPDATE SET quantidade = cromos_usuarios.quantidade + v_cromos, updated_at = now();

      INSERT INTO public.transacoes_cromos (user_id, tipo, elemento, quantidade, descricao)
      VALUES (NEW.user_id, 'wellness_streak', 'eter', v_cromos, 'Streak Wellness: ' || (v_streak.streak_atual + 1) || ' dias');

      -- Notify
      INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
      VALUES (
        NEW.user_id,
        'Streak Wellness de ' || (v_streak.streak_atual + 1) || ' dias! 🔥',
        'Parabéns! Você fez check-in por ' || (v_streak.streak_atual + 1) ||
        ' dias seguidos e ganhou ℜ ' || REPLACE(TO_CHAR(v_bonus, 'FM999990D00'), '.', ',') ||
        ' + ' || v_cromos || ' cromos Éter!',
        'cashback'
      );

      UPDATE public.wellness_streaks SET bonus_total_creditado = bonus_total_creditado + v_bonus
      WHERE user_id = NEW.user_id;
    END IF;
  ELSE
    -- Streak broken, restart at 1
    UPDATE public.wellness_streaks SET
      streak_atual = 1,
      ultimo_checkin = v_today,
      total_checkins = v_streak.total_checkins + 1,
      updated_at = now()
    WHERE user_id = NEW.user_id;
  END IF;

  RETURN NEW;
END;
$$;

-- Trigger on wellness_checkins insert
CREATE TRIGGER update_wellness_streak_on_checkin
  AFTER INSERT ON public.wellness_checkins
  FOR EACH ROW
  EXECUTE FUNCTION public.update_wellness_streak();

-- Insert wellness-related achievements
INSERT INTO public.conquistas (codigo, titulo, descricao, icone, categoria, condicao_tipo, condicao_valor, recompensa_tipo, recompensa_valor, ordem, ativo) VALUES
  ('wellness_7', 'Guardião do Bem-Estar', '7 dias consecutivos de check-in wellness', '🌱', 'wellness', 'wellness_streak', 7, 'cashback', 5.00, 50, true),
  ('wellness_14', 'Mestre do Autocuidado', '14 dias consecutivos de check-in wellness', '🌿', 'wellness', 'wellness_streak', 14, 'cashback', 10.00, 51, true),
  ('wellness_30', 'Lenda da Saúde', '30 dias consecutivos de check-in wellness', '🏆', 'wellness', 'wellness_streak', 30, 'cashback', 25.00, 52, true),
  ('wellness_total_30', 'Diário Completo', '30 check-ins wellness ao total', '📊', 'wellness', 'wellness_total', 30, 'cashback', 8.00, 53, true),
  ('wellness_total_100', 'Centenário do Bem-Estar', '100 check-ins wellness ao total', '💯', 'wellness', 'wellness_total', 100, 'cashback', 20.00, 54, true);
