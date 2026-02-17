import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  BookOpen,
  Download,
  ChevronRight,
  HelpCircle,
  Calendar,
  ShoppingBag,
  Gift,
  Users,
  Shield,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { AppLayout } from "@/components/AppLayout";
import { useAdmin } from "@/hooks/useAdmin";
import { useParceiro } from "@/hooks/useParceiro";
import { useTerapeuta } from "@/hooks/useTerapeuta";
import { manualUsuario, manualParceiro, manualTerapeuta, manualAdmin, type ManualData } from "@/data/manuaisContent";

const quickLinks = [
  { icon: Calendar, label: "Agendar", path: "/agendamento" },
  { icon: ShoppingBag, label: "Loja", path: "/loja" },
  { icon: Gift, label: "Indicar", path: "/indicacoes" },
];

function ManualRenderer({ data }: { data: ManualData }) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleExportPDF = () => {
    const printContent = `<html><head><title>${data.title}</title>
      <style>
        body{font-family:Arial,sans-serif;padding:40px;line-height:1.6}
        h1{color:#3e4331;border-bottom:2px solid #3e4331;padding-bottom:10px}
        h2{color:#3e4331;margin-top:30px}
        h3{color:#333;margin-top:20px}
        ul{margin-left:20px}
        li{margin-bottom:8px}
        .section{page-break-inside:avoid;margin-bottom:30px}
        .faq{background:#f5f5f5;padding:15px;border-radius:8px;margin-bottom:15px}
        .faq-q{font-weight:bold;color:#3e4331}
      </style></head><body>
      <h1>📖 ${data.title}</h1>
      <p>${data.subtitle}</p>
      ${data.sections.map(s => `
        <div class="section"><h2>${s.title}</h2><p>${s.description}</p>
        ${s.content.map(c => `<h3>${c.title}</h3><ul>${c.steps.map(st => `<li>${st.text}</li>`).join("")}</ul>`).join("")}
        </div>`).join("")}
      <h2>❓ Perguntas Frequentes</h2>
      ${data.faq.map(f => `<div class="faq"><p class="faq-q">${f.question}</p><p>${f.answer}</p></div>`).join("")}
      <p style="margin-top:40px;text-align:center;color:#666">© ${new Date().getFullYear()} Resinkra</p>
      </body></html>`;

    const w = window.open("", "_blank");
    if (w) { w.document.write(printContent); w.document.close(); w.print(); }
  };

  return (
    <div className="space-y-6">
      {/* Export button */}
      <Button variant="outline" size="sm" onClick={handleExportPDF} className="gap-2">
        <Download size={16} />
        Baixar PDF
      </Button>

      {/* Sections Grid */}
      <div className="grid grid-cols-2 gap-3">
        {data.sections.map((section, index) => (
          <motion.button
            key={section.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.04 }}
            onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
            className={`p-4 rounded-2xl bg-gradient-to-br ${section.color} border border-border/50 text-left transition-all hover:shadow-lg ${
              expandedSection === section.id ? "ring-2 ring-primary" : ""
            }`}
          >
            <section.icon size={28} className="text-primary mb-2" />
            <h3 className="font-semibold text-sm">{section.title}</h3>
            <p className="text-xs text-muted-foreground mt-1">{section.description}</p>
          </motion.button>
        ))}
      </div>

      {/* Expanded Content */}
      <AnimatePresence>
        {expandedSection && (() => {
          const cur = data.sections.find(s => s.id === expandedSection);
          if (!cur) return null;
          return (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <Card className="p-4 border-primary/20 space-y-4">
                {cur.content.map((item, idx) => (
                  <div key={idx} className={idx > 0 ? "pt-4 border-t border-border" : ""}>
                    <h4 className="font-semibold text-primary mb-3 flex items-center gap-2">
                      <ChevronRight size={16} />
                      {item.title}
                    </h4>
                    <ul className="space-y-2">
                      {item.steps.map((step, si) => (
                        <motion.li
                          key={si}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: si * 0.08 }}
                          className="flex items-start gap-3 text-sm"
                        >
                          <span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                            {si + 1}
                          </span>
                          <span className="text-muted-foreground">{step.text}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Card>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {/* FAQ */}
      <section>
        <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
          <HelpCircle size={20} className="text-primary" />
          Perguntas Frequentes
        </h2>
        <Accordion type="single" collapsible className="space-y-2">
          {data.faq.map((item, index) => (
            <AccordionItem
              key={index}
              value={`faq-${index}`}
              className="bg-card rounded-xl border border-border px-4"
            >
              <AccordionTrigger className="text-sm font-medium text-left hover:no-underline">
                {item.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground">
                {item.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </section>

      {/* Quick Links (only for user manual) */}
      {data.id === "usuario" && (
        <section>
          <h2 className="text-lg font-bold mb-4">Acesso Rápido</h2>
          <div className="grid grid-cols-3 gap-2">
            {quickLinks.map((item) => (
              <Button
                key={item.label}
                variant="outline"
                className="flex-col h-auto py-4 gap-2"
                onClick={() => navigate(item.path)}
              >
                <item.icon size={20} className="text-primary" />
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}

export default function Manual() {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const { parceiro } = useParceiro();
  const { isTerapeuta } = useTerapeuta();
  const [activeTab, setActiveTab] = useState("usuario");

  const tabs = [
    { value: "usuario", label: "Usuário", icon: BookOpen },
    ...(isTerapeuta ? [{ value: "terapeuta", label: "Terapeuta", icon: Users }] : []),
    ...(parceiro ? [{ value: "parceiro", label: "Parceiro", icon: Users }] : []),
    ...(isAdmin ? [{ value: "admin", label: "Admin", icon: Shield }] : []),
  ];

  const dataMap: Record<string, ManualData> = {
    usuario: manualUsuario,
    terapeuta: manualTerapeuta,
    parceiro: manualParceiro,
    admin: manualAdmin,
  };

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-32 lg:pb-8">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-highlight/10 border-b border-border px-4 py-6 safe-top">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-primary/20 rounded-full blur-2xl" />

          <div className="max-w-lg mx-auto relative z-10">
            <div className="flex items-center gap-4 mb-4">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="shrink-0">
                <ArrowLeft size={20} />
              </Button>
              <div className="flex-1">
                <h1 className="text-xl font-bold text-primary flex items-center gap-2">
                  <BookOpen size={24} />
                  Manuais
                </h1>
                <p className="text-sm text-muted-foreground">Guias completos do Resinkra</p>
              </div>
            </div>

            {/* Tab selector */}
            {tabs.length > 1 && (
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className={`grid w-full ${tabs.length >= 4 ? "grid-cols-4" : tabs.length === 3 ? "grid-cols-3" : tabs.length === 2 ? "grid-cols-2" : "grid-cols-1"}`}>
                  {tabs.map((tab) => (
                    <TabsTrigger key={tab.value} value={tab.value} className="gap-1.5 text-xs sm:text-sm">
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </TabsTrigger>
                  ))}
                </TabsList>
              </Tabs>
            )}
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 py-6">
          <ManualRenderer data={dataMap[activeTab]} />
        </div>
      </div>
    </AppLayout>
  );
}
