import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, FileText } from "lucide-react";
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

  // Stats
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

  // Handlers
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
        <div className="text-center">
          <h1 className="text-xl font-bold text-foreground mb-2">Acesso negado</h1>
          <p className="text-muted-foreground mb-4">Você não tem permissão para acessar esta página.</p>
          <Button onClick={() => navigate("/")}>Voltar ao início</Button>
        </div>
      </div>
    );
  }

  const showNewButton =
    activeTab === "produtos" || activeTab === "servicos" || activeTab === "pacotes";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card shadow-card sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 safe-top">
          <div className="flex items-center gap-3 py-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <ArrowLeft size={20} className="text-foreground" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Painel Admin</h1>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-6">
        <StatsCards
          totalProdutos={produtos.length}
          totalServicos={servicos.length}
          totalPacotes={pacotes.length}
          totalUsuarios={usuarios.length}
        />

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          {/* Scrollable tabs */}
          <div className="mb-4 -mx-4 px-4">
            <ScrollArea className="w-full">
              <TabsList className="inline-flex w-auto min-w-full sm:w-full h-auto p-1 gap-1">
                <TabsTrigger value="dashboard" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap">
                  Dashboard
                </TabsTrigger>
                <TabsTrigger value="pedidos" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap">
                  Pedidos
                </TabsTrigger>
                <TabsTrigger value="produtos" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap">
                  Produtos
                </TabsTrigger>
                <TabsTrigger value="servicos" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap">
                  Serviços
                </TabsTrigger>
                <TabsTrigger value="pacotes" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap">
                  Pacotes
                </TabsTrigger>
                <TabsTrigger value="terapeutas" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap">
                  Terapeutas
                </TabsTrigger>
                <TabsTrigger value="auditoria" className="text-xs sm:text-sm px-3 py-2 whitespace-nowrap flex items-center gap-1">
                  <FileText size={14} />
                  Auditoria
                </TabsTrigger>
              </TabsList>
              <ScrollBar orientation="horizontal" className="h-1.5" />
            </ScrollArea>
          </div>

          {showNewButton && (
            <div className="flex justify-end mb-4">
              <Button size="sm" onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-1" />
                Novo
              </Button>
            </div>
          )}

          <TabsContent value="dashboard">
            <DashboardTab stats={stats} />
          </TabsContent>

          <TabsContent value="pedidos">
            <PedidosTab
              pedidos={pedidos}
              isLoading={loadingPedidos}
              onUpdateStatus={updatePedidoStatus}
            />
          </TabsContent>

          <TabsContent value="produtos">
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

          <TabsContent value="servicos">
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

          <TabsContent value="pacotes">
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

          <TabsContent value="terapeutas">
            <TerapeutasTab />
          </TabsContent>

          <TabsContent value="auditoria">
            <AuditLogsViewer />
          </TabsContent>
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
