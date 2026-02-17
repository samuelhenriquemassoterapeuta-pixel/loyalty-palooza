import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useTheme } from "next-themes";
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
  Crown,
  Scissors,
  Link2,
  Sun,
  Moon,
  UserCog,
  SlidersHorizontal,
  LifeBuoy,
  RefreshCw
} from "lucide-react";
import { PageLoading } from "@/components/LoadingSpinner";
import { AppLayout } from "@/components/AppLayout";
import { AnimatedPageBackground } from "@/components/AnimatedPageBackground";
import { useAuth } from "@/contexts/AuthContext";
import { useProfile } from "@/features/profile/hooks/useProfile";
import { useAdmin } from "@/features/admin/hooks/useAdmin";
import { useTransacoes } from "@/features/cashback/hooks/useTransacoes";
import { usePedidos } from "@/features/loja/hooks/usePedidos";
import { useAgendamentos } from "@/features/agendamentos/hooks/useAgendamentos";
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
import { SecuritySheet } from "@/features/profile/components/SecuritySheet";
import { DevicesSheet } from "@/features/profile/components/DevicesSheet";
import { HelpSheet } from "@/features/profile/components/HelpSheet";
import { HistoricoCirurgicoSheet } from "@/features/profile/components/HistoricoCirurgicoSheet";
import { AppCollapsibleSection } from "@/components/AppCollapsibleSection";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

