import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, Gift, Send, Ticket, Copy, Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { GiftCardVisual, temaOptions } from "@/components/vale-presente/GiftCardVisual";
import { useValePresente } from "@/hooks/useValePresente";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

const valoresSugeridos = [50, 100, 150, 200, 300, 500];

const ValePresente = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { meusVales, isLoading, criarVale, resgatarVale } = useValePresente();

  const [activeTab, setActiveTab] = useState("comprar");
  const [destinatario, setDestinatario] = useState("");
  const [email, setEmail] = useState("");
  const [valor, setValor] = useState<number>(100);
  const [valorCustom, setValorCustom] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [tema, setTema] = useState("classico");
  const [codigoResgate, setCodigoResgate] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [valeCreated, setValeCreated] = useState<any>(null);

  const valorFinal = valorCustom ? parseFloat(valorCustom) : valor;

  const handleComprar = async () => {
    if (!destinatario.trim()) {
      toast.error("Informe o nome do destinatário");
      return;
    }
    if (!valorFinal || valorFinal <= 0) {
      toast.error("Informe um valor válido");
      return;
    }

    const result = await criarVale.mutateAsync({
      destinatario_nome: destinatario,
      destinatario_email: email || undefined,
      valor: valorFinal,
      mensagem: mensagem || undefined,
      tema,
    });

    setValeCreated(result);
  };

  const handleResgatar = async () => {
    if (!codigoResgate.trim()) {
      toast.error("Informe o código do vale presente");
      return;
    }
    await resgatarVale.mutateAsync(codigoResgate);
    setCodigoResgate("");
  };

  const copiarCodigo = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    setCopiedId(codigo);
    toast.success("Código copiado!");
    setTimeout(() => setCopiedId(null), 2000);
  };

  const compartilhar = async (vale: any) => {
    const text = `🎁 Presente Resinkra para você!\n\nVocê recebeu um Vale Presente de R$ ${Number(vale.valor).toFixed(2).replace('.', ',')}!\n\nCódigo: ${vale.codigo}\n\nResgate em: ${window.location.origin}/vale-presente\n\n${vale.mensagem ? `"${vale.mensagem}"` : "Com carinho! 💚"}`;
    
    if (navigator.share) {
      await navigator.share({ title: "Vale Presente Resinkra", text });
    } else {
      navigator.clipboard.writeText(text);
      toast.success("Texto copiado para compartilhar!");
    }
  };

  const resetForm = () => {
    setValeCreated(null);
    setDestinatario("");
    setEmail("");
    setValor(100);
    setValorCustom("");
    setMensagem("");
    setTema("classico");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="gradient-primary shadow-button sticky top-0 z-10"
      >
        <div className="max-w-lg mx-auto px-4 safe-top">
          <div className="flex items-center gap-3 py-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl bg-primary-foreground/10 hover:bg-primary-foreground/20 transition-all active:scale-95"
            >
              <ArrowLeft size={20} className="text-primary-foreground" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-primary-foreground flex items-center gap-2">
                <Gift className="w-5 h-5" /> Vale Presente
              </h1>
              <p className="text-xs text-primary-foreground/70">Presenteie alguém especial</p>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-lg mx-auto px-4 py-6 pb-32 space-y-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="w-full grid grid-cols-3 bg-card shadow-card">
            <TabsTrigger value="comprar" className="text-xs gap-1">
              <Gift size={14} /> Comprar
            </TabsTrigger>
            <TabsTrigger value="resgatar" className="text-xs gap-1">
              <Ticket size={14} /> Resgatar
            </TabsTrigger>
            <TabsTrigger value="meus" className="text-xs gap-1">
              <Send size={14} /> Meus Vales
            </TabsTrigger>
          </TabsList>

          {/* TAB: COMPRAR */}
          <TabsContent value="comprar" className="space-y-5 mt-4">
            <AnimatePresence mode="wait">
              {valeCreated ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-5"
                >
                  {/* Success state */}
                  <div className="text-center space-y-2">
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", delay: 0.2 }}
                      className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto"
                    >
                      <Gift className="w-8 h-8 text-primary" />
                    </motion.div>
                    <h2 className="text-xl font-bold text-foreground">Vale Criado! 🎉</h2>
                    <p className="text-sm text-muted-foreground">
                      Compartilhe o código com {valeCreated.destinatario_nome}
                    </p>
                  </div>

                  <GiftCardVisual
                    tema={valeCreated.tema}
                    valor={Number(valeCreated.valor)}
                    destinatario={valeCreated.destinatario_nome}
                    mensagem={valeCreated.mensagem}
                    codigo={valeCreated.codigo}
                  />

                  <div className="flex gap-2">
                    <Button
                      onClick={() => copiarCodigo(valeCreated.codigo)}
                      variant="outline"
                      className="flex-1 gap-2"
                    >
                      {copiedId === valeCreated.codigo ? <Check size={16} /> : <Copy size={16} />}
                      Copiar Código
                    </Button>
                    <Button
                      onClick={() => compartilhar(valeCreated)}
                      className="flex-1 gap-2 shadow-button"
                    >
                      <Share2 size={16} /> Compartilhar
                    </Button>
                  </div>

                  <Button variant="ghost" onClick={resetForm} className="w-full">
                    Criar outro vale
                  </Button>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="space-y-5"
                >
                  {/* Live preview */}
                  <GiftCardVisual
                    tema={tema}
                    valor={valorFinal || 0}
                    destinatario={destinatario}
                    mensagem={mensagem}
                  />

                  {/* Tema selector */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Estilo do Vale
                    </Label>
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {temaOptions.map((t) => {
                        const TIcon = t.icon;
                        return (
                          <button
                            key={t.value}
                            onClick={() => setTema(t.value)}
                            className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-medium transition-all whitespace-nowrap ${
                              tema === t.value
                                ? "bg-primary text-primary-foreground shadow-button scale-105"
                                : "bg-card text-muted-foreground hover:bg-muted border border-border"
                            }`}
                          >
                            <TIcon size={14} />
                            {t.label}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Valor */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Valor
                    </Label>
                    <div className="grid grid-cols-3 gap-2">
                      {valoresSugeridos.map((v) => (
                        <button
                          key={v}
                          onClick={() => { setValor(v); setValorCustom(""); }}
                          className={`py-2.5 rounded-xl text-sm font-semibold transition-all ${
                            valor === v && !valorCustom
                              ? "bg-primary text-primary-foreground shadow-button"
                              : "bg-card text-foreground border border-border hover:bg-muted"
                          }`}
                        >
                          R$ {v}
                        </button>
                      ))}
                    </div>
                    <Input
                      type="number"
                      placeholder="Ou digite um valor personalizado..."
                      value={valorCustom}
                      onChange={(e) => setValorCustom(e.target.value)}
                      className="mt-2"
                    />
                  </div>

                  {/* Destinatário */}
                  <div className="space-y-3">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Para quem é o presente?
                    </Label>
                    <Input
                      placeholder="Nome do presenteado(a)"
                      value={destinatario}
                      onChange={(e) => setDestinatario(e.target.value)}
                    />
                    <Input
                      type="email"
                      placeholder="E-mail (opcional)"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  {/* Mensagem */}
                  <div className="space-y-2">
                    <Label className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Mensagem personalizada
                    </Label>
                    <Textarea
                      placeholder="Escreva algo especial para quem vai receber... 💚"
                      value={mensagem}
                      onChange={(e) => setMensagem(e.target.value)}
                      rows={3}
                      maxLength={200}
                    />
                    <p className="text-[10px] text-muted-foreground text-right">{mensagem.length}/200</p>
                  </div>

                  {/* CTA */}
                  <Button
                    onClick={handleComprar}
                    disabled={criarVale.isPending || !destinatario || !valorFinal}
                    className="w-full h-12 text-base font-semibold shadow-button gap-2"
                  >
                    <Gift size={18} />
                    {criarVale.isPending ? "Criando..." : `Criar Vale de R$ ${(valorFinal || 0).toFixed(2).replace(".", ",")}`}
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </TabsContent>

          {/* TAB: RESGATAR */}
          <TabsContent value="resgatar" className="mt-4 space-y-5">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center space-y-3"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto">
                <Ticket className="w-8 h-8 text-accent" />
              </div>
              <h2 className="text-lg font-bold text-foreground">Resgatar Vale Presente</h2>
              <p className="text-sm text-muted-foreground">
                Insira o código que você recebeu para ativar seu crédito
              </p>
            </motion.div>

            <Card className="shadow-card">
              <CardContent className="pt-6 space-y-4">
                <Input
                  placeholder="Digite o código do vale"
                  value={codigoResgate}
                  onChange={(e) => setCodigoResgate(e.target.value.toUpperCase())}
                  className="text-center text-lg font-mono tracking-widest uppercase"
                  maxLength={10}
                />
                <Button
                  onClick={handleResgatar}
                  disabled={resgatarVale.isPending || !codigoResgate}
                  className="w-full h-11 shadow-button gap-2"
                >
                  <Ticket size={16} />
                  {resgatarVale.isPending ? "Verificando..." : "Resgatar"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* TAB: MEUS VALES */}
          <TabsContent value="meus" className="mt-4 space-y-4">
            {isLoading ? (
              <div className="space-y-3">
                {[1, 2].map((i) => (
                  <div key={i} className="h-40 rounded-2xl bg-muted animate-pulse" />
                ))}
              </div>
            ) : meusVales.length === 0 ? (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-center py-12 space-y-3"
              >
                <Gift className="w-12 h-12 text-muted-foreground/40 mx-auto" />
                <p className="text-muted-foreground">Você ainda não criou nenhum vale presente</p>
                <Button variant="outline" onClick={() => setActiveTab("comprar")}>
                  Criar primeiro vale
                </Button>
              </motion.div>
            ) : (
              meusVales.map((vale, i) => (
                <motion.div
                  key={vale.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="space-y-2"
                >
                  <GiftCardVisual
                    tema={vale.tema}
                    valor={Number(vale.valor)}
                    destinatario={vale.destinatario_nome}
                    mensagem={vale.mensagem || undefined}
                    codigo={vale.codigo}
                    compact
                  />
                  <div className="flex items-center justify-between px-1">
                    <div className="flex items-center gap-2">
                      <Badge
                        variant={vale.status === "ativo" ? "default" : "secondary"}
                        className="text-[10px]"
                      >
                        {vale.status === "ativo" ? "✨ Ativo" : vale.status === "usado" ? "✅ Usado" : "⏰ Expirado"}
                      </Badge>
                      <span className="text-[10px] text-muted-foreground">
                        {format(new Date(vale.created_at), "dd/MM/yyyy", { locale: ptBR })}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {vale.status === "ativo" && (
                        <>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2"
                            onClick={() => copiarCodigo(vale.codigo)}
                          >
                            {copiedId === vale.codigo ? <Check size={12} /> : <Copy size={12} />}
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2"
                            onClick={() => compartilhar(vale)}
                          >
                            <Share2 size={12} />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ValePresente;
