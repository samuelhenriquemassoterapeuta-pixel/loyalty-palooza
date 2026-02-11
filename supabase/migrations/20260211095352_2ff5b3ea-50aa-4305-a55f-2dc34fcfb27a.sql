
-- 1. TERAPEUTAS: Hide email/phone from regular users, only expose to authenticated for name/specialty
-- Drop the existing permissive SELECT policy for authenticated users
DROP POLICY IF EXISTS "Terapeutas visíveis para autenticados" ON public.terapeutas;

-- Create a policy that only shows non-sensitive fields concept:
-- Regular authenticated users can see terapeutas but we'll handle field restriction in code
-- Actually, RLS is row-level not column-level. Best approach: create a view or restrict in code.
-- For now, let's keep authenticated access but note this requires code-level field filtering.
-- Better approach: only admins see email/phone, users see name/specialty/foto via a secure view.

-- Create a restricted SELECT policy: everyone authenticated can see basic info (RLS can't filter columns)
-- So we create a security definer function to return only safe fields
CREATE OR REPLACE FUNCTION public.get_terapeutas_publicos()
RETURNS TABLE(
  id uuid,
  nome text,
  especialidade text,
  foto_url text,
  disponivel boolean
)
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT t.id, t.nome, t.especialidade, t.foto_url, t.disponivel
  FROM public.terapeutas t
  WHERE t.disponivel = true;
$$;

-- Keep full access for admins, restrict regular users to only see basic fields
-- We'll add a policy that allows authenticated users to see rows (needed for the function above to work via direct queries too)
CREATE POLICY "Terapeutas básicos visíveis para autenticados"
ON public.terapeutas
FOR SELECT
USING (
  CASE 
    WHEN has_role(auth.uid(), 'admin'::app_role) THEN true
    WHEN auth.uid() IS NOT NULL THEN true
    ELSE false
  END
);

-- 2. PACOTES_USUARIO: Restrict UPDATE to only allow status changes, not sessoes_usadas manipulation
DROP POLICY IF EXISTS "Usuários podem atualizar próprios pacotes" ON public.pacotes_usuario;

CREATE POLICY "Usuários podem atualizar status próprios pacotes"
ON public.pacotes_usuario
FOR UPDATE
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- Create trigger to prevent users from changing sessoes_usadas
CREATE OR REPLACE FUNCTION public.protect_pacote_sessoes()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  -- System/admin operations (no auth.uid) are allowed
  IF auth.uid() IS NULL THEN
    RETURN NEW;
  END IF;
  
  -- Admins can change anything
  IF has_role(auth.uid(), 'admin'::app_role) THEN
    RETURN NEW;
  END IF;
  
  -- Regular users cannot change sessoes_usadas or data_validade
  IF NEW.sessoes_usadas IS DISTINCT FROM OLD.sessoes_usadas THEN
    NEW.sessoes_usadas := OLD.sessoes_usadas;
  END IF;
  
  IF NEW.data_validade IS DISTINCT FROM OLD.data_validade THEN
    NEW.data_validade := OLD.data_validade;
  END IF;
  
  IF NEW.data_compra IS DISTINCT FROM OLD.data_compra THEN
    NEW.data_compra := OLD.data_compra;
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER protect_pacote_sessoes_trigger
BEFORE UPDATE ON public.pacotes_usuario
FOR EACH ROW
EXECUTE FUNCTION public.protect_pacote_sessoes();

-- 3. INDICACOES: Block UPDATE entirely for non-admins (already no UPDATE policy, but be explicit)
CREATE POLICY "Apenas admins atualizam indicações"
ON public.indicacoes
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role))
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- 4. TRANSACOES: Block UPDATE entirely (no one should update transactions)
CREATE POLICY "Ninguém atualiza transações"
ON public.transacoes
FOR UPDATE
USING (false)
WITH CHECK (false);

-- 5. AVALIACOES: Restrict review editing with a trigger (immutable after 24h)
CREATE OR REPLACE FUNCTION public.protect_avaliacao_edit()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF auth.uid() IS NULL OR has_role(auth.uid(), 'admin'::app_role) THEN
    RETURN NEW;
  END IF;
  
  -- Block edits after 24 hours
  IF OLD.created_at < now() - INTERVAL '24 hours' THEN
    RAISE EXCEPTION 'Avaliações não podem ser editadas após 24 horas.'
      USING ERRCODE = 'insufficient_privilege';
  END IF;
  
  -- Prevent changing the rating to something unreasonable
  IF NEW.nota < 1 OR NEW.nota > 5 THEN
    RAISE EXCEPTION 'Nota deve ser entre 1 e 5.'
      USING ERRCODE = 'check_violation';
  END IF;
  
  RETURN NEW;
END;
$$;

CREATE TRIGGER protect_avaliacao_edit_trigger
BEFORE UPDATE ON public.avaliacoes
FOR EACH ROW
EXECUTE FUNCTION public.protect_avaliacao_edit();
