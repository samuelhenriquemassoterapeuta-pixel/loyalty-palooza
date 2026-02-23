import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface CategoriaFinanceira {
  id: string;
  nome: string;
  tipo: "receita" | "despesa";
  categoria_pai_id: string | null;
  cor: string;
  icone: string;
  descricao: string | null;
  ativo: boolean;
  ordem: number;
}

export function useCategorias(tipo?: "receita" | "despesa") {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["categorias-financeiras", tipo],
    queryFn: async () => {
      let query = supabase
        .from("categorias_financeiras" as any)
        .select("*")
        .eq("ativo", true)
        .order("ordem");
      if (tipo) query = query.eq("tipo", tipo);
      const { data, error } = await query;
      if (error) throw error;
      return data as unknown as CategoriaFinanceira[];
    },
    staleTime: 10 * 60 * 1000,
  });

  const { mutateAsync: criarCategoria } = useMutation({
    mutationFn: async (categoria: Partial<CategoriaFinanceira>) => {
      const { data, error } = await supabase
        .from("categorias_financeiras" as any)
        .insert(categoria as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias-financeiras"] });
      toast.success("Categoria criada com sucesso");
    },
    onError: () => toast.error("Erro ao criar categoria"),
  });

  const { mutateAsync: editarCategoria } = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<CategoriaFinanceira> & { id: string }) => {
      const { error } = await supabase
        .from("categorias_financeiras" as any)
        .update(updates as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categorias-financeiras"] });
      toast.success("Categoria atualizada");
    },
  });

  const categoriasAgrupadas = (data ?? []).reduce((acc, cat) => {
    if (!cat.categoria_pai_id) {
      if (!acc[cat.id]) acc[cat.id] = { ...cat, subcategorias: [] };
      else acc[cat.id] = { ...acc[cat.id], ...cat };
    } else {
      if (!acc[cat.categoria_pai_id]) {
        acc[cat.categoria_pai_id] = { subcategorias: [cat] } as any;
      } else {
        acc[cat.categoria_pai_id].subcategorias.push(cat);
      }
    }
    return acc;
  }, {} as Record<string, CategoriaFinanceira & { subcategorias: CategoriaFinanceira[] }>);

  return {
    categorias: data ?? [],
    categoriasReceita: (data ?? []).filter((c) => c.tipo === "receita"),
    categoriasDespesa: (data ?? []).filter((c) => c.tipo === "despesa"),
    categoriasAgrupadas: Object.values(categoriasAgrupadas),
    isLoading,
    criarCategoria,
    editarCategoria,
  };
}
