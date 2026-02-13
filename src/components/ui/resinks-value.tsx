import { RESINKS_COIN_IMG, formatResinks } from "@/lib/resinks";
import { cn } from "@/lib/utils";

interface ResinksCoinProps {
  size?: number;
  className?: string;
}

/** Ícone da moeda Resinks */
export const ResinksCoin = ({ size = 20, className }: ResinksCoinProps) => (
  <img
    src={RESINKS_COIN_IMG}
    alt="Resinks"
    width={size}
    height={size}
    className={cn("inline-block shrink-0 object-contain", className)}
  />
);

interface ResinksValueProps {
  value: number;
  size?: "sm" | "md" | "lg" | "xl";
  showCoin?: boolean;
  signed?: "income" | "expense";
  className?: string;
  hideValue?: boolean;
}

const sizeMap = {
  sm: { coin: 14, text: "text-sm" },
  md: { coin: 18, text: "text-base" },
  lg: { coin: 22, text: "text-lg" },
  xl: { coin: 28, text: "text-2xl" },
};

/** Exibe valor com ícone da moeda Resinks */
export const ResinksValue = ({
  value,
  size = "md",
  showCoin = true,
  signed,
  className,
  hideValue = false,
}: ResinksValueProps) => {
  const { coin, text } = sizeMap[size];
  const sign = signed === "income" ? "+" : signed === "expense" ? "-" : "";

  return (
    <span className={cn("inline-flex items-center gap-1", text, className)}>
      {showCoin && <ResinksCoin size={coin} />}
      <span>
        {hideValue ? "••••" : `${sign}${formatResinks(value)}`}
      </span>
    </span>
  );
};
