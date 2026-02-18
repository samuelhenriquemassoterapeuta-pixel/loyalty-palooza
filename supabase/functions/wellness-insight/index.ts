import { handleCors } from "../_shared/cors.ts";
import { requireAuth } from "../_shared/auth.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const { userId } = await requireAuth(req);
    const sb = createServiceClient();

    // Get last 7 days of checkins
    const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];
    const { data: checkins } = await sb
      .from("wellness_checkins")
      .select("humor, energia, sono_horas, agua_litros, estresse, exercicio_min, data")
      .eq("user_id", userId)
      .gte("data", weekAgo)
      .order("data", { ascending: false });

    if (!checkins || checkins.length < 2) {
      return jsonResponse({ insight: null, reason: "insufficient_data" });
    }

    // Get user goals
    const { data: metas } = await sb
      .from("wellness_metas")
      .select("meta_agua_litros, meta_sono_horas, meta_energia_min, meta_humor_min, meta_estresse_max")
      .eq("user_id", userId)
      .maybeSingle();

    const avg = (arr: number[]) => arr.length ? (arr.reduce((a, b) => a + b, 0) / arr.length).toFixed(1) : "N/A";
    const summary = {
      dias: checkins.length,
      humor_medio: avg(checkins.map(c => c.humor)),
      energia_media: avg(checkins.map(c => c.energia)),
      sono_medio: avg(checkins.map(c => c.sono_horas).filter(Boolean) as number[]),
      agua_media: avg(checkins.map(c => c.agua_litros).filter(Boolean) as number[]),
      stress_medio: avg(checkins.map(c => c.estresse).filter(Boolean) as number[]),
      exercicio_medio: avg(checkins.map(c => c.exercicio_min).filter(Boolean) as number[]),
    };

    const metasStr = metas
      ? `Metas: água ${metas.meta_agua_litros}L, sono ${metas.meta_sono_horas}h, energia mín ${metas.meta_energia_min}, humor mín ${metas.meta_humor_min}, stress máx ${metas.meta_estresse_max}.`
      : "";

    const prompt = `Você é um coach de bem-estar gentil e direto. Analise estes dados dos últimos ${summary.dias} dias:
- Humor médio: ${summary.humor_medio}/5
- Energia média: ${summary.energia_media}/5
- Sono médio: ${summary.sono_medio}h
- Água média: ${summary.agua_media}L
- Stress médio: ${summary.stress_medio}/5
- Exercício médio: ${summary.exercicio_medio} min/dia
${metasStr}

Gere EXATAMENTE 1 insight curto (máximo 2 frases) que seja:
- Personalizado com base nos dados
- Acionável (sugira algo específico)
- Positivo e motivador
- Use emoji no início

Responda APENAS com o texto do insight, sem formatação extra.`;

    const aiRes = await fetch("https://api.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-lite",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 150,
        temperature: 0.8,
      }),
    });

    if (!aiRes.ok) {
      return jsonResponse({ insight: null, reason: "ai_error" });
    }

    const aiData = await aiRes.json();
    const insight = aiData.choices?.[0]?.message?.content?.trim() || null;

    return jsonResponse({ insight, summary });
  } catch (e) {
    if (e instanceof Response) return e;
    return errorResponse(e.message || "Erro interno", 500);
  }
});
