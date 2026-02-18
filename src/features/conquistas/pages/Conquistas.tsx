import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Filter, Star, Gift, BarChart3 } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { AnimatedPageBackground } from "@/components/AnimatedPageBackground";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAchievementCelebration } from "@/features/conquistas/hooks/useAchievementCelebration";
import { useRanking } from "@/features/conquistas/hooks/useRanking";
import { useLevelUpCelebration } from "@/features/cashback/hooks/useLevelUpCelebration";
import { AchievementsSummary } from "@/features/conquistas/components/AchievementsSummary";
import { AchievementDetailCard } from "@/features/conquistas/components/AchievementDetailCard";
import { AchievementCelebration } from "@/features/conquistas/components/AchievementCelebration";
import { LevelUpCelebration } from "@/features/conquistas/components/LevelUpCelebration";
import { RankingList } from "@/features/conquistas/components/RankingList";
import { XpLevelCard } from "@/features/conquistas/components/XpLevelCard";
import { LevelRewardsCard } from "@/features/conquistas/components/LevelRewardsCard";
import { calculateXpFromAchievements, getLevelFromXp } from "@/features/conquistas/components/xpLevelUtils";
import { AppCollapsibleSection } from "@/components/AppCollapsibleSection";

type FilterMode = "todos" | "desbloqueados" | "em_progresso";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

