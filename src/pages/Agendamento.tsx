import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/BottomNavigation";
import { ArrowLeft, Clock, Check, CalendarDays, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ptBR } from "date-fns/locale";
import { format } from "date-fns";
import { useAgendamentos } from "@/hooks/useAgendamentos";
import { useServicos, Servico } from "@/hooks/useServicos";
import { useTerapeutas, Terapeuta } from "@/hooks/useTerapeutas";
import { TerapeutaSelector } from "@/components/agendamento/TerapeutaSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ServicosListSkeleton, AgendamentosListSkeleton } from "@/components/skeletons";
import { LoadingSpinner, ButtonLoader } from "@/components/LoadingSpinner";
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

const Agendamento = () => {
  const navigate = useNavigate();
  const { agendamentos, loading, createAgendamento, cancelAgendamento, getProximosAgendamentos, getHorariosOcupados } = useAgendamentos();
  const { servicos, loading: loadingServicos } = useServicos();
  const { terapeutas, loading: loadingTerapeutas } = useTerapeutas();
  
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

  const handleDateSelect = async (date: Date | undefined) => {
    setSelectedDate(date);
    setSelectedHorario(null);
    
    if (date) {
      setLoadingHorarios(true);
      const ocupados = await getHorariosOcupados(date);
      setHorariosOcupados(ocupados);
      setLoadingHorarios(false);
    } else {
      setHorariosOcupados([]);
    }
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
      toast.error(error.message || "Erro ao agendar. Tente novamente.");
    } else {
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
    }
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

  const canProceed = () => {
    if (step === 1) return selectedServico !== null;
    if (step === 2) return selectedTerapeuta !== null;
    if (step === 3) return selectedDate !== undefined;
    if (step === 4) return selectedHorario !== null;
    return false;
  };

  const proximosAgendamentos = getProximosAgendamentos();

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-4 safe-top">
        {/* Header */}
        <div className="flex items-center gap-3 py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => {
              if (activeTab === "novo" && step > 1) {
                setStep(step - 1);
              } else {
                navigate("/");
              }
            }}
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Agendamentos</h1>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
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
              <div className="text-center py-12">
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
              <div className="space-y-3">
                {agendamentos.map((agendamento) => {
                  const dataHora = new Date(agendamento.data_hora);
                  const isPast = dataHora < new Date();
                  const isCanceled = agendamento.status === "cancelado";

                  return (
                    <Card 
                      key={agendamento.id}
                      className={`${isCanceled ? "opacity-60" : ""} ${isPast && !isCanceled ? "bg-muted/50" : ""}`}
                    >
                      <CardContent className="p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-semibold text-foreground">{agendamento.servico}</h3>
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
                              <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">
                                Concluído
                              </span>
                            ) : (
                              <>
                                <span className="text-xs px-2 py-1 rounded-full bg-primary/10 text-primary">
                                  Confirmado
                                </span>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="mt-2 text-destructive hover:text-destructive"
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
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            )}
          </TabsContent>

          <TabsContent value="novo" className="mt-4">
            {/* Progress */}
            <div className="flex gap-2 mb-6">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`h-1 flex-1 rounded-full transition-colors ${
                    s <= step ? "bg-primary" : "bg-muted"
                  }`}
                />
              ))}
            </div>

            {/* Step 1: Serviço */}
            {step === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="space-y-4"
              >
                <h2 className="text-lg font-medium text-foreground mb-4">Escolha o serviço</h2>
                
                {loadingServicos ? (
                  <ServicosListSkeleton />
                ) : servicos.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-muted-foreground">Nenhum serviço disponível no momento.</p>
                  </div>
                ) : (
                  servicos.map((servico) => (
                    <Card
                      key={servico.id}
                      className={`cursor-pointer transition-all ${
                        selectedServico?.id === servico.id
                          ? "border-primary bg-primary/5"
                          : "border-border hover:border-primary/50"
                      }`}
                      onClick={() => setSelectedServico(servico)}
                    >
                      <CardContent className="p-4 flex justify-between items-center">
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
                      </CardContent>
                    </Card>
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
              >
                <h2 className="text-lg font-medium text-foreground mb-4">Escolha a data</h2>
                <Card>
                  <CardContent className="p-4 flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      locale={ptBR}
                      disabled={(date) => date < new Date() || date.getDay() === 0}
                      className="rounded-md"
                    />
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Step 4: Horário */}
            {step === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <h2 className="text-lg font-medium text-foreground mb-4">Escolha o horário</h2>
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
                          className={`h-14 ${isOcupado ? "opacity-50 line-through" : ""}`}
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
                  <Card className="mt-6 bg-primary/5 border-primary/20">
                    <CardHeader className="pb-2">
                      <CardTitle className="text-base">Resumo do Agendamento</CardTitle>
                    </CardHeader>
                    <CardContent className="text-sm space-y-1">
                      <p><strong>Serviço:</strong> {selectedServico.nome}</p>
                      <p><strong>Terapeuta:</strong> {selectedTerapeuta?.nome}</p>
                      <p><strong>Data:</strong> {format(selectedDate, "dd/MM/yyyy", { locale: ptBR })}</p>
                      <p><strong>Horário:</strong> {selectedHorario}</p>
                      <p className="text-primary font-semibold pt-2">
                        Total: R$ {selectedServico.preco.toFixed(2).replace('.', ',')}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </motion.div>
            )}

            {/* Botão de ação */}
            <div className="mt-6">
              {step < 4 ? (
                <Button
                  className="w-full"
                  disabled={!canProceed()}
                  onClick={() => setStep(step + 1)}
                >
                  Continuar
                </Button>
              ) : (
                <Button
                  className="w-full"
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

      <BottomNavigation />
    </div>
  );
};

export default Agendamento;
