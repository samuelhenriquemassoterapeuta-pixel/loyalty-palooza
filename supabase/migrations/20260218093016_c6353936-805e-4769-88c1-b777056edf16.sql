
-- Tabela principal de fichas de anamnese
CREATE TABLE public.fichas_anamnese (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  terapeuta_id UUID REFERENCES public.terapeutas(id),
  servico_nome TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'rascunho',
  
  -- Dados pessoais
  nome_completo TEXT NOT NULL,
  data_nascimento DATE,
  sexo TEXT,
  profissao TEXT,
  telefone TEXT,
  email TEXT,
  endereco TEXT,
  
  -- Histórico médico geral
  queixa_principal TEXT,
  historico_doencas TEXT[],
  medicamentos_uso TEXT,
  alergias TEXT[],
  cirurgias_previas TEXT,
  fumante BOOLEAN DEFAULT false,
  etilista BOOLEAN DEFAULT false,
  pratica_atividade_fisica BOOLEAN DEFAULT false,
  atividade_fisica_descricao TEXT,
  pressao_arterial TEXT,
  
  -- Campos específicos por modalidade (JSON flexível)
  campos_especificos JSONB DEFAULT '{}'::jsonb,
  
  -- Observações gerais
  observacoes_gerais TEXT,
  
  -- Assinatura
  assinatura_paciente TEXT, -- base64 da assinatura
  assinatura_data TIMESTAMPTZ,
  
  -- Vínculo com protocolo
  protocolo_usuario_id UUID REFERENCES public.usuario_protocolos(id),
  agendamento_id UUID REFERENCES public.agendamentos(id),
  
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tabela de templates por terapia
CREATE TABLE public.anamnese_templates (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  servico_nome TEXT NOT NULL,
  titulo TEXT NOT NULL,
  descricao TEXT,
  campos JSONB NOT NULL DEFAULT '[]'::jsonb,
  ativo BOOLEAN NOT NULL DEFAULT true,
  ordem INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- RLS
ALTER TABLE public.fichas_anamnese ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.anamnese_templates ENABLE ROW LEVEL SECURITY;

-- Policies fichas_anamnese
CREATE POLICY "Users can view own fichas"
ON public.fichas_anamnese FOR SELECT
USING (auth.uid() = user_id);

CREATE POLICY "Users can create own fichas"
ON public.fichas_anamnese FOR INSERT
WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own fichas"
ON public.fichas_anamnese FOR UPDATE
USING (auth.uid() = user_id);

CREATE POLICY "Admins manage all fichas"
ON public.fichas_anamnese FOR ALL
USING (has_role(auth.uid(), 'admin'));

CREATE POLICY "Terapeutas view assigned fichas"
ON public.fichas_anamnese FOR SELECT
USING (
  EXISTS (
    SELECT 1 FROM public.terapeutas t
    WHERE t.id = fichas_anamnese.terapeuta_id
      AND t.user_id = auth.uid()
  )
);

-- Policies anamnese_templates (público para leitura, admin para escrita)
CREATE POLICY "Anyone authenticated can view templates"
ON public.anamnese_templates FOR SELECT
USING (auth.uid() IS NOT NULL);

CREATE POLICY "Admins manage templates"
ON public.anamnese_templates FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Block anon access
CREATE POLICY "Block anon fichas_anamnese"
ON public.fichas_anamnese AS RESTRICTIVE FOR ALL
TO anon USING (false);

CREATE POLICY "Block anon anamnese_templates"
ON public.anamnese_templates AS RESTRICTIVE FOR ALL
TO anon USING (false);

-- Trigger updated_at
CREATE TRIGGER update_fichas_anamnese_updated_at
BEFORE UPDATE ON public.fichas_anamnese
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();

-- Inserir templates por terapia
INSERT INTO public.anamnese_templates (servico_nome, titulo, descricao, campos, ordem) VALUES
('Head SPA', 'Anamnese Head SPA', 'Ficha clínica para sessão de Head SPA', '[
  {"key":"sensibilidade_couro","label":"Sensibilidade no couro cabeludo?","type":"select","options":["Nenhuma","Leve","Moderada","Intensa"]},
  {"key":"queda_capilar","label":"Queda capilar?","type":"boolean"},
  {"key":"oleosidade","label":"Nível de oleosidade","type":"select","options":["Seco","Normal","Oleoso","Misto"]},
  {"key":"tratamentos_capilares","label":"Tratamentos capilares recentes","type":"text"},
  {"key":"dores_cabeca","label":"Dores de cabeça frequentes?","type":"boolean"},
  {"key":"bruxismo","label":"Bruxismo ou aperta os dentes?","type":"boolean"},
  {"key":"nivel_estresse","label":"Nível de estresse (1-10)","type":"number","min":1,"max":10},
  {"key":"qualidade_sono","label":"Qualidade do sono","type":"select","options":["Boa","Regular","Ruim","Insônia"]}
]'::jsonb, 1),

('Liberação Miofascial', 'Anamnese Liberação Miofascial', 'Avaliação clínica para LMF', '[
  {"key":"regiao_dor","label":"Região principal de dor/tensão","type":"multiselect","options":["Cervical","Ombros","Lombar","Quadril","Membros superiores","Membros inferiores","Torácica"]},
  {"key":"escala_dor","label":"Escala de dor (0-10)","type":"number","min":0,"max":10},
  {"key":"tempo_dor","label":"Há quanto tempo sente dor?","type":"select","options":["Menos de 1 mês","1-3 meses","3-6 meses","6-12 meses","Mais de 1 ano"]},
  {"key":"piora_fatores","label":"O que piora a dor?","type":"text"},
  {"key":"melhora_fatores","label":"O que melhora a dor?","type":"text"},
  {"key":"postura_trabalho","label":"Postura predominante no trabalho","type":"select","options":["Sentado","Em pé","Alternada","Esforço físico"]},
  {"key":"horas_sentado","label":"Horas sentado por dia","type":"number","min":0,"max":24},
  {"key":"lesoes_previas","label":"Lesões prévias na região","type":"text"}
]'::jsonb, 2),

('Seitai', 'Anamnese Seitai', 'Ficha de avaliação para Seitai', '[
  {"key":"desequilibrio_postural","label":"Percebe desequilíbrio postural?","type":"boolean"},
  {"key":"lado_predominante","label":"Lado predominante de desconforto","type":"select","options":["Direito","Esquerdo","Bilateral","Nenhum"]},
  {"key":"amplitude_movimento","label":"Limitação de movimento","type":"multiselect","options":["Flexão cervical","Rotação cervical","Flexão lombar","Extensão","Abdução ombro","Rotação quadril"]},
  {"key":"digestao","label":"Problemas digestivos?","type":"select","options":["Nenhum","Refluxo","Constipação","Distensão","Outros"]},
  {"key":"respiracao","label":"Padrão respiratório","type":"select","options":["Normal","Superficial","Dispneia leve","Apneia do sono"]},
  {"key":"emocional","label":"Estado emocional predominante","type":"select","options":["Equilibrado","Ansioso","Estressado","Depressivo","Irritado"]}
]'::jsonb, 3),

('Dry Needling', 'Anamnese Dry Needling', 'Avaliação para agulhamento a seco', '[
  {"key":"medo_agulhas","label":"Medo de agulhas?","type":"select","options":["Nenhum","Leve","Moderado","Intenso"]},
  {"key":"anticoagulantes","label":"Usa anticoagulantes?","type":"boolean"},
  {"key":"disturbios_coagulacao","label":"Distúrbios de coagulação?","type":"boolean"},
  {"key":"areas_trigger","label":"Áreas com pontos-gatilho","type":"multiselect","options":["Trapézio","Esternocleidomastóideo","Infraespinhoso","Piriforme","Quadrado lombar","Glúteo médio","Escalenos","Outros"]},
  {"key":"tratamento_anterior_dn","label":"Já fez Dry Needling antes?","type":"boolean"},
  {"key":"reacao_anterior","label":"Reação ao tratamento anterior","type":"text"},
  {"key":"gravidez","label":"Gestante?","type":"boolean"},
  {"key":"marca_passo","label":"Usa marca-passo?","type":"boolean"}
]'::jsonb, 4),

('Drenagem Linfática', 'Anamnese Drenagem Linfática', 'Avaliação para drenagem', '[
  {"key":"edema","label":"Apresenta edema?","type":"select","options":["Nenhum","Leve","Moderado","Severo"]},
  {"key":"localizacao_edema","label":"Localização do edema","type":"multiselect","options":["MMII","MMSS","Abdômen","Face","Generalizado"]},
  {"key":"pos_operatorio","label":"Pós-operatório?","type":"boolean"},
  {"key":"tipo_cirurgia_pos","label":"Tipo de cirurgia (se pós-op)","type":"text"},
  {"key":"dias_pos_cirurgia","label":"Dias desde a cirurgia","type":"number","min":0},
  {"key":"retencao_liquidos","label":"Retenção de líquidos frequente?","type":"boolean"},
  {"key":"ciclo_menstrual","label":"Fase do ciclo menstrual","type":"select","options":["N/A","Folicular","Ovulação","Lútea","Menstrual"]},
  {"key":"trombose_historico","label":"Histórico de trombose?","type":"boolean"},
  {"key":"insuficiencia_cardiaca","label":"Insuficiência cardíaca?","type":"boolean"},
  {"key":"infeccao_ativa","label":"Infecção ativa?","type":"boolean"}
]'::jsonb, 5),

('Massoterapia', 'Anamnese Massoterapia', 'Avaliação geral de massoterapia', '[
  {"key":"objetivo_sessao","label":"Objetivo da sessão","type":"select","options":["Relaxamento","Alívio de dor","Desportivo","Recuperação","Bem-estar geral"]},
  {"key":"pressao_preferida","label":"Pressão preferida","type":"select","options":["Leve","Moderada","Firme","Profunda"]},
  {"key":"areas_evitar","label":"Áreas a evitar","type":"text"},
  {"key":"areas_foco","label":"Áreas de foco","type":"multiselect","options":["Costas","Pescoço","Ombros","Lombar","Pernas","Pés","Braços","Cabeça"]},
  {"key":"nivel_estresse","label":"Nível de estresse (1-10)","type":"number","min":1,"max":10},
  {"key":"qualidade_sono","label":"Qualidade do sono","type":"select","options":["Boa","Regular","Ruim","Insônia"]},
  {"key":"condicoes_pele","label":"Condições de pele na região","type":"select","options":["Normal","Sensível","Dermatite","Feridas","Manchas"]}
]'::jsonb, 6),

('Ventosaterapia', 'Anamnese Ventosaterapia', 'Avaliação para ventosaterapia', '[
  {"key":"sensibilidade_pele","label":"Sensibilidade da pele","type":"select","options":["Normal","Sensível","Muito sensível"]},
  {"key":"hematomas_faceis","label":"Hematomas com facilidade?","type":"boolean"},
  {"key":"anticoagulantes","label":"Usa anticoagulantes?","type":"boolean"},
  {"key":"varizes","label":"Varizes na região?","type":"boolean"},
  {"key":"areas_aplicacao","label":"Áreas para aplicação","type":"multiselect","options":["Costas","Ombros","Lombar","Pernas","Braços","Glúteos"]},
  {"key":"tratamento_anterior","label":"Já fez ventosaterapia?","type":"boolean"},
  {"key":"gravidez","label":"Gestante?","type":"boolean"}
]'::jsonb, 7),

('Reflexologia', 'Anamnese Reflexologia', 'Avaliação para reflexologia podal', '[
  {"key":"problemas_pes","label":"Problemas nos pés?","type":"multiselect","options":["Nenhum","Calos","Joanete","Fascite","Esporão","Fungo","Frieira"]},
  {"key":"diabetes","label":"Diabetes?","type":"boolean"},
  {"key":"neuropatia","label":"Neuropatia periférica?","type":"boolean"},
  {"key":"sensibilidade_pes","label":"Sensibilidade nos pés","type":"select","options":["Normal","Reduzida","Aumentada"]},
  {"key":"sistemas_queixa","label":"Sistemas com queixas","type":"multiselect","options":["Digestivo","Respiratório","Urinário","Reprodutivo","Nervoso","Endócrino","Musculoesquelético"]},
  {"key":"nivel_estresse","label":"Nível de estresse (1-10)","type":"number","min":1,"max":10}
]'::jsonb, 8);
