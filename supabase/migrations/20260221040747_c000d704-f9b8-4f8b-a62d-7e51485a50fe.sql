
-- =============================================
-- TABELA: Logs de Edge Functions
-- =============================================
CREATE TABLE IF NOT EXISTS public.edge_function_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  function_name TEXT NOT NULL,
  status_code INTEGER,
  level TEXT NOT NULL DEFAULT 'info',
  message TEXT,
  metadata JSONB DEFAULT '{}',
  user_id UUID,
  duration_ms INTEGER,
  error_stack TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_ef_logs_function ON public.edge_function_logs(function_name);
CREATE INDEX idx_ef_logs_level ON public.edge_function_logs(level);
CREATE INDEX idx_ef_logs_created ON public.edge_function_logs(created_at DESC);
CREATE INDEX idx_ef_logs_function_level ON public.edge_function_logs(function_name, level);

-- Limpar logs antigos (30 dias)
CREATE OR REPLACE FUNCTION cleanup_old_logs()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  DELETE FROM public.edge_function_logs
  WHERE created_at < now() - interval '30 days';
END;
$$;

-- =============================================
-- TABELA: Alertas do Sistema
-- =============================================
CREATE TABLE IF NOT EXISTS public.system_alerts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  alert_type TEXT NOT NULL,
  severity TEXT NOT NULL DEFAULT 'warning',
  title TEXT NOT NULL,
  description TEXT,
  metadata JSONB DEFAULT '{}',
  resolved BOOLEAN DEFAULT false,
  resolved_at TIMESTAMPTZ,
  resolved_by UUID,
  notified BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX idx_alerts_unresolved ON public.system_alerts(resolved, created_at DESC);
CREATE INDEX idx_alerts_type ON public.system_alerts(alert_type);

-- =============================================
-- TABELA: Métricas de Saúde (snapshot periódico)
-- =============================================
CREATE TABLE IF NOT EXISTS public.system_health_snapshots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  total_errors_1h INTEGER DEFAULT 0,
  total_errors_24h INTEGER DEFAULT 0,
  webhook_failures_1h INTEGER DEFAULT 0,
  failed_logins_1h INTEGER DEFAULT 0,
  active_users_24h INTEGER DEFAULT 0,
  cashback_expiring_7d NUMERIC DEFAULT 0,
  pending_payments INTEGER DEFAULT 0,
  edge_functions_with_errors TEXT[] DEFAULT '{}',
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- =============================================
-- FUNÇÃO: Coletar métricas de saúde
-- =============================================
CREATE OR REPLACE FUNCTION collect_system_health()
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_errors_1h INTEGER;
  v_errors_24h INTEGER;
  v_webhook_failures INTEGER;
  v_failed_logins INTEGER;
  v_active_users INTEGER;
  v_cashback_expiring NUMERIC;
  v_pending_payments INTEGER;
  v_broken_functions TEXT[];
  v_result JSONB;
BEGIN
  SELECT COUNT(*) INTO v_errors_1h
  FROM public.edge_function_logs
  WHERE level = 'error' AND created_at > now() - interval '1 hour';

  SELECT COUNT(*) INTO v_errors_24h
  FROM public.edge_function_logs
  WHERE level = 'error' AND created_at > now() - interval '24 hours';

  SELECT COUNT(*) INTO v_webhook_failures
  FROM public.edge_function_logs
  WHERE function_name IN ('asaas-webhook', 'asaas-criar-cobranca')
    AND level = 'error'
    AND created_at > now() - interval '24 hours';

  SELECT COUNT(*) INTO v_failed_logins
  FROM public.login_attempts
  WHERE success = false AND attempted_at > now() - interval '1 hour';

  SELECT COUNT(DISTINCT user_id) INTO v_active_users
  FROM public.edge_function_logs
  WHERE user_id IS NOT NULL AND created_at > now() - interval '24 hours';

  SELECT COALESCE(SUM(valor), 0) INTO v_cashback_expiring
  FROM public.transacoes
  WHERE tipo = 'cashback'
    AND expira_em < now() + interval '7 days'
    AND expira_em > now();

  SELECT COUNT(*) INTO v_pending_payments
  FROM public.pagamentos_asaas
  WHERE status = 'PENDING'
    AND created_at > now() - interval '48 hours';

  SELECT ARRAY_AGG(DISTINCT function_name) INTO v_broken_functions
  FROM public.edge_function_logs
  WHERE level = 'error' AND created_at > now() - interval '1 hour';

  INSERT INTO public.system_health_snapshots (
    total_errors_1h, total_errors_24h, webhook_failures_1h,
    failed_logins_1h, active_users_24h, cashback_expiring_7d,
    pending_payments, edge_functions_with_errors
  ) VALUES (
    v_errors_1h, v_errors_24h, v_webhook_failures,
    v_failed_logins, v_active_users, v_cashback_expiring,
    v_pending_payments, COALESCE(v_broken_functions, '{}')
  );

  v_result := jsonb_build_object(
    'errors_1h', v_errors_1h,
    'errors_24h', v_errors_24h,
    'webhook_failures', v_webhook_failures,
    'failed_logins_1h', v_failed_logins,
    'active_users_24h', v_active_users,
    'cashback_expiring_7d', v_cashback_expiring,
    'pending_payments', v_pending_payments,
    'broken_functions', COALESCE(v_broken_functions, '{}'),
    'status', CASE
      WHEN v_webhook_failures > 0 OR v_errors_1h > 50 THEN 'critical'
      WHEN v_errors_1h > 10 OR v_failed_logins > 20 THEN 'warning'
      ELSE 'healthy'
    END,
    'collected_at', now()
  );

  RETURN v_result;
