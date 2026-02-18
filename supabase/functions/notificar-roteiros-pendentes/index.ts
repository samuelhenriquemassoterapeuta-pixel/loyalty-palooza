import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const supabase = createServiceClient();

    // Buscar roteiros em draft criados há mais de 3 dias que NÃO têm evento no calendário
    const threeDaysAgo = new Date(Date.now() - 3 * 86400000).toISOString();

    const { data: pendingScripts, error } = await supabase
      .from("scripts")
      .select("id, user_id, topic, content_type, created_at")
      .eq("status", "draft")
      .lt("created_at", threeDaysAgo)
      .order("created_at", { ascending: false });

    if (error) throw error;
    if (!pendingScripts || pendingScripts.length === 0) {
      return jsonResponse({ message: "Nenhum roteiro pendente encontrado", notified: 0 });
    }

    // Agrupar por user_id
    const byUser: Record<string, typeof pendingScripts> = {};
    for (const script of pendingScripts) {
      if (!byUser[script.user_id]) byUser[script.user_id] = [];
      byUser[script.user_id].push(script);
    }

    let notified = 0;

    for (const [userId, scripts] of Object.entries(byUser)) {
      // Verificar se já notificou hoje para evitar spam
      const today = new Date().toISOString().split("T")[0];
      const { data: existing } = await supabase
        .from("notificacoes")
        .select("id")
        .eq("user_id", userId)
        .eq("tipo", "sistema")
        .like("titulo", "%roteiros pendentes%")
        .gte("created_at", today)
        .limit(1);

      if (existing && existing.length > 0) continue;

      const count = scripts.length;
      const topicPreview = scripts.slice(0, 3).map(s => s.topic.substring(0, 30)).join(", ");

      await supabase.from("notificacoes").insert({
        user_id: userId,
        titulo: `📝 ${count} roteiro${count > 1 ? "s" : ""} pendente${count > 1 ? "s" : ""}!`,
        mensagem: `Você tem ${count} roteiro${count > 1 ? "s" : ""} criado${count > 1 ? "s" : ""} há mais de 3 dias sem agendar: ${topicPreview}${count > 3 ? "..." : ""}. Agende agora no calendário!`,
        tipo: "sistema",
      });

      notified++;
    }

    return jsonResponse({ success: true, notified, totalPending: pendingScripts.length });
  } catch (e) {
    console.error("notificar-roteiros-pendentes error:", e);
    return errorResponse(e instanceof Error ? e.message : "Unknown error", 500);
  }
});
