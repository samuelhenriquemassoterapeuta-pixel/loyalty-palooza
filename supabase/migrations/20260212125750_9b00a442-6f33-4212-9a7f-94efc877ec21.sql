-- Table to store landing page dynamic content
CREATE TABLE public.landing_config (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  secao text NOT NULL UNIQUE,
  conteudo jsonb NOT NULL DEFAULT '{}'::jsonb,
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  created_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.landing_config ENABLE ROW LEVEL SECURITY;

-- Public read for landing page
CREATE POLICY "Landing config visível para todos"
ON public.landing_config
FOR SELECT
USING (true);

-- Admin can manage
CREATE POLICY "Admins gerenciam landing config"
ON public.landing_config
FOR ALL
USING (has_role(auth.uid(), 'admin'::app_role));

-- Trigger for updated_at
CREATE TRIGGER update_landing_config_updated_at
BEFORE UPDATE ON public.landing_config
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Seed default content
INSERT INTO public.landing_config (secao, conteudo) VALUES
('hero', '{
  "badge": "Spa Terapia & Bem-estar",
  "titulo_parte1": "Onde o tempo",
  "titulo_destaque": "desacelera",
  "titulo_parte2": "e o cuidado começa",
  "subtitulo": "Um cuidado que começa no corpo, atravessa os sentidos e permanece na rotina. Técnica, sensibilidade e bem-estar em perfeita sincronia.",
  "botao_primario": "Agende seu horário",
  "botao_secundario": "Conheça nossos serviços",
  "sinais": ["Equilíbrio", "Pausa", "Essência"]
}'::jsonb),
('sobre', '{
  "titulo_parte1": "Equilíbrio que se sente,",
  "titulo_destaque": "cuidado que permanece",
  "subtitulo": "A Resinkra é um espaço de cuidado integral que une terapias, bem-estar e experiências sensoriais. Onde técnica e sensibilidade se unem para gerar bem-estar contínuo e duradouro.",
  "features": [
    {"titulo": "Humanização em cada detalhe", "descricao": "Escuta, acolhimento e cuidado genuíno. Cada pessoa é única e merece uma experiência feita sob medida."},
    {"titulo": "Equilíbrio e serenidade", "descricao": "Um refúgio sensorial de calma e presença, pensado para inspirar equilíbrio e reconexão."},
    {"titulo": "Bem-estar contínuo", "descricao": "O cuidado vai além da sessão: é uma experiência de ressincronização entre corpo, mente e rotina."},
    {"titulo": "Evolução contínua", "descricao": "Aprender, ajustar e seguir em movimento. A cada atendimento, refinamos a experiência."}
  ]
}'::jsonb),
('contato', '{
  "titulo_parte1": "Pronto para",
  "titulo_destaque": "começar",
  "subtitulo": "Crie sua conta gratuitamente e comece a acumular cashback em suas sessões de terapia. Seu bem-estar merece ser recompensado.",
  "botao": "Criar minha conta",
  "endereco": "Rua das Terapias, 123 - Centro",
  "telefone": "(11) 99999-9999",
  "email": "contato@resinkra.com.br",
  "instagram": "@resinkra"
}'::jsonb),
('depoimentos', '{
  "badge": "Depoimentos",
  "titulo_parte1": "O que nossos clientes",
  "titulo_destaque": "dizem",
  "subtitulo": "Histórias reais de quem já transformou seu bem-estar com a Resinkra.",
  "depoimentos_fallback": [
    {"nome": "Camila R.", "nota": 5, "comentario": "A Resinkra mudou minha rotina de autocuidado. As terapias são incríveis e ainda ganho cashback!"},
    {"nome": "Lucas M.", "nota": 5, "comentario": "Profissionais excelentes e o programa de fidelidade é um diferencial enorme. Super recomendo."},
    {"nome": "Juliana S.", "nota": 5, "comentario": "Ambiente acolhedor, atendimento impecável. O app facilita muito o agendamento e o acompanhamento."},
    {"nome": "Rafael T.", "nota": 4, "comentario": "Indiquei para três amigos e já acumulei um bom saldo de cashback. Experiência completa!"}
  ]
}'::jsonb);