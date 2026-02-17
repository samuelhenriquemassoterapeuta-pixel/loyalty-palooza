import { useState } from "react";
import { Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { VistaPostural } from "@/hooks/useAvaliacaoPostural";
import { useAnotacoesPosturais } from "@/hooks/useAnotacoesPosturais";
import { MeasurementCanvas } from "./measurements/MeasurementCanvas";
import type { ReferenceLine } from "./measurements/types";

interface MeasurementLayerProps {
  avaliacaoId: string;
  vista: VistaPostural;
  imageUrl: string;
}

/**
 * Provides a measurement button that opens the full-screen
 * biomechanical measurement canvas with draggable reference lines.
 * 
 * Stores measurement data as a special "measurements" key in
 * the annotations JSONB via the same hook.
 */
export const MeasurementLayer = ({ avaliacaoId, vista, imageUrl }: MeasurementLayerProps) => {
  const [editorOpen, setEditorOpen] = useState(false);

  // We reuse the annotations hook but we'll store measurements separately
  // by using a special vista key: `${vista}_measurements`
  const measurementVista = `${vista}_measurements` as VistaPostural;
  const { annotations, salvar } = useAnotacoesPosturais(avaliacaoId, measurementVista);

  // Cast: annotations are stored as ReferenceLine[] in the JSONB
  const lines = (annotations as unknown as ReferenceLine[]) || [];

  return (
    <>
      {/* Measurement button */}
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 left-10 h-7 w-7 bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 z-10"
        onClick={(e) => {
          e.stopPropagation();
          setEditorOpen(true);
        }}
        title="Medir ângulos"
      >
        <Ruler size={13} />
      </Button>

      {/* Full-screen measurement editor */}
      {editorOpen && (
        <MeasurementCanvas
          imageUrl={imageUrl}
          vista={vista}
          lines={lines}
          onSave={(newLines) => {
            salvar.mutate(newLines as any);
            setEditorOpen(false);
          }}
          isSaving={salvar.isPending}
          onClose={() => setEditorOpen(false)}
        />
      )}
    </>
  );
};
