import { motion } from "framer-motion";
import {
  ArrowDown,
  ArrowUp,
  Minus,
  TrendingDown,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  GitCompareArrows,
  Calendar,
} from "lucide-react";
import type { AngleSeries } from "@/hooks/useAngleHistory";
import type { MeasurementSeries } from "./measurementSeriesUtils";

interface ComparisonItem {
  label: string;
  firstValue: number;
  lastValue: number;
  firstDate: string;
  lastDate: string;
  delta: number;
  /** For reference lines, closer to 0 is better. For angles, depends on context. */
  isReferenceLine: boolean;
  referenceAxis?: "vertical" | "horizontal";
  originalColor?: string;
}

function classifyChange(item: ComparisonItem): "improved" | "attention" | "stable" {
  const absDelta = Math.abs(item.delta);

  if (item.isReferenceLine) {
    // For reference lines, decreasing angle = improving alignment (closer to 0°)
    if (item.delta < -1) return "improved";
    if (item.delta > 2) return "attention";
    return "stable";
  }

  // For angle annotations, small changes are stable
  if (absDelta <= 2) return "stable";
  // Large deviations from first measurement are attention points
  if (absDelta > 5) return "attention";
  return "stable";
}

function StatusIcon({ status }: { status: "improved" | "attention" | "stable" }) {
  switch (status) {
    case "improved":
      return <CheckCircle2 size={14} className="text-green-500" />;
    case "attention":
      return <AlertTriangle size={14} className="text-amber-500" />;
    case "stable":
      return <Minus size={14} className="text-muted-foreground" />;
  }
}

function DeltaDisplay({ delta, status }: { delta: number; status: "improved" | "attention" | "stable" }) {
  const colorClass =
    status === "improved"
      ? "text-green-600 dark:text-green-400"
      : status === "attention"
      ? "text-amber-600 dark:text-amber-400"
      : "text-muted-foreground";

  const Icon = delta > 0 ? ArrowUp : delta < 0 ? ArrowDown : Minus;

  return (
    <span className={`flex items-center gap-0.5 text-xs font-bold ${colorClass}`}>
      <Icon size={12} />
      {delta > 0 ? "+" : ""}
      {delta}°
    </span>
  );
}

interface ComparativeSummaryProps {
  angleSeries: AngleSeries[];
  measurementSeries: MeasurementSeries[];
}

