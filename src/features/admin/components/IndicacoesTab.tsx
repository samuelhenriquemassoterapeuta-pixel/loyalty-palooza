import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  Users,
  UserCheck,
  Clock,
  TrendingUp,
  DollarSign,
  ArrowRight,
  Percent,
  Calendar as CalendarIcon,
} from "lucide-react";
import { format, subDays, subMonths, startOfDay, isAfter } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

interface IndicacaoComNomes {
  id: string;
  indicador_id: string;
  indicado_id: string;
  cashback_valor: number;
  status: string;
  created_at: string;
  processado_at: string | null;
  indicador_nome: string | null;
  indicado_nome: string | null;
}

type PeriodFilter = "all" | "7d" | "30d" | "90d";

const PERIOD_OPTIONS: { value: PeriodFilter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "7d", label: "7 dias" },
  { value: "30d", label: "30 dias" },
  { value: "90d", label: "90 dias" },
];

const getFilterDate = (period: PeriodFilter): Date | null => {
  const now = new Date();
  switch (period) {
    case "7d": return startOfDay(subDays(now, 7));
    case "30d": return startOfDay(subMonths(now, 1));
    case "90d": return startOfDay(subMonths(now, 3));
    default: return null;
  }
};

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.06, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const listItemVariants = {
  hidden: { opacity: 0, x: -12 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.04, duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export const IndicacoesTab = () => {
  const [period, setPeriod] = useState<PeriodFilter>("all");

  const { data: allIndicacoes = [], isLoading } = useQuery({
    queryKey: ["admin-indicacoes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("indicacoes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;

      const userIds = [
        ...new Set(data.flatMap((i) => [i.indicador_id, i.indicado_id])),
      ];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, nome")
        .in("id", userIds);

      const profileMap = new Map(
        (profiles || []).map((p) => [p.id, p.nome])
      );

      return data.map((i) => ({
        ...i,
        indicador_nome: profileMap.get(i.indicador_id) || "Desconhecido",
        indicado_nome: profileMap.get(i.indicado_id) || "Desconhecido",
      })) as IndicacaoComNomes[];
    },
  });

  const indicacoes = useMemo(() => {
    const filterDate = getFilterDate(period);
    if (!filterDate) return allIndicacoes;
    return allIndicacoes.filter((i) =>
      isAfter(new Date(i.created_at), filterDate)
    );
  }, [allIndicacoes, period]);

  const stats = useMemo(() => {
    const total = indicacoes.length;
    const convertidas = indicacoes.filter((i) => i.status === "processado").length;
    const pendentes = indicacoes.filter((i) => i.status === "pendente").length;
    const taxaConversao = total > 0 ? (convertidas / total) * 100 : 0;
    const totalCashback = indicacoes
      .filter((i) => i.status === "processado")
      .reduce((acc, i) => acc + Number(i.cashback_valor), 0);
    const ticketMedio = convertidas > 0 ? totalCashback / convertidas : 0;

    const indicadorCount = new Map<string, { nome: string; count: number; convertidos: number }>();
    indicacoes.forEach((i) => {
      const existing = indicadorCount.get(i.indicador_id) || {
        nome: i.indicador_nome || "Desconhecido",
        count: 0,
        convertidos: 0,
      };
      existing.count++;
      if (i.status === "processado") existing.convertidos++;
      indicadorCount.set(i.indicador_id, existing);
    });
    const topIndicadores = [...indicadorCount.values()]
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    const monthlyData = new Map<string, { month: string; total: number; convertidas: number }>();
    indicacoes.forEach((i) => {
      const month = format(new Date(i.created_at), "MMM/yy", { locale: ptBR });
      const existing = monthlyData.get(month) || { month, total: 0, convertidas: 0 };
      existing.total++;
      if (i.status === "processado") existing.convertidas++;
      monthlyData.set(month, existing);
    });

    return {
      total,
      convertidas,
      pendentes,
      taxaConversao,
      totalCashback,
      ticketMedio,
      topIndicadores,
      monthlyData: [...monthlyData.values()].reverse().slice(-6).reverse(),
    };
  }, [indicacoes]);

  const pieData = [
    { name: "Convertidas", value: stats.convertidas, color: "hsl(var(--highlight))" },
    { name: "Pendentes", value: stats.pendentes, color: "hsl(var(--warning))" },
  ].filter((d) => d.value > 0);

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="h-64 rounded-2xl" />
      </div>
    );
  }

  const statsCards = [
    {
      icon: Users,
      label: "Total Indicações",
      value: String(stats.total),
      colorClass: "text-muted-foreground",
      valueClass: "text-foreground",
      bgClass: "",
    },
    {
      icon: Percent,
      label: "Taxa Conversão",
      value: `${stats.taxaConversao.toFixed(1)}%`,
      sub: `${stats.convertidas} de ${stats.total}`,
      colorClass: "text-highlight",
      valueClass: "text-highlight",
      bgClass: "bg-highlight/5",
    },
    {
      icon: DollarSign,
      label: "Cashback Gerado",
      value: formatCurrency(stats.totalCashback),
      colorClass: "text-primary",
      valueClass: "text-primary",
      bgClass: "bg-primary/5",
    },
    {
      icon: Clock,
      label: "Pendentes",
      value: String(stats.pendentes),
      sub: "aguardando 1ª compra",
      colorClass: "text-warning",
      valueClass: "text-warning",
      bgClass: "bg-warning/5",
    },
  ];

  return (
    <div className="space-y-5">
      {/* Period Filter */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-2 overflow-x-auto pb-1"
      >
        <CalendarIcon size={14} className="text-muted-foreground shrink-0" />
        {PERIOD_OPTIONS.map((opt) => (
          <Button
            key={opt.value}
            size="sm"
            variant={period === opt.value ? "default" : "outline"}
            className={`text-xs h-8 px-3 whitespace-nowrap transition-all duration-200 ${
              period === opt.value ? "shadow-sm scale-105" : "hover:scale-105"
            }`}
            onClick={() => setPeriod(opt.value)}
          >
            {opt.label}
          </Button>
        ))}
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-3">
        {statsCards.map((card, i) => (
          <motion.div
            key={card.label}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className={`p-4 space-y-1 hover-lift cursor-default ${card.bgClass}`}>
              <div className={`flex items-center gap-2 ${card.colorClass}`}>
                <card.icon size={16} />
                <span className="text-xs">{card.label}</span>
              </div>
              <p className={`text-2xl font-bold ${card.valueClass}`}>
                {card.label === "Cashback Gerado" ? (
                  <span className="text-xl">{card.value}</span>
                ) : (
                  card.value
                )}
              </p>
              {card.sub && (
                <p className="text-[10px] text-muted-foreground">{card.sub}</p>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Monthly Chart */}
        {stats.monthlyData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-4">
              <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                <TrendingUp size={16} />
                Indicações por Mês
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <BarChart data={stats.monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                  />
                  <YAxis
                    tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                    allowDecimals={false}
                  />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                  <Bar dataKey="total" name="Total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="convertidas" name="Convertidas" fill="hsl(var(--highlight))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        )}

        {/* Pie Chart */}
        {pieData.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35 }}
          >
            <Card className="p-4">
              <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
                <UserCheck size={16} />
                Status das Indicações
              </h3>
              <ResponsiveContainer width="100%" height={180}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={45}
                    outerRadius={70}
                    paddingAngle={4}
                    dataKey="value"
                    label={({ name, percent }) =>
                      `${name} ${(percent * 100).toFixed(0)}%`
                    }
                    labelLine={false}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: "8px",
                      fontSize: "12px",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </Card>
          </motion.div>
        )}
      </div>

      {/* Top Indicadores */}
      {stats.topIndicadores.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-4">
            <h3 className="font-semibold text-sm text-foreground mb-3 flex items-center gap-2">
              <Users size={16} />
              Top Indicadores
            </h3>
            <div className="space-y-3">
              {stats.topIndicadores.map((ind, i) => (
                <motion.div
                  key={i}
                  custom={i}
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center justify-between group"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-muted-foreground w-5">
                      #{i + 1}
                    </span>
                    <span className="text-sm font-medium text-foreground truncate max-w-[150px] group-hover:text-primary transition-colors duration-200">
                      {ind.nome}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary" className="text-[10px]">
                      {ind.count} indicações
                    </Badge>
                    <Badge variant="outline" className="text-[10px] text-highlight border-highlight/30">
                      {ind.convertidos} convertidas
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>
      )}

      {/* List */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45 }}
      >
        <Card className="p-4">
          <h3 className="font-semibold text-sm text-foreground mb-3">
            Histórico de Indicações ({indicacoes.length})
          </h3>
          {indicacoes.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">
              Nenhuma indicação registrada ainda.
            </p>
          ) : (
            <div className="space-y-3">
              {indicacoes.map((ind, i) => (
                <motion.div
                  key={ind.id}
                  custom={i}
                  variants={listItemVariants}
                  initial="hidden"
                  animate="visible"
                  className="flex items-center gap-3 p-3 rounded-xl bg-muted/30 hover:bg-muted/50 transition-colors duration-200"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 text-sm">
                      <span className="font-medium text-foreground truncate max-w-[100px]">
                        {ind.indicador_nome}
                      </span>
                      <ArrowRight size={12} className="text-muted-foreground shrink-0" />
                      <span className="text-muted-foreground truncate max-w-[100px]">
                        {ind.indicado_nome}
                      </span>
                    </div>
                    <p className="text-[10px] text-muted-foreground mt-0.5">
                      {format(new Date(ind.created_at), "dd MMM yyyy, HH:mm", {
                        locale: ptBR,
                      })}
                      {ind.processado_at &&
                        ` • Convertida em ${format(new Date(ind.processado_at), "dd MMM", { locale: ptBR })}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <Badge
                      variant={ind.status === "processado" ? "default" : "secondary"}
                      className={`text-[10px] ${
                        ind.status === "processado"
                          ? "bg-highlight/20 text-highlight border-highlight/30"
                          : "bg-warning/20 text-warning border-warning/30"
                      }`}
                    >
                      {ind.status === "processado" ? "Convertida" : "Pendente"}
                    </Badge>
                    {ind.status === "processado" && (
                      <span className="text-xs font-bold text-highlight">
                        {formatCurrency(ind.cashback_valor)}
                      </span>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </Card>
      </motion.div>
    </div>
  );
};
