
-- Trigger to credit cashback when a gift card is redeemed
CREATE OR REPLACE FUNCTION public.credit_vale_presente_on_redeem()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Only trigger when status changes to 'usado'
  IF NEW.status = 'usado' AND OLD.status = 'ativo' AND NEW.usado_por IS NOT NULL THEN
    -- Credit the value as cashback to the redeemer
    INSERT INTO public.transacoes (user_id, tipo, valor, descricao, referencia_id, expira_em)
    VALUES (
      NEW.usado_por,
      'cashback',
      NEW.valor,
      'Vale presente resgatado — código ' || NEW.codigo || ' 🎁',
      NEW.id,
      now() + INTERVAL '180 days'
    );

    -- Notify redeemer
    INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
    VALUES (
      NEW.usado_por,
      'Vale Presente resgatado! 🎁',
      'Você resgatou R$ ' || REPLACE(TO_CHAR(NEW.valor, 'FM999990D00'), '.', ',') || ' de vale presente. O crédito foi adicionado à sua carteira!',
      'cashback'
    );

    -- Notify buyer
    INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
    VALUES (
      NEW.comprador_id,
      'Presente entregue! 💚',
      'O vale presente de R$ ' || REPLACE(TO_CHAR(NEW.valor, 'FM999990D00'), '.', ',') || ' para ' || NEW.destinatario_nome || ' foi resgatado com sucesso!',
      'cashback'
    );
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER on_vale_presente_redeem
  BEFORE UPDATE ON public.vale_presentes
  FOR EACH ROW
  EXECUTE FUNCTION public.credit_vale_presente_on_redeem();
