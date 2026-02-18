import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Activity, BookHeart, MessageCircle, Brain } from "lucide-react";

const actions = [
  { icon: Activity, label: "Check-in", path: "/wellness-tracker", color: "bg-primary/15 text-primary" },
  { icon: BookHeart, label: "Diário", path: "/diario-humor", color: "bg-highlight/15 text-highlight" },
  { icon: MessageCircle, label: "Aria", path: "/assistente-saude", color: "bg-accent/15 text-accent" },
  { icon: Brain, label: "Plano IA", path: "/bem-estar", color: "bg-primary/15 text-primary" },
];

const WellnessQuickActions = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.05 }}
      className="mb-6"
    >
      <div className="flex gap-2">
        {actions.map((action) => (
          <Link
            key={action.path}
            to={action.path}
            className="flex-1 flex flex-col items-center gap-1.5 p-3 rounded-xl border border-border bg-card hover:shadow-elevated transition-all active:scale-95"
          >
            <div className={`p-2 rounded-lg ${action.color}`}>
              <action.icon size={18} />
            </div>
            <span className="text-[10px] font-medium text-muted-foreground">{action.label}</span>
          </Link>
        ))}
      </div>
    </motion.div>
  );
};

export default WellnessQuickActions;
