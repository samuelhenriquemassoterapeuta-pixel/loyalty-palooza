import { useCallback } from "react";
import { motion } from "framer-motion";
import { TrendingUp, Activity, BarChart3, Download } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { useAngleHistory, AngleSeries } from "@/hooks/useAngleHistory";
import { useMeasurementHistory } from "@/hooks/useMeasurementHistory";
import { useClinicalCsvData, type ClinicalCsvData } from "@/hooks/useClinicalCsvData";
import { toast } from "sonner";

const COLORS = [
  "hsl(var(--primary))",
  "hsl(142, 60%, 45%)",
  "hsl(38, 90%, 50%)",
  "hsl(350, 70%, 50%)",
  "hsl(220, 70%, 55%)",
  "hsl(280, 60%, 55%)",
];

function TrendBadge({ points }: { points: AngleSeries["points"] }) {
  if (points.length < 2) return null;
  const first = points[0].angle;
  const last = points[points.length - 1].angle;
  const diff = last - first;
  const improved = Math.abs(diff) <= 2;
  const worsened = diff > 5;

  return (
    <span
      className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
        improved
          ? "bg-green-500/10 text-green-600 dark:text-green-400"
          : worsened
          ? "bg-red-500/10 text-red-600 dark:text-red-400"
          : "bg-yellow-500/10 text-yellow-600 dark:text-yellow-400"
      }`}
    >
      {diff > 0 ? "+" : ""}
      {diff}°
    </span>
  );
}

function AngleChart({ series, color }: { series: AngleSeries; color: string }) {
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

function buildCsvContent(
  angleSeries: AngleSeries[],
  measurements: import("@/hooks/useMeasurementHistory").MeasurementDataPoint[],
  clinicalData?: ClinicalCsvData
): string {
  const BOM = "\uFEFF";
  const lines: string[] = [];

  // Angle annotations section
  if (angleSeries.length > 0) {
    lines.push("EVOLUÇÃO ANGULAR - ANOTAÇÕES");
    lines.push("Vista,Medição,Data,Ângulo (°)");
    for (const s of angleSeries) {
      for (const p of s.points) {
        lines.push(`${s.vistaLabel},"${s.label}",${p.dateLabel},${p.angle}`);
      }
    }
    lines.push("");
  }

  // Reference line measurements section
  if (measurements.length > 0) {
    lines.push("MEDIÇÕES DE LINHAS DE REFERÊNCIA");
    lines.push("Vista,Medição,Data,Ângulo (°),Eixo de Referência");
    for (const m of measurements) {
      lines.push(
        `${m.vista},"${m.label}",${m.dateLabel},${m.angle},${m.referenceAxis === "vertical" ? "Vertical" : "Horizontal"}`
      );
    }
    lines.push("");
  }

  // Clinical observations section
  if (clinicalData?.observacoes && clinicalData.observacoes.length > 0) {
    lines.push("OBSERVAÇÕES CLÍNICAS - AVALIAÇÕES POSTURAIS");
    lines.push("Data,Observações");
    for (const obs of clinicalData.observacoes) {
      const escaped = obs.observacoes.replace(/"/g, '""').replace(/\n/g, " ");
      lines.push(`${obs.dateLabel},"${escaped}"`);
    }
    lines.push("");
  }

  // Fichas de acompanhamento section
  if (clinicalData?.fichas && clinicalData.fichas.length > 0) {
    lines.push("FICHAS DE ACOMPANHAMENTO - PROTOCOLOS");
    lines.push("Data,Protocolo,Peso (kg),IMC,Gordura (%),Cintura (cm),Quadril (cm),Braço (cm),Coxa (cm),Tórax (cm),EVA (0-10),Observações");
    for (const f of clinicalData.fichas) {
      const obsEscaped = f.observacoes ? f.observacoes.replace(/"/g, '""').replace(/\n/g, " ") : "";
      lines.push(
        [
          f.dateLabel,
          `"${f.protocolo}"`,
          f.peso ?? "",
          f.imc ?? "",
          f.gordura_corporal ?? "",
          f.medida_cintura ?? "",
          f.medida_quadril ?? "",
          f.medida_braco ?? "",
          f.medida_coxa ?? "",
          f.medida_torax ?? "",
          f.escala_eva ?? "",
          `"${obsEscaped}"`,
        ].join(",")
      );
    }
    lines.push("");
  }

  // Summary statistics
  lines.push("RESUMO ESTATÍSTICO");
  lines.push("Medição,Mínimo (°),Máximo (°),Média (°),Variação Total (°)");

  for (const s of angleSeries) {
    if (s.points.length < 2) continue;
    const angles = s.points.map((p) => p.angle);
    const min = Math.min(...angles);
    const max = Math.max(...angles);
    const avg = Math.round(angles.reduce((a, b) => a + b, 0) / angles.length);
    const delta = angles[angles.length - 1] - angles[0];
    lines.push(`"${s.label}",${min},${max},${avg},${delta > 0 ? "+" : ""}${delta}`);
  }

  // Group measurements by label for stats
  const measByLabel = new Map<string, number[]>();
  for (const m of measurements) {
    const key = `${m.vista} — ${m.label}`;
    if (!measByLabel.has(key)) measByLabel.set(key, []);
    measByLabel.get(key)!.push(m.angle);
  }
  for (const [label, angles] of measByLabel) {
    if (angles.length < 2) continue;
    const min = Math.min(...angles);
    const max = Math.max(...angles);
    const avg = Math.round((angles.reduce((a, b) => a + b, 0) / angles.length) * 10) / 10;
    const delta = Math.round((angles[angles.length - 1] - angles[0]) * 10) / 10;
    lines.push(`"${label}",${min},${max},${avg},${delta > 0 ? "+" : ""}${delta}`);
  }

  return BOM + lines.join("\n");
}

export const AngleEvolutionCharts = () => {
  const { data: series = [], isLoading } = useAngleHistory();
  const { data: measurements = [], isLoading: isMeasLoading } = useMeasurementHistory();
  const { data: clinicalData, isLoading: isClinicalLoading } = useClinicalCsvData();

  const handleExportCsv = useCallback(() => {
    const csv = buildCsvContent(series, measurements, clinicalData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const today = new Date();
    a.download = `evolucao-postural-${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, "0")}-${String(today.getDate()).padStart(2, "0")}.csv`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    toast.success("CSV exportado com sucesso!");
  }, [series, measurements, clinicalData]);

  const hasData = series.length > 0 || measurements.length > 0;

  if (isLoading || isMeasLoading || isClinicalLoading) {
    return (
      <div className="space-y-3">
        <div className="flex items-center gap-2 mb-1">
          <BarChart3 size={16} className="text-primary" />
          <span className="text-sm font-semibold text-foreground">Evolução Angular</span>
        </div>
        {[1, 2].map((i) => (
          <div key={i} className="h-[180px] rounded-xl bg-card border border-border animate-pulse" />
        ))}
      </div>
    );
  }

  if (!hasData) {
    return (
      <div className="p-6 rounded-xl bg-card border border-border text-center">
        <BarChart3 size={32} className="mx-auto mb-3 text-muted-foreground/30" />
        <h4 className="text-sm font-semibold text-foreground mb-1">Sem dados de ângulos</h4>
        <p className="text-xs text-muted-foreground">
          Adicione anotações de ângulo nas suas avaliações posturais para visualizar a evolução ao longo do tempo
        </p>
      </div>
    );
  }

  // Group series by vista for organized display
  const vistaGroups = new Map<string, AngleSeries[]>();
  for (const s of series) {
    const group = vistaGroups.get(s.vistaLabel) || [];
    group.push(s);
    vistaGroups.set(s.vistaLabel, group);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="space-y-4"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <TrendingUp size={18} className="text-primary" />
          <h3 className="text-base font-bold text-foreground">Evolução Angular</h3>
          <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">
            {series.length + (measurements.length > 0 ? 1 : 0)} {series.length === 1 ? "medição" : "medições"}
          </span>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={handleExportCsv}
          className="gap-1.5 text-xs h-8"
        >
          <Download size={14} />
          CSV
        </Button>
      </div>

      <p className="text-xs text-muted-foreground -mt-2">
        Acompanhe como seus ângulos posturais estão evoluindo entre as avaliações
      </p>

      {Array.from(vistaGroups.entries()).map(([vistaLabel, groupSeries]) => (
        <div key={vistaLabel} className="space-y-2">
          <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1">
            {vistaLabel}
          </p>
          {groupSeries.map((s, idx) => (
            <AngleChart
              key={s.label}
              series={s}
              color={COLORS[idx % COLORS.length]}
            />
          ))}
        </div>
      ))}
    </motion.div>
  );
};
