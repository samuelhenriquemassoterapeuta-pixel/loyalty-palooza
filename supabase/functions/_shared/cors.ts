/**
 * @module _shared/cors
 * @description Configuração centralizada de CORS (Cross-Origin Resource Sharing) para todas as Edge Functions.
 *
 * Toda Edge Function chamada pelo frontend via `supabase.functions.invoke()` ou `fetch()`
 * precisa incluir estes headers na resposta para que o navegador aceite a requisição.
 *
 * O Supabase JS SDK envia headers customizados (x-client-info, x-supabase-client-platform, etc.)
 * que devem ser explicitamente permitidos aqui — caso contrário, o preflight CORS falha.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
 *
 * @example
 * ```ts
 * import { handleCors, corsHeaders } from "../_shared/cors.ts";
 *
 * Deno.serve(async (req) => {
 *   const corsRes = handleCors(req);
 *   if (corsRes) return corsRes; // Responde ao preflight OPTIONS
 *
 *   return new Response("OK", { headers: corsHeaders });
 * });
 * ```
 */

/**
 * Headers CORS padrão incluídos em todas as respostas.
 *
 * - `Access-Control-Allow-Origin: *` — permite qualquer origem (adequado para APIs públicas;
 *   a autenticação é feita via token JWT, não via origem).
 * - `Access-Control-Allow-Headers` — lista todos os headers que o Supabase JS SDK envia.
 *
 * ATENÇÃO: Se futuramente precisar restringir origens, substitua `*` pelo domínio do frontend
 * (ex: "https://loyalty-palooza.lovable.app").
 */
export const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

/**
 * Intercepta requisições preflight (OPTIONS) e retorna resposta vazia com headers CORS.
 *
 * Deve ser chamada no início de toda Edge Function **antes** de qualquer lógica.
 * Se retornar `null`, a requisição não é preflight e deve prosseguir normalmente.
 *
 * @param req - Requisição HTTP recebida pelo Deno.serve
 * @returns `Response` para preflight ou `null` para requisições normais
 */
export function handleCors(req: Request): Response | null {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }
  return null;
}
