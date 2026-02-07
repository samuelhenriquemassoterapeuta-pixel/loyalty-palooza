import { useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  ReferenceLine,
} from "recharts";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface MiniEvaChartProps {
  fichas: { data: string; escala_eva?: number | null }[];
  variants: Variants;
}

const evaConfig = [
  { min: 0, max: 0, label: "Sem dor", emoji: "😊", color: "hsl(142, 60%, 45%)" },
  { min: 1, max: 3, label: "Leve", emoji: "🙂", color: "hsl(80, 60%, 45%)" },
  { min: 4, max: 6, label: "Moderada", emoji: "😐", color: "hsl(45, 80%, 50%)" },
  { min: 7, max: 8, label: "Intensa", emoji: "😣", color: "hsl(25, 85%, 55%)" },
  { min: 9, max: 10, label: "Insuportável", emoji: "😫", color: "hsl(0, 70%, 50%)" },
];

const getEvaInfo = (v: number) =>
  evaConfig.find((e) => v >= e.min && v <= e.max) ?? evaConfig[0];

const MiniEvaTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  const value = payload[0].value as number;
  const info = getEvaInfo(value);
  return (
    <div className="bg-card/95 backdrop-blur-sm border border-border rounded-lg px-2 py-1 shadow-lg">
      <p className="text-[10px] text-muted-foreground">{label}</p>
      <p className="text-xs font-semibold text-foreground flex items-center gap-1">
        <span>{info.emoji}</span>
        {value}/10
        <span className="text-[10px] font-normal text-muted-foreground">
          {info.label}
        </span>
      </p>
    </div>
  );
};

export const MiniEvaChart = ({ fichas, variants }: MiniEvaChartProps) => {
  const data = useMemo(
    () =>
      fichas
        .filter((f) => f.escala_eva != null)
        .map((f) => ({
          date: format(new Date(f.data), "dd/MM", { locale: ptBR }),
          value: f.escala_eva as number,
        })),
    [fichas]
  );

  if (data.length < 2) return null;

  const lastValue = data[data.length - 1].value;
  const firstValue = data[0].value;
  const diff = lastValue - firstValue;
  const lastInfo = getEvaInfo(lastValue);
  const improving = diff < 0;

  return (
    <motion.div variants={variants} className="p-4 rounded-xl bg-card border border-border">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <span className="text-sm">{lastInfo.emoji}</span>
          <p className="text-xs font-medium text-muted-foreground">Evolução da Dor (EVA)</p>
        </div>
        <div className="flex items-center gap-1.5">
          {diff !== 0 && (
            <span
              className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                improving
                  ? "bg-highlight/15 text-highlight"
                  : "bg-destructive/15 text-destructive"
              }`}
            >
              {improving ? "↓" : "↑"} {Math.abs(diff)}pt
            </span>
          )}
          <p className="text-[10px] text-muted-foreground">{data.length} registros</p>
        </div>
      </div>
      <div className="h-28 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 4, right: 4, left: -8, bottom: 0 }}>
            <defs>
              <linearGradient id="evaGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="hsl(15, 80%, 55%)" stopOpacity={0.25} />
                <stop offset="100%" stopColor="hsl(15, 80%, 55%)" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <XAxis
              dataKey="date"
              tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              domain={[0, 10]}
              ticks={[0, 3, 6, 8, 10]}
              tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <ReferenceLine
              y={3}
              stroke="hsl(80, 60%, 45%)"
              strokeDasharray="3 3"
              strokeWidth={0.5}
              strokeOpacity={0.4}
            />
            <ReferenceLine
              y={6}
              stroke="hsl(45, 80%, 50%)"
              strokeDasharray="3 3"
              strokeWidth={0.5}
              strokeOpacity={0.4}
            />
            <Tooltip content={<MiniEvaTooltip />} />
            <Area
              type="monotone"
              dataKey="value"
              stroke="hsl(15, 80%, 55%)"
              strokeWidth={2}
              fill="url(#evaGradient)"
              dot={(props: any) => {
                const info = getEvaInfo(props.value);
                return (
                  <circle
                    cx={props.cx}
                    cy={props.cy}
                    r={3.5}
                    fill={info.color}
                    stroke="hsl(var(--card))"
                    strokeWidth={2}
                  />
                );
              }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
      {/* Pain zone legend */}
      <div className="flex items-center justify-center gap-3 mt-2">
        {evaConfig.slice(0, 4).map((zone) => (
          <div key={zone.label} className="flex items-center gap-1">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: zone.color }}
            />
            <span className="text-[9px] text-muted-foreground">{zone.label}</span>
          </div>
        ))}
      </div>
    </motion.div>
  );
};
