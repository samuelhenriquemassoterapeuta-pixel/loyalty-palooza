import { useMemo } from "react";
import {
  differenceInDays,
  differenceInWeeks,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  subDays,
  startOfDay,
  isSameDay,
} from "date-fns";

interface FichaLike {
  data: string;
  peso?: number | null;
  medida_cintura?: number | null;
}

interface MetaLike {
  concluida: boolean;
  semana_numero: number;
}

interface FotoLike {
  data: string;
}

interface ProtocoloInfo {
  duracao_semanas: number;
}

export interface ProgressStats {
  diasDecorridos: number;
  semanaAtual: number;
  progressoTempo: number;
  pesoInicial: number | null;
  pesoAtual: number | null;
  variacaoPeso: number | null;
  cinturaInicial: number | null;
  cinturaAtual: number | null;
  variacaoCintura: number | null;
  metasConcluidas: number;
  metasTotal: number;
  metasProgresso: number;
  fichasSemana: number;
  fotosSemana: number;
  metasSemana: number;
  metasSemanaTotal: number;
  totalFichas: number;
  totalFotos: number;
  diasSemMedicao: number | null;
  streak: number;
  melhorStreak: number;
}

export function useProgressStats(
  fichas: FichaLike[],
  metas: MetaLike[],
  fotos: FotoLike[],
  dataInicio: string,
  protocolo: ProtocoloInfo
): ProgressStats {
  return useMemo(() => {
    const now = new Date();
    const inicio = new Date(dataInicio);
    const diasDecorridos = differenceInDays(now, inicio);
    const semanasDecorridas = differenceInWeeks(now, inicio);
    const semanaAtual = Math.min(semanasDecorridas + 1, protocolo.duracao_semanas);
    const progressoTempo = Math.min(
      Math.round((semanasDecorridas / protocolo.duracao_semanas) * 100),
      100
    );

    const ultimaFicha = fichas.length > 0 ? fichas[fichas.length - 1] : null;
    const primeiraFicha = fichas.length > 0 ? fichas[0] : null;
    const pesoInicial = primeiraFicha?.peso ?? null;
    const pesoAtual = ultimaFicha?.peso ?? null;
    const variacaoPeso =
      pesoInicial != null && pesoAtual != null
        ? Number((pesoAtual - pesoInicial).toFixed(1))
        : null;

    const cinturaInicial = primeiraFicha?.medida_cintura ?? null;
    const cinturaAtual = ultimaFicha?.medida_cintura ?? null;
    const variacaoCintura =
      cinturaInicial != null && cinturaAtual != null
        ? Number((cinturaAtual - cinturaInicial).toFixed(1))
        : null;

    const metasConcluidas = metas.filter((m) => m.concluida).length;
    const metasTotal = metas.length;
    const metasProgresso =
      metasTotal > 0 ? Math.round((metasConcluidas / metasTotal) * 100) : 0;

    const weekStart = startOfWeek(now, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(now, { weekStartsOn: 1 });
    const fichasSemana = fichas.filter((f) =>
      isWithinInterval(new Date(f.data), { start: weekStart, end: weekEnd })
    ).length;
    const fotosSemana = fotos.filter((f) =>
      isWithinInterval(new Date(f.data), { start: weekStart, end: weekEnd })
    ).length;
    const metasSemana = metas.filter(
      (m) => m.semana_numero === semanaAtual && m.concluida
    ).length;
    const metasSemanaTotal = metas.filter(
      (m) => m.semana_numero === semanaAtual
    ).length;

    const diasSemMedicao = ultimaFicha
      ? differenceInDays(now, new Date(ultimaFicha.data))
      : null;

    // Streak calculation
    let streak = 0;
    let melhorStreak = 0;
    if (fichas.length > 0) {
      const measurementDates = new Set(
        fichas.map((f) => startOfDay(new Date(f.data)).getTime())
      );

      const lastDate = startOfDay(new Date(fichas[fichas.length - 1].data));
      let checkDate = lastDate;
      let currentStreak = 0;
      const isActive = differenceInDays(startOfDay(now), lastDate) <= 1;

      if (isActive) {
        while (measurementDates.has(checkDate.getTime())) {
          currentStreak++;
          checkDate = subDays(checkDate, 1);
        }
        streak = currentStreak;
      }

      const sortedDates = Array.from(measurementDates).sort((a, b) => a - b);
      let tempStreak = 1;
      melhorStreak = 1;
      for (let i = 1; i < sortedDates.length; i++) {
        const diffDays =
          (sortedDates[i] - sortedDates[i - 1]) / (1000 * 60 * 60 * 24);
        if (diffDays === 1) {
          tempStreak++;
          melhorStreak = Math.max(melhorStreak, tempStreak);
        } else {
          tempStreak = 1;
        }
      }
      melhorStreak = Math.max(melhorStreak, streak);
    }

    return {
      diasDecorridos,
      semanaAtual,
      progressoTempo,
      pesoInicial,
      pesoAtual,
      variacaoPeso,
      cinturaInicial,
      cinturaAtual,
      variacaoCintura,
      metasConcluidas,
      metasTotal,
      metasProgresso,
      fichasSemana,
      fotosSemana,
      metasSemana,
      metasSemanaTotal,
      totalFichas: fichas.length,
      totalFotos: fotos.length,
      diasSemMedicao,
      streak,
      melhorStreak,
    };
  }, [fichas, metas, fotos, dataInicio, protocolo]);
}
