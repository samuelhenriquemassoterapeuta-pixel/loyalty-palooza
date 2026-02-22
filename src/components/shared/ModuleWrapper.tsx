import { usePlatformModules } from "@/hooks/usePlatformConfig";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Lock } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

interface ModuleWrapperProps {
  moduleName: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showDisabledMessage?: boolean;
}

/**
 * Controla visibilidade de módulos com base em platform_modules.
 * Verifica is_active e visible_for_roles.
 */
export const ModuleWrapper = ({
  moduleName,
  children,
  fallback,
  showDisabledMessage = true,
}: ModuleWrapperProps) => {
  const { modules, isLoading: modulesLoading } = usePlatformModules();
  const { user } = useAuth();

  // Buscar role do usuário
  const { data: userRole } = useQuery({
    queryKey: ["user-role", user?.id],
    queryFn: async () => {
      if (!user?.id) return null;
      const { data } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", user.id)
        .maybeSingle();
      return data?.role as string | null;
    },
    enabled: !!user?.id,
    staleTime: 5 * 60 * 1000,
  });

  if (modulesLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const mod = modules[moduleName];

  // Se módulo não existe na tabela, renderiza normalmente
  if (!mod) return <>{children}</>;

  // Verificar se está ativo
  if (!mod.is_active) {
    if (fallback) return <>{fallback}</>;
    if (showDisabledMessage) {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <Lock className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Módulo desativado</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Este módulo está temporariamente desativado.
          </p>
        </div>
      );
    }
    return null;
  }

  // Verificar roles
  if (mod.visible_for_roles && mod.visible_for_roles.length > 0 && userRole) {
    if (!mod.visible_for_roles.includes(userRole)) {
      return null;
    }
  }

  return <>{children}</>;
};
