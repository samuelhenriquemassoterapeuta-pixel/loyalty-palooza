import { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { 
  ArrowLeft, 
  Package, 
  Scissors, 
  Gift, 
  Users, 
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
  Percent,
  ShoppingBag,
  Clock,
  CheckCircle,
  XCircle,
  TrendingUp,
  DollarSign,
  BarChart3,
  Calendar,
  FileText
} from "lucide-react";
import { AuditLogsViewer } from "@/components/admin/AuditLogsViewer";
import { TerapeutasTab } from "@/components/admin/TerapeutasTab";
import { PageLoading, ButtonLoader, LoadingSpinner } from "@/components/LoadingSpinner";
import { Card } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAdmin } from "@/hooks/useAdmin";
import { supabase } from "@/integrations/supabase/client";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

// Types
interface Produto {
  id: string;
  nome: string;
  descricao: string | null;
  preco: number;
  categoria: string | null;
  imagem_url: string | null;
  disponivel: boolean | null;
  cashback_percentual: number | null;
}

interface Servico {
  id: string;
  nome: string;
  descricao: string | null;
  preco: number;
  duracao: number;
  categoria: string | null;
  disponivel: boolean | null;
  cashback_percentual: number | null;
}

interface Pacote {
  id: string;
  nome: string;
  descricao: string | null;
  preco: number;
  preco_original: number | null;
  total_sessoes: number;
  validade_dias: number | null;
  disponivel: boolean | null;
}

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
      return data as Produto[];
    },
  });

  const { data: servicos = [], isLoading: loadingServicos } = useQuery({
    queryKey: ["admin-servicos"],
    queryFn: async () => {
      const { data, error } = await supabase.from("servicos").select("*").order("nome");
      if (error) throw error;
      return data as Servico[];
    },
  });

  const { data: pacotes = [], isLoading: loadingPacotes } = useQuery({
    queryKey: ["admin-pacotes"],
    queryFn: async () => {
      const { data, error } = await supabase.from("pacotes").select("*").order("nome");
      if (error) throw error;
      return data as Pacote[];
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
        .select(`
          *,
          profiles (nome),
          pedido_itens (
            id,
            quantidade,
            preco_unitario,
            produtos (nome)
          )
        `)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const updatePedidoStatus = async (pedidoId: string, newStatus: string) => {
    try {
      const { error } = await supabase
        .from("pedidos")
        .update({ status: newStatus })
        .eq("id", pedidoId);
      
      if (error) throw error;
      queryClient.invalidateQueries({ queryKey: ["admin-pedidos"] });
      toast.success(`Status atualizado para ${newStatus}`);
    } catch (error: any) {
      toast.error("Erro ao atualizar status");
    }
  };

  // Fetch transações para estatísticas
  const { data: transacoes = [] } = useQuery({
    queryKey: ["admin-transacoes"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("transacoes")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  // Calcular estatísticas
  const stats = {
    totalVendas: pedidos.reduce((acc: number, p: any) => acc + (p.total || 0), 0),
    totalPedidos: pedidos.length,
    pedidosPendentes: pedidos.filter((p: any) => p.status === "pendente").length,
    pedidosEntregues: pedidos.filter((p: any) => p.status === "entregue").length,
    totalCashbackDistribuido: transacoes
      .filter((t: any) => t.tipo === "cashback")
      .reduce((acc: number, t: any) => acc + Number(t.valor), 0),
    totalCashbackUsado: Math.abs(transacoes
      .filter((t: any) => t.tipo === "uso_cashback")
      .reduce((acc: number, t: any) => acc + Number(t.valor), 0)),
    usuariosAtivos: usuarios.length,
    vendasHoje: pedidos
      .filter((p: any) => {
        const hoje = new Date();
        const dataPedido = new Date(p.created_at);
        return dataPedido.toDateString() === hoje.toDateString();
      })
      .reduce((acc: number, p: any) => acc + (p.total || 0), 0),
    pedidosHoje: pedidos.filter((p: any) => {
      const hoje = new Date();
      const dataPedido = new Date(p.created_at);
      return dataPedido.toDateString() === hoje.toDateString();
    }).length,
  };

  // Handlers
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
    switch (activeTab) {
      case "produtos": return "produtos";
      case "servicos": return "servicos";
      case "pacotes": return "pacotes";
      default: return "produtos";
    }
  };

  const handleSave = async () => {
    setSaving(true);
    const table = getTableName();
    
    try {
      const dataToSave = { ...formData };
      
      // Convert numeric fields
      if (dataToSave.preco) dataToSave.preco = parseFloat(dataToSave.preco);
      if (dataToSave.preco_original) dataToSave.preco_original = parseFloat(dataToSave.preco_original) || null;
      if (dataToSave.duracao) dataToSave.duracao = parseInt(dataToSave.duracao);
      if (dataToSave.total_sessoes) dataToSave.total_sessoes = parseInt(dataToSave.total_sessoes);
      if (dataToSave.validade_dias) dataToSave.validade_dias = parseInt(dataToSave.validade_dias);
      if (dataToSave.cashback_percentual !== undefined) {
        dataToSave.cashback_percentual = dataToSave.cashback_percentual ? parseFloat(dataToSave.cashback_percentual) : 0;
      }

      if (editingItem) {
        const { error } = await supabase
          .from(table)
          .update(dataToSave)
          .eq("id", editingItem.id);
        if (error) throw error;
        toast.success("Atualizado com sucesso!");
      } else {
        delete dataToSave.id;
        const { error } = await supabase
          .from(table)
          .insert(dataToSave);
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
        {/* Stats */}
        <div className="grid grid-cols-4 gap-3 mb-6">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl bg-card shadow-card text-center"
          >
            <Package className="w-6 h-6 text-primary mx-auto mb-1" />
            <p className="text-2xl font-bold text-foreground">{produtos.length}</p>
            <p className="text-xs text-muted-foreground">Produtos</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.05 }}
            className="p-4 rounded-xl bg-card shadow-card text-center"
          >
            <Scissors className="w-6 h-6 text-accent mx-auto mb-1" />
            <p className="text-2xl font-bold text-foreground">{servicos.length}</p>
            <p className="text-xs text-muted-foreground">Serviços</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="p-4 rounded-xl bg-card shadow-card text-center"
          >
            <Gift className="w-6 h-6 text-highlight mx-auto mb-1" />
            <p className="text-2xl font-bold text-foreground">{pacotes.length}</p>
            <p className="text-xs text-muted-foreground">Pacotes</p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
            className="p-4 rounded-xl bg-card shadow-card text-center"
          >
            <Users className="w-6 h-6 text-secondary-foreground mx-auto mb-1" />
            <p className="text-2xl font-bold text-foreground">{usuarios.length}</p>
            <p className="text-xs text-muted-foreground">Usuários</p>
          </motion.div>
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList className="grid grid-cols-7 w-full">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="pedidos">Pedidos</TabsTrigger>
              <TabsTrigger value="produtos">Produtos</TabsTrigger>
              <TabsTrigger value="servicos">Serviços</TabsTrigger>
              <TabsTrigger value="pacotes">Pacotes</TabsTrigger>
              <TabsTrigger value="terapeutas">Terapeutas</TabsTrigger>
              <TabsTrigger value="auditoria" className="flex items-center gap-1">
                <FileText size={14} />
                <span className="hidden sm:inline">Auditoria</span>
              </TabsTrigger>
            </TabsList>
          </div>
          
          {activeTab !== "pedidos" && activeTab !== "dashboard" && activeTab !== "terapeutas" && activeTab !== "auditoria" && (
            <div className="flex justify-end mb-4">
              <Button size="sm" onClick={openCreateDialog}>
                <Plus className="w-4 h-4 mr-1" />
                Novo
              </Button>
            </div>
          )}

          {/* Dashboard */}
          <TabsContent value="dashboard" className="space-y-6">
            {/* Cards principais */}
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <DollarSign size={18} />
                  <span className="text-sm">Total em Vendas</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  R$ {stats.totalVendas.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stats.totalPedidos} pedidos
                </p>
              </Card>

              <Card className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar size={18} />
                  <span className="text-sm">Vendas Hoje</span>
                </div>
                <p className="text-2xl font-bold text-primary">
                  R$ {stats.vendasHoje.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-xs text-muted-foreground">
                  {stats.pedidosHoje} pedidos
                </p>
              </Card>

              <Card className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-green-600">
                  <TrendingUp size={18} />
                  <span className="text-sm">Cashback Distribuído</span>
                </div>
                <p className="text-2xl font-bold text-green-600">
                  R$ {stats.totalCashbackDistribuido.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-xs text-muted-foreground">
                  R$ {stats.totalCashbackUsado.toFixed(2).replace('.', ',')} usado
                </p>
              </Card>

              <Card className="p-4 space-y-2">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Users size={18} />
                  <span className="text-sm">Usuários</span>
                </div>
                <p className="text-2xl font-bold text-foreground">
                  {stats.usuariosAtivos}
                </p>
                <p className="text-xs text-muted-foreground">
                  cadastrados
                </p>
              </Card>
            </div>

            {/* Status dos pedidos */}
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <BarChart3 size={18} />
                Status dos Pedidos
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Clock size={16} className="text-yellow-600" />
                    <span className="text-sm">Pendentes</span>
                  </div>
                  <span className="font-bold text-yellow-600">{stats.pedidosPendentes}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check size={16} className="text-blue-600" />
                    <span className="text-sm">Confirmados</span>
                  </div>
                  <span className="font-bold text-blue-600">
                    {pedidos.filter((p: any) => p.status === "confirmado").length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <CheckCircle size={16} className="text-green-600" />
                    <span className="text-sm">Entregues</span>
                  </div>
                  <span className="font-bold text-green-600">{stats.pedidosEntregues}</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircle size={16} className="text-red-600" />
                    <span className="text-sm">Cancelados</span>
                  </div>
                  <span className="font-bold text-red-600">
                    {pedidos.filter((p: any) => p.status === "cancelado").length}
                  </span>
                </div>
              </div>
            </Card>

            {/* Resumo rápido */}
            <Card className="p-4">
              <h3 className="font-semibold text-foreground mb-4">Resumo do Catálogo</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <Package className="w-6 h-6 text-primary mx-auto mb-1" />
                  <p className="text-xl font-bold">{produtos.length}</p>
                  <p className="text-xs text-muted-foreground">Produtos</p>
                </div>
                <div>
                  <Scissors className="w-6 h-6 text-accent mx-auto mb-1" />
                  <p className="text-xl font-bold">{servicos.length}</p>
                  <p className="text-xs text-muted-foreground">Serviços</p>
                </div>
                <div>
                  <Gift className="w-6 h-6 text-highlight mx-auto mb-1" />
                  <p className="text-xl font-bold">{pacotes.length}</p>
                  <p className="text-xs text-muted-foreground">Pacotes</p>
                </div>
              </div>
            </Card>
          </TabsContent>

          {/* Pedidos */}
          <TabsContent value="pedidos" className="space-y-3">
            {loadingPedidos ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="sm" />
              </div>
            ) : pedidos.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum pedido encontrado
              </div>
            ) : (
              pedidos.map((pedido: any) => (
                <motion.div
                  key={pedido.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 rounded-xl bg-card shadow-card space-y-3"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-semibold text-foreground">
                        Pedido #{pedido.id.slice(0, 8)}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {pedido.profiles?.nome || "Cliente"}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {format(new Date(pedido.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                      </p>
                    </div>
                    <Select
                      value={pedido.status}
                      onValueChange={(value) => updatePedidoStatus(pedido.id, value)}
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pendente">
                          <div className="flex items-center gap-2">
                            <Clock size={14} className="text-yellow-600" />
                            Pendente
                          </div>
                        </SelectItem>
                        <SelectItem value="confirmado">
                          <div className="flex items-center gap-2">
                            <Check size={14} className="text-blue-600" />
                            Confirmado
                          </div>
                        </SelectItem>
                        <SelectItem value="entregue">
                          <div className="flex items-center gap-2">
                            <CheckCircle size={14} className="text-green-600" />
                            Entregue
                          </div>
                        </SelectItem>
                        <SelectItem value="cancelado">
                          <div className="flex items-center gap-2">
                            <XCircle size={14} className="text-red-600" />
                            Cancelado
                          </div>
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Itens do pedido */}
                  {pedido.pedido_itens && pedido.pedido_itens.length > 0 && (
                    <div className="bg-muted/50 rounded-lg p-2 space-y-1">
                      {pedido.pedido_itens.map((item: any) => (
                        <div key={item.id} className="flex justify-between text-sm">
                          <span className="text-muted-foreground">
                            {item.quantidade}x {item.produtos?.nome || "Produto"}
                          </span>
                          <span className="font-medium">
                            R$ {(item.quantidade * item.preco_unitario).toFixed(2).replace('.', ',')}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-2 border-t border-border">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <span className="font-bold text-primary">
                      R$ {pedido.total.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                </motion.div>
              ))
            )}
          </TabsContent>

          {/* Produtos */}
          <TabsContent value="produtos" className="space-y-3">
            {loadingProdutos ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="sm" />
              </div>
            ) : produtos.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum produto cadastrado
              </div>
            ) : (
              produtos.map((produto) => (
                <motion.div
                  key={produto.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card shadow-card"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{produto.nome}</p>
                      {!produto.disponivel && (
                        <span className="text-xs px-2 py-0.5 rounded bg-destructive/10 text-destructive">
                          Indisponível
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{produto.categoria}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-primary">
                        R$ {produto.preco.toFixed(2).replace(".", ",")}
                      </p>
                      {(produto.cashback_percentual ?? 0) > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-600 flex items-center gap-0.5">
                          <Percent size={10} />
                          {produto.cashback_percentual}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={produto.disponivel ?? true}
                      onCheckedChange={() => toggleDisponivel(produto.id, produto.disponivel ?? true)}
                    />
                    <Button size="icon" variant="ghost" onClick={() => openEditDialog(produto)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(produto.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </TabsContent>

          {/* Serviços */}
          <TabsContent value="servicos" className="space-y-3">
            {loadingServicos ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="sm" />
              </div>
            ) : servicos.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum serviço cadastrado
              </div>
            ) : (
              servicos.map((servico) => (
                <motion.div
                  key={servico.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card shadow-card"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{servico.nome}</p>
                      {!servico.disponivel && (
                        <span className="text-xs px-2 py-0.5 rounded bg-destructive/10 text-destructive">
                          Indisponível
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{servico.duracao} min</p>
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-semibold text-primary">
                        R$ {servico.preco.toFixed(2).replace(".", ",")}
                      </p>
                      {(servico.cashback_percentual ?? 0) > 0 && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-600 flex items-center gap-0.5">
                          <Percent size={10} />
                          {servico.cashback_percentual}%
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={servico.disponivel ?? true}
                      onCheckedChange={() => toggleDisponivel(servico.id, servico.disponivel ?? true)}
                    />
                    <Button size="icon" variant="ghost" onClick={() => openEditDialog(servico)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(servico.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </TabsContent>

          {/* Pacotes */}
          <TabsContent value="pacotes" className="space-y-3">
            {loadingPacotes ? (
              <div className="flex justify-center py-8">
                <LoadingSpinner size="sm" />
              </div>
            ) : pacotes.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                Nenhum pacote cadastrado
              </div>
            ) : (
              pacotes.map((pacote) => (
                <motion.div
                  key={pacote.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex items-center gap-4 p-4 rounded-xl bg-card shadow-card"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-foreground">{pacote.nome}</p>
                      {!pacote.disponivel && (
                        <span className="text-xs px-2 py-0.5 rounded bg-destructive/10 text-destructive">
                          Indisponível
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{pacote.total_sessoes} sessões</p>
                    <p className="text-sm font-semibold text-primary">
                      R$ {pacote.preco.toFixed(2).replace(".", ",")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Switch
                      checked={pacote.disponivel ?? true}
                      onCheckedChange={() => toggleDisponivel(pacote.id, pacote.disponivel ?? true)}
                    />
                    <Button size="icon" variant="ghost" onClick={() => openEditDialog(pacote)}>
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button size="icon" variant="ghost" className="text-destructive" onClick={() => handleDelete(pacote.id)}>
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ))
            )}
          </TabsContent>

          {/* Auditoria */}
          <TabsContent value="auditoria">
            <AuditLogsViewer />
          </TabsContent>

          {/* Terapeutas */}
          <TabsContent value="terapeutas">
            <TerapeutasTab />
          </TabsContent>
        </Tabs>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="max-w-md mx-4">
          <DialogHeader>
            <DialogTitle>
              {editingItem ? "Editar" : "Novo"} {activeTab === "produtos" ? "Produto" : activeTab === "servicos" ? "Serviço" : "Pacote"}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4 pt-2">
            <div className="space-y-2">
              <Label>Nome</Label>
              <Input
                value={formData.nome || ""}
                onChange={(e) => setFormData({ ...formData, nome: e.target.value })}
                placeholder="Nome"
              />
            </div>

            <div className="space-y-2">
              <Label>Descrição</Label>
              <Textarea
                value={formData.descricao || ""}
                onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
                placeholder="Descrição"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Preço (R$)</Label>
                <Input
                  type="number"
                  step="0.01"
                  value={formData.preco || ""}
                  onChange={(e) => setFormData({ ...formData, preco: e.target.value })}
                  placeholder="0,00"
                />
              </div>

              {activeTab === "produtos" && (
                <div className="space-y-2">
                  <Label>Categoria</Label>
                  <Input
                    value={formData.categoria || ""}
                    onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                    placeholder="Categoria"
                  />
                </div>
              )}

              {activeTab === "servicos" && (
                <>
                  <div className="space-y-2">
                    <Label>Duração (min)</Label>
                    <Input
                      type="number"
                      value={formData.duracao || ""}
                      onChange={(e) => setFormData({ ...formData, duracao: e.target.value })}
                      placeholder="60"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Categoria</Label>
                    <Input
                      value={formData.categoria || ""}
                      onChange={(e) => setFormData({ ...formData, categoria: e.target.value })}
                      placeholder="Ex: massagem, estética"
                    />
                  </div>
                </>
              )}

              {activeTab === "pacotes" && (
                <div className="space-y-2">
                  <Label>Total de sessões</Label>
                  <Input
                    type="number"
                    value={formData.total_sessoes || ""}
                    onChange={(e) => setFormData({ ...formData, total_sessoes: e.target.value })}
                    placeholder="10"
                  />
                </div>
              )}
            </div>

            {activeTab === "produtos" && (
              <>
                <div className="space-y-2">
                  <Label>URL da imagem</Label>
                  <Input
                    value={formData.imagem_url || ""}
                    onChange={(e) => setFormData({ ...formData, imagem_url: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Cashback (%)</Label>
                  <Input
                    type="number"
                    step="0.1"
                    min="0"
                    max="100"
                    value={formData.cashback_percentual || ""}
                    onChange={(e) => setFormData({ ...formData, cashback_percentual: e.target.value })}
                    placeholder="0"
                  />
                </div>
              </>
            )}

            {activeTab === "servicos" && (
              <div className="space-y-2">
                <Label>Cashback (%)</Label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="100"
                  value={formData.cashback_percentual || ""}
                  onChange={(e) => setFormData({ ...formData, cashback_percentual: e.target.value })}
                  placeholder="0"
                />
              </div>
            )}

            {activeTab === "pacotes" && (
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>Preço original (R$)</Label>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.preco_original || ""}
                    onChange={(e) => setFormData({ ...formData, preco_original: e.target.value })}
                    placeholder="0,00"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Validade (dias)</Label>
                  <Input
                    type="number"
                    value={formData.validade_dias || ""}
                    onChange={(e) => setFormData({ ...formData, validade_dias: e.target.value })}
                    placeholder="365"
                  />
                </div>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Switch
                  checked={formData.disponivel ?? true}
                  onCheckedChange={(checked) => setFormData({ ...formData, disponivel: checked })}
                />
                <Label>Disponível</Label>
              </div>
            </div>

            <div className="flex gap-2 pt-4">
              <Button variant="outline" className="flex-1" onClick={() => setDialogOpen(false)}>
                Cancelar
              </Button>
              <Button className="flex-1" onClick={handleSave} disabled={saving}>
                {saving ? <ButtonLoader /> : "Salvar"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Admin;
