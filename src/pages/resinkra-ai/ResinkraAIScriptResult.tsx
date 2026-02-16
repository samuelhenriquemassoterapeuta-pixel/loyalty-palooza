import { useParams, useNavigate } from "react-router-dom";
import { ResinkraAILayout } from "@/components/resinkra-ai/ResinkraAILayout";
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
      <span className="text-gray-400">{label}</span>
      <span className="text-violet-300 font-mono">{value}/{max}</span>
    </div>
    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
      <motion.div
        initial={{ width: 0 }}
        animate={{ width: `${(value / max) * 100}%` }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
      />
    </div>
  </div>
);

const SectionCard = ({ icon: Icon, title, children, color = "text-violet-400" }: { icon: any; title: string; children: React.ReactNode; color?: string }) => (
  <div className="rounded-xl border border-white/10 bg-white/5 p-4">
    <div className="flex items-center gap-2 mb-3">
      <Icon className={`w-4 h-4 ${color}`} />
      <h3 className="text-sm font-semibold text-gray-300">{title}</h3>
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
          <Loader2 className="w-8 h-8 animate-spin text-violet-400" />
        </div>
      </ResinkraAILayout>
    );
  }

  if (!script) {
    return (
      <ResinkraAILayout>
        <div className="text-center py-20">
          <p className="text-gray-400">Roteiro não encontrado</p>
          <Button variant="ghost" onClick={() => navigate("/resinkra-ai/history")} className="mt-4 text-violet-400">
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
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="text-gray-400 hover:text-white hover:bg-white/5">
              <ArrowLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-xl font-bold text-white">{script.topic}</h1>
              <p className="text-sm text-gray-400">{script.content_type} · {script.objective}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
              {script.score_total}
            </span>
            <span className="text-xs text-gray-500">/100</span>
          </div>
        </div>

        {/* Script Sections */}
        <div className="space-y-4">
          {script.hook && (
            <SectionCard icon={Anchor} title="GANCHO (0-3s)">
              <p className="text-white text-sm leading-relaxed">{script.hook}</p>
              {script.hook_visual_direction && (
                <p className="text-xs text-gray-500 mt-2 italic">📸 {script.hook_visual_direction}</p>
              )}
            </SectionCard>
          )}

          {body && Array.isArray(body) && body.length > 0 && (
            <SectionCard icon={AlignLeft} title="DESENVOLVIMENTO">
              <div className="space-y-3">
                {body.map((part: any, i: number) => (
                  <div key={i} className="pl-3 border-l-2 border-violet-500/30">
                    <span className="text-[10px] text-gray-500 font-mono">{part.timestamp}</span>
                    <p className="text-white text-sm">{part.speech}</p>
                    {part.visual_direction && (
                      <p className="text-xs text-gray-500 italic">📸 {part.visual_direction}</p>
                    )}
                  </div>
                ))}
              </div>
            </SectionCard>
          )}

          {script.cta && (
            <SectionCard icon={Target} title="CTA" color="text-blue-400">
              <p className="text-white text-sm">{script.cta}</p>
            </SectionCard>
          )}

          {script.caption && (
            <SectionCard icon={MessageSquare} title="LEGENDA" color="text-emerald-400">
              <p className="text-white text-sm whitespace-pre-line">{script.caption}</p>
            </SectionCard>
          )}

          {script.hashtags && (script.hashtags as string[]).length > 0 && (
            <SectionCard icon={Hash} title="HASHTAGS" color="text-amber-400">
              <div className="flex flex-wrap gap-2">
                {(script.hashtags as string[]).map((tag, i) => (
                  <span key={i} className="text-xs px-2 py-1 rounded-lg bg-violet-500/10 text-violet-300">
                    #{tag.replace("#", "")}
                  </span>
                ))}
              </div>
            </SectionCard>
          )}

          {script.audio_suggestion && (
            <SectionCard icon={Music} title="SUGESTÃO DE ÁUDIO" color="text-pink-400">
              <p className="text-white text-sm">{script.audio_suggestion}</p>
            </SectionCard>
          )}
        </div>

        {/* Score Analysis */}
        <div className="rounded-xl border border-white/10 bg-white/5 p-5">
          <h3 className="text-sm font-semibold text-gray-300 mb-4 flex items-center gap-2">
            <Star className="w-4 h-4 text-amber-400" /> Análise do Roteiro
          </h3>
          <div className="space-y-3">
            <ScoreBar label="Gancho" value={script.score_hook} />
            <ScoreBar label="Clareza" value={script.score_clarity} />
            <ScoreBar label="CTA" value={script.score_cta} />
            <ScoreBar label="Emoção" value={script.score_emotion} />
            <ScoreBar label="Viralidade" value={script.score_virality} />
          </div>
          {script.estimated_duration_seconds > 0 && (
            <div className="flex items-center gap-2 mt-4 text-gray-400 text-sm">
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
            className={`border-white/10 text-sm ${script.is_favorite ? "text-amber-400" : "text-gray-400"} hover:bg-white/5`}
          >
            <Heart className={`w-4 h-4 mr-1 ${script.is_favorite ? "fill-amber-400" : ""}`} />
            {script.is_favorite ? "Favorito" : "Favoritar"}
          </Button>
          <Button variant="outline" className="border-white/10 text-gray-400 text-sm hover:bg-white/5">
            <CalendarPlus className="w-4 h-4 mr-1" /> Agendar
          </Button>
          <Button variant="outline" onClick={copyAll} className="border-white/10 text-gray-400 text-sm hover:bg-white/5">
            <Copy className="w-4 h-4 mr-1" /> Copiar
          </Button>
          <Button variant="outline" className="border-white/10 text-gray-400 text-sm hover:bg-white/5">
            <Wand2 className="w-4 h-4 mr-1" /> Variação
          </Button>
          <Button variant="outline" className="border-white/10 text-gray-400 text-sm hover:bg-white/5">
            <Pencil className="w-4 h-4 mr-1" /> Editar
          </Button>
        </div>
      </div>
    </ResinkraAILayout>
  );
};

export default ResinkraAIScriptResult;
