import { useRef, useState, useCallback } from "react";
import { motion } from "framer-motion";
import { Camera, Check, RotateCcw, Grid3X3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VistaPostural } from "@/hooks/useAvaliacaoPostural";
import { ZoomableImage } from "./ZoomableImage";
import { AnnotationLayer } from "./AnnotationLayer";
import { MeasurementLayer } from "./MeasurementLayer";

const vistaConfig: Record<VistaPostural, { label: string; instrucao: string }> = {
  anterior: {
    label: "Vista Anterior",
    instrucao: "Posicione-se de frente para a câmera, pés afastados na largura dos ombros, braços relaxados ao lado do corpo.",
  },
  posterior: {
    label: "Vista Posterior",
    instrucao: "Posicione-se de costas para a câmera, mesma postura neutra com pés paralelos.",
  },
  lateral_direita: {
    label: "Lateral Direita",
    instrucao: "Posicione seu lado direito para a câmera, braços relaxados, olhar para frente.",
  },
  lateral_esquerda: {
    label: "Lateral Esquerda",
    instrucao: "Posicione seu lado esquerdo para a câmera, braços relaxados, olhar para frente.",
  },
};

interface VistaCapturaProps {
  vista: VistaPostural;
  existingUrl?: string;
  onCapture: (file: File) => void;
  isPending?: boolean;
  avaliacaoId?: string;
}

export const VistaCaptura = ({ vista, existingUrl, onCapture, isPending, avaliacaoId }: VistaCapturaProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const imgContainerRef = useRef<HTMLDivElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [showGrid, setShowGrid] = useState(true);
  const [containerDims, setContainerDims] = useState({ w: 0, h: 0 });
  const config = vistaConfig[vista];

  const updateDims = useCallback(() => {
    if (imgContainerRef.current) {
      const rect = imgContainerRef.current.getBoundingClientRect();
      setContainerDims({ w: rect.width, h: rect.height });
    }
  }, []);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    onCapture(file);
  };

  const displayUrl = preview || existingUrl;
  const hasImage = !!displayUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-2"
    >
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">{config.label}</h4>
        {hasImage && (
          <Button
            variant="ghost"
            size="icon"
            className="h-7 w-7"
            onClick={() => setShowGrid(!showGrid)}
            title="Alternar grade"
          >
            <Grid3X3 size={14} className={showGrid ? "text-primary" : "text-muted-foreground"} />
          </Button>
        )}
      </div>

      <div
        ref={imgContainerRef}
        className="relative aspect-[3/4] rounded-2xl border-2 border-dashed border-border bg-muted/30 overflow-hidden cursor-pointer group"
        onClick={() => !isPending && inputRef.current?.click()}
        onLoad={updateDims}
      >
        {hasImage ? (
          <>
            <ZoomableImage
              src={displayUrl}
              alt={config.label}
              className="w-full h-full"
            >
              {/* Grid overlay */}
              {showGrid && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="absolute left-1/4 top-0 bottom-0 w-px bg-primary/30" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/50" />
                  <div className="absolute left-3/4 top-0 bottom-0 w-px bg-primary/30" />
                  <div className="absolute top-1/5 left-0 right-0 h-px bg-primary/30" />
                  <div className="absolute top-2/5 left-0 right-0 h-px bg-primary/30" />
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-primary/50" />
                  <div className="absolute top-3/5 left-0 right-0 h-px bg-primary/30" />
                  <div className="absolute top-4/5 left-0 right-0 h-px bg-primary/30" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6">
                    <div className="absolute top-1/2 left-0 right-0 h-px bg-primary/70" />
                    <div className="absolute left-1/2 top-0 bottom-0 w-px bg-primary/70" />
                  </div>
                </div>
              )}
              {/* Status badge */}
              <div className="absolute top-2 right-2">
                <span className="flex items-center gap-1 text-[10px] font-medium bg-highlight text-highlight-foreground px-2 py-0.5 rounded-full">
                  <Check size={10} /> Capturada
                </span>
              </div>
            </ZoomableImage>
            {/* Annotation overlay */}
            {avaliacaoId && displayUrl && (
              <>
                <AnnotationLayer
                  avaliacaoId={avaliacaoId}
                  vista={vista}
                  imageUrl={displayUrl}
                  containerWidth={containerDims.w}
                  containerHeight={containerDims.h}
                />
                <MeasurementLayer
                  avaliacaoId={avaliacaoId}
                  vista={vista}
                  imageUrl={displayUrl}
                />
              </>
            )}
            {/* Replace overlay on hover — outside ZoomableImage to avoid conflict */}
            <div
              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none"
            >
              <div className="flex items-center gap-2 text-white text-sm font-medium">
                <RotateCcw size={16} />
                Substituir foto
              </div>
            </div>
          </>
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
            {/* Silhouette guide */}
            <SilhouetteGuide vista={vista} />
            <div className="mt-3 text-center">
              <Camera size={20} className="mx-auto text-muted-foreground mb-1" />
              <p className="text-xs text-muted-foreground font-medium">Toque para capturar</p>
            </div>
          </div>
        )}
        {isPending && (
          <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
            <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
          </div>
        )}
      </div>

      <p className="text-[11px] text-muted-foreground leading-relaxed">{config.instrucao}</p>

      <input
        ref={inputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        className="hidden"
        onChange={handleFile}
      />
    </motion.div>
  );
};

/** Simple SVG silhouette guide for each view */
const SilhouetteGuide = ({ vista }: { vista: VistaPostural }) => {
  const isFront = vista === "anterior";
  const isBack = vista === "posterior";
  const isLateral = vista === "lateral_direita" || vista === "lateral_esquerda";
  const flip = vista === "lateral_esquerda";

  return (
    <svg
      viewBox="0 0 100 200"
      className={`w-16 h-32 text-muted-foreground/30 ${flip ? "scale-x-[-1]" : ""}`}
      fill="currentColor"
    >
      {/* Head */}
      <ellipse cx="50" cy="25" rx={isLateral ? "10" : "12"} ry="14" />
      {/* Neck */}
      <rect x={isLateral ? "45" : "44"} y="38" width={isLateral ? "10" : "12"} height="8" rx="3" />
      {/* Torso */}
      {isLateral ? (
        <ellipse cx="50" cy="80" rx="12" ry="35" />
      ) : (
        <path d="M35 46 Q30 80 33 120 L67 120 Q70 80 65 46 Z" />
      )}
      {/* Legs */}
      {isLateral ? (
        <>
          <rect x="44" y="115" width="12" height="55" rx="6" />
          <ellipse cx="50" cy="176" rx="10" ry="5" />
        </>
      ) : (
        <>
          <rect x="35" y="118" width="12" height="55" rx="6" />
          <rect x="53" y="118" width="12" height="55" rx="6" />
          <ellipse cx="41" cy="178" rx="10" ry="5" />
          <ellipse cx="59" cy="178" rx="10" ry="5" />
        </>
      )}
      {/* Arms */}
      {(isFront || isBack) && (
        <>
          <rect x="18" y="50" width="10" height="45" rx="5" transform="rotate(-5 23 50)" />
          <rect x="72" y="50" width="10" height="45" rx="5" transform="rotate(5 77 50)" />
        </>
      )}
      {/* Alignment reference lines */}
      <line x1="50" y1="0" x2="50" y2="200" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 4" opacity="0.4" />
    </svg>
  );
};
