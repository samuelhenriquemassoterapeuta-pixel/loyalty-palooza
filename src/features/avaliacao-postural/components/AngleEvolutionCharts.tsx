import { useCallback } from "react";
import { motion } from "framer-motion";
import { TrendingUp, BarChart3, Download, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAngleHistory, AngleSeries } from "@/features/avaliacao-postural/hooks/useAngleHistory";
import { useMeasurementHistory } from "@/features/protocolos/hooks/useMeasurementHistory";
import { useClinicalCsvData } from "@/features/protocolos/hooks/useClinicalCsvData";
import { toast } from "sonner";

import { AngleChart } from "./charts/AngleChart";
import { MeasurementChart } from "./charts/MeasurementChart";
import { ComparativeSummary } from "./charts/ComparativeSummary";
import { buildMeasurementSeries } from "./charts/measurementSeriesUtils";
import { buildCsvContent } from "./charts/buildCsvContent";

const COLORS = [
  "hsl(var(--primary))",
  "hsl(142, 60%, 45%)",
  "hsl(38, 90%, 50%)",
  "hsl(350, 70%, 50%)",
  "hsl(220, 70%, 55%)",
  "hsl(280, 60%, 55%)",
];

export const AngleEvolutionCharts = () => {
  const { data: series = [], isLoading } = useAngleHistory();
  const { data: measurements = [], isLoading: isMeasLoading } = useMeasurementHistory();
  const { data: clinicalData, isLoading: isClinicalLoading } = useClinicalCsvData();

  const measurementSeries = buildMeasurementSeries(measurements);

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

  const hasAngleData = series.length > 0;
  const hasMeasurementData = measurementSeries.length > 0;
  const hasClinicalData = (clinicalData?.observacoes?.length ?? 0) > 0 || (clinicalData?.fichas?.length ?? 0) > 0 || (clinicalData?.metas?.length ?? 0) > 0;
  const hasAnyData = hasAngleData || hasMeasurementData || hasClinicalData;

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

  if (!hasAnyData) {
    return (
      <div className="p-6 rounded-xl bg-card border border-border text-center">
        <BarChart3 size={32} className="mx-auto mb-3 text-muted-foreground/30" />
        <h4 className="text-sm font-semibold text-foreground mb-1">Sem dados de evolução</h4>
        <p className="text-xs text-muted-foreground">
          Adicione anotações de ângulo ou linhas de referência nas suas avaliações posturais para visualizar a evolução ao longo do tempo
        </p>
      </div>
    );
  }

  // Group angle series by vista
  const vistaGroups = new Map<string, AngleSeries[]>();
  for (const s of series) {
    const group = vistaGroups.get(s.vistaLabel) || [];
    group.push(s);
    vistaGroups.set(s.vistaLabel, group);
  }

  // Group measurement series by vista
  const measVistaGroups = new Map<string, typeof measurementSeries>();
  for (const ms of measurementSeries) {
    const group = measVistaGroups.get(ms.vista) || [];
    group.push(ms);
    measVistaGroups.set(ms.vista, group);
  }

  const totalCharts = series.length + measurementSeries.length;

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
          <h3 className="text-base font-bold text-foreground">Evolução & Dados Clínicos</h3>
          {totalCharts > 0 && (
            <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">
              {totalCharts} {totalCharts === 1 ? "medição" : "medições"}
            </span>
          )}
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
        {hasAngleData || hasMeasurementData
          ? "Acompanhe como seus ângulos e alinhamentos posturais estão evoluindo entre as avaliações"
          : "Exporte seus dados clínicos e fichas de acompanhamento em CSV"}
      </p>

      {!hasAngleData && !hasMeasurementData && hasClinicalData && (
        <div className="p-4 rounded-xl bg-card border border-border text-center">
          <BarChart3 size={24} className="mx-auto mb-2 text-muted-foreground/40" />
          <p className="text-xs text-muted-foreground">
            Sem dados de ângulos ainda — adicione anotações de ângulo para visualizar gráficos.
            Seus dados clínicos ({clinicalData!.observacoes.length} observação(ões), {clinicalData!.fichas.length} ficha(s), {clinicalData!.metas.length} meta(s)) estão disponíveis no CSV.
          </p>
        </div>
      )}

      {/* Angle annotation charts */}
      {hasAngleData && (
        <div className="space-y-3">
          {Array.from(vistaGroups.entries()).map(([vistaLabel, groupSeries]) => (
            <div key={vistaLabel} className="space-y-2">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1">
                📐 {vistaLabel} — Ângulos
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
        </div>
      )}

      {/* Measurement reference line charts */}
      {hasMeasurementData && (
        <div className="space-y-3">
          <div className="flex items-center gap-2 pt-1">
            <Ruler size={14} className="text-primary" />
            <span className="text-xs font-semibold text-foreground">Linhas de Referência</span>
            <span className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded-full font-medium">
              {measurementSeries.length} {measurementSeries.length === 1 ? "medição" : "medições"}
            </span>
          </div>
          {Array.from(measVistaGroups.entries()).map(([vista, groupSeries]) => (
            <div key={vista} className="space-y-2">
              <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1">
                📏 {vista}
              </p>
              {groupSeries.map((ms, idx) => (
                <MeasurementChart
                  key={ms.label}
                  series={ms}
                  color={COLORS[idx % COLORS.length]}
                />
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Comparative summary */}
      <ComparativeSummary
        angleSeries={series}
        measurementSeries={measurementSeries}
      />
    </motion.div>
  );
};
