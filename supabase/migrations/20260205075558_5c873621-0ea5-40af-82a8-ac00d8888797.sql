-- Habilitar extensões necessárias para cron jobs
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Permitir INSERT na tabela notificacoes para o service role (para a edge function poder criar lembretes)
-- A edge function usa service_role_key então não precisa de política específica