import { AppLayout } from "@/components/AppLayout";
import { usePlanos, useMinhaAssinatura, useAssinar, useCancelarAssinatura } from "@/hooks/useAssinaturas";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Crown, Leaf, Gem, Check, Star, Loader2, X, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { ConfirmDialog } from "@/components/ConfirmDialog";
import { PaymentDialog } from "@/features/pagamento/components/PaymentDialog";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const iconMap: Record<string, React.ElementType> = {
  crown: Crown,
  leaf: Leaf,
  gem: Gem,
};

const colorMap: Record<string, string> = {
  emerald: "from-emerald-500 to-emerald-700",
  amber: "from-amber-500 to-amber-700",
  violet: "from-violet-500 to-violet-700",
};

const ClubeVip = () => {
  const navigate = useNavigate();
  const { data: planos = [], isLoading: loadingPlanos } = usePlanos();
  const { data: minhaAssinatura } = useMinhaAssinatura();
  const assinar = useAssinar();
  const cancelar = useCancelarAssinatura();
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [paymentPlano, setPaymentPlano] = useState<{ id: string; nome: string; preco: number } | null>(null);
  const [pendingAssinaturaId, setPendingAssinaturaId] = useState<string | null>(null);

  const isSubscribed = !!minhaAssinatura;

  const handleAssinar = async (plano: { id: string; nome: string; preco_mensal: number }) => {
    // Create subscription first (pending payment), then open payment dialog
    try {
      const result = await assinar.mutateAsync(plano.id);
      if (result) {
        setPendingAssinaturaId((result as any).id);
        setPaymentPlano({ id: plano.id, nome: plano.nome, preco: plano.preco_mensal });
      }
    } catch {
      // error handled by mutation
    }
  };

  return (
    <AppLayout>
      <div className="max-w-2xl mx-auto px-4 py-6 space-y-6 pb-24">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Clube VIP</h1>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-2"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent">
            <Crown size={20} />
            <span className="font-semibold text-sm">Clube VIP Resinkra</span>
          </div>
          <h2 className="text-2xl font-bold text-foreground font-[family-name:var(--font-serif)]">
            Benefícios exclusivos para você
          </h2>
          <p className="text-muted-foreground text-sm max-w-md mx-auto">
            Assine um plano e aproveite cashback extra, descontos e prioridade no agendamento.
          </p>
        </motion.div>

        {/* Current subscription */}
        {isSubscribed && minhaAssinatura?.plano && (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            <Card className="border-2 border-accent/30 bg-accent/5">
              <CardContent className="p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Crown className="text-accent" size={20} />
                    <span className="font-bold text-foreground">Seu plano: {minhaAssinatura.plano.nome}</span>
                  </div>
                  <Badge variant="secondary" className="bg-accent/10 text-accent">Ativo</Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  Renovação em {minhaAssinatura.data_fim
                    ? new Date(minhaAssinatura.data_fim).toLocaleDateString("pt-BR")
                    : "—"}
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-destructive border-destructive/30"
                  onClick={() => setConfirmCancel(true)}
                >
                  <X size={14} className="mr-1" /> Cancelar assinatura
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Plans */}
        {loadingPlanos ? (
          <div className="flex justify-center py-12">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : (
          <div className="space-y-4">
            {planos.map((plano, i) => {
              const Icon = iconMap[plano.icone] || Crown;
              const gradient = colorMap[plano.cor] || "from-primary to-primary/80";
              const isCurrentPlan = minhaAssinatura?.plano_id === plano.id;
              const isPopular = plano.ordem === 2;

              return (
                <motion.div
                  key={plano.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  <Card className={`relative overflow-hidden ${isCurrentPlan ? "ring-2 ring-accent" : ""} ${isPopular ? "shadow-elevated" : ""}`}>
                    {isPopular && (
                      <div className="absolute top-0 right-0">
                        <div className="bg-accent text-accent-foreground text-[10px] font-bold px-3 py-1 rounded-bl-lg">
                          MAIS POPULAR
                        </div>
                      </div>
                    )}
                    <CardHeader className="pb-2">
                      <div className="flex items-center gap-3">
                        <div className={`p-2.5 rounded-xl bg-gradient-to-br ${gradient} text-white`}>
                          <Icon size={22} />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{plano.nome}</CardTitle>
                          <p className="text-xs text-muted-foreground">{plano.descricao}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-foreground">
                          R$ {plano.preco_mensal.toFixed(2).replace(".", ",")}
                        </span>
                        <span className="text-sm text-muted-foreground">/mês</span>
                      </div>

                      <div className="space-y-2">
                        {plano.beneficios.map((b, j) => (
                          <div key={j} className="flex items-start gap-2">
                            <Check size={16} className="text-accent mt-0.5 shrink-0" />
                            <span className="text-sm text-foreground">{b}</span>
                          </div>
                        ))}
                      </div>

                      <div className="flex gap-2 flex-wrap">
                        {plano.cashback_bonus_percentual > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            <Star size={12} className="mr-1" />
                            +{plano.cashback_bonus_percentual}% cashback
                          </Badge>
                        )}
                        {plano.desconto_servicos_percentual > 0 && (
                          <Badge variant="secondary" className="text-xs">
                            -{plano.desconto_servicos_percentual}% serviços
                          </Badge>
                        )}
                        {plano.prioridade_agendamento && (
                          <Badge variant="secondary" className="text-xs">Prioridade</Badge>
                        )}
                      </div>

                      <Button
                        className="w-full"
                        variant={isCurrentPlan ? "outline" : "default"}
                        disabled={isCurrentPlan || assinar.isPending}
                        onClick={() => handleAssinar(plano)}
                      >
                        {assinar.isPending && <Loader2 className="animate-spin mr-2" size={16} />}
                        {isCurrentPlan ? "Plano atual" : "Assinar agora"}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}

        <ConfirmDialog
          open={confirmCancel}
          onOpenChange={setConfirmCancel}
          title="Cancelar assinatura?"
          description="Você perderá todos os benefícios VIP ao final do período atual. Tem certeza?"
          confirmLabel="Cancelar assinatura"
          variant="destructive"
          onConfirm={() => {
            if (minhaAssinatura) cancelar.mutate(minhaAssinatura.id);
          }}
        />

        {paymentPlano && pendingAssinaturaId && (
          <PaymentDialog
            open={!!paymentPlano}
            onOpenChange={(open) => { if (!open) setPaymentPlano(null); }}
            value={paymentPlano.preco}
            description={`Assinatura Clube VIP — ${paymentPlano.nome}`}
            tipoReferencia="assinatura"
            referenciaId={pendingAssinaturaId}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default ClubeVip;
