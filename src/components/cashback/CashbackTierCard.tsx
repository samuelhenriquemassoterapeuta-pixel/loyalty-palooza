import { motion } from "framer-motion";
import { Crown, ChevronRight, Sparkles } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { UserTier, TIER_CONFIG, TierName } from "@/hooks/useUserTier";

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

interface CashbackTierCardProps {
  tier: UserTier;
  showValues: boolean;
}

const tiers: { name: TierName; mult: string }[] = [
  { name: "Bronze", mult: "1x" },
  { name: "Prata", mult: "1.5x" },
  { name: "Ouro", mult: "2x" },
];

export const CashbackTierCard = ({ tier, showValues }: CashbackTierCardProps) => {
  const currentTierName = tier.tier_name as TierName;
  const config = TIER_CONFIG[currentTierName];
  const currentIndex = tiers.findIndex((t) => t.name === currentTierName);

  return (
    <div className="rounded-2xl glass-card-strong overflow-hidden">
      {/* Header */}
      <div className={`p-4 bg-gradient-to-r ${config.color} text-primary-foreground`}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-xl bg-primary-foreground/20 backdrop-blur-sm">
              <Crown size={20} />
            </div>
            <div>
              <p className="text-xs font-medium opacity-80">Seu nível</p>
              <h3 className="text-lg font-bold flex items-center gap-1.5">
                {config.emoji} {currentTierName}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs opacity-80">Multiplicador</p>
            <p className="text-2xl font-bold font-serif">{tier.tier_multiplier}x</p>
          </div>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Progress to next tier */}
        {tier.proximo_tier_nome && (
          <div>
            <div className="flex items-center justify-between text-xs mb-2">
              <span className="text-muted-foreground">
                Progresso para{" "}
                <span className="font-semibold text-foreground">
                  {TIER_CONFIG[tier.proximo_tier_nome as TierName]?.emoji}{" "}
                  {tier.proximo_tier_nome}
                </span>
              </span>
              <span className="font-semibold text-foreground">
                {showValues
                  ? `${formatCurrency(tier.total_gasto)} / ${formatCurrency(tier.proximo_tier_limite!)}`
                  : "••• / •••"}
              </span>
            </div>
            <Progress value={tier.progresso_percentual} className="h-2.5" />
            <p className="text-[10px] text-muted-foreground mt-1.5">
              {showValues
                ? `Faltam ${formatCurrency(tier.proximo_tier_limite! - tier.total_gasto)} para o próximo nível`
                : "••••••"}
            </p>
          </div>
        )}

        {tier.tier_name === "Ouro" && (
          <div className="flex items-center gap-2 p-3 rounded-xl bg-warning/10 border border-warning/30">
            <Sparkles size={16} className="text-warning shrink-0" />
            <p className="text-xs font-medium text-warning">
              Parabéns! Você atingiu o nível máximo com 2x de cashback!
            </p>
          </div>
        )}

        {/* Tier steps */}
        <div className="flex items-center gap-1">
          {tiers.map((t, i) => {
            const isActive = i <= currentIndex;
            const tConfig = TIER_CONFIG[t.name];
            return (
              <div key={t.name} className="flex-1 flex items-center gap-1">
                <div
                  className={`flex-1 flex flex-col items-center gap-1 p-2 rounded-xl transition-all ${
                    isActive
                      ? `${tConfig.bgLight} ${tConfig.borderColor} border`
                      : "bg-muted/50 border border-transparent"
                  }`}
                >
                  <span className="text-sm">{tConfig.emoji}</span>
                  <span
                    className={`text-[10px] font-semibold ${
                      isActive ? tConfig.textColor : "text-muted-foreground"
                    }`}
                  >
                    {t.name}
                  </span>
                  <span
                    className={`text-[9px] ${
                      isActive ? tConfig.textColor : "text-muted-foreground"
                    }`}
                  >
                    {t.mult}
                  </span>
                </div>
                {i < tiers.length - 1 && (
                  <ChevronRight
                    size={12}
                    className={isActive ? "text-foreground" : "text-muted-foreground/40"}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
