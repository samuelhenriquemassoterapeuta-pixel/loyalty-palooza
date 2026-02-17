import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Trophy, Trash2, Loader2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { format } from "date-fns";

const DesafiosTab = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    titulo: "",
    descricao: "",
    icone: "Trophy",
    data_inicio: "",
    data_fim: "",
    meta_tipo: "sessoes",
    meta_quantidade: "5",
    recompensa_valor: "20",
  });

  const { data: desafios = [], isLoading } = useQuery({
    queryKey: ["admin-desafios"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("desafios")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleCreate = async () => {
    setSaving(true);
    try {
      const { error } = await supabase.from("desafios").insert({
        titulo: form.titulo,
        descricao: form.descricao || null,
        icone: form.icone,
        data_inicio: form.data_inicio,
        data_fim: form.data_fim,
        meta_tipo: form.meta_tipo,
        meta_quantidade: parseInt(form.meta_quantidade),
        recompensa_valor: parseFloat(form.recompensa_valor),
      } as any);
      if (error) throw error;
      toast.success("Desafio criado!");
      queryClient.invalidateQueries({ queryKey: ["admin-desafios"] });
      setDialogOpen(false);
      setForm({ titulo: "", descricao: "", icone: "Trophy", data_inicio: "", data_fim: "", meta_tipo: "sessoes", meta_quantidade: "5", recompensa_valor: "20" });
    } catch (err: any) {
      toast.error(err.message || "Erro ao criar desafio");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir este desafio?")) return;
    const { error } = await supabase.from("desafios").delete().eq("id", id);
    if (error) { toast.error("Erro ao excluir"); return; }
    toast.success("Desafio excluído");
    queryClient.invalidateQueries({ queryKey: ["admin-desafios"] });
  };

  const toggleAtivo = async (id: string, ativo: boolean) => {
    const { error } = await supabase.from("desafios").update({ ativo: !ativo } as any).eq("id", id);
    if (error) { toast.error("Erro"); return; }
    queryClient.invalidateQueries({ queryKey: ["admin-desafios"] });
  };

  if (isLoading) return <div className="flex justify-center py-8"><Loader2 className="animate-spin" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Desafios Temáticos</h3>
        <Button size="sm" onClick={() => setDialogOpen(true)} className="gap-1">
          <Plus size={14} /> Novo Desafio
        </Button>
      </div>

      {desafios.length === 0 ? (
        <Card><CardContent className="p-8 text-center text-muted-foreground">Nenhum desafio criado</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {desafios.map((d: any) => (
            <Card key={d.id}>
              <CardContent className="p-4 flex items-center gap-3">
                <Trophy size={20} className="text-accent shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">{d.titulo}</p>
                  <p className="text-[10px] text-muted-foreground">
                    {d.data_inicio && format(new Date(d.data_inicio), "dd/MM")} — {d.data_fim && format(new Date(d.data_fim), "dd/MM/yyyy")} · Meta: {d.meta_quantidade} {d.meta_tipo} · R$ {Number(d.recompensa_valor).toFixed(2)}
                  </p>
                </div>
                <Badge
                  variant={d.ativo ? "default" : "secondary"}
                  className="cursor-pointer text-[10px]"
                  onClick={() => toggleAtivo(d.id, d.ativo)}
                >
                  {d.ativo ? "Ativo" : "Inativo"}
                </Badge>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(d.id)}>
                  <Trash2 size={14} className="text-destructive" />
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Novo Desafio</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Título</Label>
              <Input value={form.titulo} onChange={(e) => setForm({ ...form, titulo: e.target.value })} />
            </div>
            <div>
              <Label>Descrição</Label>
              <Textarea value={form.descricao} onChange={(e) => setForm({ ...form, descricao: e.target.value })} rows={2} />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Data Início</Label>
                <Input type="date" value={form.data_inicio} onChange={(e) => setForm({ ...form, data_inicio: e.target.value })} />
              </div>
              <div>
                <Label>Data Fim</Label>
                <Input type="date" value={form.data_fim} onChange={(e) => setForm({ ...form, data_fim: e.target.value })} />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Tipo de Meta</Label>
                <Select value={form.meta_tipo} onValueChange={(v) => setForm({ ...form, meta_tipo: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sessoes">Sessões</SelectItem>
                    <SelectItem value="posts">Posts</SelectItem>
                    <SelectItem value="alongamentos">Alongamentos</SelectItem>
                    <SelectItem value="checkins">Check-ins</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Quantidade</Label>
                <Input type="number" value={form.meta_quantidade} onChange={(e) => setForm({ ...form, meta_quantidade: e.target.value })} />
              </div>
            </div>
            <div>
              <Label>Valor da Recompensa (R$)</Label>
              <Input type="number" step="0.01" value={form.recompensa_valor} onChange={(e) => setForm({ ...form, recompensa_valor: e.target.value })} />
            </div>
            <Button className="w-full" onClick={handleCreate} disabled={saving || !form.titulo || !form.data_inicio || !form.data_fim}>
              {saving ? <Loader2 className="animate-spin mr-2" size={14} /> : null}
              Criar Desafio
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DesafiosTab;
