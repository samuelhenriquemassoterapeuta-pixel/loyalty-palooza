import React from "react";
import { motion } from "framer-motion";
import { Scissors, Percent, Tag, Sparkles } from "lucide-react";
import logoMarrom from "@/assets/logo-marrom.png";
import logoBranco from "@/assets/logo-branco.png";

export interface CupomData {
  titulo: string;
  subtitulo: string;
  desconto: string;
  tipoDesconto: "percentual" | "valor" | "texto";
  codigo: string;
  validade: string;
  termos: string;
  estilo: "folha" | "canela" | "areia" | "meditacao";
}

interface CupomVisualProps {
  data: CupomData;
  formato: "stories" | "feed" | "impressao";
}

const estiloConfigs = {
  folha: {
    bg: "from-[hsl(85,16%,23%)] via-[hsl(85,16%,28%)] to-[hsl(76,16%,36%)]",
    accent: "hsl(76,16%,70%)",
    accentClass: "text-[hsl(76,16%,70%)]",
    borderClass: "border-[hsl(76,16%,56%)/0.3]",
    mutedText: "text-white/50",
    mainText: "text-white",
    tagBg: "bg-white/10",
    logo: "branco",
    pattern: "radial-gradient(circle at 15% 85%, hsl(76 16% 56% / 0.12) 0%, transparent 50%), radial-gradient(circle at 85% 15%, hsl(136 11% 75% / 0.15) 0%, transparent 50%)",
  },
  canela: {
    bg: "from-[hsl(30,53%,20%)] via-[hsl(30,53%,28%)] to-[hsl(35,55%,35%)]",
    accent: "hsl(38,70%,65%)",
    accentClass: "text-[hsl(38,70%,65%)]",
    borderClass: "border-[hsl(38,70%,50%)/0.3]",
    mutedText: "text-white/50",
    mainText: "text-white",
    tagBg: "bg-white/10",
    logo: "branco",
    pattern: "radial-gradient(circle at 20% 80%, hsl(38 70% 50% / 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(35 55% 40% / 0.15) 0%, transparent 50%)",
  },
  areia: {
    bg: "from-[hsl(60,22%,92%)] via-[hsl(60,18%,88%)] to-[hsl(60,14%,85%)]",
    accent: "hsl(85,16%,23%)",
    accentClass: "text-[hsl(85,16%,23%)]",
    borderClass: "border-[hsl(85,16%,23%)/0.15]",
    mutedText: "text-[hsl(28,45%,12%)/0.5]",
    mainText: "text-[hsl(28,45%,12%)]",
    tagBg: "bg-[hsl(85,16%,23%)/0.08]",
    logo: "marrom",
    pattern: "radial-gradient(circle at 15% 85%, hsl(85 16% 23% / 0.04) 0%, transparent 50%), radial-gradient(circle at 85% 15%, hsl(76 16% 56% / 0.06) 0%, transparent 50%)",
  },
  meditacao: {
    bg: "from-[hsl(76,16%,48%)] via-[hsl(76,16%,52%)] to-[hsl(136,11%,60%)]",
    accent: "hsl(85,16%,18%)",
    accentClass: "text-[hsl(85,16%,18%)]",
    borderClass: "border-[hsl(85,16%,18%)/0.2]",
    mutedText: "text-[hsl(85,16%,18%)/0.5]",
    mainText: "text-[hsl(85,16%,18%)]",
    tagBg: "bg-[hsl(85,16%,18%)/0.1]",
    logo: "marrom",
    pattern: "radial-gradient(circle at 20% 80%, hsl(85 16% 23% / 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(136 11% 65% / 0.1) 0%, transparent 50%)",
  },
};

const formatoSizes: Record<string, { width: number; height: number; className: string }> = {
  stories: { width: 1080, height: 1920, className: "w-[270px] h-[480px]" },
  feed: { width: 1080, height: 1080, className: "w-[320px] h-[320px]" },
  impressao: { width: 600, height: 400, className: "w-[360px] h-[240px]" },
};

