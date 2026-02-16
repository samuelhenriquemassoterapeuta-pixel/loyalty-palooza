import { useState } from "react";
import { ResinkraAILayout } from "@/components/resinkra-ai/ResinkraAILayout";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Lightbulb, Sparkles, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const funnelStages = [
  { value: "all", label: "Todos", color: "" },
  { value: "topo", label: "🔝 Topo", color: "bg-info/10 text-info" },
  { value: "meio", label: "🔄 Meio", color: "bg-primary/10 text-primary" },
  { value: "fundo", label: "💰 Fundo", color: "bg-highlight/10 text-highlight" },
];

const ResinkraAIIdeas = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [filter, setFilter] = useState("all");

  const { data: ideas = [] } = useQuery({
    queryKey: ["resinkra-ideas", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("content_ideas")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false });
      return data || [];
    },
  });

  const { data: brandProfile } = useQuery({
    queryKey: ["brand-profile-full", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("brand_profiles").select("*").eq("user_id", user!.id).limit(1).maybeSingle();
      return data;
    },
  });

  const generate = useMutation({
    mutationFn: async () => {
      const { data, error } = await supabase.functions.invoke("generate-ideas", {
        body: { brand_profile: brandProfile },
      });
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resinkra-ideas"] });
      toast.success("Novas ideias geradas! 💡");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const markUsed = useMutation({
    mutationFn: async (id: string) => {
      await supabase.from("content_ideas").update({ is_used: true } as any).eq("id", id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["resinkra-ideas"] }),
  });

  const filtered = filter === "all" ? ideas : ideas.filter((i: any) => i.funnel_stage === filter);

  return (
    <ResinkraAILayout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <h1 className="text-2xl font-bold text-foreground font-serif flex items-center gap-2">
            <Lightbulb className="w-6 h-6 text-primary" /> Banco de Ideias
          </h1>
          <Button
            onClick={() => generate.mutate()}
            disabled={generate.isPending}
            className="btn-premium"
          >
            {generate.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Sparkles className="w-4 h-4 mr-2" />}
            Gerar Ideias
          </Button>
        </div>

        {/* Funnel Filter */}
        <div className="flex gap-2">
          {funnelStages.map(s => (
            <button
              key={s.value}
              onClick={() => setFilter(s.value)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
                filter === s.value ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground hover:text-foreground"
              )}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* Ideas List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filtered.map((idea: any, i: number) => (
            <motion.div
              key={idea.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              className={cn(
                "rounded-xl border border-border bg-card p-4 shadow-card",
                idea.is_used && "opacity-50"
              )}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <p className="text-sm font-semibold text-foreground">{idea.title}</p>
                  {idea.description && <p className="text-xs text-muted-foreground mt-1">{idea.description}</p>}
                </div>
                {!idea.is_used && (
                  <button
                    onClick={() => markUsed.mutate(idea.id)}
                    className="p-1.5 rounded-lg hover:bg-muted text-muted-foreground hover:text-highlight transition-colors"
                  >
                    <Check className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex gap-2 mt-3">
                {idea.funnel_stage && (
                  <span className={cn("text-[10px] px-2 py-0.5 rounded-full", funnelStages.find(s => s.value === idea.funnel_stage)?.color)}>
                    {idea.funnel_stage}
                  </span>
                )}
                {idea.content_type && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground">{idea.content_type}</span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <Lightbulb className="w-12 h-12 text-muted-foreground/50 mx-auto mb-3" />
            <p className="text-muted-foreground">Nenhuma ideia ainda. Clique em "Gerar Ideias" para começar!</p>
          </div>
        )}
      </div>
    </ResinkraAILayout>
  );
};

export default ResinkraAIIdeas;
