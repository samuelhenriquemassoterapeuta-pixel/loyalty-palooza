import { motion } from "framer-motion";
import { Crown, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

export const PlanRequiredBanner = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-4 rounded-2xl bg-gradient-to-br from-primary/10 via-accent/10 to-primary/5 border border-primary/20 space-y-3"
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 rounded-xl bg-primary/15">
          <Crown className="text-primary" size={20} />
        </div>
        <div className="flex-1">
          <p className="font-semibold text-foreground text-sm">
            Plano necessário
          </p>
          <p className="text-xs text-muted-foreground">
            Ative um plano para iniciar protocolos, registrar fichas e acompanhar sua evolução.
          </p>
        </div>
      </div>
      <Button
        onClick={() => navigate("/clube-vip")}
        className="w-full gap-2"
        size="sm"
      >
        <Crown size={14} />
        Ver Planos Disponíveis
        <ArrowRight size={14} />
      </Button>
    </motion.div>
  );
};
