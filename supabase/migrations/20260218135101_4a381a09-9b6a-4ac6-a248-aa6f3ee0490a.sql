
-- =============================================
-- MARKETPLACE DE TERAPEUTAS - Schema completo
-- =============================================

-- Tabela de candidaturas de terapeutas independentes
CREATE TABLE public.marketplace_candidaturas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  nome_completo TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT NOT NULL,
  cpf TEXT NOT NULL,
  especialidades TEXT[] NOT NULL DEFAULT '{}',
  certificacoes JSONB NOT NULL DEFAULT '[]',
  experiencia_anos INTEGER NOT NULL DEFAULT 0,
  bio TEXT,
  foto_url TEXT,
  cidade TEXT NOT NULL,
  estado TEXT NOT NULL,
  bairros_atendimento TEXT[] NOT NULL DEFAULT '{}',
  atende_domicilio BOOLEAN NOT NULL DEFAULT false,
  atende_clinica BOOLEAN NOT NULL DEFAULT true,
  preco_minimo NUMERIC NOT NULL DEFAULT 0,
  preco_maximo NUMERIC NOT NULL DEFAULT 0,
  horarios_disponiveis JSONB NOT NULL DEFAULT '{}',
  documentos_url TEXT[] DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'pendente',
  motivo_rejeicao TEXT,
  aprovado_por UUID,
  aprovado_em TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Perfis públicos de terapeutas no marketplace
CREATE TABLE public.marketplace_terapeutas (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  candidatura_id UUID REFERENCES public.marketplace_candidaturas(id),
  nome TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  especialidades TEXT[] NOT NULL DEFAULT '{}',
  bio TEXT,
  foto_url TEXT,
  cidade TEXT NOT NULL,
  estado TEXT NOT NULL,
  bairros_atendimento TEXT[] NOT NULL DEFAULT '{}',
  atende_domicilio BOOLEAN NOT NULL DEFAULT false,
  atende_clinica BOOLEAN NOT NULL DEFAULT true,
  preco_minimo NUMERIC NOT NULL DEFAULT 0,
  preco_maximo NUMERIC NOT NULL DEFAULT 0,
  horarios_disponiveis JSONB NOT NULL DEFAULT '{}',
  certificacoes JSONB NOT NULL DEFAULT '[]',
  experiencia_anos INTEGER NOT NULL DEFAULT 0,
  media_avaliacoes NUMERIC NOT NULL DEFAULT 0,
  total_avaliacoes INTEGER NOT NULL DEFAULT 0,
  total_atendimentos INTEGER NOT NULL DEFAULT 0,
  taxa_resposta NUMERIC NOT NULL DEFAULT 100,
  verificado BOOLEAN NOT NULL DEFAULT false,
  destaque BOOLEAN NOT NULL DEFAULT false,
  ativo BOOLEAN NOT NULL DEFAULT true,
  comissao_percentual NUMERIC NOT NULL DEFAULT 15,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Avaliações do marketplace
CREATE TABLE public.marketplace_avaliacoes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  terapeuta_id UUID NOT NULL REFERENCES public.marketplace_terapeutas(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  agendamento_id UUID,
  nota INTEGER NOT NULL CHECK (nota >= 1 AND nota <= 5),
  comentario TEXT,
  resposta_terapeuta TEXT,
  respondido_em TIMESTAMPTZ,
  visivel BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Serviços oferecidos por cada terapeuta
CREATE TABLE public.marketplace_servicos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  terapeuta_id UUID NOT NULL REFERENCES public.marketplace_terapeutas(id) ON DELETE CASCADE,
  nome TEXT NOT NULL,
  descricao TEXT,
  duracao_minutos INTEGER NOT NULL DEFAULT 60,
  preco NUMERIC NOT NULL,
  categoria TEXT NOT NULL DEFAULT 'geral',
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Agendamentos via marketplace
CREATE TABLE public.marketplace_agendamentos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  terapeuta_id UUID NOT NULL REFERENCES public.marketplace_terapeutas(id),
  cliente_id UUID NOT NULL,
  servico_id UUID REFERENCES public.marketplace_servicos(id),
  data_hora TIMESTAMPTZ NOT NULL,
  duracao_minutos INTEGER NOT NULL DEFAULT 60,
  local_tipo TEXT NOT NULL DEFAULT 'clinica',
  endereco TEXT,
  valor NUMERIC NOT NULL,
  comissao_valor NUMERIC NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pendente',
  observacoes TEXT,
  cancelado_por TEXT,
  motivo_cancelamento TEXT,
  pagamento_status TEXT NOT NULL DEFAULT 'pendente',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Favoritos de terapeutas
CREATE TABLE public.marketplace_favoritos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  terapeuta_id UUID NOT NULL REFERENCES public.marketplace_terapeutas(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, terapeuta_id)
);

-- RLS
ALTER TABLE public.marketplace_candidaturas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_terapeutas ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_avaliacoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_servicos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_agendamentos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.marketplace_favoritos ENABLE ROW LEVEL SECURITY;

-- Candidaturas: user vê as suas, admin vê todas
CREATE POLICY "Users can view own candidaturas" ON public.marketplace_candidaturas
  FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Users can insert own candidaturas" ON public.marketplace_candidaturas
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins can update candidaturas" ON public.marketplace_candidaturas
  FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

-- Terapeutas marketplace: público para leitura
CREATE POLICY "Anyone can view active terapeutas" ON public.marketplace_terapeutas
  FOR SELECT TO authenticated USING (ativo = true OR auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Terapeutas can update own profile" ON public.marketplace_terapeutas
  FOR UPDATE TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can insert terapeutas" ON public.marketplace_terapeutas
  FOR INSERT TO authenticated WITH CHECK (public.has_role(auth.uid(), 'admin') OR auth.uid() = user_id);

-- Avaliações: público para leitura
CREATE POLICY "Anyone can view avaliacoes" ON public.marketplace_avaliacoes
  FOR SELECT TO authenticated USING (visivel = true OR auth.uid() = user_id);

CREATE POLICY "Users can insert avaliacoes" ON public.marketplace_avaliacoes
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Terapeuta can respond to reviews" ON public.marketplace_avaliacoes
  FOR UPDATE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.marketplace_terapeutas mt WHERE mt.id = terapeuta_id AND mt.user_id = auth.uid())
    OR public.has_role(auth.uid(), 'admin')
  );

