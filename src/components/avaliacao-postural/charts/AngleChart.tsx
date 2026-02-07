import { Activity } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts";
import { TrendBadge } from "./TrendBadge";
import type { AngleSeries } from "@/hooks/useAngleHistory";

interface AngleChartProps {
  series: AngleSeries;
  color: string;
}

export function AngleChart({ series, color }: AngleChartProps) {
  const data = series.points.map((p) => ({
    name: p.dateLabel,
    angle: p.angle,
  }));

  const lastAngle = data[data.length - 1]?.angle ?? 0;

  return (
    <div className="p-4 rounded-xl bg-card border border-border space-y-3">
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: color }} />
          <span className="text-sm font-semibold text-foreground truncate">{series.label}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <TrendBadge points={series.points} />
          <span className="text-lg font-bold text-foreground">{lastAngle}°</span>
        </div>
      </div>

      {data.length >= 2 ? (
        <ResponsiveContainer width="100%" height={140}>
          <LineChart data={data} margin={{ top: 4, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" opacity={0.5} />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
              axisLine={false}
              tickLine={false}
              domain={["dataMin - 5", "dataMax + 5"]}
              tickFormatter={(v) => `${v}°`}
            />
            <Tooltip
              contentStyle={{
                background: "hsl(var(--card))",
                border: "1px solid hsl(var(--border))",
                borderRadius: "8px",
                fontSize: "12px",
              }}
              formatter={(value: number) => [`${value}°`, "Ângulo"]}
            />
            <ReferenceLine y={180} stroke="hsl(var(--muted-foreground))" strokeDasharray="6 3" opacity={0.3} />
            <Line
              type="monotone"
              dataKey="angle"
              stroke={color}
              strokeWidth={2.5}
              dot={{ fill: color, r: 4, strokeWidth: 2, stroke: "hsl(var(--card))" }}
              activeDot={{ r: 6, strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <div className="h-[100px] flex items-center justify-center text-muted-foreground text-xs">
          <Activity size={14} className="mr-1.5 opacity-40" />
          Uma única medição — mais dados aparecerão aqui
        </div>
      )}

      {data.length >= 2 && (
        <div className="flex items-center gap-4 text-[10px] text-muted-foreground">
          <span>Mín: {Math.min(...data.map((d) => d.angle))}°</span>
          <span>Máx: {Math.max(...data.map((d) => d.angle))}°</span>
          <span>
            Média:{" "}
            {Math.round(data.reduce((s, d) => s + d.angle, 0) / data.length)}°
          </span>
        </div>
      )}
    </div>
  );
}
