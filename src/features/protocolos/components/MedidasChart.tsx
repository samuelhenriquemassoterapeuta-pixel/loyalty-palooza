import { useCallback, useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TrendingUp, BarChart3, Layers, Target, X, Check } from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
  Legend,
} from "recharts";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Input } from "@/components/ui/input";

interface Ficha {
  id: string;
  data: string;
  peso?: number | null;
  medida_cintura?: number | null;
  medida_quadril?: number | null;
  medida_braco?: number | null;
  medida_coxa?: number | null;
  medida_torax?: number | null;
  gordura_corporal?: number | null;
  imc?: number | null;
  escala_eva?: number | null;
}

interface MedidasChartProps {
  fichas: Ficha[];
  protocoloUsuarioId?: string;
}

type MetricKey =
  | "peso"
  | "medida_cintura"
  | "medida_quadril"
  | "medida_braco"
  | "medida_coxa"
  | "medida_torax"
  | "gordura_corporal"
  | "imc"
  | "escala_eva";

const METRICS: { key: MetricKey; label: string; suffix: string; color: string }[] = [
  { key: "peso", label: "Peso", suffix: "kg", color: "hsl(var(--primary))" },
  { key: "medida_cintura", label: "Cintura", suffix: "cm", color: "hsl(var(--highlight))" },
  { key: "medida_quadril", label: "Quadril", suffix: "cm", color: "hsl(var(--accent))" },
  { key: "medida_braco", label: "Braço", suffix: "cm", color: "hsl(25, 85%, 55%)" },
  { key: "medida_coxa", label: "Coxa", suffix: "cm", color: "hsl(280, 65%, 55%)" },
  { key: "medida_torax", label: "Tórax", suffix: "cm", color: "hsl(200, 75%, 50%)" },
  { key: "gordura_corporal", label: "Gordura", suffix: "%", color: "hsl(340, 70%, 55%)" },
  { key: "imc", label: "IMC", suffix: "", color: "hsl(160, 60%, 45%)" },
  { key: "escala_eva", label: "Dor (EVA)", suffix: "/10", color: "hsl(15, 80%, 55%)" },
];

type ChartMode = "single" | "compare";

const evaEmoji = (v: number) => {
  if (v === 0) return "😊";
  if (v <= 3) return "🙂";
  if (v <= 6) return "😐";
  if (v <= 8) return "😣";
  return "😫";
};

const CustomTooltip = ({ active, payload, label, goalValue, goalLabel, isEva }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card/95 backdrop-blur-sm border border-border rounded-xl px-3 py-2 shadow-lg">
      <p className="text-[10px] text-muted-foreground font-medium mb-1">{label}</p>
      {payload
        .filter((entry: any) => entry.dataKey !== "goalLine")
        .map((entry: any) => (
          <p key={entry.dataKey} className="text-xs font-semibold flex items-center gap-1" style={{ color: entry.color }}>
            {isEva && <span>{evaEmoji(entry.value)}</span>}
            {entry.name}: {entry.value}{isEva ? "/10" : ""}
          </p>
        ))}
      {goalValue != null && (
        <p className="text-[10px] text-muted-foreground mt-0.5 border-t border-border/50 pt-1">
          🎯 Meta: {goalValue} {goalLabel}
        </p>
      )}
    </div>
  );
};

const CompareTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-card/95 backdrop-blur-sm border border-border rounded-xl px-3 py-2 shadow-lg min-w-[140px]">
      <p className="text-[10px] text-muted-foreground font-medium mb-1.5">{label}</p>
      {payload
        .filter((entry: any) => entry.value != null)
        .map((entry: any) => (
          <div key={entry.dataKey} className="flex items-center justify-between gap-3 text-xs">
            <span className="flex items-center gap-1.5">
              <span
                className="w-2 h-2 rounded-full inline-block"
                style={{ backgroundColor: entry.color }}
              />
              <span className="text-muted-foreground">{entry.name}</span>
            </span>
            <span className="font-semibold" style={{ color: entry.color }}>
              {entry.value}%
            </span>
          </div>
        ))}
    </div>
  );
};

