import { corsHeaders, handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const corsResp = handleCors(req);
  if (corsResp) return corsResp;

  try {
    const { sugestao_id } = await req.json();

    if (!sugestao_id) {
      return errorResponse("sugestao_id é obrigatório");
    }

    const supabase = createServiceClient();

    const { data: sugestao, error } = await supabase
      .from("sugestoes_playlist")
      .select("usuario_id, nome")
      .eq("id", sugestao_id)
      .single();

    if (error || !sugestao) {
      return errorResponse("Sugestão não encontrada", 404);
    }

    const cashback = 5.0;

    // Credit cashback via transacoes table
    await supabase.from("transacoes").insert({
      user_id: sugestao.usuario_id,
      tipo: "cashback",
      valor: cashback,
      descricao: "Recompensa por playlist aprovada: " + sugestao.nome + " 🎶",
      referencia_id: sugestao_id,
      expira_em: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000).toISOString(),
    });

    // Award Curador Bronze badge
    const { data: badge } = await supabase
      .from("badges")
      .select("id")
      .eq("tipo", "curador_bronze")
      .single();

    if (badge) {
      await supabase.from("conquistas_usuario_badges").insert({
        usuario_id: sugestao.usuario_id,
        badge_id: badge.id,
        metadata: { sugestao_id, playlist_nome: sugestao.nome },
      }).onConflict("usuario_id,badge_id").ignore();
    }

    // Notify user
    await supabase.from("notificacoes").insert({
      user_id: sugestao.usuario_id,
      titulo: "Playlist aprovada! 🎶",
      mensagem: `Sua sugestão "${sugestao.nome}" foi aprovada! Você ganhou ℜ ${cashback.toFixed(2).replace(".", ",")} de cashback.`,
      tipo: "cashback",
    });

    // Update sugestao with reward info
    await supabase
      .from("sugestoes_playlist")
      .update({ recompensa_cashback: cashback, xp_recompensa: 50 })
      .eq("id", sugestao_id);

    return jsonResponse({ success: true, cashback, badge: "curador_bronze" });
  } catch (error) {
    return errorResponse((error as Error).message, 500);
  }
});
