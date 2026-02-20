
-- Adicionando suporte a telemedicina na tabela de agendamentos
ALTER TABLE agendamentos ADD COLUMN IF NOT EXISTS is_online BOOLEAN DEFAULT false;
ALTER TABLE agendamentos ADD COLUMN IF NOT EXISTS meeting_url TEXT;
ALTER TABLE agendamentos ADD COLUMN IF NOT EXISTS status_sala TEXT DEFAULT 'aguardando';

-- Adicionar constraint para valores válidos de status_sala
ALTER TABLE agendamentos ADD CONSTRAINT agendamentos_status_sala_check
  CHECK (status_sala IN ('aguardando', 'em_consulta', 'finalizado'));
