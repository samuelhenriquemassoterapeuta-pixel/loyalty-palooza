import { useState } from "react";
import { AdminImageUpload } from "@/features/admin/components/AdminImageUpload";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const PlanosAlongamentoTab = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [saving, setSaving] = useState(false);

  const { data: planos = [], isLoading } = useQuery({
    queryKey: ["admin-planos-alongamento"],
    queryFn: async () => {
      const { data, error } = await supabase.from("planos_alongamento").select("*").order("nome");
      if (error) throw error;
      return data;
    },
  });

  const openCreate = () => {
    setEditing(null);
    setForm({ nome: "", descricao: "", nivel: "iniciante", objetivo: "flexibilidade", duracao_semanas: 4, frequencia_semanal: 3, imagem_url: "", disponivel: true });
    setDialogOpen(true);
  };

  const openEdit = (item: any) => { setEditing(item); setForm({ ...item }); setDialogOpen(true); };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data = { ...form, duracao_semanas: parseInt(form.duracao_semanas), frequencia_semanal: parseInt(form.frequencia_semanal) };
      if (editing) {
        const { error } = await supabase.from("planos_alongamento").update(data).eq("id", editing.id);
        if (error) throw error;
        toast.success("Plano atualizado!");
      } else {
        delete data.id;
        const { error } = await supabase.from("planos_alongamento").insert(data);
        if (error) throw error;
        toast.success("Plano criado!");
      }
      queryClient.invalidateQueries({ queryKey: ["admin-planos-alongamento"] });
      setDialogOpen(false);
    } catch (e: any) { toast.error(e.message); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir plano?")) return;
    const { error } = await supabase.from("planos_alongamento").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Excluído!"); queryClient.invalidateQueries({ queryKey: ["admin-planos-alongamento"] }); }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      <div className="flex justify-end"><Button size="sm" onClick={openCreate}><Plus className="w-4 h-4 mr-1" />Novo Plano</Button></div>
      {planos.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">Nenhum plano cadastrado</p>
      ) : (
        <div className="space-y-3">
          {planos.map((p: any) => (
            <Card key={p.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm truncate">{p.nome}</h3>
                    <Badge variant="outline" className="text-[10px] capitalize">{p.nivel}</Badge>
                    {!p.disponivel && <Badge variant="secondary" className="text-[10px]">Inativo</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{p.duracao_semanas} sem · {p.frequencia_semanal}x/sem · {p.objetivo}</p>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(p)}><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(p.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Editar" : "Novo"} Plano de Alongamento</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Nome</Label><Input value={form.nome || ""} onChange={e => setForm({ ...form, nome: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Nível</Label>
                <Select value={form.nivel || ""} onValueChange={v => setForm({ ...form, nivel: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="iniciante">Iniciante</SelectItem>
                    <SelectItem value="intermediario">Intermediário</SelectItem>
                    <SelectItem value="avancado">Avançado</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Objetivo</Label>
                <Select value={form.objetivo || ""} onValueChange={v => setForm({ ...form, objetivo: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="flexibilidade">Flexibilidade</SelectItem>
                    <SelectItem value="postura">Postura</SelectItem>
                    <SelectItem value="relaxamento">Relaxamento</SelectItem>
                    <SelectItem value="reabilitacao">Reabilitação</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Duração (semanas)</Label><Input type="number" value={form.duracao_semanas || ""} onChange={e => setForm({ ...form, duracao_semanas: e.target.value })} /></div>
              <div><Label>Frequência/semana</Label><Input type="number" value={form.frequencia_semanal || ""} onChange={e => setForm({ ...form, frequencia_semanal: e.target.value })} /></div>
            </div>
            <div><Label>Descrição</Label><Textarea value={form.descricao || ""} onChange={e => setForm({ ...form, descricao: e.target.value })} /></div>
            <AdminImageUpload label="Imagem" value={form.imagem_url || ""} onChange={v => setForm({ ...form, imagem_url: v })} />
            <div className="flex items-center gap-2"><Switch checked={form.disponivel ?? true} onCheckedChange={v => setForm({ ...form, disponivel: v })} /><Label>Disponível</Label></div>
            <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? "Salvando..." : "Salvar"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
