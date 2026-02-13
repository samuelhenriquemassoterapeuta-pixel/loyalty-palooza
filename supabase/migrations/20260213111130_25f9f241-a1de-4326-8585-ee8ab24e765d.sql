
-- RPC function to get therapist data for virtual business card (public access)
CREATE OR REPLACE FUNCTION public.get_terapeuta_cartao(terapeuta_uuid uuid)
RETURNS TABLE (
  id uuid,
  nome text,
  especialidade text,
  foto_url text,
  email text,
  telefone text,
  disponivel boolean,
  media_avaliacoes numeric,
  total_avaliacoes bigint
)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  RETURN QUERY
  SELECT
    t.id,
    t.nome,
    t.especialidade,
    t.foto_url,
    t.email,
    t.telefone,
    t.disponivel,
    COALESCE(AVG(a.nota)::numeric, 0) AS media_avaliacoes,
    COUNT(a.id) AS total_avaliacoes
  FROM terapeutas t
  LEFT JOIN agendamentos ag ON ag.terapeuta_id = t.id
  LEFT JOIN avaliacoes a ON a.agendamento_id = ag.id
  WHERE t.id = terapeuta_uuid
  GROUP BY t.id, t.nome, t.especialidade, t.foto_url, t.email, t.telefone, t.disponivel;
END;
$$;
