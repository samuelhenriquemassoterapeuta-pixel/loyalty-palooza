-- Remove overly permissive policies on chat/whatsapp tables
-- Service role bypasses RLS entirely, so these WITH CHECK(true) / USING(true) policies
-- only create vulnerabilities for authenticated users exploiting them directly.

-- chat_interactions: service_role doesn't need this policy
DROP POLICY IF EXISTS "Service role can insert chat interactions" ON public.chat_interactions;

-- chat_sessions: service_role doesn't need this policy
DROP POLICY IF EXISTS "Service role can manage sessions" ON public.chat_sessions;

-- whatsapp_conversas: service_role doesn't need this policy
DROP POLICY IF EXISTS "Service role full access on whatsapp_conversas" ON public.whatsapp_conversas;