import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

interface WhatsAppPayload {
  telefone: string;
  mensagem: string;
  tipo?: string;
  user_id?: string;
  referencia_id?: string;
  referencia_tipo?: string;
}

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const ZAPI_INSTANCE_ID = Deno.env.get("ZAPI_INSTANCE_ID");
    const ZAPI_TOKEN = Deno.env.get("ZAPI_TOKEN");

    if (!ZAPI_INSTANCE_ID || !ZAPI_TOKEN) {
      throw new Error("Credenciais Z-API não configuradas (ZAPI_INSTANCE_ID ou ZAPI_TOKEN).");
    }

    const supabase = createServiceClient();

    const body = await req.json();
    const messages: WhatsAppPayload[] = Array.isArray(body.messages) ? body.messages : [body];

    const results = [];

    for (const msg of messages) {
      const { telefone, mensagem, tipo = "geral", user_id, referencia_id, referencia_tipo } = msg;

      if (!telefone || !mensagem) {
        results.push({ telefone, status: "erro", erro: "Telefone e mensagem são obrigatórios" });
        continue;
      }

      const phoneClean = telefone.replace(/\D/g, "");
      const phoneFormatted = phoneClean.startsWith("55") ? phoneClean : `55${phoneClean}`;

      let logId: string | null = null;

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
        const zapiUrl = `https://api.z-api.io/instances/${ZAPI_INSTANCE_ID}/token/${ZAPI_TOKEN}/send-text`;
        
        const zapiResponse = await fetch(zapiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            phone: phoneFormatted,
            message: mensagem,
          }),
        });

        const zapiResult = await zapiResponse.json();

        if (!zapiResponse.ok) {
          throw new Error(zapiResult?.message || `Z-API retornou status ${zapiResponse.status}`);
        }

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

    const enviados = results.filter((r) => r.status === "enviado").length;
    const erros = results.filter((r) => r.status === "erro").length;

    return jsonResponse({ success: erros === 0, enviados, erros, results });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro na função enviar-whatsapp:", errorMessage);
    return errorResponse(errorMessage, 500);
  }
});
