import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    const supabase = createServiceClient();

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

    const dayStr = dayFormatter.format(now);
    const dayMap: Record<string, number> = {
      Sun: 0, Mon: 1, Tue: 2, Wed: 3, Thu: 4, Fri: 5, Sat: 6,
    };
    const currentDay = dayMap[dayStr] ?? new Date().getDay();

    console.log(`Processando lembretes: dia=${currentDay}, hora=${currentTimeStr} (São Paulo)`);

    const { data: lembretes, error: fetchError } = await supabase
      .from("lembretes_alongamento")
      .select("id, user_id, horario, dias_semana, mensagem_personalizada")
      .eq("ativo", true);

    if (fetchError) throw fetchError;

    let notificacoesEnviadas = 0;

    for (const lembrete of lembretes || []) {
      if (!lembrete.dias_semana.includes(currentDay)) continue;

      const [lembreteHour, lembreteMinute] = lembrete.horario.split(":").map(Number);
      const lembreteMinutes = lembreteHour * 60 + lembreteMinute;
      const currentMinutes = currentHour * 60 + currentMinute;
      const diff = Math.abs(currentMinutes - lembreteMinutes);

      if (diff > 30) continue;

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

    return jsonResponse({
      success: true,
      message: `${notificacoesEnviadas} lembretes de alongamento enviados`,
      processed: lembretes?.length || 0,
    });
  } catch (error: any) {
    console.error("Erro ao processar lembretes de alongamento:", error);
    return errorResponse(error.message, 500);
  }
});
