import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, Plus, BarChart3, Ticket, Gift, TrendingUp,
  Users, DollarSign, Eye, EyeOff, Trash2, Copy, ExternalLink,
  Medal, Award, Trophy, Crown, Sparkles, Target, Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";
import { useParceiro } from "@/hooks/useParceiro";
import { useAdmin } from "@/features/admin/hooks/useAdmin";
import { PageLoading } from "@/components/LoadingSpinner";
import { toast } from "sonner";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";

const tierIcons: Record<string, any> = { bronze: Medal, prata: Award, ouro: Trophy, diamante: Crown };

const ParceiroDashboard = () => {
  const navigate = useNavigate();
  const { isAdmin } = useAdmin();
  const {
    parceiro, isParceiro, loadingParceiro,
    cupons, comissoes, faixas, faixaAtual, proximaFaixa,
    criarCupom, toggleCupom, deletarCupom,
    stats,
  } = useParceiro();

  // Admin: fetch all partners to allow viewing any partner's dashboard
  const [adminParceiroId, setAdminParceiroId] = useState<string | null>(null);
  const { data: allParceiros = [] } = useQuery({
    queryKey: ["admin-all-parceiros"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parceiros")
        .select("id, nome_empresa, slug, faixa_comissao_atual, ativo")
        .order("nome_empresa");
      if (error) throw error;
      return data;
    },
    enabled: isAdmin && !isParceiro,
  });

  // Admin viewing a specific partner
  const { data: adminParceiro } = useQuery({
    queryKey: ["admin-parceiro-detail", adminParceiroId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parceiros")
        .select("*")
        .eq("id", adminParceiroId!)
        .single();
      if (error) throw error;
      return data;
    },
    enabled: !!adminParceiroId,
  });
  const { data: adminCupons = [] } = useQuery({
    queryKey: ["admin-parceiro-cupons", adminParceiroId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parceiro_cupons")
        .select("*")
        .eq("parceiro_id", adminParceiroId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!adminParceiroId,
  });
  const { data: adminCupomUsos = [] } = useQuery({
    queryKey: ["admin-parceiro-usos", adminParceiroId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parceiro_cupom_usos")
        .select("*")
        .eq("parceiro_id", adminParceiroId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!adminParceiroId,
  });
  const { data: adminComissoes = [] } = useQuery({
    queryKey: ["admin-parceiro-comissoes", adminParceiroId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("parceiro_comissoes")
        .select("*")
        .eq("parceiro_id", adminParceiroId!)
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
    enabled: !!adminParceiroId,
  });

  // Resolve which data to show: own partner data or admin-selected partner
  const viewParceiro = isParceiro ? parceiro : adminParceiro;
  const viewCupons = isParceiro ? cupons : adminCupons;
  const viewComissoes = isParceiro ? comissoes : adminComissoes;
  const viewCupomUsos = isParceiro ? [] : adminCupomUsos;

  const viewStats = isParceiro ? stats : {
    totalVendas: viewCupomUsos.reduce((acc: number, u: any) => acc + Number(u.valor_compra), 0),
    totalComissoes: adminComissoes.reduce((acc: number, c: any) => acc + Number(c.valor_comissao), 0),
    comissoesPendentes: adminComissoes.filter((c: any) => c.status === "pendente").reduce((acc: number, c: any) => acc + Number(c.valor_comissao), 0),
    totalClientes: new Set(viewCupomUsos.map((u: any) => u.user_id)).size,
    totalCupons: adminCupons.length,
    cuponsAtivos: adminCupons.filter((c: any) => c.ativo).length,
  };

  const viewFaixaAtual = faixas.find((f) => f.nome === viewParceiro?.faixa_comissao_atual);
  const viewProximaFaixa = faixas.find((f) => f.ordem === (viewFaixaAtual?.ordem || 0) + 1);

  const [tab, setTab] = useState("visao-geral");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [novoCupom, setNovoCupom] = useState({
    codigo: "", descricao: "", tipo_desconto: "percentual",
    valor_desconto: "10", valor_minimo_compra: "", max_usos: "", valido_ate: "",
  });

  if (loadingParceiro) return <PageLoading text="Carregando painel..." />;

  if (!isParceiro && !isAdmin) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center max-w-sm">
          <div className="w-16 h-16 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto mb-4">
            <Sparkles className="w-8 h-8 text-accent" />
          </div>
          <h1 className="text-xl font-bold text-foreground mb-2">Área de Parceiros</h1>
          <p className="text-muted-foreground mb-4">Você ainda não é um parceiro. Entre em contato para se tornar um!</p>
          <Button onClick={() => navigate("/")}>Voltar ao início</Button>
        </motion.div>
      </div>
    );
  }

  // Admin who is not a partner: show partner selector
  if (isAdmin && !isParceiro && !adminParceiroId) {
    return (
      <div className="min-h-screen bg-background">
        <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-gradient-to-r from-accent/90 to-primary/90 shadow-lg sticky top-0 z-10">
          <div className="max-w-4xl mx-auto px-4 safe-top">
            <div className="flex items-center gap-3 py-4">
              <button onClick={() => navigate(-1)} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
                <ArrowLeft size={20} className="text-white" />
              </button>
              <div className="flex-1">
                <h1 className="text-lg font-bold text-white">Painel do Parceiro</h1>
                <p className="text-xs text-white/70">Visão Administrativa</p>
              </div>
            </div>
          </div>
        </motion.div>
        <div className="max-w-4xl mx-auto px-4 py-6 space-y-3">
          <p className="text-sm text-muted-foreground">Selecione um parceiro para visualizar o painel:</p>
          {allParceiros.length === 0 ? (
            <p className="text-sm text-muted-foreground">Nenhum parceiro cadastrado.</p>
          ) : (
            allParceiros.map((p: any) => (
              <Card key={p.id} className="border-border/50 cursor-pointer hover:border-accent/50 transition-colors" onClick={() => setAdminParceiroId(p.id)}>
                <CardContent className="p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-accent/20 flex items-center justify-center">
                      <Sparkles className="w-5 h-5 text-accent" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{p.nome_empresa}</p>
                      <p className="text-xs text-muted-foreground capitalize">{p.faixa_comissao_atual}</p>
                    </div>
                  </div>
                  <Badge variant={p.ativo ? "default" : "secondary"} className="text-[10px]">
                    {p.ativo ? "Ativo" : "Inativo"}
                  </Badge>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    );
  }

  if (isAdmin && !isParceiro && adminParceiroId && !adminParceiro) {
    return <PageLoading text="Carregando parceiro..." />;
  }

  const TierIcon = tierIcons[viewParceiro?.faixa_comissao_atual || "bronze"] || Medal;

  const handleCriarCupom = async () => {
    if (!novoCupom.codigo) return toast.error("Informe o código do cupom");
    await criarCupom.mutateAsync({
      codigo: novoCupom.codigo,
      descricao: novoCupom.descricao || undefined,
      tipo_desconto: novoCupom.tipo_desconto,
      valor_desconto: parseFloat(novoCupom.valor_desconto),
      valor_minimo_compra: novoCupom.valor_minimo_compra ? parseFloat(novoCupom.valor_minimo_compra) : undefined,
      max_usos: novoCupom.max_usos ? parseInt(novoCupom.max_usos) : undefined,
      valido_ate: novoCupom.valido_ate || undefined,
    });
    setDialogOpen(false);
    setNovoCupom({ codigo: "", descricao: "", tipo_desconto: "percentual", valor_desconto: "10", valor_minimo_compra: "", max_usos: "", valido_ate: "" });
  };

  const copiarCodigo = (codigo: string) => {
    navigator.clipboard.writeText(codigo);
    toast.success("Código copiado!");
  };

  const progressoFaixa = viewProximaFaixa
    ? Math.min(100, (viewStats.totalVendas / Number(viewProximaFaixa.meta_vendas_minima)) * 100)
    : 100;

  const isAdminViewing = isAdmin && !isParceiro && !!adminParceiroId;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <motion.div initial={{ y: -20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-gradient-to-r from-accent/90 to-primary/90 shadow-lg sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 safe-top">
          <div className="flex items-center gap-3 py-4">
            <button onClick={() => isAdminViewing ? setAdminParceiroId(null) : navigate(-1)} className="p-2 rounded-xl bg-white/10 hover:bg-white/20 transition-all">
              <ArrowLeft size={20} className="text-white" />
            </button>
            <div className="flex-1">
              <h1 className="text-lg font-bold text-white">Painel do Parceiro</h1>
              <p className="text-xs text-white/70">{viewParceiro?.nome_empresa}{isAdminViewing ? " (Admin)" : ""}</p>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-white/15 backdrop-blur-sm">
              <TierIcon className="w-4 h-4 text-white" />
              <span className="text-xs font-semibold text-white capitalize">{viewParceiro?.faixa_comissao_atual}</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {[
            { label: "Vendas Geradas", value: `R$ ${viewStats.totalVendas.toFixed(2).replace(".", ",")}`, icon: TrendingUp, color: "text-emerald-500" },
            { label: "Comissões", value: `R$ ${viewStats.totalComissoes.toFixed(2).replace(".", ",")}`, icon: DollarSign, color: "text-amber-500" },
            { label: "Clientes", value: viewStats.totalClientes.toString(), icon: Users, color: "text-blue-500" },
            { label: "Cupons Ativos", value: `${viewStats.cuponsAtivos}/${viewStats.totalCupons}`, icon: Ticket, color: "text-purple-500" },
          ].map((s, i) => (
            <motion.div key={s.label} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
              <Card className="border-border/50">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-1">
                    <s.icon className={`w-4 h-4 ${s.color}`} />
                    <span className="text-[10px] text-muted-foreground uppercase tracking-wider">{s.label}</span>
                  </div>
                  <p className="text-lg font-bold text-foreground">{s.value}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Commission Tier Progress */}
        <Card className="border-border/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <TierIcon className="w-5 h-5" style={{ color: viewFaixaAtual?.cor || "#CD7F32" }} />
                <div>
                  <p className="text-sm font-semibold capitalize">{viewFaixaAtual?.nome} — {viewFaixaAtual?.percentual_comissao}% comissão</p>
                  {viewProximaFaixa && (
                    <p className="text-xs text-muted-foreground">
                      Faltam R$ {(Number(viewProximaFaixa.meta_vendas_minima) - viewStats.totalVendas).toFixed(2).replace(".", ",")} para {viewProximaFaixa.nome}
                    </p>
                  )}
                </div>
              </div>
              {viewProximaFaixa && <Target className="w-4 h-4 text-muted-foreground" />}
            </div>
            <Progress value={progressoFaixa} className="h-2" />
            <div className="flex justify-between mt-2">
              {faixas.map((f) => {
                const FIcon = tierIcons[f.nome] || Medal;
                return (
                  <div key={f.id} className="flex flex-col items-center">
                    <FIcon className="w-3.5 h-3.5" style={{ color: f.cor }} />
                    <span className="text-[9px] text-muted-foreground capitalize">{f.nome}</span>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Tabs */}
        <Tabs value={tab} onValueChange={setTab}>
          <TabsList className="grid grid-cols-3 w-full">
            <TabsTrigger value="visao-geral" className="text-xs gap-1"><BarChart3 className="w-3.5 h-3.5" />Visão Geral</TabsTrigger>
            <TabsTrigger value="cupons" className="text-xs gap-1"><Ticket className="w-3.5 h-3.5" />Cupons</TabsTrigger>
            <TabsTrigger value="comissoes" className="text-xs gap-1"><DollarSign className="w-3.5 h-3.5" />Comissões</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="visao-geral" className="space-y-4 mt-4">
            {/* Partner profile card */}
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Seu Perfil Público</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
                    <Sparkles className="w-6 h-6 text-accent" />
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{viewParceiro?.nome_empresa}</p>
                    <p className="text-xs text-muted-foreground capitalize">{viewParceiro?.segmento}</p>
                  </div>
                  {viewParceiro?.verificado && <Badge variant="secondary" className="text-[10px]">✓ Verificado</Badge>}
                </div>
                {viewParceiro?.descricao && <p className="text-xs text-muted-foreground">{viewParceiro.descricao}</p>}
                <div className="flex gap-2">
                  <Button size="sm" variant="outline" className="text-xs gap-1" onClick={() => {
                    const url = `${window.location.origin}/parceiro/${viewParceiro?.slug}`;
                    navigator.clipboard.writeText(url);
                    toast.success("Link copiado!");
                  }}>
                    <Share2 className="w-3 h-3" /> Compartilhar
                  </Button>
                  <Button size="sm" variant="outline" className="text-xs gap-1" onClick={() => navigate(`/parceiro/${viewParceiro?.slug}`)}>
                    <ExternalLink className="w-3 h-3" /> Ver Perfil
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Benefits card */}
            <Card className="border-border/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm">Benefícios da Faixa {viewFaixaAtual?.nome}</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1.5">
                  {(viewFaixaAtual?.beneficios as string[] || []).map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      {b}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* Pending commissions */}
            {viewStats.comissoesPendentes > 0 && (
              <Card className="border-amber-200 dark:border-amber-800 bg-amber-50/50 dark:bg-amber-950/20">
                <CardContent className="p-4 flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-amber-600" />
                  <div>
                    <p className="text-sm font-semibold text-foreground">Comissões Pendentes</p>
                    <p className="text-xs text-muted-foreground">
                      R$ {viewStats.comissoesPendentes.toFixed(2).replace(".", ",")} aguardando pagamento
                    </p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Coupons Tab */}
          <TabsContent value="cupons" className="space-y-4 mt-4">
            <div className="flex justify-between items-center">
              <p className="text-sm text-muted-foreground">{viewCupons.length} cupons criados</p>
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                  <Button size="sm" className="gap-1"><Plus className="w-4 h-4" />Novo Cupom</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Criar Cupom de Desconto</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-3">
                    <div>
                      <Label className="text-xs">Código do Cupom</Label>
                      <Input value={novoCupom.codigo} onChange={(e) => setNovoCupom(p => ({ ...p, codigo: e.target.value.toUpperCase() }))} placeholder="EX: PARCEIRO20" className="font-mono" />
                    </div>
                    <div>
                      <Label className="text-xs">Descrição (opcional)</Label>
                      <Textarea value={novoCupom.descricao} onChange={(e) => setNovoCupom(p => ({ ...p, descricao: e.target.value }))} placeholder="Desconto exclusivo..." rows={2} />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Tipo</Label>
                        <Select value={novoCupom.tipo_desconto} onValueChange={(v) => setNovoCupom(p => ({ ...p, tipo_desconto: v }))}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="percentual">Percentual (%)</SelectItem>
                            <SelectItem value="valor_fixo">Valor Fixo (R$)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label className="text-xs">Valor {novoCupom.tipo_desconto === "percentual" ? "(máx. 30%)" : ""}</Label>
                        <Input
                          type="number"
                          value={novoCupom.valor_desconto}
                          max={novoCupom.tipo_desconto === "percentual" ? 30 : undefined}
                          onChange={(e) => {
                            let val = e.target.value;
                            if (novoCupom.tipo_desconto === "percentual" && Number(val) > 30) val = "30";
                            setNovoCupom(p => ({ ...p, valor_desconto: val }));
                          }}
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs">Máx. Usos (vazio = ilimitado)</Label>
                        <Input type="number" value={novoCupom.max_usos} onChange={(e) => setNovoCupom(p => ({ ...p, max_usos: e.target.value }))} />
                      </div>
                      <div>
                        <Label className="text-xs">Válido até</Label>
                        <Input type="date" value={novoCupom.valido_ate} onChange={(e) => setNovoCupom(p => ({ ...p, valido_ate: e.target.value }))} />
                      </div>
                    </div>
                    <p className="text-[10px] text-muted-foreground">⚠️ Cupons de parceiro não são válidos para planos e pacotes.</p>
                    <Button onClick={handleCriarCupom} disabled={criarCupom.isPending} className="w-full">
                      {criarCupom.isPending ? "Criando..." : "Criar Cupom"}
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </div>

            {viewCupons.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center">
                  <Ticket className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Nenhum cupom criado ainda</p>
                  <p className="text-xs text-muted-foreground/70">Crie cupons para compartilhar com seus seguidores!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {viewCupons.map((c: any) => (
                  <Card key={c.id} className={`border-border/50 ${!c.ativo ? "opacity-50" : ""}`}>
                    <CardContent className="p-3">
                      <div className="flex items-center justify-between mb-1">
                        <div className="flex items-center gap-2">
                          <code className="text-sm font-bold font-mono text-accent">{c.codigo}</code>
                          <Badge variant={c.ativo ? "default" : "secondary"} className="text-[9px]">
                            {c.ativo ? "Ativo" : "Inativo"}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => copiarCodigo(c.codigo)}>
                            <Copy className="w-3 h-3" />
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7" onClick={() => toggleCupom.mutate({ id: c.id, ativo: c.ativo })}>
                            {c.ativo ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
                          </Button>
                          <Button size="icon" variant="ghost" className="h-7 w-7 text-destructive" onClick={() => { if (confirm("Excluir cupom?")) deletarCupom.mutate(c.id); }}>
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 text-xs text-muted-foreground">
                        <span>{c.tipo_desconto === "percentual" ? `${c.valor_desconto}%` : `R$ ${Number(c.valor_desconto).toFixed(2)}`} off</span>
                        <span>•</span>
                        <span>{c.usos_atuais}{c.max_usos ? `/${c.max_usos}` : ""} usos</span>
                        {c.valido_ate && (
                          <>
                            <span>•</span>
                            <span>até {format(new Date(c.valido_ate), "dd/MM/yyyy")}</span>
                          </>
                        )}
                      </div>
                      {c.descricao && <p className="text-xs text-muted-foreground/70 mt-1">{c.descricao}</p>}
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* Commissions Tab */}
          <TabsContent value="comissoes" className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-3">
              <Card className="border-border/50">
                <CardContent className="p-3 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase">Total Ganho</p>
                  <p className="text-lg font-bold text-emerald-600">R$ {viewStats.totalComissoes.toFixed(2).replace(".", ",")}</p>
                </CardContent>
              </Card>
              <Card className="border-border/50">
                <CardContent className="p-3 text-center">
                  <p className="text-[10px] text-muted-foreground uppercase">Pendente</p>
                  <p className="text-lg font-bold text-amber-600">R$ {viewStats.comissoesPendentes.toFixed(2).replace(".", ",")}</p>
                </CardContent>
              </Card>
            </div>

            {viewComissoes.length === 0 ? (
              <Card className="border-dashed">
                <CardContent className="p-8 text-center">
                  <DollarSign className="w-10 h-10 text-muted-foreground/30 mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">Nenhuma comissão ainda</p>
                  <p className="text-xs text-muted-foreground/70">Compartilhe seus cupons para começar a ganhar!</p>
                </CardContent>
              </Card>
            ) : (
              <div className="space-y-2">
                {viewComissoes.map((c: any) => (
                  <Card key={c.id} className="border-border/50">
                    <CardContent className="p-3 flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          R$ {Number(c.valor_comissao).toFixed(2).replace(".", ",")}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {c.percentual_comissao}% de R$ {Number(c.valor_venda).toFixed(2).replace(".", ",")}
                        </p>
                        <p className="text-[10px] text-muted-foreground/60">
                          {format(new Date(c.created_at), "dd/MM/yyyy", { locale: ptBR })}
                        </p>
                      </div>
                      <Badge variant={c.status === "pago" ? "default" : c.status === "aprovado" ? "secondary" : "outline"} className="text-[10px] capitalize">
                        {c.status}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default ParceiroDashboard;
