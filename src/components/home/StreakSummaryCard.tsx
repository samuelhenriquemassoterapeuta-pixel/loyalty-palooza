import { motion } from "framer-motion";
import { Flame, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface StreakSummaryCardProps {
  streak: number;
  bestStreak: number;
  protocoloNome: string | null;
  hasActiveProtocol: boolean;
}

export const StreakSummaryCard = ({
  streak,
  bestStreak,
  protocoloNome,
  hasActiveProtocol,
}: StreakSummaryCardProps) => {
  const navigate = useNavigate();

  if (!hasActiveProtocol) {
    return (
      <motion.button
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        whileTap={{ scale: 0.98 }}
        onClick={() => navigate("/protocolos")}
        className="w-full p-4 rounded-2xl border border-dashed border-accent/30 bg-accent/5 text-left hover:border-accent/50 transition-colors"
      >
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-accent/10">
            <Flame className="text-accent" size={20} />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-foreground text-sm">
              Sem protocolo ativo
            </p>
            <p className="text-xs text-muted-foreground">
              Ative um protocolo para começar seu streak
            </p>
          </div>
        </div>
      </motion.button>
    );
  }

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => navigate("/protocolos")}
      className="w-full p-4 rounded-2xl bg-gradient-to-br from-accent/15 via-accent/10 to-primary/10 border border-accent/20 text-left hover:shadow-md transition-all"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-1.5">
          <Flame className="text-accent" size={14} />
          <span className="text-xs font-semibold text-accent uppercase tracking-wide">
            Streak Ativo
          </span>
        </div>
        {bestStreak > 0 && (
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <TrendingUp size={12} />
            <span>Recorde: {bestStreak}d</span>
          </div>
        )}
      </div>

      <div className="flex items-end gap-2">
        <span className="text-3xl font-black text-foreground leading-none">
          {streak}
        </span>
        <span className="text-sm text-muted-foreground mb-0.5">
          {streak === 1 ? "dia" : "dias"} seguidos
        </span>
      </div>

      {protocoloNome && (
        <p className="text-xs text-muted-foreground mt-1.5 truncate">
          {protocoloNome}
        </p>
      )}
    </motion.button>
  );
};
