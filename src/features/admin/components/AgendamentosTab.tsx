import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CalendarDays, Edit2, Search, Filter, Check, X, Clock, RefreshCw } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { ButtonLoader } from "@/components/LoadingSpinner";
import { Skeleton } from "@/components/ui/skeleton";

interface Agendamento {
  id: string;
  user_id: string;
  data_hora: string;
  servico: string;
  status: string;
  observacoes: string | null;
  terapeuta_id: string | null;
  created_at: string;
  profiles?: { nome: string | null } | null;
  terapeutas?: { nome: string; especialidade: string | null } | null;
}

const statusColors: Record<string, string> = {
  agendado: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
  concluido: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  realizado: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300",
  cancelado: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300",
  remarcado: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300",
};

const statusOptions = [
  { value: "agendado", label: "Agendado" },
  { value: "concluido", label: "Concluído" },
  { value: "realizado", label: "Realizado" },
  { value: "cancelado", label: "Cancelado" },
  { value: "remarcado", label: "Remarcado" },
];

export const AgendamentosTab = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState<string>("todos");
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<Agendamento | null>(null);
  const [editForm, setEditForm] = useState({
    status: "",
    servico: "",
    data_hora: "",
    observacoes: "",
    terapeuta_id: "",
  });
  const [saving, setSaving] = useState(false);

  const { data: agendamentos = [], isLoading } = useQuery({
    queryKey: ["admin-agendamentos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("agendamentos")
        .select(`*, terapeutas(nome, especialidade)`)
        .order("data_hora", { ascending: false });
      if (error) throw error;

      // Fetch profile names for all unique user_ids
      const userIds = [...new Set((data || []).map((a) => a.user_id))];
      const { data: profiles } = await supabase
        .from("profiles")
        .select("id, nome")
        .in("id", userIds);
      const profileMap = new Map((profiles || []).map((p) => [p.id, p.nome]));

      return (data || []).map((a) => ({
        ...a,
        profiles: { nome: profileMap.get(a.user_id) || null },
      })) as Agendamento[];
    },
  });

  const { data: terapeutas = [] } = useQuery({
    queryKey: ["admin-terapeutas-list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("terapeutas").select("id, nome").order("nome");
      if (error) throw error;
      return data;
    },
  });

  const { data: servicos = [] } = useQuery({
    queryKey: ["admin-servicos-list"],
    queryFn: async () => {
      const { data, error } = await supabase.from("servicos").select("nome").eq("disponivel", true).order("nome");
      if (error) throw error;
      return data;
    },
  });

  const filtered = agendamentos.filter((a) => {
    const matchesSearch =
      !search ||
      a.servico.toLowerCase().includes(search.toLowerCase()) ||
      a.profiles?.nome?.toLowerCase().includes(search.toLowerCase()) ||
      a.terapeutas?.nome?.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "todos" || a.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const openEdit = (item: Agendamento) => {
    setEditingItem(item);
    const dt = new Date(item.data_hora);
    setEditForm({
      status: item.status,
      servico: item.servico,
      data_hora: format(dt, "yyyy-MM-dd'T'HH:mm"),
      observacoes: item.observacoes || "",
      terapeuta_id: item.terapeuta_id || "",
    });
    setEditDialogOpen(true);
  };

  const handleSave = async () => {
    if (!editingItem) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("agendamentos")
        .update({
          status: editForm.status,
          servico: editForm.servico,
          data_hora: new Date(editForm.data_hora).toISOString(),
          observacoes: editForm.observacoes || null,
          terapeuta_id: editForm.terapeuta_id || null,
        })
        .eq("id", editingItem.id);
      if (error) throw error;
      toast.success("Agendamento atualizado com sucesso!");
      queryClient.invalidateQueries({ queryKey: ["admin-agendamentos"] });
      setEditDialogOpen(false);
    } catch (err: any) {
      toast.error(err.message || "Erro ao atualizar agendamento");
    }
    setSaving(false);
  };

  const quickStatusChange = async (id: string, newStatus: string) => {
    try {
      const { error } = await supabase.from("agendamentos").update({ status: newStatus }).eq("id", id);
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ["admin-agendamentos"] });
      toast.success(`Status atualizado para ${newStatus}`);
    } catch {
      toast.error("Erro ao atualizar status");
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <Skeleton key={i} className="h-24 w-full rounded-xl" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Buscar por cliente, serviço ou terapeuta..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={filterStatus} onValueChange={setFilterStatus}>
          <SelectTrigger className="w-full sm:w-[160px]">
            <Filter size={14} className="mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            {statusOptions.map((s) => (
              <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <p className="text-sm text-muted-foreground">{filtered.length} agendamento(s)</p>

      <div className="space-y-3">
        {filtered.map((a) => (
          <Card key={a.id} className="overflow-hidden">
            <CardContent className="p-4">
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-semibold text-sm text-foreground">{a.servico}</span>
                    <Badge variant="outline" className={`text-[10px] ${statusColors[a.status] || ""}`}>
                      {a.status}
                    </Badge>
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                    <CalendarDays size={12} />
                    {format(new Date(a.data_hora), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Cliente: <span className="text-foreground">{a.profiles?.nome || "—"}</span>
                  </p>
                  {a.terapeutas && (
                    <p className="text-xs text-muted-foreground">
                      Terapeuta: <span className="text-foreground">{a.terapeutas.nome}</span>
                    </p>
                  )}
                  {a.observacoes && (
                    <p className="text-xs text-muted-foreground italic truncate">{a.observacoes}</p>
                  )}
                </div>
                <div className="flex flex-col gap-1.5">
                  <Button size="sm" variant="outline" className="h-8 text-xs gap-1" onClick={() => openEdit(a)}>
                    <Edit2 size={12} /> Editar
                  </Button>
                  {a.status === "agendado" && (
                    <>
                      <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1 text-green-600" onClick={() => quickStatusChange(a.id, "concluido")}>
                        <Check size={10} /> Concluir
                      </Button>
                      <Button size="sm" variant="outline" className="h-7 text-[10px] gap-1 text-red-600" onClick={() => quickStatusChange(a.id, "cancelado")}>
                        <X size={10} /> Cancelar
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
        {filtered.length === 0 && (
          <div className="text-center py-12 text-muted-foreground">
            <CalendarDays className="mx-auto mb-3 opacity-30" size={40} />
            <p>Nenhum agendamento encontrado</p>
          </div>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>Editar Agendamento</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Status</Label>
              <Select value={editForm.status} onValueChange={(v) => setEditForm({ ...editForm, status: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {statusOptions.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Serviço</Label>
              <Select value={editForm.servico} onValueChange={(v) => setEditForm({ ...editForm, servico: v })}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  {servicos.map((s) => (
                    <SelectItem key={s.nome} value={s.nome}>{s.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Data e hora</Label>
              <Input
                type="datetime-local"
                value={editForm.data_hora}
                onChange={(e) => setEditForm({ ...editForm, data_hora: e.target.value })}
              />
            </div>

            <div className="space-y-2">
              <Label>Terapeuta</Label>
              <Select value={editForm.terapeuta_id} onValueChange={(v) => setEditForm({ ...editForm, terapeuta_id: v })}>
                <SelectTrigger><SelectValue placeholder="Sem terapeuta" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="">Sem terapeuta</SelectItem>
                  {terapeutas.map((t) => (
                    <SelectItem key={t.id} value={t.id}>{t.nome}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Observações</Label>
              <Textarea
                value={editForm.observacoes}
                onChange={(e) => setEditForm({ ...editForm, observacoes: e.target.value })}
                placeholder="Observações..."
                rows={3}
              />
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setEditDialogOpen(false)}>Cancelar</Button>
              <Button className="flex-1" onClick={handleSave} disabled={saving}>
                {saving ? <ButtonLoader /> : "Salvar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
