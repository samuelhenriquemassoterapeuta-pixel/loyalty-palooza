import { useState, useMemo } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, TrendingUp, Calendar } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { format, subDays } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, AreaChart, Area,
} from "recharts";

type Period = "7d" | "14d" | "30d" | "90d";

const PERIOD_DAYS: Record<Period, number> = { "7d": 7, "14d": 14, "30d": 30, "90d": 90 };
const PERIOD_LABELS: Record<Period, string> = { "7d": "7 dias", "14d": "14 dias", "30d": "30 dias", "90d": "3 meses" };

const METRICS = [
  { key: "humor", label: "Humor", color: "hsl(var(--primary))", emoji: "😊", max: 5 },
  { key: "energia", label: "Energia", color: "hsl(var(--warning))", emoji: "⚡", max: 5 },
  { key: "sono_horas", label: "Sono (h)", color: "hsl(var(--accent))", emoji: "🌙", max: 12 },
  { key: "agua_litros", label: "Água (L)", color: "hsl(210, 80%, 55%)", emoji: "💧", max: 5 },
  { key: "estresse", label: "Estresse", color: "hsl(var(--destructive))", emoji: "🧘", max: 5 },
  { key: "dor", label: "Dor", color: "hsl(0, 60%, 50%)", emoji: "🩹", max: 10 },
] as const;

type MetricKey = typeof METRICS[number]["key"];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-card border border-border shadow-lg p-3 text-xs space-y-1">
      <p className="font-semibold text-foreground">{label}</p>
      {payload.map((p: any) => (
        <p key={p.dataKey} style={{ color: p.color }}>
          {METRICS.find(m => m.key === p.dataKey)?.emoji} {METRICS.find(m => m.key === p.dataKey)?.label}: <span className="font-bold">{p.value}</span>
        </p>
      ))}
    </div>
  );
};

