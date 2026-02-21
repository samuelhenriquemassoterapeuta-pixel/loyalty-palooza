import { useFeatureFlag } from "@/hooks/useFeatureFlag";
import { Loader2, Lock } from "lucide-react";

interface FeatureGateProps {
  featureKey: string;
  children: React.ReactNode;
  fallback?: React.ReactNode;
  showDisabledMessage?: boolean;
}

/**
 * Componente que controla a renderização baseado em feature flags.
 * Esconde conteúdo de módulos desativados e mostra mensagem padrão.
 */
export function FeatureGate({
  featureKey,
  children,
  fallback,
  showDisabledMessage = true,
}: FeatureGateProps) {
  const { isEnabled, isLoading } = useFeatureFlag(featureKey);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isEnabled) {
    if (fallback) return <>{fallback}</>;
    if (showDisabledMessage) {
      return (
        <div className="flex flex-col items-center justify-center p-12 text-center">
          <Lock className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-semibold mb-2">Módulo em breve</h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Esta funcionalidade está sendo preparada e estará disponível em breve.
          </p>
        </div>
      );
    }
    return null;
  }

  return <>{children}</>;
}

/**
 * Componente para itens de navegação — esconde se feature está desativada.
 */
export function FeatureNavItem({
  featureKey,
  children,
}: {
  featureKey: string;
  children: React.ReactNode;
}) {
  const { isEnabled, isLoading } = useFeatureFlag(featureKey);
  if (isLoading || !isEnabled) return null;
  return <>{children}</>;
}
