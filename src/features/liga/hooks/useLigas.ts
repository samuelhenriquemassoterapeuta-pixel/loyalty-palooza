import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useToast } from "@/hooks/use-toast";

export interface Liga {
  id: string;
  nome: string;
  descricao: string | null;
  tipo: string;
  data_inicio: string;
  data_fim: string;
  ativa: boolean;
  premio_1: string | null;
  premio_2: string | null;
  premio_3: string | null;
  premio_1_valor: number;
  premio_2_valor: number;
  premio_3_valor: number;
  criterio: string;
  icone: string;
  cor: string;
}

export interface LigaParticipante {
  id: string;
  liga_id: string;
  user_id: string;
  pontos: number;
  sessoes: number;
  compras: number;
  indicacoes: number;
  posts_social: number;
  posicao: number | null;
  premiado: boolean;
  profiles?: { nome: string | null; foto_url: string | null } | null;
}

export function useLigas() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [ligas, setLigas] = useState<Liga[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLigas();
  }, []);

  const fetchLigas = async () => {
    const { data } = await supabase
      .from("ligas")
      .select("*")
      .eq("ativa", true)
      .order("data_fim", { ascending: true });
    if (data) setLigas(data as unknown as Liga[]);
    setLoading(false);
  };

  return { ligas, loading };
}

export function useLigaRanking(ligaId: string) {
  const { user } = useAuth();
  const { toast } = useToast();
  const [ranking, setRanking] = useState<LigaParticipante[]>([]);
  const [isParticipating, setIsParticipating] = useState(false);
  const [loading, setLoading] = useState(true);
  const [joining, setJoining] = useState(false);

  useEffect(() => {
    if (!ligaId) return;
    fetchRanking();

    // Realtime
    const channel = supabase
      .channel(`liga-${ligaId}`)
      .on("postgres_changes", { event: "*", schema: "public", table: "liga_participantes", filter: `liga_id=eq.${ligaId}` }, () => {
        fetchRanking();
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  }, [ligaId, user]);

  const fetchRanking = async () => {
    const { data } = await supabase
      .from("liga_participantes")
      .select("*, profiles:user_id(nome, foto_url)")
      .eq("liga_id", ligaId)
      .order("pontos", { ascending: false });

    if (data) {
      const ranked = (data as unknown as LigaParticipante[]).map((p, i) => ({ ...p, posicao: i + 1 }));
      setRanking(ranked);
      if (user) setIsParticipating(ranked.some(p => p.user_id === user.id));
    }
    setLoading(false);
  };

  const joinLiga = async () => {
    if (!user) return;
    setJoining(true);
    const { error } = await supabase.from("liga_participantes").insert({
      liga_id: ligaId,
      user_id: user.id,
    });
    if (error) {
      toast({ title: "Erro ao participar", variant: "destructive" });
    } else {
      toast({ title: "Você entrou na liga! 🏆" });
      await fetchRanking();
    }
    setJoining(false);
  };

  return { ranking, isParticipating, loading, joining, joinLiga };
}
