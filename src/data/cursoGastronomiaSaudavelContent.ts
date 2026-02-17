import type { CursoModuloData } from "@/components/curso/CursoShell";

export const cursoGastronomiaSaudavelData: CursoModuloData[] = [
  // ── Módulo 1: Fundação ──
  {
    titulo: "Módulo 1 — Fundação",
    descricao: "O universo da gastronomia saudável",
    icone: "Lightbulb",
    cor: "from-green-500/10 to-lime-500/10",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "1.1 O que é Gastronomia Saudável",
        descricao: "Definição, diferenças entre saudável, fitness e funcional",
        duracaoMinutos: 60,
        conteudo: `# O que é Gastronomia Saudável

## Definição

A gastronomia saudável vai além da simples preparação de alimentos. Ela representa uma abordagem holística que ao mesmo tempo valoriza o sabor, a nutrição e o bem-estar integral. Enquanto a culinária tradicional frequentemente se concentra principalmente no prazer imediato do paladar, essa metodologia inovadora visa desenvolver preparações que não somente satisfaçam o apetite, mas também promovam ativamente a saúde e o equilíbrio fisiológico.

## Gastronomia Saudável vs. Culinária Tradicional

| Aspecto | Gastronomia Saudável | Culinária Tradicional |
|---|---|---|
| **Foco principal** | Saúde + sabor | Sabor predominante |
| **Ingredientes** | Naturais, integrais, minimamente processados | Pode incluir ultraprocessados livremente |
| **Técnicas de preparo** | Preservação de nutrientes (vapor, assados) | Frituras, cozimentos prolongados |
| **Consciência nutricional** | Alta — considera biodisponibilidade | Baixa a moderada |
| **Restrições alimentares** | Naturalmente adaptável | Requer adaptações específicas |
| **Sustentabilidade** | Valoriza ingredientes locais e sazonais | Nem sempre considera |

## Diferença entre Gastronomia Saudável, Fitness e Funcional

| Termo | Definição | Foco Principal |
|---|---|---|
| **Gastronomia Saudável** | Alimentação equilibrada com ingredientes naturais e técnicas que preservam nutrientes | Bem-estar geral e prevenção |
| **Culinária Fitness** | Voltada para desempenho físico, ganho muscular e controle de peso | Performance e estética |
| **Gastronomia Funcional** | Utiliza alimentos que oferecem benefícios específicos à saúde além da nutrição básica, ajudando a prevenir doenças, melhorar a digestão e fortalecer o sistema imunológico | Prevenção e tratamento de doenças |`,
        quiz: [
          {
            pergunta: "Qual a principal diferença entre gastronomia saudável e fitness?",
            opcoes: ["Não há diferença", "Saudável foca em equilíbrio e naturalidade; fitness foca em performance física", "Fitness é mais saudável", "Saudável não tem sabor"],
            respostaCorreta: 1,
            explicacao: "A gastronomia saudável busca equilíbrio nutricional com prazer, enquanto a fitness foca em performance e controle de macronutrientes.",
          },
        ],
      },
      {
        titulo: "1.2 História e Mercado",
        descricao: "Evolução da alimentação, cenário brasileiro e tendências",
        duracaoMinutos: 60,
        conteudo: `# História e Mercado da Gastronomia Saudável

## Evolução Histórica

| Período | Evento/Contribuição | Impacto |
|---|---|---|
| **Antiguidade** | Hipócrates: "Que teu alimento seja teu medicamento" | Base da relação entre comida e saúde |
| **Século XIX** | Movimentos higienistas na Europa | Primeiras preocupações com qualidade dos alimentos |
| **Década de 1960** | Contracultura e movimentos naturais | Valorização de alimentos orgânicos e integrais |
| **Década de 1990** | Conceito de alimentos funcionais no Japão | Alimentos com benefícios específicos à saúde |
| **Anos 2000** | Guias alimentares oficiais (Brasil, 2006/2014) | Recomendações baseadas em evidências |
| **2015-2025** | Boom dos alimentos funcionais e personalizados | Mercado em expansão, produtos inovadores |

## O Mercado no Brasil

| Dado | Fonte | Implicação |
|---|---|---|
| Mercado movimenta **R$ 10 bilhões/ano** | ABENUTRI | Oportunidade enorme para produtos saudáveis |
| Crescimento de **8% no último ano** | ABENUTRI | Mercado em expansão acelerada |
| **20 fusões e aquisições** no setor (2023-2025) | Redirection International | Consolidação e profissionalização do setor |
| Consumo per capita de ovos: **263 unidades/ano** (+8,5%) | ABPA | Aumento do consumo de proteínas |

## Principais Tendências

| Tendência | Descrição | Oportunidade |
|---|---|---|
| **Alimentos com propósito** | Proteínas, colágeno, adaptógenos, superfoods | Desenvolver linhas funcionais |
| **Grab & go saudável** | Prontos para consumo imediato, práticos e nutritivos | Marmitas, saladas, sanduíches naturais |
| **Superfoods brasileiras** | Açaí, camu-camu, castanha-do-pará, ora-pro-nóbis | Valorização de ingredientes nacionais |
| **Adaptógenos** | Substâncias para lidar com estresse | Bebidas funcionais, shots |
| **Upcycling alimentar** | Reaproveitamento de cascas, talos e sementes | Farinhas, snacks, redução de desperdício |
| **Probióticos e fibras** | Saúde intestinal e imunidade | Kefir, kombucha, pães de fermentação natural |
| **Menos conservantes** | Consumidores leem rótulos e buscam clean label | Rotulagem transparente |

## Perfil do Consumidor

| Perfil | Características | Oportunidade |
|---|---|---|
| **Saúde-consciente** | Busca bem-estar e longevidade | Cardápios funcionais |
| **Prático e saudável** | Rotina agitada, quer comer bem sem perder tempo | Marmitas, delivery, congelados |
| **Sustentável** | Valoriza origem local, orgânicos | Parcerias com produtores locais |
| **Experiencial** | Busca novas experiências gastronômicas | Workshops, eventos, food experiences |`,
        quiz: [
          {
            pergunta: "Quanto o mercado de alimentação saudável movimenta por ano no Brasil?",
            opcoes: ["R$ 1 bilhão", "R$ 10 bilhões", "R$ 100 bilhões", "R$ 500 milhões"],
            respostaCorreta: 1,
            explicacao: "O mercado de vitaminas, suplementos e nutrição movimenta R$ 10 bilhões por ano segundo a ABENUTRI.",
          },
        ],
      },
      {
        titulo: "1.3 Guia Alimentar e Saídas Profissionais",
        descricao: "Referências oficiais e caminhos de carreira",
        duracaoMinutos: 60,
        conteudo: `# Guia Alimentar e Saídas Profissionais

## O Guia Alimentar para a População Brasileira

O Guia Alimentar do Ministério da Saúde classifica os alimentos em quatro categorias:

| Categoria | Exemplos | Recomendação |
|---|---|---|
| **In natura** | Vegetais, frutas, ovos, carnes | Base da alimentação |
| **Minimamente processados** | Arroz, feijão, farinhas, leite | Base da alimentação |
| **Processados** | Queijos, pães, conservas | Consumo moderado |
| **Ultraprocessados** | Refrigerantes, salgadinhos, macarrão instantâneo | Evitar |

> **Regra de Ouro:** "Prefira sempre alimentos in natura ou minimamente processados e preparações culinárias a alimentos ultraprocessados."

## Saídas Profissionais

| Profissão | Descrição | Onde Atuar |
|---|---|---|
| **Personal Chef Saudável** | Cozinha personalizada para clientes | Domicílios, eventos privados |
| **Restaurante ou Café Saudável** | Estabelecimento próprio | Food service |
| **Marmitas e Delivery Saudável** | Produção e entrega de refeições | Delivery, dark kitchens |
| **Produtor de Alimentos Funcionais** | Desenvolvimento de linha própria | Lojas, marketplaces |
| **Consultor em Alimentação Saudável** | Assessoria para restaurantes | Food service |
| **Educador / Instrutor de Cursos** | Ensino de gastronomia saudável | Escolas, cursos online |
| **Chef Institucional** | Cozinha em spas, hospitais, empresas | Bem-estar corporativo |`,
      },
    ],
  },

  // ── Módulo 2: Nutrição Aplicada ──
  {
    titulo: "Módulo 2 — Nutrição Aplicada",
    descricao: "Macronutrientes, micronutrientes e substituições",
    icone: "BookOpen",
    cor: "from-emerald-500/10 to-green-500/10",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "2.1 Macronutrientes e Micronutrientes",
        descricao: "Carboidratos, proteínas, gorduras, vitaminas e minerais",
        duracaoMinutos: 90,
        conteudo: `# Macronutrientes e Micronutrientes

## Macronutrientes

| Macronutriente | Função Principal | Fontes Saudáveis | Porção Ideal no Prato |
|---|---|---|---|
| **Carboidratos** | Energia | Integrais, quinoa, batata-doce, aveia, frutas | 25-30% |
| **Proteínas** | Construção e reparação de tecidos | Carnes magras, ovos, leguminosas, tofu | 25-30% |
| **Gorduras saudáveis** | Hormônios, absorção de vitaminas | Azeite, abacate, castanhas, sementes | 15-20% |

## Micronutrientes Essenciais

| Vitamina/Mineral | Função | Fontes |
|---|---|---|
| **Vitamina C** | Imunidade, absorção de ferro | Frutas cítricas, kiwi, pimentão |
| **Ferro** | Transporte de oxigênio | Carnes, folhas verde-escuras, feijão |
| **Cálcio** | Ossos e dentes | Laticínios, vegetais verde-escuros, gergelim |
| **Zinco** | Imunidade, cicatrização | Castanhas, sementes, carnes |
| **Vitaminas do complexo B** | Energia, metabolismo | Grãos integrais, ovos, leguminosas |`,
        quiz: [
          {
            pergunta: "Qual a proporção recomendada de carboidratos no prato saudável?",
            opcoes: ["10-15%", "25-30%", "50-60%", "Menos de 5%"],
            respostaCorreta: 1,
            explicacao: "A proporção ideal de carboidratos no prato saudável é de 25-30%, priorizando integrais e complexos.",
          },
        ],
      },
      {
        titulo: "2.2 Alimentos Funcionais e Sinergia",
        descricao: "Compostos ativos e combinações que potencializam nutrientes",
        duracaoMinutos: 90,
        conteudo: `# Alimentos Funcionais e Sinergia Alimentar

## Alimentos Funcionais e Seus Benefícios

| Alimento | Composto Ativo | Benefício |
|---|---|---|
| **Cúrcuma** | Curcumina | Anti-inflamatório poderoso |
| **Gengibre** | Gingeróis | Digestão, anti-inflamatório |
| **Linhaça** | Ômega-3, lignanas | Saúde cardiovascular |
| **Aveia** | Beta-glucana | Colesterol, saciedade |
| **Iogurte natural** | Probióticos | Saúde intestinal |
| **Cacau** | Flavonoides | Antioxidante, humor |
| **Chá verde** | Catequinas | Metabolismo, antioxidante |
| **Açaí** | Antocianinas | Antioxidante, energia |
| **Castanha-do-pará** | Selênio | Imunidade, tireoide |

## Sinergia Alimentar

> Algumas combinações potencializam a absorção de nutrientes.

| Combinação | Efeito | Exemplo |
|---|---|---|
| **Ferro + Vitamina C** | Aumenta absorção do ferro | Feijoada + laranja, couve + limão |
| **Cúrcuma + Pimenta-do-reino** | Aumenta biodisponibilidade da curcumina em até 2000% | Curry com pimenta |
| **Gorduras + Vitaminas lipossolúveis** | Absorção de vitaminas A, D, E, K | Salada com azeite |
| **Cálcio + Vitamina D** | Fixação do cálcio | Leite + sol |`,
        quiz: [
          {
            pergunta: "Em quanto a pimenta-do-reino aumenta a absorção da curcumina?",
            opcoes: ["100%", "500%", "Até 2000%", "Não tem efeito"],
            respostaCorreta: 2,
            explicacao: "A piperina da pimenta-do-reino aumenta a biodisponibilidade da curcumina em até 2000%.",
          },
        ],
      },
      {
        titulo: "2.3 Substituições Inteligentes",
        descricao: "Trocas práticas para uma alimentação mais saudável",
        duracaoMinutos: 60,
        conteudo: `# Substituições Inteligentes

## Tabela de Substituições

| Ingrediente Tradicional | Substituição Saudável | Benefício |
|---|---|---|
| Arroz branco | Arroz integral, quinoa, couve-flor ralada | Mais fibras, menor índice glicêmico |
| Farinha de trigo branca | Farinha de aveia, amêndoas, coco | Sem glúten, mais nutrientes |
| Açúcar refinado | Mel, tâmaras, banana madura, açúcar de coco | Menos processado, IG menor |
| Óleo de soja | Azeite, óleo de coco, óleo de abacate | Gorduras mais saudáveis |
| Sal comum | Sal rosa, ervas, especiarias | Menos sódio, mais sabor |

> Substituir não é restringir — é escolher com inteligência!`,
      },
    ],
  },

  // ── Módulo 3: Higiene e Organização ──
  {
    titulo: "Módulo 3 — Higiene e Organização",
    descricao: "Boas práticas, segurança alimentar e organização",
    icone: "Target",
    cor: "from-cyan-500/10 to-teal-500/10",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "3.1 Boas Práticas na Cozinha",
        descricao: "Regras da OMS, contaminação cruzada e higienização",
        duracaoMinutos: 90,
        conteudo: `# Boas Práticas na Cozinha

## Regras de Ouro da OMS

| Regra | Descrição |
|---|---|
| **1. Lave as mãos** | Antes de manipular alimentos e após usar banheiro |
| **2. Separe alimentos crus de cozidos** | Evite contaminação cruzada |
| **3. Cozinhe bem os alimentos** | Especialmente carnes, ovos e frutos do mar |
| **4. Mantenha temperaturas seguras** | Abaixo de 5°C ou acima de 60°C |
| **5. Use água e alimentos seguros** | Ingredientes de qualidade, água potável |

## Contaminação Cruzada — O que Evitar

| Situação de Risco | Como Prevenir |
|---|---|
| Usar mesma tábua para carne e vegetais | Ter tábuas coloridas para cada tipo |
| Guardar alimentos crus sobre cozidos | Organizar geladeira corretamente |
| Manipular alimentos sem lavar as mãos | Higienização constante |
| Utensílios contaminados | Lavar bem entre usos |`,
        quiz: [
          {
            pergunta: "Qual a zona de perigo de temperatura para alimentos?",
            opcoes: ["0°C a 5°C", "5°C a 60°C", "60°C a 100°C", "Abaixo de 0°C"],
            respostaCorreta: 1,
            explicacao: "Entre 5°C e 60°C é a zona de perigo onde as bactérias se multiplicam rapidamente.",
          },
        ],
      },
      {
        titulo: "3.2 Organização de Despensa e Geladeira",
        descricao: "Armazenamento correto e redução de desperdício",
        duracaoMinutos: 60,
        conteudo: `# Organização de Despensa e Geladeira

## Despensa Organizada

| Item | Como Armazenar | Validade |
|---|---|---|
| Grãos e cereais | Potes herméticos, longe da luz | 3-6 meses |
| Farinhas | Potes herméticos, local fresco | 2-3 meses |
| Especiarias | Vidros escuros, longe do calor | 6-12 meses |
| Oleaginosas | Potes fechados, geladeira | 3 meses |

## Geladeira Organizada

| Prateleira | Alimentos | Temperatura |
|---|---|---|
| **Superior** | Laticínios, ovos, frios | 2-4°C |
| **Média** | Carnes cruas (bem vedadas) | 2-4°C |
| **Inferior** | Verduras, legumes | 4-8°C |
| **Gaveta** | Frutas e vegetais | 4-8°C |
| **Porta** | Bebidas, condimentos | 6-10°C |

### Regras de Ouro
- Primeiro que entra, primeiro que sai (PEPS)
- Verificar validade regularmente
- Manter limpa e seca
- Identificar e datar alimentos transferidos

> Nunca guarde alimentos quentes na geladeira — espere esfriar para não alterar a temperatura interna.`,
        checklist: [
          "Despensa organizada por PEPS",
          "Grãos em potes herméticos",
          "Validades verificadas",
          "Geladeira organizada por categoria",
          "Alimentos identificados e datados",
          "Tábuas separadas para carnes e vegetais",
        ],
      },
    ],
  },

  // ── Módulo 4: Técnicas Culinárias ──
  {
    titulo: "Módulo 4 — Técnicas Culinárias",
    descricao: "Cortes, cocção e preservação de nutrientes",
    icone: "Target",
    cor: "from-orange-500/10 to-amber-500/10",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "4.1 Cortes de Vegetais",
        descricao: "Tipos de corte profissional e suas aplicações",
        duracaoMinutos: 90,
        conteudo: `# Cortes de Vegetais

## Principais Cortes

| Corte | Descrição | Aplicação |
|---|---|---|
| **Brunoise** | Cubos pequenos (2-3mm) | Refogados, sopas |
| **Julienne** | Palitos finos | Saladas, wok |
| **Paysanne** | Fatias finas | Sopas, ensopados |
| **Chiffonade** | Folhas em tiras finas | Saladas, finalização |
| **Rondelle** | Fatias redondas | Legumes cozidos |

## Dicas para Cortes Perfeitos

- **Faca afiada** — Cortes precisos, menos oxidação
- **Tábua estável** — Pano úmido embaixo para fixar
- **Uniformidade** — Tamanhos iguais = cocção uniforme
- **Velocidade** — Cortar rápido reduz exposição ao ar

> Vegetais cortados menores cozinham mais rápido, mas perdem mais nutrientes. Equilibre!`,
      },
      {
        titulo: "4.2 Métodos de Cocção Saudáveis",
        descricao: "Vapor, assados, grelhados e técnicas de preservação",
        duracaoMinutos: 120,
        conteudo: `# Métodos de Cocção Saudáveis

## Comparativo de Métodos

| Método | Descrição | Vantagens | Indicação |
|---|---|---|---|
| **Cozimento a vapor** | Cozinhar no vapor sem imersão | Preserva nutrientes e cor | Vegetais, peixes |
| **Assar** | Cozimento no forno | Sem adição de gordura | Carnes, legumes, pães |
| **Grelhar** | Calor direto, superfície quente | Sabor defumado, pouca gordura | Carnes, peixes, vegetais |
| **Saltear** | Cozimento rápido em pouca gordura | Mantém textura crocante | Vegetais, carnes em tiras |
| **Refogar** | Cozimento na própria água, fogo baixo | Sabor concentrado | Legumes, molhos |
| **Branqueamento** | Cozimento rápido em água fervente + choque térmico | Mantém cor e nutrientes | Legumes para congelar, saladas |
| **Caramelizar** | Açúcar em fogo brando até dourar | Sabor adocicado | Cebolas, cenouras |

## Técnicas para Preservar Nutrientes

| Técnica | Recomendação |
|---|---|
| **Cozinhar com casca** | Preserva fibras e vitaminas |
| **Evitar cozimento excessivo** | Mantém nutrientes termossensíveis |
| **Cortar apenas na hora do preparo** | Evita oxidação |
| **Usar pouca água** | Menos perda de vitaminas hidrossolúveis |
| **Aproveitar a água do cozimento** | Para sopas e molhos |

> O vapor é o rei da cozinha saudável: preserva cor, textura, sabor e nutrientes!`,
        quiz: [
          {
            pergunta: "Qual o melhor método de cocção para preservar nutrientes?",
            opcoes: ["Fritura", "Cozimento em bastante água", "Cozimento a vapor", "Micro-ondas"],
            respostaCorreta: 2,
            explicacao: "O cozimento a vapor preserva cor, textura, sabor e praticamente todos os nutrientes dos alimentos.",
          },
        ],
      },
    ],
  },

  // ── Módulo 5: Café da Manhã e Lanches ──
  {
    titulo: "Módulo 5 — Café da Manhã e Lanches",
    descricao: "Princípios e receitas práticas para o dia a dia",
    icone: "Heart",
    cor: "from-yellow-500/10 to-orange-500/10",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "5.1 Princípios do Café da Manhã Saudável",
        descricao: "Componentes essenciais de um café equilibrado",
        duracaoMinutos: 45,
        conteudo: `# Princípios do Café da Manhã Saudável

Um café da manhã equilibrado deve conter:

| Componente | Função | Exemplos |
|---|---|---|
| **Carboidratos complexos** | Energia de liberação lenta | Aveia, pão integral, quinoa |
| **Proteínas** | Saciedade | Ovos, iogurte, queijo, pasta de amendoim |
| **Gorduras boas** | Energia, sabor | Abacate, castanhas, azeite |
| **Frutas** | Vitaminas, fibras | Frutas frescas da estação |`,
      },
      {
        titulo: "5.2 Receitas Práticas",
        descricao: "Muffin de amêndoas, panqueca de banana e crepioca",
        duracaoMinutos: 75,
        conteudo: `# Receitas Práticas para Café da Manhã

## A. Muffin de Amêndoas com Maçã e Canela

| Ingrediente | Quantidade |
|---|---|
| Farinha de amêndoas | 2 xícaras |
| Maçã ralada | 1 unidade |
| Ovos | 3 unidades |
| Mel ou açúcar de coco | 3 colheres |
| Canela | 1 colher chá |
| Fermento | 1 colher chá |

**Modo de fazer:** Misturar todos os ingredientes, colocar em forminhas e assar a 180°C por 20 minutos. Rico em fibras e gorduras boas, sem farinha refinada.

## B. Panquecas de Banana Integral

| Ingrediente | Quantidade |
|---|---|
| Banana madura | 2 unidades |
| Ovos | 2 unidades |
| Aveia em flocos | 1/2 xícara |
| Canela | A gosto |

**Modo de fazer:** Amassar as bananas, misturar os ovos, adicionar aveia e canela. Cozinhar em frigideira antiaderente. Naturalmente adocicado, pronto em poucos minutos.

## C. Crepioca de Frango ao Curry

| Ingrediente | Quantidade |
|---|---|
| Ovos | 2 unidades |
| Goma de tapioca | 2 colheres |
| Frango desfiado | 100g |
| Curry | 1 colher chá |
| Cebolinha | A gosto |

**Modo de fazer:** Misturar ovos e tapioca, cozinhar em frigideira. Rechear com frango temperado com curry. Combina proteína magra e carboidrato leve.`,
        checklist: [
          "Carboidrato complexo no prato",
          "Fonte de proteína incluída",
          "Gordura boa presente",
          "Frutas ou vegetais incluídos",
          "Hidratação (água, chá, suco natural)",
        ],
      },
    ],
  },

  // ── Módulo 6: Almoços e Jantares ──
  {
    titulo: "Módulo 6 — Almoços e Jantares",
    descricao: "Composição do prato saudável e receitas completas",
    icone: "Package",
    cor: "from-red-500/10 to-rose-500/10",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "6.1 Composição do Prato Saudável",
        descricao: "Método Harvard e proporções ideais",
        duracaoMinutos: 60,
        conteudo: `# Composição do Prato Saudável

## O Prato Ideal

| Proporção | Grupo | Exemplos |
|---|---|---|
| **50% do prato** | Vegetais e legumes | Salada (20-25%), legumes (25-30%) |
| **25% do prato** | Proteína | Frango, peixe, ovos, leguminosas |
| **25% do prato** | Carboidrato | Arroz integral, batata-doce, quinoa |
| **+ Complemento** | Gordura boa | Azeite, abacate, castanhas |

> Quanto mais colorido o prato, mais variados os nutrientes!`,
      },
      {
        titulo: "6.2 Receitas Completas",
        descricao: "Cuscuz de quinoa com camarões, peixe de forno e brownie low carb",
        duracaoMinutos: 120,
        conteudo: `# Receitas para Almoço e Jantar

## A. Cuscuz de Quinoa com Abobrinha e Camarões

| Ingrediente | Quantidade |
|---|---|
| Quinoa em flocos | 1 xícara |
| Abobrinha em cubos | 1 unidade |
| Camarões limpos | 200g |
| Alho, cebola, azeite | A gosto |
| Caldo de legumes | 1 xícara |

**Modo de fazer:** Refogar camarões, reservar. Refogar abobrinha, adicionar quinoa e caldo. Cozinhar até absorver. Finalizar com camarões. Colorido, nutritivo e leve.

## B. Filé de Peixe de Forno com Legumes Salteados

| Ingrediente | Quantidade |
|---|---|
| Filé de peixe (pescada, tilápia) | 4 unidades |
| Legumes variados | A gosto |
| Ervas frescas | Alecrim, tomilho |
| Azeite | 3 colheres |
| Sal, pimenta | A gosto |

**Modo de fazer:** Temperar o peixe com ervas, assar em forno médio por 15-20 minutos. Saltear legumes rapidamente. Servir com azeite de ervas. Prato equilibrado e funcional.

## C. Brownie Low Carb

| Ingrediente | Quantidade |
|---|---|
| Cacau em pó | 1/2 xícara |
| Farinha de amêndoas | 1 xícara |
| Ovos | 3 unidades |
| Mel ou xilitol | 1/2 xícara |
| Manteiga ou óleo de coco | 1/2 xícara |

**Modo de fazer:** Misturar todos os ingredientes, assar em forma untada a 180°C por 25 minutos. Mostra que é possível comer bem e com prazer, com ingredientes funcionais.`,
        quiz: [
          {
            pergunta: "Qual proporção do prato deve ser de vegetais e legumes?",
            opcoes: ["25%", "50%", "75%", "100%"],
            respostaCorreta: 1,
            explicacao: "Metade do prato (50%) deve ser composta por vegetais e legumes, garantindo fibras, vitaminas e minerais.",
          },
        ],
      },
    ],
  },

  // ── Módulo 7: Públicos Específicos ──
  {
    titulo: "Módulo 7 — Públicos Específicos",
    descricao: "Infantil, vegetariano, low carb e restrições",
    icone: "Heart",
    cor: "from-purple-500/10 to-violet-500/10",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "7.1 Alimentação Infantil",
        descricao: "Estratégias e receitas para crianças",
        duracaoMinutos: 60,
        conteudo: `# Alimentação Infantil Saudável

## Estratégias

| Estratégia | Descrição |
|---|---|
| **Apresentação lúdica** | Comidas em formatos divertidos |
| **Envolvimento da criança** | Deixar ajudar no preparo |
| **Introdução gradual** | Novos alimentos aos poucos |
| **Lancheira saudável** | Opções nutritivas para escola |

## Receita: Lancheira Saudável

- Sanduíche de pão integral com pasta de grão-de-bico
- Palitos de cenoura e pepino
- Fruta picada
- Iogurte natural

> Crianças comem com os olhos. Invista em cores e apresentação!`,
      },
      {
        titulo: "7.2 Vegetariano, Vegano e Low Carb",
        descricao: "Nutrientes críticos e adaptações",
        duracaoMinutos: 60,
        conteudo: `# Alimentação Vegetariana, Vegana e Low Carb

## Vegetariano e Vegano — Nutrientes Críticos

| Nutriente Crítico | Fontes Vegetais | Como Combinar |
|---|---|---|
| **Proteínas** | Leguminosas + cereais | Arroz com feijão, quinoa com lentilha |
| **Ferro** | Folhas verdes, leguminosas | Associar com vitamina C (limão) |
| **Vitamina B12** | Suplementação (necessária) | Incluir na rotina |
| **Cálcio** | Gergelim, vegetais escuros, leites vegetais fortificados | Consumir diariamente |

## Low Carb Saudável

| Alimentos Permitidos | Alimentos a Evitar |
|---|---|
| Carnes, ovos, peixes | Açúcares, doces |
| Vegetais não amiláceos | Grãos (arroz, trigo, milho) |
| Abacate, azeite, castanhas | Tubérculos (batata, mandioca) |
| Laticínios | Frutas muito doces |`,
        quiz: [
          {
            pergunta: "Qual nutriente veganos precisam necessariamente suplementar?",
            opcoes: ["Vitamina C", "Proteína", "Vitamina B12", "Carboidrato"],
            respostaCorreta: 2,
            explicacao: "A vitamina B12 não é encontrada em alimentos vegetais, sendo necessária suplementação para veganos.",
          },
        ],
      },
      {
        titulo: "7.3 Restrições Alimentares",
        descricao: "Intolerância à lactose, doença celíaca, diabetes e alergias",
        duracaoMinutos: 60,
        conteudo: `# Restrições Alimentares

## Cuidados por Condição

| Condição | Cuidados Específicos |
|---|---|
| **Intolerância à lactose** | Usar leites vegetais, queijos sem lactose |
| **Doença celíaca (glúten)** | Farinhas sem glúten (aveia, arroz, amêndoas) |
| **Alergia a ovos** | Substituições (linhaça + água, purê de banana) |
| **Diabetes** | Baixo índice glicêmico, controle de carboidratos |

> Sempre pergunte ao cliente sobre alergias e restrições antes de preparar qualquer refeição!`,
      },
    ],
  },

  // ── Módulo 8: Aproveitamento Integral ──
  {
    titulo: "Módulo 8 — Aproveitamento Integral",
    descricao: "Cascas, talos, sementes e zero desperdício",
    icone: "Package",
    cor: "from-lime-500/10 to-green-500/10",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "8.1 Por que Aproveitar Integralmente",
        descricao: "Nutrientes concentrados em cascas, talos e sementes",
        duracaoMinutos: 45,
        conteudo: `# Aproveitamento Integral dos Alimentos

## Por que Aproveitar Integralmente

| Parte da Planta | Nutrientes | Formas de Uso |
|---|---|---|
| **Cascas** | Fibras, vitaminas, antioxidantes | Farofas, chips, bolos |
| **Talos** | Fibras, cálcio | Refogados, sopas, farofas |
| **Sementes** | Gorduras boas, proteínas | Farinhas, granolas |
| **Folhas** | Clorofila, vitaminas | Sopas, sucos, refogados |

> Cascas e talos concentram até 40% mais nutrientes do que a polpa!`,
      },
      {
        titulo: "8.2 Receitas com Aproveitamento Integral",
        descricao: "Farinhas de cascas, chips, refogados e caldos",
        duracaoMinutos: 45,
        conteudo: `# Receitas com Aproveitamento Integral

## Receitas Práticas

| Receita | Ingredientes Aproveitados |
|---|---|
| **Farinha de cascas de frutas** | Cascas de banana, maçã, abacaxi |
| **Bolo de casca de abóbora** | Casca de abóbora |
| **Refogado de talos** | Talos de couve, espinafre, beterraba |
| **Chips de cascas** | Cascas de batata, cenoura, abobrinha |
| **Caldo de vegetais** | Sobras de legumes |

## Como Fazer Chips de Cascas

- Cascas de batata, cenoura ou abobrinha lavadas e secas
- Temperar com azeite, sal e páprica
- Assar a 200°C por 15 minutos até ficarem crocantes

## Caldo de Vegetais Nutritivo

- Juntar sobras de legumes (talos de cebola, casca de cenoura, talos de salsinha)
- Cozinhar em água por 40 minutos
- Coar e usar como base para sopas e risotos

> Antes de jogar fora, pense: isso pode virar um ingrediente?`,
        checklist: [
          "Cascas higienizadas antes do uso",
          "Talos verificados (sem partes murchas)",
          "Sementes lavadas e secas",
          "Receita planejada com aproveitamento",
          "Desperdício zero na receita",
        ],
      },
    ],
  },

  // ── Módulo 9: Planejamento e Cardápios ──
  {
    titulo: "Módulo 9 — Planejamento e Cardápios",
    descricao: "Como montar cardápios semanais equilibrados",
    icone: "BarChart3",
    cor: "from-blue-500/10 to-indigo-500/10",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "9.1 Como Montar Cardápios Saudáveis",
        descricao: "Etapas, princípios e planejamento",
        duracaoMinutos: 60,
        conteudo: `# Como Montar Cardápios Saudáveis

## Etapas do Planejamento

| Etapa | Descrição |
|---|---|
| **1. Defina as refeições** | Café, almoço, lanche, jantar |
| **2. Equilibre nutrientes** | Proteínas, carboidratos, gorduras em cada refeição |
| **3. Varie ingredientes** | Diferentes cores, texturas, grupos alimentares |
| **4. Considere a estação** | Ingredientes sazonais são mais baratos e saborosos |
| **5. Planeje o preparo** | O que pode ser adiantado |

> Planejamento é a chave para comer bem, gastar menos e desperdiçar zero!`,
      },
      {
        titulo: "9.2 Modelo de Cardápio Semanal",
        descricao: "Cardápio completo segunda a sexta",
        duracaoMinutos: 60,
        conteudo: `# Modelo de Cardápio Semanal

## Cardápio Completo

| Dia | Café da Manhã | Almoço | Jantar |
|---|---|---|---|
| **Segunda** | Panqueca de banana + frutas | Frango grelhado + quinoa + salada | Sopa de legumes |
| **Terça** | Iogurte + granola + morangos | Peixe assado + batata-doce + brócolis | Omelete + salada |
| **Quarta** | Pão integral + ovo + abacate | Carne moída + arroz integral + couve | Crepioca + salada |
| **Quinta** | Vitamina de frutas | Strogonoff de frango (leite de coco) + salada | Sopa creme de abóbora |
| **Sexta** | Aveia com frutas e castanhas | Salmão + legumes assados | Pizza de couve-flor + salada |

## Dicas para a Lista de Compras

- **Passo 1:** Definir o cardápio da semana
- **Passo 2:** Listar todos os ingredientes necessários
- **Passo 3:** Verificar o que já tem em casa
- **Passo 4:** Organizar por seção do mercado
- **Passo 5:** Comprar somente o necessário`,
        quiz: [
          {
            pergunta: "Qual o primeiro passo para uma alimentação saudável organizada?",
            opcoes: ["Comprar alimentos orgânicos", "Planejar o cardápio da semana", "Eliminar todos os carboidratos", "Comer apenas salada"],
            respostaCorreta: 1,
            explicacao: "O planejamento do cardápio semanal é a base para uma alimentação equilibrada, econômica e sem desperdício.",
          },
        ],
      },
    ],
  },

  // ── Módulo 10: Marmitas e Delivery ──
  {
    titulo: "Módulo 10 — Marmitas e Delivery",
    descricao: "Mercado grab & go, montagem e congelamento",
    icone: "Package",
    cor: "from-teal-500/10 to-cyan-500/10",
    nivel: "avancado",
    aulas: [
      {
        titulo: "10.1 Mercado de Marmitas Saudáveis",
        descricao: "Oportunidades no mercado grab & go",
        duracaoMinutos: 45,
        conteudo: `# Mercado de Marmitas Saudáveis

O mercado de alimentos "grab & go" (pegue e leve) está em expansão, com consumidores buscando praticidade sem abrir mão da saúde. A marca Ateliê, por exemplo, construiu fábrica estratégica em Ibiúna para que os vegetais cheguem ao consumidor em até 24 horas após colhidos.

## Como Montar Marmitas

| Etapa | Recomendação |
|---|---|
| **Escolha de embalagens** | Adequadas para congelamento, livres de BPA |
| **Separação de alimentos** | Evitar que líquidos molhem outros itens |
| **Cozimento adequado** | Levemente abaixo do ponto para não passar no reaquecimento |
| **Resfriamento rápido** | Antes de congelar |
| **Rotulagem** | Data de preparo, validade, instruções de reaquecimento |`,
      },
      {
        titulo: "10.2 Congelamento de Alimentos",
        descricao: "O que pode congelar, validade e dicas",
        duracaoMinutos: 75,
        conteudo: `# Congelamento de Alimentos

## Guia de Congelamento

| Alimento | Pode Congelar? | Validade | Dicas |
|---|---|---|---|
| Carnes cozidas | Sim | 3 meses | Bem embaladas |
| Legumes cozidos | Sim (branquear antes) | 3 meses | Resfriar rápido |
| Arroz | Sim | 1 mês | Em porções |
| Feijão | Sim | 3 meses | Sem tempero |
| Saladas verdes | Não | — | Consumir frescas |
| Molhos | Sim | 3 meses | Em potes |

## Dicas Importantes

- Congelar rápido preserva mais nutrientes
- Usar recipientes rasos para congelamento rápido
- Deixar espaço no pote (expansão)
- Identificar com data e conteúdo
- Descongelar na geladeira, nunca em temperatura ambiente

> Marmitas bem planejadas e congeladas corretamente duram até 3 meses sem perder qualidade!`,
        quiz: [
          {
            pergunta: "Qual alimento NÃO deve ser congelado?",
            opcoes: ["Arroz", "Feijão", "Saladas verdes", "Carnes cozidas"],
            respostaCorreta: 2,
            explicacao: "Saladas verdes não devem ser congeladas pois perdem textura e ficam murchas. Devem ser consumidas frescas.",
          },
        ],
        checklist: [
          "Cardápio da semana planejado",
          "Compras realizadas",
          "Bases preparadas (arroz, feijão, proteínas)",
          "Marmitas montadas e identificadas",
          "Alimentos corretamente congelados",
          "Saladas preparadas frescas no dia",
        ],
      },
    ],
  },

  // ── Módulo 11: Empreendedorismo ──
  {
    titulo: "Módulo 11 — Empreendedorismo",
    descricao: "Modelos de negócio e tendências do setor",
    icone: "BarChart3",
    cor: "from-amber-500/10 to-yellow-500/10",
    nivel: "avancado",
    aulas: [
      {
        titulo: "11.1 Por que Empreender e Modelos de Negócio",
        descricao: "Vantagens, modelos e investimento",
        duracaoMinutos: 60,
        conteudo: `# Empreendedorismo em Gastronomia Saudável

## Por que Empreender

| Vantagem | Descrição |
|---|---|
| **Mercado em crescimento** | 8% ao ano, R$ 10 bilhões movimentados |
| **Consumidor disposto a pagar mais** | Valoriza qualidade e benefícios à saúde |
| **Diversidade de modelos** | Restaurantes, delivery, marmitas, produtos |
| **Tendência consolidada** | Não é moda passageira |
| **Propósito** | Contribuir para saúde e bem-estar |

## Modelos de Negócio

| Modelo | Descrição | Investimento Inicial |
|---|---|---|
| **Restaurante saudável** | Espaço físico com cardápio equilibrado | Alto |
| **Dark kitchen** | Cozinha apenas para delivery | Médio |
| **Marmitas congeladas** | Produção e venda de refeições | Médio |
| **Personal Chef** | Atendimento personalizado em domicílio | Baixo |
| **Produtos funcionais** | Linha própria (granolas, snacks, molhos) | Médio |
| **Cursos e workshops** | Ensino de gastronomia saudável | Baixo |`,
      },
      {
        titulo: "11.2 Tendências e Dicas para Empreendedores",
        descricao: "Tendências de mercado e estratégias de sucesso",
        duracaoMinutos: 60,
        conteudo: `# Tendências e Dicas para Empreendedores

## Tendências para Ficar de Olho

| Tendência | Oportunidade |
|---|---|
| **Adaptógenos** | Shots funcionais, bebidas para foco e energia |
| **Superfoods brasileiras** | Valorizar ingredientes nativos (açaí, camu-camu) |
| **Probióticos** | Kombucha, kefir, pães de fermentação natural |
| **Proteínas alternativas** | Receitas à base de plantas, leguminosas |
| **Upcycling** | Aproveitamento integral, farinhas de cascas |
| **Clean label** | Rótulos limpos, ingredientes reconhecíveis |

## Dicas Essenciais

### A. Planejamento é Essencial
- Público-alvo e ocasiões de consumo
- Proposta de valor clara
- Análise de viabilidade financeira (cenários realistas e pessimistas)
- Estrutura de custos (CMV, desperdício, horas extras)

### B. Diferenciação e Experiência
- Experiência consistente e memorável
- Atendimento de qualidade
- Rapidez, cortesia e atenção aos detalhes
- Capacidade de resolver problemas rapidamente

### C. Controle Rigoroso
- CMV (Custo das Mercadorias Vendidas)
- Desperdício
- Tempo e volume de atendimento
- Tíquete médio e satisfação do cliente

### D. Nicho é Poder
Escolha um nicho específico e domine-o. Exemplo: a Casa de Bolos focou em bolo caseiro, algo único, adaptado em épocas sazonais, mas sem perder a essência.`,
        quiz: [
          {
            pergunta: "Qual a principal recomendação para começar a empreender na gastronomia?",
            opcoes: ["Investir tudo de uma vez", "Começar pequeno e validar antes de investir alto", "Copiar o concorrente", "Não se preocupar com finanças"],
            respostaCorreta: 1,
            explicacao: "Começar pequeno permite validar o modelo de negócio com menor risco antes de escalar o investimento.",
          },
        ],
      },
    ],
  },

  // ── Módulo 12: Marketing Digital ──
  {
    titulo: "Módulo 12 — Marketing Digital",
    descricao: "Presença online, conteúdo e fotografia de alimentos",
    icone: "MessageCircle",
    cor: "from-pink-500/10 to-rose-500/10",
    nivel: "avancado",
    aulas: [
      {
        titulo: "12.1 Presença Online",
        descricao: "Plataformas, estratégias e frequência de postagem",
        duracaoMinutos: 60,
        conteudo: `# Presença Online

## Plataformas e Estratégias

| Plataforma | Estratégia | Frequência |
|---|---|---|
| **Instagram** | Fotos atrativas, reels do preparo, stories | Diário |
| **Pinterest** | Inspiração, receitas, tráfego | Semanal |
| **TikTok** | Vídeos curtos de receitas e dicas | 3-5x semana |
| **WhatsApp Business** | Relacionamento, pedidos, ofertas | Diário |

## Conteúdo que Vende

| Tipo de Conteúdo | Exemplo | Objetivo |
|---|---|---|
| **Educativo** | "Benefícios da cúrcuma e como usar" | Autoridade |
| **Processo criativo** | Bastidores da cozinha | Humanização |
| **Receitas práticas** | "Almoço saudável em 15 minutos" | Engajamento |
| **Promocional** | Kits de marmitas, combos | Conversão |
| **Depoimentos** | Clientes satisfeitos | Prova social |`,
      },
      {
        titulo: "12.2 Fotografia de Alimentos",
        descricao: "Técnicas de food photography para redes sociais",
        duracaoMinutos: 60,
        conteudo: `# Fotografia de Alimentos

## Dicas Essenciais

| Dica | Descrição |
|---|---|
| **Luz natural** | Prefira luz do dia, perto de janelas |
| **Composição** | Pratos coloridos, texturas variadas |
| **Ângulos** | 45° para pratos, de cima para mesas postas |
| **Cenário** | Louças bonitas, talheres, guardanapos |

## Regras de Ouro

- Fotografe imediatamente após o preparo (frescor)
- Use fundos que contrastem com o prato
- Inclua ingredientes ao redor para contar uma história
- Edite com moderação — naturalidade vende mais

> Um prato bonito vende mais que um prato apenas gostoso. Na era digital, as pessoas comem com os olhos primeiro!`,
        quiz: [
          {
            pergunta: "Qual o melhor tipo de iluminação para fotografia de alimentos?",
            opcoes: ["Flash direto", "Luz fluorescente", "Luz natural (janela)", "Luz de LED colorida"],
            respostaCorreta: 2,
            explicacao: "A luz natural, especialmente perto de janelas, é a mais indicada para fotografar alimentos com aparência apetitosa.",
          },
        ],
      },
    ],
  },

  // ── Módulo 13: Gestão Financeira e Legal ──
  {
    titulo: "Módulo 13 — Gestão Financeira e Legal",
    descricao: "Aspectos legais, precificação e CMV",
    icone: "BarChart3",
    cor: "from-slate-500/10 to-gray-500/10",
    nivel: "avancado",
    aulas: [
      {
        titulo: "13.1 Aspectos Legais",
        descricao: "Vigilância sanitária, MEI e licenciamento",
        duracaoMinutos: 60,
        conteudo: `# Aspectos Legais para Negócios de Alimentação

## Requisitos Legais

| Aspecto | O que fazer |
|---|---|
| **Vigilância Sanitária** | Licenciamento e alvará |
| **MEI** | Formalização para pequenos negócios |
| **Corpo de Bombeiros** | AVCB (Auto de Vistoria) |
| **Licenciamento ambiental** | Depende do tipo de atividade |
| **Notas fiscais** | Emissão obrigatória |

> Regularize seu negócio desde o início. É mais barato do que resolver problemas depois!`,
      },
      {
        titulo: "13.2 Precificação e CMV",
        descricao: "Como calcular preços e controlar custos",
        duracaoMinutos: 60,
        conteudo: `# Precificação e CMV

## Exemplo Prático — Marmita Saudável (500g)

| Item | Custo |
|---|---|
| Ingredientes | R$ 8,00 |
| Embalagem | R$ 1,50 |
| Mão de obra (proporcional) | R$ 3,00 |
| Custos fixos (luz, gás) | R$ 1,00 |
| **Custo total** | **R$ 13,50** |
| **Multiplicador 2,5** | **R$ 33,75** |
| **Preço sugerido** | **R$ 32,00 - R$ 35,00** |

## CMV (Custo da Mercadoria Vendida)

| Tipo de Negócio | CMV Ideal |
|---|---|
| Restaurantes | 28-35% |
| Delivery | 30-40% |
| Produtos industrializados | 20-30% |
| Marmitas | 25-35% |

## Controle Financeiro

- **Fluxo de caixa** — Registrar entradas e saídas diariamente
- **DRE simplificado** — Receitas - custos = resultado
- **Separar contas** — Pessoal e empresarial
- **Reserva** — Mínimo 3 meses de custos fixos
- **Precificar corretamente** — Nunca vender abaixo do custo`,
        quiz: [
          {
            pergunta: "Qual o CMV ideal para marmitas saudáveis?",
            opcoes: ["50-60%", "25-35%", "10-15%", "70-80%"],
            respostaCorreta: 1,
            explicacao: "O CMV ideal para marmitas deve ficar entre 25-35% do preço de venda, garantindo margem para cobrir outros custos e gerar lucro.",
          },
        ],
      },
    ],
  },

  // ── Módulo 14: Bônus e Expansão ──
  {
    titulo: "Módulo 14 — Bônus e Expansão",
    descricao: "Diversificação, parcerias e materiais exclusivos",
    icone: "GraduationCap",
    cor: "from-yellow-500/10 to-amber-500/10",
    nivel: "avancado",
    aulas: [
      {
        titulo: "14.1 Diversificação de Produtos",
        descricao: "Novas linhas de produtos e receitas",
        duracaoMinutos: 30,
        conteudo: `# Diversificação de Produtos

## Oportunidades de Expansão

| Produto | Descrição |
|---|---|
| **Molhos saudáveis** | Pesto, molho de tomate caseiro, vinagretes |
| **Granolas e mixes** | Combinados de cereais, castanhas, frutas |
| **Barras energéticas** | Snacks funcionais |
| **Bebidas funcionais** | Kombucha, kefir, shots |
| **Congelados saudáveis** | Hambúrgueres vegetais, legumes |

> Diversificar produtos aumenta suas fontes de receita e atinge diferentes perfis de consumidor.`,
      },
      {
        titulo: "14.2 Parcerias Estratégicas",
        descricao: "Como criar parcerias que impulsionam o negócio",
        duracaoMinutos: 30,
        conteudo: `# Parcerias Estratégicas

## Parceiros Ideais

| Parceiro | Abordagem |
|---|---|
| **Academias** | Fornecer marmitas para alunos |
| **Spas e clínicas** | Alimentação para programas de emagrecimento |
| **Empresas** | Refeições saudáveis para colaboradores |
| **Escolas** | Merenda escolar saudável |
| **Produtores locais** | Ingredientes frescos, preço justo |

> Parcerias estratégicas multiplicam seu alcance sem multiplicar seus custos!`,
      },
      {
        titulo: "14.3 Bônus e Certificação",
        descricao: "Materiais exclusivos e certificação profissional",
        duracaoMinutos: 30,
        conteudo: `# Bônus Exclusivos e Certificação

## Bônus Inclusos

| Bônus | Descrição |
|---|---|
| **Grupo VIP de alunas** | Comunidade exclusiva para troca de experiências |
| **Lista de fornecedores verificados** | Qualidade garantida |
| **Planilha de custos** | Controle financeiro facilitado |
| **Ebook de receitas sazonais** | Pratos para cada estação |
| **Modelos de cardápios editáveis** | Prontidão para começar |

## Certificação

Ao finalizar o curso, o aluno recebe certificado de conclusão de **Gastronomia Saudável — 130 horas**, comprovando as habilidades adquiridas e podendo utilizar como diferencial profissional.

### Válido para:
- Comprovar horas extracurriculares
- Enriquecer currículo profissional
- Abrir seu próprio negócio com credibilidade
- Atuar como personal chef ou consultor

> 🏆 Parabéns por concluir a formação em Gastronomia Saudável! Você está pronta para transformar a saúde das pessoas através da alimentação.`,
      },
    ],
  },
];
