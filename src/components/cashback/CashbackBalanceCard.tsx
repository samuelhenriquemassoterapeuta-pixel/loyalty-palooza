import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { TrendingUp, TrendingDown, Sparkles } from "lucide-react";

interface CashbackBalanceCardProps {
  saldoDisponivel: number;
  totalGanho: number;
  totalUsado: number;
  showValues: boolean;
}

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(value);

export const CashbackBalanceCard = ({
  saldoDisponivel,
  totalGanho,
  totalUsado,
  showValues,
}: CashbackBalanceCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  // Parallax layers: background orbs move at different speeds
  const orbY1 = useTransform(scrollYProgress, [0, 1], ["-30%", "30%"]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], ["20%", "-20%"]);
  const orbScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1.1, 0.95]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "8%"]);

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative overflow-hidden rounded-3xl p-6 text-primary-foreground"
    >
      {/* Background */}
      <div className="absolute inset-0 gradient-primary" />
      <motion.div
        style={{ y: orbY1, scale: orbScale }}
        className="absolute -top-16 -right-16 w-40 h-40 rounded-full bg-primary-foreground/10 blur-2xl"
      />
      <motion.div
        style={{ y: orbY2, scale: orbScale }}
        className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-accent/20 blur-xl"
      />

      <motion.div style={{ y: contentY }} className="relative z-10">
        {/* Balance */}
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} className="opacity-80" />
          <span className="text-sm font-medium opacity-90">Saldo de cashback</span>
        </div>

        <h2 className="text-4xl font-bold tracking-tight font-serif mb-6">
          {showValues ? formatCurrency(saldoDisponivel) : "R$ ••••••"}
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
                {showValues ? formatCurrency(totalGanho) : "••••"}
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
                {showValues ? formatCurrency(totalUsado) : "••••"}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
