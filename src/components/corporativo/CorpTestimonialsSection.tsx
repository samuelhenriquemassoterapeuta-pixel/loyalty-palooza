import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    nome: "Fernanda Almeida",
    cargo: "Diretora de RH",
    empresa: "TechNova Solutions",
    depoimento: "Implementamos o programa da Resinkra há 6 meses e a satisfação dos colaboradores aumentou 40%. É o benefício mais elogiado da empresa.",
    estrelas: 5,
  },
  {
    nome: "Carlos Eduardo",
    cargo: "Gerente de People & Culture",
    empresa: "GreenLog Logística",
    depoimento: "Nossos operadores de CD tinham muitas queixas de dores. Depois da massoterapia semanal, os afastamentos caíram 32%. Resultado mensurável.",
    estrelas: 5,
  },
  {
    nome: "Mariana Santos",
    cargo: "Coordenadora de Eventos",
    empresa: "Celebrar Eventos",
    depoimento: "Contratamos a Resinkra para casamentos e eventos corporativos. Os convidados adoram! Virou nosso diferencial competitivo.",
    estrelas: 5,
  },
];

const logos = [
  "TechNova", "GreenLog", "Celebrar", "InnovaRH", "VidaPro", "WellCorp"
];

export const CorpTestimonialsSection = () => {
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-6 mb-16">
        {testimonials.map((t, index) => (
          <motion.div
            key={t.nome}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="card-organic hover-lift"
          >
            <div className="flex gap-1 mb-4">
              {Array.from({ length: t.estrelas }).map((_, i) => (
                <Star key={i} size={14} className="fill-warning text-warning" />
              ))}
            </div>
            <Quote size={20} className="text-primary/20 mb-3" />
            <p className="text-sm text-muted-foreground leading-relaxed italic mb-6">
              "{t.depoimento}"
            </p>
            <div className="border-t border-border/50 pt-4">
              <p className="font-semibold text-foreground text-sm">{t.nome}</p>
              <p className="text-xs text-muted-foreground">{t.cargo}</p>
              <p className="text-xs text-primary font-medium">{t.empresa}</p>
            </div>
          </motion.div>
        ))}
      </div>

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
        <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
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
