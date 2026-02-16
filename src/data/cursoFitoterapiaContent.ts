import type { ModuloContent } from "@/data/cursoVendasContent";

export const cursoFitoterapiaData: ModuloContent[] = [
  // ═══════════════════════════════════════════════════════════
  // MÓDULO 1 — FUNDAÇÃO: O UNIVERSO DA FITOTERAPIA (10h · 4 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Fundação: O Universo da Fitoterapia",
    descricao: "Definição, história, legislação e mercado de trabalho",
    icone: "Lightbulb",
    cor: "from-green-50 to-emerald-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "O que é Fitoterapia",
        descricao: "Definição, diferenças entre fitoterapia científica e uso popular, importância na saúde",
        duracaoMinutos: 150,
        conteudo: `# O que é Fitoterapia

## Definição

Fitoterapia é a ciência que estuda o uso de plantas medicinais e seus derivados para prevenção e tratamento de doenças. Diferente do uso popular tradicional, a fitoterapia baseia-se em evidências científicas, estudos farmacológicos e conhecimento técnico sobre os princípios ativos das plantas.

## Fitoterapia Científica vs. Uso Popular

| Aspecto | Fitoterapia Científica |
|---|---|
| **Base** | Evidências científicas, estudos clínicos |
| **Padronização** | Dosagens precisas, controle de qualidade |
| **Segurança** | Estudo de interações e contraindicações |
| **Partes utilizadas** | Partes específicas com princípios ativos |
| **Formas farmacêuticas** | Extratos padronizados, tinturas, cápsulas |

| Aspecto | Uso Popular Tradicional |
|---|---|
| **Base** | Conhecimento transmitido oralmente |
| **Padronização** | Uso empírico, sem padronização |
| **Segurança** | Desconhecimento de riscos |
| **Partes utilizadas** | Uso da planta inteira |
| **Formas farmacêuticas** | Chás caseiros |

## Importância da Fitoterapia na Saúde

- **Acesso à saúde:** Alternativa acessível, especialmente na atenção primária
- **Biodiversidade brasileira:** Brasil possui a maior biodiversidade do mundo
- **Complementaridade:** Pode ser integrada a tratamentos convencionais
- **Prevenção:** Atua na promoção da saúde e prevenção de doenças
- **Menos efeitos colaterais:** Quando usada corretamente, efeitos adversos reduzidos

> A fitoterapia moderna une o conhecimento ancestral à ciência contemporânea, garantindo segurança e eficácia no uso de plantas medicinais.`,
        quiz: [
          {
            pergunta: "Qual a principal diferença entre fitoterapia científica e uso popular?",
            opcoes: ["O tipo de planta utilizada", "A base em evidências científicas e padronização", "O local de cultivo das plantas", "O custo do tratamento"],
            respostaCorreta: 1,
            explicacao: "A fitoterapia científica se diferencia pela base em evidências clínicas, dosagens precisas e controle de qualidade."
          },
          {
            pergunta: "Qual vantagem do Brasil para a fitoterapia?",
            opcoes: ["Maior população do mundo", "Maior biodiversidade do mundo", "Maior produção farmacêutica", "Maior número de farmácias"],
            respostaCorreta: 1,
            explicacao: "O Brasil possui a maior biodiversidade do planeta, representando enorme potencial para a fitoterapia."
          }
        ],
        checklist: [
          "Compreendi a definição de fitoterapia",
          "Sei diferenciar fitoterapia científica do uso popular",
          "Conheço os benefícios da fitoterapia na saúde"
        ]
      },
      {
        titulo: "História da Fitoterapia",
        descricao: "Das civilizações antigas à era moderna, marcos históricos e evolução",
        duracaoMinutos: 120,
        conteudo: `# História da Fitoterapia

## Linha do Tempo

| Período | Civilização | Contribuição |
|---|---|---|
| **3000 a.C.** | China | Primeiros tratados sobre plantas medicinais |
| **1500 a.C.** | Egito | Papiro de Ebers com centenas de fórmulas |
| **400 a.C.** | Grécia | Hipócrates — "pai da medicina" — usava plantas |
| **Século I** | Roma | Dioscórides escreveu "De Materia Medica" |
| **Idade Média** | Europa | Conhecimento preservado em mosteiros |
| **Século XVI** | Brasil | Conhecimento indígena incorporado pelos jesuítas |

## Era Moderna

| Ano | Evento |
|---|---|
| **1978** | Programa de Medicina Tradicional da OMS |
| **2006** | Política Nacional de Práticas Integrativas e Complementares (PNPIC) |
| **2008** | Política Nacional de Plantas Medicinais e Fitoterápicos (PNPMF) |

> O conhecimento fitoterápico é patrimônio da humanidade, construído ao longo de milênios por diferentes civilizações.

## O Legado Brasileiro

O Brasil tem papel fundamental na história da fitoterapia mundial. Os povos indígenas detêm conhecimento milenar sobre plantas medicinais, que foi gradualmente incorporado pela medicina popular e, mais recentemente, pela ciência moderna.`,
        quiz: [
          {
            pergunta: "Qual civilização produziu os primeiros tratados sobre plantas medicinais?",
            opcoes: ["Egito", "China", "Grécia", "Roma"],
            respostaCorreta: 1,
            explicacao: "A China produziu os primeiros tratados sobre plantas medicinais por volta de 3000 a.C."
          }
        ]
      },
      {
        titulo: "Legislação e Políticas Públicas",
        descricao: "PNPMF, ANVISA, regulamentação e normas brasileiras",
        duracaoMinutos: 120,
        conteudo: `# Legislação e Políticas Públicas no Brasil

## Política Nacional de Plantas Medicinais e Fitoterápicos (PNPMF)

A PNPMF tem como objetivo "garantir à população brasileira o acesso seguro e o uso racional de plantas medicinais e fitoterápicos, promovendo o uso sustentável da biodiversidade, o desenvolvimento da cadeia produtiva e da indústria nacional".

### Diretrizes Relacionadas à Capacitação

- **Promover a formação técnico-científica** no setor de plantas medicinais e fitoterápicos
- **Incentivar a formação de recursos humanos** para pesquisas, tecnologias e inovação

## ANVISA e Regulamentação

| Norma | Abrangência |
|---|---|
| **RDC 26/2014** | Registro de medicamentos fitoterápicos |
| **RDC 18/2013** | Boas práticas de fabricação |
| **Farmacopeia Brasileira** | Padronização de monografias e métodos |
| **Formulário de Fitoterápicos** | Preparações oficinais |
| **Memento Fitoterápico** | Guia para prescrição |

> Conhecer a legislação é fundamental para atuar de forma ética e segura na fitoterapia.`,
        quiz: [
          {
            pergunta: "Qual norma da ANVISA regulamenta o registro de medicamentos fitoterápicos?",
            opcoes: ["RDC 18/2013", "RDC 26/2014", "Farmacopeia Brasileira", "Memento Fitoterápico"],
            respostaCorreta: 1,
            explicacao: "A RDC 26/2014 é a norma que regulamenta o registro de medicamentos fitoterápicos no Brasil."
          }
        ],
        checklist: [
          "Conheço a PNPMF e seus objetivos",
          "Sei quais normas da ANVISA se aplicam à fitoterapia",
          "Entendo a importância da regulamentação"
        ]
      },
      {
        titulo: "Mercado de Trabalho",
        descricao: "Oportunidades de atuação, perfis profissionais e instituições",
        duracaoMinutos: 90,
        conteudo: `# Mercado de Trabalho em Fitoterapia

## Oportunidades de Atuação

| Local | Atuação |
|---|---|
| **Hospitais e Clínicas** | Prescrição e acompanhamento de tratamentos |
| **Unidades de Saúde (SUS)** | Atendimento na atenção primária |
| **Spas e Clínicas estéticas** | Tratamentos integrativos |
| **Lojas de produtos naturais** | Orientação ao consumidor |
| **Ervanarias** | Cultivo, manipulação e venda |
| **Consultório particular** | Atendimento privado |
| **Indústria farmacêutica** | Pesquisa e desenvolvimento |

## Instituições com Cursos Reconhecidos

| Instituição | Tipo | Diferencial |
|---|---|---|
| **USP** | Especialização | Certificação USP, prática em Farmácia Viva |
| **Santa Casa de SP** | Pós-graduação | Nota máxima no MEC |
| **Ministério da Saúde** | Capacitações gratuitas | Cursos para profissionais do SUS |

> O mercado de fitoterapia está em crescimento constante, impulsionado pela busca por saúde natural e prevenção.`,
        quiz: [
          {
            pergunta: "Qual dessas NÃO é uma área de atuação em fitoterapia?",
            opcoes: ["Consultório particular", "Farmácias Vivas no SUS", "Cirurgia fitoterápica", "Indústria farmacêutica"],
            respostaCorreta: 2,
            explicacao: "Cirurgia não faz parte da fitoterapia. As demais são áreas legítimas de atuação."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 2 — BOTÂNICA E FISIOLOGIA VEGETAL (12h · 4 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Botânica e Fisiologia Vegetal",
    descricao: "Classificação botânica, partes da planta, metabolismo e princípios ativos",
    icone: "BookOpen",
    cor: "from-lime-50 to-green-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Classificação Botânica",
        descricao: "Nomenclatura científica e principais famílias de interesse fitoterápico",
        duracaoMinutos: 180,
        conteudo: `# Classificação Botânica

## Nomenclatura Científica

| Elemento | Exemplo | Significado |
|---|---|---|
| **Gênero** | *Matricaria* | Grupo de espécies relacionadas |
| **Espécie** | *chamomilla* | Identificador específico |
| **Autor** | L. | Lineu — quem descreveu a espécie |
| **Família** | Asteraceae | Grupo maior de plantas relacionadas |

**Exemplo Completo:** *Matricaria chamomilla* L. (camomila) — Família Asteraceae

## Principais Famílias de Interesse Fitoterápico

| Família | Características | Exemplos |
|---|---|---|
| **Asteraceae** | Flores em capítulo, compostos amargos | Camomila, Calêndula, Arnica |
| **Lamiaceae** | Ervas aromáticas, óleos essenciais | Alecrim, Hortelã, Alfazema |
| **Apiaceae** | Umbelas, óleos essenciais | Erva-doce, Funcho, Coentro |
| **Fabaceae** | Leguminosas, alcaloides | Sucupira, Mulungu |
| **Rutaceae** | Cítricas, óleos essenciais | Laranjeira, Arruda |
| **Myrtaceae** | Folhas coriáceas, óleos | Eucalipto, Pitanga |

> A identificação correta da espécie é o primeiro passo para a segurança no uso de plantas medicinais.`,
        quiz: [
          {
            pergunta: "A qual família botânica pertence a camomila?",
            opcoes: ["Lamiaceae", "Asteraceae", "Apiaceae", "Rutaceae"],
            respostaCorreta: 1,
            explicacao: "A camomila (Matricaria chamomilla) pertence à família Asteraceae."
          }
        ]
      },
      {
        titulo: "Partes da Planta Utilizadas",
        descricao: "Folhas, flores, raízes, cascas e suas funções terapêuticas",
        duracaoMinutos: 180,
        conteudo: `# Partes da Planta Utilizadas

## Cada Parte, uma Função

| Parte | Função na Planta | Princípios Ativos | Exemplos |
|---|---|---|---|
| **Folhas** | Fotossíntese | Óleos essenciais, flavonoides | Hortelã, Alecrim, Eucalipto |
| **Flores** | Reprodução | Flavonoides, mucilagens | Camomila, Calêndula |
| **Frutos** | Proteção das sementes | Óleos essenciais | Erva-doce, Funcho |
| **Sementes** | Propagação | Óleos fixos, alcaloides | Castanha-da-índia |
| **Cascas** | Proteção | Taninos, alcaloides | Sucupira, Quina |
| **Raízes** | Absorção | Inulina, glicosídeos | Ginseng, Valeriana |
| **Rizomas** | Reserva | Amido, óleos essenciais | Cúrcuma, Gengibre |

> A parte utilizada determina os princípios ativos disponíveis e, consequentemente, a ação terapêutica.`,
        quiz: [
          {
            pergunta: "Qual parte da planta é rica em taninos?",
            opcoes: ["Folhas", "Flores", "Cascas", "Rizomas"],
            respostaCorreta: 2,
            explicacao: "As cascas são ricas em taninos, que possuem ação adstringente e cicatrizante."
          }
        ]
      },
      {
        titulo: "Metabolismo e Princípios Ativos",
        descricao: "Metabolismo primário vs. secundário e classes de compostos",
        duracaoMinutos: 180,
        conteudo: `# Metabolismo Vegetal e Princípios Ativos

## Metabolismo Primário vs. Secundário

| Tipo | Função | Compostos |
|---|---|---|
| **Primário** | Crescimento, desenvolvimento | Carboidratos, proteínas, lipídios |
| **Secundário** | Defesa, adaptação, interação | Alcaloides, flavonoides, terpenos |

## Principais Classes de Princípios Ativos

| Classe | Ação Terapêutica | Exemplos |
|---|---|---|
| **Alcaloides** | Analgésica, antiespasmódica | Cafeína, Morfina |
| **Flavonoides** | Anti-inflamatória, antioxidante | Rutina, Quercetina |
| **Taninos** | Cicatrizante, antidiarreica | Hamamélis, Barbatimão |
| **Saponinas** | Expectorante, imunoestimulante | Ginseng, Quilaia |
| **Óleos essenciais** | Antisséptica, relaxante | Mentol, Eugenol |
| **Mucilagens** | Emoliente, calmante | Malva, Linhaça |
| **Glicosídeos** | Cardiotônica, laxante | Digital, Sene |

> Os metabólitos secundários são os responsáveis pela ação terapêutica das plantas medicinais.`,
        quiz: [
          {
            pergunta: "Qual classe de princípios ativos tem ação expectorante?",
            opcoes: ["Taninos", "Flavonoides", "Saponinas", "Mucilagens"],
            respostaCorreta: 2,
            explicacao: "As saponinas possuem ação expectorante e imunoestimulante."
          }
        ],
        checklist: [
          "Conheço as classes de princípios ativos",
          "Sei diferenciar metabolismo primário e secundário",
          "Entendo a relação entre compostos e ação terapêutica"
        ]
      },
      {
        titulo: "Qualidade da Matéria-Prima",
        descricao: "Fatores que influenciam a qualidade e potência das plantas",
        duracaoMinutos: 120,
        conteudo: `# Fatores que Influenciam a Qualidade

## Variáveis Críticas

| Fator | Influência |
|---|---|
| **Solo** | Nutrientes afetam produção de princípios ativos |
| **Clima** | Temperatura, umidade, luminosidade |
| **Época de colheita** | Momento ideal para cada parte da planta |
| **Horário da colheita** | Concentração de princípios ativos varia ao longo do dia |
| **Secagem** | Processo adequado preserva os compostos |
| **Armazenamento** | Proteção contra luz, umidade, oxidação |

> A qualidade da matéria-prima é determinante para a eficácia e segurança do fitoterápico final.

### Boas Práticas

- [ ] Verificar origem e certificação do fornecedor
- [ ] Avaliar aspecto visual, cor e aroma
- [ ] Conferir data de colheita e validade
- [ ] Armazenar em local adequado`
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 3 — DO CULTIVO À COLHEITA (10h · 4 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Do Cultivo à Colheita",
    descricao: "Cultivo, propagação, colheita, secagem e armazenamento",
    icone: "Target",
    cor: "from-emerald-50 to-teal-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Cultivo de Plantas Medicinais",
        descricao: "Condições ideais de solo, luminosidade, água e adubação",
        duracaoMinutos: 150,
        conteudo: `# Cultivo de Plantas Medicinais

## Condições Ideais

| Fator | Recomendações |
|---|---|
| **Solo** | Bem drenado, rico em matéria orgânica |
| **Luminosidade** | Específica para cada espécie (pleno sol, meia-sombra) |
| **Água** | Irrigação regular, sem encharcamento |
| **Espaçamento** | Respeitar o porte da planta |
| **Adubação** | Orgânica, preferencialmente |

## Propagação

| Método | Descrição | Exemplos |
|---|---|---|
| **Sementes** | Plantio direto ou em sementeiras | Camomila, Calêndula |
| **Estacas** | Ramos que enraízam | Alecrim, Hortelã |
| **Divisão de touceiras** | Separação de plantas adultas | Capim-limão, Erva-cidreira |
| **Rizomas** | Partes subterrâneas | Gengibre, Cúrcuma |

> Um cultivo bem planejado garante matéria-prima de qualidade para preparações fitoterápicas.`,
        checklist: [
          "Conheço as condições ideais de cultivo",
          "Sei os métodos de propagação",
          "Entendo a importância da adubação orgânica"
        ]
      },
      {
        titulo: "Colheita",
        descricao: "Época e horário ideais para cada parte da planta",
        duracaoMinutos: 120,
        conteudo: `# Colheita de Plantas Medicinais

## Época e Horário Ideais

| Parte da Planta | Época | Horário |
|---|---|---|
| **Folhas** | Antes da floração | Manhã (após orvalho seco) |
| **Flores** | Início da floração | Manhã |
| **Frutos** | Maduros | Manhã |
| **Sementes** | Maduras | Manhã |
| **Cascas** | Primavera/outono | Manhã |
| **Raízes** | Outono/inverno | Manhã |

> O horário da manhã é o mais indicado para a maioria das colheitas, pois a concentração de princípios ativos costuma ser maior nesse período.

### Dicas Práticas

- Colher em dias secos
- Usar tesoura limpa e afiada
- Não misturar espécies
- Identificar cada lote imediatamente`
      },
      {
        titulo: "Secagem",
        descricao: "Métodos de secagem e ponto ideal para cada tipo de planta",
        duracaoMinutos: 120,
        conteudo: `# Secagem de Plantas Medicinais

## Métodos de Secagem

| Método | Temperatura | Indicação |
|---|---|---|
| **Sombra e arejamento** | Ambiente | Plantas delicadas, flores |
| **Estufa ventilada** | 30-40°C | Folhas, frutos |
| **Estufa com aquecimento** | 40-50°C | Raízes, cascas |
| **Liofilização** | Congelamento a vácuo | Preservação máxima (industrial) |

## Ponto de Secagem Ideal

- **Folhas e flores:** quebradiças ao toque
- **Raízes:** rígidas, não flexíveis
- **Perda de peso:** 80-90% do peso original

> A secagem inadequada é uma das principais causas de perda de qualidade em plantas medicinais.`
      },
      {
        titulo: "Armazenamento",
        descricao: "Recipientes, condições e validade das plantas secas",
        duracaoMinutos: 90,
        conteudo: `# Armazenamento de Plantas Medicinais

## Condições Ideais

| Fator | Recomendação |
|---|---|
| **Recipiente** | Vidro âmbar, papel kraft, sacos de papel |
| **Local** | Fresco, seco, ao abrigo da luz |
| **Umidade** | Abaixo de 60% |
| **Temperatura** | 15-25°C |
| **Validade** | 6 meses a 2 anos (depende da planta) |
| **Identificação** | Nome científico, data de colheita, lote |

> Um armazenamento adequado preserva os princípios ativos e garante a eficácia do produto final.

### Checklist de Armazenamento

- [ ] Recipiente adequado e limpo
- [ ] Local protegido de luz e umidade
- [ ] Etiqueta com identificação completa
- [ ] Controle de validade`,
        checklist: [
          "Sei escolher o recipiente adequado",
          "Conheço as condições ideais de armazenamento",
          "Entendo a importância da identificação e rastreabilidade"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 4 — PREPARAÇÕES FITOTERÁPICAS (15h · 4 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Preparações Fitoterápicas",
    descricao: "Chás, tinturas, extratos, pomadas e cálculo de dosagens",
    icone: "Package",
    cor: "from-teal-50 to-cyan-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Chás e Infusões",
        descricao: "Infusão, decocção, maceração — métodos e indicações",
        duracaoMinutos: 180,
        conteudo: `# Chás — Preparações Aquosas

## Tipos de Chás

| Tipo | Método | Temperatura | Tempo | Indicação |
|---|---|---|---|---|
| **Infusão** | Água quente sobre a planta | 90-100°C | 5-10 min | Folhas, flores (partes delicadas) |
| **Decocção** | Ferver a planta na água | Fervura | 10-15 min | Raízes, cascas, sementes |
| **Maceração** | Água fria ou morna | Ambiente | 6-12h | Plantas com mucilagem |

### Dicas Práticas

- Usar água filtrada ou mineral
- Tampar o recipiente durante a infusão
- Coar e consumir em até 24 horas
- Não reutilizar o material vegetal

> A infusão é a forma mais simples e acessível de preparação fitoterápica.`,
        quiz: [
          {
            pergunta: "Qual método é mais indicado para raízes e cascas?",
            opcoes: ["Infusão", "Decocção", "Maceração", "Tintura"],
            respostaCorreta: 1,
            explicacao: "A decocção (fervura) é necessária para extrair princípios ativos de partes duras como raízes e cascas."
          }
        ]
      },
      {
        titulo: "Tinturas e Extratos",
        descricao: "Preparação, concentração, vantagens e tipos de extratos",
        duracaoMinutos: 180,
        conteudo: `# Tinturas e Extratos

## Tinturas

| Característica | Descrição |
|---|---|
| **Definição** | Extrato alcoólico de plantas medicinais |
| **Concentração** | Geralmente 1:5 ou 1:10 (planta:solvente) |
| **Álcool utilizado** | 40-70% (depende da planta) |
| **Tempo de extração** | 7-14 dias |
| **Vantagens** | Maior conservação, dosagem precisa |

## Tipos de Extratos

| Tipo | Descrição |
|---|---|
| **Extrato fluido** | 1g/ml (1 parte de planta para 1 parte de solvente) |
| **Extrato mole** | Consistência pastosa, solvente evaporado |
| **Extrato seco** | Pó, solvente totalmente evaporado |

> Tinturas são formas farmacêuticas versáteis e de longa validade.`
      },
      {
        titulo: "Pomadas, Cremes e Outras Preparações",
        descricao: "Uso tópico, cataplasmas, compressas, inalações e banhos",
        duracaoMinutos: 180,
        conteudo: `# Preparações Tópicas e Especiais

## Pomadas e Cremes

| Componente | Função |
|---|---|
| **Base (cera, vaselina, lanolina)** | Veículo |
| **Extrato vegetal** | Princípio ativo |
| **Óleos essenciais** | Aroma e ação terapêutica |
| **Conservantes** | Estabilidade |

## Outras Preparações

| Preparação | Descrição |
|---|---|
| **Cataplasma** | Planta macerada aplicada diretamente na pele |
| **Compressa** | Pano embebido em infusão |
| **Gargarejo** | Solução para boca e garganta |
| **Inalação** | Vapor com óleos essenciais |
| **Escalda-pés** | Imersão dos pés em infusão |
| **Banho de assento** | Imersão da região pélvica |
| **Óleo medicinal** | Maceração em óleo vegetal |

> Cada via de administração possui indicações específicas e deve ser escolhida conforme a necessidade terapêutica.`,
        checklist: [
          "Sei preparar pomadas básicas",
          "Conheço as diferentes vias de aplicação",
          "Entendo quando usar cada preparação"
        ]
      },
      {
        titulo: "Cálculo de Dosagens",
        descricao: "Proporções, dosagens por idade e segurança",
        duracaoMinutos: 120,
        conteudo: `# Cálculo de Dosagens

## Proporções Básicas

| Preparação | Proporção |
|---|---|
| **Infusão** | 1-2 colheres de sopa por xícara |
| **Decocção** | 2-3 colheres de sopa por litro |
| **Tintura** | 1:5 (200g planta para 1L álcool) |

## Dosagem de Tinturas por Idade

| Idade | Dosagem | Frequência |
|---|---|---|
| **Adultos** | 20-40 gotas | 2-3x/dia |
| **Crianças (6-12 anos)** | 5-15 gotas | 2x/dia |
| **Crianças (2-6 anos)** | 2-5 gotas | 2x/dia |

⚠️ Sempre iniciar com a menor dose e observar a resposta individual.

> A dosagem correta é fundamental para a segurança e eficácia do tratamento fitoterápico.`,
        quiz: [
          {
            pergunta: "Qual a proporção padrão de uma tintura?",
            opcoes: ["1:1", "1:3", "1:5", "1:20"],
            respostaCorreta: 2,
            explicacao: "A proporção padrão de tinturas é 1:5, ou seja, 200g de planta para 1L de solvente."
          }
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 5 — PRINCIPAIS PLANTAS MEDICINAIS (20h · 6 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Principais Plantas Medicinais",
    descricao: "Plantas por sistema: digestório, respiratório, nervoso, imune, pele e saúde feminina",
    icone: "Heart",
    cor: "from-cyan-50 to-sky-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Plantas para o Sistema Digestório",
        descricao: "Hortelã, camomila, espinheira-santa, boldo e mais",
        duracaoMinutos: 200,
        conteudo: `# Plantas para o Sistema Digestório

| Planta | Nome Científico | Parte Usada | Ação | Indicação |
|---|---|---|---|---|
| **Hortelã-pimenta** | *Mentha piperita* | Folhas | Antiespasmódica, carminativa | Cólica, má digestão |
| **Camomila** | *Matricaria chamomilla* | Flores | Calmante, antiespasmódica | Cólica, ansiedade |
| **Erva-doce** | *Pimpinella anisum* | Frutos | Carminativa, expectorante | Gases, digestão |
| **Espinheira-santa** | *Maytenus ilicifolia* | Folhas | Antiácida, cicatrizante | Gastrite, úlcera |
| **Boldo** | *Peumus boldus* | Folhas | Colerética, colagoga | Disfunções hepáticas |

### Contraindicações Importantes

❌ Hortelã-pimenta: evitar em refluxo grave
❌ Espinheira-santa: contraindicada para gestantes
❌ Boldo: contraindicado em obstrução biliar

> O sistema digestório é o mais beneficiado pela fitoterapia, com ampla variedade de plantas seguras e eficazes.`,
        quiz: [
          {
            pergunta: "Qual planta é indicada para gastrite e úlcera?",
            opcoes: ["Hortelã", "Boldo", "Espinheira-santa", "Erva-doce"],
            respostaCorreta: 2,
            explicacao: "A espinheira-santa possui ação antiácida e cicatrizante, sendo indicada para gastrite e úlcera."
          }
        ]
      },
      {
        titulo: "Plantas para o Sistema Respiratório",
        descricao: "Eucalipto, guaco, alteia, sabugueiro e indicações",
        duracaoMinutos: 200,
        conteudo: `# Plantas para o Sistema Respiratório

| Planta | Nome Científico | Parte Usada | Ação | Indicação |
|---|---|---|---|---|
| **Eucalipto** | *Eucalyptus globulus* | Folhas | Expectorante, antisséptica | Bronquite, sinusite |
| **Guaco** | *Mikania glomerata* | Folhas | Broncodilatadora, expectorante | Tosse, asma |
| **Alteia** | *Althaea officinalis* | Raiz | Emoliente, antitussígena | Tosse seca, irritação |
| **Sabugueiro** | *Sambucus nigra* | Flores | Diaforética, antigripal | Gripe, resfriado |

### Contraindicações

❌ Eucalipto: não usar em crianças menores de 2 anos
❌ Guaco: contraindicado para gestantes

> O sistema respiratório responde muito bem à fitoterapia, especialmente em quadros agudos como gripes e resfriados.`
      },
      {
        titulo: "Plantas para o Sistema Nervoso",
        descricao: "Mulungu, maracujá, valeriana, erva-cidreira",
        duracaoMinutos: 200,
        conteudo: `# Plantas para o Sistema Nervoso

| Planta | Nome Científico | Parte Usada | Ação | Indicação |
|---|---|---|---|---|
| **Mulungu** | *Erythrina mulungu* | Casca | Sedativa, calmante | Ansiedade, insônia |
| **Maracujá** | *Passiflora incarnata* | Folhas | Ansiolítica, sedativa | Ansiedade, agitação |
| **Valeriana** | *Valeriana officinalis* | Raiz | Sedativa, hipnótica | Insônia, estresse |
| **Erva-cidreira** | *Melissa officinalis* | Folhas | Calmante, antiespasmódica | Ansiedade leve, cólica |

### Cuidados

⚠️ Mulungu: potencializa sedativos
⚠️ Valeriana: evitar direção após uso

> Plantas calmantes são entre as mais procuradas e podem substituir ou complementar tratamentos farmacológicos em casos leves.`,
        quiz: [
          {
            pergunta: "Qual planta é indicada para insônia?",
            opcoes: ["Erva-doce", "Boldo", "Valeriana", "Eucalipto"],
            respostaCorreta: 2,
            explicacao: "A valeriana possui ação sedativa e hipnótica, sendo uma das plantas mais estudadas para insônia."
          }
        ]
      },
      {
        titulo: "Plantas para o Sistema Imunológico",
        descricao: "Equinácea, alho, astrágalo e fortalecimento da imunidade",
        duracaoMinutos: 200,
        conteudo: `# Plantas para o Sistema Imunológico

| Planta | Nome Científico | Parte Usada | Ação | Indicação |
|---|---|---|---|---|
| **Equinácea** | *Echinacea purpurea* | Raiz, folhas | Imunoestimulante | Prevenção de gripes |
| **Alho** | *Allium sativum* | Bulbo | Antimicrobiana, imunoestimulante | Infecções |
| **Astrágalo** | *Astragalus membranaceus* | Raiz | Imunoestimulante, adaptógeno | Imunidade baixa |
| **Sabugueiro** | *Sambucus nigra* | Frutos | Antiviral | Gripe, resfriado |

### Contraindicações

❌ Equinácea e Astrágalo: contraindicados em doenças autoimunes
❌ Alho: interação com anticoagulantes

> Plantas imunoestimulantes devem ser usadas em ciclos e com acompanhamento profissional.`
      },
      {
        titulo: "Plantas para a Pele",
        descricao: "Calêndula, confrei, babosa, arnica — uso tópico",
        duracaoMinutos: 120,
        conteudo: `# Plantas para a Pele

| Planta | Nome Científico | Parte Usada | Ação | Indicação |
|---|---|---|---|---|
| **Calêndula** | *Calendula officinalis* | Flores | Cicatrizante, anti-inflamatória | Feridas, queimaduras |
| **Confrei** | *Symphytum officinale* | Raiz | Cicatrizante | Úlceras de pele |
| **Babosa** | *Aloe vera* | Folhas | Emoliente, cicatrizante | Queimaduras, hidratação |
| **Arnica** | *Arnica montana* | Flores | Anti-inflamatória | Contusões, hematomas |

### Cuidados Importantes

❌ Confrei: uso interno não recomendado (hepatotóxico)
❌ Arnica: não usar em feridas abertas

> As plantas para uso tópico são extremamente seguras quando utilizadas corretamente.`
      },
      {
        titulo: "Plantas para a Saúde Feminina",
        descricao: "Alecrim, artemísia, urtiga e regulação hormonal",
        duracaoMinutos: 120,
        conteudo: `# Plantas para a Saúde Feminina

| Planta | Nome Científico | Parte Usada | Ação | Indicação |
|---|---|---|---|---|
| **Alecrim** | *Rosmarinus officinalis* | Folhas | Emenagoga | Regulação menstrual |
| **Artemísia** | *Artemisia vulgaris* | Folhas | Emenagoga | Ciclo irregular |
| **Urtiga** | *Urtica dioica* | Folhas | Nutritiva, anti-inflamatória | TPM, lactação |
| **Amor-perfeito** | *Viola tricolor* | Flores, folhas | Depurativa | Afecções de pele |

### Cuidados

❌ Alecrim em altas doses: contraindicado para gestantes
❌ Artemísia: contraindicada na gestação (emenagoga)

> A fitoterapia oferece opções seguras e eficazes para o cuidado da saúde feminina em diferentes fases da vida.`,
        checklist: [
          "Conheço as principais plantas para cada sistema",
          "Sei identificar contraindicações",
          "Posso orientar sobre plantas para a saúde feminina"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 6 — AÇÃO TERAPÊUTICA POR SISTEMAS (15h · 6 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Ação Terapêutica por Sistemas",
    descricao: "Abordagem clínica para cada sistema do corpo humano",
    icone: "BarChart3",
    cor: "from-sky-50 to-blue-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Sistema Digestório — Abordagem Clínica",
        descricao: "Dispepsia, gastrite, constipação e diarreia",
        duracaoMinutos: 150,
        conteudo: `# Sistema Digestório — Abordagem Clínica

| Problema | Plantas Indicadas | Preparação | Observações |
|---|---|---|---|
| **Dispepsia** | Hortelã, Erva-doce, Camomila | Infusão pós-refeição | Evitar em refluxo |
| **Gastrite** | Espinheira-santa, Camomila, Malva | Infusão ou tintura | Associar a dieta |
| **Prisão de ventre** | Sene, Cáscara-sagrada | Decocção | Uso esporádico |
| **Diarreia** | Goiabeira (folhas), Romã (casca) | Decocção | Hidratação adequada |

> A abordagem clínica considera o quadro completo do paciente, não apenas o sintoma isolado.`
      },
      {
        titulo: "Sistema Respiratório — Abordagem Clínica",
        descricao: "Tosse seca, produtiva, sinusite e gripe",
        duracaoMinutos: 150,
        conteudo: `# Sistema Respiratório — Abordagem Clínica

| Problema | Plantas Indicadas | Preparação | Observações |
|---|---|---|---|
| **Tosse seca** | Alteia, Malva, Marshmallow | Infusão, xarope | Acalma irritação |
| **Tosse produtiva** | Guaco, Eucalipto, Hortelã | Xarope, inalação | Fluidifica secreções |
| **Sinusite** | Eucalipto, Hortelã, Alecrim | Inalação, vapor | Descongestionante |
| **Gripe/resfriado** | Sabugueiro, Equinácea, Gengibre | Infusão, tintura | Início dos sintomas |

> A fitoterapia no sistema respiratório é especialmente eficaz quando iniciada nos primeiros sinais dos sintomas.`
      },
      {
        titulo: "Sistema Nervoso — Abordagem Clínica",
        descricao: "Ansiedade, insônia e estresse",
        duracaoMinutos: 150,
        conteudo: `# Sistema Nervoso — Abordagem Clínica

| Problema | Plantas Indicadas | Preparação | Observações |
|---|---|---|---|
| **Ansiedade leve** | Erva-cidreira, Camomila, Mulungu | Infusão, tintura | Uso regular |
| **Ansiedade moderada** | Passiflora, Valeriana | Tintura | Avaliar tolerância |
| **Insônia** | Valeriana, Passiflora, Mulungu | Tintura 1h antes de dormir | Evitar telas |
| **Estresse** | Alecrim, Ginseng, Astrágalo | Tintura | Adaptógenos |

> A escolha da planta deve considerar a intensidade do quadro e a resposta individual do paciente.`
      },
      {
        titulo: "Sistema Imunológico — Abordagem Clínica",
        descricao: "Prevenção, infecções e imunidade baixa",
        duracaoMinutos: 120,
        conteudo: `# Sistema Imunológico — Abordagem Clínica

| Problema | Plantas Indicadas | Preparação | Observações |
|---|---|---|---|
| **Prevenção de gripes** | Equinácea, Sabugueiro, Astrágalo | Tintura | Iniciar antes do inverno |
| **Infecções** | Alho, Própolis, Melaleuca | In natura, tintura | Associar a tratamento médico |
| **Imunidade baixa** | Ginseng, Astrágalo, Equinácea | Tintura, cápsulas | Ciclos de uso |

> O fortalecimento imunológico com plantas deve ser feito em ciclos, com períodos de pausa.`
      },
      {
        titulo: "Sistema Circulatório — Abordagem Clínica",
        descricao: "Circulação, hipertensão leve e varizes",
        duracaoMinutos: 120,
        conteudo: `# Sistema Circulatório — Abordagem Clínica

| Problema | Plantas Indicadas | Preparação | Observações |
|---|---|---|---|
| **Má circulação** | Castanha-da-índia, Ginkgo, Alecrim | Tintura, cápsulas | Associar a exercícios |
| **Hipertensão leve** | Alho, Oliveira (folhas), Espinheiro | Infusão, tintura | Monitorar pressão |
| **Varizes** | Castanha-da-índia, Hamamélis | Tópico, tintura | Compressas frias |

> Tratamentos circulatórios com plantas devem sempre ser acompanhados de mudanças no estilo de vida.`
      },
      {
        titulo: "Sistema Urinário — Abordagem Clínica",
        descricao: "Infecção urinária, cálculos e retenção de líquidos",
        duracaoMinutos: 120,
        conteudo: `# Sistema Urinário — Abordagem Clínica

| Problema | Plantas Indicadas | Preparação | Observações |
|---|---|---|---|
| **Infecção urinária** | Uva-ursina, Quebra-pedra, Salsa | Decocção, tintura | Associar a água |
| **Cálculos renais** | Quebra-pedra, Cabelo-de-milho | Decocção | Acompanhamento médico |
| **Retenção de líquidos** | Cavalinha, Dente-de-leão, Salsa | Decocção | Não usar por longos períodos |

> O sistema urinário exige especial atenção à hidratação durante o tratamento fitoterápico.`,
        checklist: [
          "Sei indicar plantas para cada sistema corporal",
          "Conheço as preparações adequadas por sistema",
          "Entendo a importância da abordagem clínica integrada"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 7 — FITOTERAPIA PARA GRUPOS ESPECÍFICOS (10h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Fitoterapia para Grupos Específicos",
    descricao: "Gestação, lactação, pediatria e idosos",
    icone: "Heart",
    cor: "from-blue-50 to-indigo-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Gestação e Lactação",
        descricao: "Plantas seguras e contraindicadas por trimestre",
        duracaoMinutos: 200,
        conteudo: `# Fitoterapia na Gestação e Lactação

## Por Trimestre

| Trimestre | Plantas Seguras | Plantas Contraindicadas | Cuidados |
|---|---|---|---|
| **1º trimestre** | Camomila, Gengibre (náusea) | Artemísia, Arruda, Sene, Aloés | Apenas com orientação |
| **2º trimestre** | Hortelã, Erva-cidreira | Plantas emenagogas | Evitar óleos essenciais |
| **3º trimestre** | Framboesa (folhas) | Ruibarbo, Sene | Preparação para parto |

⚠️ Durante a gestação, QUALQUER uso de plantas deve ter orientação profissional.

> A segurança da gestante e do bebê é sempre a prioridade absoluta.`,
        quiz: [
          {
            pergunta: "Qual planta pode ser usada no 1º trimestre para náusea?",
            opcoes: ["Artemísia", "Sene", "Gengibre", "Arruda"],
            respostaCorreta: 2,
            explicacao: "O gengibre é considerado seguro para náusea no primeiro trimestre, com orientação profissional."
          }
        ]
      },
      {
        titulo: "Pediatria",
        descricao: "Plantas seguras por faixa etária e dosagens infantis",
        duracaoMinutos: 150,
        conteudo: `# Fitoterapia em Pediatria

## Por Faixa Etária

| Idade | Plantas Seguras | Dosagem | Cuidados |
|---|---|---|---|
| **0-6 meses** | Apenas uso externo (camomila no banho) | — | Evitar qualquer ingestão |
| **6 meses - 2 anos** | Camomila, Erva-doce (fracas) | 1/4 da dose adulta | Diluir bem |
| **2-6 anos** | Camomila, Hortelã, Erva-cidreira | 1/3 da dose adulta | Observar reações |
| **6-12 anos** | Maioria das plantas | 1/2 dose adulta | Avaliar tolerância |

❌ Nunca administrar óleos essenciais puros para crianças.

> Em pediatria, a regra é: menos é mais. Sempre iniciar com doses mínimas.`
      },
      {
        titulo: "Idosos",
        descricao: "Polifarmácia, interações e cuidados especiais",
        duracaoMinutos: 150,
        conteudo: `# Fitoterapia para Idosos

## Cuidados Especiais

| Aspecto | Cuidados |
|---|---|
| **Polifarmácia** | Maior risco de interações medicamentosas |
| **Função hepática/renal** | Redução da capacidade de metabolização |
| **Plantas sedativas** | Risco de quedas |
| **Plantas hipotensoras** | Risco de hipotensão postural |

### Recomendações

- Sempre revisar todos os medicamentos em uso
- Iniciar com doses menores que a dose adulta padrão
- Monitorar efeitos colaterais com mais frequência
- Preferir plantas com perfil de segurança bem estabelecido

> O idoso requer atenção redobrada devido às alterações fisiológicas e ao uso simultâneo de múltiplos medicamentos.`,
        checklist: [
          "Sei quais plantas são seguras na gestação",
          "Conheço as dosagens pediátricas",
          "Entendo os cuidados especiais com idosos"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 8 — CONTROLE DE QUALIDADE (8h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Controle de Qualidade",
    descricao: "Identificação botânica, análises e controle de contaminantes",
    icone: "Target",
    cor: "from-indigo-50 to-violet-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Identificação Botânica",
        descricao: "Técnicas macroscópicas, microscópicas e químicas",
        duracaoMinutos: 120,
        conteudo: `# Identificação Botânica

## Técnicas de Identificação

| Técnica | Descrição |
|---|---|
| **Identificação macroscópica** | Observação de forma, cor, textura, odor |
| **Identificação microscópica** | Análise de estruturas celulares |
| **Comparação com exsicatas** | Amostras de herbário para referência |
| **Análise química** | Identificação de marcadores químicos |

> A identificação correta é o primeiro e mais importante passo no controle de qualidade.

### Por que é essencial?

- Evitar confusão entre espécies semelhantes
- Garantir que a planta correta está sendo utilizada
- Prevenir intoxicações por plantas tóxicas
- Assegurar a eficácia terapêutica`
      },
      {
        titulo: "Controle na Produção",
        descricao: "Parâmetros de matéria-prima, extração e produto final",
        duracaoMinutos: 120,
        conteudo: `# Controle de Qualidade na Produção

## Etapas e Parâmetros

| Etapa | Parâmetros Avaliados |
|---|---|
| **Matéria-prima** | Identidade, pureza, teores de princípios ativos |
| **Processo de extração** | Temperatura, tempo, proporção solvente/planta |
| **Produto final** | Concentração, estabilidade, contaminantes |

### Boas Práticas de Fabricação (BPF)

- Documentação de todos os processos
- Rastreabilidade de lotes
- Controle ambiental (temperatura, umidade)
- Equipamentos calibrados e validados
- Treinamento contínuo da equipe

> As BPF garantem que cada lote produzido tenha a mesma qualidade e eficácia.`
      },
      {
        titulo: "Contaminantes e Adulterações",
        descricao: "Tipos de contaminantes, origens e como evitá-los",
        duracaoMinutos: 120,
        conteudo: `# Contaminantes e Adulterações

## Tipos de Contaminantes

| Tipo | Origem | Como Evitar |
|---|---|---|
| **Agrotóxicos** | Cultivo convencional | Cultivo orgânico, análise laboratorial |
| **Metais pesados** | Solo contaminado | Análise de solo, fontes certificadas |
| **Micro-organismos** | Colheita/armazenamento inadequados | Boas práticas, controle de umidade |
| **Adulteração** | Mistura com outras espécies | Identificação botânica rigorosa |

⚠️ Produtos adulterados representam risco à saúde e são crime contra o consumidor.

> Comprar de fornecedores certificados e realizar análises periódicas é essencial para a segurança.`,
        quiz: [
          {
            pergunta: "Qual a melhor forma de evitar contaminação por agrotóxicos?",
            opcoes: ["Usar mais água na lavagem", "Cultivo orgânico e análise laboratorial", "Aumentar a secagem", "Armazenar por mais tempo"],
            respostaCorreta: 1,
            explicacao: "O cultivo orgânico elimina o uso de agrotóxicos, e a análise laboratorial confirma a ausência de resíduos."
          }
        ],
        checklist: [
          "Conheço as técnicas de identificação botânica",
          "Sei os parâmetros de controle de qualidade",
          "Entendo os riscos de contaminantes e adulterações"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 9 — SEGURANÇA E INTERAÇÕES (10h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Segurança e Interações",
    descricao: "Princípios de segurança, contraindicações e interações medicamentosas",
    icone: "MessageCircle",
    cor: "from-violet-50 to-purple-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Princípios de Segurança",
        descricao: "Dosagem, individualidade biológica e qualidade",
        duracaoMinutos: 150,
        conteudo: `# Princípios de Segurança em Fitoterapia

## Os 4 Pilares

| Princípio | Descrição |
|---|---|
| **Dosagem** | "A dose faz o veneno" — Paracelso |
| **Individualidade biológica** | Cada pessoa reage de forma diferente |
| **Qualidade da matéria-prima** | Produto de má qualidade pode ser tóxico |
| **Interações** | Plantas podem interagir com medicamentos |

> "Primum non nocere" — Em primeiro lugar, não causar dano. Este é o princípio fundamental de qualquer prática terapêutica.

### Regras de Ouro

- Nunca exceder dosagens recomendadas
- Sempre investigar alergias
- Conhecer os medicamentos do paciente
- Preferir plantas com perfil de segurança estabelecido`
      },
      {
        titulo: "Contraindicações Gerais",
        descricao: "Gestantes, lactantes, crianças e condições hepáticas/renais",
        duracaoMinutos: 150,
        conteudo: `# Contraindicações Gerais

## Por Condição

| Condição | Plantas a Evitar |
|---|---|
| **Gestantes** | Plantas emenagogas, abortivas, estimulantes uterinos |
| **Lactantes** | Plantas que passam para o leite |
| **Crianças** | Óleos essenciais concentrados, plantas muito ativas |
| **Doenças hepáticas** | Plantas hepatotóxicas |
| **Doenças renais** | Plantas nefrotóxicas |

### Sinais de Alerta

❌ Náuseas ou vômitos após uso
❌ Reações cutâneas (vermelhidão, coceira)
❌ Alteração da pressão arterial
❌ Sonolência excessiva

> Orientar o paciente sobre sinais de alerta é responsabilidade do fitoterapeuta.`
      },
      {
        titulo: "Interações Medicamentosas",
        descricao: "Principais interações entre plantas e medicamentos",
        duracaoMinutos: 180,
        conteudo: `# Interações Medicamentosas

## Principais Interações

| Planta | Medicamento | Efeito da Interação |
|---|---|---|
| **Hipérico (Erva-de-São-João)** | Anticoncepcionais, anticoagulantes | Reduz eficácia |
| **Ginkgo biloba** | Anticoagulantes | Aumenta risco de sangramento |
| **Alho** | Anticoagulantes | Potencializa efeito |
| **Ginseng** | Cafeína | Superestimulação |
| **Valeriana** | Benzodiazepínicos | Potencializa sedação |

⚠️ O hipérico é a planta com mais interações documentadas e deve ser usada com extrema cautela.

> Sempre perguntar sobre TODOS os medicamentos em uso antes de indicar qualquer planta.`,
        quiz: [
          {
            pergunta: "Qual planta pode reduzir a eficácia de anticoncepcionais?",
            opcoes: ["Camomila", "Hipérico (Erva-de-São-João)", "Valeriana", "Erva-cidreira"],
            respostaCorreta: 1,
            explicacao: "O hipérico é indutor enzimático e pode reduzir a eficácia de anticoncepcionais e anticoagulantes."
          }
        ],
        checklist: [
          "Conheço os princípios de segurança",
          "Sei as contraindicações gerais",
          "Domino as principais interações medicamentosas"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 10 — PRESCRIÇÃO E ORIENTAÇÃO (10h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Prescrição e Orientação",
    descricao: "Limites de atuação, anamnese e acompanhamento",
    icone: "GraduationCap",
    cor: "from-purple-50 to-fuchsia-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Limites de Atuação Profissional",
        descricao: "O que pode e o que não pode fazer o fitoterapeuta",
        duracaoMinutos: 150,
        conteudo: `# Limites de Atuação Profissional

## O que PODE e NÃO PODE

| ✅ PODE | ❌ NÃO PODE |
|---|---|
| Indicar plantas para suporte terapêutico | Diagnosticar doenças |
| Orientar sobre uso seguro | Substituir tratamento médico |
| Sugerir mudanças no estilo de vida | Afirmar que plantas curam doenças |
| Preparar fitoterápicos | Garantir resultados específicos |

> Conhecer os limites da atuação é tão importante quanto conhecer as plantas.

### Princípio Fundamental

O fitoterapeuta é um facilitador da saúde. Ele orienta, sugere e acompanha, mas não substitui o médico nem outros profissionais de saúde.`
      },
      {
        titulo: "Estrutura da Consulta e Anamnese",
        descricao: "Como conduzir uma consulta fitoterápica completa",
        duracaoMinutos: 180,
        conteudo: `# Estrutura da Consulta

## Etapas

| Etapa | Objetivo |
|---|---|
| **Anamnese** | Coletar informações sobre saúde, medicamentos, queixas |
| **Avaliação** | Identificar necessidades e possíveis contraindicações |
| **Orientação** | Sugerir plantas, formas de uso, dosagens |
| **Acompanhamento** | Avaliar resultados, ajustar conduta |

## Ficha de Anamnese — Itens Essenciais

### Identificação
- Nome, idade, profissão
- Medicamentos em uso
- Condições de saúde

### Histórico
- Principal queixa e há quanto tempo
- Tratamentos já realizados
- Histórico de alergias

### Hábitos
- Alimentação, sono, estresse (0-10)
- Tabagismo/álcool

### Para Mulheres
- Gestante/lactante?
- Ciclo menstrual regular?
- Uso de anticoncepcional?

> Uma anamnese bem feita é a base para uma orientação fitoterápica segura e eficaz.`,
        quiz: [
          {
            pergunta: "Qual é a primeira etapa de uma consulta fitoterápica?",
            opcoes: ["Orientação", "Anamnese", "Prescrição", "Acompanhamento"],
            respostaCorreta: 1,
            explicacao: "A anamnese é a primeira e mais importante etapa, onde se coleta todas as informações do paciente."
          }
        ]
      },
      {
        titulo: "Acompanhamento do Paciente",
        descricao: "Avaliação de resultados, ajustes e retorno",
        duracaoMinutos: 120,
        conteudo: `# Acompanhamento do Paciente

## Protocolo de Acompanhamento

- **1ª semana:** Contato para verificar tolerância
- **2ª a 4ª semana:** Avaliar resposta inicial
- **30 dias:** Retorno presencial para reavaliação
- **60-90 dias:** Avaliação de resultados a médio prazo

### O que avaliar no retorno

- [ ] Melhora dos sintomas principais
- [ ] Efeitos colaterais
- [ ] Adesão ao tratamento
- [ ] Necessidade de ajuste de dosagem
- [ ] Necessidade de trocar a planta

> O acompanhamento é o que diferencia o fitoterapeuta profissional do conselheiro informal.`,
        checklist: [
          "Sei os limites da minha atuação",
          "Domino a estrutura de consulta",
          "Sei conduzir uma anamnese completa",
          "Conheço o protocolo de acompanhamento"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 11 — FITOTERAPIA NO SUS - FARMÁCIAS VIVAS (8h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Fitoterapia no SUS — Farmácias Vivas",
    descricao: "Programa Farmácias Vivas e cursos do Ministério da Saúde",
    icone: "BookOpen",
    cor: "from-fuchsia-50 to-pink-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "O Programa Farmácias Vivas",
        descricao: "Hortos medicinais, laboratórios e dispensação no SUS",
        duracaoMinutos: 240,
        conteudo: `# Fitoterapia no SUS — Farmácias Vivas

## O que são Farmácias Vivas

Farmácias Vivas são programas do SUS que integram o cultivo, processamento e dispensação de plantas medicinais e fitoterápicos. São certificadas pela OPAS/OMS como referência em fitoterapia.

## Componentes do Programa

| Componente | Descrição |
|---|---|
| **Horto medicinal** | Cultivo de plantas medicinais |
| **Laboratório de manipulação** | Produção de fitoterápicos |
| **Dispensação** | Distribuição para a população |
| **Capacitação** | Formação de profissionais de saúde |

> As Farmácias Vivas democratizam o acesso a fitoterápicos de qualidade no Brasil.

### Impacto Social

- Acesso gratuito a fitoterápicos
- Valorização do conhecimento tradicional
- Geração de emprego e renda
- Uso sustentável da biodiversidade`
      },
      {
        titulo: "Cursos do Ministério da Saúde",
        descricao: "Capacitações disponíveis para profissionais do SUS",
        duracaoMinutos: 180,
        conteudo: `# Cursos do Ministério da Saúde

## Capacitações Disponíveis

| Curso | Público-Alvo | Carga Horária | Conteúdo |
|---|---|---|---|
| **Harmonizando Conceitos** | Profissionais de saúde | Variável | Sensibilização para fitoterapia no SUS |
| **Aspectos Farmacêuticos** | Farmacêuticos | 90h | Fitoquímica, farmacologia |
| **Aspectos Clínicos** | Médicos, enfermeiros | 180h | Manejo clínico baseado em evidências |
| **Formação em Farmácia Viva** | Trabalhadores do SUS | 28h | Cultivo, colheita, preparação |
| **Da Semente ao Paciente** | Trabalhadores do SUS | 40h | Cadeia completa da fitoterapia |

> A capacitação contínua é fundamental para a expansão segura da fitoterapia no SUS.`
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 12 — ÉTICA, LEGISLAÇÃO E MERCADO (8h · 3 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Ética, Legislação e Mercado",
    descricao: "Código de ética, ANVISA, formalização e oportunidades de negócio",
    icone: "BarChart3",
    cor: "from-pink-50 to-rose-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Código de Ética do Fitoterapeuta",
        descricao: "Princípios éticos fundamentais da prática fitoterápica",
        duracaoMinutos: 120,
        conteudo: `# Código de Ética do Fitoterapeuta

## Princípios Fundamentais

| Princípio | Aplicação |
|---|---|
| **Beneficência** | Agir no melhor interesse do cliente |
| **Não-maleficência** | Conhecer contraindicações e interações |
| **Autonomia** | Respeitar a decisão do cliente |
| **Confidencialidade** | Manter sigilo das informações |
| **Competência** | Atuar dentro dos limites do conhecimento |

> A ética profissional é a base de uma prática fitoterápica respeitável e confiável.`
      },
      {
        titulo: "Legislação ANVISA e Formalização",
        descricao: "Normas de registro, boas práticas e modalidades de trabalho",
        duracaoMinutos: 150,
        conteudo: `# Legislação e Formalização

## ANVISA

| Aspecto | Exigência |
|---|---|
| **Registro de fitoterápicos** | RDC 26/2014 |
| **Notificação de produtos tradicionais** | Categoria mais simples |
| **Boas práticas de fabricação** | RDC 18/2013 |
| **Rotulagem** | Informações obrigatórias |

## Formalização Profissional

| Modalidade | Quando Indicar |
|---|---|
| **MEI** | Para quem vai comercializar produtos |
| **Autônomo** | Para atendimento sem venda de produtos |
| **Pessoa Jurídica** | Para produção em maior escala, loja física |

> Formalizar-se é essencial para atuar com segurança jurídica e profissionalismo.`
      },
      {
        titulo: "Oportunidades de Negócio",
        descricao: "Segmentos de mercado e estratégias de atuação",
        duracaoMinutos: 120,
        conteudo: `# Oportunidades de Negócio em Fitoterapia

## Segmentos

| Segmento | Descrição |
|---|---|
| **Produção de fitoterápicos** | Manipulação, industrialização |
| **Loja de produtos naturais** | Varejo |
| **Consultório** | Atendimento particular |
| **Oficinas e cursos** | Educação continuada |
| **Consultoria para empresas** | Implantação de programas de bem-estar |
| **Farmácias Vivas** | Parcerias com poder público |

> O mercado de fitoterapia movimenta bilhões anualmente e está em constante crescimento.

### Dicas para Empreender

- Identifique uma necessidade na sua região
- Comece com baixo investimento
- Invista em qualificação contínua
- Crie uma marca pessoal sólida
- Use as redes sociais para educar e vender`,
        quiz: [
          {
            pergunta: "Qual modalidade de formalização é mais indicada para quem vai comercializar produtos?",
            opcoes: ["Autônomo", "MEI", "Profissional liberal", "Freelancer"],
            respostaCorreta: 1,
            explicacao: "O MEI é a modalidade mais indicada para quem vai comercializar produtos fitoterápicos."
          }
        ],
        checklist: [
          "Conheço o código de ética",
          "Sei as normas da ANVISA",
          "Entendo as opções de formalização",
          "Conheço as oportunidades de mercado"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 13 — BÔNUS E EXPANSÃO (4h · 2 aulas)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Bônus e Expansão",
    descricao: "Diversificação, fornecedores, materiais de consulta e certificação",
    icone: "GraduationCap",
    cor: "from-rose-50 to-orange-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Diversificação de Atuação",
        descricao: "Áreas complementares: cosmética, nutracêuticos, aromaterapia",
        duracaoMinutos: 120,
        conteudo: `# Diversificação de Atuação

## Áreas Complementares

| Área | Possibilidades |
|---|---|
| **Cosmética natural** | Cremes, sabonetes, loções com ativos vegetais |
| **Nutracêuticos** | Suplementos alimentares funcionais |
| **Aromaterapia** | Óleos essenciais, sinergias |
| **Fitoenergética** | Abordagem integrativa |
| **Fitoterapia xamânica** | Tradições ancestrais |

> Diversificar é expandir possibilidades de atuação e receita.

### Como Diversificar

- Identifique áreas complementares ao seu perfil
- Invista em formação específica
- Comece com uma área de cada vez
- Crie sinergias entre as áreas`
      },
      {
        titulo: "Bônus Exclusivos e Certificação",
        descricao: "Materiais de apoio, fornecedores e certificado de conclusão",
        duracaoMinutos: 120,
        conteudo: `# Bônus Exclusivos e Certificação

## Materiais Inclusos

| Bônus | Descrição |
|---|---|
| **Lista de fornecedores verificados** | Qualidade garantida |
| **Tabela de interações medicamentosas** | Consulta rápida |
| **Modelo de ficha de anamnese** | Prontidão para atendimento |
| **Planilha de custos para produção** | Controle financeiro |
| **Monografias das principais plantas** | Material de consulta |

## Certificação

Ao finalizar o curso, o aluno recebe certificado de conclusão, podendo:

✅ Comprovar horas extracurriculares
✅ Enriquecer currículo
✅ Atuar como fitoterapeuta (respeitando limites legais)

> Parabéns por chegar até aqui! Você agora tem as ferramentas para atuar com fitoterapia de forma segura, ética e baseada em evidências.`,
        checklist: [
          "Explorei as áreas de diversificação",
          "Conheço os materiais de apoio disponíveis",
          "Estou pronto para atuar como fitoterapeuta"
        ]
      }
    ]
  }
];
