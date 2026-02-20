/**
 * @module registrar-download
 * @description Registra o download de um material pelo usuário autenticado e incrementa o contador.
 *
 * Usa SUPABASE_SERVICE_ROLE_KEY para incrementar o contador de forma segura,
 * mas valida o JWT do usuário antes de qualquer operação.
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, handleCors } from "../_shared/cors.ts";
import { requireAuth } from "../_shared/auth.ts";

serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    const { userId } = await requireAuth(req);

    const { materialId } = await req.json();
    if (!materialId) {
      return new Response(JSON.stringify({ error: "materialId é obrigatório" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Registrar o download
    const { error: insertError } = await supabase
      .from("material_downloads")
      .insert({ material_id: materialId, user_id: userId });

    if (insertError) {
      console.error("Erro ao registrar download:", insertError);
    }

    // Incrementar contador via RPC
    const { error: rpcError } = await supabase.rpc("increment_material_downloads", {
      material_id: materialId,
    });

    if (rpcError) {
      console.error("Erro ao incrementar contador:", rpcError);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("registrar-download error:", err);
    if (err instanceof Response) return err; // 401 do requireAuth
    const message = err instanceof Error ? err.message : "Erro interno";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
