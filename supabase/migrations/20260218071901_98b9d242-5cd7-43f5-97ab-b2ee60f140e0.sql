
-- Tabela de definições de conquistas
CREATE TABLE public.conquistas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  codigo TEXT NOT NULL UNIQUE,
  titulo TEXT NOT NULL,
  descricao TEXT NOT NULL,
  icone TEXT NOT NULL DEFAULT '🏅',
  categoria TEXT NOT NULL DEFAULT 'geral',
  condicao_tipo TEXT NOT NULL, -- 'sessoes', 'gasto', 'indicacoes', 'cashback', 'streak', 'tier', 'custom'
  condicao_valor NUMERIC NOT NULL DEFAULT 1,
  recompensa_tipo TEXT DEFAULT 'cashback',
  recompensa_valor NUMERIC DEFAULT 0,
  secreta BOOLEAN NOT NULL DEFAULT false,
  ativo BOOLEAN NOT NULL DEFAULT true,
  ordem INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabela de conquistas desbloqueadas pelos usuários
CREATE TABLE public.usuario_conquistas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  conquista_id UUID NOT NULL REFERENCES public.conquistas(id) ON DELETE CASCADE,
  desbloqueada_em TIMESTAMPTZ NOT NULL DEFAULT now(),
  recompensa_creditada BOOLEAN NOT NULL DEFAULT false,
  UNIQUE(user_id, conquista_id)
);

ALTER TABLE public.conquistas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.usuario_conquistas ENABLE ROW LEVEL SECURITY;

-- Conquistas visíveis para todos (exceto secretas)
CREATE POLICY "Conquistas públicas visíveis para autenticados"
  ON public.conquistas FOR SELECT
  USING (auth.uid() IS NOT NULL AND (secreta = false OR EXISTS (
    SELECT 1 FROM public.usuario_conquistas uc
    WHERE uc.conquista_id = conquistas.id AND uc.user_id = auth.uid()
  )));

-- Usuários veem suas próprias conquistas
CREATE POLICY "Usuários veem suas conquistas"
  ON public.usuario_conquistas FOR SELECT
  USING (auth.uid() = user_id);

-- Sistema insere conquistas (usuários não podem)
CREATE POLICY "Sistema insere conquistas"
  ON public.usuario_conquistas FOR INSERT
  WITH CHECK (auth.uid() IS NULL);

-- Block anon access
CREATE POLICY "Block anon conquistas"
  ON public.conquistas FOR SELECT
  USING (auth.role() = 'authenticated');

CREATE POLICY "Block anon usuario_conquistas"
  ON public.usuario_conquistas FOR SELECT
  USING (auth.role() = 'authenticated');

-- Índices
CREATE INDEX idx_usuario_conquistas_user ON public.usuario_conquistas(user_id);
CREATE INDEX idx_conquistas_codigo ON public.conquistas(codigo);

-- Inserir conquistas padrão
INSERT INTO public.conquistas (codigo, titulo, descricao, icone, categoria, condicao_tipo, condicao_valor, recompensa_valor, ordem) VALUES
  ('primeira_sessao', 'Primeira Sessão', 'Conclua sua primeira sessão', '💆', 'sessoes', 'sessoes', 1, 5, 1),
  ('5_sessoes', 'Habitué', 'Conclua 5 sessões', '⭐', 'sessoes', 'sessoes', 5, 10, 2),
  ('10_sessoes', 'Cliente Fiel', 'Conclua 10 sessões', '🌟', 'sessoes', 'sessoes', 10, 20, 3),
  ('25_sessoes', 'Expert em Bem-Estar', 'Conclua 25 sessões', '💎', 'sessoes', 'sessoes', 25, 50, 4),
  ('primeira_indicacao', 'Embaixador Iniciante', 'Faça sua primeira indicação', '🤝', 'indicacoes', 'indicacoes', 1, 5, 5),
  ('5_indicacoes', 'Influenciador', 'Indique 5 amigos', '📣', 'indicacoes', 'indicacoes', 5, 15, 6),
  ('tier_prata', 'Nível Prata', 'Alcance o nível Prata', '🥈', 'tier', 'tier', 2, 10, 7),
  ('tier_ouro', 'Nível Ouro', 'Alcance o nível Ouro', '🥇', 'tier', 'tier', 3, 25, 8),
  ('primeira_compra', 'Primeira Compra', 'Faça sua primeira compra na loja', '🛒', 'compras', 'compras', 1, 5, 9),
  ('gasto_100', 'Investidor', 'Gaste R$ 100 na plataforma', '💰', 'gasto', 'gasto', 100, 10, 10),
  ('gasto_500', 'Patrono', 'Gaste R$ 500 na plataforma', '👑', 'gasto', 'gasto', 500, 30, 11),
  ('streak_4', 'Constância', '4 semanas consecutivas com sessão', '🔥', 'streak', 'streak', 4, 15, 12),
  ('desafio_completo', 'Desafiante', 'Complete seu primeiro desafio', '🏆', 'desafios', 'custom', 1, 5, 13),
  ('social_post', 'Social Star', 'Tenha um post aprovado no Social Moments', '📸', 'social', 'custom', 1, 5, 14);

