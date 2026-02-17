import { useState, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAllLandingConfig } from "@/features/landing/hooks/useLandingConfig";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Eye, LayoutDashboard, MessageSquareQuote, Info, Phone, Leaf, Crown, Upload, Loader2, Image, Trash2 } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

/* ── Image upload helper ─────────────────────────── */
const ImageUploadField = ({ label, value, onChange, hint }: { label: string; value: string; onChange: (url: string) => void; hint?: string }) => {
  const ref = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("landing-media").upload(path, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("landing-media").getPublicUrl(path);
      onChange(urlData.publicUrl);
      toast.success("Imagem enviada!");
    } catch (err: any) {
      toast.error(err.message);
    }
    setUploading(false);
  };

  return (
    <div>
      <Label>{label}</Label>
      <div className="flex gap-2 mt-1">
        <Input value={value || ""} onChange={e => onChange(e.target.value)} placeholder="URL ou upload" className="flex-1" />
        <Button variant="outline" size="sm" onClick={() => ref.current?.click()} disabled={uploading}>
          {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
        </Button>
        {value && <Button variant="ghost" size="sm" onClick={() => onChange("")}><Trash2 size={14} /></Button>}
      </div>
      {value && <img src={value} alt="" className="mt-2 rounded-lg h-20 object-cover" />}
      {hint && <p className="text-[10px] text-muted-foreground mt-1">{hint}</p>}
      <input ref={ref} type="file" accept="image/*" className="hidden" onChange={handleUpload} />
    </div>
  );
};

