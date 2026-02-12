import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Building2, ArrowRight } from "lucide-react";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { ServicosSection } from "@/components/landing/ServicosSection";
import { HeadSpaSection } from "@/components/landing/HeadSpaSection";
import { PacotesSection } from "@/components/landing/PacotesSection";
import { DepoimentosSection } from "@/components/landing/DepoimentosSection";
import { SobreSection } from "@/components/landing/SobreSection";
import { ContatoSection } from "@/components/landing/ContatoSection";
import { LandingFooter } from "@/components/landing/LandingFooter";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <HeroSection />

      {/* Banner Corporativo */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            onClick={() => navigate("/corporativo")}
            className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-elevated hover:shadow-glow transition-all"
          >
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="shrink-0 p-2.5 rounded-xl bg-primary-foreground/15">
                <Building2 size={22} />
              </div>
              <div className="text-left">
                <p className="font-bold text-sm sm:text-base">Soluções Corporativas</p>
                <p className="text-xs sm:text-sm opacity-80">Massoterapia para empresas, eventos e programas de QVT</p>
              </div>
            </div>
            <ArrowRight size={20} className="shrink-0 opacity-70" />
          </motion.button>
        </div>
      </section>
      <ServicosSection />
      <HeadSpaSection />
      <PacotesSection />
      <DepoimentosSection />
      <SobreSection />
      <ContatoSection />
      <LandingFooter />
    </div>
  );
};

export default Landing;
