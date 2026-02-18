DROP FUNCTION IF EXISTS public.incrementar_voto_sugestao(uuid);

CREATE FUNCTION public.incrementar_voto_sugestao(sugestao_id uuid)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE sugestoes_playlist SET votos = votos + 1 WHERE id = sugestao_id;
END;
$$;