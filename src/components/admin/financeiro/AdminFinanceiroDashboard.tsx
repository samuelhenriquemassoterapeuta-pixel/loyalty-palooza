import { useState } from "react";
import { useResumoFinanceiro } from "@/hooks/financeiro";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  TrendingUp,
  TrendingDown,
  Wallet,
  AlertTriangle,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
} from "lucide-react";

export default function AdminFinanceiroDashboard() {
  const hoje = new Date();
  const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const ultimoDia = hoje.toISOString().split("T")[0];

  const [dataInicio, setDataInicio] = useState(primeiroDia);
  const [dataFim, setDataFim] = useState(ultimoDia);

  const {
    receitas,
    despesasPagas,
    despesasPendentes,
    despesasVencidas,
    saldo,
    margem,
    receitasPorCategoria,
    despesasPorCategoria,
    contasVencendo,
    isLoading,
    refetch,
  } = useResumoFinanceiro(dataInicio, dataFim);

  const fmt = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header com período */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">Dashboard Financeiro</h2>
          <p className="text-xs text-muted-foreground">
            Visão geral de receitas, despesas e saldo
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Input
            type="date"
            value={dataInicio}
            onChange={(e) => setDataInicio(e.target.value)}
            className="w-36 h-9"
          />
          <span className="text-xs text-muted-foreground">a</span>
          <Input
            type="date"
            value={dataFim}
            onChange={(e) => setDataFim(e.target.value)}
            className="w-36 h-9"
          />
          <Button size="sm" variant="outline" onClick={() => refetch()}>
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Receitas</span>
              <ArrowUpRight className="h-4 w-4 text-green-500" />
            </div>
            <p className="text-lg font-bold text-foreground">{fmt(receitas)}</p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Despesas Pagas</span>
              <ArrowDownRight className="h-4 w-4 text-red-500" />
            </div>
            <p className="text-lg font-bold text-foreground">{fmt(despesasPagas)}</p>
          </CardContent>
        </Card>

        <Card className={`border ${saldo >= 0 ? "border-green-200" : "border-red-200"}`}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Saldo</span>
              <Wallet className="h-4 w-4" />
            </div>
            <p className={`text-lg font-bold ${saldo >= 0 ? "text-green-600" : "text-red-600"}`}>
              {fmt(saldo)}
            </p>
            <span className="text-[10px] text-muted-foreground">
              Margem: {margem}%
            </span>
          </CardContent>
        </Card>

        <Card className={despesasVencidas > 0 ? "border border-red-200" : ""}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-muted-foreground">Vencidas</span>
              <AlertTriangle
                className={`h-4 w-4 ${despesasVencidas > 0 ? "text-red-500" : "text-muted-foreground"}`}
              />
            </div>
            <p className={`text-lg font-bold ${despesasVencidas > 0 ? "text-red-600" : ""}`}>
              {fmt(despesasVencidas)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Categorias */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-green-500" />
              Receitas por Categoria
            </h3>
            {receitasPorCategoria.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">
                Sem receitas no período
              </p>
            ) : (
              <div className="space-y-2">
                {receitasPorCategoria.map((cat: any, i: number) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: cat.cor }}
                      />
                      <span className="text-xs">{cat.categoria || "Sem categoria"}</span>
                    </div>
                    <span className="text-xs font-medium">{fmt(cat.total)}</span>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <TrendingDown className="h-4 w-4 text-red-500" />
              Despesas por Categoria
            </h3>
            {despesasPorCategoria.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">
                Sem despesas no período
              </p>
            ) : (
              <div className="space-y-2">
                {despesasPorCategoria.map((cat: any, i: number) => (
                  <div key={i} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-2.5 h-2.5 rounded-full"
                        style={{ backgroundColor: cat.cor }}
                      />
                      <span className="text-xs">{cat.categoria || "Sem categoria"}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-xs font-medium">{fmt(cat.total_pago)}</span>
                      {cat.total_pendente > 0 && (
                        <span className="text-[10px] text-muted-foreground ml-1">
                          +{fmt(cat.total_pendente)} pendente
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Contas vencendo */}
      {contasVencendo.length > 0 && (
        <Card className="border-yellow-200">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
              <Clock className="h-4 w-4 text-yellow-600" />
              Vencendo nos próximos 7 dias ({contasVencendo.length})
            </h3>
            <div className="space-y-2">
              {contasVencendo.map((conta: any, i: number) => (
                <div key={i} className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-medium">{conta.descricao}</span>
                    <p className="text-[10px] text-muted-foreground">
                      {conta.fornecedor && `${conta.fornecedor} · `}
                      {conta.categoria}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium">{fmt(conta.valor)}</span>
                    <Badge
                      variant={conta.dias_restantes <= 2 ? "destructive" : "outline"}
                      className="text-xs"
                    >
                      {conta.dias_restantes === 0
                        ? "Hoje"
                        : conta.dias_restantes === 1
                          ? "Amanhã"
                          : `${conta.dias_restantes} dias`}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
