import { type ModuloContent } from "@/data/cursoVendasContent";

export const cursoSeitaiData: ModuloContent[] = [
  // ═══════════════════════════════════════════════════════════
  // MÓDULO 1 — FUNDAÇÃO: O UNIVERSO DO SEITAI (10h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Fundação — O Universo do Seitai",
    descricao: "Definição, história, princípios fundamentais e conceito de Ki",
    icone: "Lightbulb",
    cor: "from-rose-50 to-pink-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "O que é Seitai",
        descricao: "Definição técnica, princípios fundamentais e comparação com quiropraxia ocidental",
        duracaoMinutos: 45,
        conteudo: `# O que é Seitai

## Definição Técnica

Seitai (整体) significa literalmente "ajuste corporal" em japonês. É uma terapia corporal tradicional japonesa que visa restaurar o equilíbrio e a harmonia dentro do corpo.

> Diferente das abordagens quiropráticas ocidentais que frequentemente envolvem ajustes mais forçados, o seitai emprega técnicas de manipulação suave para realinhar a estrutura do corpo e potencializar suas capacidades naturais de cura.

A terapia aborda de forma abrangente os desequilíbrios no fluxo de energia do corpo, no alinhamento esquelético e na tensão muscular.

## Princípios Fundamentais do Seitai

| Princípio | Descrição |
|---|---|
| **Poder inato de cura** | Crença na capacidade natural do corpo de se curar |
| **Equilíbrio energético** | Harmonização do fluxo de Ki (energia vital) |
| **Abordagem holística** | Tratamento do corpo como um todo integrado |
| **Suavidade** | Técnicas gentis, não invasivas |
| **Prevenção** | Manutenção da saúde antes do surgimento de doenças |

## Seitai vs. Quiropraxia Ocidental

| Aspecto | Seitai | Quiropraxia Ocidental |
|---|---|---|
| **Origem** | Japão, princípios orientais | EUA (1895), ciência ocidental |
| **Filosofia** | Equilíbrio energético (Ki) | Alinhamento estrutural e sistema nervoso |
| **Técnicas** | Manipulações suaves, pressão em pontos (tsubo) | Ajustes mais firmes, alta velocidade |
| **Abordagem** | Holística, corpo-mente-energia | Foco na coluna vertebral |
| **Público** | Amplo, incluindo idosos e crianças | Todas as idades, com adaptações |`,
        quiz: [
          {
            pergunta: "O que significa Seitai (整体) em japonês?",
            opcoes: ["Energia vital", "Ajuste corporal", "Medicina oriental", "Equilíbrio mental"],
            respostaCorreta: 1,
            explicacao: "Seitai (整体) significa literalmente 'ajuste corporal' em japonês, refletindo seu objetivo de restaurar o equilíbrio e harmonia do corpo."
          },
          {
            pergunta: "Qual é a principal diferença entre Seitai e Quiropraxia Ocidental?",
            opcoes: ["Seitai usa ajustes forçados", "Seitai emprega manipulações suaves", "Quiropraxia usa energia Ki", "Não há diferença"],
            respostaCorreta: 1,
            explicacao: "O Seitai emprega técnicas de manipulação suave, enquanto a quiropraxia ocidental frequentemente envolve ajustes mais firmes e de alta velocidade."
          }
        ],
        checklist: [
          "Sei definir Seitai e seu significado",
          "Conheço os 5 princípios fundamentais",
          "Diferencio Seitai de quiropraxia ocidental",
          "Entendo a abordagem holística do Seitai"
        ]
      },
      {
        titulo: "História do Seitai e New Seitai",
        descricao: "Evolução histórica, surgimento do J-SEITAI e abordagem moderna",
        duracaoMinutos: 40,
        conteudo: `# História do Seitai e New Seitai

## Linha do Tempo

| Período | Desenvolvimento |
|---|---|
| **Antiguidade** | Influência da medicina tradicional chinesa e práticas de cura japonesas |
| **Era Meiji (1868-1912)** | Sistematização de terapias corporais tradicionais |
| **Século XX** | Desenvolvimento de diferentes escolas e abordagens |
| **Atualidade** | Expansão global, surgimento do New Seitai e J-SEITAI |

## O que é New Seitai / J-SEITAI

O J-SEITAI é um sistema de tratamento desenvolvido no Japão que incorpora evidências médicas, tratamento eficaz e reprodutibilidade de habilidades.

> É descrito como um sistema que combina o melhor de várias abordagens, baseado em anatomia, fisiologia e evidências científicas.

### Características do J-SEITAI

- Baseado em evidências científicas (anatomia, fisiologia)
- Foco na correção de desequilíbrios musculoesqueléticos
- Técnicas reprodutíveis e sistematizadas
- Combina conhecimento tradicional com abordagem moderna`,
        quiz: [
          {
            pergunta: "O que diferencia o J-SEITAI do Seitai tradicional?",
            opcoes: ["Usa apenas técnicas orientais", "Incorpora evidências científicas", "Não trabalha com energia", "É mais agressivo"],
            respostaCorreta: 1,
            explicacao: "O J-SEITAI incorpora evidências médicas e científicas, mantendo a base tradicional mas com reprodutibilidade e sistematização moderna."
          }
        ],
        checklist: [
          "Conheço a evolução histórica do Seitai",
          "Entendo o que é J-SEITAI",
          "Sei as características do New Seitai",
          "Compreendo a base científica moderna"
        ]
      },
      {
        titulo: "O Conceito de Ki e Aplicações do Seitai",
        descricao: "Energia vital, pontos tsubo, benefícios e aplicações práticas",
        duracaoMinutos: 35,
        conteudo: `# O Conceito de Ki e Aplicações do Seitai

## Ki — Energia Vital

No Seitai, acredita-se que o corpo possui uma capacidade inata de cura. Os praticantes (seitai-shi) trabalham para ativar e apoiar essa habilidade natural, direcionando a atenção para pontos específicos do corpo.

> Esses pontos, chamados de tsubo, são considerados conectados a órgãos e sistemas internos por meio de meridianos ou canais de energia.

Ao estimular esses pontos através de pressão, alongamento suave e toque leve, os seitai-shi visam:
- Melhorar a circulação sanguínea
- Estabilizar o sistema nervoso autônomo
- Promover o fluxo de Ki por todo o corpo

## Aplicações e Benefícios

| Benefício | Descrição |
|---|---|
| **Melhora postural** | Realinhamento da estrutura corporal |
| **Alívio de dores** | Especialmente costas, pescoço e ombros |
| **Redução do estresse** | Equilíbrio do sistema nervoso autônomo |
| **Melhora da circulação** | Estímulo ao fluxo sanguíneo e linfático |
| **Aumento da flexibilidade** | Alongamentos suaves e liberação de tensões |
| **Bem-estar geral** | Sensação de equilíbrio e harmonia |`,
        quiz: [
          {
            pergunta: "O que são tsubos no contexto do Seitai?",
            opcoes: ["Tipos de massagem", "Pontos conectados a órgãos e sistemas internos", "Instrumentos terapêuticos", "Posições de tratamento"],
            respostaCorreta: 1,
            explicacao: "Tsubos são pontos específicos do corpo considerados conectados a órgãos e sistemas internos por meio de meridianos ou canais de energia."
          }
        ],
        checklist: [
          "Entendo o conceito de Ki (energia vital)",
          "Sei o que são tsubos e sua importância",
          "Conheço os principais benefícios do Seitai",
          "Compreendo como o Seitai atua no corpo"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 2 — ANATOMIA E FISIOLOGIA APLICADAS (12h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Anatomia e Fisiologia Aplicadas ao Seitai",
    descricao: "Coluna vertebral, músculos de interesse e sistema nervoso autônomo",
    icone: "BookOpen",
    cor: "from-blue-50 to-indigo-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Anatomia da Coluna Vertebral",
        descricao: "Regiões da coluna, curvaturas e funções de cada segmento",
        duracaoMinutos: 45,
        conteudo: `# Anatomia da Coluna Vertebral

## Estrutura da Coluna

| Região | Nº Vértebras | Curvatura | Funções Principais |
|---|---|---|---|
| **Cervical** | 7 | Lordose | Sustentação da cabeça, mobilidade |
| **Torácica** | 12 | Cifose | Proteção dos órgãos torácicos, apoio das costelas |
| **Lombar** | 5 | Lordose | Sustentação de peso, flexibilidade |
| **Sacro** | 5 (fundidas) | Cifose | Conexão com a pelve |
| **Cóccix** | 4 (fundidas) | - | Resquício de cauda, pontos de fixação ligamentar |

> A coluna vertebral é o eixo central do corpo e o principal foco de trabalho no Seitai.

## Importância no Seitai

- A coluna é a via principal do sistema nervoso central
- Desequilíbrios vertebrais afetam todo o corpo
- O realinhamento vertebral é fundamental para a saúde global
- Cada região requer técnicas específicas de abordagem`,
        quiz: [
          {
            pergunta: "Quantas vértebras tem a coluna cervical?",
            opcoes: ["5 vértebras", "7 vértebras", "12 vértebras", "4 vértebras"],
            respostaCorreta: 1,
            explicacao: "A coluna cervical possui 7 vértebras (C1 a C7), responsáveis pela sustentação da cabeça e mobilidade do pescoço."
          }
        ],
        checklist: [
          "Conheço as 5 regiões da coluna vertebral",
          "Sei as curvaturas de cada região",
          "Entendo as funções de cada segmento",
          "Compreendo a importância da coluna no Seitai"
        ]
      },
      {
        titulo: "Principais Músculos de Interesse",
        descricao: "Músculos-chave por região e sua relevância terapêutica",
        duracaoMinutos: 40,
        conteudo: `# Principais Músculos de Interesse no Seitai

## Músculos por Região

| Região | Músculos | Função | Relevância no Seitai |
|---|---|---|---|
| **Pescoço** | Trapézio (superior), Esplênio, ECM | Movimento da cabeça, postura | Tensão cervical, dores de cabeça |
| **Ombros** | Trapézio, Levantador da escápula | Elevação e estabilização | Ombros tensos, má postura |
| **Costas** | Eretores da espinha, Latíssimo do dorso | Extensão e rotação da coluna | Dores lombares, desequilíbrios |
| **Quadril** | Glúteos, Piriforme | Estabilização pélvica | Desalinhamento pélvico, dores ciáticas |
| **Pernas** | Isquiotibiais, Quadríceps | Movimento e estabilidade | Compensações posturais |

> O conhecimento muscular é essencial para localizar e tratar as fontes de tensão e desequilíbrio.`,
        quiz: [
          {
            pergunta: "Qual músculo está frequentemente associado a dores ciáticas?",
            opcoes: ["Trapézio", "Quadríceps", "Piriforme", "Esplênio"],
            respostaCorreta: 2,
            explicacao: "O piriforme, localizado na região glútea profunda, quando tensionado pode comprimir o nervo ciático, causando dor ciática."
          }
        ],
        checklist: [
          "Conheço os músculos-chave de cada região",
          "Entendo a função de cada grupo muscular",
          "Sei a relevância terapêutica no Seitai",
          "Consigo identificar áreas de tensão muscular"
        ]
      },
      {
        titulo: "Sistema Nervoso Autônomo e o Seitai",
        descricao: "Divisões simpática e parassimpática e como o Seitai atua",
        duracaoMinutos: 35,
        conteudo: `# O Sistema Nervoso Autônomo e o Seitai

O Seitai atua diretamente na regulação do sistema nervoso autônomo, que controla funções involuntárias do corpo.

## Divisões do SNA

| Divisão | Função | Ação do Seitai |
|---|---|---|
| **Simpático** | Resposta de "luta ou fuga" | Reduz a hiperatividade |
| **Parassimpático** | Resposta de "repouso e digestão" | Estimula o relaxamento |

> O equilíbrio entre simpático e parassimpático é fundamental para a saúde e o bem-estar.

## Como o Seitai Influencia o SNA

- Técnicas suaves ativam o parassimpático
- Pressão em pontos tsubo específicos equilibra o SNA
- Respiração consciente potencializa os efeitos
- Resultados incluem: redução do estresse, melhora do sono, digestão e imunidade`,
        quiz: [
          {
            pergunta: "Qual divisão do SNA o Seitai estimula para promover relaxamento?",
            opcoes: ["Simpático", "Parassimpático", "Somático", "Periférico"],
            respostaCorreta: 1,
            explicacao: "O Seitai estimula o sistema parassimpático, responsável pelo 'repouso e digestão', promovendo relaxamento profundo."
          }
        ],
        checklist: [
          "Entendo as divisões do sistema nervoso autônomo",
          "Sei como o Seitai atua no SNA",
          "Compreendo a importância do equilíbrio simpático-parassimpático",
          "Conheço os benefícios da ativação parassimpática"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 3 — PONTOS TSUBO E MERIDIANOS (10h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Pontos Tsubo e Meridianos",
    descricao: "Tsubos principais, localização, indicações e os 12 meridianos",
    icone: "Target",
    cor: "from-amber-50 to-yellow-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Principais Pontos Tsubo no Seitai",
        descricao: "Localização e indicações dos pontos mais utilizados",
        duracaoMinutos: 50,
        conteudo: `# Principais Pontos Tsubo no Seitai

## O que são Tsubos

Tsubo (ツボ) são pontos específicos do corpo considerados conectados a órgãos e sistemas internos por meio de meridianos ou canais de energia.

> A estimulação desses pontos através de pressão, toque suave ou alongamento visa melhorar a circulação sanguínea e promover o fluxo de Ki.

## Pontos Tsubo Essenciais

| Ponto | Localização | Indicações Principais |
|---|---|---|
| **GB 20 (Feng Chi)** | Base do crânio, nas cavidades | Cefaleia, tensão cervical, estresse |
| **GB 21 (Jian Jing)** | Topo dos ombros | Tensão nos ombros, estresse |
| **LI 4 (He Gu)** | Entre polegar e indicador | Dor de cabeça, estresse, dores em geral |
| **ST 36 (Zu San Li)** | Abaixo da patela, lateral da tíbia | Energia vital, digestão, imunidade |
| **LV 3 (Tai Chong)** | Entre 1º e 2º metatarso | Estresse, irritabilidade |
| **KI 3 (Tai Xi)** | Atrás do maléolo medial | Lombalgia, fadiga |
| **BL 23 (Shen Shu)** | Lombar, 2 dedos lateral à coluna | Lombalgia, vitalidade dos rins |`,
        quiz: [
          {
            pergunta: "Qual ponto tsubo está localizado entre o polegar e o indicador?",
            opcoes: ["GB 20", "LI 4 (He Gu)", "ST 36", "BL 23"],
            respostaCorreta: 1,
            explicacao: "O ponto LI 4 (He Gu) está localizado entre o polegar e o indicador, sendo indicado para dor de cabeça, estresse e dores em geral."
          },
          {
            pergunta: "Qual ponto tsubo é indicado para energia vital, digestão e imunidade?",
            opcoes: ["GB 21", "LV 3", "ST 36 (Zu San Li)", "KI 3"],
            respostaCorreta: 2,
            explicacao: "O ST 36 (Zu San Li), localizado abaixo da patela, é um dos pontos mais importantes para energia vital, digestão e fortalecimento da imunidade."
          }
        ],
        checklist: [
          "Sei o que são tsubos e como funcionam",
          "Conheço a localização dos 7 pontos principais",
          "Entendo as indicações de cada ponto",
          "Consigo identificar os pontos no corpo"
        ]
      },
      {
        titulo: "Os 12 Meridianos Principais",
        descricao: "Elementos, órgãos associados e funções energéticas",
        duracaoMinutos: 45,
        conteudo: `# Os 12 Meridianos Principais

## Sistema de Meridianos

Os meridianos são canais de energia que percorrem todo o corpo, conectando os órgãos internos à superfície.

| Meridiano | Elemento | Órgão Associado | Função Energética |
|---|---|---|---|
| **Pulmão** | Metal | Pulmões | Energia vital, respiração |
| **Intestino Grosso** | Metal | Intestino grosso | Eliminação, purificação |
| **Estômago** | Terra | Estômago | Digestão, nutrição |
| **Baço** | Terra | Baço, pâncreas | Transformação, energia |
| **Coração** | Fogo | Coração | Circulação, emoções |
| **Intestino Delgado** | Fogo | Intestino delgado | Absorção |
| **Bexiga** | Água | Bexiga | Eliminação de líquidos |
| **Rim** | Água | Rins | Energia vital, medo |
| **Pericárdio** | Fogo | Circulação | Proteção do coração |
| **Triplo Aquecedor** | Fogo | Regulação térmica | Equilíbrio de fluidos |
| **Vesícula Biliar** | Madeira | Vesícula biliar | Decisão, planejamento |
| **Fígado** | Madeira | Fígado | Fluxo de energia, emoções |

> Cada meridiano está associado a um elemento da natureza e a um órgão interno, formando um sistema integrado de equilíbrio.`,
        quiz: [
          {
            pergunta: "Quantos meridianos principais existem na medicina tradicional?",
            opcoes: ["8 meridianos", "10 meridianos", "12 meridianos", "14 meridianos"],
            respostaCorreta: 2,
            explicacao: "Existem 12 meridianos principais, cada um associado a um órgão interno e a um dos cinco elementos (Metal, Terra, Fogo, Água, Madeira)."
          }
        ],
        checklist: [
          "Conheço os 12 meridianos principais",
          "Sei os elementos associados a cada meridiano",
          "Entendo as funções energéticas",
          "Compreendo a relação entre meridianos e órgãos"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 4 — TÉCNICAS FUNDAMENTAIS (15h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Técnicas Fundamentais do Seitai",
    descricao: "Princípios, tipos de toque, manipulação e liberação miofascial",
    icone: "Heart",
    cor: "from-green-50 to-emerald-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Princípios das Técnicas",
        descricao: "Suavidade, intenção, respiração, observação e adaptação",
        duracaoMinutos: 40,
        conteudo: `# Princípios das Técnicas do Seitai

## Os 5 Princípios

| Princípio | Descrição |
|---|---|
| **Suavidade** | Técnicas gentis, não invasivas, sem dor |
| **Intenção** | Foco e presença durante o toque |
| **Respiração** | Sincronização com a respiração do cliente |
| **Observação** | Avaliação visual e palpável das tensões |
| **Adaptação** | Ajuste das técnicas às necessidades individuais |

> No Seitai, a qualidade do toque é mais importante que a força aplicada.

## Aplicação dos Princípios

- Sempre iniciar com toque suave e aumentar gradualmente
- Manter atenção plena durante todo o atendimento
- Observar as reações do cliente continuamente
- Adaptar a intensidade e velocidade conforme necessário
- Sincronizar a própria respiração com a do cliente`,
        quiz: [
          {
            pergunta: "Qual princípio do Seitai enfatiza a sincronização com o cliente?",
            opcoes: ["Suavidade", "Intenção", "Respiração", "Adaptação"],
            respostaCorreta: 2,
            explicacao: "O princípio da Respiração enfatiza a sincronização com a respiração do cliente, criando uma conexão terapêutica mais profunda."
          }
        ],
        checklist: [
          "Conheço os 5 princípios das técnicas",
          "Entendo a importância da suavidade",
          "Sei como aplicar intenção e presença",
          "Compreendo a adaptação ao cliente"
        ]
      },
      {
        titulo: "Tipos de Toque e Manipulação",
        descricao: "Pressão com polegares, palmas, alongamentos e mobilizações",
        duracaoMinutos: 50,
        conteudo: `# Tipos de Toque e Manipulação

## Pressão com os Polegares

| Característica | Descrição |
|---|---|
| **Execução** | Pressão sustentada ou circular com a ponta do polegar |
| **Objetivo** | Estimular pontos tsubo, liberar tensões localizadas |
| **Intensidade** | Gradual, respeitando o limiar do cliente |

## Pressão com as Palmas

| Característica | Descrição |
|---|---|
| **Execução** | Pressão suave com a palma da mão |
| **Objetivo** | Trabalhar áreas maiores, transmitir calor e energia |
| **Aplicação** | Costas, abdômen, áreas amplas |

## Alongamentos Suaves

| Característica | Descrição |
|---|---|
| **Execução** | Movimentos lentos e controlados |
| **Objetivo** | Liberar tensões musculares, melhorar flexibilidade |
| **Aplicação** | Pescoço, membros, coluna |

## Mobilizações Articulares

| Característica | Descrição |
|---|---|
| **Execução** | Movimentos suaves dentro da amplitude natural |
| **Objetivo** | Melhorar mobilidade, reduzir rigidez |
| **Aplicação** | Ombro, quadril, coluna |`,
        quiz: [
          {
            pergunta: "Qual tipo de toque é mais indicado para estimular pontos tsubo?",
            opcoes: ["Pressão com palmas", "Pressão com polegares", "Alongamentos suaves", "Mobilizações articulares"],
            respostaCorreta: 1,
            explicacao: "A pressão com os polegares permite estimular pontos tsubo com precisão, usando pressão sustentada ou circular na ponta do polegar."
          }
        ],
        checklist: [
          "Sei executar pressão com polegares",
          "Domino pressão com palmas para áreas amplas",
          "Entendo como realizar alongamentos suaves",
          "Conheço as mobilizações articulares"
        ]
      },
      {
        titulo: "Técnicas de Liberação Miofascial",
        descricao: "Trabalho sobre a fáscia, pressão sustentada e deslizamento",
        duracaoMinutos: 40,
        conteudo: `# Técnicas de Liberação Miofascial

## Fundamentos

| Característica | Descrição |
|---|---|
| **Execução** | Pressão sustentada e deslizamento sobre a fáscia |
| **Objetivo** | Liberar aderências, melhorar deslizamento dos tecidos |
| **Aplicação** | Áreas de tensão crônica |

> A liberação miofascial é uma das técnicas mais eficazes para tratar tensões crônicas e aderências teciduais.

## Princípios da Liberação Miofascial

- Manter pressão constante por pelo menos 90 segundos
- Aguardar o tecido "ceder" antes de aprofundar
- Nunca forçar — respeitar o ritmo do tecido
- Combinar com respiração profunda do cliente
- Trabalhar de forma lenta e intencional`,
        quiz: [
          {
            pergunta: "Quanto tempo mínimo deve-se manter a pressão na liberação miofascial?",
            opcoes: ["10 segundos", "30 segundos", "90 segundos", "5 minutos"],
            respostaCorreta: 2,
            explicacao: "A pressão na liberação miofascial deve ser mantida por pelo menos 90 segundos para permitir que o tecido fascial 'ceda' e libere as aderências."
          }
        ],
        checklist: [
          "Entendo o que é liberação miofascial",
          "Sei o tempo mínimo de pressão sustentada",
          "Conheço os princípios de execução",
          "Compreendo quando aplicar a técnica"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 5 — AVALIAÇÃO POSTURAL (8h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Avaliação Postural no Seitai",
    descricao: "Avaliação visual, desvios posturais e testes de amplitude",
    icone: "BarChart3",
    cor: "from-violet-50 to-purple-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Avaliação Visual",
        descricao: "O que observar nas vistas anterior, posterior e lateral",
        duracaoMinutos: 35,
        conteudo: `# Avaliação Visual

## Vistas de Avaliação

| Vista | O que Observar |
|---|---|
| **Anterior** | Altura dos ombros, alinhamento das clavículas, posição da cabeça, rotação do tronco |
| **Posterior** | Altura das escápulas, curvaturas da coluna, nível da pelve, pregas glúteas |
| **Lateral** | Curvaturas da coluna (cervical, torácica, lombar), posição da cabeça, projeção dos ombros |

> A avaliação visual é o primeiro passo para identificar desequilíbrios e planejar o tratamento.

## Dicas para Avaliação

- Solicitar ao cliente que fique em posição natural (não corrigida)
- Observar simetria e assimetria
- Usar referências anatômicas (acrômio, EIAS, maléolos)
- Fotografar para comparação evolutiva
- Registrar todos os achados na ficha`,
        quiz: [
          {
            pergunta: "Na vista posterior, o que devemos observar?",
            opcoes: ["Posição da cabeça e projeção dos ombros", "Altura das escápulas e curvaturas da coluna", "Alinhamento das clavículas", "Rotação do tronco apenas"],
            respostaCorreta: 1,
            explicacao: "Na vista posterior observamos a altura das escápulas, curvaturas da coluna, nível da pelve e pregas glúteas para identificar assimetrias."
          }
        ],
        checklist: [
          "Sei avaliar na vista anterior",
          "Sei avaliar na vista posterior",
          "Sei avaliar na vista lateral",
          "Entendo a importância do registro"
        ]
      },
      {
        titulo: "Principais Desvios Posturais",
        descricao: "Identificação de desvios, características e possíveis causas",
        duracaoMinutos: 40,
        conteudo: `# Principais Desvios Posturais

| Desvio | Características | Possíveis Causas |
|---|---|---|
| **Cabeça anterior** | Cabeça projetada à frente | Má postura, uso de telas, tensão cervical |
| **Ombros caídos** | Ombros anteriorizados e caídos | Fraqueza dorsal, tensão peitoral |
| **Hipercifose torácica** | Aumento da curvatura torácica | Má postura, osteoporose |
| **Hiperlordose lombar** | Aumento da curvatura lombar | Fraqueza abdominal, gestação |
| **Escoliose** | Curvatura lateral da coluna | Genética, má postura |
| **Pelve anteriorizada** | Inclinação anterior da pelve | Encurtamento de flexores do quadril |
| **Pelve posteriorizada** | Inclinação posterior da pelve | Encurtamento de isquiotibiais |

> Cada desvio postural requer uma abordagem específica no tratamento com Seitai.`,
        quiz: [
          {
            pergunta: "Qual desvio está associado ao encurtamento de flexores do quadril?",
            opcoes: ["Hipercifose", "Escoliose", "Pelve anteriorizada", "Ombros caídos"],
            respostaCorreta: 2,
            explicacao: "A pelve anteriorizada (inclinação anterior) está frequentemente associada ao encurtamento dos flexores do quadril, como o iliopsoas."
          }
        ],
        checklist: [
          "Identifico os principais desvios posturais",
          "Conheço as causas mais comuns",
          "Sei diferenciar anteriorização e posteriorização pélvica",
          "Entendo a relação entre desvios e sintomas"
        ]
      },
      {
        titulo: "Testes de Amplitude de Movimento",
        descricao: "Avaliação da mobilidade por região corporal",
        duracaoMinutos: 35,
        conteudo: `# Testes de Amplitude de Movimento

| Região | Movimentos Avaliados |
|---|---|
| **Cervical** | Flexão, extensão, rotação, inclinação lateral |
| **Ombros** | Flexão, extensão, abdução, rotação interna e externa |
| **Coluna torácica** | Rotação, extensão |
| **Coluna lombar** | Flexão, extensão, inclinação lateral |
| **Quadril** | Flexão, extensão, abdução, rotação |

> Os testes de amplitude ajudam a identificar restrições de movimento que direcionam o tratamento.

## Como Realizar os Testes

- Sempre avaliar bilateralmente para comparação
- Registrar o grau de amplitude alcançado
- Observar compensações durante o movimento
- Perguntar sobre dor ou desconforto durante cada teste
- Reavaliar ao final do tratamento para mensurar melhora`,
        quiz: [
          {
            pergunta: "Quais movimentos devem ser avaliados na cervical?",
            opcoes: ["Apenas flexão e extensão", "Flexão, extensão, rotação e inclinação lateral", "Apenas rotação", "Abdução e adução"],
            respostaCorreta: 1,
            explicacao: "Na cervical devem ser avaliados todos os movimentos: flexão, extensão, rotação e inclinação lateral, sempre comparando bilateralmente."
          }
        ],
        checklist: [
          "Sei avaliar amplitude cervical",
          "Sei avaliar amplitude de ombros",
          "Sei avaliar amplitude lombar e quadril",
          "Entendo a importância da avaliação bilateral"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 6 — TÉCNICAS PASSO A PASSO (20h · 4 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Técnicas Passo a Passo por Região",
    descricao: "Técnicas detalhadas para cervical, lombar, membros inferiores e superiores",
    icone: "Target",
    cor: "from-teal-50 to-cyan-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Técnicas para Região Cervical",
        descricao: "Liberação da base do crânio (GB 20) e trapézio superior (GB 21)",
        duracaoMinutos: 50,
        conteudo: `# Técnicas para Região Cervical

## Liberação da Base do Crânio (GB 20)

| Etapa | Descrição |
|---|---|
| **Posição do cliente** | Decúbito dorsal |
| **Posição do terapeuta** | Atrás da cabeça do cliente |
| **Técnica** | Apoiar as pontas dos dedos na base do crânio, nas cavidades. Aplicar pressão suave e sustentada. Realizar pequenos círculos. |
| **Duração** | 30-60 segundos |
| **Benefícios** | Alívio de tensão cervical, cefaleia, estresse |

## Liberação de Trapézio Superior (GB 21)

| Etapa | Descrição |
|---|---|
| **Posição do cliente** | Decúbito dorsal ou sentado |
| **Posição do terapeuta** | Ao lado do cliente |
| **Técnica** | Com os polegares, aplicar pressão no ponto GB 21 (topo dos ombros). Manter pressão suave e sustentada. |
| **Duração** | 30-60 segundos |
| **Benefícios** | Alívio de tensão nos ombros, relaxamento |`,
        quiz: [
          {
            pergunta: "Em qual posição o cliente deve estar para liberação da base do crânio?",
            opcoes: ["Decúbito ventral", "Decúbito dorsal", "Sentado", "Em pé"],
            respostaCorreta: 1,
            explicacao: "Para a liberação da base do crânio (GB 20), o cliente deve estar em decúbito dorsal, permitindo que o terapeuta acesse a região por trás da cabeça."
          }
        ],
        checklist: [
          "Sei executar liberação de GB 20",
          "Sei executar liberação de GB 21",
          "Conheço as posições corretas",
          "Entendo a duração e intensidade adequadas"
        ]
      },
      {
        titulo: "Técnicas para Região Lombar",
        descricao: "Pressão em BL 23, mobilização pélvica e equilíbrio estrutural",
        duracaoMinutos: 50,
        conteudo: `# Técnicas para Região Lombar

## Pressão em BL 23 (Shen Shu)

| Etapa | Descrição |
|---|---|
| **Posição do cliente** | Decúbito ventral |
| **Posição do terapeuta** | Ao lado do cliente |
| **Técnica** | Localizar BL 23 (lombar, 2 dedos lateral à coluna, entre L2 e L3). Aplicar pressão suave com os polegares. |
| **Duração** | 30-60 segundos |
| **Benefícios** | Alívio de lombalgia, fortalecimento energético |

## Mobilização Pélvica

| Etapa | Descrição |
|---|---|
| **Posição do cliente** | Decúbito lateral |
| **Posição do terapeuta** | Atrás do cliente |
| **Técnica** | Uma mão na crista ilíaca, outra no ombro. Movimentos suaves de rotação da pelve em relação ao tronco. |
| **Duração** | 5-10 repetições de cada lado |
| **Benefícios** | Equilíbrio pélvico, mobilidade lombar |`,
        quiz: [
          {
            pergunta: "Onde se localiza o ponto BL 23?",
            opcoes: ["Na base do crânio", "Topo dos ombros", "Lombar, 2 dedos lateral à coluna", "Entre polegar e indicador"],
            respostaCorreta: 2,
            explicacao: "O ponto BL 23 (Shen Shu) está localizado na região lombar, 2 dedos laterais à coluna, na altura entre L2 e L3."
          }
        ],
        checklist: [
          "Sei localizar e pressionar BL 23",
          "Domino a mobilização pélvica",
          "Conheço as posições de cada técnica",
          "Entendo os benefícios de cada técnica lombar"
        ]
      },
      {
        titulo: "Técnicas para Membros Inferiores",
        descricao: "Liberação de piriforme e alongamento de isquiotibiais",
        duracaoMinutos: 45,
        conteudo: `# Técnicas para Membros Inferiores

## Liberação de Piriforme

| Etapa | Descrição |
|---|---|
| **Posição do cliente** | Decúbito ventral |
| **Posição do terapeuta** | Ao lado do cliente |
| **Técnica** | Localizar o músculo piriforme (região glútea profunda). Aplicar pressão suave e sustentada com cotovelo ou polegar. |
| **Duração** | 30-60 segundos |
| **Benefícios** | Alívio de dor ciática, tensão glútea |

## Alongamento de Isquiotibiais

| Etapa | Descrição |
|---|---|
| **Posição do cliente** | Decúbito dorsal |
| **Posição do terapeuta** | Em pé, na extremidade da maca |
| **Técnica** | Elevar a perna estendida até sentir resistência suave. Manter por 20-30 segundos. |
| **Duração** | 20-30 segundos cada perna |
| **Benefícios** | Flexibilidade posterior da coxa, alívio de lombalgia |`,
        quiz: [
          {
            pergunta: "Quanto tempo deve durar o alongamento de isquiotibiais?",
            opcoes: ["5-10 segundos", "20-30 segundos", "2-3 minutos", "5 minutos"],
            respostaCorreta: 1,
            explicacao: "O alongamento de isquiotibiais no Seitai deve ser mantido por 20-30 segundos em cada perna, respeitando a resistência suave do tecido."
          }
        ],
        checklist: [
          "Sei executar liberação de piriforme",
          "Domino alongamento de isquiotibiais",
          "Conheço as posições corretas do cliente",
          "Entendo os benefícios para lombalgia e ciática"
        ]
      },
      {
        titulo: "Técnicas para Membros Superiores",
        descricao: "Liberação de LI 4 (He Gu) e mobilização de ombro",
        duracaoMinutos: 45,
        conteudo: `# Técnicas para Membros Superiores

## Liberação de LI 4 (He Gu)

| Etapa | Descrição |
|---|---|
| **Posição do cliente** | Decúbito dorsal ou sentado |
| **Posição do terapeuta** | Ao lado do cliente |
| **Técnica** | Localizar LI 4 entre polegar e indicador. Aplicar pressão firme e sustentada. |
| **Duração** | 30-60 segundos |
| **Benefícios** | Alívio de dor de cabeça, estresse, dores em geral |

## Mobilização de Ombro

| Etapa | Descrição |
|---|---|
| **Posição do cliente** | Decúbito lateral |
| **Posição do terapeuta** | Atrás do cliente |
| **Técnica** | Uma mão estabiliza a escápula, outra mobiliza o úmero em diferentes direções (flexão, extensão, rotação). |
| **Duração** | 5-10 repetições por movimento |
| **Benefícios** | Mobilidade do ombro, liberação de tensões |

> ⚠️ Atenção: LI 4 é contraindicado em gestantes, pois pode estimular contrações uterinas.`,
        quiz: [
          {
            pergunta: "Qual a contraindicação do ponto LI 4?",
            opcoes: ["Hipertensão", "Gestação", "Diabetes", "Artrite"],
            respostaCorreta: 1,
            explicacao: "O ponto LI 4 é contraindicado em gestantes, pois pode estimular contrações uterinas."
          }
        ],
        checklist: [
          "Sei executar liberação de LI 4",
          "Domino mobilização de ombro",
          "Conheço a contraindicação em gestantes",
          "Entendo as posições e durações corretas"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 7 — NEW SEITAI: ABORDAGEM MODERNA (12h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "New Seitai — Abordagem Moderna",
    descricao: "J-SEITAI, técnicas específicas e PM Balance Seitai",
    icone: "GraduationCap",
    cor: "from-sky-50 to-blue-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Fundamentos do J-SEITAI",
        descricao: "Evidências científicas, princípios e abordagem moderna",
        duracaoMinutos: 45,
        conteudo: `# Fundamentos do New Seitai / J-SEITAI

O J-SEITAI é um sistema de tratamento que incorpora evidências médicas, tratamento eficaz e reprodutibilidade de habilidades. É baseado em anatomia, fisiologia e evidências científicas.

## Princípios do J-SEITAI

**1.** Baseado em evidências científicas
**2.** Foco na correção de desequilíbrios musculoesqueléticos
**3.** Técnicas reprodutíveis e sistematizadas
**4.** Combinação de conhecimento tradicional com abordagem moderna

> O J-SEITAI combina o melhor de várias abordagens, criando um método que corrige distorções do sistema musculoesquelético.`,
        quiz: [
          {
            pergunta: "Qual é a base do J-SEITAI?",
            opcoes: ["Apenas tradição oriental", "Evidências científicas e anatomia", "Apenas energia Ki", "Medicina chinesa exclusivamente"],
            respostaCorreta: 1,
            explicacao: "O J-SEITAI é baseado em anatomia, fisiologia e evidências científicas, combinando tradição com abordagem moderna."
          }
        ],
        checklist: [
          "Entendo os fundamentos do J-SEITAI",
          "Conheço os princípios da abordagem moderna",
          "Sei diferenciar J-SEITAI do Seitai tradicional",
          "Compreendo a base científica"
        ]
      },
      {
        titulo: "Técnicas Específicas do New Seitai",
        descricao: "Correção postural dinâmica, liberação miofascial avançada e mais",
        duracaoMinutos: 50,
        conteudo: `# Técnicas Específicas do New Seitai

| Técnica | Descrição | Aplicação |
|---|---|---|
| **Correção postural dinâmica** | Trabalha a postura em movimento | Desequilíbrios posturais crônicos |
| **Liberação miofascial avançada** | Trabalho profundo sobre a fáscia | Tensões crônicas, aderências |
| **Mobilização articular específica** | Técnicas precisas para cada articulação | Restrição de movimento |
| **Equilíbrio musculoesquelético** | Abordagem integrada para todo o corpo | Desalinhamentos sistêmicos |

> O New Seitai integra diferentes técnicas de forma sistematizada para resultados mais consistentes.`,
        quiz: [
          {
            pergunta: "Qual técnica do New Seitai é indicada para tensões crônicas?",
            opcoes: ["Correção postural dinâmica", "Liberação miofascial avançada", "Mobilização articular", "Equilíbrio musculoesquelético"],
            respostaCorreta: 1,
            explicacao: "A liberação miofascial avançada é a técnica específica para tratar tensões crônicas e aderências, trabalhando profundamente sobre a fáscia."
          }
        ],
        checklist: [
          "Conheço as técnicas do New Seitai",
          "Sei quando aplicar cada técnica",
          "Entendo a correção postural dinâmica",
          "Domino a abordagem integrada"
        ]
      },
      {
        titulo: "PM Balance Seitai",
        descricao: "Terapia focada na postura e equilíbrio estrutural",
        duracaoMinutos: 40,
        conteudo: `# PM Balance Seitai

O PM Balance Seitai é uma terapia manual japonesa tradicional focada na melhora da postura e do equilíbrio estrutural do corpo.

## Características

- Foco na postura e alinhamento estrutural
- Abordagem sistemática e reprodutível
- Integração com programas de treinamento
- Ênfase na qualidade consistente do serviço

> O PM Balance Seitai é uma abordagem sistematizada que integra técnicas tradicionais com métodos modernos de avaliação e tratamento.

## Aplicações

- Correção de desvios posturais complexos
- Equilíbrio estrutural global
- Manutenção preventiva da postura
- Programa de acompanhamento contínuo`,
        quiz: [
          {
            pergunta: "Qual é o foco principal do PM Balance Seitai?",
            opcoes: ["Energia Ki", "Postura e equilíbrio estrutural", "Relaxamento profundo", "Pontos tsubo"],
            respostaCorreta: 1,
            explicacao: "O PM Balance Seitai é focado na melhora da postura e do equilíbrio estrutural do corpo, com abordagem sistemática e reprodutível."
          }
        ],
        checklist: [
          "Entendo o conceito de PM Balance Seitai",
          "Conheço suas características principais",
          "Sei as aplicações práticas",
          "Compreendo a integração com treinamento"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 8 — PROTOCOLOS DE TRATAMENTO (10h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Protocolos de Tratamento",
    descricao: "Protocolos para lombalgia, tensão cervical e estresse/ansiedade",
    icone: "Package",
    cor: "from-orange-50 to-amber-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Protocolo para Lombalgia",
        descricao: "Avaliação, preparação, liberação lombar, trabalho pélvico e alongamentos",
        duracaoMinutos: 45,
        conteudo: `# Protocolo para Lombalgia

| Fase | Técnicas | Duração | Objetivo |
|---|---|---|---|
| **Avaliação** | Anamnese, teste de movimento, palpação | 10 min | Identificar causas e áreas de tensão |
| **Preparação** | Respiração, toque suave | 5 min | Relaxamento inicial |
| **Liberação lombar** | Pressão em BL 23, liberação de paravertebrais | 10 min | Alívio da tensão local |
| **Trabalho pélvico** | Mobilização pélvica, liberação de piriforme | 10 min | Equilíbrio pélvico |
| **Alongamentos** | Isquiotibiais, flexores do quadril | 5 min | Flexibilidade |
| **Finalização** | Toque suave, respiração | 5 min | Integração |

> Total: 45 minutos de atendimento estruturado para lombalgia.`,
        quiz: [
          {
            pergunta: "Qual é a primeira fase do protocolo para lombalgia?",
            opcoes: ["Liberação lombar", "Preparação", "Avaliação", "Alongamentos"],
            respostaCorreta: 2,
            explicacao: "A primeira fase é sempre a avaliação, incluindo anamnese, teste de movimento e palpação, para identificar as causas e áreas de tensão."
          }
        ],
        checklist: [
          "Conheço as 6 fases do protocolo",
          "Sei executar cada técnica na ordem correta",
          "Entendo a duração de cada fase",
          "Compreendo os objetivos de cada etapa"
        ]
      },
      {
        titulo: "Protocolo para Tensão Cervical",
        descricao: "Liberação cervical, mobilização e trabalho de ombros",
        duracaoMinutos: 45,
        conteudo: `# Protocolo para Tensão Cervical

| Fase | Técnicas | Duração | Objetivo |
|---|---|---|---|
| **Avaliação** | Anamnese, teste de movimento cervical | 10 min | Identificar restrições |
| **Preparação** | Respiração, toque suave | 5 min | Relaxamento |
| **Liberação cervical** | GB 20, trapézio superior | 10 min | Alívio da tensão |
| **Mobilização cervical** | Movimentos suaves de rotação e inclinação | 10 min | Amplitude de movimento |
| **Trabalho de ombros** | GB 21, liberação de trapézio | 5 min | Relaxamento global |
| **Finalização** | Toque suave, respiração | 5 min | Integração |

> Atenção: nunca realizar movimentos bruscos na região cervical.`,
        quiz: [
          {
            pergunta: "Quais pontos são trabalhados na fase de liberação cervical?",
            opcoes: ["BL 23 e LI 4", "GB 20 e trapézio superior", "ST 36 e LV 3", "KI 3 e BL 23"],
            respostaCorreta: 1,
            explicacao: "Na fase de liberação cervical, são trabalhados o GB 20 (base do crânio) e o trapézio superior para alívio da tensão cervical."
          }
        ],
        checklist: [
          "Domino o protocolo de tensão cervical",
          "Sei os pontos a serem trabalhados",
          "Entendo a importância de movimentos suaves",
          "Conheço os cuidados de segurança cervical"
        ]
      },
      {
        titulo: "Protocolo para Estresse e Ansiedade",
        descricao: "Pontos de equilíbrio energético e ativação parassimpática",
        duracaoMinutos: 45,
        conteudo: `# Protocolo para Estresse e Ansiedade

| Fase | Técnicas | Duração | Objetivo |
|---|---|---|---|
| **Avaliação** | Anamnese, observação | 10 min | Compreender o estado do cliente |
| **Preparação** | Respiração profunda, toque suave | 5 min | Conexão e relaxamento |
| **Pontos de equilíbrio** | LI 4, LV 3, Yintang | 10 min | Equilíbrio energético |
| **Trabalho de costas** | Liberação suave de paravertebrais | 10 min | Relaxamento profundo |
| **Respiração** | Exercícios respiratórios guiados | 5 min | Ativação parassimpática |
| **Finalização** | Toque suave, repouso | 5 min | Integração |

> Este protocolo visa a ativação do sistema parassimpático para promoção do relaxamento profundo.`,
        quiz: [
          {
            pergunta: "Qual ponto extra-meridiano é utilizado no protocolo de estresse?",
            opcoes: ["GB 20", "ST 36", "Yintang", "BL 23"],
            respostaCorreta: 2,
            explicacao: "O Yintang (ponto entre as sobrancelhas) é um ponto extra-meridiano utilizado no protocolo de estresse para promover equilíbrio e calma."
          }
        ],
        checklist: [
          "Domino o protocolo anti-estresse",
          "Sei localizar o ponto Yintang",
          "Entendo a ativação parassimpática",
          "Conheço os exercícios respiratórios indicados"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 9 — INDICAÇÕES E CONTRAINDICAÇÕES (6h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Indicações, Contraindicações e Cuidados",
    descricao: "Quando aplicar, quando evitar e cuidados especiais",
    icone: "Heart",
    cor: "from-red-50 to-rose-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Indicações do Seitai",
        descricao: "Condições beneficiadas pelo tratamento",
        duracaoMinutos: 30,
        conteudo: `# Indicações do Seitai

| Condição | Benefício do Seitai |
|---|---|
| **Dores nas costas** | Alívio da tensão muscular, realinhamento postural |
| **Dores no pescoço e ombros** | Liberação de pontos de tensão |
| **Dores de cabeça tensionais** | Relaxamento muscular, equilíbrio energético |
| **Estresse e ansiedade** | Ativação do sistema parassimpático |
| **Problemas posturais** | Reeducação postural, equilíbrio muscular |
| **Fadiga** | Restauração da energia vital |
| **Distúrbios do sono** | Relaxamento profundo |

> O Seitai é indicado para diversas condições relacionadas ao desequilíbrio musculoesquelético e energético.`,
        quiz: [
          {
            pergunta: "Qual benefício o Seitai oferece para estresse e ansiedade?",
            opcoes: ["Fortalecimento muscular", "Ativação do sistema parassimpático", "Aumento de energia simpática", "Estimulação cardíaca"],
            respostaCorreta: 1,
            explicacao: "Para estresse e ansiedade, o Seitai promove a ativação do sistema parassimpático, responsável pelo repouso e relaxamento."
          }
        ],
        checklist: [
          "Conheço as principais indicações",
          "Sei os benefícios para cada condição",
          "Entendo a atuação no sistema nervoso",
          "Consigo orientar clientes sobre indicações"
        ]
      },
      {
        titulo: "Contraindicações Absolutas",
        descricao: "Situações em que o Seitai NÃO deve ser aplicado",
        duracaoMinutos: 30,
        conteudo: `# Contraindicações Absolutas

| Condição | Motivo |
|---|---|
| **Fraturas agudas** | Risco de agravamento |
| **Infecções ativas** | Risco de espalhar a infecção |
| **Febre** | Corpo em estado de infecção |
| **Trombose venosa profunda** | Risco de deslocar coágulos |
| **Câncer ativo** | Risco de disseminação |
| **Hérnias de disco agudas com sintomas neurológicos** | Risco de agravamento |

❌ NUNCA realizar Seitai quando qualquer contraindicação absoluta estiver presente.

> A segurança do cliente é a prioridade absoluta. Em caso de dúvida, encaminhar para avaliação médica.`,
        quiz: [
          {
            pergunta: "Qual é uma contraindicação ABSOLUTA do Seitai?",
            opcoes: ["Hipertensão controlada", "Trombose venosa profunda", "Gestação no 2º trimestre", "Artrite leve"],
            respostaCorreta: 1,
            explicacao: "A trombose venosa profunda é uma contraindicação absoluta, pois há risco de deslocar coágulos durante a manipulação."
          }
        ],
        checklist: [
          "Conheço todas as contraindicações absolutas",
          "Sei os motivos de cada contraindicação",
          "Entendo a importância da triagem",
          "Sei quando encaminhar para médico"
        ]
      },
      {
        titulo: "Contraindicações Relativas",
        descricao: "Condições que requerem adaptação e cuidado especial",
        duracaoMinutos: 30,
        conteudo: `# Contraindicações Relativas

| Condição | Cuidado Necessário |
|---|---|
| **Gestação** | Técnicas adaptadas, evitar certos pontos (LI 4, BL 60, etc.) |
| **Hipertensão arterial** | Monitorar pressão, evitar estímulos intensos |
| **Osteoporose avançada** | Pressão muito suave, evitar mobilizações forçadas |
| **Artrite reumatoide** | Técnicas suaves, respeitar limitações |
| **Pós-operatório recente** | Aguardar liberação médica |

⚠️ Nestas condições, o Seitai pode ser realizado COM ADAPTAÇÕES e cuidados específicos.

> Sempre comunicar ao cliente as adaptações que serão feitas e o motivo de cada uma.`,
        quiz: [
          {
            pergunta: "Qual ponto deve ser EVITADO em gestantes?",
            opcoes: ["GB 20", "ST 36", "LI 4", "GB 21"],
            respostaCorreta: 2,
            explicacao: "O ponto LI 4 deve ser evitado em gestantes, pois pode estimular contrações uterinas."
          }
        ],
        checklist: [
          "Conheço as contraindicações relativas",
          "Sei adaptar técnicas para gestantes",
          "Entendo cuidados com hipertensão",
          "Sei quando pedir liberação médica"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 10 — ANAMNESE E AVALIAÇÃO (6h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Anamnese e Avaliação do Cliente",
    descricao: "Ficha de anamnese completa e avaliação integrada",
    icone: "MessageCircle",
    cor: "from-lime-50 to-green-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Importância da Anamnese no Seitai",
        descricao: "Compreensão das necessidades individuais e histórico de saúde",
        duracaoMinutos: 35,
        conteudo: `# Importância da Anamnese no Seitai

A anamnese é fundamental para compreender as necessidades individuais do cliente, seu histórico de saúde e as possíveis causas dos desequilíbrios.

## Por que Fazer Anamnese?

- Identificar contraindicações absolutas e relativas
- Compreender o histórico de saúde do cliente
- Mapear queixas e expectativas
- Personalizar o plano de tratamento
- Estabelecer critérios de acompanhamento e evolução

> Uma anamnese bem feita é a base de um tratamento seguro e eficaz.

## Componentes Essenciais

- **Identificação** — Dados pessoais e profissionais
- **Histórico de Saúde** — Doenças, cirurgias, medicamentos
- **Histórico do Tratamento** — Queixa principal, tempo, fatores
- **Hábitos de Vida** — Atividade física, postura, sono, estresse
- **Avaliação Postural** — Observação por vistas
- **Testes de Movimento** — Amplitude por região
- **Palpação** — Tensões, pontos dolorosos
- **Plano de Tratamento** — Objetivos, técnicas, frequência`,
        quiz: [
          {
            pergunta: "Qual é o objetivo principal da anamnese no Seitai?",
            opcoes: ["Vender mais sessões", "Identificar contraindicações e personalizar tratamento", "Cumprir burocracia", "Impressionar o cliente"],
            respostaCorreta: 1,
            explicacao: "A anamnese visa identificar contraindicações, compreender o histórico e personalizar o plano de tratamento para segurança e eficácia."
          }
        ],
        checklist: [
          "Entendo a importância da anamnese",
          "Conheço os componentes essenciais",
          "Sei por que cada seção é necessária",
          "Compreendo a relação anamnese-segurança"
        ]
      },
      {
        titulo: "Modelo de Ficha de Anamnese para Seitai",
        descricao: "Ficha completa com todos os campos necessários para atendimento",
        duracaoMinutos: 40,
        conteudo: `# Modelo de Ficha de Anamnese para Seitai

## IDENTIFICAÇÃO
- Nome completo / Idade / Profissão
- Telefone / E-mail

## HISTÓRICO DE SAÚDE
- Doenças pré-existentes
- Medicamentos em uso
- Histórico de cirurgias
- Lesões musculoesqueléticas
- Problemas de coluna (cervical / torácica / lombar)

## HISTÓRICO DO TRATAMENTO
- Principal queixa
- Tempo do problema
- Fatores de melhora e piora
- Tratamentos anteriores
- Experiência prévia com Seitai

## HÁBITOS DE VIDA
- Atividade física e tipo
- Postura no trabalho
- Horas em frente a telas
- Qualidade do sono
- Estresse percebido (0-10)
- Alimentação

## AVALIAÇÃO POSTURAL E TESTES
- Vistas: anterior, posterior, lateral
- Desvios observados
- Testes de movimento por região
- Palpação: tensões e pontos dolorosos

## PLANO DE TRATAMENTO
- Objetivos / Técnicas / Nº sessões / Frequência
- Orientações para casa`,
        quiz: [
          {
            pergunta: "Qual escala é usada para avaliar estresse percebido na anamnese?",
            opcoes: ["Escala de 1 a 5", "Escala de 0 a 10", "Escala A-F", "Não se avalia"],
            respostaCorreta: 1,
            explicacao: "O estresse percebido é avaliado em uma escala de 0 a 10, permitindo acompanhamento quantitativo da evolução do cliente."
          }
        ],
        checklist: [
          "Conheço todos os campos da ficha",
          "Sei preencher cada seção corretamente",
          "Entendo a importância de cada dado",
          "Consigo elaborar um plano de tratamento"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 11 — ÉTICA E BIOSSEGURANÇA (4h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Ética Profissional e Biossegurança",
    descricao: "Princípios éticos, limites de atuação e normas de segurança",
    icone: "BookOpen",
    cor: "from-slate-50 to-gray-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Princípios Éticos e Limites de Atuação",
        descricao: "Ética profissional, o que pode e o que não pode fazer",
        duracaoMinutos: 35,
        conteudo: `# Princípios Éticos no Seitai

| Princípio | Aplicação |
|---|---|
| **Respeito** | Tratar cada cliente com dignidade e respeito |
| **Confidencialidade** | Manter sigilo das informações do cliente |
| **Competência** | Atuar dentro dos limites do conhecimento |
| **Honestidade** | Ser transparente sobre tratamento e resultados |
| **Beneficência** | Agir no melhor interesse do cliente |

## Limites de Atuação Profissional

| ✅ PODE | ❌ NÃO PODE |
|---|---|
| Oferecer Seitai para bem-estar e equilíbrio | Diagnosticar doenças médicas |
| Sugerir técnicas de autocuidado | Substituir tratamento médico |
| Orientar sobre postura e hábitos saudáveis | Afirmar que cura doenças |
| Trabalhar com outros profissionais | Prometer resultados irreais |`,
        quiz: [
          {
            pergunta: "O terapeuta de Seitai pode diagnosticar doenças?",
            opcoes: ["Sim, após o curso", "Não, nunca", "Sim, com experiência", "Depende do caso"],
            respostaCorreta: 1,
            explicacao: "O terapeuta de Seitai NUNCA pode diagnosticar doenças. Isso é atribuição exclusiva de profissionais médicos."
          }
        ],
        checklist: [
          "Conheço os princípios éticos do Seitai",
          "Sei meus limites de atuação",
          "Entendo a diferença entre terapia e medicina",
          "Compreendo a importância da ética"
        ]
      },
      {
        titulo: "Biossegurança no Atendimento",
        descricao: "Normas de higiene, EPIs e protocolos de segurança",
        duracaoMinutos: 30,
        conteudo: `# Biossegurança no Atendimento

| Item | Procedimento |
|---|---|
| **Higienização das mãos** | Antes e após cada atendimento |
| **EPIs** | Quando necessário, conforme protocolo |
| **Limpeza da maca** | Álcool 70% entre cada cliente |
| **Toalhas e lençóis** | Trocados a cada atendimento |
| **Ambiente** | Limpo, arejado, temperatura agradável |

> A biossegurança não é opcional — é uma obrigação profissional.

## Checklist de Biossegurança

- [ ] Mãos higienizadas
- [ ] Maca limpa e forrada
- [ ] Toalhas limpas disponíveis
- [ ] Ambiente arejado e limpo
- [ ] Materiais descartáveis disponíveis
- [ ] Lixo adequado e descartado corretamente`,
        quiz: [
          {
            pergunta: "Com qual produto deve ser feita a limpeza da maca entre clientes?",
            opcoes: ["Água e sabão", "Álcool 70%", "Água sanitária", "Detergente"],
            respostaCorreta: 1,
            explicacao: "A limpeza da maca deve ser feita com álcool 70% entre cada cliente, garantindo a desinfecção adequada da superfície."
          }
        ],
        checklist: [
          "Sei os procedimentos de higienização",
          "Conheço os EPIs necessários",
          "Entendo a rotina de limpeza do ambiente",
          "Domino o checklist de biossegurança"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 12 — MERCADO DE SEITAI NO MUNDO (6h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "O Mercado de Seitai no Mundo",
    descricao: "Crescimento global, oportunidades no Brasil e perfil do consumidor",
    icone: "BarChart3",
    cor: "from-indigo-50 to-violet-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Crescimento Global do Seitai",
        descricao: "Caso JBT, fatores de sucesso e expansão asiática",
        duracaoMinutos: 30,
        conteudo: `# Crescimento Global do Seitai

## Exemplo de Sucesso: Japanese Body Therapy (JBT)

A JBT lançou uma base de expansão em Cingapura com planos de estabelecer 100 centros de franquia na Ásia. Liderada por Yuta Kizaki, terapeuta certificado no Japão, que escalou uma rede de 187 centros de terapia corporal no país.

## Fatores de Sucesso

- Abordagem sistemática e reprodutível
- Treinamento estruturado
- Acompanhamento de desempenho
- Qualidade consistente do serviço

> O modelo JBT demonstra que o Seitai é escalável e tem potencial global.`,
        quiz: [
          {
            pergunta: "Quantos centros a JBT estabeleceu no Japão?",
            opcoes: ["50 centros", "100 centros", "187 centros", "250 centros"],
            respostaCorreta: 2,
            explicacao: "A JBT, liderada por Yuta Kizaki, estabeleceu e escalou uma rede de 187 centros de terapia corporal no Japão."
          }
        ],
        checklist: [
          "Conheço o caso de sucesso da JBT",
          "Entendo os fatores de escalabilidade",
          "Sei os planos de expansão global",
          "Compreendo o potencial do mercado"
        ]
      },
      {
        titulo: "Oportunidades no Brasil",
        descricao: "Segmentos de mercado e nichos para atuação",
        duracaoMinutos: 30,
        conteudo: `# Oportunidades no Brasil

| Segmento | Oportunidade |
|---|---|
| **Clínicas de estética e bem-estar** | Serviço diferenciado de terapia japonesa |
| **Spas e resorts** | Tratamentos exclusivos para hóspedes |
| **Consultórios de quiropraxia/fisioterapia** | Abordagem complementar |
| **Academias** | Recuperação e equilíbrio postural |
| **Eventos e feiras de bem-estar** | Demonstrações e quick sessions |

> O mercado brasileiro tem grande potencial para o Seitai, especialmente pela crescente busca por terapias complementares.`,
        quiz: [
          {
            pergunta: "Qual é uma oportunidade de atuação com Seitai em academias?",
            opcoes: ["Aulas de musculação", "Recuperação e equilíbrio postural", "Personal training", "Nutrição esportiva"],
            respostaCorreta: 1,
            explicacao: "Em academias, o Seitai pode ser oferecido para recuperação muscular e equilíbrio postural dos praticantes de atividade física."
          }
        ],
        checklist: [
          "Conheço os segmentos de mercado",
          "Sei as oportunidades no Brasil",
          "Entendo o posicionamento como serviço diferenciado",
          "Consigo identificar nichos de atuação"
        ]
      },
      {
        titulo: "Perfil do Consumidor",
        descricao: "Tipos de clientes e abordagem para cada perfil",
        duracaoMinutos: 30,
        conteudo: `# Perfil do Consumidor de Seitai

| Perfil | Características | Abordagem |
|---|---|---|
| **Pessoas com dores crônicas** | Buscam alívio sem intervenções invasivas | Protocolos específicos |
| **Profissionais estressados** | Necessitam de relaxamento e equilíbrio | Ênfase no equilíbrio energético |
| **Praticantes de atividades físicas** | Prevenção e recuperação | Trabalho postural e muscular |
| **Idosos** | Mobilidade e qualidade de vida | Técnicas suaves e adaptadas |
| **Interessados em terapias orientais** | Buscam abordagem holística | Ênfase na filosofia e energia |

> Conhecer o perfil do consumidor permite personalizar a comunicação e o atendimento.`,
        quiz: [
          {
            pergunta: "Qual abordagem é mais indicada para o público idoso?",
            opcoes: ["Técnicas intensas", "Técnicas suaves e adaptadas", "Apenas alongamentos", "Mobilizações forçadas"],
            respostaCorreta: 1,
            explicacao: "Para idosos, devem ser utilizadas técnicas suaves e adaptadas, focando em mobilidade e qualidade de vida."
          }
        ],
        checklist: [
          "Conheço os perfis de consumidores",
          "Sei adaptar a abordagem para cada perfil",
          "Entendo as necessidades de cada público",
          "Consigo personalizar a comunicação"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 13 — PROFISSIONALIZAÇÃO E NEGÓCIOS (8h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Profissionalização e Negócios",
    descricao: "Modelos de atuação, precificação e estratégias de marketing",
    icone: "BarChart3",
    cor: "from-emerald-50 to-teal-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Modelos de Atuação e Precificação",
        descricao: "Autônomo, clínica, franquia e tabela de preços",
        duracaoMinutos: 45,
        conteudo: `# Modelos de Atuação e Precificação

## Modelos de Atuação

| Modelo | Descrição | Investimento | Retorno |
|---|---|---|---|
| **Autônomo domiciliar** | Atendimento na casa do cliente | Baixo | R$ 2.000-4.000/mês |
| **Consultório compartilhado** | Divisão de espaço | Médio | R$ 3.000-6.000/mês |
| **Clínica própria** | Espaço físico fixo | Alto | R$ 8.000-15.000/mês |
| **Franquia** | Modelo padronizado | Médio/Alto | Escalável |
| **Equipe multidisciplinar** | Colaboração com outros profissionais | Médio | R$ 5.000-10.000/mês |

## Tabela de Preços de Mercado

| Tipo de Sessão | Duração | Preço Médio |
|---|---|---|
| **Sessão de Seitai** | 60 min | R$ 150-250 |
| **Sessão de New Seitai** | 60-75 min | R$ 200-350 |
| **Pacote 5 sessões** | - | 10-20% desconto |
| **Pacote 10 sessões** | - | 15-25% desconto |
| **Sessão de manutenção** | 45 min | R$ 120-180 |`,
        quiz: [
          {
            pergunta: "Qual modelo de atuação tem maior potencial de retorno?",
            opcoes: ["Autônomo domiciliar", "Consultório compartilhado", "Clínica própria", "Nenhum se destaca"],
            respostaCorreta: 2,
            explicacao: "A clínica própria tem o maior potencial de retorno (R$ 8.000-15.000/mês), porém exige investimento inicial mais alto."
          }
        ],
        checklist: [
          "Conheço os modelos de atuação",
          "Sei calcular precificação",
          "Entendo a tabela de preços de mercado",
          "Consigo elaborar pacotes de sessões"
        ]
      },
      {
        titulo: "Estratégias de Marketing Digital",
        descricao: "Presença online, conteúdo e canais de divulgação",
        duracaoMinutos: 40,
        conteudo: `# Estratégias de Marketing Digital

## Presença Online

| Canal | Estratégia | Frequência |
|---|---|---|
| **Instagram** | Conteúdo educativo, vídeos de técnicas, depoimentos | Diário |
| **Facebook** | Comunidade, eventos, artigos | 3-5x semana |
| **WhatsApp Business** | Relacionamento, agendamentos, dicas | Diário |
| **Google Meu Negócio** | Busca local, avaliações | Otimizado sempre |
| **YouTube** | Vídeos explicativos | Semanal |

## Conteúdo que Educa e Vende

| Tipo | Exemplo | Objetivo |
|---|---|---|
| **Educativo** | "O que é Seitai? Diferenças para a quiropraxia" | Autoridade |
| **Filosofia oriental** | "O conceito de Ki e os pontos tsubo" | Diferenciação |
| **Benefícios** | "Como o Seitai pode ajudar na sua dor lombar" | Conversão |
| **Depoimentos** | Clientes satisfeitos (com autorização) | Prova social |
| **Bastidores** | Preparação do espaço, cuidados | Humanização |`,
        quiz: [
          {
            pergunta: "Qual canal é mais indicado para busca local?",
            opcoes: ["Instagram", "YouTube", "Google Meu Negócio", "Facebook"],
            respostaCorreta: 2,
            explicacao: "O Google Meu Negócio é o canal mais indicado para busca local, permitindo que clientes próximos encontrem seus serviços."
          }
        ],
        checklist: [
          "Conheço os canais de marketing digital",
          "Sei criar conteúdo que educa e vende",
          "Entendo a frequência de publicação",
          "Domino o posicionamento online"
        ]
      },
      {
        titulo: "Parcerias Estratégicas",
        descricao: "Parcerias com academias, estúdios, fisioterapeutas e spas",
        duracaoMinutos: 35,
        conteudo: `# Parcerias Estratégicas

| Parceiro | Abordagem |
|---|---|
| **Academias** | Pacotes para alunos |
| **Estúdios de yoga e pilates** | Indicação cruzada |
| **Fisioterapeutas** | Tratamento complementar |
| **Nutricionistas** | Abordagem holística |
| **Spas e hotéis** | Serviço terceirizado |

> Parcerias estratégicas ampliam o alcance e geram indicações qualificadas.

## Como Estabelecer Parcerias

- Apresente os benefícios mútuos
- Ofereça sessões demonstrativas
- Crie programas de indicação
- Mantenha comunicação regular
- Meça resultados e ajuste a estratégia`,
        quiz: [
          {
            pergunta: "Qual é a melhor forma de iniciar uma parceria?",
            opcoes: ["Enviar e-mail genérico", "Oferecer sessões demonstrativas", "Apenas ligar", "Esperar que procurem"],
            respostaCorreta: 1,
            explicacao: "Oferecer sessões demonstrativas é a melhor forma de iniciar parcerias, pois o parceiro pode experimentar o serviço na prática."
          }
        ],
        checklist: [
          "Conheço os parceiros estratégicos",
          "Sei como abordar cada parceiro",
          "Entendo a importância de indicação cruzada",
          "Consigo criar programas de parceria"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 14 — TENDÊNCIAS E OPORTUNIDADES (4h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Tendências e Oportunidades",
    descricao: "Tendências globais e nichos de crescimento para o Seitai",
    icone: "GraduationCap",
    cor: "from-fuchsia-50 to-pink-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Tendências no Mercado de Terapias Orientais",
        descricao: "Expansão global, integração com evidências e novos nichos",
        duracaoMinutos: 35,
        conteudo: `# Tendências no Mercado de Terapias Orientais

| Tendência | Descrição | Oportunidade |
|---|---|---|
| **Expansão global** | Redes como JBT planejam 100 centros na Ásia | Crescimento do mercado |
| **Integração com evidências** | J-SEITAI combina tradição com ciência | Credibilidade |
| **Sistematização** | Métodos reprodutíveis e escaláveis | Franquias e treinamentos |
| **Bem-estar corporativo** | Empresas investindo em saúde dos funcionários | Contratos corporativos |
| **Turismo de bem-estar** | Hotéis e resorts oferecendo terapias locais | Parcerias |

> O mercado de terapias orientais está em expansão acelerada, com oportunidades em diversos segmentos.`,
        quiz: [
          {
            pergunta: "Qual tendência abre oportunidade para contratos corporativos?",
            opcoes: ["Turismo de bem-estar", "Expansão global", "Bem-estar corporativo", "Sistematização"],
            respostaCorreta: 2,
            explicacao: "A tendência de bem-estar corporativo, com empresas investindo na saúde dos funcionários, abre oportunidades para contratos de Seitai corporativo."
          }
        ],
        checklist: [
          "Conheço as tendências do mercado",
          "Entendo as oportunidades de cada tendência",
          "Sei como me posicionar para o futuro",
          "Compreendo a integração tradição-ciência"
        ]
      },
      {
        titulo: "Nichos de Crescimento",
        descricao: "Atletas, gestantes, idosos, corporativo e formação",
        duracaoMinutos: 30,
        conteudo: `# Nichos de Crescimento

| Nicho | Descrição | Público-alvo |
|---|---|---|
| **Seitai para atletas** | Recuperação e performance | Esportistas |
| **Seitai para gestantes** | Adaptações suaves para o período gestacional | Gestantes |
| **Seitai para idosos** | Mobilidade e qualidade de vida | Terceira idade |
| **Seitai corporativo** | Quick sessions em empresas | Funcionários estressados |
| **Formação de terapeutas** | Cursos e certificações | Profissionais da área |

> Escolher um nicho de especialização pode ser o diferencial para se destacar no mercado.

## Estratégia de Nicho

- Escolha 1-2 nichos para se especializar
- Desenvolva protocolos específicos para o nicho
- Construa autoridade no segmento escolhido
- Crie conteúdo direcionado ao público-alvo
- Busque certificações adicionais quando possível`,
        quiz: [
          {
            pergunta: "Qual nicho é ideal para quick sessions em escritórios?",
            opcoes: ["Seitai para atletas", "Seitai para gestantes", "Seitai corporativo", "Seitai para idosos"],
            respostaCorreta: 2,
            explicacao: "O Seitai corporativo é o nicho ideal para quick sessions em empresas, atendendo funcionários estressados durante o expediente."
          }
        ],
        checklist: [
          "Conheço os nichos de crescimento",
          "Sei escolher nichos de especialização",
          "Entendo a estratégia de nicho",
          "Consigo desenvolver protocolos por nicho"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 15 — BÔNUS E CERTIFICAÇÃO (4h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Bônus e Certificação",
    descricao: "Materiais exclusivos, suporte pós-curso e certificado de conclusão",
    icone: "GraduationCap",
    cor: "from-yellow-50 to-amber-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Bônus Exclusivos e Suporte Pós-Curso",
        descricao: "Acesso vitalício, grupo VIP, fornecedores e materiais extras",
        duracaoMinutos: 30,
        conteudo: `# Bônus Exclusivos

| Bônus | Descrição |
|---|---|
| **Acesso vitalício ao conteúdo** | Revisões e atualizações sempre disponíveis |
| **Grupo VIP de alunas** | Comunidade exclusiva para troca de experiências |
| **Lista de fornecedores verificados** | Materiais, equipamentos, modelos anatômicos |
| **Planilha de custos** | Controle financeiro facilitado |
| **Modelos de ficha de anamnese** | Prontidão para atendimento |
| **Ebook com pontos tsubo** | Guia de referência rápida |
| **Vídeos de técnicas** | Demonstrações passo a passo |

## Suporte Pós-Curso

- Acesso vitalício ao conteúdo
- Atualizações periódicas sobre novas técnicas
- Grupo de discussão online com outros profissionais
- Webinars com especialistas da área`,
        quiz: [
          {
            pergunta: "Qual material de referência rápida é incluído como bônus?",
            opcoes: ["Livro de anatomia", "Ebook com pontos tsubo", "Manual de quiropraxia", "Atlas muscular"],
            respostaCorreta: 1,
            explicacao: "O Ebook com pontos tsubo é incluído como bônus para servir como guia de referência rápida durante a prática profissional."
          }
        ],
        checklist: [
          "Conheço todos os bônus disponíveis",
          "Sei como acessar o grupo VIP",
          "Tenho os materiais de apoio",
          "Entendo o suporte pós-curso"
        ]
      },
      {
        titulo: "Certificação e Próximos Passos",
        descricao: "Certificado de conclusão, como utilizá-lo e início da prática",
        duracaoMinutos: 30,
        conteudo: `# Certificação

Ao finalizar o curso, o aluno recebe certificado de conclusão, comprovando as habilidades adquiridas.

## Utilização do Certificado

- Comprovar horas de formação continuada
- Enriquecer currículo
- Aumentar chances de conseguir novo emprego
- Obter credibilidade junto aos clientes
- Iniciar a prática profissional com embasamento teórico

## Resumo da Formação

✅ 15 módulos completos
✅ 125 horas de conteúdo
✅ Da fundação à profissionalização
✅ Seitai tradicional + New Seitai / J-SEITAI
✅ Protocolos de tratamento validados
✅ Ferramentas de negócio e marketing

> Parabéns! Ao completar este curso, você está apto a compreender e aplicar os fundamentos do Seitai e New Seitai com segurança e visão de negócios.`,
        quiz: [
          {
            pergunta: "Quantas horas totais tem o curso de Seitai e New Seitai?",
            opcoes: ["80 horas", "100 horas", "125 horas", "150 horas"],
            respostaCorreta: 2,
            explicacao: "O curso completo de Seitai e New Seitai tem 125 horas totais distribuídas em 15 módulos."
          }
        ],
        checklist: [
          "Completei todos os 15 módulos",
          "Entendo como usar o certificado",
          "Sei os próximos passos profissionais",
          "Estou pronto para iniciar a prática"
        ]
      }
    ]
  }
];
