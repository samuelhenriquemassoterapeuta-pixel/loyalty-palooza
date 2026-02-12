
DROP FUNCTION IF EXISTS public.process_expired_vales();

CREATE OR REPLACE FUNCTION public.process_expired_vales()
RETURNS TABLE(vale_id uuid, vale_codigo text, vale_valor numeric)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Notify buyers of vales expiring today
  INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
  SELECT
    vp.comprador_id,
    'Vale presente expirado ⏰',
    'O vale presente de R$ ' || REPLACE(TO_CHAR(vp.valor, 'FM999990D00'), '.', ',') || ' para ' || vp.destinatario_nome || ' expirou sem ser utilizado.',
    'cashback'
  FROM public.vale_presentes vp
  WHERE vp.status = 'ativo'
    AND vp.validade < CURRENT_DATE;

  -- Update expired vales
  RETURN QUERY
  UPDATE public.vale_presentes
  SET status = 'expirado'
  WHERE status = 'ativo'
    AND validade < CURRENT_DATE
  RETURNING id AS vale_id, codigo AS vale_codigo, valor AS vale_valor;
END;
$$;
