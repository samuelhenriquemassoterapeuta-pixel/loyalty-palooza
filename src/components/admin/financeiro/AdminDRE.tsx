import { useState } from "react";
import { useDRE } from "@/hooks/financeiro/useDRE";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { RefreshCw, TrendingUp, TrendingDown, Minus, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export default function AdminDRE() {
  const hoje = new Date();
  const primeiroDia = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
    .toISOString()
    .split("T")[0];
  const ultimoDia = hoje.toISOString().split("T")[0];

  const [dataInicio, setDataInicio] = useState(primeiroDia);
  const [dataFim, setDataFim] = useState(ultimoDia);
  const [isExporting, setIsExporting] = useState(false);
  const { dre, isLoading, refetch } = useDRE(dataInicio, dataFim);

  const fmt = (v: number) =>
    new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(v);

  const handleExport = async () => {
    setIsExporting(true);
    try {
      const { data, error } = await supabase.functions.invoke("financeiro-relatorio", {
        body: { data_inicio: dataInicio, data_fim: dataFim },
      });
      if (error) throw error;
      if (data?.csv) {
        const blob = new Blob([data.csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `relatorio-financeiro-${dataInicio}-${dataFim}.csv`;
        link.click();
        URL.revokeObjectURL(url);
        toast.success("Relatório exportado!");
      }
    } catch {
      toast.error("Erro ao exportar relatório");
    } finally {
      setIsExporting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
        ))}
      </div>
    );
  }

  if (!dre) return null;

  const lines: Array<{
    label: string;
    value?: number;
    bold?: boolean;
    positive?: boolean;
    negative?: boolean;
    highlight?: boolean;
    separator?: boolean;
    icon?: React.ComponentType<{ className?: string }>;
  }> = [
    { label: "RECEITAS", bold: true, icon: TrendingUp },
    { label: "  Serviços", value: dre.receitas.servicos },
    { label: "  Produtos", value: dre.receitas.produtos },
    { label: "  Assinaturas", value: dre.receitas.assinaturas },
    { label: "  Total Receitas", value: dre.receitas.total, bold: true, positive: true },
    { label: "", separator: true },
    { label: "DESPESAS", bold: true, icon: TrendingDown },
    { label: "  Fixas (aluguel, infra)", value: dre.despesas.fixas },
    { label: "  Variáveis (materiais)", value: dre.despesas.variaveis },
    { label: "  Pessoal", value: dre.despesas.pessoal },
    { label: "  Marketing", value: dre.despesas.marketing },
    { label: "  Impostos e Taxas", value: dre.despesas.impostos },
    { label: "  Outras", value: dre.despesas.outras },
    { label: "  Total Despesas", value: dre.despesas.total, bold: true, negative: true },
    { label: "", separator: true },
    { label: "RESULTADO", bold: true, icon: Minus },
    { label: "  Lucro Bruto", value: dre.resultado.lucro_bruto, highlight: true },
    { label: "  Lucro Operacional", value: dre.resultado.lucro_operacional, highlight: true },
    { label: "  Lucro Líquido", value: dre.resultado.lucro_liquido, bold: true, highlight: true },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">DRE — Demonstrativo de Resultado</h2>
          <p className="text-xs text-muted-foreground">Receitas × Despesas no período</p>
        </div>
        <div className="flex items-center gap-2">
          <Input type="date" value={dataInicio} onChange={(e) => setDataInicio(e.target.value)} className="w-36 h-9" />
          <span className="text-xs text-muted-foreground">a</span>
          <Input type="date" value={dataFim} onChange={(e) => setDataFim(e.target.value)} className="w-36 h-9" />
          <Button size="sm" variant="outline" onClick={() => refetch()}>
            <RefreshCw className="h-3.5 w-3.5" />
          </Button>
          <Button size="sm" variant="outline" onClick={handleExport} disabled={isExporting}>
            <Download className="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>

      {/* Margens */}
      <div className="grid grid-cols-2 gap-3">
        <Card>
          <CardContent className="p-4 text-center">
            <span className="text-xs text-muted-foreground">Margem Bruta</span>
            <p className={`text-2xl font-bold ${dre.resultado.margem_bruta >= 0 ? "text-green-600" : "text-red-600"}`}>
              {dre.resultado.margem_bruta}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <span className="text-xs text-muted-foreground">Margem Líquida</span>
            <p className={`text-2xl font-bold ${dre.resultado.margem_liquida >= 0 ? "text-green-600" : "text-red-600"}`}>
              {dre.resultado.margem_liquida}%
            </p>
          </CardContent>
        </Card>
      </div>

      {/* DRE Table */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {lines.map((line, i) => {
              if (line.separator) {
                return <div key={i} className="h-px" />;
              }
              const Icon = line.icon;
              return (
                <div
                  key={i}
                  className={`flex items-center justify-between px-4 py-2.5 ${line.bold ? "bg-muted/50" : ""}`}
                >
                  <div className="flex items-center gap-2">
                    {Icon && <Icon className="h-3.5 w-3.5 text-muted-foreground" />}
                    <span className={`text-sm ${line.bold ? "font-semibold" : ""}`}>
                      {line.label}
                    </span>
                  </div>
                  {line.value !== undefined && (
                    <span
                      className={`text-sm font-mono ${
                        line.bold ? "font-bold" : ""
                      } ${
                        line.highlight
                          ? line.value >= 0
                            ? "text-green-600"
                            : "text-red-600"
                          : line.positive
                            ? "text-green-600"
                            : line.negative
                              ? "text-red-600"
                              : ""
                      }`}
                    >
                      {fmt(line.value)}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
