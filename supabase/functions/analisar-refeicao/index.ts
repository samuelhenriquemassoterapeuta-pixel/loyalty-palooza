// ============================================================
// 🌿 RESINKRA - Analisar Refeição via Gemini Vision
// Recebe imagem base64, extrai dados nutricionais com IA
// e insere automaticamente no diario_alimentar
// ============================================================

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // ── Auth ──────────────────────────────────────────────────
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return new Response(JSON.stringify({ error: "Não autorizado" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } }
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: authData, error: authError } = await supabase.auth.getClaims(token);
    if (authError || !authData?.claims) {
      return new Response(JSON.stringify({ error: "Token inválido" }), {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
    const userId = authData.claims.sub;

    // ── Payload ───────────────────────────────────────────────
    const { imageBase64, mimeType = "image/jpeg", tipo_refeicao = "almoco", foto_url } =
      await req.json();

    if (!imageBase64) {
      return new Response(JSON.stringify({ error: "imageBase64 é obrigatório" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // ── Gemini Vision ─────────────────────────────────────────
    const GEMINI_API_KEY = Deno.env.get("GEMINI_API_KEY");
    if (!GEMINI_API_KEY) throw new Error("GEMINI_API_KEY não configurada");

    const geminiResponse = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  inline_data: {
                    mime_type: mimeType,
                    data: imageBase64,
                  },
                },
                {
                  text: `Você é um nutricionista especialista. Analise esta imagem de refeição e responda APENAS em JSON válido com esta estrutura (sem markdown, sem blocos de código):
{
  "descricao": "descrição resumida do prato em 1-2 frases",
  "alimentos": ["lista", "de", "alimentos", "identificados"],
  "calorias_estimadas": 350,
  "proteinas_g": 25,
  "carboidratos_g": 40,
  "gorduras_g": 12,
  "agua_ml": 0,
  "observacoes": "observações nutricionais relevantes ou dicas"
}
Se não conseguir identificar alimentos na imagem, retorne o JSON com descricao "Alimento não identificado" e demais campos como null.`,
                },
              ],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 512,
          },
        }),
      }
    );

    if (!geminiResponse.ok) {
      const errText = await geminiResponse.text();
      console.error("Gemini error:", geminiResponse.status, errText);
      throw new Error(`Gemini Vision retornou erro ${geminiResponse.status}`);
    }

    const geminiData = await geminiResponse.json();
    const rawText = geminiData?.candidates?.[0]?.content?.parts?.[0]?.text ?? "";

    // ── Parse JSON da resposta ────────────────────────────────
    let analise: Record<string, any> = {};
    try {
      // Remove possíveis blocos de markdown que o modelo adicione
      const cleaned = rawText.replace(/```json?/g, "").replace(/```/g, "").trim();
      analise = JSON.parse(cleaned);
    } catch {
      console.warn("Falha ao parsear JSON do Gemini, usando texto bruto:", rawText);
      analise = { descricao: rawText || "Refeição analisada", observacoes: rawText };
    }

    // ── Insert no diario_alimentar ────────────────────────────
    const { data: registrado, error: insertError } = await supabase
      .from("diario_alimentar")
      .insert({
        user_id: userId,
        data: new Date().toISOString().split("T")[0],
        tipo_refeicao,
        descricao: analise.descricao ?? "Refeição registrada via IA",
        observacoes: [
          analise.observacoes,
          analise.alimentos?.length
            ? `Alimentos: ${analise.alimentos.join(", ")}`
            : null,
          analise.calorias_estimadas != null
            ? `~${analise.calorias_estimadas} kcal | Prot: ${analise.proteinas_g ?? "?"}g | Carb: ${analise.carboidratos_g ?? "?"}g | Gord: ${analise.gorduras_g ?? "?"}g`
            : null,
        ]
          .filter(Boolean)
          .join("\n") || null,
        agua_ml: analise.agua_ml ?? null,
        foto_url: foto_url ?? null,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      throw new Error("Erro ao salvar no diário alimentar");
    }

    return new Response(
      JSON.stringify({
        success: true,
        registro: registrado,
        analise_ia: analise,
      }),
      {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("analisar-refeicao error:", err);
    return new Response(
      JSON.stringify({
        error: err instanceof Error ? err.message : "Erro interno",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
