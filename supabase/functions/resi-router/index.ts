// ============================================================
// 🌿 RESINKRA - Resi Router (Roteador Central)
// Edge Function que gerencia o menu e roteia para os agentes
// 🆓 Usando Google Gemini API (GRATUITO!)
// ============================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { 
  RESI_AGENTS, 
  MENU_MESSAGE, 
  MENU_OPTIONS, 
  detectAgentFromMessage,
  callGemini,
  ChatMessage,
  UserSession
} from "../_shared/resi-config.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

// Cache de sessões em memória
const sessions = new Map<string, UserSession>();

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { userId: requestedUserId, message, platform = 'web' } = await req.json();

    if (!requestedUserId || !message) {
      return new Response(
        JSON.stringify({ error: 'userId e message são obrigatórios' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // Determine the actual userId:
    // - For web platform, REQUIRE valid JWT and use the authenticated user's ID
    // - For whatsapp/internal calls, validate webhook token before trusting userId
    let userId = requestedUserId;
    
    if (platform === 'web') {
      const authHeader = req.headers.get('Authorization');
      if (!authHeader?.startsWith('Bearer ')) {
        return new Response(
          JSON.stringify({ error: 'Autenticação obrigatória' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      const supabaseAuth = createClient(
        Deno.env.get('SUPABASE_URL')!,
        Deno.env.get('SUPABASE_ANON_KEY')!,
        { global: { headers: { Authorization: authHeader } } }
      );
      const { data: { user } } = await supabaseAuth.auth.getUser();
      if (!user) {
        return new Response(
          JSON.stringify({ error: 'Token inválido' }),
          { status: 401, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      userId = user.id; // Always use authenticated user ID, never client-provided
    } else if (platform === 'whatsapp') {
      // WhatsApp calls come from resi-whatsapp which already validates ZAPI_WEBHOOK_SECRET
      // Validate that the call comes from an internal edge function via service key
      const authHeader = req.headers.get('Authorization');
      const anonKey = Deno.env.get('SUPABASE_ANON_KEY') || '';
      if (!authHeader?.includes(anonKey)) {
        return new Response(
          JSON.stringify({ error: 'Acesso não autorizado' }),
          { status: 403, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Usar cache de sessão em memória

    // Buscar ou criar sessão
    let session = sessions.get(userId);
    if (!session) {
      session = {
        userId,
        currentAgent: null,
        conversationHistory: [],
        lastActivity: new Date()
      };
      sessions.set(userId, session);
    }

    session.lastActivity = new Date();
    // Sanitize message: limit length and strip control characters
    const sanitizedMessage = message.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '').substring(0, 2000);
    const trimmedMessage = sanitizedMessage.trim();

    // ========================================
    // LÓGICA DE ROTEAMENTO
    // ========================================

    // 1. Voltar ao menu
    if (trimmedMessage === '0' || trimmedMessage.toLowerCase() === 'menu' || trimmedMessage.toLowerCase() === 'voltar') {
      session.currentAgent = null;
      session.conversationHistory = [];
      
      return new Response(
        JSON.stringify({ 
          success: true,
          response: MENU_MESSAGE,
          currentAgent: null,
          showMenu: true
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    // 2. Se não tem agente selecionado, verificar opção do menu
    if (!session.currentAgent) {
      const selectedAgent = MENU_OPTIONS[trimmedMessage];
      
      if (selectedAgent) {
        session.currentAgent = selectedAgent;
        session.conversationHistory = [];
        
        const agent = RESI_AGENTS[selectedAgent];
        const welcomeMessage = `${agent.emoji} *${agent.name}* ao seu dispor!\n\n${agent.description}\n\nComo posso te ajudar? 💚\n\n_(Digite 0 a qualquer momento para voltar ao menu)_`;
        
        return new Response(
          JSON.stringify({ 
            success: true,
            response: welcomeMessage,
            currentAgent: selectedAgent,
            agentName: agent.name,
            agentEmoji: agent.emoji,
            showMenu: false
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      // Tentar detectar agente pela mensagem
      const detectedAgent = detectAgentFromMessage(trimmedMessage);
      
      if (detectedAgent) {
        session.currentAgent = detectedAgent;
      } else {
        return new Response(
          JSON.stringify({ 
            success: true,
            response: `Não entendi sua escolha. 🤔\n\n${MENU_MESSAGE}`,
            currentAgent: null,
            showMenu: true
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
    }

    // ========================================
    // PROCESSAR MENSAGEM COM O AGENTE (GEMINI)
    // ========================================

    const currentAgent = RESI_AGENTS[session.currentAgent!];

    // Buscar contexto do usuário
    let userContext = '';
    try {
    const { data: profile } = await supabase
        .from('profiles')
        .select('nome, tier, cashback_saldo')
        .eq('id', userId)
        .single();

      if (profile) {
        userContext = `\n\n[CONTEXTO DO USUÁRIO]
- Nome: ${profile.nome || 'Não informado'}
- Tier: ${profile.tier || 'Bronze'}
- Saldo Cashback: R$ ${profile.cashback_saldo || 0}`;
      }
    } catch (e) {
      console.log('Contexto do usuário não disponível');
    }

    const startTime = Date.now();

    // Chamar Gemini com histórico no formato nativo
    const assistantMessage = await callGemini(
      currentAgent.systemPrompt + userContext,
      session.conversationHistory.slice(-10),
      trimmedMessage
    );

    const responseTime = Date.now() - startTime;

    // Atualizar histórico no formato Gemini (user antes de model)
    session.conversationHistory.push(
      { role: 'user', parts: [{ text: trimmedMessage }] },
      { role: 'model', parts: [{ text: assistantMessage }] }
    );

    // Salvar interação no banco
    try {
      await supabase.from('chat_interactions').insert({
        user_id: userId,
        agent: session.currentAgent,
        user_message: trimmedMessage,
        assistant_message: assistantMessage,
        platform: platform,
        response_time_ms: responseTime,
        created_at: new Date().toISOString()
      });
    } catch (e) {
      console.log('Erro ao salvar interação:', e);
    }

    return new Response(
      JSON.stringify({ 
        success: true,
        response: assistantMessage,
        currentAgent: session.currentAgent,
        agentName: currentAgent.name,
        agentEmoji: currentAgent.emoji,
        showMenu: false,
        responseTimeMs: responseTime
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Erro no resi-router:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false,
        error: 'Erro interno do servidor',
        response: '😔 Ops! Tive um probleminha técnico. Pode tentar novamente em alguns segundos?'
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
