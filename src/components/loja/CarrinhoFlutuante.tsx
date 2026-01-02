import { motion } from "framer-motion";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface CarrinhoFlutuanteProps {
  quantidade: number;
  total: number;
  saving: boolean;
  onReservar: () => void;
}

export const CarrinhoFlutuante = ({ quantidade, total, saving, onReservar }: CarrinhoFlutuanteProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-20 left-4 right-4 max-w-lg mx-auto z-50"
    >
      <Card className="p-4 bg-primary text-primary-foreground shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium">
              {quantidade} {quantidade === 1 ? 'item' : 'itens'} no carrinho
            </p>
            <p className="text-xs opacity-90">
              Total: R$ {total.toFixed(2).replace('.', ',')}
            </p>
          </div>
          <Button 
            variant="secondary" 
            size="sm"
            onClick={onReservar}
            disabled={saving}
          >
            {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Reservar"}
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};
