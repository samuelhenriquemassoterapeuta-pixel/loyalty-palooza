
-- 1. Adicionar slug à tabela servicos (para URLs amigáveis)
ALTER TABLE public.servicos ADD COLUMN IF NOT EXISTS slug text UNIQUE;

-- Preencher slugs para serviços existentes (baseado no nome)
UPDATE public.servicos SET slug = LOWER(REGEXP_REPLACE(REGEXP_REPLACE(nome, '[^a-zA-Z0-9\s]', '', 'g'), '\s+', '-', 'g'))
WHERE slug IS NULL;

-- 2. Adicionar servico_id FK na tabela agendamentos
ALTER TABLE public.agendamentos ADD COLUMN IF NOT EXISTS servico_id uuid REFERENCES public.servicos(id);

-- Preencher servico_id para agendamentos existentes (baseado no nome do serviço)
UPDATE public.agendamentos a
SET servico_id = s.id
FROM public.servicos s
WHERE a.servico = s.nome AND a.servico_id IS NULL;

-- 3. Criar tabela horarios_disponiveis
CREATE TABLE IF NOT EXISTS public.horarios_disponiveis (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  terapeuta_id uuid NOT NULL REFERENCES public.terapeutas(id) ON DELETE CASCADE,
  dia_semana integer NOT NULL CHECK (dia_semana BETWEEN 0 AND 6), -- 0=domingo, 6=sábado
  hora_inicio time NOT NULL,
  hora_fim time NOT NULL,
  intervalo_minutos integer NOT NULL DEFAULT 60,
  ativo boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE(terapeuta_id, dia_semana, hora_inicio)
);

-- Habilitar RLS
ALTER TABLE public.horarios_disponiveis ENABLE ROW LEVEL SECURITY;

-- Políticas RLS: todos autenticados podem ler (para ver disponibilidade)
CREATE POLICY "Authenticated users can view available schedules"
ON public.horarios_disponiveis
FOR SELECT
TO authenticated
USING (true);

-- Admins podem gerenciar
CREATE POLICY "Admins can manage schedules"
ON public.horarios_disponiveis
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'))
WITH CHECK (public.has_role(auth.uid(), 'admin'));

-- Terapeutas podem gerenciar seus próprios horários
CREATE POLICY "Therapists can manage own schedules"
ON public.horarios_disponiveis
FOR ALL
TO authenticated
USING (
  terapeuta_id IN (SELECT id FROM public.terapeutas WHERE user_id = auth.uid())
)
WITH CHECK (
  terapeuta_id IN (SELECT id FROM public.terapeutas WHERE user_id = auth.uid())
);

-- 4. Criar trigger para atualizar updated_at
CREATE OR REPLACE FUNCTION public.update_horarios_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_horarios_disponiveis_updated_at
BEFORE UPDATE ON public.horarios_disponiveis
FOR EACH ROW
EXECUTE FUNCTION public.update_horarios_updated_at();

-- 5. Índices para performance
CREATE INDEX IF NOT EXISTS idx_horarios_terapeuta_dia ON public.horarios_disponiveis(terapeuta_id, dia_semana) WHERE ativo = true;
CREATE INDEX IF NOT EXISTS idx_agendamentos_servico_id ON public.agendamentos(servico_id);
