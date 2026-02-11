
-- Create a validation trigger that restricts client-side transaction creation
-- Only allows negative "uso_cashback" transactions from clients
-- Positive cashback and system transactions are created by SECURITY DEFINER triggers/functions
CREATE OR REPLACE FUNCTION public.validate_transaction_insert()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- System-level operations (triggers, SECURITY DEFINER functions) run without auth.uid()
  -- or with service_role. Allow them unconditionally.
  -- When auth.uid() IS NULL, it means the insert comes from a trigger or service_role context.
  IF auth.uid() IS NULL THEN
    RETURN NEW;
  END IF;

  -- For client-side inserts (authenticated users), only allow:
  -- 1. tipo = 'uso_cashback' with negative values (spending cashback)
  IF NEW.tipo = 'uso_cashback' AND NEW.valor < 0 THEN
    RETURN NEW;
  END IF;

  -- Block all other client-side transaction types
  RAISE EXCEPTION 'Operação não permitida: apenas uso de cashback é permitido pelo cliente.'
    USING ERRCODE = 'insufficient_privilege';
END;
$$;

-- Attach the trigger BEFORE INSERT
CREATE TRIGGER validate_transaction_before_insert
  BEFORE INSERT ON public.transacoes
  FOR EACH ROW
  EXECUTE FUNCTION public.validate_transaction_insert();
