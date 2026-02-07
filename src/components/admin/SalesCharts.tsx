import { useMemo } from "react";
import { Card } from "@/components/ui/card";
import { TrendingUp, PieChart as PieChartIcon, BarChart3 } from "lucide-react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from "recharts";
import { format, subDays, startOfDay, isAfter } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Pedido {
  id: string;
  total: number;
  status: string;
  created_at: string;
  pedido_itens?: Array<{
    quantidade: number;
    preco_unitario: number;
    produtos?: { nome?: string } | null;
  }>;
}

interface Transacao {
  id: string;
  tipo: string;
  valor: number;
  created_at: string;
}

interface SalesChartsProps {
  pedidos: Pedido[];
  transacoes: Transacao[];
}

const COLORS = {
  primary: "hsl(78, 55%, 28%)",
  accent: "hsl(25, 65%, 42%)",
  highlight: "hsl(140, 50%, 38%)",
  warning: "hsl(38, 92%, 50%)",
  destructive: "hsl(0, 72%, 51%)",
  info: "hsl(200, 60%, 45%)",
  muted: "hsl(45, 20%, 75%)",
};

const PIE_COLORS = [COLORS.warning, COLORS.info, COLORS.highlight, COLORS.destructive];

const formatCurrency = (value: number) =>
  `R$ ${value.toFixed(0)}`;

const CustomTooltipVendas = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-lg bg-card border border-border p-3 shadow-elevated text-xs">
      <p className="font-semibold text-foreground mb-1">{label}</p>
      {payload.map((entry: any, i: number) => (
        <p key={i} style={{ color: entry.color }}>
          {entry.name}: R$ {Number(entry.value).toFixed(2).replace(".", ",")}
        </p>
      ))}
    </div>
  );
};

