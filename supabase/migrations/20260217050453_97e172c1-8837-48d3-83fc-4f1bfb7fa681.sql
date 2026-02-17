
-- Revogar acesso direto à materialized view pela API (anon e authenticated não devem acessar diretamente)
REVOKE SELECT ON public.user_permissions_mv FROM anon;
