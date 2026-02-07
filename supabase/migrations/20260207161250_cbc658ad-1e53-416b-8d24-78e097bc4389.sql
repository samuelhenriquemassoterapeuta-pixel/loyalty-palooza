
-- Create annotations table for postural assessment photos
CREATE TABLE public.anotacoes_posturais (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  avaliacao_id UUID NOT NULL REFERENCES public.avaliacoes_posturais(id) ON DELETE CASCADE,
  vista TEXT NOT NULL CHECK (vista IN ('anterior', 'posterior', 'lateral_direita', 'lateral_esquerda')),
  anotacoes JSONB NOT NULL DEFAULT '[]'::jsonb,
  user_id UUID NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(avaliacao_id, vista)
);

-- Enable RLS
ALTER TABLE public.anotacoes_posturais ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Users can view their own annotations"
ON public.anotacoes_posturais FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own annotations"
ON public.anotacoes_posturais FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own annotations"
ON public.anotacoes_posturais FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own annotations"
ON public.anotacoes_posturais FOR DELETE
USING (auth.uid() = user_id);

-- Auto-update timestamp trigger
CREATE TRIGGER update_anotacoes_posturais_updated_at
BEFORE UPDATE ON public.anotacoes_posturais
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();
