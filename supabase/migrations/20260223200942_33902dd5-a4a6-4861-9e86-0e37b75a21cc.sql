
-- Inserir textos de contato e endereço da empresa (se não existirem)
INSERT INTO platform_texts (key, value, section, description)
VALUES
  ('empresa.nome', 'Resinkra', 'empresa', 'Nome da empresa'),
  ('empresa.telefone', '(11) 99999-9999', 'empresa', 'Telefone principal'),
  ('empresa.whatsapp', '(11) 99999-9999', 'empresa', 'WhatsApp da empresa'),
  ('empresa.email', 'contato@resinkra.com', 'empresa', 'Email principal'),
  ('empresa.instagram', '@resinkra', 'empresa', 'Instagram'),
  ('empresa.facebook', '', 'empresa', 'Facebook'),
  ('empresa.site', 'https://resinkra.com', 'empresa', 'Site oficial'),
  ('empresa.endereco_rua', 'Rua Exemplo, 123', 'empresa', 'Rua e número'),
  ('empresa.endereco_bairro', 'Centro', 'empresa', 'Bairro'),
  ('empresa.endereco_cidade', 'São Paulo', 'empresa', 'Cidade'),
  ('empresa.endereco_estado', 'SP', 'empresa', 'Estado'),
  ('empresa.endereco_cep', '01000-000', 'empresa', 'CEP'),
  ('empresa.horario_funcionamento', 'Seg-Sex: 8h-20h | Sáb: 9h-16h', 'empresa', 'Horário de funcionamento'),
  ('empresa.cnpj', '', 'empresa', 'CNPJ')
ON CONFLICT DO NOTHING;
