// ============================================================
// 🌿 RESINKRA - Resi Agent Router
// Roteador central dos agentes Resi — sessões persistentes no banco
// ============================================================

import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'
import {
  RESI_AGENTS,
  MENU_MESSAGE,
  MENU_OPTIONS,
  callGemini,
  ChatMessage,
} from '../_shared/resi-config.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

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
    agentsCacheExpiry = now + 5 * 60 * 1000
    return map
  } catch {
    return null
  }
}

// Detecção de agente melhorada com keywords expandidas
const EXTENDED_KEYWORDS: Record<string, string[]> = {
  agenda: [
    'agendar', 'marcar', 'sessão', 'horário', 'terapeuta', 'remarcar', 'cancelar',
    'disponibilidade', 'check-in', 'massagem', 'drenagem', 'reflexologia',
    'head spa', 'shiatsu', 'ventosa', 'pedras quentes', 'aromaterapia',
    'dry needling', 'seitai', 'amanhã', 'hoje', 'semana que vem',
    'samuel', 'henrique', 'agenda', 'consulta', 'atendimento',
  ],
  core: [
    'dúvida', 'ajuda', 'cashback', 'tier', 'indicação', 'badge', 'conquista',
    'cromo', 'vale presente', 'cupom', 'plataforma', 'como funciona',
    'resink', 'xp', 'nível', 'ranking', 'gamificação',
  ],
  creator: [
    'roteiro', 'reels', 'tiktok', 'instagram', 'stories', 'hook', 'viral',
    'conteúdo', 'ideia', 'post', 'vídeo', 'rede social', 'criar conteúdo',
  ],
  loja: [
    'produto', 'comprar', 'óleo', 'pacote', 'preço', 'promoção', 'desconto',
    'carrinho', 'pagar', 'pix', 'boleto', 'loja', 'catálogo',
  ],
  wellness: [
    'alongamento', 'estresse', 'sono', 'relaxar', 'respiração', 'postura',
    'bem-estar', 'saúde', 'dica', 'exercício', 'ansiedade', 'meditação',
    'mindfulness', 'autocuidado',
  ],
}

function detectAgent(message: string, mergedAgents: typeof RESI_AGENTS): string | null {
  const lower = message.toLowerCase()

  // 1. Tentar com keywords do banco (mergedAgents)
  for (const [agentKey, agent] of Object.entries(mergedAgents)) {
    if (agent.keywords.some((kw: string) => lower.includes(kw.toLowerCase()))) {
      return agentKey
    }
  }

  // 2. Tentar com keywords estendidas
  for (const [agentKey, keywords] of Object.entries(EXTENDED_KEYWORDS)) {
    if (keywords.some(kw => lower.includes(kw))) {
      return agentKey
    }
  }

  return null
}

// ========================================
// Sessão persistente via chat_sessions
// ========================================
async function loadSession(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  sessionId: string
): Promise<{ agent: string | null; history: ChatMessage[] }> {
  try {
    const { data } = await supabase
      .from('chat_sessions')
      .select('current_agent, conversation_history')
      .eq('id', sessionId)
      .eq('user_id', userId)
      .single()

    if (data) {
      return {
        agent: data.current_agent || null,
        history: (data.conversation_history as ChatMessage[]) || [],
      }
    }
  } catch {
    // Session not found, create new
  }
  return { agent: null, history: [] }
}

