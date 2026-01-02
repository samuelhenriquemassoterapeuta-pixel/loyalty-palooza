import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, ChevronRight, Sparkles } from "lucide-react";

interface Transaction {
  id: string;
  description: string;
  amount: number;
  cashback: number;
  date: string;
  type: "income" | "expense";
}

const transactions: Transaction[] = [
  {
    id: "1",
    description: "Massagem Relaxante",
    amount: -150.0,
    cashback: 7.50,
    date: "Hoje, 14:32",
    type: "expense",
  },
  {
    id: "2",
    description: "Cashback recebido",
    amount: 45.5,
    cashback: 0,
    date: "Ontem, 09:15",
    type: "income",
  },
  {
    id: "3",
    description: "Kit Óleos Essenciais",
    amount: -89.9,
    cashback: 4.50,
    date: "22 Dez, 20:45",
    type: "expense",
  },
  {
    id: "4",
    description: "Drenagem Linfática",
    amount: -160.0,
    cashback: 8.0,
    date: "21 Dez, 18:20",
    type: "expense",
  },
];

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
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Math.abs(value));
  };

  return (
    <section>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-foreground">Histórico</h3>
          <span className="pill text-[10px]">
            <Sparkles size={10} />
            Novo
          </span>
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
        {transactions.map((transaction) => (
          <motion.div
            key={transaction.id}
            variants={item}
            whileHover={{ x: 4 }}
            className="group flex items-center gap-4 p-4 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-all duration-300 cursor-pointer"
          >
            <div
              className={`p-2.5 rounded-xl transition-transform duration-300 group-hover:scale-110 ${
                transaction.type === "income"
                  ? "bg-gradient-to-br from-primary/20 to-primary/5 text-primary"
                  : "bg-gradient-to-br from-muted to-muted/50 text-muted-foreground"
              }`}
            >
              {transaction.type === "income" ? (
                <ArrowDownLeft size={20} />
              ) : (
                <ArrowUpRight size={20} />
              )}
            </div>

            <div className="flex-1 min-w-0">
              <p className="font-semibold text-foreground truncate">
                {transaction.description}
              </p>
              <p className="text-xs text-muted-foreground">{transaction.date}</p>
            </div>

            <div className="text-right">
              <p
                className={`font-bold ${
                  transaction.type === "income"
                    ? "text-primary"
                    : "text-foreground"
                }`}
              >
                {transaction.type === "income" ? "+" : "-"}
                {formatCurrency(transaction.amount)}
              </p>
              {transaction.cashback > 0 && (
                <p className="text-xs text-primary font-medium flex items-center justify-end gap-1">
                  <Sparkles size={10} />
                  +{formatCurrency(transaction.cashback)}
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};
