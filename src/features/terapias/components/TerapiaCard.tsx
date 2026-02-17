import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Clock, CheckCircle2, AlertTriangle, Sparkles, Hand, Heart, Leaf, SmilePlus, Calendar } from "lucide-react";
import { Link } from "react-router-dom";
import type { Terapia } from "@/features/terapias/hooks/useTerapias";
import { terapiaImages } from "@/assets/terapias";

const iconMap: Record<string, typeof Sparkles> = {
  Sparkles,
  Hand,
  Heart,
  Leaf,
  SmilePlus,
};

interface TerapiaCardProps {
  terapia: Terapia;
  defaultOpen?: boolean;
}

export const TerapiaCard = ({ terapia, defaultOpen = false }: TerapiaCardProps) => {
  const [open, setOpen] = useState(defaultOpen);
  const Icon = iconMap[terapia.icone || "Sparkles"] || Sparkles;
  const coverImage = terapia.imagem_capa || terapiaImages[terapia.slug] || null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="rounded-2xl border border-border/60 bg-card overflow-hidden shadow-sm"
    >
      {/* Header */}
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 sm:p-5 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="p-2.5 rounded-xl bg-primary/10 text-primary shrink-0">
          <Icon size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-bold text-foreground text-base sm:text-lg">{terapia.nome}</p>
          {terapia.subtitulo && (
            <p className="text-xs text-muted-foreground">{terapia.subtitulo}</p>
          )}
        </div>
        {terapia.duracao_media && (
          <span className="hidden sm:flex items-center gap-1 text-xs text-muted-foreground shrink-0">
            <Clock size={12} />
            {terapia.duracao_media}
          </span>
        )}
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.25 }}
          className="shrink-0"
        >
          <ChevronDown size={18} className="text-muted-foreground" />
        </motion.div>
      </button>

      {/* Expandable content */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-5 sm:px-5 sm:pb-6 space-y-5">
              {/* Cover image */}
              {coverImage && (
                <div className="rounded-xl overflow-hidden aspect-video">
                  <img
                    src={coverImage}
                    alt={terapia.nome}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              )}

              {/* Description */}
              {terapia.descricao && (
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {terapia.descricao}
                </p>
              )}

              {/* Duration mobile */}
              {terapia.duracao_media && (
                <div className="sm:hidden flex items-center gap-2 text-xs text-muted-foreground">
                  <Clock size={14} />
                  <span>Duração: {terapia.duracao_media}</span>
                </div>
              )}

              {/* How it works */}
              {terapia.como_funciona && (
                <div className="p-4 rounded-xl bg-primary/5 border border-primary/10">
                  <h4 className="text-sm font-bold text-foreground mb-2 flex items-center gap-2">
                    <Sparkles size={14} className="text-primary" />
                    Como funciona
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {terapia.como_funciona}
                  </p>
                </div>
              )}

              {/* Benefits, Indications, Contraindications grid */}
              <div className="grid sm:grid-cols-3 gap-3">
                {terapia.beneficios.length > 0 && (
                  <div className="p-3 rounded-xl bg-accent/5 border border-accent/10">
                    <h4 className="text-xs font-bold text-foreground mb-2 flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-accent" />
                      Benefícios
                    </h4>
                    <ul className="space-y-1">
                      {terapia.beneficios.map((b, i) => (
                        <li key={i} className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                          <span className="text-accent mt-0.5">•</span>
                          {b}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {terapia.indicacoes.length > 0 && (
                  <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                    <h4 className="text-xs font-bold text-foreground mb-2 flex items-center gap-1.5">
                      <CheckCircle2 size={13} className="text-primary" />
                      Indicações
                    </h4>
                    <ul className="space-y-1">
                      {terapia.indicacoes.map((ind, i) => (
                        <li key={i} className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                          <span className="text-primary mt-0.5">•</span>
                          {ind}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {terapia.contraindicacoes.length > 0 && (
                  <div className="p-3 rounded-xl bg-destructive/5 border border-destructive/10">
                    <h4 className="text-xs font-bold text-foreground mb-2 flex items-center gap-1.5">
                      <AlertTriangle size={13} className="text-destructive" />
                      Contraindicações
                    </h4>
                    <ul className="space-y-1">
                      {terapia.contraindicacoes.map((c, i) => (
                        <li key={i} className="text-[11px] text-muted-foreground flex items-start gap-1.5">
                          <span className="text-destructive mt-0.5">•</span>
                          {c}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Gallery */}
              {terapia.galeria_urls.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-foreground mb-2">Galeria</h4>
                  <div className="grid grid-cols-3 gap-2">
                    {terapia.galeria_urls.map((url, i) => (
                      <div key={i} className="rounded-lg overflow-hidden aspect-square">
                        <img src={url} alt={`${terapia.nome} ${i + 1}`} className="w-full h-full object-cover" loading="lazy" />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Videos */}
              {terapia.video_urls.length > 0 && (
                <div>
                  <h4 className="text-xs font-bold text-foreground mb-2">Vídeos</h4>
                  <div className="grid sm:grid-cols-2 gap-3">
                    {terapia.video_urls.map((url, i) => (
                      <div key={i} className="rounded-xl overflow-hidden aspect-video bg-muted">
                        <iframe
                          src={url}
                          title={`${terapia.nome} vídeo ${i + 1}`}
                          className="w-full h-full"
                          allowFullScreen
                          loading="lazy"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA */}
              <Link
                to={`/auth?redirect=${encodeURIComponent(`/agendamento?servico=${encodeURIComponent(terapia.nome)}`)}`}
                className="block"
              >
                <button className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-primary text-primary-foreground text-sm font-semibold hover:bg-primary/90 transition-colors">
                  <Calendar size={16} />
                  Agendar {terapia.nome}
                </button>
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};
