import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { useAdmin } from "@/features/admin/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface PendingChange {
  table: string;
  key: string;
  field: string;
  value: any;
  section?: string;
}

interface EditModeContextType {
  isEditMode: boolean;
  toggleEditMode: () => void;
  isAdmin: boolean;
  pendingChanges: Map<string, PendingChange>;
  addChange: (id: string, change: PendingChange) => void;
  saveAllChanges: () => Promise<void>;
  discardChanges: () => void;
  isSaving: boolean;
}

const EditModeContext = createContext<EditModeContextType | undefined>(undefined);

export const EditModeProvider = ({ children }: { children: ReactNode }) => {
  const { isAdmin } = useAdmin();
  const [isEditMode, setIsEditMode] = useState(false);
  const [pendingChanges, setPendingChanges] = useState<Map<string, PendingChange>>(new Map());
  const [isSaving, setIsSaving] = useState(false);

  const toggleEditMode = useCallback(() => {
    if (!isAdmin) return;
    setIsEditMode((prev) => {
      if (prev && pendingChanges.size > 0) {
        // Exiting edit mode with unsaved changes
        const confirm = window.confirm("Você tem alterações não salvas. Deseja descartar?");
        if (!confirm) return true;
        setPendingChanges(new Map());
      }
      return !prev;
    });
  }, [isAdmin, pendingChanges]);

  const addChange = useCallback((id: string, change: PendingChange) => {
    setPendingChanges((prev) => {
      const next = new Map(prev);
      next.set(id, change);
      return next;
    });
  }, []);

  const saveAllChanges = useCallback(async () => {
    if (pendingChanges.size === 0) return;
    setIsSaving(true);

    try {
      // Group changes by table
      const byTable = new Map<string, PendingChange[]>();
      pendingChanges.forEach((change) => {
        const list = byTable.get(change.table) || [];
        list.push(change);
        byTable.set(change.table, list);
      });

      // Process platform_texts
      const textChanges = byTable.get("platform_texts") || [];
      for (const change of textChanges) {
        const { error } = await supabase
          .from("platform_texts" as any)
          .update({ value: change.value } as any)
          .eq("key", change.key);
        if (error) {
          // Try insert if not exists
          await supabase
            .from("platform_texts" as any)
            .insert({ key: change.key, value: change.value, section: change.section || "geral" } as any);
        }
      }

      // Process platform_media
      const mediaChanges = byTable.get("platform_media") || [];
      for (const change of mediaChanges) {
        const { error } = await supabase
          .from("platform_media" as any)
          .update({ url: change.value } as any)
          .eq("key", change.key);
        if (error) {
          await supabase
            .from("platform_media" as any)
            .insert({ key: change.key, url: change.value, type: "image", section: change.section || "geral" } as any);
        }
      }

      // Process landing_config
      const landingChanges = byTable.get("landing_config") || [];
      for (const change of landingChanges) {
        const { data: existing } = await supabase
          .from("landing_config" as any)
          .select("conteudo")
          .eq("secao", change.section)
          .maybeSingle();

        const currentContent = (existing as any)?.conteudo || {};
        const updatedContent = { ...currentContent, [change.field]: change.value };

        const { error } = await supabase
          .from("landing_config" as any)
          .update({ conteudo: updatedContent } as any)
          .eq("secao", change.section);

        if (error) {
          await supabase
            .from("landing_config" as any)
            .insert({ secao: change.section, conteudo: updatedContent } as any);
        }
      }

      setPendingChanges(new Map());
      toast.success(`${pendingChanges.size} alteração(ões) salva(s)!`);
    } catch (err: any) {
      toast.error("Erro ao salvar: " + err.message);
    } finally {
      setIsSaving(false);
    }
  }, [pendingChanges]);

  const discardChanges = useCallback(() => {
    setPendingChanges(new Map());
    toast.info("Alterações descartadas");
  }, []);

  return (
    <EditModeContext.Provider
      value={{
        isEditMode,
        toggleEditMode,
        isAdmin,
        pendingChanges,
        addChange,
        saveAllChanges,
        discardChanges,
        isSaving,
      }}
    >
      {children}
    </EditModeContext.Provider>
  );
};

export const useEditMode = () => {
  const ctx = useContext(EditModeContext);
  if (!ctx) throw new Error("useEditMode must be used within EditModeProvider");
  return ctx;
};
