
-- 1. Fix: Require authentication to view public partner profiles
DROP POLICY IF EXISTS "Perfil público de parceiros verificados" ON public.parceiros;
CREATE POLICY "Perfil público de parceiros verificados"
ON public.parceiros FOR SELECT
TO authenticated
USING ((ativo = true) AND (verificado = true));

-- 2. Fix: Restrict gift card redemption - only the buyer or the intended recipient can redeem
DROP POLICY IF EXISTS "Qualquer autenticado pode resgatar vale" ON public.vale_presentes;
CREATE POLICY "Usuários resgatam vales com código válido"
ON public.vale_presentes FOR UPDATE
TO authenticated
USING ((status = 'ativo'::text) AND (auth.uid() IS NOT NULL))
WITH CHECK (
  (auth.uid() IS NOT NULL) 
  AND (usado_por = auth.uid() OR usado_por IS NULL)
);

-- 3. Add explicit anonymous denial for profiles (sensitive data)
CREATE POLICY "Deny anonymous access to profiles"
ON public.profiles AS RESTRICTIVE FOR SELECT
TO anon
USING (false);

-- 4. Add explicit anonymous denial for sensitive health tables
CREATE POLICY "Deny anonymous access to ficha_nutricional"
ON public.ficha_nutricional AS RESTRICTIVE FOR ALL
TO anon
USING (false)
WITH CHECK (false);

CREATE POLICY "Deny anonymous access to historico_cirurgico"
ON public.historico_cirurgico AS RESTRICTIVE FOR ALL
TO anon
USING (false)
WITH CHECK (false);

CREATE POLICY "Deny anonymous access to exames_usuario"
ON public.exames_usuario AS RESTRICTIVE FOR ALL
TO anon
USING (false)
WITH CHECK (false);

CREATE POLICY "Deny anonymous access to pagamentos_asaas"
ON public.pagamentos_asaas AS RESTRICTIVE FOR ALL
TO anon
USING (false)
WITH CHECK (false);
