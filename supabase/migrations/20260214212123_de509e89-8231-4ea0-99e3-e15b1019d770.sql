
-- Módulos do curso de vendas
CREATE TABLE public.curso_modulos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT,
  ordem INTEGER NOT NULL DEFAULT 0,
  icone TEXT DEFAULT 'BookOpen',
  cor TEXT DEFAULT 'from-primary/10 to-accent/10',
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Aulas de cada módulo
CREATE TABLE public.curso_aulas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  modulo_id UUID NOT NULL REFERENCES public.curso_modulos(id) ON DELETE CASCADE,
  titulo TEXT NOT NULL,
  descricao TEXT,
  conteudo TEXT NOT NULL,
  video_url TEXT,
  duracao_minutos INTEGER DEFAULT 5,
  ordem INTEGER NOT NULL DEFAULT 0,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Progresso do aluno por aula
CREATE TABLE public.curso_progresso (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  aula_id UUID NOT NULL REFERENCES public.curso_aulas(id) ON DELETE CASCADE,
  concluida BOOLEAN NOT NULL DEFAULT false,
  concluida_em TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, aula_id)
);

-- Enable RLS
ALTER TABLE public.curso_modulos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curso_aulas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.curso_progresso ENABLE ROW LEVEL SECURITY;

-- Módulos e aulas: visíveis para admins e parceiros (equipe)
CREATE POLICY "Equipe pode ver módulos" ON public.curso_modulos
  FOR SELECT TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin') OR public.is_parceiro(auth.uid())
  );

CREATE POLICY "Admin pode gerenciar módulos" ON public.curso_modulos
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Equipe pode ver aulas" ON public.curso_aulas
  FOR SELECT TO authenticated
  USING (
    public.has_role(auth.uid(), 'admin') OR public.is_parceiro(auth.uid())
  );

CREATE POLICY "Admin pode gerenciar aulas" ON public.curso_aulas
  FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Progresso: cada um vê/edita o próprio
CREATE POLICY "Usuário vê próprio progresso" ON public.curso_progresso
  FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Usuário marca progresso" ON public.curso_progresso
  FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuário atualiza progresso" ON public.curso_progresso
  FOR UPDATE TO authenticated
  USING (auth.uid() = user_id);

-- Admin pode ver progresso de todos (para acompanhar equipe)
CREATE POLICY "Admin vê todo progresso" ON public.curso_progresso
  FOR SELECT TO authenticated
  USING (public.has_role(auth.uid(), 'admin'));
