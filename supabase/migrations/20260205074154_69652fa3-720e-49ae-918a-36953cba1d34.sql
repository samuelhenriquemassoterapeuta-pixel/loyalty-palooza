-- Criar tabela de terapeutas
CREATE TABLE public.terapeutas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  especialidade TEXT,
  foto_url TEXT,
  disponivel BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.terapeutas ENABLE ROW LEVEL SECURITY;

-- Todos podem ver terapeutas disponíveis
CREATE POLICY "Terapeutas são visíveis para todos" 
ON public.terapeutas 
FOR SELECT 
USING (true);

-- Admins podem gerenciar terapeutas
CREATE POLICY "Admins podem gerenciar terapeutas" 
ON public.terapeutas 
FOR ALL 
USING (has_role(auth.uid(), 'admin'::app_role));

-- Adicionar coluna terapeuta_id na tabela agendamentos
ALTER TABLE public.agendamentos 
ADD COLUMN terapeuta_id UUID REFERENCES public.terapeutas(id);

-- Inserir alguns terapeutas de exemplo
INSERT INTO public.terapeutas (nome, especialidade, disponivel) VALUES
  ('Dra. Ana Silva', 'Massagem Relaxante', true),
  ('Dr. Carlos Oliveira', 'Terapia Holística', true),
  ('Dra. Mariana Costa', 'Acupuntura', true);