import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, UserCheck, Clock } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const AssinaturasTab = () => {
  const { data: assinaturas = [], isLoading } = useQuery({
    queryKey: ["admin-assinaturas"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("assinaturas_usuario")
        .select("*, assinaturas_planos(nome, cor)")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  if (isLoading) return <div className="flex justify-center py-8"><Loader2 className="animate-spin text-primary" /></div>;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Assinaturas Ativas</h3>
        <Badge variant="secondary">{assinaturas.length} total</Badge>
      </div>

      {assinaturas.length === 0 ? (
        <Card><CardContent className="p-6 text-center text-muted-foreground">Nenhuma assinatura encontrada</CardContent></Card>
      ) : (
        <div className="space-y-3">
          {assinaturas.map((a: any) => (
            <Card key={a.id}>
              <CardContent className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    {a.status === "ativo" ? <UserCheck size={20} className="text-primary" /> : <Clock size={20} className="text-muted-foreground" />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-semibold text-foreground">{(a as any).assinaturas_planos?.nome || "Plano"}</span>
                      <Badge variant={a.status === "ativo" ? "default" : "secondary"} className="text-[10px]">
                        {a.status}
                      </Badge>
                      {a.renovacao_automatica && <Badge variant="outline" className="text-[10px]">Auto-renovação</Badge>}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Início: {format(new Date(a.data_inicio), "dd/MM/yyyy", { locale: ptBR })}
                      {a.data_fim && ` · Fim: ${format(new Date(a.data_fim), "dd/MM/yyyy", { locale: ptBR })}`}
                    </p>
                    <p className="text-[10px] text-muted-foreground/70 font-mono">{a.user_id.slice(0, 8)}...</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default AssinaturasTab;
