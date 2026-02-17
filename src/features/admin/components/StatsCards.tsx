import { motion } from "framer-motion";
import { Package, Scissors, Gift, Users } from "lucide-react";

interface StatsCardsProps {
  totalProdutos: number;
  totalServicos: number;
  totalPacotes: number;
  totalUsuarios: number;
}

const cardVariants = {
  hidden: { opacity: 0, y: 16, scale: 0.92 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { delay: i * 0.07, duration: 0.4, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
  }),
};

export const StatsCards = ({
  totalProdutos,
  totalServicos,
  totalPacotes,
  totalUsuarios,
}: StatsCardsProps) => {
  const cards = [
    { icon: Package, value: totalProdutos, label: "Produtos", colorClass: "text-primary", bgClass: "bg-primary/10" },
    { icon: Scissors, value: totalServicos, label: "Serviços", colorClass: "text-accent", bgClass: "bg-accent/10" },
    { icon: Gift, value: totalPacotes, label: "Pacotes", colorClass: "text-highlight", bgClass: "bg-highlight/10" },
    { icon: Users, value: totalUsuarios, label: "Usuários", colorClass: "text-secondary-foreground", bgClass: "bg-secondary" },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
      {cards.map(({ icon: Icon, value, label, colorClass, bgClass }, i) => (
        <motion.div
          key={label}
          custom={i}
          variants={cardVariants}
          initial="hidden"
          animate="visible"
          whileHover={{ y: -4, transition: { duration: 0.2 } }}
          className="p-3 sm:p-4 rounded-xl bg-card shadow-card text-center cursor-default group"
        >
          <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-2xl ${bgClass} flex items-center justify-center mx-auto mb-2 transition-transform duration-200 group-hover:scale-110`}>
            <Icon className={`w-5 h-5 sm:w-6 sm:h-6 ${colorClass}`} />
          </div>
          <p className="text-xl sm:text-2xl font-bold text-foreground">{value}</p>
          <p className="text-[11px] sm:text-xs text-muted-foreground">{label}</p>
        </motion.div>
      ))}
    </div>
  );
};
