import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";

interface Conquista {
  id: string;
  codigo: string;
  titulo: string;
  descricao: string;
  icone: string;
  categoria: string;
  ordem: number;
}

interface ConquistaUsuario {
  conquista_id: string;
  desbloqueada_em: string;
}

const fadeUp = {
  hidden: { opacity: 0, scale: 0.8 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 400, damping: 20 } },
};

const WellnessAchievements = () => {
  const { user } = useAuth();

  const { data: allConquistas = [] } = useQuery({
    queryKey: ["wellness-conquistas"],
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_conquistas")
        .select("id, codigo, titulo, descricao, icone, categoria, ordem")
        .eq("ativo", true)
        .order("ordem");
      return (data || []) as Conquista[];
    },
  });

  const { data: userConquistas = [] } = useQuery({
    queryKey: ["wellness-conquistas-user", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data } = await supabase
        .from("wellness_conquistas_usuario")
        .select("conquista_id, desbloqueada_em")
        .eq("user_id", user!.id);
      return (data || []) as ConquistaUsuario[];
    },
  });

  if (allConquistas.length === 0) return null;

  const unlockedIds = new Set(userConquistas.map((c) => c.conquista_id));
  const unlocked = allConquistas.filter((c) => unlockedIds.has(c.id));
  const locked = allConquistas.filter((c) => !unlockedIds.has(c.id));

  if (unlocked.length === 0 && locked.length === 0) return null;

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-2 px-1">
        <p className="text-xs font-medium text-muted-foreground">
          Conquistas ({unlocked.length}/{allConquistas.length})
        </p>
      </div>

      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
        {unlocked.map((c) => (
          <motion.div
            key={c.id}
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="flex-shrink-0 w-20 text-center"
          >
            <div className="w-14 h-14 mx-auto rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 border border-primary/30 flex items-center justify-center shadow-sm">
              <span className="text-2xl">{c.icone}</span>
            </div>
            <p className="text-[10px] font-medium text-foreground mt-1.5 leading-tight line-clamp-2">
              {c.titulo}
            </p>
          </motion.div>
        ))}

        {locked.slice(0, 4).map((c) => (
          <div key={c.id} className="flex-shrink-0 w-20 text-center opacity-40">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-muted/50 border border-border flex items-center justify-center">
              <span className="text-2xl grayscale">🔒</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5 leading-tight line-clamp-2">
              {c.titulo}
            </p>
          </div>
        ))}

        {locked.length > 4 && (
          <div className="flex-shrink-0 w-20 text-center opacity-40">
            <div className="w-14 h-14 mx-auto rounded-2xl bg-muted/50 border border-border flex items-center justify-center">
              <span className="text-xs font-bold text-muted-foreground">+{locked.length - 4}</span>
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5">mais</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WellnessAchievements;
