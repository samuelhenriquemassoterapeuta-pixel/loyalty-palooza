import { useMemo, useState } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { format, subDays, subMonths, startOfDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Transacao } from "@/features/cashback/hooks/useTransacoes";
import { RESINKS_SYMBOL } from "@/lib/resinks";

type PeriodKey = "30d" | "3m" | "6m";

const PERIOD_OPTIONS: { key: PeriodKey; label: string }[] = [
  { key: "30d", label: "30 dias" },
  { key: "3m", label: "3 meses" },
  { key: "6m", label: "6 meses" },
];

const getStartDate = (period: PeriodKey): Date => {
  const now = new Date();
  switch (period) {
    case "30d": return startOfDay(subDays(now, 29));
    case "3m": return startOfDay(subMonths(now, 3));
    case "6m": return startOfDay(subMonths(now, 6));
  }
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-card border border-border p-3 shadow-elevated text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} style={{ color: entry.color }}>
          {entry.name}: {RESINKS_SYMBOL} {Number(entry.value).toFixed(2).replace(".", ",")}
        </p>
      ))}
    </div>
  );
};

interface CashbackEvolutionChartProps {
  transacoes: Transacao[];
}

export const CashbackEvolutionChart = ({ transacoes }: CashbackEvolutionChartProps) => {
  const [period, setPeriod] = useState<PeriodKey>("30d");

  const chartData = useMemo(() => {
    const startDate = getStartDate(period);
    const now = new Date();
    const days = Math.ceil((now.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    const cashbackTx = transacoes.filter(
      (t) => (t.tipo === "cashback" || t.tipo === "uso_cashback") && new Date(t.created_at) >= startDate
    );

    const dailyData: { date: Date; ganho: number; usado: number }[] = [];
    for (let i = days; i >= 0; i--) {
      const day = startOfDay(subDays(now, i));
      const nextDay = startOfDay(subDays(now, i - 1));

      const ganho = cashbackTx
        .filter((t) => t.tipo === "cashback" && new Date(t.created_at) >= day && new Date(t.created_at) < nextDay)
        .reduce((acc, t) => acc + Number(t.valor), 0);

      const usado = Math.abs(
        cashbackTx
          .filter((t) => t.tipo === "uso_cashback" && new Date(t.created_at) >= day && new Date(t.created_at) < nextDay)
          .reduce((acc, t) => acc + Number(t.valor), 0)
      );

      dailyData.push({ date: day, ganho, usado });
    }

    const bucketSize = period === "30d" ? 1 : period === "3m" ? 7 : 14;
    const aggregated = [];
    let saldoAcumulado = 0;

    for (let i = 0; i < dailyData.length; i += bucketSize) {
      const slice = dailyData.slice(i, i + bucketSize);
      const ganho = slice.reduce((s, d) => s + d.ganho, 0);
      const usado = slice.reduce((s, d) => s + d.usado, 0);
      saldoAcumulado += ganho - usado;

      const label = bucketSize === 1
        ? format(slice[0].date, "dd/MM", { locale: ptBR })
        : `${format(slice[0].date, "dd/MM", { locale: ptBR })}`;

      aggregated.push({
        label,
        ganho: Math.round(ganho * 100) / 100,
        usado: Math.round(usado * 100) / 100,
        saldo: Math.round(saldoAcumulado * 100) / 100,
      });
    }

    return aggregated;
  }, [transacoes, period]);

  const periodTitle =
    period === "30d" ? "Últimos 30 Dias" : period === "3m" ? "Últimos 3 Meses" : "Últimos 6 Meses";

  return (
    <Card className="p-4">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
        <h3 className="font-semibold text-foreground flex items-center gap-2 text-sm">
          <TrendingUp size={18} className="text-primary" />
          Evolução — {periodTitle}
        </h3>
        <div className="flex gap-1 bg-muted/50 rounded-lg p-0.5">
          {PERIOD_OPTIONS.map((opt) => (
            <button
              key={opt.key}
              onClick={() => setPeriod(opt.key)}
              className={`px-3 py-1 rounded-md text-xs font-medium transition-all ${
                period === opt.key
                  ? "bg-primary text-primary-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div className="h-56">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
            <defs>
              <linearGradient id="gradSaldo" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(78, 55%, 28%)" stopOpacity={0.35} />
                <stop offset="95%" stopColor="hsl(78, 55%, 28%)" stopOpacity={0} />
              </linearGradient>
              <linearGradient id="gradGanho" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(140, 50%, 38%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(140, 50%, 38%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(45, 25%, 82%)" />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 10, fill: "hsl(75, 20%, 40%)" }}
              axisLine={false}
              tickLine={false}
              interval="preserveStartEnd"
            />
            <YAxis
              tick={{ fontSize: 10, fill: "hsl(75, 20%, 40%)" }}
              axisLine={false}
              tickLine={false}
              tickFormatter={(v) => `${RESINKS_SYMBOL} ${v}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="saldo"
              name="Saldo acumulado"
              stroke="hsl(78, 55%, 28%)"
              strokeWidth={2.5}
              fill="url(#gradSaldo)"
            />
            <Area
              type="monotone"
              dataKey="ganho"
              name="Resinks ganhos"
              stroke="hsl(140, 50%, 38%)"
              strokeWidth={1.5}
              fill="url(#gradGanho)"
              strokeDasharray="4 4"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
};
