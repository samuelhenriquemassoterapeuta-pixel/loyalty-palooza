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
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) return errorResponse("Chave de IA não configurada", 500);

    const { messages } = await req.json();
    if (!messages || !Array.isArray(messages)) return errorResponse("Mensagens inválidas", 400);

    // Gather user context for personalized responses
    const [profileRes, fichaNutRes, agendamentosRes, streakRes, tierRes, anamneseRes, wellnessRes, diarioRes] = await Promise.all([
      supabase.from("profiles").select("nome, telefone, created_at").eq("id", userId).single(),
      supabase.from("ficha_nutricional").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("agendamentos").select("servico, data_hora, status").eq("user_id", userId).order("data_hora", { ascending: false }).limit(10),
      supabase.from("user_streaks").select("*").eq("user_id", userId).maybeSingle(),
      supabase.rpc("get_user_tier", { p_user_id: userId }),
      supabase.from("fichas_anamnese").select("queixa_principal, historico_doencas, alergias, servico_nome").eq("user_id", userId).order("created_at", { ascending: false }).limit(3),
      supabase.from("wellness_checkins").select("*").eq("user_id", userId).order("data", { ascending: false }).limit(7),
      supabase.from("diario_humor").select("humor, energia, notas, created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(5),
    ]);

    const nome = profileRes.data?.nome?.split(" ")[0] || "Cliente";
    const ficha = fichaNutRes.data;
    const agendamentos = agendamentosRes.data || [];
    const streak = streakRes.data;
    const tier = tierRes.data?.[0];
    const anamneses = anamneseRes.data || [];
    const wellness = wellnessRes.data || [];
    const diarios = diarioRes.data || [];

    // Build wellness context
    const moodMap: Record<number, string> = { 1: "muito ruim", 2: "ruim", 3: "neutro", 4: "bom", 5: "ótimo" };
    const wellnessContext = wellness.length > 0
      ? `\n- Wellness check-ins (últimos ${wellness.length} dias):
${wellness.slice(0, 5).map((w: any) => `  ${w.data}: humor=${moodMap[w.humor] || w.humor}, energia=${w.energia}/5, sono=${w.sono_horas}h (qual.${w.sono_qualidade}/5), dor=${w.dor}/10, stress=${w.estresse}/5, água=${w.agua_litros}L${w.exercicio_min > 0 ? `, exercício=${w.exercicio_min}min` : ""}`).join("\n")}`
      : "\n- Wellness check-ins: nenhum registrado";

    const diarioContext = diarios.length > 0
      ? `\n- Diário de humor recente: ${diarios.slice(0, 3).map((d: any) => `humor=${d.humor}, energia=${d.energia}`).join("; ")}`
      : "";

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
- Anamnese: ${anamneses.map((a: any) => `${a.servico_nome}: ${a.queixa_principal || "N/A"}`).join("; ") || "não registrada"}${wellnessContext}${diarioContext}
`;

    const systemPrompt = `Você é a Aria, assistente de saúde e bem-estar da Resinkra.
Sua missão é orientar ${nome} sobre saúde, bem-estar, terapias holísticas, nutrição, exercícios e autocuidado.

REGRAS:
- Seja empática, motivadora e acolhedora
- Use o nome do cliente naturalmente
- Baseie-se nos dados disponíveis para personalizar (inclusive dados de wellness check-ins: humor, sono, energia, dor, stress)
- Quando o cliente tiver dados de wellness, comente proativamente sobre padrões (ex: sono ruim, stress alto)
- NUNCA faça diagnósticos médicos - sugira buscar profissionais quando necessário
- Sugira serviços da Resinkra quando pertinente (massoterapia, head spa, aromaterapia, etc.)
- Sugira funcionalidades do app quando pertinente (Tracker de Bem-Estar, Diário de Humor, Análise de Progresso)
- Respostas claras e concisas (máximo 3 parágrafos)
- Use emojis com moderação (1-2 por resposta)

${userContext}`;

    // Build Gemini contents from conversation history
    const lastUserMessage = messages[messages.length - 1]?.content || "";
    const conversationHistory = messages.slice(0, -1).map((m: any) => ({
      role: m.role === "assistant" ? "model" : "user",
      parts: [{ text: m.content }],
    }));

    const contents = [
      { role: "user", parts: [{ text: `INSTRUÇÕES DO SISTEMA:\n\n${systemPrompt}` }] },
      { role: "model", parts: [{ text: "Entendido! Sou Aria, sua assistente de bem-estar. 🌿" }] },
      ...conversationHistory,
      { role: "user", parts: [{ text: lastUserMessage }] },
    ];

    const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

    const aiResponse = await fetch(geminiUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY },
      body: JSON.stringify({
        contents,
        generationConfig: { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 1000 },
        safetySettings: [
          { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
          { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
        ],
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("Gemini error:", aiResponse.status, errText);
      return errorResponse("Erro ao processar mensagem com IA", 500);
    }

    const aiData = await aiResponse.json();
    const reply = aiData.candidates?.[0]?.content?.parts?.[0]?.text || "Desculpe, não consegui processar. Tente novamente!";

    return new Response(JSON.stringify({ content: reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    if (error instanceof Response) return error;
    console.error("assistente-saude error:", error);
    return errorResponse(error.message || "Erro interno", 500);
  }
});
