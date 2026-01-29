-- Add INSERT policy for profiles table
-- Profiles are created automatically by the handle_new_user trigger
-- This policy ensures only the system (via trigger) can insert profiles
-- No direct user INSERT is allowed since profile creation is handled by the trigger

CREATE POLICY "Profiles are created via trigger only"
ON public.profiles
FOR INSERT
WITH CHECK (false);

-- Note: The handle_new_user trigger runs with SECURITY DEFINER which bypasses RLS
-- This means profiles can only be created through the auth signup process