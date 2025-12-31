import { motion } from "framer-motion";
import { ArrowDownLeft, ArrowUpRight, ChevronRight } from "lucide-react";

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
    description: "Compra Amazon",
    amount: -299.9,
    cashback: 14.99,
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
    description: "iFood",
    amount: -67.8,
    cashback: 5.42,
    date: "22 Dez, 20:45",
    type: "expense",
  },
  {
    id: "4",
    description: "Uber",
    amount: -32.5,
    cashback: 0.97,
    date: "21 Dez, 18:20",
    type: "expense",
  },
];

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
        <h3 className="text-lg font-bold text-foreground">Histórico</h3>
        <button className="text-sm font-medium text-primary flex items-center gap-1">
          Ver tudo <ChevronRight size={16} />
        </button>
      </div>

      <div className="space-y-3">
        {transactions.map((transaction, index) => (
          <motion.div
            key={transaction.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.3 }}
            className="flex items-center gap-4 p-4 rounded-xl bg-card shadow-card"
          >
            <div
              className={`p-2.5 rounded-xl ${
                transaction.type === "income"
                  ? "bg-primary/10 text-primary"
                  : "bg-secondary text-muted-foreground"
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
                <p className="text-xs text-primary font-medium">
                  +{formatCurrency(transaction.cashback)} cashback
                </p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
