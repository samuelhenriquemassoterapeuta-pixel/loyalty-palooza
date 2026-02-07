-- Adicionar escala EVA (Escala Visual Analógica de dor) na ficha de acompanhamento
ALTER TABLE public.fichas_acompanhamento
ADD COLUMN escala_eva integer DEFAULT NULL;

-- Adicionar constraint para garantir valores válidos (0-10)
ALTER TABLE public.fichas_acompanhamento
ADD CONSTRAINT fichas_escala_eva_check CHECK (escala_eva IS NULL OR (escala_eva >= 0 AND escala_eva <= 10));