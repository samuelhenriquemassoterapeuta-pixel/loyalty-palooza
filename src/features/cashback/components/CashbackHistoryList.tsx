import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, ShoppingBag, CalendarDays, Gift, Repeat } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Transacao } from "@/features/cashback/hooks/useTransacoes";
import { formatResinks } from "@/lib/resinks";
import { ResinksCoin } from "@/components/ui/resinks-value";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, x: -12 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 300, damping: 24 },
  },
};

const getIcon = (tipo: string) => {
  switch (tipo) {
    case "cashback": return ArrowDownLeft;
    case "uso_cashback": return ArrowUpRight;
    case "indicacao": return Gift;
    case "agendamento": return CalendarDays;
    case "compra":
    case "debito": return ShoppingBag;
    default: return Repeat;
  }
};

const getLabel = (tipo: string) => {
  switch (tipo) {
    case "cashback": return "Resinks recebidos";
    case "uso_cashback": return "Resinks utilizados";
    case "indicacao": return "Indicação";
    default: return tipo;
  }
};

interface CashbackHistoryListProps {
  transacoes: Transacao[];
}

export const CashbackHistoryList = ({ transacoes }: CashbackHistoryListProps) => {
  const cashbackTransacoes = transacoes.filter(
    (t) => t.tipo === "cashback" || t.tipo === "uso_cashback"
  );

  if (cashbackTransacoes.length === 0) {
    return (
      <div className="text-center py-10">
        <ResinksCoin size={48} className="mx-auto mb-3 opacity-40" />
        <p className="text-muted-foreground font-medium">
          Nenhuma movimentação de Resinks
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          Faça compras ou agende serviços para acumular Resinks
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-semibold text-foreground mb-3 text-sm">
        Histórico detalhado ({cashbackTransacoes.length})
      </h3>
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="space-y-2"
      >
        {cashbackTransacoes.map((tx) => {
          const isIncome = tx.tipo === "cashback";
          const Icon = getIcon(tx.tipo);
          const dateStr = format(new Date(tx.created_at), "dd MMM yyyy, HH:mm", {
            locale: ptBR,
          });

          return (
            <motion.div
              key={tx.id}
              variants={item}
              className="flex items-center gap-3 p-3.5 rounded-2xl glass-card"
            >
              <div
                className={`p-2 rounded-xl ${
                  isIncome
                    ? "bg-primary/15 text-primary"
                    : "bg-accent/15 text-accent"
                }`}
              >
                <Icon size={18} />
              </div>

              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm truncate">
                  {tx.descricao || getLabel(tx.tipo)}
                </p>
                <p className="text-[11px] text-muted-foreground">{dateStr}</p>
              </div>

              <span
                className={`font-bold text-sm ${
                  isIncome ? "text-primary" : "text-accent"
                }`}
              >
                {isIncome ? "+" : "-"}
                {formatResinks(tx.valor)}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
