import { type ModuloContent } from "@/data/cursoVendasContent";

export const cursoAromaterapiaData: ModuloContent[] = [
  {
    titulo: "Fundamentos da Aromaterapia",
    descricao: "O que são óleos essenciais, como funcionam e por que doTERRA",
    icone: "Lightbulb",
    cor: "from-violet-50 to-purple-50",
    aulas: [
      {
        titulo: "O que são óleos essenciais?",
        descricao: "Origem, extração e ciência por trás da aromaterapia",
        duracaoMinutos: 12,
        conteudo: `# O que São Óleos Essenciais?

## Definição e Origem

Os óleos essenciais são compostos aromáticos voláteis extraídos de plantas — flores, folhas, cascas, raízes, sementes e resinas. Cada gota contém centenas de compostos químicos naturais que conferem propriedades terapêuticas únicas.

> **Óleos essenciais não são "óleos" no sentido comum.** Não são gordurosos. São substâncias altamente concentradas que evaporam rapidamente e penetram a pele em segundos.

### Métodos de Extração

- **Destilação a vapor** — O método mais comum. Vapor d'água atravessa o material vegetal, carregando os compostos voláteis que são condensados em líquido.
- **Prensagem a frio** — Usado para cítricos (Limão, Laranja, Grapefruit). A casca é prensada mecanicamente.
- **Extração por CO₂** — Método mais moderno, preserva compostos delicados.

### A Ciência da Aromaterapia

Quando você inala um óleo essencial:
1. Moléculas aromáticas entram pelo nariz
2. Receptores olfativos enviam sinais ao **sistema límbico** (centro emocional do cérebro)
3. O sistema límbico influencia **humor, memória, estresse e hormônios**
4. Efeitos mensuráveis em **cortisol, serotonina e frequência cardíaca**

Quando aplicado na pele:
1. Moléculas penetram a epiderme em **20 a 30 segundos**
2. Alcançam a corrente sanguínea em **2 a 5 minutos**
3. Podem ser detectadas em todo o corpo em **20 minutos**

### Por que a Qualidade Importa

> **Nem todo óleo essencial é igual.** Óleos adulterados ou sintéticos não possuem as propriedades terapêuticas dos óleos puros e podem causar reações adversas.

A doTERRA utiliza o protocolo **CPTG (Certified Pure Tested Grade)** que garante:
- Pureza sem aditivos, pesticidas ou contaminantes
- Potência terapêutica testada em laboratório
- Rastreabilidade da fazenda ao frasco
- Testes de terceiros independentes`,
        quiz: [
          {
            pergunta: "Em quanto tempo os óleos essenciais penetram a epiderme?",
            opcoes: ["5 a 10 minutos", "20 a 30 segundos", "1 a 2 horas", "Não penetram a pele"],
            respostaCorreta: 1,
            explicacao: "Óleos essenciais penetram a epiderme em 20 a 30 segundos e alcançam a corrente sanguínea em 2 a 5 minutos."
          },
          {
            pergunta: "Qual método de extração é usado para óleos cítricos?",
            opcoes: ["Destilação a vapor", "Prensagem a frio", "Extração por CO₂", "Maceração em álcool"],
            respostaCorreta: 1,
            explicacao: "Óleos cítricos (Limão, Laranja, Grapefruit) são extraídos por prensagem a frio da casca."
          }
        ],
        checklist: [
          "Compreendi os 3 métodos de extração de óleos essenciais",
          "Entendi como os OE atuam no sistema límbico",
          "Sei explicar a diferença entre OE puros e sintéticos",
          "Conheço o protocolo CPTG da doTERRA"
        ]
      },
      {
        titulo: "Por que doTERRA? O padrão CPTG",
        descricao: "Diferencial de qualidade, sourcing ético e garantia de pureza",
        duracaoMinutos: 10,
        conteudo: `# Por que doTERRA? O Padrão CPTG

## Certified Pure Tested Grade

### O Problema do Mercado

Estima-se que **80% dos óleos essenciais vendidos no mundo são adulterados** — diluídos com óleos carreadores, misturados com fragrâncias sintéticas ou rotulados incorretamente.

### O Protocolo CPTG

A doTERRA submete cada lote a **8 testes rigorosos**:

1. **Espectrometria de massa (GC/MS)** — Identifica cada composto químico
2. **Teste de gravidade específica** — Verifica pureza por densidade
3. **Teste de refração** — Analisa qualidade óptica
4. **Teste de rotação óptica** — Detecta adulterações
5. **Teste de contaminantes** — Pesticidas, metais pesados
6. **Teste microbiológico** — Bactérias, fungos
7. **Teste organoléptico** — Cor, aroma, textura
8. **Teste de estabilidade** — Durabilidade ao longo do tempo

### Co-Impact Sourcing

A doTERRA obtém seus óleos de **mais de 40 países**, priorizando:

- **Origem ideal** — Cada planta cresce melhor em determinado solo e clima
- **Comércio justo** — Pagamento acima do mercado para agricultores
- **Sustentabilidade** — Práticas que preservam o ecossistema local
- **Comunidades** — Projetos sociais nas regiões produtoras

### Exemplos de Sourcing

| Óleo | Origem | Por quê? |
|------|--------|----------|
| Lavanda | Bulgária/França | Altitude e clima ideais |
| Frankincense | Somália/Omã | Árvores Boswellia centenárias |
| Hortelã-pimenta | EUA (Indiana) | Solo rico em minerais |
| Melaleuca | Austrália | Habitat nativo da planta |
| Ylang Ylang | Madagascar | Colheita manual na hora certa |

> **Na clínica:** Quando o cliente pergunta sobre a qualidade, explique o CPTG de forma simples: "Usamos óleos doTERRA porque cada frasco passa por 8 testes de pureza. Você está recebendo o que há de mais puro no mundo."`,
        quiz: [
          {
            pergunta: "Quantos testes de pureza o protocolo CPTG da doTERRA realiza?",
            opcoes: ["3 testes", "5 testes", "8 testes", "12 testes"],
            respostaCorreta: 2,
            explicacao: "O CPTG submete cada lote a 8 testes rigorosos, incluindo espectrometria de massa, contaminantes e microbiologia."
          }
        ],
        checklist: [
          "Memorize os 8 testes do protocolo CPTG",
          "Sei explicar Co-Impact Sourcing ao cliente",
          "Pratiquei a frase: 'Cada frasco passa por 8 testes de pureza'",
          "Conheço a origem dos 5 óleos mais populares"
        ]
      },
      {
        titulo: "Segurança e contraindicações",
        descricao: "Diluição, fotossensibilidade e cuidados essenciais",
        duracaoMinutos: 10,
        conteudo: `# Segurança e Contraindicações

## Regras de Ouro da Aromaterapia Segura

### 1. Diluição é Fundamental

Óleos essenciais são MUITO concentrados. Uma gota de hortelã-pimenta equivale a **28 xícaras de chá de menta**.

**Tabela de Diluição Recomendada:**

| Público | Diluição | Gotas de OE por 10ml de carreador |
|---------|----------|-----------------------------------|
| Adultos (corpo) | 2-3% | 4-6 gotas |
| Adultos (rosto) | 0,5-1% | 1-2 gotas |
| Idosos | 1-2% | 2-4 gotas |
| Crianças 6-12 anos | 1% | 2 gotas |
| Crianças 2-6 anos | 0,5% | 1 gota |
| Gestantes | 0,5-1% | 1-2 gotas |

**Óleos carreadores recomendados:** Óleo de coco fracionado (favorito doTERRA), jojoba, amêndoas doces, semente de uva.

### 2. Óleos Fotossensíveis

Alguns óleos cítricos causam queimaduras se expostos ao sol após aplicação:

- ⚠️ Limão
- ⚠️ Bergamota
- ⚠️ Grapefruit
- ⚠️ Lima
- ⚠️ Laranja Selvagem (Wild Orange)

> **Regra:** Evitar exposição solar por **12 horas** após aplicação tópica desses óleos.

### 3. Contraindicações Gerais

**NÃO usar óleos essenciais em:**
- Bebês menores de 6 meses (sem orientação profissional)
- Dentro dos olhos, ouvidos ou nariz
- Sobre pele irritada ou feridas abertas
- Em animais sem orientação veterinária

**Gestantes — óleos a EVITAR:**
- Alecrim, Salvia, Cedro, Cipreste, Wintergreen
- Usar apenas óleos seguros: Lavanda, Limão, Hortelã-pimenta (com moderação)

### 4. Teste de Sensibilidade

Antes de usar um óleo novo em um cliente:
1. Aplique 1 gota diluída no antebraço
2. Aguarde 15-30 minutos
3. Observe vermelhidão, coceira ou irritação
4. Se houver reação, aplique óleo carreador (NUNCA água)

### 5. Na Prática Clínica

- [ ] Sempre perguntar sobre alergias antes da sessão
- [ ] Verificar medicamentos em uso (interações)
- [ ] Documentar óleos utilizados na ficha do cliente
- [ ] Manter fichas atualizadas com reações observadas`,
        quiz: [
          {
            pergunta: "Qual a diluição recomendada de OE para adultos em massagem corporal?",
            opcoes: ["0,5-1%", "2-3% (4-6 gotas por 10ml)", "5-10%", "Usar puro sem diluição"],
            respostaCorreta: 1,
            explicacao: "Para adultos em massagem corporal, a diluição recomendada é 2-3%, ou 4-6 gotas por 10ml de óleo carreador."
          },
          {
            pergunta: "Por quanto tempo evitar sol após aplicar óleo fotossensível?",
            opcoes: ["2 horas", "6 horas", "12 horas", "24 horas"],
            respostaCorreta: 2,
            explicacao: "Óleos cítricos fotossensíveis exigem 12 horas sem exposição solar após aplicação tópica."
          }
        ],
        checklist: [
          "Imprimi a tabela de diluição para consulta rápida",
          "Memorizei os 5 óleos fotossensíveis",
          "Sei as contraindicações para gestantes",
          "Inclui checklist de alergias na ficha do cliente"
        ]
      }
    ]
  },
  {
    titulo: "Os 15 Óleos Essenciais Populares",
    descricao: "Propriedades, usos e aplicações dos óleos mais utilizados da doTERRA",
    icone: "Heart",
    cor: "from-emerald-50 to-green-50",
    aulas: [
      {
        titulo: "Lavanda, Hortelã-pimenta e Limão — A Tríade Essencial",
        descricao: "Os 3 óleos que todo terapeuta precisa dominar",
        duracaoMinutos: 15,
        conteudo: `# A Tríade Essencial doTERRA

## Os 3 óleos mais versáteis e populares

### 🪻 Lavanda (Lavandula angustifolia)

**O óleo da calma e versatilidade**

- **Propriedades:** Calmante, anti-inflamatório, cicatrizante, analgésico suave
- **Compostos principais:** Linalol, Acetato de Linalila

**Usos na clínica:**
- Redução de ansiedade pré-sessão
- Alívio de tensão muscular leve
- Auxílio ao sono (difusão na sala de espera)
- Queimaduras solares e irritações cutâneas

**Aplicações:**
- **Aromática:** 3-4 gotas no difusor para ambiente relaxante
- **Tópica:** 1-2 gotas nos pulsos e nuca para ansiedade
- **Na massagem:** 3-4 gotas por 10ml de óleo carreador

> **Dica clínica:** Pingue 1 gota de Lavanda nas mãos, esfregue e ofereça ao cliente para inalar no início da sessão. Isso ativa o sistema parassimpático e prepara o corpo para receber o tratamento.

---

### 🌿 Hortelã-pimenta (Mentha piperita)

**O óleo da energia e alívio**

- **Propriedades:** Refrescante, analgésico, descongestionante, energizante
- **Compostos principais:** Mentol, Mentona

**Usos na clínica:**
- Dores de cabeça tensionais
- Tensão muscular e dores articulares
- Fadiga e falta de foco
- Desconforto digestivo (aplicação abdominal)

**Aplicações:**
- **Aromática:** 2-3 gotas para energia e foco
- **Tópica:** 1 gota nas têmporas para dor de cabeça
- **Na massagem:** 2-3 gotas por 10ml (sensação refrescante)

> ⚠️ **Cuidado:** Muito potente! Evitar em crianças pequenas e próximo aos olhos. Sempre diluir.

---

### 🍋 Limão (Citrus limon)

**O óleo da purificação e alegria**

- **Propriedades:** Purificante, desintoxicante, elevador de humor, antisséptico
- **Compostos principais:** Limoneno (até 70%)

**Usos na clínica:**
- Purificação do ar entre atendimentos
- Elevação do humor e energia
- Limpeza de superfícies (1 gota na água)
- Detox em protocolos de drenagem

**Aplicações:**
- **Aromática:** 3-4 gotas para ambiente fresco e limpo
- **Tópica:** Diluído, para sensação tonificante
- **Interna:** 1-2 gotas em água (uso interno aprovado pela doTERRA)

> ⚠️ **Fotossensível!** Não aplicar na pele antes de exposição solar.`,
        quiz: [
          {
            pergunta: "Qual composto principal da Lavanda a torna calmante?",
            opcoes: ["Mentol", "Limoneno", "Linalol e Acetato de Linalila", "Carvacrol"],
            respostaCorreta: 2,
            explicacao: "Os compostos Linalol e Acetato de Linalila são os responsáveis pelas propriedades calmantes da Lavanda."
          },
          {
            pergunta: "A 1 gota de hortelã-pimenta equivale a quantas xícaras de chá de menta?",
            opcoes: ["5 xícaras", "12 xícaras", "28 xícaras", "50 xícaras"],
            respostaCorreta: 2,
            explicacao: "Uma gota de hortelã-pimenta equivale a 28 xícaras de chá de menta, mostrando o quão concentrados são os óleos."
          }
        ],
        checklist: [
          "Sei as propriedades e usos de Lavanda, Hortelã e Limão",
          "Pratiquei a técnica de inalação de Lavanda nas mãos",
          "Conheço as precauções de cada óleo da tríade",
          "Usei a tríade em pelo menos 1 sessão real"
        ]
      },
      {
        titulo: "Melaleuca, Frankincense e Oregano — Imunidade e Proteção",
        descricao: "Óleos poderosos para defesa do organismo",
        duracaoMinutos: 12,
        conteudo: `# Imunidade e Proteção

## Óleos para Defesa Natural

### 🌳 Melaleuca / Tea Tree (Melaleuca alternifolia)

**O óleo da limpeza e proteção**

- **Propriedades:** Antifúngico, antibacteriano, antisséptico, imunoestimulante
- **Compostos principais:** Terpinen-4-ol, γ-Terpineno

**Usos na clínica:**
- Higienização de equipamentos (spray com água)
- Problemas de pele: acne, fungos, irritações
- Reforço imunológico nos pés (reflexologia)
- Purificação do ar

**Aplicações:**
- **Tópica:** 1-2 gotas diluídas em áreas afetadas
- **Na massagem:** 2-3 gotas por 10ml para sessões de reflexologia

---

### ✨ Frankincense / Olíbano (Boswellia carterii)

**O "rei dos óleos essenciais"**

- **Propriedades:** Anti-inflamatório, regenerador celular, calmante profundo, meditativo
- **Compostos principais:** Alfa-pineno, Limoneno, Incensol

**Usos na clínica:**
- O óleo PREMIUM para clientes VIP
- Rejuvenescimento cutâneo e cicatrizes
- Meditação e equilíbrio emocional profundo
- Anti-inflamatório em protocolos de dor crônica

**Aplicações:**
- **Aromática:** 2-3 gotas para meditação e tranquilidade
- **Tópica:** 1-2 gotas no rosto para rejuvenescimento
- **Na massagem:** 3-4 gotas por 10ml para sessões premium

> **Dica de venda:** Frankincense é premium e o cliente percebe. Use em sessões VIP e explique: "Este é o Olíbano, considerado o rei dos óleos essenciais. Usado há milênios em rituais de cura."

---

### 🌿 Oregano (Origanum vulgare)

**O óleo do sistema imunológico**

- **Propriedades:** Antiviral, antibacteriano potente, imunoestimulante
- **Compostos principais:** Carvacrol, Timol

**Usos:**
- Reforço imunológico em épocas de gripe
- Apoio a infecções (uso interno em cápsulas)
- Limpeza profunda do organismo

> ⚠️ **MUITO POTENTE!** Sempre diluir. Pode causar irritação na pele. Não usar em crianças. Uso tópico mínimo e sempre diluído a 1%.`,
        quiz: [
          {
            pergunta: "Por que o Frankincense é chamado de 'rei dos óleos essenciais'?",
            opcoes: ["Por ser o mais barato", "Por suas propriedades regeneradoras, anti-inflamatórias e meditativas", "Por ter o aroma mais forte", "Por ser o mais vendido"],
            respostaCorreta: 1,
            explicacao: "Frankincense possui propriedades regeneradoras celulares, anti-inflamatórias e meditativas únicas, usado há milênios."
          }
        ],
        checklist: [
          "Sei diferenciar Melaleuca, Frankincense e Oregano",
          "Conheço o nível de diluição do Oregano (máx 1%)",
          "Pratiquei aplicação de Frankincense em sessão VIP",
          "Criei spray de Melaleuca para higienização"
        ]
      },
      {
        titulo: "Óleos para Relaxamento e Equilíbrio Emocional",
        descricao: "Ylang Ylang, Vetiver, Bergamota, Cedarwood e Patchouli",
        duracaoMinutos: 12,
        conteudo: `# Relaxamento e Equilíbrio Emocional

## Óleos que Acalmam Corpo e Mente

### 💐 Ylang Ylang (Cananga odorata)

- **Propriedades:** Calmante, afrodisíaco, regulador de pressão arterial
- **Aroma:** Floral intenso, doce, exótico
- **Usos na clínica:** Ansiedade, hipertensão leve, massagem relaxante premium
- **Diluição:** 1-2 gotas por 10ml (aroma forte — usar com moderação)

### 🌾 Vetiver (Vetiveria zizanioides)

- **Propriedades:** Aterramento, foco, calmante profundo
- **Aroma:** Terroso, amadeirado, profundo
- **Usos na clínica:** TDAH, insônia, ansiedade, pós-trauma
- **Diluição:** 1-2 gotas por 10ml
- **Dica:** Excelente para clientes agitados. 1 gota na planta dos pés = aterramento imediato.

### 🍊 Bergamota (Citrus bergamia)

- **Propriedades:** Antidepressivo, ansiolítico, purificante
- **Aroma:** Cítrico floral, fresco, sofisticado
- **Usos na clínica:** Depressão leve, ansiedade, estresse crônico
- **Diluição:** 2-3 gotas por 10ml
- ⚠️ Fotossensível!

### 🌲 Cedarwood / Cedro (Juniperus virginiana)

- **Propriedades:** Calmante, promotor do sono, repelente natural
- **Aroma:** Amadeirado, quente, reconfortante
- **Usos na clínica:** Insônia, tensão nervosa, couro cabeludo (Head Spa!)
- **Diluição:** 3-4 gotas por 10ml

> **Dica Head Spa:** Cedarwood é PERFEITO para sessões de Head Spa. Promove relaxamento profundo e estimula a circulação no couro cabeludo.

### 🌿 Patchouli (Pogostemon cablin)

- **Propriedades:** Anti-inflamatório, cicatrizante, aterramento
- **Aroma:** Terroso, rico, amadeirado-doce
- **Usos na clínica:** Cicatrizes, celulite, equilíbrio emocional
- **Diluição:** 2-3 gotas por 10ml

### Blend Relaxamento Profundo (receita)

- 3 gotas de Lavanda
- 2 gotas de Vetiver
- 1 gota de Ylang Ylang
- 1 gota de Cedarwood
- 15ml de óleo de coco fracionado

> Este blend é ideal para sessões de final de dia quando o cliente chega estressado do trabalho.`,
        quiz: [
          {
            pergunta: "Qual óleo é ideal para 'aterramento imediato' na planta dos pés?",
            opcoes: ["Lavanda", "Limão", "Vetiver", "Hortelã-pimenta"],
            respostaCorreta: 2,
            explicacao: "Vetiver tem propriedades de aterramento profundo. 1 gota na planta dos pés traz calma e foco imediatos."
          }
        ],
        checklist: [
          "Conheço as propriedades de Ylang Ylang, Vetiver, Bergamota, Cedarwood e Patchouli",
          "Preparei o Blend Relaxamento Profundo para uso na clínica",
          "Identifiquei qual óleo emocional é mais útil para meus clientes",
          "Lembro que Bergamota é fotossensível"
        ]
      },
      {
        titulo: "Óleos para Dor e Inflamação",
        descricao: "Wintergreen, Copaíba, Eucalipto e Deep Blue",
        duracaoMinutos: 12,
        conteudo: `# Óleos para Dor e Inflamação

## O Arsenal Terapêutico do Massoterapeuta

### ❄️ Wintergreen (Gaultheria fragrantissima)

- **Propriedades:** Analgésico potente, anti-inflamatório, aquecimento profundo
- **Compostos:** 99% Salicilato de metila (similar à aspirina)
- **Usos na clínica:** Dores musculares intensas, artrite, dores articulares

> ⚠️ **ATENÇÃO:** Muito potente! Nunca usar puro. Sempre diluir a 1-2%. Contraindicado para quem toma anticoagulantes ou é alérgico a aspirina.

### 🌳 Copaíba (Copaifera officinalis)

- **Propriedades:** Anti-inflamatório sistêmico, analgésico, ansiolítico
- **Compostos:** Beta-cariofileno (interage com receptores canabinoides CB2)
- **Usos na clínica:** Inflamação crônica, dor muscular, ansiedade

**O segredo da Copaíba:**
> A Copaíba contém o maior teor natural de Beta-cariofileno, que interage com o sistema endocanabinoide do corpo — sem efeitos psicoativos. É o anti-inflamatório natural mais potente da aromaterapia.

- **Na massagem:** 4-5 gotas por 10ml — pode usar generosamente
- **Uso interno:** 1-2 gotas sob a língua (uso doTERRA aprovado)

### 🌿 Eucalipto (Eucalyptus radiata)

- **Propriedades:** Descongestionante, expectorante, refrescante, analgésico
- **Usos na clínica:** Congestão respiratória, dores musculares, sinusite
- **Na massagem:** 2-3 gotas por 10ml — excelente para região torácica

### 💙 Deep Blue® (Blend doTERRA)

**O blend especialista em dor:**
- Wintergreen, Cânfora, Hortelã-pimenta, Ylang Ylang, Helichrysum, Tansy Azul, Matricária, Osmanthus

**Usos na clínica:**
- Dores musculares agudas e crônicas
- Pós-exercício físico intenso
- Lesões esportivas
- Artrite e dores articulares

**Protocolo Deep Blue para Massagem:**
1. Aplique 3-4 gotas de Deep Blue diluído na área afetada
2. Realize massagem profunda por 5-10 minutos
3. Finalize com 1 gota de Lavanda para suavizar

> **Upsell natural:** "Este blend que estou usando se chama Deep Blue da doTERRA. Muitos clientes compram para usar em casa entre as sessões. Posso te mostrar depois?"`,
        quiz: [
          {
            pergunta: "O que torna a Copaíba um anti-inflamatório natural tão potente?",
            opcoes: ["Alto teor de Mentol", "Alto teor de Beta-cariofileno (receptor CB2)", "Contém aspirina natural", "Alto teor de Limoneno"],
            respostaCorreta: 1,
            explicacao: "A Copaíba tem o maior teor natural de Beta-cariofileno, que interage com receptores canabinoides CB2 — anti-inflamatório sem efeitos psicoativos."
          }
        ],
        checklist: [
          "Sei diferenciar uso de Wintergreen, Copaíba, Eucalipto e Deep Blue",
          "Conheço as contraindicações do Wintergreen (anticoagulantes, aspirina)",
          "Pratiquei o Protocolo Deep Blue em 1 sessão",
          "Ofereci Deep Blue para uso domiciliar a 1 cliente"
        ]
      }
    ]
  },
  {
    titulo: "Protocolos Terapêuticos com Óleos",
    descricao: "Blends e protocolos para as queixas mais comuns na clínica",
    icone: "Target",
    cor: "from-blue-50 to-cyan-50",
    aulas: [
      {
        titulo: "Protocolo Anti-Estresse e Ansiedade",
        descricao: "Blends calmantes e técnica AromaTouch para estresse",
        duracaoMinutos: 15,
        conteudo: `# Protocolo Anti-Estresse e Ansiedade

## O Problema

O estresse crônico é a queixa #1 dos clientes de massoterapia. Combinando técnicas manuais com aromaterapia, potencializamos os resultados em até 40%.

## Blend Anti-Estresse Resinkra

### Receita Base (para 15ml de carreador):
- 4 gotas de Lavanda (calma)
- 3 gotas de Bergamota (elevação do humor)
- 2 gotas de Ylang Ylang (equilíbrio)
- 2 gotas de Frankincense (aterramento)
- 1 gota de Vetiver (estabilidade)

### Protocolo de Aplicação na Sessão

**1. Preparação (5 min)**
- Difusor com 3 gotas de Lavanda + 2 gotas de Laranja Selvagem
- Oferecer ao cliente para inalar Lavanda nas mãos em concha
- Respiração guiada: 4 segundos inspira, 7 segura, 8 expira

**2. Aplicação Tópica (durante a massagem)**
- Aplicar blend anti-estresse em movimentos longos nas costas
- Focar em trapézio superior e região cervical
- Pressão moderada com movimentos lentos e rítmicos

**3. Pontos Estratégicos**
- Nuca (ponto de tensão #1)
- Pulsos (absorção rápida)
- Planta dos pés (reflexologia — zona do plexo solar)
- Têmporas (alívio de cefaleia tensional)

**4. Finalização (5 min)**
- 1 gota de Frankincense no ponto do terceiro olho
- Compressa quente com 2 gotas de Lavanda
- Momento de silêncio e integração

## Técnica AromaTouch® doTERRA

A técnica AromaTouch é um protocolo exclusivo doTERRA que utiliza 8 óleos aplicados ao longo da coluna e pés em sequência específica:

1. **Balance** — Aterramento
2. **Lavanda** — Redução de estresse
3. **Melaleuca** — Proteção imunológica
4. **On Guard** — Defesa do organismo
5. **AromaTouch** — Relaxamento muscular
6. **Deep Blue** — Alívio de tensão
7. **Wild Orange** — Energia e alegria
8. **Hortelã-pimenta** — Revitalização

> **Certificação:** Busque a certificação AromaTouch para oferecer esse protocolo premium. É um diferencial competitivo significativo.`,
        quiz: [
          {
            pergunta: "Qual a sequência de respiração guiada no protocolo anti-estresse?",
            opcoes: ["4-4-4 (box breathing)", "4-7-8 (inspira-segura-expira)", "2-2-2 (rápida)", "10-10-10 (lenta)"],
            respostaCorreta: 1,
            explicacao: "A respiração 4-7-8 (4 segundos inspira, 7 segura, 8 expira) ativa o sistema parassimpático eficazmente."
          }
        ],
        checklist: [
          "Preparei o Blend Anti-Estresse Resinkra",
          "Pratiquei o protocolo completo de 4 fases",
          "Conheço a sequência dos 8 óleos da técnica AromaTouch",
          "Apliquei respiração guiada 4-7-8 com 1 cliente"
        ]
      },
      {
        titulo: "Protocolo para Dores Musculares e Articulares",
        descricao: "Blends analgésicos e anti-inflamatórios para as queixas mais comuns",
        duracaoMinutos: 12,
        conteudo: `# Protocolo para Dores Musculares e Articulares

## Classificação da Dor e Blend Correspondente

### Dor Aguda (recente, < 72 horas)

**Blend Alívio Imediato:**
- 3 gotas de Hortelã-pimenta (refrescante/analgésico)
- 3 gotas de Copaíba (anti-inflamatório)
- 2 gotas de Lavanda (calmante)
- 15ml de óleo carreador

**Protocolo:**
1. Aplicar gelo por 10 minutos na região
2. Aplicar blend com movimentos suaves (sem pressão profunda)
3. Reaplicar Deep Blue em creme após a sessão
4. Orientar o cliente a reaplicar em casa a cada 4 horas

### Dor Crônica (> 3 meses)

**Blend Tratamento Profundo:**
- 3 gotas de Copaíba (anti-inflamatório sistêmico)
- 2 gotas de Wintergreen (analgésico profundo)
- 2 gotas de Eucalipto (circulação)
- 2 gotas de Frankincense (regeneração)
- 15ml de óleo carreador

**Protocolo:**
1. Compressa quente por 10 minutos
2. Aplicar blend com pressão profunda progressiva
3. Trabalho de trigger points com 1 gota de Hortelã-pimenta diluída no ponto
4. Finalizar com movimentos de drenagem

### Dor Articular (artrite, artrose)

**Blend Articulações:**
- 3 gotas de Frankincense (anti-inflamatório)
- 2 gotas de Copaíba (receptor CB2)
- 2 gotas de Wintergreen (analgésico)
- 1 gota de Gengibre (aquecimento)
- 15ml de óleo carreador

### Quadro Resumo para Consulta Rápida

| Queixa | Óleos Principais | Técnica |
|--------|-----------------|---------|
| Lombalgia | Deep Blue + Copaíba | Pressão profunda |
| Cervicalgia | Hortelã-pimenta + Lavanda | Deslizamento suave |
| Ciática | Wintergreen + Copaíba | Ao longo do nervo |
| Ombro congelado | Deep Blue + Eucalipto | Mobilização + OE |
| Fibromialgia | Copaíba + Lavanda + Frankincense | Pressão leve |`,
        quiz: [
          {
            pergunta: "Para dor aguda (< 72h), deve-se usar compressa quente ou fria?",
            opcoes: ["Compressa quente por 10 min", "Gelo por 10 min + blend suave", "Sem compressa, apenas óleo", "Alternância quente-frio"],
            respostaCorreta: 1,
            explicacao: "Em dor aguda, aplica-se gelo primeiro (vasoconstrição), seguido do blend com movimentos suaves — sem pressão profunda."
          }
        ],
        checklist: [
          "Preparei os 3 blends (Alívio Imediato, Tratamento Profundo, Articulações)",
          "Imprimi o quadro resumo para consulta rápida",
          "Apliquei o protocolo de dor em pelo menos 1 cliente",
          "Orientei 1 cliente sobre reaplicação domiciliar"
        ]
      },
      {
        titulo: "Protocolo Sono e Insônia",
        descricao: "Blends noturnos e técnicas para melhorar a qualidade do sono",
        duracaoMinutos: 10,
        conteudo: `# Protocolo Sono e Insônia

## O Sono como Pilar da Saúde

Clientes com dor crônica frequentemente têm insônia. Tratar o sono potencializa TODO o tratamento.

## Blend Sono Profundo

### Receita (para difusor):
- 3 gotas de Lavanda
- 2 gotas de Cedarwood
- 1 gota de Vetiver
- 1 gota de Camomila Romana (se disponível)

### Receita (para aplicação tópica — pés e pulsos):
- 3 gotas de Lavanda
- 2 gotas de Vetiver
- 2 gotas de Cedarwood
- 1 gota de Marjoram
- 10ml de óleo de coco fracionado

## Protocolo na Sessão (última sessão do dia)

1. **Ambiente:** Luzes baixas, música em 432Hz, difusor com blend sono
2. **Início:** Inalar Lavanda — respiração 4-7-8
3. **Massagem:** Movimentos lentos e rítmicos, pressão média
4. **Pés:** Aplicar Vetiver + Cedarwood diluídos na planta dos pés
5. **Final:** 1 gota de Lavanda no travesseiro descartável

## Orientação para Casa

Ensine o cliente a criar um "ritual do sono" com óleos:

1. **30 min antes de dormir:** Difusor com Lavanda + Cedarwood
2. **Nos pés:** 1 gota de Vetiver + carreador na planta de cada pé
3. **Travesseiro:** 1 gota de Lavanda
4. **Evitar:** Hortelã-pimenta e cítricos à noite (estimulantes)

### Blend Serenity® doTERRA

O blend pronto da doTERRA para sono:
- Lavanda, Cedarwood, Ho Wood, Ylang Ylang, Marjoram, Camomila Romana, Vetiver, Sândalo, Baunilha

> **Oportunidade de venda:** "Este blend que uso na sessão se chama Serenity. É perfeito para usar em casa antes de dormir. Muitos clientes relatam que melhoram o sono já na primeira noite."`,
        quiz: [
          {
            pergunta: "Quais óleos devem ser EVITADOS à noite por serem estimulantes?",
            opcoes: ["Lavanda e Vetiver", "Hortelã-pimenta e cítricos", "Cedarwood e Camomila", "Frankincense e Copaíba"],
            respostaCorreta: 1,
            explicacao: "Hortelã-pimenta é energizante e cítricos são estimulantes. À noite, prefira Lavanda, Vetiver e Cedarwood."
          }
        ],
        checklist: [
          "Preparei o Blend Sono Profundo para difusor e tópico",
          "Ensinei o ritual do sono a 1 cliente com insônia",
          "Usei música 432Hz na última sessão do dia",
          "Ofereci Serenity para uso domiciliar"
        ]
      },
      {
        titulo: "Protocolo Digestão e Detox",
        descricao: "Óleos para sistema digestivo e protocolos de drenagem linfática",
        duracaoMinutos: 10,
        conteudo: `# Protocolo Digestão e Detox

## Óleos para o Sistema Digestivo

### Blend Digestivo

**Receita (para massagem abdominal):**
- 3 gotas de Gengibre (náusea, motilidade)
- 2 gotas de Hortelã-pimenta (cólica, gases)
- 2 gotas de Funcho/Erva-doce (inchaço)
- 1 gota de DigestZen® (blend pronto doTERRA)
- 15ml de óleo carreador

### Protocolo de Massagem Abdominal

1. Aplicar blend no abdômen com movimentos circulares no sentido horário
2. Seguir o trajeto do cólon: ascendente → transverso → descendente
3. Pressão suave a média (abdômen é sensível)
4. 5-7 minutos de massagem específica
5. Finalizar com compressa quente

### DigestZen® doTERRA

**Composição:** Gengibre, Hortelã-pimenta, Estragão, Funcho, Alcaravia, Coentro, Anis
**Uso:** 1-2 gotas no abdômen ou internamente em cápsula

## Protocolo Detox com Drenagem Linfática

### Blend Detox para Drenagem

**Receita:**
- 3 gotas de Limão (desintoxicante)
- 2 gotas de Grapefruit (metabolismo, celulite)
- 2 gotas de Cipreste (circulação, retenção)
- 1 gota de Gengibre (aquecimento, circulação)
- 15ml de óleo carreador

### Protocolo Completo

**Pré-sessão:**
- Cliente beber 500ml de água com 1 gota de Limão
- Difusor com Grapefruit + Limão (energia e foco)

**Durante a drenagem:**
1. Aplicar blend detox seguindo os linfonodos
2. Movimentos de bombeamento suaves e rítmicos
3. Focar em regiões de estagnação
4. Usar Cipreste nas pernas (retenção de líquido)

**Pós-sessão:**
- Orientar hidratação abundante
- 1 gota de Limão em água por 3 dias
- Evitar álcool e alimentos processados por 48h

> **Cross-sell natural:** Combine o protocolo de drenagem com o plano alimentar da clínica para resultados exponenciais.`,
        quiz: [
          {
            pergunta: "Em qual sentido deve-se massagear o abdômen no protocolo digestivo?",
            opcoes: ["Anti-horário", "De baixo para cima", "Sentido horário (trajeto do cólon)", "Qualquer direção"],
            respostaCorreta: 2,
            explicacao: "A massagem abdominal segue o sentido horário, acompanhando o trajeto natural do cólon: ascendente → transverso → descendente."
          }
        ],
        checklist: [
          "Preparei Blend Digestivo e Blend Detox",
          "Pratiquei massagem abdominal no sentido horário",
          "Apliquei protocolo detox em 1 sessão de drenagem",
          "Orientei hidratação e cuidados pós-sessão"
        ]
      }
    ]
  },
  {
    titulo: "Blends doTERRA Prontos",
    descricao: "Os principais blends proprietários da doTERRA e como usá-los",
    icone: "Package",
    cor: "from-amber-50 to-yellow-50",
    aulas: [
      {
        titulo: "On Guard, Breathe e DigestZen",
        descricao: "Blends para imunidade, respiração e digestão",
        duracaoMinutos: 12,
        conteudo: `# Blends Prontos doTERRA — Parte 1

## Os 3 Blends do Dia a Dia

### 🛡️ On Guard® — Blend Protetor

**Composição:** Laranja Selvagem, Cravo, Canela, Eucalipto, Alecrim

**Propriedades:**
- Antiviral e antibacteriano potente
- Fortalecimento do sistema imunológico
- Purificação do ar

**Usos na clínica:**
- Difundir entre atendimentos (purificação)
- Época de gripes: oferecer ao cliente para inalar
- Spray de limpeza: 10 gotas + água em frasco spray
- Uso interno: cápsulas para reforço imunológico

**Na prática:**
> "No outono e inverno, sempre difundo On Guard na clínica. Protege tanto vocês quanto a mim. É o escudo natural da doTERRA."

---

### 🌬️ Breathe® — Blend Respiratório

**Composição:** Louro, Hortelã-pimenta, Eucalipto, Melaleuca, Limão, Cardamomo, Ravintsara

**Propriedades:**
- Descongestionante nasal e pulmonar
- Alívio de sintomas respiratórios
- Expectorante suave

**Usos na clínica:**
- Clientes com congestão nasal
- Aplicar no peito durante massagem torácica
- Inalação com vapor (1-2 gotas em água quente)
- Difusor para ambiente: 3-4 gotas

---

### 💚 DigestZen® — Blend Digestivo

**Composição:** Gengibre, Hortelã-pimenta, Estragão, Funcho, Alcaravia, Coentro, Anis

**Propriedades:**
- Alívio de gases, inchaço e indigestão
- Combate náuseas
- Regulação do trânsito intestinal

**Usos na clínica:**
- Massagem abdominal em sentido horário
- Clientes com queixa de distensão
- 1 gota via oral após refeição pesada

### Tabela de Referência Rápida

| Blend | Situação | Aplicação |
|-------|----------|-----------|
| On Guard | Proteção | Difusor / Spray |
| Breathe | Congestionamento | Peito / Inalação |
| DigestZen | Desconforto digestivo | Abdômen / Oral |`,
        quiz: [
          {
            pergunta: "Qual blend doTERRA é ideal para purificar o ar entre atendimentos?",
            opcoes: ["Deep Blue", "On Guard", "Serenity", "AromaTouch"],
            respostaCorreta: 1,
            explicacao: "On Guard é o blend protetor: antiviral e antibacteriano. Ideal para difundir entre atendimentos na clínica."
          }
        ],
        checklist: [
          "Conheço composição e uso de On Guard, Breathe e DigestZen",
          "Criei spray de On Guard para higienização",
          "Difundi On Guard entre atendimentos por 1 semana",
          "Ofereci DigestZen a 1 cliente com queixa digestiva"
        ]
      },
      {
        titulo: "Deep Blue, AromaTouch e Balance",
        descricao: "Blends para dor, relaxamento e equilíbrio",
        duracaoMinutos: 12,
        conteudo: `# Blends Prontos doTERRA — Parte 2

## Os 3 Blends Essenciais para Massoterapia

### 💙 Deep Blue® — Blend Analgésico

**Composição:** Wintergreen, Cânfora, Hortelã-pimenta, Ylang Ylang, Helichrysum, Tansy Azul, Matricária, Osmanthus

**O melhor amigo do massoterapeuta!**

**Usos na clínica:**
- Dores musculares agudas e crônicas
- Pós-treino e lesões esportivas
- Artrite e dores articulares
- Trigger points e contratura muscular

**Formas disponíveis:**
- Óleo essencial (blend puro)
- Deep Blue Rub® (creme — mais fácil de aplicar)
- Deep Blue Polyphenol Complex (cápsulas — uso interno)

**Protocolo Quick Relief:**
1. Aplicar 2-3 gotas de Deep Blue na região
2. Massagear por 3-5 minutos com pressão firme
3. Cobrir com compressa quente por 5 minutos
4. Resultado: alívio imediato em 80% dos casos

---

### 🤲 AromaTouch® — Blend de Relaxamento Muscular

**Composição:** Cipreste, Hortelã-pimenta, Manjerona, Manjericão, Grapefruit, Lavanda

**Projetado ESPECIFICAMENTE para massagem:**
- Relaxamento muscular profundo
- Melhora da circulação
- Alívio de tensão

**Na clínica:**
- Blend principal para massagem relaxante
- 4-6 gotas por 10ml de carreador
- Ideal para costas, ombros e pernas

---

### ⚖️ Balance® — Blend de Aterramento

**Composição:** Abeto, Ho Wood, Frankincense, Tansy Azul, Camomila Azul, óleo de coco fracionado

**Propriedades:**
- Aterramento e estabilidade emocional
- Equilíbrio do sistema nervoso
- Sensação de paz e segurança

**Usos na clínica:**
- Início de TODA sessão (aterramento)
- Clientes ansiosos ou emocionalmente abalados
- Planta dos pés para conexão terra

> **Dica profissional:** Balance é o PRIMEIRO óleo que aplico em toda sessão. 1 gota na planta de cada pé. O cliente sente imediatamente uma sensação de calma e segurança. É o "reset emocional" perfeito.

### Kit do Massoterapeuta doTERRA

Se você vai começar com óleos doTERRA, estes são os 6 essenciais:
1. Lavanda
2. Deep Blue (ou Rub)
3. AromaTouch
4. Balance
5. Hortelã-pimenta
6. Frankincense`,
        quiz: [
          {
            pergunta: "Qual blend deve ser aplicado no INÍCIO de toda sessão?",
            opcoes: ["Deep Blue", "AromaTouch", "Balance (1 gota na planta dos pés)", "On Guard"],
            respostaCorreta: 2,
            explicacao: "Balance é o blend de aterramento. 1 gota na planta de cada pé no início da sessão cria um 'reset emocional'."
          }
        ],
        checklist: [
          "Conheço Deep Blue, AromaTouch e Balance em detalhes",
          "Apliquei Balance no início de todas as sessões por 1 semana",
          "Testei Protocolo Quick Relief com Deep Blue",
          "Listei o Kit de 6 óleos essenciais para minha clínica"
        ]
      },
      {
        titulo: "Serenity, Elevation e Adaptiv",
        descricao: "Blends para sono, humor e adaptação ao estresse",
        duracaoMinutos: 10,
        conteudo: `# Blends Prontos doTERRA — Parte 3

## Blends para Bem-Estar Emocional

### 🌙 Serenity® — Blend do Sono

**Composição:** Lavanda, Cedarwood, Ho Wood, Ylang Ylang, Marjoram, Camomila Romana, Vetiver, Sândalo, Baunilha

**Usos na clínica:**
- Última sessão do dia
- Clientes com insônia crônica
- Difusor na sala de espera ao final do expediente
- Aplicar nos pulsos e nuca do cliente

> **Venda natural:** "Muitos clientes compram o Serenity para usar no difusor do quarto. Relatam melhora no sono já na primeira noite."

---

### ☀️ Elevation® — Blend da Alegria

**Composição:** Lavanda, Tangerina, Elemi, Melissa, Ylang Ylang, Osmanthus, Sândalo Havaiano

**Usos na clínica:**
- Clientes com humor deprimido
- Manhãs no difusor (energia positiva)
- Sessões de segunda-feira (combater blues do início de semana)

**Script:** "Este blend se chama Elevation — significa 'elevação'. É perfeito para aqueles dias em que a gente precisa de um impulso emocional."

---

### 🧠 Adaptiv® — Blend Adaptogênico

**Composição:** Lavanda, Magnólia, Neroli, Olíbano, Alecrim, Laranja Selvagem, Abeto, Copaíba, Hortelã-pimenta

**O blend mais completo para estresse:**
- Adaptação a situações estressantes
- Redução de tensão nervosa
- Clareza mental sob pressão
- Equilíbrio emocional em mudanças

**Usos na clínica:**
- Clientes executivos sob alta pressão
- Semanas de provas (estudantes)
- Períodos de mudança e transição
- Sessões focadas em bem-estar mental

**Formas disponíveis:**
- Blend (óleo essencial)
- Adaptiv Calming Blend Capsules (cápsulas — uso interno)
- Adaptiv Touch (roll-on — pronto para usar)

### Resumo: Qual Blend para Cada Situação

| Necessidade | Blend | Momento |
|-------------|-------|---------|
| Dormir melhor | Serenity | Noite / Última sessão |
| Elevar o humor | Elevation | Manhã / Dias difíceis |
| Gerenciar estresse | Adaptiv | Qualquer hora |
| Aliviar dor | Deep Blue | Durante tratamento |
| Relaxar músculos | AromaTouch | Massagem relaxante |
| Aterramento | Balance | Início da sessão |`,
        quiz: [
          {
            pergunta: "Qual blend é ideal para clientes executivos sob alta pressão?",
            opcoes: ["Serenity", "Elevation", "Adaptiv", "Balance"],
            respostaCorreta: 2,
            explicacao: "Adaptiv é o blend adaptogênico: ajuda na adaptação ao estresse, clareza mental e equilíbrio em situações de pressão."
          }
        ],
        checklist: [
          "Conheço Serenity, Elevation e Adaptiv",
          "Sei qual blend usar para cada situação emocional",
          "Ofereci Serenity para 1 cliente com insônia",
          "Usei Elevation no difusor pela manhã por 1 semana"
        ]
      }
    ]
  },
  {
    titulo: "Aromaterapia na Massoterapia Profissional",
    descricao: "Integrando óleos essenciais nas sessões da clínica",
    icone: "MessageCircle",
    cor: "from-teal-50 to-emerald-50",
    aulas: [
      {
        titulo: "Montando o kit de óleos da clínica",
        descricao: "Investimento, organização e rotina de uso profissional",
        duracaoMinutos: 12,
        conteudo: `# Montando o Kit de Óleos da Clínica

## Investimento Inteligente

### Kit Iniciante (6 óleos essenciais)

| Óleo | Uso Principal | Prioridade |
|------|--------------|-----------|
| Lavanda | Relaxamento, ansiedade, pele | ⭐⭐⭐ |
| Hortelã-pimenta | Dor, energia, digestão | ⭐⭐⭐ |
| Deep Blue (blend) | Dores musculares | ⭐⭐⭐ |
| Frankincense | Premium, anti-inflamatório | ⭐⭐ |
| Melaleuca | Limpeza, imunidade | ⭐⭐ |
| Limão | Purificação, humor | ⭐⭐ |

### Kit Intermediário (adicionar)

- AromaTouch (massagem)
- Balance (aterramento)
- On Guard (proteção)
- Copaíba (anti-inflamatório)

### Kit Completo (adicionar)

- Serenity (sono)
- Breathe (respiração)
- DigestZen (digestão)
- Vetiver (aterramento profundo)
- Ylang Ylang (relaxamento premium)

## Organização na Clínica

### Estação de Óleos

Crie uma "estação de aromaterapia" visível para o cliente:
- Bandeja ou prateleira bonita com os frascos organizados
- Cartões com nome e descrição de cada óleo
- Difusor de qualidade (ultrassônico, silencioso)
- Óleos carreadores em frascos pump

### Rotina Diária

**Manhã:**
- Difusor com Limão + Hortelã-pimenta (energia)
- Preparar blends do dia em frascos roll-on

**Entre sessões:**
- Trocar o blend do difusor conforme o próximo cliente
- On Guard spray para higienizar

**Final do dia:**
- Difusor com Lavanda + Cedarwood (desaceleração)
- Repor frascos utilizados

### Controle de Estoque

- [ ] Verificar níveis dos óleos semanalmente
- [ ] Pedir reposição quando restam 20% do frasco
- [ ] Manter registro de uso por cliente (ficha)
- [ ] Calcular custo por sessão (média: R$3-5)`,
        quiz: [
          {
            pergunta: "Qual o custo médio de óleos essenciais por sessão na clínica?",
            opcoes: ["R$0,50-1", "R$3-5", "R$15-20", "R$30-50"],
            respostaCorreta: 1,
            explicacao: "O custo médio é de R$3-5 por sessão com blend básico, podendo cobrar R$20-50 a mais do cliente."
          }
        ],
        checklist: [
          "Escolhi meu nível de kit (Iniciante, Intermediário ou Completo)",
          "Montei estação de aromaterapia visível na clínica",
          "Criei rotina diária de difusor (manhã, entre sessões, final)",
          "Implementei controle de estoque semanal"
        ]
      },
      {
        titulo: "Integrando óleos na sessão de massagem",
        descricao: "Passo a passo para incorporar aromaterapia em cada etapa da sessão",
        duracaoMinutos: 15,
        conteudo: `# Integrando Óleos na Sessão de Massagem

## O Fluxo Completo com Aromaterapia

### Fase 1: Pré-Sessão (5 minutos antes)

1. **Preparar o ambiente:**
   - Ligar difusor com blend adequado ao perfil do cliente
   - Ajustar iluminação e música
   - Preparar blend de massagem conforme ficha do cliente

2. **Recepção aromática:**
   - Oferecer chá com 1 gota de Limão ou Hortelã-pimenta em água
   - Ao conversar, ter o difusor como elemento sensorial

### Fase 2: Avaliação Aromática (3 minutos)

**Técnica do "Cardápio Olfativo":**
- Apresente 3 óleos para o cliente cheirar
- Pergunte: "Qual destes aromas mais te agrada?"
- A preferência olfativa indica o que o corpo precisa!

> **Insight:** Clientes instintivamente preferem óleos que seu corpo necessita. Se escolhe Lavanda = precisa de calma. Se escolhe Hortelã = precisa de energia.

### Fase 3: Início da Sessão

1. **Aterramento:** 1 gota de Balance na planta de cada pé
2. **Abertura:** Oferecer Lavanda para inalar nas mãos em concha
3. **Respiração:** Guiar 3 respirações profundas com o aroma

### Fase 4: Durante a Massagem

- Aplicar blend principal (pré-preparado) conforme protocolo
- Adicionar óleos pontuais em regiões específicas de tensão
- Manter ritmo de aplicação: a cada 10 minutos, reaplicar se necessário
- Variar entre toque firme e deslizamento suave

### Fase 5: Finalização

1. Aplicar 1 gota de Frankincense no ponto do terceiro olho
2. Compressa quente com Lavanda na nuca
3. Deixar o cliente descansar 2-3 minutos em silêncio
4. Oferecer água com 1 gota de Limão

### Fase 6: Pós-Sessão (Oportunidade de Venda)

> "Os óleos que usei hoje foram [listar]. Para potencializar os resultados em casa, recomendo [óleo específico]. Posso te mostrar?"

### Ficha de Aromaterapia (modelo)

- [ ] Cliente: _______________
- [ ] Data: _______________
- [ ] Queixa principal: _______________
- [ ] Óleos utilizados: _______________
- [ ] Reação do cliente: _______________
- [ ] Óleos recomendados para casa: _______________
- [ ] Próxima sessão — blend sugerido: _______________`,
        quiz: [
          {
            pergunta: "O que revela a preferência olfativa do cliente no 'Cardápio Olfativo'?",
            opcoes: ["Apenas gosto pessoal", "O que o corpo precisa naquele momento", "Nada relevante clinicamente", "Se o cliente é visual ou auditivo"],
            respostaCorreta: 1,
            explicacao: "A preferência olfativa indica necessidades do corpo. Quem escolhe Lavanda precisa de calma; quem escolhe Hortelã precisa de energia."
          }
        ],
        checklist: [
          "Apliquei o fluxo completo de 6 fases em 1 sessão",
          "Usei a técnica do Cardápio Olfativo com 3 clientes",
          "Preenchi a Ficha de Aromaterapia após cada sessão",
          "Ofereci óleos para uso domiciliar ao final da sessão"
        ]
      },
      {
        titulo: "Aromaterapia no Head Spa",
        descricao: "Protocolo especializado para Head Spa com óleos essenciais",
        duracaoMinutos: 10,
        conteudo: `# Aromaterapia no Head Spa

## Elevando a Experiência do Head Spa

O Head Spa já é uma experiência premium. Com óleos essenciais, torna-se INESQUECÍVEL.

### Blend Head Spa Resinkra

**Receita para couro cabeludo (10ml de carreador):**
- 3 gotas de Cedarwood (circulação capilar)
- 2 gotas de Lavanda (relaxamento, saúde do couro)
- 2 gotas de Alecrim (estimulação folicular)
- 1 gota de Hortelã-pimenta (refrescância, limpeza)

### Protocolo Head Spa com Aromaterapia

**1. Análise do Couro Cabeludo**
- Difusor: Lavanda + Bergamota (ambiente acolhedor)
- Avaliar condição do couro cabeludo
- Identificar áreas de tensão no crânio

**2. Vaporização Aromática**
- Adicionar 2-3 gotas de Eucalipto ao vapor
- O vapor abre os poros e potencializa a absorção
- Efeito descongestionante e purificante

**3. Limpeza Profunda**
- Adicionar 1 gota de Melaleuca ao shampoo
- Propriedades antifúngicas combatem caspa
- Massagear com movimentos circulares

**4. Massagem Terapêutica Craniana**
- Aplicar blend Head Spa aquecido nas mãos
- Técnica de pressão: seguir linhas de acupuntura da cabeça
- Cedarwood estimula circulação nos folículos
- Alecrim promove crescimento capilar

**5. Tratamento Nutritivo**
- Máscara capilar com 2 gotas de Frankincense
- Cobrir com toalha quente por 10 minutos
- Frankincense regenera e nutre profundamente

**6. Finalização Aromática**
- Lavagem final com água morna + 1 gota de Lavanda
- Toalha quente com Hortelã-pimenta na nuca
- Momento zen: 2 minutos de silêncio com difusor

### Óleos Indicados por Tipo de Couro Cabeludo

| Tipo | Óleo Indicado | Benefício |
|------|---------------|-----------|
| Oleoso | Melaleuca + Limão | Regulação da oleosidade |
| Seco | Lavanda + Cedarwood | Hidratação e nutrição |
| Com caspa | Melaleuca + Alecrim | Antifúngico + circulação |
| Sensível | Lavanda + Camomila | Calmante e suave |
| Queda | Alecrim + Cedarwood | Estimulação folicular |

> **Upsell:** "Para manter os benefícios do Head Spa entre as sessões, recomendo aplicar 2 gotas de Alecrim + 2 de Cedarwood em óleo de coco na raiz, 2x por semana."`,
        quiz: [
          {
            pergunta: "Quais óleos são recomendados para couro cabeludo com queda?",
            opcoes: ["Melaleuca + Limão", "Lavanda + Camomila", "Alecrim + Cedarwood", "Hortelã-pimenta + Eucalipto"],
            respostaCorreta: 2,
            explicacao: "Alecrim promove crescimento capilar e Cedarwood estimula circulação nos folículos — a combinação ideal para queda."
          }
        ],
        checklist: [
          "Preparei o Blend Head Spa Resinkra",
          "Apliquei o protocolo completo de 6 etapas em 1 Head Spa",
          "Identifiquei o tipo de couro cabeludo de 3 clientes",
          "Ofereci receita de manutenção domiciliar (Alecrim + Cedarwood)"
        ]
      }
    ]
  },
  {
    titulo: "Vendas e Negócios com Óleos",
    descricao: "Como rentabilizar a aromaterapia na clínica e oferecer produtos aos clientes",
    icone: "BarChart3",
    cor: "from-rose-50 to-pink-50",
    aulas: [
      {
        titulo: "Modelo de negócio com doTERRA",
        descricao: "Cadastro como consultor, margens e estratégias de venda na clínica",
        duracaoMinutos: 12,
        conteudo: `# Modelo de Negócio com doTERRA

## Como Rentabilizar a Aromaterapia

### Opção 1: Usar na Clínica (Custo por Sessão)

**Custo médio por sessão com óleos:**
- Blend básico (Lavanda + Hortelã): R$2-3 por sessão
- Blend premium (Frankincense + Deep Blue): R$5-8 por sessão
- Protocolo AromaTouch completo: R$15-20 por sessão

**Valor agregado:**
- Cobrar adicional de R$20-50 por sessão com aromaterapia
- Margem líquida: R$15-45 por sessão
- Em 20 sessões/semana: R$300-900 extras/semana

### Opção 2: Revender Produtos para Clientes

**Como consultor doTERRA:**
- Compra com **25% de desconto** sobre o preço de varejo
- Pode revender ao preço sugerido ou com seu markup
- Margem de 25-35% por produto vendido
- Sem meta obrigatória de venda

**Produtos mais vendidos na clínica:**
1. Deep Blue Rub (creme para dor) — fácil de vender
2. Lavanda (multiuso, todo mundo quer)
3. On Guard (proteção imunológica)
4. Serenity (sono — muita demanda)
5. DigestZen (problemas digestivos)

### Opção 3: Sessões Premium com Aromaterapia

Crie pacotes diferenciados:

| Serviço | Sem OE | Com OE | Diferença |
|---------|--------|--------|-----------|
| Massagem relaxante | R$160/hr | R$200/hr | +R$40 |
| Massagem terapêutica | R$160/hr | R$210/hr | +R$50 |
| Head Spa | R$180 | R$230 | +R$50 |
| Protocolo AromaTouch | — | R$280 | Premium |

### Script de Oferta Natural

Ao final de TODA sessão com óleos:

> "Os óleos que usei hoje foram Lavanda para relaxamento e Deep Blue para a tensão no ombro. Muitos clientes gostam de continuar o tratamento em casa. Posso te mostrar esses óleos?"

**Regra:** Não force. Ofereça de forma natural. O resultado da sessão vende sozinho.`,
        quiz: [
          {
            pergunta: "Quanto de receita extra semanal pode gerar a aromaterapia na clínica?",
            opcoes: ["R$50-100", "R$100-200", "R$300-900 (com 20 sessões/semana)", "Mais de R$2.000"],
            respostaCorreta: 2,
            explicacao: "Cobrando R$20-50 extra por sessão com aromaterapia, em 20 sessões semanais gera R$300-900 extras."
          }
        ],
        checklist: [
          "Defini minha estratégia (usar na clínica, revender, ou ambos)",
          "Calculei custo por sessão e margem de lucro",
          "Criei tabela de preços com e sem aromaterapia",
          "Pratiquei o script de oferta natural após 3 sessões"
        ]
      },
      {
        titulo: "Script de venda e objeções comuns",
        descricao: "Como apresentar os óleos ao cliente e lidar com resistências",
        duracaoMinutos: 10,
        conteudo: `# Script de Venda e Objeções Comuns

## A Venda Natural na Clínica

### Princípio: O Resultado Vende

O cliente acabou de vivenciar o benefício na própria pele. Sua "venda" é simplesmente nomear o que ele sentiu e oferecer para continuar em casa.

### Scripts por Momento

**Após sessão relaxante:**
> "Você notou aquele aroma que usei? É a Lavanda pura doTERRA. É o que fez você relaxar tão profundamente. Se quiser ter isso em casa, tenho disponível."

**Após alívio de dor:**
> "O creme que apliquei no seu ombro se chama Deep Blue. É o mais vendido da doTERRA justamente porque funciona na hora. Quer um para usar em casa entre as sessões?"

**Cliente com insônia:**
> "Lembra do blend que usei no final da sessão? É o Serenity — específico para sono. Quase todos os clientes que usam no difusor do quarto relatam melhora. Posso separar um pra você?"

## Objeções e Respostas

### "É muito caro"

> "Entendo. Mas pense assim: um frasco de Lavanda tem cerca de 250 gotas. Se usar 3 gotas por dia no difusor, dura quase 3 meses. Sai menos de R$1 por dia para dormir melhor."

### "Não sei se funciona"

> "Você acabou de sentir na sessão! O que sentiu no ombro com o Deep Blue — aquele alívio — é o óleo agindo. Em casa funciona igual."

### "Posso comprar qualquer óleo de lavanda no mercado?"

> "Pode, mas cuidado: a maioria dos óleos de mercado são diluídos ou sintéticos. Não têm propriedade terapêutica real. O doTERRA é CPTG — 100% puro, testado em laboratório. É a diferença entre suco de laranja natural e Tang."

### "Deixa que eu pesquiso"

> "Claro! Vou te mandar um material explicativo. E se decidir, consigo condições especiais como sua terapeuta."

### "Não sei usar"

> "Eu te ensino! É super simples. E sempre que vier à sessão, vamos revisar juntas. Posso montar um guia personalizado para você."

### Regra de Ouro

> **Nunca pressione.** Plante a semente, deixe o aroma falar. O cliente que experimentou e gostou voltará pedindo.`,
        quiz: [
          {
            pergunta: "Qual a melhor analogia para explicar a diferença entre OE doTERRA e de mercado?",
            opcoes: ["Carro popular vs importado", "Suco de laranja natural vs Tang", "Roupa de marca vs genérica", "Celular novo vs usado"],
            respostaCorreta: 1,
            explicacao: "A analogia 'suco natural vs Tang' é clara: óleos de mercado são como Tang — parecem, mas não têm os mesmos benefícios."
          }
        ],
        checklist: [
          "Pratiquei os 3 scripts de venda (relaxante, dor, insônia)",
          "Memorizei respostas para as 5 objeções comuns",
          "Vendi ou ofereci 1 produto doTERRA esta semana",
          "Nunca pressionei — plantei a semente naturalmente"
        ]
      },
      {
        titulo: "Quiz e certificação do módulo",
        descricao: "Teste seus conhecimentos e receba seu certificado de Aromaterapia",
        duracaoMinutos: 8,
        conteudo: `# Quiz Final — Aromaterapia doTERRA

## Teste Seus Conhecimentos

### Perguntas de Revisão

1. Quais são os 3 óleos da "Tríade Essencial" doTERRA?

2. O que significa o selo CPTG?

3. Qual a diluição recomendada para adultos em massagem corporal?

4. Cite 3 óleos fotossensíveis.

5. Qual blend doTERRA é indicado para dores musculares?

6. Em que ordem são aplicados os óleos na técnica AromaTouch?

7. Qual óleo tem o maior teor de Beta-cariofileno?

8. Quais óleos são recomendados para o protocolo Head Spa?

9. Qual a diferença entre Wintergreen e Deep Blue?

10. Cite o "Kit Iniciante" de 6 óleos para clínica.

## Respostas

### 1. Tríade Essencial
✅ Lavanda, Hortelã-pimenta e Limão

### 2. CPTG
✅ Certified Pure Tested Grade — protocolo de 8 testes de pureza da doTERRA

### 3. Diluição adultos
✅ 2-3% (4-6 gotas por 10ml de carreador)

### 4. Óleos fotossensíveis
✅ Limão, Bergamota, Grapefruit, Lima, Laranja Selvagem

### 5. Blend para dores
✅ Deep Blue®

### 6. Ordem AromaTouch
✅ Balance, Lavanda, Melaleuca, On Guard, AromaTouch, Deep Blue, Wild Orange, Hortelã-pimenta

### 7. Maior Beta-cariofileno
✅ Copaíba

### 8. Head Spa
✅ Cedarwood, Lavanda, Alecrim, Hortelã-pimenta

### 9. Wintergreen vs Deep Blue
✅ Wintergreen é um óleo único (99% salicilato de metila). Deep Blue é um blend de 8 óleos que inclui Wintergreen + outros.

### 10. Kit Iniciante
✅ Lavanda, Hortelã-pimenta, Deep Blue, Frankincense, Melaleuca, Limão

---

## 🏆 Parabéns!

Você concluiu o **Curso de Aromaterapia doTERRA para Massoterapeutas**!

Agora você pode:
- Integrar óleos essenciais em suas sessões
- Criar protocolos personalizados para cada cliente
- Oferecer uma experiência premium diferenciada
- Rentabilizar com vendas de produtos

> **Próximo passo:** Monte seu Kit Iniciante e comece a aplicar os protocolos já na próxima sessão!`,
        quiz: [
          {
            pergunta: "Quais são os 6 óleos do Kit Iniciante para clínica?",
            opcoes: [
              "Vetiver, Ylang Ylang, Patchouli, Bergamota, Cedarwood, Copaíba",
              "Lavanda, Hortelã-pimenta, Deep Blue, Frankincense, Melaleuca, Limão",
              "On Guard, Breathe, DigestZen, Balance, AromaTouch, Serenity",
              "Eucalipto, Oregano, Gengibre, Wintergreen, Cipreste, Funcho"
            ],
            respostaCorreta: 1,
            explicacao: "O Kit Iniciante ideal é: Lavanda, Hortelã-pimenta, Deep Blue, Frankincense, Melaleuca e Limão — cobrindo as necessidades mais comuns."
          }
        ],
        checklist: [
          "Respondi todas as 10 perguntas do quiz de revisão",
          "Acertei pelo menos 8 de 10 perguntas",
          "Montei meu Kit Iniciante de 6 óleos",
          "Estou pronto para aplicar protocolos nas próximas sessões"
        ]
      }
    ]
  },
  {
    titulo: "Aromaterapia para Gestantes e Públicos Especiais",
    descricao: "Protocolos seguros para gestantes, idosos, crianças e clientes com condições específicas",
    icone: "GraduationCap",
    cor: "from-pink-50 to-rose-50",
    aulas: [
      {
        titulo: "Aromaterapia segura na gestação",
        descricao: "Óleos permitidos, contraindicados e protocolos trimestrais",
        duracaoMinutos: 12,
        conteudo: `# Aromaterapia Segura na Gestação

## Cuidados Essenciais

A gestação é um período de sensibilidade aumentada. Óleos essenciais podem ser aliados poderosos quando usados corretamente.

### Regra de Ouro

> **Diluição máxima: 0,5-1%** (1-2 gotas por 10ml de carreador). Sempre consultar o obstetra antes.

### Óleos SEGUROS na Gestação

| Óleo | Benefício | Trimestre |
|------|-----------|-----------|
| Lavanda | Relaxamento, sono, ansiedade | 2º e 3º |
| Limão | Náusea matinal, energia | Todos |
| Hortelã-pimenta | Náusea (inalação apenas) | 2º e 3º |
| Ylang Ylang | Relaxamento, pressão | 2º e 3º |
| Frankincense | Equilíbrio emocional | 2º e 3º |
| Laranja Selvagem | Humor, energia | Todos |

### Óleos PROIBIDOS na Gestação

⛔ Alecrim (estimulante uterino)
⛔ Salvia (emmenagogo)
⛔ Cedro (pode causar contrações)
⛔ Cipreste (efeito estrogênico)
⛔ Wintergreen (salicilato — risco sangramento)
⛔ Oregano (muito potente)
⛔ Canela (estimulante uterino)

### Protocolo por Trimestre

**1º Trimestre (cautela máxima):**
- Apenas difusão com Limão ou Laranja (náusea)
- Evitar aplicação tópica
- Difusor a 2 metros de distância

**2º Trimestre (liberação gradual):**
- Massagem leve com Lavanda diluída a 0,5%
- Pernas e pés com Citrinos para circulação
- Difusor com blends relaxantes

**3º Trimestre (preparação para o parto):**
- Massagem relaxante com Lavanda + Ylang Ylang
- Compressa lombar com Lavanda
- Preparação emocional com Frankincense

### Script para Gestantes

> "Durante a gestação, usamos apenas óleos cientificamente seguros, em diluição mínima. Vou adaptar todo o protocolo para você e seu bebê."`,
        quiz: [
          {
            pergunta: "Qual a diluição máxima de óleos essenciais para gestantes?",
            opcoes: ["2-3% (padrão adulto)", "0,5-1% (1-2 gotas por 10ml)", "5% para efeito terapêutico", "Não usar óleos na gestação"],
            respostaCorreta: 1,
            explicacao: "Para gestantes, a diluição máxima é 0,5-1%, sempre com óleos seguros e após consulta ao obstetra."
          }
        ],
        checklist: [
          "Memorizei óleos seguros e proibidos na gestação",
          "Conheço o protocolo por trimestre",
          "Adaptei minha ficha de cliente para incluir status gestacional",
          "Pratiquei o script para gestantes"
        ]
      },
      {
        titulo: "Protocolos para idosos e crianças",
        descricao: "Adaptações de diluição, óleos seguros e cuidados especiais",
        duracaoMinutos: 10,
        conteudo: `# Protocolos para Idosos e Crianças

## Idosos — Pele Sensível e Metabolismo Lento

### Considerações Especiais

- Pele mais fina e delicada → diluição reduzida (1-2%)
- Metabolismo mais lento → óleos demoram mais para ser eliminados
- Interação com medicamentos → sempre verificar
- Olfato pode estar diminuído → usar doses maiores no difusor

### Óleos Ideais para Idosos

| Necessidade | Óleo | Diluição |
|-------------|------|----------|
| Dor articular | Copaíba + Frankincense | 1-2% |
| Insônia | Lavanda + Cedarwood | 1% |
| Circulação | Cipreste + Gengibre | 1-2% |
| Memória/foco | Alecrim + Hortelã-pimenta | 1% (difusor) |
| Humor | Bergamota + Elevation | 1% |

### Cuidados com Medicamentos

⚠️ **Anticoagulantes:** Evitar Wintergreen, Cravo, Canela
⚠️ **Anti-hipertensivos:** Cuidado com Alecrim (pode elevar pressão)
⚠️ **Diabetes:** Alguns óleos podem afetar glicemia

## Crianças — Segurança em Primeiro Lugar

### Diluição por Idade

| Idade | Diluição | Gotas por 10ml |
|-------|----------|----------------|
| 0-6 meses | Não usar (apenas difusor suave) | 0 |
| 6-24 meses | 0,25% | 0,5 gota |
| 2-6 anos | 0,5% | 1 gota |
| 6-12 anos | 1% | 2 gotas |
| 12+ anos | 1-2% | 2-4 gotas |

### Óleos SEGUROS para Crianças

✅ Lavanda (calmante, sono, picadas)
✅ Camomila Romana (cólica, agitação)
✅ Laranja Selvagem (humor, energia suave)
✅ Melaleuca (piolho, fungos — diluído)
✅ Frankincense (suporte imunológico)

### Óleos a EVITAR em Crianças

⛔ Hortelã-pimenta (< 6 anos — mentol pode causar espasmo respiratório)
⛔ Eucalipto (< 6 anos — mesmo motivo)
⛔ Wintergreen (crianças de qualquer idade)
⛔ Oregano (muito potente)

> **Dica:** Para crianças, sempre prefira a via aromática (difusor) à tópica. É mais segura e igualmente eficaz.`,
        quiz: [
          {
            pergunta: "Por que evitar Hortelã-pimenta em crianças menores de 6 anos?",
            opcoes: ["O sabor é muito forte", "O mentol pode causar espasmo respiratório", "Causa alergia em crianças", "Não tem efeito em crianças"],
            respostaCorreta: 1,
            explicacao: "O mentol presente na Hortelã-pimenta pode causar espasmo respiratório em crianças menores de 6 anos."
          }
        ],
        checklist: [
          "Conheço as diluições específicas para idosos e crianças",
          "Verifico interações medicamentosas com idosos",
          "Sei quais óleos evitar em crianças por faixa etária",
          "Adaptei meus protocolos para públicos especiais"
        ]
      },
      {
        titulo: "Aromaterapia em condições clínicas específicas",
        descricao: "Fibromialgia, ansiedade generalizada, enxaqueca e oncologia",
        duracaoMinutos: 10,
        conteudo: `# Aromaterapia em Condições Clínicas

## Protocolos Especializados

### Fibromialgia

**Desafio:** Dor generalizada, pontos sensíveis, fadiga crônica, sono ruim.

**Blend Fibromialgia:**
- 3 gotas de Copaíba (anti-inflamatório CB2)
- 2 gotas de Lavanda (analgésico suave)
- 2 gotas de Frankincense (regeneração)
- 1 gota de Marjoram (relaxamento muscular)
- 15ml de carreador

**Protocolo:** Pressão LEVE a MODERADA. Nunca profunda. Movimentos lentos e rítmicos. Foco em conforto, não em resultado imediato.

### Ansiedade Generalizada (TAG)

**Blend Ansiedade:**
- 3 gotas de Lavanda (calmante)
- 2 gotas de Vetiver (aterramento)
- 2 gotas de Bergamota (ansiolítico)
- 1 gota de Frankincense (paz interior)
- 15ml de carreador

**Protocolo:** Ambiente ultra-calmo. Respiração guiada 4-7-8. Difusor com blend. Massagem com ritmo previsível (sem mudanças bruscas).

### Enxaqueca

**Blend Enxaqueca:**
- 2 gotas de Hortelã-pimenta (nas têmporas — DILUÍDO)
- 2 gotas de Lavanda (calmante)
- 1 gota de Frankincense (anti-inflamatório)
- 10ml de carreador

**Protocolo:** Ambiente escuro, sem música alta. Compressa fria na testa com Hortelã-pimenta. Massagem cervical suave. Evitar estímulos fortes.

### Oncologia (Suporte)

**Importante:** Aromaterapia em oncologia é COMPLEMENTAR, nunca substitutiva.

**Óleos seguros no suporte oncológico:**
- Lavanda (ansiedade, sono, conforto)
- Gengibre (náusea pós-quimioterapia)
- Frankincense (equilíbrio emocional)
- Hortelã-pimenta (náusea — inalação)

**Cuidados:**
- NUNCA aplicar sobre áreas irradiadas
- Evitar óleos estrogênicos em câncer hormonal
- Diluição mínima (0,5-1%)
- Priorizar difusão sobre aplicação tópica
- Sempre com aval da equipe médica

> **Importante:** Documentar tudo. Manter comunicação com a equipe médica do paciente. Aromaterapia é um suporte valioso para qualidade de vida.`,
        quiz: [
          {
            pergunta: "Qual nível de pressão é adequado em massagem com aromaterapia para fibromialgia?",
            opcoes: ["Pressão profunda para liberar tensão", "Leve a moderada, com movimentos lentos", "Alternância entre leve e profunda", "Sem massagem, apenas difusão"],
            respostaCorreta: 1,
            explicacao: "Na fibromialgia, use pressão LEVE a MODERADA com movimentos lentos e rítmicos. Pressão profunda pode agravar a dor."
          }
        ],
        checklist: [
          "Conheço os protocolos para fibromialgia, TAG, enxaqueca e oncologia",
          "Sei adaptar pressão e ritmo para cada condição",
          "Entendo os limites da aromaterapia complementar",
          "Documento todos os óleos usados em clientes com condições especiais"
        ]
      }
    ]
  }
];
