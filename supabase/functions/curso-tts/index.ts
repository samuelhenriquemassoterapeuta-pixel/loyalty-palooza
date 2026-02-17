import { handleCors, corsHeaders } from "../_shared/cors.ts";
import { requireAuth } from "../_shared/auth.ts";
import { errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    await requireAuth(req);

    const { text } = await req.json();
    if (!text || typeof text !== "string") return errorResponse("Text is required", 400);

    const trimmedText = text.slice(0, 5000);
    const ELEVENLABS_API_KEY = Deno.env.get("ELEVENLABS_API_KEY");
    if (!ELEVENLABS_API_KEY) return errorResponse("ELEVENLABS_API_KEY not configured", 500);

    const voiceId = "FGY2WhTYpPnrIDTdsKH5";
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}?output_format=mp3_44100_128`, {
      method: "POST",
      headers: { "xi-api-key": ELEVENLABS_API_KEY, "Content-Type": "application/json" },
      body: JSON.stringify({ text: trimmedText, model_id: "eleven_multilingual_v2", voice_settings: { stability: 0.6, similarity_boost: 0.75, style: 0.3, use_speaker_boost: true, speed: 0.95 } }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("ElevenLabs error:", response.status, errorText);
      if (response.status === 429) return errorResponse("Rate limit exceeded. Try again later.", 429);
      return errorResponse("TTS generation failed", 500);
    }

    const audioBuffer = await response.arrayBuffer();
    return new Response(audioBuffer, { headers: { ...corsHeaders, "Content-Type": "audio/mpeg", "Cache-Control": "public, max-age=86400" } });
  } catch (e) {
    console.error("curso-tts error:", e);
    if (e instanceof Response) return e;
    return errorResponse(e instanceof Error ? e.message : "Unknown error", 500);
  }
});
