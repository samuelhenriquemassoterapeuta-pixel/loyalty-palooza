import { handleCors } from "../_shared/cors.ts";
import { createServiceClient } from "../_shared/supabase-client.ts";
import { requireAuth } from "../_shared/auth.ts";
import { jsonResponse, errorResponse } from "../_shared/response.ts";

Deno.serve(async (req) => {
  const corsRes = handleCors(req);
  if (corsRes) return corsRes;

  try {
    // Validate auth
    await requireAuth(req);

    // Use admin client for user lookup
    const supabaseAdmin = createServiceClient();

    const { email } = await req.json();

    if (!email) {
      return errorResponse("Email é obrigatório");
    }

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
    console.error("Erro ao buscar usuário:", error);
    return errorResponse("Erro interno do servidor", 500);
  }
});
