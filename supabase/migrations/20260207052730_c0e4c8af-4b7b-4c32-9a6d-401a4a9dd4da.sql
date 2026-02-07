
-- Function to get a user's loyalty tier based on total spending
CREATE OR REPLACE FUNCTION public.get_user_tier(p_user_id UUID)
RETURNS TABLE(
  tier_name TEXT,
  tier_multiplier NUMERIC,
  total_gasto NUMERIC,
  proximo_tier_nome TEXT,
  proximo_tier_limite NUMERIC,
  progresso_percentual NUMERIC
)
LANGUAGE plpgsql
STABLE
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_total_gasto NUMERIC;
BEGIN
  -- Calculate total spent (sum of negative transactions = purchases/debits)
  SELECT COALESCE(ABS(SUM(t.valor)), 0)
  INTO v_total_gasto
  FROM public.transacoes t
  WHERE t.user_id = p_user_id
    AND t.valor < 0;

  -- Also count completed appointments value
  v_total_gasto := v_total_gasto + COALESCE((
    SELECT SUM(s.preco)
    FROM public.agendamentos a
    JOIN public.servicos s ON s.nome = a.servico
    WHERE a.user_id = p_user_id
      AND a.status = 'concluido'
  ), 0);

  -- Determine tier based on total spent
  IF v_total_gasto >= 500 THEN
    tier_name := 'Ouro';
    tier_multiplier := 2.0;
    total_gasto := v_total_gasto;
    proximo_tier_nome := NULL;
    proximo_tier_limite := NULL;
    progresso_percentual := 100;
  ELSIF v_total_gasto >= 200 THEN
    tier_name := 'Prata';
    tier_multiplier := 1.5;
    total_gasto := v_total_gasto;
    proximo_tier_nome := 'Ouro';
    proximo_tier_limite := 500;
    progresso_percentual := ROUND(((v_total_gasto - 200) / (500 - 200)) * 100, 1);
  ELSE
    tier_name := 'Bronze';
    tier_multiplier := 1.0;
    total_gasto := v_total_gasto;
    proximo_tier_nome := 'Prata';
    proximo_tier_limite := 200;
    progresso_percentual := ROUND((v_total_gasto / 200) * 100, 1);
  END IF;

  RETURN NEXT;
END;
$function$;

-- Update cashback on order trigger to apply tier multiplier
CREATE OR REPLACE FUNCTION public.credit_cashback_on_order()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  total_cashback NUMERIC := 0;
  item RECORD;
  v_multiplier NUMERIC := 1.0;
BEGIN
  -- Get user's tier multiplier
  SELECT gt.tier_multiplier INTO v_multiplier
  FROM public.get_user_tier(NEW.user_id) gt;

  -- Calculate base cashback from order items
  FOR item IN 
    SELECT 
      pi.quantidade,
      pi.preco_unitario,
      COALESCE(p.cashback_percentual, 0) as cashback_percentual
    FROM pedido_itens pi
    JOIN produtos p ON p.id = pi.produto_id
    WHERE pi.pedido_id = NEW.id
  LOOP
    total_cashback := total_cashback + (item.preco_unitario * item.quantidade * item.cashback_percentual / 100);
  END LOOP;

  -- Apply tier multiplier
  total_cashback := ROUND(total_cashback * v_multiplier, 2);

  -- If there's cashback, create transaction and notification
  IF total_cashback > 0 THEN
    INSERT INTO public.transacoes (user_id, tipo, valor, descricao, referencia_id)
    VALUES (
      NEW.user_id,
      'cashback',
      total_cashback,
      'Cashback do pedido #' || LEFT(NEW.id::text, 8),
      NEW.id
    );

    INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
    VALUES (
      NEW.user_id,
      'Cashback creditado! 💰',
      'Você recebeu R$ ' || REPLACE(TO_CHAR(total_cashback, 'FM999990D00'), '.', ',') || ' de cashback pela sua compra.',
      'cashback'
    );
  END IF;

  RETURN NEW;
END;
$function$;

-- Update cashback on agendamento trigger to apply tier multiplier
CREATE OR REPLACE FUNCTION public.credit_cashback_on_agendamento()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_servico_record RECORD;
  v_cashback_amount NUMERIC;
  v_multiplier NUMERIC := 1.0;
BEGIN
  -- Only process when status changes to 'concluido'
  IF NEW.status = 'concluido' AND (OLD.status IS NULL OR OLD.status != 'concluido') THEN
    -- Get user's tier multiplier
    SELECT gt.tier_multiplier INTO v_multiplier
    FROM public.get_user_tier(NEW.user_id) gt;

    -- Find the service and its cashback percentage
    SELECT s.preco, s.cashback_percentual, s.nome
    INTO v_servico_record
    FROM public.servicos s
    WHERE s.nome = NEW.servico
    LIMIT 1;

    -- If service found and has cashback
    IF v_servico_record IS NOT NULL AND COALESCE(v_servico_record.cashback_percentual, 0) > 0 THEN
      v_cashback_amount := ROUND(v_servico_record.preco * v_servico_record.cashback_percentual / 100 * v_multiplier, 2);

      INSERT INTO public.transacoes (user_id, tipo, valor, descricao, referencia_id)
      VALUES (
        NEW.user_id,
        'cashback',
        v_cashback_amount,
        'Cashback da sessão de ' || NEW.servico,
        NEW.id
      );

      INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
      VALUES (
        NEW.user_id,
        'Cashback creditado! 💆',
        'Você recebeu R$ ' || REPLACE(TO_CHAR(v_cashback_amount, 'FM999990D00'), '.', ',') || ' de cashback pela sua sessão de ' || NEW.servico || '.',
        'cashback'
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;
