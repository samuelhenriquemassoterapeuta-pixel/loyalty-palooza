import { motion } from "framer-motion";
import { Plus, CreditCard, Send } from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { useTransacoes } from "@/hooks/useTransacoes";
import { useProfile } from "@/hooks/useProfile";
import { useNavigate } from "react-router-dom";
import { WalletPageSkeleton } from "@/components/skeletons";

const Wallet = () => {
  const navigate = useNavigate();
  const { stats, loading } = useTransacoes();
  const { profile } = useProfile();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(value);
  };

  const displayName = profile?.nome || "Usuário";

  if (loading) {
    return (
      <AppLayout>
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <div className="max-w-lg lg:max-w-4xl mx-auto px-4 lg:px-8 safe-top pt-4">
          <WalletPageSkeleton />
        </div>
      </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
    <div className="min-h-screen bg-background pb-24 lg:pb-8">
      <div className="max-w-lg lg:max-w-4xl mx-auto px-4 lg:px-8 safe-top pt-4">
        <motion.h1
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-2xl font-bold text-foreground mb-6"
        >
          Carteira
        </motion.h1>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="gradient-primary rounded-2xl p-6 text-primary-foreground mb-6"
        >
          <p className="text-sm opacity-80 mb-1">Saldo total</p>
          <h2 className="text-4xl font-bold mb-4">{formatCurrency(stats.saldo)}</h2>
          
          <div className="flex gap-3">
            <Button 
              variant="secondary" 
              className="flex-1 bg-primary-foreground/20 text-primary-foreground border-0 hover:bg-primary-foreground/30"
              onClick={() => navigate("/transferir")}
            >
              <Send size={18} className="mr-2" />
              Transferir
            </Button>
          </div>
        </motion.div>

        {/* Cards Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-foreground">Meus Cartões</h3>
            <button className="text-sm font-medium text-primary flex items-center gap-1">
              <Plus size={16} /> Adicionar
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
        </motion.section>

        {/* Stats */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6"
        >
          <h3 className="text-lg font-bold text-foreground mb-4">Resumo do mês</h3>
          
          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-card shadow-card">
              <p className="text-sm text-muted-foreground mb-1">Total gasto</p>
              <p className="text-xl font-bold text-foreground">{formatCurrency(stats.totalGasto)}</p>
            </div>
            <div className="p-4 rounded-2xl bg-card shadow-card">
              <p className="text-sm text-muted-foreground mb-1">Cashback ganho</p>
              <p className="text-xl font-bold text-primary">{formatCurrency(stats.totalCashback)}</p>
            </div>
          </div>
        </motion.section>
      </div>

    </div>
    </AppLayout>
  );
};

export default Wallet;
