import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion, AnimatePresence } from "framer-motion";
import {
  Share2,
  ShieldCheck,
  Instagram,
  X,
  Copy,
  Heart,
  MessageCircle,
  Bookmark,
  CheckCircle2,
  Sparkles,
  ImageOff,
} from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

// ── Types ───────────────────────────────────────────────────────────────────
interface FeedPost {
  id: string;
  user_id: string;
  tipo_post: string;
  plataforma: string;
  screenshot_url: string | null;
  descricao: string | null;
  status: string;
  cashback_valor: number;
  xp_valor: number;
  cromos_ether: number;
  ai_verified: boolean;
  approved_by_users: string[];
  created_at: string;
}

// ── Status config ────────────────────────────────────────────────────────────
const statusConfig: Record<string, { label: string; className: string }> = {
  aprovado: { label: "Aprovado", className: "bg-primary/10 text-primary border-primary/20" },
  pendente: { label: "Pendente", className: "bg-secondary text-secondary-foreground border-border" },
  rejeitado: { label: "Rejeitado", className: "bg-destructive/10 text-destructive border-destructive/20" },
};

// ── Share Modal ──────────────────────────────────────────────────────────────
const ShareModal = ({
  post,
  codigoIndicacao,
  onClose,
}: {
  post: FeedPost;
  codigoIndicacao: string;
  onClose: () => void;
}) => {
  const [copied, setCopied] = useState(false);

  const stickerText = `Use meu código na Resinkra e ganhe R$10`;
  const codigoFormatado = codigoIndicacao || "RESINKRA";
  const captionText = `${stickerText}\n🌿 Código: ${codigoFormatado}\n📲 resinkra.com.br`;

  const handleCopyCaption = () => {
    navigator.clipboard.writeText(captionText);
    setCopied(true);
    toast.success("Legenda copiada!", { duration: 2000 });
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="max-w-sm gap-0 p-0 overflow-hidden rounded-2xl">
        <DialogHeader className="px-5 pt-5 pb-3">
          <DialogTitle className="flex items-center gap-2 text-base">
            <Instagram size={18} className="text-primary" />
            Compartilhar no Stories
          </DialogTitle>
        </DialogHeader>

        {/* Preview do Stories */}
        <div className="px-5 pb-4">
          <div
            className="relative w-full aspect-[9/16] max-h-[380px] rounded-2xl overflow-hidden bg-gradient-to-b from-[hsl(var(--primary)/0.8)] to-[hsl(var(--primary)/0.4)] flex items-center justify-center"
          >
            {/* Imagem de fundo */}
            {post.screenshot_url ? (
              <img
                src={post.screenshot_url}
                alt="Post"
                className="absolute inset-0 w-full h-full object-cover"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-b from-primary/30 via-primary/20 to-accent/20" />
            )}

            {/* Overlay escurecido na parte superior e inferior */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />

            {/* Barra superior simulando Instagram */}
            <div className="absolute top-0 left-0 right-0 px-4 pt-3 pb-2 flex items-center gap-2">
              <div className="h-0.5 flex-1 bg-white/60 rounded-full" />
              <div className="h-0.5 flex-1 bg-white/30 rounded-full" />
              <div className="h-0.5 flex-1 bg-white/30 rounded-full" />
            </div>

            {/* Header do stories */}
            <div className="absolute top-6 left-0 right-0 px-4 flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary border-2 border-white flex items-center justify-center">
                <span className="text-xs font-bold text-primary-foreground">R</span>
              </div>
              <div>
                <p className="text-white text-xs font-semibold leading-none">Resinkra</p>
                <p className="text-white/60 text-[9px]">agora</p>
              </div>
              <X size={14} className="text-white/80 ml-auto" />
            </div>

            {/* Sticker de indicação — elemento principal */}
            <motion.div
              className="absolute bottom-20 left-1/2 -translate-x-1/2 w-[75%]"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 300, damping: 22, delay: 0.2 }}
            >
              <div className="rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm bg-white/95 border border-white/50">
                {/* Faixa superior do sticker */}
                <div
                  className="px-3 py-2 flex items-center gap-2"
                  style={{
                    background: "linear-gradient(135deg, hsl(var(--primary)), hsl(var(--accent)))",
                  }}
                >
                  <Sparkles size={12} className="text-white" />
                  <span className="text-white text-[10px] font-bold tracking-wide uppercase">
                    Resinkra Moments
                  </span>
                </div>

                {/* Corpo do sticker */}
                <div className="px-3 py-2.5 text-center">
                  <p className="text-foreground text-xs font-semibold leading-snug">
                    {stickerText}
                  </p>
                  <div className="mt-1.5 bg-primary/10 rounded-lg px-3 py-1 inline-block">
                    <p className="text-primary font-bold text-sm tracking-widest">
                      {codigoFormatado}
                    </p>
                  </div>
                  <p className="text-muted-foreground text-[9px] mt-1">
                    resinkra.com.br
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Bottom bar simulando Stories */}
            <div className="absolute bottom-4 left-0 right-0 px-4">
              <div className="bg-white/20 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 border border-white/30">
                <span className="text-white/70 text-[11px] flex-1">Enviar mensagem...</span>
                <Share2 size={14} className="text-white/80" />
              </div>
            </div>
          </div>
        </div>

        {/* Legenda copiável */}
        <div className="px-5 pb-5 space-y-3">
          <div className="rounded-xl bg-muted/50 border border-border/60 p-3">
            <p className="text-xs font-medium text-muted-foreground mb-1.5">Legenda sugerida</p>
            <p className="text-xs text-foreground whitespace-pre-line leading-relaxed">
              {captionText}
            </p>
          </div>

          <div className="flex gap-2">
            <Button
              className="flex-1 gap-2 text-sm h-10"
              onClick={handleCopyCaption}
            >
              {copied ? (
                <>
                  <CheckCircle2 size={15} />
                  Copiado!
                </>
              ) : (
                <>
                  <Copy size={15} />
                  Copiar legenda
                </>
              )}
            </Button>
            <Button variant="outline" size="icon" className="h-10 w-10 shrink-0" onClick={onClose}>
              <X size={15} />
            </Button>
          </div>

          <p className="text-center text-[10px] text-muted-foreground/60">
            Abra o Instagram, cole a legenda e adicione o sticker manualmente 🌿
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// ── Post Card ────────────────────────────────────────────────────────────────
const PostCard = ({
  post,
  codigoIndicacao,
  index,
}: {
  post: FeedPost;
  codigoIndicacao: string;
  index: number;
}) => {
  const [shareOpen, setShareOpen] = useState(false);
  const status = statusConfig[post.status] ?? statusConfig.pendente;

  const dataFormatada = format(new Date(post.created_at), "d 'de' MMM", { locale: ptBR });
  const tipoLabel = post.tipo_post === "story" ? "Story" : post.tipo_post === "reels" ? "Reels" : "Feed";

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.06, type: "spring", stiffness: 300, damping: 26 }}
      >
        <Card className="overflow-hidden border-border/60 hover:border-primary/30 transition-colors duration-200">
          {/* Imagem com borda condicional AI verified */}
          <div className="relative">
            {/* Borda gradiente dourada quando ai_verified */}
            {post.ai_verified && (
              <div
                className="absolute -inset-[2px] rounded-t-[calc(var(--radius)+2px)] z-0"
                style={{
                  background: "linear-gradient(135deg, hsl(45,90%,55%), hsl(25,90%,55%), hsl(45,90%,55%))",
                }}
              />
            )}

            <div
              className={`relative ${post.ai_verified ? "m-[2px] rounded-t-[calc(var(--radius)-0px)] overflow-hidden" : ""}`}
            >
              {/* Screenshot / placeholder */}
              <div className="aspect-square bg-muted/50 relative overflow-hidden">
                {post.screenshot_url ? (
                  <img
                    src={post.screenshot_url}
                    alt={`Post ${tipoLabel}`}
                    className="w-full h-full object-cover"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-primary/5 to-accent/5">
                    <ImageOff size={28} className="text-muted-foreground/40" />
                    <p className="text-xs text-muted-foreground/50">{tipoLabel}</p>
                  </div>
                )}

                {/* Badge de tipo no canto */}
                <div className="absolute top-2 left-2">
                  <Badge variant="outline" className="text-[10px] bg-black/50 text-white border-white/20 backdrop-blur-sm">
                    {tipoLabel}
                  </Badge>
                </div>

                {/* Escudo dourado AI verified flutuante */}
                {post.ai_verified && (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <motion.div
                          className="absolute top-2 right-2 cursor-help"
                          initial={{ scale: 0, rotate: -15 }}
                          animate={{ scale: 1, rotate: 0 }}
                          transition={{ type: "spring", stiffness: 400, damping: 20, delay: index * 0.06 + 0.3 }}
                        >
                          <div
                            className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg border-2 border-white/80"
                            style={{
                              background: "linear-gradient(135deg, hsl(45,90%,55%), hsl(30,90%,50%))",
                            }}
                          >
                            <ShieldCheck size={16} className="text-white drop-shadow" />
                          </div>
                        </motion.div>
                      </TooltipTrigger>
                      <TooltipContent side="left" className="text-xs max-w-[160px] text-center">
                        ✅ Postura Verificada pela IA
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </div>
          </div>

          {/* Info do post — estilo Instagram */}
          <CardContent className="p-3 space-y-2.5">
            {/* Ações */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button className="flex items-center gap-1 text-muted-foreground hover:text-destructive transition-colors">
                  <Heart size={18} />
                </button>
                <button className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors">
                  <MessageCircle size={18} />
                </button>
                {/* Botão compartilhar */}
                <button
                  onClick={() => setShareOpen(true)}
                  className="flex items-center gap-1 text-muted-foreground hover:text-primary transition-colors"
                >
                  <Share2 size={18} />
                </button>
              </div>
              <button className="text-muted-foreground hover:text-foreground transition-colors">
                <Bookmark size={18} />
              </button>
            </div>

            {/* Status + data */}
            <div className="flex items-center justify-between gap-2">
              <Badge variant="outline" className={`text-[10px] font-medium ${status.className}`}>
                {status.label}
              </Badge>
              <span className="text-[10px] text-muted-foreground">{dataFormatada}</span>
            </div>

            {/* Recompensas (apenas se aprovado) */}
            {post.status === "aprovado" && (
              <div className="flex items-center gap-2 flex-wrap">
                {post.cashback_valor > 0 && (
                  <span className="text-[10px] font-medium text-primary bg-primary/8 px-2 py-0.5 rounded-full border border-primary/15">
                    +R${post.cashback_valor.toFixed(2)} cashback
                  </span>
                )}
                {post.xp_valor > 0 && (
                  <span className="text-[10px] font-medium text-foreground/70 bg-muted px-2 py-0.5 rounded-full border border-border">
                    +{post.xp_valor} XP
                  </span>
                )}
                {post.cromos_ether > 0 && (
                  <span className="text-[10px] font-medium text-foreground/70 bg-muted px-2 py-0.5 rounded-full border border-border">
                    +{post.cromos_ether} Éther ⚗️
                  </span>
                )}
              </div>
            )}

            {/* Descrição */}
            {post.descricao && (
              <p className="text-xs text-muted-foreground line-clamp-2 leading-relaxed">
                {post.descricao}
              </p>
            )}
          </CardContent>
        </Card>
      </motion.div>

      {/* Modal de compartilhamento */}
      <AnimatePresence>
        {shareOpen && (
          <ShareModal
            post={post}
            codigoIndicacao={codigoIndicacao}
            onClose={() => setShareOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

// ── Skeleton ─────────────────────────────────────────────────────────────────
const PostSkeleton = () => (
  <Card className="overflow-hidden border-border/60">
    <Skeleton className="aspect-square w-full rounded-none" />
    <CardContent className="p-3 space-y-2">
      <div className="flex gap-3">
        <Skeleton className="h-5 w-5 rounded" />
        <Skeleton className="h-5 w-5 rounded" />
        <Skeleton className="h-5 w-5 rounded" />
      </div>
      <Skeleton className="h-4 w-20 rounded-full" />
      <Skeleton className="h-3 w-full rounded" />
    </CardContent>
  </Card>
);

// ── Main component ───────────────────────────────────────────────────────────
export const SocialViralFeed = () => {
  const { user } = useAuth();

  // Busca todos os posts ordenados pelos mais recentes
  const { data: posts = [], isLoading } = useQuery({
    queryKey: ["social-viral-feed"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("social_posts")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as FeedPost[];
    },
    staleTime: 30_000,
  });

  // Busca o código de indicação do usuário logado
  const { data: codigoIndicacao = "" } = useQuery({
    queryKey: ["codigo-indicacao", user?.id],
    queryFn: async () => {
      const { data } = await supabase
        .from("profiles")
        .select("codigo_indicacao")
        .eq("id", user!.id)
        .single();
      return data?.codigo_indicacao ?? "";
    },
    enabled: !!user,
    staleTime: 60_000,
  });

  const postsVerificados = posts.filter((p) => p.ai_verified).length;

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-semibold text-foreground text-base">Feed Moments</h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            {posts.length} publicações · {postsVerificados} verificadas pela IA
          </p>
        </div>
        {postsVerificados > 0 && (
          <div
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-medium"
            style={{
              background: "linear-gradient(135deg, hsl(45,90%,55%/0.12), hsl(25,90%,55%/0.08))",
              borderColor: "hsl(45,90%,55%/0.3)",
              color: "hsl(35,80%,45%)",
            }}
          >
            <ShieldCheck size={13} />
            {postsVerificados} verificado{postsVerificados > 1 ? "s" : ""}
          </div>
        )}
      </div>

      {/* Grid de posts estilo Instagram */}
      {isLoading ? (
        <div className="grid grid-cols-2 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (
            <PostSkeleton key={i} />
          ))}
        </div>
      ) : posts.length === 0 ? (
        <Card className="border-border/60">
          <CardContent className="py-12 text-center">
            <Instagram className="mx-auto h-12 w-12 mb-3 text-muted-foreground/30" />
            <p className="text-sm font-medium text-foreground">Nenhum post ainda</p>
            <p className="text-xs text-muted-foreground mt-1">
              Compartilhe suas sessões e ganhe recompensas!
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {posts.map((post, idx) => (
            <PostCard
              key={post.id}
              post={post}
              codigoIndicacao={codigoIndicacao}
              index={idx}
            />
          ))}
        </div>
      )}
    </div>
  );
};
