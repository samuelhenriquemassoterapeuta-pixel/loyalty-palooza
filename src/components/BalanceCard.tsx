import { motion } from "framer-motion";
import { Eye, EyeOff, TrendingUp, Sparkles, Loader2 } from "lucide-react";
import { useState } from "react";
import { useTransacoes } from "@/hooks/useTransacoes";

export const BalanceCard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const { stats, loading } = useTransacoes();

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
      transition={{ duration: 0.5, type: "spring" as const, stiffness: 100 }}
      className="relative overflow-hidden rounded-3xl p-6 text-primary-foreground shadow-elevated"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 gradient-primary" />
      
      {/* Decorative elements */}
      <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-primary-foreground/5 blur-2xl" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 rounded-full bg-primary-foreground/5 blur-xl" />
      
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
          {loading ? (
            <div className="flex items-center gap-2">
              <Loader2 className="w-6 h-6 animate-spin" />
              <span className="text-lg opacity-70">Carregando...</span>
            </div>
          ) : (
            <h2 className="text-4xl font-bold tracking-tight font-serif">
              {showBalance ? formatCurrency(stats.saldo) : "R$ ••••••"}
            </h2>
          )}
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3 bg-primary-foreground/10 rounded-2xl px-4 py-3 backdrop-blur-sm"
        >
          <div className="p-2 rounded-xl bg-primary-foreground/10">
            <TrendingUp size={18} className="text-primary-foreground" />
          </div>
          <div className="flex-1">
            <p className="text-xs opacity-80">Cashback acumulado</p>
            <p className="font-semibold">
              {loading ? "..." : showBalance ? formatCurrency(stats.totalCashback) : "R$ ••••"}
            </p>
          </div>
          <div className="text-xs font-medium px-2 py-1 rounded-full bg-primary-foreground/20">
            +5%
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
};
