
-- ============================================
-- RESINKRA AI — DATABASE SCHEMA
-- ============================================

-- 1. PERFIS DE MARCA
CREATE TABLE IF NOT EXISTS public.brand_profiles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  brand_name TEXT NOT NULL,
  niche TEXT NOT NULL,
  website TEXT,
  target_audience_age TEXT DEFAULT '25-34',
  target_audience_gender TEXT DEFAULT 'todos',
  target_audience_pain TEXT,
  target_audience_desire TEXT,
  tone_of_voice TEXT[] DEFAULT '{"profissional"}',
  use_slangs BOOLEAN DEFAULT FALSE,
  use_emojis BOOLEAN DEFAULT TRUE,
  keywords TEXT[] DEFAULT '{}',
  forbidden_words TEXT[] DEFAULT '{}',
  reference_profiles TEXT[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. ROTEIROS
CREATE TABLE IF NOT EXISTS public.scripts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  brand_id UUID REFERENCES public.brand_profiles(id) ON DELETE CASCADE,
  content_type TEXT NOT NULL CHECK (content_type IN ('reels', 'carousel', 'stories', 'live', 'post')),
  topic TEXT NOT NULL,
  objective TEXT DEFAULT 'engajar',
  style TEXT DEFAULT 'talking_head',
  duration TEXT,
  depth_level INTEGER DEFAULT 5,
  hook TEXT,
  hook_visual_direction TEXT,
  body JSONB,
  climax TEXT,
  cta TEXT,
  caption TEXT,
  hashtags TEXT[] DEFAULT '{}',
  audio_suggestion TEXT,
  engagement_tips TEXT[] DEFAULT '{}',
  score_hook INTEGER DEFAULT 0,
  score_clarity INTEGER DEFAULT 0,
  score_cta INTEGER DEFAULT 0,
  score_emotion INTEGER DEFAULT 0,
  score_virality INTEGER DEFAULT 0,
  score_total INTEGER DEFAULT 0,
  estimated_duration_seconds INTEGER DEFAULT 0,
  is_favorite BOOLEAN DEFAULT FALSE,
  is_template BOOLEAN DEFAULT FALSE,
  template_name TEXT,
  variation_of UUID REFERENCES public.scripts(id),
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'final', 'published')),
  additional_info TEXT,
  raw_ai_response JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. EVENTOS DO CALENDÁRIO
