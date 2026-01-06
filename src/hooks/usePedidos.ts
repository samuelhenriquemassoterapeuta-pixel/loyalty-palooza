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

export interface PedidoItemComProduto {
  id: string;
  pedido_id: string;
  produto_id: string;
  quantidade: number;
  preco_unitario: number;
  produtos: {
    nome: string;
    imagem_url: string | null;
  } | null;
}

export interface Pedido {
  id: string;
  user_id: string;
  status: string;
  total: number;
  created_at: string;
  updated_at: string;
  pedido_itens?: PedidoItemComProduto[];
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
        .select(`
          *,
          pedido_itens (
            id,
            pedido_id,
            produto_id,
            quantidade,
            preco_unitario,
            produtos (
              nome,
              imagem_url
            )
          )
        `)
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

  const createPedido = async (
    itens: { produto_id: string; quantidade: number; preco_unitario: number }[],
    totalComDesconto?: number
  ) => {
    if (!user) return { error: new Error("Usuário não autenticado"), data: null, pedidoId: null };

    // Se totalComDesconto foi passado, usa ele; caso contrário, calcula normalmente
    const total = totalComDesconto !== undefined 
      ? totalComDesconto 
      : itens.reduce((acc, item) => acc + item.preco_unitario * item.quantidade, 0);

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
      return { error: null, data: pedido, pedidoId: pedido.id };
    } catch (err: any) {
      return { error: err, data: null, pedidoId: null };
    }
  };

  const cancelPedido = async (pedidoId: string) => {
    if (!user) return { error: new Error("Usuário não autenticado") };

    try {
      const { error } = await supabase
        .from("pedidos")
        .update({ status: "cancelado" })
        .eq("id", pedidoId)
        .eq("user_id", user.id);

      if (error) throw error;
      await fetchPedidos();
      return { error: null };
    } catch (err: any) {
      return { error: err };
    }
  };

  useEffect(() => {
    fetchPedidos();
  }, [user]);

  return { pedidos, loading, error, createPedido, cancelPedido, refetch: fetchPedidos };
};
