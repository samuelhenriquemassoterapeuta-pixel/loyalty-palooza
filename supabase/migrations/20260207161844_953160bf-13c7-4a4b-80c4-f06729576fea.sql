
-- Drop the existing check constraint and add a wider one that includes measurement vistas
ALTER TABLE public.anotacoes_posturais DROP CONSTRAINT IF EXISTS anotacoes_posturais_vista_check;

ALTER TABLE public.anotacoes_posturais ADD CONSTRAINT anotacoes_posturais_vista_check 
CHECK (vista IN (
  'anterior', 'posterior', 'lateral_direita', 'lateral_esquerda',
  'anterior_measurements', 'posterior_measurements', 
  'lateral_direita_measurements', 'lateral_esquerda_measurements'
));