CREATE TABLE IF NOT EXISTS public.calendar_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  script_id UUID REFERENCES public.scripts(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT,
  scheduled_date DATE NOT NULL,
  scheduled_time TIME,
  content_type TEXT,
  status TEXT DEFAULT 'planned' CHECK (status IN ('planned', 'created', 'published', 'cancelled')),
  color TEXT DEFAULT '#8B5CF6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. GANCHOS GERADOS
CREATE TABLE IF NOT EXISTS public.hooks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  brand_id UUID REFERENCES public.brand_profiles(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  hook_text TEXT NOT NULL,
  category TEXT CHECK (category IN ('curiosidade', 'polemica', 'autoridade', 'storytelling', 'identificacao', 'choque', 'pergunta', 'desafio')),
  power_level INTEGER DEFAULT 5 CHECK (power_level BETWEEN 1 AND 10),
  best_for TEXT CHECK (best_for IN ('reels', 'carousel', 'stories', 'live', 'post', 'all')),
  emotion_triggered TEXT,
  completion_suggestion TEXT,
  is_favorite BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. IDEIAS DE CONTEÚDO
CREATE TABLE IF NOT EXISTS public.content_ideas (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  brand_id UUID REFERENCES public.brand_profiles(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  funnel_stage TEXT CHECK (funnel_stage IN ('topo', 'meio', 'fundo')),
  content_type TEXT,
  niche TEXT,
  is_used BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. ANÁLISES VIRAIS
CREATE TABLE IF NOT EXISTS public.viral_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  brand_id UUID REFERENCES public.brand_profiles(id) ON DELETE CASCADE,
  original_content TEXT NOT NULL,
  content_type TEXT,
  hook_type TEXT,
  hook_effectiveness INTEGER,
  narrative_structure TEXT,
  emotional_triggers TEXT[] DEFAULT '{}',
  retention_techniques TEXT[] DEFAULT '{}',
  virality_elements TEXT[] DEFAULT '{}',
  overall_score INTEGER DEFAULT 0,
  key_takeaways TEXT[] DEFAULT '{}',
  adapted_script JSONB,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 7. MEMBROS DA EQUIPE (MULTI-TENANT)
CREATE TABLE IF NOT EXISTS public.team_members (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  owner_id UUID NOT NULL,
  member_id UUID NOT NULL,
  brand_id UUID REFERENCES public.brand_profiles(id) ON DELETE CASCADE,
  role TEXT DEFAULT 'viewer' CHECK (role IN ('owner', 'editor', 'viewer')),
  invited_email TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'active', 'revoked')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. CONFIGURAÇÕES DO USUÁRIO RESINKRA
CREATE TABLE IF NOT EXISTS public.resinkra_user_settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE,
  default_brand_id UUID REFERENCES public.brand_profiles(id),
  theme TEXT DEFAULT 'dark',
  language TEXT DEFAULT 'pt-BR',
  notifications_enabled BOOLEAN DEFAULT TRUE,
  max_scripts_per_month INTEGER DEFAULT 50,
  scripts_generated_this_month INTEGER DEFAULT 0,
  subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'creator', 'pro', 'agency')),
  subscription_status TEXT DEFAULT 'active',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. TRENDS
CREATE TABLE IF NOT EXISTS public.trends (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  category TEXT,
  trend_type TEXT CHECK (trend_type IN ('audio', 'format', 'hook', 'challenge', 'hashtag')),
  relevance_score INTEGER DEFAULT 5,
  niche TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  expires_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_brand_profiles_user_id ON public.brand_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_scripts_user_id ON public.scripts(user_id);
CREATE INDEX IF NOT EXISTS idx_scripts_brand_id ON public.scripts(brand_id);
CREATE INDEX IF NOT EXISTS idx_scripts_content_type ON public.scripts(content_type);
CREATE INDEX IF NOT EXISTS idx_scripts_is_favorite ON public.scripts(is_favorite);
CREATE INDEX IF NOT EXISTS idx_scripts_created_at ON public.scripts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_calendar_events_user_id ON public.calendar_events(user_id);
CREATE INDEX IF NOT EXISTS idx_calendar_events_scheduled_date ON public.calendar_events(scheduled_date);
CREATE INDEX IF NOT EXISTS idx_hooks_user_id ON public.hooks(user_id);
CREATE INDEX IF NOT EXISTS idx_hooks_category ON public.hooks(category);
CREATE INDEX IF NOT EXISTS idx_content_ideas_user_id ON public.content_ideas(user_id);
CREATE INDEX IF NOT EXISTS idx_content_ideas_funnel_stage ON public.content_ideas(funnel_stage);
CREATE INDEX IF NOT EXISTS idx_viral_analyses_user_id ON public.viral_analyses(user_id);
CREATE INDEX IF NOT EXISTS idx_team_members_owner_id ON public.team_members(owner_id);
CREATE INDEX IF NOT EXISTS idx_team_members_member_id ON public.team_members(member_id);
CREATE INDEX IF NOT EXISTS idx_trends_is_active ON public.trends(is_active);
CREATE INDEX IF NOT EXISTS idx_trends_niche ON public.trends(niche);

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE public.brand_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.scripts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calendar_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.hooks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.content_ideas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.viral_analyses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resinkra_user_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.trends ENABLE ROW LEVEL SECURITY;

-- BRAND PROFILES
CREATE POLICY "Users can view own brand profiles" ON public.brand_profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own brand profiles" ON public.brand_profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own brand profiles" ON public.brand_profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own brand profiles" ON public.brand_profiles FOR DELETE USING (auth.uid() = user_id);

-- SCRIPTS
CREATE POLICY "Users can view own scripts" ON public.scripts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own scripts" ON public.scripts FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own scripts" ON public.scripts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own scripts" ON public.scripts FOR DELETE USING (auth.uid() = user_id);

-- CALENDAR EVENTS
CREATE POLICY "Users can view own calendar events" ON public.calendar_events FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own calendar events" ON public.calendar_events FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own calendar events" ON public.calendar_events FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own calendar events" ON public.calendar_events FOR DELETE USING (auth.uid() = user_id);

-- HOOKS
CREATE POLICY "Users can view own hooks" ON public.hooks FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own hooks" ON public.hooks FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can delete own hooks" ON public.hooks FOR DELETE USING (auth.uid() = user_id);

-- CONTENT IDEAS
CREATE POLICY "Users can view own ideas" ON public.content_ideas FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own ideas" ON public.content_ideas FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own ideas" ON public.content_ideas FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own ideas" ON public.content_ideas FOR DELETE USING (auth.uid() = user_id);

-- VIRAL ANALYSES
CREATE POLICY "Users can view own viral analyses" ON public.viral_analyses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own viral analyses" ON public.viral_analyses FOR INSERT WITH CHECK (auth.uid() = user_id);

-- TEAM MEMBERS
CREATE POLICY "Owners can view team members" ON public.team_members FOR SELECT USING (auth.uid() = owner_id OR auth.uid() = member_id);
CREATE POLICY "Owners can manage team members" ON public.team_members FOR INSERT WITH CHECK (auth.uid() = owner_id);
CREATE POLICY "Owners can update team members" ON public.team_members FOR UPDATE USING (auth.uid() = owner_id);
CREATE POLICY "Owners can remove team members" ON public.team_members FOR DELETE USING (auth.uid() = owner_id);

-- USER SETTINGS
CREATE POLICY "Users can view own resinkra settings" ON public.resinkra_user_settings FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create own resinkra settings" ON public.resinkra_user_settings FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own resinkra settings" ON public.resinkra_user_settings FOR UPDATE USING (auth.uid() = user_id);

-- TRENDS (public read)
CREATE POLICY "Anyone can view active trends" ON public.trends FOR SELECT USING (is_active = TRUE);

-- ============================================
-- TRIGGERS
-- ============================================
CREATE TRIGGER set_updated_at_brand_profiles
  BEFORE UPDATE ON public.brand_profiles
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER set_updated_at_scripts
  BEFORE UPDATE ON public.scripts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER set_updated_at_calendar_events
  BEFORE UPDATE ON public.calendar_events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER set_updated_at_resinkra_settings
  BEFORE UPDATE ON public.resinkra_user_settings
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- ============================================
-- SEED TRENDS
-- ============================================
INSERT INTO public.trends (title, description, category, trend_type, relevance_score, niche, is_active) VALUES
('POV você descobriu...', 'Formato POV com revelação surpreendente', 'formato', 'format', 9, 'geral', true),
('3 coisas que ninguém te conta', 'Lista curta com revelações do nicho', 'educativo', 'hook', 8, 'geral', true),
('Eu faturei X fazendo isso', 'Prova social com resultado real', 'autoridade', 'hook', 9, 'negocios', true),
('Se você faz isso PARE AGORA', 'Alerta sobre erro comum', 'alerta', 'hook', 8, 'geral', true),
('Desafio de 7 dias', 'Série de conteúdos em 7 dias com transformação', 'engajamento', 'challenge', 7, 'geral', true),
('Get Ready With Me + dicas', 'GRWM com dicas do nicho enquanto se arruma', 'lifestyle', 'format', 8, 'moda', true),
('Antes e Depois', 'Transformação visual com resultado', 'prova_social', 'format', 9, 'geral', true),
('Responda nos comentários', 'Pergunta polêmica que gera debate', 'engajamento', 'hook', 7, 'geral', true),
('Tutorial em 30 segundos', 'Micro tutorial rápido e prático', 'educativo', 'format', 8, 'geral', true),
('Mito ou Verdade', 'Desmistificar crenças do nicho', 'educativo', 'format', 8, 'geral', true);