-- Função para verificar e desbloquear conquistas
CREATE OR REPLACE FUNCTION public.check_and_unlock_achievements(p_user_id UUID)
RETURNS TABLE(conquista_codigo TEXT, conquista_titulo TEXT, conquista_icone TEXT, recompensa NUMERIC)
LANGUAGE plpgsql SECURITY DEFINER SET search_path TO 'public'
AS $$
DECLARE
  v_conquista RECORD;
  v_count NUMERIC;
  v_qualifica BOOLEAN;
BEGIN
  FOR v_conquista IN
    SELECT c.* FROM public.conquistas c
    WHERE c.ativo = true
      AND NOT EXISTS (
        SELECT 1 FROM public.usuario_conquistas uc
        WHERE uc.user_id = p_user_id AND uc.conquista_id = c.id
      )
    ORDER BY c.ordem
  LOOP
    v_qualifica := false;

    CASE v_conquista.condicao_tipo
      WHEN 'sessoes' THEN
        SELECT COUNT(*) INTO v_count FROM public.agendamentos
        WHERE user_id = p_user_id AND status IN ('concluido', 'realizado');
        v_qualifica := v_count >= v_conquista.condicao_valor;

      WHEN 'indicacoes' THEN
        SELECT COUNT(*) INTO v_count FROM public.indicacoes
        WHERE indicador_id = p_user_id AND status = 'processado';
        v_qualifica := v_count >= v_conquista.condicao_valor;

      WHEN 'compras' THEN
        SELECT COUNT(*) INTO v_count FROM public.pedidos
        WHERE user_id = p_user_id AND status != 'cancelado';
        v_qualifica := v_count >= v_conquista.condicao_valor;

      WHEN 'gasto' THEN
        SELECT COALESCE(gt.total_gasto, 0) INTO v_count FROM public.get_user_tier(p_user_id) gt;
        v_qualifica := v_count >= v_conquista.condicao_valor;

      WHEN 'tier' THEN
        SELECT CASE
          WHEN gt.tier_name = 'Ouro' THEN 3
          WHEN gt.tier_name = 'Prata' THEN 2
          ELSE 1
        END INTO v_count FROM public.get_user_tier(p_user_id) gt;
        v_qualifica := v_count >= v_conquista.condicao_valor;

      WHEN 'streak' THEN
        -- Streak check: count consecutive weeks with at least one completed session
        WITH weeks AS (
          SELECT DISTINCT date_trunc('week', data_hora) AS semana
          FROM public.agendamentos
          WHERE user_id = p_user_id AND status IN ('concluido', 'realizado')
          ORDER BY semana DESC
        ),
        numbered AS (
          SELECT semana, ROW_NUMBER() OVER (ORDER BY semana DESC) AS rn
          FROM weeks
        ),
        streak AS (
          SELECT COUNT(*) AS streak_count FROM numbered
          WHERE semana >= date_trunc('week', now()) - ((rn - 1) * INTERVAL '1 week')
            AND semana <= date_trunc('week', now()) - ((rn - 1) * INTERVAL '1 week') + INTERVAL '6 days'
        )
        SELECT COALESCE(streak_count, 0) INTO v_count FROM streak;
        v_qualifica := v_count >= v_conquista.condicao_valor;

      ELSE
        v_qualifica := false;
    END CASE;

    IF v_qualifica THEN
      INSERT INTO public.usuario_conquistas (user_id, conquista_id, recompensa_creditada)
      VALUES (p_user_id, v_conquista.id, true);

      -- Credit reward
      IF v_conquista.recompensa_valor > 0 THEN
        INSERT INTO public.transacoes (user_id, tipo, valor, descricao, referencia_id, expira_em)
        VALUES (
          p_user_id, 'cashback', v_conquista.recompensa_valor,
          'Conquista desbloqueada: ' || v_conquista.titulo || ' ' || v_conquista.icone,
          v_conquista.id, now() + INTERVAL '90 days'
        );
      END IF;

      -- Notify
      INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
      VALUES (
        p_user_id,
        'Conquista desbloqueada! ' || v_conquista.icone,
        'Parabéns! Você desbloqueou "' || v_conquista.titulo || '"' ||
        CASE WHEN v_conquista.recompensa_valor > 0
          THEN ' e ganhou ℜ ' || REPLACE(TO_CHAR(v_conquista.recompensa_valor, 'FM999990D00'), '.', ',') || '!'
          ELSE '!'
        END,
        'cashback'
      );

      conquista_codigo := v_conquista.codigo;
      conquista_titulo := v_conquista.titulo;
      conquista_icone := v_conquista.icone;
      recompensa := v_conquista.recompensa_valor;
      RETURN NEXT;
    END IF;
  END LOOP;
END;
$$;
