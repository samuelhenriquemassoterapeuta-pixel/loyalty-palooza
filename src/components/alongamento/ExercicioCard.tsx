import { motion } from "framer-motion";
import { Clock, Repeat, ChevronRight, Lock } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ExercicioAlongamento } from "@/hooks/useAlongamento";
import { ExercicioAnimado } from "./ExercicioAnimado";

const nivelConfig: Record<string, { label: string; color: string }> = {
  iniciante: { label: "Iniciante", color: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" },
  intermediario: { label: "Intermediário", color: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400" },
  avancado: { label: "Avançado", color: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400" },
};

interface ExercicioCardProps {
  exercicio: ExercicioAlongamento;
  index: number;
  onClick?: () => void;
  bloqueado?: boolean;
}

export const ExercicioCard = ({ exercicio, index, onClick, bloqueado = false }: ExercicioCardProps) => {
  const nivel = nivelConfig[exercicio.nivel] || nivelConfig.iniciante;
  const categoria = exercicio.categoria as any;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.04 }}
    >
      <Card
        className={`p-4 group ${bloqueado ? "opacity-60 cursor-not-allowed" : "cursor-pointer hover-lift"}`}
        onClick={bloqueado ? undefined : onClick}
      >
        <div className="flex items-start gap-3">
          <div className="shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center overflow-hidden">
            {bloqueado ? (
              <Lock size={20} className="text-muted-foreground" />
            ) : (
              <ExercicioAnimado tipo={categoria} size={40} />
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-semibold text-foreground text-sm line-clamp-1">{exercicio.nome}</h4>
            {exercicio.descricao && (
              <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">{exercicio.descricao}</p>
            )}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              <Badge variant="outline" className={`text-[10px] ${nivel.color} border-0`}>
                {nivel.label}
              </Badge>
              <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                <Clock size={10} />
                {exercicio.duracao_segundos}s
              </span>
              {exercicio.repeticoes && (
                <span className="flex items-center gap-1 text-[10px] text-muted-foreground">
                  <Repeat size={10} />
                  {exercicio.repeticoes}x
                </span>
              )}
              {bloqueado && (
                <Badge variant="outline" className="text-[9px] border-muted-foreground/30 text-muted-foreground">
                  🔒 Bloqueado
                </Badge>
              )}
            </div>
          </div>
          <ChevronRight size={16} className="text-muted-foreground shrink-0 mt-1 group-hover:text-primary transition-colors" />
        </div>
      </Card>
    </motion.div>
  );
};
