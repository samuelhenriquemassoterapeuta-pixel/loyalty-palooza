import { useState } from "react";
import { motion } from "framer-motion";
import { Upload, Trash2, Video, Search, X, Film, Link, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

const nivelColors: Record<string, string> = {
  iniciante: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  intermediario: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
  avancado: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
};

export const ExerciciosTab = () => {
  const queryClient = useQueryClient();
  const [busca, setBusca] = useState("");
  const [categoriaFiltro, setCategoriaFiltro] = useState("todos");
  const [uploadingId, setUploadingId] = useState<string | null>(null);
  const [urlInputId, setUrlInputId] = useState<string | null>(null);
  const [videoUrl, setVideoUrl] = useState("");

  const { data: exercicios = [], isLoading } = useQuery({
    queryKey: ["admin-exercicios"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("exercicios_alongamento")
        .select("*")
        .order("categoria")
        .order("nome");
      if (error) throw error;
      return data;
    },
  });

  const categorias = [...new Set(exercicios.map((e) => e.categoria))];

  const filtrados = exercicios
    .filter((e) => categoriaFiltro === "todos" || e.categoria === categoriaFiltro)
    .filter((e) => e.nome.toLowerCase().includes(busca.toLowerCase()));

  const handleVideoUpload = async (exercicioId: string, file: File) => {
    if (!file.type.startsWith("video/")) {
      toast.error("Selecione um arquivo de vídeo válido");
      return;
    }

    if (file.size > 50 * 1024 * 1024) {
      toast.error("O vídeo deve ter no máximo 50MB");
      return;
    }

    setUploadingId(exercicioId);

    try {
      const ext = file.name.split(".").pop() || "mp4";
      const fileName = `exercise-${exercicioId}.${ext}`;

      const { error: uploadError } = await supabase.storage
        .from("exercise-videos")
        .upload(fileName, file, { upsert: true, contentType: file.type });

      if (uploadError) throw uploadError;

      const { data: urlData } = supabase.storage
        .from("exercise-videos")
        .getPublicUrl(fileName);

      const { error: updateError } = await supabase
        .from("exercicios_alongamento")
        .update({ video_url: urlData.publicUrl })
        .eq("id", exercicioId);

      if (updateError) throw updateError;

      queryClient.invalidateQueries({ queryKey: ["admin-exercicios"] });
      toast.success("Vídeo enviado com sucesso!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao enviar vídeo");
    } finally {
      setUploadingId(null);
    }
  };

  const handleRemoveVideo = async (exercicioId: string) => {
    if (!confirm("Remover o vídeo deste exercício?")) return;

    try {
      const { error } = await supabase
        .from("exercicios_alongamento")
        .update({ video_url: null })
        .eq("id", exercicioId);

      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ["admin-exercicios"] });
      toast.success("Vídeo removido");
    } catch (error: any) {
      toast.error(error.message || "Erro ao remover");
    }
  };

  const isValidVideoUrl = (url: string) => {
    return /^https?:\/\/.+/i.test(url) && (
      /youtube\.com|youtu\.be/i.test(url) ||
      /vimeo\.com/i.test(url) ||
      /\.(mp4|webm|ogg|mov)(\?|$)/i.test(url)
    );
  };

  const handleSaveUrl = async (exercicioId: string) => {
    const trimmed = videoUrl.trim();
    if (!trimmed) {
      toast.error("Insira uma URL válida");
      return;
    }
    if (!isValidVideoUrl(trimmed)) {
      toast.error("URL inválida. Use YouTube, Vimeo ou link direto de vídeo (.mp4, .webm)");
      return;
    }

    try {
      const { error } = await supabase
        .from("exercicios_alongamento")
        .update({ video_url: trimmed })
        .eq("id", exercicioId);

      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ["admin-exercicios"] });
      setUrlInputId(null);
      setVideoUrl("");
      toast.success("URL do vídeo salva!");
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar URL");
    }
  };

  const toggleDisponivel = async (id: string, disponivel: boolean) => {
    try {
      const { error } = await supabase
        .from("exercicios_alongamento")
        .update({ disponivel: !disponivel })
        .eq("id", id);
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ["admin-exercicios"] });
    } catch {
      toast.error("Erro ao atualizar");
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <LoadingSpinner size="sm" />
      </div>
    );
  }

  const comVideo = exercicios.filter((e) => e.video_url).length;
  const semVideo = exercicios.length - comVideo;

  return (
    <div className="space-y-4">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-3 text-center">
          <p className="text-2xl font-bold text-foreground">{exercicios.length}</p>
          <p className="text-xs text-muted-foreground">Total</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-2xl font-bold text-green-600">{comVideo}</p>
          <p className="text-xs text-muted-foreground">Com vídeo</p>
        </Card>
        <Card className="p-3 text-center">
          <p className="text-2xl font-bold text-orange-600">{semVideo}</p>
          <p className="text-xs text-muted-foreground">Sem vídeo</p>
        </Card>
      </div>

      {/* Search + Filter */}
      <div className="space-y-2">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
          <Input
            placeholder="Buscar exercício..."
            value={busca}
            onChange={(e) => setBusca(e.target.value)}
            className="pl-9 pr-9"
          />
          {busca && (
            <button onClick={() => setBusca("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
              <X size={16} />
            </button>
          )}
        </div>
        <div className="flex gap-1.5 overflow-x-auto pb-1">
          <Button
            variant={categoriaFiltro === "todos" ? "default" : "outline"}
            size="sm"
            className="text-xs shrink-0"
            onClick={() => setCategoriaFiltro("todos")}
          >
            Todos
          </Button>
          {categorias.map((cat) => (
            <Button
              key={cat}
              variant={categoriaFiltro === cat ? "default" : "outline"}
              size="sm"
              className="text-xs shrink-0 capitalize"
              onClick={() => setCategoriaFiltro(cat)}
            >
              {cat.replace("_", " ")}
            </Button>
          ))}
        </div>
      </div>

      {/* Exercise list */}
      <div className="space-y-2">
        {filtrados.map((ex, i) => (
          <motion.div
            key={ex.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.02 }}
          >
            <Card className="p-3">
              <div className="flex items-start gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h4 className="font-semibold text-sm text-foreground truncate">{ex.nome}</h4>
                    <Badge variant="outline" className={`text-[10px] border-0 ${nivelColors[ex.nivel] || ""}`}>
                      {ex.nivel}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground capitalize mt-0.5">
                    {ex.categoria.replace("_", " ")} · {ex.duracao_segundos}s
                  </p>

                  {/* Video status */}
                  <div className="flex items-center gap-2 mt-2">
                    {ex.video_url ? (
                      <span className="flex items-center gap-1 text-xs text-green-600">
                        <Film size={12} />
                        {/youtube|youtu\.be/i.test(ex.video_url) ? "YouTube" : "Vídeo enviado"}
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 text-xs text-orange-500">
                        <Video size={12} />
                        Sem vídeo (usando animação SVG)
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 shrink-0">
                  <Switch
                    checked={ex.disponivel ?? true}
                    onCheckedChange={() => toggleDisponivel(ex.id, ex.disponivel ?? true)}
                  />

                  {/* YouTube URL button */}
                  <Button
                    size="icon"
                    variant={urlInputId === ex.id ? "default" : "ghost"}
                    className="h-8 w-8"
                    onClick={() => {
                      if (urlInputId === ex.id) {
                        setUrlInputId(null);
                        setVideoUrl("");
                      } else {
                        setUrlInputId(ex.id);
                        setVideoUrl(ex.video_url || "");
                      }
                    }}
                  >
                    <Link size={14} />
                  </Button>

                  {/* Upload video button */}
                  <label className="cursor-pointer">
                    <input
                      type="file"
                      accept="video/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleVideoUpload(ex.id, file);
                        e.target.value = "";
                      }}
                      disabled={uploadingId === ex.id}
                    />
                    <div className="h-8 w-8 flex items-center justify-center rounded-md hover:bg-primary/10 transition-colors">
                      {uploadingId === ex.id ? (
                        <LoadingSpinner size="sm" />
                      ) : (
                        <Upload size={16} className="text-primary" />
                      )}
                    </div>
                  </label>

                  {/* Remove video */}
                  {ex.video_url && (
                    <Button
                      size="icon"
                      variant="ghost"
                      className="h-8 w-8 text-destructive hover:bg-destructive/10"
                      onClick={() => handleRemoveVideo(ex.id)}
                    >
                      <Trash2 size={14} />
                    </Button>
                  )}
                </div>
              </div>

              {/* Inline URL input */}
              {urlInputId === ex.id && (
                <div className="flex gap-2 mt-2 pt-2 border-t border-border">
                  <Input
                    placeholder="Cole a URL do YouTube ou vídeo..."
                    value={videoUrl}
                    onChange={(e) => setVideoUrl(e.target.value)}
                    className="h-8 text-xs"
                    onKeyDown={(e) => e.key === "Enter" && handleSaveUrl(ex.id)}
                  />
                  <Button
                    size="sm"
                    className="h-8 px-3 shrink-0"
                    onClick={() => handleSaveUrl(ex.id)}
                  >
                    <Check size={14} className="mr-1" />
                    Salvar
                  </Button>
                </div>
              )}
            </Card>
          </motion.div>
        ))}
      </div>

      {filtrados.length === 0 && (
        <div className="text-center py-8 text-muted-foreground text-sm">
          Nenhum exercício encontrado
        </div>
      )}
    </div>
  );
};
