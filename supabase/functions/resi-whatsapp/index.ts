// ============================================================
// 🌿 RESINKRA - Resi WhatsApp Webhook
// Edge Function para integração com WhatsApp via UAZAPI
// ============================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { MENU_MESSAGE } from "../_shared/resi-config.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const UAZAPI_SERVER_URL = "https://free.uazapi.com";

// Função para enviar mensagem via UAZAPI
async function sendWhatsAppMessage(phone: string, message: string) {
  const UAZAPI_INSTANCE_NAME = Deno.env.get('UAZAPI_INSTANCE_NAME')!;

  const response = await fetch(`${UAZAPI_SERVER_URL}/message/sendText/${UAZAPI_INSTANCE_NAME}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      number: phone,
      text: message,
      options: { delay: 1000, linkPreview: true },
    })
  });

  return response.json();
}

// Função para enviar lista de botões via UAZAPI
async function sendWhatsAppList(phone: string) {
  const UAZAPI_INSTANCE_NAME = Deno.env.get('UAZAPI_INSTANCE_NAME')!;

  const response = await fetch(`${UAZAPI_SERVER_URL}/message/sendList/${UAZAPI_INSTANCE_NAME}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      number: phone,
      title: "Como posso ajudar?",
      description: "🌿 Olá! Sou a Resi, sua assistente da Resinkra!",
      buttonText: "Escolha uma opção",
      sections: [
        {
          title: "Opções",
          rows: [
            { title: "💬 Dúvidas Gerais", rowId: "1" },
            { title: "📅 Agendamentos", rowId: "2" },
            { title: "🎬 Criar Conteúdo", rowId: "3" },
            { title: "🛒 Produtos/Pacotes", rowId: "4" },
            { title: "🧘 Bem-estar", rowId: "5" },
          ]
        }
      ]
    })
  });

  return response.json();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Webhook authentication: validate webhook token
    const UAZAPI_WEBHOOK_SECRET = Deno.env.get('UAZAPI_WEBHOOK_SECRET');
    if (!UAZAPI_WEBHOOK_SECRET) {
      console.error('UAZAPI_WEBHOOK_SECRET not configured — rejecting request for security');
      return new Response(JSON.stringify({ error: 'Webhook authentication not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    const providedToken = req.headers.get('x-webhook-token') || new URL(req.url).searchParams.get('token');
    if (providedToken !== UAZAPI_WEBHOOK_SECRET) {
      console.warn('Webhook auth failed: invalid token');
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const payload = await req.json();
    console.log('WhatsApp Webhook recebido (UAZAPI)');

    // UAZAPI payload format: data.from, data.text/data.body, data.messageId
    const msgData = payload?.data || payload;
    const isFromMe = payload?.fromMe || msgData?.fromMe || false;

    if (!isFromMe && (msgData?.text || msgData?.body)) {
      const phone = (msgData.from || msgData.phone || '').replace(/\D/g, '');
      const message = (msgData.text || msgData.body || '').substring(0, 2000).trim();
      const listRowId = msgData?.listResponseMessage?.selectedRowId || msgData?.selectedRowId || null;

      // Validate phone format
      if (!phone || !/^\d{10,15}$/.test(phone) || !message) {
        return new Response(JSON.stringify({ status: 'ignored' }), { 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        });
      }

      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
      const supabase = createClient(supabaseUrl, supabaseKey);

      // Buscar usuário pelo telefone
      let userId: string | null = null;
      try {
        const { data: profile } = await supabase
          .from('profiles')
          .select('id')
          .eq('telefone', phone)
          .single();
        userId = profile?.id;
      } catch (_e) {
        console.log('Usuário não encontrado pelo telefone');
      }

      if (!userId) {
        userId = `whatsapp_${phone}`;
      }

      // Sanitize message to prevent prompt injection patterns
      const sanitizedMessage = (listRowId || message).replace(/\[INSTRUÇÃO\]/gi, '').replace(/\[SISTEMA\]/gi, '').replace(/\[CONTEXTO\]/gi, '').trim();
      const messageToProcess = sanitizedMessage;

      // Chamar o resi-router
      const routerResponse = await fetch(`${supabaseUrl}/functions/v1/resi-router`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${Deno.env.get('SUPABASE_ANON_KEY')}`
        },
        body: JSON.stringify({
          userId,
          message: messageToProcess,
          platform: 'whatsapp'
        })
      });

      const routerData = await routerResponse.json();

      // Enviar resposta via WhatsApp
      if (routerData.showMenu) {
        try {
          await sendWhatsAppList(phone);
        } catch (_e) {
          await sendWhatsAppMessage(phone, routerData.response);
        }
      } else {
        let responseMessage = routerData.response;
        if (routerData.agentEmoji && routerData.agentName) {
          responseMessage = `${routerData.agentEmoji} *${routerData.agentName}*\n\n${responseMessage}`;
        }
        await sendWhatsAppMessage(phone, responseMessage);
      }

      // Salvar log
      try {
        await supabase.from('whatsapp_logs').insert({
          phone,
          user_id: userId,
          message_received: messageToProcess,
          message_sent: routerData.response,
          agent: routerData.currentAgent,
          created_at: new Date().toISOString()
        });
      } catch (_e) {
        console.log('Erro ao salvar log WhatsApp');
      }

      return new Response(
        JSON.stringify({ status: 'processed', agent: routerData.currentAgent }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({ status: 'acknowledged' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erro no webhook WhatsApp:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
