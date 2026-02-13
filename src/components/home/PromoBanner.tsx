import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { X, Megaphone, ArrowRight } from "lucide-react";

export const PromoBanner = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { data: banners = [] } = useQuery({
    queryKey: ["promo-banners", user?.id],
    queryFn: async () => {
      // Get active banners
      const { data: activeBanners, error: bErr } = await supabase
        .from("banners_promocionais")
        .select("*")
        .eq("ativo", true)
        .in("tipo", ["banner_home"])
        .order("prioridade", { ascending: false })
        .limit(3);
      if (bErr) throw bErr;

      // Get dismissed banners
      const { data: dismissed } = await supabase
        .from("banners_dismissals")
        .select("banner_id")
        .eq("user_id", user!.id);

      const dismissedIds = (dismissed || []).map((d) => d.banner_id);
      return (activeBanners || []).filter((b) => !dismissedIds.includes(b.id));
    },
    enabled: !!user,
  });

  const dismiss = async (bannerId: string) => {
    await supabase.from("banners_dismissals").insert({ banner_id: bannerId, user_id: user!.id });
    queryClient.invalidateQueries({ queryKey: ["promo-banners"] });
  };

  const handleClick = async (banner: any) => {
    // Track click - fire and forget
    supabase
      .from("banners_promocionais")
      .update({ cliques: (banner.cliques || 0) + 1 })
      .eq("id", banner.id)
      .then(() => {});

    if (banner.link_destino) {
      if (banner.link_destino.startsWith("http")) {
        window.open(banner.link_destino, "_blank");
      } else {
        navigate(banner.link_destino);
      }
    }
  };

  if (banners.length === 0) return null;

  return (
    <div className="space-y-2">
      <AnimatePresence>
        {banners.map((banner: any) => (
          <motion.div
            key={banner.id}
            initial={{ opacity: 0, y: -10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, y: -10, height: 0 }}
            className="relative overflow-hidden rounded-2xl cursor-pointer"
            onClick={() => handleClick(banner)}
            style={{ backgroundColor: banner.cor_fundo || "hsl(var(--primary))" }}
          >
            <div className="p-4 flex items-center gap-3 text-white">
              <div className="p-2 rounded-xl bg-white/15 shrink-0">
                <Megaphone size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-sm">{banner.titulo}</p>
                {banner.subtitulo && <p className="text-xs opacity-80">{banner.subtitulo}</p>}
              </div>
              {banner.link_destino && <ArrowRight size={16} className="opacity-70 shrink-0" />}
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                dismiss(banner.id);
              }}
              className="absolute top-2 right-2 p-1 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X size={12} className="text-white" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
