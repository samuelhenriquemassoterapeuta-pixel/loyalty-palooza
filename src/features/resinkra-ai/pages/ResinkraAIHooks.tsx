import { useState } from "react";
import { ResinkraAILayout } from "@/features/resinkra-ai/components/ResinkraAILayout";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Anchor, Sparkles, Loader2, Zap, Copy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const categories = [
  { value: "curiosidade", label: "🔍 Curiosidade" },
  { value: "polemica", label: "🔥 Polêmica" },
  { value: "autoridade", label: "👑 Autoridade" },
  { value: "storytelling", label: "📖 Storytelling" },
  { value: "identificacao", label: "🤝 Identificação" },
  { value: "choque", label: "⚡ Choque" },
  { value: "pergunta", label: "❓ Pergunta" },
  { value: "desafio", label: "🎯 Desafio" },
];

const ResinkraAIHooks = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const [topic, setTopic] = useState("");
  const [category, setCategory] = useState("curiosidade");
  const [quantity, setQuantity] = useState(10);

  const { data: hooks = [] } = useQuery({
    queryKey: ["resinkra-hooks", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("hooks")
        .select("*")
        .eq("user_id", user!.id)
        .order("created_at", { ascending: false })
        .limit(50);
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
      const { data, error } = await supabase.functions.invoke("generate-hooks", {
        body: { brand_profile: brandProfile, topic, category, quantity },
      });
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["resinkra-hooks"] });
      toast.success(`${quantity} ganchos gerados! 🎣`);
    },
    onError: (err: any) => toast.error(err.message),
  });

  return (
    <ResinkraAILayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-foreground font-serif flex items-center gap-2">
          <Anchor className="w-6 h-6 text-primary" /> Gerador de Ganchos
        </h1>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-4 shadow-card">
          <div>
            <Label className="text-muted-foreground text-sm">Tema *</Label>
            <Input
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="Ex: Marketing Digital"
              className="bg-card border-border text-foreground placeholder:text-muted-foreground mt-1"
            />
          </div>

          <div>
            <Label className="text-muted-foreground text-sm mb-3 block">Categoria</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {categories.map(c => (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className={cn(
                    "p-2.5 rounded-xl border-2 text-xs font-medium transition-all",
                    category === c.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/30"
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-muted-foreground text-sm mb-3 block">Quantidade</Label>
            <div className="flex gap-2">
              {[5, 10, 15, 20].map(q => (
                <button
                  key={q}
                  onClick={() => setQuantity(q)}
                  className={cn(
                    "px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all",
                    quantity === q
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/30"
                  )}
                >
                  {q}
                </button>
              ))}
            </div>
          </div>

          <Button
            onClick={() => generate.mutate()}
            disabled={!topic || generate.isPending}
            className="w-full btn-premium py-5"
          >
            {generate.isPending ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Sparkles className="w-5 h-5 mr-2" />}
            Gerar {quantity} Ganchos
          </Button>
        </div>

        {/* Results */}
        {hooks.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-foreground">Ganchos gerados</h2>
            {hooks.map((hook: any, i: number) => (
              <motion.div
                key={hook.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-start gap-3 p-4 rounded-xl border border-border bg-card group shadow-card"
              >
                <Zap className="w-4 h-4 text-primary mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-foreground">{hook.hook_text}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary">{hook.category}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-accent/10 text-accent">Power: {hook.power_level}/10</span>
                    {hook.best_for && <span className="text-[10px] px-2 py-0.5 rounded-full bg-highlight/10 text-highlight">{hook.best_for}</span>}
                  </div>
                </div>
                <button
                  onClick={() => { navigator.clipboard.writeText(hook.hook_text); toast.success("Copiado!"); }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-muted"
                >
                  <Copy className="w-4 h-4 text-muted-foreground" />
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </ResinkraAILayout>
  );
};

export default ResinkraAIHooks;
