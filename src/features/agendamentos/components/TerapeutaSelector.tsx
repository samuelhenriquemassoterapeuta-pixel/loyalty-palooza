import { motion } from "framer-motion";
import { User, Check, Loader2, Star } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Terapeuta } from "@/hooks/useTerapeutas";

interface TerapeutaSelectorProps {
  terapeutas: Terapeuta[];
  loading: boolean;
  selectedId: string | null;
  onSelect: (terapeuta: Terapeuta) => void;
}

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

export const TerapeutaSelector = ({ terapeutas, loading, selectedId, onSelect }: TerapeutaSelectorProps) => {
  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <Loader2 className="w-8 h-8 text-primary animate-spin" />
      </div>
    );
  }

  if (terapeutas.length === 0) {
    return (
      <div className="text-center py-8 glass-card rounded-2xl">
        <User className="w-12 h-12 mx-auto mb-2 opacity-50 text-muted-foreground" />
        <p className="text-muted-foreground">Nenhum terapeuta disponível no momento.</p>
      </div>
    );
  }

  return (
    <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-3">
      <motion.div variants={fadeUp}>
        <p className="section-label flex items-center gap-2 px-1">
          <User size={16} className="text-primary" />
          Escolha o terapeuta
        </p>
      </motion.div>
      
      {terapeutas.map((terapeuta) => (
        <motion.div key={terapeuta.id} variants={fadeUp}>
          <div
            className={`glass-card rounded-2xl p-4 cursor-pointer transition-all ${
              selectedId === terapeuta.id
                ? "ring-2 ring-primary bg-primary/5"
                : "hover:bg-muted/30"
            }`}
            onClick={() => onSelect(terapeuta)}
          >
            <div className="flex items-center gap-3">
              <Avatar className="w-12 h-12">
                {terapeuta.foto_url ? (
                  <AvatarImage src={terapeuta.foto_url} alt={terapeuta.nome} />
                ) : null}
                <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                  {terapeuta.nome.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <p className="font-semibold text-foreground">{terapeuta.nome}</p>
                {terapeuta.especialidade && (
                  <p className="text-xs text-muted-foreground">{terapeuta.especialidade}</p>
                )}
                {terapeuta.media_avaliacoes !== undefined && terapeuta.total_avaliacoes! > 0 && (
                  <div className="flex items-center gap-1 mt-1">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" />
                    <span className="text-xs text-muted-foreground">
                      {terapeuta.media_avaliacoes.toFixed(1)} ({terapeuta.total_avaliacoes} {terapeuta.total_avaliacoes === 1 ? 'avaliação' : 'avaliações'})
                    </span>
                  </div>
                )}
              </div>
              
              {selectedId === terapeuta.id && (
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
                  <Check size={14} className="text-primary-foreground" />
                </div>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};
