import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createUserClient, createServiceClient } from "../_shared/supabase-client.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) throw new Error("Not authenticated");

    const userClient = createUserClient(authHeader);
    const { data: { user } } = await userClient.auth.getUser();
    if (!user) throw new Error("Not authenticated");

    const serviceClient = createServiceClient();

    // Fetch all active conquistas
    const { data: conquistas } = await serviceClient
      .from("wellness_conquistas")
      .select("*")
      .eq("ativo", true);

    if (!conquistas || conquistas.length === 0) {
      return new Response(JSON.stringify({ unlocked: [] }), { headers: { ...corsHeaders, "Content-Type": "application/json" } });
    }

    // Fetch already unlocked
    const { data: already } = await serviceClient
      .from("wellness_conquistas_usuario")
      .select("conquista_id")
      .eq("user_id", user.id);

    const unlockedIds = new Set((already || []).map((a: any) => a.conquista_id));

    // Fetch user stats
    const { data: streakData } = await serviceClient
      .from("wellness_streaks")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    const { data: allCheckins } = await serviceClient
      .from("wellness_checkins")
      .select("data, humor, energia, sono_horas, agua_litros, estresse")
      .eq("user_id", user.id)
      .order("data", { ascending: false })
      .limit(100);

    const { data: metas } = await serviceClient
      .from("wellness_metas")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle();

    const totalCheckins = streakData?.total_checkins || (allCheckins?.length || 0);
    const streakAtual = streakData?.streak_atual || 0;
    const checkins = allCheckins || [];

    // Calculate meta-based streaks
    const metaAguaDias = countMetaDays(checkins, "agua_litros", metas?.meta_agua_litros || 2);
    const metaSonoDias = countMetaDays(checkins, "sono_horas", metas?.meta_sono_horas || 7);
    const energiaAltaDias = countConsecutiveDays(checkins, "energia", 4);
    const humorAltoDias = countConsecutiveDays(checkins, "humor", 4);

    const newlyUnlocked: string[] = [];

    for (const c of conquistas) {
      if (unlockedIds.has(c.id)) continue;

      let met = false;
      switch (c.condicao_tipo) {
        case "checkins_total":
          met = totalCheckins >= c.condicao_valor;
          break;
        case "streak":
          met = streakAtual >= c.condicao_valor;
          break;
        case "meta_agua_dias":
          met = metaAguaDias >= c.condicao_valor;
          break;
        case "meta_sono_dias":
          met = metaSonoDias >= c.condicao_valor;
          break;
        case "energia_alta_dias":
          met = energiaAltaDias >= c.condicao_valor;
          break;
        case "humor_alto_dias":
          met = humorAltoDias >= c.condicao_valor;
          break;
      }

      if (met) {
        const { error } = await serviceClient
          .from("wellness_conquistas_usuario")
          .insert({ user_id: user.id, conquista_id: c.id });
        
        if (!error) {
          newlyUnlocked.push(c.titulo);

          // Send notification
          await serviceClient.from("notificacoes").insert({
            user_id: user.id,
            titulo: `Conquista desbloqueada! ${c.icone}`,
            mensagem: `Você desbloqueou "${c.titulo}" — ${c.descricao}`,
            tipo: "cashback",
          });
        }
      }
    }

    return new Response(
      JSON.stringify({ unlocked: newlyUnlocked }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (e) {
    return new Response(
      JSON.stringify({ error: e.message }),
      { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

function countMetaDays(checkins: any[], field: string, metaValue: number): number {
  let count = 0;
  for (const c of checkins) {
    if (c[field] != null && c[field] >= metaValue) count++;
    else break; // consecutive from most recent
  }
  return count;
}

function countConsecutiveDays(checkins: any[], field: string, minValue: number): number {
  let count = 0;
  for (const c of checkins) {
    if (c[field] != null && c[field] >= minValue) count++;
    else break;
  }
  return count;
}
