
-- Add wellness streak/total checks to the achievements function
CREATE OR REPLACE FUNCTION public.check_and_unlock_achievements(p_user_id uuid)
 RETURNS TABLE(conquista_codigo text, conquista_titulo text, conquista_icone text, recompensa numeric)
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  v_conquista RECORD;
  v_count NUMERIC;
  v_qualifica BOOLEAN;
BEGIN
  FOR v_conquista IN
    SELECT c.* FROM public.conquistas c
    WHERE c.ativo = true
      AND NOT EXISTS (
        SELECT 1 FROM public.usuario_conquistas uc
        WHERE uc.user_id = p_user_id AND uc.conquista_id = c.id
      )
    ORDER BY c.ordem
  LOOP
    v_qualifica := false;

    CASE v_conquista.condicao_tipo
      WHEN 'sessoes' THEN
        SELECT COUNT(*) INTO v_count FROM public.agendamentos
        WHERE user_id = p_user_id AND status IN ('concluido', 'realizado');
        v_qualifica := v_count >= v_conquista.condicao_valor;

      WHEN 'indicacoes' THEN
        SELECT COUNT(*) INTO v_count FROM public.indicacoes
        WHERE indicador_id = p_user_id AND status = 'processado';
        v_qualifica := v_count >= v_conquista.condicao_valor;

      WHEN 'compras' THEN
        SELECT COUNT(*) INTO v_count FROM public.pedidos
        WHERE user_id = p_user_id AND status != 'cancelado';
        v_qualifica := v_count >= v_conquista.condicao_valor;

      WHEN 'gasto' THEN
        SELECT COALESCE(gt.total_gasto, 0) INTO v_count FROM public.get_user_tier(p_user_id) gt;
        v_qualifica := v_count >= v_conquista.condicao_valor;

      WHEN 'tier' THEN
        SELECT CASE
          WHEN gt.tier_name = 'Ouro' THEN 3
          WHEN gt.tier_name = 'Prata' THEN 2
          ELSE 1
        END INTO v_count FROM public.get_user_tier(p_user_id) gt;
        v_qualifica := v_count >= v_conquista.condicao_valor;

      WHEN 'streak' THEN
        WITH weeks AS (
          SELECT DISTINCT date_trunc('week', data_hora) AS semana
          FROM public.agendamentos
          WHERE user_id = p_user_id AND status IN ('concluido', 'realizado')
          ORDER BY semana DESC
        ),
        numbered AS (
          SELECT semana, ROW_NUMBER() OVER (ORDER BY semana DESC) AS rn
          FROM weeks
        ),
        streak AS (
          SELECT COUNT(*) AS streak_count FROM numbered
          WHERE semana >= date_trunc('week', now()) - ((rn - 1) * INTERVAL '1 week')
            AND semana <= date_trunc('week', now()) - ((rn - 1) * INTERVAL '1 week') + INTERVAL '6 days'
        )
        SELECT COALESCE(streak_count, 0) INTO v_count FROM streak;
        v_qualifica := v_count >= v_conquista.condicao_valor;

      WHEN 'wellness_streak' THEN
        SELECT COALESCE(ws.streak_atual, 0) INTO v_count
        FROM public.wellness_streaks ws WHERE ws.user_id = p_user_id;
        v_qualifica := v_count >= v_conquista.condicao_valor;

      WHEN 'wellness_total' THEN
        SELECT COALESCE(ws.total_checkins, 0) INTO v_count
        FROM public.wellness_streaks ws WHERE ws.user_id = p_user_id;
        v_qualifica := v_count >= v_conquista.condicao_valor;

      ELSE
        v_qualifica := false;
    END CASE;

    IF v_qualifica THEN
      INSERT INTO public.usuario_conquistas (user_id, conquista_id, recompensa_creditada)
      VALUES (p_user_id, v_conquista.id, true);

      IF v_conquista.recompensa_valor > 0 THEN
        INSERT INTO public.transacoes (user_id, tipo, valor, descricao, referencia_id, expira_em)
        VALUES (
          p_user_id, 'cashback', v_conquista.recompensa_valor,
          'Conquista desbloqueada: ' || v_conquista.titulo || ' ' || v_conquista.icone,
          v_conquista.id, now() + INTERVAL '90 days'
        );
      END IF;

      INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
      VALUES (
        p_user_id,
        'Conquista desbloqueada! ' || v_conquista.icone,
        'Parabéns! Você desbloqueou "' || v_conquista.titulo || '"' ||
        CASE WHEN v_conquista.recompensa_valor > 0
          THEN ' e ganhou ℜ ' || REPLACE(TO_CHAR(v_conquista.recompensa_valor, 'FM999990D00'), '.', ',') || '!'
          ELSE '!'
        END,
        'cashback'
      );

      conquista_codigo := v_conquista.codigo;
      conquista_titulo := v_conquista.titulo;
      conquista_icone := v_conquista.icone;
      recompensa := v_conquista.recompensa_valor;
      RETURN NEXT;
    END IF;
  END LOOP;
END;
$function$;
