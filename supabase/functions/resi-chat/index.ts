import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// ========== OPENROUTER (PRINCIPAL) ==========
async function callOpenRouter(contents: any[], config: any): Promise<string | null> {
  const apiKey = Deno.env.get("OPENROUTER_API_KEY");
  if (!apiKey) return null;

  const models = ["nvidia/nemotron-nano-9b-v2:free", "arcee-ai/trinity-mini:free"];
  const messages = contents.map((c: any) => ({
    role: c.role === "model" ? "assistant" : "user",
    content: c.parts.map((p: any) => p.text).join("\n"),
  }));

  for (const model of models) {
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${apiKey}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://resinkra.com",
          "X-Title": "Agentes Resi IA",
        },
        body: JSON.stringify({
          model,
          messages,
          max_tokens: config.generationConfig?.maxOutputTokens || 500,
          temperature: config.generationConfig?.temperature || 0.7,
        }),
      });

      if (response.status === 429) {
        console.log(`OpenRouter ${model} rate limited, tentando próximo...`);
        continue;
      }
      if (!response.ok) {
        const errText = await response.text();
        console.error(`OpenRouter ${model} erro ${response.status}:`, errText);
        continue;
      }

      const data = await response.json();
      const text = data.choices?.[0]?.message?.content;
      if (text) {
        console.log(`✅ Respondido via OpenRouter: ${model}`);
        return text;
      }
    } catch (e) {
      console.error(`Erro OpenRouter ${model}:`, e);
      continue;
    }
  }
  return null;
}

// ========== GEMINI (FALLBACK 1) ==========
async function callGeminiFallback(apiKey: string, contents: any[], config: any): Promise<string | null> {
  const models = ["gemini-2.0-flash", "gemini-2.0-flash-lite"];
  for (let i = 0; i < models.length; i++) {
    const model = models[i];
    if (i > 0) await new Promise(resolve => setTimeout(resolve, 1000));
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({ contents, ...config }),
      });
      if (response.status === 429) { console.log(`Gemini ${model} rate limited`); continue; }
      if (!response.ok) { const t = await response.text(); console.error(`Gemini ${model} erro:`, t); continue; }
      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) { console.log(`✅ Respondido via Gemini: ${model}`); return text; }
    } catch (e) { console.error(`Erro Gemini ${model}:`, e); continue; }
  }
  return null;
}

// ========== LOVABLE AI (FALLBACK 2) ==========
async function callLovableAIFallback(contents: any[], config: any): Promise<string | null> {
  const apiKey = Deno.env.get("LOVABLE_API_KEY");
  if (!apiKey) return null;
  const messages = contents.map((c: any) => ({
    role: c.role === "model" ? "assistant" : "user",
    content: c.parts.map((p: any) => p.text).join("\n"),
  }));
  try {
    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({ model: "google/gemini-2.5-flash-lite", messages, max_tokens: config.generationConfig?.maxOutputTokens || 500, temperature: config.generationConfig?.temperature || 0.7 }),
    });
    if (!res.ok) { console.error("Lovable AI erro:", res.status, await res.text()); return null; }
    const data = await res.json();
    const text = data.choices?.[0]?.message?.content;
    if (text) { console.log("✅ Respondido via Lovable AI Gateway"); return text; }
  } catch (e) { console.error("Erro Lovable AI:", e); }
  return null;
}

// ========== CADEIA DE FALLBACK ==========
async function callAIWithFallback(apiKey: string, contents: any[], config: any): Promise<string> {
  // 1. OpenRouter
  const or = await callOpenRouter(contents, config);
  if (or) return or;
  console.log("⚠️ OpenRouter falhou, tentando Gemini...");

  // 2. Gemini
  const gem = await callGeminiFallback(apiKey, contents, config);
  if (gem) return gem;
  console.log("⚠️ Gemini falhou, tentando Lovable AI...");

  // 3. Lovable AI
  const lov = await callLovableAIFallback(contents, config);
  if (lov) return lov;

  throw new Error("Todos os provedores falharam (OpenRouter → Gemini → Lovable AI)");
}

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, context } = await req.json();

    if (!message || typeof message !== "string" || message.length > 2000) {
      return new Response(JSON.stringify({ error: "Mensagem inválida" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY") || "";

    const systemPrompt = `Você é a Resi, assistente virtual da Resinkra — uma clínica de bem-estar e terapias holísticas.

Sua personalidade:
- Acolhedora, empática e profissional
- Usa emojis com moderação (1-2 por resposta)
- Respostas curtas e objetivas (máximo 3 parágrafos)
- Sempre sugere agendar quando relevante

Serviços da Resinkra:
- Massoterapia, Head SPA, Liberação Miofascial, Drenagem Linfática
- Aromaterapia, Seitai, Dry Needling, Reflexologia
- Shiatsu, Ventosaterapia, Bandagem Elástica
- Pacotes mensais e Clube VIP com cashback

Funcionalidades do app:
- Agendamento online, Loja de produtos, Cashback e indicações
- Cursos profissionalizantes, Programa de fidelidade com cromos
- Vale presente, Marketplace de terapeutas

${context ? `Contexto do usuário: ${context}` : ""}

Responda sempre em português brasileiro. Se não souber algo específico, oriente o usuário a entrar em contato pelo WhatsApp ou visitar a clínica.`;

    const contents = [
      { role: "user", parts: [{ text: `INSTRUÇÕES DO SISTEMA:\n\n${systemPrompt}` }] },
      { role: "model", parts: [{ text: "Entendido! Sou a Resi, sua assistente da Resinkra. 🌿" }] },
      { role: "user", parts: [{ text: message }] },
    ];

    const config = {
      generationConfig: { temperature: 0.7, topK: 40, topP: 0.95, maxOutputTokens: 500 },
      safetySettings: [
        { category: "HARM_CATEGORY_HARASSMENT", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_HATE_SPEECH", threshold: "BLOCK_NONE" },
        { category: "HARM_CATEGORY_DANGEROUS_CONTENT", threshold: "BLOCK_NONE" },
      ],
    };

    const reply = await callAIWithFallback(GEMINI_API_KEY, contents, config);

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    const errMsg = error instanceof Error ? error.message : String(error);
    console.error("Resi chat error:", errMsg);
    return new Response(
      JSON.stringify({ reply: "Ops, estou com muitas conversas agora. Tente novamente em alguns segundos! 🌿" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
