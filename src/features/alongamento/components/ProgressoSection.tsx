import { useMemo } from "react";
import { motion } from "framer-motion";
import { Activity, Clock, Flame, Trophy, TrendingUp, Calendar } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { SessaoAlongamento } from "@/features/alongamento/hooks/useAlongamento";
import { format, subDays, startOfDay, isSameDay, startOfWeek, endOfWeek, eachDayOfInterval } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ProgressoSectionProps {
  sessoes: SessaoAlongamento[];
  totalSessoes: number;
  totalMinutos: number;
  totalExercicios: number;
}

export const ProgressoSection = ({
  sessoes,
  totalSessoes,
  totalMinutos,
  totalExercicios,
}: ProgressoSectionProps) => {
  // Streak calculation
  const streak = useMemo(() => {
    if (sessoes.length === 0) return 0;
    const datas = [
      ...new Set(sessoes.map((s) => format(new Date(s.data), "yyyy-MM-dd"))),
    ]
      .sort()
      .reverse();
    let s = 1;
    for (let i = 1; i < datas.length; i++) {
      const diff =
        new Date(datas[i - 1]).getTime() - new Date(datas[i]).getTime();
      if (diff <= 86400000 * 1.5) s++;
      else break;
    }
    return s;
  }, [sessoes]);

  // Weekly chart data (last 8 weeks)
  const weeklyData = useMemo(() => {
    const weeks: { label: string; sessoes: number; minutos: number }[] = [];
    for (let w = 7; w >= 0; w--) {
      const weekStart = startOfWeek(subDays(new Date(), w * 7), {
        locale: ptBR,
      });
      const weekEnd = endOfWeek(weekStart, { locale: ptBR });
      const weekSessoes = sessoes.filter((s) => {
        const d = new Date(s.data);
        return d >= weekStart && d <= weekEnd;
      });
      weeks.push({
        label: format(weekStart, "dd/MM"),
        sessoes: weekSessoes.length,
        minutos: Math.round(
          weekSessoes.reduce((a, s) => a + s.duracao_total_segundos, 0) / 60
        ),
      });
    }
    return weeks;
  }, [sessoes]);

  // Activity heatmap (last 28 days)
  const heatmapData = useMemo(() => {
    const days = eachDayOfInterval({
      start: subDays(startOfDay(new Date()), 27),
      end: startOfDay(new Date()),
    });
    return days.map((day) => {
      const count = sessoes.filter((s) =>
        isSameDay(new Date(s.data), day)
      ).length;
      return { date: day, count };
    });
  }, [sessoes]);

  const stats = [
    {
      icon: Activity,
      label: "Sessões",
      value: totalSessoes,
      color: "text-primary",
    },
    {
      icon: Clock,
      label: "Minutos",
      value: totalMinutos,
      color: "text-info",
    },
    {
      icon: TrendingUp,
      label: "Exercícios",
      value: totalExercicios,
      color: "text-accent",
    },
    {
      icon: Flame,
      label: "Streak",
      value: streak,
      suffix: "d",
      color: "text-warning",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08 }}
          >
            <Card className="p-4 text-center">
              <stat.icon size={20} className={`mx-auto mb-1 ${stat.color}`} />
              <p className="text-xl font-bold text-foreground">
                <AnimatedCounter value={typeof stat.value === 'number' ? stat.value : 0} duration={0.8} />
                {stat.suffix || ""}
              </p>
              <p className="text-[10px] text-muted-foreground">{stat.label}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Activity Heatmap */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <Calendar size={15} className="text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Atividade (últimos 28 dias)
            </h3>
          </div>
          <div className="grid grid-cols-7 gap-1.5">
            {heatmapData.map(({ date, count }) => {
              const isToday = isSameDay(date, new Date());
              return (
                <div
                  key={date.toISOString()}
                  title={`${format(date, "dd/MM")} — ${count} sessão(ões)`}
                  className={`aspect-square rounded-md flex items-center justify-center text-[8px] font-medium transition-colors ${
                    count >= 3
                      ? "bg-primary text-primary-foreground"
                      : count === 2
                        ? "bg-primary/60 text-primary-foreground"
                        : count === 1
                          ? "bg-primary/25 text-foreground"
                          : isToday
                            ? "bg-muted border border-border text-muted-foreground"
                            : "bg-muted/50 text-muted-foreground/40"
                  }`}
                >
                  {format(date, "dd")}
                </div>
              );
            })}
          </div>
          <div className="flex items-center justify-end gap-2 mt-2">
            <span className="text-[9px] text-muted-foreground">Menos</span>
            <div className="flex gap-1">
              <div className="w-3 h-3 rounded-sm bg-muted/50" />
              <div className="w-3 h-3 rounded-sm bg-primary/25" />
              <div className="w-3 h-3 rounded-sm bg-primary/60" />
              <div className="w-3 h-3 rounded-sm bg-primary" />
            </div>
            <span className="text-[9px] text-muted-foreground">Mais</span>
          </div>
        </Card>
      </motion.div>

      {/* Weekly Evolution Chart */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <Card className="p-4">
          <div className="flex items-center gap-2 mb-3">
            <TrendingUp size={15} className="text-primary" />
            <h3 className="text-sm font-semibold text-foreground">
              Evolução semanal
            </h3>
          </div>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={weeklyData}
                margin={{ top: 5, right: 5, left: -20, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorSessoes" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorMinutos" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="hsl(var(--info))" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="hsl(var(--info))" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  vertical={false}
                />
                <XAxis
                  dataKey="label"
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--card))",
                    border: "1px solid hsl(var(--border))",
                    borderRadius: "12px",
                    fontSize: "12px",
                  }}
                  labelStyle={{ color: "hsl(var(--foreground))", fontWeight: 600 }}
                />
                <Area
                  type="monotone"
                  dataKey="sessoes"
                  name="Sessões"
                  stroke="hsl(var(--primary))"
                  fill="url(#colorSessoes)"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="minutos"
                  name="Minutos"
                  stroke="hsl(var(--info))"
                  fill="url(#colorMinutos)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </motion.div>

      {/* Recent sessions */}
      <div>
        <h3 className="text-sm font-semibold text-foreground mb-3">
          Sessões recentes
        </h3>
        {sessoes.length === 0 ? (
          <Card className="p-6 text-center">
            <Trophy
              size={32}
              className="text-muted-foreground mx-auto mb-2"
            />
            <p className="text-sm text-muted-foreground">
              Nenhuma sessão registrada ainda
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Inicie um plano para começar!
            </p>
          </Card>
        ) : (
          <div className="space-y-2">
            {sessoes.slice(0, 10).map((sessao, i) => (
              <motion.div
                key={sessao.id}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
              >
                <Card className="p-3 flex items-center gap-3">
                  <div className="shrink-0 w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Activity size={18} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground">
                      {sessao.exercicios_completados} exercício
                      {sessao.exercicios_completados !== 1 ? "s" : ""}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {format(new Date(sessao.data), "dd/MM/yyyy 'às' HH:mm", {
                        locale: ptBR,
                      })}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-primary">
                      {Math.round(sessao.duracao_total_segundos / 60)}min
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
