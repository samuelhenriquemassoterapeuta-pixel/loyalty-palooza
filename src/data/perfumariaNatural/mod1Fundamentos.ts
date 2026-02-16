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
  nivel?: "iniciante" | "intermediario" | "avancado";
  aulas: AulaContent[];
}

export const mod1Fundamentos: ModuloContent = {
  titulo: "Fundamentos da Perfumaria Natural",
  descricao: "História, anatomia olfativa, famílias e segurança",
  icone: "BookOpen",
  cor: "from-amber-50 to-yellow-50",
  nivel: "iniciante",
  aulas: [
    {
      titulo: "A História dos Aromas",
      descricao: "Da antiguidade ao renascimento natural contemporâneo",
      duracaoMinutos: 25,
      conteudo: `# A História dos Aromas

## Da Antiguidade à Perfumaria Natural Moderna

A perfumaria é uma das artes mais antigas da humanidade. Desde os primeiros incensos queimados em rituais sagrados até os perfumes artesanais contemporâneos, os aromas sempre estiveram no centro da experiência humana.

### Egito Antigo: Perfumes Sagrados

- **Kyphi**: o perfume sagrado — combinação de mirra, canela, junípero e mel
- Usado em rituais de adoração e embalsamamento
- Faraós eram sepultados com óleos aromáticos preciosos
- Cleópatra perfumava as velas de seus navios com rosa e jasmim

### Mesopotâmia: Primeiros Registros de Destilação

- Primeiros alambiques rudimentares para extração de essências
- Tabuletas cuneiformes com receitas de incensos
- Comércio de resinas aromáticas como moeda de troca

### Índia e China: Medicina Aromática Tradicional

- Ayurveda: uso de sândalo, vetiver e jasmim há 5.000 anos
- Medicina Tradicional Chinesa: aromas para equilíbrio energético
- Attar: perfumaria oriental ancestral com destilação em sândalo

### Grécia e Roma: Democratização dos Aromas

- Banhos perfumados, óleos corporais e guirlandas aromáticas
- Rota das Especiarias: incenso, mirra e canela viajavam milhares de km
- Hipócrates: "O caminho para a saúde é tomar banho aromático diariamente"

### A Influência Árabe

> **Os árabes aperfeiçoaram a destilação a vapor no século X, revolucionando a extração de óleos essenciais.**

Avicena (Ibn Sina) é creditado como o pai da destilação moderna. A água de rosas tornou-se símbolo de hospitalidade e sofisticação.

### Renascimento: Florença e a Perfumaria Europeia

- Catarina de Médici leva perfumistas italianos para a França
- Luvas perfumadas se tornam moda aristocrática
- Nascimento da tradição francesa de perfumaria

### Grasse: Capital Mundial do Perfume

A cidade de Grasse, no sul da França, tornou-se o epicentro da perfumaria:
- Campos de lavanda, jasmim e rosa centifolia
- Técnica de enfleurage (extração por gordura)
- Nascimento das grandes casas de perfumaria
- Até hoje produz os melhores absolutos do mundo

### A Revolução Sintética (Século XX)

- 1882: Fougère Royale — primeiro perfume com molécula sintética (cumarina)
- 1921: Chanel Nº 5 — aldeídos revolucionam a perfumaria
- Décadas de 1980-2000: domínio total dos sintéticos
- Perda do artesanato olfativo tradicional

### O Renascimento Natural (2000-2026)

O movimento de volta ao natural ganhou força:
- Consumidores buscam transparência e sustentabilidade
- Perfumistas como Mandy Aftel, JoAnne Bassett e Anya McCoy lideram o movimento
- Certificações naturais: ECOCERT, COSMOS, IFRA Natural
- Referências brasileiras: Rosa de Luz (Theo Bibancos), Harmonie Aromaterapia, Paralela Escola Olfativa
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
        },
        {
          pergunta: "O que é Kyphi?",
          opcoes: ["Um perfumista egípcio", "O perfume sagrado do Egito Antigo", "Uma técnica de destilação", "Uma flor rara"],
          respostaCorreta: 1,
          explicacao: "Kyphi era o perfume sagrado do Egito Antigo, uma combinação de mirra, canela, junípero e mel usado em rituais."
        }
      ],
      checklist: [
        "Criar linha do tempo pessoal com marcos históricos da perfumaria",
        "Pesquisar 3 perfumistas naturais contemporâneos e suas filosofias",
        "Identificar 5 ingredientes naturais que já eram usados no Egito Antigo",
        "Associar cada época histórica a um ingrediente característico"
      ]
    },
    {
      titulo: "Anatomia e Fisiologia do Olfato",
      descricao: "Como funciona nosso sistema olfativo e a conexão com memórias",
      duracaoMinutos: 25,
      conteudo: `# Anatomia e Fisiologia do Olfato

## Como Percebemos os Aromas

O olfato é o sentido mais primitivo e diretamente conectado ao nosso sistema emocional. Entender como funciona é essencial para criar perfumes que realmente tocam as pessoas.

### O Sistema Olfativo

- **Narinas**: entrada das moléculas aromáticas
- **Epitélio olfativo**: área de 5cm² com ~10 milhões de receptores
- **Bulbo olfativo**: processa sinais e envia ao cérebro
- **Sistema límbico**: centro emocional — por isso aromas evocam memórias
- **Córtex olfativo**: interpretação consciente dos aromas

> **Somos capazes de distinguir mais de 1 trilhão de combinações aromáticas diferentes.**

### Neurociência do Olfato

- O olfato é o único sentido que NÃO passa pelo tálamo
- Conexão direta com amígdala (emoções) e hipocampo (memórias)
- Fenômeno da "Memória Involuntária de Proust" — um aroma transporta instantaneamente para uma lembrança
- Os cheiros são processados 10x mais rápido que estímulos visuais

### Psicologia e Memória Olfativa

Por que cheiros evocam memórias tão vívidas?
- Amígdala cerebral processa emoção e cheiro simultaneamente
- Hipocampo consolida memórias com "etiquetas olfativas"
- Memórias olfativas duram décadas sem perder intensidade emocional

### Variações de Percepção

- **Anosmia**: incapacidade total de perceber aromas
- **Hiposmia**: redução da capacidade olfativa
- **Parosmia**: distorção dos aromas (pós-COVID é comum)
- **Adaptação olfativa (fadiga)**: deixamos de perceber aromas constantes após ~20 minutos

### Como Resetar o Olfato

Quando o nariz "cansa" durante criação:
- Cheire grãos de café (neutralizador clássico)
- Respire ar fresco por 2-3 minutos
- Cheire a própria pele (neutro individual)
- Limite sessões de criação a 30-40 minutos

### Treinamento Sistemático do Nariz

Para se tornar um perfumista, é essencial treinar o nariz:

**1. Cheirar conscientemente** — 5 aromas por dia, com atenção plena
**2. Criar vocabulário** — descrever cada aroma com 3+ adjetivos
**3. Memória olfativa** — associar aromas a imagens e emoções
**4. Diário olfativo** — registrar percepções diariamente por 7 dias

### Exercício: Diário Olfativo (7 dias)

- [ ] Dia 1-7: Registre 3 cheiros por dia
- [ ] Para cada cheiro: o que cheirou, contexto, como se sentiu, que memória trouxe
- [ ] Análise final: identifique padrões nas suas preferências`,
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
          pergunta: "O que é adaptação olfativa (fadiga)?",
          opcoes: [
            "Capacidade de cheirar melhor com o tempo",
            "Perda permanente do olfato",
            "Deixar de perceber um aroma constante após ~20 minutos",
            "Alergia a aromas fortes"
          ],
          respostaCorreta: 2,
          explicacao: "A adaptação olfativa é o fenômeno natural de deixar de perceber aromas aos quais estamos constantemente expostos, geralmente após 20 minutos."
        }
      ],
      checklist: [
        "Criar diário olfativo com template próprio para 7 dias",
        "Treinar com 5 aromas básicos: limão, lavanda, canela, café, rosa",
        "Praticar descrição olfativa sem nomear o ingrediente",
        "Testar fadiga olfativa: cheirar lavanda 2min, resetar com café, repetir",
        "Mapear preferências olfativas pessoais"
      ]
    },
    {
      titulo: "As 7 Famílias Olfativas Naturais",
      descricao: "Classificação profissional e ingredientes por família",
      duracaoMinutos: 30,
      conteudo: `# As 7 Famílias Olfativas Naturais

## Classificação Profissional de Perfumes

A roda olfativa organiza os aromas em famílias e subfamílias. Dominar cada família é essencial para criar perfumes equilibrados.

### 1. CÍTRICA (Hesperidada)

- **Características**: frescas, vibrantes, efêmeras
- **Ingredientes naturais**: Bergamota, Limão siciliano, Laranja doce, Grapefruit, Yuzu, Tangerina
- **Volatilidade**: notas de topo (5-15 min)
- **Uso**: colônias, fragrâncias frescas, verão

### 2. FLORAL

- **Características**: românticas, delicadas, universais
- **Subgrupos**: Soliflores (flor única), Buquês (combinação), Florais verdes, Florais aldeídicos
- **Ingredientes naturais**: Rosa damascena, Jasmim sambac/grandiflorum, Ylang ylang, Néroli, Lavanda, Gerânio, Osmanthus

### 3. FOUGÈRE (Samambaia)

- **Características**: aromáticas, frescas, clássicas
- **Estrutura natural**: Topo: Lavanda | Coração: Gerânio, Tonka | Fundo: Musgo de carvalho, Vetiver
- **Desafio natural**: cumarina (extrair de fava tonka)

### 4. CHYPRE

- **Características**: elegantes, sofisticadas, terrosas
- **Estrutura natural**: Topo: Bergamota | Coração: Rosa, Jasmim | Fundo: Musgo de carvalho, Labdanum, Patchouli
- **Versões naturais modernas**: sem musgo sintético

### 5. AMADEIRADA

- **Características**: quentes, secas, envolventes
- **Ingredientes naturais**: Cedro atlas/virgínia, Sândalo, Vetiver, Patchouli, Cipreste, Pinho

### 6. ORIENTAL (Âmbar)

- **Características**: quentes, sensuais, doces, especiadas
- **Ingredientes naturais**: Baunilha (absoluto/tintura), Benjoim, Ládano (labdanum), Opoponax, Especiarias (canela, cravo, cardamomo), Mirra, Olíbano

### 7. COUROS

- **Características**: animalísticas, fumadas, secas
- **Ingredientes naturais**: Birch tar (alcatrão de bétula), Cade oil, Labdanum, Oud, Especiarias secas

### Subfamílias e Hibridização

Cada família possui subfamílias:
- Floral Verde, Floral Frutal, Floral Oriental
- Amadeirado Aromático, Amadeirado Seco
- Oriental Especiado, Oriental Gourmand

### Famílias Modernas

- **Gourmand**: baunilha, café, chocolate, especiarias doces (viável em natural!)
- **Verde**: gálbano, folha de violeta, notas cortadas (viável)
- **Aquática/Ozônica**: notas marinhas (difícil sem sintéticos)

### Tabela de Volatilidade

| Nota | Tempo | Exemplos |
| Topo | 15-30min | Bergamota, Limão, Laranja, Grapefruit |
| Coração | 2-4h | Lavanda, Gerânio, Rosa, Ylang-ylang |
| Base | 4-24h+ | Vetiver, Sândalo, Patchouli, Benjoim |

### Pirâmide Olfativa: Proporções de Referência

> **30% topo + 50% coração + 20% base** — proporção clássica equilibrada

Variações por família:
- Cologne: 40% topo + 30% coração + 30% base
- Oriental: 15% topo + 35% coração + 50% base
- Amadeirado: 25% topo + 30% coração + 45% base`,
      quiz: [
        {
          pergunta: "Quantas famílias olfativas clássicas existem?",
          opcoes: ["3", "5", "7", "10"],
          respostaCorreta: 2,
          explicacao: "Existem 7 famílias olfativas clássicas: Cítrica, Floral, Fougère, Chypre, Amadeirada, Oriental e Couros."
        },
        {
          pergunta: "Qual família olfativa é impossível de recriar 100% com ingredientes naturais?",
          opcoes: ["Floral", "Aquática/Ozônica", "Oriental", "Amadeirada"],
          respostaCorreta: 1,
          explicacao: "A família Aquática/Ozônica depende de moléculas sintéticas como calone para criar notas marinhas — impossíveis em perfumaria 100% natural."
        },
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
        }
      ],
      checklist: [
        "Criar roda olfativa visual com 7 famílias e 3-5 ingredientes cada",
        "Classificar 15 óleos essenciais por nota (topo, coração, base)",
        "Criar mini-perfume de 3 famílias diferentes (5ml cada)",
        "Fazer teste de identificação cega: 7 amostras, uma por família",
        "Mapear preferências pessoais na roda olfativa"
      ]
    },
    {
      titulo: "Introdução aos Óleos Essenciais",
      descricao: "Extração, química, qualidade e kit básico do perfumista",
      duracaoMinutos: 30,
      conteudo: `# Introdução aos Óleos Essenciais

## O que São Óleos Essenciais

Óleos essenciais são compostos voláteis concentrados extraídos de plantas. Cada gota contém centenas de moléculas aromáticas que determinam perfil olfativo e propriedades terapêuticas.

### Diferença Entre Tipos de Extrato

- **Óleo Essencial**: destilação a vapor ou prensagem a frio
- **Absoluto**: extração com solvente (hexano → álcool), mais fiel à planta
- **Concreto**: extrato intermediário, antes do absoluto
- **CO2 Supercrítico**: extração com CO2 sob pressão, sem resíduos
- **Tintura**: maceração em álcool por semanas/meses

### Métodos de Extração

**1. Destilação a Vapor** (mais comum)
- Vapor d'água atravessa material vegetal
- Moléculas aromáticas são arrastadas pelo vapor
- Condensação separa óleo essencial da água (hidrolato)
- Usado para: lavanda, alecrim, eucalipto, tea tree

**2. Prensagem a Frio** (cítricos)
- Cascas são prensadas mecanicamente
- Sem calor — preserva frescor
- Cuidado: contém furanocumarinas (fotossensibilizantes)
- Versão FCF (Furanocumarin Free) disponível para bergamota

**3. Extração por Solvente → Absoluto
- Solvente (hexano) extrai o concreto
- Álcool purifica em absoluto
- Mais fiel ao aroma da planta viva
- Usado para: jasmim, rosa, tuberosa

**4. CO2 Supercrítico**
- CO2 sob alta pressão atua como solvente
- Resultado mais fiel, sem resíduos químicos
- Custo mais elevado
- Usado para: baunilha, café, gengibre

**5. Enfleurage (Histórico)**
- Método antigo com gordura animal/vegetal
- Flores frescas sobre gordura por dias
- Hoje raríssimo e muito caro
- Interesse histórico e artisanal

### Química dos Óleos Essenciais

**MONOTERPENOS** (leves, frescos, topo)
- Limoneno: cítricos, energizante
- Pineno: pinho, anti-inflamatório

**SESQUITERPENOS** (médios, fundo, fixadores)
- Cariofileno: pimenta, anti-inflamatório
- Bisabolol: camomila, calmante

**ÁLCOOIS TERPÊNICOS** (seguros, terapêuticos)
- Linalol: lavanda, relaxante
- Geraniol: rosa, antimicrobiano
- Mentol: hortelã, refrescante

**ÉSTERES** (frutais, doces)
- Acetato de linalila: lavanda, calmante

**FENÓIS** (antimicrobianos fortes, irritantes!)
- Eugenol: cravo
- Timol: tomilho

**ALDEÍDOS** (cítricos, anti-inflamatórios)
- Citral: lemongrass
- Citronelal: citronela

### Avaliação de Qualidade

Critérios para escolher óleos de qualidade:
- **Nome botânico** (latim): ex. Lavandula angustifolia
- **Parte da planta**: flores, folhas, casca, raiz
- **Quimiotipo** (CT): composição química específica
- **Origem geográfica**: terroir influencia o aroma
- **Método de extração**
- **Certificado GC/MS**: cromatografia gasosa
- **Certificações**: orgânico, ECOCERT

### Como Identificar Adulterações

⚠️ Sinais de óleo adulterado:
- Preço muito abaixo do mercado
- "Óleo essencial" de morango, maçã, melancia (NÃO existem!)
- Cheiro excessivamente uniforme e "perfeito"
- Sem informações botânicas no rótulo
- Mancha oleosa residual em papel (pode indicar óleo vegetal)

### Kit Básico do Perfumista Natural (15 OEs)

**CÍTRICOS (4):**
- Bergamota FCF — R$ 40-60/10ml
- Limão siciliano — R$ 20-35/10ml
- Laranja doce — R$ 15-25/10ml
- Grapefruit — R$ 25-40/10ml

**FLORAIS (4):**
- Lavanda angustifolia — R$ 50-80/10ml
- Gerânio — R$ 40-70/10ml
- Ylang ylang — R$ 40-70/10ml
- Palmarosa — R$ 35-55/10ml

**HERBAIS (2):**
- Alecrim — R$ 20-35/10ml
- Hortelã-pimenta — R$ 20-35/10ml

**AMADEIRADOS (3):**
- Cedro atlas — R$ 35-55/10ml
- Vetiver — R$ 50-80/10ml
- Patchouli — R$ 40-65/10ml

**ESPECIARIA + RESINA (2):**
- Cardamomo — R$ 50-80/10ml
- Olíbano (incenso) — R$ 40-65/10ml

> **Investimento total: R$ 500-800** para um kit de qualidade`,
      quiz: [
        {
          pergunta: "Qual método de extração é usado para óleos cítricos?",
          opcoes: ["Destilação a vapor", "Prensagem a frio", "Extração por CO2", "Enfleurage"],
          respostaCorreta: 1,
          explicacao: "Óleos cítricos são extraídos por prensagem mecânica a frio das cascas, preservando o frescor e as vitaminas."
        },
        {
          pergunta: "Qual NÃO é um óleo essencial real?",
          opcoes: ["Lavanda", "Morango", "Vetiver", "Patchouli"],
          respostaCorreta: 1,
          explicacao: "Não existe óleo essencial de morango — frutas como morango, maçã e melancia não produzem óleos essenciais. São sempre fragrâncias sintéticas."
        },
        {
          pergunta: "O que significa FCF na bergamota?",
          opcoes: [
            "First Cold Filtered",
            "Furanocumarin Free — sem substâncias fotossensibilizantes",
            "Full Chemical Formula",
            "French Certified Fragrance"
          ],
          respostaCorreta: 1,
          explicacao: "FCF (Furanocumarin Free) significa que a bergamota foi tratada para remover furanocumarinas que causam queimaduras solares."
        }
      ],
      checklist: [
        "Analisar rótulos de 3 óleos essenciais e verificar informações botânicas",
        "Montar kit básico do perfumista com pelo menos 10 dos 15 OEs recomendados",
        "Comparar óleos de diferentes fornecedores sensorialmente",
        "Criar ficha de perfil para cada óleo do kit: aroma, volatilidade, combinações",
        "Testar pureza: diluir em álcool e observar transparência"
      ]
    },
    {
      titulo: "Segurança e Toxicologia",
      descricao: "Diluições seguras, contraindicações e regulamentação ANVISA",
      duracaoMinutos: 30,
      conteudo: `# Segurança e Toxicologia

## Princípios de Segurança com Óleos Essenciais

Óleos essenciais são compostos químicos potentes — altamente concentrados (100-1000x mais que a planta), lipofílicos (penetram pele rapidamente) e com metabolização hepática.

### Guia de Diluição

**USO FACIAL:**
- 0,5-1% de OE (10-20 gotas por 100ml)
- Pele sensível/crianças: 0,25%

**USO CORPORAL:**
- 2-3% de OE (40-60 gotas por 100ml)
- Massagem terapêutica: até 5%

**PERFUMES:**
- Eau de Cologne: 3-8%
- Eau de Toilette: 8-15%
- Eau de Parfum: 15-20%
- Parfum/Extrait: 20-30%

**CONVERSÃO:** 1ml ≈ 20 gotas | 5ml ≈ 100 gotas

### Contraindicações Importantes

**GESTANTES — Evitar:**
- Sálvia esclareia, Alecrim CT cânfora
- Hortelã-pimenta (1º trimestre)
- Canela, cravo (irritantes)
- Jasmim (pode estimular contrações)

**BEBÊS E CRIANÇAS:**
- < 3 meses: apenas lavanda, camomila (0,25%)
- 3 meses - 2 anos: evitar mentol, eucalipto, alcanfor
- > 2 anos: ampliar gradualmente

**EPILEPSIA — Evitar:**
- Alecrim CT cânfora, Hissopo, Sálvia, Funcho

**PELE SENSÍVEL — Evitar/Reduzir:**
- Canela, cravo (máx. 0,5%)
- Lemongrass, citronela em alta dose
- Pimenta negra

### Fotossensibilização

⚠️ Esperar 12h antes de exposição solar ao usar:
- Bergamota (usar versão FCF!)
- Limão, Lima, Grapefruit
- Angélica raiz

✅ Lima DESTILADA é segura (sem furocumarinas)

### Primeiros Socorros

**Contato com olhos:**
- NÃO lavar com água!
- Usar óleo vegetal (oliva, girassol)
- Procurar oftalmologista

**Ingestão acidental:**
- NÃO induzir vômito
- Beber leite integral ou óleo vegetal
- Centro de Intoxicação: 0800 722 6001

**Irritação cutânea:**
- Lavar com sabonete neutro
- Aplicar óleo vegetal
- Compressas frias

### Teste de Patch (Protocolo)

1. Diluir fórmula a 5% em óleo vegetal
2. Aplicar pequena quantidade no antebraço
3. Cobrir com band-aid
4. Aguardar 24-48h
5. Observar: vermelhidão, coceira, inchaço, ardência
6. Se houver reação: descontinuar ingrediente

### Regulamentação ANVISA

**Perfumes = Cosméticos Grau 1** (risco mínimo):
- Notificação obrigatória na ANVISA
- Não precisa de registro prévio
- Formulário eletrônico de notificação

**Rotulagem obrigatória:**
- Nome do produto e marca
- Lista de ingredientes (INCI)
- Conteúdo líquido (ml)
- Prazo de validade ou PAO
- Dados do fabricante (CNPJ)
- Lote de fabricação
- Avisos (fotossensibilidade, alérgenos)

**Alergênicos a declarar se > 0,001%:**
Linalol, Limoneno, Geraniol, Citronelol, Eugenol, Cumarina, Cinnamal`,
      quiz: [
        {
          pergunta: "Qual a concentração máxima segura de canela casca em perfumes para pele?",
          opcoes: ["5%", "2%", "0,5%", "10%"],
          respostaCorreta: 2,
          explicacao: "Canela casca contém cinamaldeído, um irritante e sensibilizante cutâneo. O limite seguro é 0,5% na formulação final."
        },
        {
          pergunta: "O que fazer se óleo essencial entrar nos olhos?",
          opcoes: [
            "Lavar com água corrente",
            "Usar óleo vegetal para diluir, NÃO água",
            "Aplicar colírio",
            "Esperar passar naturalmente"
          ],
          respostaCorreta: 1,
          explicacao: "OEs são lipofílicos (não se misturam com água). Usar óleo vegetal (oliva, girassol) para diluir e remover, depois procurar oftalmologista."
        },
        {
          pergunta: "Como perfumes são classificados pela ANVISA?",
          opcoes: ["Medicamento", "Cosmético Grau 1 (risco mínimo)", "Cosmético Grau 2 (risco alto)", "Alimento"],
          respostaCorreta: 1,
          explicacao: "Perfumes são cosméticos Grau 1 (risco mínimo), exigindo notificação na ANVISA mas não registro prévio."
        }
      ],
      checklist: [
        "Criar tabela de segurança: marcar gestante/criança/epilepsia/foto para cada OE do kit",
        "Praticar cálculo de diluição: criar perfume roll-on 10ml a 20%",
        "Realizar teste de patch em si mesmo com fórmula diluída a 5%",
        "Estudar lista de alergênicos INCI obrigatórios",
        "Criar checklist de segurança para dar a futuros clientes"
      ]
    },
    {
      titulo: "Primeira Criação Guiada: Colônia Cítrica",
      descricao: "Crie seu primeiro perfume 100% natural passo a passo",
      duracaoMinutos: 35,
      conteudo: `# Primeira Criação Guiada: Colônia Cítrica de Verão

## Seu Primeiro Perfume 100% Natural

Vamos criar uma colônia fresca e alegre do zero, entendendo cada etapa do processo.

### Materiais Necessários

- Frasco de vidro âmbar 30ml com spray
- Pipetas ou conta-gotas
- Fitas olfativas (tiras de papel)
- Caderno de fórmulas
- Álcool de cereais 96° (ou óleo de jojoba para roll-on)

### Óleos Essenciais Necessários

- Bergamota FCF
- Limão siciliano
- Laranja doce
- Grapefruit
- Lavanda
- Gerânio
- Vetiver

### ETAPA 1: Briefing e Conceito

Antes de qualquer gota, responda:
- Para quem é este perfume?
- Qual sensação quer transmitir? (energia, frescor, alegria)
- Em que momento seria usado? (manhã, trabalho, lazer)
- 3 palavras-chave: __________, __________, __________

### ETAPA 2: Estrutura da Pirâmide

**TOPO (60% — 24 gotas)**
- Bergamota FCF: 12 gotas (50%)
- Limão siciliano: 6 gotas (25%)
- Grapefruit: 4 gotas (17%)
- Laranja doce: 2 gotas (8%)

**CORAÇÃO (30% — 12 gotas)**
- Lavanda: 8 gotas (67%)
- Gerânio: 4 gotas (33%)

**FUNDO (10% — 4 gotas)**
- Vetiver: 4 gotas (100%)

**TOTAL: 40 gotas de OE (≈ 2ml)**

### ETAPA 3: Processo de Criação

**Começar de BAIXO para CIMA!**

**1. Adicionar FUNDO primeiro:**
- 4 gotas de Vetiver no béquer
- Cheirar na fita, anotar: "terroso, seco, enraizado"

**2. Adicionar CORAÇÃO:**
- 8 gotas de Lavanda + 4 gotas de Gerânio
- Misturar com bastão
- Anotar: "floral, equilibrado, arredonda o vetiver"

**3. Adicionar TOPO:**
- 12 gotas Bergamota + 6 Limão + 4 Grapefruit + 2 Laranja
- Misturar bem
- Anotar: "explosão cítrica, frescor, energia"

**4. Descansar 5 minutos e reavaliar**

### ETAPA 4: Diluição e Finalização

**Opção Spray (base alcoólica — 30ml):**
1. Adicionar 2ml de concentrado (40 gotas)
2. Adicionar 13ml de álcool de cereais 96°
3. Completar com água destilada até 30ml
4. Fechar e agitar por 1 minuto
5. Maturar mínimo 48h (ideal: 2 semanas)

**Opção Roll-on (base oleosa — 10ml):**
1. Adicionar 40 gotas de concentrado
2. Completar com óleo de jojoba até 10ml
3. Usar imediatamente (melhora com o tempo)

### ETAPA 5: Registro

**Ficha de Fórmula:**
- Nome: Colônia Fresca de Verão
- Data e Lote
- Fórmula completa com gotas de cada ingrediente
- Diluição: concentrado + veículo + total
- Avaliação: topo, coração, fundo, harmonia (nota /10)
- Ajustes necessários para próxima versão

### Teste de Evolução (48h)

Aplique no pulso e registre:
- Hora 0: explosão cítrica
- Hora 1: como evoluiu? Topo ainda presente?
- Hora 3: que notas predominam?
- Hora 6: fundo apareceu? Ainda percebe?
- Dia 2 (após maturação): mais suave? Mais integrado?

### Variações Criativas

**Versão Herbal:** Adicionar 2 gotas de Alecrim no topo + 2 de Hortelã
**Versão Amadeirada:** Aumentar Vetiver para 6 gotas + 2 gotas de Cedro`,
      quiz: [
        {
          pergunta: "Em que ordem devemos adicionar os ingredientes ao criar um perfume?",
          opcoes: [
            "Topo primeiro, depois coração, depois fundo",
            "Fundo primeiro, depois coração, depois topo",
            "Todos ao mesmo tempo",
            "A ordem não importa"
          ],
          respostaCorreta: 1,
          explicacao: "Começamos pelo fundo (base) para construir sobre uma fundação sólida. As notas de topo, mais voláteis, são adicionadas por último."
        },
        {
          pergunta: "Quanto tempo mínimo de maturação é recomendado para um perfume?",
          opcoes: ["1 hora", "24 horas", "48 horas (ideal: 2 semanas)", "Não precisa maturar"],
          respostaCorreta: 2,
          explicacao: "O mínimo é 48h para as moléculas começarem a interagir. O ideal é 2-4 semanas para uma maturação completa."
        }
      ],
      checklist: [
        "Separar todos os materiais e óleos essenciais necessários",
        "Definir conceito com 3 palavras-chave antes de começar",
        "Criar perfume seguindo a receita passo a passo",
        "Registrar fórmula completa na ficha técnica",
        "Fazer teste de evolução anotando percepções em 0h, 1h, 3h e 6h",
        "Pedir feedback de 3 pessoas diferentes",
        "Criar pelo menos 1 variação criativa da fórmula"
      ]
    }
  ]
};