/* ── Section Editor ──────────────────────────────── */
const SectionEditor = ({ secao, conteudo, onSave }: { secao: string; conteudo: any; onSave: (secao: string, data: any) => Promise<void> }) => {
  const [form, setForm] = useState<any>(conteudo || {});
  const [saving, setSaving] = useState(false);

  const update = (key: string, value: any) => setForm((prev: any) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    await onSave(secao, form);
    setSaving(false);
  };

  /* ── HERO ── */
  if (secao === "hero") {
    return (
      <div className="space-y-4">
        <ImageUploadField label="Imagem de Fundo" value={form.imagem_fundo || ""} onChange={v => update("imagem_fundo", v)} hint="Imagem de fundo do banner Hero. Deixe vazio para usar a padrão." />
        <div><Label>Badge</Label><Input value={form.badge || ""} onChange={e => update("badge", e.target.value)} /></div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div><Label>Título (parte 1)</Label><Input value={form.titulo_parte1 || ""} onChange={e => update("titulo_parte1", e.target.value)} /></div>
          <div><Label>Título (destaque)</Label><Input value={form.titulo_destaque || ""} onChange={e => update("titulo_destaque", e.target.value)} /></div>
          <div><Label>Título (parte 2)</Label><Input value={form.titulo_parte2 || ""} onChange={e => update("titulo_parte2", e.target.value)} /></div>
        </div>
        <div><Label>Subtítulo</Label><Textarea value={form.subtitulo || ""} onChange={e => update("subtitulo", e.target.value)} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Botão Primário</Label><Input value={form.botao_primario || ""} onChange={e => update("botao_primario", e.target.value)} /></div>
          <div><Label>Botão Secundário</Label><Input value={form.botao_secundario || ""} onChange={e => update("botao_secundario", e.target.value)} /></div>
        </div>
        <div><Label>Sinais de confiança (separados por vírgula)</Label>
          <Input value={(form.sinais || []).join(", ")} onChange={e => update("sinais", e.target.value.split(",").map((s: string) => s.trim()).filter(Boolean))} />
        </div>
        <Button onClick={handleSave} disabled={saving} className="w-full"><Save className="w-4 h-4 mr-2" />{saving ? "Salvando..." : "Salvar Hero"}</Button>
      </div>
    );
  }

  /* ── SOBRE ── */
  if (secao === "sobre") {
    const features = form.features || [];
    const updateFeature = (index: number, key: string, value: string) => {
      const nf = [...features];
      nf[index] = { ...nf[index], [key]: value };
      update("features", nf);
    };
    const addFeature = () => update("features", [...features, { titulo: "", descricao: "" }]);
    const removeFeature = (i: number) => update("features", features.filter((_: any, idx: number) => idx !== i));

    const stats = form.stats || [];
    const updateStat = (i: number, key: string, value: string) => {
      const ns = [...stats];
      ns[i] = { ...ns[i], [key]: value };
      update("stats", ns);
    };
    const addStat = () => update("stats", [...stats, { value: "", label: "" }]);
    const removeStat = (i: number) => update("stats", stats.filter((_: any, idx: number) => idx !== i));

    const diffs = form.diferenciais || [];
    const updateDiff = (i: number, key: string, value: string) => {
      const nd = [...diffs];
      nd[i] = { ...nd[i], [key]: value };
      update("diferenciais", nd);
    };
    const addDiff = () => update("diferenciais", [...diffs, { text: "", detail: "" }]);
    const removeDiff = (i: number) => update("diferenciais", diffs.filter((_: any, idx: number) => idx !== i));

    return (
      <div className="space-y-4">
        <ImageUploadField label="Banner da seção Sobre" value={form.banner_url || ""} onChange={v => update("banner_url", v)} hint="Imagem de banner exibida quando a seção é expandida." />
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Título (parte 1)</Label><Input value={form.titulo_parte1 || ""} onChange={e => update("titulo_parte1", e.target.value)} /></div>
          <div><Label>Título (destaque)</Label><Input value={form.titulo_destaque || ""} onChange={e => update("titulo_destaque", e.target.value)} /></div>
        </div>
        <div><Label>Subtítulo</Label><Textarea value={form.subtitulo || ""} onChange={e => update("subtitulo", e.target.value)} /></div>

        {/* Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Estatísticas</Label>
            <Button size="sm" variant="outline" onClick={addStat}>+ Adicionar</Button>
          </div>
          {stats.map((s: any, i: number) => (
            <Card key={i} className="p-3 flex gap-2 items-end">
              <div className="flex-1"><Label className="text-[10px]">Valor</Label><Input value={s.value || ""} onChange={e => updateStat(i, "value", e.target.value)} placeholder="+500" /></div>
              <div className="flex-1"><Label className="text-[10px]">Label</Label><Input value={s.label || ""} onChange={e => updateStat(i, "label", e.target.value)} placeholder="Clientes" /></div>
              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => removeStat(i)}>✕</Button>
            </Card>
          ))}
        </div>

        {/* Features */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Diferenciais (cards)</Label>
            <Button size="sm" variant="outline" onClick={addFeature}>+ Adicionar</Button>
          </div>
          {features.map((f: any, i: number) => (
            <Card key={i} className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[10px]">#{i + 1}</Badge>
                <Button size="sm" variant="ghost" className="text-destructive h-6 px-2 text-xs" onClick={() => removeFeature(i)}>Remover</Button>
              </div>
              <Input placeholder="Título" value={f.titulo || ""} onChange={e => updateFeature(i, "titulo", e.target.value)} />
              <Textarea placeholder="Descrição" rows={2} value={f.descricao || ""} onChange={e => updateFeature(i, "descricao", e.target.value)} />
            </Card>
          ))}
        </div>

        {/* Diferenciais list */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Lista de diferenciais</Label>
            <Button size="sm" variant="outline" onClick={addDiff}>+ Adicionar</Button>
          </div>
          {diffs.map((d: any, i: number) => (
            <Card key={i} className="p-3 flex gap-2 items-end">
              <div className="flex-1"><Input value={d.text || ""} onChange={e => updateDiff(i, "text", e.target.value)} placeholder="Texto principal" /></div>
              <div className="flex-1"><Input value={d.detail || ""} onChange={e => updateDiff(i, "detail", e.target.value)} placeholder="Detalhe" /></div>
              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => removeDiff(i)}>✕</Button>
            </Card>
          ))}
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full"><Save className="w-4 h-4 mr-2" />{saving ? "Salvando..." : "Salvar Sobre"}</Button>
      </div>
    );
  }

  /* ── SERVICOS ── */
  if (secao === "servicos") {
    const highlights = form.highlights || [];
    const updateHighlight = (i: number, value: string) => {
      const nh = [...highlights];
      nh[i] = { ...nh[i], text: value };
      update("highlights", nh);
    };
    const addHighlight = () => update("highlights", [...highlights, { text: "" }]);
    const removeHighlight = (i: number) => update("highlights", highlights.filter((_: any, idx: number) => idx !== i));

    return (
      <div className="space-y-4">
        <ImageUploadField label="Banner de Serviços" value={form.banner_url || ""} onChange={v => update("banner_url", v)} hint="Imagem exibida no topo quando a seção Serviços é expandida." />
        <div><Label>Badge clientes (ex: +500 clientes atendidos)</Label><Input value={form.badge_clientes || ""} onChange={e => update("badge_clientes", e.target.value)} /></div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Destaques</Label>
            <Button size="sm" variant="outline" onClick={addHighlight}>+ Adicionar</Button>
          </div>
          {highlights.map((h: any, i: number) => (
            <div key={i} className="flex gap-2">
              <Input className="flex-1" value={h.text || ""} onChange={e => updateHighlight(i, e.target.value)} placeholder="Ex: Profissionais certificados" />
              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => removeHighlight(i)}>✕</Button>
            </div>
          ))}
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full"><Save className="w-4 h-4 mr-2" />{saving ? "Salvando..." : "Salvar Serviços"}</Button>
      </div>
    );
  }

  /* ── PACOTES ── */
  if (secao === "pacotes") {
    const benefits = form.benefits || [];
    const updateBenefit = (i: number, key: string, value: string) => {
      const nb = [...benefits];
      nb[i] = { ...nb[i], [key]: value };
      update("benefits", nb);
    };
    const addBenefit = () => update("benefits", [...benefits, { title: "", desc: "" }]);
    const removeBenefit = (i: number) => update("benefits", benefits.filter((_: any, idx: number) => idx !== i));

    return (
      <div className="space-y-4">
        <ImageUploadField label="Banner de Pacotes" value={form.banner_url || ""} onChange={v => update("banner_url", v)} hint="Imagem exibida no topo quando a seção Pacotes é expandida." />
        <div><Label>Texto do banner</Label><Input value={form.banner_titulo || ""} onChange={e => update("banner_titulo", e.target.value)} placeholder="Invista no seu bem-estar" /></div>
        <div><Label>Subtexto do banner</Label><Input value={form.banner_subtitulo || ""} onChange={e => update("banner_subtitulo", e.target.value)} placeholder="Pacotes com economia real..." /></div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Benefícios em destaque</Label>
            <Button size="sm" variant="outline" onClick={addBenefit}>+ Adicionar</Button>
          </div>
          {benefits.map((b: any, i: number) => (
            <Card key={i} className="p-3 flex gap-2 items-end">
              <div className="flex-1"><Input value={b.title || ""} onChange={e => updateBenefit(i, "title", e.target.value)} placeholder="Título" /></div>
              <div className="flex-1"><Input value={b.desc || ""} onChange={e => updateBenefit(i, "desc", e.target.value)} placeholder="Descrição" /></div>
              <Button size="sm" variant="ghost" className="text-destructive" onClick={() => removeBenefit(i)}>✕</Button>
            </Card>
          ))}
        </div>

        <Button onClick={handleSave} disabled={saving} className="w-full"><Save className="w-4 h-4 mr-2" />{saving ? "Salvando..." : "Salvar Pacotes"}</Button>
      </div>
    );
  }

  /* ── CONTATO ── */
  if (secao === "contato") {
    return (
      <div className="space-y-4">
        <ImageUploadField label="Imagem de fundo (Contato)" value={form.imagem_fundo || ""} onChange={v => update("imagem_fundo", v)} hint="Imagem de fundo da seção de contato." />
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Título (parte 1)</Label><Input value={form.titulo_parte1 || ""} onChange={e => update("titulo_parte1", e.target.value)} /></div>
          <div><Label>Título (destaque)</Label><Input value={form.titulo_destaque || ""} onChange={e => update("titulo_destaque", e.target.value)} /></div>
        </div>
        <div><Label>Subtítulo</Label><Textarea value={form.subtitulo || ""} onChange={e => update("subtitulo", e.target.value)} /></div>
        <div><Label>Texto do Botão</Label><Input value={form.botao || ""} onChange={e => update("botao", e.target.value)} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Endereço</Label><Input value={form.endereco || ""} onChange={e => update("endereco", e.target.value)} /></div>
          <div><Label>Telefone</Label><Input value={form.telefone || ""} onChange={e => update("telefone", e.target.value)} /></div>
          <div><Label>Email</Label><Input value={form.email || ""} onChange={e => update("email", e.target.value)} /></div>
          <div><Label>Instagram (@)</Label><Input placeholder="@resinkra" value={form.instagram || ""} onChange={e => update("instagram", e.target.value)} /></div>
          <div className="col-span-2"><Label>WhatsApp</Label><Input placeholder="5511999999999" value={form.whatsapp || ""} onChange={e => update("whatsapp", e.target.value)} /><p className="text-[10px] text-muted-foreground mt-1">Ex: 5511999999999</p></div>
        </div>
        <Button onClick={handleSave} disabled={saving} className="w-full"><Save className="w-4 h-4 mr-2" />{saving ? "Salvando..." : "Salvar Contato"}</Button>
      </div>
    );
  }

  /* ── DEPOIMENTOS ── */
  if (secao === "depoimentos") {
    const deps = form.depoimentos_fallback || [];
    const updateDep = (index: number, key: string, value: any) => {
      const nd = [...deps];
      nd[index] = { ...nd[index], [key]: value };
      update("depoimentos_fallback", nd);
    };
    const addDep = () => update("depoimentos_fallback", [...deps, { nome: "", nota: 5, comentario: "" }]);
    const removeDep = (i: number) => update("depoimentos_fallback", deps.filter((_: any, idx: number) => idx !== i));

    return (
      <div className="space-y-4">
        <ImageUploadField label="Banner de Depoimentos" value={form.banner_url || ""} onChange={v => update("banner_url", v)} hint="Imagem de fundo dos indicadores sociais." />
        <div><Label>Badge</Label><Input value={form.badge || ""} onChange={e => update("badge", e.target.value)} /></div>
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Título (parte 1)</Label><Input value={form.titulo_parte1 || ""} onChange={e => update("titulo_parte1", e.target.value)} /></div>
          <div><Label>Título (destaque)</Label><Input value={form.titulo_destaque || ""} onChange={e => update("titulo_destaque", e.target.value)} /></div>
        </div>
        <div><Label>Subtítulo</Label><Textarea value={form.subtitulo || ""} onChange={e => update("subtitulo", e.target.value)} /></div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Depoimentos Padrão</Label>
            <Button size="sm" variant="outline" onClick={addDep}>+ Adicionar</Button>
          </div>
          {deps.map((d: any, i: number) => (
            <Card key={i} className="p-3 space-y-2">
              <div className="flex items-center justify-between">
                <Badge variant="outline" className="text-[10px]">#{i + 1}</Badge>
                <Button size="sm" variant="ghost" className="text-destructive h-6 px-2 text-xs" onClick={() => removeDep(i)}>Remover</Button>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <Input placeholder="Nome" value={d.nome || ""} onChange={e => updateDep(i, "nome", e.target.value)} />
                <Input placeholder="Nota (1-5)" type="number" min={1} max={5} value={d.nota || 5} onChange={e => updateDep(i, "nota", parseInt(e.target.value))} />
              </div>
              <Textarea placeholder="Comentário" rows={2} value={d.comentario || ""} onChange={e => updateDep(i, "comentario", e.target.value)} />
            </Card>
          ))}
        </div>
        <Button onClick={handleSave} disabled={saving} className="w-full"><Save className="w-4 h-4 mr-2" />{saving ? "Salvando..." : "Salvar Depoimentos"}</Button>
      </div>
    );
  }

  /* ── HOME BG ── */
  if (secao === "home_bg") {
    return (
      <div className="space-y-4">
        <ImageUploadField
          label="Imagem de fundo da Home (logado)"
          value={form.imagem_url || ""}
          onChange={v => update("imagem_url", v)}
          hint="Imagem decorativa que aparece em movimento atrás do dashboard. Recomendado: imagem clara/suave."
        />
        <div>
          <Label>Velocidade da animação (segundos)</Label>
          <Input
            type="number"
            min={10}
            max={120}
            value={form.velocidade || 30}
            onChange={e => update("velocidade", parseInt(e.target.value) || 30)}
          />
          <p className="text-[10px] text-muted-foreground mt-1">Quanto maior o valor, mais lenta a animação. Padrão: 30s</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="w-full">
          <Save className="w-4 h-4 mr-2" />{saving ? "Salvando..." : "Salvar Fundo Home"}
        </Button>
      </div>
    );
  }

  /* ── AGENDAMENTO BG ── */
  if (secao === "agendamento_bg") {
    return (
      <div className="space-y-4">
        <ImageUploadField
          label="Imagem de fundo do Agendamento"
          value={form.imagem_url || ""}
          onChange={v => update("imagem_url", v)}
          hint="Imagem decorativa que aparece em movimento atrás da tela de agendamento. Recomendado: imagem clara/suave."
        />
        <div>
          <Label>Velocidade da animação (segundos)</Label>
          <Input
            type="number"
            min={10}
            max={120}
            value={form.velocidade || 30}
            onChange={e => update("velocidade", parseInt(e.target.value) || 30)}
          />
          <p className="text-[10px] text-muted-foreground mt-1">Quanto maior o valor, mais lenta a animação. Padrão: 30s</p>
        </div>
        <Button onClick={handleSave} disabled={saving} className="w-full">
          <Save className="w-4 h-4 mr-2" />{saving ? "Salvando..." : "Salvar Fundo Agendamento"}
        </Button>
      </div>
    );
  }

  // Fallback: raw JSON editor
  return (
    <div className="space-y-4">
      <Textarea rows={12} className="font-mono text-xs" value={JSON.stringify(form, null, 2)} onChange={e => { try { setForm(JSON.parse(e.target.value)); } catch {} }} />
      <Button onClick={handleSave} disabled={saving} className="w-full"><Save className="w-4 h-4 mr-2" />{saving ? "Salvando..." : "Salvar"}</Button>
    </div>
  );
};

