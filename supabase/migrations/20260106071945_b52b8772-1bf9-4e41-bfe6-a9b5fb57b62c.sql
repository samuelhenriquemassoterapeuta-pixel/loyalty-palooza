-- Permitir que admins atualizem qualquer pedido
CREATE POLICY "Admins podem atualizar pedidos" 
ON public.pedidos 
FOR UPDATE 
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Permitir que admins vejam todos os pedidos
CREATE POLICY "Admins podem ver todos os pedidos" 
ON public.pedidos 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));