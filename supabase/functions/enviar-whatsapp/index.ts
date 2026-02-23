/**
 * @module edge-functions/enviar-whatsapp
 * @description Serviço de envio de mensagens via WhatsApp usando a UAZAPI (free.uazapi.com).
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
 * - `UAZAPI_INSTANCE_NAME`: Nome da instância UAZAPI
 */

import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

const UAZAPI_SERVER_URL = "https://free.uazapi.com";

interface WhatsAppPayload {
  telefone: string;
  mensagem: string;
  imagem_base64?: string;
  imagem_caption?: string;
  tipo?: string;
  user_id?: string;
  referencia_id?: string;
  referencia_tipo?: string;
}

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    // Require authentication - admins or authenticated users for specific types
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return errorResponse("Não autorizado", 401);
    }
    const supabase = createServiceClient();
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2.89.0");
    const anonKey = Deno.env.get("SUPABASE_ANON_KEY") || "";
    const serviceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
    const token = authHeader.replace("Bearer ", "");
    
    // Allow internal service calls (from other edge functions using anon/service key)
    const isInternalCall = token === anonKey || token === serviceKey;
    
    // For external calls, verify authenticated user
    let callerUserId: string | null = null;
    let callerIsAdmin = false;
    if (!isInternalCall) {
      const userClient = createClient(
        Deno.env.get("SUPABASE_URL")!,
        anonKey,
        { global: { headers: { Authorization: authHeader } } }
      );
      const { data: { user }, error: authError } = await userClient.auth.getUser();
      if (authError || !user) return errorResponse("Não autorizado", 401);
      callerUserId = user.id;
      
      const { data: isAdmin } = await supabase.rpc("has_role", { _user_id: user.id, _role: "admin" });
      callerIsAdmin = !!isAdmin;
    }

    // 1. Validação de Secrets
    const UAZAPI_INSTANCE_NAME = Deno.env.get("UAZAPI_INSTANCE_NAME");

    if (!UAZAPI_INSTANCE_NAME) {
      throw new Error("UAZAPI_INSTANCE_NAME não configurada.");
    }

    // 2. Parsing e Normalização do Payload
    const body = await req.json();
    // Suporta envio único (objeto) ou em lote (array)
    const messages: WhatsAppPayload[] = Array.isArray(body.messages) ? body.messages : [body];

    // Non-admin users can only send specific types (vale_presente, cupom)
    const ALLOWED_USER_TYPES = ["vale_presente", "cupom", "cartao_visita"];
    if (!isInternalCall && !callerIsAdmin) {
      const allAllowed = messages.every(m => ALLOWED_USER_TYPES.includes(m.tipo || ""));
      if (!allAllowed) {
        return errorResponse("Acesso restrito a administradores para este tipo de envio", 403);
      }
    }

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
        // 5. Chamada à UAZAPI (texto ou imagem)
        let uazapiUrl: string;
        let uazapiBody: Record<string, unknown>;

        if (imagem_base64) {
          // Envio de imagem via UAZAPI
          uazapiUrl = `${UAZAPI_SERVER_URL}/message/sendImage/${UAZAPI_INSTANCE_NAME}`;
          uazapiBody = {
            number: phoneFormatted,
            image: `data:image/png;base64,${imagem_base64}`,
            caption: imagem_caption || mensagem || "",
          };
        } else {
          // Envio de texto via UAZAPI
          uazapiUrl = `${UAZAPI_SERVER_URL}/message/sendText/${UAZAPI_INSTANCE_NAME}`;
          uazapiBody = {
            number: phoneFormatted,
            text: mensagem,
            options: {
              delay: 1000,
              linkPreview: true,
            },
          };
        }

        console.log(`UAZAPI Request URL: ${uazapiUrl}`);
        
        const uazapiResponse = await fetch(uazapiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(uazapiBody),
        });

        const uazapiResponseText = await uazapiResponse.text();
        console.log(`UAZAPI Response Status: ${uazapiResponse.status}, Body: ${uazapiResponseText.substring(0, 500)}`);
        
        let uazapiResult: Record<string, unknown>;
        try {
          uazapiResult = JSON.parse(uazapiResponseText);
        } catch {
          throw new Error(`UAZAPI retornou resposta inválida (status ${uazapiResponse.status}): ${uazapiResponseText.substring(0, 200)}`);
        }

        if (!uazapiResponse.ok) {
          throw new Error(uazapiResult?.error as string || `UAZAPI retornou status ${uazapiResponse.status}: ${uazapiResponseText.substring(0, 200)}`);
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
    return errorResponse("Erro interno do servidor", 500);
  }
});
