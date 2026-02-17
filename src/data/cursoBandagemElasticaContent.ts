import { type ModuloContent } from "@/data/cursoVendasContent";

export const cursoBandagemElasticaData: ModuloContent[] = [
  // ═══════════════════════════════════════════════════════════
  // MÓDULO 1 — FUNDAÇÃO: O UNIVERSO DA BANDAGEM ELÁSTICA (10h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Fundação — O Universo da Bandagem Elástica",
    descricao: "Definição, história, princípios de funcionamento e mercado de trabalho",
    icone: "Lightbulb",
    cor: "from-cyan-50 to-teal-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "O que é Bandagem Elástica",
        descricao: "Definição técnica, características e princípios fundamentais de funcionamento",
        duracaoMinutos: 50,
        conteudo: `# O que é Bandagem Elástica

## Definição Técnica

A bandagem elástica, também conhecida como "Kinesio taping", é um recurso terapêutico que utiliza fitas adesivas flexíveis aplicadas sobre a pele para promover suporte, alívio e estabilização de músculos, articulações e tecidos.

> Diferente das bandagens rígidas tradicionais que imobilizam, a bandagem elástica foi criada com o propósito oposto: não restringir o movimento dos tendões e dos tecidos conjuntivos, permitindo que a pele e os tecidos se movam sem afetar a circulação sanguínea.

## Características da Bandagem Elástica

| Característica | Descrição |
|---|---|
| **Material** | Algodão ou materiais sintéticos com alta elasticidade |
| **Adesivo** | Cola hipoalergênica ativada pelo calor do corpo |
| **Elasticidade** | Capacidade de esticar até 140% do comprimento original |
| **Resistência** | Resistente à água, permitindo banhos e atividades diárias |
| **Durabilidade** | Pode permanecer na pele por 3 a 5 dias |

## Mecanismo de Ação Principal

Quando a bandagem elástica é aplicada sobre a pele, ela estica e levanta a pele juntamente com os tecidos subcutâneos. Esse mecanismo gera:

1. **Elevação da pele** — Cria espaço entre a pele e os tecidos subjacentes
2. **Melhora da circulação** — Facilita o fluxo sanguíneo e linfático
3. **Remoção de toxinas** — Auxilia na eliminação de substâncias inflamatórias
4. **Redução da dor** — Diminui a pressão sobre receptores dolorosos

## Efeitos Fisiológicos

| Efeito | Descrição | Mecanismo |
|---|---|---|
| **Analgésico** | Redução da sensação dolorosa | Estimulação de terminações nervosas que bloqueiam estímulos de dor |
| **Anti-inflamatório** | Diminuição do processo inflamatório | Melhora da circulação e remoção de toxinas |
| **Drenagem linfática** | Redução de edemas | Pressão negativa pela elevação da pele |
| **Proprioceptivo** | Melhora da percepção corporal | Estímulo dos mecanorreceptores cutâneos |
| **Ativação/Inibição muscular** | Equilíbrio da função muscular | Depende da direção da aplicação |

## Principais Funções

| Função | Descrição |
|---|---|
| **Suporte muscular** | Auxilia na função muscular, podendo tonificar ou relaxar |
| **Auxílio circulatório** | Facilita a circulação de fluidos orgânicos |
| **Informação proprioceptiva** | Envia estímulos sensoriais ao sistema nervoso |
| **Correção articular** | Ajuda no alinhamento e estabilização de articulações |`,
        quiz: [
          {
            pergunta: "Qual é a capacidade de estiramento máximo da bandagem elástica?",
            opcoes: ["100% do comprimento", "120% do comprimento", "140% do comprimento", "160% do comprimento"],
            respostaCorreta: 2,
            explicacao: "A bandagem elástica possui capacidade de esticar até 140% do comprimento original."
          },
          {
            pergunta: "Qual mecanismo principal da bandagem elástica promove a redução de edemas?",
            opcoes: ["Compressão direta", "Pressão negativa pela elevação da pele", "Aquecimento local", "Imobilização"],
            respostaCorreta: 1,
            explicacao: "Ao erguer a pele, a bandagem gera pressão negativa que facilita a drenagem linfática e reduz edemas."
          }
        ],
        checklist: [
          "Sei definir bandagem elástica e Kinesio taping",
          "Conheço as 5 características principais",
          "Entendo o mecanismo de ação principal",
          "Identifico os efeitos fisiológicos"
        ]
      },
      {
        titulo: "História e Revolução do Kinesio Taping",
        descricao: "Origem no Japão, popularização mundial e evolução da técnica",
        duracaoMinutos: 35,
        conteudo: `# A Revolução do Kinesio Taping

## Do Japão para o Mundo

A bandagem elástica foi criada no Japão em 1979 pelo quiropraxista e acupunturista **Dr. Kenzo Kase**. Sua inspiração veio da necessidade de desenvolver um recurso que pudesse proporcionar suporte terapêutico sem limitar a amplitude de movimento.

## Popularização Mundial

O método ganhou visibilidade internacional principalmente através dos eventos esportivos.

> "Nos eventos esportivos, como as Olímpiadas, por exemplo, é comum notar atletas usando as bandagens coloridas, principalmente nas pernas e região cervical."

Atualmente, a técnica é utilizada em todo o mundo por fisioterapeutas, terapeutas esportivos e profissionais da saúde.

## Linha do Tempo

| Período | Evento |
|---|---|
| **1979** | Dr. Kenzo Kase cria a bandagem elástica no Japão |
| **Década de 1980** | Difusão na Ásia |
| **Década de 1990** | Chegada à Europa e Américas |
| **2008 (Olimpíadas de Pequim)** | Grande visibilidade mundial |
| **Atualidade** | Uso global em diversas especialidades |`,
        quiz: [
          {
            pergunta: "Quem criou a bandagem elástica (Kinesio Taping)?",
            opcoes: ["Dr. Masunaga", "Dr. Kenzo Kase", "Dr. Nogier", "Dr. Palmer"],
            respostaCorreta: 1,
            explicacao: "O Dr. Kenzo Kase, quiropraxista e acupunturista japonês, criou a bandagem elástica em 1979."
          }
        ],
        checklist: [
          "Conheço a história do Kinesio Taping",
          "Sei quem foi Dr. Kenzo Kase",
          "Entendo como a técnica se popularizou"
        ]
      },
      {
        titulo: "Mercado de Trabalho e Oportunidades",
        descricao: "Locais de atuação, público-alvo e indicações profissionais",
        duracaoMinutos: 35,
        conteudo: `# Mercado de Trabalho e Oportunidades

## Locais de Atuação

| Local | Tipo de Serviço |
|---|---|
| **Clínicas de fisioterapia** | Disfunções ortopédicas, neurológicas e posturais |
| **Consultórios de quiropraxia/osteopatia** | Complemento ao tratamento manual |
| **Clínicas de estética** | Edemas, hematomas e fibroedema geloide |
| **Esporte e academias** | Prevenção e tratamento de lesões esportivas |
| **Eventos esportivos** | Atendimento rápido a atletas |
| **Atendimento domiciliar** | Pacientes com restrição de mobilidade |

## Público-Alvo e Indicações

| Área | Indicações |
|---|---|
| **Ortopedia** | Dores musculares, tendinites, bursites, instabilidades |
| **Neurologia** | Paralisia cerebral, sialorreia, função motora |
| **Esportiva** | Prevenção e tratamento de lesões |
| **Linfática** | Edemas, hematomas, pós-operatório |
| **Postural** | Desalinhamentos, ombros caídos, escoliose |`,
        quiz: [
          {
            pergunta: "Em qual área a bandagem elástica é usada para controle de sialorreia?",
            opcoes: ["Ortopedia", "Neurologia", "Estética", "Esportiva"],
            respostaCorreta: 1,
            explicacao: "Na neurologia, a bandagem elástica é usada para controle de sialorreia, especialmente em pacientes com paralisia cerebral."
          }
        ],
        checklist: [
          "Conheço os locais de atuação",
          "Identifico o público-alvo de cada área",
          "Entendo as indicações por especialidade"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 2 — ANATOMIA E FISIOLOGIA APLICADAS (12h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Anatomia e Fisiologia Aplicadas",
    descricao: "Revisão anatômica, fisiologia da dor, sistema linfático e propriocepção",
    icone: "Bone",
    cor: "from-blue-50 to-indigo-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Revisão Anatômica e Biomecânica",
        descricao: "Sistema muscular, tipos de fibra e sistema fascial",
        duracaoMinutos: 50,
        conteudo: `# Revisão Anatômica e Biomecânica

## Sistema Muscular

| Tipo de Fibra | Características | Função |
|---|---|---|
| **Tipo I (fibras lentas)** | Contração lenta, resistentes à fadiga | Postura, atividades de longa duração |
| **Tipo II (fibras rápidas)** | Contração rápida, fatigam facilmente | Movimentos explosivos, força |

## Sistema Fascial

A fáscia é um tecido conjuntivo que envolve todas as estruturas do corpo. A bandagem elástica atua diretamente sobre ela, promovendo:

- Liberação de tensões
- Melhora do deslizamento entre camadas
- Correção de aderências`,
        quiz: [
          {
            pergunta: "Quais fibras musculares são responsáveis pela manutenção postural?",
            opcoes: ["Tipo II (rápidas)", "Tipo I (lentas)", "Ambas igualmente", "Nenhuma"],
            respostaCorreta: 1,
            explicacao: "As fibras Tipo I (lentas) são resistentes à fadiga e responsáveis pela manutenção postural e atividades de longa duração."
          }
        ],
        checklist: [
          "Diferencio fibras tipo I e tipo II",
          "Entendo o papel da fáscia",
          "Sei como a bandagem atua no sistema fascial"
        ]
      },
      {
        titulo: "Fisiologia da Dor e Teoria das Comportas",
        descricao: "Mecanismos da dor, tipos de dor e papel da bandagem no alívio",
        duracaoMinutos: 45,
        conteudo: `# Fisiologia da Dor e o Papel da Bandagem

## Mecanismos da Dor

| Tipo de Dor | Características | Ação da Bandagem |
|---|---|---|
| **Nociceptiva** | Lesão tecidual | Redução da pressão sobre receptores |
| **Neuropática** | Lesão nervosa | Descompressão neural |
| **Central** | Processamento alterado | Estímulo proprioceptivo |

## Teoria das Comportas da Dor

A bandagem elástica estimula terminações nervosas na pele que competem entre si. O resultado é o bloqueio dos estímulos nervosos responsáveis pela sensação de dor processados no cérebro.

> O estímulo tátil gerado pela bandagem "fecha a comporta" para os estímulos dolorosos, reduzindo a percepção de dor.`,
        quiz: [
          {
            pergunta: "A Teoria das Comportas da Dor explica que a bandagem:",
            opcoes: ["Elimina a causa da dor", "Compete com estímulos dolorosos bloqueando sua percepção", "Anestesia os tecidos", "Aumenta a inflamação"],
            respostaCorreta: 1,
            explicacao: "A bandagem estimula terminações nervosas que competem com os estímulos dolorosos, bloqueando sua percepção no cérebro."
          }
        ],
        checklist: [
          "Diferencio os tipos de dor",
          "Entendo a Teoria das Comportas",
          "Sei como a bandagem atua em cada tipo de dor"
        ]
      },
      {
        titulo: "Sistema Linfático e Propriocepção",
        descricao: "Drenagem linfática, indicações circulatórias e controle motor",
        duracaoMinutos: 45,
        conteudo: `# Sistema Linfático e Propriocepção

## Fisiologia da Drenagem Linfática

Ao erguer a pele, a bandagem gera uma pressão negativa embaixo da região em que foi colocada. O resultado é a melhora da drenagem da linfa e redução do inchaço.

## Indicações Circulatórias

| Condição | Ação da Bandagem |
|---|---|
| **Edema agudo** | Redução do inchaço pós-traumático |
| **Edema linfático** | Estímulo ao sistema linfático |
| **Hematoma** | Aceleração da reabsorção |
| **Pós-operatório** | Controle de edema e fibrose |

## Propriocepção e Controle Motor

A bandagem elástica melhora a percepção corporal (propriocepção) durante o movimento. Isso é fundamental para:

- Prevenção de lesões
- Reeducação postural
- Reabilitação neurológica`,
        quiz: [
          {
            pergunta: "Como a bandagem elástica auxilia na drenagem linfática?",
            opcoes: ["Comprimindo os tecidos", "Gerando pressão negativa ao erguer a pele", "Aquecendo a região", "Imobilizando a articulação"],
            respostaCorreta: 1,
            explicacao: "Ao erguer a pele, a bandagem gera pressão negativa que melhora a drenagem da linfa e reduz o inchaço."
          }
        ],
        checklist: [
          "Entendo a drenagem linfática pela bandagem",
          "Conheço as indicações circulatórias",
          "Sei o papel da propriocepção"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 3 — MATERIAIS, TIPOS E CARACTERÍSTICAS (6h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Materiais, Tipos e Características",
    descricao: "Tipos de bandagens, elasticidade, cortes e acessórios",
    icone: "Scissors",
    cor: "from-amber-50 to-yellow-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Tipos de Bandagens e Características Físicas",
        descricao: "Tipos de bandagem, composição, elasticidade e níveis de tensão",
        duracaoMinutos: 40,
        conteudo: `# Tipos de Bandagens e Características Físicas

## Tipos de Bandagens Elásticas

| Tipo | Características | Indicação |
|---|---|---|
| **Tradicional (bege ou colorida)** | Elasticidade moderada | Suporte e alívio de dores leves |
| **Com reforço** | Maior elasticidade e resistência | Suporte intenso, lesões agudas |
| **Resistente à água** | Adesivo especial para umidade | Esportes aquáticos, uso prolongado |

## Composição

A bandagem elástica é feita de algodão ou materiais sintéticos, revestida com cola hipoalergênica que adere à pele sem causar irritações. É resistente à água, prática para uso contínuo.

## Elasticidade e Tensão

| Nível de Tensão | Porcentagem | Efeito |
|---|---|---|
| **Sem tensão (0%)** | Comprimento original | Ancoragem, técnicas linfáticas |
| **Leve (15-25%)** | Pequeno estiramento | Estímulo sensorial, drenagem |
| **Moderada (25-50%)** | Estiramento médio | Suporte muscular, correção |
| **Forte (50-75%)** | Estiramento intenso | Estabilização articular |
| **Máxima (75-100%)** | Estiramento máximo | Casos específicos com cautela |`,
        quiz: [
          {
            pergunta: "Qual nível de tensão é usado para técnicas linfáticas?",
            opcoes: ["25-50%", "50-75%", "0% (sem tensão)", "75-100%"],
            respostaCorreta: 2,
            explicacao: "Para técnicas linfáticas, usa-se tensão 0% (sem tensão), apenas como ancoragem para facilitar a drenagem."
          }
        ],
        checklist: [
          "Conheço os 3 tipos de bandagem",
          "Entendo os níveis de tensão",
          "Sei associar tensão ao efeito desejado"
        ]
      },
      {
        titulo: "Tipos de Cortes e Acessórios",
        descricao: "Cortes em I, Y, X e leque, acessórios e materiais complementares",
        duracaoMinutos: 35,
        conteudo: `# Tipos de Cortes e Acessórios

## Tipos de Cortes da Bandagem

| Tipo de Corte | Formato | Aplicação |
|---|---|---|
| **Corte em I** | Tira reta | Músculos longos, ligamentos |
| **Corte em Y** | Dividido em duas pontas | Músculos com dois ventres, contornos |
| **Corte em X** | Quatro pontas | Articulações, áreas complexas |
| **Corte em leque** | Múltiplas tiras finas | Drenagem linfática, edemas |

## Acessórios e Materiais Complementares

| Material | Função |
|---|---|
| **Tesoura** | Corte preciso da bandagem |
| **Álcool 70%** | Limpeza da pele antes da aplicação |
| **Gilete ou aparador** | Remoção de pelos se necessário |
| **Papel toalha** | Secagem da pele |
| **Spray fixador** | Proteção adicional (opcional) |`,
        quiz: [
          {
            pergunta: "Qual tipo de corte é indicado para drenagem linfática?",
            opcoes: ["Corte em I", "Corte em Y", "Corte em X", "Corte em leque"],
            respostaCorreta: 3,
            explicacao: "O corte em leque (múltiplas tiras finas) é o indicado para drenagem linfática e tratamento de edemas."
          }
        ],
        checklist: [
          "Conheço os 4 tipos de corte",
          "Sei quando usar cada corte",
          "Conheço os acessórios necessários"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 4 — FUNDAMENTOS DA APLICAÇÃO (10h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Fundamentos da Aplicação",
    descricao: "Princípios básicos, preparativos, fluxograma e cuidados",
    icone: "ClipboardList",
    cor: "from-green-50 to-emerald-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Princípios Básicos e Preparativos",
        descricao: "Preparo da pele, arredondamento das pontas e etapas de aplicação",
        duracaoMinutos: 45,
        conteudo: `# Princípios Básicos e Preparativos

## Princípios Básicos de Aplicação

| Princípio | Descrição |
|---|---|
| **Preparo da pele** | Limpa, seca, sem óleos ou cremes |
| **Arredondamento das pontas** | Evita que a bandagem descole precocemente |
| **Ativação do adesivo** | Friccionar após aplicação para ativar a cola com calor |
| **Âncoras sem tensão** | Extremidades sempre sem tensão |

## Etapas para Aplicação

| Etapa | Procedimento |
|---|---|
| **1. Avaliação** | Anamnese, exame físico, identificação da disfunção |
| **2. Escolha da técnica** | Baseada no objetivo terapêutico |
| **3. Medição** | Dimensionamento da bandagem necessária |
| **4. Corte** | Conforme a técnica escolhida |
| **5. Posicionamento** | Alongamento ou posição específica |
| **6. Aplicação** | Tensão adequada para cada caso |
| **7. Ativação** | Fricção para ativar o adesivo |`,
        quiz: [
          {
            pergunta: "Por que as pontas da bandagem devem ser arredondadas?",
            opcoes: ["Estética", "Evitar descolamento precoce", "Aumentar a tensão", "Facilitar a remoção"],
            respostaCorreta: 1,
            explicacao: "O arredondamento das pontas evita que a bandagem descole precocemente, aumentando sua durabilidade."
          }
        ],
        checklist: [
          "Sei os princípios básicos de aplicação",
          "Conheço as 7 etapas de aplicação",
          "Entendo a importância do preparo da pele"
        ]
      },
      {
        titulo: "Fluxograma do Método",
        descricao: "Raciocínio clínico da avaliação até as orientações ao paciente",
        duracaoMinutos: 40,
        conteudo: `# Fluxograma para Aplicação do Método

## Sequência Clínica

### 1. AVALIAÇÃO
Anamnese + Exame Físico

### 2. IDENTIFICAÇÃO DA DISFUNÇÃO
Muscular | Fascial | Articular | Neural | Linfática | Visceral

### 3. DEFINIÇÃO DO OBJETIVO
Ativar | Relaxar | Suportar | Drenar | Corrigir | Estabilizar

### 4. ESCOLHA DA TÉCNICA
Corte + Tensão + Direção

### 5. APLICAÇÃO
Posicionamento + Colagem

### 6. ORIENTAÇÕES AO PACIENTE
Duração | Cuidados | Sinais de alerta

> O raciocínio clínico é fundamental: sem uma avaliação completa, a escolha da técnica será inadequada e os resultados comprometidos.`,
        quiz: [
          {
            pergunta: "Qual é a primeira etapa do fluxograma de aplicação?",
            opcoes: ["Escolha da técnica", "Aplicação", "Avaliação (Anamnese + Exame Físico)", "Definição do objetivo"],
            respostaCorreta: 2,
            explicacao: "A primeira etapa é sempre a Avaliação, com anamnese e exame físico, para identificar a disfunção antes de qualquer aplicação."
          }
        ],
        checklist: [
          "Conheço o fluxograma completo",
          "Sei a importância da avaliação prévia",
          "Entendo a sequência clínica"
        ]
      },
      {
        titulo: "Cuidados, Precauções e Contraindicações",
        descricao: "Cuidados gerais, precauções especiais e contraindicações absolutas",
        duracaoMinutos: 40,
        conteudo: `# Cuidados, Precauções e Contraindicações

## Cuidados Gerais

| Cuidado | Recomendação |
|---|---|
| **Higiene da pele** | Aplicar sobre pele limpa e seca |
| **Remoção de pelos** | Se necessário, aparar (não raspar) |
| **Tempo de uso** | 3 a 5 dias, conforme orientação |
| **Banho** | Secar suavemente sem esfregar |

## Precauções

| Situação | Cuidado Necessário |
|---|---|
| **Pele sensível** | Teste em pequena área antes |
| **Idosos** | Pele mais frágil, remoção cuidadosa |
| **Crianças** | Supervisão, tempo reduzido |
| **Gestantes** | Evitar região abdominal no 1º trimestre |

## Contraindicações Absolutas

| Condição | Motivo |
|---|---|
| **Pele lesionada ou irritada** | Risco de agravamento |
| **Feridas abertas** | Contaminação |
| **Trombose venosa profunda** | Risco de deslocar coágulos |
| **Alergia ao adesivo** | Reações alérgicas |
| **Infecções ativas** | Disseminação |

## Sinais de Alerta para Remoção

- Irritação na pele
- Coceira intensa
- Aumento da dor
- Bolhas ou vermelhidão`,
        quiz: [
          {
            pergunta: "Qual é uma contraindicação ABSOLUTA para a bandagem elástica?",
            opcoes: ["Pele com pelos", "Trombose venosa profunda", "Pele oleosa", "Dor muscular leve"],
            respostaCorreta: 1,
            explicacao: "A trombose venosa profunda é uma contraindicação absoluta devido ao risco de deslocar coágulos sanguíneos."
          }
        ],
        checklist: [
          "Conheço os cuidados gerais",
          "Sei as precauções para populações especiais",
          "Identifico as contraindicações absolutas",
          "Reconheço sinais de alerta para remoção"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 5 — TÉCNICAS CORRETIVAS (15h · 4 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Técnicas Corretivas",
    descricao: "Técnicas muscular, fascial, articular, neural, linfática e visceral",
    icone: "Target",
    cor: "from-purple-50 to-violet-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Técnica Muscular: Ativação e Relaxamento",
        descricao: "Princípios de ativação e inibição muscular com direção e tensão",
        duracaoMinutos: 50,
        conteudo: `# Técnica Muscular: Ativação e Relaxamento

## Classificação das Técnicas Corretivas

| Técnica | Objetivo |
|---|---|
| **Correção Muscular** | Ativar ou relaxar grupos musculares |
| **Correção Mecânica** | Alinhamento e suporte estrutural |
| **Correção Fascial** | Liberação de tensões na fáscia |
| **Correção Espacial** | Criação de espaço sobre áreas dolorosas |
| **Correção Ligamentar** | Suporte a ligamentos |
| **Correção Tendínea** | Alívio de tensões em tendões |
| **Correção Linfática** | Estímulo à drenagem |

## Ativação Muscular (Tonificação)

| Parâmetro | Valor |
|---|---|
| **Direção** | Da origem para a inserção |
| **Tensão** | 25-35% |
| **Posição do paciente** | Músculo alongado |

## Relaxamento Muscular (Inibição)

| Parâmetro | Valor |
|---|---|
| **Direção** | Da inserção para a origem |
| **Tensão** | 15-25% |
| **Posição do paciente** | Músculo relaxado |

> Dependendo do sentido que colocamos no músculo, pode ocorrer a inibição ou a ativação do grupo muscular trabalhado.`,
        quiz: [
          {
            pergunta: "Para ATIVAR um músculo, a bandagem deve ser aplicada em qual direção?",
            opcoes: ["Da inserção para a origem", "Da origem para a inserção", "Em qualquer direção", "Perpendicular ao músculo"],
            respostaCorreta: 1,
            explicacao: "Para ativação muscular, a bandagem é aplicada da origem para a inserção, com tensão de 25-35%."
          }
        ],
        checklist: [
          "Diferencio ativação e relaxamento muscular",
          "Sei a direção correta para cada objetivo",
          "Conheço os parâmetros de tensão"
        ]
      },
      {
        titulo: "Técnicas Ligamentar, Tendínea e Articular",
        descricao: "Estabilização ligamentar, descompressão tendínea e correções articulares",
        duracaoMinutos: 50,
        conteudo: `# Técnicas Ligamentar, Tendínea e Articular

## Ligamentar vs. Tendínea

| Aspecto | Ligamento | Tendão |
|---|---|---|
| **Objetivo** | Estabilização, propriocepção | Alívio de tensão, descompressão |
| **Tensão** | 50-75% | 25-50% |
| **Aplicação** | Sobre o ligamento em Y ou I | Sobre o tendão em Y |

## Técnica Articular

### Objetivos
- Estabilização de articulações hipermóveis
- Facilitação de articulações hipomóveis
- Correção de desalinhamentos
- Alívio de dores articulares

| Tipo de Disfunção | Tensão | Direção |
|---|---|---|
| **Hipermobilidade** | 50-75% | Estabilizadora |
| **Hipomobilidade** | 15-25% | Facilitadora |`,
        quiz: [
          {
            pergunta: "Qual a tensão indicada para suporte ligamentar?",
            opcoes: ["0-15%", "15-25%", "50-75%", "75-100%"],
            respostaCorreta: 2,
            explicacao: "Para suporte ligamentar usa-se tensão de 50-75%, promovendo estabilização e propriocepção."
          }
        ],
        checklist: [
          "Diferencio técnica ligamentar da tendínea",
          "Conheço os parâmetros articulares",
          "Sei tratar hiper e hipomobilidade"
        ]
      },
      {
        titulo: "Técnicas Fascial e Neural",
        descricao: "Liberação fascial, correção de aderências e descompressão nervosa",
        duracaoMinutos: 45,
        conteudo: `# Técnicas Fascial e Neural

## Técnica Fascial

A bandagem atua sobre o tecido conjuntivo, promovendo liberação de tensões e encurtamentos. Indicações:

- Fáscias tensionadas
- Aderências
- Cicatrizes
- Restrições de movimento

## Técnica Neural

Indicada para compressões e sensibilizações nervosas:

| Nervo | Pontos de Aplicação |
|---|---|
| **Ciático** | Trajeto posterior da coxa |
| **Mediano** | Trajeto no antebraço |
| **Ulnar** | Região do cotovelo e antebraço |`,
        quiz: [
          {
            pergunta: "Para qual condição a técnica fascial é indicada?",
            opcoes: ["Edemas", "Aderências e cicatrizes", "Instabilidade articular", "Ativação muscular"],
            respostaCorreta: 1,
            explicacao: "A técnica fascial é indicada para liberação de fáscias tensionadas, aderências, cicatrizes e restrições de movimento."
          }
        ],
        checklist: [
          "Entendo a técnica fascial",
          "Conheço as indicações neurais",
          "Sei os principais nervos abordados"
        ]
      },
      {
        titulo: "Técnica Linfática e Visceral",
        descricao: "Correção linfática com leque e aplicações viscerais",
        duracaoMinutos: 45,
        conteudo: `# Técnica Linfática e Visceral

## Técnica Linfática (Correção Espacial)

Ao erguer a pele, a bandagem gera uma pressão negativa que facilita o fluxo linfático.

### Aplicação para Edemas e Hematomas

| Parâmetro | Valor |
|---|---|
| **Tensão** | 0-15% (mínima ou nenhuma) |
| **Corte** | Em leque ou múltiplas tiras |
| **Direção** | Em direção aos linfonodos |

## Técnica Visceral

Aplicações para disfunções viscerais, considerando as relações metaméricas:

- Perda de mobilidade visceral
- Ptoses
- Relações com áreas reflexas`,
        quiz: [
          {
            pergunta: "Qual tensão é usada na técnica linfática?",
            opcoes: ["25-50%", "50-75%", "0-15%", "75-100%"],
            respostaCorreta: 2,
            explicacao: "Na técnica linfática utiliza-se tensão de 0-15% (mínima ou nenhuma), com corte em leque, em direção aos linfonodos."
          }
        ],
        checklist: [
          "Domino a técnica linfática",
          "Sei os parâmetros de aplicação",
          "Conheço a técnica visceral"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 6 — TÉCNICAS POR REGIÃO (20h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Técnicas de Aplicação por Região",
    descricao: "Aplicações na coluna vertebral, membros superiores e inferiores",
    icone: "MapPin",
    cor: "from-orange-50 to-red-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Aplicações na Coluna Vertebral",
        descricao: "Técnicas para regiões cervical, torácica e lombar",
        duracaoMinutos: 55,
        conteudo: `# Aplicações na Coluna Vertebral

## Região Cervical

| Indicação | Técnica | Tensão |
|---|---|---|
| **Tensão cervical** | Relaxamento muscular em Y | 15-25% |
| **Cervicalgia** | Correção espacial em I | 15-25% |
| **Postura** | Correção postural em Y | 25-35% |

## Região Torácica

| Indicação | Técnica | Tensão |
|---|---|---|
| **Hipercifose** | Correção postural | 25-35% |
| **Dor interescapular** | Relaxamento de trapézio | 15-25% |

## Região Lombar

| Indicação | Técnica | Tensão |
|---|---|---|
| **Lombalgia** | Correção espacial em I ou Y | 25-35% |
| **Hérnia de disco** | Descompressão | 15-25% |
| **Instabilidade lombar** | Suporte ligamentar | 50-75% |`,
        quiz: [
          {
            pergunta: "Qual tensão é indicada para instabilidade lombar?",
            opcoes: ["0-15%", "15-25%", "25-35%", "50-75%"],
            respostaCorreta: 3,
            explicacao: "Para instabilidade lombar, usa-se suporte ligamentar com tensão de 50-75% para estabilização."
          }
        ],
        checklist: [
          "Domino aplicações cervicais",
          "Sei tratar região torácica",
          "Conheço técnicas para a lombar"
        ]
      },
      {
        titulo: "Aplicações em Membros Superiores",
        descricao: "Ombro, cotovelo, punho e mão — técnicas e tensões",
        duracaoMinutos: 55,
        conteudo: `# Aplicações em Membros Superiores

## Ombro e Cintura Escapular

| Indicação | Técnica | Tensão |
|---|---|---|
| **Síndrome do impacto** | Correção mecânica | 25-35% |
| **Bursite** | Correção espacial | 15-25% |
| **Instabilidade glenoumeral** | Suporte ligamentar | 50-75% |
| **Tendinite do supraespinhoso** | Correção tendínea | 25-50% |

## Cotovelo

| Indicação | Técnica | Tensão |
|---|---|---|
| **Epicondilite lateral** | Relaxamento de extensores | 25-35% |
| **Epitrocleíte** | Relaxamento de flexores | 25-35% |

## Punho e Mão

| Indicação | Técnica | Tensão |
|---|---|---|
| **Tendinite de Quervain** | Correção tendínea | 25-35% |
| **Síndrome do túnel do carpo** | Descompressão neural | 15-25% |
| **Artrite** | Correção espacial | 15-25% |`,
        quiz: [
          {
            pergunta: "Qual técnica é indicada para síndrome do túnel do carpo?",
            opcoes: ["Ativação muscular", "Suporte ligamentar", "Descompressão neural", "Correção fascial"],
            respostaCorreta: 2,
            explicacao: "Para a síndrome do túnel do carpo, usa-se descompressão neural com tensão de 15-25%."
          }
        ],
        checklist: [
          "Domino aplicações no ombro",
          "Sei tratar cotovelo e punho",
          "Conheço as tensões por indicação"
        ]
      },
      {
        titulo: "Aplicações em Membros Inferiores",
        descricao: "Quadril, joelho, tornozelo e pé — técnicas e tensões",
        duracaoMinutos: 55,
        conteudo: `# Aplicações em Membros Inferiores

## Quadril

| Indicação | Técnica | Tensão |
|---|---|---|
| **Bursite de quadril** | Correção espacial | 15-25% |
| **Tendinite dos adutores** | Relaxamento muscular | 25-35% |
| **Síndrome do piriforme** | Liberação neural | 25-35% |

## Joelho

| Indicação | Técnica | Tensão |
|---|---|---|
| **Condromalácia patelar** | Correção postural | 25-35% |
| **Ligamento colateral** | Suporte ligamentar | 50-75% |
| **Tendinite patelar** | Correção tendínea | 25-50% |
| **Edema de joelho** | Correção linfática em leque | 0-15% |

## Tornozelo e Pé

| Indicação | Técnica | Tensão |
|---|---|---|
| **Entorse de tornozelo** | Suporte ligamentar | 50-75% |
| **Fascite plantar** | Correção fascial | 25-35% |
| **Edema de tornozelo** | Correção linfática | 0-15% |`,
        quiz: [
          {
            pergunta: "Qual tensão é usada para correção linfática em edema de joelho?",
            opcoes: ["0-15%", "25-35%", "50-75%", "75-100%"],
            respostaCorreta: 0,
            explicacao: "Para edemas, a correção linfática utiliza tensão de 0-15% com corte em leque."
          }
        ],
        checklist: [
          "Domino aplicações no quadril",
          "Sei tratar joelho com diferentes técnicas",
          "Conheço aplicações para tornozelo e pé"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 7 — APLICAÇÕES CLÍNICAS ESPECÍFICAS (15h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Aplicações Clínicas Específicas",
    descricao: "Ortopedia, neurologia, estética/linfologia e postura",
    icone: "Stethoscope",
    cor: "from-rose-50 to-pink-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Aplicações na Ortopedia e Neurologia",
        descricao: "Síndrome do impacto, tendinites, paralisia cerebral e sialorreia",
        duracaoMinutos: 55,
        conteudo: `# Aplicações na Ortopedia e Neurologia

## Ortopedia

| Condição | Abordagem |
|---|---|
| **Síndrome do impacto do ombro** | Alívio da tensão muscular, correção mecânica |
| **Bursite de quadril** | Redução da pressão, alívio da dor |
| **Condromalácia patelar** | Correção postural, realinhamento |
| **Tendinites** | Descompressão, relaxamento muscular |
| **Entorses** | Suporte ligamentar, propriocepção |

## Neurologia

### Paralisia Cerebral
A bandagem é uma abordagem complementar para melhorar a resposta proprioceptiva, a aptidão física, bem como a função motora grossa e as atividades da vida diária.

### Sialorreia
A bandagem elástica é uma opção para ajudar no controle da sialorreia, condição que afeta a deglutição da saliva, muito comum em quadros de paralisia cerebral.`,
        quiz: [
          {
            pergunta: "Para condromalácia patelar, qual abordagem é indicada?",
            opcoes: ["Descompressão neural", "Correção postural e realinhamento", "Técnica linfática", "Relaxamento de flexores"],
            respostaCorreta: 1,
            explicacao: "Para condromalácia patelar, a abordagem é correção postural com realinhamento patelar."
          }
        ],
        checklist: [
          "Conheço as aplicações ortopédicas",
          "Entendo o uso neurológico",
          "Sei tratar paralisia cerebral com bandagem"
        ]
      },
      {
        titulo: "Aplicações na Estética e Linfologia",
        descricao: "Edemas, hematomas, celulite e cicatrizes",
        duracaoMinutos: 45,
        conteudo: `# Aplicações na Estética e Linfologia

| Condição | Técnica | Objetivo |
|---|---|---|
| **Edema pós-operatório** | Correção linfática em leque | Redução do inchaço |
| **Hematomas** | Correção linfática | Aceleração da reabsorção |
| **Fibroedema geloide (celulite)** | Correção fascial | Melhora da circulação local |
| **Cicatrizes** | Correção fascial | Liberação de aderências |`,
        quiz: [
          {
            pergunta: "Qual técnica é usada para fibroedema geloide (celulite)?",
            opcoes: ["Correção linfática", "Correção fascial", "Ativação muscular", "Suporte ligamentar"],
            respostaCorreta: 1,
            explicacao: "Para fibroedema geloide utiliza-se correção fascial, melhorando a circulação local."
          }
        ],
        checklist: [
          "Sei tratar edemas pós-operatórios",
          "Conheço a abordagem para celulite",
          "Domino técnicas para cicatrizes"
        ]
      },
      {
        titulo: "Aplicações na Postura",
        descricao: "Ombros caídos, cabeça anterior, hipercifose e escoliose",
        duracaoMinutos: 45,
        conteudo: `# Aplicações na Postura

A bandagem elástica é um recurso para melhorar a postura, podendo ser colocada na região dos ombros, trapézio e joelhos.

## Desvios Posturais

| Desvio Postural | Abordagem |
|---|---|
| **Ombros caídos** | Ativação de trapézio médio e inferior |
| **Cabeça anterior** | Relaxamento de peitorais, ativação de extensores |
| **Hipercifose** | Correção postural torácica |
| **Escoliose** | Correção assimétrica personalizada |`,
        quiz: [
          {
            pergunta: "Para ombros caídos, quais músculos devem ser ATIVADOS?",
            opcoes: ["Peitorais", "Trapézio médio e inferior", "Esternocleidomastóideo", "Deltoides"],
            respostaCorreta: 1,
            explicacao: "Para ombros caídos, ativa-se o trapézio médio e inferior para corrigir a postura."
          }
        ],
        checklist: [
          "Sei tratar ombros caídos",
          "Conheço a abordagem para hipercifose",
          "Entendo correção de escoliose"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 8 — EVIDÊNCIAS E RACIOCÍNIO CLÍNICO (8h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Evidências Científicas e Raciocínio Clínico",
    descricao: "Evidências atuais, raciocínio biomecânico e abordagem disfuncional",
    icone: "BookOpen",
    cor: "from-slate-50 to-gray-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Evidências Científicas Atuais",
        descricao: "Estudos sobre analgesia, ativação muscular, drenagem e propriocepção",
        duracaoMinutos: 45,
        conteudo: `# Evidências Científicas Atuais

## Principais Estudos

| Estudo | Achados | Nível de Evidência |
|---|---|---|
| **Efeito analgésico** | Redução da dor em condições musculoesqueléticas | Moderado |
| **Ativação muscular** | Melhora da atividade elétrica em alguns estudos | Controversa |
| **Drenagem linfática** | Redução de edema em pós-operatório | Moderado |
| **Propriocepção** | Melhora da percepção articular | Bom |

## Raciocínio Clínico

O curso desenvolve raciocínio clínico com ênfase em:
- Biomecânica
- Cinesiologia
- Plasticidade neural
- Controle motor`,
        quiz: [
          {
            pergunta: "Qual efeito da bandagem possui nível de evidência 'Bom'?",
            opcoes: ["Analgésico", "Ativação muscular", "Drenagem linfática", "Propriocepção"],
            respostaCorreta: 3,
            explicacao: "A propriocepção é o efeito com melhor nível de evidência, demonstrando melhora da percepção articular."
          }
        ],
        checklist: [
          "Conheço as evidências atuais",
          "Entendo os níveis de evidência",
          "Sei aplicar raciocínio clínico"
        ]
      },
      {
        titulo: "Abordagem Disfuncional por Tecido",
        descricao: "Disfunções musculares, conjuntivas, articulares, neurais e viscerais",
        duracaoMinutos: 40,
        conteudo: `# Abordagem Disfuncional por Tecido

A abordagem disfuncional permite trabalhar com alterações específicas de cada tecido:

| Tecido | Disfunções Tratáveis |
|---|---|
| **Muscular** | Hipotonias, hipertonias, espasmos |
| **Conjuntivo** | Encurtamentos, tensionamentos de fáscias e ligamentos |
| **Articular** | Hipermobilidades, hipomobilidades |
| **Neural** | Compressão, sensibilização, perda de complacência |
| **Visceral** | Perda da mobilidade, ptose, relações metaméricas |

> Cada tecido exige uma abordagem específica com tensão, direção e corte adequados ao tipo de disfunção identificada.`,
        quiz: [
          {
            pergunta: "Qual disfunção é tratável no tecido neural?",
            opcoes: ["Hipotonia", "Encurtamento fascial", "Compressão e sensibilização", "Ptose visceral"],
            respostaCorreta: 2,
            explicacao: "No tecido neural, as disfunções tratáveis são compressão, sensibilização e perda de complacência."
          }
        ],
        checklist: [
          "Conheço disfunções por tecido",
          "Sei escolher a abordagem adequada",
          "Entendo relações metaméricas"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 9 — ANAMNESE E AVALIAÇÃO (6h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Anamnese e Avaliação do Paciente",
    descricao: "Importância da avaliação individualizada e modelo de ficha",
    icone: "FileText",
    cor: "from-teal-50 to-cyan-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Avaliação Individualizada",
        descricao: "Importância da avaliação completa e exame físico detalhado",
        duracaoMinutos: 40,
        conteudo: `# Avaliação Individualizada

> "Nenhum atendimento é padronizado. Avaliamos as necessidades reais de cada paciente e elaboramos o programa mais assertivo para cada caso."

## Princípios da Avaliação

Através de uma avaliação detalhada do quadro do paciente, juntamente com um exame físico completo e atenção totalmente individualizada, é possível:

- Identificar as características específicas do caso
- Traçar uma conduta de tratamento personalizada
- Escolher recursos adequados para cada situação
- Acompanhar a evolução do paciente`,
        quiz: [
          {
            pergunta: "Qual é o princípio fundamental da avaliação em bandagem elástica?",
            opcoes: ["Padronizar todos os atendimentos", "Individualizar cada avaliação", "Seguir protocolos fixos", "Aplicar a mesma técnica sempre"],
            respostaCorreta: 1,
            explicacao: "Nenhum atendimento é padronizado — a avaliação individualizada é o princípio fundamental para resultados eficazes."
          }
        ],
        checklist: [
          "Entendo a importância da individualização",
          "Sei realizar um exame físico completo",
          "Conheço os princípios da avaliação"
        ]
      },
      {
        titulo: "Modelo de Ficha de Anamnese",
        descricao: "Modelo completo com identificação, histórico, avaliação e plano de tratamento",
        duracaoMinutos: 40,
        conteudo: `# Modelo de Ficha de Anamnese

## Estrutura da Ficha

### 1. IDENTIFICAÇÃO
- Nome completo, idade, profissão
- Contato (telefone, e-mail)

### 2. HISTÓRICO DE SAÚDE
- Doenças pré-existentes
- Medicamentos em uso
- Alergias (especialmente a adesivos)
- Histórico de trombose e problemas circulatórios
- Problemas de pele

### 3. HISTÓRICO DA QUEIXA
- Principal queixa e região afetada
- Tempo do problema
- Como começou (trauma / gradual / sem causa aparente)
- Fatores que melhoram e pioram
- Tratamentos já realizados

### 4. AVALIAÇÃO FÍSICA
- Inspeção visual e palpação
- Edema e hematoma (presente/ausente)
- Cicatrizes e testes específicos

### 5. DIAGNÓSTICO CINESIOLÓGICO FUNCIONAL
- Disfunção identificada
- Tecido envolvido (muscular, fascial, ligamentar, tendíneo, neural, linfático)

### 6. PLANO DE TRATAMENTO
- Objetivo da bandagem
- Técnica escolhida
- Tensão a ser aplicada
- Tempo previsto de uso
- Orientações ao paciente`,
        quiz: [
          {
            pergunta: "Qual informação é CRÍTICA investigar nas alergias do paciente?",
            opcoes: ["Alergia a alimentos", "Alergia a adesivos", "Alergia a medicamentos", "Alergia a pólen"],
            respostaCorreta: 1,
            explicacao: "É fundamental investigar alergia a adesivos, pois a bandagem usa cola hipoalergênica que pode causar reações em pacientes sensíveis."
          }
        ],
        checklist: [
          "Conheço a estrutura completa da ficha",
          "Sei coletar histórico de saúde",
          "Domino o diagnóstico cinesiológico funcional",
          "Sei elaborar o plano de tratamento"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 10 — ÉTICA E BIOSSEGURANÇA (4h · 1 aula)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Ética Profissional e Biossegurança",
    descricao: "Princípios éticos, limites de atuação e normas de biossegurança",
    icone: "Shield",
    cor: "from-emerald-50 to-green-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Ética e Biossegurança na Aplicação",
        descricao: "Princípios éticos, procedimentos de biossegurança e boas práticas",
        duracaoMinutos: 45,
        conteudo: `# Ética Profissional e Biossegurança

## Princípios Éticos

| Princípio | Aplicação |
|---|---|
| **Competência** | Aplicar apenas técnicas nas quais tenha formação adequada |
| **Informação** | Esclarecer o paciente sobre o procedimento |
| **Limites** | Não prometer resultados irreais |
| **Encaminhamento** | Referenciar a outros profissionais quando necessário |

## Biossegurança na Aplicação

| Item | Procedimento |
|---|---|
| **Higienização das mãos** | Antes e após cada atendimento |
| **EPIs** | Luvas quando houver contato com fluidos |
| **Limpeza da pele** | Álcool 70% antes da aplicação |
| **Tesoura** | Higienizada entre pacientes |
| **Descarte** | Bandagem usada em lixo comum (não contaminado) |`,
        quiz: [
          {
            pergunta: "Quando é necessário encaminhar o paciente a outro profissional?",
            opcoes: ["Nunca", "Quando a disfunção está fora de sua competência", "Apenas em emergências", "Quando o paciente pede"],
            respostaCorreta: 1,
            explicacao: "O princípio do encaminhamento exige referenciar a outros profissionais quando a disfunção está fora de sua área de competência."
          }
        ],
        checklist: [
          "Conheço os princípios éticos",
          "Sei os procedimentos de biossegurança",
          "Entendo os limites de atuação",
          "Domino as normas de higiene"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 11 — MERCADO DE TRABALHO (6h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Mercado de Trabalho e Oportunidades",
    descricao: "Onde atuar, público-alvo, precificação e investimento",
    icone: "TrendingUp",
    cor: "from-indigo-50 to-blue-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Onde Atuar e Público-Alvo",
        descricao: "Locais de atuação, demanda e estratégias por perfil de paciente",
        duracaoMinutos: 40,
        conteudo: `# Onde Atuar e Público-Alvo

## Locais de Atuação

| Local | Demanda |
|---|---|
| **Clínicas de fisioterapia** | Alta, especialmente em ortopedia e esportiva |
| **Consultórios de quiropraxia/osteopatia** | Recurso complementar valioso |
| **Clínicas de estética** | Tratamento de edemas e hematomas |
| **Academias** | Atendimento a atletas e alunos |
| **Eventos esportivos** | Demanda pontual mas bem remunerada |

## Público-Alvo

| Perfil | Características | Estratégia |
|---|---|---|
| **Atletas** | Lesões esportivas, prevenção | Pacotes de acompanhamento |
| **Pacientes ortopédicos** | Dores crônicas, pós-operatório | Integração com outros tratamentos |
| **Problemas posturais** | Dores nas costas, ombros | Correção postural |
| **Idosos** | Estabilidade articular | Técnicas suaves e seguras |
| **Pacientes neurológicos** | Paralisia cerebral, AVC | Abordagem especializada |`,
        quiz: [
          {
            pergunta: "Qual estratégia é mais adequada para atletas?",
            opcoes: ["Sessão única", "Pacotes de acompanhamento", "Atendimento mensal", "Apenas emergências"],
            respostaCorreta: 1,
            explicacao: "Para atletas, a estratégia mais adequada são pacotes de acompanhamento contínuo para prevenção e tratamento de lesões."
          }
        ],
        checklist: [
          "Conheço os locais de atuação",
          "Sei adaptar a estratégia ao público",
          "Identifico demandas por nicho"
        ]
      },
      {
        titulo: "Precificação e Investimento",
        descricao: "Tabela de preços, pacotes, custos e retorno sobre investimento",
        duracaoMinutos: 40,
        conteudo: `# Precificação e Investimento

## Tabela de Preços

| Tipo de Serviço | Preço Médio Sugerido |
|---|---|
| **Aplicação isolada (1 região)** | R$ 50-100 |
| **Aplicação múltipla (2-3 regiões)** | R$ 100-180 |
| **Pacote de 4 aplicações** | R$ 180-320 (15-20% desconto) |
| **Avaliação + primeira aplicação** | R$ 120-200 |
| **Curso de formação (para profissionais)** | R$ 650-1200 |

## Custos e Investimento

| Item | Custo Médio |
|---|---|
| **Rolo de bandagem (5m)** | R$ 30-60 |
| **Tesoura profissional** | R$ 20-40 |
| **Material para treinamento** | R$ 100-200 |

> Com custo baixo de material e alta demanda, o retorno sobre investimento é excelente para o profissional qualificado.`,
        quiz: [
          {
            pergunta: "Qual o preço médio sugerido para uma aplicação isolada?",
            opcoes: ["R$ 20-50", "R$ 50-100", "R$ 150-250", "R$ 300-500"],
            respostaCorreta: 1,
            explicacao: "O preço médio sugerido para uma aplicação isolada (1 região) é de R$ 50 a R$ 100."
          }
        ],
        checklist: [
          "Conheço a tabela de preços",
          "Sei montar pacotes com desconto",
          "Entendo os custos do material"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 12 — TENDÊNCIAS E INOVAÇÕES (4h · 1 aula)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Tendências e Inovações",
    descricao: "Novas abordagens, tecnologias emergentes e futuro da técnica",
    icone: "Rocket",
    cor: "from-fuchsia-50 to-pink-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Novas Abordagens e Tecnologias",
        descricao: "Integração com osteopatia, abordagem visceral e materiais inovadores",
        duracaoMinutos: 45,
        conteudo: `# Tendências e Inovações

## Novas Abordagens

| Tendência | Descrição |
|---|---|
| **Integração com osteopatia** | Bandagem baseada em princípios osteopáticos |
| **Abordagem visceral** | Técnicas para disfunções viscerais |
| **Bandagens neurofuncionais** | Aplicações específicas para neurologia |

## Tecnologias Emergentes

| Tecnologia | Aplicação |
|---|---|
| **Bandagens com micropartículas** | Liberação de ativos terapêuticos |
| **Aplicativos de orientação** | Guias para aplicação e manutenção |
| **Materiais biodegradáveis** | Sustentabilidade |`,
        quiz: [
          {
            pergunta: "Qual tecnologia emergente permite liberação de ativos terapêuticos?",
            opcoes: ["Aplicativos de orientação", "Bandagens com micropartículas", "Materiais biodegradáveis", "Bandagens com sensores"],
            respostaCorreta: 1,
            explicacao: "Bandagens com micropartículas representam uma inovação que permite a liberação de ativos terapêuticos durante o uso."
          }
        ],
        checklist: [
          "Conheço as tendências atuais",
          "Sei das tecnologias emergentes",
          "Entendo o futuro da técnica"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 13 — BÔNUS E CERTIFICAÇÃO (4h · 1 aula)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Bônus e Certificação",
    descricao: "Bônus exclusivos, suporte pós-curso e certificado de conclusão",
    icone: "Award",
    cor: "from-yellow-50 to-amber-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Bônus, Suporte e Certificação",
        descricao: "Material exclusivo, grupo VIP, fornecedores e certificado profissional",
        duracaoMinutos: 35,
        conteudo: `# Bônus e Certificação

## Bônus Exclusivos

| Bônus | Descrição |
|---|---|
| **Apostila completa** | Material de consulta com todas as técnicas |
| **Bandagem para prática** | Material incluso para treinamento |
| **Grupo VIP de alunas** | Comunidade exclusiva para troca de experiências |
| **Lista de fornecedores** | Onde comprar bandagens de qualidade |
| **Vídeos de técnicas** | Demonstrações passo a passo |

## Suporte Pós-Curso

- Acesso vitalício ao conteúdo
- Atualizações periódicas
- Grupo de discussão online
- Webinars com especialistas

## Certificação

Ao finalizar o curso, o aluno recebe certificado de conclusão, comprovando as habilidades adquiridas e podendo utilizar como diferencial profissional.

🏆 **Parabéns! Você é agora um profissional qualificado em Bandagem Elástica!**`,
        quiz: [
          {
            pergunta: "O que o aluno recebe ao concluir o curso?",
            opcoes: ["Apenas apostila", "Certificado de conclusão", "Nada além do conhecimento", "Somente vídeos"],
            respostaCorreta: 1,
            explicacao: "Ao finalizar o curso, o aluno recebe certificado de conclusão como diferencial profissional."
          }
        ],
        checklist: [
          "Conheço os bônus disponíveis",
          "Sei utilizar o suporte pós-curso",
          "Concluí todas as etapas do curso"
        ]
      }
    ]
  }
];
