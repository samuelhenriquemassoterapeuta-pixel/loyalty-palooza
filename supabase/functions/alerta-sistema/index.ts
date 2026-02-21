import { createLogger } from "../_shared/logger.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  const log = createLogger("alerta-sistema");

  try {
    const supabase = createServiceClient();

    // Coletar métricas de saúde
    const { data: health, error } = await supabase.rpc("collect_system_health");

    if (error) {
      log.error("Erro ao coletar métricas", { error: error.message });
      return new Response(JSON.stringify({ error: error.message }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    log.info("Saúde do sistema coletada", health as Record<string, unknown>);

    // Verificar se precisa alertar
    const alerts: string[] = [];

    if (health.webhook_failures > 0) {
      alerts.push(
        `🚨 CRÍTICO: ${health.webhook_failures} webhook(s) de pagamento falharam nas últimas 24h`
      );
    }

    if (health.errors_1h > 50) {
      alerts.push(`⚠️ ALERTA: ${health.errors_1h} erros na última hora`);
    }

    if (health.failed_logins_1h > 20) {
      alerts.push(
        `🔐 SEGURANÇA: ${health.failed_logins_1h} tentativas de login falhadas (possível ataque)`
      );
    }

    if (health.broken_functions && health.broken_functions.length > 0) {
      alerts.push(
        `🔧 Funções com erro: ${health.broken_functions.join(", ")}`
      );
    }

    if (health.pending_payments > 10) {
      alerts.push(
        `💳 ${health.pending_payments} pagamentos pendentes há mais de 48h`
      );
    }

    if (health.cashback_expiring_7d > 1000) {
      alerts.push(
        `💰 R$ ${Number(health.cashback_expiring_7d).toFixed(2)} em cashback expirando nos próximos 7 dias`
      );
    }

    // Se há alertas, enviar via WhatsApp (Z-API)
    if (alerts.length > 0) {
      const message =
        `🏥 *Resinkra — Alerta do Sistema*\n\n` +
        `Status: *${String(health.status).toUpperCase()}*\n\n` +
        alerts.join("\n\n") +
        `\n\n📊 Resumo:\n` +
        `• Erros 1h: ${health.errors_1h}\n` +
        `• Erros 24h: ${health.errors_24h}\n` +
        `• Usuários ativos 24h: ${health.active_users_24h}\n` +
        `\n⏰ ${new Date().toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`;

      const zapiInstanceId = Deno.env.get("ZAPI_INSTANCE_ID");
      const zapiToken = Deno.env.get("ZAPI_TOKEN");
      const adminPhone = Deno.env.get("ADMIN_PHONE_NUMBER");

      if (zapiInstanceId && zapiToken && adminPhone) {
        try {
          const response = await fetch(
            `https://api.z-api.io/instances/${zapiInstanceId}/token/${zapiToken}/send-text`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ phone: adminPhone, message }),
            }
          );

          if (response.ok) {
            log.info("Alerta enviado via WhatsApp", {
              alertCount: alerts.length,
            });
          } else {
            log.error("Falha ao enviar alerta WhatsApp", {
              status: response.status,
            });
          }
        } catch (whatsappError) {
          log.error(
            "Erro ao conectar Z-API",
            {},
            whatsappError as Error
          );
        }
      }

      // Salvar alertas no banco
      for (const alert of alerts) {
        await supabase.from("system_alerts").insert({
          alert_type:
            health.status === "critical" ? "webhook_failure" : "error_spike",
          severity: health.status,
          title: alert.substring(0, 100),
          description: alert,
          metadata: health,
          notified: true,
        });
      }
    }

    return new Response(
      JSON.stringify({
        status: health.status,
        alerts_sent: alerts.length,
        health,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    log.error("Erro fatal no alerta", {}, error as Error);
    return new Response(JSON.stringify({ error: "Internal error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
