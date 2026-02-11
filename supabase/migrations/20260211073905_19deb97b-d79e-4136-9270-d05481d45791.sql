
-- ========================================
-- 1. Protocolo Linfedema: sub-seções clínicas interativas
-- ========================================
CREATE TABLE public.protocolo_secoes_clinicas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  protocolo_id UUID NOT NULL REFERENCES public.protocolos(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  descricao TEXT,
  conteudo JSONB NOT NULL DEFAULT '[]'::jsonb,
  ordem INTEGER NOT NULL DEFAULT 0,
  icone TEXT DEFAULT 'info',
  cor TEXT DEFAULT 'primary',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.protocolo_secoes_clinicas ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Seções clínicas visíveis para todos" 
ON public.protocolo_secoes_clinicas FOR SELECT USING (true);

CREATE POLICY "Admins gerenciam seções clínicas" 
ON public.protocolo_secoes_clinicas FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Checklist de progresso do paciente nas seções
CREATE TABLE public.protocolo_secao_checklist (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  secao_id UUID NOT NULL REFERENCES public.protocolo_secoes_clinicas(id) ON DELETE CASCADE,
  item_key TEXT NOT NULL,
  concluido BOOLEAN NOT NULL DEFAULT false,
  data_conclusao TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, secao_id, item_key)
);

ALTER TABLE public.protocolo_secao_checklist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem próprio checklist" 
ON public.protocolo_secao_checklist FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários criam próprio checklist" 
ON public.protocolo_secao_checklist FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários atualizam próprio checklist" 
ON public.protocolo_secao_checklist FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Usuários deletam próprio checklist" 
ON public.protocolo_secao_checklist FOR DELETE USING (auth.uid() = user_id);

-- ========================================
-- 2. Sistema de Dietas Personalizadas
-- ========================================

-- Conteúdo educativo nutricional
CREATE TABLE public.dietas_conteudo (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT,
  conteudo JSONB NOT NULL DEFAULT '[]'::jsonb,
  categoria TEXT NOT NULL DEFAULT 'geral',
  protocolo_tipo TEXT DEFAULT 'drenagem_pos_operatorio',
  imagem_url TEXT,
  ordem INTEGER NOT NULL DEFAULT 0,
  disponivel BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.dietas_conteudo ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Conteúdo dietas visível para autenticados" 
ON public.dietas_conteudo FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins gerenciam conteúdo dietas" 
ON public.dietas_conteudo FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Planos de dieta vinculados a protocolos
CREATE TABLE public.planos_dieta (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  protocolo_id UUID REFERENCES public.protocolos(id) ON DELETE SET NULL,
  nome TEXT NOT NULL,
  descricao TEXT,
  fase TEXT NOT NULL DEFAULT 'intensiva',
  duracao_dias INTEGER DEFAULT 30,
  refeicoes JSONB NOT NULL DEFAULT '[]'::jsonb,
  orientacoes TEXT,
  disponivel BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.planos_dieta ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Planos dieta visíveis para autenticados" 
ON public.planos_dieta FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins gerenciam planos dieta" 
ON public.planos_dieta FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Diário alimentar do paciente
CREATE TABLE public.diario_alimentar (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  data DATE NOT NULL DEFAULT CURRENT_DATE,
  tipo_refeicao TEXT NOT NULL,
  descricao TEXT NOT NULL,
  foto_url TEXT,
  agua_ml INTEGER DEFAULT 0,
  observacoes TEXT,
  plano_dieta_id UUID REFERENCES public.planos_dieta(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.diario_alimentar ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem próprio diário" 
ON public.diario_alimentar FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários criam próprio diário" 
ON public.diario_alimentar FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários atualizam próprio diário" 
ON public.diario_alimentar FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Usuários deletam próprio diário" 
ON public.diario_alimentar FOR DELETE USING (auth.uid() = user_id);

-- Índices para performance
CREATE INDEX idx_protocolo_secoes_protocolo ON public.protocolo_secoes_clinicas(protocolo_id);
CREATE INDEX idx_diario_alimentar_user_data ON public.diario_alimentar(user_id, data);
CREATE INDEX idx_dietas_conteudo_categoria ON public.dietas_conteudo(categoria);
CREATE INDEX idx_planos_dieta_protocolo ON public.planos_dieta(protocolo_id);
