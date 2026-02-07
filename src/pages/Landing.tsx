import { LandingHeader } from "@/components/landing/LandingHeader";
import { HeroSection } from "@/components/landing/HeroSection";
import { ServicosSection } from "@/components/landing/ServicosSection";
import { SobreSection } from "@/components/landing/SobreSection";
import { ContatoSection } from "@/components/landing/ContatoSection";
import { LandingFooter } from "@/components/landing/LandingFooter";

const Landing = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <HeroSection />
      <ServicosSection />
      <SobreSection />
      <ContatoSection />
      <LandingFooter />
    </div>
  );
};

export default Landing;
