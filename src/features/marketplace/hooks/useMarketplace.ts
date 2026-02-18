import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface MarketplaceTerapeuta {
  id: string;
  user_id: string;
  nome: string;
  slug: string;
  especialidades: string[];
  bio: string | null;
  foto_url: string | null;
  cidade: string;
  estado: string;
  bairros_atendimento: string[];
  atende_domicilio: boolean;
  atende_clinica: boolean;
  preco_minimo: number;
  preco_maximo: number;
  certificacoes: any[];
  experiencia_anos: number;
  media_avaliacoes: number;
  total_avaliacoes: number;
  total_atendimentos: number;
  taxa_resposta: number;
  verificado: boolean;
  destaque: boolean;
  ativo: boolean;
}

export interface MarketplaceServico {
  id: string;
  terapeuta_id: string;
  nome: string;
  descricao: string | null;
  duracao_minutos: number;
  preco: number;
  categoria: string;
}

export interface MarketplaceAvaliacao {
  id: string;
  terapeuta_id: string;
  user_id: string;
  nota: number;
  comentario: string | null;
  resposta_terapeuta: string | null;
  created_at: string;
}

export function useMarketplaceTerapeutas() {
  const [terapeutas, setTerapeutas] = useState<MarketplaceTerapeuta[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTerapeutas();
  }, []);

  const fetchTerapeutas = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("marketplace_terapeutas")
      .select("*")
      .eq("ativo", true)
      .order("destaque", { ascending: false })
      .order("media_avaliacoes", { ascending: false });

    if (!error && data) {
      setTerapeutas(data as unknown as MarketplaceTerapeuta[]);
    }
    setLoading(false);
  };

  return { terapeutas, loading, refetch: fetchTerapeutas };
}

export function useMarketplaceTerapeuta(slug: string) {
  const [terapeuta, setTerapeuta] = useState<MarketplaceTerapeuta | null>(null);
  const [servicos, setServicos] = useState<MarketplaceServico[]>([]);
  const [avaliacoes, setAvaliacoes] = useState<MarketplaceAvaliacao[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;
    fetchTerapeuta();
  }, [slug]);

  const fetchTerapeuta = async () => {
    setLoading(true);
    const { data: t } = await supabase
      .from("marketplace_terapeutas")
      .select("*")
      .eq("slug", slug)
      .eq("ativo", true)
      .single();

    if (t) {
      setTerapeuta(t as unknown as MarketplaceTerapeuta);
      
      const [servicosRes, avaliacoesRes] = await Promise.all([
        supabase.from("marketplace_servicos").select("*").eq("terapeuta_id", t.id).eq("ativo", true),
        supabase.from("marketplace_avaliacoes").select("*").eq("terapeuta_id", t.id).eq("visivel", true).order("created_at", { ascending: false }).limit(20),
      ]);

      if (servicosRes.data) setServicos(servicosRes.data as unknown as MarketplaceServico[]);
      if (avaliacoesRes.data) setAvaliacoes(avaliacoesRes.data as unknown as MarketplaceAvaliacao[]);
    }
    setLoading(false);
  };

  return { terapeuta, servicos, avaliacoes, loading };
}

export function useMarketplaceFavoritos() {
  const { user } = useAuth();
  const [favoritos, setFavoritos] = useState<string[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    if (!user) return;
    fetchFavoritos();
  }, [user]);

  const fetchFavoritos = async () => {
    if (!user) return;
    const { data } = await supabase
      .from("marketplace_favoritos")
      .select("terapeuta_id")
      .eq("user_id", user.id);
    if (data) setFavoritos(data.map((f: any) => f.terapeuta_id));
  };

  const toggleFavorito = async (terapeutaId: string) => {
    if (!user) return;
    const isFav = favoritos.includes(terapeutaId);
    
    if (isFav) {
      await supabase.from("marketplace_favoritos").delete().eq("user_id", user.id).eq("terapeuta_id", terapeutaId);
      setFavoritos(favoritos.filter(id => id !== terapeutaId));
      toast({ title: "Removido dos favoritos" });
    } else {
      await supabase.from("marketplace_favoritos").insert({ user_id: user.id, terapeuta_id: terapeutaId });
      setFavoritos([...favoritos, terapeutaId]);
      toast({ title: "Adicionado aos favoritos! ❤️" });
    }
  };

  return { favoritos, toggleFavorito };
}

export function useMarketplaceCandidatura() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);

  const submitCandidatura = async (dados: {
    nome_completo: string;
    email: string;
    telefone: string;
    cpf: string;
    especialidades: string[];
    experiencia_anos: number;
    bio: string;
    cidade: string;
    estado: string;
    bairros_atendimento: string[];
    atende_domicilio: boolean;
    preco_minimo: number;
    preco_maximo: number;
  }) => {
    if (!user) return { error: "Não autenticado" };
    setLoading(true);

    const { error } = await supabase.from("marketplace_candidaturas").insert({
      user_id: user.id,
      ...dados,
    });

    setLoading(false);
    if (error) {
      toast({ title: "Erro ao enviar candidatura", variant: "destructive" });
      return { error: error.message };
    }
    toast({ title: "Candidatura enviada! 🎉", description: "Analisaremos em até 48h." });
    return { error: null };
  };

  return { submitCandidatura, loading };
}
