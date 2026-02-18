import { motion } from "framer-motion";
import { Flame, Clock } from "lucide-react";
import type { MomentsMissao } from "@/features/social/hooks/useSocialPosts";

interface Props {
  missao: MomentsMissao;
  isActive: boolean;
  onSelect: (id: string | null) => void;
  selectedId: string | null;
}

export const MomentsMissaoCard = ({ missao, isActive, onSelect, selectedId }: Props) => {
  const diasRestantes = Math.max(0, Math.ceil((new Date(missao.data_fim).getTime() - Date.now()) / 86400000));
  const selected = selectedId === missao.id;

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={() => onSelect(selected ? null : missao.id)}
      className={`w-full p-4 rounded-2xl text-left transition-all duration-200 ${
        selected
          ? "ring-2 ring-warning/60 bg-warning/10"
          : "glass-card-strong hover:bg-warning/5"
      }`}
    >
      <div className="flex items-start gap-3">
        <div className="p-2.5 rounded-xl bg-warning/15 shrink-0">
          <Flame size={20} className="text-warning" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm">{missao.titulo}</p>
          {missao.descricao && (
            <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">{missao.descricao}</p>
          )}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-[10px] font-medium text-warning bg-warning/10 px-2 py-0.5 rounded-full">
              {missao.multiplicador_cashback}x Cashback
            </span>
            <span className="text-[10px] font-medium text-primary bg-primary/10 px-2 py-0.5 rounded-full">
              {missao.multiplicador_cromos}x Cromos
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1 text-muted-foreground shrink-0">
          <Clock size={12} />
          <span className="text-[10px]">{diasRestantes}d</span>
        </div>
      </div>
    </motion.button>
  );
};
