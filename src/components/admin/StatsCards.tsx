import { motion } from "framer-motion";
import { Package, Scissors, Gift, Users } from "lucide-react";

interface StatsCardsProps {
  totalProdutos: number;
  totalServicos: number;
  totalPacotes: number;
  totalUsuarios: number;
}

export const StatsCards = ({
  totalProdutos,
  totalServicos,
  totalPacotes,
  totalUsuarios,
}: StatsCardsProps) => {
  const cards = [
    { icon: Package, value: totalProdutos, label: "Produtos", colorClass: "text-primary", delay: 0 },
    { icon: Scissors, value: totalServicos, label: "Serviços", colorClass: "text-accent", delay: 0.05 },
    { icon: Gift, value: totalPacotes, label: "Pacotes", colorClass: "text-highlight", delay: 0.1 },
    { icon: Users, value: totalUsuarios, label: "Usuários", colorClass: "text-secondary-foreground", delay: 0.15 },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {cards.map(({ icon: Icon, value, label, colorClass, delay }) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay }}
          className="p-3 sm:p-4 rounded-xl bg-card shadow-card text-center"
        >
          <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${colorClass} mx-auto mb-1`} />
          <p className="text-xl sm:text-2xl font-bold text-foreground">{value}</p>
          <p className="text-[11px] sm:text-xs text-muted-foreground">{label}</p>
        </motion.div>
      ))}
    </div>
  );
};
