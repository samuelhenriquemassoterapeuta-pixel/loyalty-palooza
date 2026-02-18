import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Search, FileText, Eye, Trash2, CheckCircle2, Edit3, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";

const statusConfig: Record<string, { label: string; color: string }> = {
  rascunho: { label: "Rascunho", color: "bg-muted text-muted-foreground" },
  pendente: { label: "Pendente", color: "bg-accent/20 text-accent-foreground" },
  concluida: { label: "Concluída", color: "bg-primary/20 text-primary" },
};

export default function AnamneseAdminTab() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedFicha, setSelectedFicha] = useState<any>(null);
  const [editDialog, setEditDialog] = useState(false);
  const [editForm, setEditForm] = useState<any>({});

  const { data: fichas = [], isLoading } = useQuery({
    queryKey: ["admin-fichas-anamnese"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fichas_anamnese")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: profiles = [] } = useQuery({
    queryKey: ["admin-profiles-names"],
    queryFn: async () => {
      const { data } = await supabase.from("profiles").select("id, nome");
      return data || [];
    },
  });

  const getProfileName = (userId: string) => {
    const p = profiles.find((pr: any) => pr.id === userId);
    return p?.nome || "—";
  };

  const filtered = fichas.filter((f: any) => {
    const matchSearch =
      f.nome_completo?.toLowerCase().includes(search.toLowerCase()) ||
      f.servico_nome?.toLowerCase().includes(search.toLowerCase()) ||
      getProfileName(f.user_id).toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === "all" || f.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const handleEdit = (ficha: any) => {
    setSelectedFicha(ficha);
    setEditForm({
      status: ficha.status,
      observacoes_gerais: ficha.observacoes_gerais || "",
      queixa_principal: ficha.queixa_principal || "",
    });
    setEditDialog(true);
  };

  const handleSaveEdit = async () => {
    if (!selectedFicha) return;
    const { error } = await supabase
      .from("fichas_anamnese")
      .update(editForm)
      .eq("id", selectedFicha.id);
    if (error) {
      toast.error("Erro ao atualizar ficha");
    } else {
      toast.success("Ficha atualizada!");
      queryClient.invalidateQueries({ queryKey: ["admin-fichas-anamnese"] });
      setEditDialog(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Excluir esta ficha de anamnese?")) return;
    const { error } = await supabase.from("fichas_anamnese").delete().eq("id", id);
    if (error) {
      toast.error("Erro ao excluir");
    } else {
      toast.success("Ficha excluída!");
      queryClient.invalidateQueries({ queryKey: ["admin-fichas-anamnese"] });
    }
  };

  const handleStatusChange = async (id: string, status: string) => {
    const { error } = await supabase.from("fichas_anamnese").update({ status }).eq("id", id);
    if (error) {
      toast.error("Erro ao atualizar status");
    } else {
      toast.success("Status atualizado!");
      queryClient.invalidateQueries({ queryKey: ["admin-fichas-anamnese"] });
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome, terapia ou usuário..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-40">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos</SelectItem>
            <SelectItem value="rascunho">Rascunho</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="concluida">Concluída</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="text-xs text-muted-foreground">
        {filtered.length} ficha(s) encontrada(s)
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <FileText className="mx-auto h-12 w-12 text-muted-foreground/30 mb-3" />
          <p className="text-sm text-muted-foreground">Nenhuma ficha encontrada</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((ficha: any) => {
            const st = statusConfig[ficha.status] || statusConfig.rascunho;
            return (
              <div
                key={ficha.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-card border border-border hover:border-primary/20 transition-all"
              >
                <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText size={16} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{ficha.nome_completo}</p>
                  <p className="text-xs text-muted-foreground">
                    {ficha.servico_nome} • {getProfileName(ficha.user_id)} • {format(new Date(ficha.created_at), "dd/MM/yy", { locale: ptBR })}
                  </p>
                </div>
                <Select
                  value={ficha.status}
                  onValueChange={(v) => handleStatusChange(ficha.id, v)}
                >
                  <SelectTrigger className="w-28 h-8 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rascunho">Rascunho</SelectItem>
                    <SelectItem value="pendente">Pendente</SelectItem>
                    <SelectItem value="concluida">Concluída</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="ghost" size="icon" onClick={() => handleEdit(ficha)}>
                  <Edit3 size={14} />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleDelete(ficha.id)}>
                  <Trash2 size={14} className="text-destructive" />
                </Button>
              </div>
            );
          })}
        </div>
      )}

      {/* Edit Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Ficha — {selectedFicha?.nome_completo}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label className="text-xs">Status</Label>
              <Select value={editForm.status} onValueChange={(v) => setEditForm((p: any) => ({ ...p, status: v }))}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="rascunho">Rascunho</SelectItem>
                  <SelectItem value="pendente">Pendente</SelectItem>
                  <SelectItem value="concluida">Concluída</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-xs">Queixa principal</Label>
              <Textarea
                value={editForm.queixa_principal}
                onChange={(e) => setEditForm((p: any) => ({ ...p, queixa_principal: e.target.value }))}
                rows={3}
              />
            </div>
            <div>
              <Label className="text-xs">Observações gerais</Label>
              <Textarea
                value={editForm.observacoes_gerais}
                onChange={(e) => setEditForm((p: any) => ({ ...p, observacoes_gerais: e.target.value }))}
                rows={3}
              />
            </div>
            <Button onClick={handleSaveEdit} className="w-full">Salvar alterações</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
