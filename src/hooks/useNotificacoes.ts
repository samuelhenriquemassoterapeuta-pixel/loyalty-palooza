import { useEffect, useState } from "react";
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

export const useNotificacoes = () => {
  const { user } = useAuth();
  const [notificacoes, setNotificacoes] = useState<Notificacao[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchNotificacoes = async () => {
    if (!user) {
      setNotificacoes([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("notificacoes")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setNotificacoes(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

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
    error,
    marcarComoLida,
    marcarTodasComoLidas,
    excluirNotificacao,
    refetch: fetchNotificacoes,
  };
};
