import { motion, type Variants } from "framer-motion";
import { Calendar } from "lucide-react";
import type { ProgressStats } from "@/features/protocolos/hooks/useProgressStats";

interface WeekHeaderCardProps {
  stats: ProgressStats;
  duracaoSemanas: number;
  variants: Variants;
}

export const WeekHeaderCard = ({ stats, duracaoSemanas, variants }: WeekHeaderCardProps) => (
  <motion.div
    variants={variants}
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
              de {duracaoSemanas}
            </span>
          </p>
        </div>
      </div>
      <div className="text-right">
        <p className="text-2xl font-bold text-primary">{stats.progressoTempo}%</p>
        <p className="text-[10px] text-muted-foreground">{stats.diasDecorridos} dias</p>
      </div>
    </div>

    <div className="h-2.5 rounded-full bg-primary/10 overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${stats.progressoTempo}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full rounded-full gradient-primary"
      />
    </div>
  </motion.div>
);
