import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Leaf, Sparkles, Plus, Check, Loader2, Package } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";
import { useProdutos, usePedidos, Produto } from "@/hooks/usePedidos";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

// Produtos mock para quando o banco estiver vazio
const produtosMock: Omit<Produto, "id" | "created_at">[] = [
  {
    nome: "Kit Óleos Essenciais",
    descricao: "Lavanda, eucalipto e hortelã para relaxamento",
    preco: 89.90,
    categoria: "spa",
    imagem_url: "🧴",
    disponivel: true,
  },
  {
    nome: "Vela Aromática Relaxante",
    descricao: "Aroma suave de baunilha e canela",
    preco: 45.00,
    categoria: "spa",
    imagem_url: "🕯️",
    disponivel: true,
  },
  {
    nome: "Sal de Banho Detox",
    descricao: "Sal marinho com ervas purificantes",
    preco: 38.00,
    categoria: "spa",
    imagem_url: "🛁",
    disponivel: true,
  },
  {
    nome: "Óleo de Massagem Premium",
    descricao: "Blend exclusivo para massagem relaxante",
    preco: 75.00,
    categoria: "spa",
    imagem_url: "💆",
    disponivel: true,
  },
  {
    nome: "Chá Detox Resinkra",
    descricao: "Blend de ervas para desintoxicação",
    preco: 32.00,
    categoria: "gastronomia",
    imagem_url: "🍵",
    disponivel: true,
  },
  {
    nome: "Granola Artesanal",
    descricao: "Com castanhas e frutas secas orgânicas",
    preco: 28.00,
    categoria: "gastronomia",
    imagem_url: "🥣",
    disponivel: true,
  },
  {
    nome: "Mel Orgânico 500g",
    descricao: "Mel puro de florada silvestre",
    preco: 42.00,
    categoria: "gastronomia",
    imagem_url: "🍯",
    disponivel: true,
  },
  {
    nome: "Mix de Nuts Premium",
    descricao: "Castanhas, amêndoas e nozes selecionadas",
    preco: 55.00,
    categoria: "gastronomia",
    imagem_url: "🥜",
    disponivel: true,
  },
];

interface CarrinhoItem {
  produto: Produto | (Omit<Produto, "id" | "created_at"> & { id: string });
  quantidade: number;
}

