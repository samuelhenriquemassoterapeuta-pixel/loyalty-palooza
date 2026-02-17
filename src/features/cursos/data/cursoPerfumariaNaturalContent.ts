import type { QuizQuestion } from "@/features/cursos/components/QuizSection";

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

export type { QuizQuestion };

export const cursoPerfumariaNaturalData: ModuloContent[] = [
  // ─── MÓDULO 1 ── Fundação & Ciência Olfativa ────────────────
  {
    titulo: "1. Fundação & Ciência Olfativa",
    descricao: "História milenar dos aromas, anatomia do olfato, famílias olfativas e kit do perfumista",
    icone: "BookOpen",
    cor: "from-amber-50 to-yellow-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "A História dos Aromas",
        descricao: "Do Egito Antigo ao renascimento natural contemporâneo",
        duracaoMinutos: 25,
        conteudo: `# A História dos Aromas

## Da Antiguidade à Perfumaria Natural Moderna

### Egito Antigo: Perfumes Sagrados
- **Kyphi**: o perfume sagrado — mirra, canela, junípero e mel
- Usado em rituais de adoração e embalsamamento
- Cleópatra perfumava as velas de seus navios com rosa e jasmim

### Mesopotâmia: Primeiros Registros de Destilação
- Primeiros alambiques rudimentares para extração de essências
- Tabuletas cuneiformes com receitas de incensos

### Índia e China: Medicina Aromática Tradicional
- Ayurveda: uso de sândalo, vetiver e jasmim há 5.000 anos
- Attar: perfumaria oriental ancestral com destilação em sândalo

### A Revolução Árabe
> **Avicena (Ibn Sina) aperfeiçoou a destilação a vapor no século X, revolucionando a extração de óleos essenciais.**

### Renascimento e Grasse
- Catarina de Médici leva perfumistas italianos para a França
- Grasse (sul da França): capital mundial do perfume
- Técnica de enfleurage, campos de lavanda, jasmim e rosa centifolia

### Linha do Tempo

| Época | Marco | Ingrediente-chave |
| 3000 a.C. | Kyphi egípcio | Mirra, olíbano |
| Séc. X | Destilação a vapor (Avicena) | Água de rosas |
| Séc. XVII | Grasse como capital | Lavanda, jasmim |
| 1882 | 1º sintético (cumarina) | Fougère Royale |
| 1921 | Chanel Nº 5 (aldeídos) | Revolução sintética |
| 2000+ | Renascimento natural | Sustentabilidade |

### O Renascimento Natural (2000-2026)
- Consumidores buscam transparência e sustentabilidade
- Perfumistas naturais: Mandy Aftel, JoAnne Bassett, Anya McCoy
- Certificações: ECOCERT, COSMOS, IFRA Natural
- Referências brasileiras: Rosa de Luz (Theo Bibancos), Harmonie Aromaterapia, Paralela Escola Olfativa
- Tendência 2026: rastreabilidade total, perfumaria regenerativa

**A perfumaria natural não é um retrocesso — é uma evolução consciente.**`,
        quiz: [
          { pergunta: "Quem é creditado como o pai da destilação moderna de óleos essenciais?", opcoes: ["François Coty", "Avicena (Ibn Sina)", "René-Maurice Gattefossé", "Ernest Beaux"], respostaCorreta: 1, explicacao: "Avicena (Ibn Sina) aperfeiçoou a destilação a vapor no século X." },
          { pergunta: "Qual cidade é a capital mundial do perfume?", opcoes: ["Paris", "Florença", "Grasse", "Dubai"], respostaCorreta: 2, explicacao: "Grasse, no sul da França, é historicamente o centro da perfumaria mundial." }
        ],
        checklist: [
          "Criar linha do tempo pessoal com marcos históricos da perfumaria",
          "Pesquisar 3 perfumistas naturais contemporâneos",
          "Identificar 5 ingredientes usados desde o Egito Antigo"
        ]
      },
      {
        titulo: "Anatomia e Fisiologia do Olfato",
        descricao: "Sistema olfativo, neurociência, memória e treinamento do nariz",
        duracaoMinutos: 25,
        conteudo: `# Anatomia e Fisiologia do Olfato

## Como Percebemos os Aromas

### O Sistema Olfativo
- **Narinas**: entrada das moléculas aromáticas
- **Epitélio olfativo**: 5 cm² com ~10 milhões de receptores
- **Bulbo olfativo**: processa sinais e envia ao cérebro
- **Sistema límbico**: centro emocional — aromas evocam memórias
- **Córtex olfativo**: interpretação consciente

> **Somos capazes de distinguir mais de 1 trilhão de combinações aromáticas.**

### Neurociência do Olfato
- Único sentido que NÃO passa pelo tálamo
- Conexão direta com amígdala (emoções) e hipocampo (memórias)
- "Memória Involuntária de Proust" — aroma transporta para lembrança
- Cheiros processados 10x mais rápido que estímulos visuais

### Variações de Percepção

| Condição | Descrição |
| Anosmia | Incapacidade total de perceber aromas |
| Hiposmia | Redução da capacidade olfativa |
| Parosmia | Distorção dos aromas (comum pós-COVID) |
| Fadiga olfativa | Deixar de perceber após ~20 min |

### Como Resetar o Olfato
- Cheire grãos de café (neutralizador clássico)
- Respire ar fresco por 2-3 min
- Cheire a própria pele (neutro individual)
- Limite sessões de criação a 30-40 min

### Treinamento do Nariz (4 etapas)
1. **Cheirar conscientemente** — 5 aromas por dia
2. **Criar vocabulário** — 3+ adjetivos por aroma
3. **Memória olfativa** — associar a imagens e emoções
4. **Diário olfativo** — registrar percepções por 7 dias`,
        quiz: [
          { pergunta: "Por que o olfato está tão conectado a emoções?", opcoes: ["Porque o nariz é muito grande", "Porque vai direto ao sistema límbico, sem passar pelo tálamo", "Porque temos mais receptores olfativos que visuais", "Porque se desenvolve por último no embrião"], respostaCorreta: 1, explicacao: "O olfato é o único sentido com conexão direta ao sistema límbico (amígdala e hipocampo)." },
          { pergunta: "O que é fadiga olfativa?", opcoes: ["Perda permanente do olfato", "Alergia a aromas", "Deixar de perceber um aroma constante após ~20 min", "Capacidade de cheirar melhor"], respostaCorreta: 2, explicacao: "A fadiga olfativa é o fenômeno natural de deixar de perceber aromas constantes após ~20 minutos." }
        ],
        checklist: [
          "Criar diário olfativo para 7 dias",
          "Treinar com 5 aromas: limão, lavanda, canela, café, rosa",
          "Praticar descrição olfativa sem nomear o ingrediente",
          "Mapear preferências olfativas pessoais"
        ]
      },
      {
        titulo: "As 7 Famílias Olfativas e Pirâmide",
        descricao: "Classificação profissional, subfamílias e proporções da pirâmide olfativa",
        duracaoMinutos: 30,
        conteudo: `# As 7 Famílias Olfativas Naturais

## Classificação Profissional

### 1. CÍTRICA (Hesperidada)
- Frescas, vibrantes, efêmeras — notas de topo
- Bergamota, Limão siciliano, Laranja doce, Grapefruit, Yuzu

### 2. FLORAL
- Românticas, universais — coração
- Rosa damascena, Jasmim, Ylang ylang, Néroli, Lavanda, Gerânio

### 3. FOUGÈRE (Samambaia)
- Aromáticas, frescas — Lavanda + Tonka + Musgo/Vetiver

### 4. CHYPRE
- Elegantes, terrosas — Bergamota + Rosa/Jasmim + Patchouli/Labdanum

### 5. AMADEIRADA
- Quentes, envolventes — Cedro, Sândalo, Vetiver, Patchouli

### 6. ORIENTAL (Âmbar)
- Sensuais, especiadas — Baunilha, Benjoim, Canela, Mirra, Olíbano

### 7. COUROS
- Animalísticas, fumadas — Birch tar, Cade, Labdanum, Oud

### Volatilidade e Pirâmide

| Nota | Duração | Exemplos |
| Topo | 15-30 min | Bergamota, Limão, Laranja |
| Coração | 2-4 h | Lavanda, Rosa, Ylang-ylang |
| Base | 4-24 h+ | Vetiver, Sândalo, Patchouli |

### Proporções Clássicas

> **30% topo + 50% coração + 20% base** — proporção equilibrada

| Família | Topo | Coração | Base |
| Cologne | 40% | 30% | 30% |
| Oriental | 15% | 35% | 50% |
| Amadeirado | 25% | 30% | 45% |

### Famílias Modernas
- **Gourmand**: baunilha, café, chocolate (viável em natural!)
- **Verde**: gálbano, folha de violeta (viável)
- **Aquática**: notas marinhas (❌ difícil sem sintéticos)`,
        quiz: [
          { pergunta: "Quantas famílias olfativas clássicas existem?", opcoes: ["3", "5", "7", "10"], respostaCorreta: 2, explicacao: "7 famílias: Cítrica, Floral, Fougère, Chypre, Amadeirada, Oriental e Couros." },
          { pergunta: "Proporção clássica da pirâmide olfativa?", opcoes: ["50-30-20", "30-50-20", "20-20-60", "33-33-33"], respostaCorreta: 1, explicacao: "30% topo, 50% coração e 20% base — equilíbrio com boa evolução temporal." }
        ],
        checklist: [
          "Criar roda olfativa visual com 7 famílias",
          "Classificar 15 óleos essenciais por nota (topo/coração/base)",
          "Fazer teste de identificação cega: 7 amostras, 1 por família"
        ]
      },
      {
        titulo: "Óleos Essenciais: Extração, Química e Kit Básico",
        descricao: "Métodos de extração, classes químicas, qualidade e o kit de 15 OEs do perfumista",
        duracaoMinutos: 30,
        conteudo: `# Óleos Essenciais — Fundamentos

## Tipos de Extrato

| Tipo | Método | Exemplo |
| Óleo Essencial | Destilação a vapor / prensagem a frio | Lavanda, Limão |
| Absoluto | Extração com solvente (hexano → álcool) | Jasmim, Rosa |
| Concreto | Intermediário do absoluto | Tuberosa |
| CO2 Supercrítico | CO2 sob pressão | Baunilha, Café |
| Tintura | Maceração em álcool | Resinas, Baunilha |

## Química dos Óleos Essenciais

| Classe | Característica | Exemplo |
| Monoterpenos | Leves, frescos, topo | Limoneno (cítricos) |
| Sesquiterpenos | Fixadores, fundo | Cariofileno (pimenta) |
| Álcoois terpênicos | Seguros, terapêuticos | Linalol (lavanda) |
| Ésteres | Frutais, doces | Acetato de linalila |
| Fenóis | Antimicrobianos, irritantes! | Eugenol (cravo) |
| Aldeídos | Cítricos, anti-inflamatórios | Citral (lemongrass) |

## Avaliação de Qualidade

- Nome botânico (latim): ex. Lavandula angustifolia
- Parte da planta, quimiotipo (CT), origem geográfica
- Certificado GC/MS (cromatografia gasosa)
- Certificações: orgânico, ECOCERT

⚠️ Sinais de adulteração:
- Preço muito abaixo do mercado
- "OE" de morango, maçã (NÃO existem!)
- Sem informações botânicas no rótulo

## Kit Básico do Perfumista (15 OEs)

| Grupo | OEs | Investimento |
| Cítricos (4) | Bergamota FCF, Limão, Laranja, Grapefruit | R$ 100-160 |
| Florais (4) | Lavanda, Gerânio, Ylang ylang, Palmarosa | R$ 165-275 |
| Amadeirados (3) | Cedro atlas, Vetiver, Patchouli | R$ 85-165 |
| Especiarias (2) | Canela folha, Cardamomo | R$ 55-100 |
| Resinas (2) | Olíbano, Benjoim | R$ 60-130 |
| **Total estimado** | **15 óleos essenciais** | **R$ 465-830** |

### Segurança — Regras de Ouro
- ❌ NUNCA aplicar OE puro na pele (exceto lavanda e tea tree em casos específicos)
- ❌ NUNCA ingerir sem supervisão médica
- ✅ Sempre diluir (máximo 2-3% para pele)
- ✅ Teste de alergia: 1 gota diluída no antebraço, aguardar 24h
- ✅ OEs foto-sensibilizantes (cítricos prensados): evitar sol 12h`,
        quiz: [
          { pergunta: "Qual método produz extratos mais fiéis ao aroma da planta viva?", opcoes: ["Destilação a vapor", "Prensagem a frio", "Extração por solvente (absoluto)", "Maceração"], respostaCorreta: 2, explicacao: "A extração por solvente produz absolutos mais fiéis ao aroma da planta viva." },
          { pergunta: "Investimento estimado para o kit básico de 15 OEs?", opcoes: ["R$ 100-200", "R$ 465-830", "R$ 1.500-2.000", "R$ 3.000+"], respostaCorreta: 1, explicacao: "O kit básico de 15 OEs custa entre R$ 465 e R$ 830, cobrindo todas as famílias." }
        ],
        checklist: [
          "Montar kit básico de 15 OEs priorizando por orçamento",
          "Verificar certificado GC/MS de cada óleo adquirido",
          "Organizar OEs por nota (topo/coração/base) no kit",
          "Criar ficha técnica para cada óleo do kit"
        ]
      }
    ]
  },

  // ─── MÓDULO 2 ── Matérias-Primas Naturais ────────────────────
  {
    titulo: "2. Matérias-Primas Naturais",
    descricao: "50+ ingredientes: cítricos, florais, amadeirados, resinas e especiarias",
    icone: "Heart",
    cor: "from-green-50 to-emerald-50",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "Cítricos: De Bergamota a Yuzu",
        descricao: "8 cítricos essenciais com perfil, dosagem, segurança e combinações",
        duracaoMinutos: 30,
        conteudo: `# Cítricos Essenciais

## Tabela Comparativa

| OE | Perfil | Uso % | Foto-sensível? | Preço/10ml |
| Bergamota FCF | Elegante, levemente floral | 5-40% | ✅ (usar FCF) | R$ 40-60 |
| Limão Siciliano | Ácido, vibrante, limpo | 3-30% | ✅ | R$ 20-35 |
| Laranja Doce | Doce, solar, alegre | 5-25% | ✅ (leve) | R$ 15-25 |
| Grapefruit | Amargo-doce, efervescente | 3-30% | ✅ | R$ 25-40 |
| Tangerina | Doce, infantil, nostálgica | 10-40% | ✅ (leve) | R$ 20-35 |
| Yuzu | Complexo zen (limão+mandarina) | 5-20% | ❌ | R$ 150-250/5ml |
| Lima Destilada | Ácida, vibrante, praia | 3-20% | ❌ (destilada) | R$ 40-60 |
| Petitgrain | Cítrico-verde-amadeirado | 5-30% | ❌ | R$ 35-50 |

### Destaque: Petitgrain
Nota de CORAÇÃO (30-90 min) — "o cítrico que fica". Dá estrutura e duração aos cítricos voláteis.

**Demonstração de impacto:**
- SEM petitgrain: Bergamota 80% + Lavanda 10% + Vetiver 10% → 1-2h
- COM petitgrain: Bergamota 50% + Petitgrain 20% + Lavanda 20% + Vetiver 10% → 3-4h!

### Família da Laranja Amarga (mesma árvore!)
- 🌳 Folhas = Petitgrain (barato)
- 🌸 Flores = Néroli (caro!)
- 🍊 Casca = Laranja amarga

### Combinações Essenciais
- Bergamota + Lavanda + Cedro = Clássico
- Grapefruit + Vetiver + Hortelã = Moderno unissex
- Laranja + Canela + Baunilha = Gourmand aconchegante
- Yuzu + Chá verde + Cedro = Minimalista zen`,
        quiz: [
          { pergunta: "Qual cítrico é nota de CORAÇÃO e dá duração aos outros?", opcoes: ["Bergamota", "Limão", "Petitgrain", "Laranja"], respostaCorreta: 2, explicacao: "Petitgrain é nota de coração (30-90 min), 'segura' os cítricos voláteis." },
          { pergunta: "Qual cítrico é o mais caro e tendência em nicho?", opcoes: ["Bergamota", "Yuzu", "Lima", "Grapefruit"], respostaCorreta: 1, explicacao: "Yuzu (R$ 150-250/5ml) é tendência em perfumaria de nicho, estética japonesa." }
        ],
        checklist: [
          "Comparar bergamota, limão e laranja lado a lado",
          "Criar acorde cítrico simples (3 em proporções iguais)",
          "Testar impacto do petitgrain na duração",
          "Formular Eau de Cologne: bergamota + petitgrain + lavanda + vetiver"
        ]
      },
      {
        titulo: "Florais: Lavanda, Gerânio, Ylang e Rosa",
        descricao: "Os 4 florais fundamentais — versatilidade, economia e perfumes clássicos",
        duracaoMinutos: 30,
        conteudo: `# Florais Fundamentais

## Tabela Comparativa

| OE | Perfil | Nota | Uso % | Preço/10ml |
| Lavanda angustifolia | Floral herbáceo, limpo | Coração | 5-50% | R$ 50-80 |
| Gerânio Egito | Rosa-verde, "rosa do pobre" | Coração | 5-30% | R$ 60-90 |
| Ylang Ylang Extra | Exótico, doce, narcótico | Cor-Base | 1-15% | R$ 80-120 |
| Rosa Damascena Abs. | Supremo, mel, romântico | Cor-Base | 2-20% | R$ 150-250/ml |

### Lavanda — "Se só pudesse ter 1 OE"
- **Tipos**: Angustifolia (fina, floral) vs Lavandin (canfórico, barato)
- Busque "Lavande fine" ou "Altitude" — Provence = padrão ouro
- ✅ Mais seguro. Ok bebês >3 meses

### Gerânio — "O Coringa Universal"
> "Se sua fórmula está 'quebrada', adicione 5% de gerânio — ele arredonda e une as notas."

### Ylang Ylang — "Menos é Mais"
- Frações: Extra (perfumaria fina) > I > II > III (sabonetes)
- ⚠️ REGRA CRÍTICA: Comece com 1-2% e aumente lentamente. Overdose = banana + náusea

### Rosa — "A Rainha"
- R$ 150-250/ml (!) — diluir a 10% em álcool/jojoba
- **Economia**: Gerânio 50% + Palmarosa 30% + Rosa 20% = resultado 70% similar, custo 10x menor!

### Fórmulas Clássicas

**Fougère**: Lavanda 40% + Bergamota 30% + Gerânio 15% + Vetiver 10% + Tonka 5%
**Rosa Romântica**: Gerânio 35% + Palmarosa 25% + Ylang 15% + Sândalo 15% + Benjoim 10%`,
        quiz: [
          { pergunta: "Como economizar usando rosa em perfumaria?", opcoes: ["Usar rosa sintética", "Gerânio + Palmarosa substituem parcialmente a rosa", "Não usar rosa nunca", "Comprar em grandes quantidades"], respostaCorreta: 1, explicacao: "Gerânio + palmarosa criam acorde similar à rosa a uma fração do custo." },
          { pergunta: "Por que ylang ylang deve ser usado com cautela?", opcoes: ["É tóxico", "É caro", "Overdose causa cheiro de banana e náusea", "Evapora rápido"], respostaCorreta: 2, explicacao: "Ylang é extremamente intenso — overdose produz nota de banana e pode causar náusea." }
        ],
        checklist: [
          "Comparar lavanda angustifolia vs lavandin",
          "Testar gerânio como 'coringa' em 3 fórmulas diferentes",
          "Praticar dosagem de ylang (começar em 1%)",
          "Testar substituição de rosa com gerânio + palmarosa"
        ]
      },
      {
        titulo: "Amadeirados, Resinas e Especiarias",
        descricao: "Notas de base: cedro, sândalo, vetiver, patchouli, olíbano, baunilha e especiarias",
        duracaoMinutos: 30,
        conteudo: `# Amadeirados, Resinas e Especiarias

## Amadeirados — Notas de Base

| OE | Perfil | Fixação | Uso % | Preço/10ml |
| Cedro Atlas | Seco, elegante, versátil | 4-8h | 5-30% | R$ 25-45 |
| Sândalo (Aus.) | Cremoso, leite, meditativo | 8-24h | 5-25% | R$ 120-200 |
| Vetiver | Terroso, raiz, chuvoso | 8-24h+ | 5-20% | R$ 50-90 |
| Patchouli | Terroso-doce, hippie, vintage | 12-24h+ | 3-15% | R$ 35-60 |

> **Dica**: Amadeirados são "forgiving" — perdoam erros de proporção. Ideais para iniciantes.

## Resinas Balsâmicas — Os Fixadores

| Resina | Perfil | Fixação |
| Olíbano (Frankincense) | Sagrado, meditativo, incenso | 6-12h |
| Benjoim | Baunilha quente, mel, bálsamo | 8-24h |
| Mirra | Terroso-amargo, medicinal, sagrado | 8-24h |
| Labdanum | Âmbar-couro, animal, quente | 12-24h |
| Baunilha CO2 | Doce, gourmand, envolvente | 8-24h |

### Acorde Âmbar Natural
Baunilha 30% + Benjoim 30% + Labdanum 20% + Vetiver 20%

## Especiarias — Calor e Contraste

| Especiaria | Nota | Uso % | Cuidado |
| Canela (folha) | Coração | 1-5% | ⚠️ Eugenol irritante. Usar folha, NÃO casca |
| Cardamomo | Topo-Cor | 3-15% | ✅ Muito seguro |
| Cravo | Coração | 1-3% | ⚠️ Eugenol — máximo 0.5% em pele |
| Pimenta Preta | Topo | 1-5% | ✅ Seguro em dosagem correta |
| Gengibre | Topo-Cor | 3-10% | ✅ Seguro |
| Noz-moscada | Coração | 1-5% | ⚠️ Neurotóxico em excesso |

### Fórmulas de Referência

**"Floresta ao Amanhecer"**: Petitgrain 15% + Alecrim 10% + Cedro 25% + Vetiver 20% + Olíbano 15% + Patchouli 10% + Gálbano 5%
**"Oriental Especiado"**: Bergamota 10% + Cardamomo 15% + Canela folha 5% + Pimenta 5% + Patchouli 20% + Benjoim 15% + Olíbano 15% + Vetiver 15%`,
        quiz: [
          { pergunta: "Qual amadeirado tem fixação mais longa?", opcoes: ["Cedro Atlas (4-8h)", "Vetiver (8-24h)", "Patchouli (12-24h+)", "Cipreste (3-6h)"], respostaCorreta: 2, explicacao: "Patchouli tem a fixação mais longa entre os amadeirados: 12-24h+." },
          { pergunta: "Por que usar canela FOLHA e não canela CASCA em perfumaria?", opcoes: ["É mais barata", "Cheira melhor", "A casca tem muito mais eugenol (irritante)", "Não há diferença"], respostaCorreta: 2, explicacao: "Canela casca contém até 90% de cinamaldeído, extremamente irritante. A folha é mais suave." }
        ],
        checklist: [
          "Criar acorde âmbar natural (baunilha + benjoim + labdanum + vetiver)",
          "Formular perfume amadeirado unissex",
          "Testar dosagem segura de canela folha (máx. 5%)",
          "Comparar olíbano vs mirra lado a lado"
        ]
      },
      {
        titulo: "Ingredientes Preciosos e Tendência",
        descricao: "Néroli, jasmim, oud, semente de ambrette, café CO2 e ingredientes raros",
        duracaoMinutos: 25,
        conteudo: `# Ingredientes Preciosos e Tendência

## Os Mais Caros da Perfumaria Natural

| Ingrediente | Perfil | Preço | Por quê tão caro? |
| Rosa Otto | Etéreo, mel | R$ 300-500/ml | 4 toneladas de pétalas = 1 kg de óleo |
| Jasmim Absoluto | Narcótico, sensual | R$ 200-400/ml | Colheita noturna manual |
| Néroli | Floral-cítrico elegante | R$ 150-300/ml | 1 ton de flores = 1 L de óleo |
| Oud (Agarwood) | Sagrado, complexo, fumado | R$ 500-2.000/ml | Árvore infectada por fungo, 15+ anos |
| Ambrette (semente) | Musk natural, almiscarado | R$ 200-400/ml | Substituto natural do musk animal |

### Néroli — A Flor da Laranjeira
- Mesma árvore que produz petitgrain e laranja amarga
- Indispensável em Eau de Cologne clássica
- Combina com: bergamota, petitgrain, rosa, sândalo

### Oud — O Ouro Líquido
- Resina formada quando a árvore Aquilaria é infectada por fungo
- Cultivado vs Selvagem (selvagem é proibido em muitos países)
- CO2 supercrítico: alternativa mais sustentável

### Ambrette — Musk Natural
- Substituto ético do musk animal (almíscar de cervo)
- Fixador excepcional — prolonga qualquer perfume
- Aroma: almiscarado, levemente floral, pele limpa

### Ingredientes Tendência 2025-2026

| Ingrediente | Tendência |
| Café CO2 | Gourmand sofisticado, não infantil |
| Cacau Absoluto | Chocolate rico, fundo quente |
| Matcha CO2 | Minimalismo japonês |
| Fava Tonka | Cumarina natural, substituto natural |
| Sálvia Esclareia | Ambroxan natural, fixador |

### Como Usar Ingredientes Caros

1. **Diluir a 10%** em álcool ou jojoba antes de usar
2. **Usar como "toque final"** — 2-5% na fórmula
3. **Estender** com ingredientes similares mais baratos
4. **Tintura**: macerar resinas em álcool (oud, benjoim, baunilha)`,
        quiz: [
          { pergunta: "Qual ingrediente natural substitui o musk animal?", opcoes: ["Oud", "Ambrette (semente)", "Labdanum", "Olíbano"], respostaCorreta: 1, explicacao: "A semente de ambrette é o substituto natural e ético do musk animal (almíscar de cervo)." },
          { pergunta: "Por que a rosa otto é tão cara?", opcoes: ["É sintética", "4 toneladas de pétalas produzem 1 kg de óleo", "Só existe 1 plantação", "É difícil de armazenar"], respostaCorreta: 1, explicacao: "São necessárias 4 toneladas de pétalas para produzir apenas 1 kg de rosa otto." }
        ],
        checklist: [
          "Conhecer preços dos 5 ingredientes mais caros",
          "Criar diluição a 10% de rosa ou jasmim para prática",
          "Explorar ingredientes tendência (café CO2, fava tonka)",
          "Fazer tintura de baunilha em álcool (projeto 4 semanas)"
        ]
      }
    ]
  },

  // ─── MÓDULO 3 ── Técnicas de Formulação ──────────────────────
  {
    titulo: "3. Técnicas de Formulação & Criação",
    descricao: "Acordes, proporções, maceração, formatos alternativos e famílias criativas",
    icone: "Target",
    cor: "from-purple-50 to-pink-50",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "Acordes e Harmonias Olfativas",
        descricao: "Construindo combinações que criam aromas novos e biblioteca pessoal",
        duracaoMinutos: 22,
        conteudo: `# Acordes: Construindo Harmonias

## A Base da Criação

> **Um bom acorde: nenhum ingrediente individual reconhecível — apenas o conjunto.**

### Técnica de Construção
1. **Nota principal** (40-50%): define o caráter
2. **Nota de apoio** (25-35%): reforça e complementa
3. **Nota de contraste** (15-25%): adiciona interesse

### Acordes Clássicos

| Acorde | Fórmula |
| Rosa Natural | Gerânio 40% + Palmarosa 30% + Ylang 20% + Patchouli 10% |
| Âmbar | Baunilha 30% + Benjoim 30% + Labdanum 20% + Vetiver 20% |
| Verde Fresco | Gálbano 20% + Petitgrain 40% + Alecrim 30% + Gerânio 10% |
| Couro | Cedro 30% + Bétula 25% + Labdanum 25% + Olíbano 20% |
| Mel/Cera | Benjoim 35% + Ylang 30% + Rosa 20% + Baunilha 15% |

### Criação por Família

**Cologne Natural**: Bergamota 25% + Limão 10% + Petitgrain 5% + Néroli 15% + Lavanda 10% + Gerânio 5% + Vetiver 15% + Cedro 10% + Benjoim 5%

**Floral Moderno**: Néroli 35% + Lavanda 30% + Cedro 35%

**Gourmand Sofisticado**: Bergamota 15% + Mandarina 5% + Canela 5% + Cardamomo 10% + Ylang 10% + Rosa 5% + Baunilha CO2 20% + Tonka 15% + Benjoim 10% + Patchouli 5%

### Biblioteca Pessoal
- Preparar cada acorde em 5 ml com rótulo (data + composição)
- Maturar 48h antes de avaliar
- Reavaliar em 1 semana — anotar evolução`,
        quiz: [
          { pergunta: "O que caracteriza um bom acorde?", opcoes: ["Todos ingredientes reconhecíveis", "Nenhum ingrediente reconhecível — apenas o conjunto", "Máximo 2 ingredientes", "Apenas notas de topo"], respostaCorreta: 1, explicacao: "Um acorde bem construído funde ingredientes criando nota nova e coesa." }
        ],
        checklist: [
          "Criar 5 acordes clássicos (5 ml cada)",
          "Maturar 48h e reavaliar cada um",
          "Iniciar biblioteca pessoal de acordes rotulados",
          "Formular perfume completo usando 2 acordes como base"
        ]
      },
      {
        titulo: "Fórmulas, Proporções e Maceração",
        descricao: "Sistema de gotas, concentrações, escala de produção e o tempo como ingrediente",
        duracaoMinutos: 22,
        conteudo: `# Fórmulas, Proporções e Maceração

## Sistema de Gotas

- 1 ml ≈ 20 gotas  |  5 ml = 100 gotas
- Concentração 15%: 15 gotas blend + 85 gotas álcool

### Concentrações

| Tipo | Blend % | Duração |
| Eau Fraîche | 1-3% | 1-2h |
| Eau de Cologne | 3-5% | 2-3h |
| Eau de Toilette | 5-15% | 3-5h |
| Eau de Parfum | 15-20% | 5-8h |
| Extrait | 20-30% | 8-12h+ |

### Escalando Fórmulas
- De 5 ml para 100 ml: multiplique por 20
- Sempre testar em 30 ml antes de produzir em volume
- Calcular custo: somar OEs + álcool + embalagem

### Cálculo de Custo (EdP 30 ml)

| Item | Faixa |
| Óleos essenciais | R$ 15-40 |
| Álcool cereais 95% | R$ 2-5 |
| Embalagem | R$ 8-15 |
| Mão de obra | R$ 10-20 |
| **Custo total** | **R$ 35-80** |
| **Varejo (markup 4x)** | **R$ 140-320** |

## Maceração — O Tempo como Ingrediente

### O que acontece
- Moléculas se ligam e criam novos compostos
- Notas ásperas se suavizam
- Álcool se integra ao blend

### Cronograma
- **48h**: avaliação inicial possível
- **1 semana**: mudanças perceptíveis
- **2-4 semanas**: maturação boa
- **3-6 meses**: perfeição (orientais e amadeirados)

### Condições Ideais
- Frasco escuro, fechado hermeticamente
- Temperatura 18-22°C constante
- Longe da luz solar
- Agitar suavemente 1x/semana`,
        quiz: [
          { pergunta: "Quantas gotas para 5 ml a 15% de concentração?", opcoes: ["5", "15", "50", "100"], respostaCorreta: 1, explicacao: "5 ml = 100 gotas. 15% = 15 gotas de blend + 85 de álcool." },
          { pergunta: "Tempo mínimo de maceração para avaliação?", opcoes: ["1 hora", "24h", "48h", "1 semana"], respostaCorreta: 2, explicacao: "48h é o mínimo para avaliação inicial. Ideal: 2-4 semanas." }
        ],
        checklist: [
          "Converter 3 receitas de gotas para ml",
          "Escalar fórmula de 5 ml para 30 ml",
          "Calcular custo de 3 perfumes criados",
          "Criar calendário de maceração",
          "Testar mesmo perfume em 48h, 1 sem e 4 sem"
        ]
      },
      {
        titulo: "Formatos Alternativos e Correção",
        descricao: "Perfumes sólidos, roll-ons, sachês e técnicas de refinamento de fórmulas",
        duracaoMinutos: 20,
        conteudo: `# Formatos Alternativos e Correção

## Além do Spray

### Perfume Sólido
- Cera de abelha 30 g + Óleo de jojoba 30 g + Blend 3-5 ml
- Derreter em banho-maria, misturar blend, despejar em lata

### Roll-on
- Óleo de jojoba ou coco fracionado
- Concentração 15-25%
- Maior fixação que spray — óleo retarda evaporação

### Sachê Perfumado
- Bicarbonato 50 g + Amido 50 g + Blend 2 ml + Flores secas

| Formato | Fixação | Portabilidade | Custo |
| Spray EdP | 5-8h | Média | Médio |
| Roll-on óleo | 6-10h | Alta | Baixo |
| Sólido cera | 3-6h | Muito alta | Baixo |

## Correção e Refinamento

### Problemas Comuns e Soluções

| Problema | Solução |
| Muito intenso | Diluir ou adicionar sândalo, cedro |
| Sem fixação | Adicionar vetiver, benjoim, ambrette |
| Desequilibrado | Ajustar proporções da pirâmide |
| Muito linear | Adicionar contraste (especiaria ou verde) |
| Aroma plano | Toque de cítrico ou especiaria |
| Notas conflitantes | Nota-ponte harmonizadora (gerânio, lavanda) |

### Método de Correção
1. Identificar problema (após 48h de maceração)
2. Hipótese de correção (1 mudança por vez)
3. Ajustar em incrementos de 1-2%
4. Maturar 48h e reavaliar

> **Regra de ouro: nunca faça mais de 2 ajustes simultâneos.**`,
        quiz: [
          { pergunta: "Qual formato tem maior fixação?", opcoes: ["Spray EdP", "Roll-on em óleo", "Sólido em cera", "Body mist"], respostaCorreta: 1, explicacao: "Roll-ons em óleo fixam 6-10h porque o óleo retarda a evaporação." },
          { pergunta: "Regra de ouro para corrigir perfume?", opcoes: ["Refazer do zero", "Máximo 2 ajustes simultâneos", "Diluir até resolver", "Adicionar mais ingredientes"], respostaCorreta: 1, explicacao: "Ajustes controlados — no máximo 2 mudanças por vez, com 48h entre testes." }
        ],
        checklist: [
          "Criar perfume sólido em lata",
          "Criar roll-on aromático 10 ml",
          "Comparar durabilidade dos 3 formatos",
          "Corrigir 1 perfume problemático documentando ajustes"
        ]
      }
    ]
  },

  // ─── MÓDULO 4 ── Projetos Práticos ───────────────────────────
  {
    titulo: "4. Projetos Práticos",
    descricao: "Perfume autoral, coleção para ocasiões, cliente fictício e recriação de clássico",
    icone: "Lightbulb",
    cor: "from-rose-50 to-pink-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Projeto: Assinatura Pessoal",
        descricao: "Crie seu perfume autoral que representa sua essência",
        duracaoMinutos: 28,
        conteudo: `# Projeto: Assinatura Pessoal

## Seu Perfume, Sua Identidade

### Etapa 1: Conceito (30 min)
- Que emoção quero evocar?
- Que memória quero despertar?
- 5-7 palavras-chave que me definem
- Referências: músicas, lugares, momentos

### Etapa 2: Moodboard (30 min)
- Cores, paisagens, texturas, referências artísticas
- Paleta olfativa desejada (famílias)

### Etapa 3: Seleção (1h)
- 8-12 óleos essenciais alinhados ao conceito
- Testar 3 acordes preliminares
- Definir família principal e nota de assinatura

### Etapa 4: Formulação (2h)
- Pirâmide detalhada (topo/coração/base)
- Fórmula inicial em 5 ml (100 gotas)
- Ficha técnica completa

### Etapa 5: Refinamento (4 semanas)
- Avaliar após 48h — ajustes se necessário
- Maturar 4 semanas
- Versão final em 30 ml

### Entrega
- [ ] 30 ml de perfume final maturado
- [ ] Ficha técnica completa com INCI
- [ ] História/conceito (150 palavras)
- [ ] Nome e identidade visual`,
        quiz: [
          { pergunta: "Primeira etapa para perfume de assinatura?", opcoes: ["Escolher óleos", "Definir conceito, emoção e palavras-chave", "Calcular proporções", "Comprar embalagens"], respostaCorreta: 1, explicacao: "Todo perfume começa com o conceito — emoção e identidade." }
        ],
        checklist: [
          "Definir conceito com 5-7 palavras-chave",
          "Criar moodboard visual",
          "Selecionar 8-12 OEs e testar 3 acordes",
          "Formular versão 5 ml com ficha técnica",
          "Maturar 4 semanas e criar versão final 30 ml"
        ]
      },
      {
        titulo: "Projeto: Linha para Ocasiões",
        descricao: "Mini-coleção de 3 perfumes coerentes com DNA olfativo",
        duracaoMinutos: 28,
        conteudo: `# Projeto: Linha para Ocasiões

## 3 Perfumes, 1 Identidade

### Os 3 Perfumes
1. **Dia a Dia** — fresco, versátil, escritório
2. **Trabalho/Social** — sofisticado, discreto
3. **Noite** — intenso, memorável, sensual

### Regra de Coerência
> **Use 2-3 ingredientes em comum** nos 3 perfumes — cria "DNA" olfativo da coleção.

Exemplo: Bergamota + Cedro em todos, variando dosagem e complementos.

### Requisitos
- 15 ml cada perfume
- Identidade visual comum (rótulos)
- Preço acessível (calcular custo)
- Maturação mínima: 2 semanas

### Sugestão de Estrutura

| Perfume | Topo | Coração | Base |
| Dia a Dia | Bergamota + Limão | Lavanda + Petitgrain | Cedro + Vetiver |
| Social | Bergamota + Grapefruit | Gerânio + Rosa | Cedro + Sândalo |
| Noite | Bergamota + Cardamomo | Ylang + Canela | Cedro + Baunilha + Patchouli |

### Entrega
- [ ] Mood board da coleção
- [ ] 3 perfumes formulados (15 ml cada)
- [ ] Nomes e descrições
- [ ] Rótulos com identidade visual comum
- [ ] Custo e preço calculados`,
        quiz: [
          { pergunta: "Como criar coerência em coleção?", opcoes: ["Mesmos ingredientes só mudando proporção", "2-3 ingredientes comuns como 'DNA'", "Todos da mesma família", "Mesma embalagem"], respostaCorreta: 1, explicacao: "2-3 ingredientes comuns em proporções diferentes criam assinatura sem tornar perfumes iguais." }
        ],
        checklist: [
          "Criar mood board da coleção",
          "Definir 2-3 ingredientes-DNA comuns",
          "Formular os 3 perfumes (5 ml teste → 15 ml final)",
          "Calcular custo total e preços de venda"
        ]
      },
      {
        titulo: "Projeto: Cliente Fictício e Recriação",
        descricao: "Briefing profissional sob encomenda e interpretação natural de clássicos",
        duracaoMinutos: 25,
        conteudo: `# Projeto Duplo: Cliente e Recriação

## Parte 1: Cliente Fictício

### Cenários (escolha 1)

**Cliente A**: Mulher, 35 anos, executiva. Quer poder e elegância. Florais modernos.
**Cliente B**: Homem, 28 anos, artista. Quer inspiração e natureza. Amadeirado-aromático.
**Cliente C**: Pessoa não-binária, 24 anos. Quer frescor e liberdade. Verde-terroso.

### Processo Profissional
1. Análise do briefing (quem é, o que quer, quando usa)
2. Proposta de conceito com moodboard
3. 2-3 variações (5 ml cada) para escolha
4. Apresentação argumentada

## Parte 2: Recriação de Clássico Natural

### Substitutos Naturais

| Sintético | Substituição Natural |
| Aldeído | Néroli + Petitgrain |
| Calone (aquático) | Lima + Gálbano + Vetiver |
| Musgo de carvalho | Patchouli + Vetiver + Cedro |
| Musk sintético | Semente de Ambrette |
| Ambroxan | Sálvia esclareia + Labdanum |

### Sugestões de Recriação

**Chanel Nº 5** → Ylang + Néroli + Rosa + Sândalo + Benjoim
**Dior Sauvage** → Bergamota + Lavanda + Pimenta + Cedro + Âmbar
**Tom Ford Black Orchid** → Patchouli + Baunilha + Cardamomo + Olíbano

> Objetivo: capturar o *espírito* do original, aceitando limitações naturais.

### Entrega
- [ ] 1 perfume para cliente fictício (15 ml) + proposta
- [ ] 1 recriação natural (30 ml) + análise comparativa`,
        quiz: [
          { pergunta: "Primeiro passo ao receber briefing de cliente?", opcoes: ["Misturar ingredientes", "Analisar perfil, preferências e ocasião", "Mostrar coleção pronta", "Perguntar orçamento"], respostaCorreta: 1, explicacao: "Análise profunda do briefing — entender quem é o cliente, preferências e contexto de uso." },
          { pergunta: "Objetivo ao recriar clássico em natural?", opcoes: ["Cópia exata", "Manter espírito e caráter, aceitando limitações", "Mesmos ingredientes", "Perfume diferente"], respostaCorreta: 1, explicacao: "Recriação busca capturar o espírito do original, aceitando limitações naturais." }
        ],
        checklist: [
          "Escolher 1 cliente fictício e analisar briefing",
          "Criar 2-3 variações (5 ml cada)",
          "Pesquisar pirâmide do perfume clássico escolhido",
          "Identificar substituições naturais",
          "Formular recriação e documentar diferenças"
        ]
      }
    ]
  },

  // ─── MÓDULO 5 ── Negócios & Certificação ─────────────────────
  {
    titulo: "5. Negócios, Regulamentação & Certificação",
    descricao: "Mercado, precificação, branding, ANVISA e certificação profissional",
    icone: "BarChart3",
    cor: "from-teal-50 to-cyan-50",
    nivel: "avancado",
    aulas: [
      {
        titulo: "Mercado e Precificação",
        descricao: "Números do mercado, nichos lucrativos, custos e estratégias de preço",
        duracaoMinutos: 18,
        conteudo: `# Mercado e Precificação

## Números 2026

| Dado | Valor |
| Mercado global perfumaria natural | US$ 5.2 bilhões |
| Crescimento anual | 12-15% |
| Brasil | 4º maior mercado do mundo |
| Disposição a pagar mais (clean beauty) | +25-40% |

### Nichos Lucrativos
- ✅ Perfumes terapêuticos (aromaterapia)
- ✅ Perfumes masculinos naturais
- ✅ Unissex / sem gênero
- ✅ Home fragrance (difusores, velas)
- ✅ Perfumes para casamentos (sob encomenda)

## Precificação

### Estrutura de Custo (EdP 30 ml)

| Item | Faixa |
| Óleos essenciais | R$ 15-40 |
| Álcool cereais 95% | R$ 2-5 |
| Embalagem (vidro + spray + caixa) | R$ 8-15 |
| Mão de obra | R$ 10-20 |
| **Custo total** | **R$ 35-80** |

### Fórmula de Preço
- **Varejo** = Custo × 4 (margem ~75%)
- **Atacado** = Custo × 2.5

### Estratégias por Faixa

| Faixa | Preço | Posicionamento |
| Premium | R$ 200-500/30ml | Ingredientes raros, experiência luxo |
| Acessível | R$ 80-180/30ml | Bons ingredientes, volume |
| Entrada | R$ 40-80/15ml | Roll-ons, descoberta |

### Kits (+40-60% ticket médio)
- Descoberta: 3×5ml = R$ 89,90
- Completo: 30ml + sólido + sachê = R$ 249,90
- Casamento: perfume noiva + noivo = R$ 399,90`,
        quiz: [
          { pergunta: "Markup padrão para varejo de perfumes artesanais?", opcoes: ["× 2", "× 3", "× 4", "× 6"], respostaCorreta: 2, explicacao: "Markup 4x (margem ~75%) cobre custos fixos, marketing e lucro." },
          { pergunta: "Consumidores clean beauty pagam quanto a mais?", opcoes: ["5-10%", "25-40%", "50-70%", "Nada a mais"], respostaCorreta: 1, explicacao: "Consumidores clean beauty pagam 25-40% a mais por ingredientes naturais." }
        ],
        checklist: [
          "Calcular custo real de 3 perfumes criados",
          "Definir preços com markup 4x",
          "Criar tabela: varejo, atacado e kits",
          "Identificar 3 nichos prioritários para atuação"
        ]
      },
      {
        titulo: "Branding e Marketing Digital",
        descricao: "Identidade de marca, embalagem sustentável e estratégias de venda",
        duracaoMinutos: 16,
        conteudo: `# Branding e Marketing Digital

## Elementos de Branding

- **Nome**: memorável, pronunciável, com significado
- **Logo**: simples, versátil, funciona em P&B
- **Paleta**: 3-5 cores alinhadas ao posicionamento
- **Tom de voz**: íntimo? Luxuoso? Acessível? Educativo?
- **Valores**: sustentabilidade, artesanal, transparência

### Embalagem Sustentável
- Vidro reutilizável com sistema de refil
- Papel reciclado ou plantável
- Kraft e materiais naturais
- Evitar plástico descartável

## Marketing Digital

### Instagram (80% das vendas artesanais!)
- Behind the scenes da criação
- Educação: ingredientes naturais, benefícios
- Depoimentos de clientes
- Reels 15-30s do processo

### Canais de Venda

| Canal | Potencial |
| Instagram Shopping | ✅ Principal (80%) |
| Feiras artesanais | ✅ Experiência sensorial |
| Spas e clínicas parceiras | ✅ Público qualificado |
| Site próprio | ✅ Autonomia |
| Elo7 / Etsy | ✅ Descoberta |

### Calendário de Conteúdo (modelo semanal)
- 2ª: Educativo (ingrediente da semana)
- 4ª: Behind the scenes (criação)
- 6ª: Depoimento ou resultado
- Sáb: Lifestyle / inspiração
- Stories diários: bastidor, enquetes, caixinha

> Autenticidade > Perfeição. Mostre o processo real.`,
        quiz: [
          { pergunta: "Principal canal de vendas para perfumaria artesanal?", opcoes: ["Farmácias", "Supermercados", "Instagram + feiras", "E-commerce próprio"], respostaCorreta: 2, explicacao: "Instagram é ~80% das vendas iniciais de perfumaria artesanal, complementado por feiras." }
        ],
        checklist: [
          "Definir nome, valores e tom de voz da marca",
          "Criar moodboard de identidade visual",
          "Planejar calendário de 1 mês (12 posts)",
          "Listar 5 parceiros potenciais (spas, clínicas, lojas)"
        ]
      },
      {
        titulo: "Regulamentação ANVISA e Certificação",
        descricao: "Normas sanitárias, rotulagem, testes obrigatórios e certificação Resinkra",
        duracaoMinutos: 18,
        conteudo: `# Regulamentação e Certificação

## ANVISA — Classificação

Perfumes = **Cosméticos Grau 1** (risco mínimo)
- Notificação obrigatória na ANVISA
- NÃO precisa de registro prévio (diferente de Grau 2)

### Rotulagem Obrigatória

| Item | Exemplo |
| Nome e marca | "Floresta — Eau de Parfum Natural" |
| INCI (ingredientes) | Alcohol, Cedrus atlantica oil... |
| Conteúdo líquido | 30 ml |
| Prazo de validade / PAO | 12M (12 meses após aberto) |
| CNPJ e endereço | Dados do fabricante |
| Lote | Lote 2026-001 |
| País de origem | Brasil |
| Avisos de segurança | "Evite exposição solar" |

### Testes Recomendados

| Teste | Descrição | Prazo |
| Estabilidade | Perfume estável por 90 dias | 90 dias |
| Compatibilidade | Perfume vs embalagem | 30 dias |
| Patch test (HRIPT) | Segurança dérmica | Sob demanda |
| Microbiológico | Contaminação | Lote |

### Certificações Voluntárias
- Vegano, Cruelty-free (SVB)
- Orgânico (IBD, ECOCERT)
- Natural (COSMOS, NATRUE)

### Boas Práticas de Fabricação
- ✅ Ambiente limpo e exclusivo
- ✅ Utensílios higienizados (álcool 70%)
- ✅ Certificados de origem de cada OE
- ✅ Registro de lotes (rastreabilidade)
- ✅ Armazenamento: escuro, 18-22°C

## Certificação Resinkra — Perfumaria Natural

### Requisitos
1. Conclusão de 100% das aulas
2. Aprovação nos quizzes de todos os módulos
3. Entrega dos 3 projetos práticos (assinatura, linha, recriação)
4. Compromisso com código de ética

### Benefícios
- Selo digital Resinkra para redes sociais
- Inclusão no diretório de profissionais certificados
- Acesso a atualizações por 12 meses
- Desconto em cursos avançados

> 🏆 Complete todos os módulos e projetos para desbloquear seu certificado digital de Alta Perfumaria Natural.`,
        quiz: [
          { pergunta: "Classificação ANVISA para perfumes?", opcoes: ["Medicamento", "Cosmético Grau 1", "Cosmético Grau 2", "Alimento"], respostaCorreta: 1, explicacao: "Perfumes são cosméticos Grau 1 — notificação obrigatória, sem registro prévio." },
          { pergunta: "Tempo mínimo do teste de estabilidade?", opcoes: ["7 dias", "30 dias", "90 dias", "1 ano"], respostaCorreta: 2, explicacao: "O teste de estabilidade verifica que o perfume se mantém estável por pelo menos 90 dias." }
        ],
        checklist: [
          "Estudar notificação ANVISA para cosméticos Grau 1",
          "Criar modelo de rótulo com todos campos obrigatórios",
          "Definir protocolo de boas práticas de fabricação",
          "Iniciar registro de lotes desde as primeiras produções",
          "Concluir 100% das aulas para certificação"
        ]
      }
    ]
  }
];
