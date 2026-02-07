
-- Function to get achievements ranking (anonymized, no PII exposed)
-- Returns position, display name (first name only), tier, and score
CREATE OR REPLACE FUNCTION public.get_achievements_ranking(p_limit integer DEFAULT 20)
RETURNS TABLE(
  posicao integer,
  nome_exibicao text,
  tier_nome text,
  total_sessoes integer,
  total_gasto numeric,
  is_current_user boolean
)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  WITH user_stats AS (
    SELECT
      p.id AS uid,
      COALESCE(
        SPLIT_PART(p.nome, ' ', 1),
        'Usuário'
      ) AS primeiro_nome,
      -- Count completed appointments
      COALESCE((
        SELECT COUNT(*)::integer
        FROM public.agendamentos a
        WHERE a.user_id = p.id
          AND a.status IN ('concluido', 'realizado')
      ), 0) AS sessoes_count,
      -- Get tier info
      (SELECT gt.tier_name FROM public.get_user_tier(p.id) gt) AS user_tier,
      (SELECT gt.total_gasto FROM public.get_user_tier(p.id) gt) AS user_gasto
    FROM public.profiles p
  ),
  ranked AS (
    SELECT
      us.uid,
      us.primeiro_nome,
      us.user_tier,
      us.sessoes_count,
      us.user_gasto,
      ROW_NUMBER() OVER (
        ORDER BY us.user_gasto DESC, us.sessoes_count DESC
      )::integer AS pos
    FROM user_stats us
    WHERE us.user_gasto > 0 OR us.sessoes_count > 0
  )
  SELECT
    r.pos AS posicao,
    -- Anonymize: show first name + initial of position for privacy
    r.primeiro_nome || ' ' || REPEAT('★', LEAST(r.pos, 3)) AS nome_exibicao,
    COALESCE(r.user_tier, 'Bronze') AS tier_nome,
    r.sessoes_count AS total_sessoes,
    r.user_gasto AS total_gasto,
    (r.uid = auth.uid()) AS is_current_user
  FROM ranked r
  ORDER BY r.pos ASC
  LIMIT p_limit;
END;
$$;
