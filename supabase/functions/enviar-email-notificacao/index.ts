import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

interface EmailPayload {
  user_id: string;
  subject: string;
  html: string;
  tipo?: string;
}

const EMAIL_TEMPLATES = {
  lembrete: (data: { nome: string; servico: string; data: string; hora: string; terapeuta?: string }) => ({
    subject: `Lembrete: ${data.servico} amanhã às ${data.hora}`,
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#f5f5f0;padding:0;">
        <div style="background:#3e4331;padding:24px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:22px;">🌿 Resinkra</h1>
        </div>
        <div style="padding:32px 24px;">
          <h2 style="color:#3e4331;margin:0 0 16px;">Olá, ${data.nome}!</h2>
          <p style="color:#555;line-height:1.6;font-size:15px;">
            Lembrete da sua sessão agendada:
          </p>
          <div style="background:#fff;border-radius:12px;padding:20px;margin:20px 0;border-left:4px solid #3e4331;">
            <p style="margin:4px 0;color:#333;"><strong>Serviço:</strong> ${data.servico}</p>
            <p style="margin:4px 0;color:#333;"><strong>Data:</strong> ${data.data}</p>
            <p style="margin:4px 0;color:#333;"><strong>Horário:</strong> ${data.hora}</p>
            ${data.terapeuta ? `<p style="margin:4px 0;color:#333;"><strong>Terapeuta:</strong> ${data.terapeuta}</p>` : ''}
          </div>
          <p style="color:#888;font-size:13px;">Caso precise reagendar, acesse o app com até 24h de antecedência.</p>
        </div>
        <div style="background:#ebebe0;padding:16px;text-align:center;">
          <p style="color:#999;font-size:12px;margin:0;">Resinkra · Terapias Integrativas</p>
        </div>
      </div>
    `,
  }),
  cashback: (data: { nome: string; valor: string; descricao: string }) => ({
    subject: `Cashback creditado: R$ ${data.valor}`,
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#f5f5f0;padding:0;">
        <div style="background:#3e4331;padding:24px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:22px;">🌿 Resinkra</h1>
        </div>
        <div style="padding:32px 24px;">
          <h2 style="color:#3e4331;margin:0 0 16px;">Olá, ${data.nome}! 💰</h2>
          <p style="color:#555;line-height:1.6;font-size:15px;">Você recebeu cashback!</p>
          <div style="background:#fff;border-radius:12px;padding:20px;margin:20px 0;text-align:center;">
            <p style="font-size:36px;color:#3e4331;font-weight:bold;margin:0;">R$ ${data.valor}</p>
            <p style="color:#888;margin:8px 0 0;">${data.descricao}</p>
          </div>
          <p style="color:#888;font-size:13px;">Válido por 90 dias. Use no app!</p>
        </div>
        <div style="background:#ebebe0;padding:16px;text-align:center;">
          <p style="color:#999;font-size:12px;margin:0;">Resinkra · Terapias Integrativas</p>
        </div>
      </div>
    `,
  }),
  generico: (data: { nome: string; titulo: string; mensagem: string }) => ({
    subject: data.titulo,
    html: `
      <div style="font-family:'Segoe UI',sans-serif;max-width:600px;margin:0 auto;background:#f5f5f0;padding:0;">
        <div style="background:#3e4331;padding:24px;text-align:center;">
          <h1 style="color:#fff;margin:0;font-size:22px;">🌿 Resinkra</h1>
        </div>
        <div style="padding:32px 24px;">
          <h2 style="color:#3e4331;margin:0 0 16px;">Olá, ${data.nome}!</h2>
          <p style="color:#555;line-height:1.6;font-size:15px;">${data.mensagem.replace(/\n/g, '<br/>')}</p>
        </div>
        <div style="background:#ebebe0;padding:16px;text-align:center;">
          <p style="color:#999;font-size:12px;margin:0;">Resinkra · Terapias Integrativas</p>
        </div>
      </div>
    `,
  }),
};

Deno.serve(async (req) => {
  const corsResponse = handleCors(req);
  if (corsResponse) return corsResponse;

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    if (!RESEND_API_KEY) throw new Error("RESEND_API_KEY não configurada");

    const supabase = createServiceClient();
    const body = await req.json();
    const { user_id, template, template_data, subject, html } = body;

    if (!user_id) throw new Error("user_id é obrigatório");

    // Check user email preferences
    const { data: profile } = await supabase
      .from("profiles")
      .select("nome, notif_email")
      .eq("id", user_id)
      .maybeSingle();

    if (!profile?.notif_email) {
      return jsonResponse({ success: true, skipped: true, reason: "Email notifications disabled" });
    }

    // Get user email from auth
    const { data: { user: authUser } } = await supabase.auth.admin.getUserById(user_id);
    if (!authUser?.email) throw new Error("Email do usuário não encontrado");

    const nome = profile?.nome?.split(' ')[0] || 'Cliente';
    let emailSubject: string;
    let emailHtml: string;

    if (template && EMAIL_TEMPLATES[template as keyof typeof EMAIL_TEMPLATES]) {
      const tmpl = EMAIL_TEMPLATES[template as keyof typeof EMAIL_TEMPLATES]({ nome, ...template_data });
      emailSubject = tmpl.subject;
      emailHtml = tmpl.html;
    } else if (subject && html) {
      emailSubject = subject;
      emailHtml = html;
    } else {
      // Use generic template
      const tmpl = EMAIL_TEMPLATES.generico({
        nome,
        titulo: body.titulo || 'Notificação Resinkra',
        mensagem: body.mensagem || '',
      });
      emailSubject = tmpl.subject;
      emailHtml = tmpl.html;
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Resinkra <noreply@resinkra.com.br>",
        to: [authUser.email],
        subject: emailSubject,
        html: emailHtml,
      }),
    });

    if (!res.ok) {
      const errData = await res.text();
      throw new Error(`Resend error: ${errData}`);
    }

    console.log(`Email enviado para ${authUser.email} (${template || 'custom'})`);
    return jsonResponse({ success: true, email: authUser.email });
  } catch (error: unknown) {
    const msg = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro enviar-email-notificacao:", msg);
    return errorResponse(msg, 500);
  }
});
