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
      if (response.status === 429) return new Response(JSON.stringify({ error: "Rate limit exceeded. Tente novamente em instantes." }), { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } });
      if (response.status === 402) return new Response(JSON.stringify({ error: "Créditos insuficientes." }), { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } });
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

    return new Response(JSON.stringify({ count: ideasToInsert.length, success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("generate-ideas error:", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
