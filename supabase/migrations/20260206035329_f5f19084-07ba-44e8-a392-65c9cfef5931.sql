-- Adicionar policy para permitir que usuários excluam suas próprias notificações
CREATE POLICY "Usuários podem excluir próprias notificações"
ON public.notificacoes
FOR DELETE
USING (auth.uid() = user_id);