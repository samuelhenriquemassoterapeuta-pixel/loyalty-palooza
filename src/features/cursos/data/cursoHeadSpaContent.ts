export interface HeadSpaAula {
  titulo: string;
  descricao: string;
  duracaoMinutos: number;
  conteudo: string;
  videoUrl?: string;
  imagemUrl?: string;
  videoAmbientUrl?: string;
  quiz?: {
    pergunta: string;
    opcoes: string[];
    respostaCorreta: number;
    explicacao: string;
  }[];
  checklist?: string[];
}

export interface HeadSpaModulo {
  titulo: string;
  descricao: string;
  icone: string;
  cor: string;
  nivel?: "iniciante" | "intermediario" | "avancado";
  aulas: HeadSpaAula[];
}

export const cursoHeadSpaData: HeadSpaModulo[] = [
  // ─── MÓDULO 1 ── Fundação & Ciência ─────────────────────────
  {
    titulo: "1. Fundação & Ciência do Couro Cabeludo",
    descricao: "Origem, anatomia, diagnóstico com microcâmera e biotipos capilares",
    icone: "BookOpen",
    cor: "from-sky-50 to-blue-50",
    nivel: "iniciante",
    aulas: [
      // ── 0-0 ──
      {
        titulo: "O que é Head SPA Coreano?",
        descricao: "História, filosofia K-beauty e os 5 pilares do ritual 두피 스파",
        duracaoMinutos: 15,
        conteudo: `## O Ritual Head SPA Coreano (두피 스파)

O Head SPA é um tratamento capilar e craniano originário da Coreia do Sul que combina técnicas tradicionais de massagem oriental com ciência dermatológica moderna. O conceito de "scalp care" (두피 관리) surgiu nos salões de Gangnam (Seul) no início dos anos 2000 e se tornou um fenômeno global, liderando o mercado de tratamentos capilares premium — crescimento de 340 % desde 2020.

> "O couro cabeludo saudável é a fundação do cabelo bonito" — Princípio fundamental K-beauty

### Diferenças do SPA Capilar Convencional

| Head SPA Coreano | SPA Capilar Tradicional |
| Ritual multissensorial completo | Tratamento focado apenas no cabelo |
| Análise microscópica do couro cabeludo | Avaliação visual simples |
| Massagem craniana terapêutica profunda | Massagem superficial |
| Protocolos personalizados por biotipo | Protocolo único para todos |
| Ingredientes K-beauty de alta performance | Produtos genéricos |
| Experiência ASMR e relaxamento | Foco apenas estético |

### Os 5 Pilares do Head SPA

- **Análise**: Diagnóstico com microcâmera do couro cabeludo
- **Purificação**: Limpeza profunda com esfoliação enzimática
- **Massagem**: Técnicas de acupressão craniana (지압)
- **Nutrição**: Tratamentos com ingredientes ativos coreanos
- **Aromaterapia**: Vapor com óleos essenciais terapêuticos

### Mercado Global — Por que investir?

- Resultado visível desde a primeira sessão
- Experiência sensorial incomparável (ASMR real)
- Tratamento holístico: mente + couro cabeludo + cabelo
- Forte apelo visual para redes sociais
- Alto ticket médio com excelente margem (R$ 250-600 por sessão)
- Fidelização natural: cliente retorna a cada 3-4 semanas

### Linha do Tempo do Head SPA

- **2003**: Primeiros salões especializados em Gangnam, Seul
- **2010**: Expansão para Japão e Sudeste Asiático
- **2018**: Boom global via TikTok e YouTube ASMR
- **2022**: Chegada ao Brasil como serviço premium
- **2025**: Consolidação como serviço essencial em estéticas e salões`,
        quiz: [
          {
            pergunta: "Qual é o princípio fundamental do Head SPA Coreano?",
            opcoes: [
              "Tratar apenas a estética do cabelo",
              "O couro cabeludo é uma extensão da pele facial",
              "Usar apenas produtos importados da Coreia",
              "Focar exclusivamente na massagem craniana"
            ],
            respostaCorreta: 1,
            explicacao: "O Head SPA Coreano trata o couro cabeludo com o mesmo cuidado dedicado à pele facial, considerando-o a fundação para cabelos saudáveis."
          },
          {
            pergunta: "Em que década surgiu o conceito de 'scalp care' nos salões de Gangnam?",
            opcoes: ["Anos 1990", "Anos 2000", "Anos 2010", "Anos 2020"],
            respostaCorreta: 1,
            explicacao: "O conceito de scalp care surgiu nos salões de Gangnam (Seul) no início dos anos 2000."
          }
        ],
        checklist: [
          "Entender os 5 pilares do Head SPA",
          "Diferenciar Head SPA de SPA capilar convencional",
          "Conhecer a origem na cultura K-beauty",
          "Identificar os diferenciais competitivos do serviço",
          "Compreender o potencial de mercado e fidelização"
        ]
      },
      // ── 0-1 ──
      {
        titulo: "Anatomia do Couro Cabeludo",
        descricao: "Camadas SCALP, irrigação, ciclo capilar e pontos de acupressão",
        duracaoMinutos: 18,
        conteudo: `## Anatomia Aplicada ao Head SPA

### Camadas do Couro Cabeludo — Acrônimo SCALP

- **S** — Skin (Pele): Camada mais externa com folículos pilosos
- **C** — Connective tissue (Tecido conjuntivo): Rica em vasos sanguíneos e nervos
- **A** — Aponeurosis (Aponeurose): Membrana fibrosa que conecta os músculos frontal e occipital
- **L** — Loose areolar tissue (Tecido areolar frouxo): Permite mobilidade do couro cabeludo
- **P** — Pericranium (Pericrânio): Membrana sobre o osso craniano

### Dados Essenciais

| Parâmetro | Valor |
| Folículos capilares | 100.000–150.000 |
| Fluxo sanguíneo | 15 % do débito cardíaco |
| Terminações nervosas | > 600 / cm² |
| Temperatura ideal | 32–34 °C |
| Espessura normal do fio | > 60 μm |

### Pontos de Acupressão Craniana (지압점)

- **Baihui (백회)**: Topo da cabeça — equilíbrio energético geral
- **Taiyang (태양)**: Têmporas — alívio de cefaleia e tensão ocular
- **Fengchi (풍지)**: Base do crânio — relaxamento profundo da nuca
- **Yintang (인당)**: Entre as sobrancelhas — calma mental, insônia
- **Sishencong (사신총)**: 4 pontos ao redor do Baihui — estimulação capilar direta

### Ciclo de Crescimento Capilar

- **Anágena** (2-7 anos): Fase de crescimento ativo — 85 % dos fios
- **Catágena** (2-3 semanas): Fase de transição — 1 % dos fios
- **Telógena** (3-4 meses): Fase de repouso e queda — 14 % dos fios

> Objetivo do Head SPA: Prolongar a fase anágena e nutrir o folículo para fios mais fortes e saudáveis.

### Músculos do Escalpe

- **Frontal (frontalis)**: Elevação das sobrancelhas — tensão frequente
- **Occipital (occipitalis)**: Base do crânio — acúmulo de estresse
- **Temporal**: Lateral — bruxismo e cefaleia tensional
- **Auricular**: Região auricular — ponto de relaxamento`,
        quiz: [
          {
            pergunta: "O que significa a letra 'A' no acrônimo SCALP?",
            opcoes: ["Artéria", "Aponeurose", "Areolar", "Adiposo"],
            respostaCorreta: 1,
            explicacao: "A letra 'A' refere-se à Aponeurose (Aponeurosis), a membrana fibrosa que conecta os músculos frontal e occipital."
          },
          {
            pergunta: "Qual ponto de acupressão é específico para estimulação capilar?",
            opcoes: ["Taiyang", "Yintang", "Sishencong", "Fengchi"],
            respostaCorreta: 2,
            explicacao: "Os 4 pontos Sishencong, ao redor do Baihui, são específicos para estimulação do crescimento capilar."
          }
        ],
        checklist: [
          "Memorizar as 5 camadas SCALP",
          "Localizar os 5 pontos de acupressão craniana",
          "Entender o ciclo de crescimento capilar (anágena/catágena/telógena)",
          "Identificar os músculos do escalpe e sua relação com tensão"
        ]
      },
      // ── 0-2 ──
      {
        titulo: "Biotipos Capilares e Diagnóstico com Microcâmera",
        descricao: "Classificação coreana dos 6 biotipos e protocolo de análise digital",
        duracaoMinutos: 16,
        conteudo: `## Sistema de Diagnóstico K-Beauty para Couro Cabeludo

### Classificação Coreana de Biotipos (두피 유형)

### Tipo 1: 건성 두피 (Seco)
- Descamação fina e esbranquiçada, sensação de repuxamento
- Protocolo: Hidratação intensiva com ceramidas e ácido hialurônico

### Tipo 2: 지성 두피 (Oleoso)
- Brilho excessivo em < 12 h após lavagem, folículos obstruídos por sebo
- Protocolo: Limpeza enzimática + niacinamida para regulação sebácea

### Tipo 3: 민감성 두피 (Sensível)
- Vermelhidão, coceira, ardência e reação a químicos
- Protocolo: Centella Asiatica + ingredientes calmantes, toque suave

### Tipo 4: 복합성 두피 (Misto)
- Zona T oleosa, laterais e nuca secas
- Protocolo: Tratamento por zonas com produtos diferenciados

### Tipo 5: 비듬성 두피 (Com Caspa)
- Descamação visível, flocos amarelados ou brancos
- Protocolo: Esfoliação salicílica + antifúngico natural (tea tree)

### Tipo 6: 탈모 두피 (Com Queda)
- Miniaturização dos fios, afinamento progressivo
- Protocolo: Estimulação folicular + peptídeos de crescimento

## Análise com Microcâmera (두피 진단)

A análise com microcâmera (60-200x de ampliação) avalia:

| Parâmetro | Normal |
| Densidade folicular | 2-4 fios por folículo |
| Estado do poro | Aberto e limpo |
| Hidratação | Escala 3-4 de 5 |
| Espessura do fio | > 60 μm |
| Eritema | Ausente |

### Mapeamento por Zonas

- Zona frontal: 3 pontos de captura
- Zona temporal: 2 pontos por lado
- Zona do vértex: 2 pontos (área crítica para queda)
- Zona occipital: 2 pontos

### Ficha de Diagnóstico Head SPA

- [ ] Biotipo identificado
- [ ] Nível de hidratação (1-5)
- [ ] Nível de oleosidade (1-5)
- [ ] Presença de descamação
- [ ] Densidade folicular por zona
- [ ] Queixas do cliente
- [ ] Histórico de químicas (tintura, alisamento)
- [ ] Medicamentos em uso
- [ ] Alergias conhecidas

> Dica: Sempre mostre as imagens da microcâmera ao cliente. Isso gera confiança, demonstra profissionalismo e justifica o investimento.`,
        quiz: [
          {
            pergunta: "Qual biotipo coreano é tratado com Centella Asiatica?",
            opcoes: [
              "건성 (Seco)",
              "지성 (Oleoso)",
              "민감성 (Sensível)",
              "탈모 (Com Queda)"
            ],
            respostaCorreta: 2,
            explicacao: "O couro cabeludo sensível (민감성) é tratado com Centella Asiatica e ingredientes calmantes, com toque suave."
          },
          {
            pergunta: "Qual a ampliação mínima recomendada para a microcâmera?",
            opcoes: ["20x", "60x", "200x", "500x"],
            respostaCorreta: 1,
            explicacao: "A microcâmera para diagnóstico capilar deve ter entre 60x e 200x de ampliação."
          }
        ],
        checklist: [
          "Classificar o biotipo corretamente entre os 6 tipos",
          "Capturar imagens de pelo menos 9 pontos do escalpe",
          "Preencher a ficha de diagnóstico completa",
          "Mostrar imagens da microcâmera ao cliente",
          "Documentar para comparação futura"
        ]
      },
      // ── 0-3 ──
      {
        titulo: "Equipamentos e Montagem do Espaço",
        descricao: "Kit profissional, equipamentos e layout ideal da sala de Head SPA",
        duracaoMinutos: 14,
        conteudo: `## Equipamentos Essenciais para Head SPA

### Kit Inicial — Investimento Estimado

| Equipamento | Faixa de Preço |
| Microcâmera capilar 200x USB/WiFi | R$ 300–800 |
| Vaporizador de ozônio capilar | R$ 400–1.200 |
| Capacete LED capilar (630nm + 830nm) | R$ 500–2.000 |
| Cadeira reclinável ajustável | R$ 800–3.000 |
| Lavatório ergonômico | R$ 1.500–5.000 |
| Kit de produtos (marcas profissionais) | R$ 1.500–3.000 |
| Toalhas de microfibra (20 un.) | R$ 200–400 |
| Difusor de aromas | R$ 100–300 |
| **Total estimado** | **R$ 5.300–15.700** |

### Layout Ideal da Sala

**Zona de Recepção & Diagnóstico**
- Mesa com microcâmera e monitor/tablet
- Iluminação neutra (4000K) para avaliação precisa
- Poltrona confortável para anamnese

**Zona de Tratamento**
- Cadeira/lavatório reclinável a 45°
- Carrinho organizador com produtos na ordem de aplicação
- Vaporizador posicionado ao alcance
- Iluminação regulável (intensa → suave)

**Zona Sensorial**
- Difusor de aromas ativo
- Caixa de som para música ambiente / ASMR
- Iluminação quente (2700K) para relaxamento
- Toalhas aquecidas no aquecedor

### Reposição Mensal de Produtos

- Para 20-30 atendimentos/mês: R$ 300–600
- Compre em kits profissionais (desconto 20-40%)
- Prefira tamanho profissional (500 ml–1 L)
- Importe da Coreia via iHerb ou YesStyle (economia até 50%)

### Checklist de Biossegurança do Espaço

- Esterilização UV dos pentes e acessórios
- Troca de toalhas a cada cliente
- Higienização da microcâmera com álcool 70%
- Luvas descartáveis para procedimentos com ácidos
- Lixeira com pedal para descarte de luvas e algodão`,
        quiz: [
          {
            pergunta: "Qual a temperatura de cor ideal para a zona de diagnóstico?",
            opcoes: ["2700K (quente)", "4000K (neutra)", "5500K (fria)", "6500K (luz do dia)"],
            respostaCorreta: 1,
            explicacao: "A iluminação neutra de 4000K é ideal para avaliação precisa do couro cabeludo sem distorção de cor."
          }
        ],
        checklist: [
          "Adquirir microcâmera capilar profissional",
          "Montar kit de produtos para os 6 biotipos",
          "Organizar layout da sala em 3 zonas",
          "Configurar iluminação regulável",
          "Preparar sistema de som e aromaterapia",
          "Implementar protocolo de biossegurança"
        ]
      }
    ]
  },

  // ─── MÓDULO 2 ── Protocolos Clínicos ─────────────────────────
  {
    titulo: "2. Protocolos Clínicos — O Ritual Completo",
    descricao: "As 5 etapas do Head SPA: da análise à finalização aromática",
    icone: "Target",
    cor: "from-emerald-50 to-teal-50",
    nivel: "iniciante",
    aulas: [
      // ── 1-0 ──
      {
        titulo: "Etapa 1: Análise e Diagnóstico",
        descricao: "Anamnese, inspeção visual e protocolo de microcâmera",
        duracaoMinutos: 12,
        conteudo: `## Protocolo de Análise — Etapa 1

### Duração: 10-15 minutos

### Preparação do Ambiente
- Iluminação neutra (4000K) para avaliação precisa
- Cadeira reclinável a 45°
- Microcâmera calibrada e higienizada
- Ficha de anamnese preparada

### Passo a Passo

**1. Anamnese (5 min)**
- Histórico capilar completo
- Frequência de lavagem e produtos usados em casa
- Queixas principais e expectativas do tratamento
- Medicamentos, alergias e histórico de químicas

**2. Inspeção Visual (3 min)**
- Observar couro cabeludo a olho nu
- Identificar áreas de rarefação e sinais de dermatite
- Avaliar textura e elasticidade dos fios

**3. Análise com Microcâmera (5 min)**
- Zona frontal (3 pontos)
- Zona temporal (2 pontos por lado)
- Zona do vértex (2 pontos)
- Zona occipital (2 pontos)
- Registrar fotos de cada zona para comparação futura

**4. Diagnóstico e Prescrição (2 min)**
- Classificar biotipo entre os 6 tipos coreanos
- Selecionar protocolo adequado
- Explicar ao cliente o que foi encontrado
- Mostrar imagens comparativas de saúde ideal vs. atual

> Dica: O diagnóstico visual é o momento que transforma o Head SPA de "tratamento" em "experiência médica". Use-o para educar e fidelizar.`,
        quiz: [
          {
            pergunta: "Quantos pontos mínimos de captura são recomendados com a microcâmera?",
            opcoes: ["5 pontos", "7 pontos", "9 pontos", "12 pontos"],
            respostaCorreta: 2,
            explicacao: "São recomendados pelo menos 9 pontos: 3 frontais + 4 temporais + 2 vértex + 2 occipitais para mapeamento completo."
          }
        ],
        checklist: [
          "Preparar ambiente com iluminação 4000K",
          "Higienizar microcâmera",
          "Realizar anamnese completa",
          "Inspeção visual de todo couro cabeludo",
          "Capturar imagens de 9+ pontos",
          "Classificar biotipo",
          "Apresentar diagnóstico ao cliente",
          "Definir protocolo personalizado"
        ]
      },
      // ── 1-1 ──
      {
        titulo: "Etapa 2: Limpeza Profunda",
        descricao: "Esfoliação enzimática, pré-lavagem e purificação folicular",
        duracaoMinutos: 14,
        conteudo: `## Protocolo de Limpeza Profunda — Etapa 2

### Duração: 15-20 minutos

### O que a limpeza profunda remove
- Resíduos de produtos (silicones, polímeros)
- Células mortas acumuladas
- Sebo oxidado nos folículos
- Poluição e micropartículas

### Produtos Essenciais

| Produto | Ativos | pH Ideal |
| Esfoliante enzimático | Papaína, bromelina ou ácido salicílico 1-2% | 4.5-5.5 |
| Shampoo limpeza profunda | Cocamidopropil betaína + tea tree | 5.0-5.5 |
| Tônico purificante | Niacinamida + mentol | 5.5-6.0 |

### Passo a Passo

**1. Pré-lavagem com água morna (38°C)**
- Umedecer completamente (2 min)

**2. Aplicação do Esfoliante**
- Dividir em 4 quadrantes
- Aplicar com bico dosador diretamente no couro cabeludo
- Movimentos circulares suaves com polpas dos dedos
- Pressão: 2-3 / 5
- Tempo: 3 min por quadrante

**3. Vapor (opcional mas recomendado)**
- Vapor ozonizado por 5 min
- Potencializa a ação do esfoliante e abre poros foliculares

**4. Emulsificação e Enxágue**
- Adicionar água morna para emulsificar
- Massagear suavemente por 2 min
- Enxaguar completamente

**5. Shampoo de Limpeza**
- Quantidade: moeda de R$ 1
- 1ª aplicação: limpar  —  2ª aplicação: tratar
- Finalizar com água fria (selar cutículas)

### Cuidados Importantes

- ❌ Nunca usar unhas — sempre polpas dos dedos
- ❌ Água quente acima de 40°C danifica o couro cabeludo
- ❌ Não esfoliar se houver feridas abertas ou inflamação ativa
- ✅ Ajustar concentração do esfoliante ao biotipo
- ✅ Couro cabeludo sensível: reduzir tempo para 2 min / quadrante`,
        quiz: [
          {
            pergunta: "Qual a temperatura ideal da água para pré-lavagem?",
            opcoes: ["32°C", "38°C", "42°C", "45°C"],
            respostaCorreta: 1,
            explicacao: "A temperatura ideal é 38°C — suficiente para amolecer resíduos sem danificar o couro cabeludo."
          }
        ],
        checklist: [
          "Verificar temperatura da água (38°C)",
          "Umedecer completamente",
          "Aplicar esfoliante nos 4 quadrantes",
          "Massagear com polpas dos dedos (nunca unhas)",
          "Vapor por 5 min (se disponível)",
          "Emulsificar e enxaguar",
          "1ª e 2ª aplicação de shampoo",
          "Finalizar com água fria"
        ]
      },
      // ── 1-2 ──
      {
        titulo: "Etapa 3: Massagem Craniana Terapêutica",
        descricao: "6 técnicas de massagem: effleurage, petrissage, acupressão, fricção, tapotement e tração",
        duracaoMinutos: 20,
        conteudo: `## Protocolo de Massagem Craniana — Etapa 3

### Duração: 20-30 minutos (coração do ritual)

### As 6 Técnicas do Head SPA

**Técnica 1: Effleurage Craniano (쓰다듬기)**
- Deslizamentos longos da linha frontal até a nuca
- Pressão: 2/5 — toque superficial e envolvente
- Ritmo: Sincronizado com a respiração do cliente
- Repetições: 10x em cada direção

**Técnica 2: Petrissage (주무르기)**
- Amassamento com polegares nos músculos temporais, occipitais e frontal
- Pressão: 3-4/5 — firme mas confortável
- Duração: 5 min por região

**Técnica 3: Acupressão (지압)**
- Pressão sustentada de 5-8 segundos em cada ponto
- Sequência: Baihui → Sishencong → Taiyang → Fengchi
- 3 ciclos completos

**Técnica 4: Fricção Circular (문지르기)**
- Movimentos circulares pequenos (2-3 cm) com polpas
- Cobertura total do couro cabeludo
- Estimula microcirculação

**Técnica 5: Tapotement (두드리기)**
- Batidas leves e rápidas com ponta dos dedos
- 30 segundos por zona — sensação ASMR

**Técnica 6: Tração Capilar (당기기)**
- Segurar mechas na raiz e tracionar suavemente para cima
- Manter 3-5 segundos, cobrir toda a cabeça

### Sequência Recomendada (26 min)

1. Effleurage — aquecimento (3 min)
2. Petrissage temporal bilateral (3 min)
3. Petrissage occipital (3 min)
4. Acupressão — 3 ciclos (5 min)
5. Fricção circular — cobertura total (5 min)
6. Tração capilar (3 min)
7. Tapotement (2 min)
8. Effleurage final — finalização (2 min)

### Contraindicações

- ❌ Feridas abertas ou suturas recentes
- ❌ Infecções ativas (foliculite, micose)
- ❌ Hipertensão não controlada
- ❌ Enxaqueca em crise aguda
- ❌ Pós-operatório craniano recente`,
        quiz: [
          {
            pergunta: "Qual técnica de massagem produz a sensação ASMR?",
            opcoes: ["Effleurage", "Petrissage", "Tapotement", "Tração capilar"],
            respostaCorreta: 2,
            explicacao: "O Tapotement (두드리기) com batidas leves e rápidas cria a sensação ASMR, diferencial do Head SPA Coreano."
          },
          {
            pergunta: "Qual a duração ideal de pressão sustentada na acupressão?",
            opcoes: ["1-2 segundos", "5-8 segundos", "15-20 segundos", "30 segundos"],
            respostaCorreta: 1,
            explicacao: "A pressão sustentada de 5-8 segundos em cada ponto é o tempo ideal para ativar a resposta terapêutica."
          }
        ],
        checklist: [
          "Aquecer as mãos antes de iniciar",
          "Effleurage de aquecimento (3 min)",
          "Petrissage temporal e occipital",
          "Acupressão nos 5 pontos-chave — 3 ciclos",
          "Fricção circular completa",
          "Tração capilar suave",
          "Tapotement ASMR",
          "Effleurage de finalização",
          "Perguntar feedback ao cliente"
        ]
      },
      // ── 1-3 ──
      {
        titulo: "Etapa 4: Tratamentos Nutritivos",
        descricao: "Ingredientes-estrela K-beauty, máscaras e protocolos por biotipo",
        duracaoMinutos: 16,
        conteudo: `## Protocolo de Nutrição — Etapa 4

### Duração: 15-20 minutos

### Ingredientes-Estrela K-Beauty

| Ingrediente | Ação | Indicação | Concentração |
| Centella Asiatica (병풀) | Anti-inflamatória, cicatrizante | Sensível, dermatite | 0.5-2% |
| Ginseng Vermelho (홍삼) | Estimulação folicular, antioxidante | Queda, afinamento | 1-3% |
| Niacinamida (B3) | Regulação sebácea, barreira | Oleoso, misto | 2-5% |
| Ácido Hialurônico | Hidratação profunda | Seco, desidratado | BPM |
| Peptídeos de Cobre | Regeneração celular | Alopecia inicial | 0.1-1% |
| Camélia (동백) | Nutrição, brilho | Fios danificados | Óleo puro |

### Protocolos por Biotipo

**Protocolo Hidratação (건성)**
1. Sérum de Ácido Hialurônico no couro cabeludo
2. Máscara de Camélia nos fios
3. Vapor por 10 min
4. Enxágue parcial (manter 20% do produto)

**Protocolo Purificação (지성)**
1. Tônico de Niacinamida
2. Ampola de Tea Tree + Mentol
3. Compressa fria por 5 min
4. Enxágue completo

**Protocolo Crescimento (탈모)**
1. Ampola de Peptídeos de Cobre
2. Sérum de Ginseng Vermelho
3. Massagem de ativação (5 min extra)
4. LED vermelho (se disponível) por 10 min

**Protocolo Calmante (민감성)**
1. Sérum de Centella Asiatica
2. Máscara calmante com Aloe Vera
3. Compressa morna com camomila
4. Toque mínimo — sem fricção

### Combinações Sinérgicas

- ✅ Centella + Niacinamida (calmante + barreira)
- ✅ Ginseng + Peptídeos (estimulação + regeneração)
- ✅ Camélia + Arroz (nutrição + fortalecimento)
- ❌ AHA/BHA + Retinol/Bakuchiol (irritação)
- ❌ Vitamina C + Niacinamida em alta concentração`,
        quiz: [
          {
            pergunta: "Qual ingrediente é ideal para estimulação folicular?",
            opcoes: ["Ácido Hialurônico", "Niacinamida", "Ginseng Vermelho", "Centella Asiatica"],
            respostaCorreta: 2,
            explicacao: "O Ginseng Vermelho (홍삼) é um antioxidante potente que estimula os folículos capilares."
          }
        ],
        checklist: [
          "Selecionar protocolo adequado ao biotipo",
          "Preparar produtos na ordem de aplicação",
          "Aplicar ativos no couro cabeludo",
          "Aplicar máscara nos fios (se necessário)",
          "Tempo de pausa com vapor ou compressa",
          "Massagem de ativação (se protocolo crescimento)",
          "Enxaguar conforme protocolo",
          "Verificar satisfação do cliente"
        ]
      },
      // ── 1-4 ──
      {
        titulo: "Etapa 5: Aromaterapia e Finalização",
        descricao: "Vapor aromático, secagem terapêutica e orientações de home care",
        duracaoMinutos: 12,
        conteudo: `## Protocolo de Aromaterapia e Finalização — Etapa 5

### Duração: 10-15 minutos

### Blends Aromáticos por Objetivo

| Objetivo | Blend (em gotas) |
| Relaxamento | 3 lavanda + 2 cedro + 1 ylang-ylang |
| Crescimento | 3 alecrim + 2 hortelã-pimenta + 1 cedro |
| Purificação | 3 tea tree + 2 limão + 1 hortelã-pimenta |
| Hidratação | 3 ylang-ylang + 2 lavanda + 1 camomila |

### Aplicação do Vapor Aromático

1. Adicionar blend ao vaporizador ou toalha quente
2. Envolver a cabeça do cliente com toalha
3. Manter por 5-7 minutos
4. Ambiente com luz baixa (2700K) e música suave

### Secagem Terapêutica

- Secador em temperatura morna (nunca quente)
- Distância mínima de 15 cm do couro cabeludo
- Movimentos do couro cabeludo para as pontas
- Jato frio final para selar cutículas

### Orientações de Home Care (홈케어)

Entregar ao cliente um mini-guia personalizado:
- Frequência ideal de lavagem para seu biotipo
- Produtos recomendados para manutenção
- Intervalos sugeridos entre sessões (3-4 semanas)
- Técnica de automassagem caseira simples (3 min/dia)
- Alimentos benéficos para saúde capilar

> O pós-atendimento é onde se constrói a fidelização. O cliente que leva orientações para casa volta com mais frequência.

### Protocolos Sazonais — Resumo

- 🌸 **Primavera**: Detox pós-inverno (Chá verde + Centella) — 75 min
- ☀️ **Verão**: Controle de oleosidade (Niacinamida + Mentol) — 70 min
- 🍂 **Outono**: Combater queda sazonal (Ginseng + Peptídeos) — 80 min
- ❄️ **Inverno**: Hidratação intensiva (Hialurônico + Camélia) — 80 min`,
        quiz: [
          {
            pergunta: "Qual blend aromático é indicado para crescimento capilar?",
            opcoes: [
              "Lavanda + cedro + ylang-ylang",
              "Alecrim + hortelã-pimenta + cedro",
              "Tea tree + limão + hortelã-pimenta",
              "Ylang-ylang + lavanda + camomila"
            ],
            respostaCorreta: 1,
            explicacao: "Alecrim + hortelã-pimenta + cedro estimulam circulação e ativam folículos capilares."
          }
        ],
        checklist: [
          "Preparar blend aromático adequado",
          "Aplicar vapor ou toalha aromática (5-7 min)",
          "Secar com temperatura morna, 15 cm de distância",
          "Aplicar leave-in nos comprimentos",
          "Entregar orientações de home care",
          "Agendar próxima sessão",
          "Solicitar feedback / avaliação"
        ]
      }
    ]
  },

  // ─── MÓDULO 3 ── Escolas e Técnicas Avançadas ─────────────────────────
  {
    titulo: "3. Escolas Japonesa vs. Coreana & Técnicas Avançadas",
    descricao: "Comparação das escolas, Shiatsu craniano, protocolos para queda e públicos especiais",
    icone: "Layers",
    cor: "from-amber-50 to-orange-50",
    nivel: "intermediario",
    aulas: [
      // ── 2-0 ──
      {
        titulo: "Escola Japonesa vs. Escola Coreana",
        descricao: "Filosofia, técnicas e diferenças práticas entre as duas tradições",
        duracaoMinutos: 18,
        conteudo: `## Escola Japonesa vs. Escola Coreana de Head SPA

### Comparação Detalhada

| Critério | Escola Japonesa | Escola Coreana |
| Filosofia | Wa (和) — Harmonia holística | Ppali-ppali (빨리빨리) — Eficácia + tecnologia |
| Foco | Relaxamento profundo e equilíbrio energético | Diagnóstico científico e resultado visível |
| Diagnóstico | Palpação + observação + anamnese extensa | Microcâmera digital 200x + dados quantificáveis |
| Massagem | Shiatsu craniano (pontos de pressão) | Mix de técnicas (6 modalidades) |
| Produtos | Tsubaki (camélia), matcha, sake, yuzu | Ginseng, centella, niacinamida, peptídeos |
| Duração | 60-90 min (ritmo lento, meditativo) | 50-75 min (ritmo eficiente) |
| Ambiente | Minimalista, tatami, incenso | Moderno, K-beauty, ASMR |
| Público ideal | Busca relaxamento / estresse / insônia | Busca resultado estético + relaxamento |
| Ticket médio | R$ 350-700 | R$ 250-500 |

### Quando usar cada escola

**Preferir Japonesa quando:**
- Cliente busca relaxamento profundo e meditativo
- Queixa principal: estresse, insônia, cefaleia tensional
- Sessão premium com mais tempo disponível
- Público acima de 45 anos (preferem ritmo lento)

**Preferir Coreana quando:**
- Cliente busca resultado estético visível
- Queixa principal: oleosidade, queda, caspa
- Disponibilidade de 50-75 min
- Público jovem (MZ Generation: millennials + Gen Z)
- Quer ver dados da microcâmera

**Fusão (recomendado):**
- Diagnóstico coreano (microcâmera) + Massagem japonesa (Shiatsu)
- Produtos coreanos (eficácia) + Ambiente japonês (serenidade)
- Combine o melhor das duas escolas para um serviço único`,
        quiz: [
          {
            pergunta: "Qual filosofia guia a escola japonesa de Head SPA?",
            opcoes: [
              "Ppali-ppali (eficácia rápida)",
              "Wa (harmonia holística)",
              "K-beauty (ciência + beleza)",
              "Wabi-sabi (imperfeição)"
            ],
            respostaCorreta: 1,
            explicacao: "A escola japonesa é guiada pela filosofia Wa (和) — harmonia holística e equilíbrio energético."
          },
          {
            pergunta: "Para qual público a abordagem coreana é mais indicada?",
            opcoes: [
              "Idosos com insônia",
              "Público MZ Generation (millennials + Gen Z)",
              "Gestantes",
              "Crianças"
            ],
            respostaCorreta: 1,
            explicacao: "A abordagem coreana, com tecnologia e resultado visível, atrai especialmente a MZ Generation."
          }
        ],
        checklist: [
          "Conhecer as diferenças filosóficas entre as escolas",
          "Identificar qual escola se aplica ao perfil do cliente",
          "Saber combinar elementos das duas tradições",
          "Adaptar o ambiente e ritmo ao estilo escolhido"
        ]
      },
      // ── 2-1 ──
      {
        titulo: "Técnicas de Shiatsu Craniano",
        descricao: "Protocolo de Shiatsu japonês aplicado ao Head SPA",
        duracaoMinutos: 20,
        conteudo: `## Shiatsu Craniano para Head SPA

### Fundamentos do Shiatsu (指圧)

O Shiatsu craniano aplica pressão rítmica com os polegares e palmas em meridianos e tsubos (pontos de energia) do crânio. Diferente da acupressão coreana (foco em pontos isolados), o Shiatsu trabalha em sequências contínuas ao longo dos meridianos.

### Meridianos Cranianos Principais

- **Meridiano da Bexiga (足太陽膀胱経)**: Linha central do crânio → nuca
- **Meridiano da Vesícula Biliar (足少陽胆経)**: Temporal → atrás da orelha
- **Meridiano do Estômago (足陽明胃経)**: Frontal → zigomático
- **Du Mai (督脈)**: Linha central posterior (governador)

### Protocolo de Shiatsu Craniano (20 min)

**Fase 1: Abertura (3 min)**
- Palmas sobre o topo da cabeça (mão em concha)
- Pressão suave e uniforme — 3 respirações profundas
- Intenção: conexão energética com o cliente

**Fase 2: Linha Central (5 min)**
- Polegares alternados do ponto Yintang até o Baihui
- Pressão: 3/5, mantida por 3 segundos cada ponto
- Espaçamento: 1 dedo entre cada ponto
- Repetir 3x

**Fase 3: Temporal Bilateral (5 min)**
- Quatro dedos sobre a região temporal
- Pressão circular lenta (2-3 rpm)
- Descer do topo da orelha até o lobo
- Incluir ponto Taiyang com pressão sustentada

**Fase 4: Occipital e Nuca (5 min)**
- Polegares na base do crânio (ponto Fengchi)
- Pressão profunda 4/5 por 8 segundos
- Deslizar ao longo da linha occipital
- Incluir trapézio superior

**Fase 5: Fechamento (2 min)**
- Retornar palmas ao topo da cabeça
- Pressão decrescente gradual
- Finalizar com toque leve (quase sem pressão)
- Silêncio por 30 segundos

### Shiatsu vs. Acupressão Coreana

| Shiatsu Japonês | Acupressão Coreana |
| Sequências contínuas em meridianos | Pontos isolados específicos |
| Pressão com polegares e palmas | Pressão com dedos indicador e médio |
| Ritmo respiratório (sincronizado) | Ritmo técnico (cronometrado) |
| Objetivo energético | Objetivo fisiológico |`,
        quiz: [
          {
            pergunta: "Qual a principal diferença entre Shiatsu e acupressão coreana?",
            opcoes: [
              "Shiatsu usa agulhas, acupressão usa dedos",
              "Shiatsu trabalha meridianos contínuos, acupressão foca pontos isolados",
              "Shiatsu é mais rápido",
              "Não há diferença significativa"
            ],
            respostaCorreta: 1,
            explicacao: "O Shiatsu trabalha em sequências contínuas ao longo dos meridianos, enquanto a acupressão coreana foca em pontos isolados específicos."
          }
        ],
        checklist: [
          "Localizar os 4 meridianos cranianos principais",
          "Praticar as 5 fases do protocolo de Shiatsu",
          "Dominar pressão com polegares e palmas",
          "Sincronizar ritmo com a respiração do cliente",
          "Saber diferenciar de acupressão coreana"
        ]
      },
      // ── 2-2 ──
      {
        titulo: "Protocolos para Queda Capilar e Sensibilidade",
        descricao: "Protocolos avançados para alopecia, miniaturização e couro cabeludo reativo",
        duracaoMinutos: 18,
        conteudo: `## Protocolos Avançados — Queda Capilar

### Protocolo Anti-Queda Intensivo (90 min)

**Fase 1: Diagnóstico Avançado (15 min)**
- Microcâmera em 12 pontos (incluindo zonas de miniaturização)
- Teste de tração: segurar 60 fios e puxar suavemente — normal ≤ 6 fios soltos
- Pull test positivo = queda ativa → protocolo intensivo
- Classificação: Hamilton-Norwood (homens) / Ludwig (mulheres)

**Fase 2: Limpeza Específica (15 min)**
- Esfoliante com ácido salicílico 2% + zinco piritiona
- Foco nos folículos obstruídos e zonas de miniaturização
- Vapor ozonizado por 7 min

**Fase 3: Estimulação Intensiva (30 min)**
- Massagem de fricção circular prolongada (10 min)
- Acupressão focada em Sishencong + Baihui (5 min)
- Aplicação de ampola de peptídeos de cobre
- Sérum de ginseng vermelho fermentado
- LED vermelho 630nm por 10 min

**Fase 4: Nutrição e Selagem (15 min)**
- Máscara de biotina + pantenol
- Vapor aromático (alecrim + cedro)
- Sérum leave-in de crescimento

**Fase 5: Orientações (15 min)**
- Suplementação: biotina 5000 mcg + zinco + ferro (orientar médico)
- Alimentação: proteínas, omega-3, vitamina D
- Frequência: sessões quinzenais por 3 meses
- Evitar: calor excessivo, tração, químicas agressivas

### Protocolo Sensibilidade e Recuperação

**Para couro cabeludo reativo / pós-químico / pós-parto:**

- Limpeza com shampoo pH 5.5, sem fragrância
- Massagem ultraleve: apenas effleurage (pressão 1-2/5)
- Centella Asiatica + Aloe Vera + Madecassosídeo
- Sem vapor (risco de vasodilatação em pele sensível)
- Compressa fria com camomila
- Frequência: 1x por mês, avaliando tolerância

### Protocolo Pós-Quimioterapia

- ⚠️ Iniciar apenas 3 meses após término do tratamento
- Toque ultraleve, sem tração
- Foco em hidratação e conforto emocional
- Ingredientes suaves: aveia coloidal, alantoína
- Supervisão médica obrigatória`,
        quiz: [
          {
            pergunta: "No teste de tração, quantos fios soltos indicam queda ativa?",
            opcoes: ["≤ 2 fios", "≤ 6 fios", "> 6 fios", "> 20 fios"],
            respostaCorreta: 2,
            explicacao: "Se mais de 6 fios soltam no teste de tração (60 fios), indica queda ativa e necessidade de protocolo intensivo."
          }
        ],
        checklist: [
          "Realizar teste de tração corretamente",
          "Classificar tipo de alopecia (Hamilton/Ludwig)",
          "Aplicar protocolo anti-queda em 5 fases",
          "Conhecer protocolo para couro cabeludo sensível",
          "Entender contraindicações pós-quimioterapia",
          "Orientar suplementação e alimentação"
        ]
      },
      // ── 2-3 ──
      {
        titulo: "Públicos Especiais e Água Gaseificada",
        descricao: "Adaptações para gestantes, crianças, idosos e técnica de lavagem carbonatada",
        duracaoMinutos: 16,
        conteudo: `## Head SPA para Públicos Especiais

### Gestantes

- ⚠️ Evitar: óleos essenciais no 1º trimestre
- ⚠️ Evitar: posição 100% reclinada (compressão da veia cava)
- ✅ Posição: Semi-sentada (30-45°)
- ✅ Massagem suave, sem acupressão em pontos proibidos
- ✅ Produtos: hipoalergênicos, sem parabenos, sem fragrância forte
- ✅ Duração reduzida: máximo 45 min

### Crianças (6-12 anos)

- Sessão lúdica e adaptada (máximo 30 min)
- Produtos infantis pH neutro
- Massagem suave e divertida
- Sem esfoliação agressiva
- Foco: higiene + relaxamento + momento especial

### Idosos (65+)

- Pele mais fina e sensível — pressão reduzida (1-2/5)
- Cuidado com fragilidade capilar (fios brancos são mais quebradiços)
- Sessão mais longa para relaxamento (60-75 min)
- Atenção: medicamentos anticoagulantes (evitar pressão forte)
- Ambiente especialmente confortável e aquecido

### Homens — Abordagem Masculina

- Foco em queda capilar e oleosidade (queixas principais)
- Linguagem direta e objetiva
- Mostrar dados da microcâmera (evidência visual convence)
- Marketing: "tratamento capilar masculino" (evitar "spa")
- Sessão de 45-60 min (preferem sessões mais curtas)

## Técnica de Água Gaseificada (탄산수 두피 케어)

### O que é?

A lavagem com água carbonatada (CO₂ dissolvido) é uma tendência japonesa/coreana que:
- Remove resíduos 3x mais que água comum
- Dilata vasos capilares → melhora irrigação folicular
- pH levemente ácido (4.5-5.0) → alinha com pH do couro cabeludo
- Sensação refrescante intensa

### Como preparar

1. Água filtrada + pastilha de CO₂ profissional (ou máquina carbonatadora)
2. Temperatura: 35-38°C
3. Concentração: 1000-1500 ppm de CO₂

### Quando usar

- Couro cabeludo oleoso (efeito purificante superior)
- Como pré-lavagem antes do esfoliante
- Sessões premium — diferencial de luxo
- Contraindicação: couro cabeludo com feridas abertas`,
        quiz: [
          {
            pergunta: "Qual posição é recomendada para gestantes durante o Head SPA?",
            opcoes: [
              "Totalmente reclinada",
              "Semi-sentada (30-45°)",
              "Sentada a 90°",
              "Deitada de lado"
            ],
            respostaCorreta: 1,
            explicacao: "Gestantes devem ficar semi-sentadas (30-45°) para evitar compressão da veia cava."
          },
          {
            pergunta: "Qual o benefício principal da lavagem com água carbonatada?",
            opcoes: [
              "Hidratação profunda",
              "Remoção de resíduos 3x maior e vasodilatação",
              "Clareamento dos fios",
              "Eliminação de piolhos"
            ],
            respostaCorreta: 1,
            explicacao: "A água carbonatada remove resíduos 3x mais que água comum e dilata vasos capilares, melhorando a irrigação folicular."
          }
        ],
        checklist: [
          "Conhecer adaptações para gestantes",
          "Adaptar sessão para crianças (lúdica, 30 min)",
          "Reduzir pressão para idosos (1-2/5)",
          "Saber abordar público masculino",
          "Dominar técnica de água gaseificada",
          "Conhecer contraindicações de cada público"
        ]
      }
    ]
  },

  // ─── MÓDULO 4 ── Ingredientes, Marcas & Tendências ─────────────────
  {
    titulo: "4. Ingredientes, Marcas & Tendências 2025-2026",
    descricao: "Top 15 ativos K-beauty, marcas profissionais, onde comprar e tendências globais",
    icone: "Heart",
    cor: "from-pink-50 to-rose-50",
    nivel: "intermediario",
    aulas: [
      // ── 3-0 ──
      {
        titulo: "Top 15 Ingredientes K-Beauty para Head SPA",
        descricao: "Ativos essenciais, avançados e tendências com tabela de compatibilidade",
        duracaoMinutos: 18,
        conteudo: `## Top 15 Ingredientes K-Beauty para Head SPA

### Tier 1 — Essenciais

**1. Centella Asiatica (병풀 추출물)**
- Madecassosídeo + Asiaticosídeo
- Repara barreira, anti-inflamatório natural
- Presente em 80% dos produtos K-beauty para scalp

**2. Ginseng Coreano (인삼)**
- Ginsenosídeos estimulam crescimento capilar
- Antioxidante 4x mais potente que vitamina C
- Versão fermentada tem absorção 3x maior

**3. Extrato de Arroz (쌀 추출물)**
- Inositol fortalece fios — elasticidade +30%
- Água de arroz fermentada (미감수) = segredo ancestral

**4. Camélia Japônica (동백유)**
- Ácido oleico 85% — nutrição sem peso
- Penetração rápida, não obstrui folículos

**5. Chá Verde (녹차)**
- EGCG — catequina antioxidante premium
- Controle da 5-alfa-redutase (anti-queda)
- Proteção UV para couro cabeludo

### Tier 2 — Avançados

**6. Própolis Coreana**: Antibacteriana, cicatrizante
**7. Mel de Manuka**: Hidratação profunda, antibacteriano
**8. Extrato de Bambu**: Sílica natural para fortalecimento
**9. Lama Vulcânica de Jeju (제주 화산토)**: Detox mineral
**10. Água de Cacto (선인장)**: Hidratação extrema

### Tier 3 — Tendências 2025-2026

**11. Bakuchiol**: Alternativa vegetal ao retinol para scalp
**12. Mugwort (쑥)**: Anti-inflamatório tradicional coreano
**13. Fermentados (발효)**: Lactobacillus para microbioma capilar
**14. Peptídeos Biomiméticos**: Cobre + zinco para regeneração
**15. Extrato de Lótus (연꽃)**: Calmante premium, anti-aging

### Tabela de Compatibilidade

| Combinação | Resultado |
| Centella + Niacinamida | ✅ Calmante + barreira |
| Ginseng + Peptídeos | ✅ Estimulação + regeneração |
| Camélia + Arroz | ✅ Nutrição + fortalecimento |
| AHA/BHA + Retinol | ❌ Irritação excessiva |
| Vit. C alta + Niacinamida alta | ❌ Instabilidade |
| Óleos essenciais puros + Sensível | ❌ Risco de reação |`,
        quiz: [
          {
            pergunta: "Qual ingrediente K-beauty está presente em 80% dos produtos para scalp?",
            opcoes: ["Ginseng", "Chá Verde", "Centella Asiatica", "Camélia"],
            respostaCorreta: 2,
            explicacao: "A Centella Asiatica é o ingrediente mais popular em K-beauty para scalp care."
          }
        ],
        checklist: [
          "Memorizar os 5 ingredientes Tier 1",
          "Conhecer indicação de cada ativo por biotipo",
          "Saber combinar e evitar combinações incompatíveis",
          "Acompanhar tendências 2025-2026"
        ]
      },
      // ── 3-1 ──
      {
        titulo: "Melhores Marcas e Onde Comprar",
        descricao: "Guia curado de marcas profissionais coreanas, equipamentos e fornecedores",
        duracaoMinutos: 15,
        conteudo: `## Guia de Marcas Profissionais para Head SPA

### 🏆 Marcas Premium Coreanas

| Marca | Especialidade | Destaque |
| Nard | Tratamento profissional de couro cabeludo | Shampoo esfoliante enzimático |
| Aromatica | Esfoliação e purificação natural | Rosemary Scalp Scaling (EWG Verified) |
| Dr. Groot | Prevenção de queda capilar | Mais vendida de scalp care na Coreia |
| Ryo (려) | Herbal anti-queda com ginseng | Shampoo #1 da Coreia por 10+ anos |
| Lador | Máscaras e tratamentos profissionais | Scalp Scaling Spa |

### 🧴 Ativos e Ampolas

- **SOME BY MI**: AHA/BHA/PHA para esfoliação suave
- **Mise en Scène**: Sérum finalizador (argan + camélia)
- **Cosrx**: Tônicos de centella adaptáveis para scalp

### 🛠️ Equipamentos

| Equipamento | Investimento |
| Microcâmera 200x USB/WiFi | R$ 300-800 |
| Vaporizador de Ozônio | R$ 400-1.200 |
| Capacete LED (630nm + 830nm) | R$ 500-2.000 |

### 🌿 Óleos Essenciais Recomendados

- **doTERRA** (parceiro Resinkra): Pureza CPTG certificada
- **Laszlo**: Marca brasileira de óleos puros com laudo
- **Phytoterápica**: 100% naturais com certificação

### 💡 Dicas de Compra Profissional

- Kit inicial estimado: R$ 1.500-3.000 (produtos + microcâmera)
- Reposição mensal: R$ 300-600 (para 20-30 atendimentos)
- Compre em kits profissionais (desconto 20-40%)
- Prefira tamanho profissional (500 ml-1 L)
- Importe via iHerb ou YesStyle (economia até 50%)

> Monte um kit de demonstração com mini-tamanhos para testar antes de investir em volume profissional.`,
        quiz: [
          {
            pergunta: "Qual marca é a mais vendida de scalp care na Coreia?",
            opcoes: ["Aromatica", "Nard", "Dr. Groot", "Lador"],
            respostaCorreta: 2,
            explicacao: "Dr. Groot é a marca mais vendida de scalp care na Coreia, com linha focada em prevenção de queda com ginseng e centella."
          }
        ],
        checklist: [
          "Pesquisar marcas disponíveis no Brasil",
          "Montar kit inicial de produtos",
          "Adquirir microcâmera capilar profissional",
          "Selecionar óleos essenciais de qualidade",
          "Calcular investimento inicial e custo por atendimento"
        ]
      },
      // ── 3-2 ──
      {
        titulo: "Tendências 2025-2026 e Head SPA Temático",
        descricao: "Micro-tendências globais, Head SPA experiencial e ASMR como diferencial",
        duracaoMinutos: 14,
        conteudo: `## Tendências Globais 2025-2026

### 1. Scalp Microbiome Care (두피 마이크로바이옴)
- Probióticos e prebióticos para equilíbrio da flora capilar
- Testes de microbioma capilar chegando ao mercado
- Protocolos personalizados baseados em DNA folicular

### 2. Blue Light Protection
- Proteção contra luz azul de telas (dano oxidativo ao escalpe)
- Ativos: luteína, astaxantina, extrato de alga marinha

### 3. Neuro-Cosmetics (뉴로 코스메틱)
- Ingredientes que ativam endorfinas via terminações nervosas
- GABA tópico para relaxamento
- CBD para anti-inflamação (onde legal)

### 4. Sustentabilidade K-Beauty
- Embalagens refil, ingredientes upcycled
- Certificação Clean Beauty (EWG, COSMOS)
- Ingredientes cultivados em laboratório (biotecnologia)

### 5. Head SPA + Tecnologia
- IA para análise automática de microcâmera
- Realidade aumentada para mostrar projeção de resultado
- Apps de acompanhamento entre sessões

## Head SPA Temático / Experiencial

### Conceito

Criar experiências temáticas diferencia seu serviço e justifica ticket premium.

### Temas Populares

**🌸 Sakura (봄 벚꽃) — Primavera**
- Produtos com extrato de cerejeira
- Ambiente: pétalas de sakura, música japonesa
- Toalha com aroma de flor de cerejeira

**🌊 Oceano de Jeju (제주 바다) — Verão**
- Lama vulcânica de Jeju + água marinha
- Ambiente: sons do mar, iluminação azul
- Finalização com bruma marinha refrescante

**🍵 Matcha Meditation (말차 명상) — Outono**
- Chá verde matcha como ingrediente principal
- Mini cerimônia do chá antes do tratamento
- Ambiente: incenso, silêncio, ritmo ultra-lento

**❄️ Winter Luxe (겨울 럭셔리) — Inverno**
- Óleos premium: camélia + argan + marula
- Toalhas ultra-aquecidas, chocolate quente
- Massagem estendida (+10 min)

### ASMR como Diferencial

- Filmar trechos (com consentimento) para redes sociais
- Sons de massagem, esfoliação e vapor são virais
- TikTok: #HeadSPA tem 3B+ visualizações
- Investir em microfone ASMR para ambiente`,
        quiz: [
          {
            pergunta: "Qual tendência envolve probióticos para o couro cabeludo?",
            opcoes: [
              "Blue Light Protection",
              "Scalp Microbiome Care",
              "Neuro-Cosmetics",
              "Head SPA + IA"
            ],
            respostaCorreta: 1,
            explicacao: "Scalp Microbiome Care é a tendência que utiliza probióticos e prebióticos para equilibrar a flora capilar."
          }
        ],
        checklist: [
          "Conhecer as 5 tendências para 2025-2026",
          "Planejar ao menos 1 tema sazonal",
          "Considerar ASMR para marketing digital",
          "Avaliar investimento em tecnologia (IA, LED)"
        ]
      }
    ]
  },

  // ─── MÓDULO 5 ── Negócios, Evidências & Certificação ──────────
  {
    titulo: "5. Negócios, Evidências & Certificação",
    descricao: "Precificação, marketing, evidências científicas, ética e certificação final",
    icone: "Award",
    cor: "from-violet-50 to-purple-50",
    nivel: "avancado",
    aulas: [
      // ── 4-0 ──
      {
        titulo: "Precificação e Pacotes",
        descricao: "Estrutura de preços, pacotes e estratégias de upsell",
        duracaoMinutos: 14,
        conteudo: `## Precificação Estratégica para Head SPA

### Estrutura de Preços Sugerida

| Serviço | Duração | Faixa de Preço |
| Head SPA Express | 45 min | R$ 180-280 |
| Head SPA Classic | 60 min | R$ 280-400 |
| Head SPA Premium | 90 min | R$ 400-600 |
| Head SPA Luxe (temático) | 120 min | R$ 600-900 |
| Protocolo Anti-Queda | 90 min | R$ 450-700 |
| Diagnóstico Avulso (microcâmera) | 20 min | R$ 80-150 |

### Pacotes de Fidelização

**Pacote Mensal (mais vendido)**
- 4 sessões Classic / mês = R$ 960 (desconto 15%)
- Ideal para manutenção de resultados

**Pacote Trimestral Anti-Queda**
- 6 sessões quinzenais + 2 diagnósticos = R$ 2.400
- Inclui protocolo completo com LED

**Pacote Experiencial**
- 4 sessões temáticas (1 por estação) = R$ 1.800
- Diferencial: cada sessão é uma experiência única

### Cálculo de Custo por Atendimento

| Item | Custo Estimado |
| Produtos por sessão (60 min) | R$ 25-45 |
| Energia + água | R$ 5-10 |
| Toalhas (lavanderia) | R$ 5-8 |
| Reposição equipamentos | R$ 3-5 |
| **Total por sessão** | **R$ 38-68** |
| **Margem líquida** (sessão R$ 350) | **R$ 282-312 (80-89%)** |

### Estratégias de Upsell

- Diagnóstico com microcâmera como porta de entrada
- Kit home care personalizado (+R$ 80-150)
- Upgrade de Classic para Premium durante a sessão
- Adicional de aromaterapia premium (+R$ 40)
- LED capilar como adicional (+R$ 60)`,
        quiz: [
          {
            pergunta: "Qual a margem líquida aproximada de uma sessão Classic de R$ 350?",
            opcoes: ["50-60%", "65-75%", "80-89%", "90-95%"],
            respostaCorreta: 2,
            explicacao: "Com custo de R$ 38-68 por sessão, a margem líquida fica entre 80-89%, tornando o Head SPA altamente rentável."
          }
        ],
        checklist: [
          "Definir tabela de preços com 3-4 faixas",
          "Criar pelo menos 2 pacotes de fidelização",
          "Calcular custo real por atendimento",
          "Planejar estratégias de upsell",
          "Preparar kit home care para venda"
        ]
      },
      // ── 4-1 ──
      {
        titulo: "Marketing e Captação de Clientes",
        descricao: "Estratégias digitais, conteúdo ASMR e posicionamento de marca",
        duracaoMinutos: 14,
        conteudo: `## Marketing para Head SPA

### Canais de Captação

**Instagram (principal)**
- Reels de ASMR (sons de massagem, esfoliação)
- Antes/Depois com microcâmera (com consentimento)
- Stories do bastidor e processo
- Depoimentos em vídeo de clientes
- Hashtags: #HeadSPA #두피스파 #KBeautyBrasil

**TikTok (crescimento)**
- #HeadSPA tem 3B+ visualizações globais
- Conteúdo ASMR viraliza organicamente
- Behind-the-scenes do ritual completo
- "O que acontece em um Head SPA?" (educativo)

**Google Meu Negócio**
- Categoria: Tratamento capilar
- Fotos profissionais do espaço e procedimento
- Reviews de clientes satisfeitos
- Agendar direto pelo Google

### Estratégia de Conteúdo

**Educativo (40%)**
- Diferenças Head SPA vs. tratamento convencional
- "Como saber se seu couro cabeludo é saudável?"
- Desmistificar: "Head SPA não é lavagem de cabelo"

**Inspiracional (30%)**
- Resultados de microcâmera (antes/depois)
- Depoimentos de transformação
- Rotina de autocuidado K-beauty

**Entretenimento (20%)**
- ASMR de massagem e esfoliação
- Day-in-the-life do profissional
- Curiosidades sobre K-beauty

**Promocional (10%)**
- Pacotes e ofertas sazonais
- Sorteios de sessão
- Parcerias com influenciadoras

### Posicionamento de Marca

- Posicione-se como **especialista**, não generalista
- Use vocabulário coreano (두피 스파, 관리) — gera autoridade
- Ambiente instagramável = marketing orgânico
- Certificação Resinkra no perfil = credibilidade`,
        quiz: [
          {
            pergunta: "Qual tipo de conteúdo deve representar a maior fatia da estratégia?",
            opcoes: ["Promocional", "Entretenimento", "Educativo", "Inspiracional"],
            respostaCorreta: 2,
            explicacao: "Conteúdo educativo (40%) deve ser a maior fatia — posiciona você como especialista e educa o mercado."
          }
        ],
        checklist: [
          "Configurar perfil profissional no Instagram e TikTok",
          "Criar calendário de conteúdo semanal",
          "Investir em fotos e vídeos profissionais do espaço",
          "Coletar depoimentos e resultados (com consentimento)",
          "Cadastrar Google Meu Negócio"
        ]
      },
      // ── 4-2 ──
      {
        titulo: "Evidências Científicas e Biossegurança",
        descricao: "Base científica da massagem craniana, normas sanitárias e protocolos de higiene",
        duracaoMinutos: 16,
        conteudo: `## Evidências Científicas do Head SPA

### Massagem Craniana — Estudos Publicados

| Estudo | Resultado | Referência |
| Koyama et al. (2016) | Massagem de 4 min/dia aumentou espessura capilar em 12 semanas | Eplasty, 16:e8 |
| English & Hillman (2020) | Massagem craniana reduz cortisol em 37% após 20 min | J. Bodywork Mov. Ther. |
| Lim & You (2019) | Scalp massage melhora fluxo sanguíneo em 140% na zona massageada | Dermatol. Ther. |
| Park et al. (2021) | LED 630nm + massagem: crescimento 23% maior que LED isolado | Lasers Med. Sci. |

### Mecanismos de Ação Comprovados

- **Vasodilatação local**: Aumento de fluxo sanguíneo → mais nutrientes ao folículo
- **Redução de cortisol**: Estresse crônico é causa de telogen effluvium
- **Ativação de células dérmicas papilares**: Estímulo mecânico → sinalização de crescimento
- **Relaxamento muscular**: Redução de tensão nos músculos do escalpe

### Limitações e Ética

- ❌ Head SPA NÃO é tratamento médico
- ❌ Não substitui dermatologista ou tricologista
- ❌ Não prometa cura de alopecia avançada
- ✅ É terapia complementar com benefícios comprovados
- ✅ Sempre encaminhe casos graves ao médico

## Biossegurança — Normas ANVISA

### Protocolo de Higienização

| Item | Frequência | Método |
| Microcâmera | A cada cliente | Álcool 70% |
| Pentes e acessórios | A cada cliente | UV + álcool 70% |
| Toalhas | A cada cliente | Lavanderia 60°C |
| Cadeira/lavatório | A cada cliente | Quaternário de amônio |
| Vaporizador | Diário | Vinagre branco + água |
| Ambiente | Diário | Limpeza completa |

### Equipamentos de Proteção

- Luvas descartáveis para procedimentos com ácidos
- Avental descartável ou lavável
- Cabelo preso e máscara (se necessário)

### Documentação Obrigatória

- Alvará de funcionamento da vigilância sanitária
- CNPJ ativo (MEI ou ME)
- Termo de consentimento do cliente
- Ficha de anamnese assinada
- Registro de produtos utilizados (lotes e validades)`,
        quiz: [
          {
            pergunta: "Qual estudo demonstrou que massagem craniana aumenta espessura capilar?",
            opcoes: [
              "English & Hillman (2020)",
              "Koyama et al. (2016)",
              "Park et al. (2021)",
              "Lim & You (2019)"
            ],
            respostaCorreta: 1,
            explicacao: "Koyama et al. (2016) publicou no Eplasty que 4 min/dia de massagem craniana aumentou a espessura capilar em 12 semanas."
          }
        ],
        checklist: [
          "Conhecer os 4 estudos científicos principais",
          "Saber explicar mecanismos de ação ao cliente",
          "Nunca prometer cura — posicionar como terapia complementar",
          "Implementar protocolo de biossegurança completo",
          "Manter documentação obrigatória atualizada"
        ]
      },
      // ── 4-3 ──
      {
        titulo: "Ética Profissional e Certificação",
        descricao: "Código de conduta, limites de atuação, prática supervisionada e certificação Resinkra",
        duracaoMinutos: 12,
        conteudo: `## Ética Profissional em Head SPA

### Código de Conduta

**1. Transparência**
- Informar claramente o que é e o que não é Head SPA
- Nunca prometer resultados impossíveis
- Apresentar preços antes do procedimento

**2. Limites de Atuação**
- Head SPA é estético/terapêutico, NÃO médico
- Não prescrever medicamentos ou suplementos
- Encaminhar ao dermatologista/tricologista quando necessário
- Não diagnosticar doenças — descrever achados visuais

**3. Privacidade e Consentimento**
- Termo de consentimento assinado antes de cada procedimento
- Fotos de microcâmera: consentimento específico para uso em marketing
- Dados do cliente protegidos conforme LGPD
- Ficha de anamnese confidencial

**4. Atualização Contínua**
- Participar de workshops e congressos anualmente
- Acompanhar publicações científicas sobre scalp care
- Testar novos produtos e técnicas regularmente
- Buscar feedback dos clientes para melhoria contínua

### Prática Supervisionada

Antes de atender clientes, pratique:
- [ ] 10 sessões em modelos voluntários
- [ ] 3 sessões gravadas para autoavaliação
- [ ] 1 sessão supervisionada por profissional certificado
- [ ] Ficha de feedback de cada sessão prática

### Certificação Resinkra — Head SPA Coreano

**Requisitos para certificação:**
1. Conclusão de 100% das aulas deste curso
2. Aprovação nos quizzes de todos os módulos
3. Checklist de prática supervisionada completo
4. Compromisso com o código de conduta

**Benefícios do certificado:**
- Selo digital Resinkra para redes sociais e marketing
- Inclusão no diretório de profissionais certificados
- Acesso a atualizações de conteúdo por 12 meses
- Desconto em cursos avançados da plataforma

> 🏆 Parabéns por chegar até aqui! Complete todos os módulos e desbloqueie seu certificado digital de Head SPA Coreano pela Resinkra.`,
        quiz: [
          {
            pergunta: "Quantas sessões práticas em voluntários são recomendadas antes de atender?",
            opcoes: ["3 sessões", "5 sessões", "10 sessões", "20 sessões"],
            respostaCorreta: 2,
            explicacao: "São recomendadas 10 sessões em modelos voluntários para desenvolver confiança e técnica antes de atender clientes."
          },
          {
            pergunta: "O profissional de Head SPA pode prescrever medicamentos?",
            opcoes: [
              "Sim, para queda capilar",
              "Apenas suplementos naturais",
              "Não, deve encaminhar ao médico",
              "Sim, se tiver certificação"
            ],
            respostaCorreta: 2,
            explicacao: "Head SPA é estético/terapêutico, NÃO médico. O profissional não deve prescrever medicamentos — deve encaminhar ao dermatologista/tricologista."
          }
        ],
        checklist: [
          "Ler e se comprometer com o código de conduta",
          "Preparar termo de consentimento para clientes",
          "Completar 10 sessões práticas em voluntários",
          "Gravar 3 sessões para autoavaliação",
          "Buscar 1 sessão supervisionada",
          "Concluir 100% das aulas para certificação"
        ]
      }
    ]
  }
];
