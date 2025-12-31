import { motion } from "framer-motion";
import { 
  User, 
  Bell, 
  Shield, 
  HelpCircle, 
  FileText, 
  LogOut, 
  ChevronRight,
  Settings,
  Smartphone
} from "lucide-react";
import { BottomNavigation } from "@/components/BottomNavigation";

const menuItems = [
  { icon: User, label: "Dados pessoais", description: "Nome, email, telefone" },
  { icon: Bell, label: "Notificações", description: "Gerencie seus alertas" },
  { icon: Shield, label: "Segurança", description: "Senha e autenticação" },
  { icon: Smartphone, label: "Dispositivos", description: "Gerencie seus acessos" },
  { icon: HelpCircle, label: "Ajuda", description: "FAQ e suporte" },
  { icon: FileText, label: "Termos de uso", description: "Políticas e condições" },
];

const Profile = () => {
  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-4 safe-top pt-4">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-6"
        >
          <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center text-primary-foreground text-2xl font-bold">
            J
          </div>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">João Silva</h1>
            <p className="text-sm text-muted-foreground">joao.silva@email.com</p>
          </div>
          <button className="p-2.5 rounded-xl bg-card shadow-card">
            <Settings size={20} className="text-foreground" />
          </button>
        </motion.div>

        {/* Stats Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="gradient-primary rounded-2xl p-5 text-primary-foreground mb-6"
        >
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">R$ 1.250</p>
              <p className="text-xs opacity-80">Total cashback</p>
            </div>
            <div className="border-x border-primary-foreground/20">
              <p className="text-2xl font-bold">47</p>
              <p className="text-xs opacity-80">Compras</p>
            </div>
            <div>
              <p className="text-2xl font-bold">12</p>
              <p className="text-xs opacity-80">Meses ativos</p>
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
          {menuItems.map((item, index) => (
            <motion.button
              key={item.label}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 + index * 0.05 }}
              className="w-full flex items-center gap-4 p-4 rounded-xl bg-card shadow-card hover:shadow-elevated transition-all"
            >
              <div className="p-2.5 rounded-xl bg-secondary">
                <item.icon size={20} className="text-foreground" />
              </div>
              <div className="flex-1 text-left">
                <p className="font-semibold text-foreground">{item.label}</p>
                <p className="text-xs text-muted-foreground">{item.description}</p>
              </div>
              <ChevronRight size={20} className="text-muted-foreground" />
            </motion.button>
          ))}
        </motion.div>

        {/* Logout Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="w-full flex items-center justify-center gap-2 mt-6 p-4 rounded-xl bg-destructive/10 text-destructive font-semibold hover:bg-destructive/20 transition-colors"
        >
          <LogOut size={20} />
          Sair da conta
        </motion.button>

        <p className="text-center text-xs text-muted-foreground mt-6">
          Versão 1.0.0
        </p>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Profile;
