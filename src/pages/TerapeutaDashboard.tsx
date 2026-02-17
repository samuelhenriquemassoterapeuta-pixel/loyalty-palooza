import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppLayout } from "@/components/AppLayout";
import { useTerapeuta } from "@/hooks/useTerapeuta";
import { useAdmin } from "@/hooks/useAdmin";
import { PageLoading } from "@/components/LoadingSpinner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ArrowLeft, Ticket, GraduationCap, Plus, Trash2, ToggleLeft, ToggleRight, Stethoscope, BookOpen } from "lucide-react";
import { toast } from "sonner";

const TerapeutaDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const {
    terapeuta, isTerapeuta, loadingTerapeuta,
    cupons, loadingCupons,
    criarCupom, toggleCupom, deletarCupom,
  } = useTerapeuta();

  const [novoCupom, setNovoCupom] = useState({
    codigo: "",
    descricao: "",
    tipo_desconto: "percentual",
    valor_desconto: 0,
    max_usos: 0,
    valido_ate: "",
  });
  const [dialogOpen, setDialogOpen] = useState(false);

  if (loadingTerapeuta) return <AppLayout><PageLoading /></AppLayout>;

  if (!isTerapeuta && !isAdmin) {
    return (
      <AppLayout>
        <div className="p-6 text-center space-y-4">
          <Stethoscope className="mx-auto h-16 w-16 text-muted-foreground" />
          <h2 className="text-xl font-bold text-foreground">Área exclusiva para terapeutas</h2>
          <p className="text-muted-foreground text-sm">
            Você precisa ser um terapeuta cadastrado para acessar esta área.
          </p>
          <Button variant="outline" onClick={() => navigate("/")}>
            <ArrowLeft className="mr-2 h-4 w-4" /> Voltar
          </Button>
        </div>
      </AppLayout>
    );
  }

  const handleCriarCupom = () => {
    if (!novoCupom.codigo.trim()) {
      toast.error("Informe o código do cupom");
      return;
    }
    if (novoCupom.valor_desconto <= 0) {
      toast.error("Informe o valor do desconto");
      return;
    }
    criarCupom.mutate({
      codigo: novoCupom.codigo,
      descricao: novoCupom.descricao,
      tipo_desconto: novoCupom.tipo_desconto,
      valor_desconto: novoCupom.valor_desconto,
      max_usos: novoCupom.max_usos || undefined,
      valido_ate: novoCupom.valido_ate || undefined,
    }, {
      onSuccess: () => {
        setNovoCupom({ codigo: "", descricao: "", tipo_desconto: "percentual", valor_desconto: 0, max_usos: 0, valido_ate: "" });
        setDialogOpen(false);
      }
    });
  };

  return (
    <AppLayout>
      <div className="p-4 md:p-6 space-y-6 max-w-4xl mx-auto pb-32">
        {/* Header */}
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
              <Stethoscope className="h-6 w-6 text-primary" />
              Painel do Terapeuta
            </h1>
            <p className="text-sm text-muted-foreground">{terapeuta?.nome} — {terapeuta?.especialidade}</p>
          </div>
        </div>

        <Tabs defaultValue="cupons" className="w-full">
          <TabsList className="w-full grid grid-cols-2">
            <TabsTrigger value="cupons" className="gap-2"><Ticket className="h-4 w-4" /> Cupons</TabsTrigger>
            <TabsTrigger value="cursos" className="gap-2"><GraduationCap className="h-4 w-4" /> Cursos</TabsTrigger>
          </TabsList>

          {/* CUPONS TAB */}
          <TabsContent value="cupons" className="space-y-4 mt-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-foreground">Meus Cupons de Desconto</h2>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-2">
                    <Plus className="h-4 w-4" /> Novo Cupom
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Criar Cupom de Desconto</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label>Código</Label>
                      <Input
                        placeholder="Ex: TERA20"
                        value={novoCupom.codigo}
                        onChange={(e) => setNovoCupom(p => ({ ...p, codigo: e.target.value.toUpperCase() }))}
                      />
                    </div>
                    <div>
                      <Label>Descrição (opcional)</Label>
                      <Input
                        placeholder="Desconto para clientes..."
                        value={novoCupom.descricao}
                        onChange={(e) => setNovoCupom(p => ({ ...p, descricao: e.target.value }))}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Tipo</Label>
                        <Select value={novoCupom.tipo_desconto} onValueChange={(v) => setNovoCupom(p => ({ ...p, tipo_desconto: v }))}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentual">Percentual (%)</SelectItem>
                            <SelectItem value="valor_fixo">Valor fixo (R$)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>Valor</Label>
                        <Input
                          type="number"
                          placeholder={novoCupom.tipo_desconto === "percentual" ? "Máx 20%" : "Máx R$30"}
                          value={novoCupom.valor_desconto || ""}
                          onChange={(e) => setNovoCupom(p => ({ ...p, valor_desconto: Number(e.target.value) }))}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Máx. usos (0 = ilimitado)</Label>
                        <Input
                          type="number"
                          value={novoCupom.max_usos || ""}
                          onChange={(e) => setNovoCupom(p => ({ ...p, max_usos: Number(e.target.value) }))}
                        />
                      </div>
                      <div>
                        <Label>Validade</Label>
                        <Input
                          type="date"
                          value={novoCupom.valido_ate}
                          onChange={(e) => setNovoCupom(p => ({ ...p, valido_ate: e.target.value }))}
                        />
                      </div>
                    </div>
                    <Button onClick={handleCriarCupom} className="w-full" disabled={criarCupom.isPending}>
                      {criarCupom.isPending ? "Criando..." : "Criar Cupom"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {loadingCupons ? (
              <PageLoading />
            ) : cupons.length === 0 ? (
              <Card>
                <CardContent className="py-8 text-center text-muted-foreground">
                  <Ticket className="mx-auto h-12 w-12 mb-3 opacity-40" />
                  <p>Nenhum cupom criado ainda.</p>
                  <p className="text-xs mt-1">Crie cupons para oferecer descontos aos seus clientes.</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-3">
                {cupons.map((cupom: any) => (
                  <Card key={cupom.id}>
                    <CardContent className="py-4 flex items-center justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <code className="text-sm font-bold text-primary">{cupom.codigo}</code>
                          <Badge variant={cupom.ativo ? "default" : "secondary"} className="text-[10px]">
                            {cupom.ativo ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground truncate">
                          {cupom.tipo_desconto === "percentual"
                            ? `${cupom.valor_desconto}% de desconto`
                            : `R$ ${Number(cupom.valor_desconto).toFixed(2)} de desconto`}
                          {cupom.usos_atuais > 0 && ` • ${cupom.usos_atuais} uso(s)`}
                        </p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => toggleCupom.mutate({ id: cupom.id, ativo: cupom.ativo })}
                        >
                          {cupom.ativo ? <ToggleRight className="h-5 w-5 text-primary" /> : <ToggleLeft className="h-5 w-5 text-muted-foreground" />}
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            if (confirm("Excluir este cupom?")) deletarCupom.mutate(cupom.id);
                          }}
                        >
                          <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            <Card className="border-dashed border-primary/30 bg-primary/5">
              <CardContent className="py-4 text-xs text-muted-foreground space-y-1">
                <p className="font-semibold text-foreground">Regras dos cupons de terapeuta:</p>
                <p>• Desconto percentual: máximo 20%</p>
                <p>• Desconto fixo: máximo R$ 30,00</p>
                <p>• Cupons são válidos para serviços do seu atendimento</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* CURSOS TAB */}
          <TabsContent value="cursos" className="space-y-4 mt-4">
            <h2 className="text-lg font-semibold text-foreground">Cursos Disponíveis</h2>
            <p className="text-sm text-muted-foreground">
              Acesse os cursos da plataforma para aprimorar suas técnicas e conhecimentos.
            </p>

            <div className="grid gap-3">
              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/cursos")}>
                <CardContent className="py-5 flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-primary/10">
                    <GraduationCap className="h-6 w-6 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Hub de Cursos</h3>
                    <p className="text-xs text-muted-foreground">Acesse todos os cursos disponíveis na plataforma</p>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-muted-foreground rotate-180" />
                </CardContent>
              </Card>

              <Card className="cursor-pointer hover:shadow-md transition-shadow" onClick={() => navigate("/manual")}>
                <CardContent className="py-5 flex items-center gap-4">
                  <div className="p-3 rounded-xl bg-secondary/10">
                    <BookOpen className="h-6 w-6 text-secondary-foreground" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground">Manual do Terapeuta</h3>
                    <p className="text-xs text-muted-foreground">Guia completo de uso da plataforma</p>
                  </div>
                  <ArrowLeft className="h-4 w-4 text-muted-foreground rotate-180" />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppLayout>
  );
};

export default TerapeutaDashboard;
