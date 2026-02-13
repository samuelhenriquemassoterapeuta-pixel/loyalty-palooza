import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { CorpHeroSection } from "@/components/corporativo/CorpHeroSection";
import { CorpTrustBadges } from "@/components/corporativo/CorpTrustBadges";
import { CorpSecoesSection } from "@/components/corporativo/CorpSecoesSection";
import { CorpBeneficiosSection } from "@/components/corporativo/CorpBeneficiosSection";
import { CorpGaleriaSection } from "@/components/corporativo/CorpGaleriaSection";
import { CorpTestimonialsSection } from "@/components/corporativo/CorpTestimonialsSection";
import { CorpCasesSection } from "@/components/corporativo/CorpCasesSection";
import { CorpPlanosSection } from "@/components/corporativo/CorpPlanosSection";
import { CorpFAQSection } from "@/components/corporativo/CorpFAQSection";
import { CorpCTASection } from "@/components/corporativo/CorpCTASection";
import { CorpWhatsAppCTA } from "@/components/corporativo/CorpWhatsAppCTA";

const Corporativo = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <CorpHeroSection />
      <CorpTrustBadges />
      <CorpSecoesSection />
      <CorpBeneficiosSection />
      <CorpGaleriaSection />
      <CorpTestimonialsSection />
      <CorpCasesSection />
      <CorpPlanosSection />
      <CorpFAQSection />
      <CorpCTASection />
      <LandingFooter />
      <CorpWhatsAppCTA />
    </div>
  );
};

export default Corporativo;
