-- Corrigir políticas RLS permissivas em resi_conversations
DROP POLICY IF EXISTS "Sistema insere conversas" ON public.resi_conversations;

-- A Edge Function usa service role, então não precisa de RLS para INSERT
-- Vamos restringir a INSERT apenas para usuários autenticados inserindo os próprios dados
CREATE POLICY "Usuários inserem suas próprias conversas"
  ON public.resi_conversations FOR INSERT
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

-- Corrigir daily_missions INSERT — apenas o próprio usuário
DROP POLICY IF EXISTS "Sistema cria missões" ON public.daily_missions;

CREATE POLICY "Usuários criam suas próprias missões"
  ON public.daily_missions FOR INSERT
  WITH CHECK (auth.uid() = user_id);