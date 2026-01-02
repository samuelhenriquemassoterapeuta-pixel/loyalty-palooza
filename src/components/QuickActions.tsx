import { motion } from "framer-motion";
import { QrCode, ShoppingBag, Receipt, Gift } from "lucide-react";
import { useNavigate } from "react-router-dom";

const actions = [
  { icon: QrCode, label: "Pagar", color: "bg-primary/10 text-primary", path: null },
  { icon: ShoppingBag, label: "Loja", color: "bg-accent/10 text-accent", path: "/loja" },
  { icon: Receipt, label: "Extrato", color: "bg-secondary text-foreground", path: null },
  { icon: Gift, label: "Resgatar", color: "bg-primary/10 text-primary", path: null },
];

export const QuickActions = () => {
  const navigate = useNavigate();

  return (
    <div className="grid grid-cols-4 gap-3">
      {actions.map((action, index) => (
        <motion.button
          key={action.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.4 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => action.path && navigate(action.path)}
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
