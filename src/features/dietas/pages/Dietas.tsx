import { motion } from "framer-motion";
import { Apple, BarChart3, Trophy, ClipboardList, UtensilsCrossed, CalendarDays, BookOpen } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { AnimatedPageBackground } from "@/components/AnimatedPageBackground";
import { DietasDashboard } from "@/features/dietas/components/DietasDashboard";
import { FichaNutricionalForm } from "@/features/dietas/components/FichaNutricionalForm";
import { HistoricoSemanal } from "@/features/dietas/components/HistoricoSemanal";
import { ReceitasSection } from "@/features/dietas/components/ReceitasSection";
import { DietasGamificacao } from "@/features/dietas/components/DietasGamificacao";
import { DietasSection } from "@/features/protocolos/components/DietasSection";
import { AppCollapsibleSection } from "@/components/AppCollapsibleSection";
import { EditableText } from "@/components/edit-mode";

const stagger = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.05 } },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
};

const Dietas = () => {
  return (
    <AppLayout>
      <div className="min-h-screen bg-background gradient-hero pb-24 lg:pb-8 relative">
        <AnimatedPageBackground />
        <div className="max-w-lg lg:max-w-4xl xl:max-w-5xl mx-auto px-4 lg:px-8 pt-6 safe-top relative z-10">
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
                <h1 className="text-xl font-bold text-foreground">
                  <EditableText storageKey="dietas_titulo" table="platform_texts" section="dietas" as="span">Dietas</EditableText>
                </h1>
              </div>
              <EditableText storageKey="dietas_subtitulo" table="platform_texts" section="dietas" as="p" className="text-sm text-muted-foreground" multiline>
                Nutrição personalizada, planos e diário alimentar
              </EditableText>
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
