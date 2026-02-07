import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, ShoppingBag, CalendarDays, Gift, Repeat } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Transacao } from "@/hooks/useTransacoes";

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, x: -15 },
  show: { opacity: 1, x: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};

const formatCurrency = (value: number) =>
  new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" }).format(Math.abs(value));

const getIcon = (tipo: string) => {
  switch (tipo) {
    case "cashback":
      return ArrowDownLeft;
    case "uso_cashback":
      return ArrowUpRight;
    case "indicacao":
      return Gift;
    case "agendamento":
      return CalendarDays;
    case "compra":
    case "debito":
      return ShoppingBag;
    default:
      return Repeat;
  }
};

const getLabel = (tipo: string) => {
  switch (tipo) {
    case "cashback":
      return "Cashback recebido";
    case "uso_cashback":
      return "Cashback utilizado";
    case "indicacao":
      return "Indicação";
    default:
      return tipo;
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
        <ArrowDownLeft className="w-12 h-12 text-muted-foreground mx-auto mb-3 opacity-40" />
        <p className="text-muted-foreground font-medium">Nenhuma movimentação de cashback</p>
        <p className="text-sm text-muted-foreground mt-1">
          Faça compras ou agende serviços para acumular cashback
        </p>
      </div>
    );
  }

  return (
    <div>
      <h3 className="font-semibold text-foreground mb-3 text-sm">
        Histórico detalhado ({cashbackTransacoes.length})
      </h3>
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-2">
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
              className="flex items-center gap-3 p-3.5 rounded-2xl bg-card shadow-card"
            >
              <div
                className={`p-2 rounded-xl ${
                  isIncome
                    ? "bg-gradient-to-br from-primary/20 to-primary/5 text-primary"
                    : "bg-gradient-to-br from-accent/20 to-accent/5 text-accent"
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
                {formatCurrency(tx.valor)}
              </span>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
};
