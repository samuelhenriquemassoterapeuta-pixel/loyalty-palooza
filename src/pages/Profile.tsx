import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  FileText, 
  LogOut, 
  ChevronRight,
  Settings,
  Smartphone,
  Camera,
  Loader2,
  Download,
  Crown
} from "lucide-react";
import { PageLoading } from "@/components/LoadingSpinner";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/hooks/useProfile";
import { useAdmin } from "@/hooks/useAdmin";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "sonner";
import { SecuritySheet } from "@/components/profile/SecuritySheet";
import { DevicesSheet } from "@/components/profile/DevicesSheet";
import { HelpSheet } from "@/components/profile/HelpSheet";

// Menu items are now defined inside the component to access isAdmin

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { profile, loading, updateProfile, uploadAvatar } = useProfile();
  const { isAdmin } = useAdmin();
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [securitySheetOpen, setSecuritySheetOpen] = useState(false);
  const [devicesSheetOpen, setDevicesSheetOpen] = useState(false);
  const [helpSheetOpen, setHelpSheetOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  // Menu items with conditional admin option
  const allMenuItems = [
    { icon: User, label: "Dados pessoais", description: "Nome, email, telefone", action: "dados" },
    { icon: Bell, label: "Notificações", description: "Gerencie seus alertas", action: "notificacoes" },
    { icon: Shield, label: "Segurança", description: "Senha e autenticação", action: "seguranca" },
    { icon: Smartphone, label: "Dispositivos", description: "Gerencie seus acessos", action: "dispositivos" },
    { icon: Download, label: "Instalar App", description: "Adicione à tela inicial", action: "instalar" },
    { icon: FileText, label: "Manual do App", description: "Como usar o Resinkra", action: "manual" },
    ...(isAdmin ? [{ icon: Crown, label: "Painel Admin", description: "Gerenciar app", action: "admin" }] : []),
    { icon: HelpCircle, label: "Ajuda", description: "FAQ e suporte", action: "ajuda" },
  ];

  const handleLogout = async () => {
    await signOut();
    toast.success("Até logo!");
  };

  const handleOpenEditDialog = () => {
    setNome(profile?.nome || "");
    setTelefone(profile?.telefone || "");
    setEditDialogOpen(true);
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    const { error } = await updateProfile({ nome, telefone });
    setSaving(false);
    
    if (error) {
      toast.error("Erro ao salvar perfil");
    } else {
      toast.success("Perfil atualizado!");
      setEditDialogOpen(false);
    }
  };

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      toast.error("Imagem muito grande. Máximo 2MB.");
      return;
    }

    setUploadingAvatar(true);
    const { error } = await uploadAvatar(file);
    setUploadingAvatar(false);

    if (error) {
      toast.error("Erro ao enviar foto");
    } else {
      toast.success("Foto atualizada!");
    }
  };

  const handleMenuClick = (action: string) => {
    switch (action) {
      case "dados":
        handleOpenEditDialog();
        break;
      case "notificacoes":
        navigate("/notificacoes");
        break;
      case "seguranca":
        setSecuritySheetOpen(true);
        break;
      case "dispositivos":
        setDevicesSheetOpen(true);
        break;
      case "instalar":
        navigate("/instalar");
        break;
      case "manual":
        navigate("/manual");
        break;
      case "admin":
        navigate("/admin");
        break;
      case "ajuda":
        setHelpSheetOpen(true);
        break;
      default:
        break;
    }
  };

  const getInitial = () => {
    if (profile?.nome) return profile.nome.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  const getDisplayName = () => {
    return profile?.nome || user?.email?.split("@")[0] || "Usuário";
  };

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-4 safe-top pt-4">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="relative">
            {profile?.avatar_url ? (
              <img 
                src={profile.avatar_url} 
                alt="Avatar" 
                className="w-16 h-16 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
                {getInitial()}
              </div>
            )}
            <label className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-primary text-primary-foreground cursor-pointer hover:opacity-90 transition-opacity">
              {uploadingAvatar ? (
                <Loader2 size={14} className="animate-spin" />
              ) : (
                <Camera size={14} />
              )}
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleAvatarChange}
                disabled={uploadingAvatar}
              />
            </label>
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">{getDisplayName()}</h1>
            <p className="text-sm text-muted-foreground">{user?.email}</p>
          </div>
          <button 
            className="p-2.5 rounded-xl bg-card shadow-card"
            onClick={handleOpenEditDialog}
          >
            <Settings size={20} className="text-foreground" />
          </button>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="relative overflow-hidden rounded-2xl p-5 text-primary-foreground mb-6"
        >
          <div className="absolute inset-0 gradient-primary" />
          <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent/20 blur-2xl" />
          <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-highlight/20 blur-xl" />
          
          <div className="relative z-10 grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">R$ 0</p>
              <p className="text-xs opacity-80">Total cashback</p>
            </div>
            <div className="border-x border-primary-foreground/20">
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs opacity-80">Compras</p>
            </div>
            <div>
              <p className="text-2xl font-bold">0</p>
              <p className="text-xs opacity-80">Agendamentos</p>
            </div>
          </div>
        </motion.div>

        {/* Menu Items */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="space-y-2"
        >
          {allMenuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              onClick={() => handleMenuClick(item.action)}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-card shadow-card hover:shadow-elevated hover:border-l-4 hover:border-l-primary transition-all group"
            >
              <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all">
                <item.icon size={20} className="text-primary" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-foreground group-hover:text-primary transition-colors">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight size={20} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
            </motion.button>
          ))}
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 mt-6 p-4 rounded-xl bg-destructive/10 text-destructive font-semibold hover:bg-destructive/20 transition-colors"
        >
          <LogOut size={20} />
          Sair da conta
        </motion.button>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Versão 1.0.0
        </p>
      </div>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-sm mx-4">
          <DialogHeader>
            <DialogTitle>Editar perfil</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                value={nome}
                onChange={(e) => setNome(e.target.value)}
                placeholder="Seu nome"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="telefone">Telefone</Label>
              <Input
                id="telefone"
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
                placeholder="(00) 00000-0000"
              />
            </div>
            <Button 
              className="w-full" 
              onClick={handleSaveProfile}
              disabled={saving}
            >
              {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Salvar"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Sheets */}
      <SecuritySheet open={securitySheetOpen} onOpenChange={setSecuritySheetOpen} />
      <DevicesSheet open={devicesSheetOpen} onOpenChange={setDevicesSheetOpen} />
      <HelpSheet open={helpSheetOpen} onOpenChange={setHelpSheetOpen} />

      <BottomNavigation />
    </div>
  );
};

export default Profile;
