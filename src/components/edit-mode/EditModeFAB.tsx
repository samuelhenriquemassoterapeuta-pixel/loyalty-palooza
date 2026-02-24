import { motion, AnimatePresence } from "framer-motion";
import { Pencil, X, Save, Undo2, Loader2 } from "lucide-react";
import { useEditMode } from "@/contexts/EditModeContext";

export const EditModeFAB = () => {
  const { isAdmin, isEditMode, toggleEditMode, pendingChanges, saveAllChanges, discardChanges, isSaving } = useEditMode();

  if (!isAdmin) return null;

  return (
    <div className="fixed bottom-20 right-4 z-[60] flex flex-col items-end gap-2">
      <AnimatePresence>
        {isEditMode && (
          <>
            {pendingChanges.size > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 10, scale: 0.9 }}
                className="flex items-center gap-2"
              >
                <button
                  onClick={discardChanges}
                  className="flex items-center gap-1.5 px-3 py-2 rounded-full bg-destructive text-destructive-foreground text-xs font-semibold shadow-lg hover:bg-destructive/90 transition-colors"
                >
                  <Undo2 size={14} />
                  Descartar
                </button>
                <button
                  onClick={saveAllChanges}
                  disabled={isSaving}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-primary text-primary-foreground text-xs font-bold shadow-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                >
                  {isSaving ? <Loader2 size={14} className="animate-spin" /> : <Save size={14} />}
                  Salvar ({pendingChanges.size})
                </button>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="px-3 py-1.5 rounded-full bg-accent/90 text-accent-foreground text-[10px] font-bold backdrop-blur-sm"
            >
              ✏️ Modo Edição Ativo
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <motion.button
        onClick={toggleEditMode}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className={`w-12 h-12 rounded-full shadow-elevated flex items-center justify-center transition-colors ${
          isEditMode
            ? "bg-accent text-accent-foreground"
            : "bg-primary text-primary-foreground"
        }`}
      >
        {isEditMode ? <X size={20} /> : <Pencil size={20} />}
      </motion.button>
    </div>
  );
};
