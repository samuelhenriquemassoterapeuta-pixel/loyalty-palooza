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

Gastronomia saudável é a arte de preparar refeições nutritivas, equilibradas e saborosas, utilizando ingredientes naturais, técnicas que preservam nutrientes e combinações inteligentes de alimentos.

> Comer saudável não é comer sem sabor. É comer com inteligência, criatividade e prazer.

## Diferenças Importantes

| Conceito | Foco | Característica |
|---|---|---|
| **Saudável** | Equilíbrio nutricional | Variedade, naturalidade, prazer |
| **Fitness** | Performance física | Alto proteico, controle de macros |
| **Funcional** | Saúde específica | Alimentos com propriedades terapêuticas |
| **Diet/Light** | Restrição calórica | Redução de gordura, açúcar ou sódio |

## Por que é Importante?

- **Prevenção de doenças** — Alimentação inadequada é fator de risco para obesidade, diabetes, hipertensão
- **Qualidade de vida** — Mais energia, disposição e bem-estar
- **Longevidade** — Hábitos alimentares saudáveis aumentam a expectativa de vida
- **Sustentabilidade** — Menos desperdício, mais consciência ambiental`,
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
        titulo: "1.2 História, Mercado e Tendências",
        descricao: "Evolução, cenário atual e oportunidades profissionais",
        duracaoMinutos: 60,
        conteudo: `# História, Mercado e Tendências

## Evolução da Alimentação Saudável

- **Anos 80-90:** Dietas restritivas, medo de gordura
- **Anos 2000:** Surgimento dos funcionais e orgânicos
- **Anos 2010:** Boom dos fit, low carb, sem glúten
- **Anos 2020+:** Alimentação consciente, sustentável e personalizada

## Mercado Atual

| Segmento | Crescimento Anual | Oportunidade |
|---|---|---|
| **Alimentação saudável** | 12-15% | Restaurantes, delivery, consultoria |
| **Orgânicos** | 20% | Hortas urbanas, feiras, e-commerce |
| **Plant-based** | 25% | Produtos veganos e vegetarianos |
| **Marmitas saudáveis** | 18% | Meal prep, grab & go |

## Saídas Profissionais

- Chef de cozinha saudável
- Personal chef (atendimento domiciliar)
- Consultor de cardápios
- Empreendedor de marmitas/delivery
- Criador de conteúdo gastronômico
- Professor/instrutor de culinária saudável

## Guia Alimentar do Ministério da Saúde

> "Faça de alimentos in natura ou minimamente processados a base da sua alimentação."

### Os 10 Passos

