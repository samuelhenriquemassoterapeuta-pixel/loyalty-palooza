import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ClipboardCheck, RotateCcw, CheckCircle2, Circle, AlertTriangle, ThermometerSun, Hand, Eye, Ruler } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";

interface CheckItem {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  category: "visual" | "palpacao" | "funcional" | "seguranca";
  alertSe?: string;
}

const checklistItems: CheckItem[] = [
  {
    id: "edema_visual",
    label: "Avaliação visual do edema",
    description: "Observar presença, localização e extensão do edema. Comparar lados.",
    icon: Eye,
    category: "visual",
  },
  {
    id: "equimoses",
    label: "Equimoses e hematomas",
    description: "Registrar localização, cor (indicativo de fase de reabsorção) e extensão.",
    icon: Eye,
    category: "visual",
    alertSe: "Hematoma em expansão ou dor intensa localizada",
  },
  {
    id: "cicatriz",
    label: "Estado da cicatriz",
    description: "Verificar sinais de abertura, secreção, vermelhidão excessiva ou hipertrofia.",
    icon: Eye,
    category: "visual",
    alertSe: "Sinais de deiscência ou infecção",
  },
  {
    id: "consistencia",
    label: "Consistência do edema",
    description: "Palpação para classificar: mole (fase aguda), firme (fibrose em formação) ou duro (fibrose instalada).",
    icon: Hand,
    category: "palpacao",
  },
  {
    id: "temperatura",
    label: "Temperatura local",
    description: "Comparar temperatura entre lados e com áreas não operadas. Calor localizado pode indicar inflamação ou infecção.",
    icon: ThermometerSun,
    category: "palpacao",
    alertSe: "Calor intenso + vermelhidão + dor = possível infecção",
  },
  {
    id: "sensibilidade",
    label: "Sensibilidade/dor",
    description: "Avaliar áreas de hipoestesia (dormência), hiperestesia (sensibilidade aumentada) ou dor ao toque.",
    icon: Hand,
    category: "palpacao",
  },
  {
    id: "cacifo",
    label: "Sinal de Cacifo (Godet)",
    description: "Pressionar região edemaciada por 5 seg. Classificar: + (leve), ++ (moderado), +++ (severo), ++++ (grave).",
    icon: Hand,
    category: "palpacao",
  },
  {
    id: "medidas",
    label: "Perimetria",
    description: "Medir circunferência dos pontos-chave e registrar na ficha de acompanhamento para comparação evolutiva.",
    icon: Ruler,
    category: "funcional",
  },
  {
    id: "mobilidade",
    label: "Mobilidade articular",
    description: "Verificar amplitude de movimento das articulações próximas à região operada.",
    icon: Ruler,
    category: "funcional",
  },
  {
    id: "sinais_vitais",
    label: "Sinais de alerta sistêmico",
    description: "Perguntar sobre febre, falta de ar, dor em panturrilha, alterações urinárias ou intestinais.",
    icon: AlertTriangle,
    category: "seguranca",
    alertSe: "Qualquer sinal sistêmico requer avaliação médica",
  },
];

const categoryLabels: Record<string, { label: string; color: string }> = {
  visual: { label: "Inspeção visual", color: "text-info" },
  palpacao: { label: "Palpação", color: "text-accent" },
  funcional: { label: "Avaliação funcional", color: "text-primary" },
  seguranca: { label: "Segurança", color: "text-destructive" },
};

export const ChecklistAvaliacao = () => {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [notas, setNotas] = useState("");

  const toggleItem = (id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const reset = () => {
    setChecked(new Set());
    setNotas("");
  };

  const progress = Math.round((checked.size / checklistItems.length) * 100);
  const categories = ["visual", "palpacao", "funcional", "seguranca"] as const;

  return (
    <div className="space-y-6">
      {/* Header with progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <ClipboardCheck size={16} className="text-primary" />
          <h3 className="text-sm font-semibold text-foreground">
            Checklist pré-sessão
          </h3>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            {checked.size}/{checklistItems.length}
          </Badge>
          <Button variant="ghost" size="icon" onClick={reset} className="h-7 w-7">
            <RotateCcw size={14} />
          </Button>
        </div>
      </div>

      {/* Progress bar */}
      <div className="space-y-1">
        <div className="h-2 rounded-full bg-muted overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            className="h-full rounded-full gradient-primary"
            transition={{ type: "spring", stiffness: 260, damping: 24 }}
          />
        </div>
        <p className="text-[10px] text-muted-foreground text-right">{progress}% completo</p>
      </div>

      {/* Categorized checklist */}
      {categories.map((cat) => {
        const items = checklistItems.filter((item) => item.category === cat);
        const catStyle = categoryLabels[cat];
        return (
          <div key={cat} className="space-y-2">
            <p className={`text-xs font-semibold ${catStyle.color}`}>
              {catStyle.label}
            </p>
            <div className="space-y-2">
              {items.map((item, i) => {
                const isChecked = checked.has(item.id);
                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.04 }}
                  >
                    <button
                      onClick={() => toggleItem(item.id)}
                      className={`w-full text-left p-3 rounded-xl border transition-all duration-200 ${
                        isChecked
                          ? "bg-primary/5 border-primary/30"
                          : "bg-card border-border hover:border-primary/20"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="mt-0.5">
                          <AnimatePresence mode="wait">
                            {isChecked ? (
                              <motion.div
                                key="checked"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <CheckCircle2 size={18} className="text-primary" />
                              </motion.div>
                            ) : (
                              <motion.div
                                key="unchecked"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                              >
                                <Circle size={18} className="text-muted-foreground/40" />
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className={`text-sm font-medium ${isChecked ? "text-primary" : "text-foreground"}`}>
                            {item.label}
                          </h4>
                          <p className="text-[11px] text-muted-foreground leading-relaxed mt-0.5">
                            {item.description}
                          </p>
                          {item.alertSe && (
                            <div className="flex items-center gap-1.5 mt-1.5 text-[10px] text-destructive">
                              <AlertTriangle size={10} />
                              <span className="font-medium">Alerta: {item.alertSe}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  </motion.div>
                );
              })}
            </div>
          </div>
        );
      })}

      {/* Notes */}
      <Card className="p-4 space-y-2">
        <p className="text-xs font-semibold text-foreground">Observações da avaliação</p>
        <Textarea
          value={notas}
          onChange={(e) => setNotas(e.target.value)}
          placeholder="Registre achados relevantes, alterações desde a última sessão, orientações dadas ao paciente..."
          className="min-h-[80px] text-xs"
        />
      </Card>
    </div>
  );
};
