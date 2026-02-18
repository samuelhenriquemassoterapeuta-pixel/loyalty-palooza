
-- =============================================
-- 1. Tabela base: playlists
-- =============================================
CREATE TABLE public.playlists (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  categoria VARCHAR(50) NOT NULL DEFAULT 'relaxante',
  capa_url TEXT,
  youtube_id TEXT,
  artista TEXT,
  frequencia NUMERIC,
  sugerida_por UUID,
  data_sugestao TIMESTAMPTZ,
  vezes_escolhida INTEGER DEFAULT 0,
  ativa BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.playlists ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Playlists são visíveis para todos autenticados"
  ON public.playlists FOR SELECT
  USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins podem gerenciar playlists"
  ON public.playlists FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- 2. Coluna playlist_id em agendamentos
-- =============================================
ALTER TABLE public.agendamentos ADD COLUMN IF NOT EXISTS playlist_id UUID REFERENCES public.playlists(id);

-- =============================================
-- 3. Tabela: sugestoes_playlist
-- =============================================
CREATE TABLE public.sugestoes_playlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  usuario_id UUID NOT NULL,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT,
  link TEXT NOT NULL,
  categoria VARCHAR(50) DEFAULT 'relaxante',
  justificativa TEXT,
  status VARCHAR(20) DEFAULT 'pendente',
  votos INTEGER DEFAULT 0,
  recompensa_cashback DECIMAL(10,2),
  xp_recompensa INTEGER DEFAULT 0,
  moderado_por UUID,
  moderated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.sugestoes_playlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem sugestões aprovadas e as próprias"
  ON public.sugestoes_playlist FOR SELECT
  USING (auth.uid() IS NOT NULL AND (status = 'pendente' OR status = 'aprovada' OR usuario_id = auth.uid()));

CREATE POLICY "Usuários podem criar sugestões"
  ON public.sugestoes_playlist FOR INSERT
  WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Admins gerenciam sugestões"
  ON public.sugestoes_playlist FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- =============================================
-- 4. Tabela: votos_sugestoes
-- =============================================
CREATE TABLE public.votos_sugestoes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  sugestao_id UUID REFERENCES public.sugestoes_playlist(id) ON DELETE CASCADE NOT NULL,
  usuario_id UUID NOT NULL,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(sugestao_id, usuario_id)
);

ALTER TABLE public.votos_sugestoes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem seus votos"
  ON public.votos_sugestoes FOR SELECT
  USING (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem votar"
  ON public.votos_sugestoes FOR INSERT
  WITH CHECK (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem remover voto"
  ON public.votos_sugestoes FOR DELETE
  USING (auth.uid() = usuario_id);

-- =============================================
-- 5. Tabela: avaliacoes_playlist
-- =============================================
CREATE TABLE public.avaliacoes_playlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  agendamento_id UUID REFERENCES public.agendamentos(id) ON DELETE CASCADE,
  usuario_id UUID NOT NULL,
  playlist_id UUID REFERENCES public.playlists(id),
  gostou BOOLEAN,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE public.avaliacoes_playlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários veem suas avaliações"
  ON public.avaliacoes_playlist FOR SELECT
  USING (auth.uid() = usuario_id);

CREATE POLICY "Usuários podem avaliar"
  ON public.avaliacoes_playlist FOR INSERT
  WITH CHECK (auth.uid() = usuario_id);

-- =============================================
-- 6. Índices para performance
-- =============================================
CREATE INDEX idx_sugestoes_status ON public.sugestoes_playlist(status);
CREATE INDEX idx_avaliacoes_playlist_user ON public.avaliacoes_playlist(usuario_id, playlist_id);
CREATE INDEX idx_playlists_vezes_escolhida ON public.playlists(vezes_escolhida DESC);
CREATE INDEX idx_playlists_categoria ON public.playlists(categoria);

-- =============================================
-- 7. Função RPC: incrementar voto
-- =============================================
CREATE OR REPLACE FUNCTION public.incrementar_voto_sugestao(p_sugestao_id UUID)
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
BEGIN
  UPDATE public.sugestoes_playlist
  SET votos = votos + 1
  WHERE id = p_sugestao_id;
END;
$$;
