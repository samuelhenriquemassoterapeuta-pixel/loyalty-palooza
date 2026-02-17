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
    </div>
  );
};
