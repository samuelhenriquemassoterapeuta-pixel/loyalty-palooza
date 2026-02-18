import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  FileText,
  CreditCard,
  FoldVertical,
  BookOpen,
  Presentation,
  Users,
  Download,
  Eye,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AppLayout } from "@/components/AppLayout";
import { FolderInstitucional } from "../components/FolderInstitucional";
import { CartaoDigital } from "../components/CartaoDigital";
import { TrifoldBrochure } from "../components/TrifoldBrochure";
import { CatalogoServicos } from "../components/CatalogoServicos";

const materiais = [
  {
    id: "folder",
    title: "Folder Institucional",
    desc: "A4 frente/verso com serviços e contatos",
    icon: FileText,
    formatos: ["A4", "PDF"],
    color: "from-primary/10 to-accent/5",
  },
  {
    id: "cartao",
    title: "Cartão de Visita Digital",
    desc: "Card com QR code compartilhável",
    icon: CreditCard,
    formatos: ["Digital", "PNG"],
    color: "from-accent/10 to-highlight/5",
  },
  {
    id: "trifold",
    title: "Folder Tri-fold",
    desc: "DL dobrável em 3 partes",
    icon: FoldVertical,
    formatos: ["DL", "PDF"],
    color: "from-highlight/10 to-secondary/10",
  },
  {
    id: "catalogo",
    title: "Catálogo de Serviços",
    desc: "Multi-página com protocolos e preços",
    icon: BookOpen,
    formatos: ["A4", "PDF"],
    color: "from-secondary/10 to-primary/5",
  },
  {
    id: "deck",
    title: "Deck Comercial B2B",
    desc: "Apresentação para empresas",
    icon: Presentation,
    formatos: ["16:9", "PDF"],
    status: "em breve",
    color: "from-primary/10 to-highlight/10",
  },
  {
    id: "kit-parceiro",
    title: "Kit Parceiro",
    desc: "Material para afiliados e terapeutas",
    icon: Users,
    formatos: ["A4", "PDF"],
    status: "em breve",
    color: "from-accent/10 to-primary/5",
  },
];

export default function MateriaisGraficos() {
  const navigate = useNavigate();
  const [selected, setSelected] = useState<string | null>(null);

  const renderMaterial = () => {
    switch (selected) {
      case "folder":
        return <FolderInstitucional onBack={() => setSelected(null)} />;
      case "cartao":
        return <CartaoDigital onBack={() => setSelected(null)} />;
      case "trifold":
        return <TrifoldBrochure onBack={() => setSelected(null)} />;
      case "catalogo":
        return <CatalogoServicos onBack={() => setSelected(null)} />;
      default:
        return null;
    }
  };

  if (selected) {
    return <AppLayout>{renderMaterial()}</AppLayout>;
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-32 lg:pb-8">
        {/* Header */}
        <div className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-accent/5 to-highlight/10 border-b border-border px-4 py-6 safe-top">
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-accent/20 rounded-full blur-3xl" />
          <div className="max-w-lg mx-auto relative z-10">
            <div className="flex items-center gap-4 mb-2">
              <Button variant="ghost" size="icon" onClick={() => navigate(-1)} className="shrink-0">
                <ArrowLeft size={20} />
              </Button>
              <div>
                <h1 className="text-xl font-bold text-primary flex items-center gap-2">
                  <FileText size={24} />
                  Materiais Gráficos
                </h1>
                <p className="text-sm text-muted-foreground">
                  Crie materiais profissionais para digital e impressão
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 py-6 space-y-3">
          {materiais.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card
                className={`cursor-pointer hover:shadow-lg transition-all border-border/50 ${
                  m.status ? "opacity-60" : ""
                }`}
                onClick={() => !m.status && setSelected(m.id)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${m.color} flex items-center justify-center shrink-0`}>
                    <m.icon size={24} className="text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-foreground">{m.title}</h3>
                      {m.status && (
                        <span className="text-[10px] bg-muted px-2 py-0.5 rounded-full text-muted-foreground uppercase tracking-wider">
                          {m.status}
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{m.desc}</p>
                    <div className="flex gap-1 mt-1">
                      {m.formatos.map((f) => (
                        <span key={f} className="text-[10px] bg-primary/10 text-primary px-1.5 py-0.5 rounded">
                          {f}
                        </span>
                      ))}
                    </div>
                  </div>
                  {!m.status && <Eye size={18} className="text-muted-foreground shrink-0" />}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
