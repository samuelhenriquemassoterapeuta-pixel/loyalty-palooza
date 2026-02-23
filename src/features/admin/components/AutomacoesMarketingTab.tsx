import { useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { toast } from "sonner";
import { Plus, Zap, Mail, MessageSquare, Bell, Trash2, Pencil } from "lucide-react";

const TIPOS = [
  { value: "boas_vindas", label: "Boas-vindas", desc: "Quando um novo usuário se cadastra" },
  { value: "reengajamento", label: "Reengajamento", desc: "Usuários inativos por X dias" },
  { value: "aniversario", label: "Aniversário", desc: "Data de aniversário do cliente" },
  { value: "pos_sessao", label: "Pós-sessão", desc: "Após completar uma sessão" },
  { value: "carrinho_abandonado", label: "Carrinho abandonado", desc: "Carrinho sem finalizar há 2h+" },
];

const CANAIS = [
  { value: "whatsapp", label: "WhatsApp", icon: MessageSquare },
  { value: "email", label: "Email", icon: Mail },
  { value: "push", label: "Push", icon: Bell },
];

const SEGMENTOS = [
  { value: "fiel", label: "Fiéis" },
  { value: "recorrente", label: "Recorrentes" },
  { value: "novo", label: "Novos" },
  { value: "em_risco", label: "Em risco" },
  { value: "inativo", label: "Inativos" },
  { value: "todos", label: "Todos" },
];

const initialForm = {
  nome: "",
  tipo: "boas_vindas",
  canal: "whatsapp",
  gatilho: "",
  mensagem: "",
  segmentos: [] as string[],
  delay_horas: 0,
};

const AutomacoesMarketingTab = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState(initialForm);

  const { data: automacoes = [], isLoading } = useQuery({
    queryKey: ["admin-automacoes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("automacoes_marketing" as any)
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data || []) as any[];
    },
  });

  const criar = useMutation({
    mutationFn: async () => {
      if (!form.nome.trim() || !form.mensagem.trim()) throw new Error("Nome e mensagem são obrigatórios");
      const tipoInfo = TIPOS.find(t => t.value === form.tipo);
      const { error } = await supabase.from("automacoes_marketing" as any).insert({
        nome: form.nome,
        tipo: form.tipo,
        canal: form.canal,
        gatilho: form.gatilho || tipoInfo?.desc || form.tipo,
        mensagem: form.mensagem,
        segmentos: form.segmentos,
        delay_horas: form.delay_horas,
      } as any);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Automação criada!");
      queryClient.invalidateQueries({ queryKey: ["admin-automacoes"] });
      setDialogOpen(false);
      setForm(initialForm);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggleAtivo = useMutation({
    mutationFn: async ({ id, ativo }: { id: string; ativo: boolean }) => {
      const { error } = await supabase.from("automacoes_marketing" as any).update({ ativo: !ativo } as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-automacoes"] }),
    onError: (e: Error) => toast.error(e.message),
  });

  const deletar = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("automacoes_marketing" as any).delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      toast.success("Automação excluída");
      queryClient.invalidateQueries({ queryKey: ["admin-automacoes"] });
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggleSegmento = (seg: string) => {
    setForm(prev => ({
      ...prev,
      segmentos: prev.segmentos.includes(seg) ? prev.segmentos.filter(s => s !== seg) : [...prev.segmentos, seg],
    }));
  };

  if (isLoading) return <p className="text-center text-muted-foreground py-8">Carregando...</p>;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Automações de Marketing</h3>
          <p className="text-sm text-muted-foreground">Fluxos automáticos baseados em comportamento</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1 shadow-button">
              <Plus size={14} /> Nova Automação
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Nova Automação</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input placeholder="Nome da automação" value={form.nome} onChange={(e) => setForm({ ...form, nome: e.target.value })} />

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Tipo</label>
                  <Select value={form.tipo} onValueChange={(v) => setForm({ ...form, tipo: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {TIPOS.map(t => <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Canal</label>
                  <Select value={form.canal} onValueChange={(v) => setForm({ ...form, canal: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {CANAIS.map(c => <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Delay (horas após gatilho)</label>
                <Input type="number" min={0} value={form.delay_horas} onChange={(e) => setForm({ ...form, delay_horas: parseInt(e.target.value) || 0 })} />
              </div>

              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Gatilho personalizado (opcional)</label>
                <Input placeholder={TIPOS.find(t => t.value === form.tipo)?.desc} value={form.gatilho} onChange={(e) => setForm({ ...form, gatilho: e.target.value })} />
              </div>

              <div>
                <p className="text-xs text-muted-foreground mb-2">Segmentos alvo</p>
                <div className="flex flex-wrap gap-2">
                  {SEGMENTOS.map(seg => (
                    <button key={seg.value} onClick={() => toggleSegmento(seg.value)} className={`px-3 py-1.5 rounded-full text-xs border transition-all ${form.segmentos.includes(seg.value) ? "bg-primary text-primary-foreground border-primary" : "bg-muted/50 text-muted-foreground border-border hover:border-primary/50"}`}>
                      {seg.label}
                    </button>
                  ))}
                </div>
              </div>

              <Textarea placeholder="Mensagem da automação... Use {nome} para personalizar" value={form.mensagem} onChange={(e) => setForm({ ...form, mensagem: e.target.value })} rows={4} />

              <Button onClick={() => criar.mutate()} disabled={criar.isPending} className="w-full gap-2">
                <Zap size={14} /> Criar Automação
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3 text-center">
          <p className="text-2xl font-bold text-foreground">{automacoes.length}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-2xl font-bold text-highlight">{automacoes.filter((a: any) => a.ativo).length}</p>
          <p className="text-xs text-muted-foreground">Ativas</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-2xl font-bold text-primary">{automacoes.reduce((acc: number, a: any) => acc + (a.total_disparos || 0), 0)}</p>
          <p className="text-xs text-muted-foreground">Disparos</p>
        </Card>
      </div>

      {automacoes.length === 0 ? (
        <p className="text-sm text-muted-foreground text-center py-8">Nenhuma automação criada ainda</p>
      ) : (
        <div className="space-y-3">
          {automacoes.map((a: any) => {
            const tipoInfo = TIPOS.find(t => t.value === a.tipo);
            const canalInfo = CANAIS.find(c => c.value === a.canal);
            const Icon = canalInfo?.icon || Zap;
            return (
              <div key={a.id} className="p-4 rounded-2xl glass-card-strong space-y-3">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-primary/10">
                      <Zap size={16} className="text-primary" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground text-sm">{a.nome}</p>
                      <p className="text-xs text-muted-foreground">{tipoInfo?.label || a.tipo} · {canalInfo?.label || a.canal}</p>
                    </div>
                  </div>
                  <Switch checked={a.ativo} onCheckedChange={() => toggleAtivo.mutate({ id: a.id, ativo: a.ativo })} />
                </div>

                <p className="text-xs text-muted-foreground">{a.gatilho}</p>
                {a.delay_horas > 0 && <Badge variant="outline" className="text-[10px]">⏱ {a.delay_horas}h após gatilho</Badge>}

                <div className="flex flex-wrap gap-1">
                  {(a.segmentos || []).map((s: string) => (
                    <Badge key={s} variant="outline" className="text-[10px]">{SEGMENTOS.find(seg => seg.value === s)?.label || s}</Badge>
                  ))}
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                    <span>{a.total_disparos || 0} disparos</span>
                    <span>{a.total_conversoes || 0} conversões</span>
                  </div>
                  <Button size="sm" variant="ghost" className="text-destructive h-7" onClick={() => { if (confirm("Excluir automação?")) deletar.mutate(a.id); }}>
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

export default AutomacoesMarketingTab;
