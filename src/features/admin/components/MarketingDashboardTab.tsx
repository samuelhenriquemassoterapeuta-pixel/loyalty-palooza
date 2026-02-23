import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Send, Eye, MousePointer, TrendingUp, Users, Megaphone, Zap, BarChart3 } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const COLORS = ["hsl(var(--primary))", "hsl(var(--highlight))", "hsl(var(--accent))", "hsl(var(--muted))"];

const MarketingDashboardTab = () => {
  const { data: campanhas = [] } = useQuery({
    queryKey: ["marketing-dash-campanhas"],
    queryFn: async () => {
      const { data, error } = await supabase.from("campanhas_marketing").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: banners = [] } = useQuery({
    queryKey: ["marketing-dash-banners"],
    queryFn: async () => {
      const { data, error } = await supabase.from("banners_promocionais").select("*");
      if (error) throw error;
      return data;
    },
  });

  const { data: automacoes = [] } = useQuery({
    queryKey: ["marketing-dash-automacoes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("automacoes_marketing" as any).select("*");
      if (error) throw error;
      return (data || []) as any[];
    },
  });

  const totalEnviados = campanhas.reduce((acc: number, c: any) => acc + (c.total_enviados || 0), 0);
  const totalDestinatarios = campanhas.reduce((acc: number, c: any) => acc + (c.total_destinatarios || 0), 0);
  const totalVisualizacoes = banners.reduce((acc: number, b: any) => acc + (b.visualizacoes || 0), 0);
  const totalCliques = banners.reduce((acc: number, b: any) => acc + (b.cliques || 0), 0);
  const campanhasEnviadas = campanhas.filter((c: any) => c.status === "enviada").length;
  const automacoesAtivas = automacoes.filter((a: any) => a.ativo).length;
  const totalDisparosAuto = automacoes.reduce((acc: number, a: any) => acc + (a.total_disparos || 0), 0);

  const taxaEntrega = totalDestinatarios > 0 ? ((totalEnviados / totalDestinatarios) * 100).toFixed(1) : "0";
  const ctrBanners = totalVisualizacoes > 0 ? ((totalCliques / totalVisualizacoes) * 100).toFixed(1) : "0";

  // Chart: campanhas por tipo
  const campanhaPorTipo = ["whatsapp", "email", "banner"].map(tipo => ({
    tipo: tipo === "whatsapp" ? "WhatsApp" : tipo === "email" ? "Email" : "Banner",
    total: campanhas.filter((c: any) => c.tipo === tipo).length,
    enviadas: campanhas.filter((c: any) => c.tipo === tipo && c.status === "enviada").length,
  }));

  // Chart: campanhas por status
  const campanhaPorStatus = ["rascunho", "enviada", "agendada", "cancelada"].map(s => ({
    name: s.charAt(0).toUpperCase() + s.slice(1),
    value: campanhas.filter((c: any) => c.status === s).length,
  })).filter(s => s.value > 0);

  const kpis = [
    { label: "Campanhas Enviadas", value: campanhasEnviadas, icon: Send, color: "text-primary" },
    { label: "Mensagens Entregues", value: totalEnviados.toLocaleString("pt-BR"), icon: Users, color: "text-highlight" },
    { label: "Taxa de Entrega", value: `${taxaEntrega}%`, icon: TrendingUp, color: "text-accent" },
    { label: "Banners Ativos", value: banners.filter((b: any) => b.ativo).length, icon: Megaphone, color: "text-primary" },
    { label: "Views Banners", value: totalVisualizacoes.toLocaleString("pt-BR"), icon: Eye, color: "text-highlight" },
    { label: "CTR Banners", value: `${ctrBanners}%`, icon: MousePointer, color: "text-accent" },
    { label: "Automações Ativas", value: automacoesAtivas, icon: Zap, color: "text-primary" },
    { label: "Disparos Automáticos", value: totalDisparosAuto.toLocaleString("pt-BR"), icon: BarChart3, color: "text-highlight" },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Dashboard de Marketing</h3>
        <p className="text-sm text-muted-foreground">Visão consolidada de campanhas, banners e automações</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {kpis.map((kpi) => (
          <Card key={kpi.label} className="p-4 space-y-2">
            <div className="flex items-center gap-2">
              <kpi.icon size={14} className={kpi.color} />
              <span className="text-xs text-muted-foreground">{kpi.label}</span>
            </div>
            <p className="text-xl font-bold text-foreground">{kpi.value}</p>
          </Card>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-4 space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Campanhas por Canal</h4>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={campanhaPorTipo}>
              <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
              <XAxis dataKey="tipo" tick={{ fontSize: 12 }} className="fill-muted-foreground" />
              <YAxis tick={{ fontSize: 12 }} className="fill-muted-foreground" />
              <Tooltip />
              <Bar dataKey="total" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} name="Total" />
              <Bar dataKey="enviadas" fill="hsl(var(--highlight))" radius={[4, 4, 0, 0]} name="Enviadas" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4 space-y-3">
          <h4 className="text-sm font-semibold text-foreground">Status das Campanhas</h4>
          {campanhaPorStatus.length > 0 ? (
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie data={campanhaPorStatus} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={70} label={({ name, value }) => `${name}: ${value}`}>
                  {campanhaPorStatus.map((_, i) => (
                    <Cell key={i} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="text-sm text-muted-foreground text-center py-8">Sem dados</p>
          )}
        </Card>
      </div>

      {/* Últimas campanhas */}
      <Card className="p-4 space-y-3">
        <h4 className="text-sm font-semibold text-foreground">Últimas Campanhas</h4>
        <div className="space-y-2">
          {campanhas.slice(0, 5).map((c: any) => (
            <div key={c.id} className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
              <div className="flex items-center gap-3">
                <Badge variant="outline" className="text-[10px]">{c.tipo}</Badge>
                <span className="text-sm font-medium text-foreground">{c.titulo}</span>
              </div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground">
                {c.status === "enviada" && (
                  <span>{c.total_enviados || 0}/{c.total_destinatarios || 0}</span>
                )}
                <Badge variant="outline" className="text-[10px]">{c.status}</Badge>
              </div>
            </div>
          ))}
          {campanhas.length === 0 && (
            <p className="text-sm text-muted-foreground text-center py-4">Nenhuma campanha ainda</p>
          )}
        </div>
      </Card>
    </div>
  );
};

export default MarketingDashboardTab;
