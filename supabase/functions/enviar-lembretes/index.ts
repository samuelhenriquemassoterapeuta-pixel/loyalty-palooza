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
 
     // Buscar agendamentos que acontecem nas próximas 24 horas
     const now = new Date();
     const in24Hours = new Date(now.getTime() + 24 * 60 * 60 * 1000);
     
     // Buscar agendamentos futuros que ainda não receberam lembrete
     const { data: agendamentos, error: fetchError } = await supabase
       .from("agendamentos")
       .select(`
         id,
         user_id,
         data_hora,
         servico,
         terapeutas (nome)
       `)
       .eq("status", "agendado")
       .gte("data_hora", now.toISOString())
       .lte("data_hora", in24Hours.toISOString());
 
     if (fetchError) {
       throw fetchError;
     }
 
     console.log(`Encontrados ${agendamentos?.length || 0} agendamentos para enviar lembrete`);
 
     let notificacoesEnviadas = 0;
 
     for (const agendamento of agendamentos || []) {
       // Verificar se já existe notificação de lembrete para este agendamento
       const { data: existente } = await supabase
         .from("notificacoes")
         .select("id")
         .eq("user_id", agendamento.user_id)
         .eq("tipo", "lembrete")
         .ilike("mensagem", `%${agendamento.id.substring(0, 8)}%`)
         .maybeSingle();
 
       if (existente) {
         console.log(`Lembrete já enviado para agendamento ${agendamento.id}`);
         continue;
       }
 
       // Formatar data/hora
       const dataHora = new Date(agendamento.data_hora);
       const dataFormatada = dataHora.toLocaleDateString("pt-BR", {
         day: "2-digit",
         month: "2-digit",
         year: "numeric",
       });
       const horaFormatada = dataHora.toLocaleTimeString("pt-BR", {
         hour: "2-digit",
         minute: "2-digit",
         timeZone: "America/Sao_Paulo",
       });
 
       // Criar notificação de lembrete
      // terapeutas pode ser um objeto ou null dependendo do join
      const terapeutaData = agendamento.terapeutas as unknown;
      const terapeutaNome = terapeutaData && typeof terapeutaData === "object" && "nome" in terapeutaData
        ? (terapeutaData as { nome: string }).nome
        : null;
       const mensagem = terapeutaNome
         ? `Lembrete: sua sessão de ${agendamento.servico} com ${terapeutaNome} está agendada para ${dataFormatada} às ${horaFormatada}. Ref: ${agendamento.id.substring(0, 8)}`
         : `Lembrete: sua sessão de ${agendamento.servico} está agendada para ${dataFormatada} às ${horaFormatada}. Ref: ${agendamento.id.substring(0, 8)}`;
 
       const { error: insertError } = await supabase
         .from("notificacoes")
         .insert({
           user_id: agendamento.user_id,
           titulo: "Lembrete de agendamento ⏰",
           mensagem,
           tipo: "lembrete",
         });
 
        if (insertError) {
          console.error(`Erro ao criar notificação para ${agendamento.id}:`, insertError);
        } else {
          notificacoesEnviadas++;
          console.log(`Lembrete enviado para agendamento ${agendamento.id}`);

          // Enviar também via WhatsApp se o usuário tiver telefone
          const { data: profile } = await supabase
            .from("profiles")
            .select("telefone, nome")
            .eq("id", agendamento.user_id)
            .maybeSingle();

          if (profile?.telefone) {
            try {
              const whatsappMsg = `Olá${profile.nome ? `, ${profile.nome.split(' ')[0]}` : ''}! 🌿\n\n` +
                `Lembrete: sua sessão de *${agendamento.servico}* está agendada para *${dataFormatada}* às *${horaFormatada}*.\n\n` +
                `${terapeutaNome ? `Terapeuta: ${terapeutaNome}\n\n` : ''}` +
                `Caso precise reagendar, acesse o app ou entre em contato conosco.\n\n` +
                `✨ Resinkra — Seu bem-estar em primeiro lugar`;

              await fetch(`${supabaseUrl}/functions/v1/enviar-whatsapp`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  "Authorization": `Bearer ${supabaseServiceKey}`,
                },
                body: JSON.stringify({
                  telefone: profile.telefone,
                  mensagem: whatsappMsg,
                  tipo: "lembrete_agendamento",
                  user_id: agendamento.user_id,
                  referencia_id: agendamento.id,
                  referencia_tipo: "agendamento",
                }),
              });

              console.log(`WhatsApp lembrete enviado para agendamento ${agendamento.id}`);
            } catch (whatsappError) {
              console.error(`Erro ao enviar WhatsApp para agendamento ${agendamento.id}:`, whatsappError);
            }
          }
        }
      }
  
      return new Response(
        JSON.stringify({
          success: true,
          message: `${notificacoesEnviadas} lembretes enviados`,
        }),
       {
         status: 200,
         headers: { "Content-Type": "application/json", ...corsHeaders },
       }
     );
   } catch (error: any) {
     console.error("Erro ao enviar lembretes:", error);
     return new Response(
       JSON.stringify({ error: error.message }),
       {
         status: 500,
         headers: { "Content-Type": "application/json", ...corsHeaders },
       }
     );
   }
 });