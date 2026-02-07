-- Criar tabela de avaliações posturais
CREATE TABLE public.avaliacoes_posturais (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  data TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  foto_anterior TEXT,
  foto_posterior TEXT,
  foto_lateral_direita TEXT,
  foto_lateral_esquerda TEXT,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.avaliacoes_posturais ENABLE ROW LEVEL SECURITY;

-- RLS policies
CREATE POLICY "Usuários veem próprias avaliações posturais"
  ON public.avaliacoes_posturais FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários criam próprias avaliações posturais"
  ON public.avaliacoes_posturais FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários atualizam próprias avaliações posturais"
  ON public.avaliacoes_posturais FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários deletam próprias avaliações posturais"
  ON public.avaliacoes_posturais FOR DELETE
  USING (auth.uid() = user_id);

-- Criar bucket de storage privado para fotos posturais
INSERT INTO storage.buckets (id, name, public) VALUES ('avaliacoes-posturais', 'avaliacoes-posturais', false);

-- Políticas de storage
CREATE POLICY "Usuários podem ver próprias fotos posturais"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avaliacoes-posturais' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Usuários podem enviar fotos posturais"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'avaliacoes-posturais' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Usuários podem deletar fotos posturais"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'avaliacoes-posturais' AND auth.uid()::text = (storage.foldername(name))[1]);