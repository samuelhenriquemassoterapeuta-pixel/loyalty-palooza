import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import {
  TrendingUp, BarChart3, Eye, MousePointerClick, DollarSign,
  Target, Loader2, AlertTriangle, Settings, RefreshCw, Calendar,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { motion } from "framer-motion";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid,
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell,
} from "recharts";
import { cn } from "@/lib/utils";

const DATE_RANGES = [
  { value: "TODAY", label: "Hoje" },
  { value: "YESTERDAY", label: "Ontem" },
  { value: "LAST_7_DAYS", label: "Últimos 7 dias" },
  { value: "LAST_14_DAYS", label: "Últimos 14 dias" },
  { value: "LAST_30_DAYS", label: "Últimos 30 dias" },
  { value: "THIS_MONTH", label: "Este mês" },
  { value: "LAST_MONTH", label: "Mês passado" },
];

const CHART_COLORS = [
  "hsl(var(--primary))",
  "hsl(var(--accent))",
  "hsl(var(--highlight))",
  "hsl(var(--info))",
  "#8b5cf6",
  "#f59e0b",
];

type CampaignMetric = {
  campaign_id: string;
  campaign_name: string;
  date: string;
  impressions: number;
  clicks: number;
  ctr: number;
  average_cpc: number;
  cost_micros: number;
  conversions: number;
  conversion_value: number;
  roas: number;
};

