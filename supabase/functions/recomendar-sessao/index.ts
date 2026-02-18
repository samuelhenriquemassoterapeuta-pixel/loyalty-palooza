import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, handleCors } from "../_shared/cors.ts";
import { createUserClient } from "../_shared/supabase-client.ts";

serve(async (req) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const supabase = createUserClient(authHeader);

    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) {
      return new Response(JSON.stringify({ error: "Não autenticado" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch recent wellness data
    const { data: checkins } = await supabase
      .from("wellness_checkins")
      .select("*")
      .eq("user_id", user.id)
      .order("data", { ascending: false })
      .limit(7);

    // Fetch available services
    const { data: servicos } = await supabase
      .from("servicos")
      .select("nome, descricao, preco, categoria, duracao_minutos")
      .eq("disponivel", true)
      .order("nome");

    // Fetch recent sessions
    const { data: sessoes } = await supabase
      .from("agendamentos")
      .select("servico, data_hora, status")
      .eq("user_id", user.id)
      .order("data_hora", { ascending: false })
      .limit(10);

    if (!servicos || servicos.length === 0) {
      return new Response(JSON.stringify({ recommendations: [], reason: "Nenhum serviço disponível" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const prompt = `Com base nos dados de bem-estar e histórico do usuário, recomende as 3 melhores terapias/serviços para ele agendar agora.

CHECK-INS RECENTES (últimos 7 dias):
${JSON.stringify(checkins || [], null, 2)}

SESSÕES ANTERIORES:
${JSON.stringify(sessoes || [], null, 2)}

SERVIÇOS DISPONÍVEIS:
${JSON.stringify(servicos, null, 2)}

Considere:
- Nível de dor, estresse e energia do usuário
- Serviços que ele ainda não experimentou
- Complementaridade com sessões anteriores
- Urgência baseada nos indicadores de bem-estar`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "Você é um especialista em terapias integrativas. Recomende serviços com base nos dados de saúde do usuário. Seja empático e objetivo." },
          { role: "user", content: prompt },
        ],
        tools: [{
          type: "function",
          function: {
            name: "session_recommendations",
            description: "Retorna recomendações de sessões terapêuticas",
            parameters: {
              type: "object",
              properties: {
                recommendations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      service_name: { type: "string", description: "Nome exato do serviço" },
                      reason: { type: "string", description: "Motivo da recomendação (1-2 frases)" },
                      urgency: { type: "string", enum: ["alta", "media", "baixa"] },
                      benefit: { type: "string", description: "Principal benefício esperado" },
                      emoji: { type: "string" },
                    },
                    required: ["service_name", "reason", "urgency", "benefit", "emoji"],
                  },
                },
                general_tip: { type: "string", description: "Dica geral de saúde baseada nos dados" },
              },
              required: ["recommendations", "general_tip"],
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "session_recommendations" } },
      }),
    });

    if (!aiResponse.ok) {
      console.error("AI error:", aiResponse.status, await aiResponse.text());
      throw new Error("Erro ao gerar recomendações");
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("Resposta AI inválida");

    const result = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(result), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("recomendar-sessao error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
