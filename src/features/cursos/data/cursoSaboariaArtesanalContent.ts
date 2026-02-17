import { type ModuloContent } from "@/features/cursos/data/cursoVendasContent";

export const cursoSaboariaArtesanalData: ModuloContent[] = [
  // ═══════════════════════════════════════════════════════════
  // MÓDULO 1 — FUNDAÇÃO (8h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Fundação — O Universo da Saboaria",
    descricao: "O que é saboaria artesanal, benefícios, mercado, história, tipos e segurança",
    icone: "Lightbulb",
    cor: "from-emerald-50 to-teal-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "O que é Saboaria Artesanal",
        descricao: "Definição, benefícios e comparação com sabonetes industriais",
        duracaoMinutos: 90,
        conteudo: `# O que é Saboaria Artesanal

## Definição

Saboaria artesanal é a arte de fabricar sabonetes de forma manual, utilizando ingredientes naturais, óleos vegetais, manteigas e fragrâncias. Diferente dos sabonetes industriais, os artesanais preservam a glicerina natural (um subproduto da saponificação) que tem propriedades hidratantes, e permitem total controle sobre os ingredientes utilizados.

## Benefícios dos Sabonetes Artesanais

| Benefício | Descrição |
|---|---|
| **Ingredientes naturais** | Livres de parabenos, sulfatos e químicos agressivos |
| **Hidratação profunda** | A glicerina natural mantém a umidade da pele |
| **Personalização** | Criação de fórmulas para necessidades específicas |
| **Sustentabilidade** | Embalagens reduzidas e ingredientes biodegradáveis |
| **Valor terapêutico** | Óleos essenciais com propriedades aromaterápicas |
| **Presente personalizado** | Opção de presente artesanal e significativo |

## Sabonete Artesanal vs. Sabonete Industrial

| Aspecto | Sabonete Artesanal | Sabonete Industrial |
|---|---|---|
| **Glicerina** | Preservada naturalmente | Removida (vendida separadamente) |
| **Ingredientes** | Naturais, óleos vegetais | Sintéticos, tensoativos agressivos |
| **Hidratação** | Alta (glicerina + óleos vegetais) | Baixa (ressecam a pele) |
| **Fragrância** | Óleos essenciais terapêuticos | Fragrâncias sintéticas |
| **Produção** | Pequena escala, artesanal | Industrial, em massa |
| **Valor agregado** | Alto (produto premium) | Baixo |

> Sabonetes artesanais são produtos premium que preservam a glicerina natural e oferecem benefícios reais para a pele.`,
        quiz: [
          { pergunta: "Qual substância é preservada nos sabonetes artesanais mas removida nos industriais?", opcoes: ["Parafina", "Glicerina", "Soda cáustica", "Corante"], respostaCorreta: 1, explicacao: "A glicerina natural é preservada nos sabonetes artesanais, proporcionando hidratação, mas é removida na produção industrial." },
          { pergunta: "Qual destes NÃO é um benefício dos sabonetes artesanais?", opcoes: ["Personalização", "Hidratação profunda", "Produção em massa", "Sustentabilidade"], respostaCorreta: 2, explicacao: "Produção em massa é característica de sabonetes industriais, não artesanais." },
        ],
        checklist: ["Entendi a diferença entre sabonetes artesanais e industriais", "Conheço os benefícios da glicerina natural", "Identifiquei o valor agregado dos sabonetes artesanais"],
      },
      {
        titulo: "Mercado e Oportunidades",
        descricao: "Dados do setor, perfil do consumidor e nichos",
        duracaoMinutos: 60,
        conteudo: `# O Mercado de Saboaria Artesanal no Brasil

## Dados do Setor

| Dado | Oportunidade |
|---|---|
| Mercado de cosméticos artesanais em expansão | Demanda crescente por produtos naturais |
| Consumidores buscam ingredientes sustentáveis | Valorização de marcas com propósito |
| Setor movimenta bilhões de dólares globalmente | Oportunidade de negócio lucrativa |
| Mercado artesanal brasileiro movimenta R$ 12 milhões | Fatia expressiva para pequenos produtores |

## Perfil do Consumidor

| Perfil | Características | Estratégia |
|---|---|---|
| **Conscientes** | Buscam ingredientes naturais e sustentáveis | Transparência na composição |
| **Pele sensível** | Alergia a produtos industriais | Fórmulas suaves e hipoalergênicas |
| **Presentes** | Buscam produtos diferenciados | Embalagens atrativas, kits |
| **Terapêuticos** | Interesse em aromaterapia | Óleos essenciais de qualidade |

## Oportunidades de Nicho

| Nicho | Descrição |
|---|---|
| **Sabonetes veganos** | Sem ingredientes de origem animal |
| **Sabonetes orgânicos** | Ingredientes certificados |
| **Sabonetes terapêuticos** | Para pele acneica, psoríase, etc. |
| **Sabonetes esfoliantes** | Com aveia, sementes, bucha vegetal |
| **Sabonetes líquidos** | Versão prática e moderna |
| **Kits presentes** | Combinações para ocasiões especiais |

> O mercado de saboaria artesanal está em plena expansão, com múltiplas oportunidades de nicho.`,
        quiz: [
          { pergunta: "Qual público busca fórmulas suaves e hipoalergênicas?", opcoes: ["Terapêuticos", "Pele sensível", "Presentes", "Conscientes"], respostaCorreta: 1, explicacao: "Pessoas com pele sensível buscam fórmulas suaves por terem alergia a produtos industriais." },
        ],
      },
      {
        titulo: "História, Tipos e Segurança",
        descricao: "Da antiguidade aos tipos modernos e EPIs obrigatórios",
        duracaoMinutos: 90,
        conteudo: `# História da Saboaria

## Linha do Tempo

| Período | Civilização | Contribuição |
|---|---|---|
| **2800 a.C.** | Babilônios | Primeiros registros de fabricação de sabão |
| **1500 a.C.** | Egípcios | Uso de gorduras e sais alcalinos para higiene |
| **100 d.C.** | Romanos | Desenvolvimento de técnicas de saponificação |
| **Idade Média** | Europeus | Saboaria como ofício estabelecido |

# Tipos de Sabonetes Artesanais

| Tipo | Descrição | Técnica | Indicação |
|---|---|---|---|
| **Sabonete de Glicerina** | Base pronta, derreter e verter | Melt & Pour | Iniciantes, produção rápida |
| **Sabonete Frio** | Saponificação com soda cáustica | Processo a frio | Avançado, mais demorado |
| **Sabonete Quente** | Cozimento dos ingredientes | Processo a quente | Intermediário |
| **Sabonete Prensado** | Massa prensada em moldes | Prensagem | Sabonetes sólidos |
| **Sabonete Líquido** | Versão líquida para bombeadores | Processo específico | Diversificação |

# Segurança na Fabricação

## EPIs Obrigatórios

| Item | Função |
|---|---|
| **Luvas de nitrilo** | Proteger a pele de contato com soda e ingredientes |
| **Óculos de segurança** | Evitar respingos nos olhos |
| **Avental impermeável** | Proteger a roupa e a pele |
| **Máscara** | Evitar inalação de vapores (especialmente soda) |
| **Calçados fechados** | Proteção contra respingos |

## Cuidados Essenciais

| Cuidado | Por que é importante |
|---|---|
| **Trabalhar em local ventilado** | Vapores da soda podem ser tóxicos |
| **Nunca adicionar água à soda** | Sempre soda à água (choque térmico perigoso) |
| **Usar utensílios exclusivos** | Não usar utensílios de cozinha que vão para alimentos |
| **Armazenar soda longe de crianças** | Produto altamente corrosivo |
| **Ter vinagre por perto** | Neutraliza a soda em caso de contato com a pele |

> ⚠️ Segurança é prioridade absoluta na fabricação de sabonetes!`,
        quiz: [
          { pergunta: "Qual civilização fez os primeiros registros de fabricação de sabão?", opcoes: ["Egípcios", "Romanos", "Babilônios", "Chineses"], respostaCorreta: 2, explicacao: "Os Babilônios em 2800 a.C. produziram os primeiros registros de fabricação de sabão." },
          { pergunta: "Na manipulação de soda cáustica, qual a regra de ouro?", opcoes: ["Adicionar água à soda", "Adicionar soda à água", "Misturar a frio", "Não usar EPI"], respostaCorreta: 1, explicacao: "SEMPRE adicionar soda à água, nunca o inverso, para evitar choque térmico perigoso." },
        ],
        checklist: ["Conheço a história da saboaria", "Sei diferenciar os 5 tipos de sabonetes", "Tenho todos os EPIs necessários", "Memorizei os cuidados de segurança com soda cáustica"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 2 — MATERIAIS E INGREDIENTES (8h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Materiais, Ferramentas e Ingredientes",
    descricao: "Bases, óleos, manteigas, utensílios e organização do espaço",
    icone: "Package",
    cor: "from-amber-50 to-yellow-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Matérias-Primas Básicas",
        descricao: "Bases, óleos vegetais, manteigas e ceras",
        duracaoMinutos: 120,
        conteudo: `# Matérias-Primas Básicas

## Bases para Sabonetes

| Tipo de Base | Características | Indicação |
|---|---|---|
| **Glicerina transparente** | Versátil, permite efeitos visuais | Sabonetes decorativos, com flores |
| **Glicerina branca** | Opaca, aspecto cremoso | Sabonetes cremosos, leitosos |
| **Base de leite de cabra** | Hidratante, suave | Peles sensíveis |
| **Base de manteiga de karité** | Nutritiva, emoliente | Peles secas |
| **Base de mel** | Hidratante, antibacterial | Sabonetes terapêuticos |
| **Base de óleo de coco** | Espumante, refrescante | Sabonetes de banho |

## Óleos Vegetais

| Óleo | Benefícios | Indicação |
|---|---|---|
| **Óleo de coco** | Hidrata, espuma cremosa | Sabonetes de banho |
| **Azeite de oliva** | Nutritivo, suave | Peles sensíveis |
| **Óleo de amêndoas** | Emoliente, calmante | Peles secas e sensíveis |
| **Óleo de semente de uva** | Leve, adstringente | Peles oleosas |
| **Óleo de rícino** | Estabiliza espuma | Todos os tipos |
| **Óleo de babaçu** | Similar ao coco, sustentável | Sabonetes ecológicos |

## Manteigas e Ceras

| Ingrediente | Benefícios | Indicação |
|---|---|---|
| **Manteiga de karité** | Nutrição profunda | Peles ressecadas |
| **Manteiga de cacau** | Hidratação, aroma | Sabonetes gourmand |
| **Manteiga de manga** | Leve, regeneradora | Todos os tipos |
| **Cera de abelha** | Endurece, protege | Sabonetes mais firmes |

> Escolher matérias-primas de qualidade é o segredo de um sabonete artesanal excepcional.`,
        quiz: [
          { pergunta: "Qual base é mais indicada para sabonetes decorativos com flores?", opcoes: ["Glicerina branca", "Glicerina transparente", "Base de mel", "Base de leite de cabra"], respostaCorreta: 1, explicacao: "A glicerina transparente permite efeitos visuais e é ideal para sabonetes decorativos com flores." },
          { pergunta: "Qual óleo estabiliza a espuma dos sabonetes?", opcoes: ["Óleo de coco", "Azeite de oliva", "Óleo de rícino", "Óleo de amêndoas"], respostaCorreta: 2, explicacao: "O óleo de rícino é conhecido por estabilizar a espuma nos sabonetes." },
        ],
        checklist: ["Conheço as 6 bases para sabonetes", "Sei os benefícios de cada óleo vegetal", "Entendo a função das manteigas e ceras"],
      },
      {
        titulo: "Utensílios e Organização do Espaço",
        descricao: "Ferramentas essenciais e como montar seu ateliê",
        duracaoMinutos: 90,
        conteudo: `# Utensílios e Organização do Espaço

## Ferramentas Essenciais

| Ferramenta | Função |
|---|---|
| **Balança de precisão** | Medir ingredientes exatamente |
| **Termômetro culinário** | Controlar temperatura |
| **Recipientes de vidro ou inox** | Derreter e misturar (não usar alumínio) |
| **Espátulas de silicone** | Mexer e raspar |
| **Formas de silicone** | Moldar os sabonetes |
| **Frasco spray com álcool 70%** | Eliminar bolhas |
| **Faca ou cortador** | Cortar sabonetes em barras |
| **Ralador** | Para criar efeitos decorativos |

## Organização do Local de Trabalho

O ateliê ideal deve ter 4 áreas distintas:
- **Área de Pesagem** — balança, planilha
- **Área de Derretimento** — banho-maria, fogão
- **Área de Moldagem** — bancada limpa
- **Área de Resfriamento** — estante arejada

## Checklist de Preparação

| Antes de começar | Verificar |
|---|---|
| ✅ Ingredientes separados | Bases, óleos, essências, corantes |
| ✅ Utensílios limpos | Panelas, espátulas, formas |
| ✅ EPI pronto | Luvas, óculos, avental |
| ✅ Ventilação adequada | Janelas abertas ou exaustor |
| ✅ Área organizada | Bancada limpa, tudo ao alcance |

> Um espaço bem organizado aumenta a produtividade e a segurança na produção.`,
        quiz: [
          { pergunta: "Por que NÃO se deve usar recipientes de alumínio?", opcoes: ["São caros", "Reagem com soda cáustica", "São pesados", "Não retêm calor"], respostaCorreta: 1, explicacao: "O alumínio reage com a soda cáustica, podendo liberar gases tóxicos e danificar o recipiente." },
        ],
        checklist: ["Tenho todas as ferramentas essenciais", "Organizei meu ateliê em 4 áreas", "Fiz o checklist de preparação"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 3 — TÉCNICA MELT & POUR (10h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Técnica Melt & Pour (Base Pronta)",
    descricao: "Técnica para iniciantes: derreter, aromatizar e moldar",
    icone: "Droplets",
    cor: "from-sky-50 to-blue-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Passo a Passo Melt & Pour",
        descricao: "Processo completo do derretimento à embalagem",
        duracaoMinutos: 150,
        conteudo: `# Técnica Melt & Pour — Passo a Passo

## O que é Técnica Melt & Pour

É a técnica mais simples e indicada para iniciantes. Utiliza bases prontas de glicerina que são derretidas, aromatizadas, coloridas e vertidas em moldes. Não envolve manipulação de soda cáustica.

**Vantagens:**
- Rápida (sabonete pronto em poucas horas)
- Segura (sem soda cáustica)
- Versátil (permite infinitas variações)
- Baixo investimento inicial

## Passo a Passo Completo

| Etapa | Descrição | Temperatura | Dicas |
|---|---|---|---|
| **1. Preparar** | Separar base, essências, corantes, formas | Ambiente | Calcular quantidades |
| **2. Cortar a base** | Picar em cubos pequenos | - | Cubos uniformes derretem por igual |
| **3. Derreter** | Banho-maria ou micro-ondas (30s intervalos) | 60-70°C | Não superaquecer |
| **4. Adicionar óleos** | Incorporar após derreter | 60°C | Máx. 1 colher sopa/500g |
| **5. Adicionar essência** | Misturar suavemente | 55-60°C | 5-10ml por 500g |
| **6. Adicionar corante** | Incorporar aos poucos | 55-60°C | Menos é mais |
| **7. Borrifar álcool** | Evitar bolhas nas formas | Ambiente | Álcool 70% |
| **8. Verter nas formas** | Despejar lentamente | 50-55°C | Evitar respingos |
| **9. Borrifar superfície** | Eliminar bolhas | Imediato | Suavemente |
| **10. Solidificar** | 2-4 horas | Ambiente | Geladeira acelera (15-20 min) |
| **11. Desenformar** | Retirar com cuidado | Após sólido | Silicone facilita |
| **12. Embalar** | Proteger do ar e luz | Imediato | Filme PVC ou celofane |

## Cálculo de Quantidades

**Tabela de Aditivos por 500g de Base:**

| Aditivo | Quantidade Máxima | Função |
|---|---|---|
| Óleo vegetal | 15-20ml | Hidratação |
| Essência/Óleo essencial | 5-10ml | Aroma |
| Corante líquido | 5-10 gotas | Cor |
| Álcool (para borrifar) | Pequena quantidade | Eliminar bolhas |

> A técnica Melt & Pour é a porta de entrada perfeita para a saboaria artesanal!`,
        quiz: [
          { pergunta: "Qual a temperatura ideal para derreter a base de glicerina?", opcoes: ["40-50°C", "60-70°C", "80-90°C", "100°C"], respostaCorreta: 1, explicacao: "A base de glicerina deve ser derretida entre 60-70°C para evitar superaquecimento." },
          { pergunta: "Qual produto elimina bolhas de ar nos sabonetes?", opcoes: ["Vinagre", "Água destilada", "Álcool 70%", "Óleo vegetal"], respostaCorreta: 2, explicacao: "Borrifar álcool 70% nas formas e na superfície elimina bolhas de ar." },
        ],
        checklist: ["Dominei as 12 etapas do Melt & Pour", "Sei calcular aditivos por 500g de base", "Pratiquei o processo completo"],
      },
      {
        titulo: "Técnicas Decorativas com Melt & Pour",
        descricao: "Camadas, marmorizado, degradê, flores e efeitos especiais",
        duracaoMinutos: 120,
        conteudo: `# Técnicas Decorativas com Melt & Pour

## Técnicas Disponíveis

| Técnica | Descrição | Como fazer |
|---|---|---|
| **Camadas** | Cores alternadas em camadas | Despejar, aguardar endurecer parcialmente, nova camada |
| **Marmorizado** | Efeito de mármore | Despejar base branca, adicionar gotas de cor e mexer levemente |
| **Degradê** | Transição suave de cores | Preparar tons graduais, despejar do mais claro ao mais escuro |
| **Com flores** | Flores secas incorporadas | Posicionar na forma antes de verter |
| **Transparente com objetos** | Pequenos objetos decorativos | Posicionar na forma, verter base transparente |
| **Esfoliante** | Com aveia, sementes | Adicionar à base antes de verter |
| **Com bucha vegetal** | Bucha incorporada | Colocar bucha na forma, verter base |

## Exemplo: Sabonete Arco-Íris

1. Separar base em 7 porções
2. Tingir cada porção com uma cor do arco-íris
3. Despejar em camadas, aguardando cada camada endurecer levemente
4. Finalizar com borrifada de álcool

## Exemplo: Sabonete Picolé Tropical

1. Usar formas de picolé
2. Criar camadas coloridas
3. Inserir palito antes da última camada
4. Embalar como picolé

> A criatividade é o limite na técnica Melt & Pour!`,
        quiz: [
          { pergunta: "Para criar efeito marmorizado, o que se deve fazer?", opcoes: ["Misturar vigorosamente", "Adicionar gotas de cor e mexer levemente", "Usar apenas uma cor", "Aquecer a 100°C"], respostaCorreta: 1, explicacao: "O efeito marmorizado é obtido adicionando gotas de cor e mexendo levemente, sem homogeneizar completamente." },
        ],
        checklist: ["Pratiquei pelo menos 3 técnicas decorativas", "Criei um sabonete em camadas", "Experimentei sabonete com flores ou ervas"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 4 — SAPONIFICAÇÃO A FRIO (15h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Saponificação a Frio (Cold Process)",
    descricao: "Química da saponificação, calculadora, processo e técnicas decorativas",
    icone: "FlaskConical",
    cor: "from-violet-50 to-purple-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Química e Calculadora de Saponificação",
        descricao: "Entendendo a reação e calculando fórmulas",
        duracaoMinutos: 150,
        conteudo: `# Saponificação a Frio — Química e Cálculos

## O que é Saponificação a Frio

Processo químico que transforma óleos vegetais e soda cáustica em sabonete e glicerina natural. É a técnica mais tradicional e produz sabonetes de altíssima qualidade.

**Vantagens:**
- Controle total sobre os ingredientes
- Glicerina natural preservada
- Sabonetes mais suaves e hidratantes

**Desvantagens:**
- Requer cuidados de segurança (soda cáustica)
- Tempo de cura de 4 a 6 semanas

## Fatores Críticos

| Fator | Importância |
|---|---|
| **Proporção exata** | Soda em excesso = sabonete agressivo; pouca soda = sabonete mole |
| **Temperatura** | Deve ser controlada (35-45°C) |
| **Mistura** | Até atingir o "traço" (consistência de pudim) |
| **Cura** | Tempo para completar a saponificação e suavizar o pH |

## Índices de Saponificação

| Óleo | NaOH (g por 100g de óleo) |
|---|---|
| Óleo de coco | 18,3 |
| Azeite de oliva | 13,5 |
| Óleo de palma | 14,2 |
| Óleo de rícino | 12,8 |
| Manteiga de karité | 12,9 |

> Sempre utilize calculadoras de saponificação para determinar a quantidade exata de soda cáustica!`,
        quiz: [
          { pergunta: "O que acontece se houver excesso de soda cáustica na fórmula?", opcoes: ["Sabonete fica mole", "Sabonete fica agressivo para a pele", "Sabonete não endurece", "Nada acontece"], respostaCorreta: 1, explicacao: "Excesso de soda cáustica torna o sabonete agressivo e irritante para a pele." },
          { pergunta: "Qual óleo tem o maior índice de saponificação?", opcoes: ["Azeite de oliva", "Óleo de coco", "Óleo de rícino", "Manteiga de karité"], respostaCorreta: 1, explicacao: "O óleo de coco tem o maior índice (18,3g de NaOH por 100g), requerendo mais soda na saponificação." },
        ],
        checklist: ["Entendi a química da saponificação", "Sei usar calculadoras de saponificação", "Conheço os índices de cada óleo"],
      },
      {
        titulo: "Processo a Frio — Passo a Passo",
        descricao: "Da preparação da soda ao corte e cura",
        duracaoMinutos: 180,
        conteudo: `# Processo a Frio — Passo a Passo Completo

| Etapa | Descrição | Temperatura | Dicas |
|---|---|---|---|
| **1. Calcular** | Usar calculadora de saponificação | - | Anotar tudo |
| **2. Separar EPI** | Luvas, óculos, avental | - | Obrigatório |
| **3. Preparar soda** | Adicionar SODA à ÁGUA (nunca o inverso) | Ambiente | Em local ventilado |
| **4. Aquecer óleos** | Derreter óleos e manteigas | 35-45°C | Banho-maria |
| **5. Medir temperaturas** | Óleos e soda devem estar próximas | 35-45°C | Diferença máx. 5°C |
| **6. Misturar** | Verter soda nos óleos | - | Suavemente |
| **7. Bater** | Com mixer até atingir o "traço" | - | Consistência de pudim |
| **8. Adicionar aditivos** | Essências, corantes, ervas | No traço | Misturar manualmente |
| **9. Verter na forma** | Despejar na forma de silicone | - | Bater forma para eliminar bolhas |
| **10. Isolar** | Cobrir com papel filme e toalha | - | Manter calor |
| **11. Aguardar 24-48h** | Saponificação ocorre | Ambiente | Não mexer |
| **12. Desenformar** | Retirar da forma | - | Com cuidado |
| **13. Cortar** | Em barras | - | Faca afiada |
| **14. Curar** | 4-6 semanas em local arejado | Ambiente | Virar ocasionalmente |

## Técnicas Decorativas no Processo a Frio

| Técnica | Descrição |
|---|---|
| **Swirl** | Movimentos circulares para criar veios |
| **Camadas** | Despejar cores em camadas sucessivas |
| **Embutidos** | Colocar pedaços de sabonete colorido dentro da massa |
| **Topo decorado** | Criar desenhos na superfície antes de endurecer |
| **Com ervas** | Adicionar ervas secas na mistura |

> O processo a frio é a técnica mais sofisticada da saboaria artesanal, resultando em sabonetes premium.`,
        quiz: [
          { pergunta: "Qual o tempo de cura do sabonete feito por processo a frio?", opcoes: ["1-2 dias", "1-2 semanas", "4-6 semanas", "3-6 meses"], respostaCorreta: 2, explicacao: "O sabonete a frio precisa curar por 4 a 6 semanas para completar a saponificação e suavizar o pH." },
          { pergunta: "O que é o 'traço' na saponificação?", opcoes: ["Marca na forma", "Consistência de pudim na mistura", "Tipo de corante", "Marca do sabonete"], respostaCorreta: 1, explicacao: "O 'traço' é o ponto em que a mistura atinge a consistência de pudim, indicando que a saponificação começou." },
        ],
        checklist: ["Dominei as 14 etapas do processo a frio", "Sei identificar o ponto de traço", "Entendo o tempo de cura necessário", "Conheço as técnicas decorativas"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 5 — INGREDIENTES FUNCIONAIS (8h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Ingredientes Funcionais e Terapêuticos",
    descricao: "Aditivos naturais, sabonetes específicos e blends de óleos essenciais",
    icone: "Leaf",
    cor: "from-green-50 to-emerald-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Aditivos Naturais e Sabonetes Específicos",
        descricao: "Aveia, argilas, carvão e fórmulas para necessidades específicas",
        duracaoMinutos: 120,
        conteudo: `# Ingredientes Funcionais e Terapêuticos

## Aditivos Naturais e Seus Benefícios

| Aditivo | Benefício | Indicação |
|---|---|---|
| **Aveia laminada** | Esfoliante suave, calmante | Peles sensíveis |
| **Argila verde** | Absorve oleosidade, purifica | Peles acneicas |
| **Argila rosa** | Calmante, suave | Peles sensíveis |
| **Carvão ativado** | Purifica, desintoxica | Peles oleosas |
| **Leite em pó** | Hidrata, suaviza | Peles secas |
| **Mel** | Antibacteriano, hidrata | Todos os tipos |
| **Própolis** | Cicatrizante, antisséptico | Peles acneicas |
| **Café moído** | Esfoliante, estimulante | Esfoliação corporal |
| **Ervas secas** | Camomila (calmante), alecrim (estimulante) | Conforme necessidade |

## Sabonetes para Necessidades Específicas

| Tipo | Ingredientes | Benefícios |
|---|---|---|
| **Para psoríase** | Aveia, camomila, calêndula, óleo de coco | Calmante, hidratante |
| **Íntimo** | pH balanceado, melaleuca, calêndula | Suave, antisséptico |
| **Para acne** | Argila verde, carvão, melaleuca | Purificante, adstringente |
| **Antisséptico** | Melaleuca, eucalipto, própolis | Antibacteriano |
| **Esfoliante com bucha** | Bucha vegetal, óleos hidratantes | Esfoliação + hidratação |

## Blends de Óleos Essenciais

| Blend | Composição | Efeito |
|---|---|---|
| **Relaxante** | Lavanda + Camomila + Laranja | Calmante, sono |
| **Energizante** | Alecrim + Hortelã + Limão | Disposição |
| **Purificante** | Melaleuca + Eucalipto + Limão | Antisséptico |
| **Afrodisíaco** | Ylang Ylang + Patchouli + Laranja | Sensualidade |
| **Equilíbrio** | Gerânio + Lavanda + Bergamota | Harmonia emocional |

> Ingredientes funcionais transformam um sabonete comum em um produto terapêutico de alto valor.`,
        quiz: [
          { pergunta: "Qual aditivo é indicado para peles oleosas e acneicas?", opcoes: ["Aveia", "Leite em pó", "Argila verde", "Mel"], respostaCorreta: 2, explicacao: "A argila verde absorve oleosidade e purifica, sendo ideal para peles acneicas." },
          { pergunta: "Qual blend é indicado para momentos de meditação e sono?", opcoes: ["Energizante", "Purificante", "Relaxante", "Afrodisíaco"], respostaCorreta: 2, explicacao: "O blend Relaxante (Lavanda + Camomila + Laranja) é ideal para calmante e sono." },
        ],
        checklist: ["Conheço os principais aditivos naturais", "Sei formular sabonetes para necessidades específicas", "Domino os blends de óleos essenciais"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 6 — OUTROS TIPOS DE SABONETES (6h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Outros Tipos de Sabonetes",
    descricao: "Sabonete líquido, com bucha vegetal, em metro e prensado",
    icone: "Shapes",
    cor: "from-cyan-50 to-sky-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Sabonetes Líquidos, Bucha Vegetal e Especiais",
        descricao: "Técnicas para diferentes formatos de sabonetes",
        duracaoMinutos: 180,
        conteudo: `# Outros Tipos de Sabonetes

## 1. Sabonete Líquido

**Ingredientes Básicos:**
- Base glicerinada líquida ou base para sabonete líquido
- Óleos vegetais
- Essências
- Conservante (se for base com água)

**Processo Básico:**
1. Aquecer a base em banho-maria
2. Adicionar óleos vegetais (5-10%)
3. Adicionar essência
4. Adicionar corante
5. Envasar em bombonas ou frascos com pump

## 2. Sabonete Esfoliante com Bucha Vegetal

A bucha vegetal (Luffa cylindrica) é uma fibra natural com propriedades esfoliantes e biodegradáveis.

**Processo:**
1. Higienizar a bucha vegetal
2. Cortar no formato desejado
3. Posicionar na forma de silicone
4. Verter a base de glicerina derretida
5. Aguardar solidificar
6. Desenformar e embalar

> **Resultado de pesquisa:** Em projeto do IFRR, 92% dos participantes aprovaram o sabonete com bucha, 85% destacaram a agradável sensação de esfoliação.

## 3. Sabonete em Metro

Técnica para produzir longas barras cortadas em fatias:
- Utilizar formas retangulares longas
- Despejar a base
- Após sólido, cortar em fatias uniformes
- Cada fatia vende-se como unidade

## 4. Sabonete Prensado

Utiliza massa base que é prensada em moldes:
- Massa preparada separadamente
- Prensada em moldes manuais ou mecânicos
- Aspecto rústico e artesanal

> Diversificar formatos aumenta o portfólio e atende diferentes públicos.`,
        quiz: [
          { pergunta: "Qual o percentual de aprovação do sabonete com bucha vegetal na pesquisa citada?", opcoes: ["78%", "85%", "92%", "100%"], respostaCorreta: 2, explicacao: "92% dos participantes aprovaram o sabonete com bucha vegetal no projeto de pesquisa do IFRR." },
          { pergunta: "Qual tipo de sabonete utiliza formas retangulares longas cortadas em fatias?", opcoes: ["Sabonete líquido", "Sabonete prensado", "Sabonete em metro", "Sabonete com bucha"], respostaCorreta: 2, explicacao: "O sabonete em metro utiliza formas retangulares longas, cortadas em fatias para venda individual." },
        ],
        checklist: ["Sei fazer sabonete líquido", "Dominei a técnica com bucha vegetal", "Entendo sabonete em metro e prensado"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 7 — CORANTES E EFEITOS (6h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Corantes, Pigmentos e Efeitos Visuais",
    descricao: "Tipos de corantes, técnicas de coloração e pigmentos naturais caseiros",
    icone: "Palette",
    cor: "from-pink-50 to-rose-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Coloração e Pigmentos Naturais",
        descricao: "Corantes, técnicas de cor e pigmentos caseiros",
        duracaoMinutos: 180,
        conteudo: `# Corantes, Pigmentos e Efeitos Visuais

## Tipos de Corantes

| Tipo | Características | Técnica |
|---|---|---|
| **Corante líquido** | Fácil dispersão | Adicionar diretamente na base derretida |
| **Corante em pó** | Econômico, alta concentração | Dissolver em pequena quantidade de base |
| **Micas** | Brilho, efeito perolado | Polvilhar na forma ou misturar |
| **Argilas** | Cor natural, propriedades terapêuticas | Misturar na base |
| **Pigmentos naturais** | Urucum, clorofila, cúrcuma | Infusões ou pós |

## Técnicas de Coloração

| Técnica | Descrição | Efeito |
|---|---|---|
| **Cor sólida** | Corante uniforme em toda base | Clássico |
| **Camadas** | Cores alternadas | Listrado |
| **Marmorizado** | Veios de cor | Mármore |
| **Degradê** | Transição suave | Ombré |
| **Salpicos** | Pontos de cor | Pintado |
| **Embutidos** | Pedaços coloridos dentro da base | Confete |

## Pigmentos Naturais Caseiros

| Ingrediente | Cor | Como fazer |
|---|---|---|
| **Cúrcuma** | Amarelo | Adicionar o pó diretamente |
| **Urucum** | Laranja | Infusão em óleo |
| **Espinafre** | Verde | Infusão ou suco |
| **Hibisco** | Rosa | Infusão |
| **Carvão ativado** | Preto | Pó |
| **Cacau** | Marrom | Pó |

> Pigmentos naturais são uma alternativa sustentável e agregam valor ao produto final.`,
        quiz: [
          { pergunta: "Qual pigmento natural produz a cor amarela?", opcoes: ["Urucum", "Cúrcuma", "Hibisco", "Cacau"], respostaCorreta: 1, explicacao: "A cúrcuma produz a cor amarela e pode ser adicionada diretamente em pó." },
          { pergunta: "Qual técnica de coloração cria efeito de mármore?", opcoes: ["Cor sólida", "Camadas", "Marmorizado", "Salpicos"], respostaCorreta: 2, explicacao: "A técnica marmorizada cria veios de cor que imitam o efeito de mármore." },
        ],
        checklist: ["Conheço os 5 tipos de corantes", "Pratiquei técnicas de coloração", "Sei fazer pigmentos naturais caseiros"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 8 — ERROS COMUNS E SOLUÇÕES (4h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Erros Comuns e Soluções (Troubleshooting)",
    descricao: "Diagnóstico de problemas e checklist de qualidade",
    icone: "ShieldCheck",
    cor: "from-red-50 to-orange-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Troubleshooting e Controle de Qualidade",
        descricao: "Problemas comuns, soluções e checklist antes da venda",
        duracaoMinutos: 120,
        conteudo: `# Erros Comuns e Soluções

## Problemas e Soluções

| Problema | Causa Provável | Solução |
|---|---|---|
| **Sabonete suando** | Umidade excessiva ou glicerina higroscópica | Embalar imediatamente, armazenar seco |
| **Bolhas de ar** | Mistura vigorosa, falta de álcool | Borrifar álcool, mexer suavemente |
| **Sabonete quebradiço** | Pouca água ou excesso de soda | Recalcular fórmula |
| **Sabonete mole demais** | Excesso de óleos ou pouca soda | Ajustar fórmula |
| **Manchas brancas (soda)** | Soda não incorporada | Misturar melhor, verificar temperatura |
| **Aroma fraco** | Pouca essência ou temperatura alta | Aumentar quantidade, adicionar na temp. correta |
| **Cor desbotada** | Exposição à luz | Armazenar em local escuro |
| **Não desenforma** | Forma inadequada | Levar ao freezer 10 min |
| **Aceleramento** | Mistura engrossou rápido | Trabalhar mais rápido, reduzir temperatura |
| **Separação** | Óleos separados da base | Misturar melhor, verificar compatibilidade |

## Checklist de Qualidade

| Antes da venda | Verificar |
|---|---|
| ✅ Aparência uniforme | Sem bolhas, manchas ou imperfeições |
| ✅ Aroma agradável | Na intensidade correta |
| ✅ pH adequado | Entre 7 e 9 (teste com fita) |
| ✅ Textura firme | Não quebra facilmente |
| ✅ Embalagem íntegra | Sem danos |
| ✅ Rótulo com informações | Composição, peso, validade |

> O controle de qualidade é essencial para a credibilidade e fidelização dos clientes.`,
        quiz: [
          { pergunta: "O que causa o 'suor' no sabonete de glicerina?", opcoes: ["Excesso de corante", "Umidade excessiva", "Falta de essência", "Temperatura alta"], respostaCorreta: 1, explicacao: "A glicerina é higroscópica (absorve umidade do ar), causando o 'suor'. Embalar imediatamente resolve." },
          { pergunta: "Qual a faixa de pH adequada para sabonetes artesanais?", opcoes: ["4 a 6", "7 a 9", "10 a 12", "1 a 3"], respostaCorreta: 1, explicacao: "O pH adequado para sabonetes artesanais fica entre 7 e 9." },
        ],
        checklist: ["Sei diagnosticar os 10 problemas mais comuns", "Domino o checklist de qualidade", "Faço teste de pH antes de vender"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 9 — EMBALAGEM E APRESENTAÇÃO (6h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Embalagem, Rotulagem e Apresentação",
    descricao: "Tipos de embalagem, rótulos obrigatórios, identidade visual e armazenamento",
    icone: "Gift",
    cor: "from-fuchsia-50 to-pink-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Embalagem, Rótulos e Identidade Visual",
        descricao: "Embalagens, informações obrigatórias e criação de marca",
        duracaoMinutos: 180,
        conteudo: `# Embalagem, Rotulagem e Apresentação

## Tipos de Embalagem

| Tipo | Vantagens | Indicação |
|---|---|---|
| **Filme PVC** | Protege, mantém aroma | Sabonetes individuais |
| **Papel celofane** | Biodegradável, charmoso | Sabonetes rústicos |
| **Caixa de papel kraft** | Sustentável, personalizável | Kits, presentes |
| **Sacos de algodão** | Reutilizável, ecológico | Linha sustentável |
| **Embalagem de vidro** | Sofisticada | Sabonetes líquidos |

## Informações Obrigatórias no Rótulo

| Informação | Por que incluir |
|---|---|
| **Nome do produto** | Identificação |
| **Peso líquido** | Transparência |
| **Lista de ingredientes (INCI)** | Informação ao consumidor |
| **Modo de usar** | Orientações |
| **Validade** | Segurança |
| **Lote** | Rastreabilidade |
| **CNPJ/contato do fabricante** | Relacionamento |

**Exemplo de Lista INCI:** *Glycerin, Sodium Stearate, Sodium Laurate, Aqua, Parfum, Limonene, Linalool, CI 77491*

## Criação de Identidade Visual

| Elemento | Importância |
|---|---|
| **Logotipo** | Identificação da marca |
| **Paleta de cores** | Consistência visual |
| **Tipografia** | Personalidade |
| **Rótulos** | Informação + estética |
| **Embalagens** | Proteção + marketing |

## Armazenamento Adequado

| Condição | Recomendação |
|---|---|
| **Temperatura** | Local fresco (15-25°C) |
| **Umidade** | Ambiente seco |
| **Luz** | Longe da luz direta |
| **Prazo de validade** | Glicerina: 1-2 anos; Processo frio: até 3 anos |

> A embalagem é o primeiro contato visual do cliente com seu produto — invista nela!`,
        quiz: [
          { pergunta: "Qual informação NÃO é obrigatória no rótulo?", opcoes: ["Peso líquido", "Lista de ingredientes INCI", "Preço de custo", "Validade"], respostaCorreta: 2, explicacao: "O preço de custo não é informação obrigatória no rótulo. As demais são exigidas por lei." },
          { pergunta: "Qual a validade média de sabonetes de glicerina?", opcoes: ["6 meses", "1-2 anos", "5 anos", "Indeterminada"], respostaCorreta: 1, explicacao: "Sabonetes de glicerina têm validade média de 1 a 2 anos quando bem armazenados." },
        ],
        checklist: ["Conheço os tipos de embalagem", "Sei as informações obrigatórias do rótulo", "Criei identidade visual para minha marca", "Sei armazenar corretamente"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 10 — EMPREENDEDORISMO (10h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Empreendedorismo e Negócios",
    descricao: "Plano de negócios, precificação, canais de venda e público-alvo",
    icone: "TrendingUp",
    cor: "from-indigo-50 to-blue-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Plano de Negócios e Precificação",
        descricao: "Como estruturar seu negócio e calcular preços",
        duracaoMinutos: 150,
        conteudo: `# Empreendedorismo e Negócios

## Por que Empreender com Sabonetes

| Vantagem | Descrição |
|---|---|
| **Alta demanda** | Produtos naturais em crescimento |
| **Baixo investimento inicial** | Possível começar em casa |
| **Personalização** | Liberdade para criar produtos únicos |
| **Margem de lucro atraente** | Valor agregado pelo apelo natural |
| **Apelo visual** | Produto fotogênico, ideal para redes sociais |
| **Sustentabilidade** | Alinhado com valores atuais |

## Plano de Negócios

| Seção | O que incluir |
|---|---|
| **Análise de mercado** | Concorrência, tendências, oportunidades |
| **Plano de marketing** | Redes sociais, feiras, parcerias |
| **Plano operacional** | Produção, estoque, logística |
| **Plano financeiro** | Investimento, custos, preço de venda |

## Precificação — Exemplo Prático

| Item | Custo |
|---|---|
| Base glicerinada (100g) | R$ 2,50 |
| Óleo essencial | R$ 1,00 |
| Corante | R$ 0,20 |
| Embalagem | R$ 1,00 |
| Mão de obra | R$ 3,00 |
| **Custo total** | **R$ 7,70** |
| **Multiplicador 3** | **R$ 23,10** |
| **Preço sugerido** | **R$ 23,00 - R$ 25,00** |

## Margem de Lucro por Canal

| Canal de Venda | Margem Média |
|---|---|
| Feiras e eventos | 60-80% |
| Redes sociais (direto) | 60-80% |
| Lojas parceiras | 30-40% (repasse) |
| Marketplaces | 40-50% |

> O segredo é equilibrar qualidade, preço justo e margens saudáveis.`,
        quiz: [
          { pergunta: "Qual o multiplicador sugerido para precificação de sabonetes?", opcoes: ["2x", "3x", "5x", "10x"], respostaCorreta: 1, explicacao: "O multiplicador sugerido é 3x o custo total, garantindo margem de lucro saudável." },
          { pergunta: "Qual canal oferece a maior margem de lucro?", opcoes: ["Lojas parceiras", "Marketplaces", "Redes sociais (venda direta)", "Distribuidores"], respostaCorreta: 2, explicacao: "Vendas diretas por redes sociais oferecem margem de 60-80%, a maior entre os canais." },
        ],
        checklist: ["Montei meu plano de negócios", "Calculei a precificação dos meus produtos", "Identifiquei os melhores canais de venda"],
      },
      {
        titulo: "Canais de Venda e Público-Alvo",
        descricao: "Onde vender e para quem vender",
        duracaoMinutos: 120,
        conteudo: `# Canais de Venda e Público-Alvo

## Canais de Venda

| Canal | Estratégia |
|---|---|
| **Instagram** | Vitrine visual, stories, reels |
| **Facebook** | Comunidade, grupos de vendas |
| **WhatsApp Business** | Catálogo, atendimento personalizado |
| **Marketplaces** | Elo7, Shopee |
| **Loja própria** | Site com e-commerce |
| **Feiras e eventos** | Contato direto com cliente |
| **Lojas físicas parceiras** | Pontos de venda |

## Perfil de Público-Alvo

| Perfil | Características | Estratégia |
|---|---|---|
| **Iniciantes** | Querem aprender do zero | Cursos, kits para iniciantes |
| **Pessoas criativas** | Buscam personalização | Linhas exclusivas |
| **Empreendedores** | Querem negócio lucrativo | Consultoria, atacado |
| **Artesãos** | Querem aprimorar técnicas | Workshops avançados |
| **Profissionais de bem-estar** | Querem oferecer produtos | Parcerias |

> Conhecer seu público-alvo é o primeiro passo para vender mais e melhor.`,
        quiz: [
          { pergunta: "Qual marketplace é mais indicado para artesanato no Brasil?", opcoes: ["Amazon", "Elo7", "Mercado Livre", "OLX"], respostaCorreta: 1, explicacao: "O Elo7 é o marketplace brasileiro especializado em produtos artesanais e criativos." },
        ],
        checklist: ["Defini meus canais de venda prioritários", "Identifiquei meu público-alvo principal", "Criei perfis nas plataformas escolhidas"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 11 — MARKETING DIGITAL (8h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Marketing Digital para Saboaria",
    descricao: "Presença online, conteúdo que vende, SEO e criação de coleção",
    icone: "Megaphone",
    cor: "from-orange-50 to-amber-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Marketing Digital e Conteúdo",
        descricao: "Presença online, conteúdo estratégico e SEO",
        duracaoMinutos: 150,
        conteudo: `# Marketing Digital para Saboaria

## Presença Online

| Plataforma | Estratégia | Frequência |
|---|---|---|
| **Instagram** | Fotos atrativas, reels do processo, stories | Diário |
| **Pinterest** | Inspiração, tráfego para loja | Semanal |
| **TikTok** | Vídeos curtos do processo criativo | 3-5x semana |
| **WhatsApp** | Relacionamento, catálogo, ofertas | Diário |

## Conteúdo que Vende

| Tipo | Exemplo | Objetivo |
|---|---|---|
| **Educativo** | "Benefícios de cada óleo essencial" | Autoridade |
| **Processo criativo** | Bastidores da produção | Humanização |
| **Lançamentos** | Novas fragrâncias, coleções | Engajamento |
| **Promocional** | Kits, combos | Conversão |
| **Depoimentos** | Clientes satisfeitos | Prova social |

## SEO para Produtos Artesanais

| Técnica | Descrição |
|---|---|
| **Palavras-chave** | "Sabonete artesanal natural", "sabonete vegano" |
| **Descrições ricas** | Benefícios, ingredientes, modo de usar |
| **Fotos de qualidade** | Imagens atrativas e bem iluminadas |
| **Avaliações** | Incentivar clientes a avaliar |

## Criação da Primeira Coleção

| Etapa | Ação |
|---|---|
| 1 | Definir tema (ex: "Flores", "Frutas", "Aromaterapia") |
| 2 | Escolher 3-5 fragrâncias harmoniosas |
| 3 | Definir cores e formatos coerentes |
| 4 | Criar nomes atrativos |
| 5 | Desenvolver embalagem unificada |
| 6 | Fotografar em conjunto |
| 7 | Lançar com oferta de combo |

> O marketing digital é o canal mais eficaz e acessível para vender sabonetes artesanais.`,
        quiz: [
          { pergunta: "Qual plataforma é mais indicada para vídeos curtos do processo criativo?", opcoes: ["Facebook", "Pinterest", "TikTok", "LinkedIn"], respostaCorreta: 2, explicacao: "O TikTok é a plataforma ideal para vídeos curtos mostrando o processo criativo." },
          { pergunta: "Quantas fragrâncias são recomendadas para a primeira coleção?", opcoes: ["1-2", "3-5", "8-10", "15+"], respostaCorreta: 1, explicacao: "Recomenda-se 3-5 fragrâncias harmoniosas para a primeira coleção, mantendo coerência." },
        ],
        checklist: ["Criei presença nas plataformas digitais", "Tenho calendário de conteúdo", "Apliquei técnicas de SEO", "Planejei minha primeira coleção"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 12 — GESTÃO FINANCEIRA E LEGAL (6h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Gestão Financeira e Legal",
    descricao: "Controle de custos, fluxo de caixa e aspectos legais (MEI, ANVISA)",
    icone: "Calculator",
    cor: "from-slate-50 to-gray-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Finanças e Aspectos Legais",
        descricao: "Controle de custos, fluxo de caixa, MEI e ANVISA",
        duracaoMinutos: 180,
        conteudo: `# Gestão Financeira e Legal

## Controle de Custos

| Item | Como Controlar |
|---|---|
| **Matérias-primas** | Planilha com entrada/saída, validade |
| **Embalagens** | Compra em quantidade, controle de estoque |
| **Mão de obra** | Calcular horas trabalhadas |
| **Custos fixos** | Ratear por produção (luz, água) |

## Planilha de Orçamento

| Mês | Previsto | Realizado | Diferença |
|---|---|---|---|
| Receita total | R$ ___ | R$ ___ | R$ ___ |
| (-) Custos variáveis | R$ ___ | R$ ___ | R$ ___ |
| (-) Custos fixos | R$ ___ | R$ ___ | R$ ___ |
| **Lucro líquido** | **R$ ___** | **R$ ___** | **R$ ___** |

## Fluxo de Caixa Simples

| Data | Descrição | Entrada | Saída | Saldo |
|---|---|---|---|---|
| 01/03 | Compra bases | - | R$ 150 | R$ 350 |
| 05/03 | Venda feira | R$ 400 | - | R$ 750 |
| 10/03 | Embalagens | - | R$ 80 | R$ 670 |

## Aspectos Legais

| Aspecto | O que fazer |
|---|---|
| **MEI** | Formalizar como Microempreendedor Individual |
| **ANVISA** | Cosméticos artesanais são Grau 1 (baixo risco) |
| **Notificação** | Produtos de Grau 1 precisam ser notificados |
| **Rotulagem** | Seguir normas da ANVISA |
| **Alvará** | Verificar exigências da prefeitura |

> A formalização é essencial para credibilidade, segurança jurídica e acesso a benefícios.`,
        quiz: [
          { pergunta: "Qual a classificação ANVISA para cosméticos artesanais?", opcoes: ["Grau 1 (baixo risco)", "Grau 2 (médio risco)", "Grau 3 (alto risco)", "Não regulamentado"], respostaCorreta: 0, explicacao: "Cosméticos artesanais são classificados como Grau 1 (baixo risco) pela ANVISA." },
          { pergunta: "O que é MEI?", opcoes: ["Micro Empresa Industrial", "Microempreendedor Individual", "Modelo Empresarial Integrado", "Marketing Estratégico Integrado"], respostaCorreta: 1, explicacao: "MEI significa Microempreendedor Individual, forma de formalização ideal para pequenos produtores." },
        ],
        checklist: ["Tenho planilha de controle de custos", "Mantenho fluxo de caixa atualizado", "Conheço os aspectos legais (MEI, ANVISA)", "Estou regularizado ou em processo"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 13 — BÔNUS E EXPANSÃO (4h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Bônus e Expansão",
    descricao: "Diversificação de produtos, bônus exclusivos e certificação",
    icone: "Award",
    cor: "from-amber-50 to-yellow-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Diversificação e Bônus Exclusivos",
        descricao: "Expansão do portfólio, recursos extras e certificado",
        duracaoMinutos: 120,
        conteudo: `# Bônus e Expansão

## Diversificação de Produtos

| Produto | Descrição |
|---|---|
| **Sabonetes líquidos** | Para pump, versão prática |
| **Esfoliantes corporais** | Com açúcar, sal, café |
| **Bombas de banho** | Efervescentes, aromáticas |
| **Sais de banho** | Relaxamento |
| **Velas aromáticas** | Complemento à linha |
| **Hidratantes artesanais** | Loções e cremes |

## Bônus Exclusivos

| Bônus | Descrição |
|---|---|
| **Grupo VIP de alunas** | Comunidade exclusiva para troca de experiências |
| **Lista de fornecedores verificados** | Qualidade garantida |
| **Planilha de custos** | Controle financeiro facilitado |
| **Modelos de rótulos editáveis** | Identidade visual profissional |
| **Ebook de receitas avançadas** | Novas criações |

## 🏆 Certificado de Conclusão

Ao finalizar o curso, o aluno recebe certificado de conclusão, comprovando as habilidades adquiridas e podendo utilizar como diferencial profissional.

**O que o certificado comprova:**
- Domínio de técnicas Melt & Pour e Cold Process
- Conhecimento em ingredientes funcionais e terapêuticos
- Capacidade de empreender no mercado de saboaria
- Formação completa de 99 horas

> Parabéns por concluir o Curso de Saboaria Artesanal! 🎉`,
        quiz: [
          { pergunta: "Qual produto pode complementar uma linha de sabonetes artesanais?", opcoes: ["Roupas", "Bombas de banho", "Móveis", "Eletrônicos"], respostaCorreta: 1, explicacao: "Bombas de banho são produtos complementares perfeitos para uma linha de saboaria artesanal." },
        ],
        checklist: ["Explorei opções de diversificação", "Acessei os bônus exclusivos", "Concluí todas as aulas e quizzes"],
      },
    ],
  },
];
