import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Plus, Pencil, Trash2, Building2 } from "lucide-react";
import { toast } from "sonner";

const EmpresasTab = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    nome: "", cnpj: "", contato_nome: "", contato_email: "", contato_telefone: "",
    plano_qvt: "basico", valor_mensal: "", max_colaboradores: "50", ativa: true,
  });

  const { data: empresas = [], isLoading } = useQuery({
    queryKey: ["admin-empresas"],
    queryFn: async () => {
      const { data, error } = await supabase.from("empresas_corporativas").select("*").order("nome");
      if (error) throw error;
      return data;
    },
  });

  const openCreate = () => {
    setEditing(null);
    setForm({ nome: "", cnpj: "", contato_nome: "", contato_email: "", contato_telefone: "", plano_qvt: "basico", valor_mensal: "", max_colaboradores: "50", ativa: true });
    setDialogOpen(true);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    setForm({
      nome: item.nome, cnpj: item.cnpj || "", contato_nome: item.contato_nome || "",
      contato_email: item.contato_email || "", contato_telefone: item.contato_telefone || "",
      plano_qvt: item.plano_qvt, valor_mensal: String(item.valor_mensal),
      max_colaboradores: String(item.max_colaboradores), ativa: item.ativa,
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data: any = {
        nome: form.nome, cnpj: form.cnpj || null, contato_nome: form.contato_nome || null,
        contato_email: form.contato_email || null, contato_telefone: form.contato_telefone || null,
        plano_qvt: form.plano_qvt, valor_mensal: parseFloat(form.valor_mensal) || 0,
        max_colaboradores: parseInt(form.max_colaboradores) || 50, ativa: form.ativa,
      };
      if (editing) {
        const { error } = await supabase.from("empresas_corporativas").update(data).eq("id", editing.id);
        if (error) throw error;
        toast.success("Empresa atualizada!");
      } else {
        const { error } = await supabase.from("empresas_corporativas").insert(data);
        if (error) throw error;
        toast.success("Empresa cadastrada!");
      }
      queryClient.invalidateQueries({ queryKey: ["admin-empresas"] });
      setDialogOpen(false);
    } catch (e: any) { toast.error(e.message); }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir empresa?")) return;
    const { error } = await supabase.from("empresas_corporativas").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Empresa excluída!");
    queryClient.invalidateQueries({ queryKey: ["admin-empresas"] });
  };

  if (isLoading) return <div className="flex justify-center py-8"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Empresas Corporativas</h3>
        <Button size="sm" onClick={openCreate}><Plus size={14} className="mr-1" /> Nova Empresa</Button>
      </div>

      {empresas.length === 0 ? (
        <Card><CardContent className="p-6 text-center text-muted-foreground">Nenhuma empresa cadastrada</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {empresas.map((e: any) => (
            <Card key={e.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Building2 size={20} className="text-primary" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{e.nome}</span>
                      <Badge variant={e.ativa ? "default" : "secondary"} className="text-[10px]">
                        {e.ativa ? "Ativa" : "Inativa"}
                      </Badge>
                      <Badge variant="outline" className="text-[10px]">{e.plano_qvt}</Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      R$ {Number(e.valor_mensal).toFixed(2)}/mês · Até {e.max_colaboradores} colab.
                      {e.contato_nome && ` · ${e.contato_nome}`}
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(e)}><Pencil size={14} /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(e.id)}><Trash2 size={14} /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Editar" : "Nova"} Empresa</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Nome</Label><Input value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} /></div>
            <div><Label>CNPJ</Label><Input value={form.cnpj} onChange={e => setForm({...form, cnpj: e.target.value})} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Contato Nome</Label><Input value={form.contato_nome} onChange={e => setForm({...form, contato_nome: e.target.value})} /></div>
              <div><Label>Contato Email</Label><Input value={form.contato_email} onChange={e => setForm({...form, contato_email: e.target.value})} /></div>
            </div>
            <div><Label>Contato Telefone</Label><Input value={form.contato_telefone} onChange={e => setForm({...form, contato_telefone: e.target.value})} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Plano QVT</Label><Input value={form.plano_qvt} onChange={e => setForm({...form, plano_qvt: e.target.value})} /></div>
              <div><Label>Valor mensal (R$)</Label><Input type="number" value={form.valor_mensal} onChange={e => setForm({...form, valor_mensal: e.target.value})} /></div>
            </div>
            <div><Label>Máx. Colaboradores</Label><Input type="number" value={form.max_colaboradores} onChange={e => setForm({...form, max_colaboradores: e.target.value})} /></div>
            <div className="flex items-center gap-3">
              <Switch checked={form.ativa} onCheckedChange={v => setForm({...form, ativa: v})} />
              <Label>Ativa</Label>
            </div>
            <Button className="w-full" onClick={handleSave} disabled={saving || !form.nome}>
              {saving && <Loader2 size={14} className="animate-spin mr-2" />}
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default EmpresasTab;
