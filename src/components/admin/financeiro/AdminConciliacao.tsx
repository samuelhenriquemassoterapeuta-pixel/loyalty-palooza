import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Plus, RefreshCw, Upload, CheckCircle, Search, Landmark, ArrowRightLeft } from "lucide-react";
import { useContasBancarias, useExtratoBancario, useConciliacao, type SugestaoConciliacao } from "@/hooks/financeiro/useConciliacao";

export default function AdminConciliacao() {
  const [contaSelecionada, setContaSelecionada] = useState("");
  const [novaContaOpen, setNovaContaOpen] = useState(false);
  const [importOpen, setImportOpen] = useState(false);
  const [csvText, setCsvText] = useState("");
  const [sugestoes, setSugestoes] = useState<SugestaoConciliacao[]>([]);
  const [formConta, setFormConta] = useState({ nome: "", banco: "", agencia: "", conta: "" });

  const { contas, isLoading: loadingContas, criarConta } = useContasBancarias();
  const { extrato, isLoading: loadingExtrato, refetch: refetchExtrato, importarExtrato } = useExtratoBancario(contaSelecionada);
  const { sugerir, conciliar } = useConciliacao(contaSelecionada);

  const fmt = (v: number) => new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  const totalCreditos = extrato.filter(e => e.tipo === "credito").reduce((s, e) => s + e.valor, 0);
  const totalDebitos = extrato.filter(e => e.tipo === "debito").reduce((s, e) => s + Math.abs(e.valor), 0);
  const totalConciliado = extrato.filter(e => e.conciliado).length;
  const totalPendente = extrato.filter(e => !e.conciliado).length;

  const handleCriarConta = () => {
    if (!formConta.nome) return;
    criarConta.mutate(formConta);
    setNovaContaOpen(false);
    setFormConta({ nome: "", banco: "", agencia: "", conta: "" });
  };

  const handleImportCSV = () => {
    if (!csvText.trim()) return;
    const lines = csvText.trim().split("\n");
    const itens = lines.slice(1).map(line => {
      const [data, desc, valor] = line.split(";").map(s => s.trim());
      const numVal = parseFloat(valor.replace(",", "."));
      return {
        data_transacao: data,
        descricao: desc,
        valor: Math.abs(numVal),
        tipo: numVal >= 0 ? "credito" as const : "debito" as const,
      };
    }).filter(i => i.descricao && !isNaN(i.valor));

    if (itens.length === 0) return;
    importarExtrato.mutate(itens);
    setImportOpen(false);
    setCsvText("");
  };

  const handleSugerir = async () => {
    const result = await sugerir.mutateAsync();
    setSugestoes(result ?? []);
  };

  const handleConciliar = async (s: SugestaoConciliacao) => {
    await conciliar.mutateAsync(s);
    setSugestoes(prev => prev.filter(x => x.extrato_id !== s.extrato_id));
    refetchExtrato();
  };

  if (loadingContas) {
    return <div className="flex items-center justify-center py-8"><RefreshCw className="h-5 w-5 animate-spin text-muted-foreground" /></div>;
  }

  return (
    <div className="space-y-4">
      {/* KPIs */}
      {contaSelecionada && (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <Card><CardContent className="pt-4 pb-3">
            <p className="text-xs text-muted-foreground">Créditos</p>
            <p className="text-lg font-bold text-primary">{fmt(totalCreditos)}</p>
          </CardContent></Card>
          <Card><CardContent className="pt-4 pb-3">
            <p className="text-xs text-muted-foreground">Débitos</p>
            <p className="text-lg font-bold text-destructive">{fmt(totalDebitos)}</p>
          </CardContent></Card>
          <Card><CardContent className="pt-4 pb-3">
            <p className="text-xs text-muted-foreground">Conciliados</p>
            <p className="text-lg font-bold">{totalConciliado}</p>
          </CardContent></Card>
          <Card><CardContent className="pt-4 pb-3">
            <p className="text-xs text-muted-foreground">Pendentes</p>
            <p className="text-lg font-bold">{totalPendente}</p>
          </CardContent></Card>
        </div>
      )}

      {/* Header */}
      <div className="flex flex-wrap items-center gap-2">
        <Select value={contaSelecionada} onValueChange={setContaSelecionada}>
          <SelectTrigger className="w-[200px]"><SelectValue placeholder="Selecionar conta" /></SelectTrigger>
          <SelectContent>
            {contas.map(c => <SelectItem key={c.id} value={c.id}>{c.nome} {c.banco ? `(${c.banco})` : ""}</SelectItem>)}
          </SelectContent>
        </Select>
        <Button size="sm" variant="outline" onClick={() => setNovaContaOpen(true)}><Plus className="h-3.5 w-3.5 mr-1" /> Conta</Button>
        {contaSelecionada && (
          <>
            <Button size="sm" variant="outline" onClick={() => setImportOpen(true)}><Upload className="h-3.5 w-3.5 mr-1" /> Importar</Button>
            <Button size="sm" onClick={handleSugerir} disabled={sugerir.isPending}>
              <Search className="h-3.5 w-3.5 mr-1" /> Conciliar
            </Button>
            <Button size="sm" variant="outline" onClick={() => refetchExtrato()}><RefreshCw className="h-3.5 w-3.5" /></Button>
          </>
        )}
      </div>

      {/* Sugestões de conciliação */}
      {sugestoes.length > 0 && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><ArrowRightLeft className="h-4 w-4" /> Sugestões ({sugestoes.length})</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {sugestoes.map((s, i) => (
                <div key={i} className="flex flex-wrap items-center justify-between gap-2 p-2 rounded border text-xs">
                  <div className="flex-1 min-w-[150px]">
                    <p className="font-medium">{s.extrato_descricao}</p>
                    <p className="text-muted-foreground">{fmt(Math.abs(s.extrato_valor))} · {new Date(s.extrato_data + "T12:00").toLocaleDateString("pt-BR")}</p>
                  </div>
                  <ArrowRightLeft className="h-3.5 w-3.5 text-muted-foreground" />
                  <div className="flex-1 min-w-[150px]">
                    <p className="font-medium">{s.lancamento_descricao}</p>
                    <p className="text-muted-foreground">{fmt(s.lancamento_valor)} · <Badge variant="outline" className="text-[10px]">{s.tipo_lancamento.replace("_", " ")}</Badge></p>
                  </div>
                  <Button size="sm" variant="outline" onClick={() => handleConciliar(s)} disabled={conciliar.isPending}>
                    <CheckCircle className="h-3.5 w-3.5 mr-1" /> Conciliar
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Extrato */}
      {contaSelecionada && (
        <Card>
          <CardHeader className="pb-2"><CardTitle className="text-sm">Extrato ({extrato.length} lançamentos)</CardTitle></CardHeader>
          <CardContent>
            {loadingExtrato ? (
              <div className="flex justify-center py-4"><RefreshCw className="h-4 w-4 animate-spin" /></div>
            ) : extrato.length === 0 ? (
              <p className="text-sm text-muted-foreground text-center py-6">Importe um extrato CSV para começar.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-xs">
                  <thead><tr className="border-b text-left text-muted-foreground">
                    <th className="pb-2 pr-2">Data</th>
                    <th className="pb-2 pr-2">Descrição</th>
                    <th className="pb-2 pr-2">Valor</th>
                    <th className="pb-2 pr-2">Tipo</th>
                    <th className="pb-2">Status</th>
                  </tr></thead>
                  <tbody>
                    {extrato.map(e => (
                      <tr key={e.id} className="border-b last:border-0">
                        <td className="py-2 pr-2">{new Date(e.data_transacao + "T12:00").toLocaleDateString("pt-BR")}</td>
                        <td className="py-2 pr-2 font-medium">{e.descricao}</td>
                        <td className={`py-2 pr-2 font-medium ${e.tipo === "credito" ? "text-primary" : "text-destructive"}`}>
                          {e.tipo === "debito" ? "-" : ""}{fmt(e.valor)}
                        </td>
                        <td className="py-2 pr-2"><Badge variant="outline">{e.tipo}</Badge></td>
                        <td className="py-2">
                          {e.conciliado ? (
                            <Badge variant="default">Conciliado</Badge>
                          ) : (
                            <Badge variant="secondary">Pendente</Badge>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </CardContent>
        </Card>
      )}

      {!contaSelecionada && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12 gap-3">
            <Landmark className="h-10 w-10 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Selecione ou crie uma conta bancária para começar.</p>
          </CardContent>
        </Card>
      )}

      {/* Nova Conta Dialog */}
      <Dialog open={novaContaOpen} onOpenChange={setNovaContaOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Nova Conta Bancária</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <Input placeholder="Nome da conta *" value={formConta.nome} onChange={e => setFormConta(p => ({ ...p, nome: e.target.value }))} />
            <Input placeholder="Banco" value={formConta.banco} onChange={e => setFormConta(p => ({ ...p, banco: e.target.value }))} />
            <div className="grid grid-cols-2 gap-2">
              <Input placeholder="Agência" value={formConta.agencia} onChange={e => setFormConta(p => ({ ...p, agencia: e.target.value }))} />
              <Input placeholder="Conta" value={formConta.conta} onChange={e => setFormConta(p => ({ ...p, conta: e.target.value }))} />
            </div>
            <Button className="w-full" onClick={handleCriarConta} disabled={criarConta.isPending}>Criar Conta</Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Import CSV Dialog */}
      <Dialog open={importOpen} onOpenChange={setImportOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>Importar Extrato CSV</DialogTitle></DialogHeader>
          <div className="space-y-3">
            <p className="text-xs text-muted-foreground">Formato: <code>data;descricao;valor</code> (separado por ponto-e-vírgula). Valores negativos = débito.</p>
            <Textarea
              placeholder={"data;descricao;valor\n2026-02-01;Pagamento fornecedor;-1500,00\n2026-02-02;Recebimento cliente;3000,00"}
              rows={8}
              value={csvText}
              onChange={e => setCsvText(e.target.value)}
            />
            <Button className="w-full" onClick={handleImportCSV} disabled={importarExtrato.isPending}>
              <Upload className="h-3.5 w-3.5 mr-1" /> Importar
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
