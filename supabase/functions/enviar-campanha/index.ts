import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { requireAuthUser } from "../_shared/auth.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const supabase = createServiceClient();

    // Verify admin
    const { userId } = await requireAuthUser(req);
    const { data: roleData } = await supabase.from("user_roles").select("role").eq("user_id", userId).eq("role", "admin").maybeSingle();
    if (!roleData) throw new Error("Acesso restrito a administradores");

    const { campanha_id } = await req.json();
    if (!campanha_id) throw new Error("campanha_id é obrigatório");

    const { data: campanha, error: campErr } = await supabase.from("campanhas_marketing").select("*").eq("id", campanha_id).single();
    if (campErr || !campanha) throw new Error("Campanha não encontrada");
    if (campanha.status !== "rascunho") throw new Error("Apenas campanhas em rascunho podem ser enviadas");

    const { data: usuarios, error: segErr } = await supabase.rpc("get_segmentacao_clientes");
    if (segErr) throw new Error("Erro ao buscar segmentação: " + segErr.message);

    const destinatarios = (usuarios || []).filter((u: any) => campanha.segmentos.includes(u.segmento));
    let enviados = 0;
    let erros = 0;

    if (campanha.tipo === "whatsapp") {
      const ZAPI_INSTANCE_ID = Deno.env.get("ZAPI_INSTANCE_ID");
      const ZAPI_TOKEN = Deno.env.get("ZAPI_TOKEN");
      if (!ZAPI_INSTANCE_ID || !ZAPI_TOKEN) throw new Error("Credenciais Z-API não configuradas");

      for (const dest of destinatarios) {
        if (!dest.telefone) continue;
        try {
          const phoneClean = dest.telefone.replace(/\D/g, "");
          const phoneFormatted = phoneClean.startsWith("55") ? phoneClean : `55${phoneClean}`;
          const zapiUrl = `https://api.z-api.io/instances/${ZAPI_INSTANCE_ID}/token/${ZAPI_TOKEN}/send-text`;
          const zapiRes = await fetch(zapiUrl, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ phone: phoneFormatted, message: campanha.mensagem }) });
          if (zapiRes.ok) { enviados++; } else { erros++; }
          await supabase.from("whatsapp_logs").insert({ user_id: dest.user_id || null, telefone: phoneFormatted, tipo: "campanha", mensagem: campanha.mensagem, status: zapiRes.ok ? "enviado" : "erro", referencia_id: campanha_id, referencia_tipo: "campanha_marketing" });
        } catch { erros++; }
      }
    } else if (campanha.tipo === "email") {
      const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
      if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY não configurada");

      for (const dest of destinatarios) {
        if (!dest.email) continue;
        try {
          const res = await fetch("https://api.resend.com/emails", { method: "POST", headers: { "Content-Type": "application/json", Authorization: `Bearer ${RESEND_API_KEY}` }, body: JSON.stringify({ from: "Resinkra <noreply@resinkra.com.br>", to: [dest.email], subject: campanha.titulo, html: `<div style="font-family:sans-serif;max-width:600px;margin:0 auto;padding:20px;"><h2 style="color:#3e4331;">${campanha.titulo}</h2><p style="color:#333;line-height:1.6;">${campanha.mensagem.replace(/\n/g, "<br/>")}</p><hr style="border-color:#ebebe0;margin:20px 0;"/><p style="color:#999;font-size:12px;">Resinkra · Terapias Integrativas</p></div>` }) });
          if (res.ok) { enviados++; } else { erros++; }
        } catch { erros++; }
      }
    }

    await supabase.from("campanhas_marketing").update({ status: "enviada", enviada_em: new Date().toISOString(), total_destinatarios: destinatarios.length, total_enviados: enviados, total_erros: erros }).eq("id", campanha_id);

    return jsonResponse({ success: true, destinatarios: destinatarios.length, enviados, erros });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro enviar-campanha:", msg);
    if (error instanceof Response) return error;
    return errorResponse(msg, 500);
  }
});
