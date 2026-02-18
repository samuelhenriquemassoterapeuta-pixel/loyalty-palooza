
-- =============================================
-- SISTEMA DE CROMOS DO BEM-ESTAR
-- =============================================

-- 1. Mapeamento de elementos por produto/serviço (admin configurável)
CREATE TABLE public.produto_elementos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  produto_id UUID REFERENCES public.produtos(id) ON DELETE CASCADE,
  servico_nome TEXT, -- referência ao nome do serviço (agendamentos usam nome)
  elemento TEXT NOT NULL CHECK (elemento IN ('terra', 'agua', 'fogo', 'ar', 'eter')),
  multiplicador NUMERIC NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  -- Garantir que cada produto/serviço tem no máximo um elemento
  UNIQUE(produto_id),
  UNIQUE(servico_nome),
  -- Pelo menos um dos dois deve ser preenchido
  CHECK (produto_id IS NOT NULL OR servico_nome IS NOT NULL)
);

-- 2. Saldo de cromos por elemento por usuário
CREATE TABLE public.cromos_usuarios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  elemento TEXT NOT NULL CHECK (elemento IN ('terra', 'agua', 'fogo', 'ar', 'eter')),
  quantidade INTEGER NOT NULL DEFAULT 0 CHECK (quantidade >= 0),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(user_id, elemento)
);

-- 3. Histórico de transações de cromos
CREATE TABLE public.transacoes_cromos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('compra', 'sessao', 'alquimia_debito', 'alquimia_credito', 'resgate', 'bonus', 'admin')),
  elemento TEXT NOT NULL CHECK (elemento IN ('terra', 'agua', 'fogo', 'ar', 'eter')),
  quantidade INTEGER NOT NULL,
  descricao TEXT,
  referencia_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 4. Receitas de Alquimia (combinar elementos para gerar recompensas)
