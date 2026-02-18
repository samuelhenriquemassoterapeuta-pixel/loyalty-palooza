import { motion } from "framer-motion";
import { useLandingConfig } from "@/features/landing/hooks/useLandingConfig";
import homeBgFallback from "@/assets/home-bg.jpg";

interface AnimatedPageBackgroundProps {
  configKey?: string;
}

export const AnimatedPageBackground = ({ configKey = "home_bg" }: AnimatedPageBackgroundProps) => {
  const { config } = useLandingConfig(configKey);
  const bgUrl = config?.imagem_url || homeBgFallback;
  const bgSpeed = config?.velocidade || 30;

  if (!bgUrl) return null;

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      <motion.div
        className="w-full h-full"
        initial={{ scale: 1.15, opacity: 0 }}
        animate={{
          scale: [1.15, 1.25, 1.15],
          opacity: [0.22, 0.32, 0.22],
        }}
        transition={{
          duration: bgSpeed,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      {/* Subtle grain texture overlay for depth */}
      <div
        className="absolute inset-0 opacity-[0.03] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />
      {/* Vignette effect */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_50%,hsl(var(--background)/0.4)_100%)]" />
    </div>
  );
};
