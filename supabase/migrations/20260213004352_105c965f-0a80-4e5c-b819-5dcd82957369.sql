
-- Drop the current overly permissive SELECT policy
DROP POLICY IF EXISTS "Terapeutas básicos visíveis para autenticados" ON public.terapeutas;

-- Create new policy: only admins can SELECT directly (non-admins use get_terapeutas_publicos function)
CREATE POLICY "Apenas admins veem terapeutas diretamente"
ON public.terapeutas
FOR SELECT
USING (has_role(auth.uid(), 'admin'::app_role));
