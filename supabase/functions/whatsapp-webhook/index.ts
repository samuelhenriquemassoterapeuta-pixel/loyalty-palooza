/**
 * @module edge-functions/whatsapp-webhook
 * @description Webhook para receber mensagens e eventos do WhatsApp (via Z-API).
 *
 * Funciona como o "cérebro" do chatbot da Resinkra.
 *
 * Capacidades:
 * 1. Recebe mensagens de texto dos usuários
 * 2. Mantém histórico de conversas (`whatsapp_conversas`)
 * 3. Integra com Lovable AI (Gemini) para responder dúvidas
 * 4. Realiza agendamento automático via Tool Calling da IA
 * 5. Gerencia transbordo para atendimento humano
 *
 * Fluxo:
 * Recebe Msg -> Busca Contexto (Serviços/Horários) -> Envia p/ IA -> Processa Resposta/Tools -> Envia Resposta
 *
 * @see enviar-whatsapp — Usado para enviar a resposta final
 */

import { handleCors, corsHeaders } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

const LOVABLE_AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";
const MAX_HISTORY = 20; // Limite de mensagens mantidas no contexto para a IA

// ── System prompt do assistente ──
// Define a personalidade e conhecimento base do bot
function buildSystemPrompt(servicos: string, terapeutas: string, horariosOcupados: string) {
  return `Você é o Assistente Virtual da Resinkra, especializado em bem-estar, massoterapia e terapias holísticas em Uberaba/MG. Seu tom é amigável, profissional e proativo, como um consultor de bem-estar confiável. Responda em português brasileiro com emojis moderados (😊👍🌿).

## Sobre a Resinkra
- Clínica de massoterapia, Head SPA coreano, aromaterapia e bem-estar holístico
- Localizada em Uberaba/MG
- Oferece cashback em todas as sessões

## Serviços disponíveis (com preços):
${servicos}

## Terapeutas disponíveis:
${terapeutas}

## Horários já ocupados (NÃO ofereça estes):
${horariosOcupados}

## Fluxo de conversa (siga esta ordem):
1. Saudação: "Olá! Bem-vindo(a) à Resinkra 🌿 Como posso ajudar hoje? 😊"
2. Entenda a necessidade (máx 2 perguntas)
3. Qualifique: Peça nome > necessidade específica
4. Ofereça solução real com preços do catálogo
5. Para agendar: use a ferramenta agendar_sessao
6. Encerramento: "Obrigado pelo contato! Qualquer dúvida, é só chamar 👋"

## Regras obrigatórias:
- Seja breve (máx 4 linhas por resposta)
- Nunca invente serviços ou preços não listados acima
- Para agendar, SEMPRE use a ferramenta agendar_sessao com os dados coletados
- Se não souber algo: "Vou verificar com nosso time e retorno em breve!"
- Horário de funcionamento: Seg-Sex 9h-18h, Sáb 9h-13h
- Se o cliente pedir algo fora do escopo (reclamação grave, dúvida médica), diga que vai encaminhar para um atendente humano`;
}

