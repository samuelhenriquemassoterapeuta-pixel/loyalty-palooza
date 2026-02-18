import { motion } from "framer-motion";
import { Trophy, Medal, Award } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { MomentsRanking } from "@/features/social/hooks/useSocialPosts";
import { useAuth } from "@/contexts/AuthContext";

const PREMIOS = [
  { icon: "🥇", texto: "1º — Kit Home SPA + R$ 50 créditos" },
  { icon: "🥈", texto: "2º — Massagem grátis + R$ 30 créditos" },
  { icon: "🥉", texto: "3º — 50% off + R$ 20 créditos" },
];

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
};

export const MomentsRankingTab = ({ ranking }: { ranking: MomentsRanking[] }) => {
  const { user } = useAuth();

  if (ranking.length === 0) {
    return (
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="text-center py-12 space-y-3">
        <Trophy size={48} className="mx-auto text-muted-foreground/40" />
        <p className="text-muted-foreground text-sm">Ninguém postou ainda esta semana</p>
        <p className="text-xs text-muted-foreground">Seja o primeiro! 🚀</p>
      </motion.div>
    );
  }

  return (
    <motion.div variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06 } } }} initial="hidden" animate="show" className="space-y-4">
      {/* Ranking list */}
      <div className="space-y-2">
        {ranking.map((item, idx) => {
          const isMe = item.user_id === user?.id;
          const podium = idx < 3;
          const PodiumIcon = idx === 0 ? Trophy : idx === 1 ? Medal : Award;

          return (
            <motion.div
              key={item.id}
              variants={fadeUp}
              className={`p-4 rounded-2xl flex items-center gap-3 ${
                isMe ? "glass-card-strong ring-2 ring-primary/40" : "glass-card-strong"
              } ${podium ? "border border-warning/20" : ""}`}
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                idx === 0 ? "bg-warning/20 text-warning" :
                idx === 1 ? "bg-muted text-muted-foreground" :
                idx === 2 ? "bg-accent/20 text-accent-foreground" :
                "bg-muted/50 text-muted-foreground"
              }`}>
                {podium ? <PodiumIcon size={16} /> : idx + 1}
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm truncate">
                  {isMe ? "Você" : `Participante ${idx + 1}`}
                </p>
                <p className="text-[10px] text-muted-foreground">{item.total_posts} posts</p>
              </div>
              <div className="text-right shrink-0">
                <p className="font-bold text-primary text-sm">{item.total_xp} XP</p>
                <p className="text-[10px] text-muted-foreground">
                  ✨ {item.total_cromos} · R$ {Number(item.total_cashback).toFixed(0)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Prêmios */}
      <motion.div variants={fadeUp} className="p-4 rounded-2xl glass-card-strong space-y-3">
        <p className="section-label">🎁 Prêmios da Semana</p>
        {PREMIOS.map((p, i) => (
          <div key={i} className="flex items-center gap-2.5">
            <span className="text-lg">{p.icon}</span>
            <p className="text-sm text-muted-foreground">{p.texto}</p>
          </div>
        ))}
      </motion.div>
    </motion.div>
  );
};
