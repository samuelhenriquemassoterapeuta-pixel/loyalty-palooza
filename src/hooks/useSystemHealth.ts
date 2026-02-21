import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface SystemHealth {
  errors_1h: number;
  errors_24h: number;
  webhook_failures: number;
  failed_logins_1h: number;
  active_users_24h: number;
  cashback_expiring_7d: number;
  pending_payments: number;
  broken_functions: string[];
  status: "healthy" | "warning" | "critical";
  collected_at: string;
}

interface ErrorDashboardRow {
  function_name: string;
  total_calls: number;
  total_errors: number;
  error_rate: number;
  avg_duration_ms: number;
  last_error: string | null;
}

interface LogEntry {
  id: string;
  function_name: string;
  status_code: number | null;
  level: string;
  message: string;
  metadata: Record<string, unknown>;
  duration_ms: number | null;
  error_stack: string | null;
  created_at: string;
}

export function useSystemHealth() {
  const { data: health, isLoading, refetch } = useQuery({
    queryKey: ["system-health"],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("collect_system_health" as any);
      if (error) throw error;
      return data as unknown as SystemHealth;
    },
    refetchInterval: 5 * 60 * 1000,
  });

  return { health, isLoading, refetch };
}

export function useErrorDashboard(hours: number = 24) {
  const { data, isLoading } = useQuery({
    queryKey: ["error-dashboard", hours],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_error_dashboard" as any, {
        p_hours: hours,
      });
      if (error) throw error;
      return data as unknown as ErrorDashboardRow[];
    },
    refetchInterval: 60 * 1000,
  });

  return { errors: data ?? [], isLoading };
}

export function useEdgeFunctionLogs(
  functionName?: string,
  level?: string,
  hours: number = 24
) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["ef-logs", functionName, level, hours],
    queryFn: async () => {
      const { data, error } = await supabase.rpc("get_edge_function_logs" as any, {
        p_function_name: functionName || null,
        p_level: level || null,
        p_hours: hours,
        p_limit: 200,
      });
      if (error) throw error;
      return data as unknown as LogEntry[];
    },
  });

  return { logs: data ?? [], isLoading, refetch };
}

export function useSystemAlerts() {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["system-alerts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("system_alerts" as any)
        .select("*")
        .eq("resolved", false)
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data as any[];
    },
    refetchInterval: 60 * 1000,
  });

  const resolveAlert = async (alertId: string) => {
    await supabase
      .from("system_alerts" as any)
      .update({
        resolved: true,
        resolved_at: new Date().toISOString(),
      } as any)
      .eq("id", alertId);
    await refetch();
  };

  return { alerts: data ?? [], isLoading, resolveAlert, refetch };
}
