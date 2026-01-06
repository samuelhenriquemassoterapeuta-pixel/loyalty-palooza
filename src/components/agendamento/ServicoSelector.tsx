import { motion } from "framer-motion";
import { Sparkles, Clock, Check, Loader2, Percent } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Servico } from "@/hooks/useServicos";

interface ServicoSelectorProps {
  servicos: Servico[];
  loading: boolean;
  selectedId: string | null;
  onSelect: (servico: Servico) => void;
}

export const ServicoSelector = ({ servicos, loading, selectedId, onSelect }: ServicoSelectorProps) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="font-semibold text-foreground flex items-center gap-2">
        <Sparkles size={18} className="text-primary" />
        Escolha o serviço
      </h3>
      
      <div className="space-y-2">
        {servicos.map((servico, index) => {
          const cashback = (servico as any).cashback_percentual || 0;
          
          return (
            <motion.div
              key={servico.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-all hover:shadow-elevated ${
                  selectedId === servico.id
                    ? "ring-2 ring-primary bg-primary/5"
                    : ""
                }`}
                onClick={() => onSelect(servico)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{servico.nome}</p>
                      {cashback > 0 && (
                        <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded-full bg-green-500/20 text-green-600 text-[10px] font-semibold">
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
                        <span className="text-[10px] text-green-600">
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
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
