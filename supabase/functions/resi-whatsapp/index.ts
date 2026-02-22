// ============================================================
// 🌿 RESINKRA - Resi WhatsApp Webhook
// Edge Function para integração com WhatsApp via Z-API
// ============================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { MENU_MESSAGE } from "../_shared/resi-config.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Função para enviar mensagem via Z-API
async function sendWhatsAppMessage(phone: string, message: string) {
  const ZAPI_INSTANCE_ID = Deno.env.get('ZAPI_INSTANCE_ID')!;
  const ZAPI_TOKEN = Deno.env.get('ZAPI_TOKEN')!;
  const ZAPI_CLIENT_TOKEN = Deno.env.get('ZAPI_CLIENT_TOKEN') || '';
  const baseUrl = `https://api.z-api.io/instances/${ZAPI_INSTANCE_ID}/token/${ZAPI_TOKEN}`;

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (ZAPI_CLIENT_TOKEN) headers['Client-Token'] = ZAPI_CLIENT_TOKEN;

  const response = await fetch(`${baseUrl}/send-text`, {
    method: 'POST',
    headers,
    body: JSON.stringify({ phone, message })
  });

  return response.json();
}

// Função para enviar lista de botões
async function sendWhatsAppList(phone: string) {
  const ZAPI_INSTANCE_ID = Deno.env.get('ZAPI_INSTANCE_ID')!;
  const ZAPI_TOKEN = Deno.env.get('ZAPI_TOKEN')!;
  const ZAPI_CLIENT_TOKEN = Deno.env.get('ZAPI_CLIENT_TOKEN') || '';
  const baseUrl = `https://api.z-api.io/instances/${ZAPI_INSTANCE_ID}/token/${ZAPI_TOKEN}`;

  const headers: Record<string, string> = { 'Content-Type': 'application/json' };
  if (ZAPI_CLIENT_TOKEN) headers['Client-Token'] = ZAPI_CLIENT_TOKEN;

  const response = await fetch(`${baseUrl}/send-button-list`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      phone,
      message: "🌿 Olá! Sou a Resi, sua assistente da Resinkra!",
      buttonList: {
        title: "Como posso ajudar?",
        buttons: [
          { id: "1", title: "💬 Dúvidas Gerais" },
          { id: "2", title: "📅 Agendamentos" },
          { id: "3", title: "🎬 Criar Conteúdo" },
          { id: "4", title: "🛒 Produtos/Pacotes" },
          { id: "5", title: "🧘 Bem-estar" }
        ]
      }
    })
  });

  return response.json();
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Webhook authentication: validate Z-API webhook token
    const ZAPI_WEBHOOK_SECRET = Deno.env.get('ZAPI_WEBHOOK_SECRET');
    if (!ZAPI_WEBHOOK_SECRET) {
      console.error('ZAPI_WEBHOOK_SECRET not configured — rejecting request for security');
      return new Response(JSON.stringify({ error: 'Webhook authentication not configured' }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }
    const providedToken = req.headers.get('x-webhook-token') || new URL(req.url).searchParams.get('token');
    if (providedToken !== ZAPI_WEBHOOK_SECRET) {
      console.warn('Webhook auth failed: invalid token');
      return new Response(JSON.stringify({ error: 'Unauthorized' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      });
    }

    const payload = await req.json();
    console.log('WhatsApp Webhook recebido');

    if (!payload.isFromMe && payload.type === 'ReceivedCallback') {
      const phone = (payload.phone || '').replace(/\D/g, '');
      const message = (payload.text?.message || payload.listResponseMessage?.title || '').substring(0, 2000).trim();
      const buttonId = payload.listResponseMessage?.selectedButtonId || null;

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
      const sanitizedMessage = (buttonId || message).replace(/\[INSTRUÇÃO\]/gi, '').replace(/\[SISTEMA\]/gi, '').replace(/\[CONTEXTO\]/gi, '').trim();
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
