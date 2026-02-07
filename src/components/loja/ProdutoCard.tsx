import { motion } from "framer-motion";
import { Plus, Check, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Produto {
  id: string;
  nome: string;
  descricao: string | null;
  preco: number;
  imagem_url: string | null;
  cashback_percentual?: number;
}

interface ProdutoCardProps {
  produto: Produto;
  index: number;
  noCarrinho: boolean;
  onToggle: () => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

export const ProdutoCard = ({ produto, index, noCarrinho, onToggle }: ProdutoCardProps) => {
  const cashback = produto.cashback_percentual || 0;
  
  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      animate="show"
      transition={{ delay: index * 0.04 }}
    >
      <div className="glass-card rounded-2xl p-3 relative overflow-hidden hover:shadow-elevated transition-shadow">
        {/* Cashback badge */}
        {cashback > 0 && (
          <div className="absolute top-2 right-2 flex items-center gap-1 px-2 py-1 rounded-full bg-highlight/20 text-highlight text-[10px] font-semibold">
            <Percent size={10} />
            {cashback}% cashback
          </div>
        )}
        
        <div className="text-4xl mb-2 text-center">
          {produto.imagem_url?.startsWith("http") ? (
            <img 
              src={produto.imagem_url} 
              alt={produto.nome} 
              className="w-12 h-12 mx-auto object-cover rounded-xl" 
            />
          ) : (
            produto.imagem_url || "📦"
          )}
        </div>
        
        <h3 className="font-medium text-sm line-clamp-1">{produto.nome}</h3>
        <p className="text-[10px] text-muted-foreground line-clamp-2 mt-0.5 min-h-[28px]">
          {produto.descricao}
        </p>
        
        <div className="flex items-center justify-between mt-2">
          <div>
            <p className="font-bold text-sm">
              R$ {produto.preco.toFixed(2).replace('.', ',')}
            </p>
            {cashback > 0 && (
              <p className="text-[9px] text-highlight">
                +R$ {(produto.preco * cashback / 100).toFixed(2).replace('.', ',')} volta
              </p>
            )}
          </div>
          
          <Button
            size="icon"
            variant={noCarrinho ? "default" : "outline"}
            className="h-8 w-8 rounded-xl"
            onClick={onToggle}
          >
            {noCarrinho ? <Check size={16} /> : <Plus size={16} />}
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