// ── Tools para a IA ──
// Definição das ações que a IA pode executar
const aiTools = [
  {
    type: "function",
    function: {
      name: "agendar_sessao",
      description: "Agenda uma sessão de terapia para o cliente. Use quando o cliente confirmar que quer agendar.",
      parameters: {
        type: "object",
        properties: {
          servico: { type: "string", description: "Nome exato do serviço (ex: Massagem Relaxante)" },
          data_hora: { type: "string", description: "Data e hora no formato ISO 8601 (ex: 2026-02-20T14:00:00)" },
          terapeuta_nome: { type: "string", description: "Nome do terapeuta preferido (opcional)" },
          nome_cliente: { type: "string", description: "Nome do cliente" },
        },
        required: ["servico", "data_hora", "nome_cliente"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "transferir_humano",
      description: "Transfere o atendimento para um atendente humano. Use para reclamações graves ou vendas complexas.",
      parameters: {
        type: "object",
        properties: {
          motivo: { type: "string", description: "Motivo da transferência" },
        },
        required: ["motivo"],
        additionalProperties: false,
      },
    },
  },
];

Deno.serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    const ZAPI_INSTANCE_ID = Deno.env.get("ZAPI_INSTANCE_ID");
    const ZAPI_TOKEN = Deno.env.get("ZAPI_TOKEN");

    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY não configurada");
    if (!ZAPI_INSTANCE_ID || !ZAPI_TOKEN) throw new Error("Credenciais Z-API não configuradas");

    // Webhook authentication: validate Z-API webhook token
    const ZAPI_WEBHOOK_SECRET = Deno.env.get('ZAPI_WEBHOOK_SECRET');
    if (ZAPI_WEBHOOK_SECRET) {
      const providedToken = req.headers.get('x-webhook-token') || new URL(req.url).searchParams.get('token');
      if (providedToken !== ZAPI_WEBHOOK_SECRET) {
        console.warn('Webhook auth failed: invalid token');
        return errorResponse('Unauthorized', 401);
      }
    }

    const supabase = createServiceClient();
    const body = await req.json();

    // Ignora mensagens enviadas por mim ou atualizações de status
    if (body.fromMe || body.status || !body.text?.message) {
      return jsonResponse({ ok: true, skipped: true });
    }

    // Input validation: sanitize phone and message
    const phone = (body.phone || body.chatId?.replace("@c.us", "") || "").replace(/\D/g, '');
    const userMessage = (body.text.message || "").substring(0, 2000).trim();
    const senderName = (body.senderName || body.chatName || "").substring(0, 100).trim();

    if (!phone || !/^\d{10,15}$/.test(phone) || !userMessage) {
      return jsonResponse({ ok: true, skipped: true, reason: 'invalid_input' });
    }

    console.log(`📩 Mensagem de ${phone.substring(0, 4)}****: ${userMessage.substring(0, 50)}`);

    // ── 1. Buscar ou criar conversa ──
    let { data: conversa } = await supabase
      .from("whatsapp_conversas")
      .select("*")
      .eq("telefone", phone)
      .single();

    if (!conversa) {
      const { data: nova } = await supabase
        .from("whatsapp_conversas")
        .insert({ telefone: phone, nome: senderName || null, mensagens: [] })
        .select()
        .single();
      conversa = nova;
    }

    // ── 2. Atualizar histórico ──
    const mensagens = Array.isArray(conversa.mensagens) ? conversa.mensagens : [];
    mensagens.push({ role: "user", content: userMessage, ts: new Date().toISOString() });
    const recentMessages = mensagens.slice(-MAX_HISTORY);

    // ── 3. Buscar contexto de negócio (Catálogo em tempo real) ──
    const [servicosRes, terapeutasRes, agendamentosRes] = await Promise.all([
      supabase.from("servicos").select("nome, preco, descricao, duracao_minutos, cashback_percentual, categoria").eq("ativo", true),
      supabase.rpc("get_terapeutas_publicos"),
      supabase
        .from("agendamentos")
        .select("servico, data_hora, terapeuta_id")
        .gte("data_hora", new Date().toISOString())
        .in("status", ["confirmado", "agendado"]),
    ]);

    // Formata o contexto para o prompt
    const servicosText = (servicosRes.data || [])
      .map((s: any) => `- ${s.nome}: R$ ${s.preco.toFixed(2)} (${s.duracao_minutos || 60}min, ${s.cashback_percentual || 0}% cashback) — ${s.descricao || ""}`)
      .join("\n");
    const terapeutasText = (terapeutasRes.data || [])
      .map((t: any) => `- ${t.nome} (${t.especialidade})`)
      .join("\n");
    const horariosText = (agendamentosRes.data || [])
      .map((a: any) => `- ${a.servico} em ${a.data_hora}`)
      .join("\n");

    // ── 4. Chamar Lovable AI (Gemini) ──
    const systemPrompt = buildSystemPrompt(servicosText, terapeutasText, horariosText);
    const aiMessages = [
      { role: "system", content: systemPrompt },
      ...recentMessages.map((m: any) => ({ role: m.role, content: m.content })),
    ];

    const aiResponse = await fetch(LOVABLE_AI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: aiMessages,
        tools: aiTools,
        tool_choice: "auto",
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error(`AI gateway error [${aiResponse.status}]:`, errText);
      throw new Error(`AI gateway retornou ${aiResponse.status}`);
    }

    const aiResult = await aiResponse.json();
    const choice = aiResult.choices?.[0];

    let replyText = "";
    let toolResults: string[] = [];

    // ── 5. Processar Tool Calls (Agendamento Automático) ──
    if (choice?.message?.tool_calls?.length > 0) {
      for (const tc of choice.message.tool_calls) {
        const fn = tc.function;
        const args = JSON.parse(fn.arguments);

        if (fn.name === "agendar_sessao") {
          const result = await processarAgendamento(supabase, args, phone, conversa);
          toolResults.push(result);
        } else if (fn.name === "transferir_humano") {
          toolResults.push(`🔄 Atendimento transferido para humano. Motivo: ${args.motivo}`);
          await supabase
            .from("whatsapp_conversas")
            .update({ status: "transferido", metadata: { motivo_transferencia: args.motivo } })
            .eq("id", conversa.id);
        }
      }

      // Reenvia o resultado da tool para a IA gerar a resposta final
      const followUpMessages = [
        ...aiMessages,
        choice.message,
        ...choice.message.tool_calls.map((tc: any, i: number) => ({
          role: "tool",
          tool_call_id: tc.id,
          content: toolResults[i] || "OK",
        })),
      ];

      const followUpResponse = await fetch(LOVABLE_AI_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-flash",
          messages: followUpMessages,
        }),
      });

      if (followUpResponse.ok) {
        const followUpResult = await followUpResponse.json();
        replyText = followUpResult.choices?.[0]?.message?.content || "";
      }
    } else {
      replyText = choice?.message?.content || "Desculpe, não consegui processar sua mensagem. Tente novamente! 😊";
    }

    // ── 6. Salvar resposta no histórico ──
    recentMessages.push({ role: "assistant", content: replyText, ts: new Date().toISOString() });
    await supabase
      .from("whatsapp_conversas")
      .update({ mensagens: recentMessages, nome: senderName || conversa.nome })
      .eq("id", conversa.id);

    // ── 7. Enviar resposta via Z-API ──
    const zapiUrl = `https://api.z-api.io/instances/${ZAPI_INSTANCE_ID}/token/${ZAPI_TOKEN}/send-text`;
    const zapiResponse = await fetch(zapiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ phone, message: replyText }),
    });

    if (!zapiResponse.ok) {
      const zapiErr = await zapiResponse.text();
      console.error("Z-API send error:", zapiErr);
    }

    await supabase.from("whatsapp_logs").insert({
      telefone: phone,
      tipo: "assistente_ia",
      mensagem: replyText,
      status: zapiResponse.ok ? "enviado" : "erro",
    });

    console.log(`✅ Resposta enviada para ${phone}`);
    return jsonResponse({ ok: true, phone, replied: true });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro no webhook WhatsApp:", msg);
    return errorResponse("Erro interno ao processar webhook", 500);
  }
});

