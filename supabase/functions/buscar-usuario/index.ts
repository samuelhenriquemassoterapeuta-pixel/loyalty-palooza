import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { requireAuth } from "../_shared/auth.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";
import { buscarUsuarioSchema, validate } from "../_shared/validation.ts";

Deno.serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    await requireAuth(req);
    const supabaseAdmin = createServiceClient();

    const body = await req.json();
    const { email } = validate(buscarUsuarioSchema, body);

    // Buscar usuário pelo email no auth.users
    const { data: authData, error: authError } = await supabaseAdmin.auth.admin.listUsers();

    if (authError) throw authError;

    const foundUser = authData.users.find(
      (u) => u.email?.toLowerCase() === email.toLowerCase()
    );

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
