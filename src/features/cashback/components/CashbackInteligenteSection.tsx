import { motion } from "framer-motion";
import { Sparkles, CalendarDays, ShoppingBag, Users, Flame, Crown, RefreshCw } from "lucide-react";
import { useCashbackInteligente, type SugestaoCashback } from "@/features/cashback/hooks/useCashbackInteligente";
import { Skeleton } from "@/components/ui/skeleton";

const tipoIcons: Record<string, typeof Sparkles> = {
  agendamento: CalendarDays,
  compra: ShoppingBag,
  indicacao: Users,
  streak: Flame,
  tier: Crown,
};

const prioridadeColors: Record<string, string> = {
  alta: "bg-destructive/10 text-destructive border-destructive/20",
  media: "bg-warning/10 text-warning border-warning/20",
  baixa: "bg-primary/10 text-primary border-primary/20",
};

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

const item = {
  hidden: { opacity: 0, x: -10 },
  show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

const SugestaoCard = ({ sugestao }: { sugestao: SugestaoCashback }) => {
  const Icon = tipoIcons[sugestao.tipo] || Sparkles;

  return (
    <motion.div
      variants={item}
      className="flex items-start gap-3 p-3.5 rounded-2xl glass-card"
    >
      <div className={`p-2 rounded-xl ${prioridadeColors[sugestao.prioridade] || "bg-muted"}`}>
        <Icon size={16} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-semibold text-sm text-foreground">{sugestao.titulo}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{sugestao.descricao}</p>
      </div>
    </motion.div>
  );
};

export const CashbackInteligenteSection = () => {
  const { sugestoes, mensagem, loading, error, refetch } = useCashbackInteligente();

  if (loading) {
    return (
      <div className="space-y-2.5">
        <Skeleton className="h-12 rounded-2xl" />
        <Skeleton className="h-20 rounded-2xl" />
        <Skeleton className="h-20 rounded-2xl" />
      </div>
    );
  }

  if (error || sugestoes.length === 0) {
    return null; // Don't show section on error
  }

  return (
    <div className="space-y-3">
      {/* Motivational message */}
      {mensagem && (
        <div className="glass-card rounded-2xl p-4 flex items-start gap-3">
          <Sparkles size={18} className="text-warning flex-shrink-0 mt-0.5" />
          <div className="flex-1">
            <p className="text-sm text-foreground font-medium">{mensagem}</p>
          </div>
          <button
            onClick={() => refetch()}
            className="p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
            title="Gerar novas sugestões"
          >
            <RefreshCw size={14} className="text-muted-foreground" />
          </button>
        </div>
      )}

      {/* Suggestions */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-2"
      >
        {sugestoes.map((s, i) => (
          <SugestaoCard key={i} sugestao={s} />
        ))}
      </motion.div>
    </div>
  );
};
