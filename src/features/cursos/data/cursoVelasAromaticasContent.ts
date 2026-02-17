import { type ModuloContent } from "@/features/cursos/data/cursoVendasContent";

export const cursoVelasAromaticasData: ModuloContent[] = [
  // ═══════════════════════════════════════════════════════════
  // MÓDULO 1 — FUNDAÇÃO (8h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Fundação — O Universo das Velas",
    descricao: "O que são velas aromáticas, benefícios, história, tipos de ceras, pavios e segurança",
    icone: "Lightbulb",
    cor: "from-amber-50 to-orange-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "O que são Velas Aromáticas",
        descricao: "Definição, benefícios e comparação com incensos",
        duracaoMinutos: 120,
        conteudo: `# O que são Velas Aromáticas

## Definição

Velas aromáticas são velas enriquecidas com óleos essenciais ou fragrâncias, proporcionando, ao serem acesas, um aroma agradável e terapêutico ao ambiente. Ao longo da história, elas têm sido usadas tanto para propósitos rituais quanto para criar um ambiente acolhedor em casa.

## Benefícios das Velas Aromáticas

| Benefício | Descrição |
|---|---|
| **Aromaterapia** | Promovem bem-estar, relaxamento, concentração ou energia |
| **Ambiente acolhedor** | Criam atmosfera aconchegante e sofisticada |
| **Decoração** | Elemento decorativo que complementa a estética do ambiente |
| **Presente personalizado** | Opção de presente artesanal e significativo |
| **Redução do estresse** | Aromas específicos ajudam a diminuir a ansiedade |

## Velas Aromáticas vs. Incensos

| Aspecto | Velas Aromáticas | Incensos |
|---|---|---|
| **Intensidade do aroma** | Suave e gradual | Mais intensa e imediata |
| **Duração** | Mais longa (queima lenta) | Mais curta |
| **Fumaça** | Mínima (dependendo da cera) | Visível e característica |
| **Elemento decorativo** | Alto valor estético | Funcional |
| **Segurança** | Chama controlada em recipiente | Brasa exposta |

> As velas aromáticas combinam estética, funcionalidade e bem-estar em um único produto artesanal.`,
        quiz: [
          { pergunta: "Qual a principal diferença entre velas aromáticas e incensos?", opcoes: ["Incensos são mais caros", "Velas têm aroma suave e gradual, incensos são mais intensos", "Não há diferença", "Velas produzem mais fumaça"], respostaCorreta: 1, explicacao: "Velas aromáticas liberam aroma de forma suave e gradual, enquanto incensos são mais intensos e imediatos." },
          { pergunta: "Qual destes NÃO é um benefício das velas aromáticas?", opcoes: ["Aromaterapia", "Decoração", "Aquecimento do ambiente", "Redução do estresse"], respostaCorreta: 2, explicacao: "Velas aromáticas não são usadas para aquecimento — seus benefícios são aromaterapia, decoração e bem-estar." },
        ],
        checklist: ["Pesquisei os diferentes usos de velas aromáticas", "Entendi as diferenças entre velas e incensos", "Identifiquei os benefícios terapêuticos das velas"],
      },
      {
        titulo: "História das Velas",
        descricao: "Da antiguidade aos dias atuais",
        duracaoMinutos: 60,
        conteudo: `# História das Velas

## Linha do Tempo

| Período | Civilização | Material | Finalidade |
|---|---|---|---|
| **Antiguidade** | Egípcios | Juncos embebidos em gordura | Iluminação |
| **Antiguidade** | Romanos | Papiro embebido em sebo | Iluminação |
| **Antiguidade** | Chineses | Papel de arroz com cera de inseto | Iluminação e rituais |
| **Antiguidade** | Indianos | Cera de frutas fervidas | Rituais religiosos |
| **Contemporaneidade** | Global | Diversas ceras e fragrâncias | Decoração e bem-estar |

> Curiosidade: A palavra "vela" vem do latim candela, que deu origem também a "candelabro".`,
        quiz: [
          { pergunta: "Qual civilização utilizava juncos embebidos em gordura como velas?", opcoes: ["Romanos", "Chineses", "Egípcios", "Indianos"], respostaCorreta: 2, explicacao: "Os egípcios foram pioneiros no uso de juncos embebidos em gordura animal como forma primitiva de iluminação." },
        ],
      },
      {
        titulo: "Tipos de Ceras",
        descricao: "Parafina, soja, abelha, coco e palma — propriedades e indicações",
        duracaoMinutos: 120,
        conteudo: `# Tipos de Ceras para Velas Aromáticas

## Comparativo Completo

| Tipo de Cera | Origem | Características | Temp. de Fusão | Indicação |
|---|---|---|---|---|
| **Parafina** | Mineral (petróleo) | Boa fixação de aroma, acabamento liso, mais barata | 50-60°C | Iniciantes, velas decorativas |
| **Cera de Soja** | Vegetal (soja) | Sustentável, queima limpa, biodegradável | 45-55°C | Velas ecológicas, aromaterapia |
| **Cera de Abelha** | Animal | Aroma natural de mel, queima longa, tom dourado | 62-65°C | Velas premium, terapêuticas |
| **Cera de Coco** | Vegetal (coco) | Queima muito limpa, excelente fixação de aroma | 40-50°C | Velas de luxo, massagem |
| **Cera de Palma** | Vegetal (palma) | Sustentável (certificada), textura cristalina | 55-60°C | Velas decorativas |

## Comparativo de Sustentabilidade

| Tipo de Cera | Biodegradável | Renovável | Vegana |
|---|---|---|---|
| Parafina | Não | Não | Sim |
| Cera de Soja | Sim | Sim | Sim |
| Cera de Abelha | Sim | Sim | Não |
| Cera de Coco | Sim | Sim | Sim |
| Cera de Palma | Sim | Sim | Sim |

> Para velas ecológicas e terapêuticas, prefira ceras vegetais como soja ou coco.`,
        quiz: [
          { pergunta: "Qual cera tem a menor temperatura de fusão?", opcoes: ["Parafina", "Cera de Soja", "Cera de Coco", "Cera de Abelha"], respostaCorreta: 2, explicacao: "A cera de coco tem ponto de fusão entre 40-50°C, o mais baixo entre as ceras listadas." },
          { pergunta: "Qual cera NÃO é vegana?", opcoes: ["Parafina", "Cera de Soja", "Cera de Abelha", "Cera de Coco"], respostaCorreta: 2, explicacao: "A cera de abelha é de origem animal, portanto não é vegana." },
        ],
        checklist: ["Conheço as 5 principais ceras para velas", "Sei identificar qual cera é mais indicada para cada tipo de vela", "Entendi as diferenças de sustentabilidade entre as ceras"],
      },
      {
        titulo: "Pavios e Segurança",
        descricao: "Tipos de pavios, escolha ideal e EPI para fabricação segura",
        duracaoMinutos: 90,
        conteudo: `# Pavios e Segurança na Fabricação

## Tipos de Pavios

| Tipo de Pavio | Material | Características | Indicação |
|---|---|---|---|
| **Pavio de Algodão** | Algodão trançado | Queima limpa, sem fumaça | Velas de soja e parafina |
| **Pavio de Madeira** | Madeira fina | Estala como lareira, visual diferenciado | Velas decorativas, presentes |
| **Pavio de Papel** | Papel tratado | Queima uniforme, sustentável | Velas ecológicas |
| **Pavio Revestido** | Algodão com cera | Acendimento fácil, queima estável | Todos os tipos |

## Como Escolher o Pavio Ideal

| Fator | Influência |
|---|---|
| **Diâmetro da vela** | Quanto maior o diâmetro, maior o pavio necessário |
| **Tipo de cera** | Cada cera exige um tipo específico de pavio |
| **Fragrância** | Óleos essenciais podem alterar a queima |
| **Corante** | Corantes podem afetar a combustão |

## Equipamentos de Proteção Individual (EPI)

| Item | Função |
|---|---|
| **Luvas térmicas** | Proteger contra queimaduras |
| **Óculos de segurança** | Evitar respingos nos olhos |
| **Avental** | Proteger a roupa e a pele |
| **Máscara** | Evitar inalação de vapores |

## Cuidados Essenciais

- **Nunca deixar cera derretendo sem supervisão** — risco de incêndio
- **Manter crianças e animais afastados** — queimaduras graves
- **Trabalhar em local ventilado** — evitar acúmulo de vapores
- **Usar termômetro para controlar temperatura** — evitar superaquecimento
- **Extintor de incêndio por perto** — segurança em caso de acidente

> ⚠️ Segurança é prioridade absoluta na fabricação de velas!`,
        quiz: [
          { pergunta: "Qual pavio produz um estalo semelhante a uma lareira?", opcoes: ["Pavio de Algodão", "Pavio de Madeira", "Pavio de Papel", "Pavio Revestido"], respostaCorreta: 1, explicacao: "O pavio de madeira crepita durante a queima, criando um som semelhante ao de uma lareira." },
          { pergunta: "Qual EPI protege contra queimaduras ao manusear cera quente?", opcoes: ["Máscara", "Óculos", "Luvas térmicas", "Avental"], respostaCorreta: 2, explicacao: "Luvas térmicas são o EPI específico para proteger as mãos contra queimaduras ao manusear cera quente." },
        ],
        checklist: ["Conheço os 4 tipos de pavios", "Sei como escolher o pavio ideal para cada vela", "Tenho todos os EPIs necessários", "Memorizei os cuidados essenciais de segurança"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 2 — MATERIAIS E PREPARAÇÃO (6h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Materiais e Preparação",
    descricao: "Lista de materiais, ferramentas, organização do espaço e cálculos",
    icone: "Package",
    cor: "from-yellow-50 to-amber-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Materiais e Ferramentas Essenciais",
        descricao: "Lista completa de tudo que você precisa para começar",
        duracaoMinutos: 90,
        conteudo: `# Materiais e Ferramentas Essenciais

## Materiais Necessários

| Categoria | Itens |
|---|---|
| **Ceras** | Soja, parafina, abelha, coco, palma |
| **Pavios** | Algodão, madeira, papel, revestidos |
| **Recipientes** | Vidro, cerâmica, alumínio, latas |
| **Fragrâncias** | Óleos essenciais, óleos de perfumaria |
| **Corantes** | Líquidos, em pó, micas, pigmentos |
| **Acessórios** | Etiquetas, rótulos, caixas para embalagem |

## Ferramentas Essenciais

| Ferramenta | Função |
|---|---|
| **Panelas para banho-maria** | Derreter cera de forma segura |
| **Termômetro culinário** | Controlar temperatura exata |
| **Balança de precisão** | Medir quantidades exatas |
| **Jarra de vidro com bico** | Despejar cera com precisão |
| **Suporte para pavio** | Manter pavio centralizado |
| **Espátulas e colheres** | Mexer e homogeneizar |
| **Secador / pistola de calor** | Corrigir imperfeições |

> Investir em boas ferramentas desde o início garante qualidade e segurança na produção.`,
        quiz: [
          { pergunta: "Qual ferramenta é essencial para controlar a temperatura da cera?", opcoes: ["Balança", "Termômetro culinário", "Espátula", "Secador"], respostaCorreta: 1, explicacao: "O termômetro culinário é indispensável para medir a temperatura exata da cera em cada etapa." },
        ],
        checklist: ["Tenho lista de materiais necessários", "Adquiri as ferramentas essenciais", "Organizei meu espaço de trabalho"],
      },
      {
        titulo: "Organização e Cálculo de Quantidades",
        descricao: "Como organizar o ateliê e calcular cera e fragrância",
        duracaoMinutos: 90,
        conteudo: `# Organização e Cálculo de Quantidades

## Organização do Local de Trabalho

O ateliê ideal deve ter 4 áreas distintas:
- **Área de Derretimento** — fogão / banho-maria
- **Área de Mistura** — bancada para adicionar fragrâncias e corantes
- **Área de Moldagem** — bancada para despejar nos recipientes
- **Área de Resfriamento** — estante para cura das velas

## Cálculo de Quantidades

**Fórmula Básica:** Volume do recipiente (ml) × 0,9 = peso da cera (g)

**Exemplo:** Para um pote de 200ml: 200ml × 0,9 = 180g de cera

## Cálculo de Fragrância

| Tipo de Cera | % Máxima Recomendada | Para 180g de cera |
|---|---|---|
| Parafina | 6-8% | 10,8g - 14,4g |
| Cera de Soja | 6-10% | 10,8g - 18g |
| Cera de Abelha | 3-5% | 5,4g - 9g |
| Cera de Coco | 8-12% | 14,4g - 21,6g |

## Planilha de Cálculo Prática

| Item | Quantidade | Unidade |
|---|---|---|
| Volume do recipiente | 200 | ml |
| Fator de correção | 0,9 | - |
| **Peso da cera** | **180** | g |
| % de fragrância desejada | 8 | % |
| **Peso da fragrância** | **14,4** | g |

> Sempre anote suas receitas para garantir reprodutibilidade!`,
        quiz: [
          { pergunta: "Para um recipiente de 200ml, qual o peso aproximado de cera necessário?", opcoes: ["200g", "180g", "160g", "220g"], respostaCorreta: 1, explicacao: "Usando a fórmula: 200ml × 0,9 = 180g de cera." },
          { pergunta: "Qual cera suporta a maior porcentagem de fragrância?", opcoes: ["Parafina (6-8%)", "Cera de Soja (6-10%)", "Cera de Abelha (3-5%)", "Cera de Coco (8-12%)"], respostaCorreta: 3, explicacao: "A cera de coco suporta até 12% de fragrância, a maior entre todas as ceras." },
        ],
        checklist: ["Organizei meu ateliê em 4 áreas distintas", "Sei calcular a quantidade de cera pelo volume do recipiente", "Domino o cálculo de porcentagem de fragrância", "Tenho uma planilha de receitas"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 3 — AROMAS E AROMATERAPIA (10h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Aromas e Aromaterapia",
    descricao: "Propriedades terapêuticas, óleos essenciais vs. fragrâncias e blends",
    icone: "Heart",
    cor: "from-rose-50 to-pink-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Aromaterapia Aplicada às Velas",
        descricao: "Principais aromas e suas propriedades terapêuticas",
        duracaoMinutos: 120,
        conteudo: `# Aromaterapia Aplicada às Velas

A aromaterapia utiliza os aromas dos óleos essenciais para promover equilíbrio físico e emocional. Nas velas, esses benefícios são liberados gradualmente durante a queima.

## Principais Aromas e suas Propriedades

| Aroma | Família Olfativa | Propriedade Terapêutica | Ocasião |
|---|---|---|---|
| **Lavanda** | Floral | Relaxante, calmante, indutor do sono | Noite, meditação |
| **Eucalipto** | Herbal | Descongestionante, purificante | Banheiro, dias de gripe |
| **Laranja Doce** | Cítrica | Energizante, alegre, antiestresse | Manhã, cozinha |
| **Canela** | Especiaria | Aquecedor, estimulante | Inverno, Natal |
| **Baunilha** | Gourmand | Aconchegante, calmante | Quarto, momentos íntimos |
| **Alecrim** | Herbal | Estimulante mental, foco | Home office, estudo |
| **Sândalo** | Amadeirada | Meditação, espiritualidade | Yoga, relaxamento |
| **Hortelã-pimenta** | Herbal | Revigorante, clareza mental | Manhã, estudo |
| **Jasmim** | Floral | Afrodisíaco, autoconfiança | Momentos românticos |
| **Bergamota** | Cítrica | Ansiolítico, equilíbrio emocional | Dia a dia |

> A escolha do aroma deve considerar o público-alvo e a ocasião de uso da vela.`,
        quiz: [
          { pergunta: "Qual aroma é mais indicado para relaxamento e sono?", opcoes: ["Alecrim", "Lavanda", "Hortelã-pimenta", "Canela"], respostaCorreta: 1, explicacao: "A lavanda é reconhecida por suas propriedades relaxantes e indutoras do sono." },
          { pergunta: "A bergamota pertence a qual família olfativa?", opcoes: ["Floral", "Herbal", "Cítrica", "Amadeirada"], respostaCorreta: 2, explicacao: "A bergamota pertence à família cítrica, com propriedades ansiolíticas." },
        ],
      },
      {
        titulo: "Óleos Essenciais vs. Fragrâncias Sintéticas",
        descricao: "Diferenças, vantagens e quando usar cada tipo",
        duracaoMinutos: 90,
        conteudo: `# Óleos Essenciais vs. Fragrâncias Sintéticas

## Comparativo

| Aspecto | Óleos Essenciais | Fragrâncias Sintéticas |
|---|---|---|
| **Origem** | 100% natural (plantas) | Laboratório |
| **Propriedades terapêuticas** | Presentes | Ausentes |
| **Intensidade do aroma** | Suave, complexo | Forte, consistente |
| **Custo** | Mais alto | Mais baixo |
| **Estabilidade na cera** | Menor (pode evaporar) | Maior |
| **Indicação** | Velas terapêuticas, premium | Velas decorativas, econômicas |

## Quando Usar Cada Tipo

- **Óleos Essenciais:** Linha premium, velas terapêuticas, público que busca naturalidade
- **Fragrâncias Sintéticas:** Linha acessível, velas decorativas, produção em escala
- **Mix:** Combinar ambos para equilíbrio entre qualidade e custo

> Para aromaterapia verdadeira, use apenas óleos essenciais puros.`,
        quiz: [
          { pergunta: "Qual tipo de fragrância tem propriedades terapêuticas reais?", opcoes: ["Fragrâncias sintéticas", "Óleos essenciais", "Ambas", "Nenhuma"], respostaCorreta: 1, explicacao: "Apenas óleos essenciais possuem propriedades terapêuticas reais, pois são extraídos de plantas." },
        ],
      },
      {
        titulo: "Blends e Teste de Aromas",
        descricao: "Combinações terapêuticas e como testar a difusão",
        duracaoMinutos: 120,
        conteudo: `# Blends e Teste de Aromas

## Combinações Aromáticas (Blends)

| Blend | Composição | Efeito |
|---|---|---|
| **Relaxamento Profundo** | Lavanda + Camomila + Sândalo | Sono, tranquilidade |
| **Energia Matinal** | Laranja + Hortelã + Alecrim | Disposição, foco |
| **Primavera** | Lavanda + Ylang Ylang + Bergamota | Equilíbrio emocional |
| **Inverno Aconchegante** | Canela + Laranja + Cravo | Aconchego, aquecer |
| **Limpeza e Purificação** | Eucalipto + Limão + Tea Tree | Purificação do ar |
| **Romântico** | Jasmim + Rosa + Baunilha | Sensualidade, amor |

## Como Testar a Difusão do Aroma

| Método | Descrição |
|---|---|
| **Teste a frio** | Cheirar a cera já misturada, antes de derramar |
| **Teste a quente** | Sentir o aroma durante a queima |
| **Teste de cura** | Avaliar após 48h, 7 dias e 14 dias (o aroma evolui) |

## Problemas Comuns e Soluções

| Problema | Causa | Solução |
|---|---|---|
| **Aroma fraco** | % baixa de fragrância | Aumentar porcentagem |
| **Aroma queimado** | Temperatura muito alta ao adicionar | Adicionar fragrância na temperatura correta |
| **Aroma alterado** | Incompatibilidade cera/fragrância | Testar outro fornecedor |
| **Aroma evapora rápido** | Fragrância volátil demais | Usar fixadores naturais |

> A arte de criar blends exclusivos é o que diferencia sua marca no mercado!`,
        quiz: [
          { pergunta: "Qual blend é indicado para energia e disposição matinal?", opcoes: ["Lavanda + Camomila + Sândalo", "Laranja + Hortelã + Alecrim", "Canela + Laranja + Cravo", "Jasmim + Rosa + Baunilha"], respostaCorreta: 1, explicacao: "O blend Energia Matinal (Laranja + Hortelã + Alecrim) combina aromas estimulantes." },
          { pergunta: "Após quanto tempo de cura se deve reavaliar o aroma?", opcoes: ["Apenas após 24h", "48h, 7 dias e 14 dias", "Somente após 1 mês", "Não é necessário testar"], respostaCorreta: 1, explicacao: "O aroma evolui com o tempo, devendo ser avaliado em 48h, 7 dias e 14 dias." },
        ],
        checklist: ["Conheço os 10 principais aromas terapêuticos", "Sei a diferença entre óleos essenciais e fragrâncias sintéticas", "Criei pelo menos 3 blends exclusivos", "Fiz testes de difusão a frio, quente e cura"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 4 — TÉCNICAS DE FABRICAÇÃO (15h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Técnicas de Fabricação",
    descricao: "Do processo básico às técnicas avançadas de camadas, chantilly e massagem",
    icone: "Target",
    cor: "from-orange-50 to-red-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Processo Básico de Fabricação",
        descricao: "Passo a passo da vela aromática simples",
        duracaoMinutos: 150,
        conteudo: `# Processo Básico de Fabricação

## Passo a Passo

| Etapa | Descrição | Temperatura | Dicas |
|---|---|---|---|
| **1. Preparar recipiente** | Limpar, fixar o pavio no centro | Ambiente | Usar suporte ou cola quente |
| **2. Derreter a cera** | Banho-maria, nunca direto no fogo | Conforme cera | Mexer suavemente |
| **3. Medir temperatura** | Aguardar até a temperatura ideal | 65-75°C (soja) | Respeitar limites |
| **4. Adicionar fragrância** | Misturar suavemente | 65-70°C | Mexer por 2 minutos |
| **5. Adicionar corante** | Incorporar aos poucos | 65-70°C | Menos é mais |
| **6. Despejar** | Verter lentamente | 60-65°C | Evitar respingos |
| **7. Resfriamento** | Temperatura ambiente | 24-48h | Não mexer |
| **8. Cortar pavio** | Deixar ~0,5cm | Após cura | Tesoura afiada |
| **9. Cura** | Aguardar fixação | 3-14 dias | Essencial |

## Temperaturas Ideais por Tipo de Cera

| Tipo de Cera | Fusão | Adição de Fragrância | Derramamento |
|---|---|---|---|
| Parafina | 60-65°C | 70-75°C | 65-70°C |
| Cera de Soja | 55-60°C | 65-70°C | 55-60°C |
| Cera de Abelha | 62-65°C | 70-75°C | 65-70°C |
| Cera de Coco | 45-50°C | 55-60°C | 45-50°C |

> ⚠️ Nunca aqueça a cera diretamente no fogo — sempre use banho-maria!`,
        quiz: [
          { pergunta: "Qual a temperatura ideal para adicionar fragrância em cera de soja?", opcoes: ["55-60°C", "65-70°C", "75-80°C", "45-50°C"], respostaCorreta: 1, explicacao: "Para cera de soja, a fragrância deve ser adicionada entre 65-70°C." },
          { pergunta: "Quanto tempo mínimo de cura uma vela deve ter?", opcoes: ["12 horas", "24 horas", "3-14 dias", "1 mês"], respostaCorreta: 2, explicacao: "A cura de 3-14 dias é essencial para que a fragrância se fixe adequadamente." },
        ],
        checklist: ["Pratiquei o processo básico do início ao fim", "Dominei o controle de temperatura para minha cera", "Fiz pelo menos 3 velas simples com sucesso"],
      },
      {
        titulo: "Técnicas Avançadas",
        descricao: "Velas em camadas, marmorizadas, chantilly, com flores e de massagem",
        duracaoMinutos: 180,
        conteudo: `# Técnicas Avançadas de Fabricação

## Vela em Camadas

| Passo | Descrição |
|---|---|
| 1 | Preparar a primeira camada com uma cor |
| 2 | Aguardar parcialmente endurecer (superfície leitosa) |
| 3 | Preparar a segunda camada com outra cor |
| 4 | Despejar cuidadosamente sobre a primeira |
| 5 | Repetir para mais camadas |

## Vela Marmorizada

1. Derreter a cera base (branca ou cor clara)
2. Separar pequena quantidade e tingir de cor escura
3. Despejar a cera base no recipiente
4. Imediatamente, adicionar gotas da cera escura
5. Mexer suavemente com palito para criar veios

## Vela com Chantilly (Cera Batida)

1. Derreter cera de soja (mais indicada)
2. Aguardar esfriar até ponto de pasta (55°C)
3. Bater com batedor ou mixer em baixa velocidade
4. Aplicar com saco de confeitar sobre a vela base
5. Finalizar com glitter ou micas

## Vela com Flores e Elementos Naturais

| Tipo | Técnica |
|---|---|
| **Flores na superfície** | Pressionar suavemente na cera morna |
| **Flores em camadas** | Intercalar camadas de cera e flores |
| **Flores no fundo** | Posicionar antes de despejar a cera |
| **Flores na lateral** | Colar com cera quente antes de despejar |

> ⚠️ Flores e elementos naturais podem ser inflamáveis. Usar com moderação.

## Vela de Massagem

- Usar ceras vegetais (soja, coco) em proporções específicas
- Adicionar óleos vegetais (amêndoas, jojoba)
- Temperatura de queima mais baixa (não queima a pele)
- Óleos essenciais seguros para contato com a pele`,
        quiz: [
          { pergunta: "Qual técnica cria efeito de mármore nas velas?", opcoes: ["Vela em camadas", "Vela marmorizada", "Vela chantilly", "Vela de massagem"], respostaCorreta: 1, explicacao: "A técnica marmorizada cria veios que imitam a aparência do mármore." },
          { pergunta: "Para a técnica de chantilly, a que temperatura a cera deve chegar?", opcoes: ["70°C", "65°C", "55°C (ponto de pasta)", "45°C"], respostaCorreta: 2, explicacao: "A cera deve esfriar até 55°C (ponto de pasta) para ser batida como chantilly." },
        ],
        checklist: ["Pratiquei vela em camadas", "Experimentei a técnica marmorizada", "Fiz pelo menos uma vela com chantilly", "Testei vela com flores secas"],
      },
      {
        titulo: "Decoração e Personalização",
        descricao: "Micas, folha de ouro, texturização e moldes",
        duracaoMinutos: 120,
        conteudo: `# Decoração e Personalização

## Técnicas de Decoração

| Técnica | Descrição | Materiais |
|---|---|---|
| **Micas e Glitter** | Aplicar na superfície ou misturar | Micas cosméticas |
| **Folha de Ouro** | Aplicar com pincel seco | Folha de ouro comestível |
| **Texturização** | Criar relevos na superfície | Espátulas, moldes |
| **Estamparia** | Transferir imagens para a vela | Papel de arroz, secador |
| **Rótulos personalizados** | Criar identidade visual | Papel adesivo, Canva |

## Vela com Moldes

| Tipo de Molde | Material | Técnica |
|---|---|---|
| **Silicone** | Flexível | Despejar, aguardar, desenformar |
| **Alumínio** | Rígido | Untar levemente |
| **Acrílico** | Transparente | Cuidado ao desenformar |
| **Vidro** | Para luminárias | Apenas como recipiente |

> A personalização transforma uma vela em uma peça exclusiva e com maior valor agregado.`,
        quiz: [
          { pergunta: "Qual material é mais indicado para moldes flexíveis?", opcoes: ["Alumínio", "Silicone", "Acrílico", "Vidro"], respostaCorreta: 1, explicacao: "O silicone é flexível e facilita a desenformagem sem danificar a vela." },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 5 — MOLDES (8h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Tudo Sobre Moldes",
    descricao: "Tipos de moldes, técnicas para pavio e desenformar sem danificar",
    icone: "Package",
    cor: "from-slate-50 to-gray-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Tipos de Moldes e Técnicas",
        descricao: "Silicone, policarbonato, alumínio — vantagens e desvantagens",
        duracaoMinutos: 150,
        conteudo: `# Tudo Sobre Moldes

## Tipos de Molde

| Tipo | Vantagens | Desvantagens | Indicação |
|---|---|---|---|
| **Silicone** | Flexível, fácil desenformar, durável | Mais caro | Todos os tipos |
| **Policarbonato** | Transparente, rígido | Pode riscar | Velas geométricas |
| **Alumínio** | Durável, conduz calor | Difícil desenformar | Produção em escala |
| **Vidro** | Superfície lisa | Frágil | Velas luminárias |
| **Moldes prontos** | Praticidade | Limitado | Iniciantes |
| **Moldes criativos** | Exclusividade | Requer técnica | Avançado |

## Como Passar o Pavio em Moldes

| Tipo | Técnica |
|---|---|
| **Molde com furo** | Passar o pavio, amarrar na base, tensionar no topo |
| **Molde sem furo** | Fixar pavio no fundo com adesivo, centralizar |

## Desenformar sem Danificar

1. Aguardar resfriamento completo (24h mínimo)
2. Levar ao freezer por 10-15 minutos
3. Puxar suavemente as bordas do silicone
4. Empurrar delicadamente pela base

## Acabamento

| Imperfeição | Solução |
|---|---|
| Base irregular | Aquecer levemente e pressionar em superfície lisa |
| Marcas de molde | Aquecer com secador e alisar |
| Superfície opaca | Aplicar leve camada de cera derretida |

> Dica: O freezer é o melhor aliado para desenformar velas de silicone!`,
        quiz: [
          { pergunta: "Qual o truque para facilitar a desenformagem?", opcoes: ["Aquecer o molde", "Levar ao freezer por 10-15 minutos", "Usar óleo no molde", "Bater o molde na bancada"], respostaCorreta: 1, explicacao: "O freezer contrai a cera ligeiramente, facilitando a desenformagem." },
          { pergunta: "Qual tipo de molde é indicado para produção em escala?", opcoes: ["Silicone", "Vidro", "Alumínio", "Moldes criativos"], respostaCorreta: 2, explicacao: "O alumínio é durável e conduz calor uniformemente, ideal para produção em escala." },
        ],
        checklist: ["Conheço os 6 tipos de moldes", "Sei passar o pavio em moldes com e sem furo", "Dominei a técnica de desenformar com freezer", "Sei corrigir imperfeições no acabamento"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 6 — CORANTES E COLORAÇÃO (6h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Corantes e Coloração",
    descricao: "Tipos de corantes, diluição e técnicas de coloração",
    icone: "Target",
    cor: "from-fuchsia-50 to-purple-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Corantes e Técnicas de Coloração",
        descricao: "Tipos de corantes, diluição e truques de produção",
        duracaoMinutos: 120,
        conteudo: `# Corantes e Coloração

## Tipos de Corantes

| Tipo | Características | Dosagem | Indicação |
|---|---|---|---|
| **Corante Líquido** | Fácil de misturar, cores vibrantes | Gotas | Iniciantes |
| **Corante em Pó** | Econômico, maior variedade | Gramas | Avançado |
| **Micas** | Efeito perolado, brilho | Pitadas | Decoração |
| **Pigmentos naturais** | Sustentável, tons terrosos | Gramas | Velas ecológicas |

## Como Diluir Corantes

| Tipo | Diluição | Temperatura |
|---|---|---|
| Líquido | Direto na cera | 65-70°C |
| Pó | Misturar em pequena quantidade de cera quente | 70°C |
| Micas | Aplicar na superfície ou misturar levemente | Variável |

## Truques de Produção

- Sempre adicionar corante **antes** da fragrância
- Anotar quantidades para reproduzir a cor
- Testar em pequena amostra antes da produção
- Cores mais escuras exigem mais corante
- A cor final pode ser diferente da cera líquida

> A regra de ouro: menos é mais! É mais fácil adicionar cor do que remover.`,
        quiz: [
          { pergunta: "Qual a ordem correta de adição na cera?", opcoes: ["Fragrância → Corante", "Corante → Fragrância", "Ambos ao mesmo tempo", "Não importa a ordem"], respostaCorreta: 1, explicacao: "Corante deve ser adicionado antes da fragrância para melhor incorporação." },
          { pergunta: "Qual tipo de corante produz efeito perolado?", opcoes: ["Corante líquido", "Corante em pó", "Micas", "Pigmentos naturais"], respostaCorreta: 2, explicacao: "As micas produzem o efeito perolado e brilhante nas velas." },
        ],
        checklist: ["Conheço os 4 tipos de corantes", "Sei a temperatura correta de diluição", "Fiz testes de cor em amostras pequenas", "Anotei minhas receitas de cores"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 7 — ERROS COMUNS E SOLUÇÕES (5h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Erros Comuns e Soluções",
    descricao: "Troubleshooting completo e checklist de qualidade",
    icone: "MessageCircle",
    cor: "from-red-50 to-rose-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Troubleshooting e Qualidade",
        descricao: "Identificando e corrigindo os problemas mais comuns",
        duracaoMinutos: 150,
        conteudo: `# Erros Comuns e Soluções

## Problemas e Soluções

| Problema | Causa Provável | Solução |
|---|---|---|
| **Superfície irregular** | Temperatura inadequada | Ajustar temperatura, usar secador |
| **Túnel** | Pavio muito fino | Aumentar o diâmetro do pavio |
| **Não solta do molde** | Resfriamento incompleto | Levar ao freezer por mais tempo |
| **Pavio falha** | Pavio inadequado | Testar outro tipo de pavio |
| **Sem aroma** | % baixa de fragrância | Aumentar porcentagem |
| **Bolhas de ar** | Mistura muito vigorosa | Mexer suavemente |
| **Queima rápida** | Pavio muito grosso | Reduzir diâmetro |
| **Fumaça preta** | Pavio longo demais | Manter com 0,5cm |
| **Aparência opaca** | Temperatura incorreta | Ajustar derramamento |
| **Cor desbotada** | Exposição à luz | Armazenar em local escuro |

## Checklist de Qualidade

- [ ] Superfície lisa e uniforme
- [ ] Aroma na intensidade correta
- [ ] Pavio centralizado
- [ ] Cor consistente
- [ ] Embalagem íntegra
- [ ] Rótulo com instruções de uso

> Nenhuma vela sai perfeita de primeira. O segredo é praticar, anotar e corrigir!`,
        quiz: [
          { pergunta: "O que causa o efeito 'túnel' (queima apenas no centro)?", opcoes: ["Pavio muito grosso", "Pavio muito fino", "Excesso de fragrância", "Cera errada"], respostaCorreta: 1, explicacao: "O pavio muito fino não gera calor suficiente para derreter toda a superfície." },
          { pergunta: "Qual o comprimento ideal do pavio após corte?", opcoes: ["1cm", "0,5cm", "2cm", "Não importa"], respostaCorreta: 1, explicacao: "O pavio deve ter aproximadamente 0,5cm para queima limpa e sem fumaça." },
        ],
        checklist: ["Sei identificar e corrigir os 10 problemas mais comuns", "Criei meu checklist de qualidade", "Faço testes de queima antes de vender"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 8 — EMBALAGEM E APRESENTAÇÃO (6h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Embalagem e Apresentação",
    descricao: "Tipos de embalagem, rótulos, identidade visual e armazenamento",
    icone: "Package",
    cor: "from-teal-50 to-emerald-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Embalagem, Rótulos e Armazenamento",
        descricao: "Da embalagem à identidade visual da marca",
        duracaoMinutos: 150,
        conteudo: `# Embalagem e Apresentação

## Tipos de Embalagem

| Tipo | Vantagens | Indicação |
|---|---|---|
| **Vidro** | Sofisticado, reciclável | Velas premium, presentes |
| **Lata de alumínio** | Leve, prática, vintage | Velas para viagem, kits |
| **Cerâmica** | Artesanal, exclusivo | Linha luxo |
| **Papel celofane** | Econômico, proteção | Feiras, eventos |
| **Caixa de papel kraft** | Sustentável, rústico | Kits, presentes |

## Informações Obrigatórias no Rótulo

| Informação | Por que incluir |
|---|---|
| **Nome da vela/aroma** | Identificação |
| **Peso líquido** | Transparência |
| **Instruções de uso** | Segurança |
| **Composição** | Transparência, alergênicos |
| **Contato do fabricante** | Relacionamento |
| **Validade** | Segurança |

## Criação de Rótulos no Canva

1. Escolher template de etiqueta
2. Definir paleta de cores da marca
3. Incluir logo e identidade visual
4. Adicionar informações obrigatórias
5. Imprimir em papel adesivo fosco ou brilhante

## Armazenamento Adequado

| Condição | Recomendação |
|---|---|
| **Temperatura** | Local fresco (15-25°C), longe do sol |
| **Umidade** | Ambiente seco |
| **Posição** | Manter na vertical |
| **Prazo** | Consumir em até 2 anos |

> A embalagem é o primeiro contato do cliente com seu produto — invista nela!`,
        quiz: [
          { pergunta: "Qual embalagem é indicada para velas premium e presentes?", opcoes: ["Papel celofane", "Vidro", "Lata de alumínio", "Caixa de papelão"], respostaCorreta: 1, explicacao: "O vidro transmite sofisticação e permite reciclagem/reutilização." },
          { pergunta: "Qual a faixa de temperatura ideal para armazenar velas?", opcoes: ["5-15°C", "15-25°C", "25-35°C", "Não importa"], respostaCorreta: 1, explicacao: "Velas devem ser armazenadas entre 15-25°C, longe do sol direto." },
        ],
        checklist: ["Escolhi o tipo de embalagem ideal", "Criei rótulo com informações obrigatórias", "Tenho local adequado para armazenamento"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 9 — EMPREENDEDORISMO (10h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Empreendedorismo e Negócios",
    descricao: "Plano de negócios, precificação e fornecedores",
    icone: "BarChart3",
    cor: "from-emerald-50 to-green-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Plano de Negócios e Público-Alvo",
        descricao: "Para quem é o mercado, análise e planejamento estratégico",
        duracaoMinutos: 120,
        conteudo: `# Empreendedorismo e Negócios

## Para Quem é Este Mercado

| Perfil | Características |
|---|---|
| **Iniciantes** | Baixo investimento, produção artesanal em lucro |
| **Artesãos** | Especialização, melhorar técnicas e qualidade |
| **Empreendedores** | Sair da CLT e abrir o próprio negócio |
| **Busca por liberdade** | Trabalhar de casa com flexibilidade |

## Estrutura do Plano de Negócios

| Seção | O que incluir |
|---|---|
| **Análise de mercado** | Concorrência, público-alvo, tendências |
| **Plano de marketing** | Redes sociais, feiras, parcerias |
| **Plano operacional** | Produção, estoque, logística |
| **Plano financeiro** | Investimento inicial, custos, preço de venda |

## Identificando seu Público-Alvo

| Público | Características | Estratégia |
|---|---|---|
| **Mulheres 25-45 anos** | Bem-estar, decoração, presentes | Instagram, feiras |
| **Profissionais estressados** | Relaxamento | Marketing de benefícios |
| **Noivas** | Presentes, lembranças | Parcerias com cerimoniais |
| **Empresas** | Presentes corporativos | Kits personalizados |

> O segredo é encontrar seu nicho e se especializar nele.`,
        quiz: [
          { pergunta: "Qual público é ideal para parcerias com cerimoniais?", opcoes: ["Empresas", "Profissionais estressados", "Noivas", "Artesãos"], respostaCorreta: 2, explicacao: "Noivas buscam presentes para madrinhas e lembranças, parceria natural com cerimoniais." },
        ],
      },
      {
        titulo: "Precificação e Fornecedores",
        descricao: "Fórmula de precificação, margens de lucro e critérios de fornecedores",
        duracaoMinutos: 120,
        conteudo: `# Precificação e Fornecedores

## Exemplo Prático de Precificação

| Item | Custo |
|---|---|
| Cera (180g) | R$ 5,00 |
| Fragrância (14g) | R$ 3,00 |
| Pavio | R$ 0,50 |
| Recipiente | R$ 4,00 |
| Rótulo/embalagem | R$ 1,00 |
| Mão de obra (1h) | R$ 15,00 |
| **Custo total** | **R$ 28,50** |
| **Multiplicador 3** | **R$ 85,50** |
| **Preço sugerido** | **R$ 85,00 - R$ 90,00** |

## Margem de Lucro por Canal

| Canal de Venda | Margem Média |
|---|---|
| Feiras e eventos | 50-70% |
| Redes sociais (direto) | 60-80% |
| Lojas parceiras | 30-40% (repasse) |
| Marketplaces | 40-50% (taxas) |

## Critérios para Fornecedores

| Critério | O que verificar |
|---|---|
| **Qualidade** | Testar amostras antes de comprar |
| **Preço** | Comparar custo-benefício |
| **Confiabilidade** | Prazo de entrega, consistência |
| **Atendimento** | Suporte pós-venda, trocas |
| **Sustentabilidade** | Certificações, origem |

> A margem ideal está entre 60-80%. Vendas diretas por redes sociais são o canal mais lucrativo.`,
        quiz: [
          { pergunta: "Qual o multiplicador de custo sugerido para precificação?", opcoes: ["2x", "3x", "4x", "5x"], respostaCorreta: 1, explicacao: "O multiplicador 3x é o padrão para artesanato, cobrindo custos, margem e imprevistos." },
          { pergunta: "Qual canal oferece a maior margem de lucro?", opcoes: ["Lojas parceiras", "Marketplaces", "Redes sociais (direto)", "Feiras"], respostaCorreta: 2, explicacao: "Vendas diretas por redes sociais eliminam intermediários, gerando margem de 60-80%." },
        ],
        checklist: ["Calculei o custo real de produção", "Defini preços usando o multiplicador 3x", "Pesquisei pelo menos 3 fornecedores", "Criei meu plano de negócios básico"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 10 — MARKETING E VENDAS (8h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Marketing e Vendas",
    descricao: "Estratégias digitais, criação de conteúdo, coleções e feiras",
    icone: "MessageCircle",
    cor: "from-blue-50 to-indigo-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Marketing Digital e Conteúdo",
        descricao: "Presença online, redes sociais e conteúdo que vende",
        duracaoMinutos: 120,
        conteudo: `# Marketing Digital e Conteúdo

## Presença Online

| Canal | Estratégia | Frequência |
|---|---|---|
| **Instagram** | Vitrine visual, stories, reels | Diário |
| **Facebook** | Comunidade, grupos de vendas | 3-5x semana |
| **Pinterest** | Inspiração, tráfego para loja | Semanal |
| **WhatsApp** | Relacionamento, vendas diretas | Diário |
| **Loja própria** | Site ou Linktree com catálogo | Sempre atualizado |

## Conteúdo que Vende

| Tipo | Exemplo | Objetivo |
|---|---|---|
| **Educativo** | "Como escolher a vela certa" | Autoridade |
| **Processo criativo** | Bastidores da produção | Humanização |
| **Lançamentos** | Novas fragrâncias | Engajamento |
| **Promocional** | Kits, combos | Conversão |
| **Depoimentos** | Clientes satisfeitos | Prova social |

## Ideias de Posts

| Formato | Ideia |
|---|---|
| **Reels** | Time-lapse da produção, unboxing, dicas |
| **Carrossel** | Guia de aromas, cuidados com velas |
| **Stories** | Enquete de aromas, caixinha, promoção relâmpago |
| **Feed** | Fotos profissionais, detalhes, combinações |

> Constância é mais importante que perfeição. Publique todos os dias!`,
        quiz: [
          { pergunta: "Qual tipo de conteúdo gera prova social?", opcoes: ["Educativo", "Bastidores", "Depoimentos", "Lançamentos"], respostaCorreta: 2, explicacao: "Depoimentos de clientes satisfeitos são a forma mais poderosa de prova social." },
        ],
      },
      {
        titulo: "Coleções e Feiras",
        descricao: "Criando sua primeira coleção e participando de eventos",
        duracaoMinutos: 120,
        conteudo: `# Primeira Coleção e Feiras

## Passo a Passo para Criar uma Coleção

| Etapa | Ação |
|---|---|
| 1 | Definir tema (ex: "Floresta", "Praia", "Natal") |
| 2 | Escolher 3-5 fragrâncias que conversem entre si |
| 3 | Definir cores e recipientes coerentes |
| 4 | Criar nomes atrativos para cada vela |
| 5 | Desenvolver embalagem unificada |
| 6 | Fotografar em conjunto |
| 7 | Lançar com oferta de combo |

## Participação em Feiras e Eventos

| Tipo de Evento | Vantagens | Cuidados |
|---|---|---|
| **Feiras de artesanato** | Contato direto, venda imediata | Taxa de participação |
| **Mercados sazonais** | Público qualificado | Concorrência |
| **Eventos privados** | Exclusividade | Networking |
| **Parcerias com lojas** | Exposição contínua | Margem reduzida |

> Comece com coleções pequenas (3-5 velas) e expanda conforme a demanda!`,
        quiz: [
          { pergunta: "Quantas fragrâncias são recomendadas para uma primeira coleção?", opcoes: ["1-2", "3-5", "8-10", "Mais de 10"], respostaCorreta: 1, explicacao: "Uma primeira coleção com 3-5 fragrâncias é ideal para manter coerência e gerenciar custos." },
        ],
        checklist: ["Defini meus canais de venda prioritários", "Criei um calendário de conteúdo", "Desenvolvi minha primeira coleção temática", "Pesquisei feiras na minha região"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 11 — GESTÃO E FINANÇAS (6h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Gestão e Finanças",
    descricao: "Controle de custos, planilha de orçamento e fluxo de caixa",
    icone: "BarChart3",
    cor: "from-cyan-50 to-sky-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Controle Financeiro",
        descricao: "Custos de produção, orçamento e fluxo de caixa",
        duracaoMinutos: 150,
        conteudo: `# Gestão e Finanças

## Controle de Custos de Produção

| Item | Como Controlar |
|---|---|
| **Matérias-primas** | Planilha com entrada/saída, validade |
| **Mão de obra** | Calcular horas trabalhadas por vela |
| **Embalagens** | Compra em quantidade, controle de estoque |
| **Custos fixos** | Ratear por produção (luz, água, aluguel) |

## Planilha de Orçamento

| Mês | Previsto | Realizado | Diferença |
|---|---|---|---|
| Receita total | R$ __ | R$ __ | R$ __ |
| (-) Custos variáveis | R$ __ | R$ __ | R$ __ |
| (-) Custos fixos | R$ __ | R$ __ | R$ __ |
| **Lucro líquido** | **R$ __** | **R$ __** | **R$ __** |

## Fluxo de Caixa Simples

| Data | Descrição | Entrada | Saída | Saldo |
|---|---|---|---|---|
| 01/03 | Compra de ceras | - | R$ 200 | R$ 300 |
| 05/03 | Venda feira | R$ 450 | - | R$ 750 |
| 10/03 | Embalagens | - | R$ 80 | R$ 670 |

> Quem não controla, não cresce. A planilha financeira é a bússola do seu negócio!`,
        quiz: [
          { pergunta: "Qual a fórmula básica do lucro líquido?", opcoes: ["Receita - Custos variáveis", "Receita - Custos variáveis - Custos fixos", "Vendas × Margem", "Preço × Quantidade"], respostaCorreta: 1, explicacao: "Lucro líquido = Receita - Custos variáveis - Custos fixos." },
        ],
        checklist: ["Criei minha planilha de custos por vela", "Mantenho orçamento mensal atualizado", "Controlo o fluxo de caixa semanalmente"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 12 — ATENDIMENTO E FIDELIZAÇÃO (6h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Atendimento e Fidelização",
    descricao: "Estratégias de fidelização, pós-venda e relacionamentos",
    icone: "Heart",
    cor: "from-pink-50 to-rose-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Fidelização e Pós-Venda",
        descricao: "Estratégias para reter clientes e construir relacionamentos duradouros",
        duracaoMinutos: 150,
        conteudo: `# Atendimento ao Cliente e Fidelização

## Estratégias de Fidelização

| Estratégia | Descrição |
|---|---|
| **Programa de pontos** | A cada compra, acumula pontos para desconto |
| **Desconto para recorrentes** | Benefício exclusivo |
| **Aniversariante** | Brinde ou desconto especial |
| **Conteúdo exclusivo** | Dicas de uso por e-mail ou WhatsApp |
| **Lançamento antecipado** | Clientes fiéis têm acesso antes |

## Suporte Pós-Venda

| Ação | Objetivo |
|---|---|
| **Mensagem de agradecimento** | Fortalecer relacionamento |
| **Pesquisa de satisfação** | Coletar feedback |
| **Orientações de uso** | Garantir aproveitamento máximo |
| **Resolução rápida** | Transformar reclamação em oportunidade |

## Construção de Relacionamentos

- Responder mensagens rapidamente
- Personalizar atendimento (lembrar preferências)
- Mostrar-se disponível para dúvidas
- Criar comunidade (grupo VIP no WhatsApp)

> Um cliente fiel compra mais, indica mais e custa menos do que conquistar um novo!`,
        quiz: [
          { pergunta: "Qual é a estratégia mais eficaz para fidelização?", opcoes: ["Dar descontos grandes", "Criar relacionamento e comunidade", "Postar muito nas redes", "Ter o menor preço"], respostaCorreta: 1, explicacao: "Relacionamento e comunidade criam vínculo emocional, gerando fidelidade real." },
        ],
        checklist: ["Criei meu programa de fidelidade", "Implementei mensagens de pós-venda", "Criei grupo VIP para clientes fiéis"],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════
  // MÓDULO 13 — BÔNUS E EXPANSÃO (4h)
  // ═══════════════════════════════════════════════════════════
  {
    titulo: "Bônus e Expansão",
    descricao: "Diversificação de produtos, recursos exclusivos e certificação",
    icone: "GraduationCap",
    cor: "from-violet-50 to-indigo-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Diversificação e Bônus Exclusivos",
        descricao: "Expandindo sua linha de produtos e acessando recursos bônus",
        duracaoMinutos: 120,
        conteudo: `# Bônus e Expansão

## Diversificação de Produtos

| Produto | Descrição |
|---|---|
| **Aromatizadores de ambiente** | Sprays, difusores de varetas |
| **Pastilhas aromáticas** | Para derreter em rechaud |
| **Velas de massagem** | Linha terapêutica |
| **Kits presentes** | Combinações com outros itens |
| **Linha sazonal** | Edições limitadas para datas especiais |

## Bônus Exclusivos

| Bônus | Descrição |
|---|---|
| **Grupo VIP de alunas** | Comunidade exclusiva para troca de experiências |
| **Lista de fornecedores verificados** | Economia e qualidade garantida |
| **Ebook de receitas completas** | Com precificação inclusa |
| **Modelos de rótulos para Canva** | Identidade visual profissional |
| **Planilha de custos** | Controle financeiro facilitado |

## Certificado de Conclusão

Ao finalizar o curso, o aluno recebe certificado de conclusão, comprovando as habilidades adquiridas e podendo utilizar como diferencial profissional.

> 🏆 Parabéns! Você está preparado para criar velas profissionais e empreender com sucesso!`,
        quiz: [
          { pergunta: "Qual produto é uma extensão natural da linha de velas?", opcoes: ["Cosméticos", "Aromatizadores de ambiente", "Alimentos", "Roupas"], respostaCorreta: 1, explicacao: "Aromatizadores de ambiente (sprays, difusores) são uma extensão natural, pois utilizam as mesmas fragrâncias." },
        ],
        checklist: ["Explorei opções de diversificação de produtos", "Baixei os bônus exclusivos do curso", "Tenho meu plano de expansão definido", "Curso concluído — certificado desbloqueado! 🏆"],
      },
    ],
  },
];
