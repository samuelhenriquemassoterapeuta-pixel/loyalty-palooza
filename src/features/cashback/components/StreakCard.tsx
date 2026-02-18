import { Flame, Trophy, Zap } from "lucide-react";
import { useUserStreak } from "@/features/cashback/hooks/useUserStreak";
import { formatResinks } from "@/lib/resinks";

export const StreakCard = () => {
  const { streak, nextMilestone, nextBonus, loading } = useUserStreak();

  if (loading) return null;

  const { streak_atual, melhor_streak } = streak;

  // Show flame icons for current streak
  const flameCount = Math.min(streak_atual, 12);
  const progressToNext = nextMilestone
    ? Math.round((streak_atual / nextMilestone) * 100)
    : 100;

  return (
    <div className="glass-card rounded-2xl p-4 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Flame
            size={20}
            className={streak_atual > 0 ? "text-warning" : "text-muted-foreground"}
          />
          <span className="font-semibold text-sm text-foreground">
            Streak Semanal
          </span>
        </div>
        <span className="text-2xl font-bold text-foreground">
          {streak_atual}
          <span className="text-xs text-muted-foreground font-normal ml-1">semanas</span>
        </span>
      </div>

      {/* Flame indicators */}
      {streak_atual > 0 && (
        <div className="flex gap-1">
          {Array.from({ length: Math.min(flameCount, 12) }).map((_, i) => (
            <span key={i} className="text-sm">
              🔥
            </span>
          ))}
        </div>
      )}

      {/* Progress to next milestone */}
      {nextMilestone && (
        <div>
          <div className="flex items-center justify-between text-xs mb-1">
            <span className="text-muted-foreground">
              Próximo bônus: {nextMilestone} semanas
            </span>
            <span className="text-primary font-medium">
              +{formatResinks(nextBonus!)}
            </span>
          </div>
          <div className="h-1.5 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-warning to-primary rounded-full transition-all"
              style={{ width: `${Math.min(progressToNext, 100)}%` }}
            />
          </div>
        </div>
      )}

      {/* Stats */}
      <div className="flex items-center gap-4 pt-1">
        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
          <Trophy size={12} />
          <span>Recorde: {melhor_streak} sem.</span>
        </div>
        {streak.bonus_total_creditado > 0 && (
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Zap size={12} />
            <span>Total ganho: {formatResinks(streak.bonus_total_creditado)}</span>
          </div>
        )}
      </div>

      {streak_atual === 0 && (
        <p className="text-xs text-muted-foreground text-center">
          Conclua uma sessão por semana para iniciar seu streak! 💪
        </p>
      )}
    </div>
  );
};
