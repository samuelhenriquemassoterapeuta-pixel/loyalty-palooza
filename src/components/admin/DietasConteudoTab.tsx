import { useState } from "react";
import { AdminImageUpload } from "@/components/admin/AdminImageUpload";
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

export const DietasConteudoTab = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [saving, setSaving] = useState(false);

  const { data: conteudos = [], isLoading } = useQuery({
    queryKey: ["admin-dietas-conteudo"],
    queryFn: async () => {
      const { data, error } = await supabase.from("dietas_conteudo").select("*").order("ordem");
      if (error) throw error;
      return data;
    },
  });

  const openCreate = () => {
    setEditing(null);
    setForm({ titulo: "", descricao: "", categoria: "geral", protocolo_tipo: "drenagem_pos_operatorio", ordem: 0, imagem_url: "", disponivel: true, conteudo: "[]" });
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
      try { conteudo = JSON.parse(form.conteudo); } catch { toast.error("JSON inválido"); setSaving(false); return; }
      const data = { ...form, conteudo, ordem: parseInt(form.ordem) || 0 };
      if (editing) {
        const { error } = await supabase.from("dietas_conteudo").update(data).eq("id", editing.id);
        if (error) throw error;
        toast.success("Conteúdo atualizado!");
      } else {
        delete data.id;
        const { error } = await supabase.from("dietas_conteudo").insert(data);
        if (error) throw error;
        toast.success("Conteúdo criado!");
      }
      queryClient.invalidateQueries({ queryKey: ["admin-dietas-conteudo"] });
      setDialogOpen(false);
    } catch (e: any) { toast.error(e.message); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir conteúdo?")) return;
    const { error } = await supabase.from("dietas_conteudo").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Excluído!"); queryClient.invalidateQueries({ queryKey: ["admin-dietas-conteudo"] }); }
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      <div className="flex justify-end"><Button size="sm" onClick={openCreate}><Plus className="w-4 h-4 mr-1" />Novo Conteúdo</Button></div>
      {conteudos.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">Nenhum conteúdo educativo cadastrado</p>
      ) : (
        <div className="space-y-3">
          {conteudos.map((c: any) => (
            <Card key={c.id} className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h3 className="font-semibold text-sm truncate">{c.titulo}</h3>
                    <Badge variant="outline" className="text-[10px] capitalize">{c.categoria}</Badge>
                    {!c.disponivel && <Badge variant="secondary" className="text-[10px]">Inativo</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">Ordem: {c.ordem}{c.protocolo_tipo ? ` · ${c.protocolo_tipo}` : ""}</p>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(c)}><Pencil className="w-4 h-4" /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(c.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Editar" : "Novo"} Conteúdo Educativo</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Título</Label><Input value={form.titulo || ""} onChange={e => setForm({ ...form, titulo: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Categoria</Label>
                <Select value={form.categoria || ""} onValueChange={v => setForm({ ...form, categoria: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="geral">Geral</SelectItem>
                    <SelectItem value="receitas">Receitas</SelectItem>
                    <SelectItem value="dicas">Dicas</SelectItem>
                    <SelectItem value="educativo">Educativo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div><Label>Tipo Protocolo</Label>
                <Select value={form.protocolo_tipo || ""} onValueChange={v => setForm({ ...form, protocolo_tipo: v })}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="drenagem_pos_operatorio">Drenagem</SelectItem>
                    <SelectItem value="postural">Postural</SelectItem>
                    <SelectItem value="alongamento">Alongamento</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div><Label>Descrição</Label><Textarea value={form.descricao || ""} onChange={e => setForm({ ...form, descricao: e.target.value })} /></div>
            <div><Label>Ordem</Label><Input type="number" value={form.ordem || 0} onChange={e => setForm({ ...form, ordem: e.target.value })} /></div>
            <AdminImageUpload label="Imagem" value={form.imagem_url || ""} onChange={v => setForm({ ...form, imagem_url: v })} />
            <div><Label>Conteúdo (JSON)</Label><Textarea rows={6} className="font-mono text-xs" value={form.conteudo || "[]"} onChange={e => setForm({ ...form, conteudo: e.target.value })} /></div>
            <div className="flex items-center gap-2"><Switch checked={form.disponivel ?? true} onCheckedChange={v => setForm({ ...form, disponivel: v })} /><Label>Disponível</Label></div>
            <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? "Salvando..." : "Salvar"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
