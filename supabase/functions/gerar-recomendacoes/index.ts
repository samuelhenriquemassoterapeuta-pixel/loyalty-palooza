import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { requireAuthUser } from "../_shared/auth.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const { userId } = await requireAuthUser(req);
    const supabase = createServiceClient();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

    // Gather comprehensive user data
    const [fichaNut, historico, protocolos, agendamentos, streakRes, tierRes, anamneseRes] = await Promise.all([
      supabase.from("ficha_nutricional").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("historico_cirurgico").select("*").eq("user_id", userId),
      supabase.from("usuario_protocolos").select("*, protocolos(*)").eq("user_id", userId),
      supabase.from("agendamentos").select("servico, data_hora, status").eq("user_id", userId).order("data_hora", { ascending: false }).limit(20),
      supabase.from("user_streaks").select("*").eq("user_id", userId).maybeSingle(),
      supabase.rpc("get_user_tier", { p_user_id: userId }),
      supabase.from("fichas_anamnese").select("queixa_principal, historico_doencas, alergias, servico_nome").eq("user_id", userId).order("created_at", { ascending: false }).limit(5),
    ]);

    const { data: servicos } = await supabase.from("servicos").select("nome, descricao, preco, categoria").eq("disponivel", true);
    const { data: protocolosDisp } = await supabase.from("protocolos").select("nome, tipo, descricao, duracao_semanas").eq("disponivel", true);

    const ficha = fichaNut.data;
    const agendamentosList = agendamentos.data || [];
    const protocolosAtivos = (protocolos.data || []).filter((p: any) => p.status === "ativo");
    const streak = streakRes.data;
    const tier = tierRes.data?.[0];
    const anamneses = anamneseRes.data || [];

    // Count service frequency
    const freq: Record<string, number> = {};
    agendamentosList.filter((a: any) => ["concluido", "realizado"].includes(a.status))
      .forEach((a: any) => { freq[a.servico] = (freq[a.servico] || 0) + 1; });

    // If we have AI key, use AI-powered recommendations
    if (LOVABLE_API_KEY) {
      const context = `
PERFIL:
- Tier: ${tier?.tier_name || "Bronze"} | Streak: ${streak?.streak_atual || 0} semanas
${ficha ? `- Peso: ${ficha.peso}kg | Altura: ${ficha.altura}cm | Idade: ${ficha.idade} | Sexo: ${ficha.sexo}
- Objetivo: ${ficha.objetivo || "N/A"} | Atividade: ${ficha.nivel_atividade}
- Doenças: ${ficha.doencas?.join(", ") || "nenhuma"} | Alergias: ${ficha.alergias_alimentares?.join(", ") || "nenhuma"}
- Fumante: ${ficha.fumante ? "sim" : "não"}` : "Ficha não preenchida"}

HISTÓRICO DE SERVIÇOS: ${Object.entries(freq).sort((a, b) => b[1] - a[1]).map(([s, c]) => `${s} (${c}x)`).join(", ") || "Nenhum"}

PROTOCOLOS ATIVOS: ${protocolosAtivos.map((p: any) => p.protocolos?.nome).join(", ") || "Nenhum"}

ANAMNESE: ${anamneses.map((a: any) => `${a.servico_nome}: ${a.queixa_principal || "N/A"}`).join("; ") || "N/A"}

SERVIÇOS DISPONÍVEIS: ${(servicos || []).map((s: any) => s.nome).join(", ")}
PROTOCOLOS DISPONÍVEIS: ${(protocolosDisp || []).map((p: any) => `${p.nome} (${p.tipo})`).join(", ")}
`;

      try {
        const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
          body: JSON.stringify({
            model: "google/gemini-3-flash-preview",
            messages: [
              {
                role: "system",
                content: `Você é um especialista em bem-estar da Resinkra. Analise o perfil do cliente e gere 4-6 recomendações personalizadas de tratamentos/serviços. Cada recomendação deve ser relevante ao perfil. Use a tool "generate_recommendations".`,
              },
              { role: "user", content: context },
            ],
            tools: [{
              type: "function",
              function: {
                name: "generate_recommendations",
                description: "Gera recomendações personalizadas",
                parameters: {
                  type: "object",
                  properties: {
                    recomendacoes: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          titulo: { type: "string" },
                          descricao: { type: "string", description: "1-2 frases explicando o benefício" },
                          tipo: { type: "string", enum: ["servico", "protocolo", "tratamento", "habito"] },
                          confianca: { type: "number", description: "0.0 a 1.0 quão relevante para este cliente" },
                        },
                        required: ["titulo", "descricao", "tipo", "confianca"],
                      },
                    },
                  },
                  required: ["recomendacoes"],
                },
              },
            }],
            tool_choice: { type: "function", function: { name: "generate_recommendations" } },
          }),
        });

        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
          if (toolCall) {
            const parsed = JSON.parse(toolCall.function.arguments);
            const recs = parsed.recomendacoes || [];

            if (recs.length > 0) {
              const inserts = recs.map((rec: any) => ({
                user_id: userId,
                tipo: rec.tipo,
                titulo: rec.titulo,
                descricao: rec.descricao,
                confianca: Math.min(1, Math.max(0, rec.confianca)),
                dados_base: { method: "ai-powered", model: "gemini-3-flash", generated_at: new Date().toISOString() },
              }));
              await supabase.from("recomendacoes_ia").insert(inserts);
              return jsonResponse({ count: recs.length, method: "ai" });
            }
          }
        }
      } catch (aiErr) {
        console.error("AI fallback to rules:", aiErr);
      }
    }

    // Fallback: rule-based recommendations
    const recommendations = gerarRecomendacoesPorRegras(ficha, historico.data || [], protocolosAtivos, agendamentosList, servicos || [], protocolosDisp || []);

    if (recommendations.length > 0) {
      const inserts = recommendations.map((rec) => ({
        user_id: userId,
        tipo: rec.tipo,
        titulo: rec.titulo,
        descricao: rec.descricao,
        confianca: rec.confianca,
        dados_base: { method: "rule-based", generated_at: new Date().toISOString() },
      }));
      await supabase.from("recomendacoes_ia").insert(inserts);
    }

    return jsonResponse({ count: recommendations.length, method: "rules" });
  } catch (error: any) {
    if (error instanceof Response) return error;
    return errorResponse(error.message);
  }
});

