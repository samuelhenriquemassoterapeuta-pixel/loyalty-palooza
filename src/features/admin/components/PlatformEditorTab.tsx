import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText, Image, ToggleLeft, Palette, History,
  Save, RotateCcw, Search, Edit3, Check, X, Upload,
  Eye, Loader2, Trash2
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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
  { id: "textos", label: "Textos", icon: FileText },
  { id: "midia", label: "Mídia", icon: Image },
  { id: "modulos", label: "Módulos", icon: ToggleLeft },
  { id: "tema", label: "Tema", icon: Palette },
  { id: "historico", label: "Histórico", icon: History },
];

// ─── Main Component ──────────────────────────────────────────────
export const PlatformEditorTab = () => {
  const [activeSubTab, setActiveSubTab] = useState("textos");

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Editor da Plataforma</h3>
        <p className="text-sm text-muted-foreground">Gerencie textos, mídias, módulos e tema da plataforma</p>
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

        <TabsContent value="textos"><TextsEditor /></TabsContent>
        <TabsContent value="midia"><MediaEditor /></TabsContent>
        <TabsContent value="modulos"><ModulesEditor /></TabsContent>
        <TabsContent value="tema"><ThemeEditor /></TabsContent>
        <TabsContent value="historico"><EditHistory /></TabsContent>
      </Tabs>
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

  const { data: texts = [], isLoading } = useQuery({
    queryKey: ["platform-texts-admin"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("platform_texts" as any)
        .select("*")
        .order("section, key" as any);
      if (error) throw error;
      return data as unknown as PlatformText[];
    },
  });

  const updateText = useMutation({
    mutationFn: async ({ id, value, oldValue, key }: { id: string; value: string; oldValue: string; key: string }) => {
      const { error } = await supabase
        .from("platform_texts" as any)
        .update({ value, updated_at: new Date().toISOString(), updated_by: user?.id } as any)
        .eq("id", id);
      if (error) throw error;
      // Log edit
      await supabase.from("platform_edit_history" as any).insert({
        editor_id: user?.id, action: "update_text", target: key,
        old_value: oldValue, new_value: value,
      } as any);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform-texts-admin"] });
      queryClient.invalidateQueries({ queryKey: ["platform-texts"] });
      toast.success("Texto atualizado!");
      setEditingId(null);
    },
    onError: (e: any) => toast.error(e.message),
  });

  const sections = [...new Set(texts.map((t) => t.section))];

  const filtered = texts.filter((t) => {
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
        <div className="flex gap-1 flex-wrap">
          <Badge variant={filterSection === "all" ? "default" : "outline"} className="cursor-pointer text-xs" onClick={() => setFilterSection("all")}>Todos</Badge>
          {sections.map((s) => (
            <Badge key={s} variant={filterSection === s ? "default" : "outline"} className="cursor-pointer text-xs capitalize" onClick={() => setFilterSection(s)}>{s}</Badge>
          ))}
        </div>
      </div>

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
                    <Textarea
                      value={editValue}
                      onChange={(e) => setEditValue(e.target.value)}
                      className="text-sm min-h-[60px]"
                      autoFocus
                    />
                    <div className="flex gap-2">
                      <Button size="sm" className="h-7 text-xs gap-1" onClick={() => updateText.mutate({ id: text.id, value: editValue, oldValue: text.value, key: text.key })} disabled={updateText.isPending}>
                        <Check size={12} /> Salvar
                      </Button>
                      <Button size="sm" variant="ghost" className="h-7 text-xs gap-1" onClick={() => setEditingId(null)}>
                        <X size={12} /> Cancelar
                      </Button>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-foreground">{text.value}</p>
                )}
                {text.description && <p className="text-xs text-muted-foreground mt-1">{text.description}</p>}
              </div>
              {editingId !== text.id && (
                <Button size="sm" variant="ghost" className="h-7 w-7 p-0 shrink-0" onClick={() => { setEditingId(text.id); setEditValue(text.value); }}>
                  <Edit3 size={13} />
                </Button>
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
  const [uploading, setUploading] = useState(false);

  const { data: mediaList = [], isLoading } = useQuery({
    queryKey: ["platform-media-admin"],
    queryFn: async () => {
      const { data, error } = await supabase.from("platform_media" as any).select("*").order("section, key" as any);
      if (error) throw error;
      return data as unknown as PlatformMedia[];
    },
  });

  const handleUpload = async (file: File, existingId?: string, existingKey?: string) => {
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error: uploadError } = await supabase.storage.from("platform-media").upload(path, file);
      if (uploadError) throw uploadError;
      const { data: { publicUrl } } = supabase.storage.from("platform-media").getPublicUrl(path);

      if (existingId) {
        await supabase.from("platform_media" as any).update({ url: publicUrl, updated_at: new Date().toISOString() } as any).eq("id", existingId);
      } else if (newKey.trim()) {
        await supabase.from("platform_media" as any).insert({ key: newKey.trim(), url: publicUrl, type: file.type.startsWith("video") ? "video" : "image", section: newSection } as any);
        setNewKey("");
      }
      queryClient.invalidateQueries({ queryKey: ["platform-media-admin"] });
      queryClient.invalidateQueries({ queryKey: ["platform-media"] });
      toast.success("Mídia atualizada!");
    } catch (e: any) {
      toast.error(e.message);
    }
    setUploading(false);
  };

  const deleteMedia = async (id: string) => {
    if (!confirm("Excluir esta mídia?")) return;
    await supabase.from("platform_media" as any).delete().eq("id", id);
    queryClient.invalidateQueries({ queryKey: ["platform-media-admin"] });
    toast.success("Mídia excluída!");
  };

  if (isLoading) return <LoadingState />;

  return (
    <div className="space-y-4 mt-4">
      {/* New media */}
      <div className="p-3 rounded-xl border border-dashed border-border bg-muted/30">
        <p className="text-xs font-medium text-muted-foreground mb-2">Adicionar nova mídia</p>
        <div className="flex gap-2 flex-wrap">
          <Input placeholder="Chave (ex: logo_principal)" value={newKey} onChange={(e) => setNewKey(e.target.value)} className="h-8 text-xs flex-1 min-w-[150px]" />
          <Input placeholder="Seção" value={newSection} onChange={(e) => setNewSection(e.target.value)} className="h-8 text-xs w-24" />
          <label className="cursor-pointer">
            <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => { if (e.target.files?.[0] && newKey.trim()) handleUpload(e.target.files[0]); }} />
            <Button size="sm" variant="outline" className="h-8 text-xs gap-1" asChild disabled={uploading || !newKey.trim()}>
              <span><Upload size={12} /> Upload</span>
            </Button>
          </label>
        </div>
      </div>

      {/* List */}
      <div className="grid gap-3 sm:grid-cols-2">
        {mediaList.map((m) => (
          <div key={m.id} className="p-3 rounded-xl border border-border bg-card">
            <div className="flex items-center justify-between mb-2">
              <code className="text-xs text-muted-foreground bg-muted px-1.5 py-0.5 rounded">{m.key}</code>
              <div className="flex gap-1">
                <label className="cursor-pointer">
                  <input type="file" accept="image/*,video/*" className="hidden" onChange={(e) => { if (e.target.files?.[0]) handleUpload(e.target.files[0], m.id, m.key); }} />
                  <Button size="sm" variant="ghost" className="h-6 w-6 p-0" asChild><span><Upload size={12} /></span></Button>
                </label>
                <Button size="sm" variant="ghost" className="h-6 w-6 p-0 text-destructive" onClick={() => deleteMedia(m.id)}>
                  <Trash2 size={12} />
                </Button>
              </div>
            </div>
            {m.type === "video" ? (
              <video src={m.url} className="w-full h-28 rounded-lg object-cover" controls />
            ) : (
              <img src={m.url} alt={m.alt_text || m.key} className="w-full h-28 rounded-lg object-cover" loading="lazy" />
            )}
            <Badge variant="outline" className="text-[10px] capitalize mt-2">{m.section}</Badge>
          </div>
        ))}
      </div>
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
      await supabase.from("platform_edit_history" as any).insert({
        editor_id: user?.id, action: "toggle_module", target: module_name,
        old_value: String(is_active), new_value: String(!is_active),
      } as any);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform-modules-admin"] });
      queryClient.invalidateQueries({ queryKey: ["platform-modules"] });
      toast.success("Módulo atualizado!");
    },
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
                {mod.visible_for_roles.map((r) => (
                  <Badge key={r} variant="outline" className="text-[10px]">{r}</Badge>
                ))}
              </div>
            )}
          </div>
          <Switch
            checked={mod.is_active}
            onCheckedChange={() => toggleModule.mutate({ id: mod.id, is_active: mod.is_active, module_name: mod.module_name })}
          />
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
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["platform-theme-admin"] });
      toast.success("Tema atualizado!");
      setEditingId(null);
    },
    onError: (e: any) => toast.error(e.message),
  });

  if (isLoading) return <LoadingState />;

  if (theme.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <Palette className="h-10 w-10 mx-auto mb-3 opacity-50" />
        <p className="text-sm">Nenhuma variável de tema configurada.</p>
        <p className="text-xs mt-1">Adicione variáveis via banco de dados para personalizar o tema.</p>
      </div>
    );
  }

  return (
    <div className="space-y-2 mt-4">
      {theme.map((t) => (
        <div key={t.id} className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card">
          {t.category === "colors" && (
            <div className="w-8 h-8 rounded-lg border border-border shrink-0" style={{ backgroundColor: t.value }} />
          )}
          <div className="flex-1 min-w-0">
            <code className="text-xs text-muted-foreground">{t.key}</code>
            {editingId === t.id ? (
              <div className="flex gap-2 mt-1">
                <Input value={editValue} onChange={(e) => setEditValue(e.target.value)} className="h-7 text-xs" />
                <Button size="sm" className="h-7 text-xs" onClick={() => updateTheme.mutate({ id: t.id, value: editValue })}>
                  <Check size={12} />
                </Button>
                <Button size="sm" variant="ghost" className="h-7 text-xs" onClick={() => setEditingId(null)}>
                  <X size={12} />
                </Button>
              </div>
            ) : (
              <p className="text-sm text-foreground">{t.value}</p>
            )}
          </div>
          {editingId !== t.id && (
            <Button size="sm" variant="ghost" className="h-7 w-7 p-0" onClick={() => { setEditingId(t.id); setEditValue(t.value); }}>
              <Edit3 size={13} />
            </Button>
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
      const { data, error } = await supabase
        .from("platform_edit_history" as any)
        .select("*")
        .order("created_at", { ascending: false })
        .limit(50);
      if (error) throw error;
      return data as unknown as EditHistoryItem[];
    },
  });

  if (isLoading) return <LoadingState />;

  if (history.length === 0) {
    return (
      <div className="text-center py-12 text-muted-foreground">
        <History className="h-10 w-10 mx-auto mb-3 opacity-50" />
        <p className="text-sm">Nenhuma alteração registrada ainda.</p>
      </div>
    );
  }

  return (
    <ScrollArea className="max-h-[60vh] mt-4">
      <div className="space-y-2">
        {history.map((h) => (
          <div key={h.id} className="p-3 rounded-xl border border-border bg-card text-sm">
            <div className="flex items-center justify-between mb-1">
              <Badge variant="outline" className="text-[10px]">{h.action}</Badge>
              <span className="text-xs text-muted-foreground">
                {new Date(h.created_at).toLocaleString("pt-BR")}
              </span>
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="font-medium text-foreground">{h.target}</span>
            </p>
            {h.old_value && (
              <p className="text-xs text-destructive/70 line-through mt-1">{h.old_value.substring(0, 100)}</p>
            )}
            {h.new_value && (
              <p className="text-xs text-primary mt-0.5">{h.new_value.substring(0, 100)}</p>
            )}
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
