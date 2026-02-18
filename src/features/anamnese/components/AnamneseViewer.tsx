import { ArrowLeft, Printer, Edit3, CheckCircle2, Calendar, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FichaAnamnese } from "../hooks/useFichasAnamnese";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { CampoTemplate } from "../hooks/useAnamneseTemplates";

interface Props {
  ficha: FichaAnamnese;
  camposTemplate: CampoTemplate[];
  onBack: () => void;
  onEdit: () => void;
}

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h3 className="text-sm font-bold text-foreground border-b border-border pb-2 mb-3">{children}</h3>
);

const Field = ({ label, value }: { label: string; value: any }) => {
  if (value === null || value === undefined || value === "" || (Array.isArray(value) && value.length === 0)) return null;
  const display = Array.isArray(value) ? value.join(", ") : typeof value === "boolean" ? (value ? "Sim" : "Não") : String(value);
  return (
    <div className="py-1.5">
      <span className="text-xs text-muted-foreground">{label}</span>
      <p className="text-sm font-medium text-foreground">{display}</p>
    </div>
  );
};

export function AnamneseViewer({ ficha, camposTemplate, onBack, onEdit }: Props) {
  const handlePrint = () => window.print();

  return (
    <div className="space-y-6 print:space-y-4" id="anamnese-print">
      <div className="flex items-center gap-3 print:hidden">
        <Button variant="ghost" size="icon" onClick={onBack}>
          <ArrowLeft size={18} />
        </Button>
        <div className="flex-1">
          <h2 className="text-lg font-bold text-foreground">{ficha.nome_completo}</h2>
          <p className="text-xs text-muted-foreground">{ficha.servico_nome}</p>
        </div>
        <Badge variant={ficha.status === "concluida" ? "default" : "secondary"} className="gap-1">
          {ficha.status === "concluida" ? <CheckCircle2 size={12} /> : <Edit3 size={12} />}
          {ficha.status === "concluida" ? "Concluída" : "Rascunho"}
        </Badge>
      </div>

      <div className="flex gap-2 print:hidden">
        <Button variant="outline" size="sm" onClick={onEdit} className="gap-2">
          <Edit3 size={14} /> Editar
        </Button>
        <Button variant="outline" size="sm" onClick={handlePrint} className="gap-2">
          <Printer size={14} /> Imprimir
        </Button>
      </div>

      {/* Print header */}
      <div className="hidden print:block text-center mb-4">
        <h1 className="text-xl font-bold">RESINKRA — Ficha de Anamnese</h1>
        <p className="text-sm">{ficha.servico_nome}</p>
        <p className="text-xs text-muted-foreground">
          Data: {format(new Date(ficha.created_at), "dd/MM/yyyy HH:mm", { locale: ptBR })}
        </p>
      </div>

      <div className="bg-card border border-border rounded-xl p-5 space-y-6 print:border-none print:p-0">
        <div>
          <SectionTitle>Dados Pessoais</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            <Field label="Nome completo" value={ficha.nome_completo} />
            <Field label="Data de nascimento" value={ficha.data_nascimento ? format(new Date(ficha.data_nascimento), "dd/MM/yyyy") : null} />
            <Field label="Sexo" value={ficha.sexo} />
            <Field label="Profissão" value={ficha.profissao} />
            <Field label="Telefone" value={ficha.telefone} />
            <Field label="E-mail" value={ficha.email} />
            <Field label="Endereço" value={ficha.endereco} />
          </div>
        </div>

        <div>
          <SectionTitle>Histórico Médico</SectionTitle>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
            <Field label="Queixa principal" value={ficha.queixa_principal} />
            <Field label="Doenças" value={ficha.historico_doencas} />
            <Field label="Medicamentos" value={ficha.medicamentos_uso} />
            <Field label="Alergias" value={ficha.alergias} />
            <Field label="Cirurgias prévias" value={ficha.cirurgias_previas} />
            <Field label="Pressão arterial" value={ficha.pressao_arterial} />
            <Field label="Fumante" value={ficha.fumante} />
            <Field label="Etilista" value={ficha.etilista} />
            <Field label="Atividade física" value={ficha.pratica_atividade_fisica} />
            <Field label="Atividade" value={ficha.atividade_fisica_descricao} />
          </div>
        </div>

        {camposTemplate.length > 0 && Object.keys(ficha.campos_especificos || {}).length > 0 && (
          <div>
            <SectionTitle>Avaliação Específica — {ficha.servico_nome}</SectionTitle>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6">
              {camposTemplate.map((c) => (
                <Field key={c.key} label={c.label} value={ficha.campos_especificos?.[c.key]} />
              ))}
            </div>
          </div>
        )}

        <Field label="Observações gerais" value={ficha.observacoes_gerais} />

        {ficha.assinatura_paciente && (
          <div>
            <SectionTitle>Assinatura do Paciente</SectionTitle>
            <img src={ficha.assinatura_paciente} alt="Assinatura" className="max-w-xs h-24 border rounded-lg" />
            {ficha.assinatura_data && (
              <p className="text-xs text-muted-foreground mt-1">
                Assinado em {format(new Date(ficha.assinatura_data), "dd/MM/yyyy HH:mm", { locale: ptBR })}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
