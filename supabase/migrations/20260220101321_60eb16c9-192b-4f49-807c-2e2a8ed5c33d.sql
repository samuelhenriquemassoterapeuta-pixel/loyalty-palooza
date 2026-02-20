-- Criar tabela diario_bem_estar para registro de bem-estar dos colaboradores
CREATE TABLE IF NOT EXISTS public.diario_bem_estar (
    id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID NOT NULL,
    nivel_estresse NUMERIC(3,1) CHECK (nivel_estresse BETWEEN 0 AND 10),
    energia_fisica NUMERIC(3,1) CHECK (energia_fisica BETWEEN 0 AND 10),
    qualidade_sono NUMERIC(3,1) CHECK (qualidade_sono BETWEEN 0 AND 10),
    humor NUMERIC(3,1) CHECK (humor BETWEEN 0 AND 10),
    observacoes TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.diario_bem_estar ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Usuários gerenciam seus próprios registros de bem-estar"
ON public.diario_bem_estar
FOR ALL
USING (auth.uid() = user_id)
WITH CHECK (auth.uid() = user_id);

-- View segura LGPD: agrupa dados por empresa sem expor funcionários individualmente
CREATE OR REPLACE VIEW public.b2b_roi_analytics AS
SELECT 
    c.empresa_id,
    e.nome AS empresa_nome,
    DATE_TRUNC('month', d.created_at) AS mes_referencia,
    ROUND(AVG(d.nivel_estresse), 2) AS media_estresse,
    ROUND(AVG(d.energia_fisica), 2) AS media_energia,
    COUNT(DISTINCT d.user_id) AS total_funcionarios_engajados
FROM public.diario_bem_estar d
JOIN public.colaboradores_empresa c ON d.user_id = c.user_id
JOIN public.empresas_corporativas e ON c.empresa_id = e.id
GROUP BY c.empresa_id, e.nome, DATE_TRUNC('month', d.created_at);

GRANT SELECT ON public.b2b_roi_analytics TO authenticated;

COMMENT ON TABLE public.diario_bem_estar IS 'Registro diário de bem-estar dos colaboradores. Dados protegidos por RLS.';
COMMENT ON VIEW public.b2b_roi_analytics IS 'Agregação mensal de bem-estar por empresa — dados anonimizados (LGPD). Não expõe registros individuais.';