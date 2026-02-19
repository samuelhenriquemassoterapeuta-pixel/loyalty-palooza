
-- ============================================================
-- 🌿 Tabelas para sistema multi-agente Resi
-- ============================================================

-- Tabela de interações do chat (analytics)
CREATE TABLE IF NOT EXISTS public.chat_interactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL,
  agent TEXT NOT NULL,
  user_message TEXT NOT NULL,
  assistant_message TEXT NOT NULL,
  platform TEXT DEFAULT 'web',
  tokens_used INTEGER DEFAULT 0,
  response_time_ms INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_interactions_user_id ON public.chat_interactions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_interactions_agent ON public.chat_interactions(agent);
CREATE INDEX IF NOT EXISTS idx_chat_interactions_created_at ON public.chat_interactions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_chat_interactions_platform ON public.chat_interactions(platform);

ALTER TABLE public.chat_interactions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own chat interactions"
  ON public.chat_interactions FOR SELECT
  USING (auth.uid()::text = user_id OR user_id LIKE 'whatsapp_%');

CREATE POLICY "Service role can insert chat interactions"
  ON public.chat_interactions FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Admins can view all chat interactions"
  ON public.chat_interactions FOR SELECT
  USING (has_role(auth.uid(), 'admin'));

-- Tabela de sessões de chat
CREATE TABLE IF NOT EXISTS public.chat_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id TEXT NOT NULL UNIQUE,
  current_agent TEXT,
  conversation_history JSONB DEFAULT '[]'::jsonb,
  platform TEXT DEFAULT 'web',
  last_activity TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_chat_sessions_user_id ON public.chat_sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_chat_sessions_last_activity ON public.chat_sessions(last_activity DESC);

ALTER TABLE public.chat_sessions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own session"
  ON public.chat_sessions FOR SELECT
  USING (auth.uid()::text = user_id);

CREATE POLICY "Service role can manage sessions"
  ON public.chat_sessions FOR ALL
  USING (true);

CREATE OR REPLACE FUNCTION update_chat_sessions_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER chat_sessions_updated_at
  BEFORE UPDATE ON public.chat_sessions
  FOR EACH ROW
  EXECUTE FUNCTION update_chat_sessions_updated_at();

-- Tabela de configuração dos agentes
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

CREATE POLICY "Anyone can view active agents config"
  ON public.resi_agents_config FOR SELECT
  USING (is_active = true);

CREATE POLICY "Admins can manage agents config"
  ON public.resi_agents_config FOR ALL
  USING (has_role(auth.uid(), 'admin'));

-- Inserir configuração inicial dos agentes
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

-- View para analytics do chat
CREATE OR REPLACE VIEW public.chat_analytics AS
SELECT 
  DATE(created_at) as date,
  agent,
  platform,
  COUNT(*) as total_messages,
  COUNT(DISTINCT user_id) as unique_users,
  AVG(response_time_ms) as avg_response_time_ms,
  SUM(tokens_used) as total_tokens
FROM public.chat_interactions
GROUP BY DATE(created_at), agent, platform
ORDER BY date DESC, agent;

-- Função para limpar sessões antigas
CREATE OR REPLACE FUNCTION cleanup_old_chat_sessions()
RETURNS INTEGER AS $$
DECLARE
  deleted_count INTEGER;
BEGIN
  DELETE FROM public.chat_sessions
  WHERE last_activity < NOW() - INTERVAL '24 hours';
  GET DIAGNOSTICS deleted_count = ROW_COUNT;
  RETURN deleted_count;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Função para estatísticas dos agentes
CREATE OR REPLACE FUNCTION get_resi_stats(days_back INTEGER DEFAULT 7)
RETURNS TABLE (
  agent TEXT,
  total_conversations BIGINT,
  unique_users BIGINT,
  avg_messages_per_conversation NUMERIC,
  most_active_hour INTEGER
) AS $$
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
$$ LANGUAGE plpgsql SET search_path = public;
