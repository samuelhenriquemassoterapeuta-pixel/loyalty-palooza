import { useState } from "react";
import { Shield, Eye, EyeOff, Key, Loader2, Check } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface SecuritySheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const SecuritySheet = ({ open, onOpenChange }: SecuritySheetProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  const handleChangePassword = async () => {
    if (newPassword !== confirmPassword) {
      toast.error("As senhas não coincidem");
      return;
    }

    if (newPassword.length < 6) {
      toast.error("A senha deve ter pelo menos 6 caracteres");
      return;
    }

    setLoading(true);
    const { error } = await supabase.auth.updateUser({
      password: newPassword,
    });
    setLoading(false);

    if (error) {
      toast.error("Erro ao alterar senha");
    } else {
      toast.success("Senha alterada com sucesso!");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      onOpenChange(false);
    }
  };

  const handleToggleTwoFactor = (checked: boolean) => {
    setTwoFactorEnabled(checked);
    toast.info(checked ? "Autenticação de dois fatores ativada" : "Autenticação de dois fatores desativada");
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right" className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader className="mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-secondary">
              <Shield size={20} className="text-foreground" />
            </div>
            <SheetTitle className="text-xl">Segurança</SheetTitle>
          </div>
        </SheetHeader>

        <div className="space-y-6">
          {/* Alterar Senha */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-foreground font-semibold">
              <Key size={18} />
              <span>Alterar senha</span>
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Label htmlFor="current-password">Senha atual</Label>
                <div className="relative">
                  <Input
                    id="current-password"
                    type={showCurrentPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showCurrentPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="new-password">Nova senha</Label>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showNewPassword ? "text" : "password"}
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirm-password">Confirmar nova senha</Label>
                <div className="relative">
                  <Input
                    id="confirm-password"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              <Button
                onClick={handleChangePassword}
                disabled={loading || !newPassword || !confirmPassword}
                className="w-full mt-2"
              >
                {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : "Alterar senha"}
              </Button>
            </div>
          </div>

          {/* Autenticação de Dois Fatores */}
          <div className="pt-4 border-t border-border">
            <div className="flex items-center justify-between">
              <div className="space-y-1">
                <p className="font-semibold text-foreground">Autenticação de dois fatores</p>
                <p className="text-xs text-muted-foreground">
                  Adicione uma camada extra de segurança
                </p>
              </div>
              <Switch
                checked={twoFactorEnabled}
                onCheckedChange={handleToggleTwoFactor}
              />
            </div>
          </div>

          {/* Dicas de Segurança */}
          <div className="pt-4 border-t border-border">
            <p className="font-semibold text-foreground mb-3">Dicas de segurança</p>
            <div className="space-y-2">
              {[
                "Use uma senha única para esta conta",
                "Nunca compartilhe sua senha",
                "Mantenha seu email atualizado",
              ].map((tip, index) => (
                <div key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check size={14} className="text-highlight shrink-0" />
                  <span>{tip}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};