export const SalesCharts = ({ pedidos, transacoes }: SalesChartsProps) => {
  // --- Vendas dos últimos 7 dias ---
  const vendasDiarias = useMemo(() => {
    const days = 7;
    const result = [];
    for (let i = days - 1; i >= 0; i--) {
      const day = startOfDay(subDays(new Date(), i));
      const nextDay = startOfDay(subDays(new Date(), i - 1));

      const vendasDia = pedidos
        .filter((p) => {
          const d = new Date(p.created_at);
          return d >= day && d < nextDay && p.status !== "cancelado";
        })
        .reduce((acc, p) => acc + (p.total || 0), 0);

      const cashbackDia = transacoes
        .filter((t) => {
          const d = new Date(t.created_at);
          return d >= day && d < nextDay && t.tipo === "cashback";
        })
        .reduce((acc, t) => acc + Number(t.valor), 0);

      result.push({
        dia: format(day, "EEE", { locale: ptBR }),
        diaCompleto: format(day, "dd/MM", { locale: ptBR }),
        vendas: vendasDia,
        cashback: cashbackDia,
      });
    }
    return result;
  }, [pedidos, transacoes]);

  // --- Status dos pedidos (pie) ---
  const statusData = useMemo(() => {
    const statusMap: Record<string, { name: string; value: number }> = {
      pendente: { name: "Pendentes", value: 0 },
      confirmado: { name: "Confirmados", value: 0 },
      entregue: { name: "Entregues", value: 0 },
      cancelado: { name: "Cancelados", value: 0 },
    };
    pedidos.forEach((p) => {
      if (statusMap[p.status]) statusMap[p.status].value++;
    });
    return Object.values(statusMap).filter((s) => s.value > 0);
  }, [pedidos]);

  // --- Top produtos vendidos ---
  const topProdutos = useMemo(() => {
    const produtoMap: Record<string, { nome: string; quantidade: number; receita: number }> = {};
    pedidos
      .filter((p) => p.status !== "cancelado")
      .forEach((p) => {
        p.pedido_itens?.forEach((item) => {
          const nome = item.produtos?.nome || "Produto";
          if (!produtoMap[nome]) {
            produtoMap[nome] = { nome, quantidade: 0, receita: 0 };
          }
          produtoMap[nome].quantidade += item.quantidade;
          produtoMap[nome].receita += item.preco_unitario * item.quantidade;
        });
      });
    return Object.values(produtoMap)
      .sort((a, b) => b.receita - a.receita)
      .slice(0, 5)
      .map((p) => ({
        ...p,
        nome: p.nome.length > 12 ? p.nome.slice(0, 12) + "…" : p.nome,
      }));
  }, [pedidos]);

  const hasData = pedidos.length > 0;

  if (!hasData) {
    return (
      <Card className="p-6 text-center">
        <BarChart3 className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
        <p className="text-muted-foreground text-sm">
          Nenhum dado disponível para gráficos
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Vendas Diárias - Area Chart */}
      <Card className="p-4">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-sm sm:text-base">
          <TrendingUp size={18} className="text-primary" />
          Vendas dos Últimos 7 Dias
        </h3>
        <div className="h-52 sm:h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={vendasDiarias} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="gradVendas" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.primary} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.primary} stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gradCashback" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={COLORS.highlight} stopOpacity={0.3} />
                  <stop offset="95%" stopColor={COLORS.highlight} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(45, 25%, 82%)" />
              <XAxis
                dataKey="diaCompleto"
                tick={{ fontSize: 11, fill: "hsl(75, 20%, 40%)" }}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                tick={{ fontSize: 11, fill: "hsl(75, 20%, 40%)" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={formatCurrency}
              />
              <Tooltip content={<CustomTooltipVendas />} />
              <Area
                type="monotone"
                dataKey="vendas"
                name="Vendas"
                stroke={COLORS.primary}
                strokeWidth={2}
                fill="url(#gradVendas)"
              />
              <Area
                type="monotone"
                dataKey="cashback"
                name="Cashback"
                stroke={COLORS.highlight}
                strokeWidth={2}
                fill="url(#gradCashback)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Status dos Pedidos - Pie Chart */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-sm sm:text-base">
            <PieChartIcon size={18} className="text-accent" />
            Status dos Pedidos
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={70}
                  paddingAngle={4}
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={800}
                >
                  {statusData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  formatter={(value: number, name: string) => [`${value} pedidos`, name]}
                  contentStyle={{
                    borderRadius: "8px",
                    fontSize: "12px",
                    border: "1px solid hsl(45, 25%, 82%)",
                  }}
                />
                <Legend
                  iconType="circle"
                  iconSize={8}
                  wrapperStyle={{ fontSize: "11px" }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* Top Produtos - Bar Chart */}
        <Card className="p-4">
          <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2 text-sm sm:text-base">
            <BarChart3 size={18} className="text-highlight" />
            Top Produtos
          </h3>
          {topProdutos.length === 0 ? (
            <p className="text-muted-foreground text-sm text-center py-8">
              Sem dados de produtos
            </p>
          ) : (
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={topProdutos}
                  layout="vertical"
                  margin={{ top: 0, right: 10, left: 0, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(45, 25%, 82%)" horizontal={false} />
                  <XAxis
                    type="number"
                    tick={{ fontSize: 10, fill: "hsl(75, 20%, 40%)" }}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={formatCurrency}
                  />
                  <YAxis
                    type="category"
                    dataKey="nome"
                    tick={{ fontSize: 10, fill: "hsl(75, 20%, 40%)" }}
                    axisLine={false}
                    tickLine={false}
                    width={80}
                  />
                  <Tooltip
                    formatter={(value: number) => [
                      `R$ ${value.toFixed(2).replace(".", ",")}`,
                      "Receita",
                    ]}
                    contentStyle={{
                      borderRadius: "8px",
                      fontSize: "12px",
                      border: "1px solid hsl(45, 25%, 82%)",
                    }}
                  />
                  <Bar
                    dataKey="receita"
                    fill={COLORS.accent}
                    radius={[0, 6, 6, 0]}
                    animationDuration={800}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
