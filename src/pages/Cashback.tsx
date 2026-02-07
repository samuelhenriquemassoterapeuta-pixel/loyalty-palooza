import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useTransacoes } from "@/hooks/useTransacoes";
import { useUserTier } from "@/hooks/useUserTier";
import { AppLayout } from "@/components/AppLayout";
import { CashbackBalanceCard } from "@/components/cashback/CashbackBalanceCard";
import { CashbackTierCard } from "@/components/cashback/CashbackTierCard";
import { CashbackEvolutionChart } from "@/components/cashback/CashbackEvolutionChart";
import { CashbackHistoryList } from "@/components/cashback/CashbackHistoryList";
import { Skeleton } from "@/components/ui/skeleton";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

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
    <AppLayout>
      <div className="min-h-screen bg-background gradient-hero pb-24 lg:pb-8">
        <div className="max-w-lg lg:max-w-4xl mx-auto px-4 lg:px-8 safe-top pt-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-between mb-5"
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
            <motion.div
              variants={stagger}
              initial="hidden"
              animate="show"
              className="space-y-5"
            >
              {/* Balance Card */}
              <motion.div variants={fadeUp}>
                <CashbackBalanceCard
                  saldoDisponivel={cashbackStats.saldoDisponivel}
                  totalGanho={cashbackStats.totalGanho}
                  totalUsado={cashbackStats.totalUsado}
                  showValues={showValues}
                />
              </motion.div>

              {/* Tier Card */}
              {tier && (
                <motion.div variants={fadeUp}>
                  <CashbackTierCard tier={tier} showValues={showValues} />
                </motion.div>
              )}

              {/* How cashback works */}
              <motion.div variants={fadeUp} className="space-y-2.5">
                <p className="section-label px-1">Como funciona</p>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { emoji: "🛒", label: "Compras", desc: "Ganhe na loja" },
                    { emoji: "💆", label: "Sessões", desc: "Ganhe ao concluir" },
                    { emoji: "👥", label: "Indicações", desc: "Indique amigos" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="p-3 rounded-2xl glass-card text-center"
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <p className="font-semibold text-xs text-foreground mt-1">
                        {item.label}
                      </p>
                      <p className="text-[10px] text-muted-foreground">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              {/* Evolution Chart */}
              <motion.div variants={fadeUp} className="space-y-2.5">
                <p className="section-label px-1">Evolução</p>
                <CashbackEvolutionChart transacoes={transacoes} />
              </motion.div>

              {/* Transaction History */}
              <motion.div variants={fadeUp} className="space-y-2.5">
                <p className="section-label px-1">Movimentações</p>
                <CashbackHistoryList transacoes={transacoes} />
              </motion.div>
            </motion.div>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Cashback;
