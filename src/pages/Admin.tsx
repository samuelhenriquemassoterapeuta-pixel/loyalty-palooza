import { useState } from "react"; // v2
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Plus, FileText, Users, Shield, Dumbbell, Sparkles, ClipboardList, StretchHorizontal, Salad, BookOpen, Stethoscope, Globe, Gift, Ticket, Crown, Building2, CreditCard, Handshake, Camera, Trophy, DollarSign, CalendarDays, Target, Megaphone, Send } from "lucide-react";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PageLoading } from "@/components/LoadingSpinner";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

import { StatsCards } from "@/components/admin/StatsCards";
import { DashboardTab } from "@/components/admin/DashboardTab";
import { PedidosTab } from "@/components/admin/PedidosTab";
import { CrudListTab } from "@/components/admin/CrudListTab";
import { AdminFormDialog } from "@/components/admin/AdminFormDialog";
import { TerapeutasTab } from "@/components/admin/TerapeutasTab";
import { AuditLogsViewer } from "@/components/admin/AuditLogsViewer";
import { IndicacoesTab } from "@/components/admin/IndicacoesTab";
import { ThemeToggle } from "@/components/admin/ThemeToggle";
import { ExerciciosTab } from "@/components/admin/ExerciciosTab";
import { HeadSpaImagensTab } from "@/components/admin/HeadSpaImagensTab";
import { ProtocolosTab } from "@/components/admin/ProtocolosTab";
import { PlanosAlongamentoTab } from "@/components/admin/PlanosAlongamentoTab";
import { PlanosDietaTab } from "@/components/admin/PlanosDietaTab";
import { SecoesClinicasTab } from "@/components/admin/SecoesClinicasTab";
import { DietasConteudoTab } from "@/components/admin/DietasConteudoTab";
import { LandingPageTab } from "@/components/admin/LandingPageTab";
import ValesPresenteTab from "@/components/admin/ValesPresenteTab";
import PlanosVipTab from "@/components/admin/PlanosVipTab";
import EmpresasTab from "@/components/admin/EmpresasTab";
import AssinaturasTab from "@/components/admin/AssinaturasTab";
import ParceirosTab from "@/components/admin/ParceirosTab";
import SocialPostsTab from "@/components/admin/SocialPostsTab";
import FinanceiroTab from "@/components/admin/FinanceiroTab";
import DesafiosTab from "@/components/admin/DesafiosTab";
import { AgendamentosTab } from "@/components/admin/AgendamentosTab";
import { ServicosDetalhesTab } from "@/components/admin/ServicosDetalhesTab";
import SegmentacaoClientesTab from "@/components/admin/SegmentacaoClientesTab";
import CampanhasMarketingTab from "@/components/admin/CampanhasMarketingTab";
import BannersPromocionaisTab from "@/components/admin/BannersPromocionaisTab";

const tabContentVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.15 } },
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

  const showNewButton =
    activeTab === "produtos" || activeTab === "servicos" || activeTab === "pacotes";

  return (
    <div className="min-h-screen bg-background">
      {/* Animated Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        className="gradient-primary shadow-button sticky top-0 z-10"
      >
        <div className="max-w-4xl mx-auto px-4 safe-top">
          <div className="flex items-center gap-3 py-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all duration-200 active:scale-95"
            >
              <ArrowLeft size={20} className="text-primary-foreground" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-primary-foreground">Painel Admin</h1>
              <p className="text-xs text-primary-foreground/70">Gerencie seu negócio</p>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-6">
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

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Scrollable tabs */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-4 -mx-4 px-4"
          >
            <ScrollArea className="w-full">
              <TabsList className="inline-flex w-auto min-w-full sm:w-full h-auto p-1 gap-1 bg-card shadow-card">
                <TabsTrigger value="dashboard" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap data-[state=active]:shadow-sm transition-all duration-200">
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="agendamentos" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <CalendarDays size={14} />
                  Agendamentos
                </TabsTrigger>
                <TabsTrigger value="exercicios" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <Dumbbell size={14} />
                  Exercícios
                </TabsTrigger>
                <TabsTrigger value="landing" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <Globe size={14} />
                  Landing Page
                </TabsTrigger>
                <TabsTrigger value="vales" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <Gift size={14} />
                  Vales Presente
                </TabsTrigger>
                <TabsTrigger value="cupom" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <Ticket size={14} />
                  Cupom
                </TabsTrigger>
                <TabsTrigger value="pedidos" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap data-[state=active]:shadow-sm transition-all duration-200">
                  Pedidos
                </TabsTrigger>
                <TabsTrigger value="produtos" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap data-[state=active]:shadow-sm transition-all duration-200">
                  Produtos
                </TabsTrigger>
                <TabsTrigger value="servicos" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap data-[state=active]:shadow-sm transition-all duration-200">
                  Serviços
                </TabsTrigger>
                <TabsTrigger value="servicos-detalhes" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <Sparkles size={14} />
                  Detalhes Serviços
                </TabsTrigger>
                <TabsTrigger value="pacotes" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap data-[state=active]:shadow-sm transition-all duration-200">
                  Pacotes
                </TabsTrigger>
                <TabsTrigger value="terapeutas" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap data-[state=active]:shadow-sm transition-all duration-200">
                  Terapeutas
                </TabsTrigger>
                <TabsTrigger value="indicacoes" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <Users size={14} />
                  Indicações
                </TabsTrigger>
                <TabsTrigger value="protocolos" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <ClipboardList size={14} />
                  Protocolos
                </TabsTrigger>
                <TabsTrigger value="planos-alongamento" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <StretchHorizontal size={14} />
                  Planos Along.
                </TabsTrigger>
                <TabsTrigger value="planos-dieta" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <Salad size={14} />
                  Planos Dieta
                </TabsTrigger>
                <TabsTrigger value="secoes-clinicas" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <Stethoscope size={14} />
                  Seções Clínicas
                </TabsTrigger>
                <TabsTrigger value="dietas-conteudo" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <BookOpen size={14} />
                  Conteúdo Dietas
                </TabsTrigger>
                <TabsTrigger value="headspa" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <Sparkles size={14} />
                  Head SPA
                </TabsTrigger>
                <TabsTrigger value="planos-vip" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <Crown size={14} />
                  Planos VIP
                </TabsTrigger>
                <TabsTrigger value="empresas" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <Building2 size={14} />
                  Empresas
                </TabsTrigger>
                <TabsTrigger value="parceiros" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <Handshake size={14} />
                  Parceiros
                </TabsTrigger>
                <TabsTrigger value="assinaturas" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <CreditCard size={14} />
                  Assinaturas
                </TabsTrigger>
                <TabsTrigger value="social-posts" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <Camera size={14} />
                  Moments
                </TabsTrigger>
                <TabsTrigger value="financeiro" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <DollarSign size={14} />
                  Financeiro
                </TabsTrigger>
                <TabsTrigger value="desafios-admin" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <Trophy size={14} />
                  Desafios
                </TabsTrigger>
                <TabsTrigger value="auditoria" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <FileText size={14} />
                  Auditoria
                </TabsTrigger>
                <TabsTrigger value="segmentacao" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <Target size={14} />
                  Segmentação
                </TabsTrigger>
                <TabsTrigger value="campanhas" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <Send size={14} />
                  Campanhas
                </TabsTrigger>
                <TabsTrigger value="banners" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1 data-[state=active]:shadow-sm transition-all duration-200">
                  <Megaphone size={14} />
                  Banners
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" className="h-1.5" />
            </ScrollArea>
          </motion.div>

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
              <TabsContent value="dashboard" forceMount={activeTab === "dashboard" ? true : undefined} className={activeTab !== "dashboard" ? "hidden" : ""}>
                <DashboardTab stats={stats} pedidos={pedidos} transacoes={transacoes} />
              </TabsContent>

              <TabsContent value="agendamentos" forceMount={activeTab === "agendamentos" ? true : undefined} className={activeTab !== "agendamentos" ? "hidden" : ""}>
                <AgendamentosTab />
              </TabsContent>

              <TabsContent value="pedidos" forceMount={activeTab === "pedidos" ? true : undefined} className={activeTab !== "pedidos" ? "hidden" : ""}>
                <PedidosTab
                  pedidos={pedidos}
                  isLoading={loadingPedidos}
                  onUpdateStatus={updatePedidoStatus}
                />
              </TabsContent>

              <TabsContent value="produtos" forceMount={activeTab === "produtos" ? true : undefined} className={activeTab !== "produtos" ? "hidden" : ""}>
                <CrudListTab
                  items={produtos}
                  isLoading={loadingProdutos}
                  emptyMessage="Nenhum produto cadastrado"
                  type="produtos"
                  onEdit={openEditDialog}
                  onDelete={handleDelete}
                  onToggle={toggleDisponivel}
                />
              </TabsContent>

              <TabsContent value="servicos" forceMount={activeTab === "servicos" ? true : undefined} className={activeTab !== "servicos" ? "hidden" : ""}>
                <CrudListTab
                  items={servicos}
                  isLoading={loadingServicos}
                  emptyMessage="Nenhum serviço cadastrado"
                  type="servicos"
                  onEdit={openEditDialog}
                  onDelete={handleDelete}
                  onToggle={toggleDisponivel}
                />
              </TabsContent>

              <TabsContent value="servicos-detalhes" forceMount={activeTab === "servicos-detalhes" ? true : undefined} className={activeTab !== "servicos-detalhes" ? "hidden" : ""}>
                <ServicosDetalhesTab />
              </TabsContent>

              <TabsContent value="pacotes" forceMount={activeTab === "pacotes" ? true : undefined} className={activeTab !== "pacotes" ? "hidden" : ""}>
                <CrudListTab
                  items={pacotes}
                  isLoading={loadingPacotes}
                  emptyMessage="Nenhum pacote cadastrado"
                  type="pacotes"
                  onEdit={openEditDialog}
                  onDelete={handleDelete}
                  onToggle={toggleDisponivel}
                />
              </TabsContent>

              <TabsContent value="terapeutas" forceMount={activeTab === "terapeutas" ? true : undefined} className={activeTab !== "terapeutas" ? "hidden" : ""}>
                <TerapeutasTab />
              </TabsContent>

              <TabsContent value="indicacoes" forceMount={activeTab === "indicacoes" ? true : undefined} className={activeTab !== "indicacoes" ? "hidden" : ""}>
                <IndicacoesTab />
              </TabsContent>

              <TabsContent value="exercicios" forceMount={activeTab === "exercicios" ? true : undefined} className={activeTab !== "exercicios" ? "hidden" : ""}>
                <ExerciciosTab />
              </TabsContent>

              <TabsContent value="protocolos" forceMount={activeTab === "protocolos" ? true : undefined} className={activeTab !== "protocolos" ? "hidden" : ""}>
                <ProtocolosTab />
              </TabsContent>

              <TabsContent value="planos-alongamento" forceMount={activeTab === "planos-alongamento" ? true : undefined} className={activeTab !== "planos-alongamento" ? "hidden" : ""}>
                <PlanosAlongamentoTab />
              </TabsContent>

              <TabsContent value="planos-dieta" forceMount={activeTab === "planos-dieta" ? true : undefined} className={activeTab !== "planos-dieta" ? "hidden" : ""}>
                <PlanosDietaTab />
              </TabsContent>

              <TabsContent value="secoes-clinicas" forceMount={activeTab === "secoes-clinicas" ? true : undefined} className={activeTab !== "secoes-clinicas" ? "hidden" : ""}>
                <SecoesClinicasTab />
              </TabsContent>

              <TabsContent value="dietas-conteudo" forceMount={activeTab === "dietas-conteudo" ? true : undefined} className={activeTab !== "dietas-conteudo" ? "hidden" : ""}>
                <DietasConteudoTab />
              </TabsContent>

              <TabsContent value="headspa" forceMount={activeTab === "headspa" ? true : undefined} className={activeTab !== "headspa" ? "hidden" : ""}>
                <HeadSpaImagensTab />
              </TabsContent>

              <TabsContent value="planos-vip" forceMount={activeTab === "planos-vip" ? true : undefined} className={activeTab !== "planos-vip" ? "hidden" : ""}>
                <PlanosVipTab />
              </TabsContent>

              <TabsContent value="empresas" forceMount={activeTab === "empresas" ? true : undefined} className={activeTab !== "empresas" ? "hidden" : ""}>
                <EmpresasTab />
              </TabsContent>

              <TabsContent value="assinaturas" forceMount={activeTab === "assinaturas" ? true : undefined} className={activeTab !== "assinaturas" ? "hidden" : ""}>
                <AssinaturasTab />
              </TabsContent>

              <TabsContent value="parceiros" forceMount={activeTab === "parceiros" ? true : undefined} className={activeTab !== "parceiros" ? "hidden" : ""}>
                <ParceirosTab />
              </TabsContent>

              <TabsContent value="social-posts" forceMount={activeTab === "social-posts" ? true : undefined} className={activeTab !== "social-posts" ? "hidden" : ""}>
                <SocialPostsTab />
              </TabsContent>

              <TabsContent value="financeiro" forceMount={activeTab === "financeiro" ? true : undefined} className={activeTab !== "financeiro" ? "hidden" : ""}>
                <FinanceiroTab />
              </TabsContent>

              <TabsContent value="desafios-admin" forceMount={activeTab === "desafios-admin" ? true : undefined} className={activeTab !== "desafios-admin" ? "hidden" : ""}>
                <DesafiosTab />
              </TabsContent>

              <TabsContent value="auditoria" forceMount={activeTab === "auditoria" ? true : undefined} className={activeTab !== "auditoria" ? "hidden" : ""}>
                <AuditLogsViewer />
              </TabsContent>

              <TabsContent value="landing" forceMount={activeTab === "landing" ? true : undefined} className={activeTab !== "landing" ? "hidden" : ""}>
                <LandingPageTab />
              </TabsContent>

              <TabsContent value="vales" forceMount={activeTab === "vales" ? true : undefined} className={activeTab !== "vales" ? "hidden" : ""}>
                <ValesPresenteTab />
              </TabsContent>

              <TabsContent value="cupom" forceMount={activeTab === "cupom" ? true : undefined} className={activeTab !== "cupom" ? "hidden" : ""}>
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
              </TabsContent>

              <TabsContent value="segmentacao" forceMount={activeTab === "segmentacao" ? true : undefined} className={activeTab !== "segmentacao" ? "hidden" : ""}>
                <SegmentacaoClientesTab />
              </TabsContent>

              <TabsContent value="campanhas" forceMount={activeTab === "campanhas" ? true : undefined} className={activeTab !== "campanhas" ? "hidden" : ""}>
                <CampanhasMarketingTab />
              </TabsContent>

              <TabsContent value="banners" forceMount={activeTab === "banners" ? true : undefined} className={activeTab !== "banners" ? "hidden" : ""}>
                <BannersPromocionaisTab />
              </TabsContent>
            </motion.div>
          </AnimatePresence>
        </Tabs>
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
