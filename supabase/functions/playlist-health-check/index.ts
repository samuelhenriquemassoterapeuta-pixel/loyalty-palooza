import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { createLogger } from "../_shared/logger.ts";

serve(async (req: Request) => {
  const log = createLogger("playlist-health-check");

  try {
    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!
    );

    const { data: faixas } = await supabase
      .from("playlist_faixas")
      .select("*")
      .eq("ativo", true)
      .or(
        "last_health_check.is.null,last_health_check.lt." +
          new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      );

    if (!faixas || faixas.length === 0) {
      log.info("Nenhuma faixa para verificar");
      return new Response(JSON.stringify({ checked: 0 }), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    }

    let healthy = 0;
    let broken = 0;

    for (const faixa of faixas) {
      let isHealthy = false;

      if (faixa.audio_url) {
        try {
          const resp = await fetch(faixa.audio_url, { method: "HEAD" });
          isHealthy = resp.ok;
        } catch {
          isHealthy = false;
        }
      }

      if (!isHealthy && faixa.youtube_id) {
        try {
          const resp = await fetch(
            `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${faixa.youtube_id}&format=json`
          );
          isHealthy = resp.ok;
        } catch {
          isHealthy = false;
        }
      }

      if (!isHealthy && faixa.spotify_embed_url) {
        try {
          const resp = await fetch(faixa.spotify_embed_url, { method: "HEAD" });
          isHealthy = resp.status !== 404;
        } catch {
          isHealthy = false;
        }
      }

      const status = isHealthy ? "ok" : "broken";
      await supabase
        .from("playlist_faixas")
        .update({
          health_status: status,
          last_health_check: new Date().toISOString(),
        })
        .eq("id", faixa.id);

      if (isHealthy) healthy++;
      else broken++;
    }

    const result = { checked: faixas.length, healthy, broken };

    if (broken > 0) {
      log.warn(`${broken} faixas com links quebrados`, result);
    } else {
      log.info("Todas as faixas saudáveis", result);
    }

    return new Response(JSON.stringify(result), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    log.error("Erro no health check", {}, error as Error);
    return new Response(
      JSON.stringify({ error: (error as Error).message }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
});
