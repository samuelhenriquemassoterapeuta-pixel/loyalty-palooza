/**
 * @module edge-functions/financeiro-recorrentes-cron
 * @description CRON Edge Function que gera contas a pagar automaticamente
 * a partir das despesas recorrentes ativas.
 * 
 * Executa diariamente às 06:00 via pg_cron.
 * Chama a função SQL `gerar_contas_recorrentes` para o mês atual.
 */

import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    const supabaseAdmin = createServiceClient();
    const hoje = new Date().toISOString().split("T")[0];

    const { data, error } = await supabaseAdmin.rpc("gerar_contas_recorrentes", {
      p_mes: hoje,
    });

    if (error) {
      console.error("Erro ao gerar contas recorrentes:", error.message);
      return errorResponse("Erro ao processar despesas recorrentes", 500);
    }

    console.log(`Contas recorrentes geradas: ${JSON.stringify(data)}`);
    return jsonResponse({
      success: true,
      resultado: data,
      executado_em: new Date().toISOString(),
    });
  } catch (error) {
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro no CRON financeiro:", msg);
    return errorResponse("Erro interno", 500);
  }
});
