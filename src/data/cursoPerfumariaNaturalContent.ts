import { mod1Fundamentos } from "./perfumariaNatural/mod1Fundamentos";
import { mod2MateriasPrimas } from "./perfumariaNatural/mod2MateriasPrimas";
import type { QuizQuestion } from "@/components/curso/QuizSection";

export interface AulaContent {
  titulo: string;
  descricao: string;
  conteudo: string;
  videoUrl?: string;
  duracaoMinutos: number;
  quiz?: QuizQuestion[];
  checklist?: string[];
}

export interface ModuloContent {
  titulo: string;
  descricao: string;
  icone: string;
  cor: string;
  aulas: AulaContent[];
}

// Re-export types
export type { QuizQuestion };

// Import existing modules 3-6 content inline (kept from original)
const mod3FamiliasOlfativas: ModuloContent = {
  titulo: "Famílias Olfativas e Criação",
  descricao: "As 7 famílias clássicas e criação prática de perfumes",
  icone: "Target",
  cor: "from-purple-50 to-pink-50",
  aulas: [
    {
      titulo: "A Roda Olfativa e Famílias Clássicas",
      descricao: "Navegando pela classificação profissional de perfumes",
      duracaoMinutos: 20,
      conteudo: `# A Roda Olfativa e Famílias Clássicas

## Classificação Profissional de Perfumes

A roda olfativa é a ferramenta fundamental para classificar, entender e criar perfumes. Desenvolvida por Michael Edwards, organiza os aromas em famílias e subfamílias.

### As 7 Famílias Principais

**1. Cítrica** — frescor, alegria, limão, bergamota
**2. Floral** — romantismo, rosa, jasmim, lírio
**3. Oriental** — calor, baunilha, especiarias, âmbar
**4. Amadeirada** — elegância, cedro, sândalo, vetiver
**5. Chipre** — sofisticação, patchouli, bergamota, musgo
**6. Fougère** — frescor aromático, lavanda, cumarina, musgo
**7. Aromática** — ervas, alecrim, tomilho, verde

### Subfamílias e Hibridização

Cada família possui subfamílias:
- Floral Verde, Floral Frutal, Floral Oriental
- Amadeirado Aromático, Amadeirado Seco
- Oriental Especiado, Oriental Gourmand

### Tendências 2026

- Hibridização radical: perfumes que pertencem a 2-3 famílias
- Perfumes "sem gênero": abolição de masculino/feminino
- Minimalismo olfativo: menos ingredientes, mais impacto`,
      quiz: [
        { pergunta: "Quem desenvolveu a roda olfativa moderna?", opcoes: ["François Coty", "Michael Edwards", "Jean-Paul Guerlain", "Mandy Aftel"], respostaCorreta: 1, explicacao: "Michael Edwards criou a roda olfativa (Fragrance Wheel) que é o padrão da indústria para classificação de perfumes." }
      ],
      checklist: ["Classificar 10 perfumes conhecidos nas famílias olfativas", "Mapear preferências pessoais na roda olfativa", "Criar mini-exemplos de 3 famílias diferentes (5ml cada)"]
    },
    {
      titulo: "Família Cítrica: Frescor e Vibração",
      descricao: "Criação de Colônia natural com técnicas de fixação",
      duracaoMinutos: 20,
      conteudo: `# Família Cítrica: Frescor e Vibração

## Dominando Perfumes Cítricos

A família cítrica é a mais antiga da perfumaria — a Eau de Cologne foi criada no século XVIII e continua relevante.

### Subcategorias

- **Cologne clássica**: bergamota + neroli + lavanda
- **Cítrico-Aromático**: cítricos + alecrim + lavanda
- **Cítrico-Amadeirado**: cítricos + cedro + vetiver

### Fórmula Base: Cologne Natural Moderna

- **Topo (40%)**: Bergamota 25% + Limão siciliano 10% + Petitgrain 5%
- **Coração (30%)**: Neroli 15% + Lavanda 10% + Gerânio 5%
- **Base (30%)**: Vetiver 15% + Cedro 10% + Benjoim 5%

### Técnicas de Fixação para Cítricos

**1. Base forte** — mínimo 30% de notas de base
**2. Ponte aromática** — petitgrain e lavanda conectam topo e coração
**3. Maceração longa** — 4-6 semanas para casamento das notas
**4. Concentração elevada** — EdP (15-20%) ao invés de EdC (3-5%)`,
      quiz: [
        { pergunta: "Qual técnica NÃO ajuda a fixar perfumes cítricos?", opcoes: ["Usar mínimo 30% de notas de base", "Adicionar mais óleos cítricos ao topo", "Maceração longa (4-6 semanas)", "Usar concentração EdP (15-20%)"], respostaCorreta: 1, explicacao: "Adicionar mais cítricos ao topo não ajuda na fixação — eles evaporam rápido. A fixação vem da base e da maceração." }
      ],
      checklist: ["Formular Cologne Natural Moderna seguindo a receita base", "Criar 3 variações da fórmula (Mediterrâneo, Tropical, Oriental)", "Fazer teste de durabilidade checando em 1h, 4h e 8h"]
    },
    {
      titulo: "Família Floral: Romantismo e Sofisticação",
      descricao: "Buquês florais, soliflors e florais modernos",
      duracaoMinutos: 20,
      conteudo: `# Família Floral: Romantismo e Sofisticação

## O Coração da Perfumaria

### Fórmula Base: Buquê Floral Natural

- **Topo (20%)**: Bergamota 15% + Mandarina 5%
- **Coração (50%)**: Ylang-ylang 15% + Gerânio 15% + Lavanda 10% + Rosa 10%
- **Base (30%)**: Sândalo 15% + Patchouli 10% + Benjoim 5%

### Tipos de Criação Floral

**Soliflor** — Um único floral dominante
**Buquê** — Combinação de vários florais harmonizados
**Floral Verde** — Florais + notas verdes
**Floral Moderno** — Minimalista, poucos ingredientes

### Projetos Práticos

**"Jardim ao Amanhecer"** (floral verde): Rosa 20% + Gerânio 20% + Petitgrain 20% + Bergamota 20% + Vetiver 20%
**"Rosa Romântica"** (soliflor): Gerânio 35% + Palmarosa 25% + Ylang 15% + Sândalo 15% + Benjoim 10%
**"Floral Moderno"** (minimalista): Neroli 35% + Lavanda 30% + Cedro 35%`,
      quiz: [
        { pergunta: "O que é um perfume 'soliflor'?", opcoes: ["Um perfume feito com um único ingrediente", "Um perfume onde um único floral domina a composição", "Um perfume sem notas florais", "Um perfume que muda ao longo do dia"], respostaCorreta: 1, explicacao: "Soliflor é um perfume onde um único floral domina, apoiado por ingredientes que reforçam essa nota." }
      ],
      checklist: ["Formular Buquê Floral Natural com a receita base", "Criar perfume soliflor 'Rosa Romântica'", "Comparar resultado final entre buquê e soliflor"]
    },
    {
      titulo: "Família Oriental: Mistério e Sensualidade",
      descricao: "Perfumes quentes com especiarias e baunilha",
      duracaoMinutos: 20,
      conteudo: `# Família Oriental: Mistério e Sensualidade

## Calor, Profundidade e Opulência

### Fórmula Base: Oriental Natural

- **Topo (15%)**: Bergamota 10% + Mandarina 5%
- **Coração (35%)**: Ylang-ylang 10% + Canela 5% + Cardamomo 10% + Rosa 10%
- **Base (50%)**: Baunilha CO2 15% + Benjoim 15% + Patchouli 10% + Vetiver 10%

### Subcategorias

**Oriental Especiado**: canela, cravo, cardamomo dominando
**Oriental Gourmand**: baunilha, fava tonka, benjoim
**Oriental Floral**: rosa, jasmim com base âmbar/baunilha
**Oriental Amadeirado**: oud, sândalo com especiarias

### Projetos Práticos

**"Oriental Especiado"**: Bergamota 10% + Cardamomo 15% + Canela 5% + Pimenta 5% + Patchouli 20% + Vetiver 15% + Benjoim 15% + Incenso 15%
**"Baunilha Sensual"**: Mandarina 10% + Ylang 15% + Rosa 10% + Baunilha 25% + Fava tonka 20% + Benjoim 10% + Sândalo 10%`,
      quiz: [
        { pergunta: "Qual é a principal característica dos perfumes orientais?", opcoes: ["Base forte de especiarias, baunilha e resinas quentes", "Uso predominante de cítricos", "Notas aquáticas", "Leveza herbal"], respostaCorreta: 0, explicacao: "Perfumes orientais são definidos pela base quente de especiarias, baunilha, âmbar e resinas balsâmicas." }
      ],
      checklist: ["Formular Oriental Especiado unissex", "Criar Gourmand Natural 'Baunilha Sensual'", "Testar Âmbar Dourado e comparar projeção com cítrico"]
    },
    {
      titulo: "Família Amadeirada: Elegância Atemporal",
      descricao: "Perfumes unissex com madeiras nobres",
      duracaoMinutos: 20,
      conteudo: `# Família Amadeirada: Elegância Atemporal

### Fórmula Base: Amadeirado Aromático

- **Topo (25%)**: Bergamota 10% + Limão 5% + Alecrim 10%
- **Coração (30%)**: Sálvia esclareia 15% + Lavanda 10% + Gerânio 5%
- **Base (45%)**: Cedro 20% + Vetiver 15% + Patchouli 10%

### Projetos Práticos

**"Floresta ao Amanhecer"**: Petitgrain 15% + Alecrim 10% + Gálbano 5% + Cedro 25% + Vetiver 20% + Incenso 15% + Patchouli 10%
**"Meditação Zen"**: Bergamota 10% + Incenso 25% + Sândalo 25% + Cedro 15% + Vetiver 15% + Benjoim 10%

> **Dica**: Amadeirados são os melhores perfumes para iniciantes — são forgiving (perdoam erros de proporção).`,
      quiz: [
        { pergunta: "Por que amadeirados são recomendados para iniciantes?", opcoes: ["São mais baratos", "São forgiving — perdoam erros de proporção", "Usam poucos ingredientes", "Não precisam de maceração"], respostaCorreta: 1, explicacao: "Amadeirados são 'forgiving' — mesmo com proporções imprecisas, o resultado geralmente é agradável." }
      ],
      checklist: ["Formular Amadeirado Aromático com a receita base", "Criar 'Floresta ao Amanhecer' e 'Meditação Zen'", "Desenvolver perfume unissex amadeirado próprio"]
    },
    {
      titulo: "Chipre, Fougère e Famílias Modernas",
      descricao: "Sofisticação clássica e tendências contemporâneas",
      duracaoMinutos: 25,
      conteudo: `# Chipre, Fougère e Famílias Modernas

### Família Chipre

**Chipre Natural Moderno:**
- Topo (30%): Bergamota 20% + Limão 10%
- Coração (30%): Gerânio 10% + Rosa 10% + Ylang 5% + Sálvia 5%
- Base (40%): Patchouli 20% + Vetiver 10% + Labdanum 5% + Benjoim 5%

### Família Fougère

**Fougère Natural:**
- Topo (30%): Bergamota 15% + Limão 10% + Petitgrain 5%
- Coração (35%): Lavanda 20% + Gerânio 10% + Sálvia esclareia 5%
- Base (35%): Fava tonka 10% + Vetiver 15% + Cedro 10%

### Famílias Modernas

**Gourmand Sofisticado:**
- Topo (20%): Bergamota 15% + Mandarina 5%
- Coração (30%): Canela 5% + Cardamomo 10% + Ylang 10% + Rosa 5%
- Base (50%): Baunilha CO2 20% + Fava tonka 15% + Benjoim 10% + Patchouli 5%

### Limitações Naturais

❌ Notas aquáticas/marinhas: impossíveis sem sintéticos
❌ Musgo de carvalho: regulado por IFRA
✅ Gourmand: totalmente viável com baunilha, café, cacau CO2
✅ Verde: gálbano, petitgrain e folha de violeta são excelentes`,
      quiz: [
        { pergunta: "Qual é a estrutura clássica de um perfume fougère?", opcoes: ["Rosa + patchouli + baunilha", "Lavanda + cumarina (fava tonka) + musgo", "Bergamota + cedro + vetiver", "Limão + menta + eucalipto"], respostaCorreta: 1, explicacao: "A família fougère é definida pela tríade lavanda + cumarina (fava tonka) + musgo." }
      ],
      checklist: ["Formular Chipre Natural Moderno", "Criar Fougère Natural com fava tonka", "Experimentar Gourmand Sofisticado com baunilha CO2"]
    }
  ]
};

