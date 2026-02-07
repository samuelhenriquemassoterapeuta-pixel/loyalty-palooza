
-- Create table for pre-session assessment checklists
CREATE TABLE public.checklists_avaliacao (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  protocolo_usuario_id UUID REFERENCES public.usuario_protocolos(id),
  agendamento_id UUID REFERENCES public.agendamentos(id),
  itens_marcados TEXT[] NOT NULL DEFAULT '{}',
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.checklists_avaliacao ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Usuários veem próprios checklists"
  ON public.checklists_avaliacao FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários criam próprios checklists"
  ON public.checklists_avaliacao FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Usuários atualizam próprios checklists"
  ON public.checklists_avaliacao FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Usuários deletam próprios checklists"
  ON public.checklists_avaliacao FOR DELETE
  USING (auth.uid() = user_id);

-- Index for faster queries
CREATE INDEX idx_checklists_user ON public.checklists_avaliacao(user_id);
CREATE INDEX idx_checklists_protocolo ON public.checklists_avaliacao(protocolo_usuario_id);
