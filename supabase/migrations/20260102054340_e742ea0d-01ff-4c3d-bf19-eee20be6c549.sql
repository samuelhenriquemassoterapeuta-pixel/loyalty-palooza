-- Tabela de serviços oferecidos
CREATE TABLE public.servicos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  duracao INTEGER NOT NULL, -- em minutos
  preco NUMERIC NOT NULL,
  categoria TEXT DEFAULT 'geral',
  disponivel BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de pacotes
CREATE TABLE public.pacotes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  total_sessoes INTEGER NOT NULL,
  preco NUMERIC NOT NULL,
  preco_original NUMERIC,
  validade_dias INTEGER DEFAULT 365,
  disponivel BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Tabela de pacotes comprados pelo usuário
CREATE TABLE public.pacotes_usuario (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  pacote_id UUID NOT NULL REFERENCES public.pacotes(id),
  sessoes_usadas INTEGER DEFAULT 0,
  data_compra TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  data_validade TIMESTAMP WITH TIME ZONE NOT NULL,
  status TEXT DEFAULT 'ativo'
);

-- Tabela de transações/movimentações do usuário
CREATE TABLE public.transacoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  tipo TEXT NOT NULL, -- 'compra', 'cashback', 'agendamento'
  valor NUMERIC NOT NULL,
  descricao TEXT,
  referencia_id UUID, -- ID do pedido, agendamento, etc.
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.servicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pacotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.pacotes_usuario ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transacoes ENABLE ROW LEVEL SECURITY;

-- Políticas para serviços (público para leitura)
CREATE POLICY "Serviços são visíveis para todos" 
ON public.servicos FOR SELECT 
USING (true);

CREATE POLICY "Admins podem gerenciar serviços" 
ON public.servicos FOR ALL 
USING (has_role(auth.uid(), 'admin'));

-- Políticas para pacotes (público para leitura)
CREATE POLICY "Pacotes são visíveis para todos" 
ON public.pacotes FOR SELECT 
USING (true);

CREATE POLICY "Admins podem gerenciar pacotes" 
ON public.pacotes FOR ALL 
USING (has_role(auth.uid(), 'admin'));

-- Políticas para pacotes do usuário
CREATE POLICY "Usuários podem ver próprios pacotes" 
ON public.pacotes_usuario FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem comprar pacotes" 
ON public.pacotes_usuario FOR INSERT 
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários podem atualizar próprios pacotes" 
ON public.pacotes_usuario FOR UPDATE 
USING (auth.uid() = user_id);

-- Políticas para transações
CREATE POLICY "Usuários podem ver próprias transações" 
ON public.transacoes FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Usuários podem criar transações" 
ON public.transacoes FOR INSERT 
WITH CHECK (auth.uid() = user_id);