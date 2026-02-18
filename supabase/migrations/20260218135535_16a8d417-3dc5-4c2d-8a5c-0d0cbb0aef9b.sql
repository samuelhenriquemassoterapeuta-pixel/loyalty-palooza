
-- =============================================
-- LIGA RESINKRA - Sistema de ligas competitivas
-- =============================================

CREATE TABLE public.ligas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  tipo TEXT NOT NULL DEFAULT 'semanal',
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  ativa BOOLEAN NOT NULL DEFAULT true,
  premio_1 TEXT,
  premio_2 TEXT,
  premio_3 TEXT,
  premio_1_valor NUMERIC NOT NULL DEFAULT 0,
  premio_2_valor NUMERIC NOT NULL DEFAULT 0,
  premio_3_valor NUMERIC NOT NULL DEFAULT 0,
  criterio TEXT NOT NULL DEFAULT 'xp',
  icone TEXT NOT NULL DEFAULT '🏆',
  cor TEXT NOT NULL DEFAULT '#FFD700',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE public.liga_participantes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  liga_id UUID NOT NULL REFERENCES public.ligas(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  pontos NUMERIC NOT NULL DEFAULT 0,
  sessoes INTEGER NOT NULL DEFAULT 0,
  compras INTEGER NOT NULL DEFAULT 0,
  indicacoes INTEGER NOT NULL DEFAULT 0,
  posts_social INTEGER NOT NULL DEFAULT 0,
  posicao INTEGER,
  premiado BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(liga_id, user_id)
);

ALTER TABLE public.ligas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.liga_participantes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active ligas" ON public.ligas
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Admins can manage ligas" ON public.ligas
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can view liga participantes" ON public.liga_participantes
  FOR SELECT TO authenticated USING (true);

CREATE POLICY "Users can join ligas" ON public.liga_participantes
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "System can update participantes" ON public.liga_participantes
  FOR UPDATE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

ALTER PUBLICATION supabase_realtime ADD TABLE public.liga_participantes;
