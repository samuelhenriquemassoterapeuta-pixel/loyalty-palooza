import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AvaliacaoPostural, VistaPostural, useAvaliacoesPosturais } from "@/hooks/useAvaliacaoPostural";
import { VistaCaptura } from "./VistaCaptura";

const vistas: VistaPostural[] = ["anterior", "posterior", "lateral_direita", "lateral_esquerda"];

interface AvaliacaoDetailProps {
  avaliacao: AvaliacaoPostural;
  onBack: () => void;
}

export const AvaliacaoDetail = ({ avaliacao, onBack }: AvaliacaoDetailProps) => {
  const { uploadFoto, atualizar } = useAvaliacoesPosturais();
  const [obs, setObs] = useState(avaliacao.observacoes || "");
  const [pendingVista, setPendingVista] = useState<VistaPostural | null>(null);

  const handleCapture = async (vista: VistaPostural, file: File) => {
    setPendingVista(vista);
    await uploadFoto.mutateAsync({ avaliacaoId: avaliacao.id, vista, file });
    setPendingVista(null);
  };

  const handleSaveObs = () => {
    atualizar.mutate({ id: avaliacao.id, observacoes: obs });
  };

  const getSignedUrl = (vista: VistaPostural): string | undefined => {
    const key = `signed_${vista}` as keyof AvaliacaoPostural;
    return avaliacao[key] as string | undefined;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-5"
    >
      {/* Header */}
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft size={20} />
        </Button>
        <div>
          <h2 className="text-lg font-bold text-foreground">Captura de Fotos</h2>
          <p className="text-xs text-muted-foreground">
            Capture as 4 vistas padronizadas para uma avaliação completa
          </p>
        </div>
      </div>

      {/* Tips */}
      <div className="p-3 rounded-xl bg-primary/5 border border-primary/20">
        <p className="text-xs text-foreground font-medium mb-1">📸 Dicas para fotos melhores:</p>
        <ul className="text-[11px] text-muted-foreground space-y-0.5 list-disc list-inside">
          <li>Use roupa justa ou traje de banho</li>
          <li>Mantenha a câmera na altura do quadril</li>
          <li>Fundo neutro e boa iluminação</li>
          <li>Alinhe-se com a silhueta guia</li>
        </ul>
      </div>

      {/* 4 Vista captures */}
      <div className="grid grid-cols-2 gap-4">
        {vistas.map((vista) => (
          <VistaCaptura
            key={vista}
            vista={vista}
            existingUrl={getSignedUrl(vista)}
            onCapture={(file) => handleCapture(vista, file)}
            isPending={pendingVista === vista}
          />
        ))}
      </div>

      {/* Observations */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <MessageSquare size={14} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">Observações</span>
        </div>
        <Textarea
          placeholder="Anotações sobre a postura, dor, assimetrias observadas..."
          value={obs}
          onChange={(e) => setObs(e.target.value)}
          rows={3}
          className="text-sm"
        />
        <Button
          size="sm"
          onClick={handleSaveObs}
          disabled={atualizar.isPending || obs === (avaliacao.observacoes || "")}
          className="gap-1.5"
        >
          <Save size={14} />
          Salvar observações
        </Button>
      </div>
    </motion.div>
  );
};
