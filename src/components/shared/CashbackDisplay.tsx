import { Wallet } from "lucide-react";

interface CashbackDisplayProps {
  valor: number;
  tier?: "bronze" | "prata" | "ouro";
  size?: "sm" | "md" | "lg";
  showIcon?: boolean;
}

const TIER_COLORS = {
  bronze: "text-amber-700",
  prata: "text-gray-500",
  ouro: "text-yellow-500",
};

const SIZE_CLASSES = {
  sm: "text-sm",
  md: "text-lg",
  lg: "text-3xl font-bold",
};

export function CashbackDisplay({
  valor,
  tier,
  size = "md",
  showIcon = true,
}: CashbackDisplayProps) {
  return (
    <div className={`flex items-center gap-1.5 ${tier ? TIER_COLORS[tier] : "text-green-600"}`}>
      {showIcon && <Wallet className={size === "lg" ? "h-7 w-7" : "h-4 w-4"} />}
      <span className={SIZE_CLASSES[size]}>
        R$ {valor.toFixed(2).replace(".", ",")}
      </span>
    </div>
  );
}