// ── Função auxiliar: processarAgendamento ──
// Lógica de agendamento: verifica conflitos, busca usuário, cria registro
async function processarAgendamento(
  supabase: any,
  args: { servico: string; data_hora: string; terapeuta_nome?: string; nome_cliente: string },
  phone: string,
  conversa: any
): Promise<string> {
  try {
    const { servico, data_hora, terapeuta_nome, nome_cliente } = args;

    // Busca serviço
    const { data: servicoData } = await supabase
      .from("servicos")
      .select("nome, preco")
      .ilike("nome", `%${servico}%`)
      .eq("ativo", true)
      .limit(1)
      .single();

    if (!servicoData) {
      return `Serviço "${servico}" não encontrado no catálogo.`;
    }

    // Busca terapeuta (opcional)
    let terapeutaId: string | null = null;
    if (terapeuta_nome) {
      const { data: terapeuta } = await supabase
        .from("terapeutas")
        .select("id, nome")
        .ilike("nome", `%${terapeuta_nome}%`)
        .eq("disponivel", true)
        .limit(1)
        .single();
      terapeutaId = terapeuta?.id || null;
    }

    // Valida conflito de horário
    const dataHora = new Date(data_hora);
    const inicio = new Date(dataHora.getTime() - 30 * 60000).toISOString();
    const fim = new Date(dataHora.getTime() + 30 * 60000).toISOString();

    const conflictQuery = supabase
      .from("agendamentos")
      .select("id")
      .gte("data_hora", inicio)
      .lte("data_hora", fim)
      .in("status", ["confirmado", "agendado"]);

    if (terapeutaId) {
      conflictQuery.eq("terapeuta_id", terapeutaId);
    }

    const { data: conflitos } = await conflictQuery;

    if (conflitos && conflitos.length > 0) {
      return `Horário ${dataHora.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })} indisponível. Sugira outro horário ao cliente.`;
    }

    // Identifica usuário pelo telefone
    const { data: profile } = await supabase
      .from("profiles")
      .select("id")
      .eq("telefone", phone)
      .limit(1)
      .single();

    // Se usuário não existe, marca como pendente no metadata da conversa
    if (!profile) {
      await supabase
        .from("whatsapp_conversas")
        .update({
          necessidade: `Agendar ${servicoData.nome} em ${dataHora.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}`,
          metadata: { agendamento_pendente: { servico: servicoData.nome, data_hora, terapeuta_id: terapeutaId, nome_cliente } },
        })
        .eq("id", conversa.id);

      return `Cliente "${nome_cliente}" não possui conta no app. Agendamento salvo como pendente para confirmação manual pela equipe. Serviço: ${servicoData.nome}, Horário: ${dataHora.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}.`;
    }

    // Cria agendamento real
    const { data: agendamento, error: agError } = await supabase
      .from("agendamentos")
      .insert({
        user_id: profile.id,
        servico: servicoData.nome,
        data_hora: data_hora,
        terapeuta_id: terapeutaId,
        status: "agendado",
        observacoes: `Agendado via WhatsApp por ${nome_cliente}`,
      })
      .select("id")
      .single();

    if (agError) {
      console.error("Erro ao criar agendamento:", agError);
      return `Erro ao criar agendamento: ${agError.message}`;
    }

    return `Agendamento criado com sucesso! ID: ${agendamento.id}. Serviço: ${servicoData.nome}, Horário: ${dataHora.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}. O cliente receberá notificação no app.`;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro desconhecido";
    console.error("Erro ao processar agendamento:", msg);
    return `Erro ao processar agendamento: ${msg}`;
  }
}
