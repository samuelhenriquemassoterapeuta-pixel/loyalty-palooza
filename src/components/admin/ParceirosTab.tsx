import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Trash2, Edit2, CheckCircle2, XCircle, Users, DollarSign, Ticket } from "lucide-react";
import { format } from "date-fns";

const ParceirosTab = () => {
  const queryClient = useQueryClient();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [form, setForm] = useState({
    user_email: "", nome_empresa: "", slug: "", segmento: "saude",
    descricao: "", site_url: "", instagram: "", telefone: "", email_comercial: "",
  });

  const { data: parceiros = [], isLoading } = useQuery({
    queryKey: ["admin-parceiros"],
    queryFn: async () => {
      const { data, error } = await supabase.from("parceiros").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const criarParceiro = useMutation({
    mutationFn: async () => {
      // Find user by email via edge function
      const { data: userResult, error: searchError } = await supabase.functions.invoke("buscar-usuario", {
        body: { email: form.user_email },
      });

      if (searchError || !userResult?.user?.id) {
        throw new Error("Usuário não encontrado com esse email. O usuário precisa ter uma conta criada primeiro.");
      }

      const userId = userResult.user.id;

      // Add 'parceiro' role
      await supabase.from("user_roles").upsert(
        { user_id: userId, role: "parceiro" } as any,
        { onConflict: "user_id,role" }
      );

      // Create partner record
      const { error } = await supabase.from("parceiros").insert({
        user_id: userId,
        nome_empresa: form.nome_empresa,
        slug: form.slug.toLowerCase().replace(/[^a-z0-9-]/g, "-"),
        segmento: form.segmento,
        descricao: form.descricao || null,
        site_url: form.site_url || null,
        instagram: form.instagram || null,
        telefone: form.telefone || null,
        email_comercial: form.email_comercial || null,
      } as any);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-parceiros"] });
      toast.success("Parceiro cadastrado com sucesso!");
      setDialogOpen(false);
      resetForm();
    },
    onError: (err: any) => toast.error(err.message),
  });

  const toggleVerificado = useMutation({
    mutationFn: async ({ id, verificado }: { id: string; verificado: boolean }) => {
      const { error } = await supabase.from("parceiros").update({ verificado: !verificado } as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-parceiros"] }),
  });

  const toggleAtivo = useMutation({
    mutationFn: async ({ id, ativo }: { id: string; ativo: boolean }) => {
      const { error } = await supabase.from("parceiros").update({ ativo: !ativo } as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["admin-parceiros"] }),
  });

  const deletarParceiro = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("parceiros").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-parceiros"] });
      toast.success("Parceiro removido");
    },
  });

  const resetForm = () => {
    setForm({ user_email: "", nome_empresa: "", slug: "", segmento: "saude", descricao: "", site_url: "", instagram: "", telefone: "", email_comercial: "" });
    setEditingId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Parceiros</h3>
          <p className="text-sm text-muted-foreground">{parceiros.length} parceiro(s) cadastrado(s)</p>
        </div>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button size="sm" className="gap-1"><Plus className="w-4 h-4" />Novo Parceiro</Button>
          </DialogTrigger>
          <DialogContent className="max-h-[90vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>Cadastrar Parceiro</DialogTitle>
            </DialogHeader>
            <div className="space-y-3">
              <div>
                <Label className="text-xs">Email do Usuário *</Label>
                <Input value={form.user_email} onChange={(e) => setForm(p => ({ ...p, user_email: e.target.value }))} placeholder="parceiro@email.com" />
                <p className="text-[10px] text-muted-foreground mt-0.5">O usuário precisa ter uma conta criada</p>
              </div>
              <div>
                <Label className="text-xs">Nome da Empresa *</Label>
                <Input value={form.nome_empresa} onChange={(e) => setForm(p => ({ ...p, nome_empresa: e.target.value }))} placeholder="Nome do parceiro" />
              </div>
              <div>
                <Label className="text-xs">Slug (URL) *</Label>
                <Input value={form.slug} onChange={(e) => setForm(p => ({ ...p, slug: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-") }))} placeholder="nome-do-parceiro" />
              </div>
              <div>
                <Label className="text-xs">Segmento</Label>
                <Select value={form.segmento} onValueChange={(v) => setForm(p => ({ ...p, segmento: v }))}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="saude">Saúde</SelectItem>
                    <SelectItem value="estetica">Estética</SelectItem>
                    <SelectItem value="fitness">Fitness</SelectItem>
                    <SelectItem value="nutricao">Nutrição</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Descrição</Label>
                <Textarea value={form.descricao} onChange={(e) => setForm(p => ({ ...p, descricao: e.target.value }))} rows={2} />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Site</Label>
                  <Input value={form.site_url} onChange={(e) => setForm(p => ({ ...p, site_url: e.target.value }))} placeholder="https://..." />
                </div>
                <div>
                  <Label className="text-xs">Instagram</Label>
                  <Input value={form.instagram} onChange={(e) => setForm(p => ({ ...p, instagram: e.target.value }))} placeholder="@perfil" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="text-xs">Telefone</Label>
                  <Input value={form.telefone} onChange={(e) => setForm(p => ({ ...p, telefone: e.target.value }))} />
                </div>
                <div>
                  <Label className="text-xs">Email Comercial</Label>
                  <Input value={form.email_comercial} onChange={(e) => setForm(p => ({ ...p, email_comercial: e.target.value }))} />
                </div>
              </div>
              <Button onClick={() => criarParceiro.mutate()} disabled={criarParceiro.isPending || !form.user_email || !form.nome_empresa || !form.slug} className="w-full">
                {criarParceiro.isPending ? "Cadastrando..." : "Cadastrar Parceiro"}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {parceiros.map((p: any) => (
        <Card key={p.id} className={`border-border/50 ${!p.ativo ? "opacity-60" : ""}`}>
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground">{p.nome_empresa}</h4>
                  {p.verificado ? (
                    <Badge variant="default" className="text-[9px]">✓ Verificado</Badge>
                  ) : (
                    <Badge variant="outline" className="text-[9px]">Não verificado</Badge>
                  )}
                  <Badge variant="secondary" className="text-[9px] capitalize">{p.faixa_comissao_atual}</Badge>
                </div>
                <p className="text-xs text-muted-foreground capitalize">{p.segmento} • /{p.slug}</p>
                <p className="text-xs text-muted-foreground mt-1">
                  Vendas: R$ {Number(p.total_vendas_acumulado).toFixed(2).replace(".", ",")} •
                  Desde {format(new Date(p.created_at), "dd/MM/yyyy")}
                </p>
              </div>
              <div className="flex items-center gap-1">
                <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => toggleVerificado.mutate({ id: p.id, verificado: p.verificado })} title={p.verificado ? "Remover verificação" : "Verificar"}>
                  {p.verificado ? <CheckCircle2 className="w-4 h-4 text-emerald-500" /> : <XCircle className="w-4 h-4 text-muted-foreground" />}
                </Button>
                <div className="flex items-center gap-1">
                  <Switch checked={p.ativo} onCheckedChange={() => toggleAtivo.mutate({ id: p.id, ativo: p.ativo })} />
                </div>
                <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => { if (confirm("Excluir parceiro?")) deletarParceiro.mutate(p.id); }}>
                  <Trash2 className="w-3.5 h-3.5" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}

      {parceiros.length === 0 && !isLoading && (
        <Card className="border-dashed">
          <CardContent className="p-8 text-center">
            <Users className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">Nenhum parceiro cadastrado</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ParceirosTab;
