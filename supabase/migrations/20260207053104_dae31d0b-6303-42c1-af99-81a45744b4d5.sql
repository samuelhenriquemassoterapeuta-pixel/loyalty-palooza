
-- Add expiration column to transacoes
ALTER TABLE public.transacoes
ADD COLUMN expira_em TIMESTAMP WITH TIME ZONE DEFAULT NULL;

-- Set expiration for existing cashback transactions (90 days from creation)
UPDATE public.transacoes
SET expira_em = created_at + INTERVAL '90 days'
WHERE tipo = 'cashback' AND expira_em IS NULL;

-- Create index for efficient expiration queries
CREATE INDEX idx_transacoes_expira_em ON public.transacoes (expira_em)
WHERE expira_em IS NOT NULL AND tipo = 'cashback';

-- Update credit_cashback_on_order to set expiration
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

  total_cashback := ROUND(total_cashback * v_multiplier, 2);

  IF total_cashback > 0 THEN
    INSERT INTO public.transacoes (user_id, tipo, valor, descricao, referencia_id, expira_em)
    VALUES (
      NEW.user_id,
      'cashback',
      total_cashback,
      'Cashback do pedido #' || LEFT(NEW.id::text, 8),
      NEW.id,
      now() + INTERVAL '90 days'
    );

    INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
    VALUES (
      NEW.user_id,
      'Cashback creditado! 💰',
      'Você recebeu R$ ' || REPLACE(TO_CHAR(total_cashback, 'FM999990D00'), '.', ',') || ' de cashback pela sua compra. Válido por 90 dias.',
      'cashback'
    );
  END IF;

  RETURN NEW;
END;
$function$;

