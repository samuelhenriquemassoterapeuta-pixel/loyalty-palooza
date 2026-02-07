import { useMemo } from "react";
import { useTransacoes } from "./useTransacoes";
import { useAgendamentos } from "./useAgendamentos";
import { useUsuarioProtocolos, useFichas } from "./useProtocolos";

export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji
  unlocked: boolean;
  progress: number; // 0-100
  target: number;
  current: number;
  category: "agendamento" | "cashback" | "protocolo" | "social";
}

export function useAchievements(): { achievements: Achievement[]; totalUnlocked: number } {
  const { stats } = useTransacoes();
  const { agendamentos } = useAgendamentos();
  const { meus } = useUsuarioProtocolos();

  const completedAppointments = agendamentos.filter(
    (a) => a.status === "concluido" || a.status === "realizado"
  ).length;

  const scheduledAppointments = agendamentos.filter(
    (a) => a.status === "agendado"
  ).length;

  const activeProtocols = meus.filter(
    (m) => m.status === "ativo" || m.status === "pausado"
  ).length;

  const completedProtocols = meus.filter(
    (m) => m.status === "concluido"
  ).length;

  const achievements = useMemo<Achievement[]>(() => {
    const list: Achievement[] = [
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
    ];

    return list;
  }, [agendamentos.length, completedAppointments, stats.totalCashback, activeProtocols, completedProtocols]);

  const totalUnlocked = achievements.filter((a) => a.unlocked).length;

  return { achievements, totalUnlocked };
}
