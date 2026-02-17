import React from "react";
import { motion } from "framer-motion";
import { Sparkles, Heart, Star, Leaf } from "lucide-react";
import logoMarrom from "@/assets/logo-marrom.png";
import logoBranco from "@/assets/logo-branco.png";

export interface SocialPostData {
  titulo: string;
  subtitulo: string;
  descricao: string;
  cta: string;
  template: "promo" | "depoimento" | "dica" | "resultado";
  estilo: "folha" | "canela" | "areia" | "meditacao";
}

const estiloConfigs = {
  folha: {
    bg: "from-[hsl(85,16%,23%)] via-[hsl(85,16%,28%)] to-[hsl(76,16%,36%)]",
    accentClass: "text-[hsl(76,16%,70%)]",
    mutedText: "text-white/50",
    mainText: "text-white",
    tagBg: "bg-white/10",
    ctaBg: "bg-white/20 hover:bg-white/30",
    ctaText: "text-white",
    logo: "branco",
    pattern: "radial-gradient(circle at 15% 85%, hsl(76 16% 56% / 0.12) 0%, transparent 50%), radial-gradient(circle at 85% 15%, hsl(136 11% 75% / 0.15) 0%, transparent 50%)",
  },
  canela: {
    bg: "from-[hsl(30,53%,20%)] via-[hsl(30,53%,28%)] to-[hsl(35,55%,35%)]",
    accentClass: "text-[hsl(38,70%,65%)]",
    mutedText: "text-white/50",
    mainText: "text-white",
    tagBg: "bg-white/10",
    ctaBg: "bg-[hsl(38,70%,55%)]/80",
    ctaText: "text-white",
    logo: "branco",
    pattern: "radial-gradient(circle at 20% 80%, hsl(38 70% 50% / 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(35 55% 40% / 0.15) 0%, transparent 50%)",
  },
  areia: {
    bg: "from-[hsl(60,22%,92%)] via-[hsl(60,18%,88%)] to-[hsl(60,14%,85%)]",
    accentClass: "text-[hsl(85,16%,23%)]",
    mutedText: "text-[hsl(28,45%,12%)/0.5]",
    mainText: "text-[hsl(28,45%,12%)]",
    tagBg: "bg-[hsl(85,16%,23%)/0.08]",
    ctaBg: "bg-[hsl(85,16%,23%)]",
    ctaText: "text-white",
    logo: "marrom",
    pattern: "radial-gradient(circle at 15% 85%, hsl(85 16% 23% / 0.04) 0%, transparent 50%), radial-gradient(circle at 85% 15%, hsl(76 16% 56% / 0.06) 0%, transparent 50%)",
  },
  meditacao: {
    bg: "from-[hsl(76,16%,48%)] via-[hsl(76,16%,52%)] to-[hsl(136,11%,60%)]",
    accentClass: "text-[hsl(85,16%,18%)]",
    mutedText: "text-[hsl(85,16%,18%)/0.5]",
    mainText: "text-[hsl(85,16%,18%)]",
    tagBg: "bg-[hsl(85,16%,18%)/0.1]",
    ctaBg: "bg-[hsl(85,16%,18%)]",
    ctaText: "text-white",
    logo: "marrom",
    pattern: "radial-gradient(circle at 20% 80%, hsl(85 16% 23% / 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 20%, hsl(136 11% 65% / 0.1) 0%, transparent 50%)",
  },
};

const templateConfig = {
  promo: { icon: Sparkles, badge: "Promoção" },
  depoimento: { icon: Heart, badge: "Depoimento" },
  dica: { icon: Leaf, badge: "Dica de Bem-Estar" },
  resultado: { icon: Star, badge: "Resultado" },
};

const formatoSizes: Record<string, { width: number; height: number; className: string }> = {
  stories: { width: 1080, height: 1920, className: "w-[270px] h-[480px]" },
  feed: { width: 1080, height: 1080, className: "w-[320px] h-[320px]" },
  banner: { width: 1200, height: 628, className: "w-[360px] h-[188px]" },
};

