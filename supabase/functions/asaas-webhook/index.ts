/**
 * @module edge-functions/asaas-webhook
 * @description Recebe notificações de mudança de status de pagamentos do Asaas.
 *
 * Esta função é o ponto central de processamento de pagamentos. Quando o Asaas
 * confirma um pagamento (PIX, boleto ou cartão), ele chama este endpoint.
 *
 * Fluxo de Processamento:
 * 1. Valida o token de webhook (segurança)
 * 2. Identifica o evento (CONFIRMED, REFUNDED, etc.)
 * 3. Atualiza o status na tabela `pagamentos_asaas`
 * 4. Executa a lógica de negócio específica baseada no `tipo_referencia`:
 *    - `pedido`: Marca como pago e envia notificação
 *    - `assinatura`: Ativa o plano VIP
 *    - `pacote`: Disponibiliza sessões
 *    - `vale_presente`: Ativa o vale para resgate
 *
 * Secrets:
 * - `ASAAS_WEBHOOK_TOKEN`: Token definido no painel do Asaas para validar autenticidade
 */

import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  // CORS não é estritamente necessário para webhooks server-to-server,
  // mas mantemos para consistência e testes manuais.
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // 1. Validação de Segurança (Token do Webhook)
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

    const supabase = createServiceClient(); // Service role para atualizar qualquer registro

    const body = await req.json();
    const { event, payment } = body;

    console.log(`Asaas webhook: ${event}`, payment?.id);

    if (!payment?.id) {
      // Retorna 200 mesmo sem ID para evitar retentativas infinitas do Asaas
      return jsonResponse({ received: true });
    }

    // 2. Mapeamento de Status Asaas -> Status Sistema
    const statusMap: Record<string, string> = {
      PAYMENT_CONFIRMED: "CONFIRMED",
      PAYMENT_RECEIVED: "RECEIVED", // Cartão de crédito (recebido, mas pode não estar disponível para saque)
      PAYMENT_OVERDUE: "OVERDUE",
      PAYMENT_REFUNDED: "REFUNDED",
      PAYMENT_DELETED: "DELETED",
      PAYMENT_UPDATED: "UPDATED",
      PAYMENT_CREATED: "CREATED",
    };

    const newStatus = statusMap[event] || payment.status || "UNKNOWN";

    // 3. Atualização do Registro de Pagamento
    const { data: pagamento, error: updateError } = await supabase
      .from("pagamentos_asaas")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("asaas_payment_id", payment.id)
      .select("*, tipo_referencia, referencia_id, user_id")
      .single();

    if (updateError) {
      console.error("Update error:", updateError);
      // Se não encontrou o pagamento, pode ser um pagamento antigo ou teste
    }

    // 4. Lógica de Negócio por Tipo de Evento
    if (["PAYMENT_CONFIRMED", "PAYMENT_RECEIVED"].includes(event) && pagamento) {
      const { tipo_referencia, referencia_id, user_id } = pagamento;

      switch (tipo_referencia) {
        case "pedido":
          // Atualiza status do pedido e notifica
          await supabase.from("pedidos").update({ status: "pago" }).eq("id", referencia_id);
          
          // Trigger `credit_cashback_on_order` rodará automaticamente no DB
          
          await supabase.from("notificacoes").insert({ 
            user_id, 
            titulo: "Pagamento confirmado! ✅", 
            mensagem: `Seu pedido #${referencia_id.substring(0, 8)} foi pago com sucesso!`, 
            tipo: "pedido" 
          });
          break;

        case "assinatura":
          // Ativa assinatura VIP
          await supabase.from("assinaturas_usuario").update({ status: "ativo" }).eq("id", referencia_id);
          
          await supabase.from("notificacoes").insert({ 
            user_id, 
            titulo: "Assinatura ativada! 👑", 
            mensagem: "Seu plano VIP foi ativado com sucesso. Aproveite seus benefícios!", 
            tipo: "cashback" 
          });
          break;

        case "pacote":
          // Notifica disponibilidade (pacotes são ativados automaticamente na criação, mas dependem de pagto)
          await supabase.from("notificacoes").insert({ 
            user_id, 
            titulo: "Pacote confirmado! 🎉", 
            mensagem: "O pagamento do seu pacote foi confirmado. Suas sessões já estão disponíveis!", 
            tipo: "cashback" 
          });
          break;

        case "vale_presente":
          // Ativa o vale para que possa ser resgatado
          await supabase.from("vale_presentes").update({ status: "ativo" }).eq("id", referencia_id);
          
          await supabase.from("notificacoes").insert({ 
            user_id, 
            titulo: "Vale Presente pronto! 🎁", 
            mensagem: "O pagamento do seu vale presente foi confirmado. Ele já pode ser resgatado!", 
            tipo: "cashback" 
          });
          break;
      }
    }

    // 5. Tratamento de Reembolso
    if (event === "PAYMENT_REFUNDED" && pagamento) {
      await supabase.from("notificacoes").insert({
        user_id: pagamento.user_id,
        titulo: "Reembolso processado 💸",
        mensagem: `Seu pagamento de R$ ${Number(pagamento.valor).toFixed(2).replace(".", ",")} foi reembolsado.`,
        tipo: "cashback",
      });
      
      // TODO: Implementar lógica de estorno de cashback/cromos se necessário
    }

    return jsonResponse({ received: true });
  } catch (error: any) {
    console.error("Webhook error:", error);
    // Retorna 500 para que o Asaas tente enviar novamente
    return errorResponse(error.message, 500);
  }
});
