import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, ShoppingBag, Leaf, Sparkles, Plus, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useToast } from "@/hooks/use-toast";

interface Produto {
  id: number;
  nome: string;
  descricao: string;
  preco: number;
  cashback: number;
  categoria: "spa" | "gastronomia";
  imagem: string;
  destaque?: boolean;
}

const produtos: Produto[] = [
  {
    id: 1,
    nome: "Kit Óleos Essenciais",
    descricao: "Lavanda, eucalipto e hortelã para relaxamento",
    preco: 89.90,
    cashback: 8,
    categoria: "spa",
    imagem: "🧴",
    destaque: true,
  },
  {
    id: 2,
    nome: "Vela Aromática Relaxante",
    descricao: "Aroma suave de baunilha e canela",
    preco: 45.00,
    cashback: 5,
    categoria: "spa",
    imagem: "🕯️",
  },
  {
    id: 3,
    nome: "Sal de Banho Detox",
    descricao: "Sal marinho com ervas purificantes",
    preco: 38.00,
    cashback: 4,
    categoria: "spa",
    imagem: "🛁",
  },
  {
    id: 4,
    nome: "Óleo de Massagem Premium",
    descricao: "Blend exclusivo para massagem relaxante",
    preco: 75.00,
    cashback: 7,
    categoria: "spa",
    imagem: "💆",
    destaque: true,
  },
  {
    id: 5,
    nome: "Chá Detox Resinkra",
    descricao: "Blend de ervas para desintoxicação",
    preco: 32.00,
    cashback: 3,
    categoria: "gastronomia",
    imagem: "🍵",
  },
  {
    id: 6,
    nome: "Granola Artesanal",
    descricao: "Com castanhas e frutas secas orgânicas",
    preco: 28.00,
    cashback: 3,
    categoria: "gastronomia",
    imagem: "🥣",
  },
  {
    id: 7,
    nome: "Mel Orgânico 500g",
    descricao: "Mel puro de florada silvestre",
    preco: 42.00,
    cashback: 4,
    categoria: "gastronomia",
    imagem: "🍯",
    destaque: true,
  },
  {
    id: 8,
    nome: "Mix de Nuts Premium",
    descricao: "Castanhas, amêndoas e nozes selecionadas",
    preco: 55.00,
    cashback: 5,
    categoria: "gastronomia",
    imagem: "🥜",
  },
  {
    id: 9,
    nome: "Suco Verde Detox",
    descricao: "Prensado a frio, 100% natural",
    preco: 18.00,
    cashback: 2,
    categoria: "gastronomia",
    imagem: "🥤",
  },
  {
    id: 10,
    nome: "Kit Aromaterapia",
    descricao: "Difusor + 3 óleos essenciais",
    preco: 149.90,
    cashback: 12,
    categoria: "spa",
    imagem: "✨",
    destaque: true,
  },
];

export default function Loja() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [categoriaAtiva, setCategoriaAtiva] = useState<"todos" | "spa" | "gastronomia">("todos");
  const [carrinho, setCarrinho] = useState<number[]>([]);

  const produtosFiltrados = categoriaAtiva === "todos" 
    ? produtos 
    : produtos.filter(p => p.categoria === categoriaAtiva);

  const handleAdicionarCarrinho = (produto: Produto) => {
    if (carrinho.includes(produto.id)) {
      setCarrinho(carrinho.filter(id => id !== produto.id));
      toast({
        title: "Produto removido",
        description: `${produto.nome} foi removido do carrinho.`,
      });
    } else {
      setCarrinho([...carrinho, produto.id]);
      toast({
        title: "Adicionado ao carrinho! 🛒",
        description: `${produto.nome} - Cashback de ${produto.cashback}%`,
      });
    }
  };

  const totalCarrinho = carrinho.reduce((acc, id) => {
    const produto = produtos.find(p => p.id === id);
    return acc + (produto?.preco || 0);
  }, 0);

  const totalCashback = carrinho.reduce((acc, id) => {
    const produto = produtos.find(p => p.id === id);
    return acc + ((produto?.preco || 0) * (produto?.cashback || 0) / 100);
  }, 0);

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
            <p className="text-xs text-muted-foreground">Produtos exclusivos com cashback</p>
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

        {/* Lista de Produtos */}
        <div className="grid grid-cols-2 gap-3">
          {produtosFiltrados.map((produto, index) => {
            const noCarrinho = carrinho.includes(produto.id);
            return (
              <motion.div
                key={produto.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`p-3 relative overflow-hidden ${produto.destaque ? 'ring-1 ring-primary/30' : ''}`}>
                  {produto.destaque && (
                    <Badge className="absolute top-2 right-2 text-[10px] px-1.5 py-0.5">
                      Destaque
                    </Badge>
                  )}
                  
                  <div className="text-4xl mb-2 text-center">{produto.imagem}</div>
                  
                  <h3 className="font-medium text-sm line-clamp-1">{produto.nome}</h3>
                  <p className="text-[10px] text-muted-foreground line-clamp-2 mt-0.5 min-h-[28px]">
                    {produto.descricao}
                  </p>
                  
                  <div className="flex items-center justify-between mt-2">
                    <div>
                      <p className="font-bold text-sm">
                        R$ {produto.preco.toFixed(2).replace('.', ',')}
                      </p>
                      <p className="text-[10px] text-primary font-medium">
                        {produto.cashback}% cashback
                      </p>
                    </div>
                    
                    <Button
                      size="icon"
                      variant={noCarrinho ? "default" : "outline"}
                      className="h-8 w-8"
                      onClick={() => handleAdicionarCarrinho(produto)}
                    >
                      {noCarrinho ? <Check size={16} /> : <Plus size={16} />}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Carrinho Flutuante */}
        {carrinho.length > 0 && (
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
                    Total: R$ {totalCarrinho.toFixed(2).replace('.', ',')} • 
                    Cashback: R$ {totalCashback.toFixed(2).replace('.', ',')}
                  </p>
                </div>
                <Button 
                  variant="secondary" 
                  size="sm"
                  onClick={() => {
                    toast({
                      title: "Pedido reservado! ✅",
                      description: "Retire seus produtos na clínica e ganhe seu cashback.",
                    });
                    setCarrinho([]);
                  }}
                >
                  Reservar
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
