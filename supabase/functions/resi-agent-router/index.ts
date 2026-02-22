// ============================================================
// 🌿 RESINKRA - Resi Agent Router
// Roteador central dos agentes Resi — carrega configuração
// dinamicamente da tabela resi_agents_config (com fallback estático)
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

// Cache dos agentes do banco (TTL: 5 minutos)
let agentsDbCache: Record<string, { systemPrompt: string; keywords: string[]; name: string; emoji: string; description: string }> | null = null
let agentsCacheExpiry = 0

async function loadAgentsFromDb(supabase: ReturnType<typeof createClient>) {
  const now = Date.now()
  if (agentsDbCache && now < agentsCacheExpiry) return agentsDbCache

  try {
    const { data, error } = await supabase
      .from('resi_agents_config')
      .select('agent_key, system_prompt, keywords, name, emoji, description')
      .eq('is_active', true)

    if (error || !data?.length) return null

    const map: typeof agentsDbCache = {}
    for (const row of data) {
      if (row.agent_key) {
        map[row.agent_key] = {
          systemPrompt: row.system_prompt,
          keywords: row.keywords ?? [],
          name: row.name,
          emoji: row.emoji,
          description: row.description ?? '',
        }
      }
    }

    agentsDbCache = map
    agentsCacheExpiry = now + 5 * 60 * 1000 // 5 minutos
    return map
  } catch {
    return null
  }
}

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

    // Cliente com anon key + JWT do usuário (para perfil)
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    // Cliente service_role para ler resi_agents_config (bypassa RLS de admin)
    const supabaseService = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Validar usuário — getUser() usa o header Authorization do client
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser()
    if (authError || !user) {
      console.error('Auth error:', authError?.message, 'Header:', authHeader?.substring(0, 30))
      return new Response(JSON.stringify({ error: 'Token inválido' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    const userId = user.id

    const { user_id, agent_id, session_id, message } = await req.json()
    const resolvedUserId = userId // Always use authenticated user ID, ignore client-provided user_id

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Campo message é obrigatório' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Sanitize message: limit length and strip prompt injection patterns
    const sanitizedMessage = message
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
      .replace(/\[INSTRUÇÃO\]/gi, '')
      .replace(/\[SISTEMA\]/gi, '')
      .replace(/\[CONTEXTO\]/gi, '')
      .substring(0, 2000)

    const resolvedSessionId = session_id || crypto.randomUUID()
    const cacheKey = `${resolvedUserId}:${resolvedSessionId}`
    const trimmedMessage = sanitizedMessage.trim()

    // Carregar agentes do banco (com fallback ao config estático)
    const dbAgents = await loadAgentsFromDb(supabaseService)

    // Mesclar: DB sobrescreve prompts e keywords do config estático
    const mergedAgents = { ...RESI_AGENTS }
    if (dbAgents) {
      for (const [key, dbAgent] of Object.entries(dbAgents)) {
        if (mergedAgents[key as keyof typeof RESI_AGENTS]) {
          mergedAgents[key as keyof typeof RESI_AGENTS] = {
            ...mergedAgents[key as keyof typeof RESI_AGENTS],
            name: dbAgent.name,
            emoji: dbAgent.emoji,
            description: dbAgent.description,
            systemPrompt: dbAgent.systemPrompt,
            keywords: dbAgent.keywords.length > 0 ? dbAgent.keywords : mergedAgents[key as keyof typeof RESI_AGENTS].keywords,
          }
        }
      }
    }

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

        const agent = mergedAgents[selectedAgentKey]
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

      // Tentar detectar agente por palavra-chave (usa keywords mescladas)
      let detected: string | null = null
      const lowerMsg = trimmedMessage.toLowerCase()
      for (const [agentKey, agent] of Object.entries(mergedAgents)) {
        if (agent.keywords.some((kw) => lowerMsg.includes(kw.toLowerCase()))) {
          detected = agentKey
          break
        }
      }

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
    const agentKey = session.agent as keyof typeof mergedAgents
    const currentAgent = mergedAgents[agentKey]

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
    } catch {
      // Fallback: chat_interactions
      try {
        await supabaseService.from('chat_interactions').insert({
          user_id: resolvedUserId,
          agent: currentAgent.id ?? agentKey,
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
