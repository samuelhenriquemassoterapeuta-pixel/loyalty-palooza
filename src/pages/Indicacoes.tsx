import { useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Copy,
  Gift,
  Users,
  Check,
  Share2,
  MessageCircle,
  Instagram,
  UserCheck,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AnimatedPageBackground } from "@/components/AnimatedPageBackground";
import { Input } from "@/components/ui/input";
import { AppLayout } from "@/components/AppLayout";
import { useIndicacoes } from "@/hooks/useIndicacoes";
import { toast } from "sonner";
import { ButtonLoader } from "@/components/LoadingSpinner";

const APP_URL = "https://loyalty-palooza.lovable.app";

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

const codeGlow = {
  animate: {
    textShadow: [
      "0 0 4px rgba(255,255,255,0.3)",
      "0 0 12px rgba(255,255,255,0.6)",
      "0 0 4px rgba(255,255,255,0.3)",
    ],
    transition: { duration: 2.5, repeat: Infinity, ease: "easeInOut" as const },
  },
};

const Indicacoes = () => {
  const navigate = useNavigate();
  const {
    indicacoes,
    codigoIndicacao,
    indicadoPor,
    nomeIndicador,
    totalCashbackIndicacoes,
    loading,
    aplicarCodigoIndicacao,
  } = useIndicacoes();
  const [codigoInput, setCodigoInput] = useState("");
  const [aplicando, setAplicando] = useState(false);
  const [copiado, setCopiado] = useState(false);

  const shareText = `🎁 Use meu código *${codigoIndicacao}* no app Resinkra e ganhe benefícios exclusivos!\n\n👉 Acesse: ${APP_URL}`;

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
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Convite especial — Resinkra",
          text: shareText,
          url: APP_URL,
        });
      } catch {
        // User cancelled
      }
    } else {
      handleCopiar();
    }
  };

  const handleWhatsApp = () => {
    const encoded = encodeURIComponent(shareText);
    window.open(`https://wa.me/?text=${encoded}`, "_blank");
  };

  const handleInstagram = async () => {
    // Instagram doesn't support direct text share — copy to clipboard + open app
    try {
      await navigator.clipboard.writeText(shareText);
      toast.success("Texto copiado! Cole na legenda do seu story ou post.");
      window.open("https://www.instagram.com/", "_blank");
    } catch {
      toast.error("Erro ao copiar texto");
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
      <div className="min-h-screen bg-background gradient-hero pb-24 lg:pb-8 relative overflow-hidden">
        <AnimatedPageBackground />
        <div className="max-w-lg lg:max-w-4xl mx-auto px-4 lg:px-8 safe-top pt-4 relative z-10">
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
                    <h2 className="text-lg font-bold font-serif">
                      Indique e Ganhe!
                    </h2>
                    <p className="text-sm opacity-90 mt-1">
                      Ganhe R$ 10 de cashback para cada amigo que usar seu
                      código
                    </p>
                  </div>

                  {/* Código do usuário com animação glow */}
                  <div className="bg-primary-foreground/15 backdrop-blur-sm rounded-2xl p-4 border border-primary-foreground/10">
                    <p className="text-xs opacity-70 mb-2">
                      Seu código de indicação
                    </p>
                    <div className="flex items-center gap-2">
                      <motion.div
                        className="flex-1 font-mono text-2xl font-bold tracking-widest"
                        {...codeGlow}
                      >
                        {loading ? "..." : codigoIndicacao}
                      </motion.div>
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

                  {/* Compartilhamento — botão principal + WhatsApp / Instagram */}
                  <div className="space-y-2">
                    <Button
                      onClick={handleCompartilhar}
                      className="w-full gap-2 bg-primary-foreground/20 hover:bg-primary-foreground/30 text-primary-foreground border-0"
                    >
                      <Share2 size={18} />
                      Compartilhar código
                    </Button>

                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        onClick={handleWhatsApp}
                        variant="secondary"
                        className="gap-2 bg-[#25D366]/20 hover:bg-[#25D366]/30 text-primary-foreground border-0"
                      >
                        <MessageCircle size={16} />
                        WhatsApp
                      </Button>
                      <Button
                        onClick={handleInstagram}
                        variant="secondary"
                        className="gap-2 bg-[#E1306C]/20 hover:bg-[#E1306C]/30 text-primary-foreground border-0"
                      >
                        <Instagram size={16} />
                        Instagram
                      </Button>
                    </div>
                  </div>
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
                  <p className="text-2xl font-bold font-serif text-foreground">
                    {indicacoes.length}
                  </p>
                  <p className="text-xs text-muted-foreground">Indicações</p>
                </div>
                <div className="p-4 rounded-2xl glass-card-strong text-center">
                  <div className="p-2 rounded-xl bg-highlight/10 w-fit mx-auto mb-2">
                    <Gift className="text-highlight" size={22} />
                  </div>
                  <p className="text-2xl font-bold font-serif text-highlight">
                    R${" "}
                    {totalCashbackIndicacoes.toFixed(2).replace(".", ",")}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Cashback ganho
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Seção de código — mostrar status se já indicado, input se não */}
            <motion.div variants={fadeUp} className="space-y-2.5">
              {indicadoPor ? (
                <>
                  <p className="section-label px-1">Você foi indicado(a)</p>
                  <div className="p-4 rounded-2xl glass-card-strong flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-highlight/10">
                      <UserCheck size={20} className="text-highlight" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">
                        Indicado(a) por{" "}
                        <span className="text-highlight font-semibold">
                          {nomeIndicador || "alguém"}
                        </span>
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Bônus será creditado após seu primeiro pedido 🎉
                      </p>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <p className="section-label px-1">Tem um código?</p>
                  <div className="p-4 rounded-2xl glass-card-strong">
                    <div className="flex gap-2">
                      <Input
                        placeholder="Digite o código"
                        value={codigoInput}
                        onChange={(e) =>
                          setCodigoInput(e.target.value.toUpperCase())
                        }
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
                </>
              )}
            </motion.div>

            {/* Regras do programa */}
            <motion.div variants={fadeUp} className="space-y-2.5">
              <p className="section-label px-1">Como funciona</p>
              <div className="p-4 rounded-2xl glass-card-strong space-y-3">
                {[
                  {
                    step: "1",
                    text: "Compartilhe seu código com amigos",
                  },
                  {
                    step: "2",
                    text: "Seu amigo se cadastra e insere o código",
                  },
                  {
                    step: "3",
                    text: "Após o primeiro pedido, ambos ganham cashback!",
                  },
                ].map(({ step, text }) => (
                  <div key={step} className="flex items-center gap-3">
                    <div className="w-7 h-7 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-xs font-bold text-primary">
                        {step}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">{text}</p>
                  </div>
                ))}
                <div className="pt-2 border-t border-border/50">
                  <p className="text-xs text-muted-foreground">
                    💰 <strong>Indicador:</strong> R$ 10,00 · <strong>Indicado:</strong> R$ 5,00 · Válido por 90 dias
                  </p>
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
                              {new Date(
                                indicacao.created_at
                              ).toLocaleDateString("pt-BR")}
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p
                            className={`font-semibold ${
                              indicacao.status === "processado"
                                ? "text-highlight"
                                : "text-muted-foreground"
                            }`}
                          >
                            +R${" "}
                            {indicacao.cashback_valor
                              .toFixed(2)
                              .replace(".", ",")}
                          </p>
                          <p className="text-xs text-muted-foreground capitalize">
                            {indicacao.status === "processado"
                              ? "Creditado"
                              : "Pendente"}
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
