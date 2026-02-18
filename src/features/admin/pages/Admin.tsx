import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, Shield, BarChart3, Ticket, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageLoading } from "@/components/LoadingSpinner";
import { useAdmin } from "@/features/admin/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

import { AdminNavigation, adminNavGroups } from "@/features/admin/components/AdminNavigation";
import { StatsCards } from "@/features/admin/components/StatsCards";
import { DashboardTab } from "@/features/admin/components/DashboardTab";
import { PedidosTab } from "@/features/admin/components/PedidosTab";
import { CrudListTab } from "@/features/admin/components/CrudListTab";
import { AdminFormDialog } from "@/features/admin/components/AdminFormDialog";
import { TerapeutasTab } from "@/features/admin/components/TerapeutasTab";
import { AuditLogsViewer } from "@/features/admin/components/AuditLogsViewer";
import { IndicacoesTab } from "@/features/admin/components/IndicacoesTab";
import { ThemeToggle } from "@/features/admin/components/ThemeToggle";
import { ExerciciosTab } from "@/features/admin/components/ExerciciosTab";
import { HeadSpaImagensTab } from "@/features/admin/components/HeadSpaImagensTab";
import { ProtocolosTab } from "@/features/admin/components/ProtocolosTab";
import { PlanosAlongamentoTab } from "@/features/admin/components/PlanosAlongamentoTab";
import { PlanosDietaTab } from "@/features/admin/components/PlanosDietaTab";
import { SecoesClinicasTab } from "@/features/admin/components/SecoesClinicasTab";
import { DietasConteudoTab } from "@/features/admin/components/DietasConteudoTab";
import { LandingPageTab } from "@/features/admin/components/LandingPageTab";
import ValesPresenteTab from "@/features/admin/components/ValesPresenteTab";
import PlanosVipTab from "@/features/admin/components/PlanosVipTab";
import EmpresasTab from "@/features/admin/components/EmpresasTab";
import AssinaturasTab from "@/features/admin/components/AssinaturasTab";
import ParceirosTab from "@/features/admin/components/ParceirosTab";
import SocialPostsTab from "@/features/admin/components/SocialPostsTab";
import FinanceiroTab from "@/features/admin/components/FinanceiroTab";
import DesafiosTab from "@/features/admin/components/DesafiosTab";
import { AgendamentosTab } from "@/features/admin/components/AgendamentosTab";
import { ServicosDetalhesTab } from "@/features/admin/components/ServicosDetalhesTab";
import SegmentacaoClientesTab from "@/features/admin/components/SegmentacaoClientesTab";
import CampanhasMarketingTab from "@/features/admin/components/CampanhasMarketingTab";
import BannersPromocionaisTab from "@/features/admin/components/BannersPromocionaisTab";
import CorporativoConteudoTab from "@/features/admin/components/CorporativoConteudoTab";
import RelatorioTecnicoTab from "@/features/admin/components/RelatorioTecnicoTab";
import ApresentacaoPlataformaTab from "@/features/admin/components/ApresentacaoPlataformaTab";
import { CursosAdminTab } from "@/features/admin/components/CursosAdminTab";
import { SocialPostsConfigTab } from "@/features/admin/components/SocialPostsConfigTab";
import { NotificacoesAdminTab } from "@/features/admin/components/NotificacoesAdminTab";
import { UsuariosAdminTab } from "@/features/admin/components/UsuariosAdminTab";
import { CodigoPlataformaTab } from "@/features/admin/components/CodigoPlataformaTab";
import VendaPlataformaTab from "@/features/admin/components/VendaPlataformaTab";
import AnalyticsDashboardTab from "@/features/admin/components/AnalyticsDashboardTab";
import AnamneseAdminTab from "@/features/admin/components/AnamneseAdminTab";
import { MateriaisAdminTab } from "@/features/admin/components/MateriaisAdminTab";

const tabContentVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
};

// Get active tab label for header breadcrumb
const getActiveLabel = (tab: string): string => {
  for (const group of adminNavGroups) {
    const item = group.items.find(i => i.id === tab);
    if (item) return item.label;
  }
  return "Dashboard";
};

const getActiveGroup = (tab: string): string => {
  for (const group of adminNavGroups) {
    if (group.items.some(i => i.id === tab)) return group.label;
  }
  return "";
};

