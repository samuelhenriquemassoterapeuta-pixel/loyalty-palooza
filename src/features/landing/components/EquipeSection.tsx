import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Users, Star, ArrowRight } from "lucide-react";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { useTerapeutas } from "@/features/terapeuta/hooks/useTerapeutas";
import { CollapsibleSection } from "./CollapsibleSection";
import { Loader2 } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export const EquipeSection = () => {
  const navigate = useNavigate();
  const { terapeutas, loading } = useTerapeutas();

  const disponiveis = terapeutas.filter((t) => t.disponivel);

  if (!loading && disponiveis.length === 0) return null;

  return (
    <section className="py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <CollapsibleSection
          id="equipe"
          badge={
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Users size={14} className="text-primary" />
              <span className="text-xs font-semibold text-primary">Nossa equipe</span>
            </div>
          }
          title={
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Conheça nossos{" "}
              <span className="font-serif italic text-gradient">Terapeutas</span>
            </h2>
          }
          subtitle={
            <p className="text-muted-foreground">
              Profissionais certificados e apaixonados pelo bem-estar
            </p>
          }
        >
          {loading ? (
            <div className="flex justify-center py-8">
              <Loader2 className="w-6 h-6 text-primary animate-spin" />
            </div>
          ) : (
            <motion.div
              variants={stagger}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
            >
              {disponiveis.map((terapeuta) => (
                <motion.div key={terapeuta.id} variants={fadeUp}>
                  <button
                    onClick={() => navigate(`/terapeuta/${terapeuta.id}`)}
                    className="w-full text-left glass-card rounded-2xl p-5 hover:bg-muted/30 transition-all group"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar className="w-14 h-14 border-2 border-primary/20">
                        {terapeuta.foto_url && (
                          <AvatarImage src={terapeuta.foto_url} alt={terapeuta.nome} />
                        )}
                        <AvatarFallback className="bg-primary/10 text-primary font-semibold text-lg">
                          {terapeuta.nome.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-foreground truncate">{terapeuta.nome}</p>
                        {terapeuta.especialidade && (
                          <p className="text-xs text-muted-foreground truncate">{terapeuta.especialidade}</p>
                        )}
                        {terapeuta.media_avaliacoes !== undefined && terapeuta.total_avaliacoes! > 0 && (
                          <div className="flex items-center gap-1 mt-1">
                            <Star size={12} className="fill-warning text-warning" />
                            <span className="text-xs text-muted-foreground">
                              {terapeuta.media_avaliacoes.toFixed(1)} ({terapeuta.total_avaliacoes})
                            </span>
                          </div>
                        )}
                      </div>

                      <ArrowRight size={16} className="text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                    </div>
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </CollapsibleSection>
      </div>
    </section>
  );
};
