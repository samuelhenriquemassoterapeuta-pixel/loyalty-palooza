import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { FileText, Clock, CheckCircle2, Edit3 } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useNavigate } from "react-router-dom";

interface Props {
  terapeutaId?: string;
}

const statusMap: Record<string, { label: string; color: string }> = {
  rascunho: { label: "Rascunho", color: "bg-muted text-muted-foreground" },
  pendente: { label: "Pendente", color: "bg-accent/20 text-accent-foreground" },
  concluida: { label: "Concluída", color: "bg-primary/20 text-primary" },
};

export function TerapeutaAnamneseSection({ terapeutaId }: Props) {
  const navigate = useNavigate();

  const { data: fichas = [], isLoading } = useQuery({
    queryKey: ["terapeuta-fichas-anamnese", terapeutaId],
    queryFn: async () => {
      if (!terapeutaId) return [];
      const { data, error } = await supabase
        .from("fichas_anamnese")
        .select("*")
        .eq("terapeuta_id", terapeutaId)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!terapeutaId,
  });

  if (isLoading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-6 w-6 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  if (fichas.length === 0) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          <FileText className="mx-auto h-12 w-12 mb-3 opacity-40" />
          <p>Nenhuma ficha de anamnese atribuída a você.</p>
          <p className="text-xs mt-1">As fichas dos seus pacientes aparecerão aqui.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-foreground">Fichas dos Pacientes</h2>
      <p className="text-xs text-muted-foreground">{fichas.length} ficha(s) atribuída(s)</p>

      {fichas.map((ficha: any) => {
        const st = statusMap[ficha.status] || statusMap.rascunho;
        return (
          <Card
            key={ficha.id}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate("/anamnese")}
          >
            <CardContent className="py-4 flex items-center gap-3">
              <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <FileText size={16} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground truncate">{ficha.nome_completo}</p>
                <p className="text-xs text-muted-foreground">
                  {ficha.servico_nome} • {format(new Date(ficha.created_at), "dd/MM/yy", { locale: ptBR })}
                </p>
              </div>
              <Badge variant="secondary" className={`text-xs ${st.color}`}>
                {st.label}
              </Badge>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
