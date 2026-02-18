import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Upload, Plus, X, Send, Award, CheckCircle2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AppLayout } from "@/components/AppLayout";
import { useMarketplaceCandidatura } from "../hooks/useMarketplace";
import { Label } from "@/components/ui/label";

const ESPECIALIDADES_OPTIONS = [
  "Massoterapia", "Head SPA", "Liberação Miofascial", "Drenagem Linfática",
  "Aromaterapia", "Seitai", "Dry Needling", "Reflexologia",
  "Shiatsu", "Massagem Modeladora", "Ventosaterapia", "Bandagem Elástica",
  "Quiropraxia", "Acupuntura", "Yoga", "Pilates",
];

const ESTADOS_BR = [
  "AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG","PA",
  "PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"
];

export default function MarketplaceCandidatura() {
  const navigate = useNavigate();
  const { submitCandidatura, loading } = useMarketplaceCandidatura();
  const [enviado, setEnviado] = useState(false);

  const [form, setForm] = useState({
    nome_completo: "",
    email: "",
    telefone: "",
    cpf: "",
    especialidades: [] as string[],
    experiencia_anos: 0,
    bio: "",
    cidade: "",
    estado: "",
    bairros_atendimento: [] as string[],
    atende_domicilio: false,
    preco_minimo: 0,
    preco_maximo: 0,
  });

  const [novoBairro, setNovoBairro] = useState("");

  const toggleEspecialidade = (esp: string) => {
    setForm(prev => ({
      ...prev,
      especialidades: prev.especialidades.includes(esp)
        ? prev.especialidades.filter(e => e !== esp)
        : [...prev.especialidades, esp],
    }));
  };

  const addBairro = () => {
    if (novoBairro.trim() && !form.bairros_atendimento.includes(novoBairro.trim())) {
      setForm(prev => ({ ...prev, bairros_atendimento: [...prev.bairros_atendimento, novoBairro.trim()] }));
      setNovoBairro("");
    }
  };

  const handleSubmit = async () => {
    const { error } = await submitCandidatura(form);
    if (!error) setEnviado(true);
  };

  if (enviado) {
    return (
      <AppLayout>
        <div className="min-h-screen bg-background flex items-center justify-center px-4">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="glass-card rounded-2xl p-8 text-center max-w-sm mx-auto space-y-4"
          >
            <div className="w-16 h-16 mx-auto rounded-2xl bg-highlight/20 flex items-center justify-center">
              <CheckCircle2 size={32} className="text-highlight" />
            </div>
            <h2 className="text-xl font-bold text-foreground">Candidatura enviada!</h2>
            <p className="text-sm text-muted-foreground">
              Analisaremos sua candidatura em até 48 horas. Você receberá uma notificação com o resultado.
            </p>
            <Button onClick={() => navigate("/marketplace")} className="w-full rounded-xl">
              Voltar ao Marketplace
            </Button>
          </motion.div>
        </div>
      </AppLayout>
    );
  }

  return (
    <AppLayout>
      <div className="min-h-screen bg-background pb-32 lg:pb-8">
        <div className="px-4 py-4 safe-top">
          <div className="max-w-lg mx-auto flex items-center gap-4">
            <button onClick={() => navigate(-1)} className="p-2 rounded-xl hover:bg-muted/50 transition-colors">
              <ArrowLeft size={22} className="text-foreground" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Seja um Terapeuta</h1>
              <p className="text-xs text-muted-foreground">Junte-se ao marketplace Resinkra</p>
            </div>
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 space-y-6">
          {/* Benefícios */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card rounded-2xl p-4 space-y-3"
          >
            <div className="flex items-center gap-2">
              <Award size={20} className="text-primary" />
              <h2 className="font-semibold text-foreground">Por que se juntar?</h2>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {[
                "Visibilidade para milhares de clientes",
                "Agenda e pagamentos integrados",
                "Badge de verificação",
                "Comissão competitiva de apenas 15%",
              ].map((b, i) => (
                <div key={i} className="flex items-start gap-1.5">
                  <CheckCircle2 size={14} className="text-highlight shrink-0 mt-0.5" />
                  <p className="text-xs text-muted-foreground">{b}</p>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div className="col-span-2">
                <Label className="text-xs">Nome completo</Label>
                <Input value={form.nome_completo} onChange={e => setForm({...form, nome_completo: e.target.value})} className="rounded-xl" />
              </div>
              <div>
                <Label className="text-xs">Email</Label>
                <Input type="email" value={form.email} onChange={e => setForm({...form, email: e.target.value})} className="rounded-xl" />
              </div>
              <div>
                <Label className="text-xs">Telefone</Label>
                <Input value={form.telefone} onChange={e => setForm({...form, telefone: e.target.value})} className="rounded-xl" />
              </div>
              <div>
                <Label className="text-xs">CPF</Label>
                <Input value={form.cpf} onChange={e => setForm({...form, cpf: e.target.value})} className="rounded-xl" />
              </div>
              <div>
                <Label className="text-xs">Experiência (anos)</Label>
                <Input type="number" min={0} value={form.experiencia_anos} onChange={e => setForm({...form, experiencia_anos: parseInt(e.target.value) || 0})} className="rounded-xl" />
              </div>
            </div>

            <div>
              <Label className="text-xs mb-2 block">Especialidades</Label>
              <div className="flex flex-wrap gap-1.5">
                {ESPECIALIDADES_OPTIONS.map(esp => (
                  <button
                    key={esp}
                    onClick={() => toggleEspecialidade(esp)}
                    className={`text-xs px-2.5 py-1 rounded-full border transition-colors ${
                      form.especialidades.includes(esp)
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-border hover:border-primary/50"
                    }`}
                  >
                    {esp}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label className="text-xs">Sobre você</Label>
              <Textarea
                value={form.bio}
                onChange={e => setForm({...form, bio: e.target.value})}
                className="rounded-xl"
                rows={3}
                placeholder="Conte sobre sua formação e experiência..."
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Cidade</Label>
                <Input value={form.cidade} onChange={e => setForm({...form, cidade: e.target.value})} className="rounded-xl" />
              </div>
              <div>
                <Label className="text-xs">Estado</Label>
                <select
                  value={form.estado}
                  onChange={e => setForm({...form, estado: e.target.value})}
                  className="w-full text-sm px-3 py-2 rounded-xl border border-border bg-background text-foreground"
                >
                  <option value="">Selecione</option>
                  {ESTADOS_BR.map(uf => <option key={uf} value={uf}>{uf}</option>)}
                </select>
              </div>
            </div>

            {/* Bairros */}
            <div>
              <Label className="text-xs mb-1 block">Bairros de atendimento</Label>
              <div className="flex gap-2">
                <Input value={novoBairro} onChange={e => setNovoBairro(e.target.value)} placeholder="Nome do bairro" className="rounded-xl" onKeyDown={e => e.key === "Enter" && addBairro()} />
                <Button variant="outline" size="icon" onClick={addBairro} className="rounded-xl shrink-0">
                  <Plus size={16} />
                </Button>
              </div>
              {form.bairros_atendimento.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {form.bairros_atendimento.map(b => (
                    <span key={b} className="text-xs px-2 py-0.5 rounded-full bg-muted flex items-center gap-1">
                      {b}
                      <button onClick={() => setForm(prev => ({...prev, bairros_atendimento: prev.bairros_atendimento.filter(x => x !== b)}))}>
                        <X size={10} />
                      </button>
                    </span>
                  ))}
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label className="text-xs">Preço mínimo (R$)</Label>
                <Input type="number" min={0} value={form.preco_minimo} onChange={e => setForm({...form, preco_minimo: parseFloat(e.target.value) || 0})} className="rounded-xl" />
              </div>
              <div>
                <Label className="text-xs">Preço máximo (R$)</Label>
                <Input type="number" min={0} value={form.preco_maximo} onChange={e => setForm({...form, preco_maximo: parseFloat(e.target.value) || 0})} className="rounded-xl" />
              </div>
            </div>

            <label className="flex items-center gap-2">
              <input type="checkbox" checked={form.atende_domicilio} onChange={e => setForm({...form, atende_domicilio: e.target.checked})} className="rounded" />
              <span className="text-sm text-foreground">Atendo a domicílio</span>
            </label>

            <Button
              className="w-full rounded-xl h-12"
              disabled={loading || !form.nome_completo || !form.email || !form.cpf || form.especialidades.length === 0 || !form.cidade || !form.estado}
              onClick={handleSubmit}
            >
              <Send size={16} className="mr-2" />
              {loading ? "Enviando..." : "Enviar candidatura"}
            </Button>
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
