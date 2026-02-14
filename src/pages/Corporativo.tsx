import { LandingHeader } from "@/components/landing/LandingHeader";
import { LandingFooter } from "@/components/landing/LandingFooter";
import { CollapsibleSection } from "@/components/landing/CollapsibleSection";
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
import { Heart, Camera, Quote, Building2, CreditCard, HelpCircle, Send, Layers } from "lucide-react";

const Corporativo = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <CorpHeroSection />
      <CorpTrustBadges />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 py-8">
        <CollapsibleSection
          badge={
            <span className="pill inline-flex"><Layers size={14} /> Conheça em detalhes</span>
          }
          title={
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Tudo sobre <span className="font-serif italic text-gradient">nossos serviços</span>
            </h2>
          }
          subtitle={
            <p className="text-muted-foreground">
              Clique em cada seção para expandir e conhecer em profundidade nossos programas corporativos.
            </p>
          }
        >
          <CorpSecoesSection />
        </CollapsibleSection>
        <CollapsibleSection
          badge={
            <span className="pill inline-flex"><Heart size={14} /> Por que investir?</span>
          }
          title={
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Benefícios <span className="font-serif italic text-gradient">comprovados</span>
            </h2>
          }
          subtitle={
            <p className="text-muted-foreground">
              Dados reais de pesquisas sobre o impacto da massoterapia corporativa.
            </p>
          }
        >
          <CorpBeneficiosSection />
        </CollapsibleSection>

        <CollapsibleSection
          badge={
            <span className="pill inline-flex"><Camera size={14} /> Galeria</span>
          }
          title={
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Nossos <span className="font-serif italic text-gradient">momentos</span>
            </h2>
          }
          subtitle={
            <p className="text-muted-foreground">
              Registros dos nossos atendimentos em empresas e eventos especiais.
            </p>
          }
        >
          <CorpGaleriaSection />
        </CollapsibleSection>

        <CollapsibleSection
          badge={
            <span className="pill inline-flex"><Quote size={14} /> Depoimentos</span>
          }
          title={
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              O que dizem os <span className="font-serif italic text-gradient">gestores de RH</span>
            </h2>
          }
          subtitle={
            <p className="text-muted-foreground">
              Profissionais de RH compartilham suas experiências com nossos programas.
            </p>
          }
        >
          <CorpTestimonialsSection />
        </CollapsibleSection>

        <CollapsibleSection
          badge={
            <span className="pill inline-flex"><Building2 size={14} /> Cases de sucesso</span>
          }
          title={
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Empresas que <span className="font-serif italic text-gradient">investem em bem-estar</span>
            </h2>
          }
          subtitle={
            <p className="text-muted-foreground">
              Grandes organizações que adotaram a massoterapia corporativa.
            </p>
          }
        >
          <CorpCasesSection />
        </CollapsibleSection>

        <CollapsibleSection
          id="planos-corporativos"
          badge={
            <span className="pill inline-flex"><CreditCard size={14} /> Planos & Contratos</span>
          }
          title={
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Escolha o plano <span className="font-serif italic text-gradient">ideal</span>
            </h2>
          }
          subtitle={
            <p className="text-muted-foreground">
              Contratos flexíveis que se adaptam ao tamanho e necessidade da sua empresa.
            </p>
          }
        >
          <CorpPlanosSection />
        </CollapsibleSection>

        <CollapsibleSection
          badge={
            <span className="pill inline-flex"><HelpCircle size={14} /> Perguntas frequentes</span>
          }
          title={
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Tire suas <span className="font-serif italic text-gradient">dúvidas</span>
            </h2>
          }
        >
          <CorpFAQSection />
        </CollapsibleSection>
      </div>

      <CorpCTASection />
      <LandingFooter />
      <CorpWhatsAppCTA />
    </div>
  );
};

export default Corporativo;
