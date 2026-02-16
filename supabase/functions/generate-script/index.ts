import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

interface BrandProfile {
  id?: string;
  brand_name: string;
  niche: string;
  target_audience_age: string;
  target_audience_gender: string;
  target_audience_pain: string;
  target_audience_desire: string;
  tone_of_voice: string[];
  use_slangs: boolean;
  use_emojis: boolean;
  keywords: string[];
  forbidden_words: string[];
}

interface ScriptRequest {
  brand_profile: BrandProfile;
  content_type: string;
  topic: string;
  objective: string;
  style: string;
  duration: string;
  depth_level: number;
  additional_info: string;
  variations: number;
}

function buildSystemPrompt(brand: BrandProfile): string {
  return `Você é um roteirista profissional especializado em conteúdo viral para Instagram.
Você trabalha para a marca "${brand.brand_name}" no nicho de "${brand.niche}".

REGRAS OBRIGATÓRIAS:
1. Tom de voz: ${(brand.tone_of_voice || []).join(", ")}
2. Público-alvo: ${brand.target_audience_gender}, ${brand.target_audience_age} anos
3. Principal DOR do público: ${brand.target_audience_pain || "N/A"}
4. Principal DESEJO do público: ${brand.target_audience_desire || "N/A"}
5. Palavras-chave da marca: ${(brand.keywords || []).join(", ")}
6. NUNCA use estas palavras: ${(brand.forbidden_words || []).join(", ")}
7. Use emojis: ${brand.use_emojis ? "Sim, moderadamente" : "Não"}
8. Use gírias: ${brand.use_slangs ? "Sim, quando natural" : "Não"}

PRINCÍPIOS DE CONTEÚDO VIRAL:
- Todo conteúdo DEVE começar com gancho irresistível nos primeiros 3 segundos
- Use loops abertos (curiosidade que só se resolve no final)
- Inclua pattern interrupts para manter atenção
- Todo conteúdo deve ter CTA claro e específico
- Linguagem simples e direta
- Use números ímpares em listas (3, 5, 7)
- Crie senso de urgência quando apropriado
- Gere identificação com o público

FORMATO DE RESPOSTA: Sempre responda em JSON válido conforme solicitado.
IDIOMA: Sempre em Português do Brasil.`;
}

function buildReelsPrompt(req: ScriptRequest): string {
  return `Crie um roteiro completo para um Reels do Instagram.

TEMA: ${req.topic}
DURAÇÃO ALVO: ${req.duration}
OBJETIVO: ${req.objective}
ESTILO: ${req.style}
NÍVEL DE PROFUNDIDADE: ${req.depth_level}/10
INFO ADICIONAL: ${req.additional_info || "Nenhuma"}

RESPONDA EXATAMENTE neste formato JSON:
{
  "hook": "texto do gancho (primeiros 3 segundos)",
  "hook_visual_direction": "direção visual/ação para o gancho",
  "body": [
    {"timestamp": "3-8s", "speech": "texto falado", "visual_direction": "ação/gesto/transição"},
    {"timestamp": "8-15s", "speech": "texto falado", "visual_direction": "ação/gesto/transição"},
    {"timestamp": "15-22s", "speech": "texto falado", "visual_direction": "ação/gesto/transição"}
  ],
  "climax": "texto do momento revelação",
  "cta": "chamada para ação",
  "caption": "legenda completa otimizada para o Instagram",
  "hashtags": ["hashtag1", "hashtag2", "hashtag3", "hashtag4", "hashtag5", "hashtag6", "hashtag7", "hashtag8", "hashtag9", "hashtag10"],
  "audio_suggestion": "sugestão de áudio/música",
  "engagement_tips": ["dica de engajamento 1", "dica 2", "dica 3"],
  "estimated_duration_seconds": 30,
  "score": {
    "hook_score": 8,
    "clarity_score": 9,
    "cta_score": 7,
    "emotion_score": 8,
    "virality_score": 9,
    "total": 82
  }
}`;
}

