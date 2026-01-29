-- Fix remaining permissive policies on indicacoes table
-- Remove the overly permissive INSERT and UPDATE policies

-- Drop the permissive INSERT policy
DROP POLICY IF EXISTS "Sistema pode criar indicações" ON public.indicacoes;

-- Drop the permissive UPDATE policy  
DROP POLICY IF EXISTS "Sistema pode atualizar indicações" ON public.indicacoes;

-- Add a proper INSERT policy: users can create referrals where they are the one being referred
CREATE POLICY "Users can create referrals as the referred user"
ON public.indicacoes
FOR INSERT
WITH CHECK (auth.uid() = indicado_id);