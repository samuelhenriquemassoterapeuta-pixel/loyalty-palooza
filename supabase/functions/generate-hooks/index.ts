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

    const { brand_profile, topic, category, quantity = 10 } = await req.json();

    const systemPrompt = `Você é um especialista em ganchos virais para Instagram.
Marca: "${brand_profile?.brand_name || "N/A"}" | Nicho: "${brand_profile?.niche || "geral"}"
Tom: ${(brand_profile?.tone_of_voice || []).join(", ") || "profissional"}
Público: ${brand_profile?.target_audience_gender || "todos"}, ${brand_profile?.target_audience_age || "25-34"} anos
SEMPRE responda em JSON válido. SEMPRE em Português do Brasil.`;

    const userPrompt = `Gere exatamente ${quantity} ganchos virais para Instagram.
TEMA: ${topic}
CATEGORIA PRINCIPAL: ${category}

Cada gancho deve ser impossível de ignorar nos primeiros 3 segundos.
Varie entre as categorias: curiosidade, polêmica, autoridade, storytelling, identificação, choque, pergunta, desafio.

Responda EXATAMENTE neste JSON:
{
  "hooks": [
    {
      "hook_text": "texto do gancho",
      "category": "curiosidade",
      "power_level": 8,
      "best_for": "reels",
      "emotion_triggered": "curiosidade",
      "completion_suggestion": "sugestão de como completar o conteúdo após o gancho"
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
      throw new Error("Erro na geração de ganchos");
    }

    const aiData = await response.json();
    const rawContent = aiData.choices?.[0]?.message?.content || "";

    let parsed: any;
    try {
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(rawContent);
    } catch {
      parsed = { hooks: [] };
    }

    const hooksToInsert = (parsed.hooks || []).map((h: any) => ({
      user_id: userId,
      brand_id: brand_profile?.id || null,
      topic,
      hook_text: h.hook_text || "",
      category: h.category || category,
      power_level: Math.min(10, Math.max(1, h.power_level || 5)),
      best_for: h.best_for || "all",
      emotion_triggered: h.emotion_triggered || null,
      completion_suggestion: h.completion_suggestion || null,
    }));

    if (hooksToInsert.length > 0) {
      const { error: insertError } = await supabase.from("hooks").insert(hooksToInsert);
      if (insertError) throw insertError;
    }

    return jsonResponse({ count: hooksToInsert.length, success: true });
  } catch (e) {
    console.error("generate-hooks error:", e);
    if (e instanceof Response) return e;
    return errorResponse(e instanceof Error ? e.message : "Unknown error", 500);
  }
});
