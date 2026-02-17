import { handleCors } from "../_shared/cors.ts";
import { createServiceClient, createUserClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse, streamResponse } from "../_shared/response.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const LOVABLE_AI_URL = "https://ai.gateway.lovable.dev/v1/chat/completions";

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

## Regras:
- Seja breve (máx 4 linhas por resposta)
- Nunca invente serviços ou preços não listados acima
- Se o cliente quiser agendar, use a ferramenta agendar_sessao
- Horário de funcionamento: Seg-Sex 9h-18h, Sáb 9h-13h
- Se não souber algo: "Vou verificar com nosso time e retorno em breve!"`;
}

const aiTools = [
  {
    type: "function",
    function: {
      name: "agendar_sessao",
      description: "Agenda uma sessão de terapia para o cliente logado.",
      parameters: {
        type: "object",
        properties: {
          servico: { type: "string", description: "Nome exato do serviço" },
          data_hora: { type: "string", description: "Data e hora no formato ISO 8601" },
          terapeuta_nome: { type: "string", description: "Nome do terapeuta preferido (opcional)" },
        },
        required: ["servico", "data_hora"],
        additionalProperties: false,
      },
    },
  },
];

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return errorResponse("Não autorizado", 401);
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY não configurada");

    // Validate user
    const supabaseUser = createUserClient(authHeader);
    const { data: authData, error: authError } = await supabaseUser.auth.getUser();
    if (authError || !authData?.user) {
      return errorResponse("Não autorizado", 401);
    }

    const userId = authData.user.id;
    const supabase = createServiceClient();

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return errorResponse("Mensagens são obrigatórias", 400);
    }

    // Fetch business context
    const [servicosRes, terapeutasRes, agendamentosRes] = await Promise.all([
      supabase.from("servicos").select("nome, preco, descricao, duracao_minutos, cashback_percentual, categoria").eq("ativo", true),
      supabase.rpc("get_terapeutas_publicos"),
      supabase
        .from("agendamentos")
        .select("servico, data_hora, terapeuta_id")
        .gte("data_hora", new Date().toISOString())
        .in("status", ["confirmado", "agendado"]),
    ]);

    const servicosText = (servicosRes.data || [])
      .map((s: any) => `- ${s.nome}: R$ ${s.preco.toFixed(2)} (${s.duracao_minutos || 60}min, ${s.cashback_percentual || 0}% cashback) — ${s.descricao || ""}`)
      .join("\n");

    const terapeutasText = (terapeutasRes.data || [])
      .map((t: any) => `- ${t.nome} (${t.especialidade})`)
      .join("\n");

    const horariosText = (agendamentosRes.data || [])
      .map((a: any) => `- ${a.servico} em ${a.data_hora}`)
      .join("\n");

    const systemPrompt = buildSystemPrompt(servicosText, terapeutasText, horariosText);

    const aiMessages = [
      { role: "system", content: systemPrompt },
      ...messages.slice(-20).map((m: any) => ({ role: m.role, content: m.content })),
    ];

    // Non-streaming call to check for tool calls
    const aiResponseNonStream = await fetch(LOVABLE_AI_URL, {
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

    if (!aiResponseNonStream.ok) {
      if (aiResponseNonStream.status === 429) return errorResponse("Limite de requisições excedido.", 429);
      if (aiResponseNonStream.status === 402) return errorResponse("Créditos de IA insuficientes.", 402);
      throw new Error(`AI retornou ${aiResponseNonStream.status}`);
    }

    const aiResult = await aiResponseNonStream.json();
    const choice = aiResult.choices?.[0];

    // Handle tool calls
    if (choice?.message?.tool_calls?.length > 0) {
      const toolResults: string[] = [];

      for (const tc of choice.message.tool_calls) {
        const fn = tc.function;
        const args = JSON.parse(fn.arguments);

        if (fn.name === "agendar_sessao") {
          const result = await processarAgendamento(supabase, args, userId);
          toolResults.push(result);
        }
      }

      // Follow-up call with tool results (streaming)
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
          stream: true,
        }),
      });

      if (followUpResponse.ok) {
        return streamResponse(followUpResponse.body);
      }

      return jsonResponse({ content: "Agendamento processado! ✅" });
    }

    // No tool calls — stream directly
    const streamRes = await fetch(LOVABLE_AI_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: aiMessages,
        stream: true,
      }),
    });

    if (!streamRes.ok) {
      throw new Error(`AI stream retornou ${streamRes.status}`);
    }

    return streamResponse(streamRes.body);
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Chat error:", msg);
    if (error instanceof Response) return error;
    return errorResponse(msg, 500);
  }
});

async function processarAgendamento(
  supabase: any,
  args: { servico: string; data_hora: string; terapeuta_nome?: string },
  userId: string
): Promise<string> {
  try {
    const { servico, data_hora, terapeuta_nome } = args;

    const { data: servicoData } = await supabase
      .from("servicos")
      .select("nome, preco")
      .ilike("nome", `%${servico}%`)
      .eq("ativo", true)
      .limit(1)
      .single();

    if (!servicoData) return `Serviço "${servico}" não encontrado.`;

    let terapeutaId: string | null = null;
    if (terapeuta_nome) {
      const { data: terapeuta } = await supabase
        .from("terapeutas")
        .select("id")
        .ilike("nome", `%${terapeuta_nome}%`)
        .eq("disponivel", true)
        .limit(1)
        .single();
      terapeutaId = terapeuta?.id || null;
    }

    const dataHora = new Date(data_hora);
    const inicio = new Date(dataHora.getTime() - 30 * 60000).toISOString();
    const fim = new Date(dataHora.getTime() + 30 * 60000).toISOString();

    const conflictQuery = supabase
      .from("agendamentos")
      .select("id")
      .gte("data_hora", inicio)
      .lte("data_hora", fim)
      .in("status", ["confirmado", "agendado"]);

    if (terapeutaId) conflictQuery.eq("terapeuta_id", terapeutaId);

    const { data: conflitos } = await conflictQuery;

    if (conflitos && conflitos.length > 0) {
      return `Horário indisponível. Sugira outro horário.`;
    }

    const { data: agendamento, error } = await supabase
      .from("agendamentos")
      .insert({
        user_id: userId,
        servico: servicoData.nome,
        data_hora,
        terapeuta_id: terapeutaId,
        status: "agendado",
        observacoes: "Agendado via chat do app",
      })
      .select("id")
      .single();

    if (error) return `Erro ao agendar: ${error.message}`;

    return `Agendamento criado! ID: ${agendamento.id}. Serviço: ${servicoData.nome}, Horário: ${dataHora.toLocaleString("pt-BR", { timeZone: "America/Sao_Paulo" })}.`;
  } catch (err: unknown) {
    const msg = err instanceof Error ? err.message : "Erro desconhecido";
    return `Erro: ${msg}`;
  }
}