END;
$$;

-- =============================================
-- FUNÇÃO: Buscar logs com filtros
-- =============================================
CREATE OR REPLACE FUNCTION get_edge_function_logs(
  p_function_name TEXT DEFAULT NULL,
  p_level TEXT DEFAULT NULL,
  p_hours INTEGER DEFAULT 24,
  p_limit INTEGER DEFAULT 100
)
RETURNS TABLE(
  id UUID,
  function_name TEXT,
  status_code INTEGER,
  level TEXT,
  message TEXT,
  metadata JSONB,
  duration_ms INTEGER,
  error_stack TEXT,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT
    efl.id, efl.function_name, efl.status_code, efl.level,
    efl.message, efl.metadata, efl.duration_ms, efl.error_stack,
    efl.created_at
  FROM public.edge_function_logs efl
  WHERE efl.created_at > now() - (p_hours || ' hours')::interval
    AND (p_function_name IS NULL OR efl.function_name = p_function_name)
    AND (p_level IS NULL OR efl.level = p_level)
  ORDER BY efl.created_at DESC
  LIMIT p_limit;
END;
$$;

-- =============================================
-- FUNÇÃO: Dashboard de erros por função
-- =============================================
CREATE OR REPLACE FUNCTION get_error_dashboard(p_hours INTEGER DEFAULT 24)
RETURNS TABLE(
  function_name TEXT,
  total_calls BIGINT,
  total_errors BIGINT,
  error_rate NUMERIC,
  avg_duration_ms NUMERIC,
  last_error TIMESTAMPTZ
)
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT
    efl.function_name,
    COUNT(*) as total_calls,
    COUNT(*) FILTER (WHERE efl.level = 'error') as total_errors,
    ROUND(
      COUNT(*) FILTER (WHERE efl.level = 'error')::NUMERIC / NULLIF(COUNT(*), 0) * 100,
      2
    ) as error_rate,
    ROUND(AVG(efl.duration_ms)::NUMERIC, 0) as avg_duration_ms,
    MAX(efl.created_at) FILTER (WHERE efl.level = 'error') as last_error
  FROM public.edge_function_logs efl
  WHERE efl.created_at > now() - (p_hours || ' hours')::interval
  GROUP BY efl.function_name
  ORDER BY total_errors DESC, total_calls DESC;
END;
$$;

-- =============================================
-- RLS
-- =============================================
ALTER TABLE public.edge_function_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_alerts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.system_health_snapshots ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins read logs" ON public.edge_function_logs
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Service can insert logs" ON public.edge_function_logs
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins manage alerts" ON public.system_alerts
  FOR ALL USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Service can insert alerts" ON public.system_alerts
  FOR INSERT WITH CHECK (true);
CREATE POLICY "Admins read health" ON public.system_health_snapshots
  FOR SELECT USING (public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Service can insert health" ON public.system_health_snapshots
  FOR INSERT WITH CHECK (true);
