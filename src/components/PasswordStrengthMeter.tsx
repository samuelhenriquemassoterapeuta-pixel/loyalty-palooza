import { useMemo } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface PasswordStrengthMeterProps {
  password: string;
  className?: string;
}

interface PasswordRequirement {
  label: string;
  test: (password: string) => boolean;
}

const requirements: PasswordRequirement[] = [
  { label: "Pelo menos 6 caracteres", test: (p) => p.length >= 6 },
  { label: "Uma letra maiúscula", test: (p) => /[A-Z]/.test(p) },
  { label: "Uma letra minúscula", test: (p) => /[a-z]/.test(p) },
  { label: "Um número", test: (p) => /[0-9]/.test(p) },
  { label: "Um caractere especial", test: (p) => /[!@#$%^&*(),.?":{}|<>]/.test(p) },
];

export const calculatePasswordStrength = (password: string): number => {
  if (!password) return 0;
  
  let score = 0;
  
  // Length scoring
  if (password.length >= 6) score += 1;
  if (password.length >= 8) score += 1;
  if (password.length >= 12) score += 1;
  
  // Character variety scoring
  if (/[A-Z]/.test(password)) score += 1;
  if (/[a-z]/.test(password)) score += 1;
  if (/[0-9]/.test(password)) score += 1;
  if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) score += 1;
  
  // Normalize to 0-4 scale
  return Math.min(Math.floor(score / 2), 4);
};

export const getStrengthLabel = (strength: number): { label: string; color: string } => {
  switch (strength) {
    case 0:
      return { label: "Muito fraca", color: "bg-destructive" };
    case 1:
      return { label: "Fraca", color: "bg-warning" };
    case 2:
      return { label: "Média", color: "bg-yellow-500" };
    case 3:
      return { label: "Boa", color: "bg-accent" };
    case 4:
      return { label: "Excelente", color: "bg-green-500" };
    default:
      return { label: "", color: "bg-muted" };
  }
};

export const PasswordStrengthMeter = ({ password, className }: PasswordStrengthMeterProps) => {
  const strength = useMemo(() => calculatePasswordStrength(password), [password]);
  const { label, color } = getStrengthLabel(strength);
  
  const passedRequirements = useMemo(() => 
    requirements.map(req => ({
      ...req,
      passed: req.test(password)
    })),
    [password]
  );

  if (!password) return null;

  return (
    <div className={cn("space-y-3", className)}>
      {/* Strength bar */}
      <div className="space-y-1.5">
        <div className="flex justify-between items-center">
          <span className="text-xs text-muted-foreground">Força da senha</span>
          <span className={cn(
            "text-xs font-medium",
            strength <= 1 && "text-destructive",
            strength === 2 && "text-warning",
            strength >= 3 && "text-highlight"
          )}>
            {label}
          </span>
        </div>
        <div className="flex gap-1">
          {[0, 1, 2, 3].map((index) => (
            <div
              key={index}
              className={cn(
                "h-1.5 flex-1 rounded-full transition-all duration-300",
                index < strength ? color : "bg-muted"
              )}
            />
          ))}
        </div>
      </div>

      {/* Requirements checklist */}
      <div className="space-y-1.5">
        {passedRequirements.map((req, index) => (
          <div 
            key={index}
            className={cn(
              "flex items-center gap-2 text-xs transition-colors duration-200",
              req.passed ? "text-highlight" : "text-muted-foreground"
            )}
          >
            {req.passed ? (
              <Check className="w-3.5 h-3.5 text-highlight" />
            ) : (
              <X className="w-3.5 h-3.5 text-muted-foreground/50" />
            )}
            <span>{req.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordStrengthMeter;
