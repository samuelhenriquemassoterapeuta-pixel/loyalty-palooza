import type { CursoModuloData } from "@/features/cursos/components/CursoShell";

export const cursoMassagemModeladoraData: CursoModuloData[] = [
  // ── Módulo 1: Fundação ──
  {
    titulo: "Módulo 1 — Fundação",
    descricao: "O universo da massagem modeladora",
    icone: "Lightbulb",
    cor: "from-amber-500/10 to-orange-500/10",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "1.1 O que é Massagem Modeladora",
        descricao: "Definição técnica, diferenças com drenagem linfática e benefícios",
        duracaoMinutos: 90,
        conteudo: `# O que é Massagem Modeladora

## Definição Técnica

A massagem modeladora é caracterizada por manobras rápidas e intensas sobre a pele, utilizando pressões por meio de movimentos de amassamento e deslizamento com o intuito de atingir as camadas mais profundas da pele.

> Diferente da drenagem linfática (que é suave e lenta), a modeladora atua com vigor para desmanchar a gordura guardada dentro das células.

As manobras rápidas desmancham a gordura guardada dentro das células, transportando as toxinas do corpo para a corrente sanguínea e eliminando-as pela urina e pelo suor.

## Massagem Modeladora vs. Drenagem Linfática

| Aspecto | Modeladora | Drenagem |
|---|---|---|
| Pressão | Firme, intensa, profunda | Leve, superficial |
| Ritmo | Rápido e vigoroso | Lento e repetitivo |
| Objetivo | Quebrar gordura, modelar | Eliminar líquidos e toxinas |
| Sensação | Pode ser desconfortável | Relaxante, suave |
| Resultado | Redução de medidas | Redução de inchaço |

## Benefícios

- **Redução de medidas** — Diminuição da circunferência corporal
- **Quebra de gordura localizada** — Ação mecânica sobre os adipócitos
- **Melhora da circulação sanguínea** — Ativa o fluxo sanguíneo local
- **Diminuição da celulite** — Atenua o aspecto de "casca de laranja"
- **Modelagem corporal** — Define a silhueta
- **Eliminação de toxinas** — Remove resíduos metabólicos
- **Ativação do metabolismo local** — Estimula a queima de gordura`,
        quiz: [
          {
            pergunta: "Qual a principal diferença entre massagem modeladora e drenagem linfática?",
            opcoes: ["Ambas usam pressão leve", "A modeladora usa pressão firme e ritmo rápido, a drenagem é suave e lenta", "Não há diferença significativa", "A drenagem é mais intensa"],
            respostaCorreta: 1,
            explicacao: "A modeladora usa pressão firme e ritmo rápido para atingir camadas profundas, enquanto a drenagem é suave e lenta.",
          },
        ],
      },
      {
        titulo: "1.2 O Tecido Adiposo",
        descricao: "Anatomia, fisiologia e formação da celulite",
        duracaoMinutos: 60,
        conteudo: `# O Tecido Adiposo: Anatomia e Fisiologia

## O que é Gordura Localizada

O tecido adiposo é composto por células chamadas adipócitos, que armazenam gordura como reserva energética. A gordura localizada ocorre quando há acúmulo excessivo dessas células em determinadas regiões do corpo.

## Tipos de Tecido Adiposo

| Tipo | Localização | Resposta à Modeladora |
|---|---|---|
| **Subcutâneo** | Logo abaixo da pele | Boa resposta |
| **Visceral** | Ao redor dos órgãos | Resposta limitada |

## Formação da Celulite (Fibroedema Geloide)

- **Grau 1** — Aspecto de "casca de laranja" visível apenas com compressão
- **Grau 2** — Ondulações visíveis em pé, sem compressão
- **Grau 3** — Ondulações visíveis deitada, com nódulos palpáveis

> A celulite é classificada em graus para orientar o protocolo de tratamento mais adequado.`,
        quiz: [
          {
            pergunta: "Qual tipo de tecido adiposo responde melhor à massagem modeladora?",
            opcoes: ["Visceral", "Subcutâneo", "Ambos igualmente", "Nenhum"],
            respostaCorreta: 1,
            explicacao: "O tecido adiposo subcutâneo, localizado logo abaixo da pele, é o principal alvo da massagem modeladora.",
          },
        ],
      },
      {
        titulo: "1.3 Mercado e Oportunidades",
        descricao: "O mercado de massagem modeladora no Brasil e perfil do consumidor",
        duracaoMinutos: 60,
        conteudo: `# O Mercado de Massagem Modeladora no Brasil

## Dados do Setor

- Brasil é o **4º maior mercado de beleza do mundo**
- Mercado movimenta **US$ 27 bilhões/ano**
- Projeção de **US$ 32 bilhões até 2027**
- **170 mil pequenos negócios** abertos em 2024
- **30 novas empresas por hora** no setor de beleza

## Salários

| Profissão | Salário-base médio |
|---|---|
| Massagista (geral) | R$ 2.612/mês |
| Massagista modeladora | R$ 2.000-3.500 |
| Esteticista | R$ 2.069/mês |

## Perfil do Consumidor

- **Mulheres 25-55 anos** — Pacotes de sessões
- **Pré-verão/Carnaval** — Promoções sazonais
- **Pós-parto** — Protocolos específicos
- **Noivas** — Pacotes especiais
- **Homens** — Crescente preocupação estética`,
        quiz: [
          {
            pergunta: "Qual a posição do Brasil no mercado mundial de beleza?",
            opcoes: ["1º lugar", "2º lugar", "4º lugar", "10º lugar"],
            respostaCorreta: 2,
            explicacao: "O Brasil ocupa a 4ª posição no ranking mundial de mercado de beleza, segundo dados do Sebrae/Abihpec.",
          },
        ],
      },
      {
        titulo: "1.4 Locais de Atuação Profissional",
        descricao: "Clínicas, spas, academias, atendimento domiciliar e franquias",
        duracaoMinutos: 30,
        conteudo: `# Locais de Atuação Profissional

| Local | Tipo de Atuação |
|---|---|
| **Clínicas de estética** | Procedimentos corporais |
| **Spas e resorts** | Tratamentos de bem-estar |
| **Academias** | Recuperação muscular e modelagem |
| **Hotéis** | Serviços para hóspedes |
| **Cruzeiros marítimos** | Atendimento a passageiros |
| **Franquias especializadas** | Fast Massagem |
| **Atendimento domiciliar** | Personalizado, conveniência |
| **Consultório próprio** | Autonomia, carteira de clientes |

> A franquia Fast Massagem inaugurou mais de 12 unidades em 12 meses e tem planos de chegar a 500 franquias até 2030.`,
      },
    ],
  },

  // ── Módulo 2: Anatomia e Fisiologia ──
  {
    titulo: "Módulo 2 — Anatomia e Fisiologia",
    descricao: "Anatomia aplicada à massagem modeladora",
    icone: "BookOpen",
    cor: "from-rose-500/10 to-pink-500/10",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "2.1 Anatomia da Pele",
        descricao: "Camadas da pele e relevância para a modeladora",
        duracaoMinutos: 90,
        conteudo: `# Anatomia da Pele e Tecido Subcutâneo

## Camadas da Pele

| Camada | Características | Relevância para Modeladora |
|---|---|---|
| **Epiderme** | Camada mais externa, avascular | Contato inicial, lubrificação |
| **Derme** | Fibras de colágeno e elastina | Manobras atingem esta camada |
| **Hipoderme** | Tecido adiposo, vasos sanguíneos | Principal alvo da modeladora |

> A hipoderme é o principal alvo da massagem modeladora, onde se concentram os adipócitos.`,
      },
      {
        titulo: "2.2 Músculos de Interesse",
        descricao: "Músculos-alvo para modelagem por região",
        duracaoMinutos: 90,
        conteudo: `# Músculos de Interesse para Modelagem

| Região | Músculos | Objetivo |
|---|---|---|
| **Abdômen** | Reto abdominal, oblíquos | Redução de gordura, definição |
| **Glúteos** | Glúteo máximo, médio, mínimo | Elevação, firmeza |
| **Coxas** | Quadríceps, posteriores, adutores | Redução de culotes e celulite |
| **Braços** | Tríceps, bíceps | Redução de flacidez |
| **Costas** | Latíssimo do dorso | Modelagem, redução de gorduras |`,
      },
      {
        titulo: "2.3 Fisiologia da Gordura",
        descricao: "Metabolismo dos adipócitos e ação sobre a celulite",
        duracaoMinutos: 60,
        conteudo: `# Fisiologia da Gordura Localizada

## Metabolismo dos Adipócitos

Os adipócitos armazenam triglicerídeos que podem ser mobilizados através de estímulos mecânicos e metabólicos. A massagem modeladora atua:

**1.** Quebra mecânica dos adipócitos (lipólise mecânica)
**2.** Liberação dos ácidos graxos na corrente sanguínea
**3.** Eliminação através do metabolismo hepático
**4.** Drenagem dos resíduos pelo sistema linfático

## Ação sobre a Celulite

- **Desfibrosamento** das bandas fibróticas
- **Estímulo circulatório** que melhora a nutrição tecidual
- **Ativação linfática** que elimina toxinas
- **Quebra de gordura** que reduz o volume dos adipócitos`,
        quiz: [
          {
            pergunta: "Qual o primeiro passo da ação da modeladora sobre a gordura?",
            opcoes: ["Drenagem linfática", "Quebra mecânica dos adipócitos", "Eliminação pela urina", "Relaxamento muscular"],
            respostaCorreta: 1,
            explicacao: "A massagem modeladora atua primeiro pela quebra mecânica dos adipócitos (lipólise mecânica).",
          },
        ],
      },
    ],
  },

  // ── Módulo 3: Princípios Técnicos ──
  {
    titulo: "Módulo 3 — Princípios Técnicos",
    descricao: "Fundamentos, manobras e preparação para atendimento",
    icone: "Target",
    cor: "from-violet-500/10 to-purple-500/10",
    nivel: "iniciante",
    aulas: [
      {
        titulo: "3.1 Princípios Fundamentais",
        descricao: "Pressão, ritmo, direção, intensidade e sequência",
        duracaoMinutos: 60,
        conteudo: `# Princípios Fundamentais

| Princípio | Descrição |
|---|---|
| **Pressão** | Firme e profunda, atingindo o tecido adiposo |
| **Ritmo** | Rápido e vigoroso |
| **Direção** | Movimentos centrípetos (em direção ao coração) |
| **Intensidade** | Suportável pelo cliente, sem dor excessiva |
| **Sequência** | Aquecimento → manobras profundas → relaxamento |`,
      },
      {
        titulo: "3.2 Tipos de Manobras",
        descricao: "Deslizamento, amassamento, rolamento, vibração e percussão",
        duracaoMinutos: 120,
        conteudo: `# Tipos de Manobras

## Deslizamento Profundo
Movimentos longos com a palma da mão, aplicando pressão firme. Objetivo: aquecer os tecidos.

## Amassamento (Petrissage)
Pegar, levantar e comprimir o tecido adiposo entre os dedos e a palma. Objetivo: quebrar células de gordura.

## Rolamento
"Rolar" a pele e o tecido subcutâneo entre os dedos. Objetivo: descolar aderências, melhorar circulação.

## Vibração
Movimentos rápidos de agitação com as mãos. Objetivo: estimular circulação, relaxar musculatura.

## Percussão
Toques rápidos e ritmados com a borda das mãos ou punhos. Objetivo: ativar circulação, estimular metabolismo local.`,
        quiz: [
          {
            pergunta: "Qual manobra tem como objetivo principal quebrar células de gordura?",
            opcoes: ["Deslizamento", "Amassamento (Petrissage)", "Vibração", "Percussão"],
            respostaCorreta: 1,
            explicacao: "O amassamento (petrissage) consiste em pegar, levantar e comprimir o tecido adiposo para quebrar as células de gordura.",
          },
        ],
      },
      {
        titulo: "3.3 Preparação para o Atendimento",
        descricao: "Organização do espaço, do profissional e protocolo de instalação",
        duracaoMinutos: 60,
        conteudo: `# Preparação para o Atendimento

## Organização Física

| Item | Recomendação |
|---|---|
| **Maca** | Confortável, altura ajustável |
| **Temperatura** | 22-24°C |
| **Iluminação** | Adequada para visualização |
| **Materiais** | Toalhas, lençóis, cremes, óleos, gel |
| **Higiene** | Normas da vigilância sanitária |

## Preparação do Profissional

- Mãos higienizadas, unhas curtas, sem adornos
- Ginástica preparatória para aquecer as mãos
- Postura ergonômica para evitar lesões
- Vestuário confortável e profissional

## Protocolo de Instalação do Cliente

**1.** Recepção e acolhimento
**2.** Anamnese (coleta de informações)
**3.** Exame físico (avaliação visual e tátil)
**4.** Explicação do procedimento
**5.** Registro fotográfico (com autorização)
**6.** Preparo e posicionamento na maca`,
        checklist: [
          "Maca preparada e higienizada",
          "Produtos verificados (validade e quantidade)",
          "Ficha de anamnese preenchida",
          "Autorização de registro fotográfico obtida",
          "Cliente orientado sobre sensações esperadas",
        ],
      },
    ],
  },

  // ── Módulo 4: Técnicas Passo a Passo ──
  {
    titulo: "Módulo 4 — Técnicas por Região",
    descricao: "Sequências passo a passo para cada região corporal",
    icone: "Target",
    cor: "from-emerald-500/10 to-teal-500/10",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "4.1 Membros Inferiores",
        descricao: "Coxas e glúteos: sequência completa de manobras",
        duracaoMinutos: 120,
        conteudo: `# Sequência para Membros Inferiores

## Coxas (anterior, posterior, interna e externa)

**1.** Aquecimento — Deslizamento suave com óleo (10x)
**2.** Deslizamento profundo — Palmas do joelho à virilha (10x)
**3.** Amassamento — Pegar e comprimir tecido adiposo (5-10 min)
**4.** Rolamento — Rolar pele entre os dedos (3-5 min)
**5.** Vibração — Agitação rápida (2 min)
**6.** Finalização — Deslizamento suave (5x)

## Glúteos

**1.** Aquecimento — Deslizamento circular (10x)
**2.** Amassamento profundo — Pegar e comprimir (5-8 min)
**3.** Deslizamento ascendente — Do glúteo à virilha (10x)
**4.** Percussão — Toques rítmicos (2 min)
**5.** Finalização — Deslizamento suave (5x)`,
        checklist: [
          "Aquecimento realizado antes das manobras profundas",
          "Direção centrípeta respeitada (em direção ao coração)",
          "Pressão ajustada ao limite de conforto do cliente",
          "Finalização com deslizamento suave",
        ],
      },
      {
        titulo: "4.2 Abdômen",
        descricao: "Sequência completa para região abdominal",
        duracaoMinutos: 90,
        conteudo: `# Sequência para Abdômen

**1.** Aquecimento — Deslizamento circular suave (10x)
**2.** Deslizamento profundo — Mãos do púbis ao tórax (10x)
**3.** Amassamento — Pegar e comprimir gordura abdominal (5-8 min)
**4.** Rolamento — Rolar pele (3-5 min)
**5.** Movimentos circulares — Dedos ao redor do umbigo (3 min)
**6.** Finalização — Deslizamento suave (5x)

> ⚠️ Atenção: Região abdominal é contraindicada em gestantes!`,
      },
      {
        titulo: "4.3 Membros Superiores",
        descricao: "Sequência para braços: redução do 'tchauzinho'",
        duracaoMinutos: 60,
        conteudo: `# Sequência para Membros Superiores

**1.** Aquecimento — Deslizamento suave (5x)
**2.** Deslizamento profundo — Do cotovelo à axila (10x)
**3.** Amassamento — Pegar e comprimir tríceps (3-5 min)
**4.** Torções — Movimentos de torção suaves (2-3 min)
**5.** Finalização — Deslizamento suave (5x)

> Foco na parte posterior do braço (tríceps), onde se concentra a flacidez.`,
      },
      {
        titulo: "4.4 Costas",
        descricao: "Sequência para região dorsal e lombar",
        duracaoMinutos: 60,
        conteudo: `# Sequência para Costas

**1.** Aquecimento — Deslizamento longo (10x)
**2.** Deslizamento profundo — Da lombar aos ombros (10x)
**3.** Amassamento — Em áreas com gordura localizada (3-5 min)
**4.** Rolamento — Rolar pele (3 min)
**5.** Finalização — Deslizamento suave (5x)`,
      },
    ],
  },

  // ── Módulo 5: Técnicas Combinadas ──
  {
    titulo: "Módulo 5 — Técnicas Combinadas",
    descricao: "Dreno-modeladora, lipo manual e fast detox",
    icone: "Target",
    cor: "from-cyan-500/10 to-blue-500/10",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "5.1 Dreno-Modeladora",
        descricao: "Combinação de drenagem linfática com modeladora",
        duracaoMinutos: 90,
        conteudo: `# Dreno-Modeladora (Drenagem + Modelagem)

Envolve duas técnicas: massagem modeladora e drenagem linfática. A finalidade é drenar a linfa, diminuir retenção de líquidos, eliminar toxinas e reduzir medidas.

## Sequência Combinada

| Fase | Técnica | Duração | Objetivo |
|---|---|---|---|
| **1. Ativação linfática** | Drenagem suave dos gânglios | 10 min | Preparar sistema linfático |
| **2. Modelagem profunda** | Amassamento, rolamento | 30 min | Quebrar gordura |
| **3. Drenagem final** | Manobras suaves de drenagem | 10 min | Eliminar toxinas liberadas |

> Resultado esperado: Redução de medidas já na primeira sessão!`,
      },
      {
        titulo: "5.2 Lipo Manual",
        descricao: "Técnica exclusiva para gordura localizada e flacidez",
        duracaoMinutos: 60,
        conteudo: `# Lipo Manual

Técnica exclusiva que combina drenagem e modelagem ao mesmo tempo, proporcionando resultados imediatos na redução de medidas e modelagem corporal.

## Indicação
- Alto grau de flacidez
- Gordura localizada resistente
- Clientes que buscam resultados rápidos

## Características
- Manobras profundas e específicas
- Ação sobre a flacidez
- Resultados visíveis em poucas sessões`,
      },
      {
        titulo: "5.3 Fast Detox",
        descricao: "Combinação com manta térmica para potencializar resultados",
        duracaoMinutos: 60,
        conteudo: `# Fast Detox

Combinação da Lipo Manual com a Manta Térmica, que ajuda a reduzir medidas, melhorar a circulação e eliminar toxinas.

## Protocolo

**1.** Massagem modeladora (30 min)
**2.** Envolvimento em manta térmica (20 min)
**3.** Hidratação intensa
**4.** Repouso

## Benefícios
- Redução de medidas potencializada
- Diminuição da perda de colágeno
- Ativação eficiente da circulação sanguínea
- Estímulo ao sistema linfático`,
        quiz: [
          {
            pergunta: "Qual equipamento é combinado com a lipo manual no protocolo Fast Detox?",
            opcoes: ["Radiofrequência", "Manta térmica", "Ultrassom", "Criolipólise"],
            respostaCorreta: 1,
            explicacao: "O Fast Detox combina a Lipo Manual com a Manta Térmica para potencializar a eliminação de toxinas.",
          },
        ],
      },
    ],
  },

  // ── Módulo 6: Equipamentos e Acessórios ──
  {
    titulo: "Módulo 6 — Equipamentos",
    descricao: "Equipamentos eletrônicos, cosméticos e utensílios manuais",
    icone: "Package",
    cor: "from-indigo-500/10 to-blue-500/10",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "6.1 Equipamentos Eletrônicos",
        descricao: "Manta térmica, ultrassom, criolipólise, radiofrequência",
        duracaoMinutos: 60,
        conteudo: `# Equipamentos Eletrônicos

| Equipamento | Função | Indicação |
|---|---|---|
| **Manta térmica** | Aquecer, potencializar eliminação de toxinas | Fast Detox |
| **Ultrassom estético** | Quebrar células de gordura | Gordura localizada |
| **Criolipólise** | Resfriamento controlado | Áreas com mais de 2cm de adiposidade |
| **Radiofrequência** | Aquecimento profundo, colágeno | Flacidez, celulite |
| **Endermologia** | Sucção e rolamento mecânicos | Celulite, modelagem |

> **Lipo sem corte:** Procedimento não invasivo que utiliza ultrassom para quebrar células de gordura.`,
      },
      {
        titulo: "6.2 Cosméticos e Ativos",
        descricao: "Cafeína, centella, argilas e óleos essenciais",
        duracaoMinutos: 40,
        conteudo: `# Cosméticos e Ativos

| Ativo | Função | Indicação |
|---|---|---|
| **Cafeína** | Lipolítica, quebra de gordura | Redução de medidas |
| **Centella Asiática** | Estimula circulação | Celulite |
| **Carvão ativado** | Absorve toxinas | Desintoxicação |
| **Argilas** | Aquecimento, absorção de toxinas | Redução de medidas |
| **Óleos essenciais** | Aromaterapia, potencialização | Relaxamento |`,
      },
      {
        titulo: "6.3 Utensílios Manuais",
        descricao: "Rolos de madeira, ventosas, espátulas e pedi de silicone",
        duracaoMinutos: 20,
        conteudo: `# Utensílios Manuais

| Utensílio | Função |
|---|---|
| **Rolos de madeira** | Massagem modeladora, drenagem |
| **Ventosas** | Sucção localizada, ativação circulatória |
| **Espátulas** | Manobras específicas |
| **Pedi de silicone** | Deslizamento, amassamento |`,
      },
    ],
  },

  // ── Módulo 7: Celulite e Gordura Localizada ──
  {
    titulo: "Módulo 7 — Celulite e Gordura",
    descricao: "Fisiopatologia, protocolos por grau e por região",
    icone: "Target",
    cor: "from-pink-500/10 to-rose-500/10",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "7.1 Fisiopatologia da Celulite",
        descricao: "Fatores que contribuem para a formação da celulite",
        duracaoMinutos: 60,
        conteudo: `# Fisiopatologia da Celulite

A celulite é uma condição multifatorial:

| Fator | Contribuição |
|---|---|
| **Hormônios** | Estrógeno, insulina, tireoidianos |
| **Genética** | Predisposição familiar |
| **Circulação** | Má circulação local |
| **Estilo de vida** | Sedentarismo, alimentação inadequada |
| **Tecido conjuntivo** | Fibras colágenas enfraquecidas |`,
      },
      {
        titulo: "7.2 Protocolos para Celulite",
        descricao: "Protocolos específicos por grau de celulite",
        duracaoMinutos: 90,
        conteudo: `# Protocolos Específicos para Celulite

| Grau | Protocolo | Frequência |
|---|---|---|
| **Grau 1** | Modeladora + drenagem + ativos lipolíticos | 1-2x semana |
| **Grau 2** | Modeladora + ultrassom + radiofrequência | 2x semana |
| **Grau 3** | Abordagem combinada + orientação nutricional | 2-3x semana |`,
        quiz: [
          {
            pergunta: "Qual a frequência recomendada para celulite grau 3?",
            opcoes: ["1x por semana", "2-3x por semana", "Diariamente", "1x por mês"],
            respostaCorreta: 1,
            explicacao: "Celulite grau 3, com nódulos palpáveis, exige abordagem combinada com frequência de 2-3x por semana.",
          },
        ],
      },
      {
        titulo: "7.3 Protocolos por Região",
        descricao: "Técnicas mais eficazes para cada área do corpo",
        duracaoMinutos: 60,
        conteudo: `# Protocolos para Gordura Localizada

| Região | Técnicas Mais Eficazes |
|---|---|
| **Abdômen** | Lipo manual, ultrassom, criolipólise |
| **Flancos** | Modeladora intensa, criolipólise |
| **Culotes** | Dreno-modeladora, ultrassom |
| **Parte interna das coxas** | Modeladora + drenagem |`,
      },
    ],
  },

  // ── Módulo 8: Contraindicações e Cuidados ──
  {
    titulo: "Módulo 8 — Contraindicações",
    descricao: "Contraindicações absolutas, relativas e cuidados pós-sessão",
    icone: "Heart",
    cor: "from-red-500/10 to-orange-500/10",
    nivel: "intermediario",
    aulas: [
      {
        titulo: "8.1 Contraindicações Absolutas",
        descricao: "Condições que impedem a realização da massagem",
        duracaoMinutos: 40,
        conteudo: `# Contraindicações Absolutas

| Condição | Motivo |
|---|---|
| **Infecções ativas** | Risco de espalhar a infecção |
| **Febre** | Corpo em estado de infecção |
| **Trombose venosa profunda** | Risco de deslocar coágulos |
| **Câncer ativo** | Risco de disseminação |
| **Insuficiência cardíaca** | Sobrecarga do sistema |
| **Gestação (abdômen)** | Contraindicação absoluta |
| **Hérnias abdominais** | Risco de agravamento |

> ⚠️ Nunca realizar massagem modeladora na presença de qualquer contraindicação absoluta!`,
      },
      {
        titulo: "8.2 Contraindicações Relativas",
        descricao: "Condições que exigem avaliação e cuidados especiais",
        duracaoMinutos: 40,
        conteudo: `# Contraindicações Relativas

| Condição | Cuidado Necessário |
|---|---|
| **Hipertensão arterial** | Monitorar pressão, evitar estímulo excessivo |
| **Varizes** | Evitar manobras intensas sobre as varizes |
| **Hipotireoidismo** | Resultados podem ser mais lentos |
| **Uso de anticoagulantes** | Risco de hematomas |
| **Pele sensível** | Ajustar pressão |`,
      },
      {
        titulo: "8.3 Cuidados Pós-Sessão",
        descricao: "Orientações para o cliente após o atendimento",
        duracaoMinutos: 40,
        conteudo: `# Cuidados Pós-Sessão

| Recomendação | Motivo |
|---|---|
| **Ingerir bastante água** | Eliminar toxinas liberadas |
| **Evitar alimentos gordurosos** | Não sobrecarregar o organismo |
| **Não tomar banho quente** | Evitar vasodilatação excessiva |
| **Atividade física leve** | Potencializar resultados |
| **Alimentação equilibrada** | Resultados duradouros |`,
        checklist: [
          "Cliente orientado sobre hidratação pós-sessão",
          "Orientações alimentares fornecidas",
          "Próxima sessão agendada",
          "Registro fotográfico atualizado (se aplicável)",
        ],
      },
    ],
  },

  // ── Módulo 9: Anamnese ──
  {
    titulo: "Módulo 9 — Anamnese",
    descricao: "Avaliação completa do cliente e ficha de anamnese",
    icone: "MessageCircle",
    cor: "from-sky-500/10 to-cyan-500/10",
    nivel: "avancado",
    aulas: [
      {
        titulo: "9.1 Importância da Anamnese",
        descricao: "Por que avaliar antes de tratar",
        duracaoMinutos: 30,
        conteudo: `# Importância da Anamnese

A anamnese é fundamental para:

- Identificar necessidades individuais do cliente
- Garantir segurança no procedimento
- Personalizar o tratamento
- Documentar o histórico de saúde
- Estabelecer metas realistas

> Uma anamnese bem feita é a base de um tratamento eficaz e seguro.`,
      },
      {
        titulo: "9.2 Modelo de Ficha de Anamnese",
        descricao: "Ficha completa: identificação, saúde, hábitos, exame físico",
        duracaoMinutos: 90,
        conteudo: `# Modelo de Ficha de Anamnese para Modeladora

## Identificação
- Nome completo, idade, profissão, contato

## Histórico de Saúde
- Doenças pré-existentes e medicamentos
- Histórico de trombose e problemas cardíacos
- Problemas de pressão e tireoide
- Alergias

## Histórico do Tratamento
- Principal queixa e áreas a tratar
- Tratamentos anteriores
- Experiência prévia com modeladora

## Hábitos de Vida
- Alimentação, hidratação, atividade física
- Sono, estresse percebido (0-10)
- Tabagismo e álcool

## Exame Físico
- Altura, peso, IMC
- Gordura localizada (ausente/leve/moderada/intensa)
- Celulite (grau 1/2/3/ausente)
- Flacidez (ausente/leve/moderada/intensa)
- Dor à palpação

## Registro Fotográfico
- [ ] Frente
- [ ] Perfil direito
- [ ] Perfil esquerdo
- [ ] Costas
- [ ] Detalhes das áreas a tratar

## Plano de Tratamento
- Objetivos definidos
- Número de sessões sugerido (geralmente 10-12)
- Frequência (1-2x por semana)`,
        checklist: [
          "Ficha de identificação preenchida",
          "Histórico de saúde registrado",
          "Contraindicações verificadas",
          "Registro fotográfico realizado",
          "Plano de tratamento definido com o cliente",
        ],
      },
    ],
  },

  // ── Módulo 10: Ficha Técnica ──
  {
    titulo: "Módulo 10 — Ficha Técnica",
    descricao: "Modelo de ficha técnica do procedimento",
    icone: "BookOpen",
    cor: "from-slate-500/10 to-gray-500/10",
    nivel: "avancado",
    aulas: [
      {
        titulo: "10.1 Ficha Técnica do Procedimento",
        descricao: "Parâmetros essenciais da massagem modeladora",
        duracaoMinutos: 60,
        conteudo: `# Ficha Técnica do Procedimento

| Campo | Informação |
|---|---|
| **Nome** | Massagem Modeladora |
| **Objetivo** | Quebrar células de gordura, modelar silhueta |
| **Indicações** | Gordura localizada, celulite, flacidez |
| **Contraindicações** | Infecções, trombose, câncer, gestação |
| **Duração da sessão** | 45-60 minutos |
| **Frequência** | 1-2x por semana |
| **Número de sessões** | 10-12 sessões (mínimo) |
| **Materiais** | Maca, creme/gel, toalhas, lençóis |
| **Preparo** | Anamnese, explicar procedimento |
| **Pós-procedimento** | Hidratação, evitar gordura, atividade leve |
| **Resultados** | Redução de medidas, melhora da celulite |`,
      },
    ],
  },

  // ── Módulo 11: Ética e Biossegurança ──
  {
    titulo: "Módulo 11 — Ética e Biossegurança",
    descricao: "Princípios éticos, limites de atuação e biossegurança",
    icone: "Heart",
    cor: "from-amber-500/10 to-yellow-500/10",
    nivel: "avancado",
    aulas: [
      {
        titulo: "11.1 Princípios Éticos",
        descricao: "Beneficência, não-maleficência, autonomia e confidencialidade",
        duracaoMinutos: 40,
        conteudo: `# Princípios Éticos

| Princípio | Aplicação |
|---|---|
| **Beneficência** | Agir no melhor interesse do cliente |
| **Não-maleficência** | Conhecer contraindicações, não causar dano |
| **Autonomia** | Respeitar a decisão e limites do cliente |
| **Confidencialidade** | Manter sigilo das informações |
| **Competência** | Atuar dentro dos limites do conhecimento |`,
      },
      {
        titulo: "11.2 Limites de Atuação",
        descricao: "O que pode e o que não pode fazer um massoterapeuta",
        duracaoMinutos: 40,
        conteudo: `# Limites de Atuação Profissional

## PODE ✅
- Sugerir massagem para fins estéticos
- Oferecer sessões de modelagem
- Compartilhar experiências
- Recomendar produtos cosméticos
- Criar protocolos personalizados
- Orientar sobre hábitos saudáveis

## NÃO PODE ❌
- Diagnosticar doenças
- Prescrever tratamento médico
- Afirmar que cura doenças
- Substituir medicação
- Prometer resultados irreais
- Substituir orientação nutricional profissional`,
        quiz: [
          {
            pergunta: "O massoterapeuta pode diagnosticar doenças?",
            opcoes: ["Sim, se tiver experiência", "Não, nunca", "Apenas em casos leves", "Sim, com autorização do cliente"],
            respostaCorreta: 1,
            explicacao: "Diagnosticar doenças é atribuição exclusiva de médicos. O massoterapeuta atua apenas em procedimentos estéticos.",
          },
        ],
      },
      {
        titulo: "11.3 Biossegurança",
        descricao: "Higiene, EPIs e descarte de resíduos",
        duracaoMinutos: 40,
        conteudo: `# Biossegurança

| Item | Procedimento |
|---|---|
| **Higienização das mãos** | Antes e após cada atendimento |
| **EPIs** | Luvas descartáveis, máscara, avental |
| **Limpeza da maca** | Álcool 70% entre cada cliente |
| **Toalhas e lençóis** | Trocados a cada atendimento |
| **Produtos** | Verificar validade, não compartilhar |
| **Descarte de resíduos** | Seguir normas sanitárias |`,
        checklist: [
          "Mãos higienizadas antes do atendimento",
          "Maca limpa com álcool 70%",
          "Lençóis e toalhas trocados",
          "Validade dos produtos verificada",
          "EPIs utilizados quando necessário",
        ],
      },
    ],
  },

  // ── Módulo 12: Profissionalização ──
  {
    titulo: "Módulo 12 — Profissionalização",
    descricao: "Modelos de atuação, precificação e marketing",
    icone: "BarChart3",
    cor: "from-green-500/10 to-emerald-500/10",
    nivel: "avancado",
    aulas: [
      {
        titulo: "12.1 Modelos de Atuação",
        descricao: "Autônomo, clínica própria, franquia e parcerias",
        duracaoMinutos: 60,
        conteudo: `# Modelos de Atuação

| Modelo | Investimento | Retorno |
|---|---|---|
| **Autônomo domiciliar** | R$ 500-1.000 | R$ 2.000-4.000/mês |
| **Clínica própria** | R$ 20.000-50.000 | R$ 8.000-20.000/mês |
| **Franquia** | R$ 50.000-150.000 | Até R$ 200 mil/mês |
| **Parceria com clínicas** | R$ 2.000-5.000 | R$ 3.000-6.000/mês |

> A franquia Fast Massagem tem potencial de gerar até 35% de margem de lucro!`,
      },
      {
        titulo: "12.2 Precificação",
        descricao: "Custos, margem de lucro e tabela de preços de mercado",
        duracaoMinutos: 60,
        conteudo: `# Precificação

## Exemplo — Sessão de 60 min (25 sessões/mês)

| Item | Custo por Sessão |
|---|---|
| Aluguel | R$ 60,00 |
| Produtos | R$ 12,00 |
| Lavanderia | R$ 6,00 |
| Mão de obra | R$ 140,00 |
| Marketing | R$ 12,00 |
| **Total** | **R$ 230,00** |
| **Preço sugerido** | **R$ 280-350** |

## Tabela de Preços de Mercado

| Tipo de Sessão | Duração | Preço Médio |
|---|---|---|
| Modeladora localizada | 30-40 min | R$ 80-150 |
| Modeladora completa | 60 min | R$ 150-280 |
| Dreno-modeladora | 60 min | R$ 180-300 |
| Lipo manual | 60-75 min | R$ 200-350 |
| Fast Detox | 60-75 min | R$ 220-380 |
| Pacote 10 sessões | — | 15-25% desconto |`,
      },
      {
        titulo: "12.3 Marketing e Parcerias",
        descricao: "Estratégias de marketing digital, sazonalidade e parcerias",
        duracaoMinutos: 60,
        conteudo: `# Estratégias de Marketing

## Presença Online

| Canal | Estratégia | Frequência |
|---|---|---|
| **Instagram** | Antes/depois, vídeos, dicas | Diário |
| **WhatsApp Business** | Relacionamento, agendamentos | Diário |
| **Google Meu Negócio** | Busca local, avaliações | Sempre |
| **TikTok** | Vídeos rápidos de resultados | 3-5x semana |

## Sazonalidade

- Campanhas "Verão sem celulite"
- Promoções "Pré-Carnaval"
- Pacotes "Corpo de verão"

## Parcerias Estratégicas

| Parceiro | Abordagem |
|---|---|
| **Nutricionistas** | Indicação cruzada |
| **Personal trainers** | Pacotes para alunos |
| **Dermatologistas** | Indicação para pacientes |
| **Academias** | Serviço complementar |
| **Influenciadoras** | Sessões em troca de divulgação |`,
      },
      {
        titulo: "12.4 Atuação Multidisciplinar",
        descricao: "Colaboração com nutricionistas, personal trainers e fisioterapeutas",
        duracaoMinutos: 30,
        conteudo: `# Atuação Multidisciplinar

| Profissional | Como Colaborar |
|---|---|
| **Nutricionista** | Plano alimentar para potencializar resultados |
| **Personal trainer** | Exercícios específicos para manter resultados |
| **Fisioterapeuta** | Tratamento complementar para flacidez |
| **Psicólogo** | Abordagem da imagem corporal e autoestima |

> A atuação multidisciplinar potencializa os resultados e fideliza o cliente.`,
      },
    ],
  },

  // ── Módulo 13: Tendências ──
  {
    titulo: "Módulo 13 — Tendências e Inovações",
    descricao: "Tecnologia, sustentabilidade e nichos de crescimento",
    icone: "Lightbulb",
    cor: "from-fuchsia-500/10 to-pink-500/10",
    nivel: "avancado",
    aulas: [
      {
        titulo: "13.1 Tendências do Mercado",
        descricao: "Belez-IA, fast beauty, personalização e sustentabilidade",
        duracaoMinutos: 60,
        conteudo: `# Tendências para Ficar de Olho

| Tendência | Descrição | Oportunidade |
|---|---|---|
| **"Belez-IA"** | IA para diagnósticos personalizados | Avaliações precisas |
| **Tecnologia** | Espelhos inteligentes, apps de diagnóstico | Diferenciação |
| **Sustentabilidade** | Embalagens recicláveis, fórmulas limpas | Consumidor consciente |
| **"Fast Beauty"** | Serviços rápidos sem hora marcada | Modelo Fast Massagem |
| **Personalização** | 62% dos consumidores pagam mais | Protocolos individuais |`,
      },
      {
        titulo: "13.2 Oportunidades de Crescimento",
        descricao: "Nichos emergentes: público masculino, pós-operatório, eventos",
        duracaoMinutos: 60,
        conteudo: `# Oportunidades de Crescimento

| Nicho | Descrição | Público-alvo |
|---|---|---|
| **Massagem para homens** | Mercado em expansão | Homens 25-55 anos |
| **Pós-operatório** | Modeladora após liberação médica | Pacientes de cirurgia plástica |
| **Eventos corporativos** | Quick massagem em empresas | Funcionários |
| **Noivas** | Pacotes preparatórios | Mulheres noivas |

> O público masculino é um dos nichos de maior crescimento no setor de estética corporal.`,
        quiz: [
          {
            pergunta: "Qual percentual de consumidores pagam mais por produtos personalizados?",
            opcoes: ["30%", "45%", "62%", "80%"],
            respostaCorreta: 2,
            explicacao: "Pesquisas mostram que 62% dos consumidores estão dispostos a pagar mais por produtos e serviços personalizados.",
          },
        ],
      },
    ],
  },

  // ── Módulo 14: Bônus e Certificação ──
  {
    titulo: "Módulo 14 — Bônus e Certificação",
    descricao: "Material bônus, suporte pós-curso e certificação",
    icone: "GraduationCap",
    cor: "from-yellow-500/10 to-amber-500/10",
    nivel: "avancado",
    aulas: [
      {
        titulo: "14.1 Bônus Exclusivos",
        descricao: "Materiais complementares e recursos extras",
        duracaoMinutos: 30,
        conteudo: `# Bônus Exclusivos

| Bônus | Descrição |
|---|---|
| **Acesso vitalício** | Revisões e atualizações sempre disponíveis |
| **Grupo VIP de alunas** | Comunidade exclusiva |
| **Lista de fornecedores** | Produtos e equipamentos com qualidade garantida |
| **Planilha de custos** | Controle financeiro facilitado |
| **Modelos de anamnese** | Prontidão para atendimento |
| **Autorização de imagem** | Para divulgação de resultados |
| **Contrato de serviços** | Segurança jurídica |
| **Ebook de protocolos** | Técnicas complementares |`,
      },
      {
        titulo: "14.2 Suporte Pós-Curso",
        descricao: "Suporte digital permanente e comunidade de ex-alunos",
        duracaoMinutos: 30,
        conteudo: `# Suporte Pós-Curso

- **Suporte digital permanente** para esclarecimento de dúvidas com formadores
- Participação em grupos de ex-alunos com dicas exclusivas
- Campanhas especiais para ex-alunas
- Acesso a webinars e atualizações`,
      },
      {
        titulo: "14.3 Certificação",
        descricao: "Certificado de conclusão e seus usos profissionais",
        duracaoMinutos: 20,
        conteudo: `# Certificação

Ao finalizar o curso, o aluno recebe certificado de conclusão comprovando as habilidades adquiridas.

## O certificado pode ser usado para:

- ✅ Comprovar horas extracurriculares em faculdades
- ✅ Enriquecer currículo
- ✅ Aumentar chances de conseguir novo emprego
- ✅ Aumentar chances de promoção
- ✅ Comprovar conhecimentos na área
- ✅ Obter licenças e alvarás (conforme exigências municipais)

> 🏆 Parabéns! Profissional apto a realizar massagem modeladora com segurança, técnica apurada e visão de negócios.`,
      },
    ],
  },
];
