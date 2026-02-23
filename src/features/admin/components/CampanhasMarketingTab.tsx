import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Send, Clock, CheckCircle2, XCircle, MessageSquare, Mail, Megaphone, Calendar, TrendingUp, Users } from "lucide-react";

const SEGMENTOS = [
  { value: "fiel", label: "Fiéis (10+ sessões)" },
  { value: "recorrente", label: "Recorrentes (3-9 sessões)" },
  { value: "novo", label: "Novos (1-2 sessões)" },
  { value: "em_risco", label: "Em risco (30-90d sem visita)" },
  { value: "inativo", label: "Inativos (90d+ sem visita)" },
  { value: "nunca_visitou", label: "Nunca visitou" },
];

const TIPO_CONFIG: Record<string, { label: string; icon: typeof MessageSquare }> = {
  whatsapp: { label: "WhatsApp", icon: MessageSquare },
  email: { label: "Email", icon: Mail },
  banner: { label: "Banner", icon: Megaphone },
};

const STATUS_BADGE: Record<string, string> = {
  rascunho: "bg-muted text-muted-foreground",
  agendada: "bg-primary/15 text-primary",
  enviada: "bg-highlight/15 text-highlight",
  cancelada: "bg-destructive/15 text-destructive",
};

const CampanhasMarketingTab = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState("todos");
  const [form, setForm] = useState({
    titulo: "",
    tipo: "whatsapp",
    segmentos: [] as string[],
    mensagem: "",
    agendada_para: "",
  });

  const { data: campanhas = [], isLoading } = useQuery({
    queryKey: ["admin-campanhas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("campanhas_marketing")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const filteredCampanhas = statusFilter === "todos" ? campanhas : campanhas.filter((c: any) => c.status === statusFilter);

  const toggleSegmento = (seg: string) => {
    setForm((prev) => ({
      ...prev,
      segmentos: prev.segmentos.includes(seg)
        ? prev.segmentos.filter((s) => s !== seg)
        : [...prev.segmentos, seg],
    }));
  };

  const handleCreate = async () => {
    if (!form.titulo.trim() || !form.mensagem.trim() || form.segmentos.length === 0) {
      toast.error("Preencha título, mensagem e selecione ao menos um segmento");
      return;
    }
    try {
      const insertData: any = {
        titulo: form.titulo,
        tipo: form.tipo,
        segmentos: form.segmentos,
        mensagem: form.mensagem,
        created_by: user!.id,
      };
      if (form.agendada_para) {
        insertData.agendada_para = form.agendada_para;
        insertData.status = "agendada";
      }
      const { error } = await supabase.from("campanhas_marketing").insert(insertData);
      if (error) throw error;
      toast.success(form.agendada_para ? "Campanha agendada!" : "Campanha criada como rascunho!");
      queryClient.invalidateQueries({ queryKey: ["admin-campanhas"] });
      setDialogOpen(false);
      setForm({ titulo: "", tipo: "whatsapp", segmentos: [], mensagem: "", agendada_para: "" });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleSendCampaign = async (id: string) => {
    try {
      toast.loading("Enviando campanha...", { id: "send-campaign" });
      const { data, error } = await supabase.functions.invoke("enviar-campanha", {
        body: { campanha_id: id },
      });
      if (error) throw error;
      toast.dismiss("send-campaign");
      toast.success(`Campanha enviada! ${data.enviados} de ${data.destinatarios} destinatários alcançados`);
      queryClient.invalidateQueries({ queryKey: ["admin-campanhas"] });
    } catch (err: any) {
      toast.dismiss("send-campaign");
      toast.error(err.message || "Erro ao enviar campanha");
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const { error } = await supabase.from("campanhas_marketing").update({ status }).eq("id", id);
      if (error) throw error;
      toast.success(`Status atualizado para ${status}`);
      queryClient.invalidateQueries({ queryKey: ["admin-campanhas"] });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  // KPIs
  const totalCampanhas = campanhas.length;
  const enviadas = campanhas.filter((c: any) => c.status === "enviada").length;
  const totalEnviados = campanhas.reduce((acc: number, c: any) => acc + (c.total_enviados || 0), 0);
  const totalDestinatarios = campanhas.reduce((acc: number, c: any) => acc + (c.total_destinatarios || 0), 0);
  const taxaEntrega = totalDestinatarios > 0 ? ((totalEnviados / totalDestinatarios) * 100).toFixed(1) : "0";

  if (isLoading) return <p className="text-center text-muted-foreground py-8">Carregando...</p>;

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-3 text-center">
          <p className="text-2xl font-bold text-foreground">{totalCampanhas}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-2xl font-bold text-highlight">{enviadas}</p>
          <p className="text-xs text-muted-foreground">Enviadas</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-2xl font-bold text-primary">{totalEnviados.toLocaleString("pt-BR")}</p>
          <p className="text-xs text-muted-foreground">Msgs Entregues</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-2xl font-bold text-accent-foreground">{taxaEntrega}%</p>
          <p className="text-xs text-muted-foreground">Taxa Entrega</p>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[140px] h-8 text-xs">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="todos">Todos</SelectItem>
              <SelectItem value="rascunho">Rascunho</SelectItem>
              <SelectItem value="agendada">Agendada</SelectItem>
              <SelectItem value="enviada">Enviada</SelectItem>
              <SelectItem value="cancelada">Cancelada</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1 shadow-button">
              <Plus size={14} /> Nova Campanha
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Nova Campanha</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="Título da campanha"
                value={form.titulo}
                onChange={(e) => setForm({ ...form, titulo: e.target.value })}
              />

              <div className="grid grid-cols-2 gap-3">
                <Select value={form.tipo} onValueChange={(v) => setForm({ ...form, tipo: v })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="whatsapp">WhatsApp</SelectItem>
                    <SelectItem value="email">Email</SelectItem>
                    <SelectItem value="banner">Banner in-app</SelectItem>
                  </SelectContent>
                </Select>

                <div>
                  <Input
                    type="datetime-local"
                    value={form.agendada_para}
                    onChange={(e) => setForm({ ...form, agendada_para: e.target.value })}
                    placeholder="Agendar envio"
                  />
                </div>
              </div>

              <div>
                <p className="text-sm font-medium mb-2">Segmentos alvo</p>
                <div className="flex flex-wrap gap-2">
                  {SEGMENTOS.map((seg) => (
                    <button
                      key={seg.value}
                      onClick={() => toggleSegmento(seg.value)}
                      className={`px-3 py-1.5 rounded-full text-xs border transition-all ${
                        form.segmentos.includes(seg.value)
                          ? "bg-primary text-primary-foreground border-primary"
                          : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50"
                      }`}
                    >
                      {seg.label}
                    </button>
                  ))}
                </div>
              </div>

              <Textarea
                placeholder="Mensagem da campanha..."
                value={form.mensagem}
                onChange={(e) => setForm({ ...form, mensagem: e.target.value })}
                rows={4}
              />

              <div className="flex gap-2">
                <Button onClick={handleCreate} className="flex-1 gap-2">
                  {form.agendada_para ? <Calendar size={14} /> : <Plus size={14} />}
                  {form.agendada_para ? "Agendar" : "Criar Rascunho"}
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {filteredCampanhas.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">Nenhuma campanha encontrada</p>
      ) : (
        <div className="space-y-3">
          {filteredCampanhas.map((c: any) => {
            const tipoCfg = TIPO_CONFIG[c.tipo] || TIPO_CONFIG.whatsapp;
            const Icon = tipoCfg.icon;
            return (
              <div key={c.id} className="p-4 rounded-2xl glass-card-strong space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <Icon size={18} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{c.titulo}</p>
                      <p className="text-xs text-muted-foreground">
                        {tipoCfg.label} · {new Date(c.created_at).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  <Badge variant="outline" className={`text-[10px] ${STATUS_BADGE[c.status] || ""}`}>
                    {c.status}
                  </Badge>
                </div>

                {c.agendada_para && (
                  <div className="flex items-center gap-1 text-xs text-primary">
                    <Calendar size={12} />
                    Agendada para {new Date(c.agendada_para).toLocaleString("pt-BR")}
                  </div>
                )}

                <div className="flex flex-wrap gap-1">
                  {(c.segmentos || []).map((s: string) => (
                    <Badge key={s} variant="outline" className="text-[10px]">
                      {SEGMENTOS.find((seg) => seg.value === s)?.label || s}
                    </Badge>
                  ))}
                </div>

                <p className="text-xs text-muted-foreground line-clamp-2">{c.mensagem}</p>

                {c.status === "rascunho" && (
                  <div className="flex gap-2 pt-1">
                    <Button size="sm" onClick={() => handleSendCampaign(c.id)} className="gap-1">
                      <Send size={12} /> Enviar Agora
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleUpdateStatus(c.id, "cancelada")} className="gap-1">
                      <XCircle size={12} /> Cancelar
                    </Button>
                  </div>
                )}

                {c.status === "enviada" && (c.total_enviados != null || c.total_erros != null) && (
                  <div className="flex items-center gap-3 text-xs">
                    <span className="flex items-center gap-1 text-highlight">
                      <CheckCircle2 size={12} /> {c.total_enviados || 0} enviados
                    </span>
                    {(c.total_erros || 0) > 0 && (
                      <span className="flex items-center gap-1 text-destructive">
                        <XCircle size={12} /> {c.total_erros} erros
                      </span>
                    )}
                    <span className="text-muted-foreground">{c.total_destinatarios || 0} destinatários</span>
                    {(c.taxa_abertura || 0) > 0 && (
                      <span className="flex items-center gap-1 text-primary">
                        <TrendingUp size={12} /> {c.taxa_abertura}% abertura
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default CampanhasMarketingTab;
