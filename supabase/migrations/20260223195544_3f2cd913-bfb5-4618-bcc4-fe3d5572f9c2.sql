
-- Tabela de automações/fluxos de marketing
CREATE TABLE public.automacoes_marketing (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  nome TEXT NOT NULL,
  tipo TEXT NOT NULL DEFAULT 'boas_vindas',
  canal TEXT NOT NULL DEFAULT 'whatsapp',
  gatilho TEXT NOT NULL,
  mensagem TEXT NOT NULL,
  segmentos TEXT[] DEFAULT '{}',
  delay_horas INTEGER DEFAULT 0,
  ativo BOOLEAN DEFAULT false,
  total_disparos INTEGER DEFAULT 0,
  total_conversoes INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.automacoes_marketing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admins can manage automacoes" ON public.automacoes_marketing
  FOR ALL USING (
    EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin')
  );

-- Adicionar campos de métricas em campanhas_marketing
ALTER TABLE public.campanhas_marketing
  ADD COLUMN IF NOT EXISTS taxa_abertura NUMERIC DEFAULT 0,
  ADD COLUMN IF NOT EXISTS taxa_clique NUMERIC DEFAULT 0;

-- Trigger updated_at para automacoes
CREATE TRIGGER update_automacoes_marketing_updated_at
  BEFORE UPDATE ON public.automacoes_marketing
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();
