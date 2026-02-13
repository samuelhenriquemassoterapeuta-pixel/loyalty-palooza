import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { CorpHeroSection } from "@/components/corporativo/CorpHeroSection";
import { CorpSecoesSection } from "@/components/corporativo/CorpSecoesSection";
import { CorpPlanosSection } from "@/components/corporativo/CorpPlanosSection";
import { CorpCTASection } from "@/components/corporativo/CorpCTASection";

const Corporativo = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <CorpHeroSection />
      <CorpSecoesSection />
      <CorpPlanosSection />
      <CorpCTASection />
      <LandingFooter />
    </div>
  );
};

export default Corporativo;
