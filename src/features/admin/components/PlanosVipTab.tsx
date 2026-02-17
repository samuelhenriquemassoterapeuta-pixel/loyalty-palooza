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
import { Loader2, Plus, Pencil, Trash2, Crown } from "lucide-react";
import { toast } from "sonner";

const PlanosVipTab = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    nome: "",
    descricao: "",
    preco_mensal: "",
    desconto_servicos_percentual: "",
    cashback_bonus_percentual: "",
    prioridade_agendamento: false,
    cor: "#8B5CF6",
    icone: "Crown",
    ordem: "0",
    disponivel: true,
    beneficios: "[]",
  });

  const { data: planos = [], isLoading } = useQuery({
    queryKey: ["admin-planos-vip"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assinaturas_planos")
        .select("*")
        .order("ordem");
      if (error) throw error;
      return data;
    },
  });

  const openCreate = () => {
    setEditing(null);
    setForm({
      nome: "", descricao: "", preco_mensal: "", desconto_servicos_percentual: "0",
      cashback_bonus_percentual: "0", prioridade_agendamento: false, cor: "#8B5CF6",
      icone: "Crown", ordem: "0", disponivel: true, beneficios: "[]",
    });
    setDialogOpen(true);
  };

  const openEdit = (item: any) => {
    setEditing(item);
    setForm({
      nome: item.nome,
      descricao: item.descricao || "",
      preco_mensal: String(item.preco_mensal),
      desconto_servicos_percentual: String(item.desconto_servicos_percentual),
      cashback_bonus_percentual: String(item.cashback_bonus_percentual),
      prioridade_agendamento: item.prioridade_agendamento,
      cor: item.cor,
      icone: item.icone,
      ordem: String(item.ordem),
      disponivel: item.disponivel,
      beneficios: JSON.stringify(item.beneficios),
    });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const data: any = {
        nome: form.nome,
        descricao: form.descricao || null,
        preco_mensal: parseFloat(form.preco_mensal),
        desconto_servicos_percentual: parseFloat(form.desconto_servicos_percentual) || 0,
        cashback_bonus_percentual: parseFloat(form.cashback_bonus_percentual) || 0,
        prioridade_agendamento: form.prioridade_agendamento,
        cor: form.cor,
        icone: form.icone,
        ordem: parseInt(form.ordem) || 0,
        disponivel: form.disponivel,
        beneficios: JSON.parse(form.beneficios),
      };

      if (editing) {
        const { error } = await supabase.from("assinaturas_planos").update(data).eq("id", editing.id);
        if (error) throw error;
        toast.success("Plano atualizado!");
      } else {
        const { error } = await supabase.from("assinaturas_planos").insert(data);
        if (error) throw error;
        toast.success("Plano criado!");
      }
      queryClient.invalidateQueries({ queryKey: ["admin-planos-vip"] });
      setDialogOpen(false);
    } catch (e: any) {
      toast.error(e.message);
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir plano VIP?")) return;
    const { error } = await supabase.from("assinaturas_planos").delete().eq("id", id);
    if (error) { toast.error(error.message); return; }
    toast.success("Plano excluído!");
    queryClient.invalidateQueries({ queryKey: ["admin-planos-vip"] });
  };

  if (isLoading) return <div className="flex justify-center py-8"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Planos VIP</h3>
        <Button size="sm" onClick={openCreate}><Plus size={14} className="mr-1" /> Novo Plano</Button>
      </div>

      {planos.length === 0 ? (
        <Card><CardContent className="p-6 text-center text-muted-foreground">Nenhum plano VIP cadastrado</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {planos.map((p: any) => (
            <Card key={p.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: p.cor + "20" }}>
                    <Crown size={20} style={{ color: p.cor }} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{p.nome}</span>
                      <Badge variant={p.disponivel ? "default" : "secondary"} className="text-[10px]">
                        {p.disponivel ? "Ativo" : "Inativo"}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      R$ {Number(p.preco_mensal).toFixed(2)}/mês · {p.desconto_servicos_percentual}% desc · {p.cashback_bonus_percentual}% cashback
                    </p>
                  </div>
                </div>
                <div className="flex gap-1">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(p)}><Pencil size={14} /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(p.id)}><Trash2 size={14} /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editing ? "Editar" : "Novo"} Plano VIP</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Nome</Label><Input value={form.nome} onChange={e => setForm({...form, nome: e.target.value})} /></div>
            <div><Label>Descrição</Label><Input value={form.descricao} onChange={e => setForm({...form, descricao: e.target.value})} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Preço mensal (R$)</Label><Input type="number" value={form.preco_mensal} onChange={e => setForm({...form, preco_mensal: e.target.value})} /></div>
              <div><Label>Ordem</Label><Input type="number" value={form.ordem} onChange={e => setForm({...form, ordem: e.target.value})} /></div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Desconto serviços (%)</Label><Input type="number" value={form.desconto_servicos_percentual} onChange={e => setForm({...form, desconto_servicos_percentual: e.target.value})} /></div>
              <div><Label>Cashback bônus (%)</Label><Input type="number" value={form.cashback_bonus_percentual} onChange={e => setForm({...form, cashback_bonus_percentual: e.target.value})} /></div>
            </div>
            <div><Label>Cor (hex)</Label><Input value={form.cor} onChange={e => setForm({...form, cor: e.target.value})} /></div>
            <div><Label>Benefícios (JSON array)</Label><Input value={form.beneficios} onChange={e => setForm({...form, beneficios: e.target.value})} placeholder='["Benefício 1", "Benefício 2"]' /></div>
            <div className="flex items-center gap-3">
              <Switch checked={form.prioridade_agendamento} onCheckedChange={v => setForm({...form, prioridade_agendamento: v})} />
              <Label>Prioridade no agendamento</Label>
            </div>
            <div className="flex items-center gap-3">
              <Switch checked={form.disponivel} onCheckedChange={v => setForm({...form, disponivel: v})} />
              <Label>Disponível</Label>
            </div>
            <Button className="w-full" onClick={handleSave} disabled={saving || !form.nome || !form.preco_mensal}>
              {saving && <Loader2 size={14} className="animate-spin mr-2" />}
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PlanosVipTab;
