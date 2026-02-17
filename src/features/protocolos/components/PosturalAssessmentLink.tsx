import { motion, type Variants } from "framer-motion";
import { Camera, ChevronRight, Image, CalendarDays, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAvaliacoesPosturais } from "@/features/avaliacao-postural/hooks/useAvaliacaoPostural";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PosturalAssessmentLinkProps {
  variants?: Variants;
}

export const PosturalAssessmentLink = ({ variants }: PosturalAssessmentLinkProps) => {
  const { avaliacoes, isLoading } = useAvaliacoesPosturais();
  const navigate = useNavigate();

  if (isLoading) return null;

  const ultima = avaliacoes[0]; // Already sorted desc

  const thumbnails = ultima
    ? [
        ultima.signed_anterior,
        ultima.signed_posterior,
        ultima.signed_lateral_direita,
        ultima.signed_lateral_esquerda,
      ].filter(Boolean) as string[]
    : [];

  const totalFotos = thumbnails.length;

  return (
    <motion.div variants={variants}>
      <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-info/10">
            <Camera size={14} className="text-info" />
          </div>
          <h4 className="text-sm font-semibold text-foreground">Avaliação Postural</h4>
        </div>

        {ultima ? (
          <button
            onClick={() => navigate("/avaliacao-postural")}
            className="w-full text-left group"
          >
            <div className="flex items-center gap-3">
              {/* Thumbnail grid */}
              <div className="shrink-0 grid grid-cols-2 gap-0.5 w-14 h-14 rounded-xl overflow-hidden bg-muted/30">
                {thumbnails.slice(0, 4).map((url, i) => (
                  <img
                    key={i}
                    src={url}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                ))}
                {Array.from({ length: Math.max(0, 4 - thumbnails.length) }).map((_, i) => (
                  <div
                    key={`empty-${i}`}
                    className="w-full h-full bg-muted/50 flex items-center justify-center"
                  >
                    <Image size={8} className="text-muted-foreground/30" />
                  </div>
                ))}
              </div>

              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <CalendarDays size={11} />
                  Última: {format(new Date(ultima.data), "dd/MM/yyyy", { locale: ptBR })}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-[10px] text-muted-foreground">
                    {totalFotos}/4 vistas
                  </span>
                  {totalFotos === 4 && (
                    <span className="text-[10px] text-highlight font-medium">
                      ✓ Completa
                    </span>
                  )}
                </div>
              </div>

              <ChevronRight
                size={16}
                className="text-muted-foreground group-hover:text-primary transition-colors shrink-0"
              />
            </div>
          </button>
        ) : (
          <div className="text-center py-2 space-y-2">
            <p className="text-xs text-muted-foreground">
              Nenhuma avaliação postural ainda. Registre fotos nas 4 vistas para acompanhar sua evolução.
            </p>
          </div>
        )}

        <Button
          variant={ultima ? "outline" : "default"}
          size="sm"
          className="w-full gap-1.5 text-xs"
          onClick={() => navigate("/avaliacao-postural")}
        >
          {ultima ? (
            <>
              <Camera size={14} /> Ver Avaliações
            </>
          ) : (
            <>
              <Plus size={14} /> Criar Primeira Avaliação
            </>
          )}
        </Button>
      </div>
    </motion.div>
  );
};
