
-- 1. Configuração de textos da plataforma
CREATE TABLE IF NOT EXISTS public.platform_texts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  section TEXT NOT NULL,
  description TEXT,
  updated_at TIMESTAMPTZ DEFAULT now(),
  updated_by UUID REFERENCES public.profiles(id)
);

-- 2. Configuração de imagens/banners
CREATE TABLE IF NOT EXISTS public.platform_media (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  url TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'image',
  section TEXT NOT NULL,
  alt_text TEXT,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 3. Configuração de features/modules on/off
CREATE TABLE IF NOT EXISTS public.platform_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  module_name TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  visible_for_roles TEXT[],
  settings JSONB,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- 4. Configuração de cores/temas
CREATE TABLE IF NOT EXISTS public.platform_theme (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  key TEXT UNIQUE NOT NULL,
  value TEXT NOT NULL,
  category TEXT DEFAULT 'colors'
);

-- 5. Histórico de alterações (audit)
CREATE TABLE IF NOT EXISTS public.platform_edit_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  editor_id UUID REFERENCES public.profiles(id),
  action TEXT,
  target TEXT,
  old_value TEXT,
  new_value TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- RLS (idempotent — policies may already exist from partial migration)
ALTER TABLE public.platform_texts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_media ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_modules ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_theme ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_edit_history ENABLE ROW LEVEL SECURITY;

-- Drop and recreate policies to be idempotent
DO $$ BEGIN
  -- platform_texts
  DROP POLICY IF EXISTS "Public read platform_texts" ON public.platform_texts;
  DROP POLICY IF EXISTS "Admins manage platform_texts" ON public.platform_texts;
  -- platform_media
  DROP POLICY IF EXISTS "Public read platform_media" ON public.platform_media;
  DROP POLICY IF EXISTS "Admins manage platform_media" ON public.platform_media;
  -- platform_modules
  DROP POLICY IF EXISTS "Public read platform_modules" ON public.platform_modules;
  DROP POLICY IF EXISTS "Admins manage platform_modules" ON public.platform_modules;
  -- platform_theme
  DROP POLICY IF EXISTS "Public read platform_theme" ON public.platform_theme;
  DROP POLICY IF EXISTS "Admins manage platform_theme" ON public.platform_theme;
  -- platform_edit_history
  DROP POLICY IF EXISTS "Admins manage platform_edit_history" ON public.platform_edit_history;
  DROP POLICY IF EXISTS "Admins read platform_edit_history" ON public.platform_edit_history;
END $$;

CREATE POLICY "Public read platform_texts" ON public.platform_texts
  FOR SELECT USING (true);
CREATE POLICY "Admins manage platform_texts" ON public.platform_texts
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public read platform_media" ON public.platform_media
  FOR SELECT USING (true);
CREATE POLICY "Admins manage platform_media" ON public.platform_media
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public read platform_modules" ON public.platform_modules
  FOR SELECT USING (true);
CREATE POLICY "Admins manage platform_modules" ON public.platform_modules
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Public read platform_theme" ON public.platform_theme
  FOR SELECT USING (true);
CREATE POLICY "Admins manage platform_theme" ON public.platform_theme
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage platform_edit_history" ON public.platform_edit_history
  FOR ALL TO authenticated USING (public.has_role(auth.uid(), 'admin'))
  WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Permissões granulares
INSERT INTO public.permissions (resource, action) VALUES
  ('platform_editor', 'edit_texts'),
  ('platform_editor', 'manage_media'),
  ('platform_editor', 'toggle_modules'),
  ('platform_editor', 'edit_theme'),
  ('platform_editor', 'view_history')
ON CONFLICT DO NOTHING;

INSERT INTO public.role_permissions (role_id, permission_id)
SELECT r.id, p.id 
FROM public.roles r, public.permissions p
WHERE r.name = 'admin' AND p.resource = 'platform_editor'
ON CONFLICT DO NOTHING;

REFRESH MATERIALIZED VIEW CONCURRENTLY public.user_permissions_mv;

-- Seed texts
INSERT INTO public.platform_texts (key, value, section, description) VALUES
  ('landing.titulo', 'Bem-vindo à Resinkra', 'landing', 'Título principal da landing page'),
  ('landing.subtitulo', 'Sua jornada de bem-estar começa aqui', 'landing', 'Subtítulo da landing page'),
  ('landing.cta_agendar', 'Agendar Agora', 'landing', 'Texto do botão CTA principal'),
  ('social.chamada', 'Compartilhe seu momento', 'social', 'Chamada da seção social'),
  ('social.recompensa', 'Ganhe cashback por postar!', 'social', 'Texto de recompensa social'),
  ('cursos.titulo', 'Nossas Formações', 'cursos', 'Título da seção de cursos'),
  ('cursos.chamada', 'Aprenda com os melhores', 'cursos', 'Chamada da seção de cursos'),
  ('geral.nome_plataforma', 'Resinkra', 'geral', 'Nome da plataforma'),
  ('geral.contato_email', 'contato@resinkra.com', 'geral', 'Email de contato')
ON CONFLICT (key) DO NOTHING;

-- Seed modules
INSERT INTO public.platform_modules (module_name, is_active, visible_for_roles) VALUES
  ('cashback', true, ARRAY['admin', 'user', 'terapeuta']),
  ('cursos', true, ARRAY['admin', 'terapeuta']),
  ('social', true, ARRAY['admin', 'user', 'terapeuta']),
  ('agendamentos', true, ARRAY['admin', 'user', 'terapeuta']),
  ('loja', true, ARRAY['admin', 'user', 'terapeuta']),
  ('corporativo', true, ARRAY['admin']),
  ('gamificacao', true, ARRAY['admin', 'user', 'terapeuta']),
  ('indicacoes', true, ARRAY['admin', 'user'])
ON CONFLICT (module_name) DO NOTHING;

-- Bucket
INSERT INTO storage.buckets (id, name, public) VALUES ('platform-media', 'platform-media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "Public read platform-media" ON storage.objects;
DROP POLICY IF EXISTS "Admins manage platform-media" ON storage.objects;

CREATE POLICY "Public read platform-media" ON storage.objects
  FOR SELECT USING (bucket_id = 'platform-media');

CREATE POLICY "Admins manage platform-media" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'platform-media' AND public.has_role(auth.uid(), 'admin'))
  WITH CHECK (bucket_id = 'platform-media' AND public.has_role(auth.uid(), 'admin'));
