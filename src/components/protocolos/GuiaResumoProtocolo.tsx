import { motion } from "framer-motion";
import { ShieldAlert, Heart, Calendar, ChevronRight, BookOpen } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

interface GuiaResumoProtocoloProps {
  tipoProtocolo: string;
}

const resumoItems = [
  {
    icon: ShieldAlert,
    title: "Contraindicações",
    description: "Quando NÃO realizar drenagem e sinais de alerta",
    color: "text-destructive",
    bg: "bg-destructive/10",
    tab: "contraindicacoes",
  },
  {
    icon: Heart,
    title: "Autocuidado",
    description: "Cuidados entre sessões para melhores resultados",
    color: "text-accent",
    bg: "bg-accent/10",
    tab: "autocuidado",
  },
  {
    icon: Calendar,
    title: "Timing cirúrgico",
    description: "Quando iniciar e frequência recomendada",
    color: "text-primary",
    bg: "bg-primary/10",
    tab: "timing",
  },
];

const dicasRapidas: Record<string, string[]> = {
  drenagem_pos_operatorio: [
    "Use malha compressiva conforme orientação médica",
    "Beba pelo menos 2L de água/dia",
    "Caminhadas leves ajudam na recuperação",
    "Em caso de febre ou dor intensa, procure o cirurgião",
  ],
  emagrecimento: [
    "Mantenha alimentação equilibrada entre as sessões",
    "Hidratação é essencial para o sistema linfático",
    "Atividade física leve potencializa resultados",
    "Evite alimentos ultraprocessados e excesso de sódio",
  ],
};

export const GuiaResumoProtocolo = ({ tipoProtocolo }: GuiaResumoProtocoloProps) => {
  const navigate = useNavigate();
  const dicas = dicasRapidas[tipoProtocolo] ?? dicasRapidas.emagrecimento;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-4"
    >
      {/* Quick tips for this protocol type */}
      <Card className="p-4 space-y-3">
        <div className="flex items-center gap-2">
          <BookOpen size={14} className="text-primary" />
          <h4 className="text-sm font-semibold text-foreground">Dicas rápidas</h4>
        </div>
        <ul className="space-y-2">
          {dicas.map((dica, i) => (
            <motion.li
              key={dica}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
              className="flex items-start gap-2 text-xs text-muted-foreground"
            >
              <span className="text-primary mt-0.5">•</span>
              {dica}
            </motion.li>
          ))}
        </ul>
      </Card>

      {/* Links to full guide */}
      <div className="space-y-2">
        {resumoItems.map((item, i) => (
          <motion.button
            key={item.tab}
            onClick={() => navigate(`/guia-clinico?tab=${item.tab}`)}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 + i * 0.06 }}
            whileTap={{ scale: 0.98 }}
            className="w-full text-left p-3 rounded-xl border border-border bg-card hover:border-primary/20 transition-all duration-200"
          >
            <div className="flex items-center gap-3">
              <div className={`shrink-0 w-9 h-9 rounded-lg ${item.bg} flex items-center justify-center`}>
                <item.icon size={16} className={item.color} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-sm font-medium text-foreground">{item.title}</h4>
                <p className="text-[11px] text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight size={16} className="text-muted-foreground shrink-0" />
            </div>
          </motion.button>
        ))}
      </div>

      <Badge variant="outline" className="text-[10px] w-full justify-center py-1.5">
        Acesse o Guia Clínico completo para mais detalhes
      </Badge>
    </motion.div>
  );
};
