import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { ELEMENTO_CONFIG, type ReceitaAlquimia, type Elemento } from "../hooks/useCromos";

interface Props {
  receita: ReceitaAlquimia;
  podeExecutar: boolean;
  executando: boolean;
  onExecutar: () => void;
  getSaldo: (el: Elemento) => number;
}

const INGREDIENTES_KEYS: { key: keyof ReceitaAlquimia; el: Elemento }[] = [
  { key: "terra_requerido", el: "terra" },
  { key: "agua_requerido", el: "agua" },
  { key: "fogo_requerido", el: "fogo" },
  { key: "ar_requerido", el: "ar" },
  { key: "eter_requerido", el: "eter" },
];

export const ReceitaAlquimiaCard = ({ receita, podeExecutar, executando, onExecutar, getSaldo }: Props) => {
  const ingredientes = INGREDIENTES_KEYS.filter(
    (i) => (receita[i.key] as number) > 0
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-4 space-y-3"
    >
      <div className="flex items-start gap-3">
        <span className="text-2xl">{receita.icone}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-foreground">{receita.nome}</h3>
          {receita.descricao && (
            <p className="text-xs text-muted-foreground line-clamp-2">{receita.descricao}</p>
          )}
        </div>
      </div>

      {/* Ingredientes */}
      <div className="flex flex-wrap gap-2">
        {ingredientes.map(({ key, el }) => {
          const qtdReq = receita[key] as number;
          const saldo = getSaldo(el);
          const cfg = ELEMENTO_CONFIG[el];
          const suficiente = saldo >= qtdReq;
          return (
            <div
              key={el}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-medium ${
                suficiente ? cfg.corBg : "bg-destructive/10"
              }`}
            >
              <span>{cfg.emoji}</span>
              <span className={suficiente ? cfg.cor : "text-destructive"}>
                {saldo}/{qtdReq}
              </span>
            </div>
          );
        })}
      </div>

      {/* Recompensa */}
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          → {receita.recompensa_descricao || `${receita.recompensa_tipo}: ${receita.recompensa_valor}`}
        </p>
        <Button
          size="sm"
          disabled={!podeExecutar || executando}
          onClick={onExecutar}
          className="rounded-xl"
        >
          {executando ? <Loader2 className="animate-spin" size={14} /> : "⚗️ Combinar"}
        </Button>
      </div>
    </motion.div>
  );
};
