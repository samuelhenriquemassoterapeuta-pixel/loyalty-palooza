import { useMemo } from "react";
import { useAgendamentos } from "@/hooks/useAgendamentos";
import { useUsuarioProtocolos, useFichas } from "@/hooks/useProtocolos";
import { useAchievementCelebration } from "@/hooks/useAchievementCelebration";
import { useAchievementProximityNotifier } from "@/hooks/useAchievementProximityNotifier";
import { NextAppointmentCard } from "./NextAppointmentCard";
import { StreakSummaryCard } from "./StreakSummaryCard";
import { AchievementBadges } from "./AchievementBadges";
import { NextAchievementsCard } from "./NextAchievementsCard";
import { XpMiniBar } from "./XpMiniBar";
import { ActiveBenefitsCard } from "./ActiveBenefitsCard";
import { AchievementCelebration } from "@/components/conquistas/AchievementCelebration";
import {
  differenceInDays,
  startOfDay,
  subDays,
} from "date-fns";

export const HomeDashboard = () => {
  const { getProximosAgendamentos } = useAgendamentos();
  const { protocoloAtivo } = useUsuarioProtocolos();

  const protocoloUsuarioId = protocoloAtivo?.id;
  const { fichas } = useFichas(protocoloUsuarioId);

  const proximoAgendamento = useMemo(() => {
    const proximos = getProximosAgendamentos();
    return proximos.length > 0 ? proximos[0] : null;
  }, [getProximosAgendamentos]);

  // Calculate streak from fichas
  const { streak, bestStreak } = useMemo(() => {
    if (!fichas || fichas.length === 0) return { streak: 0, bestStreak: 0 };

    const measurementDates = new Set(
      fichas.map((f) => startOfDay(new Date(f.data)).getTime())
    );

    // Current streak
    const lastDate = startOfDay(new Date(fichas[fichas.length - 1].data));
    const now = startOfDay(new Date());
    const isActive = differenceInDays(now, lastDate) <= 1;
    let currentStreak = 0;

    if (isActive) {
      let checkDate = lastDate;
      while (measurementDates.has(checkDate.getTime())) {
        currentStreak++;
        checkDate = subDays(checkDate, 1);
      }
    }

    // Best streak
    const sortedDates = Array.from(measurementDates).sort((a, b) => a - b);
    let tempStreak = 1;
    let best = sortedDates.length > 0 ? 1 : 0;
    for (let i = 1; i < sortedDates.length; i++) {
      const diff = (sortedDates[i] - sortedDates[i - 1]) / (1000 * 60 * 60 * 24);
      if (diff === 1) {
        tempStreak++;
        best = Math.max(best, tempStreak);
      } else {
        tempStreak = 1;
      }
    }
    best = Math.max(best, currentStreak);

    return { streak: currentStreak, bestStreak: best };
  }, [fichas]);

  const { achievements, totalUnlocked, celebration, dismiss } = useAchievementCelebration();

  // Monitor achievement proximity and create notifications
  useAchievementProximityNotifier(achievements);

  const protocoloNome = protocoloAtivo?.protocolos
    ? (protocoloAtivo.protocolos as { nome?: string }).nome ?? null
    : null;

  return (
    <div className="space-y-3">
      <NextAppointmentCard agendamento={proximoAgendamento} />
      <StreakSummaryCard
        streak={streak}
        bestStreak={bestStreak}
        protocoloNome={protocoloNome}
        hasActiveProtocol={!!protocoloAtivo}
      />
      <XpMiniBar achievements={achievements} />
      <ActiveBenefitsCard />
      <NextAchievementsCard achievements={achievements} />
      <AchievementBadges
        achievements={achievements}
        totalUnlocked={totalUnlocked}
      />
      <AchievementCelebration
        isOpen={!!celebration}
        achievement={celebration}
        onClose={dismiss}
      />
    </div>
  );
};
