
-- =============================================
-- CORPORATIVO: Benefícios
-- =============================================
CREATE TABLE public.corporativo_beneficios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  descricao text NOT NULL,
  detalhe text,
  estatistica text,
  icone text NOT NULL DEFAULT 'Heart',
  imagem_url text,
  ordem integer NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.corporativo_beneficios ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active benefits" ON public.corporativo_beneficios FOR SELECT USING (ativo = true);
CREATE POLICY "Admins manage benefits" ON public.corporativo_beneficios FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

-- =============================================
-- CORPORATIVO: Galeria (fotos e vídeos)
-- =============================================
CREATE TABLE public.corporativo_galeria (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  descricao text,
  url text NOT NULL,
  tipo text NOT NULL DEFAULT 'foto', -- 'foto' ou 'video'
  ordem integer NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.corporativo_galeria ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active gallery" ON public.corporativo_galeria FOR SELECT USING (ativo = true);
CREATE POLICY "Admins manage gallery" ON public.corporativo_galeria FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

-- =============================================
-- CORPORATIVO: Depoimentos
-- =============================================
CREATE TABLE public.corporativo_depoimentos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  cargo text NOT NULL,
  empresa text NOT NULL,
  depoimento text NOT NULL,
  estrelas integer NOT NULL DEFAULT 5,
  foto_url text,
  metricas jsonb DEFAULT '{}',
  detalhes text,
  ordem integer NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.corporativo_depoimentos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active testimonials" ON public.corporativo_depoimentos FOR SELECT USING (ativo = true);
CREATE POLICY "Admins manage testimonials" ON public.corporativo_depoimentos FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

-- =============================================
-- CORPORATIVO: Cases de Sucesso
-- =============================================
CREATE TABLE public.corporativo_cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  empresa text NOT NULL,
  setor text NOT NULL,
  logo_emoji text DEFAULT '🏢',
  descricao text NOT NULL,
  resultado text NOT NULL,
  depoimento text,
  fonte text,
  detalhe_extra text,
  imagem_url text,
  ordem integer NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.corporativo_cases ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active cases" ON public.corporativo_cases FOR SELECT USING (ativo = true);
CREATE POLICY "Admins manage cases" ON public.corporativo_cases FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

-- =============================================
-- CORPORATIVO: Eventos Reais (sub-seção de Cases)
-- =============================================
CREATE TABLE public.corporativo_eventos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  descricao text NOT NULL,
  detalhe text,
  icone text NOT NULL DEFAULT 'Award',
  imagem_url text,
  ordem integer NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.corporativo_eventos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active events" ON public.corporativo_eventos FOR SELECT USING (ativo = true);
CREATE POLICY "Admins manage events" ON public.corporativo_eventos FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

-- =============================================
-- CORPORATIVO: FAQ
-- =============================================
CREATE TABLE public.corporativo_faq (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  pergunta text NOT NULL,
  resposta text NOT NULL,
  detalhes jsonb DEFAULT '[]',
  ordem integer NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.corporativo_faq ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active faq" ON public.corporativo_faq FOR SELECT USING (ativo = true);
CREATE POLICY "Admins manage faq" ON public.corporativo_faq FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

-- =============================================
-- CORPORATIVO: Planos
-- =============================================
CREATE TABLE public.corporativo_planos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  subtitulo text,
  icone text NOT NULL DEFAULT 'Star',
  preco text NOT NULL,
  periodo text DEFAULT '/mês',
  descricao text,
  beneficios jsonb DEFAULT '[]',
  ideal_para text,
  como_funciona text,
  destaque boolean NOT NULL DEFAULT false,
  ordem integer NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.corporativo_planos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active plans" ON public.corporativo_planos FOR SELECT USING (ativo = true);
CREATE POLICY "Admins manage plans" ON public.corporativo_planos FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));

-- =============================================
-- CORPORATIVO: Logos (empresas parceiras)
-- =============================================
CREATE TABLE public.corporativo_logos (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nome text NOT NULL,
  logo_url text,
  ordem integer NOT NULL DEFAULT 0,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now()
);
ALTER TABLE public.corporativo_logos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active logos" ON public.corporativo_logos FOR SELECT USING (ativo = true);
CREATE POLICY "Admins manage logos" ON public.corporativo_logos FOR ALL USING (has_role(auth.uid(), 'admin')) WITH CHECK (has_role(auth.uid(), 'admin'));
