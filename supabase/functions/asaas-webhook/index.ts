import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Validate webhook access token
    const webhookToken = Deno.env.get("ASAAS_WEBHOOK_TOKEN");
    if (webhookToken) {
      const providedToken = req.headers.get("asaas-access-token");
      if (providedToken !== webhookToken) {
        console.error("Webhook auth failed: invalid or missing access token");
        return errorResponse("Unauthorized", 401);
      }
    } else {
      console.warn("ASAAS_WEBHOOK_TOKEN not configured — webhook authentication disabled");
    }

    const supabase = createServiceClient();

    const body = await req.json();
    const { event, payment } = body;

    console.log(`Asaas webhook: ${event}`, payment?.id);

    if (!payment?.id) {
      return jsonResponse({ received: true });
    }

    // Map Asaas status
    const statusMap: Record<string, string> = {
      PAYMENT_CONFIRMED: "CONFIRMED",
      PAYMENT_RECEIVED: "RECEIVED",
      PAYMENT_OVERDUE: "OVERDUE",
      PAYMENT_REFUNDED: "REFUNDED",
      PAYMENT_DELETED: "DELETED",
      PAYMENT_UPDATED: "UPDATED",
      PAYMENT_CREATED: "CREATED",
    };

    const newStatus = statusMap[event] || payment.status || "UNKNOWN";

    // Update payment record
    const { data: pagamento, error: updateError } = await supabase
      .from("pagamentos_asaas")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("asaas_payment_id", payment.id)
      .select("*, tipo_referencia, referencia_id, user_id")
      .single();

    if (updateError) {
      console.error("Update error:", updateError);
    }

    // Process confirmed/received payments
    if (["PAYMENT_CONFIRMED", "PAYMENT_RECEIVED"].includes(event) && pagamento) {
      const { tipo_referencia, referencia_id, user_id } = pagamento;

      switch (tipo_referencia) {
        case "pedido":
          await supabase.from("pedidos").update({ status: "pago" }).eq("id", referencia_id);
          await supabase.from("notificacoes").insert({ user_id, titulo: "Pagamento confirmado! ✅", mensagem: `Seu pedido #${referencia_id.substring(0, 8)} foi pago com sucesso!`, tipo: "pedido" });
          break;
        case "assinatura":
          await supabase.from("assinaturas_usuario").update({ status: "ativo" }).eq("id", referencia_id);
          await supabase.from("notificacoes").insert({ user_id, titulo: "Assinatura ativada! 👑", mensagem: "Seu plano VIP foi ativado com sucesso. Aproveite seus benefícios!", tipo: "cashback" });
          break;
        case "pacote":
          await supabase.from("notificacoes").insert({ user_id, titulo: "Pacote confirmado! 🎉", mensagem: "O pagamento do seu pacote foi confirmado. Suas sessões já estão disponíveis!", tipo: "cashback" });
          break;
        case "vale_presente":
          await supabase.from("vale_presentes").update({ status: "ativo" }).eq("id", referencia_id);
          await supabase.from("notificacoes").insert({ user_id, titulo: "Vale Presente pronto! 🎁", mensagem: "O pagamento do seu vale presente foi confirmado. Ele já pode ser resgatado!", tipo: "cashback" });
          break;
      }
    }

    // Handle refunds
    if (event === "PAYMENT_REFUNDED" && pagamento) {
      await supabase.from("notificacoes").insert({
        user_id: pagamento.user_id,
        titulo: "Reembolso processado 💸",
        mensagem: `Seu pagamento de R$ ${Number(pagamento.valor).toFixed(2).replace(".", ",")} foi reembolsado.`,
        tipo: "cashback",
      });
    }

    return jsonResponse({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return errorResponse(error.message, 500);
  }
});
