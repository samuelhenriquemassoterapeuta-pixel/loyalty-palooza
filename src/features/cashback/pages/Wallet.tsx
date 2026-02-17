import { motion } from "framer-motion";
import { Plus, CreditCard, Send } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { AnimatedCounter } from "@/components/ui/animated-counter";
import { useTransacoes } from "@/features/cashback/hooks/useTransacoes";
import { useProfile } from "@/hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { WalletPageSkeleton } from "@/components/skeletons";
import { formatResinks, RESINKS_SYMBOL } from "@/lib/resinks";
import { ResinksCoin } from "@/components/ui/resinks-value";

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

const Wallet = () => {
  const navigate = useNavigate();
  const { stats, loading } = useTransacoes();
  const { profile } = useProfile();

  const displayName = profile?.nome || "Usuário";

  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-background gradient-hero pb-24 lg:pb-8">
          <div className="max-w-lg lg:max-w-4xl mx-auto px-4 lg:px-8 safe-top pt-4">
            <WalletPageSkeleton />
          </div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-background gradient-hero pb-24 lg:pb-8">
        <div className="max-w-lg lg:max-w-4xl mx-auto px-4 lg:px-8 safe-top pt-4">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-5"
          >
            <motion.h1
              variants={fadeUp}
              className="text-2xl font-bold text-foreground"
            >
              Carteira
            </motion.h1>

            {/* Balance Card */}
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-3xl p-6 text-primary-foreground"
            >
              <div className="absolute inset-0 gradient-primary" />
              <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-accent/20 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-highlight/20 blur-xl" />
              
              <div className="relative z-10">
                <div className="flex items-center gap-2 mb-1">
                  <ResinksCoin size={18} className="opacity-90" />
                  <p className="text-sm opacity-80">Saldo total</p>
                </div>
                <h2 className="text-4xl font-bold font-serif mb-4">
                  <AnimatedCounter value={stats.saldo} format={formatResinks} duration={1.4} />
                </h2>
                
                <div className="flex gap-3">
                  <Button 
                    variant="secondary" 
                    className="flex-1 bg-primary-foreground/20 text-primary-foreground border-0 hover:bg-primary-foreground/30 rounded-xl"
                    onClick={() => navigate("/transferir")}
                  >
                    <Send size={18} className="mr-2" />
                    Transferir
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Cards Section */}
            <motion.div variants={fadeUp} className="space-y-2.5">
              <div className="flex items-center justify-between px-1">
                <p className="section-label">Meus Cartões</p>
                <button className="text-xs font-medium text-primary flex items-center gap-1">
                  <Plus size={14} /> Adicionar
                </button>
              </div>

              <div className="space-y-3">
                {/* Virtual Card */}
                <div className="relative overflow-hidden rounded-2xl p-5 gradient-accent text-accent-foreground">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-8">
                      <span className="text-sm font-medium">Cartão Virtual</span>
                      <CreditCard size={24} />
                    </div>
                    <p className="text-lg font-mono tracking-wider mb-4">•••• •••• •••• 4532</p>
                    <div className="flex justify-between items-end">
                      <div>
                        <p className="text-[10px] opacity-70">TITULAR</p>
                        <p className="text-sm font-medium uppercase">{displayName}</p>
                      </div>
                      <div>
                        <p className="text-[10px] opacity-70">VALIDADE</p>
                        <p className="text-sm font-medium">12/28</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Add Card Button */}
                <button className="w-full p-4 rounded-2xl border-2 border-dashed border-border flex items-center justify-center gap-2 text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                  <Plus size={20} />
                  <span className="font-medium">Adicionar cartão físico</span>
                </button>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="space-y-2.5">
              <p className="section-label px-1">Resumo do mês</p>
              
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl glass-card-strong">
                  <p className="text-xs text-muted-foreground mb-1">Total gasto</p>
                  <p className="text-xl font-bold font-serif text-foreground">
                    <AnimatedCounter value={stats.totalGasto} format={formatResinks} />
                  </p>
                </div>
                <div className="p-4 rounded-2xl glass-card-strong">
                  <p className="text-xs text-muted-foreground mb-1">Resinks ganhos</p>
                  <p className="text-xl font-bold font-serif text-primary">
                    <AnimatedCounter value={stats.totalCashback} format={formatResinks} />
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Wallet;
