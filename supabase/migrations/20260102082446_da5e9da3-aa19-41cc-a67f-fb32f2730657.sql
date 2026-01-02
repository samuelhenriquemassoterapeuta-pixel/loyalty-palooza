-- Permitir inserção de notificações via service role (edge functions)
-- A tabela já tem RLS habilitada, e as edge functions usam service role que bypassa RLS

-- Criar policy para o sistema inserir notificações
CREATE POLICY "Sistema pode criar notificações" 
ON public.notificacoes 
FOR INSERT 
WITH CHECK (true);

-- Nota: Esta policy permite inserção, mas as edge functions usam service role 
-- que já tem acesso total. A policy serve para casos futuros.