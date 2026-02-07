import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Filter } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAchievementCelebration } from "@/hooks/useAchievementCelebration";
import { useRanking } from "@/hooks/useRanking";
import { AchievementsSummary } from "@/components/conquistas/AchievementsSummary";
import { AchievementDetailCard } from "@/components/conquistas/AchievementDetailCard";
import { AchievementCelebration } from "@/components/conquistas/AchievementCelebration";
import { RankingList } from "@/components/conquistas/RankingList";

type FilterMode = "todos" | "desbloqueados" | "em_progresso";

const Conquistas = () => {
  const { achievements, totalUnlocked, celebration, dismiss } = useAchievementCelebration();
  const { ranking, myPosition, isLoading: rankingLoading } = useRanking();
  const [filter, setFilter] = useState<FilterMode>("todos");

  const categories = useMemo(() => {
    const cats: Record<string, { unlocked: number; total: number; icon: string }> = {
      agendamento: { unlocked: 0, total: 0, icon: "📅" },
      cashback: { unlocked: 0, total: 0, icon: "💰" },
      protocolo: { unlocked: 0, total: 0, icon: "🌱" },
      social: { unlocked: 0, total: 0, icon: "👥" },
      loja: { unlocked: 0, total: 0, icon: "🛍️" },
    };

    achievements.forEach((a) => {
      if (cats[a.category]) {
        cats[a.category].total++;
        if (a.unlocked) cats[a.category].unlocked++;
      }
    });

    return Object.entries(cats).map(([key, val]) => ({
      name: key === "agendamento" ? "Sessões" : key === "cashback" ? "Cashback" : key === "protocolo" ? "Protocolo" : key === "social" ? "Social" : "Loja",
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
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <div className="max-w-lg lg:max-w-4xl xl:max-w-5xl mx-auto px-4 lg:px-8 pt-6 safe-top">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-5"
          >
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Trophy size={22} className="text-primary" />
                <h1 className="text-xl font-bold text-foreground">Conquistas</h1>
              </div>
              <p className="text-sm text-muted-foreground">
                Seu progresso e ranking na comunidade
              </p>
            </div>

            <Tabs defaultValue="conquistas">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="conquistas" className="text-xs gap-1.5">
                  <Trophy size={13} /> Minhas Conquistas
                </TabsTrigger>
                <TabsTrigger value="ranking" className="text-xs gap-1.5">
                  <TrendingUp size={13} /> Ranking
                </TabsTrigger>
              </TabsList>

              {/* Conquistas Tab */}
              <TabsContent value="conquistas" className="space-y-4 mt-4">
                <AchievementsSummary
                  totalUnlocked={totalUnlocked}
                  totalAchievements={achievements.length}
                  categories={categories}
                />

                {/* Filter */}
                <div className="flex items-center gap-2">
                  <Filter size={14} className="text-muted-foreground" />
                  <div className="flex gap-1.5">
                    {(
                      [
                        { key: "todos", label: "Todos" },
                        { key: "desbloqueados", label: "Desbloqueados" },
                        { key: "em_progresso", label: "Em progresso" },
                      ] as const
                    ).map((f) => (
                      <button
                        key={f.key}
                        onClick={() => setFilter(f.key)}
                        className={`
                          text-xs px-2.5 py-1 rounded-full transition-colors
                          ${
                            filter === f.key
                              ? "bg-primary text-primary-foreground font-semibold"
                              : "bg-muted text-muted-foreground hover:bg-muted/80"
                          }
                        `}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Achievement list */}
                <div className="space-y-2">
                  {filteredAchievements.map((a, i) => (
                    <AchievementDetailCard key={a.id} achievement={a} index={i} />
                  ))}
                  {filteredAchievements.length === 0 && (
                    <div className="text-center py-12 text-muted-foreground text-sm">
                      <Trophy size={36} className="mx-auto mb-3 opacity-30" />
                      <p>Nenhuma conquista nesta categoria.</p>
                    </div>
                  )}
                </div>
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
    </AppLayout>
  );
};

export default Conquistas;
