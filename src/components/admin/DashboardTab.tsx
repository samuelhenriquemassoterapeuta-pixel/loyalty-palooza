import { Card } from "@/components/ui/card";
import { SalesCharts } from "./SalesCharts";
import {
  DollarSign,
  Calendar,
  TrendingUp,
  Users,
  BarChart3,
  Clock,
  Check,
  CheckCircle,
  XCircle,
  Package,
  Scissors,
  Gift,
} from "lucide-react";

interface DashboardStats {
  totalVendas: number;
  totalPedidos: number;
  pedidosPendentes: number;
  pedidosEntregues: number;
  pedidosConfirmados: number;
  pedidosCancelados: number;
  totalCashbackDistribuido: number;
  totalCashbackUsado: number;
  usuariosAtivos: number;
  vendasHoje: number;
  pedidosHoje: number;
  totalProdutos: number;
  totalServicos: number;
  totalPacotes: number;
}

interface DashboardTabProps {
  stats: DashboardStats;
  pedidos: any[];
  transacoes: any[];
}

export const DashboardTab = ({ stats, pedidos, transacoes }: DashboardTabProps) => {
  return (
    <div className="space-y-6">
      {/* Cards principais */}
      <div className="grid grid-cols-2 gap-3">
        <Card className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <DollarSign size={18} />
            <span className="text-xs sm:text-sm">Total em Vendas</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-foreground">
            R$ {stats.totalVendas.toFixed(2).replace(".", ",")}
          </p>
          <p className="text-xs text-muted-foreground">
            {stats.totalPedidos} pedidos
          </p>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar size={18} />
            <span className="text-xs sm:text-sm">Vendas Hoje</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-primary">
            R$ {stats.vendasHoje.toFixed(2).replace(".", ",")}
          </p>
          <p className="text-xs text-muted-foreground">
            {stats.pedidosHoje} pedidos
          </p>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-highlight">
            <TrendingUp size={18} />
            <span className="text-xs sm:text-sm">Cashback Distribuído</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-highlight">
            R$ {stats.totalCashbackDistribuido.toFixed(2).replace(".", ",")}
          </p>
          <p className="text-xs text-muted-foreground">
            R$ {stats.totalCashbackUsado.toFixed(2).replace(".", ",")} usado
          </p>
        </Card>

        <Card className="p-4 space-y-2">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Users size={18} />
            <span className="text-xs sm:text-sm">Usuários</span>
          </div>
          <p className="text-xl sm:text-2xl font-bold text-foreground">
            {stats.usuariosAtivos}
          </p>
          <p className="text-xs text-muted-foreground">cadastrados</p>
        </Card>
      </div>

      {/* Status dos pedidos */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-sm sm:text-base">
          <BarChart3 size={18} />
          Status dos Pedidos
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Clock size={16} className="text-warning" />
              <span className="text-sm">Pendentes</span>
            </div>
            <span className="font-bold text-warning">{stats.pedidosPendentes}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Check size={16} className="text-info" />
              <span className="text-sm">Confirmados</span>
            </div>
            <span className="font-bold text-info">{stats.pedidosConfirmados}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle size={16} className="text-highlight" />
              <span className="text-sm">Entregues</span>
            </div>
            <span className="font-bold text-highlight">{stats.pedidosEntregues}</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <XCircle size={16} className="text-destructive" />
              <span className="text-sm">Cancelados</span>
            </div>
            <span className="font-bold text-destructive">{stats.pedidosCancelados}</span>
          </div>
        </div>
      </Card>

      {/* Resumo do catálogo */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">
          Resumo do Catálogo
        </h3>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <Package className="w-6 h-6 text-primary mx-auto mb-1" />
            <p className="text-xl font-bold">{stats.totalProdutos}</p>
            <p className="text-xs text-muted-foreground">Produtos</p>
          </div>
          <div>
            <Scissors className="w-6 h-6 text-accent mx-auto mb-1" />
            <p className="text-xl font-bold">{stats.totalServicos}</p>
            <p className="text-xs text-muted-foreground">Serviços</p>
          </div>
          <div>
            <Gift className="w-6 h-6 text-highlight mx-auto mb-1" />
            <p className="text-xl font-bold">{stats.totalPacotes}</p>
            <p className="text-xs text-muted-foreground">Pacotes</p>
          </div>
        </div>
      </Card>
      {/* Gráficos de Vendas */}
      <SalesCharts pedidos={pedidos} transacoes={transacoes} />
    </div>
  );
};
