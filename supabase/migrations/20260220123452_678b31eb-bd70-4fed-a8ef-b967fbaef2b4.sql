
-- Corrigir DEFAULT do id que ficou sem valor padrão
ALTER TABLE public.resi_agents_config 
  ALTER COLUMN id SET DEFAULT gen_random_uuid();
