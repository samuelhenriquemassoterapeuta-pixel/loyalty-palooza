-- Adicionar cashback_percentual aos produtos e serviços
ALTER TABLE public.produtos ADD COLUMN IF NOT EXISTS cashback_percentual numeric DEFAULT 0;
ALTER TABLE public.servicos ADD COLUMN IF NOT EXISTS cashback_percentual numeric DEFAULT 0;

-- Adicionar código de indicação e referência ao perfil
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS codigo_indicacao text UNIQUE;
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS indicado_por uuid REFERENCES public.profiles(id);

-- Criar tabela para rastrear indicações e recompensas
CREATE TABLE public.indicacoes (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  indicador_id uuid NOT NULL REFERENCES public.profiles(id),
  indicado_id uuid NOT NULL REFERENCES public.profiles(id),
  cashback_valor numeric NOT NULL DEFAULT 0,
  status text NOT NULL DEFAULT 'pendente',
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  processado_at timestamp with time zone
);

-- Enable RLS
ALTER TABLE public.indicacoes ENABLE ROW LEVEL SECURITY;

-- Políticas RLS para indicações
CREATE POLICY "Usuários podem ver próprias indicações"
  ON public.indicacoes FOR SELECT
  USING (auth.uid() = indicador_id OR auth.uid() = indicado_id);

CREATE POLICY "Sistema pode criar indicações"
  ON public.indicacoes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Sistema pode atualizar indicações"
  ON public.indicacoes FOR UPDATE
  USING (true);

-- Função para gerar código de indicação único
CREATE OR REPLACE FUNCTION public.generate_referral_code()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.codigo_indicacao IS NULL THEN
    NEW.codigo_indicacao := UPPER(SUBSTRING(MD5(NEW.id::text || now()::text) FROM 1 FOR 8));
  END IF;
  RETURN NEW;
END;
$$;

-- Trigger para gerar código automaticamente
CREATE TRIGGER generate_profile_referral_code
  BEFORE INSERT OR UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_referral_code();

-- Atualizar perfis existentes com código de indicação
UPDATE public.profiles 
SET codigo_indicacao = UPPER(SUBSTRING(MD5(id::text || now()::text) FROM 1 FOR 8))
WHERE codigo_indicacao IS NULL;