-- Adicionando selo de verificação de IA nos posts sociais
ALTER TABLE social_posts ADD COLUMN IF NOT EXISTS ai_verified BOOLEAN DEFAULT false;

-- Para a moderação descentralizada
ALTER TABLE social_posts ADD COLUMN IF NOT EXISTS approved_by_users UUID[] DEFAULT '{}';