export const CupomVisual = React.forwardRef<HTMLDivElement, CupomVisualProps>(
  ({ data, formato }, ref) => {
    const config = estiloConfigs[data.estilo] || estiloConfigs.folha;
    const size = formatoSizes[formato];
    const logoSrc = config.logo === "branco" ? logoBranco : logoMarrom;

    if (formato === "stories") {
      return (
        <div
          ref={ref}
          className={`${size.className} relative overflow-hidden rounded-2xl bg-gradient-to-b ${config.bg} flex flex-col`}
          data-export-width={size.width}
          data-export-height={size.height}
        >
          <div className="absolute inset-0 opacity-60" style={{ background: config.pattern }} />
          {/* Decorative */}
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full border border-white/10" />
          <div className="absolute bottom-20 -left-8 w-28 h-28 rounded-full border border-white/10" />

          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-white/3 to-transparent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
            style={{ height: "30%" }}
          />

          <div className="relative z-10 flex flex-col items-center justify-between h-full py-10 px-6">
            {/* Logo */}
            <img src={logoSrc} alt="Resinkra" className="h-8 object-contain" />

            {/* Main content */}
            <div className="text-center space-y-4 flex-1 flex flex-col items-center justify-center">
              <div className={`flex items-center gap-1.5 ${config.tagBg} px-3 py-1 rounded-full`}>
                <Sparkles className={`w-3 h-3 ${config.accentClass}`} />
                <p className={`text-[9px] uppercase tracking-[0.2em] font-semibold ${config.mutedText}`}>
                  Oferta Especial
                </p>
              </div>

              <p className={`text-xs font-medium ${config.mutedText} max-w-[200px]`}>
                {data.subtitulo}
              </p>

              <div className="relative">
                <p className={`text-6xl font-bold ${config.mainText}`} style={{ fontFamily: "var(--font-serif)" }}>
                  {data.tipoDesconto === "percentual" ? `${data.desconto}%` : data.tipoDesconto === "valor" ? `R$${data.desconto}` : data.desconto}
                </p>
                {data.tipoDesconto === "percentual" && (
                  <p className={`text-sm uppercase tracking-wider font-semibold ${config.accentClass} mt-1`}>
                    de desconto
                  </p>
                )}
              </div>

              <p className={`text-sm font-bold ${config.mainText} max-w-[200px] leading-relaxed`} style={{ fontFamily: "var(--font-serif)" }}>
                {data.titulo}
              </p>

              {/* Dashed separator */}
              <div className={`w-full border-t border-dashed ${config.borderClass} my-2 relative`}>
                <Scissors className={`w-3 h-3 ${config.mutedText} absolute -top-1.5 left-0`} />
              </div>

              {/* Code */}
              <div className={`${config.tagBg} backdrop-blur-sm rounded-xl px-5 py-2.5`}>
                <p className={`text-[8px] uppercase tracking-widest ${config.mutedText} mb-0.5`}>Use o código</p>
                <p className={`text-lg font-mono font-bold tracking-[0.15em] ${config.mainText}`}>{data.codigo}</p>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center space-y-1">
              <p className={`text-[9px] ${config.mutedText}`}>
                Válido até {data.validade}
              </p>
              <p className={`text-[8px] ${config.mutedText} max-w-[200px]`}>
                {data.termos}
              </p>
            </div>
          </div>
        </div>
      );
    }

    if (formato === "feed") {
      return (
        <div
          ref={ref}
          className={`${size.className} relative overflow-hidden rounded-2xl bg-gradient-to-br ${config.bg} flex flex-col`}
          data-export-width={size.width}
          data-export-height={size.height}
        >
          <div className="absolute inset-0 opacity-60" style={{ background: config.pattern }} />
          <div className="absolute -top-8 -right-8 w-32 h-32 rounded-full border border-white/10" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 rounded-full border border-white/10" />

          <div className="relative z-10 flex flex-col items-center justify-between h-full p-6">
            <div className="flex items-center justify-between w-full">
              <img src={logoSrc} alt="Resinkra" className="h-6 object-contain" />
              <div className={`flex items-center gap-1 ${config.tagBg} px-2 py-0.5 rounded-full`}>
                <Tag className={`w-2.5 h-2.5 ${config.accentClass}`} />
                <span className={`text-[8px] uppercase tracking-widest font-semibold ${config.mutedText}`}>Cupom</span>
              </div>
            </div>

            <div className="text-center space-y-3 flex-1 flex flex-col items-center justify-center">
              <p className={`text-xs font-medium ${config.mutedText}`}>{data.subtitulo}</p>
              <p className={`text-5xl font-bold ${config.mainText}`} style={{ fontFamily: "var(--font-serif)" }}>
                {data.tipoDesconto === "percentual" ? `${data.desconto}%` : data.tipoDesconto === "valor" ? `R$${data.desconto}` : data.desconto}
              </p>
              {data.tipoDesconto !== "texto" && (
                <p className={`text-[10px] uppercase tracking-wider font-semibold ${config.accentClass}`}>
                  {data.tipoDesconto === "percentual" ? "de desconto" : "off"}
                </p>
              )}
              <p className={`text-sm font-bold ${config.mainText}`} style={{ fontFamily: "var(--font-serif)" }}>{data.titulo}</p>

              <div className={`w-3/4 border-t border-dashed ${config.borderClass} my-1`} />

              <div className={`${config.tagBg} backdrop-blur-sm rounded-lg px-4 py-1.5`}>
                <p className={`text-[7px] uppercase tracking-widest ${config.mutedText}`}>Código</p>
                <p className={`text-base font-mono font-bold tracking-[0.12em] ${config.mainText}`}>{data.codigo}</p>
              </div>
            </div>

            <p className={`text-[8px] ${config.mutedText}`}>Válido até {data.validade} · {data.termos}</p>
          </div>
        </div>
      );
    }

    // Impressão (print-friendly horizontal card)
    return (
      <div
        ref={ref}
        className={`${size.className} relative overflow-hidden rounded-xl bg-gradient-to-r ${config.bg} flex`}
        data-export-width={size.width}
        data-export-height={size.height}
      >
        <div className="absolute inset-0 opacity-60" style={{ background: config.pattern }} />
        <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full border border-white/10" />

        <div className="relative z-10 flex items-center w-full p-5 gap-5">
          {/* Left: Discount */}
          <div className="flex flex-col items-center justify-center min-w-[100px]">
            <img src={logoSrc} alt="Resinkra" className="h-5 object-contain mb-3" />
            <p className={`text-4xl font-bold ${config.mainText}`} style={{ fontFamily: "var(--font-serif)" }}>
              {data.tipoDesconto === "percentual" ? `${data.desconto}%` : data.tipoDesconto === "valor" ? `R$${data.desconto}` : data.desconto}
            </p>
            {data.tipoDesconto !== "texto" && (
              <p className={`text-[9px] uppercase tracking-wider font-semibold ${config.accentClass} mt-0.5`}>
                {data.tipoDesconto === "percentual" ? "desconto" : "off"}
              </p>
            )}
          </div>

          {/* Dashed vertical separator */}
          <div className={`h-full border-l border-dashed ${config.borderClass} relative`}>
            <Scissors className={`w-3 h-3 ${config.mutedText} absolute -left-1.5 top-0 rotate-90`} />
          </div>

          {/* Right: Details */}
          <div className="flex-1 min-w-0 space-y-2">
            <p className={`text-xs font-bold ${config.mainText} leading-tight`} style={{ fontFamily: "var(--font-serif)" }}>{data.titulo}</p>
            <p className={`text-[9px] ${config.mutedText}`}>{data.subtitulo}</p>

            <div className={`${config.tagBg} rounded-md px-3 py-1 inline-block`}>
              <p className={`text-[7px] uppercase tracking-widest ${config.mutedText}`}>Código</p>
              <p className={`text-sm font-mono font-bold tracking-wider ${config.mainText}`}>{data.codigo}</p>
            </div>

            <div className="flex items-center gap-3">
              <p className={`text-[8px] ${config.mutedText}`}>Válido até {data.validade}</p>
              <p className={`text-[7px] ${config.mutedText}`}>{data.termos}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }
);

CupomVisual.displayName = "CupomVisual";

export const estiloOptions = [
  { value: "folha" as const, label: "Folha Sombra", desc: "Verde escuro premium" },
  { value: "canela" as const, label: "Canela com Mel", desc: "Marrom dourado" },
  { value: "areia" as const, label: "Areia Serena", desc: "Claro e elegante" },
  { value: "meditacao" as const, label: "Meditação", desc: "Verde suave" },
];
