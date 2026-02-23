import { useState } from "react";
import { useDespesasRecorrentes, useCategorias, useFornecedores } from "@/hooks/financeiro";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
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
import { Plus, RefreshCw, Play } from "lucide-react";

const FREQ_LABELS: Record<string, string> = {
  semanal: "Semanal",
  quinzenal: "Quinzenal",
  mensal: "Mensal",
  bimestral: "Bimestral",
  trimestral: "Trimestral",
  semestral: "Semestral",
  anual: "Anual",
};

export default function AdminDespesasRecorrentes() {
  const {
    recorrentes,
    custoMensalTotal,
    criarRecorrente,
    toggleRecorrente,
    gerarContasMes,
    isCriando,
    isGerando,
  } = useDespesasRecorrentes();
  const { categoriasDespesa } = useCategorias("despesa");
  const { fornecedores } = useFornecedores();
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    descricao: "",
    valor: "",
    categoria_id: "",
    fornecedor_id: "",
    frequencia: "mensal",
    dia_vencimento: "10",
    forma_pagamento: "",
  });

  const fmt = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  const handleCriar = async () => {
    await criarRecorrente({
      descricao: form.descricao,
      valor: parseFloat(form.valor),
      categoria_id: form.categoria_id || null,
      fornecedor_id: form.fornecedor_id || null,
      frequencia: form.frequencia,
      dia_vencimento: parseInt(form.dia_vencimento),
      forma_pagamento: form.forma_pagamento || null,
    });
    setShowForm(false);
    setForm({
      descricao: "",
      valor: "",
      categoria_id: "",
      fornecedor_id: "",
      frequencia: "mensal",
      dia_vencimento: "10",
      forma_pagamento: "",
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold">Custo fixo mensal estimado</h3>
          <p className="text-lg font-bold text-foreground">{fmt(custoMensalTotal)}</p>
        </div>
        <div className="flex gap-2">
          <Button
            size="sm"
            variant="outline"
            className="gap-1"
            onClick={() => gerarContasMes(new Date().toISOString().split("T")[0])}
            disabled={isGerando}
          >
            <Play className="h-3.5 w-3.5" />
            Gerar Contas do Mês
          </Button>
          <Button size="sm" className="gap-1" onClick={() => setShowForm(true)}>
            <Plus className="h-3.5 w-3.5" /> Nova Recorrente
          </Button>
        </div>
      </div>

      {/* Lista */}
      <div className="space-y-2">
        {recorrentes.map((d: any) => (
          <Card key={d.id}>
            <CardContent className="p-4 flex items-center gap-3">
              <RefreshCw className="h-4 w-4 text-muted-foreground shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{d.descricao}</p>
                <p className="text-[10px] text-muted-foreground">
                  {d.categoria?.nome && `${d.categoria.nome} · `}
                  {d.fornecedor?.nome && `${d.fornecedor.nome} · `}
                  Dia {d.dia_vencimento}
                </p>
              </div>
              <p className="text-sm font-bold shrink-0">{fmt(d.valor)}</p>
              <Badge variant="outline" className="text-xs shrink-0">
                {FREQ_LABELS[d.frequencia] || d.frequencia}
              </Badge>
              <Switch
                checked={d.ativo}
                onCheckedChange={(ativo) => toggleRecorrente({ id: d.id, ativo })}
              />
            </CardContent>
          </Card>
        ))}
        {recorrentes.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-8">
            Nenhuma despesa recorrente cadastrada
          </p>
        )}
      </div>

      {/* Dialog */}
      <Dialog open={showForm} onOpenChange={setShowForm}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Nova Despesa Recorrente</DialogTitle>
          </DialogHeader>
          <div className="space-y-3">
            <Input
              placeholder="Descrição"
              value={form.descricao}
              onChange={(e) => setForm((p) => ({ ...p, descricao: e.target.value }))}
            />
            <Input
              placeholder="Valor"
              type="number"
              step="0.01"
              value={form.valor}
              onChange={(e) => setForm((p) => ({ ...p, valor: e.target.value }))}
            />
            <Select
              value={form.frequencia}
              onValueChange={(v) => setForm((p) => ({ ...p, frequencia: v }))}
            >
              <SelectTrigger>
                <SelectValue placeholder="Frequência" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(FREQ_LABELS).map(([k, v]) => (
                  <SelectItem key={k} value={k}>
                    {v}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Input
              placeholder="Dia do vencimento"
              type="number"
              min="1"
              max="31"
              value={form.dia_vencimento}
              onChange={(e) => setForm((p) => ({ ...p, dia_vencimento: e.target.value }))}
            />
            <Select onValueChange={(v) => setForm((p) => ({ ...p, categoria_id: v }))}>
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
            <Select onValueChange={(v) => setForm((p) => ({ ...p, fornecedor_id: v }))}>
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
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowForm(false)}>
              Cancelar
            </Button>
            <Button onClick={handleCriar} disabled={isCriando || !form.descricao || !form.valor}>
              Criar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
