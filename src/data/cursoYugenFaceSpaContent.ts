export interface YugenFaceSpaAula {
  titulo: string;
  descricao: string;
  duracaoMinutos: number;
  conteudo: string;
  videoUrl?: string;
  quiz?: {
    pergunta: string;
    opcoes: string[];
    respostaCorreta: number;
    explicacao: string;
  }[];
  checklist?: string[];
}

export interface YugenFaceSpaModulo {
  titulo: string;
  descricao: string;
  icone: string;
  cor: string;
  aulas: YugenFaceSpaAula[];
}

export const cursoYugenFaceSpaData: YugenFaceSpaModulo[] = [
  {
    titulo: "1. Fundamentos da Massagem Facial Asiática",
    descricao: "Filosofia oriental, história e princípios do Yūgen FaceSPA",
    icone: "BookOpen",
    cor: "from-rose-50 to-pink-50",
    aulas: [
      {
        titulo: "O que é o Yūgen FaceSPA?",
        descricao: "Origem, filosofia e o conceito japonês de beleza invisível",
        duracaoMinutos: 15,
        conteudo: `## O Ritual Yūgen FaceSPA — 幽玄フェイススパ

### O Significado de Yūgen (幽玄)

Yūgen é um conceito estético japonês que descreve a "beleza profunda e misteriosa" — aquela que não se vê na superfície, mas se sente. Na filosofia zen, Yūgen representa a elegância sutil, a graça que existe além do visível.

> "Yūgen é sentir o universo onde pensamento e sentimento se fundem, e algo se percebe sem poder ser definido." — Zeami Motokiyo

### O que é o Yūgen FaceSPA?

O Yūgen FaceSPA é uma técnica de massagem facial desenvolvida a partir de práticas milenares da Medicina Oriental, combinando:

- **Kobido** (古美道): A arte ancestral japonesa da massagem facial
- **Acupressão facial** (指圧): Estimulação de pontos de energia (tsubos)
- **Drenagem linfática facial**: Eliminação de toxinas e redução de edema
- **Reflexologia facial**: Conexão face-corpo-mente através de zonas reflexas
- **Shiatsu facial** (指圧): Pressão terapêutica em meridianos específicos

### Filosofia Oriental vs. Ocidental

| Abordagem Oriental | Abordagem Ocidental |
| Beleza de dentro para fora | Beleza de fora para dentro |
| Equilíbrio energético (Qi/Ki) | Correção estética |
| Prevenção e harmonia | Tratamento de sintomas |
| Respeito ao corpo | Intervenção no corpo |
| Técnica manual milenar | Aparelhos e injetáveis |
| Resultado gradual e duradouro | Resultado imediato e temporário |

### Os 5 Pilares do Yūgen FaceSPA

- **Ki (気)** — Energia vital: Reequilíbrio do fluxo energético facial
- **Ketsueki (血液)** — Circulação: Ativação do fluxo sanguíneo e linfático
- **Kinniku (筋肉)** — Músculos: Tonificação e liberação de tensão muscular
- **Hada (肌)** — Pele: Estímulo à regeneração celular natural
- **Kokoro (心)** — Mente: Relaxamento profundo e bem-estar emocional

### Por que o Yūgen FaceSPA é diferente?

- ❌ Sem agulhas
- ❌ Sem aparelhos elétricos
- ❌ Sem produtos químicos agressivos
- ❌ Sem procedimentos invasivos
- ✅ 100% manual e natural
- ✅ Resultados perceptíveis já na primeira sessão
- ✅ Estimula os processos regenerativos naturais do corpo
- ✅ Baixo investimento para oferecer o serviço
- ✅ Alto valor agregado e ticket médio premium

### O Mercado da Estética Natural em 2025-2026

- Crescimento de 280% na busca por "tratamentos faciais naturais"
- 73% dos consumidores preferem alternativas não invasivas
- Mercado de facial spa projetado em US$ 12 bilhões até 2027
- Técnicas orientais liderando a tendência global de wellness`,
        quiz: [
          {
            pergunta: "O que significa o conceito japonês 'Yūgen' (幽玄)?",
            opcoes: [
              "Força e poder",
              "Beleza profunda e misteriosa",
              "Velocidade e eficiência",
              "Precisão técnica"
            ],
            respostaCorreta: 1,
            explicacao: "Yūgen (幽玄) é um conceito estético japonês que descreve a 'beleza profunda e misteriosa' — aquela que se sente além do visível, essência da filosofia zen aplicada à estética."
          }
        ],
        checklist: [
          "Compreender o significado de Yūgen (幽玄)",
          "Conhecer os 5 pilares do Yūgen FaceSPA",
          "Diferenciar abordagem oriental vs ocidental",
          "Entender o posicionamento premium do serviço"
        ]
      },
      {
        titulo: "História da Massagem Facial no Oriente",
        descricao: "Do Kobido japonês às técnicas chinesas, tailandesas e vietnamitas",
        duracaoMinutos: 12,
        conteudo: `## A Jornada Milenar da Massagem Facial Oriental

### Kobido — Japão (古美道) — Séc. XV

O Kobido, que significa "caminho ancestral da beleza", surgiu em 1472 no Japão. Era originalmente praticado exclusivamente para a realeza e a aristocracia japonesa.

- Desenvolvido pelos mestres Izumi e Namikoshi
- Combinava 47 técnicas diferentes de manipulação facial
- Considerado um dos tratamentos faciais mais antigos e sofisticados do mundo
- Reconhecido como patrimônio cultural japonês

> O Kobido não é apenas uma massagem — é uma arte marcial aplicada à beleza facial.

### Gua Sha Facial — China (刮痧) — 2.000+ anos

- Técnica de raspagem com pedras de jade ou quartzo rosa
- Promove circulação sanguínea e drenagem linfática
- Parte da Medicina Tradicional Chinesa (MTC)
- Baseada nos meridianos de energia (Qi)

### Thai Facial — Tailândia — Tradição Ayurvédica

- Combina acupressão com movimentos de yoga facial
- Trabalha pontos de energia (Sen lines) no rosto
- Integração corpo-mente-espírito
- Uso de compressas herbais quentes

### Vietnamese Facial — Vietnã — Tradição Oral

- Técnicas de amassamento com bambu
- Uso de ingredientes naturais locais (cúrcuma, arroz)
- Foco em luminosidade e uniformidade da pele

### Camboja — Influência Khmer

- Massagem facial com pedras quentes vulcânicas
- Rituais de purificação com ervas sagradas
- Conexão espiritual com o tratamento

### A Síntese Yūgen

O Yūgen FaceSPA foi desenvolvido por Géssica Katayama após anos de estudo in loco em todos estes países asiáticos, sintetizando o melhor de cada tradição em um protocolo único e replicável.

### Linha do Tempo

- **1472**: Origem do Kobido no Japão
- **1900s**: Expansão para spas japoneses
- **1970s**: Chegada do Shiatsu facial ao Ocidente
- **2000s**: Boom do Gua Sha via K-beauty
- **2020s**: Renascimento das técnicas naturais pós-pandemia
- **2024**: Criação do Yūgen FaceSPA
- **2025-26**: Expansão da técnica no Brasil`,
        quiz: [
          {
            pergunta: "Em que ano surgiu o Kobido no Japão?",
            opcoes: [
              "200 a.C.",
              "1472",
              "1850",
              "1970"
            ],
            respostaCorreta: 1,
            explicacao: "O Kobido (古美道) surgiu em 1472 no Japão, sendo originalmente praticado exclusivamente para a realeza e aristocracia japonesa."
          }
        ],
        checklist: [
          "Conhecer a origem do Kobido (1472, Japão)",
          "Diferenciar as 5 tradições orientais de massagem facial",
          "Entender como o Yūgen sintetiza todas as tradições",
          "Memorizar a linha do tempo da massagem facial oriental"
        ]
      },
      {
        titulo: "Conceitos de Qi, Meridianos e Tsubos",
        descricao: "A energia vital e os canais energéticos aplicados ao rosto",
        duracaoMinutos: 14,
        conteudo: `## A Energia Vital na Medicina Oriental

### O que é Qi / Ki (気)?

Na Medicina Oriental, Qi (chinês) ou Ki (japonês) é a energia vital que flui pelo corpo através de canais chamados meridianos. A saúde e a beleza da pele dependem diretamente do fluxo livre e equilibrado desta energia.

- Qi estagnado → Rugas, flacidez, palidez
- Qi em excesso → Vermelhidão, acne, inflamação
- Qi equilibrado → Pele radiante, firme e saudável

### Meridianos Faciais Principais

O rosto é percorrido por 8 meridianos principais:

**1. Meridiano do Estômago (足陽明胃経)**
- Percorre: Da bochecha ao queixo
- Função: Nutrição da pele, tônus muscular
- Desequilíbrio: Flacidez, sulco nasolabial profundo

**2. Meridiano do Intestino Grosso (手陽明大腸経)**
- Percorre: Lateral do nariz até a boca
- Função: Eliminação de toxinas, luminosidade
- Desequilíbrio: Pele opaca, cravos, poros dilatados

**3. Meridiano da Vesícula Biliar (足少陽胆経)**
- Percorre: Têmporas e lateral do rosto
- Função: Tomada de decisões, tensão mandibular
- Desequilíbrio: Bruxismo, cefaleia, olheiras

**4. Meridiano da Bexiga (足太陽膀胱経)**
- Percorre: Testa e sobrancelhas
- Função: Equilíbrio emocional
- Desequilíbrio: Linhas de expressão na testa

**5. Meridiano do Triplo Aquecedor (手少陽三焦経)**
- Percorre: Lateral do rosto e orelhas
- Função: Regulação de fluidos, edema
- Desequilíbrio: Inchaço facial, retenção

**6. Meridiano do Intestino Delgado (手太陽小腸経)**
- Percorre: Bochecha até orelha
- Função: Absorção de nutrientes pela pele
- Desequilíbrio: Pele desnutrida, ressecada

**7. Meridiano do Coração (手少陰心経)**
- Percorre: Ponta da língua, reflete no rosto
- Função: Circulação, brilho da pele
- Desequilíbrio: Palidez ou vermelhidão excessiva

**8. Meridiano do Pulmão (手太陰肺経)**
- Percorre: Bochechas e nariz
- Função: Hidratação, defesa da pele
- Desequilíbrio: Pele seca, rosácea, sensibilidade

### Tsubos Faciais — Pontos de Acupressão (ツボ)

Os Tsubos são pontos específicos nos meridianos onde a energia pode ser estimulada ou equilibrada:

- **Yintang (印堂)**: Entre as sobrancelhas — calma, clareza mental
- **Taiyo (太陽)**: Têmporas — alívio de cefaleia, relaxamento ocular
- **Dicang (地倉)**: Canto da boca — lifting do terço inferior
- **Yingxiang (迎香)**: Lateral do nariz — respiração, desobstrução
- **Sibai (四白)**: Abaixo dos olhos — olheiras, bolsas
- **Jiache (頬車)**: Ângulo da mandíbula — tensão, bruxismo
- **Quanliao (顴髎)**: Maçã do rosto — tônus, volume facial
- **Chengjiang (承漿)**: Abaixo do lábio inferior — definição do queixo

> Ao pressionar um tsubo por 5-8 segundos, você ativa o fluxo de Qi naquele meridiano, promovendo equilíbrio e rejuvenescimento na região.`,
        quiz: [
          {
            pergunta: "Qual tsubo facial é indicado para aliviar cefaleia e relaxar os olhos?",
            opcoes: [
              "Yintang (印堂)",
              "Taiyo (太陽)",
              "Dicang (地倉)",
              "Sibai (四白)"
            ],
            respostaCorreta: 1,
            explicacao: "O ponto Taiyo (太陽), localizado nas têmporas, é o principal tsubo para alívio de cefaleia e relaxamento da região ocular."
          },
          {
            pergunta: "O que acontece quando o Qi está estagnado no rosto?",
            opcoes: [
              "Pele radiante e firme",
              "Acne e vermelhidão",
              "Rugas, flacidez e palidez",
              "Inchaço facial"
            ],
            respostaCorreta: 2,
            explicacao: "Qi estagnado resulta em rugas, flacidez e palidez. O objetivo da massagem facial é restaurar o fluxo livre da energia vital."
          }
        ]
      }
    ]
  },
  {
    titulo: "2. Anatomia Facial Energética",
    descricao: "Músculos, nervos e zonas reflexas do rosto",
    icone: "Target",
    cor: "from-violet-50 to-purple-50",
    aulas: [
      {
        titulo: "Músculos Faciais e Suas Funções",
        descricao: "Os 43 músculos do rosto e como trabalhá-los na massagem",
        duracaoMinutos: 16,
        conteudo: `## Anatomia Muscular Facial Aplicada

### Os Músculos da Expressão Facial

O rosto possui 43 músculos que controlam expressões faciais e funções como mastigar e piscar. Para o Yūgen FaceSPA, trabalhamos principalmente com 4 grupos:

### Grupo 1: Músculos da Testa e Sobrancelhas

**Frontal (前頭筋)**
- Função: Elevar sobrancelhas, rugas horizontais da testa
- Massagem: Deslizamento ascendente da sobrancelha à linha do cabelo
- Objetivo: Suavizar linhas da testa, lifting natural

**Corrugador do Supercílio (皺眉筋)**
- Função: Franzir sobrancelhas (linhas "11")
- Massagem: Pinçamento e fricção lateral suave
- Objetivo: Suavizar glabela, relaxar tensão emocional

**Prócero (鼻根筋)**
- Função: Rugas horizontais na raiz do nariz
- Massagem: Deslizamento vertical ascendente
- Objetivo: Alisar rugas do nariz

### Grupo 2: Músculos dos Olhos

**Orbicular do olho (眼輪筋)**
- Porção palpebral: Piscar
- Porção orbital: Apertar os olhos
- Massagem: Movimentos circulares suaves, toque de piano
- Objetivo: Olheiras, bolsas, pés de galinha

### Grupo 3: Músculos da Boca e Bochechas

**Zigomático maior e menor (大・小頬骨筋)**
- Função: Sorriso — eleva os cantos da boca
- Massagem: Deslizamento ascendente da boca à maçã do rosto
- Objetivo: Lifting natural, sulco nasolabial

**Bucinador (頬筋)**
- Função: Comprimir bochechas (sugar, soprar)
- Massagem: Pressão intraoral (técnica avançada)
- Objetivo: Definição facial, contorno

**Orbicular da boca (口輪筋)**
- Função: Fechar lábios, beijo
- Massagem: Pinçamento suave ao redor dos lábios
- Objetivo: Código de barras perioral

### Grupo 4: Músculos da Mandíbula e Pescoço

**Masseter (咬筋)**
- O músculo mais forte do corpo (por área)
- Função: Mastigação, bruxismo
- Massagem: Pressão profunda e circular
- Objetivo: Alívio de tensão, definição mandibular

**Platisma (広頸筋)**
- Função: Tensionar pescoço, envelhecimento
- Massagem: Deslizamento descendente do queixo ao colo
- Objetivo: Pescoço jovem, bandas do platisma

**Esternocleidomastóideo (胸鎖乳突筋)**
- Função: Rotação e inclinação da cabeça
- Massagem: Deslizamento lateral suave
- Objetivo: Relaxamento cervical, drenagem linfática

### Mapa de Tensão Facial

As áreas de maior acúmulo de tensão emocional:

- **Testa**: Preocupação e ansiedade
- **Glabela**: Raiva e frustração
- **Mandíbula**: Estresse e controle
- **Lábios**: Repressão emocional
- **Pescoço**: Sobrecarga e rigidez

> Cada emoção não expressa se transforma em tensão muscular que, ao longo dos anos, gera rugas e envelhecimento precoce. A massagem facial libera tanto a tensão física quanto a emocional.`,
        quiz: [
          {
            pergunta: "Qual é o músculo mais forte do corpo (por área)?",
            opcoes: [
              "Frontal",
              "Masseter",
              "Platisma",
              "Bucinador"
            ],
            respostaCorreta: 1,
            explicacao: "O Masseter (咬筋) é considerado o músculo mais forte do corpo por área, sendo responsável pela mastigação e muito relacionado ao bruxismo e tensão mandibular."
          }
        ],
        checklist: [
          "Identificar os 4 grupos musculares faciais",
          "Localizar o frontal e corrugador (testa)",
          "Localizar o orbicular do olho",
          "Localizar zigomáticos e bucinador (bochecha)",
          "Localizar masseter e platisma (mandíbula/pescoço)",
          "Compreender o mapa de tensão emocional"
        ]
      },
      {
        titulo: "Zonas Reflexas e Diagnóstico Facial",
        descricao: "O que o rosto revela sobre a saúde interna do corpo",
        duracaoMinutos: 14,
        conteudo: `## Diagnóstico Facial Oriental — 望診 (Bōshin)

### O Rosto como Mapa do Corpo

Na Medicina Oriental, cada zona do rosto corresponde a um órgão interno. Alterações na pele de determinada área podem indicar desequilíbrios no órgão correspondente.

### Mapa de Reflexologia Facial

**Testa (額)**
- Órgão: Intestino delgado, bexiga
- Sinais: Acne → problemas digestivos
- Linhas horizontais → preocupação crônica

**Entre as sobrancelhas (眉間)**
- Órgão: Fígado
- Sinais: Linhas verticais → raiva reprimida, excesso de álcool/gordura
- Vermelhidão → sobrecarga hepática

**Sob os olhos (目の下)**
- Órgão: Rins, glândulas suprarrenais
- Sinais: Olheiras escuras → fadiga renal, desidratação
- Bolsas → retenção de líquidos, excesso de sal

**Nariz (鼻)**
- Órgão: Coração
- Sinais: Vermelhidão → pressão alta, circulação
- Cravos → congestão cardiovascular

**Bochechas (頬)**
- Órgão: Pulmões (bochecha direita), estômago (bochecha esquerda)
- Sinais: Acne → alergias respiratórias, sensibilidade alimentar
- Rosácea → inflamação pulmonar/gástrica

**Lábios e ao redor (唇)**
- Órgão: Estômago, intestinos
- Sinais: Lábios secos → desidratação, deficiência de B12
- Acne perioral → desequilíbrio hormonal/digestivo

**Queixo (顎)**
- Órgão: Sistema reprodutivo, hormonal
- Sinais: Acne cística → desequilíbrio hormonal
- Pelos excessivos → excesso de andrógenos

**Mandíbula (顎ライン)**
- Órgão: Intestino grosso
- Sinais: Acne ao longo da mandíbula → toxinas, constipação

### Como Usar o Diagnóstico no Atendimento

1. Observe o rosto da cliente por 30-60 segundos antes de tocar
2. Identifique áreas de alteração (cor, textura, volume)
3. Pergunte sobre hábitos alimentares e emocionais
4. Adapte o protocolo focando nas zonas desequilibradas
5. Oriente sobre cuidados complementares (dieta, hidratação)

### Ficha de Avaliação Facial Yūgen

- [ ] Cor da pele (pálida, amarelada, avermelhada, acinzentada)
- [ ] Textura (lisa, áspera, porosa, irregular)
- [ ] Hidratação (boa, desidratada, oleosa, mista)
- [ ] Linhas de expressão (localização e profundidade)
- [ ] Manchas ou pigmentação
- [ ] Acne ou inflamação (localização por zona)
- [ ] Assimetrias faciais
- [ ] Tensão muscular palpável
- [ ] Estado emocional da cliente

> "O rosto nunca mente. Ele é o espelho da saúde interna e do estado emocional." — Princípio do diagnóstico facial oriental`,
        checklist: [
          "Estudar o mapa de reflexologia facial",
          "Praticar observação facial em 60 segundos",
          "Correlacionar zonas com órgãos internos",
          "Aprender a preencher ficha de avaliação",
          "Praticar diagnóstico em 3 pessoas diferentes",
          "Anotar padrões observados"
        ],
        quiz: [
          {
            pergunta: "O que a zona da testa revela na reflexologia facial oriental?",
            opcoes: [
              "Desequilíbrio hepático",
              "Problemas no intestino delgado e bexiga",
              "Desequilíbrio hormonal",
              "Problemas renais"
            ],
            respostaCorreta: 1,
            explicacao: "Na reflexologia facial oriental, a testa corresponde ao intestino delgado e bexiga. Acne nessa zona pode indicar problemas digestivos."
          }
        ]
      }
    ]
  },
  {
    titulo: "3. Ferramentas e Produtos",
    descricao: "Equipamentos, óleos e produtos para potencializar o ritual",
    icone: "Heart",
    cor: "from-amber-50 to-orange-50",
    aulas: [
      {
        titulo: "Ferramentas do Yūgen FaceSPA",
        descricao: "Gua Sha, rolos, pedras quentes e acessórios profissionais",
        duracaoMinutos: 12,
        conteudo: `## Kit Profissional Yūgen FaceSPA

### Ferramentas Essenciais

A técnica Yūgen é 100% manual, mas ferramentas complementares podem potencializar os resultados:

**1. Gua Sha de Jade (翡翠かっさ)**
- Material: Jade nefrita genuína (não vidro!)
- Temperatura: Pode ser resfriada para efeito descongestionante
- Técnica: Deslizamento unidirecional a 45° da pele
- Pressão: Suave a média (2-3/5)
- Benefícios: Drenagem linfática, esculpimento facial
- 🛒 [Amazon](https://www.amazon.com.br/s?k=gua+sha+jade+facial)
- 🛒 [Shopee](https://shopee.com.br/search?keyword=gua%20sha%20jade)

**2. Gua Sha de Quartzo Rosa (ローズクォーツかっさ)**
- Material: Quartzo rosa natural
- Propriedade: Pedra do amor — energia calmante
- Ideal para: Peles sensíveis, rosácea
- 🛒 [Amazon](https://www.amazon.com.br/s?k=gua+sha+quartzo+rosa)

**3. Rolo Facial de Jade (翡翠ローラー)**
- Uso: Após aplicação de sérum, para penetração de ativos
- Técnica: Rolamento ascendente, nunca descendente
- Tamanho duplo: Grande (bochechas) + pequeno (olhos)
- 🛒 [Amazon](https://www.amazon.com.br/s?k=rolo+facial+jade)

**4. Cogumelos de Porcelana / Cerâmica**
- Uso: Massagem por pressão em pontos específicos (tsubos)
- Temperatura: Aquecido para relaxamento ou frio para lifting
- 🛒 [Amazon](https://www.amazon.com.br/s?k=mushroom+facial+massage+tool)

**5. Pedras Quentes Basálticas (Miniaturas Faciais)**
- Uso: Termoterapia facial para relaxamento profundo
- Temperatura ideal: 45-50°C
- Posicionar em: Têmporas, mandíbula, terceiro olho
- 🛒 [Amazon](https://www.amazon.com.br/s?k=pedras+quentes+facial+basalto)

**6. Ventosas Faciais de Silicone**
- Uso: Lifting, estímulo de colágeno
- Tamanho: P (olhos), M (bochechas), G (testa)
- Técnica: Sucção suave + deslizamento
- 🛒 [Amazon](https://www.amazon.com.br/s?k=ventosa+facial+silicone)

### Acessórios de Ambiente

- **Toalhas de bambu**: Maciez superior, antibacterianas
- **Faixa facial**: Para afastar cabelos durante o ritual
- **Difusor de aromas**: Óleos essenciais terapêuticos
- **Luz de led cromática**: Muda a cor a cada etapa do ritual
- **Som ambiente**: Playlist de ASMR, sons da natureza ou música zen japonesa

### Investimento Inicial

| Item | Investimento |
| Gua Sha de Jade | R$ 30-80 |
| Rolo de Jade | R$ 40-90 |
| Pedras quentes (kit) | R$ 60-150 |
| Ventosas faciais (kit) | R$ 25-60 |
| Cogumelo cerâmica | R$ 40-80 |
| Toalhas e acessórios | R$ 80-150 |
| **Total kit inicial** | **R$ 275-610** |

> O Yūgen FaceSPA tem um dos menores custos de implantação do mercado de estética. Suas mãos são a principal ferramenta!`,
        checklist: [
          "Adquirir Gua Sha de Jade genuína",
          "Adquirir Rolo de Jade duplo",
          "Montar kit de pedras quentes faciais",
          "Adquirir ventosas faciais (P, M, G)",
          "Preparar ambiente (aromas, luz, som)",
          "Separar toalhas específicas para facial",
          "Testar temperatura dos instrumentos"
        ]
      },
      {
        titulo: "Óleos e Produtos para o Ritual",
        descricao: "Óleos vegetais, essenciais e cosméticos para cada etapa",
        duracaoMinutos: 14,
        conteudo: `## Produtos Profissionais para Yūgen FaceSPA

### Óleos Vegetais de Deslizamento

O óleo é essencial para permitir o deslizamento das mãos e ferramentas. Escolha conforme o tipo de pele:

**Óleo de Camélia (椿油 — Tsubaki)**
- O óleo japonês por excelência
- Rico em ácido oleico (85%) — nutrição intensa
- Pele seca a normal
- Absorção média, toque sedoso
- 🛒 [Amazon](https://www.amazon.com.br/s?k=oleo+camelia+tsubaki+facial)

**Óleo de Jojoba (ホホバオイル)**
- Similar ao sebo natural da pele
- Todos os tipos de pele, inclusive oleosa
- Não comedogênico
- 🛒 [Amazon](https://www.amazon.com.br/s?k=oleo+jojoba+facial)

**Óleo de Rosa Mosqueta (ローズヒップオイル)**
- Rico em vitamina A e C
- Cicatrizante e clareador
- Ideal para: manchas, cicatrizes, anti-aging
- 🛒 [Amazon](https://www.amazon.com.br/s?k=oleo+rosa+mosqueta+facial)

**Óleo de Squalane (スクワランオイル)**
- Derivado da oliveira ou cana-de-açúcar
- Ultra-leve, absorção instantânea
- Todos os tipos de pele
- 🛒 [Amazon](https://www.amazon.com.br/s?k=squalane+oil+facial)

### Óleos Essenciais para Aromaterapia Facial

**Lavanda (ラベンダー)**
- Calmante, anti-inflamatório, cicatrizante
- Ideal para encerrar o ritual
- 1-2 gotas diluídas no óleo vegetal

**Gerânio Rosa (ゼラニウム)**
- Equilíbrio hormonal, tonificante da pele
- Antienvelhecimento natural
- Aroma floral delicado

**Incenso / Olíbano (乳香)**
- Regeneração celular, anti-aging premium
- O "ouro dos óleos essenciais"
- Ideal para peles maduras

**Ylang-Ylang (イランイラン)**
- Regulação sebácea, hidratação
- Aroma sensual e relaxante
- Ideal para peles mistas

**Tea Tree (ティーツリー)**
- Antibacteriano, anti-acne
- Usar apenas em peles com acne ativa
- Nunca puro — sempre diluído 1%

### Cosméticos Complementares

**Para Limpeza:**
- Gel de limpeza enzimática suave
- Água micelar ou tônico sem álcool
- Esfoliante suave com ácidos (AHA 5-8%)

**Para Tratamento:**
- Sérum de Vitamina C (10-15%)
- Sérum de Ácido Hialurônico
- Ampola de Peptídeos
- Máscara de Centella Asiatica

**Para Finalização:**
- Protetor solar FPS 50+ (se atendimento diurno)
- Hidratante com ceramidas
- Bruma facial fixadora

### Marcas Recomendadas

**Japonesas/Coreanas:**
- **Hada Labo**: Ácido hialurônico de referência
- **COSRX**: Centella, Snail Mucin, Niacinamida
- **Melano CC**: Vitamina C de alta performance
- **Shiseido**: Linha profissional premium

**Brasileiras de qualidade:**
- **Bioart**: Cosméticos naturais certificados
- **Simple Organic**: Vegana e clean beauty
- **Laszlo**: Óleos essenciais puros
- **Phytoterápica**: Óleos essenciais com laudo

> Regra de ouro: menos é mais. No Yūgen FaceSPA, a técnica manual é a protagonista — os produtos são coadjuvantes de apoio.`,
        quiz: [
          {
            pergunta: "Qual óleo vegetal é considerado o 'óleo japonês por excelência' para massagem facial?",
            opcoes: [
              "Óleo de Jojoba",
              "Óleo de Rosa Mosqueta",
              "Óleo de Camélia (Tsubaki)",
              "Óleo de Squalane"
            ],
            respostaCorreta: 2,
            explicacao: "O Óleo de Camélia (椿油 — Tsubaki) é o óleo japonês por excelência, com 85% de ácido oleico, proporcionando nutrição intensa com toque sedoso."
          }
        ]
      }
    ]
  },
  {
    titulo: "4. Massagem Facial Japonesa (Kobido)",
    descricao: "Protocolo completo da técnica ancestral de massagem facial",
    icone: "Lightbulb",
    cor: "from-emerald-50 to-teal-50",
    aulas: [
      {
        titulo: "Preparação e Limpeza Facial",
        descricao: "Protocolo de preparo da pele antes da massagem",
        duracaoMinutos: 10,
        conteudo: `## Protocolo de Preparação — Pré-Massagem

### Duração: 10-15 minutos

### Preparação do Ambiente

- Temperatura: 22-24°C
- Iluminação: Luz indireta e quente (2700K)
- Aroma: Difusor com blend de lavanda + cedro
- Som: Playlist zen ou ASMR suave
- Maca reclinada a 45° (avaliação) depois 0° (massagem)

### Higienização das Mãos

1. Lavar com sabão neutro por 40 segundos
2. Secar completamente
3. Aplicar álcool 70% — esperar evaporar
4. Aquecer as mãos esfregando palma contra palma (30 seg)

### Protocolo de Limpeza Facial

**Passo 1: Remoção de Maquiagem (se houver)**
- Água micelar com algodão
- Movimentos suaves, sem esfregar
- Região dos olhos: pressionar suavemente 5 seg

**Passo 2: Limpeza Profunda**
- Gel ou mousse de limpeza enzimática
- Aplicar com movimentos circulares ascendentes
- Tempo: 60 segundos
- Enxaguar com água morna (não quente!)

**Passo 3: Tonificação**
- Tônico sem álcool ou água termal
- Aplicar com leves batidas (tapping)
- Prepara o pH da pele

**Passo 4: Pré-sérum (opcional)**
- Sérum aquoso (ácido hialurônico)
- Aumenta o deslizamento
- Potencializa absorção de ativos posteriores

**Passo 5: Óleo de Deslizamento**
- Aplicar o óleo escolhido em quantidade adequada
- Espalhar uniformemente: testa, bochechas, queixo, pescoço
- Quantidade: 4-6 gotas para rosto + pescoço

### Posicionamento da Cliente

- Deitada em decúbito dorsal (barriga para cima)
- Cabelos presos com faixa facial
- Ombros cobertos com toalha
- Olhos fechados (oferecer máscara de olhos)
- Verificar se está confortável antes de iniciar

> O ritual começa antes da primeira técnica. A preparação é um momento de transição que convida a cliente a desacelerar e se entregar ao tratamento.`,
        checklist: [
          "Preparar ambiente (temperatura, luz, aroma, som)",
          "Higienizar as mãos corretamente",
          "Remover maquiagem completamente",
          "Limpar a pele com gel enzimático",
          "Aplicar tônico sem álcool",
          "Aplicar óleo de deslizamento",
          "Posicionar cliente confortavelmente",
          "Verificar alergias antes de iniciar"
        ],
        quiz: [
          {
            pergunta: "Qual é o último passo antes de iniciar a massagem facial?",
            opcoes: [
              "Aplicar protetor solar",
              "Fazer avaliação facial",
              "Aplicar óleo de deslizamento",
              "Aquecer as pedras"
            ],
            respostaCorreta: 2,
            explicacao: "O óleo de deslizamento é o último passo da preparação, aplicado após a limpeza e tonificação, permitindo o deslizamento correto das mãos e ferramentas."
          }
        ]
      },
      {
        titulo: "Protocolo Kobido Completo",
        descricao: "Passo a passo das técnicas de massagem facial japonesa",
        duracaoMinutos: 25,
        conteudo: `## Protocolo de Massagem Kobido — 古美道

### Duração: 30-45 minutos (coração do ritual)

O Kobido utiliza mais de 47 técnicas diferentes. Aqui, apresentamos as 8 técnicas fundamentais em sequência:

### Técnica 1: Effleurage de Abertura (撫でる — Naderu)
- Deslizamentos longos e suaves do centro para as laterais
- Testa → têmporas
- Nariz → bochechas
- Queixo → orelhas
- Pescoço → clavícula
- Pressão: 1-2/5 — toque leve, envolvente
- Duração: 3 minutos
- Objetivo: Estabelecer conexão, aquecer tecidos

### Técnica 2: Amassamento Muscular (揉む — Momu)
- Movimentos de pinça e rolamento dos músculos
- Foco: Masseter, zigomáticos, frontal
- Pressão: 3-4/5 — firme mas confortável
- Levantar levemente o músculo entre polegar e indicador
- Duração: 5 minutos
- Objetivo: Liberação de tensão, tonificação

### Técnica 3: Percussão Digital (叩く — Tataku)
- Batidas rápidas e leves com ponta dos dedos
- Como "chuva suave" sobre o rosto
- Velocidade: 3-4 batidas por segundo
- Cobrir todo o rosto sistematicamente
- Duração: 3 minutos
- Objetivo: Ativação nervosa, efeito ASMR, circulação

### Técnica 4: Acupressão nos Tsubos (指圧 — Shiatsu)
- Pressão sustentada por 5-8 segundos em cada ponto
- Sequência: Yintang → Taiyo → Sibai → Yingxiang → Dicang → Jiache
- Pressão: 3/5 — firme e constante
- 3 ciclos completos
- Duração: 5 minutos
- Objetivo: Equilíbrio energético, desbloqueio de meridianos

### Técnica 5: Lifting Manual (引き上げ — Hikiage)
- Movimentos ascendentes firmes contra a gravidade
- Do queixo às orelhas — linha mandibular
- Da boca às têmporas — terço médio
- Das sobrancelhas à linha do cabelo — testa
- Pressão: 3-4/5
- Duração: 5 minutos
- Objetivo: Lifting imediato, combate à flacidez

### Técnica 6: Drenagem Linfática Facial (リンパドレナージュ)
- Movimentos suaves em direção aos linfonodos
- Linfonodos alvo: Pré-auriculares → submandibulares → cervicais
- Pressão: 1-2/5 — extremamente suave
- Ritmo lento e constante
- Duração: 5 minutos
- Objetivo: Redução de inchaço, eliminação de toxinas

### Técnica 7: Esculpimento com Knuckles (拳 — Kobushi)
- Usar as articulações dos dedos dobrados
- Deslizar pela mandíbula, maçã do rosto e arco zigomático
- Pressão: 3/5
- Movimentos ascendentes e laterais
- Duração: 3 minutos
- Objetivo: Definição de contorno, esculpimento facial

### Técnica 8: Effleurage de Encerramento (仕上げ — Shiage)
- Deslizamentos ultrasuaves como despedida
- Das laterais para o centro e do centro para baixo (pescoço)
- Pressão: 1/5 — quase sem tocar
- Incluir decolté e ombros
- Duração: 3 minutos
- Objetivo: Integração, relaxamento final, fechamento do ritual

### Sequência Visual Resumida

1. 🌊 Effleurage de abertura (3 min)
2. 💪 Amassamento muscular (5 min)
3. 🌧️ Percussão digital (3 min)
4. ⚡ Acupressão nos tsubos (5 min)
5. ⬆️ Lifting manual (5 min)
6. 💧 Drenagem linfática (5 min)
7. 💎 Esculpimento com knuckles (3 min)
8. 🕊️ Effleurage de encerramento (3 min)

### Cuidados Importantes

- ❌ Nunca massagear sobre acne inflamada ou herpes ativa
- ❌ Não aplicar pressão excessiva em pele com rosácea
- ❌ Evitar olhos diretamente (trabalhar ao redor)
- ✅ Sempre perguntar sobre pressão: "Está confortável?"
- ✅ Manter ritmo constante e respiração sincronizada
- ✅ Reaplicar óleo se necessário (pele nunca deve repuxar)`,
        quiz: [
          {
            pergunta: "Qual técnica do Kobido é responsável pelo efeito ASMR?",
            opcoes: [
              "Effleurage (Naderu)",
              "Amassamento (Momu)",
              "Percussão digital (Tataku)",
              "Acupressão (Shiatsu)"
            ],
            respostaCorreta: 2,
            explicacao: "A Percussão Digital (叩く — Tataku) com batidas rápidas e leves como 'chuva suave' sobre o rosto é a técnica que gera o efeito ASMR tão característico do Kobido."
          },
          {
            pergunta: "Qual a pressão ideal para a drenagem linfática facial?",
            opcoes: [
              "1-2/5 — extremamente suave",
              "3/5 — média",
              "4/5 — firme",
              "5/5 — máxima"
            ],
            respostaCorreta: 0,
            explicacao: "A drenagem linfática facial requer pressão extremamente suave (1-2/5) porque os vasos linfáticos são superficiais e delicados. Pressão excessiva os comprime e impede o fluxo."
          }
        ],
        checklist: [
          "Praticar Effleurage de abertura",
          "Dominar Amassamento muscular (masseter, zigomáticos)",
          "Praticar Percussão digital (ritmo constante)",
          "Memorizar sequência dos 6 tsubos",
          "Executar Lifting manual nos 3 terços",
          "Praticar Drenagem linfática (pressão suave!)",
          "Treinar Esculpimento com knuckles",
          "Praticar Effleurage de encerramento",
          "Cronometrar protocolo completo (30-45 min)"
        ]
      },
      {
        titulo: "Contraindicações e Cuidados Especiais",
        descricao: "Quando não realizar e adaptações necessárias",
        duracaoMinutos: 8,
        conteudo: `## Contraindicações e Precauções

### Contraindicações Absolutas (NÃO realizar)

- ❌ Infecções ativas na pele (herpes, impetigo, micoses)
- ❌ Feridas abertas, cortes ou queimaduras recentes
- ❌ Pós-operatório facial recente (menos de 3 meses)
- ❌ Câncer de pele ou lesões suspeitas não diagnosticadas
- ❌ Neuralgia do trigêmeo em crise
- ❌ Trombose ou flebite facial ativa
- ❌ Febre ou infecção sistêmica
- ❌ Preenchimento ou botox recente (menos de 14 dias)

### Contraindicações Relativas (Adaptar protocolo)

- ⚠️ Rosácea: Reduzir pressão (1-2/5), evitar aquecimento
- ⚠️ Acne ativa leve: Evitar áreas inflamadas, focar em áreas limpas
- ⚠️ Gestantes: Evitar pontos de acupressão contraindicados
- ⚠️ Implantes faciais: Adaptar pressão na região
- ⚠️ Pele muito sensível: Usar óleo calmante, pressão mínima
- ⚠️ Hipertensão: Evitar técnicas estimulantes, focar em relaxamento
- ⚠️ Uso de retinóides: Pele mais frágil, reduzir fricção

### Protocolo de Anamnese Pré-Atendimento

Sempre perguntar antes do primeiro atendimento:

1. Tem alguma condição de pele diagnosticada?
2. Fez algum procedimento estético recente?
3. Usa algum medicamento de uso tópico?
4. Tem alergia a algum produto ou fragrância?
5. Está grávida ou amamentando?
6. Tem histórico de herpes labial?
7. Sente dor ou sensibilidade em alguma região do rosto?

### Cuidados Durante o Atendimento

- Observar a pele constantemente (vermelhidão excessiva = parar)
- Comunicar cada etapa antes de executar
- Perguntar sobre pressão a cada mudança de técnica
- Manter unhas curtas e lisas (SEMPRE)
- Remover anéis e pulseiras antes de iniciar
- Higienizar ferramentas entre cada cliente

### Cuidados Pós-Atendimento

- Orientar: Evitar exposição solar por 24h
- Aplicar protetor solar FPS 50+
- Não aplicar maquiagem pesada por 4-6h
- Beber bastante água (1,5-2L nas próximas 24h)
- Evitar exercícios intensos por 12h

> Sua responsabilidade como profissional é sempre a segurança da cliente. Na dúvida, não realize o procedimento e encaminhe para avaliação médica.`,
        quiz: [
          {
            pergunta: "Quanto tempo após preenchimento facial ou botox pode-se realizar o Yūgen FaceSPA?",
            opcoes: [
              "3 dias",
              "7 dias",
              "14 dias",
              "30 dias"
            ],
            respostaCorreta: 2,
            explicacao: "É necessário aguardar no mínimo 14 dias após preenchimento ou botox antes de realizar massagem facial, para que o produto se estabilize."
          }
        ],
        checklist: [
          "Conhecer as 8 contraindicações absolutas",
          "Saber adaptar para rosácea e pele sensível",
          "Realizar anamnese completa antes do 1º atendimento",
          "Verificar uso de retinóides e medicações tópicas",
          "Orientar cuidados pós-atendimento ao cliente"
        ]
      }
    ]
  },
  {
    titulo: "5. Técnica Yūgen Japan Exclusiva",
    descricao: "O protocolo exclusivo que combina todas as técnicas",
    icone: "BarChart3",
    cor: "from-sky-50 to-blue-50",
    aulas: [
      {
        titulo: "Protocolo Yūgen Completo",
        descricao: "A sequência exclusiva que integra todas as técnicas orientais",
        duracaoMinutos: 20,
        conteudo: `## Protocolo Yūgen FaceSPA Completo

### Duração Total: 60-90 minutos

O protocolo Yūgen é a síntese de todas as técnicas aprendidas, organizada em 7 fases:

### Fase 1: Recepção e Diagnóstico (10 min)

**Ritual de Acolhimento**
- Servir chá verde ou água aromatizada
- Conversa breve sobre expectativas
- Anamnese (primeiro atendimento) ou revisão (retorno)
- Observação facial (Bōshin) por 60 segundos
- Definir foco do tratamento

### Fase 2: Purificação (10 min)

**Limpeza Ritualística**
- Remoção de maquiagem com água micelar
- Limpeza com gel enzimático
- Esfoliação suave (AHA 5%) — 1x a cada 2 sessões
- Tonificação com hidrolato (lavanda ou rosas)
- Vaporização por 3-5 min (opcional)

### Fase 3: Kobido — Massagem Profunda (25-35 min)

**Sequência Completa**
1. Effleurage de abertura (3 min)
2. Amassamento muscular profundo (5 min)
3. Percussão digital / tapping (3 min)
4. Acupressura nos 8 tsubos — 3 ciclos (5 min)
5. Lifting manual nos 3 terços (5 min)
6. Esculpimento com knuckles (3 min)
7. Drenagem linfática facial + cervical (5 min)
8. Effleurage de transição (2 min)

### Fase 4: Ferramentas (10 min)

**Gua Sha ou Rolo de Jade**
- Aplicar sobre sérum/óleo fresco
- Gua Sha: Deslizamento unidirecional a 45°
- Sequência: Pescoço → mandíbula → bochechas → testa
- Finalizar com rolamento nos olhos (rolo pequeno)

**Pedras Quentes (opcional premium)**
- Posicionar nos pontos: Têmporas, mandíbula, testa
- Manter por 3-5 min enquanto massageia outros pontos
- Retirar e fazer compressas alternadas (quente/frio)

### Fase 5: Nutrição (10 min)

**Tratamento com Ativos**
- Sérum personalizado (conforme diagnóstico)
- Máscara facial (sheet mask ou cremosa)
- Tempo de pausa: 10 min com compressas mornas
- Massagem suave sobre a máscara (dedos leves)

### Fase 6: Yūgen Touch — Técnica Exclusiva (5 min)

**O Diferencial**
Sequência exclusiva de toques ultraleves que combina:
- Toque no ponto Yintang (terceiro olho) por 10 seg
- Deslizamento craniano bilateral com dedos entrelaçados
- Pressão sincronizada com respiração da cliente
- "Rain drops" — gotas de pressão da testa à nuca
- Tração suave dos cabelos na região frontal
- Finalizar com as mãos sobre os olhos por 10 seg (calor)

> Este é o momento mágico do ritual — onde a cliente atinge o relaxamento mais profundo. Silêncio absoluto.

### Fase 7: Finalização e Orientação (5-10 min)

**Encerramento**
- Remover máscara com toalha morna
- Aplicar hidratante + protetor solar
- Oferecer espelho para a cliente ver o resultado
- Registrar fotos before/after
- Entregar cartão com recomendações de home care
- Agendar próxima sessão (ideal: quinzenal)

### Adaptações por Foco

**Foco Anti-Age**: + tempo na fase 3 (lifting + acupressão)
**Foco Detox**: + tempo na fase 6 (drenagem) + compressas
**Foco Relaxamento**: + tempo na fase 6 (Yūgen Touch) + aromaterapia
**Foco Contorno**: + Gua Sha + esculpimento com knuckles`,
        checklist: [
          "Memorizar as 7 fases na sequência",
          "Praticar cada fase isoladamente",
          "Cronometrar o protocolo completo",
          "Treinar transições suaves entre fases",
          "Praticar a Yūgen Touch (silêncio total)",
          "Preparar kit de before/after",
          "Montar cartão de home care",
          "Praticar o protocolo em 3 modelos"
        ]
      },
      {
        titulo: "Protocolos Personalizados por Tipo de Pele",
        descricao: "Adaptações para cada biotipo e necessidade da cliente",
        duracaoMinutos: 12,
        conteudo: `## Personalização por Biotipo e Necessidade

### Protocolo Pele Seca (乾燥肌)

**Ajustes:**
- Óleo: Camélia (Tsubaki) — máxima nutrição
- OE: Lavanda + Gerânio Rosa
- Pressão: 2-3/5 — média, sem agredir
- Foco extra: Fase 5 (nutrição) — máscara cremosa rica
- Ferramentas: Pedras quentes (nunca frias)
- Home care: Hidratante com ceramidas + óleo facial noturno

### Protocolo Pele Oleosa (脂性肌)

**Ajustes:**
- Óleo: Jojoba ou Squalane — leves, não comedogênicos
- OE: Tea Tree + Ylang-Ylang
- Pressão: 3/5 — firme para estimular
- Foco extra: Fase 2 (purificação) + drenagem linfática
- Ferramentas: Gua Sha resfriado + ventosas (poros)
- Home care: Gel hidratante oil-free + niacinamida

### Protocolo Anti-Aging (エイジングケア)

**Ajustes:**
- Óleo: Rosa Mosqueta + Camélia
- OE: Incenso + Gerânio Rosa
- Pressão: 3-4/5 — firme para lifting
- Foco extra: Fase 3 (Kobido lifting) + Fase 4 (Gua Sha)
- Ferramentas: Gua Sha + Ventosas (estímulo colágeno)
- Home care: Retinol noturno + vitamina C diurna + FPS 50

### Protocolo Pele Sensível / Rosácea (敏感肌)

**Ajustes:**
- Óleo: Squalane puro — hipoalergênico
- OE: Camomila Romana (apenas) — ou nenhum
- Pressão: 1-2/5 — ultra suave
- Foco extra: Fase 6 (Yūgen Touch) — toque mínimo
- Ferramentas: Quartzo rosa resfriado (efeito calmante)
- Home care: Centella Asiatica + hidratante barrier repair
- ❌ Evitar: Esfoliação, percussão, ventosas

### Protocolo Pós-Cirúrgico (após liberação médica)

**Ajustes:**
- Apenas após 3+ meses da cirurgia COM liberação médica
- Pressão: 1-2/5 — extremamente delicada
- Foco: Drenagem linfática (redução de edema)
- Sem ferramentas de pressão
- Sessões mais curtas (30-40 min)

### Protocolo Express (30 min)

Para clientes com pouco tempo ou sessão de manutenção:
1. Limpeza rápida (3 min)
2. Kobido simplificado — 4 técnicas (15 min)
3. Gua Sha rápido (5 min)
4. Sérum + hidratante + FPS (5 min)
5. Orientações rápidas (2 min)

> Nunca aplique o mesmo protocolo para todas as clientes. A personalização é o que transforma uma massagem boa em uma experiência extraordinária.`,
        quiz: [
          {
            pergunta: "Qual óleo é recomendado para pele com rosácea no Yūgen FaceSPA?",
            opcoes: [
              "Óleo de Camélia",
              "Óleo de Rosa Mosqueta",
              "Squalane puro",
              "Óleo de Tea Tree"
            ],
            respostaCorreta: 2,
            explicacao: "Para pele sensível e com rosácea, o Squalane puro é o óleo ideal por ser hipoalergênico, ultra-leve e não causar irritação. A pressão deve ser mínima (1-2/5)."
          }
        ]
      }
    ]
  },
  {
    titulo: "6. Negócios e Marketing",
    descricao: "Precificação, vendas, marketing digital e fidelização",
    icone: "GraduationCap",
    cor: "from-indigo-50 to-blue-50",
    aulas: [
      {
        titulo: "Precificação e Pacotes",
        descricao: "Como definir preços e criar pacotes rentáveis",
        duracaoMinutos: 12,
        conteudo: `## Estratégia de Preços para Yūgen FaceSPA

### Posicionamento Premium

O Yūgen FaceSPA é um serviço de alto valor agregado. Não concorra por preço — concorra por experiência e exclusividade.

### Cálculo de Custo por Atendimento

| Item | Custo estimado |
| Produtos (óleo, sérum, máscara) | R$ 15-25 |
| Lavagem/descarte (toalhas, algodão) | R$ 5-10 |
| Energia e ambiente | R$ 5-8 |
| Depreciação de ferramentas | R$ 2-5 |
| **Custo total por sessão** | **R$ 27-48** |

### Estrutura de Preços Sugerida

**Sessão Avulsa:**
- Yūgen Express (30 min): R$ 150-200
- Yūgen Essential (60 min): R$ 280-380
- Yūgen Premium (90 min): R$ 400-550
- Yūgen Luxury (120 min com extras): R$ 600-800

**Pacotes com Desconto Progressivo:**
- 3 sessões: 10% desconto
- 6 sessões: 15% desconto
- 12 sessões: 20% desconto
- Mensal (4 sessões/mês): 25% desconto

### Serviços Adicionais (Upsell)

- Gua Sha premium com pedras semipreciosas: +R$ 50
- Aromaterapia personalizada: +R$ 30
- Máscara de ouro/colágeno: +R$ 60
- Massagem de mãos e braços: +R$ 40
- Kit home care personalizado: R$ 80-150

### Meta de Faturamento

**Cenário conservador (4 atendimentos/dia, 5 dias/semana):**
- 20 sessões/semana × R$ 300 (média) = R$ 6.000/semana
- R$ 24.000/mês bruto
- Custo: ~R$ 1.600/mês
- **Lucro: ~R$ 22.400/mês**

**Cenário otimista (6 atendimentos/dia):**
- 30 sessões/semana × R$ 350 = R$ 10.500/semana
- **R$ 42.000/mês bruto**

### Dicas de Precificação

- Nunca justifique seu preço — apresente o valor
- Use preços terminados em 0 (R$ 300, não R$ 297)
- Crie nomes japoneses para os pacotes (ex: "Pacote Sakura 🌸", "Pacote Koi 🐟")
- Ofereça a primeira sessão com desconto para conquistar
- Depois, fidelize com pacotes e recorrência`,
        quiz: [
          {
            pergunta: "Qual é o custo estimado por sessão de Yūgen FaceSPA?",
            opcoes: [
              "R$ 5-10",
              "R$ 27-48",
              "R$ 100-150",
              "R$ 200-300"
            ],
            respostaCorreta: 1,
            explicacao: "O custo por sessão do Yūgen FaceSPA é de apenas R$ 27-48 (produtos, descartáveis, energia e depreciação), o que representa uma margem de lucro excelente comparada ao ticket médio de R$ 280-380."
          }
        ]
      },
      {
        titulo: "Marketing Digital e Redes Sociais",
        descricao: "Instagram, TikTok, ASMR e estratégias de captação de clientes",
        duracaoMinutos: 14,
        conteudo: `## Estratégias de Marketing para Yūgen FaceSPA

### Instagram — Sua Vitrine Digital

**Tipos de conteúdo que convertem:**

1. **Before/After** — O mais poderoso
   - Fotos com mesma luz, ângulo e distância
   - Mostrar resultado imediato (lifting, luminosidade)
   - Caption com técnica usada e duração

2. **ASMR Reels** — Viralização
   - Gravar os sons da massagem (toques, óleo, percussão)
   - Vídeos de 15-30 seg com zoom no rosto
   - Hashtags: #ASMR #FacialMassage #Kobido #FaceSpa
   - Potencial de 100K-1M+ visualizações

3. **Educativo** — Autoridade
   - "Sabia que a mandíbula guarda sua tensão emocional?"
   - "3 pontos de acupressão para aliviar dor de cabeça"
   - Conteúdo de valor que gera salvamentos e compartilhamentos

4. **Bastidores** — Humanização
   - Mostrar preparação do ambiente
   - Suas ferramentas e produtos
   - Seu estudo e dedicação

### TikTok — Alcance Massivo

- Conteúdos de 15-60 seg
- Trends com áudios populares + técnica Yūgen
- POV: "A massagem facial que mudou minha pele"
- Responder perguntas: "Quanto custa?", "Dói?"
- Usar hashtags trending + nicho

### WhatsApp Business — Conversão

- Catálogo com serviços e preços
- Mensagem de boas-vindas automática
- Lista de transmissão para promoções
- Status diário (bastidores, vagas)
- Link direto na bio do Instagram

### Google Meu Negócio — SEO Local

- Cadastrar seu espaço com fotos profissionais
- Solicitar avaliações 5⭐ de cada cliente
- Responder todas as avaliações
- Postar atualizações semanais
- Palavras-chave: "massagem facial japonesa [cidade]"

### Estratégia de Lançamento

**Semana 1-2: Pré-lançamento**
- 5 atendimentos gratuitos para fotos e depoimentos
- Criar portfólio de before/after
- Gravar 10+ Reels/TikToks

**Semana 3: Lançamento**
- Postar conteúdo diariamente
- Oferta de lançamento (20% desconto primeiras 10 clientes)
- Parcerias com influenciadoras locais

**Mês 2+: Crescimento**
- Conteúdo 3-5x por semana
- Programa de indicação (cliente indica = desconto)
- Pacotes de fidelidade
- Eventos de experiência (noites de spa)

### Métricas para Acompanhar

- Seguidores → Meta: +200/mês
- Engajamento → Meta: 3-5%
- Agendamentos via Instagram → Meta: 40% do total
- Avaliações Google → Meta: 4.8+ estrelas
- Taxa de retorno → Meta: 60%+

> O melhor marketing é uma cliente satisfeita que indica você para as amigas. Invista na experiência e o boca-a-boca trabalhará por você.`,
        checklist: [
          "Criar perfil profissional no Instagram",
          "Cadastrar no Google Meu Negócio",
          "Configurar WhatsApp Business",
          "Fazer 5 atendimentos para portfólio",
          "Gravar 10 Reels/TikToks de conteúdo",
          "Definir identidade visual (cores, fontes)",
          "Criar oferta de lançamento",
          "Montar programa de indicação"
        ]
      },
      {
        titulo: "Fidelização e Experiência do Cliente",
        descricao: "Como transformar clientes em embaixadoras da marca",
        duracaoMinutos: 10,
        conteudo: `## A Arte da Fidelização no Yūgen FaceSPA

### O Conceito Omotenashi (おもてなし)

Omotenashi é o conceito japonês de hospitalidade suprema — antecipar as necessidades do hóspede antes mesmo que ele as expresse.

### Jornada da Cliente Yūgen

**1ª Visita: Encantamento**
- Recepção calorosa com chá
- Tour pelo espaço
- Explicação detalhada da técnica
- Fotos before (com autorização)
- Atendimento com atenção total
- Fotos after + comparação
- Kit mini-amostras para casa
- Follow-up em 24h: "Como está sua pele?"

**2ª-3ª Visita: Fidelização**
- Lembrar preferências (óleo, pressão, temperatura)
- Comparar evolução com fotos anteriores
- Sugerir pacote/recorrência
- Presentear com brinde surpresa

**4ª+ Visita: Embaixadora**
- Programa VIP com benefícios exclusivos
- Acesso antecipado a novos tratamentos
- Desconto em indicações
- Convite para eventos exclusivos

### Programa de Fidelidade Sugerido

**Cartão Yūgen 🌸**
- A cada 5 sessões: 1 sessão express grátis
- A cada 10 sessões: upgrade gratuito para sessão premium
- Aniversário: sessão com 30% de desconto
- Indicação confirmada: R$ 50 de desconto para ambas

### Detalhes que Fazem a Diferença

- Chamar a cliente pelo nome (sempre)
- Lembrar detalhes pessoais (filhos, trabalho, viagem)
- Enviar mensagem no aniversário
- Playlist personalizada por cliente (salvar preferências)
- Toalha aquecida no inverno, gelada no verão
- Chá diferente a cada visita
- Cartão escrito à mão de agradecimento na 1ª visita

### Gestão de Reclamações (Quando algo dá errado)

1. Ouça sem interromper
2. Agradeça o feedback
3. Peça desculpas sinceramente
4. Ofereça solução imediata (reembolso ou nova sessão)
5. Faça follow-up para garantir satisfação
6. Implemente melhoria baseada no feedback

> "Uma cliente que reclama e é bem atendida se torna mais fiel do que uma que nunca reclamou." — A reclamação é um presente.`,
        quiz: [
          {
            pergunta: "O que significa o conceito japonês Omotenashi (おもてなし)?",
            opcoes: [
              "Disciplina e rigor",
              "Hospitalidade suprema — antecipar necessidades",
              "Técnica de massagem",
              "Filosofia de preços"
            ],
            respostaCorreta: 1,
            explicacao: "Omotenashi é o conceito japonês de hospitalidade suprema — antecipar as necessidades do hóspede antes mesmo que ele as expresse."
          }
        ],
        checklist: [
          "Implementar ritual de acolhimento (chá + tour)",
          "Criar sistema de registro de preferências por cliente",
          "Montar programa de fidelidade com cartão",
          "Definir protocolo de follow-up em 24h",
          "Preparar kit de mini-amostras para 1ª visita",
          "Criar protocolo de gestão de reclamações"
        ]
      }
    ]
  }
];