function buildCarouselPrompt(req: ScriptRequest): string {
  return `Crie um roteiro completo para um Carrossel do Instagram com 7-10 slides.

TEMA: ${req.topic}
OBJETIVO: ${req.objective}
NÍVEL DE PROFUNDIDADE: ${req.depth_level}/10
INFO ADICIONAL: ${req.additional_info || "Nenhuma"}

REGRAS:
- Slide 1 (CAPA): título magnético com números, promessa de transformação
- Slides intermediários: 1 ideia por slide, máximo 40 palavras
- Slide final: resumo + CTA forte

RESPONDA EXATAMENTE neste formato JSON:
{
  "hook": "título da capa do carrossel",
  "hook_visual_direction": "sugestão de design da capa",
  "body": [
    {"timestamp": "Slide 1", "speech": "título principal chamativo", "visual_direction": "sugestão de design/cor de fundo"},
    {"timestamp": "Slide 2", "speech": "conteúdo do slide", "visual_direction": "ícone ou ilustração sugerida"},
    {"timestamp": "Slide 3", "speech": "conteúdo do slide", "visual_direction": "ícone ou ilustração sugerida"},
    {"timestamp": "Slide 4", "speech": "conteúdo do slide", "visual_direction": "ícone ou ilustração sugerida"},
    {"timestamp": "Slide 5", "speech": "conteúdo do slide", "visual_direction": "ícone ou ilustração sugerida"},
    {"timestamp": "Slide 6", "speech": "conteúdo do slide", "visual_direction": "ícone ou ilustração sugerida"},
    {"timestamp": "Slide 7", "speech": "conteúdo do slide", "visual_direction": "ícone ou ilustração sugerida"},
    {"timestamp": "Slide Final", "speech": "resumo + CTA forte", "visual_direction": "design de encerramento"}
  ],
  "climax": "mensagem principal de transformação",
  "cta": "chamada para ação do último slide",
  "caption": "legenda completa otimizada",
  "hashtags": ["hashtag1", "hashtag2", "hashtag3", "hashtag4", "hashtag5"],
  "audio_suggestion": "N/A para carrossel",
  "engagement_tips": ["dica 1", "dica 2"],
  "estimated_duration_seconds": 0,
  "score": {
    "hook_score": 8,
    "clarity_score": 9,
    "cta_score": 7,
    "emotion_score": 8,
    "virality_score": 9,
    "total": 82
  }
}`;
}

function buildStoriesPrompt(req: ScriptRequest): string {
  return `Crie uma sequência de 5-8 Stories para Instagram.

TEMA: ${req.topic}
OBJETIVO: ${req.objective}
INFO ADICIONAL: ${req.additional_info || "Nenhuma"}

TIPOS DE INTERAÇÃO DISPONÍVEIS: enquete, quiz, caixa de perguntas, slider de emoji, contagem regressiva

REGRAS:
- Story 1: Gancho forte para prender atenção
- Stories intermediários: conteúdo + interações para engajar
- Último Story: CTA claro

RESPONDA EXATAMENTE neste formato JSON:
{
  "hook": "texto do primeiro story (gancho)",
  "hook_visual_direction": "tipo visual: foto/video/texto_colorido",
  "body": [
    {"timestamp": "Story 1", "speech": "texto do story", "visual_direction": "tipo visual + interação (ex: enquete com opções A/B)"},
    {"timestamp": "Story 2", "speech": "texto do story", "visual_direction": "tipo visual + interação"},
    {"timestamp": "Story 3", "speech": "texto do story", "visual_direction": "tipo visual + interação"},
    {"timestamp": "Story 4", "speech": "texto do story", "visual_direction": "tipo visual + interação"},
    {"timestamp": "Story 5", "speech": "texto do story com CTA", "visual_direction": "tipo visual + link/swipe up"}
  ],
  "climax": "momento de revelação ou virada",
  "cta": "chamada para ação final",
  "caption": "N/A para stories",
  "hashtags": [],
  "audio_suggestion": "sugestão de música de fundo",
  "engagement_tips": ["dica de interação 1", "dica 2", "dica 3"],
  "estimated_duration_seconds": 40,
  "score": {
    "hook_score": 8,
    "clarity_score": 9,
    "cta_score": 7,
    "emotion_score": 8,
    "virality_score": 9,
    "total": 82
  }
}`;
}

