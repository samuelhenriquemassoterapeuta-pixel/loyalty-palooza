import { useState, useMemo } from "react";
import { Copy, Check, ChevronDown, ChevronRight, Code2, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// ── Importações de todos os cursos ─────────────────────────────────────────
import { cursoMetodoResinkraData } from "@/features/cursos/data/cursoMetodoResinkraContent";
import { cursoVendasData } from "@/features/cursos/data/cursoVendasContent";
import { cursoAromaterapiaData } from "@/features/cursos/data/cursoAromaterapiaContent";
import { cursoHeadSpaData } from "@/features/cursos/data/cursoHeadSpaContent";
import { cursoAnatomiaData } from "@/features/cursos/data/cursoAnatomiaContent";
import { cursoYugenFaceSpaData } from "@/features/cursos/data/cursoYugenFaceSpaContent";
import { cursoPerfumariaNaturalData } from "@/features/cursos/data/cursoPerfumariaNaturalContent";
import { cursoVelasAromaticasData } from "@/features/cursos/data/cursoVelasAromaticasContent";
import { cursoSaboariaArtesanalData } from "@/features/cursos/data/cursoSaboariaArtesanalContent";
import { cursoDifusorAmbientesData } from "@/features/cursos/data/cursoDifusorAmbientesContent";
import { cursoFitoterapiaData } from "@/features/cursos/data/cursoFitoterapiaContent";
import { cursoOleosEssenciaisData } from "@/features/cursos/data/cursoOleosEssenciaisContent";
import { cursoMassagemModeladoraData } from "@/features/cursos/data/cursoMassagemModeladoraContent";
import { cursoDrenagemLinfaticaData } from "@/features/cursos/data/cursoDrenagemLinfaticaContent";
import { cursoGastronomiaSaudavelData } from "@/features/cursos/data/cursoGastronomiaSaudavelContent";
import { cursoSeitaiData } from "@/features/cursos/data/cursoSeitaiContent";
import { cursoBandagemElasticaData } from "@/features/cursos/data/cursoBandagemElasticaContent";
import { cursoFitoterapiaAplicadaData } from "@/features/cursos/data/cursoFitoterapiaAplicadaContent";
import { cursoGestantesData } from "@/features/cursos/data/cursoGestantesContent";
import { cursoNeurocienciaData } from "@/features/cursos/data/cursoNeurocienciaContent";
import { cursoGeriatricaData } from "@/features/cursos/data/cursoGeriatricaContent";
import { cursoEsportivaData } from "@/features/cursos/data/cursoEsportivaContent";
import { cursoMarketingDigitalData } from "@/features/cursos/data/cursoMarketingDigitalContent";
import { cursoPetMassageData } from "@/features/cursos/data/cursoPetMassageContent";
import { cursoMindfulnessData } from "@/features/cursos/data/cursoMindfulnessContent";
import { cursoMtcIntroData } from "@/features/cursos/data/cursoMtcIntroContent";
import { cursoMeridianosData } from "@/features/cursos/data/cursoMeridianosContent";
import { cursoVentosaterapiaData } from "@/features/cursos/data/cursoVentosaterapiaContent";
import { cursoMoxabustaoData } from "@/features/cursos/data/cursoMoxabustaoContent";
import { cursoAuriculoterapiaData } from "@/features/cursos/data/cursoAuriculoterapiaContent";
import { cursoTuiNaData } from "@/features/cursos/data/cursoTuiNaContent";
import { cursoDiagnosticoMtcData } from "@/features/cursos/data/cursoDiagnosticoMtcContent";
import { cursoFitoterapiaChinContent } from "@/features/cursos/data/cursoFitoterapiaChinContent";
import { cursoQiGongData } from "@/features/cursos/data/cursoQiGongContent";
import { cursoAlimentacaoChinesaData } from "@/features/cursos/data/cursoAlimentacaoChinesaContent";
import type { ModuloContent } from "@/features/cursos/data/cursoVendasContent";

// ── Catálogo completo de cursos ─────────────────────────────────────────────
interface CursoEntry {
  nome: string;
  modulos: ModuloContent[];
}

const TODOS_OS_CURSOS: CursoEntry[] = [
  { nome: "Método Resinkra", modulos: cursoMetodoResinkraData },
  { nome: "Vendas para Terapeutas", modulos: cursoVendasData },
  { nome: "Aromaterapia", modulos: cursoAromaterapiaData },
  { nome: "Head SPA", modulos: cursoHeadSpaData },
  { nome: "Anatomia & Fisiologia", modulos: cursoAnatomiaData },
  { nome: "Yūgen FaceSPA", modulos: cursoYugenFaceSpaData },
  { nome: "Perfumaria Natural", modulos: cursoPerfumariaNaturalData },
  { nome: "Velas Aromáticas", modulos: cursoVelasAromaticasData },
  { nome: "Saboaria Artesanal", modulos: cursoSaboariaArtesanalData },
  { nome: "Difusor de Ambientes", modulos: cursoDifusorAmbientesData },
  { nome: "Fitoterapia", modulos: cursoFitoterapiaData },
  { nome: "Óleos Essenciais", modulos: cursoOleosEssenciaisData },
  { nome: "Massagem Modeladora", modulos: cursoMassagemModeladoraData },
  { nome: "Drenagem Linfática", modulos: cursoDrenagemLinfaticaData },
  { nome: "Gastronomia Saudável", modulos: cursoGastronomiaSaudavelData },
  { nome: "Seitai e New Seitai", modulos: cursoSeitaiData },
  { nome: "Bandagem Elástica", modulos: cursoBandagemElasticaData },
  { nome: "Fitoterapia Aplicada", modulos: cursoFitoterapiaAplicadaData },
  { nome: "Gestantes", modulos: cursoGestantesData },
  { nome: "Neurociência da Dor", modulos: cursoNeurocienciaData },
  { nome: "Massagem Geriátrica", modulos: cursoGeriatricaData },
  { nome: "Massagem Esportiva", modulos: cursoEsportivaData },
  { nome: "Marketing Digital", modulos: cursoMarketingDigitalData },
  { nome: "Pet Massage", modulos: cursoPetMassageData },
  { nome: "Mindfulness", modulos: cursoMindfulnessData },
  { nome: "Introdução à MTC", modulos: cursoMtcIntroData },
  { nome: "Meridianos e Pontos", modulos: cursoMeridianosData },
  { nome: "Ventosaterapia", modulos: cursoVentosaterapiaData },
  { nome: "Moxabustão", modulos: cursoMoxabustaoData },
  { nome: "Auriculoterapia", modulos: cursoAuriculoterapiaData },
  { nome: "Tui Na", modulos: cursoTuiNaData },
  { nome: "Diagnóstico MTC", modulos: cursoDiagnosticoMtcData },
  { nome: "Fitoterapia Chinesa", modulos: cursoFitoterapiaChinContent },
  { nome: "Qi Gong", modulos: cursoQiGongData },
  { nome: "Dietética Chinesa", modulos: cursoAlimentacaoChinesaData },
];

// ── Remove sintaxe markdown para texto limpo (ChatGPT-friendly) ─────────────
function limparConteudo(texto: string): string {
  return texto
    .replace(/^#{1,6}\s+/gm, "")          // remove headings (#, ##, etc.)
    .replace(/\*\*(.+?)\*\*/g, "$1")        // remove negrito **texto**
    .replace(/\*(.+?)\*/g, "$1")            // remove itálico *texto*
    .replace(/^>\s+/gm, "")               // remove blockquotes >
    .replace(/^-\s+/gm, "• ")             // transforma - em bullet •
    .replace(/^\|\s*/gm, "")              // remove pipes de tabela inicial
    .replace(/\s*\|\s*/g, " | ")          // normaliza separadores de tabela
    .replace(/^[-=]{3,}\s*$/gm, "")       // remove linhas separadoras --- ===
    .replace(/\n{3,}/g, "\n\n")           // máximo 2 quebras de linha seguidas
    .trim();
}

// ── Gera texto limpo de um curso (otimizado para colar no ChatGPT) ──────────
function gerarTextoCurso(curso: CursoEntry): string {
  const totalAulas = curso.modulos.reduce((a, m) => a + m.aulas.length, 0);
  const linhas: string[] = [];

  linhas.push(`CURSO: ${curso.nome.toUpperCase()}`);
  linhas.push(`Módulos: ${curso.modulos.length} | Aulas: ${totalAulas}`);
  linhas.push("=".repeat(60));
  linhas.push("");

  curso.modulos.forEach((modulo, mi) => {
    linhas.push(`MÓDULO ${mi + 1}: ${modulo.titulo}`);
    if (modulo.descricao) linhas.push(`Descrição: ${modulo.descricao}`);
    linhas.push("-".repeat(50));
    linhas.push("");

    modulo.aulas.forEach((aula, ai) => {
      linhas.push(`Aula ${mi + 1}.${ai + 1} — ${aula.titulo}`);
      if (aula.descricao) linhas.push(`Objetivo: ${aula.descricao}`);
      if (aula.duracaoMinutos) linhas.push(`Duração: ${aula.duracaoMinutos} minutos`);
      linhas.push("");
      linhas.push(limparConteudo(aula.conteudo));
      linhas.push("");
      linhas.push("· · ·");
      linhas.push("");
    });

    linhas.push("");
  });

  linhas.push("=".repeat(60));
  linhas.push(`Fim do curso: ${curso.nome}`);

  return linhas.join("\n");
}

// ── Gera texto de TODOS os cursos concatenados ──────────────────────────────
function gerarTextoCompleto(): string {
  return TODOS_OS_CURSOS.map((c) => gerarTextoCurso(c)).join("\n\n\n");
}

// ── Componente de um único curso expandível ─────────────────────────────────
function CursoCodeBlock({ curso }: { curso: CursoEntry }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const texto = useMemo(() => gerarTextoCurso(curso), [curso]);
  const totalAulas = curso.modulos.reduce((a, m) => a + m.aulas.length, 0);
  const totalChars = texto.length;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(texto);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="border border-border rounded-xl overflow-hidden bg-card">
      {/* Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center justify-between px-4 py-3 hover:bg-muted/40 transition-colors text-left"
      >
        <div className="flex items-center gap-3 min-w-0">
          {expanded ? (
            <ChevronDown className="w-4 h-4 text-muted-foreground shrink-0" />
          ) : (
            <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
          )}
          <span className="font-medium text-sm text-foreground truncate">{curso.nome}</span>
        </div>
        <div className="flex items-center gap-2 shrink-0 ml-2">
          <Badge variant="outline" className="text-[10px] px-1.5 py-0">
            {curso.modulos.length} módulos · {totalAulas} aulas
          </Badge>
          <span className="text-[10px] text-muted-foreground hidden sm:block">
            {(totalChars / 1000).toFixed(1)}k chars
          </span>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-border">
          <div className="flex items-center justify-between px-3 pt-2 pb-1">
            <span className="text-[10px] text-muted-foreground">
              Texto pronto para colar no ChatGPT
            </span>
            <Button
              size="sm"
              variant="outline"
              className="h-7 text-xs gap-1.5"
              onClick={handleCopy}
            >
              {copied ? (
                <><Check className="w-3 h-3" /> Copiado!</>
              ) : (
                <><Copy className="w-3 h-3" /> Copiar curso</>
              )}
            </Button>
          </div>
          <pre className="text-[11px] leading-relaxed font-mono text-foreground/80 bg-muted/30 rounded-b-xl p-4 overflow-x-auto max-h-[500px] overflow-y-auto whitespace-pre-wrap">
            {texto}
          </pre>
        </div>
      )}
    </div>
  );
}

// ── Componente principal ────────────────────────────────────────────────────
export function CodigoCursosTab() {
  const [copiedAll, setCopiedAll] = useState(false);
  const [search, setSearch] = useState("");

  const textoCompleto = useMemo(() => gerarTextoCompleto(), []);
  const totalAulas = TODOS_OS_CURSOS.reduce(
    (a, c) => a + c.modulos.reduce((b, m) => b + m.aulas.length, 0),
    0
  );
  const totalChars = textoCompleto.length;

  const filteredCursos = useMemo(() =>
    TODOS_OS_CURSOS.filter((c) =>
      c.nome.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  const handleCopyAll = async () => {
    await navigator.clipboard.writeText(textoCompleto);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 3000);
  };

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-10 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Code2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground text-base">Conteúdo dos Cursos para ChatGPT</h2>
          <p className="text-xs text-muted-foreground">
            {TODOS_OS_CURSOS.length} cursos · {totalAulas} aulas · {(totalChars / 1000).toFixed(0)}k chars · texto limpo
          </p>
        </div>
      </div>

      {/* Info + copy all */}
      <div className="flex items-center justify-between p-4 rounded-xl bg-muted/40 border border-border">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">
            Texto limpo, sem sintaxe — cole curso a curso no ChatGPT
          </span>
        </div>
        <Button
          size="sm"
          variant="default"
          className="h-8 text-xs gap-1.5 shrink-0 ml-2"
          onClick={handleCopyAll}
        >
          {copiedAll ? (
            <><Check className="w-3 h-3" /> Copiado!</>
          ) : (
            <><Copy className="w-3 h-3" /> Copiar tudo</>
          )}
        </Button>
      </div>

      {/* Search */}
      <input
        type="search"
        placeholder="Buscar curso..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full px-3 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30"
      />

      {/* Course list */}
      <div className="space-y-2">
        {filteredCursos.length === 0 ? (
          <p className="text-center text-sm text-muted-foreground py-8">
            Nenhum curso encontrado.
          </p>
        ) : (
          filteredCursos.map((curso) => (
            <CursoCodeBlock key={curso.nome} curso={curso} />
          ))
        )}
      </div>
    </div>
  );
}
