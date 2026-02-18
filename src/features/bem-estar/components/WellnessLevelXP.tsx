import { motion } from "framer-motion";
import { Star, Zap } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const LEVELS = [
  { level: 1, name: "Iniciante", xpNeeded: 0, emoji: "🌱" },
  { level: 2, name: "Consciente", xpNeeded: 50, emoji: "🌿" },
  { level: 3, name: "Dedicado", xpNeeded: 150, emoji: "🌳" },
  { level: 4, name: "Consistente", xpNeeded: 350, emoji: "💎" },
  { level: 5, name: "Mestre", xpNeeded: 600, emoji: "🏆" },
  { level: 6, name: "Lenda", xpNeeded: 1000, emoji: "👑" },
];

function getLevel(xp: number) {
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (xp >= LEVELS[i].xpNeeded) return LEVELS[i];
  }
  return LEVELS[0];
}

function getNextLevel(xp: number) {
  const current = getLevel(xp);
  return LEVELS.find((l) => l.level === current.level + 1) || null;
}

export default function WellnessLevelXP() {
  const { user } = useAuth();

  const { data, isLoading } = useQuery({
    queryKey: ["wellness-level-xp", user?.id],
    enabled: !!user,
    queryFn: async () => {
      // Calculate XP from check-ins, streak, and achievements
      const { data: streakData } = await supabase
        .from("wellness_streaks")
        .select("total_checkins, melhor_streak")
        .eq("user_id", user!.id)
        .maybeSingle();

      const { data: achievements } = await supabase
        .from("wellness_conquistas_usuario")
        .select("id")
        .eq("user_id", user!.id);

      const checkinXP = (streakData?.total_checkins || 0) * 5; // 5 XP per checkin
      const streakXP = (streakData?.melhor_streak || 0) * 3; // 3 XP per best streak day
      const achievementXP = (achievements?.length || 0) * 25; // 25 XP per achievement

      const totalXP = checkinXP + streakXP + achievementXP;

      return {
        totalXP,
        checkinXP,
        streakXP,
        achievementXP,
        checkins: streakData?.total_checkins || 0,
        achievements: achievements?.length || 0,
      };
    },
  });

  if (isLoading || !data) return null;

  const level = getLevel(data.totalXP);
  const next = getNextLevel(data.totalXP);
  const xpInLevel = data.totalXP - level.xpNeeded;
  const xpForNext = next ? next.xpNeeded - level.xpNeeded : 1;
  const progress = next ? Math.min(Math.round((xpInLevel / xpForNext) * 100), 100) : 100;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-6"
    >
      <div className="rounded-2xl border border-primary/15 bg-card p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Star size={15} className="text-amber-500" />
            <p className="text-xs font-semibold text-foreground">Nível Wellness</p>
          </div>
          <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full flex items-center gap-1">
            <Zap size={9} /> {data.totalXP} XP
          </span>
        </div>

        <div className="flex items-center gap-3 mb-3">
          <div className="text-2xl">{level.emoji}</div>
          <div className="flex-1">
            <div className="flex items-center justify-between mb-0.5">
              <span className="text-xs font-bold text-foreground">
                Nível {level.level} — {level.name}
              </span>
              {next && (
                <span className="text-[9px] text-muted-foreground">
                  {xpInLevel}/{xpForNext} XP
                </span>
              )}
            </div>
            <div className="h-2 rounded-full bg-muted/40 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.8 }}
                className="h-full rounded-full bg-gradient-to-r from-amber-500/60 to-primary"
              />
            </div>
            {next && (
              <p className="text-[9px] text-muted-foreground mt-0.5">
                Próximo: {next.emoji} {next.name}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Check-ins", value: `${data.checkins}`, sub: `${data.checkinXP} XP` },
            { label: "Streak", value: "Bônus", sub: `${data.streakXP} XP` },
            { label: "Conquistas", value: `${data.achievements}`, sub: `${data.achievementXP} XP` },
          ].map((s) => (
            <div key={s.label} className="rounded-lg bg-muted/30 p-2 text-center">
              <p className="text-[10px] font-bold text-foreground">{s.value}</p>
              <p className="text-[8px] text-muted-foreground">{s.label}</p>
              <p className="text-[8px] text-primary font-medium">{s.sub}</p>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
