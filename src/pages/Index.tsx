import { Header } from "@/components/Header";
import { BalanceCard } from "@/components/BalanceCard";
import { QuickActions } from "@/components/QuickActions";
import { TransactionHistory } from "@/components/TransactionHistory";
import { InstallBanner } from "@/components/InstallBanner";
import { ShareQRCode } from "@/components/ShareQRCode";
import { OnboardingTour, useOnboarding } from "@/components/OnboardingTour";
import { AppLayout } from "@/components/AppLayout";
import { HomeDashboard } from "@/components/home/HomeDashboard";
import { useAdmin } from "@/hooks/useAdmin";
import { useNavigate } from "react-router-dom";
import { Settings, Gift, Building2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

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

const Index = () => {
  const { isAdmin } = useAdmin();
  const navigate = useNavigate();
  const { showOnboarding, completeOnboarding } = useOnboarding();

  return (
    <>
      <OnboardingTour isOpen={showOnboarding} onComplete={completeOnboarding} />
      <AppLayout>
        <div className="min-h-screen bg-background gradient-hero pb-24 lg:pb-8">
          <div className="max-w-lg lg:max-w-5xl xl:max-w-6xl mx-auto px-4 lg:px-8 safe-top">
            <Header />

            <motion.main
              variants={stagger}
              initial="hidden"
              animate="show"
              className="mt-1"
            >
              {/* Desktop: 2-column layout */}
              <div className="lg:grid lg:grid-cols-5 lg:gap-8">
                {/* Left column - main content */}
                <div className="lg:col-span-3 space-y-5">
                  <motion.div variants={fadeUp}>
                    <InstallBanner />
                  </motion.div>

                  <motion.div variants={fadeUp}>
                    <BalanceCard />
                  </motion.div>

                  {/* Section: Ações rápidas */}
                  <motion.div variants={fadeUp} className="space-y-2.5">
                    <p className="section-label px-1">Ações rápidas</p>
                    <QuickActions />
                  </motion.div>

                  {/* Section: Seu progresso */}
                  <motion.div variants={fadeUp} className="space-y-2.5">
                    <p className="section-label px-1">Seu progresso</p>
                    <HomeDashboard />
                  </motion.div>

                  {/* Corporativo Highlight Banner */}
                  <motion.button
                    variants={fadeUp}
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => navigate("/corporativo")}
                    className="w-full relative overflow-hidden flex items-center gap-4 p-5 rounded-2xl bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-glow hover:shadow-elevated transition-all duration-300"
                  >
                    <div className="absolute -right-6 -top-6 w-24 h-24 bg-primary-foreground/5 rounded-full blur-xl" />
                    <div className="p-3 rounded-xl bg-primary-foreground/15 shadow-sm">
                      <Building2 size={24} className="drop-shadow-sm" />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-bold text-base">Corporativo</p>
                      <p className="text-xs opacity-80">
                        Bem-estar para sua empresa — planos sob medida
                      </p>
                    </div>
                    <ArrowRight size={18} className="opacity-70" />
                  </motion.button>

                  {/* Referral Banner */}
                  <motion.button
                    variants={fadeUp}
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ scale: 1.01 }}
                    onClick={() => navigate("/indicacoes")}
                    className="w-full flex items-center gap-3 p-4 rounded-2xl glass-card-strong hover:shadow-elevated transition-all duration-300"
                  >
                    <div className="p-2.5 rounded-xl bg-accent/25 shadow-sm">
                      <Gift className="text-accent" size={22} />
                    </div>
                    <div className="flex-1 text-left">
                      <p className="font-semibold text-foreground">Indique e Ganhe</p>
                      <p className="text-xs text-muted-foreground">
                        Ganhe R$ 10 por cada amigo indicado
                      </p>
                    </div>
                    <div className="text-xs px-3 py-1.5 rounded-full gradient-accent text-accent-foreground font-bold shadow-sm">
                      R$ 10
                    </div>
                  </motion.button>
                </div>

                {/* Right column - sidebar content */}
                <div className="lg:col-span-2 space-y-5 mt-6 lg:mt-0">
                  {/* Share QR Code */}
                  <motion.div variants={fadeUp}>
                    <ShareQRCode />
                  </motion.div>

                  {/* Admin Quick Access */}
                  {isAdmin && (
                    <motion.button
                      variants={fadeUp}
                      whileTap={{ scale: 0.98 }}
                      whileHover={{ scale: 1.01 }}
                      onClick={() => navigate("/admin")}
                      className="w-full flex items-center gap-3 p-4 rounded-2xl glass-card-strong hover:shadow-elevated transition-all duration-300"
                    >
                      <div className="p-2 rounded-xl bg-primary/20">
                        <Settings className="text-primary" size={20} />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-semibold text-foreground">Painel Admin</p>
                        <p className="text-xs text-muted-foreground">
                          Gerenciar produtos, serviços e pacotes
                        </p>
                      </div>
                      <div className="text-xs px-2 py-1 rounded-full bg-primary/20 text-primary font-medium">
                        Admin
                      </div>
                    </motion.button>
                  )}

                  {/* Section: Histórico */}
                  <motion.div variants={fadeUp} className="space-y-2.5">
                    <TransactionHistory />
                  </motion.div>
                </div>
              </div>
            </motion.main>
          </div>
        </div>
      </AppLayout>
    </>
  );
};

export default Index;
