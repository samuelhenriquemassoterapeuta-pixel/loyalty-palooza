-- Recriar a view com SECURITY INVOKER para respeitar RLS do usuário (corrige Security Definer View)
DROP VIEW IF EXISTS public.b2b_roi_analytics;

CREATE VIEW public.b2b_roi_analytics
WITH (security_invoker = true)
AS
SELECT 
    c.empresa_id,
    e.nome AS empresa_nome,
    DATE_TRUNC('month', d.created_at) AS mes_referencia,
    ROUND(AVG(d.nivel_estresse), 2) AS media_estresse,
    ROUND(AVG(d.energia_fisica), 2) AS media_energia,
    COUNT(DISTINCT d.user_id) AS total_funcionarios_engajados
FROM public.diario_bem_estar d
JOIN public.colaboradores_empresa c ON d.user_id = c.user_id
JOIN public.empresas_corporativas e ON c.empresa_id = e.id
GROUP BY c.empresa_id, e.nome, DATE_TRUNC('month', d.created_at);

GRANT SELECT ON public.b2b_roi_analytics TO authenticated;

COMMENT ON VIEW public.b2b_roi_analytics IS 'Agregação mensal de bem-estar por empresa — dados anonimizados (LGPD). SECURITY INVOKER: respeita RLS do usuário consultante.';