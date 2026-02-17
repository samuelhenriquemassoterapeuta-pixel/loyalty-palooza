import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const SecoesClinicasTab = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [saving, setSaving] = useState(false);

  const { data: secoes = [], isLoading } = useQuery({
    queryKey: ["admin-secoes-clinicas"],
    queryFn: async () => {
      const { data, error } = await supabase.from("protocolo_secoes_clinicas").select("*, protocolos(nome)").order("ordem");
      if (error) throw error;
      return data;
    },
  });

  const { data: protocolos = [] } = useQuery({
    queryKey: ["admin-protocolos-select"],
    queryFn: async () => {
      const { data, error } = await supabase.from("protocolos").select("id, nome").order("nome");
      if (error) throw error;
      return data;
    },
  });

  const openCreate = () => {
    setEditing(null);
    setForm({ titulo: "", descricao: "", protocolo_id: "", icone: "info", cor: "primary", ordem: 0, conteudo: "[]" });
    setDialogOpen(true);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    setForm({ ...item, conteudo: JSON.stringify(item.conteudo, null, 2) });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      let conteudo;
      try { conteudo = JSON.parse(form.conteudo); } catch { toast.error("JSON do conteúdo inválido"); setSaving(false); return; }
      const data = { ...form, conteudo, ordem: parseInt(form.ordem) || 0 };
      delete data.protocolos;
      if (editing) {
        const { error } = await supabase.from("protocolo_secoes_clinicas").update(data).eq("id", editing.id);
        if (error) throw error;
        toast.success("Seção atualizada!");
      } else {
        delete data.id;
        const { error } = await supabase.from("protocolo_secoes_clinicas").insert(data);
        if (error) throw error;
        toast.success("Seção criada!");
      }
      queryClient.invalidateQueries({ queryKey: ["admin-secoes-clinicas"] });
      setDialogOpen(false);
    } catch (e: any) { toast.error(e.message); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir seção clínica?")) return;
    const { error } = await supabase.from("protocolo_secoes_clinicas").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Excluído!"); queryClient.invalidateQueries({ queryKey: ["admin-secoes-clinicas"] }); }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      <div className="flex justify-end"><Button size="sm" onClick={openCreate}><Plus className="w-4 h-4 mr-1" />Nova Seção</Button></div>
      {secoes.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">Nenhuma seção clínica cadastrada</p>
      ) : (
        <div className="space-y-3">
          {secoes.map((s: any) => (
            <Card key={s.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm truncate">{s.titulo}</h3>
                    <Badge variant="outline" className="text-[10px]">Ordem: {s.ordem}</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">{s.protocolos?.nome || "Sem protocolo"}{s.descricao ? ` · ${s.descricao}` : ""}</p>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(s)}><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(s.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Editar" : "Nova"} Seção Clínica</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Título</Label><Input value={form.titulo || ""} onChange={e => setForm({ ...form, titulo: e.target.value })} /></div>
            <div><Label>Protocolo</Label>
              <Select value={form.protocolo_id || ""} onValueChange={v => setForm({ ...form, protocolo_id: v })}>
                <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                <SelectContent>
                  {protocolos.map((pr: any) => <SelectItem key={pr.id} value={pr.id}>{pr.nome}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
            <div><Label>Descrição</Label><Textarea value={form.descricao || ""} onChange={e => setForm({ ...form, descricao: e.target.value })} /></div>
            <div className="grid grid-cols-3 gap-3">
              <div><Label>Ícone</Label><Input value={form.icone || ""} onChange={e => setForm({ ...form, icone: e.target.value })} /></div>
              <div><Label>Cor</Label><Input value={form.cor || ""} onChange={e => setForm({ ...form, cor: e.target.value })} /></div>
              <div><Label>Ordem</Label><Input type="number" value={form.ordem || 0} onChange={e => setForm({ ...form, ordem: e.target.value })} /></div>
            </div>
            <div><Label>Conteúdo (JSON)</Label><Textarea rows={6} className="font-mono text-xs" value={form.conteudo || "[]"} onChange={e => setForm({ ...form, conteudo: e.target.value })} /></div>
            <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? "Salvando..." : "Salvar"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
