import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, Phone, Calendar, Hash } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { PageLoading } from "@/components/LoadingSpinner";

interface Paciente {
  user_id: string;
  nome: string;
  telefone: string | null;
  total: number;
  ultimo: string;
}

interface Props {
  pacientes: Paciente[];
  isLoading: boolean;
}

export const TerapeutaPacientesTab = ({ pacientes, isLoading }: Props) => {
  if (isLoading) return <PageLoading />;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold text-foreground">Meus Pacientes</h2>
        <Badge variant="outline" className="text-xs">{pacientes.length} paciente(s)</Badge>
      </div>

      {pacientes.length === 0 ? (
        <Card>
          <CardContent className="py-8 text-center text-muted-foreground">
            <Users className="mx-auto h-12 w-12 mb-3 opacity-40" />
            <p>Nenhum paciente encontrado.</p>
            <p className="text-xs mt-1">Pacientes aparecerão aqui após agendamentos.</p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-3">
          {pacientes.map((p) => (
            <Card key={p.user_id}>
              <CardContent className="py-4 flex items-center justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">{p.nome}</p>
                  <div className="flex items-center gap-3 text-xs text-muted-foreground mt-1">
                    <span className="flex items-center gap-1"><Hash className="h-3 w-3" />{p.total} sessão(ões)</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      Último: {format(new Date(p.ultimo), "dd/MM/yy", { locale: ptBR })}
                    </span>
                  </div>
                </div>
                {p.telefone && (
                  <Button size="sm" variant="ghost" className="gap-1 text-xs shrink-0" asChild>
                    <a href={`https://wa.me/55${p.telefone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer">
                      <Phone className="h-4 w-4" />
                    </a>
                  </Button>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};
