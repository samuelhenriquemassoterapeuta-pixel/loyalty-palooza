import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, QrCode, CheckCircle, Clock, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/AppLayout";
import { useNavigate } from "react-router-dom";
import { useCheckins } from "@/features/agendamentos/hooks/useCheckins";
import { useAgendamentos } from "@/features/agendamentos/hooks/useAgendamentos";
import QRCode from "react-qr-code";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const Checkin = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { checkins, fazerCheckin } = useCheckins();
  const { getProximosAgendamentos, agendamentos } = useAgendamentos();
  const [showQR, setShowQR] = useState(false);

  const proximos = getProximosAgendamentos();
  const hoje = new Date().toDateString();

  // Agendamentos de hoje que ainda não têm check-in
  const agendamentosHoje = agendamentos.filter(
    (a) =>
      new Date(a.data_hora).toDateString() === hoje &&
      (a.status === "agendado" || a.status === "confirmado") &&
      !checkins.some((c) => (c as any).agendamento_id === a.id)
  );

  const checkinHoje = checkins.filter(
    (c) => new Date(c.created_at).toDateString() === hoje
  );

  const qrValue = user ? `resinkra-checkin:${user.id}:${Date.now()}` : "";

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6 pb-24">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Check-in</h1>
        </div>

        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-3"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary">
            <QrCode size={20} />
            <span className="font-semibold text-sm">Resinkra Check-in</span>
          </div>
          <p className="text-muted-foreground text-sm">
            Apresente o QR Code na recepção ao chegar para ganhar <strong>25 XP</strong> e ativar ofertas exclusivas!
          </p>
        </motion.div>

        {/* QR Code */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="overflow-hidden">
            <CardContent className="p-6 flex flex-col items-center gap-4">
              {showQR ? (
                <>
                  <div className="p-4 bg-white rounded-2xl">
                    <QRCode value={qrValue} size={200} />
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Mostre na recepção para fazer check-in
                  </p>
                </>
              ) : (
                <Button onClick={() => setShowQR(true)} className="gap-2" size="lg">
                  <QrCode size={20} />
                  Mostrar QR Code
                </Button>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Agendamentos de hoje para check-in */}
        {agendamentosHoje.length > 0 && (
          <div className="space-y-3">
            <p className="section-label px-1">Agendamentos de hoje</p>
            {agendamentosHoje.map((ag) => (
              <motion.div key={ag.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card>
                  <CardContent className="p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-xl bg-primary/10">
                        <Clock size={18} className="text-primary" />
                      </div>
                      <div>
                        <p className="font-semibold text-sm text-foreground">{ag.servico}</p>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(ag.data_hora), "HH:mm", { locale: ptBR })}
                        </p>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => fazerCheckin.mutate(ag.id)}
                      disabled={fazerCheckin.isPending}
                      className="gap-1"
                    >
                      <CheckCircle size={14} />
                      Check-in
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Check-in rápido sem agendamento */}
        <Card>
          <CardContent className="p-4 text-center space-y-3">
            <Sparkles className="mx-auto text-accent" size={24} />
            <p className="text-sm font-medium text-foreground">Check-in rápido</p>
            <p className="text-xs text-muted-foreground">Veio sem agendamento? Faça check-in mesmo assim!</p>
            <Button
              variant="outline"
              onClick={() => fazerCheckin.mutate(undefined)}
              disabled={fazerCheckin.isPending}
              className="gap-1"
            >
              <CheckCircle size={14} />
              Fazer check-in
            </Button>
          </CardContent>
        </Card>

        {/* Histórico de hoje */}
        {checkinHoje.length > 0 && (
          <div className="space-y-3">
            <p className="section-label px-1">Check-ins de hoje</p>
            {checkinHoje.map((c) => (
              <div key={c.id} className="flex items-center gap-3 p-3 rounded-xl bg-accent/5 border border-accent/20">
                <CheckCircle size={16} className="text-accent" />
                <span className="text-sm text-foreground">
                  Check-in às {format(new Date(c.created_at), "HH:mm")}
                </span>
                <Badge variant="secondary" className="ml-auto text-xs">
                  +{(c as any).xp_ganho || 25} XP
                </Badge>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppLayout>
  );
};

export default Checkin;
