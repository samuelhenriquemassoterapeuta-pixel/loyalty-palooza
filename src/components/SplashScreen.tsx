import { motion, AnimatePresence } from "framer-motion";
import simboloVerde from "@/assets/simbolo-verde.png";
import logoMarrom from "@/assets/logo-marrom.png";
import iconeFlor from "@/assets/icone-flor.png";

interface SplashScreenProps {
  isVisible: boolean;
  onComplete?: () => void;
}

export const SplashScreen = ({ isVisible, onComplete }: SplashScreenProps) => {
  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isVisible && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-background overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Background gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-background to-accent/5" />
          
          {/* Animated background circles */}
          <motion.div
            className="absolute w-[600px] h-[600px] rounded-full bg-primary/5 blur-3xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.5, opacity: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          
          <motion.div
            className="absolute w-[400px] h-[400px] rounded-full bg-accent/5 blur-3xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1.2, opacity: 0.8 }}
            transition={{ duration: 1.8, delay: 0.2, ease: "easeOut" }}
          />

          {/* Floating flower icons */}
          {[...Array(6)].map((_, i) => (
            <motion.img
              key={i}
              src={iconeFlor}
              alt=""
              className="absolute w-8 h-8 opacity-20"
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 25}%`,
              }}
              initial={{ opacity: 0, y: 20, rotate: 0 }}
              animate={{ 
                opacity: 0.15, 
                y: -20, 
                rotate: 360,
              }}
              transition={{
                duration: 3,
                delay: i * 0.15,
                repeat: Infinity,
                repeatType: "reverse",
                ease: "easeInOut",
              }}
            />
          ))}

          {/* Main content */}
          <div className="relative z-10 flex flex-col items-center">
            {/* Logo symbol with glow */}
            <motion.div
              className="relative mb-8"
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ 
                duration: 0.8, 
                ease: [0.34, 1.56, 0.64, 1],
                delay: 0.2 
              }}
            >
              {/* Glow effect */}
              <motion.div
                className="absolute inset-0 blur-2xl"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.6, 0.3] }}
                transition={{ duration: 2, delay: 0.5 }}
              >
                <img
                  src={simboloVerde}
                  alt=""
                  className="w-32 h-32 object-contain opacity-50"
                />
              </motion.div>
              
              {/* Main symbol */}
              <motion.img
                src={simboloVerde}
                alt="Resinkra"
                className="w-32 h-32 object-contain relative z-10"
                animate={{ 
                  scale: [1, 1.05, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              
              {/* Orbital ring */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                initial={{ opacity: 0, rotate: 0 }}
                animate={{ opacity: 1, rotate: 360 }}
                transition={{ 
                  opacity: { duration: 0.5, delay: 0.8 },
                  rotate: { duration: 8, repeat: Infinity, ease: "linear" }
                }}
              >
                <div className="w-40 h-40 border border-primary/20 rounded-full">
                  <motion.div
                    className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary rounded-full shadow-glow"
                  />
                </div>
              </motion.div>
            </motion.div>

            {/* Logo text */}
            <motion.img
              src={logoMarrom}
              alt="Resinkra"
              className="h-10 object-contain mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            />

            {/* Tagline */}
            <motion.p
              className="text-muted-foreground text-sm tracking-widest uppercase"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.9 }}
            >
              Beleza & Bem-estar
            </motion.p>

            {/* Loading indicator */}
            <motion.div
              className="mt-12 flex items-center gap-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-2 h-2 rounded-full bg-primary"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: i * 0.15,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};