import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeftRight, Grid3X3, X, ChevronLeft, ChevronRight, Layers, Columns2, Camera, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AvaliacaoPostural, VistaPostural } from "@/hooks/useAvaliacaoPostural";
import { ImageSliderCompare } from "./ImageSliderCompare";
import { ExportPosturalPdfButton } from "./ExportPosturalPdfButton";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const vistas: { key: VistaPostural; label: string }[] = [
  { key: "anterior", label: "Anterior" },
  { key: "posterior", label: "Posterior" },
  { key: "lateral_direita", label: "Lat. Direita" },
  { key: "lateral_esquerda", label: "Lat. Esquerda" },
];

type ViewMode = "side-by-side" | "slider";

interface ComparacaoViewProps {
  avaliacoes: AvaliacaoPostural[];
  onClose: () => void;
}

export const ComparacaoView = ({ avaliacoes, onClose }: ComparacaoViewProps) => {
  const [vistaAtiva, setVistaAtiva] = useState<VistaPostural>("anterior");
  const [showGrid, setShowGrid] = useState(true);
  const [viewMode, setViewMode] = useState<ViewMode>("slider");
  const [leftIdx, setLeftIdx] = useState(avaliacoes.length > 1 ? 1 : 0);
  const [rightIdx, setRightIdx] = useState(0);
  const [capturing, setCapturing] = useState(false);
  const captureRef = useRef<HTMLDivElement>(null);

  const handleCapture = useCallback(async () => {
    if (!captureRef.current) return;
    setCapturing(true);
    try {
      const { default: html2canvas } = await import("html2canvas");
      const canvas = await html2canvas(captureRef.current, {
        scale: 2,
        backgroundColor: "#ffffff",
        useCORS: true,
        logging: false,
      });

      const vistaLabel = vistas.find((v) => v.key === vistaAtiva)?.label ?? vistaAtiva;
      const filename = `comparacao-${vistaLabel}-${format(new Date(), "yyyy-MM-dd")}.png`;

      canvas.toBlob(async (blob) => {
        if (!blob) {
          toast.error("Erro ao gerar imagem.");
          return;
        }
        const file = new File([blob], filename, { type: "image/png" });

        if (navigator.canShare?.({ files: [file] })) {
          try {
            await navigator.share({
              title: `Comparação Postural — ${vistaLabel}`,
              text: `Evolução postural (${vistaLabel})`,
              files: [file],
            });
            toast.success("Comparação compartilhada!");
            return;
          } catch (err: unknown) {
            if (err instanceof Error && err.name === "AbortError") return;
          }
        }

        // Fallback: download
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
        toast.success("Imagem salva!");
      }, "image/png");
    } catch {
      toast.error("Erro ao capturar imagem.");
    } finally {
      setCapturing(false);
    }
  }, [vistaAtiva]);

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

  const DateNavigator = ({
    idx,
    setIdx,
    side,
  }: {
    idx: number;
    setIdx: (v: number) => void;
    side: "left" | "right";
  }) => {
    const av = avaliacoes[idx];
    const canPrev = idx < avaliacoes.length - 1;
    const canNext = idx > 0;

    return (
      <div className="flex items-center justify-between">
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
          {side === "left" ? "Antes: " : "Depois: "}
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
    );
  };

  const PhotoPanel = ({ av, side }: { av: AvaliacaoPostural; side: "left" | "right" }) => {
    const url = getSignedUrl(av, vistaAtiva);
    const idx = side === "left" ? leftIdx : rightIdx;
    const setIdx = side === "left" ? setLeftIdx : setRightIdx;
    const canPrev = idx < avaliacoes.length - 1;
    const canNext = idx > 0;

    return (
      <div className="flex-1 flex flex-col min-w-0">
        <div className="flex items-center justify-between px-2 py-1.5">
          <Button variant="ghost" size="icon" className="h-6 w-6" disabled={!canPrev} onClick={() => setIdx(idx + 1)}>
            <ChevronLeft size={14} />
          </Button>
          <span className="text-[10px] text-muted-foreground font-medium truncate px-1">
            {format(new Date(av.data), "dd/MM/yy", { locale: ptBR })}
          </span>
          <Button variant="ghost" size="icon" className="h-6 w-6" disabled={!canNext} onClick={() => setIdx(idx - 1)}>
            <ChevronRight size={14} />
          </Button>
        </div>
        <div className="relative aspect-[3/4] bg-muted/30 rounded-xl overflow-hidden">
          {url ? (
            <>
              <img src={url} alt={vistaAtiva} className="w-full h-full object-cover" />
              {showGrid && <GridOverlay />}
            </>
          ) : (
            <div className="flex items-center justify-center h-full text-muted-foreground text-xs">Sem foto</div>
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

  const leftUrl = getSignedUrl(left, vistaAtiva);
  const rightUrl = getSignedUrl(right, vistaAtiva);
  const canSlider = !!leftUrl && !!rightUrl;

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground flex items-center gap-2">
          <ArrowLeftRight size={18} className="text-primary" />
          Comparação
        </h3>
        <div className="flex items-center gap-1">
          {/* View mode toggle */}
          <div className="flex items-center bg-muted/50 rounded-lg p-0.5">
            <Button
              variant={viewMode === "slider" ? "default" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setViewMode("slider")}
              title="Sobreposição com slider"
            >
              <Layers size={14} />
            </Button>
            <Button
              variant={viewMode === "side-by-side" ? "default" : "ghost"}
              size="icon"
              className="h-7 w-7"
              onClick={() => setViewMode("side-by-side")}
              title="Lado a lado"
            >
              <Columns2 size={14} />
            </Button>
          </div>
          <ExportPosturalPdfButton
            leftAvaliacao={left}
            rightAvaliacao={right}
          />
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={handleCapture}
            disabled={capturing}
            title="Salvar imagem da comparação"
          >
            {capturing ? <Loader2 size={16} className="animate-spin" /> : <Camera size={16} />}
          </Button>
          <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setShowGrid(!showGrid)}>
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

      {/* Capturable area */}
      <div ref={captureRef} className="space-y-3 bg-background rounded-xl p-1">
        {/* Slider mode: date navigators above the slider */}
        {viewMode === "slider" && (
          <>
            <div className="flex gap-2">
              <div className="flex-1">
                <DateNavigator idx={leftIdx} setIdx={setLeftIdx} side="left" />
              </div>
              <div className="flex-1">
                <DateNavigator idx={rightIdx} setIdx={setRightIdx} side="right" />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={vistaAtiva}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
              >
                {canSlider ? (
                  <ImageSliderCompare
                    beforeUrl={leftUrl}
                    afterUrl={rightUrl}
                    beforeLabel={format(new Date(left.data), "dd/MM/yy", { locale: ptBR })}
                    afterLabel={format(new Date(right.data), "dd/MM/yy", { locale: ptBR })}
                    showGrid={showGrid}
                  />
                ) : (
                  <div className="aspect-[3/4] rounded-xl bg-muted/30 flex items-center justify-center text-muted-foreground text-sm">
                    Selecione duas avaliações com fotos nesta vista
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </>
        )}

        {/* Side-by-side mode */}
        {viewMode === "side-by-side" && (
          <AnimatePresence mode="wait">
            <motion.div
              key={vistaAtiva}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="flex gap-2"
            >
              <PhotoPanel av={left} side="left" />
              <div className="flex flex-col items-center justify-center">
                <div className="w-px h-full bg-border" />
              </div>
              <PhotoPanel av={right} side="right" />
            </motion.div>
          </AnimatePresence>
        )}

        {/* Watermark for captured image */}
        <div className="flex items-center justify-between px-1">
          <p className="text-[9px] text-muted-foreground">
            {vistas.find((v) => v.key === vistaAtiva)?.label} • Resinkra
          </p>
          <p className="text-[9px] text-muted-foreground">
            {format(new Date(), "dd/MM/yyyy", { locale: ptBR })}
          </p>
        </div>
      </div>

      {/* Legend */}
      <p className="text-[10px] text-center text-muted-foreground">
        {viewMode === "slider"
          ? "Arraste o slider para comparar • Use as setas para trocar datas"
          : "Use as setas para navegar entre avaliações • Grade alinhada para análise visual"}
      </p>
    </motion.div>
  );
};
