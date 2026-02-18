import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { corsHeaders, handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";

/**
 * Smart wellness reminders + weekly AI digest.
 * Designed to run via pg_cron daily at 10am.
 * - Daily: reminds users who haven't checked in
 * - Sunday: generates a weekly AI digest for active users
 */
serve(async (req) => {
  const cors = handleCors(req);
  if (cors) return cors;

  try {
    const supabase = createServiceClient();
    const today = new Date().toISOString().split("T")[0];
    const dayOfWeek = new Date().getDay(); // 0 = Sunday

    // ═══════════════════════════════════════════
    // 1) DAILY REMINDER — users missing today's checkin
    // ═══════════════════════════════════════════
    const { data: activeUsers } = await supabase
      .from("wellness_checkins")
      .select("user_id")
      .order("data", { ascending: false });

    const uniqueUsers = [...new Set((activeUsers || []).map((u: any) => u.user_id))];

    const { data: todayCheckins } = await supabase
      .from("wellness_checkins")
      .select("user_id")
      .eq("data", today);

    const todayUserIds = new Set((todayCheckins || []).map((c: any) => c.user_id));
    const missingUsers = uniqueUsers.filter((uid) => !todayUserIds.has(uid));

    let notified = 0;

    for (const userId of missingUsers) {
      const { data: existing } = await supabase
        .from("notificacoes")
        .select("id")
        .eq("user_id", userId)
        .eq("tipo", "wellness")
        .gte("created_at", today)
        .limit(1);

      if (existing && existing.length > 0) continue;

      const { data: lastCheckin } = await supabase
        .from("wellness_checkins")
        .select("data")
        .eq("user_id", userId)
        .order("data", { ascending: false })
        .limit(1)
        .single();

      // Load user metas for personalized message
      const { data: metas } = await supabase
        .from("wellness_metas")
        .select("lembrete_checkin")
        .eq("user_id", userId)
        .maybeSingle();

      // Skip if user disabled reminders
      if (metas && metas.lembrete_checkin === false) continue;

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

    // ═══════════════════════════════════════════
    // 2) WEEKLY DIGEST (Sundays only)
    // ═══════════════════════════════════════════
    let digestCount = 0;

    if (dayOfWeek === 0) {
      const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().split("T")[0];

      // Find users with at least 3 checkins this week
      const { data: weeklyUsers } = await supabase
        .from("wellness_checkins")
        .select("user_id, humor, energia, sono_horas, estresse, agua_litros")
        .gte("data", weekAgo);

      if (weeklyUsers && weeklyUsers.length > 0) {
        // Group by user
        const userMap: Record<string, any[]> = {};
        for (const c of weeklyUsers) {
          if (!userMap[c.user_id]) userMap[c.user_id] = [];
          userMap[c.user_id].push(c);
        }

        const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");

        for (const [userId, checkins] of Object.entries(userMap)) {
          if (checkins.length < 3) continue;

          // Check if already sent this week
          const { data: existingDigest } = await supabase
            .from("notificacoes")
            .select("id")
            .eq("user_id", userId)
            .eq("tipo", "wellness_digest")
            .gte("created_at", weekAgo)
            .limit(1);

          if (existingDigest && existingDigest.length > 0) continue;

          // Load streak
          const { data: streak } = await supabase
            .from("wellness_streaks")
            .select("streak_atual")
            .eq("user_id", userId)
            .maybeSingle();

          // Load metas
          const { data: metas } = await supabase
            .from("wellness_metas")
            .select("*")
            .eq("user_id", userId)
            .maybeSingle();

          const avg = (arr: number[]) =>
            arr.length ? Math.round((arr.reduce((a, b) => a + b, 0) / arr.length) * 10) / 10 : 0;

          const stats = {
            dias: checkins.length,
            humor: avg(checkins.map(c => c.humor)),
            energia: avg(checkins.map(c => c.energia)),
            sono: avg(checkins.map(c => c.sono_horas).filter(Boolean)),
            estresse: avg(checkins.map(c => c.estresse).filter(Boolean)),
            agua: avg(checkins.map(c => c.agua_litros).filter(Boolean)),
            streak: streak?.streak_atual || 0,
          };

          let digestMessage = "";

          if (LOVABLE_API_KEY) {
            try {
              const aiRes = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
                method: "POST",
                headers: {
                  Authorization: `Bearer ${LOVABLE_API_KEY}`,
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  model: "google/gemini-2.5-flash-lite",
                  messages: [
                    {
                      role: "system",
                      content: "Você é Aria, assistente de bem-estar. Gere um resumo semanal motivacional em 2-3 frases curtas. Use emojis. Português brasileiro.",
                    },
                    {
                      role: "user",
                      content: `Resumo semanal do usuário: ${JSON.stringify(stats)}. Metas: ${JSON.stringify(metas || {})}. Gere um mini-resumo motivacional.`,
                    },
                  ],
                  max_tokens: 200,
                }),
              });

              if (aiRes.ok) {
                const aiData = await aiRes.json();
                digestMessage = aiData.choices?.[0]?.message?.content || "";
              }
            } catch (e) {
              console.error("AI digest error:", e);
            }
          }

          // Fallback if AI failed
          if (!digestMessage) {
            const humorEmoji = stats.humor >= 4 ? "😊" : stats.humor >= 3 ? "😐" : "😕";
            digestMessage = `${humorEmoji} Sua semana: humor ${stats.humor}/5, energia ${stats.energia}/5, ${stats.sono}h de sono. ` +
              `${stats.streak > 0 ? `🔥 Streak: ${stats.streak} dias!` : ""} Continue cuidando de você! 💚`;
          }

          await supabase.from("notificacoes").insert({
            user_id: userId,
            titulo: "📊 Seu resumo semanal de bem-estar",
            mensagem: digestMessage,
            tipo: "wellness_digest",
          });

          digestCount++;
        }
      }
    }

    return new Response(JSON.stringify({
      notified,
      total_missing: missingUsers.length,
      weekly_digests: digestCount,
    }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("lembretes-wellness error:", e);
    return new Response(JSON.stringify({ error: e.message }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
