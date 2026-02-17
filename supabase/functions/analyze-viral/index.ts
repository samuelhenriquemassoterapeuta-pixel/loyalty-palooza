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

    const { brand_profile, original_content } = await req.json();

    const systemPrompt = `Você é um analista de conteúdo viral especializado em Instagram.
${brand_profile ? `Marca: "${brand_profile.brand_name}" | Nicho: "${brand_profile.niche}"` : ""}
SEMPRE responda em JSON válido. SEMPRE em Português do Brasil.`;

    const userPrompt = `Analise este conteúdo viral e explique por que funciona:

"${original_content}"

Responda EXATAMENTE neste JSON:
{
  "hook_type": "tipo do gancho usado",
  "hook_effectiveness": 8,
  "narrative_structure": "descrição da estrutura narrativa",
  "emotional_triggers": ["gatilho1", "gatilho2"],
  "retention_techniques": ["técnica1", "técnica2"],
  "virality_elements": ["elemento1", "elemento2"],
  "overall_score": 85,
  "key_takeaways": ["aprendizado1", "aprendizado2", "aprendizado3"],
  "adapted_script": {
    "hook": "gancho adaptado para a marca",
    "body": "desenvolvimento adaptado",
    "cta": "CTA adaptado"
  }
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
      throw new Error("Erro na análise viral");
    }

    const aiData = await response.json();
    const rawContent = aiData.choices?.[0]?.message?.content || "";

    let parsed: any;
    try {
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(rawContent);
    } catch {
      parsed = { overall_score: 0, key_takeaways: [], emotional_triggers: [] };
    }

    await supabase.from("viral_analyses").insert({
      user_id: userId,
      brand_id: brand_profile?.id || null,
      original_content,
      hook_type: parsed.hook_type || null,
      hook_effectiveness: parsed.hook_effectiveness || 0,
      narrative_structure: parsed.narrative_structure || null,
      emotional_triggers: parsed.emotional_triggers || [],
      retention_techniques: parsed.retention_techniques || [],
      virality_elements: parsed.virality_elements || [],
      overall_score: parsed.overall_score || 0,
      key_takeaways: parsed.key_takeaways || [],
      adapted_script: parsed.adapted_script || null,
    });

    return jsonResponse(parsed);
  } catch (e) {
    console.error("analyze-viral error:", e);
    if (e instanceof Response) return e;
    return errorResponse(e instanceof Error ? e.message : "Unknown error", 500);
  }
});
