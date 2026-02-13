
-- Tabela de exames do usuário
CREATE TABLE public.exames_usuario (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  protocolo_usuario_id UUID REFERENCES public.usuario_protocolos(id) ON DELETE SET NULL,
  nome TEXT NOT NULL,
  tipo_exame TEXT NOT NULL DEFAULT 'outro',
  arquivo_url TEXT NOT NULL,
  arquivo_tipo TEXT NOT NULL DEFAULT 'image/jpeg',
  tamanho_bytes INTEGER,
  observacoes TEXT,
  data_exame DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.exames_usuario ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem próprios exames"
  ON public.exames_usuario FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários criam próprios exames"
  ON public.exames_usuario FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários deletam próprios exames"
  ON public.exames_usuario FOR DELETE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários atualizam próprios exames"
  ON public.exames_usuario FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Admins gerenciam exames"
  ON public.exames_usuario FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Storage bucket para exames
INSERT INTO storage.buckets (id, name, public) VALUES ('exames-arquivos', 'exames-arquivos', false);

-- Políticas de storage
CREATE POLICY "Usuários fazem upload de exames"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'exames-arquivos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Usuários veem próprios exames storage"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'exames-arquivos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Usuários deletam próprios exames storage"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'exames-arquivos' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Admins acessam exames storage"
  ON storage.objects FOR ALL
  USING (bucket_id = 'exames-arquivos' AND has_role(auth.uid(), 'admin'::app_role));
