import { motion } from "framer-motion";
import { Pencil, Trash2, Percent } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { LoadingSpinner } from "@/components/LoadingSpinner";

interface CrudListTabProps {
  items: any[];
  isLoading: boolean;
  emptyMessage: string;
  type: "produtos" | "servicos" | "pacotes";
  onEdit: (item: any) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string, disponivel: boolean) => void;
}

export const CrudListTab = ({
  items,
  isLoading,
  emptyMessage,
  type,
  onEdit,
  onDelete,
  onToggle,
}: CrudListTabProps) => {
  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground">
        {emptyMessage}
      </div>
    );
  }

  const renderItemDetails = (item: any) => {
    switch (type) {
      case "produtos":
        return (
          <>
            <p className="text-sm text-muted-foreground truncate">{item.categoria}</p>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-primary">
                R$ {item.preco.toFixed(2).replace(".", ",")}
              </p>
              {(item.cashback_percentual ?? 0) > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-highlight/20 text-highlight flex items-center gap-0.5">
                  <Percent size={10} />
                  {item.cashback_percentual}%
                </span>
              )}
            </div>
          </>
        );
      case "servicos":
        return (
          <>
            <p className="text-sm text-muted-foreground">{item.duracao} min</p>
            <div className="flex items-center gap-2 flex-wrap">
              <p className="text-sm font-semibold text-primary">
                R$ {item.preco.toFixed(2).replace(".", ",")}
              </p>
              {(item.cashback_percentual ?? 0) > 0 && (
                <span className="text-xs px-2 py-0.5 rounded-full bg-highlight/20 text-highlight flex items-center gap-0.5">
                  <Percent size={10} />
                  {item.cashback_percentual}%
                </span>
              )}
            </div>
          </>
        );
      case "pacotes":
        return (
          <>
            <p className="text-sm text-muted-foreground">
              {item.total_sessoes} sessões
            </p>
            <p className="text-sm font-semibold text-primary">
              R$ {item.preco.toFixed(2).replace(".", ",")}
            </p>
          </>
        );
    }
  };

  return (
    <div className="space-y-3">
      {items.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-3 p-4 rounded-xl bg-card shadow-card"
        >
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <p className="font-semibold text-foreground text-sm sm:text-base truncate">
                {item.nome}
              </p>
              {!item.disponivel && (
                <span className="text-xs px-2 py-0.5 rounded bg-destructive/10 text-destructive shrink-0">
                  Indisponível
                </span>
              )}
            </div>
            {renderItemDetails(item)}
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <Switch
              checked={item.disponivel ?? true}
              onCheckedChange={() => onToggle(item.id, item.disponivel ?? true)}
            />
            <Button
              size="icon"
              variant="ghost"
              onClick={() => onEdit(item)}
              className="h-8 w-8"
            >
              <Pencil className="w-4 h-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="text-destructive h-8 w-8"
              onClick={() => onDelete(item.id)}
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      ))}
    </div>
  );
};
