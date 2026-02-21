import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { AlertTriangle, Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface DisclaimerBannerProps {
  categoria: string;
  className?: string;
}

export function DisclaimerBanner({ categoria, className }: DisclaimerBannerProps) {
  const { data: disclaimer } = useQuery({
    queryKey: ["disclaimer", categoria],
    queryFn: async () => {
      const { data } = await supabase
        .from("curso_disclaimers")
        .select("*")
        .eq("categoria", categoria)
        .single();
      return data;
    },
    staleTime: Infinity,
  });

  if (!disclaimer) return null;

  return (
    <Alert
      variant={disclaimer.obrigatorio ? "destructive" : "default"}
      className={className}
    >
      {disclaimer.obrigatorio ? (
        <AlertTriangle className="h-4 w-4" />
      ) : (
        <Info className="h-4 w-4" />
      )}
      <AlertDescription className="text-xs leading-relaxed">
        {disclaimer.texto_disclaimer}
      </AlertDescription>
    </Alert>
  );
}
