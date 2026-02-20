/**
 * @module analisar-postura
 * @description Analisa imagens posturais usando Lovable AI (Gemini Vision) para calcular
 * desvios biomecânicos e gerar relatório clínico textual.
 *
 * Recebe 4 vistas (frente, costas, ladoEsquerdo, ladoDireito) como data URLs base64
 * e retorna ângulos estimados + relatório de texto para o terapeuta.
 *
 * Usa tool calling para garantir JSON estruturado na resposta.
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, handleCors } from "../_shared/cors.ts";
import { requireAuth } from "../_shared/auth.ts";

serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    await requireAuth(req);

    const { vistas } = await req.json();
    if (!vistas || typeof vistas !== "object") {
      return new Response(JSON.stringify({ error: "vistas é obrigatório" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY não configurada");
    }

    // Montar mensagem com as imagens disponíveis para análise multimodal
    const imageContent: Array<{ type: string; image_url?: { url: string }; text?: string }> = [
      {
        type: "text",
        text: `Você é um especialista em análise postural biomecânica. Analise as imagens posturais fornecidas e estime os ângulos de desvio. Seja preciso e objetivo.`,
      },
    ];

    const vistaLabels: Record<string, string> = {
      frente: "Vista Anterior (Frente)",
      costas: "Vista Posterior (Costas)",
      ladoEsquerdo: "Vista Lateral Esquerda",
      ladoDireito: "Vista Lateral Direita",
    };

    let imagensAnalisadas = 0;
    for (const [chave, dataUrl] of Object.entries(vistas)) {
      if (dataUrl && typeof dataUrl === "string" && dataUrl.startsWith("data:image")) {
        imageContent.push({
          type: "text",
          text: `\n--- ${vistaLabels[chave] || chave} ---`,
        });
        imageContent.push({
          type: "image_url",
          image_url: { url: dataUrl },
        });
        imagensAnalisadas++;
      }
    }

    if (imagensAnalisadas === 0) {
      // Fallback com análise estimada sem imagens
      const fallback = {
        angulos: {
          desvioColuna: 0,
          inclinacaoPelvica: 0,
          ombrosDesnivel: 0,
          projecaoCabeca: 0,
          anterversaoPelvica: 0,
        },
        relatorio: "Nenhuma imagem foi fornecida para análise. Capture as 4 vistas posturais para obter o relatório completo.",
      };
      return new Response(JSON.stringify(fallback), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const aiResponse = await fetch(
      "https://ai.gateway.lovable.dev/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${LOVABLE_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-pro", // Pro para análise visual mais precisa
          messages: [
            {
              role: "user",
              content: imageContent,
            },
          ],
          tools: [
            {
              type: "function",
              function: {
                name: "relatorio_postural",
                description: "Gera relatório de análise postural com ângulos e recomendações",
                parameters: {
                  type: "object",
                  properties: {
                    angulos: {
                      type: "object",
                      description: "Ângulos de desvio em graus (valores positivos = desvio para direita/anterior, negativos = esquerda/posterior)",
                      properties: {
                        desvioColuna: { type: "number", description: "Desvio lateral da coluna vertebral em graus" },
                        inclinacaoPelvica: { type: "number", description: "Inclinação pélvica em graus" },
                        ombrosDesnivel: { type: "number", description: "Diferença de altura entre ombros em graus" },
                        projecaoCabeca: { type: "number", description: "Projeção anterior da cabeça em cm estimados" },
                        anterversaoPelvica: { type: "number", description: "Anteversão pélvica em graus" },
                      },
                      required: ["desvioColuna", "inclinacaoPelvica", "ombrosDesnivel", "projecaoCabeca", "anterversaoPelvica"],
                      additionalProperties: false,
                    },
                    relatorio: {
                      type: "string",
                      description: "Relatório clínico detalhado em português com achados, interpretação e recomendações de exercícios",
                    },
                    classificacao: {
                      type: "string",
                      enum: ["excelente", "bom", "regular", "atenção"],
                      description: "Classificação geral da postura",
                    },
                  },
                  required: ["angulos", "relatorio", "classificacao"],
                  additionalProperties: false,
                },
              },
            },
          ],
          tool_choice: { type: "function", function: { name: "relatorio_postural" } },
        }),
      },
    );

    if (!aiResponse.ok) {
      const errText = await aiResponse.text();
      console.error("Lovable AI error:", aiResponse.status, errText);

      // Fallback com dados estimados para não quebrar o fluxo
      return new Response(
        JSON.stringify({
          angulos: {
            desvioColuna: 0,
            inclinacaoPelvica: 0,
            ombrosDesnivel: 0,
            projecaoCabeca: 0,
            anterversaoPelvica: 0,
          },
          relatorio: "Análise automática temporariamente indisponível. As imagens foram salvas e podem ser analisadas manualmente pelo terapeuta.",
          classificacao: "regular",
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const aiData = await aiResponse.json();
    const toolCall = aiData.choices?.[0]?.message?.tool_calls?.[0];

    if (!toolCall) {
      throw new Error("IA não retornou análise estruturada");
    }

    const resultado = JSON.parse(toolCall.function.arguments);

    return new Response(JSON.stringify(resultado), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("analisar-postura error:", err);
    if (err instanceof Response) return err; // 401 do requireAuth
    const message = err instanceof Error ? err.message : "Erro interno";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
