
-- Adicionar role 'parceiro' ao enum existente
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'parceiro';

-- Tabela principal de parceiros (perfil estendido)
CREATE TABLE public.parceiros (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  nome_empresa TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE, -- para URL do perfil público
  logo_url TEXT,
  descricao TEXT,
  segmento TEXT NOT NULL DEFAULT 'saude', -- saude, estetica, fitness, nutricao, outro
  site_url TEXT,
  instagram TEXT,
  telefone TEXT,
  email_comercial TEXT,
  ativo BOOLEAN NOT NULL DEFAULT true,
  verificado BOOLEAN NOT NULL DEFAULT false,
  faixa_comissao_atual TEXT NOT NULL DEFAULT 'bronze', -- bronze, prata, ouro, diamante
  total_vendas_acumulado NUMERIC NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Faixas de comissão escalonada
CREATE TABLE public.parceiro_faixas_comissao (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome TEXT NOT NULL UNIQUE, -- bronze, prata, ouro, diamante
  percentual_comissao NUMERIC NOT NULL DEFAULT 5,
  meta_vendas_minima NUMERIC NOT NULL DEFAULT 0, -- valor acumulado necessário
  cor TEXT NOT NULL DEFAULT '#CD7F32',
  icone TEXT NOT NULL DEFAULT 'Medal',
  beneficios JSONB NOT NULL DEFAULT '[]'::jsonb,
  ordem INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Cupons de desconto emitidos por parceiros
CREATE TABLE public.parceiro_cupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parceiro_id UUID NOT NULL REFERENCES public.parceiros(id) ON DELETE CASCADE,
  codigo TEXT NOT NULL UNIQUE,
  descricao TEXT,
  tipo_desconto TEXT NOT NULL DEFAULT 'percentual', -- percentual, valor_fixo
  valor_desconto NUMERIC NOT NULL DEFAULT 10,
  valor_minimo_compra NUMERIC DEFAULT 0,
  max_usos INTEGER, -- null = ilimitado
  usos_atuais INTEGER NOT NULL DEFAULT 0,
  valido_ate DATE,
  ativo BOOLEAN NOT NULL DEFAULT true,
  servicos_aplicaveis JSONB DEFAULT '[]'::jsonb, -- vazio = todos
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Registro de uso de cupom (para rastreamento)
CREATE TABLE public.parceiro_cupom_usos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cupom_id UUID NOT NULL REFERENCES public.parceiro_cupons(id) ON DELETE CASCADE,
  parceiro_id UUID NOT NULL REFERENCES public.parceiros(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  valor_compra NUMERIC NOT NULL,
  valor_desconto_aplicado NUMERIC NOT NULL,
  referencia_tipo TEXT NOT NULL DEFAULT 'agendamento', -- agendamento, pedido, pacote
  referencia_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Comissões geradas para parceiros
CREATE TABLE public.parceiro_comissoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parceiro_id UUID NOT NULL REFERENCES public.parceiros(id) ON DELETE CASCADE,
  cupom_uso_id UUID REFERENCES public.parceiro_cupom_usos(id),
  valor_venda NUMERIC NOT NULL,
  percentual_comissao NUMERIC NOT NULL,
  valor_comissao NUMERIC NOT NULL,
  status TEXT NOT NULL DEFAULT 'pendente', -- pendente, aprovado, pago
  pago_em TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Vales presente emitidos por parceiros
CREATE TABLE public.parceiro_vales (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  parceiro_id UUID NOT NULL REFERENCES public.parceiros(id) ON DELETE CASCADE,
  vale_presente_id UUID NOT NULL REFERENCES public.vale_presentes(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.parceiros ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parceiro_faixas_comissao ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parceiro_cupons ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parceiro_cupom_usos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parceiro_comissoes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.parceiro_vales ENABLE ROW LEVEL SECURITY;

-- RLS: parceiros
CREATE POLICY "Admins gerenciam parceiros" ON public.parceiros FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Parceiro vê próprio perfil" ON public.parceiros FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Parceiro atualiza próprio perfil" ON public.parceiros FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Perfil público de parceiros verificados" ON public.parceiros FOR SELECT USING (ativo = true AND verificado = true);

-- RLS: faixas de comissão (público para leitura)
CREATE POLICY "Faixas visíveis para todos" ON public.parceiro_faixas_comissao FOR SELECT USING (true);
CREATE POLICY "Admins gerenciam faixas" ON public.parceiro_faixas_comissao FOR ALL USING (has_role(auth.uid(), 'admin'));

-- RLS: cupons
CREATE POLICY "Admins gerenciam cupons parceiro" ON public.parceiro_cupons FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Parceiro gerencia próprios cupons" ON public.parceiro_cupons FOR ALL USING (
  parceiro_id IN (SELECT id FROM public.parceiros WHERE user_id = auth.uid())
);
CREATE POLICY "Cupons ativos visíveis para autenticados" ON public.parceiro_cupons FOR SELECT USING (ativo = true AND auth.uid() IS NOT NULL);

-- RLS: usos de cupom
CREATE POLICY "Admins veem todos usos" ON public.parceiro_cupom_usos FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Parceiro vê usos dos próprios cupons" ON public.parceiro_cupom_usos FOR SELECT USING (
  parceiro_id IN (SELECT id FROM public.parceiros WHERE user_id = auth.uid())
);

-- RLS: comissões
CREATE POLICY "Admins gerenciam comissões" ON public.parceiro_comissoes FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Parceiro vê próprias comissões" ON public.parceiro_comissoes FOR SELECT USING (
  parceiro_id IN (SELECT id FROM public.parceiros WHERE user_id = auth.uid())
);

-- RLS: vales de parceiro
CREATE POLICY "Admins gerenciam vales parceiro" ON public.parceiro_vales FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Parceiro gerencia próprios vales" ON public.parceiro_vales FOR ALL USING (
  parceiro_id IN (SELECT id FROM public.parceiros WHERE user_id = auth.uid())
);

-- Trigger para updated_at
CREATE TRIGGER update_parceiros_updated_at BEFORE UPDATE ON public.parceiros
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_parceiro_cupons_updated_at BEFORE UPDATE ON public.parceiro_cupons
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Função helper para verificar se é parceiro
CREATE OR REPLACE FUNCTION public.is_parceiro(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.parceiros
    WHERE user_id = _user_id AND ativo = true
  )
$$;

-- Inserir faixas de comissão padrão
INSERT INTO public.parceiro_faixas_comissao (nome, percentual_comissao, meta_vendas_minima, cor, icone, ordem, beneficios) VALUES
  ('bronze', 5, 0, '#CD7F32', 'Medal', 0, '["Emissão de cupons", "Dashboard básico", "Perfil público"]'::jsonb),
  ('prata', 8, 2000, '#C0C0C0', 'Award', 1, '["Tudo do Bronze", "Relatórios avançados", "Cupons ilimitados", "Destaque no site"]'::jsonb),
  ('ouro', 12, 5000, '#FFD700', 'Trophy', 2, '["Tudo da Prata", "Materiais de marketing", "Suporte prioritário", "Co-branding"]'::jsonb),
  ('diamante', 15, 15000, '#B9F2FF', 'Crown', 3, '["Tudo do Ouro", "Comissão máxima", "Eventos exclusivos", "Pacotes personalizados"]'::jsonb);
