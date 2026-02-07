import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { BookOpen, ShieldAlert, Heart, Calendar, ClipboardCheck, GraduationCap } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ContraindicacoesSection } from "@/components/guia-clinico/ContraindicacoesSection";
import { AutocuidadoSection } from "@/components/guia-clinico/AutocuidadoSection";
import { TimingCirurgicoSection } from "@/components/guia-clinico/TimingCirurgicoSection";
import { ChecklistAvaliacao } from "@/components/guia-clinico/ChecklistAvaliacao";
import { EducativoSection } from "@/components/guia-clinico/EducativoSection";

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const GuiaClinico = () => {
  const [searchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "contraindicacoes";
  const [tab, setTab] = useState(initialTab);

  useEffect(() => {
    const paramTab = searchParams.get("tab");
    if (paramTab) setTab(paramTab);
  }, [searchParams]);

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-24 lg:pb-8">
        <div className="max-w-lg lg:max-w-4xl xl:max-w-5xl mx-auto px-4 lg:px-8 pt-6 safe-top">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-5"
          >
            {/* Header */}
            <motion.div variants={fadeUp}>
              <div className="flex items-center gap-2 mb-1">
                <BookOpen size={22} className="text-primary" />
                <h1 className="text-xl font-bold text-foreground">
                  Guia Clínico
                </h1>
              </div>
              <p className="text-sm text-muted-foreground">
                Orientações, protocolos e material educativo para drenagem linfática
              </p>
            </motion.div>

            {/* Tabs */}
            <motion.div variants={fadeUp}>
              <Tabs value={tab} onValueChange={setTab} className="w-full">
                <TabsList className="w-full grid grid-cols-5">
                  <TabsTrigger value="contraindicacoes" className="text-[10px] sm:text-xs gap-1">
                    <ShieldAlert size={13} />
                    <span className="hidden sm:inline">Contra</span>ind.
                  </TabsTrigger>
                  <TabsTrigger value="autocuidado" className="text-[10px] sm:text-xs gap-1">
                    <Heart size={13} />
                    <span className="hidden sm:inline">Auto</span>cuid.
                  </TabsTrigger>
                  <TabsTrigger value="timing" className="text-[10px] sm:text-xs gap-1">
                    <Calendar size={13} />
                    Timing
                  </TabsTrigger>
                  <TabsTrigger value="checklist" className="text-[10px] sm:text-xs gap-1">
                    <ClipboardCheck size={13} />
                    Check
                  </TabsTrigger>
                  <TabsTrigger value="educativo" className="text-[10px] sm:text-xs gap-1">
                    <GraduationCap size={13} />
                    <span className="hidden sm:inline">Educa</span>tivo
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="contraindicacoes" className="mt-4">
                  <ContraindicacoesSection />
                </TabsContent>
                <TabsContent value="autocuidado" className="mt-4">
                  <AutocuidadoSection />
                </TabsContent>
                <TabsContent value="timing" className="mt-4">
                  <TimingCirurgicoSection />
                </TabsContent>
                <TabsContent value="checklist" className="mt-4">
                  <ChecklistAvaliacao />
                </TabsContent>
                <TabsContent value="educativo" className="mt-4">
                  <EducativoSection />
                </TabsContent>
              </Tabs>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default GuiaClinico;
