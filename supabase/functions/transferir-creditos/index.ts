/**
 * @module edge-functions/transferir-creditos
 * @description Realiza transferência de saldo (cashback) entre usuários da plataforma.
 *
 * Usa a função RPC `transferir_saldo` que é atômica (advisory lock) para
 * prevenir race conditions em transferências concorrentes.
 */

import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { requireAuth } from "../_shared/auth.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";
import { transferirSchema, validate } from "../_shared/validation.ts";

Deno.serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    const { userId: remetenteId } = await requireAuth(req);
    const supabaseAdmin = createServiceClient();

    const body = await req.json();
    const { destinatarioId, valor, destinatarioNome } = validate(transferirSchema, body);

    if (remetenteId === destinatarioId) {
      return errorResponse("Não é possível transferir para si mesmo");
    }

    // Get sender name for notification
    const { data: remetenteProfile } = await supabaseAdmin
      .from("profiles")
      .select("nome")
      .eq("id", remetenteId)
      .single();

    const remetenteNome = remetenteProfile?.nome || "Usuário";

    // Execute atomic transfer via database function (prevents race conditions)
    const { data, error } = await supabaseAdmin.rpc("transferir_saldo", {
      p_remetente_id: remetenteId,
      p_destinatario_id: destinatarioId,
      p_valor: valor,
      p_remetente_nome: remetenteNome,
      p_destinatario_nome: destinatarioNome,
    });

    if (error) {
      console.error("Erro na transferência:", error.message);
      if (error.message.includes("Saldo insuficiente")) {
        return errorResponse("Saldo insuficiente");
      }
      return errorResponse("Erro interno do servidor", 500);
    }

    return jsonResponse({ success: true, message: "Transferência realizada com sucesso" });
  } catch (error) {
    if (error instanceof Response) return error;
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro na transferência:", msg);
    return errorResponse("Erro interno do servidor", 500);
  }
});
