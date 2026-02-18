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

    // Gather comprehensive user data
    const [profileRes, fichaNutRes, agendamentosRes, protocolosRes, streakRes, tierRes, anamneseRes, avalPosturalRes] = await Promise.all([
      supabase.from("profiles").select("nome, telefone, created_at").eq("id", userId).single(),
      supabase.from("ficha_nutricional").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("agendamentos").select("servico, data_hora, status").eq("user_id", userId).order("data_hora", { ascending: false }).limit(30),
      supabase.from("usuario_protocolos").select("*, protocolos(nome, tipo, duracao_semanas)").eq("user_id", userId),
      supabase.from("user_streaks").select("*").eq("user_id", userId).maybeSingle(),
      supabase.rpc("get_user_tier", { p_user_id: userId }),
      supabase.from("fichas_anamnese").select("queixa_principal, historico_doencas, alergias, servico_nome").eq("user_id", userId).order("created_at", { ascending: false }).limit(3),
      supabase.from("avaliacoes_posturais").select("observacoes, data").eq("user_id", userId).order("data", { ascending: false }).limit(1),
    ]);

    const nome = profileRes.data?.nome?.split(" ")[0] || "Cliente";
    const ficha = fichaNutRes.data;
    const agendamentos = agendamentosRes.data || [];
    const protocolos = protocolosRes.data || [];
    const streak = streakRes.data;
    const tier = tierRes.data?.[0];
    const anamneses = anamneseRes.data || [];
    const avalPostural = avalPosturalRes.data?.[0];

    // Compute stats
    const servicosConcluidos = agendamentos.filter((a: any) => ["concluido", "realizado"].includes(a.status));
    const frequenciaServicos: Record<string, number> = {};
    servicosConcluidos.forEach((a: any) => { frequenciaServicos[a.servico] = (frequenciaServicos[a.servico] || 0) + 1; });

    const context = `
PERFIL DO CLIENTE:
- Nome: ${nome}
- Membro desde: ${profileRes.data?.created_at?.substring(0, 10) || "recente"}
- Tier: ${tier?.tier_name || "Bronze"} (gasto: R$ ${tier?.total_gasto || 0})
- Streak: ${streak?.streak_atual || 0} semanas consecutivas

FICHA NUTRICIONAL:
${ficha ? `- Peso: ${ficha.peso}kg | Altura: ${ficha.altura}cm | Idade: ${ficha.idade}
- Sexo: ${ficha.sexo} | Atividade: ${ficha.nivel_atividade}
- Objetivo: ${ficha.objetivo || "não informado"}
- Doenças: ${ficha.doencas?.join(", ") || "nenhuma"}
- Alergias alimentares: ${ficha.alergias_alimentares?.join(", ") || "nenhuma"}
- Fumante: ${ficha.fumante ? "Sim" : "Não"} | Álcool: ${ficha.consumo_alcool || "não informado"}` : "Não preenchida"}

HISTÓRICO DE SERVIÇOS (${servicosConcluidos.length} sessões):
${Object.entries(frequenciaServicos).sort((a, b) => b[1] - a[1]).map(([s, c]) => `- ${s}: ${c}x`).join("\n") || "Nenhum"}

PROTOCOLOS ATIVOS:
${protocolos.filter((p: any) => p.status === "ativo").map((p: any) => `- ${p.protocolos?.nome} (${p.protocolos?.tipo}, ${p.protocolos?.duracao_semanas} semanas)`).join("\n") || "Nenhum"}

ANAMNESE:
${anamneses.map((a: any) => `- ${a.servico_nome}: Queixa: ${a.queixa_principal || "N/A"}, Doenças: ${a.historico_doencas?.join(", ") || "N/A"}`).join("\n") || "Não registrada"}

AVALIAÇÃO POSTURAL:
${avalPostural ? `- Data: ${avalPostural.data} | Obs: ${avalPostural.observacoes || "sem observações"}` : "Não realizada"}
`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          {
            role: "system",
            content: `Você é um especialista em bem-estar holístico da Resinkra.
Analise o perfil completo do cliente e gere um PLANO DE BEM-ESTAR PERSONALIZADO com:
1. Diagnóstico geral (resumo do estado atual)
2. 4-6 objetivos priorizados
3. Plano semanal com atividades recomendadas (serviços, exercícios, alimentação)
4. Métricas para acompanhar progresso
5. Dicas personalizadas

Use o nome do cliente. Seja empático e motivador. Baseie-se APENAS nos dados disponíveis.
Retorne usando a tool "generate_wellness_plan".`
          },
          { role: "user", content: context },
        ],
        tools: [{
          type: "function",
          function: {
            name: "generate_wellness_plan",
            description: "Gera um plano de bem-estar personalizado",
            parameters: {
              type: "object",
              properties: {
                diagnostico: { type: "string", description: "Resumo do estado atual do cliente (2-3 frases)" },
                objetivos: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      titulo: { type: "string" },
                      descricao: { type: "string" },
                      prioridade: { type: "string", enum: ["alta", "media", "baixa"] },
                      prazo_semanas: { type: "number" },
                    },
                    required: ["titulo", "descricao", "prioridade", "prazo_semanas"],
                  },
                },
                plano_semanal: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      dia: { type: "string" },
                      atividades: {
                        type: "array",
                        items: {
                          type: "object",
                          properties: {
                            tipo: { type: "string", enum: ["servico", "exercicio", "alimentacao", "habito", "descanso"] },
                            titulo: { type: "string" },
                            descricao: { type: "string" },
                            duracao_min: { type: "number" },
                          },
                          required: ["tipo", "titulo", "descricao"],
                        },
                      },
                    },
                    required: ["dia", "atividades"],
                  },
                },
                metricas: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      nome: { type: "string" },
                      valor_atual: { type: "string" },
                      meta: { type: "string" },
                      unidade: { type: "string" },
                    },
                    required: ["nome", "meta"],
                  },
                },
                dicas: { type: "array", items: { type: "string" } },
                mensagem_motivacional: { type: "string" },
              },
              required: ["diagnostico", "objetivos", "plano_semanal", "metricas", "dicas", "mensagem_motivacional"],
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "generate_wellness_plan" } },
      }),
    });

    if (!aiResponse.ok) {
      if (aiResponse.status === 429) return errorResponse("Limite de requisições atingido.", 429);
      if (aiResponse.status === 402) return errorResponse("Créditos de IA insuficientes.", 402);
      console.error("AI error:", aiResponse.status, await aiResponse.text());
      return errorResponse("Erro ao gerar plano", 500);
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) return errorResponse("Resposta inesperada da IA", 500);

    const plan = JSON.parse(toolCall.function.arguments);
    return jsonResponse({ success: true, nome, ...plan });
  } catch (error: any) {
    if (error instanceof Response) return error;
    console.error("plano-bem-estar error:", error);
    return errorResponse(error.message || "Erro interno", 500);
  }
});
