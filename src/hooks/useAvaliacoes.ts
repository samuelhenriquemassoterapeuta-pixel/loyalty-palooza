 import { useState, useEffect } from "react";
 import { supabase } from "@/integrations/supabase/client";
 import { useAuth } from "@/contexts/AuthContext";
 
 export interface Avaliacao {
   id: string;
   user_id: string;
   agendamento_id: string | null;
   nota: number;
   comentario: string | null;
   created_at: string;
 }
 
 export const useAvaliacoes = () => {
   const { user } = useAuth();
   const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([]);
   const [loading, setLoading] = useState(true);
 
   const fetchAvaliacoes = async () => {
     if (!user) {
       setAvaliacoes([]);
       setLoading(false);
       return;
     }
 
     try {
       setLoading(true);
       const { data, error } = await supabase
         .from("avaliacoes")
         .select("*")
         .eq("user_id", user.id)
         .not("agendamento_id", "is", null);
 
       if (error) throw error;
       setAvaliacoes(data || []);
     } catch (err) {
       console.error("Erro ao buscar avaliações:", err);
     } finally {
       setLoading(false);
     }
   };
 
   const createAvaliacao = async (agendamentoId: string, nota: number, comentario?: string) => {
     if (!user) return { error: new Error("Usuário não autenticado"), data: null };
 
     try {
       const { data, error } = await supabase
         .from("avaliacoes")
         .insert({
           user_id: user.id,
           agendamento_id: agendamentoId,
           nota,
           comentario: comentario || null,
         })
         .select()
         .single();
 
       if (error) throw error;
       await fetchAvaliacoes();
       return { error: null, data };
     } catch (err: any) {
       return { error: err, data: null };
     }
   };
 
   const getAvaliacaoByAgendamento = (agendamentoId: string) => {
     return avaliacoes.find((a) => a.agendamento_id === agendamentoId);
   };
 
   useEffect(() => {
     fetchAvaliacoes();
   }, [user]);
 
   return {
     avaliacoes,
     loading,
     createAvaliacao,
     getAvaliacaoByAgendamento,
     refetch: fetchAvaliacoes,
   };
 };