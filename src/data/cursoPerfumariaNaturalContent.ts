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

export const cursoPerfumariaNaturalData: ModuloContent[] = [
  // ──────────────────────────────────────────────
  // MÓDULO 1: FUNDAMENTOS DA PERFUMARIA NATURAL
  // ──────────────────────────────────────────────
  {
    titulo: "Fundamentos da Perfumaria Natural",
    descricao: "História, anatomia olfativa e bases da perfumaria",
    icone: "BookOpen",
    cor: "from-amber-50 to-yellow-50",
    aulas: [
      {
        titulo: "A História dos Aromas",
        descricao: "A evolução da perfumaria através dos séculos",
        duracaoMinutos: 20,
        conteudo: `# A História dos Aromas

## Da Antiguidade à Perfumaria Natural Moderna

A perfumaria é uma das artes mais antigas da humanidade. Desde os primeiros incensos queimados em rituais sagrados até os perfumes artesanais contemporâneos, os aromas sempre estiveram no centro da experiência humana.

### Perfumaria no Mundo Antigo

- **Egito Antigo**: Kyphi, o perfume sagrado — combinação de mirra, canela, junípero e mel. Usado em rituais de adoração e embalsamamento.
- **Grécia e Roma**: Democratização dos aromas. Banhos perfumados, óleos corporais e guirlandas aromáticas em banquetes.
- **Rota das Especiarias**: Conexão entre Oriente e Ocidente — incenso, mirra, sândalo e canela viajavam milhares de quilômetros.

### A Influência Árabe

> **Os árabes aperfeiçoaram a destilação a vapor no século X, revolucionando a extração de óleos essenciais.**

Avicena (Ibn Sina) é creditado como o pai da destilação moderna. A água de rosas tornou-se símbolo de hospitalidade e sofisticação.

### Grasse: Capital Mundial do Perfume

A cidade de Grasse, no sul da França, tornou-se o epicentro da perfumaria europeia no século XVII:
- Campos de lavanda, jasmim e rosa
- Técnica de enfleurage (extração por gordura)
- Nascimento das grandes casas de perfumaria

### A Revolução Sintética (Século XX)

- 1882: Fougère Royale — primeiro perfume com molécula sintética (cumarina)
- 1921: Chanel Nº 5 — aldeídos revolucionam a perfumaria
- Décadas de 1980-2000: domínio total dos sintéticos

### O Renascimento Natural (2000-2026)

O movimento de volta ao natural ganhou força:
- Consumidores buscam transparência e sustentabilidade
- Perfumistas como Mandy Aftel, JoAnne Bassett e Anya McCoy lideram o movimento
- Certificações naturais: ECOCERT, COSMOS, IFRA Natural
- Tendências 2026: rastreabilidade total, biodiversidade e perfumaria regenerativa

**A perfumaria natural não é um retrocesso — é uma evolução consciente.**`,
        quiz: [
          {
            pergunta: "Quem é creditado como o pai da destilação moderna de óleos essenciais?",
            opcoes: ["François Coty", "Avicena (Ibn Sina)", "René-Maurice Gattefossé", "Ernest Beaux"],
            respostaCorreta: 1,
            explicacao: "Avicena (Ibn Sina) aperfeiçoou a técnica de destilação a vapor no século X, permitindo a extração eficiente de óleos essenciais."
          },
          {
            pergunta: "Qual cidade é considerada a capital mundial do perfume?",
            opcoes: ["Paris", "Florença", "Grasse", "Dubai"],
            respostaCorreta: 2,
            explicacao: "Grasse, no sul da França, é historicamente o centro da perfumaria mundial, conhecida pelos campos de lavanda, jasmim e rosa."
          }
        ],
        checklist: [
          "Criar linha do tempo pessoal com marcos históricos da perfumaria",
          "Pesquisar 3 perfumistas naturais contemporâneos e suas filosofias",
          "Identificar 5 ingredientes naturais que já eram usados no Egito Antigo"
        ]
      },
      {
        titulo: "Anatomia do Olfato",
        descricao: "Como funciona nosso sistema olfativo e a conexão com memórias",
        duracaoMinutos: 20,
        conteudo: `# Anatomia do Olfato

## Como Percebemos os Aromas

O olfato é o sentido mais primitivo e diretamente conectado ao nosso sistema emocional. Entender como funciona é essencial para criar perfumes que realmente tocam as pessoas.

### O Sistema Olfativo

- **Narinas**: entrada das moléculas aromáticas
- **Epitélio olfativo**: área de 5cm² com ~10 milhões de receptores
- **Bulbo olfativo**: processa sinais e envia ao cérebro
- **Sistema límbico**: centro emocional — por isso aromas evocam memórias

> **Somos capazes de distinguir mais de 1 trilhão de combinações aromáticas diferentes.**

### Neurociência do Olfato

- O olfato é o único sentido que NÃO passa pelo tálamo
- Conexão direta com amígdala (emoções) e hipocampo (memórias)
- Fenômeno da "Memória Involuntária de Proust" — um aroma pode transportar instantaneamente para uma lembrança

### Variações de Percepção

- **Anosmia**: incapacidade total de perceber aromas
- **Hiposmia**: redução da capacidade olfativa
- **Parosmia**: distorção dos aromas (pós-COVID é comum)
- **Adaptação olfativa**: deixamos de perceber aromas constantes após ~20 minutos

### Treinamento do Nariz

Para se tornar um perfumista, é essencial treinar o nariz sistematicamente:

**1. Cheirar conscientemente** — 5 aromas por dia, com atenção plena
**2. Criar vocabulário** — descrever cada aroma com 3+ adjetivos
**3. Memória olfativa** — associar aromas a imagens e emoções
**4. Diário olfativo** — registrar percepções diariamente

### Exercício Fundamental

- [ ] Treinar olfato com 5 aromas básicos: limão, lavanda, canela, café, rosa
- [ ] Registrar 3 aromas diferentes por dia durante 1 semana
- [ ] Praticar a descrição olfativa sem nomear o ingrediente`,
        quiz: [
          {
            pergunta: "Por que o olfato está tão conectado a memórias e emoções?",
            opcoes: [
              "Porque o nariz é muito grande",
              "Porque o sinal olfativo vai direto ao sistema límbico, sem passar pelo tálamo",
              "Porque temos mais receptores olfativos que visuais",
              "Porque o olfato se desenvolve por último no embrião"
            ],
            respostaCorreta: 1,
            explicacao: "O olfato é o único sentido com conexão direta ao sistema límbico (amígdala e hipocampo), responsável por emoções e memórias."
          },
          {
            pergunta: "O que é adaptação olfativa?",
            opcoes: [
              "Capacidade de cheirar melhor com o tempo",
              "Perda permanente do olfato",
              "Deixar de perceber um aroma constante após ~20 minutos",
              "Alergia a aromas fortes"
            ],
            respostaCorreta: 2,
            explicacao: "A adaptação olfativa é o fenômeno natural de deixar de perceber aromas aos quais estamos constantemente expostos."
          }
        ],
        checklist: [
          "Criar diário olfativo com template próprio",
          "Treinar com 5 aromas básicos e registrar percepções",
          "Praticar descrição olfativa sem nomear o ingrediente"
        ]
      },
      {
        titulo: "Aromaterapia e Perfumaria",
        descricao: "Princípios terapêuticos dos óleos essenciais na criação",
        duracaoMinutos: 20,
        conteudo: `# Aromaterapia e Perfumaria

## A Ponte entre Ciência e Arte

A aromaterapia é a base científica que fundamenta muitas escolhas criativas na perfumaria natural. Compreender as propriedades terapêuticas dos óleos essenciais enriquece a criação.

### Propriedades Terapêuticas Principais

| Propriedade | Óleos Essenciais |
| Relaxante | Lavanda, camomila, ylang-ylang |
| Estimulante | Alecrim, hortelã, eucalipto |
| Antisséptico | Tea tree, tomilho, oregano |
| Antidepressivo | Bergamota, neroli, rosa |
| Ansiolítico | Vetiver, sândalo, incenso |

### Aromaterapia Emocional

Cada emoção pode ser trabalhada com aromas específicos:

- **Ansiedade** → Lavanda + Bergamota + Vetiver
- **Tristeza** → Neroli + Rosa + Ylang-ylang
- **Raiva** → Camomila romana + Sândalo + Incenso
- **Falta de foco** → Alecrim + Limão + Hortelã
- **Alegria** → Laranja doce + Mandarina + Gerânio

### Perfumes Funcionais vs Artísticos

> **Perfume funcional**: criado com intenção terapêutica clara (relaxar, energizar)
> **Perfume artístico**: criado pela beleza estética do aroma

Na perfumaria natural, frequentemente unimos as duas abordagens — um perfume pode ser belo E terapêutico.

### Segurança e Contraindicações

⚠️ Óleos essenciais são compostos químicos potentes:
- Sempre diluir antes do uso na pele
- Alguns são fotossensibilizantes (cítricos expressos)
- Gestantes, crianças e idosos requerem cuidados especiais
- Nunca ingerir sem orientação profissional
- Teste de alergia: aplicar diluição no antebraço 24h antes`,
        quiz: [
          {
            pergunta: "Qual a diferença entre perfume funcional e artístico?",
            opcoes: [
              "Funcional usa sintéticos, artístico usa naturais",
              "Funcional tem intenção terapêutica clara, artístico foca na estética olfativa",
              "Funcional é mais barato que artístico",
              "Não há diferença"
            ],
            respostaCorreta: 1,
            explicacao: "O perfume funcional é criado com intenção terapêutica (relaxar, energizar), enquanto o artístico prioriza a beleza estética do aroma."
          }
        ],
        checklist: [
          "Criar blend aromaterápico para relaxamento (lavanda + bergamota + vetiver)",
          "Criar blend aromaterápico para energia/foco (alecrim + limão + hortelã)",
          "Montar tabela de propriedades dos 10 óleos essenciais principais"
        ]
      },
      {
        titulo: "Perfumaria Natural vs Sintética",
        descricao: "Vantagens, limitações e o mercado clean beauty",
        duracaoMinutos: 20,
        conteudo: `# Perfumaria Natural vs Sintética

## Entendendo as Diferenças

A escolha entre ingredientes naturais e sintéticos é central na perfumaria contemporânea. Como perfumista natural, é essencial entender ambos os lados.

### O que é "Natural"?

Critérios para um ingrediente ser considerado natural:
- Extraído diretamente de fonte botânica (planta, flor, raiz, resina)
- Sem modificação química sintética
- Métodos de extração aceitos: destilação, prensagem, CO2, enfleurage

### Certificações Reconhecidas

- **ECOCERT**: padrão europeu para cosméticos naturais/orgânicos
- **COSMOS**: harmonização internacional
- **NATRUE**: selo europeu rigoroso
- **IBD**: certificação brasileira
- **IFRA Natural**: especifica para perfumaria

### Vantagens da Perfumaria Natural

✅ Sustentabilidade e rastreabilidade
✅ Biocompatibilidade com a pele
✅ Complexidade aromática única (centenas de moléculas por óleo)
✅ Propriedades terapêuticas preservadas
✅ Conexão emocional mais profunda

### Limitações Naturais

❌ Fixação geralmente menor que sintéticos
❌ Custo mais elevado (rendimento de extração baixo)
❌ Disponibilidade sazonal e variação entre lotes
❌ Paleta olfativa limitada (sem "ozônico", "aquático" puro)
❌ Algumas notas impossíveis sem sintéticos (muguet, lírio)

### Greenwashing: Como Identificar

⚠️ Cuidado com produtos que se dizem "naturais" mas não são:
- "Fragrância natural" sem especificar INCI
- "Inspirado na natureza" não significa natural
- "Sem parabenos" não garante que é natural
- Sempre verificar lista de ingredientes completa

### Tendências 2026

- Transparência radical: QR codes com rastreabilidade total
- Perfumaria regenerativa: ingredientes que restauram ecossistemas
- Hibridismo ético: uso consciente de biotecnologia verde`,
        quiz: [
          {
            pergunta: "Qual NÃO é uma vantagem da perfumaria natural?",
            opcoes: [
              "Biocompatibilidade com a pele",
              "Fixação superior aos sintéticos",
              "Propriedades terapêuticas preservadas",
              "Complexidade aromática única"
            ],
            respostaCorreta: 1,
            explicacao: "A fixação é na verdade uma limitação da perfumaria natural — sintéticos geralmente fixam melhor. Porém, técnicas com fixadores naturais (vetiver, benjoim) compensam."
          }
        ],
        checklist: [
          "Analisar rótulos de 3 perfumes: natural, sintético e híbrido",
          "Pesquisar certificações disponíveis no Brasil (IBD, ECOCERT)",
          "Identificar 3 exemplos de greenwashing em perfumaria"
        ]
      },
      {
        titulo: "A Pirâmide Olfativa",
        descricao: "Notas de saída, corpo e fundo — estrutura de um perfume",
        duracaoMinutos: 20,
        conteudo: `# A Pirâmide Olfativa

## A Estrutura de um Perfume

A pirâmide olfativa é o modelo fundamental para entender e criar perfumes. Ela descreve como um perfume evolui ao longo do tempo.

### Estrutura Clássica

**Notas de Topo (Saída)** — 15 a 30 minutos
- Primeira impressão do perfume
- Óleos mais voláteis: cítricos, aromáticos leves
- Exemplos: bergamota, limão, mandarina, petitgrain

**Notas de Coração (Corpo)** — 2 a 4 horas
- O "caráter" do perfume
- Volatilidade média: florais, especiarias suaves
- Exemplos: lavanda, gerânio, ylang-ylang, rosa, cardamomo

**Notas de Base (Fundo)** — 4 a 24+ horas
- A fundação e fixação
- Óleos mais pesados: madeiras, resinas, bálsamos
- Exemplos: sândalo, vetiver, patchouli, benjoim, incenso

### Proporções de Referência

> **30% topo + 50% coração + 20% base** — proporção clássica equilibrada

Mas perfumistas experientes variam:
- Cologne: 40% topo + 30% coração + 30% base
- Oriental: 15% topo + 35% coração + 50% base
- Amadeirado: 25% topo + 30% coração + 45% base

### Pirâmide Moderna

A perfumaria contemporânea desafia a pirâmide linear:
- **Acordes horizontais**: todas as notas percebidas simultaneamente
- **Perfumes monotema**: foco em uma nota só (soliflor)
- **Construção radial**: sem hierarquia de volatilidade

### Tabela de Volatilidade

| Nota | Tempo | Exemplos |
| Topo | 15-30min | Bergamota, Limão, Laranja, Eucalipto |
| Coração | 2-4h | Lavanda, Gerânio, Rosa, Ylang-ylang |
| Base | 4-24h+ | Vetiver, Sândalo, Patchouli, Benjoim |`,
        quiz: [
          {
            pergunta: "Qual é a proporção clássica da pirâmide olfativa?",
            opcoes: [
              "50% topo + 30% coração + 20% base",
              "30% topo + 50% coração + 20% base",
              "20% topo + 20% coração + 60% base",
              "33% topo + 33% coração + 33% base"
            ],
            respostaCorreta: 1,
            explicacao: "A proporção clássica é 30% topo, 50% coração e 20% base, criando um perfume equilibrado com boa evolução temporal."
          },
          {
            pergunta: "Quais óleos são tipicamente notas de base?",
            opcoes: [
              "Bergamota e limão",
              "Lavanda e gerânio",
              "Vetiver, sândalo e patchouli",
              "Eucalipto e hortelã"
            ],
            respostaCorreta: 2,
            explicacao: "Notas de base são óleos pesados e pouco voláteis como vetiver, sândalo, patchouli e benjoim, que fixam o perfume por horas."
          }
        ],
        checklist: [
          "Classificar 15 óleos essenciais por nota (topo, coração, base)",
          "Criar 3 mini-perfumes com diferentes estruturas de pirâmide",
          "Fazer teste de evaporação com fitas olfativas ao longo de 6 horas"
        ]
      },
      {
        titulo: "Vocabulário e Linguagem Olfativa",
        descricao: "Termos técnicos e storytelling aromático",
        duracaoMinutos: 20,
        conteudo: `# Vocabulário e Linguagem Olfativa

## Comunicando Aromas Profissionalmente

Desenvolver um vocabulário olfativo preciso é tão importante quanto criar os perfumes em si. É o que diferencia um amador de um profissional.

### Terminologia Técnica Essencial

- **Acorde**: combinação de 3+ ingredientes que criam um aroma novo
- **Sillage**: o "rastro" que o perfume deixa ao se movimentar
- **Tenacidade**: duração do perfume na pele
- **Difusão**: como o perfume se projeta ao redor
- **Drydown**: a fase final do perfume, quando apenas notas de base restam

### Descritores por Categoria

**Florais**: delicado, romântico, exuberante, indólico, verde-floral
**Amadeirados**: seco, cremoso, defumado, terroso, resinoso
**Cítricos**: vibrante, efervescente, fresco, amargo, solar
**Orientais**: quente, sensual, balsâmico, opulento, envolvente
**Aromáticos**: herbáceo, camphorado, mentolado, verde, limpo

### Sinestesia na Perfumaria

Perfumistas frequentemente usam termos de outros sentidos:
- Perfume **aveludado** (tato)
- Nota **luminosa** (visão)
- Aroma **doce** (paladar)
- Acorde **harmonioso** (audição)

### Ficha Técnica Profissional

Uma ficha técnica deve conter:
1. Nome do perfume e conceito
2. Família olfativa principal e subfamília
3. Pirâmide olfativa detalhada
4. Lista de ingredientes (INCI e nome popular)
5. Concentração e veículo
6. Notas do perfumista (storytelling)

### Storytelling Aromático

> **Todo grande perfume conta uma história.** Não apenas lista ingredientes — evoca um cenário, uma emoção, um momento.

Exemplo: "Um jardim japonês ao amanhecer — o orvalho sobre pétalas de rosa, o incenso de um templo distante, a terra úmida após a chuva."`,
        quiz: [
          {
            pergunta: "O que significa 'sillage' em perfumaria?",
            opcoes: [
              "A cor do perfume",
              "O rastro aromático que o perfume deixa ao se movimentar",
              "A quantidade de álcool no perfume",
              "O tempo de maceração"
            ],
            respostaCorreta: 1,
            explicacao: "Sillage (do francês 'rastro de navio') é o rastro aromático que um perfume deixa quando a pessoa se movimenta."
          }
        ],
        checklist: [
          "Descrever 5 aromas usando vocabulário técnico (sem nomear o ingrediente)",
          "Criar perfil olfativo pessoal com preferências e aversões",
          "Escrever a história de um perfume imaginário usando storytelling aromático"
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // MÓDULO 2: MATÉRIAS-PRIMAS NATURAIS
  // ──────────────────────────────────────────────
  {
    titulo: "Matérias-Primas Naturais",
    descricao: "Óleos essenciais, absolutos e bases para criação",
    icone: "Heart",
    cor: "from-green-50 to-emerald-50",
    aulas: [
      {
        titulo: "Óleos Essenciais: Introdução e Extração",
        descricao: "Métodos de extração e avaliação de qualidade",
        duracaoMinutos: 20,
        conteudo: `# Óleos Essenciais: Introdução e Extração

## O que São Óleos Essenciais

Óleos essenciais são compostos voláteis concentrados extraídos de plantas. Cada gota contém centenas de moléculas aromáticas que determinam seu perfil olfativo e propriedades.

### Métodos de Extração

**1. Destilação a Vapor** (mais comum)
- Vapor d'água atravessa material vegetal
- Moléculas aromáticas são arrastadas pelo vapor
- Condensação separa óleo essencial da água (hidrolato)
- Usado para: lavanda, alecrim, eucalipto, tea tree

**2. Prensagem a Frio** (cítricos)
- Cascas são prensadas mecanicamente
- Sem calor — preserva frescor e vitaminas
- Usado para: limão, laranja, bergamota, grapefruit

**3. Extração por CO2 Supercrítico**
- CO2 sob alta pressão atua como solvente
- Resultado mais fiel ao aroma da planta viva
- Custo mais elevado
- Usado para: baunilha, café, gengibre

### Rendimento e Custo

> **Para 1 litro de óleo essencial de rosa são necessárias ~4 toneladas de pétalas.**

| Óleo | Rendimento | Preço/10ml |
| Laranja doce | 0.3-0.5% | R$ 15-25 |
| Lavanda | 1.5-3% | R$ 30-60 |
| Rosa | 0.01-0.04% | R$ 300-800 |
| Jasmim (absoluto) | 0.1% | R$ 400-1000 |

### Avaliação de Qualidade

Critérios para escolher óleos de qualidade:
- **Quimiotipo**: composição química específica
- **Origem botânica**: nome científico completo
- **Certificado GC/MS**: cromatografia gasosa
- **País de origem**: terroir influencia o aroma
- **Data de extração**: óleos perdem qualidade com o tempo

### Adulterações Comuns

⚠️ Como identificar óleos adulterados:
- Preço muito abaixo do mercado
- "Óleo essencial" de morango, maçã, melancia (NÃO existem)
- Cheiro excessivamente uniforme e "perfeito"
- Sem informações botânicas no rótulo`,
        quiz: [
          {
            pergunta: "Qual método de extração é usado para óleos cítricos?",
            opcoes: [
              "Destilação a vapor",
              "Prensagem a frio",
              "Extração por CO2",
              "Enfleurage"
            ],
            respostaCorreta: 1,
            explicacao: "Óleos cítricos são extraídos por prensagem mecânica a frio das cascas, preservando o frescor e as vitaminas."
          }
        ],
        checklist: [
          "Analisar sensorialmente 3 lavandas de qualidades diferentes",
          "Comparar certificados de análise GC/MS de fornecedores",
          "Fazer teste de pureza com diluição em álcool"
        ]
      },
      {
        titulo: "Óleos Essenciais Cítricos",
        descricao: "A família cítrica e criação de acordes vibrantes",
        duracaoMinutos: 20,
        conteudo: `# Óleos Essenciais Cítricos

## Frescor, Alegria e Energia

Os cítricos são a porta de entrada de qualquer perfume — as primeiras notas que sentimos. Dominá-los é essencial para criações equilibradas.

### Principais Óleos Cítricos

- **Bergamota** — elegante, floral-cítrico, base da Eau de Cologne
- **Limão siciliano** — brilhante, ácido, limpo
- **Laranja doce** — quente, doce, reconfortante
- **Mandarina** — suave, frutado, infantil
- **Grapefruit** — amargo, energético, moderno
- **Lima** — picante, vibrante, tropical
- **Yuzu** — complexo, oriental, sofisticado

### Fotossensibilidade

⚠️ Cítricos expressos (prensados a frio) contêm furanocumarinas que podem causar queimaduras solares. Exceção: bergamota sem FCF (furanocumarina-free).

### O Desafio da Fixação

Cítricos evaporam em 15-30 minutos. Técnicas de fixação:
- Adicionar vetiver ou cedro na base (5-10%)
- Usar petitgrain como "ponte" entre topo e coração
- Aumentar proporção de coração e base
- Maceração mais longa (4+ semanas)

### Acordes Cítricos Clássicos

**Mediterrâneo**: Bergamota 40% + Limão 20% + Neroli 20% + Petitgrain 20%
**Tropical**: Lima 30% + Mandarina 30% + Grapefruit 20% + Ylang 20%
**Oriental Cítrico**: Yuzu 25% + Bergamota 25% + Cardamomo 25% + Incenso 25%`,
        quiz: [
          {
            pergunta: "Qual é o principal desafio ao trabalhar com óleos cítricos em perfumaria?",
            opcoes: [
              "São muito caros",
              "Evaporam rapidamente (fixação curta)",
              "São difíceis de misturar",
              "Têm cheiro desagradável"
            ],
            respostaCorreta: 1,
            explicacao: "Cítricos são altamente voláteis e evaporam em 15-30 minutos. É necessário usar técnicas de fixação com notas de base."
          }
        ],
        checklist: [
          "Criar 3 acordes cítricos: Mediterrâneo, Tropical e Oriental",
          "Testar oxidação comparando óleo fresco vs oxidado",
          "Formular mini Eau de Cologne Natural com fixação aprimorada"
        ]
      },
      {
        titulo: "Óleos Essenciais Florais",
        descricao: "A complexidade das notas florais e buquês olfativos",
        duracaoMinutos: 20,
        conteudo: `# Óleos Essenciais Florais

## Romantismo, Sofisticação e Complexidade

Os florais são o coração da perfumaria. Desde a rosa até o ylang-ylang, cada floral traz uma personalidade única e uma riqueza aromática incomparável.

### Florais Principais

- **Lavanda** — versátil, aromático-floral, relaxante
- **Gerânio** — rosa-verde, equilibrante, acessível
- **Ylang-ylang** — exótico, sensual, intenso (usar com moderação!)
- **Neroli** — flor de laranjeira, elegante, luminoso
- **Jasmim sambac** — indólico, sensual, noturno
- **Rosa** — rainha dos florais, romântico, complexo

### Florais Raros e Preciosos

- **Osmanthus** — damasco-couro, oriental
- **Champaca** — tropical, opulento, raro
- **Tuberosa** — cremoso, narcótico, intenso

### Substituições Econômicas

| Floral Caro | Substituto Acessível |
| Rosa absoluto | Gerânio + Palmarosa (70/30) |
| Jasmim grandiflorum | Ylang-ylang + Neroli (60/40) |
| Neroli puro | Petitgrain + toque de neroli (80/20) |

### Acordes Florais

**Buquê Romântico**: Rosa 30% + Gerânio 25% + Ylang 20% + Lavanda 15% + Palmarosa 10%
**Floral Verde**: Neroli 30% + Petitgrain 25% + Gerânio 25% + Lavanda 20%
**Floral Exótico**: Ylang-ylang 35% + Jasmim 25% + Champaca 20% + Sândalo 20%`,
        quiz: [
          {
            pergunta: "Qual é uma substituição econômica eficaz para rosa absoluto?",
            opcoes: [
              "Lavanda + eucalipto",
              "Gerânio + palmarosa",
              "Ylang-ylang + patchouli",
              "Limão + bergamota"
            ],
            respostaCorreta: 1,
            explicacao: "Gerânio e palmarosa (70/30) criam um acorde que se aproxima do perfil rosado do rosa absoluto a uma fração do custo."
          }
        ],
        checklist: [
          "Criar 3 acordes florais: Romântico, Verde e Exótico",
          "Comparar rosa absoluto vs acorde de gerânio+palmarosa",
          "Formular perfume 'Jardim ao Anoitecer' com base floral"
        ]
      },
      {
        titulo: "Amadeirados e Resinosos",
        descricao: "Notas de fundo, fixadores naturais e profundidade",
        duracaoMinutos: 20,
        conteudo: `# Óleos Essenciais Amadeirados e Resinosos

## Profundidade, Calor e Fixação

As madeiras e resinas são a fundação de todo grande perfume. São elas que dão longevidade, profundidade e caráter duradouro às criações.

### Amadeirados Principais

- **Sândalo** — cremoso, lácteo, meditativo (Mysore é o mais nobre)
- **Cedro atlas** — seco, elegante, acessível
- **Vetiver** — terroso, fumê, complexo (fixador por excelência)
- **Patchouli** — terroso, doce, envelhecido melhora
- **Pau-rosa** — rosado-amadeirado, suave (sustentabilidade!)

### Resinosos e Balsâmicos

- **Benjoim** — baunilha-quente, balsâmico, fixador
- **Incenso (olíbano)** — sagrado, meditativo, cítrico-resinoso
- **Mirra** — medicinal, fumê, amargor nobre
- **Gálbano** — verde-resinoso, intenso, penetrante
- **Labdanum** — âmbar-animalesco, quente, substituto do âmbar

### Receitas de Âmbar Natural

O "âmbar" em perfumaria não vem do âmbar fóssil — é um acorde:

**Âmbar Clássico**: Baunilha 30% + Benjoim 30% + Labdanum 20% + Vetiver 20%
**Âmbar Dourado**: Benjoim 35% + Incenso 25% + Baunilha 20% + Sândalo 20%
**Âmbar Escuro**: Labdanum 30% + Mirra 25% + Patchouli 25% + Vetiver 20%

> **Dica profissional**: Vetiver + Benjoim é a combinação fixadora mais eficaz e versátil da perfumaria natural.`,
        quiz: [
          {
            pergunta: "O que é o 'âmbar' em perfumaria?",
            opcoes: [
              "Um óleo essencial extraído de resina fóssil",
              "Um acorde criado com baunilha, benjoim, labdanum e outros",
              "Uma molécula sintética exclusiva",
              "Um tipo de madeira rara"
            ],
            respostaCorreta: 1,
            explicacao: "O âmbar em perfumaria é um acorde (combinação) tipicamente feito com baunilha, benjoim, labdanum e outras resinas — não vem do âmbar fóssil."
          }
        ],
        checklist: [
          "Criar 3 bases amadeiradas: Zen, Sensual e Terrosa",
          "Testar poder de fixação comparando perfumes com/sem base amadeirada",
          "Formular acorde de âmbar natural em 3 variações"
        ]
      },
      {
        titulo: "Aromáticos e Especiarias",
        descricao: "Notas verdes, herbais e picantes para perfumes unissex",
        duracaoMinutos: 20,
        conteudo: `# Óleos Essenciais Aromáticos e Especiarias

## Frescor Herbal e Calor Picante

Aromáticos e especiarias adicionam caráter, personalidade e complexidade aos perfumes. São essenciais para criações masculinas e unissex.

### Aromáticos (Herbais)

- **Alecrim** — estimulante, limpo, medicinal
- **Manjericão** — verde, anisado, fresco
- **Sálvia esclareia** — muscatel, relaxante, feminino-herbal
- **Hortelã-pimenta** — refrescante, mentolado, intenso
- **Tomilho** — herbáceo, quente, potente

### Especiarias

- **Canela (casca)** — quente, doce, familiar (⚠️ irritante — máx. 0.5%)
- **Cravo** — potente, eugenol, medicinal (⚠️ sensibilizante)
- **Cardamomo** — fresco-especiado, elegante, versátil
- **Gengibre** — quente, citrino, energético
- **Pimenta-preta** — picante, seco, moderno
- **Noz-moscada** — quente, doce-especiado, envolvente

### Notas Verdes

- **Gálbano** — verde intenso, resinoso, cortante
- **Petitgrain** — folhas de laranjeira, verde-amargo
- **Folha de violeta** — verde-aquoso, pepino, delicado

### Segurança com Especiarias

⚠️ Especiarias podem ser irritantes na pele:
- Canela casca: máx. 0.5% na pele
- Cravo: máx. 0.5% na pele
- Pimenta-preta: usar com moderação
- Sempre fazer teste de sensibilidade`,
        quiz: [
          {
            pergunta: "Por que a canela casca deve ser usada no máximo a 0.5% em perfumes para pele?",
            opcoes: [
              "Porque o aroma é muito forte",
              "Porque é muito cara",
              "Porque pode causar irritação e sensibilização na pele",
              "Porque evapora rápido demais"
            ],
            respostaCorreta: 2,
            explicacao: "A canela casca contém cinamaldeído que é irritante e sensibilizante para a pele. O limite seguro é 0.5% na formulação final."
          }
        ],
        checklist: [
          "Criar acorde Aromático Fresco (alecrim + sálvia + petitgrain)",
          "Criar acorde Especiarias Orientais (cardamomo + gengibre + canela)",
          "Praticar diluições progressivas para balancear intensidade"
        ]
      },
      {
        titulo: "Absolutos, CO2 e Bases",
        descricao: "Extratos preciosos e veículos para perfumes",
        duracaoMinutos: 20,
        conteudo: `# Absolutos, CO2 e Bases

## Extratos Preciosos e Veículos

Além dos óleos essenciais destilados, existem outros tipos de extratos naturais que ampliam enormemente a paleta do perfumista.

### Absolutos

Extraídos por solvente, são mais concentrados e fiéis ao aroma da planta viva:
- **Jasmim grandiflorum** — complexo, indólico, noturno
- **Rosa de maio** — opulento, mel-rosado
- **Osmanthus** — damasco, couro, oriental
- **Tuberosa** — cremoso, narcótico, branco

### Extratos de CO2

Mais fiéis ao aroma da planta fresca:
- **Baunilha CO2** — cremosa, gourmand, indispensável
- **Café CO2** — torrado, energético, moderno
- **Cacau CO2** — chocolate, gourmand, sensual
- **Gengibre CO2** — fresco e quente simultaneamente

### Veículos para Perfumes

**Álcool de cereais 95%** — ideal para sprays, evapora deixando o aroma
**Óleo de jojoba** — mais próximo da cera, não rancifica, ideal para roll-on
**Coco fracionado** — leve, inodoro, boa absorção
**Cera de abelha** — base para perfumes sólidos
**Glicerina vegetal** — para perfumes aquosos/body mists

### Concentrações

| Tipo | Concentração | Duração |
| Eau Fraiche | 1-3% | 1-2h |
| Eau de Cologne | 3-5% | 2-3h |
| Eau de Toilette | 5-15% | 3-5h |
| Eau de Parfum | 15-20% | 5-8h |
| Parfum/Extrait | 20-30% | 8-12h+ |

> **Dica**: Criar a mesma fragrância em 3 veículos diferentes (álcool, jojoba, cera) para comparar performance.`,
        quiz: [
          {
            pergunta: "Qual a diferença entre um óleo essencial e um absoluto?",
            opcoes: [
              "Absolutos são diluídos, óleos essenciais são puros",
              "Absolutos são extraídos por solvente e mais fiéis ao aroma da planta viva",
              "Não há diferença significativa",
              "Óleos essenciais são mais caros que absolutos"
            ],
            respostaCorreta: 1,
            explicacao: "Absolutos são extraídos por solvente (hexano, depois álcool) e capturam mais fielmente o perfil aromático da planta, incluindo moléculas não-voláteis."
          }
        ],
        checklist: [
          "Diluir absolutos corretamente (1%, 5%, 10%) e comparar aromas",
          "Criar mesma fragrância em 3 veículos: álcool, jojoba e cera",
          "Fazer teste de estabilidade ao longo de 2 semanas"
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // MÓDULO 3: FAMÍLIAS OLFATIVAS E CRIAÇÃO
  // ──────────────────────────────────────────────
  {
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

### Famílias Modernas (não clássicas)

- **Aquática/Ozônica**: notas marinhas (difícil em natural)
- **Gourmand**: baunilha, café, chocolate, especiarias doces
- **Verde**: gálbano, folha de violeta, notas cortadas

### Tendências 2026

- Hibridização radical: perfumes que pertencem a 2-3 famílias
- Perfumes "sem gênero": abolição de masculino/feminino
- Minimalismo olfativo: menos ingredientes, mais impacto`,
        quiz: [
          {
            pergunta: "Quem desenvolveu a roda olfativa moderna?",
            opcoes: ["François Coty", "Michael Edwards", "Jean-Paul Guerlain", "Mandy Aftel"],
            respostaCorreta: 1,
            explicacao: "Michael Edwards criou a roda olfativa (Fragrance Wheel) que é o padrão da indústria para classificação de perfumes."
          }
        ],
        checklist: [
          "Classificar 10 perfumes conhecidos nas famílias olfativas",
          "Mapear preferências pessoais na roda olfativa",
          "Criar mini-exemplos de 3 famílias diferentes (5ml cada)"
        ]
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
**4. Concentração elevada** — EdP (15-20%) ao invés de EdC (3-5%)

### Teste de Durabilidade

Aplicar no pulso e verificar:
- [ ] 30 minutos: topo presente
- [ ] 1 hora: transição para coração
- [ ] 4 horas: base perceptível
- [ ] 8 horas: sillage residual`,
        quiz: [
          {
            pergunta: "Qual técnica NÃO ajuda a fixar perfumes cítricos?",
            opcoes: [
              "Usar mínimo 30% de notas de base",
              "Adicionar mais óleos cítricos ao topo",
              "Maceração longa (4-6 semanas)",
              "Usar concentração EdP (15-20%)"
            ],
            respostaCorreta: 1,
            explicacao: "Adicionar mais cítricos ao topo não ajuda na fixação — eles evaporam rápido de qualquer forma. A fixação vem da base e da maceração."
          }
        ],
        checklist: [
          "Formular Cologne Natural Moderna seguindo a receita base",
          "Criar 3 variações da fórmula (Mediterrâneo, Tropical, Oriental)",
          "Fazer teste de durabilidade checando em 1h, 4h e 8h"
        ]
      },
      {
        titulo: "Família Floral: Romantismo e Sofisticação",
        descricao: "Buquês florais, soliflors e florais modernos",
        duracaoMinutos: 20,
        conteudo: `# Família Floral: Romantismo e Sofisticação

## O Coração da Perfumaria

A família floral é a mais vasta e popular. Criar florais equilibrados é a prova de maturidade de um perfumista.

### Fórmula Base: Buquê Floral Natural

- **Topo (20%)**: Bergamota 15% + Mandarina 5%
- **Coração (50%)**: Ylang-ylang 15% + Gerânio 15% + Lavanda 10% + Rosa 10%
- **Base (30%)**: Sândalo 15% + Patchouli 10% + Benjoim 5%

### Tipos de Criação Floral

**Soliflor** — Um único floral dominante (ex: "Rosa Pura")
**Buquê** — Combinação de vários florais harmonizados
**Floral Verde** — Florais + notas verdes (petitgrain, gálbano)
**Floral Moderno** — Minimalista, poucos ingredientes, impactante

### Projetos Práticos

**1. "Jardim ao Amanhecer"** (floral verde)
Rosa 20% + Gerânio 20% + Petitgrain 20% + Bergamota 20% + Vetiver 20%

**2. "Rosa Romântica"** (soliflor)
Gerânio 35% + Palmarosa 25% + Ylang 15% + Sândalo 15% + Benjoim 10%

**3. "Floral Moderno"** (minimalista)
Neroli 35% + Lavanda 30% + Cedro 35%`,
        quiz: [
          {
            pergunta: "O que é um perfume 'soliflor'?",
            opcoes: [
              "Um perfume feito com um único ingrediente",
              "Um perfume onde um único floral domina a composição",
              "Um perfume sem notas florais",
              "Um perfume que muda de aroma ao longo do dia"
            ],
            respostaCorreta: 1,
            explicacao: "Soliflor (do francês 'flor única') é um perfume onde um único floral domina, apoiado por ingredientes que reforçam essa nota."
          }
        ],
        checklist: [
          "Formular Buquê Floral Natural com a receita base",
          "Criar perfume soliflor 'Rosa Romântica'",
          "Comparar resultado final entre buquê e soliflor"
        ]
      },
      {
        titulo: "Família Oriental: Mistério e Sensualidade",
        descricao: "Perfumes quentes com especiarias e baunilha",
        duracaoMinutos: 20,
        conteudo: `# Família Oriental: Mistério e Sensualidade

## Calor, Profundidade e Opulência

Perfumes orientais são sensuais, envolventes e memoráveis. São os mais duradouros e os mais apreciados para noites especiais.

### Fórmula Base: Oriental Natural

- **Topo (15%)**: Bergamota 10% + Mandarina 5%
- **Coração (35%)**: Ylang-ylang 10% + Canela 5% + Cardamomo 10% + Rosa 10%
- **Base (50%)**: Baunilha CO2 15% + Benjoim 15% + Patchouli 10% + Vetiver 10%

### Subcategorias

**Oriental Especiado**: canela, cravo, cardamomo dominando
**Oriental Baunilha (Gourmand)**: baunilha, fava tonka, benjoim
**Oriental Floral**: rosa, jasmim com base âmbar/baunilha
**Oriental Amadeirado**: oud, sândalo com especiarias

### Projetos Práticos

**"Oriental Especiado"** (unissex):
Bergamota 10% + Cardamomo 15% + Canela 5% + Pimenta-preta 5% + Patchouli 20% + Vetiver 15% + Benjoim 15% + Incenso 15%

**"Baunilha Sensual"** (gourmand natural):
Mandarina 10% + Ylang 15% + Rosa 10% + Baunilha CO2 25% + Fava tonka 20% + Benjoim 10% + Sândalo 10%

**"Âmbar Dourado"** (oriental moderno):
Bergamota 15% + Neroli 10% + Labdanum 20% + Benjoim 20% + Incenso 15% + Vetiver 10% + Baunilha 10%`,
        quiz: [
          {
            pergunta: "Qual é a principal característica que distingue perfumes orientais?",
            opcoes: [
              "Base forte de especiarias, baunilha e resinas quentes",
              "Uso predominante de cítricos",
              "Notas aquáticas e marinhas",
              "Leveza e frescor herbal"
            ],
            respostaCorreta: 0,
            explicacao: "Perfumes orientais são definidos pela base quente e envolvente de especiarias, baunilha, âmbar e resinas balsâmicas."
          }
        ],
        checklist: [
          "Formular Oriental Especiado unissex",
          "Criar Gourmand Natural 'Baunilha Sensual'",
          "Testar Âmbar Dourado e comparar projeção com cítrico"
        ]
      },
      {
        titulo: "Família Amadeirada: Elegância Atemporal",
        descricao: "Perfumes unissex com madeiras nobres",
        duracaoMinutos: 20,
        conteudo: `# Família Amadeirada: Elegância Atemporal

## Sofisticação, Profundidade e Versatilidade

Amadeirados são a família mais versátil — funcionam para todos os gêneros, ocasiões e estações.

### Fórmula Base: Amadeirado Aromático

- **Topo (25%)**: Bergamota 10% + Limão 5% + Alecrim 10%
- **Coração (30%)**: Sálvia esclareia 15% + Lavanda 10% + Gerânio 5%
- **Base (45%)**: Cedro 20% + Vetiver 15% + Patchouli 10%

### Projetos Práticos

**"Floresta ao Amanhecer"** (amadeirado verde):
Petitgrain 15% + Alecrim 10% + Gálbano 5% + Cedro 25% + Vetiver 20% + Incenso 15% + Patchouli 10%

**"Meditação Zen"** (amadeirado incenso):
Bergamota 10% + Incenso 25% + Sândalo 25% + Cedro 15% + Vetiver 15% + Benjoim 10%

**Perfume Unissex** (amadeirado moderno):
Bergamota 15% + Cardamomo 10% + Lavanda 10% + Cedro 20% + Vetiver 20% + Patchouli 15% + Fava tonka 10%

> **Dica**: Amadeirados são os melhores perfumes para iniciantes criarem — são forgiving (perdoam erros de proporção) e sempre cheiram bem.`,
        quiz: [
          {
            pergunta: "Por que amadeirados são recomendados para perfumistas iniciantes?",
            opcoes: [
              "Porque são os mais baratos",
              "Porque são forgiving — perdoam erros de proporção e sempre ficam agradáveis",
              "Porque usam poucos ingredientes",
              "Porque não precisam de maceração"
            ],
            respostaCorreta: 1,
            explicacao: "Amadeirados são 'forgiving' — mesmo com proporções imprecisas, o resultado geralmente é agradável, o que os torna ideais para praticar."
          }
        ],
        checklist: [
          "Formular Amadeirado Aromático com a receita base",
          "Criar 'Floresta ao Amanhecer' e 'Meditação Zen'",
          "Desenvolver perfume unissex amadeirado próprio"
        ]
      },
      {
        titulo: "Chipre, Fougère e Famílias Modernas",
        descricao: "Sofisticação clássica e tendências contemporâneas",
        duracaoMinutos: 25,
        conteudo: `# Chipre, Fougère e Famílias Modernas

## Estruturas Clássicas e Inovação

### Família Chipre

Estrutura: bergamota + musgo + labdanum + patchouli

**Chipre Natural Moderno:**
- Topo (30%): Bergamota 20% + Limão 10%
- Coração (30%): Gerânio 10% + Rosa 10% + Ylang 5% + Sálvia 5%
- Base (40%): Patchouli 20% + Vetiver 10% + Labdanum 5% + Benjoim 5%

### Família Fougère

Estrutura: lavanda + cumarina (fava tonka) + musgo

**Fougère Natural:**
- Topo (30%): Bergamota 15% + Limão 10% + Petitgrain 5%
- Coração (35%): Lavanda 20% + Gerânio 10% + Sálvia esclareia 5%
- Base (35%): Fava tonka 10% + Vetiver 15% + Cedro 10%

### Famílias Modernas

**Verde Natural:**
- Topo (35%): Gálbano 10% + Petitgrain 15% + Limão 10%
- Coração (30%): Gerânio 10% + Violeta abs. 5% + Alecrim 15%
- Base (35%): Vetiver 20% + Cedro 10% + Musgo 5%

**Gourmand Sofisticado:**
- Topo (20%): Bergamota 15% + Mandarina 5%
- Coração (30%): Canela 5% + Cardamomo 10% + Ylang 10% + Rosa 5%
- Base (50%): Baunilha CO2 20% + Fava tonka 15% + Benjoim 10% + Patchouli 5%

### Limitações Naturais para Famílias Modernas

❌ Notas aquáticas/marinhas: impossíveis sem sintéticos
❌ Musgo de carvalho: regulado por IFRA, alternativas limitadas
✅ Gourmand: totalmente viável com baunilha, café, cacau CO2
✅ Verde: gálbano, petitgrain e folha de violeta são excelentes`,
        quiz: [
          {
            pergunta: "Qual é a estrutura clássica de um perfume fougère?",
            opcoes: [
              "Rosa + patchouli + baunilha",
              "Lavanda + cumarina (fava tonka) + musgo",
              "Bergamota + cedro + vetiver",
              "Limão + menta + eucalipto"
            ],
            respostaCorreta: 1,
            explicacao: "A família fougère é definida pela tríade lavanda + cumarina (encontrada na fava tonka) + musgo, criando o frescor aromático clássico."
          }
        ],
        checklist: [
          "Formular Chipre Natural Moderno",
          "Criar Fougère Natural com fava tonka",
          "Experimentar Gourmand Sofisticado com baunilha CO2",
          "Criar perfume 'Folhas Verdes na Chuva' (verde natural)"
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // MÓDULO 4: TÉCNICAS E FORMULAÇÃO
  // ──────────────────────────────────────────────
  {
    titulo: "Técnicas e Formulação",
    descricao: "Acordes, proporções, maceração e formatos alternativos",
    icone: "Package",
    cor: "from-blue-50 to-indigo-50",
    aulas: [
      {
        titulo: "Acordes: Construindo Harmonias",
        descricao: "Combinações de ingredientes que criam aromas novos",
        duracaoMinutos: 20,
        conteudo: `# Acordes: Construindo Harmonias

## A Base da Criação em Perfumaria

Um acorde é a combinação de 3 ou mais ingredientes que, juntos, criam um aroma completamente novo — como notas musicais formam um acorde harmônico.

### Princípio Fundamental

> **Um bom acorde é aquele em que nenhum ingrediente individual é reconhecível — apenas o conjunto.**

### Técnica de Construção

1. **Nota principal** (40-50%): define o caráter
2. **Nota de apoio** (25-35%): reforça e complementa
3. **Nota de contraste** (15-25%): adiciona interesse e profundidade

### Acordes Clássicos para Praticar

**Acorde Rosa Natural** (sem rosa pura):
Gerânio 40% + Palmarosa 30% + Ylang-ylang 20% + Patchouli 10%

**Acorde Âmbar** (fixador quente):
Baunilha 30% + Benjoim 30% + Labdanum 20% + Vetiver 20%

**Acorde Verde Fresco**:
Gálbano 20% + Petitgrain 40% + Alecrim 30% + Gerânio 10%

**Acorde Couro** (animalesco natural):
Cedro 30% + Bétula 25% + Labdanum 25% + Incenso 20%

**Acorde Mel/Cera**:
Benjoim 35% + Ylang-ylang 30% + Rosa 20% + Baunilha 15%

### Biblioteca Pessoal de Acordes

Todo perfumista deve construir sua própria biblioteca:
- Preparar cada acorde em 5ml
- Rotular com data e composição
- Maturar por 48h antes de avaliar
- Classificar por família olfativa
- Anotar combinações favoritas`,
        quiz: [
          {
            pergunta: "O que caracteriza um bom acorde em perfumaria?",
            opcoes: [
              "Todos os ingredientes são claramente reconhecíveis",
              "Nenhum ingrediente individual é reconhecível — apenas o conjunto",
              "Usa no máximo 2 ingredientes",
              "Deve usar apenas notas de topo"
            ],
            respostaCorreta: 1,
            explicacao: "Um acorde bem construído funde os ingredientes de forma que nenhum seja individualmente reconhecível — criando uma nota nova e coesa."
          }
        ],
        checklist: [
          "Criar 5 acordes próprios usando a técnica principal+apoio+contraste",
          "Maturar acordes por 48h e reavaliar",
          "Iniciar biblioteca pessoal de acordes com fichas técnicas"
        ]
      },
      {
        titulo: "Fórmulas e Proporções",
        descricao: "Cálculos, concentrações e escala de produção",
        duracaoMinutos: 20,
        conteudo: `# Fórmulas e Proporções

## Precisão na Criação

A perfumaria é arte E ciência. Dominar cálculos de proporção é o que torna suas criações replicáveis e escaláveis.

### Sistema de Gotas vs Porcentagem

**Sistema de Gotas** (para testes de 5ml):
- 1ml ≈ 20 gotas
- 5ml = 100 gotas total
- Concentração 15%: 15 gotas blend + 85 gotas álcool

**Sistema de Porcentagem** (para produção):
- Eau de Parfum 15% em 30ml:
- Blend aromático: 4,5ml (15%)
- Álcool 95%: 25,5ml (85%)

### Concentrações

| Tipo | Blend | Veículo | Duração |
| Eau Fraiche | 1-3% | 97-99% | 1-2h |
| Eau de Cologne | 3-5% | 95-97% | 2-3h |
| Eau de Toilette | 5-15% | 85-95% | 3-5h |
| Eau de Parfum | 15-20% | 80-85% | 5-8h |
| Extrait | 20-30% | 70-80% | 8-12h+ |

### Escalando Fórmulas

Para escalar de 5ml para 100ml:
- Multiplique cada ingrediente por 20
- Exemplo: 3 gotas de lavanda → 60 gotas (3ml)
- Sempre anotar multiplicador usado
- Testar em escala intermediária (30ml) antes de produzir

### Cálculo de Custo

Custo total = matéria-prima + embalagem + mão de obra
Preço varejo = custo × 4 (markup padrão, margem 75%)
Preço atacado = custo × 2.5`,
        quiz: [
          {
            pergunta: "Quantas gotas de blend aromático são necessárias para um teste de 5ml com concentração de 15%?",
            opcoes: [
              "5 gotas",
              "15 gotas",
              "50 gotas",
              "100 gotas"
            ],
            respostaCorreta: 1,
            explicacao: "5ml = 100 gotas. Concentração 15% = 15 gotas de blend + 85 gotas de álcool."
          }
        ],
        checklist: [
          "Converter 3 receitas do sistema de gotas para ml",
          "Escalar uma fórmula de 5ml para 30ml e depois para 100ml",
          "Calcular custo de produção de 3 perfumes criados",
          "Criar mesma fragrância em 3 concentrações (EdC, EdT, EdP)"
        ]
      },
      {
        titulo: "Maceração e Maturação",
        descricao: "O envelhecimento que transforma um bom perfume em excepcional",
        duracaoMinutos: 15,
        conteudo: `# Maceração e Maturação

## O Tempo como Ingrediente

A maceração é o período em que o perfume "descansa" após a formulação. Durante esse tempo, as moléculas interagem e se harmonizam, transformando o resultado final.

### O que Acontece na Maceração

- Moléculas se ligam e criam novos compostos
- Notas ásperas se suavizam
- O perfume ganha coesão e profundidade
- Notas individuais "se casam" em um todo harmonioso

### Tempos Recomendados

- **Mínimo**: 2 semanas (avaliação preliminar)
- **Ideal**: 4-6 semanas (resultado maduro)
- **Premium**: 3-6 meses (para perfumes orientais e amadeirados)
- **Envelhecimento**: 6-12 meses (resultado excepcional)

### Condições Ideais

✅ Temperatura estável (18-22°C)
✅ Ausência de luz direta
✅ Frasco de vidro âmbar, bem fechado
✅ Agitar suavemente 1x por semana

❌ Evitar calor excessivo
❌ Evitar variações bruscas de temperatura
❌ Não usar frascos de plástico

### Protocolo de Acompanhamento

Registrar evolução:
- Dia 1: impressão inicial (crua)
- Semana 1: primeiras mudanças
- Semana 2: avaliação preliminar
- Semana 4: maturidade inicial
- Semana 6: ponto ideal para a maioria

> **"Um perfume recém-feito é como um vinho jovem — tem potencial, mas precisa de tempo para revelar toda sua beleza."**`,
        quiz: [
          {
            pergunta: "Qual é o tempo ideal de maceração para a maioria dos perfumes?",
            opcoes: [
              "24 horas",
              "1 semana",
              "4-6 semanas",
              "1 ano"
            ],
            respostaCorreta: 2,
            explicacao: "4-6 semanas é o tempo ideal para a maioria dos perfumes atingirem maturidade, com as notas harmonizadas e o resultado coeso."
          }
        ],
        checklist: [
          "Criar perfume e documentar evolução nas semanas 1, 2, 4 e 6",
          "Comparar perfume recém-feito vs maturado (lado a lado)",
          "Criar protocolo pessoal de maceração com condições ideais"
        ]
      },
      {
        titulo: "Perfumes Sólidos e Roll-ons",
        descricao: "Formatos alternativos ao spray tradicional",
        duracaoMinutos: 15,
        conteudo: `# Perfumes Sólidos e Roll-ons

## Além do Spray

Perfumes não precisam ser apenas sprays alcoólicos. Formatos alternativos oferecem vantagens únicas.

### Perfume Sólido (30g)

**Receita Base:**
- Cera de abelha: 12g (40%)
- Óleo de jojoba: 15g (50%)
- Blend aromático: 3g (10%)

**Processo:**
1. Derreter cera em banho-maria
2. Adicionar jojoba e misturar
3. Retirar do fogo e adicionar blend aromático
4. Despejar em lata ou pote enquanto líquido
5. Deixar solidificar naturalmente (30-60 min)

### Roll-on Perfumado (10ml)

**Receita Base:**
- Óleo de jojoba ou coco fracionado: 8ml (80%)
- Blend aromático: 2ml (20%)

**Vantagens do roll-on:**
- Portátil e prático
- Aplicação precisa
- Ideal para peles sensíveis
- Maior fixação que spray

### Sachê Perfumado

**Receita:**
- Bicarbonato de sódio: 50g
- Amido de milho: 50g
- Blend aromático: 2ml
- Flores secas: opcional

### Comparação de Formatos

| Formato | Fixação | Portabilidade | Custo |
| Spray (álcool) | 4-8h | Média | Médio |
| Roll-on (óleo) | 6-10h | Alta | Baixo |
| Sólido (cera) | 3-6h | Muito alta | Baixo |`,
        quiz: [
          {
            pergunta: "Qual formato de perfume geralmente tem a maior fixação?",
            opcoes: [
              "Spray alcoólico",
              "Roll-on em óleo",
              "Perfume sólido em cera",
              "Body mist em água"
            ],
            respostaCorreta: 1,
            explicacao: "Roll-ons em óleo (jojoba/coco fracionado) têm fixação de 6-10h porque o óleo retarda a evaporação das moléculas aromáticas."
          }
        ],
        checklist: [
          "Criar perfume sólido em lata com receita base",
          "Criar roll-on aromático de 10ml",
          "Fazer sachê perfumado com flores secas",
          "Comparar durabilidade dos 3 formatos ao longo do dia"
        ]
      },
      {
        titulo: "Correção e Refinamento",
        descricao: "Identificar e corrigir problemas em fórmulas",
        duracaoMinutos: 15,
        conteudo: `# Correção e Refinamento

## Da Criação à Perfeição

Raramente um perfume fica perfeito na primeira tentativa. A habilidade de diagnosticar problemas e corrigi-los é o que separa amadores de profissionais.

### Problemas Comuns e Soluções

**Muito intenso/agressivo:**
→ Diluir ou adicionar notas suaves (sândalo, cedro)

**Sem fixação:**
→ Adicionar base amadeirada/resinosa (vetiver, benjoim)
→ Aumentar concentração

**Desequilibrado:**
→ Ajustar pirâmide — verificar proporções topo/coração/base

**Muito linear (não evolui):**
→ Adicionar contraste — uma nota inesperada

**Aroma "plano" (sem vida):**
→ Adicionar nota de destaque — um toque de cítrico ou especiaria

**Notas conflitantes:**
→ Adicionar nota-ponte que harmonize os extremos

### Método de Correção

1. Identificar o problema (cheirar após 48h de maturação)
2. Hipótese de correção (1 mudança por vez)
3. Ajustar em incrementos de 1-2%
4. Maturar 48h e reavaliar
5. Registrar todas as alterações

### Checklist de Qualidade

- [ ] Pirâmide equilibrada (topo, coração, base)
- [ ] Evolução temporal agradável
- [ ] Fixação adequada ao formato
- [ ] Sem notas discordantes
- [ ] Sillage proporcional
- [ ] Conceito/storytelling coerente

> **Regra de ouro: nunca faça mais de 2 ajustes simultâneos.** Mude uma coisa, teste, e só depois mude outra.`,
        quiz: [
          {
            pergunta: "Qual a regra de ouro para corrigir um perfume?",
            opcoes: [
              "Refazer a fórmula do zero",
              "Fazer no máximo 2 ajustes simultâneos, testar e depois continuar",
              "Adicionar mais ingredientes até ficar bom",
              "Diluir até o problema desaparecer"
            ],
            respostaCorreta: 1,
            explicacao: "Ajustes devem ser feitos de forma controlada — no máximo 2 mudanças por vez, com 48h de maturação entre testes."
          }
        ],
        checklist: [
          "Analisar 3 perfumes criados anteriormente usando o checklist de qualidade",
          "Corrigir 1 perfume problemático documentando cada ajuste",
          "Comparar versão original vs corrigida após 48h de maturação"
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // MÓDULO 5: PROJETOS PRÁTICOS
  // ──────────────────────────────────────────────
  {
    titulo: "Projetos Práticos",
    descricao: "Perfume autoral, coleção, cliente fictício e recriação",
    icone: "Lightbulb",
    cor: "from-rose-50 to-pink-50",
    aulas: [
      {
        titulo: "Projeto Assinatura Pessoal",
        descricao: "Crie seu perfume autoral que representa sua essência",
        duracaoMinutos: 25,
        conteudo: `# Projeto: Assinatura Pessoal

## Seu Perfume, Sua Identidade

Este é o projeto mais importante do curso: criar um perfume que represente sua essência, estilo de vida e personalidade.

### Etapa 1: Conceito (30 min)

Responda:
- Que emoção quero evocar?
- Que memória quero despertar?
- Qual é meu estilo de vida?
- Em que momento usaria este perfume?
- 5-7 palavras-chave que me definem

### Etapa 2: Moodboard

Crie um painel visual com:
- Cores que me representam
- Paisagens que me inspiram
- Texturas e materiais favoritos
- Referências artísticas

### Etapa 3: Seleção de Ingredientes

- Escolher 8-12 óleos essenciais
- Testar acordes preliminares (3 opções)
- Definir família olfativa base
- Escolher nota de destaque (assinatura)

### Etapa 4: Formulação

- Criar pirâmide olfativa detalhada
- Calcular proporções precisas
- Preparar fórmula inicial (5ml)
- Registrar tudo na ficha técnica

### Etapa 5: Refinamento

- Avaliar após 48h de maturação
- Ajustar proporções se necessário
- Maturar 4 semanas
- Versão final em 30ml

### Entrega

- [ ] 30ml de perfume final
- [ ] Ficha técnica completa
- [ ] História/conceito escrito (150 palavras)
- [ ] Nome e identidade visual do perfume`,
        quiz: [
          {
            pergunta: "Qual é a primeira etapa para criar um perfume de assinatura pessoal?",
            opcoes: [
              "Escolher os óleos essenciais",
              "Definir o conceito, emoção e palavras-chave",
              "Calcular as proporções",
              "Comprar embalagens"
            ],
            respostaCorreta: 1,
            explicacao: "Todo perfume começa com o conceito — definir a emoção, memória e identidade que o perfume deve evocar antes de selecionar ingredientes."
          }
        ],
        checklist: [
          "Definir conceito com 5-7 palavras-chave pessoais",
          "Criar moodboard visual de inspiração",
          "Selecionar 8-12 óleos essenciais e testar 3 acordes",
          "Formular versão inicial de 5ml com ficha técnica",
          "Maturar 4 semanas e criar versão final de 30ml"
        ]
      },
      {
        titulo: "Projeto Linha para Ocasiões",
        descricao: "Desenvolva uma mini-coleção de 3 perfumes coerentes",
        duracaoMinutos: 25,
        conteudo: `# Projeto: Linha para Ocasiões

## Uma Coleção Coesa

Desenvolva 3 perfumes que formem uma coleção com identidade visual e olfativa comum, para diferentes momentos do dia.

### Briefing

1. **Dia a Dia** — fresco, versátil, confortável
2. **Trabalho/Profissional** — sofisticado, discreto, confiante
3. **Noite/Especial** — intenso, memorável, sedutor

### Requisitos

- Identidade visual comum (paleta de cores, estilo de rótulo)
- Preço acessível (ingredientes econômicos quando possível)
- Podem ser unissex ou definir target
- 15ml cada perfume

### Sugestões por Família

**Dia a Dia**: Cítrico-aromático ou Floral verde
**Trabalho**: Amadeirado ou Chipre moderno
**Noite**: Oriental ou Gourmand sofisticado

### Atividades

- [ ] Criar mood board da coleção (tema, cores, nome)
- [ ] Formular os 3 perfumes (5ml teste, depois 15ml)
- [ ] Criar nomes e descrições (storytelling)
- [ ] Desenhar rótulos com identidade visual comum
- [ ] Calcular custo e definir preço de venda

### Dica de Coerência

> **Use 2-3 ingredientes em comum nos 3 perfumes** — isso cria um "DNA" olfativo da coleção. Por exemplo: bergamota e vetiver podem aparecer nos 3, mas em proporções diferentes.`,
        quiz: [
          {
            pergunta: "Como criar coerência olfativa em uma coleção de perfumes?",
            opcoes: [
              "Usar os mesmos ingredientes em todos, só mudando proporções",
              "Usar 2-3 ingredientes em comum que criem um 'DNA' da coleção",
              "Fazer todos da mesma família olfativa",
              "Usar a mesma embalagem"
            ],
            respostaCorreta: 1,
            explicacao: "Usar 2-3 ingredientes comuns (ex: bergamota e vetiver) em proporções diferentes cria uma assinatura reconhecível sem tornar os perfumes iguais."
          }
        ],
        checklist: [
          "Criar mood board da coleção com tema, cores e nome",
          "Formular Perfume Dia a Dia (cítrico-aromático ou floral verde)",
          "Formular Perfume Trabalho (amadeirado discreto)",
          "Formular Perfume Noite (oriental intenso)",
          "Calcular custo total e definir preços competitivos"
        ]
      },
      {
        titulo: "Projeto Perfume para Cliente Fictício",
        descricao: "Pratique briefing profissional e criação sob encomenda",
        duracaoMinutos: 20,
        conteudo: `# Projeto: Perfume para Cliente Fictício

## Consultoria Olfativa Profissional

Neste projeto, você pratica a experiência completa de criar um perfume sob encomenda para um cliente.

### Cenários de Clientes

**Cliente A**: Mulher, 35 anos, executiva. Gosta de florais modernos. Quer algo único para reuniões importantes. Palavras-chave: poder, elegância, confiança.

**Cliente B**: Homem, 28 anos, artista. Busca algo amadeirado-aromático que transmita criatividade. Palavras-chave: inspiração, natureza, autenticidade.

**Cliente C**: Pessoa não-binária, 24 anos, adora natureza. Quer perfume verde-terroso para dia a dia. Palavras-chave: frescor, liberdade, simplicidade.

### Processo Profissional

1. **Análise do briefing**: quem é, o que gosta, ocasião
2. **Proposta de conceito**: apresentar ideia antes de criar
3. **Formulação e criação**: 2-3 variações para escolha
4. **Apresentação**: como se fosse cliente real

### Entrega

- [ ] Perfume de 15ml
- [ ] Proposta de conceito (1 página)
- [ ] Ficha técnica completa
- [ ] Apresentação profissional (slides ou documento)
- [ ] Argumentação de escolhas criativas`,
        quiz: [
          {
            pergunta: "Qual é o primeiro passo ao receber um briefing de cliente para perfume sob encomenda?",
            opcoes: [
              "Começar a misturar ingredientes imediatamente",
              "Analisar o briefing: perfil do cliente, preferências, ocasião de uso",
              "Mostrar sua coleção pronta",
              "Perguntar o orçamento"
            ],
            respostaCorreta: 1,
            explicacao: "O primeiro passo é uma análise profunda do briefing — entender quem é o cliente, suas preferências, estilo de vida e ocasião de uso."
          }
        ],
        checklist: [
          "Escolher 1 dos 3 clientes fictícios",
          "Criar proposta de conceito com moodboard e palavras-chave",
          "Formular 2-3 variações do perfume (5ml cada)",
          "Preparar apresentação profissional com argumentação"
        ]
      },
      {
        titulo: "Projeto Recriação de Clássico Natural",
        descricao: "Interprete perfumes icônicos em versão 100% natural",
        duracaoMinutos: 20,
        conteudo: `# Projeto: Recriação de Clássico Natural

## Tradução Olfativa

Escolha um perfume clássico e crie uma versão 100% natural inspirada. Este é o exercício supremo de criatividade e técnica.

### Perfumes Sugeridos

**Chanel Nº 5** → Ylang-ylang + Neroli + Rosa + Sândalo + Benjoim
**Dior Sauvage** → Bergamota + Lavanda + Pimenta-preta + Cedro + Âmbar
**Tom Ford Black Orchid** → Patchouli + Baunilha + Cardamomo + Incenso
**Jo Malone Wood Sage** → Sálvia esclareia + Cedro + Gálbano + Vetiver

### Processo de Desconstrução

1. Pesquisar pirâmide do original (Fragrantica, Parfumo)
2. Identificar cada nota e encontrar substituto natural
3. Manter a "intenção" do original, não copiar literalmente
4. Aceitar limitações (algumas notas são impossíveis em natural)

### Tabela de Substituições

| Sintético | Natural Equivalente |
| Aldeído | Neroli + petitgrain |
| Calone (aquático) | Lima + gálbano + vetiver |
| Musgo de carvalho | Patchouli + vetiver + cedro |
| Musk sintético | Semente de ambrette |
| Ambroxan | Sálvia esclareia + labdanum |

### Entrega

- [ ] Perfume natural criado (30ml)
- [ ] Análise comparativa detalhada (original vs natural)
- [ ] Reflexão sobre limitações e sucessos
- [ ] Ficha técnica com todas as substituições documentadas`,
        quiz: [
          {
            pergunta: "Qual é o objetivo ao recriar um perfume clássico em versão natural?",
            opcoes: [
              "Criar uma cópia exata idêntica",
              "Manter a 'intenção' e caráter do original, aceitando limitações naturais",
              "Usar os mesmos ingredientes do original",
              "Fazer um perfume completamente diferente"
            ],
            respostaCorreta: 1,
            explicacao: "A recriação natural busca capturar o espírito e intenção do original, não copiá-lo — aceitando que algumas notas só existem com sintéticos."
          }
        ],
        checklist: [
          "Pesquisar pirâmide olfativa do perfume escolhido",
          "Identificar substitutos naturais para cada nota sintética",
          "Formular versão natural de 30ml",
          "Criar análise comparativa documentando diferenças",
          "Registrar reflexões sobre limitações e conquistas"
        ]
      }
    ]
  },

  // ──────────────────────────────────────────────
  // MÓDULO 6: NEGÓCIOS E MERCADO
  // ──────────────────────────────────────────────
  {
    titulo: "Negócios e Mercado",
    descricao: "Precificação, branding, marketing e regulamentação",
    icone: "BarChart3",
    cor: "from-teal-50 to-cyan-50",
    aulas: [
      {
        titulo: "Mercado de Perfumaria Natural",
        descricao: "Tendências, nichos lucrativos e oportunidades no Brasil",
        duracaoMinutos: 15,
        conteudo: `# Mercado de Perfumaria Natural

## Oportunidades e Tendências

O mercado de perfumaria natural está em crescimento exponencial. Entender o cenário é essencial para posicionar seu negócio.

### Números do Mercado (2026)

- Mercado global de perfumaria natural: US$ 5.2 bilhões
- Crescimento anual: 12-15% (vs 3-5% perfumaria convencional)
- Brasil: 4º maior mercado de perfumaria do mundo
- Clean beauty: consumidores dispostos a pagar 25-40% a mais

### Perfil do Consumidor

- 68% preferem ingredientes naturais identificáveis
- 72% verificam lista de ingredientes antes de comprar
- 85% valorizam transparência e rastreabilidade
- Geração Z e Millennials lideram a demanda

### Nichos Lucrativos

✅ Perfumes terapêuticos (aromaterapia funcional)
✅ Perfumes masculinos naturais (mercado subexplorado)
✅ Perfumes unissex/sem gênero
✅ Perfumes para pets (mercado emergente!)
✅ Perfumes de ambiente (home fragrance)
✅ Perfumes para casamentos e eventos

### Análise SWOT Pessoal

**Forças**: conhecimento técnico, paixão, diferenciação
**Fraquezas**: capital inicial, marca desconhecida
**Oportunidades**: mercado em crescimento, consumidor consciente
**Ameaças**: concorrência, regulamentação, custo de matéria-prima`,
        quiz: [
          {
            pergunta: "Quanto a mais consumidores estão dispostos a pagar por perfumes naturais?",
            opcoes: [
              "5-10%",
              "25-40%",
              "50-70%",
              "Não estão dispostos a pagar mais"
            ],
            respostaCorreta: 1,
            explicacao: "Pesquisas indicam que consumidores do segmento clean beauty estão dispostos a pagar 25-40% a mais por produtos com ingredientes naturais."
          }
        ],
        checklist: [
          "Pesquisar 10 marcas de perfumaria natural (nacionais e internacionais)",
          "Fazer análise SWOT pessoal",
          "Identificar 3 nichos com potencial para seu perfil"
        ]
      },
      {
        titulo: "Precificação e Custos",
        descricao: "Cálculos, markup e estratégias de preço",
        duracaoMinutos: 15,
        conteudo: `# Precificação e Custos

## Preços que Sustentam seu Negócio

Precificar corretamente é a diferença entre um hobby e um negócio sustentável.

### Estrutura de Custos

**Custo de Produção (exemplo para EdP 30ml):**
- Óleos essenciais: R$ 15-40
- Álcool 95%: R$ 2-5
- Embalagem (frasco + tampa + rótulo): R$ 8-15
- Mão de obra/hora: R$ 10-20
- **Custo total**: R$ 35-80

### Fórmula de Precificação

**Preço Varejo** = Custo × 4 (markup padrão, margem ~75%)
- Exemplo: R$ 40 × 4 = R$ 160 → Preço: R$ 159,90

**Preço Atacado** = Custo × 2.5 (margem ~60%)
- Exemplo: R$ 40 × 2.5 = R$ 100

### Estratégias de Precificação

**Premium** (R$ 200-500 por 30ml):
- Ingredientes raros, embalagem luxuosa
- Edições limitadas, storytelling forte
- Público: entusiastas, colecionadores

**Acessível** (R$ 80-180 por 30ml):
- Ingredientes bons, embalagem funcional
- Produção maior, foco em volume
- Público: primeiro perfume natural

**Linha econômica** (R$ 40-80 por 15ml):
- Roll-ons e sólidos
- Ingredientes básicos, embalagem simples
- Entrada no mercado, experimentação

### Kits e Combos

Kits aumentam ticket médio em 40-60%:
- Kit Descoberta: 3 perfumes × 5ml = R$ 89,90
- Kit Completo: 30ml + sólido + sachê = R$ 249,90`,
        quiz: [
          {
            pergunta: "Qual é o markup padrão para preço de varejo em perfumaria artesanal?",
            opcoes: [
              "Custo × 2",
              "Custo × 3",
              "Custo × 4",
              "Custo × 6"
            ],
            respostaCorreta: 2,
            explicacao: "O markup padrão é 4x o custo (margem de ~75%), garantindo sustentabilidade para cobrir custos fixos, marketing e lucro."
          }
        ],
        checklist: [
          "Calcular custo de produção de 3 perfumes criados durante o curso",
          "Definir preços competitivos usando markup 4x",
          "Criar tabela de preços: varejo, atacado e kits"
        ]
      },
      {
        titulo: "Branding e Marketing Digital",
        descricao: "Identidade de marca, embalagem e estratégias online",
        duracaoMinutos: 15,
        conteudo: `# Branding e Marketing Digital

## Construindo uma Marca Memorável

Um perfume excepcional com branding fraco não vende. Uma marca forte com perfumes medianos também não dura. Você precisa de ambos.

### Elementos de Branding

**Nome da marca**: memorável, pronunciável, único
**Logo**: simples, elegante, versátil (preto e branco funciona!)
**Paleta de cores**: 3-5 cores consistentes
**Tom de voz**: íntimo? Luxuoso? Acessível? Científico?
**Valores**: sustentabilidade, artesanal, transparência

### Embalagem Sustentável

- Frascos de vidro reutilizáveis
- Rótulos em papel reciclado/plantável
- Caixas de papelão kraft
- Evitar plástico sempre que possível
- Refil como opção (tendência forte)

### Marketing Digital

**Instagram** (principal canal):
- Behind the scenes: processo de criação
- Educação: benefícios dos naturais
- Depoimentos de clientes
- Rituais e lifestyle
- Reels de 15-30s (maior alcance)

**Conteúdo que Funciona:**
- "Como fazer seu perfume durar mais" (educativo)
- "Por que perfumes naturais são diferentes" (posicionamento)
- "Criando um perfume do zero" (behind the scenes)
- "O que significa cada nota" (curiosidade)

### Canais de Venda

✅ Instagram Shopping
✅ Feiras e mercados artesanais
✅ Lojas conceito e spas parceiros
✅ Site próprio (Shopify, WooCommerce)
✅ Marketplaces: Elo7, Etsy

> **80% das vendas de perfumaria natural artesanal começam pelo Instagram.**`,
        quiz: [
          {
            pergunta: "Qual é o principal canal de vendas para perfumaria natural artesanal?",
            opcoes: [
              "Grandes redes de farmácia",
              "Supermercados",
              "Instagram (com feiras e lojas conceito)",
              "Apenas e-commerce próprio"
            ],
            respostaCorreta: 2,
            explicacao: "O Instagram é responsável por ~80% das vendas iniciais de perfumaria artesanal, combinado com feiras presenciais e lojas conceito."
          }
        ],
        checklist: [
          "Definir nome, valores e tom de voz da marca",
          "Criar moodboard de identidade visual",
          "Planejar calendário de conteúdo para 1 mês (12 posts)",
          "Escrever 5 captions de Instagram prontas para publicar",
          "Listar 5 potenciais parceiros (spas, lojas conceito)"
        ]
      },
      {
        titulo: "Regulamentação e Segurança",
        descricao: "ANVISA, rotulagem obrigatória e certificações",
        duracaoMinutos: 15,
        conteudo: `# Regulamentação e Segurança

## Legalidade e Responsabilidade

Para vender perfumes no Brasil, é obrigatório seguir regulamentações específicas. Ignorar isso pode resultar em multas e proibição de venda.

### ANVISA e Perfumaria

Perfumes são classificados como **cosméticos Grau 1** (risco mínimo):
- Notificação obrigatória na ANVISA
- Não precisa de registro prévio (diferente de grau 2)
- Responsável técnico não obrigatório, mas recomendado
- Formulário eletrônico de notificação

### Rotulagem Obrigatória

Todo perfume deve conter no rótulo:
- Nome do produto e marca
- Lista de ingredientes (nomenclatura INCI)
- Conteúdo líquido (ml)
- Prazo de validade ou PAO (Period After Opening)
- Dados do fabricante (CNPJ, endereço)
- Lote de fabricação
- País de origem
- Avisos obrigatórios (fotossensibilidade, alérgenos)

### Testes Recomendados

- **Estabilidade**: 90 dias em diferentes temperaturas
- **Compatibilidade**: perfume vs embalagem
- **HRIPT (patch test)**: teste de irritação em humanos
- **Microbiológico**: contaminação por fungos/bactérias

### Certificações Voluntárias

- **Vegano**: sem ingredientes de origem animal
- **Cruelty-free**: sem testes em animais
- **Orgânico**: IBD, ECOCERT
- **Natural**: COSMOS Natural, NATRUE

### Boas Práticas de Fabricação

✅ Ambiente limpo e exclusivo para produção
✅ Utensílios higienizados (álcool 70%)
✅ Matérias-primas com certificado de origem
✅ Registro de cada lote (rastreabilidade)
✅ Armazenamento adequado (temperatura, luz)

⚠️ Mesmo sendo artesanal, profissionalismo é obrigatório.`,
        quiz: [
          {
            pergunta: "Como perfumes são classificados pela ANVISA?",
            opcoes: [
              "Medicamento",
              "Cosmético Grau 1 (risco mínimo)",
              "Cosmético Grau 2 (risco alto)",
              "Alimento"
            ],
            respostaCorreta: 1,
            explicacao: "Perfumes são classificados como cosméticos Grau 1 (risco mínimo) pela ANVISA, exigindo notificação, mas não registro prévio."
          }
        ],
        checklist: [
          "Estudar processo de notificação na ANVISA",
          "Criar modelo de rótulo conforme exigências legais",
          "Definir protocolo de boas práticas de fabricação",
          "Pesquisar certificações relevantes para seu negócio (vegano, cruelty-free)",
          "Iniciar registro de lotes para rastreabilidade"
        ]
      }
    ]
  }
];