-- Serviços: público para leitura
CREATE POLICY "Anyone can view active servicos" ON public.marketplace_servicos
  FOR SELECT TO authenticated USING (ativo = true OR EXISTS (SELECT 1 FROM public.marketplace_terapeutas mt WHERE mt.id = terapeuta_id AND mt.user_id = auth.uid()));

CREATE POLICY "Terapeutas can manage own servicos" ON public.marketplace_servicos
  FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.marketplace_terapeutas mt WHERE mt.id = terapeuta_id AND mt.user_id = auth.uid())
  );

-- Agendamentos
CREATE POLICY "Users can view own agendamentos" ON public.marketplace_agendamentos
  FOR SELECT TO authenticated USING (
    auth.uid() = cliente_id 
    OR EXISTS (SELECT 1 FROM public.marketplace_terapeutas mt WHERE mt.id = terapeuta_id AND mt.user_id = auth.uid())
    OR public.has_role(auth.uid(), 'admin')
  );

CREATE POLICY "Users can insert agendamentos" ON public.marketplace_agendamentos
  FOR INSERT TO authenticated WITH CHECK (auth.uid() = cliente_id);

CREATE POLICY "Parties can update agendamentos" ON public.marketplace_agendamentos
  FOR UPDATE TO authenticated USING (
    auth.uid() = cliente_id 
    OR EXISTS (SELECT 1 FROM public.marketplace_terapeutas mt WHERE mt.id = terapeuta_id AND mt.user_id = auth.uid())
    OR public.has_role(auth.uid(), 'admin')
  );

-- Favoritos
CREATE POLICY "Users can manage own favoritos" ON public.marketplace_favoritos
  FOR ALL TO authenticated USING (auth.uid() = user_id);

-- Trigger para atualizar média de avaliações
CREATE OR REPLACE FUNCTION public.update_marketplace_rating()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE public.marketplace_terapeutas
  SET 
    media_avaliacoes = COALESCE((
      SELECT ROUND(AVG(nota)::numeric, 1) 
      FROM public.marketplace_avaliacoes 
      WHERE terapeuta_id = COALESCE(NEW.terapeuta_id, OLD.terapeuta_id) AND visivel = true
    ), 0),
    total_avaliacoes = COALESCE((
      SELECT COUNT(*) 
      FROM public.marketplace_avaliacoes 
      WHERE terapeuta_id = COALESCE(NEW.terapeuta_id, OLD.terapeuta_id) AND visivel = true
    ), 0),
    updated_at = now()
  WHERE id = COALESCE(NEW.terapeuta_id, OLD.terapeuta_id);
  
  RETURN COALESCE(NEW, OLD);
END;
$$;

CREATE TRIGGER update_rating_on_review
  AFTER INSERT OR UPDATE OR DELETE ON public.marketplace_avaliacoes
  FOR EACH ROW EXECUTE FUNCTION public.update_marketplace_rating();

-- Índices para performance
CREATE INDEX idx_marketplace_terapeutas_cidade ON public.marketplace_terapeutas(cidade, estado);
CREATE INDEX idx_marketplace_terapeutas_especialidades ON public.marketplace_terapeutas USING GIN(especialidades);
CREATE INDEX idx_marketplace_terapeutas_slug ON public.marketplace_terapeutas(slug);
CREATE INDEX idx_marketplace_agendamentos_terapeuta ON public.marketplace_agendamentos(terapeuta_id, data_hora);
CREATE INDEX idx_marketplace_agendamentos_cliente ON public.marketplace_agendamentos(cliente_id);
CREATE INDEX idx_marketplace_avaliacoes_terapeuta ON public.marketplace_avaliacoes(terapeuta_id);
