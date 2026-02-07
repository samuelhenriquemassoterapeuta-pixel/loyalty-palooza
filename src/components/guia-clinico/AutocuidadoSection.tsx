import { motion } from "framer-motion";
import { Heart, Droplets, Salad, Moon, ShirtIcon, Hand, Footprints, Ban } from "lucide-react";
import { Card } from "@/components/ui/card";

const cuidados = [
  {
    icon: ShirtIcon,
    title: "Malha compressiva",
    description: "Use a cinta ou malha compressiva conforme orientação do cirurgião (geralmente 24h/dia nas primeiras 4-6 semanas). Retire apenas para higiene e drenagem.",
    tip: "Lave a malha com sabão neutro e seque à sombra. Tenha pelo menos 2 peças para revezar.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Droplets,
    title: "Hidratação",
    description: "Beba pelo menos 2L de água/dia. A hidratação adequada é essencial para o sistema linfático funcionar corretamente e eliminar toxinas.",
    tip: "Água de coco é excelente: repõe eletrólitos e tem ação anti-inflamatória natural.",
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    icon: Salad,
    title: "Alimentação anti-inflamatória",
    description: "Priorize frutas (abacaxi, mamão), vegetais verdes, proteínas magras e alimentos ricos em vitamina C para cicatrização.",
    tip: "Evite: sal em excesso, ultraprocessados, álcool e açúcar refinado — eles aumentam o edema.",
    color: "text-highlight",
    bg: "bg-highlight/10",
  },
  {
    icon: Hand,
    title: "Automassagem suave",
    description: "Entre as sessões profissionais, faça movimentos circulares leves na direção dos linfonodos. Toque superficial, sem pressão profunda.",
    tip: "Comece do tronco para as extremidades. Nunca massageie diretamente sobre a cicatriz nas primeiras semanas.",
    color: "text-accent",
    bg: "bg-accent/10",
  },
  {
    icon: Footprints,
    title: "Caminhadas leves",
    description: "Caminhadas curtas (10-15 min) estimulam a circulação linfática e previnem trombose. Inicie 24-48h após cirurgia, conforme liberação médica.",
    tip: "Evite exercícios intensos, agachamentos e abdominais até liberação completa do cirurgião.",
    color: "text-primary",
    bg: "bg-primary/10",
  },
  {
    icon: Moon,
    title: "Posição ao dormir",
    description: "Eleve levemente as pernas ao deitar para facilitar o retorno venoso e linfático. Use travesseiros para manter posição confortável.",
    tip: "Abdominoplastia: durma com tronco elevado (~30°) nas primeiras 2 semanas para reduzir tensão na sutura.",
    color: "text-info",
    bg: "bg-info/10",
  },
  {
    icon: Ban,
    title: "O que evitar",
    description: "Banhos muito quentes, exposição solar direta na cicatriz, roupas apertadas que marquem a pele e ficar sentado por longos períodos.",
    tip: "Cicatrizes devem ser protegidas do sol por pelo menos 1 ano para evitar hiperpigmentação.",
    color: "text-destructive",
    bg: "bg-destructive/10",
  },
];

export const AutocuidadoSection = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center gap-2 mb-1">
        <Heart size={16} className="text-accent" />
        <h3 className="text-sm font-semibold text-foreground">
          Cuidados entre sessões
        </h3>
      </div>
      <p className="text-xs text-muted-foreground -mt-4">
        Orientações para potencializar os resultados da drenagem e acelerar a recuperação.
      </p>

      <div className="space-y-3">
        {cuidados.map((item, i) => (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card className="p-4">
              <div className="flex items-start gap-3">
                <div className={`shrink-0 w-10 h-10 rounded-xl ${item.bg} flex items-center justify-center`}>
                  <item.icon size={18} className={item.color} />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-semibold text-foreground mb-0.5">
                    {item.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-2">
                    {item.description}
                  </p>
                  <div className="p-2.5 rounded-lg bg-muted/50">
                    <p className="text-[11px] text-muted-foreground leading-relaxed">
                      <span className="font-semibold text-foreground">💡 Dica:</span> {item.tip}
                    </p>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
