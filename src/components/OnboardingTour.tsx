import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  X, 
  ChevronRight, 
  ChevronLeft,
  Calendar,
  ShoppingBag,
  Gift,
  Wallet,
  Sparkles,
  Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface OnboardingStep {
  id: number;
  icon: React.ElementType;
  title: string;
  description: string;
  color: string;
  tip?: string;
}

const steps: OnboardingStep[] = [
  {
    id: 1,
    icon: Sparkles,
    title: "Bem-vindo ao Resinkra!",
    description: "Seu app completo para agendamentos, compras e muito mais. Vamos fazer um tour rápido?",
    color: "from-primary to-primary/80",
  },
  {
    id: 2,
    icon: Calendar,
    title: "Agende suas sessões",
    description: "Marque massagens e terapias de forma rápida. Escolha o serviço, data e horário em poucos toques.",
    color: "from-primary to-accent",
    tip: "Dica: Você pode reagendar com até 24h de antecedência"
  },
  {
    id: 3,
    icon: ShoppingBag,
    title: "Loja exclusiva",
    description: "Produtos selecionados para seu bem-estar. Compre e retire na clínica ou receba em casa.",
    color: "from-accent to-highlight",
    tip: "Dica: Use seu cashback para economizar nas compras"
  },
  {
    id: 4,
    icon: Wallet,
    title: "Cashback em tudo",
    description: "Ganhe dinheiro de volta em cada compra e agendamento. Seu saldo fica disponível automaticamente.",
    color: "from-highlight to-primary",
    tip: "Dica: O cashback nunca expira!"
  },
  {
    id: 5,
    icon: Gift,
    title: "Indique e ganhe",
    description: "Compartilhe seu código com amigos e ganhe R$ 10 por cada indicação. Quanto mais amigos, mais você ganha!",
    color: "from-primary to-accent",
    tip: "Dica: Seu código está na tela de indicações"
  },
];

interface OnboardingTourProps {
  onComplete: () => void;
  isOpen: boolean;
}

export const OnboardingTour = ({ onComplete, isOpen }: OnboardingTourProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  const navigate = useNavigate();

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    localStorage.setItem("resinkra_onboarding_completed", "true");
    onComplete();
  };

  const handleSkip = () => {
    handleComplete();
  };

  if (!isOpen) return null;

  const step = steps[currentStep];
  const Icon = step.icon;
  const isLastStep = currentStep === steps.length - 1;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      >
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: -20 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="w-full max-w-sm bg-card rounded-3xl overflow-hidden shadow-2xl"
        >
          {/* Header with gradient */}
          <div className={`relative h-48 bg-gradient-to-br ${step.color} flex items-center justify-center`}>
            <div className="absolute inset-0 overflow-hidden">
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            </div>
            
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="relative z-10 p-6 rounded-full bg-white/20 backdrop-blur-sm"
            >
              <Icon size={48} className="text-white" />
            </motion.div>

            {/* Skip button */}
            <button
              onClick={handleSkip}
              className="absolute top-4 right-4 p-2 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
            >
              <X size={20} className="text-white" />
            </button>

            {/* Step indicator */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {steps.map((_, index) => (
                <motion.div
                  key={index}
                  className={`h-2 rounded-full transition-all ${
                    index === currentStep 
                      ? "w-6 bg-white" 
                      : index < currentStep 
                        ? "w-2 bg-white/80"
                        : "w-2 bg-white/40"
                  }`}
                />
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl font-bold text-foreground mb-2"
            >
              {step.title}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-muted-foreground mb-4"
            >
              {step.description}
            </motion.p>

            {step.tip && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="bg-primary/10 rounded-xl p-3 mb-4"
              >
                <p className="text-sm text-primary font-medium">💡 {step.tip}</p>
              </motion.div>
            )}

            {/* Navigation buttons */}
            <div className="flex gap-3 mt-6">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  className="flex-1 gap-2"
                >
                  <ChevronLeft size={18} />
                  Voltar
                </Button>
              )}
              
              <Button
                onClick={handleNext}
                className={`flex-1 gap-2 ${currentStep === 0 ? 'w-full' : ''}`}
              >
                {isLastStep ? (
                  <>
                    <Check size={18} />
                    Começar!
                  </>
                ) : (
                  <>
                    Próximo
                    <ChevronRight size={18} />
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

// Hook para controlar o onboarding
export const useOnboarding = () => {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const completed = localStorage.getItem("resinkra_onboarding_completed");
    if (!completed) {
      // Pequeno delay para mostrar após o app carregar
      const timer = setTimeout(() => {
        setShowOnboarding(true);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const startOnboarding = () => setShowOnboarding(true);
  const completeOnboarding = () => setShowOnboarding(false);
  const resetOnboarding = () => {
    localStorage.removeItem("resinkra_onboarding_completed");
    setShowOnboarding(true);
  };

  return {
    showOnboarding,
    startOnboarding,
    completeOnboarding,
    resetOnboarding
  };
};
