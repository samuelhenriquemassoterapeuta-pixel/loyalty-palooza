import type { ModuloContent } from "@/features/cursos/data/cursoVendasContent";

export const cursoFitoterapiaAplicadaData: ModuloContent[] = [
  {
    titulo: "Fundamentos da Fitoterapia",
    descricao: "História, princípios ativos, formas de uso e legislação",
    icone: "Lightbulb",
    cor: "from-green-50 to-emerald-50",
    nivel: "iniciante",
    aulas: [
      { titulo: "História da Fitoterapia no Brasil e no Mundo", descricao: "Das civilizações antigas à era moderna", duracaoMinutos: 150, conteudo: "# História da Fitoterapia\n\nA fitoterapia acompanha a humanidade desde os primórdios...", quiz: [{ pergunta: "Qual a base da fitoterapia?", opcoes: ["Uso de minerais", "Uso de plantas medicinais", "Uso de fármacos sintéticos", "Uso de vitaminas"], respostaCorreta: 1, explicacao: "A fitoterapia é baseada no uso de plantas medicinais." }] },
      { titulo: "Princípios Ativos: Alcaloides, Flavonoides e Taninos", descricao: "Classes de compostos e suas ações terapêuticas", duracaoMinutos: 150, conteudo: "# Princípios Ativos\n\nOs princípios ativos são os responsáveis pelas ações terapêuticas..." },
      { titulo: "Formas de Uso: Chá, Tintura, Compressa e Cataplasma", descricao: "Técnicas de preparo e aplicação", duracaoMinutos: 150, conteudo: "# Formas de Uso\n\nCada forma de preparo extrai diferentes princípios ativos..." },
      { titulo: "Legislação e Boas Práticas de Manipulação", descricao: "Normas vigentes e segurança", duracaoMinutos: 150, conteudo: "# Legislação\n\nConhecer a legislação é fundamental para atuar de forma ética..." }
    ]
  },
  {
    titulo: "Principais Plantas Medicinais",
    descricao: "Anti-inflamatórias, relaxantes, analgésicas, cicatrizantes e digestivas",
    icone: "Heart",
    cor: "from-lime-50 to-green-50",
    nivel: "intermediario",
    aulas: [
      { titulo: "Plantas Anti-inflamatórias", descricao: "Arnica, calêndula e confrei", duracaoMinutos: 180, conteudo: "# Plantas Anti-inflamatórias\n\n## Arnica\nA arnica é uma das plantas mais conhecidas..." },
      { titulo: "Plantas Relaxantes", descricao: "Camomila, melissa e erva-cidreira", duracaoMinutos: 180, conteudo: "# Plantas Relaxantes\n\nAs plantas relaxantes atuam no sistema nervoso..." },
      { titulo: "Plantas Analgésicas e Cicatrizantes", descricao: "Salgueiro-branco, babosa e copaíba", duracaoMinutos: 180, conteudo: "# Plantas Analgésicas e Cicatrizantes\n\nA natureza oferece diversas opções..." },
      { titulo: "Plantas para o Sistema Digestório", descricao: "Hortelã, gengibre e boldo", duracaoMinutos: 180, conteudo: "# Plantas Digestivas\n\nO sistema digestório se beneficia enormemente..." }
    ]
  },
  {
    titulo: "Preparações Fitoterápicas",
    descricao: "Técnicas de extração, óleos medicinais, compressas e conservação",
    icone: "Package",
    cor: "from-teal-50 to-cyan-50",
    nivel: "intermediario",
    aulas: [
      { titulo: "Técnicas de Extração", descricao: "Infusão, decocção e maceração", duracaoMinutos: 150, conteudo: "# Técnicas de Extração\n\nCada técnica extrai compostos diferentes..." },
      { titulo: "Preparo de Óleos Medicinais e Pomadas", descricao: "Formulações para uso na massagem", duracaoMinutos: 150, conteudo: "# Óleos Medicinais\n\nOs óleos medicinais são versáteis e potentes..." },
      { titulo: "Compressas Quentes e Frias", descricao: "Indicações e modo de preparo", duracaoMinutos: 150, conteudo: "# Compressas\n\nAs compressas são uma das formas mais antigas de tratamento..." },
      { titulo: "Conservação e Armazenamento", descricao: "Como preservar a qualidade dos fitoterápicos", duracaoMinutos: 150, conteudo: "# Conservação\n\nA correta conservação garante eficácia e segurança..." }
    ]
  },
  {
    titulo: "Integração com Massoterapia",
    descricao: "Protocolos fitoterápicos, óleos de massagem e recomendações pós-sessão",
    icone: "Target",
    cor: "from-emerald-50 to-green-50",
    nivel: "intermediario",
    aulas: [
      { titulo: "Protocolos Fitoterápicos por Condição", descricao: "Dores musculares, edema e estresse", duracaoMinutos: 90, conteudo: "# Protocolos Fitoterápicos\n\nA integração da fitoterapia à massagem potencializa resultados..." },
      { titulo: "Uso de Fitoterápicos Durante a Sessão", descricao: "Óleos de massagem enriquecidos", duracaoMinutos: 60, conteudo: "# Fitoterápicos na Sessão\n\nUtilizar óleos enriquecidos com princípios ativos..." },
      { titulo: "Recomendações Pós-Sessão", descricao: "Chás e compressas para o cliente levar", duracaoMinutos: 60, conteudo: "# Pós-Sessão\n\nOrientar o cliente sobre cuidados pós-sessão com fitoterápicos..." },
      { titulo: "Desenvolvimento de Linha Própria", descricao: "Criando produtos fitoterápicos para venda", duracaoMinutos: 90, conteudo: "# Linha Própria\n\nDesenvolver produtos é uma excelente forma de agregar valor..." }
    ]
  }
];
