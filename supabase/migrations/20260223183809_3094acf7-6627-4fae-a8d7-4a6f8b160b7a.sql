
-- DRE (Demonstrativo de Resultado) function
CREATE OR REPLACE FUNCTION public.get_dre(
  p_data_inicio DATE DEFAULT date_trunc('month', CURRENT_DATE)::DATE,
  p_data_fim DATE DEFAULT CURRENT_DATE
)
RETURNS JSONB
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_result JSONB;
  v_receita_servicos NUMERIC;
  v_receita_produtos NUMERIC;
  v_receita_assinaturas NUMERIC;
  v_despesas_fixas NUMERIC;
  v_despesas_variaveis NUMERIC;
  v_despesas_pessoal NUMERIC;
  v_despesas_marketing NUMERIC;
  v_despesas_impostos NUMERIC;
  v_despesas_outras NUMERIC;
  v_cat_ids JSONB;
BEGIN
  -- Receitas de serviços (agendamentos concluídos)
  SELECT COALESCE(SUM(s.preco), 0) INTO v_receita_servicos
  FROM agendamentos a
  JOIN servicos s ON s.nome = a.servico
  WHERE a.status IN ('concluido', 'realizado')
    AND a.data_hora::date BETWEEN p_data_inicio AND p_data_fim;

  -- Receitas de produtos (pedidos não cancelados)
  SELECT COALESCE(SUM(p.total), 0) INTO v_receita_produtos
  FROM pedidos p
  WHERE p.status != 'cancelado'
    AND p.created_at::date BETWEEN p_data_inicio AND p_data_fim;

  -- Receitas de assinaturas
  SELECT COALESCE(SUM(ap.preco_mensal), 0) INTO v_receita_assinaturas
  FROM assinaturas_usuario au
  JOIN assinaturas_planos ap ON ap.id = au.plano_id
  WHERE au.status = 'ativo'
    AND au.data_inicio::date <= p_data_fim
    AND (au.data_fim IS NULL OR au.data_fim::date >= p_data_inicio);

  -- Despesas por categoria tipo (usando categorias_financeiras)
  SELECT
    COALESCE(SUM(CASE WHEN cf.nome ILIKE '%aluguel%' OR cf.nome ILIKE '%fixas%' OR cf.nome ILIKE '%internet%' OR cf.nome ILIKE '%energia%' OR cf.nome ILIKE '%água%' OR cf.nome ILIKE '%telefone%' OR cf.nome ILIKE '%software%' THEN COALESCE(cp.valor_pago, 0) ELSE 0 END), 0),
    COALESCE(SUM(CASE WHEN cf.nome ILIKE '%material%' OR cf.nome ILIKE '%insumo%' OR cf.nome ILIKE '%manutenção%' OR cf.nome ILIKE '%frete%' THEN COALESCE(cp.valor_pago, 0) ELSE 0 END), 0),
    COALESCE(SUM(CASE WHEN cf.nome ILIKE '%salário%' OR cf.nome ILIKE '%pessoal%' OR cf.nome ILIKE '%folha%' OR cf.nome ILIKE '%benefício%' THEN COALESCE(cp.valor_pago, 0) ELSE 0 END), 0),
    COALESCE(SUM(CASE WHEN cf.nome ILIKE '%marketing%' OR cf.nome ILIKE '%publicidade%' THEN COALESCE(cp.valor_pago, 0) ELSE 0 END), 0),
    COALESCE(SUM(CASE WHEN cf.nome ILIKE '%imposto%' OR cf.nome ILIKE '%tributo%' OR cf.nome ILIKE '%taxa%' OR cf.nome ILIKE '%contador%' THEN COALESCE(cp.valor_pago, 0) ELSE 0 END), 0),
    COALESCE(SUM(CASE WHEN cf.nome NOT ILIKE '%aluguel%' AND cf.nome NOT ILIKE '%fixas%' AND cf.nome NOT ILIKE '%internet%' AND cf.nome NOT ILIKE '%energia%' AND cf.nome NOT ILIKE '%água%' AND cf.nome NOT ILIKE '%telefone%' AND cf.nome NOT ILIKE '%software%' AND cf.nome NOT ILIKE '%material%' AND cf.nome NOT ILIKE '%insumo%' AND cf.nome NOT ILIKE '%manutenção%' AND cf.nome NOT ILIKE '%frete%' AND cf.nome NOT ILIKE '%salário%' AND cf.nome NOT ILIKE '%pessoal%' AND cf.nome NOT ILIKE '%folha%' AND cf.nome NOT ILIKE '%benefício%' AND cf.nome NOT ILIKE '%marketing%' AND cf.nome NOT ILIKE '%publicidade%' AND cf.nome NOT ILIKE '%imposto%' AND cf.nome NOT ILIKE '%tributo%' AND cf.nome NOT ILIKE '%taxa%' AND cf.nome NOT ILIKE '%contador%' THEN COALESCE(cp.valor_pago, 0) ELSE 0 END), 0)
  INTO v_despesas_fixas, v_despesas_variaveis, v_despesas_pessoal, v_despesas_marketing, v_despesas_impostos, v_despesas_outras
  FROM contas_pagar cp
  LEFT JOIN categorias_financeiras cf ON cf.id = cp.categoria_id
  WHERE cp.status = 'pago'
    AND cp.data_pagamento::date BETWEEN p_data_inicio AND p_data_fim;

  v_result := jsonb_build_object(
    'periodo', jsonb_build_object('inicio', p_data_inicio, 'fim', p_data_fim),
    'receitas', jsonb_build_object(
      'servicos', v_receita_servicos,
      'produtos', v_receita_produtos,
      'assinaturas', v_receita_assinaturas,
      'total', v_receita_servicos + v_receita_produtos + v_receita_assinaturas
    ),
    'despesas', jsonb_build_object(
      'fixas', v_despesas_fixas,
      'variaveis', v_despesas_variaveis,
      'pessoal', v_despesas_pessoal,
      'marketing', v_despesas_marketing,
      'impostos', v_despesas_impostos,
      'outras', v_despesas_outras,
      'total', v_despesas_fixas + v_despesas_variaveis + v_despesas_pessoal + v_despesas_marketing + v_despesas_impostos + v_despesas_outras
    ),
    'resultado', jsonb_build_object(
      'lucro_bruto', (v_receita_servicos + v_receita_produtos + v_receita_assinaturas) - (v_despesas_fixas + v_despesas_variaveis),
      'lucro_operacional', (v_receita_servicos + v_receita_produtos + v_receita_assinaturas) - (v_despesas_fixas + v_despesas_variaveis + v_despesas_pessoal + v_despesas_marketing),
      'lucro_liquido', (v_receita_servicos + v_receita_produtos + v_receita_assinaturas) - (v_despesas_fixas + v_despesas_variaveis + v_despesas_pessoal + v_despesas_marketing + v_despesas_impostos + v_despesas_outras),
      'margem_bruta', CASE WHEN (v_receita_servicos + v_receita_produtos + v_receita_assinaturas) > 0 THEN ROUND(((v_receita_servicos + v_receita_produtos + v_receita_assinaturas - v_despesas_fixas - v_despesas_variaveis) / (v_receita_servicos + v_receita_produtos + v_receita_assinaturas)) * 100, 1) ELSE 0 END,
      'margem_liquida', CASE WHEN (v_receita_servicos + v_receita_produtos + v_receita_assinaturas) > 0 THEN ROUND(((v_receita_servicos + v_receita_produtos + v_receita_assinaturas - v_despesas_fixas - v_despesas_variaveis - v_despesas_pessoal - v_despesas_marketing - v_despesas_impostos - v_despesas_outras) / (v_receita_servicos + v_receita_produtos + v_receita_assinaturas)) * 100, 1) ELSE 0 END
    )
  );

  RETURN v_result;
