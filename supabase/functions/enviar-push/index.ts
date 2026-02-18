import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

// Web Push using the web-push library via npm: specifier
import webpush from "npm:web-push@3.6.7";

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const VAPID_PUBLIC_KEY = Deno.env.get("VAPID_PUBLIC_KEY");
    const VAPID_PRIVATE_KEY = Deno.env.get("VAPID_PRIVATE_KEY");

    if (!VAPID_PUBLIC_KEY || !VAPID_PRIVATE_KEY) {
      throw new Error("VAPID keys not configured");
    }

    webpush.setVapidDetails(
      "mailto:contato@resinkra.com.br",
      VAPID_PUBLIC_KEY,
      VAPID_PRIVATE_KEY
    );

    const supabase = createServiceClient();
    const { user_id, titulo, mensagem, url } = await req.json();

    if (!user_id || !titulo) throw new Error("user_id and titulo are required");

    // Check push preference
    const { data: profile } = await supabase
      .from("profiles")
      .select("notif_push")
      .eq("id", user_id)
      .maybeSingle();

    if (!profile?.notif_push) {
      return jsonResponse({ success: true, skipped: true, reason: "Push disabled" });
    }

    // Get subscriptions
    const { data: subscriptions } = await supabase
      .from("push_subscriptions")
      .select("*")
      .eq("user_id", user_id);

    if (!subscriptions || subscriptions.length === 0) {
      return jsonResponse({ success: true, skipped: true, reason: "No subscriptions" });
    }

    const payload = JSON.stringify({
      title: titulo,
      body: mensagem || "",
      icon: "/pwa-192x192.png",
      badge: "/pwa-192x192.png",
      url: url || "/notificacoes",
    });

    let sent = 0;
    let failed = 0;

    for (const sub of subscriptions) {
      try {
        await webpush.sendNotification(
          {
            endpoint: sub.endpoint,
            keys: { p256dh: sub.p256dh, auth: sub.auth },
          },
          payload
        );
        sent++;
      } catch (err: any) {
        console.error(`Push failed for ${sub.endpoint.substring(0, 50)}:`, err.message);
        // Remove expired subscriptions
        if (err.statusCode === 410 || err.statusCode === 404) {
          await supabase.from("push_subscriptions").delete().eq("id", sub.id);
        }
        failed++;
      }
    }

    console.log(`Push: ${sent} sent, ${failed} failed for user ${user_id.substring(0, 8)}`);
    return jsonResponse({ success: true, sent, failed });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro enviar-push:", msg);
    return errorResponse(msg, 500);
  }
});