const mod4TecnicasFormulacao: ModuloContent = {
  titulo: "Técnicas e Formulação",
  descricao: "Acordes, proporções, maceração e formatos alternativos",
  icone: "Package",
  cor: "from-blue-50 to-indigo-50",
  aulas: [
    { titulo: "Acordes: Construindo Harmonias", descricao: "Combinações de ingredientes que criam aromas novos", duracaoMinutos: 20, conteudo: `# Acordes: Construindo Harmonias\n\n## A Base da Criação em Perfumaria\n\nUm acorde é a combinação de 3 ou mais ingredientes que, juntos, criam um aroma completamente novo.\n\n> **Um bom acorde é aquele em que nenhum ingrediente individual é reconhecível — apenas o conjunto.**\n\n### Técnica de Construção\n\n1. **Nota principal** (40-50%): define o caráter\n2. **Nota de apoio** (25-35%): reforça e complementa\n3. **Nota de contraste** (15-25%): adiciona interesse\n\n### Acordes Clássicos\n\n**Acorde Rosa Natural**: Gerânio 40% + Palmarosa 30% + Ylang 20% + Patchouli 10%\n**Acorde Âmbar**: Baunilha 30% + Benjoim 30% + Labdanum 20% + Vetiver 20%\n**Acorde Verde Fresco**: Gálbano 20% + Petitgrain 40% + Alecrim 30% + Gerânio 10%\n**Acorde Couro**: Cedro 30% + Bétula 25% + Labdanum 25% + Incenso 20%\n**Acorde Mel/Cera**: Benjoim 35% + Ylang 30% + Rosa 20% + Baunilha 15%\n\n### Biblioteca Pessoal\n\n- Preparar cada acorde em 5ml\n- Rotular com data e composição\n- Maturar por 48h antes de avaliar`, quiz: [{ pergunta: "O que caracteriza um bom acorde?", opcoes: ["Todos ingredientes reconhecíveis", "Nenhum ingrediente individual reconhecível — apenas o conjunto", "Máximo 2 ingredientes", "Apenas notas de topo"], respostaCorreta: 1, explicacao: "Um acorde bem construído funde os ingredientes criando uma nota nova e coesa." }], checklist: ["Criar 5 acordes usando técnica principal+apoio+contraste", "Maturar acordes por 48h e reavaliar", "Iniciar biblioteca pessoal de acordes"] },
    { titulo: "Fórmulas e Proporções", descricao: "Cálculos, concentrações e escala de produção", duracaoMinutos: 20, conteudo: `# Fórmulas e Proporções\n\n### Sistema de Gotas (testes 5ml)\n- 1ml ≈ 20 gotas | 5ml = 100 gotas\n- Concentração 15%: 15 gotas blend + 85 gotas álcool\n\n### Concentrações\n\n| Tipo | Blend | Duração |\n| Eau Fraiche | 1-3% | 1-2h |\n| Eau de Cologne | 3-5% | 2-3h |\n| Eau de Toilette | 5-15% | 3-5h |\n| Eau de Parfum | 15-20% | 5-8h |\n| Extrait | 20-30% | 8-12h+ |\n\n### Escalando Fórmulas\n\nPara escalar de 5ml para 100ml: multiplique por 20\nSempre testar em 30ml antes de produzir\n\n### Cálculo de Custo\n\nPreço varejo = custo × 4 (markup padrão, margem 75%)\nPreço atacado = custo × 2.5`, quiz: [{ pergunta: "Quantas gotas para teste 5ml a 15%?", opcoes: ["5", "15", "50", "100"], respostaCorreta: 1, explicacao: "5ml = 100 gotas. 15% = 15 gotas de blend + 85 de álcool." }], checklist: ["Converter 3 receitas de gotas para ml", "Escalar fórmula de 5ml para 30ml e 100ml", "Calcular custo de 3 perfumes criados"] },
    { titulo: "Maceração e Maturação", descricao: "O envelhecimento que transforma perfumes", duracaoMinutos: 15, conteudo: `# Maceração e Maturação\n\n## O Tempo como Ingrediente\n\n### O que Acontece\n- Moléculas se ligam e criam novos compostos\n- Notas ásperas se suavizam\n- Álcool se integra ao blend\n- Harmonia geral aumenta\n\n### Cronograma\n- **48h**: avaliação inicial possível\n- **1 semana**: mudanças perceptíveis\n- **2-4 semanas**: maturação boa\n- **3-6 meses**: perfeição (orientais e amadeirados)\n\n### Condições Ideais\n- Frasco escuro, fechado\n- Temperatura 18-22°C constante\n- Longe da luz solar\n- Agitar suavemente 1x/semana`, quiz: [{ pergunta: "Tempo mínimo de maceração?", opcoes: ["1 hora", "24h", "48h", "1 semana"], respostaCorreta: 2, explicacao: "48h é o mínimo para avaliação inicial. Ideal: 2-4 semanas." }], checklist: ["Criar calendário de maceração para cada perfume", "Testar mesmo perfume em 48h, 1 semana e 4 semanas", "Anotar evolução olfativa ao longo do tempo"] },
    { titulo: "Perfumes Sólidos, Roll-ons e Sachês", descricao: "Formatos alternativos ao spray tradicional", duracaoMinutos: 15, conteudo: `# Formatos Alternativos\n\n### Perfume Sólido\n- Cera de abelha: 30g\n- Óleo de jojoba: 30g\n- Blend aromático: 3-5ml\n- Derreter, misturar, despejar em lata\n\n### Roll-on\n- Óleo de jojoba ou coco fracionado\n- Concentração 15-25%\n- Maior fixação que spray\n\n### Sachê Perfumado\n- Bicarbonato: 50g + Amido: 50g\n- Blend: 2ml + Flores secas\n\n| Formato | Fixação | Portabilidade | Custo |\n| Spray | 4-8h | Média | Médio |\n| Roll-on | 6-10h | Alta | Baixo |\n| Sólido | 3-6h | Muito alta | Baixo |`, quiz: [{ pergunta: "Qual formato tem maior fixação?", opcoes: ["Spray", "Roll-on em óleo", "Sólido em cera", "Body mist"], respostaCorreta: 1, explicacao: "Roll-ons em óleo fixam 6-10h porque o óleo retarda a evaporação." }], checklist: ["Criar perfume sólido em lata", "Criar roll-on aromático 10ml", "Comparar durabilidade dos 3 formatos"] },
    { titulo: "Correção e Refinamento", descricao: "Identificar e corrigir problemas em fórmulas", duracaoMinutos: 15, conteudo: `# Correção e Refinamento\n\n### Problemas Comuns\n\n**Muito intenso** → Diluir ou adicionar sândalo, cedro\n**Sem fixação** → Adicionar vetiver, benjoim\n**Desequilibrado** → Ajustar pirâmide\n**Muito linear** → Adicionar contraste\n**Aroma plano** → Toque de cítrico ou especiaria\n**Notas conflitantes** → Nota-ponte harmonizadora\n\n### Método\n\n1. Identificar problema (após 48h)\n2. Hipótese de correção (1 mudança por vez)\n3. Ajustar em incrementos de 1-2%\n4. Maturar 48h e reavaliar\n\n> **Regra de ouro: nunca faça mais de 2 ajustes simultâneos.**`, quiz: [{ pergunta: "Regra de ouro para corrigir perfume?", opcoes: ["Refazer do zero", "Máximo 2 ajustes simultâneos, testar e continuar", "Adicionar mais ingredientes", "Diluir até resolver"], respostaCorreta: 1, explicacao: "Ajustes controlados — no máximo 2 mudanças por vez, com 48h entre testes." }], checklist: ["Analisar 3 perfumes usando checklist de qualidade", "Corrigir 1 perfume documentando cada ajuste", "Comparar original vs corrigido após 48h"] }
  ]
};

