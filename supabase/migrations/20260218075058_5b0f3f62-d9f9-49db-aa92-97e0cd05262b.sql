
-- Tabela de missões especiais do Moments
CREATE TABLE public.moments_missoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo TEXT NOT NULL,
  descricao TEXT,
  requisito_tipo TEXT NOT NULL DEFAULT 'tema', -- 'tema', 'plataforma', 'tipo_post'
  requisito_valor TEXT,
  multiplicador_cashback NUMERIC(3,2) DEFAULT 1.0,
  multiplicador_xp NUMERIC(3,2) DEFAULT 1.0,
  multiplicador_cromos NUMERIC(3,2) DEFAULT 1.0,
  data_inicio TIMESTAMPTZ NOT NULL DEFAULT now(),
  data_fim TIMESTAMPTZ NOT NULL,
  ativa BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.moments_missoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Missões visíveis para autenticados"
  ON public.moments_missoes FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins gerenciam missões"
  ON public.moments_missoes FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Tabela de ranking semanal
CREATE TABLE public.moments_ranking (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  semana_inicio DATE NOT NULL,
  semana_fim DATE NOT NULL,
  total_posts INTEGER DEFAULT 0,
  total_xp INTEGER DEFAULT 0,
  total_cashback NUMERIC(10,2) DEFAULT 0,
  total_cromos INTEGER DEFAULT 0,
  posicao INTEGER,
  premio_ganho TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, semana_inicio)
);

ALTER TABLE public.moments_ranking ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Ranking visível para autenticados"
  ON public.moments_ranking FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Sistema gerencia ranking"
  ON public.moments_ranking FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Tabela de destaques da semana
CREATE TABLE public.moments_destaques (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id UUID REFERENCES public.social_posts(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  semana_referencia DATE NOT NULL,
  xp_bonus INTEGER DEFAULT 100,
  pago BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.moments_destaques ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Destaques visíveis para autenticados"
  ON public.moments_destaques FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Admins gerenciam destaques"
  ON public.moments_destaques FOR ALL
  TO authenticated
  USING (public.has_role(auth.uid(), 'admin'::app_role));

-- Adicionar campos ao social_posts para cromos e missão
ALTER TABLE public.social_posts 
  ADD COLUMN IF NOT EXISTS cromos_ether INTEGER DEFAULT 0,
  ADD COLUMN IF NOT EXISTS missao_id UUID REFERENCES public.moments_missoes(id),
  ADD COLUMN IF NOT EXISTS multiplicador_aplicado NUMERIC(3,2) DEFAULT 1.0;

-- Atualizar trigger de aprovação para incluir cromos éther e ranking
CREATE OR REPLACE FUNCTION public.credit_social_post_reward()
  RETURNS trigger
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO 'public'
AS $function$
DECLARE
  v_config RECORD;
  v_missao RECORD;
  v_mult NUMERIC := 1.0;
  v_cromos INTEGER;
  v_semana_inicio DATE;
  v_semana_fim DATE;
BEGIN
  IF NEW.status = 'aprovado' AND OLD.status = 'pendente' THEN
    -- Buscar config de recompensa
    SELECT cashback_valor, xp_valor INTO v_config
    FROM public.social_posts_config
    WHERE tipo_post = NEW.tipo_post AND ativo = true;

    -- Verificar missão ativa vinculada
    IF NEW.missao_id IS NOT NULL THEN
      SELECT multiplicador_cashback, multiplicador_xp, multiplicador_cromos INTO v_missao
      FROM public.moments_missoes
      WHERE id = NEW.missao_id AND ativa = true AND now() BETWEEN data_inicio AND data_fim;
      
      IF v_missao IS NOT NULL THEN
        v_mult := v_missao.multiplicador_cashback;
        NEW.multiplicador_aplicado := v_mult;
      END IF;
    END IF;

    IF v_config IS NOT NULL THEN
      NEW.cashback_valor := ROUND(v_config.cashback_valor * v_mult, 2);
      NEW.xp_valor := ROUND(v_config.xp_valor * COALESCE(v_missao.multiplicador_xp, 1.0));
      NEW.aprovado_em := now();

      -- Calcular cromos éther (base: story=1, feed=3, reels=5)
      v_cromos := CASE NEW.tipo_post
        WHEN 'story' THEN 1
        WHEN 'feed' THEN 3
        WHEN 'reels' THEN 5
        ELSE 1
      END;
      v_cromos := CEIL(v_cromos * COALESCE(v_missao.multiplicador_cromos, 1.0));
      NEW.cromos_ether := v_cromos;

      -- Creditar cashback
      IF NEW.cashback_valor > 0 THEN
        INSERT INTO public.transacoes (user_id, tipo, valor, descricao, referencia_id, expira_em)
        VALUES (
          NEW.user_id, 'cashback', NEW.cashback_valor,
          'Recompensa Resinkra Moments — ' || NEW.tipo_post || ' 📸',
          NEW.id, now() + INTERVAL '90 days'
        );
      END IF;

      -- Creditar cromos éther
      IF v_cromos > 0 THEN
        INSERT INTO public.cromos_usuarios (user_id, elemento, quantidade)
        VALUES (NEW.user_id, 'eter', v_cromos)
        ON CONFLICT (user_id, elemento)
        DO UPDATE SET quantidade = cromos_usuarios.quantidade + v_cromos, updated_at = now();

        INSERT INTO public.transacoes_cromos (user_id, tipo, elemento, quantidade, descricao, referencia_id)
        VALUES (NEW.user_id, 'moments', 'eter', v_cromos, 'Moments: ' || NEW.tipo_post || ' aprovado', NEW.id);
      END IF;

      -- Atualizar ranking semanal
      v_semana_inicio := date_trunc('week', now())::DATE;
      v_semana_fim := v_semana_inicio + 6;

      INSERT INTO public.moments_ranking (user_id, semana_inicio, semana_fim, total_posts, total_xp, total_cashback, total_cromos)
      VALUES (NEW.user_id, v_semana_inicio, v_semana_fim, 1, NEW.xp_valor, NEW.cashback_valor, v_cromos)
      ON CONFLICT (user_id, semana_inicio)
      DO UPDATE SET
        total_posts = moments_ranking.total_posts + 1,
        total_xp = moments_ranking.total_xp + NEW.xp_valor,
        total_cashback = moments_ranking.total_cashback + NEW.cashback_valor,
        total_cromos = moments_ranking.total_cromos + v_cromos;

      -- Notificar usuário
      INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
      VALUES (
        NEW.user_id,
        'Post aprovado! 📸🎉',
        'Seu ' || NEW.tipo_post || ' foi aprovado! Você ganhou R$ ' || 
        REPLACE(TO_CHAR(NEW.cashback_valor, 'FM999990D00'), '.', ',') || 
        ' + ' || NEW.xp_valor || ' XP + ' || v_cromos || ' Cromos Éther! ✨',
        'cashback'
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;

-- Inserir missão inicial
INSERT INTO public.moments_missoes (titulo, descricao, requisito_tipo, requisito_valor, multiplicador_cashback, multiplicador_xp, multiplicador_cromos, data_inicio, data_fim)
VALUES (
  '🔥 Momento de Relaxamento em Casa',
  'Mostre como você usa nossos produtos em casa e ganhe tudo em DOBRO!',
  'tema', 'relaxamento em casa', 2.0, 2.0, 2.0, now(), now() + INTERVAL '7 days'
);
