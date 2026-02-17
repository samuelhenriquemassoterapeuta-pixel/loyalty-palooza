import { useNavigate } from "react-router-dom";
import { Building2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { LandingHeader } from "@/features/landing/components/LandingHeader";
import { HeroSection, HeroAuthButtons } from "@/features/landing/components/HeroSection";
import { ServicosSection } from "@/features/landing/components/ServicosSection";
import { HeadSpaSection } from "@/features/landing/components/HeadSpaSection";
import { PacotesSection } from "@/features/landing/components/PacotesSection";
import { DepoimentosSection } from "@/features/landing/components/DepoimentosSection";
import { SobreSection } from "@/features/landing/components/SobreSection";
import { ContatoSection } from "@/features/landing/components/ContatoSection";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { CollapsibleSection } from "@/features/landing/components/CollapsibleSection";
import heroBg from "@/assets/hero-options/hero-spa-resinkra.jpg";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <HeroSection />
      <HeroAuthButtons />

      {/* Banner Corporativo - Colapsável */}
      <section className="py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <CollapsibleSection
            id="corporativo"
            badge={
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Building2 size={14} className="text-primary" />
                <span className="text-xs font-semibold text-primary">Para empresas</span>
              </div>
            }
            title={
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
                Soluções{" "}
                <span className="font-serif italic text-gradient">Corporativas</span>
              </h2>
            }
            subtitle={
              <p className="text-muted-foreground">
                Massoterapia para empresas, eventos e programas de QVT
              </p>
            }
          >
            <button
              onClick={() => navigate("/corporativo")}
              className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-primary/90 to-primary text-primary-foreground shadow-elevated hover:shadow-glow transition-all"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="shrink-0 p-2.5 rounded-xl bg-primary-foreground/15">
                  <Building2 size={22} />
                </div>
                <div className="text-left">
                  <p className="font-bold text-sm sm:text-base">Conheça nossos planos corporativos</p>
                  <p className="text-xs sm:text-sm opacity-80">Bem-estar e produtividade para sua equipe</p>
                </div>
              </div>
              <ArrowRight size={20} className="shrink-0 opacity-70" />
            </button>
          </CollapsibleSection>
        </div>
      </section>
      <ServicosSection />
      <HeadSpaSection />
      <PacotesSection />
      <DepoimentosSection />
      <SobreSection />

      {/* Contato + Footer com imagem de fundo animada única */}
      <div className="relative overflow-hidden">
        <motion.img
          src={heroBg}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          animate={{
            scale: [1, 1.08, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <div className="absolute inset-0 bg-background/70 backdrop-blur-[1px]" />
        <div className="relative z-10">
          <ContatoSection />
          <LandingFooter />
        </div>
      </div>

      <FloatingContactButtons />
    </div>
  );
};

export default Landing;
