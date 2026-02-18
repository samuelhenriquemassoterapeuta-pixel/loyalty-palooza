import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createUserClient, createServiceClient } from "../_shared/supabase-client.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

const STREAK_MILESTONES: Record<number, number> = {
  3: 2,   // 3 days → R$2
  7: 5,   // 7 days → R$5
  14: 10, // 14 days → R$10
  21: 15, // 21 days → R$15
  30: 25, // 30 days → R$25
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Not authenticated");

    const userClient = createUserClient(authHeader);
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const svc = createServiceClient();
    const todayStr = new Date().toISOString().split("T")[0];

    // Get current streak record
    const { data: streak } = await svc
      .from("wellness_streaks")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    // Count total checkins
    const { count } = await svc
      .from("wellness_checkins")
      .select("id", { count: "exact", head: true })
      .eq("user_id", user.id);

    const totalCheckins = count || 0;

    if (!streak) {
      // First ever check-in — create streak record
      await svc.from("wellness_streaks").insert({
        user_id: user.id,
        streak_atual: 1,
        melhor_streak: 1,
        ultimo_checkin: todayStr,
        total_checkins: totalCheckins,
      });

      return json({ streak_atual: 1, bonus: null, total_checkins: totalCheckins });
    }

    // Already checked in today
    if (streak.ultimo_checkin === todayStr) {
      await svc.from("wellness_streaks").update({ total_checkins: totalCheckins }).eq("id", streak.id);
      return json({ streak_atual: streak.streak_atual, bonus: null, total_checkins: totalCheckins });
    }

    // Calculate if consecutive day
    const lastDate = new Date(streak.ultimo_checkin + "T12:00:00Z");
    const todayDate = new Date(todayStr + "T12:00:00Z");
    const diffDays = Math.round((todayDate.getTime() - lastDate.getTime()) / 86400000);

    let newStreak: number;
    if (diffDays === 1) {
      newStreak = streak.streak_atual + 1;
    } else {
      newStreak = 1; // streak broken
    }

    const newBest = Math.max(streak.melhor_streak, newStreak);

    // Check milestone bonus
    let bonusAmount: number | null = null;
    if (STREAK_MILESTONES[newStreak]) {
      bonusAmount = STREAK_MILESTONES[newStreak];

      // Credit cashback
      await svc.from("transacoes").insert({
        user_id: user.id,
        tipo: "cashback",
        valor: bonusAmount,
        descricao: `Bônus de streak wellness! 🔥 ${newStreak} dias consecutivos!`,
        expira_em: new Date(Date.now() + 90 * 86400000).toISOString(),
      });

      // Notify
      await svc.from("notificacoes").insert({
        user_id: user.id,
        titulo: `Streak de ${newStreak} dias! 🔥`,
        mensagem: `Incrível! Você manteve ${newStreak} dias consecutivos de check-in e ganhou R$ ${bonusAmount.toFixed(2).replace(".", ",")} de cashback!`,
        tipo: "cashback",
      });
    }

    // Update streak
    await svc.from("wellness_streaks").update({
      streak_atual: newStreak,
      melhor_streak: newBest,
      ultimo_checkin: todayStr,
      total_checkins: totalCheckins,
      bonus_total_creditado: streak.bonus_total_creditado + (bonusAmount || 0),
      updated_at: new Date().toISOString(),
    }).eq("id", streak.id);

    return json({
      streak_atual: newStreak,
      melhor_streak: newBest,
      bonus: bonusAmount,
      total_checkins: totalCheckins,
    });
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function json(data: unknown) {
  return new Response(JSON.stringify(data), {
    headers: { "Access-Control-Allow-Origin": "*", "Content-Type": "application/json" },
  });
}
