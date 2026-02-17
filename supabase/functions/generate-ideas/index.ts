import { handleCors } from "../_shared/cors.ts";
import { requireAuth } from "../_shared/auth.ts";
import { createUserClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const { userId, authHeader } = await requireAuth(req);
    const supabase = createUserClient(authHeader);

    const { brand_profile } = await req.json();

    const systemPrompt = `Você é um estrategista de conteúdo para Instagram.
Marca: "${brand_profile?.brand_name || "N/A"}" | Nicho: "${brand_profile?.niche || "geral"}"
Público: ${brand_profile?.target_audience_gender || "todos"}, ${brand_profile?.target_audience_age || "25-34"} anos
DOR: ${brand_profile?.target_audience_pain || "N/A"} | DESEJO: ${brand_profile?.target_audience_desire || "N/A"}
SEMPRE responda em JSON válido. SEMPRE em Português do Brasil.`;

    const userPrompt = `Gere 10 ideias de conteúdo para Instagram distribuídas pelo funil:
- 4 ideias de TOPO de funil (atrair novos seguidores)
- 3 ideias de MEIO de funil (engajar e nutrir)
- 3 ideias de FUNDO de funil (converter em clientes)

Responda EXATAMENTE neste JSON:
{
  "ideas": [
    {
      "title": "título curto e claro da ideia",
      "description": "breve descrição de como executar",
      "funnel_stage": "topo",
      "content_type": "reels"
    }
  ]
}`;

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
      }),
    });

    if (!response.ok) {
      if (response.status === 429) return errorResponse("Rate limit exceeded. Tente novamente em instantes.", 429);
      if (response.status === 402) return errorResponse("Créditos insuficientes.", 402);
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error("Erro na geração de ideias");
    }

    const aiData = await response.json();
    const rawContent = aiData.choices?.[0]?.message?.content || "";

    let parsed: any;
    try {
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(rawContent);
    } catch {
      parsed = { ideas: [] };
    }

    const ideasToInsert = (parsed.ideas || []).map((idea: any) => ({
      user_id: userId,
      brand_id: brand_profile?.id || null,
      title: idea.title || "Ideia sem título",
      description: idea.description || null,
      funnel_stage: idea.funnel_stage || "topo",
      content_type: idea.content_type || null,
      niche: brand_profile?.niche || null,
    }));

    if (ideasToInsert.length > 0) {
      const { error: insertError } = await supabase.from("content_ideas").insert(ideasToInsert);
      if (insertError) throw insertError;
    }

    return jsonResponse({ count: ideasToInsert.length, success: true });
  } catch (e) {
    console.error("generate-ideas error:", e);
    if (e instanceof Response) return e;
    return errorResponse(e instanceof Error ? e.message : "Unknown error", 500);
  }
});
