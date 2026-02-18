import { motion } from "framer-motion";
import { Sparkles, Heart, MessageCircle, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useWellnessTracker } from "@/features/bem-estar/hooks/useWellnessTracker";

const MOODS = ["", "😢", "😕", "😐", "😊", "😄"];

export const WellnessHomeWidget = () => {
  const navigate = useNavigate();
  const { todayCheckin, averages } = useWellnessTracker();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-2xl p-4 space-y-3"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="p-1.5 rounded-lg bg-primary/15">
            <Heart size={14} className="text-primary" />
          </div>
          <span className="text-sm font-semibold text-foreground">Bem-Estar IA</span>
        </div>
        <button
          onClick={() => navigate("/bem-estar")}
          className="text-xs text-primary font-medium flex items-center gap-1 hover:underline"
        >
          Ver plano <ArrowRight size={12} />
        </button>
      </div>

      {todayCheckin ? (
        <div className="flex items-center gap-3">
          <span className="text-3xl">{MOODS[todayCheckin.humor] || "😐"}</span>
          <div className="flex-1">
            <p className="text-xs text-muted-foreground">Hoje você está</p>
            <p className="text-sm font-medium text-foreground">
              {todayCheckin.humor >= 4 ? "Se sentindo bem!" : todayCheckin.humor >= 3 ? "Dia normal" : "Dia difícil"}
            </p>
            <div className="flex gap-3 mt-1 text-[10px] text-muted-foreground">
              <span>⚡ {todayCheckin.energia}/5</span>
              <span>😴 {todayCheckin.sono_horas}h</span>
              <span>💧 {todayCheckin.agua_litros}L</span>
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => navigate("/wellness-tracker")}
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-primary/5 hover:bg-primary/10 transition-colors"
        >
          <Sparkles size={20} className="text-primary" />
          <div className="text-left flex-1">
            <p className="text-sm font-medium text-foreground">Faça seu check-in diário</p>
            <p className="text-[10px] text-muted-foreground">Registre humor, energia e sono</p>
          </div>
          <ArrowRight size={14} className="text-muted-foreground" />
        </button>
      )}

      {/* Quick access buttons */}
      <div className="flex gap-2">
        <button
          onClick={() => navigate("/assistente-saude")}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-xs font-medium text-muted-foreground"
        >
          <MessageCircle size={12} /> Falar com Aria
        </button>
        <button
          onClick={() => navigate("/wellness-tracker")}
          className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded-xl bg-muted/50 hover:bg-muted transition-colors text-xs font-medium text-muted-foreground"
        >
          <Heart size={12} /> Tracker
        </button>
      </div>
    </motion.div>
  );
};
