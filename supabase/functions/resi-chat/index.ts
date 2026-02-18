import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

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

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${Deno.env.get("LOVABLE_API_KEY")}`,
        "HTTP-Referer": "https://resinkra.com",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Desculpe, não consegui processar sua pergunta. Tente novamente! 🌿";

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Resi chat error:", error);
    return new Response(
      JSON.stringify({ reply: "Ops, tive um probleminha técnico. Tente novamente em alguns instantes! 🙏" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
