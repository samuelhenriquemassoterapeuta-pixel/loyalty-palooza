-- Criar tabela de tipos de missões
CREATE TABLE IF NOT EXISTS public.mission_types (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  icon TEXT DEFAULT '🎯',
  xp_reward INTEGER NOT NULL DEFAULT 0,
  credits_reward INTEGER NOT NULL DEFAULT 0,
  condition_type TEXT NOT NULL DEFAULT 'manual', -- 'manual', 'agendamento', 'checkin', 'compra'
  condition_value INTEGER DEFAULT 1,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.mission_types ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Missões visíveis para todos autenticados"
  ON public.mission_types FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Apenas admins gerenciam tipos de missões"
  ON public.mission_types FOR ALL
  USING (has_role(auth.uid(), 'admin'::app_role));

-- Criar tabela de missões diárias dos usuários
CREATE TABLE IF NOT EXISTS public.daily_missions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  mission_type_id UUID NOT NULL REFERENCES public.mission_types(id),
  assigned_date DATE NOT NULL DEFAULT CURRENT_DATE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, mission_type_id, assigned_date)
);

ALTER TABLE public.daily_missions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem suas próprias missões"
  ON public.daily_missions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Sistema cria missões"
  ON public.daily_missions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários completam suas missões"
  ON public.daily_missions FOR UPDATE
  USING (auth.uid() = user_id);

-- Criar tabela de conversas Resi (para o novo resi-agent-router)
CREATE TABLE IF NOT EXISTS public.resi_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  agent_id TEXT NOT NULL,
  session_id TEXT NOT NULL,
  role TEXT NOT NULL CHECK (role IN ('user', 'assistant')),
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

ALTER TABLE public.resi_conversations ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem suas próprias conversas Resi"
  ON public.resi_conversations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Sistema insere conversas"
  ON public.resi_conversations FOR INSERT
  WITH CHECK (true); -- Edge function usa service role

-- Índices de performance
CREATE INDEX IF NOT EXISTS idx_daily_missions_user_date ON public.daily_missions(user_id, assigned_date);
CREATE INDEX IF NOT EXISTS idx_resi_conversations_session ON public.resi_conversations(session_id);
CREATE INDEX IF NOT EXISTS idx_resi_conversations_user ON public.resi_conversations(user_id);