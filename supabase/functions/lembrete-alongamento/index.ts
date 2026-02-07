import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    // Get current time in São Paulo timezone
    const now = new Date();
    const spFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });
    const dayFormatter = new Intl.DateTimeFormat("en-US", {
      timeZone: "America/Sao_Paulo",
      weekday: "short",
    });

    const parts = spFormatter.formatToParts(now);
    const currentHour = parseInt(parts.find((p) => p.type === "hour")!.value);
    const currentMinute = parseInt(parts.find((p) => p.type === "minute")!.value);
    const currentTimeStr = `${String(currentHour).padStart(2, "0")}:${String(currentMinute).padStart(2, "0")}`;

    // Get day of week (0=Sunday, 1=Monday...6=Saturday) in SP timezone
    const dayStr = dayFormatter.format(now);
    const dayMap: Record<string, number> = {
      Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
    };
    const currentDay = dayMap[dayStr] ?? new Date().getDay();

    console.log(`Processando lembretes: dia=${currentDay}, hora=${currentTimeStr} (São Paulo)`);

    // Fetch active reminders that match the current time window (±30 min) and day
    const { data: lembretes, error: fetchError } = await supabase
      .from("lembretes_alongamento")
      .select("id, user_id, horario, dias_semana, mensagem_personalizada")
      .eq("ativo", true);

    if (fetchError) throw fetchError;

    let notificacoesEnviadas = 0;

    for (const lembrete of lembretes || []) {
      // Check if today is in the selected days
      if (!lembrete.dias_semana.includes(currentDay)) {
        continue;
      }

      // Check if the time matches (within 30 minute window)
      const [lembreteHour, lembreteMinute] = lembrete.horario.split(":").map(Number);
      const lembreteMinutes = lembreteHour * 60 + lembreteMinute;
      const currentMinutes = currentHour * 60 + currentMinute;
      const diff = Math.abs(currentMinutes - lembreteMinutes);

      if (diff > 30) {
        continue;
      }

      // Check if already sent today (avoid duplicates)
      const todayStart = new Date();
      todayStart.setHours(0, 0, 0, 0);

      const { data: existente } = await supabase
        .from("notificacoes")
        .select("id")
        .eq("user_id", lembrete.user_id)
        .eq("tipo", "lembrete")
        .ilike("titulo", "%alongamento%")
        .gte("created_at", todayStart.toISOString())
        .maybeSingle();

      if (existente) {
        console.log(`Lembrete já enviado hoje para user ${lembrete.user_id.substring(0, 8)}`);
        continue;
      }

      // Build notification message
      const mensagemPadrao = "Hora de alongar! Dedique alguns minutos para cuidar do seu corpo e melhorar sua flexibilidade. 🧘‍♀️";
      const mensagem = lembrete.mensagem_personalizada || mensagemPadrao;

      const { error: insertError } = await supabase
        .from("notificacoes")
        .insert({
          user_id: lembrete.user_id,
          titulo: "Lembrete de alongamento 🧘",
          mensagem,
          tipo: "lembrete",
        });

      if (insertError) {
        console.error(`Erro ao criar notificação para ${lembrete.user_id.substring(0, 8)}:`, insertError);
      } else {
        notificacoesEnviadas++;
        console.log(`Lembrete enviado para user ${lembrete.user_id.substring(0, 8)}`);
      }
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: `${notificacoesEnviadas} lembretes de alongamento enviados`,
        processed: lembretes?.length || 0,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: any) {
    console.error("Erro ao processar lembretes de alongamento:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
