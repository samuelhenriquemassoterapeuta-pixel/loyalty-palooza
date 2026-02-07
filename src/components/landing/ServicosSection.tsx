import { motion } from "framer-motion";
import { Clock, Percent, Leaf } from "lucide-react";
import { useServicos } from "@/hooks/useServicos";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

export const ServicosSection = () => {
  const { servicos, loading } = useServicos();

  return (
    <section id="servicos" className="py-20 lg:py-28 bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Leaf size={14} className="text-primary" />
            <span className="text-xs font-semibold text-primary">Nossos serviços</span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Terapias que{" "}
            <span className="font-serif italic text-gradient">transformam</span>
          </h2>
          <p className="mt-4 text-muted-foreground max-w-2xl mx-auto">
            Descubra nossas terapias naturais e ganhe cashback em cada sessão. 
            Seu bem-estar é recompensado.
          </p>
        </motion.div>

        {/* Services grid */}
        {loading ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-52 rounded-2xl bg-muted/50 animate-pulse" />
            ))}
          </div>
        ) : servicos.length > 0 ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {servicos.map((servico) => (
              <motion.div
                key={servico.id}
                variants={cardVariants}
                className="group card-organic hover-lift p-6 cursor-default"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                    <Leaf size={20} className="text-primary" />
                  </div>
                  {servico.cashback_percentual > 0 && (
                    <span className="pill text-[11px]">
                      <Percent size={10} />
                      {servico.cashback_percentual}% cashback
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-bold text-foreground mb-1">{servico.nome}</h3>
                {servico.descricao && (
                  <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                    {servico.descricao}
                  </p>
                )}

                <div className="flex items-center justify-between mt-auto pt-4 border-t border-border/50">
                  <div className="flex items-center gap-1.5 text-muted-foreground">
                    <Clock size={14} />
                    <span className="text-xs">{servico.duracao} min</span>
                  </div>
                  <span className="text-lg font-bold text-foreground">
                    R$ {servico.preco.toFixed(2).replace(".", ",")}
                  </span>
                </div>
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Serviços em breve disponíveis.</p>
          </div>
        )}
      </div>
    </section>
  );
};
