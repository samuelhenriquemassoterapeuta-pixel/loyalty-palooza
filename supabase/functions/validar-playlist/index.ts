import { corsHeaders, handleCors } from "../_shared/cors.ts";

Deno.serve(async (req) => {
  const corsResp = handleCors(req);
  if (corsResp) return corsResp;

  try {
    const { link } = await req.json();

    if (!link || typeof link !== "string") {
      return new Response(JSON.stringify({ error: "Link é obrigatório" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    let videoId: string | null = null;
    let service: string | null = null;

    const youtubeMatch = link.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    if (youtubeMatch) {
      videoId = youtubeMatch[1];
      service = "youtube";
    }

    const spotifyMatch = link.match(/open\.spotify\.com\/(?:playlist|track|album)\/([a-zA-Z0-9]+)/);
    if (!videoId && spotifyMatch) {
      videoId = spotifyMatch[1];
      service = "spotify";
    }

    if (!videoId || !service) {
      return new Response(JSON.stringify({ error: "Link inválido. Use YouTube ou Spotify." }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const metadata = {
      video_id: videoId,
      service,
      thumbnail:
        service === "youtube"
          ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
          : null,
      valid: true,
    };

    return new Response(JSON.stringify(metadata), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: (error as Error).message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
