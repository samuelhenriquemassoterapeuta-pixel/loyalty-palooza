import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Bell,
  BellOff,
  Clock,
  Save,
  Loader2,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useLembretesAlongamento } from "@/features/alongamento/hooks/useLembretesAlongamento";

const DIAS_SEMANA = [
  { valor: 0, label: "D", nome: "Domingo" },
  { valor: 1, label: "S", nome: "Segunda" },
  { valor: 2, label: "T", nome: "Terça" },
  { valor: 3, label: "Q", nome: "Quarta" },
  { valor: 4, label: "Q", nome: "Quinta" },
  { valor: 5, label: "S", nome: "Sexta" },
  { valor: 6, label: "S", nome: "Sábado" },
];

export const LembretesConfig = () => {
  const { toast } = useToast();
  const { lembrete, loading, saving, salvarLembrete, toggleAtivo } =
    useLembretesAlongamento();

  const [ativo, setAtivo] = useState(false);
  const [horario, setHorario] = useState("08:00");
  const [diasSelecionados, setDiasSelecionados] = useState<number[]>([1, 2, 3, 4, 5]);
  const [mensagem, setMensagem] = useState("");
  const [hasChanges, setHasChanges] = useState(false);

  // Sync state from DB
  useEffect(() => {
    if (lembrete) {
      setAtivo(lembrete.ativo);
      setHorario(lembrete.horario.substring(0, 5)); // "HH:MM:SS" -> "HH:MM"
      setDiasSelecionados(lembrete.dias_semana);
      setMensagem(lembrete.mensagem_personalizada || "");
      setHasChanges(false);
    }
  }, [lembrete]);

  const handleToggle = async () => {
    const newAtivo = !ativo;
    setAtivo(newAtivo);

    if (!lembrete) {
      // First time - save with defaults
      const { error } = await salvarLembrete({
        ativo: newAtivo,
        horario: horario + ":00",
        dias_semana: diasSelecionados,
        mensagem_personalizada: mensagem || null,
      });
      if (error) {
        setAtivo(!newAtivo);
        toast({ title: "Erro", description: error, variant: "destructive" });
      } else {
        toast({
          title: newAtivo ? "Lembretes ativados! 🔔" : "Lembretes desativados",
          description: newAtivo
            ? "Você receberá notificações nos dias configurados."
            : "Seus lembretes foram pausados.",
        });
      }
    } else {
      const { error } = await toggleAtivo();
      if (error) {
        setAtivo(!newAtivo);
        toast({ title: "Erro", description: error, variant: "destructive" });
      } else {
        toast({
          title: newAtivo ? "Lembretes ativados! 🔔" : "Lembretes desativados",
          description: newAtivo
            ? "Você receberá notificações nos dias configurados."
            : "Seus lembretes foram pausados.",
        });
      }
    }
  };

  const toggleDia = (dia: number) => {
    setDiasSelecionados((prev) => {
      const next = prev.includes(dia)
        ? prev.filter((d) => d !== dia)
        : [...prev, dia].sort();
      return next;
    });
    setHasChanges(true);
  };

  const handleHorarioChange = (value: string) => {
    setHorario(value);
    setHasChanges(true);
  };

  const handleMensagemChange = (value: string) => {
    setMensagem(value);
    setHasChanges(true);
  };

  const handleSalvar = async () => {
    if (diasSelecionados.length === 0) {
      toast({
        title: "Selecione ao menos um dia",
        description: "Escolha os dias da semana para receber lembretes.",
        variant: "destructive",
      });
      return;
    }

    const { error } = await salvarLembrete({
      ativo,
      horario: horario + ":00",
      dias_semana: diasSelecionados,
      mensagem_personalizada: mensagem || null,
    });

    if (error) {
      toast({ title: "Erro ao salvar", description: error, variant: "destructive" });
    } else {
      setHasChanges(false);
      toast({
        title: "Configurações salvas! ✅",
        description: "Seus lembretes foram atualizados.",
      });
    }
  };

  if (loading) {
    return (
      <Card className="border-border/50">
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
        </CardContent>
      </Card>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <Card className="border-border/50 overflow-hidden">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-base flex items-center gap-2">
              {ativo ? (
                <Bell className="w-5 h-5 text-primary" />
              ) : (
                <BellOff className="w-5 h-5 text-muted-foreground" />
              )}
              Lembretes de Alongamento
            </CardTitle>
            <Switch checked={ativo} onCheckedChange={handleToggle} />
          </div>
        </CardHeader>

        <AnimatePresence>
          {ativo && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <CardContent className="space-y-5 pt-0">
                {/* Horário */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Horário do lembrete
                  </Label>
                  <Input
                    type="time"
                    value={horario}
                    onChange={(e) => handleHorarioChange(e.target.value)}
                    className="w-36"
                  />
                </div>

                {/* Dias da Semana */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">Dias da semana</Label>
                  <div className="flex gap-1.5">
                    {DIAS_SEMANA.map((dia) => {
                      const selected = diasSelecionados.includes(dia.valor);
                      return (
                        <button
                          key={dia.valor}
                          onClick={() => toggleDia(dia.valor)}
                          title={dia.nome}
                          className={`
                            w-9 h-9 rounded-full text-xs font-semibold transition-all duration-200
                            ${
                              selected
                                ? "bg-primary text-primary-foreground shadow-md scale-105"
                                : "bg-muted text-muted-foreground hover:bg-muted/80"
                            }
                          `}
                        >
                          {dia.label}
                        </button>
                      );
                    })}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {diasSelecionados.length === 7
                      ? "Todos os dias"
                      : diasSelecionados.length === 0
                      ? "Nenhum dia selecionado"
                      : `${diasSelecionados.length} dia(s) por semana`}
                  </p>
                </div>

                {/* Mensagem Personalizada */}
                <div className="space-y-2">
                  <Label className="text-sm font-medium">
                    Mensagem personalizada{" "}
                    <Badge variant="outline" className="text-[10px] ml-1">
                      Opcional
                    </Badge>
                  </Label>
                  <Textarea
                    placeholder="Ex: Hora de alongar! Cuide do seu corpo 🧘"
                    value={mensagem}
                    onChange={(e) => handleMensagemChange(e.target.value)}
                    maxLength={200}
                    rows={2}
                    className="resize-none text-sm"
                  />
                  <p className="text-xs text-muted-foreground text-right">
                    {mensagem.length}/200
                  </p>
                </div>

                {/* Salvar */}
                <AnimatePresence>
                  {hasChanges && (
                    <motion.div
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                    >
                      <Button
                        onClick={handleSalvar}
                        disabled={saving || diasSelecionados.length === 0}
                        className="w-full gap-2"
                        size="sm"
                      >
                        {saving ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Save className="w-4 h-4" />
                        )}
                        Salvar configurações
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Info */}
                <p className="text-xs text-muted-foreground bg-muted/50 rounded-lg p-3">
                  💡 Você receberá uma notificação no app nos dias e horário configurados. 
                  Mantenha o app atualizado para não perder nenhum lembrete!
                </p>
              </CardContent>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  );
};
