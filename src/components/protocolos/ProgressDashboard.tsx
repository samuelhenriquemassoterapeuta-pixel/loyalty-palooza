import { useMemo } from "react";
import { motion } from "framer-motion";
import {
  TrendingDown,
  TrendingUp,
  Minus,
  Scale,
  Target,
  Calendar,
  Flame,
  Trophy,
  Camera,
  CheckCircle2,
  Activity,
} from "lucide-react";
import {
  AreaChart,
  Area,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import { useFichas, useMetas, useFotos } from "@/hooks/useProtocolos";
import { differenceInDays, differenceInWeeks, format, startOfWeek, endOfWeek, isWithinInterval, subDays, startOfDay, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";

interface ProgressDashboardProps {
  protocoloUsuarioId: string;
  protocolo: {
    nome: string;
    duracao_semanas: number;
    sessoes_por_semana: number;
  };
  dataInicio: string;
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

export const ProgressDashboard = ({
  protocoloUsuarioId,
  protocolo,
  dataInicio,
}: ProgressDashboardProps) => {
  const { fichas } = useFichas(protocoloUsuarioId);
  const { metas } = useMetas(protocoloUsuarioId);
  const { fotos } = useFotos(protocoloUsuarioId);

  const stats = useMemo(() => {
    const now = new Date();
    const inicio = new Date(dataInicio);
    const diasDecorridos = differenceInDays(now, inicio);
    const semanasDecorridas = differenceInWeeks(now, inicio);
    const semanaAtual = Math.min(semanasDecorridas + 1, protocolo.duracao_semanas);
    const progressoTempo = Math.min(
      Math.round((semanasDecorridas / protocolo.duracao_semanas) * 100),
      100
    );

    // Measurement stats
    const ultimaFicha = fichas.length > 0 ? fichas[fichas.length - 1] : null;
    const primeiraFicha = fichas.length > 0 ? fichas[0] : null;
    const pesoInicial = primeiraFicha?.peso ?? null;
    const pesoAtual = ultimaFicha?.peso ?? null;
    const variacaoPeso =
      pesoInicial != null && pesoAtual != null
        ? Number((pesoAtual - pesoInicial).toFixed(1))
        : null;

    // Waist variation
    const cinturaInicial = primeiraFicha?.medida_cintura ?? null;
    const cinturaAtual = ultimaFicha?.medida_cintura ?? null;
    const variacaoCintura =
      cinturaInicial != null && cinturaAtual != null
        ? Number((cinturaAtual - cinturaInicial).toFixed(1))
        : null;

    // Goals progress
    const metasConcluidas = metas.filter((m) => m.concluida).length;
    const metasTotal = metas.length;
    const metasProgresso = metasTotal > 0 ? Math.round((metasConcluidas / metasTotal) * 100) : 0;

    // This week's activity
    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
    const fichasSemana = fichas.filter((f) =>
      isWithinInterval(new Date(f.data), { start: weekStart, end: weekEnd })
    ).length;
    const fotosSemana = fotos.filter((f) =>
      isWithinInterval(new Date(f.data), { start: weekStart, end: weekEnd })
    ).length;
    const metasSemana = metas.filter(
      (m) => m.semana_numero === semanaAtual && m.concluida
    ).length;
    const metasSemanaTotal = metas.filter(
      (m) => m.semana_numero === semanaAtual
    ).length;

    // Days since last measurement
    const diasSemMedicao = ultimaFicha
      ? differenceInDays(now, new Date(ultimaFicha.data))
      : null;

    // Streak calculation — consecutive days with at least one measurement
    let streak = 0;
    let melhorStreak = 0;
    if (fichas.length > 0) {
      // Get unique measurement dates (normalized to start of day)
      const measurementDates = new Set(
        fichas.map((f) => startOfDay(new Date(f.data)).getTime())
      );

      // Count consecutive days backwards from last measurement
      const lastDate = startOfDay(new Date(fichas[fichas.length - 1].data));
      let checkDate = lastDate;
      let currentStreak = 0;

      // Only count as active streak if last measurement was today or yesterday
      const isActive = differenceInDays(startOfDay(now), lastDate) <= 1;

      if (isActive) {
        while (measurementDates.has(checkDate.getTime())) {
          currentStreak++;
          checkDate = subDays(checkDate, 1);
        }
        streak = currentStreak;
      }

      // Calculate best streak ever
      const sortedDates = Array.from(measurementDates).sort((a, b) => a - b);
      let tempStreak = 1;
      melhorStreak = 1;
      for (let i = 1; i < sortedDates.length; i++) {
        const diffDays = (sortedDates[i] - sortedDates[i - 1]) / (1000 * 60 * 60 * 24);
        if (diffDays === 1) {
          tempStreak++;
          melhorStreak = Math.max(melhorStreak, tempStreak);
        } else {
          tempStreak = 1;
        }
      }
      melhorStreak = Math.max(melhorStreak, streak);
    }

    return {
      diasDecorridos,
      semanaAtual,
      progressoTempo,
      pesoInicial,
      pesoAtual,
      variacaoPeso,
      cinturaInicial,
      cinturaAtual,
      variacaoCintura,
      metasConcluidas,
      metasTotal,
      metasProgresso,
      fichasSemana,
      fotosSemana,
      metasSemana,
      metasSemanaTotal,
      totalFichas: fichas.length,
      totalFotos: fotos.length,
      diasSemMedicao,
      streak,
      melhorStreak,
    };
  }, [fichas, metas, fotos, dataInicio, protocolo]);

  // Mini weight chart data
  const weightChartData = useMemo(() => {
    return fichas
      .filter((f) => f.peso != null)
      .map((f) => ({
        date: format(new Date(f.data), "dd/MM", { locale: ptBR }),
        value: f.peso as number,
      }));
  }, [fichas]);

  const TrendIcon = ({ value }: { value: number | null }) => {
    if (value == null) return <Minus size={14} className="text-muted-foreground" />;
    if (value < 0) return <TrendingDown size={14} className="text-highlight" />;
    if (value > 0) return <TrendingUp size={14} className="text-destructive" />;
    return <Minus size={14} className="text-muted-foreground" />;
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.06 },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      {/* Week Header */}
      <motion.div
        variants={item}
        className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 to-primary/5 border border-primary/20"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center">
              <Calendar size={18} className="text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground">Semana atual</p>
              <p className="text-lg font-bold text-foreground">
                {stats.semanaAtual}
                <span className="text-xs font-normal text-muted-foreground ml-1">
                  de {protocolo.duracao_semanas}
                </span>
              </p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-primary">{stats.progressoTempo}%</p>
            <p className="text-[10px] text-muted-foreground">{stats.diasDecorridos} dias</p>
          </div>
        </div>

        {/* Timeline bar */}
        <div className="h-2.5 rounded-full bg-primary/10 overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${stats.progressoTempo}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full gradient-primary"
          />
        </div>
      </motion.div>

      {/* Streak Card */}
      {stats.totalFichas > 0 && (
        <motion.div
          variants={item}
          className="p-4 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center ${
                stats.streak > 0
                  ? "bg-gradient-to-br from-warning/20 to-warning/10"
                  : "bg-muted"
              }`}>
                <Flame
                  size={22}
                  className={stats.streak > 0 ? "text-warning" : "text-muted-foreground"}
                />
              </div>
              <div>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-2xl font-bold text-foreground">{stats.streak}</span>
                  <span className="text-xs text-muted-foreground">
                    {stats.streak === 1 ? "dia" : "dias"} seguidos
                  </span>
                </div>
                <p className="text-[10px] text-muted-foreground">
                  {stats.streak > 0
                    ? "Continue registrando! 💪"
                    : "Registre hoje para iniciar o streak!"}
                </p>
              </div>
            </div>
            {stats.melhorStreak > 1 && (
              <div className="text-right">
                <div className="flex items-center gap-1 justify-end">
                  <Trophy size={12} className="text-warning" />
                  <span className="text-xs font-semibold text-foreground">{stats.melhorStreak}</span>
                </div>
                <p className="text-[10px] text-muted-foreground">recorde</p>
              </div>
            )}
          </div>

          {/* Streak dots — last 7 days */}
          <div className="flex items-center gap-1.5 mt-3 justify-center">
            {Array.from({ length: 7 }).map((_, i) => {
              const day = subDays(startOfDay(new Date()), 6 - i);
              const hasMeasurement = fichas.some((f) =>
                isSameDay(new Date(f.data), day)
              );
              const isToday = i === 6;
              return (
                <div key={i} className="flex flex-col items-center gap-1">
                  <div
                    className={`w-6 h-6 rounded-full flex items-center justify-center text-[9px] font-medium transition-colors ${
                      hasMeasurement
                        ? "bg-warning/20 text-warning border border-warning/30"
                        : isToday
                          ? "bg-muted border border-border text-muted-foreground"
                          : "bg-muted/50 text-muted-foreground/50"
                    }`}
                  >
                    {hasMeasurement ? "✓" : format(day, "dd")}
                  </div>
                  <span className="text-[8px] text-muted-foreground">
                    {format(day, "EEE", { locale: ptBR }).slice(0, 3)}
                  </span>
                </div>
              );
            })}
          </div>
        </motion.div>
      )}

      {/* Body Stats Row */}
      <div className="grid grid-cols-2 gap-3">
        {/* Weight Card */}
        <motion.div
          variants={item}
          className="p-3.5 rounded-xl bg-card border border-border space-y-2"
        >
          <div className="flex items-center gap-1.5">
            <Scale size={13} className="text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Peso</span>
          </div>
          {stats.pesoAtual != null ? (
            <>
              <p className="text-xl font-bold text-foreground">
                {stats.pesoAtual}
                <span className="text-xs font-normal text-muted-foreground ml-0.5">kg</span>
              </p>
              {stats.variacaoPeso != null && (
                <div className="flex items-center gap-1">
                  <TrendIcon value={stats.variacaoPeso} />
                  <span
                    className={`text-xs font-medium ${
                      stats.variacaoPeso < 0
                        ? "text-highlight"
                        : stats.variacaoPeso > 0
                          ? "text-destructive"
                          : "text-muted-foreground"
                    }`}
                  >
                    {stats.variacaoPeso > 0 ? "+" : ""}
                    {stats.variacaoPeso}kg
                  </span>
                  <span className="text-[10px] text-muted-foreground">total</span>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Sem registro</p>
          )}
        </motion.div>

        {/* Waist Card */}
        <motion.div
          variants={item}
          className="p-3.5 rounded-xl bg-card border border-border space-y-2"
        >
          <div className="flex items-center gap-1.5">
            <Activity size={13} className="text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground uppercase tracking-wide">Cintura</span>
          </div>
          {stats.cinturaAtual != null ? (
            <>
              <p className="text-xl font-bold text-foreground">
                {stats.cinturaAtual}
                <span className="text-xs font-normal text-muted-foreground ml-0.5">cm</span>
              </p>
              {stats.variacaoCintura != null && (
                <div className="flex items-center gap-1">
                  <TrendIcon value={stats.variacaoCintura} />
                  <span
                    className={`text-xs font-medium ${
                      stats.variacaoCintura < 0
                        ? "text-highlight"
                        : stats.variacaoCintura > 0
                          ? "text-destructive"
                          : "text-muted-foreground"
                    }`}
                  >
                    {stats.variacaoCintura > 0 ? "+" : ""}
                    {stats.variacaoCintura}cm
                  </span>
                  <span className="text-[10px] text-muted-foreground">total</span>
                </div>
              )}
            </>
          ) : (
            <p className="text-sm text-muted-foreground">Sem registro</p>
          )}
        </motion.div>
      </div>

      {/* Mini Weight Chart */}
      {weightChartData.length >= 2 && (
        <motion.div
          variants={item}
          className="p-4 rounded-xl bg-card border border-border"
        >
          <div className="flex items-center justify-between mb-2">
            <p className="text-xs font-medium text-muted-foreground">Evolução do Peso</p>
            <p className="text-[10px] text-muted-foreground">{weightChartData.length} registros</p>
          </div>
          <div className="h-24 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={weightChartData} margin={{ top: 4, right: 4, left: 4, bottom: 0 }}>
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
      )}

      {/* Goals Progress */}
      <motion.div
        variants={item}
        className="p-4 rounded-xl bg-card border border-border"
      >
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Trophy size={15} className="text-warning" />
            <span className="text-sm font-medium text-foreground">Metas</span>
          </div>
          <span className="text-sm font-bold text-primary">{stats.metasProgresso}%</span>
        </div>
        <div className="h-2 rounded-full bg-muted overflow-hidden mb-2">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${stats.metasProgresso}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="h-full rounded-full gradient-primary"
          />
        </div>
        <p className="text-xs text-muted-foreground">
          {stats.metasConcluidas} de {stats.metasTotal} metas concluídas
        </p>
      </motion.div>

      {/* This Week Activity */}
      <motion.div
        variants={item}
        className="p-4 rounded-xl bg-card border border-border"
      >
        <p className="text-xs font-medium text-muted-foreground mb-3 uppercase tracking-wide">
          Atividade desta semana
        </p>
        <div className="grid grid-cols-3 gap-3">
          <div className="text-center">
            <div className="w-10 h-10 rounded-xl bg-primary/10 mx-auto flex items-center justify-center mb-1.5">
              <Scale size={16} className="text-primary" />
            </div>
            <p className="text-lg font-bold text-foreground">{stats.fichasSemana}</p>
            <p className="text-[10px] text-muted-foreground">Medições</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 rounded-xl bg-highlight/10 mx-auto flex items-center justify-center mb-1.5">
              <CheckCircle2 size={16} className="text-highlight" />
            </div>
            <p className="text-lg font-bold text-foreground">
              {stats.metasSemana}
              <span className="text-xs font-normal text-muted-foreground">/{stats.metasSemanaTotal}</span>
            </p>
            <p className="text-[10px] text-muted-foreground">Metas</p>
          </div>
          <div className="text-center">
            <div className="w-10 h-10 rounded-xl bg-accent/50 mx-auto flex items-center justify-center mb-1.5">
              <Camera size={16} className="text-accent-foreground" />
            </div>
            <p className="text-lg font-bold text-foreground">{stats.fotosSemana}</p>
            <p className="text-[10px] text-muted-foreground">Fotos</p>
          </div>
        </div>
      </motion.div>

      {/* Reminder */}
      {stats.diasSemMedicao != null && stats.diasSemMedicao >= 5 && (
        <motion.div
          variants={item}
          className="p-3.5 rounded-xl bg-warning/10 border border-warning/20 flex items-center gap-3"
        >
          <Flame size={18} className="text-warning shrink-0" />
          <div>
            <p className="text-xs font-medium text-foreground">
              {stats.diasSemMedicao} dias sem registrar medidas
            </p>
            <p className="text-[10px] text-muted-foreground">
              Registre suas medidas para acompanhar a evolução!
            </p>
          </div>
        </motion.div>
      )}

      {/* Empty state */}
      {stats.totalFichas === 0 && stats.metasTotal === 0 && (
        <motion.div
          variants={item}
          className="text-center py-6 text-muted-foreground"
        >
          <Target size={28} className="mx-auto mb-2 opacity-40" />
          <p className="text-sm">Comece registrando suas medidas e metas!</p>
          <p className="text-xs mt-0.5">Use as abas Medidas e Metas para começar.</p>
        </motion.div>
      )}
    </motion.div>
  );
};
