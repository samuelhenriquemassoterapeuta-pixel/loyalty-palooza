import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Plus, Search, Clock, CheckCircle2, Edit3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FichaAnamnese } from "../hooks/useFichasAnamnese";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Props {
  fichas: FichaAnamnese[];
  loading: boolean;
  onNew: () => void;
  onView: (ficha: FichaAnamnese) => void;
}

const statusConfig: Record<string, { label: string; icon: any; color: string }> = {
  rascunho: { label: "Rascunho", icon: Edit3, color: "bg-muted text-muted-foreground" },
  pendente: { label: "Pendente", icon: Clock, color: "bg-accent/20 text-accent-foreground" },
  concluida: { label: "Concluída", icon: CheckCircle2, color: "bg-primary/20 text-primary" },
};

export function AnamneseList({ fichas, loading, onNew, onView }: Props) {
  const [search, setSearch] = useState("");

  const filtered = fichas.filter(
    (f) =>
      f.nome_completo.toLowerCase().includes(search.toLowerCase()) ||
      f.servico_nome.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <div className="animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Buscar por nome ou terapia..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Button onClick={onNew} className="gap-2">
          <Plus size={16} />
          Nova Ficha
        </Button>
      </div>

      {filtered.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center py-16"
        >
          <FileText size={48} className="mx-auto text-muted-foreground/30 mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-1">Nenhuma ficha encontrada</h3>
          <p className="text-sm text-muted-foreground mb-4">Crie a primeira ficha de anamnese</p>
          <Button onClick={onNew} variant="outline" className="gap-2">
            <Plus size={16} /> Criar ficha
          </Button>
        </motion.div>
      ) : (
        <div className="grid gap-3">
          {filtered.map((ficha, i) => {
            const st = statusConfig[ficha.status] || statusConfig.rascunho;
            const Icon = st.icon;
            return (
              <motion.div
                key={ficha.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => onView(ficha)}
                className="flex items-center gap-4 p-4 rounded-xl bg-card border border-border hover:border-primary/30 cursor-pointer transition-all"
              >
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                  <FileText size={18} className="text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground truncate">{ficha.nome_completo}</p>
                  <p className="text-xs text-muted-foreground">{ficha.servico_nome}</p>
                </div>
                <div className="hidden sm:block text-xs text-muted-foreground">
                  {format(new Date(ficha.created_at), "dd MMM yyyy", { locale: ptBR })}
                </div>
                <Badge variant="secondary" className={`text-xs gap-1 ${st.color}`}>
                  <Icon size={12} />
                  {st.label}
                </Badge>
              </motion.div>
            );
          })}
        </div>
      )}
    </div>
  );
}
