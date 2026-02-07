import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { CorpHeroSection } from "@/components/corporativo/CorpHeroSection";
import { CorpBeneficiosSection } from "@/components/corporativo/CorpBeneficiosSection";
import { CorpCasesSection } from "@/components/corporativo/CorpCasesSection";
import { CorpPlanosSection } from "@/components/corporativo/CorpPlanosSection";
import { CorpCTASection } from "@/components/corporativo/CorpCTASection";

const Corporativo = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <CorpHeroSection />
      <CorpBeneficiosSection />
      <CorpCasesSection />
      <CorpPlanosSection />
      <CorpCTASection />
      <LandingFooter />
    </div>
  );
};

export default Corporativo;
