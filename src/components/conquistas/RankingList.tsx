import { motion } from "framer-motion";
import { Crown, Medal, Award, User, TrendingUp } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import type { RankingEntry } from "@/hooks/useRanking";

interface RankingListProps {
  ranking: RankingEntry[];
  isLoading: boolean;
  myPosition: number | null;
}

export const RankingList = ({ ranking, isLoading, myPosition }: RankingListProps) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-xl" />
        ))}
      </div>
    );
  }

  if (ranking.length === 0) {
    return (
      <div className="text-center py-16">
        <TrendingUp size={40} className="mx-auto mb-3 text-muted-foreground/30" />
        <p className="text-sm text-muted-foreground">
          Nenhum ranking disponível ainda.
        </p>
        <p className="text-xs text-muted-foreground mt-1">
          Complete sessões para aparecer no ranking!
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {/* My position highlight */}
      {myPosition && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="p-3 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-3 mb-4"
        >
          <div className="p-2 rounded-lg bg-primary/20">
            <User className="text-primary" size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold text-foreground">
              Sua posição: #{myPosition}
            </p>
            <p className="text-xs text-muted-foreground">
              {myPosition <= 3
                ? "Você está no pódio! 🏆"
                : myPosition <= 10
                ? "Top 10! Continue assim!"
                : "Continue subindo no ranking!"}
            </p>
          </div>
        </motion.div>
      )}

      {/* Ranking list */}
      {ranking.map((entry, index) => (
        <RankingRow key={entry.posicao} entry={entry} index={index} />
      ))}
    </div>
  );
};

const RankingRow = ({ entry, index }: { entry: RankingEntry; index: number }) => {
  const PositionIcon = getPositionIcon(entry.posicao);
  const tierColor = getTierColor(entry.tier_nome);

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.03 }}
      className={`
        flex items-center gap-3 p-3 rounded-xl border transition-all
        ${
          entry.is_current_user
            ? "bg-primary/5 border-primary/30 ring-1 ring-primary/20"
            : "bg-card border-border/40"
        }
      `}
    >
      {/* Position */}
      <div className="w-8 flex-shrink-0 flex items-center justify-center">
        {entry.posicao <= 3 ? (
          <PositionIcon
            size={22}
            className={
              entry.posicao === 1
                ? "text-yellow-500"
                : entry.posicao === 2
                ? "text-gray-400"
                : "text-amber-600"
            }
          />
        ) : (
          <span className="text-sm font-bold text-muted-foreground">
            #{entry.posicao}
          </span>
        )}
      </div>

      {/* User info */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p
            className={`text-sm font-semibold truncate ${
              entry.is_current_user ? "text-primary" : "text-foreground"
            }`}
          >
            {entry.is_current_user ? "Você" : entry.nome_exibicao}
          </p>
          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${tierColor}`}>
            {entry.tier_nome}
          </span>
        </div>
        <p className="text-xs text-muted-foreground">
          {entry.total_sessoes} {entry.total_sessoes === 1 ? "sessão" : "sessões"}
        </p>
      </div>

      {/* Score */}
      <div className="text-right flex-shrink-0">
        <p className="text-sm font-bold text-foreground">
          R$ {Number(entry.total_gasto).toFixed(0)}
        </p>
        <p className="text-[10px] text-muted-foreground">investido</p>
      </div>
    </motion.div>
  );
};

function getPositionIcon(pos: number) {
  if (pos === 1) return Crown;
  if (pos === 2) return Medal;
  return Award;
}

function getTierColor(tier: string) {
  switch (tier) {
    case "Ouro":
      return "text-yellow-700 bg-yellow-100 dark:text-yellow-400 dark:bg-yellow-900/30";
    case "Prata":
      return "text-gray-600 bg-gray-100 dark:text-gray-400 dark:bg-gray-800/50";
    default:
      return "text-amber-700 bg-amber-100 dark:text-amber-400 dark:bg-amber-900/30";
  }
}
