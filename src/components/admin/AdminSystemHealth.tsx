import { useSystemHealth, useErrorDashboard, useSystemAlerts } from "@/hooks/useSystemHealth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  RefreshCw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Activity,
  Users,
  CreditCard,
  Shield,
} from "lucide-react";
import { toast } from "sonner";

const STATUS_CONFIG = {
  healthy: { color: "bg-green-500/20", textColor: "text-green-600", icon: CheckCircle, label: "Saudável" },
  warning: { color: "bg-yellow-500/20", textColor: "text-yellow-600", icon: AlertTriangle, label: "Atenção" },
  critical: { color: "bg-red-500/20", textColor: "text-red-600", icon: XCircle, label: "Crítico" },
};

export default function AdminSystemHealth() {
  const { health, isLoading, refetch } = useSystemHealth();
  const { errors } = useErrorDashboard(24);
  const { alerts, resolveAlert } = useSystemAlerts();

  const status = (health?.status || "healthy") as keyof typeof STATUS_CONFIG;
  const config = STATUS_CONFIG[status];
  const StatusIcon = config?.icon || Activity;

  return (
    <div className="space-y-6">
      {/* Header com Status Geral */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className={`p-3 rounded-full ${config?.color}`}>
            <StatusIcon className={`h-6 w-6 ${config?.textColor}`} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-foreground">Saúde do Sistema</h2>
            <p className="text-sm text-muted-foreground">
              Status: <span className="font-medium">{config?.label}</span>
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            refetch();
            toast.success("Atualizado");
          }}
        >
          <RefreshCw className="h-4 w-4 mr-2" />
          Atualizar
        </Button>
      </div>

      {/* Cards de Métricas */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="h-4 w-4 text-destructive" />
              <span className="text-sm text-muted-foreground">Erros 1h</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{health?.errors_1h || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <CreditCard className="h-4 w-4 text-orange-500" />
              <span className="text-sm text-muted-foreground">Webhook Falhas</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{health?.webhook_failures || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Shield className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-muted-foreground">Login Falhas 1h</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{health?.failed_logins_1h || 0}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-2">
              <Users className="h-4 w-4 text-primary" />
              <span className="text-sm text-muted-foreground">Ativos 24h</span>
            </div>
            <p className="text-2xl font-bold text-foreground">{health?.active_users_24h || 0}</p>
          </CardContent>
        </Card>
      </div>

      {/* Alertas Ativos */}
      {alerts.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Alertas Ativos ({alerts.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {alerts.map((alert: any) => (
              <div
                key={alert.id}
                className="flex items-start justify-between p-3 rounded-lg border border-border"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <Badge
                      variant={
                        alert.severity === "critical" ? "destructive" : "secondary"
                      }
                    >
                      {alert.severity}
                    </Badge>
                    <span className="text-sm font-medium text-foreground">
                      {alert.title}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(alert.created_at).toLocaleString("pt-BR")}
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => resolveAlert(alert.id)}
                >
                  Resolver
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Tabela de Erros por Função */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Erros por Edge Function (24h)</CardTitle>
        </CardHeader>
        <CardContent>
          {errors.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">
              Nenhum log registrado nas últimas 24h
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2 text-muted-foreground font-medium">Função</th>
                    <th className="text-right p-2 text-muted-foreground font-medium">Chamadas</th>
                    <th className="text-right p-2 text-muted-foreground font-medium">Erros</th>
                    <th className="text-right p-2 text-muted-foreground font-medium">Taxa</th>
                    <th className="text-right p-2 text-muted-foreground font-medium">Duração Média</th>
                  </tr>
                </thead>
                <tbody>
                  {errors.map((fn: any) => (
                    <tr key={fn.function_name} className="border-b border-border/50">
                      <td className="p-2 font-mono text-xs text-foreground">{fn.function_name}</td>
                      <td className="p-2 text-right text-foreground">{fn.total_calls}</td>
                      <td className="p-2 text-right">
                        <span className={fn.total_errors > 0 ? "text-destructive font-medium" : "text-foreground"}>
                          {fn.total_errors}
                        </span>
                      </td>
                      <td className="p-2 text-right">
                        <span className={fn.error_rate > 5 ? "text-destructive font-medium" : "text-foreground"}>
                          {fn.error_rate}%
                        </span>
                      </td>
                      <td className="p-2 text-right text-foreground">{fn.avg_duration_ms}ms</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
