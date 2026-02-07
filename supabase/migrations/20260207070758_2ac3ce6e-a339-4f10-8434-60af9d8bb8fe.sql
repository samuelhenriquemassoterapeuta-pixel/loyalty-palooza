
-- =============================================
-- MÓDULO DE ALONGAMENTO E FLEXIBILIDADE
-- =============================================

-- 1. Biblioteca de exercícios de alongamento
CREATE TABLE public.exercicios_alongamento (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  categoria TEXT NOT NULL DEFAULT 'geral',
  nivel TEXT NOT NULL DEFAULT 'iniciante',
  duracao_segundos INTEGER NOT NULL DEFAULT 30,
  repeticoes INTEGER,
  imagem_url TEXT,
  video_url TEXT,
  instrucoes TEXT,
  musculos_alvo TEXT,
  disponivel BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 2. Planos de alongamento pré-montados
CREATE TABLE public.planos_alongamento (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  nivel TEXT NOT NULL DEFAULT 'iniciante',
  duracao_semanas INTEGER NOT NULL DEFAULT 4,
  frequencia_semanal INTEGER NOT NULL DEFAULT 3,
  objetivo TEXT NOT NULL DEFAULT 'flexibilidade',
  imagem_url TEXT,
  disponivel BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 3. Exercícios dentro de cada plano
CREATE TABLE public.plano_exercicios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  plano_id UUID NOT NULL REFERENCES public.planos_alongamento(id) ON DELETE CASCADE,
  exercicio_id UUID NOT NULL REFERENCES public.exercicios_alongamento(id) ON DELETE CASCADE,
  dia_semana INTEGER NOT NULL DEFAULT 1,
  ordem INTEGER NOT NULL DEFAULT 1,
  series INTEGER NOT NULL DEFAULT 1,
  duracao_segundos INTEGER NOT NULL DEFAULT 30
);

-- 4. Planos ativos do usuário
CREATE TABLE public.usuario_planos_alongamento (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  plano_id UUID NOT NULL REFERENCES public.planos_alongamento(id) ON DELETE CASCADE,
  data_inicio TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  data_fim TIMESTAMP WITH TIME ZONE,
  status TEXT NOT NULL DEFAULT 'ativo',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- 5. Sessões completadas pelo usuário
CREATE TABLE public.sessoes_alongamento (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  plano_id UUID REFERENCES public.planos_alongamento(id) ON DELETE SET NULL,
  data TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  duracao_total_segundos INTEGER NOT NULL DEFAULT 0,
  exercicios_completados INTEGER NOT NULL DEFAULT 0,
  notas TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- =============================================
-- RLS POLICIES
-- =============================================

-- Exercícios: visíveis para todos, gerenciados por admins
ALTER TABLE public.exercicios_alongamento ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Exercícios visíveis para todos"
ON public.exercicios_alongamento FOR SELECT
USING (true);

CREATE POLICY "Admins gerenciam exercícios"
ON public.exercicios_alongamento FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Planos: visíveis para todos, gerenciados por admins
ALTER TABLE public.planos_alongamento ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Planos visíveis para todos"
ON public.planos_alongamento FOR SELECT
USING (true);

CREATE POLICY "Admins gerenciam planos"
ON public.planos_alongamento FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Exercícios dos planos: visíveis para todos, gerenciados por admins
ALTER TABLE public.plano_exercicios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Plano exercícios visíveis para todos"
ON public.plano_exercicios FOR SELECT
USING (true);

CREATE POLICY "Admins gerenciam plano exercícios"
ON public.plano_exercicios FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Planos do usuário: CRUD próprio
ALTER TABLE public.usuario_planos_alongamento ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem próprios planos"
ON public.usuario_planos_alongamento FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuários criam próprios planos"
ON public.usuario_planos_alongamento FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários atualizam próprios planos"
ON public.usuario_planos_alongamento FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Usuários deletam próprios planos"
ON public.usuario_planos_alongamento FOR DELETE
USING (auth.uid() = user_id);

-- Sessões do usuário: CRUD próprio
ALTER TABLE public.sessoes_alongamento ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem próprias sessões"
ON public.sessoes_alongamento FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Usuários criam próprias sessões"
ON public.sessoes_alongamento FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários atualizam próprias sessões"
ON public.sessoes_alongamento FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Usuários deletam próprias sessões"
ON public.sessoes_alongamento FOR DELETE
USING (auth.uid() = user_id);
