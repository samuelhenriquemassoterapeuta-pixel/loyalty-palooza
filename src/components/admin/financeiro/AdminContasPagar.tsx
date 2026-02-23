import { useState } from "react";
import { useContasPagar, useCategorias, useFornecedores } from "@/hooks/financeiro";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, CheckCircle, XCircle, RefreshCw } from "lucide-react";

const STATUS_COLORS: Record<string, string> = {
  pendente: "bg-yellow-100 text-yellow-800",
  pago: "bg-green-100 text-green-800",
  parcial: "bg-blue-100 text-blue-800",
  vencido: "bg-red-100 text-red-800",
  cancelado: "bg-gray-100 text-gray-500",
  agendado: "bg-purple-100 text-purple-800",
};

export default function AdminContasPagar() {
  const [filtroStatus, setFiltroStatus] = useState("");
  const [showNovaConta, setShowNovaConta] = useState(false);
  const [showPagamento, setShowPagamento] = useState<string | null>(null);

  const { contas, totais, pagarConta, cancelarConta, criarConta, isPagando, isCriando } =
    useContasPagar(filtroStatus ? { status: filtroStatus } : undefined);
  const { categoriasDespesa } = useCategorias("despesa");
  const { fornecedores } = useFornecedores();

  const [novaConta, setNovaConta] = useState({
    descricao: "",
    valor: "",
    categoria_id: "",
    fornecedor_id: "",
    data_vencimento: "",
    forma_pagamento: "",
    observacoes: "",
  });

  const [pagamento, setPagamento] = useState({
    valorPago: "",
    formaPagamento: "pix",
  });

  const fmt = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  const handleCriar = async () => {
    await criarConta({
      descricao: novaConta.descricao,
      valor: parseFloat(novaConta.valor),
      categoria_id: novaConta.categoria_id || null,
      fornecedor_id: novaConta.fornecedor_id || null,
      data_vencimento: novaConta.data_vencimento,
      forma_pagamento: novaConta.forma_pagamento || null,
      observacoes: novaConta.observacoes || null,
    });
    setShowNovaConta(false);
    setNovaConta({
      descricao: "",
      valor: "",
      categoria_id: "",
      fornecedor_id: "",
      data_vencimento: "",
      forma_pagamento: "",
      observacoes: "",
    });
  };

  const handlePagar = async (contaId: string) => {
    await pagarConta({
      contaId,
      valorPago: pagamento.valorPago ? parseFloat(pagamento.valorPago) : undefined,
      formaPagamento: pagamento.formaPagamento,
    });
    setShowPagamento(null);
    setPagamento({ valorPago: "", formaPagamento: "pix" });
  };

  return (
    <div className="space-y-4">
      {/* KPIs */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-4">
            <span className="text-xs text-muted-foreground">Total</span>
            <p className="text-lg font-bold">{fmt(totais.total)}</p>
            <span className="text-[10px] text-muted-foreground">{totais.quantidade} contas</span>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <span className="text-xs text-muted-foreground">Pendentes</span>
            <p className="text-lg font-bold text-yellow-600">{fmt(totais.pendentes)}</p>
          </CardContent>
        </Card>
        <Card className={totais.vencidas > 0 ? "border border-red-200" : ""}>
          <CardContent className="p-4">
            <span className="text-xs text-muted-foreground">Vencidas</span>
            <p className="text-lg font-bold text-red-600">{fmt(totais.vencidas)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <span className="text-xs text-muted-foreground">Pagas</span>
            <p className="text-lg font-bold text-green-600">{fmt(totais.pagas)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Filtros */}
      <div className="flex items-center gap-2 flex-wrap">
        {["", "pendente", "vencido", "pago", "parcial"].map((s) => (
          <Button
            key={s}
            size="sm"
            variant={filtroStatus === s ? "default" : "outline"}
            onClick={() => setFiltroStatus(s)}
          >
            {s === "" ? "Todos" : s.charAt(0).toUpperCase() + s.slice(1)}
          </Button>
        ))}
        <Button size="sm" className="ml-auto gap-1" onClick={() => setShowNovaConta(true)}>
          <Plus className="h-3.5 w-3.5" /> Nova Conta
        </Button>
      </div>

      {/* Lista */}
      <div className="space-y-2">
        {contas.map((conta) => (
          <Card key={conta.id}>
            <CardContent className="p-4 flex items-center gap-3">
              {conta.categoria_cor && (
                <div
                  className="w-1 h-10 rounded-full shrink-0"
                  style={{ backgroundColor: conta.categoria_cor }}
                />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{conta.descricao}</p>
                <p className="text-[10px] text-muted-foreground">
                  {conta.fornecedor_nome && `${conta.fornecedor_nome} · `}
                  {conta.categoria_nome || "Sem categoria"}
                  {conta.despesa_recorrente && (
                    <RefreshCw className="h-2.5 w-2.5 inline ml-1" />
                  )}
                </p>
              </div>
              <div className="text-right shrink-0">
                <p className="text-sm font-bold">{fmt(conta.valor)}</p>
                {conta.valor_pago > 0 && conta.valor_pago < conta.valor && (
                  <p className="text-[10px] text-muted-foreground">
                    Pago: {fmt(conta.valor_pago)}
                  </p>
                )}
              </div>
              <div className="text-right shrink-0">
                <p className="text-[10px] text-muted-foreground">{conta.data_vencimento}</p>
                {conta.dias_vencimento < 0 && (
                  <p className="text-[10px] text-red-500">
                    ({Math.abs(conta.dias_vencimento)}d atrás)
                  </p>
                )}
              </div>
              <Badge className={STATUS_COLORS[conta.status] || ""}>{conta.status}</Badge>
              {conta.status !== "pago" && conta.status !== "cancelado" && (
                <div className="flex gap-1">
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => {
                      setShowPagamento(conta.id);
                      setPagamento({
                        valorPago: String(conta.valor - conta.valor_pago),
                        formaPagamento: "pix",
                      });
                    }}
                  >
                    <CheckCircle className="h-3.5 w-3.5 text-green-600" />
                  </Button>
                  <Button
                    size="icon"
                    variant="ghost"
                    className="h-7 w-7"
                    onClick={() => cancelarConta(conta.id)}
                  >
                    <XCircle className="h-3.5 w-3.5 text-red-500" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        {contas.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">Nenhuma conta encontrada</p>
        )}
      </div>

      {/* Dialog Nova Conta */}
      <Dialog open={showNovaConta} onOpenChange={setShowNovaConta}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Conta a Pagar</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Descrição"
              value={novaConta.descricao}
              onChange={(e) => setNovaConta((p) => ({ ...p, descricao: e.target.value }))}
            />
            <Input
              placeholder="Valor"
              type="number"
              step="0.01"
              value={novaConta.valor}
              onChange={(e) => setNovaConta((p) => ({ ...p, valor: e.target.value }))}
            />
            <Input
              type="date"
              value={novaConta.data_vencimento}
              onChange={(e) => setNovaConta((p) => ({ ...p, data_vencimento: e.target.value }))}
            />
            <Select onValueChange={(v) => setNovaConta((p) => ({ ...p, categoria_id: v }))}>
              <SelectTrigger>
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                {categoriasDespesa.map((c) => (
                  <SelectItem key={c.id} value={c.id}>
                    {c.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select onValueChange={(v) => setNovaConta((p) => ({ ...p, fornecedor_id: v }))}>
              <SelectTrigger>
                <SelectValue placeholder="Fornecedor" />
              </SelectTrigger>
              <SelectContent>
                {fornecedores.map((f) => (
                  <SelectItem key={f.id} value={f.id}>
                    {f.nome}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Textarea
              placeholder="Observações"
              value={novaConta.observacoes}
              onChange={(e) => setNovaConta((p) => ({ ...p, observacoes: e.target.value }))}
              rows={2}
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNovaConta(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCriar} disabled={isCriando || !novaConta.descricao || !novaConta.valor}>
              Criar Conta
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Dialog Pagamento */}
      <Dialog open={!!showPagamento} onOpenChange={() => setShowPagamento(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Registrar Pagamento</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Valor pago"
              type="number"
              step="0.01"
              value={pagamento.valorPago}
              onChange={(e) => setPagamento((p) => ({ ...p, valorPago: e.target.value }))}
            />
            <Select
              value={pagamento.formaPagamento}
              onValueChange={(v) => setPagamento((p) => ({ ...p, formaPagamento: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Forma de pagamento" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pix">PIX</SelectItem>
                <SelectItem value="boleto">Boleto</SelectItem>
                <SelectItem value="transferencia">Transferência</SelectItem>
                <SelectItem value="cartao">Cartão</SelectItem>
                <SelectItem value="dinheiro">Dinheiro</SelectItem>
                <SelectItem value="debito_automatico">Débito Automático</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPagamento(null)}>
              Cancelar
            </Button>
            <Button
              onClick={() => showPagamento && handlePagar(showPagamento)}
              disabled={isPagando}
            >
              Confirmar Pagamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
