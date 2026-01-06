import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

export interface Produto {
  id: string;
  nome: string;
  descricao: string | null;
  preco: number;
  imagem_url: string | null;
  categoria: string | null;
  disponivel: boolean;
  created_at: string;
  cashback_percentual: number;
}

export interface Pedido {
  id: string;
  user_id: string;
  status: string;
  total: number;
  created_at: string;
  updated_at: string;
}

export interface PedidoItem {
  id: string;
  pedido_id: string;
  produto_id: string;
  quantidade: number;
  preco_unitario: number;
}

export const useProdutos = () => {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProdutos = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("produtos")
        .select("*")
        .eq("disponivel", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setProdutos(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProdutos();
  }, []);

  return { produtos, loading, error, refetch: fetchProdutos };
};

export const usePedidos = () => {
  const { user } = useAuth();
  const [pedidos, setPedidos] = useState<Pedido[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPedidos = async () => {
    if (!user) {
      setPedidos([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      const { data, error } = await supabase
        .from("pedidos")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false });

      if (error) throw error;
      setPedidos(data || []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const createPedido = async (itens: { produto_id: string; quantidade: number; preco_unitario: number }[]) => {
    if (!user) return { error: new Error("Usuário não autenticado"), data: null };

    const total = itens.reduce((acc, item) => acc + item.preco_unitario * item.quantidade, 0);

    try {
      // Create pedido
      const { data: pedido, error: pedidoError } = await supabase
        .from("pedidos")
        .insert({
          user_id: user.id,
          total,
          status: "pendente",
        })
        .select()
        .single();

      if (pedidoError) throw pedidoError;

      // Create pedido itens
      const pedidoItens = itens.map((item) => ({
        pedido_id: pedido.id,
        produto_id: item.produto_id,
        quantidade: item.quantidade,
        preco_unitario: item.preco_unitario,
      }));

      const { error: itensError } = await supabase
        .from("pedido_itens")
        .insert(pedidoItens);

      if (itensError) throw itensError;

      await fetchPedidos();
      return { error: null, data: pedido };
    } catch (err: any) {
      return { error: err, data: null };
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, [user]);

  return { pedidos, loading, error, createPedido, refetch: fetchPedidos };
};
