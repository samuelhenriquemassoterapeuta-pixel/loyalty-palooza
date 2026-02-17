import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { requireAuth } from "../_shared/auth.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    const { userId: remetenteId } = await requireAuth(req);
    const supabaseAdmin = createServiceClient();

    const { destinatarioId, valor, destinatarioNome } = await req.json();

    if (!destinatarioId || !valor || valor <= 0) {
      return errorResponse("Dados inválidos");
    }

    if (remetenteId === destinatarioId) {
      return errorResponse("Não é possível transferir para si mesmo");
    }

    // Verificar saldo do remetente
    const { data: transacoes, error: saldoError } = await supabaseAdmin
      .from("transacoes")
      .select("valor")
      .eq("user_id", remetenteId);

    if (saldoError) throw saldoError;

    const saldo = (transacoes || []).reduce((acc, t) => acc + Number(t.valor), 0);

    if (saldo < valor) {
      return errorResponse("Saldo insuficiente");
    }

    // Buscar nome do remetente
    const { data: remetenteProfile } = await supabaseAdmin
      .from("profiles")
      .select("nome")
      .eq("id", remetenteId)
      .single();

    const remetenteNome = remetenteProfile?.nome || "Usuário";

    // Criar transação de débito para o remetente
    const { error: debitoError } = await supabaseAdmin.from("transacoes").insert({
      user_id: remetenteId,
      tipo: "debito",
      valor: -valor,
      descricao: `Transferência para ${destinatarioNome}`,
      referencia_id: destinatarioId,
    });

    if (debitoError) throw debitoError;

    // Criar transação de crédito para o destinatário
    const { error: creditoError } = await supabaseAdmin.from("transacoes").insert({
      user_id: destinatarioId,
      tipo: "credito",
      valor: valor,
      descricao: `Transferência recebida de ${remetenteNome}`,
      referencia_id: remetenteId,
    });

    if (creditoError) throw creditoError;

    // Criar notificação para o destinatário
    await supabaseAdmin.from("notificacoes").insert({
      user_id: destinatarioId,
      titulo: "Transferência recebida! 💰",
      mensagem: `Você recebeu R$ ${valor.toFixed(2).replace(".", ",")} de ${remetenteNome}`,
      tipo: "transferencia",
    });

    return jsonResponse({ success: true, message: "Transferência realizada com sucesso" });
  } catch (error) {
    if (error instanceof Response) return error;
    console.error("Erro na transferência:", error);
    return errorResponse("Erro ao realizar transferência", 500);
  }
});
