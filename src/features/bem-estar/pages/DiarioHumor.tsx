import { useState } from "react";
import { AppLayout } from "@/components/AppLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, BookHeart, Send, Sparkles, Heart, Lightbulb, RefreshCw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { Skeleton } from "@/components/ui/skeleton";

interface JournalReflection {
  sentiment: string;
  sentiment_emoji: string;
  reflection: string;
  affirmation: string;
  suggestion: string;
  patterns?: string[];
}

interface SessionRec {
  service_name: string;
  reason: string;
  urgency: string;
  benefit: string;
  emoji: string;
}

interface SessionRecommendations {
  recommendations: SessionRec[];
  general_tip: string;
}

const DiarioHumor = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [entry, setEntry] = useState("");
  const [reflection, setReflection] = useState<JournalReflection | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Session recommendations
  const { data: sessionRecs, isLoading: loadingRecs, refetch: refetchRecs, isFetching } = useQuery({
    queryKey: ["session-recommendations", user?.id],
    enabled: !!user,
    staleTime: 1000 * 60 * 15,
    queryFn: async () => {
      const { data, error } = await supabase.functions.invoke("recomendar-sessao");
      if (error) throw error;
      return data as SessionRecommendations;
    },
  });

  const handleSubmit = async () => {
    if (entry.trim().length < 10) {
      toast.error("Escreva pelo menos 10 caracteres");
      return;
    }
    setIsSubmitting(true);
    try {
      const { data, error } = await supabase.functions.invoke("reflexao-diario", {
        body: { entry },
      });
      if (error) throw error;
      setReflection(data);
    } catch {
      toast.error("Erro ao gerar reflexão");
    } finally {
      setIsSubmitting(false);
    }
  };

  const urgencyColors: Record<string, string> = {
    alta: "bg-destructive/15 text-destructive",
    media: "bg-warning/15 text-warning",
    baixa: "bg-primary/15 text-primary",
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-5 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-lg font-bold text-foreground">Diário de Humor</h1>
            <p className="text-xs text-muted-foreground">Reflexão diária com IA</p>
          </div>
        </div>

        {/* Journal Entry */}
        <Card>
          <CardContent className="p-4 space-y-3">
            <div className="flex items-center gap-2">
              <BookHeart size={18} className="text-primary" />
              <span className="font-semibold text-sm text-foreground">Como você está se sentindo?</span>
            </div>
            <Textarea
              placeholder="Escreva livremente sobre seu dia, emoções, pensamentos... A IA vai gerar uma reflexão personalizada para você."
              value={entry}
              onChange={(e) => setEntry(e.target.value)}
              rows={5}
              className="resize-none"
            />
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || entry.trim().length < 10}
              className="w-full gap-2"
            >
              {isSubmitting ? (
                <>
                  <RefreshCw size={16} className="animate-spin" />
                  Analisando...
                </>
              ) : (
                <>
                  <Send size={16} />
                  Gerar Reflexão
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* AI Reflection */}
        <AnimatePresence>
          {reflection && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <Card className="border-primary/20">
                <CardContent className="p-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Sparkles size={16} className="text-primary" />
                      <span className="font-semibold text-sm text-foreground">Reflexão da IA</span>
                    </div>
                    <span className="text-2xl">{reflection.sentiment_emoji}</span>
                  </div>

                  <p className="text-sm text-foreground leading-relaxed">{reflection.reflection}</p>

                  <div className="p-3 rounded-xl bg-primary/5 border border-primary/10">
                    <div className="flex items-center gap-2 mb-1">
                      <Heart size={14} className="text-primary" />
                      <span className="text-xs font-medium text-primary">Afirmação</span>
                    </div>
                    <p className="text-sm text-foreground italic">"{reflection.affirmation}"</p>
                  </div>

                  <div className="p-3 rounded-xl bg-accent/5 border border-accent/10">
                    <div className="flex items-center gap-2 mb-1">
                      <Lightbulb size={14} className="text-accent" />
                      <span className="text-xs font-medium text-accent">Sugestão</span>
                    </div>
                    <p className="text-sm text-foreground">{reflection.suggestion}</p>
                  </div>

                  {reflection.patterns && reflection.patterns.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {reflection.patterns.map((p, i) => (
                        <span key={i} className="text-[10px] px-2 py-1 rounded-full bg-muted text-muted-foreground">
                          {p}
                        </span>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Session Recommendations */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-foreground">Sessões Recomendadas para Você</h2>
            <Button variant="ghost" size="icon" onClick={() => refetchRecs()} disabled={isFetching}>
              <RefreshCw size={14} className={isFetching ? "animate-spin" : ""} />
            </Button>
          </div>

          {loadingRecs ? (
            <div className="space-y-2">
              <Skeleton className="h-20 rounded-2xl" />
              <Skeleton className="h-20 rounded-2xl" />
            </div>
          ) : sessionRecs?.recommendations?.length ? (
            <>
              {sessionRecs.recommendations.map((rec, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{rec.emoji}</span>
                        <div className="flex-1 min-w-0 space-y-1">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-sm font-semibold text-foreground truncate">{rec.service_name}</p>
                            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${urgencyColors[rec.urgency] || urgencyColors.baixa}`}>
                              {rec.urgency}
                            </span>
                          </div>
                          <p className="text-xs text-muted-foreground">{rec.reason}</p>
                          <p className="text-[11px] text-primary font-medium">✨ {rec.benefit}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              {sessionRecs.general_tip && (
                <p className="text-xs text-muted-foreground text-center px-4 italic">
                  💡 {sessionRecs.general_tip}
                </p>
              )}
            </>
          ) : (
            <Card>
              <CardContent className="p-4 text-center text-sm text-muted-foreground">
                Faça check-ins de bem-estar para receber recomendações personalizadas.
              </CardContent>
            </Card>
          )}
        </div>

        {/* CTA */}
        <Button variant="outline" className="w-full" onClick={() => navigate("/agendamento")}>
          Agendar Sessão
        </Button>
      </div>
    </AppLayout>
  );
};

export default DiarioHumor;
