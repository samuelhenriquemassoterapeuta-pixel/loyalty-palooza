import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";
import { corsHeaders } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    // Validate auth
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return errorResponse("Não autorizado", 401);
    }

    const supabase = createServiceClient();

    // Get user from token
    const { createClient } = await import("https://esm.sh/@supabase/supabase-js@2.89.0");
    const userClient = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );
    const { data: { user }, error: authError } = await userClient.auth.getUser();
    if (authError || !user) return errorResponse("Não autorizado", 401);

    const userId = user.id;

    // Gather user data for AI analysis
    const [transacoesRes, agendamentosRes, profileRes, tierRes, streakRes] = await Promise.all([
      supabase.from("transacoes").select("tipo, valor, created_at, descricao").eq("user_id", userId).order("created_at", { ascending: false }).limit(50),
      supabase.from("agendamentos").select("servico, data_hora, status, created_at").eq("user_id", userId).order("created_at", { ascending: false }).limit(30),
      supabase.from("profiles").select("nome").eq("id", userId).single(),
      supabase.rpc("get_user_tier", { p_user_id: userId }),
      supabase.from("user_streaks").select("*").eq("user_id", userId).maybeSingle(),
    ]);

    const nome = profileRes.data?.nome?.split(" ")[0] || "Cliente";
    const tier = tierRes.data?.[0] || { tier_name: "Bronze", total_gasto: 0 };
    const streak = streakRes.data || { streak_atual: 0 };

    // Analyze patterns
    const transacoes = transacoesRes.data || [];
    const agendamentos = agendamentosRes.data || [];

    // Build context for AI
    const context = `
Análise do cliente "${nome}":
- Tier: ${tier.tier_name} (gasto total: R$ ${tier.total_gasto})
- Streak atual: ${streak.streak_atual} semanas consecutivas
- Últimas transações: ${transacoes.slice(0, 10).map((t: any) => `${t.tipo}: R$ ${t.valor} em ${t.created_at?.substring(0, 10)}`).join("; ")}
- Últimos agendamentos: ${agendamentos.slice(0, 10).map((a: any) => `${a.servico} (${a.status}) em ${a.data_hora?.substring(0, 10)}`).join("; ")}
- Serviços mais usados: ${(() => {
  const freq: Record<string, number> = {};
  agendamentos.filter((a: any) => a.status === "concluido" || a.status === "realizado").forEach((a: any) => { freq[a.servico] = (freq[a.servico] || 0) + 1; });
  return Object.entries(freq).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([s, c]) => `${s} (${c}x)`).join(", ") || "nenhum";
})()}
- Dias preferidos: ${(() => {
  const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const freq: Record<number, number> = {};
  agendamentos.forEach((a: any) => { const d = new Date(a.data_hora).getDay(); freq[d] = (freq[d] || 0) + 1; });
  return Object.entries(freq).sort((a, b) => Number(b[1]) - Number(a[1])).slice(0, 2).map(([d]) => days[Number(d)]).join(", ") || "indefinido";
})()}
`;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) return errorResponse("Chave de IA não configurada", 500);

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [
          {
            role: "system",
            content: `Você é o assistente de cashback da Resinkra, uma clínica de bem-estar.
Analise o perfil do cliente e gere 3-4 sugestões personalizadas de como ele pode maximizar seus Resinks (ℜ).
Cada sugestão deve ter: titulo (curto, max 40 chars), descricao (1-2 frases, max 100 chars), tipo (um de: agendamento, compra, indicacao, streak, tier), prioridade (alta, media, baixa).
Responda APENAS em JSON no formato: { "sugestoes": [...], "mensagem_motivacional": "..." }
A mensagem motivacional deve ser pessoal, curta e usar o nome do cliente.
Considere o dia da semana atual, o tier do cliente, padrões de uso e oportunidades de crescimento.`
          },
          { role: "user", content: context },
        ],
        tools: [{
          type: "function",
          function: {
            name: "suggest_cashback_actions",
            description: "Retorna sugestões personalizadas de cashback",
            parameters: {
              type: "object",
              properties: {
                sugestoes: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      titulo: { type: "string" },
                      descricao: { type: "string" },
                      tipo: { type: "string", enum: ["agendamento", "compra", "indicacao", "streak", "tier"] },
                      prioridade: { type: "string", enum: ["alta", "media", "baixa"] },
                    },
                    required: ["titulo", "descricao", "tipo", "prioridade"],
                  },
                },
                mensagem_motivacional: { type: "string" },
              },
              required: ["sugestoes", "mensagem_motivacional"],
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "suggest_cashback_actions" } },
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) return errorResponse("Limite de requisições atingido, tente novamente em breve.", 429);
      if (aiResponse.status === 402) return errorResponse("Créditos de IA insuficientes.", 402);
      console.error("AI error:", aiResponse.status, await aiResponse.text());
      return errorResponse("Erro ao gerar sugestões", 500);
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall) {
      return errorResponse("Resposta inesperada da IA", 500);
    }

    const result = JSON.parse(toolCall.function.arguments);

    return jsonResponse({ success: true, ...result });
  } catch (error: any) {
    console.error("cashback-inteligente error:", error);
    return errorResponse(error.message || "Erro interno", 500);
  }
});
