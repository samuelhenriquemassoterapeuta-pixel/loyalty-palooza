
-- Tabela para rastrear streaks de sessões semanais
CREATE TABLE public.user_streaks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL UNIQUE,
  streak_atual INTEGER NOT NULL DEFAULT 0,
  melhor_streak INTEGER NOT NULL DEFAULT 0,
  ultima_semana_contada DATE,
  bonus_total_creditado NUMERIC NOT NULL DEFAULT 0,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.user_streaks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem seu streak"
  ON public.user_streaks FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Block anon user_streaks"
  ON public.user_streaks FOR SELECT
  USING (auth.role() = 'authenticated');

-- Sistema insere/atualiza
CREATE POLICY "Sistema gerencia streaks"
  ON public.user_streaks FOR ALL
  USING (auth.uid() IS NULL);

CREATE INDEX idx_user_streaks_user ON public.user_streaks(user_id);

-- Função para atualizar streak quando sessão é concluída
CREATE OR REPLACE FUNCTION public.update_user_streak()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE
  v_current_week DATE;
  v_streak RECORD;
  v_bonus NUMERIC;
BEGIN
  IF NEW.status = 'concluido' AND (OLD.status IS NULL OR OLD.status != 'concluido') THEN
    v_current_week := date_trunc('week', now())::DATE;

    SELECT * INTO v_streak FROM public.user_streaks WHERE user_id = NEW.user_id;

    IF v_streak IS NULL THEN
      INSERT INTO public.user_streaks (user_id, streak_atual, melhor_streak, ultima_semana_contada, updated_at)
      VALUES (NEW.user_id, 1, 1, v_current_week, now());
    ELSIF v_streak.ultima_semana_contada = v_current_week THEN
      -- Already counted this week, do nothing
      NULL;
    ELSIF v_streak.ultima_semana_contada = v_current_week - INTERVAL '7 days' THEN
      -- Consecutive week! Increment streak
      UPDATE public.user_streaks SET
        streak_atual = v_streak.streak_atual + 1,
        melhor_streak = GREATEST(v_streak.melhor_streak, v_streak.streak_atual + 1),
        ultima_semana_contada = v_current_week,
        updated_at = now()
      WHERE user_id = NEW.user_id;

      -- Bonus at milestone streaks (4, 8, 12 weeks)
      IF (v_streak.streak_atual + 1) IN (4, 8, 12) THEN
        v_bonus := (v_streak.streak_atual + 1) * 2.5; -- 10, 20, 30 Resinks

        INSERT INTO public.transacoes (user_id, tipo, valor, descricao, expira_em)
        VALUES (
          NEW.user_id, 'cashback', v_bonus,
          'Bônus de streak! 🔥 ' || (v_streak.streak_atual + 1) || ' semanas consecutivas!',
          now() + INTERVAL '90 days'
        );

        INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
        VALUES (
          NEW.user_id,
          'Streak de ' || (v_streak.streak_atual + 1) || ' semanas! 🔥',
          'Incrível! Você completou ' || (v_streak.streak_atual + 1) ||
          ' semanas consecutivas e ganhou ℜ ' || REPLACE(TO_CHAR(v_bonus, 'FM999990D00'), '.', ',') || ' de bônus!',
          'cashback'
        );

        UPDATE public.user_streaks SET
          bonus_total_creditado = bonus_total_creditado + v_bonus
        WHERE user_id = NEW.user_id;
      END IF;
    ELSE
      -- Streak broken, restart at 1
      UPDATE public.user_streaks SET
        streak_atual = 1,
        ultima_semana_contada = v_current_week,
        updated_at = now()
      WHERE user_id = NEW.user_id;
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER update_streak_on_session
  AFTER UPDATE ON public.agendamentos
  FOR EACH ROW
  EXECUTE FUNCTION public.update_user_streak();
