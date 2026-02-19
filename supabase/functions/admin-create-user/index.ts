/**
 * @module admin-create-user
 * @description Edge Function para criação de usuários pelo painel admin.
 *
 * Fluxo:
 * 1. Valida JWT do admin logado
 * 2. Verifica se possui role 'admin'
 * 3. Cria usuário no Supabase Auth (service_role)
 * 4. Cria perfil em `profiles`
 * 5. Atribui role em `user_roles`
 * 6. Registra em `audit_logs`
 * 7. Retorna sucesso ou erro detalhado
 */

import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { requireAuth } from "../_shared/auth.ts";
import { corsHeaders } from "../_shared/cors.ts";

function jsonRes(data: unknown, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function errRes(message: string, status = 400) {
  return new Response(JSON.stringify({ error: message }), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    // 1. Autenticar e obter ID do admin logado
    const { userId: adminUserId } = await requireAuth(req);
    const supabaseAdmin = createServiceClient();

    // 2. Verificar se é admin
    const { data: isAdmin } = await supabaseAdmin.rpc("has_role", {
      _user_id: adminUserId,
      _role: "admin",
    });

    if (!isAdmin) {
      return errRes("Acesso restrito a administradores", 403);
    }

    // 3. Parsear body
    const body = await req.json();
    const { nome, email, telefone, senha, role, enviar_email } = body;

    // 4. Validações básicas
    if (!nome || typeof nome !== "string" || nome.trim().length < 2) {
      return errRes("Nome deve ter pelo menos 2 caracteres");
    }
    if (!email || typeof email !== "string" || !email.includes("@")) {
      return errRes("E-mail inválido");
    }
    if (!senha || typeof senha !== "string" || senha.length < 8) {
      return errRes("Senha deve ter no mínimo 8 caracteres");
    }

    const validRoles = ["user", "terapeuta", "parceiro", "admin"];
    const roleToAssign = role || "user";
    if (!validRoles.includes(roleToAssign)) {
      return errRes("Role inválida");
    }

    // 5. Criar usuário no Auth
    const { data: authData, error: authError } =
      await supabaseAdmin.auth.admin.createUser({
        email: email.toLowerCase().trim(),
        password: senha,
        email_confirm: true, // admin confirma diretamente
        user_metadata: {
          nome: nome.trim(),
        },
      });

    if (authError) {
      // Mensagem amigável para email duplicado
      if (
        authError.message.includes("already registered") ||
        authError.message.includes("already been registered")
      ) {
        return errRes("Este e-mail já está cadastrado no sistema", 409);
      }
      throw authError;
    }

    const newUserId = authData.user.id;

    // 6. Criar perfil
    const { error: profileError } = await supabaseAdmin
      .from("profiles")
      .upsert({
        id: newUserId,
        nome: nome.trim(),
        telefone: telefone?.trim() || null,
      });

    if (profileError) {
      // Rollback: remover usuário criado no Auth
      await supabaseAdmin.auth.admin.deleteUser(newUserId);
      throw new Error(`Erro ao criar perfil: ${profileError.message}`);
    }

    // 7. Atribuir role
    const { error: roleError } = await supabaseAdmin
      .from("user_roles")
      .upsert(
        { user_id: newUserId, role: roleToAssign },
        { onConflict: "user_id,role" }
      );

    if (roleError) {
      // Rollback
      await supabaseAdmin.auth.admin.deleteUser(newUserId);
      throw new Error(`Erro ao atribuir role: ${roleError.message}`);
    }

    // 8. Registrar em audit_logs
    await supabaseAdmin.from("audit_logs").insert({
      table_name: "users",
      operation: "INSERT",
      record_id: newUserId,
      user_id: adminUserId,
      new_data: {
        email: email.toLowerCase().trim(),
        nome: nome.trim(),
        role: roleToAssign,
        criado_por: adminUserId,
      },
    });

    // 9. (Opcional) Envio de email de boas-vindas
    if (enviar_email) {
      try {
        await supabaseAdmin.functions.invoke("enviar-whatsapp", {
          body: {
            tipo: "boas_vindas_admin",
            email: email.toLowerCase().trim(),
            nome: nome.trim(),
            senha_temporaria: senha,
          },
        });
      } catch (_emailErr) {
        // Não bloquear o fluxo por falha no email
        console.warn("Falha ao enviar email de boas-vindas:", _emailErr);
      }
    }

    return jsonRes({
      success: true,
      user_id: newUserId,
      message: `Usuário "${nome.trim()}" criado com sucesso com role "${roleToAssign}"`,
    });
  } catch (error) {
    if (error instanceof Response) return error;
    const msg =
      error instanceof Error ? error.message : "Erro interno do servidor";
    console.error("[admin-create-user] Erro:", msg);
    return errRes(msg, 500);
  }
});
