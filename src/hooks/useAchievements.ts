import { useMemo } from "react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { useTransacoes } from "./useTransacoes";
import { useAgendamentos } from "./useAgendamentos";
import { useUsuarioProtocolos } from "./useProtocolos";
import {
  differenceInDays,
  startOfDay,
  subDays,
} from "date-fns";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji
  unlocked: boolean;
  progress: number; // 0-100
  target: number;
  current: number;
  category: "agendamento" | "cashback" | "protocolo" | "social" | "loja";
}

export function useAchievements(): { achievements: Achievement[]; totalUnlocked: number } {
  const { user } = useAuth();
  const { stats } = useTransacoes();
  const { agendamentos } = useAgendamentos();
  const { meus } = useUsuarioProtocolos();

  // Lightweight query: count indicações
  const { data: indicacoesCount = 0 } = useQuery({
    queryKey: ["indicacoes_count", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { count, error } = await supabase
        .from("indicacoes")
        .select("*", { count: "exact", head: true })
        .eq("indicador_id", user!.id);
      if (error) return 0;
      return count ?? 0;
    },
    staleTime: 60_000,
  });

  // Lightweight query: count pedidos (non-cancelled)
  const { data: pedidosCount = 0 } = useQuery({
    queryKey: ["pedidos_count", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { count, error } = await supabase
        .from("pedidos")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id)
        .neq("status", "cancelado");
      if (error) return 0;
      return count ?? 0;
    },
    staleTime: 60_000,
  });

  // Lightweight query: count fotos evolução
  const { data: fotosCount = 0 } = useQuery({
    queryKey: ["fotos_evolucao_count", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { count, error } = await supabase
        .from("fotos_evolucao")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user!.id);
      if (error) return 0;
      return count ?? 0;
    },
    staleTime: 60_000,
  });

  // Lightweight query: fichas dates for streak calculation
  const protocoloAtivo = meus.find((p) => p.status === "ativo");
  const protocoloUsuarioId = protocoloAtivo?.id;

  const { data: fichasDates = [] } = useQuery({
    queryKey: ["fichas_dates", protocoloUsuarioId],
    enabled: !!user && !!protocoloUsuarioId,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("fichas_acompanhamento")
        .select("data")
        .eq("protocolo_usuario_id", protocoloUsuarioId!)
        .order("data", { ascending: true });
      if (error) return [];
      return (data ?? []).map((f) => f.data);
    },
    staleTime: 60_000,
  });

  const completedAppointments = agendamentos.filter(
    (a) => a.status === "concluido" || a.status === "realizado"
  ).length;

  const activeProtocols = meus.filter(
    (m) => m.status === "ativo" || m.status === "pausado"
  ).length;

  const completedProtocols = meus.filter(
    (m) => m.status === "concluido"
  ).length;

  // Calculate streak from fichas dates
  const currentStreak = useMemo(() => {
    if (fichasDates.length === 0) return 0;

    const measurementDates = new Set(
      fichasDates.map((d) => startOfDay(new Date(d)).getTime())
    );

    const lastDate = startOfDay(new Date(fichasDates[fichasDates.length - 1]));
    const now = startOfDay(new Date());
    const isActive = differenceInDays(now, lastDate) <= 1;

    if (!isActive) return 0;

    let streak = 0;
    let checkDate = lastDate;
    while (measurementDates.has(checkDate.getTime())) {
      streak++;
      checkDate = subDays(checkDate, 1);
    }
    return streak;
  }, [fichasDates]);

  const achievements = useMemo<Achievement[]>(() => {
    const list: Achievement[] = [
      // ── Agendamento ──
      {
        id: "first_appointment",
        name: "Primeira Sessão",
        description: "Agende sua primeira sessão",
        icon: "📅",
        unlocked: agendamentos.length > 0,
        progress: Math.min(agendamentos.length > 0 ? 100 : 0, 100),
        target: 1,
        current: Math.min(agendamentos.length, 1),
        category: "agendamento",
      },
      {
        id: "five_sessions",
        name: "Frequente",
        description: "Complete 5 sessões",
        icon: "⭐",
        unlocked: completedAppointments >= 5,
        progress: Math.min((completedAppointments / 5) * 100, 100),
        target: 5,
        current: Math.min(completedAppointments, 5),
        category: "agendamento",
      },
      {
        id: "ten_sessions",
        name: "Dedicada",
        description: "Complete 10 sessões",
        icon: "🏆",
        unlocked: completedAppointments >= 10,
        progress: Math.min((completedAppointments / 10) * 100, 100),
        target: 10,
        current: Math.min(completedAppointments, 10),
        category: "agendamento",
      },
      {
        id: "loyal_customer",
        name: "Clientela VIP",
        description: "Complete 20 sessões",
        icon: "👑",
        unlocked: completedAppointments >= 20,
        progress: Math.min((completedAppointments / 20) * 100, 100),
        target: 20,
        current: Math.min(completedAppointments, 20),
        category: "agendamento",
      },

      // ── Cashback ──
      {
        id: "first_cashback",
        name: "Primeiro Cashback",
        description: "Ganhe seu primeiro cashback",
        icon: "💰",
        unlocked: stats.totalCashback > 0,
        progress: stats.totalCashback > 0 ? 100 : 0,
        target: 1,
        current: stats.totalCashback > 0 ? 1 : 0,
        category: "cashback",
      },
      {
        id: "cashback_50",
        name: "Economista",
        description: "Acumule R$ 50 em cashback",
        icon: "💎",
        unlocked: stats.totalCashback >= 50,
        progress: Math.min((stats.totalCashback / 50) * 100, 100),
        target: 50,
        current: Math.min(stats.totalCashback, 50),
        category: "cashback",
      },

      // ── Protocolo ──
      {
        id: "first_protocol",
        name: "Iniciante",
        description: "Ative seu primeiro protocolo",
        icon: "🌱",
        unlocked: activeProtocols > 0 || completedProtocols > 0,
        progress: activeProtocols > 0 || completedProtocols > 0 ? 100 : 0,
        target: 1,
        current: activeProtocols > 0 || completedProtocols > 0 ? 1 : 0,
        category: "protocolo",
      },
      {
        id: "protocol_complete",
        name: "Missão Cumprida",
        description: "Conclua um protocolo completo",
        icon: "🎯",
        unlocked: completedProtocols > 0,
        progress: completedProtocols > 0 ? 100 : 0,
        target: 1,
        current: Math.min(completedProtocols, 1),
        category: "protocolo",
      },
      {
        id: "streak_7",
        name: "Constância",
        description: "Registre medidas por 7 dias seguidos",
        icon: "🔥",
        unlocked: currentStreak >= 7,
        progress: Math.min((currentStreak / 7) * 100, 100),
        target: 7,
        current: Math.min(currentStreak, 7),
        category: "protocolo",
      },
      {
        id: "first_photo",
        name: "Primeiro Registro",
        description: "Envie sua primeira foto de evolução",
        icon: "📸",
        unlocked: fotosCount > 0,
        progress: fotosCount > 0 ? 100 : 0,
        target: 1,
        current: Math.min(fotosCount, 1),
        category: "protocolo",
      },

      // ── Social ──
      {
        id: "first_referral",
        name: "Embaixadora",
        description: "Faça sua primeira indicação",
        icon: "🤝",
        unlocked: indicacoesCount > 0,
        progress: indicacoesCount > 0 ? 100 : 0,
        target: 1,
        current: Math.min(indicacoesCount, 1),
        category: "social",
      },
      {
        id: "five_referrals",
        name: "Influenciadora",
        description: "Indique 5 amigas",
        icon: "🌟",
        unlocked: indicacoesCount >= 5,
        progress: Math.min((indicacoesCount / 5) * 100, 100),
        target: 5,
        current: Math.min(indicacoesCount, 5),
        category: "social",
      },

      // ── Loja ──
      {
        id: "first_purchase",
        name: "Primeira Compra",
        description: "Faça sua primeira compra na loja",
        icon: "🛍️",
        unlocked: pedidosCount > 0,
        progress: pedidosCount > 0 ? 100 : 0,
        target: 1,
        current: Math.min(pedidosCount, 1),
        category: "loja",
      },
      {
        id: "five_purchases",
        name: "Compradora Fiel",
        description: "Faça 5 compras na loja",
        icon: "🛒",
        unlocked: pedidosCount >= 5,
        progress: Math.min((pedidosCount / 5) * 100, 100),
        target: 5,
        current: Math.min(pedidosCount, 5),
        category: "loja",
      },
    ];

    return list;
  }, [
    agendamentos.length,
    completedAppointments,
    stats.totalCashback,
    activeProtocols,
    completedProtocols,
    currentStreak,
    indicacoesCount,
    pedidosCount,
    fotosCount,
  ]);

  const totalUnlocked = achievements.filter((a) => a.unlocked).length;

  return { achievements, totalUnlocked };
}
