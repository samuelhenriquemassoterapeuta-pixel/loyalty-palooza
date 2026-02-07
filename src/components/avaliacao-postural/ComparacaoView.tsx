import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, Grid3X3, X, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AvaliacaoPostural, VistaPostural } from "@/hooks/useAvaliacaoPostural";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const vistas: { key: VistaPostural; label: string }[] = [
  { key: "anterior", label: "Anterior" },
  { key: "posterior", label: "Posterior" },
  { key: "lateral_direita", label: "Lat. Direita" },
  { key: "lateral_esquerda", label: "Lat. Esquerda" },
];

interface ComparacaoViewProps {
  avaliacoes: AvaliacaoPostural[];
  onClose: () => void;
}

export const ComparacaoView = ({ avaliacoes, onClose }: ComparacaoViewProps) => {
  const [vistaAtiva, setVistaAtiva] = useState<VistaPostural>("anterior");
  const [showGrid, setShowGrid] = useState(true);
  const [leftIdx, setLeftIdx] = useState(avaliacoes.length > 1 ? 1 : 0);
  const [rightIdx, setRightIdx] = useState(0);

  const left = avaliacoes[leftIdx];
  const right = avaliacoes[rightIdx];

  const getSignedUrl = (av: AvaliacaoPostural, vista: VistaPostural): string | undefined => {
    const key = `signed_${vista}` as keyof AvaliacaoPostural;
    return av[key] as string | undefined;
  };

  const GridOverlay = () => (
    <div className="absolute inset-0 pointer-events-none">
      <div className="absolute left-1/4 top-0 bottom-0 w-px bg-primary/25" />
      <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/40" />
      <div className="absolute left-3/4 top-0 bottom-0 w-px bg-primary/25" />
      <div className="absolute top-1/4 left-0 right-0 h-px bg-primary/25" />
      <div className="absolute top-1/2 left-0 right-0 h-px bg-primary/40" />
      <div className="absolute top-3/4 left-0 right-0 h-px bg-primary/25" />
    </div>
  );

  const PhotoPanel = ({ av, side }: { av: AvaliacaoPostural; side: "left" | "right" }) => {
    const url = getSignedUrl(av, vistaAtiva);
    const idx = side === "left" ? leftIdx : rightIdx;
    const setIdx = side === "left" ? setLeftIdx : setRightIdx;
    const canPrev = idx < avaliacoes.length - 1;
    const canNext = idx > 0;

    return (
      <div className="flex-1 flex flex-col min-w-0">
        {/* Navigation */}
        <div className="flex items-center justify-between px-2 py-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            disabled={!canPrev}
            onClick={() => setIdx(idx + 1)}
          >
            <ChevronLeft size={14} />
          </Button>
          <span className="text-[10px] text-muted-foreground font-medium truncate px-1">
            {format(new Date(av.data), "dd/MM/yy", { locale: ptBR })}
          </span>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6"
            disabled={!canNext}
            onClick={() => setIdx(idx - 1)}
          >
            <ChevronRight size={14} />
          </Button>
        </div>

        {/* Photo */}
        <div className="relative aspect-[3/4] bg-muted/30 rounded-xl overflow-hidden">
          {url ? (
            <>
              <img src={url} alt={vistaAtiva} className="w-full h-full object-cover" />
              {showGrid && <GridOverlay />}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-xs">
              Sem foto
            </div>
          )}
        </div>
      </div>
    );
  };

  if (avaliacoes.length < 2) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <ArrowLeftRight size={32} className="mx-auto mb-3 opacity-40" />
        <p className="text-sm">Você precisa de pelo menos 2 avaliações para comparar.</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-3"
    >
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <ArrowLeftRight size={18} className="text-primary" />
          Comparação
        </h3>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => setShowGrid(!showGrid)}
          >
            <Grid3X3 size={16} className={showGrid ? "text-primary" : "text-muted-foreground"} />
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={onClose}>
            <X size={16} />
          </Button>
        </div>
      </div>

      {/* Vista selector */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {vistas.map((v) => (
          <Button
            key={v.key}
            variant={vistaAtiva === v.key ? "default" : "outline"}
            size="sm"
            className="text-xs shrink-0"
            onClick={() => setVistaAtiva(v.key)}
          >
            {v.label}
          </Button>
        ))}
      </div>

      {/* Side-by-side */}
      <div className="flex gap-2">
        <PhotoPanel av={left} side="left" />
        {/* Divider */}
        <div className="flex flex-col items-center justify-center">
          <div className="w-px h-full bg-border" />
        </div>
        <PhotoPanel av={right} side="right" />
      </div>

      {/* Legend */}
      <p className="text-[10px] text-center text-muted-foreground">
        Use as setas para navegar entre avaliações • Grade alinhada para análise visual
      </p>
    </motion.div>
  );
};
