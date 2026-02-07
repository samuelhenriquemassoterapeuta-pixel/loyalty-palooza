-- Allow authenticated users to insert their own notifications (for achievement proximity alerts)
CREATE POLICY "Usuários podem criar próprias notificações"
ON public.notificacoes
FOR INSERT
WITH CHECK (auth.uid() = user_id);