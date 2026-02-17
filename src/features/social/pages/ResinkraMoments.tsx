import { useState, useRef } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Camera,
  Instagram,
  Video,
  Image,
  Send,
  CheckCircle2,
  Clock,
  XCircle,
  Gift,
  Sparkles,
  Link as LinkIcon,
  ImagePlus,
  X,
  Loader2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/AppLayout";
import { AnimatedPageBackground } from "@/components/AnimatedPageBackground";
import { useSocialPosts } from "@/features/social/hooks/useSocialPosts";
import { toast } from "sonner";
import { ButtonLoader } from "@/components/LoadingSpinner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const ACCEPTED_FORMATS = "image/jpeg,image/png,image/webp,image/heic";
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};
const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
};

const PLATAFORMAS = [
  { value: "instagram", label: "Instagram", icon: Instagram },
  { value: "tiktok", label: "TikTok", icon: Video },
  { value: "facebook", label: "Facebook", icon: Image },
];

const TIPO_ICONS: Record<string, typeof Camera> = {
  story: Camera,
  feed: Image,
  reels: Video,
};

const ResinkraMoments = () => {
  const navigate = useNavigate();
  const {
    config,
    posts,
    agendamentosDisponiveis,
    submitPost,
    totalCashbackGanho,
    totalPostsAprovados,
    totalPostsPendentes,
    loading,
  } = useSocialPosts();

  const [tipoPost, setTipoPost] = useState("story");
  const [plataforma, setPlataforma] = useState("instagram");
  const [linkPost, setLinkPost] = useState("");
  const [descricao, setDescricao] = useState("");
  const [agendamentoId, setAgendamentoId] = useState("");
  const [enviando, setEnviando] = useState(false);
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  const cameraRef = useRef<HTMLInputElement>(null);
  const galleryRef = useRef<HTMLInputElement>(null);
  const { user } = useAuth();

  const selectedConfig = config.find((c) => c.tipo_post === tipoPost);

  const handleFileSelect = (file: File) => {
    if (file.size > MAX_FILE_SIZE) {
      toast.error("Arquivo muito grande. Máximo 5MB.");
      return;
    }
    if (!ACCEPTED_FORMATS.split(",").some((f) => file.type === f || (file.type === "" && file.name.toLowerCase().endsWith(".heic")))) {
      toast.error("Formato não suportado. Use JPEG, PNG, WebP ou HEIC.");
      return;
    }
    setScreenshotFile(file);
    const url = URL.createObjectURL(file);
    setScreenshotPreview(url);
  };

  const clearScreenshot = () => {
    if (screenshotPreview) URL.revokeObjectURL(screenshotPreview);
    setScreenshotFile(null);
    setScreenshotPreview(null);
  };

  const uploadScreenshot = async (): Promise<string | null> => {
    if (!screenshotFile || !user) return null;
    setUploading(true);
    try {
      const ext = screenshotFile.name.split(".").pop()?.toLowerCase() || "jpg";
      const path = `${user.id}/${Date.now()}.${ext}`;
      const { error } = await supabase.storage
        .from("social-posts")
        .upload(path, screenshotFile, { contentType: screenshotFile.type, upsert: false });
      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from("social-posts")
        .getPublicUrl(path);

      return urlData.publicUrl || path;
    } catch (err: any) {
      console.error("Upload error:", err);
      toast.error("Erro ao enviar foto. Tente novamente.");
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (!linkPost.trim() && !screenshotFile) {
      toast.error("Cole o link do post ou envie uma foto/screenshot");
      return;
    }
    setEnviando(true);
    try {
      let screenshotUrl: string | null = null;
      if (screenshotFile) {
        screenshotUrl = await uploadScreenshot();
      }

      await submitPost.mutateAsync({
        tipo_post: tipoPost,
        plataforma,
        link_post: linkPost.trim() || undefined,
        screenshot_url: screenshotUrl || undefined,
        descricao: descricao.trim() || undefined,
        agendamento_id: agendamentoId || undefined,
      });
      toast.success("Post enviado para aprovação! 📸");
      setLinkPost("");
      setDescricao("");
      setAgendamentoId("");
      clearScreenshot();
    } catch (err: any) {
      toast.error(err.message || "Erro ao enviar post");
    }
    setEnviando(false);
  };

  const statusIcon = (status: string) => {
    if (status === "aprovado") return <CheckCircle2 size={16} className="text-highlight" />;
    if (status === "rejeitado") return <XCircle size={16} className="text-destructive" />;
    return <Clock size={16} className="text-warning" />;
  };

  const statusLabel = (status: string) => {
    if (status === "aprovado") return "Aprovado";
    if (status === "rejeitado") return "Rejeitado";
    return "Pendente";
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background gradient-hero pb-24 lg:pb-8 relative overflow-hidden">
        <AnimatedPageBackground />
        <div className="max-w-lg lg:max-w-4xl mx-auto px-4 lg:px-8 safe-top pt-4 relative z-10">
          {/* Header */}
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-3 mb-5">
            <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-muted/50 transition-colors">
              <ArrowLeft size={22} className="text-foreground" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Resinkra Moments</h1>
              <p className="text-xs text-muted-foreground">Poste nas redes e ganhe recompensas</p>
            </div>
          </motion.div>

          <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
            {/* Hero banner */}
            <motion.div variants={fadeUp}>
              <div className="relative overflow-hidden rounded-3xl p-6 text-primary-foreground">
                <div className="absolute inset-0 gradient-primary" />
                <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-accent/20 blur-2xl" />
                <div className="relative z-10 text-center space-y-3">
                  <div className="w-14 h-14 mx-auto rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
                    <Camera size={28} />
                  </div>
                  <h2 className="text-lg font-bold font-serif">Poste e Ganhe!</h2>
                  <p className="text-sm opacity-90">Compartilhe sua experiência na Resinkra nas redes sociais e receba cashback + XP</p>
                </div>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div variants={fadeUp} className="grid grid-cols-3 gap-3">
              <div className="p-3 rounded-2xl glass-card-strong text-center">
                <p className="text-xl font-bold text-foreground">{totalPostsAprovados}</p>
                <p className="text-[10px] text-muted-foreground">Aprovados</p>
              </div>
              <div className="p-3 rounded-2xl glass-card-strong text-center">
                <p className="text-xl font-bold text-highlight">R$ {totalCashbackGanho.toFixed(2).replace(".", ",")}</p>
                <p className="text-[10px] text-muted-foreground">Cashback</p>
              </div>
              <div className="p-3 rounded-2xl glass-card-strong text-center">
                <p className="text-xl font-bold text-warning">{totalPostsPendentes}</p>
                <p className="text-[10px] text-muted-foreground">Pendentes</p>
              </div>
            </motion.div>

            {/* Reward tiers */}
            <motion.div variants={fadeUp} className="space-y-2.5">
              <p className="section-label px-1">Recompensas por tipo</p>
              <div className="space-y-2">
                {config.map((c) => {
                  const Icon = TIPO_ICONS[c.tipo_post] || Camera;
                  const isSelected = tipoPost === c.tipo_post;
                  return (
                    <button
                      key={c.id}
                      onClick={() => setTipoPost(c.tipo_post)}
                      className={`w-full p-4 rounded-2xl transition-all duration-200 text-left flex items-center gap-3 ${
                        isSelected
                          ? "glass-card-strong ring-2 ring-primary/50 shadow-md"
                          : "glass-card-strong opacity-70 hover:opacity-100"
                      }`}
                    >
                      <div className={`p-2.5 rounded-xl ${isSelected ? "bg-primary/15" : "bg-muted/50"}`}>
                        <Icon size={20} className={isSelected ? "text-primary" : "text-muted-foreground"} />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-foreground">{c.label}</p>
                        <p className="text-xs text-muted-foreground">{c.descricao}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-highlight">R$ {Number(c.cashback_valor).toFixed(2).replace(".", ",")}</p>
                        <p className="text-[10px] text-muted-foreground">+{c.xp_valor} XP</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </motion.div>

            {/* Submit form */}
            <motion.div variants={fadeUp} className="space-y-2.5">
              <p className="section-label px-1">Enviar post</p>
              <div className="p-4 rounded-2xl glass-card-strong space-y-3">
                  <>
                    {agendamentosDisponiveis.length > 0 && (
                      <div>
                        <label className="text-xs text-muted-foreground mb-1 block">Visita relacionada (opcional)</label>
                        <Select value={agendamentoId} onValueChange={setAgendamentoId}>
                          <SelectTrigger>
                            <SelectValue placeholder="Selecione a visita" />
                          </SelectTrigger>
                          <SelectContent>
                            {agendamentosDisponiveis.map((a: any) => (
                              <SelectItem key={a.id} value={a.id}>
                                {a.servico} — {new Date(a.data_hora).toLocaleDateString("pt-BR")}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Plataforma</label>
                      <div className="flex gap-2">
                        {PLATAFORMAS.map((p) => (
                          <button
                            key={p.value}
                            onClick={() => setPlataforma(p.value)}
                            className={`flex-1 p-2 rounded-xl text-xs font-medium flex items-center justify-center gap-1 transition-all ${
                              plataforma === p.value
                                ? "bg-primary/15 text-primary ring-1 ring-primary/30"
                                : "bg-muted/50 text-muted-foreground hover:bg-muted"
                            }`}
                          >
                            <p.icon size={14} />
                            {p.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Screenshot / Foto */}
                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Foto ou Screenshot do post</label>
                      
                      {/* Hidden inputs */}
                      <input
                        ref={cameraRef}
                        type="file"
                        accept="image/jpeg,image/png,image/webp"
                        capture="environment"
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                      />
                      <input
                        ref={galleryRef}
                        type="file"
                        accept={ACCEPTED_FORMATS}
                        className="hidden"
                        onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                      />

                      {screenshotPreview ? (
                        <div className="relative rounded-xl overflow-hidden border border-border">
                          <img
                            src={screenshotPreview}
                            alt="Preview"
                            className="w-full max-h-48 object-cover"
                          />
                          <button
                            onClick={clearScreenshot}
                            className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 backdrop-blur-sm hover:bg-destructive/20 transition-colors"
                          >
                            <X size={14} className="text-foreground" />
                          </button>
                          {uploading && (
                            <div className="absolute inset-0 bg-background/60 flex items-center justify-center">
                              <Loader2 size={24} className="animate-spin text-primary" />
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <button
                            type="button"
                            onClick={() => cameraRef.current?.click()}
                            className="flex-1 p-3 rounded-xl border-2 border-dashed border-primary/30 bg-primary/5 hover:bg-primary/10 transition-colors flex flex-col items-center gap-1.5"
                          >
                            <Camera size={20} className="text-primary" />
                            <span className="text-xs font-medium text-primary">Câmera</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => galleryRef.current?.click()}
                            className="flex-1 p-3 rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/30 hover:bg-muted/50 transition-colors flex flex-col items-center gap-1.5"
                          >
                            <ImagePlus size={20} className="text-muted-foreground" />
                            <span className="text-xs font-medium text-muted-foreground">Galeria</span>
                          </button>
                        </div>
                      )}
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Link do post (opcional)</label>
                      <div className="relative">
                        <LinkIcon size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                        <Input
                          placeholder="https://instagram.com/p/..."
                          value={linkPost}
                          onChange={(e) => setLinkPost(e.target.value)}
                          className="pl-9"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="text-xs text-muted-foreground mb-1 block">Comentário (opcional)</label>
                      <Textarea
                        placeholder="Conte como foi sua experiência..."
                        value={descricao}
                        onChange={(e) => setDescricao(e.target.value)}
                        rows={2}
                      />
                    </div>

                    <Button onClick={handleSubmit} disabled={enviando} className="w-full gap-2">
                      {enviando ? <ButtonLoader /> : <Send size={16} />}
                      Enviar para aprovação
                    </Button>

                    {selectedConfig && (
                      <p className="text-xs text-center text-muted-foreground">
                        Você receberá <span className="text-highlight font-semibold">R$ {Number(selectedConfig.cashback_valor).toFixed(2).replace(".", ",")}</span> + <span className="text-primary font-semibold">{selectedConfig.xp_valor} XP</span> após aprovação
                      </p>
                    )}
                  </>
              </div>
            </motion.div>

            {/* History */}
            {posts.length > 0 && (
              <motion.div variants={fadeUp} className="space-y-2.5">
                <p className="section-label px-1">Histórico</p>
                <div className="space-y-2">
                  {posts.map((post) => {
                    const Icon = TIPO_ICONS[post.tipo_post] || Camera;
                    return (
                      <div key={post.id} className="p-4 rounded-2xl glass-card-strong">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-xl bg-primary/10">
                              <Icon size={18} className="text-primary" />
                            </div>
                            <div>
                              <p className="font-medium text-foreground text-sm capitalize">{post.tipo_post} · {post.plataforma}</p>
                              <p className="text-xs text-muted-foreground">{new Date(post.created_at).toLocaleDateString("pt-BR")}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            {post.status === "aprovado" && (
                              <Badge variant="outline" className="text-highlight border-highlight/30 text-[10px]">
                                +R$ {Number(post.cashback_valor).toFixed(2).replace(".", ",")}
                              </Badge>
                            )}
                            <div className="flex items-center gap-1">
                              {statusIcon(post.status)}
                              <span className="text-xs text-muted-foreground">{statusLabel(post.status)}</span>
                            </div>
                          </div>
                        </div>
                        {post.motivo_rejeicao && (
                          <p className="text-xs text-destructive mt-2 bg-destructive/10 p-2 rounded-lg">{post.motivo_rejeicao}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              </motion.div>
            )}

            {/* How it works */}
            <motion.div variants={fadeUp} className="space-y-2.5">
              <p className="section-label px-1">Como funciona</p>
              <div className="p-4 rounded-2xl glass-card-strong space-y-3">
                {[
                  { step: "1", text: "Visite a Resinkra e aproveite seu atendimento" },
                  { step: "2", text: "Poste nas redes sociais marcando @resinkra" },
                  { step: "3", text: "Envie o link do post aqui no app" },
                  { step: "4", text: "Após aprovação, receba cashback + XP!" },
                ].map(({ step, text }) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">{step}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{text}</p>
                  </div>
                ))}
                <div className="pt-2 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">
                    📸 Limite: <strong>3 posts premiados por visita</strong> · Aprovação em até 24h
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default ResinkraMoments;
