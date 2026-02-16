import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const authHeader = req.headers.get("Authorization");
    if (!authHeader) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });

    const supabase = createClient(Deno.env.get("SUPABASE_URL")!, Deno.env.get("SUPABASE_ANON_KEY")!, {
      global: { headers: { Authorization: authHeader } },
    });
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(authHeader.replace("Bearer ", ""));
    if (claimsError || !claimsData?.claims) return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } });
    const userId = claimsData.claims.sub;

    const { brand_profile, content_type, topic, objective, style, duration, depth_level, additional_info, variations = 1 } = await req.json();

    const systemPrompt = `Você é um roteirista profissional especializado em conteúdo viral para Instagram.
Marca: "${brand_profile.brand_name}" | Nicho: "${brand_profile.niche}"
Tom: ${(brand_profile.tone_of_voice || []).join(", ")}
Público: ${brand_profile.target_audience_gender}, ${brand_profile.target_audience_age} anos
DOR: ${brand_profile.target_audience_pain || "N/A"} | DESEJO: ${brand_profile.target_audience_desire || "N/A"}
Keywords: ${(brand_profile.keywords || []).join(", ")}
Palavras proibidas: ${(brand_profile.forbidden_words || []).join(", ")}
Emojis: ${brand_profile.use_emojis ? "Sim" : "Não"} | Gírias: ${brand_profile.use_slangs ? "Sim" : "Não"}
SEMPRE responda em JSON válido. SEMPRE em Português do Brasil.`;

    const userPrompt = `Crie um roteiro para ${content_type} do Instagram.
TEMA: ${topic} | OBJETIVO: ${objective} | ESTILO: ${style} | DURAÇÃO: ${duration || "N/A"} | PROFUNDIDADE: ${depth_level}/10
INFO ADICIONAL: ${additional_info || "Nenhuma"}

Responda EXATAMENTE neste JSON:
{
  "hook": "gancho dos primeiros 3 segundos",
  "hook_visual_direction": "direção visual",
  "body": [{"timestamp": "3-10s", "speech": "texto", "visual_direction": "ação"}],
  "climax": "momento revelação",
  "cta": "chamada para ação",
  "caption": "legenda completa",
  "hashtags": ["tag1", "tag2"],
  "audio_suggestion": "sugestão de áudio",
  "engagement_tips": ["dica1", "dica2"],
  "estimated_duration_seconds": 30,
  "score": {"hook_score": 8, "clarity_score": 9, "cta_score": 7, "emotion_score": 8, "virality_score": 9, "total": 82}
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
      if (response.status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded. Tente novamente em instantes." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (response.status === 402) return new Response(JSON.stringify({ error: "Créditos insuficientes." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      const t = await response.text();
      console.error("AI error:", response.status, t);
      throw new Error("Erro na geração do roteiro");
    }

    const aiData = await response.json();
    const rawContent = aiData.choices?.[0]?.message?.content || "";

    let parsed: any;
    try {
      const jsonMatch = rawContent.match(/\{[\s\S]*\}/);
      parsed = jsonMatch ? JSON.parse(jsonMatch[0]) : JSON.parse(rawContent);
    } catch {
      parsed = { hook: rawContent, body: [], cta: "", caption: "", hashtags: [], score: { total: 0 } };
    }

    const score = parsed.score || {};
    const { data: inserted, error: insertError } = await supabase.from("scripts").insert({
      user_id: userId,
      brand_id: brand_profile.id || null,
      content_type,
      topic,
      objective,
      style,
      duration,
      depth_level,
      additional_info,
      hook: parsed.hook || null,
      hook_visual_direction: parsed.hook_visual_direction || null,
      body: parsed.body || null,
      climax: parsed.climax || null,
      cta: parsed.cta || null,
      caption: parsed.caption || null,
      hashtags: parsed.hashtags || [],
      audio_suggestion: parsed.audio_suggestion || null,
      engagement_tips: parsed.engagement_tips || [],
      estimated_duration_seconds: parsed.estimated_duration_seconds || 0,
      score_hook: score.hook_score || 0,
      score_clarity: score.clarity_score || 0,
      score_cta: score.cta_score || 0,
      score_emotion: score.emotion_score || 0,
      score_virality: score.virality_score || 0,
      score_total: score.total || 0,
      raw_ai_response: aiData,
      status: "draft",
    }).select("id").single();

    if (insertError) throw insertError;

    return new Response(JSON.stringify({ script_id: inserted.id, success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-script error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
