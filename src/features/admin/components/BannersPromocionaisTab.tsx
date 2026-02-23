import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { Plus, Megaphone, Eye, MousePointer, Trash2, TrendingUp } from "lucide-react";

const TIPOS_BANNER = [
  { value: "popup", label: "Pop-up" },
  { value: "banner_topo", label: "Banner Topo" },
  { value: "banner_home", label: "Banner Home" },
];

const SEGMENTOS = [
  { value: "fiel", label: "Fiéis" },
  { value: "recorrente", label: "Recorrentes" },
  { value: "novo", label: "Novos" },
  { value: "em_risco", label: "Em risco" },
  { value: "inativo", label: "Inativos" },
  { value: "nunca_visitou", label: "Nunca visitou" },
];

const BannersPromocionaisTab = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState({
    titulo: "",
    subtitulo: "",
    link_destino: "",
    cor_fundo: "#8B5E3C",
    tipo: "banner_home",
    data_inicio: new Date().toISOString().split("T")[0],
    data_fim: "",
    segmentos: [] as string[],
  });

  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["admin-banners"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("banners_promocionais")
        .select("*")
        .order("prioridade", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const toggleSegmento = (seg: string) => {
    setForm(prev => ({
      ...prev,
      segmentos: prev.segmentos.includes(seg) ? prev.segmentos.filter(s => s !== seg) : [...prev.segmentos, seg],
    }));
  };

  const handleCreate = async () => {
    if (!form.titulo.trim()) {
      toast.error("Título é obrigatório");
      return;
    }
    try {
      const { error } = await supabase.from("banners_promocionais").insert({
        titulo: form.titulo,
        subtitulo: form.subtitulo || null,
        link_destino: form.link_destino || null,
        cor_fundo: form.cor_fundo,
        tipo: form.tipo,
        data_inicio: form.data_inicio,
        data_fim: form.data_fim || null,
        segmentos: form.segmentos.length > 0 ? form.segmentos : null,
      });
      if (error) throw error;
      toast.success("Banner criado!");
      queryClient.invalidateQueries({ queryKey: ["admin-banners"] });
      setDialogOpen(false);
      setForm({ titulo: "", subtitulo: "", link_destino: "", cor_fundo: "#8B5E3C", tipo: "banner_home", data_inicio: new Date().toISOString().split("T")[0], data_fim: "", segmentos: [] });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const toggleAtivo = async (id: string, ativo: boolean) => {
    const { error } = await supabase.from("banners_promocionais").update({ ativo: !ativo }).eq("id", id);
    if (error) toast.error(error.message);
    else queryClient.invalidateQueries({ queryKey: ["admin-banners"] });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este banner?")) return;
    const { error } = await supabase.from("banners_promocionais").delete().eq("id", id);
    if (error) toast.error(error.message);
    else {
      toast.success("Banner excluído");
      queryClient.invalidateQueries({ queryKey: ["admin-banners"] });
    }
  };

  // KPIs
  const totalViews = banners.reduce((a: number, b: any) => a + (b.visualizacoes || 0), 0);
  const totalClicks = banners.reduce((a: number, b: any) => a + (b.cliques || 0), 0);
  const ctr = totalViews > 0 ? ((totalClicks / totalViews) * 100).toFixed(1) : "0";
  const ativos = banners.filter((b: any) => b.ativo).length;

  if (isLoading) return <p className="text-center text-muted-foreground py-8">Carregando...</p>;

  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <Card className="p-3 text-center">
          <p className="text-2xl font-bold text-foreground">{banners.length}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-2xl font-bold text-highlight">{ativos}</p>
          <p className="text-xs text-muted-foreground">Ativos</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-2xl font-bold text-primary">{totalViews.toLocaleString("pt-BR")}</p>
          <p className="text-xs text-muted-foreground">Visualizações</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-2xl font-bold text-accent-foreground">{ctr}%</p>
          <p className="text-xs text-muted-foreground">CTR</p>
        </Card>
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Banners Promocionais</h3>
          <p className="text-sm text-muted-foreground">Pop-ups e banners segmentados no app</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1 shadow-button">
              <Plus size={14} /> Novo Banner
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Novo Banner</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Título" value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
              <Input placeholder="Subtítulo (opcional)" value={form.subtitulo} onChange={(e) => setForm({ ...form, subtitulo: e.target.value })} />
              <Input placeholder="Link de destino (ex: /pacotes)" value={form.link_destino} onChange={(e) => setForm({ ...form, link_destino: e.target.value })} />
              <div className="flex gap-3">
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Tipo</label>
                  <Select value={form.tipo} onValueChange={(v) => setForm({ ...form, tipo: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {TIPOS_BANNER.map((t) => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Cor</label>
                  <input type="color" value={form.cor_fundo} onChange={(e) => setForm({ ...form, cor_fundo: e.target.value })} className="w-10 h-10 rounded-lg cursor-pointer border-0" />
                </div>
              </div>

              {/* Segmentos */}
              <div>
                <p className="text-xs text-muted-foreground mb-2">Segmentos alvo (vazio = todos)</p>
                <div className="flex flex-wrap gap-2">
                  {SEGMENTOS.map(seg => (
                    <button key={seg.value} onClick={() => toggleSegmento(seg.value)} className={`px-3 py-1.5 rounded-full text-xs border transition-all ${form.segmentos.includes(seg.value) ? "bg-primary text-primary-foreground border-primary" : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50"}`}>
                      {seg.label}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Início</label>
                  <Input type="date" value={form.data_inicio} onChange={(e) => setForm({ ...form, data_inicio: e.target.value })} />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Fim (opcional)</label>
                  <Input type="date" value={form.data_fim} onChange={(e) => setForm({ ...form, data_fim: e.target.value })} />
                </div>
              </div>
              <Button onClick={handleCreate} className="w-full">Criar Banner</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {banners.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">Nenhum banner criado</p>
      ) : (
        <div className="space-y-3">
          {banners.map((b: any) => {
            const itemCtr = (b.visualizacoes || 0) > 0 ? (((b.cliques || 0) / b.visualizacoes) * 100).toFixed(1) : "0";
            return (
              <div key={b.id} className="p-4 rounded-2xl glass-card-strong space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ backgroundColor: b.cor_fundo }}>
                      <Megaphone size={14} className="text-white" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{b.titulo}</p>
                      {b.subtitulo && <p className="text-xs text-muted-foreground">{b.subtitulo}</p>}
                    </div>
                  </div>
                  <Switch checked={b.ativo} onCheckedChange={() => toggleAtivo(b.id, b.ativo)} />
                </div>

                {/* Segmentos do banner */}
                {b.segmentos && b.segmentos.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {b.segmentos.map((s: string) => (
                      <Badge key={s} variant="outline" className="text-[10px]">{SEGMENTOS.find(seg => seg.value === s)?.label || s}</Badge>
                    ))}
                  </div>
                )}

                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                  <Badge variant="outline" className="text-[10px]">
                    {TIPOS_BANNER.find((t) => t.value === b.tipo)?.label || b.tipo}
                  </Badge>
                  <span className="flex items-center gap-1"><Eye size={10} /> {(b.visualizacoes || 0).toLocaleString("pt-BR")}</span>
                  <span className="flex items-center gap-1"><MousePointer size={10} /> {(b.cliques || 0).toLocaleString("pt-BR")}</span>
                  <span className="flex items-center gap-1"><TrendingUp size={10} /> {itemCtr}% CTR</span>
                  <span>{b.data_inicio} {b.data_fim ? `→ ${b.data_fim}` : ""}</span>
                </div>
                <div className="flex justify-end">
                  <Button size="sm" variant="ghost" className="text-destructive h-7" onClick={() => handleDelete(b.id)}>
                    <Trash2 size={12} />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default BannersPromocionaisTab;
