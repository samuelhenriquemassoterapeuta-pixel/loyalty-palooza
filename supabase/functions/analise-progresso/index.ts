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

    // Fetch last 30 wellness checkins
    const { data: checkins } = await supabase
      .from("wellness_checkins")
      .select("*")
      .eq("user_id", user.id)
      .order("data", { ascending: false })
      .limit(30);

    // Fetch completed sessions
    const { data: sessoes } = await supabase
      .from("agendamentos")
      .select("servico, data_hora, status")
      .eq("user_id", user.id)
      .in("status", ["concluido", "realizado"])
      .order("data_hora", { ascending: false })
      .limit(20);

    // Fetch protocol measurements
    const { data: fichas } = await supabase
      .from("fichas_acompanhamento")
      .select("data, peso, imc, gordura_corporal, escala_eva, medida_cintura")
      .eq("user_id", user.id)
      .order("data", { ascending: false })
      .limit(10);

    if (!checkins || checkins.length < 3) {
      return new Response(JSON.stringify({
        score: null,
        summary: "Registre pelo menos 3 dias de check-in para gerar sua análise de progresso com IA.",
        trends: [],
        recommendations: [],
        weekly_comparison: null,
      }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const prompt = `Analise os dados de bem-estar deste usuário e retorne uma análise de progresso detalhada.

DADOS DE CHECK-INS (últimos 30 dias):
${JSON.stringify(checkins.slice(0, 15), null, 2)}

SESSÕES TERAPÊUTICAS RECENTES:
${JSON.stringify(sessoes?.slice(0, 10) || [], null, 2)}

MEDIÇÕES CORPORAIS:
${JSON.stringify(fichas?.slice(0, 5) || [], null, 2)}

Retorne a análise usando a tool fornecida.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: "Você é um analista de saúde e bem-estar especialista. Analise tendências nos dados e gere insights acionáveis. Responda em português brasileiro. Seja encorajador mas honesto.",
          },
          { role: "user", content: prompt },
        ],
        tools: [{
          type: "function",
          function: {
            name: "progress_analysis",
            description: "Retorna análise de progresso do usuário",
            parameters: {
              type: "object",
              properties: {
                score: { type: "number", description: "Score geral de 0-100" },
                score_label: { type: "string", description: "Label curto do score (ex: Bom, Excelente, Precisa melhorar)" },
                summary: { type: "string", description: "Resumo de 2-3 frases sobre o progresso geral" },
                trends: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      category: { type: "string", description: "humor, energia, sono, dor, estresse, exercicio, agua" },
                      direction: { type: "string", enum: ["up", "down", "stable"] },
                      description: { type: "string", description: "Descrição curta da tendência" },
                      percentage: { type: "number", description: "Variação percentual" },
                    },
                    required: ["category", "direction", "description"],
                  },
                },
                recommendations: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string" },
                      description: { type: "string" },
                      priority: { type: "string", enum: ["high", "medium", "low"] },
                      icon: { type: "string", description: "emoji representativo" },
                    },
                    required: ["title", "description", "priority", "icon"],
                  },
                },
                weekly_comparison: {
                  type: "object",
                  properties: {
                    this_week_avg_humor: { type: "number" },
                    last_week_avg_humor: { type: "number" },
                    this_week_avg_energia: { type: "number" },
                    last_week_avg_energia: { type: "number" },
                    improvement_areas: { type: "array", items: { type: "string" } },
                    strength_areas: { type: "array", items: { type: "string" } },
                  },
                },
              },
              required: ["score", "score_label", "summary", "trends", "recommendations"],
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "progress_analysis" } },
      }),
    });

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("AI gateway error:", aiResponse.status, errText);
      throw new Error("Erro ao gerar análise");
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("Resposta AI inválida");

    const analysis = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(analysis), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analise-progresso error:", e);
    return new Response(JSON.stringify({ error: e.message || "Erro interno" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
