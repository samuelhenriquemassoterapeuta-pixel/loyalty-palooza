
-- Trigger function to credit cashback when an appointment is completed
CREATE OR REPLACE FUNCTION public.credit_cashback_on_agendamento()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  v_servico_record RECORD;
  v_cashback_amount NUMERIC;
BEGIN
  -- Only process when status changes to 'concluido'
  IF NEW.status = 'concluido' AND (OLD.status IS NULL OR OLD.status != 'concluido') THEN
    -- Find the service and its cashback percentage
    SELECT s.preco, s.cashback_percentual, s.nome
    INTO v_servico_record
    FROM public.servicos s
    WHERE s.nome = NEW.servico
    LIMIT 1;

    -- If service found and has cashback
    IF v_servico_record IS NOT NULL AND COALESCE(v_servico_record.cashback_percentual, 0) > 0 THEN
      v_cashback_amount := v_servico_record.preco * v_servico_record.cashback_percentual / 100;

      -- Create cashback transaction
      INSERT INTO public.transacoes (user_id, tipo, valor, descricao, referencia_id)
      VALUES (
        NEW.user_id,
        'cashback',
        v_cashback_amount,
        'Cashback da sessão de ' || NEW.servico,
        NEW.id
      );

      -- Create notification
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

-- Create trigger on agendamentos table for status updates
CREATE TRIGGER credit_cashback_on_agendamento_completed
AFTER UPDATE ON public.agendamentos
FOR EACH ROW
EXECUTE FUNCTION public.credit_cashback_on_agendamento();
