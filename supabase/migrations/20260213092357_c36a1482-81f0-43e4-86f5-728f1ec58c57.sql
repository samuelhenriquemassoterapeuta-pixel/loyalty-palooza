-- Trigger to enforce max 30% discount on partner coupons and block plans/packages
CREATE OR REPLACE FUNCTION public.validate_parceiro_cupom()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Enforce max 30% for percentage coupons
  IF NEW.tipo_desconto = 'percentual' AND NEW.valor_desconto > 30 THEN
    RAISE EXCEPTION 'Cupons de parceiro com desconto percentual não podem ultrapassar 30%%.';
  END IF;

  -- Enforce max R$50 for fixed value coupons
  IF NEW.tipo_desconto = 'valor_fixo' AND NEW.valor_desconto > 50 THEN
    RAISE EXCEPTION 'Cupons de parceiro com valor fixo não podem ultrapassar R$ 50,00.';
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_parceiro_cupom_limits
BEFORE INSERT OR UPDATE ON public.parceiro_cupons
FOR EACH ROW
EXECUTE FUNCTION public.validate_parceiro_cupom();