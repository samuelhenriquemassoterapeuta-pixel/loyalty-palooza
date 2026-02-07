import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTransacoes } from "@/hooks/useTransacoes";
import { useUserTier } from "@/hooks/useUserTier";
import { BottomNavigation } from "@/components/BottomNavigation";
import { CashbackBalanceCard } from "@/components/cashback/CashbackBalanceCard";
import { CashbackTierCard } from "@/components/cashback/CashbackTierCard";
import { CashbackEvolutionChart } from "@/components/cashback/CashbackEvolutionChart";
import { CashbackHistoryList } from "@/components/cashback/CashbackHistoryList";
import { Skeleton } from "@/components/ui/skeleton";

const Cashback = () => {
  const navigate = useNavigate();
  const { transacoes, loading } = useTransacoes();
  const { tier, loading: tierLoading } = useUserTier();
  const [showValues, setShowValues] = useState(true);

  const cashbackStats = useMemo(() => {
    const totalGanho = transacoes
      .filter((t) => t.tipo === "cashback")
      .reduce((acc, t) => acc + Number(t.valor), 0);

    const totalUsado = Math.abs(
      transacoes
        .filter((t) => t.tipo === "uso_cashback")
        .reduce((acc, t) => acc + Number(t.valor), 0)
    );

    return {
      saldoDisponivel: totalGanho - totalUsado,
      totalGanho,
      totalUsado,
    };
  }, [transacoes]);

  return (
    <div className="min-h-screen bg-background gradient-hero pb-24">
      <div className="max-w-lg mx-auto px-4 safe-top pt-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-6"
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-muted/50 transition-colors"
            >
              <ArrowLeft size={22} className="text-foreground" />
            </button>
            <h1 className="text-xl font-bold text-foreground">Meu Cashback</h1>
          </div>
          <button
            onClick={() => setShowValues(!showValues)}
            className="p-2 rounded-xl hover:bg-muted/50 transition-colors"
          >
            {showValues ? (
              <Eye size={20} className="text-muted-foreground" />
            ) : (
              <EyeOff size={20} className="text-muted-foreground" />
            )}
          </button>
        </motion.div>

        {loading || tierLoading ? (
          <div className="space-y-4">
            <Skeleton className="h-48 rounded-3xl" />
            <Skeleton className="h-44 rounded-2xl" />
            <Skeleton className="h-20 rounded-2xl" />
            <Skeleton className="h-64 rounded-2xl" />
            <Skeleton className="h-40 rounded-2xl" />
          </div>
        ) : (
          <div className="space-y-5">
            {/* Balance Card */}
            <CashbackBalanceCard
              saldoDisponivel={cashbackStats.saldoDisponivel}
              totalGanho={cashbackStats.totalGanho}
              totalUsado={cashbackStats.totalUsado}
              showValues={showValues}
            />

            {/* Tier Card */}
            {tier && (
              <CashbackTierCard tier={tier} showValues={showValues} />
            )}

            {/* How cashback works */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="grid grid-cols-3 gap-2"
            >
              {[
                { emoji: "🛒", label: "Compras", desc: "Ganhe na loja" },
                { emoji: "💆", label: "Sessões", desc: "Ganhe ao concluir" },
                { emoji: "👥", label: "Indicações", desc: "Indique amigos" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="p-3 rounded-2xl bg-card shadow-card text-center"
                >
                  <span className="text-2xl">{item.emoji}</span>
                  <p className="font-semibold text-xs text-foreground mt-1">{item.label}</p>
                  <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </motion.div>

            {/* Evolution Chart */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <CashbackEvolutionChart transacoes={transacoes} />
            </motion.div>

            {/* Transaction History */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <CashbackHistoryList transacoes={transacoes} />
            </motion.div>
          </div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Cashback;
