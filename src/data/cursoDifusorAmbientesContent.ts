import type { CursoModuloData } from "@/components/curso/CursoShell";

export const cursoDifusorAmbientesData: CursoModuloData[] = [
  // ─── MÓDULO 1: FUNDAÇÃO ───
  {
    titulo: "Fundação — O Universo dos Difusores Naturais",
    descricao: "Conceitos, história, tipos de difusores e mercado",
    icone: "Lightbulb",
    cor: "from-emerald-500/10 to-teal-500/10",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "O que é um Difusor de Ambientes Natural",
        descricao: "Definição, benefícios e comparação com aromatizantes industriais",
        duracaoMinutos: 120,
        conteudo: `# O que é um Difusor de Ambientes Natural

Um difusor de ambientes natural é um dispositivo ou preparação que dispersa **óleos essenciais puros** no ar, proporcionando aromaterapia, purificação do ambiente e bem-estar. Diferente dos aromatizantes industriais, os difusores naturais utilizam apenas ingredientes botânicos, sem químicos sintéticos ou fixadores artificiais.

## Difusor Natural vs. Aromatizante Industrial

| Aspecto | Difusor Natural | Aromatizante Industrial |
|:---|:---|:---|
| **Ingredientes** | Óleos essenciais puros, base vegetal | Fragrâncias sintéticas, solventes químicos |
| **Propriedades** | Terapêuticas, aromaterápicas | Apenas odorizantes |
| **Segurança** | Não tóxico, biodegradável | Pode conter alergênicos, poluentes |
| **Benefícios** | Relaxamento, foco, purificação do ar | Apenas mascarar odores |
| **Sustentabilidade** | Alta (ingredientes renováveis) | Baixa (derivados de petróleo) |

## Benefícios da Aromatização Natural

| Benefício | Descrição |
|:---|:---|
| **Aromaterapia contínua** | Benefícios terapêuticos 24h por dia |
| **Purificação do ar** | Óleos essenciais com propriedades antissépticas |
| **Bem-estar emocional** | Aromas influenciam humor e emoções |
| **Ambiente acolhedor** | Atmosfera personalizada para cada espaço |
| **Repelente natural** | Alguns óleos afastam insetos ecologicamente |
| **Produto artesanal** | Valor agregado para presentes e decoração |`,
        quiz: [
          {
            pergunta: "Qual a principal diferença entre um difusor natural e um aromatizante industrial?",
            opcoes: ["O preço é mais alto", "Usa óleos essenciais puros em vez de fragrâncias sintéticas", "É mais forte", "Dura menos tempo"],
            respostaCorreta: 1,
            explicacao: "Difusores naturais utilizam óleos essenciais puros e bases vegetais, enquanto aromatizantes industriais usam fragrâncias sintéticas e solventes químicos."
          },
          {
            pergunta: "Qual benefício NÃO é proporcionado por difusores naturais?",
            opcoes: ["Purificação do ar", "Aromaterapia contínua", "Mascarar odores com químicos", "Bem-estar emocional"],
            respostaCorreta: 2,
            explicacao: "Mascarar odores com químicos é característica dos aromatizantes industriais. Difusores naturais purificam o ar com propriedades antissépticas dos óleos essenciais."
          }
        ]
      },
      {
        titulo: "História da Aromatização de Ambientes",
        descricao: "Da antiguidade aos métodos modernos de aromatização",
        duracaoMinutos: 120,
        conteudo: `# História da Aromatização de Ambientes

| Período | Civilização | Prática |
|:---|:---|:---|
| **3000 a.C.** | Egípcios | Queima de resinas (olíbano, mirra) em rituais religiosos |
| **2000 a.C.** | Indianos | Incensos nos Vedas e práticas ayurvédicas |
| **1000 a.C.** | Chineses | Uso de ervas aromáticas para purificação |
| **Grécia Antiga** | Gregos | Queima de plantas para fins medicinais |
| **Idade Média** | Europeus | Ervas aromáticas para afastar pragas e doenças |
| **Século XX** | Global | Desenvolvimento de difusores elétricos e ultrassônicos |
| **Século XXI** | Global | Resgate dos métodos naturais e artesanais |

A história da aromatização é tão antiga quanto a própria civilização. Os egípcios já utilizavam resinas aromáticas há mais de 5.000 anos, e hoje vivemos um resgate desses métodos naturais, aliando tradição e ciência.`
      },
      {
        titulo: "Tipos de Difusores Naturais",
        descricao: "Varetas, ultrassônico, spray, gel, sachets e mais",
        duracaoMinutos: 120,
        conteudo: `# Tipos de Difusores Naturais

| Tipo | Descrição | Vantagens | Indicação |
|:---|:---|:---|:---|
| **Difusor de varetas** | Óleo aromático em frasco com varetas de fibra | Dispersão contínua, sem energia, decorativo | Ambientes pequenos, decoração |
| **Difusor ultrassônico** | Aparelho elétrico que vaporiza água com óleos | Dispersão rápida, umidifica o ar | Ambientes médios, uso diário |
| **Difusor de calor** | Aquecimento suave do óleo essencial | Silencioso, sem água | Ambientes pequenos |
| **Spray de ambiente** | Solução em álcool ou água para borrifar | Prático, efeito imediato | Refrescar ambientes rapidamente |
| **Gel aromático** | Gel que libera aroma gradualmente | Durável, sem manutenção | Banheiros, armários |
| **Sachets** | Tecido com ervas e óleos | Natural, decorativo | Gavetas, closets |
| **Lâmpada de aromas** | Anel de cerâmica sobre lâmpada | Simples, econômico | Ambientes pequenos |

Cada tipo de difusor tem suas particularidades e indicações. A escolha depende do ambiente, da preferência pessoal e do objetivo desejado.`,
        quiz: [
          {
            pergunta: "Qual tipo de difusor é mais indicado para iniciantes e decoração?",
            opcoes: ["Ultrassônico", "Difusor de varetas", "Spray de ambiente", "Lâmpada de aromas"],
            respostaCorreta: 1,
            explicacao: "O difusor de varetas é decorativo, não requer energia elétrica e proporciona dispersão contínua, sendo ideal para iniciantes."
          }
        ]
      },
      {
        titulo: "O Mercado de Aromatizantes Naturais",
        descricao: "Tendências, perfil do consumidor e oportunidades",
        duracaoMinutos: 120,
        conteudo: `# O Mercado de Aromatizantes Naturais no Brasil

## Tendências de Mercado

| Tendência | Oportunidade |
|:---|:---|
| Busca por bem-estar em casa | Consumidores investindo em ambientes saudáveis |
| Valorização do natural | Preferência por produtos sem químicos |
| Home office | Necessidade de ambientes produtivos e agradáveis |
| Presentes personalizados | Demanda por itens artesanais e exclusivos |
| Sustentabilidade | Consumidores conscientes buscam marcas com propósito |

## Perfil do Consumidor

| Perfil | Características | Estratégia |
|:---|:---|:---|
| **Mulheres 25-55 anos** | Cuidam do lar, buscam bem-estar | Linhas para cada cômodo da casa |
| **Profissionais home office** | Precisam de foco e produtividade | Blends para concentração |
| **Pessoas com alergias** | Sensibilidade a químicos | Produtos hipoalergênicos, naturais |
| **Presentes** | Buscam produtos diferenciados | Kits com embalagem especial |
| **Terapeutas holísticos** | Usam em consultórios | Linha profissional |`
      }
    ]
  },
  // ─── MÓDULO 2: AROMATERAPIA APLICADA ───
  {
    titulo: "Aromaterapia Aplicada a Ambientes",
    descricao: "Efeitos dos aromas, perfis de óleos e blends",
    icone: "Heart",
    cor: "from-pink-500/10 to-rose-500/10",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Princípios da Aromaterapia Ambiental",
        descricao: "Efeitos dos aromas e aplicações por ambiente",
        duracaoMinutos: 180,
        conteudo: `# Princípios da Aromaterapia Ambiental

## Efeitos dos Aromas no Ambiente

| Efeito | Descrição | Aplicação |
|:---|:---|:---|
| **Relaxante** | Reduz estresse, ansiedade, promove calma | Quartos, salas de estar, spas |
| **Energizante** | Estimula, aumenta disposição e foco | Home office, áreas de estudo |
| **Purificante** | Elimina bactérias, fungos, renova o ar | Banheiros, cozinhas |
| **Aconchegante** | Cria atmosfera acolhedora | Salas de estar, entradas |
| **Afrodisíaco** | Estimula sensualidade e romance | Quartos, momentos especiais |
| **Meditativo** | Auxilia na concentração e espiritualidade | Espaços de meditação, yoga |

## Aromas por Ambiente

| Ambiente | Objetivo | Aromas Recomendados |
|:---|:---|:---|
| **Quarto** | Relaxamento, sono | Lavanda, Camomila, Sândalo, Ylang Ylang |
| **Home office** | Foco, produtividade | Alecrim, Hortelã, Limão, Eucalipto |
| **Sala de estar** | Aconchego | Laranja, Canela, Cedro, Baunilha |
| **Cozinha** | Neutralizar odores | Limão, Hortelã, Capim-limão |
| **Banheiro** | Purificação, frescor | Eucalipto, Tea Tree, Lavanda |
| **Entrada** | Boas-vindas | Bergamota, Laranja, Alecrim |`,
        quiz: [
          {
            pergunta: "Qual aroma é mais indicado para um home office?",
            opcoes: ["Lavanda", "Ylang Ylang", "Alecrim", "Sândalo"],
            respostaCorreta: 2,
            explicacao: "O alecrim é um estimulante mental que auxilia no foco, concentração e memória — ideal para ambientes de trabalho."
          }
        ]
      },
      {
        titulo: "Perfil dos Óleos Essenciais para Difusores",
        descricao: "Famílias olfativas e 15+ óleos detalhados",
        duracaoMinutos: 180,
        conteudo: `# Perfil dos Óleos Essenciais para Difusores

## Famílias Olfativas

| Família | Características | Exemplos |
|:---|:---|:---|
| **Cítrica** | Fresca, alegre, energizante | Laranja, Limão, Bergamota, Toranja |
| **Floral** | Delicada, romântica, calmante | Lavanda, Jasmim, Rosa, Ylang Ylang |
| **Amadeirada** | Aconchegante, sofisticada | Cedro, Sândalo, Pinho, Vetiver |
| **Ervas** | Revigorante, purificante | Alecrim, Hortelã, Eucalipto, Manjericão |
| **Especiadas** | Aconchegante, estimulante | Canela, Cravo, Noz-moscada, Gengibre |
| **Resinosas** | Meditativa, espiritual | Olíbano, Mirra, Benjoim, Copaíba |

## Óleos Essenciais Detalhados

| Óleo | Nome Científico | Propriedades | Nota |
|:---|:---|:---|:---|
| **Lavanda** | *Lavandula angustifolia* | Calmante, relaxante, equilibrante | Coração |
| **Laranja Doce** | *Citrus sinensis* | Energizante, calmante, alegre | Saída |
| **Limão** | *Citrus limon* | Purificante, energizante | Saída |
| **Bergamota** | *Citrus bergamia* | Ansiolítico, equilibrante | Saída/Coração |
| **Alecrim** | *Rosmarinus officinalis* | Estimulante mental, foco | Coração |
| **Hortelã** | *Mentha piperita* | Revigorante, clareza mental | Saída |
| **Eucalipto** | *Eucalyptus globulus* | Descongestionante, purificante | Saída |
| **Tea Tree** | *Melaleuca alternifolia* | Purificante, antisséptico | Saída |
| **Cedro** | *Cedrus atlantica* | Calmante, grounding | Fundo |
| **Sândalo** | *Santalum album* | Meditativo, relaxante | Fundo |
| **Olíbano** | *Boswellia carterii* | Meditativo, espiritual | Fundo |
| **Canela** | *Cinnamomum zeylanicum* | Estimulante, aconchegante | Coração/Fundo |
| **Ylang Ylang** | *Cananga odorata* | Relaxante, afrodisíaco | Coração |
| **Capim-limão** | *Cymbopogon flexuosus* | Revigorante, repelente | Saída |
| **Citronela** | *Cymbopogon nardus* | Repelente de insetos | Saída |`
      },
      {
        titulo: "Blends Aromáticos para Ambientes",
        descricao: "Receitas de blends por intenção e como criar os seus",
        duracaoMinutos: 180,
        conteudo: `# Blends Aromáticos para Ambientes

## Blends por Intenção

| Blend | Composição | Proporção | Efeito |
|:---|:---|:---|:---|
| **Relaxamento Profundo** | Lavanda + Sândalo + Manjerona | 5:3:2 | Calma, sono, tranquilidade |
| **Energia Matinal** | Laranja + Hortelã + Alecrim | 4:3:3 | Disposição, foco, alegria |
| **Foco e Produtividade** | Alecrim + Limão + Hortelã | 4:4:2 | Concentração, clareza mental |
| **Purificação do Ar** | Eucalipto + Tea Tree + Limão | 4:3:3 | Antisséptico, ar renovado |
| **Aconchego** | Laranja + Canela + Cedro | 5:2:3 | Aconchegante, acolhedor |
| **Primavera** | Bergamota + Lavanda + Gerânio | 4:3:3 | Equilíbrio, frescor floral |
| **Inverno** | Laranja + Canela + Cravo | 5:3:2 | Aconchegante, festivo |
| **Meditação** | Olíbano + Cedro + Lavanda | 4:3:3 | Espiritualidade, paz interior |
| **Romântico** | Ylang Ylang + Rosa + Sândalo | 3:2:5 | Sensualidade, romance |
| **Repelente Natural** | Citronela + Capim-limão + Eucalipto | 5:3:2 | Afasta insetos |

## Como Criar seus Próprios Blends

| Passo | Descrição |
|:---|:---|
| **1. Defina a intenção** | Qual efeito deseja? Relaxar, energizar, purificar? |
| **2. Nota de fundo** | Base do blend (amadeirados, resinosos) — 20-30% |
| **3. Notas de coração** | Alma do blend (florais, ervas) — 40-50% |
| **4. Notas de saída** | Primeira impressão (cítricos) — 20-30% |
| **5. Teste** | Misture em pequena quantidade e sinta a evolução |
| **6. Ajuste** | Modifique proporções até alcançar o equilíbrio |`,
        quiz: [
          {
            pergunta: "Qual a proporção ideal de notas de coração em um blend?",
            opcoes: ["10-20%", "20-30%", "40-50%", "60-70%"],
            respostaCorreta: 2,
            explicacao: "As notas de coração são a 'alma' do blend e devem compor 40-50% da composição total."
          },
          {
            pergunta: "Qual blend é indicado para repelir insetos?",
            opcoes: ["Relaxamento Profundo", "Aconchego", "Repelente Natural com Citronela", "Meditação"],
            respostaCorreta: 2,
            explicacao: "O blend Repelente Natural combina Citronela, Capim-limão e Eucalipto, todos com propriedades repelentes comprovadas."
          }
        ]
      }
    ]
  },
  // ─── MÓDULO 3: INGREDIENTES E MATÉRIAS-PRIMAS ───
  {
    titulo: "Ingredientes e Matérias-Primas",
    descricao: "Bases, varetas, embalagens e frascos",
    icone: "Package",
    cor: "from-amber-500/10 to-yellow-500/10",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Bases para Difusores",
        descricao: "Álcool, DPG, óleos vegetais e bases mistas",
        duracaoMinutos: 160,
        conteudo: `# Bases para Difusores

## Tipos de Bases Líquidas

| Base | Características | Vantagens | Desvantagens |
|:---|:---|:---|:---|
| **Álcool de cereais** | Evapora rapidamente, boa difusão | Aroma puro, evaporação rápida | Pode ser agressivo |
| **Álcool de uva** | Suave, levemente frutado | Mais suave que cereais | Menos comum |
| **Óleo vegetal leve** | Semente de uva, jojoba fracionada | Fixa aroma, hidrata | Só sobe por capilaridade |
| **DPG natural** | Propilenoglicol vegetal | Estabiliza aroma, evaporação controlada | Menos natural |
| **Água destilada** | Sem cheiro, barata | Econômica | Não dissolve óleos, precisa de solubilizante |

## Bases para Difusor de Varetas

| Tipo | Composição | Características | Duração |
|:---|:---|:---|:---|
| **Base alcoólica** | Álcool + óleos essenciais | Evaporação rápida, aroma intenso | 2-4 semanas |
| **Base oleosa** | Óleo vegetal leve + óleos essenciais | Evaporação lenta, aroma suave | 4-8 semanas |
| **Base mista** | Álcool + óleo + DPG | Equilíbrio entre difusão e duração | 4-6 semanas |`
      },
      {
        titulo: "Varetas e Acessórios",
        descricao: "Tipos de varetas, quantidades e materiais",
        duracaoMinutos: 160,
        conteudo: `# Varetas para Difusor

| Tipo de Vareta | Material | Características | Indicação |
|:---|:---|:---|:---|
| **Varetas de rattan** | Fibra natural porosa | Capilaridade excelente, durável | Mais comum, melhor absorção |
| **Varetas de madeira** | Bambu, madeira natural | Estética natural, absorção média | Linha rústica, sustentável |
| **Varetas de fibra** | Fibras sintéticas | Absorção controlada, reutilizáveis | Profissional, alta performance |
| **Varetas coloridas** | Rattan tingido | Decorativas, combinam com ambiente | Presentes, decoração |

## Quantidade de Varetas

- **Ambiente pequeno:** 3-5 varetas
- **Ambiente médio:** 5-7 varetas
- **Ambiente grande:** 7-10 varetas

## Embalagens e Frascos

| Tipo | Material | Vantagens | Indicação |
|:---|:---|:---|:---|
| **Âmbar** | Vidro | Protege óleos da luz, sofisticado | Premium, presentes |
| **Cobalto** | Vidro | Protege da luz, visual elegante | Linha premium |
| **Transparente** | Vidro | Mostra a cor do líquido | Quando cor é atrativo |
| **Alumínio** | Metal | Leve, prático, vintage | Viagem, kits |
| **Cerâmica** | Cerâmica | Artesanal, exclusivo | Linha luxo |`,
        quiz: [
          {
            pergunta: "Qual tipo de vareta tem a melhor capilaridade?",
            opcoes: ["Madeira de bambu", "Rattan", "Fibra sintética", "Varetas coloridas"],
            respostaCorreta: 1,
            explicacao: "As varetas de rattan possuem fibra natural porosa com excelente capilaridade, sendo as mais utilizadas em difusores profissionais."
          }
        ]
      }
    ]
  },
  // ─── MÓDULO 4: TÉCNICAS DE FORMULAÇÃO ───
  {
    titulo: "Técnicas de Formulação",
    descricao: "Difusor de varetas, spray, gel e ultrassônico",
    icone: "Target",
    cor: "from-blue-500/10 to-indigo-500/10",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Difusor de Varetas (Reed Diffuser)",
        descricao: "Fórmula básica, proporções e passo a passo completo",
        duracaoMinutos: 240,
        conteudo: `# Difusor de Varetas (Reed Diffuser)

## Fórmula Básica

| Componente | Porcentagem | Para 100ml |
|:---|:---|:---|
| **Base (álcool + óleo + DPG)** | 85-95% | 85-95ml |
| **Óleos essenciais** | 5-15% | 5-15ml |

## Proporções por Tipo de Base

| Tipo | Composição | Características |
|:---|:---|:---|
| **Secagem rápida** | 80% álcool + 20% OE | Aroma intenso, dura menos |
| **Equilibrada** | 50% álcool + 30% DPG + 20% OE | Boa difusão, duração média |
| **Longa duração** | 30% álcool + 50% DPG + 20% OE | Aroma suave, dura mais |

## Passo a Passo

| Etapa | Descrição | Dicas |
|:---|:---|:---|
| **1. Preparar a base** | Misturar álcool, DPG e/ou óleo vegetal | Usar proporção desejada |
| **2. Adicionar óleos essenciais** | Incorporar o blend de óleos | Misturar suavemente |
| **3. Homogeneizar** | Agitar levemente | Não criar bolhas |
| **4. Envasar** | Transferir para o frasco | Deixar espaço no topo |
| **5. Inserir varetas** | Colocar as varetas no frasco | 5-7 varetas para 100ml |
| **6. Aguardar** | 24-48h para saturar as varetas | Virar as varetas uma vez |
| **7. Uso** | Posicionar no ambiente | Virar varetas semanalmente |

## Cálculo de Rendimento

| Volume | Duração | Área atendida |
|:---|:---|:---|
| 50ml | 1-2 meses | Pequeno (banheiro, escritório) |
| 100ml | 2-4 meses | Médio (quarto, sala pequena) |
| 200ml | 4-6 meses | Grande (sala, ambiente comercial) |`,
        quiz: [
          {
            pergunta: "Qual a porcentagem ideal de óleos essenciais em um difusor de varetas?",
            opcoes: ["1-3%", "5-15%", "25-30%", "50%"],
            respostaCorreta: 1,
            explicacao: "A fórmula básica utiliza 5-15% de óleos essenciais, garantindo aroma agradável sem desperdício."
          }
        ],
        checklist: [
          "Preparei a base (álcool + DPG/óleo)",
          "Adicionei os óleos essenciais na proporção correta",
          "Homogeneizei sem criar bolhas",
          "Envasei no frasco adequado",
          "Inseri as varetas e aguardei saturação"
        ]
      },
      {
        titulo: "Spray de Ambiente Natural",
        descricao: "Fórmulas alcoólicas e aquosas com passo a passo",
        duracaoMinutos: 210,
        conteudo: `# Spray de Ambiente Natural

## Fórmula Alcoólica

| Componente | Porcentagem | Para 100ml |
|:---|:---|:---|
| **Álcool de cereais** | 80-90% | 80-90ml |
| **Água destilada** | 5-10% | 5-10ml |
| **Óleos essenciais** | 5-10% | 5-10ml |

**Passo a Passo:**
1. Misturar óleos essenciais no álcool
2. Adicionar água destilada
3. Agitar bem
4. Envasar em frasco spray
5. Agitar antes de cada uso

## Fórmula Aquosa (com solubilizante)

| Componente | Porcentagem | Para 100ml |
|:---|:---|:---|
| **Água destilada** | 85-90% | 85-90ml |
| **Solubilizante** | 5-10% | 5-10ml |
| **Óleos essenciais** | 3-5% | 3-5ml |

**Passo a Passo:**
1. Misturar óleos essenciais no solubilizante
2. Adicionar água aos poucos, mexendo
3. Transferir para frasco spray
4. Agitar antes de cada uso`,
        checklist: [
          "Preparei fórmula alcoólica de spray",
          "Preparei fórmula aquosa de spray",
          "Testei aroma e intensidade",
          "Envasei em frasco spray adequado"
        ]
      },
      {
        titulo: "Difusor em Gel e Ultrassônico",
        descricao: "Técnicas de gel aromático e blends para aparelhos",
        duracaoMinutos: 210,
        conteudo: `# Difusor em Gel

## Fórmula com Gelatina

| Ingrediente | Quantidade | Função |
|:---|:---|:---|
| **Água destilada** | 200ml | Base líquida |
| **Gelatina incolor** | 1 pacote (12g) | Agente gelificante |
| **Glicerina vegetal** | 2 colheres sopa | Retenção de aroma |
| **Solubilizante** | 1 colher chá | Dissolver óleos na água |
| **Óleos essenciais** | 20-30 gotas | Aroma |
| **Corante** | A gosto | Cor |

**Passo a Passo:**
1. Dissolver a gelatina em 50ml de água fria
2. Aquecer 150ml de água até ferver
3. Adicionar água quente à gelatina, mexer até dissolver
4. Adicionar glicerina
5. Misturar óleos essenciais ao solubilizante
6. Incorporar à mistura
7. Adicionar corante
8. Despejar em recipientes
9. Aguardar 4-6h para solidificar

---

# Difusor Ultrassônico - Blends

## Cuidados Específicos

| Cuidado | Por que é importante |
|:---|:---|
| **Não usar óleos viscosos** | Podem danificar o aparelho |
| **Respeitar capacidade** | Geralmente 100-300ml |
| **Dosagem correta** | 3-5 gotas por 100ml de água |
| **Limpeza regular** | Evita acúmulo de resíduos |

## Blends para Difusor Ultrassônico

| Blend | Gotas (para 100ml) |
|:---|:---|
| **Relaxamento** | Lavanda 3 + Sândalo 2 |
| **Foco** | Alecrim 3 + Limão 2 |
| **Purificação** | Eucalipto 2 + Tea Tree 2 + Limão 1 |
| **Sono** | Lavanda 3 + Camomila 2 |
| **Energia** | Laranja 3 + Hortelã 2 |`,
        quiz: [
          {
            pergunta: "Quantas gotas de óleo essencial por 100ml de água é recomendado para difusor ultrassônico?",
            opcoes: ["1 gota", "3-5 gotas", "10-15 gotas", "20+ gotas"],
            respostaCorreta: 1,
            explicacao: "A dosagem recomendada é de 3-5 gotas por 100ml de água para evitar concentração excessiva e danos ao aparelho."
          }
        ],
        checklist: [
          "Preparei um difusor em gel",
          "Testei blends no difusor ultrassônico",
          "Verifiquei a dosagem correta de gotas"
        ]
      }
    ]
  },
  // ─── MÓDULO 5: SEGURANÇA E BOAS PRÁTICAS ───
  {
    titulo: "Segurança e Boas Práticas",
    descricao: "Manipulação segura, precauções e armazenamento",
    icone: "BookOpen",
    cor: "from-red-500/10 to-orange-500/10",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Segurança na Manipulação e Armazenamento",
        descricao: "Cuidados essenciais, precauções com óleos e conservação",
        duracaoMinutos: 360,
        conteudo: `# Segurança e Boas Práticas

## Segurança na Manipulação

| Cuidado | Recomendação |
|:---|:---|
| **Ventilação** | Trabalhar em local arejado |
| **Contato com a pele** | Evitar contato de óleos puros com a pele |
| **Ingestão** | Produtos são apenas para uso ambiental |
| **Crianças e pets** | Manter fora do alcance |
| **Álcool** | Produtos alcoólicos são inflamáveis |

## Precauções com Óleos Essenciais

| Óleo | Precaução |
|:---|:---|
| **Cítricos** | Fotossensibilidade (não aplicar na pele) |
| **Canela, Cravo, Orégano** | Irritantes para mucosas, usar baixas concentrações |
| **Hortelã, Eucalipto** | Evitar em crianças pequenas |
| **Óleos ricos em fenóis** | Diluir bem, usar com moderação |

## Armazenamento

| Fator | Recomendação |
|:---|:---|
| **Luz** | Frascos âmbar ou cobalto, longe da luz direta |
| **Temperatura** | Local fresco (15-25°C) |
| **Validade** | 6-12 meses (depende da base) |
| **Rótulo** | Identificar com data de fabricação e composição |`,
        quiz: [
          {
            pergunta: "Qual cuidado é essencial ao trabalhar com difusores à base de álcool?",
            opcoes: ["Usar luvas de algodão", "Trabalhar perto de fonte de calor", "Lembrar que são inflamáveis e trabalhar em local ventilado", "Adicionar água para diluir"],
            respostaCorreta: 2,
            explicacao: "Produtos à base de álcool são inflamáveis, por isso devem ser manipulados em local ventilado e longe de fontes de calor."
          }
        ],
        checklist: [
          "Local de trabalho tem boa ventilação",
          "Óleos essenciais armazenados corretamente",
          "Frascos identificados com data e composição",
          "Produtos fora do alcance de crianças e pets"
        ]
      }
    ]
  },
  // ─── MÓDULO 6: CONTROLE DE QUALIDADE ───
  {
    titulo: "Controle de Qualidade e Testes",
    descricao: "Testes de difusão, duração e estabilidade",
    icone: "BarChart3",
    cor: "from-cyan-500/10 to-sky-500/10",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Testes de Qualidade e Checklist",
        descricao: "Avaliação de difusão, duração, estabilidade e cor",
        duracaoMinutos: 360,
        conteudo: `# Controle de Qualidade e Testes

## Testes de Qualidade

| Teste | O que avaliar | Como fazer |
|:---|:---|:---|
| **Teste de difusão** | Intensidade do aroma no ambiente | Posicionar em ambiente fechado, avaliar após 1h |
| **Teste de duração** | Quanto tempo o aroma permanece | Medir dias até o líquido acabar |
| **Teste de estabilidade** | Se a base se mantém homogênea | Observar por 30 dias |
| **Teste de cor** | Se a cor se mantém estável | Comparar com amostra recente |

## Checklist de Qualidade

| Antes da venda | Verificar |
|:---|:---|
| ✅ Aroma agradável e equilibrado | Teste olfativo |
| ✅ Cor estável | Sem desbotamento |
| ✅ Varetas absorvendo corretamente | Teste de capilaridade |
| ✅ Embalagem íntegra | Sem vazamentos |
| ✅ Rótulo com informações completas | Composição, validade |
| ✅ Prazo de validade adequado | 6-12 meses |`,
        checklist: [
          "Realizei teste de difusão (1h em ambiente fechado)",
          "Realizei teste de estabilidade (30 dias)",
          "Verifiquei capilaridade das varetas",
          "Embalagem íntegra e sem vazamentos",
          "Rótulo com todas as informações obrigatórias"
        ]
      }
    ]
  },
  // ─── MÓDULO 7: EMBALAGEM E ROTULAGEM ───
  {
    titulo: "Embalagem, Rotulagem e Apresentação",
    descricao: "Tipos de embalagens, informações obrigatórias e identidade visual",
    icone: "Package",
    cor: "from-violet-500/10 to-purple-500/10",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Embalagens e Rotulagem Profissional",
        descricao: "Embalagens, informações obrigatórias e rótulos",
        duracaoMinutos: 360,
        conteudo: `# Embalagem, Rotulagem e Apresentação

## Embalagens para Difusores

| Tipo | Características | Indicação |
|:---|:---|:---|
| **Frasco de vidro com tampa** | Sofisticado, reciclável | Linha premium, presentes |
| **Frasco com rolha** | Rústico, charmoso | Linha artesanal |
| **Caixa de papel kraft** | Sustentável, personalizável | Kits, embalagem para presente |
| **Saco de algodão** | Reutilizável, ecológico | Acompanhamento |

## Informações Obrigatórias no Rótulo

| Informação | Por que incluir |
|:---|:---|
| **Nome do produto** | Identificação |
| **Conteúdo líquido** | Transparência |
| **Composição** | Lista de ingredientes |
| **Modo de usar** | Instruções para o consumidor |
| **Validade** | Segurança |
| **Lote** | Rastreabilidade |
| **Contato do fabricante** | Relacionamento |`,
        checklist: [
          "Escolhi tipo de embalagem adequado à linha",
          "Rótulo contém todas as informações obrigatórias",
          "Identidade visual consistente",
          "Embalagem protege adequadamente o produto"
        ]
      }
    ]
  },
  // ─── MÓDULO 8: CERTIFICAÇÕES PROFISSIONAIS ───
  {
    titulo: "Certificações e Formação Profissional",
    descricao: "KDCA, NAHA, ICAD e valor da certificação",
    icone: "GraduationCap",
    cor: "from-yellow-500/10 to-amber-500/10",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Certificações Internacionais",
        descricao: "KDCA Korea, NAHA, ICAD e seus benefícios",
        duracaoMinutos: 360,
        conteudo: `# Certificações e Formação Profissional

## Certificações Internacionais

| Certificação | Instituição | Descrição |
|:---|:---|:---|
| **KDCA Essential Oil Diffuser Aromatherapy** | Korea Design Craft Association | Curso coreano de difusores e sprays, com certificação para ensino |
| **NAHA** | National Association for Holistic Aromatherapy | Certificação em aromaterapia holística |
| **ICAD** | International Center for Aroma Design | Perfumaria avançada |

## Curso KDCA - Detalhes

| Aspecto | Descrição |
|:---|:---|
| **Conteúdo** | Aprofundamento em aromaterapia, eficácia dos óleos essenciais |
| **Óleos estudados** | 15 básicos + 45 adicionais (incluindo Rosa Damascena, Palo Santo) |
| **Produção prática** | 1 difusor + 2 sprays |
| **Duração** | 4 horas |
| **Certificação** | Certificado coreano, permite abrir turmas e certificar alunos |

## Valor da Certificação

| Benefício | Descrição |
|:---|:---|
| **Credibilidade** | Reconhecimento internacional |
| **Diferenciação** | Destaque no mercado |
| **Autoridade** | Permite ensinar e certificar |
| **Networking** | Acesso a comunidade profissional |`,
        quiz: [
          {
            pergunta: "O que a certificação KDCA permite ao profissional?",
            opcoes: ["Apenas produzir difusores", "Abrir turmas e certificar alunos", "Vender no exterior", "Importar óleos essenciais"],
            respostaCorreta: 1,
            explicacao: "A certificação KDCA é reconhecida internacionalmente e permite ao profissional abrir turmas e certificar alunos na área de difusores e aromaterapia."
          }
        ]
      }
    ]
  },
  // ─── MÓDULO 9: EMPREENDEDORISMO ───
  {
    titulo: "Empreendedorismo e Negócios",
    descricao: "Precificação, canais de venda e linhas de produtos",
    icone: "MessageCircle",
    cor: "from-green-500/10 to-emerald-500/10",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Empreendendo com Difusores Naturais",
        descricao: "Vantagens do mercado e precificação prática",
        duracaoMinutos: 150,
        conteudo: `# Empreendendo com Difusores Naturais

## Vantagens do Mercado

| Vantagem | Descrição |
|:---|:---|
| **Alta demanda** | Mercado de bem-estar em crescimento |
| **Baixo investimento** | Possível começar em casa |
| **Margem atraente** | Valor agregado pelo apelo natural |
| **Versatilidade** | Múltiplas linhas e nichos |
| **Fidelização** | Clientes recorrentes (produto acaba) |
| **Apelo visual** | Produto fotogênico para redes sociais |

## Precificação — Difusor 100ml

| Item | Custo |
|:---|:---|
| Base (álcool + DPG) | R$ 4,00 |
| Óleos essenciais (15ml) | R$ 8,00 |
| Frasco de vidro | R$ 3,50 |
| Varetas (5 unidades) | R$ 1,50 |
| Rótulo/embalagem | R$ 1,00 |
| Mão de obra | R$ 5,00 |
| **Custo total** | **R$ 23,00** |
| **Multiplicador 3** | **R$ 69,00** |
| **Preço sugerido** | **R$ 65,00 - R$ 75,00** |

## Precificação — Spray 100ml

| Item | Custo |
|:---|:---|
| Álcool | R$ 2,00 |
| Óleos essenciais (5ml) | R$ 2,50 |
| Frasco spray | R$ 2,00 |
| Rótulo | R$ 0,50 |
| Mão de obra | R$ 2,00 |
| **Custo total** | **R$ 9,00** |
| **Multiplicador 3** | **R$ 27,00** |
| **Preço sugerido** | **R$ 25,00 - R$ 30,00** |`
      },
      {
        titulo: "Canais de Venda e Linhas de Produtos",
        descricao: "Estratégias de venda e diversificação",
        duracaoMinutos: 150,
        conteudo: `# Canais de Venda

| Canal | Estratégia |
|:---|:---|
| **Instagram** | Vitrine visual, stories do processo, reels |
| **Facebook** | Comunidade, grupos de vendas |
| **WhatsApp Business** | Catálogo, atendimento personalizado |
| **Marketplaces** | Elo7, Shopee |
| **Feiras e eventos** | Contato direto com cliente |
| **Lojas físicas parceiras** | Pontos de venda |
| **Presentes corporativos** | Kits personalizados para empresas |

## Linhas de Produtos

| Linha | Descrição | Produtos |
|:---|:---|:---|
| **Básica** | Entrada, preço acessível | Sprays, difusores pequenos |
| **Premium** | Alta qualidade, embalagem sofisticada | Difusores luxo, blends exclusivos |
| **Sazonal** | Edições limitadas | Natal, primavera, inverno |
| **Terapêutica** | Foco em benefícios | Blends para ansiedade, foco, sono |
| **Repelente** | Funcional | Sprays e difusores repelentes |
| **Presentes** | Kits prontos | Combinações com velas, sabonetes |`,
        quiz: [
          {
            pergunta: "Qual multiplicador é recomendado para precificação de difusores artesanais?",
            opcoes: ["1,5x o custo", "2x o custo", "3x o custo", "5x o custo"],
            respostaCorreta: 2,
            explicacao: "O multiplicador 3x é o padrão para produtos artesanais, cobrindo custos de produção, marketing e lucro."
          }
        ]
      }
    ]
  },
  // ─── MÓDULO 10: MARKETING DIGITAL ───
  {
    titulo: "Marketing Digital para Difusores",
    descricao: "Presença online, conteúdo e lançamento de coleção",
    icone: "BarChart3",
    cor: "from-fuchsia-500/10 to-pink-500/10",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Marketing Digital e Primeira Coleção",
        descricao: "Presença online, conteúdo que vende e lançamento",
        duracaoMinutos: 480,
        conteudo: `# Marketing Digital para Difusores

## Presença Online

| Plataforma | Estratégia | Frequência |
|:---|:---|:---|
| **Instagram** | Fotos atrativas, reels do processo | Diário |
| **Pinterest** | Inspiração, tráfego para loja | Semanal |
| **TikTok** | Vídeos curtos do processo criativo | 3-5x semana |
| **WhatsApp** | Relacionamento, catálogo, ofertas | Diário |

## Conteúdo que Vende

| Tipo de Conteúdo | Exemplo | Objetivo |
|:---|:---|:---|
| **Educativo** | "Aromas para cada ambiente da casa" | Autoridade |
| **Processo criativo** | Bastidores da produção | Humanização |
| **Blends exclusivos** | "Criei um blend especial para..." | Engajamento |
| **Promocional** | Kits, combos | Conversão |
| **Depoimentos** | Clientes satisfeitos | Prova social |

## Criação da Primeira Coleção

| Etapa | Ação |
|:---|:---|
| 1 | Definir tema (ex: "Cômodos da Casa", "Estações do Ano") |
| 2 | Escolher 3-5 blends harmoniosos |
| 3 | Definir embalagens coerentes |
| 4 | Criar nomes atrativos para cada aroma |
| 5 | Fotografar em conjunto |
| 6 | Lançar com oferta de combo |`,
        checklist: [
          "Criei perfil no Instagram com identidade visual",
          "Planejei calendário de conteúdo semanal",
          "Defini tema da primeira coleção",
          "Escolhi 3-5 blends harmoniosos",
          "Fotografei produtos profissionalmente"
        ]
      }
    ]
  },
  // ─── MÓDULO 11: GESTÃO FINANCEIRA E LEGAL ───
  {
    titulo: "Gestão Financeira e Legal",
    descricao: "Custos, fluxo de caixa, MEI e ANVISA",
    icone: "BarChart3",
    cor: "from-slate-500/10 to-gray-500/10",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Finanças e Aspectos Legais",
        descricao: "Controle de custos, fluxo de caixa, MEI e ANVISA",
        duracaoMinutos: 360,
        conteudo: `# Gestão Financeira e Legal

## Controle de Custos

| Item | Como Controlar |
|:---|:---|
| **Matérias-primas** | Planilha com entrada/saída, validade |
| **Embalagens** | Compra em quantidade, controle de estoque |
| **Mão de obra** | Calcular horas trabalhadas |
| **Custos fixos** | Ratear por produção (luz, água) |

## Fluxo de Caixa Simples

| Data | Descrição | Entrada | Saída | Saldo |
|:---|:---|:---|:---|:---|
| 01/03 | Compra bases e frascos | - | R$ 200 | R$ 300 |
| 05/03 | Venda feira | R$ 450 | - | R$ 750 |
| 10/03 | Embalagens | - | R$ 80 | R$ 670 |

## Aspectos Legais

| Aspecto | O que fazer |
|:---|:---|
| **MEI** | Formalizar como Microempreendedor Individual |
| **ANVISA** | Produtos de aroma para ambiente são classe 1 (baixo risco) |
| **Rotulagem** | Seguir normas de identificação |
| **Alvará** | Verificar exigências da prefeitura |`,
        checklist: [
          "Criei planilha de controle de custos",
          "Configurei fluxo de caixa mensal",
          "Verifiquei requisitos para MEI",
          "Pesquisei normas ANVISA aplicáveis"
        ]
      }
    ]
  },
  // ─── MÓDULO 12: DIVERSIFICAÇÃO E EXPANSÃO ───
  {
    titulo: "Diversificação e Expansão",
    descricao: "Novos produtos e parcerias estratégicas",
    icone: "Target",
    cor: "from-orange-500/10 to-red-500/10",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Novos Produtos e Parcerias",
        descricao: "Diversificação da linha e parcerias estratégicas",
        duracaoMinutos: 240,
        conteudo: `# Diversificação e Expansão

## Novos Produtos

| Produto | Descrição |
|:---|:---|
| **Velas aromáticas** | Complemento à linha |
| **Sachês perfumados** | Para gavetas e armários |
| **Aromatizadores para carro** | Linha automotiva |
| **Óleos de massagem** | Linha corporal |
| **Kits presentes** | Combinações com outros itens |

## Parcerias Estratégicas

| Parceiro | Abordagem |
|:---|:---|
| **Spas e clínicas** | Fornecer aromatização para salas de atendimento |
| **Lojas de decoração** | Vender em consignação ou parceria |
| **Hotéis** | Aromatização de lobby e quartos |
| **Eventos** | Brindes personalizados |
| **Profissionais de bem-estar** | Yoga, meditação, massagem |`
      }
    ]
  },
  // ─── MÓDULO 13: BÔNUS EXCLUSIVOS ───
  {
    titulo: "Bônus Exclusivos",
    descricao: "Grupo VIP, fornecedores, ebook e certificado",
    icone: "GraduationCap",
    cor: "from-primary/10 to-accent/10",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Bônus e Certificado de Conclusão",
        descricao: "Recursos exclusivos e certificação profissional",
        duracaoMinutos: 120,
        conteudo: `# Bônus Exclusivos

## Bônus Incluídos

| Bônus | Descrição |
|:---|:---|
| **Grupo VIP de alunas** | Comunidade exclusiva para troca de experiências |
| **Lista de fornecedores verificados** | Qualidade garantida |
| **Planilha de custos** | Controle financeiro facilitado |
| **Ebook de receitas de blends** | Novas criações aromáticas |
| **Modelos de rótulos editáveis** | Identidade visual profissional |

## Certificado de Conclusão

Ao finalizar o curso, o aluno recebe **certificado de conclusão**, comprovando as habilidades adquiridas em:

- Criação de difusores de varetas profissionais
- Formulação de sprays de ambiente
- Produção de difusores em gel
- Blends aromáticos terapêuticos
- Empreendedorismo no mercado de aromatização

Este certificado pode ser utilizado como **diferencial profissional** para atuar no mercado de bem-estar e aromaterapia.`
      }
    ]
  }
];
