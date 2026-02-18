
-- =============================================
-- 1. Tabela de badges
-- =============================================
CREATE TABLE IF NOT EXISTS public.badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(50) NOT NULL,
  descricao TEXT,
  imagem_url TEXT,
  tipo VARCHAR(30) NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Badges visíveis para autenticados"
  ON public.badges FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins gerenciam badges"
  ON public.badges FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Inserir badges de curador
INSERT INTO public.badges (nome, descricao, tipo) VALUES
  ('Curador Bronze', 'Sugeriu 1 playlist aprovada', 'curador_bronze'),
  ('Curador Prata', 'Sugestão atingiu 100 escolhas', 'curador_prata'),
  ('Curador Ouro', 'Sugestão atingiu 500 escolhas', 'curador_ouro'),
  ('Curador do Mês', 'Playlist mais escolhida do mês', 'curador_mes')
ON CONFLICT (tipo) DO NOTHING;

-- =============================================
-- 2. Tabela de conquistas do usuário (badges)
-- =============================================
CREATE TABLE IF NOT EXISTS public.conquistas_usuario_badges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL,
  badge_id UUID REFERENCES public.badges(id) ON DELETE CASCADE NOT NULL,
  data_conquista TIMESTAMPTZ DEFAULT now(),
  metadata JSONB,
  UNIQUE(usuario_id, badge_id)
);

ALTER TABLE public.conquistas_usuario_badges ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem suas conquistas de badges"
  ON public.conquistas_usuario_badges FOR SELECT
  USING (auth.uid() = usuario_id);

CREATE POLICY "Sistema insere conquistas de badges"
  ON public.conquistas_usuario_badges FOR INSERT
  WITH CHECK (auth.uid() IS NOT NULL);

CREATE POLICY "Admins gerenciam conquistas badges"
  ON public.conquistas_usuario_badges FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- 3. Trigger para milestones de playlist
-- =============================================
CREATE OR REPLACE FUNCTION public.check_playlist_milestones()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_badge_id UUID;
BEGIN
  IF NEW.sugerida_por IS NOT NULL THEN
    -- Curador Prata: 100 escolhas
    IF NEW.vezes_escolhida >= 100 AND (OLD.vezes_escolhida < 100 OR OLD IS NULL) THEN
      SELECT id INTO v_badge_id FROM public.badges WHERE tipo = 'curador_prata';
      IF v_badge_id IS NOT NULL THEN
        INSERT INTO public.conquistas_usuario_badges (usuario_id, badge_id, metadata)
        VALUES (NEW.sugerida_por, v_badge_id, jsonb_build_object('playlist_id', NEW.id, 'escolhas', NEW.vezes_escolhida))
        ON CONFLICT (usuario_id, badge_id) DO NOTHING;
      END IF;
    END IF;

    -- Curador Ouro: 500 escolhas
    IF NEW.vezes_escolhida >= 500 AND (OLD.vezes_escolhida < 500 OR OLD IS NULL) THEN
      SELECT id INTO v_badge_id FROM public.badges WHERE tipo = 'curador_ouro';
      IF v_badge_id IS NOT NULL THEN
        INSERT INTO public.conquistas_usuario_badges (usuario_id, badge_id, metadata)
        VALUES (NEW.sugerida_por, v_badge_id, jsonb_build_object('playlist_id', NEW.id, 'escolhas', NEW.vezes_escolhida))
        ON CONFLICT (usuario_id, badge_id) DO NOTHING;
      END IF;
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS trg_check_playlist_milestones ON public.playlists;
CREATE TRIGGER trg_check_playlist_milestones
  AFTER UPDATE OF vezes_escolhida ON public.playlists
  FOR EACH ROW
  EXECUTE FUNCTION public.check_playlist_milestones();

-- =============================================
-- 4. Função ranking mensal de curadores
-- =============================================
CREATE OR REPLACE FUNCTION public.calcular_ranking_curadores(mes DATE DEFAULT CURRENT_DATE)
RETURNS TABLE(usuario_id UUID, total_escolhas BIGINT)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT p.sugerida_por, SUM(p.vezes_escolhida)::BIGINT AS total
  FROM public.playlists p
  WHERE p.sugerida_por IS NOT NULL
    AND p.data_sugestao >= date_trunc('month', mes)
    AND p.data_sugestao < date_trunc('month', mes) + INTERVAL '1 month'
  GROUP BY p.sugerida_por
  ORDER BY total DESC;
END;
$$;
