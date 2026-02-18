import { motion } from "framer-motion";
import { Clock, ChevronRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { useSugestaoHorario } from "../hooks/useSugestaoHorario";
import { playlists } from "../data/categorias";

interface SugestaoHorarioProps {
  onSelect: (categoryId: string) => void;
}

export function SugestaoHorario({ onSelect }: SugestaoHorarioProps) {
  const sugestao = useSugestaoHorario();
  const categoria = playlists.find(p => p.id === sugestao.categoryId);

  if (!categoria) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <Card
        className="cursor-pointer border-primary/20 bg-primary/5 hover:bg-primary/10 transition-colors"
        onClick={() => onSelect(sugestao.categoryId)}
      >
        <CardContent className="p-3 flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-xl shrink-0">
            {sugestao.emoji}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-1 text-xs text-primary font-medium">
              <Clock size={12} />
              Sugestão para agora
            </div>
            <p className="text-sm font-semibold text-foreground">{categoria.title}</p>
            <p className="text-xs text-muted-foreground truncate">{sugestao.mensagem}</p>
          </div>
          <ChevronRight size={16} className="text-primary shrink-0" />
        </CardContent>
      </Card>
    </motion.div>
  );
}
