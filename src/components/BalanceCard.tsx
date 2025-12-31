import { motion } from "framer-motion";
import { Eye, EyeOff, TrendingUp } from "lucide-react";
import { useState } from "react";

interface BalanceCardProps {
  balance: number;
  pendingCashback: number;
}

export const BalanceCard = ({ balance, pendingCashback }: BalanceCardProps) => {
  const [showBalance, setShowBalance] = useState(true);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="gradient-primary rounded-2xl p-6 text-primary-foreground shadow-elevated"
    >
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium opacity-90">Saldo disponível</span>
        <button
          onClick={() => setShowBalance(!showBalance)}
          className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
        >
          {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
        </button>
      </div>

      <motion.div
        key={showBalance ? "visible" : "hidden"}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="mb-6"
      >
        <h2 className="text-4xl font-bold tracking-tight">
          {showBalance ? formatCurrency(balance) : "R$ ••••••"}
        </h2>
      </motion.div>

      <div className="flex items-center gap-2 bg-primary-foreground/10 rounded-xl px-4 py-3">
        <TrendingUp size={18} className="text-accent" />
        <div>
          <p className="text-xs opacity-80">Cashback pendente</p>
          <p className="font-semibold">
            {showBalance ? formatCurrency(pendingCashback) : "R$ ••••"}
          </p>
        </div>
      </div>
    </motion.div>
  );
};
