CREATE OR REPLACE FUNCTION public.get_segmentacao_clientes()
 RETURNS TABLE(user_id uuid, nome text, email text, telefone text, tier_nome text, total_sessoes bigint, total_gasto numeric, ultima_visita timestamp with time zone, dias_sem_visita integer, ticket_medio numeric, total_pedidos bigint, data_cadastro timestamp with time zone, segmento text)
 LANGUAGE plpgsql
 STABLE SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
BEGIN
  RETURN QUERY
  WITH user_data AS (
    SELECT
      p.id AS uid,
      p.nome AS user_nome,
      p.telefone AS user_telefone,
      p.created_at AS cadastro,
      COALESCE((
        SELECT COUNT(*) FROM agendamentos a
        WHERE a.user_id = p.id AND a.status IN ('concluido', 'realizado')
      ), 0) AS sessoes,
      (
        SELECT MAX(a.data_hora) FROM agendamentos a
        WHERE a.user_id = p.id AND a.status IN ('concluido', 'realizado')
      ) AS last_visit,
      COALESCE((
        SELECT SUM(s.preco) FROM agendamentos a
        JOIN servicos s ON s.nome = a.servico
        WHERE a.user_id = p.id AND a.status IN ('concluido', 'realizado')
      ), 0) AS gasto_servicos,
      COALESCE((
        SELECT COUNT(*) FROM pedidos pd
        WHERE pd.user_id = p.id AND pd.status != 'cancelado'
      ), 0) AS num_pedidos,
      COALESCE((
        SELECT SUM(pd.total) FROM pedidos pd
        WHERE pd.user_id = p.id AND pd.status != 'cancelado'
      ), 0) AS gasto_pedidos,
      (SELECT gt.tier_name FROM get_user_tier(p.id) gt) AS user_tier
    FROM profiles p
  )
  SELECT
    ud.uid,
    ud.user_nome,
    COALESCE((SELECT au.email FROM auth.users au WHERE au.id = ud.uid), '')::text AS user_email,
    ud.user_telefone,
    COALESCE(ud.user_tier, 'Bronze'),
    ud.sessoes,
    ud.gasto_servicos + ud.gasto_pedidos,
    ud.last_visit,
    CASE WHEN ud.last_visit IS NOT NULL
      THEN EXTRACT(DAY FROM (now() - ud.last_visit))::integer
      ELSE NULL
    END,
    CASE WHEN ud.sessoes > 0
      THEN ROUND((ud.gasto_servicos + ud.gasto_pedidos) / ud.sessoes, 2)
      ELSE 0
    END,
    ud.num_pedidos,
    ud.cadastro,
    CASE
      WHEN ud.sessoes = 0 THEN 'nunca_visitou'
      WHEN ud.last_visit < now() - INTERVAL '90 days' THEN 'inativo'
      WHEN ud.last_visit < now() - INTERVAL '30 days' THEN 'em_risco'
      WHEN ud.sessoes >= 10 THEN 'fiel'
      WHEN ud.sessoes >= 3 THEN 'recorrente'
      ELSE 'novo'
    END
  FROM user_data ud
  ORDER BY ud.gasto_servicos + ud.gasto_pedidos DESC;
END;
$function$;