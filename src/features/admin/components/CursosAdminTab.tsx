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
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Plus, Pencil, Trash2, ChevronDown, GraduationCap, BookOpen } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

export const CursosAdminTab = () => {
  const queryClient = useQueryClient();
  const [moduloDialog, setModuloDialog] = useState(false);
  const [aulaDialog, setAulaDialog] = useState(false);
  const [editingModulo, setEditingModulo] = useState<any>(null);
  const [editingAula, setEditingAula] = useState<any>(null);
  const [moduloForm, setModuloForm] = useState<any>({});
  const [aulaForm, setAulaForm] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [openModulos, setOpenModulos] = useState<Set<string>>(new Set());

  const { data: modulos = [], isLoading: loadingModulos } = useQuery({
    queryKey: ["admin-curso-modulos"],
    queryFn: async () => {
      const { data, error } = await supabase.from("curso_modulos").select("*").order("ordem");
      if (error) throw error;
      return data;
    },
  });

  const { data: aulas = [], isLoading: loadingAulas } = useQuery({
    queryKey: ["admin-curso-aulas"],
    queryFn: async () => {
      const { data, error } = await supabase.from("curso_aulas").select("*").order("ordem");
      if (error) throw error;
      return data;
    },
  });

  const toggleModulo = (id: string) => {
    setOpenModulos(prev => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  // Módulo CRUD
  const openCreateModulo = () => {
    setEditingModulo(null);
    setModuloForm({ titulo: "", descricao: "", icone: "📚", cor: "#6366f1", ordem: modulos.length + 1, ativo: true });
    setModuloDialog(true);
  };

  const openEditModulo = (m: any) => {
    setEditingModulo(m);
    setModuloForm({ ...m });
    setModuloDialog(true);
  };

  const saveModulo = async () => {
    setSaving(true);
    try {
      const payload = { titulo: moduloForm.titulo, descricao: moduloForm.descricao || null, icone: moduloForm.icone || null, cor: moduloForm.cor || null, ordem: parseInt(moduloForm.ordem) || 0, ativo: moduloForm.ativo };
      if (editingModulo) {
        const { error } = await supabase.from("curso_modulos").update(payload).eq("id", editingModulo.id);
        if (error) throw error;
        toast.success("Módulo atualizado!");
      } else {
        const { error } = await supabase.from("curso_modulos").insert(payload);
        if (error) throw error;
        toast.success("Módulo criado!");
      }
      queryClient.invalidateQueries({ queryKey: ["admin-curso-modulos"] });
      setModuloDialog(false);
    } catch (e: any) { toast.error(e.message); }
    setSaving(false);
  };

  const deleteModulo = async (id: string) => {
    if (!confirm("Excluir módulo e todas suas aulas?")) return;
    const { error } = await supabase.from("curso_modulos").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Módulo excluído!"); queryClient.invalidateQueries({ queryKey: ["admin-curso-modulos"] }); queryClient.invalidateQueries({ queryKey: ["admin-curso-aulas"] }); }
  };

  // Aula CRUD
  const openCreateAula = (moduloId: string) => {
    const moduloAulas = aulas.filter((a: any) => a.modulo_id === moduloId);
    setEditingAula(null);
    setAulaForm({ modulo_id: moduloId, titulo: "", descricao: "", conteudo: "", video_url: "", duracao_minutos: 0, ordem: moduloAulas.length + 1, ativo: true });
    setAulaDialog(true);
  };

  const openEditAula = (a: any) => {
    setEditingAula(a);
    setAulaForm({ ...a });
    setAulaDialog(true);
  };

  const saveAula = async () => {
    setSaving(true);
    try {
      const payload = { modulo_id: aulaForm.modulo_id, titulo: aulaForm.titulo, descricao: aulaForm.descricao || null, conteudo: aulaForm.conteudo, video_url: aulaForm.video_url || null, duracao_minutos: parseInt(aulaForm.duracao_minutos) || null, ordem: parseInt(aulaForm.ordem) || 0, ativo: aulaForm.ativo };
      if (editingAula) {
        const { error } = await supabase.from("curso_aulas").update(payload).eq("id", editingAula.id);
        if (error) throw error;
        toast.success("Aula atualizada!");
      } else {
        const { error } = await supabase.from("curso_aulas").insert(payload);
        if (error) throw error;
        toast.success("Aula criada!");
      }
      queryClient.invalidateQueries({ queryKey: ["admin-curso-aulas"] });
      setAulaDialog(false);
    } catch (e: any) { toast.error(e.message); }
    setSaving(false);
  };

  const deleteAula = async (id: string) => {
    if (!confirm("Excluir aula?")) return;
    const { error } = await supabase.from("curso_aulas").delete().eq("id", id);
    if (error) toast.error(error.message);
    else { toast.success("Aula excluída!"); queryClient.invalidateQueries({ queryKey: ["admin-curso-aulas"] }); }
  };

  if (loadingModulos || loadingAulas) return <LoadingSpinner />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Cursos — Módulos & Aulas</h3>
          <p className="text-sm text-muted-foreground">{modulos.length} módulo(s) · {aulas.length} aula(s)</p>
        </div>
        <Button size="sm" onClick={openCreateModulo}><Plus className="w-4 h-4 mr-1" />Novo Módulo</Button>
      </div>

      {modulos.length === 0 ? (
        <p className="text-center text-muted-foreground py-8">Nenhum módulo cadastrado</p>
      ) : (
        <div className="space-y-3">
          {modulos.map((m: any) => {
            const moduloAulas = aulas.filter((a: any) => a.modulo_id === m.id);
            return (
              <Collapsible key={m.id} open={openModulos.has(m.id)} onOpenChange={() => toggleModulo(m.id)}>
                <Card className="overflow-hidden">
                  <div className="p-4">
                    <div className="flex items-center justify-between gap-3">
                      <CollapsibleTrigger className="flex items-center gap-2 flex-1 min-w-0 text-left">
                        <ChevronDown className={`w-4 h-4 shrink-0 transition-transform ${openModulos.has(m.id) ? "rotate-0" : "-rotate-90"}`} />
                        <span className="text-lg">{m.icone || "📚"}</span>
                        <div className="min-w-0">
                          <h4 className="font-semibold text-sm truncate">{m.titulo}</h4>
                          <p className="text-xs text-muted-foreground">Ordem: {m.ordem} · {moduloAulas.length} aula(s)</p>
                        </div>
                      </CollapsibleTrigger>
                      <div className="flex items-center gap-1">
                        {!m.ativo && <Badge variant="secondary" className="text-[10px]">Inativo</Badge>}
                        <Button size="icon" variant="ghost" onClick={() => openEditModulo(m)}><Pencil className="w-4 h-4" /></Button>
                        <Button size="icon" variant="ghost" onClick={() => deleteModulo(m.id)}><Trash2 className="w-4 h-4 text-destructive" /></Button>
                      </div>
                    </div>
                  </div>
                  <CollapsibleContent>
                    <div className="border-t border-border px-4 pb-4 pt-3 space-y-2">
                      <div className="flex justify-end">
                        <Button size="sm" variant="outline" onClick={() => openCreateAula(m.id)}><Plus className="w-3 h-3 mr-1" />Nova Aula</Button>
                      </div>
                      {moduloAulas.length === 0 ? (
                        <p className="text-xs text-muted-foreground text-center py-3">Nenhuma aula neste módulo</p>
                      ) : (
                        moduloAulas.map((a: any) => (
                          <div key={a.id} className="flex items-center justify-between gap-2 p-2 rounded-lg bg-muted/50">
                            <div className="min-w-0 flex-1">
                              <p className="text-sm font-medium truncate">{a.titulo}</p>
                              <p className="text-xs text-muted-foreground">Ordem: {a.ordem} {a.duracao_minutos ? `· ${a.duracao_minutos}min` : ""}</p>
                            </div>
                            <div className="flex items-center gap-1">
                              {!a.ativo && <Badge variant="secondary" className="text-[9px]">Inativo</Badge>}
                              <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openEditAula(a)}><Pencil className="w-3 h-3" /></Button>
                              <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => deleteAula(a.id)}><Trash2 className="w-3 h-3 text-destructive" /></Button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </CollapsibleContent>
                </Card>
              </Collapsible>
            );
          })}
        </div>
      )}

      {/* Módulo Dialog */}
      <Dialog open={moduloDialog} onOpenChange={setModuloDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>{editingModulo ? "Editar" : "Novo"} Módulo</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Título</Label><Input value={moduloForm.titulo || ""} onChange={e => setModuloForm({ ...moduloForm, titulo: e.target.value })} /></div>
            <div><Label>Descrição</Label><Textarea value={moduloForm.descricao || ""} onChange={e => setModuloForm({ ...moduloForm, descricao: e.target.value })} rows={2} /></div>
            <div className="grid grid-cols-3 gap-3">
              <div><Label>Ícone</Label><Input value={moduloForm.icone || ""} onChange={e => setModuloForm({ ...moduloForm, icone: e.target.value })} /></div>
              <div><Label>Cor</Label><Input type="color" value={moduloForm.cor || "#6366f1"} onChange={e => setModuloForm({ ...moduloForm, cor: e.target.value })} /></div>
              <div><Label>Ordem</Label><Input type="number" value={moduloForm.ordem || ""} onChange={e => setModuloForm({ ...moduloForm, ordem: e.target.value })} /></div>
            </div>
            <div className="flex items-center gap-2"><Switch checked={moduloForm.ativo ?? true} onCheckedChange={v => setModuloForm({ ...moduloForm, ativo: v })} /><Label>Ativo</Label></div>
            <Button onClick={saveModulo} disabled={saving || !moduloForm.titulo} className="w-full">{saving ? "Salvando..." : "Salvar"}</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Aula Dialog */}
      <Dialog open={aulaDialog} onOpenChange={setAulaDialog}>
        <DialogContent className="max-h-[85vh] overflow-y-auto">
          <DialogHeader><DialogTitle>{editingAula ? "Editar" : "Nova"} Aula</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div><Label>Título</Label><Input value={aulaForm.titulo || ""} onChange={e => setAulaForm({ ...aulaForm, titulo: e.target.value })} /></div>
            <div><Label>Descrição</Label><Textarea value={aulaForm.descricao || ""} onChange={e => setAulaForm({ ...aulaForm, descricao: e.target.value })} rows={2} /></div>
            <div><Label>Conteúdo (HTML)</Label><Textarea value={aulaForm.conteudo || ""} onChange={e => setAulaForm({ ...aulaForm, conteudo: e.target.value })} rows={6} /></div>
            <AdminImageUpload label="Vídeo da Aula" value={aulaForm.video_url || ""} onChange={v => setAulaForm({ ...aulaForm, video_url: v })} accept="video/mp4,video/webm,video/*" hint="Upload de vídeo ou cole uma URL" />
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Duração (min)</Label><Input type="number" value={aulaForm.duracao_minutos || ""} onChange={e => setAulaForm({ ...aulaForm, duracao_minutos: e.target.value })} /></div>
              <div><Label>Ordem</Label><Input type="number" value={aulaForm.ordem || ""} onChange={e => setAulaForm({ ...aulaForm, ordem: e.target.value })} /></div>
            </div>
            <div className="flex items-center gap-2"><Switch checked={aulaForm.ativo ?? true} onCheckedChange={v => setAulaForm({ ...aulaForm, ativo: v })} /><Label>Ativa</Label></div>
            <Button onClick={saveAula} disabled={saving || !aulaForm.titulo || !aulaForm.conteudo} className="w-full">{saving ? "Salvando..." : "Salvar"}</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
