import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Medal, Crown, Users, Calendar, Star, Flame, ChevronRight, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/AppLayout";
import { useLigas, useLigaRanking } from "../hooks/useLigas";
import { useAuth } from "@/contexts/AuthContext";
import { format, differenceInDays, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
};

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

function LigaDetail({ ligaId, onBack }: { ligaId: string; onBack: () => void }) {
  const { user } = useAuth();
  const { ranking, isParticipating, loading, joining, joinLiga } = useLigaRanking(ligaId);

  const getMedalIcon = (pos: number) => {
    switch (pos) {
      case 1: return <Crown size={18} className="text-warning" />;
      case 2: return <Medal size={18} className="text-muted-foreground" />;
      case 3: return <Medal size={18} className="text-accent-foreground" />;
      default: return <span className="text-xs font-bold text-muted-foreground w-[18px] text-center">{pos}º</span>;
    }
  };

  return (
    <div className="space-y-4">
      <button onClick={onBack} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
        <ArrowLeft size={16} /> Voltar
      </button>

      {!isParticipating && (
        <motion.div variants={fadeUp} initial="hidden" animate="show" className="glass-card rounded-2xl p-4 text-center space-y-3">
          <Trophy size={32} className="text-warning mx-auto" />
          <p className="text-sm text-muted-foreground">Participe desta liga e dispute prêmios!</p>
          <Button onClick={joinLiga} disabled={joining} className="rounded-xl">
            <Zap size={14} className="mr-1" />
            {joining ? "Entrando..." : "Participar agora!"}
          </Button>
        </motion.div>
      )}

      {loading ? (
        <div className="space-y-2">
          {[1,2,3,4,5].map(i => (
            <div key={i} className="glass-card rounded-xl p-3 animate-pulse flex gap-3">
              <div className="w-8 h-8 bg-muted/30 rounded-full" />
              <div className="flex-1 space-y-1">
                <div className="h-4 bg-muted/30 rounded w-1/3" />
                <div className="h-3 bg-muted/30 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : ranking.length === 0 ? (
        <div className="text-center py-8 glass-card rounded-2xl">
          <Users size={32} className="text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">Nenhum participante ainda</p>
        </div>
      ) : (
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-2">
          {ranking.map((p, i) => {
            const isMe = p.user_id === user?.id;
            const nome = p.profiles?.nome || "Participante";
            const firstName = nome.split(" ")[0];

            return (
              <motion.div
                key={p.id}
                variants={fadeUp}
                className={`glass-card rounded-xl p-3 flex items-center gap-3 ${
                  isMe ? "ring-2 ring-primary/30 bg-primary/5" : ""
                } ${i < 3 ? "border border-warning/20" : ""}`}
              >
                <div className="w-8 flex items-center justify-center">{getMedalIcon(i + 1)}</div>
                
                <div className="w-8 h-8 rounded-full bg-muted/50 flex items-center justify-center text-sm overflow-hidden shrink-0">
                  {p.profiles?.foto_url ? (
                    <img src={p.profiles.foto_url} alt="" className="w-full h-full object-cover" />
                  ) : (
                    firstName.charAt(0).toUpperCase()
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">
                    {firstName} {isMe && <span className="text-[10px] text-primary">(você)</span>}
                  </p>
                  <div className="flex gap-2 text-[10px] text-muted-foreground">
                    <span>{p.sessoes} sessões</span>
                    <span>•</span>
                    <span>{p.compras} compras</span>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <p className="text-sm font-bold text-primary">{p.pontos.toLocaleString("pt-BR")}</p>
                  <p className="text-[10px] text-muted-foreground">pontos</p>
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      )}
    </div>
  );
}

export default function LigaResinkra() {
  const navigate = useNavigate();
  const { ligas, loading } = useLigas();
  const [selectedLiga, setSelectedLiga] = useState<string | null>(null);

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-32 lg:pb-8">
        <div className="px-4 py-4 safe-top">
          <div className="max-w-lg mx-auto flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-muted/50 transition-colors">
              <ArrowLeft size={22} className="text-foreground" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Liga Resinkra</h1>
              <p className="text-xs text-muted-foreground">Compita e ganhe prêmios</p>
            </div>
            <Trophy size={20} className="text-warning ml-auto" />
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 space-y-4">
          {selectedLiga ? (
            <LigaDetail ligaId={selectedLiga} onBack={() => setSelectedLiga(null)} />
          ) : (
            <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-3">
              {/* Hero */}
              <motion.div variants={fadeUp} className="glass-card rounded-2xl p-4 text-center space-y-2 bg-gradient-to-br from-warning/10 to-primary/10">
                <div className="text-4xl">🏆</div>
                <h2 className="text-lg font-bold text-foreground">Ligas Competitivas</h2>
                <p className="text-xs text-muted-foreground">
                  Dispute rankings semanais com outros membros e ganhe prêmios reais!
                </p>
              </motion.div>

              {loading ? (
                <div className="space-y-3">
                  {[1,2].map(i => (
                    <div key={i} className="glass-card rounded-2xl p-4 animate-pulse space-y-2">
                      <div className="h-5 bg-muted/30 rounded w-1/2" />
                      <div className="h-4 bg-muted/30 rounded w-3/4" />
                    </div>
                  ))}
                </div>
              ) : ligas.length === 0 ? (
                <div className="text-center py-12 glass-card rounded-2xl">
                  <Trophy className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">Nenhuma liga ativa no momento</p>
                  <p className="text-xs text-muted-foreground mt-1">Novas ligas são criadas semanalmente!</p>
                </div>
              ) : (
                ligas.map((liga) => {
                  const diasRestantes = differenceInDays(new Date(liga.data_fim), new Date());
                  const encerrada = isPast(new Date(liga.data_fim));

                  return (
                    <motion.div
                      key={liga.id}
                      variants={fadeUp}
                      className="glass-card rounded-2xl overflow-hidden cursor-pointer hover:ring-1 hover:ring-primary/20 transition-all"
                      onClick={() => setSelectedLiga(liga.id)}
                    >
                      <div className="p-4 space-y-3">
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">{liga.icone}</span>
                            <div>
                              <h3 className="font-semibold text-foreground">{liga.nome}</h3>
                              <p className="text-xs text-muted-foreground">{liga.descricao}</p>
                            </div>
                          </div>
                          <ChevronRight size={18} className="text-muted-foreground" />
                        </div>

                        <div className="flex gap-3 text-xs">
                          <div className="flex items-center gap-1 text-muted-foreground">
                            <Calendar size={12} />
                            {format(new Date(liga.data_inicio), "dd/MM", { locale: ptBR })} — {format(new Date(liga.data_fim), "dd/MM", { locale: ptBR })}
                          </div>
                          {!encerrada && (
                            <div className="flex items-center gap-1 text-warning font-medium">
                              <Flame size={12} />
                              {diasRestantes}d restantes
                            </div>
                          )}
                        </div>

                        {/* Prêmios */}
                        <div className="grid grid-cols-3 gap-2 pt-2 border-t border-border/50">
                          {[
                            { label: "1º", premio: liga.premio_1, valor: liga.premio_1_valor, icon: <Crown size={14} className="text-warning" /> },
                            { label: "2º", premio: liga.premio_2, valor: liga.premio_2_valor, icon: <Medal size={14} className="text-muted-foreground" /> },
                            { label: "3º", premio: liga.premio_3, valor: liga.premio_3_valor, icon: <Medal size={14} className="text-accent-foreground" /> },
                          ].map(({ label, premio, valor, icon }) => (
                            <div key={label} className="text-center">
                              <div className="flex items-center justify-center gap-0.5">{icon}<span className="text-[10px] font-bold">{label}</span></div>
                              <p className="text-[10px] text-muted-foreground truncate">{premio || `R$ ${valor}`}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })
              )}
            </motion.div>
          )}
        </div>
      </div>
    </AppLayout>
  );
}
