import { useQuery, useQueryClient } from "@tanstack/react-query";
import { ShoppingCart, Sparkles, Loader2 } from "lucide-react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

interface SmartRecommendation {
  produto_id: string;
  nome: string;
  preco: number;
  imagem_url: string | null;
  motivo: string;
}

interface ProductRecommendationsProps {
  onAddToCart?: (produto: { id: string; nome: string; preco: number; imagem_url: string | null }) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 280, damping: 24 },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Determina a cor do badge de motivo com base no texto */
const getBadgeStyle = (motivo: string): string => {
  if (motivo.toLowerCase().includes("sono")) return "bg-violet-500/15 text-violet-400 border-violet-500/30";
  if (motivo.toLowerCase().includes("estress")) return "bg-amber-500/15 text-amber-400 border-amber-500/30";
  return "bg-primary/15 text-primary border-primary/30";
};

export const ProductRecommendations = ({ onAddToCart }: ProductRecommendationsProps) => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: recomendacoes = [], isLoading, isError } = useQuery({
    queryKey: ["smart-recommendations", user?.id],
    enabled: !!user,
    staleTime: 1000 * 60 * 10, // 10 min cache
    queryFn: async () => {
      const { data, error } = await (supabase.rpc as any)("get_user_smart_recommendations", {
        p_user_id: user!.id,
      });
      if (error) throw error;
      return (data || []) as unknown as SmartRecommendation[];
    },
  });

  /** Optimistic update: adiciona o produto localmente antes de qualquer chamada */
  const handleAddToCart = (rec: SmartRecommendation) => {
    const produto = {
      id: rec.produto_id,
      nome: rec.nome,
      preco: rec.preco,
      imagem_url: rec.imagem_url,
    };

    // Optimistic: remove do cache de recomendações visualmente (opcional)
    queryClient.setQueryData<SmartRecommendation[]>(
      ["smart-recommendations", user?.id],
      (old) => old ?? []
    );

    onAddToCart?.(produto);

    toast.success(`${rec.nome} adicionado ao carrinho! 🛒`);
  };

  if (!user) return null;

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-8 gap-2 text-muted-foreground text-sm">
        <Loader2 size={16} className="animate-spin" />
        Buscando recomendações para você...
      </div>
    );
  }

  if (isError || recomendacoes.length === 0) return null;

  return (
    <section className="mb-6">
      {/* Cabeçalho */}
      <div className="flex items-center gap-2 mb-3 px-1">
        <Sparkles size={16} className="text-primary" />
        <h2 className="text-sm font-semibold">Recomendado para você</h2>
      </div>

      {/* Carrossel nativo com overflow-x-auto */}
      <motion.div
        variants={stagger}
        initial="hidden"
        animate="show"
        className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x snap-mandatory"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {recomendacoes.map((rec) => (
          <motion.div
            key={rec.produto_id}
            variants={fadeUp}
            className="flex-none w-44 snap-start"
          >
            <div className="glass-card rounded-2xl p-3 h-full flex flex-col relative overflow-hidden hover:shadow-elevated transition-shadow">
              {/* Badge de motivo */}
              <Badge
                variant="outline"
                className={`self-start text-[10px] px-2 py-0.5 mb-2 font-medium border ${getBadgeStyle(rec.motivo)}`}
              >
                {rec.motivo}
              </Badge>

              {/* Imagem / emoji */}
              <div className="text-center mb-2">
                {rec.imagem_url?.startsWith("http") ? (
                  <img
                    src={rec.imagem_url}
                    alt={rec.nome}
                    className="w-12 h-12 mx-auto object-cover rounded-xl"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-3xl">{rec.imagem_url || "📦"}</span>
                )}
              </div>

              {/* Info */}
              <p className="text-sm font-medium line-clamp-2 leading-tight flex-1">{rec.nome}</p>
              <p className="text-xs font-bold text-primary mt-1">
                R$ {rec.preco.toFixed(2).replace(".", ",")}
              </p>

              {/* Botão */}
              <Button
                size="sm"
                className="w-full mt-2 h-8 text-xs gap-1.5 rounded-xl"
                onClick={() => handleAddToCart(rec)}
              >
                <ShoppingCart size={13} />
                Adicionar
              </Button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
