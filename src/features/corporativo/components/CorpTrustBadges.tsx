import { motion } from "framer-motion";
import { ShieldCheck, Award, Clock, HeartHandshake } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "Profissionais certificados", desc: "CREFITO & ABM" },
  { icon: Award, label: "8+ anos de experiência", desc: "Corporativo & eventos" },
  { icon: Clock, label: "Atendimento em 24h", desc: "Resposta comercial rápida" },
  { icon: HeartHandshake, label: "98% de satisfação", desc: "Avaliação dos clientes" },
];

export const CorpTrustBadges = () => {
  return (
    <section className="py-12 border-y border-border/30 bg-muted/20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex items-center gap-3 justify-center text-center lg:text-left lg:justify-start"
            >
              <div className="shrink-0 p-2 rounded-xl bg-primary/10">
                <badge.icon size={18} className="text-primary" />
              </div>
              <div>
                <p className="text-xs font-semibold text-foreground">{badge.label}</p>
                <p className="text-[10px] text-muted-foreground">{badge.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
