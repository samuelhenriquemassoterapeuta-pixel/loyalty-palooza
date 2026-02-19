/**
 * @module edge-functions/transferir-creditos
 * @description Realiza transferência de saldo (cashback) entre usuários da plataforma.
 *
 * Funcionalidade P2P que permite usuários enviarem saldo uns para os outros.
 * A operação é atômica e segura, validando saldo antes de efetivar.
 *
 * Regras de Negócio:
 * 1. Não permite transferência para si mesmo
 * 2. Verifica se o remetente tem saldo suficiente (soma das transações)
 * 3. Cria par de transações: débito no remetente, crédito no destinatário
 * 4. Notifica o destinatário
 *
 * @see _shared/validation.ts (Schema transferirSchema)
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
    // 1. Autenticação do Remetente
    const { userId: remetenteId } = await requireAuth(req);
    const supabaseAdmin = createServiceClient(); // Service role para criar transações de sistema

    // 2. Validação de Entrada
    const body = await req.json();
    const { destinatarioId, valor, destinatarioNome } = validate(transferirSchema, body);

    if (remetenteId === destinatarioId) {
      return errorResponse("Não é possível transferir para si mesmo");
    }

    // 3. Verificação de Saldo
    // Calcula saldo somando todas as transações do usuário
    const { data: transacoes, error: saldoError } = await supabaseAdmin
      .from("transacoes")
      .select("valor")
      .eq("user_id", remetenteId);

    if (saldoError) throw saldoError;

    const saldo = (transacoes || []).reduce((acc, t) => acc + Number(t.valor), 0);

    if (saldo < valor) {
      return errorResponse("Saldo insuficiente");
    }

    // 4. Obtenção de Dados do Remetente (para notificação)
    const { data: remetenteProfile } = await supabaseAdmin
      .from("profiles")
      .select("nome")
      .eq("id", remetenteId)
      .single();

    const remetenteNome = remetenteProfile?.nome || "Usuário";

    // 5. Execução da Transferência (Débito)
    // `validate_transaction_insert` trigger permite inserts com auth.uid() nulo (service role)
    const { error: debitoError } = await supabaseAdmin.from("transacoes").insert({
      user_id: remetenteId,
      tipo: "debito", // Tipo especial para saída de fundos
      valor: -valor,  // Valor negativo para reduzir saldo
      descricao: `Transferência para ${destinatarioNome}`,
      referencia_id: destinatarioId,
    });

    if (debitoError) throw debitoError;

    // 6. Execução da Transferência (Crédito)
    const { error: creditoError } = await supabaseAdmin.from("transacoes").insert({
      user_id: destinatarioId,
      tipo: "credito", // Tipo especial para entrada P2P
      valor: valor,    // Valor positivo
      descricao: `Transferência recebida de ${remetenteNome}`,
      referencia_id: remetenteId,
    });

    if (creditoError) throw creditoError;

    // 7. Notificação ao Destinatário
    await supabaseAdmin.from("notificacoes").insert({
      user_id: destinatarioId,
      titulo: "Transferência recebida! 💰",
      mensagem: `Você recebeu R$ ${valor.toFixed(2).replace(".", ",")} de ${remetenteNome}`,
      tipo: "transferencia",
    });

    return jsonResponse({ success: true, message: "Transferência realizada com sucesso" });
  } catch (error) {
    if (error instanceof Response) return error;
    const msg = error instanceof Error ? error.message : "Erro ao realizar transferência";
    console.error("Erro na transferência:", msg);
    return errorResponse(msg, msg.includes("inválido") || msg.includes("positivo") ? 400 : 500);
  }
});
