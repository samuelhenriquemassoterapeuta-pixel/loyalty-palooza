import { useState, useRef } from "react";
import { useCorporativoSecoes, CorporativoSecao } from "@/hooks/useCorporativoSecoes";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Loader2, Plus, Pencil, Trash2, Building2, Upload, Image, Video, GripVertical, Film } from "lucide-react";
import { toast } from "sonner";

const CorporativoConteudoTab = () => {
  const { secoes, isLoading, upsertSecao, deleteSecao } = useCorporativoSecoes();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<CorporativoSecao | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const videoInputRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState({
    titulo: "", subtitulo: "", descricao: "", conteudo_detalhado: "",
    icone: "Building2", cor: "#3E4331", imagem_url: "", video_url: "",
    galeria_urls: [] as string[], ordem: 0, ativo: true,
  });

  const openCreate = () => {
    setEditing(null);
    setForm({
      titulo: "", subtitulo: "", descricao: "", conteudo_detalhado: "",
      icone: "Building2", cor: "#3E4331", imagem_url: "", video_url: "",
      galeria_urls: [], ordem: secoes.length + 1, ativo: true,
    });
    setDialogOpen(true);
  };

  const openEdit = (item: CorporativoSecao) => {
    setEditing(item);
    setForm({
      titulo: item.titulo, subtitulo: item.subtitulo || "", descricao: item.descricao || "",
      conteudo_detalhado: item.conteudo_detalhado || "", icone: item.icone, cor: item.cor,
      imagem_url: item.imagem_url || "", video_url: item.video_url || "",
      galeria_urls: item.galeria_urls || [], ordem: item.ordem, ativo: item.ativo,
    });
    setDialogOpen(true);
  };

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "imagem_url" | "galeria") => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("corporativo-media").upload(path, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("corporativo-media").getPublicUrl(path);
      if (field === "imagem_url") {
        setForm(f => ({ ...f, imagem_url: urlData.publicUrl }));
      } else {
        setForm(f => ({ ...f, galeria_urls: [...f.galeria_urls, urlData.publicUrl] }));
      }
      toast.success("Imagem enviada!");
    } catch (err: any) {
      toast.error(err.message);
    }
    setUploading(false);
  };

  const handleVideoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 50 * 1024 * 1024) {
      toast.error("Vídeo deve ter no máximo 50MB");
      return;
    }
    setUploadingVideo(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `videos/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
      const { error } = await supabase.storage.from("corporativo-media").upload(path, file);
      if (error) throw error;
      const { data: urlData } = supabase.storage.from("corporativo-media").getPublicUrl(path);
      setForm(f => ({ ...f, video_url: urlData.publicUrl }));
      toast.success("Vídeo enviado!");
    } catch (err: any) {
      toast.error(err.message);
    }
    setUploadingVideo(false);
  };

  const handleSave = () => {
    const data: any = { ...form };
    if (editing) data.id = editing.id;
    upsertSecao.mutate(data, { onSuccess: () => setDialogOpen(false) });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Excluir esta seção?")) return;
    deleteSecao.mutate(id);
  };

  const removeGalleryImage = (index: number) => {
    setForm(f => ({ ...f, galeria_urls: f.galeria_urls.filter((_, i) => i !== index) }));
  };

  if (isLoading) return <div className="flex justify-center py-8"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-foreground">Conteúdo Corporativo</h3>
          <p className="text-sm text-muted-foreground">Gerencie as seções da página corporativa</p>
        </div>
        <Button size="sm" onClick={openCreate}><Plus size={14} className="mr-1" /> Nova Seção</Button>
      </div>

      {secoes.length === 0 ? (
        <Card><CardContent className="p-6 text-center text-muted-foreground">Nenhuma seção cadastrada</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {secoes.map((s) => (
            <Card key={s.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                    <Building2 size={20} className="text-primary" />
                  </div>
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground truncate">{s.titulo}</span>
                      <Badge variant="outline" className="text-[10px] shrink-0">#{s.ordem}</Badge>
                      {!s.ativo && <Badge variant="secondary" className="text-[10px]">Inativo</Badge>}
                    </div>
                    <p className="text-sm text-muted-foreground truncate">{s.descricao || "Sem descrição"}</p>
                    <div className="flex gap-2 mt-1">
                      {s.imagem_url && <Badge variant="outline" className="text-[10px]"><Image size={10} className="mr-1" />Foto</Badge>}
                      {s.video_url && <Badge variant="outline" className="text-[10px]"><Video size={10} className="mr-1" />Vídeo</Badge>}
                      {s.galeria_urls?.length > 0 && <Badge variant="outline" className="text-[10px]">{s.galeria_urls.length} fotos</Badge>}
                    </div>
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button size="icon" variant="ghost" onClick={() => openEdit(s)}><Pencil size={14} /></Button>
                  <Button size="icon" variant="ghost" onClick={() => handleDelete(s.id)}><Trash2 size={14} /></Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-h-[85vh] overflow-y-auto max-w-2xl">
          <DialogHeader><DialogTitle>{editing ? "Editar" : "Nova"} Seção Corporativa</DialogTitle></DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div><Label>Título *</Label><Input value={form.titulo} onChange={e => setForm({...form, titulo: e.target.value})} /></div>
              <div><Label>Subtítulo</Label><Input value={form.subtitulo} onChange={e => setForm({...form, subtitulo: e.target.value})} /></div>
            </div>

            <div><Label>Descrição curta</Label><Textarea value={form.descricao} onChange={e => setForm({...form, descricao: e.target.value})} rows={2} /></div>

            <div><Label>Conteúdo detalhado (Markdown)</Label><Textarea value={form.conteudo_detalhado} onChange={e => setForm({...form, conteudo_detalhado: e.target.value})} rows={10} className="font-mono text-xs" /></div>

            <div className="grid grid-cols-3 gap-3">
              <div><Label>Ícone</Label><Input value={form.icone} onChange={e => setForm({...form, icone: e.target.value})} placeholder="Heart, Brain..." /></div>
              <div><Label>Cor</Label><Input type="color" value={form.cor} onChange={e => setForm({...form, cor: e.target.value})} /></div>
              <div><Label>Ordem</Label><Input type="number" value={form.ordem} onChange={e => setForm({...form, ordem: parseInt(e.target.value) || 0})} /></div>
            </div>

            {/* Image upload */}
            <div>
              <Label>Imagem principal</Label>
              <div className="flex gap-2 mt-1">
                <Input value={form.imagem_url} onChange={e => setForm({...form, imagem_url: e.target.value})} placeholder="URL ou upload" className="flex-1" />
                <Button variant="outline" size="sm" onClick={() => { fileInputRef.current?.setAttribute("data-field", "imagem_url"); fileInputRef.current?.click(); }} disabled={uploading}>
                  {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
                </Button>
              </div>
              {form.imagem_url && <img src={form.imagem_url} alt="" className="mt-2 rounded-lg h-24 object-cover" />}
            </div>

            {/* Video URL + Upload */}
            <div>
              <Label>URL do Vídeo</Label>
              <div className="flex gap-2 mt-1">
                <Input value={form.video_url} onChange={e => setForm({...form, video_url: e.target.value})} placeholder="YouTube, Vimeo ou upload direto" className="flex-1" />
                <Button variant="outline" size="sm" onClick={() => videoInputRef.current?.click()} disabled={uploadingVideo}>
                  {uploadingVideo ? <Loader2 size={14} className="animate-spin" /> : <Film size={14} />}
                </Button>
              </div>
              {form.video_url && !form.video_url.includes("youtube") && !form.video_url.includes("youtu.be") && !form.video_url.includes("vimeo") && (
                <video src={form.video_url} controls className="mt-2 rounded-lg h-24 w-auto" />
              )}
              <p className="text-[11px] text-muted-foreground mt-1">Cole um link do YouTube ou clique no ícone para enviar do celular (máx 50MB)</p>
            </div>

            {/* Gallery */}
            <div>
              <Label>Galeria de fotos</Label>
              <div className="flex gap-2 mt-1">
                <Button variant="outline" size="sm" onClick={() => { fileInputRef.current?.setAttribute("data-field", "galeria"); fileInputRef.current?.click(); }} disabled={uploading}>
                  <Upload size={14} className="mr-1" /> Adicionar foto
                </Button>
              </div>
              {form.galeria_urls.length > 0 && (
                <div className="grid grid-cols-4 gap-2 mt-2">
                  {form.galeria_urls.map((url, i) => (
                    <div key={i} className="relative group">
                      <img src={url} alt="" className="rounded-lg h-20 w-full object-cover" />
                      <button onClick={() => removeGalleryImage(i)} className="absolute top-1 right-1 w-5 h-5 bg-destructive text-destructive-foreground rounded-full text-[10px] font-bold opacity-0 group-hover:opacity-100 transition-opacity">✕</button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Switch checked={form.ativo} onCheckedChange={v => setForm({...form, ativo: v})} />
              <Label>Ativo</Label>
            </div>

            <Button className="w-full" onClick={handleSave} disabled={upsertSecao.isPending || !form.titulo}>
              {upsertSecao.isPending && <Loader2 size={14} className="animate-spin mr-2" />}
              Salvar
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Hidden file input for images */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const field = fileInputRef.current?.getAttribute("data-field") as "imagem_url" | "galeria";
          handleUpload(e, field || "imagem_url");
        }}
      />
      {/* Hidden file input for videos */}
      <input
        ref={videoInputRef}
        type="file"
        accept="video/*"
        className="hidden"
        onChange={handleVideoUpload}
      />
    </div>
  );
};

export default CorporativoConteudoTab;
