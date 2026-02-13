-- Allow admins to manage all agendamentos
CREATE POLICY "Admins gerenciam agendamentos"
ON public.agendamentos
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));
