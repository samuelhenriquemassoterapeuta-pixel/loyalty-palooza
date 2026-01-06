import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { ShoppingBag, Plus, Minus, Trash2, Loader2 } from "lucide-react";
import { Produto } from "@/hooks/usePedidos";

interface CarrinhoItem {
  produto: Produto;
  quantidade: number;
}

interface CarrinhoSheetProps {
  carrinho: CarrinhoItem[];
  onUpdateQuantidade: (produtoId: string, delta: number) => void;
  onRemover: (produtoId: string) => void;
  onReservar: () => void;
  saving: boolean;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export const CarrinhoSheet = ({
  carrinho,
  onUpdateQuantidade,
  onRemover,
  onReservar,
  saving,
  open,
  onOpenChange,
}: CarrinhoSheetProps) => {
  const total = carrinho.reduce((acc, item) => acc + item.produto.preco * item.quantidade, 0);
  const totalCashback = carrinho.reduce((acc, item) => {
    const cashback = item.produto.cashback_percentual || 0;
    return acc + (item.produto.preco * item.quantidade * cashback) / 100;
  }, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <button className="relative">
          <ShoppingBag size={24} className="text-primary" />
          {carrinho.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {carrinho.length}
            </span>
          )}
        </button>
      </SheetTrigger>
      <SheetContent side="bottom" className="h-[80vh] rounded-t-3xl">
        <SheetHeader>
          <SheetTitle className="flex items-center gap-2">
            <ShoppingBag className="text-primary" size={20} />
            Meu Carrinho ({carrinho.length})
          </SheetTitle>
        </SheetHeader>

        <div className="mt-4 flex flex-col h-[calc(100%-4rem)]">
          {carrinho.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Seu carrinho está vazio</p>
              <p className="text-sm text-muted-foreground mt-1">
                Adicione produtos para continuar
              </p>
            </div>
          ) : (
            <>
              {/* Lista de itens */}
              <div className="flex-1 overflow-y-auto space-y-3 pb-4">
                {carrinho.map((item) => {
                  const cashback = item.produto.cashback_percentual || 0;
                  const itemCashback = (item.produto.preco * item.quantidade * cashback) / 100;
                  
                  return (
                    <div
                      key={item.produto.id}
                      className="flex gap-3 p-3 bg-card rounded-lg border border-border"
                    >
                      {/* Imagem */}
                      <div className="w-16 h-16 rounded-md bg-muted flex items-center justify-center text-2xl shrink-0">
                        {item.produto.imagem_url?.startsWith("http") ? (
                          <img
                            src={item.produto.imagem_url}
                            alt={item.produto.nome}
                            className="w-full h-full object-cover rounded-md"
                          />
                        ) : (
                          item.produto.imagem_url || "📦"
                        )}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-1">{item.produto.nome}</h4>
                        <p className="text-primary font-semibold text-sm">
                          R$ {(item.produto.preco * item.quantidade).toFixed(2).replace('.', ',')}
                        </p>
                        {cashback > 0 && (
                          <p className="text-[10px] text-green-600">
                            +R$ {itemCashback.toFixed(2).replace('.', ',')} cashback
                          </p>
                        )}

                        {/* Controles de quantidade */}
                        <div className="flex items-center gap-2 mt-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => onUpdateQuantidade(item.produto.id, -1)}
                          >
                            <Minus size={14} />
                          </Button>
                          <span className="text-sm font-medium w-6 text-center">
                            {item.quantidade}
                          </span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-7 w-7"
                            onClick={() => onUpdateQuantidade(item.produto.id, 1)}
                          >
                            <Plus size={14} />
                          </Button>
                        </div>
                      </div>

                      {/* Botão remover */}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-destructive hover:text-destructive shrink-0"
                        onClick={() => onRemover(item.produto.id)}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  );
                })}
              </div>

              {/* Resumo e botão de reservar */}
              <div className="border-t border-border pt-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">
                    R$ {total.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                {totalCashback > 0 && (
                  <div className="flex justify-between items-center text-green-600">
                    <span className="text-sm">Cashback total</span>
                    <span className="font-semibold text-sm">
                      +R$ {totalCashback.toFixed(2).replace('.', ',')}
                    </span>
                  </div>
                )}
                <Button
                  className="w-full"
                  size="lg"
                  onClick={onReservar}
                  disabled={saving}
                >
                  {saving ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Reservar Pedido"
                  )}
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
