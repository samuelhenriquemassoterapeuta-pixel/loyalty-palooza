import { corsHeaders } from "./cors.ts";
import { createUserClient } from "./supabase-client.ts";

/**
 * Validates the Authorization header and returns the user ID.
 * Throws an unauthorized Response if invalid.
 */
export async function requireAuth(req: Request): Promise<{ userId: string; authHeader: string }> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw unauthorizedResponse();
  }

  const supabase = createUserClient(authHeader);
  const token = authHeader.replace("Bearer ", "");
  const { data, error } = await supabase.auth.getClaims(token);

  if (error || !data?.claims?.sub) {
    throw unauthorizedResponse();
  }

  return { userId: data.claims.sub as string, authHeader };
}

/**
 * Legacy auth using getUser() — for functions that need the full user object.
 */
export async function requireAuthUser(req: Request): Promise<{ userId: string; email: string; authHeader: string }> {
  const authHeader = req.headers.get("Authorization");
  if (!authHeader?.startsWith("Bearer ")) {
    throw unauthorizedResponse();
  }

  const supabase = createUserClient(authHeader);
  const { data: { user }, error } = await supabase.auth.getUser();

  if (error || !user) {
    throw unauthorizedResponse();
  }

  return { userId: user.id, email: user.email || "", authHeader };
}

function unauthorizedResponse(): Response {
  return new Response(
    JSON.stringify({ error: "Não autorizado" }),
    { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
}
