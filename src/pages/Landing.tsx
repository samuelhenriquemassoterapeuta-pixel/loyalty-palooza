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
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <HeroSection />
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
