import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface WhatsAppPayload {
  telefone: string;
  mensagem: string;
  tipo?: string;
  user_id?: string;
  referencia_id?: string;
  referencia_tipo?: string;
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ZAPI_INSTANCE_ID = Deno.env.get("ZAPI_INSTANCE_ID");
    const ZAPI_TOKEN = Deno.env.get("ZAPI_TOKEN");

    if (!ZAPI_INSTANCE_ID || !ZAPI_TOKEN) {
      throw new Error("Credenciais Z-API não configuradas (ZAPI_INSTANCE_ID ou ZAPI_TOKEN).");
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    
    // Support single or batch messages
    const messages: WhatsAppPayload[] = Array.isArray(body.messages) ? body.messages : [body];

    const results = [];

    for (const msg of messages) {
      const { telefone, mensagem, tipo = "geral", user_id, referencia_id, referencia_tipo } = msg;

      if (!telefone || !mensagem) {
        results.push({ telefone, status: "erro", erro: "Telefone e mensagem são obrigatórios" });
        continue;
      }

      // Normalizar telefone: remover tudo que não é dígito
      const phoneClean = telefone.replace(/\D/g, "");
      // Garantir formato internacional (55...)
      const phoneFormatted = phoneClean.startsWith("55") ? phoneClean : `55${phoneClean}`;

      let logId: string | null = null;

      // Criar log antes do envio
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
        // Enviar via Z-API
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

        // Atualizar log como enviado
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

        // Atualizar log como erro
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

    return new Response(
      JSON.stringify({
        success: erros === 0,
        enviados,
        erros,
        results,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro na função enviar-whatsapp:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
