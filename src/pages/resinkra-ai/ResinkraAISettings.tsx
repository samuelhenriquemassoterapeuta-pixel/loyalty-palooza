import { useState, useEffect } from "react";
import { ResinkraAILayout } from "@/components/resinkra-ai/ResinkraAILayout";
import { useAuth } from "@/contexts/AuthContext";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Settings, Save, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const toneOptions = [
  { value: "profissional", label: "🎯 Profissional" },
  { value: "descontrado", label: "😄 Descontraído" },
  { value: "provocativo", label: "🔥 Provocativo" },
  { value: "educativo", label: "💡 Educativo" },
  { value: "inspirador", label: "❤️ Inspirador" },
  { value: "irreverente", label: "😎 Irreverente" },
  { value: "tecnico", label: "🧠 Técnico" },
];

const ResinkraAISettings = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: brand } = useQuery({
    queryKey: ["brand-profile-full", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase.from("brand_profiles").select("*").eq("user_id", user!.id).limit(1).maybeSingle();
      return data;
    },
  });

  const [form, setForm] = useState<any>({});

  useEffect(() => {
    if (brand) {
      setForm({
        brand_name: brand.brand_name || "",
        niche: brand.niche || "",
        website: brand.website || "",
        target_audience_age: brand.target_audience_age || "25-34",
        target_audience_gender: brand.target_audience_gender || "todos",
        target_audience_pain: brand.target_audience_pain || "",
        target_audience_desire: brand.target_audience_desire || "",
        tone_of_voice: brand.tone_of_voice || [],
        use_slangs: brand.use_slangs || false,
        use_emojis: brand.use_emojis !== false,
        keywords: (brand.keywords || []).join(", "),
        forbidden_words: (brand.forbidden_words || []).join(", "),
        reference_profiles: (brand.reference_profiles || []).join(", "),
      });
    }
  }, [brand]);

  const save = useMutation({
    mutationFn: async () => {
      if (!brand?.id) return;
      const { error } = await supabase.from("brand_profiles").update({
        brand_name: form.brand_name,
        niche: form.niche,
        website: form.website || null,
        target_audience_age: form.target_audience_age,
        target_audience_gender: form.target_audience_gender,
        target_audience_pain: form.target_audience_pain || null,
        target_audience_desire: form.target_audience_desire || null,
        tone_of_voice: form.tone_of_voice,
        use_slangs: form.use_slangs,
        use_emojis: form.use_emojis,
        keywords: form.keywords ? form.keywords.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
        forbidden_words: form.forbidden_words ? form.forbidden_words.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
        reference_profiles: form.reference_profiles ? form.reference_profiles.split(",").map((s: string) => s.trim()).filter(Boolean) : [],
      } as any).eq("id", brand.id);
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["brand-profile-full"] });
      toast.success("Configurações salvas! ✅");
    },
    onError: (err: any) => toast.error(err.message),
  });

  const toggleTone = (t: string) => {
    setForm((p: any) => ({
      ...p,
      tone_of_voice: p.tone_of_voice?.includes(t)
        ? p.tone_of_voice.filter((v: string) => v !== t)
        : [...(p.tone_of_voice || []), t],
    }));
  };

  return (
    <ResinkraAILayout>
      <div className="max-w-2xl mx-auto space-y-6">
        <h1 className="text-2xl font-bold text-foreground font-serif flex items-center gap-2">
          <Settings className="w-6 h-6 text-primary" /> Configurações
        </h1>

        <div className="rounded-2xl border border-border bg-card p-6 space-y-5 shadow-card">
          <div>
            <Label className="text-muted-foreground text-sm">Nome da marca</Label>
            <Input value={form.brand_name || ""} onChange={e => setForm((p: any) => ({ ...p, brand_name: e.target.value }))} className="bg-card border-border text-foreground mt-1" />
          </div>
          <div>
            <Label className="text-muted-foreground text-sm">Nicho</Label>
            <Input value={form.niche || ""} onChange={e => setForm((p: any) => ({ ...p, niche: e.target.value }))} className="bg-card border-border text-foreground mt-1" />
          </div>
          <div>
            <Label className="text-muted-foreground text-sm">Website</Label>
            <Input value={form.website || ""} onChange={e => setForm((p: any) => ({ ...p, website: e.target.value }))} className="bg-card border-border text-foreground mt-1" />
          </div>

          <div>
            <Label className="text-muted-foreground text-sm mb-3 block">Tom de voz</Label>
            <div className="grid grid-cols-2 gap-2">
              {toneOptions.map(t => (
                <button
                  key={t.value}
                  onClick={() => toggleTone(t.value)}
                  className={cn(
                    "p-2.5 rounded-xl border-2 text-xs font-medium transition-all",
                    form.tone_of_voice?.includes(t.value)
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted-foreground hover:border-primary/30"
                  )}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <Label className="text-muted-foreground text-sm">Palavras-chave (vírgula)</Label>
            <Textarea value={form.keywords || ""} onChange={e => setForm((p: any) => ({ ...p, keywords: e.target.value }))} className="bg-card border-border text-foreground mt-1 min-h-[60px]" />
          </div>

          <div>
            <Label className="text-muted-foreground text-sm">Palavras proibidas (vírgula)</Label>
            <Textarea value={form.forbidden_words || ""} onChange={e => setForm((p: any) => ({ ...p, forbidden_words: e.target.value }))} className="bg-card border-border text-foreground mt-1 min-h-[60px]" />
          </div>

          <Button
            onClick={() => save.mutate()}
            disabled={save.isPending}
            className="w-full btn-premium"
          >
            {save.isPending ? <Loader2 className="w-4 h-4 animate-spin mr-2" /> : <Save className="w-4 h-4 mr-2" />}
            Salvar Configurações
          </Button>
        </div>
      </div>
    </ResinkraAILayout>
  );
};

export default ResinkraAISettings;
