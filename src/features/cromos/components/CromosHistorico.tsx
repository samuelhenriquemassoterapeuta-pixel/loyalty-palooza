import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ELEMENTO_CONFIG, type TransacaoCromo } from "../hooks/useCromos";

interface Props {
  historico: TransacaoCromo[];
  loading: boolean;
}

const TIPO_LABELS: Record<string, string> = {
  compra: "Compra",
  sessao: "Sessão",
  alquimia_debito: "Alquimia (usado)",
  alquimia_credito: "Alquimia (criado)",
  resgate: "Resgate",
  bonus: "Bônus",
  admin: "Admin",
};

export const CromosHistorico = ({ historico, loading }: Props) => {
  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-14 rounded-xl bg-muted/30 animate-pulse" />
        ))}
      </div>
    );
  }

  if (historico.length === 0) {
    return (
      <div className="text-center py-8 text-muted-foreground text-sm">
        Nenhuma transação de cromos ainda
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {historico.map((t) => {
        const cfg = ELEMENTO_CONFIG[t.elemento];
        const positivo = t.quantidade > 0;
        return (
          <div key={t.id} className="flex items-center gap-3 p-3 rounded-xl bg-muted/20">
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${cfg.corBg}`}>
              <span className="text-sm">{cfg.emoji}</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground line-clamp-1">
                {t.descricao || TIPO_LABELS[t.tipo] || t.tipo}
              </p>
              <p className="text-[10px] text-muted-foreground">
                {format(new Date(t.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
              </p>
            </div>
            <span className={`text-sm font-bold ${positivo ? "text-highlight" : "text-destructive"}`}>
              {positivo ? "+" : ""}{t.quantidade}
            </span>
          </div>
        );
      })}
    </div>
  );
};
