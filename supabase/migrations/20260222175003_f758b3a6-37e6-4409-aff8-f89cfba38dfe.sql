
-- Atomic transfer function to prevent race conditions
-- Uses FOR UPDATE to lock sender's transactions during balance check
CREATE OR REPLACE FUNCTION public.transferir_saldo(
  p_remetente_id UUID,
  p_destinatario_id UUID,
  p_valor NUMERIC,
  p_remetente_nome TEXT,
  p_destinatario_nome TEXT
)
RETURNS JSONB
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_saldo NUMERIC;
BEGIN
  -- Validate inputs
  IF p_valor <= 0 THEN
    RAISE EXCEPTION 'Valor deve ser positivo';
  END IF;

  IF p_remetente_id = p_destinatario_id THEN
    RAISE EXCEPTION 'Não é possível transferir para si mesmo';
  END IF;

  -- Lock and calculate sender balance atomically using advisory lock
  -- This prevents two concurrent transfers from both passing the balance check
  PERFORM pg_advisory_xact_lock(hashtext(p_remetente_id::text));

  SELECT COALESCE(SUM(valor), 0) INTO v_saldo
  FROM public.transacoes
  WHERE user_id = p_remetente_id;

  IF v_saldo < p_valor THEN
    RAISE EXCEPTION 'Saldo insuficiente';
  END IF;

  -- Debit sender
  INSERT INTO public.transacoes (user_id, tipo, valor, descricao, referencia_id)
  VALUES (p_remetente_id, 'debito', -p_valor, 'Transferência para ' || p_destinatario_nome, p_destinatario_id);

  -- Credit receiver
  INSERT INTO public.transacoes (user_id, tipo, valor, descricao, referencia_id)
  VALUES (p_destinatario_id, 'credito', p_valor, 'Transferência recebida de ' || p_remetente_nome, p_remetente_id);

  -- Notify receiver
  INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
  VALUES (
    p_destinatario_id,
    'Transferência recebida! 💰',
    'Você recebeu R$ ' || REPLACE(TO_CHAR(p_valor, 'FM999990D00'), '.', ',') || ' de ' || p_remetente_nome,
    'transferencia'
  );

  RETURN jsonb_build_object('success', true, 'message', 'Transferência realizada com sucesso');
END;
$$;