export default function Loja() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { produtos: produtosBanco, loading: loadingProdutos } = useProdutos();
  const { pedidos, loading: loadingPedidos, createPedido } = usePedidos();
  
  const [activeTab, setActiveTab] = useState("loja");
  const [categoriaAtiva, setCategoriaAtiva] = useState<"todos" | "spa" | "gastronomia">("todos");
  const [carrinho, setCarrinho] = useState<CarrinhoItem[]>([]);
  const [saving, setSaving] = useState(false);

  // Use produtos do banco ou mock se vazio
  const produtos = produtosBanco.length > 0 
    ? produtosBanco 
    : produtosMock.map((p, i) => ({ ...p, id: `mock-${i}`, created_at: new Date().toISOString() }));

  const produtosFiltrados = categoriaAtiva === "todos" 
    ? produtos 
    : produtos.filter(p => p.categoria === categoriaAtiva);

  const handleAdicionarCarrinho = (produto: typeof produtos[0]) => {
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

  const handleReservar = async () => {
    if (carrinho.length === 0) return;

    // Se são produtos mock, só simular
    if (carrinho[0].produto.id.startsWith("mock-")) {
      toast({
        title: "Pedido reservado! ✅",
        description: "Retire seus produtos na clínica.",
      });
      setCarrinho([]);
      return;
    }

    setSaving(true);
    const itens = carrinho.map(item => ({
      produto_id: item.produto.id,
      quantidade: item.quantidade,
      preco_unitario: item.produto.preco,
    }));

    const { error } = await createPedido(itens);
    setSaving(false);

    if (error) {
      toast({
        title: "Erro ao criar pedido",
        description: "Tente novamente.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Pedido reservado! ✅",
        description: "Retire seus produtos na clínica.",
      });
      setCarrinho([]);
      setActiveTab("pedidos");
    }
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
    <div className="min-h-screen bg-background pb-32">
      {/* Header */}
      <div className="bg-card border-b border-border px-4 py-4 safe-top">
        <div className="max-w-lg mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(-1)}
            className="shrink-0"
          >
            <ArrowLeft size={20} />
          </Button>
          <div className="flex-1">
            <h1 className="text-lg font-semibold">Loja Resinkra</h1>
            <p className="text-xs text-muted-foreground">Produtos exclusivos</p>
          </div>
          <div className="relative">
            <ShoppingBag size={24} className="text-primary" />
            {carrinho.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {carrinho.length}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-4 space-y-4">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="loja">Produtos</TabsTrigger>
            <TabsTrigger value="pedidos">Meus Pedidos</TabsTrigger>
          </TabsList>

          <TabsContent value="pedidos" className="mt-4">
            {loadingPedidos ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
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
              <div className="space-y-3">
                {pedidos.map((pedido) => (
                  <Card key={pedido.id} className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-semibold text-foreground">
                          Pedido #{pedido.id.slice(0, 8)}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(pedido.created_at), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                        </p>
                        <p className="text-primary font-semibold mt-2">
                          R$ {pedido.total.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                      <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(pedido.status)}`}>
                        {getStatusLabel(pedido.status)}
                      </span>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="loja" className="mt-4 space-y-4">
            {/* Filtros de Categoria */}
            <div className="flex gap-2">
              <Button
                variant={categoriaAtiva === "todos" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoriaAtiva("todos")}
                className="flex-1"
              >
                Todos
              </Button>
              <Button
                variant={categoriaAtiva === "spa" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoriaAtiva("spa")}
                className="flex-1 gap-1"
              >
                <Sparkles size={14} />
                Home SPA
              </Button>
              <Button
                variant={categoriaAtiva === "gastronomia" ? "default" : "outline"}
                size="sm"
                onClick={() => setCategoriaAtiva("gastronomia")}
                className="flex-1 gap-1"
              >
                <Leaf size={14} />
                Gastronomia
              </Button>
            </div>

            {loadingProdutos ? (
              <div className="flex justify-center py-12">
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-3">
                {produtosFiltrados.map((produto, index) => (
                  <motion.div
                    key={produto.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <Card className="p-3 relative overflow-hidden">
                      <div className="text-4xl mb-2 text-center">
                        {produto.imagem_url?.startsWith("http") ? (
                          <img src={produto.imagem_url} alt={produto.nome} className="w-12 h-12 mx-auto object-cover rounded" />
                        ) : (
                          produto.imagem_url || "📦"
                        )}
                      </div>
                      
                      <h3 className="font-medium text-sm line-clamp-1">{produto.nome}</h3>
                      <p className="text-[10px] text-muted-foreground line-clamp-2 mt-0.5 min-h-[28px]">
                        {produto.descricao}
                      </p>
                      
                      <div className="flex items-center justify-between mt-2">
                        <div>
                          <p className="font-bold text-sm">
                            R$ {produto.preco.toFixed(2).replace('.', ',')}
                          </p>
                        </div>
                        
                        <Button
                          size="icon"
                          variant={noCarrinho(produto.id) ? "default" : "outline"}
                          className="h-8 w-8"
                          onClick={() => handleAdicionarCarrinho(produto)}
                        >
                          {noCarrinho(produto.id) ? <Check size={16} /> : <Plus size={16} />}
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* Carrinho Flutuante */}
        {carrinho.length > 0 && activeTab === "loja" && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-20 left-4 right-4 max-w-lg mx-auto"
          >
            <Card className="p-4 bg-primary text-primary-foreground shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium">
                    {carrinho.length} {carrinho.length === 1 ? 'item' : 'itens'} no carrinho
                  </p>
                  <p className="text-xs opacity-90">
                    Total: R$ {totalCarrinho.toFixed(2).replace('.', ',')}
                  </p>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={handleReservar}
                  disabled={saving}
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : "Reservar"}
                </Button>
              </div>
            </Card>
          </motion.div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
}
