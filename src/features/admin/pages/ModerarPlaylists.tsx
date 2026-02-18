import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { AppLayout } from "@/components/AppLayout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { CheckCircle, XCircle, Music, ThumbsUp, ExternalLink } from "lucide-react";

interface Sugestao {
  id: string;
  nome: string;
  descricao: string | null;
  link: string;
  categoria: string | null;
  justificativa: string | null;
  votos: number;
  created_at: string;
  usuario_id: string;
}

export default function ModerarPlaylists() {
  const { user } = useAuth();
  const [sugestoes, setSugestoes] = useState<Sugestao[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    loadSugestoes();
  }, []);

  const loadSugestoes = async () => {
    setLoading(true);
    const { data } = await supabase
      .from("sugestoes_playlist")
      .select("*")
      .eq("status", "pendente")
      .order("votos", { ascending: false });
    setSugestoes((data as Sugestao[]) || []);
    setLoading(false);
  };

  const handleAprovar = async (sugestao: Sugestao) => {
    if (!user) return;
    setProcessing(sugestao.id);

    const { error: insertError } = await supabase
      .from("playlists")
      .insert({
        nome: sugestao.nome,
        descricao: sugestao.descricao,
        categoria: sugestao.categoria || "relaxante",
        sugerida_por: sugestao.usuario_id,
        data_sugestao: sugestao.created_at,
      });

    if (insertError) {
      toast({ title: "Erro ao criar playlist", description: insertError.message, variant: "destructive" });
      setProcessing(null);
      return;
    }

    await supabase
      .from("sugestoes_playlist")
      .update({
        status: "aprovada",
        moderado_por: user.id,
        moderated_at: new Date().toISOString(),
      })
      .eq("id", sugestao.id);

    toast({ title: "Sugestão aprovada! ✅", description: "Playlist adicionada ao acervo." });
    setProcessing(null);
    loadSugestoes();
  };

  const handleRejeitar = async (sugestao: Sugestao) => {
    if (!user) return;
    setProcessing(sugestao.id);

    await supabase
      .from("sugestoes_playlist")
      .update({
        status: "rejeitada",
        moderado_por: user.id,
        moderated_at: new Date().toISOString(),
      })
      .eq("id", sugestao.id);

    toast({ title: "Sugestão rejeitada" });
    setProcessing(null);
    loadSugestoes();
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6">
        <div className="flex items-center gap-3">
          <Music className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-bold text-foreground">Moderação de Playlists</h1>
          <Badge variant="secondary">{sugestoes.length} pendentes</Badge>
        </div>

        {loading ? (
          <div className="flex justify-center py-12"><LoadingSpinner /></div>
        ) : sugestoes.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center text-muted-foreground">
              Nenhuma sugestão pendente 🎉
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {sugestoes.map((s) => (
              <Card key={s.id} className="border-border/50">
                <CardContent className="p-4 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-foreground">{s.nome}</h3>
                      {s.descricao && (
                        <p className="text-sm text-muted-foreground mt-1">{s.descricao}</p>
                      )}
                    </div>
                    <Badge variant="outline" className="shrink-0 gap-1">
                      <ThumbsUp className="h-3 w-3" /> {s.votos}
                    </Badge>
                  </div>

                  <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                    {s.categoria && <Badge variant="secondary">{s.categoria}</Badge>}
                    <a
                      href={s.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-primary hover:underline"
                    >
                      <ExternalLink className="h-3 w-3" /> Abrir link
                    </a>
                  </div>

                  {s.justificativa && (
                    <p className="text-sm text-muted-foreground italic border-l-2 border-primary/30 pl-3">
                      "{s.justificativa}"
                    </p>
                  )}

                  <div className="flex gap-2 pt-1">
                    <Button
                      size="sm"
                      onClick={() => handleAprovar(s)}
                      disabled={processing === s.id}
                      className="gap-1"
                    >
                      <CheckCircle className="h-4 w-4" /> Aprovar
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleRejeitar(s)}
                      disabled={processing === s.id}
                      className="gap-1 text-destructive hover:text-destructive"
                    >
                      <XCircle className="h-4 w-4" /> Rejeitar
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
}
