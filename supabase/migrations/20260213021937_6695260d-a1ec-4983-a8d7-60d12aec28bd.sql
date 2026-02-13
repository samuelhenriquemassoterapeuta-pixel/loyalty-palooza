
-- Tabela principal de posts sociais
CREATE TABLE public.social_posts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  agendamento_id UUID REFERENCES public.agendamentos(id),
  tipo_post TEXT NOT NULL DEFAULT 'story' CHECK (tipo_post IN ('story', 'feed', 'reels')),
  plataforma TEXT NOT NULL DEFAULT 'instagram' CHECK (plataforma IN ('instagram', 'tiktok', 'facebook', 'outro')),
  link_post TEXT,
  screenshot_url TEXT,
  descricao TEXT,
  status TEXT NOT NULL DEFAULT 'pendente' CHECK (status IN ('pendente', 'aprovado', 'rejeitado')),
  motivo_rejeicao TEXT,
  aprovado_por UUID,
  aprovado_em TIMESTAMP WITH TIME ZONE,
  cashback_valor NUMERIC NOT NULL DEFAULT 0,
  xp_valor INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Configuração de recompensas por tipo de post
CREATE TABLE public.social_posts_config (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  tipo_post TEXT NOT NULL UNIQUE CHECK (tipo_post IN ('story', 'feed', 'reels')),
  cashback_valor NUMERIC NOT NULL DEFAULT 3,
  xp_valor INTEGER NOT NULL DEFAULT 50,
  label TEXT NOT NULL,
  descricao TEXT,
  icone TEXT NOT NULL DEFAULT 'Camera',
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Dados iniciais de configuração
INSERT INTO public.social_posts_config (tipo_post, cashback_valor, xp_valor, label, descricao, icone) VALUES
  ('story', 3, 50, 'Story', 'Story simples marcando @resinkra', 'Instagram'),
  ('feed', 8, 150, 'Post no Feed', 'Post no feed com depoimento e marcação', 'Image'),
  ('reels', 15, 300, 'Reels/Vídeo', 'Reels ou vídeo mostrando a experiência', 'Video');

-- Enable RLS
ALTER TABLE public.social_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_posts_config ENABLE ROW LEVEL SECURITY;

-- RLS: social_posts
CREATE POLICY "Usuários veem próprios posts" ON public.social_posts
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Usuários criam próprios posts" ON public.social_posts
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Admins gerenciam social posts" ON public.social_posts
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- RLS: social_posts_config (leitura pública, admin gerencia)
CREATE POLICY "Config visível para autenticados" ON public.social_posts_config
  FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins gerenciam config" ON public.social_posts_config
  FOR ALL USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger updated_at
CREATE TRIGGER update_social_posts_updated_at
  BEFORE UPDATE ON public.social_posts
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Função para creditar recompensa ao aprovar post
CREATE OR REPLACE FUNCTION public.credit_social_post_reward()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  v_config RECORD;
BEGIN
  -- Apenas quando status muda para 'aprovado'
  IF NEW.status = 'aprovado' AND OLD.status = 'pendente' THEN
    -- Buscar config de recompensa
    SELECT cashback_valor, xp_valor INTO v_config
    FROM public.social_posts_config
    WHERE tipo_post = NEW.tipo_post AND ativo = true;

    IF v_config IS NOT NULL THEN
      -- Salvar valores no post
      NEW.cashback_valor := v_config.cashback_valor;
      NEW.xp_valor := v_config.xp_valor;
      NEW.aprovado_em := now();

      -- Creditar cashback
      IF v_config.cashback_valor > 0 THEN
        INSERT INTO public.transacoes (user_id, tipo, valor, descricao, referencia_id, expira_em)
        VALUES (
          NEW.user_id,
          'cashback',
          v_config.cashback_valor,
          'Recompensa Resinkra Moments — ' || NEW.tipo_post || ' 📸',
          NEW.id,
          now() + INTERVAL '90 days'
        );
      END IF;

      -- Notificar usuário
      INSERT INTO public.notificacoes (user_id, titulo, mensagem, tipo)
      VALUES (
        NEW.user_id,
        'Post aprovado! 📸🎉',
        'Seu ' || NEW.tipo_post || ' foi aprovado! Você ganhou R$ ' || 
        REPLACE(TO_CHAR(v_config.cashback_valor, 'FM999990D00'), '.', ',') || 
        ' de cashback + ' || v_config.xp_valor || ' XP!',
        'cashback'
      );
    END IF;
  END IF;

  RETURN NEW;
END;
$$;

CREATE TRIGGER trigger_credit_social_post_reward
  BEFORE UPDATE ON public.social_posts
  FOR EACH ROW EXECUTE FUNCTION public.credit_social_post_reward();
