import { useMemo } from "react";
import { motion } from "framer-motion";
import { Trophy, Flame, Droplets, Target, Star, Zap } from "lucide-react";
import { useDiarioAlimentar } from "@/features/dietas/hooks/useDietas";
import { useFichaNutricional } from "@/features/dietas/hooks/useFichaNutricional";

interface DietaBadge {
  id: string;
  nome: string;
  descricao: string;
  emoji: string;
  unlocked: boolean;
  progress: number;
  maxProgress: number;
}

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export const DietasGamificacao = () => {
  const { entries } = useDiarioAlimentar();
  const { ficha } = useFichaNutricional();

  const stats = useMemo(() => {
    const uniqueDays = new Set(entries.map((e) => e.data));
    const totalAgua = entries.reduce((sum, e) => sum + (e.agua_ml ?? 0), 0);
    const diasComAgua = new Set(
      entries.filter((e) => (e.agua_ml ?? 0) >= 500).map((e) => e.data)
    ).size;

    return {
      totalRegistros: entries.length,
      diasRegistrados: uniqueDays.size,
      totalAgua,
      diasComAgua,
      fichaPreenchida: !!ficha,
    };
  }, [entries, ficha]);

  const badges: DietaBadge[] = useMemo(() => [
    {
      id: "primeiro_registro",
      nome: "Primeiro Passo",
      descricao: "Registre sua primeira refeição",
      emoji: "🌱",
      unlocked: stats.totalRegistros >= 1,
      progress: Math.min(stats.totalRegistros, 1),
      maxProgress: 1,
    },
    {
      id: "ficha_completa",
      nome: "Perfil Completo",
      descricao: "Preencha sua ficha nutricional",
      emoji: "📋",
      unlocked: stats.fichaPreenchida,
      progress: stats.fichaPreenchida ? 1 : 0,
      maxProgress: 1,
    },
    {
      id: "3_dias",
      nome: "Consistente",
      descricao: "Registre refeições por 3 dias",
      emoji: "📅",
      unlocked: stats.diasRegistrados >= 3,
      progress: Math.min(stats.diasRegistrados, 3),
      maxProgress: 3,
    },
    {
      id: "7_dias",
      nome: "Semana Completa",
      descricao: "Registre refeições por 7 dias",
      emoji: "🏆",
      unlocked: stats.diasRegistrados >= 7,
      progress: Math.min(stats.diasRegistrados, 7),
      maxProgress: 7,
    },
    {
      id: "hidratacao_3",
      nome: "Hidratação",
      descricao: "Beba água em 3 dias diferentes",
      emoji: "💧",
      unlocked: stats.diasComAgua >= 3,
      progress: Math.min(stats.diasComAgua, 3),
      maxProgress: 3,
    },
    {
      id: "10_refeicoes",
      nome: "Disciplinada",
      descricao: "Registre 10 refeições no total",
      emoji: "⭐",
      unlocked: stats.totalRegistros >= 10,
      progress: Math.min(stats.totalRegistros, 10),
      maxProgress: 10,
    },
  ], [stats]);

  const unlockedCount = badges.filter((b) => b.unlocked).length;
  const totalXp = unlockedCount * 50;
  const progressPercent = (unlockedCount / badges.length) * 100;

  return (
    <motion.div variants={fadeUp} className="rounded-2xl border glass-card-strong p-4 space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy size={16} className="text-highlight" />
          <p className="text-sm font-semibold text-foreground">Conquistas Dieta</p>
        </div>
        <div className="flex items-center gap-1.5">
          <Zap size={12} className="text-highlight" />
          <span className="text-xs font-bold text-highlight">{totalXp} XP</span>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="flex items-center justify-between">
          <span className="text-[10px] text-muted-foreground">{unlockedCount}/{badges.length} badges</span>
          <span className="text-[10px] text-muted-foreground">{Math.round(progressPercent)}%</span>
        </div>
        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progressPercent}%` }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="h-full rounded-full bg-gradient-to-r from-highlight to-primary"
          />
        </div>
      </div>

      {/* Badges grid */}
      <div className="grid grid-cols-3 gap-2">
        {badges.map((badge) => {
          const pct = (badge.progress / badge.maxProgress) * 100;
          return (
            <div
              key={badge.id}
              className={`relative flex flex-col items-center text-center p-2.5 rounded-xl transition-all ${
                badge.unlocked
                  ? "bg-highlight/10 border border-highlight/20"
                  : "bg-muted/20 border border-border/50 opacity-60"
              }`}
            >
              <span className="text-2xl mb-1">{badge.emoji}</span>
              <p className="text-[10px] font-semibold text-foreground leading-tight">{badge.nome}</p>
              <p className="text-[8px] text-muted-foreground leading-tight mt-0.5">{badge.descricao}</p>
              {!badge.unlocked && (
                <div className="w-full h-1 bg-muted rounded-full overflow-hidden mt-1.5">
                  <div
                    className="h-full rounded-full bg-highlight/50 transition-all"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              )}
              {badge.unlocked && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-highlight rounded-full flex items-center justify-center">
                  <Star size={8} className="text-highlight-foreground fill-current" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Motivational text */}
      {unlockedCount < badges.length && (
        <p className="text-[10px] text-center text-muted-foreground">
          {unlockedCount === 0
            ? "Comece registrando sua primeira refeição! 🌱"
            : `Faltam ${badges.length - unlockedCount} badges — continue assim! 💪`}
        </p>
      )}
    </motion.div>
  );
};
