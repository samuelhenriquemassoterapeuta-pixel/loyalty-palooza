import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, ChevronRight, Sparkles } from "lucide-react";
import { useTransacoes } from "@/features/cashback/hooks/useTransacoes";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";
import { TransactionHistorySkeleton } from "@/components/skeletons";
import { ErrorState } from "@/components/ErrorState";
import { formatResinks } from "@/lib/resinks";
import { ResinksCoin } from "@/components/ui/resinks-value";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06 },
  },
};

const item = {
  hidden: { opacity: 0, x: -12 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

export const TransactionHistory = () => {
  const { transacoes, loading, error, refetch } = useTransacoes();

  const getTransactionType = (tipo: string) => {
    return tipo === "cashback" ? "income" : "expense";
  };

  if (loading) return <TransactionHistorySkeleton />;

  if (error) {
    return (
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Histórico</h3>
        </div>
        <ErrorState compact title="Erro ao carregar histórico" message={error} onRetry={refetch} />
      </section>
    );
  }

  if (transacoes.length === 0) {
    return (
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Histórico</h3>
        </div>
        <div className="text-center py-8 text-muted-foreground">
          <p>Nenhuma transação ainda.</p>
          <p className="text-sm mt-1">Suas movimentações aparecerão aqui.</p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <ResinksCoin size={16} />
          <h3 className="text-sm font-bold text-foreground">Histórico</h3>
          {transacoes.length > 0 && (
            <span className="pill text-[10px]">
              <Sparkles size={10} />
              {transacoes.length}
            </span>
          )}
        </div>
        <button className="text-xs font-medium text-primary flex items-center gap-0.5 hover:gap-1.5 transition-all">
          Ver tudo <ChevronRight size={14} />
        </button>
      </div>

      <motion.div variants={container} initial="hidden" animate="show" className="space-y-2">
        {transacoes.slice(0, 5).map((transacao) => {
          const type = getTransactionType(transacao.tipo);
          const date = formatDistanceToNow(new Date(transacao.created_at), {
            addSuffix: true,
            locale: ptBR,
          });

          return (
            <motion.div
              key={transacao.id}
              variants={item}
              whileHover={{ x: 3 }}
              className="group flex items-center gap-3 p-3.5 rounded-2xl glass-card hover:shadow-elevated transition-all duration-300 cursor-pointer"
            >
              <div
                className={`p-2 rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                  type === "income"
                    ? "bg-primary/15 text-primary"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {type === "income" ? <ArrowDownLeft size={18} /> : <ArrowUpRight size={18} />}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-foreground truncate">
                  {transacao.descricao || transacao.tipo}
                </p>
                <p className="text-[11px] text-muted-foreground capitalize">{date}</p>
              </div>

              <div className="text-right">
                <p
                  className={`font-bold text-sm ${
                    type === "income" ? "text-primary" : "text-foreground"
                  }`}
                >
                  {type === "income" ? "+" : "-"}
                  {formatResinks(transacao.valor)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
