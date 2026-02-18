import { motion } from "framer-motion";
import { Flame, Gift, Lock } from "lucide-react";

const MILESTONES = [
  { days: 3, label: "3 dias", reward: "🎖️ Badge Iniciante", cashback: 1.5 },
  { days: 7, label: "7 dias", reward: "⚡ +1 Cromo Éter", cashback: 3.0 },
  { days: 14, label: "14 dias", reward: "🌟 Badge Dedicado", cashback: 5.0 },
  { days: 21, label: "21 dias", reward: "🧘 Hábito Formado", cashback: 8.0 },
  { days: 30, label: "30 dias", reward: "🏆 Badge Mestre", cashback: 15.0 },
];

interface Props {
  streakAtual: number;
}

const WellnessStreakMilestones = ({ streakAtual }: Props) => {
  if (streakAtual <= 0) return null;

  // Find next milestone
  const nextIdx = MILESTONES.findIndex(m => m.days > streakAtual);
  const next = nextIdx >= 0 ? MILESTONES[nextIdx] : null;
  const daysLeft = next ? next.days - streakAtual : 0;

  // Show last achieved + next 2
  const startIdx = Math.max(0, nextIdx - 1);
  const visible = MILESTONES.slice(startIdx, startIdx + 3);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.08 }}
      className="mb-4"
    >
      {next && (
        <p className="text-[10px] text-muted-foreground px-1 mb-2">
          <Flame size={10} className="inline text-primary mr-0.5" />
          Faltam <span className="font-bold text-foreground">{daysLeft} dia{daysLeft !== 1 ? "s" : ""}</span> para o próximo marco
        </p>
      )}

      <div className="flex gap-2">
        {visible.map((milestone) => {
          const achieved = streakAtual >= milestone.days;
          const isCurrent = next?.days === milestone.days;

          return (
            <div
              key={milestone.days}
              className={`flex-1 rounded-xl p-2.5 text-center border transition-all ${
                achieved
                  ? "border-primary/30 bg-primary/10"
                  : isCurrent
                  ? "border-primary/20 bg-accent/5"
                  : "border-border bg-card opacity-50"
              }`}
            >
              <div className="flex justify-center mb-1">
                {achieved ? (
                  <Gift size={16} className="text-primary" />
                ) : (
                  <Lock size={14} className="text-muted-foreground" />
                )}
              </div>
              <p className={`text-[10px] font-bold ${achieved ? "text-foreground" : "text-muted-foreground"}`}>
                {milestone.label}
              </p>
              <p className="text-[8px] text-muted-foreground leading-tight mt-0.5">
                {milestone.reward}
              </p>
              <p className={`text-[8px] mt-0.5 ${achieved ? "text-primary font-medium" : "text-muted-foreground"}`}>
                ℜ {milestone.cashback.toFixed(2)}
              </p>
            </div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default WellnessStreakMilestones;
