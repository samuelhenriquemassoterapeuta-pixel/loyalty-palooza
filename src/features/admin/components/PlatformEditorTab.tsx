import { useState, useRef } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { motion } from "framer-motion";
import {
  FileText, Image, ToggleLeft, Palette, History,
  Save, Search, Edit3, Check, X, Upload,
  Loader2, Trash2, Layout, ShoppingBag, Megaphone,
  Bot, Plus, DollarSign, Clock, Tag, Building2,
  Phone, Mail, MapPin, Globe, Instagram, Hash
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

// ─── Types ───────────────────────────────────────────────────────
interface PlatformText {
  id: string; key: string; value: string; section: string;
  description: string | null; updated_at: string; updated_by: string | null;
}
interface PlatformMedia {
  id: string; key: string; url: string; type: string;
  section: string; alt_text: string | null; updated_at: string;
}
interface PlatformModule {
  id: string; module_name: string; is_active: boolean;
  visible_for_roles: string[] | null; settings: any; updated_at: string;
}
interface EditHistoryItem {
  id: string; editor_id: string | null; action: string | null;
  target: string | null; old_value: string | null; new_value: string | null;
  created_at: string;
}

// ─── Sub-tabs ────────────────────────────────────────────────────
const tabs = [
  { id: "empresa", label: "Empresa", icon: Building2 },
  { id: "textos", label: "Textos", icon: FileText },
  { id: "midia", label: "Mídia", icon: Image },
  { id: "modulos", label: "Módulos", icon: ToggleLeft },
  { id: "landing", label: "Landing Page", icon: Layout },
  { id: "servicos", label: "Serviços", icon: ShoppingBag },
  { id: "banners", label: "Banners", icon: Megaphone },
  { id: "agentes", label: "Agentes IA", icon: Bot },
  { id: "tema", label: "Tema", icon: Palette },
  { id: "historico", label: "Histórico", icon: History },
];

// ─── Main Component ──────────────────────────────────────────────
export const PlatformEditorTab = () => {
  const [activeSubTab, setActiveSubTab] = useState("empresa");

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Editor da Plataforma</h3>
        <p className="text-sm text-muted-foreground">Gerencie dados da empresa, textos, mídias, módulos, landing page, serviços, banners, agentes IA e tema</p>
      </div>

      <Tabs value={activeSubTab} onValueChange={setActiveSubTab}>
        <TabsList className="w-full flex-wrap h-auto gap-1">
          {tabs.map((t) => (
            <TabsTrigger key={t.id} value={t.id} className="gap-1.5 text-xs">
              <t.icon size={14} />
              {t.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="empresa"><EmpresaEditor /></TabsContent>
        <TabsContent value="textos"><TextsEditor /></TabsContent>
        <TabsContent value="midia"><MediaEditor /></TabsContent>
        <TabsContent value="modulos"><ModulesEditor /></TabsContent>
        <TabsContent value="landing"><LandingEditor /></TabsContent>
        <TabsContent value="servicos"><ServicosEditor /></TabsContent>
        <TabsContent value="banners"><BannersEditor /></TabsContent>
        <TabsContent value="agentes"><AgentesEditor /></TabsContent>
        <TabsContent value="tema"><ThemeEditor /></TabsContent>
        <TabsContent value="historico"><EditHistory /></TabsContent>
      </Tabs>
    </div>
  );
};

// ─── Empresa Editor ──────────────────────────────────────────────
const EMPRESA_FIELDS = [
  { key: "empresa.nome", label: "Nome da Empresa", icon: Building2 },
  { key: "empresa.telefone", label: "Telefone", icon: Phone },
  { key: "empresa.whatsapp", label: "WhatsApp", icon: Phone },
  { key: "empresa.email", label: "E-mail", icon: Mail },
  { key: "empresa.instagram", label: "Instagram", icon: Instagram },
  { key: "empresa.facebook", label: "Facebook", icon: Globe },
  { key: "empresa.site", label: "Site", icon: Globe },
  { key: "empresa.cnpj", label: "CNPJ", icon: Hash },
  { key: "empresa.endereco_rua", label: "Rua / Número", icon: MapPin },
  { key: "empresa.endereco_bairro", label: "Bairro", icon: MapPin },
  { key: "empresa.endereco_cidade", label: "Cidade", icon: MapPin },
  { key: "empresa.endereco_estado", label: "Estado", icon: MapPin },
  { key: "empresa.endereco_cep", label: "CEP", icon: MapPin },
  { key: "empresa.horario_funcionamento", label: "Horário de Funcionamento", icon: Clock },
];

const EmpresaEditor = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [values, setValues] = useState<Record<string, { id: string; value: string }>>({});
  const [saving, setSaving] = useState(false);
  const [initialized, setInitialized] = useState(false);

  const { data: texts = [], isLoading } = useQuery({
    queryKey: ["platform-texts-empresa"],
    queryFn: async () => {
      const { data, error } = await supabase.from("platform_texts" as any).select("*").eq("section", "empresa");
      if (error) throw error;
      return data as unknown as PlatformText[];
    },
  });

  // Initialize form values from DB
  if (texts.length > 0 && !initialized) {
    const v: Record<string, { id: string; value: string }> = {};
    texts.forEach((t) => { v[t.key] = { id: t.id, value: t.value }; });
    setValues(v);
    setInitialized(true);
  }

  const handleSave = async () => {
    setSaving(true);
    try {
      const updates = Object.entries(values).map(([key, { id, value }]) =>
        supabase.from("platform_texts" as any).update({ value, updated_at: new Date().toISOString(), updated_by: user?.id } as any).eq("id", id)
      );
      await Promise.all(updates);
      await supabase.from("platform_edit_history" as any).insert({
        editor_id: user?.id, action: "update_empresa", target: "empresa", new_value: JSON.stringify(Object.fromEntries(Object.entries(values).map(([k, v]) => [k, v.value])))
      } as any);
      queryClient.invalidateQueries({ queryKey: ["platform-texts-empresa"] });
      queryClient.invalidateQueries({ queryKey: ["platform-texts"] });
      toast.success("Dados da empresa salvos!");
    } catch (e: any) { toast.error(e.message); }
    setSaving(false);
  };

  if (isLoading) return <LoadingState />;

  return (
    <div className="space-y-4 mt-4">
      <Card className="p-4">
        <div className="flex items-center gap-2 mb-4">
          <Building2 size={18} className="text-primary" />
          <h4 className="font-semibold text-foreground">Dados de Contato & Endereço</h4>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {EMPRESA_FIELDS.map((field) => {
            const val = values[field.key]?.value ?? "";
            return (
              <div key={field.key} className="space-y-1">
                <Label className="text-xs flex items-center gap-1.5">
                  <field.icon size={12} className="text-muted-foreground" />
                  {field.label}
                </Label>
                <Input
                  value={val}
                  onChange={(e) => setValues((prev) => ({
                    ...prev,
                    [field.key]: { ...prev[field.key], value: e.target.value },
                  }))}
                  className="h-9 text-sm"
                  placeholder={field.label}
                />
              </div>
            );
          })}
        </div>
        <Button onClick={handleSave} disabled={saving} className="mt-4 gap-2">
          {saving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
          Salvar Dados da Empresa
        </Button>
      </Card>
    </div>
  );
};

// ─── Texts Editor ────────────────────────────────────────────────
const TextsEditor = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();
  const [search, setSearch] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");
  const [filterSection, setFilterSection] = useState("all");
  const [addingNew, setAddingNew] = useState(false);
  const [newKey, setNewKey] = useState("");
  const [newValue, setNewValue] = useState("");
  const [newSection, setNewSection] = useState("geral");

  const { data: texts = [], isLoading } = useQuery({
    queryKey: ["platform-texts-admin"],
    queryFn: async () => {
      const { data, error } = await supabase.from("platform_texts" as any).select("*").order("section, key" as any);
      if (error) throw error;
      return data as unknown as PlatformText[];
    },
  });

  const updateText = useMutation({
    mutationFn: async ({ id, value, oldValue, key }: { id: string; value: string; oldValue: string; key: string }) => {
      const { error } = await supabase.from("platform_texts" as any).update({ value, updated_at: new Date().toISOString(), updated_by: user?.id } as any).eq("id", id);
      if (error) throw error;
      await supabase.from("platform_edit_history" as any).insert({ editor_id: user?.id, action: "update_text", target: key, old_value: oldValue, new_value: value } as any);
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["platform-texts-admin"] }); toast.success("Texto atualizado!"); setEditingId(null); },
    onError: (e: any) => toast.error(e.message),
  });

  const addText = useMutation({
    mutationFn: async () => {
      const { error } = await supabase.from("platform_texts" as any).insert({ key: newKey.trim(), value: newValue, section: newSection, updated_by: user?.id } as any);
      if (error) throw error;
      await supabase.from("platform_edit_history" as any).insert({ editor_id: user?.id, action: "create_text", target: newKey.trim(), new_value: newValue } as any);
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["platform-texts-admin"] }); toast.success("Texto criado!"); setAddingNew(false); setNewKey(""); setNewValue(""); },
    onError: (e: any) => toast.error(e.message),
  });

  const deleteText = useMutation({
    mutationFn: async ({ id, key }: { id: string; key: string }) => {
      const { error } = await supabase.from("platform_texts" as any).delete().eq("id", id);
      if (error) throw error;
      await supabase.from("platform_edit_history" as any).insert({ editor_id: user?.id, action: "delete_text", target: key } as any);
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["platform-texts-admin"] }); toast.success("Texto removido!"); },
    onError: (e: any) => toast.error(e.message),
  });

  const sections = [...new Set(texts.map((t) => t.section))];
  const filtered = texts.filter((t) => {
    if (t.section === "empresa") return false; // handled in Empresa tab
    const matchSearch = !search || t.key.toLowerCase().includes(search.toLowerCase()) || t.value.toLowerCase().includes(search.toLowerCase());
    const matchSection = filterSection === "all" || t.section === filterSection;
    return matchSearch && matchSection;
  });

  if (isLoading) return <LoadingState />;

  return (
    <div className="space-y-4 mt-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar texto..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 text-sm" />
        </div>
        <Button size="sm" variant="outline" className="h-9 gap-1 text-xs" onClick={() => setAddingNew(!addingNew)}>
          <Plus size={14} /> Novo Texto
        </Button>
      </div>

      <div className="flex gap-1 flex-wrap">
        <Badge variant={filterSection === "all" ? "default" : "outline"} className="cursor-pointer text-xs" onClick={() => setFilterSection("all")}>Todos</Badge>
        {sections.filter(s => s !== "empresa").map((s) => (
          <Badge key={s} variant={filterSection === s ? "default" : "outline"} className="cursor-pointer text-xs capitalize" onClick={() => setFilterSection(s)}>{s}</Badge>
        ))}
      </div>

      {addingNew && (
        <div className="p-3 rounded-xl border border-dashed border-primary/50 bg-primary/5 space-y-2">
          <div className="flex gap-2">
            <Input placeholder="Chave (ex: hero.titulo)" value={newKey} onChange={(e) => setNewKey(e.target.value)} className="h-8 text-xs flex-1" />
            <Input placeholder="Seção" value={newSection} onChange={(e) => setNewSection(e.target.value)} className="h-8 text-xs w-24" />
          </div>
          <Textarea placeholder="Valor do texto..." value={newValue} onChange={(e) => setNewValue(e.target.value)} className="text-sm min-h-[60px]" />
          <div className="flex gap-2">
            <Button size="sm" className="h-7 text-xs gap-1" onClick={() => addText.mutate()} disabled={!newKey.trim() || addText.isPending}><Check size={12} /> Criar</Button>
            <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setAddingNew(false)}><X size={12} /> Cancelar</Button>
          </div>
        </div>
      )}

      <div className="space-y-2">
        {filtered.map((text) => (
          <motion.div key={text.id} layout className="p-3 rounded-xl border border-border bg-card">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <code className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{text.key}</code>
                  <Badge variant="outline" className="text-[10px] capitalize">{text.section}</Badge>
                </div>
                {editingId === text.id ? (
                  <div className="space-y-2">
                    <Textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} className="text-sm min-h-[60px]" autoFocus />
                    <div className="flex gap-2">
                      <Button size="sm" className="h-7 text-xs gap-1" onClick={() => updateText.mutate({ id: text.id, value: editValue, oldValue: text.value, key: text.key })} disabled={updateText.isPending}><Check size={12} /> Salvar</Button>
                      <Button size="sm" variant="ghost" className="h-7 text-xs gap-1" onClick={() => setEditingId(null)}><X size={12} /> Cancelar</Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-foreground">{text.value}</p>
                )}
              </div>
              {editingId !== text.id && (
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0 shrink-0" onClick={() => { setEditingId(text.id); setEditValue(text.value); }}><Edit3 size={13} /></Button>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0 shrink-0 text-destructive" onClick={() => { if (confirm("Excluir este texto?")) deleteText.mutate({ id: text.id, key: text.key }); }}><Trash2 size={13} /></Button>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

// ─── Media Editor ────────────────────────────────────────────────
const MediaEditor = () => {
  const queryClient = useQueryClient();
  const [newKey, setNewKey] = useState("");
  const [newSection, setNewSection] = useState("geral");
  const [uploading, setUploading] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  const { data: mediaList = [], isLoading } = useQuery({
    queryKey: ["platform-media-admin"],
    queryFn: async () => {
      const { data, error } = await supabase.from("platform_media" as any).select("*").order("section, key" as any);
      if (error) throw error;
      return data as unknown as PlatformMedia[];
    },
  });

  const handleUpload = async (file: File, existingId?: string) => {
    setUploading(existingId || "new");
    try {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("platform-media").upload(path, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from("platform-media").getPublicUrl(path);
      if (existingId) {
        await supabase.from("platform_media" as any).update({ url: publicUrl, updated_at: new Date().toISOString() } as any).eq("id", existingId);
        toast.success("Mídia substituída!");
      } else if (newKey.trim()) {
        await supabase.from("platform_media" as any).insert({ key: newKey.trim(), url: publicUrl, type: file.type.startsWith("video") ? "video" : "image", section: newSection } as any);
        setNewKey("");
        toast.success("Mídia adicionada!");
      }
      queryClient.invalidateQueries({ queryKey: ["platform-media-admin"] });
    } catch (e: any) { toast.error(e.message); }
    setUploading(null);
  };

  const deleteMedia = async (id: string) => {
    if (!confirm("Excluir esta mídia?")) return;
    await supabase.from("platform_media" as any).delete().eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["platform-media-admin"] });
    toast.success("Mídia excluída!");
  };

  const filtered = mediaList.filter((m) =>
    !search || m.key.toLowerCase().includes(search.toLowerCase()) || m.section.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <LoadingState />;

  return (
    <div className="space-y-4 mt-4">
      <div className="flex flex-col sm:flex-row gap-2">
        <div className="relative flex-1">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input placeholder="Buscar mídia..." value={search} onChange={(e) => setSearch(e.target.value)} className="pl-9 h-9 text-sm" />
        </div>
      </div>

      <Card className="p-3">
        <p className="text-xs font-medium text-muted-foreground mb-2">Adicionar nova mídia</p>
        <div className="flex gap-2 flex-wrap">
          <Input placeholder="Chave (ex: logo_principal)" value={newKey} onChange={(e) => setNewKey(e.target.value)} className="h-8 text-xs flex-1 min-w-[150px]" />
          <Input placeholder="Seção" value={newSection} onChange={(e) => setNewSection(e.target.value)} className="h-8 text-xs w-24" />
          <label className="cursor-pointer">
            <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => { if (e.target.files?.[0] && newKey.trim()) handleUpload(e.target.files[0]); e.target.value = ""; }} />
            <Button size="sm" variant="outline" className="h-8 text-xs gap-1" asChild disabled={!!uploading || !newKey.trim()}><span><Upload size={12} /> Upload</span></Button>
          </label>
        </div>
      </Card>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((m) => (
          <Card key={m.id} className="p-3 group relative">
            <div className="flex items-center justify-between mb-2">
              <div className="min-w-0 flex-1">
                <code className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded truncate block">{m.key}</code>
              </div>
              <div className="flex gap-1 shrink-0 ml-2">
                <label className="cursor-pointer">
                  <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleUpload(e.target.files[0], m.id); e.target.value = ""; }} />
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0" asChild title="Substituir mídia">
                    <span>{uploading === m.id ? <Loader2 size={12} className="animate-spin" /> : <Upload size={12} />}</span>
                  </Button>
                </label>
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 text-destructive" onClick={() => deleteMedia(m.id)} title="Excluir">
                  <Trash2 size={12} />
                </Button>
              </div>
            </div>
            {m.type === "video" ? (
              <video src={m.url} className="w-full h-32 rounded-lg object-cover bg-muted" controls />
            ) : (
              <img src={m.url} alt={m.alt_text || m.key} className="w-full h-32 rounded-lg object-cover bg-muted" loading="lazy" />
            )}
            <div className="flex items-center justify-between mt-2">
              <Badge variant="outline" className="text-[10px] capitalize">{m.section}</Badge>
              <Badge variant="secondary" className="text-[10px]">{m.type}</Badge>
            </div>
          </Card>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <Image className="h-10 w-10 mx-auto mb-3 opacity-50" />
          <p className="text-sm">Nenhuma mídia cadastrada. Adicione imagens e vídeos acima.</p>
        </div>
      )}
    </div>
  );
};

// ─── Modules Editor ──────────────────────────────────────────────
const ModulesEditor = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  const { data: modules = [], isLoading } = useQuery({
    queryKey: ["platform-modules-admin"],
    queryFn: async () => {
      const { data, error } = await supabase.from("platform_modules" as any).select("*").order("module_name");
      if (error) throw error;
      return data as unknown as PlatformModule[];
    },
  });

  const toggleModule = useMutation({
    mutationFn: async ({ id, is_active, module_name }: { id: string; is_active: boolean; module_name: string }) => {
      const { error } = await supabase.from("platform_modules" as any).update({ is_active: !is_active, updated_at: new Date().toISOString() } as any).eq("id", id);
      if (error) throw error;
      await supabase.from("platform_edit_history" as any).insert({ editor_id: user?.id, action: "toggle_module", target: module_name, old_value: String(is_active), new_value: String(!is_active) } as any);
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["platform-modules-admin"] }); toast.success("Módulo atualizado!"); },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading) return <LoadingState />;

  return (
    <div className="space-y-3 mt-4">
      {modules.map((mod) => (
        <div key={mod.id} className="flex items-center justify-between p-3 rounded-xl border border-border bg-card">
          <div>
            <p className="text-sm font-medium text-foreground capitalize">{mod.module_name.replace(/_/g, " ")}</p>
            {mod.visible_for_roles && (
              <div className="flex gap-1 mt-1">
                {mod.visible_for_roles.map((r) => <Badge key={r} variant="outline" className="text-[10px]">{r}</Badge>)}
              </div>
            )}
          </div>
          <Switch checked={mod.is_active} onCheckedChange={() => toggleModule.mutate({ id: mod.id, is_active: mod.is_active, module_name: mod.module_name })} />
        </div>
      ))}
    </div>
  );
};

