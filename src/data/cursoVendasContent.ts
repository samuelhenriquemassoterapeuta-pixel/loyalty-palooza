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

export const cursoVendasData: ModuloContent[] = [
  {
    titulo: "Mindset e Fundamentos",
    descricao: "A diferença entre vender produto e vender transformação",
    icone: "Lightbulb",
    cor: "from-amber-50 to-orange-50",
    aulas: [
      {
        titulo: "Vender é cuidar — não é empurrar",
        descricao: "A mentalidade do terapeuta-consultor em massoterapia",
        duracaoMinutos: 10,
        conteudo: `# Vender é Cuidar — Não é Empurrar

## A Mentalidade do Terapeuta-Consultor

Muitos terapeutas têm resistência à ideia de "vender". Associam vendas a algo forçado ou antiético. Mas a verdade é:

> **Quando você deixa de oferecer um tratamento que pode ajudar o cliente, você está negando cuidado.**

### Massoterapia NÃO É Produto

Massoterapia envolve saúde, bem-estar e toque terapêutico. Você não vende sessões — você vende **transformação e qualidade de vida**.

### Princípios Fundamentais

1. **Venda = Prescrição profissional** — Assim como um médico prescreve tratamento, você recomenda sessões baseado na avaliação clínica.

2. **O cliente não sabe o que precisa** — Ele sente dor ou desconforto, mas não conhece as opções. Você é o especialista.

3. **Omissão não é ética** — Se você identifica que o cliente precisa de 9 sessões mas oferece apenas 1, está sendo omisso com a saúde dele.

### Exercício de Reflexão

- Quantas vezes você deixou de oferecer um pacote por medo de parecer "vendedor"?
- O que aconteceu com esses clientes? Voltaram? Melhoraram?
- Como seria diferente se tivesse prescrito o tratamento completo?

### Mudança de Vocabulário

❌ "Quer comprar um pacote?"
✅ "Pelo que avaliei, você precisa de pelo menos 6 sessões para tratar essa contratura. Temos um pacote de 6 horas por R$900 que já garante o tratamento completo. Faz sentido para você?"

**Ponto-chave:** Você não está vendendo — está prescrevendo um plano de tratamento.`,
        quiz: [
          {
            pergunta: "Qual é a mentalidade correta do terapeuta-consultor?",
            opcoes: [
              "Focar em vender o pacote mais caro possível",
              "Prescrever o tratamento adequado como um profissional de saúde",
              "Deixar o cliente decidir sozinho sem interferir",
              "Oferecer desconto para fechar rápido"
            ],
            respostaCorreta: 1,
            explicacao: "O terapeuta-consultor age como um profissional de saúde: avalia, diagnostica e prescreve o tratamento adequado — sem empurrar e sem omitir."
          },
          {
            pergunta: "Por que a omissão NÃO é ética na massoterapia?",
            opcoes: [
              "Porque a clínica perde receita",
              "Porque o cliente pode reclamar depois",
              "Porque deixar de oferecer um tratamento necessário é negar cuidado",
              "Porque é obrigação legal oferecer todos os serviços"
            ],
            respostaCorreta: 2,
            explicacao: "Se você identifica que o cliente precisa de um tratamento continuado mas não oferece, está sendo omisso com a saúde dele."
          }
        ],
        checklist: [
          "Refleti sobre minha resistência pessoal a vendas",
          "Mudei meu vocabulário de 'vender' para 'prescrever'",
          "Identifiquei 3 clientes que poderiam ter se beneficiado de pacotes",
          "Pratiquei o script de prescrição profissional"
        ]
      },
      {
        titulo: "Ética profissional em vendas terapêuticas",
        descricao: "Equilibrando resultado comercial com cuidado genuíno",
        duracaoMinutos: 8,
        conteudo: `# Ética Profissional em Vendas Terapêuticas

## Equilibrando Resultado Comercial com Cuidado

### O Limite Ético

Existe uma diferença crucial entre:
- **Recomendar** o que o cliente precisa (ético)
- **Pressionar** para vender o mais caro (antiético)

### Princípios Inegociáveis

1. **Consentimento sempre** — O cliente precisa entender e concordar com o tratamento
2. **Limites profissionais** — Manter postura adequada em todas as interações
3. **Honestidade sobre expectativas** — Nunca prometer resultados impossíveis
4. **Respeitar o "não" genuíno** — Saber quando parar de insistir

### Situações Delicadas

**Cliente com expectativas inadequadas:**
> "Entendo o que você busca, mas preciso ser honesto: em 1 sessão podemos aliviar a tensão, mas para resolver de fato, precisamos de um tratamento contínuo."

**Cliente com restrições financeiras reais:**
> Ofereça o pacote menor (3h por R$480) ou sugira espaçar mais as sessões. Nunca force um compromisso que o cliente não pode arcar.

**Quando NÃO vender:**
- Se a condição do cliente exige encaminhamento médico
- Se o cliente está emocionalmente vulnerável demais para decidir
- Se você identifica que o serviço não é adequado para aquela necessidade

### Regra de Ouro

> **Recomende apenas o que você indicaria para um familiar.** Se seu irmão tivesse essa dor, qual seria seu conselho honesto?`,
        quiz: [
          {
            pergunta: "Quando NÃO devemos insistir na venda de um pacote?",
            opcoes: [
              "Quando o cliente pede desconto",
              "Quando o cliente disse 'não' 2 vezes de formas diferentes",
              "Quando o cliente quer pensar por 5 minutos",
              "Quando o cliente pergunta sobre parcelamento"
            ],
            respostaCorreta: 1,
            explicacao: "Após 2 negativas genuínas, respeite a decisão. Plante a semente para o futuro sem pressão."
          },
          {
            pergunta: "Qual é a Regra de Ouro da ética em vendas?",
            opcoes: [
              "Sempre oferecer o pacote mais rentável",
              "Recomendar apenas o que indicaria para um familiar",
              "Nunca falar de preço antes da segunda sessão",
              "Dar desconto para todos os clientes novos"
            ],
            respostaCorreta: 1,
            explicacao: "Se seu irmão tivesse essa dor, qual seria seu conselho honesto? Essa é a bússola ética."
          }
        ],
        checklist: [
          "Memorizei os 4 princípios inegociáveis",
          "Pratiquei respostas para clientes com expectativas inadequadas",
          "Identifiquei situações onde NÃO devo vender",
          "Apliquei a Regra de Ouro em pelo menos 1 atendimento"
        ]
      },
      {
        titulo: "Perfil do cliente de massoterapia",
        descricao: "Os 4 perfis de cliente e como abordá-los",
        duracaoMinutos: 10,
        conteudo: `# Perfil do Cliente de Massoterapia

## Os 4 Perfis e a Abordagem Ideal

### 1. 🔴 Cliente de Dor (Urgência)
- **Motivação:** Dor aguda, tensão insuportável, restrição de movimento
- **Comportamento:** Busca solução imediata, aceita investir se resolver rápido
- **Pacote ideal:** 6hrs (R$900) ou 9hrs (R$1.260)
- **Script:** "Vamos resolver essa dor agora e criar um plano para ela não voltar. Para casos como o seu, recomendo 6 a 9 sessões."

### 2. 🟡 Cliente de Prevenção (Consciência)
- **Motivação:** Já sentiu dor antes, quer evitar recorrência
- **Comportamento:** Pesquisa antes, compara opções, pensa a longo prazo
- **Pacote ideal:** VIP 24hrs (R$2.976)
- **Script:** "Manter uma rotina de sessões é muito mais barato que tratar crises. O VIP de 24 horas garante tranquilidade o ano todo, a R$124 por hora."

### 3. 🟢 Cliente de Bem-Estar (Autocuidado)
- **Motivação:** Relaxamento, qualidade de vida, rotina de autocuidado
- **Comportamento:** Valoriza experiência, ambiente, regularidade
- **Pacote ideal:** VIP 24hrs ou 48hrs
- **Script:** "Esse é o seu momento. O VIP 48 horas é perfeito para quem faz do autocuidado uma prioridade — e você economiza quase R$2.000."

### 4. 🔵 Cliente Experimental (Primeiro contato)
- **Motivação:** Curiosidade, indicação de amigo, promoção
- **Comportamento:** Cauteloso, quer testar antes de se comprometer
- **Pacote ideal:** 3hrs (R$480) como porta de entrada
- **Script:** "Para você conhecer nosso trabalho, temos o pacote de 3 horas por R$480. São 3 sessões completas. Depois, a gente vê a melhor estratégia para seu caso."

### Exercício: Identifique seus Clientes

Para cada cliente que atendeu esta semana:
1. Em qual perfil ele se encaixa?
2. Você usou a abordagem correta?
3. Qual pacote deveria ter oferecido?`,
        quiz: [
          {
            pergunta: "Qual pacote é ideal para um Cliente Experimental (primeiro contato)?",
            opcoes: [
              "VIP 48hrs — máxima economia",
              "9hrs — tratamento completo",
              "3hrs (R$480) — porta de entrada",
              "Sessão avulsa sem compromisso"
            ],
            respostaCorreta: 2,
            explicacao: "O pacote de 3hrs é a porta de entrada ideal: baixo compromisso, permite ao cliente experimentar o serviço."
          },
          {
            pergunta: "O Cliente de Prevenção se caracteriza por:",
            opcoes: [
              "Dor aguda e urgência de resolução",
              "Curiosidade e primeiro contato",
              "Já sentiu dor antes e quer evitar recorrência",
              "Busca relaxamento e autocuidado"
            ],
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
  {
    titulo: "Técnicas de Comunicação e Rapport",
    descricao: "Escuta ativa, perguntas estratégicas e construção de confiança",
    icone: "Heart",
    cor: "from-rose-50 to-pink-50",
    aulas: [
      {
        titulo: "Primeiros 30 segundos e escuta ativa",
        descricao: "A primeira impressão e a arte de ouvir para vender melhor",
        duracaoMinutos: 10,
        conteudo: `# Primeiros 30 Segundos e Escuta Ativa

## A Primeira Impressão Define Tudo

Pesquisas mostram que formamos 80% da opinião sobre alguém nos primeiros 30 segundos.

### Checklist de Recepção

✅ **Ambiente:** Música suave, aroma agradável, temperatura confortável
✅ **Aparência:** Uniforme limpo, cabelo arrumado, sorriso genuíno
✅ **Postura:** De pé, contato visual, mão estendida
✅ **Voz:** Tom calmo, volume médio, ritmo pausado
✅ **Frase de abertura:** Personalizada, NUNCA genérica

### Frases que Funcionam

❌ "Boa tarde, pode sentar ali que já chamo."
✅ "Boa tarde, Maria! Que bom te ver. Preparei tudo para você hoje."

❌ "O que você precisa?"
✅ "Me conta como você tem se sentido desde a última vez."

## Escuta Ativa — Regra 80/20

O cliente fala 80% do tempo. Você fala 20%.

Seus 20% são:
- Perguntas estratégicas (70%)
- Validações (20%)
- Recomendações (10%)

### Perguntas de Avaliação Consultiva

**Sobre a dor:**
- "Em uma escala de 0 a 10, como está sua dor hoje?"
- "Quando essa dor começou?"
- "O que piora e o que melhora?"
- "Isso afeta seu sono? Seu trabalho?"

**Sobre expectativas:**
- "O que você espera alcançar com as sessões?"
- "Quanto tempo você pode dedicar ao seu tratamento?"

**Sobre rotina:**
- "Como é seu dia a dia? Fica muito tempo sentado?"
- "Pratica alguma atividade física?"

### Técnica de Validação

Após ouvir, repita com suas palavras:

> "Deixa eu ver se entendi: você sente dor nas costas há 3 meses, piora quando fica sentada, e isso está atrapalhando seu sono. Correto?"

**Isso demonstra:** atenção, empatia e profissionalismo — e posiciona você para recomendar o pacote certo.`,
        quiz: [
          {
            pergunta: "Na Regra 80/20 da escuta ativa, qual a proporção ideal?",
            opcoes: [
              "Terapeuta fala 80%, cliente 20%",
              "Cliente fala 80%, terapeuta 20%",
              "Ambos falam 50% cada",
              "Depende do perfil do cliente"
            ],
            respostaCorreta: 1,
            explicacao: "O cliente deve falar 80% do tempo. Seus 20% são perguntas estratégicas (70%), validações (20%) e recomendações (10%)."
          },
          {
            pergunta: "Qual frase de abertura é mais profissional?",
            opcoes: [
              "Boa tarde, pode sentar ali que já chamo",
              "O que você precisa hoje?",
              "Boa tarde, Maria! Que bom te ver. Preparei tudo para você hoje",
              "Olá! Já vou te atender"
            ],
            respostaCorreta: 2,
            explicacao: "Personalizar a recepção com o nome do cliente e demonstrar preparação cria conexão imediata."
          }
        ],
        checklist: [
          "Revisei o checklist de recepção do ambiente",
          "Pratiquei frases de abertura personalizadas",
          "Apliquei a Regra 80/20 em pelo menos 1 atendimento",
          "Usei a técnica de validação (repetir com minhas palavras)"
        ]
      },
      {
        titulo: "Construindo autoridade sem arrogância",
        descricao: "Como se posicionar como especialista e demonstrar conhecimento",
        duracaoMinutos: 8,
        conteudo: `# Construindo Autoridade sem Arrogância

## Os 3 Pilares

### 1. Conhecimento Demonstrado (não declarado)

❌ "Eu sou especialista em drenagem linfática."
✅ "Pela avaliação, identifiquei um acúmulo de líquido na região dos tornozelos. Isso é comum em quem fica muito tempo de pé. Com a drenagem, vamos estimular o sistema linfático a drenar esse excesso."

No segundo exemplo, você DEMONSTROU conhecimento ao explicar o problema e a solução.

### 2. Resultados Comprovados

- Casos de sucesso similares ao do cliente
- Depoimentos de clientes satisfeitos
- Número de sessões realizadas na carreira
- Evolução documentada de tratamentos

> "Tive uma cliente com um quadro parecido com o seu. Em 9 sessões ela estava sem dor e voltou a correr."

### 3. Linguagem Acessível

Use termos técnicos, mas SEMPRE traduza:

❌ "Você tem trigger points no trapézio superior."
✅ "Você tem pontos de tensão nessa região aqui do ombro — são nódulos que se formam por postura inadequada e estresse. Vamos trabalhar isso."

### Framework de Apresentação

1. **Identifique** o problema específico do cliente
2. **Explique** a causa de forma simples
3. **Apresente** o plano de tratamento com pacote adequado
4. **Comprove** com dados ou casos similares
5. **Facilite** a decisão (opções de pacote, parcelamento)`,
        quiz: [
          {
            pergunta: "Qual a melhor forma de demonstrar autoridade profissional?",
            opcoes: [
              "Declarar seus títulos e certificações",
              "Explicar o problema do cliente com linguagem acessível",
              "Mostrar seu diploma na parede",
              "Usar termos técnicos complexos"
            ],
            respostaCorreta: 1,
            explicacao: "Autoridade se demonstra, não se declara. Explique o problema e a solução de forma clara."
          }
        ],
        checklist: [
          "Pratiquei explicar 3 condições comuns em linguagem acessível",
          "Preparei 2 casos de sucesso para usar como prova social",
          "Apliquei o Framework de Apresentação em 1 atendimento",
          "Traduzi termos técnicos sem perder credibilidade"
        ]
      },
      {
        titulo: "Comunicação empática e linguagem corporal",
        descricao: "Tom de voz, postura e adaptação ao perfil do cliente",
        duracaoMinutos: 7,
        conteudo: `# Comunicação Empática e Linguagem Corporal

## Adapte-se ao Cliente

### Técnica do Espelhamento

Observe e adapte-se naturalmente:
- **Cliente apressado** → Seja objetivo e direto
- **Cliente conversador** → Dê espaço para conversa, mas conduza
- **Cliente ansioso** → Fale devagar, explique cada etapa
- **Cliente silencioso** → Respeite o silêncio, pergunte apenas o necessário

### Tom de Voz que Converte

Na massoterapia, seu tom de voz é parte do tratamento:

- **Na avaliação:** Profissional, atento, fazendo perguntas
- **Durante a sessão:** Calmo, suave, explicando o que faz
- **Ao recomendar pacote:** Seguro, natural, sem pressa
- **Ao rebater objeção:** Empático, nunca defensivo

### Linguagem Corporal

✅ Contato visual ao conversar
✅ Postura aberta (braços descruzados)
✅ Inclinar-se levemente para frente (demonstra interesse)
✅ Acenar com a cabeça enquanto ouve

❌ Olhar para o celular durante conversa
❌ Cruzar os braços (barreira)
❌ Ficar mexendo em coisas enquanto o cliente fala

### A Regra de Ouro da Empatia

> Antes de recomendar qualquer pacote, o cliente precisa sentir que você entendeu genuinamente a dor dele — literal e emocional. Sem isso, qualquer oferta vai soar como "vendas".`,
        quiz: [
          {
            pergunta: "Como adaptar sua comunicação com um cliente ansioso?",
            opcoes: [
              "Ser objetivo e direto para não perder tempo",
              "Falar devagar e explicar cada etapa",
              "Fazer muitas perguntas rapidamente",
              "Deixar ele em silêncio total"
            ],
            respostaCorreta: 1,
            explicacao: "Clientes ansiosos precisam de calma. Fale devagar, explique cada etapa e transmita segurança."
          }
        ],
        checklist: [
          "Identifiquei o perfil comportamental de 3 clientes",
          "Pratiquei espelhamento de linguagem corporal",
          "Ajustei meu tom de voz em diferentes momentos do atendimento",
          "Eliminei 1 hábito de linguagem corporal negativa"
        ]
      }
    ]
  },
  {
    titulo: "Nossos Pacotes e Precificação",
    descricao: "Apresentação estratégica dos 5 pacotes com preços reais e técnica de ancoragem",
    icone: "Package",
    cor: "from-emerald-50 to-green-50",
    aulas: [
      {
        titulo: "Nossos 5 pacotes — conheça cada um",
        descricao: "Valores, economia e diferenciais de cada pacote",
        duracaoMinutos: 12,
        conteudo: `# Nossos 5 Pacotes — Conheça Cada Um

## Tabela de Pacotes e Economia

| Pacote | Horas | Valor | Por Hora | Economia vs Avulso |
|--------|-------|-------|----------|--------------------|
| Essencial | 3 hrs | R$480 | R$160/hr | — (base) |
| Tratamento | 6 hrs | R$900 | R$150/hr | 6,25% |
| Completo | 9 hrs | R$1.260 | R$140/hr | 12,5% |
| VIP 24 | 24 hrs | R$2.976 | R$124/hr | 22,5% |
| VIP 48 | 48 hrs | R$5.232 | R$109/hr | 31,9% |

## GRANDE Diferencial: Horas NUNCA Expiram!

> "Diferente de outras clínicas, aqui suas horas são eternas. Teve uma fase corrida? Viajou? Sem problema, seu crédito te espera."

Isso derruba a objeção #1: "E se eu não conseguir vir?"

## Quando Recomendar Cada Pacote

### Pacote 3hrs (R$480) — Porta de Entrada
- **Para quem:** Cliente experimental, indeciso, primeiro contato
- **Objetivo:** Fazer ele vivenciar o resultado e migrar para o próximo
- **Script:** "Para você conhecer nosso trabalho, temos 3 horas por R$480. Sem compromisso de longo prazo."

### Pacote 6hrs (R$900) — Tratamento Pontual
- **Para quem:** Problema específico que precisa de ciclo curto
- **Objetivo:** Resolver a queixa e fidelizar
- **Script:** "Para sua dor lombar, o ideal é um tratamento de 6 sessões. O pacote de 6 horas sai por R$900 — economia de R$60."

### Pacote 9hrs (R$1.260) — Tratamento Completo
- **Para quem:** Tratamento de médio prazo, dores crônicas
- **Objetivo:** Ciclo completo de tratamento
- **Script:** "Para resultados duradouros, recomendo 9 horas que garantem o ciclo completo. Cada hora sai a R$140 — economia de R$180."

### VIP 24hrs (R$2.976) — Fidelização
- **Para quem:** Cliente regular, tratamento contínuo
- **Objetivo:** Garantir presença constante + alto valor
- **Script:** "Percebo que você vem regularmente. O VIP de 24 horas sai a R$124 por hora — são R$864 de economia!"

### VIP 48hrs (R$5.232) — Alto Padrão
- **Para quem:** Executivos, famílias, autocuidado constante
- **Objetivo:** Máxima economia + ticket alto
- **Script:** "Para quem faz do autocuidado prioridade, o VIP 48 horas é imbatível: R$109 por hora, quase R$2.000 de economia. E as horas nunca expiram."`,
        quiz: [
          {
            pergunta: "Qual o grande diferencial dos pacotes da clínica?",
            opcoes: [
              "Desconto progressivo de 50%",
              "As horas NUNCA expiram",
              "Inclui produtos de aromaterapia",
              "Atendimento 24 horas"
            ],
            respostaCorreta: 1,
            explicacao: "O maior diferencial é que as horas nunca expiram. Isso elimina o medo de desperdiçar o investimento."
          },
          {
            pergunta: "Qual pacote é ideal como 'porta de entrada' para clientes novos?",
            opcoes: [
              "VIP 48hrs — melhor custo-benefício",
              "6hrs — tratamento pontual",
              "3hrs (R$480) — sem compromisso de longo prazo",
              "Sessão avulsa para testar"
            ],
            respostaCorreta: 2,
            explicacao: "O pacote de 3hrs é a porta de entrada ideal: baixo compromisso, permite experimentar o serviço."
          }
        ],
        checklist: [
          "Decorei valores e economia de cada pacote",
          "Sei qual pacote recomendar para cada perfil de cliente",
          "Pratiquei o script de apresentação de cada pacote",
          "Memorizei que as horas nunca expiram (diferencial-chave)"
        ]
      },
      {
        titulo: "Técnica de ancoragem — sempre 3 opções",
        descricao: "A psicologia da apresentação de preço que funciona",
        duracaoMinutos: 10,
        conteudo: `# Técnica de Ancoragem — Sempre 3 Opções

## Como o Cérebro Percebe Valor

### O Princípio da Ancoragem

O primeiro número que o cliente ouve define sua referência de preço. E quando você apresenta 3 opções, a tendência natural é escolher a do meio.

### Como Aplicar na Prática

**SEMPRE apresente 3 opções:**

> "Para seu caso, você pode escolher entre:
> - 6 horas por R$900 (ideal para iniciar o tratamento)
> - **9 horas por R$1.260** (completa o ciclo com economia maior) ← EMPURRE PARA ESSA
> - Ou nosso VIP 24 horas por R$2.976 (melhor custo-benefício do ano)"

**O que acontece psicologicamente:**
- A pessoa raramente escolhe a primeira (mais barata)
- Tende para o meio ou até a maior
- O VIP "ancora" o preço para cima, fazendo o 9hrs parecer razoável

### Exemplos por Perfil

**Cliente com dor aguda:**
> "Temos 3 opções que funcionam pra você:
> - 3 horas por R$480 — para testar
> - 6 horas por R$900 — garante o tratamento
> - 9 horas por R$1.260 — ciclo completo com economia"

**Cliente regular querendo pacote:**
> "Olhando sua frequência:
> - 9 horas por R$1.260 — bom para 2-3 meses
> - VIP 24 horas por R$2.976 — tranquilidade o ano todo
> - VIP 48 horas por R$5.232 — máxima economia, R$109/hr"

### Cálculo Rápido para Mostrar ao Cliente

Treine calcular mentalmente:

"Você vem 1x por semana? São 4 sessões/mês. Em 6 meses seriam 24 sessões. Avulso a R$160 cada = R$3.840. No VIP 24 = R$2.976. **Você economiza R$864!**"

### Regra de Ouro

**Nunca apresente o preço sem antes ter demonstrado o VALOR.** Primeiro a avaliação, depois a recomendação, por último o preço.

### Facilitação de Pagamento

Sempre mencione as opções de pagamento:

> "Você pode parcelar no cartão. O pacote de 9 horas fica em 3x de R$420 — menos que uma sessão avulsa por mês."

> "No PIX à vista, temos condição especial."`,
        quiz: [
          {
            pergunta: "Na técnica de ancoragem com 3 opções, qual o cliente tende a escolher?",
            opcoes: [
              "Sempre a mais barata",
              "A do meio ou a maior",
              "Sempre a mais cara",
              "Nenhuma — pede desconto"
            ],
            respostaCorreta: 1,
            explicacao: "Psicologicamente, ao apresentar 3 opções, as pessoas raramente escolhem a mais barata. Tendem para o meio."
          }
        ],
        checklist: [
          "Pratiquei apresentar 3 opções para cada perfil de cliente",
          "Treinei cálculo mental de economia para o cliente",
          "Nunca apresentei preço antes de demonstrar valor",
          "Mencionei opções de parcelamento em todas as ofertas"
        ]
      },
      {
        titulo: "Upsell e cross-sell inteligente",
        descricao: "Como migrar o cliente de avulso para pacote e de pacote menor para maior",
        duracaoMinutos: 8,
        conteudo: `# Upsell e Cross-sell Inteligente

## A Escada de Valor

A jornada ideal do cliente:

**Avulso → 3hrs → 6hrs → 9hrs → VIP 24hrs → VIP 48hrs**

Cada passo é um "upgrade natural" baseado na experiência e nos resultados.

### Upsell: De Avulso para Pacote

**Momento ideal:** Final da 1ª ou 2ª sessão (quando o cliente JÁ sentiu o benefício)

> "Maria, vi que você respondeu muito bem à sessão. Para resultados duradouros na sua lombar, o ideal são 6 sessões. Posso te mostrar como otimizar isso com nosso pacote?"

### Upsell: De Pacote Menor para Maior

**Quando 3hrs está acabando:**
> "Você aproveitou bem essas 3 horas! Sentiu melhora na tensão? Para consolidar, recomendo o pacote de 6 horas por R$900 ou, se quiser o tratamento completo, 9 horas por R$1.260."

**Quando 6hrs ou 9hrs está acabando:**
> "Vi que você está na última hora do pacote. Pelos seus resultados e pela frequência que vem, o VIP de 24 horas seria perfeito. Fica bem mais em conta a longo prazo."

### Cross-sell: Complementos Naturais

| Serviço principal | Complemento natural |
|-------------------|---------------------|
| Massagem terapêutica | Head Spa |
| Drenagem linfática | Plano alimentar |
| Tratamento corporal | Avaliação postural |
| Pacote individual | Vale presente para amigo |

**Script de cross-sell:**
> "Para potencializar o resultado entre as sessões, recomendo esse óleo essencial para usar em casa. Nossos clientes que usam relatam resultados muito melhores."

### Usando Cashback como Aliado

> "No pacote de 9 horas, além da economia de R$180, você ainda acumula cashback em cada sessão. Dá pra usar em produtos ou sessões extras!"

### Regra: SEMPRE Oferecer

**Meta: 100% dos clientes avulsos recebem oferta de pacote.**

Não é pressão — é prescrição profissional. Se você atende 10 clientes e oferece pacote a todos, com 40% de conversão são 4 vendas. Se só oferece a 5, são apenas 2 vendas. A diferença está em OFERECER.`,
        quiz: [
          {
            pergunta: "Qual o momento ideal para oferecer upsell de avulso para pacote?",
            opcoes: [
              "Na recepção, antes da primeira sessão",
              "Final da 1ª ou 2ª sessão, quando o cliente já sentiu o benefício",
              "Pelo WhatsApp 1 semana depois",
              "Apenas quando o cliente pedir"
            ],
            respostaCorreta: 1,
            explicacao: "O melhor momento é após a sessão, quando o cliente já vivenciou o benefício e está receptivo."
          }
        ],
        checklist: [
          "Identifiquei oportunidades de upsell em 3 clientes atuais",
          "Mapeei cross-sells naturais para cada serviço",
          "Ofereci pacote a 100% dos clientes avulsos esta semana",
          "Usei o cashback como argumento de venda"
        ]
      }
    ]
  },
  {
    titulo: "Objeções e Fechamento",
    descricao: "Scripts prontos para as 7 objeções reais e técnicas de fechamento sem pressão",
    icone: "Target",
    cor: "from-blue-50 to-indigo-50",
    aulas: [
      {
        titulo: "As 7 objeções mais comuns — com nossos valores",
        descricao: "Scripts prontos usando os preços reais da clínica",
        duracaoMinutos: 15,
        conteudo: `# As 7 Objeções — Scripts com Nossos Valores

## Resposta Pronta para Cada Situação

### 1. "É muito caro"
**Significado real:** "Não entendi o valor."

**Para 3hrs (R$480):**
> "São R$160 por sessão de 1 hora, com avaliação personalizada. Muitos clientes dividem em 3x de R$160 no cartão."

**Para VIP (R$2.976):**
> "Entendo. Vamos ver assim: são R$124 por hora, contra R$160 avulso. Se você vem 2x por mês, em 12 meses economiza R$864. Mas se preferir começar menor, temos o de 6 ou 9 horas."

### 2. "Vou pensar"
**Significado real:** "Não estou convencido."

**Técnica do Esclarecimento:**
> "Claro! Só para eu te ajudar melhor — é o valor, o formato, ou prefere sentir mais resultados antes?"

Depois rebata especificamente:
- **Valor** → Mostrar economia + parcelamento
- **Formato** → Explicar que horas nunca expiram
- **Quer sentir resultado** → "Perfeito! Vamos fazer mais 1 sessão e depois conversamos."

### 3. "Prefiro pagar só quando vier"
**Significado real:** "Não quero compromisso."

> "Sem problema! Só para você ter uma ideia: vindo 1x por semana durante 2 meses, você gastaria R$1.280 avulso. No pacote de 9 horas, R$1.260. É literalmente o mesmo valor, mas com uma hora a mais e total flexibilidade."

### 4. "E se eu não usar tudo?"
**Significado real:** "Tenho medo de desperdiçar."

> "Suas horas nunca expiram! Tive clientes que pausaram por 6 meses e voltaram — o crédito estava lá esperando. Você usa no seu tempo, sem nenhuma preocupação."

### 5. "Não tenho esse dinheiro agora"
**Significado real:** "Fluxo de caixa apertado."

> "Entendo! Você pode parcelar no cartão. O pacote de 9 horas fica em 3x de R$420 — menos que uma sessão avulsa por mês. Ou comece com 3 horas por R$480 e depois amplia."

### 6. "Preciso falar com meu marido/esposa"
**Significado real:** "Preciso de validação."

> "Com certeza! Posso preparar um resumo com o plano de tratamento e os valores para vocês analisarem juntos? Mando pelo WhatsApp."

### 7. "Já faço em outro lugar / Vi mais barato"
**Significado real:** "Me convença do diferencial."

> "Preço é importante, concordo. Nosso diferencial é que suas horas nunca expiram, temos avaliação personalizada, acompanhamento por app, e programa de cashback. O mais barato pode sair caro se não resolver."

### Quando NÃO Insistir

Se o cliente disse não 2 vezes de formas diferentes, respeite. Plante a semente para o futuro:

> "Sem problema! Fico feliz que veio hoje. Quando sentir necessidade, é só me chamar — as condições dos pacotes estarão aqui para você."`,
        quiz: [
          {
            pergunta: "Quando o cliente diz 'É muito caro', o significado real é:",
            opcoes: [
              "Ele realmente não pode pagar",
              "Não entendeu o valor do serviço",
              "Quer desconto",
              "Está comparando com outra clínica"
            ],
            respostaCorreta: 1,
            explicacao: "'É muito caro' geralmente significa que o cliente não percebeu o valor. A solução é demonstrar economia e benefícios."
          },
          {
            pergunta: "Como responder à objeção 'E se eu não usar tudo?'",
            opcoes: [
              "Oferecer um pacote menor",
              "Dar desconto para compensar",
              "Explicar que as horas NUNCA expiram",
              "Dizer que é raro não usar"
            ],
            respostaCorreta: 2,
            explicacao: "O diferencial da clínica é que as horas nunca expiram. Isso elimina completamente o medo de desperdício."
          }
        ],
        checklist: [
          "Decorei as 7 objeções e seus significados reais",
          "Pratiquei os scripts de resposta em voz alta",
          "Identifiquei as 3 objeções mais frequentes nos meus atendimentos",
          "Respondi a pelo menos 1 objeção real esta semana sem hesitar"
        ]
      },
      {
        titulo: "Técnicas de fechamento sem pressão",
        descricao: "5 formas naturais de fechar a venda e a regra do silêncio",
        duracaoMinutos: 10,
        conteudo: `# Técnicas de Fechamento sem Pressão

## 5 Formas de Fechar Naturalmente

### 1. Fechamento por Alternativa
Não pergunte "sim ou não". Dê opções.

❌ "Quer fechar o pacote?"
✅ "Você prefere o pacote de 6 ou de 9 horas?"

❌ "Quer agendar a próxima?"
✅ "Para a próxima sessão, fica melhor terça ou quinta?"

### 2. Fechamento por Resumo
Resuma tudo e peça confirmação.

> "Então ficou assim: pacote de 9 horas de massagem terapêutica, com cashback ativo e horas sem validade. Confirmo para você?"

### 3. Fechamento por Consequência
Mostre o custo de NÃO agir.

> "Se essa tensão muscular não for tratada, pode evoluir para algo mais sério. O tratamento agora é mais simples e mais barato."

### 4. Fechamento por Prova Social
Use casos reais.

> "Tenho vários clientes com esse mesmo quadro que optaram pelo pacote de 9 horas e os resultados foram excelentes."

### 5. Fechamento por Facilitação
Elimine barreiras.

> "Parcelamos em até 3x, as horas nunca expiram, e você pode vir quando quiser. Qual dessas opções faz mais sentido pra você?"

### A Regra do Silêncio

Após fazer a proposta, **fique em silêncio**. Quem fala primeiro perde poder na negociação.

> "O pacote de 9 horas sai por R$1.260, com economia de R$180. O que acha?"
> *... espere o cliente processar ...*

### O Momento Ideal

O MELHOR momento para oferecer pacote é:

**Final da 1ª ou 2ª sessão**
- Cliente JÁ sentiu o benefício
- Está relaxado e receptivo
- Você já construiu rapport e confiança

**EVITAR:** Oferecer na recepção antes da 1ª sessão (cliente ainda não vivenciou nada).`,
        quiz: [
          {
            pergunta: "No Fechamento por Alternativa, qual a pergunta correta?",
            opcoes: [
              "Quer fechar o pacote?",
              "Você prefere o pacote de 6 ou de 9 horas?",
              "Posso fazer o pacote pra você?",
              "O que acha de levar?"
            ],
            respostaCorreta: 1,
            explicacao: "Nunca pergunte 'sim ou não'. Dê opções: 'Prefere 6 ou 9 horas?' O cliente escolhe entre as alternativas."
          },
          {
            pergunta: "O que diz a Regra do Silêncio?",
            opcoes: [
              "Nunca falar sobre preço",
              "Após fazer a proposta, fique em silêncio e espere",
              "Falar baixo durante a negociação",
              "Não mencionar concorrentes"
            ],
            respostaCorreta: 1,
            explicacao: "Após apresentar a proposta, quem fala primeiro perde poder. Fique em silêncio e deixe o cliente processar."
          }
        ],
        checklist: [
          "Pratiquei as 5 técnicas de fechamento em role-play",
          "Apliquei a Regra do Silêncio em pelo menos 1 negociação",
          "Usei Fechamento por Alternativa no lugar de perguntas sim/não",
          "Identifiquei qual técnica funciona melhor para meu perfil"
        ]
      },
      {
        titulo: "Follow-up e vendas pelo WhatsApp",
        descricao: "Templates prontos para cada etapa do relacionamento",
        duracaoMinutos: 10,
        conteudo: `# Follow-up e Vendas pelo WhatsApp

## O Dinheiro Está no Follow-up

### Configuração Profissional

✅ **Foto:** Profissional, uniforme, sorrindo (NÃO selfie)
✅ **Nome:** "Nome | Resinkra Massoterapia"
✅ **Status:** "📍 Agendamentos abertos"
✅ **Resposta rápida:** Templates salvos

### Tempo de Resposta = Dinheiro

| Tempo de resposta | Taxa de conversão |
|-------------------|-------------------|
| < 5 minutos | 78% |
| 5-30 minutos | 52% |
| > 1 hora | 14% |

### Templates por Situação

**Pós-sessão (mesmo dia):**
> "Oi [Nome]! Foi um prazer te atender hoje 💆‍♀️ Lembre de beber bastante água. Qualquer dúvida, estou por aqui!"

**Follow-up (2 dias):**
> "Oi [Nome]! Como você está se sentindo? Alguma sensibilidade ou já está sentindo os benefícios? 😊"

**Cliente pediu preço:**
> "O valor da sessão avulsa é R$160/hora. Mas temos pacotes com condições especiais 😊
> 📦 3 horas — R$480
> ⭐ 6 horas — R$900
> 💎 9 horas — R$1.260 (economia de R$180!)
> 👑 VIP 24 horas — R$2.976 (economia de R$864!)
> Todas as horas são eternas, sem validade! Qual te interessa?"

**Reativação (30 dias sem vir):**
> "Oi [Nome]! Faz um tempinho que não nos vemos. Como você está? Temos horários disponíveis essa semana. Seu cashback de R$[XX] ainda está disponível! 🌿"

**Reativação (60 dias):**
> "Oi [Nome]! Sentimos sua falta! Preparamos uma condição especial para seu retorno. Quer saber mais? 💚"

### Regras do WhatsApp Profissional

1. **Áudio:** Máximo 1 minuto, só se o cliente mandar áudio primeiro
2. **Emojis:** Use com moderação (2-3 por mensagem)
3. **Horário:** Respeite 8h-20h
4. **Insistência:** Máximo 2 follow-ups sem resposta
5. **Preço:** Nunca mande preço SEM fazer perguntas antes`,
        quiz: [
          {
            pergunta: "Qual o tempo ideal de resposta no WhatsApp para máxima conversão?",
            opcoes: [
              "Até 1 hora",
              "Até 30 minutos",
              "Menos de 5 minutos (78% de conversão)",
              "No mesmo dia"
            ],
            respostaCorreta: 2,
            explicacao: "Respostas em menos de 5 minutos têm 78% de taxa de conversão. Após 1 hora, cai para apenas 14%."
          }
        ],
        checklist: [
          "Configurei meu WhatsApp profissionalmente (foto, nome, status)",
          "Salvei os templates de mensagens como respostas rápidas",
          "Enviei follow-up pós-sessão para todos os clientes do dia",
          "Respondi a todas as mensagens em menos de 15 minutos"
        ]
      }
    ]
  },
  {
    titulo: "Renovação e Retenção",
    descricao: "Sistema de gatilhos de consumo, upgrade progressivo e fidelização",
    icone: "MessageCircle",
    cor: "from-green-50 to-teal-50",
    aulas: [
      {
        titulo: "Sistema de alerta de saldo",
        descricao: "Gatilhos de 50%, 80% e 100% do pacote consumido",
        duracaoMinutos: 10,
        conteudo: `# Sistema de Alerta de Saldo

## Gatilhos de Renovação por Consumo

A renovação é MANUAL na nossa clínica. Isso significa que se não fizermos a abordagem no momento certo, o cliente pode esquecer, procrastinar ou ir para a concorrência.

### Os 3 Gatilhos

### 🟡 50% Consumido — Check-in
**Objetivo:** Verificar satisfação e plantar a semente da renovação.

> "Oi [Nome]! Vi que você já aproveitou metade do seu pacote. Está gostando dos resultados? Tem sentido diferença na [dor/tensão]?"

**Se resposta positiva:** "Que ótimo! Vamos continuar nesse ritmo, os melhores resultados vêm com consistência."

### 🟠 80% Consumido — Abordagem de Renovação
**Objetivo:** Iniciar a conversa sobre renovação com antecedência.

**Presencial (ao final da sessão):**
> "Maria, vi que restam apenas 2 horas no seu pacote. Pelo seu progresso e frequência, o ideal seria já garantir a continuidade. Que tal renovar com um pacote maior para ter mais economia?"

**WhatsApp:**
> "Oi [Nome]! Faltam apenas 2 horas no seu crédito. Que tal já garantir a continuidade? Tenho condições especiais para renovação 😊"

### 🔴 100% Consumido — Oferta Especial
**Objetivo:** Fechar a renovação antes que o cliente "suma".

> "Seu pacote encerrou! Parabéns pelos resultados que alcançamos juntos. Para continuidade, preparei uma condição especial: renovando agora, você ganha [bônus]."

### Responsabilidade pela Renovação

- **Terapeuta:** Identifica e sugere DURANTE a sessão
- **Gestor:** Acompanha relatório de saldos baixos
- **Sistema:** Alerta automático quando cliente está perto do fim

### Planilha de Controle

Para cada cliente com pacote ativo, monitore:
- Nome
- Pacote atual
- Horas consumidas / Total
- % consumido
- Próxima ação (check-in, abordagem, oferta)`,
        quiz: [
          {
            pergunta: "Em qual percentual de consumo do pacote devemos iniciar a conversa de renovação?",
            opcoes: [
              "Quando acabar 100%",
              "Em 80% consumido",
              "Em 50% consumido (check-in de satisfação)",
              "Logo após a compra"
            ],
            respostaCorreta: 1,
            explicacao: "Em 80% consumido já devemos abordar a renovação. O check-in de 50% planta a semente, e em 100% é a oferta especial."
          }
        ],
        checklist: [
          "Montei uma planilha de controle de saldos dos clientes",
          "Configurei alertas para 50%, 80% e 100% de consumo",
          "Fiz check-in com pelo menos 1 cliente em 50%",
          "Abordei renovação com 1 cliente em 80%+"
        ]
      },
      {
        titulo: "Estratégia de upgrade progressivo",
        descricao: "Como migrar clientes para pacotes maiores naturalmente",
        duracaoMinutos: 8,
        conteudo: `# Estratégia de Upgrade Progressivo

## A Escada da Fidelização

O cliente ideal percorre esta jornada:

**3hrs → 6hrs → 9hrs → VIP 24hrs → VIP 48hrs**

Cada upgrade é baseado em resultados concretos e frequência de uso.

### Scripts de Upgrade

**3hrs finalizando → Oferecer 6hrs ou 9hrs:**
> "Você aproveitou bem essas 3 horas! Para consolidar o resultado, recomendo 6 ou 9 horas. O de 9hrs sai a R$140/hora — economia de R$180."

**6hrs finalizando → Oferecer 9hrs:**
> "Com 6 horas, começamos a ver resultados. Para completar o ciclo, 9 horas é o ideal. E a economia por hora é ainda maior."

**9hrs finalizando → Oferecer VIP 24hrs:**
> "Pelo que vejo, você vem regularmente e valoriza o cuidado. O VIP 24 horas é perfeito: R$124/hora, economia de R$864, e tranquilidade o ano todo."

**VIP 24hrs finalizando → Oferecer VIP 48hrs:**
> "Você já é cliente VIP! O upgrade para 48 horas traz a melhor economia: R$109/hora — quase 32% de desconto. E você pode compartilhar com familiares."

### Incentivos para Renovação

Sugestões para acelerar a decisão:

- **Bônus de Antecipação:** Renovou antes de acabar = ganha 1 hora extra
- **Upgrade Facilitado:** Tinha 9h? Renova para VIP 24h com desconto adicional
- **Programa Fidelidade:** A cada 24h consumidas, ganha 2h de presente

### Análise de Histórico

Antes de abordar a renovação, verifique:
- Frequência real de uso (1x/semana? 2x/mês?)
- Quanto tempo levou para consumir o pacote
- Padrão: se consume rápido = potencial para pacote maior
- Satisfação relatada nas sessões`,
        quiz: [
          {
            pergunta: "Qual é a escada ideal de fidelização do cliente?",
            opcoes: [
              "Avulso → VIP 48hrs direto",
              "3hrs → 6hrs → 9hrs → VIP 24hrs → VIP 48hrs",
              "Sempre oferecer o VIP 24hrs",
              "Deixar o cliente decidir sozinho"
            ],
            respostaCorreta: 1,
            explicacao: "O upgrade é progressivo e natural. Cada passo é baseado em resultados e frequência de uso."
          }
        ],
        checklist: [
          "Mapeei a jornada de upgrade de cada cliente ativo",
          "Pratiquei scripts de upgrade para cada transição",
          "Identifiquei 3 clientes prontos para upgrade",
          "Abordei 1 cliente sobre upgrade esta semana"
        ]
      },
      {
        titulo: "Metas de conversão e acompanhamento",
        descricao: "De 40% para 60-70% — sistema de tracking e metas progressivas",
        duracaoMinutos: 10,
        conteudo: `# Metas de Conversão e Acompanhamento

## Nossa Situação Atual

- **Conversão atual:** 40% (4 em cada 10 clientes fecham pacote)
- **Taxa de renovação:** 70% (excelente!)
- **Objetivo:** Aumentar conversão para 60-70%

### Por que 6 em 10 NÃO Fecham?

Diagnóstico das possíveis causas:
- **Timing errado** — Oferece cedo demais (sem resultado) ou tarde (já foi embora)
- **Abordagem tímida** — Terapeuta tem receio de "parecer vendedor"
- **Falta de recomendação técnica** — Não vincula pacote ao tratamento necessário
- **Não rebate objeções** — Cliente diz "vou pensar" e pronto
- **Não oferece para todos** — Se oferece para 50% dos clientes, perde metade das oportunidades

### Metas Progressivas

| Prazo | Meta | Ação |
|-------|------|------|
| 30 dias | 50% conversão | Oferecer pacote a 100% dos clientes |
| 60 dias | 60% conversão | Dominar rebate de objeções |
| 90 dias | 65-70% conversão | Sistema de upgrade + renovação rodando |

### Planilha Semanal — O Que Registrar

Para cada profissional, toda semana:
1. Quantos clientes atendidos
2. Quantos receberam oferta de pacote
3. Quantos fecharam
4. Quais objeções apareceram
5. Qual pacote foi mais vendido

### Reunião Semanal (15 minutos)

Toda segunda-feira:
- O que funcionou na semana passada?
- Quais objeções apareceram?
- Ajustes necessários
- Meta da semana

### Cálculo de Impacto

Se atendemos 10 novos clientes/semana:
- Com 40% de conversão = 4 pacotes
- Com 60% de conversão = 6 pacotes
- **2 pacotes extras por semana = ~R$2.520/mês a mais** (se média de 9hrs)

Em 1 ano = **+R$30.000 em receita** só com melhoria de conversão!

### Sistema de Gamificação/Bonificação (Sugestão)

**Comissão por pacote vendido:**
- 3hrs = R$20
- 6hrs = R$40
- 9hrs = R$60
- VIP 24hrs = R$120
- VIP 48hrs = R$200

**OU Meta coletiva:**
- Bateu 50% conversão no mês = bônus de R$300 dividido
- Bateu 60% = R$500 dividido
- Bateu 70% = R$800 dividido`,
        quiz: [
          {
            pergunta: "Qual a meta de taxa de oferta de pacotes?",
            opcoes: [
              "50% dos clientes",
              "Apenas clientes recorrentes",
              "100% — todo cliente recebe oferta",
              "Só quando o cliente pergunta"
            ],
            respostaCorreta: 2,
            explicacao: "100% dos clientes devem receber oferta de pacote. Se oferece para 50%, perde metade das oportunidades."
          }
        ],
        checklist: [
          "Criei uma planilha semanal de acompanhamento",
          "Defini minha meta de conversão para os próximos 30 dias",
          "Calculei o impacto financeiro da melhoria de conversão",
          "Agendei reunião semanal de 15 min para análise"
        ]
      }
    ]
  },
  {
    titulo: "Indicadores e Melhoria Contínua",
    descricao: "KPIs essenciais e plano de ação semanal para alta performance",
    icone: "BarChart3",
    cor: "from-purple-50 to-violet-50",
    aulas: [
      {
        titulo: "KPIs essenciais de vendas",
        descricao: "Os números que você precisa acompanhar toda semana",
        duracaoMinutos: 8,
        conteudo: `# KPIs Essenciais de Vendas

## Os 8 Números que Importam

### 1. Taxa de Conversão Avulso → Pacote
**Fórmula:** (Pacotes vendidos ÷ Ofertas feitas) × 100
**Meta:** > 60%
**Ação se baixa:** Revisar timing e scripts de apresentação

### 2. Taxa de Oferta
**Fórmula:** (Ofertas feitas ÷ Clientes atendidos) × 100
**Meta:** 100% — TODO cliente recebe oferta
**Ação se baixa:** Disciplina! Não é opção, é prescrição

### 3. Ticket Médio por Pacote
**Fórmula:** Faturamento de pacotes ÷ Número de pacotes vendidos
**Meta:** Crescente (migrar clientes para pacotes maiores)
**Ação se estagnado:** Focar em upgrade progressivo

### 4. Taxa de Renovação
**Fórmula:** (Renovações ÷ Pacotes finalizados) × 100
**Meta:** > 70% (nosso atual — manter!)
**Ação se cair:** Reforçar sistema de alertas de saldo

### 5. Taxa de Upgrade
**Fórmula:** (Upgrades ÷ Renovações) × 100
**Meta:** > 30% das renovações são para pacote maior
**Ação se baixa:** Treinar scripts de upgrade

### 6. Tempo Médio de Resposta (WhatsApp)
**Meta:** < 15 minutos
**Ação se alto:** Templates salvos + disciplina

### 7. Taxa de Reativação
**Fórmula:** (Clientes reativados ÷ Clientes inativos abordados) × 100
**Meta:** > 25%
**Ação se baixa:** Melhorar mensagens de reativação

### 8. NPS (Satisfação do Cliente)
**Escala:** 0 a 10
**Meta:** > 8.5
**Ação se baixo:** Pesquisa qualitativa + melhorias na experiência`,
        quiz: [
          {
            pergunta: "Qual KPI deve estar SEMPRE em 100%?",
            opcoes: [
              "Taxa de Conversão",
              "Taxa de Renovação",
              "Taxa de Oferta — todo cliente recebe oferta de pacote",
              "NPS de satisfação"
            ],
            respostaCorreta: 2,
            explicacao: "A taxa de oferta deve ser 100%. Todo cliente atendido deve receber a recomendação de pacote."
          }
        ],
        checklist: [
          "Listei os 8 KPIs e suas fórmulas",
          "Calculei meus números da última semana",
          "Identifiquei os 2 KPIs com maior oportunidade de melhoria",
          "Defini ações específicas para cada KPI abaixo da meta"
        ]
      },
      {
        titulo: "Plano de ação semanal",
        descricao: "Rotina prática para aplicar tudo que aprendeu",
        duracaoMinutos: 8,
        conteudo: `# Plano de Ação Semanal

## Sua Rotina de Alta Performance

### Segunda-feira: Planejamento
- [ ] Reunião de 15min (resultados da semana anterior)
- [ ] Revisar agenda e identificar clientes para follow-up
- [ ] Checar saldos de pacotes (quem está em 80%+?)
- [ ] Preparar mensagens de reativação

### Terça a Quinta: Execução
- [ ] Aplicar técnicas de avaliação consultiva
- [ ] Oferecer pacote a 100% dos clientes
- [ ] Registrar objeções ouvidas
- [ ] Enviar follow-up pós-sessão no mesmo dia
- [ ] Abordar clientes com saldo baixo sobre renovação

### Sexta-feira: Análise
- [ ] Preencher planilha de resultados
- [ ] Comparar com semana anterior
- [ ] Identificar 1 ponto de melhoria
- [ ] Definir meta pessoal da próxima semana

### Sábado: Desenvolvimento
- [ ] Revisar 1 aula do curso
- [ ] Praticar 1 script novo
- [ ] Refletir: qual foi minha melhor venda da semana?

## Metas Progressivas (12 Semanas)

| Semana | Foco | Meta |
|--------|------|------|
| 1-2 | Escuta ativa | 80% do tempo ouvindo |
| 3-4 | Apresentação de pacotes | Oferecer a 100% dos clientes |
| 5-6 | Objeções | Responder sem hesitar |
| 7-8 | Renovação | 100% dos alertas de saldo acionados |
| 9-10 | Upgrade | 30% das renovações para pacote maior |
| 11-12 | Excelência | Conversão em 60%+ consistente |

## Árvore de Decisão — Qual Pacote Indicar?

**Queixa → Modalidade → Frequência → Pacote**

- Dor lombar crônica → Terapêutica → 1x/semana por 8 semanas → 9hrs
- Estresse/ansiedade → Relaxante → 2x/mês manutenção → VIP 24hrs
- Pós-cirúrgico → Drenagem → 3x/semana por 2 semanas → 6hrs
- Autocuidado regular → Relaxante/Spa → 1x/semana → VIP 48hrs
- Primeira vez → Avaliação → Experimentar → 3hrs

## Certificado de Conclusão 🏆

Ao completar todas as aulas e aplicar o plano por 12 semanas, você estará apto a receber o certificado de **Especialista em Vendas Consultivas — Massoterapia**.

*Parabéns por investir no seu desenvolvimento! Seus clientes e seus resultados agradecem. 💚*`,
        quiz: [
          {
            pergunta: "Qual pacote indicar para um cliente com dor lombar crônica, 1x/semana?",
            opcoes: [
              "3hrs — porta de entrada",
              "6hrs — tratamento pontual",
              "9hrs — ciclo completo de 8 semanas",
              "VIP 48hrs — máxima economia"
            ],
            respostaCorreta: 2,
            explicacao: "Dor crônica 1x/semana por 8 semanas = 9hrs. É o ciclo completo de tratamento."
          }
        ],
        checklist: [
          "Imprimi e colei a Árvore de Decisão no consultório",
          "Segui a rotina semanal por pelo menos 1 semana completa",
          "Registrei meus resultados na planilha de acompanhamento",
          "Defini minha meta de 12 semanas"
        ]
      }
    ]
  },
  {
    titulo: "Marketing Digital para Terapeutas",
    descricao: "Redes sociais, conteúdo e presença digital para atrair e fidelizar clientes",
    icone: "GraduationCap",
    cor: "from-cyan-50 to-sky-50",
    aulas: [
      {
        titulo: "Presença digital profissional",
        descricao: "Perfil no Instagram, Google Meu Negócio e bio estratégica",
        duracaoMinutos: 10,
        conteudo: `# Presença Digital Profissional

## Onde Seus Clientes Te Encontram

### Instagram — Sua Vitrine Digital

**Bio estratégica (modelo):**
> 💆 Massoterapeuta | Resinkra
> ✅ Terapêutica · Relaxante · Head SPA
> 📍 [Cidade]
> 🔗 Agende pelo app ↓

**Destaques obrigatórios:**
- 🏥 Sobre mim / A clínica
- 💆 Serviços e valores
- ⭐ Depoimentos
- 📸 Antes e depois
- ❓ Dúvidas frequentes

### Google Meu Negócio

Muitos clientes buscam "massoterapia perto de mim". Se você não está no Google:

1. Cadastre-se em business.google.com
2. Complete 100% do perfil (fotos, horário, serviços)
3. Peça avaliações a cada cliente satisfeito
4. Responda TODAS as avaliações (positivas e negativas)

**Meta:** 50+ avaliações com nota > 4.8

### WhatsApp Business

- Catálogo com todos os serviços e pacotes
- Mensagem de ausência configurada
- Etiquetas para organizar clientes (novo, pacote ativo, reativar)

### Consistência Visual

Use as mesmas cores, fontes e tom de voz em todas as plataformas. Isso cria reconhecimento de marca.`,
        quiz: [
          {
            pergunta: "Qual plataforma é essencial para clientes que buscam 'massoterapia perto de mim'?",
            opcoes: [
              "TikTok",
              "Google Meu Negócio",
              "LinkedIn",
              "YouTube"
            ],
            respostaCorreta: 1,
            explicacao: "Google Meu Negócio aparece nas buscas locais. Muitos clientes encontram serviços assim."
          }
        ],
        checklist: [
          "Otimizei minha bio no Instagram com o modelo sugerido",
          "Criei os 5 destaques obrigatórios",
          "Cadastrei no Google Meu Negócio (ou completei 100%)",
          "Configurei o WhatsApp Business com catálogo"
        ]
      },
      {
        titulo: "Conteúdo que atrai clientes",
        descricao: "O que postar, quando postar e como converter seguidores em clientes",
        duracaoMinutos: 10,
        conteudo: `# Conteúdo que Atrai Clientes

## Os 4 Pilares de Conteúdo

### 1. Educativo (40% dos posts)
Mostre que você é especialista:
- "5 sinais de que você precisa de massagem"
- "Por que sua dor nas costas volta toda semana"
- "Diferença entre massagem relaxante e terapêutica"
- Dicas posturais para quem trabalha sentado

### 2. Bastidores (25% dos posts)
Humanize seu trabalho:
- Preparação do ambiente (velas, óleos, música)
- Seu dia a dia profissional
- Equipamentos e produtos que usa
- Momentos com a equipe

### 3. Prova Social (25% dos posts)
Depoimentos vendem mais que qualquer propaganda:
- Screenshots de mensagens de clientes (com autorização)
- Vídeos curtos de depoimentos
- Antes e depois (postural, edema, etc.)
- Avaliações do Google

### 4. Chamada para Ação (10% dos posts)
Convide para agendar:
- "Última vaga da semana!"
- "Pacote especial para novos clientes"
- "Agende pelo link na bio"

### Calendário Semanal

| Dia | Tipo | Exemplo |
|-----|------|---------|
| Segunda | Educativo | Dica de postura |
| Terça | Bastidores | Preparo do ambiente |
| Quarta | Prova Social | Depoimento de cliente |
| Quinta | Educativo | Benefício da massagem |
| Sexta | CTA | "Agende para a semana!" |

### Horários que Funcionam

- **Manhã:** 7h-9h (profissionais antes do trabalho)
- **Almoço:** 12h-13h (pausa do trabalho)
- **Noite:** 19h-21h (relaxamento pós-trabalho)

### Formatos que Engajam

1. **Reels curtos** (15-30s) — maior alcance
2. **Carrosséis** — mais salvamentos
3. **Stories** — conexão diária
4. **Lives** — autoridade`,
        quiz: [
          {
            pergunta: "Qual a distribuição ideal de conteúdo nas redes sociais?",
            opcoes: [
              "100% promoções e ofertas",
              "40% educativo, 25% bastidores, 25% prova social, 10% CTA",
              "50% antes e depois, 50% preços",
              "Postar apenas quando tiver promoção"
            ],
            respostaCorreta: 1,
            explicacao: "A maioria do conteúdo deve educar e mostrar bastidores. Apenas 10% deve ser chamada para ação direta."
          }
        ],
        checklist: [
          "Planejei meu calendário de conteúdo da semana",
          "Criei pelo menos 1 post educativo",
          "Coletei 1 depoimento de cliente para postar",
          "Publiquei nos melhores horários (7-9h, 12-13h ou 19-21h)"
        ]
      },
      {
        titulo: "Estratégias de indicação e parcerias",
        descricao: "Como transformar clientes satisfeitos em embaixadores da marca",
        duracaoMinutos: 8,
        conteudo: `# Estratégias de Indicação e Parcerias

## Seus Clientes São Seu Melhor Marketing

### Programa de Indicação

O sistema de indicação já está no app! Use-o ativamente:

> "Sabia que você ganha cashback ao indicar amigos? É só compartilhar seu código pelo app. Quando seu amigo fizer a primeira compra, vocês dois ganham crédito!"

### Como Pedir Indicações (sem ser chato)

**Momento ideal:** Logo após o cliente expressar satisfação

✅ "Que bom que gostou! Se tiver alguém que também precisa, lembra de mim? Pelo app você compartilha seu código e ainda ganha cashback."

❌ "Você tem algum amigo para indicar?" (parece desesperado)

### Parcerias Estratégicas

Negócios complementares que podem indicar clientes:

| Parceiro | Público | Proposta |
|----------|---------|----------|
| Academias | Atletas, lesões | Desconto mútuo |
| Fisioterapeutas | Pós-tratamento | Encaminhamento |
| Nutricionistas | Bem-estar | Programa conjunto |
| Empresas | Funcionários | Pacote corporativo |
| Salões de beleza | Autocuidado | Cross-indicação |

### Script para Propor Parceria

> "Olá, sou [nome] da Resinkra Massoterapia. Notei que atendemos públicos complementares. Que tal criarmos uma parceria onde indicamos clientes um para o outro? Podemos oferecer descontos exclusivos para os clientes de vocês."

### Métricas de Indicação

Acompanhe mensalmente:
- Quantas indicações recebidas
- Taxa de conversão de indicados
- Valor médio do cliente indicado
- ROI do programa de indicação`,
        quiz: [
          {
            pergunta: "Qual o melhor momento para pedir uma indicação ao cliente?",
            opcoes: [
              "Logo que ele chega para a sessão",
              "Quando ele expressa satisfação com o resultado",
              "Pelo WhatsApp 1 semana depois",
              "Nunca — espere ele indicar sozinho"
            ],
            respostaCorreta: 1,
            explicacao: "O momento ideal é logo após o cliente expressar satisfação. Ele está no pico de experiência positiva."
          }
        ],
        checklist: [
          "Apresentei o programa de indicação a 3 clientes satisfeitos",
          "Mapeei 5 parceiros potenciais na região",
          "Contatei 1 parceiro com proposta de cross-indicação",
          "Acompanhei métricas de indicação do mês"
        ]
      }
    ]
  }
];
