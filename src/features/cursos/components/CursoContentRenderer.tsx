import { Circle } from "lucide-react";

/**
 * Renders markdown-like course content into styled JSX.
 * Shared across all course pages.
 */
export function renderCursoContent(text: string) {
  return text.split("\n").map((line, i) => {
    if (line.startsWith("# "))
      return <h1 key={i} className="text-xl font-bold text-primary mt-6 mb-3">{line.slice(2)}</h1>;
    if (line.startsWith("## "))
      return <h2 key={i} className="text-lg font-bold mt-5 mb-2">{line.slice(3)}</h2>;
    if (line.startsWith("### "))
      return <h3 key={i} className="text-base font-semibold mt-4 mb-2">{line.slice(4)}</h3>;
    if (line.startsWith("> "))
      return (
        <blockquote key={i} className="border-l-4 border-primary/30 pl-4 py-1 my-2 text-sm italic text-muted-foreground bg-primary/5 rounded-r-lg">
          {line.slice(2)}
        </blockquote>
      );
    if (line.startsWith("- [ ] "))
      return (
        <div key={i} className="flex items-center gap-2 text-sm my-1">
          <Circle size={14} className="text-muted-foreground" />
          <span>{line.slice(6)}</span>
        </div>
      );
    if (line.startsWith("- **")) {
      const match = line.match(/^- \*\*(.+?)\*\*:?\s*(.*)/);
      if (match)
        return (
          <li key={i} className="text-sm ml-4 my-1 list-disc">
            <strong>{match[1]}</strong>{match[2] ? `: ${match[2]}` : ""}
          </li>
        );
    }
    if (line.startsWith("- "))
      return <li key={i} className="text-sm ml-4 my-1 list-disc">{line.slice(2)}</li>;
    if (line.startsWith("| ") && line.includes("|")) {
      const cells = line.split("|").filter(Boolean).map((c) => c.trim());
      if (cells.every((c) => c.match(/^[-]+$/))) return null;
      return (
        <div key={i} className="grid grid-cols-2 gap-2 text-xs my-0.5">
          {cells.map((c, j) => (
            <span key={j} className="bg-muted/50 px-2 py-1 rounded">{c}</span>
          ))}
        </div>
      );
    }
    if (line.startsWith("❌ "))
      return <p key={i} className="text-sm my-1 text-destructive">{line}</p>;
    if (line.startsWith("✅ "))
      return <p key={i} className="text-sm my-1 text-primary">{line}</p>;
    if (line.startsWith("⚠️ "))
      return <p key={i} className="text-sm my-1 text-warning">{line}</p>;
    if (line.startsWith("**") && line.endsWith("**"))
      return <p key={i} className="text-sm font-bold my-1">{line.slice(2, -2)}</p>;
    if (line.match(/^\*\*\d+\./)) {
      const clean = line.replace(/\*\*/g, "");
      return <p key={i} className="text-sm font-bold my-2">{clean}</p>;
    }
    if (line.trim() === "") return <div key={i} className="h-2" />;
    return <p key={i} className="text-sm text-muted-foreground my-1">{line}</p>;
  });
}
