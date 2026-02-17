import { useState } from "react";
import { Pencil } from "lucide-react";
import { Button } from "@/components/ui/button";
import { VistaPostural } from "@/features/avaliacao-postural/hooks/useAvaliacaoPostural";
import { useAnotacoesPosturais } from "@/features/avaliacao-postural/hooks/useAnotacoesPosturais";
import { AnnotationCanvas } from "./annotations/AnnotationCanvas";
import type { Annotation } from "./annotations/types";
import { renderAnnotation } from "./annotations/svgRenderers";

interface AnnotationLayerProps {
  avaliacaoId: string;
  vista: VistaPostural;
  imageUrl: string;
  /** SVG container dimensions for readonly overlay */
  containerWidth: number;
  containerHeight: number;
}

/**
 * Renders saved annotations as an SVG overlay and provides a button to open
 * the full-screen annotation editor.
 */
export const AnnotationLayer = ({
  avaliacaoId,
  vista,
  imageUrl,
  containerWidth,
  containerHeight,
}: AnnotationLayerProps) => {
  const { annotations, salvar } = useAnotacoesPosturais(avaliacaoId, vista);
  const [editorOpen, setEditorOpen] = useState(false);

  return (
    <>
      {/* Read-only overlay of existing annotations */}
      {annotations.length > 0 && containerWidth > 0 && containerHeight > 0 && (
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${containerWidth} ${containerHeight}`}
          preserveAspectRatio="none"
        >
          {annotations.map((ann) =>
            renderAnnotation({
              annotation: ann,
              w: containerWidth,
              h: containerHeight,
              isSelected: false,
            })
          )}
        </svg>
      )}

      {/* Edit button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 left-2 h-7 w-7 bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 z-10"
        onClick={(e) => {
          e.stopPropagation();
          setEditorOpen(true);
        }}
        title="Anotar foto"
      >
        <Pencil size={13} />
      </Button>

      {/* Full-screen editor */}
      {editorOpen && (
        <AnnotationCanvas
          imageUrl={imageUrl}
          annotations={annotations}
          onSave={(anns: Annotation[]) => {
            salvar.mutate(anns);
            setEditorOpen(false);
          }}
          isSaving={salvar.isPending}
          onClose={() => setEditorOpen(false)}
        />
      )}
    </>
  );
};
