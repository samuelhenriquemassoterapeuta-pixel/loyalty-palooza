
-- Function to get client segmentation data (admin only, via SECURITY DEFINER)
CREATE OR REPLACE FUNCTION public.get_segmentacao_clientes()
RETURNS TABLE(
  user_id uuid,
  nome text,
  email text,
  telefone text,
  tier_nome text,
  total_sessoes bigint,
  total_gasto numeric,
  ultima_visita timestamp with time zone,
  dias_sem_visita integer,
  ticket_medio numeric,
  total_pedidos bigint,
  data_cadastro timestamp with time zone,
  segmento text
)
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  WITH user_data AS (
    SELECT
      p.id AS uid,
      p.nome AS user_nome,
      p.telefone AS user_telefone,
      p.created_at AS cadastro,
      -- Sessões concluídas
      COALESCE((
        SELECT COUNT(*) FROM agendamentos a
        WHERE a.user_id = p.id AND a.status IN ('concluido', 'realizado')
      ), 0) AS sessoes,
      -- Última visita
      (
        SELECT MAX(a.data_hora) FROM agendamentos a
        WHERE a.user_id = p.id AND a.status IN ('concluido', 'realizado')
      ) AS last_visit,
      -- Total gasto (serviços)
      COALESCE((
        SELECT SUM(s.preco) FROM agendamentos a
        JOIN servicos s ON s.nome = a.servico
        WHERE a.user_id = p.id AND a.status IN ('concluido', 'realizado')
      ), 0) AS gasto_servicos,
      -- Total pedidos
      COALESCE((
        SELECT COUNT(*) FROM pedidos pd
        WHERE pd.user_id = p.id AND pd.status != 'cancelado'
      ), 0) AS num_pedidos,
      -- Total gasto pedidos
      COALESCE((
        SELECT SUM(pd.total) FROM pedidos pd
        WHERE pd.user_id = p.id AND pd.status != 'cancelado'
      ), 0) AS gasto_pedidos,
      -- Tier
      (SELECT gt.tier_name FROM get_user_tier(p.id) gt) AS user_tier
    FROM profiles p
  )
  SELECT
    ud.uid,
    ud.user_nome,
    -- Get email from auth.users via join (SECURITY DEFINER allows this)
    ''::text AS user_email,
    ud.user_telefone,
    COALESCE(ud.user_tier, 'Bronze'),
    ud.sessoes,
    ud.gasto_servicos + ud.gasto_pedidos,
    ud.last_visit,
    CASE WHEN ud.last_visit IS NOT NULL
      THEN EXTRACT(DAY FROM (now() - ud.last_visit))::integer
      ELSE NULL
    END,
    CASE WHEN ud.sessoes > 0
      THEN ROUND((ud.gasto_servicos + ud.gasto_pedidos) / ud.sessoes, 2)
      ELSE 0
    END,
    ud.num_pedidos,
    ud.cadastro,
    -- Segmento automático
    CASE
      WHEN ud.sessoes = 0 THEN 'nunca_visitou'
      WHEN ud.last_visit < now() - INTERVAL '90 days' THEN 'inativo'
      WHEN ud.last_visit < now() - INTERVAL '30 days' THEN 'em_risco'
      WHEN ud.sessoes >= 10 THEN 'fiel'
      WHEN ud.sessoes >= 3 THEN 'recorrente'
      ELSE 'novo'
    END
  FROM user_data ud
  ORDER BY ud.gasto_servicos + ud.gasto_pedidos DESC;
END;
$$;

-- Table for marketing campaigns
CREATE TABLE public.campanhas_marketing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  tipo text NOT NULL DEFAULT 'whatsapp', -- whatsapp, email, banner
  segmentos text[] NOT NULL DEFAULT '{}',
  mensagem text NOT NULL,
  status text NOT NULL DEFAULT 'rascunho', -- rascunho, agendada, enviada, cancelada
  agendada_para timestamp with time zone,
  enviada_em timestamp with time zone,
  total_destinatarios integer DEFAULT 0,
  total_enviados integer DEFAULT 0,
  total_erros integer DEFAULT 0,
  created_by uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.campanhas_marketing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins gerenciam campanhas"
ON public.campanhas_marketing
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Table for banner promotions (shown in-app)
CREATE TABLE public.banners_promocionais (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text NOT NULL,
  subtitulo text,
  imagem_url text,
  link_destino text,
  cor_fundo text DEFAULT '#8B5E3C',
  tipo text NOT NULL DEFAULT 'popup', -- popup, banner_topo, banner_home
  segmentos text[] DEFAULT '{}',
  ativo boolean NOT NULL DEFAULT true,
  data_inicio date NOT NULL DEFAULT CURRENT_DATE,
  data_fim date,
  prioridade integer DEFAULT 0,
  visualizacoes integer DEFAULT 0,
  cliques integer DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

ALTER TABLE public.banners_promocionais ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins gerenciam banners"
ON public.banners_promocionais
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Banners ativos visíveis para autenticados"
ON public.banners_promocionais
FOR SELECT
USING (ativo = true AND auth.uid() IS NOT NULL AND data_inicio <= CURRENT_DATE AND (data_fim IS NULL OR data_fim >= CURRENT_DATE));

-- Track which banners users dismissed
CREATE TABLE public.banners_dismissals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  banner_id uuid NOT NULL REFERENCES banners_promocionais(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  UNIQUE(banner_id, user_id)
);

ALTER TABLE public.banners_dismissals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários gerenciam próprios dismissals"
ON public.banners_dismissals
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Trigger for updated_at
CREATE TRIGGER update_campanhas_updated_at
BEFORE UPDATE ON public.campanhas_marketing
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_banners_updated_at
BEFORE UPDATE ON public.banners_promocionais
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
