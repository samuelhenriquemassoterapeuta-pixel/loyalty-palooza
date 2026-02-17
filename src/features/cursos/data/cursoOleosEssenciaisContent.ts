import type { ModuloContent } from "@/features/cursos/data/cursoVendasContent";

export const cursoOleosEssenciaisData: ModuloContent[] = [
  // ═══════════════════════════════════════════════════════════
  // MÓDULO 1 — FUNDAÇÃO: O UNIVERSO DOS ÓLEOS ESSENCIAIS (10h · 4 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Fundação: O Universo dos Óleos Essenciais",
    descricao: "Definição, história, onde são encontrados, mercado e saídas profissionais",
    icone: "Lightbulb",
    cor: "from-amber-50 to-yellow-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "O que são Óleos Essenciais",
        descricao: "Definição técnica, características fundamentais e diferenças entre óleos essenciais e vegetais",
        duracaoMinutos: 150,
        conteudo: `# O que são Óleos Essenciais

## Definição Técnica

Óleos essenciais são compostos aromáticos voláteis extraídos de diferentes partes de plantas medicinais e aromáticas. São metabólitos secundários produzidos pelas plantas para proteção contra predadores, atração de polinizadores e adaptação ao ambiente.

## Características Fundamentais

- Líquidos voláteis à temperatura ambiente
- Geralmente insolúveis em água, solúveis em álcool e óleos
- Misturas complexas de 100 a 300 componentes químicos diferentes
- Extremamente concentrados (uma gota pode equivaler a várias xícaras de chá da planta)

## Óleos Essenciais vs. Óleos Vegetais

| Aspecto | Óleo Essencial | Óleo Vegetal |
|---|---|---|
| **Origem** | Metabólitos secundários | Metabólitos primários (sementes, frutos) |
| **Volatilidade** | Alta (evapora) | Baixa (não evapora) |
| **Aroma** | Intenso, característico | Suave ou neutro |
| **Composição** | Terpenos, fenóis, ésteres | Ácidos graxos, vitaminas |
| **Função** | Defesa, comunicação | Reserva energética |
| **Uso** | Aromaterapia, perfumaria | Cosméticos, culinária |

> Os óleos essenciais são verdadeiras obras-primas da natureza — concentrados aromáticos que capturam a essência vital das plantas.`,
        quiz: [
          {
            pergunta: "Qual a principal característica dos óleos essenciais em relação aos óleos vegetais?",
            opcoes: ["São mais baratos", "São voláteis e evaporam à temperatura ambiente", "São extraídos apenas de flores", "Possuem ácidos graxos"],
            respostaCorreta: 1,
            explicacao: "Óleos essenciais são voláteis, ou seja, evaporam à temperatura ambiente, diferente dos óleos vegetais que são estáveis."
          },
          {
            pergunta: "De quantos componentes químicos pode ser composto um óleo essencial?",
            opcoes: ["5 a 10", "20 a 50", "100 a 300", "Mais de 1000"],
            respostaCorreta: 2,
            explicacao: "Óleos essenciais são misturas complexas de 100 a 300 componentes químicos diferentes."
          }
        ],
        checklist: [
          "Compreendi a definição técnica de óleos essenciais",
          "Sei diferenciar óleo essencial de óleo vegetal",
          "Entendo as características fundamentais"
        ]
      },
      {
        titulo: "História da Extração de Óleos Essenciais",
        descricao: "Dos egípcios ao século XXI, evolução dos métodos de extração",
        duracaoMinutos: 120,
        conteudo: `# História da Extração de Óleos Essenciais

## Linha do Tempo

| Período | Civilização/Evento | Contribuição |
|---|---|---|
| **3000 a.C.** | Egípcios | Primeiros registros de destilação rudimentar |
| **980-1037 d.C.** | Avicena (médico árabe) | Invenção do alambique com serpentina de resfriamento |
| **Idade Média** | Europa | Desenvolvimento da destilação em mosteiros |
| **Século XVI** | Europa | Expansão da indústria de perfumaria em Grasse, França |
| **Século XIX** | Global | Avanços na química analítica e identificação de componentes |
| **Século XX** | Global | Desenvolvimento de métodos modernos de extração |
| **Século XXI** | Global | Resgate de métodos artesanais, certificações de pureza |

## Marcos Importantes

- **Avicena** revolucionou a destilação ao criar o sistema de resfriamento por serpentina, permitindo a condensação eficiente dos vapores
- **Grasse, França** tornou-se a capital mundial da perfumaria no século XVI, impulsionando a produção em escala
- O **século XXI** marca o retorno ao artesanal com foco em qualidade, rastreabilidade e certificações

> A história dos óleos essenciais é a história da humanidade buscando capturar e preservar os aromas da natureza.`,
        quiz: [
          {
            pergunta: "Quem inventou o alambique com serpentina de resfriamento?",
            opcoes: ["Hipócrates", "Avicena", "Leonardo da Vinci", "Pasteur"],
            respostaCorreta: 1,
            explicacao: "Avicena (980-1037 d.C.), médico árabe, inventou o alambique com serpentina de resfriamento, revolucionando a destilação."
          }
        ],
        checklist: [
          "Conheço a linha do tempo da extração de óleos essenciais",
          "Sei a importância de Avicena para a destilação",
          "Entendo a evolução dos métodos até o presente"
        ]
      },
      {
        titulo: "Onde os Óleos Essenciais são Encontrados nas Plantas",
        descricao: "Partes da planta, exemplos e concentração típica",
        duracaoMinutos: 120,
        conteudo: `# Onde os Óleos Essenciais são Encontrados nas Plantas

## Partes da Planta e Exemplos

| Parte da Planta | Exemplos | Concentração Típica |
|---|---|---|
| **Flores** | Lavanda, Rosa, Jasmim, Camomila | Baixa (muito material vegetal necessário) |
| **Folhas** | Hortelã, Alecrim, Eucalipto, Capim-limão | Média |
| **Cascas** | Canela, Cássia | Média |
| **Madeiras** | Cedro, Sândalo, Pau-rosa | Variável (depende da idade da árvore) |
| **Raízes** | Vetiver, Gengibre, Cúrcuma | Média a baixa |
| **Rizomas** | Gengibre, Cúrcuma | Média |
| **Sementes** | Erva-doce, Coentro, Noz-moscada | Média |
| **Frutos** | Laranja, Limão, Bergamota (cascas) | Alta (cítricos) |
| **Resinas** | Olíbano, Mirra, Benjoim | Extraída por incisão no tronco |

## Por que as Plantas Produzem Óleos Essenciais

- **Defesa contra predadores** — sabor e odor desagradável para insetos e herbívoros
- **Atração de polinizadores** — aromas que atraem abelhas, borboletas
- **Proteção contra patógenos** — propriedades antimicrobianas naturais
- **Adaptação climática** — proteção contra radiação UV e desidratação

> Cada parte da planta concentra compostos específicos, por isso o método de extração e a parte utilizada determinam o perfil do óleo essencial obtido.`,
        quiz: [
          {
            pergunta: "Qual parte da planta geralmente tem a maior concentração de óleo essencial?",
            opcoes: ["Flores", "Raízes", "Cascas de frutos cítricos", "Madeiras"],
            respostaCorreta: 2,
            explicacao: "Frutos cítricos (cascas) têm concentração alta de óleo essencial, sendo os mais fáceis de extrair."
          }
        ],
        checklist: [
          "Sei identificar as partes da planta que contêm óleos essenciais",
          "Entendo por que as plantas produzem óleos essenciais",
          "Conheço a relação entre parte da planta e concentração"
        ]
      },
      {
        titulo: "O Mercado de Óleos Essenciais e Saídas Profissionais",
        descricao: "Dados de mercado, oportunidades e carreiras na área",
        duracaoMinutos: 120,
        conteudo: `# O Mercado de Óleos Essenciais no Mundo

## Dados de Mercado

| Região | Dado | Oportunidade |
|---|---|---|
| **Reino Unido** | Indústria de produtos naturais cresce 12% ao ano | Demanda crescente por produtos naturais e sustentáveis |
| **Global** | 87% dos consumidores preferem produtos orgânicos e à base de plantas | Certificações orgânicas como diferencial |
| **Brasil** | Um dos maiores produtores de cítricos do mundo | Matéria-prima abundante para extração |

## Saídas Profissionais

| Profissão | Descrição |
|---|---|
| **Produtor de Óleos Essenciais** | Cultivo, colheita e extração artesanal ou industrial |
| **Formulador de Produtos Naturais** | Desenvolvimento de blends e produtos para bem-estar |
| **Aromaterapeuta** | Uso terapêutico de óleos essenciais |
| **Consultor em Sustentabilidade** | Assessoria para produção ética e sustentável |
| **Empreendedor** | Criação de marca própria no setor de bem-estar |

> O mercado de óleos essenciais está em franca expansão, oferecendo oportunidades para produtores artesanais, formuladores e empreendedores.`,
        quiz: [
          {
            pergunta: "Qual a vantagem do Brasil no mercado de óleos essenciais?",
            opcoes: ["Maior tecnologia de extração", "Um dos maiores produtores de cítricos do mundo", "Maior número de fábricas", "Menores custos de produção"],
            respostaCorreta: 1,
            explicacao: "O Brasil é um dos maiores produtores de cítricos do mundo, oferecendo matéria-prima abundante para extração."
          }
        ],
        checklist: [
          "Conheço os dados de mercado de óleos essenciais",
          "Sei as principais saídas profissionais",
          "Entendo as oportunidades do mercado brasileiro"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 2 — QUÍMICA DOS ÓLEOS ESSENCIAIS (12h · 4 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Química dos Óleos Essenciais",
    descricao: "Metabolismo vegetal, classes químicas, propriedades terapêuticas e fatores de composição",
    icone: "FlaskConical",
    cor: "from-blue-50 to-indigo-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Metabolismo Vegetal: Primário vs. Secundário",
        descricao: "Como as plantas produzem os compostos aromáticos",
        duracaoMinutos: 150,
        conteudo: `# Metabolismo Vegetal: Primário vs. Secundário

## Comparação

| Metabolismo | Função | Compostos |
|---|---|---|
| **Primário** | Crescimento, desenvolvimento, reprodução | Carboidratos, proteínas, lipídios |
| **Secundário** | Defesa, adaptação, interação com o ambiente | Terpenos, fenóis, alcaloides, flavonoides |

## Origem dos Óleos Essenciais

Os óleos essenciais são produzidos pelo metabolismo secundário das plantas. Embora não sejam essenciais para a sobrevivência básica da planta, desempenham papéis cruciais na:

- **Defesa** contra herbívoros e patógenos
- **Comunicação** entre plantas e polinizadores
- **Proteção** contra estresse ambiental (UV, seca, calor)
- **Competição** com outras plantas por recursos

> Os metabólitos secundários são o "sistema imunológico" e o "sistema de comunicação" das plantas — e são exatamente esses compostos que extraímos como óleos essenciais.`,
        quiz: [
          {
            pergunta: "De qual tipo de metabolismo vegetal são originados os óleos essenciais?",
            opcoes: ["Metabolismo primário", "Metabolismo secundário", "Metabolismo terciário", "Fotossíntese direta"],
            respostaCorreta: 1,
            explicacao: "Os óleos essenciais são produzidos pelo metabolismo secundário das plantas, responsável por defesa e adaptação."
          }
        ],
        checklist: [
          "Compreendi a diferença entre metabolismo primário e secundário",
          "Sei que óleos essenciais são metabólitos secundários",
          "Entendo as funções dos metabólitos secundários"
        ]
      },
      {
        titulo: "Principais Classes Químicas nos Óleos Essenciais",
        descricao: "Monoterpenos, sesquiterpenos, álcoois, ésteres, aldeídos, fenóis, óxidos e cetonas",
        duracaoMinutos: 180,
        conteudo: `# Principais Classes Químicas nos Óleos Essenciais

| Classe | Estrutura | Propriedades | Exemplos |
|---|---|---|---|
| **Monoterpenos** | C10H16 | Estimulantes, antivirais, anti-inflamatórios | Limoneno (laranja), Pineno (pinho) |
| **Sesquiterpenos** | C15H24 | Anti-inflamatórios, calmantes, regeneradores | Beta-cariofileno (cravo) |
| **Álcoois (Monoterpenóis)** | C10H17OH | Antissépticos suaves, imunoestimulantes | Linalol (lavanda), Geraniol (rosa) |
| **Ésteres** | R-COO-R' | Calmantes, antiespasmódicos, antifúngicos | Acetato de linalila (lavanda) |
| **Aldeídos** | R-CHO | Sedativos, antivirais, anti-inflamatórios | Citral (capim-limão), Cinamaldeído (canela) |
| **Fenóis** | C6H5-OH | Antibacterianos potentes, imunoestimulantes | Timol (tomilho), Carvacrol (orégano) |
| **Óxidos** | R-O-R' | Expectorantes, estimulantes respiratórios | 1,8-cineol (eucalipto) |
| **Cetonas** | R-CO-R' | Mucolíticas, cicatrizantes, neurotóxicas em excesso | Mentona (hortelã-pimenta) |
| **Cumarinas** | Derivados de benzopirona | Anticoagulantes, relaxantes | Cumarina (lavanda) |

> Conhecer as classes químicas permite prever propriedades terapêuticas e entender perfis de segurança de cada óleo.`,
        quiz: [
          {
            pergunta: "Qual classe química é a mais potente como antibacteriano?",
            opcoes: ["Monoterpenos", "Ésteres", "Fenóis", "Cumarinas"],
            respostaCorreta: 2,
            explicacao: "Os fenóis (como timol e carvacrol) são os antibacterianos mais potentes entre as classes dos óleos essenciais."
          },
          {
            pergunta: "Qual classe química deve ser usada com cautela por ser neurotóxica em excesso?",
            opcoes: ["Álcoois", "Ésteres", "Cetonas", "Monoterpenos"],
            respostaCorreta: 2,
            explicacao: "As cetonas podem ser neurotóxicas em excesso e devem ser usadas com cautela."
          }
        ],
        checklist: [
          "Conheço as 9 principais classes químicas",
          "Sei as propriedades de cada classe",
          "Entendo a relação entre estrutura e função"
        ]
      },
      {
        titulo: "Propriedades Terapêuticas por Classe Química",
        descricao: "Correlação entre classes químicas e aplicações terapêuticas",
        duracaoMinutos: 150,
        conteudo: `# Propriedades Terapêuticas por Classe Química

| Propriedade | Classes Responsáveis | Exemplos de Aplicação |
|---|---|---|
| **Analgésico** | Ésteres, alguns fenóis | Dores musculares, cefaleia |
| **Anti-inflamatório** | Sesquiterpenos, ésteres | Artrite, inflamações de pele |
| **Antibacteriano** | Fenóis, álcoois, aldeídos | Infecções, desinfecção |
| **Antifúngico** | Ésteres, fenóis | Candidíase, micoses |
| **Antiviral** | Monoterpenos, fenóis | Gripes, resfriados |
| **Expectorante** | Óxidos, cetonas | Congestão respiratória |
| **Sedativo** | Ésteres, alguns álcoois | Ansiedade, insônia |
| **Estimulante** | Monoterpenos, fenóis | Fadiga, falta de concentração |

## Aplicação Prática

Entender estas correlações permite:
- Selecionar o óleo certo para cada necessidade
- Criar blends sinérgicos com diferentes classes
- Prever possíveis efeitos colaterais
- Personalizar tratamentos de forma científica

> A quimiotipagem é a chave para a aromaterapia baseada em evidências.`,
        quiz: [
          {
            pergunta: "Quais classes químicas têm propriedades expectorantes?",
            opcoes: ["Monoterpenos e fenóis", "Óxidos e cetonas", "Ésteres e aldeídos", "Álcoois e cumarinas"],
            respostaCorreta: 1,
            explicacao: "Óxidos (como o 1,8-cineol do eucalipto) e cetonas têm propriedades expectorantes e mucolíticas."
          }
        ],
        checklist: [
          "Sei correlacionar classes químicas com propriedades terapêuticas",
          "Entendo como escolher óleos para cada necessidade",
          "Compreendo o conceito de sinergia entre classes"
        ]
      },
      {
        titulo: "Fatores que Influenciam a Composição Química",
        descricao: "Espécie, quimiotipo, solo, clima, colheita e método de extração",
        duracaoMinutos: 120,
        conteudo: `# Fatores que Influenciam a Composição Química

| Fator | Influência |
|---|---|
| **Espécie botânica** | Cada espécie tem perfil químico característico |
| **Quimiotipo** | Variedade química dentro da mesma espécie (ex: tomilho com timol ou linalol) |
| **Solo e clima** | Nutrientes, altitude, pluviosidade afetam a produção de metabólitos |
| **Época de colheita** | Momento ideal para cada planta (antes/durante/após floração) |
| **Horário da colheita** | Concentração varia ao longo do dia |
| **Método de extração** | Diferentes métodos extraem diferentes perfis de compostos |

## O Conceito de Quimiotipo

O quimiotipo (QT) é a variação química dentro da mesma espécie botânica. Por exemplo, o Tomilho (*Thymus vulgaris*) pode apresentar:

- **QT Timol** — antibacteriano potente, dermocáustico
- **QT Linalol** — suave, seguro para crianças
- **QT Tujanol** — hepatoprotetor

> Mesma planta, mesma espécie — composições químicas e propriedades completamente diferentes!`,
        quiz: [
          {
            pergunta: "O que é um quimiotipo?",
            opcoes: ["Uma espécie diferente de planta", "Uma variação química dentro da mesma espécie", "Um método de extração", "Um tipo de análise laboratorial"],
            respostaCorreta: 1,
            explicacao: "Quimiotipo é a variação química dentro da mesma espécie botânica, resultando em óleos com propriedades diferentes."
          }
        ],
        checklist: [
          "Entendo os fatores que afetam a composição dos óleos",
          "Sei o que é quimiotipo e sua importância",
          "Compreendo como cada fator influencia o perfil químico"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 3 — MATÉRIAS-PRIMAS E PREPARAÇÃO (10h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Matérias-Primas e Preparação",
    descricao: "Principais plantas aromáticas, cultivo, colheita, secagem e armazenamento",
    icone: "Sprout",
    cor: "from-green-50 to-emerald-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Principais Plantas Aromáticas para Extração",
        descricao: "Famílias botânicas, gêneros, partes utilizadas e óleos obtidos",
        duracaoMinutos: 150,
        conteudo: `# Principais Plantas Aromáticas para Extração

| Família | Gêneros/Espécies | Parte Utilizada | Óleo Obtido |
|---|---|---|---|
| **Lamiaceae** | Lavandula, Rosmarinus, Mentha, Thymus, Salvia, Origanum | Folhas, flores | Lavanda, Alecrim, Hortelã, Tomilho |
| **Myrtaceae** | Eucalyptus, Melaleuca | Folhas | Eucalipto, Tea Tree |
| **Rutaceae** | Citrus | Cascas dos frutos | Laranja, Limão, Bergamota |
| **Apiaceae** | Coriandrum, Foeniculum, Pimpinella | Sementes, frutos | Coentro, Erva-doce |
| **Asteraceae** | Matricaria, Tanacetum | Flores | Camomila, Tanaceto |
| **Poaceae** | Cymbopogon | Folhas | Capim-limão, Citronela, Palmarosa |
| **Rosaceae** | Rosa | Pétalas | Rosa |
| **Oleaceae** | Jasminum | Flores | Jasmim (absoluto) |
| **Pinaceae** | Pinus, Abies | Agulhas, madeira | Pinho, Abeto |
| **Burseraceae** | Boswellia, Commiphora | Resina | Olíbano, Mirra |
| **Zingiberaceae** | Zingiber, Curcuma | Rizomas | Gengibre, Cúrcuma |

> Conhecer as famílias botânicas ajuda a prever rendimentos, escolher métodos de extração e planejar cultivos.`,
        quiz: [
          {
            pergunta: "Qual família botânica fornece lavanda, alecrim, hortelã e tomilho?",
            opcoes: ["Myrtaceae", "Lamiaceae", "Rutaceae", "Asteraceae"],
            respostaCorreta: 1,
            explicacao: "A família Lamiaceae é uma das mais ricas em plantas aromáticas, fornecendo lavanda, alecrim, hortelã e tomilho."
          }
        ],
        checklist: [
          "Conheço as principais famílias de plantas aromáticas",
          "Sei quais partes são utilizadas para cada tipo",
          "Identifico os óleos obtidos de cada família"
        ]
      },
      {
        titulo: "Cultivo e Colheita",
        descricao: "Condições ideais de cultivo e época de colheita para cada tipo de planta",
        duracaoMinutos: 120,
        conteudo: `# Cultivo e Colheita

## Condições Ideais de Cultivo

| Fator | Recomendação |
|---|---|
| **Solo** | Bem drenado, adequado para cada espécie |
| **Clima** | Espécie-específico (mediterrâneo, tropical, temperado) |
| **Irrigação** | Controlada, sem encharcamento |
| **Adubação** | Preferencialmente orgânica |
| **Controle de pragas** | Manejo integrado, evitar agrotóxicos |

## Época de Colheita

| Tipo de Planta | Época Ideal |
|---|---|
| **Folhas (aromáticas)** | Antes da floração (pico de óleos essenciais) |
| **Flores** | Início da floração |
| **Frutos cítricos** | Maduros |
| **Sementes** | Maduras |
| **Raízes/Rizomas** | Outono/Inverno |
| **Madeiras** | Árvores maduras (manejo sustentável) |

> O momento da colheita é crucial — colher na hora errada pode reduzir o rendimento em até 50%.`,
        quiz: [
          {
            pergunta: "Quando é a melhor época para colher folhas aromáticas para extração?",
            opcoes: ["Após a floração", "Antes da floração", "Durante o inverno", "Qualquer época"],
            respostaCorreta: 1,
            explicacao: "Folhas aromáticas devem ser colhidas antes da floração, quando a concentração de óleos essenciais está no pico."
          }
        ],
        checklist: [
          "Conheço as condições ideais de cultivo",
          "Sei a época ideal de colheita para cada tipo de planta",
          "Entendo a importância do momento correto da colheita"
        ]
      },
      {
        titulo: "Pós-Colheita: Secagem e Armazenamento",
        descricao: "Métodos de secagem e boas práticas de armazenamento da matéria-prima",
        duracaoMinutos: 120,
        conteudo: `# Pós-Colheita: Secagem e Armazenamento

## Métodos de Secagem

| Método | Temperatura | Indicação |
|---|---|---|
| **Sombra e arejamento** | Ambiente | Plantas delicadas (flores, folhas finas) |
| **Estufa ventilada** | 30-40°C | Folhas mais espessas, ervas |
| **Estufa com aquecimento** | 40-50°C | Raízes, cascas, sementes |

## Armazenamento da Matéria-Prima

| Fator | Recomendação |
|---|---|
| **Recipiente** | Sacos de papel, caixas de madeira, sacos de tecido natural |
| **Local** | Fresco, seco, escuro, ventilado |
| **Umidade** | Abaixo de 60% |
| **Temperatura** | 15-25°C |
| **Identificação** | Espécie, data de colheita, lote, local de origem |

> Uma secagem e armazenamento adequados preservam os compostos voláteis e garantem a qualidade do óleo essencial extraído.`,
        quiz: [
          {
            pergunta: "Qual o método de secagem indicado para flores e folhas delicadas?",
            opcoes: ["Estufa a 50°C", "Sombra e arejamento", "Exposição ao sol direto", "Micro-ondas"],
            respostaCorreta: 1,
            explicacao: "Flores e folhas delicadas devem ser secas à sombra, com arejamento, para preservar os compostos voláteis."
          }
        ],
        checklist: [
          "Conheço os métodos de secagem para cada tipo de planta",
          "Sei as boas práticas de armazenamento",
          "Entendo a importância da identificação do material"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 4 — MÉTODOS DE EXTRAÇÃO - VISÃO GERAL (8h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Métodos de Extração - Visão Geral",
    descricao: "Classificação e comparação entre todos os métodos de extração",
    icone: "Filter",
    cor: "from-purple-50 to-violet-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Classificação dos Métodos de Extração",
        descricao: "Destilação, prensagem, solventes, enfleurage e métodos modernos",
        duracaoMinutos: 150,
        conteudo: `# Classificação dos Métodos de Extração

| Categoria | Métodos | Princípio |
|---|---|---|
| **Destilação** | Hidrodestilação, Destilação a vapor, Destilação seca | Separação por volatilidade com vapor d'água |
| **Prensagem** | Expressão a frio | Pressão mecânica (cítricos) |
| **Extrações com solventes** | Solventes voláteis, CO2 supercrítico | Solubilização dos compostos |
| **Enfleurage** | Gordura fria | Absorção em gordura (flores delicadas) |
| **Métodos modernos** | Micro-ondas (VMHD, ESAM), ultrassom | Aceleração por energia |

> A escolha do método depende da planta, do produto desejado, da escala de produção e do investimento disponível.`,
        quiz: [
          {
            pergunta: "Qual o princípio da destilação para extração de óleos essenciais?",
            opcoes: ["Pressão mecânica", "Separação por volatilidade com vapor d'água", "Dissolução em gordura", "Radiação eletromagnética"],
            respostaCorreta: 1,
            explicacao: "A destilação separa os compostos voláteis dos óleos essenciais utilizando vapor d'água como veículo."
          }
        ],
        checklist: [
          "Conheço as principais categorias de métodos de extração",
          "Sei o princípio de cada categoria",
          "Entendo quando usar cada método"
        ]
      },
      {
        titulo: "Comparação entre Métodos de Extração",
        descricao: "Rendimento, custo, pureza e indicação de cada método",
        duracaoMinutos: 150,
        conteudo: `# Comparação entre Métodos de Extração

| Método | Rendimento | Custo | Pureza | Indicação |
|---|---|---|---|---|
| **Destilação a vapor** | Médio | Médio | Alta | 90% dos óleos essenciais |
| **Prensagem a frio** | Alto | Baixo | Alta | Frutas cítricas |
| **Solventes orgânicos** | Alto | Médio | Média (resíduos) | Absolutos (flores delicadas) |
| **CO2 supercrítico** | Alto | Alto | Altíssima | Produtos premium, termosensíveis |
| **Enfleurage** | Muito baixo | Altíssimo | Altíssima | Flores extremamente delicadas (raro) |

## Como Escolher o Método

1. **Planta** — Qual material vegetal será processado?
2. **Produto** — Óleo essencial puro, absoluto, hidrolato?
3. **Escala** — Artesanal, semi-profissional ou industrial?
4. **Investimento** — Qual o orçamento disponível?
5. **Qualidade** — Qual nível de pureza é necessário?

> A destilação a vapor é responsável por 90% de toda a produção mundial de óleos essenciais.`,
        quiz: [
          {
            pergunta: "Qual método é responsável por 90% da produção mundial de óleos essenciais?",
            opcoes: ["Prensagem a frio", "CO2 supercrítico", "Destilação a vapor", "Enfleurage"],
            respostaCorreta: 2,
            explicacao: "A destilação a vapor é o método mais utilizado, respondendo por 90% da produção mundial de óleos essenciais."
          }
        ],
        checklist: [
          "Sei comparar rendimento, custo e pureza de cada método",
          "Entendo os critérios para escolher o método adequado",
          "Conheço o método mais utilizado mundialmente"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 5 — DESTILAÇÃO - TEORIA E PRÁTICA (20h · 4 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Destilação - Teoria e Prática",
    descricao: "Princípios, tipos de destilação, componentes do alambique, passo a passo e rendimento",
    icone: "Flame",
    cor: "from-orange-50 to-red-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Princípios da Destilação e Tipos",
        descricao: "Conceitos fundamentais, destilação por arraste a vapor e hidrodestilação",
        duracaoMinutos: 180,
        conteudo: `# Princípios da Destilação

## Conceitos Fundamentais

| Conceito | Definição |
|---|---|
| **Volatilidade** | Capacidade de uma substância evaporar à temperatura ambiente |
| **Ponto de ebulição** | Temperatura em que a pressão de vapor iguala a pressão atmosférica |
| **Arraste a vapor** | Óleos essenciais são imiscíveis em água e destilam em temperaturas mais baixas que seu ponto de ebulição |
| **Hidrodifusão** | Processo de difusão do óleo através das paredes celulares da planta |

## Tipos de Destilação

### Destilação por Arraste a Vapor (Steam Distillation)

| Característica | Descrição |
|---|---|
| **Processo** | Vapor gerado separadamente passa pelo material vegetal |
| **Vantagens** | Controle de temperatura, menor degradação |
| **Indicação** | Plantas resistentes, produção em escala |

### Hidrodestilação (Hydrodistillation)

| Característica | Descrição |
|---|---|
| **Processo** | Material vegetal imerso em água, aquecido diretamente |
| **Vantagens** | Simples, equipamento básico |
| **Desvantagens** | Maior risco de degradação térmica |
| **Indicação** | Produção artesanal, plantas delicadas |

> O arraste a vapor é o método preferido profissionalmente, pois permite controle preciso de temperatura e menor degradação dos compostos.`,
        quiz: [
          {
            pergunta: "Qual a vantagem da destilação por arraste a vapor sobre a hidrodestilação?",
            opcoes: ["É mais barata", "Permite controle de temperatura e menor degradação", "Usa menos água", "É mais rápida"],
            respostaCorreta: 1,
            explicacao: "A destilação por arraste a vapor permite controle de temperatura e causa menor degradação térmica dos compostos."
          }
        ],
        checklist: [
          "Compreendi os conceitos fundamentais da destilação",
          "Sei diferenciar destilação a vapor de hidrodestilação",
          "Entendo as indicações de cada tipo"
        ]
      },
      {
        titulo: "Componentes do Alambique e Montagem",
        descricao: "Caldeira, condensador, essenciador e funcionamento do sistema",
        duracaoMinutos: 150,
        conteudo: `# Componentes de um Alambique

## Esquema do Sistema

\`\`\`
CALDEIRA → CONDENSADOR → ESSENCIADOR
(vapor + óleo)  (resfriamento)   (separação)
                                  ↓
                            ÓLEO + HIDROLATO
\`\`\`

## Componentes e Funções

| Componente | Função | Características |
|---|---|---|
| **Caldeira** | Aquecer água e/ou material vegetal | Inox, cobre ou aço; tamanho variável |
| **Condensador** | Resfriar o vapor, condensar líquido | Serpentina em tanque de água fria |
| **Essenciador (vaso florentino)** | Separar óleo essencial da água (hidrolato) | Baseado na diferença de densidade |

## Materiais do Alambique

- **Cobre** — Excelente condução térmica, reage com compostos sulfurados melhorando a qualidade
- **Inox** — Durável, fácil limpeza, mais acessível
- **Misto** — Corpo em inox com coluna e condensador em cobre (melhor custo-benefício)

> O essenciador é a peça-chave para separar o óleo essencial do hidrolato — funciona pela diferença de densidade entre os dois líquidos.`,
        quiz: [
          {
            pergunta: "Qual a função do essenciador (vaso florentino)?",
            opcoes: ["Aquecer a água", "Resfriar o vapor", "Separar óleo essencial do hidrolato", "Filtrar impurezas"],
            respostaCorreta: 2,
            explicacao: "O essenciador separa o óleo essencial do hidrolato baseado na diferença de densidade entre os dois líquidos."
          }
        ],
        checklist: [
          "Conheço os 3 componentes principais do alambique",
          "Sei a função de cada componente",
          "Entendo os materiais e suas vantagens"
        ]
      },
      {
        titulo: "Passo a Passo da Destilação",
        descricao: "Do preparo do material à coleta e envase do óleo essencial",
        duracaoMinutos: 180,
        conteudo: `# Passo a Passo da Destilação

| Etapa | Descrição | Parâmetros Críticos |
|---|---|---|
| **1. Preparo do material** | Triturar ou cortar para expor superfície | Tamanho uniforme |
| **2. Carga do alambique** | Dispor material na cesta ou na água | Não compactar demais |
| **3. Aquecimento** | Iniciar aquecimento, gerar vapor | Controle de temperatura |
| **4. Destilação** | Vapor arrasta óleos, condensa | Duração variável (1-4h ou mais) |
| **5. Separação** | Óleo flutua ou afunda, separar no essenciador | Densidade do óleo |
| **6. Coleta** | Óleo essencial + hidrolato | Rendimento monitorado |
| **7. Filtragem** | Remover impurezas | Filtro de papel ou algodão |
| **8. Envase** | Armazenar em frasco âmbar | Proteger da luz |

## Dicas Práticas

- **Não compactar** o material — o vapor precisa circular livremente
- **Controlar a temperatura** — superaquecimento degrada compostos
- **Monitorar o condensado** — se sair quente, aumentar o resfriamento
- **Ser paciente** — destilações longas podem extrair mais compostos

> A qualidade do óleo depende tanto da matéria-prima quanto da condução cuidadosa de cada etapa do processo.`,
        quiz: [
          {
            pergunta: "Por que não se deve compactar o material vegetal no alambique?",
            opcoes: ["Para pesar menos", "Para o vapor circular livremente", "Para facilitar a retirada", "Para evitar ferrugem"],
            respostaCorreta: 1,
            explicacao: "O material não deve ser compactado para que o vapor circule livremente e extraia os óleos essenciais de forma uniforme."
          }
        ],
        checklist: [
          "Sei as 8 etapas da destilação",
          "Conheço os parâmetros críticos de cada etapa",
          "Entendo as dicas práticas para melhor rendimento"
        ]
      },
      {
        titulo: "Rendimento, Eficiência e Problemas Comuns",
        descricao: "Tabela de rendimentos por planta e solução de problemas na destilação",
        duracaoMinutos: 150,
        conteudo: `# Rendimento e Eficiência

## Rendimento por Planta

| Planta | Rendimento Típico | Material Necessário para 10ml |
|---|---|---|
| **Lavanda** | 1.5-2.5% | 400-600g |
| **Rosa** | 0.02-0.05% | 20-50kg |
| **Eucalipto** | 1-3% | 300g-1kg |
| **Laranja (casca)** | 0.5-1% | 1-2kg |
| **Cravo (botão)** | 15-20% | 50-70g |
| **Camomila** | 0.3-0.5% | 2-3kg |

## Problemas Comuns e Soluções

| Problema | Causa | Solução |
|---|---|---|
| **Baixo rendimento** | Material velho, compactação, tempo insuficiente | Usar material fresco, não compactar, destilar por mais tempo |
| **Óleo queimado** | Superaquecimento, contato direto com fonte de calor | Usar arraste a vapor, não deixar material encostar no fundo |
| **Hidrolato turvo** | Contaminação, emulsificação | Filtrar, destilar com cuidado |
| **Óleo com água** | Separação inadequada | Repousar, separar novamente |

> A rosa é uma das plantas com menor rendimento — são necessários 20 a 50 kg de pétalas para obter apenas 10ml de óleo essencial!`,
        quiz: [
          {
            pergunta: "Qual planta tem o maior rendimento de óleo essencial?",
            opcoes: ["Rosa", "Lavanda", "Cravo (botão)", "Eucalipto"],
            respostaCorreta: 2,
            explicacao: "O cravo (botão) tem rendimento de 15-20%, sendo uma das plantas com maior concentração de óleo essencial."
          }
        ],
        checklist: [
          "Conheço os rendimentos típicos das principais plantas",
          "Sei diagnosticar problemas comuns na destilação",
          "Entendo as soluções para cada problema"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 6 — PRENSAGEM A FRIO (8h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Prensagem a Frio (Cítricos)",
    descricao: "Extração mecânica de óleos essenciais cítricos, métodos artesanais e fotossensibilidade",
    icone: "Citrus",
    cor: "from-yellow-50 to-orange-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Princípio e Métodos de Prensagem a Frio",
        descricao: "Processo mecânico para cítricos, métodos artesanais e industriais",
        duracaoMinutos: 150,
        conteudo: `# Prensagem a Frio (Cítricos)

## Princípio

Processo mecânico utilizado para extrair óleos essenciais das cascas de frutas cítricas. Não envolve calor, preservando integralmente os compostos voláteis.

**Aplica-se a:** Laranja, Limão, Bergamota, Toranja, Tangerina, Lima

## Métodos de Extração

| Método | Descrição | Escala |
|---|---|---|
| **Esponja (manual)** | Cascas são pressionadas contra esponja que absorve óleo | Artesanal |
| **Raspagem** | Cascas são raspadas para liberar óleo | Artesanal |
| **Prensa hidráulica** | Prensagem mecânica das cascas | Industrial |
| **Máquina raspadora** | Cítricos inteiros são raspados para liberar óleo | Industrial |

## Passo a Passo Artesanal

| Etapa | Descrição |
|---|---|
| **1. Seleção dos frutos** | Orgânicos, sem agrotóxicos, maduros |
| **2. Higienização** | Lavar bem as cascas |
| **3. Extração manual** | Ralar a casca ou pressionar contra esponja |
| **4. Coleta do óleo** | Recolher o líquido extraído |
| **5. Filtragem** | Remover resíduos sólidos |
| **6. Separação** | Decantar para separar óleo da água |
| **7. Envase** | Frascos âmbar, proteger da luz |

> A prensagem a frio é o método mais simples e acessível — qualquer pessoa pode extrair óleo essencial de cítricos em casa!`,
        quiz: [
          {
            pergunta: "Por que a prensagem a frio é indicada para cítricos?",
            opcoes: ["Porque é mais barata", "Porque não envolve calor, preservando os compostos voláteis", "Porque os cítricos não podem ser destilados", "Porque produz mais óleo"],
            respostaCorreta: 1,
            explicacao: "A prensagem a frio preserva integralmente os compostos voláteis por não utilizar calor no processo."
          }
        ],
        checklist: [
          "Entendo o princípio da prensagem a frio",
          "Conheço os métodos artesanais e industriais",
          "Sei fazer extração artesanal passo a passo"
        ]
      },
      {
        titulo: "Fotossensibilidade e Cuidados com Óleos Cítricos",
        descricao: "Riscos da exposição solar, óleos fotossensíveis e precauções",
        duracaoMinutos: 120,
        conteudo: `# Fotossensibilidade dos Óleos Cítricos

## Informações Importantes

| Aspecto | Informação |
|---|---|
| **Causa** | Presença de bergapteno e outros furanocumarinas |
| **Efeito** | Manchas na pele se exposta ao sol após aplicação tópica |
| **Precaução** | Não usar em pele antes de exposição solar |
| **Óleos de risco** | Bergamota, Limão, Toranja, Tangerina (prensados a frio) |

## Como Minimizar Riscos

- Aguardar no mínimo **12 horas** antes de exposição solar
- Usar versões **sem furanocumarinas** (FCF - Furocoumarin Free)
- Preferir uso em **difusores** ao invés de aplicação tópica
- Informar o consumidor sobre os riscos na **rotulagem**

> A fotossensibilidade é exclusiva de óleos cítricos extraídos por prensagem a frio — óleos destilados não apresentam esse risco.`,
        quiz: [
          {
            pergunta: "Qual substância causa a fotossensibilidade dos óleos cítricos?",
            opcoes: ["Limoneno", "Bergapteno e furanocumarinas", "Vitamina C", "Ácido cítrico"],
            respostaCorreta: 1,
            explicacao: "O bergapteno e outras furanocumarinas presentes nos óleos cítricos causam fotossensibilidade na pele."
          }
        ],
        checklist: [
          "Sei o que é fotossensibilidade",
          "Conheço os óleos com maior risco",
          "Entendo as precauções necessárias"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 7 — EXTRAÇÃO COM SOLVENTES E CO2 (12h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Extração com Solventes e CO2 Supercrítico",
    descricao: "Concretos, absolutos e extração com CO2 supercrítico para produtos premium",
    icone: "Beaker",
    cor: "from-cyan-50 to-teal-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Extração com Solventes Orgânicos",
        descricao: "Concretos, absolutos e plantas extraídas por solventes",
        duracaoMinutos: 180,
        conteudo: `# Extração com Solventes Orgânicos

## Produtos Obtidos

- **Concreto:** Mistura de cera, pigmentos e óleo essencial
- **Absoluto:** Concreto purificado com etanol, produto final altamente concentrado

## Plantas Extraídas por Solventes

| Planta | Produto | Uso |
|---|---|---|
| **Jasmim** | Absoluto | Perfumaria fina |
| **Rosa** | Absoluto | Perfumaria fina |
| **Tuberosa** | Absoluto | Perfumaria fina |
| **Baunilha** | Absoluto | Perfumaria, alimentício |
| **Violeta** | Absoluto | Perfumaria |

## Processo

1. Material vegetal + solvente orgânico (hexano)
2. Solvente dissolve os compostos aromáticos
3. Solvente evaporado → **Concreto** (massa cerosa)
4. Concreto lavado com etanol
5. Etanol evaporado → **Absoluto** (líquido concentrado)

> Absolutos são mais concentrados e complexos que óleos essenciais destilados, porém podem conter traços de solvente.`,
        quiz: [
          {
            pergunta: "Qual a diferença entre concreto e absoluto?",
            opcoes: ["São a mesma coisa", "O absoluto é o concreto purificado com etanol", "O concreto é mais puro", "O absoluto usa mais solvente"],
            respostaCorreta: 1,
            explicacao: "O absoluto é obtido a partir da purificação do concreto com etanol, resultando num produto mais concentrado."
          }
        ],
        checklist: [
          "Sei a diferença entre concreto e absoluto",
          "Conheço as plantas que exigem extração por solventes",
          "Entendo o processo de extração"
        ]
      },
      {
        titulo: "Extração com CO2 Supercrítico",
        descricao: "Tecnologia de ponta para extratos puros e sem resíduos",
        duracaoMinutos: 180,
        conteudo: `# Extração com CO2 Supercrítico

## Características

| Aspecto | Descrição |
|---|---|
| **Temperatura** | Baixa (31-50°C) - preserva compostos termosensíveis |
| **Solvente** | CO2, não tóxico, não inflamável |
| **Seletividade** | Ajustável por pressão e temperatura |
| **Produto final** | Extrato puro, sem resíduos de solvente |
| **Custo** | Equipamento caro, operação especializada |

## Vantagens sobre Outros Métodos

- **Zero resíduos** — CO2 evapora completamente
- **Baixa temperatura** — preserva compostos termosensíveis
- **Seletividade** — pode-se ajustar para extrair compostos específicos
- **Produto premium** — qualidade superior, justifica preço mais alto

## Desvantagens

- Equipamento de alto custo (pressões de 100-400 atm)
- Requer operadores especializados
- Inviável para produção artesanal

> O CO2 supercrítico produz os extratos de maior qualidade no mercado, sendo o padrão para óleos premium e farmacêuticos.`,
        quiz: [
          {
            pergunta: "Qual a principal vantagem do CO2 supercrítico como solvente?",
            opcoes: ["É o mais barato", "É não tóxico e não deixa resíduos no produto final", "É o mais rápido", "Funciona com qualquer planta"],
            respostaCorreta: 1,
            explicacao: "O CO2 é não tóxico, não inflamável e evapora completamente, não deixando nenhum resíduo no produto final."
          }
        ],
        checklist: [
          "Entendo o que é CO2 supercrítico",
          "Conheço as vantagens e desvantagens do método",
          "Sei quando este método é indicado"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 8 — ENFLEURAGE E MÉTODOS TRADICIONAIS (6h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Enfleurage e Métodos Tradicionais",
    descricao: "Enfleurage a frio e quente, maceração e métodos históricos de extração",
    icone: "Flower2",
    cor: "from-pink-50 to-rose-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Enfleurage: A Arte da Extração por Gordura",
        descricao: "Processo tradicional de extração para flores delicadas",
        duracaoMinutos: 120,
        conteudo: `# Enfleurage

## Processo Tradicional

| Etapa | Descrição |
|---|---|
| **1. Preparação das chapas** | Chapas de vidro cobertas com gordura purificada |
| **2. Colheita das flores** | Flores frescas colhidas de madrugada |
| **3. Disposição** | Flores pressionadas sobre a gordura |
| **4. Maceração** | Gordura absorve o aroma (24-72h) |
| **5. Troca** | Flores velhas removidas, novas adicionadas |
| **6. Repetição** | Processo repetido até gordura saturada (20-30 ciclos) |
| **7. Extração** | Gordura aromática lavada com álcool |
| **8. Absoluto** | Álcool evaporado, obtém-se o absoluto |

## Características

- Método mais antigo e artesanal de extração
- Usado para flores extremamente delicadas (jasmim, tuberosa)
- Rendimento muito baixo, custo altíssimo
- Praticado em Grasse, França, desde o século XVI
- Hoje é raramente usado comercialmente, substituído por solventes

> O enfleurage é a poesia da extração — um processo lento, delicado e artesanal que captura a alma das flores mais preciosas.`,
        quiz: [
          {
            pergunta: "Quantos ciclos de troca de flores são necessários no enfleurage?",
            opcoes: ["5-10 ciclos", "20-30 ciclos", "1-2 ciclos", "50-100 ciclos"],
            respostaCorreta: 1,
            explicacao: "O enfleurage requer 20-30 ciclos de troca de flores até que a gordura esteja saturada de aroma."
          }
        ],
        checklist: [
          "Conheço as 8 etapas do enfleurage",
          "Sei para quais plantas é indicado",
          "Entendo por que é raramente usado hoje"
        ]
      },
      {
        titulo: "Maceração e Outros Métodos Tradicionais",
        descricao: "Maceração a frio e a quente, óleos infusionados",
        duracaoMinutos: 120,
        conteudo: `# Maceração e Métodos Tradicionais

## Maceração

| Aspecto | Descrição |
|---|---|
| **Processo** | Material vegetal imerso em óleo vegetal por período prolongado |
| **Aquecimento** | Pode ser a frio (solar) ou a quente (banho-maria) |
| **Produto** | Óleo vegetal aromatizado (não óleo essencial puro) |
| **Exemplos** | Óleo de hipericão (erva de São João), óleo de calêndula |

## Diferença entre Maceração e Destilação

| Aspecto | Maceração | Destilação |
|---|---|---|
| **Produto** | Óleo vegetal infusionado | Óleo essencial puro |
| **Concentração** | Baixa | Alta |
| **Processo** | Simples, sem equipamento | Requer alambique |
| **Uso** | Massagem, cosméticos | Aromaterapia, perfumaria |

> A maceração é o método mais acessível para iniciantes — basta ter a planta, um óleo vegetal de qualidade e paciência!`,
        quiz: [
          {
            pergunta: "Qual o produto final da maceração?",
            opcoes: ["Óleo essencial puro", "Óleo vegetal aromatizado", "Hidrolato", "Absoluto"],
            respostaCorreta: 1,
            explicacao: "A maceração produz um óleo vegetal aromatizado, não um óleo essencial puro como a destilação."
          }
        ],
        checklist: [
          "Sei a diferença entre maceração e destilação",
          "Conheço os tipos de maceração (fria e quente)",
          "Entendo as aplicações dos óleos macerados"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 9 — CONTROLE DE QUALIDADE E ANÁLISE (12h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Controle de Qualidade e Análise",
    descricao: "Parâmetros de qualidade, análise instrumental (GC, GC-MS) e detecção de adulterações",
    icone: "SearchCheck",
    cor: "from-emerald-50 to-teal-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Importância e Parâmetros de Qualidade",
        descricao: "Por que controlar qualidade e quais parâmetros avaliar",
        duracaoMinutos: 150,
        conteudo: `# Controle de Qualidade

## Por que Controlar Qualidade

| Razão | Importância |
|---|---|
| **Segurança do consumidor** | Evitar adulterações e contaminantes |
| **Eficácia terapêutica** | Garantir presença dos princípios ativos |
| **Conformidade regulatória** | Atender normas nacionais e internacionais |
| **Credibilidade** | Construir confiança com clientes |
| **Precificação** | Produto de qualidade justifica preço mais alto |

## Parâmetros de Qualidade

| Parâmetro | O que Avalia | Método |
|---|---|---|
| **Densidade** | Massa por volume | Densímetro, balança hidrostática |
| **Índice de refração** | Pureza, composição | Refratômetro |
| **Rotação óptica** | Atividade óptica dos compostos | Polarímetro |
| **Miscibilidade** | Solubilidade em álcool | Teste de solubilidade |
| **Índice de acidez** | Ácidos livres | Titulação |
| **Índice de ésteres** | Teor de ésteres | Titulação |
| **Resíduo de evaporação** | Compostos não voláteis | Evaporação controlada |

> Um óleo essencial de qualidade deve ser puro, natural, integral e rastreável — do campo ao frasco.`,
        quiz: [
          {
            pergunta: "Qual parâmetro avalia se o óleo essencial foi diluído com óleo vegetal?",
            opcoes: ["Índice de acidez", "Rotação óptica", "Resíduo de evaporação", "Miscibilidade"],
            respostaCorreta: 2,
            explicacao: "O resíduo de evaporação detecta compostos não voláteis (como óleo vegetal) que indicam diluição."
          }
        ],
        checklist: [
          "Entendo a importância do controle de qualidade",
          "Conheço os 7 principais parâmetros",
          "Sei quais métodos são usados para cada parâmetro"
        ]
      },
      {
        titulo: "Análise Instrumental: GC e GC-MS",
        descricao: "Cromatografia gasosa e espectrometria de massas aplicadas a óleos essenciais",
        duracaoMinutos: 150,
        conteudo: `# Análise Instrumental

## Técnicas Principais

| Técnica | Sigla | O que Analisa | Aplicação |
|---|---|---|---|
| **Cromatografia Gasosa** | GC | Perfil quantitativo de componentes | Identificação de adulterações, perfil químico |
| **Espectrometria de Massas** | MS | Identificação molecular de cada pico | Confirmação de compostos |
| **GC-MS** | GC-MS | Combinação das duas técnicas | Análise completa, padrão ouro |
| **Cromatografia bidimensional** | GCxGC | Separação de alta resolução | Amostras complexas |
| **Cromatografia quiral** | - | Separação de enantiômeros | Autenticidade, detecção de sintéticos |

## Como Funciona a GC-MS

1. **Injeção** — Pequena amostra é vaporizada
2. **Separação** — Componentes são separados na coluna cromatográfica
3. **Detecção** — Cada componente é identificado por massa molecular
4. **Resultado** — Cromatograma com perfil completo do óleo

> A GC-MS é o "padrão ouro" para análise de óleos essenciais — permite identificar e quantificar cada componente presente.`,
        quiz: [
          {
            pergunta: "Qual técnica é considerada o 'padrão ouro' para análise de óleos essenciais?",
            opcoes: ["Cromatografia líquida", "GC-MS", "Espectroscopia UV", "Titulação"],
            respostaCorreta: 1,
            explicacao: "A GC-MS (cromatografia gasosa acoplada a espectrometria de massas) é o padrão ouro para análise completa de óleos essenciais."
          }
        ],
        checklist: [
          "Conheço as principais técnicas de análise instrumental",
          "Sei o que é GC-MS e como funciona",
          "Entendo a importância da análise para autenticidade"
        ]
      },
      {
        titulo: "Adulterações Comuns e Como Detectar",
        descricao: "Tipos de adulterações e certificações de qualidade",
        duracaoMinutos: 120,
        conteudo: `# Adulterações Comuns

| Tipo de Adulteração | Descrição | Como Detectar |
|---|---|---|
| **Diluição** | Adição de óleo vegetal ou solvente | Densidade, resíduo de evaporação |
| **Estiramento** | Adição de componentes sintéticos | GC-MS, análise quiral |
| **Corte** | Mistura com óleos mais baratos | Perfil cromatográfico fora do padrão |
| **Reconstituição** | Recriação química do aroma | Falta de compostos traço, análise quiral |

## Certificações de Qualidade

- **ISO** — Padrões internacionais para óleos essenciais
- **Orgânico** — USDA, EU Organic, IBD (Brasil)
- **GC-MS** — Laudo de cromatografia obrigatório para produtos premium
- **Rastreabilidade** — Do campo ao frasco, com lotes identificados

> Estima-se que mais de 70% dos óleos essenciais no mercado são adulterados de alguma forma — saber identificar é essencial para o profissional.`,
        quiz: [
          {
            pergunta: "Qual tipo de adulteração é detectada pela análise quiral?",
            opcoes: ["Diluição com óleo vegetal", "Adição de componentes sintéticos", "Contaminação por fungos", "Oxidação"],
            respostaCorreta: 1,
            explicacao: "A análise quiral detecta componentes sintéticos, pois moléculas naturais e sintéticas têm rotações ópticas diferentes."
          }
        ],
        checklist: [
          "Conheço os 4 tipos principais de adulteração",
          "Sei como detectar cada tipo",
          "Entendo a importância das certificações"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 10 — HIDROLATOS (6h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Hidrolatos (Águas Aromáticas)",
    descricao: "Produção, propriedades e usos dos hidrolatos na cosmética e terapia",
    icone: "Droplets",
    cor: "from-sky-50 to-blue-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "O que são Hidrolatos e Como Produzir",
        descricao: "Definição, características e processo de produção",
        duracaoMinutos: 120,
        conteudo: `# Hidrolatos (Águas Aromáticas)

## O que são Hidrolatos

Hidrolatos (ou águas aromáticas) são o subproduto da destilação por arraste a vapor. Contêm compostos hidrossolúveis do óleo essencial e traços do óleo, resultando em uma água aromática com propriedades terapêuticas suaves.

## Características

- Aroma mais suave que o óleo essencial
- pH ligeiramente ácido
- Livre de álcool
- Seguro para uso em crianças, idosos e peles sensíveis
- Pode ser usado como tônico facial, compressas, sprays

## Produção

Os hidrolatos são obtidos automaticamente durante a destilação — são a água que sobra após a separação do óleo essencial no essenciador. Um hidrolato de qualidade requer:

- Destilação dedicada (não apenas subproduto)
- Proporção adequada planta/água
- Armazenamento refrigerado (sem conservantes)

> Hidrolatos são o "outro tesouro" da destilação — muitas vezes descartados, mas com enorme valor comercial e terapêutico.`,
        quiz: [
          {
            pergunta: "O que é um hidrolato?",
            opcoes: ["Um tipo de óleo essencial", "A água aromática obtida na destilação", "Um solvente químico", "Um óleo vegetal diluído"],
            respostaCorreta: 1,
            explicacao: "Hidrolatos são a água aromática obtida como subproduto da destilação, contendo compostos hidrossolúveis da planta."
          }
        ],
        checklist: [
          "Sei o que são hidrolatos",
          "Conheço suas características",
          "Entendo como são produzidos"
        ]
      },
      {
        titulo: "Principais Hidrolatos e Usos",
        descricao: "Hidrolatos mais populares, propriedades e aplicações",
        duracaoMinutos: 120,
        conteudo: `# Principais Hidrolatos e Usos

| Planta | Propriedades | Uso Principal |
|---|---|---|
| **Lavanda** | Calmante, anti-inflamatório | Tônico facial, compressas |
| **Rosa** | Adstringente suave, calmante | Tônico para peles sensíveis |
| **Camomila** | Calmante, anti-inflamatório | Bebês, olhos cansados |
| **Hortelã-pimenta** | Refrescante, estimulante | Sprays, pós-atividade física |
| **Hamamélis** | Adstringente, calmante | Peles oleosas, olheiras |

## Aplicações Comerciais

- **Cosmética** — Tônicos, brumas faciais, ingrediente de cremes
- **Terapia** — Compressas, banhos, inalação suave
- **Culinária** — Aromatização de sobremesas e bebidas (hidrolatos food grade)
- **Bebês e crianças** — Alternativa suave aos óleos essenciais
- **Pets** — Uso seguro em animais (com orientação)

> O mercado de hidrolatos cresce rapidamente — são acessíveis, versáteis e seguros, atraindo consumidores que buscam produtos naturais suaves.`,
        quiz: [
          {
            pergunta: "Qual hidrolato é indicado para peles sensíveis e bebês?",
            opcoes: ["Hortelã-pimenta", "Hamamélis", "Camomila", "Eucalipto"],
            respostaCorreta: 2,
            explicacao: "O hidrolato de camomila é calmante, anti-inflamatório e seguro para bebês e peles sensíveis."
          }
        ],
        checklist: [
          "Conheço os principais hidrolatos e suas propriedades",
          "Sei as aplicações comerciais",
          "Entendo o potencial de mercado"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 11 — ARMAZENAMENTO, CONSERVAÇÃO E SEGURANÇA (6h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Armazenamento, Conservação e Segurança",
    descricao: "Fatores de degradação, sinais de oxidação, precauções e contraindicações",
    icone: "ShieldCheck",
    cor: "from-slate-50 to-gray-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Armazenamento e Sinais de Oxidação",
        descricao: "Como armazenar corretamente e identificar óleos oxidados",
        duracaoMinutos: 120,
        conteudo: `# Armazenamento de Óleos Essenciais

| Fator | Recomendação | Por quê? |
|---|---|---|
| **Luz** | Frascos âmbar, azul cobalto ou alumínio | Luz degrada compostos |
| **Temperatura** | Local fresco (15-25°C) | Calor acelera oxidação |
| **Ar** | Frascos bem fechados, headspace mínimo | Oxigênio oxida óleos |
| **Umidade** | Ambiente seco | Água pode contaminar |
| **Validade** | 3-5 anos (cítricos 1-2 anos) | Óleos oxidados perdem eficácia e irritam pele |

## Sinais de Oxidação

| Sinal | Indicação |
|---|---|
| **Alteração de cor** | Escurecimento |
| **Alteração de viscosidade** | Mais espesso |
| **Odor alterado** | Aroma de terebintina, ranço |
| **Irritação na pele** | Teste de sensibilidade positivo |

> Um óleo essencial oxidado não apenas perde eficácia — pode se tornar irritante e até tóxico para a pele.`,
        quiz: [
          {
            pergunta: "Qual a validade típica de óleos essenciais cítricos?",
            opcoes: ["5-10 anos", "3-5 anos", "1-2 anos", "6 meses"],
            respostaCorreta: 2,
            explicacao: "Óleos cítricos têm validade de 1-2 anos por serem ricos em monoterpenos que oxidam mais rapidamente."
          }
        ],
        checklist: [
          "Sei como armazenar óleos essenciais corretamente",
          "Conheço os sinais de oxidação",
          "Entendo os riscos de usar óleos oxidados"
        ]
      },
      {
        titulo: "Segurança e Contraindicações",
        descricao: "Óleos a evitar em condições específicas e precauções gerais",
        duracaoMinutos: 120,
        conteudo: `# Segurança e Contraindicações

## Óleos a Evitar em Condições Específicas

| Condição | Óleos a Evitar |
|---|---|
| **Gravidez** | Sálvia, Poejo, Arruda, Absinto, Cedro (alguns) |
| **Epilepsia** | Hortelã-pimenta, Alecrim, Eucalipto (altas doses) |
| **Pressão alta** | Alecrim, Hortelã, Tomilho |
| **Pressão baixa** | Lavanda em excesso, Ylang Ylang |
| **Pele sensível** | Óleos fenólicos (Canela, Cravo, Orégano) |
| **Crianças pequenas** | Eucalipto, Hortelã, Melaleuca (depende da idade) |

## Precauções Gerais

- **Nunca ingerir** sem orientação profissional
- **Sempre diluir** antes de aplicar na pele
- **Teste de sensibilidade** antes do primeiro uso
- **Manter fora do alcance de crianças**
- **Evitar contato com os olhos**
- **Gestantes e lactantes** devem consultar profissional

> A segurança é o primeiro princípio do uso de óleos essenciais — são substâncias potentes que exigem conhecimento e respeito.`,
        quiz: [
          {
            pergunta: "Quais óleos devem ser evitados por pessoas com epilepsia?",
            opcoes: ["Lavanda e Camomila", "Hortelã-pimenta, Alecrim e Eucalipto em altas doses", "Rosa e Jasmim", "Laranja e Limão"],
            respostaCorreta: 1,
            explicacao: "Hortelã-pimenta, Alecrim e Eucalipto em altas doses contêm compostos que podem ser estimulantes demais para pessoas com epilepsia."
          }
        ],
        checklist: [
          "Conheço as contraindicações para cada condição",
          "Sei as precauções gerais de segurança",
          "Entendo a importância do teste de sensibilidade"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 12 — REGULAMENTAÇÃO E COMERCIALIZAÇÃO (8h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Regulamentação e Comercialização",
    descricao: "Marco regulatório, rotulagem, aspectos legais e formalização",
    icone: "Scale",
    cor: "from-stone-50 to-zinc-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Marco Regulatório e Rotulagem",
        descricao: "Legislação ANVISA, normas e informações obrigatórias no rótulo",
        duracaoMinutos: 150,
        conteudo: `# Regulamentação e Comercialização

## Marco Regulatório no Brasil

| Norma | Órgão | Abrangência |
|---|---|---|
| **RDC 26/2014** | ANVISA | Registro de medicamentos fitoterápicos |
| **RDC 18/2013** | ANVISA | Boas práticas de fabricação |
| **Instrução Normativa** | MAPA | Produção orgânica |
| **Código de Defesa do Consumidor** | - | Rotulagem, informações |

## Rotulagem de Óleos Essenciais

| Informação | Exemplo |
|---|---|
| **Nome do produto** | Óleo Essencial de Lavanda |
| **Nome botânico** | *Lavandula angustifolia* |
| **Parte utilizada** | Flores |
| **Método de extração** | Destilação a vapor |
| **País de origem** | França |
| **Composição (INCI)** | *Lavandula angustifolia oil* |
| **Conteúdo líquido** | 10ml |
| **Lote** | LOT2024-001 |
| **Data de fabricação** | 01/03/2024 |
| **Validade** | 01/03/2027 |
| **Modo de usar** | Uso externo, diluir em óleo carreador |
| **Precauções** | Não ingerir, manter fora do alcance de crianças |
| **CNPJ/Contato** | Informações do fabricante |

> A rotulagem adequada é obrigatória e demonstra profissionalismo — além de ser exigência legal.`,
        quiz: [
          {
            pergunta: "Qual informação NÃO é obrigatória no rótulo de um óleo essencial?",
            opcoes: ["Nome botânico", "Preço de custo", "Método de extração", "Data de validade"],
            respostaCorreta: 1,
            explicacao: "O preço de custo não é informação obrigatória no rótulo — é dado interno do produtor."
          }
        ],
        checklist: [
          "Conheço a legislação aplicável",
          "Sei as informações obrigatórias no rótulo",
          "Entendo a importância da conformidade regulatória"
        ]
      },
      {
        titulo: "Aspectos Legais e Formalização",
        descricao: "MEI, ME, licenciamento e regularização do negócio",
        duracaoMinutos: 120,
        conteudo: `# Aspectos Legais para Produção e Venda

| Modalidade | O que fazer |
|---|---|
| **MEI** | Formalizar como Microempreendedor Individual (venda direta) |
| **ME** | Microempresa para produção em maior escala |
| **ANVISA** | Produtos de aroma (difusores) são Grau 1; cosméticos com óleos exigem notificação |
| **Licenciamento ambiental** | Verificar exigências para produção |
| **Alvará de funcionamento** | Regularizar com prefeitura |

## Passos para Formalização

1. **Definir modelo de negócio** — produção, revenda, consultoria
2. **Escolher regime tributário** — MEI, Simples Nacional, Lucro Presumido
3. **Registrar empresa** — CNPJ, Inscrição Estadual
4. **Obter alvará** — Prefeitura local
5. **Notificar/registrar produtos** — ANVISA (quando aplicável)
6. **Adequar rotulagem** — Conformidade com legislação

> A formalização é o primeiro passo para transformar a paixão por óleos essenciais em um negócio sustentável e legal.`,
        quiz: [
          {
            pergunta: "Qual regime é indicado para quem está começando com venda direta de óleos essenciais?",
            opcoes: ["Lucro Real", "MEI", "Sociedade Anônima", "Lucro Presumido"],
            respostaCorreta: 1,
            explicacao: "O MEI é indicado para quem está começando com venda direta, pois é simples, tem baixo custo e permite faturamento de até R$ 81 mil/ano."
          }
        ],
        checklist: [
          "Conheço as modalidades de formalização",
          "Sei os passos para legalizar o negócio",
          "Entendo as exigências da ANVISA"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 13 — PROJETO E IMPLANTAÇÃO DE UM ALAMBIQUE (12h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Projeto e Implantação de um Alambique",
    descricao: "Dimensionamento, tipos, componentes, condução da destilação e custos",
    icone: "Factory",
    cor: "from-amber-50 to-orange-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Dimensionamento e Tipos de Alambique",
        descricao: "Escolha do tamanho, materiais e tipos de alambique",
        duracaoMinutos: 150,
        conteudo: `# Projeto e Implantação de um Alambique

## Dimensionamento

| Tamanho | Capacidade | Produção | Indicação |
|---|---|---|---|
| **Pequeno** | 20-100L | Artesanal, hobby | Iniciantes, testes |
| **Médio** | 100-500L | Semi-profissional | Pequena produção comercial |
| **Grande** | 500-2000L | Profissional | Produção comercial regular |
| **Industrial** | >2000L | Industrial | Escala comercial |

## Tipos de Alambique

| Tipo | Características | Vantagens | Desvantagens |
|---|---|---|---|
| **Cobre tradicional** | Condução térmica excelente, reage com compostos sulfurados | Qualidade superior, tradição | Mais caro, requer manutenção |
| **Inox** | Durável, fácil limpeza | Mais barato, prático | Não tem as propriedades catalíticas do cobre |
| **Misto** | Corpo inox, coluna e condensador cobre | Equilíbrio | - |

> Para iniciantes, um alambique de 50-100L em inox ou misto é o melhor investimento — custo acessível e boa qualidade de produção.`,
        quiz: [
          {
            pergunta: "Qual material de alambique oferece o melhor equilíbrio custo-benefício?",
            opcoes: ["Cobre puro", "Alumínio", "Misto (inox + cobre)", "Vidro"],
            respostaCorreta: 2,
            explicacao: "O alambique misto (corpo em inox com coluna e condensador em cobre) oferece o melhor equilíbrio entre custo e qualidade."
          }
        ],
        checklist: [
          "Sei dimensionar o alambique para minha produção",
          "Conheço os tipos e materiais disponíveis",
          "Entendo as vantagens de cada tipo"
        ]
      },
      {
        titulo: "Custos e Planejamento",
        descricao: "Estimativas de investimento e planejamento financeiro",
        duracaoMinutos: 120,
        conteudo: `# Custos Estimados

| Item | Faixa de Preço (estimativa) |
|---|---|
| **Alambique 50L (cobre)** | R$ 5.000-10.000 |
| **Alambique 100L (inox)** | R$ 8.000-15.000 |
| **Alambique 200L (inox)** | R$ 15.000-25.000 |
| **Condensador adicional** | R$ 2.000-5.000 |
| **Bombas, mangueiras** | R$ 500-2.000 |

## Planejamento de Investimento

### Investimento Inicial (Produção Artesanal)

| Item | Custo Estimado |
|---|---|
| Alambique 50L (misto) | R$ 7.000 |
| Frascos e rótulos | R$ 1.000 |
| Matéria-prima (primeiros lotes) | R$ 500 |
| Equipamentos auxiliares | R$ 1.000 |
| **Total** | **R$ 9.500** |

> Com um investimento de menos de R$ 10.000, é possível iniciar uma produção artesanal de qualidade profissional.`,
        quiz: [
          {
            pergunta: "Qual o investimento inicial estimado para uma produção artesanal?",
            opcoes: ["R$ 1.000", "R$ 5.000", "R$ 9.500", "R$ 50.000"],
            respostaCorreta: 2,
            explicacao: "Com aproximadamente R$ 9.500 é possível montar uma estrutura artesanal com alambique, frascos e matéria-prima."
          }
        ],
        checklist: [
          "Conheço os custos de cada componente",
          "Sei planejar o investimento inicial",
          "Entendo o investimento mínimo necessário"
        ]
      },
      {
        titulo: "Condução da Destilação em Escala",
        descricao: "Operação prática de alambiques maiores e otimização da produção",
        duracaoMinutos: 120,
        conteudo: `# Condução da Destilação em Escala

## Etapas da Operação

1. **Inspeção** — Verificar vedações, conexões e limpeza do alambique
2. **Carga** — Pesar e dispor o material vegetal adequadamente
3. **Água** — Encher a caldeira com água limpa na proporção adequada
4. **Aquecimento** — Iniciar aquecimento gradual e controlado
5. **Monitoramento** — Acompanhar temperatura, fluxo e condensação
6. **Coleta** — Separar primeira fração, corpo e cauda do destilado
7. **Limpeza** — Higienizar todo o sistema após cada destilação

## Otimização do Rendimento

| Fator | Dica |
|---|---|
| **Material fresco** | Colher no dia ou véspera da destilação |
| **Tamanho do corte** | Triturar levemente para expor mais superfície |
| **Tempo** | Destilar até não observar mais óleo separando |
| **Pressão do vapor** | Constante e adequada ao material |
| **Resfriamento** | Garantir condensação eficiente |

> A prática constante é o melhor professor — cada destilação ensina algo novo sobre o comportamento de cada planta.`,
        quiz: [
          {
            pergunta: "Qual a primeira etapa antes de iniciar uma destilação?",
            opcoes: ["Acender o fogo", "Carregar o material", "Inspecionar vedações, conexões e limpeza", "Adicionar água"],
            respostaCorreta: 2,
            explicacao: "A inspeção do alambique é essencial antes de cada destilação para garantir segurança e eficiência do processo."
          }
        ],
        checklist: [
          "Sei as etapas de operação do alambique",
          "Conheço as dicas de otimização de rendimento",
          "Entendo a importância da limpeza e manutenção"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 14 — EMPREENDEDORISMO E NEGÓCIOS (10h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Empreendedorismo e Negócios",
    descricao: "Modelos de negócio, precificação, canais de venda e marketing",
    icone: "TrendingUp",
    cor: "from-emerald-50 to-green-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Modelos de Negócio no Setor de Óleos Essenciais",
        descricao: "Opções de empreendimento e nível de investimento",
        duracaoMinutos: 120,
        conteudo: `# Modelos de Negócio

| Modelo | Descrição | Investimento |
|---|---|---|
| **Produtor artesanal** | Produção própria em pequena escala | Médio |
| **Revendedor** | Compra de produtores, venda direta | Baixo |
| **Marca própria** | Desenvolvimento de linha com terceirização | Médio |
| **Consultoria** | Assessoria para produtores | Baixo |
| **Cursos e oficinas** | Ensino de fabricação | Baixo |
| **Integrado (cultivo + produção)** | Controle total da cadeia | Alto |

## Como Escolher Seu Modelo

1. **Analise seus recursos** — Capital, tempo, espaço
2. **Avalie suas habilidades** — Produção, vendas, ensino
3. **Estude o mercado local** — Demanda, concorrência
4. **Comece pequeno** — Valide antes de investir mais
5. **Diversifique** — Combine modelos para mais receita

> O modelo ideal depende dos seus recursos e habilidades — não existe um caminho único para o sucesso.`,
        quiz: [
          {
            pergunta: "Qual modelo de negócio requer o menor investimento inicial?",
            opcoes: ["Produtor artesanal", "Marca própria", "Revendedor ou Consultoria", "Integrado"],
            respostaCorreta: 2,
            explicacao: "Revendedor e consultoria exigem o menor investimento inicial, pois não requerem equipamentos de produção."
          }
        ],
        checklist: [
          "Conheço os 6 modelos de negócio",
          "Sei avaliar qual modelo se adequa ao meu perfil",
          "Entendo a importância de começar pequeno"
        ]
      },
      {
        titulo: "Precificação e Custos",
        descricao: "Fórmula de precificação e exemplo prático de cálculo",
        duracaoMinutos: 120,
        conteudo: `# Precificação

## Exemplo Prático — Óleo Essencial de Lavanda (10ml)

| Item | Custo |
|---|---|
| Matéria-prima (500g flores) | R$ 15,00 |
| Energia/água | R$ 2,00 |
| Frasco âmbar + rótulo | R$ 2,50 |
| Mão de obra (1h) | R$ 10,00 |
| **Custo total** | **R$ 29,50** |
| **Multiplicador 3** | **R$ 88,50** |
| **Preço sugerido** | **R$ 85,00 - R$ 90,00** |

## Fórmula Básica

**Preço = Custo Total × Multiplicador (2.5 a 4)**

O multiplicador varia conforme:
- **Canal de venda** — Direto (3-4x), atacado (2-2.5x)
- **Posicionamento** — Premium (4x+), popular (2.5x)
- **Certificações** — Orgânico justifica multiplicador maior
- **Exclusividade** — Óleos raros podem ter multiplicador maior

> Não venda abaixo de 2.5x o custo total — margens menores tornam o negócio insustentável a longo prazo.`,
        quiz: [
          {
            pergunta: "Qual o multiplicador mínimo recomendado para precificação?",
            opcoes: ["1.5x", "2.0x", "2.5x", "5.0x"],
            respostaCorreta: 2,
            explicacao: "O multiplicador mínimo recomendado é 2.5x sobre o custo total, garantindo margem suficiente para o negócio ser sustentável."
          }
        ],
        checklist: [
          "Sei calcular o custo total de produção",
          "Conheço a fórmula de precificação",
          "Entendo os fatores que influenciam o multiplicador"
        ]
      },
      {
        titulo: "Canais de Venda e Marketing",
        descricao: "Estratégias de comercialização e marketing para produtores",
        duracaoMinutos: 120,
        conteudo: `# Canais de Venda

| Canal | Estratégia |
|---|---|
| **Feiras orgânicas e artesanais** | Contato direto, fidelização |
| **Lojas de produtos naturais** | Venda em consignação ou atacado |
| **Spas e clínicas** | Fornecimento para terapias |
| **E-commerce** | Loja virtual, marketplaces |
| **Redes sociais** | Instagram, WhatsApp Business |
| **Workshops e cursos** | Venda de experiência + produtos |

## Dicas de Marketing

- **Conte sua história** — Consumidores valorizam autenticidade
- **Mostre o processo** — Fotos e vídeos da produção geram conexão
- **Eduque seu público** — Conteúdo sobre óleos essenciais atrai clientes
- **Ofereça amostras** — O aroma vende por si só
- **Colete depoimentos** — Prova social é poderosa
- **Invista em embalagem** — Primeiro contato visual do cliente com seu produto

> O melhor marketing para óleos essenciais é a educação — quanto mais seu cliente entende, mais ele valoriza.`,
        quiz: [
          {
            pergunta: "Qual a estratégia mais eficaz para vender óleos essenciais?",
            opcoes: ["Preço baixo", "Educação do consumidor sobre o produto", "Publicidade em TV", "Promoções constantes"],
            respostaCorreta: 1,
            explicacao: "Educar o consumidor sobre óleos essenciais é a estratégia mais eficaz — quanto mais o cliente entende, mais ele valoriza o produto."
          }
        ],
        checklist: [
          "Conheço os principais canais de venda",
          "Sei as estratégias para cada canal",
          "Entendo a importância do marketing educativo"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 15 — BÔNUS E EXPANSÃO (6h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Bônus e Expansão",
    descricao: "Diversificação de produtos, bônus exclusivos e certificação",
    icone: "Gift",
    cor: "from-violet-50 to-purple-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Diversificação de Produtos",
        descricao: "Expandindo a linha de produção além dos óleos essenciais puros",
        duracaoMinutos: 120,
        conteudo: `# Diversificação de Produtos

| Produto | Descrição |
|---|---|
| **Hidrolatos** | Águas aromáticas para cosméticos e sprays |
| **Blends de óleos essenciais** | Combinações para fins específicos |
| **Óleos vegetais infusionados** | Maceração de ervas em óleo vegetal |
| **Cosméticos naturais** | Cremes, sabonetes, pomadas com óleos essenciais |
| **Difusores e sprays** | Linha de aromatização de ambientes |

## Estratégias de Expansão

- **Verticalize** — Do cultivo ao produto final
- **Crie linhas temáticas** — Relaxamento, energia, imunidade
- **Ofereça kits** — Conjuntos prontos para presente
- **Desenvolva cursos** — Monetize seu conhecimento
- **Faça parcerias** — Spas, terapeutas, lojas

> Diversificar é a chave para um negócio resiliente — não dependa de um único produto ou canal de venda.`,
        quiz: [
          {
            pergunta: "Qual é uma estratégia de diversificação para produtores de óleos essenciais?",
            opcoes: ["Vender apenas óleo puro", "Criar linhas temáticas e cosméticos naturais", "Diminuir a produção", "Focar apenas em um canal de venda"],
            respostaCorreta: 1,
            explicacao: "Criar linhas temáticas e cosméticos naturais é uma excelente estratégia de diversificação para expandir o negócio."
          }
        ],
        checklist: [
          "Conheço as opções de diversificação",
          "Sei as estratégias de expansão",
          "Entendo a importância de diversificar"
        ]
      },
      {
        titulo: "Bônus Exclusivos e Certificação",
        descricao: "Materiais complementares, grupo VIP e certificado de conclusão",
        duracaoMinutos: 120,
        conteudo: `# Bônus Exclusivos

| Bônus | Descrição |
|---|---|
| **Grupo VIP de alunas** | Comunidade exclusiva para troca de experiências |
| **Lista de fornecedores verificados** | Qualidade garantida |
| **Planilha de custos** | Controle financeiro facilitado |
| **Tabela de rendimentos por planta** | Referência para produção |
| **Modelos de rótulos editáveis** | Identidade visual profissional |

## Certificação

Ao finalizar o curso, o aluno recebe certificado de conclusão, comprovando as habilidades adquiridas e podendo utilizar como diferencial profissional.

### O que o certificado comprova:

- **150 horas** de formação completa
- Conhecimento em **15 módulos** de conteúdo
- Capacidade de **produzir óleos essenciais** de qualidade
- Fundamentos de **empreendedorismo** no setor
- Conhecimento em **segurança e regulamentação**

> Este certificado é o seu passaporte para o mercado de óleos essenciais — use-o como diferencial competitivo e prova de qualificação.`,
        quiz: [
          {
            pergunta: "Quantas horas de formação o certificado comprova?",
            opcoes: ["50 horas", "100 horas", "150 horas", "200 horas"],
            respostaCorreta: 2,
            explicacao: "O certificado comprova 150 horas de formação completa em fabricação de óleos essenciais."
          }
        ],
        checklist: [
          "Conheço os bônus exclusivos disponíveis",
          "Sei como utilizar o certificado profissionalmente",
          "Estou preparado para empreender no setor de óleos essenciais"
        ]
      }
    ]
  }
];
