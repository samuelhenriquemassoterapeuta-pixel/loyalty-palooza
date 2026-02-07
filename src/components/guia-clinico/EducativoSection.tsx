import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GraduationCap, MapPin, Hand, ChevronDown, ChevronUp, Info } from "lucide-react";
import { Card } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";

import anatomiaImg from "@/assets/educativo/anatomia-linfatica.jpg";
import drenagemPernasImg from "@/assets/educativo/drenagem-pernas.jpg";
import drenagemBracosImg from "@/assets/educativo/drenagem-bracos.jpg";
import drenagemAbdomenImg from "@/assets/educativo/automassagem-abdomen.jpg";
import drenagemRostoImg from "@/assets/educativo/drenagem-rosto.jpg";

/* ───── Anatomy Data ───── */
const linfonodos = [
  {
    nome: "Linfonodos Cervicais",
    localizacao: "Pescoço (ao longo do esternocleidomastoideo)",
    funcao: "Drenam cabeça, rosto, cavidade oral e parte superior do pescoço. Essenciais na drenagem facial pós-procedimentos estéticos.",
  },
  {
    nome: "Linfonodos Axilares",
    localizacao: "Axilas",
    funcao: "Drenam membros superiores, mama e parede torácica lateral. Ponto de destino da drenagem de braços e tronco superior.",
  },
  {
    nome: "Linfonodos Inguinais",
    localizacao: "Virilha",
    funcao: "Drenam membros inferiores, genitália externa e parede abdominal inferior. Ponto de chegada da drenagem de pernas e abdômen.",
  },
  {
    nome: "Cisterna do Quilo",
    localizacao: "Região lombar (abdômen posterior)",
    funcao: "Recebe a linfa de toda a parte inferior do corpo antes de ascender pelo ducto torácico.",
  },
  {
    nome: "Ducto Torácico",
    localizacao: "Tórax (coluna vertebral até subclávia esquerda)",
    funcao: "Principal canal linfático do corpo. Coleta ~75% da linfa corporal e a devolve à circulação sanguínea.",
  },
];

/* ───── Technique Data ───── */
const tecnicas = [
  {
    id: "pernas",
    titulo: "Pernas & Membros Inferiores",
    imagem: drenagemPernasImg,
    resumo: "Drenagem ascendente em direção aos linfonodos inguinais",
    passos: [
      "Comece pelo tornozelo com movimentos suaves e envolventes",
      "Deslize as mãos para cima ao longo da panturrilha, sem pressão profunda",
      "Continue subindo pela coxa, sempre em direção à virilha (inguinal)",
      "Repita cada movimento 5-7 vezes antes de avançar para a próxima região",
      "Finalize com bombeamento leve nos linfonodos inguinais (virilha)",
    ],
    dica: "Eleve as pernas 15-20 minutos antes para facilitar o retorno venoso. A pressão deve ser leve — como acariciar a pele.",
  },
  {
    id: "bracos",
    titulo: "Braços & Membros Superiores",
    imagem: drenagemBracosImg,
    resumo: "Drenagem em direção aos linfonodos axilares",
    passos: [
      "Comece pela mão, envolvendo cada dedo com movimentos suaves",
      "Suba pelo antebraço com deslizamentos leves em direção ao cotovelo",
      "Continue subindo pelo braço até a axila",
      "Use movimentos circulares suaves na região axilar para estimular os linfonodos",
      "Repita 5-7 vezes cada segmento",
    ],
    dica: "Após mastectomia ou cirurgia de mama, a drenagem dos braços requer cuidado especial — sempre siga orientação profissional.",
  },
  {
    id: "abdomen",
    titulo: "Abdômen & Tronco",
    imagem: drenagemAbdomenImg,
    resumo: "Movimentos circulares suaves no sentido horário",
    passos: [
      "Inicie com respiração diafragmática profunda (3-5 ciclos)",
      "Faça movimentos circulares suaves no sentido horário ao redor do umbigo",
      "Amplie os círculos gradualmente cobrindo todo o abdômen",
      "Deslize do centro para as laterais, em direção aos linfonodos inguinais",
      "Finalize retornando ao centro com movimentos cada vez menores",
    ],
    dica: "Especialmente importante após lipoaspiração ou abdominoplastia. Aguarde liberação médica antes de iniciar.",
  },
  {
    id: "rosto",
    titulo: "Rosto & Pescoço",
    imagem: drenagemRostoImg,
    resumo: "Movimentos descendentes em direção aos linfonodos cervicais",
    passos: [
      "Comece pela testa, deslizando do centro para as têmporas",
      "Ao redor dos olhos: movimentos suaves do canto interno para o externo",
      "Ao longo do nariz: deslize para baixo pelas laterais até as bochechas",
      "Ao longo da mandíbula: deslize do queixo até abaixo das orelhas",
      "Finalize pelo pescoço: movimentos descendentes até a clavícula",
    ],
    dica: "Use as pontas dos dedos (indicador e médio) com pressão mínima. Ideal para reduzir inchaço matinal.",
  },
];

