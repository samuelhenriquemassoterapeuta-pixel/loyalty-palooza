import { createClient, SupabaseClient } from "https://esm.sh/@supabase/supabase-js@2.89.0";

/** Creates a Supabase client using the SERVICE_ROLE key (full access, no RLS). */
export function createServiceClient(): SupabaseClient {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
  );
}

/** Creates a Supabase client scoped to the calling user (respects RLS). */
export function createUserClient(authHeader: string): SupabaseClient {
  return createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
    { global: { headers: { Authorization: authHeader } } },
  );
}
