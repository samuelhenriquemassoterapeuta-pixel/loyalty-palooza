import { motion } from "framer-motion";
import { useFichas, useMetas, useFotos } from "@/hooks/useProtocolos";
import { useProgressStats } from "@/hooks/useProgressStats";
import { WeekHeaderCard } from "./dashboard/WeekHeaderCard";
import { StreakCard } from "./dashboard/StreakCard";
import { BodyStatsRow } from "./dashboard/BodyStatsRow";
import { MiniWeightChart } from "./dashboard/MiniWeightChart";
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
    duracao_semanas: number;
    sessoes_por_semana: number;
  };
  dataInicio: string;
}

export const ProgressDashboard = ({
  protocoloUsuarioId,
  protocolo,
  dataInicio,
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
      <GoalsProgressCard stats={stats} variants={itemVariants} />
      <WeekActivityCard stats={stats} variants={itemVariants} />
      <MeasurementReminder stats={stats} variants={itemVariants} />
      <EmptyDashboard stats={stats} variants={itemVariants} />
    </motion.div>
  );
};
