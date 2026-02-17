import { motion } from "framer-motion";
import { Apple, BarChart3, Trophy, ClipboardList, UtensilsCrossed, CalendarDays, BookOpen } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { DietasDashboard } from "@/features/dietas/components/DietasDashboard";
import { FichaNutricionalForm } from "@/features/dietas/components/FichaNutricionalForm";
import { HistoricoSemanal } from "@/features/dietas/components/HistoricoSemanal";
import { ReceitasSection } from "@/features/dietas/components/ReceitasSection";
import { DietasGamificacao } from "@/features/dietas/components/DietasGamificacao";
import { DietasSection } from "@/features/protocolos/components/DietasSection";
import { AppCollapsibleSection } from "@/components/AppCollapsibleSection";

const stagger = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

const Dietas = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <div className="max-w-lg lg:max-w-4xl xl:max-w-5xl mx-auto px-4 lg:px-8 pt-6 safe-top">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            {/* Header */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-2 mb-1">
                <Apple size={22} className="text-primary" />
                <h1 className="text-xl font-bold text-foreground">Dietas</h1>
              </div>
              <p className="text-sm text-muted-foreground">
                Nutrição personalizada, planos e diário alimentar
              </p>
            </motion.div>

            {/* Dashboard cards - always visible */}
            <DietasDashboard />

            {/* Gamificação */}
            <motion.div variants={fadeUp}>
              <AppCollapsibleSection title="Gamificação" icon={Trophy}>
                <DietasGamificacao />
              </AppCollapsibleSection>
            </motion.div>

            {/* Ficha nutricional */}
            <motion.div variants={fadeUp}>
              <AppCollapsibleSection title="Ficha Nutricional" icon={ClipboardList}>
                <FichaNutricionalForm />
              </AppCollapsibleSection>
            </motion.div>

            {/* Receitas */}
            <motion.div variants={fadeUp}>
              <AppCollapsibleSection title="Receitas" icon={UtensilsCrossed}>
                <ReceitasSection />
              </AppCollapsibleSection>
            </motion.div>

            {/* Histórico semanal */}
            <motion.div variants={fadeUp}>
              <AppCollapsibleSection title="Histórico Semanal" icon={CalendarDays}>
                <HistoricoSemanal />
              </AppCollapsibleSection>
            </motion.div>

            {/* Conteúdo educativo, Planos, Diário */}
            <motion.div variants={fadeUp}>
              <AppCollapsibleSection title="Planos & Conteúdo" icon={BookOpen}>
                <DietasSection />
              </AppCollapsibleSection>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dietas;
