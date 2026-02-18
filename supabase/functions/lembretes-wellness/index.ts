import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";

/**
 * Smart wellness reminders - designed to run via pg_cron daily at 10am.
 * Checks which users haven't done their daily check-in and sends a notification.
 * Also alerts about broken streaks.
 */
serve(async (req) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const supabase = createServiceClient();
    const today = new Date().toISOString().split("T")[0];

    // Find users who have at least 1 checkin but none today
    const { data: activeUsers } = await supabase
      .from("wellness_checkins")
      .select("user_id")
      .order("data", { ascending: false });

    if (!activeUsers || activeUsers.length === 0) {
      return new Response(JSON.stringify({ notified: 0 }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    // Get unique user IDs who have used the tracker
    const uniqueUsers = [...new Set(activeUsers.map((u: any) => u.user_id))];

    // Check which ones already did today's checkin
    const { data: todayCheckins } = await supabase
      .from("wellness_checkins")
      .select("user_id")
      .eq("data", today);

    const todayUserIds = new Set((todayCheckins || []).map((c: any) => c.user_id));

    // Users who haven't checked in today
    const missingUsers = uniqueUsers.filter((uid) => !todayUserIds.has(uid));

    let notified = 0;

    for (const userId of missingUsers) {
      // Check if already notified today
      const { data: existing } = await supabase
        .from("notificacoes")
        .select("id")
        .eq("user_id", userId)
        .eq("tipo", "wellness")
        .gte("created_at", today)
        .limit(1);

      if (existing && existing.length > 0) continue;

      // Get streak info - last checkin date
      const { data: lastCheckin } = await supabase
        .from("wellness_checkins")
        .select("data")
        .eq("user_id", userId)
        .order("data", { ascending: false })
        .limit(1)
        .single();

      let message = "Não esqueça do seu check-in de bem-estar hoje! Acompanhar seu humor e energia faz toda a diferença. 💚";
      let title = "Check-in de hoje 🌿";

      if (lastCheckin) {
        const lastDate = new Date(lastCheckin.data);
        const diffDays = Math.floor((Date.now() - lastDate.getTime()) / (1000 * 60 * 60 * 24));

        if (diffDays >= 3) {
          title = "Sentimos sua falta! 🌱";
          message = `Faz ${diffDays} dias que você não registra um check-in. Voltar ao hábito é mais fácil do que parece!`;
        } else if (diffDays === 2) {
          title = "Mantenha o ritmo! 🔥";
          message = "Você perdeu o check-in de ontem. Registre hoje para não perder sua sequência!";
        }
      }

      await supabase.from("notificacoes").insert({
        user_id: userId,
        titulo: title,
        mensagem: message,
        tipo: "wellness",
      });

      notified++;
    }

    return new Response(JSON.stringify({ notified, total_missing: missingUsers.length }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("lembretes-wellness error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
