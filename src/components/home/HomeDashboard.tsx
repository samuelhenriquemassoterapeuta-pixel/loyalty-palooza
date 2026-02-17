import { useMemo } from "react";
import { motion } from "framer-motion";
import { useAgendamentos } from "@/features/agendamentos/hooks/useAgendamentos";
import { useUsuarioProtocolos, useFichas } from "@/features/protocolos/hooks/useProtocolos";
import { useAchievementCelebration } from "@/features/conquistas/hooks/useAchievementCelebration";
import { useAchievementProximityNotifier } from "@/features/conquistas/hooks/useAchievementProximityNotifier";
import { NextAppointmentCard } from "./NextAppointmentCard";
import { StreakSummaryCard } from "./StreakSummaryCard";
import { AchievementBadges } from "./AchievementBadges";
import { NextAchievementsCard } from "./NextAchievementsCard";
import { XpMiniBar } from "./XpMiniBar";
import { ActiveBenefitsCard } from "./ActiveBenefitsCard";
import { CollapsibleDashboardSection } from "./CollapsibleDashboardSection";
import { PromoBanner } from "./PromoBanner";
import { AchievementCelebration } from "@/features/conquistas/components/AchievementCelebration";
import {
  differenceInDays,
  startOfDay,
  subDays,
} from "date-fns";

const stagger = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as const } },
};

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
  useAchievementProximityNotifier(achievements);

  const protocoloNome = protocoloAtivo?.protocolos
    ? (protocoloAtivo.protocolos as { nome?: string }).nome ?? null
    : null;

  return (
    <motion.div
      className="space-y-6"
      variants={stagger}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={fadeUp}>
        <PromoBanner />
      </motion.div>

      <motion.div variants={fadeUp}>
        <CollapsibleDashboardSection title="Agenda & Streak" defaultOpen={false}>
          <div className="space-y-3">
            <NextAppointmentCard agendamento={proximoAgendamento} />
            <StreakSummaryCard
              streak={streak}
              bestStreak={bestStreak}
              protocoloNome={protocoloNome}
              hasActiveProtocol={!!protocoloAtivo}
            />
          </div>
        </CollapsibleDashboardSection>
      </motion.div>

      <motion.div variants={fadeUp}>
        <CollapsibleDashboardSection title="Nível & Benefícios" defaultOpen={false}>
          <div className="space-y-3">
            <XpMiniBar achievements={achievements} />
            <ActiveBenefitsCard />
          </div>
        </CollapsibleDashboardSection>
      </motion.div>

      <motion.div variants={fadeUp}>
        <CollapsibleDashboardSection title="Conquistas" defaultOpen={false}>
          <div className="space-y-3">
            <NextAchievementsCard achievements={achievements} />
            <AchievementBadges
              achievements={achievements}
              totalUnlocked={totalUnlocked}
            />
          </div>
        </CollapsibleDashboardSection>
      </motion.div>

      <AchievementCelebration
        isOpen={!!celebration}
        achievement={celebration}
        onClose={dismiss}
      />
    </motion.div>
  );
};