const EvolucaoWellness = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [period, setPeriod] = useState<Period>("14d");
  const [activeMetrics, setActiveMetrics] = useState<Set<MetricKey>>(
    new Set(["humor", "energia", "sono_horas"])
  );

  const { data: checkins, isLoading } = useQuery({
    queryKey: ["wellness-evolucao", user?.id, period],
    enabled: !!user,
    queryFn: async () => {
      const since = format(subDays(new Date(), PERIOD_DAYS[period]), "yyyy-MM-dd");
      const { data } = await supabase
        .from("wellness_checkins")
        .select("data, humor, energia, sono_horas, agua_litros, estresse, dor")
        .eq("user_id", user!.id)
        .gte("data", since)
        .order("data", { ascending: true });
      return data || [];
    },
  });

  const chartData = useMemo(() => {
    if (!checkins) return [];
    return checkins.map(c => ({
      ...c,
      label: format(new Date(c.data + "T12:00:00"), "dd/MM", { locale: ptBR }),
    }));
  }, [checkins]);

  const toggleMetric = (key: MetricKey) => {
    setActiveMetrics(prev => {
      const next = new Set(prev);
      if (next.has(key)) {
        if (next.size > 1) next.delete(key);
      } else {
        next.add(key);
      }
      return next;
    });
  };

  const stats = useMemo(() => {
    if (!checkins || checkins.length === 0) return null;
    const avg = (arr: (number | null)[]) => {
      const valid = arr.filter((v): v is number => v != null);
      return valid.length ? Math.round((valid.reduce((a, b) => a + b, 0) / valid.length) * 10) / 10 : null;
    };
    return {
      dias: checkins.length,
      humor: avg(checkins.map(c => c.humor)),
      energia: avg(checkins.map(c => c.energia)),
      sono: avg(checkins.map(c => c.sono_horas)),
      agua: avg(checkins.map(c => c.agua_litros)),
      estresse: avg(checkins.map(c => c.estresse)),
    };
  }, [checkins]);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="max-w-2xl mx-auto px-4 py-6 space-y-4 pb-24">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-64 rounded-2xl" />
          <Skeleton className="h-32 rounded-2xl" />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Evolução do Bem-Estar</h1>
            <p className="text-xs text-muted-foreground">Visualize suas tendências ao longo do tempo</p>
          </div>
        </div>

        {/* Period Selector */}
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-muted-foreground" />
          <div className="flex gap-1.5">
            {(Object.keys(PERIOD_DAYS) as Period[]).map(p => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={`text-xs px-3 py-1.5 rounded-full transition-colors ${
                  period === p
                    ? "bg-primary text-primary-foreground font-semibold"
                    : "bg-muted text-muted-foreground hover:bg-muted/80"
                }`}
              >
                {PERIOD_LABELS[p]}
              </button>
            ))}
          </div>
        </div>

        {/* Metric Toggles */}
        <div className="flex flex-wrap gap-1.5">
          {METRICS.map(m => (
            <button
              key={m.key}
              onClick={() => toggleMetric(m.key)}
              className={`text-xs px-2.5 py-1.5 rounded-full transition-all flex items-center gap-1 ${
                activeMetrics.has(m.key)
                  ? "bg-foreground/10 text-foreground font-semibold ring-1 ring-foreground/20"
                  : "bg-muted/50 text-muted-foreground"
              }`}
            >
              <span>{m.emoji}</span> {m.label}
            </button>
          ))}
        </div>

        {/* Main Chart */}
        {chartData.length > 1 ? (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }}>
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-3">
                  <TrendingUp size={16} className="text-primary" />
                  <span className="font-semibold text-sm text-foreground">Gráfico de Evolução</span>
                </div>
                <ResponsiveContainer width="100%" height={260}>
                  <AreaChart data={chartData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                    <defs>
                      {METRICS.filter(m => activeMetrics.has(m.key)).map(m => (
                        <linearGradient key={m.key} id={`grad-${m.key}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={m.color} stopOpacity={0.3} />
                          <stop offset="95%" stopColor={m.color} stopOpacity={0} />
                        </linearGradient>
                      ))}
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
                    <XAxis dataKey="label" tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                    <Tooltip content={<CustomTooltip />} />
                    {METRICS.filter(m => activeMetrics.has(m.key)).map(m => (
                      <Area
                        key={m.key}
                        type="monotone"
                        dataKey={m.key}
                        stroke={m.color}
                        fill={`url(#grad-${m.key})`}
                        strokeWidth={2}
                        dot={{ r: 3, strokeWidth: 1 }}
                        activeDot={{ r: 5 }}
                        connectNulls
                      />
                    ))}
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <Card>
            <CardContent className="p-6 text-center">
              <TrendingUp size={32} className="mx-auto text-muted-foreground/30 mb-2" />
              <p className="text-sm text-muted-foreground">
                Registre pelo menos 2 check-ins para ver a evolução.
              </p>
              <Button onClick={() => navigate("/wellness-tracker")} size="sm" className="mt-3">
                Fazer Check-in
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Stats Summary */}
        {stats && stats.dias >= 2 && (
          <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card>
              <CardContent className="p-4 space-y-3">
                <p className="text-xs font-semibold text-muted-foreground">
                  Médias nos últimos {PERIOD_LABELS[period]} ({stats.dias} registros)
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { emoji: "😊", label: "Humor", value: stats.humor != null ? `${stats.humor}/5` : "—" },
                    { emoji: "⚡", label: "Energia", value: stats.energia != null ? `${stats.energia}/5` : "—" },
                    { emoji: "🌙", label: "Sono", value: stats.sono != null ? `${stats.sono}h` : "—" },
                    { emoji: "💧", label: "Água", value: stats.agua != null ? `${stats.agua}L` : "—" },
                    { emoji: "🧘", label: "Estresse", value: stats.estresse != null ? `${stats.estresse}/5` : "—" },
                    { emoji: "📊", label: "Check-ins", value: `${stats.dias}` },
                  ].map(s => (
                    <div key={s.label} className="text-center p-2.5 rounded-xl bg-muted/50">
                      <span className="text-lg">{s.emoji}</span>
                      <p className="text-sm font-bold text-foreground mt-0.5">{s.value}</p>
                      <p className="text-[10px] text-muted-foreground">{s.label}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </AppLayout>
  );
};

export default EvolucaoWellness;
