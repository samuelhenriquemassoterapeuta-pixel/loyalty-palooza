import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Lock, Eye, EyeOff, CheckCircle, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { PasswordStrengthMeter, calculatePasswordStrength } from "@/components/PasswordStrengthMeter";
import { ButtonLoader } from "@/components/LoadingSpinner";
import logoMarrom from "@/assets/logo-marrom.png";
import simboloVerde from "@/assets/simbolo-verde.png";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [hasSession, setHasSession] = useState(false);
  const [checking, setChecking] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if we have a recovery session from the URL hash
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const type = hashParams.get("type");
    const accessToken = hashParams.get("access_token");
    const refreshToken = hashParams.get("refresh_token");

    if (type === "recovery" && accessToken && refreshToken) {
      supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      }).then(({ error }) => {
        if (error) {
          toast.error("Link de recuperação inválido ou expirado.");
          navigate("/auth");
        } else {
          setHasSession(true);
        }
        setChecking(false);
      });
    } else {
      // Also check onAuthStateChange for PKCE flow
      const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
        if (event === "PASSWORD_RECOVERY") {
          setHasSession(true);
          setChecking(false);
        }
      });

      // Check existing session
      supabase.auth.getSession().then(({ data: { session } }) => {
        if (session) {
          setHasSession(true);
        }
        setChecking(false);
      });

      return () => subscription.unsubscribe();
    }
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password.length < 6) {
      toast.error("Senha deve ter pelo menos 6 caracteres.");
      return;
    }

    if (calculatePasswordStrength(password) < 2) {
      toast.error("Senha muito fraca. Use letras maiúsculas, números ou símbolos.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("As senhas não coincidem.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { error } = await supabase.auth.updateUser({ password });

      if (error) {
        if (error.message.includes("same_password")) {
          toast.error("A nova senha deve ser diferente da senha atual.");
        } else {
          toast.error("Erro ao atualizar senha. Tente novamente.");
        }
      } else {
        setSuccess(true);
        toast.success("Senha atualizada com sucesso!");
        setTimeout(() => navigate("/"), 3000);
      }
    } catch {
      toast.error("Erro inesperado. Tente novamente.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (checking) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <ButtonLoader />
      </div>
    );
  }

  if (!hasSession) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <AlertTriangle className="w-16 h-16 text-warning mb-4" />
        <h1 className="text-xl font-bold text-foreground mb-2">Link inválido ou expirado</h1>
        <p className="text-muted-foreground text-center mb-6">
          Solicite um novo link de recuperação de senha.
        </p>
        <Button onClick={() => navigate("/auth")} className="gradient-primary text-primary-foreground">
          Voltar para o login
        </Button>
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center px-6">
        <CheckCircle className="w-16 h-16 text-primary mb-4" />
        <h1 className="text-xl font-bold text-foreground mb-2">Senha atualizada!</h1>
        <p className="text-muted-foreground text-center">
          Redirecionando para a página inicial...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background gradient-hero flex flex-col items-center justify-center px-6 relative overflow-hidden">
      <div className="absolute top-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-5 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-sm"
      >
        <div className="flex flex-col items-center mb-8">
          <img src={simboloVerde} alt="Resinkra" className="h-20 w-20 object-contain mb-4" />
          <img src={logoMarrom} alt="Resinkra" className="h-6 object-contain" />
          <p className="text-muted-foreground text-sm mt-3">Defina sua nova senha</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="password" className="text-foreground">Nova senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 6 caracteres"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pl-10 pr-10 h-12 bg-card border-border"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
            {password && <PasswordStrengthMeter password={password} className="mt-2" />}
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword" className="text-foreground">Confirmar nova senha</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <Input
                id="confirmPassword"
                type={showPassword ? "text" : "password"}
                placeholder="Repita a nova senha"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="pl-10 h-12 bg-card border-border"
              />
            </div>
            {confirmPassword && password !== confirmPassword && (
              <p className="text-sm text-destructive">As senhas não coincidem</p>
            )}
          </div>

          <Button
            type="submit"
            disabled={isSubmitting}
            className="w-full h-12 gradient-primary text-primary-foreground font-semibold shadow-button"
          >
            {isSubmitting ? <ButtonLoader /> : "Atualizar senha"}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
