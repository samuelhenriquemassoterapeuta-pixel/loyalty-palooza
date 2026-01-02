import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, ChevronRight, Sparkles, Loader2 } from "lucide-react";
import { useTransacoes } from "@/hooks/useTransacoes";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
    }
  }
};

const item = {
  hidden: { opacity: 0, x: -20 },
  show: { 
    opacity: 1, 
    x: 0,
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 24
    }
  }
};

export const TransactionHistory = () => {
  const { transacoes, loading } = useTransacoes();

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Math.abs(value));
  };

  const getTransactionType = (tipo: string) => {
    return tipo === "cashback" ? "income" : "expense";
  };

  if (loading) {
    return (
      <section>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-foreground">Histórico</h3>
        </div>
        <div className="flex justify-center py-8">
          <Loader2 className="w-6 h-6 text-primary animate-spin" />
        </div>
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
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-foreground">Histórico</h3>
          {transacoes.length > 0 && (
            <span className="pill text-[10px]">
              <Sparkles size={10} />
              {transacoes.length}
            </span>
          )}
        </div>
        <button className="text-sm font-medium text-primary flex items-center gap-1 hover:gap-2 transition-all">
          Ver tudo <ChevronRight size={16} />
        </button>
      </div>

      <motion.div 
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-3"
      >
        {transacoes.slice(0, 5).map((transacao) => {
          const type = getTransactionType(transacao.tipo);
          const date = formatDistanceToNow(new Date(transacao.created_at), { 
            addSuffix: true, 
            locale: ptBR 
          });

          return (
            <motion.div
              key={transacao.id}
              variants={item}
              whileHover={{ x: 4 }}
              className="group flex items-center gap-4 p-4 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer"
            >
              <div
                className={`p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                  type === "income"
                    ? "bg-gradient-to-br from-primary/20 to-primary/5 text-primary"
                    : "bg-gradient-to-br from-muted to-muted/50 text-muted-foreground"
                }`}
              >
                {type === "income" ? (
                  <ArrowDownLeft size={20} />
                ) : (
                  <ArrowUpRight size={20} />
                )}
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-semibold text-foreground truncate">
                  {transacao.descricao || transacao.tipo}
                </p>
                <p className="text-xs text-muted-foreground capitalize">{date}</p>
              </div>

              <div className="text-right">
                <p className={`font-bold ${type === "income" ? "text-primary" : "text-foreground"}`}>
                  {type === "income" ? "+" : "-"}
                  {formatCurrency(transacao.valor)}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </section>
  );
};
