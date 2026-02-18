import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, handleCors } from "../_shared/cors.ts";
import { createUserClient } from "../_shared/supabase-client.ts";

serve(async (req) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const authHeader = req.headers.get("Authorization") ?? "";
    const supabase = createUserClient(authHeader);
    const { data: { user }, error: authErr } = await supabase.auth.getUser();
    if (authErr || !user) {
      return new Response(JSON.stringify({ error: "Não autenticado" }), {
        status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const { entry } = await req.json();
    if (!entry || typeof entry !== "string" || entry.trim().length < 10) {
      return new Response(JSON.stringify({ error: "Texto muito curto" }), {
        status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Fetch recent checkins for context
    const { data: checkins } = await supabase
      .from("wellness_checkins")
      .select("data, humor, energia, estresse, dor")
      .eq("user_id", user.id)
      .order("data", { ascending: false })
      .limit(5);

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    const prompt = `O usuário escreveu a seguinte reflexão no diário de humor:

"${entry}"

Dados de bem-estar recentes:
${JSON.stringify(checkins || [], null, 2)}

Gere uma reflexão empática e útil usando a tool fornecida.`;

    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-3-flash-preview",
        messages: [
          { role: "system", content: "Você é uma psicóloga compassiva e acolhedora. Gere reflexões curtas, empáticas e acionáveis baseadas no diário de humor do usuário. Nunca dê diagnósticos médicos. Responda em português brasileiro." },
          { role: "user", content: prompt },
        ],
        tools: [{
          type: "function",
          function: {
            name: "journal_reflection",
            description: "Gera reflexão do diário de humor",
            parameters: {
              type: "object",
              properties: {
                sentiment: { type: "string", enum: ["positivo", "neutro", "negativo", "misto"] },
                sentiment_emoji: { type: "string" },
                reflection: { type: "string", description: "Reflexão empática de 2-3 frases" },
                affirmation: { type: "string", description: "Afirmação positiva curta" },
                suggestion: { type: "string", description: "Sugestão prática de autocuidado" },
                patterns: {
                  type: "array",
                  items: { type: "string" },
                  description: "Padrões emocionais identificados (máx 3)",
                },
              },
              required: ["sentiment", "sentiment_emoji", "reflection", "affirmation", "suggestion"],
            },
          },
        }],
        tool_choice: { type: "function", function: { name: "journal_reflection" } },
      }),
    });

    if (!aiResponse.ok) {
      console.error("AI error:", aiResponse.status, await aiResponse.text());
      throw new Error("Erro ao gerar reflexão");
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];
    if (!toolCall) throw new Error("Resposta AI inválida");

    return new Response(JSON.stringify(JSON.parse(toolCall.function.arguments)), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("reflexao-diario error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