const secaoMeta: Record<string, { label: string; icon: any }> = {
  hero: { label: "Hero", icon: LayoutDashboard },
  servicos: { label: "Serviços", icon: Leaf },
  sobre: { label: "Sobre", icon: Info },
  pacotes: { label: "Pacotes", icon: Crown },
  depoimentos: { label: "Depoimentos", icon: MessageSquareQuote },
  contato: { label: "Contato", icon: Phone },
  home_bg: { label: "Fundo Home", icon: Image },
  agendamento_bg: { label: "Fundo Agendamento", icon: Image },
};

const secaoOrder = ["hero", "servicos", "sobre", "pacotes", "depoimentos", "contato", "home_bg", "agendamento_bg"];

export const LandingPageTab = () => {
  const { configs, isLoading } = useAllLandingConfig();
  const queryClient = useQueryClient();

  const handleSave = async (secao: string, data: any) => {
    try {
      const { error } = await (supabase.from("landing_config" as any) as any)
        .update({ conteudo: data })
        .eq("secao", secao);
      if (error) throw error;
      toast.success(`Seção "${secaoMeta[secao]?.label || secao}" salva!`);
      queryClient.invalidateQueries({ queryKey: ["landing-config"] });
      queryClient.invalidateQueries({ queryKey: ["landing-config-all"] });
    } catch (e: any) {
      toast.error(e.message || "Erro ao salvar");
    }
  };

  if (isLoading) return <LoadingSpinner />;

  // Sort configs by predefined order
  const sorted = [...configs].sort((a, b) => {
    const ai = secaoOrder.indexOf(a.secao);
    const bi = secaoOrder.indexOf(b.secao);
    return (ai === -1 ? 99 : ai) - (bi === -1 ? 99 : bi);
  });

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Editor da Landing Page</h3>
          <p className="text-xs text-muted-foreground">Edite textos, imagens e conteúdo de cada seção</p>
        </div>
        <a href="/site" target="_blank" rel="noopener noreferrer">
          <Button size="sm" variant="outline"><Eye className="w-4 h-4 mr-1" />Visualizar</Button>
        </a>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="w-full flex-wrap h-auto gap-1">
          {sorted.map((c: any) => {
            const meta = secaoMeta[c.secao];
            const Icon = meta?.icon;
            return (
              <TabsTrigger key={c.secao} value={c.secao} className="flex items-center gap-1 text-xs">
                {Icon && <Icon size={12} />}
                {meta?.label || c.secao}
              </TabsTrigger>
            );
          })}
        </TabsList>

        {sorted.map((c: any) => (
          <TabsContent key={c.secao} value={c.secao}>
            <Card className="p-4 mt-3">
              <SectionEditor secao={c.secao} conteudo={c.conteudo} onSave={handleSave} />
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};