export const MedidasChart = ({ fichas, protocoloUsuarioId }: MedidasChartProps) => {
  const [selected, setSelected] = useState<MetricKey>("peso");
  const [mode, setMode] = useState<ChartMode>("single");
  const [compareMetrics, setCompareMetrics] = useState<MetricKey[]>([
    "peso",
    "medida_cintura",
    "medida_quadril",
  ]);
  const [showGoalInput, setShowGoalInput] = useState(false);
  const [goalDraft, setGoalDraft] = useState("");

  // Persist goals per protocol in localStorage
  const storageKey = protocoloUsuarioId ? `goals_${protocoloUsuarioId}` : "goals_default";

  const [goals, setGoals] = useState<Partial<Record<MetricKey, number>>>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      return stored ? JSON.parse(stored) : {};
    } catch {
      return {};
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(storageKey, JSON.stringify(goals));
    } catch {}
  }, [goals, storageKey]);

  const currentGoal = goals[selected] ?? null;

  const setGoalForMetric = useCallback(
    (key: MetricKey, value: number | null) => {
      setGoals((prev) => {
        const next = { ...prev };
        if (value == null) {
          delete next[key];
        } else {
          next[key] = value;
        }
        return next;
      });
    },
    []
  );

  const handleSaveGoal = () => {
    const val = parseFloat(goalDraft);
    if (!isNaN(val) && val > 0) {
      setGoalForMetric(selected, val);
    }
    setShowGoalInput(false);
    setGoalDraft("");
  };

  const handleRemoveGoal = () => {
    setGoalForMetric(selected, null);
    setShowGoalInput(false);
    setGoalDraft("");
  };

  // Filter metrics that have at least 2 data points
  const availableMetrics = useMemo(() => {
    return METRICS.filter((m) => {
      const count = fichas.filter((f) => f[m.key] != null).length;
      return count >= 2;
    });
  }, [fichas]);

  const selectedMetric = METRICS.find((m) => m.key === selected) ?? METRICS[0];

  // Single metric chart data
  const chartData = useMemo(() => {
    return fichas
      .filter((f) => f[selected] != null)
      .map((f) => ({
        date: format(new Date(f.data), "dd/MM", { locale: ptBR }),
        fullDate: format(new Date(f.data), "dd 'de' MMM", { locale: ptBR }),
        value: f[selected] as number,
      }));
  }, [fichas, selected]);

  // Comparative chart data — normalized to % change from first measurement
  const compareData = useMemo(() => {
    const activeCompare = compareMetrics.filter((k) =>
      availableMetrics.some((m) => m.key === k)
    );
    if (activeCompare.length === 0) return [];

    // Get first value for each metric to use as baseline
    const baselines: Partial<Record<MetricKey, number>> = {};
    for (const key of activeCompare) {
      const first = fichas.find((f) => f[key] != null);
      if (first) baselines[key] = first[key] as number;
    }

    return fichas.map((f) => {
      const point: Record<string, any> = {
        date: format(new Date(f.data), "dd/MM", { locale: ptBR }),
      };
      for (const key of activeCompare) {
        const val = f[key] as number | null | undefined;
        const base = baselines[key];
        if (val != null && base != null && base !== 0) {
          point[key] = Number((((val - base) / base) * 100).toFixed(1));
        }
      }
      return point;
    });
  }, [fichas, compareMetrics, availableMetrics]);

  // Calculate summary stats
  const stats = useMemo(() => {
    if (chartData.length < 2) return null;
    const first = chartData[0].value;
    const last = chartData[chartData.length - 1].value;
    const diff = Number((last - first).toFixed(1));
    const min = Math.min(...chartData.map((d) => d.value));
    const max = Math.max(...chartData.map((d) => d.value));
    return { first, last, diff, min, max };
  }, [chartData]);

  const toggleCompareMetric = (key: MetricKey) => {
    setCompareMetrics((prev) => {
      if (prev.includes(key)) {
        if (prev.length <= 1) return prev; // keep at least one
        return prev.filter((k) => k !== key);
      }
      if (prev.length >= 4) return prev; // max 4
      return [...prev, key];
    });
  };

  if (availableMetrics.length === 0) {
    return (
      <div className="text-center py-6 text-muted-foreground text-sm">
        <BarChart3 size={28} className="mx-auto mb-2 opacity-40" />
        <p>Registre pelo menos 2 medições para ver os gráficos de evolução.</p>
      </div>
    );
  }

  // If current selected metric isn't available, default to first available
  if (!availableMetrics.find((m) => m.key === selected) && availableMetrics.length > 0) {
    setSelected(availableMetrics[0].key);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Header with mode toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <TrendingUp size={16} className="text-primary" />
          <h4 className="text-sm font-semibold text-foreground">Evolução das Medidas</h4>
        </div>
        {availableMetrics.length >= 2 && (
          <div className="flex items-center bg-muted/60 rounded-lg p-0.5">
            <button
              onClick={() => setMode("single")}
              className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all ${
                mode === "single"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Individual
            </button>
            <button
              onClick={() => setMode("compare")}
              className={`px-2.5 py-1 rounded-md text-[10px] font-medium transition-all flex items-center gap-1 ${
                mode === "compare"
                  ? "bg-card text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Layers size={10} />
              Comparar
            </button>
          </div>
        )}
      </div>

      {mode === "single" ? (
        <>
          {/* Metric selector pills */}
          <div className="flex flex-wrap gap-1.5">
            {availableMetrics.map((m) => (
              <button
                key={m.key}
                onClick={() => setSelected(m.key)}
                className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200 ${
                  selected === m.key
                    ? "bg-primary text-primary-foreground shadow-sm"
                    : "bg-muted/60 text-muted-foreground hover:bg-muted"
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Summary stats + Goal */}
          {stats && (
            <div className="space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <div className="p-2.5 rounded-xl bg-muted/40 border border-border/50 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Início</p>
                  <p className="text-sm font-bold text-foreground flex items-center justify-center gap-1">
                    {selected === "escala_eva" && <span className="text-base">{evaEmoji(stats.first)}</span>}
                    {stats.first}
                    <span className="text-[10px] font-normal text-muted-foreground">
                      {selectedMetric.suffix}
                    </span>
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/40 border border-border/50 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">Atual</p>
                  <p className="text-sm font-bold text-foreground flex items-center justify-center gap-1">
                    {selected === "escala_eva" && <span className="text-base">{evaEmoji(stats.last)}</span>}
                    {stats.last}
                    <span className="text-[10px] font-normal text-muted-foreground">
                      {selectedMetric.suffix}
                    </span>
                  </p>
                </div>
                <div className="p-2.5 rounded-xl bg-muted/40 border border-border/50 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase tracking-wide">
                    Variação
                  </p>
                  <p
                    className={`text-sm font-bold ${
                      stats.diff < 0
                        ? "text-highlight"
                        : stats.diff > 0
                          ? "text-destructive"
                          : "text-muted-foreground"
                    }`}
                  >
                    {stats.diff > 0 ? "+" : ""}
                    {stats.diff}
                    <span className="text-[10px] font-normal ml-0.5">{selectedMetric.suffix}</span>
                    {selected === "escala_eva" && stats.diff < 0 && (
                      <span className="text-[10px] ml-1">✨ Melhora!</span>
                    )}
                  </p>
                </div>
              </div>

              {/* Goal row */}
              <AnimatePresence mode="wait">
                {showGoalInput ? (
                  <motion.div
                    key="goal-input"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="flex items-center gap-2"
                  >
                    <div className="flex-1 relative">
                      <Input
                        type="number"
                        step="0.1"
                        placeholder={`Meta de ${selectedMetric.label} (${selectedMetric.suffix})`}
                        value={goalDraft}
                        onChange={(e) => setGoalDraft(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSaveGoal()}
                        className="h-8 text-xs pr-10"
                        autoFocus
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-muted-foreground">
                        {selectedMetric.suffix}
                      </span>
                    </div>
                    <button
                      onClick={handleSaveGoal}
                      className="h-8 w-8 rounded-lg bg-primary text-primary-foreground flex items-center justify-center hover:bg-primary/90 transition-colors"
                    >
                      <Check size={14} />
                    </button>
                    <button
                      onClick={() => { setShowGoalInput(false); setGoalDraft(""); }}
                      className="h-8 w-8 rounded-lg bg-muted text-muted-foreground flex items-center justify-center hover:bg-muted/80 transition-colors"
                    >
                      <X size={14} />
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="goal-display"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2"
                  >
                    {currentGoal != null ? (
                      <div className="flex-1 flex items-center gap-2 p-2 rounded-xl bg-primary/5 border border-primary/20">
                        <Target size={14} className="text-primary shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-[10px] text-muted-foreground">Meta de {selectedMetric.label}</p>
                          <p className="text-sm font-bold text-primary">
                            {currentGoal}
                            <span className="text-[10px] font-normal ml-0.5">{selectedMetric.suffix}</span>
                            {stats && (
                              <span className={`text-[10px] font-medium ml-2 ${
                                stats.last <= currentGoal ? "text-highlight" : "text-muted-foreground"
                              }`}>
                                {stats.last <= currentGoal ? "✓ Atingida!" : `faltam ${Number((stats.last - currentGoal).toFixed(1))}${selectedMetric.suffix}`}
                              </span>
                            )}
                          </p>
                        </div>
                        <button
                          onClick={() => { setGoalDraft(currentGoal.toString()); setShowGoalInput(true); }}
                          className="text-[10px] text-muted-foreground hover:text-foreground px-2 py-1 rounded-md hover:bg-muted transition-colors"
                        >
                          Editar
                        </button>
                        <button
                          onClick={handleRemoveGoal}
                          className="text-muted-foreground hover:text-destructive p-1 rounded-md hover:bg-muted transition-colors"
                        >
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setShowGoalInput(true)}
                        className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-medium bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground transition-all"
                      >
                        <Target size={12} />
                        Definir meta
                      </button>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}

          {/* Single metric area chart */}
          <div className="h-52 sm:h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={chartData}
                margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="chartGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor={selectedMetric.color}
                      stopOpacity={0.3}
                    />
                    <stop
                      offset="95%"
                      stopColor={selectedMetric.color}
                      stopOpacity={0.02}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  strokeOpacity={0.5}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  tickLine={false}
                  axisLine={false}
                  domain={selected === "escala_eva"
                    ? [0, 10]
                    : [(dataMin: number) => {
                        const min = currentGoal != null ? Math.min(dataMin, currentGoal) : dataMin;
                        return Math.floor(min - 1);
                      }, (dataMax: number) => {
                        const max = currentGoal != null ? Math.max(dataMax, currentGoal) : dataMax;
                        return Math.ceil(max + 1);
                      }]
                  }
                />
                <Tooltip content={<CustomTooltip goalValue={currentGoal} goalLabel={selectedMetric.suffix} isEva={selected === "escala_eva"} />} />
                {/* EVA pain zone reference lines */}
                {selected === "escala_eva" && (
                  <>
                    <ReferenceLine
                      y={3}
                      stroke="hsl(80, 60%, 45%)"
                      strokeDasharray="4 4"
                      strokeWidth={1}
                      strokeOpacity={0.5}
                      label={{ value: "Leve", position: "right", fontSize: 9, fill: "hsl(80, 60%, 45%)" }}
                    />
                    <ReferenceLine
                      y={6}
                      stroke="hsl(45, 80%, 50%)"
                      strokeDasharray="4 4"
                      strokeWidth={1}
                      strokeOpacity={0.5}
                      label={{ value: "Moderada", position: "right", fontSize: 9, fill: "hsl(45, 80%, 50%)" }}
                    />
                    <ReferenceLine
                      y={8}
                      stroke="hsl(15, 80%, 55%)"
                      strokeDasharray="4 4"
                      strokeWidth={1}
                      strokeOpacity={0.5}
                      label={{ value: "Intensa", position: "right", fontSize: 9, fill: "hsl(15, 80%, 55%)" }}
                    />
                  </>
                )}
                {currentGoal != null && (
                  <ReferenceLine
                    y={currentGoal}
                    stroke="hsl(var(--primary))"
                    strokeDasharray="6 4"
                    strokeWidth={1.5}
                    strokeOpacity={0.7}
                    label={{
                      value: `🎯 ${currentGoal}${selectedMetric.suffix}`,
                      position: "right",
                      fontSize: 10,
                      fill: "hsl(var(--primary))",
                      fontWeight: 600,
                    }}
                  />
                )}
                <Area
                  type="monotone"
                  dataKey="value"
                  name={`${selectedMetric.label} (${selectedMetric.suffix})`}
                  stroke={selectedMetric.color}
                  strokeWidth={2.5}
                  fill="url(#chartGradient)"
                  dot={{
                    fill: selectedMetric.color,
                    stroke: "hsl(var(--card))",
                    strokeWidth: 2,
                    r: 4,
                  }}
                  activeDot={{
                    fill: selectedMetric.color,
                    stroke: "hsl(var(--card))",
                    strokeWidth: 2,
                    r: 6,
                  }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </>
      ) : (
        <>
          {/* Compare mode: metric toggle pills */}
          <div className="space-y-2">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wide font-medium">
              Selecione até 4 medidas para comparar (% variação desde o início)
            </p>
            <div className="flex flex-wrap gap-1.5">
              {availableMetrics.map((m) => {
                const isActive = compareMetrics.includes(m.key);
                return (
                  <button
                    key={m.key}
                    onClick={() => toggleCompareMetric(m.key)}
                    className={`px-3 py-1.5 rounded-full text-[11px] font-medium transition-all duration-200 flex items-center gap-1.5 ${
                      isActive
                        ? "shadow-sm text-white"
                        : "bg-muted/60 text-muted-foreground hover:bg-muted"
                    }`}
                    style={
                      isActive
                        ? { backgroundColor: m.color }
                        : undefined
                    }
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full ${isActive ? "bg-white/80" : ""}`}
                      style={!isActive ? { backgroundColor: m.color } : undefined}
                    />
                    {m.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Compare summary cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {compareMetrics
              .filter((k) => availableMetrics.some((m) => m.key === k))
              .map((key) => {
                const metric = METRICS.find((m) => m.key === key)!;
                const values = fichas.filter((f) => f[key] != null).map((f) => f[key] as number);
                if (values.length < 2) return null;
                const first = values[0];
                const last = values[values.length - 1];
                const pctChange = Number((((last - first) / first) * 100).toFixed(1));
                return (
                  <div
                    key={key}
                    className="p-2 rounded-xl border border-border/50 text-center"
                    style={{ backgroundColor: `${metric.color}10` }}
                  >
                    <p className="text-[9px] font-medium uppercase tracking-wide" style={{ color: metric.color }}>
                      {metric.label}
                    </p>
                    <p className="text-xs font-bold text-foreground mt-0.5">
                      {first} → {last}
                      <span className="text-[9px] font-normal text-muted-foreground ml-0.5">
                        {metric.suffix}
                      </span>
                    </p>
                    <p
                      className={`text-[10px] font-semibold mt-0.5 ${
                        pctChange < 0 ? "text-highlight" : pctChange > 0 ? "text-destructive" : "text-muted-foreground"
                      }`}
                    >
                      {pctChange > 0 ? "+" : ""}
                      {pctChange}%
                    </p>
                  </div>
                );
              })}
          </div>

          {/* Compare multi-line chart */}
          <div className="h-56 sm:h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={compareData}
                margin={{ top: 8, right: 8, left: -8, bottom: 0 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="hsl(var(--border))"
                  strokeOpacity={0.5}
                />
                <XAxis
                  dataKey="date"
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(v) => `${v}%`}
                  domain={["auto", "auto"]}
                />
                <Tooltip content={<CompareTooltip />} />
                {/* Zero baseline */}
                <Line
                  type="monotone"
                  dataKey={() => 0}
                  stroke="hsl(var(--border))"
                  strokeWidth={1}
                  strokeDasharray="4 4"
                  dot={false}
                  activeDot={false}
                  name="Linha base"
                  legendType="none"
                />
                {compareMetrics
                  .filter((k) => availableMetrics.some((m) => m.key === k))
                  .map((key) => {
                    const metric = METRICS.find((m) => m.key === key)!;
                    return (
                      <Line
                        key={key}
                        type="monotone"
                        dataKey={key}
                        name={metric.label}
                        stroke={metric.color}
                        strokeWidth={2.5}
                        dot={{
                          fill: metric.color,
                          stroke: "hsl(var(--card))",
                          strokeWidth: 2,
                          r: 3.5,
                        }}
                        activeDot={{
                          fill: metric.color,
                          stroke: "hsl(var(--card))",
                          strokeWidth: 2,
                          r: 5.5,
                        }}
                        connectNulls
                      />
                    );
                  })}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </>
      )}
    </motion.div>
  );
};
