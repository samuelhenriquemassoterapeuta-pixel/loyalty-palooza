import { type ModuloContent } from "@/data/cursoVendasContent";

export const cursoAnatomiaData: ModuloContent[] = [
  {
    titulo: "Introdução à Anatomia Humana",
    descricao: "Conceitos fundamentais, planos anatômicos e terminologia",
    icone: "Lightbulb",
    cor: "from-rose-50 to-pink-50",
    aulas: [
      {
        titulo: "Posição Anatômica e Planos de Referência",
        descricao: "A linguagem universal da anatomia e orientação corporal",
        duracaoMinutos: 15,
        conteudo: `# Posição Anatômica e Planos de Referência

## A Base da Comunicação Anatômica

### Posição Anatômica

- Corpo em pé, ereto
- Cabeça e olhos voltados para frente
- Braços ao lado do corpo, palmas voltadas para frente
- Pernas estendidas, pés paralelos

> Esta posição é o ponto de partida para descrever qualquer estrutura ou movimento.

### Planos Anatômicos

- **Plano Sagital**: divide o corpo em direita e esquerda
- **Plano Frontal (Coronal)**: divide o corpo em anterior e posterior
- **Plano Transversal (Horizontal)**: divide o corpo em superior e inferior

### Termos Direcionais

- Superior / Inferior
- Anterior (ventral) / Posterior (dorsal)
- Medial / Lateral
- Proximal / Distal
- Superficial / Profundo

### Movimentos Básicos

- Flexão / Extensão
- Abdução / Adução
- Rotação (interna/externa)
- Circundução

> Entender esses conceitos é fundamental para avaliar e descrever movimentos e posturas.`,

        quiz: [
          {
            pergunta: "Qual plano anatômico divide o corpo em parte anterior e posterior?",
            opcoes: ["Plano Sagital", "Plano Frontal (Coronal)", "Plano Transversal", "Plano Oblíquo"],
            respostaCorreta: 1,
            explicacao: "O plano frontal (ou coronal) divide o corpo em parte anterior (frente) e posterior (trás). É essencial para avaliar desvios posturais laterais como a escoliose."
          },
          {
            pergunta: "O que significa o termo 'proximal' em anatomia?",
            opcoes: ["Afastado da superfície", "Próximo à linha média", "Próximo à origem/tronco", "Na frente do corpo"],
            respostaCorreta: 2,
            explicacao: "Proximal significa próximo à origem ou tronco. Exemplo: o ombro é proximal ao punho."
          }
        ],
        checklist: [
          "Sei descrever a posição anatômica corretamente",
          "Identifico os 3 planos anatômicos (sagital, frontal, transversal)",
          "Uso termos direcionais corretos (superior, inferior, medial, lateral)",
          "Conheço os movimentos básicos (flexão, extensão, abdução, adução)",
          "Consigo descrever limitações de movimento usando terminologia anatômica"
        ]
      },
      {
        titulo: "Organização do Corpo Humano",
        descricao: "Dos átomos aos sistemas: níveis de organização biológica",
        duracaoMinutos: 12,
        conteudo: `# Organização do Corpo Humano

## Níveis de Organização

- Nível Químico: átomos e moléculas
- Nível Celular: unidades básicas da vida
- Nível Tecidual: grupos de células com função comum
- Nível Orgânico: órgãos formados por tecidos
- Nível Sistêmico: sistemas de órgãos trabalhando juntos
- Nível Organísmico: organismo completo

### Sistemas do Corpo Humano

- Sistema Tegumentar
- Sistema Esquelético
- Sistema Muscular
- Sistema Nervoso
- Sistema Circulatório
- Sistema Linfático
- Sistema Respiratório
- Sistema Digestório
- Sistema Urinário
- Sistema Reprodutor
- Sistema Endócrino

> Cada sistema tem funções específicas, mas todos interagem para manter a homeostase.

### Importância para Massoterapia

- Conhecer os níveis ajuda a entender como a massagem afeta o corpo
- Fáscias e tecidos conectivos são fundamentais para a prática
- Avaliação sistêmica melhora a abordagem terapêutica`,

        quiz: [
          {
            pergunta: "Qual tipo de tecido é o mais abundante do corpo humano?",
            opcoes: ["Tecido Epitelial", "Tecido Conjuntivo", "Tecido Muscular", "Tecido Nervoso"],
            respostaCorreta: 1,
            explicacao: "O tecido conjuntivo é o mais abundante, incluindo ossos, cartilagens, sangue, linfa, tecido adiposo e fáscia — esta última sendo a mais relevante para massoterapia."
          }
        ],
        checklist: [
          "Conheço os 6 níveis de organização (químico ao organismo)",
          "Identifico os 4 tipos fundamentais de tecido",
          "Entendo a importância da fáscia para massoterapia",
          "Sei listar os 11 sistemas do corpo humano",
          "Compreendo quais sistemas são foco da massoterapia"
        ]
      },
      {
        titulo: "A Pele e o Sistema Tegumentar",
        descricao: "Camadas da pele, funções e relevância para a massoterapia",
        duracaoMinutos: 12,
        conteudo: `# A Pele e o Sistema Tegumentar

## Estrutura da Pele

- Epiderme: camada superficial, proteção e renovação
- Derme: camada média, vascularizada, contém fibras colágenas e elásticas
- Hipoderme: camada profunda, tecido adiposo e receptores sensoriais

### Funções da Pele

- Proteção contra agentes externos
- Regulação térmica
- Sensibilidade tátil e proprioceptiva
- Absorção de substâncias (óleos essenciais)

### Receptores Sensoriais

- Meissner: toque leve e textura
- Merkel: pressão constante
- Pacini: vibração profunda
- Ruffini: estiramento e calor

> Técnicas de massagem ativam diferentes receptores para promover relaxamento e analgesia.

### Renovação da Epiderme

- Ciclo completo: 28 a 30 dias
- Células-tronco no estrato basal
- Descamação no estrato córneo

### Contraindicações Tegumentares

- Lesões abertas
- Infecções cutâneas
- Dermatites ativas

> Na dúvida, evite massagear áreas comprometidas.`,

        quiz: [
          {
            pergunta: "Qual receptor sensorial é ativado durante técnicas de vibração e percussão?",
            opcoes: ["Meissner", "Merkel", "Pacini", "Ruffini"],
            respostaCorreta: 2,
            explicacao: "O corpúsculo de Pacini, localizado na hipoderme, é responsável por detectar vibrações profundas — sendo ativado durante técnicas de vibração e percussão na massagem."
          },
          {
            pergunta: "Qual é o ciclo de renovação completa da epiderme?",
            opcoes: ["7 a 10 dias", "14 a 21 dias", "28 a 30 dias", "45 a 60 dias"],
            respostaCorreta: 2,
            explicacao: "A epiderme se renova completamente a cada 28 a 30 dias, desde as células-tronco do estrato basal até a descamação no estrato córneo."
          }
        ],
        checklist: [
          "Conheço as 3 camadas da pele (epiderme, derme, hipoderme)",
          "Sei identificar os 5 receptores sensoriais e sua função na massagem",
          "Conheço as contraindicações tegumentares",
          "Aplico a regra de ouro: na dúvida, NÃO massageio",
          "Entendo como óleos essenciais penetram pela pele"
        ]
      }
    ]
  },
  {
    titulo: "Sistema Esquelético",
    descricao: "Ossos, articulações e referências ósseas para massoterapeutas",
    icone: "Target",
    cor: "from-slate-50 to-gray-50",
    aulas: [
      {
        titulo: "Ossos do Esqueleto Axial",
        descricao: "Crânio, coluna vertebral, costelas e esterno",
        duracaoMinutos: 18,
        conteudo: `# Ossos do Esqueleto Axial

## Crânio

- Ossos do crânio: frontal, parietal, occipital, temporal
- Suturas: articulações fibrosas imoveis
- Importância para massagem craniana e pontos gatilho

## Coluna Vertebral

- 7 vértebras cervicais (C1-C7)
- 12 vértebras torácicas (T1-T12)
- 5 vértebras lombares (L1-L5)
- Sacro e cóccix
- Curvaturas fisiológicas: lordose cervical e lombar, cifose torácica

## Costelas e Esterno

- 12 pares de costelas
- Costelas verdadeiras, falsas e flutuantes
- Esterno: manúbrio, corpo e processo xifoide

### Referências Palpatórias

- C7 (proeminente): processo espinhoso mais saliente da cervical
- T7: nível do ângulo inferior da escápula
- L4: nível da crista ilíaca

> Conhecer essas referências é essencial para avaliação postural e técnicas de massagem.`,

        quiz: [
          {
            pergunta: "Qual vértebra cervical é a principal referência palpatória na base do pescoço?",
            opcoes: ["C1 (Atlas)", "C2 (Áxis)", "C5", "C7 (Proeminente)"],
            respostaCorreta: 3,
            explicacao: "C7 é chamada de 'proeminente' por possuir o processo espinhoso mais saliente da coluna cervical, sendo a principal referência palpatória na base do pescoço."
          },
          {
            pergunta: "Quais discos intervertebrais são os mais sobrecarregados e propensos a hérnias?",
            opcoes: ["C4-C5 e C5-C6", "T11-T12 e T12-L1", "L4-L5 e L5-S1", "S1-S2 e S2-S3"],
            respostaCorreta: 2,
            explicacao: "Os discos L4-L5 e L5-S1 são os mais sobrecarregados por suportarem maior carga de peso corporal, sendo os locais mais comuns de hérnias de disco."
          }
        ],
        checklist: [
          "Sei localizar C7 (proeminente) por palpação",
          "Conheço as 5 regiões da coluna e suas curvaturas",
          "Identifico os desvios posturais comuns (hiperlordose, hipercifose, escoliose)",
          "Localizo referências palpatórias do crânio para massagem craniana",
          "Conheço a diferença entre costelas verdadeiras, falsas e flutuantes"
        ]
      },
      {
        titulo: "Ossos do Esqueleto Apendicular",
        descricao: "Membros superiores, inferiores e cinturas",
        duracaoMinutos: 18,
        conteudo: `# Ossos do Esqueleto Apendicular

## Membros Superiores

- Cintura escapular: escápula e clavícula
- Braço: úmero
- Antebraço: rádio e ulna
- Mão: carpos, metacarpos e falanges

## Membros Inferiores

- Cintura pélvica: ilíaco, ísquio, púbis
- Coxa: fêmur
- Perna: tíbia e fíbula
- Pé: tarsos, metatarsos e falanges

### Referências Palpatórias

- Acrômio: extremidade lateral da escápula
- Espinha da escápula: proeminência óssea na escápula
- Ângulo inferior da escápula: nível de T7
- EIAS (Espinha Ilíaca Antero-Superior) e EIPS (Espinha Ilíaca Póstero-Superior)
- Trocânter maior do fêmur

> Palpar essas estruturas é fundamental para avaliação e aplicação de técnicas.`,

        quiz: [
          {
            pergunta: "Qual referência palpatória está ao nível de T7?",
            opcoes: ["Acrômio", "Espinha da escápula", "Ângulo inferior da escápula", "EIAS"],
            respostaCorreta: 2,
            explicacao: "O ângulo inferior da escápula está ao nível de T7, servindo como referência para localizar vértebras torácicas durante avaliação e massagem."
          }
        ],
        checklist: [
          "Sei palpar a escápula completa (espinha, acrômio, borda medial, ângulo inferior)",
          "Localizo EIAS e EIPS por palpação",
          "Identifico o trocânter maior do fêmur",
          "Conheço os ossos do manguito rotador e suas referências",
          "Sei palpar crista ilíaca e maléolos"
        ]
      },
      {
        titulo: "Articulações e Tipos de Movimento",
        descricao: "Classificação articular e amplitude de movimento",
        duracaoMinutos: 15,
        conteudo: `# Articulações e Tipos de Movimento

## Classificação das Articulações

- Fibrosas: imoveis (ex: suturas do crânio)
- Cartilaginosas: pouco móveis (ex: sínfise púbica)
- Sinoviais: móveis, com cápsula articular

## Tipos de Articulações Sinoviais

- Gínglimo (dobradiça): movimento em um eixo (cotovelo)
- Trocoide (pivô): rotação (atlas e áxis)
- Esferoide (bola e soquete): múltiplos eixos (ombro, quadril)
- Plana (artrodia): deslizamento (ossos do carpo)
- Selar (sela): movimento biaxial (articulação carpometacarpal do polegar)
- Elipsóide: movimento biaxial (punho)

## Amplitude de Movimento (ADM)

- Flexão, extensão, abdução, adução, rotação interna e externa, circundução

> Conhecer os tipos articulares ajuda a entender limitações e potencial de movimento.

### Importância para Massoterapia

- Avaliar ADM para identificar restrições
- Aplicar técnicas para melhorar mobilidade articular
- Registrar ADM para acompanhar evolução do cliente`,

        quiz: [
          {
            pergunta: "Qual tipo de articulação sinovial permite a maior amplitude de movimento?",
            opcoes: ["Gínglimo (dobradiça)", "Trocoide (pivô)", "Esferoide (bola e soquete)", "Plana (artrodia)"],
            respostaCorreta: 2,
            explicacao: "A articulação esferoide (bola e soquete), como o ombro e quadril, permite todos os movimentos: flexão, extensão, abdução, adução, rotação e circundução."
          }
        ],
        checklist: [
          "Conheço os 3 tipos de articulação por mobilidade",
          "Identifico os 6 tipos de articulações sinoviais",
          "Sei as amplitudes de movimento normais das principais articulações",
          "Entendo as estruturas articulares (cápsula, líquido sinovial, ligamentos)",
          "Registro ADM do cliente para acompanhar evolução"
        ]
      }
    ]
  },
  {
    titulo: "Sistema Muscular",
    descricao: "Músculos esqueléticos, origem, inserção e função para prática manual",
    icone: "Heart",
    cor: "from-red-50 to-orange-50",
    aulas: [
      {
        titulo: "Fisiologia Muscular Básica",
        descricao: "Contração muscular, tipos de fibras e pontos-gatilho",
        duracaoMinutos: 15,
        conteudo: `# Fisiologia Muscular Básica

## Tipos de Músculos

- Esquelético: voluntário, ligado aos ossos
- Cardíaco: involuntário, coração
- Liso: involuntário, órgãos internos

## Contração Muscular

- Isotônica concêntrica: encurtamento do músculo
- Isotônica excêntrica: alongamento sob tensão
- Isométrica: contração sem mudança de comprimento

## Fibras Musculares

- Tipo I: contração lenta, resistência à fadiga
- Tipo IIa: contração rápida, resistência moderada
- Tipo IIb: contração rápida, fadiga rápida

## Pontos-Gatilho (Trigger Points)

- Áreas hiperirritáveis em músculos tensos
- Causam dor referida e limitação de movimento
- Tratamento: liberação miofascial, pressão isquêmica

> Entender a fisiologia ajuda a aplicar técnicas eficazes e seguras.`,

        quiz: [
          {
            pergunta: "Qual tipo de contração muscular causa mais dor muscular tardia (DOMS)?",
            opcoes: ["Isotônica concêntrica", "Isotônica excêntrica", "Isométrica", "Todas causam igual"],
            respostaCorreta: 1,
            explicacao: "A contração excêntrica (músculo alonga enquanto gera tensão) causa mais microlesões nas fibras musculares, resultando em maior dor muscular tardia."
          },
          {
            pergunta: "Na escala de dor para tratamento de trigger points, qual é o nível ideal?",
            opcoes: ["1-3 (leve)", "3-5 (moderada)", "5-7 (desconforto terapêutico)", "8-10 (intensa)"],
            respostaCorreta: 2,
            explicacao: "O nível ideal é 5-7: abaixo disso não é eficaz para liberação, acima disso causa espasmo protetor que impede a liberação do trigger point."
          }
        ],
        checklist: [
          "Entendo a estrutura do músculo (epimísio, perimísio, endomísio)",
          "Conheço o mecanismo de contração (filamento deslizante)",
          "Diferencio contrações concêntrica, excêntrica e isométrica",
          "Sei identificar e tratar trigger points",
          "Aplico a escala de dor 5-7 para pressão em pontos-gatilho"
        ]
      },
      {
        titulo: "Músculos da Cabeça, Pescoço e Ombros",
        descricao: "Trapézio, ECM, escalenos, suboccipitais e músculos da face",
        duracaoMinutos: 18,
        conteudo: `# Músculos da Cabeça, Pescoço e Ombros

## Trapézio

- Porções superior, média e inferior
- Ações: elevação, retração e depressão da escápula

## Esternocleidomastoideo (ECM)

- Origem: esterno e clavícula
- Inserção: processo mastoide
- Ação: rotação e flexão da cabeça

## Escalenos

- Anterior, médio e posterior
- Função: elevação das costelas e flexão lateral do pescoço
- Síndrome do desfiladeiro torácico: compressão neurovascular

## Suboccipitais

- Pequenos músculos na base do crânio
- Importantes para movimentos finos da cabeça

## Músculos da Face

- Expressão facial e mastigação
- Relevância para massagem facial e relaxamento

> Conhecer esses músculos ajuda a tratar dores cervicais e tensões faciais.`,

        quiz: [
          {
            pergunta: "Qual músculo é o segundo mais envolvido em cervicalgias por postura?",
            opcoes: ["Trapézio superior", "Elevador da escápula", "ECM", "Escalenos"],
            respostaCorreta: 1,
            explicacao: "O elevador da escápula é o segundo músculo mais envolvido em cervicalgias posturais, conectando os processos transversos de C1-C4 ao ângulo superior da escápula."
          }
        ],
        checklist: [
          "Sei palpar os suboccipitais na base do crânio",
          "Localizo o ECM pedindo rotação contra resistência",
          "Conheço o alerta sobre escalenos e síndrome do desfiladeiro torácico",
          "Identifico as 3 porções do trapézio e suas ações",
          "Conheço os 4 músculos do manguito rotador (SITS)"
        ]
      },
      {
        titulo: "Músculos do Tronco e Coluna",
        descricao: "Eretores da espinha, abdominais, quadrado lombar e diafragma",
        duracaoMinutos: 18,
        conteudo: `# Músculos do Tronco e Coluna

## Eretores da Espinha

- Grupo muscular paravertebral
- Mantém postura ereta e extensão da coluna

## Abdominais

- Reto abdominal, oblíquos externo e interno, transverso do abdome
- Função: flexão, rotação e estabilização do tronco

## Quadrado Lombar

- Localizado na região lombar
- Estabiliza a pelve e coluna lombar

## Diafragma

- Principal músculo da respiração
- Separação entre cavidade torácica e abdominal

> Conhecer esses músculos é essencial para avaliação postural e técnicas respiratórias.`,

        quiz: [
          {
            pergunta: "Qual músculo é frequentemente o verdadeiro culpado na 'dor no quadril'?",
            opcoes: ["Eretor da espinha", "Multífidos", "Quadrado lombar", "Transverso do abdome"],
            respostaCorreta: 2,
            explicacao: "O quadrado lombar é frequentemente o verdadeiro culpado em dores referidas ao quadril — seus trigger points referem dor para a articulação sacroilíaca e glúteo."
          }
        ],
        checklist: [
          "Sei palpar o eretor da espinha paravertebral",
          "Entendo a importância do quadrado lombar na lombalgia",
          "Conheço a 'caixa de estabilidade' (transverso + multífidos + diafragma + assoalho pélvico)",
          "Sei aplicar técnicas de liberação diafragmática",
          "Identifico o serrátil anterior e escápula alada"
        ]
      },
      {
        titulo: "Músculos dos Membros Superiores e Inferiores",
        descricao: "Bíceps, tríceps, flexores, extensores, quadríceps, isquiotibiais e panturrilha",
        duracaoMinutos: 20,
        conteudo: `# Músculos dos Membros Superiores e Inferiores

## Membros Superiores

- Bíceps braquial: flexão do cotovelo
- Tríceps braquial: extensão do cotovelo
- Flexores e extensores do antebraço

## Membros Inferiores

- Quadríceps femoral: extensão do joelho
- Isquiotibiais: flexão do joelho
- Panturrilha: gastrocnêmio e sóleo, flexão plantar do pé

## Síndrome do Piriforme

- Piriforme: rotador externo do quadril
- Hipertonia pode comprimir o nervo ciático

## Epicondilites

- Lateral (cotovelo de tenista): extensores do antebraço
- Medial (cotovelo de golfista): flexores do antebraço

> Conhecer esses músculos ajuda a tratar dores e disfunções comuns.`,

        quiz: [
          {
            pergunta: "Qual músculo, quando hipertônico, comprime o nervo ciático causando dor irradiada?",
            opcoes: ["Glúteo máximo", "Glúteo médio", "Piriforme", "Tensor da fáscia lata"],
            respostaCorreta: 2,
            explicacao: "O piriforme é um rotador externo profundo do quadril. Quando hipertônico, comprime o nervo ciático causando a síndrome do piriforme com dor irradiada na perna."
          },
          {
            pergunta: "Qual é a epicondilite mais comum em pessoas que trabalham com computador?",
            opcoes: ["Epicondilite lateral (cotovelo de tenista)", "Epicondilite medial (cotovelo de golfista)", "Ambas igualmente", "Nenhuma das duas"],
            respostaCorreta: 0,
            explicacao: "A epicondilite lateral (cotovelo de tenista) é mais comum em quem usa computador, pois envolve os extensores do antebraço, que são sobrecarregados ao usar mouse e teclado."
          }
        ],
        checklist: [
          "Conheço origem, inserção e ação dos principais músculos dos membros",
          "Sei tratar epicondilite lateral e medial com liberação miofascial",
          "Identifico encurtamento de isquiotibiais em sedentários",
          "Conheço a síndrome do piriforme e seu tratamento manual",
          "Sei trabalhar a fáscia plantar em casos de fascite"
        ]
      }
    ]
  },
  {
    titulo: "Sistema Nervoso",
    descricao: "Neuroanatomia aplicada à massoterapia, dermátomos e reflexos",
    icone: "BarChart3",
    cor: "from-purple-50 to-violet-50",
    aulas: [
      {
        titulo: "Sistema Nervoso Central e Periférico",
        descricao: "Cérebro, medula espinal, nervos e plexos",
        duracaoMinutos: 15,
        conteudo: `# Sistema Nervoso Central e Periférico

## Divisões do Sistema Nervoso

- Sistema Nervoso Central (SNC): cérebro e medula espinal
- Sistema Nervoso Periférico (SNP): nervos e gânglios fora do SNC

## Plexos Nervosos

- Plexo Braquial: membros superiores
- Plexo Lombossacral: membros inferiores

## Sistema Autônomo

- Simpático: resposta de luta ou fuga
- Parassimpático: relaxamento e recuperação

### Mecanismo de Relaxamento pela Massagem

- Estimulação do nervo vago (parassimpático)
- Redução do cortisol
- Aumento de serotonina e dopamina

> Entender esses mecanismos ajuda a aplicar técnicas que promovem relaxamento profundo.`,

        quiz: [
          {
            pergunta: "Qual é o mecanismo neurofisiológico principal pelo qual a massagem promove relaxamento?",
            opcoes: [
              "Estimulação do sistema simpático",
              "Ativação do parassimpático via nervo vago",
              "Bloqueio dos nervos periféricos",
              "Aumento da adrenalina"
            ],
            respostaCorreta: 1,
            explicacao: "A massagem com pressão moderada e ritmo lento estimula o nervo vago (parassimpático), reduzindo cortisol e aumentando serotonina e dopamina."
          }
        ],
        checklist: [
          "Conheço as divisões do sistema nervoso (SNC e SNP)",
          "Sei os plexos nervosos principais e seus nervos",
          "Entendo a síndrome do túnel do carpo e alívio por massagem",
          "Conheço a diferença entre simpático e parassimpático",
          "Compreendo como a massagem ativa o parassimpático"
        ]
      },
      {
        titulo: "Dermátomos, Miótomos e Dor Referida",
        descricao: "Mapas de inervação segmentar e padrões de dor",
        duracaoMinutos: 15,
        conteudo: `# Dermátomos, Miótomos e Dor Referida

## Dermátomos

- Áreas da pele inervadas por raízes nervosas específicas
- Importantes para diagnóstico diferencial

## Miótomos

- Grupos musculares inervados por raízes nervosas específicas
- Avaliação da função muscular segmentar

## Dor Referida

- Dor percebida em área diferente da origem
- Importante para avaliação clínica e encaminhamento

## Sinais de Alerta (Red Flags)

- Perda de controle vesical ou intestinal
- Fraqueza progressiva
- Dor noturna intensa

> Reconhecer esses sinais é fundamental para encaminhamento médico.`,

        quiz: [
          {
            pergunta: "Se um cliente relata formigamento no polegar e face lateral do antebraço, qual raiz nervosa pode estar comprometida?",
            opcoes: ["C4", "C6", "C8", "T1"],
            respostaCorreta: 1,
            explicacao: "O dermátomo de C6 cobre o polegar e a face lateral do antebraço. Formigamento nessa área sugere compressão da raiz C6 — encaminhe para avaliação médica."
          },
          {
            pergunta: "Qual é um sinal de alerta (red flag) que indica encaminhamento médico imediato?",
            opcoes: [
              "Dor que melhora com massagem",
              "Tensão muscular bilateral",
              "Perda de controle vesical ou intestinal",
              "Dor que piora ao sentar"
            ],
            respostaCorreta: 2,
            explicacao: "Perda de controle vesical ou intestinal é um sinal de síndrome da cauda equina — uma emergência médica que requer encaminhamento imediato."
          }
        ],
        checklist: [
          "Conheço os dermátomos mais relevantes (C4-S1)",
          "Sei fazer testes rápidos de miótomos",
          "Conheço os padrões de dor referida mais comuns",
          "Identifico os red flags que exigem encaminhamento médico",
          "Aplico a regra: onde dói geralmente NÃO é onde está o problema"
        ]
      }
    ]
  },
  {
    titulo: "Sistema Circulatório e Linfático",
    descricao: "Vasos sanguíneos, circulação, sistema linfático e drenagem",
    icone: "Package",
    cor: "from-blue-50 to-indigo-50",
    aulas: [
      {
        titulo: "Sistema Cardiovascular Aplicado",
        descricao: "Coração, artérias, veias e circulação para massoterapeutas",
        duracaoMinutos: 15,
        conteudo: `# Sistema Cardiovascular Aplicado

## Coração

- Estrutura e função
- Ciclo cardíaco

## Vasos Sanguíneos

- Artérias: levam sangue do coração
- Veias: trazem sangue ao coração
- Capilares: trocas metabólicas

## Contraindicações Circulatórias

- Trombose venosa profunda (TVP): contraindicação absoluta
- Varizes: cuidado e avaliação
- Hipertensão: monitoramento

## Técnicas de Massagem

- Movimentos centrípetos para favorecer retorno venoso
- Evitar pressão direta sobre artérias palpáveis

> Conhecer essas informações é vital para segurança e eficácia da massagem.`,

        quiz: [
          {
            pergunta: "Qual é a contraindicação circulatória ABSOLUTA mais perigosa para massagem?",
            opcoes: ["Varizes leves", "Hipertensão controlada", "Trombose venosa profunda (TVP)", "Hematoma antigo"],
            respostaCorreta: 2,
            explicacao: "A TVP é contraindicação ABSOLUTA — um trombo pode se desprender durante a massagem e causar embolia pulmonar potencialmente fatal."
          }
        ],
        checklist: [
          "Conheço as artérias palpáveis e sei que NUNCA devo pressioná-las diretamente",
          "Entendo como a massagem auxilia o retorno venoso",
          "Sei identificar sinais de TVP (edema unilateral, dor, calor na panturrilha)",
          "Conheço todas as contraindicações circulatórias",
          "Aplico técnicas centrípetas para favorecer retorno venoso"
        ]
      },
      {
        titulo: "Sistema Linfático e Drenagem",
        descricao: "Anatomia linfática, linfonodos e fundamentos da drenagem linfática manual",
        duracaoMinutos: 18,
        conteudo: `# Sistema Linfático e Drenagem

## Anatomia Linfática

- Vasos linfáticos superficiais e profundos
- Linfonodos principais: cervical, axilar, inguinal

## Drenagem Linfática Manual (DLM)

- Método Vodder
- Pressão leve (30-40 mmHg)
- Sequência: iniciar pela desembocadura cervical

## Indicações e Contraindicações

- Edema linfático, pós-operatório, celulite
- Contraindicações: infecções agudas, insuficiência cardíaca grave

> Técnica delicada que melhora circulação e imunidade.`,

        quiz: [
          {
            pergunta: "Qual é a pressão ideal para drenagem linfática manual (método Vodder)?",
            opcoes: ["100-150 mmHg (forte)", "60-80 mmHg (moderada)", "30-40 mmHg (como peso de uma moeda)", "10-20 mmHg (quase imperceptível)"],
            respostaCorreta: 2,
            explicacao: "A DLM usa pressão muito leve (30-40 mmHg) porque os vasos linfáticos são superficiais e delicados. Pressão excessiva os comprime e impede o fluxo."
          }
        ],
        checklist: [
          "Conheço as funções do sistema linfático",
          "Sei a sequência correta da DLM (começar pela desembocadura cervical)",
          "Conheço as cadeias linfonodais principais",
          "Diferencio massagem clássica de drenagem linfática",
          "Conheço as indicações e contraindicações da DLM"
        ]
      }
    ]
  },
  {
    titulo: "Anatomia Aplicada à Prática Clínica",
    descricao: "Avaliação postural, palpação, patologias comuns e protocolos",
    icone: "MessageCircle",
    cor: "from-emerald-50 to-teal-50",
    aulas: [
      {
        titulo: "Avaliação Postural e Palpação",
        descricao: "Como avaliar a postura e palpar estruturas anatômicas",
        duracaoMinutos: 18,
        conteudo: `# Avaliação Postural e Palpação

## Avaliação Postural

- Vistas: anterior, lateral e posterior
- Alinhamento da cabeça, ombros, pelve e membros
- Identificação de desvios: escoliose, hiperlordose, hipercifose

## Palpação

- Técnicas: mãos aquecidas, pressão progressiva, comparação bilateral
- Referências anatômicas: C7, T7, L4, EIAS, EIPS
- Identificação de pontos dolorosos e tensões musculares

## Síndromes Comuns

- Síndrome Cruzada Superior e Inferior de Janda
- Impacto na postura e função muscular

> Avaliação precisa orienta o plano terapêutico.`,

        quiz: [
          {
            pergunta: "Na Síndrome Cruzada Superior de Janda, quais músculos estão encurtados?",
            opcoes: [
              "Flexores profundos do pescoço e romboides",
              "Peitoral maior, trapézio superior, ECM e suboccipitais",
              "Glúteo máximo e abdominais",
              "Iliopsoas e reto femoral"
            ],
            respostaCorreta: 1,
            explicacao: "Na Síndrome Cruzada Superior, os músculos encurtados são: peitoral maior e menor, trapézio superior, elevador da escápula, ECM e suboccipitais — resultando em cabeça anteriorizada e ombros protraídos."
          }
        ],
        checklist: [
          "Sei realizar avaliação postural nas 3 vistas (anterior, lateral, posterior)",
          "Identifico Síndrome Cruzada Superior e Inferior de Janda",
          "Domino as regras de palpação (mãos aquecidas, pressão progressiva, comparação bilateral)",
          "Conheço as referências palpatórias essenciais (C7, T7, L4, EIAS, EIPS)",
          "Documento achados e acompanho evolução entre sessões"
        ]
      },
      {
        titulo: "Patologias Musculoesqueléticas Comuns",
        descricao: "Hérnia de disco, tendinites, bursites, fibromialgia e quando encaminhar",
        duracaoMinutos: 18,
        conteudo: `# Patologias Musculoesqueléticas Comuns

## Hérnia de Disco

- Protusão do núcleo pulposo
- Sintomas: dor irradiada, formigamento, fraqueza

## Tendinites e Bursites

- Inflamação dos tendões e bursas
- Causas: sobrecarga, trauma repetitivo

## Fibromialgia

- Dor crônica difusa
- Sensibilidade aumentada
- Necessita abordagem suave e adaptada

## Encaminhamento Médico

- Sinais de alarme: perda sensorial, fraqueza progressiva, dor intensa

> Conhecer essas patologias ajuda a adaptar a massagem e garantir segurança.`,

        quiz: [
          {
            pergunta: "Como deve ser a massagem em pacientes com fibromialgia?",
            opcoes: [
              "Pressão profunda e intensa",
              "Técnicas de percussão vigorosa",
              "Pressão LEVE, técnicas suaves e calor",
              "Igual a qualquer outro paciente"
            ],
            respostaCorreta: 2,
            explicacao: "Fibromialgia requer pressão LEVE, técnicas suaves e calor. Técnicas profundas ou agressivas podem agravar a dor difusa crônica."
          }
        ],
        checklist: [
          "Conheço as patologias mais comuns da coluna (hérnia, estenose, espondilolistese)",
          "Sei adaptar massagem para síndrome do impacto e capsulite adesiva",
          "Conheço os cuidados com fibromialgia, artrite reumatoide e osteoporose",
          "Identifico os sinais de encaminhamento médico obrigatório",
          "Entendo que massoterapeuta NÃO diagnostica — observa e encaminha"
        ]
      },
      {
        titulo: "Protocolos Anatômicos por Queixa",
        descricao: "Protocolos de massagem baseados em anatomia para as queixas mais frequentes",
        duracaoMinutos: 20,
        conteudo: `# Protocolos Anatômicos por Queixa

## Cervicalgia e Cefaleia Tensional

- Aquecimento cervical
- Liberação dos suboccipitais
- Trabalho no ECM e escalenos
- Alongamentos e relaxamento

## Lombalgia

- Liberação dos eretores da espinha
- Trabalho no quadrado lombar e glúteos
- Fortalecimento do transverso do abdome

## Dor no Ombro

- Liberação do manguito rotador
- Trabalho nos peitorais e trapézio médio
- Mobilização articular suave

## Frequência e Evolução

- Semanal → quinzenal → mensal
- Registro de evolução e ajustes no protocolo

> Protocolos baseados em anatomia garantem eficácia e segurança.`,

        quiz: [
          {
            pergunta: "No protocolo para cervicalgia e cefaleia tensional, qual músculo é trabalhado primeiro após o aquecimento?",
            opcoes: ["ECM", "Escalenos", "Suboccipitais", "Elevador da escápula"],
            respostaCorreta: 2,
            explicacao: "A liberação suboccipital é o primeiro passo terapêutico, com dedos posicionados sob o occipital e pressão sustentada por 60-90 segundos."
          }
        ],
        checklist: [
          "Sei executar o protocolo para cervicalgia e cefaleia tensional",
          "Domino o protocolo para lombalgia (eretores + QL + glúteos + iliopsoas)",
          "Conheço o protocolo para dor no ombro (manguito rotador + peitorais)",
          "Aplico a regra de frequência (semanal → quinzenal → mensal)",
          "Registro evolução do cliente entre sessões"
        ]
      }
    ]
  },
  {
    titulo: "Anatomia Fascial e Biomecânica",
    descricao: "Sistema fascial, cadeias miofasciais e biomecânica aplicada à massoterapia",
    icone: "Sparkles",
    cor: "from-teal-50 to-cyan-50",
    aulas: [
      {
        titulo: "O Sistema Fascial",
        descricao: "Fáscias superficiais, profundas e viscerais na prática clínica",
        duracaoMinutos: 16,
        conteudo: `# O Sistema Fascial

## A Rede que Conecta Tudo

### O Que é Fáscia?

A fáscia é um tecido conjuntivo contínuo que envolve, separa e conecta todas as estruturas do corpo: músculos, ossos, nervos, vasos e órgãos.

> "Imagine um macacão de mergulho interno que conecta o corpo inteiro — essa é a fáscia."

### Tipos de Fáscia

**Fáscia Superficial**
- Localizada logo abaixo da pele
- Contém tecido adiposo e vasos sanguíneos
- Permite mobilidade da pele sobre os músculos
- Alvo: técnicas de deslizamento superficial

**Fáscia Profunda**
- Envolve músculos, ossos e articulações
- Mais densa e resistente
- Compartimentaliza grupos musculares
- Alvo: liberação miofascial profunda

**Fáscia Visceral**
- Envolve órgãos internos
- Permite mobilidade entre órgãos
- Não é alvo direto da massoterapia convencional

### Propriedades da Fáscia

- **Tixotropia**: Muda de gel para sol com calor e pressão (fundamental na massagem!)
- **Piezoeletricidade**: Gera micro-correntes elétricas quando deformada
- **Memória**: Mantém padrões de tensão por anos
- **Continuidade**: Uma restrição em um ponto afeta todo o sistema

### Fáscia e Massoterapia

| Técnica | Efeito na Fáscia |
|---------|-----------------|
| Deslizamento lento | Tixotropia — fáscia "derrete" e permite mobilidade |
| Pressão sustentada | Liberação de aderências fasciais |
| Aquecimento local | Aumenta fluidez e elasticidade |
| Deslizamento profundo | Reorganização das fibras colágenas |

### Linhas Miofasciais (Thomas Myers)

As linhas miofasciais são cadeias contínuas de fáscia e músculo que conectam regiões distantes:

- **Linha Posterior Superficial**: Fáscia plantar → panturrilha → isquiotibiais → eretor da espinha → galea aponeurótica
- **Linha Frontal Superficial**: Dorso do pé → tibial anterior → reto abdominal → ECM
- **Linha Lateral**: Fibulares → TIT → oblíquos → intercostais → escalenos
- **Linha Espiral**: Envolve o corpo em espiral, conectando ombro a quadril oposto
- **Linhas dos Braços**: Conectam tronco às pontas dos dedos

> **Aplicação prática**: Se o cliente tem fascite plantar, a linha posterior superficial sugere investigar panturrilha, isquiotibiais e até suboccipitais.`,
      },
      {
        titulo: "Biomecânica da Postura e Movimento",
        descricao: "Centros de gravidade, alavancas e análise funcional do movimento",
        duracaoMinutos: 14,
        conteudo: `# Biomecânica Aplicada

## Entendendo as Forças no Corpo

### Centro de Gravidade

- Localização: Anterior a S2 (na pelve)
- Linha de gravidade: do vértex ao solo, passando pelo centro de gravidade
- Desvios da linha de gravidade = compensações musculares = dor

### Sistema de Alavancas

O corpo funciona como um sistema de alavancas:

**1ª Classe** (fulcro no meio)
- Ex: Articulação atlantoccipital — balanceia a cabeça
- Potência (músculos posteriores) ↔ Fulcro (C1) ↔ Resistência (peso da face)

**2ª Classe** (resistência no meio)
- Ex: Ficar na ponta dos pés
- Potência (tríceps sural) → Resistência (peso corporal) → Fulcro (metatarsos)

**3ª Classe** (potência no meio) — A MAIS COMUM
- Ex: Flexão do cotovelo
- Fulcro (cotovelo) → Potência (bíceps) → Resistência (peso na mão)
- Desvantagem mecânica = músculos precisam gerar MUITA força

### Biomecânica das Queixas Comuns

| Queixa | Desequilíbrio Biomecânico | Abordagem |
|--------|--------------------------|-----------|
| Lombalgia | Anteversão pélvica, iliopsoas encurtado | Liberar iliopsoas, fortalecer glúteos e abdominais |
| Cervicalgia | Cabeça anteriorizada (12kg de carga extra por polegada!) | Liberar suboccipitais e ECM, fortalecer flexores profundos |
| Dor no ombro | Protração escapular, peitoral encurtado | Liberar peitorais, fortalecer trapézio médio e romboides |
| Dor no joelho | Valgo dinâmico, VMO fraco | Liberar TIT, fortalecer VMO e glúteo médio |

### A Cabeça Anteriorizada

Para cada polegada (2,5cm) que a cabeça se projeta para frente:
- A coluna cervical suporta **+4,5kg de carga adicional**
- Posição normal: ~5kg sobre a cervical
- 2 polegadas à frente: ~14kg sobre a cervical!

> Isso explica por que a cervicalgia é a queixa mais comum na era dos smartphones.

### Ergonomia do Massoterapeuta (Revisão)

- Transferência de peso > Força muscular
- Altura da maca = punhos com braços ao lado do corpo
- Pés afastados, um à frente do outro
- Limite diário: 6-8 sessões de 1h
- Alongamento antes e depois de cada sessão`,
      },
      {
        titulo: "Casos Integrados: Anatomia na Prática",
        descricao: "Estudos de caso que integram todos os sistemas anatômicos",
        duracaoMinutos: 18,
        conteudo: `# Casos Integrados: Anatomia na Prática

## Integrando Todos os Conhecimentos

### Caso 1: Designer Gráfico, 32 anos

**Queixa**: Dor de cabeça 3x/semana, dor entre escápulas, formigamento na mão direita.

**Avaliação Postural**:
- Cabeça anteriorizada (2+ polegadas)
- Ombros protraídos
- Cifose torácica aumentada
→ Diagnóstico funcional: Síndrome Cruzada Superior de Janda

**Análise Anatômica**:
- Tegumentar: Pele seca nas mãos (uso excessivo de álcool gel)
- Muscular: Trigger points em trapézio superior, ECM tenso, peitorais encurtados
- Nervoso: Formigamento segue dermátomo C6-C7 → possível compressão por escalenos
- Circulatório: Circulação reduzida nas mãos (mãos frias)

**Protocolo Integrado**:
1. Aquecimento geral costas (3 min)
2. Liberação trapézio + trigger points (8 min)
3. Cervical posterior + suboccipitais (8 min)
4. ECM — liberação bilateral (5 min)
5. Escalenos — pressão suave e cuidadosa (3 min)
6. Peitorais (decúbito dorsal) — liberação (5 min)
7. Antebraço e mão direita (5 min)
8. Integração e relaxamento (8 min)

**Orientações**: Exercícios de retração cervical, alongamento de peitorais, pausas a cada 45 min de trabalho.

---

### Caso 2: Corredora Amadora, 45 anos

**Queixa**: Dor no joelho lateral direito após corridas longas. Dor na planta do pé direito ao acordar.

**Avaliação Postural**:
- Joelho valgo dinâmico à direita
- Pé direito pronado
- Quadril compensando com inclinação

**Análise Anatômica**:
- Esquelético: Pé pronado → desalinhamento tibial → estresse no joelho
- Muscular: TIT tenso, VMO fraco, fáscia plantar restrita
- Nervoso: Sem sinais neurológicos
- Circulatório: Leve edema pós-treino em MMII

**Protocolo Integrado**:
1. Deslizamento MMII completo (3 min)
2. Glúteo médio com cotovelo (5 min)
3. TFL/TIT — liberação lateral com cotovelo (8 min)
4. Vasto lateral — liberação miofascial (5 min)
5. Panturrilha — gastrocnêmio e sóleo (5 min)
6. Fáscia plantar — polegares com pressão firme (5 min)
7. Integração pé → quadril (5 min)

---

### Caso 3: Empresária, 58 anos

**Queixa**: Dor difusa nas costas e ombros, fadiga crônica, diagnóstico de fibromialgia.

**Análise**:
- Muscular: Dor difusa, tender points positivos, musculatura hipersensível
- Nervoso: Sistema nervoso em hiperatividade simpática
- Objetivo: Ativar parassimpático, reduzir dor sem agravar

**Protocolo Integrado** (ADAPTADO):
- ⚠️ Pressão MÁXIMA: nível 4-5 (nunca além!)
- Deslizamentos longos, lentos e ritmados (80% da sessão)
- Liberação suave APENAS onde encontrar tensão significativa (20%)
- Ênfase no relaxamento: cervical, cranial, mãos e pés
- Aromaterapia com lavanda (se tolerada)
- Sessão mais curta: 45 min máximo
- Frequência: quinzenal

> "A anatomia não é teoria — é a lente pela qual você enxerga cada corpo que suas mãos tocam."`,
        quiz: [
          {
            pergunta: "No caso do designer com cabeça anteriorizada, o formigamento na mão pode ser causado por compressão nos:",
            opcoes: ["Suboccipitais", "Romboides", "Escalenos", "Abdominais"],
            respostaCorreta: 2,
            explicacao: "O plexo braquial passa entre os escalenos anterior e médio. Tensão nos escalenos pode comprimir esses nervos, causando formigamento nas mãos seguindo os dermátomos C6-C7."
          },
          {
            pergunta: "Para uma paciente com fibromialgia, qual a pressão máxima recomendada?",
            opcoes: ["Nível 2-3", "Nível 4-5", "Nível 6-7", "Nível 8-9"],
            respostaCorreta: 1,
            explicacao: "Em fibromialgia, a pressão máxima deve ser nível 4-5. Pressão excessiva agrava a dor difusa e hiperativa o sistema nervoso já em estado de alerta."
          }
        ],
        checklist: [
          "Sei integrar avaliação de múltiplos sistemas (muscular, nervoso, circulatório)",
          "Adapto protocolos para diferentes perfis (escritório, atleta, idoso, fibromialgia)",
          "Encaminho quando identifico sinais neurológicos ou red flags",
          "Oriento exercícios e mudanças posturais complementares",
          "Documento cada caso com avaliação, protocolo aplicado e evolução"
        ]
      }
    ]
  }
];
