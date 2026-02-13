import { AppLayout } from "@/components/AppLayout";
import { useRecomendacoesIA } from "@/hooks/useRecomendacoesIA";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Brain, Sparkles, ThumbsUp, ThumbsDown, Loader2, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const RecomendacoesIA = () => {
  const navigate = useNavigate();
  const { recomendacoes, isLoading, gerarRecomendacoes, responderRecomendacao } = useRecomendacoesIA();

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Recomendações IA</h1>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <Brain size={20} />
            <span className="font-semibold text-sm">Inteligência Artificial</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-serif)]">
            Tratamentos sob medida
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Nossa IA analisa seu perfil clínico e sugere os melhores tratamentos para você.
          </p>
        </motion.div>

        <Button
          onClick={() => gerarRecomendacoes.mutate()}
          disabled={gerarRecomendacoes.isPending}
          className="w-full"
        >
          {gerarRecomendacoes.isPending ? (
            <Loader2 className="animate-spin mr-2" size={16} />
          ) : (
            <Sparkles className="mr-2" size={16} />
          )}
          Gerar novas recomendações
        </Button>

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : recomendacoes.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center space-y-3">
              <Brain className="mx-auto text-muted-foreground" size={48} />
              <p className="text-muted-foreground">
                Clique acima para gerar suas recomendações personalizadas baseadas no seu perfil clínico.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-3">
            {recomendacoes.map((rec, i) => (
              <motion.div
                key={rec.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.08 }}
              >
                <Card className="overflow-hidden">
                  <CardContent className="p-4 space-y-3">
                    <div className="flex items-start justify-between">
                      <div className="space-y-1 flex-1">
                        <h3 className="font-semibold text-foreground">{rec.titulo}</h3>
                        <p className="text-sm text-muted-foreground">{rec.descricao}</p>
                      </div>
                      <Badge
                        variant="secondary"
                        className={`text-[10px] shrink-0 ml-2 ${
                          rec.confianca >= 0.8
                            ? "bg-secondary/50 text-foreground"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {Math.round(rec.confianca * 100)}% match
                      </Badge>
                    </div>

                    {rec.aceita === null && (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 border-primary/30 text-primary hover:bg-primary/5"
                          onClick={() => responderRecomendacao.mutate({ id: rec.id, aceita: true })}
                        >
                          <ThumbsUp size={14} className="mr-1" /> Interessei
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 text-muted-foreground"
                          onClick={() => responderRecomendacao.mutate({ id: rec.id, aceita: false })}
                        >
                          <ThumbsDown size={14} className="mr-1" /> Não agora
                        </Button>
                      </div>
                    )}

                    {rec.aceita === true && (
                      <Badge className="bg-primary/10 text-primary">
                        ✓ Você demonstrou interesse
                      </Badge>
                    )}
                    {rec.aceita === false && (
                      <Badge variant="secondary" className="text-muted-foreground">
                        Dispensada
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default RecomendacoesIA;
