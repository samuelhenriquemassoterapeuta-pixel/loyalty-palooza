import { useEffect, useState, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Notificacao {
  id: string;
  user_id: string;
  titulo: string;
  mensagem: string;
  tipo: string;
  lida: boolean;
  created_at: string;
}

const PAGE_SIZE = 10;

export const useNotificacoes = () => {
  const { user } = useAuth();
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotificacoes = async (reset = true) => {
    if (!user) {
      setNotificacoes([]);
      setLoading(false);
      return;
    }

    try {
      if (reset) {
        setLoading(true);
        setHasMore(true);
      } else {
        setLoadingMore(true);
      }

      const offset = reset ? 0 : notificacoes.length;

      const { data, error } = await supabase
        .from("notificacoes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .range(offset, offset + PAGE_SIZE - 1);

      if (error) throw error;

      const newData = data || [];
      
      if (reset) {
        setNotificacoes(newData);
      } else {
        setNotificacoes(prev => [...prev, ...newData]);
      }

      setHasMore(newData.length === PAGE_SIZE);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const loadMore = useCallback(() => {
    if (!loadingMore && hasMore) {
      fetchNotificacoes(false);
    }
  }, [loadingMore, hasMore, notificacoes.length]);

  const marcarComoLida = async (id: string) => {
    if (!user) return { error: new Error("Usuário não autenticado") };

    try {
      const { error } = await supabase
        .from("notificacoes")
        .update({ lida: true })
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;
      
      setNotificacoes(prev => 
        prev.map(n => n.id === id ? { ...n, lida: true } : n)
      );
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const marcarTodasComoLidas = async () => {
    if (!user) return { error: new Error("Usuário não autenticado") };

    try {
      const { error } = await supabase
        .from("notificacoes")
        .update({ lida: true })
        .eq("user_id", user.id)
        .eq("lida", false);

      if (error) throw error;
      
      setNotificacoes(prev => prev.map(n => ({ ...n, lida: true })));
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const excluirNotificacao = async (id: string) => {
    if (!user) return { error: new Error("Usuário não autenticado") };

    try {
      const { error } = await supabase
        .from("notificacoes")
        .delete()
        .eq("id", id)
        .eq("user_id", user.id);

      if (error) throw error;
      
      setNotificacoes(prev => prev.filter(n => n.id !== id));
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const excluirTodasNotificacoes = async () => {
    if (!user) return { error: new Error("Usuário não autenticado") };

    try {
      const { error } = await supabase
        .from("notificacoes")
        .delete()
        .eq("user_id", user.id);

      if (error) throw error;
      
      setNotificacoes([]);
      setHasMore(false);
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  const naoLidas = notificacoes.filter(n => !n.lida);

  useEffect(() => {
    fetchNotificacoes();
  }, [user]);

  // Realtime subscription
  useEffect(() => {
    if (!user) return;

    const channel = supabase
      .channel('notificacoes-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notificacoes',
          filter: `user_id=eq.${user.id}`
        },
        (payload) => {
          setNotificacoes(prev => [payload.new as Notificacao, ...prev]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [user]);

  return {
    notificacoes,
    naoLidas,
    loading,
    loadingMore,
    hasMore,
    error,
    marcarComoLida,
    marcarTodasComoLidas,
    excluirNotificacao,
    excluirTodasNotificacoes,
    loadMore,
    refetch: () => fetchNotificacoes(true),
  };
};
