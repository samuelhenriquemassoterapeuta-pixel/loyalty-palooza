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

    // Find users with active protocols
    const { data: protocolosAtivos, error: fetchError } = await supabase
      .from("usuario_protocolos")
      .select("id, user_id")
      .eq("status", "ativo");

    if (fetchError) throw fetchError;

    console.log(`Encontrados ${protocolosAtivos?.length || 0} protocolos ativos`);

    let notificacoesEnviadas = 0;

    for (const protocolo of protocolosAtivos || []) {
      // Check last measurement date for this protocol
      const { data: ultimaFicha } = await supabase
        .from("fichas_acompanhamento")
        .select("data")
        .eq("protocolo_usuario_id", protocolo.id)
        .order("data", { ascending: false })
        .limit(1)
        .maybeSingle();

      const agora = new Date();
      const seteDiasAtras = new Date(agora.getTime() - 7 * 24 * 60 * 60 * 1000);

      // Skip if user registered measurements within the last 7 days
      if (ultimaFicha && new Date(ultimaFicha.data) > seteDiasAtras) {
        continue;
      }

      // Check if we already sent a reminder this week to avoid duplicates
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

      // Determine message based on whether they ever recorded measurements
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

    return new Response(
      JSON.stringify({
        success: true,
        message: `${notificacoesEnviadas} lembretes de medidas enviados`,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao enviar lembretes de medidas:", errorMessage);
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
});
