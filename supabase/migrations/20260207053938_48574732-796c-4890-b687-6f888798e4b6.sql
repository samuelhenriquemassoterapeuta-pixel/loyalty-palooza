
-- Allow admins to view all referrals
CREATE POLICY "Admins podem ver todas as indicações"
ON public.indicacoes
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));
