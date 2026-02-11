import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable/index";
import { toast } from "sonner";
import { z } from "zod";
import logoMarrom from "@/assets/logo-marrom.png";
import simboloVerde from "@/assets/simbolo-verde.png";
import { PageLoading, ButtonLoader } from "@/components/LoadingSpinner";
import { PasswordStrengthMeter, calculatePasswordStrength } from "@/components/PasswordStrengthMeter";
import { useRateLimit } from "@/hooks/useRateLimit";

const emailSchema = z.string().email("Email inválido");
const passwordSchema = z.string().min(6, "Senha deve ter pelo menos 6 caracteres");
const nomeSchema = z.string().min(2, "Nome deve ter pelo menos 2 caracteres");

type AuthMode = "login" | "signup" | "forgot-password";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [nome, setNome] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; confirmPassword?: string; nome?: string }>({});

  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { rateLimitStatus, checkRateLimit, recordAttempt, getTimeUntilUnblock } = useRateLimit();
  const [googleLoading, setGoogleLoading] = useState(false);
  const [appleLoading, setAppleLoading] = useState(false);
  useEffect(() => {
    if (!loading && user) {
      const redirectTo = searchParams.get("redirect") || "/";
      navigate(redirectTo);
    }
  }, [user, loading, navigate, searchParams]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; confirmPassword?: string; nome?: string } = {};
    
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    if (mode !== "forgot-password") {
      const passwordResult = passwordSchema.safeParse(password);
      if (!passwordResult.success) {
        newErrors.password = passwordResult.error.errors[0].message;
      }
      
      // For signup, recommend stronger passwords
      if (mode === "signup" && password.length >= 6) {
        const strength = calculatePasswordStrength(password);
        if (strength < 2) {
          newErrors.password = "Senha muito fraca. Adicione letras maiúsculas, números ou símbolos.";
        }
      }
      
      // Check confirm password match
      if (mode === "signup" && password !== confirmPassword) {
        newErrors.confirmPassword = "As senhas não coincidem";
      }
    }

    if (mode === "signup") {
      const nomeResult = nomeSchema.safeParse(nome);
      if (!nomeResult.success) {
        newErrors.nome = nomeResult.error.errors[0].message;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      if (mode === "forgot-password") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/auth`,
        });
        
        if (error) {
          toast.error("Erro ao enviar email de recuperação");
        } else {
          toast.success("Email de recuperação enviado!", {
            description: "Verifique sua caixa de entrada e spam.",
          });
          setMode("login");
        }
      } else if (mode === "login") {
        // Check rate limit before attempting login
        const status = await checkRateLimit(email);
        if (status?.isBlocked) {
          const timeLeft = getTimeUntilUnblock();
          toast.error("Muitas tentativas de login", {
            description: `Tente novamente em ${timeLeft || "alguns minutos"}.`,
          });
          setIsSubmitting(false);
          return;
        }

        const { error } = await signIn(email, password);
        if (error) {
          // Record failed attempt
          await recordAttempt(email, false);
          
          if (error.message.includes("Invalid login credentials")) {
            const remaining = (status?.remainingAttempts ?? 5) - 1;
            if (remaining > 0) {
              toast.error("Email ou senha incorretos", {
                description: `${remaining} tentativa${remaining === 1 ? "" : "s"} restante${remaining === 1 ? "" : "s"}.`,
              });
            } else {
              toast.error("Email ou senha incorretos", {
                description: "Conta bloqueada temporariamente. Tente novamente em 15 minutos.",
              });
            }
          } else {
            toast.error("Erro ao fazer login. Tente novamente.");
          }
        } else {
          // Record successful attempt
          await recordAttempt(email, true);
          toast.success("Login realizado com sucesso!");
        }
      } else {
        const { error } = await signUp(email, password, nome);
        if (error) {
          if (error.message.includes("User already registered")) {
            toast.error("Este email já está cadastrado");
          } else {
            toast.error("Erro ao criar conta. Tente novamente.");
          }
        } else {
          toast.success("Conta criada com sucesso!");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const { error } = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin,
      });
      if (error) {
        toast.error("Erro ao fazer login com Google. Tente novamente.");
      }
    } catch {
      toast.error("Erro ao conectar com Google.");
    } finally {
      setGoogleLoading(false);
    }
  };

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setErrors({});
    setConfirmPassword("");
  };

  if (loading) {
    return <PageLoading text="Verificando..." />;
  }

  return (
    <div className="min-h-screen bg-background gradient-hero flex flex-col relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-20 right-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-5 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute top-1/3 left-10 w-3 h-3 bg-accent rounded-full animate-pulse-soft" />
      <div className="absolute top-1/4 right-20 w-2 h-2 bg-highlight rounded-full animate-bounce-subtle" />
      <div className="absolute bottom-1/3 right-10 w-4 h-4 bg-warning/60 rounded-full animate-float" />
      
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-sm"
        >
          {/* Logo */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="absolute -inset-3 bg-gradient-to-br from-primary/20 to-accent/20 rounded-full blur-xl" />
              <img 
                src={simboloVerde} 
                alt="Resinkra" 
                className="relative h-24 w-24 object-contain mb-4"
              />
            </div>
            <img 
              src={logoMarrom} 
              alt="Resinkra" 
              className="h-7 object-contain mt-2"
            />
            <p className="text-muted-foreground text-sm mt-2">
              {mode === "login" && "Bem-vindo de volta"}
              {mode === "signup" && "Crie sua conta"}
              {mode === "forgot-password" && "Recuperar senha"}
            </p>
          </div>

          {/* Forgot Password Back Button */}
          {mode === "forgot-password" && (
            <button
              onClick={() => switchMode("login")}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 transition-colors"
            >
              <ArrowLeft size={18} />
              <span className="text-sm">Voltar para login</span>
            </button>
          )}

          {/* Rate Limit Warning */}
          {mode === "login" && rateLimitStatus?.isBlocked && (
            <Alert variant="destructive" className="mb-4">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Muitas tentativas de login. Tente novamente em {getTimeUntilUnblock() || "alguns minutos"}.
              </AlertDescription>
            </Alert>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="nome" className="text-foreground">Nome</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="nome"
                    type="text"
                    placeholder="Seu nome"
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    className="pl-10 h-12 bg-card border-border"
                  />
                </div>
                {errors.nome && (
                  <p className="text-sm text-destructive">{errors.nome}</p>
                )}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-foreground">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-12 bg-card border-border"
                />
              </div>
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            {mode !== "forgot-password" && (
              <div className="space-y-2">
                <Label htmlFor="password" className="text-foreground">Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
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
                {errors.password && (
                  <p className="text-sm text-destructive">{errors.password}</p>
                )}
                
                {/* Password strength meter - only show in signup mode */}
                <AnimatePresence>
                  {mode === "signup" && password && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <PasswordStrengthMeter password={password} className="mt-3" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* Confirm Password Field - only in signup mode */}
            {mode === "signup" && (
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-foreground">Confirmar Senha</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    id="confirmPassword"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 h-12 bg-card border-border"
                  />
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">{errors.confirmPassword}</p>
                )}
              </div>
            )}

            {/* Forgot Password Link */}
            {mode === "login" && (
              <div className="text-right">
                <button
                  type="button"
                  onClick={() => switchMode("forgot-password")}
                  className="text-sm text-accent hover:text-accent/80 font-medium hover:underline transition-colors"
                >
                  Esqueceu sua senha?
                </button>
              </div>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full h-12 gradient-primary text-primary-foreground font-semibold shadow-button hover:opacity-90 transition-opacity"
            >
            {isSubmitting ? (
                <ButtonLoader />
              ) : mode === "login" ? (
                "Entrar"
              ) : mode === "signup" ? (
                "Criar conta"
              ) : (
                "Enviar email de recuperação"
              )}
            </Button>
          </form>

          {/* Google Sign In */}
          {mode !== "forgot-password" && (
            <>
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">ou continue com</span>
                </div>
              </div>

              <Button
                type="button"
                variant="outline"
                onClick={handleGoogleSignIn}
                disabled={googleLoading}
                className="w-full h-12 gap-3 font-medium"
              >
                {googleLoading ? (
                  <ButtonLoader />
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                    Continuar com Google
                  </>
                )}
              </Button>

              <Button
                type="button"
                variant="outline"
                onClick={async () => {
                  setAppleLoading(true);
                  try {
                    const { error } = await lovable.auth.signInWithOAuth("apple", {
                      redirect_uri: window.location.origin,
                    });
                    if (error) toast.error("Erro ao fazer login com Apple. Tente novamente.");
                  } catch {
                    toast.error("Erro ao conectar com Apple.");
                  } finally {
                    setAppleLoading(false);
                  }
                }}
                disabled={appleLoading}
                className="w-full h-12 gap-3 font-medium"
              >
                {appleLoading ? (
                  <ButtonLoader />
                ) : (
                  <>
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    Continuar com Apple
                  </>
                )}
              </Button>
            </>
          )}

          {/* Toggle */}
          {mode !== "forgot-password" && (
            <div className="mt-6 text-center">
              <p className="text-muted-foreground text-sm">
                {mode === "login" ? "Não tem uma conta?" : "Já tem uma conta?"}
                <button
                  onClick={() => switchMode(mode === "login" ? "signup" : "login")}
                  className="ml-1 text-accent font-semibold hover:underline"
                >
                  {mode === "login" ? "Cadastre-se" : "Fazer login"}
                </button>
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default Auth;