/* ───── Technique Accordion Card ───── */
const TecnicaCard = ({ tecnica, index }: { tecnica: typeof tecnicas[number]; index: number }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.08 }}
    >
      <Card className="overflow-hidden">
        {/* Image */}
        <AspectRatio ratio={16 / 10}>
          <img
            src={tecnica.imagem}
            alt={tecnica.titulo}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        </AspectRatio>

        {/* Content */}
        <div className="p-4">
          <h4 className="text-sm font-bold text-foreground mb-0.5">{tecnica.titulo}</h4>
          <p className="text-xs text-muted-foreground mb-3">{tecnica.resumo}</p>

          <button
            onClick={() => setExpanded(!expanded)}
            className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
          >
            {expanded ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {expanded ? "Ocultar passos" : "Ver passo a passo"}
          </button>

          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <ol className="mt-3 space-y-2">
                  {tecnica.passos.map((passo, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="shrink-0 w-5 h-5 rounded-full bg-primary/10 text-primary text-[10px] font-bold flex items-center justify-center mt-0.5">
                        {i + 1}
                      </span>
                      <span className="text-xs text-muted-foreground leading-relaxed">{passo}</span>
                    </li>
                  ))}
                </ol>

                <div className="mt-3 p-2.5 rounded-lg bg-muted/50">
                  <p className="text-[11px] text-muted-foreground leading-relaxed">
                    <span className="font-semibold text-foreground">💡 Dica:</span> {tecnica.dica}
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </Card>
    </motion.div>
  );
};

/* ───── Main Section ───── */
export const EducativoSection = () => {
  const [showAnatomy, setShowAnatomy] = useState(false);

  return (
    <div className="space-y-6">
      {/* Anatomy Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <MapPin size={16} className="text-primary" />
          <h3 className="text-sm font-semibold text-foreground">
            Anatomia do sistema linfático
          </h3>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Card className="overflow-hidden">
            <AspectRatio ratio={3 / 4}>
              <img
                src={anatomiaImg}
                alt="Sistema linfático - anatomia"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </AspectRatio>
            <div className="p-4">
              <p className="text-xs text-muted-foreground leading-relaxed mb-3">
                O sistema linfático é uma rede de vasos e linfonodos que transporta a linfa — fluido rico em células imunológicas. A drenagem linfática manual estimula esse fluxo, reduzindo edemas e acelerando a recuperação pós-operatória.
              </p>
              <button
                onClick={() => setShowAnatomy(!showAnatomy)}
                className="flex items-center gap-1.5 text-xs font-semibold text-primary hover:text-primary/80 transition-colors"
              >
                {showAnatomy ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {showAnatomy ? "Ocultar detalhes" : "Ver principais linfonodos"}
              </button>

              <AnimatePresence>
                {showAnatomy && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="mt-3 space-y-3">
                      {linfonodos.map((node, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <div className="shrink-0 w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center mt-0.5">
                            <Info size={14} className="text-primary" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold text-foreground">{node.nome}</p>
                            <p className="text-[11px] text-muted-foreground italic">{node.localizacao}</p>
                            <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                              {node.funcao}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Self-massage Techniques Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Hand size={16} className="text-accent" />
          <h3 className="text-sm font-semibold text-foreground">
            Técnicas de automassagem
          </h3>
        </div>
        <p className="text-xs text-muted-foreground -mt-1 mb-3">
          Siga estas orientações entre sessões profissionais. Toque sempre leve e superficial.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {tecnicas.map((tecnica, i) => (
            <TecnicaCard key={tecnica.id} tecnica={tecnica} index={i} />
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
      >
        <Card className="p-4 border-primary/20 bg-primary/5">
          <div className="flex items-start gap-2.5">
            <GraduationCap size={18} className="text-primary shrink-0 mt-0.5" />
            <div>
              <p className="text-xs font-semibold text-foreground mb-1">Aviso importante</p>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                A automassagem linfática é complementar e não substitui sessões profissionais. Em caso de pós-operatório, 
                <span className="font-semibold text-foreground"> sempre siga as orientações do cirurgião e do fisioterapeuta</span>. 
                Interrompa imediatamente se sentir dor, vermelhidão ou aumento de temperatura local.
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};
