
-- =============================================
-- MÓDULO FINANCEIRO - PARTE 1: Tabelas Base
-- =============================================

-- 1. CATEGORIAS FINANCEIRAS
CREATE TABLE IF NOT EXISTS public.categorias_financeiras (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('receita', 'despesa')),
  categoria_pai_id UUID REFERENCES public.categorias_financeiras(id),
  cor TEXT DEFAULT '#6B7280',
  icone TEXT DEFAULT 'circle',
  descricao TEXT,
  ativo BOOLEAN DEFAULT true,
  ordem INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cat_fin_tipo ON public.categorias_financeiras(tipo);
CREATE INDEX IF NOT EXISTS idx_cat_fin_pai ON public.categorias_financeiras(categoria_pai_id);

CREATE TRIGGER set_categorias_financeiras_updated_at
  BEFORE UPDATE ON public.categorias_financeiras
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- SEED: Receitas
INSERT INTO public.categorias_financeiras (id, nome, tipo, cor, icone, ordem) VALUES
  ('a0000000-0000-0000-0000-000000000001', 'Serviços / Sessões', 'receita', '#10B981', 'calendar-check', 1),
  ('a0000000-0000-0000-0000-000000000002', 'Vendas de Produtos', 'receita', '#3B82F6', 'shopping-bag', 2),
  ('a0000000-0000-0000-0000-000000000003', 'Pacotes / Combos', 'receita', '#8B5CF6', 'package', 3),
  ('a0000000-0000-0000-0000-000000000004', 'Assinaturas / Clube VIP', 'receita', '#F59E0B', 'crown', 4),
  ('a0000000-0000-0000-0000-000000000005', 'Cursos / Formações', 'receita', '#EC4899', 'graduation-cap', 5),
  ('a0000000-0000-0000-0000-000000000006', 'Corporativo / B2B', 'receita', '#06B6D4', 'building-2', 6),
  ('a0000000-0000-0000-0000-000000000007', 'Vales Presente Vendidos', 'receita', '#F97316', 'gift', 7),
  ('a0000000-0000-0000-0000-000000000008', 'Outros / Receitas Diversas', 'receita', '#6B7280', 'plus-circle', 8)
ON CONFLICT (id) DO NOTHING;

-- SEED: Despesas
INSERT INTO public.categorias_financeiras (id, nome, tipo, cor, icone, ordem) VALUES
  ('b0000000-0000-0000-0000-000000000001', 'Aluguel / Condomínio', 'despesa', '#EF4444', 'home', 1),
  ('b0000000-0000-0000-0000-000000000002', 'Energia / Água / Gás', 'despesa', '#F59E0B', 'zap', 2),
  ('b0000000-0000-0000-0000-000000000003', 'Internet / Telefone', 'despesa', '#3B82F6', 'wifi', 3),
  ('b0000000-0000-0000-0000-000000000004', 'Software / Assinaturas', 'despesa', '#8B5CF6', 'monitor', 4),
  ('b0000000-0000-0000-0000-000000000005', 'Produtos / Insumos', 'despesa', '#10B981', 'flask-conical', 5),
  ('b0000000-0000-0000-0000-000000000006', 'Marketing / Publicidade', 'despesa', '#EC4899', 'megaphone', 6),
  ('b0000000-0000-0000-0000-000000000007', 'Salários / Pró-labore', 'despesa', '#06B6D4', 'users', 7),
  ('b0000000-0000-0000-0000-000000000008', 'Repasse Terapeutas', 'despesa', '#14B8A6', 'hand-coins', 8),
  ('b0000000-0000-0000-0000-000000000009', 'Impostos / Taxas', 'despesa', '#F97316', 'landmark', 9),
  ('b0000000-0000-0000-0000-000000000010', 'Manutenção / Equipamentos', 'despesa', '#A855F7', 'wrench', 10),
  ('b0000000-0000-0000-0000-000000000011', 'Contabilidade / Jurídico', 'despesa', '#64748B', 'scale', 11),
  ('b0000000-0000-0000-0000-000000000012', 'Material de Escritório', 'despesa', '#78716C', 'printer', 12),
  ('b0000000-0000-0000-0000-000000000013', 'Seguros', 'despesa', '#0EA5E9', 'shield', 13),
  ('b0000000-0000-0000-0000-000000000014', 'Cashback / Recompensas Pagas', 'despesa', '#D946EF', 'coins', 14),
  ('b0000000-0000-0000-0000-000000000015', 'Comissões Parceiros', 'despesa', '#F43F5E', 'handshake', 15),
  ('b0000000-0000-0000-0000-000000000016', 'Outros / Despesas Diversas', 'despesa', '#6B7280', 'minus-circle', 16)
