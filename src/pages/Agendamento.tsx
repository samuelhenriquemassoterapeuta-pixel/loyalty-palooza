import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { AppLayout } from "@/components/AppLayout";
import { ArrowLeft, Clock, Check, CalendarDays, X, User, Star, RefreshCw } from "lucide-react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { useAgendamentos } from "@/hooks/useAgendamentos";
import { useServicos, Servico } from "@/hooks/useServicos";
import { useTerapeutas, Terapeuta } from "@/hooks/useTerapeutas";
import { TerapeutaSelector } from "@/components/agendamento/TerapeutaSelector";
import { AvaliacaoDialog } from "@/components/agendamento/AvaliacaoDialog";
import { ReagendarDialog } from "@/components/agendamento/ReagendarDialog";
import { PriorityBanner } from "@/components/agendamento/PriorityBanner";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServicosListSkeleton, AgendamentosListSkeleton } from "@/components/skeletons";
import { LoadingSpinner, ButtonLoader } from "@/components/LoadingSpinner";
import { useAvaliacoes } from "@/hooks/useAvaliacoes";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const horarios = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.06, delayChildren: 0.05 },
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

const Agendamento = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { agendamentos, loading, createAgendamento, cancelAgendamento, reagendarAgendamento, getProximosAgendamentos, getHorariosOcupados } = useAgendamentos();
  const { servicos, loading: loadingServicos } = useServicos();
  const { terapeutas, loading: loadingTerapeutas } = useTerapeutas();
  const { createAvaliacao, getAvaliacaoByAgendamento } = useAvaliacoes();
  
  const [activeTab, setActiveTab] = useState("novo");
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
  const [selectedServico, setSelectedServico] = useState<Servico | null>(null);
  const [selectedTerapeuta, setSelectedTerapeuta] = useState<Terapeuta | null>(null);
  const [saving, setSaving] = useState(false);
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false);
  const [agendamentoToCancel, setAgendamentoToCancel] = useState<string | null>(null);
  const [horariosOcupados, setHorariosOcupados] = useState<string[]>([]);
  const [loadingHorarios, setLoadingHorarios] = useState(false);
  const [avaliacaoDialogOpen, setAvaliacaoDialogOpen] = useState(false);
  const [agendamentoToRate, setAgendamentoToRate] = useState<{
    id: string;
    servico: string;
    terapeutaNome?: string;
  } | null>(null);
  const [reagendarDialogOpen, setReagendarDialogOpen] = useState(false);
  const [agendamentoToReagendar, setAgendamentoToReagendar] = useState<{
    id: string;
    servico: string;
    terapeutaId?: string;
    terapeutaNome?: string;
  } | null>(null);

  // Pre-select service from URL query param
  useEffect(() => {
    const servicoParam = searchParams.get("servico");
    if (servicoParam && servicos.length > 0 && !selectedServico) {
      const match = servicos.find(s => s.nome === servicoParam);
      if (match) {
        setSelectedServico(match);
        setStep(2);
      }
    }
  }, [servicos, searchParams, selectedServico]);

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedHorario(null);
    setHorariosOcupados([]);
  };

  const fetchHorariosOcupados = async () => {
    if (!selectedDate || !selectedTerapeuta) return;
    
    setLoadingHorarios(true);
    const ocupados = await getHorariosOcupados(selectedDate, selectedTerapeuta.id);
    setHorariosOcupados(ocupados);
    setLoadingHorarios(false);
  };

  const handleConfirmar = async () => {
    if (!selectedDate || !selectedHorario || !selectedServico) return;

    const [hours, minutes] = selectedHorario.split(":").map(Number);
    const dataHora = new Date(selectedDate);
    dataHora.setHours(hours, minutes, 0, 0);

    setSaving(true);
    const { error } = await createAgendamento(dataHora, selectedServico.nome, undefined, selectedTerapeuta?.id);
    setSaving(false);

    if (error) {
      const errorMessage = error.message || "Erro ao agendar. Tente novamente.";
      const isConflict = errorMessage.includes("ocupado") || errorMessage.includes("duplicate") || errorMessage.includes("unique");
      
      toast.error(isConflict ? "Horário indisponível" : "Erro ao agendar", {
        description: isConflict 
          ? "Este horário já está ocupado. Escolha outro horário." 
          : errorMessage,
      });
      
      // Refresh occupied slots so the conflicting one appears as blocked
      if (isConflict) {
        await fetchHorariosOcupados();
      }
      // Stay on step 4 — do NOT reset form or switch tabs
      return;
    }
    
    toast.success("Agendamento realizado com sucesso!", {
      description: `Sua sessão foi agendada para ${format(dataHora, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`,
    });
    setStep(1);
    setSelectedDate(undefined);
    setSelectedHorario(null);
    setSelectedServico(null);
    setSelectedTerapeuta(null);
    setHorariosOcupados([]);
    setActiveTab("agendados");
  };

  const handleCancelar = async () => {
    if (!agendamentoToCancel) return;

    const { error } = await cancelAgendamento(agendamentoToCancel);
    
    if (error) {
      toast.error("Erro ao cancelar agendamento");
    } else {
      toast.success("Agendamento cancelado");
    }
    
    setCancelDialogOpen(false);
    setAgendamentoToCancel(null);
  };

  const handleAvaliar = async (nota: number, comentario?: string) => {
    if (!agendamentoToRate) return;

    const { error } = await createAvaliacao(agendamentoToRate.id, nota, comentario);
    
    if (error) {
      toast.error("Erro ao enviar avaliação");
    } else {
      toast.success("Avaliação enviada! Obrigado pelo feedback 💚");
    }
    
    setAgendamentoToRate(null);
  };

  const handleReagendar = async (novaDataHora: Date) => {
    if (!agendamentoToReagendar) return;

    const { error } = await reagendarAgendamento(agendamentoToReagendar.id, novaDataHora);
    
    if (error) {
      toast.error(error.message || "Erro ao reagendar");
    } else {
      toast.success("Agendamento reagendado com sucesso!", {
        description: `Nova data: ${format(novaDataHora, "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}`,
      });
    }
    
    setAgendamentoToReagendar(null);
  };

  const canProceed = () => {
    if (step === 1) return selectedServico !== null;
    if (step === 2) return selectedTerapeuta !== null;
    if (step === 3) return selectedDate !== undefined;
    if (step === 4) return selectedHorario !== null;
    return false;
  };

  const handleNextStep = async () => {
    if (step === 3 && selectedDate && selectedTerapeuta) {
      setStep(4);
      await fetchHorariosOcupados();
    } else {
      setStep(step + 1);
    }
  };

  const proximosAgendamentos = getProximosAgendamentos();

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
            onClick={() => {
              if (activeTab === "novo" && step > 1) {
                setStep(step - 1);
              } else {
                navigate("/");
              }
            }}
            className="p-2 rounded-xl hover:bg-muted/50 transition-colors"
          >
            <ArrowLeft size={22} className="text-foreground" />
          </button>
          <div>
            <h1 className="text-xl font-bold text-foreground">Agendamentos</h1>
            <p className="text-xs text-muted-foreground">Agende e gerencie suas sessões</p>
          </div>
        </motion.div>

        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-5">
          <motion.div variants={fadeUp}>
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="novo">Novo Agendamento</TabsTrigger>
                <TabsTrigger value="agendados" className="relative">
                  Meus Agendamentos
                  {proximosAgendamentos.length > 0 && (
                    <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-primary-foreground text-xs rounded-full flex items-center justify-center">
                      {proximosAgendamentos.length}
                    </span>
                  )}
                </TabsTrigger>
              </TabsList>

              <TabsContent value="agendados" className="mt-4">
                {loading ? (
                  <AgendamentosListSkeleton />
                ) : agendamentos.length === 0 ? (
                  <div className="text-center py-12 glass-card rounded-2xl">
                    <CalendarDays className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">Nenhum agendamento encontrado</p>
                    <Button 
                      variant="link" 
                      onClick={() => setActiveTab("novo")}
                      className="mt-2"
                    >
                      Agendar agora
                    </Button>
                  </div>
                ) : (
                  <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                    className="space-y-3"
                  >
                    {agendamentos.map((agendamento) => {
                      const dataHora = new Date(agendamento.data_hora);
                      const isPast = dataHora < new Date();
                      const isCanceled = agendamento.status === "cancelado";

                      return (
                        <motion.div key={agendamento.id} variants={fadeUp}>
                          <div
                            className={`glass-card rounded-2xl p-4 ${isCanceled ? "opacity-60" : ""} ${isPast && !isCanceled ? "bg-muted/30" : ""}`}
                          >
                            <div className="flex justify-between items-start">
                              <div>
                                <h3 className="font-semibold text-foreground">{agendamento.servico}</h3>
                                {agendamento.terapeutas && (
                                  <p className="text-sm text-primary flex items-center gap-1 mt-0.5">
                                    <User size={14} />
                                    {agendamento.terapeutas.nome}
                                  </p>
                                )}
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                  <CalendarDays size={14} />
                                  {format(dataHora, "dd/MM/yyyy", { locale: ptBR })}
                                </p>
                                <p className="text-sm text-muted-foreground flex items-center gap-1">
                                  <Clock size={14} />
                                  {format(dataHora, "HH:mm", { locale: ptBR })}
                                </p>
                              </div>
                              <div className="text-right">
                                {isCanceled ? (
                                  <span className="text-xs px-2 py-1 rounded-full bg-destructive/10 text-destructive">
                                    Cancelado
                                  </span>
                                ) : isPast ? (
                                  <>
                                    <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                                      Concluído
                                    </span>
                                    {getAvaliacaoByAgendamento(agendamento.id) ? (
                                      <div className="flex items-center justify-end gap-0.5 mt-2 text-yellow-500">
                                        {[...Array(getAvaliacaoByAgendamento(agendamento.id)?.nota || 0)].map((_, i) => (
                                          <Star key={i} size={14} className="fill-current" />
                                        ))}
                                      </div>
                                    ) : (
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="mt-2 text-primary hover:text-primary"
                                        onClick={() => {
                                          setAgendamentoToRate({
                                            id: agendamento.id,
                                            servico: agendamento.servico,
                                            terapeutaNome: agendamento.terapeutas?.nome,
                                          });
                                          setAvaliacaoDialogOpen(true);
                                        }}
                                      >
                                        <Star size={14} className="mr-1" />
                                        Avaliar
                                      </Button>
                                    )}
                                  </>
                                ) : (
                                  <>
                                    <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                                      Confirmado
                                    </span>
                                    <div className="flex gap-1 mt-2">
                                      <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-primary hover:text-primary"
                                        onClick={() => {
                                          setAgendamentoToReagendar({
                                            id: agendamento.id,
                                            servico: agendamento.servico,
                                            terapeutaId: agendamento.terapeuta_id || undefined,
                                            terapeutaNome: agendamento.terapeutas?.nome,
                                          });
                                          setReagendarDialogOpen(true);
                                        }}
                                      >
                                        <RefreshCw size={14} className="mr-1" />
                                        Reagendar
                                      </Button>
                                    </div>
                                    <Button
                                      variant="ghost"
                                      size="sm"
                                      className="text-destructive hover:text-destructive"
                                      onClick={() => {
                                        setAgendamentoToCancel(agendamento.id);
                                        setCancelDialogOpen(true);
                                      }}
                                    >
                                      <X size={14} className="mr-1" />
                                      Cancelar
                                    </Button>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </motion.div>
                )}
              </TabsContent>

              <TabsContent value="novo" className="mt-4 space-y-4">
                {/* Priority scheduling banner */}
                <PriorityBanner />

                {/* Progress */}
                <div className="flex gap-2">
                  {[1, 2, 3, 4].map((s) => (
                    <div
                      key={s}
                      className={`h-1.5 flex-1 rounded-full transition-colors ${
                        s <= step ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>

                {/* Step 1: Serviço */}
                {step === 1 && (
                  <motion.div
                    variants={stagger}
                    initial="hidden"
                    animate="show"
                    className="space-y-3"
                  >
                    <motion.div variants={fadeUp}>
                      <p className="section-label px-1 mb-3">Escolha o serviço</p>
                    </motion.div>
                    
                    {loadingServicos ? (
                      <ServicosListSkeleton />
                    ) : servicos.length === 0 ? (
                      <div className="text-center py-12 glass-card rounded-2xl">
                        <p className="text-muted-foreground">Nenhum serviço disponível no momento.</p>
                      </div>
                    ) : (
                      servicos.map((servico, index) => (
                        <motion.div key={servico.id} variants={fadeUp}>
                          <div
                            className={`glass-card rounded-2xl p-4 cursor-pointer transition-all ${
                              selectedServico?.id === servico.id
                                ? "ring-2 ring-primary bg-primary/5"
                                : "hover:bg-muted/30"
                            }`}
                            onClick={() => setSelectedServico(servico)}
                          >
                            <div className="flex justify-between items-center">
                              <div>
                                <h3 className="font-medium text-foreground">{servico.nome}</h3>
                                {servico.descricao && (
                                  <p className="text-xs text-muted-foreground mt-0.5">{servico.descricao}</p>
                                )}
                                <p className="text-sm text-muted-foreground flex items-center gap-1 mt-1">
                                  <Clock size={14} /> {servico.duracao} min
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-semibold text-primary">
                                  R$ {servico.preco.toFixed(2).replace('.', ',')}
                                </p>
                                {selectedServico?.id === servico.id && (
                                  <Check className="text-primary ml-auto" size={20} />
                                )}
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      ))
                    )}
                  </motion.div>
                )}

                {/* Step 2: Terapeuta */}
                {step === 2 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    <TerapeutaSelector
                      terapeutas={terapeutas}
                      loading={loadingTerapeutas}
                      selectedId={selectedTerapeuta?.id || null}
                      onSelect={setSelectedTerapeuta}
                    />
                  </motion.div>
                )}

                {/* Step 3: Data */}
                {step === 3 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-3"
                  >
                    <p className="section-label px-1">Escolha a data</p>
                    <div className="glass-card rounded-2xl p-4 flex justify-center">
                      <Calendar
                        mode="single"
                        selected={selectedDate}
                        onSelect={handleDateSelect}
                        locale={ptBR}
                        disabled={(date) => date < new Date() || date.getDay() === 0}
                        className="rounded-md"
                      />
                    </div>
                  </motion.div>
                )}

                {/* Step 4: Horário */}
                {step === 4 && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-3"
                  >
                    <p className="section-label px-1">Escolha o horário</p>
                    {loadingHorarios ? (
                      <div className="flex justify-center py-8">
                        <LoadingSpinner size="sm" />
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 gap-3">
                        {horarios.map((horario) => {
                          const isOcupado = horariosOcupados.includes(horario);
                          return (
                            <Button
                              key={horario}
                              variant={selectedHorario === horario ? "default" : "outline"}
                              className={`h-14 rounded-xl ${isOcupado ? "opacity-50 line-through" : ""}`}
                              onClick={() => !isOcupado && setSelectedHorario(horario)}
                              disabled={isOcupado}
                            >
                              {horario}
                              {isOcupado && <span className="sr-only">(ocupado)</span>}
                            </Button>
                          );
                        })}
                      </div>
                    )}
                    
                    {horariosOcupados.length > 0 && (
                      <p className="text-xs text-muted-foreground mt-3 text-center">
                        Horários riscados já estão ocupados
                      </p>
                    )}

                    {selectedDate && selectedHorario && selectedServico && (
                      <div className="glass-card-strong rounded-2xl p-5 mt-4 space-y-2">
                        <p className="font-semibold text-foreground text-sm">Resumo do Agendamento</p>
                        <div className="text-sm space-y-1 text-muted-foreground">
                          <p><strong className="text-foreground">Serviço:</strong> {selectedServico.nome}</p>
                          <p><strong className="text-foreground">Terapeuta:</strong> {selectedTerapeuta?.nome}</p>
                          <p><strong className="text-foreground">Data:</strong> {format(selectedDate, "dd/MM/yyyy", { locale: ptBR })}</p>
                          <p><strong className="text-foreground">Horário:</strong> {selectedHorario}</p>
                        </div>
                        <p className="text-primary font-semibold pt-2">
                          Total: R$ {selectedServico.preco.toFixed(2).replace('.', ',')}
                        </p>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* Botão de ação */}
                <div className="mt-6">
                  {step < 4 ? (
                    <Button
                      className="w-full rounded-xl h-12"
                      disabled={!canProceed()}
                      onClick={handleNextStep}
                    >
                      Continuar
                    </Button>
                  ) : (
                    <Button
                      className="w-full rounded-xl h-12"
                      disabled={!canProceed() || saving}
                      onClick={handleConfirmar}
                    >
                      {saving ? (
                        <ButtonLoader />
                      ) : (
                        "Confirmar Agendamento"
                      )}
                    </Button>
                  )}
                </div>
              </TabsContent>
            </Tabs>
          </motion.div>
        </motion.div>
      </div>

      {/* Cancel Dialog */}
      <AlertDialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Cancelar agendamento?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O agendamento será cancelado permanentemente.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Voltar</AlertDialogCancel>
            <AlertDialogAction onClick={handleCancelar} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Cancelar agendamento
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Avaliação Dialog */}
      <AvaliacaoDialog
        open={avaliacaoDialogOpen}
        onOpenChange={setAvaliacaoDialogOpen}
        servicoNome={agendamentoToRate?.servico || ""}
        terapeutaNome={agendamentoToRate?.terapeutaNome}
        onSubmit={handleAvaliar}
      />

      {/* Reagendar Dialog */}
      <ReagendarDialog
        open={reagendarDialogOpen}
        onOpenChange={setReagendarDialogOpen}
        servicoNome={agendamentoToReagendar?.servico || ""}
        terapeutaId={agendamentoToReagendar?.terapeutaId}
        terapeutaNome={agendamentoToReagendar?.terapeutaNome}
        onSubmit={handleReagendar}
        getHorariosOcupados={getHorariosOcupados}
      />

    </div>
    </AppLayout>
  );
};

export default Agendamento;
