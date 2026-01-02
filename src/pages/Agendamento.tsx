import { useState } from "react";
import { motion } from "framer-motion";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BottomNavigation } from "@/components/BottomNavigation";
import { ArrowLeft, Clock, User, Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { ptBR } from "date-fns/locale";

const terapeutas = [
  { id: 1, nome: "Ana Silva", especialidade: "Massagem Relaxante" },
  { id: 2, nome: "Carlos Santos", especialidade: "Massagem Terapêutica" },
  { id: 3, nome: "Marina Oliveira", especialidade: "Drenagem Linfática" },
];

const horarios = [
  "09:00", "10:00", "11:00", "14:00", "15:00", "16:00", "17:00", "18:00"
];

const servicos = [
  { id: 1, nome: "Massagem Relaxante", duracao: "60 min", preco: 150 },
  { id: 2, nome: "Massagem Terapêutica", duracao: "60 min", preco: 180 },
  { id: 3, nome: "Drenagem Linfática", duracao: "50 min", preco: 160 },
  { id: 4, nome: "Pedras Quentes", duracao: "90 min", preco: 220 },
  { id: 5, nome: "Reflexologia", duracao: "45 min", preco: 120 },
];

const Agendamento = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(undefined);
  const [selectedHorario, setSelectedHorario] = useState<string | null>(null);
  const [selectedTerapeuta, setSelectedTerapeuta] = useState<number | null>(null);
  const [selectedServico, setSelectedServico] = useState<number | null>(null);

  const handleConfirmar = () => {
    if (selectedDate && selectedHorario && selectedTerapeuta && selectedServico) {
      toast.success("Agendamento realizado com sucesso!", {
        description: `Sua sessão foi agendada para ${selectedDate.toLocaleDateString('pt-BR')} às ${selectedHorario}`,
      });
      navigate("/");
    }
  };

  const canProceed = () => {
    if (step === 1) return selectedServico !== null;
    if (step === 2) return selectedTerapeuta !== null;
    if (step === 3) return selectedDate !== undefined;
    if (step === 4) return selectedHorario !== null;
    return false;
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      <div className="max-w-lg mx-auto px-4 safe-top">
        {/* Header */}
        <div className="flex items-center gap-3 py-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => step > 1 ? setStep(step - 1) : navigate("/")}
          >
            <ArrowLeft size={24} />
          </Button>
          <h1 className="text-xl font-semibold text-foreground">Agendar Sessão</h1>
        </div>

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
            {servicos.map((servico) => (
              <Card
                key={servico.id}
                className={`cursor-pointer transition-all ${
                  selectedServico === servico.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedServico(servico.id)}
              >
                <CardContent className="p-4 flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-foreground">{servico.nome}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Clock size={14} /> {servico.duracao}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-primary">
                      R$ {servico.preco.toFixed(2).replace('.', ',')}
                    </p>
                    {selectedServico === servico.id && (
                      <Check className="text-primary ml-auto" size={20} />
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </motion.div>
        )}

        {/* Step 2: Terapeuta */}
        {step === 2 && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            <h2 className="text-lg font-medium text-foreground mb-4">Escolha o terapeuta</h2>
            {terapeutas.map((terapeuta) => (
              <Card
                key={terapeuta.id}
                className={`cursor-pointer transition-all ${
                  selectedTerapeuta === terapeuta.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedTerapeuta(terapeuta.id)}
              >
                <CardContent className="p-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                    <User className="text-primary" size={24} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{terapeuta.nome}</h3>
                    <p className="text-sm text-muted-foreground">{terapeuta.especialidade}</p>
                  </div>
                  {selectedTerapeuta === terapeuta.id && (
                    <Check className="text-primary" size={20} />
                  )}
                </CardContent>
              </Card>
            ))}
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
                  onSelect={setSelectedDate}
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
            <div className="grid grid-cols-3 gap-3">
              {horarios.map((horario) => (
                <Button
                  key={horario}
                  variant={selectedHorario === horario ? "default" : "outline"}
                  className="h-14"
                  onClick={() => setSelectedHorario(horario)}
                >
                  {horario}
                </Button>
              ))}
            </div>

            {selectedDate && selectedHorario && selectedTerapeuta && selectedServico && (
              <Card className="mt-6 bg-primary/5 border-primary/20">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Resumo do Agendamento</CardTitle>
                </CardHeader>
                <CardContent className="text-sm space-y-1">
                  <p><strong>Serviço:</strong> {servicos.find(s => s.id === selectedServico)?.nome}</p>
                  <p><strong>Terapeuta:</strong> {terapeutas.find(t => t.id === selectedTerapeuta)?.nome}</p>
                  <p><strong>Data:</strong> {selectedDate.toLocaleDateString('pt-BR')}</p>
                  <p><strong>Horário:</strong> {selectedHorario}</p>
                  <p className="text-primary font-semibold pt-2">
                    Total: R$ {servicos.find(s => s.id === selectedServico)?.preco.toFixed(2).replace('.', ',')}
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
              disabled={!canProceed()}
              onClick={handleConfirmar}
            >
              Confirmar Agendamento
            </Button>
          )}
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
};

export default Agendamento;
