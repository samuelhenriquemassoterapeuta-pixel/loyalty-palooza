/**
 * @module voice-assistant
 * @description Assistente de voz: processa texto via Resi AI e sintetiza resposta com ElevenLabs TTS.
 *
 * FLUXO:
 * 1. Valida JWT do usuário
 * 2. Envia texto ao resi-agent-router para obter resposta inteligente
 * 3. Converte resposta em áudio via ElevenLabs
 * 4. Retorna texto + áudio base64
 *
 * CORREÇÃO CRÍTICA: usa encode() do Deno std em vez de btoa(String.fromCharCode(...))
 * que causa stack overflow em buffers de áudio grandes.
 */

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { encode as base64Encode } from "https://deno.land/std@0.168.0/encoding/base64.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders, handleCors } from "../_shared/cors.ts";
import { requireAuth } from "../_shared/auth.ts";

// Voice ID: Matilda (PT-BR compatível com multilingual_v2)
const VOICE_ID = "XrExE9yKIg1WjnnlVkGX";

serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    const { userId } = await requireAuth(req);

    const { text } = await req.json();
    if (!text || typeof text !== "string") {
      return new Response(JSON.stringify({ error: "text é obrigatório" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    if (!ELEVENLABS_API_KEY) {
      return new Response(
        JSON.stringify({ error: "ElevenLabs não configurado. Contate o administrador." }),
        { status: 503, headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    // 1. Obter resposta do Resi Agent
    let resposta = "Olá! Como posso te ajudar com seu bem-estar hoje?";

    try {
      const resiResponse = await fetch(
        `${Deno.env.get("SUPABASE_URL")}/functions/v1/resi-agent-router`,
        {
          method: "POST",
          headers: {
            Authorization: req.headers.get("Authorization")!,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ message: text, userId }),
        },
      );

      if (resiResponse.ok) {
        const resiData = await resiResponse.json();
        resposta = resiData.resposta || resiData.response || resposta;
      }
    } catch (resiErr) {
      console.warn("Resi agent indisponível, usando resposta padrão:", resiErr);
    }

    // 2. Sintetizar áudio com ElevenLabs
    const ttsResponse = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}?output_format=mp3_44100_128`,
      {
        method: "POST",
        headers: {
          "xi-api-key": ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: resposta.slice(0, 500), // Limitar para TTS rápido
          model_id: "eleven_multilingual_v2",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75,
            style: 0.2,
            use_speaker_boost: true,
          },
        }),
      },
    );

    if (!ttsResponse.ok) {
      const errText = await ttsResponse.text();
      console.error("ElevenLabs error:", ttsResponse.status, errText);

      // Retornar somente o texto se TTS falhar
      return new Response(
        JSON.stringify({ responseText: resposta, audioUrl: null }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } },
      );
    }

    const audioBuffer = await ttsResponse.arrayBuffer();

    // ✅ CORREÇÃO: usar encode() do Deno std (evita stack overflow em buffers grandes)
    const audioBase64 = base64Encode(audioBuffer);

    return new Response(
      JSON.stringify({
        responseText: resposta,
        audioUrl: `data:audio/mpeg;base64,${audioBase64}`,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error("voice-assistant error:", err);
    if (err instanceof Response) return err; // 401 do requireAuth
    const message = err instanceof Error ? err.message : "Erro interno";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
