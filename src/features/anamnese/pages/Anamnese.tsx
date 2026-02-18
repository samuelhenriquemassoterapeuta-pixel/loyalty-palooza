import { useState } from "react";
import { motion } from "framer-motion";
import { FileText } from "lucide-react";
import { AppLayout } from "@/components/AppLayout";
import { AnamneseList } from "../components/AnamneseList";
import { AnamneseSelectService } from "../components/AnamneseSelectService";
import { AnamneseForm } from "../components/AnamneseForm";
import { AnamneseViewer } from "../components/AnamneseViewer";
import { useFichasAnamnese, FichaAnamnese } from "../hooks/useFichasAnamnese";
import { useAnamneseTemplates, AnamneseTemplate } from "../hooks/useAnamneseTemplates";

type View = "list" | "select-service" | "form" | "viewer";

const Anamnese = () => {
  const { fichas, loading, createFicha, updateFicha } = useFichasAnamnese();
  const { templates, loading: loadingTemplates } = useAnamneseTemplates();
  const [view, setView] = useState<View>("list");
  const [selectedTemplate, setSelectedTemplate] = useState<AnamneseTemplate | null>(null);
  const [selectedFicha, setSelectedFicha] = useState<FichaAnamnese | null>(null);
  const [editMode, setEditMode] = useState(false);

  const handleSelectTemplate = (t: AnamneseTemplate) => {
    setSelectedTemplate(t);
    setEditMode(false);
    setSelectedFicha(null);
    setView("form");
  };

  const handleViewFicha = (f: FichaAnamnese) => {
    setSelectedFicha(f);
    const tmpl = templates.find((t) => t.servico_nome === f.servico_nome);
    setSelectedTemplate(tmpl || null);
    setEditMode(false);
    setView("viewer");
  };

  const handleSave = async (data: any) => {
    if (selectedFicha && editMode) {
      const ok = await updateFicha(selectedFicha.id, data);
      if (ok) {
        setView("list");
        setEditMode(false);
      }
    } else {
      const result = await createFicha(data);
      if (result) setView("list");
    }
  };

  const handleEdit = () => {
    setEditMode(true);
    setView("form");
  };

  const getCamposTemplate = () => selectedTemplate?.campos || [];

  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto px-4 py-6 gradient-hero min-h-screen">
        {/* Header */}
        {view === "list" && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="mb-6">
            <div className="flex items-center gap-3 mb-1">
              <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <FileText size={20} className="text-primary" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">Fichas de Anamnese</h1>
                <p className="text-xs text-muted-foreground">Avaliação clínica por terapia</p>
              </div>
            </div>
          </motion.div>
        )}

        {view === "list" && (
          <AnamneseList
            fichas={fichas}
            loading={loading}
            onNew={() => setView("select-service")}
            onView={handleViewFicha}
          />
        )}

        {view === "select-service" && (
          <AnamneseSelectService
            templates={templates}
            loading={loadingTemplates}
            onSelect={handleSelectTemplate}
            onBack={() => setView("list")}
          />
        )}

        {view === "form" && selectedTemplate && (
          <AnamneseForm
            servicoNome={selectedTemplate.servico_nome}
            camposEspecificos={getCamposTemplate()}
            onSave={handleSave}
            onBack={() => setView(editMode ? "viewer" : "select-service")}
            initialData={editMode ? selectedFicha : undefined}
          />
        )}

        {view === "viewer" && selectedFicha && (
          <AnamneseViewer
            ficha={selectedFicha}
            camposTemplate={getCamposTemplate()}
            onBack={() => {
              setView("list");
              setSelectedFicha(null);
            }}
            onEdit={handleEdit}
          />
        )}
      </div>
    </AppLayout>
  );
};

export default Anamnese;
