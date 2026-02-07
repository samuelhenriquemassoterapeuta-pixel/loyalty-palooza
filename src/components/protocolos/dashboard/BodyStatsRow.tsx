import { motion, type Variants } from "framer-motion";
import { TrendingDown, TrendingUp, Minus, Scale, Activity } from "lucide-react";
import type { ProgressStats } from "@/hooks/useProgressStats";
import type { LucideIcon } from "lucide-react";

interface BodyStatsRowProps {
  stats: ProgressStats;
  variants: Variants;
}

const TrendIcon = ({ value }: { value: number | null }) => {
  if (value == null) return <Minus size={14} className="text-muted-foreground" />;
  if (value < 0) return <TrendingDown size={14} className="text-highlight" />;
  if (value > 0) return <TrendingUp size={14} className="text-destructive" />;
  return <Minus size={14} className="text-muted-foreground" />;
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  unit,
  variation,
  variants,
}: {
  icon: LucideIcon;
  label: string;
  value: number | null;
  unit: string;
  variation: number | null;
  variants: Variants;
}) => (
  <motion.div variants={variants} className="p-3.5 rounded-xl bg-card border border-border space-y-2">
    <div className="flex items-center gap-1.5">
      <Icon size={13} className="text-muted-foreground" />
      <span className="text-[10px] text-muted-foreground uppercase tracking-wide">{label}</span>
    </div>
    {value != null ? (
      <>
        <p className="text-xl font-bold text-foreground">
          {value}
          <span className="text-xs font-normal text-muted-foreground ml-0.5">{unit}</span>
        </p>
        {variation != null && (
          <div className="flex items-center gap-1">
            <TrendIcon value={variation} />
            <span
              className={`text-xs font-medium ${
                variation < 0
                  ? "text-highlight"
                  : variation > 0
                    ? "text-destructive"
                    : "text-muted-foreground"
              }`}
            >
              {variation > 0 ? "+" : ""}
              {variation}{unit}
            </span>
            <span className="text-[10px] text-muted-foreground">total</span>
          </div>
        )}
      </>
    ) : (
      <p className="text-sm text-muted-foreground">Sem registro</p>
    )}
  </motion.div>
);

export const BodyStatsRow = ({ stats, variants }: BodyStatsRowProps) => (
  <div className="grid grid-cols-2 gap-3">
    <StatCard
      icon={Scale}
      label="Peso"
      value={stats.pesoAtual}
      unit="kg"
      variation={stats.variacaoPeso}
      variants={variants}
    />
    <StatCard
      icon={Activity}
      label="Cintura"
      value={stats.cinturaAtual}
      unit="cm"
      variation={stats.variacaoCintura}
      variants={variants}
    />
  </div>
);
