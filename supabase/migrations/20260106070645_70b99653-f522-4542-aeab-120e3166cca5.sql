-- Função para creditar cashback automaticamente após pedido
CREATE OR REPLACE FUNCTION public.credit_cashback_on_order()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  total_cashback NUMERIC := 0;
  item RECORD;
BEGIN
  -- Calcular cashback total do pedido
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

  -- Se houver cashback, criar transação e notificação
  IF total_cashback > 0 THEN
    -- Criar transação de cashback
    INSERT INTO public.transacoes (user_id, tipo, valor, descricao, referencia_id)
    VALUES (
      NEW.user_id,
      'cashback',
      total_cashback,
      'Cashback do pedido #' || LEFT(NEW.id::text, 8),
      NEW.id
    );

    -- Criar notificação
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
$$;

-- Trigger para executar após inserção de pedido
DROP TRIGGER IF EXISTS credit_cashback_after_order ON public.pedidos;
CREATE TRIGGER credit_cashback_after_order
  AFTER INSERT ON public.pedidos
  FOR EACH ROW
  EXECUTE FUNCTION public.credit_cashback_on_order();