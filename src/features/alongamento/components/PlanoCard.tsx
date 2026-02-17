import { motion } from "framer-motion";
import { Calendar, Clock, Target, Zap, Play, Pause } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PlanoAlongamento } from "@/features/alongamento/hooks/useAlongamento";

const nivelConfig: Record<string, { label: string; icon: typeof Zap; color: string }> = {
  iniciante: { label: "Iniciante", icon: Zap, color: "bg-highlight/10 text-highlight" },
  intermediario: { label: "Intermediário", icon: Zap, color: "bg-warning/10 text-warning" },
  avancado: { label: "Avançado", icon: Zap, color: "bg-destructive/10 text-destructive" },
};

const objetivoEmoji: Record<string, string> = {
  flexibilidade: "🧘",
  alivio_dor: "💆",
  postura: "🧍",
  relaxamento: "🌿",
  mobilidade: "🏃",
};

interface PlanoCardProps {
  plano: PlanoAlongamento;
  index: number;
  ativo?: boolean;
  onAtivar: () => void;
  onPausar?: () => void;
  onVerExercicios: () => void;
}

export const PlanoCard = ({ plano, index, ativo, onAtivar, onPausar, onVerExercicios }: PlanoCardProps) => {
  const nivel = nivelConfig[plano.nivel] || nivelConfig.iniciante;
  const emoji = objetivoEmoji[plano.objetivo] || "✨";

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.08 }}
    >
      <Card className={`p-5 hover-lift ${ativo ? "ring-2 ring-primary shadow-glow" : ""}`}>
        <div className="flex items-start gap-3 mb-4">
          <div className="shrink-0 w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center text-xl">
            {plano.imagem_url || emoji}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-foreground line-clamp-1">{plano.nome}</h3>
            <Badge variant="outline" className={`text-[10px] mt-1 ${nivel.color} border-0`}>
              {nivel.label}
            </Badge>
          </div>
          {ativo && (
            <span className="shrink-0 text-[10px] font-bold text-primary bg-primary/10 px-2 py-1 rounded-full">
              Ativo
            </span>
          )}
        </div>

        {plano.descricao && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{plano.descricao}</p>
        )}

        <div className="grid grid-cols-3 gap-2 mb-4">
          <div className="bg-muted/50 rounded-lg p-2 text-center">
            <Calendar size={14} className="text-primary mx-auto mb-0.5" />
            <p className="text-[10px] text-muted-foreground">{plano.duracao_semanas} sem</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-2 text-center">
            <Clock size={14} className="text-primary mx-auto mb-0.5" />
            <p className="text-[10px] text-muted-foreground">{plano.frequencia_semanal}x/sem</p>
          </div>
          <div className="bg-muted/50 rounded-lg p-2 text-center">
            <Target size={14} className="text-primary mx-auto mb-0.5" />
            <p className="text-[10px] text-muted-foreground capitalize">{plano.objetivo.replace("_", " ")}</p>
          </div>
        </div>

        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1"
            onClick={onVerExercicios}
          >
            Ver exercícios
          </Button>
          {ativo ? (
            <Button
              variant="outline"
              size="sm"
              className="flex-1 text-destructive border-destructive/30"
              onClick={onPausar}
            >
              <Pause size={14} />
              Pausar
            </Button>
          ) : (
            <Button size="sm" className="flex-1" onClick={onAtivar}>
              <Play size={14} />
              Iniciar
            </Button>
          )}
        </div>
      </Card>
    </motion.div>
  );
};