-- Update credit_cashback_on_agendamento to set expiration
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
  IF NEW.status = 'concluido' AND (OLD.status IS NULL OR OLD.status != 'concluido') THEN
    SELECT gt.tier_multiplier INTO v_multiplier
    FROM public.get_user_tier(NEW.user_id) gt;

    SELECT s.preco, s.cashback_percentual, s.nome
    INTO v_servico_record
    FROM public.servicos s
    WHERE s.nome = NEW.servico
    LIMIT 1;

    IF v_servico_record IS NOT NULL AND COALESCE(v_servico_record.cashback_percentual, 0) > 0 THEN
      v_cashback_amount := ROUND(v_servico_record.preco * v_servico_record.cashback_percentual / 100 * v_multiplier, 2);

      INSERT INTO public.transacoes (user_id, tipo, valor, descricao, referencia_id, expira_em)
      VALUES (
        NEW.user_id,
        'cashback',
        v_cashback_amount,
        'Cashback da sessão de ' || NEW.servico,
        NEW.id,
        now() + INTERVAL '90 days'
      );

      INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
      VALUES (
        NEW.user_id,
        'Cashback creditado! 💆',
        'Você recebeu R$ ' || REPLACE(TO_CHAR(v_cashback_amount, 'FM999990D00'), '.', ',') || ' de cashback pela sua sessão de ' || NEW.servico || '. Válido por 90 dias.',
        'cashback'
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$function$;

-- Update process_referral_on_first_purchase to set expiration on referral cashback
CREATE OR REPLACE FUNCTION public.process_referral_on_first_purchase()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_indicacao RECORD;
  v_previous_orders INTEGER;
  v_cashback_valor NUMERIC;
BEGIN
  IF NEW.status = 'cancelado' THEN
    RETURN NEW;
  END IF;

  SELECT COUNT(*) INTO v_previous_orders
  FROM public.pedidos
  WHERE user_id = NEW.user_id
    AND id != NEW.id
    AND status != 'cancelado';

  IF v_previous_orders > 0 THEN
    RETURN NEW;
  END IF;

  SELECT * INTO v_indicacao
  FROM public.indicacoes
  WHERE indicado_id = NEW.user_id
    AND status = 'pendente'
  LIMIT 1;

  IF v_indicacao IS NULL THEN
    RETURN NEW;
  END IF;

  v_cashback_valor := CASE 
    WHEN v_indicacao.cashback_valor > 0 THEN v_indicacao.cashback_valor
    ELSE 10.00
  END;

  INSERT INTO public.transacoes (user_id, tipo, valor, descricao, referencia_id, expira_em)
  VALUES (
    v_indicacao.indicador_id,
    'cashback',
    v_cashback_valor,
    'Cashback por indicação — seu amigo fez a primeira compra! 🎉',
    v_indicacao.id,
    now() + INTERVAL '90 days'
  );

  INSERT INTO public.transacoes (user_id, tipo, valor, descricao, referencia_id, expira_em)
  VALUES (
    v_indicacao.indicado_id,
    'cashback',
    5.00,
    'Bônus de boas-vindas pela indicação! 🌿',
    v_indicacao.id,
    now() + INTERVAL '90 days'
  );

  UPDATE public.indicacoes
  SET status = 'processado',
      processado_at = now(),
      cashback_valor = v_cashback_valor
  WHERE id = v_indicacao.id;

  INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
  VALUES (
    v_indicacao.indicador_id,
    'Indicação convertida! 🎉',
    'Seu amigo fez a primeira compra e você ganhou R$ ' || REPLACE(TO_CHAR(v_cashback_valor, 'FM999990D00'), '.', ',') || ' de cashback! Válido por 90 dias.',
    'cashback'
  );

  INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
  VALUES (
    v_indicacao.indicado_id,
    'Bônus de boas-vindas! 🌿',
    'Você ganhou R$ 5,00 de cashback por ter sido indicado. Válido por 90 dias!',
    'cashback'
  );

  RETURN NEW;
END;
$function$;

-- Function to process expired cashback (called by edge function)
CREATE OR REPLACE FUNCTION public.process_expired_cashback()
RETURNS TABLE(
  user_id UUID,
  total_expirado NUMERIC,
  transacoes_expiradas INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_user RECORD;
  v_total NUMERIC;
  v_count INTEGER;
BEGIN
  -- Find users with expired cashback that hasn't been processed
  FOR v_user IN
    SELECT DISTINCT t.user_id
    FROM public.transacoes t
    WHERE t.tipo = 'cashback'
      AND t.expira_em IS NOT NULL
      AND t.expira_em <= now()
      AND NOT EXISTS (
        SELECT 1 FROM public.transacoes t2
        WHERE t2.referencia_id = t.id
          AND t2.tipo = 'cashback_expirado'
      )
  LOOP
    -- Calculate total expired for this user
    SELECT COUNT(*), COALESCE(SUM(t.valor), 0)
    INTO v_count, v_total
    FROM public.transacoes t
    WHERE t.user_id = v_user.user_id
      AND t.tipo = 'cashback'
      AND t.expira_em IS NOT NULL
      AND t.expira_em <= now()
      AND NOT EXISTS (
        SELECT 1 FROM public.transacoes t2
        WHERE t2.referencia_id = t.id
          AND t2.tipo = 'cashback_expirado'
      );

    IF v_total > 0 THEN
      -- Create expiration debit transactions for each expired cashback
      INSERT INTO public.transacoes (user_id, tipo, valor, descricao, referencia_id)
      SELECT 
        t.user_id,
        'cashback_expirado',
        -t.valor,
        'Cashback expirado em ' || TO_CHAR(t.expira_em, 'DD/MM/YYYY'),
        t.id
      FROM public.transacoes t
      WHERE t.user_id = v_user.user_id
        AND t.tipo = 'cashback'
        AND t.expira_em IS NOT NULL
        AND t.expira_em <= now()
        AND NOT EXISTS (
          SELECT 1 FROM public.transacoes t2
          WHERE t2.referencia_id = t.id
            AND t2.tipo = 'cashback_expirado'
        );

      -- Notify the user
      INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
      VALUES (
        v_user.user_id,
        'Cashback expirado ⏰',
        'R$ ' || REPLACE(TO_CHAR(v_total, 'FM999990D00'), '.', ',') || ' em cashback expiraram. Lembre-se de usar seus créditos dentro de 90 dias!',
        'cashback'
      );

      user_id := v_user.user_id;
      total_expirado := v_total;
      transacoes_expiradas := v_count;
      RETURN NEXT;
    END IF;
  END LOOP;
END;
$function$;

-- Function to notify users about cashback expiring soon (within 7 days)
CREATE OR REPLACE FUNCTION public.notify_expiring_cashback()
RETURNS TABLE(
  user_id UUID,
  total_expirando NUMERIC,
  dias_restantes INTEGER
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_user RECORD;
  v_total NUMERIC;
  v_min_days INTEGER;
BEGIN
  FOR v_user IN
    SELECT DISTINCT t.user_id
    FROM public.transacoes t
    WHERE t.tipo = 'cashback'
      AND t.expira_em IS NOT NULL
      AND t.expira_em > now()
      AND t.expira_em <= now() + INTERVAL '7 days'
      AND NOT EXISTS (
        SELECT 1 FROM public.transacoes t2
        WHERE t2.referencia_id = t.id
          AND t2.tipo = 'cashback_expirado'
      )
      -- Don't send duplicate notifications (check if already notified today)
      AND NOT EXISTS (
        SELECT 1 FROM public.notificacoes n
        WHERE n.user_id = t.user_id
          AND n.tipo = 'cashback'
          AND n.titulo LIKE '%expirando%'
          AND n.created_at > now() - INTERVAL '1 day'
      )
  LOOP
    SELECT COALESCE(SUM(t.valor), 0), MIN(EXTRACT(DAY FROM (t.expira_em - now()))::INTEGER)
    INTO v_total, v_min_days
    FROM public.transacoes t
    WHERE t.user_id = v_user.user_id
      AND t.tipo = 'cashback'
      AND t.expira_em IS NOT NULL
      AND t.expira_em > now()
      AND t.expira_em <= now() + INTERVAL '7 days'
      AND NOT EXISTS (
        SELECT 1 FROM public.transacoes t2
        WHERE t2.referencia_id = t.id
          AND t2.tipo = 'cashback_expirado'
      );

    IF v_total > 0 THEN
      INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
      VALUES (
        v_user.user_id,
        'Cashback expirando em breve! ⚠️',
        'Você tem R$ ' || REPLACE(TO_CHAR(v_total, 'FM999990D00'), '.', ',') || ' em cashback que expira em ' || v_min_days || ' dia(s). Use antes que expire!',
        'cashback'
      );

      user_id := v_user.user_id;
      total_expirando := v_total;
      dias_restantes := v_min_days;
      RETURN NEXT;
    END IF;
  END LOOP;
END;
$function$;
