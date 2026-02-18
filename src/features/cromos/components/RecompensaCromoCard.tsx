import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ELEMENTO_CONFIG, type RecompensaCromo, type Elemento } from "../hooks/useCromos";

interface Props {
  recompensa: RecompensaCromo;
  podeResgatar: boolean;
  resgatando: boolean;
  onResgatar: () => void;
  getSaldo: (el: Elemento) => number;
}

export const RecompensaCromoCard = ({ recompensa, podeResgatar, resgatando, onResgatar, getSaldo }: Props) => {
  const cfg = ELEMENTO_CONFIG[recompensa.elemento_requerido];
  const saldo = getSaldo(recompensa.elemento_requerido);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-4 space-y-3"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{recompensa.icone}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground">{recompensa.nome}</h3>
          {recompensa.descricao && (
            <p className="text-xs text-muted-foreground line-clamp-2">{recompensa.descricao}</p>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${cfg.corBg}`}>
          <span>{cfg.emoji}</span>
          <span className={saldo >= recompensa.quantidade_requerida ? cfg.cor : "text-destructive"}>
            {saldo}/{recompensa.quantidade_requerida} {cfg.nome}
          </span>
        </div>
        <Button
          size="sm"
          disabled={!podeResgatar || resgatando}
          onClick={onResgatar}
          className="rounded-xl"
        >
          {resgatando ? <Loader2 className="animate-spin" size={14} /> : "🎁 Resgatar"}
        </Button>
      </div>

      {recompensa.estoque !== null && (
        <p className="text-[10px] text-muted-foreground text-right">
          {recompensa.estoque} restantes
        </p>
      )}
    </motion.div>
  );
};
