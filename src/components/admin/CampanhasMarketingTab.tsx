import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Plus, Send, Clock, CheckCircle2, XCircle, MessageSquare, Mail, Megaphone } from "lucide-react";

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
  const [form, setForm] = useState({
    titulo: "",
    tipo: "whatsapp",
    segmentos: [] as string[],
    mensagem: "",
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
      const { error } = await supabase.from("campanhas_marketing").insert({
        titulo: form.titulo,
        tipo: form.tipo,
        segmentos: form.segmentos,
        mensagem: form.mensagem,
        created_by: user!.id,
      });
      if (error) throw error;
      toast.success("Campanha criada como rascunho!");
      queryClient.invalidateQueries({ queryKey: ["admin-campanhas"] });
      setDialogOpen(false);
      setForm({ titulo: "", tipo: "whatsapp", segmentos: [], mensagem: "" });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleUpdateStatus = async (id: string, status: string) => {
    try {
      const updates: Record<string, any> = { status };
      if (status === "enviada") updates.enviada_em = new Date().toISOString();
      const { error } = await supabase.from("campanhas_marketing").update(updates).eq("id", id);
      if (error) throw error;
      toast.success(`Status atualizado para ${status}`);
      queryClient.invalidateQueries({ queryKey: ["admin-campanhas"] });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  if (isLoading) return <p className="text-center text-muted-foreground py-8">Carregando...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Campanhas de Marketing</h3>
          <p className="text-sm text-muted-foreground">WhatsApp, Email e Banners segmentados</p>
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

              <Button onClick={handleCreate} className="w-full gap-2">
                <Plus size={14} /> Criar Rascunho
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {campanhas.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">Nenhuma campanha criada ainda</p>
      ) : (
        <div className="space-y-3">
          {campanhas.map((c: any) => {
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
                    <Button size="sm" onClick={() => handleUpdateStatus(c.id, "enviada")} className="gap-1">
                      <Send size={12} /> Enviar
                    </Button>
                    <Button size="sm" variant="destructive" onClick={() => handleUpdateStatus(c.id, "cancelada")} className="gap-1">
                      <XCircle size={12} /> Cancelar
                    </Button>
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
