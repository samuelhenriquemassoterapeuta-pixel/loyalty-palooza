import { motion } from "framer-motion";
import { ELEMENTO_CONFIG, type Elemento } from "../hooks/useCromos";

interface Props {
  saldos: { elemento: Elemento; quantidade: number }[];
  totalCromos: number;
  nivel: string;
}

const NIVEL_CONFIG: Record<string, { label: string; emoji: string; cor: string }> = {
  equilibrio: { label: "Equilíbrio", emoji: "🌱", cor: "text-green-600" },
  harmonia: { label: "Harmonia", emoji: "🌸", cor: "text-blue-600" },
  plenitude: { label: "Plenitude", emoji: "👑", cor: "text-purple-600" },
};

const ELEMENTOS_ORDEM: Elemento[] = ["terra", "agua", "fogo", "ar", "eter"];

export const CromosSaldoCards = ({ saldos, totalCromos, nivel }: Props) => {
  const nivelInfo = NIVEL_CONFIG[nivel] || NIVEL_CONFIG.equilibrio;

  const getSaldo = (el: Elemento) =>
    saldos.find((s) => s.elemento === el)?.quantidade ?? 0;

  return (
    <div className="space-y-4">
      {/* Nível header com barra de progresso */}
      <div className="glass-card rounded-2xl p-4 space-y-3">
        <div className="flex items-center gap-3">
          <motion.span
            className="text-2xl"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            {nivelInfo.emoji}
          </motion.span>
          <div className="flex-1">
            <p className={`font-bold ${nivelInfo.cor}`}>Nível {nivelInfo.label}</p>
            <p className="text-xs text-muted-foreground">
              {totalCromos} cromos elementais coletados
            </p>
          </div>
          {nivel !== "plenitude" && (
            <div className="text-right">
              <p className="text-xs text-muted-foreground">Próximo nível</p>
              <p className="text-sm font-semibold text-foreground">
                {nivel === "equilibrio" ? "500" : "1000"} cromos
              </p>
            </div>
          )}
        </div>
        {nivel !== "plenitude" && (() => {
          const meta = nivel === "equilibrio" ? 500 : 1000;
          const pct = Math.min((totalCromos / meta) * 100, 100);
          return (
            <div className="h-2 rounded-full bg-muted overflow-hidden">
              <motion.div
                className="h-full rounded-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${pct}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              />
            </div>
          );
        })()}
      </div>

      {/* Element cards */}
      <div className="grid grid-cols-5 gap-2">
        {ELEMENTOS_ORDEM.map((el, i) => {
          const cfg = ELEMENTO_CONFIG[el];
          const qtd = getSaldo(el);
          return (
            <motion.div
              key={el}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              className={`rounded-2xl p-3 text-center ${cfg.corBg} border border-border/30`}
            >
              <span className="text-2xl block mb-1">{cfg.emoji}</span>
              <p className="text-lg font-bold text-foreground">{qtd}</p>
              <p className={`text-[10px] font-medium ${cfg.cor}`}>{cfg.nome}</p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};
