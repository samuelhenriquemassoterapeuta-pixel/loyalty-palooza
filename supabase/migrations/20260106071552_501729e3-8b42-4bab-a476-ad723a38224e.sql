-- Permitir que usuários atualizem seus próprios pedidos (para cancelar)
CREATE POLICY "Usuários podem atualizar próprios pedidos" 
ON public.pedidos 
FOR UPDATE 
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);