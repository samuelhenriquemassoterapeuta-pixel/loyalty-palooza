import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

/**
 * Hook genérico para SELECT no Supabase.
 * Padroniza loading, error handling, e cache.
 *
 * Uso:
 *   const { data, isLoading } = useSupabaseSelect('produtos', {
 *     filter: { disponivel: true },
 *     orderBy: { column: 'nome', ascending: true },
 *   });
 */
export function useSupabaseSelect<T = any>(
  table: string,
  options?: {
    select?: string;
    filter?: Record<string, any>;
    orderBy?: { column: string; ascending?: boolean };
    limit?: number;
    enabled?: boolean;
    staleTime?: number;
  }
) {
  const {
    select = "*",
    filter = {},
    orderBy,
    limit,
    enabled = true,
    staleTime = 30000,
  } = options || {};

  return useQuery({
    queryKey: [table, filter, orderBy, limit],
    queryFn: async () => {
      let query = (supabase.from(table as any) as any).select(select);

      Object.entries(filter).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value);
        }
      });

      if (orderBy) {
        query = query.order(orderBy.column, { ascending: orderBy.ascending ?? true });
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;
      if (error) throw error;
      return data as T[];
    },
    staleTime,
    enabled,
  });
}

/**
 * Hook genérico para INSERT/UPDATE/DELETE no Supabase.
 *
 * Uso:
 *   const { mutate: criar } = useSupabaseMutation('produtos', 'insert', {
 *     invalidateKeys: ['produtos'],
 *     successMessage: 'Produto criado!',
 *   });
 *   criar({ nome: 'Novo Produto', preco: 29.90 });
 */
export function useSupabaseMutation<T = any>(
  table: string,
  operation: "insert" | "update" | "delete" | "upsert",
  options?: {
    invalidateKeys?: string[];
    successMessage?: string;
    errorMessage?: string;
    onSuccess?: (data: T) => void;
    matchColumn?: string;
  }
) {
  const queryClient = useQueryClient();
  const {
    invalidateKeys = [table],
    successMessage,
    errorMessage = "Erro na operação. Tente novamente.",
    onSuccess,
    matchColumn = "id",
  } = options || {};

  return useMutation({
    mutationFn: async (payload: any) => {
      let result;

      switch (operation) {
        case "insert":
          result = await (supabase.from(table as any) as any).insert(payload).select();
          break;
        case "update": {
          const { [matchColumn]: matchValue, ...updateData } = payload;
          result = await (supabase.from(table as any) as any).update(updateData).eq(matchColumn, matchValue).select();
          break;
        }
        case "delete":
          result = await (supabase.from(table as any) as any).delete().eq(matchColumn, payload[matchColumn] || payload);
          break;
        case "upsert":
          result = await (supabase.from(table as any) as any).upsert(payload).select();
          break;
      }

      if (result?.error) throw result.error;
      return result?.data as T;
    },
    onSuccess: (data) => {
      invalidateKeys.forEach((key) => {
        queryClient.invalidateQueries({ queryKey: [key] });
      });
      if (successMessage) toast.success(successMessage);
      onSuccess?.(data);
    },
    onError: (error: Error) => {
      console.error(`Erro em ${operation} ${table}:`, error);
      toast.error(errorMessage);
    },
  });
}
