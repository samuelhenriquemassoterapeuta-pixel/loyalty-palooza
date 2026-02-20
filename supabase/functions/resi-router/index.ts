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
    const { userId, message, platform = 'web' } = await req.json();

    if (!userId || !message) {
      return new Response(
        JSON.stringify({ error: 'userId e message são obrigatórios' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

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
    const trimmedMessage = message.trim();

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
        .select('nome')
        .eq('id', userId)
        .single();

      if (profile) {
        userContext = `\n\n[CONTEXTO DO USUÁRIO]\n- Nome: ${profile.nome || 'Não informado'}`;
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

    // Atualizar histórico no formato Gemini
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
        tokens_used: 0,
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
        showMenu: false
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
