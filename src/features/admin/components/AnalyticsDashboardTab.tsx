import { useState, useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import {
  TrendingUp, TrendingDown, Users, DollarSign, Repeat, Gift, BarChart3,
  ArrowUpRight, ArrowDownRight, Minus, CalendarCheck, UserPlus, Activity
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { formatResinks } from "@/lib/resinks";
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from "recharts";

const COLORS = ["hsl(var(--primary))", "hsl(var(--accent))", "hsl(var(--warning))", "hsl(var(--muted-foreground))"];

type Period = "7d" | "30d" | "90d" | "all";

const getPeriodDate = (period: Period) => {
  const now = new Date();
  switch (period) {
    case "7d": return new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000).toISOString();
    case "30d": return new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000).toISOString();
    case "90d": return new Date(now.getTime() - 90 * 24 * 60 * 60 * 1000).toISOString();
    case "all": return "2020-01-01T00:00:00Z";
  }
};

const StatCard = ({ title, value, subtitle, icon: Icon, trend }: {
  title: string; value: string; subtitle?: string; icon: any; trend?: number;
}) => (
  <Card>
    <CardContent className="p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground font-medium">{title}</p>
          <p className="text-xl font-bold text-foreground mt-1">{value}</p>
          {subtitle && <p className="text-[11px] text-muted-foreground mt-0.5">{subtitle}</p>}
        </div>
        <div className="flex flex-col items-end gap-1">
          <Icon size={20} className="text-muted-foreground" />
          {trend !== undefined && (
            <div className={`flex items-center gap-0.5 text-xs font-medium ${
              trend > 0 ? "text-primary" : trend < 0 ? "text-destructive" : "text-muted-foreground"
            }`}>
              {trend > 0 ? <ArrowUpRight size={12} /> : trend < 0 ? <ArrowDownRight size={12} /> : <Minus size={12} />}
              {Math.abs(trend)}%
            </div>
          )}
        </div>
      </div>
    </CardContent>
  </Card>
);

