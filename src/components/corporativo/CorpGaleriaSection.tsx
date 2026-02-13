import { motion } from "framer-motion";
import { Camera } from "lucide-react";
import eventoCasamento from "@/assets/corporativo/evento-casamento.jpg";
import eventoDebutante from "@/assets/corporativo/evento-debutante.jpg";
import eventoFormatura from "@/assets/corporativo/evento-formatura.jpg";
import eventoEsportivo from "@/assets/corporativo/evento-esportivo.jpg";
import empresasInternacionais from "@/assets/corporativo/empresas-internacionais.jpg";

const fotos = [
  { src: eventoCasamento, label: "Casamentos" },
  { src: eventoDebutante, label: "Debutantes" },
  { src: eventoFormatura, label: "Formaturas" },
  { src: eventoEsportivo, label: "Eventos Esportivos" },
  { src: empresasInternacionais, label: "Corporativos" },
];

export const CorpGaleriaSection = () => {
  return (
    <section className="py-20 lg:py-28">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-12"
        >
          <span className="pill mb-4 inline-flex">
            <Camera size={14} />
            Galeria
          </span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Nossos{" "}
            <span className="font-serif italic text-gradient">momentos</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Registros dos nossos atendimentos em empresas e eventos especiais.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {fotos.map((foto, index) => (
            <motion.div
              key={foto.label}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="group relative aspect-[3/4] rounded-2xl overflow-hidden shadow-card"
            >
              <img
                src={foto.src}
                alt={foto.label}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <span className="absolute bottom-3 left-3 text-xs font-medium text-white/90">
                {foto.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
