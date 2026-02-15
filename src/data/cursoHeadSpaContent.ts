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
  aulas: HeadSpaAula[];
}

export const cursoHeadSpaData: HeadSpaModulo[] = [
  {
    titulo: "1. Fundamentos do Head SPA",
    descricao: "Origem, filosofia e ciência por trás do ritual coreano",
    icone: "BookOpen",
    cor: "from-sky-50 to-blue-50",
    aulas: [
      {
        titulo: "O que é Head SPA Coreano?",
        descricao: "História, filosofia e diferença do SPA capilar convencional",
        duracaoMinutos: 12,
        conteudo: `## O Ritual Head SPA Coreano

O Head SPA (두피 스파) é um tratamento capilar e craniano originário da Coreia do Sul que combina técnicas tradicionais de massagem oriental com ciência dermatológica moderna.

### Origem e Filosofia

Na cultura coreana, o couro cabeludo é considerado uma extensão da pele facial — tratado com o mesmo cuidado e dedicação. O conceito de "scalp care" (두피 관리) surgiu nos salões de Gangnam (Seul) nos anos 2000 e rapidamente se tornou um fenômeno global.

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

### Por que o Head SPA está em alta?

O mercado global de tratamentos capilares premium cresceu 340% desde 2020. O Head SPA lidera essa tendência por oferecer:

- Resultado visível desde a primeira sessão
- Experiência sensorial incomparável (ASMR real)
- Tratamento holístico (mente + couro cabeludo + cabelo)
- Forte apelo visual para redes sociais
- Alto ticket médio com excelente margem`,
        quiz: [
          {
            pergunta: "Qual é o princípio fundamental do Head SPA Coreano?",
            opcoes: [
              "Tratar apenas a estética do cabelo",
              "O couro cabeludo é uma extensão da pele facial",
              "Usar apenas produtos importados",
              "Focar exclusivamente na massagem"
            ],
            respostaCorreta: 1,
            explicacao: "O Head SPA Coreano trata o couro cabeludo com o mesmo cuidado dedicado à pele facial, considerando-o a fundação para cabelos saudáveis."
          }
        ]
      },
      {
        titulo: "Anatomia do Couro Cabeludo",
        descricao: "Estrutura, camadas e pontos de acupressão craniana",
        duracaoMinutos: 15,
        conteudo: `## Anatomia Aplicada ao Head SPA

### Camadas do Couro Cabeludo (SCALP)

O couro cabeludo possui 5 camadas, memorizadas pelo acrônimo SCALP:

- **S** — Skin (Pele): Camada mais externa com folículos pilosos
- **C** — Connective tissue (Tecido conjuntivo): Rica em vasos sanguíneos e nervos
- **A** — Aponeurosis (Aponeurose): Membrana fibrosa que conecta os músculos
- **L** — Loose areolar tissue (Tecido areolar frouxo): Permite mobilidade
- **P** — Pericranium (Pericrânio): Membrana sobre o osso craniano

### Densidade e Irrigação

- O couro cabeludo contém 100.000-150.000 folículos capilares
- Recebe 15% do fluxo sanguíneo cardíaco
- Possui mais de 600 terminações nervosas por cm²
- A temperatura ideal do couro cabeludo saudável é 32-34°C

### Pontos de Acupressão Craniana (지압점)

**Ponto Baihui (백회)**: Topo da cabeça — equilíbrio energético geral
**Ponto Taiyang (태양)**: Têmporas — alívio de cefaleia e tensão
**Ponto Fengchi (풍지)**: Base do crânio — relaxamento da nuca
**Ponto Yintang (인당)**: Entre as sobrancelhas — calma mental
**Pontos Sishencong (사신총)**: 4 pontos ao redor do Baihui — estimulação capilar

### Ciclo de Crescimento Capilar

- **Anágena** (2-7 anos): Fase de crescimento ativo — 85% dos fios
- **Catágena** (2-3 semanas): Fase de transição — 1% dos fios
- **Telógena** (3-4 meses): Fase de repouso e queda — 14% dos fios

> Objetivo do Head SPA: Prolongar a fase anágena e nutrir o folículo para fios mais fortes e saudáveis.

### Tipos de Couro Cabeludo

- **Normal**: Brilho natural, sem excesso de oleosidade
- **Oleoso**: Produção sebácea acima de 1μg/cm²/min
- **Seco**: Descamação visível, baixa hidratação
- **Sensível**: Vermelhidão, irritação, prurido
- **Misto**: Oleosidade na região frontal, seco na nuca
- **Com dermatite**: Placas, crostas, inflamação ativa`,
        quiz: [
          {
            pergunta: "O que significa a letra 'A' no acrônimo SCALP?",
            opcoes: [
              "Artéria",
              "Aponeurose",
              "Areolar",
              "Adiposo"
            ],
            respostaCorreta: 1,
            explicacao: "A letra 'A' refere-se à Aponeurose (Aponeurosis), a membrana fibrosa que conecta os músculos frontal e occipital no couro cabeludo."
          },
          {
            pergunta: "Qual ponto de acupressão é indicado para estimulação capilar?",
            opcoes: [
              "Taiyang",
              "Yintang",
              "Sishencong",
              "Fengchi"
            ],
            respostaCorreta: 2,
            explicacao: "Os 4 pontos Sishencong, localizados ao redor do ponto Baihui no topo da cabeça, são específicos para estimulação do crescimento capilar."
          }
        ]
      },
      {
        titulo: "Biotipos Capilares e Diagnóstico",
        descricao: "Classificação coreana e análise com microcâmera",
        duracaoMinutos: 14,
        conteudo: `## Sistema de Diagnóstico K-Beauty para Couro Cabeludo

### Classificação Coreana de Biotipos (두피 유형)

A dermatologia coreana classifica o couro cabeludo em 6 tipos principais, cada um com protocolo específico:

### Tipo 1: 건성 두피 (Couro Cabeludo Seco)
- Descamação fina e esbranquiçada
- Sensação de repuxamento
- Protocolo: Hidratação intensiva com ceramidas e ácido hialurônico

### Tipo 2: 지성 두피 (Couro Cabeludo Oleoso)
- Brilho excessivo em menos de 12h após lavagem
- Folículos obstruídos por sebo
- Protocolo: Limpeza enzimática + regulação sebácea com niacinamida

### Tipo 3: 민감성 두피 (Couro Cabeludo Sensível)
- Vermelhidão, coceira, ardência
- Reação a produtos químicos
- Protocolo: Centella Asiatica + ingredientes calmantes, toque suave

### Tipo 4: 복합성 두피 (Couro Cabeludo Misto)
- Zona T oleosa, laterais e nuca secas
- Protocolo: Tratamento por zonas com produtos diferentes

### Tipo 5: 비듬성 두피 (Com Caspa)
- Descamação visível, flocos amarelados ou brancos
- Protocolo: Esfoliação salicílica + antifúngico natural (tea tree)

### Tipo 6: 탈모 두피 (Com Queda)
- Miniaturização dos fios, afinamento progressivo
- Protocolo: Estimulação folicular + peptídeos de crescimento

## Análise com Microcâmera (두피 진단)

A análise com microcâmera (60-200x de ampliação) avalia:

- **Densidade folicular**: Normal = 2-4 fios por folículo
- **Estado do poro**: Aberto, obstruído ou inflamado
- **Hidratação**: Escala de 1-5 (ideal = 3-4)
- **Oleosidade**: Quantidade de sebo visível ao redor do folículo
- **Espessura do fio**: Normal > 60μm
- **Eritema**: Presença de vermelhidão ou irritação

### Ficha de Diagnóstico Head SPA

Antes de cada sessão, preencha:
- [ ] Biotipo identificado
- [ ] Nível de hidratação (1-5)
- [ ] Nível de oleosidade (1-5)
- [ ] Presença de descamação
- [ ] Densidade folicular por zona
- [ ] Queixas do cliente
- [ ] Histórico de químicas (tintura, alisamento)
- [ ] Medicamentos em uso
- [ ] Alergias conhecidas`,
        checklist: [
          "Identificar biotipo do couro cabeludo",
          "Verificar hidratação com microcâmera",
          "Avaliar oleosidade por zona",
          "Registrar descamação e inflamação",
          "Documentar queixas do cliente",
          "Verificar histórico de químicas",
          "Checar medicamentos e alergias",
          "Fotografar para comparação futura"
        ]
      }
    ]
  },
  {
    titulo: "2. Protocolos Técnicos",
    descricao: "Passo a passo completo das 5 etapas do ritual",
    icone: "Target",
    cor: "from-emerald-50 to-teal-50",
    aulas: [
      {
        titulo: "Etapa 1: Análise e Diagnóstico",
        descricao: "Protocolo completo de avaliação inicial",
        duracaoMinutos: 10,
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
- Frequência de lavagem
- Produtos utilizados em casa
- Queixas principais
- Expectativas do tratamento

**2. Inspeção Visual (3 min)**
- Observar couro cabeludo a olho nu
- Identificar áreas de rarefação
- Verificar sinais de dermatite ou inflamação
- Avaliar textura e elasticidade dos fios

**3. Análise com Microcâmera (5 min)**
- Zona frontal (3 pontos)
- Zona temporal (2 pontos por lado)
- Zona do vértex (2 pontos)
- Zona occipital (2 pontos)
- Registrar fotos de cada zona

**4. Diagnóstico e Prescrição (2 min)**
- Classificar biotipo
- Selecionar protocolo adequado
- Explicar ao cliente o que foi encontrado
- Mostrar imagens comparativas de saúde ideal

> Dica: Sempre mostre as imagens da microcâmera ao cliente. Isso gera confiança, demonstra profissionalismo e justifica o investimento no tratamento.`,
        checklist: [
          "Preparar ambiente com iluminação adequada",
          "Higienizar microcâmera",
          "Realizar anamnese completa",
          "Inspeção visual de todo couro cabeludo",
          "Capturar imagens de 9+ pontos",
          "Classificar biotipo",
          "Apresentar diagnóstico ao cliente",
          "Definir protocolo personalizado"
        ]
      },
      {
        titulo: "Etapa 2: Limpeza Profunda",
        descricao: "Esfoliação enzimática e purificação do couro cabeludo",
        duracaoMinutos: 12,
        conteudo: `## Protocolo de Limpeza Profunda — Etapa 2

### Duração: 15-20 minutos

### Princípio

A limpeza profunda remove:
- Resíduos de produtos (silicones, polímeros)
- Células mortas acumuladas
- Sebo oxidado nos folículos
- Poluição e micropartículas

### Produtos Essenciais

**Esfoliante Enzimático**
- Ativos: Papaína, bromelina ou ácido salicílico (1-2%)
- pH ideal: 4.5-5.5
- Tempo de ação: 5-8 minutos

**Shampoo de Limpeza Profunda**
- Livre de sulfatos agressivos (SLS/SLES)
- Com tensoativos suaves (cocamidopropil betaína)
- Enriquecido com tea tree ou mentol

### Passo a Passo

**1. Pré-lavagem com água morna (38°C)**
- Umedecer completamente o cabelo e couro cabeludo
- 2 minutos de hidratação para amolecimento

**2. Aplicação do Esfoliante**
- Dividir em 4 quadrantes
- Aplicar com bico dosador diretamente no couro cabeludo
- Movimentos circulares suaves com polpas dos dedos
- Pressão: 2-3 numa escala de 1-5
- Tempo: 3 minutos por quadrante

**3. Vapor (opcional mas recomendado)**
- Vapor ozonizado por 5 minutos
- Potencializa a ação do esfoliante
- Abre os poros foliculares

**4. Emulsificação e Enxágue**
- Adicionar água morna para emulsificar
- Massagear suavemente por 2 minutos
- Enxaguar completamente

**5. Shampoo de Limpeza**
- Aplicar quantidade adequada (moeda de R$1)
- Duas aplicações: 1ª para limpar, 2ª para tratar
- Enxaguar com água fria na finalização (selar cutículas)

### Cuidados Importantes

- ❌ Nunca usar unhas — sempre polpas dos dedos
- ❌ Água quente acima de 40°C danifica o couro cabeludo
- ❌ Não esfoliar se houver feridas abertas ou inflamação ativa
- ✅ Ajustar concentração do esfoliante ao biotipo
- ✅ Couro cabeludo sensível: reduzir tempo para 2 min/quadrante`,
        checklist: [
          "Verificar temperatura da água (38°C)",
          "Umedecer completamente",
          "Aplicar esfoliante nos 4 quadrantes",
          "Massagear com polpas dos dedos (nunca unhas)",
          "Vapor por 5 minutos (se disponível)",
          "Emulsificar e enxaguar",
          "1ª aplicação de shampoo",
          "2ª aplicação de shampoo (tratamento)",
          "Finalizar com água fria"
        ]
      },
      {
        titulo: "Etapa 3: Massagem Craniana Terapêutica",
        descricao: "Técnicas de acupressão e deslizamento profundo",
        duracaoMinutos: 18,
        conteudo: `## Protocolo de Massagem Craniana — Etapa 3

### Duração: 20-30 minutos (coração do ritual)

A massagem craniana é o diferencial do Head SPA. Combina técnicas coreanas de acupressão (지압) com deslizamentos profundos para promover relaxamento extremo e estimulação folicular.

### Técnica 1: Effleurage Craniano (쓰다듬기)
- Deslizamentos longos e suaves da linha frontal até a nuca
- Pressão: 2/5 — toque superficial e envolvente
- Ritmo: Lento, sincronizado com a respiração do cliente
- Repetições: 10x em cada direção
- Objetivo: Relaxamento, aquecimento, confiança

### Técnica 2: Petrissage Craniano (주무르기)
- Movimentos de amassamento com polegares
- Pressão: 3-4/5 — firme mas confortável
- Foco: Músculos temporais, occipitais e frontal
- Duração: 5 minutos por região
- Objetivo: Liberação de tensão muscular

### Técnica 3: Acupressão nos Pontos-Chave (지압)
- Pressão sustentada de 5-8 segundos em cada ponto
- Progressão: Baihui → Sishencong → Taiyang → Fengchi
- Pressão: 3/5 — firme e constante
- 3 ciclos completos
- Objetivo: Equilíbrio energético, alívio de cefaleia

### Técnica 4: Fricção Circular (문지르기)
- Movimentos circulares pequenos com polpas dos dedos
- Diâmetro: 2-3cm
- Pressão: 3/5
- Cobertura total do couro cabeludo
- Objetivo: Estimulação da microcirculação

### Técnica 5: Tapotement Suave (두드리기)
- Batidas leves com ponta dos dedos
- Velocidade: Rápida mas delicada
- Duração: 30 segundos por zona
- Objetivo: Ativação nervosa, sensação ASMR

### Técnica 6: Tração Capilar (당기기)
- Segurar mechas na raiz e tracionar suavemente para cima
- Manter 3-5 segundos
- Cobrir toda a cabeça sistematicamente
- Objetivo: Estimulação do folículo, alívio de tensão

### Sequência Recomendada

1. Effleurage (3 min) — aquecimento
2. Petrissage temporal bilateral (3 min)
3. Petrissage occipital (3 min)
4. Acupressão — 3 ciclos (5 min)
5. Fricção circular — cobertura total (5 min)
6. Tração capilar (3 min)
7. Tapotement (2 min)
8. Effleurage final (2 min) — finalização

### Contraindicações da Massagem
- ❌ Feridas abertas ou suturas recentes
- ❌ Infecções ativas (foliculite, micose)
- ❌ Hipertensão não controlada
- ❌ Enxaqueca em crise aguda
- ❌ Pós-operatório craniano recente`,
        quiz: [
          {
            pergunta: "Qual técnica de massagem é ideal para estimulação ASMR?",
            opcoes: [
              "Effleurage",
              "Petrissage",
              "Tapotement",
              "Tração capilar"
            ],
            respostaCorreta: 2,
            explicacao: "O Tapotement (두드리기) com batidas leves e rápidas nas pontas dos dedos cria a sensação ASMR que é um diferencial do Head SPA Coreano."
          }
        ],
        checklist: [
          "Aquecer as mãos antes de iniciar",
          "Effleurage de aquecimento (3 min)",
          "Petrissage temporal e occipital",
          "Acupressão nos 5 pontos-chave",
          "Fricção circular completa",
          "Tração capilar suave",
          "Tapotement para sensação ASMR",
          "Effleurage de finalização",
          "Perguntar feedback ao cliente"
        ]
      },
      {
        titulo: "Etapa 4: Tratamentos Nutritivos",
        descricao: "Máscaras, ampolas e ativos coreanos de alta performance",
        duracaoMinutos: 14,
        conteudo: `## Protocolo de Nutrição — Etapa 4

### Duração: 15-20 minutos

### Ingredientes-Estrela K-Beauty para Couro Cabeludo

**Centella Asiatica (병풀)**
- Ação: Anti-inflamatória, cicatrizante, calmante
- Indicação: Couro cabeludo sensível, com dermatite
- Concentração ideal: 0.5-2%

**Ginseng Vermelho (홍삼)**
- Ação: Estimulação folicular, antioxidante potente
- Indicação: Queda capilar, afinamento dos fios
- Concentração ideal: 1-3%

**Niacinamida (비타민 B3)**
- Ação: Regulação sebácea, fortalecimento da barreira
- Indicação: Couro cabeludo oleoso ou misto
- Concentração ideal: 2-5%

**Ácido Hialurônico (히알루론산)**
- Ação: Hidratação profunda, retenção de umidade
- Indicação: Couro cabeludo seco, desidratado
- Peso molecular: Baixo peso para penetração

**Peptídeos de Cobre (구리 펩타이드)**
- Ação: Regeneração celular, crescimento capilar
- Indicação: Alopecia inicial, miniaturização
- Concentração ideal: 0.1-1%

**Camélia (동백)**
- Ação: Nutrição, brilho, proteção
- Indicação: Fios danificados, pontas secas
- Uso: Óleo puro ou em sérum

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
4. Toque mínimo — sem fricção`,
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
      {
        titulo: "Etapa 5: Aromaterapia e Finalização",
        descricao: "Vapor aromático, secagem e orientações para casa",
        duracaoMinutos: 10,
        conteudo: `## Protocolo de Aromaterapia e Finalização — Etapa 5

### Duração: 10-15 minutos

### Aromaterapia Capilar (아로마테라피)

A última etapa sela o ritual com uma experiência sensorial que o cliente jamais esquecerá.

**Óleos Essenciais Recomendados:**

- **Lavanda**: Relaxamento profundo, anti-inflamatório
- **Alecrim**: Estimulação do crescimento capilar
- **Hortelã-pimenta**: Refrescância, ativação circulatória
- **Cedro**: Equilíbrio sebáceo, fortalecimento
- **Ylang-ylang**: Brilho, hidratação, aroma luxuoso
- **Tea Tree**: Antisséptico, controle de caspa

**Blend por Objetivo:**

Relaxamento: 3 gotas lavanda + 2 gotas cedro + 1 gota ylang-ylang
Crescimento: 3 gotas alecrim + 2 gotas hortelã-pimenta + 1 gota cedro
Purificação: 3 gotas tea tree + 2 gotas limão + 1 gota hortelã-pimenta
Hidratação: 3 gotas ylang-ylang + 2 gotas lavanda + 1 gota camomila

### Aplicação do Vapor Aromático

1. Adicionar blend ao vaporizador ou toalha quente
2. Envolver a cabeça do cliente com toalha
3. Manter por 5-7 minutos
4. Ambiente com luz baixa e música suave

### Finalização

**Secagem Terapêutica:**
- Secador em temperatura morna (nunca quente)
- Distância mínima de 15cm
- Movimentos do couro cabeludo para as pontas
- Jato frio final para selar cutículas

**Aplicação do Leave-in:**
- Sérum finalizador leve (óleo de camélia ou argan)
- Aplicar apenas nos comprimentos e pontas
- Evitar couro cabeludo (exceto se prescrito)

### Orientações para Casa (홈케어)

Entregar ao cliente um mini-guia personalizado:
- Frequência ideal de lavagem para seu biotipo
- Produtos recomendados (home care)
- Intervalos sugeridos entre sessões de Head SPA
- Dicas de massagem caseira simples
- Alimentos benéficos para saúde capilar

> O pós-atendimento é onde se constrói a fidelização. O cliente que leva orientações para casa volta com mais frequência.`,
        checklist: [
          "Preparar blend aromático adequado",
          "Aplicar vapor ou toalha aromática",
          "Tempo de pausa 5-7 min",
          "Secar com temperatura adequada",
          "Aplicar leave-in nos comprimentos",
          "Entregar orientações de home care",
          "Agendar próxima sessão",
          "Solicitar feedback/avaliação"
        ]
      }
    ]
  },
  {
    titulo: "3. Ingredientes K-Beauty",
    descricao: "Ingredientes coreanos de alta performance para couro cabeludo",
    icone: "Heart",
    cor: "from-pink-50 to-rose-50",
    aulas: [
      {
        titulo: "Ingredientes Ativos Coreanos",
        descricao: "Os 15 ativos mais usados nos melhores Head SPAs da Coreia",
        duracaoMinutos: 15,
        conteudo: `## Top 15 Ingredientes K-Beauty para Head SPA

### Tier 1 — Essenciais

**1. Centella Asiatica (병풀 추출물)**
- Madecassosídeo + Asiaticosídeo
- Repara a barreira do couro cabeludo
- Anti-inflamatório natural comprovado
- Presente em 80% dos produtos K-beauty para scalp

**2. Ginseng Coreano (인삼)**
- Ginsenosídeos estimulam crescimento capilar
- Antioxidante 4x mais potente que vitamina C
- Versão fermentada tem absorção 3x maior

**3. Extrato de Arroz (쌀 추출물)**
- Rico em inositol — fortalece os fios
- Água de arroz fermentada (미감수) é segredo ancestral
- Aumenta elasticidade dos fios em até 30%

**4. Camélia Japônica (동백유)**
- Ácido oleico 85% — nutrição sem peso
- Óleo preferido das gueixas e yangban coreanos
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
**14. Peptídeos Biomimético**: Cobre + zinco para regeneração
**15. Extrato de Lótus (연꽃)**: Calmante premium, antienvelhecimento

### Como Combinar Ingredientes

✅ Combinações sinérgicas:
- Centella + Niacinamida (calmante + barreira)
- Ginseng + Peptídeos (estimulação + regeneração)
- Camélia + Arroz (nutrição + fortalecimento)

❌ Evitar combinar:
- AHA/BHA + Retinol/Bakuchiol (irritação)
- Vitamina C + Niacinamida em alta concentração
- Óleos essenciais puros + couro cabeludo sensível`,
        quiz: [
          {
            pergunta: "Qual ingrediente K-beauty está presente em 80% dos produtos para couro cabeludo?",
            opcoes: [
              "Ginseng",
              "Chá Verde",
              "Centella Asiatica",
              "Camélia"
            ],
            respostaCorreta: 2,
            explicacao: "A Centella Asiatica é o ingrediente mais popular em K-beauty para scalp care, presente em 80% dos produtos devido às suas propriedades anti-inflamatórias e reparadoras."
          }
        ]
      },
      {
        titulo: "Protocolos Sazonais",
        descricao: "Adaptações do Head SPA para cada estação do ano",
        duracaoMinutos: 10,
        conteudo: `## Protocolos Sazonais — Adaptação Inteligente

Na Coreia, os tratamentos capilares são ajustados conforme a estação. Isso maximiza resultados e diferencia seu serviço.

### 🌸 Primavera (봄) — Renovação
**Foco**: Detox pós-inverno, preparação para umidade
- Esfoliação mais intensa (sebo acumulado)
- Ativos: Chá verde + Centella
- Massagem: Foco em drenagem linfática
- Finalização: Leave-in leve com proteção UV

### ☀️ Verão (여름) — Proteção
**Foco**: Controle de oleosidade, proteção solar capilar
- Limpeza reforçada (suor + protetor solar)
- Ativos: Niacinamida + Tea Tree + Mentol
- Massagem: Técnicas refrescantes, compressas frias
- Finalização: Bruma refrescante com SPF capilar

### 🍂 Outono (가을) — Fortalecimento
**Foco**: Combater queda sazonal, fortalecer raízes
- Estimulação folicular intensificada
- Ativos: Ginseng + Peptídeos + Biotina
- Massagem: Fricção circular prolongada + tração
- Finalização: Sérum de fortalecimento leave-in

### ❄️ Inverno (겨울) — Hidratação
**Foco**: Combater ressecamento, nutrir profundamente
- Hidratação intensiva multicamadas
- Ativos: Ácido Hialurônico + Camélia + Mel
- Massagem: Effleurage prolongado com óleo quente
- Finalização: Máscara overnight (para casa)

### Duração das Sessões por Estação

| Estação | Limpeza | Massagem | Nutrição | Total |
| Primavera | 20 min | 25 min | 15 min | 75 min |
| Verão | 25 min | 20 min | 10 min | 70 min |
| Outono | 15 min | 30 min | 20 min | 80 min |
| Inverno | 15 min | 25 min | 25 min | 80 min |

> Ajuste seus pacotes e preços sazonalmente. Clientes adoram sentir que o tratamento é verdadeiramente personalizado para o momento.`
      },
      {
        titulo: "Melhores Marcas e Onde Comprar",
        descricao: "Seleção curada das melhores marcas profissionais com links de compra",
        duracaoMinutos: 15,
        conteudo: `## Guia de Marcas Profissionais para Head SPA

### 🏆 Marcas Premium Coreanas (Uso Profissional)

**1. Nard — Scalp Care Line**
- Especialidade: Tratamento profissional de couro cabeludo
- Destaque: Shampoo esfoliante enzimático, tônico capilar
- Indicação: Oleosidade, caspa, queda
- 🛒 [Comprar na Amazon](https://www.amazon.com.br/s?k=Nard+scalp+care)
- 🛒 [Site oficial](https://nard.co.kr)

**2. Aromatica — Scalp Scaling Line**
- Especialidade: Esfoliação e purificação natural
- Destaque: Rosemary Scalp Scaling Shampoo, Tea Tree Tonic
- Certificação: EWG Verified, Vegan, Cruelty-free
- 🛒 [Comprar na Amazon](https://www.amazon.com.br/s?k=Aromatica+scalp)
- 🛒 [Comprar na Shopee](https://shopee.com.br/search?keyword=aromatica%20scalp)

**3. Dr. Groot — Anti-Hair Loss**
- Especialidade: Prevenção de queda capilar
- Destaque: Linha com ginseng e centella
- Marca mais vendida de scalp care na Coreia
- 🛒 [Comprar na Amazon](https://www.amazon.com.br/s?k=Dr+Groot+anti+hair+loss)
- 🛒 [Comprar no Mercado Livre](https://www.mercadolivre.com.br/jm/search?as_word=dr+groot)

**4. Ryo (려) — Jayangyunmo**
- Especialidade: Herbal anti-queda com ginseng
- Destaque: Shampoo #1 da Coreia por 10+ anos consecutivos
- Ingrediente principal: Ginseng vermelho fermentado
- 🛒 [Comprar na Amazon](https://www.amazon.com.br/s?k=Ryo+Jayangyunmo)
- 🛒 [Comprar na Shopee](https://shopee.com.br/search?keyword=ryo%20shampoo%20ginseng)

**5. Lador — Scalp Hair Pack**
- Especialidade: Máscaras e tratamentos capilares profissionais
- Destaque: Scalp Scaling Spa, Keratin Hair Pack
- Excelente custo-benefício para salão
- 🛒 [Comprar na Amazon](https://www.amazon.com.br/s?k=Lador+scalp+spa)
- 🛒 [Comprar na Shopee](https://shopee.com.br/search?keyword=lador%20scalp)

### 🧴 Marcas de Ativos e Ampolas

**6. SOME BY MI — AHA/BHA/PHA Scalp**
- Destaque: Escalpe com ácidos suaves para esfoliação
- 🛒 [Amazon](https://www.amazon.com.br/s?k=some+by+mi+scalp)

**7. Mise en Scène — Perfect Serum**
- Destaque: Sérum finalizador com óleo de argan e camélia
- Encontra em qualquer loja de cosméticos K-beauty
- 🛒 [Amazon](https://www.amazon.com.br/s?k=mise+en+scene+perfect+serum)
- 🛒 [Shopee](https://shopee.com.br/search?keyword=mise%20en%20scene%20serum)

**8. Cosrx — Centella Line**
- Destaque: Produtos com centella de alta concentração
- Uso: Adaptar tônicos faciais para couro cabeludo sensível
- 🛒 [Amazon](https://www.amazon.com.br/s?k=cosrx+centella)

### 🛠️ Equipamentos Profissionais

**Microcâmera Capilar**
- Modelo recomendado: Scalp Camera 200x USB/WiFi
- 🛒 [Amazon](https://www.amazon.com.br/s?k=microcamera+capilar+200x)
- 🛒 [AliExpress](https://pt.aliexpress.com/w/wholesale-scalp-camera-200x.html)

**Vaporizador de Ozônio Capilar**
- Para potencializar tratamentos e abrir poros foliculares
- 🛒 [Amazon](https://www.amazon.com.br/s?k=vaporizador+capilar+ozonio)
- 🛒 [Mercado Livre](https://www.mercadolivre.com.br/jm/search?as_word=vaporizador+capilar+ozonio)

**Capacete LED Capilar**
- LED Vermelho 630nm + Infravermelho 830nm
- 🛒 [Amazon](https://www.amazon.com.br/s?k=capacete+LED+capilar)
- 🛒 [AliExpress](https://pt.aliexpress.com/w/wholesale-led-hair-growth-helmet.html)

### 🌿 Óleos Essenciais para Aromaterapia

**doTERRA (parceiro Resinkra)**
- Lavanda, Alecrim, Hortelã-pimenta, Tea Tree, Cedro
- Pureza terapêutica certificada CPTG
- 🛒 Solicitar via app Resinkra ou com sua consultora

**Laszlo**
- Marca brasileira de óleos essenciais puros
- 🛒 [Site oficial](https://laszlo.com.br)
- 🛒 [Amazon](https://www.amazon.com.br/s?k=laszlo+oleo+essencial)

**Phytoterápica**
- Óleos essenciais 100% naturais com laudo
- 🛒 [Site oficial](https://phytoterapica.com.br)
- 🛒 [Amazon](https://www.amazon.com.br/s?k=phytoterapica+oleo+essencial)

### 💡 Dicas de Compra para Profissionais

- **Kit inicial estimado**: R$ 1.500-3.000 (produtos + microcâmera)
- **Reposição mensal**: R$ 300-600 (para 20-30 atendimentos)
- Compre em **kits profissionais** — desconto de 20-40% vs. unidade
- Prefira sempre **tamanho profissional** (500ml-1L) ao invés de varejo
- Importe diretamente da Coreia via **iHerb** ou **YesStyle** para economia de até 50%
- 🛒 [iHerb K-beauty](https://www.iherb.com/c/k-beauty)
- 🛒 [YesStyle Hair Care](https://www.yesstyle.com/en/hair-care/list.html)

> Monte um kit de demonstração com mini-tamanhos de cada marca para testar antes de investir em volume profissional.`,
        checklist: [
          "Pesquisar marcas disponíveis no Brasil",
          "Montar kit inicial de produtos",
          "Adquirir microcâmera capilar",
          "Selecionar óleos essenciais de qualidade",
          "Calcular custo por atendimento",
          "Organizar estoque de reposição",
          "Testar produtos antes de usar em clientes"
        ]
      }
    ]
  },
  {
    titulo: "4. Tendências e Inovações",
    descricao: "O que há de mais atual no mercado de Head SPA global",
    icone: "Lightbulb",
    cor: "from-amber-50 to-yellow-50",
    aulas: [
      {
        titulo: "Tendências Head SPA 2025-2026",
        descricao: "Scalp microbiome, LED therapy, AI diagnosis e mais",
        duracaoMinutos: 12,
        conteudo: `## Tendências que Estão Moldando o Futuro do Head SPA

### 1. Microbioma Capilar (두피 마이크로바이옴)

A ciência do microbioma chegou ao couro cabeludo. Assim como o gut microbiome revolucionou a nutrição, o scalp microbiome está revolucionando o cuidado capilar.

- Cada couro cabeludo tem um ecossistema único de bactérias
- Desequilíbrio = caspa, oleosidade, queda
- Novos produtos com prebióticos e probióticos tópicos
- Marcas coreanas líderes: Dr. Ceuracle, Briogeo, Galactomyces

### 2. LED e Fototerapia (광선 치료)

- **LED Vermelho (630-670nm)**: Estimula ATP celular, crescimento capilar
- **LED Infravermelho (830nm)**: Penetração profunda, regeneração
- **LED Azul (415nm)**: Antibacteriano, controle de oleosidade
- Capacetes LED: sessões de 15-20 min após massagem
- ROI excelente: investimento único, uso ilimitado

### 3. Diagnóstico por IA

- Microcâmeras com análise automatizada por inteligência artificial
- Classificação automática de biotipo
- Acompanhamento de evolução com métricas precisas
- Recomendação personalizada de produtos
- Marcas: Scalp AI, Folliscope AI, K-Derma Vision

### 4. Head SPA ASMR

- Integração intencional de sons ASMR no ritual
- Gravação e publicação para marketing (TikTok, Instagram)
- Sons dos produtos, da água, das técnicas manuais
- Investimento em acústica do espaço
- Conteúdos ASMR de Head SPA têm 2-5x mais engajamento

### 5. Personalização com Biotecnologia

- Formulação de produtos sob medida baseada em DNA capilar
- Impressão 3D de máscaras capilares personalizadas
- Nanotecnologia para entrega de ativos na raiz
- Testes genéticos para predição de calvície

### 6. Head SPA Masculino

- Mercado masculino crescendo 480% ao ano
- Foco: Prevenção de calvície, controle de oleosidade
- Ambiente e marketing adaptados
- Pacotes "express" de 30-40 min

### 7. Sustentabilidade K-Beauty

- Embalagens refil e biodegradáveis
- Ingredientes orgânicos certificados
- Economia circular de água no ritual
- Certificações Vegan & Cruelty-free

> A tendência mais importante não é nenhuma tecnologia específica — é a personalização extrema. O futuro do Head SPA é cada sessão ser única para cada cliente.`,
        quiz: [
          {
            pergunta: "Qual comprimento de onda do LED é usado para estimular o crescimento capilar?",
            opcoes: [
              "Azul (415nm)",
              "Verde (525nm)",
              "Vermelho (630-670nm)",
              "Ultravioleta (280nm)"
            ],
            respostaCorreta: 2,
            explicacao: "O LED Vermelho (630-670nm) estimula a produção de ATP celular, promovendo o crescimento capilar e a regeneração do folículo."
          }
        ]
      },
      {
        titulo: "Head SPA Temático e Experiencial",
        descricao: "Rituais temáticos, experiências imersivas e diferenciação",
        duracaoMinutos: 10,
        conteudo: `## Criando Experiências Memoráveis

### Rituais Temáticos

**Ritual Jeju (제주)**
- Inspirado na ilha vulcânica de Jeju
- Ingredientes: Lama vulcânica, chá verde de Jeju, água marinha
- Música: Sons do oceano de Jeju
- Aroma: Tangerina de Jeju + lavanda

**Ritual Hanok (한옥)**
- Inspirado nas casas tradicionais coreanas
- Ingredientes: Ginseng, arroz, camélia
- Decoração: Elementos de madeira, cerâmica coreana
- Chá servido: Yuja-cha (citron coreano)

**Ritual Moonlight (달빛)**
- Sessão noturna premium
- Iluminação lunar (LEDs âmbar)
- Ingredientes calmantes: Lavanda, camomila, mugwort
- Objetivo: Relaxamento profundo + melhor qualidade de sono

**Ritual K-Pop Glow**
- Para público jovem e trendy
- Foco em brilho e instagram-worthy
- Ingredientes com glitter biodegradável
- Playlist K-Pop curada
- Stories/Reels durante o ritual

### Elevando a Experiência

**Multissensorial:**
- Visão: Iluminação cromática (cor muda a cada etapa)
- Audição: Playlist curada ou ASMR
- Olfato: Difusor com blend exclusivo do seu espaço
- Tato: Texturas variadas (toalha quente → compressa fria)
- Paladar: Chá coreano ou água aromatizada na recepção

**Antes do Atendimento:**
- Recepção com chá e biscoito coreano
- Ficha digital em tablet (mais moderno que papel)
- Tour pelo espaço (se for primeira vez)

**Durante o Atendimento:**
- Coberta ponderada para relaxamento
- Máscara para os olhos (opcional)
- Temperatura ambiente controlada (22-24°C)

**Depois do Atendimento:**
- Foto before/after com microcâmera
- Mini-kit com amostras dos produtos usados
- Cartão com QR code para home care personalizado`
      }
    ]
  },
  {
    titulo: "5. Negócios e Vendas",
    descricao: "Como precificar, vender e escalar seu Head SPA",
    icone: "BarChart3",
    cor: "from-violet-50 to-purple-50",
    aulas: [
      {
        titulo: "Precificação e Pacotes",
        descricao: "Estratégias de preço e criação de pacotes rentáveis",
        duracaoMinutos: 12,
        conteudo: `## Estratégia de Precificação para Head SPA

### Posicionamento Premium

O Head SPA é um serviço de alto valor agregado. Não concorra por preço — concorra por experiência.

### Estrutura de Preços Sugerida

**Sessão Avulsa:**
- Head SPA Essential (60 min): R$ 250-350
- Head SPA Premium (90 min): R$ 400-550
- Head SPA Luxury (120 min): R$ 600-800

**Pacotes (com desconto progressivo):**

| Pacote | Sessões | Desconto | Preço/sessão |
| Starter | 3 sessões | 10% | R$ 315 |
| Regular | 6 sessões | 15% | R$ 297 |
| VIP | 12 sessões | 20% | R$ 280 |

### Add-ons de Alto Valor

- Análise com microcâmera detalhada: +R$ 80
- LED Therapy (15 min): +R$ 100
- Ampola premium importada: +R$ 120-200
- Massagem facial integrada: +R$ 150
- Kit home care personalizado: +R$ 180-350

### Modelo de Assinatura

**Plano Mensal Head SPA:**
- 1 sessão/mês + home care: R$ 299/mês
- 2 sessões/mês + home care: R$ 499/mês
- Benefícios: Prioridade de agenda, descontos em produtos, sessão bônus no aniversário

### Cálculo de Rentabilidade

**Custos por sessão (estimativa):**
- Produtos: R$ 30-60
- Tempo do profissional (1h): R$ 50-80
- Energia/água/consumíveis: R$ 15
- Total de custo: ~R$ 100-155

**Margem por sessão avulsa Premium (R$ 450):**
- Receita: R$ 450
- Custo: ~R$ 130
- Margem: R$ 320 (71%)

> Head SPA tem uma das melhores margens da estética. Com 4 atendimentos/dia, 5 dias/semana, o faturamento bruto chega a R$ 36.000/mês.

### Dicas de Precificação
- ✅ Sempre ofereça 3 opções (ancoragem)
- ✅ Inclua sempre um "add-on" para aumentar o ticket
- ✅ Pacotes com nome exclusivo (não "pacote 1, 2, 3")
- ✅ Reajuste 10% ao ano — posicionamento premium
- ❌ Nunca dê desconto sem contrapartida (indicação, pacote)`,
        quiz: [
          {
            pergunta: "Qual é a margem estimada de uma sessão avulsa Premium de Head SPA?",
            opcoes: [
              "40-50%",
              "50-60%",
              "60-70%",
              "70-80%"
            ],
            respostaCorreta: 3,
            explicacao: "Com receita de R$ 450 e custo de ~R$ 130, a margem é de aproximadamente 71%, uma das melhores da estética."
          }
        ]
      },
      {
        titulo: "Marketing e Captação de Clientes",
        descricao: "Estratégias de marketing digital e offline para Head SPA",
        duracaoMinutos: 14,
        conteudo: `## Marketing Especializado para Head SPA

### Marketing de Conteúdo

**Instagram/TikTok (prioridade máxima):**
- Vídeos ASMR do processo (30-60 seg)
- Before/After com microcâmera
- Reels dos produtos sendo aplicados
- Stories do dia a dia no espaço
- Depoimentos em vídeo de clientes

**Frequência ideal**: 4-5 posts/semana

**Hashtags estratégicas**:
#HeadSPA #HeadSPACoreano #두피스파 #ScalpCare #KBeauty #TratamentoCapilar #MassagemCraniana #CuidadoCapilar #BemEstar #SPACapilar

### Funil de Vendas

**Topo (Consciência):**
- Conteúdo educativo sobre saúde capilar
- Vídeos virais ASMR
- Parcerias com influencers de beleza

**Meio (Consideração):**
- Oferta de análise gratuita com microcâmera
- E-book "Guia do Couro Cabeludo Saudável"
- Workshop gratuito online de auto-massagem craniana

**Fundo (Conversão):**
- Primeira sessão com 20% de desconto
- Pacote "Experiência Completa" para primeiro tratamento
- Garantia de satisfação (se não gostar, não paga)

### Parcerias Estratégicas

- Dermatologistas: Indicação mútua para casos clínicos
- Cabeleireiros: Co-marketing, espaço compartilhado
- Academias e SPAs: Pacotes combo
- Empresas: QVT com Head SPA corporativo
- Noivas: Pacotes pré-casamento
- Hotéis boutique: Serviço in-room

### Fidelização

- Programa de pontos (cada R$1 = 1 ponto)
- Sessão bônus a cada 10 sessões
- Cartão VIP com benefícios exclusivos
- Indicou, ganhou: R$50 de crédito por indicação
- Presente de aniversário: Mini-sessão gratuita

### Métricas para Acompanhar

- Taxa de retorno (meta: >70%)
- Ticket médio (meta: R$ 400+)
- Taxa de conversão de análise → sessão (meta: >60%)
- NPS — Net Promoter Score (meta: >80)
- Crescimento mensal de clientes novos (meta: 15%)`
      },
      {
        titulo: "Montando seu Espaço de Head SPA",
        descricao: "Equipamentos, layout, investimento e ROI",
        duracaoMinutos: 12,
        conteudo: `## Como Montar seu Espaço de Head SPA

### Equipamentos Essenciais

**Investimento Inicial (Básico): R$ 8.000-15.000**
- Cadeira/poltrona reclinável profissional: R$ 2.000-4.000
- Lavatório com ducha de pressão regulável: R$ 1.500-3.000
- Microcâmera capilar (60-200x): R$ 800-2.500
- Vaporizador capilar: R$ 500-1.500
- Kit de produtos profissionais: R$ 1.500-3.000
- Toalhas, capas, consumíveis: R$ 500-1.000

**Investimento Premium: R$ 25.000-50.000**
- Poltrona massageadora elétrica: R$ 5.000-12.000
- Microcâmera com IA integrada: R$ 3.000-8.000
- Capacete LED profissional: R$ 3.000-6.000
- Vapor ozonizado: R$ 2.000-4.000
- Sistema de som ambiente: R$ 1.000-3.000
- Decoração K-beauty temática: R$ 3.000-8.000
- Difusores aromáticos profissionais: R$ 500-1.500

### Layout Ideal

**Espaço mínimo**: 12m² por estação
**Ideal**: 16-20m² por estação

Elementos obrigatórios:
- Iluminação regulável (dimerizável)
- Ventilação adequada
- Ponto de água quente e fria
- Espelho e bancada de apoio
- Armazenamento para produtos
- Privacidade acústica

### Cálculo de ROI

**Cenário conservador** (1 estação, 3 clientes/dia):
- Investimento inicial: R$ 15.000
- Faturamento mensal: R$ 18.000 (20 dias × 3 × R$ 300)
- Custos operacionais: R$ 5.400 (30%)
- Lucro líquido: R$ 12.600/mês
- ROI: **Payback em 1.2 meses**

**Cenário otimista** (2 estações, 5 clientes/dia):
- Investimento inicial: R$ 40.000
- Faturamento mensal: R$ 50.000
- Custos operacionais: R$ 17.500 (35%)
- Lucro líquido: R$ 32.500/mês
- ROI: **Payback em 1.3 meses**

### Fornecedores Recomendados

Para encontrar fornecedores K-beauty profissionais:
- Feiras: Beauty Fair SP, K-Beauty Expo
- Importadores especializados em cosméticos coreanos
- Plataformas B2B: Alibaba (marcas OEM), Olive Young Pro
- Distribuidores nacionais de dermocosméticos

> Comece com o básico e reinvista o lucro. O Head SPA tem um dos melhores ROIs do setor de estética — use isso a seu favor.`,
        quiz: [
          {
            pergunta: "Qual é o espaço mínimo recomendado por estação de Head SPA?",
            opcoes: [
              "8m²",
              "12m²",
              "16m²",
              "20m²"
            ],
            respostaCorreta: 1,
            explicacao: "O espaço mínimo recomendado é de 12m² por estação, permitindo conforto para o profissional e o cliente, além de armazenamento adequado."
          }
        ]
      }
    ]
  },
  {
    titulo: "6. Prática e Certificação",
    descricao: "Exercícios práticos, avaliação final e certificado",
    icone: "GraduationCap",
    cor: "from-orange-50 to-red-50",
    aulas: [
      {
        titulo: "Revisão Prática Integrada",
        descricao: "Exercício completo simulando um atendimento real",
        duracaoMinutos: 15,
        conteudo: `## Exercício Prático — Simulação de Atendimento Completo

### Objetivo
Executar um atendimento completo de Head SPA do início ao fim, aplicando todos os conhecimentos adquiridos.

### Cenário de Simulação

**Cliente**: Mulher, 35 anos
**Queixas**: Queda capilar nos últimos 3 meses, couro cabeludo oleoso, estresse alto
**Histórico**: Coloração a cada 2 meses, usa shampoo de farmácia
**Expectativas**: Reduzir queda, relaxar, ter cabelo mais bonito

### Roteiro do Atendimento (90 min)

**Fase 1 — Acolhimento (5 min)**
- Recepção com chá
- Explicação do ritual
- Assinatura do termo de consentimento

**Fase 2 — Diagnóstico (15 min)**
- Anamnese completa
- Análise com microcâmera: 9 pontos
- Classificação: Oleoso + queda
- Apresentação do diagnóstico ao cliente
- Seleção do protocolo: Purificação + Crescimento

**Fase 3 — Limpeza Profunda (20 min)**
- Esfoliante com ácido salicílico 1.5%
- 2x shampoo purificante com tea tree
- Vapor ozonizado 5 min

**Fase 4 — Massagem Craniana (25 min)**
- Sequência completa das 8 técnicas
- Ênfase em acupressão (pontos de crescimento)
- Fricção circular prolongada

**Fase 5 — Nutrição (15 min)**
- Tônico de niacinamida no couro cabeludo
- Ampola de ginseng + peptídeos de cobre
- Massagem de ativação (5 min extra)

**Fase 6 — Finalização (10 min)**
- Vapor com blend de alecrim + hortelã-pimenta
- Secagem terapêutica
- Fotos after com microcâmera
- Orientações de home care
- Sugestão de pacote trimestral

### Auto-avaliação

Após completar a simulação, avalie-se:
- [ ] Realizei anamnese completa?
- [ ] Identifiquei corretamente o biotipo?
- [ ] Selecionei protocolo adequado às queixas?
- [ ] Executei todas as técnicas de massagem?
- [ ] Escolhi ingredientes corretos para o caso?
- [ ] Dei orientações claras de home care?
- [ ] Sugeri retorno/pacote?
- [ ] O cliente ficaria satisfeito?`,
        checklist: [
          "Acolhimento com chá e explicação",
          "Anamnese completa realizada",
          "Microcâmera — 9 pontos capturados",
          "Biotipo e protocolo definidos",
          "Diagnóstico apresentado ao cliente",
          "Limpeza profunda executada",
          "Massagem craniana completa (8 técnicas)",
          "Nutrição com ativos adequados",
          "Aromaterapia e finalização",
          "Fotos comparativas registradas",
          "Home care orientado",
          "Próxima sessão agendada"
        ]
      },
      {
        titulo: "Avaliação Final e Certificado",
        descricao: "Quiz final com todas as matérias e certificado de conclusão",
        duracaoMinutos: 20,
        conteudo: `## Avaliação Final — Head SPA Coreano Profissional

### Instruções

Esta é a avaliação final do curso. Ao completar todas as aulas e acertar 70% ou mais das questões dos quizzes ao longo do curso, você receberá seu certificado de conclusão.

### Revisão dos Tópicos Principais

**Módulo 1 — Fundamentos:**
- Filosofia do Head SPA coreano
- Anatomia SCALP do couro cabeludo
- 6 biotipos capilares coreanos
- Uso da microcâmera para diagnóstico

**Módulo 2 — Protocolos Técnicos:**
- 5 etapas do ritual completo
- 8 técnicas de massagem craniana
- Pontos de acupressão
- Ingredientes por protocolo

**Módulo 3 — Ingredientes K-Beauty:**
- Top 15 ativos coreanos
- Combinações sinérgicas e contraindicações
- Protocolos sazonais

**Módulo 4 — Tendências:**
- Microbioma capilar
- LED e fototerapia
- Head SPA ASMR e temático
- IA no diagnóstico

**Módulo 5 — Negócios:**
- Precificação premium
- Pacotes e assinaturas
- Marketing digital e parcerias
- Montagem do espaço e ROI

### Seu Certificado

Ao concluir 100% das aulas, você receberá:

🏆 **Certificado de Conclusão**
Head SPA Coreano Profissional
Carga horária: 20 horas
Conteúdo: Técnicas, Ingredientes, Negócios e Tendências

> Este certificado atesta que você domina os fundamentos teóricos e práticos do Head SPA Coreano. Continue praticando e se atualizando para oferecer o melhor serviço aos seus clientes!

### Próximos Passos

1. Pratique as técnicas com modelos voluntários
2. Monte seu kit básico de produtos
3. Faça 10 atendimentos supervisionados
4. Comece a divulgar nas redes sociais
5. Defina seus pacotes e preços
6. Agende sua primeira sessão paga! 🚀`,
        quiz: [
          {
            pergunta: "Quantas camadas possui o couro cabeludo (acrônimo SCALP)?",
            opcoes: ["3", "4", "5", "6"],
            respostaCorreta: 2,
            explicacao: "O couro cabeludo possui 5 camadas: Skin, Connective tissue, Aponeurosis, Loose areolar tissue e Pericranium."
          },
          {
            pergunta: "Qual a duração recomendada da etapa de massagem craniana?",
            opcoes: ["10-15 min", "15-20 min", "20-30 min", "30-45 min"],
            respostaCorreta: 2,
            explicacao: "A massagem craniana dura 20-30 minutos e é considerada o coração do ritual Head SPA."
          },
          {
            pergunta: "Qual ingrediente K-beauty é ideal para couro cabeludo oleoso?",
            opcoes: ["Camélia", "Ácido Hialurônico", "Niacinamida", "Mel de Manuka"],
            respostaCorreta: 2,
            explicacao: "A Niacinamida (2-5%) é o ingrediente ideal para regulação sebácea e fortalecimento da barreira do couro cabeludo oleoso."
          },
          {
            pergunta: "Qual o espaço mínimo recomendado por estação de Head SPA?",
            opcoes: ["8m²", "10m²", "12m²", "16m²"],
            respostaCorreta: 2,
            explicacao: "O espaço mínimo recomendado é 12m² por estação para garantir conforto e funcionalidade."
          }
        ]
      }
    ]
  }
];
