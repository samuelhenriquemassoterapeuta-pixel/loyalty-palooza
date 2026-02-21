import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Gift, Ban, Search, TrendingUp, Plus, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useAuth } from "@/contexts/AuthContext";

const ValesPresenteTab = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState({
    destinatario_nome: "",
    destinatario_email: "",
    valor: "",
    mensagem: "",
    tema: "classico",
    tipo: "monetario",
  });

  const { data: vales = [], isLoading } = useQuery({
    queryKey: ["admin-vales"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("vale_presentes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const cancelarVale = async (id: string) => {
    if (!confirm("Cancelar este vale presente?")) return;
    const { error } = await supabase
      .from("vale_presentes")
      .update({ status: "cancelado" } as any)
      .eq("id", id);
    if (error) {
      toast.error("Erro ao cancelar vale");
      return;
    }
    toast.success("Vale cancelado!");
    queryClient.invalidateQueries({ queryKey: ["admin-vales"] });
  };

  const criarValeAdmin = async () => {
    const valor = parseFloat(form.valor);
    if (!form.destinatario_nome.trim() || isNaN(valor) || valor <= 0) {
      toast.error("Preencha o nome e um valor válido");
      return;
    }
    setCreating(true);
    try {
      const { error } = await supabase
        .from("vale_presentes")
        .insert({
          comprador_id: user!.id,
          destinatario_nome: form.destinatario_nome.trim(),
          destinatario_email: form.destinatario_email.trim() || null,
          valor,
          mensagem: form.mensagem.trim() || null,
          tema: form.tema,
          tipo: form.tipo,
        } as any);
      if (error) throw error;
      toast.success("Vale presente gerado com sucesso! 🎁");
      queryClient.invalidateQueries({ queryKey: ["admin-vales"] });
      setForm({ destinatario_nome: "", destinatario_email: "", valor: "", mensagem: "", tema: "classico", tipo: "monetario" });
      setShowForm(false);
    } catch (err: any) {
      toast.error(err.message || "Erro ao gerar vale");
    } finally {
      setCreating(false);
    }
  };

  const filtered = vales.filter(
    (v: any) =>
      v.destinatario_nome?.toLowerCase().includes(search.toLowerCase()) ||
      v.codigo?.toLowerCase().includes(search.toLowerCase())
  );

  const totalAtivos = vales.filter((v: any) => v.status === "ativo").length;
  const totalUsados = vales.filter((v: any) => v.status === "usado").length;
  const totalExpirados = vales.filter((v: any) => v.status === "expirado").length;
  const valorTotal = vales.reduce((sum: number, v: any) => sum + Number(v.valor || 0), 0);
  const valorUsado = vales
    .filter((v: any) => v.status === "usado")
    .reduce((sum: number, v: any) => sum + Number(v.valor || 0), 0);

  const statusColor = (status: string) => {
    switch (status) {
      case "ativo": return "default";
      case "usado": return "secondary";
      case "expirado": return "outline";
      case "cancelado": return "destructive";
      default: return "outline";
    }
  };

  const statusLabel = (status: string) => {
    switch (status) {
      case "ativo": return "✨ Ativo";
      case "usado": return "✅ Usado";
      case "expirado": return "⏰ Expirado";
      case "cancelado": return "❌ Cancelado";
      default: return status;
    }
  };

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card className="shadow-card">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-primary">{totalAtivos}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Ativos</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-foreground">{totalUsados}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Usados</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-3 text-center">
            <p className="text-2xl font-bold text-muted-foreground">{totalExpirados}</p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">Expirados</p>
          </CardContent>
        </Card>
        <Card className="shadow-card">
          <CardContent className="p-3 text-center">
            <div className="flex items-center justify-center gap-1">
              <TrendingUp size={14} className="text-primary" />
              <p className="text-lg font-bold text-primary">
                R$ {valorUsado.toFixed(0)}
              </p>
            </div>
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              de R$ {valorTotal.toFixed(0)} resgatados
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Admin Create Button */}
      <Button
        onClick={() => setShowForm(!showForm)}
        variant={showForm ? "outline" : "default"}
        className="w-full gap-2"
      >
        {showForm ? <X size={16} /> : <Plus size={16} />}
        {showForm ? "Cancelar" : "Gerar Vale Presente (Admin)"}
      </Button>

      {/* Admin Create Form */}
      {showForm && (
        <Card className="shadow-card border-primary/20">
          <CardContent className="p-4 space-y-3">
            <p className="text-xs text-muted-foreground">
              Gere um vale presente sem necessidade de pagamento. O código será gerado automaticamente.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div className="space-y-1.5">
                <Label className="text-xs">Nome do destinatário *</Label>
                <Input
                  placeholder="Ex: Maria Silva"
                  value={form.destinatario_nome}
                  onChange={(e) => setForm((f) => ({ ...f, destinatario_nome: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Email (opcional)</Label>
                <Input
                  type="email"
                  placeholder="email@exemplo.com"
                  value={form.destinatario_email}
                  onChange={(e) => setForm((f) => ({ ...f, destinatario_email: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Valor (R$) *</Label>
                <Input
                  type="number"
                  min="1"
                  step="0.01"
                  placeholder="50.00"
                  value={form.valor}
                  onChange={(e) => setForm((f) => ({ ...f, valor: e.target.value }))}
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Tipo</Label>
                <Select value={form.tipo} onValueChange={(v) => setForm((f) => ({ ...f, tipo: v }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="monetario">💰 Monetário</SelectItem>
                    <SelectItem value="experiencia">🎯 Experiência</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs">Tema</Label>
                <Select value={form.tema} onValueChange={(v) => setForm((f) => ({ ...f, tema: v }))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classico">🎁 Clássico</SelectItem>
                    <SelectItem value="aniversario">🎂 Aniversário</SelectItem>
                    <SelectItem value="natal">🎄 Natal</SelectItem>
                    <SelectItem value="dia_das_maes">💐 Dia das Mães</SelectItem>
                    <SelectItem value="zen">🧘 Zen</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="space-y-1.5">
              <Label className="text-xs">Mensagem (opcional)</Label>
              <Textarea
                placeholder="Mensagem personalizada..."
                value={form.mensagem}
                onChange={(e) => setForm((f) => ({ ...f, mensagem: e.target.value }))}
                rows={2}
                maxLength={200}
              />
            </div>
            <Button
              onClick={criarValeAdmin}
              disabled={creating}
              className="w-full gap-2"
            >
              <Gift size={16} />
              {creating ? "Gerando..." : "Gerar Vale Presente"}
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar por nome ou código..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>

      {/* List */}
      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-12">
          <Gift className="w-10 h-10 text-muted-foreground/40 mx-auto mb-2" />
          <p className="text-muted-foreground text-sm">Nenhum vale presente encontrado</p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((vale: any) => (
            <Card key={vale.id} className="shadow-card">
              <CardContent className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <p className="font-semibold text-sm text-foreground truncate">
                        {vale.destinatario_nome}
                      </p>
                      <Badge variant={statusColor(vale.status) as any} className="text-[10px] shrink-0">
                        {statusLabel(vale.status)}
                      </Badge>
                      {vale.tipo === "experiencia" && (
                        <Badge variant="outline" className="text-[10px] shrink-0">
                          🎯 Experiência
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-3 text-xs text-muted-foreground">
                      <span className="font-mono font-semibold">{vale.codigo}</span>
                      <span>R$ {Number(vale.valor).toFixed(2).replace('.', ',')}</span>
                      <span>{format(new Date(vale.created_at), "dd/MM/yy", { locale: ptBR })}</span>
                    </div>
                    {vale.experiencia_nome && (
                      <p className="text-xs text-primary mt-1">{vale.experiencia_nome}</p>
                    )}
                    {vale.data_entrega_agendada && (
                      <p className="text-[10px] text-muted-foreground mt-0.5">
                        📅 Entrega agendada: {format(new Date(vale.data_entrega_agendada + "T12:00:00"), "dd/MM/yyyy", { locale: ptBR })}
                      </p>
                    )}
                  </div>
                  {vale.status === "ativo" && (
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 px-2 text-destructive hover:text-destructive"
                      onClick={() => cancelarVale(vale.id)}
                    >
                      <Ban size={14} />
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default ValesPresenteTab;
