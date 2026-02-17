import { motion } from "framer-motion";
import { Trophy } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AchievementsSummaryProps {
  totalUnlocked: number;
  totalAchievements: number;
  categories: { name: string; unlocked: number; total: number; icon: string }[];
}

export const AchievementsSummary = ({
  totalUnlocked,
  totalAchievements,
  categories,
}: AchievementsSummaryProps) => {
  const overallProgress = Math.round((totalUnlocked / totalAchievements) * 100);

  return (
    <div className="rounded-2xl bg-gradient-to-br from-primary/15 via-primary/10 to-accent/10 border border-primary/20 p-5 backdrop-blur-lg">
      {/* Main stat */}
      <div className="flex items-center gap-4 mb-4">
        <div className="p-3 rounded-xl bg-primary/20">
          <Trophy className="text-primary" size={24} />
        </div>
        <div>
          <div className="flex items-baseline gap-1.5">
            <span className="text-3xl font-black text-foreground">
              {totalUnlocked}
            </span>
            <span className="text-sm text-muted-foreground">
              / {totalAchievements}
            </span>
          </div>
          <p className="text-xs text-muted-foreground">conquistas desbloqueadas</p>
        </div>
      </div>

      {/* Overall progress */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-muted-foreground">Progresso geral</span>
          <span className="font-semibold text-primary">{overallProgress}%</span>
        </div>
        <Progress value={overallProgress} className="h-2" />
      </div>

      {/* Category breakdown */}
      <div className="grid grid-cols-3 gap-2">
        {categories.map((cat) => (
          <div
            key={cat.name}
            className="flex items-center gap-2 p-2 rounded-lg glass-card"
          >
            <span className="text-base">{cat.icon}</span>
            <div className="min-w-0">
              <p className="text-xs font-medium text-foreground truncate">
                {cat.name}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {cat.unlocked}/{cat.total}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
