import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Send, User, CheckCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BottomNavigation } from "@/components/BottomNavigation";
import { useAuth } from "@/contexts/AuthContext";
import { useTransacoes } from "@/hooks/useTransacoes";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ButtonLoader } from "@/components/LoadingSpinner";
import simboloVerde from "@/assets/simbolo-verde.png";

const Transferir = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { stats, refetch } = useTransacoes();
  const saldo = stats.saldo;
  
  const [email, setEmail] = useState("");
  const [valor, setValor] = useState("");
  const [destinatario, setDestinatario] = useState<{ id: string; nome: string; email: string } | null>(null);
  const [buscando, setBuscando] = useState(false);
  const [transferindo, setTransferindo] = useState(false);
  const [sucesso, setSucesso] = useState(false);

  const buscarUsuario = async () => {
    if (!email.trim()) {
      toast.error("Digite o email do destinatário");
      return;
    }

    if (email.toLowerCase() === user?.email?.toLowerCase()) {
      toast.error("Você não pode transferir para si mesmo");
      return;
    }

    setBuscando(true);
    setDestinatario(null);

    try {
      // Buscar usuário pelo email usando edge function
      const { data, error } = await supabase.functions.invoke("buscar-usuario", {
        body: { email: email.toLowerCase() }
      });

      if (error || !data?.user) {
        toast.error("Usuário não encontrado");
        setBuscando(false);
        return;
      }

      setDestinatario({ 
        id: data.user.id, 
        nome: data.user.nome || "Usuário", 
        email: email.toLowerCase() 
      });
    } catch (err) {
      toast.error("Usuário não encontrado");
    }

    setBuscando(false);
  };

  const realizarTransferencia = async () => {
    if (!destinatario) {
      toast.error("Selecione um destinatário");
      return;
    }

    const valorNumerico = parseFloat(valor.replace(",", "."));
    
    if (isNaN(valorNumerico) || valorNumerico <= 0) {
      toast.error("Digite um valor válido");
      return;
    }

    if (valorNumerico > saldo) {
      toast.error("Saldo insuficiente");
      return;
    }

    setTransferindo(true);

    try {
      // Usar edge function para realizar a transferência de forma segura
      const { error } = await supabase.functions.invoke("transferir-creditos", {
        body: {
          destinatarioId: destinatario.id,
          valor: valorNumerico,
          destinatarioNome: destinatario.nome
        }
      });

      if (error) throw error;

      setSucesso(true);
      refetch();
      
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      toast.error("Erro ao realizar transferência");
    }

    setTransferindo(false);
  };

  if (sucesso) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mx-auto mb-4"
          >
            <img src={simboloVerde} alt="" className="w-12 h-12 object-contain" />
          </motion.div>
          <h2 className="text-xl font-bold text-foreground mb-2">Transferência realizada!</h2>
          <p className="text-muted-foreground">
            R$ {parseFloat(valor.replace(",", ".")).toFixed(2).replace(".", ",")} enviado para {destinatario?.nome}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <div className="bg-card shadow-card">
        <div className="max-w-lg mx-auto px-4 safe-top">
          <div className="flex items-center gap-3 py-4">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-xl hover:bg-secondary transition-colors"
            >
              <ArrowLeft size={20} className="text-foreground" />
            </button>
            <h1 className="text-lg font-bold text-foreground">Transferir Créditos</h1>
          </div>
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Saldo disponível */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-2xl bg-card shadow-card"
        >
          <p className="text-sm text-muted-foreground">Saldo disponível</p>
          <p className="text-2xl font-bold text-primary">
            R$ {saldo.toFixed(2).replace(".", ",")}
          </p>
        </motion.div>

        {/* Buscar destinatário */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-3"
        >
          <Label htmlFor="email">Email do destinatário</Label>
          <div className="flex gap-2">
            <Input
              id="email"
              type="email"
              placeholder="email@exemplo.com"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setDestinatario(null);
              }}
              className="flex-1"
            />
            <Button
              variant="secondary"
              onClick={buscarUsuario}
              disabled={buscando}
            >
              {buscando ? <ButtonLoader /> : "Buscar"}
            </Button>
          </div>
        </motion.div>

        {/* Destinatário encontrado */}
        {destinatario && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-2xl bg-primary/10 border border-primary/20"
          >
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                <User className="w-6 h-6 text-primary" />
              </div>
              <div>
                <p className="font-semibold text-foreground">{destinatario.nome}</p>
                <p className="text-sm text-muted-foreground">{destinatario.email}</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Valor */}
        {destinatario && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-3"
          >
            <Label htmlFor="valor">Valor da transferência</Label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground font-semibold">
                R$
              </span>
              <Input
                id="valor"
                type="text"
                inputMode="decimal"
                placeholder="0,00"
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                className="pl-12 text-xl font-bold"
              />
            </div>
          </motion.div>
        )}

        {/* Botão de transferir */}
        {destinatario && valor && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Button
              className="w-full gap-2"
              size="lg"
              onClick={realizarTransferencia}
              disabled={transferindo}
            >
              {transferindo ? (
                <ButtonLoader />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Transferir
                </>
              )}
            </Button>
          </motion.div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Transferir;
