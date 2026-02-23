import { useState, useEffect } from "react";
import DOMPurify from "dompurify";
import { motion } from "framer-motion";
import { Download, Copy, Check, RefreshCw, FileText, Hash, AlignLeft, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const MarkdownRenderer = ({ content }: { content: string }) => {
  // Simple markdown renderer - converts headers, tables, code blocks, bold, lists
  const lines = content.split("\n");
  const elements: JSX.Element[] = [];
  let inCodeBlock = false;
  let codeLines: string[] = [];
  let codeTitle = "";
  let inTable = false;
  let tableRows: string[][] = [];

  const flushTable = (key: string) => {
    if (tableRows.length < 2) return null;
    const headers = tableRows[0];
    const rows = tableRows.slice(2); // skip separator row
    const el = (
      <div key={key} className="overflow-x-auto my-3">
        <table className="w-full text-[11px] border-collapse">
          <thead>
            <tr>
              {headers.map((h, i) => (
                <th key={i} className="text-left p-2 border-b-2 border-border font-semibold text-foreground bg-muted/30">
                  {h.trim()}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, ri) => (
              <tr key={ri} className="border-b border-border/40 hover:bg-muted/20">
                {row.map((cell, ci) => (
                  <td key={ci} className="p-2 text-muted-foreground">
                    <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(cell.trim().replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>').replace(/`(.*?)`/g, '<code class="px-1 py-0.5 rounded bg-muted text-[10px] font-mono text-primary">$1</code>'), { ALLOWED_TAGS: ['strong', 'code', 'em', 'b', 'i'], ALLOWED_ATTR: ['class'] }) }} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
    tableRows = [];
    return el;
  };

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const key = `line-${i}`;

    // Code blocks
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <div key={key} className="my-3 rounded-lg border border-border overflow-hidden">
            {codeTitle && (
              <div className="px-3 py-1.5 bg-muted/50 border-b border-border text-[10px] font-medium text-muted-foreground">
                {codeTitle}
              </div>
            )}
            <pre className="p-3 text-[11px] overflow-x-auto bg-card text-foreground leading-relaxed font-mono">
              <code>{codeLines.join("\n")}</code>
            </pre>
          </div>
        );
        codeLines = [];
        codeTitle = "";
        inCodeBlock = false;
      } else {
        // Flush table if active
        if (inTable) {
          const tbl = flushTable(`table-${i}`);
          if (tbl) elements.push(tbl);
          inTable = false;
        }
        inCodeBlock = true;
        codeTitle = line.replace(/```/g, "").trim();
      }
      continue;
    }

    if (inCodeBlock) {
      codeLines.push(line);
      continue;
    }

    // Table rows
    if (line.trim().startsWith("|")) {
      if (!inTable) inTable = true;
      const cells = line.split("|").filter((_, idx, arr) => idx > 0 && idx < arr.length - 1);
      tableRows.push(cells);
      continue;
    } else if (inTable) {
      const tbl = flushTable(`table-${i}`);
      if (tbl) elements.push(tbl);
      inTable = false;
    }

    // Headers
    if (line.startsWith("# ")) {
      elements.push(<h1 key={key} className="text-xl font-bold text-foreground mt-6 mb-2">{line.replace(/^# /, "")}</h1>);
    } else if (line.startsWith("## ")) {
      elements.push(
        <h2 key={key} id={line.replace(/^## /, "").replace(/[^\w]/g, "-").toLowerCase()} className="text-lg font-bold text-foreground mt-6 mb-2 pt-4 border-t border-border/40 scroll-mt-4">
          {line.replace(/^## /, "")}
        </h2>
      );
    } else if (line.startsWith("### ")) {
      elements.push(<h3 key={key} className="text-sm font-bold text-foreground mt-4 mb-1">{line.replace(/^### /, "")}</h3>);
    } else if (line.startsWith("> ")) {
      elements.push(
        <blockquote key={key} className="border-l-2 border-primary/40 pl-3 py-1 my-2 text-xs text-muted-foreground italic">
          {line.replace(/^> /, "")}
        </blockquote>
      );
    } else if (line.startsWith("- ")) {
      elements.push(
        <div key={key} className="flex items-start gap-2 ml-2 text-xs text-muted-foreground">
          <span className="text-primary mt-0.5">•</span>
          <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(line.replace(/^- /, "").replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>').replace(/`(.*?)`/g, '<code class="px-1 py-0.5 rounded bg-muted text-[10px] font-mono text-primary">$1</code>'), { ALLOWED_TAGS: ['strong', 'code', 'em', 'b', 'i'], ALLOWED_ATTR: ['class'] }) }} />
        </div>
      );
    } else if (line.startsWith("---")) {
      elements.push(<hr key={key} className="my-4 border-border/40" />);
    } else if (line.trim() === "") {
      elements.push(<div key={key} className="h-1" />);
    } else {
      elements.push(
        <p key={key} className="text-xs text-muted-foreground leading-relaxed">
          <span dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(line.replace(/\*\*(.*?)\*\*/g, '<strong class="text-foreground">$1</strong>').replace(/`(.*?)`/g, '<code class="px-1 py-0.5 rounded bg-muted text-[10px] font-mono text-primary">$1</code>'), { ALLOWED_TAGS: ['strong', 'code', 'em', 'b', 'i'], ALLOWED_ATTR: ['class'] }) }} />
        </p>
      );
    }
  }

  // Flush remaining table
  if (inTable) {
    const tbl = flushTable("table-end");
    if (tbl) elements.push(tbl);
  }

  return <div className="space-y-0.5">{elements}</div>;
};

export const DocumentationViewer = () => {
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [syncing, setSyncing] = useState(false);
  const lastUpdated = "23/02/2026";

  useEffect(() => {
    loadDocumentation();
  }, []);

  const loadDocumentation = async () => {
    setLoading(true);
    try {
      // Try DB first
      const { data } = await supabase
        .from("documentation_versions")
        .select("content")
        .eq("is_current", true)
        .maybeSingle();

      if (data?.content) {
        setContent(data.content);
      } else {
        // Fallback to static file
        const response = await fetch("/docs/plataforma-completa.md");
        const text = await response.text();
        setContent(text);
      }
    } catch {
      const response = await fetch("/docs/plataforma-completa.md");
      const text = await response.text();
      setContent(text);
    }
    setLoading(false);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    toast.success("Documentação copiada para a área de transferência");
    setTimeout(() => setCopied(false), 2000);
  };

  const downloadMarkdown = () => {
    const blob = new Blob([content], { type: "text/markdown" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Resinkra-Documentacao-${lastUpdated.replace(/\//g, "-")}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const syncFromDatabase = async () => {
    setSyncing(true);
    await loadDocumentation();
    setSyncing(false);
    toast.success("Documentação sincronizada");
  };

  const stats = {
    lines: content.split("\n").length,
    chars: content.length,
    sections: (content.match(/^## /gm) || []).length,
    tables: (content.match(/^\|/gm) || []).length,
  };

  // Extract section anchors for quick links
  const sections = (content.match(/^## .+$/gm) || []).map((s) => ({
    label: s.replace(/^## /, ""),
    id: s.replace(/^## /, "").replace(/[^\w]/g, "-").toLowerCase(),
  }));

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <RefreshCw className="w-6 h-6 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="p-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-primary/10">
              <FileText size={22} className="text-primary" />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground">📚 Documentação da Plataforma</h3>
              <p className="text-[11px] text-muted-foreground">
                Versão completa • Atualizada em {lastUpdated}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={syncFromDatabase} disabled={syncing} className="gap-1.5 text-xs">
              <RefreshCw size={13} className={syncing ? "animate-spin" : ""} />
              Sincronizar
            </Button>
            <Button variant="outline" size="sm" onClick={copyToClipboard} className="gap-1.5 text-xs">
              {copied ? <Check size={13} className="text-green-500" /> : <Copy size={13} />}
              {copied ? "Copiado!" : "Copiar"}
            </Button>
            <Button size="sm" onClick={downloadMarkdown} className="gap-1.5 text-xs">
              <Download size={13} />
              Download .md
            </Button>
          </div>
        </div>
      </Card>

      {/* Stats + Quick Links */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2">
        <Card className="p-3 text-center">
          <AlignLeft size={14} className="mx-auto mb-1 text-primary" />
          <div className="text-lg font-bold text-foreground">{stats.lines}</div>
          <div className="text-[10px] text-muted-foreground">Linhas</div>
        </Card>
        <Card className="p-3 text-center">
          <Hash size={14} className="mx-auto mb-1 text-primary" />
          <div className="text-lg font-bold text-foreground">{(stats.chars / 1000).toFixed(1)}k</div>
          <div className="text-[10px] text-muted-foreground">Caracteres</div>
        </Card>
        <Card className="p-3 text-center">
          <Layers size={14} className="mx-auto mb-1 text-primary" />
          <div className="text-lg font-bold text-foreground">{stats.sections}</div>
          <div className="text-[10px] text-muted-foreground">Seções</div>
        </Card>
        <Card className="p-3 text-center">
          <FileText size={14} className="mx-auto mb-1 text-primary" />
          <div className="text-lg font-bold text-foreground">{stats.tables}</div>
          <div className="text-[10px] text-muted-foreground">Tabelas</div>
        </Card>
      </div>

      {/* Quick Links */}
      {sections.length > 0 && (
        <Card className="p-3">
          <p className="text-[11px] font-semibold text-foreground mb-2">🔗 Links Rápidos</p>
          <div className="flex flex-wrap gap-1.5">
            {sections.map((s) => (
              <a
                key={s.id}
                href={`#${s.id}`}
                className="text-[10px] px-2 py-1 rounded-md bg-muted/50 text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
              >
                {s.label}
              </a>
            ))}
          </div>
        </Card>
      )}

      {/* Rendered Markdown */}
      <Card className="p-4 sm:p-6">
        <MarkdownRenderer content={content} />
      </Card>

      {/* Update Log */}
      <Card className="p-3">
        <p className="text-[11px] font-semibold text-foreground mb-2">🔄 Últimas Atualizações</p>
        <div className="space-y-1">
          {[
            { date: "23/02/2026", text: "Atualização completa: 175 tabelas, 450 RLS, 88 funções, 61 edge functions, 12 buckets" },
            { date: "23/02/2026", text: "Marketing: Dashboard + Automações + Segmentação de banners" },
            { date: "23/02/2026", text: "Platform Editor: dados da empresa (contato, endereço, redes sociais)" },
            { date: "22/02/2026", text: "Editor da Plataforma + Versionamento de docs" },
            { date: "20/02/2026", text: "Sistema Multi-Agente Resi (reescrita)" },
            { date: "20/02/2026", text: "35 cursos completos com certificados" },
            { date: "19/02/2026", text: "61 Edge Functions operacionais" },
          ].map((log, i) => (
            <div key={i} className="flex items-center gap-2 text-[10px]">
              <Badge variant="outline" className="text-[9px] shrink-0">{log.date}</Badge>
              <span className="text-muted-foreground">{log.text}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};
