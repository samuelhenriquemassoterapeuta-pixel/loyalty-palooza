import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

export interface PlaylistDB {
  id: string;
  nome: string;
  descricao: string | null;
  categoria: string;
  capa_url: string | null;
  youtube_id: string | null;
  artista: string | null;
  frequencia: number | null;
  sugerida_por: string | null;
  data_sugestao: string | null;
  vezes_escolhida: number;
  ativa: boolean;
  created_at: string;
}

export interface SugestaoDB {
  id: string;
  usuario_id: string;
  nome: string;
  descricao: string | null;
  link: string;
  categoria: string | null;
  justificativa: string | null;
  status: string;
  votos: number;
  created_at: string;
}

export function usePlaylistDB(categoriaFiltro: string) {
  const { user } = useAuth();
  const [playlists, setPlaylists] = useState<PlaylistDB[]>([]);
  const [sugestoes, setSugestoes] = useState<SugestaoDB[]>([]);
  const [loading, setLoading] = useState(true);

  const loadData = useCallback(async () => {
    setLoading(true);

    let query = supabase
      .from("playlists")
      .select("*")
      .eq("ativa", true);

    if (categoriaFiltro !== "todos") {
      query = query.eq("categoria", categoriaFiltro);
    }

    const { data: playlistsData } = await query.order("vezes_escolhida", { ascending: false });
    setPlaylists((playlistsData as PlaylistDB[]) || []);

    const { data: sugestoesData } = await supabase
      .from("sugestoes_playlist")
      .select("*")
      .eq("status", "pendente")
      .order("votos", { ascending: false });
    setSugestoes((sugestoesData as SugestaoDB[]) || []);

    setLoading(false);
  }, [categoriaFiltro]);

  useEffect(() => {
    if (user) loadData();
  }, [user, loadData]);

  const votar = async (sugestaoId: string) => {
    if (!user) return;

    const { data: existing } = await supabase
      .from("votos_sugestoes")
      .select("id")
      .eq("sugestao_id", sugestaoId)
      .eq("usuario_id", user.id)
      .maybeSingle();

    if (existing) {
      toast({ title: "Você já votou nesta sugestão", variant: "destructive" });
      return;
    }

    const { error } = await supabase
      .from("votos_sugestoes")
      .insert({ sugestao_id: sugestaoId, usuario_id: user.id });

    if (error) {
      toast({ title: "Erro ao votar", variant: "destructive" });
      return;
    }

    await supabase.rpc("incrementar_voto_sugestao", { sugestao_id: sugestaoId });
    toast({ title: "Voto registrado! 🗳️" });
    loadData();
  };

  const curtir = async (playlistId: string) => {
    if (!user) return;

    await supabase.from("avaliacoes_playlist").insert({
      playlist_id: playlistId,
      usuario_id: user.id,
      gostou: true,
    });
    toast({ title: "Playlist curtida! ❤️" });
  };

  return { playlists, sugestoes, loading, loadData, votar, curtir };
}
