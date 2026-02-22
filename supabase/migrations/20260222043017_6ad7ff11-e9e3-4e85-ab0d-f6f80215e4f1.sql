-- Remove overly permissive INSERT/UPDATE policies that allow any authenticated user
-- to insert into system tables. Service role bypasses RLS, so these are unnecessary.

-- notificacoes: remove open INSERT, add user-scoped INSERT
DROP POLICY IF EXISTS "Sistema pode criar notificações" ON public.notificacoes;
CREATE POLICY "Users receive own notifications"
  ON public.notificacoes FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- indicacoes: remove open INSERT and UPDATE
DROP POLICY IF EXISTS "Sistema pode criar indicações" ON public.indicacoes;
DROP POLICY IF EXISTS "Sistema pode atualizar indicações" ON public.indicacoes;

-- edge_function_logs: remove open INSERT (service_role bypasses RLS)
DROP POLICY IF EXISTS "Service can insert logs" ON public.edge_function_logs;

-- system_alerts: remove open INSERT
DROP POLICY IF EXISTS "Service can insert alerts" ON public.system_alerts;

-- system_health_snapshots: remove open INSERT  
DROP POLICY IF EXISTS "Service can insert health" ON public.system_health_snapshots;