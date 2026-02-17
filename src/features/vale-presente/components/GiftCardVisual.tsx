import React from "react";
import { motion } from "framer-motion";
import { Gift, Sparkles, Heart, Leaf, Star } from "lucide-react";
import QRCode from "react-qr-code";

interface GiftCardVisualProps {
  tema: string;
  valor: number;
  destinatario: string;
  mensagem?: string;
  codigo?: string;
  compact?: boolean;
  tipo?: string;
  experienciaNome?: string;
  fillContainer?: boolean;
}

const temaConfigs: Record<string, {
  gradient: string;
  icon: typeof Gift;
  pattern: string;
  accent: string;
  label: string;
}> = {
  classico: {
    gradient: "from-[hsl(85,16%,23%)] via-[hsl(76,16%,36%)] to-[hsl(85,16%,28%)]",
    icon: Gift,
    pattern: "radial-gradient(circle at 20% 80%, hsl(76 16% 56% / 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(136 11% 75% / 0.2) 0%, transparent 50%)",
    accent: "text-[hsl(76,16%,70%)]",
    label: "Clássico",
  },
  luxo: {
    gradient: "from-[hsl(30,53%,20%)] via-[hsl(35,55%,30%)] to-[hsl(30,53%,25%)]",
    icon: Sparkles,
    pattern: "radial-gradient(circle at 30% 70%, hsl(38 70% 50% / 0.15) 0%, transparent 50%), radial-gradient(circle at 70% 30%, hsl(35 55% 50% / 0.2) 0%, transparent 50%)",
    accent: "text-[hsl(38,70%,65%)]",
    label: "Luxo",
  },
  amor: {
    gradient: "from-[hsl(340,45%,30%)] via-[hsl(350,50%,40%)] to-[hsl(340,45%,35%)]",
    icon: Heart,
    pattern: "radial-gradient(circle at 25% 75%, hsl(350 60% 60% / 0.15) 0%, transparent 50%), radial-gradient(circle at 75% 25%, hsl(340 50% 50% / 0.2) 0%, transparent 50%)",
    accent: "text-[hsl(350,60%,75%)]",
    label: "Amor",
  },
  natureza: {
    gradient: "from-[hsl(136,20%,25%)] via-[hsl(120,18%,35%)] to-[hsl(136,20%,30%)]",
    icon: Leaf,
    pattern: "radial-gradient(circle at 20% 80%, hsl(120 30% 50% / 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(136 20% 45% / 0.2) 0%, transparent 50%)",
    accent: "text-[hsl(120,30%,65%)]",
    label: "Natureza",
  },
  premium: {
    gradient: "from-[hsl(240,10%,12%)] via-[hsl(250,12%,20%)] to-[hsl(240,10%,15%)]",
    icon: Star,
    pattern: "radial-gradient(circle at 30% 70%, hsl(45 80% 55% / 0.1) 0%, transparent 50%), radial-gradient(circle at 70% 30%, hsl(200 30% 50% / 0.15) 0%, transparent 50%)",
    accent: "text-[hsl(45,80%,65%)]",
    label: "Premium",
  },
};

export const GiftCardVisual = React.forwardRef<HTMLDivElement, GiftCardVisualProps>(
  ({ tema, valor, destinatario, mensagem, codigo, compact, tipo, experienciaNome, fillContainer }, ref) => {
    const config = temaConfigs[tema] || temaConfigs.classico;
    const Icon = config.icon;
    const isExperiencia = tipo === 'experiencia';

    return (
      <motion.div
        ref={ref}
        initial={{ rotateY: -5, scale: 0.95 }}
        animate={{ rotateY: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
        className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${config.gradient} ${compact ? "p-4" : "p-6"} shadow-elevated ${fillContainer ? "w-full h-full" : ""}`}
        style={{ perspective: "1000px" }}
      >
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 opacity-60"
          style={{ background: config.pattern }}
        />

        {/* Decorative circles */}
        <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full border border-white/10" />
        <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full border border-white/10" />

        {/* Shine effect */}
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3, repeat: Infinity, repeatDelay: 5, ease: "easeInOut" }}
          style={{ width: "50%", skewX: "-15deg" }}
        />

        <div className="relative z-10">
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-sm flex items-center justify-center">
                <Icon className={`w-4 h-4 ${config.accent}`} />
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-widest text-white/50 font-medium">
                  {isExperiencia ? 'Vale Experiência' : 'Vale Presente'}
                </p>
                <p className="text-xs text-white/70 font-medium" style={{ fontFamily: "var(--font-serif)" }}>
                  Resinkra
                </p>
              </div>
            </div>
            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
            >
              <Gift className={`w-5 h-5 ${config.accent}`} />
            </motion.div>
          </div>

          {/* Value / Experience */}
          <div className={compact ? "mb-3" : "mb-5"}>
            {isExperiencia && experienciaNome ? (
              <>
                <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Experiência</p>
                <p className={`font-bold text-white ${compact ? "text-lg" : "text-xl"}`} style={{ fontFamily: "var(--font-serif)" }}>
                  {experienciaNome}
                </p>
                <p className={`text-white/60 ${compact ? "text-xs" : "text-sm"} mt-0.5`}>
                  R$ {valor.toFixed(2).replace(".", ",")}
                </p>
              </>
            ) : (
              <>
                <p className="text-[10px] uppercase tracking-wider text-white/40 mb-1">Valor</p>
                <p className={`font-bold text-white ${compact ? "text-2xl" : "text-3xl"}`} style={{ fontFamily: "var(--font-serif)" }}>
                  R$ {valor.toFixed(2).replace(".", ",")}
                </p>
              </>
            )}
          </div>

          {/* Destinatário + Code/QR */}
          <div className="flex items-end justify-between gap-2">
            <div className="flex-1 min-w-0">
              <p className="text-[10px] uppercase tracking-wider text-white/40 mb-0.5">Para</p>
              <p className="text-sm font-semibold text-white truncate">{destinatario || "..."}</p>
              {mensagem && !compact && (
                <p className="text-xs text-white/60 mt-1 line-clamp-2 italic">"{mensagem}"</p>
              )}
            </div>
            {codigo && (
              <div className="flex items-end gap-3 shrink-0">
                <div className="text-right">
                  <p className="text-[10px] uppercase tracking-wider text-white/40 mb-0.5">Código</p>
                  <p className="text-sm font-mono font-bold text-white tracking-wider">{codigo}</p>
                </div>
                {!compact && (
                  <div className="bg-white rounded-lg p-1.5">
                    <QRCode
                      value={`${window.location.origin}/vale-presente?code=${codigo}`}
                      size={48}
                      level="M"
                    />
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  }
);

GiftCardVisual.displayName = "GiftCardVisual";

export const temaOptions = Object.entries(temaConfigs).map(([key, config]) => ({
  value: key,
  label: config.label,
  icon: config.icon,
}));
