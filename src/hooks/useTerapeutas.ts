 import { useState, useEffect } from "react";
 import { supabase } from "@/integrations/supabase/client";
 
 export interface Terapeuta {
   id: string;
   nome: string;
   especialidade: string | null;
   foto_url: string | null;
   disponivel: boolean;
   created_at: string;
  media_avaliacoes?: number;
  total_avaliacoes?: number;
 }
 
 export const useTerapeutas = () => {
   const [terapeutas, setTerapeutas] = useState<Terapeuta[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
 
   const fetchTerapeutas = async () => {
     try {
       setLoading(true);
      
      // Buscar terapeutas
      const { data: terapeutasData, error: terapeutasError } = await supabase
         .from("terapeutas")
         .select("*")
         .eq("disponivel", true)
         .order("nome", { ascending: true });
 
      if (terapeutasError) throw terapeutasError;

      // Buscar avaliações de agendamentos para calcular média por terapeuta
      const { data: avaliacoesData } = await supabase
        .from("avaliacoes")
        .select(`
          nota,
          agendamentos!inner (
            terapeuta_id
          )
        `)
        .not("agendamento_id", "is", null);

      // Calcular média por terapeuta
      const avaliacoesPorTerapeuta: Record<string, { total: number; soma: number }> = {};
      
      (avaliacoesData || []).forEach((avaliacao: any) => {
        const terapeutaId = avaliacao.agendamentos?.terapeuta_id;
        if (terapeutaId) {
          if (!avaliacoesPorTerapeuta[terapeutaId]) {
            avaliacoesPorTerapeuta[terapeutaId] = { total: 0, soma: 0 };
          }
          avaliacoesPorTerapeuta[terapeutaId].total++;
          avaliacoesPorTerapeuta[terapeutaId].soma += avaliacao.nota;
        }
      });

      // Adicionar média aos terapeutas
      const terapeutasComMedia = (terapeutasData || []).map((terapeuta) => {
        const avaliacoes = avaliacoesPorTerapeuta[terapeuta.id];
        return {
          ...terapeuta,
          media_avaliacoes: avaliacoes ? avaliacoes.soma / avaliacoes.total : undefined,
          total_avaliacoes: avaliacoes?.total || 0,
        };
      });

      setTerapeutas(terapeutasComMedia);
     } catch (err: unknown) {
       const message = err instanceof Error ? err.message : "Erro ao carregar terapeutas";
       setError(message);
     } finally {
       setLoading(false);
     }
   };
 
   useEffect(() => {
     fetchTerapeutas();
   }, []);
 
   return { terapeutas, loading, error, refetch: fetchTerapeutas };
 };