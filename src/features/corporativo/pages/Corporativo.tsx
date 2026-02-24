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
import { EditableText } from "@/components/edit-mode";

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
              <EditableText storageKey="corp_secoes_titulo" table="platform_texts" section="corporativo" as="span">Tudo sobre</EditableText>{" "}
              <EditableText storageKey="corp_secoes_destaque" table="platform_texts" section="corporativo" as="span" className="font-serif italic text-gradient">nossos serviços</EditableText>
            </h2>
          }
          subtitle={
            <EditableText storageKey="corp_secoes_subtitulo" table="platform_texts" section="corporativo" as="p" className="text-muted-foreground" multiline>
              Clique em cada seção para expandir e conhecer em profundidade nossos programas corporativos.
            </EditableText>
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
              <EditableText storageKey="corp_beneficios_titulo" table="platform_texts" section="corporativo" as="span">Benefícios</EditableText>{" "}
              <EditableText storageKey="corp_beneficios_destaque" table="platform_texts" section="corporativo" as="span" className="font-serif italic text-gradient">comprovados</EditableText>
            </h2>
          }
          subtitle={
            <EditableText storageKey="corp_beneficios_subtitulo" table="platform_texts" section="corporativo" as="p" className="text-muted-foreground" multiline>
              Dados reais de pesquisas sobre o impacto da massoterapia corporativa.
            </EditableText>
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
              <EditableText storageKey="corp_galeria_titulo" table="platform_texts" section="corporativo" as="span">Nossos</EditableText>{" "}
              <EditableText storageKey="corp_galeria_destaque" table="platform_texts" section="corporativo" as="span" className="font-serif italic text-gradient">momentos</EditableText>
            </h2>
          }
          subtitle={
            <EditableText storageKey="corp_galeria_subtitulo" table="platform_texts" section="corporativo" as="p" className="text-muted-foreground" multiline>
              Registros dos nossos atendimentos em empresas e eventos especiais.
            </EditableText>
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
              <EditableText storageKey="corp_depoimentos_titulo" table="platform_texts" section="corporativo" as="span">O que dizem os</EditableText>{" "}
              <EditableText storageKey="corp_depoimentos_destaque" table="platform_texts" section="corporativo" as="span" className="font-serif italic text-gradient">gestores de RH</EditableText>
            </h2>
          }
          subtitle={
            <EditableText storageKey="corp_depoimentos_subtitulo" table="platform_texts" section="corporativo" as="p" className="text-muted-foreground" multiline>
              Profissionais de RH compartilham suas experiências com nossos programas.
            </EditableText>
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
              <EditableText storageKey="corp_cases_titulo" table="platform_texts" section="corporativo" as="span">Empresas que</EditableText>{" "}
              <EditableText storageKey="corp_cases_destaque" table="platform_texts" section="corporativo" as="span" className="font-serif italic text-gradient">investem em bem-estar</EditableText>
            </h2>
          }
          subtitle={
            <EditableText storageKey="corp_cases_subtitulo" table="platform_texts" section="corporativo" as="p" className="text-muted-foreground" multiline>
              Grandes organizações que adotaram a massoterapia corporativa.
            </EditableText>
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
              <EditableText storageKey="corp_planos_titulo" table="platform_texts" section="corporativo" as="span">Escolha o plano</EditableText>{" "}
              <EditableText storageKey="corp_planos_destaque" table="platform_texts" section="corporativo" as="span" className="font-serif italic text-gradient">ideal</EditableText>
            </h2>
          }
          subtitle={
            <EditableText storageKey="corp_planos_subtitulo" table="platform_texts" section="corporativo" as="p" className="text-muted-foreground" multiline>
              Contratos flexíveis que se adaptam ao tamanho e necessidade da sua empresa.
            </EditableText>
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
              <EditableText storageKey="corp_faq_titulo" table="platform_texts" section="corporativo" as="span">Tire suas</EditableText>{" "}
              <EditableText storageKey="corp_faq_destaque" table="platform_texts" section="corporativo" as="span" className="font-serif italic text-gradient">dúvidas</EditableText>
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
              <EditableText storageKey="corp_cta_titulo" table="platform_texts" section="corporativo" as="span">Solicite um</EditableText>{" "}
              <EditableText storageKey="corp_cta_destaque" table="platform_texts" section="corporativo" as="span" className="font-serif italic text-gradient">orçamento</EditableText>
            </h2>
          }
          subtitle={
            <EditableText storageKey="corp_cta_subtitulo" table="platform_texts" section="corporativo" as="p" className="text-muted-foreground" multiline>
              Preencha o formulário e nossa equipe comercial entrará em contato em até 24h.
            </EditableText>
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