export function ComparativeSummary({ angleSeries, measurementSeries }: ComparativeSummaryProps) {
  // Build comparison items from angle series
  const items: ComparisonItem[] = [];

  for (const s of angleSeries) {
    if (s.points.length < 2) continue;
    const first = s.points[0];
    const last = s.points[s.points.length - 1];
    items.push({
      label: s.label,
      firstValue: first.angle,
      lastValue: last.angle,
      firstDate: first.dateLabel,
      lastDate: last.dateLabel,
      delta: last.angle - first.angle,
      isReferenceLine: false,
    });
  }

  for (const ms of measurementSeries) {
    if (ms.points.length < 2) continue;
    const first = ms.points[0];
    const last = ms.points[ms.points.length - 1];
    const delta = Math.round((last.angle - first.angle) * 10) / 10;
    items.push({
      label: ms.label,
      firstValue: first.angle,
      lastValue: last.angle,
      firstDate: first.dateLabel,
      lastDate: last.dateLabel,
      delta,
      isReferenceLine: true,
      referenceAxis: ms.referenceAxis,
      originalColor: ms.originalColor,
    });
  }

  if (items.length === 0) return null;

  const improved = items.filter((i) => classifyChange(i) === "improved");
  const attention = items.filter((i) => classifyChange(i) === "attention");
  const stable = items.filter((i) => classifyChange(i) === "stable");

  // Date range
  const allDates = items.map((i) => i.firstDate);
  const firstDate = allDates[0];
  const lastDate = items[0]?.lastDate;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: 0.1 }}
      className="space-y-3"
    >
      <div className="flex items-center gap-2">
        <GitCompareArrows size={16} className="text-primary" />
        <h4 className="text-sm font-bold text-foreground">Resumo Comparativo</h4>
        <span className="text-[10px] bg-muted text-muted-foreground px-1.5 py-0.5 rounded-full font-medium">
          1ª → Última
        </span>
      </div>

      {/* Date range info */}
      <div className="flex items-center gap-2 text-[10px] text-muted-foreground">
        <Calendar size={10} />
        <span>{firstDate} → {lastDate}</span>
        <span className="text-muted-foreground/50">·</span>
        <span>{items.length} {items.length === 1 ? "medição comparada" : "medições comparadas"}</span>
      </div>

      {/* Summary badges */}
      <div className="flex gap-2 flex-wrap">
        {improved.length > 0 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-green-500/10 border border-green-500/20">
            <TrendingDown size={12} className="text-green-500" />
            <span className="text-[11px] font-semibold text-green-600 dark:text-green-400">
              {improved.length} {improved.length === 1 ? "melhora" : "melhoras"}
            </span>
          </div>
        )}
        {stable.length > 0 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-muted border border-border">
            <Minus size={12} className="text-muted-foreground" />
            <span className="text-[11px] font-semibold text-muted-foreground">
              {stable.length} {stable.length === 1 ? "estável" : "estáveis"}
            </span>
          </div>
        )}
        {attention.length > 0 && (
          <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20">
            <TrendingUp size={12} className="text-amber-500" />
            <span className="text-[11px] font-semibold text-amber-600 dark:text-amber-400">
              {attention.length} {attention.length === 1 ? "atenção" : "atenções"}
            </span>
          </div>
        )}
      </div>

      {/* Detailed comparison rows */}
      <div className="rounded-xl bg-card border border-border overflow-hidden divide-y divide-border">
        {/* Improvements */}
        {improved.length > 0 && (
          <div className="p-3 space-y-2">
            <p className="text-[10px] font-semibold text-green-600 dark:text-green-400 uppercase tracking-wider flex items-center gap-1">
              <CheckCircle2 size={10} />
              Melhorias
            </p>
            {improved.map((item) => (
              <ComparisonRow key={item.label} item={item} />
            ))}
          </div>
        )}

        {/* Stable */}
        {stable.length > 0 && (
          <div className="p-3 space-y-2">
            <p className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Minus size={10} />
              Estáveis
            </p>
            {stable.map((item) => (
              <ComparisonRow key={item.label} item={item} />
            ))}
          </div>
        )}

        {/* Attention points */}
        {attention.length > 0 && (
          <div className="p-3 space-y-2">
            <p className="text-[10px] font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider flex items-center gap-1">
              <AlertTriangle size={10} />
              Pontos de Atenção
            </p>
            {attention.map((item) => (
              <ComparisonRow key={item.label} item={item} />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

function ComparisonRow({ item }: { item: ComparisonItem }) {
  const status = classifyChange(item);

  return (
    <div className="flex items-center gap-2">
      <StatusIcon status={status} />
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-1.5">
          {item.originalColor && (
            <div
              className="w-2 h-2 rounded-full shrink-0"
              style={{ backgroundColor: item.originalColor }}
            />
          )}
          <span className="text-xs font-medium text-foreground truncate">{item.label}</span>
          {item.isReferenceLine && item.referenceAxis && (
            <span className="text-[8px] bg-muted text-muted-foreground px-1 py-0.5 rounded shrink-0">
              {item.referenceAxis === "vertical" ? "Vert." : "Horiz."}
            </span>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3 shrink-0">
        <span className="text-[10px] text-muted-foreground">
          {item.firstValue}° → {item.lastValue}°
        </span>
        <DeltaDisplay delta={item.delta} status={status} />
      </div>
    </div>
  );
}