export const SocialPostVisual = React.forwardRef<HTMLDivElement, { data: SocialPostData; formato: string }>(
  ({ data, formato }, ref) => {
    const config = estiloConfigs[data.estilo] || estiloConfigs.folha;
    const size = formatoSizes[formato] || formatoSizes.stories;
    const tmpl = templateConfig[data.template] || templateConfig.promo;
    const Icon = tmpl.icon;
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
          <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full border border-white/10" />
          <div className="absolute bottom-24 -left-10 w-32 h-32 rounded-full border border-white/10" />

          <motion.div
            className="absolute inset-0 bg-gradient-to-b from-transparent via-white/3 to-transparent"
            animate={{ y: ["-100%", "200%"] }}
            transition={{ duration: 4, repeat: Infinity, repeatDelay: 6, ease: "easeInOut" }}
            style={{ height: "30%" }}
          />

          <div className="relative z-10 flex flex-col items-center justify-between h-full py-10 px-6">
            <img src={logoSrc} alt="Resinkra" className="h-8 object-contain" />

            <div className="text-center space-y-5 flex-1 flex flex-col items-center justify-center max-w-[230px]">
              <div className={`flex items-center gap-1.5 ${config.tagBg} px-3 py-1 rounded-full`}>
                <Icon className={`w-3 h-3 ${config.accentClass}`} />
                <p className={`text-[9px] uppercase tracking-[0.2em] font-semibold ${config.mutedText}`}>
                  {tmpl.badge}
                </p>
              </div>

              <p className={`text-2xl font-bold ${config.mainText} leading-tight`} style={{ fontFamily: "var(--font-serif)" }}>
                {data.titulo}
              </p>

              <p className={`text-xs font-medium ${config.accentClass}`}>{data.subtitulo}</p>

              <p className={`text-[11px] ${config.mutedText} leading-relaxed`}>{data.descricao}</p>

              {data.cta && (
                <div className={`${config.ctaBg} backdrop-blur-sm rounded-full px-6 py-2 mt-2`}>
                  <p className={`text-xs font-semibold ${config.ctaText} tracking-wide`}>{data.cta}</p>
                </div>
              )}
            </div>

            <div className="text-center">
              <p className={`text-[8px] ${config.mutedText}`}>@resinkra · resinkra.com.br</p>
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

          <div className="relative z-10 flex flex-col items-center justify-between h-full p-6">
            <div className="flex items-center justify-between w-full">
              <img src={logoSrc} alt="Resinkra" className="h-5 object-contain" />
              <div className={`flex items-center gap-1 ${config.tagBg} px-2 py-0.5 rounded-full`}>
                <Icon className={`w-2.5 h-2.5 ${config.accentClass}`} />
                <span className={`text-[8px] uppercase tracking-widest font-semibold ${config.mutedText}`}>{tmpl.badge}</span>
              </div>
            </div>

            <div className="text-center space-y-3 flex-1 flex flex-col items-center justify-center max-w-[260px]">
              <p className={`text-xl font-bold ${config.mainText} leading-tight`} style={{ fontFamily: "var(--font-serif)" }}>
                {data.titulo}
              </p>
              <p className={`text-[10px] font-medium ${config.accentClass}`}>{data.subtitulo}</p>
              <p className={`text-[10px] ${config.mutedText} leading-relaxed`}>{data.descricao}</p>
              {data.cta && (
                <div className={`${config.ctaBg} backdrop-blur-sm rounded-full px-5 py-1.5 mt-1`}>
                  <p className={`text-[10px] font-semibold ${config.ctaText}`}>{data.cta}</p>
                </div>
              )}
            </div>

            <p className={`text-[7px] ${config.mutedText}`}>@resinkra</p>
          </div>
        </div>
      );
    }

    // Banner
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
          <div className="flex flex-col items-center justify-center min-w-[90px]">
            <img src={logoSrc} alt="Resinkra" className="h-5 object-contain mb-2" />
            <div className={`flex items-center gap-1 ${config.tagBg} px-2 py-0.5 rounded-full`}>
              <Icon className={`w-2.5 h-2.5 ${config.accentClass}`} />
              <span className={`text-[7px] uppercase tracking-widest ${config.mutedText}`}>{tmpl.badge}</span>
            </div>
          </div>

          <div className="flex-1 min-w-0 space-y-1.5">
            <p className={`text-sm font-bold ${config.mainText} leading-tight`} style={{ fontFamily: "var(--font-serif)" }}>{data.titulo}</p>
            <p className={`text-[9px] ${config.accentClass}`}>{data.subtitulo}</p>
            <p className={`text-[8px] ${config.mutedText} line-clamp-2`}>{data.descricao}</p>
            {data.cta && (
              <div className={`${config.ctaBg} backdrop-blur-sm rounded-full px-3 py-1 inline-block mt-1`}>
                <p className={`text-[8px] font-semibold ${config.ctaText}`}>{data.cta}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
);

SocialPostVisual.displayName = "SocialPostVisual";

export const templateOptions = [
  { value: "promo" as const, label: "Promoção", desc: "Ofertas e descontos" },
  { value: "depoimento" as const, label: "Depoimento", desc: "Feedback de clientes" },
  { value: "dica" as const, label: "Dica", desc: "Conteúdo educativo" },
  { value: "resultado" as const, label: "Resultado", desc: "Antes e depois" },
];
