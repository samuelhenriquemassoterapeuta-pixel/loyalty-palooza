-- Permitir que admins vejam todas as transações
CREATE POLICY "Admins podem ver todas as transações" 
ON public.transacoes 
FOR SELECT 
USING (public.has_role(auth.uid(), 'admin'));