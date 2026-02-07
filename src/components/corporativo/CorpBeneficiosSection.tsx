import { motion } from "framer-motion";
import { 
  Heart, Brain, Shield, Clock, Smile, Activity 
} from "lucide-react";

const beneficios = [
  {
    icon: Brain,
    title: "Redução do estresse",
    description: "Sessões regulares de massoterapia reduzem cortisol em até 31%, melhorando foco e tomada de decisão.",
    stat: "-31% cortisol",
  },
  {
    icon: Activity,
    title: "Menos afastamentos",
    description: "Empresas com programas de bem-estar reportam redução de 25-40% em ausências por problemas musculoesqueléticos.",
    stat: "-34% ausências",
  },
  {
    icon: Smile,
    title: "Satisfação e retenção",
    description: "87% dos colaboradores consideram benefícios de bem-estar ao avaliar empregadores, aumentando a retenção de talentos.",
    stat: "87% valorizam",
  },
  {
    icon: Clock,
    title: "Produtividade elevada",
    description: "Estudos da American Massage Therapy Association mostram aumento de 15% na produtividade pós-sessão.",
    stat: "+15% produtividade",
  },
  {
    icon: Heart,
    title: "Saúde preventiva",
    description: "Previne lesões por esforço repetitivo (LER/DORT), reduzindo custos com saúde ocupacional a longo prazo.",
    stat: "Prevenção ativa",
  },
  {
    icon: Shield,
    title: "Conformidade NR-17",
    description: "Programas de ergonomia e massoterapia auxiliam no cumprimento da NR-17 (Ergonomia) do Ministério do Trabalho.",
    stat: "NR-17 compliant",
  },
];

export const CorpBeneficiosSection = () => {
  return (
    <section className="py-20 lg:py-28 bg-card/50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-2xl mx-auto mb-16"
        >
          <span className="pill mb-4 inline-flex">Por que investir?</span>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
            Benefícios{" "}
            <span className="font-serif italic text-gradient">comprovados</span>
          </h2>
          <p className="mt-4 text-muted-foreground">
            Dados reais de pesquisas sobre o impacto da massoterapia corporativa na saúde e produtividade.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {beneficios.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              className="card-organic hover-lift group"
            >
              <div className="flex items-start gap-4">
                <div className="shrink-0 p-2.5 rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                  <item.icon size={20} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                  <span className="mt-3 inline-block text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
                    {item.stat}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
