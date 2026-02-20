-- Garantir que resi_agents_config existe e tem dados corretos
CREATE TABLE IF NOT EXISTS public.resi_agents_config (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT,
  emoji TEXT,
  is_active BOOLEAN DEFAULT true,
  system_prompt TEXT,
  keywords TEXT[] DEFAULT '{}',
  priority INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

ALTER TABLE public.resi_agents_config ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'resi_agents_config' 
    AND policyname = 'Anyone can view active agents config'
  ) THEN
    CREATE POLICY "Anyone can view active agents config"
      ON public.resi_agents_config FOR SELECT
      USING (is_active = true);
  END IF;
END $$;

-- Inserir/atualizar agentes
INSERT INTO public.resi_agents_config (id, name, description, emoji, is_active, priority) VALUES
  ('core', 'Resi Core', 'Atendimento geral, cashback, gamificação', '💬', true, 1),
  ('agenda', 'Resi Agenda', 'Agendamentos e sessões', '📅', true, 2),
  ('creator', 'Resi Creator', 'Conteúdo para redes sociais', '🎬', true, 3),
  ('loja', 'Resi Loja', 'Produtos e pacotes', '🛒', true, 4),
  ('wellness', 'Resi Wellness', 'Bem-estar e saúde', '🧘', true, 5)
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  emoji = EXCLUDED.emoji,
  updated_at = NOW();

-- Garantir que a função get_resi_stats existe com search_path seguro
CREATE OR REPLACE FUNCTION public.get_resi_stats(days_back INTEGER DEFAULT 7)
RETURNS TABLE (
  agent TEXT,
  total_conversations BIGINT,
  unique_users BIGINT,
  avg_messages_per_conversation NUMERIC,
  most_active_hour INTEGER
)
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT 
    ci.agent,
    COUNT(*) as total_conversations,
    COUNT(DISTINCT ci.user_id) as unique_users,
    ROUND(COUNT(*)::numeric / NULLIF(COUNT(DISTINCT ci.user_id), 0), 2) as avg_messages_per_conversation,
    MODE() WITHIN GROUP (ORDER BY EXTRACT(HOUR FROM ci.created_at)::integer) as most_active_hour
  FROM public.chat_interactions ci
  WHERE ci.created_at > NOW() - (days_back || ' days')::interval
  GROUP BY ci.agent
  ORDER BY total_conversations DESC;
END;
$$;