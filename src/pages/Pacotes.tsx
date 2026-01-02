import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/BottomNavigation";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, Package, Check, Clock, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const pacotesDisponiveis = [
  {
    id: 1,
    nome: "Pacote Relaxante",
    descricao: "4 sessões de massagem relaxante",
    sessoes: 4,
    preco: 500,
    precoOriginal: 600,
    categoria: "massagem",
  },
  {
    id: 2,
    nome: "Pacote Terapêutico",
    descricao: "6 sessões de massagem terapêutica",
    sessoes: 6,
    preco: 900,
    precoOriginal: 1080,
    categoria: "massagem",
  },
  {
    id: 3,
    nome: "Pacote Drenagem",
    descricao: "10 sessões de drenagem linfática",
    sessoes: 10,
    preco: 1400,
    precoOriginal: 1600,
    categoria: "massagem",
  },
  {
    id: 4,
    nome: "Combo Home SPA",
    descricao: "Kit completo + 2 sessões",
    sessoes: 2,
    preco: 350,
    precoOriginal: 450,
    categoria: "spa",
  },
];

const meusPacotes = [
  {
    id: 101,
    nome: "Pacote Relaxante",
    sessoesTotal: 4,
    sessoesUsadas: 1,
    validade: "15/03/2026",
    categoria: "massagem",
  },
  {
    id: 102,
    nome: "Pacote Drenagem",
    sessoesTotal: 10,
    sessoesUsadas: 6,
    validade: "20/02/2026",
    categoria: "massagem",
  },
];

const Pacotes = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"meus" | "loja">("meus");

  const handleComprar = (pacoteId: number) => {
    const pacote = pacotesDisponiveis.find((p) => p.id === pacoteId);
    toast.success("Pacote adicionado!", {
      description: `${pacote?.nome} foi adicionado ao seu carrinho.`,
    });
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-4 safe-top">
        {/* Header */}
        <div className="flex items-center gap-3 py-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Pacotes</h1>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6">
          <Button
            variant={activeTab === "meus" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setActiveTab("meus")}
          >
            Meus Pacotes
          </Button>
          <Button
            variant={activeTab === "loja" ? "default" : "outline"}
            className="flex-1"
            onClick={() => setActiveTab("loja")}
          >
            Comprar Pacotes
          </Button>
        </div>

        {/* Meus Pacotes */}
        {activeTab === "meus" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {meusPacotes.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-6 text-center">
                  <Package className="mx-auto text-muted-foreground mb-3" size={48} />
                  <p className="text-muted-foreground">
                    Você ainda não possui pacotes ativos.
                  </p>
                  <Button
                    variant="link"
                    className="mt-2"
                    onClick={() => setActiveTab("loja")}
                  >
                    Explorar pacotes disponíveis
                  </Button>
                </CardContent>
              </Card>
            ) : (
              meusPacotes.map((pacote) => {
                const sessoesRestantes = pacote.sessoesTotal - pacote.sessoesUsadas;
                const progresso = (pacote.sessoesUsadas / pacote.sessoesTotal) * 100;

                return (
                  <Card key={pacote.id} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-base">{pacote.nome}</CardTitle>
                          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                            <Clock size={12} /> Válido até {pacote.validade}
                          </p>
                        </div>
                        <div className="bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                          {sessoesRestantes} restantes
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="space-y-1">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progresso</span>
                          <span className="text-foreground font-medium">
                            {pacote.sessoesUsadas}/{pacote.sessoesTotal} sessões
                          </span>
                        </div>
                        <Progress value={progresso} className="h-2" />
                      </div>
                      <Button
                        className="w-full"
                        onClick={() => navigate("/agendamento")}
                      >
                        Agendar Sessão
                      </Button>
                    </CardContent>
                  </Card>
                );
              })
            )}
          </motion.div>
        )}

        {/* Loja de Pacotes */}
        {activeTab === "loja" && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-4"
          >
            {pacotesDisponiveis.map((pacote) => {
              const desconto = Math.round(
                ((pacote.precoOriginal - pacote.preco) / pacote.precoOriginal) * 100
              );

              return (
                <Card
                  key={pacote.id}
                  className="overflow-hidden hover:border-primary/50 transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-semibold text-foreground">
                            {pacote.nome}
                          </h3>
                          <span className="bg-accent text-accent-foreground text-xs px-2 py-0.5 rounded-full">
                            -{desconto}%
                          </span>
                        </div>
                        <p className="text-sm text-muted-foreground mt-1">
                          {pacote.descricao}
                        </p>
                      </div>
                      <Sparkles className="text-primary" size={20} />
                    </div>

                    <div className="flex items-end justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground line-through">
                          R$ {pacote.precoOriginal.toFixed(2).replace(".", ",")}
                        </p>
                        <p className="text-xl font-bold text-primary">
                          R$ {pacote.preco.toFixed(2).replace(".", ",")}
                        </p>
                      </div>
                      <Button onClick={() => handleComprar(pacote.id)}>
                        Comprar
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}

            <Card className="bg-primary/5 border-primary/20">
              <CardContent className="p-4 flex items-center gap-3">
                <Check className="text-primary" size={20} />
                <p className="text-sm text-foreground">
                  Pacotes geram <strong>cashback extra</strong> de até 10%!
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Pacotes;
