import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Verifica se o usuário atual possui o papel 'parceiro'
 * via RPC has_role — server-side, sem risco de escalada de privilégios.
 */
export const useParceiroRole = () => {
  const { user } = useAuth();
  const [isParceiro, setIsParceiro] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const check = async () => {
      if (!user) {
        setIsParceiro(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase.rpc("has_role", {
          _user_id: user.id,
          _role: "parceiro",
        });
        setIsParceiro(!error && data === true);
      } catch {
        setIsParceiro(false);
      } finally {
        setLoading(false);
      }
    };

    check();
  }, [user]);

  return { isParceiro, loading };
};
