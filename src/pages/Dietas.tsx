import { motion } from "framer-motion";
import { Apple } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { DietasSection } from "@/components/protocolos/DietasSection";

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
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-2 mb-1">
                <Apple size={22} className="text-primary" />
                <h1 className="text-xl font-bold text-foreground">Dietas</h1>
              </div>
              <p className="text-sm text-muted-foreground">
                Conteúdo educativo, planos alimentares e diário
              </p>
            </motion.div>

            <motion.div variants={fadeUp}>
              <DietasSection />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Dietas;
