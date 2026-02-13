import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Trophy, Target, Flame, Gift, Clock, Users, CheckCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AppLayout } from "@/components/AppLayout";
import { useNavigate } from "react-router-dom";
import { useDesafios } from "@/hooks/useDesafios";
import { format, differenceInDays, isPast } from "date-fns";
import { ptBR } from "date-fns/locale";

const iconMap: Record<string, React.ElementType> = {
  Trophy, Target, Flame, Gift, Clock, Users,
};

const Desafios = () => {
  const navigate = useNavigate();
  const { desafios, participacoes, isLoading, participar } = useDesafios();

  const desafiosComStatus = useMemo(() => {
    return desafios.map((d) => {
      const participacao = participacoes.find((p) => p.desafio_id === d.id);
      const diasRestantes = differenceInDays(new Date(d.data_fim), new Date());
      const progresso = participacao ? Math.min((participacao.progresso / d.meta_quantidade) * 100, 100) : 0;
      return { ...d, participacao, diasRestantes, progresso };
    });
  }, [desafios, participacoes]);

  const ativos = desafiosComStatus.filter((d) => !d.participacao?.concluido);
  const concluidos = desafiosComStatus.filter((d) => d.participacao?.concluido);

  if (isLoading) {
    return (
      <AppLayout>
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6 pb-24">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Desafios</h1>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent">
            <Trophy size={20} />
            <span className="font-semibold text-sm">Desafios Temáticos</span>
          </div>
          <h2 className="text-lg font-bold text-foreground">Complete desafios e ganhe recompensas!</h2>
          <p className="text-muted-foreground text-sm">
            Participe dos desafios mensais para ganhar cashback e XP extras.
          </p>
        </motion.div>

        {/* Desafios ativos */}
        {ativos.length > 0 ? (
          <div className="space-y-4">
            <p className="section-label px-1">Desafios ativos</p>
            {ativos.map((desafio, i) => {
              const Icon = iconMap[desafio.icone] || Trophy;
              const isParticipando = !!desafio.participacao;

              return (
                <motion.div
                  key={desafio.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <Card className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className="p-2.5 rounded-xl bg-accent/10">
                          <Icon size={22} className="text-accent" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-base">{desafio.titulo}</CardTitle>
                          {desafio.descricao && (
                            <p className="text-xs text-muted-foreground mt-0.5">{desafio.descricao}</p>
                          )}
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {desafio.diasRestantes}d restantes
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {/* Meta */}
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>Meta: {desafio.meta_quantidade} {desafio.meta_tipo}</span>
                        <span className="font-medium text-accent">
                          🎁 R$ {desafio.recompensa_valor.toFixed(2).replace(".", ",")}
                        </span>
                      </div>

                      {/* Progress */}
                      {isParticipando && (
                        <div className="space-y-1">
                          <Progress value={desafio.progresso} className="h-2" />
                          <div className="flex justify-between text-[10px] text-muted-foreground">
                            <span>{desafio.participacao!.progresso}/{desafio.meta_quantidade}</span>
                            <span>{Math.round(desafio.progresso)}%</span>
                          </div>
                        </div>
                      )}

                      {/* Período */}
                      <p className="text-[10px] text-muted-foreground">
                        {format(new Date(desafio.data_inicio), "dd/MM", { locale: ptBR })} — {format(new Date(desafio.data_fim), "dd/MM/yyyy", { locale: ptBR })}
                      </p>

                      {!isParticipando && (
                        <Button
                          onClick={() => participar.mutate(desafio.id)}
                          disabled={participar.isPending}
                          className="w-full gap-2"
                        >
                          <Flame size={16} />
                          Participar do desafio
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Trophy className="mx-auto text-muted-foreground mb-3" size={40} />
              <p className="text-muted-foreground text-sm">Nenhum desafio ativo no momento. Fique de olho!</p>
            </CardContent>
          </Card>
        )}

        {/* Desafios concluídos */}
        {concluidos.length > 0 && (
          <div className="space-y-3">
            <p className="section-label px-1">Concluídos 🏆</p>
            {concluidos.map((d) => (
              <div key={d.id} className="flex items-center gap-3 p-3 rounded-xl bg-accent/5 border border-accent/20">
                <CheckCircle size={16} className="text-accent" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{d.titulo}</p>
                  <p className="text-[10px] text-muted-foreground">
                    Concluído em {d.participacao?.concluido_em ? format(new Date(d.participacao.concluido_em), "dd/MM/yyyy") : "—"}
                  </p>
                </div>
                <Badge variant="secondary" className="text-xs">
                  R$ {d.recompensa_valor.toFixed(2).replace(".", ",")}
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Desafios;
