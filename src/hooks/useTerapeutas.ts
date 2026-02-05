 import { useState, useEffect } from "react";
 import { supabase } from "@/integrations/supabase/client";
 
 export interface Terapeuta {
   id: string;
   nome: string;
   especialidade: string | null;
   foto_url: string | null;
   disponivel: boolean;
   created_at: string;
 }
 
 export const useTerapeutas = () => {
   const [terapeutas, setTerapeutas] = useState<Terapeuta[]>([]);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);
 
   const fetchTerapeutas = async () => {
     try {
       setLoading(true);
       const { data, error } = await supabase
         .from("terapeutas")
         .select("*")
         .eq("disponivel", true)
         .order("nome", { ascending: true });
 
       if (error) throw error;
       setTerapeutas(data || []);
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