import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Eye, EyeOff, RefreshCw, UserPlus } from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Schema de validação                                                  */
/* ------------------------------------------------------------------ */
const schema = z
  .object({
    nome: z.string().trim().min(2, "Nome deve ter pelo menos 2 caracteres"),
    email: z.string().trim().email("E-mail inválido"),
    telefone: z.string().trim().optional(),
    senha: z.string().min(8, "Senha deve ter no mínimo 8 caracteres"),
    confirmar_senha: z.string(),
    role: z.enum(["user", "terapeuta", "parceiro", "admin"]),
    enviar_email: z.boolean().default(false),
  })
  .refine((d) => d.senha === d.confirmar_senha, {
    path: ["confirmar_senha"],
    message: "As senhas não coincidem",
  });

type FormData = z.infer<typeof schema>;

const ROLE_LABELS: Record<string, string> = {
  user: "Usuário (padrão)",
  terapeuta: "Terapeuta",
  parceiro: "Parceiro",
  admin: "Administrador",
};

/* ------------------------------------------------------------------ */
/*  Gerador de senha aleatória                                          */
/* ------------------------------------------------------------------ */
function generatePassword(length = 12): string {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%";
  return Array.from(
    { length },
    () => chars[Math.floor(Math.random() * chars.length)]
  ).join("");
}

/* ------------------------------------------------------------------ */
/*  Props                                                               */
/* ------------------------------------------------------------------ */
interface AdminCreateUserProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

/* ------------------------------------------------------------------ */
/*  Componente                                                           */
/* ------------------------------------------------------------------ */
export const AdminCreateUser = ({
  open,
  onOpenChange,
  onSuccess,
}: AdminCreateUserProps) => {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      role: "user",
      enviar_email: false,
    },
  });

  const enviarEmail = watch("enviar_email");
  const roleValue = watch("role");

  const handleGeneratePassword = () => {
    const pwd = generatePassword();
    setValue("senha", pwd, { shouldValidate: true });
    setValue("confirmar_senha", pwd, { shouldValidate: true });
    setShowPassword(true);
  };

  const onSubmit = async (data: FormData) => {
    setLoading(true);
    try {
      const { data: result, error } = await supabase.functions.invoke(
        "admin-create-user",
        {
          body: {
            nome: data.nome,
            email: data.email,
            telefone: data.telefone || null,
            senha: data.senha,
            role: data.role,
            enviar_email: data.enviar_email,
          },
        }
      );

      if (error) throw error;
      if (result?.error) throw new Error(result.error);

      toast.success(
        result?.message || "Usuário criado com sucesso!",
        { duration: 4000 }
      );
      reset();
      onOpenChange(false);
      onSuccess?.();
    } catch (err: unknown) {
      const msg =
        err instanceof Error ? err.message : "Erro ao criar usuário";
      toast.error(msg);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      reset();
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserPlus className="w-5 h-5 text-primary" />
            Criar Novo Usuário
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 pt-2">
          {/* Nome */}
          <div className="space-y-1">
            <Label htmlFor="nome">
              Nome completo <span className="text-destructive">*</span>
            </Label>
            <Input
              id="nome"
              placeholder="Ex: João da Silva"
              {...register("nome")}
              disabled={loading}
            />
            {errors.nome && (
              <p className="text-xs text-destructive">{errors.nome.message}</p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-1">
            <Label htmlFor="email">
              E-mail <span className="text-destructive">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="joao@email.com"
              {...register("email")}
              disabled={loading}
            />
            {errors.email && (
              <p className="text-xs text-destructive">{errors.email.message}</p>
            )}
          </div>

          {/* Telefone */}
          <div className="space-y-1">
            <Label htmlFor="telefone">Telefone</Label>
            <Input
              id="telefone"
              type="tel"
              placeholder="(11) 99999-9999"
              {...register("telefone")}
              disabled={loading}
            />
          </div>

          {/* Senha */}
          <div className="space-y-1">
            <div className="flex items-center justify-between">
              <Label htmlFor="senha">
                Senha <span className="text-destructive">*</span>
              </Label>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="h-6 text-xs gap-1 text-muted-foreground"
                onClick={handleGeneratePassword}
                disabled={loading}
              >
                <RefreshCw className="w-3 h-3" />
                Gerar senha
              </Button>
            </div>
            <div className="relative">
              <Input
                id="senha"
                type={showPassword ? "text" : "password"}
                placeholder="Mínimo 8 caracteres"
                {...register("senha")}
                disabled={loading}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                onClick={() => setShowPassword((v) => !v)}
                tabIndex={-1}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
            {errors.senha && (
              <p className="text-xs text-destructive">{errors.senha.message}</p>
            )}
          </div>

          {/* Confirmar senha */}
          <div className="space-y-1">
            <Label htmlFor="confirmar_senha">
              Confirmar senha <span className="text-destructive">*</span>
            </Label>
            <div className="relative">
              <Input
                id="confirmar_senha"
                type={showConfirm ? "text" : "password"}
                placeholder="Repita a senha"
                {...register("confirmar_senha")}
                disabled={loading}
                className="pr-10"
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 text-muted-foreground"
                onClick={() => setShowConfirm((v) => !v)}
                tabIndex={-1}
              >
                {showConfirm ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
            {errors.confirmar_senha && (
              <p className="text-xs text-destructive">
                {errors.confirmar_senha.message}
              </p>
            )}
          </div>

          {/* Role */}
          <div className="space-y-1">
            <Label>
              Role <span className="text-destructive">*</span>
            </Label>
            <Select
              value={roleValue}
              onValueChange={(v) =>
                setValue("role", v as FormData["role"], { shouldValidate: true })
              }
              disabled={loading}
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(ROLE_LABELS).map(([value, label]) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {roleValue === "admin" && (
              <p className="text-xs text-warning-foreground bg-warning/10 border border-warning/30 rounded px-2 py-1">
                ⚠️ Atenção: este usuário terá acesso total ao painel administrativo.
              </p>
            )}
            {errors.role && (
              <p className="text-xs text-destructive">{errors.role.message}</p>
            )}
          </div>

          {/* Enviar email */}
          <div className="flex items-center gap-3 p-3 rounded-lg bg-muted/50 border">
            <Switch
              id="enviar_email"
              checked={enviarEmail}
              onCheckedChange={(v) => setValue("enviar_email", v)}
              disabled={loading}
            />
            <Label htmlFor="enviar_email" className="cursor-pointer text-sm">
              Enviar notificação de boas-vindas
            </Label>
          </div>

          {/* Ações */}
          <div className="flex gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              className="flex-1"
              onClick={handleClose}
              disabled={loading}
            >
              Cancelar
            </Button>
            <Button type="submit" className="flex-1 gap-2" disabled={loading}>
              {loading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Criando...
                </>
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  Criar Usuário
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
