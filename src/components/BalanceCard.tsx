import { motion } from "framer-motion";
import { Eye, EyeOff, TrendingUp, Sparkles } from "lucide-react";
import { useState } from "react";
import { useTransacoes } from "@/hooks/useTransacoes";
import { BalanceCardSkeleton } from "@/components/skeletons";

export const BalanceCard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const { stats, loading } = useTransacoes();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  if (loading) {
    return <BalanceCardSkeleton />;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, type: "spring" as const, stiffness: 100 }}
      className="relative overflow-hidden rounded-3xl p-6 text-primary-foreground shadow-elevated"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-primary" />
      
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-accent/30 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-highlight/30 blur-xl" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full bg-primary-foreground/5 blur-3xl" />
      
      {/* Organic blob shape */}
      <motion.div 
        animate={{ 
          rotate: [0, 360],
          scale: [1, 1.1, 1]
        }}
        transition={{ 
          duration: 20, 
          repeat: Infinity, 
          ease: "linear" 
        }}
        className="absolute top-4 right-4 w-24 h-24 blob bg-primary-foreground/5"
      />
      
      {/* Content */}
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="opacity-80" />
            <span className="text-sm font-medium opacity-90">Saldo disponível</span>
          </div>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 rounded-full hover:bg-primary-foreground/10 transition-colors"
          >
            {showBalance ? <Eye size={20} /> : <EyeOff size={20} />}
          </motion.button>
        </div>

        <motion.div
          key={showBalance ? "visible" : "hidden"}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h2 className="text-4xl font-bold tracking-tight font-serif">
            {showBalance ? formatCurrency(stats.saldo) : "R$ ••••••"}
          </h2>
        </motion.div>

        {/* Cashback Card */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 bg-gradient-to-r from-accent/20 to-highlight/20 rounded-2xl px-4 py-3 backdrop-blur-sm border border-accent/20"
        >
          <div className="p-2 rounded-xl bg-accent/30 shadow-sm">
            <TrendingUp size={18} className="text-accent-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-xs opacity-80">Cashback acumulado</p>
            <p className="font-bold text-lg">
              {showBalance ? formatCurrency(stats.totalCashback) : "R$ ••••"}
            </p>
          </div>
          {stats.totalCashback > 0 && (
            <motion.div 
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-xs font-bold px-3 py-1.5 rounded-full bg-accent shadow-sm text-accent-foreground"
            >
              💰 Disponível
            </motion.div>
          )}
        </motion.div>
      </div>
    </motion.div>
  );
};
