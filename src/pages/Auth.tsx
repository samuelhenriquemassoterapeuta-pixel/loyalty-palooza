import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";
import logoMarrom from "@/assets/logo-marrom.png";
import simboloVerde from "@/assets/simbolo-verde.png";
import { PageLoading, ButtonLoader } from "@/components/LoadingSpinner";

const emailSchema = z.string().email("Email inválido");
const passwordSchema = z.string().min(6, "Senha deve ter pelo menos 6 caracteres");
const nomeSchema = z.string().min(2, "Nome deve ter pelo menos 2 caracteres");

type AuthMode = "login" | "signup" | "forgot-password";

const Auth = () => {
  const [mode, setMode] = useState<AuthMode>("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nome, setNome] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string; nome?: string }>({});

  const { signIn, signUp, user, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && user) {
      navigate("/");
    }
  }, [user, loading, navigate]);

  const validateForm = () => {
    const newErrors: { email?: string; password?: string; nome?: string } = {};
    
    const emailResult = emailSchema.safeParse(email);
    if (!emailResult.success) {
      newErrors.email = emailResult.error.errors[0].message;
    }

    if (mode !== "forgot-password") {
      const passwordResult = passwordSchema.safeParse(password);
      if (!passwordResult.success) {
        newErrors.password = passwordResult.error.errors[0].message;
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
        const { error } = await signIn(email, password);
        if (error) {
          if (error.message.includes("Invalid login credentials")) {
            toast.error("Email ou senha incorretos");
          } else {
            toast.error("Erro ao fazer login. Tente novamente.");
          }
        } else {
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

  const switchMode = (newMode: AuthMode) => {
    setMode(newMode);
    setErrors({});
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