function buildLivePrompt(req: ScriptRequest): string {
  return `Crie um roteiro completo para uma Live no Instagram.

TEMA: ${req.topic}
OBJETIVO: ${req.objective}
NÍVEL DE PROFUNDIDADE: ${req.depth_level}/10
INFO ADICIONAL: ${req.additional_info || "Nenhuma"}

ESTRUTURA:
- Abertura (primeiros 2 minutos): boas-vindas + tema + promessa
- Desenvolvimento: 3-5 blocos de conteúdo com interações
- Encerramento: recap + CTA

RESPONDA EXATAMENTE neste formato JSON:
{
  "hook": "frase de abertura da live (primeiros segundos)",
  "hook_visual_direction": "cenário/setup da live",
  "body": [
    {"timestamp": "0-2min", "speech": "abertura: boas-vindas, apresentação do tema, o que vão aprender", "visual_direction": "olhar para câmera, energia alta"},
    {"timestamp": "2-8min", "speech": "bloco 1 de conteúdo", "visual_direction": "dica de interação com audiência"},
    {"timestamp": "8-15min", "speech": "bloco 2 de conteúdo", "visual_direction": "responder comentários"},
    {"timestamp": "15-22min", "speech": "bloco 3 de conteúdo", "visual_direction": "enquete/pergunta para audiência"},
    {"timestamp": "22-28min", "speech": "recap + agradecimento", "visual_direction": "CTA visual"}
  ],
  "climax": "momento de maior valor/revelação da live",
  "cta": "chamada para ação de encerramento",
  "caption": "legenda para o post de anúncio da live",
  "hashtags": ["live", "aovivo", "hashtag3", "hashtag4", "hashtag5"],
  "audio_suggestion": "N/A para live",
  "engagement_tips": ["pedir para compartilhar nos primeiros minutos", "fazer perguntas diretas", "criar momentos de surpresa"],
  "estimated_duration_seconds": 1800,
  "score": {
    "hook_score": 8,
    "clarity_score": 9,
    "cta_score": 7,
    "emotion_score": 8,
    "virality_score": 9,
    "total": 82
  }
}`;
}

function buildPostPrompt(req: ScriptRequest): string {
  return `Crie um roteiro completo para um Post estático do Instagram (imagem única).

TEMA: ${req.topic}
OBJETIVO: ${req.objective}
NÍVEL DE PROFUNDIDADE: ${req.depth_level}/10
INFO ADICIONAL: ${req.additional_info || "Nenhuma"}

RESPONDA EXATAMENTE neste formato JSON:
{
  "hook": "título/headline da imagem do post",
  "hook_visual_direction": "descrição do design/layout da imagem",
  "body": [
    {"timestamp": "Imagem", "speech": "texto principal na imagem (se houver)", "visual_direction": "paleta de cores, estilo visual, elementos gráficos"}
  ],
  "climax": "mensagem central do post",
  "cta": "chamada para ação na legenda",
  "caption": "legenda completa otimizada com storytelling, valor e CTA",
  "hashtags": ["hashtag1", "hashtag2", "hashtag3", "hashtag4", "hashtag5", "hashtag6", "hashtag7", "hashtag8", "hashtag9", "hashtag10"],
  "audio_suggestion": "N/A para post",
  "engagement_tips": ["dica para gerar comentários", "dica para compartilhamentos", "dica para saves"],
  "estimated_duration_seconds": 0,
  "score": {
    "hook_score": 8,
    "clarity_score": 9,
    "cta_score": 7,
    "emotion_score": 8,
    "virality_score": 9,
    "total": 82
  }
}`;
}

function getUserPrompt(req: ScriptRequest): string {
  switch (req.content_type) {
    case "reels": return buildReelsPrompt(req);
    case "carousel": return buildCarouselPrompt(req);
    case "stories": return buildStoriesPrompt(req);
    case "live": return buildLivePrompt(req);
    case "post": return buildPostPrompt(req);
    default: return buildReelsPrompt(req);
  }
}

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

    const body = await req.json();
    const scriptReq: ScriptRequest = {
      brand_profile: body.brand_profile,
      content_type: body.content_type,
      topic: body.topic,
      objective: body.objective,
      style: body.style,
      duration: body.duration,
      depth_level: body.depth_level,
      additional_info: body.additional_info,
      variations: body.variations || 1,
    };

    const systemPrompt = buildSystemPrompt(scriptReq.brand_profile);
    const userPrompt = getUserPrompt(scriptReq);

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
      brand_id: scriptReq.brand_profile.id || null,
      content_type: scriptReq.content_type,
      topic: scriptReq.topic,
      objective: scriptReq.objective,
      style: scriptReq.style,
      duration: scriptReq.duration,
      depth_level: scriptReq.depth_level,
      additional_info: scriptReq.additional_info,
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
