import { motion } from "framer-motion";
import { 
  Heart, Brain, Shield, Clock, Smile, Activity 
} from "lucide-react";

import imgEstresse from "@/assets/corporativo/beneficio-estresse.jpg";
import imgAfastamentos from "@/assets/corporativo/beneficio-afastamentos.jpg";
import imgSatisfacao from "@/assets/corporativo/beneficio-satisfacao.jpg";
import imgProdutividade from "@/assets/corporativo/beneficio-produtividade.jpg";
import imgSaude from "@/assets/corporativo/beneficio-saude.jpg";
import imgNr17 from "@/assets/corporativo/beneficio-nr17.jpg";

const beneficios = [
  {
    icon: Brain,
    title: "Redução do estresse",
    description: "Sessões regulares de massoterapia reduzem cortisol em até 31%, melhorando foco e tomada de decisão.",
    detail: "A American Psychological Association aponta o estresse ocupacional como principal causa de absenteísmo. Programas de massoterapia in-loco oferecem alívio imediato, promovendo clareza mental e regulação emocional durante a jornada de trabalho.",
    stat: "-31% cortisol",
    image: imgEstresse,
  },
  {
    icon: Activity,
    title: "Menos afastamentos",
    description: "Empresas com programas de bem-estar reportam redução de 25-40% em ausências por problemas musculoesqueléticos.",
    detail: "Dores nas costas e LER/DORT são responsáveis por mais de 30% dos afastamentos no Brasil (dados INSS). A ginástica laboral e a massoterapia atuam diretamente na prevenção, reduzindo custos com saúde ocupacional.",
    stat: "-34% ausências",
    image: imgAfastamentos,
  },
  {
    icon: Smile,
    title: "Satisfação e retenção",
    description: "87% dos colaboradores consideram benefícios de bem-estar ao avaliar empregadores, aumentando a retenção de talentos.",
    detail: "Segundo a SHRM (Society for Human Resource Management), empresas com programas de bem-estar têm turnover 25% menor. O benefício de massoterapia é percebido como diferencial competitivo na atração de talentos.",
    stat: "87% valorizam",
    image: imgSatisfacao,
  },
  {
    icon: Clock,
    title: "Produtividade elevada",
    description: "Estudos da American Massage Therapy Association mostram aumento de 15% na produtividade pós-sessão.",
    detail: "Uma sessão de 15 minutos de quick massage é suficiente para restaurar o nível de atenção e reduzir a fadiga mental. O retorno sobre investimento (ROI) médio é de R$3 para cada R$1 investido em programas de bem-estar.",
    stat: "+15% produtividade",
    image: imgProdutividade,
  },
  {
    icon: Heart,
    title: "Saúde preventiva",
    description: "Previne lesões por esforço repetitivo (LER/DORT), reduzindo custos com saúde ocupacional a longo prazo.",
    detail: "O PCMSO (Programa de Controle Médico de Saúde Ocupacional) recomenda ações preventivas como a massoterapia. Empresas reportam economia média de 20% em planos de saúde após implementação de programas contínuos.",
    stat: "Prevenção ativa",
    image: imgSaude,
  },
  {
    icon: Shield,
    title: "Conformidade NR-17",
    description: "Programas de ergonomia e massoterapia auxiliam no cumprimento da NR-17 (Ergonomia) do Ministério do Trabalho.",
    detail: "A NR-17 estabelece parâmetros para adaptação das condições de trabalho. A massoterapia corporativa é uma ferramenta reconhecida para cumprimento dos itens de conforto e prevenção da norma regulamentadora.",
    stat: "NR-17 compliant",
    image: imgNr17,
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
              className="card-organic hover-lift group overflow-hidden"
            >
              {/* Image */}
              <div className="relative h-36 -mx-4 -mt-4 sm:-mx-5 sm:-mt-5 mb-4 overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
                <span className="absolute bottom-2 right-3 text-xs font-bold text-primary bg-card/90 backdrop-blur-sm px-2.5 py-1 rounded-full border border-primary/20">
                  {item.stat}
                </span>
              </div>

              <div className="flex items-start gap-3">
                <div className="shrink-0 p-2 rounded-xl bg-primary/10 group-hover:bg-primary/15 transition-colors">
                  <item.icon size={18} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-foreground text-sm">{item.title}</h3>
                  <p className="mt-1.5 text-xs text-muted-foreground leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Extended detail */}
              <p className="mt-3 text-xs text-muted-foreground/80 leading-relaxed border-t border-border/30 pt-3">
                {item.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
