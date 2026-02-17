import { motion } from "framer-motion";
import { Camera, ChevronRight } from "lucide-react";
import { useFichas, useMetas, useFotos } from "@/features/protocolos/hooks/useProtocolos";
import { useProgressStats } from "@/features/protocolos/hooks/useProgressStats";
import { WeekHeaderCard } from "./dashboard/WeekHeaderCard";
import { StreakCard } from "./dashboard/StreakCard";
import { BodyStatsRow } from "./dashboard/BodyStatsRow";
import { MiniWeightChart } from "./dashboard/MiniWeightChart";
import { MiniEvaChart } from "./dashboard/MiniEvaChart";
import {
  GoalsProgressCard,
  WeekActivityCard,
  MeasurementReminder,
  EmptyDashboard,
} from "./dashboard/ActivityCards";
import { containerVariants, itemVariants } from "./dashboard/variants";

interface ProgressDashboardProps {
  protocoloUsuarioId: string;
  protocolo: {
    nome: string;
    tipo?: string;
    duracao_semanas: number;
    sessoes_por_semana: number;
  };
  dataInicio: string;
  onNavigateToPhotos?: () => void;
}

export const ProgressDashboard = ({
  protocoloUsuarioId,
  protocolo,
  dataInicio,
  onNavigateToPhotos,
}: ProgressDashboardProps) => {
  const { fichas } = useFichas(protocoloUsuarioId);
  const { metas } = useMetas(protocoloUsuarioId);
  const { fotos } = useFotos(protocoloUsuarioId);

  const stats = useProgressStats(fichas, metas, fotos, dataInicio, protocolo);

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="space-y-4"
    >
      <WeekHeaderCard
        stats={stats}
        duracaoSemanas={protocolo.duracao_semanas}
        variants={itemVariants}
      />
      <StreakCard stats={stats} fichas={fichas} variants={itemVariants} />
      <BodyStatsRow stats={stats} variants={itemVariants} />
      <MiniWeightChart fichas={fichas} variants={itemVariants} />
      <MiniEvaChart fichas={fichas} variants={itemVariants} />
      <GoalsProgressCard stats={stats} variants={itemVariants} />
      <WeekActivityCard stats={stats} variants={itemVariants} />
      <MeasurementReminder stats={stats} variants={itemVariants} />

      {/* Quick photo access card */}
      {onNavigateToPhotos && (
        <motion.button
          variants={itemVariants}
          onClick={onNavigateToPhotos}
          className="w-full p-4 rounded-xl bg-gradient-to-r from-accent/15 to-primary/10 border border-accent/20 flex items-center gap-3 text-left hover:from-accent/25 hover:to-primary/20 transition-colors group"
        >
          <div className="w-11 h-11 rounded-xl bg-accent/20 flex items-center justify-center shrink-0">
            <Camera size={20} className="text-accent-foreground" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">Registrar fotos de evolução</p>
            <p className="text-[11px] text-muted-foreground">
              {stats.totalFotos > 0
                ? `${stats.totalFotos} foto${stats.totalFotos > 1 ? "s" : ""} registrada${stats.totalFotos > 1 ? "s" : ""} · Tire mais para comparar`
                : "Tire fotos antes e depois para acompanhar sua transformação"}
            </p>
          </div>
          <ChevronRight size={16} className="text-muted-foreground group-hover:text-foreground transition-colors shrink-0" />
        </motion.button>
      )}

      <EmptyDashboard stats={stats} variants={itemVariants} />
    </motion.div>
  );
};
