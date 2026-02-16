import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

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
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseAnonKey = Deno.env.get("SUPABASE_ANON_KEY")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY não configurada");

    // Validate user
    const supabaseUser = createClient(supabaseUrl, supabaseAnonKey, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: authData, error: authError } = await supabaseUser.auth.getUser();
    if (authError || !authData?.user) {
      return new Response(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const userId = authData.user.id;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Mensagens são obrigatórias" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
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

    // First AI call
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
        stream: true,
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requisições excedido. Tente novamente em alguns minutos." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponse.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos de IA insuficientes." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errText = await aiResponse.text();
      console.error(`AI error [${aiResponse.status}]:`, errText);
      throw new Error(`AI retornou ${aiResponse.status}`);
    }

    // Check if we need to handle tool calls by reading the stream
    // For simplicity with tool calls, we'll do a non-streaming first call,
    // then stream the follow-up if there are tool calls
    // Re-do without streaming to check for tool calls
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
      if (aiResponseNonStream.status === 429) {
        return new Response(JSON.stringify({ error: "Limite de requisições excedido." }), {
          status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (aiResponseNonStream.status === 402) {
        return new Response(JSON.stringify({ error: "Créditos de IA insuficientes." }), {
          status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
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
        return new Response(followUpResponse.body, {
          headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
        });
      }

      // Fallback: return non-streamed
      return new Response(JSON.stringify({ content: "Agendamento processado! ✅" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // No tool calls — stream directly
    // Re-do as streaming call
    const streamResponse = await fetch(LOVABLE_AI_URL, {
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

    if (!streamResponse.ok) {
      throw new Error(`AI stream retornou ${streamResponse.status}`);
    }

    return new Response(streamResponse.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Chat error:", msg);
    return new Response(JSON.stringify({ error: msg }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
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
