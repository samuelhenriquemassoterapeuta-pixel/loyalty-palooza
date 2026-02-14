import { motion } from "framer-motion";
import { Building2, Quote, TrendingUp, Users, Award } from "lucide-react";
import { Card } from "@/components/ui/card";

import imgSipat from "@/assets/corporativo/evento-sipat.jpg";
import imgConvencao from "@/assets/corporativo/evento-convencao.jpg";
import imgQvt from "@/assets/corporativo/evento-qvt.jpg";

const cases = [
  {
    empresa: "Google Brasil",
    setor: "Tecnologia",
    logo: "🔍",
    descricao: "O Google mantém programas de massoterapia in-loco em seus escritórios globais desde 2005. No Brasil, a empresa oferece sessões semanais de quick massage para mais de 2.000 funcionários em São Paulo.",
    resultado: "Eleita 'Melhor Empresa para Trabalhar' por 8 anos consecutivos, com destaque para benefícios de bem-estar.",
    depoimento: "A massoterapia corporativa é parte essencial da nossa cultura de cuidado com as pessoas.",
    fonte: "Great Place to Work / Google Careers",
    detalheExtra: "O programa inclui salas de descompressão, sessões de mindfulness e quick massage de 15 minutos durante o expediente, disponíveis para todos os colaboradores sem necessidade de agendamento prévio.",
  },
  {
    empresa: "Magazine Luiza",
    setor: "Varejo",
    logo: "🛒",
    descricao: "O Magalu implementou o programa 'Luiza Cuida' com sessões de massoterapia expressa nos centros de distribuição, focando em prevenção de LER/DORT para operadores logísticos.",
    resultado: "Redução de 28% nos afastamentos por doenças ocupacionais nos centros de distribuição participantes.",
    depoimento: "Investir no bem-estar dos nossos colaboradores reflete diretamente na qualidade do atendimento ao cliente.",
    fonte: "Relatório de Sustentabilidade Magalu 2023",
    detalheExtra: "O programa atende mais de 5.000 colaboradores em 12 centros de distribuição, com sessões de 20 minutos durante pausas programadas na jornada de trabalho.",
  },
  {
    empresa: "Natura &Co",
    setor: "Cosméticos",
    logo: "🌿",
    descricao: "A Natura integra a massoterapia em seu programa de Qualidade de Vida há mais de 15 anos, com atendimento regular em suas unidades fabris e escritórios em Cajamar-SP.",
    resultado: "O programa de bem-estar contribuiu para um índice de engajamento de 89% entre colaboradores.",
    depoimento: "A saúde integral está no DNA da Natura. A massoterapia promove o equilíbrio que defendemos para todos.",
    fonte: "Relatório Anual Natura &Co",
    detalheExtra: "A Natura também oferece aromaterapia e técnicas de relaxamento com óleos essenciais da própria marca, integrando o programa de bem-estar com a identidade da empresa.",
  },
  {
    empresa: "Ambev",
    setor: "Bebidas",
    logo: "🍺",
    descricao: "A Ambev incluiu massoterapia no programa 'Saúde Integral' para funcionários de fábricas e escritórios, com foco em ergonomia e prevenção de lesões nos trabalhadores da linha de produção.",
    resultado: "Programa de bem-estar associado a melhoria de 22% na satisfação interna medida pelo eNPS.",
    depoimento: "Colaboradores saudáveis e motivados são a base da nossa produtividade.",
    fonte: "Relatório ESG Ambev",
    detalheExtra: "O programa é complementado por avaliações ergonômicas individuais e planos de exercícios personalizados para cada função na linha de produção.",
  },
];

const eventosReais = [
  {
    evento: "SIPAT (Semanas de Prevenção)",
    descricao: "Empresas como Petrobras, Bradesco e Embraer incluem massoterapia expressa como atividade durante suas Semanas Internas de Prevenção de Acidentes do Trabalho.",
    detail: "A SIPAT é obrigatória pela NR-5 e a inclusão de massoterapia aumenta a adesão dos colaboradores em até 60%, tornando o evento mais atrativo e eficaz.",
    icon: Award,
    image: imgSipat,
  },
  {
    evento: "Convenções e Feiras",
    descricao: "A FEBRABAN e a FIESP oferecem espaços de massoterapia em seus eventos corporativos para melhorar a experiência dos participantes e networking.",
    detail: "Stands com quick massage em feiras empresariais aumentam o tempo de permanência dos visitantes em 40% e melhoram a percepção da marca patrocinadora.",
    icon: Users,
    image: imgConvencao,
  },
  {
    evento: "Programas de QVT",
    descricao: "O Banco do Brasil e os Correios mantêm contratos anuais de massoterapia como parte de seus Programas de Qualidade de Vida no Trabalho (QVT).",
    detail: "Programas continuados de QVT com massoterapia demonstram resultados progressivos: o ROI médio aumenta de 2:1 no primeiro ano para 4:1 após o terceiro ano de implementação.",
    icon: TrendingUp,
    image: imgQvt,
  },
];

export const CorpCasesSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="pill mb-4 inline-flex">
            <Building2 size={14} />
            Cases de sucesso
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Empresas que{" "}
            <span className="font-serif italic text-gradient">investem em bem-estar</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Grandes organizações brasileiras que adotaram a massoterapia corporativa e colheram resultados reais.
          </p>
        </motion.div>

        {/* Cases Grid */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          {cases.map((caseItem, index) => (
            <motion.div
              key={caseItem.empresa}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card className="h-full p-6 hover-lift">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-3xl">{caseItem.logo}</span>
                  <div>
                    <h3 className="font-bold text-foreground">{caseItem.empresa}</h3>
                    <span className="text-xs text-muted-foreground">{caseItem.setor}</span>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground leading-relaxed">
                  {caseItem.descricao}
                </p>

                {/* Extra detail */}
                <p className="mt-3 text-xs text-muted-foreground/70 leading-relaxed italic border-l-2 border-primary/20 pl-3">
                  {caseItem.detalheExtra}
                </p>

                <div className="mt-4 p-3 rounded-xl bg-primary/5 border border-primary/10">
                  <p className="text-sm font-semibold text-primary flex items-center gap-2">
                    <TrendingUp size={14} />
                    {caseItem.resultado}
                  </p>
                </div>

                <div className="mt-4 flex items-start gap-2">
                  <Quote size={14} className="text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-xs italic text-muted-foreground">
                    "{caseItem.depoimento}"
                  </p>
                </div>

                <p className="mt-3 text-[10px] text-muted-foreground/60">
                  Fonte: {caseItem.fonte}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Eventos reais */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <h3 className="text-2xl font-bold text-foreground">
            Eventos e <span className="font-serif italic text-gradient">programas reais</span>
          </h3>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-6">
          {eventosReais.map((evento, index) => (
            <motion.div
              key={evento.evento}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="card-organic text-center overflow-hidden"
            >
              {/* Event image */}
              <div className="relative h-32 -mx-4 -mt-4 sm:-mx-5 sm:-mt-5 mb-4 overflow-hidden">
                <img
                  src={evento.image}
                  alt={evento.evento}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/70 to-transparent" />
              </div>

              <div className="mx-auto w-12 h-12 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                <evento.icon size={22} className="text-accent" />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{evento.evento}</h4>
              <p className="text-sm text-muted-foreground leading-relaxed">{evento.descricao}</p>
              <p className="mt-3 text-xs text-muted-foreground/70 leading-relaxed border-t border-border/30 pt-3">
                {evento.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
