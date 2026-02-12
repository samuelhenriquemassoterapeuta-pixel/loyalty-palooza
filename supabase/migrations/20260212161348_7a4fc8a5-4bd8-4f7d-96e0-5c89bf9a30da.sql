
-- 1. Add new columns for experiences and scheduled delivery
ALTER TABLE public.vale_presentes
ADD COLUMN IF NOT EXISTS tipo text NOT NULL DEFAULT 'monetario',
ADD COLUMN IF NOT EXISTS experiencia_nome text,
ADD COLUMN IF NOT EXISTS experiencia_descricao text,
ADD COLUMN IF NOT EXISTS servicos_inclusos jsonb DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS data_entrega_agendada date;

-- 2. Create server-side redemption function (fixes RLS bug)
CREATE OR REPLACE FUNCTION public.resgatar_vale_presente(p_codigo text)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_vale RECORD;
  v_user_id uuid;
BEGIN
  v_user_id := auth.uid();
  IF v_user_id IS NULL THEN
    RAISE EXCEPTION 'Usuário não autenticado';
  END IF;

  SELECT * INTO v_vale
  FROM public.vale_presentes
  WHERE codigo = UPPER(TRIM(p_codigo))
    AND status = 'ativo'
  LIMIT 1;

  IF v_vale IS NULL THEN
    RAISE EXCEPTION 'Vale presente não encontrado ou já utilizado.';
  END IF;

  IF v_vale.validade < CURRENT_DATE THEN
    RAISE EXCEPTION 'Este vale presente está expirado.';
  END IF;

  IF v_vale.comprador_id = v_user_id THEN
    RAISE EXCEPTION 'Você não pode resgatar um vale que você mesmo comprou.';
  END IF;

  IF v_vale.data_entrega_agendada IS NOT NULL AND v_vale.data_entrega_agendada > CURRENT_DATE THEN
    RAISE EXCEPTION 'Este vale presente ainda não está disponível para resgate.';
  END IF;

  UPDATE public.vale_presentes
  SET status = 'usado',
      usado_em = now(),
      usado_por = v_user_id
  WHERE id = v_vale.id;

  RETURN jsonb_build_object(
    'id', v_vale.id,
    'valor', v_vale.valor,
    'codigo', v_vale.codigo,
    'destinatario_nome', v_vale.destinatario_nome,
    'mensagem', v_vale.mensagem,
    'tema', v_vale.tema,
    'tipo', v_vale.tipo,
    'experiencia_nome', v_vale.experiencia_nome
  );
END;
$$;

-- 3. Function to process expired gift cards
CREATE OR REPLACE FUNCTION public.process_expired_vales()
RETURNS TABLE(vale_id uuid, codigo text, valor numeric)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  -- Update expired vales and notify buyers
  RETURN QUERY
  WITH expired AS (
    UPDATE public.vale_presentes
    SET status = 'expirado'
    WHERE status = 'ativo'
      AND validade < CURRENT_DATE
    RETURNING id, codigo, valor, comprador_id, destinatario_nome
  )
  SELECT e.id AS vale_id, e.codigo, e.valor
  FROM expired e;

  -- Notify buyers of expired vales
  INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
  SELECT
    e.comprador_id,
    'Vale presente expirado ⏰',
    'O vale presente de R$ ' || REPLACE(TO_CHAR(e.valor, 'FM999990D00'), '.', ',') || ' para ' || e.destinatario_nome || ' expirou sem ser utilizado.',
    'cashback'
  FROM (
    SELECT comprador_id, valor, destinatario_nome
    FROM public.vale_presentes
    WHERE status = 'expirado'
      AND validade = CURRENT_DATE - INTERVAL '1 day'
  ) e;
END;
$$;
