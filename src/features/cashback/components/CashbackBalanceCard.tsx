import { motion } from "framer-motion";
import { TrendingUp, TrendingDown } from "lucide-react";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { formatResinks, RESINKS_SYMBOL } from "@/lib/resinks";
import { ResinksCoin } from "@/components/ui/resinks-value";

interface CashbackBalanceCardProps {
  saldoDisponivel: number;
  totalGanho: number;
  totalUsado: number;
  showValues: boolean;
}

export const CashbackBalanceCard = ({
  saldoDisponivel,
  totalGanho,
  totalUsado,
  showValues,
}: CashbackBalanceCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl p-6 text-primary-foreground"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-primary" />
      <div className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary-foreground/10 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-accent/20 blur-xl" />

      <div className="relative z-10">
        {/* Balance */}
        <div className="flex items-center gap-2 mb-2">
          <ResinksCoin size={20} className="opacity-90" />
          <span className="text-sm font-medium opacity-90">Saldo Resinks</span>
        </div>

        <h2 className="text-4xl font-bold tracking-tight font-serif mb-6">
          {showValues ? (
            <AnimatedCounter value={saldoDisponivel} format={formatResinks} duration={1.4} />
          ) : (
            `${RESINKS_SYMBOL} ••••••`
          )}
        </h2>

        {/* Stats row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="flex items-center gap-2 bg-primary-foreground/10 rounded-2xl px-4 py-3 backdrop-blur-sm">
            <div className="p-1.5 rounded-lg bg-highlight/30">
              <TrendingUp size={16} />
            </div>
            <div>
              <p className="text-[10px] opacity-70">Total ganho</p>
              <p className="font-bold text-sm">
                {showValues ? (
                  <AnimatedCounter value={totalGanho} format={formatResinks} duration={1} />
                ) : "••••"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 bg-primary-foreground/10 rounded-2xl px-4 py-3 backdrop-blur-sm">
            <div className="p-1.5 rounded-lg bg-accent/30">
              <TrendingDown size={16} />
            </div>
            <div>
              <p className="text-[10px] opacity-70">Total usado</p>
              <p className="font-bold text-sm">
                {showValues ? (
                  <AnimatedCounter value={totalUsado} format={formatResinks} duration={1} />
                ) : "••••"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
