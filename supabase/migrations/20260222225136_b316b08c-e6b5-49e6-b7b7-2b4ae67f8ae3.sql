-- Adicionar colunas de rastreamento de exportação à tabela transacoes
ALTER TABLE public.transacoes ADD COLUMN IF NOT EXISTS imagem_exportada boolean DEFAULT false;
ALTER TABLE public.transacoes ADD COLUMN IF NOT EXISTS compartilhado_whatsapp boolean DEFAULT false;