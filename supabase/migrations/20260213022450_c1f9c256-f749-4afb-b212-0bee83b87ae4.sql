
-- ============================================================
-- 1. CHECK-INS (QR Code na recepção)
-- ============================================================
CREATE TABLE public.checkins (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  agendamento_id UUID REFERENCES public.agendamentos(id),
  metodo TEXT NOT NULL DEFAULT 'qr_code',
  xp_ganho INTEGER NOT NULL DEFAULT 25,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.checkins ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários criam próprios checkins" ON public.checkins
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários veem próprios checkins" ON public.checkins
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins gerenciam checkins" ON public.checkins
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Unique: 1 check-in per agendamento
CREATE UNIQUE INDEX idx_checkins_agendamento ON public.checkins(agendamento_id) WHERE agendamento_id IS NOT NULL;

-- ============================================================
-- 2. LISTA DE ESPERA INTELIGENTE (Waitlist)
-- ============================================================
CREATE TABLE public.lista_espera (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  servico TEXT NOT NULL,
  terapeuta_id UUID REFERENCES public.terapeutas(id),
  dia_preferido INTEGER, -- 0-6 (domingo-sábado)
  horario_preferido TEXT, -- ex: "manhã", "tarde", "noite"
  ativo BOOLEAN NOT NULL DEFAULT true,
  notificado_em TIMESTAMPTZ,
  cashback_bonus NUMERIC NOT NULL DEFAULT 5.00,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.lista_espera ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários gerenciam própria lista espera" ON public.lista_espera
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins gerenciam lista espera" ON public.lista_espera
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Notify waitlist when appointment is cancelled
CREATE OR REPLACE FUNCTION public.notify_waitlist_on_cancel()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  IF NEW.status = 'cancelado' AND OLD.status != 'cancelado' THEN
    INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
    SELECT
      le.user_id,
      'Horário disponível! ⚡',
      'Um horário de ' || NEW.servico || ' ficou disponível! Agende agora e ganhe R$ ' || 
      REPLACE(TO_CHAR(le.cashback_bonus, 'FM999990D00'), '.', ',') || ' de cashback bônus.',
      'agendamento'
    FROM public.lista_espera le
    WHERE le.servico = NEW.servico
      AND le.ativo = true
      AND le.user_id != NEW.user_id
      AND (le.notificado_em IS NULL OR le.notificado_em < now() - INTERVAL '1 hour')
    LIMIT 5;

    -- Mark as notified
    UPDATE public.lista_espera
    SET notificado_em = now()
    WHERE servico = NEW.servico
      AND ativo = true
      AND user_id != NEW.user_id;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_notify_waitlist
  AFTER UPDATE ON public.agendamentos
  FOR EACH ROW
  EXECUTE FUNCTION public.notify_waitlist_on_cancel();

-- ============================================================
-- 3. DESAFIOS MENSAIS TEMÁTICOS
-- ============================================================
CREATE TABLE public.desafios (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  titulo TEXT NOT NULL,
  descricao TEXT,
  icone TEXT NOT NULL DEFAULT 'Trophy',
  cor TEXT NOT NULL DEFAULT 'primary',
  data_inicio DATE NOT NULL,
  data_fim DATE NOT NULL,
  meta_tipo TEXT NOT NULL DEFAULT 'sessoes',
  meta_quantidade INTEGER NOT NULL DEFAULT 5,
  recompensa_tipo TEXT NOT NULL DEFAULT 'cashback',
  recompensa_valor NUMERIC NOT NULL DEFAULT 20,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.desafios ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Desafios visíveis para autenticados" ON public.desafios
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins gerenciam desafios" ON public.desafios
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

CREATE TABLE public.desafio_participantes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  desafio_id UUID NOT NULL REFERENCES public.desafios(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  progresso INTEGER NOT NULL DEFAULT 0,
  concluido BOOLEAN NOT NULL DEFAULT false,
  concluido_em TIMESTAMPTZ,
  recompensa_creditada BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(desafio_id, user_id)
);

ALTER TABLE public.desafio_participantes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários gerenciam própria participação" ON public.desafio_participantes
  FOR ALL USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins gerenciam participantes" ON public.desafio_participantes
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Function to credit challenge rewards
CREATE OR REPLACE FUNCTION public.credit_desafio_reward()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_desafio RECORD;
BEGIN
  IF NEW.concluido = true AND OLD.concluido = false THEN
    SELECT * INTO v_desafio FROM public.desafios WHERE id = NEW.desafio_id;
    
    IF v_desafio IS NOT NULL AND NOT NEW.recompensa_creditada THEN
      NEW.recompensa_creditada := true;
      NEW.concluido_em := now();
      
      IF v_desafio.recompensa_tipo = 'cashback' THEN
        INSERT INTO public.transacoes (user_id, tipo, valor, descricao, referencia_id, expira_em)
        VALUES (
          NEW.user_id, 'cashback', v_desafio.recompensa_valor,
          'Recompensa do desafio: ' || v_desafio.titulo || ' 🏆',
          NEW.id, now() + INTERVAL '90 days'
        );
      END IF;

      INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
      VALUES (
        NEW.user_id,
        'Desafio concluído! 🏆',
        'Parabéns! Você completou o desafio "' || v_desafio.titulo || '" e ganhou R$ ' ||
        REPLACE(TO_CHAR(v_desafio.recompensa_valor, 'FM999990D00'), '.', ',') || '!',
        'cashback'
      );
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_credit_desafio
  BEFORE UPDATE ON public.desafio_participantes
  FOR EACH ROW
  EXECUTE FUNCTION public.credit_desafio_reward();

-- ============================================================
-- 4. FEEDBACK PÓS-SESSÃO RÁPIDO
-- ============================================================
CREATE TABLE public.feedback_rapido (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  agendamento_id UUID NOT NULL REFERENCES public.agendamentos(id),
  emoji INTEGER NOT NULL, -- 1=😞, 2=😐, 3=😊
  comentario TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(agendamento_id)
);

ALTER TABLE public.feedback_rapido ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários criam próprio feedback" ON public.feedback_rapido
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários veem próprio feedback" ON public.feedback_rapido
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Admins veem todos feedback" ON public.feedback_rapido
  FOR SELECT USING (has_role(auth.uid(), 'admin'::app_role));

-- ============================================================
-- 5. CRÉDITOS FLEXÍVEIS (Evolução Assinaturas)
-- ============================================================
ALTER TABLE public.assinaturas_planos
  ADD COLUMN IF NOT EXISTS creditos_mensais INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS tipo_credito TEXT NOT NULL DEFAULT 'fixo';

ALTER TABLE public.assinaturas_usuario
  ADD COLUMN IF NOT EXISTS creditos_restantes INTEGER NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS creditos_usados INTEGER NOT NULL DEFAULT 0;
