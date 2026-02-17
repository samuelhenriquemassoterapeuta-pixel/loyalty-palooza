import { motion } from "framer-motion";
import { Zap, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Achievement } from "@/features/conquistas/hooks/useAchievements";
import { calculateXpFromAchievements, getLevelFromXp } from "@/features/conquistas/components/xpLevelUtils";

interface XpMiniBarProps {
  achievements: Achievement[];
}

export const XpMiniBar = ({ achievements }: XpMiniBarProps) => {
  const navigate = useNavigate();
  const totalXp = calculateXpFromAchievements(achievements);
  const level = getLevelFromXp(totalXp);
  const nextLevel = level.maxXp === Infinity ? null : undefined;
  const isMaxLevel = level.maxXp === Infinity;

  return (
    <motion.button
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15 }}
      onClick={() => navigate("/conquistas")}
      className="w-full rounded-2xl border border-border/60 bg-card p-4 text-left group hover:border-primary/30 transition-colors"
    >
      <div className="flex items-center justify-between mb-2.5">
        <div className="flex items-center gap-2.5">
          {/* Level icon */}
          <div className="w-10 h-10 rounded-xl bg-primary/15 border border-primary/25 flex items-center justify-center text-lg relative">
            {level.icon}
            <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
              <span className="text-[8px] font-black">{level.level}</span>
            </div>
          </div>

          <div>
            <p className="text-sm font-bold text-foreground">{level.name}</p>
            <div className="flex items-center gap-1">
              <Zap size={11} className="text-warning" />
              <span className="text-[11px] text-muted-foreground font-medium">{totalXp} XP</span>
            </div>
          </div>
        </div>

        <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
      </div>

      {/* Mini progress bar */}
      <div className="relative h-2 rounded-full bg-muted/60 overflow-hidden">
        <motion.div
          className="absolute inset-y-0 left-0 rounded-full"
          style={{
            background: isMaxLevel
              ? "linear-gradient(90deg, hsl(38 92% 50%), hsl(25 65% 42%), hsl(78 55% 28%))"
              : "linear-gradient(90deg, hsl(78 55% 28%), hsl(140 50% 38%))",
          }}
          initial={{ width: 0 }}
          animate={{ width: `${level.progressPercent}%` }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        />
      </div>

      <p className="text-[10px] text-muted-foreground mt-1.5 text-center">
        {isMaxLevel ? (
          <span className="text-primary font-medium">✨ Nível máximo</span>
        ) : (
          <>
            {level.xpInLevel}/{level.xpNeeded} XP para{" "}
            <span className="font-semibold">{getLevelFromXp(level.maxXp).icon} {getLevelFromXp(level.maxXp).name}</span>
          </>
        )}
      </p>
    </motion.button>
  );
};