const GoogleAdsDashboard = () => {
  const { user } = useAuth();
  const [customerId, setCustomerId] = useState("");
  const [dateRange, setDateRange] = useState("LAST_7_DAYS");
  const [isConfigured, setIsConfigured] = useState<boolean | null>(null);

  // Fetch live metrics
  const {
    data: metricsData,
    isLoading,
    refetch,
    error,
  } = useQuery({
    queryKey: ["google-ads-live", customerId, dateRange],
    enabled: !!customerId && customerId.length >= 10,
    retry: false,
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("fetch-google-ads", {
        body: { customer_id: customerId, date_range: dateRange, save_snapshot: true },
      });

      if (error) throw new Error(error.message);

      if (data?.requires_setup) {
        setIsConfigured(false);
        return { data: [], count: 0 };
      }

      setIsConfigured(true);
      return data as { data: CampaignMetric[]; count: number };
    },
  });

  // Fetch historical data from DB
  const { data: historicalData = [] } = useQuery({
    queryKey: ["google-ads-history", customerId],
    enabled: !!customerId && customerId.length >= 10,
    queryFn: async () => {
      const { data } = await supabase
        .from("google_ads_metrics")
        .select("*")
        .eq("customer_id", customerId.replace(/-/g, ""))
        .order("snapshot_date", { ascending: false })
        .limit(100);
      return (data || []) as any[];
    },
  });

  const metrics = metricsData?.data || [];

  // Aggregate metrics by campaign
  const campaignAggregates = metrics.reduce((acc: Record<string, any>, m) => {
    if (!acc[m.campaign_id]) {
      acc[m.campaign_id] = {
        campaign_id: m.campaign_id,
        campaign_name: m.campaign_name,
        impressions: 0,
        clicks: 0,
        cost: 0,
        conversions: 0,
        conversion_value: 0,
      };
    }
    acc[m.campaign_id].impressions += m.impressions;
    acc[m.campaign_id].clicks += m.clicks;
    acc[m.campaign_id].cost += m.cost_micros / 1_000_000;
    acc[m.campaign_id].conversions += m.conversions;
    acc[m.campaign_id].conversion_value += m.conversion_value;
    return acc;
  }, {});

  const campaignList = Object.values(campaignAggregates).map((c: any) => ({
    ...c,
    ctr: c.impressions > 0 ? ((c.clicks / c.impressions) * 100) : 0,
    cpc: c.clicks > 0 ? (c.cost / c.clicks) : 0,
    roas: c.cost > 0 ? (c.conversion_value / c.cost) : 0,
  }));

  // Totals
  const totals = campaignList.reduce(
    (acc, c) => ({
      impressions: acc.impressions + c.impressions,
      clicks: acc.clicks + c.clicks,
      cost: acc.cost + c.cost,
      conversions: acc.conversions + c.conversions,
      conversion_value: acc.conversion_value + c.conversion_value,
    }),
    { impressions: 0, clicks: 0, cost: 0, conversions: 0, conversion_value: 0 }
  );

  const totalCtr = totals.impressions > 0 ? (totals.clicks / totals.impressions) * 100 : 0;
  const totalCpc = totals.clicks > 0 ? totals.cost / totals.clicks : 0;
  const totalRoas = totals.cost > 0 ? totals.conversion_value / totals.cost : 0;

  // Daily trend data
  const dailyData = metrics.reduce((acc: Record<string, any>, m) => {
    if (!acc[m.date]) {
      acc[m.date] = { date: m.date, impressions: 0, clicks: 0, cost: 0, conversions: 0 };
    }
    acc[m.date].impressions += m.impressions;
    acc[m.date].clicks += m.clicks;
    acc[m.date].cost += m.cost_micros / 1_000_000;
    acc[m.date].conversions += m.conversions;
    return acc;
  }, {});

  const dailyTrend = Object.values(dailyData).sort((a: any, b: any) =>
    a.date.localeCompare(b.date)
  );

  const formatCurrency = (v: number) =>
    `R$ ${v.toFixed(2).replace(".", ",")}`;

  const formatNumber = (v: number) =>
    v >= 1000 ? `${(v / 1000).toFixed(1)}k` : v.toString();

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 py-6 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground font-serif flex items-center gap-2">
              <BarChart3 className="w-6 h-6 text-primary" /> Google Ads Dashboard
            </h1>
            <p className="text-sm text-muted-foreground mt-1">
              Métricas de campanhas em tempo real e histórico
            </p>
          </div>
        </div>

        {/* Setup Warning */}
        {isConfigured === false && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 flex items-start gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-amber-500 mt-0.5 shrink-0" />
            <div>
              <p className="text-sm font-medium text-foreground">Configuração necessária</p>
              <p className="text-xs text-muted-foreground mt-1">
                As credenciais do Google Ads ainda não foram configuradas. Configure os seguintes
                secrets: GOOGLE_ADS_DEVELOPER_TOKEN, GOOGLE_ADS_CLIENT_ID, GOOGLE_ADS_CLIENT_SECRET,
                GOOGLE_ADS_REFRESH_TOKEN, GOOGLE_ADS_LOGIN_CUSTOMER_ID.
              </p>
            </div>
          </motion.div>
        )}

        {/* Filters */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-card">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="flex-1">
              <Label className="text-muted-foreground text-xs">Customer ID</Label>
              <Input
                value={customerId}
                onChange={(e) => setCustomerId(e.target.value)}
                placeholder="123-456-7890"
                className="bg-card border-border text-foreground mt-1"
              />
            </div>
            <div className="w-full sm:w-48">
              <Label className="text-muted-foreground text-xs">Período</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="bg-card border-border text-foreground mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-card border-border">
                  {DATE_RANGES.map((r) => (
                    <SelectItem key={r.value} value={r.value} className="text-foreground">
                      {r.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-end">
              <Button
                onClick={() => refetch()}
                disabled={isLoading || !customerId}
                className="btn-premium w-full sm:w-auto"
              >
                {isLoading ? (
                  <Loader2 className="w-4 h-4 animate-spin mr-2" />
                ) : (
                  <RefreshCw className="w-4 h-4 mr-2" />
                )}
                Atualizar
              </Button>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        {metrics.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { label: "Impressões", value: formatNumber(totals.impressions), icon: Eye, color: "text-info" },
              { label: "Cliques", value: formatNumber(totals.clicks), icon: MousePointerClick, color: "text-primary" },
              { label: "CTR", value: `${totalCtr.toFixed(2)}%`, icon: Target, color: "text-accent" },
              { label: "CPC Médio", value: formatCurrency(totalCpc), icon: DollarSign, color: "text-highlight" },
              { label: "Investimento", value: formatCurrency(totals.cost), icon: DollarSign, color: "text-destructive" },
              { label: "ROAS", value: `${totalRoas.toFixed(2)}x`, icon: TrendingUp, color: "text-primary" },
            ].map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="rounded-xl border border-border bg-card p-4 shadow-card"
              >
                <div className="flex items-center gap-2 mb-2">
                  <kpi.icon className={cn("w-4 h-4", kpi.color)} />
                  <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{kpi.label}</span>
                </div>
                <p className="text-xl font-bold text-foreground">{kpi.value}</p>
              </motion.div>
            ))}
          </div>
        )}

        {/* Charts Row */}
        {dailyTrend.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Daily Trend */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <Calendar className="w-4 h-4 text-primary" /> Tendência Diária
              </h3>
              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={dailyTrend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="date"
                    tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                    tickFormatter={(d) => d.slice(5)}
                  />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Line type="monotone" dataKey="clicks" stroke="hsl(var(--primary))" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="impressions" stroke="hsl(var(--accent))" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            {/* Campaign Bar Chart */}
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-accent" /> Por Campanha
              </h3>
              <ResponsiveContainer width="100%" height={260}>
                <BarChart data={campaignList.slice(0, 8)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis
                    dataKey="campaign_name"
                    tick={{ fontSize: 9, fill: "hsl(var(--muted-foreground))" }}
                    interval={0}
                    angle={-20}
                    textAnchor="end"
                    height={60}
                  />
                  <YAxis tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }} />
                  <Tooltip
                    contentStyle={{
                      background: "hsl(var(--card))",
                      border: "1px solid hsl(var(--border))",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="clicks" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                  <Bar dataKey="conversions" fill="hsl(var(--highlight))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}

        {/* Impressions Pie Chart */}
        {campaignList.length > 0 && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="rounded-xl border border-border bg-card p-5 shadow-card">
              <h3 className="text-sm font-semibold text-foreground mb-4">Distribuição de Impressões</h3>
              <ResponsiveContainer width="100%" height={220}>
                <PieChart>
                  <Pie
                    data={campaignList.slice(0, 6)}
                    dataKey="impressions"
                    nameKey="campaign_name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    label={({ campaign_name }) =>
                      campaign_name?.length > 12
                        ? campaign_name.slice(0, 12) + "…"
                        : campaign_name
                    }
                    labelLine={false}
                  >
                    {campaignList.slice(0, 6).map((_, i) => (
                      <Cell key={i} fill={CHART_COLORS[i % CHART_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Campaign Table */}
            <div className="lg:col-span-2 rounded-xl border border-border bg-card p-5 shadow-card overflow-x-auto">
              <h3 className="text-sm font-semibold text-foreground mb-4">Detalhes por Campanha</h3>
              <table className="w-full text-xs">
                <thead>
                  <tr className="text-muted-foreground border-b border-border">
                    <th className="text-left py-2 pr-3">Campanha</th>
                    <th className="text-right py-2 px-2">Impr.</th>
                    <th className="text-right py-2 px-2">Cliques</th>
                    <th className="text-right py-2 px-2">CTR</th>
                    <th className="text-right py-2 px-2">CPC</th>
                    <th className="text-right py-2 px-2">Custo</th>
                    <th className="text-right py-2 px-2">Conv.</th>
                    <th className="text-right py-2 pl-2">ROAS</th>
                  </tr>
                </thead>
                <tbody>
                  {campaignList.map((c: any) => (
                    <tr key={c.campaign_id} className="border-b border-border/50 hover:bg-muted/30">
                      <td className="py-2 pr-3 text-foreground font-medium truncate max-w-[150px]">
                        {c.campaign_name}
                      </td>
                      <td className="text-right py-2 px-2 text-muted-foreground">{formatNumber(c.impressions)}</td>
                      <td className="text-right py-2 px-2 text-muted-foreground">{formatNumber(c.clicks)}</td>
                      <td className="text-right py-2 px-2 text-muted-foreground">{c.ctr.toFixed(2)}%</td>
                      <td className="text-right py-2 px-2 text-muted-foreground">{formatCurrency(c.cpc)}</td>
                      <td className="text-right py-2 px-2 text-muted-foreground">{formatCurrency(c.cost)}</td>
                      <td className="text-right py-2 px-2 text-foreground font-medium">{c.conversions.toFixed(0)}</td>
                      <td className="text-right py-2 pl-2">
                        <span className={cn(
                          "font-bold",
                          c.roas >= 3 ? "text-green-500" : c.roas >= 1 ? "text-amber-500" : "text-destructive"
                        )}>
                          {c.roas.toFixed(2)}x
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Historical Data */}
        {historicalData.length > 0 && (
          <div className="rounded-xl border border-border bg-card p-5 shadow-card">
            <h3 className="text-sm font-semibold text-foreground mb-3">📊 Snapshots Históricos</h3>
            <p className="text-xs text-muted-foreground mb-3">
              {historicalData.length} registros salvos
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {(() => {
                const lastSnapshot = historicalData.filter(
                  (d: any) => d.snapshot_date === historicalData[0]?.snapshot_date
                );
                const totalImpr = lastSnapshot.reduce((s: number, d: any) => s + (d.impressions || 0), 0);
                const totalClicks = lastSnapshot.reduce((s: number, d: any) => s + (d.clicks || 0), 0);
                const totalCost = lastSnapshot.reduce((s: number, d: any) => s + Number(d.cost_micros || 0) / 1e6, 0);
                const totalConv = lastSnapshot.reduce((s: number, d: any) => s + Number(d.conversions || 0), 0);
                return [
                  { label: "Impressões (último)", value: formatNumber(totalImpr) },
                  { label: "Cliques (último)", value: formatNumber(totalClicks) },
                  { label: "Custo (último)", value: formatCurrency(totalCost) },
                  { label: "Conversões (último)", value: totalConv.toFixed(0) },
                ].map((s) => (
                  <div key={s.label} className="bg-muted/30 rounded-lg p-3">
                    <p className="text-[10px] text-muted-foreground">{s.label}</p>
                    <p className="text-lg font-bold text-foreground">{s.value}</p>
                  </div>
                ));
              })()}
            </div>
          </div>
        )}

        {/* Empty State */}
        {!isLoading && metrics.length === 0 && customerId && (
          <div className="text-center py-16">
            <BarChart3 className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground">
              {isConfigured === false
                ? "Configure as credenciais do Google Ads para visualizar métricas."
                : "Nenhuma métrica encontrada para este período. Verifique o Customer ID."}
            </p>
          </div>
        )}

        {!customerId && (
          <div className="text-center py-16">
            <Settings className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground">
              Insira o Customer ID do Google Ads acima para começar.
            </p>
            <p className="text-xs text-muted-foreground mt-2">
              Formato: 123-456-7890 (encontre em ads.google.com → Configurações)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GoogleAdsDashboard;
