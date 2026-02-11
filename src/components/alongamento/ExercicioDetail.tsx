import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Clock, Repeat, Target, Info, Play, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExercicioAlongamento } from "@/hooks/useAlongamento";
import { ExercicioAnimado } from "./ExercicioAnimado";

interface ExercicioDetailProps {
  exercicio: ExercicioAlongamento;
  onClose: () => void;
}

export const ExercicioDetail = ({ exercicio, onClose }: ExercicioDetailProps) => {
  const [videoPlaying, setVideoPlaying] = useState(false);

  const hasVideo = !!exercicio.video_url;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          className="bg-card rounded-3xl w-full max-w-lg max-h-[85vh] overflow-y-auto shadow-elevated"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Video Section */}
          {hasVideo && (
            <div className="relative w-full aspect-video bg-black rounded-t-3xl overflow-hidden">
              {videoPlaying ? (
                <iframe
                  src={getEmbedUrl(exercicio.video_url!)}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={exercicio.nome}
                />
              ) : (
                <button
                  onClick={() => setVideoPlaying(true)}
                  className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-gradient-to-t from-black/60 via-black/20 to-black/40 group"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center shadow-glow group-hover:scale-110 transition-transform">
                    <Play size={28} className="text-primary-foreground ml-1" />
                  </div>
                  <span className="text-sm font-medium text-white/90">
                    Assistir demonstração
                  </span>
                </button>
              )}
            </div>
          )}

          {/* Header */}
          <div className="flex items-start justify-between p-6 pb-4">
            <div className="flex items-center gap-3">
              {!hasVideo && (
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center overflow-hidden">
                  <ExercicioAnimado tipo={exercicio.categoria} size={48} />
                </div>
              )}
              <div>
                <h2 className="text-lg font-bold text-foreground">{exercicio.nome}</h2>
                <p className="text-sm text-muted-foreground capitalize">{exercicio.categoria.replace("_", " ")}</p>
              </div>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose} className="shrink-0">
              <X size={20} />
            </Button>
          </div>

          {/* Stats */}
          <div className="px-6 grid grid-cols-3 gap-3">
            <div className="bg-muted/50 rounded-xl p-3 text-center">
              <Clock size={16} className="text-primary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Duração</p>
              <p className="text-sm font-bold text-foreground">{exercicio.duracao_segundos}s</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-3 text-center">
              <Repeat size={16} className="text-primary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Repetições</p>
              <p className="text-sm font-bold text-foreground">{exercicio.repeticoes || "—"}</p>
            </div>
            <div className="bg-muted/50 rounded-xl p-3 text-center">
              <Target size={16} className="text-primary mx-auto mb-1" />
              <p className="text-xs text-muted-foreground">Nível</p>
              <p className="text-sm font-bold text-foreground capitalize">{exercicio.nivel}</p>
            </div>
          </div>

          {/* Description */}
          {exercicio.descricao && (
            <div className="px-6 mt-5">
              <h3 className="text-sm font-semibold text-foreground mb-2">Descrição</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{exercicio.descricao}</p>
            </div>
          )}

          {/* Instructions */}
          {exercicio.instrucoes && (
            <div className="px-6 mt-5">
              <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-1.5">
                <Info size={14} className="text-primary" />
                Instruções
              </h3>
              <div className="bg-primary/5 rounded-xl p-4">
                <p className="text-sm text-foreground leading-relaxed whitespace-pre-line">
                  {exercicio.instrucoes}
                </p>
              </div>
            </div>
          )}

          {/* Muscles */}
          {exercicio.musculos_alvo && (
            <div className="px-6 mt-5 pb-6">
              <h3 className="text-sm font-semibold text-foreground mb-2">Músculos trabalhados</h3>
              <div className="flex flex-wrap gap-2">
                {exercicio.musculos_alvo.split(",").map((m) => (
                  <span key={m} className="pill text-xs">{m.trim()}</span>
                ))}
              </div>
            </div>
          )}

          {/* Video link fallback */}
          {hasVideo && !videoPlaying && (
            <div className="px-6 pb-6">
              <a
                href={exercicio.video_url!}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs text-primary hover:underline"
              >
                <ExternalLink size={12} />
                Abrir vídeo em nova aba
              </a>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

/** Convert YouTube/Vimeo URLs to embeddable format */
function getEmbedUrl(url: string): string {
  // YouTube
  const ytMatch = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]+)/);
  if (ytMatch) return `https://www.youtube.com/embed/${ytMatch[1]}?autoplay=1&rel=0`;

  // Vimeo
  const vimeoMatch = url.match(/vimeo\.com\/(\d+)/);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}?autoplay=1`;

  // Direct video URL — use video element instead
  return url;
}