const AnalyticsDashboardTab = () => {
  const [period, setPeriod] = useState<Period>("30d");
  const startDate = getPeriodDate(period);

  // Fetch all analytics data
  const { data: analytics, isLoading } = useQuery({
    queryKey: ["admin-analytics", period],
    queryFn: async () => {
      const [
        transacoesRes,
        indicacoesRes,
        agendamentosRes,
        pedidosRes,
        assinaturasRes,
        profilesRes,
      ] = await Promise.all([
        supabase.from("transacoes").select("tipo, valor, created_at").gte("created_at", startDate),
        supabase.from("indicacoes").select("status, cashback_valor, created_at").gte("created_at", startDate),
        supabase.from("agendamentos").select("status, created_at, servico").gte("created_at", startDate),
        supabase.from("pedidos").select("status, total, created_at").gte("created_at", startDate),
        supabase.from("assinaturas_usuario").select("status, created_at, data_fim, plano_id"),
        supabase.from("profiles").select("id, created_at").gte("created_at", startDate),
      ]);

      // Fetch plan prices for MRR calculation
      const planoIds = [...new Set((assinaturasRes.data || []).map(a => a.plano_id))];
      const planosRes = planoIds.length > 0
        ? await supabase.from("assinaturas_planos").select("id, preco_mensal").in("id", planoIds)
        : { data: [] };

      return {
        transacoes: transacoesRes.data || [],
        indicacoes: indicacoesRes.data || [],
        agendamentos: agendamentosRes.data || [],
        pedidos: pedidosRes.data || [],
        assinaturas: assinaturasRes.data || [],
        profiles: profilesRes.data || [],
        planos: (planosRes.data || []) as { id: string; preco_mensal: number }[],
      };
    },
    staleTime: 60_000,
  });

  const stats = useMemo(() => {
    if (!analytics) return null;
    const { transacoes, indicacoes, agendamentos, pedidos, assinaturas, profiles, planos } = analytics;

    // Cashback stats
    const cashbackCreditado = transacoes.filter(t => t.tipo === "cashback").reduce((a, t) => a + Number(t.valor), 0);
    const cashbackUsado = Math.abs(transacoes.filter(t => t.tipo === "uso_cashback").reduce((a, t) => a + Number(t.valor), 0));
    const cashbackExpirado = Math.abs(transacoes.filter(t => t.tipo === "cashback_expirado").reduce((a, t) => a + Number(t.valor), 0));
    const roiCashback = cashbackCreditado > 0 ? Math.round((cashbackUsado / cashbackCreditado) * 100) : 0;

    // Referral stats
    const totalIndicacoes = indicacoes.length;
    const indicacoesConvertidas = indicacoes.filter(i => i.status === "processado").length;
    const taxaConversaoIndicacoes = totalIndicacoes > 0 ? Math.round((indicacoesConvertidas / totalIndicacoes) * 100) : 0;
    const cashbackIndicacoes = indicacoes.filter(i => i.status === "processado").reduce((a, i) => a + Number(i.cashback_valor), 0);

    // Appointments stats
    const sessoesConc = agendamentos.filter(a => a.status === "concluido" || a.status === "realizado").length;
    const sessoesCanceladas = agendamentos.filter(a => a.status === "cancelado").length;
    const taxaCancelamento = agendamentos.length > 0 ? Math.round((sessoesCanceladas / agendamentos.length) * 100) : 0;
    const taxaConversaoAgendamentos = agendamentos.length > 0 ? Math.round((sessoesConc / agendamentos.length) * 100) : 0;

    // Orders
    const pedidosAtivos = pedidos.filter(p => p.status !== "cancelado");
    const receitaPedidos = pedidosAtivos.reduce((a, p) => a + Number(p.total), 0);

    // Subscriptions & MRR
    const assinaturasAtivas = assinaturas.filter(a => a.status === "ativo").length;
    const assinaturasExpiradas = assinaturas.filter(a => a.status === "expirado" || a.status === "cancelado").length;
    const churnRate = (assinaturasAtivas + assinaturasExpiradas) > 0
      ? Math.round((assinaturasExpiradas / (assinaturasAtivas + assinaturasExpiradas)) * 100) : 0;

    // MRR calculation
    const planoMap = new Map(planos.map(p => [p.id, p.preco_mensal]));
    const mrr = assinaturas
      .filter(a => a.status === "ativo")
      .reduce((total, a) => total + (planoMap.get(a.plano_id) || 0), 0);

    // New users
    const novosUsuarios = profiles.length;

    // Daily cashback trend
    const dailyMap = new Map<string, { creditado: number; usado: number }>();
    transacoes.forEach(t => {
      const day = t.created_at?.substring(0, 10);
      if (!day) return;
      const entry = dailyMap.get(day) || { creditado: 0, usado: 0 };
      if (t.tipo === "cashback") entry.creditado += Number(t.valor);
      if (t.tipo === "uso_cashback") entry.usado += Math.abs(Number(t.valor));
      dailyMap.set(day, entry);
    });
    const dailyTrend = Array.from(dailyMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-30)
      .map(([date, vals]) => ({ date: date.substring(5), ...vals }));

    // Service popularity
    const serviceCount = new Map<string, number>();
    agendamentos.filter(a => a.status === "concluido" || a.status === "realizado")
      .forEach(a => serviceCount.set(a.servico, (serviceCount.get(a.servico) || 0) + 1));
    const servicePopularity = Array.from(serviceCount.entries())
      .sort((a, b) => b[1] - a[1])
      .slice(0, 6)
      .map(([name, count]) => ({ name: name.length > 12 ? name.substring(0, 12) + "…" : name, count }));

    // Daily new users trend
    const userDailyMap = new Map<string, number>();
    profiles.forEach(p => {
      const day = p.created_at?.substring(0, 10);
      if (!day) return;
      userDailyMap.set(day, (userDailyMap.get(day) || 0) + 1);
    });
    const usersTrend = Array.from(userDailyMap.entries())
      .sort((a, b) => a[0].localeCompare(b[0]))
      .slice(-30)
      .map(([date, count]) => ({ date: date.substring(5), novos: count }));

    return {
      cashbackCreditado, cashbackUsado, cashbackExpirado, roiCashback,
      totalIndicacoes, indicacoesConvertidas, taxaConversaoIndicacoes, cashbackIndicacoes,
      sessoesConc, sessoesCanceladas, taxaCancelamento, taxaConversaoAgendamentos,
      receitaPedidos, pedidosCount: pedidosAtivos.length,
      assinaturasAtivas, churnRate, mrr, novosUsuarios,
      dailyTrend, servicePopularity, usersTrend,
    };
  }, [analytics]);

  if (isLoading || !stats) {
    return <div className="text-center py-10 text-muted-foreground">Carregando analytics...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Period selector */}
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <BarChart3 size={20} />
          Analytics & KPIs
        </h2>
        <Select value={period} onValueChange={(v) => setPeriod(v as Period)}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">7 dias</SelectItem>
            <SelectItem value="30d">30 dias</SelectItem>
            <SelectItem value="90d">90 dias</SelectItem>
            <SelectItem value="all">Tudo</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Top KPIs - MRR, Novos Usuários, Conversão */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard title="MRR (Assinaturas)" value={formatResinks(stats.mrr)} subtitle={`${stats.assinaturasAtivas} ativas`} icon={Activity} />
        <StatCard title="Novos Usuários" value={String(stats.novosUsuarios)} icon={UserPlus} />
        <StatCard title="Taxa Conversão" value={`${stats.taxaConversaoAgendamentos}%`} subtitle="agendado → concluído" icon={CalendarCheck} />
        <StatCard title="Churn Assinaturas" value={`${stats.churnRate}%`} subtitle={`${stats.assinaturasAtivas} ativas`} icon={Repeat} trend={-stats.churnRate} />
      </div>

      {/* Cashback & Revenue KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard title="Cashback Creditado" value={formatResinks(stats.cashbackCreditado)} icon={TrendingUp} />
        <StatCard title="Cashback Usado" value={formatResinks(stats.cashbackUsado)} subtitle={`ROI: ${stats.roiCashback}%`} icon={DollarSign} />
        <StatCard title="Receita Pedidos" value={formatResinks(stats.receitaPedidos)} subtitle={`${stats.pedidosCount} pedidos`} icon={DollarSign} />
        <StatCard title="Indicações" value={`${stats.indicacoesConvertidas}/${stats.totalIndicacoes}`} subtitle={`Conversão: ${stats.taxaConversaoIndicacoes}%`} icon={Users} />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <StatCard title="Sessões Concluídas" value={String(stats.sessoesConc)} subtitle={`${stats.taxaCancelamento}% cancelamento`} icon={TrendingUp} />
        <StatCard title="Cashback Expirado" value={formatResinks(stats.cashbackExpirado)} icon={TrendingDown} />
        <StatCard title="Cashback Indicações" value={formatResinks(stats.cashbackIndicacoes)} icon={Gift} />
        <StatCard title="Total Agendamentos" value={String(stats.sessoesConc + stats.sessoesCanceladas)} subtitle="no período" icon={CalendarCheck} />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Daily Cashback Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Evolução Diária de Cashback</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={stats.dailyTrend}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Line type="monotone" dataKey="creditado" stroke="hsl(var(--primary))" strokeWidth={2} name="Creditado" dot={false} />
                <Line type="monotone" dataKey="usado" stroke="hsl(var(--accent))" strokeWidth={2} name="Usado" dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* New Users Trend */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Novos Usuários por Dia</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats.usersTrend}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="date" tick={{ fontSize: 10 }} />
                <YAxis tick={{ fontSize: 10 }} allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="novos" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} name="Novos" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Service Popularity */}
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm">Serviços mais populares</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={stats.servicePopularity}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} />
                <YAxis tick={{ fontSize: 10 }} />
                <Tooltip />
                <Bar dataKey="count" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Sessões" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsDashboardTab;
