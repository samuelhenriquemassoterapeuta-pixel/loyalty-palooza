
-- ==============================================
-- Módulo: Protocolos de Emagrecimento & Drenagem
-- ==============================================

-- Tabela de protocolos (templates gerenciados pelo admin)
CREATE TABLE public.protocolos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  tipo TEXT NOT NULL DEFAULT 'emagrecimento', -- emagrecimento, drenagem_pos_operatorio
  duracao_semanas INTEGER NOT NULL DEFAULT 8,
  sessoes_por_semana INTEGER NOT NULL DEFAULT 2,
  disponivel BOOLEAN DEFAULT true,
  imagem_url TEXT,
  beneficios TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.protocolos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Protocolos visíveis para todos"
  ON public.protocolos FOR SELECT
  USING (true);

CREATE POLICY "Admins gerenciam protocolos"
  ON public.protocolos FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Tabela de inscrição do usuário em um protocolo
CREATE TABLE public.usuario_protocolos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  protocolo_id UUID NOT NULL REFERENCES public.protocolos(id),
  data_inicio TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  data_fim TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'ativo', -- ativo, pausado, concluido, cancelado
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.usuario_protocolos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem próprios protocolos"
  ON public.usuario_protocolos FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários criam próprios protocolos"
  ON public.usuario_protocolos FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários atualizam próprios protocolos"
  ON public.usuario_protocolos FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários deletam próprios protocolos"
  ON public.usuario_protocolos FOR DELETE
  USING (auth.uid() = user_id);

-- Fichas de acompanhamento (medidas corporais)
CREATE TABLE public.fichas_acompanhamento (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  protocolo_usuario_id UUID NOT NULL REFERENCES public.usuario_protocolos(id) ON DELETE CASCADE,
  data TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  peso NUMERIC,
  imc NUMERIC,
  gordura_corporal NUMERIC,
  medida_cintura NUMERIC,
  medida_quadril NUMERIC,
  medida_braco NUMERIC,
  medida_coxa NUMERIC,
  medida_torax NUMERIC,
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.fichas_acompanhamento ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem próprias fichas"
  ON public.fichas_acompanhamento FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários criam próprias fichas"
  ON public.fichas_acompanhamento FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários atualizam próprias fichas"
  ON public.fichas_acompanhamento FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários deletam próprias fichas"
  ON public.fichas_acompanhamento FOR DELETE
  USING (auth.uid() = user_id);

-- Metas semanais
CREATE TABLE public.metas_semanais (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  protocolo_usuario_id UUID NOT NULL REFERENCES public.usuario_protocolos(id) ON DELETE CASCADE,
  semana_numero INTEGER NOT NULL DEFAULT 1,
  descricao TEXT NOT NULL,
  meta_valor TEXT,
  concluida BOOLEAN NOT NULL DEFAULT false,
  data_conclusao TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.metas_semanais ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem próprias metas"
  ON public.metas_semanais FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários criam próprias metas"
  ON public.metas_semanais FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários atualizam próprias metas"
  ON public.metas_semanais FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários deletam próprias metas"
  ON public.metas_semanais FOR DELETE
  USING (auth.uid() = user_id);

-- Fotos de evolução (antes/depois)
CREATE TABLE public.fotos_evolucao (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  protocolo_usuario_id UUID NOT NULL REFERENCES public.usuario_protocolos(id) ON DELETE CASCADE,
  foto_url TEXT NOT NULL,
  tipo TEXT NOT NULL DEFAULT 'durante', -- antes, durante, depois
  data TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.fotos_evolucao ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem próprias fotos"
  ON public.fotos_evolucao FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários criam próprias fotos"
  ON public.fotos_evolucao FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários deletam próprias fotos"
  ON public.fotos_evolucao FOR DELETE
  USING (auth.uid() = user_id);

-- Storage bucket para fotos de evolução
INSERT INTO storage.buckets (id, name, public)
VALUES ('fotos-evolucao', 'fotos-evolucao', false)
ON CONFLICT (id) DO NOTHING;

CREATE POLICY "Usuários veem próprias fotos de evolução"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'fotos-evolucao' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Usuários fazem upload de fotos"
  ON storage.objects FOR INSERT
  WITH CHECK (bucket_id = 'fotos-evolucao' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Usuários deletam próprias fotos de evolução"
  ON storage.objects FOR DELETE
  USING (bucket_id = 'fotos-evolucao' AND auth.uid()::text = (storage.foldername(name))[1]);
