import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Copy, Gift, Users, Check, Share2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/AppLayout";
import { useIndicacoes } from "@/hooks/useIndicacoes";
import { toast } from "sonner";
import { ButtonLoader } from "@/components/LoadingSpinner";

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 260, damping: 24 },
  },
};

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
        await navigator.share({ title: "Convite especial", text: texto });
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
    <AppLayout>
      <div className="min-h-screen bg-background gradient-hero pb-24 lg:pb-8">
        <div className="max-w-lg lg:max-w-4xl mx-auto px-4 lg:px-8 safe-top pt-4">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-5"
          >
            <button 
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-muted/50 transition-colors"
            >
              <ArrowLeft size={22} className="text-foreground" />
            </button>
            <h1 className="text-xl font-bold text-foreground">Indicações</h1>
          </motion.div>

          <motion.div
            variants={stagger}
            initial="hidden"
            animate="show"
            className="space-y-5"
          >
            {/* Banner de indicação */}
            <motion.div variants={fadeUp}>
              <div className="relative overflow-hidden rounded-3xl p-6 text-primary-foreground">
                <div className="absolute inset-0 gradient-primary" />
                <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-accent/20 blur-2xl" />
                <div className="absolute -bottom-8 -left-8 w-28 h-28 rounded-full bg-highlight/20 blur-xl" />
                
                <div className="relative z-10 text-center space-y-4">
                  <div className="w-16 h-16 mx-auto rounded-2xl bg-primary-foreground/20 backdrop-blur-sm flex items-center justify-center">
                    <Gift size={32} />
                  </div>
                  <div>
                    <h2 className="text-lg font-bold font-serif">Indique e Ganhe!</h2>
                    <p className="text-sm opacity-90 mt-1">
                      Ganhe R$ 10 de cashback para cada amigo que usar seu código
                    </p>
                  </div>
                  
                  {/* Código do usuário */}
                  <div className="bg-primary-foreground/15 backdrop-blur-sm rounded-2xl p-4 border border-primary-foreground/10">
                    <p className="text-xs opacity-70 mb-2">Seu código de indicação</p>
                    <div className="flex items-center gap-2">
                      <div className="flex-1 font-mono text-2xl font-bold tracking-widest">
                        {loading ? "..." : codigoIndicacao}
                      </div>
                      <Button
                        size="icon"
                        variant="secondary"
                        onClick={handleCopiar}
                        className="shrink-0 bg-primary-foreground/20 border-0 hover:bg-primary-foreground/30 text-primary-foreground"
                      >
                        {copiado ? <Check size={18} /> : <Copy size={18} />}
                      </Button>
                    </div>
                  </div>

                  <Button 
                    onClick={handleCompartilhar} 
                    className="w-full gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0"
                  >
                    <Share2 size={18} />
                    Compartilhar código
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Estatísticas */}
            <motion.div variants={fadeUp}>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-4 rounded-2xl glass-card-strong text-center">
                  <div className="p-2 rounded-xl bg-primary/10 w-fit mx-auto mb-2">
                    <Users className="text-primary" size={22} />
                  </div>
                  <p className="text-2xl font-bold font-serif text-foreground">{indicacoes.length}</p>
                  <p className="text-xs text-muted-foreground">Indicações</p>
                </div>
                <div className="p-4 rounded-2xl glass-card-strong text-center">
                  <div className="p-2 rounded-xl bg-highlight/10 w-fit mx-auto mb-2">
                    <Gift className="text-highlight" size={22} />
                  </div>
                  <p className="text-2xl font-bold font-serif text-highlight">
                    R$ {totalCashbackIndicacoes.toFixed(2).replace('.', ',')}
                  </p>
                  <p className="text-xs text-muted-foreground">Cashback ganho</p>
                </div>
              </div>
            </motion.div>

            {/* Usar código de indicação */}
            <motion.div variants={fadeUp} className="space-y-2.5">
              <p className="section-label px-1">Tem um código?</p>
              <div className="p-4 rounded-2xl glass-card-strong">
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
                    {aplicando ? <ButtonLoader /> : "Aplicar"}
                  </Button>
                </div>
              </div>
            </motion.div>

            {/* Lista de indicações */}
            {indicacoes.length > 0 && (
              <motion.div variants={fadeUp} className="space-y-2.5">
                <p className="section-label px-1">Suas indicações</p>
                <div className="space-y-2">
                  {indicacoes.map((indicacao) => (
                    <motion.div
                      key={indicacao.id}
                      variants={fadeUp}
                      className="p-4 rounded-2xl glass-card-strong"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                            <Users size={18} className="text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground">
                              {indicacao.indicado?.nome || "Usuário"}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {new Date(indicacao.created_at).toLocaleDateString('pt-BR')}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className={`font-semibold ${
                            indicacao.status === 'processado' ? 'text-highlight' : 'text-muted-foreground'
                          }`}>
                            +R$ {indicacao.cashback_valor.toFixed(2).replace('.', ',')}
                          </p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {indicacao.status === 'processado' ? 'Creditado' : 'Pendente'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </AppLayout>
  );
};

export default Indicacoes;
