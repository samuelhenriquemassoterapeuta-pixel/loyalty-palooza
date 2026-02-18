import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { requireAuth } from "../_shared/auth.ts";
import { errorResponse } from "../_shared/response.ts";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    const { userId } = await requireAuth(req);
    const supabase = createServiceClient();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) return errorResponse("Chave de IA não configurada", 500);

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) return errorResponse("Mensagens inválidas", 400);

    // Gather user context for personalized responses
    const [profileRes, fichaNutRes, agendamentosRes, streakRes, tierRes, anamneseRes] = await Promise.all([
      supabase.from("profiles").select("nome, telefone, created_at").eq("id", userId).single(),
      supabase.from("ficha_nutricional").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("agendamentos").select("servico, data_hora, status").eq("user_id", userId).order("data_hora", { ascending: false }).limit(10),
      supabase.from("user_streaks").select("*").eq("user_id", userId).maybeSingle(),
      supabase.rpc("get_user_tier", { p_user_id: userId }),
      supabase.from("fichas_anamnese").select("queixa_principal, historico_doencas, alergias, servico_nome").eq("user_id", userId).order("created_at", { ascending: false }).limit(3),
    ]);

    const nome = profileRes.data?.nome?.split(" ")[0] || "Cliente";
    const ficha = fichaNutRes.data;
    const agendamentos = agendamentosRes.data || [];
    const streak = streakRes.data;
    const tier = tierRes.data?.[0];
    const anamneses = anamneseRes.data || [];

    const userContext = `
CONTEXTO DO CLIENTE (use para personalizar respostas):
- Nome: ${nome}
- Tier: ${tier?.tier_name || "Bronze"}
- Streak: ${streak?.streak_atual || 0} semanas
${ficha ? `- Peso: ${ficha.peso}kg | Altura: ${ficha.altura}cm | Idade: ${ficha.idade}
- Objetivo: ${ficha.objetivo || "não informado"}
- Doenças: ${ficha.doencas?.join(", ") || "nenhuma"}
- Alergias: ${ficha.alergias_alimentares?.join(", ") || "nenhuma"}` : "- Ficha nutricional: não preenchida"}
- Últimos serviços: ${agendamentos.slice(0, 5).map((a: any) => a.servico).join(", ") || "nenhum"}
- Anamnese: ${anamneses.map((a: any) => `${a.servico_nome}: ${a.queixa_principal || "N/A"}`).join("; ") || "não registrada"}
`;

    const systemPrompt = `Você é a Aria, assistente de saúde e bem-estar da Resinkra.
Sua missão é orientar ${nome} sobre saúde, bem-estar, terapias holísticas, nutrição, exercícios e autocuidado.

REGRAS:
- Seja empática, motivadora e acolhedora
- Use o nome do cliente naturalmente
- Baseie-se nos dados disponíveis para personalizar
- NUNCA faça diagnósticos médicos - sugira buscar profissionais quando necessário
- Sugira serviços da Resinkra quando pertinente (massoterapia, head spa, aromaterapia, etc.)
- Respostas claras e concisas (máximo 3 parágrafos)
- Use emojis com moderação (1-2 por resposta)

${userContext}`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.slice(-10), // Keep last 10 messages for context
        ],
        stream: true,
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) return errorResponse("Limite de requisições atingido. Tente novamente em breve.", 429);
      if (aiResponse.status === 402) return errorResponse("Créditos de IA insuficientes.", 402);
      console.error("AI error:", aiResponse.status, await aiResponse.text());
      return errorResponse("Erro ao processar mensagem", 500);
    }

    return new Response(aiResponse.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error: any) {
    if (error instanceof Response) return error;
    console.error("assistente-saude error:", error);
    return errorResponse(error.message || "Erro interno", 500);
  }
});
