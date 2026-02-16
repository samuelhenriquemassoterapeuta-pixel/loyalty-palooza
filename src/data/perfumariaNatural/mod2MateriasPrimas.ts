import type { AulaContent, ModuloContent } from "./mod1Fundamentos";

export const mod2MateriasPrimas: ModuloContent = {
  titulo: "Matérias-Primas Naturais",
  descricao: "50 ingredientes detalhados: cítricos, florais, amadeirados",
  icone: "Heart",
  cor: "from-green-50 to-emerald-50",
  nivel: "iniciante",
  aulas: [
    {
      titulo: "Cítricos: Bergamota, Limão e Laranja",
      descricao: "Os 3 cítricos essenciais do perfumista natural",
      duracaoMinutos: 25,
      conteudo: `# Cítricos Essenciais: Bergamota, Limão e Laranja

## Os Pilares do Frescor

### BERGAMOTA (Citrus bergamia)

- **Origem**: Itália (Calábria), Costa do Marfim
- **Extração**: Prensagem a frio da casca
- **Perfil**: Cítrico brilhante, levemente floral, fresco, elegante, amargo
- **Volatilidade**: Topo (10-15min)
- **Componentes**: Limoneno (30-45%), Acetato de linalila (15-30%)
- **Uso**: 5-40% — base da Eau de Cologne, combina com tudo
- **Combina com**: lavanda, gerânio, jasmim, vetiver, patchouli, rosa

⚠️ FOTO-SENSIBILIZANTE (bergapteno) — usar versão FCF para pele!

**Aromaterapia**: Antidepressivo, ansiolítico, estimula confiança
**Preço**: R$ 40-60/10ml

> **Dica**: "Bergamota é o cítrico mais elegante. Dá sofisticação a qualquer fórmula."

### LIMÃO SICILIANO (Citrus limon)

- **Origem**: Sicília, Argentina, Brasil
- **Extração**: Prensagem a frio
- **Perfil**: Ácido, vibrante, limpo, mais agressivo que bergamota
- **Volatilidade**: Topo (5-10min) — mais fugaz que bergamota
- **Componentes**: Limoneno (60-70%), Citral (2-5%)
- **Uso**: 3-30% — dar brilho e "limpar" composições pesadas
- **Combina com**: grapefruit, laranja, alecrim, hortelã, lavanda, gengibre

⚠️ Foto-sensibilizante e pode irritar pele sensível em alta concentração

> **Dica**: "Use limão para 'acordar' uma fórmula. Se está muito doce ou pesada, 1-2% de limão traz leveza."

### LARANJA DOCE (Citrus sinensis)

- **Origem**: Brasil, Flórida (EUA), Espanha
- **Extração**: Prensagem a frio
- **Perfil**: Doce, solar, alegre, menos ácido que limão, levemente açucarado
- **Volatilidade**: Topo (10-20min)
- **Componentes**: Limoneno (90-95%)
- **Uso**: 5-25% — suavizar acidez, adicionar doçura natural
- **Combina com**: canela, cravo, cardamomo, baunilha, ylang ylang, cedro, néroli

**Curiosidade**: A árvore da laranja produz 3 OEs:
- Casca = Laranja doce
- Flor = Néroli
- Folhas = Petitgrain

✅ Muito seguro, um dos mais tolerados. Ok crianças >6 meses (0,5%)
**Preço**: R$ 15-25/10ml (mais acessível!)

> **Dica**: "Laranja arredonda fórmulas agressivas. Se sua colônia está muito cortante, adicione 5-10% de laranja."`,
      quiz: [
        {
          pergunta: "Qual cítrico é considerado o mais elegante e base da Eau de Cologne?",
          opcoes: ["Limão", "Laranja", "Bergamota", "Grapefruit"],
          respostaCorreta: 2,
          explicacao: "Bergamota é o cítrico mais elegante e sofisticado, sendo a base clássica da Eau de Cologne desde o século XVIII."
        },
        {
          pergunta: "A mesma árvore de laranja amarga produz quantos óleos essenciais diferentes?",
          opcoes: ["1", "2", "3", "4"],
          respostaCorreta: 2,
          explicacao: "A laranjeira amarga (Citrus aurantium) produz 3 OEs: casca = laranja, flores = néroli, folhas/galhos = petitgrain."
        }
      ],
      checklist: [
        "Comparar lado a lado: bergamota, limão e laranja — anotar diferenças",
        "Criar acorde cítrico simples misturando os 3 em proporções iguais",
        "Testar bergamota FCF vs bergamota normal (se disponível)",
        "Criar perfume 'Infância Feliz': laranja 40% + baunilha 30% + cedro 20% + benjoim 10%"
      ]
    },
    {
      titulo: "Cítricos: Grapefruit, Tangerina e Yuzu",
      descricao: "Cítricos modernos, sofisticados e tendência",
      duracaoMinutos: 25,
      conteudo: `# Cítricos Modernos: Grapefruit, Tangerina e Yuzu

### GRAPEFRUIT (Citrus paradisi)

- **Origem**: EUA (Flórida, Texas), Israel, Brasil
- **Perfil**: Amargo-doce, refrescante, efervescente, energizante
- **Volatilidade**: Topo (5-15min), muito projetivo
- **Componentes**: Limoneno (88-95%), Nootkatona (traços — dá amargo)
- **Uso**: 3-30% — frescor amargo sofisticado, perfumes unissex
- **Combina com**: hortelã, alecrim, néroli, cedro, cipreste, vetiver, patchouli

**Tipos**: Branco (suave, floral), Rosa (doce, frutal), Vermelho (intenso, amargo)

**Tendência**: Grapefruit é TENDÊNCIA em perfumaria natural moderna — colônias unissex, clean beauty!

**Aromaterapia**: Estimulante mental, melhora humor, auxilia emagrecimento
⚠️ Foto-sensibilizante — aguardar 12h ao sol
**Preço**: R$ 25-40/10ml

### TANGERINA (Citrus reticulata)

- **Origem**: Brasil, Itália, Argentina
- **Perfil**: Doce, infantil, alegre, menos ácido, nostálgico, "candy"
- **Volatilidade**: Topo (10-20min)
- **Componentes**: Limoneno (65-75%), Gama-terpineno (16-22%)
- **Uso**: 10-40% — perfumes infantis, gourmands frutais, doçura sem baunilha
- **Combina com**: baunilha, chocolate, ylang ylang, patchouli, benjoim

✅ Um dos mais seguros, seguro para bebês >3 meses (0,25%)
**Aromaterapia**: Calmante suave, alegria, auxilia sono agitado em crianças

> **Tangerina vs Mandarina**: Tangerina é mais doce e alaranjada; Mandarina é mais complexa e levemente floral.

**Preço**: R$ 20-35/10ml

### YUZU (Citrus junos)

- **Origem**: Japão, Coreia, China
- **Perfil**: Cítrico complexo (limão + mandarina + grapefruit), sofisticado, zen, verde, aquático
- **Volatilidade**: Topo (15-25min) — mais fixo que outros cítricos!
- **Componentes**: Limoneno (60-80%), Gama-terpineno (8-15%)
- **Uso**: 5-20% — perfumes de nicho, alta perfumaria, sofisticação cítrica
- **Combina com**: chá verde, gengibre, cedro, florais brancos delicados

💰💰💰 CARO! R$ 150-250/5ml (árvore leva 10+ anos para produzir)

**Tendência**: Yuzu está em ALTA na perfumaria de nicho — estética japonesa/minimalista, clean beauty!

**Aromaterapia**: Clareza mental, foco, sensação de limpeza`,
      quiz: [
        {
          pergunta: "Qual cítrico é considerado o mais seguro para bebês?",
          opcoes: ["Bergamota", "Limão", "Tangerina", "Grapefruit"],
          respostaCorreta: 2,
          explicacao: "Tangerina é um dos cítricos mais seguros, podendo ser usado em bebês > 3 meses na diluição de 0,25%."
        },
        {
          pergunta: "Qual cítrico está em alta na perfumaria de nicho com estética japonesa?",
          opcoes: ["Laranja", "Lima", "Yuzu", "Limão"],
          respostaCorreta: 2,
          explicacao: "Yuzu é tendência na perfumaria de nicho, associado à estética japonesa/minimalista e clean beauty."
        }
      ],
      checklist: [
        "Comparar 3 grapefruit (branco, rosa, vermelho) se disponível",
        "Criar perfume infantil: tangerina 50% + lavanda 30% + camomila 20%",
        "Se tiver yuzu, comparar com bergamota: anotar diferenças sutis",
        "Criar acorde 'cítrico moderno': grapefruit 40% + yuzu 30% + vetiver 30%"
      ]
    },
    {
      titulo: "Cítricos: Lima e Petitgrain",
      descricao: "O cítrico tropical e o segredo das colônias clássicas",
      duracaoMinutos: 20,
      conteudo: `# Lima e Petitgrain: Completando a Paleta Cítrica

### LIMA (Citrus aurantifolia)

- **Origem**: México, Peru, Brasil
- **Perfil**: Ácida, vibrante, fresca, verde — sensação de coquetéis e praia
- **Volatilidade**: Topo (5-10min), muito fugaz
- **Componentes**: Limoneno (45-60%), Gama-terpineno (10-15%)
- **Uso**: 3-20% — "coquetéis olfativos", perfumes masculinos frescos

**IMPORTANTE — Dois tipos:**
- **Lima prensada**: MUITO foto-sensibilizante ⚠️
- **Lima destilada**: Segura, sem furocumarinas ✅

> **Sempre use LIMA DESTILADA em produtos dérmicos!**

- **Combina com**: hortelã (mojito!), gengibre, vetiver, capim-limão

**Exercício criativo — "Caipirinha Olfativa":**
Lima destilada 40% + Vetiver 20% + Benjoim+Baunilha 30% + Hortelã 10%

**Preço**: R$ 30-50/10ml (prensada) | R$ 40-60/10ml (destilada)

### PETITGRAIN (Citrus aurantium — folhas)

- **Origem**: Paraguai, França, Egito
- **Extração**: Destilação a vapor das folhas e galhos
- **Perfil**: Cítrico-verde-amadeirado, mais complexo que cítricos prensados, fresco, elegante
- **Volatilidade**: CORAÇÃO (30-90min) — mais fixo que outros cítricos!
- **Componentes**: Acetato de linalila (40-60%), Linalol (20-30%)
- **Uso**: 5-30% — "cítrico que fica", dar profundidade a cítricos, fougère, chypre
- **Combina com**: lavanda, bergamota, gerânio, vetiver, musgo de carvalho

**Família da Laranja Amarga (mesma árvore!):**
🌳 Folhas/galhos = Petitgrain (mais barato)
🌸 Flores = Néroli (caro!)
🍊 Casca = Laranja amarga (raro)

✅ Muito seguro, sem foto-sensibilização, equilibrante nervoso
**Preço**: R$ 35-50/10ml (acessível!)

> **Dica**: "Petitgrain é o 'segredo' de muitas colônias clássicas. Dá estrutura e duração aos cítricos voláteis."

### Demonstração: Impacto do Petitgrain na Duração

**SEM petitgrain**: Bergamota 80% + Lavanda 10% + Vetiver 10% → Duração: 1-2h
**COM petitgrain**: Bergamota 50% + Petitgrain 20% + Lavanda 20% + Vetiver 10% → Duração: 3-4h!`,
      quiz: [
        {
          pergunta: "Qual é a diferença crucial entre lima prensada e destilada?",
          opcoes: [
            "Preço: destilada é mais cara",
            "Aroma: prensada é mais forte",
            "Segurança: prensada é foto-sensibilizante, destilada é segura para pele",
            "Cor: destilada é mais escura"
          ],
          respostaCorreta: 2,
          explicacao: "Lima prensada contém furocumarinas (foto-sensibilizantes), enquanto a destilada é segura para uso dérmico."
        },
        {
          pergunta: "Por que petitgrain é chamado de 'segredo das colônias clássicas'?",
          opcoes: [
            "Porque tem cheiro de colônia",
            "Porque é nota de coração que dá estrutura e duração aos cítricos voláteis",
            "Porque é muito barato",
            "Porque é raro e exclusivo"
          ],
          respostaCorreta: 1,
          explicacao: "Petitgrain é nota de coração (30-90min) que 'segura' os cítricos voláteis do topo, dando estrutura e durabilidade às colônias."
        }
      ],
      checklist: [
        "Testar impacto do petitgrain: criar colônia com e sem, comparar duração",
        "Criar 'Caipirinha Olfativa' com lima destilada",
        "Formular Eau de Cologne clássica: bergamota + néroli + petitgrain + limão + lavanda",
        "Comparar petitgrain com néroli: ambos da mesma árvore!"
      ]
    },
    {
      titulo: "Florais: Lavanda e Gerânio",
      descricao: "Os dois florais mais versáteis e acessíveis",
      duracaoMinutos: 25,
      conteudo: `# Florais Versáteis: Lavanda e Gerânio

### LAVANDA (Lavandula angustifolia)

- **Origem**: França (Provence — melhor), Bulgária, Inglaterra
- **Extração**: Destilação a vapor das flores
- **Perfil**: Floral, herbáceo, fresco, limpo, universalmente reconhecível
- **Volatilidade**: Coração (20-60min)
- **Componentes**: Linalol (25-35%), Acetato de linalila (25-35%)

**Tipos de Lavanda:**
- **Lavandula angustifolia** (True lavender): fina, floral, doce. Alta altitude (600m+). R$ 50-80/10ml
- **Lavandula latifolia** (Spike): mais canfórica, medicinal. R$ 25-40/10ml
- **Lavandin** (híbrido): mais canfórico, rendimento alto. R$ 20-35/10ml

- **Uso**: 5-50% — coração de fougère, aromáticos, equilibrante universal
- **Combina com**: bergamota, cedro, vetiver, sândalo, cravo, benjoim, gerânio, palmarosa

**Aromaterapia**: Calmante nº 1 mundial, ansiolítico, cicatrizante, anti-insônia
✅ Um dos mais seguros. Ok bebês >3 meses (0,5%)

> **Qualidade**: Busque "Lavande fine" ou "Altitude" no rótulo. Provence = padrão ouro

**Fórmula Clássica Fougère:**
Lavanda 40% + Bergamota 30% + Gerânio 15% + Vetiver 10% + Fava tonka 5%

> **Dica**: "Lavanda é universal. Se você só pudesse ter 1 óleo essencial, seria lavanda."

### GERÂNIO (Pelargonium graveolens)

- **Origem**: Egito, China, Madagascar, Reunião (Bourbon)
- **Extração**: Destilação a vapor
- **Perfil**: Rosa-verde-folhagem, "rosa do pobre" (substituto natural!), equilibrado, levemente mentolado
- **Volatilidade**: Coração (30-90min)
- **Componentes**: Citronelol (20-35%), Geraniol (15-25%), Linalol (3-15%)

**Tipos por origem:**
- **Egito**: Mais rosa, mais caro, preferido em perfumaria. R$ 60-90/10ml
- **China**: Mais mentolado, mais herbáceo. R$ 30-50/10ml
- **Bourbon** (Reunião): Muito fino, caro, doce
- **Madagascar**: Equilibrado, bom custo-benefício

- **Uso**: 5-30% — substituir rosa, "verde" a florais, arredondar fórmulas
- **Combina com**: rosa, lavanda, cítricos, palmarosa, patchouli, ylang ylang

**Aromaterapia**: Equilibrante hormonal, antidepressivo, regulador sebáceo
✅ Muito seguro. Evitar gestantes 1º trimestre (precaução)

> **Dica**: "Gerânio é coringa! Se sua fórmula está 'quebrada', adicione 5% de gerânio — ele arredonda e une as notas."

### Economia: Rosa com Gerânio

**Opção A** (só rosa): 100% Rosa absoluto — Custo: R$ 200/ml
**Opção B** (estendida): 50% Rosa + 30% Gerânio + 20% Palmarosa — Custo: R$ 120, resultado 80% similar!`,
      quiz: [
        {
          pergunta: "Qual é a diferença entre lavanda angustifolia e lavandin?",
          opcoes: [
            "São exatamente iguais",
            "Angustifolia é mais fina e floral; lavandin é híbrido mais canfórico e barato",
            "Lavandin é mais caro e melhor",
            "Angustifolia é mais forte e irritante"
          ],
          respostaCorreta: 1,
          explicacao: "Lavandula angustifolia (true lavender) é mais fina e floral, cultivada em altitude. Lavandin é um híbrido com rendimento maior, mais canfórico e mais barato."
        },
        {
          pergunta: "Como o gerânio ajuda a economizar em perfumaria?",
          opcoes: [
            "Substituindo todos os outros óleos",
            "Servindo como substituto acessível da rosa quando combinado com palmarosa",
            "Porque é o mais barato de todos",
            "Porque dura mais tempo na pele"
          ],
          respostaCorreta: 1,
          explicacao: "Gerânio + palmarosa criam um acorde que se aproxima da rosa a uma fração do custo (R$ 5/ml vs R$ 200/ml da rosa pura)."
        }
      ],
      checklist: [
        "Comparar lavanda angustifolia vs lavandin: anotar diferenças",
        "Testar gerânio Egito vs China (se disponível)",
        "Criar fougère clássico: lavanda 40% + bergamota 30% + gerânio 15% + vetiver 10% + tonka 5%",
        "Testar substituição rosa: gerânio 50% + palmarosa 50% vs rosa pura"
      ]
    },
    {
      titulo: "Florais: Ylang Ylang e Rosa",
      descricao: "O exótico narcótico e a rainha da perfumaria",
      duracaoMinutos: 25,
      conteudo: `# Florais Preciosos: Ylang Ylang e Rosa

### YLANG YLANG (Cananga odorata)

- **Origem**: Madagascar, Comores, Filipinas
- **Extração**: Destilação a vapor das flores (várias frações)
- **Perfil**: Floral intenso, doce, cremoso, exótico, narcótico, tropical, sensual
- **Volatilidade**: Coração-Fundo (2-6h)
- **Intensidade**: MUITO ALTA — usar com cautela!
- **Componentes**: Linalol (10-20%), Germacreno-D (15-25%)

**Frações (Graus) — durante a destilação:**
- **EXTRA** (1ª fração): mais fina, floral pura. Alta perfumaria. R$ 80-120/10ml
- **I** (2ª fração): equilibrada, bom custo-benefício. R$ 50-70/10ml
- **II** (3ª fração): mais amadeirada, perfumes masculinos. R$ 35-50/10ml
- **III** (última): pesada, sabonetes. R$ 20-30/10ml
- **COMPLETA**: todas misturadas. Aromaterapia. R$ 40-60/10ml

- **Uso**: 1-15% — CUIDADO! Pouco rende muito. Overdose = banana + náusea
- **Combina com**: rosa, jasmim, baunilha, vetiver, sândalo, bergamota, patchouli

**Aromaterapia**: Afrodisíaco, antidepressivo, reduz pressão arterial

> **REGRA CRÍTICA**: "Com ylang, SEMPRE menos é mais! Comece com 1-2% e aumente lentamente. Uma gota a mais pode arruinar toda a fórmula."

### ROSA (Rosa damascena / Rosa centifolia)

- **Origem**: Bulgária (Valle das Rosas), Turquia, Irã | Grasse, Marrocos

**Tipos:**
- **Rosa Damascena Absoluto** (Bulgária): Padrão ouro. Doce, frutada, mel. R$ 150-250/1ml (!!)
- **Rosa Centifolia Absoluto** (Grasse): Verde, empedrada, vintage. R$ 120-200/1ml
- **Rosa Otto/Attar** (destilada): Raríssimo, etéreo. R$ 300-500/1ml (!!!)
- **Rosa Mosqueta**: NÃO é aromático! É óleo vegetal para pele

- **Perfil**: Floral supremo, doce, empoeirado, mel, romântico, elegante
- **Volatilidade**: Coração-Fundo (1-6h)
- **Componentes**: Citronelol (30-40%), Geraniol (15-20%), Feniletilénico (2-5% — "alma da rosa")
- **Uso**: 2-20% — diluir primeiro! Muito cara, usar estrategicamente

**Diluição recomendada**: Criar 10% rosa em álcool/jojoba para facilitar dosagem

**SUBSTITUIR ROSA (economia):**
- 50% Gerânio Egito + 30% Palmarosa + 20% Rosa = Resultado 70% similar, custo 10x menor!

- **Combina com**: gerânio, palmarosa, patchouli, oud, sândalo, baunilha, jasmim
- **Aromaterapia**: Amor próprio, autoestima, feminino sagrado, antidepressivo
✅ Muito seguro. Pode usar em gestantes (diluído)

**Perfume Clássico de Rosa:**
Rosa 10% + Gerânio 20% + Palmarosa 10% + Bergamota 15% + Patchouli 10% + Benjoim 5% + Álcool 30%`,
      quiz: [
        {
          pergunta: "Por que ylang ylang deve ser usado com extrema cautela em perfumaria?",
          opcoes: [
            "Porque é tóxico",
            "Porque é muito caro",
            "Porque é extremamente intenso — overdose causa cheiro de banana e náusea",
            "Porque evapora muito rápido"
          ],
          respostaCorreta: 2,
          explicacao: "Ylang ylang é extremamente intenso. Em excesso (>15%) torna-se enjoativo com notas de banana. Sempre começar com 1-2%."
        },
        {
          pergunta: "Qual é a forma mais econômica de usar rosa em perfumaria?",
          opcoes: [
            "Usar rosa mosqueta como substituto",
            "Combinar gerânio + palmarosa + toque de rosa — resultado 70% similar a 10% do custo",
            "Usar rosa sintética",
            "Não usar rosa, substituir por lavanda"
          ],
          respostaCorreta: 1,
          explicacao: "A combinação gerânio (50%) + palmarosa (30%) + rosa (20%) cria um acorde rosado convincente por uma fração do custo da rosa pura."
        }
      ],
      checklist: [
        "Testar ylang ylang em 4 diluições: 1%, 5%, 10%, 20% — encontrar seu limite",
        "Testar rosa vs acorde gerânio+palmarosa às cegas",
        "Criar perfume floral com ylang ylang a no máximo 5%",
        "Formular perfume clássico de rosa com substituição econômica"
      ]
    },
    {
      titulo: "Florais: Jasmim, Néroli e Palmarosa",
      descricao: "Florais brancos sofisticados e a rosa econômica",
      duracaoMinutos: 25,
      conteudo: `# Florais Sofisticados: Jasmim, Néroli e Palmarosa

### JASMIM GRANDIFLORUM (Jasminum grandiflorum)

- **Origem**: Índia, Egito, Marrocos
- **Extração**: Absoluto (extração com solvente)
- **Perfil**: Floral branco, cremoso, indólico, sensual, noturno, narcótico
- **Volatilidade**: Coração-Fundo (2-8h)
- **Intensidade**: MUITO ALTA
- **Componentes**: Benzil acetato (25-35%), Indol (2-3%)

**INDOL: O "segredo" do jasmim**
- Em alta concentração: fecal, animalístico
- Em baixa concentração: sensual, narcótico, profundo
- Diferencia jasmim natural de sintético

- **Uso**: 2-15% (potente!) — diluir primeiro (10%)
- **Combina com**: rosa, ylang ylang, sândalo, baunilha, bergamota, tuberosa
- **Aromaterapia**: Antidepressivo potente, afrodisíaco, confiança
⚠️ Evitar gestantes (relaxante uterino)
**Preço**: R$ 180-300/1ml (!!!)

### JASMIM SAMBAC (Jasminum sambac) — DIFERENTE!

- **Perfil**: Floral branco VERDE, chá, fresco — mais leve, menos indólico
- **Sensação**: Jasmine tea, asiático, diurno vs Grandiflorum noturno
- **Uso**: 3-18% — florais frescos, temática asiática
- **Combina com**: chá verde, néroli, yuzu, gengibre
**Preço**: R$ 150-250/1ml

### NÉROLI (Citrus aurantium — flores)

- **Origem**: Túnesia, Marrocos, Egito, Itália
- **Extração**: Destilação a vapor das flores de laranja amarga
- **Perfil**: Floral branco, cítrico, fresco, luminoso, elegante, mel-claro
- **Volatilidade**: Coração (30min-2h)
- **Componentes**: Linalol (35-40%), Limoneno (15-20%)

**História**: Nome da Princesa de Nerola (Itália, 1600s), que perfumava suas luvas

- **Uso**: 5-25% — florais frescos, colônias sofisticadas, perfumes de noiva
- **Combina com**: bergamota, petitgrain, rosa, jasmim, lavanda, sândalo

**Economizar com néroli:**
- Puro: R$ 150-280/5ml (1 tonelada de flores = 1kg de óleo!)
- Estendido: Néroli 40% + Petitgrain 40% + Bergamota 20% = resultado 80% similar!

✅ Muito seguro. Ansiolítico potente. Ok gestantes

**Eau de Cologne Clássica:**
Bergamota 30% + Néroli 20% + Petitgrain 15% + Limão 10% + Lavanda 10% + Alecrim 5% + Cedro 5% + Vetiver 5%

### PALMAROSA (Cymbopogon martinii)

- **Origem**: Índia, Nepal, Brasil
- **Extração**: Destilação a vapor da planta
- **Perfil**: Rosa-verde-herbáceo, "rosa econômica", limpo, fresco
- **Volatilidade**: Coração (30-90min)
- **Componentes**: Geraniol (70-85%) — similar à rosa!
- **Uso**: 5-35% — substituto de rosa, frescor a florais pesados
- **Combina com**: gerânio, cítricos, lavanda, ylang ylang, cedro

✅ Muito seguro. Excelente para pele. Antibacteriano
**Preço**: R$ 35-55/10ml (BARATO!)

**O SEGREDO:**
Palmarosa 60% + Gerânio 40% = "Rosa Natural" por R$ 5/ml vs R$ 200/ml da rosa pura!

> **Dica de ouro**: "Palmarosa é o melhor amigo do perfumista natural com orçamento!"`,
      quiz: [
        {
          pergunta: "O que é indol no jasmim e por que é importante?",
          opcoes: [
            "Uma impureza que deve ser removida",
            "Uma molécula que em baixa dose dá sensualidade e em alta dose tem aspecto fecal",
            "O componente que dá a cor ao jasmim",
            "Um conservante natural"
          ],
          respostaCorreta: 1,
          explicacao: "O indol é o que torna o jasmim natural tão especial — em doses baixas dá profundidade e sensualidade, diferenciando-o do sintético."
        },
        {
          pergunta: "Qual a diferença principal entre jasmim grandiflorum e sambac?",
          opcoes: [
            "São idênticos",
            "Grandiflorum é noturno/cremoso/indólico; Sambac é diurno/verde/chá",
            "Sambac é mais caro",
            "Grandiflorum é verde e Sambac é doce"
          ],
          respostaCorreta: 1,
          explicacao: "Grandiflorum é noturno, cremoso e indólico (sedução). Sambac é diurno, verde, com aspecto de chá (jasmine tea asiático)."
        }
      ],
      checklist: [
        "Testar jasmim diluído a 1%, 5% e 10% — notar como o indol se comporta",
        "Comparar grandiflorum vs sambac (se disponível)",
        "Formular Eau de Cologne clássica com néroli",
        "Testar palmarosa como substituto de rosa: comparar às cegas",
        "Criar acorde 'rosa natural': palmarosa 60% + gerânio 40%"
      ]
    },
    {
      titulo: "Florais Raros e Especiais",
      descricao: "Tuberosa, osmanthus, mimosa e camomila romana",
      duracaoMinutos: 20,
      conteudo: `# Florais Raros e Especiais

### TUBEROSA (Polianthes tuberosa)

- **Perfil**: Floral branco INTENSÍSSIMO, cremoso, carnudo, narcótico, noturno
- **Volatilidade**: Fundo (4-12h+)
- **Intensidade**: EXTREMAMENTE ALTA — a mais forte dos florais
- **Uso**: 0,5-5% (!!!) — EXTREMA CAUTELA. Uma gota transforma toda a fórmula

> **"Tuberosa é o jasmim em esteróides"**

- **Overdose = DESASTRE**: 1-2% = sensual e belo | 5% = intenso mas OK | 10%+ = fecal e enjoativo
- **Combina com**: jasmim, ylang ylang, baunilha, vetiver, bergamota
**Preço**: R$ 200-350/1ml (!!!!!)

> **Dica**: "Use SEMPRE menos que acha necessário. Comece com 0,5%."

### OSMANTHUS (Osmanthus fragrans)

- **Origem**: China, Japão
- **Perfil**: Floral-frutal ÚNICO — damasco, pêssego, mel, couro suave, chá, suede
- **Volatilidade**: Coração-Fundo (2-6h)
- **Uso**: 2-10% — perfumes de nicho, complexidade frutal-floral, luxo asiático
- **Combina com**: jasmim sambac, chá verde, sândalo, benjoim
**Preço**: R$ 250-400/1ml (raríssimo!)

**Tendência**: Osmanthus em ALTA na perfumaria de nicho — alternativa luxuosa aos florais ocidentais

### MIMOSA (Acacia decurrens)

- **Origem**: Austrália, França (Grasse), Marrocos
- **Perfil**: Empedrado, mel, verde, irisado, luminoso, dourado, primaveril
- **Volatilidade**: Coração-Fundo (2-6h)
- **Componentes**: Anisaldeído (faceta empedrada)
- **Uso**: 5-20% — perfumes empedrados/vintage, primavera olfativa
- **Combina com**: violeta, íris, cítricos, mel (baunilha+benjoim)
**Preço**: R$ 120-200/1ml

### CAMOMILA ROMANA (Chamaemelum nobile)

- **Origem**: Inglaterra, França, Hungria
- **Perfil**: Herbáceo, maçã, doce, mel, feno — suave, reconfortante, infantil
- **Volatilidade**: Coração (30-90min)
- **Componentes**: Ésteres angélicos (80-90%)
- **Uso**: 5-25% — perfumes infantis/suaves, fragrâncias terapêuticas
- **Combina com**: lavanda, tangerina, baunilha, rosa

✅ Um dos mais seguros! Calmante infantil nº1. Ok >3 meses (0,25%)
**Preço**: R$ 80-120/5ml

**NOTA**: Camomila ALEMÃ (azuleno) é diferente — mais medicinal, cor azul, menos usada em perfumaria`,
      quiz: [
        {
          pergunta: "Qual é a concentração máxima segura de tuberosa em um perfume?",
          opcoes: ["20%", "10%", "5%", "0,5-5%"],
          respostaCorreta: 3,
          explicacao: "Tuberosa é extremamente intensa. A faixa segura é 0,5-5%. Acima de 5% o aroma se torna fecal e enjoativo."
        },
        {
          pergunta: "O que torna o osmanthus único entre os florais?",
          opcoes: [
            "É o mais barato",
            "Tem perfil frutal (damasco, pêssego) com facetas de couro e chá",
            "É o mais forte de todos",
            "Não tem aroma"
          ],
          respostaCorreta: 1,
          explicacao: "Osmanthus é único por combinar floral com frutal (damasco, pêssego), mel, couro suave e chá — complexidade incomum."
        }
      ],
      checklist: [
        "Criar diluições de tuberosa (0,5%, 2%, 5%) e identificar limite agradável",
        "Pesquisar osmanthus — onde encontrar no Brasil e preços",
        "Criar perfume infantil com camomila: camomila 30% + tangerina 40% + lavanda 30%",
        "Estudar florais raros e definir quais valem o investimento para seu kit"
      ]
    },
    {
      titulo: "Amadeirados: Cedro Atlas",
      descricao: "O fixador mais acessível e versátil da perfumaria",
      duracaoMinutos: 20,
      conteudo: `# Amadeirados: Cedro Atlas

### CEDRO ATLAS (Cedrus atlantica)

- **Origem**: Marrocos (Montanhas Atlas), Argélia
- **Extração**: Destilação a vapor da madeira
- **Perfil**: Amadeirado seco, resinoso, suave, limpo, lápis de cedro, serragem
- **Volatilidade**: Fundo (4-12h+) — EXCELENTE fixador
- **Componentes**: Cedreno (15-20%), Atlantona (5-10%)

**Tipos de Cedro:**
- **Cedro Atlas** (Cedrus atlantica): mais suave, resinoso. Preferido em perfumaria fina. R$ 35-55/10ml
- **Cedro Virgínia** (Juniperus virginiana): mais seco, lápis. Mais barato. R$ 25-40/10ml
- **Cedro Himalaia** (Cedrus deodara): mais doce, balsâmico. Raro. R$ 50-75/10ml

- **Uso**: 5-35% — base fundamental, fixador econômico, estrutura para cítricos
- **Combina com**: bergamota, lavanda, vetiver, patchouli, cítricos, especiarias

**Aromaterapia**: Enraizamento, força interior, meditação, expectorante, repelente natural
⚠️ Evitar gestantes (estrogênico suave)

> **Dica**: "Cedro é o fixador mais econômico! Se sua fórmula evapora rápido, adicione 10-20% de cedro. Problema resolvido por centavos."

### Perfume Masculino Clássico com Cedro

Bergamota 30% + Lavanda 25% + Cedro Atlas 20% + Vetiver 15% + Patchouli 10%
= Atemporal, elegante, masculino universal

### Outros Amadeirados Essenciais (referência)

- **Vetiver**: terroso, fumê, fixador por excelência. R$ 50-80/10ml
- **Patchouli**: terroso, doce, envelhecido melhora. R$ 40-65/10ml
- **Sândalo**: cremoso, lácteo, meditativo (Mysore = mais nobre). R$ 80-150/10ml
- **Pau-rosa**: rosado-amadeirado, suave (atenção sustentabilidade!). R$ 50-80/10ml

### Resinosos Complementares

- **Benjoim**: baunilha-quente, balsâmico, fixador. R$ 40-60/10ml
- **Olíbano (incenso)**: sagrado, meditativo, cítrico-resinoso. R$ 40-65/10ml
- **Mirra**: medicinal, fumê, amargor nobre. R$ 50-80/10ml
- **Labdanum**: âmbar-animalesco, quente, substituto do âmbar. R$ 60-90/10ml

### Acorde Âmbar Natural

O "âmbar" em perfumaria NÃO vem do âmbar fóssil — é um acorde:

**Âmbar Clássico**: Baunilha 30% + Benjoim 30% + Labdanum 20% + Vetiver 20%
**Âmbar Dourado**: Benjoim 35% + Incenso 25% + Baunilha 20% + Sândalo 20%

> **Dica**: Vetiver + Benjoim = combinação fixadora mais eficaz da perfumaria natural`,
      quiz: [
        {
          pergunta: "Qual é o fixador mais econômico e versátil da perfumaria natural?",
          opcoes: ["Sândalo", "Vetiver", "Cedro atlas", "Patchouli"],
          respostaCorreta: 2,
          explicacao: "Cedro atlas é o fixador mais econômico (R$ 35-55/10ml) e versátil — funciona com praticamente todas as famílias olfativas."
        },
        {
          pergunta: "O que é o 'âmbar' em perfumaria?",
          opcoes: [
            "Um óleo essencial extraído de resina fóssil",
            "Um acorde criado com baunilha, benjoim, labdanum e outros",
            "Uma molécula sintética",
            "Um tipo de madeira rara"
          ],
          respostaCorreta: 1,
          explicacao: "O âmbar em perfumaria é um acorde (combinação) de baunilha, benjoim, labdanum e outras resinas — não vem do âmbar fóssil."
        }
      ],
      checklist: [
        "Comparar cedro atlas vs cedro virgínia: anotar diferenças",
        "Criar perfume masculino clássico com cedro",
        "Formular acorde de âmbar natural em 2 variações",
        "Testar poder fixador: criar perfume com/sem cedro e comparar duração",
        "Estudar amadeirados e resinosos do kit: criar ficha para cada um"
      ]
    }
  ]
};
