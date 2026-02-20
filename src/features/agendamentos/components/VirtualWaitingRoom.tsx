import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Camera,
  CameraOff,
  Video,
  Brain,
  ClipboardList,
  FileEdit,
  PhoneCall,
  Wifi,
  CheckCircle2,
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import type { Agendamento } from "@/features/agendamentos/hooks/useAgendamentos";

interface VirtualWaitingRoomProps {
  agendamento: Agendamento;
}

export const VirtualWaitingRoom = ({ agendamento }: VirtualWaitingRoomProps) => {
  const [statusSala, setStatusSala] = useState<string>(
    (agendamento as any).status_sala ?? "aguardando"
  );
  const [podeEntrar, setPodeEntrar] = useState(false);
  const [anotacoes, setAnotacoes] = useState("");
  const [pulseActive, setPulseActive] = useState(true);

  // ── Realtime: ouve alterações no agendamento atual ──────────────────────────
  useEffect(() => {
    const channel = supabase
      .channel("sala_espera")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "agendamentos",
          filter: `id=eq.${agendamento.id}`,
        },
        (payload: any) => {
          const novoStatus = payload.new?.status_sala;
          if (novoStatus && novoStatus !== statusSala) {
            setStatusSala(novoStatus);

            if (novoStatus === "em_consulta") {
              toast.success("O Terapeuta entrou!", {
                description: "A sala está pronta. Você pode ingressar agora.",
                duration: 6000,
                icon: <CheckCircle2 className="text-primary" size={18} />,
              });
              setPodeEntrar(true);
              setPulseActive(false);
            } else if (novoStatus === "finalizado") {
              toast.info("Consulta encerrada.", {
                description: "Obrigado por participar da sua sessão online.",
              });
              setPodeEntrar(false);
            }
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [agendamento.id, statusSala]);

  const meetingUrl = (agendamento as any).meeting_url;

  const statusLabel: Record<string, { text: string; color: string }> = {
    aguardando: { text: "Aguardando", color: "bg-secondary text-secondary-foreground border-border" },
    em_consulta: { text: "Em Consulta", color: "bg-primary/10 text-primary border-primary/30" },
    finalizado: { text: "Finalizado", color: "bg-muted text-muted-foreground border-border" },
  };

  const currentStatus = statusLabel[statusSala] ?? statusLabel["aguardando"];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 h-full min-h-[600px]">
      {/* ── Coluna Esquerda: Placeholder de Vídeo ─────────────────────────────── */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold text-foreground text-base">Sala Virtual</h2>
          <Badge
            variant="outline"
            className={`text-xs font-medium ${currentStatus.color}`}
          >
            <span
              className={`mr-1.5 inline-block h-1.5 w-1.5 rounded-full ${
                statusSala === "em_consulta"
                  ? "bg-primary"
                  : statusSala === "aguardando"
                  ? "bg-secondary-foreground/60"
                  : "bg-muted-foreground"
              }`}
            />
            {currentStatus.text}
          </Badge>
        </div>

        {/* Video Placeholder */}
        <div className="relative flex-1 min-h-[320px] lg:min-h-0 rounded-2xl overflow-hidden bg-[hsl(240_10%_4%)] border border-[hsl(240_5%_15%)] flex items-center justify-center">
          {/* Animated background grid */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage:
                "linear-gradient(hsl(var(--primary)/0.3) 1px, transparent 1px), linear-gradient(90deg, hsl(var(--primary)/0.3) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
            }}
          />

          {/* Pulse ring when waiting */}
          {pulseActive && statusSala === "aguardando" && (
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {[1, 2, 3].map((i) => (
                <motion.div
                  key={i}
                  className="absolute rounded-full border border-primary/20"
                  animate={{ scale: [1, 2.5], opacity: [0.4, 0] }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    delay: i * 0.7,
                    ease: "easeOut",
                  }}
                  style={{ width: 80, height: 80 }}
                />
              ))}
            </motion.div>
          )}

          <div className="relative z-10 flex flex-col items-center gap-4 text-center px-8">
            <div className="p-5 rounded-2xl bg-card/10 border border-border/20">
              <CameraOff className="text-muted-foreground/50" size={36} />
            </div>
            <div>
              <p className="text-foreground/80 font-medium text-sm leading-relaxed">
                {statusSala === "em_consulta"
                  ? "Sala pronta para ingressar"
                  : statusSala === "finalizado"
                  ? "Consulta encerrada"
                  : "Aguardando Terapeuta iniciar a sala..."}
              </p>
              <p className="text-muted-foreground/60 text-xs mt-1">
                {statusSala === "aguardando"
                  ? "O vídeo será ativado quando a sessão começar"
                  : statusSala === "em_consulta"
                  ? "Clique em 'Entrar na Chamada' para ingressar"
                  : "Obrigado pela sua sessão"}
              </p>
            </div>

            {/* Waiting indicator */}
            {statusSala === "aguardando" && (
              <div className="flex items-center gap-2 text-muted-foreground/50 text-xs">
                <Wifi size={12} className="animate-pulse" />
                <span>Conectado · Aguardando...</span>
              </div>
            )}
          </div>

          {/* Corner decorations */}
          <div className="absolute top-3 left-3 w-4 h-4 border-t border-l border-primary/30 rounded-tl" />
          <div className="absolute top-3 right-3 w-4 h-4 border-t border-r border-primary/30 rounded-tr" />
          <div className="absolute bottom-3 left-3 w-4 h-4 border-b border-l border-primary/30 rounded-bl" />
          <div className="absolute bottom-3 right-3 w-4 h-4 border-b border-r border-primary/30 rounded-br" />
        </div>

        {/* Enter Call Button */}
        <AnimatePresence>
          {podeEntrar && meetingUrl && (
            <motion.div
              initial={{ opacity: 0, y: 12, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.96 }}
              transition={{ type: "spring", stiffness: 300, damping: 24 }}
            >
              <Button
                className="w-full h-12 gap-2.5 text-sm font-semibold shadow-lg"
                onClick={() => window.open(meetingUrl, "_blank")}
              >
                <PhoneCall size={16} />
                Entrar na Chamada
              </Button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Service info */}
        <Card className="border-border/60">
          <CardContent className="py-3 px-4 flex items-center gap-3">
            <div className="p-2 rounded-lg bg-primary/10">
              <Video className="text-primary" size={14} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {agendamento.servico}
              </p>
              <p className="text-xs text-muted-foreground">
                {agendamento.terapeutas?.nome
                  ? `com ${agendamento.terapeutas.nome}`
                  : "Consulta Online"}
              </p>
            </div>
            <Badge variant="outline" className="text-xs shrink-0">
              Online
            </Badge>
          </CardContent>
        </Card>
      </div>

      {/* ── Coluna Direita: Tabs de Informação ────────────────────────────────── */}
      <div className="flex flex-col">
        <Tabs defaultValue="resumo" className="flex flex-col flex-1">
          <TabsList className="grid grid-cols-3 w-full mb-4">
            <TabsTrigger value="resumo" className="gap-1.5 text-xs">
              <Brain size={13} />
              Resumo IA
            </TabsTrigger>
            <TabsTrigger value="ficha" className="gap-1.5 text-xs">
              <ClipboardList size={13} />
              Ficha
            </TabsTrigger>
            <TabsTrigger value="anotacoes" className="gap-1.5 text-xs">
              <FileEdit size={13} />
              Anotações
            </TabsTrigger>
          </TabsList>

          {/* Tab: Resumo IA */}
          <TabsContent value="resumo" className="flex-1 mt-0">
            <Card className="h-full border-border/60">
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <Brain size={15} className="text-primary" />
                  Resumo Gerado pela IA
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                <div className="rounded-xl bg-primary/5 border border-primary/10 p-3.5 space-y-2">
                  <p className="text-xs font-medium text-primary">Sessão anterior</p>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Paciente relatou melhora progressiva nos padrões de ansiedade. Técnicas de respiração
                    praticadas diariamente. Próximo foco: regulação emocional em situações de trabalho.
                  </p>
                </div>
                <div className="rounded-xl bg-muted/50 border border-border/60 p-3.5 space-y-2">
                  <p className="text-xs font-medium text-foreground">Objetivos para hoje</p>
                  <ul className="text-xs text-muted-foreground space-y-1">
                    <li className="flex items-start gap-1.5">
                      <span className="mt-0.5 text-primary">•</span>
                      Revisar exercícios da semana
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="mt-0.5 text-primary">•</span>
                      Explorar gatilhos emocionais identificados
                    </li>
                    <li className="flex items-start gap-1.5">
                      <span className="mt-0.5 text-primary">•</span>
                      Definir plano de ação para as próximas 2 semanas
                    </li>
                  </ul>
                </div>
                <p className="text-[10px] text-muted-foreground/60 italic">
                  * Gerado automaticamente com base no histórico de sessões
                </p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Ficha do Paciente */}
          <TabsContent value="ficha" className="flex-1 mt-0">
            <Card className="h-full border-border/60">
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <ClipboardList size={15} className="text-primary" />
                  Ficha do Paciente
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 space-y-3">
                {[
                  { label: "Serviço", value: agendamento.servico },
                  {
                    label: "Terapeuta",
                    value: agendamento.terapeutas?.nome ?? "—",
                  },
                  {
                    label: "Especialidade",
                    value: agendamento.terapeutas?.especialidade ?? "—",
                  },
                  { label: "Modalidade", value: "Online (Telemedicina)" },
                  { label: "Status", value: currentStatus.text },
                ].map(({ label, value }) => (
                  <div
                    key={label}
                    className="flex items-start justify-between gap-3 py-2 border-b border-border/40 last:border-0"
                  >
                    <span className="text-xs text-muted-foreground shrink-0">{label}</span>
                    <span className="text-xs font-medium text-foreground text-right">{value}</span>
                  </div>
                ))}
                {agendamento.observacoes && (
                  <div className="rounded-xl bg-muted/50 border border-border/60 p-3 mt-1">
                    <p className="text-xs text-muted-foreground mb-1 font-medium">Observações</p>
                    <p className="text-xs text-foreground">{agendamento.observacoes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Tab: Anotações */}
          <TabsContent value="anotacoes" className="flex-1 mt-0">
            <Card className="h-full border-border/60 flex flex-col">
              <CardHeader className="pb-3 pt-4 px-4">
                <CardTitle className="text-sm font-semibold flex items-center gap-2">
                  <FileEdit size={15} className="text-primary" />
                  Anotações da Sessão
                </CardTitle>
              </CardHeader>
              <CardContent className="px-4 pb-4 flex flex-col flex-1 gap-3">
                <Textarea
                  placeholder="Registre aqui suas anotações pessoais sobre esta sessão... (somente você pode ver)"
                  className="flex-1 min-h-[200px] resize-none text-xs bg-muted/30 border-border/60 focus:border-primary/50 transition-colors"
                  value={anotacoes}
                  onChange={(e) => setAnotacoes(e.target.value)}
                />
                <div className="flex items-center justify-between">
                  <p className="text-[10px] text-muted-foreground/60 italic">
                    Visível apenas para você
                  </p>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-7 text-xs gap-1.5"
                    onClick={() =>
                      toast.success("Anotações salvas!", { duration: 2000 })
                    }
                    disabled={!anotacoes.trim()}
                  >
                    <CheckCircle2 size={11} />
                    Salvar
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
