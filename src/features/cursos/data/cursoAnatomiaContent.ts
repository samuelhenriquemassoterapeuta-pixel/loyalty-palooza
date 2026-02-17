import { type ModuloContent } from "@/features/cursos/data/cursoVendasContent";

export const cursoAnatomiaData: ModuloContent[] = [
  // ═══════════════════════════════════════════════════════════
  // MÓDULO 1 — FUNDAÇÃO: O UNIVERSO DA ANATOMIA HUMANA (10h · 4 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Fundação — O Universo da Anatomia Humana",
    descricao: "Conceitos fundamentais, importância, divisões, posição anatômica e mercado",
    icone: "Lightbulb",
    cor: "from-rose-50 to-pink-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "O que é Anatomia Humana",
        descricao: "Definição, importância na saúde e curiosidades sobre o corpo humano",
        duracaoMinutos: 35,
        conteudo: `# O que é Anatomia Humana

## Definição Técnica

A anatomia humana é a ciência que estuda a estrutura e a organização do corpo humano, bem como a relação entre suas partes. É uma das disciplinas fundamentais no âmbito da saúde.

> A compreensão da estrutura e função do corpo humano se torna essencial em um mundo onde a medicina avança a passos largos.

## Importância da Anatomia na Área da Saúde

| Área de Atuação | Importância da Anatomia |
|---|---|
| Medicina | Base para diagnóstico, cirurgia e tratamento |
| Enfermagem | Procedimentos, administração de medicamentos, cuidados |
| Fisioterapia | Compreensão do movimento, reabilitação |
| Educação Física | Entendimento do corpo em movimento, prevenção de lesões |
| Biomedicina | Pesquisa, diagnóstico laboratorial |
| Estética e Massoterapia | Conhecimento dos sistemas para aplicar técnicas adequadas |

## Curiosidades sobre a Anatomia Humana

| Dado | Informação |
|---|---|
| Ossos | O corpo humano tem aproximadamente 206 ossos |
| Músculos | Mais de 600 músculos compõem o sistema muscular |
| Doenças | Mais de 70% das doenças requerem diagnóstico baseado na anatomia |
| Antiguidade | Ciência com raízes em civilizações egípcia e grega |`,
        quiz: [
          {
            pergunta: "Quantos ossos tem aproximadamente o corpo humano adulto?",
            opcoes: ["106 ossos", "206 ossos", "306 ossos", "406 ossos"],
            respostaCorreta: 1,
            explicacao: "O corpo humano adulto possui aproximadamente 206 ossos. Bebês nascem com cerca de 270 ossos, que se fundem ao longo do crescimento."
          },
          {
            pergunta: "Qual área NÃO depende diretamente da anatomia?",
            opcoes: ["Medicina", "Fisioterapia", "Astronomia", "Enfermagem"],
            respostaCorreta: 2,
            explicacao: "Astronomia é o estudo dos corpos celestes, não do corpo humano. Todas as demais áreas listadas dependem fundamentalmente do conhecimento anatômico."
          }
        ],
        checklist: [
          "Sei definir anatomia humana e sua importância",
          "Conheço as áreas de saúde que dependem da anatomia",
          "Sei que o corpo tem ~206 ossos e 600+ músculos",
          "Entendo as raízes históricas da anatomia"
        ]
      },
      {
        titulo: "Divisões da Anatomia",
        descricao: "Macroscópica, microscópica, do desenvolvimento, funcional e radiológica",
        duracaoMinutos: 30,
        conteudo: `# Divisões da Anatomia

## Ramos de Estudo

| Divisão | Descrição |
|---|---|
| **Anatomia Macroscópica** | Estudo das estruturas visíveis a olho nu |
| **Anatomia Microscópica** | Estruturas que requerem microscópio (histologia) |
| **Anatomia do Desenvolvimento** | Desenvolvimento do organismo (embriologia) |
| **Anatomia Funcional** | Relação entre estrutura e função |
| **Anatomia Radiológica** | Estudo das estruturas através de imagens |

> Cada divisão oferece uma perspectiva diferente e complementar do corpo humano.

## Por que Conhecer Todas as Divisões?

- A anatomia macroscópica é a base da prática clínica e cirúrgica
- A microscópica revela detalhes celulares e teciduais essenciais ao diagnóstico
- A do desenvolvimento é chave para entender malformações congênitas
- A funcional conecta estrutura à função — fundamental para reabilitação
- A radiológica permite diagnósticos não invasivos com tecnologia de imagem`,
        quiz: [
          {
            pergunta: "Qual divisão da anatomia estuda estruturas que só podem ser vistas ao microscópio?",
            opcoes: ["Macroscópica", "Microscópica (Histologia)", "Funcional", "Radiológica"],
            respostaCorreta: 1,
            explicacao: "A anatomia microscópica, ou histologia, estuda tecidos e células que só são visíveis com auxílio de microscópio."
          }
        ],
        checklist: [
          "Conheço as 5 divisões da anatomia",
          "Sei diferenciar anatomia macro e microscópica",
          "Entendo a importância da anatomia do desenvolvimento",
          "Compreendo o papel da anatomia radiológica"
        ]
      },
      {
        titulo: "Posição Anatômica, Planos e Termos Direcionais",
        descricao: "Posição anatômica padrão, planos de referência, termos de direção e cavidades do corpo",
        duracaoMinutos: 40,
        conteudo: `# Posição Anatômica, Planos e Termos Direcionais

## Posição Anatômica Padrão

- Corpo ereto
- Cabeça voltada para frente
- Braços estendidos ao lado do corpo
- Palmas das mãos voltadas para frente
- Pés paralelos e levemente afastados

> Esta posição é o ponto de partida para descrever qualquer estrutura ou movimento.

## Planos Anatômicos

| Plano | Descrição |
|---|---|
| **Sagital** | Divide o corpo em esquerda e direita |
| **Coronal (Frontal)** | Divide o corpo em anterior (frente) e posterior (atrás) |
| **Transverso (Axial)** | Divide o corpo em superior e inferior |

## Termos de Direção

| Termo | Significado |
|---|---|
| **Superior (Cranial)** | Em direção à cabeça |
| **Inferior (Caudal)** | Em direção aos pés |
| **Anterior (Ventral)** | Na frente |
| **Posterior (Dorsal)** | Atrás |
| **Medial** | Próximo à linha média |
| **Lateral** | Afastado da linha média |
| **Proximal** | Mais próximo do tronco (membros) |
| **Distal** | Mais afastado do tronco (membros) |
| **Superficial** | Próximo à superfície |
| **Profundo** | Afastado da superfície |

## Cavidades do Corpo

### Cavidade Dorsal
- **Cavidade Craniana** — Cérebro
- **Canal Vertebral** — Medula espinhal

### Cavidade Ventral
- **Cavidade Torácica** — Pulmões, coração
- **Cavidade Abdominal** — Estômago, fígado, intestinos, pâncreas, baço, rins
- **Cavidade Pélvica** — Bexiga, órgãos reprodutores internos

| Cavidade | Conteúdo Principal |
|---|---|
| Craniana | Cérebro |
| Vertebral (Raquidiana) | Medula espinhal |
| Torácica | Pulmões, coração, grandes vasos |
| Abdominal | Estômago, intestinos, fígado, pâncreas, baço, rins |
| Pélvica | Bexiga, órgãos reprodutores internos |`,
        quiz: [
          {
            pergunta: "Qual plano anatômico divide o corpo em parte anterior e posterior?",
            opcoes: ["Plano Sagital", "Plano Coronal (Frontal)", "Plano Transverso", "Plano Oblíquo"],
            respostaCorreta: 1,
            explicacao: "O plano coronal (ou frontal) divide o corpo em parte anterior (frente) e posterior (trás)."
          },
          {
            pergunta: "O que significa o termo 'proximal' em anatomia?",
            opcoes: ["Afastado da superfície", "Próximo à linha média", "Mais próximo do tronco", "Na frente do corpo"],
            respostaCorreta: 2,
            explicacao: "Proximal significa mais próximo à origem ou tronco. Exemplo: o ombro é proximal ao punho."
          },
          {
            pergunta: "Qual cavidade contém o coração e os pulmões?",
            opcoes: ["Craniana", "Abdominal", "Torácica", "Pélvica"],
            respostaCorreta: 2,
            explicacao: "A cavidade torácica abriga o coração, os pulmões e os grandes vasos sanguíneos."
          }
        ],
        checklist: [
          "Sei descrever a posição anatômica corretamente",
          "Identifico os 3 planos anatômicos",
          "Uso termos direcionais corretos (superior, inferior, medial, lateral, proximal, distal)",
          "Conheço as cavidades dorsal e ventral e seus conteúdos",
          "Sei localizar os principais órgãos nas cavidades corretas"
        ]
      },
      {
        titulo: "O Mercado para Profissionais com Conhecimento em Anatomia",
        descricao: "Oportunidades profissionais, salários e perspectivas de carreira",
        duracaoMinutos: 25,
        conteudo: `# O Mercado para Profissionais com Conhecimento em Anatomia

## Oportunidades Profissionais

| Profissão | Área de Atuação | Demanda |
|---|---|---|
| **Técnico em Anatomia Patológica** | Laboratórios hospitalares, clínicas privadas | Mais de 4.000 contratos em 2024 |
| **Técnico de Laboratório de Anatomia** | Preparação de peças, dissecação | Alta demanda em instituições de ensino |
| **Docente em Anatomia** | Universidades, cursos técnicos, pós-graduação | Mais de 12.000 vagas encontradas |
| **Pesquisador Biomédico** | Centros de pesquisa, bancos de tecidos | Mercado promissor |
| **Especialista em Anatomia Patológica** | Diagnóstico, processamento de amostras | Até 35% de margem em áreas especializadas |

## Salários e Perspectivas

| Profissão | Salário-base Médio |
|---|---|
| Técnico em Anatomia Patológica | R$ 2.500 - 4.000/mês |
| Professor de Anatomia | R$ 3.000 - 8.000/mês |
| Especialista Laboratorial | R$ 3.500 - 6.000/mês |
| Coordenador de Anatomia Patológica | R$ 6.000 - 12.000/mês |

> O conhecimento em anatomia é um diferencial valorizado em diversas áreas da saúde.`,
        quiz: [
          {
            pergunta: "Qual é o salário médio de um Técnico em Anatomia Patológica?",
            opcoes: ["R$ 1.000 - 2.000/mês", "R$ 2.500 - 4.000/mês", "R$ 6.000 - 8.000/mês", "R$ 10.000 - 15.000/mês"],
            respostaCorreta: 1,
            explicacao: "O salário médio de um Técnico em Anatomia Patológica em regime CLT varia de R$ 2.500 a R$ 4.000 por mês."
          }
        ],
        checklist: [
          "Conheço as principais carreiras ligadas à anatomia",
          "Sei os salários médios da área",
          "Entendo a demanda do mercado atual",
          "Conheço as áreas com maior crescimento"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 2 — SISTEMA ESQUELÉTICO (12h · 4 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Sistema Esquelético",
    descricao: "Funções, classificação dos ossos, esqueleto axial e apendicular",
    icone: "Target",
    cor: "from-slate-50 to-gray-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Funções e Classificação dos Ossos",
        descricao: "As 5 funções do sistema esquelético e tipos de ossos",
        duracaoMinutos: 35,
        conteudo: `# Funções e Classificação dos Ossos

## Funções do Sistema Esquelético

| Função | Descrição |
|---|---|
| **Sustentação** | Suporte para os tecidos moles |
| **Proteção** | Protege órgãos vitais (crânio, caixa torácica) |
| **Movimento** | Alavancas para a ação muscular |
| **Hematopoiese** | Produção de células sanguíneas na medula óssea |
| **Armazenamento** | Reserva de minerais (cálcio, fósforo) |

## Classificação dos Ossos

| Tipo | Características | Exemplos |
|---|---|---|
| **Longos** | Comprimento maior que largura | Fêmur, úmero, rádio, ulna |
| **Curtos** | Forma cúbica | Carpo, tarso |
| **Chatos (Planos)** | Finos e achatados | Crânio, escápula, esterno |
| **Irregulares** | Forma complexa | Vértebras, mandíbula |
| **Sesamoides** | Dentro de tendões | Patela |

> O corpo humano adulto possui aproximadamente 206 ossos.`,
        quiz: [
          {
            pergunta: "Qual função do sistema esquelético está relacionada à produção de células sanguíneas?",
            opcoes: ["Sustentação", "Proteção", "Hematopoiese", "Armazenamento"],
            respostaCorreta: 2,
            explicacao: "A hematopoiese é a produção de células sanguíneas (glóbulos vermelhos, brancos e plaquetas) que ocorre na medula óssea vermelha."
          },
          {
            pergunta: "A patela é um exemplo de qual tipo de osso?",
            opcoes: ["Longo", "Curto", "Chato", "Sesamoide"],
            respostaCorreta: 3,
            explicacao: "A patela é um osso sesamoide, pois se desenvolve dentro do tendão do quadríceps femoral."
          }
        ],
        checklist: [
          "Conheço as 5 funções do sistema esquelético",
          "Sei classificar ossos por forma (longos, curtos, chatos, irregulares, sesamoides)",
          "Entendo o que é hematopoiese",
          "Sei que temos ~206 ossos no corpo adulto"
        ]
      },
      {
        titulo: "Esqueleto Axial",
        descricao: "Crânio (22 ossos), coluna vertebral (26 ossos) e caixa torácica (25 ossos)",
        duracaoMinutos: 40,
        conteudo: `# Esqueleto Axial (80 ossos)

## Crânio (22 ossos)
- **Neurocrânio (8 ossos)**: frontal, parietais (2), occipital, temporais (2), esfenoide, etmoide
- **Viscerocrânio (14 ossos)**: maxilas, zigomáticos, nasais, lacrimais, palatinos, conchas nasais, vômer, mandíbula

## Ossículos Auditivos (6 ossos)
- Martelo, bigorna e estribo (3 em cada ouvido)

## Osso Hioide (1 osso)
- Único osso que não se articula com nenhum outro

## Coluna Vertebral (26 ossos)
- 7 cervicais (C1-C7)
- 12 torácicas (T1-T12)
- 5 lombares (L1-L5)
- 1 sacro (5 vértebras fundidas)
- 1 cóccix (3-5 vértebras fundidas)

## Caixa Torácica (25 ossos)
- 12 pares de costelas
- 1 esterno (manúbrio, corpo, processo xifoide)
- Costelas verdadeiras (1-7), falsas (8-10) e flutuantes (11-12)`,
        quiz: [
          {
            pergunta: "Quantos ossos compõem o esqueleto axial?",
            opcoes: ["60 ossos", "80 ossos", "100 ossos", "126 ossos"],
            respostaCorreta: 1,
            explicacao: "O esqueleto axial é composto por 80 ossos: crânio (22), ossículos auditivos (6), hioide (1), coluna vertebral (26) e caixa torácica (25)."
          },
          {
            pergunta: "Quantas vértebras cervicais existem na coluna vertebral?",
            opcoes: ["5", "7", "12", "26"],
            respostaCorreta: 1,
            explicacao: "A coluna cervical possui 7 vértebras (C1 a C7). A primeira (Atlas) sustenta o crânio e a segunda (Áxis) permite a rotação da cabeça."
          }
        ],
        checklist: [
          "Sei que o esqueleto axial tem 80 ossos",
          "Conheço a composição do crânio (neurocrânio + viscerocrânio)",
          "Sei as regiões da coluna e suas vértebras",
          "Diferencio costelas verdadeiras, falsas e flutuantes"
        ]
      },
      {
        titulo: "Esqueleto Apendicular",
        descricao: "Cintura escapular, membros superiores, cintura pélvica e membros inferiores (126 ossos)",
        duracaoMinutos: 40,
        conteudo: `# Esqueleto Apendicular (126 ossos)

## Composição

| Região | Ossos |
|---|---|
| **Cintura escapular** | Clavícula (2), escápula (2) |
| **Membros superiores** | Úmero (2), rádio (2), ulna (2), carpo (16), metacarpo (10), falanges (28) |
| **Cintura pélvica** | Ossos do quadril (2) |
| **Membros inferiores** | Fêmur (2), patela (2), tíbia (2), fíbula (2), tarso (14), metatarso (10), falanges (28) |

> O esqueleto apendicular é responsável pela locomoção e manipulação de objetos.`,
        quiz: [
          {
            pergunta: "Quantos ossos compõem o esqueleto apendicular?",
            opcoes: ["80 ossos", "100 ossos", "126 ossos", "206 ossos"],
            respostaCorreta: 2,
            explicacao: "O esqueleto apendicular possui 126 ossos, formados pelas cinturas (escapular e pélvica) e membros superiores e inferiores."
          }
        ],
        checklist: [
          "Sei que o esqueleto apendicular tem 126 ossos",
          "Conheço os ossos da cintura escapular",
          "Conheço os ossos dos membros superiores e inferiores",
          "Entendo a diferença entre esqueleto axial e apendicular"
        ]
      },
      {
        titulo: "Principais Ossos e Referências Anatômicas",
        descricao: "Localização e pontos de referência dos ossos mais importantes",
        duracaoMinutos: 40,
        conteudo: `# Principais Ossos e Referências Anatômicas

| Osso | Localização | Pontos de Referência |
|---|---|---|
| **Crânio** | Cabeça | Suturas, forames, seios da face |
| **Mandíbula** | Face | Ângulo da mandíbula, côndilo mandibular |
| **Clavícula** | Ombro | Articulação esternoclavicular, acrômio |
| **Escápula** | Ombro | Espinha da escápula, acrômio, cavidade glenoide |
| **Úmero** | Braço | Cabeça do úmero, epicôndilos, tróclea |
| **Rádio** | Antebraço (lateral) | Cabeça do rádio, processo estiloide |
| **Ulna** | Antebraço (medial) | Olécrano, processo estiloide |
| **Ossos do carpo** | Punho | Fileira proximal e distal (8 ossos) |
| **Fêmur** | Coxa | Cabeça do fêmur, colo, trocanteres, côndilos |
| **Tíbia** | Perna (medial) | Côndilos, tuberosidade da tíbia, maléolo medial |
| **Fíbula** | Perna (lateral) | Cabeça da fíbula, maléolo lateral |
| **Patela** | Joelho | Osso sesamoide dentro do tendão do quadríceps |

> Saber localizar e palpar essas referências é essencial para avaliação clínica.`,
        quiz: [
          {
            pergunta: "O olécrano é um ponto de referência de qual osso?",
            opcoes: ["Rádio", "Ulna", "Úmero", "Fêmur"],
            respostaCorreta: 1,
            explicacao: "O olécrano é a proeminência óssea da ulna que forma a 'ponta do cotovelo'. É uma referência palpatória importante."
          }
        ],
        checklist: [
          "Sei localizar os principais ossos do corpo",
          "Conheço os pontos de referência palpatórios",
          "Identifico os maléolos medial e lateral",
          "Sei diferenciar rádio (lateral) de ulna (medial)"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 3 — SISTEMA ARTICULAR (8h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Sistema Articular",
    descricao: "Classificação das articulações e tipos de articulações sinoviais",
    icone: "Layers",
    cor: "from-amber-50 to-yellow-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Classificação das Articulações",
        descricao: "Articulações fibrosas, cartilagíneas e sinoviais",
        duracaoMinutos: 40,
        conteudo: `# Classificação das Articulações

## Tipos de Articulações

| Tipo | Características | Movimento | Exemplos |
|---|---|---|---|
| **Fibrosas (Sinartroses)** | Tecido fibroso, sem movimento | Imóveis | Suturas do crânio |
| **Cartilagíneas (Anfiartroses)** | Cartilagem, movimento limitado | Pouco móveis | Discos intervertebrais, sínfise púbica |
| **Sinoviais (Diartroses)** | Cavidade articular, líquido sinovial | Livremente móveis | Joelho, ombro, quadril |

> As articulações sinoviais são as mais importantes para o estudo do movimento humano.

## Estrutura de uma Articulação Sinovial

- **Cápsula articular**: envoltório fibroso
- **Membrana sinovial**: produz o líquido sinovial
- **Líquido sinovial**: lubrifica e nutre a cartilagem
- **Cartilagem articular**: reveste as superfícies ósseas
- **Ligamentos**: estabilizam a articulação`,
        quiz: [
          {
            pergunta: "Qual tipo de articulação permite movimento livre?",
            opcoes: ["Fibrosas (Sinartroses)", "Cartilagíneas (Anfiartroses)", "Sinoviais (Diartroses)", "Todas permitem igualmente"],
            respostaCorreta: 2,
            explicacao: "As articulações sinoviais (diartroses) são livremente móveis, possuem cavidade articular e líquido sinovial. Exemplos: joelho, ombro e quadril."
          }
        ],
        checklist: [
          "Sei classificar articulações por mobilidade",
          "Conheço exemplos de cada tipo",
          "Entendo a estrutura de uma articulação sinovial",
          "Sei a função do líquido sinovial"
        ]
      },
      {
        titulo: "Tipos de Articulações Sinoviais",
        descricao: "Esferoide, gínglimo, trocoide, condilar, selar e plana",
        duracaoMinutos: 40,
        conteudo: `# Tipos de Articulações Sinoviais

| Tipo | Movimento | Exemplos |
|---|---|---|
| **Esferoide** | Multiaxial (flexão, extensão, abdução, rotação) | Ombro, quadril |
| **Gínglimo (Dobradiça)** | Uniaxial (flexão, extensão) | Joelho, cotovelo (úmero-ulnar) |
| **Trocoide (Pivô)** | Rotação | Articulação rádio-ulnar proximal, atlas-áxis |
| **Condilar (Elipsoide)** | Biaxial (flexão, extensão, abdução, adução) | Punho, metacarpofalângicas |
| **Selar** | Biaxial com encaixe | Carpometacarpal do polegar |
| **Plana** | Deslizamento | Articulações entre vértebras, carpo, tarso |

> A articulação esferoide do ombro é a mais móvel do corpo — mas também a mais instável.

## Movimentos Articulares

- **Flexão/Extensão**: diminuir/aumentar ângulo articular
- **Abdução/Adução**: afastar/aproximar da linha média
- **Rotação**: girar em torno de um eixo
- **Circundução**: combinar todos os movimentos (cone)
- **Pronação/Supinação**: rotação do antebraço`,
        quiz: [
          {
            pergunta: "Qual tipo de articulação sinovial permite a maior amplitude de movimento?",
            opcoes: ["Gínglimo (Dobradiça)", "Trocoide (Pivô)", "Esferoide", "Plana"],
            respostaCorreta: 2,
            explicacao: "A articulação esferoide (como ombro e quadril) permite todos os movimentos: flexão, extensão, abdução, adução, rotação e circundução."
          },
          {
            pergunta: "A articulação atlas-áxis é de qual tipo?",
            opcoes: ["Gínglimo", "Trocoide (Pivô)", "Esferoide", "Selar"],
            respostaCorreta: 1,
            explicacao: "A articulação atlas-áxis (C1-C2) é do tipo trocoide (pivô), permitindo a rotação lateral da cabeça."
          }
        ],
        checklist: [
          "Conheço os 6 tipos de articulações sinoviais",
          "Sei identificar exemplos de cada tipo",
          "Entendo os movimentos que cada tipo permite",
          "Diferencio movimentos uniaxiais, biaxiais e multiaxiais"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 4 — SISTEMA MUSCULAR (12h · 4 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Sistema Muscular",
    descricao: "Funções, tipos de músculos e principais músculos por região",
    icone: "Heart",
    cor: "from-red-50 to-orange-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Funções e Tipos de Músculos",
        descricao: "Movimento, postura, estabilização e os 3 tipos de tecido muscular",
        duracaoMinutos: 35,
        conteudo: `# Funções e Tipos de Músculos

## Funções do Sistema Muscular

| Função | Descrição |
|---|---|
| **Movimento** | Locomoção, movimentos internos |
| **Postura** | Manutenção da posição corporal |
| **Estabilização** | Fixação de articulações |
| **Produção de calor** | Termogênese (especialmente no frio) |

## Tipos de Músculos

| Tipo | Localização | Controle | Características |
|---|---|---|---|
| **Esquelético** | Ligado ao esqueleto | Voluntário | Estriado, multinucleado |
| **Cardíaco** | Coração | Involuntário | Estriado, uninucleado |
| **Liso** | Vísceras, vasos sanguíneos | Involuntário | Não estriado |

> O corpo humano possui mais de 600 músculos esqueléticos.`,
        quiz: [
          {
            pergunta: "Qual tipo de músculo é estriado e de controle involuntário?",
            opcoes: ["Esquelético", "Cardíaco", "Liso", "Nenhum"],
            respostaCorreta: 1,
            explicacao: "O músculo cardíaco é o único que é estriado (como o esquelético) mas de controle involuntário (como o liso)."
          }
        ],
        checklist: [
          "Conheço as 4 funções do sistema muscular",
          "Sei diferenciar os 3 tipos de músculo",
          "Entendo a diferença entre controle voluntário e involuntário"
        ]
      },
      {
        titulo: "Músculos da Cabeça, Pescoço, Tórax e Abdômen",
        descricao: "Temporal, masseter, ECM, trapézio, peitorais, intercostais, diafragma e abdominais",
        duracaoMinutos: 45,
        conteudo: `# Músculos da Cabeça, Pescoço, Tórax e Abdômen

## Cabeça e Pescoço

| Músculo | Função Principal |
|---|---|
| **Temporal** | Elevação da mandíbula |
| **Masseter** | Elevação da mandíbula |
| **Esternocleidomastóideo** | Rotação e flexão da cabeça |
| **Trapézio (parte superior)** | Elevação dos ombros, extensão da cabeça |

## Tórax e Abdômen

| Músculo | Função Principal |
|---|---|
| **Peitoral maior** | Adução e flexão do braço |
| **Intercostais** | Movimentos da respiração |
| **Diafragma** | Principal músculo da respiração |
| **Reto abdominal** | Flexão do tronco |
| **Oblíquos** | Rotação e flexão lateral do tronco |

> O diafragma é o principal músculo da respiração, separando a cavidade torácica da abdominal.`,
        quiz: [
          {
            pergunta: "Qual é o principal músculo da respiração?",
            opcoes: ["Intercostais", "Diafragma", "Reto abdominal", "Peitoral maior"],
            respostaCorreta: 1,
            explicacao: "O diafragma é o principal músculo da respiração. Ao contrair, desce e aumenta o volume torácico, promovendo a inspiração."
          }
        ],
        checklist: [
          "Conheço os músculos da mastigação",
          "Sei a função do ECM",
          "Entendo o papel do diafragma na respiração",
          "Conheço os músculos abdominais e suas funções"
        ]
      },
      {
        titulo: "Músculos do Dorso e Membros Superiores",
        descricao: "Trapézio, latíssimo do dorso, deltóide, bíceps, tríceps e músculos do antebraço",
        duracaoMinutos: 40,
        conteudo: `# Músculos do Dorso e Membros Superiores

## Dorso

| Músculo | Função Principal |
|---|---|
| **Trapézio** | Elevação, depressão, retração da escápula |
| **Latíssimo do dorso** | Extensão, adução e rotação medial do braço |
| **Eretores da espinha** | Extensão da coluna vertebral |

## Membros Superiores

| Músculo | Função Principal |
|---|---|
| **Deltoide** | Abdução do braço |
| **Bíceps braquial** | Flexão do cotovelo, supinação |
| **Tríceps braquial** | Extensão do cotovelo |
| **Flexores do antebraço** | Flexão do punho e dedos |
| **Extensores do antebraço** | Extensão do punho e dedos |

> O trapézio é dividido em porções superior, média e inferior, cada uma com ação diferente.`,
        quiz: [
          {
            pergunta: "Qual músculo é o principal responsável pela abdução do braço?",
            opcoes: ["Bíceps braquial", "Tríceps braquial", "Deltoide", "Latíssimo do dorso"],
            respostaCorreta: 2,
            explicacao: "O deltoide é o principal músculo responsável pela abdução (afastar do corpo) do braço."
          }
        ],
        checklist: [
          "Conheço os músculos do dorso e suas funções",
          "Sei a diferença entre bíceps e tríceps",
          "Entendo as 3 porções do trapézio",
          "Conheço flexores e extensores do antebraço"
        ]
      },
      {
        titulo: "Músculos dos Membros Inferiores",
        descricao: "Glúteos, quadríceps, isquiotibiais, adutores, gastrocnêmio e tibial anterior",
        duracaoMinutos: 40,
        conteudo: `# Músculos dos Membros Inferiores

| Músculo | Função Principal |
|---|---|
| **Glúteo máximo** | Extensão e rotação lateral do quadril |
| **Glúteo médio e mínimo** | Abdução do quadril |
| **Quadríceps femoral** | Extensão do joelho |
| **Isquiotibiais (posteriores)** | Flexão do joelho |
| **Adutores** | Adução da coxa |
| **Gastrocnêmio (panturrilha)** | Flexão plantar do tornozelo |
| **Tibial anterior** | Dorsiflexão do tornozelo |

> Os isquiotibiais (bíceps femoral, semitendíneo e semimembranáceo) são frequentemente encurtados em sedentários.`,
        quiz: [
          {
            pergunta: "Qual músculo é o principal extensor do joelho?",
            opcoes: ["Isquiotibiais", "Quadríceps femoral", "Gastrocnêmio", "Glúteo máximo"],
            respostaCorreta: 1,
            explicacao: "O quadríceps femoral (reto femoral, vasto lateral, vasto medial e vasto intermédio) é o principal extensor do joelho."
          }
        ],
        checklist: [
          "Conheço os músculos dos membros inferiores",
          "Sei diferenciar quadríceps e isquiotibiais",
          "Conheço as funções dos glúteos",
          "Entendo dorsiflexão vs flexão plantar"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 5 — SISTEMA NERVOSO (15h · 4 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Sistema Nervoso",
    descricao: "SNC, SNP, encéfalo, medula espinhal e nervos cranianos",
    icone: "BarChart3",
    cor: "from-purple-50 to-violet-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Divisões do Sistema Nervoso",
        descricao: "Sistema Nervoso Central e Periférico: componentes e funções",
        duracaoMinutos: 40,
        conteudo: `# Divisões do Sistema Nervoso

| Divisão | Componentes | Função |
|---|---|---|
| **Sistema Nervoso Central (SNC)** | Encéfalo, medula espinhal | Integração e comando |
| **Sistema Nervoso Periférico (SNP)** | Nervos cranianos, espinhais, gânglios | Conexão entre SNC e corpo |

> O SNC é o centro de processamento, enquanto o SNP é a rede de comunicação com todo o corpo.`,
        quiz: [
          {
            pergunta: "Quais são os componentes do Sistema Nervoso Central?",
            opcoes: ["Nervos e gânglios", "Encéfalo e medula espinhal", "Apenas o cérebro", "Nervos cranianos e espinhais"],
            respostaCorreta: 1,
            explicacao: "O Sistema Nervoso Central (SNC) é composto pelo encéfalo (cérebro, cerebelo e tronco encefálico) e medula espinhal."
          }
        ],
        checklist: [
          "Sei as 2 divisões principais do sistema nervoso",
          "Conheço os componentes do SNC e SNP",
          "Entendo a função de cada divisão"
        ]
      },
      {
        titulo: "Encéfalo e Medula Espinhal",
        descricao: "Cérebro, cerebelo, tronco encefálico e medula — estrutura e funções",
        duracaoMinutos: 50,
        conteudo: `# Encéfalo e Medula Espinhal

## Encéfalo

| Estrutura | Funções Principais |
|---|---|
| **Cérebro** | Pensamento, memória, emoções, movimentos voluntários |
| **Cerebelo** | Coordenação motora, equilíbrio |
| **Tronco encefálico** | Funções vitais (respiração, batimentos cardíacos) |

## Medula Espinhal

| Característica | Descrição |
|---|---|
| **Localização** | Canal vertebral |
| **Extensão** | Do forame magno à L1-L2 |
| **Funções** | Condução de impulsos, reflexos |

> O tronco encefálico controla funções vitais como respiração e frequência cardíaca — lesões nesta área podem ser fatais.`,
        quiz: [
          {
            pergunta: "Qual estrutura do encéfalo é responsável pelo equilíbrio e coordenação motora?",
            opcoes: ["Cérebro", "Cerebelo", "Tronco encefálico", "Medula espinhal"],
            respostaCorreta: 1,
            explicacao: "O cerebelo é responsável pela coordenação motora, equilíbrio e aprendizado motor."
          },
          {
            pergunta: "Até qual nível vertebral se estende a medula espinhal no adulto?",
            opcoes: ["C7", "T12", "L1-L2", "S1"],
            respostaCorreta: 2,
            explicacao: "No adulto, a medula espinhal se estende do forame magno até o nível de L1-L2, onde termina no cone medular."
          }
        ],
        checklist: [
          "Conheço as 3 partes do encéfalo e suas funções",
          "Sei onde se localiza a medula espinhal",
          "Entendo a extensão da medula (forame magno a L1-L2)",
          "Conheço as funções do tronco encefálico"
        ]
      },
      {
        titulo: "Os 12 Nervos Cranianos",
        descricao: "Nome, número e função de cada par de nervos cranianos",
        duracaoMinutos: 50,
        conteudo: `# Os 12 Nervos Cranianos

| Número | Nome | Função Principal |
|---|---|---|
| **I** | Olfatório | Olfato |
| **II** | Óptico | Visão |
| **III** | Oculomotor | Movimento ocular |
| **IV** | Troclear | Movimento ocular |
| **V** | Trigêmeo | Sensibilidade facial, mastigação |
| **VI** | Abducente | Movimento ocular |
| **VII** | Facial | Expressão facial, paladar |
| **VIII** | Vestibulococlear | Audição, equilíbrio |
| **IX** | Glossofaríngeo | Deglutição, paladar |
| **X** | Vago | Funções viscerais |
| **XI** | Acessório | Movimento da cabeça e ombros |
| **XII** | Hipoglosso | Movimento da língua |

> O nervo vago (X) é o mais longo dos nervos cranianos e influencia coração, pulmões e sistema digestório.`,
        quiz: [
          {
            pergunta: "Qual nervo craniano é responsável pela audição e equilíbrio?",
            opcoes: ["Olfatório (I)", "Trigêmeo (V)", "Vestibulococlear (VIII)", "Vago (X)"],
            respostaCorreta: 2,
            explicacao: "O nervo vestibulococlear (VIII par) possui dois ramos: o vestibular (equilíbrio) e o coclear (audição)."
          },
          {
            pergunta: "Qual é o nervo craniano mais longo?",
            opcoes: ["Trigêmeo (V)", "Facial (VII)", "Vago (X)", "Hipoglosso (XII)"],
            respostaCorreta: 2,
            explicacao: "O nervo vago (X) é o mais longo dos nervos cranianos, estendendo-se do tronco encefálico até o abdômen, influenciando diversos órgãos."
          }
        ],
        checklist: [
          "Sei nomear os 12 pares de nervos cranianos",
          "Conheço a função principal de cada um",
          "Entendo a importância do nervo vago",
          "Sei quais nervos controlam o movimento ocular (III, IV, VI)"
        ]
      },
      {
        titulo: "Sistema Nervoso Autônomo",
        descricao: "Simpático e parassimpático: luta-ou-fuga versus descanso-e-digestão",
        duracaoMinutos: 40,
        conteudo: `# Sistema Nervoso Autônomo

## Divisões

- **Simpático**: resposta de luta-ou-fuga — aumenta frequência cardíaca, dilata pupilas
- **Parassimpático**: repouso e digestão — diminui frequência cardíaca, estimula digestão

> O equilíbrio entre simpático e parassimpático é essencial para a homeostase.

## Aplicação Clínica

- Estresse crônico = hiperatividade simpática
- Técnicas de relaxamento ativam o parassimpático
- O nervo vago é a principal via parassimpática`,
        quiz: [
          {
            pergunta: "Qual divisão do sistema nervoso autônomo é ativada em situações de estresse?",
            opcoes: ["Parassimpático", "Simpático", "Somático", "Entérico"],
            respostaCorreta: 1,
            explicacao: "O sistema nervoso simpático é ativado em situações de estresse (luta-ou-fuga), aumentando a frequência cardíaca e a pressão arterial."
          }
        ],
        checklist: [
          "Sei diferenciar simpático e parassimpático",
          "Entendo a resposta de luta-ou-fuga",
          "Conheço o papel do nervo vago",
          "Entendo como o estresse afeta o equilíbrio autonômico"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 6 — SISTEMA CARDIOVASCULAR (10h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Sistema Cardiovascular",
    descricao: "Coração, câmaras, válvulas, circulação pulmonar e sistêmica",
    icone: "Package",
    cor: "from-blue-50 to-indigo-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Anatomia do Coração",
        descricao: "Localização, camadas, câmaras e válvulas cardíacas",
        duracaoMinutos: 40,
        conteudo: `# Anatomia do Coração

| Estrutura | Descrição |
|---|---|
| **Localização** | Mediastino médio, entre os pulmões |
| **Camadas** | Pericárdio, miocárdio, endocárdio |
| **Câmaras** | Átrios direito/esquerdo, ventrículos direito/esquerdo |
| **Válvulas** | Tricúspide, mitral, pulmonar, aórtica |

> O coração bate cerca de 100.000 vezes por dia, bombeando aproximadamente 7.500 litros de sangue.`,
        quiz: [
          {
            pergunta: "Quantas câmaras tem o coração humano?",
            opcoes: ["2", "3", "4", "5"],
            respostaCorreta: 2,
            explicacao: "O coração possui 4 câmaras: átrio direito, átrio esquerdo, ventrículo direito e ventrículo esquerdo."
          }
        ],
        checklist: [
          "Sei a localização do coração",
          "Conheço as 3 camadas do coração",
          "Identifico as 4 câmaras",
          "Sei nomear as 4 válvulas cardíacas"
        ]
      },
      {
        titulo: "Circulação Pulmonar e Sistêmica",
        descricao: "Pequena e grande circulação: trajetos e funções",
        duracaoMinutos: 40,
        conteudo: `# Circulação Pulmonar e Sistêmica

## Circulação Pulmonar (Pequena Circulação)

Ventrículo direito → Artérias pulmonares → Pulmões → Veias pulmonares → Átrio esquerdo

> Nas artérias pulmonares o sangue é NÃO oxigenado — exceção à regra de que artérias levam sangue oxigenado.

## Circulação Sistêmica (Grande Circulação)

Ventrículo esquerdo → Aorta → Corpo → Veias cavas → Átrio direito

> A circulação sistêmica leva sangue oxigenado a todos os tecidos do corpo.`,
        quiz: [
          {
            pergunta: "Qual câmara do coração inicia a circulação sistêmica?",
            opcoes: ["Átrio direito", "Ventrículo direito", "Átrio esquerdo", "Ventrículo esquerdo"],
            respostaCorreta: 3,
            explicacao: "O ventrículo esquerdo bombeia sangue oxigenado para a aorta, iniciando a circulação sistêmica (grande circulação)."
          }
        ],
        checklist: [
          "Sei o trajeto da circulação pulmonar",
          "Sei o trajeto da circulação sistêmica",
          "Entendo que artérias pulmonares levam sangue NÃO oxigenado",
          "Diferencio pequena e grande circulação"
        ]
      },
      {
        titulo: "Principais Vasos Sanguíneos",
        descricao: "Aorta, artérias pulmonares, veias cavas, carótidas e jugulares",
        duracaoMinutos: 40,
        conteudo: `# Principais Vasos Sanguíneos

| Vaso | Localização | Função |
|---|---|---|
| **Aorta** | Sai do ventrículo esquerdo | Principal artéria do corpo |
| **Artérias pulmonares** | Ventrículo direito aos pulmões | Levam sangue não oxigenado |
| **Veias cavas** | Átrio direito | Retorno venoso |
| **Veias pulmonares** | Pulmões ao átrio esquerdo | Trazem sangue oxigenado |
| **Artérias carótidas** | Pescoço | Irrigação da cabeça |
| **Veias jugulares** | Pescoço | Drenagem da cabeça |

> A aorta é a maior artéria do corpo humano, com diâmetro de cerca de 2,5 cm.`,
        quiz: [
          {
            pergunta: "Qual vaso sanguíneo é responsável pelo retorno venoso ao coração?",
            opcoes: ["Aorta", "Artérias carótidas", "Veias cavas", "Artérias pulmonares"],
            respostaCorreta: 2,
            explicacao: "As veias cavas (superior e inferior) são responsáveis pelo retorno venoso, trazendo o sangue de todo o corpo de volta ao átrio direito."
          }
        ],
        checklist: [
          "Conheço os principais vasos sanguíneos",
          "Sei diferenciar artérias e veias",
          "Conheço a função das carótidas e jugulares",
          "Entendo o papel da aorta"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 7 — SISTEMA RESPIRATÓRIO (8h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Sistema Respiratório",
    descricao: "Vias aéreas, pulmões, alvéolos e trocas gasosas",
    icone: "Wind",
    cor: "from-sky-50 to-blue-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Estruturas do Sistema Respiratório",
        descricao: "Cavidade nasal, faringe, laringe, traqueia, brônquios, bronquíolos e alvéolos",
        duracaoMinutos: 45,
        conteudo: `# Estruturas do Sistema Respiratório

| Estrutura | Função |
|---|---|
| **Cavidade nasal** | Filtragem, aquecimento, umidificação do ar |
| **Faringe** | Passagem de ar e alimento |
| **Laringe** | Produção de som, proteção das vias aéreas |
| **Traqueia** | Condução do ar |
| **Brônquios** | Condução do ar para os pulmões |
| **Bronquíolos** | Condução do ar nos pulmões |
| **Alvéolos** | Trocas gasosas |

> As vias aéreas superiores (cavidade nasal, faringe, laringe) filtram, aquecem e umidificam o ar antes de chegar aos pulmões.`,
        quiz: [
          {
            pergunta: "Onde ocorrem as trocas gasosas (O₂ e CO₂)?",
            opcoes: ["Traqueia", "Brônquios", "Bronquíolos", "Alvéolos"],
            respostaCorreta: 3,
            explicacao: "Os alvéolos pulmonares são as estruturas onde ocorrem as trocas gasosas entre o ar e o sangue. Existem cerca de 300 milhões em cada pulmão."
          }
        ],
        checklist: [
          "Conheço todas as estruturas do sistema respiratório",
          "Sei a função de cada estrutura",
          "Entendo o percurso do ar da cavidade nasal aos alvéolos",
          "Sei onde ocorrem as trocas gasosas"
        ]
      },
      {
        titulo: "Anatomia dos Pulmões",
        descricao: "Lobos, pleuras e características dos pulmões direito e esquerdo",
        duracaoMinutos: 35,
        conteudo: `# Anatomia dos Pulmões

| Característica | Descrição |
|---|---|
| **Pulmão direito** | 3 lobos (superior, médio, inferior) |
| **Pulmão esquerdo** | 2 lobos (superior, inferior) e incisura cardíaca |
| **Pleuras** | Membranas que revestem os pulmões |

## Mecânica Respiratória

- **Inspiração**: contração do diafragma → aumenta volume torácico → ar entra
- **Expiração**: relaxamento do diafragma → diminui volume torácico → ar sai
- **Músculos acessórios**: intercostais, escalenos, esternocleidomastóideo

> O pulmão esquerdo é menor que o direito porque acomoda o coração (incisura cardíaca).`,
        quiz: [
          {
            pergunta: "Quantos lobos tem o pulmão direito?",
            opcoes: ["2 lobos", "3 lobos", "4 lobos", "5 lobos"],
            respostaCorreta: 1,
            explicacao: "O pulmão direito possui 3 lobos (superior, médio e inferior), enquanto o esquerdo possui apenas 2 lobos e a incisura cardíaca."
          }
        ],
        checklist: [
          "Sei a diferença entre pulmão direito e esquerdo",
          "Conheço a função das pleuras",
          "Entendo a mecânica da inspiração e expiração",
          "Sei por que o pulmão esquerdo é menor"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 8 — SISTEMA DIGESTÓRIO (10h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Sistema Digestório",
    descricao: "Tubo digestivo, órgãos anexos e peritônio",
    icone: "Utensils",
    cor: "from-orange-50 to-amber-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Estruturas do Sistema Digestório",
        descricao: "Da boca ao ânus: estruturas e funções de cada órgão",
        duracaoMinutos: 50,
        conteudo: `# Estruturas do Sistema Digestório

| Estrutura | Função Principal |
|---|---|
| **Boca** | Mastigação, início da digestão |
| **Faringe** | Deglutição |
| **Esôfago** | Condução do alimento ao estômago |
| **Estômago** | Digestão química e mecânica |
| **Intestino delgado** | Absorção de nutrientes |
| **Intestino grosso** | Absorção de água, formação das fezes |
| **Fígado** | Produção de bile, metabolismo |
| **Pâncreas** | Produção de enzimas digestivas e hormônios |
| **Vesícula biliar** | Armazenamento da bile |

> O intestino delgado tem cerca de 6 metros de comprimento e é onde ocorre a maior parte da absorção de nutrientes.`,
        quiz: [
          {
            pergunta: "Qual órgão é o principal responsável pela absorção de nutrientes?",
            opcoes: ["Estômago", "Intestino delgado", "Intestino grosso", "Fígado"],
            respostaCorreta: 1,
            explicacao: "O intestino delgado é o principal local de absorção de nutrientes, graças às suas vilosidades que aumentam enormemente a superfície de absorção."
          }
        ],
        checklist: [
          "Conheço todas as estruturas do sistema digestório",
          "Sei a função de cada órgão",
          "Entendo o papel do fígado e pâncreas",
          "Sei a diferença entre intestino delgado e grosso"
        ]
      },
      {
        titulo: "Peritônio e Órgãos Anexos",
        descricao: "Peritônio, fígado, pâncreas e vesícula biliar em detalhe",
        duracaoMinutos: 40,
        conteudo: `# Peritônio e Órgãos Anexos

## Peritônio

Membrana serosa que reveste a cavidade abdominal e cobre as vísceras.

- **Peritônio parietal**: reveste a parede abdominal
- **Peritônio visceral**: reveste os órgãos
- **Mesentério**: prega que sustenta o intestino

## Fígado

- Maior glândula do corpo
- Produz bile para digestão de gorduras
- Função de desintoxicação e metabolismo

## Pâncreas

- Função exócrina: enzimas digestivas
- Função endócrina: insulina e glucagon

## Vesícula Biliar

- Armazena e concentra a bile
- Libera bile no duodeno durante a digestão

> O fígado é o maior órgão sólido do corpo e desempenha mais de 500 funções metabólicas.`,
        quiz: [
          {
            pergunta: "Qual é o maior órgão sólido do corpo humano?",
            opcoes: ["Pâncreas", "Baço", "Fígado", "Rim"],
            respostaCorreta: 2,
            explicacao: "O fígado é o maior órgão sólido do corpo humano, pesando aproximadamente 1,5 kg e desempenhando mais de 500 funções metabólicas."
          }
        ],
        checklist: [
          "Entendo o que é o peritônio",
          "Conheço as funções do fígado",
          "Sei as funções duplas do pâncreas",
          "Entendo o papel da vesícula biliar"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 9 — SISTEMA URINÁRIO (6h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Sistema Urinário",
    descricao: "Rins, ureteres, bexiga, uretra e anatomia do rim",
    icone: "Droplets",
    cor: "from-cyan-50 to-teal-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Estruturas do Sistema Urinário",
        descricao: "Rins, ureteres, bexiga e uretra — localização e funções",
        duracaoMinutos: 35,
        conteudo: `# Estruturas do Sistema Urinário

| Estrutura | Função |
|---|---|
| **Rins** | Filtração do sangue, produção de urina |
| **Ureteres** | Condução da urina dos rins à bexiga |
| **Bexiga urinária** | Armazenamento da urina |
| **Uretra** | Eliminação da urina |

> Os rins filtram aproximadamente 180 litros de sangue por dia, produzindo cerca de 1,5 litros de urina.`,
        quiz: [
          {
            pergunta: "Qual é a função principal dos rins?",
            opcoes: ["Armazenar urina", "Filtrar o sangue e produzir urina", "Conduzir urina", "Eliminar urina"],
            respostaCorreta: 1,
            explicacao: "Os rins são responsáveis pela filtração do sangue, remoção de resíduos metabólicos e produção de urina."
          }
        ],
        checklist: [
          "Conheço as 4 estruturas do sistema urinário",
          "Sei a função de cada estrutura",
          "Entendo o percurso da urina"
        ]
      },
      {
        titulo: "Anatomia do Rim",
        descricao: "Córtex, medula, pelve renal e néfron — unidade funcional",
        duracaoMinutos: 35,
        conteudo: `# Anatomia do Rim

| Parte | Descrição |
|---|---|
| **Córtex renal** | Camada externa |
| **Medula renal** | Camada interna com pirâmides renais |
| **Pelve renal** | Região de coleta da urina |
| **Néfron** | Unidade funcional do rim |

## O Néfron

- **Glomérulo**: filtração do sangue
- **Cápsula de Bowman**: recebe o filtrado
- **Túbulos renais**: reabsorção e secreção
- **Ducto coletor**: coleta a urina formada

> Cada rim possui cerca de 1 milhão de néfrons, que são as unidades funcionais responsáveis pela filtração.`,
        quiz: [
          {
            pergunta: "Qual é a unidade funcional do rim?",
            opcoes: ["Glomérulo", "Córtex renal", "Néfron", "Pelve renal"],
            respostaCorreta: 2,
            explicacao: "O néfron é a unidade funcional do rim, responsável pela filtração do sangue. Cada rim possui cerca de 1 milhão de néfrons."
          }
        ],
        checklist: [
          "Conheço as partes do rim",
          "Sei o que é o néfron",
          "Entendo o processo de filtração",
          "Sei que cada rim tem ~1 milhão de néfrons"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 10 — SISTEMA REPRODUTOR (8h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Sistema Reprodutor",
    descricao: "Anatomia dos sistemas reprodutores masculino e feminino",
    icone: "Users",
    cor: "from-pink-50 to-rose-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Sistema Reprodutor Masculino",
        descricao: "Testículos, epidídimo, ducto deferente, próstata e pênis",
        duracaoMinutos: 40,
        conteudo: `# Sistema Reprodutor Masculino

| Estrutura | Função |
|---|---|
| **Testículos** | Produção de espermatozoides e testosterona |
| **Epidídimo** | Armazenamento e maturação dos espermatozoides |
| **Ducto deferente** | Condução dos espermatozoides |
| **Próstata** | Produção de líquido prostático |
| **Pênis** | Órgão copulador |
| **Uretra** | Passagem de urina e sêmen |

> Os testículos produzem cerca de 200-300 milhões de espermatozoides por dia.`,
        quiz: [
          {
            pergunta: "Qual estrutura é responsável pela maturação dos espermatozoides?",
            opcoes: ["Testículos", "Epidídimo", "Próstata", "Ducto deferente"],
            respostaCorreta: 1,
            explicacao: "O epidídimo é responsável pelo armazenamento e maturação dos espermatozoides. Os espermatozoides levam cerca de 12 dias para amadurecer no epidídimo."
          }
        ],
        checklist: [
          "Conheço as estruturas do sistema reprodutor masculino",
          "Sei a função de cada estrutura",
          "Entendo o caminho dos espermatozoides"
        ]
      },
      {
        titulo: "Sistema Reprodutor Feminino",
        descricao: "Ovários, tubas uterinas, útero, vagina e vulva",
        duracaoMinutos: 40,
        conteudo: `# Sistema Reprodutor Feminino

| Estrutura | Função |
|---|---|
| **Ovários** | Produção de óvulos e hormônios |
| **Tubas uterinas** | Captação do óvulo, local da fertilização |
| **Útero** | Desenvolvimento do feto |
| **Vagina** | Canal do parto, órgão copulador |
| **Vulva** | Órgãos genitais externos |

> A fertilização normalmente ocorre no terço lateral da tuba uterina, não no útero.`,
        quiz: [
          {
            pergunta: "Onde normalmente ocorre a fertilização?",
            opcoes: ["Ovário", "Útero", "Tuba uterina", "Vagina"],
            respostaCorreta: 2,
            explicacao: "A fertilização normalmente ocorre no terço lateral (ampola) da tuba uterina. Após a fertilização, o zigoto migra para o útero onde se implanta."
          }
        ],
        checklist: [
          "Conheço as estruturas do sistema reprodutor feminino",
          "Sei a função de cada estrutura",
          "Entendo onde ocorre a fertilização",
          "Sei a diferença entre vagina e vulva"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 11 — SISTEMA ENDÓCRINO (8h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Sistema Endócrino",
    descricao: "Glândulas endócrinas, hormônios e regulação corporal",
    icone: "Sparkles",
    cor: "from-fuchsia-50 to-purple-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Principais Glândulas Endócrinas",
        descricao: "Hipófise, tireoide, paratireoides, suprarrenais, pâncreas, ovários e testículos",
        duracaoMinutos: 50,
        conteudo: `# Principais Glândulas Endócrinas

| Glândula | Localização | Hormônios Principais |
|---|---|---|
| **Hipófise** | Base do crânio | GH, TSH, ACTH, FSH, LH, prolactina |
| **Tireoide** | Pescoço | T3, T4, calcitonina |
| **Paratireoides** | Pescoço (atrás da tireoide) | Paratormônio (PTH) |
| **Suprarrenais** | Sobre os rins | Cortisol, aldosterona, adrenalina |
| **Pâncreas (ilhotas)** | Abdômen | Insulina, glucagon |
| **Ovários** | Pelve | Estrógeno, progesterona |
| **Testículos** | Bolsa escrotal | Testosterona |

> A hipófise é chamada de "glândula mestra" porque controla a maioria das outras glândulas endócrinas.`,
        quiz: [
          {
            pergunta: "Qual glândula é considerada a 'mestra' do sistema endócrino?",
            opcoes: ["Tireoide", "Hipófise", "Suprarrenal", "Pâncreas"],
            respostaCorreta: 1,
            explicacao: "A hipófise é chamada de 'glândula mestra' porque produz hormônios que regulam a função da maioria das outras glândulas endócrinas."
          },
          {
            pergunta: "Qual hormônio é responsável pela regulação do açúcar no sangue?",
            opcoes: ["Cortisol", "T3/T4", "Insulina", "Adrenalina"],
            respostaCorreta: 2,
            explicacao: "A insulina, produzida pelas ilhotas de Langerhans no pâncreas, é o principal hormônio regulador da glicemia (açúcar no sangue)."
          }
        ],
        checklist: [
          "Conheço as principais glândulas endócrinas",
          "Sei a localização de cada glândula",
          "Conheço os hormônios principais",
          "Entendo por que a hipófise é a 'glândula mestra'"
        ]
      },
      {
        titulo: "Regulação Hormonal e Homeostase",
        descricao: "Feedback negativo, eixos hormonais e desequilíbrios comuns",
        duracaoMinutos: 40,
        conteudo: `# Regulação Hormonal e Homeostase

## Mecanismo de Feedback Negativo

A maioria dos hormônios é regulada por feedback negativo:
- Estímulo → Liberação de hormônio → Efeito no alvo → Inibição da produção

## Eixos Hormonais Importantes

- **Hipotálamo → Hipófise → Tireoide**: regula metabolismo
- **Hipotálamo → Hipófise → Suprarrenais**: regula estresse
- **Hipotálamo → Hipófise → Gônadas**: regula reprodução

## Desequilíbrios Comuns

| Condição | Causa | Sintomas |
|---|---|---|
| Hipotireoidismo | Pouca produção de T3/T4 | Fadiga, ganho de peso, frio |
| Hipertireoidismo | Excesso de T3/T4 | Perda de peso, taquicardia, calor |
| Diabetes tipo 1 | Falta de insulina | Hiperglicemia |
| Diabetes tipo 2 | Resistência à insulina | Hiperglicemia |

> Entender os eixos hormonais é fundamental para compreender muitas condições clínicas.`,
        quiz: [
          {
            pergunta: "O que acontece no hipotireoidismo?",
            opcoes: ["Excesso de hormônios tireoidianos", "Deficiência de hormônios tireoidianos", "Excesso de insulina", "Deficiência de cortisol"],
            respostaCorreta: 1,
            explicacao: "No hipotireoidismo há deficiência na produção de hormônios tireoidianos (T3 e T4), causando fadiga, ganho de peso e sensibilidade ao frio."
          }
        ],
        checklist: [
          "Entendo o mecanismo de feedback negativo",
          "Conheço os principais eixos hormonais",
          "Sei identificar sintomas de hipo e hipertireoidismo",
          "Conheço a diferença entre diabetes tipo 1 e 2"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 12 — TÉCNICAS EM ANATOMIA (8h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Técnicas em Anatomia e Biossegurança",
    descricao: "Dissecação, técnicas histológicas e biossegurança no laboratório",
    icone: "FlaskConical",
    cor: "from-emerald-50 to-teal-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Técnicas de Dissecação e Histologia",
        descricao: "Dissecção, macroscopia, conservação e técnicas histológicas",
        duracaoMinutos: 50,
        conteudo: `# Técnicas de Dissecação e Histologia

## Técnicas de Dissecação

| Técnica | Descrição |
|---|---|
| **Dissecção** | Separação cuidadosa dos tecidos para exposição de estruturas |
| **Macroscopia** | Análise de espécimes anatômicos a olho nu |
| **Técnicas de conservação** | Formolização, embalsamamento |
| **Preparação de peças anatômicas** | Identificação e preservação de estruturas |

## Técnicas Histológicas

| Técnica | Descrição |
|---|---|
| **Inclusão em parafina** | Preparo de amostras para corte |
| **Microtomia** | Cortes finos dos tecidos |
| **Coloração** | Hematoxilina-eosina (HE), colorações especiais |
| **Montagem de lâminas** | Preparação para análise microscópica |

> A hematoxilina-eosina (HE) é a coloração mais usada em histologia, corando núcleos em azul e citoplasma em rosa.`,
        quiz: [
          {
            pergunta: "Qual é a coloração histológica mais comumente utilizada?",
            opcoes: ["Giemsa", "Hematoxilina-eosina (HE)", "Azul de metileno", "PAS"],
            respostaCorreta: 1,
            explicacao: "A hematoxilina-eosina (HE) é a coloração padrão em histologia: a hematoxilina cora os núcleos em azul/roxo e a eosina cora o citoplasma em rosa."
          }
        ],
        checklist: [
          "Conheço as principais técnicas de dissecação",
          "Sei as etapas das técnicas histológicas",
          "Entendo a coloração HE",
          "Conheço métodos de conservação de tecidos"
        ]
      },
      {
        titulo: "Biossegurança no Laboratório de Anatomia",
        descricao: "EPIs, manuseio de produtos químicos, descarte e higienização",
        duracaoMinutos: 40,
        conteudo: `# Biossegurança no Laboratório de Anatomia

## Procedimentos de Biossegurança

| Item | Procedimento |
|---|---|
| **EPIs obrigatórios** | Luvas, avental, máscara, óculos de proteção, calçados fechados |
| **Manuseio de produtos químicos** | Formol, álcool, xilol — usar em capelas com exaustão |
| **Descarte de resíduos** | Seguir normas da vigilância sanitária |
| **Higienização** | Limpeza rigorosa de superfícies e instrumentos |

> O formol (formaldeído) é classificado como carcinógeno — sempre manipular em capelas de exaustão com EPIs completos.

## Normas Importantes

- NR 32: Segurança em estabelecimentos de saúde
- Resoluções ANVISA sobre gerenciamento de resíduos
- Normas do CONAMA sobre descarte ambiental`,
        quiz: [
          {
            pergunta: "Qual é o EPI mínimo obrigatório em um laboratório de anatomia?",
            opcoes: ["Apenas luvas", "Luvas e máscara", "Luvas, avental, máscara, óculos e calçados fechados", "Não é necessário EPI"],
            respostaCorreta: 2,
            explicacao: "O conjunto mínimo obrigatório de EPIs em laboratório de anatomia inclui: luvas, avental, máscara, óculos de proteção e calçados fechados."
          }
        ],
        checklist: [
          "Conheço os EPIs obrigatórios para laboratório",
          "Sei manusear produtos químicos com segurança",
          "Entendo as normas de descarte de resíduos",
          "Conheço os riscos do formol"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 13 — ÉTICA PROFISSIONAL E BIOSSEGURANÇA (4h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Ética Profissional e Biossegurança",
    descricao: "Princípios éticos, limites de atuação e responsabilidade profissional",
    icone: "Shield",
    cor: "from-gray-50 to-slate-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Princípios Éticos",
        descricao: "Respeito, confidencialidade, competência e responsabilidade profissional",
        duracaoMinutos: 30,
        conteudo: `# Princípios Éticos

| Princípio | Aplicação |
|---|---|
| **Respeito à dignidade humana** | Tratamento respeitoso de cadáveres e peças anatômicas |
| **Confidencialidade** | Sigilo sobre informações de pacientes |
| **Competência profissional** | Atualização constante |
| **Responsabilidade** | Compromisso com a qualidade do trabalho |

> O respeito à dignidade humana se estende aos cadáveres — são corpos doados para a ciência e devem ser tratados com reverência.`,
        quiz: [
          {
            pergunta: "Qual princípio ético envolve o tratamento respeitoso de cadáveres?",
            opcoes: ["Confidencialidade", "Competência", "Respeito à dignidade humana", "Responsabilidade"],
            respostaCorreta: 2,
            explicacao: "O respeito à dignidade humana é o princípio que exige tratamento respeitoso de cadáveres e peças anatômicas, reconhecendo que foram seres humanos."
          }
        ],
        checklist: [
          "Conheço os 4 princípios éticos fundamentais",
          "Sei como aplicar cada princípio na prática",
          "Entendo a importância do sigilo profissional",
          "Mantenho compromisso com atualização constante"
        ]
      },
      {
        titulo: "Limites de Atuação",
        descricao: "O que pode e não pode fazer um profissional de anatomia",
        duracaoMinutos: 25,
        conteudo: `# Limites de Atuação

| PODE ✅ | NÃO PODE ❌ |
|---|---|
| Auxiliar em procedimentos técnicos | Realizar diagnósticos médicos |
| Preparar material para aulas práticas | Substituir profissional médico |
| Manter laboratório organizado | Divulgar imagens não autorizadas |
| Orientar alunos sobre técnicas | Realizar procedimentos sem supervisão |

> Conhecer seus limites de atuação é tão importante quanto conhecer suas competências.

## Consequências de Extrapolação

- Sanções administrativas
- Processos judiciais
- Cassação de registro profissional
- Responsabilidade civil e criminal`,
        quiz: [
          {
            pergunta: "Qual atividade NÃO é permitida a um técnico em anatomia?",
            opcoes: ["Preparar material para aulas", "Manter laboratório organizado", "Realizar diagnósticos médicos", "Orientar alunos sobre técnicas"],
            respostaCorreta: 2,
            explicacao: "Realizar diagnósticos médicos é atribuição exclusiva do médico. O técnico em anatomia auxilia em procedimentos técnicos e preparação de materiais."
          }
        ],
        checklist: [
          "Sei o que posso fazer como profissional",
          "Conheço os limites da minha atuação",
          "Entendo as consequências da extrapolação",
          "Sei quando encaminhar para outro profissional"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 14 — PROFISSIONALIZAÇÃO E NEGÓCIOS (6h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Profissionalização e Negócios",
    descricao: "Carreiras, locais de atuação e precificação na área de anatomia",
    icone: "Briefcase",
    cor: "from-indigo-50 to-blue-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Carreiras em Anatomia",
        descricao: "As principais carreiras e onde atuar na área de anatomia",
        duracaoMinutos: 35,
        conteudo: `# Carreiras em Anatomia

| Carreira | Descrição | Onde Atuar |
|---|---|---|
| **Técnico em Anatomia Patológica** | Processamento de amostras, histologia | Hospitais, laboratórios |
| **Técnico de Laboratório de Anatomia** | Preparação de peças, dissecação | Universidades, centros de pesquisa |
| **Docente** | Ensino de anatomia em cursos técnicos e superiores | Instituições de ensino |
| **Pesquisador** | Pesquisa biomédica | Centros de pesquisa, indústria |
| **Representante técnico** | Vendas de equipamentos e insumos | Indústria farmacêutica, laboratórios |

> A área de anatomia oferece diversas possibilidades de carreira, desde o técnico até o pesquisador.`,
        quiz: [
          {
            pergunta: "Qual profissional é responsável pelo processamento de amostras e histologia?",
            opcoes: ["Docente", "Pesquisador", "Técnico em Anatomia Patológica", "Representante técnico"],
            respostaCorreta: 2,
            explicacao: "O Técnico em Anatomia Patológica é responsável pelo processamento de amostras, técnicas histológicas e citológicas em hospitais e laboratórios."
          }
        ],
        checklist: [
          "Conheço as principais carreiras na área",
          "Sei onde cada profissional pode atuar",
          "Entendo as diferentes atribuições de cada carreira"
        ]
      },
      {
        titulo: "Locais de Atuação",
        descricao: "Hospitais, clínicas, universidades, centros de pesquisa e indústria",
        duracaoMinutos: 30,
        conteudo: `# Locais de Atuação

| Local | Tipo de Atuação |
|---|---|
| **Hospitais** | Laboratórios de anatomia patológica |
| **Clínicas privadas** | Processamento de amostras |
| **Universidades** | Laboratórios de ensino e pesquisa |
| **Centros de pesquisa biomédica** | Pesquisa |
| **Bancos de tecidos** | Preservação e preparação |
| **Medicina forense** | Necropsia, identificação |
| **Indústria farmacêutica** | Controle de qualidade, pesquisa |

> A medicina forense é uma das áreas mais fascinantes e desafiadoras para profissionais com conhecimento em anatomia.`,
        quiz: [
          {
            pergunta: "Em qual local um profissional de anatomia pode atuar em necropsia?",
            opcoes: ["Universidades", "Clínicas privadas", "Medicina forense", "Indústria farmacêutica"],
            respostaCorreta: 2,
            explicacao: "A medicina forense é o local onde profissionais de anatomia atuam em necropsia e identificação, auxiliando em investigações e causas de morte."
          }
        ],
        checklist: [
          "Conheço os diferentes locais de atuação",
          "Sei o tipo de trabalho em cada local",
          "Entendo as oportunidades na medicina forense"
        ]
      },
      {
        titulo: "Precificação e Mercado",
        descricao: "Salários, honorários e perspectivas financeiras na área",
        duracaoMinutos: 30,
        conteudo: `# Precificação e Mercado

## Tabela de Salários e Honorários

| Tipo de Atuação | Remuneração Média |
|---|---|
| **Técnico em Anatomia Patológica (CLT)** | R$ 2.500 - 4.000/mês |
| **Professor de Anatomia (horista)** | R$ 40 - 80/hora |
| **Consultoria técnica** | R$ 150 - 300/hora |
| **Aulas particulares** | R$ 50 - 100/hora |

## Dicas para Valorização Profissional

- Invista em especializações e pós-graduação
- Publique artigos e participe de congressos
- Mantenha-se atualizado com novas técnicas
- Construa um portfólio de experiências
- Faça networking com profissionais da área

> A consultoria técnica pode ser uma excelente fonte de renda complementar para profissionais experientes.`,
        quiz: [
          {
            pergunta: "Qual é o valor médio por hora de uma consultoria técnica em anatomia?",
            opcoes: ["R$ 20 - 40/hora", "R$ 50 - 100/hora", "R$ 150 - 300/hora", "R$ 500 - 1.000/hora"],
            respostaCorreta: 2,
            explicacao: "A consultoria técnica em anatomia tem remuneração média de R$ 150 a R$ 300 por hora, sendo uma das formas mais lucrativas de atuação."
          }
        ],
        checklist: [
          "Conheço os salários médios da área",
          "Sei as formas de remuneração disponíveis",
          "Entendo como valorizar minha carreira",
          "Conheço as oportunidades de consultoria"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 15 — BÔNUS E CERTIFICAÇÃO (4h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Bônus e Certificação",
    descricao: "Bônus exclusivos, suporte pós-curso e certificação profissional",
    icone: "Award",
    cor: "from-amber-50 to-yellow-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Bônus Exclusivos",
        descricao: "Atlas digital, vídeos de dissecação, modelos 3D, grupo VIP e mais",
        duracaoMinutos: 25,
        conteudo: `# Bônus Exclusivos

| Bônus | Descrição |
|---|---|
| **Atlas digital de anatomia** | Imagens de alta resolução para consulta |
| **Vídeos de dissecação** | Demonstrações práticas passo a passo |
| **Modelos 3D interativos** | Para estudo em dispositivos móveis |
| **Grupo VIP de alunas** | Comunidade exclusiva para troca de experiências |
| **Lista de fornecedores verificados** | Materiais, equipamentos, modelos anatômicos |
| **Planilha de estudos** | Organização do aprendizado |

> Esses bônus complementam o curso e oferecem recursos práticos para seu desenvolvimento profissional.`,
        quiz: [
          {
            pergunta: "Qual bônus permite estudo de anatomia em dispositivos móveis?",
            opcoes: ["Atlas digital", "Vídeos de dissecação", "Modelos 3D interativos", "Planilha de estudos"],
            respostaCorreta: 2,
            explicacao: "Os modelos 3D interativos foram desenvolvidos para estudo em dispositivos móveis, permitindo rotacionar e explorar estruturas anatômicas."
          }
        ],
        checklist: [
          "Conheço todos os bônus do curso",
          "Sei como acessar o atlas digital",
          "Sei como usar os modelos 3D",
          "Participei do grupo VIP"
        ]
      },
      {
        titulo: "Suporte Pós-Curso",
        descricao: "Acesso vitalício, atualizações, grupo de discussão e webinars",
        duracaoMinutos: 20,
        conteudo: `# Suporte Pós-Curso

## O que Você Recebe

- ✅ Acesso vitalício ao conteúdo
- ✅ Atualizações periódicas
- ✅ Grupo de discussão online
- ✅ Webinars com especialistas

> O aprendizado não termina com o curso — nosso suporte contínuo garante que você se mantenha atualizado.

## Comunidade de Aprendizado

- Troque experiências com colegas
- Tire dúvidas com instrutores
- Participe de eventos exclusivos
- Acesse conteúdo atualizado regularmente`,
        quiz: [
          {
            pergunta: "Por quanto tempo você tem acesso ao conteúdo do curso?",
            opcoes: ["6 meses", "1 ano", "2 anos", "Acesso vitalício"],
            respostaCorreta: 3,
            explicacao: "O curso oferece acesso vitalício ao conteúdo, incluindo todas as atualizações futuras."
          }
        ],
        checklist: [
          "Sei que tenho acesso vitalício",
          "Conheço os canais de suporte disponíveis",
          "Participei do grupo de discussão",
          "Sei quando são os webinars"
        ]
      },
      {
        titulo: "Certificação",
        descricao: "Certificado de conclusão e suas aplicações profissionais",
        duracaoMinutos: 25,
        conteudo: `# Certificação

## Ao finalizar o curso, você recebe o certificado de conclusão!

O certificado comprova as habilidades adquiridas e pode ser utilizado como diferencial profissional para:

- ✅ Comprovar horas extracurriculares em faculdades
- ✅ Enriquecer currículo
- ✅ Aumentar chances de conseguir novo emprego
- ✅ Aumentar chances de promoção
- ✅ Comprovar conhecimentos na área
- ✅ Obter licenças e alvarás (conforme exigências)

## Resumo do Curso

**15 Módulos | 130 Horas Totais**

> Ao final, você será um profissional apto a compreender a anatomia humana com profundidade, base científica e visão de mercado.

## Carga Horária por Módulo

| Módulo | Tema | Horas |
|---|---|---|
| 1 | Fundação | 10h |
| 2 | Sistema Esquelético | 12h |
| 3 | Sistema Articular | 8h |
| 4 | Sistema Muscular | 12h |
| 5 | Sistema Nervoso | 15h |
| 6 | Sistema Cardiovascular | 10h |
| 7 | Sistema Respiratório | 8h |
| 8 | Sistema Digestório | 10h |
| 9 | Sistema Urinário | 6h |
| 10 | Sistema Reprodutor | 8h |
| 11 | Sistema Endócrino | 8h |
| 12 | Técnicas em Anatomia | 8h |
| 13 | Ética e Biossegurança | 4h |
| 14 | Profissionalização | 6h |
| 15 | Bônus e Certificação | 4h |`,
        quiz: [
          {
            pergunta: "Quantos módulos e horas totais tem o curso completo?",
            opcoes: ["10 módulos, 80 horas", "12 módulos, 100 horas", "15 módulos, 130 horas", "20 módulos, 200 horas"],
            respostaCorreta: 2,
            explicacao: "O curso completo possui 15 módulos com carga horária total de 130 horas, cobrindo desde fundamentos até certificação profissional."
          }
        ],
        checklist: [
          "Concluí todos os 15 módulos",
          "Realizei todos os quizzes",
          "Sei como usar meu certificado profissionalmente",
          "Conheço as aplicações do certificado"
        ]
      }
    ]
  }
];
