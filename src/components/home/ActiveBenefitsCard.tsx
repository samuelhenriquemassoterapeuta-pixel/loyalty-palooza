import { motion } from "framer-motion";
import { Tag, Percent, CalendarCheck, Sparkles, Crown } from "lucide-react";
import { useLevelBenefits } from "@/features/cashback/hooks/useLevelBenefits";
import { useNavigate } from "react-router-dom";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

export const ActiveBenefitsCard = () => {
  const navigate = useNavigate();
  const {
    level,
    levelName,
    levelIcon,
    storeDiscountPercent,
    cashbackBonusPercent,
    hasPriorityScheduling,
    hasEarlyAccess,
    isVip,
  } = useLevelBenefits();

  // Don't show if user has no benefits (level 1)
  if (level < 2) return null;

  const benefits = [
    storeDiscountPercent > 0 && {
      icon: Tag,
      label: `${storeDiscountPercent}% off na loja`,
      color: "text-primary",
    },
    cashbackBonusPercent > 0 && {
      icon: Percent,
      label: `+${cashbackBonusPercent}% bônus cashback`,
      color: "text-highlight",
    },
    hasPriorityScheduling && {
      icon: CalendarCheck,
      label: "Agendamento prioritário",
      color: "text-primary",
    },
    hasEarlyAccess && {
      icon: Sparkles,
      label: "Acesso antecipado",
      color: "text-primary",
    },
    isVip && {
      icon: Crown,
      label: "Clube VIP",
      color: "text-warning",
    },
  ].filter(Boolean) as { icon: typeof Tag; label: string; color: string }[];

  return (
    <motion.div variants={fadeUp} initial="hidden" animate="show">
      <button
        onClick={() => navigate("/conquistas")}
        className="w-full text-left glass-card rounded-2xl p-4 hover:shadow-elevated transition-shadow"
      >
        <div className="flex items-center gap-3 mb-3">
          <div className="w-9 h-9 rounded-xl bg-primary/15 flex items-center justify-center text-lg">
            {levelIcon}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-semibold text-foreground">
              Nível {levelName}
            </p>
            <p className="text-[11px] text-muted-foreground">
              Seus benefícios ativos
            </p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {benefits.map((b, i) => (
            <span
              key={i}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-muted/60 text-[11px] font-medium text-foreground"
            >
              <b.icon size={12} className={b.color} />
              {b.label}
            </span>
          ))}
        </div>
      </button>
    </motion.div>
  );
};
