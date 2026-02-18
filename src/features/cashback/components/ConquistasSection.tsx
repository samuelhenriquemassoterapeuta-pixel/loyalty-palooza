import { motion } from "framer-motion";
import { Lock, CheckCircle2, Trophy } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { formatResinks } from "@/lib/resinks";
import { useConquistas, type ConquistaComStatus } from "@/features/cashback/hooks/useConquistas";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06 } },
};

const item = {
  hidden: { opacity: 0, scale: 0.9 },
  show: { opacity: 1, scale: 1, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

const BadgeCard = ({ conquista }: { conquista: ConquistaComStatus }) => {
  const { desbloqueada, desbloqueada_em } = conquista;

  return (
    <motion.div
      variants={item}
      className={`relative p-4 rounded-2xl border transition-all ${
        desbloqueada
          ? "glass-card border-primary/20 shadow-sm"
          : "bg-muted/30 border-border/50 opacity-60"
      }`}
    >
      {/* Badge icon */}
      <div className="flex items-start gap-3">
        <div
          className={`text-3xl flex-shrink-0 ${
            desbloqueada ? "" : "grayscale opacity-50"
          }`}
        >
          {conquista.icone}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <p className="font-semibold text-sm text-foreground truncate">
              {conquista.titulo}
            </p>
            {desbloqueada ? (
              <CheckCircle2 size={14} className="text-primary flex-shrink-0" />
            ) : (
              <Lock size={12} className="text-muted-foreground flex-shrink-0" />
            )}
          </div>

          <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
            {conquista.descricao}
          </p>

          <div className="flex items-center gap-2 mt-2">
            {conquista.recompensa_valor > 0 && (
              <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                +{formatResinks(conquista.recompensa_valor)}
              </span>
            )}
            {desbloqueada && desbloqueada_em && (
              <span className="text-[10px] text-muted-foreground">
                {format(new Date(desbloqueada_em), "dd MMM yyyy", { locale: ptBR })}
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export const ConquistasSection = () => {
  const { conquistas, totalDesbloqueadas, totalConquistas, progresso, loading } = useConquistas();

  if (loading) {
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 rounded-xl" />
        <div className="grid grid-cols-1 gap-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-24 rounded-2xl" />
          ))}
        </div>
      </div>
    );
  }

  const desbloqueadas = conquistas.filter((c) => c.desbloqueada);
  const bloqueadas = conquistas.filter((c) => !c.desbloqueada);

  return (
    <div className="space-y-4">
      {/* Progress summary */}
      <div className="glass-card rounded-2xl p-4">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Trophy size={18} className="text-warning" />
            <span className="font-semibold text-sm text-foreground">Conquistas</span>
          </div>
          <span className="text-sm font-bold text-foreground">
            {totalDesbloqueadas}/{totalConquistas}
          </span>
        </div>
        <Progress value={progresso} className="h-2" />
        <p className="text-xs text-muted-foreground mt-1.5">
          {progresso}% completado
        </p>
      </div>

      {/* Unlocked badges */}
      {desbloqueadas.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            Desbloqueadas ({desbloqueadas.length})
          </p>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-2.5"
          >
            {desbloqueadas.map((c) => (
              <BadgeCard key={c.id} conquista={c} />
            ))}
          </motion.div>
        </div>
      )}

      {/* Locked badges */}
      {bloqueadas.length > 0 && (
        <div>
          <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
            Para desbloquear ({bloqueadas.length})
          </p>
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid grid-cols-1 gap-2.5"
          >
            {bloqueadas.map((c) => (
              <BadgeCard key={c.id} conquista={c} />
            ))}
          </motion.div>
        </div>
      )}
    </div>
  );
};
