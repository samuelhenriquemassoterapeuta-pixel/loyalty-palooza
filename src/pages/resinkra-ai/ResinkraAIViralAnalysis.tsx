import { useState } from "react";
import { ResinkraAILayout } from "@/components/resinkra-ai/ResinkraAILayout";
import { useAuth } from "@/contexts/AuthContext";
import { useMutation, useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Sparkles, Loader2, TrendingUp, Zap, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

const ResinkraAIViralAnalysis = () => {
  const { user } = useAuth();
  const [content, setContent] = useState("");
  const [result, setResult] = useState<any>(null);

  const { data: brandProfile } = useQuery({
    queryKey: ["brand-profile-full", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("brand_profiles").select("*").eq("user_id", user!.id).limit(1).maybeSingle();
      return data;
    },
  });

  const analyze = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("analyze-viral", {
        body: { brand_profile: brandProfile, original_content: content },
      });
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data) => {
      setResult(data);
      toast.success("Análise concluída! 📊");
    },
    onError: (err: any) => toast.error(err.message),
  });

  return (
    <ResinkraAILayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <TrendingUp className="w-6 h-6 text-violet-400" /> Análise Viral
        </h1>
        <p className="text-gray-400 text-sm">Cole o texto de um conteúdo viral e descubra por que funcionou.</p>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
          <div>
            <Label className="text-gray-300 text-sm">Conteúdo para analisar *</Label>
            <Textarea
              value={content}
              onChange={e => setContent(e.target.value)}
              placeholder="Cole aqui o texto/roteiro de um conteúdo viral..."
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 mt-1 min-h-[150px]"
            />
          </div>
          <Button
            onClick={() => analyze.mutate()}
            disabled={!content.trim() || analyze.isPending}
            className="w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white py-5"
          >
            {analyze.isPending ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Sparkles className="w-5 h-5 mr-2" />}
            Analisar Conteúdo
          </Button>
        </div>

        {result && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
            {/* Score */}
            <div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
              <p className="text-4xl font-bold bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">
                {result.overall_score}/100
              </p>
              <p className="text-sm text-gray-400 mt-1">Score de viralidade</p>
            </div>

            {/* Takeaways */}
            {result.key_takeaways?.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <Zap className="w-4 h-4 text-amber-400" /> Takeaways
                </h3>
                <ul className="space-y-2">
                  {result.key_takeaways.map((t: string, i: number) => (
                    <li key={i} className="text-sm text-gray-300 flex items-start gap-2">
                      <span className="text-violet-400 mt-0.5">•</span> {t}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Emotional triggers */}
            {result.emotional_triggers?.length > 0 && (
              <div className="rounded-xl border border-white/10 bg-white/5 p-5">
                <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                  <Target className="w-4 h-4 text-emerald-400" /> Gatilhos Emocionais
                </h3>
                <div className="flex flex-wrap gap-2">
                  {result.emotional_triggers.map((t: string, i: number) => (
                    <span key={i} className="text-xs px-2.5 py-1 rounded-lg bg-emerald-500/10 text-emerald-300">{t}</span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </ResinkraAILayout>
  );
};

export default ResinkraAIViralAnalysis;
