import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, RefreshCw, CheckCircle, DollarSign, Users, Calculator } from "lucide-react";
import { useRepasses, useCalcularRepasse, useRepasseMutations } from "@/hooks/financeiro/useRepasses";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  pendente: { label: "Pendente", variant: "outline" },
  aprovado: { label: "Aprovado", variant: "secondary" },
  pago: { label: "Pago", variant: "default" },
  cancelado: { label: "Cancelado", variant: "destructive" },
};

export default function AdminRepasses() {
  const [statusFilter, setStatusFilter] = useState("todos");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [pagarDialogId, setPagarDialogId] = useState<string | null>(null);
  const [formaPagamento, setFormaPagamento] = useState("pix");
  const [terapeutaId, setTerapeutaId] = useState("");
  const [periodoInicio, setPeriodoInicio] = useState("");
  const [periodoFim, setPeriodoFim] = useState("");
  const [preview, setPreview] = useState<any>(null);

  const { repasses, isLoading, refetch } = useRepasses(statusFilter);
  const calcular = useCalcularRepasse();
  const { criar, aprovar, pagar } = useRepasseMutations();

  const { data: terapeutas } = useQuery({
    queryKey: ["terapeutas-repasses"],
    queryFn: async () => {
      const { data, error } = await supabase.from("terapeutas").select("id, nome").eq("disponivel", true);
      if (error) throw error;
      return data;
    },
  });

  const fmt = (v: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  const totalPendente = repasses.filter(r => r.status === "pendente" || r.status === "aprovado").reduce((s, r) => s + r.valor_liquido, 0);
  const totalPago = repasses.filter(r => r.status === "pago").reduce((s, r) => s + r.valor_liquido, 0);

  const handleCalcular = async () => {
    if (!terapeutaId || !periodoInicio || !periodoFim) return;
    const result = await calcular.mutateAsync({ terapeuta_id: terapeutaId, periodo_inicio: periodoInicio, periodo_fim: periodoFim });
    setPreview(result);
  };

  const handleCriarRepasse = () => {
    if (!preview) return;
    criar.mutate({
      terapeuta_id: preview.terapeuta_id,
      periodo_inicio: preview.periodo_inicio,
      periodo_fim: preview.periodo_fim,
      total_sessoes: preview.total_sessoes,
      valor_bruto: preview.valor_bruto,
      percentual_comissao: preview.percentual_comissao,
      valor_comissao: preview.valor_comissao,
      valor_liquido: preview.valor_comissao,
      itens: preview.itens,
    });
    setDialogOpen(false);
    setPreview(null);
  };

  const handlePagar = () => {
    if (!pagarDialogId) return;
    pagar.mutate({ id: pagarDialogId, forma_pagamento: formaPagamento });
    setPagarDialogId(null);
  };

  if (isLoading) {
    return <div className="flex items-center justify-center py-8"><RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-4">
      {/* KPIs */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <Card><CardContent className="pt-4 pb-3 flex items-center gap-3">
          <Users className="h-8 w-8 text-primary" />
          <div><p className="text-xs text-muted-foreground">Repasses</p><p className="text-lg font-bold">{repasses.length}</p></div>
        </CardContent></Card>
        <Card><CardContent className="pt-4 pb-3 flex items-center gap-3">
          <Calculator className="h-8 w-8 text-amber-500" />
          <div><p className="text-xs text-muted-foreground">A Pagar</p><p className="text-lg font-bold">{fmt(totalPendente)}</p></div>
        </CardContent></Card>
        <Card><CardContent className="pt-4 pb-3 flex items-center gap-3">
          <DollarSign className="h-8 w-8 text-emerald-500" />
          <div><p className="text-xs text-muted-foreground">Pago</p><p className="text-lg font-bold">{fmt(totalPago)}</p></div>
        </CardContent></Card>
      </div>

      {/* Header */}
      <div className="flex flex-wrap items-center gap-2">
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
          <SelectContent>
            <SelectItem value="todos">Todos</SelectItem>
            <SelectItem value="pendente">Pendente</SelectItem>
            <SelectItem value="aprovado">Aprovado</SelectItem>
            <SelectItem value="pago">Pago</SelectItem>
          </SelectContent>
        </Select>
        <Button size="sm" variant="outline" onClick={() => refetch()}><RefreshCw className="h-3.5 w-3.5" /></Button>
        <Button size="sm" onClick={() => { setDialogOpen(true); setPreview(null); }}><Plus className="h-3.5 w-3.5 mr-1" /> Novo Repasse</Button>
      </div>

      {/* Table */}
      <Card>
        <CardHeader className="pb-2"><CardTitle className="text-sm">Repasses ({repasses.length})</CardTitle></CardHeader>
        <CardContent>
          {repasses.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-6">Nenhum repasse encontrado.</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-xs">
                <thead><tr className="border-b text-left text-muted-foreground">
                  <th className="pb-2 pr-2">Terapeuta</th>
                  <th className="pb-2 pr-2">Período</th>
                  <th className="pb-2 pr-2">Sessões</th>
                  <th className="pb-2 pr-2">Bruto</th>
                  <th className="pb-2 pr-2">Comissão</th>
                  <th className="pb-2 pr-2">Status</th>
                  <th className="pb-2">Ações</th>
                </tr></thead>
                <tbody>
                  {repasses.map(r => {
                    const cfg = statusConfig[r.status] ?? statusConfig.pendente;
                    return (
                      <tr key={r.id} className="border-b last:border-0">
                        <td className="py-2 pr-2 font-medium">{r.terapeutas?.nome ?? "—"}</td>
                        <td className="py-2 pr-2">{new Date(r.periodo_inicio + "T12:00").toLocaleDateString("pt-BR")} — {new Date(r.periodo_fim + "T12:00").toLocaleDateString("pt-BR")}</td>
                        <td className="py-2 pr-2">{r.total_sessoes}</td>
                        <td className="py-2 pr-2">{fmt(r.valor_bruto)}</td>
                        <td className="py-2 pr-2 font-medium">{fmt(r.valor_comissao)}</td>
                        <td className="py-2 pr-2"><Badge variant={cfg.variant}>{cfg.label}</Badge></td>
                        <td className="py-2 flex gap-1">
                          {r.status === "pendente" && (
                            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => aprovar.mutate(r.id)} title="Aprovar">
                              <CheckCircle className="h-3.5 w-3.5 text-primary" />
                            </Button>
                          )}
                          {r.status === "aprovado" && (
                            <Button size="icon" variant="ghost" className="h-6 w-6" onClick={() => setPagarDialogId(r.id)} title="Registrar pagamento">
                              <DollarSign className="h-3.5 w-3.5 text-emerald-500" />
                            </Button>
                          )}
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

      {/* Novo Repasse Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader><DialogTitle>Calcular Repasse</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Select value={terapeutaId} onValueChange={setTerapeutaId}>
              <SelectTrigger><SelectValue placeholder="Selecionar terapeuta" /></SelectTrigger>
              <SelectContent>
                {terapeutas?.map(t => <SelectItem key={t.id} value={t.id}>{t.nome}</SelectItem>)}
              </SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-2">
              <Input type="date" value={periodoInicio} onChange={e => setPeriodoInicio(e.target.value)} />
              <Input type="date" value={periodoFim} onChange={e => setPeriodoFim(e.target.value)} />
            </div>
            <Button className="w-full" variant="outline" onClick={handleCalcular} disabled={calcular.isPending}>
              <Calculator className="h-3.5 w-3.5 mr-1" /> Calcular
            </Button>

            {preview && (
              <Card>
                <CardContent className="pt-4 space-y-2 text-sm">
                  <div className="flex justify-between"><span>Sessões:</span><strong>{preview.total_sessoes}</strong></div>
                  <div className="flex justify-between"><span>Valor Bruto:</span><strong>{fmt(preview.valor_bruto)}</strong></div>
                  <div className="flex justify-between"><span>Comissão ({preview.percentual_comissao}%):</span><strong>{fmt(preview.valor_comissao)}</strong></div>
                  {preview.total_sessoes > 0 && (
                    <Button className="w-full mt-2" onClick={handleCriarRepasse} disabled={criar.isPending}>
                      Gerar Repasse
                    </Button>
                  )}
                  {preview.total_sessoes === 0 && (
                    <p className="text-muted-foreground text-center text-xs">Nenhuma sessão concluída neste período.</p>
                  )}
                </CardContent>
              </Card>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Pagar Dialog */}
      <Dialog open={!!pagarDialogId} onOpenChange={open => !open && setPagarDialogId(null)}>
        <DialogContent>
          <DialogHeader><DialogTitle>Registrar Pagamento</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Select value={formaPagamento} onValueChange={setFormaPagamento}>
              <SelectTrigger><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="pix">PIX</SelectItem>
                <SelectItem value="transferencia">Transferência</SelectItem>
                <SelectItem value="dinheiro">Dinheiro</SelectItem>
              </SelectContent>
            </Select>
            <Button className="w-full" onClick={handlePagar} disabled={pagar.isPending}>Confirmar Pagamento</Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
