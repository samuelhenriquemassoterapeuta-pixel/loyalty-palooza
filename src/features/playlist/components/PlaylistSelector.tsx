import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Music, Check, Headphones } from "lucide-react";
import { motion } from "framer-motion";

interface PlaylistOption {
  id: string;
  nome: string;
  descricao: string | null;
  categoria: string;
  capa_url: string | null;
  vezes_escolhida: number;
}

interface PlaylistSelectorProps {
  onSelect: (playlistId: string | null) => void;
  selectedId: string | null;
  servicoId?: string;
}

export const PlaylistSelector = ({ onSelect, selectedId, servicoId }: PlaylistSelectorProps) => {
  const [playlists, setPlaylists] = useState<PlaylistOption[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaylists = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("playlists")
        .select("id, nome, descricao, categoria, capa_url, vezes_escolhida")
        .eq("ativa", true)
        .order("vezes_escolhida", { ascending: false })
        .limit(20);
      setPlaylists(data || []);
      setLoading(false);
    };
    fetchPlaylists();
  }, [servicoId]);

  if (loading) {
    return (
      <div className="space-y-2">
        <p className="section-label px-1 flex items-center gap-2">
          <Headphones size={16} /> Trilha sonora (opcional)
        </p>
        <div className="grid grid-cols-1 gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 rounded-xl bg-muted animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  if (playlists.length === 0) return null;

  return (
    <div className="space-y-2">
      <p className="section-label px-1 flex items-center gap-2">
        <Headphones size={16} /> Trilha sonora (opcional)
      </p>
      <p className="text-xs text-muted-foreground px-1">
        Escolha uma playlist para acompanhar sua sessão
      </p>

      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
        {playlists.map((pl, i) => (
          <motion.div
            key={pl.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
          >
            <Card
              className={`cursor-pointer transition-all ${
                selectedId === pl.id
                  ? "ring-2 ring-primary bg-primary/5"
                  : "hover:bg-muted/30"
              }`}
              onClick={() => onSelect(selectedId === pl.id ? null : pl.id)}
            >
              <CardContent className="p-3 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <Music size={18} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{pl.nome}</p>
                  {pl.descricao && (
                    <p className="text-xs text-muted-foreground truncate">{pl.descricao}</p>
                  )}
                </div>
                <Badge variant="secondary" className="text-[10px] shrink-0">
                  {pl.categoria}
                </Badge>
                {selectedId === pl.id && (
                  <Check size={18} className="text-primary shrink-0" />
                )}
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {selectedId && (
        <button
          onClick={() => onSelect(null)}
          className="text-xs text-muted-foreground hover:text-foreground transition-colors px-1"
        >
          Remover seleção
        </button>
      )}
    </div>
  );
};
