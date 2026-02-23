import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export interface Fornecedor {
  id: string;
  nome: string;
  tipo_pessoa: "fisica" | "juridica";
  cpf_cnpj: string | null;
  email: string | null;
  telefone: string | null;
  endereco: string | null;
  cidade: string | null;
  estado: string | null;
  cep: string | null;
  banco: string | null;
  agencia: string | null;
  conta: string | null;
  tipo_conta: string | null;
  chave_pix: string | null;
  categoria_padrao_id: string | null;
  observacoes: string | null;
  ativo: boolean;
}

export function useFornecedores() {
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["fornecedores"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fornecedores" as any)
        .select("*")
        .eq("ativo", true)
        .order("nome");
      if (error) throw error;
      return data as unknown as Fornecedor[];
    },
    staleTime: 5 * 60 * 1000,
  });

  const { mutateAsync: criarFornecedor, isPending: isCriando } = useMutation({
    mutationFn: async (fornecedor: Partial<Fornecedor>) => {
      const { data, error } = await supabase
        .from("fornecedores" as any)
        .insert(fornecedor as any)
        .select()
        .single();
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fornecedores"] });
      toast.success("Fornecedor cadastrado com sucesso");
    },
    onError: () => toast.error("Erro ao cadastrar fornecedor"),
  });

  const { mutateAsync: editarFornecedor } = useMutation({
    mutationFn: async ({ id, ...updates }: Partial<Fornecedor> & { id: string }) => {
      const { error } = await supabase.from("fornecedores" as any).update(updates as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fornecedores"] });
      toast.success("Fornecedor atualizado");
    },
  });

  const { mutateAsync: desativarFornecedor } = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("fornecedores" as any).update({ ativo: false } as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["fornecedores"] });
      toast.success("Fornecedor desativado");
    },
  });

  return { fornecedores: data ?? [], isLoading, criarFornecedor, editarFornecedor, desativarFornecedor, isCriando };
}
