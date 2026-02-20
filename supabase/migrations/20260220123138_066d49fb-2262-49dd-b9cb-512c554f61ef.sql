
-- Adicionar colunas faltantes na tabela resi_agents_config
ALTER TABLE public.resi_agents_config 
  ADD COLUMN IF NOT EXISTS agent_key VARCHAR(50) NULL,
  ADD COLUMN IF NOT EXISTS menu_option VARCHAR(10) NULL,
  ADD COLUMN IF NOT EXISTS description TEXT NULL;

-- Índice GIN para busca rápida por palavras-chave
CREATE INDEX IF NOT EXISTS idx_resi_agents_keywords ON public.resi_agents_config USING GIN (keywords);
CREATE INDEX IF NOT EXISTS idx_resi_agents_priority ON public.resi_agents_config (priority DESC);

-- Trigger para updated_at (reutiliza função existente)
DROP TRIGGER IF EXISTS trigger_update_resi_agents_config ON public.resi_agents_config;
CREATE TRIGGER trigger_update_resi_agents_config
  BEFORE UPDATE ON public.resi_agents_config
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- RLS
ALTER TABLE public.resi_agents_config ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Admins podem ler configurações dos agentes" ON public.resi_agents_config;
DROP POLICY IF EXISTS "Admins podem inserir configurações dos agentes" ON public.resi_agents_config;
DROP POLICY IF EXISTS "Admins podem atualizar configurações dos agentes" ON public.resi_agents_config;
DROP POLICY IF EXISTS "Admins podem deletar configurações dos agentes" ON public.resi_agents_config;

CREATE POLICY "Admins podem ler configurações dos agentes"
  ON public.resi_agents_config FOR SELECT
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem inserir configurações dos agentes"
  ON public.resi_agents_config FOR INSERT
  TO authenticated
  WITH CHECK (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem atualizar configurações dos agentes"
  ON public.resi_agents_config FOR UPDATE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins podem deletar configurações dos agentes"
  ON public.resi_agents_config FOR DELETE
  TO authenticated
  USING (has_role(auth.uid(), 'admin'));
