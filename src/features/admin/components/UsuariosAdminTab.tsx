import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Search, Shield, UserPlus, Trash2, User } from "lucide-react";
import { format } from "date-fns";
import { AdminCreateUser } from "./AdminCreateUser";

const ROLE_COLORS: Record<string, string> = {
  admin: "bg-red-500/10 text-red-600 border-red-200",
  terapeuta: "bg-blue-500/10 text-blue-600 border-blue-200",
  parceiro: "bg-emerald-500/10 text-emerald-600 border-emerald-200",
  user: "bg-muted text-muted-foreground border-border",
};

export const UsuariosAdminTab = () => {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [roleDialog, setRoleDialog] = useState(false);
  const [createDialog, setCreateDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [newRole, setNewRole] = useState<string>("user");

  const { data: profiles = [], isLoading } = useQuery({
    queryKey: ["admin-usuarios-profiles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("id, nome, telefone, created_at").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: allRoles = [] } = useQuery({
    queryKey: ["admin-all-user-roles"],
    queryFn: async () => {
      const { data, error } = await supabase.from("user_roles").select("user_id, role");
      if (error) throw error;
      return data;
    },
  });

  const roleMap = new Map<string, string[]>();
  (allRoles as any[]).forEach((r) => {
    const existing = roleMap.get(r.user_id) || [];
    existing.push(r.role);
    roleMap.set(r.user_id, existing);
  });

  const filtered = profiles.filter((p: any) => {
    if (!search) return true;
    const term = search.toLowerCase();
    const roles = roleMap.get(p.id) || [];
    return (p.nome || "").toLowerCase().includes(term) || (p.telefone || "").includes(term) || roles.some(r => r.includes(term));
  });

  const openAddRole = (user: any) => {
    setSelectedUser(user);
    setNewRole("user");
    setRoleDialog(true);
  };

  const addRole = async () => {
    if (!selectedUser || !newRole) return;
    try {
      const { error } = await supabase.from("user_roles").upsert(
        { user_id: selectedUser.id, role: newRole } as any,
        { onConflict: "user_id,role" }
      );
      if (error) throw error;
      toast.success(`Role "${newRole}" adicionada!`);
      queryClient.invalidateQueries({ queryKey: ["admin-all-user-roles"] });
      setRoleDialog(false);
    } catch (e: any) { toast.error(e.message); }
  };

  const removeRole = async (userId: string, role: string) => {
    if (role === "user") return toast.error("Não é possível remover a role básica 'user'");
    if (!confirm(`Remover role "${role}"?`)) return;
    try {
      const { error } = await supabase.from("user_roles").delete().eq("user_id", userId).eq("role", role as any);
      if (error) throw error;
      toast.success(`Role "${role}" removida!`);
      queryClient.invalidateQueries({ queryKey: ["admin-all-user-roles"] });
    } catch (e: any) { toast.error(e.message); }
  };

  const handleCreateSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["admin-usuarios-profiles"] });
    queryClient.invalidateQueries({ queryKey: ["admin-all-user-roles"] });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Gerenciamento de Usuários</h3>
          <p className="text-sm text-muted-foreground">{profiles.length} usuário(s) cadastrado(s)</p>
        </div>
        <Button size="sm" className="gap-2" onClick={() => setCreateDialog(true)}>
          <UserPlus className="w-4 h-4" />
          Novo Usuário
        </Button>
      </div>

      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar por nome, telefone ou role..." className="pl-9" />
      </div>

      {isLoading ? (
        <p className="text-center text-muted-foreground py-8">Carregando...</p>
      ) : (
        <div className="space-y-2">
          {filtered.map((p: any) => {
            const roles = roleMap.get(p.id) || ["user"];
            return (
              <Card key={p.id} className="p-3">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center shrink-0">
                      <User className="w-4 h-4 text-muted-foreground" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">{p.nome || "Sem nome"}</p>
                      <p className="text-xs text-muted-foreground">{p.telefone || "—"} · {format(new Date(p.created_at), "dd/MM/yyyy")}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 flex-wrap justify-end">
                    {roles.map(r => (
                      <Badge
                        key={r}
                        variant="outline"
                        className={`text-[10px] cursor-pointer ${ROLE_COLORS[r] || ""}`}
                        onClick={() => removeRole(p.id, r)}
                        title={r === "user" ? "Role básica" : `Clique para remover "${r}"`}
                      >
                        {r}
                        {r !== "user" && <Trash2 className="w-2.5 h-2.5 ml-1" />}
                      </Badge>
                    ))}
                    <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => openAddRole(p)} title="Adicionar role">
                      <UserPlus className="w-3.5 h-3.5" />
                    </Button>
                  </div>
                </div>
              </Card>
            );
          })}
          {filtered.length === 0 && <p className="text-center text-muted-foreground py-6">Nenhum usuário encontrado</p>}
        </div>
      )}

      {/* Modal: adicionar role a usuário existente */}
      <Dialog open={roleDialog} onOpenChange={setRoleDialog}>
        <DialogContent>
          <DialogHeader><DialogTitle>Adicionar Role — {selectedUser?.nome || "Usuário"}</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <div>
              <Label>Role</Label>
              <Select value={newRole} onValueChange={setNewRole}>
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">user</SelectItem>
                  <SelectItem value="admin">admin</SelectItem>
                  <SelectItem value="terapeuta">terapeuta</SelectItem>
                  <SelectItem value="parceiro">parceiro</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button onClick={addRole} className="w-full gap-2"><Shield className="w-4 h-4" />Adicionar Role</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Modal: criar novo usuário */}
      <AdminCreateUser
        open={createDialog}
        onOpenChange={setCreateDialog}
        onSuccess={handleCreateSuccess}
      />
    </div>
  );
};