const mod5ProjetosPraticos: ModuloContent = {
  titulo: "Projetos Práticos",
  descricao: "Perfume autoral, coleção, cliente fictício e recriação",
  icone: "Lightbulb",
  cor: "from-rose-50 to-pink-50",
  aulas: [
    { titulo: "Projeto Assinatura Pessoal", descricao: "Crie seu perfume autoral que representa sua essência", duracaoMinutos: 25, conteudo: `# Projeto: Assinatura Pessoal\n\n## Seu Perfume, Sua Identidade\n\n### Etapa 1: Conceito\n- Que emoção quero evocar?\n- Que memória quero despertar?\n- 5-7 palavras-chave que me definem\n\n### Etapa 2: Moodboard\n- Cores, paisagens, texturas, referências artísticas\n\n### Etapa 3: Seleção\n- 8-12 óleos essenciais\n- Testar 3 acordes preliminares\n- Definir família e nota de assinatura\n\n### Etapa 4: Formulação\n- Pirâmide detalhada\n- Fórmula inicial (5ml)\n- Ficha técnica\n\n### Etapa 5: Refinamento\n- Avaliar após 48h\n- Maturar 4 semanas\n- Versão final em 30ml\n\n### Entrega\n- [ ] 30ml de perfume final\n- [ ] Ficha técnica completa\n- [ ] História/conceito (150 palavras)\n- [ ] Nome e identidade visual`, quiz: [{ pergunta: "Primeira etapa para perfume de assinatura?", opcoes: ["Escolher óleos", "Definir conceito, emoção e palavras-chave", "Calcular proporções", "Comprar embalagens"], respostaCorreta: 1, explicacao: "Todo perfume começa com o conceito — emoção e identidade antes de selecionar ingredientes." }], checklist: ["Definir conceito com 5-7 palavras-chave", "Criar moodboard visual", "Selecionar 8-12 OEs e testar 3 acordes", "Formular versão 5ml com ficha técnica", "Maturar 4 semanas e criar versão final 30ml"] },
    { titulo: "Projeto Linha para Ocasiões", descricao: "Mini-coleção de 3 perfumes coerentes", duracaoMinutos: 25, conteudo: `# Projeto: Linha para Ocasiões\n\n## 3 Perfumes, 1 Identidade\n\n1. **Dia a Dia** — fresco, versátil\n2. **Trabalho** — sofisticado, discreto\n3. **Noite** — intenso, memorável\n\n### Requisitos\n- Identidade visual comum\n- 15ml cada perfume\n- Preço acessível\n\n> **Use 2-3 ingredientes em comum** nos 3 perfumes — cria "DNA" olfativo da coleção.\n\n### Atividades\n- [ ] Mood board da coleção\n- [ ] Formular os 3 perfumes\n- [ ] Nomes e descrições\n- [ ] Rótulos com identidade comum\n- [ ] Calcular custo e preço`, quiz: [{ pergunta: "Como criar coerência em coleção?", opcoes: ["Mesmos ingredientes só mudando proporção", "2-3 ingredientes comuns como 'DNA' da coleção", "Todos da mesma família", "Mesma embalagem"], respostaCorreta: 1, explicacao: "2-3 ingredientes comuns em proporções diferentes criam assinatura sem tornar perfumes iguais." }], checklist: ["Criar mood board da coleção", "Formular Perfume Dia a Dia", "Formular Perfume Trabalho", "Formular Perfume Noite", "Calcular custo total e preços"] },
    { titulo: "Projeto Perfume para Cliente Fictício", descricao: "Pratique briefing profissional e criação sob encomenda", duracaoMinutos: 20, conteudo: `# Projeto: Cliente Fictício\n\n### Cenários\n\n**Cliente A**: Mulher, 35 anos, executiva. Florais modernos. Poder, elegância.\n**Cliente B**: Homem, 28 anos, artista. Amadeirado-aromático. Inspiração, natureza.\n**Cliente C**: Pessoa não-binária, 24 anos. Verde-terroso. Frescor, liberdade.\n\n### Processo\n1. Análise do briefing\n2. Proposta de conceito\n3. 2-3 variações para escolha\n4. Apresentação profissional\n\n### Entrega\n- [ ] Perfume 15ml\n- [ ] Proposta de conceito\n- [ ] Ficha técnica\n- [ ] Argumentação criativa`, quiz: [{ pergunta: "Primeiro passo ao receber briefing de cliente?", opcoes: ["Misturar ingredientes", "Analisar perfil do cliente, preferências e ocasião", "Mostrar coleção pronta", "Perguntar orçamento"], respostaCorreta: 1, explicacao: "Análise profunda do briefing — entender quem é o cliente, preferências e ocasião." }], checklist: ["Escolher 1 dos 3 clientes fictícios", "Criar proposta de conceito com moodboard", "Formular 2-3 variações (5ml cada)", "Preparar apresentação profissional"] },
    { titulo: "Projeto Recriação de Clássico Natural", descricao: "Interprete perfumes icônicos em versão 100% natural", duracaoMinutos: 20, conteudo: `# Projeto: Recriação de Clássico\n\n### Perfumes Sugeridos\n\n**Chanel Nº 5** → Ylang + Neroli + Rosa + Sândalo + Benjoim\n**Dior Sauvage** → Bergamota + Lavanda + Pimenta + Cedro + Âmbar\n**Tom Ford Black Orchid** → Patchouli + Baunilha + Cardamomo + Incenso\n\n### Substituições\n\n| Sintético | Natural |\n| Aldeído | Neroli + petitgrain |\n| Calone (aquático) | Lima + gálbano + vetiver |\n| Musgo de carvalho | Patchouli + vetiver + cedro |\n| Musk sintético | Semente de ambrette |\n| Ambroxan | Sálvia esclareia + labdanum |\n\n### Entrega\n- [ ] Perfume natural 30ml\n- [ ] Análise comparativa\n- [ ] Reflexão sobre limitações`, quiz: [{ pergunta: "Objetivo ao recriar clássico em natural?", opcoes: ["Cópia exata", "Manter 'intenção' e caráter, aceitando limitações naturais", "Mesmos ingredientes", "Perfume completamente diferente"], respostaCorreta: 1, explicacao: "Recriação busca capturar o espírito do original, aceitando limitações naturais." }], checklist: ["Pesquisar pirâmide do perfume escolhido", "Identificar substitutos naturais", "Formular versão natural 30ml", "Documentar diferenças e reflexões"] }
  ]
};

