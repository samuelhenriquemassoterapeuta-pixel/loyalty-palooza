import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAllLandingConfig } from "@/hooks/useLandingConfig";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Save, Eye, LayoutDashboard, MessageSquareQuote, Info, Phone } from "lucide-react";
import { LoadingSpinner } from "@/components/LoadingSpinner";

const SectionEditor = ({ secao, conteudo, onSave }: { secao: string; conteudo: any; onSave: (secao: string, data: any) => Promise<void> }) => {
  const [form, setForm] = useState<any>(conteudo || {});
  const [saving, setSaving] = useState(false);

  const update = (key: string, value: any) => setForm((prev: any) => ({ ...prev, [key]: value }));

  const handleSave = async () => {
    setSaving(true);
    await onSave(secao, form);
    setSaving(false);
  };

  if (secao === "hero") {
    return (
      <div className="space-y-4">
        <div><Label>Imagem de Fundo (URL)</Label><Input placeholder="https://... ou deixe vazio para imagem padrão" value={form.imagem_fundo || ""} onChange={e => update("imagem_fundo", e.target.value)} />
          <p className="text-[10px] text-muted-foreground mt-1">Cole a URL de uma imagem para usar como fundo do Hero. Deixe vazio para usar a imagem padrão.</p>
        </div>
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

  if (secao === "sobre") {
    const features = form.features || [];
    const updateFeature = (index: number, key: string, value: string) => {
      const newFeatures = [...features];
      newFeatures[index] = { ...newFeatures[index], [key]: value };
      update("features", newFeatures);
    };
    const addFeature = () => update("features", [...features, { titulo: "", descricao: "" }]);
    const removeFeature = (index: number) => update("features", features.filter((_: any, i: number) => i !== index));

    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div><Label>Título (parte 1)</Label><Input value={form.titulo_parte1 || ""} onChange={e => update("titulo_parte1", e.target.value)} /></div>
          <div><Label>Título (destaque)</Label><Input value={form.titulo_destaque || ""} onChange={e => update("titulo_destaque", e.target.value)} /></div>
        </div>
        <div><Label>Subtítulo</Label><Textarea value={form.subtitulo || ""} onChange={e => update("subtitulo", e.target.value)} /></div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-base font-semibold">Diferenciais</Label>
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
        <Button onClick={handleSave} disabled={saving} className="w-full"><Save className="w-4 h-4 mr-2" />{saving ? "Salvando..." : "Salvar Sobre"}</Button>
      </div>
    );
  }

  if (secao === "contato") {
    return (
      <div className="space-y-4">
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
          <div className="col-span-2"><Label>WhatsApp (número com DDD e código do país)</Label><Input placeholder="5511999999999" value={form.whatsapp || ""} onChange={e => update("whatsapp", e.target.value)} /><p className="text-[10px] text-muted-foreground mt-1">Ex: 5511999999999 — usado nos botões flutuantes de contato</p></div>
        </div>
        <Button onClick={handleSave} disabled={saving} className="w-full"><Save className="w-4 h-4 mr-2" />{saving ? "Salvando..." : "Salvar Contato"}</Button>
      </div>
    );
  }

  if (secao === "depoimentos") {
    const deps = form.depoimentos_fallback || [];
    const updateDep = (index: number, key: string, value: any) => {
      const newDeps = [...deps];
      newDeps[index] = { ...newDeps[index], [key]: value };
      update("depoimentos_fallback", newDeps);
    };
    const addDep = () => update("depoimentos_fallback", [...deps, { nome: "", nota: 5, comentario: "" }]);
    const removeDep = (index: number) => update("depoimentos_fallback", deps.filter((_: any, i: number) => i !== index));

    return (
      <div className="space-y-4">
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
  sobre: { label: "Sobre", icon: Info },
  contato: { label: "Contato", icon: Phone },
  depoimentos: { label: "Depoimentos", icon: MessageSquareQuote },
};

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

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-foreground">Editor da Landing Page</h3>
          <p className="text-xs text-muted-foreground">Edite o conteúdo de cada seção da página inicial</p>
        </div>
        <a href="/site" target="_blank" rel="noopener noreferrer">
          <Button size="sm" variant="outline"><Eye className="w-4 h-4 mr-1" />Visualizar</Button>
        </a>
      </div>

      <Tabs defaultValue="hero">
        <TabsList className="w-full">
          {configs.map((c: any) => {
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

        {configs.map((c: any) => (
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
