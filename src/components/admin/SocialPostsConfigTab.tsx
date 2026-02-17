import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Pencil, DollarSign, Zap } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const SocialPostsConfigTab = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<any>(null);
  const [form, setForm] = useState<any>({});
  const [saving, setSaving] = useState(false);

  const { data: configs = [], isLoading } = useQuery({
    queryKey: ["admin-social-posts-config"],
    queryFn: async () => {
      const { data, error } = await supabase.from("social_posts_config").select("*").order("cashback_valor");
      if (error) throw error;
      return data;
    },
  });

  const openEdit = (item: any) => {
    setEditing(item);
    setForm({ ...item });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    try {
      const payload = {
        cashback_valor: parseFloat(form.cashback_valor),
        xp_valor: parseInt(form.xp_valor),
        label: form.label,
        descricao: form.descricao || null,
        icone: form.icone,
        ativo: form.ativo,
      };
      const { error } = await supabase.from("social_posts_config").update(payload).eq("id", editing.id);
      if (error) throw error;
      toast.success("Configuração atualizada!");
      queryClient.invalidateQueries({ queryKey: ["admin-social-posts-config"] });
      setDialogOpen(false);
    } catch (e: any) { toast.error(e.message); }
    setSaving(false);
  };

  if (isLoading) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Config Recompensas — Resinkra Moments</h3>
        <p className="text-sm text-muted-foreground">Defina cashback e XP por tipo de post</p>
      </div>

      <div className="space-y-3">
        {configs.map((c: any) => (
          <Card key={c.id} className={`p-4 ${!c.ativo ? "opacity-60" : ""}`}>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{c.icone === "Instagram" ? "📸" : c.icone === "Image" ? "🖼️" : c.icone === "Video" ? "🎬" : c.icone}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-semibold text-sm">{c.label}</h4>
                    <Badge variant="outline" className="text-[10px]">{c.tipo_post}</Badge>
                    {!c.ativo && <Badge variant="secondary" className="text-[10px]">Inativo</Badge>}
                  </div>
                  <p className="text-xs text-muted-foreground">{c.descricao}</p>
                  <div className="flex items-center gap-3 mt-1">
                    <span className="text-xs flex items-center gap-1"><DollarSign className="w-3 h-3 text-emerald-500" />ℜ {c.cashback_valor}</span>
                    <span className="text-xs flex items-center gap-1"><Zap className="w-3 h-3 text-amber-500" />{c.xp_valor} XP</span>
                  </div>
                </div>
              </div>
              <Button size="icon" variant="ghost" onClick={() => openEdit(c)}><Pencil className="w-4 h-4" /></Button>
            </div>
          </Card>
        ))}
      </div>

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Editar Recompensa — {form.label}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Label</Label><Input value={form.label || ""} onChange={e => setForm({ ...form, label: e.target.value })} /></div>
            <div><Label>Descrição</Label><Input value={form.descricao || ""} onChange={e => setForm({ ...form, descricao: e.target.value })} /></div>
            <div><Label>Ícone</Label><Input value={form.icone || ""} onChange={e => setForm({ ...form, icone: e.target.value })} /></div>
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Cashback (ℜ)</Label><Input type="number" step="0.5" value={form.cashback_valor || ""} onChange={e => setForm({ ...form, cashback_valor: e.target.value })} /></div>
              <div><Label>XP</Label><Input type="number" value={form.xp_valor || ""} onChange={e => setForm({ ...form, xp_valor: e.target.value })} /></div>
            </div>
            <div className="flex items-center gap-2"><Switch checked={form.ativo ?? true} onCheckedChange={v => setForm({ ...form, ativo: v })} /><Label>Ativo</Label></div>
            <Button onClick={handleSave} disabled={saving} className="w-full">{saving ? "Salvando..." : "Salvar"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
