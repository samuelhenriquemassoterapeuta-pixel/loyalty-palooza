import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    const supabase = createServiceClient();

    const { data: protocolosAtivos, error: fetchError } = await supabase
      .from("usuario_protocolos")
      .select("id, user_id")
      .eq("status", "ativo");

    if (fetchError) throw fetchError;

    console.log(`Encontrados ${protocolosAtivos?.length || 0} protocolos ativos`);

    let notificacoesEnviadas = 0;

    for (const protocolo of protocolosAtivos || []) {
      const { data: ultimaFicha } = await supabase
        .from("fichas_acompanhamento")
        .select("data")
        .eq("protocolo_usuario_id", protocolo.id)
        .order("data", { ascending: false })
        .limit(1)
        .maybeSingle();

      const agora = new Date();
      const seteDiasAtras = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);

      if (ultimaFicha && new Date(ultimaFicha.data) > seteDiasAtras) continue;

      const { data: lembreteExistente } = await supabase
        .from("notificacoes")
        .select("id")
        .eq("user_id", protocolo.user_id)
        .eq("tipo", "lembrete")
        .ilike("titulo", "%medidas%")
        .gte("created_at", seteDiasAtras.toISOString())
        .maybeSingle();

      if (lembreteExistente) {
        console.log(`Lembrete já enviado esta semana para user ${protocolo.user_id}`);
        continue;
      }

      const diasSemRegistro = ultimaFicha
        ? Math.floor((agora.getTime() - new Date(ultimaFicha.data).getTime()) / (1000 * 60 * 60 * 24))
        : null;

      const mensagem = diasSemRegistro
        ? `Faz ${diasSemRegistro} dias desde sua última medição. Registre suas medidas para acompanhar sua evolução! 📊`
        : "Você ainda não registrou nenhuma medição no seu protocolo ativo. Comece agora para acompanhar sua evolução! 📊";

      const { error: insertError } = await supabase
        .from("notificacoes")
        .insert({
          user_id: protocolo.user_id,
          titulo: "Hora de registrar suas medidas! 📏",
          mensagem,
          tipo: "lembrete",
        });

      if (insertError) {
        console.error(`Erro ao criar notificação para user ${protocolo.user_id}:`, insertError);
      } else {
        notificacoesEnviadas++;
        console.log(`Lembrete de medidas enviado para user ${protocolo.user_id}`);
      }
    }

    return jsonResponse({
      success: true,
      message: `${notificacoesEnviadas} lembretes de medidas enviados`,
    });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao enviar lembretes de medidas:", errorMessage);
    return errorResponse(errorMessage, 500);
  }
});
