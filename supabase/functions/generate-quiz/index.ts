/**
 * @module generate-quiz
 * @description Gera perguntas de múltipla escolha para uma aula do curso usando Lovable AI (Gemini).
 *
 * Recebe o ID da aula, busca o conteúdo no banco e solicita ao Lovable AI Gateway
 * 3 perguntas com 4 alternativas cada, retornando JSON estruturado via tool calling.
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, handleCors } from "../_shared/cors.ts";
import { requireAuth } from "../_shared/auth.ts";

serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    const { userId } = await requireAuth(req);

    const { aulaId } = await req.json();
    if (!aulaId) {
      return new Response(JSON.stringify({ error: "aulaId é obrigatório" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
    );

    // Buscar conteúdo da aula
    const { data: aula, error: aulaError } = await supabase
      .from("curso_aulas")
      .select("titulo, descricao, conteudo")
      .eq("id", aulaId)
      .single();

    if (aulaError || !aula) {
      return new Response(JSON.stringify({ error: "Aula não encontrada" }), {
        status: 404,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY não configurada");
    }

    const conteudo = [aula.titulo, aula.descricao, aula.conteudo]
      .filter(Boolean)
      .join("\n\n")
      .slice(0, 4000); // Limite de contexto

    // Usar tool calling para extrair JSON estruturado
    const aiResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-3-flash-preview",
          messages: [
            {
              role: "system",
              content:
                "Você é um especialista em educação. Crie perguntas claras e objetivas baseadas no conteúdo fornecido.",
            },
            {
              role: "user",
              content: `Com base no seguinte conteúdo da aula "${aula.titulo}", gere 3 perguntas de múltipla escolha em português:\n\n${conteudo}`,
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "create_quiz",
                description: "Cria quiz com perguntas de múltipla escolha",
                parameters: {
                  type: "object",
                  properties: {
                    perguntas: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          pergunta: { type: "string" },
                          alternativas: {
                            type: "array",
                            items: { type: "string" },
                            minItems: 4,
                            maxItems: 4,
                          },
                          correta: {
                            type: "integer",
                            description: "Índice da alternativa correta (0-3)",
                          },
                          explicacao: { type: "string" },
                        },
                        required: ["pergunta", "alternativas", "correta", "explicacao"],
                        additionalProperties: false,
                      },
                    },
                  },
                  required: ["perguntas"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "create_quiz" } },
        }),
      },
    );

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("Lovable AI error:", aiResponse.status, errText);
      throw new Error(`Erro na IA: ${aiResponse.status}`);
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall) {
      throw new Error("IA não retornou tool call esperada");
    }

    const quiz = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(quiz.perguntas), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("generate-quiz error:", err);
    const message = err instanceof Error ? err.message : "Erro interno";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
