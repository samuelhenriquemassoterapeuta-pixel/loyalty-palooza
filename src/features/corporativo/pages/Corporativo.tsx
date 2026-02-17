import { LandingHeader } from "@/features/landing/components/LandingHeader";
import { LandingFooter } from "@/features/landing/components/LandingFooter";
import { CollapsibleSection } from "@/features/landing/components/CollapsibleSection";
import { CorpHeroSection } from "@/features/corporativo/components/CorpHeroSection";

import { CorpSecoesSection } from "@/features/corporativo/components/CorpSecoesSection";
import { CorpBeneficiosSection } from "@/features/corporativo/components/CorpBeneficiosSection";
import { CorpGaleriaSection } from "@/features/corporativo/components/CorpGaleriaSection";
import { CorpTestimonialsSection } from "@/features/corporativo/components/CorpTestimonialsSection";
import { CorpCasesSection } from "@/features/corporativo/components/CorpCasesSection";
import { CorpPlanosSection } from "@/features/corporativo/components/CorpPlanosSection";
import { CorpFAQSection } from "@/features/corporativo/components/CorpFAQSection";
import { CorpCTASection } from "@/features/corporativo/components/CorpCTASection";
import { CorpWhatsAppCTA } from "@/features/corporativo/components/CorpWhatsAppCTA";
import { Heart, Camera, Quote, Building2, CreditCard, HelpCircle, Send, Layers } from "lucide-react";

const Corporativo = () => {
  return (
    <div className="min-h-screen bg-background">
      <LandingHeader />
      <CorpHeroSection />

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

        <CollapsibleSection
          id="orcamento-corporativo"
          badge={
            <span className="pill inline-flex"><Send size={14} /> Fale com nosso time</span>
          }
          title={
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Solicite um <span className="font-serif italic text-gradient">orçamento</span>
            </h2>
          }
          subtitle={
            <p className="text-muted-foreground">
              Preencha o formulário e nossa equipe comercial entrará em contato em até 24h.
            </p>
          }
        >
          <CorpCTASection />
        </CollapsibleSection>
      </div>
      <LandingFooter />
      <CorpWhatsAppCTA />
    </div>
  );
};

export default Corporativo;
