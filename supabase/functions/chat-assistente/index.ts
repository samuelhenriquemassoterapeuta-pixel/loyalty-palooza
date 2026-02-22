import { handleCors } from "../_shared/cors.ts";
import { createServiceClient, createUserClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse, streamResponse } from "../_shared/response.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const GEMINI_API_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

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

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY não configurada");

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

    // Build Gemini conversation contents
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const conversationHistory = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    // Check if the message requires scheduling (keyword detection)
    const needsScheduling = /agendar|marcar|horário|sessão|disponibilidade/i.test(lastUserMessage);

    if (needsScheduling) {
      // Try to extract scheduling details and process
      const scheduleCheckPrompt = `${systemPrompt}\n\nO cliente diz: "${lastUserMessage}"\n\nSe o cliente quer agendar, extraia: serviço desejado, data/horário preferido e terapeuta (se mencionado). Responda em JSON: {"wants_scheduling": true/false, "servico": "...", "data_hora_sugerida": "...", "terapeuta": "..."} ou apenas confirme em texto se não for possível extrair.`;

      const checkRes = await fetch(GEMINI_API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY },
        body: JSON.stringify({
          contents: [{ role: "user", parts: [{ text: scheduleCheckPrompt }] }],
          generationConfig: { temperature: 0.1, maxOutputTokens: 300 },
        }),
      });

      if (checkRes.ok) {
        const checkData = await checkRes.json();
        const checkText = checkData.candidates?.[0]?.content?.parts?.[0]?.text || "";
        try {
          const jsonMatch = checkText.match(/\{[\s\S]*\}/);
          if (jsonMatch) {
            const parsed = JSON.parse(jsonMatch[0]);
            if (parsed.wants_scheduling && parsed.servico && parsed.data_hora_sugerida) {
              const agendResult = await processarAgendamento(supabase, {
                servico: parsed.servico,
                data_hora: parsed.data_hora_sugerida,
                terapeuta_nome: parsed.terapeuta,
              }, userId);
              const finalResponse = await callGeminiDirect(GEMINI_API_KEY, systemPrompt, conversationHistory, `${lastUserMessage}\n\n[RESULTADO DO AGENDAMENTO: ${agendResult}]`);
              return jsonResponse({ content: finalResponse });
            }
          }
        } catch { /* Proceed with normal response */ }
      }
    }

    // Normal Gemini response
    const reply = await callGeminiDirect(GEMINI_API_KEY, systemPrompt, conversationHistory, lastUserMessage);
    return jsonResponse({ content: reply });

  } catch (error: unknown) {
    console.error("Chat error:", error instanceof Error ? error.message : "Erro desconhecido");
    if (error instanceof Response) return error;
    return errorResponse("Erro interno do servidor", 500);
  }
});

async function callGeminiDirect(
  apiKey: string,
  systemPrompt: string,
  history: any[],
  userMessage: string
): Promise<string> {
  const contents = [
    { role: "user", parts: [{ text: `INSTRUÇÕES DO SISTEMA:\n\n${systemPrompt}` }] },
    { role: "model", parts: [{ text: "Entendido! Estou pronto para ajudar. 🌿" }] },
    ...history,
    { role: "user", parts: [{ text: userMessage }] },
  ];

  const res = await fetch(GEMINI_API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
    body: JSON.stringify({
      contents,
      generationConfig: { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 800 },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      ],
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    console.error("Gemini error:", res.status, errText);
    throw new Error(`Gemini retornou ${res.status}`);
  }

  const data = await res.json();
  return data.candidates?.[0]?.content?.parts?.[0]?.text || "Desculpe, não consegui processar sua mensagem. Tente novamente!";
}

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
