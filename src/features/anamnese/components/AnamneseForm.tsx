import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, Save, CheckCircle2, User, Stethoscope, ClipboardList, PenTool } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { CampoTemplate } from "../hooks/useAnamneseTemplates";
import { useAuth } from "@/contexts/AuthContext";
import { SignaturePad } from "./SignaturePad";

interface Props {
  servicoNome: string;
  camposEspecificos: CampoTemplate[];
  onSave: (data: any) => Promise<any>;
  onBack: () => void;
  initialData?: any;
}

const doencasOptions = [
  "Hipertensão", "Diabetes", "Cardiopatia", "Asma", "Depressão",
  "Ansiedade", "Tireoide", "Fibromialgia", "Artrite", "Osteoporose",
];

export function AnamneseForm({ servicoNome, camposEspecificos, onSave, onBack, initialData }: Props) {
  const { user } = useAuth();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);

  const [form, setForm] = useState({
    nome_completo: initialData?.nome_completo || "",
    data_nascimento: initialData?.data_nascimento || "",
    sexo: initialData?.sexo || "",
    profissao: initialData?.profissao || "",
    telefone: initialData?.telefone || "",
    email: initialData?.email || user?.email || "",
    endereco: initialData?.endereco || "",
    queixa_principal: initialData?.queixa_principal || "",
    historico_doencas: initialData?.historico_doencas || [],
    medicamentos_uso: initialData?.medicamentos_uso || "",
    alergias: initialData?.alergias || [],
    cirurgias_previas: initialData?.cirurgias_previas || "",
    fumante: initialData?.fumante || false,
    etilista: initialData?.etilista || false,
    pratica_atividade_fisica: initialData?.pratica_atividade_fisica || false,
    atividade_fisica_descricao: initialData?.atividade_fisica_descricao || "",
    pressao_arterial: initialData?.pressao_arterial || "",
    observacoes_gerais: initialData?.observacoes_gerais || "",
  });

  const [camposEsp, setCamposEsp] = useState<Record<string, any>>(
    initialData?.campos_especificos || {}
  );
  const [assinatura, setAssinatura] = useState<string | null>(initialData?.assinatura_paciente || null);

  const updateField = (key: string, value: any) => setForm((prev) => ({ ...prev, [key]: value }));
  const toggleDoenca = (d: string) => {
    setForm((prev) => ({
      ...prev,
      historico_doencas: prev.historico_doencas.includes(d)
        ? prev.historico_doencas.filter((x: string) => x !== d)
        : [...prev.historico_doencas, d],
    }));
  };

  const steps = [
    { label: "Dados Pessoais", icon: User },
    { label: "Histórico Médico", icon: Stethoscope },
    ...(camposEspecificos.length > 0 ? [{ label: servicoNome, icon: ClipboardList }] : []),
    { label: "Assinatura", icon: PenTool },
  ];

  const handleSave = async (status: string) => {
    setSaving(true);
    await onSave({
      ...form,
      servico_nome: servicoNome,
      campos_especificos: camposEsp,
      assinatura_paciente: assinatura,
      assinatura_data: assinatura ? new Date().toISOString() : null,
      status,
    });
    setSaving(false);
  };

  const renderCampoEspecifico = (campo: CampoTemplate) => {
    const val = camposEsp[campo.key];
    switch (campo.type) {
      case "text":
        return (
          <div key={campo.key}>
            <Label className="text-xs">{campo.label}</Label>
            <Input
              value={val || ""}
              onChange={(e) => setCamposEsp((p) => ({ ...p, [campo.key]: e.target.value }))}
            />
          </div>
        );
      case "number":
        return (
          <div key={campo.key}>
            <Label className="text-xs">{campo.label}</Label>
            <Input
              type="number"
              min={campo.min}
              max={campo.max}
              value={val || ""}
              onChange={(e) => setCamposEsp((p) => ({ ...p, [campo.key]: Number(e.target.value) }))}
            />
          </div>
        );
      case "boolean":
        return (
          <div key={campo.key} className="flex items-center justify-between py-2">
            <Label className="text-xs">{campo.label}</Label>
            <Switch
              checked={val || false}
              onCheckedChange={(v) => setCamposEsp((p) => ({ ...p, [campo.key]: v }))}
            />
          </div>
        );
      case "select":
        return (
          <div key={campo.key}>
            <Label className="text-xs">{campo.label}</Label>
            <Select value={val || ""} onValueChange={(v) => setCamposEsp((p) => ({ ...p, [campo.key]: v }))}>
              <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
              <SelectContent>
                {(campo.options || []).map((o) => (
                  <SelectItem key={o} value={o}>{o}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        );
      case "multiselect":
        return (
          <div key={campo.key}>
            <Label className="text-xs mb-2 block">{campo.label}</Label>
            <div className="flex flex-wrap gap-2">
              {(campo.options || []).map((o) => {
                const selected = (val || []).includes(o);
                return (
                  <button
                    key={o}
                    type="button"
                    onClick={() =>
                      setCamposEsp((p) => ({
                        ...p,
                        [campo.key]: selected
                          ? (p[campo.key] || []).filter((x: string) => x !== o)
                          : [...(p[campo.key] || []), o],
                      }))
                    }
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      selected
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {o}
                  </button>
                );
              })}
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft size={18} />
        </Button>
        <div>
          <h2 className="text-lg font-bold text-foreground">Anamnese — {servicoNome}</h2>
          <p className="text-xs text-muted-foreground">Preencha todos os campos obrigatórios</p>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {steps.map((s, i) => {
          const Icon = s.icon;
          return (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-all ${
                step === i
                  ? "bg-primary text-primary-foreground"
                  : "bg-card border border-border text-muted-foreground hover:border-primary/30"
              }`}
            >
              <Icon size={14} />
              {s.label}
            </button>
          );
        })}
      </div>

      <motion.div
        key={step}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="space-y-4"
      >
        {step === 0 && (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Label className="text-xs">Nome completo *</Label>
                <Input value={form.nome_completo} onChange={(e) => updateField("nome_completo", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs">Data de nascimento</Label>
                <Input type="date" value={form.data_nascimento} onChange={(e) => updateField("data_nascimento", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs">Sexo</Label>
                <Select value={form.sexo} onValueChange={(v) => updateField("sexo", v)}>
                  <SelectTrigger><SelectValue placeholder="Selecione" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                    <SelectItem value="outro">Outro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-xs">Profissão</Label>
                <Input value={form.profissao} onChange={(e) => updateField("profissao", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs">Telefone</Label>
                <Input value={form.telefone} onChange={(e) => updateField("telefone", e.target.value)} />
              </div>
              <div>
                <Label className="text-xs">E-mail</Label>
                <Input value={form.email} onChange={(e) => updateField("email", e.target.value)} />
              </div>
            </div>
            <div>
              <Label className="text-xs">Endereço</Label>
              <Input value={form.endereco} onChange={(e) => updateField("endereco", e.target.value)} />
            </div>
          </>
        )}

        {step === 1 && (
          <>
            <div>
              <Label className="text-xs">Queixa principal *</Label>
              <Textarea value={form.queixa_principal} onChange={(e) => updateField("queixa_principal", e.target.value)} rows={3} />
            </div>
            <div>
              <Label className="text-xs mb-2 block">Histórico de doenças</Label>
              <div className="flex flex-wrap gap-2">
                {doencasOptions.map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => toggleDoenca(d)}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-all ${
                      form.historico_doencas.includes(d)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-card border-border text-muted-foreground hover:border-primary/50"
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>
            <div>
              <Label className="text-xs">Medicamentos em uso</Label>
              <Input value={form.medicamentos_uso} onChange={(e) => updateField("medicamentos_uso", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs">Cirurgias prévias</Label>
              <Input value={form.cirurgias_previas} onChange={(e) => updateField("cirurgias_previas", e.target.value)} />
            </div>
            <div>
              <Label className="text-xs">Pressão arterial</Label>
              <Input value={form.pressao_arterial} onChange={(e) => updateField("pressao_arterial", e.target.value)} placeholder="120/80" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                <Label className="text-xs">Fumante?</Label>
                <Switch checked={form.fumante} onCheckedChange={(v) => updateField("fumante", v)} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                <Label className="text-xs">Etilista?</Label>
                <Switch checked={form.etilista} onCheckedChange={(v) => updateField("etilista", v)} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-card border border-border">
                <Label className="text-xs">Atividade física?</Label>
                <Switch checked={form.pratica_atividade_fisica} onCheckedChange={(v) => updateField("pratica_atividade_fisica", v)} />
              </div>
            </div>
            {form.pratica_atividade_fisica && (
              <div>
                <Label className="text-xs">Qual atividade?</Label>
                <Input value={form.atividade_fisica_descricao} onChange={(e) => updateField("atividade_fisica_descricao", e.target.value)} />
              </div>
            )}
            <div>
              <Label className="text-xs">Observações gerais</Label>
              <Textarea value={form.observacoes_gerais} onChange={(e) => updateField("observacoes_gerais", e.target.value)} rows={3} />
            </div>
          </>
        )}

        {step === 2 && camposEspecificos.length > 0 && (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-xs text-primary font-medium">
                Campos específicos para {servicoNome}
              </p>
            </div>
            {camposEspecificos.map(renderCampoEspecifico)}
          </div>
        )}

        {step === steps.length - 1 && (
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-primary/5 border border-primary/20">
              <p className="text-xs text-primary font-medium">
                Assinatura do paciente — confirma as informações fornecidas
              </p>
            </div>
            <SignaturePad value={assinatura} onChange={setAssinatura} />
          </div>
        )}
      </motion.div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
        {step > 0 && (
          <Button variant="outline" onClick={() => setStep(step - 1)}>
            Anterior
          </Button>
        )}
        <div className="flex-1" />
        {step < steps.length - 1 ? (
          <Button onClick={() => setStep(step + 1)}>Próximo</Button>
        ) : (
          <>
            <Button variant="outline" onClick={() => handleSave("rascunho")} disabled={saving}>
              <Save size={14} className="mr-2" />
              Salvar rascunho
            </Button>
            <Button
              onClick={() => handleSave("concluida")}
              disabled={saving || !form.nome_completo}
              className="gap-2"
            >
              <CheckCircle2 size={14} />
              Finalizar ficha
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
