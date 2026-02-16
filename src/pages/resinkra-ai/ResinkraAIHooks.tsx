import { useState } from "react";
import { ResinkraAILayout } from "@/components/resinkra-ai/ResinkraAILayout";
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
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Anchor className="w-6 h-6 text-violet-400" /> Gerador de Ganchos
        </h1>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
          <div>
            <Label className="text-gray-300 text-sm">Tema *</Label>
            <Input
              value={topic}
              onChange={e => setTopic(e.target.value)}
              placeholder="Ex: Marketing Digital"
              className="bg-white/5 border-white/10 text-white placeholder:text-gray-500 mt-1"
            />
          </div>

          <div>
            <Label className="text-gray-300 text-sm mb-3 block">Categoria</Label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {categories.map(c => (
                <button
                  key={c.value}
                  onClick={() => setCategory(c.value)}
                  className={cn(
                    "p-2.5 rounded-xl border-2 text-xs font-medium transition-all",
                    category === c.value
                      ? "border-violet-500 bg-violet-500/10 text-violet-300"
                      : "border-white/10 text-gray-400 hover:border-white/20"
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-gray-300 text-sm mb-3 block">Quantidade</Label>
            <div className="flex gap-2">
              {[5, 10, 15, 20].map(q => (
                <button
                  key={q}
                  onClick={() => setQuantity(q)}
                  className={cn(
                    "px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all",
                    quantity === q
                      ? "border-violet-500 bg-violet-500/10 text-violet-300"
                      : "border-white/10 text-gray-400 hover:border-white/20"
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
            className="w-full bg-gradient-to-r from-violet-600 to-blue-600 text-white py-5"
          >
            {generate.isPending ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : <Sparkles className="w-5 h-5 mr-2" />}
            Gerar {quantity} Ganchos
          </Button>
        </div>

        {/* Results */}
        {hooks.length > 0 && (
          <div className="space-y-2">
            <h2 className="text-lg font-semibold text-white">Ganchos gerados</h2>
            {hooks.map((hook: any, i: number) => (
              <motion.div
                key={hook.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                className="flex items-start gap-3 p-4 rounded-xl border border-white/10 bg-white/5 group"
              >
                <Zap className="w-4 h-4 text-violet-400 mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-white">{hook.hook_text}</p>
                  <div className="flex gap-2 mt-2">
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-violet-500/20 text-violet-300">{hook.category}</span>
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300">Power: {hook.power_level}/10</span>
                    {hook.best_for && <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300">{hook.best_for}</span>}
                  </div>
                </div>
                <button
                  onClick={() => { navigator.clipboard.writeText(hook.hook_text); toast.success("Copiado!"); }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 rounded-lg hover:bg-white/10"
                >
                  <Copy className="w-4 h-4 text-gray-400" />
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
