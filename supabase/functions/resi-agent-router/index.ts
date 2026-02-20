// ============================================================
// 🌿 RESINKRA - Resi Agent Router
// Substitui o resi-router — roteador central dos agentes Resi
// Usa Gemini via configuração compartilhada
// ============================================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import {
  RESI_AGENTS,
  MENU_MESSAGE,
  MENU_OPTIONS,
  detectAgentFromMessage,
  callGemini,
  ChatMessage,
} from '../_shared/resi-config.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Cache de histórico em memória por sessão
const sessionCache = new Map<string, { history: ChatMessage[]; agent: string | null }>()

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const authHeader = req.headers.get('Authorization')
    if (!authHeader?.startsWith('Bearer ')) {
      return new Response(JSON.stringify({ error: 'Não autorizado' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    // Validar usuário
    const token = authHeader.replace('Bearer ', '')
    const { data: authData, error: authError } = await supabaseClient.auth.getClaims(token)
    if (authError || !authData?.claims) {
      return new Response(JSON.stringify({ error: 'Token inválido' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    const userId = authData.claims.sub

    const { user_id, agent_id, session_id, message } = await req.json()

    // Garantir user_id — usa o do token se não enviado
    const resolvedUserId = user_id || userId

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Campo message é obrigatório' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Gerar session_id se não fornecido
    const resolvedSessionId = session_id || crypto.randomUUID()
    const cacheKey = `${resolvedUserId}:${resolvedSessionId}`
    const trimmedMessage = message.trim()

    // ========================================
    // ROTEAMENTO: voltar ao menu
    // ========================================
    if (
      trimmedMessage === '0' ||
      trimmedMessage.toLowerCase() === 'menu' ||
      trimmedMessage.toLowerCase() === 'voltar'
    ) {
      sessionCache.delete(cacheKey)
      return new Response(
        JSON.stringify({
          success: true,
          response: MENU_MESSAGE,
          current_agent: null,
          session_id: resolvedSessionId,
          show_menu: true,
        }),
        { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      )
    }

    // Recuperar sessão do cache
    let session = sessionCache.get(cacheKey) || { history: [], agent: agent_id || null }

    // ========================================
    // ROTEAMENTO: selecionar agente pelo menu
    // ========================================
    if (!session.agent) {
      const selectedAgentKey = MENU_OPTIONS[trimmedMessage]
      if (selectedAgentKey) {
        session = { history: [], agent: selectedAgentKey }
        sessionCache.set(cacheKey, session)

        const agent = RESI_AGENTS[selectedAgentKey]
        const welcomeMsg = `${agent.emoji} *${agent.name}* ao seu dispor!\n\n${agent.description}\n\nComo posso te ajudar? 💚\n\n_(Digite 0 a qualquer momento para voltar ao menu)_`

        return new Response(
          JSON.stringify({
            success: true,
            response: welcomeMsg,
            current_agent: selectedAgentKey,
            agent_name: agent.name,
            agent_emoji: agent.emoji,
            session_id: resolvedSessionId,
            show_menu: false,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }

      // Tentar detectar agente por palavra-chave
      const detected = detectAgentFromMessage(trimmedMessage)
      if (detected) {
        session.agent = detected
        sessionCache.set(cacheKey, session)
      } else {
        return new Response(
          JSON.stringify({
            success: true,
            response: `Não entendi sua escolha. 🤔\n\n${MENU_MESSAGE}`,
            current_agent: null,
            session_id: resolvedSessionId,
            show_menu: true,
          }),
          { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        )
      }
    }

    // ========================================
    // PROCESSAR COM O AGENTE (GEMINI)
    // ========================================
    const agentKey = session.agent as keyof typeof RESI_AGENTS
    const currentAgent = RESI_AGENTS[agentKey]

    // Buscar contexto do usuário
    let userContext = ''
    try {
      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('nome, tier, cashback_saldo')
        .eq('id', resolvedUserId)
        .single()

      if (profile) {
        userContext = `\n\n[CONTEXTO DO USUÁRIO]\n- Nome: ${profile.nome || 'Não informado'}\n- Tier: ${profile.tier || 'Bronze'}\n- Saldo Cashback: R$ ${profile.cashback_saldo || 0}`
      }
    } catch {
      console.log('Contexto do usuário não disponível')
    }

    const startTime = Date.now()

    const assistantMessage = await callGemini(
      currentAgent.systemPrompt + userContext,
      session.history.slice(-10),
      trimmedMessage
    )

    const responseTimeMs = Date.now() - startTime

    // Atualizar histórico em cache
    session.history.push(
      { role: 'user', parts: [{ text: trimmedMessage }] },
      { role: 'model', parts: [{ text: assistantMessage }] }
    )
    sessionCache.set(cacheKey, session)

    // Salvar conversa no banco
    try {
      await supabaseClient.from('resi_conversations').insert([
        {
          user_id: resolvedUserId,
          agent_id: currentAgent.id,
          session_id: resolvedSessionId,
          role: 'user',
          content: trimmedMessage,
        },
        {
          user_id: resolvedUserId,
          agent_id: currentAgent.id,
          session_id: resolvedSessionId,
          role: 'assistant',
          content: assistantMessage,
        },
      ])
    } catch (e) {
      // Fallback: salvar em chat_interactions se resi_conversations não existir
      try {
        await supabaseClient.from('chat_interactions').insert({
          user_id: resolvedUserId,
          agent: currentAgent.id,
          user_message: trimmedMessage,
          assistant_message: assistantMessage,
          platform: 'web',
          response_time_ms: responseTimeMs,
        })
      } catch {
        console.log('Erro ao salvar interação')
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        response: assistantMessage,
        current_agent: agentKey,
        agent_id: currentAgent.id,
        agent_name: currentAgent.name,
        agent_emoji: currentAgent.emoji,
        session_id: resolvedSessionId,
        show_menu: false,
        response_time_ms: responseTimeMs,
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Erro no resi-agent-router:', error)
    return new Response(
      JSON.stringify({
        success: false,
        error: 'Erro interno do servidor',
        response: '😔 Ops! Tive um probleminha técnico. Pode tentar novamente em alguns segundos?',
      }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})