- Alimentos in natura como base
- Uso moderado de óleos, gorduras, sal e açúcar
- Limitar ultraprocessados
- Comer com regularidade e atenção
- Comer em ambientes apropriados
- Comprar em feiras e mercados locais
- Desenvolver habilidades culinárias
- Planejar o uso do tempo para alimentação
- Dar preferência a restaurantes com comida feita na hora
- Ser crítico com publicidade de alimentos`,
        quiz: [
          {
            pergunta: "Qual segmento tem maior crescimento no mercado de alimentação?",
            opcoes: ["Fast food", "Plant-based (25% ao ano)", "Congelados industriais", "Enlatados"],
            respostaCorreta: 1,
            explicacao: "O segmento plant-based cresce cerca de 25% ao ano, impulsionado pela busca por alternativas sustentáveis e saudáveis.",
          },
        ],
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

| Nutriente | Função | Fontes Saudáveis | % Diária |
|---|---|---|---|
| **Carboidratos** | Energia principal | Arroz integral, batata-doce, aveia, frutas | 45-65% |
| **Proteínas** | Construção e reparação | Frango, peixe, ovos, leguminosas, tofu | 10-35% |
| **Gorduras** | Energia, hormônios, absorção | Azeite, abacate, castanhas, peixes | 20-35% |

## Micronutrientes Essenciais

### Vitaminas

| Vitamina | Função | Fontes |
|---|---|---|
| **A** | Visão, imunidade | Cenoura, abóbora, manga |
| **C** | Antioxidante, imunidade | Acerola, laranja, kiwi |
| **D** | Ossos, imunidade | Sol, peixes, ovos |
| **E** | Antioxidante | Castanhas, azeite, abacate |
| **K** | Coagulação | Vegetais verde-escuros |
| **Complexo B** | Metabolismo, energia | Grãos integrais, carnes, ovos |

### Minerais

| Mineral | Função | Fontes |
|---|---|---|
| **Ferro** | Oxigenação | Feijão, lentilha, espinafre |
| **Cálcio** | Ossos | Leite, brócolis, gergelim |
| **Zinco** | Imunidade | Castanha, semente de abóbora |
| **Magnésio** | Relaxamento | Banana, abacate, cacau |`,
        quiz: [
          {
            pergunta: "Qual a proporção recomendada de carboidratos na dieta diária?",
            opcoes: ["10-20%", "45-65%", "70-80%", "Menos de 5%"],
            respostaCorreta: 1,
            explicacao: "A recomendação é de 45-65% das calorias diárias vindas de carboidratos, preferencialmente complexos e integrais.",
          },
        ],
      },
      {
        titulo: "2.2 Alimentos Funcionais e Substituições",
        descricao: "Sinergia alimentar e trocas inteligentes",
        duracaoMinutos: 90,
        conteudo: `# Alimentos Funcionais e Substituições Inteligentes

## O que são Alimentos Funcionais?

Alimentos que, além de nutrir, oferecem benefícios específicos à saúde.

| Alimento | Composto Ativo | Benefício |
|---|---|---|
| **Tomate** | Licopeno | Antioxidante, saúde cardiovascular |
| **Cúrcuma** | Curcumina | Anti-inflamatório |
| **Linhaça** | Ômega-3, lignanas | Saúde hormonal, intestinal |
| **Aveia** | Beta-glucana | Redução do colesterol |
| **Alho** | Alicina | Antibacteriano, cardiovascular |
| **Gengibre** | Gingerol | Anti-inflamatório, digestivo |

## Sinergia Alimentar

> Alguns alimentos potencializam o efeito uns dos outros quando consumidos juntos.

| Combinação | Benefício |
|---|---|
| **Ferro + Vitamina C** | Limão no feijão aumenta absorção do ferro |
| **Cúrcuma + Pimenta** | Piperina aumenta absorção da curcumina em 2000% |
| **Tomate + Azeite** | Gordura aumenta absorção do licopeno |
| **Cálcio + Vitamina D** | Vitamina D facilita absorção do cálcio |

## Substituições Inteligentes

| Substituir | Por | Benefício |
|---|---|---|
| Farinha branca | Farinha de aveia/amêndoas | Mais fibras e nutrientes |
| Açúcar refinado | Mel, tâmaras, xilitol | Menor índice glicêmico |
| Arroz branco | Arroz integral, quinoa | Mais fibras e minerais |
| Creme de leite | Leite de coco | Menos gordura saturada |
| Manteiga | Azeite, ghee | Gorduras mais saudáveis |
| Macarrão | Espaguete de abobrinha | Menos calorias, mais nutrientes |`,
        quiz: [
          {
            pergunta: "Por que devemos adicionar limão ao feijão?",
            opcoes: ["Apenas pelo sabor", "A vitamina C do limão aumenta a absorção do ferro do feijão", "Para conservar o feijão", "Não há benefício"],
            respostaCorreta: 1,
            explicacao: "A vitamina C do limão aumenta significativamente a absorção do ferro não-heme presente no feijão.",
          },
        ],
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
        titulo: "3.1 Boas Práticas e Segurança Alimentar",
        descricao: "Contaminação cruzada, higienização e armazenamento",
        duracaoMinutos: 90,
        conteudo: `# Boas Práticas e Segurança Alimentar

## Contaminação Cruzada

> Contaminação cruzada é a transferência de microrganismos de um alimento para outro, podendo causar intoxicação alimentar.

### Como Evitar

| Cuidado | Prática |
|---|---|
| **Tábuas separadas** | Uma para carnes, outra para vegetais |
| **Lavagem de mãos** | Antes, durante e após manipulação |
| **Armazenamento** | Alimentos crus separados dos prontos |
| **Utensílios** | Não usar a mesma faca para alimentos diferentes sem lavar |
| **Temperatura** | Alimentos perecíveis abaixo de 5°C ou acima de 60°C |

## Higienização de Alimentos

### Frutas e Verduras
- Lavar em água corrente
- Deixar de molho em solução clorada (1 colher de sopa de hipoclorito para 1 litro de água)
- Tempo: 15 minutos
- Enxaguar em água corrente

## Temperaturas de Segurança

| Zona | Temperatura | Risco |
|---|---|---|
| **Zona de perigo** | 5°C a 60°C | Multiplicação bacteriana |
| **Refrigeração** | 0°C a 5°C | Conservação segura |
| **Congelamento** | -18°C ou menos | Conservação prolongada |
| **Cocção segura** | 74°C ou mais | Eliminação de patógenos |`,
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
        descricao: "Como organizar para preservar alimentos e reduzir desperdício",
        duracaoMinutos: 60,
        conteudo: `# Organização de Despensa e Geladeira

## Despensa

| Prateleira | O que guardar | Dica |
|---|---|---|
| **Superior** | Enlatados, conservas | Mais longe do calor |
| **Meio** | Grãos, farinhas, cereais | Em potes herméticos |
| **Inferior** | Tubérculos, cebola, alho | Ambiente seco e escuro |

### Regras de Ouro
- Primeiro que entra, primeiro que sai (PEPS)
- Verificar validade regularmente
- Manter limpa e seca
- Identificar e datar alimentos transferidos

## Geladeira

| Prateleira | O que guardar |
|---|---|
| **Superior** | Alimentos prontos, sobras |
| **Meio** | Laticínios, ovos |
| **Inferior** | Carnes, aves, peixes |
| **Gavetas** | Frutas e verduras |
| **Porta** | Condimentos, sucos, água |

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
        descricao: "Tipos de corte e suas aplicações na cozinha saudável",
        duracaoMinutos: 90,
        conteudo: `# Cortes de Vegetais

## Principais Cortes

| Corte | Tamanho | Aplicação |
|---|---|---|
| **Brunoise** | 2-3mm cubos | Refogados, molhos, decoração |
| **Julienne** | Tiras finas (3mm) | Saladas, stir-fry |
| **Chiffonade** | Tiras finas de folhas | Decoração, saladas |
| **Macedônia** | 1cm cubos | Sopas, saladas, guisados |
| **Mirepoix** | Cubos irregulares | Base de sopas e caldos |
| **Rondelle** | Rodelas | Assados, refogados |
| **Tourné** | Formato de barril | Apresentação refinada |

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

| Método | Preservação Nutricional | Uso de Gordura | Indicação |
|---|---|---|---|
| **Vapor** | ★★★★★ | Nenhum | Legumes, peixes, frango |
| **Grelhar** | ★★★★☆ | Mínimo | Carnes, vegetais firmes |
| **Assar** | ★★★★☆ | Pouco | Legumes, carnes, peixes |
| **Refogar** | ★★★☆☆ | Pouco (azeite) | Vegetais, grãos |
| **Escaldar** | ★★★★☆ | Nenhum | Vegetais, ovos |
| **Sous vide** | ★★★★★ | Variável | Carnes, peixes |
| **Cozinhar** | ★★★☆☆ | Nenhum | Leguminosas, grãos |
| **Fritar** | ★☆☆☆☆ | Muito | Evitar |

## Técnicas para Preservar Nutrientes

- **Cozinhar al dente** — Vegetais crocantes mantêm mais vitaminas
- **Usar pouca água** — Menos perda de minerais por lixiviação
- **Aproveitar o caldo** — Os nutrientes ficam na água de cozimento
- **Cortar no momento** — Evitar oxidação prolongada
- **Tampas nas panelas** — Retém calor e reduz tempo de cocção
- **Temperatura adequada** — Fogo alto rápido > fogo baixo prolongado

> O vapor é o rei da cozinha saudável: preserva cor, textura, sabor e nutrientes!`,
        quiz: [
          {
            pergunta: "Qual o melhor método de cocção para preservar nutrientes?",
            opcoes: ["Fritura", "Cozimento em bastante água", "Vapor", "Micro-ondas"],
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
    descricao: "Receitas práticas para o dia a dia",
    icone: "Heart",
    cor: "from-yellow-500/10 to-orange-500/10",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "5.1 Princípios e Receitas",
        descricao: "Como montar cafés da manhã equilibrados e lanches saudáveis",
        duracaoMinutos: 90,
        conteudo: `# Café da Manhã e Lanches Saudáveis

## Princípios do Café da Manhã Ideal

Um café da manhã equilibrado deve conter:

| Componente | Exemplo | Função |
|---|---|---|
| **Carboidrato complexo** | Aveia, pão integral, tapioca | Energia sustentada |
| **Proteína** | Ovo, queijo, iogurte | Saciedade, construção |
| **Gordura boa** | Abacate, castanhas | Absorção de vitaminas |
| **Fibras** | Frutas, sementes | Funcionamento intestinal |
| **Vitaminas** | Frutas frescas | Imunidade, disposição |

## Receitas Práticas

### Muffin de Banana e Aveia
- 2 bananas maduras amassadas
- 1 xícara de aveia
- 2 ovos
- 1 colher de mel
- 1 colher de chá de canela
- **Modo:** Misturar tudo, colocar em forminhas, assar 180°C por 20min

### Panqueca Proteica
- 1 banana
- 2 ovos
- 2 colheres de aveia
- 1 colher de cacau (opcional)
- **Modo:** Bater no liquidificador, grelhar em frigideira antiaderente

### Crepioca
- 1 ovo
- 2 colheres de tapioca
- Recheio: queijo branco, tomate, rúcula
- **Modo:** Misturar ovo e tapioca, grelhar, rechear

### Bowl Energético
- Iogurte natural
- Granola caseira
- Frutas picadas
- Mel e sementes (chia, linhaça)

> Prepare os ingredientes na noite anterior para agilizar pela manhã!`,
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
        descricao: "Como montar um prato equilibrado e proporções ideais",
        duracaoMinutos: 60,
        conteudo: `# Composição do Prato Saudável

## O Prato Ideal — Método Harvard

| Proporção | Grupo | Exemplos |
|---|---|---|
| **50% do prato** | Vegetais e legumes | Salada, legumes cozidos, refogados |
| **25% do prato** | Proteína | Frango, peixe, ovos, leguminosas |
| **25% do prato** | Carboidrato | Arroz integral, batata-doce, quinoa |
| **+ Complemento** | Gordura boa | Azeite, abacate, castanhas |

> O método Harvard é a forma mais simples e eficaz de montar um prato equilibrado sem contar calorias.

## Dicas para Almoço e Jantar

- **Variedade de cores** — Quanto mais colorido, mais nutrientes
- **Salada primeiro** — Começa a saciedade
- **Mastigar devagar** — 20 minutos para o cérebro registrar saciedade
- **Jantar mais leve** — Metabolismo mais lento à noite
- **Evitar líquidos durante** — Diluem sucos gástricos`,
      },
      {
        titulo: "6.2 Receitas Completas",
        descricao: "Cuscuz de quinoa, peixe assado e brownie low carb",
        duracaoMinutos: 120,
        conteudo: `# Receitas Completas para Almoço e Jantar

## Cuscuz de Quinoa com Legumes

**Ingredientes:**
- 1 xícara de quinoa
- 2 xícaras de água
- 1 cenoura em cubos
- 1 abobrinha em cubos
- Salsinha e coentro picados
- Azeite, sal, limão

**Modo de preparo:**
- Cozinhar quinoa na água por 15 minutos
- Refogar legumes no azeite
- Misturar tudo, temperar com limão e ervas

## Peixe Assado com Ervas

**Ingredientes:**
- 2 filés de peixe branco
- Alecrim, tomilho, salsinha
- 1 limão (suco e raspas)
- Azeite, sal, pimenta

**Modo de preparo:**
- Temperar peixe com ervas, limão e azeite
- Assar em 200°C por 15-20 minutos
- Servir com legumes assados

## Brownie Low Carb de Cacau

**Ingredientes:**
- 2 ovos
- 3 colheres de cacau em pó
- 2 colheres de farinha de amêndoas
- 2 colheres de mel ou xilitol
- 1 colher de óleo de coco

**Modo de preparo:**
- Misturar todos os ingredientes
- Assar em forma pequena a 180°C por 15 minutos
- Deixar esfriar antes de cortar

> Dica: Acrescente nozes picadas por cima para mais crocância e nutrientes!`,
        quiz: [
          {
            pergunta: "No método Harvard, qual proporção do prato deve ser de vegetais?",
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
        titulo: "7.1 Alimentação por Público",
        descricao: "Adaptações para diferentes necessidades alimentares",
        duracaoMinutos: 120,
        conteudo: `# Cozinha para Públicos Específicos

## Alimentação Infantil

| Princípio | Aplicação |
|---|---|
| **Apresentação lúdica** | Montar pratos com formatos divertidos |
| **Cores variadas** | Crianças comem com os olhos |
| **Texturas diferentes** | Estimular o paladar |
| **Sem forçar** | Oferecer sem obrigar |
| **Envolvimento** | Levar a criança para a cozinha |

## Alimentação Vegetariana e Vegana

| Nutriente | Atenção | Fontes Vegetais |
|---|---|---|
| **Proteína** | Combinar leguminosas + cereais | Feijão + arroz, lentilha + quinoa |
| **Ferro** | Associar com vitamina C | Feijão + limão, lentilha + laranja |
| **B12** | Suplementação necessária (veganos) | Suplemento, nutritional yeast |
| **Cálcio** | Fontes alternativas | Brócolis, gergelim, tofu |
| **Ômega-3** | Fontes vegetais | Linhaça, chia, nozes |

## Low Carb Saudável

> Low carb não é zero carb. Prefira reduzir ultraprocessados, não legumes e frutas.

| Permitido | Evitar | Moderação |
|---|---|---|
| Vegetais folhosos | Açúcar refinado | Frutas |
| Proteínas magras | Farinha branca | Tubérculos |
| Gorduras boas | Arroz branco | Leguminosas |
| Oleaginosas | Pães e massas | Laticínios |

## Restrições Alimentares

| Restrição | Substituições |
|---|---|
| **Sem glúten** | Farinha de arroz, amêndoas, tapioca |
| **Sem lactose** | Leite vegetal, queijo vegano |
| **Sem ovo** | Linhaça hidratada, banana, aquafaba |
| **Sem açúcar** | Xilitol, eritritol, stevia |`,
        quiz: [
          {
            pergunta: "Qual nutriente veganos precisam necessariamente suplementar?",
            opcoes: ["Vitamina C", "Proteína", "Vitamina B12", "Carboidrato"],
            respostaCorreta: 2,
            explicacao: "A vitamina B12 não é encontrada em alimentos vegetais, sendo necessária suplementação para veganos.",
          },
        ],
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
        titulo: "8.1 Aproveitamento Total dos Alimentos",
        descricao: "Receitas e benefícios de cascas, talos e sementes",
        duracaoMinutos: 90,
        conteudo: `# Aproveitamento Integral dos Alimentos

## Por que Aproveitar Tudo?

- **Nutrição:** Cascas e talos concentram até 40% mais nutrientes
- **Economia:** Reduz custos em até 30%
- **Sustentabilidade:** Menos desperdício, menos lixo
- **Criatividade:** Novas texturas e sabores

## O que Aproveitar

| Parte | Alimento | Uso |
|---|---|---|
| **Casca de banana** | Banana | Biomassa, bolo, farinha |
| **Casca de abóbora** | Abóbora | Refogada, chips assados |
| **Talos de brócolis** | Brócolis | Sopa, refogado, purê |
| **Talos de couve** | Couve | Suco verde, refogado |
| **Sementes de abóbora** | Abóbora | Torradas como snack |
| **Casca de melancia** | Melancia | Doce, suco, conserva |
| **Folhas de cenoura** | Cenoura | Tempero, pesto |
| **Casca de batata** | Batata | Chips assados |

## Receitas com Aproveitamento

### Chips de Casca de Batata
- Cascas de batata lavadas e secas
- Azeite, sal, páprica
- Assar a 200°C por 15 minutos

### Suco Verde Nutritivo
- Talos de couve + casca de abacaxi + gengibre + água
- Bater e coar

### Farofa de Talos
- Talos picados de brócolis, couve e salsinha
- Refogar com cebola e alho
- Adicionar farinha de mandioca

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
        titulo: "9.1 Montagem de Cardápios",
        descricao: "Princípios, modelo semanal e lista de compras",
        duracaoMinutos: 120,
        conteudo: `# Planejamento e Montagem de Cardápios

## Princípios do Cardápio Saudável

| Princípio | Aplicação |
|---|---|
| **Variedade** | Alternar alimentos ao longo da semana |
| **Equilíbrio** | Todos os grupos alimentares em cada refeição |
| **Cores** | Mínimo 3 cores no prato |
| **Sazonalidade** | Frutas e legumes da estação (mais baratos e nutritivos) |
| **Praticidade** | Receitas viáveis para o dia a dia |

## Modelo de Cardápio Semanal

| Dia | Proteína | Carboidrato | Vegetal Principal |
|---|---|---|---|
| **Segunda** | Frango grelhado | Arroz integral | Brócolis |
| **Terça** | Peixe assado | Batata-doce | Abobrinha |
| **Quarta** | Ovo mexido/omelete | Quinoa | Espinafre |
| **Quinta** | Carne magra | Mandioquinha | Cenoura |
| **Sexta** | Leguminosas (feijão/lentilha) | Arroz integral | Couve |
| **Sábado** | Frango desfiado | Macarrão integral | Mix de folhas |
| **Domingo** | Peixe/frutos do mar | Batata | Salada colorida |

## Como Fazer a Lista de Compras

- **Passo 1:** Definir o cardápio da semana
- **Passo 2:** Listar todos os ingredientes necessários
- **Passo 3:** Verificar o que já tem em casa
- **Passo 4:** Organizar por seção do mercado
- **Passo 5:** Comprar somente o necessário

> Planejamento é a chave para comer bem, gastar menos e desperdiçar zero!`,
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
        titulo: "10.1 Marmitas Saudáveis e Delivery",
        descricao: "Mercado, montagem, congelamento e embalagens",
        duracaoMinutos: 120,
        conteudo: `# Marmitas Saudáveis e Delivery

## O Mercado de Marmitas

| Segmento | Público | Preço Médio |
|---|---|---|
| **Marmita fit** | Praticantes de exercício | R$ 25-40 |
| **Marmita saudável** | Público geral | R$ 18-30 |
| **Marmita low carb** | Público restritivo | R$ 28-45 |
| **Marmita vegana** | Veganos/vegetarianos | R$ 22-35 |
| **Grab & go** | Pressa, conveniência | R$ 15-25 |

## Montagem Eficiente

### Passo a Passo do Meal Prep
- **Domingo:** Compras + preparo de bases (arroz, feijão, proteínas)
- **Segunda:** Montar marmitas da semana
- **Diário:** Adicionar salada fresca no dia

### Regras de Montagem

| Regra | Motivo |
|---|---|
| **Separar molhados dos secos** | Evitar que amoleçam |
| **Salada à parte** | Manter frescor |
| **Porções padronizadas** | Controle nutricional |
| **Identificar e datar** | Controle de validade |

## Congelamento

| Alimento | Tempo de Congelamento | Dica |
|---|---|---|
| **Arroz/feijão** | Até 3 meses | Congelar em porções |
| **Carnes cozidas** | Até 3 meses | Sem molho para não ressecar |
| **Legumes cozidos** | Até 3 meses | Al dente para não desmanchar |
| **Sopas e caldos** | Até 3 meses | Deixar espaço no pote (expansão) |
| **Saladas** | ❌ Não congelar | Preparar frescas |

> Congelar rápido preserva mais nutrientes. Use recipientes rasos para congelamento rápido.`,
        quiz: [
          {
            pergunta: "Qual o tempo máximo de congelamento para marmitas de arroz e feijão?",
            opcoes: ["1 semana", "2 semanas", "Até 3 meses", "1 ano"],
            respostaCorreta: 2,
            explicacao: "Arroz e feijão podem ser congelados por até 3 meses, desde que em recipientes adequados e bem vedados.",
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
        titulo: "11.1 Modelos de Negócio",
        descricao: "Como empreender na gastronomia saudável",
        duracaoMinutos: 60,
        conteudo: `# Empreendedorismo na Gastronomia Saudável

## Modelos de Negócio

| Modelo | Investimento Inicial | Retorno | Complexidade |
|---|---|---|---|
| **Marmitas delivery** | R$ 2-5 mil | Médio-alto | Baixa |
| **Food truck saudável** | R$ 30-80 mil | Alto | Média |
| **Restaurante** | R$ 80-200 mil | Alto | Alta |
| **Consultoria de cardápios** | R$ 1-3 mil | Médio | Baixa |
| **Cursos de culinária** | R$ 2-5 mil | Médio | Baixa |
| **E-commerce de produtos** | R$ 5-20 mil | Variável | Média |
| **Personal chef** | R$ 1-3 mil | Médio-alto | Baixa |

## Tendências do Setor

- **Personalização** — Cardápios individualizados
- **Sustentabilidade** — Embalagens biodegradáveis, zero desperdício
- **Tecnologia** — Apps de pedido, automação de processos
- **Transparência** — Origem dos ingredientes, informação nutricional
- **Experiência** — Jantares temáticos, workshops

## Dicas para Novos Empreendedores

- **Planejamento** — Faça um plano de negócios antes de começar
- **Diferenciação** — O que torna você único?
- **Controle financeiro** — Separe finanças pessoais das empresariais
- **Comece pequeno** — Valide antes de investir alto
- **Invista em qualidade** — Ingredientes bons = clientes fiéis`,
      },
      {
        titulo: "11.2 Tendências e Inovação",
        descricao: "Novas oportunidades e mercado emergente",
        duracaoMinutos: 60,
        conteudo: `# Tendências e Inovação

## Mercado em Expansão

| Tendência | Descrição | Oportunidade |
|---|---|---|
| **Plant-based** | Proteínas vegetais | Hambúrguer de grão-de-bico, leites vegetais |
| **Fermentados** | Kombucha, kefir, kimchi | Produtos artesanais |
| **Superfoods** | Açaí, spirulina, chlorella | Bowls e sucos funcionais |
| **Comfort food saudável** | Versões fit de pratos tradicionais | Pizzas low carb, lasanhas de abobrinha |
| **Snacks saudáveis** | Barrinhas, chips de legumes | Produtos embalados |

## Como se Diferenciar

> O mercado de comida saudável está crescendo, mas também está ficando competitivo. Diferenciação é a chave.

### Estratégias de Diferenciação

- **Nicho específico** — Foque em um público (ex: marmitas para diabéticos)
- **Storytelling** — Conte sua história e a dos ingredientes
- **Qualidade visual** — Fotos profissionais fazem a diferença
- **Atendimento excepcional** — Personalização e cuidado
- **Inovação constante** — Novos pratos, combinações e apresentações`,
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
        titulo: "12.1 Marketing e Fotografia",
        descricao: "Presença online, conteúdo que vende e food photography",
        duracaoMinutos: 120,
        conteudo: `# Marketing Digital para Gastronomia

## Presença Online

| Canal | Estratégia | Frequência |
|---|---|---|
| **Instagram** | Fotos profissionais, reels de receitas | Diário |
| **TikTok** | Vídeos curtos de receitas rápidas | 3-5x/semana |
| **YouTube** | Receitas completas, tutoriais | Semanal |
| **WhatsApp Business** | Cardápio, pedidos, relacionamento | Diário |
| **Google Meu Negócio** | Visibilidade local | Sempre atualizado |

## Conteúdo que Vende

| Tipo | Exemplo | Objetivo |
|---|---|---|
| **Receita rápida** | "Jantar saudável em 15 min" | Engajamento |
| **Antes e depois** | Ingredientes → prato pronto | Desejo |
| **Educativo** | "5 trocas saudáveis simples" | Autoridade |
| **Bastidores** | Preparação na cozinha | Humanização |
| **Depoimentos** | Clientes satisfeitos | Prova social |

## Fotografia de Alimentos

### Dicas Essenciais

| Dica | Aplicação |
|---|---|
| **Luz natural** | Fotografe perto de janelas |
| **Ângulo 45°** | O mais versátil para pratos |
| **Ângulo 90° (flat lay)** | Bowls, pizzas, pratos com textura |
| **Composição** | Talheres, guardanapo, ingredientes ao redor |
| **Cores complementares** | Fundo que contraste com o prato |
| **Frescor** | Fotografe imediatamente após o preparo |

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
        titulo: "13.1 Aspectos Legais e Precificação",
        descricao: "Regulamentação, custos e formação de preço",
        duracaoMinutos: 120,
        conteudo: `# Gestão Financeira e Legal

## Aspectos Legais

| Requisito | Descrição |
|---|---|
| **MEI** | Microempreendedor Individual — faturamento até R$ 81 mil/ano |
| **Alvará sanitário** | Obrigatório para produção e venda de alimentos |
| **Curso de manipulação** | Boas práticas de fabricação (BPF) |
| **Rotulagem** | Obrigatória para produtos embalados (ANVISA) |
| **Nota fiscal** | Emissão para vendas |

## Precificação — CMV (Custo de Mercadoria Vendida)

### Fórmula

> **Preço de Venda = CMV ÷ Percentual do CMV**
> 
> Exemplo: Se o CMV é R$ 8,00 e representa 30% do preço → R$ 8,00 ÷ 0,30 = R$ 26,67

### Composição do Custo

| Item | Percentual Ideal |
|---|---|
| **CMV (ingredientes)** | 25-35% |
| **Mão de obra** | 25-30% |
| **Embalagem** | 5-10% |
| **Despesas fixas** | 15-20% |
| **Lucro** | 15-25% |

### Exemplo Prático — Marmita Saudável

| Item | Custo |
|---|---|
| Proteína (150g frango) | R$ 3,50 |
| Carboidrato (arroz integral) | R$ 1,00 |
| Legumes variados | R$ 2,00 |
| Salada | R$ 1,00 |
| Embalagem | R$ 1,50 |
| **CMV Total** | **R$ 9,00** |
| **Preço sugerido (CMV 30%)** | **R$ 30,00** |

## Controle Financeiro

- **Fluxo de caixa** — Registrar entradas e saídas diariamente
- **DRE simplificado** — Receitas - custos = resultado
- **Separar contas** — Pessoal e empresarial
- **Reserva** — Mínimo 3 meses de custos fixos
- **Precificar corretamente** — Nunca vender abaixo do custo`,
        quiz: [
          {
            pergunta: "Qual o percentual ideal do CMV no preço de venda de marmitas?",
            opcoes: ["50-60%", "25-35%", "10-15%", "70-80%"],
            respostaCorreta: 1,
            explicacao: "O CMV ideal deve ficar entre 25-35% do preço de venda, garantindo margem para cobrir outros custos e gerar lucro.",
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
        titulo: "14.1 Bônus e Certificação",
        descricao: "Diversificação de receita, parcerias e materiais extras",
        duracaoMinutos: 60,
        conteudo: `# Bônus, Expansão e Certificação

## Diversificação de Receita

| Estratégia | Descrição | Potencial |
|---|---|---|
| **Workshops presenciais** | Aulas práticas para grupos | Alto |
| **Cursos online** | Receitas em vídeo, e-books | Escalável |
| **Consultoria** | Montagem de cardápios personalizados | Alto valor |
| **Produtos** | Granolas, temperos, snacks | Recorrente |
| **Catering** | Eventos corporativos e sociais | Alto ticket |
| **Livro de receitas** | Impresso ou digital | Passivo |

## Parcerias Estratégicas

| Parceiro | Benefício |
|---|---|
| **Nutricionistas** | Indicação mútua, credibilidade |
| **Academias** | Público-alvo alinhado |
| **Empresas** | Alimentação corporativa |
| **Influenciadores** | Divulgação, alcance |
| **Produtores locais** | Ingredientes frescos, storytelling |

## Materiais Exclusivos Inclusos

- ✅ E-book de 50 receitas saudáveis
- ✅ Planilha de precificação automática
- ✅ Modelo de cardápio semanal editável
- ✅ Checklist de boas práticas de higiene
- ✅ Lista de fornecedores verificados
- ✅ Templates para redes sociais

## Certificação

Ao finalizar o curso, você receberá o certificado de **Gastronomia Saudável — 130 horas**, válido para:

- Comprovar horas extracurriculares
- Enriquecer currículo profissional
- Abrir seu próprio negócio com credibilidade
- Atuar como personal chef ou consultor

> 🏆 Parabéns por concluir a formação em Gastronomia Saudável! Você está pronta para transformar a saúde das pessoas através da alimentação.`,
      },
    ],
  },
];
