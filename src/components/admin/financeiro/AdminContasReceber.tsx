import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, CheckCircle, Trash2, RefreshCw, DollarSign, Clock, AlertTriangle } from "lucide-react";
import { useContasReceber, useContaReceberMutations } from "@/hooks/financeiro/useContasReceber";
import { useCategorias } from "@/hooks/financeiro";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pendente: { label: "Pendente", variant: "outline" },
  vencido: { label: "Vencido", variant: "destructive" },
  recebido: { label: "Recebido", variant: "default" },
  parcial: { label: "Parcial", variant: "secondary" },
  cancelado: { label: "Cancelado", variant: "secondary" },
};

export default function AdminContasReceber() {
  const [statusFilter, setStatusFilter] = useState("todos");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [receberDialogId, setReceberDialogId] = useState<string | null>(null);
  const [valorRecebido, setValorRecebido] = useState("");
  const [formaRecebimento, setFormaRecebimento] = useState("pix");

  const { contas, isLoading, refetch } = useContasReceber(statusFilter);
  const { criar, registrarRecebimento, deletar } = useContaReceberMutations();
  const { categorias } = useCategorias("receita");

  const [form, setForm] = useState({
    descricao: "", valor: "", data_vencimento: "", categoria_id: "", cliente_nome: "",
    referencia_tipo: "avulso", observacoes: "",
  });

  const fmt = (v: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  const totalPendente = contas.filter(c => c.status === "pendente" || c.status === "vencido").reduce((s, c) => s + c.valor, 0);
  const totalRecebido = contas.filter(c => c.status === "recebido").reduce((s, c) => s + (c.valor_recebido ?? c.valor), 0);
  const totalVencido = contas.filter(c => c.status === "vencido").reduce((s, c) => s + c.valor, 0);

  const handleCriar = () => {
    if (!form.descricao || !form.valor || !form.data_vencimento) return;
    criar.mutate({
      descricao: form.descricao,
      valor: parseFloat(form.valor),
      data_vencimento: form.data_vencimento,
      categoria_id: form.categoria_id || null,
      cliente_nome: form.cliente_nome || null,
      referencia_tipo: form.referencia_tipo,
      observacoes: form.observacoes || null,
    });
    setForm({ descricao: "", valor: "", data_vencimento: "", categoria_id: "", cliente_nome: "", referencia_tipo: "avulso", observacoes: "" });
    setDialogOpen(false);
  };

  const handleReceber = () => {
    if (!receberDialogId || !valorRecebido) return;
    registrarRecebimento.mutate({
      id: receberDialogId,
      valor_recebido: parseFloat(valorRecebido),
      forma_recebimento: formaRecebimento,
    });
    setReceberDialogId(null);
    setValorRecebido("");
  };

  if (isLoading) {
    return <div className="flex items-center justify-center py-8"><RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-4">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card><CardContent className="pt-4 pb-3 flex items-center gap-3">
          <Clock className="h-8 w-8 text-amber-500" />
          <div><p className="text-xs text-muted-foreground">A Receber</p><p className="text-lg font-bold">{fmt(totalPendente)}</p></div>
        </CardContent></Card>
        <Card><CardContent className="pt-4 pb-3 flex items-center gap-3">
          <DollarSign className="h-8 w-8 text-emerald-500" />
          <div><p className="text-xs text-muted-foreground">Recebido</p><p className="text-lg font-bold">{fmt(totalRecebido)}</p></div>
        </CardContent></Card>
        <Card><CardContent className="pt-4 pb-3 flex items-center gap-3">
          <AlertTriangle className="h-8 w-8 text-destructive" />
          <div><p className="text-xs text-muted-foreground">Vencido</p><p className="text-lg font-bold">{fmt(totalVencido)}</p></div>
        </CardContent></Card>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-center gap-2">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="vencido">Vencido</SelectItem>
            <SelectItem value="recebido">Recebido</SelectItem>
            <SelectItem value="cancelado">Cancelado</SelectItem>
          </SelectContent>
        </Select>
        <Button size="sm" variant="outline" onClick={() => refetch()}><RefreshCw className="h-3.5 w-3.5" /></Button>
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild><Button size="sm"><Plus className="h-3.5 w-3.5 mr-1" /> Nova Conta</Button></DialogTrigger>
          <DialogContent>
            <DialogHeader><DialogTitle>Nova Conta a Receber</DialogTitle></DialogHeader>
            <div className="space-y-3">
              <Input placeholder="Descrição *" value={form.descricao} onChange={e => setForm(p => ({ ...p, descricao: e.target.value }))} />
              <div className="grid grid-cols-2 gap-2">
                <Input type="number" placeholder="Valor *" value={form.valor} onChange={e => setForm(p => ({ ...p, valor: e.target.value }))} />
                <Input type="date" value={form.data_vencimento} onChange={e => setForm(p => ({ ...p, data_vencimento: e.target.value }))} />
              </div>
              <Input placeholder="Nome do cliente" value={form.cliente_nome} onChange={e => setForm(p => ({ ...p, cliente_nome: e.target.value }))} />
              <Select value={form.categoria_id} onValueChange={v => setForm(p => ({ ...p, categoria_id: v }))}>
                <SelectTrigger><SelectValue placeholder="Categoria (opcional)" /></SelectTrigger>
                <SelectContent>
                  {categorias.map(c => <SelectItem key={c.id} value={c.id}>{c.nome}</SelectItem>)}
                </SelectContent>
              </Select>
              <Textarea placeholder="Observações" value={form.observacoes} onChange={e => setForm(p => ({ ...p, observacoes: e.target.value }))} />
              <Button className="w-full" onClick={handleCriar} disabled={criar.isPending}>Criar</Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Contas a Receber ({contas.length})</CardTitle></CardHeader>
        <CardContent>
          {contas.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">Nenhuma conta encontrada.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b text-left text-muted-foreground">
                  <th className="pb-2 pr-2">Descrição</th>
                  <th className="pb-2 pr-2">Cliente</th>
                  <th className="pb-2 pr-2">Valor</th>
                  <th className="pb-2 pr-2">Vencimento</th>
                  <th className="pb-2 pr-2">Status</th>
                  <th className="pb-2">Ações</th>
                </tr></thead>
                <tbody>
                  {contas.map(c => {
                    const cfg = statusConfig[c.status] ?? statusConfig.pendente;
                    return (
                      <tr key={c.id} className="border-b last:border-0">
                        <td className="py-2 pr-2 font-medium">{c.descricao}</td>
                        <td className="py-2 pr-2">{c.cliente_nome ?? "—"}</td>
                        <td className="py-2 pr-2">{fmt(c.valor)}</td>
                        <td className="py-2 pr-2">{new Date(c.data_vencimento + "T12:00:00").toLocaleDateString("pt-BR")}</td>
                        <td className="py-2 pr-2"><Badge variant={cfg.variant}>{cfg.label}</Badge></td>
                        <td className="py-2 flex gap-1">
                          {(c.status === "pendente" || c.status === "vencido") && (
                            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => { setReceberDialogId(c.id); setValorRecebido(String(c.valor)); }}>
                              <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
                            </Button>
                          )}
                          <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => deletar.mutate(c.id)}>
                            <Trash2 className="h-3.5 w-3.5 text-destructive" />
                          </Button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Receber Dialog */}
      <Dialog open={!!receberDialogId} onOpenChange={open => !open && setReceberDialogId(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Registrar Recebimento</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input type="number" placeholder="Valor recebido" value={valorRecebido} onChange={e => setValorRecebido(e.target.value)} />
            <Select value={formaRecebimento} onValueChange={setFormaRecebimento}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pix">PIX</SelectItem>
                <SelectItem value="boleto">Boleto</SelectItem>
                <SelectItem value="cartao">Cartão</SelectItem>
                <SelectItem value="dinheiro">Dinheiro</SelectItem>
                <SelectItem value="transferencia">Transferência</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full" onClick={handleReceber} disabled={registrarRecebimento.isPending}>Confirmar Recebimento</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
