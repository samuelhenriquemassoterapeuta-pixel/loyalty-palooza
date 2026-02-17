import { motion } from "framer-motion";
import { Quote, Star, TrendingUp, Users, Calendar } from "lucide-react";

const testimonials = [
  {
    nome: "Fernanda Almeida",
    cargo: "Diretora de RH",
    empresa: "TechNova Solutions",
    depoimento: "Implementamos o programa da Resinkra há 6 meses e a satisfação dos colaboradores aumentou 40%. É o benefício mais elogiado da empresa.",
    estrelas: 5,
    metrics: { satisfacao: "+40%", adesao: "92%", tempo: "6 meses" },
    detalhes: "O programa inclui sessões semanais de quick massage para 150 colaboradores, com agendamento via app. A adesão superou nossas expectativas desde o primeiro mês.",
  },
  {
    nome: "Carlos Eduardo",
    cargo: "Gerente de People & Culture",
    empresa: "GreenLog Logística",
    depoimento: "Nossos operadores de CD tinham muitas queixas de dores. Depois da massoterapia semanal, os afastamentos caíram 32%. Resultado mensurável.",
    estrelas: 5,
    metrics: { satisfacao: "-32% faltas", adesao: "88%", tempo: "1 ano" },
    detalhes: "Atendemos 3 centros de distribuição com 2 profissionais cada. A redução de afastamentos gerou economia de R$ 180 mil em custos de saúde ocupacional no primeiro ano.",
  },
  {
    nome: "Mariana Santos",
    cargo: "Coordenadora de Eventos",
    empresa: "Celebrar Eventos",
    depoimento: "Contratamos a Resinkra para casamentos e eventos corporativos. Os convidados adoram! Virou nosso diferencial competitivo.",
    estrelas: 5,
    metrics: { satisfacao: "98% NPS", adesao: "100%", tempo: "2 anos" },
    detalhes: "Já realizamos mais de 50 eventos juntos. A massoterapia é o ponto alto de toda festa, com feedback consistente dos convidados pedindo mais tempo de sessão.",
  },
  {
    nome: "Roberto Ferreira",
    cargo: "Diretor de Operações",
    empresa: "InnovaRH Consultoria",
    depoimento: "Como consultoria de RH, recomendamos a Resinkra para nossos clientes. O profissionalismo e a qualidade do serviço são excepcionais.",
    estrelas: 5,
    metrics: { satisfacao: "+35% retenção", adesao: "95%", tempo: "3 anos" },
    detalhes: "Já indicamos para mais de 20 empresas clientes. Todas reportam melhoria no clima organizacional e redução de turnover após 3 meses de programa contínuo.",
  },
];

const logos = [
  "TechNova", "GreenLog", "Celebrar", "InnovaRH", "VidaPro", "WellCorp", "Ambev", "Natura"
];

export const CorpTestimonialsSection = () => {
  return (
    <div>
      <div className="grid md:grid-cols-2 gap-6 mb-12">
        {testimonials.map((t, index) => (
          <motion.div
            key={t.nome}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card-organic hover-lift"
          >
            <div className="flex gap-1 mb-3">
              {Array.from({ length: t.estrelas }).map((_, i) => (
                <Star key={i} size={14} className="fill-warning text-warning" />
              ))}
            </div>
            <Quote size={18} className="text-primary/20 mb-2" />
            <p className="text-sm text-muted-foreground leading-relaxed italic mb-4">
              "{t.depoimento}"
            </p>

            {/* Metrics */}
            <div className="grid grid-cols-3 gap-2 mb-4 p-3 rounded-xl bg-muted/30 border border-border/30">
              <div className="text-center">
                <TrendingUp size={12} className="text-primary mx-auto mb-1" />
                <p className="text-xs font-bold text-primary">{t.metrics.satisfacao}</p>
                <p className="text-[10px] text-muted-foreground">Resultado</p>
              </div>
              <div className="text-center">
                <Users size={12} className="text-primary mx-auto mb-1" />
                <p className="text-xs font-bold text-primary">{t.metrics.adesao}</p>
                <p className="text-[10px] text-muted-foreground">Adesão</p>
              </div>
              <div className="text-center">
                <Calendar size={12} className="text-primary mx-auto mb-1" />
                <p className="text-xs font-bold text-primary">{t.metrics.tempo}</p>
                <p className="text-[10px] text-muted-foreground">Parceria</p>
              </div>
            </div>

            {/* Expanded detail */}
            <p className="text-xs text-muted-foreground/70 leading-relaxed border-l-2 border-primary/20 pl-3 mb-4">
              {t.detalhes}
            </p>

            <div className="border-t border-border/50 pt-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                {t.nome.charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">{t.nome}</p>
                <p className="text-xs text-muted-foreground">{t.cargo}</p>
                <p className="text-xs text-primary font-medium">{t.empresa}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Logos */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="text-center"
      >
        <p className="text-xs text-muted-foreground uppercase tracking-widest mb-6">
          Empresas que confiam na Resinkra
        </p>
        <div className="flex flex-wrap justify-center gap-4 lg:gap-6">
          {logos.map((logo) => (
            <div
              key={logo}
              className="px-5 py-2.5 rounded-xl bg-muted/50 border border-border/30 text-sm font-medium text-muted-foreground"
            >
              {logo}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};
