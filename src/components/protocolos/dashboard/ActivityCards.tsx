import { motion, type Variants } from "framer-motion";
import { Trophy, Scale, CheckCircle2, Camera, Flame, Target } from "lucide-react";
import { CircularProgress } from "@/components/ui/circular-progress";
import type { ProgressStats } from "@/hooks/useProgressStats";

interface GoalsProgressCardProps {
  stats: ProgressStats;
  variants: Variants;
}

export const GoalsProgressCard = ({ stats, variants }: GoalsProgressCardProps) => (
  <motion.div variants={variants} className="p-4 rounded-xl bg-card border border-border">
    <div className="flex items-center gap-4">
      <CircularProgress
        value={stats.metasProgresso}
        size={64}
        strokeWidth={5}
        progressColor="hsl(var(--primary))"
        label={
          <span className="text-xs font-bold text-primary">{stats.metasProgresso}%</span>
        }
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <Trophy size={15} className="text-warning" />
          <span className="text-sm font-medium text-foreground">Metas</span>
        </div>
        <p className="text-xs text-muted-foreground">
          {stats.metasConcluidas} de {stats.metasTotal} metas concluídas
        </p>
      </div>
    </div>
  </motion.div>
);

interface WeekActivityCardProps {
  stats: ProgressStats;
  variants: Variants;
}

export const WeekActivityCard = ({ stats, variants }: WeekActivityCardProps) => (
  <motion.div variants={variants} className="p-4 rounded-xl bg-card border border-border">
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
);

interface MeasurementReminderProps {
  stats: ProgressStats;
  variants: Variants;
}

export const MeasurementReminder = ({ stats, variants }: MeasurementReminderProps) => {
  if (stats.diasSemMedicao == null || stats.diasSemMedicao < 5) return null;

  return (
    <motion.div
      variants={variants}
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
  );
};

interface EmptyDashboardProps {
  stats: ProgressStats;
  variants: Variants;
}

export const EmptyDashboard = ({ stats, variants }: EmptyDashboardProps) => {
  if (stats.totalFichas > 0 || stats.metasTotal > 0) return null;

  return (
    <motion.div variants={variants} className="text-center py-6 text-muted-foreground">
      <Target size={28} className="mx-auto mb-2 opacity-40" />
      <p className="text-sm">Comece registrando suas medidas e metas!</p>
      <p className="text-xs mt-0.5">Use as abas Medidas e Metas para começar.</p>
    </motion.div>
  );
};
