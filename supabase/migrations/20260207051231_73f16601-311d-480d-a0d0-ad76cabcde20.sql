
-- Function to process referral cashback when a referred user makes their first purchase
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
  -- Only process non-cancelled orders
  IF NEW.status = 'cancelado' THEN
    RETURN NEW;
  END IF;

  -- Check if this is the user's first order (excluding the current one)
  SELECT COUNT(*) INTO v_previous_orders
  FROM public.pedidos
  WHERE user_id = NEW.user_id
    AND id != NEW.id
    AND status != 'cancelado';

  -- Only proceed if this is the first purchase
  IF v_previous_orders > 0 THEN
    RETURN NEW;
  END IF;

  -- Find pending referral for this user
  SELECT * INTO v_indicacao
  FROM public.indicacoes
  WHERE indicado_id = NEW.user_id
    AND status = 'pendente'
  LIMIT 1;

  -- If no pending referral found, exit
  IF v_indicacao IS NULL THEN
    RETURN NEW;
  END IF;

  -- Define cashback amount (R$ 10 default, or use stored value if > 0)
  v_cashback_valor := CASE 
    WHEN v_indicacao.cashback_valor > 0 THEN v_indicacao.cashback_valor
    ELSE 10.00
  END;

  -- Credit cashback to the referrer
  INSERT INTO public.transacoes (user_id, tipo, valor, descricao, referencia_id)
  VALUES (
    v_indicacao.indicador_id,
    'cashback',
    v_cashback_valor,
    'Cashback por indicação — seu amigo fez a primeira compra! 🎉',
    v_indicacao.id
  );

  -- Credit a welcome cashback to the referred user too (R$ 5)
  INSERT INTO public.transacoes (user_id, tipo, valor, descricao, referencia_id)
  VALUES (
    v_indicacao.indicado_id,
    'cashback',
    5.00,
    'Bônus de boas-vindas pela indicação! 🌿',
    v_indicacao.id
  );

  -- Update referral status
  UPDATE public.indicacoes
  SET status = 'processado',
      processado_at = now(),
      cashback_valor = v_cashback_valor
  WHERE id = v_indicacao.id;

  -- Notify the referrer
  INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
  VALUES (
    v_indicacao.indicador_id,
    'Indicação convertida! 🎉',
    'Seu amigo fez a primeira compra e você ganhou R$ ' || REPLACE(TO_CHAR(v_cashback_valor, 'FM999990D00'), '.', ',') || ' de cashback!',
    'cashback'
  );

  -- Notify the referred user
  INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
  VALUES (
    v_indicacao.indicado_id,
    'Bônus de boas-vindas! 🌿',
    'Você ganhou R$ 5,00 de cashback por ter sido indicado. Aproveite!',
    'cashback'
  );

  RETURN NEW;
END;
$function$;

-- Create trigger on pedidos for new orders
CREATE TRIGGER process_referral_on_first_purchase
AFTER INSERT ON public.pedidos
FOR EACH ROW
EXECUTE FUNCTION public.process_referral_on_first_purchase();
