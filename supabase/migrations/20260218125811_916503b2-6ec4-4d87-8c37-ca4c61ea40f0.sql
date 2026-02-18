
-- Add onboarding tracking to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS onboarding_completo boolean NOT NULL DEFAULT false;
