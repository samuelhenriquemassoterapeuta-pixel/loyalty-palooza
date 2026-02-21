/**
 * @module edge-functions/enviar-whatsapp
 * @description Serviço de envio de mensagens via WhatsApp usando a Z-API.
 *
 * Utilizado por todo o sistema para:
 * - Notificações de agendamento
 * - Lembretes automáticos
 * - Campanhas de marketing
 * - Confirmação de pedidos
 *
 * Características:
 * - Suporta envio em lote (array de mensagens)
 * - Salva log de envio (`whatsapp_logs`) para auditoria
 * - Formata números automaticamente (adiciona 55 se necessário)
 *
 * Secrets:
 * - `ZAPI_INSTANCE_ID`: ID da instância Z-API
 * - `ZAPI_TOKEN`: Token de segurança Z-API
 */

import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

interface WhatsAppPayload {
  telefone: string;
  mensagem: string;
  imagem_base64?: string; // Base64 da imagem (sem prefixo data:)
  imagem_caption?: string; // Legenda da imagem
  tipo?: string;
  user_id?: string;
  referencia_id?: string;
  referencia_tipo?: string;
}

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // 1. Validação de Secrets
    const ZAPI_INSTANCE_ID = Deno.env.get("ZAPI_INSTANCE_ID");
    const ZAPI_TOKEN = Deno.env.get("ZAPI_TOKEN");

    if (!ZAPI_INSTANCE_ID || !ZAPI_TOKEN) {
      throw new Error("Credenciais Z-API não configuradas (ZAPI_INSTANCE_ID ou ZAPI_TOKEN).");
    }

    const supabase = createServiceClient();

    // 2. Parsing e Normalização do Payload
    const body = await req.json();
    // Suporta envio único (objeto) ou em lote (array)
    const messages: WhatsAppPayload[] = Array.isArray(body.messages) ? body.messages : [body];

    const results = [];

    // 3. Processamento Sequencial
    for (const msg of messages) {
      const { telefone, mensagem, imagem_base64, imagem_caption, tipo = "geral", user_id, referencia_id, referencia_tipo } = msg;

      if (!telefone || (!mensagem && !imagem_base64)) {
        results.push({ telefone, status: "erro", erro: "Telefone e mensagem (ou imagem) são obrigatórios" });
        continue;
      }

      // Formatação do número: remove não-dígitos e garante DDI 55 (Brasil)
      const phoneClean = telefone.replace(/\D/g, "");
      const phoneFormatted = phoneClean.startsWith("55") ? phoneClean : `55${phoneClean}`;

      let logId: string | null = null;

      // 4. Criação do Log (Status: Enviando)
      const { data: logData } = await supabase
        .from("whatsapp_logs")
        .insert({
          user_id: user_id || null,
          telefone: phoneFormatted,
          tipo,
          mensagem,
          status: "enviando",
          referencia_id: referencia_id || null,
          referencia_tipo: referencia_tipo || null,
        })
        .select("id")
        .single();

      logId = logData?.id || null;

      try {
        // 5. Chamada à Z-API (texto ou imagem)
        let zapiUrl: string;
        let zapiBody: Record<string, unknown>;

        if (imagem_base64) {
          // Envio de imagem
          zapiUrl = `https://api.z-api.io/instances/${ZAPI_INSTANCE_ID}/token/${ZAPI_TOKEN}/send-image`;
          zapiBody = {
            phone: phoneFormatted,
            image: `data:image/png;base64,${imagem_base64}`,
            caption: imagem_caption || mensagem || "",
          };
        } else {
          // Envio de texto
          zapiUrl = `https://api.z-api.io/instances/${ZAPI_INSTANCE_ID}/token/${ZAPI_TOKEN}/send-text`;
          zapiBody = {
            phone: phoneFormatted,
            message: mensagem,
          };
        }
        
        const zapiResponse = await fetch(zapiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(zapiBody),
        });

        const zapiResult = await zapiResponse.json();

        if (!zapiResponse.ok) {
          throw new Error(zapiResult?.message || `Z-API retornou status ${zapiResponse.status}`);
        }

        // 6. Atualização do Log (Status: Enviado)
        if (logId) {
          await supabase
            .from("whatsapp_logs")
            .update({ status: "enviado", enviado_em: new Date().toISOString() })
            .eq("id", logId);
        }

        results.push({ telefone: phoneFormatted, status: "enviado", logId });
        console.log(`WhatsApp enviado para ${phoneFormatted} (${tipo})`);
      } catch (sendError: unknown) {
        const errorMsg = sendError instanceof Error ? sendError.message : "Erro desconhecido";

        // Atualização do Log (Status: Erro)
        if (logId) {
          await supabase
            .from("whatsapp_logs")
            .update({ status: "erro", erro: errorMsg })
            .eq("id", logId);
        }

        results.push({ telefone: phoneFormatted, status: "erro", erro: errorMsg, logId });
        console.error(`Erro ao enviar WhatsApp para ${phoneFormatted}:`, errorMsg);
      }
    }

    // 7. Resumo da Operação
    const enviados = results.filter((r) => r.status === "enviado").length;
    const erros = results.filter((r) => r.status === "erro").length;

    return jsonResponse({ success: erros === 0, enviados, erros, results });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro na função enviar-whatsapp:", errorMessage);
    return errorResponse(errorMessage, 500);
  }
});
