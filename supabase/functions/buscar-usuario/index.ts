import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { requireAuth } from "../_shared/auth.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";
import { buscarUsuarioSchema, validate } from "../_shared/validation.ts";

Deno.serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    const { userId } = await requireAuth(req);
    const supabaseAdmin = createServiceClient();

    // Verificar se o usuário é admin
    const { data: isAdmin } = await supabaseAdmin.rpc("has_role", {
      _user_id: userId,
      _role: "admin",
    });

    if (!isAdmin) {
      return errorResponse("Acesso restrito a administradores", 403);
    }

    const body = await req.json();
    const { email } = validate(buscarUsuarioSchema, body);

    // Buscar usuário diretamente pelo email (sem listar todos)
    const { data: foundUserData, error: authError } = await supabaseAdmin.auth.admin.listUsers({
      filter: `email.eq.${email.toLowerCase()}`,
      page: 1,
      perPage: 1,
    });

    if (authError) throw authError;

    const foundUser = foundUserData.users?.[0];

    if (!foundUser) {
      return errorResponse("Usuário não encontrado", 404);
    }

    // Buscar perfil do usuário
    const { data: profile } = await supabaseAdmin
      .from("profiles")
      .select("nome")
      .eq("id", foundUser.id)
      .single();

    return jsonResponse({
      user: {
        id: foundUser.id,
        nome: profile?.nome || null,
      },
    });
  } catch (error) {
    if (error instanceof Response) return error;
    const msg = error instanceof Error ? error.message : "Erro interno do servidor";
    console.error("Erro ao buscar usuário:", msg);
    return errorResponse(msg, msg.includes("inválido") ? 400 : 500);
  }
});
