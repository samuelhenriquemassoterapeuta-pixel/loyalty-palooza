import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export interface PausaConfig {
  id: string;
  user_id: string;
  ativo: boolean;
  intervalo_minutos: number;
  horario_inicio: string;
  horario_fim: string;
  dias_semana: number[];
  created_at: string;
  updated_at: string;
}

export interface PausaRegistro {
  id: string;
  user_id: string;
  data: string;
  exercicio_id: string;
  duracao_segundos: number;
  completado: boolean;
  created_at: string;
}

export const INTERVALOS_OPCOES = [
  { value: 30, label: "30 min" },
  { value: 45, label: "45 min" },
  { value: 60, label: "1 hora" },
  { value: 90, label: "1h30" },
  { value: 120, label: "2 horas" },
];

export const MICRO_EXERCICIOS = [
  {
    id: "rotacao-cervical",
    nome: "Rotação Cervical",
    descricao: "Gire a cabeça lentamente para cada lado, mantendo 5 segundos.",
    duracao: 30,
    icone: "🔄",
    musculos: "Pescoço e trapézio",
  },
  {
    id: "elevacao-ombros",
    nome: "Elevação de Ombros",
    descricao: "Eleve os ombros até as orelhas, segure 3s e solte. Repita 8x.",
    duracao: 30,
    icone: "⬆️",
    musculos: "Trapézio e deltoides",
  },
  {
    id: "extensao-toracica",
    nome: "Extensão Torácica",
    descricao: "Entrelace as mãos atrás da cabeça e estenda o tronco para trás, abrindo o peito.",
    duracao: 20,
    icone: "🙆",
    musculos: "Coluna torácica e peitorais",
  },
  {
    id: "flexao-lateral",
    nome: "Flexão Lateral",
    descricao: "Incline o tronco para cada lado com o braço elevado. Mantenha 10s.",
    duracao: 30,
    icone: "↔️",
    musculos: "Oblíquos e quadrado lombar",
  },
  {
    id: "rotacao-punhos",
    nome: "Rotação de Punhos",
    descricao: "Gire os punhos em círculos, 10x para cada direção.",
    duracao: 20,
    icone: "🤲",
    musculos: "Antebraço e punhos",
  },
  {
    id: "alongamento-quadriceps",
    nome: "Alongamento em Pé",
    descricao: "Em pé, puxe o tornozelo em direção ao glúteo. Alterne. 15s cada.",
    duracao: 40,
    icone: "🦵",
    musculos: "Quadríceps e flexores do quadril",
  },
  {
    id: "respiracao-diafragmatica",
    nome: "Respiração Profunda",
    descricao: "Inspire pelo nariz em 4s, segure 4s, expire em 6s. Repita 5x.",
    duracao: 45,
    icone: "🌬️",
    musculos: "Diafragma e core",
  },
  {
    id: "retração-escapular",
    nome: "Retração Escapular",
    descricao: "Aperte as escápulas uma contra a outra, segure 5s. Repita 10x.",
    duracao: 30,
    icone: "🔙",
    musculos: "Romboides e trapézio médio",
  },
];

export const usePausasPosturais = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  // Fetch config
  const { data: config, isLoading: isLoadingConfig } = useQuery({
    queryKey: ["pausas_config", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pausas_posturais_config")
        .select("*")
        .eq("user_id", user!.id)
        .maybeSingle();
      if (error) throw error;
      return data as PausaConfig | null;
    },
  });

  // Fetch today's records
  const today = new Date().toISOString().split("T")[0];
  const { data: registrosHoje = [], isLoading: isLoadingRegistros } = useQuery({
    queryKey: ["pausas_registros", user?.id, today],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pausas_posturais_registro")
        .select("*")
        .eq("user_id", user!.id)
        .eq("data", today)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data as PausaRegistro[];
    },
  });

  // Fetch last 7 days records for adherence tracking
  const weekAgo = new Date();
  weekAgo.setDate(weekAgo.getDate() - 6);
  const weekAgoStr = weekAgo.toISOString().split("T")[0];

  const { data: registrosSemana = [] } = useQuery({
    queryKey: ["pausas_registros_semana", user?.id, weekAgoStr],
    enabled: !!user,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pausas_posturais_registro")
        .select("*")
        .eq("user_id", user!.id)
        .gte("data", weekAgoStr)
        .order("data", { ascending: true });
      if (error) throw error;
      return data as PausaRegistro[];
    },
  });

  // Save/update config
  const salvarConfig = useMutation({
    mutationFn: async (dados: Partial<PausaConfig>) => {
      if (!user) throw new Error("Não autenticado");

      if (config) {
        const { error } = await supabase
          .from("pausas_posturais_config")
          .update(dados)
          .eq("id", config.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from("pausas_posturais_config")
          .insert({ user_id: user.id, ...dados });
        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pausas_config"] });
      toast.success("Configuração salva!");
    },
    onError: () => toast.error("Erro ao salvar configuração"),
  });

  // Register completed pause
  const registrarPausa = useMutation({
    mutationFn: async ({
      exercicioId,
      duracaoSegundos,
    }: {
      exercicioId: string;
      duracaoSegundos: number;
    }) => {
      if (!user) throw new Error("Não autenticado");
      const { error } = await supabase
        .from("pausas_posturais_registro")
        .insert({
          user_id: user.id,
          exercicio_id: exercicioId,
          duracao_segundos: duracaoSegundos,
        });
      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["pausas_registros"] });
      queryClient.invalidateQueries({ queryKey: ["pausas_registros_semana"] });
      toast.success("Pausa registrada! 🎉");
    },
    onError: () => toast.error("Erro ao registrar pausa"),
  });

  // Calculate adherence stats
  const calcularAderencia = () => {
    if (!config) return { hoje: 0, metaHoje: 0, semana: [] };

    const horasInicio = parseInt(config.horario_inicio.split(":")[0]);
    const horasFim = parseInt(config.horario_fim.split(":")[0]);
    const minutosTrabalho = (horasFim - horasInicio) * 60;
    const metaPausas = Math.floor(minutosTrabalho / config.intervalo_minutos);

    // Weekly adherence: for each of last 7 days
    const semana = Array.from({ length: 7 }, (_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      const dateStr = d.toISOString().split("T")[0];
      const dayOfWeek = d.getDay();
      const isWorkDay = config.dias_semana.includes(dayOfWeek);
      const count = registrosSemana.filter((r) => r.data === dateStr).length;

      return {
        data: dateStr,
        dia: d.toLocaleDateString("pt-BR", { weekday: "short" }).replace(".", ""),
        pausas: count,
        meta: isWorkDay ? metaPausas : 0,
        isWorkDay,
        percentual: isWorkDay && metaPausas > 0 ? Math.min(100, Math.round((count / metaPausas) * 100)) : 0,
      };
    });

    return {
      hoje: registrosHoje.length,
      metaHoje: metaPausas,
      semana,
    };
  };

  return {
    config,
    isLoading: isLoadingConfig || isLoadingRegistros,
    registrosHoje,
    registrosSemana,
    salvarConfig,
    registrarPausa,
    aderencia: calcularAderencia(),
  };
};
