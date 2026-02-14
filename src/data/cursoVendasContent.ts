export interface AulaContent {
  titulo: string;
  descricao: string;
  conteudo: string;
  videoUrl?: string;
  duracaoMinutos: number;
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
    titulo: "Fundamentos da Venda Consultiva em Massoterapia",
    descricao: "Entenda a diferença entre vender e ajudar o cliente a comprar",
    icone: "Lightbulb",
    cor: "from-amber-50 to-orange-50",
    aulas: [
      {
        titulo: "Por que vender é cuidar",
        descricao: "A mentalidade certa para vender serviços de bem-estar",
        duracaoMinutos: 8,
        conteudo: `# Por que Vender é Cuidar

## A Mentalidade do Terapeuta-Consultor

Muitos terapeutas têm resistência à ideia de "vender". Associam vendas a algo forçado ou antiético. Mas a verdade é:

> **Quando você deixa de oferecer um tratamento que pode ajudar o cliente, você está negando cuidado.**

### Princípios Fundamentais

1. **Venda = Recomendação profissional** — Assim como um médico prescreve um tratamento, você recomenda sessões baseado na avaliação do cliente.

2. **O cliente não sabe o que precisa** — Ele sente dor ou desconforto, mas não conhece as opções. Você é o especialista.

3. **Omissão não é ética** — Se você identifica que o cliente precisa de 10 sessões mas oferece apenas 1, está sendo omisso.

### Exercício Prático

Reflita e anote:
- Quantas vezes você deixou de oferecer um pacote por medo de parecer "vendedor"?
- O que aconteceu com esses clientes? Voltaram? Melhoraram?
- Como seria diferente se você tivesse recomendado o tratamento completo?

### Script de Abertura

> "Maria, com base na minha avaliação, identifiquei que você tem [problema específico]. O tratamento ideal envolve [X sessões] ao longo de [Y semanas]. Posso explicar como funciona?"

**Ponto-chave:** Você não está vendendo — está prescrevendo um plano de tratamento.`
      },
      {
        titulo: "Perfil do cliente de massoterapia",
        descricao: "Entenda quem é seu cliente e o que ele realmente busca",
        duracaoMinutos: 10,
        conteudo: `# Perfil do Cliente de Massoterapia

## Os 4 Perfis de Cliente

### 1. 🔴 Cliente de Dor (Urgência)
- **Motivação:** Dor aguda, tensão insuportável
- **Comportamento:** Busca solução imediata, aceita investir se resolver rápido
- **Abordagem:** Foque no alívio imediato + plano de prevenção
- **Frase-chave:** "Vamos resolver essa dor agora e criar um plano para ela não voltar."

### 2. 🟡 Cliente de Prevenção (Consciência)
- **Motivação:** Já sentiu dor antes, quer evitar recorrência
- **Comportamento:** Pesquisa antes, compara opções
- **Abordagem:** Destaque o protocolo preventivo e a economia de longo prazo
- **Frase-chave:** "Manter uma rotina de sessões é muito mais barato que tratar crises."

### 3. 🟢 Cliente de Bem-Estar (Autocuidado)
- **Motivação:** Relaxamento, qualidade de vida, rotina de autocuidado
- **Comportamento:** Valoriza a experiência, ambiente, aroma
- **Abordagem:** Enfatize a experiência completa e os benefícios emocionais
- **Frase-chave:** "Esse é o seu momento. Você merece esse cuidado."

### 4. 🔵 Cliente Corporativo (Benefício)
- **Motivação:** Programa da empresa, benefício do trabalho
- **Comportamento:** Usa porque é "de graça", pode se tornar cliente pessoal
- **Abordagem:** Mostre valor além do benefício corporativo
- **Frase-chave:** "Além das sessões do programa, posso montar algo personalizado pra você."

### Exercício: Identifique seus Clientes

Para cada cliente que atendeu esta semana:
1. Em qual perfil ele se encaixa?
2. Você usou a abordagem correta?
3. O que faria diferente?`
      },
      {
        titulo: "A jornada de compra do cliente",
        descricao: "Do primeiro contato à fidelização",
        duracaoMinutos: 7,
        conteudo: `# A Jornada de Compra

## As 5 Etapas

### Etapa 1: Descoberta
O cliente descobre que existe uma solução para o problema dele.
- **Seu papel:** Estar visível (redes sociais, indicações, Google)
- **Ação:** Conteúdo educativo que gera autoridade

### Etapa 2: Consideração
O cliente pesquisa opções e compara.
- **Seu papel:** Mostrar diferenciais e resultados
- **Ação:** Depoimentos, fotos antes/depois, especialização

### Etapa 3: Decisão
O cliente decide agendar.
- **Seu papel:** Facilitar ao máximo (agendamento online, WhatsApp rápido)
- **Ação:** Resposta em menos de 1 hora, flexibilidade de horário

### Etapa 4: Experiência
O cliente faz a primeira sessão.
- **Seu papel:** Superar expectativas, fazer avaliação completa
- **Ação:** Avaliação detalhada + plano de tratamento + follow-up

### Etapa 5: Fidelização
O cliente volta e indica.
- **Seu papel:** Manter relacionamento ativo
- **Ação:** Programa de fidelidade, cashback, lembretes, conteúdo educativo

### Métricas Importantes
| Métrica | Meta |
|---------|------|
| Taxa de retorno após 1ª sessão | > 60% |
| Média de sessões por cliente | > 5 |
| Taxa de indicação | > 30% |
| Ticket médio | Crescente |`
      }
    ]
  },
  {
    titulo: "Técnicas de Abordagem e Rapport",
    descricao: "Como criar conexão genuína e confiança desde o primeiro contato",
    icone: "Heart",
    cor: "from-rose-50 to-pink-50",
    aulas: [
      {
        titulo: "Primeiros 30 segundos",
        descricao: "Como causar uma primeira impressão memorável",
        duracaoMinutos: 6,
        conteudo: `# Os Primeiros 30 Segundos

## A Primeira Impressão Define Tudo

Pesquisas mostram que formamos 80% da nossa opinião sobre alguém nos primeiros 30 segundos.

### Checklist de Recepção

✅ **Ambiente:** Música suave, aroma agradável, temperatura confortável
✅ **Aparência:** Uniforme limpo, cabelo arrumado, sorriso genuíno
✅ **Postura:** De pé, contato visual, mão estendida
✅ **Voz:** Tom calmo, volume médio, ritmo pausado
✅ **Frase de abertura:** Personalizada, não genérica

### Frases que Funcionam

❌ "Boa tarde, pode sentar ali que já chamo."
✅ "Boa tarde, Maria! Que bom te ver. Preparei tudo para você hoje."

❌ "O que você precisa?"
✅ "Me conta como você tem se sentido desde a última vez que nos vimos."

❌ "Quer agendar a próxima?"
✅ "Baseado no que trabalhamos hoje, o ideal seria voltarmos em [X dias]. Qual horário funciona melhor pra você?"

### Técnica do Espelhamento

Observe e adapte-se ao cliente:
- **Cliente apressado** → Seja objetivo e direto
- **Cliente conversador** → Dê espaço para conversa, mas conduza
- **Cliente ansioso** → Fale devagar, explique cada etapa
- **Cliente silencioso** → Respeite o silêncio, pergunte apenas o necessário`
      },
      {
        titulo: "Escuta ativa e perguntas estratégicas",
        descricao: "A arte de ouvir para vender melhor",
        duracaoMinutos: 8,
        conteudo: `# Escuta Ativa e Perguntas Estratégicas

## O Terapeuta que Escuta, Vende Mais

### Regra 80/20
O cliente fala 80% do tempo. Você fala 20%.

Seus 20% são compostos de:
- Perguntas estratégicas (70%)
- Validações (20%)
- Recomendações (10%)

### Perguntas de Diagnóstico

**Sobre a dor/desconforto:**
- "Em uma escala de 0 a 10, como está sua dor hoje?"
- "Quando essa dor começou?"
- "O que piora e o que melhora?"
- "Isso afeta seu sono? Seu trabalho?"

**Sobre expectativas:**
- "O que você espera alcançar com as sessões?"
- "Você já fez algum tratamento similar antes? Como foi?"
- "Quanto tempo você pode dedicar ao seu tratamento?"

**Sobre rotina:**
- "Como é seu dia a dia? Fica muito tempo sentado?"
- "Pratica alguma atividade física?"
- "Como está seu nível de estresse?"

### Técnica de Validação

Após ouvir, repita com suas palavras:

> "Deixa eu ver se entendi: você sente dor nas costas há 3 meses, piora quando fica sentada no trabalho, e isso está atrapalhando seu sono. Correto?"

**Isso demonstra:** atenção, empatia e profissionalismo.

### Exercício

Na próxima sessão, cronometrre: quanto tempo VOCÊ fala vs. o CLIENTE fala?`
      },
      {
        titulo: "Construindo confiança e autoridade",
        descricao: "Como se posicionar como especialista sem parecer arrogante",
        duracaoMinutos: 7,
        conteudo: `# Construindo Confiança e Autoridade

## Os 3 Pilares da Autoridade

### 1. Conhecimento Demonstrado (não declarado)

❌ "Eu sou especialista em drenagem linfática."
✅ "Pela avaliação, identifiquei um acúmulo de líquido na região dos tornozelos. Isso é comum em quem fica muito tempo de pé. Com a drenagem, vamos estimular o sistema linfático a drenar esse excesso."

**A diferença:** No segundo exemplo, você DEMONSTROU conhecimento ao explicar o problema e a solução.

### 2. Resultados Comprovados

- Fotos antes/depois (com autorização)
- Depoimentos de clientes
- Número de sessões realizadas
- Casos de sucesso similares

> "Tive uma cliente com um quadro parecido com o seu. Em 8 sessões ela estava sem dor e voltou a correr."

### 3. Consistência na Comunicação

- Sempre explique o que está fazendo e por quê
- Use termos técnicos, mas traduza para o cliente
- Mantenha o mesmo padrão em todas as interações
- Envie conteúdo educativo entre as sessões

### Framework de Apresentação

1. **Identifique** o problema específico do cliente
2. **Explique** a causa de forma simples
3. **Apresente** o plano de tratamento
4. **Comprove** com dados ou casos similares
5. **Facilite** a decisão (pacotes, parcelamento, cashback)`
      }
    ]
  },
  {
    titulo: "Apresentação de Serviços e Pacotes",
    descricao: "Como apresentar opções de forma estratégica e aumentar o ticket médio",
    icone: "Package",
    cor: "from-emerald-50 to-green-50",
    aulas: [
      {
        titulo: "Ancoragem de preço",
        descricao: "A psicologia por trás da percepção de valor",
        duracaoMinutos: 8,
        conteudo: `# Ancoragem de Preço

## Como o Cérebro Percebe Valor

### O Princípio da Ancoragem

O primeiro número que o cliente ouve define sua referência de preço.

**Exemplo prático:**

❌ "A sessão custa R$ 120."
✅ "O tratamento completo de 10 sessões custa R$ 1.200. Mas temos o pacote com 20% de desconto: 10 sessões por R$ 960, ou seja, cada sessão sai por R$ 96."

**O que aconteceu?** O cliente ancora no R$ 1.200 e percebe R$ 960 como uma economia real.

### Técnica dos 3 Pacotes

Sempre apresente 3 opções (a do meio é a que você quer vender):

| Pacote | Sessões | Preço | Por sessão |
|--------|---------|-------|------------|
| **Essencial** | 4 sessões | R$ 440 | R$ 110 |
| **⭐ Recomendado** | 8 sessões | R$ 800 | R$ 100 |
| **Premium** | 12 sessões | R$ 1.080 | R$ 90 |

### Scripts de Apresentação

**Apresentando o recomendado primeiro:**
> "Para o seu caso, o ideal seriam 8 sessões. O pacote Recomendado é o mais escolhido: R$ 800 com sessões a R$ 100 cada. Mas se preferir experimentar, temos o Essencial com 4 sessões."

**Usando urgência ética:**
> "Essa condição tende a piorar com o tempo. Quanto antes começarmos o tratamento completo, mais rápido e eficaz será o resultado."

### Regra de Ouro
Nunca apresente o preço sem antes ter demonstrado o VALOR do serviço.`
      },
      {
        titulo: "Upsell e cross-sell inteligente",
        descricao: "Como oferecer mais sem ser invasivo",
        duracaoMinutos: 7,
        conteudo: `# Upsell e Cross-sell Inteligente

## Aumentando o Ticket Médio com Elegância

### Upsell: Oferecer uma versão superior

**Momento ideal:** Após a avaliação, quando você identificou necessidades adicionais.

**Exemplos:**
- Sessão simples → Sessão com aromaterapia
- Massagem relaxante → Massagem com pedras quentes
- Sessão avulsa → Pacote de sessões
- Pacote básico → Pacote com Head Spa incluso

**Script:**
> "Pelo que avaliei, além da massagem terapêutica, você se beneficiaria muito de uma sessão de Head Spa. Posso incluir no seu pacote com um valor especial."

### Cross-sell: Oferecer complementos

**Momento ideal:** No final da sessão, quando o cliente está relaxado e satisfeito.

**Exemplos:**
- Sessão de massagem + produto para casa
- Protocolo de drenagem + plano alimentar
- Tratamento corporal + avaliação postural
- Pacote individual + vale presente para amigo

**Script:**
> "Para potencializar o resultado entre as sessões, recomendo esse óleo essencial para usar em casa. Nossos clientes que usam relatam 40% mais resultado."

### Timing é Tudo

| Momento | O que oferecer |
|---------|---------------|
| Na avaliação | Pacote completo vs. sessão avulsa |
| Durante sessão | Upgrade de serviço |
| Pós-sessão | Produtos complementares |
| Via WhatsApp | Promoções e pacotes especiais |
| No retorno | Renovação com desconto |`
      },
      {
        titulo: "Apresentando o programa de cashback",
        descricao: "Use o sistema de fidelidade como ferramenta de vendas",
        duracaoMinutos: 6,
        conteudo: `# Usando o Cashback como Ferramenta de Vendas

## O Cashback Vende por Você

### Por que funciona?

O cashback cria um ciclo virtuoso:
1. Cliente compra → ganha cashback
2. Cashback acumula → incentiva nova compra
3. Nova compra → mais cashback
4. Cliente se torna fiel

### Como Apresentar

**Na primeira sessão:**
> "Aqui na Resinkra temos um programa de fidelidade. A cada sessão você acumula cashback que pode usar em novos serviços ou produtos. Quanto mais você cuida de si, mais economia gera."

**Ao apresentar pacotes:**
> "No pacote de 8 sessões, além do desconto de 20%, você ainda acumula cashback em cada sessão. No total, pode ganhar até R$ XX de volta."

**No programa de indicações:**
> "Se você indicar um amigo e ele agendar, vocês dois ganham cashback. É benefício para todo mundo!"

### Tiers como Motivação

Explique o sistema de tiers:
- **Bronze:** Cashback padrão
- **Prata:** Cashback 1.5x (a partir de R$ 200 gastos)
- **Ouro:** Cashback 2x (a partir de R$ 500 gastos)

**Script:**
> "Você está no tier Prata, faltam apenas R$ 150 para chegar ao Ouro e dobrar seu cashback. Se fechar o pacote de 8 sessões, já passa direto!"

### Dica Avançada
Sempre mencione o saldo de cashback do cliente antes de fechar uma venda:
> "Você tem R$ 35 de cashback disponível. Quer usar nessa compra? O pacote sai de R$ 800 por R$ 765."`
      }
    ]
  },
  {
    titulo: "Objeções e Fechamento",
    descricao: "Como lidar com 'está caro', 'vou pensar' e fechar com naturalidade",
    icone: "Target",
    cor: "from-blue-50 to-indigo-50",
    aulas: [
      {
        titulo: "As 7 objeções mais comuns",
        descricao: "Scripts prontos para cada objeção",
        duracaoMinutos: 12,
        conteudo: `# As 7 Objeções Mais Comuns

## Respostas Prontas para Cada Situação

### 1. "Está caro"
**Significado real:** "Não entendi o valor."

**Resposta:**
> "Entendo sua preocupação com o investimento. Vamos colocar em perspectiva: são R$ 100 por sessão, que dura 1 hora e resolve [problema específico]. Uma consulta médica custa em média R$ 300 e dura 15 minutos. Além disso, temos opções de parcelamento e você ainda ganha cashback."

### 2. "Vou pensar"
**Significado real:** "Não estou convencido."

**Resposta:**
> "Claro! Enquanto pensa, posso te mandar um resumo da avaliação que fiz com as recomendações por WhatsApp? Assim você tem tudo documentado para decidir com calma."

*E depois envie em 24h uma mensagem de follow-up.*

### 3. "Preciso falar com meu marido/esposa"
**Significado real:** "Preciso de validação."

**Resposta:**
> "Com certeza! Se quiser, posso preparar um resumo com o plano de tratamento e os valores para vocês analisarem juntos. Posso mandar pelo WhatsApp?"

### 4. "Só quero uma sessão para experimentar"
**Significado real:** "Não tenho confiança ainda."

**Resposta:**
> "Perfeito! Vamos fazer essa sessão e, no final, faço uma avaliação completa. Aí você decide com base na experiência e nos resultados que sentir."

### 5. "Na internet vi mais barato"
**Significado real:** "Me convença do diferencial."

**Resposta:**
> "Preço é importante, concordo. Mas o que diferencia nosso trabalho é [avaliação personalizada / protocolos / acompanhamento / produtos profissionais]. O barato pode sair caro quando não resolve o problema."

### 6. "Não tenho tempo"
**Significado real:** "Não é prioridade."

**Resposta:**
> "Entendo a correria. Nossas sessões duram [X minutos] e temos horários flexíveis, inclusive [horário especial]. Investir esse tempo agora evita problemas maiores depois. Qual dia da semana é menos corrido para você?"

### 7. "Deixa para o mês que vem"
**Significado real:** "Não é urgente."

**Resposta:**
> "Posso reservar um horário para o mês que vem, sim. Mas devo ser honesta: quanto mais tempo sem tratar, [consequência específica]. Se começar agora, em 30 dias você já estará sentindo diferença."`
      },
      {
        titulo: "Técnicas de fechamento natural",
        descricao: "Feche vendas sem pressão, com naturalidade",
        duracaoMinutos: 8,
        conteudo: `# Técnicas de Fechamento Natural

## Fechar sem Parecer que está Vendendo

### 1. Fechamento por Alternativa
Não pergunte "sim ou não". Dê opções.

❌ "Quer agendar a próxima?"
✅ "Para a próxima sessão, fica melhor terça ou quinta pra você?"

❌ "Quer fechar o pacote?"
✅ "Você prefere o pacote de 8 ou de 12 sessões?"

### 2. Fechamento por Resumo
Resuma tudo e peça confirmação.

> "Então ficou assim: pacote de 8 sessões de massagem terapêutica, às terças-feiras às 14h, com cashback ativo. Confirmo para você?"

### 3. Fechamento por Urgência Ética
Use fatos reais, nunca invente escassez.

> "Esse horário das 14h é bem concorrido. Se quiser garantir, sugiro já deixar agendado."

> "O pacote com esse desconto é válido até o final do mês."

### 4. Fechamento por Consequência
Mostre o custo de NÃO agir.

> "Se essa tensão muscular não for tratada, pode evoluir para uma hérnia cervical. O tratamento preventivo agora é muito mais simples e barato."

### 5. Fechamento por Indicação
Use a prova social.

> "Tenho vários clientes com esse mesmo quadro que optaram pelo pacote de 8 sessões e os resultados foram excelentes. Posso te mostrar alguns depoimentos?"

### Regra de Ouro do Fechamento
Após fazer a proposta, **fique em silêncio**. Quem fala primeiro, perde.

> "O pacote Recomendado é de 8 sessões por R$ 800. O que acha?"
> *... silêncio ...*`
      },
      {
        titulo: "Follow-up e reativação",
        descricao: "Como manter o relacionamento e reativar clientes inativos",
        duracaoMinutos: 7,
        conteudo: `# Follow-up e Reativação

## O Dinheiro Está no Follow-up

### Calendário de Follow-up

| Quando | Ação | Canal |
|--------|------|-------|
| Mesmo dia | Agradecer + enviar orientações | WhatsApp |
| 2 dias depois | Perguntar como está se sentindo | WhatsApp |
| 1 semana | Conteúdo educativo relacionado | WhatsApp |
| Véspera da sessão | Lembrete do agendamento | Automático |
| Após última sessão | Avaliação de satisfação | App |
| 30 dias sem retorno | Mensagem de reativação | WhatsApp |
| 60 dias sem retorno | Oferta especial de retorno | WhatsApp |

### Templates de Mensagens

**Pós-sessão (mesmo dia):**
> "Oi [Nome]! Foi um prazer te atender hoje 💆‍♀️ Lembre de beber bastante água e evitar esforços intensos nas próximas 24h. Qualquer dúvida, estou por aqui!"

**Follow-up (2 dias):**
> "Oi [Nome]! Como você está se sentindo depois da sessão? Alguma sensibilidade ou já está sentindo os benefícios? 😊"

**Reativação (30 dias):**
> "Oi [Nome]! Faz um tempinho que não nos vemos. Como estão as costas? Temos horários disponíveis essa semana, quer agendar? Seu cashback de R$ [XX] ainda está disponível! 🌿"

**Reativação (60 dias):**
> "Oi [Nome]! Sentimos sua falta! Preparamos uma condição especial para seu retorno: sessão com 15% de desconto essa semana. Quer agendar? 💚"

### Métricas de Follow-up
- **Taxa de resposta:** meta > 60%
- **Taxa de reagendamento pós-follow-up:** meta > 40%
- **NPS (satisfação):** meta > 8.5`
      }
    ]
  },
  {
    titulo: "Vendas pelo WhatsApp",
    descricao: "Transforme conversas em agendamentos usando o WhatsApp de forma profissional",
    icone: "MessageCircle",
    cor: "from-green-50 to-teal-50",
    aulas: [
      {
        titulo: "Perfil profissional e primeiro contato",
        descricao: "Configure seu WhatsApp para vender mais",
        duracaoMinutos: 6,
        conteudo: `# WhatsApp Profissional

## Configuração que Gera Credibilidade

### Checklist do Perfil

✅ **Foto:** Profissional, uniforme, sorrindo (NÃO selfie)
✅ **Nome:** "Nome | Resinkra Massoterapia"
✅ **Status:** "📍 Agendamentos abertos | Link do app"
✅ **Catálogo:** Serviços com fotos e preços
✅ **Mensagem de ausência:** Configurada para fora do horário
✅ **Resposta rápida:** Templates salvos para agilidade

### Tempo de Resposta = Dinheiro

| Tempo de resposta | Taxa de conversão |
|-------------------|-------------------|
| < 5 minutos | 78% |
| 5-30 minutos | 52% |
| 30 min - 1 hora | 36% |
| > 1 hora | 14% |

### Primeiro Contato — Script

**Cliente novo que manda mensagem:**
> "Olá [Nome]! Obrigada pelo contato 😊 Sou [Seu Nome], terapeuta da Resinkra. Como posso te ajudar? Está buscando tratamento para algo específico ou quer conhecer nossos serviços?"

**Após o cliente responder:**
> "Entendi! Para te direcionar melhor, posso fazer 3 perguntinhas rápidas?
> 1. Há quanto tempo sente [sintoma]?
> 2. Já fez massoterapia antes?
> 3. Qual sua disponibilidade de horários?"

**Regra:** Nunca mande preço sem antes fazer perguntas e entender a necessidade.`
      },
      {
        titulo: "Scripts de conversão por WhatsApp",
        descricao: "Templates prontos para cada situação de vendas",
        duracaoMinutos: 10,
        conteudo: `# Scripts de Conversão

## Templates para Cada Situação

### 1. Cliente Pediu Preço Direto

❌ "A sessão custa R$ 120."
✅ 
> "O valor da sessão individual é R$ 120, mas temos pacotes com condições especiais 😊
> 
> 📦 **4 sessões** — R$ 440 (R$ 110/sessão)
> ⭐ **8 sessões** — R$ 800 (R$ 100/sessão) *mais escolhido*
> 💎 **12 sessões** — R$ 1.080 (R$ 90/sessão)
> 
> Todos incluem avaliação gratuita e cashback! Qual te interessa mais?"

### 2. Cliente Quer Saber Mais Sobre o Serviço

> "O [nome do serviço] é indicado para [benefícios principais]. A sessão dura [X] minutos e inclui:
> ✅ Avaliação personalizada
> ✅ Tratamento com [técnica]
> ✅ Orientações para casa
> ✅ Cashback no programa de fidelidade
> 
> Posso agendar uma avaliação gratuita para você? 🌿"

### 3. Resgate de Carrinho Abandonado

> "Oi [Nome]! Vi que você demonstrou interesse em [serviço]. Reservei um horário especial pra você:
> 📅 [dia], às [hora]
> 
> Confirmo pra você? 😊"

### 4. Pós-indicação

> "Oi [Nome]! O(a) [nome do indicador] me indicou você e contou que você tem [problema]. Posso te ajudar com isso! Quer agendar uma avaliação sem compromisso? 🌿"

### 5. Promoção Sazonal

> "🌸 [Nome], preparamos algo especial para [ocasião]:
> 
> [Descrição da promoção]
> 
> ⏰ Válido até [data]
> 📲 Agende pelo app ou responda aqui!
> 
> Quer garantir o seu?"

### Regras de Ouro do WhatsApp
1. **Áudio:** Máximo 1 minuto, apenas se o cliente mandar áudio primeiro
2. **Emojis:** Use com moderação (2-3 por mensagem)
3. **Fotos:** Sempre profissionais, nunca pessoais
4. **Horário:** Respeite o horário comercial (8h-20h)
5. **Insistência:** Máximo 2 follow-ups sem resposta`
      }
    ]
  },
  {
    titulo: "Indicadores e Melhoria Contínua",
    descricao: "Meça, analise e melhore suas vendas com dados reais",
    icone: "BarChart3",
    cor: "from-purple-50 to-violet-50",
    aulas: [
      {
        titulo: "KPIs essenciais de vendas",
        descricao: "Os números que você precisa acompanhar toda semana",
        duracaoMinutos: 8,
        conteudo: `# KPIs Essenciais de Vendas

## Os 8 Números que Importam

### 1. Taxa de Conversão de Leads
**Fórmula:** (Agendamentos ÷ Contatos recebidos) × 100
**Meta:** > 40%
**O que fazer se baixa:** Revisar scripts de primeiro contato

### 2. Ticket Médio
**Fórmula:** Faturamento total ÷ Número de clientes
**Meta:** Crescente mês a mês
**O que fazer se estagnado:** Implementar upsell e pacotes

### 3. Taxa de Retorno
**Fórmula:** (Clientes que voltaram ÷ Total de clientes novos) × 100
**Meta:** > 60%
**O que fazer se baixa:** Melhorar experiência e follow-up

### 4. LTV (Lifetime Value)
**Fórmula:** Ticket médio × Frequência de compra × Tempo como cliente
**Meta:** > R$ 2.000
**O que fazer se baixo:** Programa de fidelidade + pacotes

### 5. Taxa de Indicação
**Fórmula:** (Clientes por indicação ÷ Total de novos) × 100
**Meta:** > 30%
**O que fazer se baixa:** Ativar programa de cashback por indicação

### 6. Taxa de No-show
**Fórmula:** (Faltas ÷ Agendamentos) × 100
**Meta:** < 10%
**O que fazer se alta:** Lembretes automáticos + política de cancelamento

### 7. NPS (Net Promoter Score)
**Escala:** -100 a 100
**Meta:** > 70
**O que fazer se baixo:** Pesquisa qualitativa + melhorias

### 8. Tempo Médio de Resposta
**Medida:** Minutos para responder no WhatsApp
**Meta:** < 15 minutos
**O que fazer se alto:** Automação + templates

### Planilha Semanal
Crie uma rotina de preencher esses KPIs toda sexta-feira. Em 4 semanas você terá dados suficientes para identificar padrões e agir.`
      },
      {
        titulo: "Plano de ação semanal",
        descricao: "Rotina prática para aplicar tudo que aprendeu",
        duracaoMinutos: 6,
        conteudo: `# Plano de Ação Semanal

## Sua Rotina de Alta Performance

### Segunda-feira: Planejamento
- [ ] Revisar agenda da semana
- [ ] Identificar clientes para follow-up
- [ ] Preparar mensagens de reativação
- [ ] Checar estoque de produtos

### Terça a Quinta: Execução
- [ ] Aplicar scripts de abordagem aprendidos
- [ ] Registrar objeções ouvidas (para treinar)
- [ ] Oferecer pacotes após cada avaliação
- [ ] Enviar follow-up pós-sessão no mesmo dia
- [ ] Mencionar cashback e indicações

### Sexta-feira: Análise
- [ ] Preencher KPIs da semana
- [ ] Comparar com semana anterior
- [ ] Identificar 1 ponto de melhoria
- [ ] Definir meta para semana seguinte

### Sábado: Conteúdo
- [ ] Revisar 1 aula do curso
- [ ] Praticar 1 script novo
- [ ] Postar conteúdo educativo nas redes

## Metas Progressivas

| Semana | Foco | Meta |
|--------|------|------|
| 1-2 | Escuta ativa | 80% do tempo ouvindo |
| 3-4 | Apresentação de pacotes | Oferecer pacote a 100% dos clientes |
| 5-6 | Objeções | Responder sem hesitar |
| 7-8 | WhatsApp | Responder em < 15 min |
| 9-10 | Indicações | Pedir indicação a todo cliente satisfeito |
| 11-12 | KPIs | Atingir todas as metas |

## Certificado de Conclusão 🏆

Ao completar todas as aulas e aplicar o plano por 12 semanas, você receberá seu certificado de **Especialista em Vendas Consultivas — Massoterapia**.

*Parabéns por investir no seu desenvolvimento! Seus clientes e seus resultados agradecem. 💚*`
      }
    ]
  }
];
