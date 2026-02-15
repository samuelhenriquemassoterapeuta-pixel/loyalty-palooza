import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Validate webhook access token
    const webhookToken = Deno.env.get("ASAAS_WEBHOOK_TOKEN");
    if (webhookToken) {
      const providedToken = req.headers.get("asaas-access-token");
      if (providedToken !== webhookToken) {
        console.error("Webhook auth failed: invalid or missing access token");
        return new Response(JSON.stringify({ error: "Unauthorized" }), {
          status: 401,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
    } else {
      console.warn("ASAAS_WEBHOOK_TOKEN not configured — webhook authentication disabled");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const { event, payment } = body;

    console.log(`Asaas webhook: ${event}`, payment?.id);

    if (!payment?.id) {
      return new Response(JSON.stringify({ received: true }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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
      // Try to find by payment ID anyway
    }

    // Process confirmed/received payments
    if (["PAYMENT_CONFIRMED", "PAYMENT_RECEIVED"].includes(event) && pagamento) {
      const { tipo_referencia, referencia_id, user_id } = pagamento;

      switch (tipo_referencia) {
        case "pedido":
          await supabase
            .from("pedidos")
            .update({ status: "pago" })
            .eq("id", referencia_id);

          await supabase.from("notificacoes").insert({
            user_id,
            titulo: "Pagamento confirmado! ✅",
            mensagem: `Seu pedido #${referencia_id.substring(0, 8)} foi pago com sucesso!`,
            tipo: "pedido",
          });
          break;

        case "assinatura":
          await supabase
            .from("assinaturas_usuario")
            .update({ status: "ativo" })
            .eq("id", referencia_id);

          await supabase.from("notificacoes").insert({
            user_id,
            titulo: "Assinatura ativada! 👑",
            mensagem: "Seu plano VIP foi ativado com sucesso. Aproveite seus benefícios!",
            tipo: "cashback",
          });
          break;

        case "pacote":
          // Pacote already created, just notify
          await supabase.from("notificacoes").insert({
            user_id,
            titulo: "Pacote confirmado! 🎉",
            mensagem: "O pagamento do seu pacote foi confirmado. Suas sessões já estão disponíveis!",
            tipo: "cashback",
          });
          break;

        case "vale_presente":
          await supabase
            .from("vale_presentes")
            .update({ status: "ativo" })
            .eq("id", referencia_id);

          await supabase.from("notificacoes").insert({
            user_id,
            titulo: "Vale Presente pronto! 🎁",
            mensagem: "O pagamento do seu vale presente foi confirmado. Ele já pode ser resgatado!",
            tipo: "cashback",
          });
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

    return new Response(JSON.stringify({ received: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    console.error("Webhook error:", error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
