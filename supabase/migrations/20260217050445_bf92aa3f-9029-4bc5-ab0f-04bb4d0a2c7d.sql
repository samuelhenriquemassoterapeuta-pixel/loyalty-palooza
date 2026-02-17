
-- 1. Tabela de roles (mapeia o enum app_role existente)
CREATE TABLE IF NOT EXISTS public.roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name app_role UNIQUE NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Popula com os valores reais do enum
INSERT INTO public.roles (name, description)
VALUES 
  ('admin', 'Administrador do sistema'),
  ('user', 'Usuário padrão'),
  ('terapeuta', 'Terapeuta'),
  ('parceiro', 'Parceiro comercial')
ON CONFLICT (name) DO NOTHING;

-- 2. Tabela de permissões
CREATE TABLE IF NOT EXISTS public.permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    resource TEXT NOT NULL,
    action TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    UNIQUE(resource, action)
);

-- 3. Relação papel-permissão
CREATE TABLE IF NOT EXISTS public.role_permissions (
    role_id UUID REFERENCES public.roles(id) ON DELETE CASCADE,
    permission_id UUID REFERENCES public.permissions(id) ON DELETE CASCADE,
    granted_at TIMESTAMPTZ DEFAULT NOW(),
    PRIMARY KEY (role_id, permission_id)
);

-- 4. View materializada para cache de permissões
CREATE MATERIALIZED VIEW IF NOT EXISTS public.user_permissions_mv AS
SELECT DISTINCT
    ur.user_id,
    p.resource,
    p.action
FROM public.user_roles ur
JOIN public.roles r ON ur.role = r.name
JOIN public.role_permissions rp ON r.id = rp.role_id
JOIN public.permissions p ON rp.permission_id = p.id;

-- 5. Índices
CREATE UNIQUE INDEX IF NOT EXISTS idx_user_permissions_mv_unique
ON public.user_permissions_mv(user_id, resource, action);

CREATE INDEX IF NOT EXISTS idx_role_permissions_role ON public.role_permissions(role_id);
CREATE INDEX IF NOT EXISTS idx_role_permissions_permission ON public.role_permissions(permission_id);
CREATE INDEX IF NOT EXISTS idx_permissions_resource ON public.permissions(resource);
CREATE INDEX IF NOT EXISTS idx_user_roles_composite ON public.user_roles(user_id, role);

-- 6. Função para refresh do cache
CREATE OR REPLACE FUNCTION public.refresh_user_permissions()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    REFRESH MATERIALIZED VIEW CONCURRENTLY public.user_permissions_mv;
    RETURN NULL;
END;
$$;

-- 7. Triggers para auto-refresh
DROP TRIGGER IF EXISTS trigger_refresh_permissions_ur ON public.user_roles;
CREATE TRIGGER trigger_refresh_permissions_ur
    AFTER INSERT OR UPDATE OR DELETE ON public.user_roles
    FOR EACH STATEMENT
    EXECUTE FUNCTION public.refresh_user_permissions();

DROP TRIGGER IF EXISTS trigger_refresh_permissions_rp ON public.role_permissions;
CREATE TRIGGER trigger_refresh_permissions_rp
    AFTER INSERT OR UPDATE OR DELETE ON public.role_permissions
    FOR EACH STATEMENT
    EXECUTE FUNCTION public.refresh_user_permissions();

-- 8. Função helper para consultar permissões
CREATE OR REPLACE FUNCTION public.get_user_permissions(p_user_id UUID)
RETURNS TABLE(resource TEXT, action TEXT)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    RETURN QUERY
    SELECT upm.resource, upm.action
    FROM public.user_permissions_mv upm
    WHERE upm.user_id = p_user_id;
END;
$$;

-- 9. Função para checar permissão específica
CREATE OR REPLACE FUNCTION public.has_permission(p_user_id UUID, p_resource TEXT, p_action TEXT)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
    SELECT EXISTS (
        SELECT 1 FROM public.user_permissions_mv
        WHERE user_id = p_user_id
          AND resource = p_resource
          AND action = p_action
    );
$$;

-- 10. RLS nas novas tabelas
ALTER TABLE public.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.permissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.role_permissions ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins manage roles" ON public.roles
    FOR ALL TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage permissions" ON public.permissions
    FOR ALL TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins manage role_permissions" ON public.role_permissions
    FOR ALL TO authenticated
    USING (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authenticated read roles" ON public.roles
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated read permissions" ON public.permissions
    FOR SELECT TO authenticated USING (true);

CREATE POLICY "Authenticated read role_permissions" ON public.role_permissions
    FOR SELECT TO authenticated USING (true);
