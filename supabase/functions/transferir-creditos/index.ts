import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    
    const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);

    // Verificar autenticação do usuário
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "Não autorizado" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const token = authHeader.replace("Bearer ", "");
    const { data: userData, error: userError } = await supabaseAdmin.auth.getUser(token);

    if (userError || !userData.user) {
      return new Response(
        JSON.stringify({ error: "Usuário não autenticado" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const remetenteId = userData.user.id;
    const { destinatarioId, valor, destinatarioNome } = await req.json();

    if (!destinatarioId || !valor || valor <= 0) {
      return new Response(
        JSON.stringify({ error: "Dados inválidos" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    if (remetenteId === destinatarioId) {
      return new Response(
        JSON.stringify({ error: "Não é possível transferir para si mesmo" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Verificar saldo do remetente
    const { data: transacoes, error: saldoError } = await supabaseAdmin
      .from("transacoes")
      .select("valor")
      .eq("user_id", remetenteId);

    if (saldoError) throw saldoError;

    const saldo = (transacoes || []).reduce((acc, t) => acc + Number(t.valor), 0);

    if (saldo < valor) {
      return new Response(
        JSON.stringify({ error: "Saldo insuficiente" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    // Buscar nome do remetente
    const { data: remetenteProfile } = await supabaseAdmin
      .from("profiles")
      .select("nome")
      .eq("id", remetenteId)
      .single();

    const remetenteNome = remetenteProfile?.nome || "Usuário";

    // Criar transação de débito para o remetente
    const { error: debitoError } = await supabaseAdmin.from("transacoes").insert({
      user_id: remetenteId,
      tipo: "debito",
      valor: -valor,
      descricao: `Transferência para ${destinatarioNome}`,
      referencia_id: destinatarioId,
    });

    if (debitoError) throw debitoError;

    // Criar transação de crédito para o destinatário
    const { error: creditoError } = await supabaseAdmin.from("transacoes").insert({
      user_id: destinatarioId,
      tipo: "credito",
      valor: valor,
      descricao: `Transferência recebida de ${remetenteNome}`,
      referencia_id: remetenteId,
    });

    if (creditoError) throw creditoError;

    // Criar notificação para o destinatário
    await supabaseAdmin.from("notificacoes").insert({
      user_id: destinatarioId,
      titulo: "Transferência recebida! 💰",
      mensagem: `Você recebeu R$ ${valor.toFixed(2).replace(".", ",")} de ${remetenteNome}`,
      tipo: "transferencia",
    });

    return new Response(
      JSON.stringify({ success: true, message: "Transferência realizada com sucesso" }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Erro na transferência:", error);
    return new Response(
      JSON.stringify({ error: "Erro ao realizar transferência" }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
