import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const supabase = createServiceClient();

    // Buscar nichos únicos dos brand_profiles
    const { data: profiles } = await supabase
      .from("brand_profiles")
      .select("niche");

    const niches = [...new Set((profiles || []).map(p => p.niche).filter(Boolean))];
    if (niches.length === 0) {
      return jsonResponse({ message: "Nenhum nicho encontrado", updated: 0 });
    }

    const nichesStr = niches.join(", ");

    const prompt = `Analise as tendências ATUAIS do Instagram e redes sociais para os seguintes nichos: ${nichesStr}.

Gere exatamente 10 tendências relevantes que estão em alta AGORA.

Para cada tendência, forneça:
- Um título curto e claro
- Uma descrição de 1-2 frases explicando a tendência
- O tipo (audio_trend, format_trend, topic_trend, hashtag_trend, challenge)
- Uma pontuação de relevância de 1 a 10
- Os nichos mais relevantes

Responda em JSON:
{
  "trends": [
    {
      "title": "título da tendência",
      "description": "descrição curta",
      "trend_type": "audio_trend|format_trend|topic_trend|hashtag_trend|challenge",
      "relevance_score": 8,
      "niches": ["nicho1", "nicho2"]
    }
  ]
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "Você é um analista de tendências digitais do Instagram no Brasil. Responda sempre em JSON válido. Use dados atuais de 2026." },
          { role: "user", content: prompt },
        ],
      }),
    });

    if (!response.ok) {
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error("Erro na análise de trends");
    }

    const aiData = await response.json();
    const rawContent = aiData.choices?.[0]?.message?.content || "";

    let parsed: any;
    try {
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(rawContent);
    } catch {
      throw new Error("Falha ao parsear resposta da IA");
    }

    const trends = parsed.trends || [];
    if (trends.length === 0) {
      return jsonResponse({ message: "Nenhuma trend gerada", updated: 0 });
    }

    // Desativar trends antigas
    await supabase
      .from("trends")
      .update({ is_active: false })
      .eq("is_active", true);

    // Inserir novas trends
    const rows = trends.map((t: any) => ({
      title: t.title,
      description: t.description || "",
      trend_type: t.trend_type || "topic_trend",
      relevance_score: Math.min(10, Math.max(1, t.relevance_score || 5)),
      is_active: true,
      source: "ai_analysis",
    }));

    const { error: insertErr } = await supabase.from("trends").insert(rows);
    if (insertErr) throw insertErr;

    return jsonResponse({ success: true, updated: rows.length });
  } catch (e) {
    console.error("atualizar-trends error:", e);
    return errorResponse(e instanceof Error ? e.message : "Unknown error", 500);
  }
});
