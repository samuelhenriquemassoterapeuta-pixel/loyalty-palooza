import { useQuery, useMutation } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export function useRelatorioEmpresa(empresaId: string, dataInicio?: string, dataFim?: string) {
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["relatorio-empresa", empresaId, dataInicio, dataFim],
    queryFn: async () => {
      const params: Record<string, string> = { p_empresa_id: empresaId };
      if (dataInicio) params.p_data_inicio = dataInicio;
      if (dataFim) params.p_data_fim = dataFim;

      const { data, error } = await supabase.rpc("get_relatorio_empresa" as any, params);
      if (error) throw error;
      return data as {
        periodo: { inicio: string; fim: string };
        colaboradores: { total: number; ativos_no_periodo: number; taxa_adesao: number };
        agendamentos: { total: number; realizados: number; cancelados: number };
        servicos_populares: Array<{ servico: string; agendamentos: number }>;
        gerado_em: string;
      };
    },
    enabled: !!empresaId,
    staleTime: 5 * 60 * 1000,
  });

  return { relatorio: data, isLoading, refetch };
}

export function useExportColaboradores(empresaId: string) {
  const { mutateAsync: exportar, isPending } = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.rpc("export_colaboradores_csv" as any, {
        p_empresa_id: empresaId,
      });
      if (error) throw error;

      if (!data || (data as any[]).length === 0) {
        throw new Error("Nenhum dado para exportar");
      }

      const rows = data as Record<string, unknown>[];
      const headers = Object.keys(rows[0]);
      const csvRows = [
        headers.join(","),
        ...rows.map((row) =>
          headers.map((h) => `"${row[h] ?? ""}"`).join(",")
        ),
      ];
      const csvContent = csvRows.join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = `colaboradores_${new Date().toISOString().split("T")[0]}.csv`;
      link.click();
      URL.revokeObjectURL(url);

      return rows;
    },
    onSuccess: () => toast.success("Relatório exportado com sucesso!"),
    onError: (e: Error) => toast.error("Erro ao exportar: " + e.message),
  });

  return { exportar, isPending };
}
