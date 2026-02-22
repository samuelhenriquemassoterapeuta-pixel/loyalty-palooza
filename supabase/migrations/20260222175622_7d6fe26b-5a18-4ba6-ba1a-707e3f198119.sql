
-- =====================================================
-- FIX 1: chat_interactions - remover acesso a logs WhatsApp por qualquer autenticado
-- =====================================================
DROP POLICY IF EXISTS "Users can view own chat interactions" ON public.chat_interactions;
CREATE POLICY "Users can view own chat interactions"
ON public.chat_interactions FOR SELECT TO authenticated
USING (auth.uid()::text = user_id);

-- =====================================================
-- FIX 2: whatsapp_logs INSERT - corrigir política que permite inserts anônimos
-- A política atual usa WITH CHECK (auth.uid() IS NULL), que permite inserts anônimos.
-- Inserts de logs devem vir apenas do service_role (edge functions), nunca do cliente.
-- =====================================================
DROP POLICY IF EXISTS "Service role pode inserir logs WhatsApp" ON public.whatsapp_logs;
-- Service role bypassa RLS automaticamente, então não precisamos de uma policy para inserts.
-- Removemos a policy insegura e não criamos outra - service_role já tem acesso total.

-- =====================================================
-- FIX 3: resi_agents_config - impedir exposição de system_prompts
-- A policy "Anyone can view active agents config" expõe prompts internos.
-- Removemos essa policy pública - agentes são carregados no servidor (edge functions via service_role)
-- =====================================================
DROP POLICY IF EXISTS "Anyone can view active agents config" ON public.resi_agents_config;
