import { CalendarCheck } from "lucide-react";
import { useLevelBenefits } from "@/features/cashback/hooks/useLevelBenefits";

export const PriorityBanner = () => {
  const { hasPriorityScheduling, levelName, levelIcon } = useLevelBenefits();

  if (!hasPriorityScheduling) return null;

  return (
    <div className="flex items-center gap-3 p-3 rounded-2xl bg-primary/10 border border-primary/20">
      <div className="w-9 h-9 rounded-xl bg-primary/20 flex items-center justify-center text-lg shrink-0">
        {levelIcon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-sm font-semibold text-primary flex items-center gap-1.5">
          <CalendarCheck size={14} />
          Agendamento Prioritário
        </p>
        <p className="text-xs text-muted-foreground">
          Nível {levelName} — Prioridade na confirmação
        </p>
      </div>
    </div>
  );
};
