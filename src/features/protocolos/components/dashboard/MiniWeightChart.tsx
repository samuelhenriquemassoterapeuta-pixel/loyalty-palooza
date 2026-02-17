import { useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MiniWeightChartProps {
  fichas: { data: string; peso?: number | null }[];
  variants: Variants;
}

const MiniTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg px-2 py-1 shadow-lg">
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="text-xs font-semibold text-foreground">{payload[0].value}kg</p>
    </div>
  );
};

export const MiniWeightChart = ({ fichas, variants }: MiniWeightChartProps) => {
  const data = useMemo(
    () =>
      fichas
        .filter((f) => f.peso != null)
        .map((f) => ({
          date: format(new Date(f.data), "dd/MM", { locale: ptBR }),
          value: f.peso as number,
        })),
    [fichas]
  );

  if (data.length < 2) return null;

  return (
    <motion.div variants={variants} className="p-4 rounded-xl bg-card border border-border">
      <div className="flex items-center justify-between mb-2">
        <p className="text-xs font-medium text-muted-foreground">Evolução do Peso</p>
        <p className="text-[10px] text-muted-foreground">{data.length} registros</p>
      </div>
      <div className="h-24 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
            <defs>
              <linearGradient id="dashGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0.05} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<MiniTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              fill="url(#dashGradient)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
};
