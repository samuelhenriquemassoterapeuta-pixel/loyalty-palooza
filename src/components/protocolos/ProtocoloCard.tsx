import { motion } from "framer-motion";
import { Clock, Calendar, ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface ProtocoloCardProps {
  protocolo: {
    id: string;
    nome: string;
    descricao: string | null;
    tipo: string;
    duracao_semanas: number;
    sessoes_por_semana: number;
    beneficios: string | null;
  };
  isAtivo?: boolean;
  onSelect: () => void;
}

const tipoLabels: Record<string, { label: string; class: string }> = {
  emagrecimento: {
    label: "Emagrecimento",
    class: "bg-highlight/15 text-highlight border-highlight/30",
  },
  drenagem_pos_operatorio: {
    label: "Drenagem Pós-Op",
    class: "bg-info/15 text-info border-info/30",
  },
  postural: {
    label: "Postural",
    class: "bg-purple-100 text-purple-700 border-purple-300 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-700/30",
  },
};

export const ProtocoloCard = ({
  protocolo,
  isAtivo,
  onSelect,
}: ProtocoloCardProps) => {
  const tipo = tipoLabels[protocolo.tipo] ?? tipoLabels.emagrecimento;

  return (
    <motion.button
      onClick={onSelect}
      whileTap={{ scale: 0.98 }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={`w-full text-left p-5 rounded-2xl border transition-all duration-200 ${
        isAtivo
          ? "bg-primary/5 border-primary/30 shadow-md backdrop-blur-lg"
          : "glass-card hover:shadow-elevated"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="outline" className={`text-[10px] ${tipo.class}`}>
              {tipo.label}
            </Badge>
            {isAtivo && (
              <Badge className="bg-primary/20 text-primary text-[10px] border-0">
                Ativo
              </Badge>
            )}
          </div>
          <h3 className="font-semibold text-foreground truncate">
            {protocolo.nome}
          </h3>
          {protocolo.descricao && (
            <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
              {protocolo.descricao}
            </p>
          )}
          <div className="flex items-center gap-4 mt-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              <Calendar size={13} />
              {protocolo.duracao_semanas} semanas
            </span>
            <span className="flex items-center gap-1">
              <Clock size={13} />
              {protocolo.sessoes_por_semana}x/semana
            </span>
          </div>
        </div>
        <ChevronRight
          size={18}
          className="text-muted-foreground mt-1 shrink-0"
        />
      </div>
    </motion.button>
  );
};
