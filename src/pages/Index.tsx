import { Header } from "@/components/Header";
import { BalanceCard } from "@/components/BalanceCard";
import { QuickActions } from "@/components/QuickActions";
import { TransactionHistory } from "@/components/TransactionHistory";
import { BottomNavigation } from "@/components/BottomNavigation";
import { InstallBanner } from "@/components/InstallBanner";
import { ShareQRCode } from "@/components/ShareQRCode";
import { OnboardingTour, useOnboarding } from "@/components/OnboardingTour";
import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { Settings, Gift } from "lucide-react";
import { motion } from "framer-motion";

const Index = () => {
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const { showOnboarding, completeOnboarding } = useOnboarding();

  return (
    <>
      <OnboardingTour isOpen={showOnboarding} onComplete={completeOnboarding} />
      <div className="min-h-screen bg-background gradient-hero pb-24">
        <div className="max-w-lg mx-auto px-4 safe-top">
          <Header />
          
          <main className="space-y-6 mt-2">
            <InstallBanner />
            <BalanceCard />
            <QuickActions />
            
            {/* Referral Banner */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => navigate("/indicacoes")}
              className="w-full flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-accent/20 via-highlight/15 to-accent/20 border border-accent/30 hover:border-accent/50 hover:shadow-lg transition-all"
            >
              <div className="p-2.5 rounded-xl bg-accent/30 shadow-sm">
                <Gift className="text-accent" size={22} />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-foreground">Indique e Ganhe</p>
                <p className="text-xs text-muted-foreground">Ganhe R$ 10 por cada amigo indicado</p>
              </div>
              <div className="text-xs px-3 py-1.5 rounded-full bg-accent text-accent-foreground font-bold shadow-sm">
                R$ 10
              </div>
            </motion.button>

            {/* Share QR Code */}
            <ShareQRCode />
            {/* Admin Quick Access */}
            {isAdmin && (
              <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => navigate("/admin")}
                className="w-full flex items-center gap-3 p-4 rounded-2xl bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-primary/20 hover:border-primary/40 transition-all"
              >
                <div className="p-2 rounded-xl bg-primary/20">
                  <Settings className="text-primary" size={20} />
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-foreground">Painel Admin</p>
                  <p className="text-xs text-muted-foreground">Gerenciar produtos, serviços e pacotes</p>
                </div>
                <div className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
                  Admin
                </div>
              </motion.button>
            )}
            
            <TransactionHistory />
          </main>
        </div>
        
        <BottomNavigation />
      </div>
    </>
  );
};

export default Index;
