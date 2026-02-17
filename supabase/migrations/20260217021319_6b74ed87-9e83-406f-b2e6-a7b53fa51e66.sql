
-- 1. Add 'terapeuta' to app_role enum
ALTER TYPE public.app_role ADD VALUE IF NOT EXISTS 'terapeuta';

-- 2. Add user_id column to terapeutas table (links therapist to auth user)
ALTER TABLE public.terapeutas ADD COLUMN IF NOT EXISTS user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL UNIQUE;

-- 3. Create is_terapeuta function (similar to is_parceiro)
CREATE OR REPLACE FUNCTION public.is_terapeuta(_user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.terapeutas
    WHERE user_id = _user_id AND disponivel = true
  )
$$;

-- 4. Create terapeuta_cupons table for therapist-specific coupons
CREATE TABLE IF NOT EXISTS public.terapeuta_cupons (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  terapeuta_id UUID NOT NULL REFERENCES public.terapeutas(id) ON DELETE CASCADE,
  codigo TEXT NOT NULL UNIQUE,
  descricao TEXT,
  tipo_desconto TEXT NOT NULL DEFAULT 'percentual',
  valor_desconto NUMERIC NOT NULL DEFAULT 0,
  valor_minimo_compra NUMERIC DEFAULT 0,
  max_usos INTEGER,
  usos_atuais INTEGER NOT NULL DEFAULT 0,
  valido_ate TIMESTAMPTZ,
  servicos_aplicaveis JSONB,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.terapeuta_cupons ENABLE ROW LEVEL SECURITY;

-- Therapists can manage their own coupons
CREATE POLICY "Terapeutas can view own coupons"
ON public.terapeuta_cupons FOR SELECT TO authenticated
USING (
  terapeuta_id IN (SELECT id FROM public.terapeutas WHERE user_id = auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Terapeutas can insert own coupons"
ON public.terapeuta_cupons FOR INSERT TO authenticated
WITH CHECK (
  terapeuta_id IN (SELECT id FROM public.terapeutas WHERE user_id = auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Terapeutas can update own coupons"
ON public.terapeuta_cupons FOR UPDATE TO authenticated
USING (
  terapeuta_id IN (SELECT id FROM public.terapeutas WHERE user_id = auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);

CREATE POLICY "Terapeutas can delete own coupons"
ON public.terapeuta_cupons FOR DELETE TO authenticated
USING (
  terapeuta_id IN (SELECT id FROM public.terapeutas WHERE user_id = auth.uid())
  OR public.has_role(auth.uid(), 'admin')
);

-- 5. Validation trigger for terapeuta coupons (max 20% or R$30)
CREATE OR REPLACE FUNCTION public.validate_terapeuta_cupom()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.tipo_desconto = 'percentual' AND NEW.valor_desconto > 20 THEN
    RAISE EXCEPTION 'Cupons de terapeuta com desconto percentual não podem ultrapassar 20%%.';
  END IF;
  IF NEW.tipo_desconto = 'valor_fixo' AND NEW.valor_desconto > 30 THEN
    RAISE EXCEPTION 'Cupons de terapeuta com valor fixo não podem ultrapassar R$ 30,00.';
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_terapeuta_cupom_trigger
BEFORE INSERT OR UPDATE ON public.terapeuta_cupons
FOR EACH ROW EXECUTE FUNCTION public.validate_terapeuta_cupom();

-- 6. Updated_at trigger
CREATE TRIGGER update_terapeuta_cupons_updated_at
BEFORE UPDATE ON public.terapeuta_cupons
FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
