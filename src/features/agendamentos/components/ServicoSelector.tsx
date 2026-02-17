import { motion } from "framer-motion";
import { Sparkles, Clock, Check, Loader2, Percent } from "lucide-react";
import { Servico } from "@/features/terapias/hooks/useServicos";

interface ServicoSelectorProps {
  servicos: Servico[];
  loading: boolean;
  selectedId: string | null;
  onSelect: (servico: Servico) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

export const ServicoSelector = ({ servicos, loading, selectedId, onSelect }: ServicoSelectorProps) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-3">
      <motion.div variants={fadeUp}>
        <p className="section-label flex items-center gap-2 px-1">
          <Sparkles size={16} className="text-primary" />
          Escolha o serviço
        </p>
      </motion.div>
      
      {servicos.map((servico) => {
        const cashback = (servico as any).cashback_percentual || 0;
        
        return (
          <motion.div key={servico.id} variants={fadeUp}>
            <div
              className={`glass-card rounded-2xl p-4 cursor-pointer transition-all ${
                selectedId === servico.id
                  ? "ring-2 ring-primary bg-primary/5"
                  : "hover:bg-muted/30"
              }`}
              onClick={() => onSelect(servico)}
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-foreground">{servico.nome}</p>
                    {cashback > 0 && (
                      <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-highlight/20 text-highlight text-[10px] font-semibold">
                        <Percent size={8} />
                        {cashback}%
                      </span>
                    )}
                  </div>
                  {servico.descricao && (
                    <p className="text-xs text-muted-foreground mt-0.5">{servico.descricao}</p>
                  )}
                  <div className="flex items-center gap-3 mt-2">
                    <span className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Clock size={12} />
                      {servico.duracao} min
                    </span>
                    <span className="font-semibold text-primary">
                      R$ {servico.preco.toFixed(2).replace('.', ',')}
                    </span>
                    {cashback > 0 && (
                      <span className="text-[10px] text-highlight">
                        +R$ {(servico.preco * cashback / 100).toFixed(2).replace('.', ',')} cashback
                      </span>
                    )}
                  </div>
                </div>
                {selectedId === servico.id && (
                  <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                    <Check size={14} className="text-primary-foreground" />
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </motion.div>
  );
};
