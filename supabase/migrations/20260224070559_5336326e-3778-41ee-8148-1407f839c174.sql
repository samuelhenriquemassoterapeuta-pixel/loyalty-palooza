-- Fix overly permissive audit log insert policy
DROP POLICY IF EXISTS "System inserts audit" ON public.financeiro_audit_log;

-- Only authenticated users can insert audit logs (not anon)
CREATE POLICY "Authenticated users insert audit logs"
ON public.financeiro_audit_log
FOR INSERT
TO authenticated
WITH CHECK (true);

-- Ensure anon cannot insert
CREATE POLICY "Block anon financeiro_audit_log"
ON public.financeiro_audit_log
AS RESTRICTIVE
FOR ALL
TO anon
USING (false)
WITH CHECK (false);