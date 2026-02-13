import { useNavigate } from "react-router-dom";
import { Building2, ArrowRight } from "lucide-react";
import { FloatingContactButtons } from "@/components/FloatingContactButtons";
import { LandingHeader } from "@/components/landing/LandingHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { ServicosSection } from "@/components/landing/ServicosSection";
import { HeadSpaSection } from "@/components/landing/HeadSpaSection";
import { PacotesSection } from "@/components/landing/PacotesSection";
import { DepoimentosSection } from "@/components/landing/DepoimentosSection";
import { SobreSection } from "@/components/landing/SobreSection";
import { ContatoSection } from "@/components/landing/ContatoSection";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { CollapsibleSection } from "@/components/landing/CollapsibleSection";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <HeroSection />

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
      <ContatoSection />
      <LandingFooter />
      <FloatingContactButtons />
    </div>
  );
};

export default Landing;