const Admin = () => {
  const navigate = useNavigate();
  const { isAdmin, loading: loadingAdmin } = useAdmin();
  const queryClient = useQueryClient();

  const [activeTab, setActiveTab] = useState("dashboard");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any>(null);
  const [formData, setFormData] = useState<any>({});
  const [saving, setSaving] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  // Fetch data
  const { data: produtos = [], isLoading: loadingProdutos } = useQuery({
    queryKey: ["admin-produtos"],
    queryFn: async () => {
      const { data, error } = await supabase.from("produtos").select("*").order("nome");
      if (error) throw error;
      return data;
    },
  });

  const { data: servicos = [], isLoading: loadingServicos } = useQuery({
    queryKey: ["admin-servicos"],
    queryFn: async () => {
      const { data, error } = await supabase.from("servicos").select("*").order("nome");
      if (error) throw error;
      return data;
    },
  });

  const { data: pacotes = [], isLoading: loadingPacotes } = useQuery({
    queryKey: ["admin-pacotes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("pacotes").select("*").order("nome");
      if (error) throw error;
      return data;
    },
  });

  const { data: usuarios = [] } = useQuery({
    queryKey: ["admin-usuarios"],
    queryFn: async () => {
      const { data, error } = await supabase.from("profiles").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: pedidos = [], isLoading: loadingPedidos } = useQuery({
    queryKey: ["admin-pedidos"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("pedidos")
        .select(`*, profiles!pedidos_user_id_profiles_fkey (nome), pedido_itens (id, quantidade, preco_unitario, produtos (nome))`)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const { data: transacoes = [] } = useQuery({
    queryKey: ["admin-transacoes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("transacoes").select("*").order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const stats = {
    totalVendas: pedidos.reduce((acc: number, p: any) => acc + (p.total || 0), 0),
    totalPedidos: pedidos.length,
    pedidosPendentes: pedidos.filter((p: any) => p.status === "pendente").length,
    pedidosConfirmados: pedidos.filter((p: any) => p.status === "confirmado").length,
    pedidosEntregues: pedidos.filter((p: any) => p.status === "entregue").length,
    pedidosCancelados: pedidos.filter((p: any) => p.status === "cancelado").length,
    totalCashbackDistribuido: transacoes
      .filter((t: any) => t.tipo === "cashback")
      .reduce((acc: number, t: any) => acc + Number(t.valor), 0),
    totalCashbackUsado: Math.abs(
      transacoes
        .filter((t: any) => t.tipo === "uso_cashback")
        .reduce((acc: number, t: any) => acc + Number(t.valor), 0)
    ),
    usuariosAtivos: usuarios.length,
    vendasHoje: pedidos
      .filter((p: any) => new Date(p.created_at).toDateString() === new Date().toDateString())
      .reduce((acc: number, p: any) => acc + (p.total || 0), 0),
    pedidosHoje: pedidos.filter(
      (p: any) => new Date(p.created_at).toDateString() === new Date().toDateString()
    ).length,
    totalProdutos: produtos.length,
    totalServicos: servicos.length,
    totalPacotes: pacotes.length,
  };

  const getDefaultFormData = () => {
    switch (activeTab) {
      case "produtos":
        return { nome: "", descricao: "", preco: "", categoria: "", imagem_url: "", disponivel: true, cashback_percentual: "" };
      case "servicos":
        return { nome: "", descricao: "", preco: "", duracao: "", categoria: "", disponivel: true, cashback_percentual: "" };
      case "pacotes":
        return { nome: "", descricao: "", preco: "", preco_original: "", total_sessoes: "", validade_dias: "365", disponivel: true };
      default:
        return {};
    }
  };

  const getTableName = (): "produtos" | "servicos" | "pacotes" => {
    if (activeTab === "servicos") return "servicos";
    if (activeTab === "pacotes") return "pacotes";
    return "produtos";
  };

  const openCreateDialog = () => {
    setEditingItem(null);
    setFormData(getDefaultFormData());
    setDialogOpen(true);
  };

  const openEditDialog = (item: any) => {
    setEditingItem(item);
    setFormData({ ...item });
    setDialogOpen(true);
  };

  const handleSave = async () => {
    setSaving(true);
    const table = getTableName();
    try {
      const dataToSave = { ...formData };
      if (dataToSave.preco) dataToSave.preco = parseFloat(dataToSave.preco);
      if (dataToSave.preco_original) dataToSave.preco_original = parseFloat(dataToSave.preco_original) || null;
      if (dataToSave.duracao) dataToSave.duracao = parseInt(dataToSave.duracao);
      if (dataToSave.total_sessoes) dataToSave.total_sessoes = parseInt(dataToSave.total_sessoes);
      if (dataToSave.validade_dias) dataToSave.validade_dias = parseInt(dataToSave.validade_dias);
      if (dataToSave.cashback_percentual !== undefined) {
        dataToSave.cashback_percentual = dataToSave.cashback_percentual ? parseFloat(dataToSave.cashback_percentual) : 0;
      }

      if (editingItem) {
        const { error } = await supabase.from(table).update(dataToSave).eq("id", editingItem.id);
        if (error) throw error;
        toast.success("Atualizado com sucesso!");
      } else {
        delete dataToSave.id;
        const { error } = await supabase.from(table).insert(dataToSave);
        if (error) throw error;
        toast.success("Criado com sucesso!");
      }

      queryClient.invalidateQueries({ queryKey: [`admin-${activeTab}`] });
      setDialogOpen(false);
    } catch (error: any) {
      toast.error(error.message || "Erro ao salvar");
    }
    setSaving(false);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Tem certeza que deseja excluir?")) return;
    const table = getTableName();
    try {
      const { error } = await supabase.from(table).delete().eq("id", id);
      if (error) throw error;
      toast.success("Excluído com sucesso!");
      queryClient.invalidateQueries({ queryKey: [`admin-${activeTab}`] });
    } catch (error: any) {
      toast.error(error.message || "Erro ao excluir");
    }
  };

  const toggleDisponivel = async (id: string, disponivel: boolean) => {
    const table = getTableName();
    try {
      const { error } = await supabase.from(table).update({ disponivel: !disponivel }).eq("id", id);
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: [`admin-${activeTab}`] });
    } catch (error: any) {
      toast.error("Erro ao atualizar");
    }
  };

  const updatePedidoStatus = async (pedidoId: string, newStatus: string) => {
    try {
      const { error } = await supabase.from("pedidos").update({ status: newStatus }).eq("id", pedidoId);
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ["admin-pedidos"] });
      toast.success(`Status atualizado para ${newStatus}`);
    } catch {
      toast.error("Erro ao atualizar status");
    }
  };

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setNavOpen(false);
  };

  if (loadingAdmin) {
    return <PageLoading text="Verificando permissões..." />;
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center"
        >
          <div className="w-16 h-16 rounded-2xl gradient-primary flex items-center justify-center mx-auto mb-4 shadow-button">
            <Shield className="w-8 h-8 text-primary-foreground" />
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">Acesso negado</h1>
          <p className="text-muted-foreground mb-4">Você não tem permissão para acessar esta página.</p>
          <Button onClick={() => navigate("/")}>Voltar ao início</Button>
        </motion.div>
      </div>
    );
  }

  const showNewButton = activeTab === "produtos" || activeTab === "servicos" || activeTab === "pacotes";

  const renderContent = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardTab stats={stats} pedidos={pedidos} transacoes={transacoes} />;
      case "analytics":
        return <AnalyticsDashboardTab />;
      case "financeiro":
        return <FinanceiroTab />;
      case "auditoria":
        return <AuditLogsViewer />;
      case "agendamentos":
        return <AgendamentosTab />;
      case "pedidos":
        return <PedidosTab pedidos={pedidos} isLoading={loadingPedidos} onUpdateStatus={updatePedidoStatus} />;
      case "terapeutas":
        return <TerapeutasTab />;
      case "usuarios":
        return <UsuariosAdminTab />;
      case "produtos":
        return <CrudListTab items={produtos} isLoading={loadingProdutos} emptyMessage="Nenhum produto cadastrado" type="produtos" onEdit={openEditDialog} onDelete={handleDelete} onToggle={toggleDisponivel} />;
      case "servicos":
        return <CrudListTab items={servicos} isLoading={loadingServicos} emptyMessage="Nenhum serviço cadastrado" type="servicos" onEdit={openEditDialog} onDelete={handleDelete} onToggle={toggleDisponivel} />;
      case "servicos-detalhes":
        return <ServicosDetalhesTab />;
      case "pacotes":
        return <CrudListTab items={pacotes} isLoading={loadingPacotes} emptyMessage="Nenhum pacote cadastrado" type="pacotes" onEdit={openEditDialog} onDelete={handleDelete} onToggle={toggleDisponivel} />;
      case "protocolos":
        return <ProtocolosTab />;
      case "exercicios":
        return <ExerciciosTab />;
      case "planos-alongamento":
        return <PlanosAlongamentoTab />;
      case "planos-dieta":
        return <PlanosDietaTab />;
      case "dietas-conteudo":
        return <DietasConteudoTab />;
      case "secoes-clinicas":
        return <SecoesClinicasTab />;
      case "anamnese":
        return <AnamneseAdminTab />;
      case "headspa":
        return <HeadSpaImagensTab />;
      case "planos-vip":
        return <PlanosVipTab />;
      case "assinaturas":
        return <AssinaturasTab />;
      case "indicacoes":
        return <IndicacoesTab />;
      case "desafios-admin":
        return <DesafiosTab />;
      case "vales":
        return <ValesPresenteTab />;
      case "cupom":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Editor de Cupom</h3>
                <p className="text-sm text-muted-foreground">Crie cupons visuais para redes sociais e impressão</p>
              </div>
              <Button onClick={() => navigate("/cupom-editor")} className="gap-2 shadow-button">
                <Ticket className="w-4 h-4" />
                Abrir Editor
              </Button>
            </div>
          </div>
        );
      case "empresas":
        return <EmpresasTab />;
      case "corp-conteudo":
        return <CorporativoConteudoTab />;
      case "parceiros":
        return <ParceirosTab />;
      case "landing":
        return <LandingPageTab />;
      case "segmentacao":
        return <SegmentacaoClientesTab />;
      case "campanhas":
        return <CampanhasMarketingTab />;
      case "banners":
        return <BannersPromocionaisTab />;
      case "google-ads":
        return (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-foreground">Google Ads Dashboard</h3>
                <p className="text-sm text-muted-foreground">Métricas e performance das campanhas Google Ads</p>
              </div>
              <Button onClick={() => navigate("/admin/google-ads")} className="gap-2 shadow-button">
                <BarChart3 className="w-4 h-4" />
                Abrir Dashboard
              </Button>
            </div>
          </div>
        );
      case "notificacoes-admin":
        return <NotificacoesAdminTab />;
      case "social-posts":
        return <SocialPostsTab />;
      case "social-config":
        return <SocialPostsConfigTab />;
      case "cursos-admin":
        return <CursosAdminTab />;
      case "materiais-admin":
        return <MateriaisAdminTab />;
      case "relatorio-tecnico":
        return <RelatorioTecnicoTab />;
      case "apresentacao":
        return <ApresentacaoPlataformaTab />;
      case "codigo":
        return <CodigoPlataformaTab />;
      case "venda-plataforma":
        return <VendaPlataformaTab />;
      default:
        return <DashboardTab stats={stats} pedidos={pedidos} transacoes={transacoes} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="gradient-primary shadow-button sticky top-0 z-10"
      >
        <div className="max-w-6xl mx-auto px-4 safe-top">
          <div className="flex items-center gap-3 py-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-200 active:scale-95"
            >
              <ArrowLeft size={20} className="text-primary-foreground" />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold text-primary-foreground">Painel Admin</h1>
              <p className="text-xs text-primary-foreground/70 truncate">
                {getActiveGroup(activeTab)} › {getActiveLabel(activeTab)}
              </p>
            </div>
            <ThemeToggle />
            {/* Mobile nav toggle */}
            <Sheet open={navOpen} onOpenChange={setNavOpen}>
              <SheetTrigger asChild>
                <button className="lg:hidden p-2 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all">
                  <Menu size={20} className="text-primary-foreground" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-4 pt-8">
                <h2 className="text-sm font-bold text-foreground mb-4">Navegação</h2>
                <AdminNavigation activeTab={activeTab} onTabChange={handleTabChange} />
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </motion.div>

      <div className="max-w-6xl mx-auto px-4 py-6">
        <div className="flex gap-6">
          {/* Desktop sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="hidden lg:block w-60 shrink-0 sticky top-24 self-start"
          >
            <AdminNavigation activeTab={activeTab} onTabChange={handleTabChange} />
          </motion.aside>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {activeTab === "dashboard" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
              >
                <StatsCards
                  totalProdutos={produtos.length}
                  totalServicos={servicos.length}
                  totalPacotes={pacotes.length}
                  totalUsuarios={usuarios.length}
                />
              </motion.div>
            )}

            {showNewButton && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex justify-end mb-4"
              >
                <Button size="sm" onClick={openCreateDialog} className="shadow-button active:scale-95 transition-transform">
                  <Plus className="w-4 h-4 mr-1" />
                  Novo
                </Button>
              </motion.div>
            )}

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                variants={tabContentVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {renderContent()}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AdminFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        activeTab={activeTab}
        editingItem={editingItem}
        formData={formData}
        setFormData={setFormData}
        saving={saving}
        onSave={handleSave}
      />
    </div>
  );
};

export default Admin;
