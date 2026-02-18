import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Star, MapPin, BadgeCheck, Heart, Clock, Calendar, MessageCircle, Phone, Award, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/AppLayout";
import { useMarketplaceTerapeuta, useMarketplaceFavoritos } from "../hooks/useMarketplace";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
};

export default function MarketplacePerfil() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { terapeuta, servicos, avaliacoes, loading } = useMarketplaceTerapeuta(slug || "");
  const { favoritos, toggleFavorito } = useMarketplaceFavoritos();

  if (loading) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="animate-pulse space-y-4 w-full max-w-lg px-4">
            <div className="h-64 bg-muted/30 rounded-2xl" />
            <div className="h-6 bg-muted/30 rounded w-3/4" />
            <div className="h-4 bg-muted/30 rounded w-1/2" />
          </div>
        </div>
      </AppLayout>
    );
  }

  if (!terapeuta) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-background flex items-center justify-center">
          <div className="text-center">
            <p className="text-muted-foreground">Terapeuta não encontrado</p>
            <Button variant="link" onClick={() => navigate("/marketplace")}>Voltar ao marketplace</Button>
          </div>
        </div>
      </AppLayout>
    );
  }

  const isFav = favoritos.includes(terapeuta.id);

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-32 lg:pb-8">
        {/* Hero image */}
        <div className="relative h-64 lg:h-80 bg-muted/20 overflow-hidden">
          {terapeuta.foto_url ? (
            <img src={terapeuta.foto_url} alt={terapeuta.nome} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-7xl bg-gradient-to-br from-primary/10 to-primary/5">💆</div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
          
          {/* Header overlay */}
          <div className="absolute top-0 left-0 right-0 px-4 py-4 safe-top flex items-center justify-between">
            <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-background/80 backdrop-blur-sm hover:bg-background transition-colors">
              <ArrowLeft size={20} className="text-foreground" />
            </button>
            <button
              onClick={() => toggleFavorito(terapeuta.id)}
              className="p-2 rounded-xl bg-background/80 backdrop-blur-sm hover:bg-background transition-colors"
            >
              <Heart size={20} className={isFav ? "fill-destructive text-destructive" : "text-foreground"} />
            </button>
          </div>
        </div>

        <div className="max-w-lg lg:max-w-3xl mx-auto px-4 -mt-12 relative z-10 space-y-4">
          {/* Name & rating */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="glass-card rounded-2xl p-4 space-y-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl font-bold text-foreground">{terapeuta.nome}</h1>
                  {terapeuta.verificado && <BadgeCheck size={20} className="text-primary" />}
                </div>
                <div className="flex items-center gap-1 text-sm text-muted-foreground mt-0.5">
                  <MapPin size={14} />
                  {terapeuta.cidade}, {terapeuta.estado}
                </div>
              </div>
              {terapeuta.total_avaliacoes > 0 && (
                <div className="flex items-center gap-1 bg-warning/10 px-2 py-1 rounded-xl">
                  <Star size={14} className="fill-warning text-warning" />
                  <span className="text-sm font-bold">{terapeuta.media_avaliacoes.toFixed(1)}</span>
                  <span className="text-xs text-muted-foreground">({terapeuta.total_avaliacoes})</span>
                </div>
              )}
            </div>

            {terapeuta.bio && (
              <p className="text-sm text-muted-foreground">{terapeuta.bio}</p>
            )}

            {/* Tags */}
            <div className="flex flex-wrap gap-1.5">
              {terapeuta.especialidades.map(esp => (
                <span key={esp} className="text-xs px-2 py-0.5 rounded-full bg-primary/10 text-primary font-medium">
                  {esp}
                </span>
              ))}
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50">
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{terapeuta.experiencia_anos}</p>
                <p className="text-[10px] text-muted-foreground">anos exp.</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{terapeuta.total_atendimentos}</p>
                <p className="text-[10px] text-muted-foreground">atendimentos</p>
              </div>
              <div className="text-center">
                <p className="text-lg font-bold text-foreground">{terapeuta.taxa_resposta}%</p>
                <p className="text-[10px] text-muted-foreground">taxa resposta</p>
              </div>
            </div>
          </motion.div>

          {/* Serviços */}
          {servicos.length > 0 && (
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.1 }}>
              <h2 className="text-sm font-semibold text-foreground mb-2">Serviços oferecidos</h2>
              <div className="space-y-2">
                {servicos.map(servico => (
                  <div key={servico.id} className="glass-card rounded-xl p-3 flex items-center justify-between">
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-foreground">{servico.nome}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock size={10} />
                        <span>{servico.duracao_minutos} min</span>
                        {servico.descricao && <span>• {servico.descricao}</span>}
                      </div>
                    </div>
                    <p className="text-sm font-bold text-primary shrink-0">
                      R$ {servico.preco.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Avaliações */}
          {avaliacoes.length > 0 && (
            <motion.div variants={fadeUp} initial="hidden" animate="show" transition={{ delay: 0.2 }}>
              <h2 className="text-sm font-semibold text-foreground mb-2">Avaliações recentes</h2>
              <div className="space-y-2">
                {avaliacoes.slice(0, 5).map(av => (
                  <div key={av.id} className="glass-card rounded-xl p-3 space-y-1">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star key={i} size={12} className={i < av.nota ? "fill-warning text-warning" : "text-muted"} />
                      ))}
                      <span className="text-[10px] text-muted-foreground ml-1">
                        {format(new Date(av.created_at), "dd/MM/yyyy", { locale: ptBR })}
                      </span>
                    </div>
                    {av.comentario && <p className="text-xs text-muted-foreground">{av.comentario}</p>}
                    {av.resposta_terapeuta && (
                      <div className="mt-1 pl-3 border-l-2 border-primary/30">
                        <p className="text-[10px] text-primary font-medium">Resposta do terapeuta</p>
                        <p className="text-xs text-muted-foreground">{av.resposta_terapeuta}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* CTA - Agendar */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.3 }}
            className="fixed bottom-20 lg:bottom-4 left-0 right-0 px-4 z-20"
          >
            <div className="max-w-lg lg:max-w-3xl mx-auto">
              <Button
                className="w-full rounded-2xl h-12 text-base font-semibold shadow-lg"
                onClick={() => navigate(`/agendamento?terapeuta_marketplace=${terapeuta.slug}`)}
              >
                <Calendar size={18} className="mr-2" />
                Agendar com {terapeuta.nome.split(" ")[0]}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
}
