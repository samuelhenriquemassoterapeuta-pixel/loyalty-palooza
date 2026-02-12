import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Sparkles, ArrowRight, Leaf, Heart, Brain } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/headspa-hero.jpg";
import { CollapsibleSection } from "./CollapsibleSection";

const highlights = [
  { icon: Leaf, text: "Saúde capilar profunda" },
  { icon: Brain, text: "Alívio de tensão e estresse" },
  { icon: Heart, text: "Autocuidado holístico" },
];

export const HeadSpaSection = () => {
  return (
    <div className="py-14 sm:py-20 lg:py-28 px-5 sm:px-6 lg:px-8 bg-primary/5 relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <CollapsibleSection
          defaultOpen
          badge={
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
              <Sparkles size={14} className="text-primary" />
              <span className="text-xs font-semibold text-primary">Novidade</span>
            </div>
          }
          title={
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground">
              Head SPA{" "}
              <span className="font-serif italic text-primary">Coreano</span>
            </h2>
          }
          subtitle={
            <p className="text-muted-foreground">
              Um ritual de beleza que vai além do cuidado capilar.
            </p>
          }
        >
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14 items-center">
            {/* Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7 }}
            >
              <p className="text-muted-foreground leading-relaxed mb-6">
                Combinando limpeza profunda, massagens terapêuticas e aromaterapia, 
                cada sessão de 60 a 90 minutos promove saúde, relaxamento e bem-estar holístico.
              </p>

              <div className="space-y-3 mb-7">
                {highlights.map((h, i) => {
                  const Icon = h.icon;
                  return (
                    <div key={i} className="flex items-center gap-3">
                      <div className="p-1.5 rounded-lg bg-primary/10 text-primary">
                        <Icon size={15} />
                      </div>
                      <span className="text-sm font-medium text-foreground">{h.text}</span>
                    </div>
                  );
                })}
              </div>

              <Link to="/headspa">
                <Button className="gap-2">
                  Saiba mais <ArrowRight size={15} />
                </Button>
              </Link>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="relative"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl aspect-[4/3]">
                <img
                  src={heroImage}
                  alt="Head SPA Coreano"
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="absolute -bottom-3 -right-3 sm:-bottom-4 sm:-right-4 bg-card rounded-xl border border-border/60 p-3 sm:p-4 shadow-lg">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-accent" />
                  <div>
                    <p className="text-xs font-bold text-foreground">60–90 min</p>
                    <p className="text-[10px] text-muted-foreground">Experiência premium</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
};
