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
  nivel?: "iniciante" | "intermediario" | "avancado";
  aulas: YugenFaceSpaAula[];
}

export const cursoYugenFaceSpaData: YugenFaceSpaModulo[] = [
  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 1 — FUNDAÇÃO & FILOSOFIA ORIENTAL  (12 h · 4 aulas)
  // ═══════════════════════════════════════════════════════════════
  {
    titulo: "1. Fundação & Filosofia Oriental",
    descricao: "Yūgen, Qi, meridianos, tsubos e princípios do rejuvenescimento natural",
    icone: "BookOpen",
    cor: "from-rose-50 to-pink-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "O que é Yūgen FaceSPA",
        descricao: "Definição, 4 pilares, diferenciais e mercado 2025-2026",
        duracaoMinutos: 45,
        conteudo: `# O Ritual Yūgen FaceSPA — 幽玄フェイススパ

## Significado de Yūgen (幽玄)

Conceito estético japonês que descreve a "beleza profunda e misteriosa" — aquela que não se vê na superfície, mas se sente. Na filosofia zen, Yūgen representa a elegância sutil que existe além do visível.

> "Yūgen é sentir o universo onde pensamento e sentimento se fundem, e algo se percebe sem poder ser definido." — Zeami Motokiyo

## Definição Técnica

Técnica que combina reflexologia japonesa com princípios de rejuvenescimento natural, **sem agulhas ou aparelhos**. Integra Kobido, acupressão facial (Shiatsu), drenagem linfática, reflexologia e Gua Sha em um protocolo único.

## Os 4 Pilares

| Pilar | Descrição |
| Reequilíbrio do Qi | Restaurar o fluxo energético facial |
| Estímulo de colágeno | Ativar processos regenerativos naturais |
| Drenagem linfática | Eliminar toxinas acumuladas |
| Toque terapêutico | Abordagem humanizada (Omotenashi) |

## Os 5 Princípios Orientais

- **O corpo sabe se curar** — estimular, não forçar
- **Energia precede a matéria** — Qi equilibrado = pele saudável
- **Suavidade é poder** — toque consciente supera força bruta
- **Conexão mente-corpo** — emoções esculpem o rosto
- **Prevenção é cura** — manutenção é melhor que correção

## Diferenciais

- ❌ Sem agulhas, aparelhos elétricos ou químicos agressivos
- ✅ 100% manual e natural
- ✅ Resultados perceptíveis em 1 sessão
- ✅ Baixo investimento para oferecer o serviço
- ✅ Certificação internacional (Japão)

## Abordagem Oriental vs. Ocidental

| Oriental | Ocidental |
| Beleza de dentro para fora | Beleza de fora para dentro |
| Equilíbrio energético (Qi/Ki) | Correção estética |
| Prevenção e harmonia | Tratamento de sintomas |
| Técnica manual milenar | Aparelhos e injetáveis |
| Resultado gradual e duradouro | Resultado imediato e temporário |

## Mercado da Estética Natural 2025-2026

- Crescimento de 280% na busca por "tratamentos faciais naturais"
- 73% dos consumidores preferem alternativas não invasivas
- Mercado de facial spa projetado em US$ 12 bilhões até 2027
- Técnicas orientais liderando a tendência global de wellness`,
        quiz: [
          {
            pergunta: "O que significa o conceito japonês 'Yūgen' (幽玄)?",
            opcoes: ["Força e poder", "Beleza profunda e misteriosa", "Velocidade e eficiência", "Precisão técnica"],
            respostaCorreta: 1,
            explicacao: "Yūgen (幽玄) descreve a 'beleza profunda e misteriosa' — essência da filosofia zen aplicada à estética."
          },
          {
            pergunta: "Quantos pilares compõem o Yūgen FaceSPA?",
            opcoes: ["3 pilares", "4 pilares", "5 pilares", "6 pilares"],
            respostaCorreta: 1,
            explicacao: "Os 4 pilares são: reequilíbrio do Qi, estímulo de colágeno, drenagem linfática e toque terapêutico."
          }
        ],
        checklist: [
          "Compreender o significado de Yūgen (幽玄)",
          "Memorizar os 4 pilares do Yūgen FaceSPA",
          "Conhecer os 5 princípios orientais",
          "Diferenciar abordagem oriental vs ocidental",
          "Entender o posicionamento premium do serviço"
        ]
      },
      {
        titulo: "Filosofia Oriental & A Criadora",
        descricao: "Qi, história do Kobido ao Gua Sha e a trajetória de Géssica Katayama",
        duracaoMinutos: 40,
        conteudo: `# Filosofia Oriental & Origens

## Qi — Energia Vital (気)

Na Medicina Oriental, Qi (chinês) ou Ki (japonês) é a energia vital que flui pelo corpo através de canais chamados meridianos. A saúde e beleza da pele dependem diretamente do fluxo equilibrado desta energia.

- **Qi estagnado** → Rugas, flacidez, palidez
- **Qi em excesso** → Vermelhidão, acne, inflamação
- **Qi equilibrado** → Pele radiante, firme e saudável

## Linha do Tempo da Massagem Facial Oriental

| Época | Marco |
| Séc. XV (1472) | Kobido (古美道) surge no Japão para a realeza |
| 2.000+ anos | Gua Sha (刮痧) na China — raspagem com pedras |
| Tradição milenar | Thai Facial — acupressão + yoga facial (Tailândia) |
| Tradição oral | Vietnã — amassamento com bambu e cúrcuma |
| Herança Khmer | Camboja — pedras quentes vulcânicas e ervas sagradas |
| 1970s | Shiatsu facial chega ao Ocidente |
| 2000s | Boom do Gua Sha via K-beauty |
| 2024 | Criação do Yūgen FaceSPA |

## A Síntese Yūgen

O Yūgen FaceSPA sintetiza o melhor de cada tradição asiática em um protocolo único e replicável, combinando 47+ técnicas de manipulação facial.

## A Criadora — Géssica Katayama

- Superou acne severa e rosácea com Medicina Oriental
- Formação: Estética + Naturopatia + Medicina Oriental
- Morou no Japão; estudou na Tailândia, Vietnã, Camboja e China
- Mais de R$ 50 mil investidos em cursos na Ásia
- Mais de 5.000 alunas transformaram suas carreiras

> "Uma técnica com raízes na Medicina Oriental que pode revolucionar sua carreira."`,
        quiz: [
          {
            pergunta: "Em que ano surgiu o Kobido no Japão?",
            opcoes: ["200 a.C.", "1472", "1850", "1970"],
            respostaCorreta: 1,
            explicacao: "O Kobido (古美道) surgiu em 1472, originalmente praticado para a realeza e aristocracia japonesa."
          },
          {
            pergunta: "O que acontece quando o Qi está estagnado no rosto?",
            opcoes: ["Pele radiante e firme", "Acne e vermelhidão", "Rugas, flacidez e palidez", "Inchaço facial"],
            respostaCorreta: 2,
            explicacao: "Qi estagnado resulta em rugas, flacidez e palidez. A massagem facial restaura o fluxo livre da energia vital."
          }
        ],
        checklist: [
          "Compreender o conceito de Qi/Ki e seus 3 estados",
          "Conhecer a origem do Kobido (1472, Japão)",
          "Diferenciar as 5 tradições orientais de massagem facial",
          "Conhecer a trajetória da criadora Géssica Katayama"
        ]
      },
      {
        titulo: "Meridianos e Tsubos Faciais",
        descricao: "8 meridianos do rosto e os principais pontos de acupressão",
        duracaoMinutos: 50,
        conteudo: `# Meridianos e Tsubos (ツボ) — Mapa Energético Facial

## Os 8 Meridianos Faciais Principais

### 1. Meridiano do Estômago (足陽明胃経)
- Percorre: bochecha → queixo
- Função: nutrição da pele, tônus muscular
- Desequilíbrio: flacidez, sulco nasolabial profundo

### 2. Meridiano do Intestino Grosso (手陽明大腸経)
- Percorre: lateral do nariz → boca
- Função: eliminação de toxinas, luminosidade
- Desequilíbrio: pele opaca, cravos, poros dilatados

### 3. Meridiano da Vesícula Biliar (足少陽胆経)
- Percorre: têmporas e lateral do rosto
- Função: alívio de tensões
- Desequilíbrio: bruxismo, cefaleia, olheiras

### 4. Meridiano da Bexiga (足太陽膀胱経)
- Percorre: testa e sobrancelhas
- Função: equilíbrio emocional
- Desequilíbrio: linhas de expressão na testa

### 5. Meridiano do Triplo Aquecedor (手少陽三焦経)
- Percorre: lateral do rosto e orelhas
- Função: regulação de fluidos
- Desequilíbrio: inchaço facial, retenção

### 6. Meridiano do Intestino Delgado (手太陽小腸経)
- Percorre: bochecha → orelha
- Função: absorção de nutrientes pela pele
- Desequilíbrio: pele desnutrida, ressecada

### 7. Meridiano do Coração (手少陰心経)
- Reflete no rosto via ponta da língua
- Função: circulação, brilho da pele
- Desequilíbrio: palidez ou vermelhidão excessiva

### 8. Meridiano do Pulmão (手太陰肺経)
- Percorre: bochechas e nariz
- Função: hidratação, defesa da pele
- Desequilíbrio: pele seca, rosácea, sensibilidade

## Tsubos Faciais — Pontos de Acupressão

| Ponto | Localização | Benefício |
| Yin Tang (印堂) | Entre as sobrancelhas | Ansiedade, tensão, clareza mental |
| Tai Yang (太陽) | Têmporas | Cefaleia, relaxamento ocular |
| SI 18 / Quanliao | Maçã do rosto | Flacidez, tônus facial |
| ST 2 / Sibai (四白) | Abaixo dos olhos | Olheiras, bolsas |
| GB 20 / Fengchi | Base do crânio | Tensão cervical |
| Dicang (地倉) | Canto da boca | Lifting do terço inferior |
| Yingxiang (迎香) | Lateral do nariz | Desobstrução, respiração |
| Jiache (頬車) | Ângulo da mandíbula | Bruxismo, tensão |

> Ao pressionar um tsubo por 5-8 segundos, você ativa o fluxo de Qi naquele meridiano, promovendo equilíbrio e rejuvenescimento.

## Técnica de Pressão nos Tsubos

- **Pressão gradual**: aumentar lentamente em 3 segundos
- **Sustentação**: manter por 5-8 segundos
- **Liberação**: soltar gradualmente em 3 segundos
- **Respiração**: pressionar na expiração da cliente
- **Intensidade**: firme mas não dolorosa (escala 6/10)`,
        quiz: [
          {
            pergunta: "Qual tsubo facial é indicado para aliviar cefaleia?",
            opcoes: ["Yin Tang (印堂)", "Tai Yang (太陽)", "Dicang (地倉)", "Sibai (四白)"],
            respostaCorreta: 1,
            explicacao: "O ponto Tai Yang (太陽), localizado nas têmporas, é o principal tsubo para alívio de cefaleia e relaxamento ocular."
          },
          {
            pergunta: "Quantos meridianos principais percorrem o rosto?",
            opcoes: ["4", "6", "8", "12"],
            respostaCorreta: 2,
            explicacao: "O rosto é percorrido por 8 meridianos principais: Estômago, Intestino Grosso, Vesícula Biliar, Bexiga, Triplo Aquecedor, Intestino Delgado, Coração e Pulmão."
          }
        ],
        checklist: [
          "Memorizar os 8 meridianos faciais e suas funções",
          "Localizar os 8 tsubos principais no próprio rosto",
          "Praticar a técnica de pressão gradual (3s + 5-8s + 3s)",
          "Entender a relação meridiano ↔ desequilíbrio cutâneo"
        ]
      },
      {
        titulo: "Técnicas Fundamentais de Toque",
        descricao: "As 6 técnicas de manipulação base para toda massagem facial",
        duracaoMinutos: 45,
        conteudo: `# Técnicas Fundamentais de Toque Facial

## As 6 Técnicas Base

| Técnica | Descrição | Aplicação |
| Effleurage | Deslizamento suave e contínuo | Aquecimento, finalização |
| Petrissage | Amassamento rítmico | Tonificação muscular |
| Pressão sustentada | 5-8 segundos em tsubo | Desbloqueio de Qi |
| Círculos | Movimentos circulares com polpa digital | Ativação linfática |
| Vibração | Vibração suave e rápida | Relaxamento profundo |
| Tapotagem | Toques rítmicos alternados | Estimulação, lifting |

## Regras de Ouro do Toque

### Direção dos Movimentos
- **Sempre ascendente** no rosto (contra a gravidade)
- **Sempre centrífugo** na drenagem (centro → periferia → linfonodos)
- **Nunca tracionar** a pele — deslizar sobre ela

### Pressão Adequada por Região
- **Olhos**: Pressão 2/10 (anel digital, dedo anelar)
- **Bochechas**: Pressão 5/10 (polpa dos dedos)
- **Mandíbula/Masseter**: Pressão 7/10 (polegares)
- **Pescoço**: Pressão 4/10 (mão inteira)

### Velocidade
- **Relaxamento**: Lento (1 movimento a cada 3 segundos)
- **Estimulação**: Moderado (1 movimento por segundo)
- **Lifting**: Rápido e rítmico (2-3 movimentos por segundo)

## Postura do Terapeuta

- Coluna ereta, ombros relaxados
- Cotovelos ligeiramente flexionados
- Respiração sincronizada com a cliente
- Mãos aquecidas antes do contato
- Unhas curtas e limpas

## Exercícios Práticos

### Sensibilidade dos Dedos
1. Fechar os olhos e tocar diferentes texturas
2. Pressionar uma balança digital com cada dedo (calibrar pressão)
3. Praticar movimentos circulares em um balão (sem estourar)

### Fluidez de Movimentos
1. Praticar effleurage em seu próprio antebraço (5 min/dia)
2. Alternar velocidades: lento → moderado → rápido → lento
3. Sincronizar respiração com cada movimento`,
        quiz: [
          {
            pergunta: "Qual a pressão adequada para a região dos olhos?",
            opcoes: ["Pressão 2/10 (anel digital)", "Pressão 5/10 (polpa dos dedos)", "Pressão 7/10 (polegares)", "Pressão 4/10 (mão inteira)"],
            respostaCorreta: 0,
            explicacao: "A região dos olhos exige pressão mínima (2/10) usando o dedo anelar, por ser a pele mais fina e delicada do rosto."
          },
          {
            pergunta: "Qual direção dos movimentos no rosto durante a massagem?",
            opcoes: ["Descendente (a favor da gravidade)", "Sempre ascendente (contra a gravidade)", "Horizontal apenas", "Aleatória"],
            respostaCorreta: 1,
            explicacao: "Os movimentos no rosto devem ser sempre ascendentes, contra a gravidade, para promover lifting natural e evitar flacidez."
          }
        ],
        checklist: [
          "Dominar as 6 técnicas de toque (effleurage a tapotagem)",
          "Calibrar pressão adequada para cada região facial",
          "Praticar exercícios de sensibilidade dos dedos",
          "Sincronizar respiração com movimentos",
          "Aquecer as mãos antes de cada prática"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 2 — ANATOMIA FACIAL ENERGÉTICA  (14 h · 3 aulas)
  // ═══════════════════════════════════════════════════════════════
  {
    titulo: "2. Anatomia Facial Energética",
    descricao: "Músculos, camadas da pele, zonas reflexas e diagnóstico facial oriental",
    icone: "Target",
    cor: "from-violet-50 to-purple-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Camadas da Pele & Músculos Faciais",
        descricao: "Epiderme a fáscia e os 43 músculos do rosto para a massagem",
        duracaoMinutos: 55,
        conteudo: `# Anatomia Facial Aplicada à Massagem

## As 5 Camadas do Rosto

| Camada | Função na Massagem |
| Epiderme | Superfície — sensibilidade, toque inicial |
| Derme | Colágeno, elastina — estímulo à firmeza |
| Hipoderme | Gordura subcutânea — volume, contorno |
| Fáscia | Tecido conjuntivo — liberação miofascial |
| Músculos | Expressão — tonificação, lifting |

## Os 4 Grupos Musculares Faciais

### Grupo 1: Testa e Sobrancelhas

**Frontal (前頭筋)**
- Função: elevar sobrancelhas → rugas horizontais
- Massagem: deslizamento ascendente da sobrancelha à linha do cabelo

**Corrugador do Supercílio (皺眉筋)**
- Função: franzir sobrancelhas → linhas "11"
- Massagem: pinçamento e fricção lateral suave

**Prócero (鼻根筋)**
- Função: rugas horizontais na raiz do nariz
- Massagem: deslizamento vertical ascendente

### Grupo 2: Olhos

**Orbicular do olho (眼輪筋)**
- Porção palpebral: piscar
- Porção orbital: apertar os olhos
- Massagem: movimentos circulares suaves, toque de piano
- Objetivo: olheiras, bolsas, pés de galinha

### Grupo 3: Boca e Bochechas

**Zigomáticos maior e menor (大・小頬骨筋)**
- Função: sorriso — eleva cantos da boca
- Massagem: deslizamento ascendente boca → maçã do rosto

**Bucinador (頬筋)**
- Função: comprimir bochechas
- Massagem: pressão intraoral (técnica avançada)

**Orbicular da boca (口輪筋)**
- Função: fechar lábios
- Massagem: pinçamento suave perioral
- Objetivo: código de barras

### Grupo 4: Mandíbula e Pescoço

**Masseter (咬筋)**
- O músculo mais forte do corpo por área
- Massagem: pressão profunda e circular
- Objetivo: alívio de bruxismo, definição mandibular

**Platisma (広頸筋)**
- Massagem: deslizamento descendente queixo → colo
- Objetivo: bandas do platisma, pescoço jovem

**Esternocleidomastóideo (胸鎖乳突筋)**
- Massagem: deslizamento lateral suave
- Objetivo: relaxamento cervical, drenagem

## Sistema Linfático Facial

| Linfonodos | Localização |
| Pré-auriculares | Frente das orelhas |
| Parotídeos | Bochechas |
| Submandibulares | Abaixo da mandíbula |
| Cervicais | Pescoço — receptores finais |

> A drenagem linfática facial sempre termina nos linfonodos cervicais, encaminhando toxinas para eliminação pelo sistema circulatório.`,
        quiz: [
          {
            pergunta: "Qual é o músculo mais forte do corpo por área?",
            opcoes: ["Frontal", "Masseter", "Platisma", "Bucinador"],
            respostaCorreta: 1,
            explicacao: "O Masseter (咬筋) é o músculo mais forte por área, responsável pela mastigação e muito relacionado ao bruxismo."
          },
          {
            pergunta: "Onde terminam as cadeias de drenagem linfática facial?",
            opcoes: ["Orelhas", "Testa", "Linfonodos cervicais (pescoço)", "Nariz"],
            respostaCorreta: 2,
            explicacao: "A drenagem linfática facial sempre termina nos linfonodos cervicais, encaminhando toxinas para eliminação."
          }
        ],
        checklist: [
          "Identificar as 5 camadas do rosto",
          "Localizar os 4 grupos musculares faciais",
          "Conhecer a cadeia de linfonodos faciais",
          "Compreender a função do masseter e platisma"
        ]
      },
      {
        titulo: "Zonas Reflexas & Diagnóstico Facial",
        descricao: "O rosto como mapa do corpo — Bōshin (望診) e ficha de avaliação",
        duracaoMinutos: 50,
        conteudo: `# Diagnóstico Facial Oriental — 望診 (Bōshin)

## O Rosto como Mapa do Corpo

Na Medicina Oriental, cada zona do rosto corresponde a um órgão interno. Alterações na pele indicam desequilíbrios no órgão correspondente.

## Mapa de Reflexologia Facial

### Testa (額) → Intestino delgado, bexiga
- Acne → problemas digestivos
- Linhas horizontais → preocupação crônica

### Entre as sobrancelhas (眉間) → Fígado
- Linhas verticais ("11") → raiva reprimida, excesso de álcool
- Vermelhidão → sobrecarga hepática

### Sob os olhos (目の下) → Rins, suprarrenais
- Olheiras escuras → fadiga renal, desidratação
- Bolsas → retenção de líquidos, excesso de sal

### Nariz (鼻) → Coração
- Vermelhidão → pressão alta
- Cravos → congestão cardiovascular

### Bochechas (頬) → Pulmões (direita), Estômago (esquerda)
- Acne → alergias respiratórias, sensibilidade alimentar
- Rosácea → inflamação pulmonar/gástrica

### Lábios (唇) → Estômago, intestinos
- Lábios secos → desidratação, deficiência de B12
- Acne perioral → desequilíbrio hormonal/digestivo

### Queixo (顎) → Sistema reprodutivo
- Acne cística → desequilíbrio hormonal

### Mandíbula (顎ライン) → Intestino grosso
- Acne ao longo da mandíbula → toxinas, constipação

## Relação Emoções × Rugas

| Emoção | Área de Tensão | Consequência |
| Preocupação | Testa, entre sobrancelhas | Rugas horizontais |
| Estresse | Têmporas, masseter | Bruxismo, cefaleia |
| Tristeza | Canto da boca, queixo | Sulcos nasolabiais |
| Raiva | Mandíbula, glabela | Linhas "11", tensão |
| Repressão | Lábios, pescoço | Código de barras |

## Protocolo de Avaliação (5 passos)

1. Observar o rosto por 30-60 segundos antes de tocar
2. Identificar áreas de alteração (cor, textura, volume)
3. Perguntar sobre hábitos alimentares e emocionais
4. Adaptar o protocolo focando nas zonas desequilibradas
5. Orientar sobre cuidados complementares

## Ficha de Avaliação Facial Yūgen

- [ ] Cor da pele (pálida, amarelada, avermelhada, acinzentada)
- [ ] Textura (lisa, áspera, porosa, irregular)
- [ ] Simetria facial (assimetrias notáveis)
- [ ] Tônus muscular (flácido, tenso, normal)
- [ ] Linhas de expressão (localização e profundidade)
- [ ] Estado emocional geral da cliente`,
        quiz: [
          {
            pergunta: "Na reflexologia facial, qual zona corresponde ao fígado?",
            opcoes: ["Testa", "Entre as sobrancelhas", "Bochechas", "Queixo"],
            respostaCorreta: 1,
            explicacao: "A região entre as sobrancelhas (眉間) corresponde ao fígado. Linhas verticais ('11') indicam raiva reprimida ou sobrecarga hepática."
          },
          {
            pergunta: "Acne cística no queixo pode indicar desequilíbrio em qual sistema?",
            opcoes: ["Digestivo", "Respiratório", "Reprodutivo/Hormonal", "Cardiovascular"],
            respostaCorreta: 2,
            explicacao: "O queixo corresponde ao sistema reprodutivo — acne cística nessa região frequentemente indica desequilíbrio hormonal."
          }
        ],
        checklist: [
          "Memorizar o mapa de reflexologia facial (8 zonas)",
          "Associar emoções às áreas de tensão no rosto",
          "Praticar o protocolo de avaliação em 5 passos",
          "Preencher a ficha de avaliação Yūgen"
        ]
      },
      {
        titulo: "Contraindicações e Biossegurança",
        descricao: "Quando não massagear, ética profissional e higienização",
        duracaoMinutos: 35,
        conteudo: `# Contraindicações e Biossegurança

## Contraindicações Absolutas (NÃO massagear)

- ❌ Inflamação ativa da pele (acne severa, eczema agudo)
- ❌ Queimadura solar recente
- ❌ Feridas abertas ou suturas
- ❌ Dermatite de contato ativa
- ❌ Infecções cutâneas (herpes ativa, impetigo)
- ❌ Pós-procedimento estético recente (< 15 dias)
- ❌ Câncer de pele ou lesões suspeitas
- ❌ Uso de Roacutan (isotretinoína) — pele muito sensível

## Contraindicações Relativas (Adaptar protocolo)

- ⚠️ Rosácea leve → pressão mínima, evitar petrissage
- ⚠️ Gravidez → evitar pontos de acupressão IG4 e SP6
- ⚠️ Botox/preenchimento recente (> 15 dias) → pressão leve
- ⚠️ Hipertensão não controlada → sessões mais curtas
- ⚠️ Uso de retinoides → reduzir fricção

## Ética Profissional

| PODE | NÃO PODE |
| Oferecer relaxamento e bem-estar | Diagnosticar doenças |
| Sugerir cuidados complementares | Substituir médico/dermatologista |
| Trabalhar tensões musculares | Prometer cura de patologias |
| Orientar hábitos saudáveis | Prescrever medicamentos |
| Encaminhar para especialista | Realizar procedimentos invasivos |

## Protocolo de Biossegurança

### Higienização
- Lavar mãos com água e sabão antes e após cada atendimento
- Higienizar ferramentas (Gua Sha, rolos) com álcool 70%
- Trocar toalhas e lençóis por cliente
- Usar protetor facial descartável na maca

### Ambiente
- Ventilação adequada
- Superfícies desinfetadas entre sessões
- Descarte correto de materiais descartáveis
- Armazenamento adequado de óleos e produtos

### Documentação
- Ficha de anamnese assinada
- Termo de consentimento
- Registro fotográfico (com autorização)
- Acompanhamento de evolução`,
        quiz: [
          {
            pergunta: "Qual é uma contraindicação absoluta para a massagem facial?",
            opcoes: ["Rosácea leve", "Gravidez", "Herpes ativa", "Pele sensível"],
            respostaCorreta: 2,
            explicacao: "Infecções cutâneas como herpes ativa são contraindicação absoluta — há risco de disseminação da infecção."
          },
          {
            pergunta: "Após botox, quanto tempo esperar para a massagem facial?",
            opcoes: ["Pode fazer imediatamente", "Esperar 7 dias", "Esperar pelo menos 15 dias", "Nunca mais fazer"],
            respostaCorreta: 2,
            explicacao: "Após botox ou preenchimento, aguardar no mínimo 15 dias e usar pressão leve para não deslocar o produto."
          }
        ],
        checklist: [
          "Memorizar as 8 contraindicações absolutas",
          "Conhecer as 5 contraindicações relativas e adaptações",
          "Implementar protocolo de biossegurança completo",
          "Preparar ficha de anamnese e termo de consentimento"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 3 — KOBIDO: MASSAGEM FACIAL JAPONESA  (16 h · 3 aulas)
  // ═══════════════════════════════════════════════════════════════
  {
    titulo: "3. Kobido — Massagem Facial Japonesa",
    descricao: "Preparação, protocolo completo de 30 min e sequência passo a passo",
    icone: "Heart",
    cor: "from-amber-50 to-orange-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Preparação e Limpeza Facial",
        descricao: "Ambiente, acolhimento Omotenashi e limpeza pré-massagem",
        duracaoMinutos: 40,
        conteudo: `# Preparação para a Sessão de Kobido

## Preparação do Ambiente

### O Espaço Ideal
- Temperatura: 23-25°C (nem frio nem quente)
- Iluminação: Indireta, meia-luz (lâmpadas amarelas ou velas LED)
- Som: Música ambiente japonesa ou sons da natureza (40-50 dB)
- Aromas: Difusor com óleos essenciais (lavanda, hinoki, yuzu)
- Maca: Confortável, com travesseiro cervical

### Materiais Necessários
- Toalhas quentes (compressas)
- Óleo de deslizamento (jojoba, rosa mosqueta ou semente de uva)
- Espátula de madeira ou bambu (opcional)
- Gua Sha e/ou rolo de jade
- Ficha de avaliação facial

## Acolhimento Omotenashi (おもてなし)

Omotenashi é a hospitalidade japonesa que antecipa necessidades:

1. **Recepção**: Receber na porta com sorriso e contato visual
2. **Chá**: Oferecer chá verde ou água aromatizada
3. **Conversa**: Perguntar sobre o dia, ouvir atentamente
4. **Anamnese**: Ficha de avaliação na primeira visita
5. **Expectativas**: Explicar o que será feito e os benefícios

## Protocolo de Limpeza (8 min)

### Passo 1: Compressas quentes (2 min)
- Toalha úmida aquecida a 40°C
- Cobrir todo o rosto por 1 minuto
- Repetir no pescoço

### Passo 2: Demaquilante (2 min)
- Leite de limpeza ou água micelar
- Movimentos circulares suaves
- Remover com algodão umedecido

### Passo 3: Tonificação (1 min)
- Tônico sem álcool ou água termal
- Borrifar e pressionar suavemente com as mãos

### Passo 4: Aplicação do Óleo (1 min)
- Aquecer 4-5 gotas entre as palmas
- Distribuir uniformemente no rosto e pescoço
- Movimentos de effleurage suave

### Passo 5: Avaliação Visual (2 min)
- Observar simetria, textura, tônus
- Identificar áreas de tensão
- Definir foco do tratamento`,
        quiz: [
          {
            pergunta: "Qual a temperatura ideal das compressas quentes?",
            opcoes: ["30°C", "40°C", "50°C", "60°C"],
            respostaCorreta: 1,
            explicacao: "A temperatura ideal é 40°C — suficiente para abrir poros e relaxar sem risco de queimadura."
          },
          {
            pergunta: "O que é Omotenashi?",
            opcoes: ["Técnica de massagem", "Hospitalidade japonesa que antecipa necessidades", "Nome de um óleo essencial", "Tipo de pedra para Gua Sha"],
            respostaCorreta: 1,
            explicacao: "Omotenashi (おもてなし) é o conceito japonês de hospitalidade que antecipa as necessidades do cliente, criando uma experiência memorável."
          }
        ],
        checklist: [
          "Preparar ambiente (temperatura, luz, som, aroma)",
          "Reunir todos os materiais necessários",
          "Praticar o acolhimento Omotenashi (5 passos)",
          "Executar o protocolo de limpeza completo (8 min)",
          "Realizar avaliação visual antes de iniciar"
        ]
      },
      {
        titulo: "Protocolo Kobido Completo",
        descricao: "Aquecimento (5 min) + Principal (20 min) + Finalização (5 min)",
        duracaoMinutos: 65,
        conteudo: `# Protocolo Kobido Completo — 30 minutos

## Fase 1: Aquecimento (5 min)

### Pescoço (1 min)
- Effleurage: base do pescoço → mandíbula (5x cada lado)
- Pressão suave nos pontos GB 20 (base do crânio) — 8s

### Mandíbula (1 min)
- Deslizamento: queixo → orelhas (5x)
- Círculos no masseter (10x cada lado)

### Bochechas (1,5 min)
- Effleurage: nariz → têmporas (5x)
- Círculos ascendentes nas maçãs do rosto (10x)

### Testa (1,5 min)
- Deslizamento horizontal: centro → têmporas (5x)
- Ondas alternadas (mãos sobrepostas) (5x)
- Pressão Yin Tang (entre sobrancelhas) — 8s

## Fase 2: Protocolo Principal (20 min)

### Pescoço (3 min)
1. Mãos na base do pescoço, deslizar para mandíbula (3x)
2. Pressões pontuais nos pontos LI 18 (5s cada)
3. Pinçamento suave do esternocleidomastóideo
4. Drenagem: mandíbula → clavícula (5x cada lado)

### Mandíbula (4 min)
1. Polegares sob o queixo, deslizar para orelhas (5x)
2. Caminhada dos dedos ao longo da mandíbula
3. Tapping rítmico na linha mandibular (30s)
4. Pressão profunda no ST 6 (masseter) — 8s
5. Liberação do masseter: círculos profundos (10x)

### Bochechas (4 min)
1. Nariz → têmporas (deslizamento profundo, 5x)
2. Círculos ascendentes com polegares (10x)
3. Pressão SI 18 (maçã do rosto) — 8s
4. Lifting com mãos em concha (5x cada lado)
5. Petrissage nos zigomáticos (10x)

### Olhos (4 min)
1. Deslizamento sob a sobrancelha (canto interno → externo, 5x)
2. Toque de piano ao redor dos olhos (30s)
3. Círculos suaves no orbicular (5x)
4. Pressão UB 2 (início da sobrancelha) — 5s
5. Pressão GB 1 (canto externo) — 5s
6. Drenagem: canto interno → têmporas → orelhas (5x)

### Testa (5 min)
1. Deslizamento horizontal centro → têmporas (5x)
2. Pressão GB 14 (acima da pupila) — 8s
3. Ondas com mãos alternadas (10x)
4. Pinçamento do corrugador (linha 11) — 10x
5. Deslizamento vertical: sobrancelhas → linha do cabelo (5x)
6. Pressão Yin Tang — 8s
7. Vibração suave em toda a testa (15s)

## Fase 3: Finalização (5 min)

1. Effleurage geral: testa → têmporas → mandíbula → pescoço (5x)
2. Drenagem linfática completa: face → orelhas → pescoço → clavícula (3x)
3. Mãos em concha sobre os olhos (30s, escuridão terapêutica)
4. Respiração sincronizada com a cliente (5 ciclos)
5. Pressão final Yin Tang + Tai Yang simultaneamente (8s)
6. Retirada gradual das mãos (contagem regressiva mental: 5, 4, 3, 2, 1)

> **Dica**: A retirada gradual é tão importante quanto o início. Uma saída abrupta desfaz o estado de relaxamento alcançado.`,
        quiz: [
          {
            pergunta: "Quanto tempo dura a fase principal do Kobido?",
            opcoes: ["10 minutos", "15 minutos", "20 minutos", "30 minutos"],
            respostaCorreta: 2,
            explicacao: "A fase principal do Kobido dura 20 minutos, dividida entre pescoço, mandíbula, bochechas, olhos e testa."
          },
          {
            pergunta: "Por que a retirada gradual das mãos é importante?",
            opcoes: ["Para evitar lesão", "Para não desfazer o estado de relaxamento", "Por questões de higiene", "Para marcar o tempo"],
            respostaCorreta: 1,
            explicacao: "A retirada gradual preserva o estado de relaxamento profundo alcançado durante a sessão. Uma saída abrupta pode causar desconforto."
          }
        ],
        checklist: [
          "Executar aquecimento completo (5 min)",
          "Dominar a sequência do pescoço (3 min)",
          "Dominar a sequência da mandíbula (4 min)",
          "Dominar a sequência das bochechas (4 min)",
          "Dominar a sequência dos olhos (4 min)",
          "Dominar a sequência da testa (5 min)",
          "Praticar a finalização com retirada gradual"
        ]
      },
      {
        titulo: "Variações e Adaptações do Kobido",
        descricao: "Kobido Express (15 min), Kobido Premium (45 min) e adaptações por queixa",
        duracaoMinutos: 50,
        conteudo: `# Variações e Adaptações do Kobido

## Kobido Express (15 min)

Versão compacta para clientes com pouco tempo ou como add-on:

| Etapa | Tempo | Foco |
| Aquecimento | 2 min | Effleurage pescoço e rosto |
| Mandíbula + Masseter | 3 min | Liberação de tensão |
| Bochechas + Lifting | 3 min | Zigomáticos, petrissage |
| Olhos | 3 min | Drenagem, toque de piano |
| Testa + Finalização | 4 min | Ondas, Yin Tang, drenagem final |

## Kobido Premium (45 min)

Versão estendida com Gua Sha integrado:

| Etapa | Tempo | Técnica |
| Preparação | 5 min | Limpeza + compressas quentes |
| Kobido Clássico | 20 min | Protocolo completo |
| Gua Sha | 10 min | Raspagem com pedra jade |
| Drenagem profunda | 5 min | Movimentos linfáticos amplos |
| Finalização sensorial | 5 min | Aromaterapia + pressão craniana |

## Adaptações por Queixa Principal

### Foco Anti-idade
- Aumentar tempo nos zigomáticos e orbicular
- Mais petrissage e tapotagem (estimulação)
- Ênfase no lifting com mãos em concha
- Pressão extra nos tsubos SI 18 e GB 14

### Foco Tensão/Bruxismo
- Dobrar o tempo no masseter (8 min)
- Incluir liberação intraoral (com luvas)
- Pressão profunda em ST 6 e GB 20
- Adicionar trabalho cervical extenso

### Foco Olheiras/Edema
- Priorizar drenagem linfática (60% do tempo)
- Movimentos lentos e rítmicos
- Pressão nos tsubos renais (ST 2, UB 2)
- Finalizar com compressa gelada nos olhos

### Foco Luminosidade/Detox
- Ênfase na drenagem centrífuga
- Mais effleurage e círculos (ativação circulatória)
- Trabalhar zonas reflexas do fígado e intestinos
- Recomendar hidratação pós-sessão

## Frequência Recomendada

| Objetivo | Frequência | Duração |
| Manutenção | 1x por mês | 30-45 min |
| Anti-idade intensivo | 1x por semana (4 sessões) | 45 min |
| Tensão/Bruxismo | 2x por semana (6 sessões) | 30 min |
| Detox facial | Quinzenal (3 sessões) | 30 min |`,
        quiz: [
          {
            pergunta: "Quanto tempo dura o Kobido Express?",
            opcoes: ["10 minutos", "15 minutos", "20 minutos", "30 minutos"],
            respostaCorreta: 1,
            explicacao: "O Kobido Express dura 15 minutos, ideal para clientes com pouco tempo ou como serviço add-on."
          },
          {
            pergunta: "Para queixa de bruxismo, qual área deve receber mais tempo?",
            opcoes: ["Testa", "Olhos", "Masseter", "Bochechas"],
            respostaCorreta: 2,
            explicacao: "Para bruxismo, o masseter deve receber o dobro do tempo (8 min) com pressão profunda e liberação intraoral."
          }
        ],
        checklist: [
          "Dominar o Kobido Express (15 min)",
          "Compreender o Kobido Premium (45 min com Gua Sha)",
          "Adaptar protocolo para anti-idade",
          "Adaptar protocolo para tensão/bruxismo",
          "Adaptar protocolo para olheiras/edema",
          "Conhecer frequência recomendada por objetivo"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 4 — TÉCNICA YŪGEN JAPAN + GUA SHA  (18 h · 4 aulas)
  // ═══════════════════════════════════════════════════════════════
  {
    titulo: "4. Técnica Yūgen Japan + Gua Sha",
    descricao: "Os 5 pilares exclusivos, manobras assinatura e protocolo Gua Sha",
    icone: "GraduationCap",
    cor: "from-emerald-50 to-teal-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Os 5 Pilares Yūgen Japan",
        descricao: "Preparação energética, trabalho profundo, drenagem, lifting e selamento",
        duracaoMinutos: 55,
        conteudo: `# Os 5 Pilares da Técnica Yūgen Japan (Exclusiva)

## Pilar 1: Preparação Energética

Ativar o Qi antes de qualquer toque físico:

- **Centramento do terapeuta**: 1 min de respiração diafragmática
- **Aquecimento das mãos**: Friccionar palmas por 30s
- **Scan energético**: Mãos a 5 cm do rosto, percorrer lentamente
- **Intenção**: Definir mentalmente o objetivo da sessão
- **Conexão**: Primeiro toque nas têmporas (8s, sem pressão)

> O Pilar 1 diferencia um profissional técnico de um terapeuta — a energia que você transmite importa tanto quanto a técnica.

## Pilar 2: Trabalho Profundo

Liberar tensões acumuladas camada por camada:

### Sequência de Profundidade
1. **Superficial**: Effleurage leve (epiderme) — 2 min
2. **Intermediária**: Petrissage moderada (derme/hipoderme) — 3 min
3. **Profunda**: Pressão em tsubos + liberação miofascial — 5 min
4. **Retorno**: Effleurage leve para integração — 2 min

### Pontos-chave do Trabalho Profundo
- Masseter: Liberação do bruxismo emocional
- Corrugador: Dissolução da "máscara de tensão"
- Temporal: Alívio da sobrecarga mental
- Trapézio superior: Base de sustentação facial

## Pilar 3: Drenagem Revitalizante

Eliminar toxinas com técnica específica Yūgen:

- **Velocidade**: 1 movimento a cada 3 segundos (ritmo linfático)
- **Pressão**: Leve (2/10) — linfáticos são superficiais
- **Direção**: Centro do rosto → orelhas → pescoço → clavícula
- **Sequência**: Sempre de baixo para cima, drenar de cima para baixo

### Mapa de Drenagem Yūgen
1. Pescoço → clavícula (abrir caminho)
2. Mandíbula → orelhas → pescoço
3. Bochechas → orelhas → pescoço
4. Olhos → têmporas → orelhas
5. Testa → têmporas → orelhas → pescoço

## Pilar 4: Lifting Natural

Reposicionar tecidos com técnicas de sustentação:

- **Hands-up**: Mãos em concha elevando das bochechas às têmporas
- **Finger-walk**: Caminhada dos dedos ascendente na mandíbula
- **Scoop lift**: Movimento de "colher" sob os zigomáticos
- **Temple hold**: Pressão sustentada nas têmporas (lifting temporal)

## Pilar 5: Selamento Energético

Fixar os resultados e encerrar o campo energético:

1. Effleurage final completo (3 passagens amplas)
2. Pressão simultânea Yin Tang + Tai Yang (8s)
3. Mãos em concha sobre os olhos (escuridão terapêutica, 30s)
4. Retirada gradual em 5 tempos
5. Momento de silêncio (15s — sem falar)

> O selamento é o momento onde os resultados se "cristalizam". Nunca pular esta etapa.`,
        quiz: [
          {
            pergunta: "Qual é o primeiro pilar da Técnica Yūgen Japan?",
            opcoes: ["Trabalho profundo", "Preparação energética", "Drenagem", "Lifting natural"],
            respostaCorreta: 1,
            explicacao: "O primeiro pilar é a Preparação Energética — ativar o Qi antes de qualquer toque físico, incluindo centramento e scan energético."
          },
          {
            pergunta: "Qual a pressão adequada para a drenagem linfática?",
            opcoes: ["Pressão 2/10 (leve)", "Pressão 5/10 (moderada)", "Pressão 7/10 (firme)", "Pressão 10/10 (máxima)"],
            respostaCorreta: 0,
            explicacao: "A drenagem linfática requer pressão leve (2/10) porque os vasos linfáticos são superficiais e se comprimem com pressão excessiva."
          }
        ],
        checklist: [
          "Praticar a preparação energética (centramento, aquecimento, scan)",
          "Dominar a sequência de profundidade (4 camadas)",
          "Memorizar o mapa de drenagem Yūgen (5 etapas)",
          "Executar as 4 técnicas de lifting natural",
          "Realizar o selamento energético completo"
        ]
      },
      {
        titulo: "Manobras Exclusivas Yūgen",
        descricao: "Ondas do Japão, Caminho do Sol, Elevação das Montanhas, Esfinge e Bambu ao Vento",
        duracaoMinutos: 60,
        conteudo: `# Manobras Assinatura — Técnica Yūgen Japan

## 1. Ondas do Japão 🌊 (Testa)

**Movimento**: Mãos alternadas em ondulação contínua da testa

### Execução
1. Mão direita na sobrancelha, deslizar até a linha do cabelo
2. Antes de completar, mão esquerda inicia na sobrancelha
3. Criar um fluxo contínuo e rítmico (como ondas)
4. Velocidade: 1 onda completa a cada 2 segundos
5. Repetir 15-20x

### Benefícios
- Suaviza linhas horizontais da testa
- Promove relaxamento profundo
- Estimula circulação do couro cabeludo
- Alivia tensão do músculo frontal

## 2. Caminho do Sol ☀️ (Olhos)

**Movimento**: Pressão + deslizamento ao redor da órbita ocular

### Execução
1. Polegares no ponto UB 2 (início da sobrancelha) — pressão 5s
2. Deslizar ao longo da sobrancelha até o canto externo
3. Pressão em GB 1 (canto externo) — 5s
4. Deslizar suavemente sob os olhos (anelar) até canto interno
5. Pressão em ST 1 (abaixo do olho) — 5s
6. Repetir 5-8x (desenhando um "sol" ao redor do olho)

### Benefícios
- Reduz olheiras e bolsas
- Ativa drenagem periorbital
- Suaviza pés de galinha
- Alivia fadiga ocular (uso de telas)

## 3. Elevação das Montanhas ⛰️ (Bochechas)

**Movimento**: Lifting ascendente com base das mãos nos zigomáticos

### Execução
1. Base das mãos nas bochechas (sobre os zigomáticos)
2. Pressão moderada (5/10)
3. Deslizar ascendente até as têmporas — manter 5s
4. Soltar lentamente
5. Repetir 8-10x

### Benefícios
- Lifting imediato do terço médio facial
- Estimula colágeno nos zigomáticos
- Reduz sulco nasolabial
- Efeito "blush natural" (ativação circulatória)

## 4. Esfinge 🗿 (Mandíbula)

**Movimento**: Liberação profunda do masseter e platisma

### Execução
1. Polegares sob o queixo, dedos sobre o masseter
2. Pressão profunda (7/10) mantida por 8s
3. Movimentos circulares profundos (10x cada lado)
4. Caminhada dos dedos do queixo às orelhas
5. Tapping rápido na linha mandibular (15s)
6. Repetir sequência 3x

### Benefícios
- Alívio de bruxismo e tensão mandibular
- Definição do contorno facial (jawline)
- Liberação emocional (mandíbula = controle/estresse)
- Redução de dor de cabeça tensional

## 5. Bambu ao Vento 🎋 (Pescoço)

**Movimento**: Drenagem suave e rítmica como bambu ao vento

### Execução
1. Mãos abertas, envolver o pescoço lateralmente
2. Deslizar suavemente de cima para baixo (mandíbula → clavícula)
3. Alternar mãos como ondas (nunca parar o fluxo)
4. Velocidade: 1 deslizamento a cada 3 segundos
5. 10-15 passagens cada lado

### Benefícios
- Drenagem linfática cervical completa
- Relaxamento do trapézio superior
- Melhora da postura cervical
- Sensação de leveza e alívio`,
        quiz: [
          {
            pergunta: "Qual manobra exclusiva é indicada para bruxismo?",
            opcoes: ["Ondas do Japão", "Caminho do Sol", "Elevação das Montanhas", "Esfinge"],
            respostaCorreta: 3,
            explicacao: "A Esfinge é a manobra focada na mandíbula e masseter, ideal para bruxismo e tensão mandibular."
          },
          {
            pergunta: "Quantas repetições são recomendadas para as Ondas do Japão?",
            opcoes: ["5-8x", "10-12x", "15-20x", "25-30x"],
            respostaCorreta: 2,
            explicacao: "As Ondas do Japão devem ser repetidas 15-20x, criando um fluxo contínuo e rítmico na testa."
          }
        ],
        checklist: [
          "Dominar Ondas do Japão (testa, 15-20x)",
          "Dominar Caminho do Sol (olhos, 5-8x)",
          "Dominar Elevação das Montanhas (bochechas, 8-10x)",
          "Dominar Esfinge (mandíbula, 3 séries)",
          "Dominar Bambu ao Vento (pescoço, 10-15x cada lado)",
          "Praticar todas em sequência fluida"
        ]
      },
      {
        titulo: "Gua Sha Facial Completo",
        descricao: "Pedras, técnica de raspagem, protocolo de 10 min e cuidados",
        duracaoMinutos: 50,
        conteudo: `# Gua Sha Facial — 刮痧

## O que é Gua Sha

Técnica chinesa milenar de raspagem com pedra para aliviar tensões, estimular circulação sanguínea e promover drenagem linfática.

## Tipos de Pedra

| Pedra | Propriedade | Ideal para |
| Jade (翡翠) | Frescor, equilíbrio | Edema, inchaço matinal |
| Quartzo Rosa | Suavidade, amor | Peles sensíveis, anti-idade |
| Ametista | Calma, purificação | Estresse, tensão |
| Obsidiana | Proteção, profundidade | Tensão profunda, masseter |
| Bian Stone | Infravermelho natural | Circulação, dor |

## Ângulo e Pressão

- **Ângulo da pedra**: 15-45° em relação à pele (nunca 90°)
- **Pressão**: Leve a moderada (3-5/10)
- **Velocidade**: Lenta e uniforme
- **Direção**: Sempre ascendente no rosto, descendente no pescoço
- **Repetições**: 5-7x por área

## Protocolo Gua Sha (10 min)

| Passo | Área | Movimento | Repetições |
| 1 | Pescoço | Base do crânio → clavícula | 5-7x |
| 2 | Mandíbula | Queixo → orelha | 5-7x |
| 3 | Bochechas | Nariz → orelha | 5-7x |
| 4 | Olhos | Canto interno → externo (delicado) | 3-5x |
| 5 | Testa | Centro → têmporas | 5-7x |
| 6 | Finalização | Face → pescoço → clavícula | 3-5x |

## Benefícios Comprovados

- ✅ Reduz inchaço e edema facial
- ✅ Melhora circulação sanguínea (+400% fluxo local)
- ✅ Promove lifting natural imediato
- ✅ Relaxa músculos tensos
- ✅ Estimula produção de colágeno
- ✅ Uniformiza tom da pele

## Contraindicações do Gua Sha

- ❌ Inflamação ativa da pele
- ❌ Queimadura solar
- ❌ Feridas abertas
- ❌ Dermatite de contato
- ❌ Pós-procedimento estético (< 15 dias)
- ❌ Acne inflamatória severa

## Higienização da Pedra

1. Lavar com água morna e sabão neutro após cada uso
2. Borrifar álcool 70% e deixar secar naturalmente
3. Guardar em estojo acolchoado (evitar impacto)
4. Substituir se houver fissuras ou lascas`,
        quiz: [
          {
            pergunta: "Qual o ângulo correto da pedra de Gua Sha na pele?",
            opcoes: ["90° (perpendicular)", "60-75°", "15-45°", "0° (deitada)"],
            respostaCorreta: 2,
            explicacao: "O ângulo correto é 15-45° em relação à pele. Nunca usar a 90° pois causa desconforto e pode lesionar."
          },
          {
            pergunta: "Qual pedra de Gua Sha é ideal para edema matinal?",
            opcoes: ["Quartzo Rosa", "Jade", "Obsidiana", "Ametista"],
            respostaCorreta: 1,
            explicacao: "O Jade é ideal para edema por sua propriedade natural de frescor, que ajuda a desinflamar e reduzir inchaço."
          }
        ],
        checklist: [
          "Conhecer os 5 tipos de pedra e suas indicações",
          "Dominar o ângulo correto (15-45°)",
          "Executar o protocolo completo de 10 min (6 passos)",
          "Memorizar contraindicações do Gua Sha",
          "Implementar protocolo de higienização"
        ]
      },
      {
        titulo: "Protocolos por Tipo de Pele",
        descricao: "Adaptações para pele seca, oleosa, madura, sensível e acneica",
        duracaoMinutos: 50,
        conteudo: `# Protocolos Adaptados por Tipo de Pele

## Pele Seca

### Características
- Pele fina, poucos poros visíveis, tendência a descamação
- Sensação de repuxamento

### Adaptações
- **Óleo**: Rosa mosqueta ou amêndoas doces (maior emolência)
- **Pressão**: Leve a moderada (3-5/10)
- **Técnicas prioritárias**: Effleurage longo, círculos suaves
- **Evitar**: Tapotagem intensa, petrissage profunda
- **Gua Sha**: Quartzo rosa com pressão mínima
- **Frequência**: Quinzenal

## Pele Oleosa

### Características
- Poros dilatados, brilho excessivo, tendência a cravos
- Produção sebácea aumentada

### Adaptações
- **Óleo**: Semente de uva ou jojoba (leves, não comedogênicos)
- **Pressão**: Moderada (5/10)
- **Técnicas prioritárias**: Drenagem linfática, pressão nos tsubos
- **Ênfase**: Zona T (testa, nariz, queixo)
- **Gua Sha**: Jade frio (propriedade adstringente)
- **Frequência**: Semanal a quinzenal

## Pele Madura (50+)

### Características
- Perda de elasticidade, rugas estabelecidas, flacidez
- Pele mais fina e frágil

### Adaptações
- **Óleo**: Rosa mosqueta + vitamina E (regenerador)
- **Pressão**: Moderada (4-6/10)
- **Técnicas prioritárias**: Lifting (Elevação das Montanhas), petrissage
- **Ênfase**: Zigomáticos, orbicular, platisma
- **Gua Sha**: Bian Stone (infravermelho natural, estimula colágeno)
- **Frequência**: Semanal (pacote intensivo de 4-8 sessões)

## Pele Sensível/Rosácea

### Características
- Reatividade a produtos, vermelhidão, vasos aparentes
- Sensação de ardor ou queimação

### Adaptações
- **Óleo**: Calêndula ou camomila (anti-inflamatórios)
- **Pressão**: Mínima (2/10)
- **Técnicas prioritárias**: Effleurage suavíssimo, pressão sustentada leve
- **Evitar**: Petrissage, tapotagem, Gua Sha com pressão
- **Gua Sha**: Quartzo rosa gelado com movimento mínimo
- **Frequência**: Mensal

## Pele Acneica (não inflamatória)

### Características
- Comedões abertos/fechados, textura irregular
- Sem inflamação ativa (se houver, é contraindicação)

### Adaptações
- **Óleo**: Jojoba puro (regula sebo sem obstruir)
- **Pressão**: Leve (3/10)
- **Técnicas prioritárias**: Drenagem linfática, círculos suaves
- **Evitar**: Pressão sobre comedões, petrissage intensa
- **Gua Sha**: Jade com ângulo mínimo (15°)
- **Frequência**: Quinzenal

## Tabela Resumo

| Tipo de Pele | Óleo | Pressão | Gua Sha | Frequência |
| Seca | Rosa mosqueta | 3-5/10 | Quartzo rosa | Quinzenal |
| Oleosa | Jojoba/Uva | 5/10 | Jade frio | Semanal |
| Madura | Rosa mosqueta+VitE | 4-6/10 | Bian Stone | Semanal |
| Sensível | Calêndula | 2/10 | Quartzo gelado | Mensal |
| Acneica | Jojoba | 3/10 | Jade 15° | Quinzenal |`,
        quiz: [
          {
            pergunta: "Qual óleo é mais indicado para pele oleosa?",
            opcoes: ["Rosa mosqueta", "Amêndoas doces", "Jojoba ou semente de uva", "Calêndula"],
            respostaCorreta: 2,
            explicacao: "Jojoba e semente de uva são leves e não comedogênicos, ideais para pele oleosa sem obstruir poros."
          },
          {
            pergunta: "Para pele sensível/rosácea, qual a pressão máxima recomendada?",
            opcoes: ["2/10 (mínima)", "5/10 (moderada)", "7/10 (firme)", "Sem restrição"],
            respostaCorreta: 0,
            explicacao: "Pele sensível e rosácea requerem pressão mínima (2/10) para evitar irritação, vermelhidão e ruptura de capilares."
          }
        ],
        checklist: [
          "Identificar os 5 tipos de pele e suas características",
          "Memorizar o óleo adequado para cada tipo",
          "Ajustar pressão e técnicas por tipo de pele",
          "Escolher a pedra de Gua Sha correta",
          "Definir frequência ideal de sessões"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 5 — PRODUTOS, FERRAMENTAS & ÓLEOS  (12 h · 3 aulas)
  // ═══════════════════════════════════════════════════════════════
  {
    titulo: "5. Produtos, Ferramentas & Óleos",
    descricao: "Óleos vegetais e essenciais, ferramentas profissionais e combinações",
    icone: "Package",
    cor: "from-sky-50 to-blue-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Óleos Vegetais para Deslizamento",
        descricao: "Os 8 melhores óleos carreadores e como escolher para cada pele",
        duracaoMinutos: 40,
        conteudo: `# Óleos Vegetais para Massagem Facial

## Os 8 Óleos Carreadores Essenciais

| Óleo | Benefício Principal | Tipo de Pele | Absorção |
| Jojoba | Similar ao sebo natural | Todos os tipos | Rápida |
| Rosa Mosqueta | Regeneração celular | Madura, cicatrizes | Média |
| Semente de Uva | Leveza, antioxidante | Oleosa, mista | Rápida |
| Amêndoas Doces | Emoliente, nutritivo | Seca, normal | Lenta |
| Argan | Anti-idade, brilho | Madura, seca | Média |
| Coco Fracionado | Neutro, deslizamento | Sensível | Rápida |
| Calêndula (macerado) | Anti-inflamatório | Sensível, rosácea | Média |
| Squalane | Biomimético, leve | Todos os tipos | Muito rápida |

## Como Escolher

### Regra dos 3Cs
1. **Comedogenicidade**: Verificar escala 0-5 (ideal: 0-2)
2. **Custo-benefício**: Preço vs. rendimento vs. resultado
3. **Compatibilidade**: Adequação ao tipo de pele da cliente

## Óleos Essenciais para Aromaterapia Facial

| Óleo Essencial | Propriedade | Diluição |
| Lavanda | Calmante, regenerador | 1-2% |
| Gerânio | Equilibrante, anti-idade | 1% |
| Rosa | Premium anti-idade | 0,5-1% |
| Tea Tree | Antisséptico | 1% (pele oleosa) |
| Olíbano (Frankincense) | Regeneração celular | 1-2% |
| Ylang Ylang | Equilibrante do sebo | 0,5-1% |

## Fórmulas Prontas

### Blend Anti-idade
- 30ml Óleo de Rosa Mosqueta
- 3 gotas de Olíbano
- 2 gotas de Lavanda
- 1 gota de Rosa

### Blend Detox
- 30ml Óleo de Jojoba
- 3 gotas de Tea Tree
- 2 gotas de Lavanda
- 1 gota de Limão (uso noturno)

### Blend Relaxante
- 30ml Óleo de Amêndoas
- 3 gotas de Lavanda
- 2 gotas de Ylang Ylang
- 1 gota de Gerânio

## Armazenamento

- Frascos âmbar ou escuros (proteção da luz)
- Temperatura ambiente (18-25°C)
- Validade: 6-12 meses após aberto
- Nunca aplicar óleo essencial puro na pele`,
        quiz: [
          {
            pergunta: "Qual óleo é mais similar ao sebo natural da pele?",
            opcoes: ["Rosa Mosqueta", "Jojoba", "Coco", "Argan"],
            respostaCorreta: 1,
            explicacao: "O Jojoba possui estrutura molecular similar ao sebo humano, sendo absorvido rapidamente sem obstruir poros."
          },
          {
            pergunta: "Qual a diluição máxima recomendada para óleos essenciais na face?",
            opcoes: ["5-10%", "3-5%", "1-2%", "Puro"],
            respostaCorreta: 2,
            explicacao: "Na face, óleos essenciais devem ser diluídos a 1-2% máximo. Nunca aplicar puros — risco de irritação e queimadura."
          }
        ],
        checklist: [
          "Conhecer os 8 óleos vegetais e suas indicações",
          "Aplicar a regra dos 3Cs na escolha do óleo",
          "Memorizar os 6 óleos essenciais para aromaterapia facial",
          "Preparar as 3 fórmulas prontas (anti-idade, detox, relaxante)",
          "Implementar armazenamento correto"
        ]
      },
      {
        titulo: "Ferramentas Profissionais",
        descricao: "Gua Sha, rolos, espátulas, compressas e kits completos",
        duracaoMinutos: 35,
        conteudo: `# Ferramentas Profissionais para Yūgen FaceSPA

## Kit Básico (Investimento Inicial)

| Ferramenta | Uso | Investimento |
| Gua Sha jade | Raspagem, drenagem | R$ 40-80 |
| Rolo de jade | Massagem, aplicação de produtos | R$ 30-60 |
| Toalhas de rosto (6x) | Compressas, limpeza | R$ 60-100 |
| Kit óleos (3 tipos) | Deslizamento | R$ 80-150 |
| Espátula de madeira | Demarcação, limpeza | R$ 15-30 |

**Total Kit Básico: R$ 225-420**

## Kit Premium (Diferencial)

| Ferramenta | Uso | Investimento |
| Gua Sha quartzo rosa | Peles sensíveis | R$ 60-120 |
| Gua Sha obsidiana | Trabalho profundo | R$ 50-100 |
| Rolo duplo jade | Face + olhos | R$ 50-90 |
| Pedras quentes | Relaxamento profundo | R$ 80-150 |
| Difusor de aromas | Ambientação | R$ 60-120 |
| Travesseiro cervical | Conforto na maca | R$ 40-80 |

## Cuidados com Ferramentas

### Limpeza Diária
1. Água morna + sabão neutro após cada cliente
2. Álcool 70% — borrifar e secar ao ar
3. Nunca mergulhar pedras naturais em água quente

### Manutenção Semanal
- Verificar fissuras ou lascas nas pedras
- Lavar toalhas com água quente (60°C)
- Reabastecer óleos e produtos

### Substituição
- Pedras: Substituir se lascadas ou com fissuras
- Toalhas: A cada 3-6 meses (desgaste natural)
- Óleos: Respeitar validade (6-12 meses)

## Organização do Espaço de Trabalho

- Bancada limpa e organizada
- Materiais à mão (evitar pausas durante a sessão)
- Pedras em estojo acolchoado
- Óleos em bandeja decorativa (experiência visual)
- Toalhas dobradas e aquecidas prontas para uso`,
        quiz: [
          {
            pergunta: "Qual o investimento médio para o Kit Básico Yūgen?",
            opcoes: ["R$ 50-100", "R$ 225-420", "R$ 500-800", "R$ 1.000+"],
            respostaCorreta: 1,
            explicacao: "O Kit Básico Yūgen custa entre R$ 225-420, incluindo Gua Sha, rolo de jade, toalhas, óleos e espátula — baixo investimento inicial."
          }
        ],
        checklist: [
          "Montar o Kit Básico completo",
          "Conhecer as opções do Kit Premium",
          "Implementar rotina de limpeza diária",
          "Estabelecer manutenção semanal",
          "Organizar o espaço de trabalho profissional"
        ]
      },
      {
        titulo: "Combinações e Protocolos Completos",
        descricao: "Como integrar Kobido + Yūgen + Gua Sha em sessões de 30 a 75 min",
        duracaoMinutos: 45,
        conteudo: `# Protocolos Integrados — Combinações Profissionais

## Protocolo Yūgen Signature (60 min)

| Fase | Tempo | Técnica |
| 1. Preparação | 8 min | Acolhimento + limpeza + compressas |
| 2. Kobido Base | 15 min | Aquecimento + sequência principal |
| 3. Yūgen Japan | 15 min | 5 pilares + manobras exclusivas |
| 4. Gua Sha | 10 min | Drenagem + lifting com pedra |
| 5. Selamento | 7 min | Pilar 5 + aromaterapia + descanso |
| 6. Finalização | 5 min | Hidratante + protetor solar + orientações |

## Protocolo Express (30 min)

| Fase | Tempo | Foco |
| Limpeza rápida | 3 min | Água micelar + tônico |
| Kobido Express | 10 min | Mandíbula, bochechas, testa |
| Gua Sha rápido | 8 min | Drenagem + lifting |
| Manobra Yūgen | 5 min | Escolher 2 manobras exclusivas |
| Selamento | 4 min | Pressão final + hidratante |

## Protocolo Premium (75 min)

| Fase | Tempo | Diferencial |
| Ritual de acolhimento | 10 min | Chá + anamnese detalhada |
| Limpeza profunda | 8 min | Dupla limpeza + esfoliação enzimática |
| Kobido Completo | 20 min | Protocolo integral |
| Yūgen Japan Completo | 15 min | Todos os 5 pilares |
| Gua Sha + Pedras quentes | 12 min | Raspagem + relaxamento térmico |
| Máscara + Selamento | 10 min | Máscara de colágeno + aromaterapia |

## Protocolo de Manutenção Mensal (45 min)

Para clientes regulares que já completaram o ciclo intensivo:

| Fase | Tempo | Objetivo |
| Check-in + Limpeza | 5 min | Avaliar evolução |
| Kobido Foco | 15 min | Áreas de necessidade atual |
| Gua Sha Manutenção | 10 min | Drenagem geral |
| Manobras Yūgen | 10 min | 3 manobras escolhidas |
| Selamento | 5 min | Fechamento energético |

## Menu de Serviços Sugerido

| Serviço | Duração | Faixa de Preço |
| Yūgen Express | 30 min | R$ 120-180 |
| Yūgen Signature | 60 min | R$ 220-320 |
| Yūgen Premium | 75 min | R$ 350-500 |
| Manutenção Mensal | 45 min | R$ 150-220 |
| Pacote 4x Signature | 4 sessões | R$ 800-1.100 |
| Pacote 8x Signature | 8 sessões | R$ 1.400-2.000 |`,
        quiz: [
          {
            pergunta: "Quanto tempo dura o Protocolo Yūgen Signature completo?",
            opcoes: ["30 minutos", "45 minutos", "60 minutos", "75 minutos"],
            respostaCorreta: 2,
            explicacao: "O Protocolo Yūgen Signature dura 60 minutos, integrando Kobido (15 min), Yūgen Japan (15 min), Gua Sha (10 min) e preparação/selamento."
          },
          {
            pergunta: "Qual a faixa de preço sugerida para o Yūgen Premium?",
            opcoes: ["R$ 120-180", "R$ 220-320", "R$ 350-500", "R$ 500-700"],
            respostaCorreta: 2,
            explicacao: "O Yūgen Premium (75 min) é sugerido na faixa de R$ 350-500, incluindo dupla limpeza, Kobido completo, Gua Sha com pedras quentes e máscara."
          }
        ],
        checklist: [
          "Dominar o Protocolo Signature (60 min)",
          "Adaptar o Protocolo Express (30 min)",
          "Compreender o Protocolo Premium (75 min)",
          "Definir menu de serviços com preços",
          "Calcular custo por sessão vs. ticket médio"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 6 — OMOTENASHI, NEGÓCIOS & CERTIFICAÇÃO  (10 h · 3 aulas)
  // ═══════════════════════════════════════════════════════════════
  {
    titulo: "6. Omotenashi, Negócios & Certificação",
    descricao: "Fidelização japonesa, precificação, marketing e certificação internacional",
    icone: "BarChart3",
    cor: "from-fuchsia-50 to-pink-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Omotenashi — Fidelização Japonesa",
        descricao: "Hospitalidade que antecipa necessidades e a Técnica do Caderninho",
        duracaoMinutos: 40,
        conteudo: `# Omotenashi — A Arte da Fidelização Japonesa

## O que é Omotenashi (おもてなし)

Hospitalidade japonesa que vai além do "bom atendimento" — é antecipar necessidades antes que o cliente as perceba, criando experiências tão memoráveis que a fidelização é consequência natural.

## Os 4 Pilares do Omotenashi

### 1. Antecipação
- Preparar o ambiente antes da chegada
- Lembrar preferências de sessões anteriores
- Oferecer água/chá sem ser solicitada

### 2. Atenção aos Detalhes
- Temperatura da sala ajustada
- Música de acordo com o humor da cliente
- Produtos organizados de forma harmoniosa

### 3. Respeito Genuíno
- Ouvir mais do que falar
- Não julgar, apenas acolher
- Tratar cada cliente como única

### 4. Melhoria Contínua (Kaizen 改善)
- Pedir feedback após cada sessão
- Implementar melhorias sugeridas
- Estudar constantemente novas técnicas

## A Técnica do Caderninho 📓

A ferramenta mais poderosa de fidelização — simples e transformadora:

### O que anotar (por cliente)
- Nome completo e como gosta de ser chamada
- Data de aniversário e de pessoas importantes
- Profissão e rotina de trabalho
- Preferências (música, temperatura, aroma, pressão)
- Tipo de pele e evolução ao longo das sessões
- Assuntos conversados (viagens, filhos, projetos)
- Queixas principais e objetivos estéticos

### Como usar
- **Antes da sessão**: Revisar anotações da última visita
- **Durante**: Retomar assuntos naturalmente ("Como foi aquela viagem?")
- **Depois**: Atualizar anotações enquanto está fresco na memória
- **Resultado**: A cliente se sente vista, lembrada e especial

> "O Caderninho transforma clientes em fãs. Quando você lembra do nome do cachorro dela, ela nunca mais vai em outro lugar."

## Experiências que Fidelizam

| Momento | Ação Omotenashi |
| Chegada | Chá quente esperando + sala preparada |
| Durante | Perguntar conforto a cada 10 min |
| Finalização | Mostrar antes/depois no espelho |
| Saída | Presentear com mini amostra de óleo |
| Pós-sessão | WhatsApp no dia seguinte ("Como está se sentindo?") |
| Aniversário | Mensagem + desconto especial |`,
        quiz: [
          {
            pergunta: "Qual é o conceito central do Omotenashi?",
            opcoes: ["Oferecer descontos frequentes", "Antecipar necessidades antes do cliente perceber", "Usar tecnologia avançada", "Ter o espaço mais luxuoso"],
            respostaCorreta: 1,
            explicacao: "Omotenashi é antecipar necessidades — criar experiências tão memoráveis que a fidelização é consequência natural."
          },
          {
            pergunta: "O que é a 'Técnica do Caderninho'?",
            opcoes: ["Um tipo de massagem", "Registro detalhado de preferências e dados de cada cliente", "Um exercício de alongamento", "Uma técnica de respiração"],
            respostaCorreta: 1,
            explicacao: "A Técnica do Caderninho é anotar dados pessoais, preferências e conversas de cada cliente para retomá-los nas próximas visitas."
          }
        ],
        checklist: [
          "Compreender os 4 pilares do Omotenashi",
          "Implementar a Técnica do Caderninho",
          "Criar checklist de ações para cada momento da jornada",
          "Enviar mensagem pós-sessão (WhatsApp)",
          "Planejar ações para datas especiais (aniversários)"
        ]
      },
      {
        titulo: "Precificação & Modelo de Negócios",
        descricao: "Tabela de preços, pacotes, custos por sessão e metas financeiras",
        duracaoMinutos: 45,
        conteudo: `# Precificação & Modelo de Negócios

## Custos por Sessão

| Item | Custo Médio |
| Óleo de deslizamento (10ml/sessão) | R$ 3-8 |
| Toalhas (lavagem) | R$ 2-5 |
| Produtos de limpeza | R$ 3-5 |
| Materiais descartáveis | R$ 2-3 |
| **Custo direto total** | **R$ 10-21** |

## Tabela de Preços Sugerida

| Serviço | Duração | Preço | Margem |
| Yūgen Express | 30 min | R$ 150 | ~87% |
| Yūgen Signature | 60 min | R$ 280 | ~93% |
| Yūgen Premium | 75 min | R$ 450 | ~95% |
| Manutenção Mensal | 45 min | R$ 200 | ~90% |

## Pacotes com Desconto

| Pacote | Sessões | Valor | Desconto |
| Início | 4x Signature | R$ 950 | ~15% |
| Intensivo | 8x Signature | R$ 1.800 | ~20% |
| Anual | 12x Manutenção | R$ 2.000 | ~17% |

## Cálculo de Renda Mensal

### Cenário Conservador (8 clientes/semana)
- 8 sessões × R$ 280 = R$ 2.240/semana
- Renda mensal: **R$ 8.960**
- Custos: ~R$ 700
- **Lucro líquido: ~R$ 8.260**

### Cenário Ideal (12 clientes/semana)
- 12 sessões × R$ 280 = R$ 3.360/semana
- Renda mensal: **R$ 13.440**
- Custos: ~R$ 1.050
- **Lucro líquido: ~R$ 12.390**

### Cenário Premium (10 clientes/semana, mix)
- 5 Signature (R$ 280) + 3 Premium (R$ 450) + 2 Express (R$ 150)
- Renda semanal: R$ 1.400 + R$ 1.350 + R$ 300 = R$ 3.050
- Renda mensal: **R$ 12.200**
- **Lucro líquido: ~R$ 11.300**

## Estratégia de Precificação

### Posicionamento Premium
- Nunca competir por preço — competir por valor
- A experiência Omotenashi justifica o ticket alto
- Certificação internacional agrega credibilidade
- Depoimentos e antes/depois são a melhor propaganda

### Estratégia de Entrada
1. Primeira sessão com 30% de desconto (isca)
2. Apresentar pacote no final da primeira sessão
3. Oferecer bônus (mini Gua Sha) no pacote de 8 sessões
4. Programa de indicação: 10% de desconto para quem indica`,
        quiz: [
          {
            pergunta: "Qual a margem média de lucro de uma sessão Signature?",
            opcoes: ["~50%", "~70%", "~80%", "~93%"],
            respostaCorreta: 3,
            explicacao: "A sessão Signature tem margem de ~93% — custo direto de R$ 10-21 contra preço de R$ 280, demonstrando o alto valor agregado."
          },
          {
            pergunta: "No cenário conservador (8 clientes/semana), qual o lucro mensal?",
            opcoes: ["R$ 3.000", "R$ 5.000", "R$ 8.260", "R$ 12.000"],
            respostaCorreta: 2,
            explicacao: "Com 8 clientes semanais a R$ 280, a renda é R$ 8.960 - R$ 700 de custos = R$ 8.260 de lucro líquido mensal."
          }
        ],
        checklist: [
          "Calcular custo direto por sessão",
          "Definir tabela de preços (Express, Signature, Premium)",
          "Criar pacotes com desconto progressivo",
          "Projetar renda mensal nos 3 cenários",
          "Implementar estratégia de entrada (primeira sessão)"
        ]
      },
      {
        titulo: "Marketing, Certificação & Bônus",
        descricao: "Marketing digital, certificação internacional, grupo exclusivo e módulos extras",
        duracaoMinutos: 50,
        conteudo: `# Marketing Digital & Certificação Internacional

## Marketing Digital para Yūgen FaceSPA

### Instagram (Canal Principal)
- **Reels**: Antes/depois em 15 segundos (maior alcance)
- **Stories**: Bastidores da sessão (humaniza)
- **Carrossel**: Educação sobre Kobido, tsubos, benefícios
- **Lives**: Q&A sobre massagem facial, cuidados em casa

### Conteúdo que Converte

| Tipo | Exemplo | Frequência |
| Antes/Depois | Foto side-by-side com consentimento | 2x/semana |
| Educacional | "Você sabia que o masseter é o músculo mais forte?" | 3x/semana |
| Bastidores | Preparação do ambiente, óleos, pedras | 1x/semana |
| Depoimento | Vídeo curto da cliente após a sessão | 1x/semana |
| Promoção | Pacotes, primeira sessão, indicação | 1x/quinzena |

### Hashtags Estratégicas
- #YugenFaceSPA #MassagemFacial #KobidoBrasil
- #LiftingNatural #GuaShaFacial #EstéticaOriental
- #BelezaNatural #RejuvenescimentoNatural #FacialSpa

### Google Meu Negócio
- Cadastrar com fotos profissionais
- Solicitar avaliações de clientes
- Responder todos os comentários
- Manter horários atualizados

## Certificação Internacional

### O que inclui
- Certificado emitido diretamente do Japão
- Credibilidade no mercado premium
- Diferenciação competitiva imediata
- Autorização para usar a marca "Yūgen FaceSPA"

### Requisitos para Certificação
1. Conclusão de todos os módulos do curso
2. Aprovação nos quizzes (mínimo 70%)
3. Vídeo prático demonstrando o protocolo completo
4. Adesão ao código de ética Yūgen

## Bônus Exclusivos do Curso

### ✅ Grupo Privado de Alunas
- Networking com +5.000 profissionais
- Troca de experiências e dicas
- Suporte contínuo da equipe

### ✅ Módulos Extras (Acesso Vitalício)
- Técnicas avançadas da Tailândia
- Protocolos especiais do Vietnã
- Rituais com pedras do Camboja
- Acupressão facial chinesa avançada

### ✅ Suporte Personalizado
- Tire dúvidas por WhatsApp
- Mentoria para os primeiros atendimentos
- Revisão de técnica por vídeo

### ✅ Material de Apoio
- Ficha de anamnese Yūgen (PDF)
- Modelo de contrato/termo de consentimento
- Templates de posts para Instagram
- Planilha de controle financeiro

## Próximos Passos

1. **Revisar** todos os módulos e refazer quizzes
2. **Praticar** cada protocolo 10x antes de atender
3. **Montar** o kit profissional (básico ou premium)
4. **Fotografar** o espaço de trabalho
5. **Criar** perfil profissional no Instagram
6. **Agendar** as primeiras 5 sessões (amigas/família)
7. **Solicitar** a certificação internacional
8. **Lançar** oficialmente o serviço

> "Parabéns! Você agora domina uma técnica exclusiva que pode transformar sua carreira e a vida das suas clientes. 幽玄 — a beleza invisível que transforma." 🏆`,
        quiz: [
          {
            pergunta: "Qual tipo de conteúdo tem maior alcance no Instagram?",
            opcoes: ["Stories", "Fotos estáticas", "Reels (antes/depois em 15s)", "Textos longos"],
            respostaCorreta: 2,
            explicacao: "Reels com antes/depois em 15 segundos têm o maior alcance orgânico no Instagram, demonstrando resultados de forma visual e rápida."
          },
          {
            pergunta: "Qual o requisito mínimo de aprovação nos quizzes para certificação?",
            opcoes: ["50%", "60%", "70%", "90%"],
            respostaCorreta: 2,
            explicacao: "A certificação internacional exige aprovação mínima de 70% nos quizzes, além de conclusão de módulos e vídeo prático."
          }
        ],
        checklist: [
          "Planejar calendário de conteúdo Instagram",
          "Cadastrar no Google Meu Negócio",
          "Entender os requisitos de certificação",
          "Acessar o grupo privado de alunas",
          "Baixar todos os materiais de apoio (PDFs e templates)",
          "Definir data de lançamento oficial do serviço"
        ]
      }
    ]
  }
];
