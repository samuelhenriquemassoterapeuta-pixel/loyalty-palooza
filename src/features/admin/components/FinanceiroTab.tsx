import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DollarSign, TrendingUp, Users, ShoppingBag, Calendar, Percent, ArrowUpRight, ArrowDownRight } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from "recharts";
import { format, subMonths, startOfMonth, endOfMonth } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useMemo } from "react";

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--highlight))", "hsl(var(--muted-foreground))"];

const FinanceiroTab = () => {
  const { data: pedidos = [] } = useQuery({
    queryKey: ["admin-pedidos-financeiro"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pedidos")
        .select("id, total, status, created_at, user_id")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: agendamentos = [] } = useQuery({
    queryKey: ["admin-agendamentos-financeiro"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("agendamentos")
        .select("id, servico, status, data_hora, user_id")
        .order("data_hora", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: servicos = [] } = useQuery({
    queryKey: ["admin-servicos-financeiro"],
    queryFn: async () => {
      const { data, error } = await supabase.from("servicos").select("nome, preco");
      if (error) throw error;
      return data;
    },
  });

  const { data: feedbacks = [] } = useQuery({
    queryKey: ["admin-feedbacks"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("feedback_rapido")
        .select("emoji, created_at")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const stats = useMemo(() => {
    const concluidos = agendamentos.filter((a) => a.status === "concluido" || a.status === "realizado");
    const mesAtual = new Date().getMonth();
    const pedidosMes = pedidos.filter((p) => new Date(p.created_at).getMonth() === mesAtual);
    const sessoesStr = concluidos.map((a) => a.servico);
    const servicoPrecos = new Map(servicos.map((s) => [s.nome, Number(s.preco)]));
    
    const faturamentoServicos = concluidos.reduce((acc, a) => {
      return acc + (servicoPrecos.get(a.servico) || 0);
    }, 0);
    const faturamentoPedidos = pedidos
      .filter((p) => p.status !== "cancelado")
      .reduce((acc, p) => acc + Number(p.total), 0);

    const totalFaturamento = faturamentoServicos + faturamentoPedidos;

    const clientesUnicos = new Set([
      ...pedidos.map((p) => p.user_id),
      ...agendamentos.map((a) => a.user_id),
    ]).size;

    const ticketMedio = concluidos.length > 0
      ? faturamentoServicos / concluidos.length
      : 0;

    // Retorno rate
    const clientesSessoes = new Map<string, number>();
    agendamentos.forEach((a) => {
      clientesSessoes.set(a.user_id, (clientesSessoes.get(a.user_id) || 0) + 1);
    });
    const retornantes = Array.from(clientesSessoes.values()).filter((v) => v > 1).length;
    const taxaRetorno = clientesSessoes.size > 0 ? (retornantes / clientesSessoes.size) * 100 : 0;

    // Satisfaction
    const avgEmoji = feedbacks.length > 0
      ? feedbacks.reduce((acc, f) => acc + ((f as any).emoji || 0), 0) / feedbacks.length
      : 0;

    return {
      totalFaturamento,
      faturamentoPedidos,
      faturamentoServicos,
      totalSessoes: concluidos.length,
      clientesUnicos,
      ticketMedio,
      taxaRetorno,
      avgEmoji,
      pedidosMesTotal: pedidosMes.reduce((acc, p) => acc + Number(p.total), 0),
    };
  }, [pedidos, agendamentos, servicos, feedbacks]);

  // Monthly revenue chart
  const monthlyData = useMemo(() => {
    const months = [];
    for (let i = 5; i >= 0; i--) {
      const date = subMonths(new Date(), i);
      const start = startOfMonth(date);
      const end = endOfMonth(date);
      const servicoPrecos = new Map(servicos.map((s) => [s.nome, Number(s.preco)]));

      const receita = agendamentos
        .filter((a) => {
          const d = new Date(a.data_hora);
          return d >= start && d <= end && (a.status === "concluido" || a.status === "realizado");
        })
        .reduce((acc, a) => acc + (servicoPrecos.get(a.servico) || 0), 0);

      const pedidosReceita = pedidos
        .filter((p) => {
          const d = new Date(p.created_at);
          return d >= start && d <= end && p.status !== "cancelado";
        })
        .reduce((acc, p) => acc + Number(p.total), 0);

      months.push({
        mes: format(date, "MMM", { locale: ptBR }),
        servicos: receita,
        produtos: pedidosReceita,
        total: receita + pedidosReceita,
      });
    }
    return months;
  }, [agendamentos, pedidos, servicos]);

  // Top services
  const topServicos = useMemo(() => {
    const counts = new Map<string, number>();
    agendamentos
      .filter((a) => a.status === "concluido" || a.status === "realizado")
      .forEach((a) => counts.set(a.servico, (counts.get(a.servico) || 0) + 1));

    return Array.from(counts.entries())
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [agendamentos]);

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <DollarSign size={14} className="text-accent" />
              <span className="text-[10px] text-muted-foreground">Faturamento Total</span>
            </div>
            <p className="text-lg font-bold text-foreground">
              R$ {stats.totalFaturamento.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <TrendingUp size={14} className="text-primary" />
              <span className="text-[10px] text-muted-foreground">Ticket Médio</span>
            </div>
            <p className="text-lg font-bold text-foreground">
              R$ {stats.ticketMedio.toFixed(2).replace(".", ",")}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <Users size={14} className="text-highlight" />
              <span className="text-[10px] text-muted-foreground">Taxa Retorno</span>
            </div>
            <p className="text-lg font-bold text-foreground">
              {stats.taxaRetorno.toFixed(0)}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-sm">
                {stats.avgEmoji >= 2.5 ? "😊" : stats.avgEmoji >= 1.5 ? "😐" : "😞"}
              </span>
              <span className="text-[10px] text-muted-foreground">Satisfação</span>
            </div>
            <p className="text-lg font-bold text-foreground">
              {stats.avgEmoji > 0 ? (stats.avgEmoji * 33.3).toFixed(0) + "%" : "—"}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Revenue Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Faturamento mensal</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value: number) => `R$ ${value.toFixed(2)}`}
                  contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))" }}
                />
                <Bar dataKey="servicos" name="Serviços" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="produtos" name="Produtos" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Top services */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Serviços mais procurados</CardTitle>
        </CardHeader>
        <CardContent>
          {topServicos.length > 0 ? (
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={topServicos}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    dataKey="value"
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                  >
                    {topServicos.map((_, i) => (
                      <Cell key={i} fill={COLORS[i % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">Sem dados ainda</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default FinanceiroTab;
