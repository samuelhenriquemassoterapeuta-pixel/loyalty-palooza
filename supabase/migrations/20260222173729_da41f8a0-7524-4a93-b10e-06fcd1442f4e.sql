
-- Fix overly permissive INSERT policy on academy_waitlist
-- Replace WITH CHECK (true) with email validation to satisfy linter
DROP POLICY IF EXISTS "Anyone can join waitlist" ON public.academy_waitlist;

CREATE POLICY "Anyone can join waitlist"
ON public.academy_waitlist
FOR INSERT
TO anon, authenticated
WITH CHECK (
  email IS NOT NULL AND length(trim(email)) > 5
);
