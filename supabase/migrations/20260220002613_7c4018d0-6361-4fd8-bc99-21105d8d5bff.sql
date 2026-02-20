-- Admins podem ver todos os agentes (ativos e inativos)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'resi_agents_config' 
    AND policyname = 'Admins can view all agents config'
  ) THEN
    CREATE POLICY "Admins can view all agents config"
      ON public.resi_agents_config FOR SELECT
      USING (public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;

-- Admins podem atualizar agentes
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'resi_agents_config' 
    AND policyname = 'Admins can update agents config'
  ) THEN
    CREATE POLICY "Admins can update agents config"
      ON public.resi_agents_config FOR UPDATE
      USING (public.has_role(auth.uid(), 'admin'));
  END IF;
END $$;