const Conquistas = () => {
  const { achievements, totalUnlocked, celebration, dismiss } = useAchievementCelebration();
  const { ranking, myPosition, isLoading: rankingLoading } = useRanking();
  const { celebration: levelUp, dismiss: dismissLevelUp } = useLevelUpCelebration(achievements);
  const [filter, setFilter] = useState<FilterMode>("todos");

  const currentLevel = useMemo(() => {
    const totalXp = calculateXpFromAchievements(achievements);
    return getLevelFromXp(totalXp).level;
  }, [achievements]);

  const categories = useMemo(() => {
    const cats: Record<string, { unlocked: number; total: number; icon: string }> = {
      agendamento: { unlocked: 0, total: 0, icon: "📅" },
      cashback: { unlocked: 0, total: 0, icon: "💰" },
      protocolo: { unlocked: 0, total: 0, icon: "🌱" },
      social: { unlocked: 0, total: 0, icon: "👥" },
      loja: { unlocked: 0, total: 0, icon: "🛍️" },
      secreto: { unlocked: 0, total: 0, icon: "🔮" },
    };

    achievements.forEach((a) => {
      if (a.secret) {
        cats.secreto.total++;
        if (a.unlocked) cats.secreto.unlocked++;
      } else if (cats[a.category]) {
        cats[a.category].total++;
        if (a.unlocked) cats[a.category].unlocked++;
      }
    });

    return Object.entries(cats).map(([key, val]) => ({
      name:
        key === "agendamento"
          ? "Sessões"
          : key === "cashback"
          ? "Cashback"
          : key === "protocolo"
          ? "Protocolo"
          : key === "social"
          ? "Social"
          : key === "loja"
          ? "Loja"
          : "Secretas",
      ...val,
    }));
  }, [achievements]);

  const filteredAchievements = useMemo(() => {
    const sorted = [...achievements].sort((a, b) => {
      if (a.unlocked && !b.unlocked) return -1;
      if (!a.unlocked && b.unlocked) return 1;
      return b.progress - a.progress;
    });

    switch (filter) {
      case "desbloqueados":
        return sorted.filter((a) => a.unlocked);
      case "em_progresso":
        return sorted.filter((a) => !a.unlocked && a.progress > 0);
      default:
        return sorted;
    }
  }, [achievements, filter]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-background gradient-hero pb-24 lg:pb-8 relative">
        <AnimatedPageBackground />
        <div className="max-w-lg lg:max-w-4xl xl:max-w-5xl mx-auto px-4 lg:px-8 pt-6 safe-top relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-5"
          >
            {/* Header */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-2 mb-1">
                <Trophy size={22} className="text-primary" />
                <h1 className="text-xl font-bold text-foreground">Conquistas</h1>
              </div>
              <p className="text-sm text-muted-foreground">
                Seu progresso e ranking na comunidade
              </p>
            </motion.div>

            <Tabs defaultValue="conquistas">
              <motion.div variants={fadeUp}>
                <TabsList className="w-full grid grid-cols-2 h-11">
                  <TabsTrigger value="conquistas" className="text-xs gap-1.5 data-[state=active]:shadow-sm">
                    <Trophy size={14} /> Minhas Conquistas
                  </TabsTrigger>
                  <TabsTrigger value="ranking" className="text-xs gap-1.5 data-[state=active]:shadow-sm">
                    <TrendingUp size={14} /> Ranking
                  </TabsTrigger>
                </TabsList>
              </motion.div>

              {/* Conquistas Tab */}
              <TabsContent value="conquistas" className="space-y-4 mt-4">
                {/* XP & Level - Collapsible */}
                <motion.div variants={fadeUp}>
                  <AppCollapsibleSection title="Nível & XP" icon={Star}>
                    <XpLevelCard achievements={achievements} />
                  </AppCollapsibleSection>
                </motion.div>

                {/* Level Rewards - Collapsible */}
                <motion.div variants={fadeUp}>
                  <AppCollapsibleSection title="Recompensas por Nível" icon={Gift}>
                    <LevelRewardsCard currentLevel={currentLevel} />
                  </AppCollapsibleSection>
                </motion.div>

                {/* Summary - Collapsible */}
                <motion.div variants={fadeUp}>
                  <AppCollapsibleSection title="Resumo das Conquistas" icon={BarChart3}>
                    <AchievementsSummary
                      totalUnlocked={totalUnlocked}
                      totalAchievements={achievements.length}
                      categories={categories}
                    />
                  </AppCollapsibleSection>
                </motion.div>

                {/* Filter with count badges */}
                <motion.div variants={fadeUp} className="flex items-center gap-2 overflow-x-auto scrollbar-none">
                  <Filter size={14} className="text-muted-foreground shrink-0" />
                  <div className="flex gap-1.5 shrink-0">
                    {(
                      [
                        { key: "todos", label: "Todos", count: achievements.length },
                        { key: "desbloqueados", label: "Desbloqueados", count: achievements.filter(a => a.unlocked).length },
                        { key: "em_progresso", label: "Em progresso", count: achievements.filter(a => !a.unlocked && a.progress > 0).length },
                      ] as const
                    ).map((f) => (
                      <button
                        key={f.key}
                        onClick={() => setFilter(f.key)}
                        className={`
                          text-xs px-2.5 py-1.5 rounded-full transition-all flex items-center gap-1
                          ${
                            filter === f.key
                              ? "bg-primary text-primary-foreground font-semibold shadow-sm"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }
                        `}
                      >
                        {f.label}
                        <span className={`text-[9px] px-1 rounded-full ${
                          filter === f.key
                            ? "bg-primary-foreground/20"
                            : "bg-foreground/10"
                        }`}>
                          {f.count}
                        </span>
                      </button>
                    ))}
                  </div>
                </motion.div>

                {/* Achievement list */}
                <motion.div
                  initial="hidden"
                  animate="show"
                  variants={stagger}
                  className="space-y-2"
                >
                  {filteredAchievements.map((a, i) => (
                    <motion.div key={a.id} variants={fadeUp}>
                      <AchievementDetailCard achievement={a} index={i} />
                    </motion.div>
                  ))}
                  {filteredAchievements.length === 0 && (
                    <motion.div variants={fadeUp} className="text-center py-16">
                      <Trophy size={40} className="mx-auto text-muted-foreground/30 mb-3" />
                      <p className="font-medium text-foreground mb-1">Nenhuma conquista aqui</p>
                      <p className="text-sm text-muted-foreground">Tente outro filtro</p>
                      {filter !== "todos" && (
                        <button onClick={() => setFilter("todos")} className="mt-3 text-sm text-primary hover:underline">
                          Ver todos
                        </button>
                      )}
                    </motion.div>
                  )}
                </motion.div>
              </TabsContent>

              {/* Ranking Tab */}
              <TabsContent value="ranking" className="mt-4">
                <RankingList
                  ranking={ranking}
                  isLoading={rankingLoading}
                  myPosition={myPosition}
                />
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
      <AchievementCelebration
        isOpen={!!celebration}
        achievement={celebration}
        onClose={dismiss}
      />
      <LevelUpCelebration
        isOpen={levelUp.isOpen}
        levelName={levelUp.levelName}
        levelIcon={levelUp.levelIcon}
        levelNumber={levelUp.levelNumber}
        onClose={dismissLevelUp}
      />
    </AppLayout>
  );
};

export default Conquistas;
