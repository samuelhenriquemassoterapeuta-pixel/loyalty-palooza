import { motion } from "framer-motion";
import { QrCode, Send, Receipt, Gift } from "lucide-react";

const actions = [
  { icon: QrCode, label: "Pagar", color: "bg-primary/10 text-primary" },
  { icon: Send, label: "Transferir", color: "bg-accent/10 text-accent" },
  { icon: Receipt, label: "Extrato", color: "bg-secondary text-foreground" },
  { icon: Gift, label: "Resgatar", color: "bg-primary/10 text-primary" },
];

export const QuickActions = () => {
  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          whileTap={{ scale: 0.95 }}
          className="flex flex-col items-center gap-2 p-4 rounded-2xl bg-card shadow-card hover:shadow-elevated transition-shadow"
        >
          <div className={`p-3 rounded-xl ${action.color}`}>
            <action.icon size={22} />
          </div>
          <span className="text-xs font-medium text-foreground">
            {action.label}
          </span>
        </motion.button>
      ))}
    </div>
  );
};
