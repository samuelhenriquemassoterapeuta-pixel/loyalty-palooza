import resinksCoinImg from "@/assets/resinks-coin.png";

/**
 * Resinks — moeda personalizada da Resinkra
 * Paridade: 1 Resink = R$ 1,00
 */

export const RESINKS_SYMBOL = "ℜ";
export const RESINKS_NAME = "Resinks";
export const RESINKS_COIN_IMG = resinksCoinImg;

/** Formata valor como moeda Resinks: "ℜ 25,00" */
export const formatResinks = (value: number): string => {
  const abs = Math.abs(value);
  const formatted = abs.toFixed(2).replace(".", ",");
  return `${RESINKS_SYMBOL} ${formatted}`;
};

/** Formata com sinal: "+ℜ 25,00" ou "-ℜ 10,00" */
export const formatResinksSigned = (value: number, type: "income" | "expense"): string => {
  const sign = type === "income" ? "+" : "-";
  return `${sign}${formatResinks(value)}`;
};
