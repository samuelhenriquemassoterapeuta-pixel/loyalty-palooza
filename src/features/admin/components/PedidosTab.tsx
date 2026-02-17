import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock,
  Check,
  CheckCircle,
  XCircle,
  Search,
  Filter,
  ShoppingBag,
} from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
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

const STATUS_OPTIONS = [
  { value: "all", label: "Todos", icon: null },
  { value: "pendente", label: "Pendente", icon: Clock, colorClass: "text-warning" },
  { value: "confirmado", label: "Confirmado", icon: Check, colorClass: "text-info" },
  { value: "entregue", label: "Entregue", icon: CheckCircle, colorClass: "text-highlight" },
  { value: "cancelado", label: "Cancelado", icon: XCircle, colorClass: "text-destructive" },
];

export const PedidosTab = ({
  pedidos,
  isLoading,
  onUpdateStatus,
}: PedidosTabProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const filteredPedidos = useMemo(() => {
    return pedidos.filter((pedido: any) => {
      // Search filter
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        const matchId = pedido.id.toLowerCase().includes(term);
        const matchCliente = (pedido.profiles?.nome || "")
          .toLowerCase()
          .includes(term);
        const matchProduto = pedido.pedido_itens?.some((item: any) =>
          (item.produtos?.nome || "").toLowerCase().includes(term)
        );
        if (!matchId && !matchCliente && !matchProduto) return false;
      }

      // Status filter
      if (statusFilter !== "all" && pedido.status !== statusFilter) return false;

      // Date filters
      if (dateFrom) {
        const pedidoDate = new Date(pedido.created_at);
        const fromDate = new Date(dateFrom);
        fromDate.setHours(0, 0, 0, 0);
        if (pedidoDate < fromDate) return false;
      }

      if (dateTo) {
        const pedidoDate = new Date(pedido.created_at);
        const toDate = new Date(dateTo);
        toDate.setHours(23, 59, 59, 999);
        if (pedidoDate > toDate) return false;
      }

      return true;
    });
  }, [pedidos, searchTerm, statusFilter, dateFrom, dateTo]);

  const hasActiveFilters =
    statusFilter !== "all" || searchTerm || dateFrom || dateTo;

  const clearFilters = () => {
    setSearchTerm("");
    setStatusFilter("all");
    setDateFrom("");
    setDateTo("");
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Search & Filters */}
      <div className="space-y-3">
        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Buscar por ID, cliente ou produto..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Button
            variant={showFilters ? "secondary" : "outline"}
            size="icon"
            onClick={() => setShowFilters(!showFilters)}
          >
            <Filter size={18} />
          </Button>
        </div>

        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card className="p-4 space-y-4">
                <div className="space-y-1.5">
                  <Label className="text-sm">Status</Label>
                  <Select
                    value={statusFilter}
                    onValueChange={setStatusFilter}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Todos os status" />
                    </SelectTrigger>
                    <SelectContent className="bg-popover">
                      {STATUS_OPTIONS.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          <div className="flex items-center gap-2">
                            {opt.icon && (
                              <opt.icon size={14} className={opt.colorClass} />
                            )}
                            {opt.label}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label className="text-sm">Data inicial</Label>
                    <Input
                      type="date"
                      value={dateFrom}
                      onChange={(e) => setDateFrom(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1.5">
                    <Label className="text-sm">Data final</Label>
                    <Input
                      type="date"
                      value={dateTo}
                      onChange={(e) => setDateTo(e.target.value)}
                    />
                  </div>
                </div>

                {hasActiveFilters && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={clearFilters}
                    className="w-full"
                  >
                    Limpar filtros
                  </Button>
                )}
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Results count */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>
          {filteredPedidos.length} pedido
          {filteredPedidos.length !== 1 ? "s" : ""}{" "}
          {hasActiveFilters ? "encontrado" : ""}
          {filteredPedidos.length !== 1 && hasActiveFilters ? "s" : ""}
        </span>
        {hasActiveFilters && (
          <Badge variant="secondary" className="text-xs">
            Filtros ativos
          </Badge>
        )}
      </div>

      {/* Pedidos list */}
      {filteredPedidos.length === 0 ? (
        <div className="text-center py-8">
          <ShoppingBag className="w-12 h-12 text-muted-foreground mx-auto mb-2 opacity-50" />
          <p className="text-muted-foreground">
            {hasActiveFilters
              ? "Nenhum pedido encontrado com esses filtros"
              : "Nenhum pedido encontrado"}
          </p>
          {hasActiveFilters && (
            <Button
              variant="link"
              onClick={clearFilters}
              className="mt-1"
            >
              Limpar filtros
            </Button>
          )}
        </div>
      ) : (
        <div className="space-y-3">
          {filteredPedidos.map((pedido: any) => (
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
                    {format(
                      new Date(pedido.created_at),
                      "dd/MM/yyyy 'às' HH:mm",
                      { locale: ptBR }
                    )}
                  </p>
                </div>
                <Select
                  value={pedido.status}
                  onValueChange={(value) =>
                    onUpdateStatus(pedido.id, value)
                  }
                >
                  <SelectTrigger className="w-[130px] shrink-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.filter((o) => o.value !== "all").map(
                      (opt) => (
                        <SelectItem key={opt.value} value={opt.value}>
                          <div className="flex items-center gap-2">
                            {opt.icon && (
                              <opt.icon
                                size={14}
                                className={opt.colorClass}
                              />
                            )}
                            {opt.label}
                          </div>
                        </SelectItem>
                      )
                    )}
                  </SelectContent>
                </Select>
              </div>

              {/* Itens do pedido */}
              {pedido.pedido_itens && pedido.pedido_itens.length > 0 && (
                <div className="bg-muted/50 rounded-lg p-2 space-y-1">
                  {pedido.pedido_itens.map((item: any) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-muted-foreground truncate mr-2">
                        {item.quantidade}x{" "}
                        {item.produtos?.nome || "Produto"}
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
      )}
    </div>
  );
};