ON CONFLICT (id) DO NOTHING;

-- Subcategorias exemplo (Marketing)
INSERT INTO public.categorias_financeiras (nome, tipo, categoria_pai_id, cor, icone, ordem) VALUES
  ('Google Ads', 'despesa', 'b0000000-0000-0000-0000-000000000006', '#EC4899', 'search', 1),
  ('Instagram Ads', 'despesa', 'b0000000-0000-0000-0000-000000000006', '#EC4899', 'instagram', 2),
  ('Materiais Gráficos', 'despesa', 'b0000000-0000-0000-0000-000000000006', '#EC4899', 'image', 3)
ON CONFLICT DO NOTHING;

-- 2. FORNECEDORES
CREATE TABLE IF NOT EXISTS public.fornecedores (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  tipo_pessoa TEXT DEFAULT 'juridica' CHECK (tipo_pessoa IN ('fisica', 'juridica')),
  cpf_cnpj TEXT,
  email TEXT,
  telefone TEXT,
  endereco TEXT,
  cidade TEXT,
  estado TEXT,
  cep TEXT,
  banco TEXT,
  agencia TEXT,
  conta TEXT,
  tipo_conta TEXT,
  chave_pix TEXT,
  categoria_padrao_id UUID REFERENCES public.categorias_financeiras(id),
  observacoes TEXT,
  ativo BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_fornecedores_ativo ON public.fornecedores(ativo);
CREATE INDEX IF NOT EXISTS idx_fornecedores_nome ON public.fornecedores(nome);

CREATE TRIGGER set_fornecedores_updated_at
  BEFORE UPDATE ON public.fornecedores
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 3. DESPESAS RECORRENTES
CREATE TABLE IF NOT EXISTS public.despesas_recorrentes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  descricao TEXT NOT NULL,
  valor NUMERIC(12,2) NOT NULL CHECK (valor > 0),
  categoria_id UUID REFERENCES public.categorias_financeiras(id),
  fornecedor_id UUID REFERENCES public.fornecedores(id),
  frequencia TEXT NOT NULL DEFAULT 'mensal'
    CHECK (frequencia IN ('semanal', 'quinzenal', 'mensal', 'bimestral', 'trimestral', 'semestral', 'anual')),
  dia_vencimento INTEGER NOT NULL DEFAULT 10 CHECK (dia_vencimento BETWEEN 1 AND 31),
  forma_pagamento TEXT,
  data_inicio DATE NOT NULL DEFAULT CURRENT_DATE,
  data_fim DATE,
  ativo BOOLEAN DEFAULT true,
  ultima_geracao DATE,
  total_gerado INTEGER DEFAULT 0,
  observacoes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_desp_recorrentes_ativo ON public.despesas_recorrentes(ativo);

CREATE TRIGGER set_despesas_recorrentes_updated_at
  BEFORE UPDATE ON public.despesas_recorrentes
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 4. CONTAS A PAGAR (sem FK para auth.users)
CREATE TABLE IF NOT EXISTS public.contas_pagar (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  descricao TEXT NOT NULL,
  valor NUMERIC(12,2) NOT NULL CHECK (valor > 0),
  valor_pago NUMERIC(12,2) DEFAULT 0,
  categoria_id UUID REFERENCES public.categorias_financeiras(id),
  fornecedor_id UUID REFERENCES public.fornecedores(id),
  data_emissao DATE NOT NULL DEFAULT CURRENT_DATE,
  data_vencimento DATE NOT NULL,
  data_pagamento DATE,
  status TEXT NOT NULL DEFAULT 'pendente'
    CHECK (status IN ('pendente', 'pago', 'parcial', 'vencido', 'cancelado', 'agendado')),
  forma_pagamento TEXT,
  comprovante_url TEXT,
  numero_documento TEXT,
  codigo_barras TEXT,
  despesa_recorrente_id UUID REFERENCES public.despesas_recorrentes(id),
  parcela_atual INTEGER,
  total_parcelas INTEGER,
  observacoes TEXT,
  tags TEXT[] DEFAULT '{}',
  anexos TEXT[] DEFAULT '{}',
  criado_por UUID,
  pago_por UUID,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_contas_pagar_status ON public.contas_pagar(status);
CREATE INDEX IF NOT EXISTS idx_contas_pagar_vencimento ON public.contas_pagar(data_vencimento);
CREATE INDEX IF NOT EXISTS idx_contas_pagar_categoria ON public.contas_pagar(categoria_id);
CREATE INDEX IF NOT EXISTS idx_contas_pagar_fornecedor ON public.contas_pagar(fornecedor_id);
CREATE INDEX IF NOT EXISTS idx_contas_pagar_status_vencimento ON public.contas_pagar(status, data_vencimento);

CREATE TRIGGER set_contas_pagar_updated_at
  BEFORE UPDATE ON public.contas_pagar
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- 5. ENRIQUECER TABELA TRANSACOES
ALTER TABLE public.transacoes
  ADD COLUMN IF NOT EXISTS categoria_id UUID REFERENCES public.categorias_financeiras(id);
ALTER TABLE public.transacoes
  ADD COLUMN IF NOT EXISTS metodo_pagamento TEXT;
ALTER TABLE public.transacoes
  ADD COLUMN IF NOT EXISTS nota_fiscal TEXT;
ALTER TABLE public.transacoes
  ADD COLUMN IF NOT EXISTS observacoes TEXT;

CREATE INDEX IF NOT EXISTS idx_transacoes_categoria ON public.transacoes(categoria_id);

-- 6. LOG DE AUDITORIA FINANCEIRA
CREATE TABLE IF NOT EXISTS public.financeiro_audit_log (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  tabela TEXT NOT NULL,
  registro_id UUID NOT NULL,
  acao TEXT NOT NULL,
  dados_anteriores JSONB,
  dados_novos JSONB,
  user_id UUID,
  user_name TEXT,
  ip_address TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_fin_audit_registro ON public.financeiro_audit_log(tabela, registro_id);
CREATE INDEX IF NOT EXISTS idx_fin_audit_user ON public.financeiro_audit_log(user_id);
CREATE INDEX IF NOT EXISTS idx_fin_audit_data ON public.financeiro_audit_log(created_at DESC);

-- =============================================
-- TRIGGERS E FUNÇÕES
-- =============================================

-- Status vencido automático
CREATE OR REPLACE FUNCTION update_contas_vencidas()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.status = 'pendente' AND NEW.data_vencimento < CURRENT_DATE THEN
    NEW.status := 'vencido';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_contas_pagar_vencimento
  BEFORE INSERT OR UPDATE ON public.contas_pagar
  FOR EACH ROW EXECUTE FUNCTION update_contas_vencidas();

-- Audit log ao pagar/cancelar conta
CREATE OR REPLACE FUNCTION audit_conta_pagamento()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF OLD.status != 'pago' AND NEW.status = 'pago' THEN
    INSERT INTO public.financeiro_audit_log (tabela, registro_id, acao, dados_anteriores, dados_novos, user_id)
    VALUES (
      'contas_pagar', NEW.id, 'pagou',
      jsonb_build_object('status', OLD.status, 'valor_pago', OLD.valor_pago),
      jsonb_build_object('status', NEW.status, 'valor_pago', NEW.valor_pago, 'data_pagamento', NEW.data_pagamento, 'forma_pagamento', NEW.forma_pagamento),
      COALESCE(auth.uid(), NULL)
    );
  END IF;

  IF OLD.status != 'cancelado' AND NEW.status = 'cancelado' THEN
    INSERT INTO public.financeiro_audit_log (tabela, registro_id, acao, dados_anteriores, dados_novos, user_id)
    VALUES (
      'contas_pagar', NEW.id, 'cancelou',
      jsonb_build_object('status', OLD.status, 'valor', OLD.valor),
      jsonb_build_object('status', NEW.status),
      COALESCE(auth.uid(), NULL)
    );
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trg_audit_conta_pagamento
  AFTER UPDATE ON public.contas_pagar
  FOR EACH ROW EXECUTE FUNCTION audit_conta_pagamento();

-- Helper: Último dia do mês
CREATE OR REPLACE FUNCTION ultimo_dia_mes(p_data DATE)
RETURNS INTEGER
LANGUAGE sql IMMUTABLE
SET search_path TO 'public'
AS $$
  SELECT EXTRACT(DAY FROM (date_trunc('month', p_data) + '1 month - 1 day'::interval))::INTEGER;
$$;

-- Gerar contas recorrentes
CREATE OR REPLACE FUNCTION gerar_contas_recorrentes(p_mes DATE DEFAULT CURRENT_DATE)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_recorrente RECORD;
  v_vencimento DATE;
  v_geradas INTEGER := 0;
  v_ja_existia INTEGER := 0;
  v_mes_ref TEXT;
  v_dia_real INTEGER;
  i INTEGER;
BEGIN
  v_mes_ref := to_char(p_mes, 'YYYY-MM');

  FOR v_recorrente IN
    SELECT * FROM public.despesas_recorrentes
    WHERE ativo = true
      AND data_inicio <= p_mes
      AND (data_fim IS NULL OR data_fim >= p_mes)
  LOOP
    IF v_recorrente.frequencia = 'semanal' THEN
      FOR i IN 0..3 LOOP
        v_dia_real := LEAST(v_recorrente.dia_vencimento + (i * 7), ultimo_dia_mes(p_mes));
        v_vencimento := make_date(
          EXTRACT(YEAR FROM p_mes)::INTEGER,
          EXTRACT(MONTH FROM p_mes)::INTEGER,
          v_dia_real
        );
        IF NOT EXISTS (
          SELECT 1 FROM public.contas_pagar
          WHERE despesa_recorrente_id = v_recorrente.id AND data_vencimento = v_vencimento
        ) THEN
          INSERT INTO public.contas_pagar (
            descricao, valor, categoria_id, fornecedor_id,
            data_vencimento, forma_pagamento, despesa_recorrente_id, observacoes
          ) VALUES (
            v_recorrente.descricao || ' — Sem ' || (i+1) || ' ' || to_char(p_mes, 'MM/YYYY'),
            v_recorrente.valor, v_recorrente.categoria_id, v_recorrente.fornecedor_id,
            v_vencimento, v_recorrente.forma_pagamento, v_recorrente.id,
            'Gerada automaticamente (semanal)'
          );
          v_geradas := v_geradas + 1;
        ELSE
          v_ja_existia := v_ja_existia + 1;
        END IF;
      END LOOP;
      UPDATE public.despesas_recorrentes
      SET ultima_geracao = p_mes, total_gerado = total_gerado + 4
      WHERE id = v_recorrente.id;
      CONTINUE;
    END IF;

    IF v_recorrente.frequencia = 'quinzenal' THEN
      FOR i IN 0..1 LOOP
        v_dia_real := LEAST(v_recorrente.dia_vencimento + (i * 15), ultimo_dia_mes(p_mes));
        v_vencimento := make_date(
          EXTRACT(YEAR FROM p_mes)::INTEGER,
          EXTRACT(MONTH FROM p_mes)::INTEGER,
          v_dia_real
        );
        IF NOT EXISTS (
          SELECT 1 FROM public.contas_pagar
          WHERE despesa_recorrente_id = v_recorrente.id AND data_vencimento = v_vencimento
        ) THEN
          INSERT INTO public.contas_pagar (
            descricao, valor, categoria_id, fornecedor_id,
            data_vencimento, forma_pagamento, despesa_recorrente_id, observacoes
          ) VALUES (
            v_recorrente.descricao || ' — Q' || (i+1) || ' ' || to_char(p_mes, 'MM/YYYY'),
            v_recorrente.valor, v_recorrente.categoria_id, v_recorrente.fornecedor_id,
            v_vencimento, v_recorrente.forma_pagamento, v_recorrente.id,
            'Gerada automaticamente (quinzenal)'
          );
          v_geradas := v_geradas + 1;
        ELSE
          v_ja_existia := v_ja_existia + 1;
        END IF;
      END LOOP;
      UPDATE public.despesas_recorrentes
      SET ultima_geracao = p_mes, total_gerado = total_gerado + 2
      WHERE id = v_recorrente.id;
      CONTINUE;
    END IF;

    v_dia_real := LEAST(v_recorrente.dia_vencimento, ultimo_dia_mes(p_mes));
    v_vencimento := make_date(
      EXTRACT(YEAR FROM p_mes)::INTEGER,
      EXTRACT(MONTH FROM p_mes)::INTEGER,
      v_dia_real
    );

    IF v_recorrente.frequencia = 'mensal' OR
       (v_recorrente.frequencia = 'bimestral' AND EXTRACT(MONTH FROM p_mes)::INTEGER % 2 = EXTRACT(MONTH FROM v_recorrente.data_inicio)::INTEGER % 2) OR
       (v_recorrente.frequencia = 'trimestral' AND EXTRACT(MONTH FROM p_mes)::INTEGER % 3 = EXTRACT(MONTH FROM v_recorrente.data_inicio)::INTEGER % 3) OR
       (v_recorrente.frequencia = 'semestral' AND EXTRACT(MONTH FROM p_mes)::INTEGER % 6 = EXTRACT(MONTH FROM v_recorrente.data_inicio)::INTEGER % 6) OR
       (v_recorrente.frequencia = 'anual' AND EXTRACT(MONTH FROM p_mes) = EXTRACT(MONTH FROM v_recorrente.data_inicio))
    THEN
      IF NOT EXISTS (
        SELECT 1 FROM public.contas_pagar
        WHERE despesa_recorrente_id = v_recorrente.id
          AND to_char(data_vencimento, 'YYYY-MM') = v_mes_ref
      ) THEN
        INSERT INTO public.contas_pagar (
          descricao, valor, categoria_id, fornecedor_id,
          data_vencimento, forma_pagamento, despesa_recorrente_id, observacoes
        ) VALUES (
          v_recorrente.descricao || ' — ' || to_char(p_mes, 'MM/YYYY'),
          v_recorrente.valor, v_recorrente.categoria_id, v_recorrente.fornecedor_id,
          v_vencimento, v_recorrente.forma_pagamento, v_recorrente.id,
          'Gerada automaticamente'
        );
        UPDATE public.despesas_recorrentes
        SET ultima_geracao = p_mes, total_gerado = total_gerado + 1
        WHERE id = v_recorrente.id;
        v_geradas := v_geradas + 1;
      ELSE
        v_ja_existia := v_ja_existia + 1;
      END IF;
    END IF;
  END LOOP;

  RETURN jsonb_build_object(
    'mes_referencia', v_mes_ref,
    'contas_geradas', v_geradas,
    'ja_existiam', v_ja_existia,
    'executado_em', now()
  );
END;
$$;

-- Pagar conta
CREATE OR REPLACE FUNCTION pagar_conta(
  p_conta_id UUID,
  p_valor_pago NUMERIC DEFAULT NULL,
  p_forma_pagamento TEXT DEFAULT NULL,
  p_data_pagamento DATE DEFAULT CURRENT_DATE,
  p_comprovante_url TEXT DEFAULT NULL
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_conta RECORD;
  v_novo_status TEXT;
  v_total_pago NUMERIC;
BEGIN
  SELECT * INTO v_conta FROM public.contas_pagar WHERE id = p_conta_id;
  IF NOT FOUND THEN
    RETURN jsonb_build_object('error', 'Conta não encontrada');
  END IF;

  IF v_conta.status IN ('pago', 'cancelado') THEN
    RETURN jsonb_build_object('error', 'Conta já está ' || v_conta.status);
  END IF;

  p_valor_pago := COALESCE(p_valor_pago, v_conta.valor - v_conta.valor_pago);
  v_total_pago := v_conta.valor_pago + p_valor_pago;

  IF v_total_pago >= v_conta.valor THEN
    v_novo_status := 'pago';
  ELSE
    v_novo_status := 'parcial';
  END IF;

  UPDATE public.contas_pagar
  SET
    status = v_novo_status,
    valor_pago = v_total_pago,
    forma_pagamento = COALESCE(p_forma_pagamento, forma_pagamento),
    data_pagamento = p_data_pagamento,
    comprovante_url = COALESCE(p_comprovante_url, comprovante_url),
    pago_por = COALESCE(auth.uid(), pago_por)
  WHERE id = p_conta_id;

  RETURN jsonb_build_object(
    'success', true,
    'conta_id', p_conta_id,
    'status', v_novo_status,
    'valor_pago_agora', p_valor_pago,
    'valor_pago_total', v_total_pago
  );
END;
$$;

-- Resumo financeiro (dashboard)
CREATE OR REPLACE FUNCTION get_resumo_financeiro(
  p_data_inicio DATE DEFAULT date_trunc('month', CURRENT_DATE)::DATE,
  p_data_fim DATE DEFAULT CURRENT_DATE
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
STABLE
SET search_path TO 'public'
AS $$
DECLARE
  v_total_receitas NUMERIC;
  v_total_despesas_pagas NUMERIC;
  v_total_despesas_pendentes NUMERIC;
  v_total_despesas_vencidas NUMERIC;
  v_saldo NUMERIC;
  v_receitas_por_categoria JSONB;
  v_despesas_por_categoria JSONB;
  v_contas_vencendo_7d JSONB;
BEGIN
  SELECT COALESCE(SUM(valor), 0) INTO v_total_receitas
  FROM public.transacoes
  WHERE tipo IN ('pagamento', 'venda', 'assinatura', 'sessao')
    AND created_at::DATE BETWEEN p_data_inicio AND p_data_fim;

  SELECT COALESCE(SUM(valor_pago), 0) INTO v_total_despesas_pagas
  FROM public.contas_pagar
  WHERE status = 'pago' AND data_pagamento BETWEEN p_data_inicio AND p_data_fim;

  SELECT COALESCE(SUM(valor), 0) INTO v_total_despesas_pendentes
  FROM public.contas_pagar
  WHERE status IN ('pendente', 'agendado')
    AND data_vencimento BETWEEN p_data_inicio AND p_data_fim;

  SELECT COALESCE(SUM(valor), 0) INTO v_total_despesas_vencidas
  FROM public.contas_pagar WHERE status = 'vencido';

  v_saldo := v_total_receitas - v_total_despesas_pagas;

  SELECT COALESCE(jsonb_agg(jsonb_build_object(
    'categoria', sub.nome, 'cor', sub.cor, 'total', sub.total
  ) ORDER BY sub.total DESC), '[]'::jsonb) INTO v_receitas_por_categoria
  FROM (
    SELECT COALESCE(cf.nome, 'Sem categoria') AS nome, COALESCE(cf.cor, '#6B7280') AS cor, SUM(t.valor) as total
    FROM public.transacoes t
    LEFT JOIN public.categorias_financeiras cf ON t.categoria_id = cf.id
    WHERE t.tipo IN ('pagamento', 'venda', 'assinatura', 'sessao')
      AND t.created_at::DATE BETWEEN p_data_inicio AND p_data_fim
    GROUP BY cf.nome, cf.cor
  ) sub;

  SELECT COALESCE(jsonb_agg(jsonb_build_object(
    'categoria', sub.nome, 'cor', sub.cor, 'total_pago', sub.total_pago, 'total_pendente', sub.total_pendente
  ) ORDER BY sub.total_pago DESC), '[]'::jsonb) INTO v_despesas_por_categoria
  FROM (
    SELECT
      COALESCE(cf.nome, 'Sem categoria') AS nome, COALESCE(cf.cor, '#6B7280') AS cor,
      SUM(CASE WHEN cp.status = 'pago' THEN cp.valor_pago ELSE 0 END) as total_pago,
      SUM(CASE WHEN cp.status IN ('pendente', 'vencido') THEN cp.valor ELSE 0 END) as total_pendente
    FROM public.contas_pagar cp
    LEFT JOIN public.categorias_financeiras cf ON cp.categoria_id = cf.id
    WHERE cp.data_vencimento BETWEEN p_data_inicio AND p_data_fim AND cp.status != 'cancelado'
    GROUP BY cf.nome, cf.cor
  ) sub;

  SELECT COALESCE(jsonb_agg(jsonb_build_object(
    'id', cp.id, 'descricao', cp.descricao, 'valor', cp.valor,
    'vencimento', cp.data_vencimento, 'fornecedor', f.nome,
    'categoria', cf.nome, 'dias_restantes', cp.data_vencimento - CURRENT_DATE
  ) ORDER BY cp.data_vencimento), '[]'::jsonb) INTO v_contas_vencendo_7d
  FROM public.contas_pagar cp
  LEFT JOIN public.fornecedores f ON cp.fornecedor_id = f.id
  LEFT JOIN public.categorias_financeiras cf ON cp.categoria_id = cf.id
  WHERE cp.status IN ('pendente', 'agendado')
    AND cp.data_vencimento BETWEEN CURRENT_DATE AND CURRENT_DATE + 7;

  RETURN jsonb_build_object(
    'periodo', jsonb_build_object('inicio', p_data_inicio, 'fim', p_data_fim),
    'receitas', v_total_receitas,
    'despesas_pagas', v_total_despesas_pagas,
    'despesas_pendentes', v_total_despesas_pendentes,
    'despesas_vencidas', v_total_despesas_vencidas,
    'saldo', v_saldo,
    'margem_percentual', CASE WHEN v_total_receitas > 0
      THEN ROUND((v_saldo / v_total_receitas) * 100, 1) ELSE 0 END,
    'receitas_por_categoria', v_receitas_por_categoria,
    'despesas_por_categoria', v_despesas_por_categoria,
    'contas_vencendo_7d', v_contas_vencendo_7d,
    'gerado_em', now()
  );
END;
$$;

-- Listagem de contas com filtros
CREATE OR REPLACE FUNCTION listar_contas_pagar(
  p_status TEXT DEFAULT NULL,
  p_categoria_id UUID DEFAULT NULL,
  p_fornecedor_id UUID DEFAULT NULL,
  p_data_inicio DATE DEFAULT NULL,
  p_data_fim DATE DEFAULT NULL,
  p_limit INTEGER DEFAULT 50,
  p_offset INTEGER DEFAULT 0
)
RETURNS TABLE(
  id UUID, descricao TEXT, valor NUMERIC, valor_pago NUMERIC,
  categoria_nome TEXT, categoria_cor TEXT, fornecedor_nome TEXT,
  data_vencimento DATE, data_pagamento DATE, status TEXT,
  forma_pagamento TEXT, dias_vencimento INTEGER, despesa_recorrente BOOLEAN,
  created_at TIMESTAMPTZ
)
LANGUAGE plpgsql SECURITY DEFINER STABLE
SET search_path TO 'public'
AS $$
BEGIN
  RETURN QUERY
  SELECT
    cp.id, cp.descricao, cp.valor, cp.valor_pago,
    cf.nome, cf.cor, f.nome,
    cp.data_vencimento, cp.data_pagamento, cp.status, cp.forma_pagamento,
    (cp.data_vencimento - CURRENT_DATE)::INTEGER,
    (cp.despesa_recorrente_id IS NOT NULL),
    cp.created_at
  FROM public.contas_pagar cp
  LEFT JOIN public.categorias_financeiras cf ON cp.categoria_id = cf.id
  LEFT JOIN public.fornecedores f ON cp.fornecedor_id = f.id
  WHERE
    (p_status IS NULL OR cp.status = p_status)
    AND (p_categoria_id IS NULL OR cp.categoria_id = p_categoria_id)
    AND (p_fornecedor_id IS NULL OR cp.fornecedor_id = p_fornecedor_id)
    AND (p_data_inicio IS NULL OR cp.data_vencimento >= p_data_inicio)
    AND (p_data_fim IS NULL OR cp.data_vencimento <= p_data_fim)
    AND cp.status != 'cancelado'
  ORDER BY
    CASE cp.status
      WHEN 'vencido' THEN 1 WHEN 'pendente' THEN 2
      WHEN 'parcial' THEN 3 WHEN 'agendado' THEN 4 WHEN 'pago' THEN 5
    END,
    cp.data_vencimento ASC
  LIMIT p_limit OFFSET p_offset;
END;
$$;

-- Helper: Resolver categoria por nome
CREATE OR REPLACE FUNCTION get_cat_ids(p_nomes TEXT[])
RETURNS UUID[]
LANGUAGE sql STABLE
SET search_path TO 'public'
AS $$
  SELECT COALESCE(array_agg(id), ARRAY[]::UUID[])
  FROM categorias_financeiras
  WHERE nome = ANY(p_nomes);
$$;

-- =============================================
-- RLS POLICIES
-- =============================================

ALTER TABLE public.categorias_financeiras ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.fornecedores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contas_pagar ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.despesas_recorrentes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.financeiro_audit_log ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone reads categorias" ON public.categorias_financeiras FOR SELECT USING (true);
CREATE POLICY "Admins manage categorias" ON public.categorias_financeiras FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage fornecedores" ON public.fornecedores FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage contas_pagar" ON public.contas_pagar FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins manage despesas_recorrentes" ON public.despesas_recorrentes FOR ALL USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "Admins read audit" ON public.financeiro_audit_log FOR SELECT USING (has_role(auth.uid(), 'admin'));
CREATE POLICY "System inserts audit" ON public.financeiro_audit_log FOR INSERT WITH CHECK (true);
