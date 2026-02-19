/**
 * @module _shared/auth
 * @description Funções de autenticação para Edge Functions.
 *
 * Oferece duas estratégias de validação JWT:
 *
 * 1. **requireAuth()** — Usa `getClaims()` para extrair o `sub` (user ID) do token.
 *    Mais rápido pois não faz roundtrip ao banco. Preferir para a maioria dos casos.
 *
 * 2. **requireAuthUser()** — Usa `getUser()` para obter o objeto completo do usuário.
 *    Mais lento (consulta o banco), mas retorna email e metadados. Usar quando precisar
 *    de dados do perfil do usuário.
 *
 * Ambas lançam uma `Response` HTTP 401 se o token for inválido ou ausente,
 * que deve ser capturada no catch da Edge Function.
 *
 * @example
 * ```ts
 * try {
 *   const { userId } = await requireAuth(req);
 *   // userId é o UUID do usuário autenticado
 * } catch (error) {
 *   if (error instanceof Response) return error; // 401 Não autorizado
 * }
 * ```
 */

import { corsHeaders } from "./cors.ts";
import { createUserClient } from "./supabase-client.ts";

/**
 * Valida o token JWT via `getClaims()` e retorna o ID do usuário.
 *
 * Estratégia preferida: extrai claims do token sem consultar o banco,
 * resultando em menor latência (~5ms vs ~50ms do getUser).
 *
 * @param req - Requisição HTTP contendo header `Authorization: Bearer <jwt>`
 * @returns Objeto com `userId` (UUID) e `authHeader` (para reuso)
 * @throws {Response} HTTP 401 se o token for ausente, malformado ou expirado
 *
 * @example
 * ```ts
 * const { userId, authHeader } = await requireAuth(req);
 * const userClient = createUserClient(authHeader);
 * ```
 */
export async function requireAuth(req: Request): Promise<{ userId: string; authHeader: string }> {
  const authHeader = req.headers.get("Authorization");

  // Verifica se o header existe e tem o formato "Bearer <token>"
  if (!authHeader?.startsWith("Bearer ")) {
    throw unauthorizedResponse();
  }

  // Cria cliente com o token do usuário para validar contra o Supabase Auth
  const supabase = createUserClient(authHeader);
  const token = authHeader.replace("Bearer ", "");
  const { data, error } = await supabase.auth.getClaims(token);

  // `sub` é o claim padrão JWT que contém o user ID
  if (error || !data?.claims?.sub) {
    throw unauthorizedResponse();
  }

  return { userId: data.claims.sub as string, authHeader };
}

/**
 * Valida o token JWT via `getUser()` e retorna ID + email do usuário.
 *
 * Estratégia legada: faz roundtrip ao banco para obter o objeto completo do usuário.
 * Usar apenas quando precisar do email ou metadados que não estão nos claims.
 *
 * @param req - Requisição HTTP contendo header `Authorization: Bearer <jwt>`
 * @returns Objeto com `userId`, `email` e `authHeader`
 * @throws {Response} HTTP 401 se o token for inválido
 *
 * @see requireAuth — Alternativa mais rápida quando só precisa do userId
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

/**
 * Cria uma Response HTTP 401 padronizada com headers CORS.
 *
 * É lançada como exceção (throw) para interromper o fluxo da Edge Function.
 * O catch no handler principal deve verificar `if (error instanceof Response)`.
 *
 * @returns Response HTTP 401 com corpo JSON { error: "Não autorizado" }
 */
function unauthorizedResponse(): Response {
  return new Response(
    JSON.stringify({ error: "Não autorizado" }),
    { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } },
  );
}
