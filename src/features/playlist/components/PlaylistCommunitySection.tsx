import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ThumbsUp, Music, Lightbulb } from "lucide-react";
import type { SugestaoDB, PlaylistDB } from "../hooks/usePlaylistDB";

interface PlaylistCommunitySectionProps {
  sugestoes: SugestaoDB[];
  popularPlaylists: PlaylistDB[];
  onVotar: (id: string) => void;
  onCurtir: (id: string) => void;
  onSugerir: () => void;
}

export function PlaylistCommunitySection({
  sugestoes,
  popularPlaylists,
  onVotar,
  onCurtir,
  onSugerir,
}: PlaylistCommunitySectionProps) {
  return (
    <div className="space-y-6">
      {/* Sugestões em votação */}
      {sugestoes.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            🗳️ Sugestões em votação
          </h2>
          <div className="space-y-2">
            {sugestoes.map((s, i) => (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm text-foreground">{s.nome}</h3>
                        {s.descricao && (
                          <p className="text-xs text-muted-foreground mt-1 line-clamp-2">{s.descricao}</p>
                        )}
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="secondary" className="text-[10px]">
                            {s.categoria || "geral"}
                          </Badge>
                        </div>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onVotar(s.id)}
                        className="gap-1 shrink-0"
                      >
                        <ThumbsUp className="h-3 w-3" />
                        {s.votos}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Populares do banco */}
      {popularPlaylists.length > 0 && (
        <section className="space-y-3">
          <h2 className="font-semibold text-foreground flex items-center gap-2">
            🔥 Mais populares
          </h2>
          <div className="space-y-2">
            {popularPlaylists.slice(0, 5).map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="border-border/50 cursor-pointer hover:shadow-md transition-all" onClick={() => onCurtir(p.id)}>
                  <CardContent className="p-3 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Music className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-foreground truncate">{p.nome}</p>
                      <p className="text-xs text-muted-foreground">{p.artista || p.categoria}</p>
                    </div>
                    <Badge variant="secondary" className="text-[10px] shrink-0">
                      {p.vezes_escolhida}x
                    </Badge>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Botão sugerir */}
      <Button variant="outline" onClick={onSugerir} className="w-full gap-2">
        <Lightbulb className="h-4 w-4" />
        Sugerir nova playlist
      </Button>
    </div>
  );
}
