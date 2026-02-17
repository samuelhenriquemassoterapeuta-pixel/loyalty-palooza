import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const supabase = createServiceClient();
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;

    const now = new Date();
    const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);

    const { data: agendamentos, error: fetchError } = await supabase
      .from("agendamentos")
      .select(`id, user_id, data_hora, servico, terapeutas (nome)`)
      .eq("status", "agendado")
      .gte("data_hora", now.toISOString())
      .lte("data_hora", in24Hours.toISOString());

    if (fetchError) throw fetchError;

    console.log(`Encontrados ${agendamentos?.length || 0} agendamentos para enviar lembrete`);
    let notificacoesEnviadas = 0;

    for (const agendamento of agendamentos || []) {
      const { data: existente } = await supabase.from("notificacoes").select("id").eq("user_id", agendamento.user_id).eq("tipo", "lembrete").ilike("mensagem", `%${agendamento.id.substring(0, 8)}%`).maybeSingle();
      if (existente) { console.log(`Lembrete já enviado para agendamento ${agendamento.id}`); continue; }

      const dataHora = new Date(agendamento.data_hora);
      const dataFormatada = dataHora.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
      const horaFormatada = dataHora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit", timeZone: "America/Sao_Paulo" });

      const terapeutaData = agendamento.terapeutas as unknown;
      const terapeutaNome = terapeutaData && typeof terapeutaData === "object" && "nome" in terapeutaData ? (terapeutaData as { nome: string }).nome : null;
      const mensagem = terapeutaNome
        ? `Lembrete: sua sessão de ${agendamento.servico} com ${terapeutaNome} está agendada para ${dataFormatada} às ${horaFormatada}. Ref: ${agendamento.id.substring(0, 8)}`
        : `Lembrete: sua sessão de ${agendamento.servico} está agendada para ${dataFormatada} às ${horaFormatada}. Ref: ${agendamento.id.substring(0, 8)}`;

      const { error: insertError } = await supabase.from("notificacoes").insert({ user_id: agendamento.user_id, titulo: "Lembrete de agendamento ⏰", mensagem, tipo: "lembrete" });

      if (insertError) {
        console.error(`Erro ao criar notificação para ${agendamento.id}:`, insertError);
      } else {
        notificacoesEnviadas++;
        const { data: profile } = await supabase.from("profiles").select("telefone, nome").eq("id", agendamento.user_id).maybeSingle();
        if (profile?.telefone) {
          try {
            const whatsappMsg = `Olá${profile.nome ? `, ${profile.nome.split(' ')[0]}` : ''}! 🌿\n\nLembrete: sua sessão de *${agendamento.servico}* está agendada para *${dataFormatada}* às *${horaFormatada}*.\n\n${terapeutaNome ? `Terapeuta: ${terapeutaNome}\n\n` : ''}Caso precise reagendar, acesse o app ou entre em contato conosco.\n\n✨ Resinkra — Seu bem-estar em primeiro lugar`;
            await fetch(`${supabaseUrl}/functions/v1/enviar-whatsapp`, { method: "POST", headers: { "Content-Type": "application/json", "Authorization": `Bearer ${supabaseServiceKey}` }, body: JSON.stringify({ telefone: profile.telefone, mensagem: whatsappMsg, tipo: "lembrete_agendamento", user_id: agendamento.user_id, referencia_id: agendamento.id, referencia_tipo: "agendamento" }) });
          } catch (whatsappError) { console.error(`Erro WhatsApp para ${agendamento.id}:`, whatsappError); }
        }
      }
    }

    return jsonResponse({ success: true, message: `${notificacoesEnviadas} lembretes enviados` });
  } catch (error: any) {
    console.error("Erro ao enviar lembretes:", error);
    return errorResponse(error.message, 500);
  }
});