// ─── Landing Page Editor ─────────────────────────────────────────
const LandingEditor = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const { data: landingSections = [], isLoading } = useQuery({
    queryKey: ["landing-config-admin"],
    queryFn: async () => {
      const { data, error } = await supabase.from("landing_config" as any).select("*").order("secao");
      if (error) throw error;
      return data as unknown as Array<{ id: string; secao: string; conteudo: any; updated_at: string }>;
    },
  });

  const updateSection = useMutation({
    mutationFn: async ({ id, conteudo }: { id: string; conteudo: any }) => {
      const { error } = await supabase.from("landing_config" as any).update({ conteudo, updated_at: new Date().toISOString() } as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["landing-config-admin"] }); toast.success("Seção da landing atualizada!"); setEditingId(null); },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading) return <LoadingState />;

  if (landingSections.length === 0) {
    return <div className="text-center py-12 text-muted-foreground"><Layout className="h-10 w-10 mx-auto mb-3 opacity-50" /><p className="text-sm">Nenhuma seção de landing configurada.</p></div>;
  }

  return (
    <div className="space-y-3 mt-4">
      <p className="text-xs text-muted-foreground">Edite o conteúdo JSON de cada seção da landing page</p>
      {landingSections.map((section) => (
        <div key={section.id} className="p-3 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-2">
            <Badge variant="default" className="text-xs capitalize">{section.secao}</Badge>
            {editingId !== section.id && (
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => { setEditingId(section.id); setEditValue(JSON.stringify(section.conteudo, null, 2)); }}><Edit3 size={13} /></Button>
            )}
          </div>
          {editingId === section.id ? (
            <div className="space-y-2">
              <Textarea value={editValue} onChange={(e) => setEditValue(e.target.value)} className="text-xs font-mono min-h-[150px]" />
              <div className="flex gap-2">
                <Button size="sm" className="h-7 text-xs gap-1" onClick={() => { try { const parsed = JSON.parse(editValue); updateSection.mutate({ id: section.id, conteudo: parsed }); } catch { toast.error("JSON inválido!"); } }} disabled={updateSection.isPending}><Check size={12} /> Salvar</Button>
                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setEditingId(null)}><X size={12} /> Cancelar</Button>
              </div>
            </div>
          ) : (
            <pre className="text-xs text-muted-foreground bg-muted/50 p-2 rounded-lg overflow-auto max-h-[120px]">{JSON.stringify(section.conteudo, null, 2)}</pre>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── Serviços Editor ─────────────────────────────────────────────
const ServicosEditor = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFields, setEditFields] = useState<Record<string, any>>({});

  const { data: servicos = [], isLoading } = useQuery({
    queryKey: ["servicos-admin-editor"],
    queryFn: async () => {
      const { data, error } = await supabase.from("servicos").select("*").order("nome");
      if (error) throw error;
      return data;
    },
  });

  const updateServico = useMutation({
    mutationFn: async ({ id, fields }: { id: string; fields: Record<string, any> }) => {
      const { error } = await supabase.from("servicos").update(fields).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["servicos-admin-editor"] }); toast.success("Serviço atualizado!"); setEditingId(null); },
    onError: (e: any) => toast.error(e.message),
  });

  const toggleDisponivel = useMutation({
    mutationFn: async ({ id, disponivel }: { id: string; disponivel: boolean }) => {
      const { error } = await supabase.from("servicos").update({ disponivel: !disponivel }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["servicos-admin-editor"] }); toast.success("Disponibilidade atualizada!"); },
  });

  if (isLoading) return <LoadingState />;

  return (
    <div className="space-y-3 mt-4">
      <p className="text-xs text-muted-foreground">Gerencie serviços: nome, preço, duração, cashback e disponibilidade</p>
      {servicos.map((s: any) => (
        <div key={s.id} className="p-3 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">{s.nome}</span>
              <Badge variant={s.disponivel ? "default" : "secondary"} className="text-[10px]">{s.disponivel ? "Ativo" : "Inativo"}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={s.disponivel} onCheckedChange={() => toggleDisponivel.mutate({ id: s.id, disponivel: s.disponivel })} />
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => { setEditingId(s.id === editingId ? null : s.id); setEditFields({ nome: s.nome, descricao: s.descricao || "", preco: s.preco, duracao: s.duracao, cashback_percentual: s.cashback_percentual || 0, categoria: s.categoria || "" }); }}><Edit3 size={13} /></Button>
            </div>
          </div>
          <div className="flex gap-3 text-xs text-muted-foreground">
            <span className="flex items-center gap-1"><DollarSign size={12} /> R$ {s.preco}</span>
            <span className="flex items-center gap-1"><Clock size={12} /> {s.duracao} min</span>
            <span className="flex items-center gap-1"><Tag size={12} /> {s.cashback_percentual || 0}% cashback</span>
          </div>
          {editingId === s.id && (
            <div className="mt-3 pt-3 border-t border-border space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div><label className="text-[10px] text-muted-foreground">Nome</label><Input value={editFields.nome} onChange={(e) => setEditFields(p => ({ ...p, nome: e.target.value }))} className="h-8 text-xs" /></div>
                <div><label className="text-[10px] text-muted-foreground">Categoria</label><Input value={editFields.categoria} onChange={(e) => setEditFields(p => ({ ...p, categoria: e.target.value }))} className="h-8 text-xs" /></div>
                <div><label className="text-[10px] text-muted-foreground">Preço (R$)</label><Input type="number" value={editFields.preco} onChange={(e) => setEditFields(p => ({ ...p, preco: parseFloat(e.target.value) }))} className="h-8 text-xs" /></div>
                <div><label className="text-[10px] text-muted-foreground">Duração (min)</label><Input value={editFields.duracao} onChange={(e) => setEditFields(p => ({ ...p, duracao: e.target.value }))} className="h-8 text-xs" /></div>
                <div><label className="text-[10px] text-muted-foreground">Cashback %</label><Input type="number" value={editFields.cashback_percentual} onChange={(e) => setEditFields(p => ({ ...p, cashback_percentual: parseFloat(e.target.value) }))} className="h-8 text-xs" /></div>
              </div>
              <div><label className="text-[10px] text-muted-foreground">Descrição</label><Textarea value={editFields.descricao} onChange={(e) => setEditFields(p => ({ ...p, descricao: e.target.value }))} className="text-xs min-h-[60px]" /></div>
              <div className="flex gap-2">
                <Button size="sm" className="h-7 text-xs gap-1" onClick={() => updateServico.mutate({ id: s.id, fields: editFields })} disabled={updateServico.isPending}><Check size={12} /> Salvar</Button>
                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setEditingId(null)}><X size={12} /> Cancelar</Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── Banners Editor ──────────────────────────────────────────────
const BannersEditor = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFields, setEditFields] = useState<Record<string, any>>({});

  const { data: banners = [], isLoading } = useQuery({
    queryKey: ["banners-admin-editor"],
    queryFn: async () => {
      const { data, error } = await supabase.from("banners_promocionais").select("*").order("prioridade", { ascending: true });
      if (error) throw error;
      return data;
    },
  });

  const updateBanner = useMutation({
    mutationFn: async ({ id, fields }: { id: string; fields: Record<string, any> }) => {
      const { error } = await supabase.from("banners_promocionais").update({ ...fields, updated_at: new Date().toISOString() }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["banners-admin-editor"] }); toast.success("Banner atualizado!"); setEditingId(null); },
    onError: (e: any) => toast.error(e.message),
  });

  const toggleAtivo = useMutation({
    mutationFn: async ({ id, ativo }: { id: string; ativo: boolean }) => {
      const { error } = await supabase.from("banners_promocionais").update({ ativo: !ativo, updated_at: new Date().toISOString() }).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["banners-admin-editor"] }); toast.success("Status atualizado!"); },
  });

  if (isLoading) return <LoadingState />;

  return (
    <div className="space-y-3 mt-4">
      <p className="text-xs text-muted-foreground">Gerencie banners promocionais: título, imagem, link, segmentos e ativação</p>
      {banners.map((b: any) => (
        <div key={b.id} className="p-3 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-sm font-medium text-foreground">{b.titulo}</span>
              <Badge variant={b.ativo ? "default" : "secondary"} className="text-[10px]">{b.ativo ? "Ativo" : "Inativo"}</Badge>
              <Badge variant="outline" className="text-[10px]">P{b.prioridade || 0}</Badge>
            </div>
            <div className="flex items-center gap-2">
              <Switch checked={b.ativo} onCheckedChange={() => toggleAtivo.mutate({ id: b.id, ativo: b.ativo })} />
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => { setEditingId(b.id === editingId ? null : b.id); setEditFields({ titulo: b.titulo, subtitulo: b.subtitulo || "", imagem_url: b.imagem_url || "", link_destino: b.link_destino || "", cor_fundo: b.cor_fundo || "", prioridade: b.prioridade || 0, tipo: b.tipo || "banner" }); }}><Edit3 size={13} /></Button>
            </div>
          </div>
          {b.imagem_url && <img src={b.imagem_url} alt={b.titulo} className="w-full h-20 rounded-lg object-cover mb-2" />}
          {b.subtitulo && <p className="text-xs text-muted-foreground">{b.subtitulo}</p>}
          {editingId === b.id && (
            <div className="mt-3 pt-3 border-t border-border space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div><label className="text-[10px] text-muted-foreground">Título</label><Input value={editFields.titulo} onChange={(e) => setEditFields(p => ({ ...p, titulo: e.target.value }))} className="h-8 text-xs" /></div>
                <div><label className="text-[10px] text-muted-foreground">Tipo</label><Input value={editFields.tipo} onChange={(e) => setEditFields(p => ({ ...p, tipo: e.target.value }))} className="h-8 text-xs" /></div>
                <div><label className="text-[10px] text-muted-foreground">Imagem URL</label><Input value={editFields.imagem_url} onChange={(e) => setEditFields(p => ({ ...p, imagem_url: e.target.value }))} className="h-8 text-xs" /></div>
                <div><label className="text-[10px] text-muted-foreground">Link destino</label><Input value={editFields.link_destino} onChange={(e) => setEditFields(p => ({ ...p, link_destino: e.target.value }))} className="h-8 text-xs" /></div>
                <div><label className="text-[10px] text-muted-foreground">Cor fundo</label><Input value={editFields.cor_fundo} onChange={(e) => setEditFields(p => ({ ...p, cor_fundo: e.target.value }))} className="h-8 text-xs" /></div>
                <div><label className="text-[10px] text-muted-foreground">Prioridade</label><Input type="number" value={editFields.prioridade} onChange={(e) => setEditFields(p => ({ ...p, prioridade: parseInt(e.target.value) }))} className="h-8 text-xs" /></div>
              </div>
              <div><label className="text-[10px] text-muted-foreground">Subtítulo</label><Textarea value={editFields.subtitulo} onChange={(e) => setEditFields(p => ({ ...p, subtitulo: e.target.value }))} className="text-xs min-h-[40px]" /></div>
              <div className="flex gap-2">
                <Button size="sm" className="h-7 text-xs gap-1" onClick={() => updateBanner.mutate({ id: b.id, fields: editFields })} disabled={updateBanner.isPending}><Check size={12} /> Salvar</Button>
                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setEditingId(null)}><X size={12} /> Cancelar</Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── Agentes IA Editor ───────────────────────────────────────────
const AgentesEditor = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editFields, setEditFields] = useState<Record<string, any>>({});

  const { data: agentes = [], isLoading } = useQuery({
    queryKey: ["resi-agents-editor"],
    queryFn: async () => {
      const { data, error } = await supabase.from("resi_agents_config" as any).select("*").order("priority", { ascending: true });
      if (error) throw error;
      return data as any[];
    },
  });

  const updateAgent = useMutation({
    mutationFn: async ({ id, fields }: { id: string; fields: Record<string, any> }) => {
      const { error } = await supabase.from("resi_agents_config" as any).update(fields as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["resi-agents-editor"] }); toast.success("Agente atualizado!"); setEditingId(null); },
    onError: (e: any) => toast.error(e.message),
  });

  const toggleActive = useMutation({
    mutationFn: async ({ id, is_active }: { id: string; is_active: boolean }) => {
      const { error } = await supabase.from("resi_agents_config" as any).update({ is_active: !is_active } as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["resi-agents-editor"] }); toast.success("Status atualizado!"); },
  });

  if (isLoading) return <LoadingState />;

  return (
    <div className="space-y-3 mt-4">
      <p className="text-xs text-muted-foreground">Edite nome, emoji, descrição, palavras-chave e prompt dos agentes IA</p>
      {agentes.map((a: any) => (
        <div key={a.id} className="p-3 rounded-xl border border-border bg-card">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{a.emoji}</span>
              <div>
                <span className="text-sm font-medium text-foreground">{a.name}</span>
                <p className="text-xs text-muted-foreground">{a.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant={a.is_active ? "default" : "secondary"} className="text-[10px]">{a.is_active ? "Ativo" : "Inativo"}</Badge>
              <Switch checked={a.is_active} onCheckedChange={() => toggleActive.mutate({ id: a.id, is_active: a.is_active })} />
              <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => {
                setEditingId(a.id === editingId ? null : a.id);
                setEditFields({ name: a.name, emoji: a.emoji, description: a.description || "", keywords: (a.keywords || []).join(", "), system_prompt: a.system_prompt || "", priority: a.priority || 0 });
              }}><Edit3 size={13} /></Button>
            </div>
          </div>
          {a.keywords?.length > 0 && (
            <div className="flex gap-1 flex-wrap mb-1">
              {a.keywords.slice(0, 6).map((kw: string) => <Badge key={kw} variant="outline" className="text-[10px]">{kw}</Badge>)}
              {a.keywords.length > 6 && <Badge variant="outline" className="text-[10px]">+{a.keywords.length - 6}</Badge>}
            </div>
          )}
          {editingId === a.id && (
            <div className="mt-3 pt-3 border-t border-border space-y-2">
              <div className="grid grid-cols-3 gap-2">
                <div><label className="text-[10px] text-muted-foreground">Nome</label><Input value={editFields.name} onChange={(e) => setEditFields(p => ({ ...p, name: e.target.value }))} className="h-8 text-xs" /></div>
                <div><label className="text-[10px] text-muted-foreground">Emoji</label><Input value={editFields.emoji} onChange={(e) => setEditFields(p => ({ ...p, emoji: e.target.value }))} className="h-8 text-xs" /></div>
                <div><label className="text-[10px] text-muted-foreground">Prioridade</label><Input type="number" value={editFields.priority} onChange={(e) => setEditFields(p => ({ ...p, priority: parseInt(e.target.value) }))} className="h-8 text-xs" /></div>
              </div>
              <div><label className="text-[10px] text-muted-foreground">Descrição</label><Input value={editFields.description} onChange={(e) => setEditFields(p => ({ ...p, description: e.target.value }))} className="h-8 text-xs" /></div>
              <div><label className="text-[10px] text-muted-foreground">Palavras-chave (separadas por vírgula)</label><Input value={editFields.keywords} onChange={(e) => setEditFields(p => ({ ...p, keywords: e.target.value }))} className="h-8 text-xs" /></div>
              <div><label className="text-[10px] text-muted-foreground">System Prompt</label><Textarea value={editFields.system_prompt} onChange={(e) => setEditFields(p => ({ ...p, system_prompt: e.target.value }))} className="text-xs font-mono min-h-[120px]" /></div>
              <div className="flex gap-2">
                <Button size="sm" className="h-7 text-xs gap-1" onClick={() => { const kws = editFields.keywords.split(",").map((k: string) => k.trim()).filter(Boolean); updateAgent.mutate({ id: a.id, fields: { ...editFields, keywords: kws } }); }} disabled={updateAgent.isPending}><Check size={12} /> Salvar</Button>
                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setEditingId(null)}><X size={12} /> Cancelar</Button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── Theme Editor ────────────────────────────────────────────────
const ThemeEditor = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState("");

  const { data: theme = [], isLoading } = useQuery({
    queryKey: ["platform-theme-admin"],
    queryFn: async () => {
      const { data, error } = await supabase.from("platform_theme" as any).select("*").order("category, key" as any);
      if (error) throw error;
      return data as unknown as Array<{ id: string; key: string; value: string; category: string }>;
    },
  });

  const updateTheme = useMutation({
    mutationFn: async ({ id, value }: { id: string; value: string }) => {
      const { error } = await supabase.from("platform_theme" as any).update({ value } as any).eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => { queryClient.invalidateQueries({ queryKey: ["platform-theme-admin"] }); toast.success("Tema atualizado!"); setEditingId(null); },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading) return <LoadingState />;

  if (theme.length === 0) {
    return <div className="text-center py-12 text-muted-foreground"><Palette className="h-10 w-10 mx-auto mb-3 opacity-50" /><p className="text-sm">Nenhuma variável de tema configurada.</p></div>;
  }

  return (
    <div className="space-y-2 mt-4">
      {theme.map((t) => (
        <div key={t.id} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
          {t.category === "colors" && <div className="w-8 h-8 rounded-lg border border-border shrink-0" style={{ backgroundColor: t.value }} />}
          <div className="flex-1 min-w-0">
            <code className="text-xs text-muted-foreground">{t.key}</code>
            {editingId === t.id ? (
              <div className="flex gap-2 mt-1">
                <Input value={editValue} onChange={(e) => setEditValue(e.target.value)} className="h-7 text-xs" />
                <Button size="sm" className="h-7 text-xs" onClick={() => updateTheme.mutate({ id: t.id, value: editValue })}><Check size={12} /></Button>
                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setEditingId(null)}><X size={12} /></Button>
              </div>
            ) : (
              <p className="text-sm text-foreground">{t.value}</p>
            )}
          </div>
          {editingId !== t.id && (
            <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => { setEditingId(t.id); setEditValue(t.value); }}><Edit3 size={13} /></Button>
          )}
        </div>
      ))}
    </div>
  );
};

// ─── Edit History ────────────────────────────────────────────────
const EditHistory = () => {
  const { data: history = [], isLoading } = useQuery({
    queryKey: ["platform-edit-history"],
    queryFn: async () => {
      const { data, error } = await supabase.from("platform_edit_history" as any).select("*").order("created_at", { ascending: false }).limit(50);
      if (error) throw error;
      return data as unknown as EditHistoryItem[];
    },
  });

  if (isLoading) return <LoadingState />;

  if (history.length === 0) {
    return <div className="text-center py-12 text-muted-foreground"><History className="h-10 w-10 mx-auto mb-3 opacity-50" /><p className="text-sm">Nenhuma alteração registrada ainda.</p></div>;
  }

  return (
    <ScrollArea className="max-h-[60vh] mt-4">
      <div className="space-y-2">
        {history.map((h) => (
          <div key={h.id} className="p-3 rounded-xl border border-border bg-card text-sm">
            <div className="flex items-center justify-between mb-1">
              <Badge variant="outline" className="text-[10px]">{h.action}</Badge>
              <span className="text-xs text-muted-foreground">{new Date(h.created_at).toLocaleString("pt-BR")}</span>
            </div>
            <p className="text-xs text-muted-foreground"><span className="font-medium text-foreground">{h.target}</span></p>
            {h.old_value && <p className="text-xs text-destructive/70 line-through mt-1">{h.old_value.substring(0, 100)}</p>}
            {h.new_value && <p className="text-xs text-primary mt-0.5">{h.new_value.substring(0, 100)}</p>}
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};

// ─── Shared ──────────────────────────────────────────────────────
const LoadingState = () => (
  <div className="flex justify-center py-12">
    <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
  </div>
);

export default PlatformEditorTab;
