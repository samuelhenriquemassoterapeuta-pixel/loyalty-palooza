import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useParceiroRole } from "../hooks/useParceiroRole";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Brain, Zap, Users, ShieldX, TrendingDown, TrendingUp } from "lucide-react";
import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { format, parseISO } from "date-fns";
import { ptBR } from "date-fns/locale";

// ─── Types ────────────────────────────────────────────────────────────────────

interface B2BRow {
  empresa_id: string;
  empresa_nome: string;
  mes_referencia: string;
  media_estresse: number | null;
  media_energia: number | null;
  total_funcionarios_engajados: number;
}

// ─── Custom Tooltip ───────────────────────────────────────────────────────────

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3 shadow-lg text-sm space-y-1">
      <p className="font-semibold text-foreground">{label}</p>
      {payload.map((entry: any) => (
        <p key={entry.name} style={{ color: entry.color }}>
          {entry.name}: <span className="font-bold">{Number(entry.value).toFixed(1)}</span>
        </p>
      ))}
    </div>
  );
};

// ─── Component ────────────────────────────────────────────────────────────────

const B2BAnalyticsDashboard = () => {
  const { user } = useAuth();
  const { isParceiro, loading: roleLoading } = useParceiroRole();

  // Descobre o empresa_id vinculado ao usuário via colaboradores_empresa
  const { data: empresaId, isLoading: empresaLoading } = useQuery({
    queryKey: ["parceiro-empresa-id", user?.id],
    enabled: !!user && isParceiro,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("colaboradores_empresa")
        .select("empresa_id")
        .eq("user_id", user!.id)
        .eq("ativo", true)
        .maybeSingle();
      if (error) throw error;
      return data?.empresa_id ?? null;
    },
  });

  // Busca dados da view analítica LGPD-safe
  const { data: rows = [], isLoading: dataLoading } = useQuery({
    queryKey: ["b2b-roi-analytics", empresaId],
    enabled: !!empresaId,
    staleTime: 1000 * 60 * 10,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("b2b_roi_analytics" as any)
        .select("*")
        .eq("empresa_id", empresaId)
        .order("mes_referencia", { ascending: true });
      if (error) throw error;
      return (data as unknown as B2BRow[]) ?? [];
    },
  });

  // ── Guard: loading ──────────────────────────────────────────────────────────
  if (roleLoading || empresaLoading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  // ── Guard: role 'parceiro' ──────────────────────────────────────────────────
  if (!isParceiro) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-center px-6">
        <ShieldX size={48} className="text-destructive opacity-60" />
        <h2 className="text-lg font-semibold text-foreground">Acesso restrito</h2>
        <p className="text-sm text-muted-foreground max-w-xs">
          Este painel é exclusivo para parceiros corporativos. Entre em contato para solicitar acesso.
        </p>
      </div>
    );
  }

  // ── Derivar KPIs do período mais recente ────────────────────────────────────
  const latest = rows[rows.length - 1];
  const kpis = [
    {
      icon: Brain,
      label: "Estresse Médio",
      value: latest ? Number(latest.media_estresse ?? 0).toFixed(1) : "—",
      suffix: "/ 10",
      trend: "down",
      color: "text-destructive",
      bgColor: "bg-destructive/8",
    },
    {
      icon: Zap,
      label: "Energia Média",
      value: latest ? Number(latest.media_energia ?? 0).toFixed(1) : "—",
      suffix: "/ 10",
      trend: "up",
      color: "text-primary",
      bgColor: "bg-primary/8",
    },
    {
      icon: Users,
      label: "Funcionários Engajados",
      value: latest ? String(latest.total_funcionarios_engajados) : "—",
      suffix: "colaboradores",
      trend: "up",
      color: "text-accent",
      bgColor: "bg-accent/8",
    },
  ];

  // ── Dados para o gráfico ────────────────────────────────────────────────────
  const chartData = rows.map((r) => ({
    mes: format(parseISO(r.mes_referencia), "MMM/yy", { locale: ptBR }),
    Estresse: Number(r.media_estresse ?? 0),
    Energia: Number(r.media_energia ?? 0),
  }));

  const empresa_nome = latest?.empresa_nome ?? "Empresa";

  // ── Render ──────────────────────────────────────────────────────────────────
  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-1"
      >
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="text-xs tracking-wide uppercase">
            B2B Analytics
          </Badge>
        </div>
        <h1 className="text-2xl font-bold text-foreground font-[family-name:var(--font-serif)]">
          {empresa_nome}
        </h1>
        <p className="text-sm text-muted-foreground">
          Visão consolidada de bem-estar — dados anonimizados, conformidade LGPD.
        </p>
      </motion.div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {kpis.map((kpi, i) => (
          <motion.div
            key={kpi.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="border-border shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-elevated)] transition-shadow duration-300">
              <CardContent className="p-5 space-y-3">
                <div className="flex items-center justify-between">
                  <div className={`p-2 rounded-lg ${kpi.bgColor}`}>
                    <kpi.icon size={20} className={kpi.color} />
                  </div>
                  {kpi.trend === "up" ? (
                    <TrendingUp size={14} className="text-primary opacity-50" />
                  ) : (
                    <TrendingDown size={14} className="text-destructive opacity-50" />
                  )}
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground tracking-tight">
                    {dataLoading ? (
                      <span className="inline-block w-12 h-8 bg-muted animate-pulse rounded" />
                    ) : (
                      kpi.value
                    )}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">{kpi.suffix}</p>
                </div>
                <p className="text-sm font-medium text-foreground/80">{kpi.label}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Line Chart */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="border-border shadow-[var(--shadow-card)]">
          <CardHeader className="pb-2">
            <CardTitle className="text-base font-semibold text-foreground">
              Evolução Mensal — Estresse vs Energia
            </CardTitle>
            <p className="text-xs text-muted-foreground">
              Escala 0–10 · Fonte: diários de bem-estar anonimizados
            </p>
          </CardHeader>
          <CardContent>
            {dataLoading ? (
              <div className="flex items-center justify-center h-60">
                <Loader2 className="animate-spin text-primary" size={28} />
              </div>
            ) : chartData.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-60 gap-2 text-center">
                <Brain size={36} className="text-muted-foreground opacity-40" />
                <p className="text-sm text-muted-foreground">
                  Nenhum dado de bem-estar registrado ainda.
                </p>
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={280}>
                <LineChart data={chartData} margin={{ top: 8, right: 16, left: -16, bottom: 0 }}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="hsl(var(--border))"
                    vertical={false}
                  />
                  <XAxis
                    dataKey="mes"
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    domain={[0, 10]}
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip content={<CustomTooltip />} />
                  <Legend
                    wrapperStyle={{ fontSize: 12, paddingTop: 12 }}
                    formatter={(value) => (
                      <span style={{ color: "hsl(var(--foreground))" }}>{value}</span>
                    )}
                  />
                  {/* Estresse — linha vermelha (idealmente descendo = melhoria) */}
                  <Line
                    type="monotone"
                    dataKey="Estresse"
                    stroke="hsl(var(--destructive))"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "hsl(var(--destructive))", strokeWidth: 0 }}
                    activeDot={{ r: 6 }}
                  />
                  {/* Energia — linha verde (idealmente subindo = melhoria) */}
                  <Line
                    type="monotone"
                    dataKey="Energia"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2.5}
                    dot={{ r: 4, fill: "hsl(var(--primary))", strokeWidth: 0 }}
                    activeDot={{ r: 6 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Footer note */}
      <p className="text-xs text-muted-foreground text-center pb-6">
        Dados agrupados por empresa · Nenhum dado individual é exibido · Conformidade LGPD
      </p>
    </div>
  );
};

export default B2BAnalyticsDashboard;
