import { useParams, useNavigate } from "react-router-dom";
import { ResinkraAILayout } from "@/features/resinkra-ai/components/ResinkraAILayout";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  Anchor, AlignLeft, Target, MessageSquare, Hash, Music, Star,
  Copy, CalendarPlus, Heart, Wand2, Pencil, Clock, ArrowLeft, Loader2
} from "lucide-react";
import { Button } from "@/components/ui/button";

const ScoreBar = ({ label, value, max = 10 }: { label: string; value: number; max?: number }) => (
  <div className="space-y-1">
    <div className="flex justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span className="text-primary font-mono">{value}/{max}</span>
    </div>
    <div className="h-2 bg-muted rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full gradient-primary rounded-full"
      />
    </div>
  </div>
);

const SectionCard = ({ icon: Icon, title, children, color = "text-primary" }: { icon: any; title: string; children: React.ReactNode; color?: string }) => (
  <div className="rounded-xl border border-border bg-card p-4 shadow-card">
    <div className="flex items-center gap-2 mb-3">
      <Icon className={`w-4 h-4 ${color}`} />
      <h3 className="text-sm font-semibold text-foreground">{title}</h3>
    </div>
    {children}
  </div>
);

const ResinkraAIScriptResult = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: script, isLoading } = useQuery({
    queryKey: ["script-detail", id],
    enabled: !!id && !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("scripts")
        .select("*")
        .eq("id", id!)
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const toggleFav = useMutation({
    mutationFn: async () => {
      await supabase.from("scripts").update({ is_favorite: !script?.is_favorite } as any).eq("id", id!);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["script-detail", id] }),
  });

  const copyAll = () => {
    if (!script) return;
    const parts = [
      `🎣 GANCHO:\n${script.hook}`,
      script.cta ? `\n🎯 CTA:\n${script.cta}` : "",
      script.caption ? `\n📝 LEGENDA:\n${script.caption}` : "",
      script.hashtags?.length ? `\n#️⃣ HASHTAGS:\n${(script.hashtags as string[]).join(" ")}` : "",
      script.audio_suggestion ? `\n🎵 ÁUDIO:\n${script.audio_suggestion}` : "",
    ].filter(Boolean).join("\n");
    navigator.clipboard.writeText(parts);
    toast.success("Copiado! 📋");
  };

  if (isLoading) {
    return (
      <ResinkraAILayout>
        <div className="flex items-center justify-center py-20">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </ResinkraAILayout>
    );
  }

  if (!script) {
    return (
      <ResinkraAILayout>
        <div className="text-center py-20">
          <p className="text-muted-foreground">Roteiro não encontrado</p>
          <Button variant="ghost" onClick={() => navigate("/resinkra-ai/history")} className="mt-4 text-primary">
            Ver histórico
          </Button>
        </div>
      </ResinkraAILayout>
    );
  }

  const body = script.body as any;

  return (
    <ResinkraAILayout>
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-muted-foreground hover:text-foreground hover:bg-muted/50">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-foreground font-serif">{script.topic}</h1>
              <p className="text-sm text-muted-foreground">{script.content_type} · {script.objective}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-primary font-serif">
              {script.score_total}
            </span>
            <span className="text-xs text-muted-foreground">/100</span>
          </div>
        </div>

        {/* Script Sections */}
        <div className="space-y-4">
          {script.hook && (
            <SectionCard icon={Anchor} title="GANCHO (0-3s)">
              <p className="text-foreground text-sm leading-relaxed">{script.hook}</p>
              {script.hook_visual_direction && (
                <p className="text-xs text-muted-foreground mt-2 italic">📸 {script.hook_visual_direction}</p>
              )}
            </SectionCard>
          )}

          {body && Array.isArray(body) && body.length > 0 && (
            <SectionCard icon={AlignLeft} title="DESENVOLVIMENTO">
              <div className="space-y-3">
                {body.map((part: any, i: number) => (
                  <div key={i} className="pl-3 border-l-2 border-primary/30">
                    <span className="text-[10px] text-muted-foreground font-mono">{part.timestamp}</span>
                    <p className="text-foreground text-sm">{part.speech}</p>
                    {part.visual_direction && (
                      <p className="text-xs text-muted-foreground italic">📸 {part.visual_direction}</p>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {script.cta && (
            <SectionCard icon={Target} title="CTA" color="text-accent">
              <p className="text-foreground text-sm">{script.cta}</p>
            </SectionCard>
          )}

          {script.caption && (
            <SectionCard icon={MessageSquare} title="LEGENDA" color="text-highlight">
              <p className="text-foreground text-sm whitespace-pre-line">{script.caption}</p>
            </SectionCard>
          )}

          {script.hashtags && (script.hashtags as string[]).length > 0 && (
            <SectionCard icon={Hash} title="HASHTAGS" color="text-accent">
              <div className="flex flex-wrap gap-2">
                {(script.hashtags as string[]).map((tag, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-lg bg-primary/10 text-primary">
                    #{tag.replace("#", "")}
                  </span>
                ))}
              </div>
            </SectionCard>
          )}

          {script.audio_suggestion && (
            <SectionCard icon={Music} title="SUGESTÃO DE ÁUDIO" color="text-info">
              <p className="text-foreground text-sm">{script.audio_suggestion}</p>
            </SectionCard>
          )}
        </div>

        {/* Score Analysis */}
        <div className="rounded-xl border border-border bg-card p-5 shadow-card">
          <h3 className="text-sm font-semibold text-foreground mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-accent" /> Análise do Roteiro
          </h3>
          <div className="space-y-3">
            <ScoreBar label="Gancho" value={script.score_hook} />
            <ScoreBar label="Clareza" value={script.score_clarity} />
            <ScoreBar label="CTA" value={script.score_cta} />
            <ScoreBar label="Emoção" value={script.score_emotion} />
            <ScoreBar label="Viralidade" value={script.score_virality} />
          </div>
          {script.estimated_duration_seconds > 0 && (
            <div className="flex items-center gap-2 mt-4 text-muted-foreground text-sm">
              <Clock className="w-4 h-4" />
              Tempo estimado: ~{script.estimated_duration_seconds}s
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          <Button
            variant="outline"
            onClick={() => toggleFav.mutate()}
            className={`border-border text-sm ${script.is_favorite ? "text-accent" : "text-muted-foreground"} hover:bg-muted/50`}
          >
            <Heart className={`w-4 h-4 mr-1 ${script.is_favorite ? "fill-accent" : ""}`} />
            {script.is_favorite ? "Favorito" : "Favoritar"}
          </Button>
          <Button variant="outline" className="border-border text-muted-foreground text-sm hover:bg-muted/50">
            <CalendarPlus className="w-4 h-4 mr-1" /> Agendar
          </Button>
          <Button variant="outline" onClick={copyAll} className="border-border text-muted-foreground text-sm hover:bg-muted/50">
            <Copy className="w-4 h-4 mr-1" /> Copiar
          </Button>
          <Button variant="outline" className="border-border text-muted-foreground text-sm hover:bg-muted/50">
            <Wand2 className="w-4 h-4 mr-1" /> Variação
          </Button>
          <Button variant="outline" className="border-border text-muted-foreground text-sm hover:bg-muted/50">
            <Pencil className="w-4 h-4 mr-1" /> Editar
          </Button>
        </div>
      </div>
    </ResinkraAILayout>
  );
};

export default ResinkraAIScriptResult;
