import { useState, useMemo } from "react";
import { Copy, Check, ChevronDown, ChevronRight, Code2, BookOpen, Download, Layers, AlignLeft } from "lucide-react";
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

// ── Tipos ───────────────────────────────────────────────────────────────────
interface CursoEntry {
  nome: string;
  modulos: ModuloContent[];
}

type ExportMode = "completo" | "modulo" | "compacto";

// ── Catálogo completo de cursos ─────────────────────────────────────────────
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

// ── Utilitários de texto ────────────────────────────────────────────────────
function limparConteudo(texto: string): string {
  return texto
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/\*\*(.+?)\*\*/g, "$1")
    .replace(/\*(.+?)\*/g, "$1")
    .replace(/^>\s+/gm, "")
    .replace(/^-\s+/gm, "• ")
    .replace(/^\|\s*/gm, "")
    .replace(/\s*\|\s*/g, " | ")
    .replace(/^[-=]{3,}\s*$/gm, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

// Texto completo de um curso
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

// Texto de um único módulo
function gerarTextoModulo(curso: CursoEntry, moduloIndex: number): string {
  const modulo = curso.modulos[moduloIndex];
  const linhas: string[] = [];
  linhas.push(`CURSO: ${curso.nome.toUpperCase()} — MÓDULO ${moduloIndex + 1}: ${modulo.titulo}`);
  if (modulo.descricao) linhas.push(`Descrição: ${modulo.descricao}`);
  linhas.push("=".repeat(60));
  linhas.push("");
  modulo.aulas.forEach((aula, ai) => {
    linhas.push(`Aula ${moduloIndex + 1}.${ai + 1} — ${aula.titulo}`);
    if (aula.descricao) linhas.push(`Objetivo: ${aula.descricao}`);
    if (aula.duracaoMinutos) linhas.push(`Duração: ${aula.duracaoMinutos} minutos`);
    linhas.push("");
    linhas.push(limparConteudo(aula.conteudo));
    linhas.push("");
    linhas.push("· · ·");
    linhas.push("");
  });
  linhas.push("=".repeat(60));
  return linhas.join("\n");
}

// Versão compacta: só títulos + 2-3 frases de resumo por aula
function gerarTextoCompacto(curso: CursoEntry): string {
  const linhas: string[] = [];
  linhas.push(`CURSO: ${curso.nome.toUpperCase()} (versão compacta)`);
  linhas.push("=".repeat(60));
  linhas.push("");
  curso.modulos.forEach((modulo, mi) => {
    linhas.push(`MÓDULO ${mi + 1}: ${modulo.titulo}`);
    modulo.aulas.forEach((aula, ai) => {
      const conteudoLimpo = limparConteudo(aula.conteudo);
      // Pega as primeiras ~300 chars como resumo
      const resumo = conteudoLimpo.slice(0, 300).replace(/\n/g, " ").trim();
      const reticencias = conteudoLimpo.length > 300 ? "..." : "";
      linhas.push(`  ${mi + 1}.${ai + 1} ${aula.titulo}${aula.duracaoMinutos ? ` (${aula.duracaoMinutos}min)` : ""}`);
      if (resumo) linhas.push(`       ${resumo}${reticencias}`);
    });
    linhas.push("");
  });
  linhas.push("=".repeat(60));
  return linhas.join("\n");
}

// Download como arquivo .txt
function downloadTxt(nome: string, conteudo: string) {
  const blob = new Blob([conteudo], { type: "text/plain;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${nome.replace(/[^a-z0-9]/gi, "_").toLowerCase()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

// ── Bloco de um módulo individual ──────────────────────────────────────────
function ModuloRow({ curso, moduloIndex }: { curso: CursoEntry; moduloIndex: number }) {
  const [copied, setCopied] = useState(false);
  const modulo = curso.modulos[moduloIndex];
  const texto = useMemo(() => gerarTextoModulo(curso, moduloIndex), [curso, moduloIndex]);
  const chars = texto.length;
  const fitsChatGPT = chars <= 10000;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(texto);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-muted/30 border border-border/50">
      <div className="min-w-0 flex-1">
        <p className="text-xs font-medium text-foreground truncate">
          M{moduloIndex + 1}: {modulo.titulo}
        </p>
        <p className="text-[10px] text-muted-foreground">
          {modulo.aulas.length} aulas · {(chars / 1000).toFixed(1)}k chars
          {fitsChatGPT ? (
            <span className="ml-1 text-primary">✓ cabe no ChatGPT</span>
          ) : (
            <span className="ml-1 text-muted-foreground">⚠ grande, use .txt</span>
          )}
        </p>
      </div>
      <div className="flex items-center gap-1 ml-2 shrink-0">
        <Button size="sm" variant="ghost" className="h-6 px-2 text-[10px]" onClick={() => downloadTxt(`${curso.nome}_modulo${moduloIndex + 1}`, texto)}>
          <Download className="w-3 h-3" />
        </Button>
        <Button size="sm" variant="outline" className="h-6 px-2 text-[10px] gap-1" onClick={handleCopy}>
          {copied ? <><Check className="w-3 h-3" /> Ok!</> : <><Copy className="w-3 h-3" /> Copiar</>}
        </Button>
      </div>
    </div>
  );
}

// ── Componente de um único curso expandível ─────────────────────────────────
function CursoCodeBlock({ curso, mode }: { curso: CursoEntry; mode: ExportMode }) {
  const [expanded, setExpanded] = useState(false);
  const [copied, setCopied] = useState(false);

  const textoCompleto = useMemo(() => gerarTextoCurso(curso), [curso]);
  const textoCompacto = useMemo(() => gerarTextoCompacto(curso), [curso]);

  const totalAulas = curso.modulos.reduce((a, m) => a + m.aulas.length, 0);

  const textoAtivo = mode === "compacto" ? textoCompacto : textoCompleto;
  const totalChars = textoAtivo.length;
  const fitsChatGPT = totalChars <= 10000;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(textoAtivo);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const suffix = mode === "compacto" ? "_compacto" : "";
    downloadTxt(`${curso.nome}${suffix}`, textoAtivo);
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
            {curso.modulos.length} mód · {totalAulas} aulas
          </Badge>
          <span className={`text-[10px] hidden sm:block ${fitsChatGPT ? "text-green-500" : "text-amber-500"}`}>
            {(totalChars / 1000).toFixed(1)}k
            {fitsChatGPT ? " ✓" : " ⚠"}
          </span>
        </div>
      </button>

      {/* Expanded content */}
      {expanded && (
        <div className="border-t border-border">
          {/* Actions bar */}
          <div className="flex items-center justify-between px-3 pt-2 pb-1 gap-2 flex-wrap">
            <span className="text-[10px] text-muted-foreground">
              {mode === "modulo" ? "Copie módulo a módulo" : mode === "compacto" ? "Versão compacta (~resumos)" : "Texto completo da aula"}
            </span>
            <div className="flex items-center gap-1.5">
              <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={handleDownload}>
                <Download className="w-3 h-3" /> .txt
              </Button>
              {mode !== "modulo" && (
                <Button size="sm" variant="outline" className="h-7 text-xs gap-1" onClick={handleCopy}>
                  {copied ? <><Check className="w-3 h-3" /> Copiado!</> : <><Copy className="w-3 h-3" /> Copiar</>}
                </Button>
              )}
            </div>
          </div>

          {/* Módulo-by-módulo view */}
          {mode === "modulo" ? (
            <div className="px-3 pb-3 space-y-2">
              {curso.modulos.map((_, mi) => (
                <ModuloRow key={mi} curso={curso} moduloIndex={mi} />
              ))}
            </div>
          ) : (
            <pre className="text-[11px] leading-relaxed font-mono text-foreground/80 bg-muted/30 rounded-b-xl p-4 overflow-x-auto max-h-[500px] overflow-y-auto whitespace-pre-wrap">
              {textoAtivo}
            </pre>
          )}
        </div>
      )}
    </div>
  );
}

// ── Componente principal ────────────────────────────────────────────────────
export function CodigoCursosTab() {
  const [search, setSearch] = useState("");
  const [mode, setMode] = useState<ExportMode>("modulo");

  const totalAulas = TODOS_OS_CURSOS.reduce(
    (a, c) => a + c.modulos.reduce((b, m) => b + m.aulas.length, 0),
    0
  );

  const filteredCursos = useMemo(() =>
    TODOS_OS_CURSOS.filter((c) =>
      c.nome.toLowerCase().includes(search.toLowerCase())
    ),
    [search]
  );

  const modeOptions: { value: ExportMode; label: string; icon: React.ReactNode; desc: string }[] = [
    { value: "modulo", icon: <Layers className="w-3.5 h-3.5" />, label: "Por módulo", desc: "Cada módulo separado — cabe no limite" },
    { value: "compacto", icon: <AlignLeft className="w-3.5 h-3.5" />, label: "Compacto", desc: "Resumo de cada aula — bem menor" },
    { value: "completo", icon: <BookOpen className="w-3.5 h-3.5" />, label: "Completo", desc: "Conteúdo integral — baixar como .txt" },
  ];

  return (
    <div className="max-w-lg mx-auto px-4 pt-6 pb-10 space-y-5">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
          <Code2 className="w-5 h-5 text-primary" />
        </div>
        <div>
          <h2 className="font-semibold text-foreground text-base">Conteúdo para ChatGPT</h2>
          <p className="text-xs text-muted-foreground">
            {TODOS_OS_CURSOS.length} cursos · {totalAulas} aulas · limite ChatGPT: 10k chars/msg
          </p>
        </div>
      </div>

      {/* Mode selector */}
      <div className="p-1 rounded-xl bg-muted/40 border border-border space-y-1">
        <p className="text-[10px] text-muted-foreground px-2 pt-1">Modo de exportação</p>
        <div className="grid grid-cols-3 gap-1">
          {modeOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setMode(opt.value)}
              className={`flex flex-col items-center gap-1 px-2 py-2.5 rounded-lg text-center transition-colors ${
                mode === opt.value
                  ? "bg-primary text-primary-foreground"
                  : "hover:bg-muted/60 text-muted-foreground"
              }`}
            >
              {opt.icon}
              <span className="text-[10px] font-medium leading-tight">{opt.label}</span>
            </button>
          ))}
        </div>
        <p className="text-[10px] text-muted-foreground px-2 pb-1.5">
          {modeOptions.find((o) => o.value === mode)?.desc}
        </p>
      </div>

      {/* Dica contextual */}
      {mode === "completo" && (
      <div className="flex items-start gap-2 p-3 rounded-xl bg-warning/10 border border-warning/20 text-[11px] text-warning-foreground">
          <Download className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>Modo completo: baixe o <strong>.txt</strong> e faça upload direto no ChatGPT — sem limite de caracteres!</span>
        </div>
      )}
      {mode === "modulo" && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/20 text-[11px] text-primary">
          <Layers className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>Cole módulo a módulo no ChatGPT. Módulos marcados com ⚠ são grandes — use o <strong>.txt</strong> deles.</span>
        </div>
      )}
      {mode === "compacto" && (
        <div className="flex items-start gap-2 p-3 rounded-xl bg-primary/5 border border-primary/20 text-[11px] text-primary">
          <AlignLeft className="w-3.5 h-3.5 mt-0.5 shrink-0" />
          <span>Versão resumida: títulos + início de cada aula. Ótimo para dar contexto ao ChatGPT sem travar no limite.</span>
        </div>
      )}

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
            <CursoCodeBlock key={curso.nome} curso={curso} mode={mode} />
          ))
        )}
      </div>
    </div>
  );
}
