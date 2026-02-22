import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Modelos disponíveis na API v1beta — em ordem de fallback
const GEMINI_MODELS = [
  { model: "gemini-2.0-flash", version: "v1beta" },
  { model: "gemini-2.0-flash-lite", version: "v1beta" },
];

async function callGeminiWithFallback(apiKey: string, contents: any[], config: any): Promise<string> {
  // Try Gemini models first (free)
  for (let i = 0; i < GEMINI_MODELS.length; i++) {
    const { model, version } = GEMINI_MODELS[i];
    const url = `https://generativelanguage.googleapis.com/${version}/models/${model}:generateContent`;
    
    if (i > 0) {
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    
    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": apiKey },
        body: JSON.stringify({ contents, ...config }),
      });

      if (response.status === 429) {
        console.log(`Modelo ${model} (${version}) rate limited (429), tentando próximo...`);
        continue;
      }

      if (!response.ok) {
        const errText = await response.text();
        console.error(`Gemini ${model} erro ${response.status}:`, errText);
        continue;
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      if (text) {
        console.log(`✅ Respondido com modelo: ${model} (${version})`);
        return text;
      }
    } catch (e) {
      console.error(`Erro ao chamar ${model}:`, e);
      continue;
    }
  }

  // Fallback: Lovable AI Gateway
  console.log("⚡ Todos Gemini falharam, usando Lovable AI Gateway como fallback...");
  const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
  if (!LOVABLE_API_KEY) {
    throw new Error("Todos os modelos Gemini falharam e LOVABLE_API_KEY não configurada");
  }

  const messages = contents.map((c: any) => ({
    role: c.role === "model" ? "assistant" : "user",
    content: c.parts.map((p: any) => p.text).join("\n"),
  }));

  const lovableRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-lite",
      messages,
      max_tokens: config.generationConfig?.maxOutputTokens || 500,
      temperature: config.generationConfig?.temperature || 0.7,
    }),
  });

  if (!lovableRes.ok) {
    const errText = await lovableRes.text();
    console.error("Lovable AI fallback error:", lovableRes.status, errText);
    throw new Error("Todos os modelos falharam");
  }

  const lovableData = await lovableRes.json();
  const text = lovableData.choices?.[0]?.message?.content;
  if (text) {
    console.log("✅ Respondido via Lovable AI Gateway (fallback)");
    return text;
  }

  throw new Error("Todos os modelos Gemini e Lovable AI falharam");
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

    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) {
      return new Response(JSON.stringify({ reply: "Serviço temporariamente indisponível. Tente novamente! 🙏" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

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

    const reply = await callGeminiWithFallback(GEMINI_API_KEY, contents, config);

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
