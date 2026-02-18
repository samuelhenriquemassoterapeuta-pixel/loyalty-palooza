import type { ModuloContent } from "@/features/cursos/data/cursoVendasContent";

export const cursoGestantesData: ModuloContent[] = [
  {
    titulo: "Fisiologia da Gestação",
    descricao: "Alterações hormonais, musculoesqueléticas e circulatórias",
    icone: "Heart", cor: "from-pink-50 to-rose-50", nivel: "iniciante",
    aulas: [
      { titulo: "Alterações Hormonais na Gestação", descricao: "Progesterona, relaxina e suas implicações", duracaoMinutos: 120, conteudo: "# Alterações Hormonais\n\nA gestação promove mudanças profundas..." },
      { titulo: "Alterações Musculoesqueléticas", descricao: "Lordose, diástase e dores pélvicas", duracaoMinutos: 120, conteudo: "# Sistema Musculoesquelético\n\nO corpo da gestante se adapta..." },
      { titulo: "Alterações Circulatórias e Edemas", descricao: "Retenção hídrica e varizes", duracaoMinutos: 120, conteudo: "# Alterações Circulatórias\n\nO volume sanguíneo aumenta..." },
      { titulo: "Desconfortos por Trimestre", descricao: "Mapeamento das queixas mais comuns", duracaoMinutos: 120, conteudo: "# Desconfortos por Trimestre\n\nCada fase da gestação apresenta..." }
    ]
  },
  {
    titulo: "Técnicas de Massagem na Gestação",
    descricao: "Posicionamento seguro, alívio de dores e drenagem",
    icone: "Target", cor: "from-rose-50 to-pink-50", nivel: "intermediario",
    aulas: [
      { titulo: "Posicionamento Seguro na Maca", descricao: "Decúbito lateral e uso de cunhas", duracaoMinutos: 180, conteudo: "# Posicionamento\n\nA segurança da gestante começa pelo posicionamento..." },
      { titulo: "Massagem para Dores Lombares e Pélvicas", descricao: "Técnicas de alívio eficazes", duracaoMinutos: 180, conteudo: "# Dores Lombares\n\nAs dores lombares são a queixa mais comum..." },
      { titulo: "Drenagem Linfática para Gestantes", descricao: "Redução de edemas com segurança", duracaoMinutos: 180, conteudo: "# Drenagem\n\nO edema gestacional responde muito bem..." },
      { titulo: "Relaxamento e Redução do Estresse", descricao: "Técnicas suaves para bem-estar emocional", duracaoMinutos: 180, conteudo: "# Relaxamento\n\nA massagem relaxante na gestação promove..." }
    ]
  },
  {
    titulo: "Cuidados no Pós-Parto",
    descricao: "Recuperação, amamentação e apoio emocional",
    icone: "Heart", cor: "from-purple-50 to-pink-50", nivel: "intermediario",
    aulas: [
      { titulo: "Recuperação Abdominal", descricao: "Fortalecimento do assoalho pélvico", duracaoMinutos: 120, conteudo: "# Recuperação\n\nO pós-parto exige cuidados específicos..." },
      { titulo: "Massagem e Amamentação", descricao: "Alívio de tensões durante a amamentação", duracaoMinutos: 120, conteudo: "# Amamentação\n\nAs tensões musculares durante a amamentação..." },
      { titulo: "Apoio Emocional e Prevenção de Depressão", descricao: "O papel do terapeuta no suporte emocional", duracaoMinutos: 120, conteudo: "# Apoio Emocional\n\nA depressão pós-parto afeta..." },
      { titulo: "Técnicas para Involução Uterina", descricao: "Massagens suaves para recuperação", duracaoMinutos: 120, conteudo: "# Involução Uterina\n\nA massagem pode auxiliar..." }
    ]
  },
  {
    titulo: "Segurança e Contraindicações",
    descricao: "Pontos de atenção, comunicação e termo de consentimento",
    icone: "BookOpen", cor: "from-red-50 to-rose-50", nivel: "intermediario",
    aulas: [
      { titulo: "Contraindicações Absolutas e Relativas", descricao: "Quando não massagear", duracaoMinutos: 60, conteudo: "# Contraindicações\n\nA segurança é prioridade absoluta..." },
      { titulo: "Termo de Consentimento e Equipe Multidisciplinar", descricao: "Documentação e comunicação", duracaoMinutos: 60, conteudo: "# Documentação\n\nO termo de consentimento é essencial..." }
    ]
  }
];
