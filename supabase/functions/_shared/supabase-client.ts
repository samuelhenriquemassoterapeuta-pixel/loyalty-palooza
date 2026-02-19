/**
 * @module _shared/supabase-client
 * @description Fábricas de clientes Supabase para Edge Functions.
 *
 * Existem dois tipos de cliente, cada um com um nível de acesso diferente:
 *
 * 1. **Service Client** — usa `SUPABASE_SERVICE_ROLE_KEY`, ignora RLS.
 *    Usar apenas para operações administrativas (triggers, webhooks, cron jobs).
 *
 * 2. **User Client** — usa `SUPABASE_ANON_KEY` + token JWT do usuário.
 *    Respeita RLS. Usar para operações em nome do usuário autenticado.
 *
 * ATENÇÃO: O Service Client tem acesso total ao banco. Nunca exponha
 * a `SERVICE_ROLE_KEY` no frontend. Ela só existe em variáveis de ambiente
 * das Edge Functions.
 *
 * @example
 * ```ts
 * // Operação administrativa (ex: webhook Asaas)
 * const admin = createServiceClient();
 * await admin.from("pagamentos_asaas").update({ status: "CONFIRMED" }).eq("id", paymentId);
 *
 * // Operação do usuário (respeita RLS)
 * const userClient = createUserClient(req.headers.get("Authorization")!);
 * const { data } = await userClient.from("agendamentos").select("*");
 * ```
 */

import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

/**
 * Cria um cliente Supabase com privilégios de SERVICE_ROLE (acesso total, sem RLS).
 *
 * Utilizar quando:
 * - Webhooks externos (Asaas, Z-API) que não têm JWT do usuário
 * - Cron jobs e processamento em lote (expiração de cashback, vales)
 * - Operações administrativas que precisam acessar dados de múltiplos usuários
 *
 * @returns Cliente Supabase com acesso irrestrito ao banco
 * @throws {Error} Se SUPABASE_URL ou SUPABASE_SERVICE_ROLE_KEY não estiverem configuradas
 */
export function createServiceClient(): SupabaseClient {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

/**
 * Cria um cliente Supabase vinculado ao usuário autenticado (respeita RLS).
 *
 * Utilizar quando:
 * - A Edge Function é chamada por um usuário logado via `supabase.functions.invoke()`
 * - Precisa garantir que o usuário só acesse seus próprios dados
 *
 * @param authHeader - Header `Authorization` da requisição (formato: "Bearer <jwt>")
 * @returns Cliente Supabase com permissões limitadas pelo RLS do usuário
 * @throws {Error} Se SUPABASE_URL ou SUPABASE_ANON_KEY não estiverem configuradas
 */
export function createUserClient(authHeader: string): SupabaseClient {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } },
  );
}