interface Recomendacao {
  titulo: string;
  descricao: string;
  tipo: string;
  confianca: number;
}

function gerarRecomendacoesPorRegras(fichaNut: any, historico: any[], protocolosAtivos: any[], agendamentos: any[], servicosDisponiveis: any[], protocolosDisponiveis: any[]): Recomendacao[] {
  const recomendacoes: Recomendacao[] = [];
  const servicosUsados = new Set(agendamentos.map((a: any) => a.servico));
  const protocolosTiposAtivos = new Set(protocolosAtivos.map((p: any) => p.protocolos?.tipo));

  if (historico.length > 0) {
    const cirurgiaRecente = historico.some((h: any) => { const diff = Date.now() - new Date(h.data_cirurgia).getTime(); return diff < 180 * 24 * 60 * 60 * 1000; });
    if (cirurgiaRecente && !protocolosTiposAtivos.has("drenagem_pos_operatorio")) {
      recomendacoes.push({ titulo: "Drenagem Linfática Pós-Operatória", descricao: "Baseado no seu histórico cirúrgico recente, a drenagem ajuda na recuperação e redução de inchaço.", tipo: "protocolo", confianca: 0.95 });
    }
  }

  if (fichaNut?.peso && fichaNut?.altura) {
    const alturaM = fichaNut.altura > 3 ? fichaNut.altura / 100 : fichaNut.altura;
    const imc = fichaNut.peso / (alturaM * alturaM);
    if (imc > 25 && !protocolosTiposAtivos.has("emagrecimento")) {
      recomendacoes.push({ titulo: "Protocolo de Emagrecimento", descricao: "Seu perfil indica que um protocolo com foco em redução de medidas pode trazer ótimos resultados.", tipo: "protocolo", confianca: imc > 30 ? 0.92 : 0.8 });
    }
  }

  if (fichaNut?.nivel_atividade === "sedentario") {
    recomendacoes.push({ titulo: "Plano de Alongamento Guiado", descricao: "Para quem tem rotina sedentária, o alongamento regular melhora postura e reduz dores.", tipo: "servico", confianca: 0.85 });
  }

  const servicosNaoUsados = servicosDisponiveis.filter((s: any) => !servicosUsados.has(s.nome));
  if (servicosNaoUsados.length > 0) {
    recomendacoes.push({ titulo: `Experimente: ${servicosNaoUsados[0].nome}`, descricao: servicosNaoUsados[0].descricao || "Pode ser uma ótima adição ao seu cuidado.", tipo: "servico", confianca: 0.7 });
  }

  if (fichaNut?.objetivo) {
    const obj = fichaNut.objetivo.toLowerCase();
    if (obj.includes("relaxa") || obj.includes("stress") || obj.includes("ansie")) {
      recomendacoes.push({ titulo: "Head Spa Terapêutico", descricao: "Combina massagem craniana com aromaterapia para relaxamento profundo.", tipo: "servico", confianca: 0.88 });
    }
    if (obj.includes("dor") || obj.includes("postur")) {
      recomendacoes.push({ titulo: "Avaliação Postural Completa", descricao: "Identifica desequilíbrios posturais e guia tratamentos mais precisos.", tipo: "servico", confianca: 0.87 });
    }
  }

  return recomendacoes.sort((a, b) => b.confianca - a.confianca).slice(0, 5);
}
