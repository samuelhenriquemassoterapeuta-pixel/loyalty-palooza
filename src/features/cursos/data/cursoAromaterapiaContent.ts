import { type ModuloContent } from "@/features/cursos/data/cursoVendasContent";

export const cursoAromaterapiaData: ModuloContent[] = [
  // ═══════════════════════════════════════════════════════════
  // MÓDULO 1 — FUNDAÇÃO (8h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Fundação",
    descricao: "História, extração, ciência do aroma, qualidade CPTG® e segurança",
    icone: "Lightbulb",
    cor: "from-violet-50 to-purple-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "História e Origens da Aromaterapia",
        descricao: "Das civilizações antigas à era moderna da aromaterapia científica",
        duracaoMinutos: 90,
        conteudo: `# História e Origens da Aromaterapia

## A Ciência e a Alma da Aromaterapia

A aromaterapia é uma das práticas terapêuticas mais antigas da humanidade. Desde os primeiros registros da civilização, plantas aromáticas foram utilizadas para cura, rituais e bem-estar.

## Civilizações Antigas (4000 a.C. – 476 d.C.)

| Civilização | Período | Contribuições | Evidências |
|---|---|---|---|
| **Egípcios** | 3000 a.C. | Primeira forma de destilação, uso em rituais e embalsamamento | Papiro de Ebers (1550 a.C.), Túmulo de Tutancâmon |
| **Chineses** | 2700 a.C. | Primeiro tratado médico com óleos essenciais | Huang Di Nei Jing, Shen Nong Ben Cao Jing |
| **Indianos** | 2000 a.C. | Ayurveda — sistema médico mais antigo | Vedas com 700+ plantas medicinais |
| **Gregos** | 500 a.C. | Hipócrates e a terapia pelos aromas | Teofrasto — "História das Plantas" |
| **Romanos** | 100 a.C. | Banhos públicos com óleos, destilação avançada | Plínio, o Velho — 37 volumes |

## Era Moderna

| Ano | Pesquisador | Contribuição |
|---|---|---|
| 1928 | René-Maurice Gattefossé | Criou o termo "aromaterapia" após curar uma queimadura com lavanda |
| 1960 | Marguerite Maury | Desenvolveu aplicação tópica na coluna vertebral |
| 1980 | Robert Tisserand | Tornou-se referência mundial em segurança aromaterápica |
| 2000 | D. Gary Young | Fundador da dōTERRA, criação dos padrões CPTG® |

> **Curiosidade:** O termo "perfume" vem do latim *per fumum* — "através da fumaça" — referência aos incensos queimados em rituais sagrados.

## O Legado

A aromaterapia moderna combina esse legado milenar com ciência contemporânea. Os estudos clínicos atuais confirmam o que os antigos já sabiam intuitivamente: os aromas influenciam profundamente corpo, mente e emoções.`,
        quiz: [
          {
            pergunta: "Quem criou o termo 'aromaterapia' em 1928?",
            opcoes: ["Hipócrates", "René-Maurice Gattefossé", "Robert Tisserand", "Marguerite Maury"],
            respostaCorreta: 1,
            explicacao: "René-Maurice Gattefossé cunhou o termo após curar uma queimadura severa com óleo de lavanda puro."
          },
          {
            pergunta: "Qual civilização criou o primeiro tratado médico com óleos essenciais?",
            opcoes: ["Egípcios", "Chineses", "Gregos", "Romanos"],
            respostaCorreta: 1,
            explicacao: "Os chineses registraram o uso de plantas aromáticas no Huang Di Nei Jing por volta de 2700 a.C."
          }
        ],
        checklist: [
          "Conheço as 5 civilizações-chave na história da aromaterapia",
          "Sei explicar a contribuição de Gattefossé",
          "Entendo a evolução da era antiga à moderna",
          "Consigo conectar o legado histórico à prática atual"
        ]
      },
      {
        titulo: "O que São Óleos Essenciais",
        descricao: "Métodos de extração, rendimento e natureza química dos OE",
        duracaoMinutos: 100,
        conteudo: `# O que São Óleos Essenciais

## Definição

Os óleos essenciais são compostos aromáticos voláteis extraídos de plantas — flores, folhas, cascas, raízes, sementes e resinas. Cada gota contém centenas de compostos químicos naturais que conferem propriedades terapêuticas únicas.

> **Importante:** Óleos essenciais NÃO são "óleos" gordurosos. São substâncias altamente concentradas que evaporam rapidamente e penetram a pele em segundos.

## Métodos de Extração

| Método | Temperatura | Plantas Típicas | Rendimento |
|---|---|---|---|
| **Destilação a Vapor** | 60-100°C | Lavanda, hortelã, alecrim | Baixo a médio |
| **Prensagem a Frio** | Ambiente | Frutas cítricas (limão, laranja) | Alto |
| **Extração com Solventes** | 40-60°C | Jasmim, rosa, tuberosa | Muito baixo |
| **CO₂ Supercrítico** | 31-50°C | Gengibre, cúrcuma | Médio |

### Como Funciona a Destilação a Vapor

1. Material vegetal é colocado em um alambique
2. Vapor d'água atravessa o material, carregando os compostos voláteis
3. O vapor condensado separa-se em óleo essencial e hidrolato
4. O óleo, mais leve, flutua sobre a água

### Rendimento — A Preciosidade dos OE

- **1 gota de hortelã-pimenta** = 28 xícaras de chá de menta
- **1 frasco (15ml) de lavanda** = 45 plantas inteiras
- **1 frasco (5ml) de rosa** = 22 kg de pétalas (10.000 rosas!)
- **1 frasco (15ml) de limão** = 45 limões

Isso explica por que óleos essenciais puros são tão concentrados e eficazes — e por que a qualidade de extração importa tanto.`,
        quiz: [
          {
            pergunta: "Qual método de extração é usado para óleos cítricos?",
            opcoes: ["Destilação a vapor", "Prensagem a frio", "CO₂ supercrítico", "Extração com solventes"],
            respostaCorreta: 1,
            explicacao: "Cítricos como limão, laranja e bergamota são extraídos por prensagem a frio da casca, preservando seus compostos frescos."
          },
          {
            pergunta: "Uma gota de hortelã-pimenta equivale a quantas xícaras de chá?",
            opcoes: ["5 xícaras", "12 xícaras", "28 xícaras", "50 xícaras"],
            respostaCorreta: 2,
            explicacao: "Uma gota de hortelã-pimenta equivale a 28 xícaras de chá de menta — mostrando a concentração extrema dos OE."
          }
        ],
        checklist: [
          "Compreendi os 4 métodos de extração",
          "Sei explicar o rendimento e por que OE são tão concentrados",
          "Entendo por que a qualidade de extração importa",
          "Consigo diferenciar OE puros de sintéticos"
        ]
      },
      {
        titulo: "A Ciência do Aroma",
        descricao: "Sistema olfativo, sistema límbico e efeitos fisiológicos comprovados",
        duracaoMinutos: 100,
        conteudo: `# A Ciência do Aroma

## Como os Aromas Afetam o Corpo

Quando você inala um óleo essencial, moléculas aromáticas viajam pelo nariz até o bulbo olfativo, que se conecta diretamente ao sistema límbico — o centro emocional do cérebro.

### Via Olfativa

\`\`\`
        BULBO OLFATIVO
              │
        ┌─────┴─────┐
        ↓           ↓
  SISTEMA        CÓRTEX
  LÍMBICO        OLFATIVO
       │            │
┌──────┼──────┐     │
↓      ↓      ↓     ↓
AMÍGDALA HIPOCAMPO HIPOTÁLAMO
(emoções) (memória) (hormônios)
\`\`\`

### Via Tópica

1. Moléculas penetram a epiderme em **20 a 30 segundos**
2. Alcançam a corrente sanguínea em **2 a 5 minutos**
3. São detectadas em todo o corpo em **20 minutos**

## Efeitos Fisiológicos Comprovados

| Efeito | Óleos Chave | Mecanismo Científico |
|---|---|---|
| **Redução do cortisol** | Lavanda, Bergamota, Ylang Ylang | Inibição do eixo HPA |
| **Ondas theta cerebrais** | Sálvia esclaréia, Olíbano | Relaxamento profundo |
| **Modulação de neurotransmissores** | Hortelã, Laranja | Aumento de serotonina e dopamina |
| **Ação antimicrobiana** | Melaleuca, Orégano, Canela | Disrupção de membranas celulares |

> **Na prática clínica:** Quando o cliente inala lavanda no início da sessão, o cortisol começa a cair em 3-5 minutos. Isso prepara o corpo para receber o tratamento de forma mais profunda.

## O Poder da Memória Olfativa

O olfato é o único sentido conectado diretamente ao hipocampo (memória) e amígdala (emoções), sem passar pelo tálamo. Por isso um aroma pode instantaneamente transportar alguém a uma memória de infância.`,
        quiz: [
          {
            pergunta: "Em quanto tempo os óleos essenciais penetram a epiderme?",
            opcoes: ["5-10 minutos", "20-30 segundos", "1-2 horas", "Não penetram"],
            respostaCorreta: 1,
            explicacao: "OE penetram a epiderme em 20-30 segundos e alcançam a corrente sanguínea em 2-5 minutos."
          },
          {
            pergunta: "Qual óleo ajuda na redução do cortisol por inibição do eixo HPA?",
            opcoes: ["Hortelã-pimenta", "Orégano", "Lavanda", "Canela"],
            respostaCorreta: 2,
            explicacao: "Lavanda, Bergamota e Ylang Ylang reduzem o cortisol por inibição do eixo hipotálamo-pituitária-adrenal (HPA)."
          }
        ],
        checklist: [
          "Entendo a via olfativa: nariz → bulbo → sistema límbico",
          "Sei explicar os 4 efeitos fisiológicos comprovados",
          "Compreendo a diferença entre via olfativa e tópica",
          "Consigo explicar a memória olfativa ao cliente"
        ]
      },
      {
        titulo: "Qualidade e Pureza — Padrão CPTG®",
        descricao: "Os 6 testes rigorosos, sourcing ético e como identificar adulteração",
        duracaoMinutos: 100,
        conteudo: `# Qualidade e Pureza — Padrão CPTG®

## O Problema do Mercado

Estima-se que **80% dos óleos essenciais vendidos no mundo são adulterados** — diluídos, misturados com sintéticos ou rotulados incorretamente.

## Testes do Padrão CPTG®

A doTERRA submete cada lote a testes rigorosos:

| Teste | O que Analisa |
|---|---|
| **Cromatografia Gasosa (GC)** | Perfil químico quantitativo de cada composto |
| **Espectrometria de Massas (MS)** | Identificação molecular precisa |
| **Ressonância Magnética (RMN)** | Estrutura molecular tridimensional |
| **Teste de Isótopos** | Origem botânica real do carbono |
| **Análise Microbiológica** | Presença de bactérias, fungos |
| **Teste de Metais Pesados** | Contaminantes como chumbo, mercúrio |

## Co-Impact Sourcing

A doTERRA obtém seus óleos de **mais de 40 países**, priorizando:

- **Origem ideal** — cada planta cresce melhor em determinado solo e clima
- **Comércio justo** — pagamento acima do mercado para agricultores
- **Sustentabilidade** — práticas que preservam o ecossistema
- **Comunidades** — projetos sociais nas regiões produtoras

### Exemplos de Sourcing

| Óleo | Origem | Por quê? |
|---|---|---|
| Lavanda | Bulgária/França | Altitude e clima ideais |
| Olíbano | Somália/Omã | Árvores Boswellia centenárias |
| Hortelã-pimenta | EUA (Indiana) | Solo rico em minerais |
| Melaleuca | Austrália | Habitat nativo da planta |
| Ylang Ylang | Madagascar | Colheita manual na hora certa |

> **Dica clínica:** "Usamos óleos doTERRA porque cada frasco passa por 6 testes de pureza independentes. Você está recebendo o que há de mais puro no mundo."`,
        quiz: [
          {
            pergunta: "Qual teste do CPTG® identifica a origem botânica real do carbono?",
            opcoes: ["Cromatografia Gasosa", "Espectrometria de Massas", "Teste de Isótopos", "Análise Microbiológica"],
            respostaCorreta: 2,
            explicacao: "O teste de isótopos analisa a assinatura isotópica do carbono para confirmar a origem botânica real."
          },
          {
            pergunta: "Qual porcentagem dos OE vendidos no mundo são adulterados?",
            opcoes: ["20%", "50%", "80%", "95%"],
            respostaCorreta: 2,
            explicacao: "Estima-se que 80% dos óleos essenciais comercializados são adulterados de alguma forma."
          }
        ],
        checklist: [
          "Memorizo os 6 testes do padrão CPTG®",
          "Sei explicar Co-Impact Sourcing ao cliente",
          "Conheço a origem dos 5 óleos mais populares",
          "Pratico a frase: 'Cada frasco passa por 6 testes de pureza'"
        ]
      },
      {
        titulo: "Segurança em Aromaterapia",
        descricao: "Diluição, fotossensibilidade, contraindicações e armazenamento",
        duracaoMinutos: 90,
        conteudo: `# Segurança em Aromaterapia

## Regras de Ouro

### Tabela de Diluição Recomendada

| Tipo de Uso | Diluição | Gotas por 10ml de carreador |
|---|---|---|
| Crianças (2-6 anos) | 0.5-1% | 1-3 gotas |
| Crianças (6-12 anos) | 1-1.5% | 3-5 gotas |
| Adultos — uso diário | 2-3% | 6-9 gotas |
| Adultos — uso terapêutico | 3-5% | 9-15 gotas |
| Adultos — uso pontual | 5-10% | 15-30 gotas |

**Óleos carreadores recomendados:** Óleo de coco fracionado (favorito dōTERRA), jojoba, amêndoas doces, semente de uva.

## Precauções por Situação

| Situação | Óleos a Evitar |
|---|---|
| **Gestantes** | Sálvia, Poejo, Arruda, Absinto |
| **Lactantes** | Hortelã-pimenta (pode reduzir leite) |
| **Crianças < 2 anos** | Eucalipto, Hortelã, Melaleuca |
| **Epilepsia** | Hortelã, Alecrim, Eucalipto |
| **Pressão alta** | Alecrim, Hortelã, Tomilho |

## Fotossensibilidade

| Nível | Óleos | Tempo de Espera Antes do Sol |
|---|---|---|
| **Alto** | Bergamota, Toranja, Limão | 12-24 horas |
| **Médio** | Laranja Doce, Lima | 6-12 horas |
| **Baixo** | Bergamota FCF | 2-4 horas |

## Armazenamento Correto

| Fator | Recomendação |
|---|---|
| **Luz** | Frascos âmbar ou azul cobalto |
| **Temperatura** | 15-25°C (ambiente estável) |
| **Ar** | Frascos bem fechados após o uso |
| **Umidade** | Ambiente seco |
| **Validade** | 3-5 anos (cítricos: 1-2 anos) |

## Teste de Sensibilidade

Antes de usar um óleo novo no cliente:
1. Aplique 1 gota diluída no antebraço
2. Aguarde 15-30 minutos
3. Observe vermelhidão, coceira ou irritação
4. Se houver reação, aplique óleo carreador (NUNCA água)`,
        quiz: [
          {
            pergunta: "Qual a diluição recomendada para uso diário em adultos?",
            opcoes: ["0.5-1%", "2-3% (6-9 gotas por 10ml)", "5-10%", "Usar puro"],
            respostaCorreta: 1,
            explicacao: "Para adultos em uso diário, a diluição recomendada é 2-3%, equivalendo a 6-9 gotas por 10ml de carreador."
          },
          {
            pergunta: "Quanto tempo evitar sol após aplicar Bergamota?",
            opcoes: ["2-4 horas", "6-8 horas", "12-24 horas", "48 horas"],
            respostaCorreta: 2,
            explicacao: "Bergamota tem nível ALTO de fotossensibilidade, exigindo 12-24 horas sem exposição solar."
          }
        ],
        checklist: [
          "Imprimi a tabela de diluição para consulta rápida",
          "Memorizo os óleos fotossensíveis e tempos de espera",
          "Sei as contraindicações para gestantes e crianças",
          "Sei realizar teste de sensibilidade corretamente",
          "Conheço as regras de armazenamento"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 2 — EXPLORANDO OS ÓLEOS ESSENCIAIS (15h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Explorando os Óleos Essenciais",
    descricao: "Classificação química, perfil de 40+ óleos e aplicação por sistemas",
    icone: "Heart",
    cor: "from-emerald-50 to-green-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Classificação Química dos Óleos",
        descricao: "As 8 famílias químicas e suas propriedades terapêuticas",
        duracaoMinutos: 180,
        conteudo: `# Classificação Química dos Óleos Essenciais

## As 8 Famílias Químicas

Cada óleo essencial contém centenas de compostos organizados em famílias químicas. Conhecer essas famílias permite prever propriedades e criar sinergias inteligentes.

| Família | Propriedades Terapêuticas | Exemplos de Óleos |
|---|---|---|
| **Monoterpenos** | Estimulantes, antivirais, desinfetantes | Pinho, Limão, Laranja |
| **Sesquiterpenos** | Anti-inflamatórios, calmantes profundos | Cedro, Vetiver, Olíbano |
| **Ésteres** | Calmantes, antiespasmódicos, equilibrantes | Lavanda, Bergamota |
| **Aldeídos** | Sedativos, antivirais, calmantes | Capim-limão, Melissa |
| **Fenóis** | Antibacterianos potentes, imunoestimulantes | Orégano, Tomilho, Cravo |
| **Álcoois** | Antissépticos suaves, seguros para a pele | Rosa, Gerânio |
| **Óxidos** | Expectorantes, descongestionantes | Eucalipto, Alecrim |
| **Cetonas** | Mucolíticas, cicatrizantes (neurotóxicas em dose alta) | Hortelã, Sálvia |

### Regra Prática

- **Fenóis e Cetonas** → mais potentes, exigem maior cuidado na diluição
- **Álcoois e Ésteres** → mais seguros para uso geral e peles sensíveis
- **Monoterpenos** → excelentes para iniciar sessões (energia, limpeza)
- **Sesquiterpenos** → excelentes para finalizar sessões (calma, profundidade)

> **Dica clínica:** Comece a sessão com monoterpenos (cítricos) para energizar e termine com sesquiterpenos (madeiras) para acalmar.`,
        quiz: [
          {
            pergunta: "Qual família química é mais potente como antibacteriano?",
            opcoes: ["Monoterpenos", "Ésteres", "Fenóis", "Álcoois"],
            respostaCorreta: 2,
            explicacao: "Fenóis (presentes no Orégano, Tomilho e Cravo) são os antibacterianos mais potentes, mas exigem cuidado na diluição."
          },
          {
            pergunta: "Quais famílias são mais seguras para uso geral?",
            opcoes: ["Fenóis e Cetonas", "Álcoois e Ésteres", "Monoterpenos e Aldeídos", "Óxidos e Cetonas"],
            respostaCorreta: 1,
            explicacao: "Álcoois (Rosa, Gerânio) e Ésteres (Lavanda) são as famílias mais seguras para uso geral."
          }
        ],
        checklist: [
          "Memorizei as 8 famílias químicas e seus efeitos",
          "Sei quais famílias exigem mais cuidado na diluição",
          "Entendo a lógica de monoterpenos no início e sesquiterpenos no fim",
          "Consigo classificar os óleos que uso no dia a dia"
        ]
      },
      {
        titulo: "Perfil Detalhado dos Óleos — Por Famílias",
        descricao: "Cítricos, ervas, flores, madeiras/resinas e especiarias",
        duracaoMinutos: 300,
        conteudo: `# Perfil Detalhado dos Óleos Essenciais

## 🍊 Família dos Cítricos

| Óleo | Propriedades | Uso Principal |
|---|---|---|
| **Laranja Doce** | Eleva humor, calmante digestivo | Ansiedade, limpeza de ambientes |
| **Limão** | Purificante, imunoestimulante | Água detox, limpeza |
| **Bergamota** | Ansiolítico, antidepressivo | Estresse, pele oleosa |
| **Toranja** | Termogênico, estimulante metabólico | Apetite, celulite |
| **Tangerina** | Calmante infantil suave | Crianças, sono |

## 🌿 Família das Ervas

| Óleo | Propriedades | Uso Principal |
|---|---|---|
| **Hortelã-pimenta** | Analgésico, energizante potente | Dor de cabeça, foco |
| **Alecrim** | Estimulante mental, antisséptico | Memória, queda capilar |
| **Tomilho** | Imunoestimulante poderoso | Infecções, fadiga crônica |
| **Manjerona** | Relaxante muscular, vasodilatador | Insônia, tensão muscular |
| **Orégano** | Antibiótico natural de amplo espectro | Imunidade, proteção |

## 💐 Família das Flores

| Óleo | Propriedades | Uso Principal |
|---|---|---|
| **Lavanda** | Calmante universal, cicatrizante | Sono, queimaduras, ansiedade |
| **Ylang Ylang** | Relaxante, afrodisíaco, hipotensor | Estresse, sensualidade |
| **Gerânio** | Equilibrante hormonal, tônico cutâneo | Pele, TPM, menopausa |
| **Rosa** | Calmante profundo, regenerador | Autoestima, luto, envelhecimento |
| **Jasmim** | Antidepressivo, euforizante | Confiança, sensualidade |
| **Camomila** | Calmante infantil, anti-inflamatório | Cólicas, irritações de pele |

## 🌲 Família das Madeiras e Resinas

| Óleo | Propriedades | Uso Principal |
|---|---|---|
| **Olíbano** | Meditação, regenerador celular | Pele, espiritualidade, dor crônica |
| **Mirra** | Cicatrizante, antifúngico | Pele, gengivas, feridas |
| **Cedro** | Calmante, fortalecedor capilar | Queda capilar, insônia |
| **Sândalo** | Meditação, hidratante profundo | Pele seca, espiritualidade |
| **Eucalipto** | Expectorante, descongestionante | Respiração, limpeza |

## 🌶️ Família das Especiarias

| Óleo | Propriedades | Uso Principal |
|---|---|---|
| **Gengibre** | Digestivo, anti-inflamatório aquecedor | Enjoo, dores musculares |
| **Cravo** | Analgésico potente, antisséptico | Dor de dente, imunidade |
| **Canela** | Antisséptico, termogênico | Imunidade, metabolismo |
| **Coentro** | Digestivo, calmante suave | Digestão, ansiedade |

> **Regra dos 3:** Comece dominando 3 óleos de cada família. Só então avance para novos. Qualidade de conhecimento > quantidade.`,
        quiz: [
          {
            pergunta: "Qual óleo é chamado de 'calmante universal'?",
            opcoes: ["Hortelã-pimenta", "Lavanda", "Orégano", "Limão"],
            respostaCorreta: 1,
            explicacao: "A Lavanda é considerada o calmante universal por sua versatilidade — sono, ansiedade, queimaduras e cicatrização."
          },
          {
            pergunta: "Qual óleo é ideal para sessões de Head SPA por estimular o couro cabeludo?",
            opcoes: ["Laranja Doce", "Cedro", "Jasmim", "Canela"],
            respostaCorreta: 1,
            explicacao: "O Cedro é perfeito para Head SPA — calmante profundo e fortalecedor capilar."
          }
        ],
        checklist: [
          "Conheço os óleos principais de cada uma das 5 famílias",
          "Sei indicar pelo menos 3 óleos para relaxamento",
          "Sei indicar pelo menos 3 óleos para imunidade",
          "Domino as propriedades da tríade essencial: Lavanda, Hortelã, Limão"
        ]
      },
      {
        titulo: "Aplicação por Sistemas do Corpo",
        descricao: "Protocolos de sinergias para imunidade, digestão, nervoso e músculo-esquelético",
        duracaoMinutos: 240,
        conteudo: `# Aplicação por Sistemas do Corpo

## Sistema Imunológico

| Óleo | Ação | Sinergia Potente |
|---|---|---|
| **Melaleuca** | Antiviral, antibacteriano | + Limão + Lavanda |
| **On Guard®** | Proteção imunológica completa | + Melaleuca |
| **Eucalipto** | Expectorante, antisséptico respiratório | + Hortelã + Limão |
| **Limão** | Purificante, alcalinizante | + Melaleuca |
| **Orégano** | Antibiótico natural potente | + Limão + On Guard® |

## Sistema Digestório

| Óleo | Ação | Sinergia Potente |
|---|---|---|
| **Hortelã** | Antiespasmódico, refrescante | + Gengibre |
| **Gengibre** | Anti-náusea, carminativo | + Hortelã + Limão |
| **Limão** | Alcalinizante, depurativo | + Hortelã |
| **Erva-doce** | Antiflatulento, digestivo | + Hortelã |
| **Zendocrine®** | Detox hepático completo | + Limão |

## Sistema Nervoso

| Óleo | Ação | Sinergia Potente |
|---|---|---|
| **Lavanda** | Calmante universal | + Bergamota |
| **Bergamota** | Ansiolítico, antidepressivo | + Lavanda + Cedro |
| **Olíbano** | Meditação, foco interior | + Lavanda |
| **Ylang Ylang** | Relaxante, hipotensor | + Lavanda |
| **Vetiver** | Grounding, aterramento profundo | + Lavanda + Cedro |
| **Balance®** | Equilíbrio emocional | + Lavanda |

## Sistema Músculo-Esquelético

| Óleo | Ação | Sinergia Potente |
|---|---|---|
| **Hortelã** | Analgésico refrescante | + Deep Blue® |
| **Alecrim** | Anti-inflamatório, estimulante | + Hortelã |
| **Manjerona** | Relaxante muscular profundo | + Lavanda |
| **Gengibre** | Anti-inflamatório aquecedor | + Deep Blue® |
| **Deep Blue®** | Alívio completo de dores | + Hortelã |

> **Dica clínica:** Monte "kits de sistema" com sinergias prontas para atendimento rápido e profissional.`,
        quiz: [
          {
            pergunta: "Qual sinergia é mais indicada para ansiedade?",
            opcoes: ["Orégano + Limão", "Lavanda + Bergamota", "Hortelã + Gengibre", "Eucalipto + Hortelã"],
            respostaCorreta: 1,
            explicacao: "Lavanda + Bergamota é a sinergia clássica para ansiedade — ação sinérgica nos receptores GABA."
          }
        ],
        checklist: [
          "Sei indicar sinergias para os 4 sistemas principais",
          "Criei pelo menos 1 sinergia pronta para cada sistema",
          "Entendo a lógica por trás de cada combinação",
          "Conheço os blends proprietários dōTERRA (On Guard, Deep Blue, Balance)"
        ]
      },
      {
        titulo: "Protocolos Práticos do Dia a Dia",
        descricao: "Protocolos de imunidade, digestão e equilíbrio emocional prontos para uso",
        duracaoMinutos: 180,
        conteudo: `# Protocolos Práticos do Dia a Dia

## Protocolo Imunidade

### Prevenção Diária
- Difusor com On Guard® — 3x ao dia (30 min cada)

### Após Exposição
- On Guard® na nuca e planta dos pés — a cada 4 horas

### Sintomas Iniciais
- 2 gotas On Guard® + 2 gotas Limão em cápsula vegetal

### Congestão Respiratória
- Inalação com Eucalipto + Hortelã (3 gotas cada em água quente)

---

## Protocolo Digestivo

### Indigestão
- 2 gotas Hortelã + 2 gotas Gengibre em cápsula vegetal

### Inchaço/Gases
- Massagem com DigestZen® diluído no abdômen (sentido horário)

### Detox Matinal
- Água morna com 1 gota Limão + 1 gota Hortelã

---

## Protocolo Emocional

### Ansiedade
- Difusor com 3 gotas Lavanda + 3 gotas Bergamota

### Insônia
- Lavanda + Cedro no difusor à noite
- Balance® na planta dos pés antes de dormir

### Baixa Autoestima
- Ylang Ylang + Bergamota + Olíbano — 1 gota de cada nos pulsos

### Luto / Perda
- Rosa + Olíbano + Lavanda — inalação nas mãos

---

## Protocolo Dores

### Cefaleia Tensional
- 1 gota de Hortelã nas têmporas (diluída)

### Dor Muscular
- Deep Blue® + Hortelã em óleo de coco fracionado — massagem local

### Dor Articular
- Gengibre + Alecrim + Deep Blue® — compressas mornas

> **Importante:** Esses protocolos são diretrizes gerais. Sempre adapte à necessidade individual do cliente e respeite contraindicações.`,
        quiz: [
          {
            pergunta: "Qual a recomendação para detox matinal com óleos?",
            opcoes: ["Inalar Eucalipto", "Água morna com Limão + Hortelã", "Difusor com Lavanda", "Orégano em cápsula"],
            respostaCorreta: 1,
            explicacao: "O detox matinal consiste em água morna com 1 gota de Limão + 1 gota de Hortelã."
          }
        ],
        checklist: [
          "Domino os 4 protocolos: imunidade, digestão, emocional, dores",
          "Sei adaptar cada protocolo ao perfil do cliente",
          "Tenho os óleos necessários para cada protocolo",
          "Pratiquei pelo menos 2 protocolos em mim mesmo"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 3 — TÉCNICAS AVANÇADAS (20h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Técnicas Avançadas",
    descricao: "Métodos de aplicação, AromaTouch®, públicos específicos e receitas DIY",
    icone: "Target",
    cor: "from-amber-50 to-orange-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Métodos de Aplicação Profissional",
        descricao: "Uso tópico, olfativo e técnicas avançadas de aplicação",
        duracaoMinutos: 240,
        conteudo: `# Métodos de Aplicação Profissional

## Uso Tópico

| Método | Melhor Para | Quantidade Típica |
|---|---|---|
| **Massagem corporal** | Relaxamento, dores musculares | 5-10 gotas por área em carreador |
| **Pontos de pulso** | Efeito rápido, emergências emocionais | 1 gota por ponto (pulsos, pescoço) |
| **Compressa** | Inflamação local, dores articulares | 3-5 gotas em toalha morna/fria |
| **Banho aromático** | Relaxamento total, desintoxicação | 5-10 gotas em sal de Epsom |
| **Reflexologia plantar** | Ação em órgãos específicos | 1 gota por ponto reflexo |

## Uso Olfativo

| Método | Melhor Para | Quantidade |
|---|---|---|
| **Difusor ultrassônico** | Ambientes, sessões longas | 3-5 gotas por 100ml de água |
| **Inalação direta** | Emergências, efeito imediato | 1-2 gotas nas mãos |
| **Inalação a vapor** | Congestão, sinusite | 3-4 gotas em água quente |
| **Spray de ambiente** | Purificar, aromatizar | 20-30 gotas por 100ml |

### Técnica de Inalação nas Mãos

1. Pingue 1-2 gotas nas palmas
2. Esfregue as mãos em concha
3. Aproxime do nariz (sem tocar)
4. Inspire profundamente 3 vezes
5. Expire lentamente

> **Na clínica:** Ofereça inalação ao cliente no início de cada sessão. Isso cria um ritual de acolhimento e ativa o sistema parassimpático em 3-5 minutos.`,
        quiz: [
          {
            pergunta: "Quantas gotas de OE usar no difusor por 100ml de água?",
            opcoes: ["1-2 gotas", "3-5 gotas", "10-15 gotas", "20+ gotas"],
            respostaCorreta: 1,
            explicacao: "3-5 gotas por 100ml de água no difusor é a proporção ideal — suficiente para aromatizar sem saturar."
          }
        ],
        checklist: [
          "Domino os 5 métodos de uso tópico",
          "Domino os 4 métodos de uso olfativo",
          "Pratiquei a técnica de inalação nas mãos",
          "Sei escolher o método certo para cada situação"
        ]
      },
      {
        titulo: "A Técnica AromaTouch®",
        descricao: "Protocolo completo com os 8 óleos, 3 círculos e 5 zonas",
        duracaoMinutos: 360,
        conteudo: `# A Técnica AromaTouch®

## Visão Geral

A Técnica AromaTouch® é um protocolo de aplicação tópica de óleos essenciais desenvolvido pelo Dr. David K. Hill. Utiliza 8 óleos em sequência específica na coluna vertebral e pés.

## Os 8 Óleos da Técnica

| Ordem | Óleo | Função Terapêutica | Área de Aplicação |
|---|---|---|---|
| 1 | **Balance®** | Grounding, equilíbrio | Pés e coluna |
| 2 | **Lavanda** | Relaxamento profundo | Pés e coluna |
| 3 | **Melaleuca** | Purificação, imunidade | Pés |
| 4 | **On Guard®** | Proteção imunológica | Pés |
| 5 | **AromaTouch®** | Equilíbrio muscular | Pés e coluna |
| 6 | **Deep Blue®** | Alívio de dores | Pés e coluna |
| 7 | **Hortelã-pimenta** | Energização, frescor | Pés e coluna |
| 8 | **Laranja Doce** | Elevação do humor | Pés e coluna |

## Sequência dos 3 Círculos nos Pés

Para cada óleo aplicado nos pés:

1. **Círculo 1:** Palma desliza do calcanhar aos dedos (3 repetições)
2. **Círculo 2:** Polegares pressionam toda a planta do pé (3 repetições)
3. **Círculo 3:** Mãos em concha envolvem o pé inteiro (3 repetições)

## Ativação das 5 Zonas Reflexas

| Zona | Localização no Pé | Benefício |
|---|---|---|
| **Cabeça** | Pontas dos dedos | Relaxamento mental, clareza |
| **Tórax** | Base dos dedos | Respiração profunda |
| **Abdômen** | Centro do pé | Digestão, equilíbrio |
| **Pelve** | Calcanhar | Equilíbrio hormonal |
| **Coluna** | Borda interna do pé | Eixo central, alinhamento |

## Benefícios Comprovados por Pesquisa

| Parâmetro | Resultado |
|---|---|
| Redução do cortisol | **-37%** |
| Aumento da IgA (imunoglobulina) | **+28%** |
| Redução da pressão arterial | **-12 mmHg** |
| Redução da frequência cardíaca | **-15 bpm** |

> **Certificação:** A Técnica AromaTouch® exige treinamento oficial. Após este módulo, busque a certificação presencial para aplicar profissionalmente.`,
        quiz: [
          {
            pergunta: "Qual é o primeiro óleo aplicado na Técnica AromaTouch®?",
            opcoes: ["Lavanda", "On Guard®", "Balance®", "Hortelã-pimenta"],
            respostaCorreta: 2,
            explicacao: "Balance® é o primeiro óleo — sua função de grounding (aterramento) prepara o corpo para receber os demais."
          },
          {
            pergunta: "Qual a redução de cortisol comprovada pela técnica?",
            opcoes: ["-5%", "-15%", "-37%", "-50%"],
            respostaCorreta: 2,
            explicacao: "Estudos mostram redução de 37% no cortisol salivar com a Técnica AromaTouch®."
          }
        ],
        checklist: [
          "Memorizo a sequência dos 8 óleos",
          "Sei executar os 3 círculos nos pés",
          "Conheço as 5 zonas reflexas e seus benefícios",
          "Conheço os resultados científicos da técnica",
          "Busquei informações sobre certificação oficial"
        ]
      },
      {
        titulo: "Públicos Específicos — Crianças, Gestantes e Animais",
        descricao: "Protocolos seguros e adaptados para públicos sensíveis",
        duracaoMinutos: 300,
        conteudo: `# Públicos Específicos

## 👶 Crianças

### Diluição por Faixa Etária

| Faixa Etária | Diluição | Óleos Seguros |
|---|---|---|
| **0-3 meses** | Apenas difusão ambiente | Lavanda, Camomila |
| **3-6 meses** | 0.25% (1 gota em 20ml) | Lavanda, Camomila, Laranja |
| **6-12 meses** | 0.5% | Lavanda, Laranja, Limão |
| **1-2 anos** | 0.5-1% | Lavanda, Laranja, Gerânio |
| **2-6 anos** | 1% | Lavanda, Laranja, Melaleuca |
| **6-12 anos** | 1-1.5% | Maioria dos OE seguros |

### Protocolos Infantis

- **Cólica:** 1 gota Camomila + 1 Laranja em 10ml de carreador — massagem abdominal
- **Agitação/Birra:** Difusor com Lavanda + Laranja (2 gotas cada)
- **Dentição:** 1 gota Camomila + 1 Lavanda em 5ml de carreador — massagem na mandíbula
- **Insônia infantil:** Difusor com Lavanda + Cedro (2 gotas cada)

## 🤰 Gestantes

### Segurança por Trimestre

| Trimestre | Recomendações | Óleos Seguros |
|---|---|---|
| **1º** | Apenas difusão ambiente | Lavanda, Laranja, Limão |
| **2º** | Uso tópico a 1% máximo | Lavanda, Laranja, Gerânio |
| **3º** | Preparação para o parto | Lavanda, Rosa, Sálvia esclaréia |

### Protocolos Gestacionais

- **Náusea matinal:** Inalar Hortelã ou Gengibre (1 gota nas mãos)
- **Estrias:** Lavanda + Olíbano + Tangerina em óleo vegetal
- **Ansiedade pré-natal:** Difusor com Lavanda + Bergamota
- **Dores lombares:** Lavanda + Manjerona diluídos em compressas

## 🐾 Animais de Estimação

| Animal | Nível de Segurança | Óleos Seguros |
|---|---|---|
| **Cães** | Moderada (diluição 0.5%) | Lavanda, Camomila, Cedro |
| **Gatos** | Baixa — MUITO cuidado | Lavanda (apenas difusão mínima) |
| **Cavalos** | Boa tolerância | Lavanda, Hortelã, Eucalipto |

> ⚠️ **GATOS:** Não metabolizam fenóis. NUNCA aplique Melaleuca, Orégano, Tomilho, Cravo ou Canela em gatos. A difusão deve ser breve e com ventilação.`,
        quiz: [
          {
            pergunta: "Qual diluição é segura para bebês de 3-6 meses?",
            opcoes: ["1%", "0.5%", "0.25%", "Não usar em bebês"],
            respostaCorreta: 2,
            explicacao: "Para bebês de 3-6 meses, a diluição máxima é 0.25% (1 gota em 20ml de carreador)."
          },
          {
            pergunta: "Por que gatos exigem cuidado extremo com OE?",
            opcoes: ["São alérgicos a cheiros", "Não metabolizam fenóis", "Não gostam de aromas", "Têm pele muito grossa"],
            respostaCorreta: 1,
            explicacao: "Gatos não possuem a enzima glucuronil transferase, essencial para metabolizar fenóis. Isso pode causar toxicidade grave."
          }
        ],
        checklist: [
          "Memorizo as diluições por faixa etária infantil",
          "Sei quais óleos são seguros em cada trimestre da gestação",
          "Entendo os riscos específicos para gatos",
          "Tenho protocolos prontos para cólica, dentição e insônia infantil"
        ]
      },
      {
        titulo: "Receitas DIY — Cosméticos e Limpeza Natural",
        descricao: "7 receitas práticas: sprays, soros, pomadas, esfoliantes e sais",
        duracaoMinutos: 300,
        conteudo: `# Receitas DIY — Cosméticos e Limpeza Natural

## 💧 Spray Facial Refrescante
- 50ml água de rosas
- 10ml gel de babosa
- 5 gotas Lavanda
- 3 gotas Gerânio
- 2 gotas Olíbano

*Borrifar no rosto para hidratação e frescor. Validade: 30 dias refrigerado.*

## ✨ Soro Facial Antissinais
- 30ml óleo de rosa mosqueta
- 10ml óleo de jojoba
- 10 gotas Olíbano
- 10 gotas Lavanda
- 5 gotas Mirra

*Aplicar 3-4 gotas à noite após limpeza. Massagear até absorver.*

## 🩹 Pomada Cicatrizante
- 30ml óleo de coco fracionado
- 15g cera de abelha
- 15 gotas Lavanda
- 10 gotas Melaleuca
- 5 gotas Olíbano

*Derreter cera, misturar óleo e OE a 60°C, verter em pote. Solidifica em 2h.*

## 🧂 Esfoliante Corporal Energizante
- 1 xícara açúcar mascavo
- ½ xícara óleo de coco
- 10 gotas Laranja Doce
- 8 gotas Hortelã-pimenta
- 5 gotas Toranja

*Usar no banho com movimentos circulares. Enxaguar com água morna.*

## 🛁 Sal de Banho Relaxante
- 1 xícara sais de Epsom
- ½ xícara sal marinho
- 2 colheres bicarbonato de sódio
- 10 gotas Lavanda
- 8 gotas Ylang Ylang
- 5 gotas Camomila

*Dissolver na banheira ou bacia. Imersão de 20 minutos.*

## 🏠 Limpador Multiuso Natural
- 200ml vinagre branco
- 200ml água filtrada
- 20 gotas Limão
- 15 gotas Laranja
- 10 gotas Melaleuca

*Borrifar em superfícies. Não usar em mármore ou pedras naturais.*

## 🧴 Spray Purificador de Ambientes
- 100ml álcool 70%
- 100ml água filtrada
- 20 gotas Limão
- 15 gotas Melaleuca
- 15 gotas Lavanda

*Borrifar em ambientes, tecidos e superfícies. Agitar antes de usar.*

> **Dica de negócio:** Essas receitas podem se tornar produtos da sua linha própria. Comece com 3-4 itens e expanda conforme a demanda.`,
        quiz: [
          {
            pergunta: "A que temperatura adicionar os OE na pomada cicatrizante?",
            opcoes: ["100°C (fervendo)", "80°C", "60°C (após tirar do fogo)", "Temperatura ambiente"],
            respostaCorreta: 2,
            explicacao: "Adicionar OE a 60°C — quente o suficiente para misturar na cera, mas sem degradar os compostos terapêuticos."
          }
        ],
        checklist: [
          "Fiz pelo menos 1 receita cosmética (spray, soro ou pomada)",
          "Fiz pelo menos 1 receita de limpeza (multiuso ou purificador)",
          "Sei calcular validade dos produtos artesanais",
          "Tenho uma lista de receitas favoritas para oferecer aos clientes"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 4 — PROFISSIONALIZAÇÃO (15h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Profissionalização",
    descricao: "Pirâmide do bem-estar, estudos científicos, ética e modelos de negócio",
    icone: "GraduationCap",
    cor: "from-rose-50 to-pink-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "A Pirâmide do Bem-Estar dōTERRA",
        descricao: "Os 5 pilares baseados em evidências para uma vida plena",
        duracaoMinutos: 180,
        conteudo: `# A Pirâmide do Bem-Estar dōTERRA

## Filosofia Integrada de Saúde

A pirâmide do bem-estar é a base filosófica dōTERRA para uma abordagem holística de saúde. Não se trata apenas de óleos — é um estilo de vida.

\`\`\`
            /\\
           /  \\
          / V  \\
         / Vida \\
        / Plena  \\
       /──────────\\
      / Alimentação\\
     /   Saudável   \\
    /────────────────\\
   / Exercício Físico \\
  /     Regular        \\
 /──────────────────────\\
/ Descanso e Gestão do   \\
/   Estresse              \\
\`\`\`

## Os 5 Pilares

| Pilar | Importância | Óleos Chave |
|---|---|---|
| **Vida Plena** | Propósito, espiritualidade, conexão | Olíbano, Sândalo, Rosa |
| **Alimentação Saudável** | Nutrição celular, vitalidade | Limão, Hortelã, Gengibre |
| **Exercício Regular** | Circulação, força, flexibilidade | Hortelã, Alecrim, Deep Blue® |
| **Descanso Reparador** | Sono, reparação celular | Lavanda, Bergamota, Balance® |
| **Redução de Toxinas** | Detox, ambiente limpo | Limão, Melaleuca, On Guard® |

> **Na prática:** Quando um cliente busca apenas "óleo para dor de cabeça", use a oportunidade para educá-lo sobre os 5 pilares. A aromaterapia é mais eficaz quando integrada a um estilo de vida equilibrado.`,
        quiz: [
          {
            pergunta: "Qual pilar está no topo da pirâmide do bem-estar?",
            opcoes: ["Exercício Regular", "Alimentação Saudável", "Vida Plena (propósito)", "Descanso Reparador"],
            respostaCorreta: 2,
            explicacao: "Vida Plena — propósito, espiritualidade e conexão — está no topo porque dá sentido a todos os outros pilares."
          }
        ],
        checklist: [
          "Memorizo os 5 pilares e seus óleos chave",
          "Sei apresentar a pirâmide ao cliente de forma simples",
          "Integro a filosofia holística no meu atendimento",
          "Consigo conectar qualquer queixa a pelo menos 1 pilar"
        ]
      },
      {
        titulo: "Estudos Científicos em Aromaterapia",
        descricao: "Evidências clínicas: AromaTouch, hortelã para cefaleia e lavanda ansiolítica",
        duracaoMinutos: 180,
        conteudo: `# Estudos Científicos em Aromaterapia

## A Base de Evidências

A aromaterapia moderna é respaldada por centenas de estudos publicados em revistas científicas. Conhecer os principais estudos fortalece sua credibilidade profissional.

## Estudo AromaTouch® — Universidade de Miami (2015)

| Parâmetro | Grupo Controle | Grupo AromaTouch® |
|---|---|---|
| Cortisol salivar | -5% | **-37%** |
| IgA salivar (imunidade) | +3% | **+28%** |
| Pressão arterial | -2 mmHg | **-12 mmHg** |
| Frequência cardíaca | -3 bpm | **-15 bpm** |

*Conclusão: A técnica demonstrou efeitos significativos em marcadores de estresse e imunidade.*

## Estudo Hortelã-pimenta para Cefaleia (2016)

- **120 pacientes** com cefaleia tensional
- **83% de redução da dor** em 15 minutos
- Efeito comparável a **1000mg de paracetamol**
- Mecanismo: ação do mentol nos receptores de frio (TRPM8)

## Estudo Lavanda para Ansiedade Pré-operatória (2018)

- **200 pacientes** em cirurgia eletiva
- Grupo lavanda: **redução de 45% na ansiedade** (escala STAI)
- **30% menos medicação ansiolítica** necessária
- Inalação de 15 minutos antes do procedimento

## Como Usar Evidências na Prática

| Situação | Estudo para Citar |
|---|---|
| Cliente cético | "Estudos em 200 pacientes mostraram 45% menos ansiedade" |
| Médico perguntando | "Pesquisa da Universidade de Miami com marcadores biológicos" |
| Marketing educativo | "83% de redução de cefaleia em 15 minutos" |

> **Credibilidade:** Nunca diga "óleos curam doenças". Diga "estudos mostram que auxiliam no alívio de sintomas".`,
        quiz: [
          {
            pergunta: "Qual a redução de ansiedade pré-operatória com lavanda no estudo de 2018?",
            opcoes: ["10%", "25%", "45%", "70%"],
            respostaCorreta: 2,
            explicacao: "O estudo com 200 pacientes mostrou redução de 45% na ansiedade e 30% menos medicação ansiolítica."
          }
        ],
        checklist: [
          "Conheço os 3 principais estudos e seus resultados",
          "Sei citar evidências sem fazer promessas de cura",
          "Tenho respostas prontas para clientes céticos",
          "Uso linguagem correta: 'auxiliam' e não 'curam'"
        ]
      },
      {
        titulo: "Ética Profissional e Limites de Atuação",
        descricao: "Código de ética, o que pode e não pode fazer como aromaterapeuta",
        duracaoMinutos: 180,
        conteudo: `# Ética Profissional e Limites de Atuação

## Código de Ética

| Princípio | Aplicação Prática |
|---|---|
| **Beneficência** | Recomendar apenas o que é necessário para o cliente |
| **Não-maleficência** | Conhecer todas as contraindicações |
| **Autonomia** | Informar e orientar — nunca impor |
| **Justiça** | Atender sem discriminação |
| **Confidencialidade** | Manter sigilo sobre informações do cliente |
| **Competência** | Não substituir o médico |

## Limites de Atuação

### ✅ O que PODE fazer

- Sugerir óleos para bem-estar e qualidade de vida
- Oferecer sessões de relaxamento e massagem
- Compartilhar experiências pessoais com OE
- Recomendar ingestão (se certificado)
- Criar blends personalizados para o cliente

### ❌ O que NÃO PODE fazer

- Diagnosticar doenças
- Prescrever tratamento médico
- Afirmar que óleos "curam" doenças
- Substituir medicação prescrita
- Garantir resultados específicos

> **Frase segura:** "Óleos essenciais podem auxiliar no seu bem-estar e complementar o tratamento médico. Eles não substituem orientação profissional de saúde."`,
        quiz: [
          {
            pergunta: "Um aromaterapeuta pode diagnosticar doenças?",
            opcoes: ["Sim, se certificado", "Sim, apenas alergias", "Não, nunca", "Depende da gravidade"],
            respostaCorreta: 2,
            explicacao: "Aromaterapeutas NUNCA devem diagnosticar doenças. Isso é atribuição exclusiva de profissionais de saúde habilitados."
          }
        ],
        checklist: [
          "Memorizo os 6 princípios éticos",
          "Sei exatamente o que posso e não posso fazer",
          "Pratico a frase segura em consultas",
          "Tenho rede de encaminhamento para médicos e psicólogos"
        ]
      },
      {
        titulo: "Modelos de Negócio em Aromaterapia",
        descricao: "Consultor, terapeuta, educador, criador de produtos e modelo híbrido",
        duracaoMinutos: 180,
        conteudo: `# Modelos de Negócio em Aromaterapia

## Os 5 Modelos

| Modelo | Investimento Inicial | Potencial de Retorno |
|---|---|---|
| **Consultor Independente** | Baixo (kit inicial) | Médio |
| **Terapeuta / Atendimento** | Médio (espaço + formação) | Alto |
| **Educador / Cursos** | Médio (conteúdo + plataforma) | Escalável |
| **Criador de Produtos** | Alto (insumos + regulamentação) | Muito alto |
| **Híbrido** | Variável | Estável e diversificado |

### 1. Consultor Independente
- Vende óleos e educa sobre uso
- Renda: comissões + bônus de equipe
- Ideal para: quem está começando

### 2. Terapeuta
- Atendimento em consultório ou domiciliar
- Renda: sessões (R$ 150-300 cada)
- Ideal para: quem tem formação em saúde/bem-estar

### 3. Educador
- Cursos presenciais e online
- Renda: turmas (R$ 200-500 por aluno)
- Ideal para: quem tem didática e conteúdo

### 4. Criador de Produtos
- Linha própria de cosméticos naturais
- Renda: venda de produtos (markup 3-5x)
- Ideal para: quem ama formular

### 5. Híbrido
- Combina 2 ou mais modelos
- Maior estabilidade financeira
- Ideal para: profissionais maduros

> **Recomendação:** Comece com 1 modelo, domine-o e depois diversifique. Evite tentar fazer tudo ao mesmo tempo.`,
        quiz: [
          {
            pergunta: "Qual modelo de negócio tem o maior potencial de escalabilidade?",
            opcoes: ["Consultor Independente", "Terapeuta", "Educador / Cursos", "Criador de Produtos"],
            respostaCorreta: 2,
            explicacao: "Educador/Cursos é o mais escalável porque você cria o conteúdo uma vez e pode vendê-lo repetidamente."
          }
        ],
        checklist: [
          "Identifiquei qual modelo é mais adequado ao meu perfil",
          "Fiz um plano de ação para os próximos 3 meses",
          "Calculei investimento inicial necessário",
          "Defini minha proposta de valor diferenciada"
        ]
      },
      {
        titulo: "Estratégias de Marketing e Crescimento",
        descricao: "Conteúdo educativo, prova social, eventos sensoriais e parcerias",
        duracaoMinutos: 180,
        conteudo: `# Estratégias de Marketing e Crescimento

## As 6 Estratégias-Chave

| Estratégia | Exemplo Prático |
|---|---|
| **Conteúdo Educativo** | "Como usar lavanda para dormir melhor" — posts e vídeos |
| **Prova Social** | Depoimentos de clientes, antes/depois |
| **Storytelling** | "Minha jornada com aromaterapia" — conexão emocional |
| **Demonstração Prática** | Técnica AromaTouch® ao vivo em eventos |
| **Parcerias Estratégicas** | Spas, clínicas, estúdios de yoga, nutricionistas |
| **Eventos Sensoriais** | Noite dos aromas, workshops de blends |

## Calendário de Conteúdo

### Semanal
- 2 posts educativos (dicas de óleos)
- 1 depoimento/resultado de cliente
- 3 stories interativos (enquetes, quizzes)

### Mensal
- 1 evento presencial ou live
- 1 parceria nova ativada
- 1 promoção especial

## Funil de Vendas

1. **Atração** → Conteúdo educativo gratuito
2. **Interesse** → Amostra grátis ou mini-sessão
3. **Decisão** → Consulta completa com diagnóstico
4. **Ação** → Sessão + kit de óleos para casa
5. **Fidelização** → Programa de manutenção mensal

> **A chave é EDUCAR, não vender.** Quando o cliente entende o valor, a venda acontece naturalmente.`,
        quiz: [
          {
            pergunta: "Qual a estratégia mais eficaz para fidelizar clientes?",
            opcoes: ["Descontos agressivos", "Conteúdo educativo + programa de manutenção", "Propaganda paga", "Mais óleos grátis"],
            respostaCorreta: 1,
            explicacao: "Educar o cliente e oferecer programa de manutenção mensal cria relacionamento duradouro."
          }
        ],
        checklist: [
          "Defini minhas 3 estratégias principais de marketing",
          "Criei meu primeiro calendário de conteúdo mensal",
          "Identifiquei pelo menos 3 parceiros estratégicos potenciais",
          "Montei meu funil de vendas completo",
          "Preparei 1 evento sensorial para o próximo mês"
        ]
      }
    ]
  }
];
