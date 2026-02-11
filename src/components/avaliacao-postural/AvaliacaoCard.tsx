import { motion } from "framer-motion";
import { Calendar, Image, ChevronRight, Trash2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AvaliacaoPostural } from "@/hooks/useAvaliacaoPostural";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface AvaliacaoCardProps {
  avaliacao: AvaliacaoPostural;
  index: number;
  onSelect: () => void;
  onDelete: () => void;
}

export const AvaliacaoCard = ({ avaliacao, index, onSelect, onDelete }: AvaliacaoCardProps) => {
  const fotos = [
    avaliacao.signed_anterior,
    avaliacao.signed_posterior,
    avaliacao.signed_lateral_direita,
    avaliacao.signed_lateral_esquerda,
  ].filter(Boolean) as string[];

  const totalFotos = fotos.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
    >
      <Card className="p-4 cursor-pointer hover-lift group" onClick={onSelect}>
        <div className="flex items-start gap-3">
          {/* Thumbnail previews */}
          <div className="shrink-0 grid grid-cols-2 gap-0.5 w-14 h-14 rounded-xl overflow-hidden bg-muted/30">
            {fotos.slice(0, 4).map((url, i) => (
              <img
                key={i}
                src={url}
                alt=""
                className="w-full h-full object-cover"
              />
            ))}
            {Array.from({ length: Math.max(0, 4 - fotos.length) }).map((_, i) => (
              <div key={`empty-${i}`} className="w-full h-full bg-muted/50 flex items-center justify-center">
                <Image size={8} className="text-muted-foreground/30" />
              </div>
            ))}
          </div>

          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground text-sm">
              Avaliação Postural
            </h4>
            <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
              <Calendar size={12} />
              {format(new Date(avaliacao.data), "dd 'de' MMMM 'de' yyyy", { locale: ptBR })}
            </div>
            <div className="flex items-center gap-2 mt-1.5">
              <span className="text-[10px] text-muted-foreground">
                {totalFotos}/4 vistas capturadas
              </span>
              {totalFotos === 4 && (
                <span className="text-[10px] text-highlight font-medium">
                  ✓ Completa
                </span>
              )}
            </div>
            {avaliacao.observacoes && (
              <p className="text-xs text-muted-foreground mt-1 line-clamp-1 italic">
                {avaliacao.observacoes}
              </p>
            )}
          </div>

          <div className="flex flex-col items-center gap-1 shrink-0">
            <ChevronRight size={16} className="text-muted-foreground group-hover:text-primary transition-colors" />
            <Button
              variant="ghost"
              size="icon"
              className="h-7 w-7 text-muted-foreground hover:text-destructive"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Trash2 size={13} />
            </Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
