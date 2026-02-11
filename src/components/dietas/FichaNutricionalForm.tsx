import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, ChevronDown, Save, AlertTriangle, Pill, Wine, Cigarette, Dumbbell, Scale, Ruler } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useFichaNutricional } from "@/hooks/useFichaNutricional";
import { toast } from "sonner";

const doencasComuns = [
  "Diabetes", "Hipertensão", "Hipotireoidismo", "Hipertireoidismo",
  "Doença celíaca", "Gastrite", "Refluxo", "Síndrome do intestino irritável",
  "Colesterol alto", "Anemia", "Insuficiência renal", "Linfedema",
];

const alergiasComuns = [
  "Glúten", "Lactose", "Frutos do mar", "Amendoim", "Soja",
  "Ovo", "Castanhas", "Corantes", "Conservantes",
];

export const FichaNutricionalForm = () => {
  const { ficha, isLoading, upsert } = useFichaNutricional();
  const [open, setOpen] = useState(false);

  const [peso, setPeso] = useState("");
  const [altura, setAltura] = useState("");
  const [idade, setIdade] = useState("");
  const [sexo, setSexo] = useState("feminino");
  const [objetivo, setObjetivo] = useState("");
  const [doencas, setDoencas] = useState<string[]>([]);
  const [alergias, setAlergias] = useState<string[]>([]);
  const [restritos, setRestritos] = useState("");
  const [medicamentos, setMedicamentos] = useState("");
  const [fumante, setFumante] = useState(false);
  const [alcool, setAlcool] = useState("nenhum");
  const [atividade, setAtividade] = useState("sedentario");
  const [cirurgias, setCirurgias] = useState("");
  const [obs, setObs] = useState("");

  useEffect(() => {
    if (ficha) {
      setPeso(ficha.peso?.toString() ?? "");
      setAltura(ficha.altura?.toString() ?? "");
      setIdade(ficha.idade?.toString() ?? "");
      setSexo(ficha.sexo ?? "feminino");
      setObjetivo(ficha.objetivo ?? "");
      setDoencas(ficha.doencas ?? []);
      setAlergias(ficha.alergias_alimentares ?? []);
      setRestritos((ficha.alimentos_restritos ?? []).join(", "));
      setMedicamentos(ficha.medicamentos ?? "");
      setFumante(ficha.fumante ?? false);
      setAlcool(ficha.consumo_alcool ?? "nenhum");
      setAtividade(ficha.nivel_atividade ?? "sedentario");
      setCirurgias(ficha.historico_cirurgias ?? "");
      setObs(ficha.observacoes ?? "");
    }
  }, [ficha]);

  const toggleTag = (tag: string, list: string[], setList: (v: string[]) => void) => {
    setList(list.includes(tag) ? list.filter((t) => t !== tag) : [...list, tag]);
  };

  const handleSave = () => {
    upsert.mutate(
      {
        peso: peso ? parseFloat(peso) : null,
        altura: altura ? parseFloat(altura) : null,
        idade: idade ? parseInt(idade) : null,
        sexo,
        objetivo,
        doencas,
        alergias_alimentares: alergias,
        alimentos_restritos: restritos ? restritos.split(",").map((s) => s.trim()).filter(Boolean) : [],
        medicamentos: medicamentos || null,
        fumante,
        consumo_alcool: alcool,
        nivel_atividade: atividade,
        historico_cirurgias: cirurgias || null,
        observacoes: obs || null,
      },
      {
        onSuccess: () => toast.success("Ficha nutricional salva!"),
        onError: () => toast.error("Erro ao salvar ficha."),
      }
    );
  };

  const imc = peso && altura ? (parseFloat(peso) / Math.pow(parseFloat(altura) / 100, 2)).toFixed(1) : null;

  return (
    <div className="rounded-2xl border glass-card-strong overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center gap-3 p-4 text-left hover:bg-muted/30 transition-colors"
      >
        <div className="p-2 rounded-xl bg-primary/10 text-primary">
          <User size={18} />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-foreground text-sm">Meu Perfil Nutricional</p>
          <p className="text-xs text-muted-foreground">
            {ficha ? "Última atualização: " + new Date(ficha.updated_at).toLocaleDateString("pt-BR") : "Preencha sua ficha para recomendações personalizadas"}
          </p>
        </div>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={16} className="text-muted-foreground" />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <div className="px-4 pb-4 space-y-4 border-t border-border/50 pt-4">
              {isLoading ? (
                <p className="text-sm text-muted-foreground text-center py-4">Carregando...</p>
              ) : (
                <>
                  {/* Dados básicos */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label className="text-xs flex items-center gap-1"><Scale size={12} /> Peso (kg)</Label>
                      <Input type="number" value={peso} onChange={(e) => setPeso(e.target.value)} className="rounded-xl h-9" placeholder="65" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs flex items-center gap-1"><Ruler size={12} /> Altura (cm)</Label>
                      <Input type="number" value={altura} onChange={(e) => setAltura(e.target.value)} className="rounded-xl h-9" placeholder="165" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Idade</Label>
                      <Input type="number" value={idade} onChange={(e) => setIdade(e.target.value)} className="rounded-xl h-9" placeholder="30" />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs">Sexo</Label>
                      <Select value={sexo} onValueChange={setSexo}>
                        <SelectTrigger className="rounded-xl h-9"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="feminino">Feminino</SelectItem>
                          <SelectItem value="masculino">Masculino</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {imc && (
                    <div className="flex items-center gap-2 p-2 rounded-xl bg-info/5 border border-info/20">
                      <span className="text-xs text-muted-foreground">IMC:</span>
                      <span className="text-sm font-bold text-info">{imc}</span>
                      <span className="text-xs text-muted-foreground">
                        {parseFloat(imc) < 18.5 ? "Abaixo" : parseFloat(imc) < 25 ? "Normal" : parseFloat(imc) < 30 ? "Sobrepeso" : "Obesidade"}
                      </span>
                    </div>
                  )}

                  {/* Objetivo */}
                  <div className="space-y-1">
                    <Label className="text-xs">Objetivo alimentar</Label>
                    <Select value={objetivo} onValueChange={setObjetivo}>
                      <SelectTrigger className="rounded-xl h-9"><SelectValue placeholder="Selecione" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="emagrecimento">Emagrecimento</SelectItem>
                        <SelectItem value="manutencao">Manutenção</SelectItem>
                        <SelectItem value="ganho_massa">Ganho de massa</SelectItem>
                        <SelectItem value="recuperacao_cirurgica">Recuperação cirúrgica</SelectItem>
                        <SelectItem value="anti_inflamatorio">Anti-inflamatório</SelectItem>
                        <SelectItem value="desintoxicacao">Desintoxicação</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Doenças */}
                  <div className="space-y-2">
                    <Label className="text-xs flex items-center gap-1"><AlertTriangle size={12} /> Doenças / condições</Label>
                    <div className="flex flex-wrap gap-1.5">
                      {doencasComuns.map((d) => (
                        <Badge
                          key={d}
                          variant={doencas.includes(d) ? "default" : "outline"}
                          className="cursor-pointer text-[10px] px-2 py-0.5 rounded-full"
                          onClick={() => toggleTag(d, doencas, setDoencas)}
                        >
                          {d}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Alergias */}
                  <div className="space-y-2">
                    <Label className="text-xs">Alergias / intolerâncias</Label>
                    <div className="flex flex-wrap gap-1.5">
                      {alergiasComuns.map((a) => (
                        <Badge
                          key={a}
                          variant={alergias.includes(a) ? "default" : "outline"}
                          className="cursor-pointer text-[10px] px-2 py-0.5 rounded-full"
                          onClick={() => toggleTag(a, alergias, setAlergias)}
                        >
                          {a}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Alimentos restritos */}
                  <div className="space-y-1">
                    <Label className="text-xs">Alimentos que não gosta (separados por vírgula)</Label>
                    <Input value={restritos} onChange={(e) => setRestritos(e.target.value)} className="rounded-xl h-9" placeholder="Ex: brócolis, fígado..." />
                  </div>

                  {/* Medicamentos */}
                  <div className="space-y-1">
                    <Label className="text-xs flex items-center gap-1"><Pill size={12} /> Medicamentos em uso</Label>
                    <Textarea value={medicamentos} onChange={(e) => setMedicamentos(e.target.value)} className="rounded-xl resize-none" rows={2} placeholder="Liste os medicamentos..." />
                  </div>

                  {/* Hábitos */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex items-center justify-between p-3 rounded-xl bg-muted/30">
                      <Label className="text-xs flex items-center gap-1"><Cigarette size={12} /> Fumante</Label>
                      <Switch checked={fumante} onCheckedChange={setFumante} />
                    </div>
                    <div className="space-y-1">
                      <Label className="text-xs flex items-center gap-1"><Wine size={12} /> Álcool</Label>
                      <Select value={alcool} onValueChange={setAlcool}>
                        <SelectTrigger className="rounded-xl h-9"><SelectValue /></SelectTrigger>
                        <SelectContent>
                          <SelectItem value="nenhum">Nenhum</SelectItem>
                          <SelectItem value="social">Social</SelectItem>
                          <SelectItem value="moderado">Moderado</SelectItem>
                          <SelectItem value="frequente">Frequente</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  {/* Atividade física */}
                  <div className="space-y-1">
                    <Label className="text-xs flex items-center gap-1"><Dumbbell size={12} /> Nível de atividade</Label>
                    <Select value={atividade} onValueChange={setAtividade}>
                      <SelectTrigger className="rounded-xl h-9"><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="sedentario">Sedentário</SelectItem>
                        <SelectItem value="leve">Levemente ativo</SelectItem>
                        <SelectItem value="moderado">Moderadamente ativo</SelectItem>
                        <SelectItem value="ativo">Muito ativo</SelectItem>
                        <SelectItem value="atleta">Atleta</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Histórico cirúrgico */}
                  <div className="space-y-1">
                    <Label className="text-xs">Histórico de cirurgias</Label>
                    <Textarea value={cirurgias} onChange={(e) => setCirurgias(e.target.value)} className="rounded-xl resize-none" rows={2} placeholder="Descreva cirurgias realizadas..." />
                  </div>

                  {/* Observações */}
                  <div className="space-y-1">
                    <Label className="text-xs">Observações adicionais</Label>
                    <Textarea value={obs} onChange={(e) => setObs(e.target.value)} className="rounded-xl resize-none" rows={2} placeholder="Algo mais que devemos saber?" />
                  </div>

                  <Button
                    onClick={handleSave}
                    disabled={upsert.isPending}
                    className="w-full rounded-xl gap-2"
                  >
                    <Save size={16} />
                    {upsert.isPending ? "Salvando..." : "Salvar Ficha"}
                  </Button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
