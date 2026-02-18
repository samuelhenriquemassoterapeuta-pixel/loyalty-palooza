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

    // Buscar todos os brand_profiles ativos (admins que usam o Resinkra)
    const { data: profiles, error: profErr } = await supabase
      .from("brand_profiles")
      .select("id, user_id, brand_name, niche, keywords, target_audience_pain, target_audience_desire");

    if (profErr) throw profErr;
    if (!profiles || profiles.length === 0) {
      return jsonResponse({ message: "Nenhum perfil de marca encontrado", generated: 0 });
    }

    let totalGenerated = 0;

    for (const profile of profiles) {
      // Buscar trends ativas para enriquecer prompt
      const { data: trends } = await supabase
        .from("trends")
        .select("title")
        .eq("is_active", true)
        .order("relevance_score", { ascending: false })
        .limit(5);

      const trendsList = (trends || []).map(t => t.title).join(", ");

      const prompt = `Gere exatamente 10 ideias de conteúdo para Instagram para a marca "${profile.brand_name}" no nicho "${profile.niche}".

DADOS DA MARCA:
- Palavras-chave: ${(profile.keywords || []).join(", ")}
- Dor do público: ${profile.target_audience_pain || "N/A"}
- Desejo do público: ${profile.target_audience_desire || "N/A"}
- Trends do momento: ${trendsList || "Nenhuma"}

DISTRIBUIÇÃO NO FUNIL:
- 4 ideias de TOPO (atrair, viralizar)
- 3 ideias de MEIO (engajar, educar)
- 3 ideias de FUNDO (converter, vender)

Responda em JSON com este formato:
{
  "ideas": [
    {
      "title": "título da ideia",
      "description": "breve descrição em 1-2 frases",
      "content_type": "reels|carousel|stories|post|live",
      "funnel_stage": "topo|meio|fundo"
    }
  ]
}`;

      const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            { role: "system", content: "Você é um estrategista de conteúdo digital especializado em Instagram. Responda sempre em JSON válido." },
            { role: "user", content: prompt },
          ],
        }),
      });

      if (!response.ok) {
        const t = await response.text();
        console.error("AI error for brand", profile.brand_name, ":", response.status, t);
        continue;
      }

      const aiData = await response.json();
      const rawContent = aiData.choices?.[0]?.message?.content || "";

      let parsed: any;
      try {
        const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
        parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(rawContent);
      } catch {
        console.error("Failed to parse AI response for brand:", profile.brand_name);
        continue;
      }

      const ideas = parsed.ideas || [];
      if (ideas.length === 0) continue;

      const rows = ideas.map((idea: any) => ({
        user_id: profile.user_id,
        brand_id: profile.id,
        title: idea.title,
        description: idea.description || null,
        content_type: idea.content_type || "reels",
        funnel_stage: idea.funnel_stage || "topo",
        niche: profile.niche,
        is_used: false,
      }));

      const { error: insertErr } = await supabase.from("content_ideas").insert(rows);
      if (insertErr) {
        console.error("Insert error:", insertErr);
        continue;
      }

      totalGenerated += rows.length;

      // Notificar o usuário
      await supabase.from("notificacoes").insert({
        user_id: profile.user_id,
        titulo: "💡 Novas ideias da semana!",
        mensagem: `${rows.length} novas ideias de conteúdo foram geradas automaticamente para ${profile.brand_name}. Confira no Banco de Ideias!`,
        tipo: "sistema",
      });
    }

    return jsonResponse({ success: true, generated: totalGenerated });
  } catch (e) {
    console.error("gerar-ideias-semanais error:", e);
    return errorResponse(e instanceof Error ? e.message : "Unknown error", 500);
  }
});
