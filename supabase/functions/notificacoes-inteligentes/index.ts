import { createClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const results = {
      cashback_expirando: 0,
      usuarios_inativos: 0,
      assinaturas_expirando: 0,
    };

    // 1. Notify about expiring cashback (reuses existing function)
    const { data: expiringCashback } = await supabase.rpc("notify_expiring_cashback");
    results.cashback_expirando = expiringCashback?.length || 0;

    // 2. Detect inactive users (no appointments in 30+ days)
    const { data: inactiveUsers } = await supabase
      .from("profiles")
      .select("id, nome")
      .not("id", "in", `(
        SELECT DISTINCT user_id FROM agendamentos
        WHERE created_at > now() - interval '30 days'
      )`);

    if (inactiveUsers && inactiveUsers.length > 0) {
      for (const user of inactiveUsers) {
        // Check if already notified recently
        const { data: existing } = await supabase
          .from("notificacoes")
          .select("id")
          .eq("user_id", user.id)
          .eq("tipo", "lembrete")
          .like("titulo", "%Sentimos sua falta%")
          .gt("created_at", new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())
          .limit(1);

        if (!existing || existing.length === 0) {
          await supabase.from("notificacoes").insert({
            user_id: user.id,
            titulo: "Sentimos sua falta! 🌿",
            mensagem: `${user.nome || "Oi"}! Faz tempo que não te vemos. Que tal agendar uma sessão de relaxamento? Seu corpo merece!`,
            tipo: "lembrete",
          });
          results.usuarios_inativos++;
        }
      }
    }

    // 3. Expiring subscriptions (7 days)
    const { data: expiringSubs } = await supabase
      .from("assinaturas_usuario")
      .select("id, user_id, data_fim, plano:assinaturas_planos(nome)")
      .eq("status", "ativo")
      .not("data_fim", "is", null)
      .lt("data_fim", new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString())
      .gt("data_fim", new Date().toISOString());

    if (expiringSubs) {
      for (const sub of expiringSubs) {
        const { data: existing } = await supabase
          .from("notificacoes")
          .select("id")
          .eq("user_id", sub.user_id)
          .like("titulo", "%assinatura%expirando%")
          .gt("created_at", new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString())
          .limit(1);

        if (!existing || existing.length === 0) {
          const planoNome = (sub.plano as any)?.nome || "VIP";
          await supabase.from("notificacoes").insert({
            user_id: sub.user_id,
            titulo: "Sua assinatura está expirando! 👑",
            mensagem: `Seu plano ${planoNome} expira em breve. Renove para continuar aproveitando os benefícios exclusivos!`,
            tipo: "assinatura",
          });
          results.assinaturas_expirando++;
        }
      }
    }

    // 4. Process expired cashback
    await supabase.rpc("process_expired_cashback");

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: any) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
