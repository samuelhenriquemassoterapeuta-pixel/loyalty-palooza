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
      if (response.status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded. Tente novamente em instantes." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (response.status === 402) return new Response(JSON.stringify({ error: "Créditos insuficientes." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
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

    // Save to DB
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

    return new Response(JSON.stringify(parsed), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("analyze-viral error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
