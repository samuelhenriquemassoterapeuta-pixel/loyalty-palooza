import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { CheckCircle2, XCircle, Clock, ExternalLink, Camera, Image, Video } from "lucide-react";

const TIPO_ICONS: Record<string, typeof Camera> = { story: Camera, feed: Image, reels: Video };

const SocialPostsTab = () => {
  const queryClient = useQueryClient();
  const [motivoRejeicao, setMotivoRejeicao] = useState<Record<string, string>>({});

  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["admin-social-posts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_posts")
        .select("*, profiles:user_id(nome)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const handleAprovar = async (postId: string) => {
    try {
      const { error } = await supabase
        .from("social_posts")
        .update({ status: "aprovado", aprovado_em: new Date().toISOString() })
        .eq("id", postId);
      if (error) throw error;
      toast.success("Post aprovado! Cashback creditado automaticamente.");
      queryClient.invalidateQueries({ queryKey: ["admin-social-posts"] });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const handleRejeitar = async (postId: string) => {
    const motivo = motivoRejeicao[postId]?.trim();
    if (!motivo) {
      toast.error("Informe o motivo da rejeição");
      return;
    }
    try {
      const { error } = await supabase
        .from("social_posts")
        .update({ status: "rejeitado", motivo_rejeicao: motivo })
        .eq("id", postId);
      if (error) throw error;
      toast.success("Post rejeitado.");
      queryClient.invalidateQueries({ queryKey: ["admin-social-posts"] });
    } catch (err: any) {
      toast.error(err.message);
    }
  };

  const pendentes = posts.filter((p: any) => p.status === "pendente");
  const processados = posts.filter((p: any) => p.status !== "pendente");

  const renderPost = (post: any, showActions: boolean) => {
    const Icon = TIPO_ICONS[post.tipo_post] || Camera;
    return (
      <div key={post.id} className="p-4 rounded-2xl glass-card-strong space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-primary/10">
              <Icon size={18} className="text-primary" />
            </div>
            <div>
              <p className="font-medium text-foreground text-sm">
                {(post.profiles as any)?.nome || "Usuário"} 
                <span className="text-muted-foreground font-normal"> · {post.tipo_post} · {post.plataforma}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(post.created_at).toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "2-digit", hour: "2-digit", minute: "2-digit" })}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {post.status === "aprovado" && (
              <Badge className="bg-highlight/15 text-highlight text-[10px]">
                <CheckCircle2 size={12} className="mr-1" /> Aprovado
              </Badge>
            )}
            {post.status === "rejeitado" && (
              <Badge variant="destructive" className="text-[10px]">
                <XCircle size={12} className="mr-1" /> Rejeitado
              </Badge>
            )}
            {post.status === "pendente" && (
              <Badge variant="outline" className="text-warning border-warning/30 text-[10px]">
                <Clock size={12} className="mr-1" /> Pendente
              </Badge>
            )}
          </div>
        </div>

        {post.link_post && (
          <a href={post.link_post} target="_blank" rel="noopener noreferrer" className="text-xs text-primary hover:underline flex items-center gap-1">
            <ExternalLink size={12} /> Ver post
          </a>
        )}

        {post.descricao && <p className="text-xs text-muted-foreground">{post.descricao}</p>}

        {showActions && (
          <div className="flex items-center gap-2 pt-2 border-t border-border/50">
            <Button size="sm" onClick={() => handleAprovar(post.id)} className="gap-1">
              <CheckCircle2 size={14} /> Aprovar
            </Button>
            <div className="flex-1 flex gap-2">
              <Input
                placeholder="Motivo da rejeição..."
                value={motivoRejeicao[post.id] || ""}
                onChange={(e) => setMotivoRejeicao((prev) => ({ ...prev, [post.id]: e.target.value }))}
                className="text-xs h-9"
              />
              <Button size="sm" variant="destructive" onClick={() => handleRejeitar(post.id)} className="gap-1 shrink-0">
                <XCircle size={14} /> Rejeitar
              </Button>
            </div>
          </div>
        )}

        {post.motivo_rejeicao && !showActions && (
          <p className="text-xs text-destructive bg-destructive/10 p-2 rounded-lg">Motivo: {post.motivo_rejeicao}</p>
        )}
      </div>
    );
  };

  if (isLoading) return <p className="text-center text-muted-foreground py-8">Carregando...</p>;

  return (
    <div className="space-y-6">
      {/* Pendentes */}
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-foreground">Pendentes</h3>
          {pendentes.length > 0 && (
            <Badge variant="outline" className="text-warning border-warning/30">{pendentes.length}</Badge>
          )}
        </div>
        {pendentes.length === 0 ? (
          <p className="text-sm text-muted-foreground py-4 text-center">Nenhum post pendente de aprovação</p>
        ) : (
          <div className="space-y-2">{pendentes.map((p: any) => renderPost(p, true))}</div>
        )}
      </div>

      {/* Processados */}
      {processados.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-lg font-semibold text-foreground">Processados</h3>
          <div className="space-y-2">{processados.slice(0, 20).map((p: any) => renderPost(p, false))}</div>
        </div>
      )}
    </div>
  );
};

export default SocialPostsTab;
