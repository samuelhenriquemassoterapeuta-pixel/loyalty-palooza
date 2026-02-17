import { motion } from "framer-motion";
import { Sparkles, Star, Zap } from "lucide-react";
import type { Achievement } from "@/features/conquistas/hooks/useAchievements";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { LEVELS, calculateXpFromAchievements, getLevelFromXp } from "./xpLevelUtils";

// Re-export for backward compatibility
export { calculateXpFromAchievements, getLevelFromXp };

interface XpLevelCardProps {
  achievements: Achievement[];
}

export const XpLevelCard = ({ achievements }: XpLevelCardProps) => {
  const totalXp = calculateXpFromAchievements(achievements);
  const level = getLevelFromXp(totalXp);
  const nextLevel = LEVELS.find((l) => l.level === level.level + 1);
  const isMaxLevel = !nextLevel;

  return (
    <div className="relative overflow-hidden rounded-2xl border border-primary/20 backdrop-blur-lg">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-primary/10 to-accent/15" />
      <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent/10 blur-2xl" />
      <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-highlight/10 blur-xl" />

      <div className="relative z-10 p-5">
        {/* Level header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="relative">
              <motion.div
                className="w-14 h-14 rounded-2xl bg-primary/20 border border-primary/30 flex items-center justify-center text-2xl"
                animate={isMaxLevel ? { boxShadow: ["0 0 0 0 hsl(78 55% 28% / 0.2)", "0 0 0 8px hsl(78 55% 28% / 0)", "0 0 0 0 hsl(78 55% 28% / 0)"] } : {}}
                transition={isMaxLevel ? { duration: 2, repeat: Infinity } : {}}
              >
                {level.icon}
              </motion.div>
              <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
                <span className="text-[10px] font-black">{level.level}</span>
              </div>
            </div>

            <div>
              <div className="flex items-center gap-1.5">
                <p className="text-base font-bold text-foreground">{level.name}</p>
                {isMaxLevel && (
                  <motion.div
                    animate={{ rotate: [0, 15, -15, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity, repeatDelay: 2 }}
                  >
                    <Sparkles size={14} className="text-warning" />
                  </motion.div>
                )}
              </div>
              <p className="text-xs text-muted-foreground">Nível {level.level}</p>
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1 justify-end">
              <Zap size={14} className="text-warning" />
              <motion.span
                key={totalXp}
                initial={{ scale: 1.3, color: "hsl(38 92% 50%)" }}
                animate={{ scale: 1, color: "hsl(var(--foreground))" }}
                className="text-lg font-black"
              >
                {totalXp}
              </motion.span>
            </div>
            <p className="text-[10px] text-muted-foreground font-medium">XP total</p>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-1.5">
          <div className="flex justify-between text-[11px]">
            <span className="text-muted-foreground">
              {isMaxLevel ? "Nível máximo alcançado!" : `Próximo: ${nextLevel?.icon} ${nextLevel?.name}`}
            </span>
            <span className="font-semibold text-primary">
              {isMaxLevel ? "MAX" : `${Math.round(level.progressPercent)}%`}
            </span>
          </div>

          <div className="relative h-3 rounded-full bg-muted/60 overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: isMaxLevel
                  ? "linear-gradient(90deg, hsl(38 92% 50%), hsl(25 65% 42%), hsl(78 55% 28%))"
                  : "linear-gradient(90deg, hsl(78 55% 28%), hsl(140 50% 38%))",
              }}
              initial={{ width: 0 }}
              animate={{ width: `${level.progressPercent}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
            />
            {!isMaxLevel && level.progressPercent > 5 && (
              <motion.div
                className="absolute inset-y-0 w-8 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                animate={{ left: ["-10%", "110%"] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3, ease: "easeInOut" }}
              />
            )}
          </div>

          {!isMaxLevel && (
            <p className="text-[10px] text-muted-foreground text-center">
              {level.xpInLevel} / {level.xpNeeded} XP para o próximo nível
            </p>
          )}
        </div>

        {/* Level milestones */}
        <TooltipProvider delayDuration={0}>
          <div className="relative mt-3 pt-3 border-t border-border/30">
            <div className="absolute top-[calc(0.75rem+16px+4px)] left-[16px] right-[16px] h-[2px] bg-muted/40 rounded-full" />
            <motion.div
              className="absolute top-[calc(0.75rem+16px+4px)] left-[16px] h-[2px] rounded-full"
              style={{
                background: "linear-gradient(90deg, hsl(78 55% 28%), hsl(140 50% 38%))",
              }}
              initial={{ width: 0 }}
              animate={{
                width: (() => {
                  const completedSegments = level.level - 1;
                  const partialSegment = level.progressPercent / 100;
                  const totalSegments = LEVELS.length - 1;
                  const fillPercent = ((completedSegments + partialSegment) / totalSegments) * 100;
                  return `${Math.min(fillPercent, 100)}%`;
                })(),
              }}
              transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
            />

            <div className="relative flex items-center justify-between">
              {LEVELS.slice(0, 7).map((lvl, i) => {
                const isUnlocked = totalXp >= lvl.minXp;
                const isCurrent = lvl.level === level.level;
                const xpRemaining = lvl.minXp - totalXp;

                return (
                  <Tooltip key={lvl.level}>
                    <TooltipTrigger asChild>
                      <motion.div
                        className="flex flex-col items-center gap-0.5 cursor-pointer relative"
                        initial={{ opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + i * 0.08, duration: 0.4, ease: "easeOut" }}
                      >
                        {isCurrent && (
                          <motion.div
                            className="absolute -inset-1.5 rounded-2xl"
                            style={{
                              background: "radial-gradient(circle, hsl(78 55% 28% / 0.25) 0%, transparent 70%)",
                            }}
                            animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1.05, 0.95] }}
                            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                          />
                        )}
                        <motion.div
                          className={`relative w-9 h-9 rounded-xl flex items-center justify-center text-base transition-all ${
                            isCurrent
                              ? "bg-primary/25 border-2 border-primary shadow-md shadow-primary/20"
                              : isUnlocked
                              ? "bg-primary/15 border border-primary/30"
                              : "bg-muted/40 border border-border/30 grayscale opacity-40"
                          }`}
                          animate={isCurrent ? { scale: [1, 1.06, 1] } : {}}
                          transition={isCurrent ? { duration: 2.5, repeat: Infinity, ease: "easeInOut" } : {}}
                          whileHover={isUnlocked ? { scale: 1.15 } : { scale: 1.05 }}
                        >
                          {isUnlocked ? lvl.icon : <Star size={11} className="text-muted-foreground" />}
                        </motion.div>
                        <span
                          className={`text-[7px] font-medium leading-tight text-center max-w-[40px] truncate ${
                            isCurrent
                              ? "text-primary font-black text-[8px]"
                              : isUnlocked
                              ? "text-foreground/80"
                              : "text-muted-foreground/35"
                          }`}
                        >
                          {isCurrent ? "VOCÊ" : isUnlocked ? lvl.name : lvl.level}
                        </span>
                      </motion.div>
                    </TooltipTrigger>
                    <TooltipContent side="top" className="text-center space-y-0.5">
                      <p className="font-semibold text-xs">{lvl.icon} {lvl.name}</p>
                      <p className="text-[10px] text-muted-foreground">
                        {lvl.minXp === 0 ? "Nível inicial" : `A partir de ${lvl.minXp} XP`}
                      </p>
                      {isCurrent && (
                        <p className="text-[10px] text-primary font-bold mt-0.5">⭐ Seu nível atual</p>
                      )}
                      {isUnlocked && !isCurrent && (
                        <p className="text-[10px] text-primary font-medium mt-0.5">✓ Desbloqueado</p>
                      )}
                      {!isUnlocked && (
                        <p className="text-[10px] text-warning font-medium mt-0.5">
                          🔒 Faltam {xpRemaining} XP
                        </p>
                      )}
                    </TooltipContent>
                  </Tooltip>
                );
              })}
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center text-[11px] text-muted-foreground mt-2.5 font-medium"
            >
              {isMaxLevel ? (
                <span className="text-primary">✨ Você alcançou o nível máximo! Parabéns!</span>
              ) : (
                <>
                  Você está a{" "}
                  <span className="text-primary font-bold">
                    {(nextLevel?.minXp ?? 0) - totalXp} XP
                  </span>{" "}
                  do próximo nível{" "}
                  <span className="font-semibold">
                    {nextLevel?.icon} {nextLevel?.name}
                  </span>
                </>
              )}
            </motion.p>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};
