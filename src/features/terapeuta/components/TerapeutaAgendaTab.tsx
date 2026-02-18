import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, User, CheckCircle2, XCircle, Play, Phone } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { AgendamentoTerapeuta } from "../hooks/useTerapeutaAgenda";
import { PageLoading } from "@/components/LoadingSpinner";

interface Props {
  proximos: AgendamentoTerapeuta[];
  passados: AgendamentoTerapeuta[];
  isLoading: boolean;
  onAtualizarStatus: (id: string, status: string) => void;
  isPending: boolean;
}

const statusConfig: Record<string, { label: string; variant: "default" | "secondary" | "destructive" | "outline" }> = {
  agendado: { label: "Agendado", variant: "outline" },
  confirmado: { label: "Confirmado", variant: "default" },
  em_andamento: { label: "Em andamento", variant: "default" },
  concluido: { label: "Concluído", variant: "secondary" },
  realizado: { label: "Realizado", variant: "secondary" },
  cancelado: { label: "Cancelado", variant: "destructive" },
};

const AgendamentoCard = ({ ag, onAtualizarStatus, isPending }: { ag: AgendamentoTerapeuta; onAtualizarStatus: (id: string, status: string) => void; isPending: boolean }) => {
  const config = statusConfig[ag.status] || { label: ag.status, variant: "outline" as const };
  const dataFormatada = format(new Date(ag.data_hora), "dd/MM/yyyy", { locale: ptBR });
  const horaFormatada = format(new Date(ag.data_hora), "HH:mm");
  const isPast = new Date(ag.data_hora) < new Date();
  const canStart = !isPast && ["agendado", "confirmado"].includes(ag.status);
  const canComplete = ["em_andamento", "confirmado", "agendado"].includes(ag.status);
  const canCancel = !["cancelado", "concluido", "realizado"].includes(ag.status);

  return (
    <Card>
      <CardContent className="py-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <User className="h-4 w-4 text-muted-foreground" />
              <span className="font-semibold text-sm text-foreground truncate">{ag.paciente_nome}</span>
            </div>
            <div className="flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1"><Calendar className="h-3 w-3" />{dataFormatada}</span>
              <span className="flex items-center gap-1"><Clock className="h-3 w-3" />{horaFormatada}</span>
            </div>
            <p className="text-xs text-primary mt-1">{ag.servico}</p>
            {ag.observacoes && <p className="text-xs text-muted-foreground mt-1 italic">"{ag.observacoes}"</p>}
          </div>
          <Badge variant={config.variant} className="text-[10px] shrink-0">{config.label}</Badge>
        </div>

        {(canStart || canComplete || canCancel) && (
          <div className="flex gap-2 flex-wrap">
            {canStart && (
              <Button size="sm" variant="outline" className="gap-1 text-xs h-7" disabled={isPending}
                onClick={() => onAtualizarStatus(ag.id, "em_andamento")}>
                <Play className="h-3 w-3" /> Iniciar
              </Button>
            )}
            {canComplete && (
              <Button size="sm" className="gap-1 text-xs h-7" disabled={isPending}
                onClick={() => onAtualizarStatus(ag.id, "realizado")}>
                <CheckCircle2 className="h-3 w-3" /> Concluir
              </Button>
            )}
            {canCancel && (
              <Button size="sm" variant="destructive" className="gap-1 text-xs h-7" disabled={isPending}
                onClick={() => { if (confirm("Cancelar este agendamento?")) onAtualizarStatus(ag.id, "cancelado"); }}>
                <XCircle className="h-3 w-3" /> Cancelar
              </Button>
            )}
            {ag.paciente_telefone && (
              <Button size="sm" variant="ghost" className="gap-1 text-xs h-7" asChild>
                <a href={`https://wa.me/55${ag.paciente_telefone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                  <Phone className="h-3 w-3" /> WhatsApp
                </a>
              </Button>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export const TerapeutaAgendaTab = ({ proximos, passados, isLoading, onAtualizarStatus, isPending }: Props) => {
  const [sub, setSub] = useState<"proximos" | "historico">("proximos");

  if (isLoading) return <PageLoading />;

  const items = sub === "proximos" ? proximos : passados;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Minha Agenda</h2>
        <Badge variant="outline" className="text-xs">{proximos.length} próximo(s)</Badge>
      </div>

      <Tabs value={sub} onValueChange={(v) => setSub(v as any)}>
        <TabsList className="grid grid-cols-2 w-full">
          <TabsTrigger value="proximos">Próximos</TabsTrigger>
          <TabsTrigger value="historico">Histórico</TabsTrigger>
        </TabsList>
      </Tabs>

      {items.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            <Calendar className="mx-auto h-12 w-12 mb-3 opacity-40" />
            <p>{sub === "proximos" ? "Nenhum agendamento próximo." : "Nenhum atendimento no histórico."}</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {items.map((ag) => (
            <AgendamentoCard key={ag.id} ag={ag} onAtualizarStatus={onAtualizarStatus} isPending={isPending} />
          ))}
        </div>
      )}
    </div>
  );
};
