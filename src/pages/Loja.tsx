import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Leaf, Sparkles, Package, Search, X, XCircle, Dumbbell, Apple, ShoppingBag } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";
import { useProdutos, usePedidos, Produto } from "@/hooks/usePedidos";
import { useTransacoes } from "@/hooks/useTransacoes";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ProdutoCard } from "@/components/loja/ProdutoCard";
import { CarrinhoFlutuante } from "@/components/loja/CarrinhoFlutuante";
import { CarrinhoSheet } from "@/components/loja/CarrinhoSheet";
import { ProdutosGridSkeleton, PedidosListSkeleton } from "@/components/skeletons";
import { AppLayout } from "@/components/AppLayout";

interface CarrinhoItem {
  produto: Produto;
  quantidade: number;
}

export default function Loja() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { produtos, loading: loadingProdutos } = useProdutos();
  const { pedidos, loading: loadingPedidos, createPedido, cancelPedido } = usePedidos();
  const { stats, createTransacao, refetch: refetchTransacoes } = useTransacoes();
  
  const [activeTab, setActiveTab] = useState("loja");
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>("todos");
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);
  const [saving, setSaving] = useState(false);
  const [carrinhoOpen, setCarrinhoOpen] = useState(false);
  const [busca, setBusca] = useState("");
  const [usarCashback, setUsarCashback] = useState(false);

  const produtosFiltrados = produtos
    .filter(p => categoriaAtiva === "todos" || p.categoria === categoriaAtiva)
    .filter(p => p.nome.toLowerCase().includes(busca.toLowerCase()));

  const handleToggleCarrinho = (produto: Produto) => {
    const existente = carrinho.find(item => item.produto.id === produto.id);
    
    if (existente) {
      setCarrinho(carrinho.filter(item => item.produto.id !== produto.id));
      toast({
        title: "Produto removido",
        description: `${produto.nome} foi removido do carrinho.`,
      });
    } else {
      setCarrinho([...carrinho, { produto, quantidade: 1 }]);
      toast({
        title: "Adicionado ao carrinho! 🛒",
        description: `${produto.nome}`,
      });
    }
  };

  const noCarrinho = (id: string) => carrinho.some(item => item.produto.id === id);

  const totalCarrinho = carrinho.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0);

  const handleUpdateQuantidade = (produtoId: string, delta: number) => {
    setCarrinho(carrinho.map(item => {
      if (item.produto.id === produtoId) {
        const novaQtd = item.quantidade + delta;
        if (novaQtd <= 0) return item;
        return { ...item, quantidade: novaQtd };
      }
      return item;
    }));
  };

  const handleRemoverDoCarrinho = (produtoId: string) => {
    const item = carrinho.find(i => i.produto.id === produtoId);
    setCarrinho(carrinho.filter(i => i.produto.id !== produtoId));
    if (item) {
      toast({
        title: "Produto removido",
        description: `${item.produto.nome} foi removido do carrinho.`,
      });
    }
  };

  const handleReservar = async (usarCashbackNoPedido: boolean, valorCashbackUsado: number) => {
    if (carrinho.length === 0) return;

    setSaving(true);
    
    // Calcular total considerando desconto
    const subtotal = carrinho.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0);
    const totalComDesconto = subtotal - valorCashbackUsado;
    
    const itens = carrinho.map(item => ({
      produto_id: item.produto.id,
      quantidade: item.quantidade,
      preco_unitario: item.produto.preco,
    }));

    // Criar pedido com total já descontado
    const { error, pedidoId } = await createPedido(itens, totalComDesconto);
    
    if (error) {
      setSaving(false);
      toast({
        title: "Erro ao criar pedido",
        description: "Tente novamente.",
        variant: "destructive",
      });
      return;
    }

    // Se usou cashback, criar transação de débito
    if (usarCashbackNoPedido && valorCashbackUsado > 0) {
      await createTransacao(
        "uso_cashback",
        -valorCashbackUsado,
        `Usado no pedido #${pedidoId?.slice(0, 8)}`,
        pedidoId
      );
      await refetchTransacoes();
    }

    setSaving(false);
    toast({
      title: "Pedido reservado! ✅",
      description: valorCashbackUsado > 0 
        ? `Você economizou R$ ${valorCashbackUsado.toFixed(2).replace('.', ',')} com cashback!`
        : "Retire seus produtos na clínica.",
    });
    setCarrinho([]);
    setCarrinhoOpen(false);
    setUsarCashback(false);
    setActiveTab("pedidos");
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente": return "bg-yellow-100 text-yellow-800";
      case "confirmado": return "bg-primary/10 text-primary";
      case "entregue": return "bg-green-100 text-green-800";
      case "cancelado": return "bg-destructive/10 text-destructive";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "pendente": return "Pendente";
      case "confirmado": return "Confirmado";
      case "entregue": return "Entregue";
      case "cancelado": return "Cancelado";
      default: return status;
    }
  };

  return (
    <AppLayout>
    <div className="min-h-screen bg-background pb-32 lg:pb-8">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-r from-primary/5 via-accent/5 to-primary/5 border-b border-border px-4 py-4 safe-top">
        <div className="absolute -top-10 -right-10 w-24 h-24 bg-accent/10 rounded-full blur-2xl" />
        <div className="max-w-lg lg:max-w-4xl mx-auto flex items-center gap-4 relative z-10">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold text-primary">Loja Resinkra</h1>
            <p className="text-xs text-muted-foreground">Produtos exclusivos</p>
          </div>
          <CarrinhoSheet
            carrinho={carrinho}
            onUpdateQuantidade={handleUpdateQuantidade}
            onRemover={handleRemoverDoCarrinho}
            onReservar={handleReservar}
            saving={saving}
            open={carrinhoOpen}
            onOpenChange={setCarrinhoOpen}
            saldoCashback={stats.totalCashback}
            usarCashback={usarCashback}
            onToggleCashback={setUsarCashback}
          />
        </div>
      </div>

      <div className="max-w-lg lg:max-w-4xl mx-auto px-4 lg:px-8 py-4 space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="loja">Produtos</TabsTrigger>
            <TabsTrigger value="pedidos">Meus Pedidos</TabsTrigger>
          </TabsList>

          <TabsContent value="pedidos" className="mt-4">
            {loadingPedidos ? (
              <PedidosListSkeleton />
            ) : pedidos.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum pedido encontrado</p>
                <Button 
                  variant="link" 
                  onClick={() => setActiveTab("loja")}
                  className="mt-2"
                >
                  Ver produtos
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {pedidos.map((pedido) => (
                  <Card key={pedido.id} className="overflow-hidden">
                    {/* Header do pedido */}
                    <div className="p-4 border-b border-border">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-semibold text-foreground">
                            Pedido #{pedido.id.slice(0, 8)}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {format(new Date(pedido.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                          </p>
                        </div>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(pedido.status)}`}>
                          {getStatusLabel(pedido.status)}
                        </span>
                      </div>
                    </div>

                    {/* Itens do pedido */}
                    {pedido.pedido_itens && pedido.pedido_itens.length > 0 && (
                      <div className="p-3 bg-muted/30 space-y-2">
                        {pedido.pedido_itens.map((item) => (
                          <div key={item.id} className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center text-lg shrink-0">
                              {item.produtos?.imagem_url?.startsWith("http") ? (
                                <img
                                  src={item.produtos.imagem_url}
                                  alt={item.produtos?.nome || "Produto"}
                                  className="w-full h-full object-cover rounded-md"
                                />
                              ) : (
                                item.produtos?.imagem_url || "📦"
                              )}
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium line-clamp-1">
                                {item.produtos?.nome || "Produto"}
                              </p>
                              <p className="text-xs text-muted-foreground">
                                {item.quantidade}x R$ {item.preco_unitario.toFixed(2).replace('.', ',')}
                              </p>
                            </div>
                            <p className="text-sm font-semibold text-primary shrink-0">
                              R$ {(item.quantidade * item.preco_unitario).toFixed(2).replace('.', ',')}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Total e ações */}
                    <div className="p-4 flex justify-between items-center">
                      <div>
                        <span className="text-sm text-muted-foreground">Total do pedido</span>
                        <p className="font-bold text-primary">
                          R$ {pedido.total.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                      {pedido.status === "pendente" && (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-destructive border-destructive/30 hover:bg-destructive/10"
                          onClick={async () => {
                            const { error } = await cancelPedido(pedido.id);
                            if (error) {
                              toast({
                                title: "Erro ao cancelar",
                                description: "Tente novamente.",
                                variant: "destructive",
                              });
                            } else {
                              toast({
                                title: "Pedido cancelado",
                                description: "Seu pedido foi cancelado com sucesso.",
                              });
                            }
                          }}
                        >
                          <XCircle size={16} className="mr-1" />
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="loja" className="mt-4 space-y-4">
            {/* Campo de Busca */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Buscar produtos..."
                value={busca}
                onChange={(e) => setBusca(e.target.value)}
                className="pl-10 pr-10"
              />
              {busca && (
                <button
                  onClick={() => setBusca("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X size={18} />
                </button>
              )}
            </div>

            {/* Filtros de Categoria - Dinâmicos */}
            <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-none">
              {(() => {
                const categoriasUnicas = Array.from(
                  new Set(produtos.map(p => p.categoria).filter(Boolean))
                ) as string[];
                
                const categoriasConfig: Record<string, { icon: typeof Sparkles; label: string }> = {
                  spa: { icon: Sparkles, label: "Home SPA" },
                  gastronomia: { icon: Leaf, label: "Gastronomia" },
                  emagrecimento: { icon: Apple, label: "Emagrecimento" },
                  alongamento: { icon: Dumbbell, label: "Alongamento" },
                };

                return (
                  <>
                    <Button
                      variant={categoriaAtiva === "todos" ? "default" : "outline"}
                      size="sm"
                      onClick={() => setCategoriaAtiva("todos")}
                      className="shrink-0"
                    >
                      <ShoppingBag size={14} />
                      Todos
                    </Button>
                    {categoriasUnicas.map((cat) => {
                      const config = categoriasConfig[cat] || { icon: Package, label: cat.charAt(0).toUpperCase() + cat.slice(1) };
                      const Icon = config.icon;
                      return (
                        <Button
                          key={cat}
                          variant={categoriaAtiva === cat ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCategoriaAtiva(cat)}
                          className="shrink-0 gap-1"
                        >
                          <Icon size={14} />
                          {config.label}
                        </Button>
                      );
                    })}
                  </>
                );
              })()}
            </div>

            {loadingProdutos ? (
              <ProdutosGridSkeleton />
            ) : produtosFiltrados.length === 0 ? (
              <div className="text-center py-12">
                <Package className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground">Nenhum produto encontrado</p>
              </div>
            ) : (
              <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 lg:gap-4">
                {produtosFiltrados.map((produto, index) => (
                  <ProdutoCard
                    key={produto.id}
                    produto={produto}
                    index={index}
                    noCarrinho={noCarrinho(produto.id)}
                    onToggle={() => handleToggleCarrinho(produto)}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Carrinho Flutuante */}
        {carrinho.length > 0 && activeTab === "loja" && (
          <CarrinhoFlutuante
            quantidade={carrinho.length}
            total={totalCarrinho}
            saving={saving}
            onReservar={() => setCarrinhoOpen(true)}
          />
        )}
      </div>

    </div>
    </AppLayout>
  );
}