END;
$$;

-- Fluxo de Caixa function (últimos N meses)
CREATE OR REPLACE FUNCTION public.get_fluxo_caixa(p_meses INTEGER DEFAULT 6)
RETURNS JSONB
LANGUAGE plpgsql
STABLE SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_result JSONB := '[]'::JSONB;
  v_mes RECORD;
  v_receita_servicos NUMERIC;
  v_receita_produtos NUMERIC;
  v_despesas NUMERIC;
  v_saldo_acumulado NUMERIC := 0;
BEGIN
  FOR v_mes IN
    SELECT
      date_trunc('month', d)::date AS inicio,
      (date_trunc('month', d) + interval '1 month' - interval '1 day')::date AS fim,
      to_char(d, 'Mon/YY') AS label
    FROM generate_series(
      date_trunc('month', CURRENT_DATE - (p_meses || ' months')::interval),
      date_trunc('month', CURRENT_DATE),
      '1 month'
    ) AS d
  LOOP
    -- Receitas serviços
    SELECT COALESCE(SUM(s.preco), 0) INTO v_receita_servicos
    FROM agendamentos a
    JOIN servicos s ON s.nome = a.servico
    WHERE a.status IN ('concluido', 'realizado')
      AND a.data_hora::date BETWEEN v_mes.inicio AND v_mes.fim;

    -- Receitas produtos
    SELECT COALESCE(SUM(p.total), 0) INTO v_receita_produtos
    FROM pedidos p
    WHERE p.status != 'cancelado'
      AND p.created_at::date BETWEEN v_mes.inicio AND v_mes.fim;

    -- Despesas pagas
    SELECT COALESCE(SUM(cp.valor_pago), 0) INTO v_despesas
    FROM contas_pagar cp
    WHERE cp.status = 'pago'
      AND cp.data_pagamento::date BETWEEN v_mes.inicio AND v_mes.fim;

    v_saldo_acumulado := v_saldo_acumulado + (v_receita_servicos + v_receita_produtos) - v_despesas;

    v_result := v_result || jsonb_build_object(
      'mes', v_mes.label,
      'entradas', v_receita_servicos + v_receita_produtos,
      'saidas', v_despesas,
      'saldo_mes', (v_receita_servicos + v_receita_produtos) - v_despesas,
      'saldo_acumulado', v_saldo_acumulado
    );
  END LOOP;

  RETURN v_result;
END;
$$;
