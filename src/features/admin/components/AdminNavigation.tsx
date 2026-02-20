import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, ChevronRight,
  BarChart3, CalendarDays, Package, Scissors, Gift, Users, FileText, Shield,
  Dumbbell, Sparkles, ClipboardList, StretchHorizontal, Salad, BookOpen,
  Stethoscope, Globe, Ticket, Crown, Building2, CreditCard, Handshake,
  Camera, Trophy, DollarSign, Target, Megaphone, Send, Rocket, GraduationCap,
  Bell, UserCog, Settings2, Code2, FilePlus2, Search, Headphones
} from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";

export interface NavGroup {
  id: string;
  label: string;
  icon: any;
  items: NavItem[];
}

export interface NavItem {
  id: string;
  label: string;
  icon: any;
}

export const adminNavGroups: NavGroup[] = [
  {
    id: "visao-geral",
    label: "Visão Geral",
    icon: BarChart3,
    items: [
      { id: "dashboard", label: "Dashboard", icon: BarChart3 },
      { id: "analytics", label: "Analytics & KPIs", icon: BarChart3 },
      { id: "financeiro", label: "Financeiro", icon: DollarSign },
      { id: "auditoria", label: "Auditoria", icon: FileText },
    ],
  },
  {
    id: "operacoes",
    label: "Operações",
    icon: CalendarDays,
    items: [
      { id: "agendamentos", label: "Agendamentos", icon: CalendarDays },
      { id: "pedidos", label: "Pedidos", icon: Package },
      { id: "terapeutas", label: "Terapeutas", icon: Users },
      { id: "usuarios", label: "Usuários", icon: UserCog },
    ],
  },
  {
    id: "catalogo",
    label: "Catálogo",
    icon: Package,
    items: [
      { id: "produtos", label: "Produtos", icon: Package },
      { id: "servicos", label: "Serviços", icon: Scissors },
      { id: "servicos-detalhes", label: "Detalhes Serviços", icon: Sparkles },
      { id: "pacotes", label: "Pacotes", icon: Gift },
    ],
  },
  {
    id: "saude",
    label: "Saúde & Protocolos",
    icon: Stethoscope,
    items: [
      { id: "protocolos", label: "Protocolos", icon: ClipboardList },
      { id: "exercicios", label: "Exercícios", icon: Dumbbell },
      { id: "planos-alongamento", label: "Planos Along.", icon: StretchHorizontal },
      { id: "planos-dieta", label: "Planos Dieta", icon: Salad },
      { id: "dietas-conteudo", label: "Conteúdo Dietas", icon: BookOpen },
      { id: "secoes-clinicas", label: "Seções Clínicas", icon: Stethoscope },
      { id: "anamnese", label: "Anamnese", icon: FilePlus2 },
      { id: "headspa", label: "Head SPA", icon: Sparkles },
    ],
  },
  {
    id: "assinaturas",
    label: "Assinaturas & Fidelidade",
    icon: Crown,
    items: [
      { id: "planos-vip", label: "Planos VIP", icon: Crown },
      { id: "assinaturas", label: "Assinaturas", icon: CreditCard },
      { id: "indicacoes", label: "Indicações", icon: Users },
      { id: "desafios-admin", label: "Desafios", icon: Trophy },
      { id: "vales", label: "Vales Presente", icon: Gift },
      { id: "cupom", label: "Cupom", icon: Ticket },
    ],
  },
  {
    id: "corporativo",
    label: "Corporativo",
    icon: Building2,
    items: [
      { id: "empresas", label: "Empresas", icon: Building2 },
      { id: "corp-conteudo", label: "Pág. Corporativa", icon: Globe },
      { id: "parceiros", label: "Parceiros", icon: Handshake },
    ],
  },
  {
    id: "marketing",
    label: "Marketing",
    icon: Megaphone,
    items: [
      { id: "landing", label: "Landing Page", icon: Globe },
      { id: "segmentacao", label: "Segmentação", icon: Target },
      { id: "campanhas", label: "Campanhas", icon: Send },
      { id: "banners", label: "Banners", icon: Megaphone },
      { id: "google-ads", label: "Google Ads", icon: BarChart3 },
      { id: "notificacoes-admin", label: "Notificações", icon: Bell },
    ],
  },
  {
    id: "conteudo",
    label: "Conteúdo & Social",
    icon: Camera,
    items: [
      { id: "social-posts", label: "Moments", icon: Camera },
      { id: "social-config", label: "Config Moments", icon: Settings2 },
      { id: "cursos-admin", label: "Cursos", icon: GraduationCap },
      { id: "materiais-admin", label: "Materiais", icon: FileText },
    ],
  },
  {
    id: "atendimento",
    label: "Atendimento",
    icon: Headphones,
    items: [
      { id: "resi-handoff", label: "Handoff Resi → Humano", icon: Headphones },
    ],
  },
  {
    id: "plataforma",
    label: "Plataforma",
    icon: Rocket,
    items: [
      { id: "relatorio-tecnico", label: "Relatório Técnico", icon: FileText },
      { id: "apresentacao", label: "Apresentação", icon: Rocket },
      { id: "codigo", label: "Código", icon: Code2 },
      { id: "venda-plataforma", label: "Venda B2B", icon: DollarSign },
    ],
  },
];

interface AdminNavigationProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export const AdminNavigation = ({ activeTab, onTabChange }: AdminNavigationProps) => {
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(() => {
    // Only expand the group containing the active tab
    const activeGroup = adminNavGroups.find(g => g.items.some(i => i.id === activeTab));
    return new Set(activeGroup ? [activeGroup.id] : []);
  });
  const [search, setSearch] = useState("");

  const toggleGroup = (groupId: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(groupId)) next.delete(groupId);
      else next.add(groupId);
      return next;
    });
  };

  const filteredGroups = search.trim()
    ? adminNavGroups
        .map(g => ({
          ...g,
          items: g.items.filter(i => i.label.toLowerCase().includes(search.toLowerCase())),
        }))
        .filter(g => g.items.length > 0)
    : adminNavGroups;

  return (
    <div className="w-full">
      {/* Search */}
      <div className="relative mb-3">
        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Buscar seção..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9 h-9 text-sm bg-card"
        />
      </div>

      <ScrollArea className="max-h-[75vh] lg:max-h-[80vh]">
        <div className="space-y-1">
          {filteredGroups.map((group) => {
            const isExpanded = expandedGroups.has(group.id) || search.trim().length > 0;
            const hasActiveItem = group.items.some(i => i.id === activeTab);

            return (
              <div key={group.id}>
                <button
                  onClick={() => toggleGroup(group.id)}
                  className={`w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    hasActiveItem
                      ? "bg-primary/10 text-primary"
                      : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                  }`}
                >
                  <group.icon size={16} />
                  <span className="flex-1 text-left">{group.label}</span>
                  <span className="text-[10px] text-muted-foreground/60">{group.items.length}</span>
                  <motion.div
                    animate={{ rotate: isExpanded ? 0 : -90 }}
                    transition={{ duration: 0.15 }}
                  >
                    <ChevronDown size={14} />
                  </motion.div>
                </button>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="ml-4 pl-2 border-l border-border/50 space-y-0.5 py-1">
                        {group.items.map((item) => (
                          <button
                            key={item.id}
                            onClick={() => onTabChange(item.id)}
                            className={`w-full flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                              activeTab === item.id
                                ? "bg-primary text-primary-foreground shadow-sm"
                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                            }`}
                          >
                            <item.icon size={13} />
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </ScrollArea>
    </div>
  );
};
