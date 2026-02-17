import { useState } from "react";
import { ResinkraAILayout } from "@/features/resinkra-ai/components/ResinkraAILayout";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { Loader2, Sparkles, Film, Image, BookOpen, Radio, FileText, Wand2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

const contentTypes = [
  { value: "reels", label: "Reels", icon: Film },
  { value: "carousel", label: "Carrossel", icon: Image },
  { value: "stories", label: "Stories", icon: BookOpen },
  { value: "live", label: "Live", icon: Radio },
  { value: "post", label: "Post", icon: FileText },
];

const objectives = [
  { value: "atrair", label: "🧲 Atrair" },
  { value: "engajar", label: "💬 Engajar" },
  { value: "converter", label: "💰 Converter" },
  { value: "educar", label: "📚 Educar" },
  { value: "entreter", label: "😂 Entreter" },
  { value: "conectar", label: "🤝 Conectar" },
];

const styles = [
  { value: "lista", label: "📋 Lista" },
  { value: "storytelling", label: "📖 Storytelling" },
  { value: "talking_head", label: "🎤 Talking Head" },
  { value: "trend", label: "🎭 Trend" },
  { value: "pergunta_resposta", label: "❓ Pergunta-Resposta" },
];

const durations = ["7s", "15s", "30s", "60s", "90s"];

const ResinkraAICreate = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [form, setForm] = useState({
    content_type: "reels",
    topic: "",
    objective: "engajar",
    style: "talking_head",
    duration: "30s",
    depth_level: 5,
    additional_info: "",
  });

  const { data: brandProfile } = useQuery({
    queryKey: ["brand-profile-full", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("brand_profiles")
        .select("*")
        .eq("user_id", user!.id)
        .limit(1)
        .maybeSingle();
      return data;
    },
  });

  const generate = useMutation({
    mutationFn: async (variations: number) => {
      if (!user || !brandProfile) throw new Error("Perfil da marca não encontrado");
      const { data, error } = await supabase.functions.invoke("generate-script", {
        body: {
          brand_profile: brandProfile,
          content_type: form.content_type,
          topic: form.topic,
          objective: form.objective,
          style: form.style,
          duration: form.duration,
          depth_level: form.depth_level,
          additional_info: form.additional_info,
          variations,
        },
      });
      if (error) throw new Error(error.message);
      return data;
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["resinkra-stats"] });
      toast.success("Roteiro gerado com sucesso! ✨");
      if (data?.script_id) {
        navigate(`/resinkra-ai/script/${data.script_id}`);
      } else {
        navigate("/resinkra-ai/history");
      }
    },
    onError: (err: any) => {
      toast.error(err.message || "Erro ao gerar roteiro");
    },
  });

  return (
    <ResinkraAILayout>
      <div className="max-w-3xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground font-serif">Criar Roteiro</h1>
          <p className="text-muted-foreground text-sm mt-1">Preencha as informações e deixe a IA trabalhar</p>
        </div>

        <div className="rounded-2xl border border-border bg-card backdrop-blur-sm p-6 space-y-6 shadow-card">
          {/* Content Type */}
          <div>
            <Label className="text-muted-foreground text-sm mb-3 block">Tipo de conteúdo</Label>
            <div className="grid grid-cols-5 gap-2">
              {contentTypes.map(ct => (
                <button
                  key={ct.value}
                  onClick={() => setForm(p => ({ ...p, content_type: ct.value }))}
                  className={cn(
                    "flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-xs font-medium transition-all",
                    form.content_type === ct.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/30"
                  )}
                >
                  <ct.icon className="w-5 h-5" />
                  {ct.label}
                </button>
              ))}
            </div>
          </div>

          {/* Topic */}
          <div>
            <Label className="text-muted-foreground text-sm">Tema/Assunto *</Label>
            <Input
              value={form.topic}
              onChange={e => setForm(p => ({ ...p, topic: e.target.value }))}
              placeholder="Ex: Como ganhar seguidores orgânicos no Instagram"
              className="bg-card border-border text-foreground placeholder:text-muted-foreground mt-1"
            />
          </div>

          {/* Objective */}
          <div>
            <Label className="text-muted-foreground text-sm mb-3 block">Objetivo</Label>
            <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
              {objectives.map(obj => (
                <button
                  key={obj.value}
                  onClick={() => setForm(p => ({ ...p, objective: obj.value }))}
                  className={cn(
                    "p-2 rounded-xl border-2 text-xs font-medium transition-all text-center",
                    form.objective === obj.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/30"
                  )}
                >
                  {obj.label}
                </button>
              ))}
            </div>
          </div>

          {/* Duration (only for Reels) */}
          {form.content_type === "reels" && (
            <div>
              <Label className="text-muted-foreground text-sm mb-3 block">Duração</Label>
              <div className="flex gap-2">
                {durations.map(d => (
                  <button
                    key={d}
                    onClick={() => setForm(p => ({ ...p, duration: d }))}
                    className={cn(
                      "px-4 py-2 rounded-xl border-2 text-sm font-medium transition-all",
                      form.duration === d
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border text-muted-foreground hover:border-primary/30"
                    )}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Style */}
          <div>
            <Label className="text-muted-foreground text-sm mb-3 block">Estilo</Label>
            <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
              {styles.map(s => (
                <button
                  key={s.value}
                  onClick={() => setForm(p => ({ ...p, style: s.value }))}
                  className={cn(
                    "p-2.5 rounded-xl border-2 text-xs font-medium transition-all text-center",
                    form.style === s.value
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/30"
                  )}
                >
                  {s.label}
                </button>
              ))}
            </div>
          </div>

          {/* Depth */}
          <div>
            <div className="flex justify-between items-center mb-3">
              <Label className="text-muted-foreground text-sm">Profundidade</Label>
              <span className="text-xs text-primary font-mono">{form.depth_level}/10</span>
            </div>
            <Slider
              value={[form.depth_level]}
              onValueChange={([v]) => setForm(p => ({ ...p, depth_level: v }))}
              min={1}
              max={10}
              step={1}
              className="[&_[role=slider]]:bg-primary [&_[role=slider]]:border-primary"
            />
            <div className="flex justify-between text-[10px] text-muted-foreground mt-1">
              <span>Superficial</span>
              <span>Profundo</span>
            </div>
          </div>

          {/* Additional Info */}
          <div>
            <Label className="text-muted-foreground text-sm">Informações adicionais (opcional)</Label>
            <Textarea
              value={form.additional_info}
              onChange={e => setForm(p => ({ ...p, additional_info: e.target.value }))}
              placeholder="Contexto extra, dados específicos, referências..."
              className="bg-card border-border text-foreground placeholder:text-muted-foreground mt-1 min-h-[80px]"
            />
          </div>
        </div>

        {/* Generate Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            onClick={() => generate.mutate(1)}
            disabled={!form.topic || generate.isPending}
            className="flex-1 btn-premium py-6 text-base"
          >
            {generate.isPending ? (
              <Loader2 className="w-5 h-5 animate-spin mr-2" />
            ) : (
              <Sparkles className="w-5 h-5 mr-2" />
            )}
            Gerar Roteiro
          </Button>
          <Button
            onClick={() => generate.mutate(3)}
            disabled={!form.topic || generate.isPending}
            variant="outline"
            className="flex-1 border-border text-muted-foreground hover:bg-muted/50 py-6 text-base"
          >
            <Wand2 className="w-5 h-5 mr-2" /> Gerar 3 Variações
          </Button>
        </div>
      </div>
    </ResinkraAILayout>
  );
};

export default ResinkraAICreate;
