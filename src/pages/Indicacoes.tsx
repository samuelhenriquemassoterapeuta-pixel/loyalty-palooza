import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Gift, Users, Check, Loader2, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useIndicacoes } from "@/hooks/useIndicacoes";
import { toast } from "sonner";

const Indicacoes = () => {
  const navigate = useNavigate();
  const { indicacoes, codigoIndicacao, totalCashbackIndicacoes, loading, aplicarCodigoIndicacao } = useIndicacoes();
  const [codigoInput, setCodigoInput] = useState("");
  const [aplicando, setAplicando] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const handleCopiar = async () => {
    if (!codigoIndicacao) return;
    
    try {
      await navigator.clipboard.writeText(codigoIndicacao);
      setCopiado(true);
      toast.success("Código copiado!");
      setTimeout(() => setCopiado(false), 2000);
    } catch {
      toast.error("Erro ao copiar");
    }
  };

  const handleCompartilhar = async () => {
    if (!codigoIndicacao) return;
    
    const texto = `🎁 Use meu código ${codigoIndicacao} no app e ganhe benefícios exclusivos!`;
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Convite especial",
          text: texto,
        });
      } catch {
        // User cancelled
      }
    } else {
      handleCopiar();
    }
  };

  const handleAplicarCodigo = async () => {
    if (!codigoInput.trim()) return;
    
    setAplicando(true);
    const result = await aplicarCodigoIndicacao(codigoInput.trim());
    setAplicando(false);
    
    if (result.success) {
      toast.success(result.message);
      setCodigoInput("");
    } else {
      toast.error(result.message);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-4 safe-top">
        {/* Header */}
        <div className="flex items-center gap-4 py-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 rounded-full hover:bg-muted transition-colors"
          >
            <ArrowLeft size={20} />
          </button>
          <h1 className="text-xl font-bold">Indicações</h1>
        </div>

        <div className="space-y-6">
          {/* Banner de indicação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="p-6 bg-gradient-to-br from-primary/20 via-accent/10 to-primary/10 border-primary/20">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-primary/20 flex items-center justify-center">
                  <Gift className="text-primary" size={32} />
                </div>
                <div>
                  <h2 className="text-lg font-bold">Indique e Ganhe!</h2>
                  <p className="text-sm text-muted-foreground mt-1">
                    Ganhe R$ 10 de cashback para cada amigo que usar seu código
                  </p>
                </div>
                
                {/* Código do usuário */}
                <div className="bg-background/80 rounded-xl p-4">
                  <p className="text-xs text-muted-foreground mb-2">Seu código de indicação</p>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 font-mono text-2xl font-bold tracking-widest text-primary">
                      {loading ? "..." : codigoIndicacao}
                    </div>
                    <Button
                      size="icon"
                      variant="outline"
                      onClick={handleCopiar}
                      className="shrink-0"
                    >
                      {copiado ? <Check size={18} /> : <Copy size={18} />}
                    </Button>
                  </div>
                </div>

                <Button onClick={handleCompartilhar} className="w-full gap-2">
                  <Share2 size={18} />
                  Compartilhar código
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Usar código de indicação */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-4">
              <h3 className="font-semibold mb-3">Tem um código?</h3>
              <div className="flex gap-2">
                <Input
                  placeholder="Digite o código"
                  value={codigoInput}
                  onChange={(e) => setCodigoInput(e.target.value.toUpperCase())}
                  className="font-mono uppercase"
                  maxLength={8}
                />
                <Button 
                  onClick={handleAplicarCodigo}
                  disabled={!codigoInput.trim() || aplicando}
                >
                  {aplicando ? <Loader2 className="animate-spin" size={18} /> : "Aplicar"}
                </Button>
              </div>
            </Card>
          </motion.div>

          {/* Estatísticas */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <div className="grid grid-cols-2 gap-4">
              <Card className="p-4 text-center">
                <Users className="mx-auto text-primary mb-2" size={24} />
                <p className="text-2xl font-bold">{indicacoes.length}</p>
                <p className="text-xs text-muted-foreground">Indicações</p>
              </Card>
              <Card className="p-4 text-center">
                <Gift className="mx-auto text-green-500 mb-2" size={24} />
                <p className="text-2xl font-bold text-green-500">
                  R$ {totalCashbackIndicacoes.toFixed(2).replace('.', ',')}
                </p>
                <p className="text-xs text-muted-foreground">Cashback ganho</p>
              </Card>
            </div>
          </motion.div>

          {/* Lista de indicações */}
          {indicacoes.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <h3 className="font-semibold mb-3">Suas indicações</h3>
              <div className="space-y-2">
                {indicacoes.map((indicacao, index) => (
                  <Card key={indicacao.id} className="p-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <Users size={18} className="text-primary" />
                        </div>
                        <div>
                          <p className="font-medium">
                            {indicacao.indicado?.nome || "Usuário"}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(indicacao.created_at).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`font-semibold ${
                          indicacao.status === 'processado' ? 'text-green-500' : 'text-muted-foreground'
                        }`}>
                          +R$ {indicacao.cashback_valor.toFixed(2).replace('.', ',')}
                        </p>
                        <p className="text-xs text-muted-foreground capitalize">
                          {indicacao.status === 'processado' ? 'Creditado' : 'Pendente'}
                        </p>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
      
      <BottomNavigation />
    </div>
  );
};

export default Indicacoes;
