
-- Adicionar controle de transbordo (Handoff) nas sessões de chat
ALTER TABLE chat_sessions ADD COLUMN IF NOT EXISTS needs_human BOOLEAN DEFAULT false;
ALTER TABLE chat_sessions ADD COLUMN IF NOT EXISTS assigned_admin_id UUID REFERENCES profiles(id);

-- Índice parcial para o painel admin carregar rápido (apenas sessões que precisam de humano)
CREATE INDEX IF NOT EXISTS idx_chat_sessions_needs_human 
  ON chat_sessions(needs_human) 
  WHERE needs_human = true;
