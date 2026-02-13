import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export const useListaEspera = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: listaEspera = [], isLoading } = useQuery({
    queryKey: ["lista-espera", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("lista_espera")
        .select("*")
        .eq("user_id", user!.id)
        .eq("ativo", true)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const adicionarNaLista = useMutation({
    mutationFn: async (params: { servico: string; horario_preferido?: string }) => {
      if (!user) throw new Error("Não autenticado");
      const { error } = await supabase.from("lista_espera").insert({
        user_id: user.id,
        servico: params.servico,
        horario_preferido: params.horario_preferido || null,
      } as any);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lista-espera"] });
      toast.success("Adicionado à lista de espera! Você será notificado quando houver vaga. ⚡");
    },
    onError: (err: any) => toast.error(err.message || "Erro ao adicionar"),
  });

  const removerDaLista = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase
        .from("lista_espera")
        .update({ ativo: false } as any)
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["lista-espera"] });
      toast.success("Removido da lista de espera");
    },
  });

  return { listaEspera, isLoading, adicionarNaLista, removerDaLista };
};
