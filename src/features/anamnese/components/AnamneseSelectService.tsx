import { motion } from "framer-motion";
import { ArrowLeft, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AnamneseTemplate } from "../hooks/useAnamneseTemplates";

interface Props {
  templates: AnamneseTemplate[];
  loading: boolean;
  onSelect: (template: AnamneseTemplate) => void;
  onBack: () => void;
}

export function AnamneseSelectService({ templates, loading, onSelect, onBack }: Props) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h2 className="text-lg font-bold text-foreground">Selecione a terapia</h2>
          <p className="text-xs text-muted-foreground">Escolha o tipo de anamnese para preencher</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {templates.map((t, i) => (
          <motion.button
            key={t.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            onClick={() => onSelect(t)}
            className="flex items-start gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/40 hover:shadow-md transition-all text-left"
          >
            <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
              <ClipboardList size={18} className="text-primary" />
            </div>
            <div>
              <p className="font-semibold text-sm text-foreground">{t.servico_nome}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{t.descricao || `${t.campos.length} campos específicos`}</p>
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
