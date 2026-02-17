import { motion } from "framer-motion";
import { Droplets, Flame, UtensilsCrossed, TrendingUp, Calendar } from "lucide-react";
import { useDiarioAlimentar } from "@/features/dietas/hooks/useDietas";

const fadeUp = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export const DietasDashboard = () => {
  const today = new Date().toISOString().split("T")[0];
  const { entries } = useDiarioAlimentar(today);

  const totalAgua = entries.reduce((sum, e) => sum + (e.agua_ml ?? 0), 0);
  const totalRefeicoes = entries.length;
  const aguaPercentual = Math.min((totalAgua / 2000) * 100, 100);

  // Calculate streak (simplified — counts consecutive days with entries ending today)
  // For a real streak we'd need historical data, so we show today's stats
  const hasEntriesToday = totalRefeicoes > 0;

  const stats = [
    {
      icon: Droplets,
      label: "Água",
      value: `${totalAgua} ml`,
      subtitle: "de 2.000 ml",
      progress: aguaPercentual,
      color: "text-info",
      bgColor: "bg-info/10",
      progressColor: "bg-info",
    },
    {
      icon: UtensilsCrossed,
      label: "Refeições",
      value: totalRefeicoes.toString(),
      subtitle: "registradas hoje",
      progress: Math.min((totalRefeicoes / 6) * 100, 100),
      color: "text-highlight",
      bgColor: "bg-highlight/10",
      progressColor: "bg-highlight",
    },
    {
      icon: Flame,
      label: "Status",
      value: hasEntriesToday ? "Ativo ✅" : "Sem registro",
      subtitle: hasEntriesToday ? "Diário atualizado" : "Registre sua primeira refeição",
      progress: hasEntriesToday ? 100 : 0,
      color: hasEntriesToday ? "text-primary" : "text-muted-foreground",
      bgColor: hasEntriesToday ? "bg-primary/10" : "bg-muted/30",
      progressColor: "bg-primary",
    },
  ];

  return (
    <motion.div variants={fadeUp} className="grid grid-cols-3 gap-2">
      {stats.map((stat) => (
        <div
          key={stat.label}
          className="rounded-2xl border glass-card-strong p-3 flex flex-col items-center text-center gap-1.5"
        >
          <div className={`p-2 rounded-xl ${stat.bgColor}`}>
            <stat.icon size={16} className={stat.color} />
          </div>
          <p className={`text-sm font-bold ${stat.color}`}>{stat.value}</p>
          <p className="text-[10px] text-muted-foreground leading-tight">{stat.subtitle}</p>
          <div className="w-full h-1 bg-muted rounded-full overflow-hidden mt-1">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${stat.progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className={`h-full rounded-full ${stat.progressColor}`}
            />
          </div>
        </div>
      ))}
    </motion.div>
  );
};
