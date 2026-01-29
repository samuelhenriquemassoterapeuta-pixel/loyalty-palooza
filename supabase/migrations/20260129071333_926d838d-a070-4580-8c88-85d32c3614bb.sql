-- Fix 1: Remove permissive INSERT policy on notificacoes table
-- Edge functions use service role which bypasses RLS, triggers use SECURITY DEFINER
DROP POLICY IF EXISTS "Sistema pode criar notificações" ON public.notificacoes;

-- Fix 2: Add unique constraint on agendamentos to prevent race conditions
-- This ensures only one active appointment can exist per time slot
CREATE UNIQUE INDEX IF NOT EXISTS unique_active_appointment_per_slot 
ON public.agendamentos (data_hora) 
WHERE status = 'agendado';

-- Fix 3: Configure avatars storage bucket with proper MIME type and size restrictions
UPDATE storage.buckets 
SET 
  allowed_mime_types = ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
  file_size_limit = 5242880 -- 5MB in bytes
WHERE id = 'avatars';