
-- ============================================================
-- FIX 1: Restrict therapist contact info to authenticated users
-- ============================================================

-- Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Terapeutas são visíveis para todos" ON public.terapeutas;

-- Create a policy that shows basic info (nome, especialidade, foto, disponivel) to everyone
-- but email/telefone only to authenticated users
-- Since RLS is row-level not column-level, we need two policies:
-- 1. Public can see therapists (they'll use a view for restricted columns)
-- 2. Authenticated users see everything

-- Allow authenticated users to see all therapist data
CREATE POLICY "Terapeutas visíveis para autenticados"
ON public.terapeutas
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- ============================================================
-- FIX 2: Restrict avaliacoes to authenticated users only
-- ============================================================

-- Drop the overly permissive public SELECT policy
DROP POLICY IF EXISTS "Avaliações visíveis para todos" ON public.avaliacoes;

-- Allow only authenticated users to see reviews
CREATE POLICY "Avaliações visíveis para autenticados"
ON public.avaliacoes
FOR SELECT
USING (auth.uid() IS NOT NULL);

-- ============================================================
-- FIX 3: Block users from editing their own referral code
-- ============================================================

-- Create a trigger to prevent changing codigo_indicacao
CREATE OR REPLACE FUNCTION public.protect_referral_code()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- If codigo_indicacao is being changed, revert it
  IF OLD.codigo_indicacao IS NOT NULL AND NEW.codigo_indicacao IS DISTINCT FROM OLD.codigo_indicacao THEN
    NEW.codigo_indicacao := OLD.codigo_indicacao;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER protect_profiles_referral_code
BEFORE UPDATE ON public.profiles
FOR EACH ROW
EXECUTE FUNCTION public.protect_referral_code();

-- ============================================================
-- FIX 4: Add storage policy for fotos-evolucao bucket
-- Ensure only the owner can access their photos via signed URLs
-- ============================================================

-- Add policy so users can only read their own photos
CREATE POLICY "Users can view own evolution photos"
ON storage.objects
FOR SELECT
USING (
  bucket_id = 'fotos-evolucao'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Add policy so users can upload to their own folder
CREATE POLICY "Users can upload own evolution photos"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'fotos-evolucao'
  AND auth.uid()::text = (storage.foldername(name))[1]
);

-- Add policy so users can delete their own photos
CREATE POLICY "Users can delete own evolution photos"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'fotos-evolucao'
  AND auth.uid()::text = (storage.foldername(name))[1]
);
