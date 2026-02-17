import { useMemo } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Camera, Star, Activity, Award, TrendingUp, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AppLayout } from "@/components/AppLayout";
import { useNavigate } from "react-router-dom";
import { useAgendamentos } from "@/features/agendamentos/hooks/useAgendamentos";
import { useAchievements } from "@/features/conquistas/hooks/useAchievements";
import { useUsuarioProtocolos, useFichas, useFotos } from "@/features/protocolos/hooks/useProtocolos";
import { useSocialPosts, SocialPost } from "@/features/social/hooks/useSocialPosts";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface TimelineEvent {
  id: string;
  tipo: "sessao" | "conquista" | "foto" | "protocolo" | "social" | "medida";
  titulo: string;
  descricao: string;
  data: Date;
  icon: React.ElementType;
  cor: string;
}

const MinhaJornada = () => {
  const navigate = useNavigate();
  const { agendamentos } = useAgendamentos();
  const { achievements } = useAchievements();
  const { protocoloAtivo, meus } = useUsuarioProtocolos();
  const protocoloId = protocoloAtivo?.id;
  const { fichas } = useFichas(protocoloId);
  const { fotos } = useFotos(protocoloId);
  const { posts: meusPosts } = useSocialPosts();

  const timeline = useMemo(() => {
    const events: TimelineEvent[] = [];

    // Sessões concluídas
    agendamentos
      .filter((a) => a.status === "concluido" || a.status === "realizado")
      .forEach((a) => {
        events.push({
          id: `sessao-${a.id}`,
          tipo: "sessao",
          titulo: a.servico,
          descricao: "Sessão concluída",
          data: new Date(a.data_hora),
          icon: Calendar,
          cor: "text-primary",
        });
      });

    // Conquistas desbloqueadas
    achievements
      .filter((a) => a.unlocked)
      .forEach((a) => {
        events.push({
          id: `conquista-${a.id}`,
          tipo: "conquista",
          titulo: a.name,
          descricao: `Conquista desbloqueada`,
          data: new Date(Date.now()),
          icon: Award,
          cor: "text-accent",
        });
      });

    // Fotos de evolução
    fotos.forEach((f) => {
      events.push({
        id: `foto-${f.id}`,
        tipo: "foto",
        titulo: "Foto de evolução",
        descricao: `Registro ${(f as any).tipo || "durante"}`,
        data: new Date(f.data),
        icon: Camera,
        cor: "text-highlight",
      });
    });

    // Fichas de medidas
    fichas.forEach((f) => {
      events.push({
        id: `medida-${f.id}`,
        tipo: "medida",
        titulo: "Registro de medidas",
        descricao: f.peso ? `Peso: ${f.peso}kg` : "Medidas atualizadas",
        data: new Date(f.data),
        icon: TrendingUp,
        cor: "text-primary",
      });
    });

    // Protocolos iniciados
    meus.forEach((p) => {
      events.push({
        id: `protocolo-${p.id}`,
        tipo: "protocolo",
        titulo: "Protocolo iniciado",
        descricao: `Status: ${p.status}`,
        data: new Date(p.data_inicio),
        icon: Activity,
        cor: "text-accent",
      });
    });

    // Social posts aprovados
    meusPosts
      .filter((p) => p.status === "aprovado")
      .forEach((p) => {
        events.push({
          id: `social-${p.id}`,
          tipo: "social",
          titulo: `Post ${p.tipo_post}`,
          descricao: `+R$ ${(p as any).cashback_valor || 0} cashback`,
          data: new Date(p.created_at),
          icon: Star,
          cor: "text-highlight",
        });
      });

    return events.sort((a, b) => b.data.getTime() - a.data.getTime());
  }, [agendamentos, achievements, fotos, fichas, meus, meusPosts]);

  // Group by month
  const grouped = useMemo(() => {
    const groups: Record<string, TimelineEvent[]> = {};
    timeline.forEach((e) => {
      const key = format(e.data, "MMMM yyyy", { locale: ptBR });
      if (!groups[key]) groups[key] = [];
      groups[key].push(e);
    });
    return Object.entries(groups);
  }, [timeline]);

  return (
    <AppLayout>
      <div className="max-w-lg mx-auto px-4 py-6 space-y-6 pb-24">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-xl font-bold text-foreground">Minha Jornada</h1>
        </div>

        {/* Stats summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-3 gap-3"
        >
          <Card>
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-primary">
                {agendamentos.filter((a) => a.status === "concluido" || a.status === "realizado").length}
              </p>
              <p className="text-[10px] text-muted-foreground">Sessões</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-accent">
                {achievements.filter((a) => a.unlocked).length}
              </p>
              <p className="text-[10px] text-muted-foreground">Conquistas</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-3 text-center">
              <p className="text-2xl font-bold text-highlight">
                {fotos.length}
              </p>
              <p className="text-[10px] text-muted-foreground">Fotos</p>
            </CardContent>
          </Card>
        </motion.div>

        {/* Timeline */}
        {grouped.length > 0 ? (
          grouped.map(([month, events]) => (
            <div key={month} className="space-y-3">
              <p className="section-label px-1 capitalize">{month}</p>
              <div className="relative pl-6 border-l-2 border-border space-y-4">
                {events.map((event, i) => {
                  const Icon = event.icon;
                  return (
                    <motion.div
                      key={event.id}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="relative"
                    >
                      <div className={`absolute -left-[25px] top-1 w-4 h-4 rounded-full bg-card border-2 border-primary flex items-center justify-center`}>
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <Card>
                        <CardContent className="p-3 flex items-center gap-3">
                          <div className={`p-2 rounded-xl bg-muted ${event.cor}`}>
                            <Icon size={16} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-foreground truncate">{event.titulo}</p>
                            <p className="text-[10px] text-muted-foreground">{event.descricao}</p>
                          </div>
                          <span className="text-[10px] text-muted-foreground shrink-0">
                            {format(event.data, "dd/MM")}
                          </span>
                        </CardContent>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          ))
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <TrendingUp className="mx-auto text-muted-foreground mb-3" size={40} />
              <p className="text-muted-foreground text-sm">
                Sua jornada está começando! Agende uma sessão para iniciar.
              </p>
              <Button className="mt-3" onClick={() => navigate("/agendamento")}>
                Agendar sessão
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </AppLayout>
  );
};

export default MinhaJornada;