CREATE TABLE public.receitas_alquimia (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  icone TEXT DEFAULT '⚗️',
  -- Ingredientes (quantidade requerida de cada elemento)
  terra_requerido INTEGER NOT NULL DEFAULT 0,
  agua_requerido INTEGER NOT NULL DEFAULT 0,
  fogo_requerido INTEGER NOT NULL DEFAULT 0,
  ar_requerido INTEGER NOT NULL DEFAULT 0,
  eter_requerido INTEGER NOT NULL DEFAULT 0,
  -- Recompensa
  recompensa_tipo TEXT NOT NULL CHECK (recompensa_tipo IN ('cashback', 'desconto', 'produto', 'servico', 'elemento')),
  recompensa_valor NUMERIC NOT NULL DEFAULT 0,
  recompensa_descricao TEXT,
  -- Elemento gerado (quando recompensa_tipo = 'elemento')
  elemento_gerado TEXT CHECK (elemento_gerado IS NULL OR elemento_gerado IN ('terra', 'agua', 'fogo', 'ar', 'eter')),
  quantidade_gerada INTEGER DEFAULT 0,
  -- Controle
  ativo BOOLEAN NOT NULL DEFAULT true,
  nivel_minimo TEXT NOT NULL DEFAULT 'equilibrio' CHECK (nivel_minimo IN ('equilibrio', 'harmonia', 'plenitude')),
  usos_maximos INTEGER, -- NULL = ilimitado
  ordem INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 5. Recompensas resgatáveis com cromos
CREATE TABLE public.recompensas_cromos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  descricao TEXT,
  icone TEXT DEFAULT '🎁',
  -- Custo em elemento específico
  elemento_requerido TEXT NOT NULL CHECK (elemento_requerido IN ('terra', 'agua', 'fogo', 'ar', 'eter')),
  quantidade_requerida INTEGER NOT NULL,
  -- Recompensa
  recompensa_tipo TEXT NOT NULL CHECK (recompensa_tipo IN ('cashback', 'desconto', 'produto', 'servico')),
  recompensa_valor NUMERIC NOT NULL DEFAULT 0,
  recompensa_descricao TEXT,
  -- Controle
  ativo BOOLEAN NOT NULL DEFAULT true,
  estoque INTEGER, -- NULL = ilimitado
  nivel_minimo TEXT NOT NULL DEFAULT 'equilibrio',
  ordem INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- 6. Resgates realizados
CREATE TABLE public.resgates_cromos (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  tipo TEXT NOT NULL CHECK (tipo IN ('recompensa', 'alquimia')),
  recompensa_id UUID REFERENCES public.recompensas_cromos(id),
  receita_id UUID REFERENCES public.receitas_alquimia(id),
  codigo_resgate TEXT NOT NULL DEFAULT UPPER(SUBSTRING(MD5(gen_random_uuid()::text) FROM 1 FOR 8)),
  utilizado BOOLEAN NOT NULL DEFAULT false,
  utilizado_em TIMESTAMPTZ,
  expira_em TIMESTAMPTZ NOT NULL DEFAULT (now() + INTERVAL '30 days'),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- =============================================
-- RLS POLICIES
-- =============================================

ALTER TABLE public.produto_elementos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cromos_usuarios ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transacoes_cromos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.receitas_alquimia ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.recompensas_cromos ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.resgates_cromos ENABLE ROW LEVEL SECURITY;

-- produto_elementos: leitura pública, escrita admin
CREATE POLICY "Todos podem ver mapeamento de elementos"
  ON public.produto_elementos FOR SELECT USING (true);
CREATE POLICY "Admins gerenciam mapeamento de elementos"
  ON public.produto_elementos FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- cromos_usuarios: usuário vê os próprios
CREATE POLICY "Usuários veem seus cromos"
  ON public.cromos_usuarios FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Sistema gerencia cromos"
  ON public.cromos_usuarios FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- transacoes_cromos: usuário vê as próprias
CREATE POLICY "Usuários veem suas transações de cromos"
  ON public.transacoes_cromos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins gerenciam transações de cromos"
  ON public.transacoes_cromos FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- receitas_alquimia: leitura pública, escrita admin
CREATE POLICY "Todos podem ver receitas"
  ON public.receitas_alquimia FOR SELECT USING (true);
CREATE POLICY "Admins gerenciam receitas"
  ON public.receitas_alquimia FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- recompensas_cromos: leitura pública, escrita admin
CREATE POLICY "Todos podem ver recompensas de cromos"
  ON public.recompensas_cromos FOR SELECT USING (true);
CREATE POLICY "Admins gerenciam recompensas de cromos"
  ON public.recompensas_cromos FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- resgates_cromos: usuário vê os próprios
CREATE POLICY "Usuários veem seus resgates"
  ON public.resgates_cromos FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Usuários podem criar resgates"
  ON public.resgates_cromos FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins gerenciam resgates"
  ON public.resgates_cromos FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- TRIGGER: Creditar cromos ao confirmar pedido
-- =============================================
CREATE OR REPLACE FUNCTION public.credit_cromos_on_order()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  item RECORD;
  v_elemento TEXT;
  v_mult NUMERIC;
  v_qtd INTEGER;
BEGIN
  FOR item IN
    SELECT pi.quantidade, pi.produto_id
    FROM pedido_itens pi
    WHERE pi.pedido_id = NEW.id
  LOOP
    SELECT pe.elemento, pe.multiplicador INTO v_elemento, v_mult
    FROM produto_elementos pe
    WHERE pe.produto_id = item.produto_id;

    IF v_elemento IS NOT NULL THEN
      v_qtd := CEIL(item.quantidade * v_mult);

      INSERT INTO cromos_usuarios (user_id, elemento, quantidade)
      VALUES (NEW.user_id, v_elemento, v_qtd)
      ON CONFLICT (user_id, elemento)
      DO UPDATE SET quantidade = cromos_usuarios.quantidade + v_qtd, updated_at = now();

      INSERT INTO transacoes_cromos (user_id, tipo, elemento, quantidade, descricao, referencia_id)
      VALUES (NEW.user_id, 'compra', v_elemento, v_qtd, 'Pedido #' || LEFT(NEW.id::text, 8), NEW.id);
    END IF;
  END LOOP;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_credit_cromos_on_order
  AFTER INSERT ON public.pedidos
  FOR EACH ROW
  EXECUTE FUNCTION public.credit_cromos_on_order();

-- =============================================
-- TRIGGER: Creditar cromos ao concluir agendamento
-- =============================================
CREATE OR REPLACE FUNCTION public.credit_cromos_on_agendamento()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_elemento TEXT;
  v_mult NUMERIC;
  v_qtd INTEGER;
BEGIN
  IF NEW.status = 'concluido' AND (OLD.status IS NULL OR OLD.status != 'concluido') THEN
    SELECT pe.elemento, pe.multiplicador INTO v_elemento, v_mult
    FROM produto_elementos pe
    WHERE pe.servico_nome = NEW.servico;

    IF v_elemento IS NOT NULL THEN
      v_qtd := CEIL(v_mult);

      INSERT INTO cromos_usuarios (user_id, elemento, quantidade)
      VALUES (NEW.user_id, v_elemento, v_qtd)
      ON CONFLICT (user_id, elemento)
      DO UPDATE SET quantidade = cromos_usuarios.quantidade + v_qtd, updated_at = now();

      INSERT INTO transacoes_cromos (user_id, tipo, elemento, quantidade, descricao, referencia_id)
      VALUES (NEW.user_id, 'sessao', v_elemento, v_qtd, 'Sessão de ' || NEW.servico, NEW.id);
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_credit_cromos_on_agendamento
  AFTER UPDATE ON public.agendamentos
  FOR EACH ROW
  EXECUTE FUNCTION public.credit_cromos_on_agendamento();

-- =============================================
-- FUNCTION: Executar alquimia (RPC chamada pelo frontend)
-- =============================================
CREATE OR REPLACE FUNCTION public.executar_alquimia(p_receita_id UUID)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_user_id UUID;
  v_receita RECORD;
  v_saldo RECORD;
  v_cashback_valor NUMERIC;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Usuário não autenticado';
  END IF;

  SELECT * INTO v_receita FROM receitas_alquimia WHERE id = p_receita_id AND ativo = true;
  IF v_receita IS NULL THEN
    RAISE EXCEPTION 'Receita não encontrada ou inativa';
  END IF;

  -- Verificar saldo de cada elemento
  IF v_receita.terra_requerido > 0 THEN
    SELECT quantidade INTO v_saldo FROM cromos_usuarios WHERE user_id = v_user_id AND elemento = 'terra';
    IF COALESCE(v_saldo.quantidade, 0) < v_receita.terra_requerido THEN
      RAISE EXCEPTION 'Cromos de Terra insuficientes';
    END IF;
  END IF;
  IF v_receita.agua_requerido > 0 THEN
    SELECT quantidade INTO v_saldo FROM cromos_usuarios WHERE user_id = v_user_id AND elemento = 'agua';
    IF COALESCE(v_saldo.quantidade, 0) < v_receita.agua_requerido THEN
      RAISE EXCEPTION 'Cromos de Água insuficientes';
    END IF;
  END IF;
  IF v_receita.fogo_requerido > 0 THEN
    SELECT quantidade INTO v_saldo FROM cromos_usuarios WHERE user_id = v_user_id AND elemento = 'fogo';
    IF COALESCE(v_saldo.quantidade, 0) < v_receita.fogo_requerido THEN
      RAISE EXCEPTION 'Cromos de Fogo insuficientes';
    END IF;
  END IF;
  IF v_receita.ar_requerido > 0 THEN
    SELECT quantidade INTO v_saldo FROM cromos_usuarios WHERE user_id = v_user_id AND elemento = 'ar';
    IF COALESCE(v_saldo.quantidade, 0) < v_receita.ar_requerido THEN
      RAISE EXCEPTION 'Cromos de Ar insuficientes';
    END IF;
  END IF;
  IF v_receita.eter_requerido > 0 THEN
    SELECT quantidade INTO v_saldo FROM cromos_usuarios WHERE user_id = v_user_id AND elemento = 'eter';
    IF COALESCE(v_saldo.quantidade, 0) < v_receita.eter_requerido THEN
      RAISE EXCEPTION 'Cromos de Éter insuficientes';
    END IF;
  END IF;

  -- Debitar elementos
  IF v_receita.terra_requerido > 0 THEN
    UPDATE cromos_usuarios SET quantidade = quantidade - v_receita.terra_requerido, updated_at = now()
    WHERE user_id = v_user_id AND elemento = 'terra';
    INSERT INTO transacoes_cromos (user_id, tipo, elemento, quantidade, descricao, referencia_id)
    VALUES (v_user_id, 'alquimia_debito', 'terra', -v_receita.terra_requerido, 'Alquimia: ' || v_receita.nome, v_receita.id);
  END IF;
  IF v_receita.agua_requerido > 0 THEN
    UPDATE cromos_usuarios SET quantidade = quantidade - v_receita.agua_requerido, updated_at = now()
    WHERE user_id = v_user_id AND elemento = 'agua';
    INSERT INTO transacoes_cromos (user_id, tipo, elemento, quantidade, descricao, referencia_id)
    VALUES (v_user_id, 'alquimia_debito', 'agua', -v_receita.agua_requerido, 'Alquimia: ' || v_receita.nome, v_receita.id);
  END IF;
  IF v_receita.fogo_requerido > 0 THEN
    UPDATE cromos_usuarios SET quantidade = quantidade - v_receita.fogo_requerido, updated_at = now()
    WHERE user_id = v_user_id AND elemento = 'fogo';
    INSERT INTO transacoes_cromos (user_id, tipo, elemento, quantidade, descricao, referencia_id)
    VALUES (v_user_id, 'alquimia_debito', 'fogo', -v_receita.fogo_requerido, 'Alquimia: ' || v_receita.nome, v_receita.id);
  END IF;
  IF v_receita.ar_requerido > 0 THEN
    UPDATE cromos_usuarios SET quantidade = quantidade - v_receita.ar_requerido, updated_at = now()
    WHERE user_id = v_user_id AND elemento = 'ar';
    INSERT INTO transacoes_cromos (user_id, tipo, elemento, quantidade, descricao, referencia_id)
    VALUES (v_user_id, 'alquimia_debito', 'ar', -v_receita.ar_requerido, 'Alquimia: ' || v_receita.nome, v_receita.id);
  END IF;
  IF v_receita.eter_requerido > 0 THEN
    UPDATE cromos_usuarios SET quantidade = quantidade - v_receita.eter_requerido, updated_at = now()
    WHERE user_id = v_user_id AND elemento = 'eter';
    INSERT INTO transacoes_cromos (user_id, tipo, elemento, quantidade, descricao, referencia_id)
    VALUES (v_user_id, 'alquimia_debito', 'eter', -v_receita.eter_requerido, 'Alquimia: ' || v_receita.nome, v_receita.id);
  END IF;

  -- Aplicar recompensa
  IF v_receita.recompensa_tipo = 'cashback' THEN
    INSERT INTO transacoes (user_id, tipo, valor, descricao, referencia_id, expira_em)
    VALUES (v_user_id, 'cashback', v_receita.recompensa_valor,
      'Alquimia: ' || v_receita.nome || ' ⚗️', v_receita.id, now() + INTERVAL '90 days');
  ELSIF v_receita.recompensa_tipo = 'elemento' AND v_receita.elemento_gerado IS NOT NULL THEN
    INSERT INTO cromos_usuarios (user_id, elemento, quantidade)
    VALUES (v_user_id, v_receita.elemento_gerado, v_receita.quantidade_gerada)
    ON CONFLICT (user_id, elemento)
    DO UPDATE SET quantidade = cromos_usuarios.quantidade + v_receita.quantidade_gerada, updated_at = now();
    INSERT INTO transacoes_cromos (user_id, tipo, elemento, quantidade, descricao, referencia_id)
    VALUES (v_user_id, 'alquimia_credito', v_receita.elemento_gerado, v_receita.quantidade_gerada, 'Alquimia: ' || v_receita.nome, v_receita.id);
  END IF;

  -- Registrar resgate
  INSERT INTO resgates_cromos (user_id, tipo, receita_id)
  VALUES (v_user_id, 'alquimia', v_receita.id);

  -- Notificação
  INSERT INTO notificacoes (user_id, titulo, mensagem, tipo)
  VALUES (v_user_id, 'Alquimia realizada! ⚗️✨',
    'Você combinou elementos e obteve: ' || v_receita.recompensa_descricao, 'cashback');

  RETURN jsonb_build_object('success', true, 'receita', v_receita.nome, 'recompensa', v_receita.recompensa_descricao);
END;
$$;

-- =============================================
-- FUNCTION: Resgatar recompensa com cromos (RPC)
-- =============================================
CREATE OR REPLACE FUNCTION public.resgatar_recompensa_cromo(p_recompensa_id UUID)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_user_id UUID;
  v_rec RECORD;
  v_saldo INTEGER;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Usuário não autenticado';
  END IF;

  SELECT * INTO v_rec FROM recompensas_cromos WHERE id = p_recompensa_id AND ativo = true;
  IF v_rec IS NULL THEN
    RAISE EXCEPTION 'Recompensa não encontrada ou inativa';
  END IF;

  -- Verificar estoque
  IF v_rec.estoque IS NOT NULL AND v_rec.estoque <= 0 THEN
    RAISE EXCEPTION 'Recompensa esgotada';
  END IF;

  -- Verificar saldo do elemento
  SELECT quantidade INTO v_saldo FROM cromos_usuarios WHERE user_id = v_user_id AND elemento = v_rec.elemento_requerido;
  IF COALESCE(v_saldo, 0) < v_rec.quantidade_requerida THEN
    RAISE EXCEPTION 'Cromos insuficientes';
  END IF;

  -- Debitar cromos
  UPDATE cromos_usuarios SET quantidade = quantidade - v_rec.quantidade_requerida, updated_at = now()
  WHERE user_id = v_user_id AND elemento = v_rec.elemento_requerido;

  INSERT INTO transacoes_cromos (user_id, tipo, elemento, quantidade, descricao, referencia_id)
  VALUES (v_user_id, 'resgate', v_rec.elemento_requerido, -v_rec.quantidade_requerida, 'Resgate: ' || v_rec.nome, v_rec.id);

  -- Aplicar recompensa
  IF v_rec.recompensa_tipo = 'cashback' THEN
    INSERT INTO transacoes (user_id, tipo, valor, descricao, referencia_id, expira_em)
    VALUES (v_user_id, 'cashback', v_rec.recompensa_valor,
      'Resgate de cromos: ' || v_rec.nome || ' 🎁', v_rec.id, now() + INTERVAL '90 days');
  END IF;

  -- Reduzir estoque
  IF v_rec.estoque IS NOT NULL THEN
    UPDATE recompensas_cromos SET estoque = estoque - 1 WHERE id = v_rec.id;
  END IF;

  -- Registrar resgate
  INSERT INTO resgates_cromos (user_id, tipo, recompensa_id)
  VALUES (v_user_id, 'recompensa', v_rec.id);

  -- Notificação
  INSERT INTO notificacoes (user_id, titulo, mensagem, tipo)
  VALUES (v_user_id, 'Resgate realizado! 🎁',
    'Você resgatou: ' || v_rec.nome || '. ' || COALESCE(v_rec.recompensa_descricao, ''), 'cashback');

  RETURN jsonb_build_object('success', true, 'recompensa', v_rec.nome);
END;
$$;
