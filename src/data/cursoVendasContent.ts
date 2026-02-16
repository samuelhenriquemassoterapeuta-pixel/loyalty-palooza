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

export const cursoVendasData: ModuloContent[] = [
  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 1 — FUNDAÇÃO: MENTALIDADE DO VENDEDOR  (6 h · 3 aulas)
  // ═══════════════════════════════════════════════════════════════
  {
    titulo: "1. Fundação — Mentalidade do Vendedor",
    descricao: "Por que vender é essencial, pilares da venda e perfis de clientes",
    icone: "Lightbulb",
    cor: "from-amber-50 to-orange-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Por que vender é essencial na massoterapia",
        descricao: "A realidade do mercado e a venda como consequência natural",
        duracaoMinutos: 60,
        conteudo: `# Por que Vender é Essencial na Massoterapia

## A Realidade do Mercado

Muitos massoterapeutas excelentes tecnicamente enfrentam dificuldades financeiras não por falta de competência, mas por falta de habilidades de venda. Vender não é "empurrar" serviços — é **conectar pessoas a soluções que transformam suas vidas**.

| Dado | Implicação |
| Brasil entre os 3 maiores mercados de estética do mundo | Alta concorrência, mas também alta demanda |
| Ter demanda não significa automaticamente vender bem | É preciso estratégia para converter interesse em agendamento |
| Clientes buscam alívio do estresse e dores | Seu serviço atende necessidades reais e urgentes |

## A Venda como Consequência Natural

> "Quando sua equipe domina os procedimentos, escuta de verdade e sabe lidar com objeções de forma humana e estratégica, as vendas deixam de ser uma barreira e passam a ser uma consequência natural de um atendimento bem feito."

## Vender é Cuidar — Não é Empurrar

### A Mentalidade do Terapeuta-Consultor

Muitos terapeutas associam vendas a algo forçado ou antiético. Mas a verdade é:

> **Quando você deixa de oferecer um tratamento que pode ajudar o cliente, você está negando cuidado.**

### Princípios Fundamentais

- **Venda = Prescrição profissional** — Assim como um médico prescreve tratamento, você recomenda sessões baseado na avaliação clínica
- **O cliente não sabe o que precisa** — Ele sente dor, mas não conhece as opções. Você é o especialista
- **Omissão não é ética** — Se identifica que o cliente precisa de 9 sessões mas oferece apenas 1, está sendo omisso

### Mudança de Vocabulário

❌ "Quer comprar um pacote?"
✅ "Pelo que avaliei, você precisa de pelo menos 6 sessões para tratar essa contratura. Temos um pacote de 6 horas por R$900 que já garante o tratamento completo. Faz sentido para você?"`,
        quiz: [
          {
            pergunta: "Qual é a mentalidade correta do terapeuta-consultor?",
            opcoes: ["Focar em vender o pacote mais caro", "Prescrever o tratamento adequado como profissional de saúde", "Deixar o cliente decidir sozinho", "Oferecer desconto para fechar rápido"],
            respostaCorreta: 1,
            explicacao: "O terapeuta-consultor age como um profissional de saúde: avalia, diagnostica e prescreve o tratamento adequado."
          },
          {
            pergunta: "Por que a omissão NÃO é ética na massoterapia?",
            opcoes: ["Porque a clínica perde receita", "Porque o cliente pode reclamar", "Porque deixar de oferecer tratamento necessário é negar cuidado", "Porque é obrigação legal"],
            respostaCorreta: 2,
            explicacao: "Se você identifica que o cliente precisa de tratamento continuado mas não oferece, está sendo omisso com a saúde dele."
          }
        ],
        checklist: [
          "Refleti sobre minha resistência pessoal a vendas",
          "Mudei vocabulário de 'vender' para 'prescrever'",
          "Identifiquei 3 clientes que poderiam ter se beneficiado de pacotes",
          "Pratiquei o script de prescrição profissional"
        ]
      },
      {
        titulo: "Os pilares da venda no setor de bem-estar",
        descricao: "Confiança, clareza, conexão, valor e ética profissional",
        duracaoMinutos: 55,
        conteudo: `# Os Pilares da Venda no Setor de Bem-Estar

## Os 4 Pilares

| Pilar | Descrição | Aplicação na Massoterapia |
| **Confiança** | Cliente precisa acreditar em você | Transmitir segurança técnica e empatia |
| **Clareza** | Cliente precisa entender o serviço | Explicar benefícios de forma simples |
| **Conexão** | Cliente precisa se sentir compreendido | Escuta ativa das dores e necessidades |
| **Valor** | Cliente precisa perceber que vale a pena | Demonstrar resultados e diferenciais |

## Ética Profissional em Vendas Terapêuticas

### O Limite Ético

Existe uma diferença crucial entre:
- **Recomendar** o que o cliente precisa (ético)
- **Pressionar** para vender o mais caro (antiético)

### Princípios Inegociáveis

- **Consentimento sempre** — O cliente precisa entender e concordar
- **Limites profissionais** — Manter postura adequada em todas as interações
- **Honestidade sobre expectativas** — Nunca prometer resultados impossíveis
- **Respeitar o "não" genuíno** — Saber quando parar de insistir

### Situações Delicadas

**Cliente com expectativas inadequadas:**
> "Entendo o que você busca, mas preciso ser honesto: em 1 sessão podemos aliviar a tensão, mas para resolver de fato, precisamos de um tratamento contínuo."

**Cliente com restrições financeiras reais:**
> Ofereça o pacote menor ou sugira espaçar mais as sessões. Nunca force um compromisso que o cliente não pode arcar.

**Quando NÃO vender:**
- Se a condição do cliente exige encaminhamento médico
- Se o cliente está emocionalmente vulnerável demais para decidir
- Se o serviço não é adequado para aquela necessidade

### Regra de Ouro

> **Recomende apenas o que você indicaria para um familiar.** Se seu irmão tivesse essa dor, qual seria seu conselho honesto?`,
        quiz: [
          {
            pergunta: "Qual é a Regra de Ouro da ética em vendas?",
            opcoes: ["Sempre oferecer o pacote mais rentável", "Recomendar apenas o que indicaria para um familiar", "Nunca falar de preço antes da segunda sessão", "Dar desconto para todos os novos clientes"],
            respostaCorreta: 1,
            explicacao: "Se seu irmão tivesse essa dor, qual seria seu conselho honesto? Essa é a bússola ética."
          }
        ],
        checklist: [
          "Memorizei os 4 pilares da venda no bem-estar",
          "Compreendi os 4 princípios inegociáveis de ética",
          "Pratiquei respostas para clientes com expectativas inadequadas",
          "Apliquei a Regra de Ouro em pelo menos 1 atendimento"
        ]
      },
      {
        titulo: "Perfis de clientes na massoterapia",
        descricao: "Os 4 perfis de cliente e como abordá-los estrategicamente",
        duracaoMinutos: 55,
        conteudo: `# Perfis de Clientes na Massoterapia

## Os 4 Perfis e a Abordagem Ideal

| Tipo de Massagem | Público Principal | Necessidade/Dor |
| **Massagem Relaxante** | Profissionais estressados, executivos | Alívio do estresse, relaxamento |
| **Massagem Terapêutica** | Atletas, pessoas com lesões | Alívio de dores, recuperação muscular |
| **Massagem Estética** | Mulheres e homens preocupados com aparência | Celulite, modelagem corporal |
| **Massagem Infantil** | Crianças, pais | Alívio de tensões, bem-estar infantil |

## Os 4 Perfis Comportamentais

### 🔴 Cliente de Dor (Urgência)
- **Motivação:** Dor aguda, tensão insuportável, restrição de movimento
- **Comportamento:** Busca solução imediata, aceita investir se resolver rápido
- **Pacote ideal:** 6hrs (R$900) ou 9hrs (R$1.260)
- **Script:** "Vamos resolver essa dor agora e criar um plano para ela não voltar."

### 🟡 Cliente de Prevenção (Consciência)
- **Motivação:** Já sentiu dor antes, quer evitar recorrência
- **Comportamento:** Pesquisa, compara opções, pensa a longo prazo
- **Pacote ideal:** VIP 24hrs (R$2.976)
- **Script:** "Manter uma rotina de sessões é muito mais barato que tratar crises."

### 🟢 Cliente de Bem-Estar (Autocuidado)
- **Motivação:** Relaxamento, qualidade de vida
- **Comportamento:** Valoriza experiência, ambiente, regularidade
- **Pacote ideal:** VIP 24hrs ou 48hrs
- **Script:** "Esse é o seu momento. O VIP 48 horas é perfeito para quem faz do autocuidado uma prioridade."

### 🔵 Cliente Experimental (Primeiro contato)
- **Motivação:** Curiosidade, indicação de amigo, promoção
- **Comportamento:** Cauteloso, quer testar antes de se comprometer
- **Pacote ideal:** 3hrs (R$480)
- **Script:** "Para conhecer nosso trabalho, temos o pacote de 3 horas por R$480."

## Exercício: Identifique seus Clientes

Para cada cliente desta semana:
1. Em qual perfil ele se encaixa?
2. Você usou a abordagem correta?
3. Qual pacote deveria ter oferecido?`,
        quiz: [
          {
            pergunta: "Qual pacote é ideal para o Cliente Experimental?",
            opcoes: ["VIP 48hrs", "9hrs — tratamento completo", "3hrs (R$480) — porta de entrada", "Sessão avulsa"],
            respostaCorreta: 2,
            explicacao: "O pacote de 3hrs é a porta de entrada ideal: baixo compromisso, permite experimentar o serviço."
          },
          {
            pergunta: "O Cliente de Prevenção se caracteriza por:",
            opcoes: ["Dor aguda e urgência", "Curiosidade e primeiro contato", "Já sentiu dor e quer evitar recorrência", "Busca relaxamento"],
            respostaCorreta: 2,
            explicacao: "O cliente de prevenção já teve experiência com dor e quer evitar que volte. Pensa a longo prazo."
          }
        ],
        checklist: [
          "Classifiquei meus 5 últimos clientes nos 4 perfis",
          "Preparei scripts personalizados para cada perfil",
          "Identifiquei qual perfil é mais comum na minha agenda",
          "Adaptei minha abordagem para pelo menos 1 cliente esta semana"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 2 — ATENDIMENTO CONSULTIVO  (8 h · 3 aulas)
  // ═══════════════════════════════════════════════════════════════
  {
    titulo: "2. Atendimento Consultivo",
    descricao: "Venda consultiva, escuta ativa e técnica SPIN Selling adaptada",
    icone: "Heart",
    cor: "from-rose-50 to-pink-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "O que é venda consultiva",
        descricao: "Diferenças entre venda tradicional e consultiva aplicada à massoterapia",
        duracaoMinutos: 50,
        conteudo: `# O que é Venda Consultiva

## Definição

Venda consultiva é uma abordagem estratégica e personalizada, focada em entender as necessidades do cliente e oferecer soluções que realmente agreguem valor. Diferente das abordagens tradicionais, as vendas consultivas colocam as necessidades e desafios do cliente em primeiro plano.

## Diferenças entre Venda Tradicional e Consultiva

| Aspecto | Venda Tradicional | Venda Consultiva |
| Foco | Produto/serviço | Cliente e suas necessidades |
| Abordagem | Oferecer características | Resolver problemas |
| Postura | Falar mais | Ouvir mais |
| Objetivo | Fechar rápido | Construir relacionamento |
| Resultado | Venda pontual | Fidelização e indicações |

## Como Aplicar na Massoterapia

### Antes da Sessão
- Fazer perguntas sobre dores, rotina e expectativas
- Ouvir genuinamente sem interromper
- Identificar a necessidade real (nem sempre é o que o cliente diz)

### Durante a Sessão
- Explicar o que está fazendo e por quê
- Demonstrar conhecimento técnico de forma acessível
- Criar momentos de conexão

### Após a Sessão
- Recomendar tratamento continuado com base na avaliação
- Apresentar opções (não imposição)
- Facilitar a decisão

## Framework de Apresentação

1. **Identifique** o problema específico do cliente
2. **Explique** a causa de forma simples
3. **Apresente** o plano de tratamento com pacote adequado
4. **Comprove** com dados ou casos similares
5. **Facilite** a decisão (opções de pacote, parcelamento)`,
        quiz: [
          {
            pergunta: "Na venda consultiva, qual a postura correta do profissional?",
            opcoes: ["Falar mais que o cliente", "Ouvir mais que falar", "Apresentar todos os serviços disponíveis", "Fechar a venda o mais rápido possível"],
            respostaCorreta: 1,
            explicacao: "Na venda consultiva, o profissional ouve mais do que fala, focando em entender as necessidades reais do cliente."
          }
        ],
        checklist: [
          "Compreendi a diferença entre venda tradicional e consultiva",
          "Apliquei o framework de apresentação em 1 atendimento",
          "Ouvi mais do que falei durante a última consulta",
          "Recomendei tratamento baseado na avaliação, não na intuição"
        ]
      },
      {
        titulo: "A escuta ativa como ferramenta de venda",
        descricao: "Regra 80/20, perguntas estratégicas e técnica de validação",
        duracaoMinutos: 55,
        conteudo: `# A Escuta Ativa como Ferramenta de Venda

## A palavra mais falada no mundo: "EU"

As pessoas precisam, gostam, sentem a necessidade de falar delas mesmas. Use isso a seu favor.

## Regra 80/20

O cliente fala 80% do tempo. Você fala 20%.

Seus 20% são:
- Perguntas estratégicas (70%)
- Validações (20%)
- Recomendações (10%)

## Técnicas de Escuta Ativa

| Técnica | Descrição | Exemplo |
| **Perguntas abertas** | Incentivam o cliente a se expressar | "Qual é o seu principal objetivo com esse tratamento?" |
| **Parafrasear** | Repetir com suas palavras | "Então você sente dores na lombar há 3 meses, correto?" |
| **Validar emoções** | Demonstrar compreensão | "Entendo como isso deve ser desconfortável no seu dia a dia." |
| **Silêncio estratégico** | Dar espaço para continuar | Não interromper, esperar |

## O que Descobrir na Escuta Ativa

- Quais são as dores específicas do cliente
- Há quanto tempo sofre com o problema
- Como isso afeta a qualidade de vida
- O que já tentou antes
- Quais são suas expectativas

## Perguntas Estratégicas

**Sobre a dor:**
- "Em uma escala de 0 a 10, como está sua dor hoje?"
- "Quando essa dor começou?"
- "Isso afeta seu sono? Seu trabalho?"

**Sobre expectativas:**
- "O que você espera alcançar com as sessões?"

**Sobre rotina:**
- "Como é seu dia a dia? Fica muito tempo sentado?"

## Técnica de Validação

Após ouvir, repita com suas palavras:

> "Deixa eu ver se entendi: você sente dor nas costas há 3 meses, piora quando fica sentada, e isso está atrapalhando seu sono. Correto?"

**Isso demonstra:** atenção, empatia e profissionalismo — e posiciona você para recomendar o pacote certo.`,
        quiz: [
          {
            pergunta: "Na Regra 80/20, qual a proporção ideal?",
            opcoes: ["Terapeuta fala 80%, cliente 20%", "Cliente fala 80%, terapeuta 20%", "Ambos falam 50% cada", "Depende do perfil do cliente"],
            respostaCorreta: 1,
            explicacao: "O cliente deve falar 80% do tempo. Seus 20% são perguntas estratégicas, validações e recomendações."
          }
        ],
        checklist: [
          "Apliquei a Regra 80/20 em pelo menos 1 atendimento",
          "Usei técnica de validação (repetir com minhas palavras)",
          "Fiz pelo menos 3 perguntas abertas antes de recomendar",
          "Pratiquei o silêncio estratégico"
        ]
      },
      {
        titulo: "Técnica SPIN Selling adaptada",
        descricao: "Situação, Problema, Implicação e Necessidade aplicados à massoterapia",
        duracaoMinutos: 55,
        conteudo: `# Técnica SPIN Selling Adaptada para Massoterapia

## O que é SPIN Selling

Metodologia criada por Neil Rackham que usa 4 tipos de perguntas em sequência para conduzir o cliente até a solução.

## Os 4 Tipos de Perguntas

| Tipo | Objetivo | Pergunta Exemplo |
| **S**ituação | Entender o contexto atual | "Quais tratamentos você já realizou para alívio das dores?" |
| **P**roblema | Identificar as dificuldades | "O que mais te incomoda nessa região do corpo?" |
| **I**mplicação | Explorar consequências | "Como essa dor tem afetado seu trabalho/sono/bem-estar?" |
| **N**ecessidade | Conduzir à solução | "Como você acha que uma massagem terapêutica regular poderia ajudar?" |

## Exemplo Prático Completo

### Situação
> "Você já fez algum tipo de tratamento antes para essa dor?" → "Fiz fisioterapia há 6 meses."

### Problema
> "E essa dor voltou? O que mais te incomoda?" → "Voltou forte, não consigo dormir direito."

### Implicação
> "Essa falta de sono está afetando seu trabalho?" → "Muito, estou sempre cansada."

### Necessidade
> "Se conseguíssemos resolver essa dor e você voltasse a dormir bem, como seria?" → "Seria maravilhoso!"

### Prescrição
> "Para seu caso, recomendo um ciclo de 9 sessões de massagem terapêutica. Temos o pacote de 9 horas por R$1.260 que garante o tratamento completo."

## Construindo Autoridade sem Arrogância

### Conhecimento Demonstrado (não declarado)

❌ "Eu sou especialista em drenagem linfática."
✅ "Pela avaliação, identifiquei um acúmulo de líquido na região dos tornozelos. Com a drenagem, vamos estimular o sistema linfático a drenar esse excesso."

### Linguagem Acessível

❌ "Você tem trigger points no trapézio superior."
✅ "Você tem pontos de tensão nessa região do ombro — são nódulos que se formam por postura inadequada e estresse."`,
        quiz: [
          {
            pergunta: "Na técnica SPIN, qual o objetivo das perguntas de Implicação?",
            opcoes: ["Entender o contexto", "Identificar dificuldades", "Explorar consequências do problema", "Conduzir à solução"],
            respostaCorreta: 2,
            explicacao: "As perguntas de Implicação exploram as consequências do problema, fazendo o cliente perceber a urgência de resolvê-lo."
          }
        ],
        checklist: [
          "Memorizei os 4 tipos de perguntas SPIN",
          "Pratiquei a sequência completa em 1 atendimento",
          "Demonstrei conhecimento sem declarar títulos",
          "Usei linguagem acessível ao explicar condições"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 3 — TÉCNICAS DE VENDA  (10 h · 3 aulas)
  // ═══════════════════════════════════════════════════════════════
  {
    titulo: "3. Técnicas de Venda",
    descricao: "Rapport, gatilhos mentais, reciprocidade e destruição de objeções",
    icone: "Target",
    cor: "from-blue-50 to-indigo-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Rapport e venda de soluções",
        descricao: "Conexão inicial, espelhamento e benefícios vs. características",
        duracaoMinutos: 65,
        conteudo: `# Rapport e Venda de Soluções

## Rapport: A Conexão Inicial

**O que é:** Fazer com que o cliente veja em você uma pessoa semelhante, alguém em quem confie.

### Técnicas de Rapport

| Técnica | Descrição | Exemplo |
| **Espelhamento corporal** | Copiar sutilmente a linguagem | Se gesticula, gesticular também |
| **Espelhamento vocal** | Adequar ritmo e tom de voz | Se fala rápido, falar rápido |
| **Linguagem** | Usar vocabulário similar | Evitar jargões técnicos se é leigo |
| **Respiração** | Sincronizar a respiração | Especialistas copiam até a respiração |

**Cuidado:** Seja natural — espelhamento forçado é percebido como falsidade.

## Venda de Soluções, Não de Características

**O Erro Mais Comum:** Vendedores "ruins" oferecem características. Em 90% das vezes, o consumidor sequer entende.

| Característica (o que é) | Benefício (o que resolve) |
| "Uso a técnica Kobido" | "Massagem facial japonesa que levanta sua pele sem agulhas" |
| "A sessão dura 90 minutos" | "Tempo suficiente para tratar todas as áreas e sair renovado" |
| "Utilizo óleos essenciais puros" | "Você relaxa enquanto a pele recebe nutrientes naturais" |

## Fórmula da Venda de Soluções

> "Nós temos o tratamento perfeito para **sua dor específica**. Utilizamos **técnica avançada** que apresenta **resultados duradouros** e já ajudou **clientes com o mesmo problema** que você."

## Comunicação Empática

### Adapte-se ao Cliente
- **Cliente apressado** → Seja objetivo e direto
- **Cliente conversador** → Dê espaço, mas conduza
- **Cliente ansioso** → Fale devagar, explique cada etapa
- **Cliente silencioso** → Respeite o silêncio, pergunte apenas o necessário`,
        quiz: [
          {
            pergunta: "Qual a melhor forma de apresentar um serviço?",
            opcoes: ["Listar todas as características técnicas", "Focar nos benefícios que resolve para o cliente", "Comparar com concorrentes", "Mostrar certificados e diplomas"],
            respostaCorreta: 1,
            explicacao: "Clientes compram soluções, não características. Foque no que o serviço resolve na vida do cliente."
          }
        ],
        checklist: [
          "Pratiquei espelhamento de linguagem corporal",
          "Converti 3 características em benefícios",
          "Ajustei tom de voz em diferentes momentos do atendimento",
          "Adaptei comunicação para pelo menos 2 perfis diferentes"
        ]
      },
      {
        titulo: "Gatilhos mentais e reciprocidade",
        descricao: "Os 7 gatilhos aplicados e a técnica 'dar para receber'",
        duracaoMinutos: 60,
        conteudo: `# Gatilhos Mentais e Reciprocidade

## Os 7 Gatilhos Mentais Aplicados à Massoterapia

| Gatilho | Descrição | Aplicação |
| **Escassez** | "Temos poucas vagas" | "Tenho apenas 3 horários esta semana" |
| **Urgência** | "Oferta válida hoje" | "Condição especial válida até amanhã" |
| **Prova Social** | "Várias pessoas estão fazendo" | "Muitos clientes com dores similares têm tido ótimos resultados" |
| **Autoridade** | "Sou especialista" | Formação, certificações, experiência |
| **Dor/Prazer** | Evitar dor, buscar prazer | "Imagine dormir sem aquela dor nas costas" |
| **Aceitação Social** | "Todos estão fazendo" | "Tratamento mais procurado por quem tem tensão" |
| **Exclusividade** | "Oferta especial para você" | "Selecionei alguns clientes para uma condição especial" |

## Técnica "Dar para Receber"

### O Princípio da Reciprocidade

A gratidão e necessidade de "pagar dívidas" é inerente ao ser humano. Quando oferece algo primeiro, o cliente se sente mais propenso a comprar.

### Exemplos de "Brindes" na Massoterapia

| Tipo | Exemplo |
| **Físico** | Amostra de óleo essencial, chá após a sessão |
| **Informação** | Dica exclusiva de alongamento para o problema |
| **Tempo** | 5 minutos extras na massagem |
| **Atenção** | Elogio genuíno, interesse verdadeiro |

**Cuidado:** O "brinde" precisa ser natural. Se você se passar por superficial e bajulador, não conseguirá efetivar a venda.

## Técnica de Ancoragem — Sempre 3 Opções

O primeiro número que o cliente ouve define sua referência de preço. Apresente 3 opções:

> "Para seu caso:
> - 6 horas por R$900 (ideal para iniciar)
> - **9 horas por R$1.260** (completa o ciclo com economia) ← EMPURRE PARA ESSA
> - VIP 24 horas por R$2.976 (melhor custo-benefício)"

**O que acontece:** A pessoa raramente escolhe a mais barata. Tende para o meio ou até a maior.

### Regra de Ouro

**Nunca apresente o preço sem antes demonstrar o VALOR.** Primeiro a avaliação, depois a recomendação, por último o preço.`,
        quiz: [
          {
            pergunta: "Na técnica de ancoragem, quantas opções devemos apresentar?",
            opcoes: ["1 opção (a ideal)", "2 opções", "3 opções (cliente tende ao meio)", "5 ou mais opções"],
            respostaCorreta: 2,
            explicacao: "Ao apresentar 3 opções, o cliente raramente escolhe a mais barata, tendendo para o meio."
          },
          {
            pergunta: "Qual cuidado é essencial na técnica 'dar para receber'?",
            opcoes: ["Dar presentes caros", "O brinde deve ser natural, não superficial", "Sempre dar desconto", "Nunca dar nada de graça"],
            respostaCorreta: 1,
            explicacao: "O brinde precisa ser natural e genuíno. Bajulação forçada é percebida e gera desconfiança."
          }
        ],
        checklist: [
          "Memorizei os 7 gatilhos mentais e seus exemplos",
          "Pratiquei a técnica de ancoragem com 3 opções",
          "Apliquei pelo menos 1 'brinde' natural nesta semana",
          "Nunca apresentei preço antes de demonstrar valor"
        ]
      },
      {
        titulo: "Destruição de objeções",
        descricao: "As 7 objeções mais comuns e scripts prontos de resposta",
        duracaoMinutos: 65,
        conteudo: `# Destruição de Objeções

## As 7 Objeções Mais Comuns

### 1. "Está caro"
**Significado real:** "Não entendi o valor."

> "Compreendo. Deixa eu te explicar: são R$140 por hora, com avaliação personalizada. Pode parcelar em 3x de R$420 no cartão."

### 2. "Vou pensar"
**Significado real:** "Tenho dúvidas não respondidas."

**Técnica do Esclarecimento:**
> "Claro! Só para te ajudar — é o valor, o formato, ou prefere sentir mais resultados antes?"

### 3. "Prefiro pagar só quando vier"
**Significado real:** "Não quero compromisso."

> "Sem problema! Só para ter ideia: 1x por semana por 2 meses = R$1.280 avulso. No pacote 9hrs = R$1.260. Mesmo valor, com uma hora extra e total flexibilidade."

### 4. "E se eu não usar tudo?"
**Significado real:** "Medo de desperdiçar."

> "Suas horas nunca expiram! Clientes pausaram 6 meses e voltaram — crédito lá esperando."

### 5. "Não tenho esse dinheiro agora"
**Significado real:** "Fluxo de caixa apertado."

> "Entendo! Pode parcelar no cartão. O de 9 horas fica em 3x de R$420 — menos que uma sessão avulsa por mês."

### 6. "Preciso falar com meu marido/esposa"
**Significado real:** "Preciso de validação."

> "Com certeza! Posso preparar um resumo com o plano e valores para vocês analisarem juntos?"

### 7. "Vi mais barato"
**Significado real:** "Me convença do diferencial."

> "Nosso diferencial: horas sem validade, avaliação personalizada, acompanhamento por app e programa de cashback. O mais barato pode sair caro se não resolver."

## Técnica do Desconto Estratégico

> "Posso fazer em 3x sem juros e ainda dar 5% de desconto se fechar hoje."

Muitas pessoas, ao "receber" um desconto, mesmo que pequeno, se dão por satisfeitas.

## Quando NÃO Insistir

Se o cliente disse não 2 vezes de formas diferentes, respeite. Plante a semente:

> "Sem problema! Quando sentir necessidade, é só me chamar — as condições estarão aqui para você."`,
        quiz: [
          {
            pergunta: "Quando o cliente diz 'É caro', o significado real é:",
            opcoes: ["Realmente não pode pagar", "Não entendeu o valor do serviço", "Quer desconto", "Está comparando com outra clínica"],
            respostaCorreta: 1,
            explicacao: "'É caro' geralmente significa que o cliente não percebeu o valor. A solução é demonstrar economia e benefícios."
          },
          {
            pergunta: "Como responder 'E se eu não usar tudo?'",
            opcoes: ["Oferecer pacote menor", "Dar desconto para compensar", "Explicar que as horas NUNCA expiram", "Dizer que é raro não usar"],
            respostaCorreta: 2,
            explicacao: "O diferencial é que as horas nunca expiram, eliminando completamente o medo de desperdício."
          }
        ],
        checklist: [
          "Decorei as 7 objeções e seus significados reais",
          "Pratiquei scripts de resposta em voz alta",
          "Respondi a pelo menos 1 objeção real esta semana",
          "Identifiquei as 3 objeções mais frequentes nos meus atendimentos"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 4 — DOMÍNIO TÉCNICO DOS SERVIÇOS  (6 h · 2 aulas)
  // ═══════════════════════════════════════════════════════════════
  {
    titulo: "4. Domínio Técnico dos Serviços",
    descricao: "Conhecer profundamente o que vende e mapa de benefícios por massagem",
    icone: "BookOpen",
    cor: "from-emerald-50 to-green-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Conheça profundamente o que você vende",
        descricao: "Como transmitir segurança e confiança pelo domínio técnico",
        duracaoMinutos: 55,
        conteudo: `# Conheça Profundamente o que Você Vende

## Por que o Domínio Técnico Importa

Se tem algo que toda cliente busca antes de fechar um tratamento, é **segurança e confiança**. Isso começa no momento em que ela percebe que sua equipe domina cada detalhe do procedimento.

## Exemplo Comparativo

| Abordagem Genérica | Abordagem Estratégica |
| "Fazemos massagem relaxante, melhora bastante." | "Trabalhamos com técnicas de liberação miofascial, que atuam nos pontos de tensão que você mencionou. Na primeira sessão já sente diferença na mobilidade." |

## Perguntas que sua Equipe Deve Saber Responder

- O que diferencia seu serviço dos demais?
- Por que sua clínica é a escolha mais segura?
- Como aquele tratamento resolve a dor específica da cliente?
- Quantas sessões são necessárias para cada tipo de queixa?
- Quais os resultados esperados em cada fase do tratamento?

## Nossos 5 Pacotes — Detalhamento

| Pacote | Horas | Valor | Por Hora | Economia |
| Essencial | 3 hrs | R$480 | R$160/hr | Base |
| Tratamento | 6 hrs | R$900 | R$150/hr | 6,25% |
| Completo | 9 hrs | R$1.260 | R$140/hr | 12,5% |
| VIP 24 | 24 hrs | R$2.976 | R$124/hr | 22,5% |
| VIP 48 | 48 hrs | R$5.232 | R$109/hr | 31,9% |

## GRANDE Diferencial: Horas NUNCA Expiram!

> "Diferente de outras clínicas, aqui suas horas são eternas. Teve uma fase corrida? Viajou? Sem problema, seu crédito te espera."`,
        quiz: [
          {
            pergunta: "Qual o grande diferencial dos pacotes da clínica?",
            opcoes: ["Desconto progressivo de 50%", "As horas NUNCA expiram", "Inclui produtos de aromaterapia", "Atendimento 24 horas"],
            respostaCorreta: 1,
            explicacao: "O maior diferencial é que as horas nunca expiram, eliminando o medo de desperdiçar o investimento."
          }
        ],
        checklist: [
          "Decorei valores e economia de cada pacote",
          "Sei explicar cada técnica de forma acessível",
          "Respondi as 5 perguntas-chave com confiança",
          "Memorizei que as horas nunca expiram (diferencial-chave)"
        ]
      },
      {
        titulo: "Mapa de benefícios por tipo de massagem",
        descricao: "Benefícios específicos para apresentar na hora da venda",
        duracaoMinutos: 55,
        conteudo: `# Mapa de Benefícios por Tipo de Massagem

## Serviços e Benefícios a Destacar

| Serviço | Benefícios a Destacar |
| **Massagem Relaxante** | Redução do cortisol, melhora do sono, alívio do estresse |
| **Massagem Terapêutica** | Alívio de dores crônicas, recuperação muscular, prevenção de lesões |
| **Drenagem Linfática** | Redução de inchaço, eliminação de toxinas, sensação de leveza |
| **Massagem Facial (FaceSPA)** | Lifting natural, pele radiante, relaxamento profundo |
| **Pedras Quentes** | Relaxamento muscular profundo, equilíbrio energético |
| **Liberação Miofascial** | Alívio de pontos-gatilho, mobilidade aumentada |
| **Head SPA** | Saúde capilar, relaxamento craniano, detox do couro cabeludo |

## Upsell e Cross-sell Inteligente

### A Escada de Valor

**Avulso → 3hrs → 6hrs → 9hrs → VIP 24hrs → VIP 48hrs**

Cada passo é um upgrade natural baseado nos resultados.

### Cross-sells Naturais

| Serviço Principal | Complemento Natural |
| Massagem terapêutica | Head SPA |
| Drenagem linfática | Plano alimentar |
| Tratamento corporal | Avaliação postural |
| Pacote individual | Vale presente para amigo |

### Script de Cross-sell

> "Para potencializar o resultado entre as sessões, recomendo esse óleo essencial para usar em casa. Nossos clientes que usam relatam resultados muito melhores."

### Usando Cashback como Aliado

> "No pacote de 9 horas, além da economia de R$180, você ainda acumula cashback em cada sessão!"

### Regra: SEMPRE Oferecer

**Meta: 100% dos clientes avulsos recebem oferta de pacote.** Não é pressão — é prescrição profissional.`,
        quiz: [
          {
            pergunta: "Qual é a meta de taxa de oferta de pacotes?",
            opcoes: ["50% dos clientes", "Apenas recorrentes", "100% — todo cliente recebe oferta", "Só quando perguntam"],
            respostaCorreta: 2,
            explicacao: "100% dos clientes devem receber oferta de pacote. Se oferece para 50%, perde metade das oportunidades."
          }
        ],
        checklist: [
          "Memorizei os benefícios de cada tipo de massagem",
          "Mapeei cross-sells naturais para cada serviço",
          "Ofereci pacote a 100% dos clientes avulsos esta semana",
          "Usei o cashback como argumento de venda"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 5 — CONHECENDO A CLIENTE  (6 h · 2 aulas)
  // ═══════════════════════════════════════════════════════════════
  {
    titulo: "5. Conhecendo a Cliente Profundamente",
    descricao: "Escuta profunda e ficha de anamnese com foco em vendas",
    icone: "Heart",
    cor: "from-pink-50 to-rose-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "A técnica da escuta profunda",
        descricao: "Como ir além do que o cliente diz e descobrir a necessidade real",
        duracaoMinutos: 55,
        conteudo: `# A Técnica da Escuta Profunda

## Mais que Técnica, Entenda de Gente

Muito mais do que entender de técnica, quem vende precisa entender de gente.

## Exemplo Clássico

Uma cliente chega dizendo que quer tratar dores nas costas. Se sua equipe apenas oferece massagem relaxante, perde a oportunidade de se conectar de verdade.

Ao aprofundar:

> "O que mais te incomoda nessa dor?"
> "Esse incômodo te atrapalha em algo no dia a dia?"

Você pode descobrir que, na verdade, a cliente quer **conseguir brincar com os filhos sem sentir dor** ou **dormir melhor à noite**.

Esse detalhe muda como o serviço será apresentado, focando nos benefícios para a qualidade de vida — e não apenas na técnica.

## Técnica de Aprofundamento

### Nível 1: Superficial
> "Sinto dor nas costas."

### Nível 2: Consequência
> "Não consigo dormir direito por causa da dor."

### Nível 3: Emocional
> "Estou irritada e cansada o tempo todo. Minha família está sofrendo."

### Nível 4: Desejo
> "Quero voltar a ser quem eu era antes dessa dor."

**É no Nível 4 que a venda acontece naturalmente.** Quando você conecta o tratamento ao desejo mais profundo, o preço deixa de ser objeção.

## Como Chegar ao Nível 4

- Pergunte "por quê" de formas diferentes
- Use validações emocionais entre as perguntas
- Não tenha pressa — dê tempo para o cliente se abrir
- Anote mentalmente e use na hora de recomendar`,
        quiz: [
          {
            pergunta: "Em qual nível a venda acontece mais naturalmente?",
            opcoes: ["Nível 1 (Superficial)", "Nível 2 (Consequência)", "Nível 3 (Emocional)", "Nível 4 (Desejo profundo)"],
            respostaCorreta: 3,
            explicacao: "Quando você conecta o tratamento ao desejo mais profundo do cliente, o preço deixa de ser objeção."
          }
        ],
        checklist: [
          "Pratiquei chegar ao Nível 4 em pelo menos 1 atendimento",
          "Conectei o tratamento ao desejo profundo do cliente",
          "Usei validações emocionais entre perguntas",
          "Anotei insights para usar na recomendação"
        ]
      },
      {
        titulo: "Ficha de anamnese com foco em vendas",
        descricao: "Perguntas estratégicas que mapeiam oportunidades comerciais",
        duracaoMinutos: 55,
        conteudo: `# Ficha de Anamnese com Foco em Vendas

## Perguntas Estratégicas

| Pergunta | Objetivo Comercial |
| "O que te motivou a buscar esse atendimento hoje?" | Identificar a dor principal |
| "O que você espera sentir depois da sessão?" | Entender a expectativa de resultado |
| "Já experimentou outras abordagens?" | Conhecer história e objeções passadas |
| "Com que frequência gostaria de se cuidar?" | Mapear potencial de pacotes |
| "Alguma data especial chegando?" (aniversário, viagem) | Criar senso de urgência |

## Como Usar a Anamnese para Vender

### Antes da Sessão
- Preencher a ficha com calma (5-10 min)
- Demonstrar interesse genuíno em cada resposta
- Anotar gatilhos emocionais e necessidades latentes

### Após a Sessão
- Revisitar as respostas da anamnese
- Conectar o resultado da sessão com as expectativas declaradas
- Usar os dados para personalizar a recomendação de pacote

## Exemplo de Uso

**Na anamnese:** Cliente disse que tem viagem em 1 mês e quer estar "renovada".

**Na recomendação:**
> "Para você chegar na sua viagem se sentindo renovada, recomendo 4 sessões semanais. O pacote de 6 horas é perfeito para isso — e como as horas não expiram, se sobrar, usa depois!"

## Árvore de Decisão — Qual Pacote Indicar?

**Queixa → Modalidade → Frequência → Pacote**

- Dor lombar crônica → Terapêutica → 1x/semana por 8 semanas → 9hrs
- Estresse/ansiedade → Relaxante → 2x/mês manutenção → VIP 24hrs
- Pós-cirúrgico → Drenagem → 3x/semana por 2 semanas → 6hrs
- Autocuidado regular → Relaxante/Spa → 1x/semana → VIP 48hrs
- Primeira vez → Avaliação → Experimentar → 3hrs`,
        quiz: [
          {
            pergunta: "Qual pacote indicar para dor lombar crônica, 1x/semana?",
            opcoes: ["3hrs — porta de entrada", "6hrs — tratamento pontual", "9hrs — ciclo completo de 8 semanas", "VIP 48hrs"],
            respostaCorreta: 2,
            explicacao: "Dor crônica 1x/semana por 8 semanas = 9hrs. É o ciclo completo de tratamento."
          }
        ],
        checklist: [
          "Incluí as 5 perguntas estratégicas na minha anamnese",
          "Usei dados da anamnese para personalizar 1 recomendação",
          "Imprimi a Árvore de Decisão no consultório",
          "Conectei expectativa do cliente ao pacote adequado"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 6 — PÓS-VENDA E FIDELIZAÇÃO  (8 h · 2 aulas)
  // ═══════════════════════════════════════════════════════════════
  {
    titulo: "6. Pós-Venda e Fidelização",
    descricao: "O segredo do pós-venda, programas de fidelidade e indicações",
    icone: "MessageCircle",
    cor: "from-green-50 to-teal-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "O segredo do pós-venda",
        descricao: "Estratégias de acompanhamento que geram fidelização e indicação",
        duracaoMinutos: 60,
        conteudo: `# O Segredo do Pós-Venda

## Por que o Pós-Venda é Tudo

Encantar no pós-venda é o que faz sua cliente lembrar de você sem que precise de desconto para voltar.

## Exemplo Prático

Após a sessão, a equipe envia uma mensagem no dia seguinte:

> "Oi, Ana! Tudo bem? Só passei para saber como você está se sentindo após a massagem. Qualquer dúvida ou se precisar de algo, estou por aqui."

**Resultado:**
- Cliente se sente acompanhada
- Gera indicação espontânea
- Cria relação de longo prazo

## Estratégias de Pós-Venda

| Estratégia | Descrição | Quando Aplicar |
| **Mensagem de acompanhamento** | Perguntar como está se sentindo | 24h após a sessão |
| **Dica personalizada** | Enviar alongamento ou cuidado específico | 3 dias após |
| **Lembrete de retorno** | Sugerir nova sessão baseado no plano | 1 semana antes da data ideal |
| **Oferta exclusiva** | Condição especial para cliente antiga | Periodicamente |
| **Pesquisa de satisfação** | Coletar feedback e mostrar que se importa | Após cada sessão |

## Sistema de Alerta de Saldo

### Os 3 Gatilhos de Renovação

### 🟡 50% Consumido — Check-in
> "Oi [Nome]! Vi que aproveitou metade do pacote. Está gostando dos resultados?"

### 🟠 80% Consumido — Abordagem de Renovação
> "Maria, restam apenas 2 horas. Que tal renovar com um pacote maior para mais economia?"

### 🔴 100% Consumido — Oferta Especial
> "Seu pacote encerrou! Parabéns pelos resultados. Renovando agora, você ganha [bônus]."

## Follow-up pelo WhatsApp

### Tempo de Resposta = Dinheiro

| Tempo de resposta | Taxa de conversão |
| < 5 minutos | 78% |
| 5-30 minutos | 52% |
| > 1 hora | 14% |

### Regras do WhatsApp Profissional

- **Áudio:** Máximo 1 minuto, só se o cliente mandar áudio primeiro
- **Emojis:** Use com moderação (2-3 por mensagem)
- **Horário:** Respeite 8h-20h
- **Insistência:** Máximo 2 follow-ups sem resposta`,
        quiz: [
          {
            pergunta: "Qual o tempo ideal de resposta no WhatsApp?",
            opcoes: ["Até 1 hora", "Até 30 minutos", "Menos de 5 minutos (78% de conversão)", "No mesmo dia"],
            respostaCorreta: 2,
            explicacao: "Respostas em menos de 5 minutos têm 78% de taxa de conversão. Após 1 hora, cai para 14%."
          },
          {
            pergunta: "Em qual % de consumo iniciar a conversa de renovação?",
            opcoes: ["Quando acabar 100%", "Em 80% consumido", "Em 50% (check-in)", "Logo após a compra"],
            respostaCorreta: 1,
            explicacao: "Em 80% devemos abordar renovação. O check-in de 50% planta a semente."
          }
        ],
        checklist: [
          "Enviei follow-up pós-sessão para todos os clientes do dia",
          "Configurei alertas para 50%, 80% e 100% de consumo",
          "Respondi todas as mensagens em menos de 15 minutos",
          "Fiz check-in com pelo menos 1 cliente em 50%"
        ]
      },
      {
        titulo: "Programas de fidelidade e indicações",
        descricao: "Modelos de programa (selos, pontos, VIP) e estrutura de indicações",
        duracaoMinutos: 60,
        conteudo: `# Programas de Fidelidade e Indicações

## Programas de Fidelidade

| Tipo | Exemplo | Benefício |
| **Pacotes** | Compre 5 sessões, ganhe 1 | Cliente se compromete com tratamento |
| **Pontos/Cashback** | % do valor vira crédito | Incentiva retorno frequente |
| **Níveis** | Bronze, Prata, Ouro | Quanto mais frequente, mais benefícios |
| **Aniversariante** | Sessão com desconto no mês | Surpresa positiva, fidelização |
| **Cliente VIP** | Horários exclusivos ou eventos | Sensação de exclusividade |

## Exemplo Prático (Sistema de Cashback)

- Cliente ganha % do valor gasto em crédito
- Quando acumula o valor mínimo, pode usar como desconto
- Disponível para todos os serviços da clínica

### Como Implementar

| Passo | Ação |
| 1 | Definir regras claras (percentual, validade) |
| 2 | Criar sistema digital (app ou cartão) |
| 3 | Treinar equipe para apresentar o programa |
| 4 | Comunicar ativamente aos clientes |

## Programa de Indicações

### Por que Funciona

Clientes satisfeitos são os melhores divulgadores. Um programa estruturado incentiva e recompensa essa divulgação.

### Estrutura do Programa

| Benefício para Quem Indica | Benefício para o Novo Cliente |
| Desconto na próxima sessão | Primeira sessão com valor especial |
| Sessão grátis a cada 3 indicações | Avaliação com desconto |
| Crédito no programa de fidelidade | Brinde de boas-vindas |

### Como Divulgar

- Cartões físicos na recepção
- Menção no pós-atendimento
- Posts nas redes sociais
- Lembrete no WhatsApp

### Momento Ideal para Pedir Indicação

Logo após o cliente expressar satisfação:

✅ "Que bom que gostou! Se tiver alguém que também precisa, lembra de mim? Pelo app você compartilha seu código e ainda ganha cashback."

❌ "Você tem algum amigo para indicar?" (parece desesperado)

## Estratégia de Upgrade Progressivo

**3hrs → 6hrs → 9hrs → VIP 24hrs → VIP 48hrs**

Cada upgrade é baseado em resultados concretos e frequência de uso.

### Incentivos para Renovação

- **Bônus de Antecipação:** Renovou antes de acabar = 1 hora extra
- **Upgrade Facilitado:** Tinha 9h? Renova para VIP 24h com desconto adicional
- **Programa Fidelidade:** A cada 24h consumidas, ganha 2h de presente`,
        quiz: [
          {
            pergunta: "Qual o melhor momento para pedir indicação?",
            opcoes: ["Quando chega para sessão", "Quando expressa satisfação com resultado", "Pelo WhatsApp 1 semana depois", "Nunca — espere indicar sozinho"],
            respostaCorreta: 1,
            explicacao: "O momento ideal é logo após expressar satisfação — pico de experiência positiva."
          }
        ],
        checklist: [
          "Apresentei programa de indicação a 3 clientes satisfeitos",
          "Implementei pelo menos 1 modelo de fidelidade",
          "Identifiquei 3 clientes prontos para upgrade",
          "Mapeei a jornada de upgrade de cada cliente ativo"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 7 — MARKETING DIGITAL  (8 h · 2 aulas)
  // ═══════════════════════════════════════════════════════════════
  {
    titulo: "7. Marketing Digital para Massoterapia",
    descricao: "Presença online, funil de vendas e conteúdo que converte",
    icone: "BarChart3",
    cor: "from-purple-50 to-violet-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Presença online e conteúdo que vende",
        descricao: "Canais digitais, tipos de conteúdo e calendário semanal",
        duracaoMinutos: 60,
        conteudo: `# Presença Online e Conteúdo que Vende

## Canais Digitais para Clínicas de Massoterapia

| Canal | Propósito | Frequência |
| **Instagram** | Vitrine visual, engajamento, conteúdo educativo | Diário |
| **Facebook** | Comunidade, eventos, público mais velho | 3-5x semana |
| **WhatsApp** | Relacionamento, agendamentos, pós-venda | Diário |
| **Google Meu Negócio** | Busca local, avaliações | Otimizado sempre |

## Distribuição Ideal de Conteúdo

### 1. Educativo (40% dos posts)
- "3 sinais de que você precisa de massagem"
- "Por que sua dor nas costas volta toda semana"
- Dicas posturais para quem trabalha sentado

### 2. Bastidores (25% dos posts)
- Preparação do ambiente (velas, óleos, música)
- Seu dia a dia profissional
- Equipamentos e produtos

### 3. Prova Social (25% dos posts)
- Screenshots de mensagens (com autorização)
- Vídeos curtos de depoimentos
- Avaliações do Google

### 4. Chamada para Ação (10% dos posts)
- "Última vaga da semana!"
- "Pacote especial para novos clientes"

## Calendário Semanal

| Dia | Tipo | Exemplo |
| Segunda | Educativo | Dica de postura |
| Terça | Bastidores | Preparo do ambiente |
| Quarta | Prova Social | Depoimento de cliente |
| Quinta | Educativo | Benefício da massagem |
| Sexta | CTA | "Agende para a semana!" |

## Horários que Funcionam

- **Manhã:** 7h-9h (profissionais antes do trabalho)
- **Almoço:** 12h-13h (pausa)
- **Noite:** 19h-21h (relaxamento pós-trabalho)

## Formatos que Engajam

- **Reels curtos** (15-30s) — maior alcance
- **Carrosséis** — mais salvamentos
- **Stories** — conexão diária
- **Lives** — autoridade`,
        quiz: [
          {
            pergunta: "Qual a distribuição ideal de conteúdo nas redes?",
            opcoes: ["100% promoções", "40% educativo, 25% bastidores, 25% prova social, 10% CTA", "50% antes e depois, 50% preços", "Postar apenas quando tiver promoção"],
            respostaCorreta: 1,
            explicacao: "A maioria do conteúdo deve educar e mostrar bastidores. Apenas 10% deve ser chamada para ação direta."
          }
        ],
        checklist: [
          "Planejei calendário de conteúdo da semana",
          "Criei pelo menos 1 post educativo",
          "Coletei 1 depoimento de cliente",
          "Publiquei nos melhores horários"
        ]
      },
      {
        titulo: "Funil de vendas para massoterapia",
        descricao: "Topo, meio e fundo do funil com estratégias por etapa",
        duracaoMinutos: 60,
        conteudo: `# Funil de Vendas para Massoterapia

## As 3 Etapas do Funil

### Topo (Descoberta)
- **Objetivo:** Atrair
- **Canais:** Redes sociais, blog, Google
- **Ações:** Posts educativos, hashtags locais, SEO

### Meio (Consideração)
- **Objetivo:** Relacionar
- **Canais:** WhatsApp, conteúdo aprofundado
- **Ações:** Respostas a DMs, conteúdo personalizado

### Fundo (Conversão)
- **Objetivo:** Converter
- **Canais:** Agendamento, ofertas
- **Ações:** Ofertas claras, facilidade no agendamento, pacotes

## Estratégias por Etapa

| Etapa | Objetivo | Ações |
| **Topo** | Atrair | Posts educativos, hashtags locais, SEO |
| **Meio** | Relacionar | Conteúdo aprofundado, respostas a DMs |
| **Fundo** | Converter | Ofertas claras, facilidade no agendamento |

## Google Meu Negócio

### Como Otimizar
- Cadastrar com fotos profissionais do espaço
- Solicitar avaliações de clientes satisfeitos
- Responder todos os comentários (positivos e negativos)
- Manter horários atualizados
- Adicionar palavras-chave nos serviços

## Parcerias Estratégicas

### Cross-indicações

| Parceiro | Público | Proposta |
| Academias | Atletas, lesões | Desconto mútuo |
| Fisioterapeutas | Pós-tratamento | Encaminhamento |
| Nutricionistas | Bem-estar | Programa conjunto |
| Empresas | Funcionários | Pacote corporativo |
| Salões de beleza | Autocuidado | Cross-indicação |

### Script para Propor Parceria

> "Olá, sou [nome] da Resinkra. Notei que atendemos públicos complementares. Que tal criarmos uma parceria de indicação mútua com descontos exclusivos?"`,
        quiz: [
          {
            pergunta: "No funil de vendas, qual o objetivo da etapa 'Meio'?",
            opcoes: ["Atrair novos visitantes", "Relacionar e aprofundar o interesse", "Converter em vendas", "Reter clientes existentes"],
            respostaCorreta: 1,
            explicacao: "O meio do funil é onde o potencial cliente já conhece você e precisa ser nutrido com conteúdo relevante antes da conversão."
          }
        ],
        checklist: [
          "Otimizei o Google Meu Negócio",
          "Mapeei 5 parceiros potenciais na região",
          "Contatei 1 parceiro com proposta",
          "Implementei estratégias para cada etapa do funil"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 8 — PROGRAMA DE FIDELIDADE E INDICAÇÕES  (6 h · 2 aulas)
  // ═══════════════════════════════════════════════════════════════
  {
    titulo: "8. Programa de Fidelidade e Indicações",
    descricao: "Modelos de programa (selos, pontos), estrutura de indicações e exemplos práticos",
    icone: "Package",
    cor: "from-amber-50 to-yellow-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Estrutura de um programa de fidelidade eficaz",
        descricao: "Modelos de cartão de selos, pontos, níveis e implementação",
        duracaoMinutos: 55,
        conteudo: `# Programa de Fidelidade Eficaz

## Por que Criar

Programas de fidelidade transformam clientes eventuais em clientes recorrentes. São ferramentas estratégicas para incentivar regularidade e fortalecer o vínculo.

## Modelos de Programa

| Modelo | Descrição | Exemplo |
| **Cartão de Selos** | A cada sessão, um selo; ao completar, ganha grátis | 5 sessões = 1 grátis |
| **Acúmulo de Pontos** | Percentual do valor vira crédito | 5% de volta em crédito |
| **Níveis de Cliente** | Quanto mais frequente, mais benefícios | Bronze, Prata, Ouro |
| **Aniversariante** | Benefício especial no mês | Sessão com desconto |

## Exemplo Prático — Sistema de Cashback

- Cliente ganha **5% do valor gasto** em crédito
- Quando acumula valor mínimo, pode usar como desconto
- Disponível para todos os serviços

## Como Implementar

| Passo | Ação |
| 1 | Definir regras claras (percentual, validade) |
| 2 | Criar cartão físico ou app |
| 3 | Treinar equipe para apresentar o programa |
| 4 | Comunicar ativamente aos clientes |

## Programa de Indicações — "Traga um Amigo"

### Estrutura

| Benefício para Quem Indica | Benefício para o Novo Cliente |
| Desconto na próxima sessão | Desconto na primeira sessão |
| Sessão grátis a cada 3 indicações | Avaliação com valor especial |
| Crédito no programa de fidelidade | Brinde de boas-vindas |

### Como Divulgar

- Cartões físicos na recepção
- Menção no pós-atendimento
- Posts nas redes sociais
- Lembrete no WhatsApp

### Métricas de Indicação

Acompanhe mensalmente:
- Quantas indicações recebidas
- Taxa de conversão de indicados
- Valor médio do cliente indicado
- ROI do programa de indicação`,
        quiz: [
          {
            pergunta: "Qual modelo de fidelidade incentiva progressão de benefícios?",
            opcoes: ["Cartão de selos", "Acúmulo de pontos", "Níveis de cliente (Bronze, Prata, Ouro)", "Aniversariante"],
            respostaCorreta: 2,
            explicacao: "O modelo de níveis incentiva o cliente a frequentar mais para subir de categoria e ganhar benefícios maiores."
          }
        ],
        checklist: [
          "Escolhi o modelo de fidelidade mais adequado",
          "Defini regras claras do programa",
          "Treinei equipe para apresentar o programa",
          "Comuniquei o programa a pelo menos 10 clientes"
        ]
      },
      {
        titulo: "Exemplos práticos e benchmarks do mercado",
        descricao: "Cases reais de programas de fidelidade e indicação que funcionam",
        duracaoMinutos: 55,
        conteudo: `# Exemplos Práticos e Benchmarks

## Case: Poliambulatorio 3effe (Europa)

- Cliente ganha **5% do valor gasto** em crédito
- Quando acumula **€20 em crédito**, pode usar como desconto
- Disponível para massoterapia e fisioterapia
- **Indicações:** Novo cliente recebe €20 de desconto na primeira avaliação; quem indicou recebe €10

## Case: AMTA (EUA)

- **Quem indica:** $20 em gift card por cada novo membro
- **Novo membro:** Taxa reduzida + presente especial
- Resultado: 35% dos novos membros vieram por indicação

## Adaptando para sua Clínica

### Programa Bronze (Começando)
- Cartão de selos (5 sessões = 1 grátis)
- Indicação simples (desconto para ambos)
- Controle manual (planilha)

### Programa Prata (Crescendo)
- Cashback digital (5% de volta)
- Níveis de benefício
- Controle por app

### Programa Ouro (Escalando)
- Cashback com multiplicadores por nível
- Programa VIP com benefícios exclusivos
- Automação completa
- Clube de assinatura mensal

## Erros Comuns

- ❌ Programa muito complicado (cliente não entende)
- ❌ Regras que mudam frequentemente (gera desconfiança)
- ❌ Não divulgar ativamente (programa esquecido)
- ❌ Benefícios muito pequenos (não motivam)
- ✅ Simples, claro, generoso e bem divulgado`,
        quiz: [
          {
            pergunta: "Qual o erro mais comum em programas de fidelidade?",
            opcoes: ["Ser muito generoso", "Ser muito complicado para o cliente", "Divulgar demais", "Ter muitos benefícios"],
            respostaCorreta: 1,
            explicacao: "A complexidade é inimiga da adesão. O programa ideal é simples, claro, generoso e bem divulgado."
          }
        ],
        checklist: [
          "Analisei pelo menos 2 cases de mercado",
          "Identifiquei em qual nível (Bronze/Prata/Ouro) minha clínica está",
          "Evitei os 4 erros comuns no meu programa",
          "Defini metas de adesão ao programa"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 9 — APPS E TECNOLOGIAS  (4 h · 2 aulas)
  // ═══════════════════════════════════════════════════════════════
  {
    titulo: "9. Apps e Tecnologias para Fidelização",
    descricao: "Apps de fidelidade, funcionalidades essenciais e opções para começar",
    icone: "Target",
    cor: "from-teal-50 to-emerald-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Apps de fidelidade para clínicas",
        descricao: "Tendências de mercado, funcionalidades e opções de investimento",
        duracaoMinutos: 45,
        conteudo: `# Apps de Fidelidade para Clínicas

## Tendência de Mercado

Clínicas de massoterapia estão adotando apps para:
- Acúmulo de pontos e cashback
- Agendamento online
- Comunicação direta com clientes
- Ofertas exclusivas

## Funcionalidades Essenciais

| Funcionalidade | Benefício |
| Acúmulo digital de pontos | Facilidade para o cliente |
| Histórico de sessões | Transparência |
| Notificações de promoções | Engajamento |
| Agendamento integrado | Conversão direta |
| Programa de indicação | Crescimento orgânico |
| Cashback automático | Fidelização sem atrito |

## Opções para Começar

| Tipo | Vantagem | Investimento |
| **App personalizado** | Total controle, marca própria | Alto (R$5k-30k) |
| **Plataforma white-label** | Rápido, customizável | Médio (R$200-500/mês) |
| **Cartão físico + planilha** | Simples, baixo custo | Baixo (R$50-100) |
| **App existente (Resinkra)** | Já integrado ao sistema | Incluído |

## Quando Migrar de Nível

- **Cartão físico → App:** Quando tiver +50 clientes recorrentes
- **White-label → Personalizado:** Quando faturar +R$30k/mês
- **Importante:** Não invista em tecnologia antes de ter o processo funcionando

## Funcionalidades que Geram ROI

### Mais Importante (Implementar primeiro)
1. Agendamento online (reduz ligações em 60%)
2. Lembrete automático (reduz no-show em 40%)
3. Cashback/pontos (aumenta retorno em 25%)

### Importante (Fase 2)
4. Indicações com tracking
5. Histórico do cliente
6. Pesquisa de satisfação`,
        quiz: [
          {
            pergunta: "Quando migrar de cartão físico para app?",
            opcoes: ["Imediatamente, no primeiro dia", "Quando tiver +50 clientes recorrentes", "Quando faturar R$100k", "Nunca, cartão físico é melhor"],
            respostaCorreta: 1,
            explicacao: "A migração para app faz sentido a partir de 50 clientes recorrentes, quando o controle manual fica inviável."
          }
        ],
        checklist: [
          "Avaliei qual tipo de solução é adequada para meu momento",
          "Identifiquei as 3 funcionalidades prioritárias",
          "Calculei o investimento necessário",
          "Defini cronograma de implementação"
        ]
      },
      {
        titulo: "CRM simples para terapeutas",
        descricao: "Organize clientes, histórico e oportunidades de venda",
        duracaoMinutos: 45,
        conteudo: `# CRM Simples para Terapeutas

## O que é CRM na Prática

CRM = Gestão de Relacionamento com o Cliente. Para terapeutas, significa:

- Saber quem é cada cliente (histórico, preferências)
- Acompanhar pacotes ativos e saldos
- Identificar quem precisa de follow-up
- Mapear oportunidades de renovação e upgrade

## Opções de CRM

| Ferramenta | Custo | Ideal para |
| Planilha Google | Grátis | Até 50 clientes |
| App Resinkra | Incluído | Gestão completa |
| Trello/Notion | Grátis/Baixo | Organização visual |
| HubSpot Free | Grátis | +100 clientes |

## Dados Essenciais por Cliente

1. **Dados básicos:** Nome, telefone, e-mail, aniversário
2. **Histórico:** Queixa principal, sessões, evolução
3. **Pacote atual:** Tipo, saldo, % consumido
4. **Preferências:** Terapeuta, horário, pressão
5. **Próxima ação:** Follow-up, renovação, reativação

## Pipeline de Vendas Visual

**Lead → Primeiro contato → Experimental → Pacote ativo → Renovação → VIP**

Cada etapa tem ações específicas:
- **Lead:** Responder em < 5 min, agendar avaliação
- **Primeiro contato:** Impressionar, escuta ativa
- **Experimental:** Apresentar 3 opções de pacote
- **Pacote ativo:** Monitorar saldo, check-ins
- **Renovação:** Abordar em 80% de consumo
- **VIP:** Tratamento premium, indicações

## Relatórios Semanais

Todo sábado, revise:
- Quantos leads entraram
- Quantos converteram
- Quantos pacotes estão acabando
- Quem está inativo há 30+ dias`,
        quiz: [
          {
            pergunta: "Qual a ordem correta do pipeline de vendas?",
            opcoes: ["Pacote → Lead → VIP", "Lead → Primeiro contato → Experimental → Pacote → Renovação → VIP", "VIP → Pacote → Lead", "Experimental → VIP direto"],
            respostaCorreta: 1,
            explicacao: "O pipeline segue a jornada natural: atração, conversão, fidelização e upgrade progressivo."
          }
        ],
        checklist: [
          "Escolhi uma ferramenta de CRM",
          "Cadastrei meus 10 principais clientes",
          "Organizei clientes por etapa do pipeline",
          "Agendei revisão semanal de relatórios"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 10 — GESTÃO DE EQUIPE  (6 h · 2 aulas)
  // ═══════════════════════════════════════════════════════════════
  {
    titulo: "10. Gestão de Equipe e Treinamento",
    descricao: "Alinhamento da equipe, scripts de atendimento e treinamento contínuo",
    icone: "GraduationCap",
    cor: "from-orange-50 to-amber-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Alinhando a equipe com a estratégia de vendas",
        descricao: "O que a equipe precisa saber e scripts de atendimento",
        duracaoMinutos: 55,
        conteudo: `# Alinhando a Equipe com a Estratégia de Vendas

## O Desafio

Muitas clínicas têm massoterapeutas excelentes tecnicamente, mas que não se sentem confortáveis com vendas. É preciso treinar e alinhar expectativas.

## O que a Equipe Precisa Saber

| Conhecimento | Por que é Importante |
| Técnicas dos serviços | Para explicar com confiança |
| Benefícios para o cliente | Para conectar com as dores |
| Como apresentar pacotes | Para aumentar ticket médio |
| Como lidar com objeções | Para não perder vendas |
| Como pedir indicações | Para crescer organicamente |

## Scripts de Atendimento (Checklist, não Decoreba)

### Abordagem Inicial
> "Olá [nome], seja bem-vinda! Como posso te ajudar hoje?"

### Durante a Anamnese
> "Me conta um pouco mais sobre o que você está sentindo... E como isso tem afetado seu dia a dia?"

### Apresentação de Serviços
> "Pelo que você me contou, a massagem [técnica] é a mais indicada porque [benefício específico para o problema]."

### Oferta de Pacotes
> "Muitas clientes com o mesmo quadro preferem fechar um pacote de [X] sessões porque os resultados são melhores com regularidade. E sai mais em conta também."

### Encerramento e Pós-Venda
> "Vou deixar agendada sua próxima sessão para [dia/horário]. Combinado? Amanhã vou mandar uma mensagem para saber como está."

## Técnicas de Fechamento sem Pressão

### 1. Fechamento por Alternativa
❌ "Quer fechar o pacote?"
✅ "Você prefere o pacote de 6 ou de 9 horas?"

### 2. Fechamento por Resumo
> "Ficou assim: pacote de 9 horas com cashback ativo e horas sem validade. Confirmo?"

### 3. Fechamento por Consequência
> "Se essa tensão não for tratada, pode evoluir para algo mais sério."

### 4. A Regra do Silêncio
Após fazer a proposta, **fique em silêncio**. Quem fala primeiro perde poder.`,
        quiz: [
          {
            pergunta: "No Fechamento por Alternativa, qual a pergunta correta?",
            opcoes: ["Quer fechar o pacote?", "Prefere 6 ou 9 horas?", "Posso fazer pra você?", "O que acha?"],
            respostaCorreta: 1,
            explicacao: "Nunca pergunte 'sim ou não'. Dê opções: 'Prefere 6 ou 9 horas?'"
          }
        ],
        checklist: [
          "Distribui scripts para toda a equipe",
          "Pratiquei as 4 técnicas de fechamento",
          "Apliquei a Regra do Silêncio em 1 negociação",
          "Toda equipe sabe explicar os benefícios de cada serviço"
        ]
      },
      {
        titulo: "Treinamento contínuo e liderança",
        descricao: "Frequência de treinamento, role-play, feedback SBI e gestão de performance",
        duracaoMinutos: 55,
        conteudo: `# Treinamento Contínuo e Liderança

## Frequência de Treinamento

| Frequência | Tópicos |
| **Semanal** | Feedback de atendimentos, dúvidas |
| **Mensal** | Técnica de vendas, novos serviços |
| **Trimestral** | Workshop prático, role-playing |

## Reunião Semanal — Pauta Modelo (15 min)

1. **Celebração** (2 min): Melhor venda da semana
2. **Números** (3 min): KPIs da equipe
3. **Desafio** (5 min): Objeção difícil — como resolver?
4. **Role-play** (3 min): Prática rápida de 1 cenário
5. **Meta** (2 min): Foco da semana

## Feedback Construtivo — Modelo SBI

**SBI = Situação, Comportamento, Impacto**

✅ "Na sessão com a Maria (S), vi que explicou bem a dor mas não ofereceu pacote (C). Ela pode ter ido embora sem saber da opção (I). Que tal praticarmos?"

❌ "Você precisa vender mais."

## Dashboard de Performance da Equipe

| Terapeuta | Atendimentos | Ofertas | Fechamentos | Conversão | Ticket Médio |
| Maria | 20 | 20 | 12 | 60% | R$1.050 |
| João | 18 | 15 | 8 | 53% | R$780 |
| Ana | 22 | 22 | 15 | 68% | R$1.200 |

## Ações por Performance

**Alta (>60%):** Reconhecimento público + compartilhar técnicas
**Média (40-60%):** Role-play focado + acompanhar 2 atendimentos do líder
**Baixa (<40%):** Conversa individual + plano de 30 dias + mentoria intensiva

## Comissão e Incentivos

- **Salário fixo** + comissão por pacote vendido
- **Bônus de equipe** quando meta coletiva é batida
- **Reconhecimento:** "Terapeuta do mês"
- **Desenvolvimento:** Cursos e certificações como benefício`,
        quiz: [
          {
            pergunta: "Qual modelo de feedback é mais eficaz?",
            opcoes: ["Apenas dizer 'venda mais'", "Modelo SBI: Situação, Comportamento, Impacto", "Comparar com outros terapeutas", "Só dar feedback negativo"],
            respostaCorreta: 1,
            explicacao: "O modelo SBI é específico e construtivo: descreve situação, comportamento e impacto, sem julgamento pessoal."
          }
        ],
        checklist: [
          "Implementei reunião semanal de 15 min",
          "Usei modelo SBI em pelo menos 1 feedback",
          "Criei dashboard de performance da equipe",
          "Defini ações por nível de performance"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 11 — MÉTRICAS E RESULTADOS  (4 h · 2 aulas)
  // ═══════════════════════════════════════════════════════════════
  {
    titulo: "11. Métricas e Resultados",
    descricao: "KPIs essenciais, ferramentas de controle e ciclo de melhoria contínua",
    icone: "BarChart3",
    cor: "from-sky-50 to-blue-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "O que medir — KPIs essenciais",
        descricao: "Os 5 números que importam e ferramentas de controle",
        duracaoMinutos: 45,
        conteudo: `# KPIs Essenciais de Vendas

## Os 5 Números que Importam

| Métrica | Fórmula | Meta |
| **Taxa de conversão** | (agendamentos ÷ contatos) × 100 | > 60% |
| **Ticket médio** | receita total ÷ número de vendas | Aumentar 10% ao ano |
| **Frequência de retorno** | dias entre uma sessão e outra | Reduzir intervalo |
| **Taxa de indicação** | (novos indicados ÷ total) × 100 | > 20% |
| **Churn (cancelamentos)** | clientes perdidos ÷ total | < 10% |

## KPIs Adicionais

### Taxa de Oferta
**Fórmula:** (Ofertas feitas ÷ Clientes atendidos) × 100
**Meta:** 100% — TODO cliente recebe oferta

### Taxa de Renovação
**Fórmula:** (Renovações ÷ Pacotes finalizados) × 100
**Meta:** > 70%

### Tempo Médio de Resposta (WhatsApp)
**Meta:** < 15 minutos

## Ferramentas de Controle

| Ferramenta | Para que serve |
| **Planilha simples** | Começar, baixo custo |
| **CRM** | Profissionalizar, escalar |
| **App de agendamento** | Facilitar a vida do cliente |

## Metas Progressivas

| Prazo | Meta | Ação |
| 30 dias | 50% conversão | Oferecer pacote a 100% |
| 60 dias | 60% conversão | Dominar rebate de objeções |
| 90 dias | 65-70% conversão | Sistema de upgrade rodando |

## Cálculo de Impacto

Se atende 10 novos clientes/semana:
- 40% conversão = 4 pacotes
- 60% conversão = 6 pacotes
- **2 pacotes extras/semana = ~R$2.520/mês a mais**
- Em 1 ano = **+R$30.000 em receita**`,
        quiz: [
          {
            pergunta: "Qual KPI deve estar SEMPRE em 100%?",
            opcoes: ["Taxa de conversão", "Taxa de renovação", "Taxa de oferta — todo cliente recebe oferta", "NPS"],
            respostaCorreta: 2,
            explicacao: "A taxa de oferta deve ser 100%. Todo cliente atendido deve receber recomendação de pacote."
          }
        ],
        checklist: [
          "Listei os 5 KPIs e suas fórmulas",
          "Calculei meus números da última semana",
          "Identifiquei os 2 KPIs com maior oportunidade de melhoria",
          "Defini ações específicas para cada KPI abaixo da meta"
        ]
      },
      {
        titulo: "Ciclo de melhoria contínua",
        descricao: "Medir, analisar, ajustar e plano de ação semanal",
        duracaoMinutos: 45,
        conteudo: `# Ciclo de Melhoria Contínua

## O Ciclo

### 1. MEDIR (Coletar dados)
- Registrar todas as interações e resultados
- Usar planilha ou CRM consistentemente
- Não confiar na memória

### 2. ANALISAR (Identificar gaps)
- Comparar com metas definidas
- Identificar padrões (dias melhores, horários, perfis)
- Buscar a causa raiz, não o sintoma

### 3. AJUSTAR (Implementar)
- Fazer 1 mudança por vez (testar)
- Treinar a equipe na mudança
- Dar tempo para o resultado aparecer (mínimo 2 semanas)

### 4. MEDIR (Novamente)
- Comparar antes × depois
- Documentar o que funcionou
- Celebrar melhorias

## Plano de Ação Semanal

### Segunda: Planejamento
- [ ] Reunião de 15min (resultados da semana anterior)
- [ ] Revisar agenda e identificar follow-ups
- [ ] Checar saldos de pacotes (quem está em 80%+?)

### Terça a Quinta: Execução
- [ ] Aplicar técnicas de avaliação consultiva
- [ ] Oferecer pacote a 100% dos clientes
- [ ] Registrar objeções ouvidas
- [ ] Enviar follow-up pós-sessão no mesmo dia

### Sexta: Análise
- [ ] Preencher planilha de resultados
- [ ] Comparar com semana anterior
- [ ] Identificar 1 ponto de melhoria

### Sábado: Desenvolvimento
- [ ] Revisar 1 aula do curso
- [ ] Praticar 1 script novo

## Metas Progressivas (12 Semanas)

| Semana | Foco | Meta |
| 1-2 | Escuta ativa | 80% do tempo ouvindo |
| 3-4 | Apresentação de pacotes | Oferecer a 100% |
| 5-6 | Objeções | Responder sem hesitar |
| 7-8 | Renovação | 100% dos alertas acionados |
| 9-10 | Upgrade | 30% das renovações para maior |
| 11-12 | Excelência | Conversão 60%+ consistente |`,
        quiz: [
          {
            pergunta: "Qual o mínimo de tempo para avaliar uma mudança implementada?",
            opcoes: ["1 dia", "1 semana", "2 semanas (mínimo)", "1 mês"],
            respostaCorreta: 2,
            explicacao: "Mudanças precisam de no mínimo 2 semanas para mostrar resultados consistentes. Mudar antes gera confusão."
          }
        ],
        checklist: [
          "Implementei o ciclo Medir → Analisar → Ajustar → Medir",
          "Segui a rotina semanal por 1 semana completa",
          "Registrei resultados em planilha ou CRM",
          "Defini meta pessoal para a próxima semana"
        ]
      }
    ]
  },

  // ═══════════════════════════════════════════════════════════════
  // MÓDULO 12 — VALORIZAÇÃO PROFISSIONAL  (3 h · 2 aulas)
  // ═══════════════════════════════════════════════════════════════
  {
    titulo: "12. Valorização Profissional e Mercado",
    descricao: "Reconhecimento da profissão, parcerias estratégicas e planejamento de crescimento",
    icone: "GraduationCap",
    cor: "from-fuchsia-50 to-pink-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "O reconhecimento da profissão",
        descricao: "Cenário atual da massoterapia, valorização e oportunidades",
        duracaoMinutos: 40,
        conteudo: `# O Reconhecimento da Profissão

## Cenário Atual

A massoterapia vem sendo cada vez mais reconhecida como prática profissional de saúde e bem-estar.

> "A massoterapia, enquanto técnica voltada à promoção da saúde física e mental, contribui de maneira significativa para a prevenção de doenças, redução do estresse, melhoria da circulação sanguínea, alívio de dores musculares e promoção do equilíbrio geral do organismo."

## Diretrizes de Valorização

- Reconhecimento como prática de promoção da saúde
- Incentivo à participação em eventos comunitários
- Campanhas de conscientização sobre benefícios da massoterapia

## Oportunidades para Profissionais

- Participar de feiras de saúde
- Oferecer quick massages em eventos corporativos
- Integrar programas de bem-estar de empresas
- Parcerias com planos de saúde e academias

## LGPD e Conformidade

### Dados Sensíveis na Massoterapia

A LGPD protege dados pessoais. Na massoterapia, você lida com dados sensíveis:

- **Dados pessoais:** Nome, CPF, telefone, endereço
- **Dados de saúde:** Queixas, dores, histórico médico
- **Dados financeiros:** Pagamentos, histórico de compras
- **Dados de imagem:** Fotos de evolução

### Os 5 Passos da Conformidade

1. **Termo de Consentimento** — Assinado na 1ª visita
2. **Armazenamento Seguro** — Criptografia, local trancado
3. **Acesso Restrito** — Somente profissionais autorizados
4. **Direitos do Cliente** — Ver, corrigir, excluir dados
5. **Opt-in para Marketing** — Autorização antes de enviar mensagens`,
        quiz: [
          {
            pergunta: "Qual dado coletado na massoterapia é SENSÍVEL pela LGPD?",
            opcoes: ["Nome e telefone", "Dados de saúde (queixas, dores, histórico)", "E-mail", "Forma de pagamento"],
            respostaCorreta: 1,
            explicacao: "Dados de saúde são dados sensíveis pela LGPD e exigem cuidado redobrado no tratamento e armazenamento."
          }
        ],
        checklist: [
          "Compreendi o cenário atual de valorização da profissão",
          "Identifiquei 3 oportunidades para expandir atuação",
          "Criei termo de consentimento LGPD para novos clientes",
          "Revisei armazenamento de dados dos clientes"
        ]
      },
      {
        titulo: "Parcerias estratégicas e planejamento de crescimento",
        descricao: "Parcerias B2B, roadmap de 12 meses e certificação final",
        duracaoMinutos: 40,
        conteudo: `# Parcerias Estratégicas e Crescimento

## Parcerias com Empresas

Programas de bem-estar corporativo, como o Wellness 365, oferecem gift cards que podem ser usados em clínicas de massoterapia. Enorme oportunidade de parceria.

## Tipos de Parceria

### Com Empresas
- Quick massages em escritórios
- Pacotes corporativos para funcionários
- Day SPA em eventos da empresa

### Com Academias e Clínicas
- Serviços para alunos de academia
- Indicações mútuas com fisioterapeutas

### Com Spas e Hotéis
- Serviço terceirizado para hóspedes
- Pacotes especiais para datas comemorativas

## Planejamento de 12 Meses

### Q1 (Meses 1-3): Fundação
- Conversão 50%, oferta 100%, equipe capacitada

### Q2 (Meses 4-6): Crescimento
- Conversão 60%, renovação 75%, ticket médio +15%

### Q3 (Meses 7-9): Escala
- +20% novos via indicação, 5+ automações ativas, 3+ parcerias

### Q4 (Meses 10-12): Excelência
- Conversão 65-70%, NPS > 9.0, faturamento +40%

## ROI Projetado

Se hoje fatura R$15.000/mês:
- +20% conversão = +R$3.000/mês
- +15% renovação = +R$2.250/mês
- +20% novos via indicação = +R$3.000/mês
- **Total projetado: R$23.250/mês (+55%)**
- **Anual: +R$99.000 em receita adicional**

## Certificação Final 🏆

Ao completar todos os 12 módulos e aplicar o plano por 12 semanas, você estará apto a receber o certificado de **Especialista em Vendas Consultivas — Massoterapia**.

> *Parabéns por investir no seu desenvolvimento! Seus clientes e seus resultados agradecem. 💚*`,
        quiz: [
          {
            pergunta: "Qual deve ser a meta de conversão no Q1 (primeiros 3 meses)?",
            opcoes: ["70% imediatamente", "50% — fundação sólida", "30% — começar devagar", "Não definir meta"],
            respostaCorreta: 1,
            explicacao: "No Q1 focamos em fundação: 50% é alcançável e prepara a base para crescer nos trimestres seguintes."
          }
        ],
        checklist: [
          "Mapeei 5 parceiros potenciais na região",
          "Defini metas SMART para cada trimestre",
          "Calculei o ROI projetado do plano de crescimento",
          "Defini data de lançamento oficial das novas estratégias"
        ]
      }
    ]
  }
];
