import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { Zap, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { cn } from "@/lib/utils";

const nicheOptions = [
  "Marketing Digital", "Saúde e Fitness", "Finanças", "Educação",
  "Moda e Beleza", "Gastronomia", "Tecnologia", "Empreendedorismo",
  "Desenvolvimento Pessoal", "Imóveis", "Direito", "Medicina/Estética", "Outro"
];

const toneOptions = [
  { value: "profissional", label: "🎯 Profissional" },
  { value: "descontrado", label: "😄 Descontraído" },
  { value: "provocativo", label: "🔥 Provocativo" },
  { value: "educativo", label: "💡 Educativo" },
  { value: "inspirador", label: "❤️ Inspirador" },
  { value: "irreverente", label: "😎 Irreverente" },
  { value: "tecnico", label: "🧠 Técnico" },
];

const ResinkraAIOnboarding = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({
    brand_name: "",
    niche: "",
    website: "",
    target_audience_age: "25-34",
    target_audience_gender: "todos",
    target_audience_pain: "",
    target_audience_desire: "",
    tone_of_voice: [] as string[],
    use_slangs: false,
    use_emojis: true,
    keywords: "",
    forbidden_words: "",
    reference_profiles: "",
  });

  const toggleTone = (t: string) => {
    setForm(prev => ({
      ...prev,
      tone_of_voice: prev.tone_of_voice.includes(t)
        ? prev.tone_of_voice.filter(v => v !== t)
        : [...prev.tone_of_voice, t],
    }));
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);
    try {
      const { error } = await supabase.from("brand_profiles").insert({
        user_id: user.id,
        brand_name: form.brand_name,
        niche: form.niche,
        website: form.website || null,
        target_audience_age: form.target_audience_age,
        target_audience_gender: form.target_audience_gender,
        target_audience_pain: form.target_audience_pain || null,
        target_audience_desire: form.target_audience_desire || null,
        tone_of_voice: form.tone_of_voice.length ? form.tone_of_voice : ["profissional"],
        use_slangs: form.use_slangs,
        use_emojis: form.use_emojis,
        keywords: form.keywords ? form.keywords.split(",").map(s => s.trim()).filter(Boolean) : [],
        forbidden_words: form.forbidden_words ? form.forbidden_words.split(",").map(s => s.trim()).filter(Boolean) : [],
        reference_profiles: form.reference_profiles ? form.reference_profiles.split(",").map(s => s.trim()).filter(Boolean) : [],
      } as any);
      if (error) throw error;
      toast.success("Perfil da marca criado com sucesso! 🚀");
      navigate("/resinkra-ai");
    } catch (err: any) {
      toast.error(err.message || "Erro ao salvar perfil");
    } finally {
      setSaving(false);
    }
  };

  const canNext = () => {
    if (step === 0) return form.brand_name && form.niche;
    if (step === 1) return true;
    if (step === 2) return form.tone_of_voice.length > 0;
    return true;
  };

  const steps = [
    // Step 0 - Brand Info
    <div className="space-y-4" key="step0">
      <div>
        <Label className="text-muted-foreground text-sm">Nome da marca *</Label>
        <Input
          value={form.brand_name}
          onChange={e => setForm(p => ({ ...p, brand_name: e.target.value }))}
          placeholder="Ex: Resinkra"
          className="bg-card border-border text-foreground placeholder:text-muted-foreground mt-1"
        />
      </div>
      <div>
        <Label className="text-muted-foreground text-sm">Nicho *</Label>
        <Select value={form.niche} onValueChange={v => setForm(p => ({ ...p, niche: v }))}>
          <SelectTrigger className="bg-card border-border text-foreground mt-1">
            <SelectValue placeholder="Selecione seu nicho" />
          </SelectTrigger>
          <SelectContent className="bg-card border-border">
            {nicheOptions.map(n => (
              <SelectItem key={n} value={n} className="text-foreground focus:bg-primary/10 focus:text-primary">{n}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label className="text-muted-foreground text-sm">Website (opcional)</Label>
        <Input
          value={form.website}
          onChange={e => setForm(p => ({ ...p, website: e.target.value }))}
          placeholder="https://seusite.com"
          className="bg-card border-border text-foreground placeholder:text-muted-foreground mt-1"
        />
      </div>
    </div>,

    // Step 1 - Target Audience
    <div className="space-y-4" key="step1">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <Label className="text-muted-foreground text-sm">Faixa etária</Label>
          <Select value={form.target_audience_age} onValueChange={v => setForm(p => ({ ...p, target_audience_age: v }))}>
            <SelectTrigger className="bg-card border-border text-foreground mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {["18-24", "25-34", "35-44", "45-54", "55+"].map(a => (
                <SelectItem key={a} value={a} className="text-foreground focus:bg-primary/10 focus:text-primary">{a}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className="text-muted-foreground text-sm">Gênero</Label>
          <Select value={form.target_audience_gender} onValueChange={v => setForm(p => ({ ...p, target_audience_gender: v }))}>
            <SelectTrigger className="bg-card border-border text-foreground mt-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-card border-border">
              {[["todos", "Todos"], ["masculino", "Masculino"], ["feminino", "Feminino"]].map(([v, l]) => (
                <SelectItem key={v} value={v} className="text-foreground focus:bg-primary/10 focus:text-primary">{l}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div>
        <Label className="text-muted-foreground text-sm">Principal DOR do público</Label>
        <Textarea
          value={form.target_audience_pain}
          onChange={e => setForm(p => ({ ...p, target_audience_pain: e.target.value }))}
          placeholder="Ex: Não consegue criar conteúdo consistente"
          className="bg-card border-border text-foreground placeholder:text-muted-foreground mt-1 min-h-[70px]"
        />
      </div>
      <div>
        <Label className="text-muted-foreground text-sm">Principal DESEJO</Label>
        <Textarea
          value={form.target_audience_desire}
          onChange={e => setForm(p => ({ ...p, target_audience_desire: e.target.value }))}
          placeholder="Ex: Crescer no Instagram e monetizar"
          className="bg-card border-border text-foreground placeholder:text-muted-foreground mt-1 min-h-[70px]"
        />
      </div>
    </div>,

    // Step 2 - Tone of Voice
    <div className="space-y-4" key="step2">
      <Label className="text-muted-foreground text-sm">Tom de voz (selecione 1 ou mais) *</Label>
      <div className="grid grid-cols-2 gap-2">
        {toneOptions.map(t => (
          <button
            key={t.value}
            onClick={() => toggleTone(t.value)}
            className={cn(
              "p-3 rounded-xl border-2 text-left text-sm font-medium transition-all",
              form.tone_of_voice.includes(t.value)
                ? "border-primary bg-primary/10 text-primary"
                : "border-border text-muted-foreground hover:border-primary/30"
            )}
          >
            {t.label}
          </button>
        ))}
      </div>
      <div className="flex gap-4 mt-4">
        <button
          onClick={() => setForm(p => ({ ...p, use_slangs: !p.use_slangs }))}
          className={cn(
            "flex-1 p-3 rounded-xl border-2 text-sm font-medium transition-all",
            form.use_slangs ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
          )}
        >
          🗣️ Usar gírias
        </button>
        <button
          onClick={() => setForm(p => ({ ...p, use_emojis: !p.use_emojis }))}
          className={cn(
            "flex-1 p-3 rounded-xl border-2 text-sm font-medium transition-all",
            form.use_emojis ? "border-primary bg-primary/10 text-primary" : "border-border text-muted-foreground"
          )}
        >
          😊 Usar emojis
        </button>
      </div>
    </div>,

    // Step 3 - Keywords
    <div className="space-y-4" key="step3">
      <div>
        <Label className="text-muted-foreground text-sm">Palavras-chave da marca (separadas por vírgula)</Label>
        <Textarea
          value={form.keywords}
          onChange={e => setForm(p => ({ ...p, keywords: e.target.value }))}
          placeholder="Ex: produtividade, crescimento, resultado"
          className="bg-card border-border text-foreground placeholder:text-muted-foreground mt-1 min-h-[70px]"
        />
      </div>
      <div>
        <Label className="text-muted-foreground text-sm">Palavras proibidas (separadas por vírgula)</Label>
        <Textarea
          value={form.forbidden_words}
          onChange={e => setForm(p => ({ ...p, forbidden_words: e.target.value }))}
          placeholder="Ex: barato, grátis, fácil"
          className="bg-card border-border text-foreground placeholder:text-muted-foreground mt-1 min-h-[70px]"
        />
      </div>
      <div>
        <Label className="text-muted-foreground text-sm">Perfis de referência (separados por vírgula)</Label>
        <Input
          value={form.reference_profiles}
          onChange={e => setForm(p => ({ ...p, reference_profiles: e.target.value }))}
          placeholder="@perfil1, @perfil2"
          className="bg-card border-border text-foreground placeholder:text-muted-foreground mt-1"
        />
      </div>
    </div>,
  ];

  const stepTitles = ["Sua Marca", "Seu Público", "Tom de Voz", "Referências"];

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-lg"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl gradient-primary mb-4">
            <Zap className="w-7 h-7 text-primary-foreground" />
          </div>
          <h1 className="text-2xl font-bold text-foreground font-serif">Configure sua marca</h1>
          <p className="text-muted-foreground text-sm mt-1">Passo {step + 1} de 4 — {stepTitles[step]}</p>
        </div>

        {/* Progress */}
        <div className="flex gap-2 mb-8">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={cn("flex-1 h-1 rounded-full transition-all", i <= step ? "bg-primary" : "bg-border")} />
          ))}
        </div>

        <div className="rounded-2xl border border-border bg-card backdrop-blur-sm p-6 shadow-card">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
            >
              {steps[step]}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="flex justify-between mt-6">
          <Button
            variant="ghost"
            onClick={() => setStep(s => s - 1)}
            disabled={step === 0}
            className="text-muted-foreground hover:text-foreground hover:bg-muted/50"
          >
            <ArrowLeft className="w-4 h-4 mr-1" /> Voltar
          </Button>

          {step < 3 ? (
            <Button
              onClick={() => setStep(s => s + 1)}
              disabled={!canNext()}
              className="btn-premium"
            >
              Próximo <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          ) : (
            <Button
              onClick={handleSave}
              disabled={saving}
              className="btn-premium"
            >
              {saving ? "Salvando..." : "Concluir"} <Check className="w-4 h-4 ml-1" />
            </Button>
          )}
        </div>
      </motion.div>
    </div>
  );
};

export default ResinkraAIOnboarding;
