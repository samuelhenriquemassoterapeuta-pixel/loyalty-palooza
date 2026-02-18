import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { requireAuth } from "../_shared/auth.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    const { userId } = await requireAuth(req);
    const supabase = createServiceClient();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) return errorResponse("Chave de IA não configurada", 500);

    // Gather user health data
    const [fichaRes, fichasAcompRes, agendamentosRes, diarioRes, streakRes, tierRes] = await Promise.all([
      supabase.from("ficha_nutricional").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("fichas_acompanhamento").select("data, peso, imc, gordura_corporal, medida_cintura, medida_quadril, escala_eva").eq("user_id", userId).order("data", { ascending: false }).limit(10),
      supabase.from("agendamentos").select("servico, data_hora, status").eq("user_id", userId).eq("status", "concluido").order("data_hora", { ascending: false }).limit(20),
      supabase.from("diario_alimentar").select("tipo_refeicao, descricao, agua_ml, data").eq("user_id", userId).order("data", { ascending: false }).limit(14),
      supabase.from("user_streaks").select("*").eq("user_id", userId).maybeSingle(),
      supabase.rpc("get_user_tier", { p_user_id: userId }),
    ]);

    const ficha = fichaRes.data;
    const acompanhamentos = fichasAcompRes.data || [];
    const agendamentos = agendamentosRes.data || [];
    const diario = diarioRes.data || [];
    const streak = streakRes.data;

    const context = `
DADOS DE SAÚDE:
${ficha ? `Peso: ${ficha.peso}kg, Altura: ${ficha.altura}cm, Idade: ${ficha.idade}, Sexo: ${ficha.sexo}
Atividade: ${ficha.nivel_atividade}, Objetivo: ${ficha.objetivo}
Doenças: ${ficha.doencas?.join(", ") || "nenhuma"}` : "Ficha não preenchida"}

EVOLUÇÃO (últimas ${acompanhamentos.length} medições):
${acompanhamentos.map((a: any) => `${a.data}: Peso=${a.peso}kg, IMC=${a.imc}, GC=${a.gordura_corporal}%, Cintura=${a.medida_cintura}cm, EVA=${a.escala_eva}`).join("\n") || "Sem medições"}

SESSÕES CONCLUÍDAS (${agendamentos.length}):
${agendamentos.slice(0, 10).map((a: any) => `${a.data_hora?.substring(0, 10)}: ${a.servico}`).join("\n") || "Nenhuma"}

DIÁRIO ALIMENTAR (últimos 14 registros):
${diario.map((d: any) => `${d.data} ${d.tipo_refeicao}: ${d.descricao?.substring(0, 60)}`).join("\n") || "Sem registros"}

STREAK: ${streak?.streak_atual || 0} semanas
`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `Você é um analista de saúde e bem-estar. Analise os dados do cliente e gere insights acionáveis.
Foque em: tendências de peso/medidas, consistência nos tratamentos, padrões alimentares, e sugestões práticas.
Seja objetivo e baseado nos dados. Use a tool "generate_health_insights".`
          },
          { role: "user", content: context },
        ],
        tools: [{
          type: "function",
          function: {
            name: "generate_health_insights",
            description: "Gera insights de saúde baseados em dados",
            parameters: {
              type: "object",
              properties: {
                resumo: { type: "string", description: "Resumo geral em 2-3 frases" },
                insights: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      categoria: { type: "string", enum: ["corpo", "tratamentos", "alimentacao", "habitos", "mental"] },
                      titulo: { type: "string" },
                      descricao: { type: "string" },
                      tendencia: { type: "string", enum: ["positiva", "neutra", "atencao"] },
                      icone: { type: "string" },
                    },
                    required: ["categoria", "titulo", "descricao", "tendencia"],
                  },
                },
                pontuacao_bem_estar: { type: "number", description: "Score de 0-100" },
                alertas: { type: "array", items: { type: "string" } },
                proximos_passos: { type: "array", items: { type: "string" } },
              },
              required: ["resumo", "insights", "pontuacao_bem_estar", "proximos_passos"],
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "generate_health_insights" } },
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) return errorResponse("Limite atingido.", 429);
      if (aiResponse.status === 402) return errorResponse("Créditos insuficientes.", 402);
      console.error("AI error:", aiResponse.status);
      return errorResponse("Erro ao gerar insights", 500);
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) return errorResponse("Resposta inesperada da IA", 500);

    const insights = JSON.parse(toolCall.function.arguments);
    return jsonResponse({ success: true, ...insights });
  } catch (error: any) {
    if (error instanceof Response) return error;
    console.error("insights-saude error:", error);
    return errorResponse(error.message || "Erro interno", 500);
  }
});
