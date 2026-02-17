import { motion } from "framer-motion";
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

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.96 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.06, duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.2 + i * 0.1, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export const DashboardTab = ({ stats, pedidos, transacoes }: DashboardTabProps) => {
  const mainCards = [
    {
      icon: DollarSign,
      label: "Total em Vendas",
      value: `R$ ${stats.totalVendas.toFixed(2).replace(".", ",")}`,
      sub: `${stats.totalPedidos} pedidos`,
      colorClass: "text-muted-foreground",
      valueClass: "text-foreground",
      bgClass: "",
    },
    {
      icon: Calendar,
      label: "Vendas Hoje",
      value: `R$ ${stats.vendasHoje.toFixed(2).replace(".", ",")}`,
      sub: `${stats.pedidosHoje} pedidos`,
      colorClass: "text-primary",
      valueClass: "text-primary",
      bgClass: "bg-primary/5",
    },
    {
      icon: TrendingUp,
      label: "Cashback Distribuído",
      value: `R$ ${stats.totalCashbackDistribuido.toFixed(2).replace(".", ",")}`,
      sub: `R$ ${stats.totalCashbackUsado.toFixed(2).replace(".", ",")} usado`,
      colorClass: "text-highlight",
      valueClass: "text-highlight",
      bgClass: "bg-highlight/5",
    },
    {
      icon: Users,
      label: "Usuários",
      value: String(stats.usuariosAtivos),
      sub: "cadastrados",
      colorClass: "text-muted-foreground",
      valueClass: "text-foreground",
      bgClass: "",
    },
  ];

  const statusItems = [
    { icon: Clock, label: "Pendentes", value: stats.pedidosPendentes, colorClass: "text-warning", bgClass: "bg-warning/10" },
    { icon: Check, label: "Confirmados", value: stats.pedidosConfirmados, colorClass: "text-info", bgClass: "bg-info/10" },
    { icon: CheckCircle, label: "Entregues", value: stats.pedidosEntregues, colorClass: "text-highlight", bgClass: "bg-highlight/10" },
    { icon: XCircle, label: "Cancelados", value: stats.pedidosCancelados, colorClass: "text-destructive", bgClass: "bg-destructive/10" },
  ];

  const catalogItems = [
    { icon: Package, value: stats.totalProdutos, label: "Produtos", colorClass: "text-primary", bgClass: "bg-primary/10" },
    { icon: Scissors, value: stats.totalServicos, label: "Serviços", colorClass: "text-accent", bgClass: "bg-accent/10" },
    { icon: Gift, value: stats.totalPacotes, label: "Pacotes", colorClass: "text-highlight", bgClass: "bg-highlight/10" },
  ];

  return (
    <div className="space-y-6">
      {/* Cards principais */}
      <div className="grid grid-cols-2 gap-3">
        {mainCards.map((card, i) => (
          <motion.div
            key={card.label}
            custom={i}
            variants={cardVariants}
            initial="hidden"
            animate="visible"
          >
            <Card className={`p-4 space-y-2 hover-lift cursor-default ${card.bgClass}`}>
              <div className={`flex items-center gap-2 ${card.colorClass}`}>
                <card.icon size={18} />
                <span className="text-xs sm:text-sm">{card.label}</span>
              </div>
              <p className={`text-xl sm:text-2xl font-bold ${card.valueClass}`}>
                {card.value}
              </p>
              <p className="text-xs text-muted-foreground">{card.sub}</p>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Status dos pedidos */}
      <motion.div custom={0} variants={sectionVariants} initial="hidden" animate="visible">
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-sm sm:text-base">
            <BarChart3 size={18} />
            Status dos Pedidos
          </h3>
          <div className="space-y-3">
            {statusItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.06 }}
                className="flex items-center justify-between group"
              >
                <div className="flex items-center gap-2">
                  <div className={`w-7 h-7 rounded-lg ${item.bgClass} flex items-center justify-center transition-transform duration-200 group-hover:scale-110`}>
                    <item.icon size={14} className={item.colorClass} />
                  </div>
                  <span className="text-sm">{item.label}</span>
                </div>
                <span className={`font-bold ${item.colorClass}`}>{item.value}</span>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Resumo do catálogo */}
      <motion.div custom={1} variants={sectionVariants} initial="hidden" animate="visible">
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4 text-sm sm:text-base">
            Resumo do Catálogo
          </h3>
          <div className="grid grid-cols-3 gap-4 text-center">
            {catalogItems.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 + i * 0.08 }}
                className="group cursor-default"
              >
                <div className={`w-12 h-12 rounded-2xl ${item.bgClass} flex items-center justify-center mx-auto mb-2 transition-transform duration-200 group-hover:scale-110`}>
                  <item.icon className={`w-6 h-6 ${item.colorClass}`} />
                </div>
                <p className="text-xl font-bold">{item.value}</p>
                <p className="text-xs text-muted-foreground">{item.label}</p>
              </motion.div>
            ))}
          </div>
        </Card>
      </motion.div>

      {/* Gráficos de Vendas */}
      <motion.div custom={2} variants={sectionVariants} initial="hidden" animate="visible">
        <SalesCharts pedidos={pedidos} transacoes={transacoes} />
      </motion.div>
    </div>
  );
};