const mod6NegociosMercado: ModuloContent = {
  titulo: "Negócios e Mercado",
  descricao: "Precificação, branding, marketing e regulamentação",
  icone: "BarChart3",
  cor: "from-teal-50 to-cyan-50",
  aulas: [
    { titulo: "Mercado de Perfumaria Natural", descricao: "Tendências, nichos lucrativos e oportunidades", duracaoMinutos: 15, conteudo: `# Mercado de Perfumaria Natural\n\n### Números 2026\n- Mercado global: US$ 5.2 bilhões\n- Crescimento: 12-15%/ano\n- Brasil: 4º maior mercado do mundo\n- Clean beauty: +25-40% de disposição a pagar\n\n### Nichos Lucrativos\n✅ Perfumes terapêuticos\n✅ Perfumes masculinos naturais\n✅ Unissex/sem gênero\n✅ Home fragrance\n✅ Perfumes para casamentos\n\n### Referências do Mercado Brasileiro\n- Rosa de Luz (Theo Bibancos): workshop 16h, certificado IBRA. R$ 1.200-1.300\n- Harmonie Aromaterapia: formação 48h online, kit incluso. R$ 2.960\n- Paralela Escola Olfativa: 1 ano, chancela francesa. Valores sob consulta\n- Perfumaris: 150h+, concurso com prêmio real\n- I'One Fragrances: 14h, foco em matérias-primas isoladas`, quiz: [{ pergunta: "Quanto a mais consumidores pagam por perfumes naturais?", opcoes: ["5-10%", "25-40%", "50-70%", "Nada a mais"], respostaCorreta: 1, explicacao: "Consumidores clean beauty pagam 25-40% a mais por ingredientes naturais." }], checklist: ["Pesquisar 10 marcas de perfumaria natural", "Fazer análise SWOT pessoal", "Identificar 3 nichos com potencial"] },
    { titulo: "Precificação e Custos", descricao: "Cálculos, markup e estratégias de preço", duracaoMinutos: 15, conteudo: `# Precificação e Custos\n\n### Estrutura (EdP 30ml)\n- Óleos essenciais: R$ 15-40\n- Álcool 95%: R$ 2-5\n- Embalagem: R$ 8-15\n- Mão de obra: R$ 10-20\n- **Custo total**: R$ 35-80\n\n### Fórmula\n**Varejo** = Custo × 4 (margem ~75%)\n**Atacado** = Custo × 2.5\n\n### Estratégias\n**Premium** (R$ 200-500/30ml): ingredientes raros, luxo\n**Acessível** (R$ 80-180/30ml): bons ingredientes, volume\n**Econômica** (R$ 40-80/15ml): roll-ons, entrada\n\n### Kits (+40-60% ticket médio)\n- Descoberta: 3×5ml = R$ 89,90\n- Completo: 30ml + sólido + sachê = R$ 249,90`, quiz: [{ pergunta: "Markup padrão varejo?", opcoes: ["× 2", "× 3", "× 4", "× 6"], respostaCorreta: 2, explicacao: "Markup 4x (margem ~75%) cobre custos fixos, marketing e lucro." }], checklist: ["Calcular custo de 3 perfumes criados", "Definir preços com markup 4x", "Criar tabela: varejo, atacado e kits"] },
    { titulo: "Branding e Marketing Digital", descricao: "Identidade de marca e estratégias online", duracaoMinutos: 15, conteudo: `# Branding e Marketing Digital\n\n### Elementos de Branding\n- Nome memorável e pronunciável\n- Logo simples e versátil\n- Paleta: 3-5 cores\n- Tom de voz: íntimo? Luxuoso? Acessível?\n- Valores: sustentabilidade, artesanal\n\n### Embalagem Sustentável\n- Vidro reutilizável, refil\n- Papel reciclado/plantável\n- Kraft, evitar plástico\n\n### Marketing Digital (Instagram = 80% das vendas!)\n- Behind the scenes\n- Educação: benefícios naturais\n- Depoimentos\n- Reels 15-30s\n\n### Canais de Venda\n✅ Instagram Shopping\n✅ Feiras artesanais\n✅ Spas parceiros\n✅ Site próprio\n✅ Elo7, Etsy`, quiz: [{ pergunta: "Principal canal de vendas artesanal?", opcoes: ["Farmácias", "Supermercados", "Instagram + feiras + lojas conceito", "E-commerce próprio"], respostaCorreta: 2, explicacao: "Instagram é ~80% das vendas iniciais de perfumaria artesanal." }], checklist: ["Definir nome, valores e tom de voz", "Criar moodboard de identidade visual", "Planejar calendário 1 mês (12 posts)", "Listar 5 parceiros potenciais"] },
    { titulo: "Regulamentação e Segurança", descricao: "ANVISA, rotulagem obrigatória e certificações", duracaoMinutos: 15, conteudo: `# Regulamentação e Segurança\n\n### ANVISA\nPerfumes = Cosméticos Grau 1 (risco mínimo)\n- Notificação obrigatória\n- Não precisa registro prévio\n\n### Rotulagem Obrigatória\n- Nome e marca\n- INCI (ingredientes)\n- Conteúdo líquido (ml)\n- Prazo de validade / PAO\n- CNPJ, endereço\n- Lote, país de origem\n- Avisos (foto, alérgenos)\n\n### Testes\n- Estabilidade: 90 dias\n- Compatibilidade: perfume vs embalagem\n- Patch test (HRIPT)\n- Microbiológico\n\n### Certificações Voluntárias\n- Vegano, Cruelty-free\n- Orgânico (IBD, ECOCERT)\n- Natural (COSMOS, NATRUE)\n\n### Boas Práticas\n✅ Ambiente limpo exclusivo\n✅ Utensílios higienizados\n✅ Certificados de origem\n✅ Registro de lotes\n✅ Armazenamento adequado`, quiz: [{ pergunta: "Classificação ANVISA para perfumes?", opcoes: ["Medicamento", "Cosmético Grau 1", "Cosmético Grau 2", "Alimento"], respostaCorreta: 1, explicacao: "Perfumes são cosméticos Grau 1 (risco mínimo) — notificação obrigatória, sem registro prévio." }], checklist: ["Estudar notificação ANVISA", "Criar modelo de rótulo legal", "Definir protocolo de boas práticas", "Pesquisar certificações relevantes", "Iniciar registro de lotes"] }
  ]
};

export const cursoPerfumariaNaturalData: ModuloContent[] = [
  mod1Fundamentos,
  mod2MateriasPrimas,
  mod3FamiliasOlfativas,
  mod4TecnicasFormulacao,
  mod5ProjetosPraticos,
  mod6NegociosMercado,
];
