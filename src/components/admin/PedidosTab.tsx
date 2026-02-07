import { motion } from "framer-motion";
import { Clock, Check, CheckCircle, XCircle } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface PedidosTabProps {
  pedidos: any[];
  isLoading: boolean;
  onUpdateStatus: (pedidoId: string, newStatus: string) => void;
}

export const PedidosTab = ({ pedidos, isLoading, onUpdateStatus }: PedidosTabProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  if (pedidos.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        Nenhum pedido encontrado
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {pedidos.map((pedido: any) => (
        <motion.div
          key={pedido.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-4 rounded-xl bg-card shadow-card space-y-3"
        >
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <p className="font-semibold text-foreground text-sm sm:text-base">
                Pedido #{pedido.id.slice(0, 8)}
              </p>
              <p className="text-sm text-muted-foreground truncate">
                {pedido.profiles?.nome || "Cliente"}
              </p>
              <p className="text-xs text-muted-foreground">
                {format(new Date(pedido.created_at), "dd/MM/yyyy 'às' HH:mm", {
                  locale: ptBR,
                })}
              </p>
            </div>
            <Select
              value={pedido.status}
              onValueChange={(value) => onUpdateStatus(pedido.id, value)}
            >
              <SelectTrigger className="w-[130px] shrink-0">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pendente">
                  <div className="flex items-center gap-2">
                    <Clock size={14} className="text-warning" />
                    Pendente
                  </div>
                </SelectItem>
                <SelectItem value="confirmado">
                  <div className="flex items-center gap-2">
                    <Check size={14} className="text-info" />
                    Confirmado
                  </div>
                </SelectItem>
                <SelectItem value="entregue">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={14} className="text-highlight" />
                    Entregue
                  </div>
                </SelectItem>
                <SelectItem value="cancelado">
                  <div className="flex items-center gap-2">
                    <XCircle size={14} className="text-destructive" />
                    Cancelado
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Itens do pedido */}
          {pedido.pedido_itens && pedido.pedido_itens.length > 0 && (
            <div className="bg-muted/50 rounded-lg p-2 space-y-1">
              {pedido.pedido_itens.map((item: any) => (
                <div key={item.id} className="flex justify-between text-sm">
                  <span className="text-muted-foreground truncate mr-2">
                    {item.quantidade}x {item.produtos?.nome || "Produto"}
                  </span>
                  <span className="font-medium shrink-0">
                    R${" "}
                    {(item.quantidade * item.preco_unitario)
                      .toFixed(2)
                      .replace(".", ",")}
                  </span>
                </div>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center pt-2 border-t border-border">
            <span className="text-sm text-muted-foreground">Total</span>
            <span className="font-bold text-primary">
              R$ {pedido.total.toFixed(2).replace(".", ",")}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
