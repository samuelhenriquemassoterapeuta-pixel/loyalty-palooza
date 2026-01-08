import { motion } from "framer-motion";
import simboloVerde from "@/assets/simbolo-verde.png";
import iconeFlor from "@/assets/icone-flor.png";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  variant?: "symbol" | "flower";
  text?: string;
  fullScreen?: boolean;
}

const sizeMap = {
  sm: "w-8 h-8",
  md: "w-12 h-12",
  lg: "w-20 h-20",
};

const glowSizeMap = {
  sm: "w-12 h-12",
  md: "w-20 h-20",
  lg: "w-32 h-32",
};

export const LoadingSpinner = ({ 
  size = "md", 
  variant = "symbol",
  text,
  fullScreen = false 
}: LoadingSpinnerProps) => {
  const image = variant === "symbol" ? simboloVerde : iconeFlor;

  const content = (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative">
        {/* Glow effect */}
        <motion.div
          className={`absolute inset-0 ${glowSizeMap[size]} -m-4 bg-gradient-to-br from-primary/30 to-accent/30 rounded-full blur-xl`}
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0.8, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        
        {/* Rotating ring */}
        <motion.div
          className={`absolute inset-0 ${glowSizeMap[size]} -m-4 rounded-full border-2 border-transparent border-t-primary/40 border-r-accent/40`}
          animate={{ rotate: 360 }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: "linear",
          }}
        />
        
        {/* Main symbol with pulse */}
        <motion.img
          src={image}
          alt="Carregando"
          className={`relative ${sizeMap[size]} object-contain z-10`}
          animate={{
            scale: [1, 1.05, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut",
            },
            rotate: {
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            },
          }}
        />
        
        {/* Orbiting dots */}
        {size !== "sm" && (
          <>
            <motion.div
              className="absolute w-2 h-2 bg-primary rounded-full"
              style={{ top: "50%", left: "50%" }}
              animate={{
                x: [0, 30, 0, -30, 0],
                y: [-30, 0, 30, 0, -30],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.div
              className="absolute w-1.5 h-1.5 bg-accent rounded-full"
              style={{ top: "50%", left: "50%" }}
              animate={{
                x: [0, -25, 0, 25, 0],
                y: [25, 0, -25, 0, 25],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        )}
      </div>
      
      {text && (
        <motion.p
          className="text-sm text-muted-foreground font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {text}
        </motion.p>
      )}
    </div>
  );

  if (fullScreen) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
      >
        {content}
      </motion.div>
    );
  }

  return content;
};

// Simple inline loading for buttons
export const ButtonLoader = () => (
  <motion.img
    src={iconeFlor}
    alt=""
    className="w-5 h-5 object-contain"
    animate={{ rotate: 360 }}
    transition={{
      duration: 1,
      repeat: Infinity,
      ease: "linear",
    }}
  />
);

// Page loading wrapper
export const PageLoading = ({ text = "Carregando..." }: { text?: string }) => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <LoadingSpinner size="lg" text={text} />
  </div>
);