async function saveSession(
  supabase: ReturnType<typeof createClient>,
  userId: string,
  sessionId: string,
  agent: string | null,
  history: ChatMessage[]
) {
  try {
    // Keep only last 20 messages to avoid bloat
    const trimmedHistory = history.slice(-20)

    await supabase
      .from('chat_sessions')
      .upsert(
        {
          id: sessionId,
          user_id: userId,
          current_agent: agent,
          conversation_history: trimmedHistory,
          platform: 'web',
          last_activity: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
        { onConflict: 'id' }
      )
  } catch (e) {
    console.error('Erro ao salvar sessão:', e)
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

    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
      { global: { headers: { Authorization: authHeader } } }
    )

    const supabaseService = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Validar usuário
    const { data: { user }, error: authError } = await supabaseClient.auth.getUser()
    if (authError || !user) {
      return new Response(JSON.stringify({ error: 'Token inválido' }), {
        status: 401,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    const userId = user.id

    const { session_id, message } = await req.json()

    if (!message || typeof message !== 'string') {
      return new Response(JSON.stringify({ error: 'Campo message é obrigatório' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Sanitize message
    const sanitizedMessage = message
      .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F]/g, '')
      .replace(/\[INSTRUÇÃO\]/gi, '')
      .replace(/\[SISTEMA\]/gi, '')
      .replace(/\[CONTEXTO\]/gi, '')
      .substring(0, 2000)

    const resolvedSessionId = session_id || crypto.randomUUID()
    const trimmedMessage = sanitizedMessage.trim()

    // Carregar agentes do banco
    const dbAgents = await loadAgentsFromDb(supabaseService)
    const mergedAgents = { ...RESI_AGENTS } as any
    if (dbAgents) {
      for (const [key, dbAgent] of Object.entries(dbAgents)) {
        if (mergedAgents[key]) {
          mergedAgents[key] = {
            ...mergedAgents[key],
            name: dbAgent.name,
            emoji: dbAgent.emoji,
            description: dbAgent.description,
            systemPrompt: dbAgent.systemPrompt,
            keywords: dbAgent.keywords.length > 0 ? dbAgent.keywords : mergedAgents[key].keywords,
          }
        }
      }
    }

    // ========================================
    // Carregar sessão PERSISTENTE do banco
    // ========================================
    let session = await loadSession(supabaseService, userId, resolvedSessionId)

    // ========================================
    // ROTEAMENTO: voltar ao menu
    // ========================================
    if (
      trimmedMessage === '0' ||
      trimmedMessage.toLowerCase() === 'menu' ||
      trimmedMessage.toLowerCase() === 'voltar'
    ) {
      await saveSession(supabaseService, userId, resolvedSessionId, null, [])
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

    // ========================================
    // ROTEAMENTO: selecionar agente pelo menu
    // ========================================
    if (!session.agent) {
      const selectedAgentKey = MENU_OPTIONS[trimmedMessage]
      if (selectedAgentKey) {
        session = { history: [], agent: selectedAgentKey }
        await saveSession(supabaseService, userId, resolvedSessionId, selectedAgentKey, [])

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

      // Tentar detectar agente por palavra-chave melhorada
      const detected = detectAgent(trimmedMessage, mergedAgents)

      if (detected) {
        session.agent = detected
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
    // PROCESSAR COM O AGENTE (IA)
    // ========================================
    const agentKey = session.agent as keyof typeof mergedAgents
    const currentAgent = mergedAgents[agentKey]

    // Buscar contexto do usuário
    let userContext = ''
    try {
      const { data: profile } = await supabaseClient
        .from('profiles')
        .select('nome, tier, cashback_saldo')
        .eq('id', userId)
        .single()

      if (profile) {
        userContext = `\n\n[CONTEXTO DO USUÁRIO]\n- Nome: ${profile.nome || 'Não informado'}\n- Tier: ${profile.tier || 'Bronze'}\n- Saldo Cashback: R$ ${profile.cashback_saldo || 0}`
      }
    } catch {
      // ignore
    }

    const startTime = Date.now()

    // Usar histórico PERSISTENTE do banco (últimas 10 mensagens)
    const assistantMessage = await callGemini(
      currentAgent.systemPrompt + userContext,
      session.history.slice(-10),
      trimmedMessage
    )

    const responseTimeMs = Date.now() - startTime

    // Atualizar histórico e salvar no banco
    session.history.push(
      { role: 'user', parts: [{ text: trimmedMessage }] },
      { role: 'model', parts: [{ text: assistantMessage }] }
    )
    await saveSession(supabaseService, userId, resolvedSessionId, session.agent, session.history)

    // Salvar interação
    try {
      await supabaseService.from('chat_interactions').insert({
        user_id: userId,
        agent: currentAgent.id ?? agentKey,
        user_message: trimmedMessage,
        assistant_message: assistantMessage,
        platform: 'web',
        response_time_ms: responseTimeMs,
      })
    } catch {
      // ignore
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
