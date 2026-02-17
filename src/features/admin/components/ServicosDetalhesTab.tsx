import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";
import { Edit, Image, Sparkles, Trash2, Upload, Loader2, Plus, Video, X } from "lucide-react";

export const ServicosDetalhesTab = () => {
  const queryClient = useQueryClient();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editData, setEditData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [generatingAI, setGeneratingAI] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");
  const [uploading, setUploading] = useState(false);
  const [newBeneficio, setNewBeneficio] = useState("");

  const { data: servicos = [], isLoading } = useQuery({
    queryKey: ["admin-servicos-detalhes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("servicos").select("*").order("nome");
      if (error) throw error;
      return data;
    },
  });

  const openEditor = (servico: any) => {
    setEditingId(servico.id);
    setEditData({
      descricao_detalhada: servico.descricao_detalhada || "",
      beneficios: servico.beneficios || [],
      imagens: servico.imagens || [],
      video_url: servico.video_url || "",
      imagem_capa: servico.imagem_capa || "",
    });
    setNewBeneficio("");
    setAiPrompt("");
  };

  const handleSave = async () => {
    if (!editingId) return;
    setSaving(true);
    try {
      const { error } = await supabase
        .from("servicos")
        .update({
          descricao_detalhada: editData.descricao_detalhada || null,
          beneficios: editData.beneficios || [],
          imagens: editData.imagens || [],
          video_url: editData.video_url || null,
          imagem_capa: editData.imagem_capa || null,
        } as any)
        .eq("id", editingId);
      if (error) throw error;
      toast.success("Detalhes do serviço atualizados!");
      queryClient.invalidateQueries({ queryKey: ["admin-servicos-detalhes"] });
      queryClient.invalidateQueries({ queryKey: ["admin-servicos"] });
      setEditingId(null);
    } catch (err: any) {
      toast.error(err.message || "Erro ao salvar");
    }
    setSaving(false);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, field: "imagens" | "imagem_capa") => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const ext = file.name.split(".").pop();
      const path = `${editingId}/${Date.now()}.${ext}`;
      const { error: uploadError } = await supabase.storage
        .from("servico-imagens")
        .upload(path, file);
      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("servico-imagens")
        .getPublicUrl(path);

      if (field === "imagem_capa") {
        setEditData((prev: any) => ({ ...prev, imagem_capa: urlData.publicUrl }));
      } else {
        setEditData((prev: any) => ({
          ...prev,
          imagens: [...(prev.imagens || []), urlData.publicUrl],
        }));
      }
      toast.success("Imagem enviada!");
    } catch (err: any) {
      toast.error(err.message || "Erro ao enviar imagem");
    }
    setUploading(false);
  };

  const handleGenerateAI = async () => {
    if (!aiPrompt.trim()) {
      toast.error("Digite uma descrição para gerar a imagem");
      return;
    }
    setGeneratingAI(true);
    try {
      const { data, error } = await supabase.functions.invoke("gerar-imagem-servico", {
        body: { prompt: aiPrompt },
      });
      if (error) throw error;
      if (data?.error) throw new Error(data.error);

      if (data?.imageUrl) {
        // Upload the base64 image to storage
        const base64 = data.imageUrl.split(",")[1];
        const byteArray = Uint8Array.from(atob(base64), (c) => c.charCodeAt(0));
        const path = `${editingId}/ai-${Date.now()}.png`;

        const { error: uploadError } = await supabase.storage
          .from("servico-imagens")
          .upload(path, byteArray, { contentType: "image/png" });
        if (uploadError) throw uploadError;

        const { data: urlData } = supabase.storage
          .from("servico-imagens")
          .getPublicUrl(path);

        setEditData((prev: any) => ({
          ...prev,
          imagens: [...(prev.imagens || []), urlData.publicUrl],
        }));
        toast.success("Imagem gerada por IA e adicionada!");
        setAiPrompt("");
      }
    } catch (err: any) {
      toast.error(err.message || "Erro ao gerar imagem");
    }
    setGeneratingAI(false);
  };

  const removeImage = (index: number) => {
    setEditData((prev: any) => ({
      ...prev,
      imagens: prev.imagens.filter((_: string, i: number) => i !== index),
    }));
  };

  const addBeneficio = () => {
    if (!newBeneficio.trim()) return;
    setEditData((prev: any) => ({
      ...prev,
      beneficios: [...(prev.beneficios || []), newBeneficio.trim()],
    }));
    setNewBeneficio("");
  };

  const removeBeneficio = (index: number) => {
    setEditData((prev: any) => ({
      ...prev,
      beneficios: prev.beneficios.filter((_: string, i: number) => i !== index),
    }));
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div>
        <h3 className="text-lg font-semibold text-foreground">Detalhes dos Serviços</h3>
        <p className="text-sm text-muted-foreground">
          Edite descrições, benefícios, imagens e vídeos de cada serviço
        </p>
      </div>

      <div className="space-y-3">
        {servicos.map((servico: any) => {
          const hasDetails = servico.descricao_detalhada || (servico.imagens?.length > 0) || servico.video_url || servico.imagem_capa;
          return (
            <div key={servico.id} className="glass-card rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-foreground truncate">{servico.nome}</h4>
                  <p className="text-xs text-muted-foreground">
                    {servico.descricao || "Sem descrição"} • {servico.duracao} min • R$ {Number(servico.preco).toFixed(2).replace(".", ",")}
                  </p>
                  {hasDetails ? (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-primary/10 text-primary mt-1 inline-block">
                      Detalhes configurados
                    </span>
                  ) : (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-muted text-muted-foreground mt-1 inline-block">
                      Sem detalhes extras
                    </span>
                  )}
                </div>
                <Button size="sm" variant="outline" onClick={() => openEditor(servico)} className="gap-1">
                  <Edit size={14} />
                  Editar
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Edit Dialog */}
      <Dialog open={!!editingId} onOpenChange={(open) => !open && setEditingId(null)}>
        <DialogContent className="max-w-lg max-h-[85vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Editar Detalhes do Serviço</DialogTitle>
          </DialogHeader>

          <div className="space-y-5">
            {/* Cover Image */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Imagem de Capa</label>
              {editData.imagem_capa && (
                <div className="relative mb-2">
                  <img src={editData.imagem_capa} alt="Capa" className="w-full h-32 object-cover rounded-xl" />
                  <button
                    onClick={() => setEditData((prev: any) => ({ ...prev, imagem_capa: "" }))}
                    className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground"
                  >
                    <X size={14} />
                  </button>
                </div>
              )}
              <label className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border border-dashed border-muted-foreground/30 hover:border-primary transition-colors">
                <Upload size={16} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Upload imagem de capa</span>
                <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "imagem_capa")} />
              </label>
            </div>

            {/* Detailed Description */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Descrição Detalhada</label>
              <Textarea
                value={editData.descricao_detalhada || ""}
                onChange={(e) => setEditData((prev: any) => ({ ...prev, descricao_detalhada: e.target.value }))}
                placeholder="Descreva em detalhes o que o cliente pode esperar deste serviço..."
                rows={4}
              />
            </div>

            {/* Benefits */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Benefícios</label>
              <div className="space-y-2 mb-2">
                {(editData.beneficios || []).map((b: string, i: number) => (
                  <div key={i} className="flex items-center gap-2 text-sm bg-muted/50 rounded-lg px-3 py-2">
                    <span className="flex-1">{b}</span>
                    <button onClick={() => removeBeneficio(i)} className="text-destructive hover:text-destructive/80">
                      <Trash2 size={14} />
                    </button>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newBeneficio}
                  onChange={(e) => setNewBeneficio(e.target.value)}
                  placeholder="Novo benefício..."
                  onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addBeneficio())}
                />
                <Button size="sm" variant="outline" onClick={addBeneficio}>
                  <Plus size={14} />
                </Button>
              </div>
            </div>

            {/* Video URL */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block flex items-center gap-1">
                <Video size={14} /> URL do Vídeo
              </label>
              <Input
                value={editData.video_url || ""}
                onChange={(e) => setEditData((prev: any) => ({ ...prev, video_url: e.target.value }))}
                placeholder="https://youtube.com/watch?v=... ou link direto .mp4"
              />
            </div>

            {/* Image Gallery */}
            <div>
              <label className="text-sm font-medium text-foreground mb-1 block flex items-center gap-1">
                <Image size={14} /> Galeria de Imagens
              </label>
              {(editData.imagens || []).length > 0 && (
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {editData.imagens.map((img: string, i: number) => (
                    <div key={i} className="relative aspect-square rounded-lg overflow-hidden group">
                      <img src={img} alt="" className="w-full h-full object-cover" />
                      <button
                        onClick={() => removeImage(i)}
                        className="absolute top-1 right-1 p-1 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              )}

              <div className="space-y-3">
                {/* Upload real */}
                <label className="flex items-center gap-2 cursor-pointer px-3 py-2 rounded-lg border border-dashed border-muted-foreground/30 hover:border-primary transition-colors">
                  <Upload size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {uploading ? "Enviando..." : "Upload de imagem real"}
                  </span>
                  <input type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "imagens")} disabled={uploading} />
                </label>

                {/* AI Generation */}
                <div className="border border-primary/20 rounded-lg p-3 bg-primary/5">
                  <p className="text-xs font-medium text-primary flex items-center gap-1 mb-2">
                    <Sparkles size={14} /> Gerar Imagem com IA
                  </p>
                  <div className="flex gap-2">
                    <Input
                      value={aiPrompt}
                      onChange={(e) => setAiPrompt(e.target.value)}
                      placeholder="Ex: Massagem relaxante com pedras quentes..."
                      className="text-sm"
                      onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), handleGenerateAI())}
                    />
                    <Button
                      size="sm"
                      onClick={handleGenerateAI}
                      disabled={generatingAI || !aiPrompt.trim()}
                      className="gap-1 shrink-0"
                    >
                      {generatingAI ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
                      {generatingAI ? "Gerando..." : "Gerar"}
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Save */}
            <div className="flex gap-2 pt-2">
              <Button variant="outline" className="flex-1" onClick={() => setEditingId(null)}>
                Cancelar
              </Button>
              <Button className="flex-1" onClick={handleSave} disabled={saving}>
                {saving ? <Loader2 size={16} className="animate-spin mr-1" /> : null}
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
