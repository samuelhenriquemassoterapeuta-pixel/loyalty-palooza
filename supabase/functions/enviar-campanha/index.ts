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

    // Verify admin
    const authHeader = req.headers.get("authorization");
    if (!authHeader) throw new Error("Não autorizado");
    
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error: authError } = await supabase.auth.getUser(token);
    if (authError || !user) throw new Error("Não autorizado");

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .maybeSingle();
    if (!roleData) throw new Error("Acesso restrito a administradores");

    const { campanha_id } = await req.json();
    if (!campanha_id) throw new Error("campanha_id é obrigatório");

    // Get campaign
    const { data: campanha, error: campErr } = await supabase
      .from("campanhas_marketing")
      .select("*")
      .eq("id", campanha_id)
      .single();
    if (campErr || !campanha) throw new Error("Campanha não encontrada");

    if (campanha.status !== "rascunho") {
      throw new Error("Apenas campanhas em rascunho podem ser enviadas");
    }

    // Get segmented users via RPC
    const { data: usuarios, error: segErr } = await supabase.rpc("get_segmentacao_clientes");
    if (segErr) throw new Error("Erro ao buscar segmentação: " + segErr.message);

    // Filter by campaign segments
    const destinatarios = (usuarios || []).filter((u: any) =>
      campanha.segmentos.includes(u.segmento)
    );

    let enviados = 0;
    let erros = 0;

    if (campanha.tipo === "whatsapp") {
      // Send via WhatsApp using existing edge function
      const ZAPI_INSTANCE_ID = Deno.env.get("ZAPI_INSTANCE_ID");
      const ZAPI_TOKEN = Deno.env.get("ZAPI_TOKEN");

      if (!ZAPI_INSTANCE_ID || !ZAPI_TOKEN) {
        throw new Error("Credenciais Z-API não configuradas");
      }

      for (const dest of destinatarios) {
        if (!dest.telefone) continue;
        try {
          const phoneClean = dest.telefone.replace(/\D/g, "");
          const phoneFormatted = phoneClean.startsWith("55") ? phoneClean : `55${phoneClean}`;

          const zapiUrl = `https://api.z-api.io/instances/${ZAPI_INSTANCE_ID}/token/${ZAPI_TOKEN}/send-text`;
          const zapiRes = await fetch(zapiUrl, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ phone: phoneFormatted, message: campanha.mensagem }),
          });

          if (zapiRes.ok) {
            enviados++;
          } else {
            erros++;
          }

          // Log
          await supabase.from("whatsapp_logs").insert({
            user_id: dest.user_id || null,
            telefone: phoneFormatted,
            tipo: "campanha",
            mensagem: campanha.mensagem,
            status: zapiRes.ok ? "enviado" : "erro",
            referencia_id: campanha_id,
            referencia_tipo: "campanha_marketing",
          });
        } catch {
          erros++;
        }
      }
    } else if (campanha.tipo === "email") {
      // Send via Resend
      const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
      if (!RESEND_API_KEY) {
        throw new Error("RESEND_API_KEY não configurada");
      }

      for (const dest of destinatarios) {
        if (!dest.email) continue;
        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${RESEND_API_KEY}`,
            },
            body: JSON.stringify({
              from: "Resinkra <noreply@resinkra.com.br>",
              to: [dest.email],
              subject: campanha.titulo,
              html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;">
                <h2 style="color:#3e4331;">${campanha.titulo}</h2>
                <p style="color:#333;line-height:1.6;">${campanha.mensagem.replace(/\n/g, "<br/>")}</p>
                <hr style="border-color:#ebebe0;margin:20px 0;"/>
                <p style="color:#999;font-size:12px;">Resinkra · Terapias Integrativas</p>
              </div>`,
            }),
          });

          if (res.ok) {
            enviados++;
          } else {
            erros++;
          }
        } catch {
          erros++;
        }
      }
    }

    // Update campaign status
    await supabase
      .from("campanhas_marketing")
      .update({
        status: "enviada",
        enviada_em: new Date().toISOString(),
        total_destinatarios: destinatarios.length,
        total_enviados: enviados,
        total_erros: erros,
      })
      .eq("id", campanha_id);

    return new Response(
      JSON.stringify({ success: true, destinatarios: destinatarios.length, enviados, erros }),
      { status: 200, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro enviar-campanha:", msg);
    return new Response(
      JSON.stringify({ error: msg }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