const Profile = () => {
  const navigate = useNavigate();
  const { user, signOut } = useAuth();
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  const { profile, loading, updateProfile, uploadAvatar } = useProfile();
  const { isAdmin } = useAdmin();
  const { stats: transacoesStats } = useTransacoes();
  const { pedidos } = usePedidos();
  const { agendamentos } = useAgendamentos();
  
  const totalCompras = pedidos.filter(p => p.status !== "cancelado").length;
  const totalAgendamentos = agendamentos.filter(a => a.status !== "cancelado").length;
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [securitySheetOpen, setSecuritySheetOpen] = useState(false);
  const [devicesSheetOpen, setDevicesSheetOpen] = useState(false);
  const [helpSheetOpen, setHelpSheetOpen] = useState(false);
  const [cirurgicoSheetOpen, setCirurgicoSheetOpen] = useState(false);
  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);

  const menuGroups = [
    {
      title: "Conta & Dados",
      icon: UserCog,
      items: [
        { icon: User, label: "Dados pessoais", description: "Nome, email, telefone", action: "dados" },
        { icon: Scissors, label: "Histórico cirúrgico", description: "Cirurgias e pós-operatório", action: "cirurgico" },
        { icon: Link2, label: "Contas vinculadas", description: "Google, Apple e mais", action: "conta" },
      ],
    },
    {
      title: "Preferências",
      icon: SlidersHorizontal,
      items: [
        { icon: Bell, label: "Notificações", description: "Gerencie seus alertas", action: "notificacoes" },
        { icon: Shield, label: "Segurança", description: "Senha e autenticação", action: "seguranca" },
        { icon: Smartphone, label: "Dispositivos", description: "Gerencie seus acessos", action: "dispositivos" },
      ],
    },
    {
      title: "Suporte & Mais",
      icon: LifeBuoy,
      items: [
        { icon: Download, label: "Instalar App", description: "Adicione à tela inicial", action: "instalar" },
        { icon: FileText, label: "Manual do App", description: "Como usar o Resinkra", action: "manual" },
        ...(isAdmin ? [{ icon: Crown, label: "Painel Admin", description: "Gerenciar app", action: "admin" }] : []),
        { icon: HelpCircle, label: "Ajuda", description: "FAQ e suporte", action: "ajuda" },
      ],
    },
  ];

  const handleLogout = async () => {
    await signOut();
    toast.success("Até logo!");
  };

  const handleSwitchAccount = async () => {
    await signOut();
    navigate("/auth");
    toast.info("Faça login com outra conta");
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

    setUploadingAvatar(true);
    const { error } = await uploadAvatar(file);
    setUploadingAvatar(false);

    if (error) {
      toast.error(error.message || "Erro ao enviar foto");
    } else {
      toast.success("Foto atualizada!");
    }
  };

  const handleMenuClick = (action: string) => {
    switch (action) {
      case "dados":
        handleOpenEditDialog();
        break;
      case "cirurgico":
        setCirurgicoSheetOpen(true);
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
      case "conta":
        navigate("/conta");
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
    <AppLayout>
      <div className="min-h-screen bg-background gradient-hero pb-24 lg:pb-8 relative">
        <AnimatedPageBackground />
        <div className="max-w-lg lg:max-w-4xl mx-auto px-4 lg:px-8 safe-top pt-4 relative z-10">
          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-5"
          >
            {/* Profile Header */}
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-4"
            >
              <div className="relative">
                {profile?.avatar_url ? (
                  <img 
                    src={profile.avatar_url} 
                    alt="Avatar" 
                    className="w-16 h-16 rounded-full object-cover ring-2 ring-primary/20"
                  />
                ) : (
                  <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold ring-2 ring-primary/20">
                    {getInitial()}
                  </div>
                )}
                <label className="absolute -bottom-1 -right-1 p-1.5 rounded-full bg-primary text-primary-foreground cursor-pointer hover:opacity-90 transition-opacity shadow-button">
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
                className="p-2.5 rounded-xl glass-card-strong shadow-card"
                onClick={handleOpenEditDialog}
              >
                <Settings size={20} className="text-foreground" />
              </button>
            </motion.div>

            {/* Stats Card */}
            <motion.div
              variants={fadeUp}
              className="relative overflow-hidden rounded-3xl p-5 text-primary-foreground shimmer-badge"
            >
              <div className="absolute inset-0 gradient-primary" />
              <div className="absolute -top-10 -right-10 w-32 h-32 rounded-full bg-accent/20 blur-2xl" />
              <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full bg-highlight/20 blur-xl" />
              
              <div className="relative z-10 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold font-serif">
                    R$ {transacoesStats.totalCashback.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ".")}
                  </p>
                  <p className="text-xs opacity-80">Total cashback</p>
                </div>
                <div className="border-x border-primary-foreground/20">
                  <p className="text-2xl font-bold font-serif">{totalCompras}</p>
                  <p className="text-xs opacity-80">Compras</p>
                </div>
                <div>
                  <p className="text-2xl font-bold font-serif">{totalAgendamentos}</p>
                  <p className="text-xs opacity-80">Agendamentos</p>
                </div>
              </div>
            </motion.div>

            {/* Theme Toggle */}
            <motion.div variants={fadeUp}>
              <motion.button
                whileTap={{ scale: 0.98 }}
                onClick={() => setTheme(isDark ? "light" : "dark")}
                className="w-full flex items-center gap-4 p-4 rounded-2xl glass-card-strong hover:shadow-elevated transition-all group"
              >
                <div className="p-2.5 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all">
                  {isDark ? <Sun size={20} className="text-primary" /> : <Moon size={20} className="text-primary" />}
                </div>
                <div className="flex-1 text-left">
                  <p className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {isDark ? "Modo claro" : "Modo escuro"}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {isDark ? "Trocar para tema claro" : "Trocar para tema escuro"}
                  </p>
                </div>
                <div className={`w-11 h-6 rounded-full relative transition-colors ${isDark ? "bg-primary" : "bg-muted"}`}>
                  <div className={`absolute top-0.5 w-5 h-5 rounded-full bg-card shadow-sm transition-transform ${isDark ? "left-[22px]" : "left-0.5"}`} />
                </div>
              </motion.button>
            </motion.div>

            {/* Menu Groups - Collapsible */}
            {menuGroups.map((group) => (
              <motion.div key={group.title} variants={fadeUp}>
                <AppCollapsibleSection
                  title={group.title}
                  icon={group.icon}
                  badge={`${group.items.length}`}
                >
                  <div className="space-y-2">
                    {group.items.map((item) => (
                      <motion.button
                        key={item.label}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleMenuClick(item.action)}
                        className="w-full flex items-center gap-4 p-3.5 rounded-xl hover:bg-muted/50 transition-all group"
                      >
                        <div className="p-2 rounded-lg bg-gradient-to-br from-primary/10 to-accent/10 group-hover:from-primary/20 group-hover:to-accent/20 transition-all">
                          <item.icon size={18} className="text-primary" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-sm text-foreground group-hover:text-primary transition-colors">{item.label}</p>
                          <p className="text-xs text-muted-foreground">{item.description}</p>
                        </div>
                        <ChevronRight size={18} className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                      </motion.button>
                    ))}
                  </div>
                </AppCollapsibleSection>
              </motion.div>
            ))}

            {/* Switch Account Button */}
            <motion.button
              variants={fadeUp}
              whileTap={{ scale: 0.98 }}
              onClick={handleSwitchAccount}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-primary/10 text-primary font-semibold hover:bg-primary/20 transition-colors"
            >
              <RefreshCw size={20} />
              Mudar de conta
            </motion.button>

            {/* Logout Button */}
            <motion.button
              variants={fadeUp}
              whileTap={{ scale: 0.98 }}
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 p-4 rounded-2xl bg-destructive/10 text-destructive font-semibold hover:bg-destructive/20 transition-colors"
            >
              <LogOut size={20} />
              Sair da conta
            </motion.button>

            <p className="text-center text-xs text-muted-foreground pb-4">
              Versão 1.0.0
            </p>
          </motion.div>
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
        <HistoricoCirurgicoSheet open={cirurgicoSheetOpen} onOpenChange={setCirurgicoSheetOpen} />
      </div>
    </AppLayout>
  );
};

export default Profile;
