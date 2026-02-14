import { motion } from "framer-motion";
import {
  Heart, Briefcase, TrendingUp, Handshake, Award, Building2,
  Brain, Shield, Clock, Smile, Activity, ChevronDown,
  Crown, GraduationCap, Trophy, Globe, PartyPopper, Sparkles
} from "lucide-react";
import { useCorporativoSecoes, CorporativoSecao } from "@/hooks/useCorporativoSecoes";
import { Loader2 } from "lucide-react";
import { AppCollapsibleSection } from "@/components/AppCollapsibleSection";

const iconMap: Record<string, any> = {
  Heart, Briefcase, TrendingUp, Handshake, Award, Building2,
  Brain, Shield, Clock, Smile, Activity,
  Crown, GraduationCap, Trophy, Globe, PartyPopper, Sparkles,
};

const renderMarkdown = (text: string) => {
  // Simple markdown renderer for headings, bold, lists, tables
  const lines = text.split("\n");
  const elements: JSX.Element[] = [];
  let inTable = false;
  let tableRows: string[][] = [];

  const flushTable = () => {
    if (tableRows.length > 0) {
      elements.push(
        <div key={`table-${elements.length}`} className="overflow-x-auto my-4">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr>
                {tableRows[0].map((cell, i) => (
                  <th key={i} className="text-left p-2 border-b border-border font-semibold text-foreground">{cell.trim()}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableRows.slice(2).map((row, ri) => (
                <tr key={ri} className="border-b border-border/50">
                  {row.map((cell, ci) => (
                    <td key={ci} className="p-2 text-muted-foreground">{cell.trim()}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
      tableRows = [];
    }
    inTable = false;
  };

  lines.forEach((line, i) => {
    // Table detection
    if (line.trim().startsWith("|")) {
      inTable = true;
      tableRows.push(line.split("|").filter(Boolean));
      return;
    } else if (inTable) {
      flushTable();
    }

    if (line.startsWith("## ")) {
      elements.push(<h3 key={i} className="text-xl font-bold text-foreground mt-6 mb-3">{line.replace("## ", "")}</h3>);
    } else if (line.startsWith("### ")) {
      elements.push(<h4 key={i} className="text-lg font-semibold text-foreground mt-5 mb-2">{line.replace("### ", "")}</h4>);
    } else if (line.startsWith("- ")) {
      const content = line.replace("- ", "").replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
      elements.push(
        <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground ml-2 mb-1.5">
          <span className="text-primary mt-1.5 shrink-0">•</span>
          <span dangerouslySetInnerHTML={{ __html: content }} />
        </li>
      );
    } else if (line.startsWith("---")) {
      elements.push(<hr key={i} className="my-6 border-border/50" />);
    } else if (line.trim()) {
      const content = line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>');
      elements.push(<p key={i} className="text-sm text-muted-foreground leading-relaxed mb-2" dangerouslySetInnerHTML={{ __html: content }} />);
    }
  });

  if (inTable) flushTable();

  return elements;
};

const SecaoCard = ({ secao }: { secao: CorporativoSecao }) => {
  const IconComponent = iconMap[secao.icone] || Building2;

  return (
    <AppCollapsibleSection
      title={secao.titulo}
      icon={IconComponent}
      defaultOpen={false}
    >
      <div className="space-y-4">
        {secao.subtitulo && (
          <p className="text-sm font-medium text-accent italic">{secao.subtitulo}</p>
        )}
        
        {/* Hero media — full-width featured image or video */}
        {(secao.imagem_url || secao.video_url) && (
          <div className="grid sm:grid-cols-2 gap-4 my-4">
            {secao.imagem_url && (
              <div className="rounded-2xl overflow-hidden shadow-card group/img">
                <img 
                  src={secao.imagem_url} 
                  alt={secao.titulo}
                  className="w-full h-52 object-cover group-hover/img:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
              </div>
            )}
            {secao.video_url && (
              <div className="rounded-2xl overflow-hidden shadow-card aspect-video">
                {secao.video_url.includes("youtube") || secao.video_url.includes("youtu.be") ? (
                  <iframe
                    src={secao.video_url.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")}
                    className="w-full h-full"
                    allowFullScreen
                    title={secao.titulo}
                  />
                ) : (
                  <video src={secao.video_url} controls className="w-full h-full object-cover" />
                )}
              </div>
            )}
          </div>
        )}

        {secao.descricao && (
          <p className="text-muted-foreground leading-relaxed">{secao.descricao}</p>
        )}

        {/* Gallery */}
        {secao.galeria_urls && secao.galeria_urls.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 my-4">
            {secao.galeria_urls.map((url, i) => (
              <div key={i} className="rounded-xl overflow-hidden shadow-card group/gal">
                <img 
                  src={url} 
                  alt={`${secao.titulo} ${i + 1}`} 
                  className="w-full h-36 object-cover group-hover/gal:scale-105 transition-transform duration-500" 
                  loading="lazy" 
                />
              </div>
            ))}
          </div>
        )}

        {/* Detailed content */}
        {secao.conteudo_detalhado && (
          <div className="mt-4 p-4 rounded-2xl bg-muted/30 border border-border/30">
            {renderMarkdown(secao.conteudo_detalhado)}
          </div>
        )}
      </div>
    </AppCollapsibleSection>
  );
};

export const CorpSecoesSection = () => {
  const { secoes, isLoading } = useCorporativoSecoes();

  if (isLoading) {
    return (
      <div className="flex justify-center py-16">
        <Loader2 className="animate-spin text-primary" size={32} />
      </div>
    );
  }

  if (secoes.length === 0) return null;

  return (
    <section className="py-16 lg:py-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="pill mb-4 inline-flex">
            <Building2 size={14} />
            Conheça em detalhes
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Tudo sobre{" "}
            <span className="font-serif italic text-gradient">nossos serviços</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Clique em cada seção para expandir e conhecer em profundidade nossos programas corporativos.
          </p>
        </motion.div>

        <div className="space-y-4">
          {secoes.map((secao, index) => (
            <motion.div
              key={secao.id}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
            >
              <SecaoCard secao={secao} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
