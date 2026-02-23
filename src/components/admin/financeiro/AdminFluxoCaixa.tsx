import { useState } from "react";
import { useFluxoCaixa } from "@/hooks/financeiro/useFluxoCaixa";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  ComposedChart,
  Area,
} from "recharts";

export default function AdminFluxoCaixa() {
  const [meses, setMeses] = useState(6);
  const { fluxo, isLoading, refetch } = useFluxoCaixa(meses);

  const fmt = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2].map((i) => (
          <div key={i} className="h-48 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  const totais = fluxo.reduce(
    (acc, m) => ({
      entradas: acc.entradas + m.entradas,
      saidas: acc.saidas + m.saidas,
    }),
    { entradas: 0, saidas: 0 }
  );

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">Fluxo de Caixa</h2>
          <p className="text-xs text-muted-foreground">Entradas × saídas por mês</p>
        </div>
        <div className="flex items-center gap-2">
          {[3, 6, 12].map((n) => (
            <Button
              key={n}
              size="sm"
              variant={meses === n ? "default" : "outline"}
              onClick={() => setMeses(n)}
            >
              {n}m
            </Button>
          ))}
          <Button size="sm" variant="outline" onClick={() => refetch()}>
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-3 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <span className="text-xs text-muted-foreground">Total Entradas</span>
            <p className="text-lg font-bold text-green-600">{fmt(totais.entradas)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <span className="text-xs text-muted-foreground">Total Saídas</span>
            <p className="text-lg font-bold text-red-600">{fmt(totais.saidas)}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <span className="text-xs text-muted-foreground">Saldo Acumulado</span>
            <p className={`text-lg font-bold ${(fluxo.at(-1)?.saldo_acumulado ?? 0) >= 0 ? "text-green-600" : "text-red-600"}`}>
              {fmt(fluxo.at(-1)?.saldo_acumulado ?? 0)}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Chart */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-sm">Entradas vs Saídas</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart data={fluxo}>
                <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                <XAxis dataKey="mes" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip
                  formatter={(value: number) => fmt(value)}
                  contentStyle={{ borderRadius: 12, border: "1px solid hsl(var(--border))" }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Bar dataKey="entradas" name="Entradas" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
                <Bar dataKey="saidas" name="Saídas" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                <Line
                  type="monotone"
                  dataKey="saldo_acumulado"
                  name="Saldo Acumulado"
                  stroke="hsl(var(--highlight))"
                  strokeWidth={2}
                  dot={{ r: 3 }}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50">
                  <th className="px-4 py-2 text-left font-medium text-muted-foreground">Mês</th>
                  <th className="px-4 py-2 text-right font-medium text-muted-foreground">Entradas</th>
                  <th className="px-4 py-2 text-right font-medium text-muted-foreground">Saídas</th>
                  <th className="px-4 py-2 text-right font-medium text-muted-foreground">Saldo</th>
                  <th className="px-4 py-2 text-right font-medium text-muted-foreground">Acumulado</th>
                </tr>
              </thead>
              <tbody>
                {fluxo.map((m, i) => (
                  <tr key={i} className="border-b last:border-0">
                    <td className="px-4 py-2 font-medium">{m.mes}</td>
                    <td className="px-4 py-2 text-right text-green-600 font-mono">{fmt(m.entradas)}</td>
                    <td className="px-4 py-2 text-right text-red-600 font-mono">{fmt(m.saidas)}</td>
                    <td className={`px-4 py-2 text-right font-mono ${m.saldo_mes >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {fmt(m.saldo_mes)}
                    </td>
                    <td className={`px-4 py-2 text-right font-mono font-bold ${m.saldo_acumulado >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {fmt(m.saldo_acumulado)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
