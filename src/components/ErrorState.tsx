import { motion } from "framer-motion";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  compact?: boolean;
}

export const ErrorState = ({
  title = "Algo deu errado",
  message = "Não foi possível carregar os dados. Verifique sua conexão e tente novamente.",
  onRetry,
  compact = false,
}: ErrorStateProps) => {
  if (compact) {
    return (
      <div className="flex items-center gap-3 p-4 rounded-xl bg-destructive/10 border border-destructive/20">
        <AlertTriangle size={18} className="text-destructive shrink-0" />
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="text-xs text-muted-foreground truncate">{message}</p>
        </div>
        {onRetry && (
          <Button size="sm" variant="outline" onClick={onRetry} className="shrink-0 gap-1.5">
            <RefreshCw size={14} />
            Tentar
          </Button>
        )}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 px-6 text-center"
    >
      <div className="w-14 h-14 rounded-2xl bg-destructive/10 flex items-center justify-center mb-4">
        <AlertTriangle size={28} className="text-destructive" />
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground max-w-xs mb-6">{message}</p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" className="gap-2">
          <RefreshCw size={16} />
          Tentar novamente
        </Button>
      )}
    </motion.div>
  );
};
